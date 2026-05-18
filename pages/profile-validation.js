// pages/profile-validation.js — Page 3: AI Profile Validation

export function render() {
  const { user, workExperience, education, skills } = window.__roadmaply;

  const techSkills = [...skills.technical];
  const softSkills = [...skills.soft];

  return `
  <div class="flex flex-col min-h-screen bg-slate-50">

    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div class="flex items-center justify-between max-w-[1280px] mx-auto px-6 py-3 gap-4">
        <a href="#/onboarding" class="flex items-center gap-2 shrink-0 group">
          <span class="material-symbols-outlined text-[#2563eb] text-3xl group-hover:scale-110 transition-transform">rocket_launch</span>
          <span class="text-lg font-extrabold text-slate-800 tracking-tight">Roadmaply</span>
        </a>
        <nav class="hidden md:flex items-center gap-6">
          <a href="#/onboarding" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Dashboard</a>
          <a href="#/career-comparison" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Career Paths</a>
          <a href="#/profile-validation" class="text-sm font-medium text-[#2563eb] border-b-2 border-[#2563eb] pb-0.5">Profile</a>
          <a href="#/cv-editor" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Settings</a>
        </nav>
        <div class="flex items-center gap-2 ml-auto md:ml-0">
          <button class="relative p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Notifications">
            <span class="material-symbols-outlined text-slate-600">notifications</span>
            <span class="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500"></span>
          </button>
          <div class="size-9 rounded-full bg-[#2563eb]/10 border-2 border-[#2563eb]/20 flex items-center justify-center text-[#2563eb] font-bold text-sm cursor-pointer">${user.initials}</div>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-[1200px] flex flex-col lg:flex-row gap-8">

        <!-- Left: Parsed Profile Cards -->
        <div class="flex-1 flex flex-col gap-6">

          <!-- Hero -->
          <div class="flex flex-col gap-1">
            <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Verify Your Profile Details</h1>
            <p class="text-slate-500 text-base">Review the data parsed from your CV to ensure accurate roadmap generation.</p>
          </div>

          <!-- AI Parse banner -->
          <div class="flex items-center gap-3 p-4 rounded-xl bg-[#2563eb]/5 border border-[#2563eb]/15">
            <span class="material-symbols-outlined text-[#2563eb]">auto_awesome</span>
            <div>
              <p class="text-sm font-bold text-slate-800">AI Profile Parsing Complete</p>
              <p class="text-xs text-slate-500">Parsing accuracy: 98%. Please review critical fields before proceeding.</p>
            </div>
            <span class="ml-auto text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-full">98% Accurate</span>
          </div>

          <!-- Personal Information -->
          <section class="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#2563eb]">person</span>
                Personal Information
              </h2>
              <button class="text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors flex items-center gap-1">
                <span class="material-symbols-outlined text-base">edit</span>Edit
              </button>
            </div>
            <div class="p-6">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <!-- Avatar -->
                <div class="relative group shrink-0">
                  <img src="${user.avatar}" alt="Profile photo" class="size-24 rounded-full object-cover border-4 border-slate-100 shadow-sm"/>
                  <button class="absolute bottom-0.5 right-0.5 p-1.5 bg-[#2563eb] rounded-full text-white shadow-lg hover:bg-[#1d4ed8] transition-colors">
                    <span class="material-symbols-outlined text-base">edit</span>
                  </button>
                </div>
                <!-- Fields -->
                <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  ${profileField('Full Name', user.name, 'text')}
                  ${profileField('Job Title', user.title, 'text')}
                  ${profileField('Email', user.email, 'email')}
                  ${profileField('Phone', user.phone, 'tel')}
                </div>
              </div>
            </div>
          </section>

          <!-- Work Experience -->
          <section class="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#2563eb]">work</span>
                Work Experience
              </h2>
              <button id="add-role-btn" class="flex items-center gap-1 text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
                <span class="material-symbols-outlined text-base">add</span>Add Role
              </button>
            </div>
            <div class="p-6 flex flex-col gap-0" id="exp-list">
              ${workExperience.map((exp, idx) => renderExpItem(exp, idx === workExperience.length - 1)).join('')}
            </div>
          </section>

          <!-- Education -->
          <section class="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#2563eb]">school</span>
                Education
              </h2>
              <button class="flex items-center gap-1 text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
                <span class="material-symbols-outlined text-base">add</span>Add Education
              </button>
            </div>
            <div class="p-6">
              <div class="flex gap-4">
                <div class="size-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-slate-400 text-2xl">account_balance</span>
                </div>
                <div class="flex-1">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <h3 class="text-base font-bold text-slate-900">${education[0].degree}</h3>
                    <span class="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit mt-1 sm:mt-0">${education[0].startDate} – ${education[0].endDate}</span>
                  </div>
                  <p class="text-sm text-slate-500">${education[0].school}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Detected Skills -->
          <section class="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
            <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#2563eb]">psychology</span>
                Detected Skills
              </h2>
              <div class="flex items-center gap-1.5 text-xs font-semibold text-[#2563eb] bg-[#2563eb]/10 px-3 py-1 rounded-full">
                <span class="material-symbols-outlined text-sm">auto_awesome</span>
                AI Parsed
              </div>
            </div>
            <div class="p-6 space-y-6">

              <!-- Technical Skills -->
              <div>
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Technical Skills</h3>
                <div class="flex flex-wrap gap-2" id="tech-skills-container">
                  ${techSkills.map(s => renderSkillTag(s, 'tech')).join('')}
                  <button id="add-tech-skill" class="flex items-center gap-1 px-3 py-1.5 bg-transparent border border-dashed border-slate-300 rounded-lg text-sm font-semibold text-slate-500 hover:text-[#2563eb] hover:border-[#2563eb] transition-colors">
                    <span class="material-symbols-outlined text-base">add</span>Add Skill
                  </button>
                </div>
              </div>

              <!-- Soft Skills -->
              <div>
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Soft Skills</h3>
                <div class="flex flex-wrap gap-2" id="soft-skills-container">
                  ${softSkills.map(s => renderSkillTag(s, 'soft')).join('')}
                  <button id="add-soft-skill" class="flex items-center gap-1 px-3 py-1.5 bg-transparent border border-dashed border-slate-300 rounded-lg text-sm font-semibold text-slate-500 hover:text-[#2563eb] hover:border-[#2563eb] transition-colors">
                    <span class="material-symbols-outlined text-base">add</span>Add Skill
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div><!-- end left column -->

        <!-- Right Sidebar: Preferences -->
        <aside class="w-full lg:w-80 shrink-0">
          <div class="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sticky top-24 space-y-5">
            <h3 class="text-lg font-bold text-slate-900">Preferences</h3>

            <!-- Current Location -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-slate-700">Current Location</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl">location_on</span>
                <input type="text" value="${user.location}"
                       class="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all"/>
              </div>
            </div>

            <!-- Willing to Relocate -->
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-slate-700">Willing to Relocate</label>
              <label class="flex items-center cursor-pointer relative gap-3">
                <input type="checkbox" class="sr-only peer" ${user.willingToRelocate ? 'checked' : ''}/>
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2563eb]/30 rounded-full peer
                    peer-checked:after:translate-x-full peer-checked:after:border-white
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:border-gray-300 after:border after:rounded-full
                    after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563eb]"></div>
                <span class="text-sm font-medium text-slate-600">Yes, open to it</span>
              </label>
            </div>

            <hr class="border-slate-100"/>

            <!-- Platform Whitelist -->
            <div class="flex flex-col gap-3">
              <label class="text-sm font-semibold text-slate-700">Platform Whitelist</label>
              <p class="text-xs text-slate-400">Select where you want your profile to be visible.</p>
              ${[['LinkedIn Integration', true], ['Indeed', true], ['AngelList', false]].map(([name, chk]) => `
              <label class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" ${chk ? 'checked' : ''}
                       class="w-4 h-4 text-[#2563eb] bg-slate-100 border-slate-300 rounded focus:ring-[#2563eb]"/>
                <span class="text-sm text-slate-700">${name}</span>
              </label>`).join('')}
            </div>

            <!-- CTA -->
            <div class="pt-2">
              <button id="confirm-profile-btn"
                      class="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <span id="confirm-label">Confirm Profile</span>
                <span class="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
              <p class="text-center text-xs text-slate-400 mt-3">This will generate your personalized roadmaps.</p>
            </div>
          </div>
        </aside>

      </div>
    </main>
  </div>`;
}

