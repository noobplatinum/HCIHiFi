// data/api-client.js — API client with fallback to mock data
// Wraps all fetch() calls to Flask backend; gracefully degrades if backend is down.

const API_BASE = 'http://localhost:5000';
let _apiAvailable = null; // null = unknown, true/false after first check
let _sessionId = null;

/**
 * Get or create a session ID for this browser session.
 */
export function getSessionId() {
  if (!_sessionId) {
    _sessionId = sessionStorage.getItem('roadmaply_session') || 
                 'ses-' + Math.random().toString(36).substring(2, 10);
    sessionStorage.setItem('roadmaply_session', _sessionId);
  }
  return _sessionId;
}

/**
 * Check if the backend API is available.
 */
export async function checkApiHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { 
      signal: AbortSignal.timeout(2000) 
    });
    const data = await res.json();
    _apiAvailable = data.status === 'ok';
    window.__roadmaply.state.apiAvailable = _apiAvailable;
    window.__roadmaply.state.wozMode = data.woz_mode || false;
    window.__roadmaply.state.geminiConfigured = data.gemini_configured || false;
    console.log(`[API] Backend ${_apiAvailable ? '✅ available' : '❌ unavailable'} | WoZ: ${data.woz_mode} | Gemini: ${data.gemini_configured}`);
    return _apiAvailable;
  } catch {
    _apiAvailable = false;
    window.__roadmaply.state.apiAvailable = false;
    console.log('[API] Backend ❌ unavailable — using mock data fallback');
    return false;
  }
}

/**
 * Generic API call with fallback.
 */
async function apiCall(endpoint, method = 'GET', body = null, isFormData = false) {
  if (_apiAvailable === null) await checkApiHealth();
  if (!_apiAvailable) return null; // Caller should use fallback

  try {
    const headers = {};
    headers['X-Session-ID'] = getSessionId();
    
    const opts = { method, headers };
    
    if (body) {
      if (isFormData) {
        opts.body = body; // FormData handles its own Content-Type
      } else {
        headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(body);
      }
    }

    const res = await fetch(`${API_BASE}${endpoint}`, opts);
    return await res.json();
  } catch (err) {
    console.warn(`[API] Request to ${endpoint} failed:`, err.message);
    return null;
  }
}

// ─────────────────────────────────────
//  CV Parsing
// ─────────────────────────────────────

/**
 * Upload and parse a CV file.
 * @param {File} file - The CV file to parse.
 * @returns {Object|null} Parsed profile data, or null for fallback.
 */
export async function parseCv(file) {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
    formData.append('filename', file.name);
  }
  
  const result = await apiCall('/api/parse-cv', 'POST', formData, true);
  
  if (result && result.status !== 'error') {
    // Merge AI-parsed data into global state
    if (result.data) {
      mergeProfileData(result.data, result.confidence);
    }
    return result;
  }
  
  return result; // May be null (fallback) or error response
}

/**
 * Merge AI-parsed data into window.__roadmaply state.
 */
function mergeProfileData(data, confidence) {
  const state = window.__roadmaply;
  
  if (data.name) state.user.name = data.name;
  if (data.title) state.user.title = data.title;
  if (data.email) state.user.email = data.email;
  if (data.phone) state.user.phone = data.phone;
  if (data.location) state.user.location = data.location;
  
  // Update initials
  if (data.name) {
    const parts = data.name.split(' ');
    state.user.initials = parts.map(p => p[0]).join('').substring(0, 2).toUpperCase();
  }
  
  // Work experience
  if (data.work_experience && data.work_experience.length > 0) {
    state.workExperience = data.work_experience.map((exp, i) => ({
      id: `exp-${i + 1}`,
      title: exp.title || '',
      company: exp.company || '',
      location: exp.location || '',
      startDate: exp.start_date || '',
      endDate: exp.end_date || '',
      description: exp.description || '',
      initial: (exp.company || 'X')[0].toUpperCase(),
      color: ['#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626'][i % 5],
    }));
  }
  
  // Education
  if (data.education && data.education.length > 0) {
    state.education = data.education.map((edu, i) => ({
      id: `edu-${i + 1}`,
      degree: edu.degree || '',
      school: edu.school || '',
      startDate: edu.start_date || '',
      endDate: edu.end_date || '',
    }));
  }
  
  // Skills
  if (data.skills) {
    if (data.skills.technical) state.skills.technical = data.skills.technical;
    if (data.skills.soft) state.skills.soft = data.skills.soft;
  }
  
  // Store AI confidence
  state.state.aiConfidence = confidence;
  state.state.aiParsed = true;
}

