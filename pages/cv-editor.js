// pages/cv-editor.js — Page 10: AI CV Editor

export function render() {
  const { user, workExperience, education, skills } = window.__roadmaply;

  return `
  <div class="flex h-screen overflow-hidden bg-slate-50">

    <!-- Sidebar -->
    <aside class="w-60 flex-shrink-0 h-full bg-white border-r border-slate-200 flex flex-col justify-between">
      <div class="flex flex-col gap-4 p-4">
        <div class="flex gap-3 items-center mb-2">
          <div class="size-10 rounded-xl bg-[#2563eb]/10 flex items-center justify-center text-[#2563eb]">
            <span class="material-symbols-outlined text-2xl">rocket_launch</span>
          </div>
          <div>
            <h1 class="text-base font-bold text-slate-900">Roadmaply</h1>
            <p class="text-xs text-slate-400">AI Career Guide</p>
          </div>
        </div>
        <nav class="flex flex-col gap-1">
          ${[
            ['dashboard','Dashboard','#/onboarding',false],
            ['description','CV Validation','#/cv-editor',true],
            ['map','Roadmap Gen','#/skill-journey',false],
            ['work','Job Sources','#/job-analysis',false],
            ['settings','Settings','#/cv-editor',false],
          ].map(([icon, label, href, active]) => `
          <a href="${href}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl group ${active ? 'bg-[#2563eb]/10 text-[#2563eb]' : 'text-slate-600 hover:bg-slate-50 transition-colors'}">
            <span class="material-symbols-outlined text-xl ${active ? 'text-[#2563eb]' : 'text-slate-400 group-hover:text-[#2563eb] transition-colors'}" ${active ? "style=\"font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24\"" : ''}>${icon}</span>
            <span class="text-sm font-${active ? 'bold' : 'medium'}">${label}</span>
          </a>`).join('')}
        </nav>
      </div>
      <!-- AI Status -->
      <div class="p-4 border-t border-slate-200">
        <div class="bg-blue-50 p-3 rounded-2xl">
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-[#2563eb] text-base">auto_awesome</span>
            <p class="text-xs font-bold text-slate-700">AI Status</p>
          </div>
          <p class="text-xs text-slate-500">Parsing accuracy: <span class="text-green-600 font-bold">98%</span>. Please review critical fields.</p>
        </div>
      </div>
    </aside>

    <!-- Main area -->
    <div class="flex-1 flex flex-col h-full min-w-0 relative">
      <!-- Header -->
      <header class="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0 z-10">
        <div>
          <h2 class="text-base font-bold text-slate-900">Review Your Profile</h2>
          <p class="text-xs text-slate-400">Verify AI-parsed details from "${user.cv || 'Resume_' + user.name.replace(' ', '_') + '.pdf'}"</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="reupload-btn" class="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors">
            <span class="material-symbols-outlined text-base">upload_file</span>Re-upload CV
          </button>
          <div class="size-9 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center font-bold text-sm">${user.initials}</div>
        </div>
      </header>

      <!-- Split view -->
      <div class="flex-1 flex overflow-hidden">

        <!-- LEFT: PDF Preview skeleton -->
        <div class="w-1/2 h-full bg-slate-100 p-6 overflow-y-auto border-r border-slate-200 hidden lg:block">
          <div class="bg-white shadow-sm rounded-2xl min-h-[800px] w-full max-w-[600px] mx-auto p-8 relative">
            <div class="absolute top-4 right-4 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm font-semibold">Original PDF</div>

            <!-- Simulated name block -->
            <div class="flex justify-between items-start border-b border-slate-200 pb-6 mb-6">
              <div>
                <div class="h-7 w-44 bg-slate-200 rounded-lg mb-2 animate-pulse"></div>
                <div class="h-3 w-32 bg-slate-100 rounded"></div>
              </div>
              <div class="size-16 bg-slate-200 rounded-full animate-pulse"></div>
            </div>

            <!-- Simulated sections -->
            <div class="space-y-6">
              <div class="space-y-2">
                <div class="h-4 w-24 bg-slate-300 rounded-lg"></div>
                <div class="h-3 w-full bg-slate-100 rounded"></div>
                <div class="h-3 w-5/6 bg-slate-100 rounded"></div>
                <div class="h-3 w-4/6 bg-slate-100 rounded"></div>
              </div>
              <div class="space-y-3 pt-2">
                <div class="h-4 w-32 bg-slate-300 rounded-lg"></div>
                ${[1,2].map(() => `
                <div class="flex gap-4">
                  <div class="w-1 bg-[#2563eb]/30 rounded-full self-stretch shrink-0"></div>
                  <div class="flex-1 space-y-2">
                    <div class="flex justify-between">
                      <div class="h-3 w-32 bg-slate-200 rounded"></div>
                      <div class="h-3 w-14 bg-slate-200 rounded"></div>
                    </div>
                    <div class="h-3 w-full bg-slate-100 rounded"></div>
                    <div class="h-3 w-4/5 bg-slate-100 rounded"></div>
                  </div>
                </div>`).join('')}
              </div>
              <div class="space-y-2 pt-2">
                <div class="h-4 w-16 bg-slate-300 rounded-lg"></div>
                <div class="flex flex-wrap gap-2">
                  ${[16, 20, 14, 22, 18].map(w => `<div class="h-6 rounded-full bg-slate-100" style="width:${w*4}px"></div>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Editable form -->
        <div class="w-full lg:w-1/2 h-full overflow-y-auto p-6 pb-28 space-y-6">

          <!-- AI info banner -->
          <div class="flex gap-3 items-start p-4 bg-blue-50 border border-blue-100 rounded-2xl">
            <span class="material-symbols-outlined text-[#2563eb] mt-0.5">info</span>
            <div>
              <h4 class="text-sm font-bold text-slate-900">Review Mode Active</h4>
              <p class="text-sm text-slate-500 mt-0.5">Our AI has pre-filled these fields. Edit anything that looks incorrect to ensure the best roadmap generation.</p>
            </div>
          </div>

          <!-- Personal Info -->
          <section class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div class="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
              <span class="material-symbols-outlined text-slate-400">person</span>
              <h3 class="text-base font-bold text-slate-900">Personal Information</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${[
                ['Full Name', user.name, 'text'],
                ['Current Job Title', user.title, 'text'],
                ['Email Address', user.email, 'email'],
                ['Location', user.location, 'text'],
              ].map(([label, val, type]) => `
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">${label}</label>
                <input type="${type}" value="${val}" class="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2.5 focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none transition-all hover:border-slate-300"/>
              </div>`).join('')}
            </div>
          </section>

          <!-- Work Experience -->
          <section class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div class="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-slate-400">work_history</span>
                <h3 class="text-base font-bold text-slate-900">Work Experience</h3>
              </div>
              <button id="add-exp-btn" class="text-[#2563eb] text-sm font-semibold flex items-center gap-1 hover:text-[#1d4ed8] transition-colors">
                <span class="material-symbols-outlined text-base">add</span>Add Role
              </button>
            </div>
            <div class="relative pl-4 space-y-6 border-l-2 border-slate-200 ml-2" id="cv-exp-list">
              ${workExperience.map((exp, idx) => `
              <div class="relative pl-6 cv-exp-item" data-exp-id="${exp.id}">
                <div class="absolute -left-[9px] top-1.5 size-4 rounded-full bg-white border-2 ${idx === 0 ? 'border-[#2563eb]' : 'border-slate-300'}"></div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div class="flex justify-between items-start">
                    <div class="flex-1 space-y-1.5">
                      <input type="text" value="${exp.title}" class="font-bold text-slate-900 bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-[#2563eb] focus:ring-0 p-0 w-full text-sm transition-colors outline-none"/>
                      <input type="text" value="${exp.company}" class="text-slate-500 text-sm bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-[#2563eb] focus:ring-0 p-0 w-full transition-colors outline-none"/>
                    </div>
                    <button class="delete-exp-btn text-slate-300 hover:text-red-400 transition-colors p-1" data-id="${exp.id}">
                      <span class="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                  <div class="flex items-center gap-2">
                    <input type="text" value="${exp.startDate}" class="w-24 text-xs px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-center outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"/>
                    <span class="text-slate-400 text-xs">–</span>
                    <input type="text" value="${exp.endDate}" class="w-24 text-xs px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-center outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"/>
                  </div>
                  <textarea class="w-full text-sm text-slate-600 bg-white border border-slate-200 rounded-xl p-3 resize-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none" rows="3">${exp.description}</textarea>
                </div>
              </div>`).join('')}
            </div>
          </section>

          <!-- Education -->
          <section class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div class="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-slate-400">school</span>
                <h3 class="text-base font-bold text-slate-900">Education</h3>
              </div>
              <button class="text-[#2563eb] text-sm font-semibold flex items-center gap-1 hover:text-[#1d4ed8] transition-colors">
                <span class="material-symbols-outlined text-base">add</span>Add
              </button>
            </div>
            ${education.map(edu => `
            <div class="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 hover:border-[#2563eb]/40 transition-colors cursor-pointer group bg-slate-50">
              <div class="bg-white p-2 rounded-xl shadow-sm shrink-0">
                <span class="material-symbols-outlined text-slate-400">account_balance</span>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <h4 class="font-bold text-slate-900 text-sm">${edu.degree}</h4>
                  <span class="text-xs text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-lg">${edu.startDate} – ${edu.endDate}</span>
                </div>
                <p class="text-sm text-slate-500 mt-0.5">${edu.school}</p>
              </div>
              <button class="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-[#2563eb] transition-all">
                <span class="material-symbols-outlined text-base">edit</span>
              </button>
            </div>`).join('')}
          </section>

          <!-- Skills Matrix -->
          <section class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div class="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
              <span class="material-symbols-outlined text-slate-400">psychology</span>
              <h3 class="text-base font-bold text-slate-900">Skills Matrix</h3>
            </div>
            <div class="space-y-5">
              <!-- Technical skills -->
              <div>
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Technical Skills</label>
                <div class="flex flex-wrap gap-2" id="cv-tech-skills">
                  ${skills.technical.map(s => cvSkillTag(s, 'cv-tech')).join('')}
                  <input id="cv-add-tech" type="text" placeholder="+ Add skill" class="bg-transparent border-b border-slate-300 text-sm text-slate-600 w-24 focus:outline-none focus:border-[#2563eb] px-1 py-1"/>
                </div>
              </div>
              <!-- Soft skills -->
              <div>
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Soft Skills</label>
                <div class="flex flex-wrap gap-2" id="cv-soft-skills">
                  ${skills.soft.map(s => cvSkillTag(s, 'cv-soft')).join('')}
                  <input id="cv-add-soft" type="text" placeholder="+ Add skill" class="bg-transparent border-b border-slate-300 text-sm text-slate-600 w-24 focus:outline-none focus:border-[#2563eb] px-1 py-1"/>
                </div>
              </div>
            </div>
          </section>

        </div><!-- end right form -->
      </div><!-- end split view -->

      <!-- Sticky footer -->
      <div class="absolute bottom-0 right-0 left-0 lg:left-0 p-4 bg-white/90 border-t border-slate-200 backdrop-blur-sm z-20 flex justify-end gap-3 items-center">
        <p class="text-xs text-slate-400 hidden sm:block">By confirming, you agree to our data processing terms.</p>
        <button id="save-draft-btn" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">
          Save Draft
        </button>
        <button id="confirm-cv-btn" class="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
          Confirm Profile & Generate Roadmaps
          <span class="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </div><!-- end main area -->
  </div>`;
}

function cvSkillTag(skill, type) {
  const istech = type === 'cv-tech';
  const classes = istech
    ? 'flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-sm'
    : 'flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1.5 rounded-full text-sm';
  return `
  <div class="cv-skill-tag ${classes}" data-skill="${skill}">
    ${skill}
    <button class="remove-cv-skill hover:text-red-500 flex items-center">
      <span class="material-symbols-outlined text-sm">close</span>
    </button>
  </div>`;
}

export function init() {
  // Skill tag removal
  document.querySelectorAll('.remove-cv-skill').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.closest('.cv-skill-tag');
      tag.style.transition = 'all 0.2s ease';
      tag.style.opacity = '0';
      tag.style.transform = 'scale(0.8)';
      setTimeout(() => tag.remove(), 200);
    });
  });

  // Inline skill add (tech)
  setupInlineSkillAdd('cv-add-tech', 'cv-tech-skills', 'cv-tech');
  setupInlineSkillAdd('cv-add-soft', 'cv-soft-skills', 'cv-soft');

  // Delete experience
  document.querySelectorAll('.delete-exp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.cv-exp-item');
      item.style.transition = 'all 0.25s ease';
      item.style.opacity = '0';
      item.style.transform = 'translateX(-12px)';
      setTimeout(() => item.remove(), 250);
      window.showToast?.('Experience removed', 'info');
    });
  });

  // Add role
  document.getElementById('add-exp-btn')?.addEventListener('click', () => {
    window.showToast?.('Add role form — coming soon!', 'info');
  });

  // Re-upload
  document.getElementById('reupload-btn')?.addEventListener('click', () => {
    window.location.hash = '#/onboarding';
  });

  // Save Draft
  document.getElementById('save-draft-btn')?.addEventListener('click', () => {
    window.showToast?.('Draft saved successfully!', 'success');
  });

  // Confirm & Generate
  document.getElementById('confirm-cv-btn')?.addEventListener('click', () => {
    const btn = document.getElementById('confirm-cv-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-lg">refresh</span> Generating…';
    setTimeout(() => {
      window.location.hash = '#/career-comparison';
    }, 1400);
  });
}

function setupInlineSkillAdd(inputId, containerId, type) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const commit = () => {
    const val = input.value.trim();
    if (!val) return;
    const container = document.getElementById(containerId);
    if (!container) return;
    const tagEl = document.createElement('div');
    tagEl.innerHTML = cvSkillTag(val, type);
    const tag = tagEl.firstElementChild;
    tag.querySelector('.remove-cv-skill')?.addEventListener('click', () => {
      tag.style.transition = 'all 0.2s ease';
      tag.style.opacity = '0';
      tag.style.transform = 'scale(0.8)';
      setTimeout(() => tag.remove(), 200);
    });
    container.insertBefore(tag, input);
    input.value = '';
    window.showToast?.(`Skill "${val}" added!`, 'success');
  };

  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') commit(); });
  input.addEventListener('blur', commit);
}
