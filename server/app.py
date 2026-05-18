"""
app.py — Main Flask application for Roadmaply backend.
Provides REST API endpoints for AI-powered CV parsing, career analysis,
and Wizard of Oz facilitator controls for usability testing.

Usage:
    python server/app.py
    → Backend runs on http://localhost:5000
    → WoZ Dashboard at http://localhost:5000/woz
"""

import os
import json
import uuid
import time
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

from woz_controller import woz, TEMPLATES
from ai_engine import parse_cv, analyze_career_paths, generate_roadmap
from logger import (
    log_event, get_or_create_session, start_task, end_task,
    store_sus_responses, get_session_summary, get_all_sessions,
    export_events_csv, export_sus_csv,
)

app = Flask(__name__, template_folder="templates")
app.secret_key = os.getenv("SECRET_KEY", "roadmaply-dev-key")
CORS(app, resources={r"/api/*": {"origins": "*"}})

WOZ_MODE = os.getenv("WOZ_MODE", "false").lower() == "true"


def _get_session_id():
    """Extract or generate session ID from request."""
    return request.headers.get("X-Session-ID") or request.cookies.get("session_id") or str(uuid.uuid4())[:8]


# ─────────────────────────────────────
#  Static file serving (frontend)
# ─────────────────────────────────────

@app.route("/")
def serve_index():
    """Serve the main SPA."""
    return send_from_directory(os.path.join(os.path.dirname(__file__), ".."), "index.html")


@app.route("/<path:path>")
def serve_static(path):
    """Serve static frontend files."""
    base_dir = os.path.join(os.path.dirname(__file__), "..")
    return send_from_directory(base_dir, path)


# ─────────────────────────────────────
#  Health check
# ─────────────────────────────────────

@app.route("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "woz_mode": WOZ_MODE,
        "gemini_configured": bool(os.getenv("GEMINI_API_KEY")),
        "timestamp": time.time(),
    })


# ─────────────────────────────────────
#  CV Parsing
# ─────────────────────────────────────

@app.route("/api/parse-cv", methods=["POST"])
def api_parse_cv():
    """
    Parse an uploaded CV file.
    In AI mode: sends to Gemini API for extraction.
    In WoZ mode: queues for facilitator response.
    """
    session_id = _get_session_id()
    log_event(session_id, "cv_upload", "onboarding", {
        "filename": request.form.get("filename", "unknown"),
    })
    start_task(session_id, "cv_parsing")

    if WOZ_MODE:
        # WoZ mode: queue for facilitator
        woz.update_page("onboarding")
        result = woz.submit_request("cv_parse", {
            "filename": request.form.get("filename"),
            "session_id": session_id,
        })
    else:
        # AI mode: use Gemini
        cv_text = ""

        # Check for file upload
        if "file" in request.files:
            file = request.files["file"]
            # For demo purposes, we read as text. In production, you'd use
            # a PDF parser like PyPDF2 or pdfplumber.
            try:
                cv_text = file.read().decode("utf-8", errors="ignore")
            except Exception:
                cv_text = ""

        # Check for raw text input
        if not cv_text:
            cv_text = request.form.get("cv_text", "")

        if not cv_text.strip():
            # No parseable content — simulate with mock
            result = {
                "status": "success",
                "confidence": 0.98,
                "data": TEMPLATES["cv_parse_success"]["data"],
            }
        else:
            result = parse_cv(cv_text)

    end_task(session_id, "cv_parsing", completed=(result.get("status") != "error"))
    log_event(session_id, "cv_parse_result", "onboarding", {
        "status": result.get("status"),
        "confidence": result.get("confidence"),
    })

    return jsonify(result)


# ─────────────────────────────────────
#  Career Analysis
# ─────────────────────────────────────

