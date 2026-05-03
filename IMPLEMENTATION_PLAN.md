# Roadmaply Hi-Fi Prototype — Implementation Plan

> **Last updated**: 2026-05-02  
> **Status**: Approved  
> **Stack**: Vite + vanilla HTML/JS/CSS + TailwindCSS CDN  
> **Routing**: Client-side hash routing (SPA)  
> **Backend**: None — all data is hardcoded JSON  

---

## Overview

**Roadmaply** is an AI-powered career roadmap picker, learning guide, and job seeker platform. This plan covers building a **hi-fi clickable prototype** (not a production app) using **Vite + vanilla JS/HTML/CSS**, with hardcoded data and Wizard-of-Oz patterns to simulate AI features.

The design source consists of 20 screenshots across 10 distinct pages (2 design variants each) located in `stitch_roadmaply_onboarding_phase_1/`. Each variant pair is nearly identical with minor color/state differences — we pick the best elements from each.

---

## Design System (extracted from mockups)

| Token | Value |
|-------|-------|
| Primary | `#2563eb` |
| Primary Dark | `#1d4ed8` |
| Primary Light | `#dbeafe` |
| Background | `#f8fafc` |
| Surface | `#ffffff` |
| Text Primary | `#1e293b` |
| Text Secondary | `#64748b` |
| Border | `#e2e8f0` |
| Success | `#16a34a` |
| Warning | `#f59e0b` |
| Danger | `#ef4444` |
| Font | Manrope (400, 500, 700, 800) |
| Icons | Material Symbols Outlined |
| Border Radius | Cards `12px`, Buttons `8-12px`, Pills `9999px` |

---

## Navigation Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────────┐
│ #/onboarding│────▶│ #/data-input │────▶│ #/profile-validation│
│ CV Upload + │     │ Data Input   │     │ AI Profile          │
│ Preferences │     │ Dashboard    │     │ Validation          │
└─────────────┘     └──────────────┘     └──────────┬──────────┘
                                                    │
                                                    ▼
┌──────────────┐     ┌──────────────────┐    ┌──────────────────┐
│#/learning-   │◀────│#/detailed-       │◀───│#/career-         │
│  path        │     │  analysis        │    │  comparison      │
│Interactive   │     │AI Career Path    │    │Career Path       │
│Learning Path │     │Analysis          │    │Comparison        │
└──────┬───────┘     └──────────────────┘    └──────────────────┘
       │                                              ▲
       ▼                                              │
┌──────────────┐     ┌──────────────┐         ┌──────┴───────┐
│#/job-curation│     │#/job-analysis│         │#/cv-editor   │
│Job Curation  │     │Job Analysis  │         │AI CV Editor  │
│Dashboard     │     │View          │         │              │
└──────────────┘     └──────────────┘         └──────────────┘

                     ┌──────────────┐
                     │#/skill-      │──▶ #/job-analysis
                     │  journey     │
                     │Skill Journey │
                     └──────────────┘
```

> All pages are also reachable via navbar links for free exploration.

---

## Page Specifications

### Page 1: Onboarding — CV Upload & Preferences

**Route**: `#/onboarding`  
**Source mockups**: `roadmaply_onboarding_phase_1_1`, `roadmaply_onboarding_phase_1_2`

#### Layout & Structure
- **Navbar**: Logo + links (Dashboard, Career Path, Settings) + avatar
- **Hero**: "Let's build your roadmap" heading + subtitle
- **CV Upload Card**: Dashed border drop zone, cloud upload icon, "Browse Files" button
- **Career Preferences Card**: 2-col grid — Preferred Location (dropdown), Years of Experience (number input)
- **Salary Slider**: Dual-range slider showing IDR range (Rp 5jt – Rp 50jt+), display badge "Rp 8.000.000 - Rp 25.000.000"
- **Job Source Whitelist**: 2×2 grid of toggle switches (LinkedIn ✓, Glints ✓, Kalibrr ✗, JobStreet ✓)
- **CTA**: "✨ Analyze My Profile" blue button → navigates to `#/data-input`

