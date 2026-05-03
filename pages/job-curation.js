// pages/job-curation.js — Page 9: Job Curation Dashboard

const CHART_BARS = [
  { pct: 15, label: '< 60%', color: 'bg-[#2563eb]/20 hover:bg-[#2563eb]/30' },
  { pct: 35, label: '60-75%', color: 'bg-[#2563eb]/40 hover:bg-[#2563eb]/50' },
  { pct: 65, label: '75-90%', color: 'bg-[#2563eb]/70 hover:bg-[#2563eb]/80' },
  { pct: 90, label: '90%+', color: 'bg-[#2563eb] hover:bg-[#1d4ed8]', highlight: true },
];

const FILTERS = ['Remote Only', 'React', 'IDR 50M+', 'Senior Level'];

const JOB_LISTINGS = [
  {
    id: 'jc-1',
    title: 'Senior React Developer',
    company: 'Microsoft',
    location: 'Jakarta, Indonesia (Remote)',
    salary: 'IDR 35M – 55M',
    type: 'Full-time',
    match: 92,
    source: 'in',
    sourceBg: 'bg-blue-600',
    feedback: ['Irrelevant', 'Closed', 'Low Salary', 'Unreliable'],
    alreadyApplied: false,
  },
  {
    id: 'jc-2',
    title: 'Frontend Engineer (Vue.js)',
    company: 'Tokopedia',
    location: 'Jakarta, Indonesia',
    salary: 'IDR 25M – 40M',
    type: 'On-site',
    match: 78,
    source: 'G',
    sourceBg: 'bg-slate-700',
    feedback: ['Irrelevant', 'Closed', 'Low Salary'],
    alreadyApplied: false,
  },
  {
    id: 'jc-3',
    title: 'UI Engineer (Design Systems)',
    company: 'Traveloka',
    location: 'Bali, Indonesia (Hybrid)',
    salary: 'IDR 40M – 60M',
    type: 'Hybrid',
    match: 55,
    source: 'in',
    sourceBg: 'bg-blue-600',
    feedback: ['Irrelevant', 'Closed'],
    alreadyApplied: false,
  },
];

function matchDonut(pct, color = '#2563eb') {
  const dash = pct;
  return `
  <div class="relative size-14 md:size-16 flex items-center justify-center rounded-full bg-white shadow-[0_0_10px_rgba(37,99,235,0.15)]">
    <svg class="size-full -rotate-90" viewBox="0 0 36 36">
      <path class="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3"></path>
      <path stroke="${color}" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-dasharray="${dash}, 100" stroke-linecap="round" stroke-width="3"></path>
    </svg>
    <div class="absolute flex flex-col items-center justify-center">
      <span class="text-sm font-bold text-[#2563eb]">${pct}%</span>
    </div>
  </div>`;
}

function renderJobListing(job) {
  const typeColors = { 'Full-time': 'bg-blue-50 text-blue-700', 'On-site': 'bg-slate-100 text-slate-600 border border-slate-200', 'Hybrid': 'bg-blue-50 text-blue-700' };
  return `
  <div class="group bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-[#2563eb]/40 transition-all duration-300 job-listing-card" data-job-id="${job.id}">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Left: company + details -->
      <div class="flex items-start gap-4 flex-1">
        <div class="relative shrink-0">
          <div class="size-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden font-black text-2xl text-slate-600">
            ${job.company.charAt(0)}
          </div>
          <div class="absolute -bottom-2 -right-2 ${job.sourceBg} text-white p-1 rounded-full shadow-sm border-2 border-white flex items-center justify-center">
            <span class="text-[10px] font-bold px-0.5">${job.source}</span>
          </div>
        </div>
        <div>
          <h3 class="text-lg md:text-xl font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">${job.title}</h3>
          <p class="text-slate-400 font-medium text-sm mb-2">${job.company} · ${job.location}</p>
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">${job.salary}</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${typeColors[job.type] || 'bg-slate-100 text-slate-600'}">${job.type}</span>
          </div>
        </div>
      </div>
      <!-- Right: match + apply -->
      <div class="flex items-center gap-4 md:border-l md:border-slate-100 md:pl-6">
        <div class="flex flex-col items-center">
          ${matchDonut(job.match)}
          <span class="text-[10px] font-bold uppercase tracking-wide text-slate-400 mt-1">Match</span>
        </div>
        <div>
          <button class="apply-listing-btn w-full flex items-center justify-center gap-2 rounded-full h-10 px-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-[0.98]" data-job-id="${job.id}">
            Apply Now
            <span class="material-symbols-outlined text-lg">open_in_new</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Feedback row -->
    <div class="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
      <span class="text-xs font-bold text-slate-400 mr-1">Quick Feedback:</span>
      ${job.feedback.map((f, i) => {
        const icons = ['thumb_down', 'block', 'monetization_on', 'warning'];
        return `<button class="feedback-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-semibold transition-colors hover:text-slate-700" data-feedback="${f}" data-job="${job.id}">
          <span class="material-symbols-outlined text-base">${icons[i] || 'flag'}</span>${f}
        </button>`;
      }).join('')}
      <button class="applied-btn ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold transition-colors hover:bg-blue-100" data-job-id="${job.id}">
        <span class="material-symbols-outlined text-base">check_circle</span>Already Applied
      </button>
    </div>
  </div>`;
}

