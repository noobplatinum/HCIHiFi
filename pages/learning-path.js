// pages/learning-path.js — Page 6: Interactive Learning Path

export function render() {
  const { roadmapNodes, user } = window.__roadmaply;
  const icons = { 'node-1': 'check_circle', 'node-2': 'table_chart', 'node-3': 'database', 'node-4': 'bar_chart', 'node-5': 'neurology' };
  const activeNode = roadmapNodes.find(n => n.status === 'in-progress') || roadmapNodes[2];

  return `
  <div class="flex flex-col h-screen overflow-hidden bg-slate-50">

    <!-- Compact Navbar -->
    <header class="flex items-center justify-between whitespace-nowrap border-b border-slate-200 bg-white px-6 py-3 shadow-sm z-30 shrink-0">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-[#2563eb] text-2xl">hub</span>
        <div>
          <h2 class="text-base font-extrabold text-slate-800 leading-tight">Data Analyst Roadmap</h2>
          <p class="text-xs text-slate-400">Career Track</p>
        </div>
      </div>
      <!-- Progress bar -->
      <div class="hidden md:flex flex-col gap-1 w-56">
        <div class="flex justify-between text-xs font-semibold">
          <span class="text-slate-500">Career Match</span>
          <span class="text-[#2563eb]">60%</span>
        </div>
        <div class="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div class="h-full bg-[#2563eb] rounded-full" style="width:60%"></div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <a href="#/job-curation" class="flex items-center justify-center rounded-xl h-10 px-5 bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors text-white text-sm font-bold shadow-md shadow-blue-500/20">
          View Relevant Jobs
        </a>
        <img src="${user.avatar}" alt="avatar" class="size-10 rounded-full ring-2 ring-slate-100 object-cover"/>
      </div>
    </header>

    <!-- Two-panel layout -->
    <div class="flex flex-1 overflow-hidden relative">

      <!-- Timeline Canvas -->
      <main class="flex-1 relative bg-slate-50 overflow-y-auto overflow-x-hidden p-8 flex justify-center">
        <!-- Dot grid bg -->
        <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image:radial-gradient(#2563eb 1px,transparent 1px);background-size:24px 24px"></div>

        <div class="w-full max-w-2xl flex flex-col items-start py-6 relative">
          <!-- Vertical line -->
          <div class="absolute left-8 top-8 bottom-12 w-0.5 bg-slate-200 rounded-full z-0"></div>

          ${roadmapNodes.map((node, idx) => renderTimelineNode(node, icons[node.id] || 'circle', idx)).join('')}
        </div>
      </main>

      <!-- Right Sidebar: Topic Detail -->
      <aside id="node-detail-panel" class="w-96 bg-white border-l border-slate-200 shadow-xl z-20 overflow-y-auto hidden lg:flex flex-col shrink-0">
        ${renderDetailPanel(activeNode)}
      </aside>
    </div>
  </div>`;
}

