// pages/login.js — Page 0: Mock Login Entry Point

export function render() {
  return `
  <div class="min-h-screen flex flex-col md:flex-row bg-slate-50">
    
    <!-- Left Pane: Brand & Marketing (Visible on medium screens and up) -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-900 text-white p-12 flex-col justify-between relative overflow-hidden">
      <!-- Background pattern decor -->
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      <div class="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div class="absolute right-10 top-1/4 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"></div>

      <!-- Top: Logo -->
      <div class="flex items-center gap-3 relative z-10">
        <div class="size-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <span class="material-symbols-outlined text-white text-2xl animate-pulse">rocket_launch</span>
        </div>
        <span class="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">Roadmaply</span>
      </div>

      <!-- Center: Feature List & Headline -->
      <div class="space-y-8 my-auto relative z-10 max-w-lg">
        <div class="space-y-4">
          <span class="px-3.5 py-1.5 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider border border-white/10">Prototype v1.2</span>
          <h1 class="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
            Navigate your career path with AI precision.
          </h1>
          <p class="text-blue-100 text-base font-medium leading-relaxed">
            Generate custom learning roadmaps, validate your professional skills, and connect with direct matches from leading job portals.
          </p>
        </div>

        <div class="space-y-4 pt-4">
          <div class="flex items-start gap-4">
            <div class="size-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <span class="material-symbols-outlined text-blue-300 text-lg">auto_awesome</span>
            </div>
            <div>
              <p class="font-bold text-sm text-white">Instant Resume Parsing</p>
              <p class="text-xs text-blue-200/80">Upload your PDF or Word resume and watch our AI extract your credentials in seconds.</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="size-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <span class="material-symbols-outlined text-blue-300 text-lg">map</span>
            </div>
            <div>
              <p class="font-bold text-sm text-white">Interactive Skill Journeys</p>
              <p class="text-xs text-blue-200/80">Explore modular pathways mapped specifically to your preferred career trajectories.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom: Footer info -->
      <div class="text-xs text-blue-200/60 relative z-10 flex justify-between items-center">
        <span>© 2026 Roadmaply Inc.</span>
        <div class="flex gap-4">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>

    <!-- Right Pane: Login Form & Demo Accounts -->
    <div class="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 bg-slate-50">
      <div class="w-full max-w-[440px] space-y-8">
        
        <!-- Mobile Logo and Header -->
        <div class="text-center md:text-left space-y-2">
          <div class="flex md:hidden items-center justify-center gap-2 mb-6">
            <span class="material-symbols-outlined text-[#2563eb] text-3xl">rocket_launch</span>
            <span class="text-xl font-extrabold text-slate-800 tracking-tight">Roadmaply</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Sign In</h2>
          <p class="text-slate-500 text-sm font-medium">Use a demo account or input dummy details to test the workflow.</p>
        </div>

        <!-- Quick Select Demo Accounts -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Connect (Recommended)</span>
            <span class="inline-flex items-center gap-1 text-[10px] font-bold text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 animate-pulse">
              <span class="size-1.5 rounded-full bg-[#2563eb]"></span>Ready
            </span>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <!-- Account 1: John Doe -->
            <button type="button" id="demo-john" 
                    class="group flex flex-col items-center p-4 rounded-xl border border-slate-200 bg-white hover:border-[#2563eb] hover:shadow-md transition-all text-center">
              <div class="relative mb-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr5ZkAPtCjywz9td4Gz1ZtNg2H_MOP0UvrEpvHo7JYr6AMdcWFNHCh3RoSjcpiD7V-tEMG9pWQmqvPs8abXCNeI_lfb6iIbLe8WJiC4l4Jan7_lITUalyvHjiWM3HTykPrSGZVemttr5cUYPTeU9udcQ6ccCpkWwUqETkP6qSZWCi6A11bQJn3HPUsjlwBoIPGr7bSbxFed3UdMAO6nZOq2XtQ5xkeM03RwwUjTeHto5wQtALnG69J1PA7PqVMYoNGRjEP5Opo0DVY" 
                     alt="John Doe" 
                     class="size-11 rounded-full object-cover border border-slate-100 group-hover:border-[#2563eb]/30 group-hover:scale-105 transition-all" />
                <span class="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <p class="font-bold text-xs text-slate-800">John Doe</p>
              <p class="text-[10px] text-slate-400 font-medium">Product Designer</p>
            </button>

            <!-- Account 2: Sarah Chen -->
            <button type="button" id="demo-sarah" 
                    class="group flex flex-col items-center p-4 rounded-xl border border-slate-200 bg-white hover:border-[#2563eb] hover:shadow-md transition-all text-center">
              <div class="relative mb-2">
                <div class="size-11 rounded-full bg-indigo-50 border border-slate-100 flex items-center justify-center text-indigo-600 font-extrabold text-sm group-hover:border-[#2563eb]/30 group-hover:scale-105 transition-all">
                  SC
                </div>
                <span class="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <p class="font-bold text-xs text-slate-800">Sarah Chen</p>
              <p class="text-[10px] text-slate-400 font-medium">Software Engineer</p>
            </button>
          </div>
        </div>

        <div class="relative flex items-center justify-center">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <span class="relative px-3 bg-slate-50 text-xs font-semibold text-slate-400 uppercase">Or sign in manually</span>
        </div>

        <!-- Credentials Form -->
        <form id="login-form" class="space-y-5">
          <!-- Email Input -->
          <div class="space-y-1.5">
            <label for="email" class="text-xs font-bold text-slate-700">Email Address</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
              <input type="email" id="email" required placeholder="name@company.com" 
                     class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 focus:outline-none transition-all placeholder:text-slate-400 text-sm font-medium" />
            </div>
          </div>

          <!-- Password Input -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center">
              <label for="password" class="text-xs font-bold text-slate-700">Password</label>
              <a href="#" class="text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors">Forgot?</a>
            </div>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
              <input type="password" id="password" required placeholder="••••••••" 
                     class="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 focus:outline-none transition-all placeholder:text-slate-400 text-sm font-medium" />
              <button type="button" id="toggle-password" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
                <span class="material-symbols-outlined text-lg" id="eye-icon">visibility</span>
              </button>
            </div>
          </div>

          <!-- Options -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked class="rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]/20" />
              <span class="text-xs font-bold text-slate-600">Keep me signed in</span>
            </label>
          </div>

          <!-- Submit Button -->
          <button type="submit" id="submit-btn" 
                  class="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 transition-all focus:outline-none active:scale-[0.98]">
            <span class="text-sm font-bold">Sign In to Dashboard</span>
            <span class="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </button>
        </form>

        <!-- Social login -->
        <div class="grid grid-cols-2 gap-3 pt-2">
          <button type="button" class="flex items-center justify-center gap-2 py-2 px-4 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-all text-xs font-semibold text-slate-600">
            <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.3-4.53-6.16-4.53z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button type="button" class="flex items-center justify-center gap-2 py-2 px-4 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-all text-xs font-semibold text-slate-600">
            <svg class="size-4 shrink-0 fill-[#0077b5]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </button>
        </div>

      </div>
    </div>
  </div>`;
}

