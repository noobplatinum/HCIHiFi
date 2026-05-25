// app.js — SPA router + page loader

// Route → page module map
const routes = {
  '/login':             () => import('./pages/login.js'),
  '/onboarding':        () => import('./pages/onboarding.js'),
  '/profile-validation':() => import('./pages/profile-validation.js'),
  '/career-comparison': () => import('./pages/career-comparison.js'),
  '/detailed-analysis': () => import('./pages/detailed-analysis.js'),
  '/learning-path':     () => import('./pages/learning-path.js'),
  '/skill-journey':     () => import('./pages/skill-journey.js'),
  '/job-analysis':      () => import('./pages/job-analysis.js'),
  '/job-curation':      () => import('./pages/job-curation.js'),
  '/cv-editor':         () => import('./pages/cv-editor.js'),
  '/sus-survey':        () => import('./pages/sus-survey.js'),
};

const app = document.getElementById('app');

async function navigate(hash) {
  // Strip the leading # or #/
  const route = hash.replace(/^#/, '') || '/login';
  const normalised = route.startsWith('/') ? route : '/' + route;

  const loader = routes[normalised];

  if (!loader) {
    // 404 fallback → redirect to login
    window.location.hash = '#/login';
    return;
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  try {
    // Show a brief loading skeleton
    app.style.opacity = '0';
    const mod = await loader();
    if (mod && typeof mod.render === 'function') {
      app.innerHTML = mod.render();
      if (typeof mod.init === 'function') mod.init();
    }
    app.style.opacity = '1';
    app.style.transition = 'opacity 0.2s ease';
  } catch (err) {
    console.error('Page load error:', err);
    app.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
        <span class="material-symbols-outlined text-5xl text-slate-300">error</span>
        <h2 class="text-xl font-bold text-slate-700">Page not found</h2>
        <p class="text-slate-500 text-sm">This page hasn't been built yet.</p>
        <a href="#/login" class="mt-2 px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-dark transition-colors">
          Go to Login
        </a>
      </div>`;
    app.style.opacity = '1';
  }
}

// Listen for hash changes
window.addEventListener('hashchange', () => navigate(window.location.hash));

// Initial load
const initialHash = window.location.hash || '#/login';
if (!window.location.hash) {
  window.location.hash = '#/login';
} else {
  navigate(initialHash);
}