#### Interactions (Wizard of Oz)
- File drop zone: On click/drop, show a fake filename bar (e.g. "John_Doe_CV_2023.pdf") with progress bar + ✕ remove
- Salary slider: CSS-only visual (no real drag), or use a simple JS range input
- Toggles: Functional CSS toggle switches
- CTA click: 1.5s fake loading spinner, then navigate to next page

---

### Page 2: Data Input Dashboard

**Route**: `#/data-input`  
**Source mockups**: `roadmaply_data_input_dashboard_1`, `roadmaply_data_input_dashboard_2`

#### Layout & Structure
- **Navbar**: Logo + links (Dashboard, My Roadmap, Settings) + avatar
- **Hero**: "Build Your Career Roadmap" + subtitle
- **Two-column layout**:
  - **Left column**: Upload Resume card (same drop zone + uploaded file indicator "John_Doe_CV_2023.pdf" with progress bar)
  - **Right column**: Career Preferences form — Target Role (text input), Preferred Location (text input), Expected Salary (text), Experience Level (dropdown: Mid Level 3-5 years)
- **Job Source Whitelist section**: Vertical list — LinkedIn Jobs (✓), Indeed (✓), Glints (✗) — each with logo, name, subtitle, toggle
- **Auto-Apply Enabled** badge (top-right of whitelist section)
- **Full-width CTA**: "✨ Analyze My Profile" dark blue button
- **Footer**: Terms of Service link + copyright

#### Interactions
- Form inputs: Editable but data is discarded (prototype)
- CTA: Fake 2s "analyzing" animation → navigate to `#/profile-validation`

---

### Page 3: AI Profile Validation

**Route**: `#/profile-validation`  
**Source mockups**: `roadmaply_ai_profile_validation_1`, `roadmaply_ai_profile_validation_2`

#### Layout & Structure
- **Navbar**: Logo + links (Dashboard, Career Paths, Profile [active], Settings) + bell icon + avatar
- **Hero**: "Verify Your Profile Details" + subtitle about CV parsing
- **Two-column layout** (main content left ~65%, sidebar right ~35%):

**Left column — Parsed profile cards**:
1. **Personal Information** card: Profile photo, Full Name, Job Title, Email, Phone — all in editable text inputs. "Edit" link top-right
2. **Work Experience** card: Timeline of roles — each with company logo initial, title, company, location, date range, description textarea. "+ Add Role" button
3. **Education** card: Degree, school, dates. "+ Add Education" button
4. **Detected Skills** card: "✨ AI Parsed" badge. Two groups:
   - TECHNICAL SKILLS: Tag pills (Figma, Adobe XD, HTML/CSS, Prototyping, User Research) with ✕ remove + "+ Add Skill"
   - SOFT SKILLS: Colored tag pills (Leadership, Communication, Problem Solving) with ✕ remove + "+ Add Skill"

**Right sidebar — Preferences panel**:
- Current Location input with pin icon
- Willing to Relocate toggle
- Platform Whitelist checkboxes (LinkedIn ✓, Indeed ✓, AngelList ✗)
- "Confirm Profile →" blue CTA button
- Subtitle: "This will generate your personalized roadmaps"

#### Interactions
- All text fields are editable (values pre-filled from hardcoded data)
- Skill tags: ✕ removes tag visually, "+ Add Skill" shows a text input
- "Confirm Profile →" → navigate to `#/career-comparison`

---

### Page 4: Career Path Comparison

**Route**: `#/career-comparison`  
**Source mockups**: `roadmaply_career_path_comparison_1`, `roadmaply_career_path_comparison_2`

#### Layout & Structure
- **Navbar**: Logo + search bar + links (Dashboard, Career Paths, Skills, Community) + Profile button (blue pill) + bell
- **Hero**: "Career Path Comparison" + "Sort by: Match Score" dropdown
- **Three career cards** in equal columns:

Each card has:
- Colored top border (blue / purple / gold per variant)
- Title (Java Backend Engineer / Frontend Developer / DevOps Engineer)
- Bookmark icon
- Match badge: "Best Match (85%)" green / "Strong Match (92%)" blue / "High Salary" gold
- Salary range (IDR 15M-25M /mo)
- Three horizontal progress bars: Availability, Competition, Difficulty — with text labels (High/Med/Low/V.High/V.Hard)
- **Skill Gap Analysis**: "You Have" tags (outlined) + "Missing" tags (red-outlined in variant 2)
- "Select This Roadmap" CTA button (filled blue for first card, outlined for others in variant 2)

**Below cards — Detailed Skill Analysis table**:
- Columns: ROLE (with icon), CURRENT SKILLS (tag pills), MISSING CRITICAL SKILLS (red tags in variant 2), MATCH SCORE (progress bar + %), ACTION (→ chevron)
- Three rows: Java Backend, Frontend Dev, DevOps

#### Interactions
- "Select This Roadmap" → navigate to `#/detailed-analysis`
- Sort dropdown: No-op (visual only)
- Bookmark icon: Toggle fill on click
- Table row click → navigate to `#/detailed-analysis`

---

### Page 5: Detailed Path Analysis (AI Career Path Analysis)

**Route**: `#/detailed-analysis`  
**Source mockups**: `roadmaply_detailed_path_analysis_1`, `roadmaply_detailed_path_analysis_2`

#### Layout & Structure
- **Navbar**: Logo + links (Dashboard, Career Explorer, My Skills [active], Community) + avatar + Sign Out
- **Status badge**: "ANALYSIS COMPLETE" blue pill
- **Hero**: "AI Career Path Analysis" + subtitle + "Adjust Inputs" + "Export PDF" buttons
- **Three career path cards** in columns:

Each card:
- Label: PRIMARY MATCH / ALTERNATIVE PATH / STRETCH GOAL
- Match % badge (95% green / 88% blue / 72% outlined)
- Role title + description paragraph
- Difficulty metric (icon bars + label: High/Med/V.High)
- Competition metric (icon bars + label: Med/Low/High)
- Avg. Salary (IDR) progress bar with range (15M → 50M+) and marker value
- **Skill Gap Analysis** section: Checklist items with checkbox — some checked (skills you have), some unchecked (missing skills with "Recommended Course" or "High Priority" or "Critical Requirement" subtitles)
- "Select This Roadmap →" CTA — style varies: filled blue / dark navy / outlined

**Bottom section — "Why these recommendations?"**:
- AI gear icon + explanation text about analyzing 15,000+ job postings
- "View Full Analysis Report" outlined button

#### Interactions
- Card selection → navigate to `#/learning-path`
- "Adjust Inputs" → navigate back to `#/onboarding`
- "Export PDF" → no-op (show toast "Feature coming soon")
- Checkboxes: Toggle visually

---

### Page 6: Interactive Learning Path

**Route**: `#/learning-path`  
**Source mockups**: `roadmaply_interactive_learning_path_1`, `roadmaply_interactive_learning_path_2`

#### Layout & Structure
- **Compact navbar**: Logo "Data Analyst Roadmap / Career Track" + "Career Match 60%" progress bar + "View Relevant Jobs" button + avatar
- **Vertical timeline** (left ~60% of page):
  - Alternating left/right node cards connected by vertical line
  - Each node: Icon circle (colored by status) + title + status badge + time estimate
  - Statuses: ✅ Completed (green), ⚡ In Progress (yellow/blue), 🔒 Future Topic (gray)
  - Nodes: Python Programming ✅, Advanced Excel ✅, **SQL Fundamentals** (current, highlighted), Tableau Visualization 🔒, Machine Learning Basics 🔒

- **Right sidebar — Topic detail panel** (appears when a node is selected):
  - Topic title with icon
  - STATUS: "In Progress" badge + toggle
  - OVERVIEW: Description paragraph
  - Est. Time: "4 Weeks" + Difficulty: "Medium"
  - TOP RESOURCES: List items with platform icon, course name, platform, rating stars
  - QUICK PRACTICE: Dark code block (SQL example) + "Run Query" button