export function init() {
  const form = document.getElementById('login-form');
  const togglePassBtn = document.getElementById('toggle-password');
  const passInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');
  const submitBtn = document.getElementById('submit-btn');

  // Predefined accounts quick-select
  const johnBtn = document.getElementById('demo-john');
  const sarahBtn = document.getElementById('demo-sarah');

  // Toggle password visibility
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passInput.setAttribute('type', type);
      eyeIcon.textContent = type === 'password' ? 'visibility' : 'visibility_off';
    });
  }

  // Prepopulate John Doe
  if (johnBtn) {
    johnBtn.addEventListener('click', () => {
      document.getElementById('email').value = 'john.doe@email.com';
      document.getElementById('password').value = 'supersecurejohn123';
      
      // Auto-trigger sign-in
      triggerSignIn('John Doe', 'Product Designer');
    });
  }

  // Prepopulate Sarah Chen
  if (sarahBtn) {
    sarahBtn.addEventListener('click', () => {
      document.getElementById('email').value = 'sarah.chen@company.com';
      document.getElementById('password').value = 'supersecuresarah456';
      
      // Auto-trigger sign-in
      triggerSignIn('Sarah Chen', 'Software Engineer');
    });
  }

  // Form submission handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      
      let name = 'John Doe';
      let title = 'Product Designer';
      
      if (email.toLowerCase().includes('sarah')) {
        name = 'Sarah Chen';
        title = 'Software Engineer';
      }
      
      triggerSignIn(name, title);
    });
  }

  function triggerSignIn(userName, userTitle) {
    // Disable inputs and show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
      submitBtn.innerHTML = `
        <span class="spinner size-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
        Signing in...
      `;
    }

    // Set user profile data dynamically
    if (window.__roadmaply && window.__roadmaply.user) {
      window.__roadmaply.user.name = userName;
      window.__roadmaply.user.title = userTitle;
      
      if (userName === 'Sarah Chen') {
        window.__roadmaply.user.avatar = ''; // default fallback initials "SC"
        window.__roadmaply.user.initials = 'SC';
        window.__roadmaply.user.email = 'sarah.chen@company.com';
        window.__roadmaply.user.phone = '+62 857-9988-7766';
        window.__roadmaply.user.location = 'Bandung, Indonesia';
        window.__roadmaply.user.cvFilename = 'Sarah_Chen_CV_Dev.pdf';
        
        // Custom mock experience/skills for Sarah Chen
        window.__roadmaply.workExperience = [
          {
            id: 'exp-1',
            title: 'Frontend Developer',
            company: 'StartupXYZ',
            location: 'Bandung, Indonesia',
            startDate: 'Mar 2021',
            endDate: 'Present',
            description: 'Built scalable React.js web apps and worked closely with backend services.',
            initial: 'S',
            color: '#7c3aed',
          }
        ];
        window.__roadmaply.skills.technical = ['HTML/CSS', 'JavaScript', 'React', 'Git', 'Webpack'];
        window.__roadmaply.skills.soft = ['Teamwork', 'Communication', 'Adaptability'];
      } else {
        // Restore John Doe
        window.__roadmaply.user.avatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr5ZkAPtCjywz9td4Gz1ZtNg2H_MOP0UvrEpvHo7JYr6AMdcWFNHCh3RoSjcpiD7V-tEMG9pWQmqvPs8abXCNeI_lfb6iIbLe8WJiC4l4Jan7_lITUalyvHjiWM3HTykPrSGZVemttr5cUYPTeU9udcQ6ccCpkWwUqETkP6qSZWCi6A11bQJn3HPUsjlwBoIPGr7bSbxFed3UdMAO6nZOq2XtQ5xkeM03RwwUjTeHto5wQtALnG69J1PA7PqVMYoNGRjEP5Opo0DVY';
        window.__roadmaply.user.initials = 'JD';
        window.__roadmaply.user.email = 'john.doe@email.com';
        window.__roadmaply.user.phone = '+62 812-3456-7890';
        window.__roadmaply.user.location = 'Jakarta, Indonesia';
        window.__roadmaply.user.cvFilename = 'John_Doe_CV_2023.pdf';
        
        window.__roadmaply.workExperience = [
          {
            id: 'exp-1',
            title: 'Senior Product Designer',
            company: 'TechCorp Indonesia',
            location: 'Jakarta, Indonesia',
            startDate: 'Jan 2021',
            endDate: 'Present',
            description: 'Led design for core product suites and created Figma design system.',
            initial: 'T',
            color: '#2563eb',
          }
        ];
        window.__roadmaply.skills.technical = ['Figma', 'Adobe XD', 'HTML/CSS', 'Prototyping', 'User Research', 'Design Systems'];
        window.__roadmaply.skills.soft = ['Leadership', 'Communication', 'Problem Solving'];
      }
    }

    // Set authenticated state
    if (window.__roadmaply && window.__roadmaply.state) {
      window.__roadmaply.state.isAuthenticated = true;
    }

    // Simulate network delay for mock login feel
    setTimeout(() => {
      window.showToast?.(`Welcome back, ${userName}!`, 'success', 3000);
      
      // Navigate to onboarding dashboard
      window.location.hash = '#/onboarding';
    }, 1200);
  }
}
