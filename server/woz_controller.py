"""
woz_controller.py — Wizard of Oz facilitator controller.
Manages pending AI requests, allows facilitator to control responses,
inject errors, and override AI behaviour in real-time.
"""

import time
import json
import threading
from datetime import datetime

# Pre-built WoZ response templates
TEMPLATES = {
    "cv_parse_success": {
        "status": "success",
        "confidence": 0.98,
        "data": {
            "name": "John Doe",
            "title": "Product Designer",
            "email": "john.doe@email.com",
            "phone": "+62 812-3456-7890",
            "location": "Jakarta, Indonesia",
            "work_experience": [
                {
                    "title": "Senior Product Designer",
                    "company": "TechCorp Indonesia",
                    "location": "Jakarta, Indonesia",
                    "start_date": "Jan 2021",
                    "end_date": "Present",
                    "description": "Led design for the core product suite, collaborated with cross-functional teams, and established the company's design system used by 20+ engineers.",
                },
                {
                    "title": "UI/UX Designer",
                    "company": "StartupXYZ",
                    "location": "Bandung, Indonesia",
                    "start_date": "Mar 2018",
                    "end_date": "Dec 2020",
                    "description": "Designed end-to-end user experiences for mobile and web applications, conducted user research, and created interactive prototypes.",
                },
            ],
            "education": [
                {
                    "degree": "Bachelor of Visual Communication Design",
                    "school": "Institut Teknologi Bandung (ITB)",
                    "start_date": "2014",
                    "end_date": "2018",
                }
            ],
            "skills": {
                "technical": ["Figma", "Adobe XD", "HTML/CSS", "Prototyping", "User Research", "Design Systems"],
                "soft": ["Leadership", "Communication", "Problem Solving", "Agile/Scrum"],
            },
        },
    },
    "cv_parse_partial": {
        "status": "partial",
        "confidence": 0.62,
        "message": "AI had difficulty parsing some sections. Please review carefully.",
        "data": {
            "name": "John Doe",
            "title": "",
            "email": "john.doe@email.com",
            "phone": "",
            "location": "",
            "work_experience": [],
            "education": [],
            "skills": {"technical": ["Figma"], "soft": []},
        },
    },
    "cv_parse_error": {
        "status": "error",
        "confidence": 0.0,
        "message": "Sistem kesulitan membaca CV Anda. Silakan periksa kembali atau isi data secara manual.",
        "error_code": "PARSE_FAILED",
    },
    "career_analysis_success": {
        "status": "success",
        "career_paths": [
            {
                "id": "data-scientist",
                "title": "Data Scientist",
                "match_label": "Primary Match",
                "match_percent": 95,
                "match_color": "green",
                "border_color": "#16a34a",
                "salary_min": 18,
                "salary_max": 35,
                "description": "Leverage statistical analysis and ML to extract insights from complex datasets.",
                "metrics": {
                    "availability": {"label": "High", "value": 75},
                    "competition": {"label": "Med", "value": 60},
                    "difficulty": {"label": "Hard", "value": 80},
                },
                "skills_have": ["Python", "Statistics", "SQL"],
                "skills_missing": ["TensorFlow", "Spark", "Deep Learning"],
            },
            {
                "id": "ml-engineer",
                "title": "ML Engineer",
                "match_label": "Alternative Path",
                "match_percent": 88,
                "match_color": "blue",
                "border_color": "#2563eb",
                "salary_min": 20,
                "salary_max": 40,
                "description": "Build and deploy production ML models at scale.",
                "metrics": {
                    "availability": {"label": "Med", "value": 50},
                    "competition": {"label": "High", "value": 70},
                    "difficulty": {"label": "V.Hard", "value": 90},
                },
                "skills_have": ["Python", "Git", "Linux"],
                "skills_missing": ["MLOps", "Kubernetes", "PyTorch"],
            },
            {
                "id": "ai-researcher",
                "title": "AI Researcher",
                "match_label": "Stretch Goal",
                "match_percent": 72,
                "match_color": "gold",
                "border_color": "#d97706",
                "salary_min": 25,
                "salary_max": 50,
                "description": "Advance the state-of-the-art in artificial intelligence through novel research.",
                "metrics": {
                    "availability": {"label": "Low", "value": 25},
                    "competition": {"label": "V.High", "value": 85},
                    "difficulty": {"label": "Expert", "value": 95},
                },
                "skills_have": ["Mathematics", "Python"],
                "skills_missing": ["Publications", "Research Methods", "Advanced ML", "NLP"],
            },
        ],
    },
}


