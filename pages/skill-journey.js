// pages/skill-journey.js — Page 7: Skill Journey Dashboard

const SKILL_CARDS = [
  {
    id: 'skill-python',
    nodeId: 'node-1',
    title: 'Python Programming',
    desc: 'Mastering Python basics, data structures, and libraries like Pandas and NumPy for data manipulation.',
    tags: ['Pandas', 'NumPy', 'Matplotlib'],
    status: 'completed',
    progress: 100,
    modules: '7/7 Modules',
    timeLeft: null,
  },
  {
    id: 'skill-sql',
    nodeId: 'node-3',
    title: 'SQL Database Management',
    desc: 'Learn to manage and query relational databases. Understanding joins, subqueries, and database design.',
    tags: ['SELECT', 'JOIN', 'Aggregations'],
    status: 'in-progress',
    progress: 45,
    modules: '3/7 Modules',
    timeLeft: '2 weeks left',
  },
  {
    id: 'skill-viz',
    nodeId: 'node-4',
    title: 'Data Visualization',
    desc: 'Creating compelling charts and dashboards using Tableau or PowerBI to communicate insights.',
    tags: ['Tableau', 'PowerBI', 'Charts'],
    status: 'locked',
    progress: 0,
    modules: '0/6 Modules',
    timeLeft: null,
  },
  {
    id: 'skill-bigdata',
    nodeId: 'node-5',
    title: 'Big Data Technologies',
    desc: 'Introduction to Hadoop, Spark, and cloud platforms for handling massive datasets.',
    tags: ['Spark', 'Hadoop', 'AWS'],
    status: 'locked',
    progress: 0,
    modules: '0/8 Modules',
    timeLeft: null,
  },
];

const NODE_DETAILS = {
  'node-3': {
    title: 'SQL Databases',
    subtitle: 'Core Skill · 40 Hours',
    aiValidate: false,
    concepts: [
      { name: 'SELECT & FROM', done: true },
      { name: 'WHERE Clauses', done: true },
      { name: 'JOINS (Inner, Left, Right)', partial: true },
      { name: 'Aggregations', done: false },
    ],
    resources: [
      { name: 'SQL for Data Science', platform: 'Coursera · 12h', icon: 'play_circle' },
      { name: 'PostgreSQL Docs', platform: 'Official Documentation', icon: 'article' },
    ],
  },
  'node-1': {
    title: 'Python Basics',
    subtitle: 'Foundation Skill · 30 Hours',
    aiValidate: true,
    concepts: [
      { name: 'Variables & Data Types', done: true },
      { name: 'Functions & OOP', done: true },
      { name: 'Pandas & NumPy', done: true },
      { name: 'Data Wrangling', done: true },
    ],
    resources: [
      { name: 'Python for Everybody', platform: 'Coursera · 20h', icon: 'play_circle' },
      { name: 'Automate the Boring Stuff', platform: 'Free Online Book', icon: 'article' },
    ],
  },
};