function renderTimelineNode(node, icon, idx) {
  const isLeft = idx % 2 === 0;
  const statusCfg = {
    'completed': { circle: 'bg-green-100 border-white text-green-600 shadow-sm', card: 'bg-white border border-slate-100 shadow-sm opacity-80 hover:opacity-100', badge: '<span class="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full"><span class="material-symbols-outlined text-sm">done</span>Completed</span>' },
    'in-progress': { circle: 'bg-yellow-100 border-yellow-400 text-yellow-700 shadow-lg ring-4 ring-yellow-100', card: 'bg-white border-2 border-[#2563eb]/25 shadow-lg', badge: '<span class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full animate-pulse">⚡ In Progress</span>' },
    'locked': { circle: 'bg-slate-100 border-white text-slate-400 shadow-sm', card: 'bg-slate-50 border border-dashed border-slate-200', badge: '<span class="inline-flex items-center gap-1 text-xs font-medium text-slate-400 border border-slate-200 px-2 py-1 rounded-full"><span class="material-symbols-outlined text-sm">lock</span>Future Topic</span>' },
  };
  const cfg = statusCfg[node.status];

  return `
  <div class="relative z-10 w-full flex gap-6 mb-10 group node-row cursor-pointer" data-node-id="${node.id}">
    <!-- Icon circle -->
    <div class="flex flex-col items-center shrink-0">
      <div class="flex h-16 w-16 items-center justify-center rounded-full border-4 ${cfg.circle} relative z-10 transition-transform group-hover:scale-105">
        ${node.status === 'in-progress' ? '<div class="absolute inset-0 rounded-full bg-yellow-400 blur opacity-30 animate-pulse"></div>' : ''}
        <span class="material-symbols-outlined text-3xl relative z-10">${icon}</span>
      </div>
    </div>
    <!-- Card -->
    <div class="flex-1 p-5 rounded-2xl ${cfg.card} transition-all hover:shadow-md">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h3 class="text-lg font-bold text-slate-900 ${node.status === 'locked' ? 'text-slate-500' : ''}">${node.title}</h3>
          ${node.status === 'in-progress' ? '<p class="text-xs text-slate-400 mt-0.5">Current Focus · Essential skill</p>' : ''}
        </div>
        ${node.status === 'in-progress' ? `<button class="rounded-full bg-[#2563eb]/10 hover:bg-[#2563eb]/20 text-[#2563eb] p-1.5 transition-colors"><span class="material-symbols-outlined text-base">arrow_forward</span></button>` : ''}
      </div>
      <div class="flex gap-2 mt-3 flex-wrap">
        ${cfg.badge}
        ${node.status !== 'locked' ? `<span class="text-xs text-slate-400 flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span>${node.duration}</span>` : ''}
      </div>
    </div>
  </div>`;
}

function renderDetailPanel(node) {
  const iconMap = { 'node-1': 'check_circle', 'node-2': 'table_chart', 'node-3': 'database', 'node-4': 'bar_chart', 'node-5': 'neurology' };
  const icon = iconMap[node.id] || 'circle';
  const practice = node.practice || '';

  return `
  <div class="flex flex-col h-full">
    <!-- Panel header -->
    <div class="p-6 border-b border-slate-100 bg-slate-50/50">
      <div class="flex items-center gap-3 mb-4">
        <div class="size-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
          <span class="material-symbols-outlined">${icon}</span>
        </div>
        <h2 class="text-xl font-bold text-slate-900">${node.title}</h2>
      </div>
      <!-- Status row -->
      <div class="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</p>
          <p class="text-sm font-bold text-[#2563eb]">${node.status === 'in-progress' ? 'In Progress' : node.status === 'completed' ? 'Completed' : 'Locked'}</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" ${node.status === 'completed' ? 'checked' : ''} id="status-toggle"/>
          <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer
              peer-checked:after:translate-x-full peer-checked:after:border-white
              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
              after:bg-white after:border-gray-300 after:border after:rounded-full
              after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563eb]"></div>
        </label>
      </div>
    </div>

    <!-- Panel body -->
    <div class="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
      <!-- Overview -->
      <div class="space-y-2">
        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Overview</h4>
        <p class="text-slate-600 text-sm leading-relaxed">${node.overview}</p>
      </div>
      <!-- Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center text-center">
          <span class="material-symbols-outlined text-[#2563eb] mb-1">timer</span>
          <span class="text-xs text-slate-400">Est. Time</span>
          <span class="text-base font-bold text-slate-900">${node.duration}</span>
        </div>
        <div class="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center text-center">
          <span class="material-symbols-outlined text-[#2563eb] mb-1">bar_chart_4_bars</span>
          <span class="text-xs text-slate-400">Difficulty</span>
          <span class="text-base font-bold text-slate-900">${node.difficulty}</span>
        </div>
      </div>
      <!-- Resources -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
          Top Resources
          <span class="text-[#2563eb] font-normal cursor-pointer hover:underline text-xs normal-case">View All</span>
        </h4>
        ${node.resources.map((r, i) => `
        <a href="#" class="flex gap-3 group items-start p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
          <div class="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm" style="background-color:${['#2563eb','#7c3aed','#16a34a'][i%3]}">
            ${r.platform.charAt(0)}
          </div>
          <div>
            <h5 class="text-sm font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">${r.name}</h5>
            <p class="text-xs text-slate-400 mb-1">${r.platform}</p>
            <div class="flex items-center gap-1">
              <span class="material-symbols-outlined text-amber-400 text-sm">star</span>
              <span class="text-xs font-semibold text-slate-700">${r.rating}</span>
            </div>
          </div>
        </a>`).join('')}
      </div>
      <!-- Practice -->
      <div class="space-y-3 pt-2 border-t border-slate-100">
        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Practice</h4>
        <div class="p-4 bg-slate-900 rounded-xl text-slate-300 font-mono text-xs overflow-x-auto border border-slate-700 whitespace-pre leading-relaxed">${practice.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/(SELECT|FROM|WHERE|JOIN|GROUP BY|ORDER BY|LIMIT)/g,'<span style="color:#c084fc">$1</span>').replace(/('.*?')/g,'<span style="color:#86efac">$1</span>').replace(/(#.*)/g,'<span style="color:#94a3b8">$1</span>')}</div>
        <button id="run-query-btn" class="w-full py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 text-slate-700 transition-colors">
          ▶ Run Query
        </button>
      </div>
    </div>
  </div>`;
}

export function init() {
  // Node click → update panel
  document.querySelectorAll('.node-row').forEach(row => {
    row.addEventListener('click', () => {
      const nodeId = row.dataset.nodeId;
      const node = window.__roadmaply.roadmapNodes.find(n => n.id === nodeId);
      if (!node || node.status === 'locked') return;
      const panel = document.getElementById('node-detail-panel');
      if (panel) {
        panel.innerHTML = renderDetailPanel(node);
        initPanelEvents();
      }
      // Highlight selected
      document.querySelectorAll('.node-row').forEach(r => r.classList.remove('ring-2','ring-[#2563eb]/30','rounded-2xl'));
      row.classList.add('ring-2','ring-[#2563eb]/30','rounded-2xl');
    });
  });

  initPanelEvents();
}

function initPanelEvents() {
  // Run Query
  document.getElementById('run-query-btn')?.addEventListener('click', () => {
    window.showToast?.('Query executed — 14 rows returned ✓', 'success');
  });
  // Status toggle
  document.getElementById('status-toggle')?.addEventListener('change', (e) => {
    window.showToast?.(e.target.checked ? 'Marked as complete!' : 'Marked as in progress', e.target.checked ? 'success' : 'info');
  });
}