// ─────────────────────────────────────
//  Career Analysis
// ─────────────────────────────────────

/**
 * Analyze career paths based on profile.
 * @returns {Object|null} Career paths data, or null for fallback.
 */
export async function analyzeCareer() {
  const { user, workExperience, education, skills } = window.__roadmaply;
  
  const profile = {
    name: user.name,
    title: user.title,
    location: user.location,
    work_experience: workExperience.map(exp => ({
      title: exp.title,
      company: exp.company,
      location: exp.location,
      start_date: exp.startDate,
      end_date: exp.endDate,
      description: exp.description,
    })),
    education: education.map(edu => ({
      degree: edu.degree,
      school: edu.school,
      start_date: edu.startDate,
      end_date: edu.endDate,
    })),
    skills: {
      technical: skills.technical,
      soft: skills.soft,
    },
  };
  
  const result = await apiCall('/api/analyze-career', 'POST', profile);
  
  if (result && result.career_paths) {
    // Merge into global state using snake_case → camelCase
    window.__roadmaply.careerPaths = result.career_paths.map(path => ({
      id: path.id,
      title: path.title,
      matchLabel: path.match_label,
      matchPercent: path.match_percent,
      matchColor: path.match_color,
      borderColor: path.border_color,
      salaryMin: path.salary_min,
      salaryMax: path.salary_max,
      description: path.description,
      metrics: path.metrics,
      skillsHave: path.skills_have,
      skillsMissing: path.skills_missing,
      currency: 'IDR',
      unit: 'M/mo',
    }));
    return result;
  }
  
  return null; // Use fallback
}

// ─────────────────────────────────────
//  Roadmap Generation
// ─────────────────────────────────────

/**
 * Generate learning roadmap for a career path.
 */
export async function generateRoadmap(careerTitle, currentSkills, missingSkills) {
  const result = await apiCall('/api/generate-roadmap', 'POST', {
    career_title: careerTitle,
    current_skills: currentSkills,
    missing_skills: missingSkills,
  });
  
  if (result && result.roadmap_nodes) {
    window.__roadmaply.roadmapNodes = result.roadmap_nodes.map(node => ({
      id: node.id,
      title: node.title,
      status: node.status,
      duration: node.duration,
      difficulty: node.difficulty,
      overview: node.overview,
      resources: node.resources || [],
      practice: node.practice || '',
    }));
    return result;
  }
  
  return null;
}

// ─────────────────────────────────────
//  Event Logging
// ─────────────────────────────────────

/**
 * Log a user interaction event (silent, non-blocking).
 */
export function logEvent(eventType, page, details = {}) {
  if (!_apiAvailable) return;
  
  // Fire and forget
  apiCall('/api/log/event', 'POST', {
    session_id: getSessionId(),
    event_type: eventType,
    page: page,
    details: details,
  }).catch(() => {}); // Silently ignore errors
}

/**
 * Mark task start.
 */
export function startTaskTimer(taskName) {
  if (!_apiAvailable) return;
  apiCall('/api/log/task/start', 'POST', {
    session_id: getSessionId(),
    task_name: taskName,
  }).catch(() => {});
}

/**
 * Mark task end.
 */
export function endTaskTimer(taskName, completed = true) {
  if (!_apiAvailable) return;
  apiCall('/api/log/task/end', 'POST', {
    session_id: getSessionId(),
    task_name: taskName,
    completed,
  }).catch(() => {});
}

// ─────────────────────────────────────
//  SUS Survey
// ─────────────────────────────────────

/**
 * Submit SUS questionnaire responses.
 * @param {number[]} responses - Array of 10 integers (1-5).
 * @returns {Object} Result with SUS score.
 */
export async function submitSus(responses) {
  const result = await apiCall('/api/sus/submit', 'POST', {
    session_id: getSessionId(),
    responses,
  });
  return result;
}

// ─────────────────────────────────────
//  Initialization
// ─────────────────────────────────────

// Check API health on load
checkApiHealth();

// Make key functions available globally for pages that don't use imports
window.__roadmaplyApi = {
  parseCv,
  analyzeCareer,
  generateRoadmap,
  logEvent,
  startTaskTimer,
  endTaskTimer,
  submitSus,
  checkApiHealth,
  getSessionId,
  get isAvailable() { return _apiAvailable; },
};