#### Interactions
- Click a timeline node → update the right panel with that node's details
- "View Relevant Jobs" → navigate to `#/job-curation`
- "Run Query" → no-op or show a fake result toast
- Toggle status → visual toggle only

---

### Page 7: Skill Journey Dashboard

**Route**: `#/skill-journey`  
**Source mockups**: `roadmaply_skill_journey_dashboard_1`, `roadmaply_skill_journey_dashboard_2`

#### Layout & Structure
- **Navbar**: Logo + links (Dashboard, My Roadmaps [active], Jobs, Community) + Sign Out + avatar
- **Left sidebar**:
  - Profile card: Avatar + "Data Analyst" + "On Track" green badge
  - Nav links: Roadmap (active), Resources, Community, Settings
  - Bottom: PROGRESS 60% bar + motivational text

- **Top banner**: "Data Analyst Roadmap / Career Path · Est. 4 months left" + Readiness Score 60% + "View Relevant Jobs" button

- **Main content — Vertical skill cards**:
  - Each card: Left icon circle (colored by status) + card with title, description, skill tags, status badge, progress bar, time estimate
  - Cards: Python Programming ✅, **SQL Database Management** (In Progress, 3/7 Modules, progress bar, 2 weeks left), Data Visualization 🔒, Big Data Technologies 🔒

- **Right sidebar — Current Node panel**:
  - "⚡ Current Node" header + ✕ close
  - "SQL Databases / Core Skill · 40 Hours" card
  - AI Validate toggle
  - KEY CONCEPTS checklist: ✅ SELECT & FROM, ✅ WHERE Clauses, ◐ JOINS (half), ○ Aggregations
  - RECOMMENDED RESOURCES: Course cards (SQL for Data Science / Coursera, PostgreSQL Docs)
  - "✓ Mark as Complete" blue CTA

#### Interactions
- Click a skill card → update right panel
- "Mark as Complete" → visually update card to Completed state, unlock next card
- Sidebar nav links → hash navigation
- "View Relevant Jobs" → `#/job-analysis`

---

### Page 8: Job Analysis View

**Route**: `#/job-analysis`  
**Source mockups**: `roadmaply_job_analysis_view_1`, `roadmaply_job_analysis_view_2`

#### Layout & Structure
- **Navbar**: Logo + links (Dashboard, Career Roadmap, Job Board [active], Profile) + "Upgrade Plan" red-outlined button + avatar
- **Left sidebar**:
  - Profile: Avatar + "Career Guide / AI Assistant Active"
  - Nav: Overview, My Roadmap, **Job Analysis** (active), Applications, Settings
  - Bottom: "Weekly Goal" progress bar (15/20 jobs analyzed)

- **Middle column — Curated Matches**:
  - "12 New" badge + search/filter input
  - Job cards (stacked vertically):
    - Company logo + title + company + location + source badge (LinkedIn/JobStreet)
    - Skill tags + salary range
    - Match % badge (98%/92%/88%) — color-coded green/blue
    - Chat + mute icons + "Apply Now ↗" button
  - Selected card has dashed blue border

- **Right panel — Job Detail**:
  - Hero banner image (company office photo) + company name + role title overlay
  - Match circle: "98%" with "Exceptional Match" label + description
  - Two info cards: "Skills Verified" (checkmark) + "Growth Potential" (trending up)
  - **Requirements Analysis** list:
    - ✓ Advanced React Patterns → "Validated"
    - ✓ TypeScript Proficiency → "Validated"
    - ⚠ GraphQL Federation → "Not found in profile" (yellow bg) + "Add to Roadmap" link
    - ★ Design Systems Experience → "Bonus match detected!" (yellow bg)
  - Feedback section: "Is this recommendation helpful?" + pill buttons (Good Match, Irrelevant, Wrong Location, Salary Mismatch)

#### Interactions
- Click a job card → update right panel with that job's details
- "Apply Now ↗" → open a fake external link or toast
- Feedback pills → toggle selected state
- "Add to Roadmap" → toast "Skill added to your roadmap!"

