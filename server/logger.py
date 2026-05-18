"""
logger.py — Test session logging for usability studies.
Records user interactions, task completion times, and SUS responses.
Exports to CSV/JSON for analysis in the final report.
"""

import json
import csv
import os
import time
from datetime import datetime

# In-memory storage (persisted to files on export)
_sessions = {}       # session_id -> { participant_id, start_time, events[], sus_responses }
_event_log = []      # Global ordered event log


def get_or_create_session(session_id, participant_id=None):
    """Get existing session or create a new one."""
    if session_id not in _sessions:
        _sessions[session_id] = {
            "session_id": session_id,
            "participant_id": participant_id or f"P-{len(_sessions)+1:03d}",
            "start_time": datetime.now().isoformat(),
            "events": [],
            "sus_responses": None,
            "tasks": {},
        }
    return _sessions[session_id]


def log_event(session_id, event_type, page, details=None):
    """Log a user interaction event."""
    event = {
        "timestamp": datetime.now().isoformat(),
        "epoch_ms": int(time.time() * 1000),
        "session_id": session_id,
        "event_type": event_type,
        "page": page,
        "details": details or {},
    }
    _event_log.append(event)

    session = get_or_create_session(session_id)
    session["events"].append(event)

    return event


def start_task(session_id, task_name):
    """Mark the start of a usability task."""
    session = get_or_create_session(session_id)
    session["tasks"][task_name] = {
        "start_time": datetime.now().isoformat(),
        "start_epoch_ms": int(time.time() * 1000),
        "end_time": None,
        "duration_ms": None,
        "completed": False,
    }
    log_event(session_id, "task_start", "", {"task": task_name})


def end_task(session_id, task_name, completed=True):
    """Mark the end of a usability task."""
    session = get_or_create_session(session_id)
    task = session["tasks"].get(task_name)
    if task:
        now_ms = int(time.time() * 1000)
        task["end_time"] = datetime.now().isoformat()
        task["duration_ms"] = now_ms - task["start_epoch_ms"]
        task["completed"] = completed
        log_event(session_id, "task_end", "", {
            "task": task_name,
            "completed": completed,
            "duration_ms": task["duration_ms"],
        })


def store_sus_responses(session_id, responses):
    """
    Store SUS questionnaire responses.
    responses: list of 10 integers (1-5) for the 10 SUS questions.
    Returns computed SUS score (0-100).
    """
    session = get_or_create_session(session_id)

    # Compute SUS score per standard methodology
    # Odd questions (1,3,5,7,9): subtract 1 from score
    # Even questions (2,4,6,8,10): subtract score from 5
    # Multiply sum by 2.5
    contributions = []
    for i, score in enumerate(responses[:10]):
        if i % 2 == 0:  # Odd-numbered questions (0-indexed even)
            contributions.append(score - 1)
        else:  # Even-numbered questions (0-indexed odd)
            contributions.append(5 - score)

    sus_score = sum(contributions) * 2.5

    session["sus_responses"] = {
        "raw_scores": responses[:10],
        "contributions": contributions,
        "sus_score": sus_score,
        "timestamp": datetime.now().isoformat(),
    }

    log_event(session_id, "sus_submitted", "sus-survey", {
        "sus_score": sus_score,
        "raw_scores": responses[:10],
    })

    return sus_score


def get_session_summary(session_id):
    """Get a summary of a session for the facilitator dashboard."""
    session = _sessions.get(session_id)
    if not session:
        return None

    return {
        "session_id": session["session_id"],
        "participant_id": session["participant_id"],
        "start_time": session["start_time"],
        "event_count": len(session["events"]),
        "tasks": session["tasks"],
        "sus_score": session["sus_responses"]["sus_score"] if session["sus_responses"] else None,
        "last_event": session["events"][-1] if session["events"] else None,
    }


def get_all_sessions():
    """Get summaries of all sessions."""
    return [get_session_summary(sid) for sid in _sessions]


def export_events_csv(filepath=None):
    """Export all events to CSV."""
    if not filepath:
        os.makedirs("server/exports", exist_ok=True)
        filepath = f"server/exports/events_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"

    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "timestamp", "epoch_ms", "session_id", "event_type", "page", "details"
        ])
        writer.writeheader()
        for event in _event_log:
            row = {**event, "details": json.dumps(event["details"])}
            writer.writerow(row)

    return filepath


def export_sus_csv(filepath=None):
    """Export SUS scores to CSV."""
    if not filepath:
        os.makedirs("server/exports", exist_ok=True)
        filepath = f"server/exports/sus_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"

    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        headers = ["session_id", "participant_id"] + [f"Q{i+1}" for i in range(10)] + ["sus_score"]
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        for sid, session in _sessions.items():
            if session["sus_responses"]:
                row = {
                    "session_id": sid,
                    "participant_id": session["participant_id"],
                    "sus_score": session["sus_responses"]["sus_score"],
                }
                for i, score in enumerate(session["sus_responses"]["raw_scores"]):
                    row[f"Q{i+1}"] = score
                writer.writerow(row)

    return filepath
