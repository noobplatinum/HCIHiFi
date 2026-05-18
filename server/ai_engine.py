"""
ai_engine.py — Gemini API integration for Roadmaply.
Handles CV parsing, career analysis, and roadmap generation using Google Gemini.
Includes structured prompts with anti-hallucination guardrails.
"""

import json
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

# Configure Gemini (new google.genai SDK)
_api_key = os.getenv("GEMINI_API_KEY", "")
_client = None

def _get_client():
    """Get a Gemini client instance (lazy init)."""
    global _client
    if _client is None and _api_key:
        from google import genai
        _client = genai.Client(api_key=_api_key)
    return _client


# ─────────────────────────────────────────────
#  CAPABILITY ENVELOPE (for Chapter 3 / T2 report)
# ─────────────────────────────────────────────
# What the AI CAN reliably do:
#   ✅ Extract structured text from CV content (name, experience, education, skills)
#   ✅ Match skills against a known taxonomy of tech/soft skills
#   ✅ Generate career path recommendations based on skill matching
#   ✅ Produce learning roadmaps with resource suggestions
#   ✅ Estimate match confidence percentages
#
# What the AI SOMETIMES struggles with:
#   ⚠️  Parsing heavily formatted or image-based CVs
#   ⚠️  Accurate salary range estimation (varies by region)
#   ⚠️  Distinguishing between similar job titles across industries
#
# What the AI CANNOT do:
#   ❌ Access real-time job market data
#   ❌ Verify the truthfulness of CV claims
#   ❌ Replace professional career counseling
#   ❌ Access external URLs or job boards
# ─────────────────────────────────────────────


# ─── Prompt Templates ───

CV_PARSE_PROMPT = """You are a professional CV/resume parser. Extract structured information from the following CV text.

IMPORTANT RULES:
- Only extract information that is explicitly stated in the CV. Do NOT invent or assume any details.
- If a field cannot be found, use an empty string "" or empty array [].
- For skills, only list skills that are explicitly mentioned or clearly implied by the work descriptions.
- Provide a confidence score (0.0 to 1.0) indicating how much of the CV you were able to parse successfully.

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "confidence": 0.95,
  "name": "Full Name",
  "title": "Current/Most Recent Job Title",
  "email": "email@example.com",
  "phone": "+62...",
  "location": "City, Country",
  "work_experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "City, Country",
      "start_date": "Mon YYYY",
      "end_date": "Mon YYYY or Present",
      "description": "Brief description of responsibilities"
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "school": "Institution Name",
      "start_date": "YYYY",
      "end_date": "YYYY"
    }
  ],
  "skills": {
    "technical": ["skill1", "skill2"],
    "soft": ["skill1", "skill2"]
  }
}

CV CONTENT:
{cv_text}
"""

CAREER_ANALYSIS_PROMPT = """You are a career advisor AI. Based on the user's profile, suggest exactly 3 career paths.

USER PROFILE:
- Name: {name}
- Current Title: {title}
- Technical Skills: {technical_skills}
- Soft Skills: {soft_skills}
- Experience: {experience_summary}
- Preferred Location: {location}

IMPORTANT RULES:
- Suggest realistic career paths that build on existing skills.
- The first path should be the best match (highest compatibility).
- The second should be a strong alternative.
- The third should be an ambitious stretch goal requiring significant upskilling.
- Match percentages should honestly reflect skill overlap. Do NOT inflate scores.
- Salary ranges should be in millions IDR per month, realistic for Indonesia job market.
- Only list skills the user actually has in "skills_have". Do NOT invent skills they don't have.

Return ONLY valid JSON (no markdown, no explanation):
{{
  "career_paths": [
    {{
      "id": "kebab-case-id",
      "title": "Job Title",
      "match_label": "Primary Match|Alternative Path|Stretch Goal",
      "match_percent": 85,
      "match_color": "green|blue|gold",
      "border_color": "#hex",
      "salary_min": 15,
      "salary_max": 30,
      "description": "One sentence description of the role",
      "metrics": {{
        "availability": {{"label": "High|Med|Low", "value": 75}},
        "competition": {{"label": "High|Med|Low", "value": 60}},
        "difficulty": {{"label": "Easy|Med|Hard|V.Hard|Expert", "value": 70}}
      }},
      "skills_have": ["skills the user already has for this role"],
      "skills_missing": ["skills the user needs to learn"]
    }}
  ]
}}
"""