export function render() {
  const { user } = window.__roadmaply;
  return `
  <div class="flex flex-col min-h-screen bg-slate-50">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 lg:px-10">
      <div class="flex items-center gap-6">
        <a href="#/onboarding" class="flex items-center gap-2 group">
          <span class="material-symbols-outlined text-[#2563eb] text-3xl group-hover:scale-110 transition-transform">rocket_launch</span>
          <span class="text-lg font-extrabold text-slate-800 tracking-tight">Roadmaply</span>
        </a>
        <div class="hidden md:flex items-center rounded-xl h-10 bg-slate-100 w-56 overflow-hidden">
          <span class="material-symbols-outlined text-slate-400 pl-3 text-xl">search</span>
          <input class="w-full bg-transparent border-none text-slate-800 text-sm placeholder:text-slate-400 focus:ring-0 px-3" placeholder="Search jobs, skills…"/>
        </div>
      </div>
      <nav class="hidden lg:flex items-center gap-6">
        <a href="#/onboarding" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Dashboard</a>
        <a href="#/skill-journey" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">My Roadmap</a>
        <a href="#/job-curation" class="text-sm font-bold text-[#2563eb] border-b-2 border-[#2563eb] pb-0.5">Curated Jobs</a>
        <a href="#/cv-editor" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Profile</a>
      </nav>
      <div class="flex items-center gap-3">
        <button class="hidden sm:flex items-center rounded-full h-10 px-5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold transition-colors">Upgrade</button>
        <img src="${user.avatar}" alt="avatar" class="size-10 rounded-full ring-2 ring-white shadow-sm object-cover"/>
      </div>
    </header>

    <main class="flex-1 px-4 md:px-10 py-8 mx-auto w-full max-w-7xl">
      <!-- Hero -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Frontend Developer Roadmap</h1>
          <p class="text-slate-400 text-base font-medium mt-1">Our AI found <strong class="text-slate-700">12 new matches</strong> today based on your skills and preferences.</p>
        </div>
        <button id="refresh-btn" class="group flex items-center gap-2 rounded-full h-10 px-5 bg-white border border-slate-200 hover:border-[#2563eb]/40 hover:bg-slate-50 shadow-sm transition-all self-start md:self-auto">
          <span class="material-symbols-outlined text-[#2563eb] text-xl group-hover:rotate-180 transition-transform duration-500">refresh</span>
          <span class="text-slate-700 text-sm font-semibold">Refresh Feed</span>
        </button>
      </div>

      <!-- Top widgets row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Match Confidence Chart (2 cols) -->
        <div class="col-span-1 lg:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-slate-100">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-lg font-bold text-slate-900">Match Confidence</h3>
              <p class="text-slate-400 text-sm">Distribution of job relevance scores</p>
            </div>
            <div class="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
              <span class="material-symbols-outlined text-[#2563eb] text-base">trending_up</span>
              <span class="text-[#2563eb] text-xs font-bold">+5% Accuracy</span>
            </div>
          </div>
          <!-- Bar chart -->
          <div class="flex items-end gap-3 h-36 w-full">
            ${CHART_BARS.map(b => `
            <div class="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
              <div class="w-full rounded-t-xl relative h-full overflow-hidden bg-slate-100">
                <div class="absolute bottom-0 w-full ${b.color} transition-all chart-bar rounded-t-xl" style="height:${b.pct}%"></div>
              </div>
              <span class="text-xs font-${b.highlight ? 'bold text-[#2563eb]' : 'semibold text-slate-400'}">${b.label}</span>
            </div>`).join('')}
          </div>
        </div>

        <!-- Active Filters (1 col) -->
        <div class="bg-[#2563eb] text-white rounded-2xl p-6 shadow-lg shadow-blue-500/20 flex flex-col justify-between relative overflow-hidden">
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
          <div class="relative z-10">
            <h3 class="text-xl font-bold mb-1">Your Filters</h3>
            <p class="text-blue-100 text-sm mb-5">Active preferences for this feed</p>
            <div class="flex flex-wrap gap-2" id="filter-chips">
              ${FILTERS.map(f => `
              <span class="filter-chip inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border border-white/10 backdrop-blur-sm" data-filter="${f}">
                ${f} <span class="material-symbols-outlined text-sm">close</span>
              </span>`).join('')}
            </div>
          </div>
          <button id="edit-prefs-btn" class="relative z-10 w-full mt-5 bg-white text-[#2563eb] hover:bg-blue-50 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm">
            Edit Preferences
          </button>
        </div>
      </div>

      <!-- Job listings -->
      <div class="flex flex-col gap-5" id="job-listings-container">
        ${JOB_LISTINGS.map(j => renderJobListing(j)).join('')}
      </div>
    </main>
  </div>`;
}