@app.route("/api/analyze-career", methods=["POST"])
def api_analyze_career():
    """
    Analyze profile and return career path recommendations.
    """
    session_id = _get_session_id()
    profile = request.get_json() or {}
    log_event(session_id, "career_analysis_start", "profile-validation", {})
    start_task(session_id, "career_analysis")

    if WOZ_MODE:
        woz.update_page("profile-validation")
        result = woz.submit_request("career_analysis", {
            "profile": profile,
            "session_id": session_id,
        })
    else:
        result = analyze_career_paths(profile)
        # If AI fails, fall back to template
        if result.get("status") == "error":
            result = TEMPLATES["career_analysis_success"]
            result["fallback"] = True

    end_task(session_id, "career_analysis", completed=(result.get("status") != "error"))

    return jsonify(result)


# ─────────────────────────────────────
#  Roadmap Generation
# ─────────────────────────────────────

@app.route("/api/generate-roadmap", methods=["POST"])
def api_generate_roadmap():
    """
    Generate learning roadmap for a selected career path.
    """
    session_id = _get_session_id()
    data = request.get_json() or {}
    career_title = data.get("career_title", "Software Engineer")
    current_skills = data.get("current_skills", [])
    missing_skills = data.get("missing_skills", [])

    log_event(session_id, "roadmap_generation_start", "career-comparison", {
        "career_title": career_title,
    })

    if WOZ_MODE:
        woz.update_page("career-comparison")
        result = woz.submit_request("roadmap_generation", {
            "career_title": career_title,
            "current_skills": current_skills,
            "missing_skills": missing_skills,
            "session_id": session_id,
        })
    else:
        result = generate_roadmap(career_title, current_skills, missing_skills)

    return jsonify(result)


# ─────────────────────────────────────
#  Job Curation
# ─────────────────────────────────────

@app.route("/api/curate-jobs", methods=["POST"])
def api_curate_jobs():
    """
    Return curated job listings. Currently uses template data.
    In a production system, this would query job board APIs.
    """
    session_id = _get_session_id()
    log_event(session_id, "job_curation_viewed", "job-curation", {})

    # Jobs are always template-based (no real job API integration)
    return jsonify({
        "status": "success",
        "message": "Job curation uses curated sample data for prototype purposes.",
    })


# ─────────────────────────────────────
#  WoZ Facilitator Endpoints
# ─────────────────────────────────────

@app.route("/woz")
def woz_dashboard():
    """Serve the WoZ facilitator dashboard."""
    return render_template("woz_dashboard.html")


@app.route("/api/woz/state")
def api_woz_state():
    """Get current WoZ session state."""
    return jsonify(woz.get_state())


@app.route("/api/woz/start", methods=["POST"])
def api_woz_start():
    """Start a new WoZ session."""
    data = request.get_json() or {}
    participant_id = data.get("participant_id", f"P-{int(time.time()) % 10000:04d}")
    return jsonify(woz.start_session(participant_id))


@app.route("/api/woz/end", methods=["POST"])
def api_woz_end():
    """End the current WoZ session."""
    return jsonify(woz.end_session())


@app.route("/api/woz/respond", methods=["POST"])
def api_woz_respond():
    """Facilitator responds to a pending AI request."""
    data = request.get_json() or {}
    request_id = data.get("request_id")
    response = data.get("response")
    template = data.get("template")

    if not request_id:
        return jsonify({"status": "error", "message": "request_id is required"}), 400

    if template:
        return jsonify(woz.respond_with_template(request_id, template))
    elif response:
        return jsonify(woz.respond_to_request(request_id, response))
    else:
        return jsonify({"status": "error", "message": "Either 'response' or 'template' is required"}), 400


@app.route("/api/woz/trigger", methods=["POST"])
def api_woz_trigger():
    """
    Facilitator triggers a specific action (error injection, page navigation, etc.)
    """
    data = request.get_json() or {}
    action = data.get("action")

    if action == "force_error":
        woz.update_overrides({"force_error": True})
        return jsonify({"status": "ok", "message": "Error injection enabled"})
    elif action == "clear_error":
        woz.update_overrides({"force_error": False})
        return jsonify({"status": "ok", "message": "Error injection cleared"})
    elif action == "set_confidence":
        multiplier = data.get("multiplier", 1.0)
        woz.update_overrides({"confidence_multiplier": multiplier})
        return jsonify({"status": "ok", "message": f"Confidence multiplier set to {multiplier}"})
    elif action == "set_delay":
        delay = data.get("delay", 2.0)
        woz.update_overrides({"delay_seconds": delay})
        return jsonify({"status": "ok", "message": f"Response delay set to {delay}s"})
    else:
        return jsonify({"status": "error", "message": f"Unknown action: {action}"}), 400