ROADMAP_PROMPT = """You are a learning path designer. Create a step-by-step learning roadmap for someone transitioning into the role of "{career_title}".

CURRENT SKILLS: {current_skills}
MISSING SKILLS: {missing_skills}

IMPORTANT RULES:
- Create 5 learning nodes, ordered from foundational to advanced.
- First 1-2 nodes should build on existing skills (mark as "completed" status).
- Middle node should be the current focus (mark as "in-progress").
- Last 1-2 nodes should be future topics (mark as "locked").
- Suggest real, well-known learning resources (Coursera, Udemy, YouTube, documentation).
- Duration estimates should be realistic for part-time learning (2-8 weeks each).
- Include a practice code snippet or exercise for each node.

Return ONLY valid JSON (no markdown, no explanation):
{{
  "roadmap_nodes": [
    {{
      "id": "node-1",
      "title": "Topic Name",
      "status": "completed|in-progress|locked",
      "duration": "3 Weeks",
      "difficulty": "Beginner|Medium|Hard",
      "overview": "Brief description of what this module covers",
      "resources": [
        {{"name": "Course Name", "platform": "Platform", "rating": 4.8}}
      ],
      "practice": "Code snippet or exercise text"
    }}
  ]
}}
"""


def parse_cv(cv_text):
    """
    Parse CV text using Gemini API.
    Returns structured profile data with confidence score.
    """
    if not _api_key:
        return {"status": "error", "message": "Gemini API key not configured."}

    try:
        client = _get_client()
        prompt = CV_PARSE_PROMPT.replace("{cv_text}", cv_text[:8000])  # Limit input length
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )

        # Extract JSON from response
        text = response.text.strip()
        # Remove markdown code fences if present
        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            text = text.rsplit("```", 1)[0]
        text = text.strip()

        parsed = json.loads(text)

        return {
            "status": "success",
            "confidence": parsed.get("confidence", 0.85),
            "data": parsed,
        }

    except json.JSONDecodeError as e:
        return {
            "status": "partial",
            "confidence": 0.3,
            "message": f"AI response was not valid JSON: {str(e)[:100]}",
            "data": _fallback_parse(cv_text),
        }
    except Exception as e:
        return {
            "status": "error",
            "confidence": 0.0,
            "message": f"AI parsing failed: {str(e)[:200]}",
            "error_code": "AI_ERROR",
        }


def analyze_career_paths(profile):
    """
    Generate career path recommendations based on user profile.
    """
    if not _api_key:
        return {"status": "error", "message": "Gemini API key not configured."}

    try:
        client = _get_client()

        # Build experience summary
        exp_summary = "; ".join(
            f"{exp.get('title', '')} at {exp.get('company', '')} ({exp.get('start_date', '')}–{exp.get('end_date', '')})"
            for exp in profile.get("work_experience", [])
        ) or "No experience listed"

        prompt = CAREER_ANALYSIS_PROMPT.format(
            name=profile.get("name", "Unknown"),
            title=profile.get("title", "Unknown"),
            technical_skills=", ".join(profile.get("skills", {}).get("technical", [])),
            soft_skills=", ".join(profile.get("skills", {}).get("soft", [])),
            experience_summary=exp_summary,
            location=profile.get("location", "Indonesia"),
        )

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        text = response.text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            text = text.rsplit("```", 1)[0]
        text = text.strip()

        parsed = json.loads(text)

        return {
            "status": "success",
            "career_paths": parsed.get("career_paths", []),
        }

    except Exception as e:
        return {
            "status": "error",
            "message": f"Career analysis failed: {str(e)[:200]}",
        }


def generate_roadmap(career_title, current_skills, missing_skills):
    """
    Generate a learning roadmap for a specific career path.
    """
    if not _api_key:
        return {"status": "error", "message": "Gemini API key not configured."}

    try:
        client = _get_client()
        prompt = ROADMAP_PROMPT.format(
            career_title=career_title,
            current_skills=", ".join(current_skills),
            missing_skills=", ".join(missing_skills),
        )

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        text = response.text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            text = text.rsplit("```", 1)[0]
        text = text.strip()

        parsed = json.loads(text)

        return {
            "status": "success",
            "roadmap_nodes": parsed.get("roadmap_nodes", []),
        }

    except Exception as e:
        return {
            "status": "error",
            "message": f"Roadmap generation failed: {str(e)[:200]}",
        }


def _fallback_parse(cv_text):
    """Minimal fallback parsing when AI JSON parsing fails."""
    lines = cv_text.strip().split("\n")
    name = lines[0] if lines else "Unknown"
    return {
        "name": name,
        "title": "",
        "email": "",
        "phone": "",
        "location": "",
        "work_experience": [],
        "education": [],
        "skills": {"technical": [], "soft": []},
    }