export function render() {
  const { user } = window.__roadmaply;
  return `
  <div class="flex flex-col h-screen overflow-hidden bg-slate-50">

    <!-- Navbar -->
    <header class="flex items-center justify-between whitespace-nowrap border-b border-slate-200 bg-white px-6 py-3 z-30 shrink-0">
      <a href="#/onboarding" class="flex items-center gap-2 group">
        <span class="material-symbols-outlined text-[#2563eb] text-3xl group-hover:scale-110 transition-transform">rocket_launch</span>
        <span class="text-lg font-extrabold text-slate-800 tracking-tight">Roadmaply</span>
      </a>
      <nav class="hidden md:flex items-center gap-6">
        <a href="#/onboarding" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Dashboard</a>
        <a href="#/skill-journey" class="text-sm font-bold text-[#2563eb] border-b-2 border-[#2563eb] pb-0.5">My Roadmaps</a>
        <a href="#/job-analysis" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Jobs</a>
        <a href="#/job-curation" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Community</a>
      </nav>
      <div class="flex items-center gap-3">
        <button class="hidden sm:flex items-center justify-center rounded-xl h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors">Sign Out</button>
        <img src="${user.avatar}" alt="avatar" class="size-9 rounded-full ring-2 ring-white shadow-sm object-cover"/>
      </div>
    </header>

    <!-- Body: sidebar + main + right panel -->
    <div class="flex flex-1 overflow-hidden">

      <!-- Left sidebar -->
      <aside class="hidden lg:flex w-64 flex-col border-r border-slate-200 bg-white shrink-0">
        <!-- Profile card -->
        <div class="p-5 pb-2">
          <div class="flex items-center gap-3 mb-5">
            <div class="size-12 rounded-xl overflow-hidden shadow-md shrink-0">
              <img src="${user.avatar}" alt="avatar" class="w-full h-full object-cover"/>
            </div>
            <div>
              <p class="text-sm font-bold text-slate-900">Data Analyst</p>
              <span class="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-[#2563eb]">On Track</span>
            </div>
          </div>
        </div>
        <!-- Nav links -->
        <div class="flex flex-col gap-1 px-3">
          <a href="#/skill-journey" class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#2563eb]/10 text-[#2563eb] font-semibold text-sm">
            <span class="material-symbols-outlined text-xl" style="font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24">map</span>Roadmap
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
            <span class="material-symbols-outlined text-xl">library_books</span>Resources
          </a>
          <a href="#/job-curation" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
            <span class="material-symbols-outlined text-xl">groups</span>Community
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
            <span class="material-symbols-outlined text-xl">settings</span>Settings
          </a>
        </div>
        <!-- Progress -->
        <div class="mt-auto p-5 border-t border-slate-200">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</span>
            <span class="text-xs font-bold text-slate-900">60%</span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div class="bg-[#2563eb] h-2 rounded-full" style="width:60%"></div>
          </div>
          <p class="text-xs text-slate-400 mt-2">Keep going! You're closer to your goal.</p>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto bg-slate-50 p-5 lg:p-8">

        <!-- Sticky top banner -->
        <div class="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-md border border-slate-200 mb-6 backdrop-blur-md bg-opacity-95">
          <div>
            <h2 class="text-lg font-bold text-slate-900">Data Analyst Roadmap</h2>
            <div class="flex items-center gap-2 text-sm text-slate-400">
              <span>Career Path</span>
              <span class="size-1 rounded-full bg-slate-300"></span>
              <span>Est. 4 months left</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="hidden sm:flex flex-col items-end mr-1">
              <span class="text-xs text-slate-400 font-medium">Readiness Score</span>
              <span class="text-xl font-black text-[#2563eb]">60%</span>
            </div>
            <a href="#/job-analysis" class="flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2.5 text-white shadow-lg shadow-blue-500/25 hover:bg-[#1d4ed8] transition-all active:scale-[0.98]">
              <span class="material-symbols-outlined text-lg">work</span>
              <span class="text-sm font-bold">View Relevant Jobs</span>
            </a>
          </div>
        </div>

        <!-- Skill cards vertical list with timeline -->
        <div class="max-w-3xl mx-auto pb-16 relative">
          <div class="absolute left-8 top-4 bottom-0 w-0.5 bg-slate-200 z-0"></div>

          ${SKILL_CARDS.map(card => renderSkillCard(card)).join('')}
        </div>
      </main>

      <!-- Right detail panel -->
      <aside id="sj-detail-panel" class="w-80 hidden xl:flex flex-col border-l border-slate-200 bg-white shadow-xl z-20 shrink-0">
        ${renderNodeDetailPanel(NODE_DETAILS['node-3'], 'node-3')}
      </aside>
    </div>
  </div>`;
}

