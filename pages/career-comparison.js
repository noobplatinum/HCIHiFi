// pages/career-comparison.js — Page 4: Career Path Comparison

export function render() {
  const { careerPaths } = window.__roadmaply;

  return `
  <div class="flex flex-col min-h-screen bg-slate-50">

    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div class="flex items-center justify-between max-w-[1280px] mx-auto px-6 py-3 gap-4">
        <a href="#/onboarding" class="flex items-center gap-2 shrink-0 group">
          <span class="material-symbols-outlined text-[#2563eb] text-3xl group-hover:scale-110 transition-transform">rocket_launch</span>
          <span class="text-lg font-extrabold text-slate-800 tracking-tight">Roadmaply</span>
        </a>

        <!-- Search bar -->
        <div class="relative hidden md:flex items-center">
          <span class="material-symbols-outlined absolute left-3 text-slate-400 text-xl">search</span>
          <input type="text" placeholder="Search careers, skills…"
                 class="pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none w-56 transition-all"/>
        </div>

        <nav class="hidden md:flex items-center gap-6">
          <a href="#/onboarding" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Dashboard</a>
          <a href="#/career-comparison" class="text-sm font-medium text-[#2563eb] border-b-2 border-[#2563eb] pb-0.5">Career Paths</a>
          <a href="#/skill-journey" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Skills</a>
          <a href="#/job-curation" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Community</a>
        </nav>

        <div class="flex items-center gap-2 ml-auto md:ml-0">
          <button class="hidden sm:flex items-center px-4 py-2 rounded-lg bg-[#2563eb] text-white text-sm font-bold hover:bg-[#1d4ed8] transition-colors">
            Profile
          </button>
          <button class="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <span class="material-symbols-outlined text-slate-600">notifications</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 px-4 md:px-8 lg:px-16 py-8 max-w-[1280px] mx-auto w-full">

      <!-- Hero row -->
      <div class="flex flex-wrap justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div class="flex flex-col gap-1">
          <h1 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Career Path Comparison</h1>
          <p class="text-slate-500 text-base">Compare AI-suggested roadmaps tailored to your profile and market data.</p>
        </div>
        <div class="flex items-center gap-2 self-end">
          <span class="text-sm font-semibold text-slate-600">Sort by:</span>
          <select class="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none p-2.5 transition-all">
            <option>Match Score</option>
            <option>Salary (High to Low)</option>
            <option>Difficulty (Low to High)</option>
          </select>
        </div>
      </div>

      <!-- Career Path Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        ${careerPaths.map((path, idx) => renderCareerCard(path, idx)).join('')}
      </div>

      <!-- Detailed Skill Analysis Table -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-3">
          <span class="material-symbols-outlined text-[#2563eb]">analytics</span>
          Detailed Skill Analysis
        </h2>
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Role</th>
                <th class="hidden sm:table-cell px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Current Skills</th>
                <th class="hidden md:table-cell px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Missing Critical Skills</th>
                <th class="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider">Match Score</th>
                <th class="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100" id="skill-table-body">
              ${careerPaths.map(path => renderTableRow(path)).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>`;
}

function matchBadgeClass(color) {
  const map = {
    green:  'bg-green-50 text-green-800 border-green-200',
    blue:   'bg-blue-50 text-blue-800 border-blue-200',
    gold:   'bg-amber-50 text-amber-800 border-amber-200',
  };
  return map[color] || 'bg-slate-50 text-slate-700 border-slate-200';
}

function matchBarColor(color) {
  const map = { green: '#16a34a', blue: '#2563eb', gold: '#d97706' };
  return map[color] || '#2563eb';
}