---

### Page 9: Job Curation Dashboard

**Route**: `#/job-curation`  
**Source mockups**: `roadmaply_job_curation_dashboard_1`, `roadmaply_job_curation_dashboard_2`

#### Layout & Structure
- **Navbar**: Logo + search bar + links (Dashboard, My Roadmap, Curated Jobs [active], Profile) + "Upgrade" blue button + avatar
- **Hero**: "Frontend Developer Roadmap" + subtitle about AI finding 12 matches + "Refresh Feed" button

- **Top section — two cards side by side**:
  - **Match Confidence chart**: Bar/histogram with ranges (<60%, 60-75%, 75-90%, 90%+) + "+5% Accuracy" trending badge
  - **Your Filters card** (dark bg): Active filter pills (Remote Only ✕, React ✕, $50k+ ✕, Senior Level ✕) + "Edit Preferences" button

- **Job listing cards** (full width, stacked):
  Each card:
  - Company icon + source badge (LinkedIn/Glints overlay)
  - Job title + company + location + work type
  - Salary range badge + employment type badge (Full-time/On-site/Hybrid)
  - Match % circular indicator (92%/78%/55%) — color varies (blue/orange/red in variant 2)
  - "Apply Now ↗" button
  - Quick Feedback pills: Irrelevant, Closed, Low Salary, Unreliable
  - "Already Applied" checkbox/badge

#### Interactions
- Filter pills ✕ → remove filter visually
- "Edit Preferences" → navigate to `#/onboarding`
- "Apply Now ↗" → toast
- Quick Feedback → toggle
- "Already Applied" → toggle
- "Refresh Feed" → 1s spinner then no-op

---

### Page 10: AI CV Editor / Profile Review

**Route**: `#/cv-editor`  
**Source mockups**: `roadmaply_ai_cv_editor_view_1`, `roadmaply_ai_cv_editor_view_2`

#### Layout & Structure
- **Left sidebar nav**: Logo "Roadmaply / AI Career Guide" + links (Dashboard, **CV Validation** [active], Roadmap Gen, Job Sources, Settings)
- **Top bar**: "Review Your Profile" + subtitle (filename) + "Re-upload CV" button + user initials avatar

- **Two-column main content**:
  - **Left — PDF Preview**: Skeleton/placeholder rendering of the uploaded CV (gray blocks simulating text) with "Original PDF" badge overlay
  - **Right — Editable form cards**:
    - "Review Mode Active" info banner (blue ℹ️)
    - **Personal Information**: Full Name, Current Job Title, Email, Location — editable inputs
    - **Work Experience**: Timeline entries — title, company, date range pickers, description textarea, delete icon. "+ Add Role" link
    - (scrolls to Education, Skills sections below)

- **Bottom sticky bar**: Terms text + "Save Draft" outlined button + "Confirm Profile & Generate Roadmaps →" red/blue CTA
- **Bottom-left**: "AI Status — Parsing accuracy: 98%. Please review critical fields."

#### Interactions
- All form fields editable
- "Re-upload CV" → show file picker dialog (no-op for prototype)
- "Save Draft" → toast "Draft saved"
- "Confirm Profile & Generate Roadmaps →" → navigate to `#/career-comparison`
- Delete role icon → remove entry visually

---

## Project Structure

```
HCI/
├── index.html              # Entry point, SPA shell
├── style.css               # Global styles, design tokens, components
├── app.js                  # Router + shared state + page loader
├── data/
│   └── mock-data.js        # All hardcoded user/job/skill/roadmap data
├── components/
│   ├── navbar.js           # Shared navbar component (adapts per page)
│   ├── sidebar.js          # Shared sidebar component
│   ├── toggle.js           # Reusable toggle switch
│   ├── tag.js              # Skill tag pill component
│   ├── job-card.js         # Reusable job listing card
│   ├── timeline-node.js    # Learning path timeline node
│   └── toast.js            # Toast notification system
├── pages/
│   ├── onboarding.js       # Page 1
│   ├── data-input.js       # Page 2
│   ├── profile-validation.js # Page 3
│   ├── career-comparison.js  # Page 4
│   ├── detailed-analysis.js  # Page 5
│   ├── learning-path.js    # Page 6
│   ├── skill-journey.js    # Page 7
│   ├── job-analysis.js     # Page 8
│   ├── job-curation.js     # Page 9
│   └── cv-editor.js        # Page 10
└── assets/
    └── (generated images for company logos, profile photos, etc.)
```

