// pages/detailed-analysis.js — Page 5: AI Career Path Analysis

const PATHS = [
  {
    id:'primary', label:'PRIMARY MATCH', labelColor:'#2563eb', title:'Data Scientist', match:95,
    matchStyle:'bg-[#2563eb] text-white', borderStyle:'border-2 border-[#2563eb]/60 hover:border-[#2563eb] shadow-xl',
    topBar:'#2563eb', desc:'Leverage your statistical background to extract insights from structured and unstructured data using Python and ML frameworks.',
    diff:{ label:'High', bars:3 }, comp:{ label:'Med', bars:2 }, salaryPct:85, salaryVal:'35M/mo', missingCount:3,
    skills:[{name:'Python & SQL',have:true,sub:''},{name:'Deep Learning (PyTorch)',have:false,sub:'Recommended Course: 4 weeks'},{name:'MLOps Deployment',have:false,sub:'High Priority'}],
    ctaStyle:'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg shadow-blue-500/20',
  },
  {
    id:'alternative', label:'ALTERNATIVE PATH', labelColor:'#5b9bd5', title:'ML Engineer', match:88,
    matchStyle:'bg-slate-100 text-[#5b9bd5] border border-[#5b9bd5]/30', borderStyle:'border border-slate-200 hover:shadow-lg',
    topBar:'#5b9bd5', desc:'Focus on the engineering and deployment aspects of machine learning models at production scale.',
    diff:{ label:'Med', bars:2 }, comp:{ label:'Low', bars:1 }, salaryPct:70, salaryVal:'28M/mo', missingCount:4,
    skills:[{name:'Python',have:true,sub:''},{name:'System Design',have:false,sub:'High Priority'},{name:'Docker & Kubernetes',have:false,sub:'Critical Requirement'}],
    ctaStyle:'bg-slate-800 hover:bg-slate-700 text-white',
  },
  {
    id:'stretch', label:'STRETCH GOAL', labelColor:'#93c5fd', title:'AI Researcher', match:72,
    matchStyle:'bg-slate-100 text-blue-400 border border-blue-200', borderStyle:'border border-slate-200 hover:shadow-lg opacity-95',
    topBar:'#bfdbfe', desc:'Advance the field of AI through rigorous academic research, experimentation, and publication.',
    diff:{ label:'V. High', bars:4 }, comp:{ label:'High', bars:3 }, salaryPct:95, salaryVal:'45M+/mo', missingCount:5,
    skills:[{name:'Statistics',have:true,sub:''},{name:'PhD / Advanced Math',have:false,sub:'Critical Requirement'},{name:'Academic Publishing',have:false,sub:''}],
    ctaStyle:'bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700',
  },
];

function bars(count, color) {
  return Array.from({length:4}, (_,i) =>
    `<div class="w-1.5 h-3 rounded-sm" style="background-color:${i<count ? color : '#e2e8f0'}"></div>`
  ).join('');
}

function renderPathCard(p) {
  return `
  <article class="flex flex-col bg-white rounded-2xl ${p.borderStyle} relative overflow-hidden transition-all duration-300">
    <div class="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl" style="background-color:${p.topBar}"></div>
    <div class="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${p.matchStyle}">${p.match}% Match</div>

    <div class="p-6 pb-4 border-b border-slate-100">
      <div class="text-xs font-bold mb-1 uppercase tracking-wider" style="color:${p.labelColor}">${p.label}</div>
      <h3 class="text-2xl font-bold text-slate-900 leading-tight mb-2">${p.title}</h3>
      <p class="text-sm text-slate-500 line-clamp-2">${p.desc}</p>
    </div>

    <div class="p-6 flex-1 flex flex-col gap-5">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <span class="text-xs font-semibold text-slate-500">Difficulty</span>
          <div class="flex items-end gap-2">
            <span class="text-lg font-bold text-slate-900">${p.diff.label}</span>
            <div class="flex gap-0.5 mb-1">${bars(p.diff.bars, p.topBar)}</div>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-xs font-semibold text-slate-500">Competition</span>
          <div class="flex items-end gap-2">
            <span class="text-lg font-bold text-slate-900">${p.comp.label}</span>
            <div class="flex gap-0.5 mb-1">${bars(p.comp.bars, p.topBar)}</div>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-semibold text-slate-700">Avg. Salary (IDR)</span>
          <span class="text-sm font-bold text-slate-900">${p.salaryVal}</span>
        </div>
        <div class="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div class="absolute top-0 left-0 h-full rounded-full progress-fill" style="width:${p.salaryPct}%;background-color:${p.topBar}"></div>
        </div>
        <div class="flex justify-between text-xs text-slate-400"><span>15M</span><span>50M+</span></div>
      </div>

      <div class="flex-1">
        <div class="flex justify-between items-center mb-3">
          <span class="text-sm font-semibold text-slate-700">Skill Gap Analysis</span>
          <span class="text-xs font-semibold" style="color:${p.topBar}">${p.missingCount} Skills Missing</span>
        </div>
        <div class="space-y-2">
          ${p.skills.map(s => `
          <label class="flex items-start gap-3 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
            <input type="checkbox" ${s.have ? 'checked' : ''} class="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#2563eb]"/>
            <div class="flex-1">
              <p class="text-sm font-semibold ${s.have ? 'line-through text-slate-400' : 'text-slate-700'}">${s.name}</p>
              ${s.sub ? `<p class="text-xs text-slate-400 mt-0.5">${s.sub}</p>` : ''}
            </div>
          </label>`).join('')}
        </div>
      </div>

      <button class="select-path-btn w-full mt-auto flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-bold text-sm transition-all active:scale-[0.98] ${p.ctaStyle}" data-path="${p.id}">
        Select This Roadmap
        <span class="material-symbols-outlined text-lg">arrow_forward</span>
      </button>
    </div>
  </article>`;
}