function profileField(label, value, type) {
  return `
  <div class="flex flex-col gap-1">
    <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">${label}</label>
    <input type="${type}" value="${value}"
           class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all hover:border-slate-300"/>
  </div>`;
}

function renderExpItem(exp, isLast) {
  return `
  <div class="flex gap-4 group relative" data-exp-id="${exp.id}">
    <!-- Timeline connector -->
    <div class="flex flex-col items-center shrink-0">
      <div class="size-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm" style="background-color:${exp.color}">
        ${exp.initial}
      </div>
      ${isLast ? '' : '<div class="w-0.5 bg-slate-200 flex-1 mt-2 min-h-[32px]"></div>'}
    </div>
    <!-- Content -->
    <div class="flex-1 pb-6 ${isLast ? 'pb-0' : ''}">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
        <div>
          <h3 class="text-base font-bold text-slate-900">${exp.title}</h3>
          <p class="text-sm text-slate-500">${exp.company} · ${exp.location}</p>
        </div>
        <div class="flex items-center gap-2 mt-1 sm:mt-0">
          <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">${exp.startDate} – ${exp.endDate}</span>
          <button class="delete-exp-btn text-slate-300 hover:text-red-400 transition-colors p-1 rounded" data-id="${exp.id}">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </div>
      <textarea class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all resize-none min-h-[80px] hover:border-slate-300">${exp.description}</textarea>
    </div>
  </div>`;
}

