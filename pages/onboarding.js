// pages/onboarding.js — Page 1: CV Upload & Preferences

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
          <a href="#/onboarding" class="text-sm font-medium text-[#2563eb] border-b-2 border-[#2563eb] pb-0.5">Dashboard</a>
          <a href="#/career-comparison" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Career Path</a>
          <a href="#/cv-editor" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Settings</a>
        </nav>
        <div class="flex items-center gap-3 ml-auto md:ml-0">
          <img src="${user.avatar}" alt="User avatar" class="size-9 rounded-full border-2 border-slate-100 hover:border-[#2563eb] transition-colors object-cover cursor-pointer" />
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 flex flex-col items-center justify-start py-10 px-4 md:px-10">
      <div class="w-full max-w-[820px] space-y-8">

        <!-- Hero -->
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-slate-800">Let's build your roadmap ✨</h1>
          <p class="text-slate-500 text-base font-medium">Upload your CV and tell us your preferences to get started with AI-powered analysis.</p>
        </div>

        <!-- CV Upload Card -->
        <div class="bg-white rounded-2xl p-8 shadow-md border border-slate-200" id="cv-upload-card">
          <h2 class="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined text-[#2563eb]">upload_file</span>
            Upload Your CV
          </h2>

          <!-- Drop Zone (shown when no file) -->
          <div id="drop-zone"
               class="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#2563eb]/25 hover:border-[#2563eb]/60 transition-all bg-slate-50/70 px-6 py-14 group cursor-pointer hover:bg-blue-50/40"
               onclick="document.getElementById('cv-file-input').click()">
            <input type="file" id="cv-file-input" accept=".pdf,.docx" class="hidden" />
            <div class="flex flex-col items-center gap-3">
              <div class="size-16 rounded-full bg-blue-50 flex items-center justify-center text-[#2563eb] group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                <span class="material-symbols-outlined text-4xl">cloud_upload</span>
              </div>
              <p class="text-slate-800 text-lg font-bold text-center">Upload your CV</p>
              <p class="text-slate-400 text-sm text-center">Drag &amp; drop your resume here (PDF or DOCX)</p>
            </div>
            <button type="button"
                    class="flex items-center gap-2 overflow-hidden rounded-lg h-10 px-6 bg-white border border-slate-200 text-[#2563eb] hover:bg-slate-50 hover:border-[#2563eb]/40 text-sm font-bold transition-all shadow-sm">
              <span class="material-symbols-outlined text-base">folder_open</span>
              Browse Files
            </button>
          </div>

          <!-- Uploaded File Indicator (hidden initially) -->
          <div id="file-indicator" class="hidden mt-4 flex items-center gap-4 p-4 bg-[#2563eb]/5 border border-[#2563eb]/15 rounded-xl fade-in">
            <div class="bg-white p-2.5 rounded-lg text-[#2563eb] shadow-sm border border-[#2563eb]/10">
              <span class="material-symbols-outlined">description</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-sm text-slate-800 truncate" id="file-name">John_Doe_CV_2023.pdf</p>
              <div class="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div class="bg-[#2563eb] h-full rounded-full progress-fill" id="upload-progress" style="width:0%"></div>
              </div>
            </div>
            <button id="remove-file-btn" type="button" class="text-slate-400 hover:text-red-500 transition-colors p-1">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <!-- Career Preferences Card -->
        <div class="bg-white rounded-2xl p-8 shadow-md border border-slate-200 space-y-8">
          <h2 class="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-[#2563eb]">tune</span>
            Career Preferences
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Preferred Location -->
            <label class="flex flex-col gap-2 group">
              <span class="text-slate-700 text-sm font-bold group-focus-within:text-[#2563eb] transition-colors">Preferred Location</span>
              <div class="relative">
                <select id="pref-location"
                        class="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 text-slate-800 px-4 py-3 pr-10 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none transition-all hover:border-slate-300">
                  <option disabled selected value="">Select location</option>
                  <option value="jakarta">Jakarta, Indonesia</option>
                  <option value="bandung">Bandung, Indonesia</option>
                  <option value="remote">Remote</option>
                  <option value="surabaya">Surabaya, Indonesia</option>
                  <option value="yogyakarta">Yogyakarta, Indonesia</option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </label>

            <!-- Years of Experience -->
            <label class="flex flex-col gap-2 group">
              <span class="text-slate-700 text-sm font-bold group-focus-within:text-[#2563eb] transition-colors">Years of Experience</span>
              <div class="relative">
                <input id="years-exp" type="number" min="0" max="30" placeholder="e.g. 3"
                       class="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-800 px-4 py-3 pr-10 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none transition-all hover:border-slate-300" />
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">work_history</span>
              </div>
            </label>
          </div>

          <!-- Salary Slider -->
          <div class="flex flex-col gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
            <div class="flex justify-between items-center">
              <span class="text-slate-700 text-sm font-bold">Expected Monthly Salary (IDR)</span>
              <span class="text-[#2563eb] font-bold text-sm bg-blue-50 px-3 py-1 rounded-lg border border-blue-100" id="salary-display">
                Rp 8.000.000 – Rp 25.000.000
              </span>
            </div>
            <div class="relative mt-2 px-2" id="salary-slider-wrap">
              <!-- Track -->
              <div class="relative w-full h-2 bg-slate-200 rounded-full">
                <div class="absolute h-full bg-[#2563eb] rounded-full" id="salary-track" style="left:20%;right:30%"></div>
                <!-- Min thumb -->
                <div id="salary-thumb-min"
                     class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-5 bg-white border-2 border-[#2563eb] rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                     style="left:20%"
                     data-thumb="min"></div>
                <!-- Max thumb -->
                <div id="salary-thumb-max"
                     class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-5 bg-white border-2 border-[#2563eb] rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                     style="left:70%"
                     data-thumb="max"></div>
              </div>
            </div>
            <div class="flex justify-between text-xs text-slate-400 font-medium px-2">
              <span>Rp 5jt</span>
              <span>Rp 50jt+</span>
            </div>
          </div>

          <!-- Job Source Whitelist -->
          <div class="space-y-4">
            <h3 class="text-sm font-bold text-slate-700">Job Source Whitelist</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${renderJobSource('LinkedIn', 'in', '#0077b5', '#eff6ff', true)}
              ${renderJobSource('Glints', 'G', '#ff4f4f', '#fff1f2', true)}
              ${renderJobSource('Kalibrr', 'K', '#6366f1', '#f5f3ff', false)}
              ${renderJobSource('JobStreet', 'JS', '#e11d48', '#fff1f2', true)}
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="flex justify-end pb-10">
          <button id="analyze-btn"
                  class="flex items-center justify-center gap-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-4 px-10 rounded-xl w-full md:w-auto shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-base">
            <span class="material-symbols-outlined" id="analyze-icon">auto_awesome</span>
            <span id="analyze-label">Analyze My Profile</span>
          </button>
        </div>

      </div>
    </main>
  </div>`;
}

function renderJobSource(name, initials, color, bgColor, checked) {
  return `
  <div class="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all">
    <div class="flex items-center gap-3">
      <div class="size-9 rounded-lg flex items-center justify-center font-bold text-sm text-white" style="background-color:${color}">
        ${initials}
      </div>
      <span class="text-sm font-semibold text-slate-700">${name}</span>
    </div>
    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" class="sr-only peer" ${checked ? 'checked' : ''} />
      <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer
                  peer-checked:after:translate-x-full peer-checked:after:border-white
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                  after:bg-white after:border-gray-300 after:border after:rounded-full
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563eb]
                  transition-all"></div>
    </label>
  </div>`;
}

export function init() {
  // --- CV Upload interaction ---
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('cv-file-input');
  const fileIndicator = document.getElementById('file-indicator');
  const uploadProgress = document.getElementById('upload-progress');
  const fileName = document.getElementById('file-name');
  const removeBtn = document.getElementById('remove-file-btn');

  function showUploadedFile(name) {
    dropZone.classList.add('hidden');
    fileIndicator.classList.remove('hidden');
    fileName.textContent = name;
    // Animate progress bar
    uploadProgress.style.width = '0%';
    setTimeout(() => { uploadProgress.style.width = '100%'; }, 50);
    window.__roadmaply.state.cvUploaded = true;
  }

  // Drag & drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-[#2563eb]/70', 'bg-blue-50/60');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-[#2563eb]/70', 'bg-blue-50/60');
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    showUploadedFile(file ? file.name : 'John_Doe_CV_2023.pdf');
  });

  // File input change
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    showUploadedFile(file ? file.name : 'John_Doe_CV_2023.pdf');
  });

  // Remove file
  removeBtn.addEventListener('click', () => {
    fileIndicator.classList.add('hidden');
    dropZone.classList.remove('hidden');
    fileInput.value = '';
    window.__roadmaply.state.cvUploaded = false;
  });

  // --- Salary slider drag ---
  initSalarySlider();

  // --- CTA button ---
  const analyzeBtn = document.getElementById('analyze-btn');
  const analyzeIcon = document.getElementById('analyze-icon');
  const analyzeLabel = document.getElementById('analyze-label');

  analyzeBtn.addEventListener('click', () => {
    analyzeBtn.disabled = true;
    analyzeBtn.classList.add('opacity-80');
    analyzeIcon.innerHTML = '<span class="spinner inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>';
    analyzeLabel.textContent = 'Analyzing…';

    setTimeout(() => {
      window.location.hash = '#/data-input';
    }, 1500);
  });
}

function initSalarySlider() {
  const wrap = document.getElementById('salary-slider-wrap');
  if (!wrap) return;

  const track = document.getElementById('salary-track');
  const thumbMin = document.getElementById('salary-thumb-min');
  const thumbMax = document.getElementById('salary-thumb-max');
  const display = document.getElementById('salary-display');

  const MIN_VAL = 5;   // 5jt
  const MAX_VAL = 50;  // 50jt
  let minVal = 8;
  let maxVal = 25;

  function pct(v) { return ((v - MIN_VAL) / (MAX_VAL - MIN_VAL)) * 100; }
  function valFromPct(p) { return Math.round(MIN_VAL + (p / 100) * (MAX_VAL - MIN_VAL)); }
  function fmt(v) { return `Rp ${(v * 1_000_000).toLocaleString('id-ID')}`; }

  function updateUI() {
    const pMin = pct(minVal);
    const pMax = pct(maxVal);
    thumbMin.style.left = pMin + '%';
    thumbMax.style.left = pMax + '%';
    track.style.left = pMin + '%';
    track.style.right = (100 - pMax) + '%';
    display.textContent = `${fmt(minVal)} – ${fmt(maxVal)}`;
  }

  updateUI();

  function makeDraggable(thumb, isMin) {
    thumb.addEventListener('mousedown', (startE) => {
      startE.preventDefault();
      const trackRect = wrap.querySelector('.relative.w-full').getBoundingClientRect();

      const onMove = (e) => {
        const x = Math.max(0, Math.min(e.clientX - trackRect.left, trackRect.width));
        const p = (x / trackRect.width) * 100;
        const v = valFromPct(p);
        if (isMin) {
          minVal = Math.min(v, maxVal - 1);
        } else {
          maxVal = Math.max(v, minVal + 1);
        }
        updateUI();
      };

      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    // Touch support
    thumb.addEventListener('touchstart', (startE) => {
      startE.preventDefault();
      const trackRect = wrap.querySelector('.relative.w-full').getBoundingClientRect();

      const onMove = (e) => {
        const touch = e.touches[0];
        const x = Math.max(0, Math.min(touch.clientX - trackRect.left, trackRect.width));
        const p = (x / trackRect.width) * 100;
        const v = valFromPct(p);
        if (isMin) {
          minVal = Math.min(v, maxVal - 1);
        } else {
          maxVal = Math.max(v, minVal + 1);
        }
        updateUI();
      };

      const onEnd = () => {
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      };

      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onEnd);
    }, { passive: false });
  }

  makeDraggable(thumbMin, true);
  makeDraggable(thumbMax, false);
}