export function render() {
  const { user } = window.__roadmaply;
  return `
  <div class="flex flex-col min-h-screen bg-slate-50">
    <header class="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div class="flex items-center justify-between max-w-[1280px] mx-auto px-6 py-3 gap-6">
        <a href="#/onboarding" class="flex items-center gap-2 shrink-0 group">
          <span class="material-symbols-outlined text-[#2563eb] text-3xl group-hover:scale-110 transition-transform">rocket_launch</span>
          <span class="text-lg font-extrabold text-slate-800 tracking-tight">Roadmaply</span>
        </a>
        <nav class="hidden lg:flex items-center gap-6">
          <a href="#/onboarding" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Dashboard</a>
          <a href="#/career-comparison" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Career Explorer</a>
          <a href="#/detailed-analysis" class="text-sm font-bold text-[#2563eb] border-b-2 border-[#2563eb] pb-0.5">My Skills</a>
          <a href="#/job-curation" class="text-sm font-medium text-slate-600 hover:text-[#2563eb] transition-colors">Community</a>
        </nav>
        <div class="flex items-center gap-3 ml-auto lg:ml-0">
          <img src="${user.avatar}" alt="avatar" class="size-9 rounded-full border-2 border-slate-100 object-cover"/>
          <button class="hidden sm:flex items-center rounded-xl h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors">Sign Out</button>
        </div>
      </div>
    </header>

    <main class="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
      <div class="w-full mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div class="flex flex-col gap-2 max-w-2xl">
          <div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-[#2563eb]/10 text-[#2563eb] uppercase tracking-wider">Analysis Complete</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900">AI Career Path Analysis</h1>
          <p class="text-slate-500 text-base">We found 3 potential career paths based on your current skills and interests.</p>
        </div>
        <div class="flex items-center gap-3">
          <a href="#/onboarding" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl bg-white shadow-sm hover:border-[#2563eb]/40 hover:text-[#2563eb] transition-all">
            <span class="material-symbols-outlined text-lg">tune</span>Adjust Inputs
          </a>
          <button id="export-pdf-btn" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl bg-white shadow-sm hover:border-[#2563eb]/40 hover:text-[#2563eb] transition-all">
            <span class="material-symbols-outlined text-lg">download</span>Export PDF
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mb-10">
        ${PATHS.map(p => renderPathCard(p)).join('')}
      </div>

      <div class="w-full p-6 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col md:flex-row items-center gap-6">
        <div class="p-3 bg-[#2563eb]/10 rounded-full shrink-0">
          <span class="material-symbols-outlined text-[#2563eb] text-3xl">psychology</span>
        </div>
        <div class="flex-1">
          <h4 class="text-lg font-bold text-slate-900 mb-1">Why these recommendations?</h4>
          <p class="text-slate-500 text-sm leading-relaxed">Our AI analyzed your profile against <strong>15,000+ job postings</strong> in the last 30 days. Your strong foundation in Python puts you in the top 10% of candidates for Data Science roles.</p>
        </div>
        <button class="whitespace-nowrap px-5 py-2.5 text-sm font-bold text-[#2563eb] border border-[#2563eb]/30 rounded-xl bg-[#2563eb]/5 hover:bg-[#2563eb] hover:text-white transition-all shrink-0">
          View Full Analysis Report
        </button>
      </div>
    </main>
  </div>`;
}

export function init() {
  setTimeout(() => {
    document.querySelectorAll('.progress-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      bar.style.transition = 'width 0.9s cubic-bezier(0.4,0,0.2,1)';
      setTimeout(() => { bar.style.width = w; }, 60);
    });
  }, 60);

  document.querySelectorAll('.select-path-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.__roadmaply.state.selectedCareerPath = btn.dataset.path;
      btn.innerHTML = 'Loading…';
      btn.disabled = true;
      setTimeout(() => { window.location.hash = '#/learning-path'; }, 700);
    });
  });

  document.getElementById('export-pdf-btn')?.addEventListener('click', () => {
    window.showToast?.('PDF export coming soon!', 'info');
  });
}
