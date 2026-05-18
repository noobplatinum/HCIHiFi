// pages/sus-survey.js — Post-Task System Usability Scale (SUS) Survey
// Standard 10-question SUS with 5-point Likert scale.
// Collects responses and computes SUS score (0-100).

const SUS_QUESTIONS = [
  "I think that I would like to use this system frequently.",
  "I found the system unnecessarily complex.",
  "I thought the system was easy to use.",
  "I think that I would need the support of a technical person to be able to use this system.",
  "I found the various functions in this system were well integrated.",
  "I thought there was too much inconsistency in this system.",
  "I would imagine that most people would learn to use this system very quickly.",
  "I found the system very cumbersome to use.",
  "I felt very confident using the system.",
  "I needed to learn a lot of things before I could get going with this system.",
];

const LIKERT_LABELS = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

export function render() {
  return `
  <div class="flex flex-col min-h-screen bg-slate-50">

    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div class="flex items-center justify-between max-w-[860px] mx-auto px-6 py-3 gap-4">
        <a href="#/onboarding" class="flex items-center gap-2 shrink-0 group">
          <span class="material-symbols-outlined text-[#2563eb] text-3xl group-hover:scale-110 transition-transform">rocket_launch</span>
          <span class="text-lg font-extrabold text-slate-800 tracking-tight">Roadmaply</span>
        </a>
        <span class="text-sm font-semibold text-slate-500">Post-Task Survey</span>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 flex flex-col items-center py-10 px-4 md:px-10">
      <div class="w-full max-w-[720px] space-y-8">

        <!-- Hero -->
        <div class="flex flex-col items-center gap-3 text-center">
          <div class="size-16 rounded-full bg-[#2563eb]/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-[#2563eb] text-3xl">rate_review</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-slate-800">How was your experience?</h1>
          <p class="text-slate-500 text-base max-w-lg">Please rate the following statements based on your experience using Roadmaply. Your honest feedback helps us improve.</p>
        </div>

        <!-- Participant ID -->
        <div class="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
          <label class="block text-sm font-bold text-slate-700 mb-2">Participant ID</label>
          <input type="text" id="sus-participant-id" placeholder="e.g. P-001" 
                 class="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-800 px-4 py-3 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none transition-all"/>
          <p class="text-xs text-slate-400 mt-2">Enter the participant ID provided by the facilitator.</p>
        </div>

        <!-- SUS Questions -->
        <div class="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#2563eb]">quiz</span>
              System Usability Scale
            </h2>
            <p class="text-xs text-slate-500 mt-1">Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree)</p>
          </div>

          <div class="divide-y divide-slate-100" id="sus-questions">
            ${SUS_QUESTIONS.map((q, i) => `
            <div class="px-6 py-5 hover:bg-slate-50/50 transition-colors sus-question" data-q="${i}">
              <p class="text-sm font-semibold text-slate-800 mb-4">
                <span class="text-[#2563eb] font-bold">${i + 1}.</span> ${q}
              </p>
              <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] text-slate-400 font-medium w-16 text-left shrink-0">Strongly<br/>Disagree</span>
                <div class="flex gap-3 flex-1 justify-center">
                  ${[1,2,3,4,5].map(v => `
                  <label class="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <input type="radio" name="sus-q${i}" value="${v}" 
                           class="sus-radio w-6 h-6 text-[#2563eb] bg-slate-100 border-2 border-slate-300 focus:ring-[#2563eb] focus:ring-2 cursor-pointer
                                  checked:bg-[#2563eb] checked:border-[#2563eb] transition-all
                                  group-hover:border-[#2563eb]/60"/>
                    <span class="text-xs font-bold text-slate-500 group-hover:text-[#2563eb] transition-colors">${v}</span>
                  </label>`).join('')}
                </div>
                <span class="text-[11px] text-slate-400 font-medium w-16 text-right shrink-0">Strongly<br/>Agree</span>
              </div>
            </div>`).join('')}
          </div>
        </div>

        <!-- Open-ended feedback -->
        <div class="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
          <label class="block text-sm font-bold text-slate-700 mb-2">Additional Comments (Optional)</label>
          <textarea id="sus-comments" rows="4" placeholder="Any thoughts, frustrations, or suggestions..."
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-800 px-4 py-3 resize-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none transition-all"></textarea>
        </div>

        <!-- Submit -->
        <div class="flex justify-end gap-3 pb-10">
          <button id="sus-submit-btn"
                  class="flex items-center justify-center gap-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-base">
            <span class="material-symbols-outlined">send</span>
            Submit Survey
          </button>
        </div>

        <!-- Result (hidden initially) -->
        <div id="sus-result" class="hidden bg-white rounded-2xl p-8 shadow-md border border-[#2563eb]/20 text-center space-y-4">
          <div class="size-20 rounded-full bg-green-50 flex items-center justify-center mx-auto">
            <span class="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
          </div>
          <h2 class="text-2xl font-extrabold text-slate-800">Thank you!</h2>
          <p class="text-slate-500">Your SUS score has been recorded.</p>
          <div class="text-5xl font-black text-[#2563eb]" id="sus-score-display">—</div>
          <p class="text-sm text-slate-400">SUS Score (0–100)</p>
        </div>

      </div>
    </main>
  </div>`;
}

export function init() {
  const submitBtn = document.getElementById('sus-submit-btn');
  
  submitBtn?.addEventListener('click', async () => {
    // Collect responses
    const responses = [];
    let allAnswered = true;
    
    for (let i = 0; i < 10; i++) {
      const selected = document.querySelector(`input[name="sus-q${i}"]:checked`);
      if (!selected) {
        allAnswered = false;
        // Highlight unanswered question
        const qEl = document.querySelector(`.sus-question[data-q="${i}"]`);
        qEl.style.backgroundColor = '#fef2f2';
        qEl.style.transition = 'background-color 0.3s';
        setTimeout(() => { qEl.style.backgroundColor = ''; }, 2000);
      } else {
        responses.push(parseInt(selected.value));
      }
    }
    
    if (!allAnswered) {
      window.showToast?.('Please answer all 10 questions before submitting.', 'warning');
      return;
    }
    
    // Submit
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Submitting…';
    
    try {
      const api = window.__roadmaplyApi;
      let susScore = null;
      
      if (api && api.isAvailable) {
        const result = await api.submitSus(responses);
        if (result && result.sus_score != null) {
          susScore = result.sus_score;
        }
      }
      
      // Calculate locally if API unavailable
      if (susScore === null) {
        const contributions = responses.map((score, i) => 
          i % 2 === 0 ? score - 1 : 5 - score
        );
        susScore = contributions.reduce((a, b) => a + b, 0) * 2.5;
      }
      
      // Log comments
      const comments = document.getElementById('sus-comments')?.value?.trim();
      if (comments && api && api.isAvailable) {
        api.logEvent('sus_comment', 'sus-survey', { comment: comments });
      }
      
      // Show result
      document.getElementById('sus-score-display').textContent = susScore.toFixed(1);
      document.getElementById('sus-result').classList.remove('hidden');
      
      // Hide form elements
      submitBtn.closest('.flex')?.classList.add('hidden');
      
      window.showToast?.(`Survey submitted! SUS Score: ${susScore.toFixed(1)}`, 'success', 5000);
    } catch (err) {
      console.error('SUS submit error:', err);
      window.showToast?.('Failed to submit survey. Please try again.', 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span class="material-symbols-outlined">send</span> Submit Survey';
    }
  });
}
