// pages/job-analysis.js — Page 8: Job Analysis View

const JOBS = [
  {
    id: 'job-1', title: 'Senior UX Engineer', company: 'Google', location: 'Remote possible',
    match: 98, matchColor: '#2563eb', matchBg: 'bg-[#2563eb] text-white',
    source: 'LinkedIn', tags: ['React', 'TypeScript', '$180k - $240k'],
    active: true,
    detail: {
      matchLabel: 'Exceptional Match',
      matchDesc: 'This role aligns perfectly with your "Senior Engineer" roadmap goals.',
      skills: [
        { name: 'Advanced React Patterns', status: 'validated' },
        { name: 'TypeScript Proficiency', status: 'validated' },
        { name: 'GraphQL Federation', status: 'missing', sub: 'Not found in your profile' },
        { name: 'Design Systems Experience', status: 'bonus', sub: 'Bonus match detected!' },
      ],
    },
  },
  {
    id: 'job-2', title: 'Product Designer', company: 'Stripe', location: 'San Francisco',
    match: 92, matchColor: '#2563eb', matchBg: 'bg-blue-50 text-blue-700 border border-blue-100',
    source: 'JobStreet', tags: ['Figma', 'Design Systems'],
    active: false,
    detail: {
      matchLabel: 'Strong Match',
      matchDesc: 'Your Figma and prototyping skills are a strong fit for this role.',
      skills: [
        { name: 'Figma & Prototyping', status: 'validated' },
        { name: 'User Research', status: 'validated' },
        { name: 'Motion Design', status: 'missing', sub: 'Not found in your profile' },
        { name: 'A/B Testing Experience', status: 'bonus', sub: 'Bonus match detected!' },
      ],
    },
  },
  {
    id: 'job-3', title: 'Frontend Developer', company: 'Airbnb', location: 'New York',
    match: 88, matchColor: '#64748b', matchBg: 'bg-slate-100 text-slate-600 border border-slate-200',
    source: 'LinkedIn', tags: ['Vue.js', 'GraphQL'],
    active: false,
    detail: {
      matchLabel: 'Good Match',
      matchDesc: 'Strong Vue.js skills match this role, but GraphQL experience is needed.',
      skills: [
        { name: 'Vue.js Proficiency', status: 'validated' },
        { name: 'REST APIs', status: 'validated' },
        { name: 'GraphQL', status: 'missing', sub: 'Not found in your profile' },
      ],
    },
  },
];