function renderSkillTag(skill, type) {
  const issoft = type === 'soft';
  const tagClass = issoft
    ? 'bg-blue-50 text-[#2563eb] border-blue-100 hover:border-blue-300'
    : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-[#2563eb]/40';
  const xClass = issoft ? 'text-blue-300 group-hover:text-red-400' : 'text-slate-400 group-hover:text-red-500';

  return `
  <div class="skill-tag flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border cursor-pointer group transition-colors ${tagClass}" data-skill="${skill}" data-type="${type}">
    ${skill}
    <span class="material-symbols-outlined text-sm transition-colors ${xClass}">close</span>
  </div>`;
}

export function init() {
  // Skill tag removal
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      tag.style.animation = 'toastOut 0.2s ease forwards';
      setTimeout(() => tag.remove(), 200);
    });
  });

  // Add skill inputs
  setupAddSkill('add-tech-skill', 'tech-skills-container', 'tech');
  setupAddSkill('add-soft-skill', 'soft-skills-container', 'soft');

  // Delete experience entries
  document.querySelectorAll('.delete-exp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('[data-exp-id]');
      row.style.opacity = '0';
      row.style.transform = 'translateX(-12px)';
      row.style.transition = 'all 0.25s ease';
      setTimeout(() => row.remove(), 250);
      window.showToast?.('Experience entry removed', 'info');
    });
  });

  // Add Role button
  document.getElementById('add-role-btn')?.addEventListener('click', () => {
    window.showToast?.('Add role form — coming soon!', 'info');
  });

  // Confirm Profile CTA
  document.getElementById('confirm-profile-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('confirm-profile-btn');
    const label = document.getElementById('confirm-label');
    btn.disabled = true;
    btn.classList.add('opacity-80');
    label.textContent = 'Generating roadmaps…';

    const api = window.__roadmaplyApi;

    // Try to analyze career paths via backend API
    if (api && api.isAvailable) {
      try {
        api.startTaskTimer('career_analysis');
        const result = await api.analyzeCareer();

        if (result && result.career_paths) {
          window.showToast?.('Career paths generated successfully!', 'success');
          api.endTaskTimer('career_analysis', true);
          setTimeout(() => { window.location.hash = '#/career-comparison'; }, 600);
          return;
        }
      } catch (err) {
        console.warn('[ProfileValidation] API analysis failed, using fallback:', err);
      }
    }

    // Fallback: use mock data (original behaviour)
    setTimeout(() => {
      window.location.hash = '#/career-comparison';
    }, 1200);
  });
}

function setupAddSkill(btnId, containerId, type) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', () => {
    // Temporarily replace button with inline input
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Skill name…';
    input.className = 'px-3 py-1.5 rounded-lg border border-[#2563eb] text-sm outline-none focus:ring-2 focus:ring-[#2563eb]/20 w-32 font-semibold';
    btn.replaceWith(input);
    input.focus();

    const commit = () => {
      const val = input.value.trim();
      const container = document.getElementById(containerId);
      if (val && container) {
        const tagEl = document.createElement('div');
        tagEl.innerHTML = renderSkillTag(val, type);
        const newTag = tagEl.firstElementChild;
        newTag.addEventListener('click', () => {
          newTag.style.animation = 'toastOut 0.2s ease forwards';
          setTimeout(() => newTag.remove(), 200);
        });
        container.insertBefore(newTag, container.querySelector(`#${btnId}`) || container.lastElementChild);
        window.showToast?.(`Skill "${val}" added!`, 'success');
      }
      // Restore button
      const newBtn = document.createElement('button');
      newBtn.id = btnId;
      newBtn.className = 'flex items-center gap-1 px-3 py-1.5 bg-transparent border border-dashed border-slate-300 rounded-lg text-sm font-semibold text-slate-500 hover:text-[#2563eb] hover:border-[#2563eb] transition-colors';
      newBtn.innerHTML = '<span class="material-symbols-outlined text-base">add</span>Add Skill';
      input.replaceWith(newBtn);
      setupAddSkill(btnId, containerId, type);
    };

    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') commit(); });
    input.addEventListener('blur', commit);
  });
}