function renderSkillCard(card) {
  const statusCfg = {
    'completed': { icon: 'check_circle', circleClass: 'bg-blue-100 border-white text-[#2563eb]', badge: '<span class="rounded-full bg-blue-100 text-[#2563eb] px-2.5 py-1 text-xs font-bold">Completed</span>', cardClass: 'bg-white border border-slate-200 shadow-sm hover:border-blue-200' },
    'in-progress': { icon: 'bolt', circleClass: 'bg-blue-100 border-white text-[#2563eb] ring-4 ring-blue-50', badge: '<span class="rounded-full bg-blue-100 text-[#2563eb] px-2.5 py-1 text-xs font-bold animate-pulse">In Progress</span>', cardClass: 'bg-white border-2 border-[#2563eb]/30 shadow-lg' },
    'locked': { icon: 'lock', circleClass: 'bg-slate-100 border-white text-slate-400', badge: '<span class="rounded-full bg-slate-200 text-slate-500 px-2.5 py-1 text-xs font-bold">Locked</span>', cardClass: 'bg-slate-50 border border-dashed border-slate-200 opacity-70 hover:opacity-100 hover:bg-white' },
  };
  const cfg = statusCfg[card.status];

  return `
  <div class="relative z-10 flex gap-6 mb-6 group skill-card cursor-pointer" data-node-id="${card.nodeId}" data-status="${card.status}">
    <!-- Circle -->
    <div class="flex flex-col items-center shrink-0">
      <div class="flex h-16 w-16 items-center justify-center rounded-full border-4 ${cfg.circleClass} relative shadow-sm transition-transform group-hover:scale-105">
        ${card.status === 'in-progress' ? '<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-15"></span>' : ''}
        <span class="material-symbols-outlined text-3xl relative z-10" ${card.status === 'in-progress' ? 'style="font-variation-settings:\'FILL\' 1,\'wght\' 400,\'GRAD\' 0,\'opsz\' 24"' : ''}>${cfg.icon}</span>
      </div>
    </div>
    <!-- Card -->
    <div class="flex-1 rounded-2xl p-5 ${cfg.cardClass} transition-all">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-bold text-slate-900">${card.title}</h3>
        ${cfg.badge}
      </div>
      <p class="text-sm text-slate-500 mb-4 line-clamp-2">${card.desc}</p>
      <div class="flex flex-wrap gap-1.5 mb-4">
        ${card.tags.map(t => `<span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">${t}</span>`).join('')}
      </div>
      ${card.status !== 'locked' ? `
      <div class="space-y-1.5">
        <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div class="bg-[#2563eb] h-1.5 rounded-full" style="width:${card.progress}%"></div>
        </div>
        <div class="flex items-center gap-4 text-xs font-medium text-slate-400">
          ${card.timeLeft ? `<span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">schedule</span>${card.timeLeft}</span>` : ''}
          <span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">task_alt</span>${card.modules}</span>
        </div>
      </div>` : ''}
    </div>
  </div>`;
}

function renderNodeDetailPanel(detail, nodeId) {
  if (!detail) return `<div class="flex-1 flex items-center justify-center text-slate-400 text-sm p-8 text-center"><span class="material-symbols-outlined text-4xl mb-3 block">touch_app</span>Click a skill card to see details</div>`;

  return `
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
      <h3 class="font-bold text-slate-900 flex items-center gap-2">
        <span class="material-symbols-outlined text-[#2563eb]" style="font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24">bolt</span>
        Current Node
      </h3>
      <button id="close-panel-btn" class="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <!-- Body -->
    <div class="flex-1 overflow-y-auto p-5 space-y-5">
      <!-- Title card -->
      <div class="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <h2 class="text-xl font-bold text-slate-900 mb-0.5">${detail.title}</h2>
        <p class="text-sm text-slate-500">${detail.subtitle}</p>
      </div>
      <!-- AI Validate toggle -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-bold text-slate-900">AI Validate</p>
          <p class="text-xs text-slate-400">Verify skill via chat</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" id="ai-validate-toggle" ${detail.aiValidate ? 'checked' : ''}/>
          <div class="w-11 h-6 bg-slate-200 peer-focus:ring-4 peer-focus:ring-[#2563eb]/30 rounded-full peer
              peer-checked:after:translate-x-full peer-checked:after:border-white
              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
              after:bg-white after:border-gray-300 after:border after:rounded-full
              after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563eb]"></div>
        </label>
      </div>
      <!-- Key Concepts -->
      <div>
        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Concepts</h4>
        <ul class="space-y-2">
          ${detail.concepts.map(c => `
          <li class="flex items-center gap-2 text-sm ${c.done ? 'text-slate-700' : 'text-slate-400'}">
            ${c.done
              ? `<span class="material-symbols-outlined text-[#2563eb] text-lg">check_circle</span>`
              : c.partial
              ? `<div class="size-4 rounded-full border-2 border-[#2563eb] border-t-transparent animate-spin shrink-0 ml-0.5 mr-0.5"></div>`
              : `<span class="material-symbols-outlined text-slate-300 text-lg">radio_button_unchecked</span>`
            }
            ${c.name}
          </li>`).join('')}
        </ul>
      </div>
      <!-- Resources -->
      <div>
        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Recommended Resources</h4>
        <div class="flex flex-col gap-2">
          ${detail.resources.map(r => `
          <a href="#" class="group flex gap-3 p-3 rounded-xl border border-slate-200 hover:border-[#2563eb] hover:bg-slate-50 transition-all">
            <div class="size-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-slate-500 group-hover:text-[#2563eb] transition-colors">${r.icon}</span>
            </div>
            <div>
              <p class="text-sm font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">${r.name}</p>
              <p class="text-xs text-slate-400">${r.platform}</p>
            </div>
          </a>`).join('')}
        </div>
      </div>
    </div>
    <!-- Footer CTA -->
    <div class="p-4 border-t border-slate-200 bg-slate-50">
      <button id="mark-complete-btn" class="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl py-3 font-bold text-sm transition-colors shadow-md shadow-blue-500/20 active:scale-[0.98]">
        <span class="material-symbols-outlined text-lg">check</span>
        Mark as Complete
      </button>
    </div>
  </div>`;
}

export function init() {
  // Skill card click → update panel
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      const nodeId = card.dataset.nodeId;
      const status = card.dataset.status;
      if (status === 'locked') {
        window.showToast?.('Complete previous skills to unlock this!', 'warning');
        return;
      }
      const detail = NODE_DETAILS[nodeId];
      const panel = document.getElementById('sj-detail-panel');
      if (panel) {
        panel.innerHTML = renderNodeDetailPanel(detail, nodeId);
        initPanelEvents(card);
      }
      document.querySelectorAll('.skill-card').forEach(c => c.classList.remove('ring-2','ring-[#2563eb]/30','rounded-2xl'));
      card.classList.add('ring-2','ring-[#2563eb]/30','rounded-2xl');
    });
  });

  initPanelEvents();
}

function initPanelEvents(activeCard) {
  // Mark as Complete
  document.getElementById('mark-complete-btn')?.addEventListener('click', () => {
    if (activeCard) {
      const badge = activeCard.querySelector('.animate-pulse');
      if (badge) { badge.textContent = 'Completed'; badge.classList.remove('animate-pulse'); }
    }
    window.showToast?.('Skill marked as complete! Next skill unlocked 🎉', 'success');
  });
  // Close panel
  document.getElementById('close-panel-btn')?.addEventListener('click', () => {
    const panel = document.getElementById('sj-detail-panel');
    if (panel) panel.innerHTML = renderNodeDetailPanel(null, null);
  });
  // AI Validate toggle
  document.getElementById('ai-validate-toggle')?.addEventListener('change', (e) => {
    if (e.target.checked) {
      window.showToast?.('Validating… ✓ Skill validated!', 'success');
    }
  });
}