@app.route("/api/woz/overrides", methods=["POST"])
def api_woz_overrides():
    """Update WoZ control overrides."""
    data = request.get_json() or {}
    return jsonify(woz.update_overrides(data))


@app.route("/api/woz/templates")
def api_woz_templates():
    """Get available WoZ response templates."""
    return jsonify(woz.get_templates())


# ─────────────────────────────────────
#  Event Logging
# ─────────────────────────────────────

@app.route("/api/log/event", methods=["POST"])
def api_log_event():
    """Log a user interaction event."""
    data = request.get_json() or {}
    session_id = data.get("session_id") or _get_session_id()
    event = log_event(
        session_id=session_id,
        event_type=data.get("event_type", "unknown"),
        page=data.get("page", ""),
        details=data.get("details"),
    )
    # Also update WoZ page tracking
    if data.get("page"):
        woz.update_page(data["page"])

    return jsonify({"status": "ok", "event": event})


@app.route("/api/log/task/start", methods=["POST"])
def api_task_start():
    """Mark the start of a usability task."""
    data = request.get_json() or {}
    session_id = data.get("session_id") or _get_session_id()
    start_task(session_id, data.get("task_name", "unknown"))
    return jsonify({"status": "ok"})


@app.route("/api/log/task/end", methods=["POST"])
def api_task_end():
    """Mark the end of a usability task."""
    data = request.get_json() or {}
    session_id = data.get("session_id") or _get_session_id()
    end_task(session_id, data.get("task_name", "unknown"), data.get("completed", True))
    return jsonify({"status": "ok"})


# ─────────────────────────────────────
#  SUS Survey
# ─────────────────────────────────────

@app.route("/api/sus/submit", methods=["POST"])
def api_sus_submit():
    """Submit SUS questionnaire responses."""
    data = request.get_json() or {}
    session_id = data.get("session_id") or _get_session_id()
    responses = data.get("responses", [])

    if len(responses) != 10:
        return jsonify({"status": "error", "message": "Exactly 10 SUS responses required."}), 400

    # Validate scores are 1-5
    if not all(isinstance(r, int) and 1 <= r <= 5 for r in responses):
        return jsonify({"status": "error", "message": "Each response must be an integer 1-5."}), 400

    sus_score = store_sus_responses(session_id, responses)
    return jsonify({
        "status": "ok",
        "sus_score": sus_score,
        "session_id": session_id,
    })


# ─────────────────────────────────────
#  Data Export
# ─────────────────────────────────────

@app.route("/api/export/events")
def api_export_events():
    """Export event log to CSV."""
    filepath = export_events_csv()
    return jsonify({"status": "ok", "filepath": filepath})


@app.route("/api/export/sus")
def api_export_sus():
    """Export SUS scores to CSV."""
    filepath = export_sus_csv()
    return jsonify({"status": "ok", "filepath": filepath})


@app.route("/api/sessions")
def api_sessions():
    """Get all session summaries."""
    return jsonify(get_all_sessions())


# ─────────────────────────────────────
#  Entry point
# ─────────────────────────────────────

if __name__ == "__main__":
    print("=" * 60)
    print("  Roadmaply Backend Server")
    print(f"  Mode: {'[WoZ] Wizard of Oz' if WOZ_MODE else '[AI] Gemini'}")
    print(f"  Gemini API: {'[OK] Configured' if os.getenv('GEMINI_API_KEY') else '[--] Not configured'}")
    print(f"  Frontend: http://localhost:5000")
    print(f"  WoZ Dashboard: http://localhost:5000/woz")
    print(f"  API Health: http://localhost:5000/api/health")
    print("=" * 60)

    app.run(debug=True, host="0.0.0.0", port=5000)