function renderJobCard(job) {
  const activeBorder = job.active ? 'shadow-[0_0_0_2px_#2563eb]' : 'border border-slate-200 hover:border-[#2563eb]/40';
  return `
  <div class="job-card relative bg-white rounded-2xl p-4 cursor-pointer transition-all ${activeBorder}" data-job-id="${job.id}">
    <div class="flex justify-between items-start mb-3">
      <div class="flex gap-3">
        <div class="size-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 font-black text-xl text-[#2563eb]">
          ${job.company.charAt(0)}
        </div>
        <div>
          <h3 class="font-bold text-slate-900 text-base leading-tight">${job.title}</h3>
          <p class="text-slate-400 text-sm">${job.company} · ${job.location}</p>
        </div>
      </div>
      <div class="flex flex-col items-end gap-1">
        <span class="text-xs font-bold px-2 py-1 rounded-lg ${job.matchBg}">${job.match}% Match</span>
        <span class="text-slate-400 text-xs flex items-center gap-1">
          <span class="size-1.5 rounded-full bg-slate-300 inline-block"></span>${job.source}
        </span>
      </div>
    </div>
    <div class="flex flex-wrap gap-1.5 mb-3">
      ${job.tags.map(t => `<span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg border border-slate-200">${t}</span>`).join('')}
    </div>
    <div class="flex items-center justify-between pt-3 border-t border-slate-100">
      <div class="flex gap-1">
        <button class="feedback-btn p-1.5 rounded-full text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors" data-fb="irrelevant" title="Irrelevant">
          <span class="material-symbols-outlined text-lg">thumb_down</span>
        </button>
        <button class="feedback-btn p-1.5 rounded-full text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors" data-fb="closed" title="Closed Position">
          <span class="material-symbols-outlined text-lg">block</span>
        </button>
      </div>
      <button class="apply-btn text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1 transition-all ${job.active ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}" data-job-id="${job.id}">
        Apply Now
        <span class="material-symbols-outlined text-base">open_in_new</span>
      </button>
    </div>
  </div>`;
}

function matchDonut(pct, color) {
  const dash = (pct / 100) * 100;
  return `
  <div class="relative size-16 shrink-0">
    <svg class="size-full -rotate-90" viewBox="0 0 36 36">
      <path class="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3"></path>
      <path stroke="${color}" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-dasharray="${dash}, 100" stroke-width="3"></path>
    </svg>
    <div class="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-900">${pct}%</div>
  </div>`;
}

function renderDetailPanel(job) {
  const d = job.detail;
  return `
  <div class="flex flex-col h-full">
    <!-- Hero image area -->
    <div class="h-44 w-full relative shrink-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-[#2563eb] to-slate-800"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div class="absolute bottom-5 left-6 text-white z-10">
        <div class="flex items-center gap-3 mb-2">
          <div class="bg-white/20 backdrop-blur-sm size-9 rounded-xl flex items-center justify-center font-black text-lg">
            ${job.company.charAt(0)}
          </div>
          <h2 class="text-xl font-bold">${job.company}</h2>
        </div>
        <h1 class="text-2xl font-extrabold tracking-tight">${job.title}</h1>
      </div>
    </div>

    <!-- Scrollable body -->
    <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <!-- Match score row -->
      <div class="flex items-center gap-4">
        ${matchDonut(job.match, '#2563eb')}
        <div>
          <h3 class="text-base font-bold text-slate-900">${d.matchLabel}</h3>
          <p class="text-sm text-slate-400 leading-snug">${d.matchDesc}</p>
        </div>
      </div>

      <!-- Analysis cards -->
      <div class="grid grid-cols-2 gap-3">
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-[#2563eb]">check_circle</span>
            <h4 class="font-bold text-sm text-slate-900">Skills Verified</h4>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">Your profile confirms the key required technical skills for this role.</p>
        </div>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-[#2563eb]">trending_up</span>
            <h4 class="font-bold text-sm text-slate-900">Growth Potential</h4>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">This role offers a 25% salary increase and leadership opportunities.</p>
        </div>
      </div>

      <!-- Requirements -->
      <div>
        <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span class="material-symbols-outlined text-[#2563eb]">fact_check</span>
          Requirements Analysis
        </h3>
        <div class="space-y-2">
          ${d.skills.map(s => {
            if (s.status === 'validated') return `
            <div class="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div class="flex items-center gap-3">
                <div class="bg-blue-50 p-1.5 rounded-lg text-[#2563eb]"><span class="material-symbols-outlined text-lg">check</span></div>
                <span class="text-sm font-semibold text-slate-900">${s.name}</span>
              </div>
              <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">Validated</span>
            </div>`;
            if (s.status === 'missing') return `
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200">
              <div class="flex items-center gap-3">
                <div class="bg-slate-100 p-1.5 rounded-lg text-slate-400"><span class="material-symbols-outlined text-lg">priority_high</span></div>
                <div>
                  <p class="text-sm font-semibold text-slate-900">${s.name}</p>
                  <p class="text-xs text-slate-400">${s.sub}</p>
                </div>
              </div>
              <button class="add-to-roadmap text-xs font-bold text-[#2563eb] underline decoration-dotted hover:no-underline">Add to Roadmap</button>
            </div>`;
            return `
            <div class="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
              <div class="bg-white p-1.5 rounded-lg text-[#2563eb] shadow-sm"><span class="material-symbols-outlined text-lg">star</span></div>
              <div>
                <p class="text-sm font-semibold text-slate-900">${s.name}</p>
                <p class="text-xs text-[#2563eb] font-semibold">${s.sub}</p>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Feedback row -->
      <div class="pt-2 border-t border-slate-100">
        <p class="text-sm font-semibold text-slate-400 mb-3">Is this recommendation helpful?</p>
        <div class="flex flex-wrap gap-2">
          ${[['thumb_up','Good Match'],['thumb_down','Irrelevant'],['location_off','Wrong Location'],['money_off','Salary Mismatch']].map(([icon, label]) => `
          <button class="detail-feedback flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold transition-colors">
            <span class="material-symbols-outlined text-lg text-slate-400">${icon}</span>${label}
          </button>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

export function render() {
  const { user } = window.__roadmaply;
  const activeJob = JOBS[0];

  return `
  <div class="flex flex-col h-screen overflow-hidden bg-slate-50">
    <!-- Navbar -->
    <header class="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 shrink-0 z-20">
      <a href="#/onboarding" class="flex items-center gap-2 group">
        <span class="material-symbols-outlined text-[#2563eb] text-3xl group-hover:scale-110 transition-transform">rocket_launch</span>
        <span class="text-lg font-extrabold text-slate-800">Roadmaply</span>
      </a>
      <nav class="hidden md:flex items-center gap-6">
        <a href="#/onboarding" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Dashboard</a>
        <a href="#/skill-journey" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Career Roadmap</a>
        <a href="#/job-analysis" class="text-sm font-bold text-[#2563eb] border-b-2 border-[#2563eb] pb-0.5">Job Board</a>
        <a href="#/cv-editor" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Profile</a>
      </nav>
      <div class="flex items-center gap-3">
        <button class="hidden sm:flex items-center rounded-xl h-9 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold transition-colors">Upgrade Plan</button>
        <img src="${user.avatar}" alt="avatar" class="size-9 rounded-full border border-slate-200 object-cover"/>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Left sidebar -->
      <aside class="w-60 bg-white border-r border-slate-200 flex-col hidden lg:flex shrink-0">
        <div class="flex flex-col gap-4 p-4">
          <div class="flex gap-3 items-center mb-1">
            <div class="size-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center text-[#2563eb]">
              <span class="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <h2 class="text-sm font-bold text-slate-900">Career Guide</h2>
              <p class="text-xs text-slate-400">AI Assistant Active</p>
            </div>
          </div>
          <nav class="flex flex-col gap-1">
            ${[['dashboard','Overview','#/onboarding'],['map','My Roadmap','#/skill-journey'],['work','Job Analysis','#/job-analysis'],['description','Applications','#/cv-editor'],['settings','Settings','#/cv-editor']].map(([icon, label, href]) => `
            <a href="${href}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl group ${label==='Job Analysis' ? 'bg-[#2563eb]/10 text-[#2563eb] font-bold' : 'text-slate-600 hover:bg-slate-50 transition-colors'}">
              <span class="material-symbols-outlined text-xl ${label==='Job Analysis' ? 'text-[#2563eb]' : 'text-slate-400 group-hover:text-[#2563eb] transition-colors'}">${icon}</span>
              <span class="text-sm">${label}</span>
            </a>`).join('')}
          </nav>
        </div>
        <!-- Weekly goal -->
        <div class="mt-auto p-4 border-t border-slate-200">
          <div class="bg-gradient-to-br from-[#2563eb]/10 to-blue-100/30 rounded-2xl p-4">
            <p class="text-xs font-bold text-[#2563eb] mb-2">Weekly Goal</p>
            <div class="w-full bg-slate-200 rounded-full h-1.5 mb-2">
              <div class="bg-[#2563eb] h-1.5 rounded-full" style="width:75%"></div>
            </div>
            <p class="text-xs text-slate-500">15 / 20 jobs analyzed</p>
          </div>
        </div>
      </aside>

      <!-- Jobs list panel -->
      <div class="w-full lg:w-[42%] xl:w-[38%] flex flex-col border-r border-slate-200 bg-slate-50">
        <!-- List header -->
        <div class="p-4 border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg font-bold text-slate-900">Curated Matches</h2>
            <span class="text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded-full">12 New</span>
          </div>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input id="job-search" class="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-[#2563eb]/20 outline-none placeholder:text-slate-400" placeholder="Filter by title, company, or skills…"/>
          </div>
        </div>
        <!-- Job list -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3" id="job-list">
          ${JOBS.map(j => renderJobCard(j)).join('')}
        </div>
      </div>

      <!-- Right detail panel -->
      <div id="job-detail-panel" class="hidden lg:flex flex-1 flex-col bg-white overflow-y-auto">
        ${renderDetailPanel(activeJob)}
      </div>
    </div>
  </div>`;
}

export function init() {
  let activeJobId = JOBS[0].id;

  function selectJob(jobId) {
    activeJobId = jobId;
    const job = JOBS.find(j => j.id === jobId);
    if (!job) return;
    // Update detail panel
    const panel = document.getElementById('job-detail-panel');
    if (panel) panel.innerHTML = renderDetailPanel(job);
    initDetailEvents();
    // Update card borders
    document.querySelectorAll('.job-card').forEach(c => {
      const isActive = c.dataset.jobId === jobId;
      c.classList.toggle('shadow-[0_0_0_2px_#2563eb]', isActive);
      c.classList.toggle('border', !isActive);
      c.classList.toggle('border-slate-200', !isActive);
    });
    // Update apply buttons
    document.querySelectorAll('.apply-btn').forEach(btn => {
      const isActive = btn.dataset.jobId === jobId;
      btn.className = `apply-btn text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1 transition-all ${isActive ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`;
    });
  }

  // Job card clicks
  document.querySelectorAll('.job-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.feedback-btn') || e.target.closest('.apply-btn')) return;
      selectJob(card.dataset.jobId);
    });
  });

  // Feedback buttons
  document.querySelectorAll('.feedback-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.job-card');
      const messages = { irrelevant: 'Marked as irrelevant', closed: 'Marked as closed position' };
      window.showToast?.(messages[btn.dataset.fb] || 'Feedback recorded', 'info');
      card.style.opacity = '0.4';
      card.style.pointerEvents = 'none';
    });
  });

  // Search
  document.getElementById('job-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.job-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });

  initDetailEvents();

  function initDetailEvents() {
    document.querySelectorAll('.add-to-roadmap').forEach(btn => {
      btn.addEventListener('click', () => window.showToast?.('Added to your learning roadmap!', 'success'));
    });
    document.querySelectorAll('.detail-feedback').forEach(btn => {
      btn.addEventListener('click', () => {
        window.showToast?.('Feedback recorded — AI will refine your matches', 'info');
      });
    });
  }
}