function renderCareerCard(path, idx) {
  const badgeClass = matchBadgeClass(path.matchColor);
  const isFirst = idx === 0;

  return `
  <div class="career-card flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-md hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
       data-path-id="${path.id}"
       style="border-color: ${isFirst ? path.borderColor : '#e2e8f0'};">
    <!-- Top color bar -->
    <div class="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl" style="background-color:${path.borderColor}"></div>

    <!-- Header -->
    <div class="flex justify-between items-start pt-1">
      <div>
        <h3 class="text-xl font-bold text-slate-900 leading-tight">${path.title}</h3>
        <span class="inline-flex mt-2 items-center rounded-full text-xs font-semibold px-2.5 py-1 border ${badgeClass}">
          ${path.matchLabel} (${path.matchPercent}%)
        </span>
      </div>
      <button class="bookmark-btn text-slate-400 hover:text-[#2563eb] transition-colors p-1" data-path="${path.id}">
        <span class="material-symbols-outlined">bookmark</span>
      </button>
    </div>

    <!-- Salary -->
    <div>
      <p class="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Salary Range</p>
      <p class="flex items-baseline gap-1">
        <span class="text-2xl font-black text-slate-900">IDR ${path.salaryMin}M – ${path.salaryMax}M</span>
        <span class="text-sm font-bold text-slate-500">/mo</span>
      </p>
    </div>

    <!-- Metrics grid -->
    <div class="grid grid-cols-2 gap-3 my-1">
      ${renderMetric('Availability', path.metrics.availability, path.borderColor)}
      ${renderMetric('Competition', path.metrics.competition, path.borderColor)}
      ${renderMetric('Difficulty', path.metrics.difficulty, path.borderColor)}
    </div>

    <!-- Skill Gap -->
    <div class="border-t border-slate-100 pt-4 mt-1">
      <p class="text-xs font-bold text-slate-800 mb-3">Skill Gap Analysis</p>
      <div class="space-y-3">
        <div>
          <p class="text-[11px] text-slate-500 mb-1.5">You Have:</p>
          <div class="flex flex-wrap gap-1.5">
            ${path.skillsHave.map(s => `<span class="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-md border border-blue-100 font-semibold">${s}</span>`).join('')}
          </div>
        </div>
        <div>
          <p class="text-[11px] text-slate-500 mb-1.5">Missing:</p>
          <div class="flex flex-wrap gap-1.5">
            ${path.skillsMissing.map(s => `<span class="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-md border border-slate-200 font-semibold">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <button class="select-roadmap-btn w-full mt-auto flex items-center justify-center gap-2 rounded-xl h-10 px-4 font-bold text-sm transition-all active:scale-[0.98]
      ${isFirst ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg shadow-blue-500/20' : 'border-2 border-[#2563eb] text-[#2563eb] hover:bg-blue-50'}"
           data-path-id="${path.id}">
      Select This Roadmap
    </button>
  </div>`;
}

function renderMetric(label, metric, accentColor) {
  return `
  <div>
    <div class="text-xs text-slate-500 mb-1 flex items-center gap-1">
      ${label}
      <span class="material-symbols-outlined text-xs text-slate-400 cursor-help" title="${label} indicator">info</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div class="h-full rounded-full" style="width:${metric.value}%;background-color:${accentColor}"></div>
      </div>
      <span class="text-xs font-bold text-slate-700 w-12 shrink-0">${metric.label}</span>
    </div>
  </div>`;
}

function renderTableRow(path) {
  const iconMap = { 'java-backend': 'code', 'frontend-dev': 'web', 'devops': 'cloud' };
  const icon = iconMap[path.id] || 'work';

  return `
  <tr class="hover:bg-slate-50 transition-colors cursor-pointer table-row-link" data-path-id="${path.id}">
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="size-9 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-base">${icon}</span>
        </div>
        <span class="font-bold text-slate-900 text-sm">${path.title}</span>
      </div>
    </td>
    <td class="hidden sm:table-cell px-6 py-4">
      <div class="flex flex-wrap gap-1">
        ${path.skillsHave.map(s => `<span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-semibold">${s}</span>`).join('')}
      </div>
    </td>
    <td class="hidden md:table-cell px-6 py-4">
      <div class="flex flex-wrap gap-1">
        ${path.skillsMissing.map(s => `<span class="bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded text-xs font-semibold">${s}</span>`).join('')}
      </div>
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div class="h-full rounded-full" style="width:${path.matchPercent}%;background-color:${matchBarColor(path.matchColor)}"></div>
        </div>
        <span class="font-bold text-slate-900 text-sm">${path.matchPercent}%</span>
      </div>
    </td>
    <td class="px-6 py-4 text-right">
      <button class="text-slate-400 hover:text-[#2563eb] transition-colors">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </td>
  </tr>`;
}

// matchBarColor defined above at line 103

export function init() {
  // Select Roadmap buttons (cards)
  document.querySelectorAll('.select-roadmap-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pathId = btn.dataset.pathId;
      window.__roadmaply.state.selectedCareerPath = pathId;

      // Brief highlight animation
      btn.textContent = 'Loading…';
      btn.disabled = true;
      setTimeout(() => { window.location.hash = '#/detailed-analysis'; }, 800);
    });
  });

  // Career cards click (body)
  document.querySelectorAll('.career-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.select-roadmap-btn') || e.target.closest('.bookmark-btn')) return;
      window.__roadmaply.state.selectedCareerPath = card.dataset.pathId;
      window.location.hash = '#/detailed-analysis';
    });
  });

  // Bookmark toggle
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = btn.querySelector('.material-symbols-outlined');
      const isBookmarked = icon.style.fontVariationSettings?.includes('FILL') && icon.style.fontVariationSettings.includes('1');
      if (isBookmarked) {
        icon.style.fontVariationSettings = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
        icon.style.color = '';
        window.showToast?.('Bookmark removed', 'info');
      } else {
        icon.style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24";
        icon.style.color = '#2563eb';
        window.showToast?.('Career path bookmarked!', 'success');
      }
    });
  });

  // Table row clicks
  document.querySelectorAll('.table-row-link').forEach(row => {
    row.addEventListener('click', () => {
      window.__roadmaply.state.selectedCareerPath = row.dataset.pathId;
      window.location.hash = '#/detailed-analysis';
    });
  });

  // Animate metric bars on load
  setTimeout(() => {
    document.querySelectorAll('.career-card .h-full.rounded-full').forEach(bar => {
      const targetW = bar.style.width;
      bar.style.width = '0%';
      bar.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => { bar.style.width = targetW; }, 50);
    });
  }, 50);
}
