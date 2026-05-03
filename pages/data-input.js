// pages/data-input.js — Page 2: Data Input Dashboard

export function render() {
  const { user } = window.__roadmaply;

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
          <a href="#/skill-journey" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">My Roadmap</a>
          <a href="#/cv-editor" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Settings</a>
        </nav>
        <div class="flex items-center gap-3 ml-auto md:ml-0">
          <div class="size-9 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-[#2563eb] font-bold text-sm cursor-pointer hover:border-[#2563eb] transition-colors">
            ${user.initials}
          </div>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-grow container mx-auto px-4 py-10 max-w-[1200px]">

      <!-- Hero -->
      <div class="mb-10">
        <h1 class="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">Build Your Career Roadmap</h1>
        <p class="text-slate-500 text-lg">Upload your CV and set your preferences for AI-powered analysis.</p>
      </div>

      <!-- Two-column grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <!-- Left — CV Upload -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-md flex flex-col gap-6 h-full">
            <h3 class="text-lg font-bold flex items-center gap-2 text-slate-800">
              <span class="material-symbols-outlined text-[#2563eb]">upload_file</span>
              Upload Resume
            </h3>

            <!-- Drop zone -->
            <div id="di-drop-zone"
                 class="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-10 text-center transition-all hover:border-[#2563eb] hover:bg-blue-50/30 cursor-pointer group">
              <div class="size-16 rounded-full bg-[#2563eb]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-[#2563eb] text-4xl">cloud_upload</span>
              </div>
              <p class="text-slate-800 font-bold text-lg mb-1">Click or drag file to upload</p>
              <p class="text-slate-400 text-sm mb-6">Support for PDF, DOCX (Max 10MB)</p>
              <button type="button"
                      class="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-blue-500/20 text-sm">
                Select File
              </button>
            </div>

            <!-- Uploaded file indicator (pre-filled) -->
            <div id="di-file-indicator" class="flex items-center gap-4 p-4 bg-[#2563eb]/5 border border-[#2563eb]/15 rounded-xl">
              <div class="bg-white p-2.5 rounded-lg text-[#2563eb] shadow-sm border border-[#2563eb]/10 shrink-0">
                <span class="material-symbols-outlined">description</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm text-slate-800 truncate">${user.cvFilename}</p>
                <div class="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div class="bg-[#2563eb] h-full rounded-full progress-fill" style="width:85%"></div>
                </div>
                <p class="text-xs text-slate-400 mt-1">Upload complete</p>
              </div>
              <button type="button" class="text-slate-400 hover:text-red-500 transition-colors p-1 shrink-0" id="di-remove-file">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right — Preferences + Job Sources -->
        <div class="lg:col-span-7 flex flex-col gap-6">

          <!-- Career Preferences Card -->
          <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-md">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800">
              <span class="material-symbols-outlined text-[#2563eb]">tune</span>
              Career Preferences
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

              <!-- Target Role -->
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700">Target Role</label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-xl">work</span>
                  <input type="text"
                         value="Senior Product Designer"
                         placeholder="e.g. Senior Product Designer"
                         class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all outline-none placeholder:text-slate-400 hover:border-slate-300"/>
                </div>
              </div>

              <!-- Preferred Location -->
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700">Preferred Location</label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-xl">location_on</span>
                  <input type="text"
                         value="Jakarta, Indonesia"
                         placeholder="e.g. Remote, Jakarta"
                         class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all outline-none placeholder:text-slate-400 hover:border-slate-300"/>
                </div>
              </div>

              <!-- Expected Salary -->
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700">Expected Salary (Monthly)</label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-xl">payments</span>
                  <input type="text"
                         value="Rp 8.000.000 – Rp 25.000.000"
                         placeholder="e.g. Rp 8jt - Rp 25jt"
                         class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all outline-none placeholder:text-slate-400 hover:border-slate-300"/>
                </div>
              </div>

              <!-- Experience Level -->
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-slate-700">Experience Level</label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-xl">leaderboard</span>
                  <select class="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all outline-none appearance-none cursor-pointer hover:border-slate-300">
                    <option>Entry Level (0-2 years)</option>
                    <option selected>Mid Level (3-5 years)</option>
                    <option>Senior Level (5-8 years)</option>
                    <option>Executive (8+ years)</option>
                  </select>
                  <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-xl pointer-events-none">expand_more</span>
                </div>
              </div>

            </div>
          </div>

          <!-- Job Source Whitelist -->
          <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-md">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold flex items-center gap-2 text-slate-800">
                <span class="material-symbols-outlined text-[#2563eb]">hub</span>
                Job Source Whitelist
              </h3>
              <span class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                <span class="material-symbols-outlined text-sm">check_circle</span>
                Auto-Apply Enabled
              </span>
            </div>

            <div class="space-y-3">
              ${renderDiJobSource('LinkedIn Jobs', 'in', '#0077b5', 'Global reach, professional network', true)}
              ${renderDiJobSource('Indeed', 'Indeed', '#0f2052', 'High volume aggregation', true)}
              ${renderDiJobSource('Glints', 'G', '#ff4f4f', 'Asia-Pacific focus', false)}
            </div>
          </div>

          <!-- CTA -->
          <div>
            <button id="di-analyze-btn"
                    class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-4 rounded-xl shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center gap-3 active:scale-[0.99]">
              <span class="material-symbols-outlined" id="di-analyze-icon">auto_awesome</span>
              <span id="di-analyze-label">Analyze My Profile</span>
            </button>
            <p class="text-center text-xs text-slate-400 mt-3">By clicking analyze, you agree to our <a href="#" class="underline hover:text-slate-600">Terms of Service</a> &amp; Privacy Policy.</p>
          </div>

        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-auto py-8 text-center text-slate-400 text-sm border-t border-slate-100">
      © 2024 Roadmaply Inc. All rights reserved.
    </footer>

  </div>`;
}

function renderDiJobSource(name, initials, color, subtitle, checked) {
  return `
  <div class="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0" style="background-color:${color}">
        ${initials}
      </div>
      <div>
        <p class="font-bold text-slate-800 text-sm">${name}</p>
        <p class="text-xs text-slate-400">${subtitle}</p>
      </div>
    </div>
    <label class="relative inline-flex items-center cursor-pointer shrink-0">
      <input type="checkbox" class="sr-only peer" ${checked ? 'checked' : ''} />
      <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2563eb]/30 rounded-full peer
                  peer-checked:after:translate-x-full peer-checked:after:border-white
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                  after:bg-white after:border-gray-300 after:border after:rounded-full
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563eb]"></div>
    </label>
  </div>`;
}

export function init() {
  // Remove file from pre-filled indicator
  const removeBtn = document.getElementById('di-remove-file');
  const dropZone = document.getElementById('di-drop-zone');
  const fileIndicator = document.getElementById('di-file-indicator');

  removeBtn?.addEventListener('click', () => {
    fileIndicator.classList.add('hidden');
    dropZone.classList.remove('hidden');
  });

  // CTA
  const analyzeBtn = document.getElementById('di-analyze-btn');
  const analyzeIcon = document.getElementById('di-analyze-icon');
  const analyzeLabel = document.getElementById('di-analyze-label');

  analyzeBtn?.addEventListener('click', () => {
    analyzeBtn.disabled = true;
    analyzeBtn.classList.add('opacity-80');
    analyzeIcon.innerHTML = '';
    analyzeLabel.innerHTML = `
      <span class="flex items-center gap-2">
        <svg class="spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 20 20"></svg>
        Analyzing your profile…
      </span>`;

    setTimeout(() => {
      window.location.hash = '#/profile-validation';
    }, 2000);
  });
}