---

## Wizard-of-Oz Strategy

Since this is a **hi-fi prototype** (no real backend or AI), all "intelligent" features are faked:

| Feature | WoZ Implementation |
|---|---|
| CV Parsing | Hardcoded profile data appears after a 2s "analyzing" animation |
| AI Skill Detection | Pre-populated skill tags from `mock-data.js` |
| Career Path Matching | Three fixed career paths with hardcoded match scores |
| Job Curation | Static list of ~5 job cards with pre-set match percentages |
| Match Score Calculation | Static percentages, progress bars are CSS-only |
| Salary Analysis | Hardcoded salary ranges per career path |
| "Run Query" (SQL practice) | Shows a fake result table after 1s delay |
| AI Validate toggle | Visual toggle, shows a "Validating..." toast then "Validated ✓" |
| Export PDF | Toast: "PDF export coming soon" |
| Apply Now | Toast: "Redirecting to [source]..." (no actual redirect) |
| Refresh Feed | 1s spinner animation, same data reappears |

---

## Shared Components Spec

### Navbar
- Adapts link set per page context (see each page's nav links above)
- Active link: blue text + underline
- Avatar: Circular image with border, hardcoded URL
- Some pages add: search bar, bell icon, "Upgrade" button, "Sign Out" link

### Sidebar (Pages 7, 8, 10)
- Vertical nav with icons + text
- Active item: blue bg highlight
- Profile card at top (avatar + role + status badge)
- Progress bar at bottom (Pages 7)

### Toggle Switch
- Pure CSS checkbox hack (`.peer-checked` pattern from existing code)
- States: on (blue bg) / off (gray bg)

### Skill Tag Pill
- Outlined style (border + text) for "You Have" skills
- Red/colored outline for "Missing" skills
- ✕ button for removable tags, "+ Add Skill" ghost button

### Toast Notification
- Slides in from top-right, auto-dismisses after 3s
- Variants: success (green), info (blue), warning (yellow)

---

## Implementation Phases

| Phase | Pages | Est. Effort |
|-------|-------|-------------|
| **1. Foundation** | Design system (CSS), router, shared components, mock data | ~2-3 hours |
| **2. Onboarding Flow** | Pages 1-3 (Onboarding → Data Input → Profile Validation) | ~3-4 hours |
| **3. Career Analysis** | Pages 4-5 (Career Comparison → Detailed Analysis) | ~2-3 hours |
| **4. Learning Path** | Pages 6-7 (Interactive Learning Path + Skill Journey) | ~3-4 hours |
| **5. Job Features** | Pages 8-9 (Job Analysis + Job Curation) | ~2-3 hours |
| **6. CV Editor** | Page 10 (AI CV Editor) | ~2 hours |
| **7. Polish** | Animations, transitions, responsive, cross-page state | ~2 hours |

**Total estimated: ~16-21 hours**

---

## Verification Plan

### Browser Testing
- Navigate through the full flow: Onboarding → Data Input → Profile Validation → Career Comparison → Detailed Analysis → Learning Path → Job views → CV Editor
- Verify all WoZ interactions (fake loading, toasts, toggles)
- Check responsive layout at 1440px, 1024px, 768px widths

### Visual Comparison
- Compare each built page against the original `screen.png` screenshots
- Verify color tokens, spacing, typography, and icon usage match the designs

### Interaction Testing
- All toggle switches function
- All CTAs navigate to correct routes
- Skill tags are removable
- Job cards update the detail panel on click
- Timeline nodes update the sidebar on click