export function init() {
  // Animate chart bars on load
  setTimeout(() => {
    document.querySelectorAll('.chart-bar').forEach(bar => {
      const h = bar.style.height;
      bar.style.height = '0%';
      bar.style.transition = 'height 0.8s cubic-bezier(0.4,0,0.2,1)';
      setTimeout(() => { bar.style.height = h; }, 60);
    });
  }, 60);

  // Filter chip removal
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.style.transform = 'scale(0)';
      chip.style.opacity = '0';
      chip.style.transition = 'all 0.2s ease';
      setTimeout(() => chip.remove(), 200);
      window.showToast?.(`Filter "${chip.dataset.filter}" removed`, 'info');
    });
  });

  // Refresh button
  document.getElementById('refresh-btn')?.addEventListener('click', () => {
    window.showToast?.('Feed refreshed — 3 new matches found!', 'success');
  });

  // Edit prefs
  document.getElementById('edit-prefs-btn')?.addEventListener('click', () => {
    window.showToast?.('Preference editor coming soon!', 'info');
  });

  // Apply buttons
  document.querySelectorAll('.apply-listing-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const original = btn.innerHTML;
      btn.innerHTML = '✓ Applied!';
      btn.classList.add('bg-green-500', 'shadow-green-500/20');
      btn.classList.remove('bg-[#2563eb]', 'hover:bg-[#1d4ed8]');
      window.showToast?.('Application submitted!', 'success');
      setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove('bg-green-500', 'shadow-green-500/20');
        btn.classList.add('bg-[#2563eb]', 'hover:bg-[#1d4ed8]');
      }, 2500);
    });
  });

  // Feedback chips
  document.querySelectorAll('.feedback-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('border-[#2563eb]/30', 'bg-[#2563eb]/5', 'text-[#2563eb]');
      window.showToast?.(`Feedback: "${btn.dataset.feedback}" recorded`, 'info');
    });
  });

  // Already applied
  document.querySelectorAll('.applied-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.job-listing-card');
      btn.classList.add('bg-green-50', 'border-green-200', 'text-green-700');
      btn.innerHTML = '<span class="material-symbols-outlined text-base">check_circle</span>Applied ✓';
      card.style.opacity = '0.65';
      window.showToast?.('Marked as already applied!', 'success');
    });
  });
}