class WoZController:
    """Controls Wizard of Oz sessions for usability testing."""

    def __init__(self):
        self._pending_requests = {}  # request_id -> {type, timestamp, data, response_event}
        self._session_state = {
            "active": False,
            "participant_id": None,
            "current_page": "onboarding",
            "mode": "woz",  # "woz" or "ai"
            "events": [],
            "overrides": {
                "confidence_multiplier": 1.0,
                "force_error": False,
                "delay_seconds": 2.0,
            },
        }
        self._lock = threading.Lock()
        self._request_counter = 0

    def get_state(self):
        """Get current WoZ session state."""
        with self._lock:
            return {
                **self._session_state,
                "pending_requests": [
                    {
                        "request_id": rid,
                        "type": req["type"],
                        "timestamp": req["timestamp"],
                        "data_preview": str(req.get("data", {}))[:200],
                    }
                    for rid, req in self._pending_requests.items()
                ],
            }

    def start_session(self, participant_id):
        """Start a new WoZ testing session."""
        with self._lock:
            self._session_state["active"] = True
            self._session_state["participant_id"] = participant_id
            self._session_state["events"] = []
            self._pending_requests.clear()
        return {"status": "started", "participant_id": participant_id}

    def end_session(self):
        """End the current WoZ session."""
        with self._lock:
            self._session_state["active"] = False
            # Resolve all pending requests with errors
            for rid, req in self._pending_requests.items():
                req["response"] = TEMPLATES["cv_parse_error"]
                req["response_event"].set()
            self._pending_requests.clear()
        return {"status": "ended"}

    def update_page(self, page):
        """Update the tracked current page of the participant."""
        with self._lock:
            self._session_state["current_page"] = page
            self._session_state["events"].append({
                "time": datetime.now().isoformat(),
                "type": "page_change",
                "page": page,
            })

    def update_overrides(self, overrides):
        """Update WoZ control overrides (confidence, error forcing, delay)."""
        with self._lock:
            self._session_state["overrides"].update(overrides)
        return self._session_state["overrides"]

    def submit_request(self, request_type, data=None, timeout=120):
        """
        Submit an AI request that waits for the facilitator's response.
        Blocks until the facilitator responds or timeout occurs.
        Returns the facilitator's response.
        """
        with self._lock:
            self._request_counter += 1
            request_id = f"req-{self._request_counter:04d}"
            response_event = threading.Event()
            self._pending_requests[request_id] = {
                "type": request_type,
                "timestamp": datetime.now().isoformat(),
                "data": data,
                "response_event": response_event,
                "response": None,
            }

        # Wait for facilitator to respond
        responded = response_event.wait(timeout=timeout)

        with self._lock:
            req = self._pending_requests.pop(request_id, None)

        if not responded or req is None:
            return {"status": "error", "message": "WoZ request timed out — no facilitator response."}

        # Apply overrides
        response = req["response"]
        overrides = self._session_state["overrides"]

        if overrides.get("force_error"):
            return TEMPLATES.get("cv_parse_error", {"status": "error"})

        if "confidence" in response and overrides.get("confidence_multiplier", 1.0) != 1.0:
            response["confidence"] = min(1.0, response["confidence"] * overrides["confidence_multiplier"])

        return response

    def respond_to_request(self, request_id, response):
        """Facilitator responds to a pending request."""
        with self._lock:
            req = self._pending_requests.get(request_id)
            if not req:
                return {"status": "error", "message": f"Request {request_id} not found or already resolved."}

            req["response"] = response
            req["response_event"].set()

        return {"status": "ok", "request_id": request_id}

    def respond_with_template(self, request_id, template_name):
        """Facilitator responds using a pre-built template."""
        template = TEMPLATES.get(template_name)
        if not template:
            return {"status": "error", "message": f"Template '{template_name}' not found."}
        return self.respond_to_request(request_id, template)

    def get_templates(self):
        """Return available WoZ response templates."""
        return {name: {"status": t.get("status"), "confidence": t.get("confidence")}
                for name, t in TEMPLATES.items()}


# Singleton instance
woz = WoZController()
