document.addEventListener('DOMContentLoaded', () => {

  // ================= STICKY NAVIGATION =================
  const navbar = document.getElementById('navbar');
  
  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ================= SCROLL REVEAL ANIMATION =================
  const revealItems = document.querySelectorAll('.reveal-item');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach(item => {
    revealObserver.observe(item);
  });

  // ================= HERO CAROUSEL 3D PARALLAX =================
  const heroSection = document.getElementById('hero-section');
  const cards = [
    { el: document.querySelector('.cc-1'), baseRot: 20, baseZ: -60, baseY: 12 },
    { el: document.querySelector('.cc-2'), baseRot: 12, baseZ: -30, baseY: 6 },
    { el: document.querySelector('.cc-3'), baseRot: 5,  baseZ: 0,   baseY: 2 },
    { el: document.querySelector('.cc-4'), baseRot: 0,  baseZ: 40,  baseY: -4, center: true },
    { el: document.querySelector('.cc-5'), baseRot: -5, baseZ: 0,   baseY: 2 },
    { el: document.querySelector('.cc-6'), baseRot: -12,baseZ: -30, baseY: 6 },
    { el: document.querySelector('.cc-7'), baseRot: -20,baseZ: -60, baseY: 12 }
  ];

  function handleParallax(e) {
    if (window.innerWidth <= 768) return;

    const width = window.innerWidth;
    const height = heroSection.offsetHeight;
    
    const mouseX = (e.clientX / width) - 0.5;
    const mouseY = (e.clientY / height) - 0.5;

    cards.forEach(card => {
      if (!card.el) return;
      
      const rotOffset = mouseX * 18;
      const zOffset = Math.abs(mouseX) * 20;
      const yOffset = mouseY * 12;

      const currentRot = card.baseRot + rotOffset;
      const currentZ = card.baseZ + (card.center ? zOffset : -zOffset);
      const currentY = card.baseY + yOffset;
      const currentScale = card.center ? 1.05 + (1 - Math.abs(mouseX)) * 0.05 : 1;

      card.el.style.transform = `rotateY(${currentRot}deg) translateZ(${currentZ}px) translateY(${currentY}px) scale(${currentScale})`;
    });
  }

  function resetParallax() {
    if (window.innerWidth <= 768) return;
    cards.forEach(card => {
      if (!card.el) return;
      const currentScale = card.center ? 1.05 : 1;
      card.el.style.transform = `rotateY(${card.baseRot}deg) translateZ(${card.baseZ}px) translateY(${card.baseY}px) scale(${currentScale})`;
    });
  }

  heroSection.addEventListener('mousemove', handleParallax);
  heroSection.addEventListener('mouseleave', resetParallax);

  // ================= MOBILE DRAWER MENU TOGGLE =================
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        navMenu.style.backdropFilter = 'blur(12px)';
        navMenu.style.padding = '24px';
        navMenu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      } else {
        navMenu.style.display = '';
      }
    });
  }

  // ================= DIAGNOSTIC TOGGLE (THE GAP) =================
  const diagBefore = document.getElementById('diag-before');
  const diagAfter = document.getElementById('diag-after');
  const diagCards = document.querySelectorAll('.diag-card');

  const gapStates = {
    before: [
      { tag: 'Siloed', color: 'red', val: '70%', text: 'of enterprise AI pilots never make it past proof-of-concept into production workflows.' },
      { tag: 'Disconnected', color: 'red', val: '85%', text: 'of critical corporate data is trapped in isolated tools and databases with zero sync.' },
      { tag: 'Manual', color: 'red', val: '90%', text: 'of operational tasks (approvals, handoffs, and reporting) are handled by manual communication.' },
      { tag: 'Lagging', color: 'red', val: '40%', text: 'Execution gap exists between high systems capacity and actual business performance.' }
    ],
    after: [
      { tag: 'Unified', color: 'green', val: '100%', text: 'of workflows transition into production using the Enterprise Execution Layer.' },
      { tag: 'Connected', color: 'green', val: '0%', text: 'data islands remain. Unified intelligence feeds AI models and leadership dashboards.' },
      { tag: 'Automated', color: 'green', val: '95%', text: 'of routine checks, handoffs, and notifications operate around the clock with human approval.' },
      { tag: 'Resolved', color: 'green', val: '0%', text: 'Execution gap. Operations run synchronously at full systems capability.' }
    ]
  };

  function updateGapData(state) {
    const data = gapStates[state];
    diagCards.forEach((card, i) => {
      const cardData = data[i];
      const tag = card.querySelector('.diag-tag');
      const metric = card.querySelector('.diag-metric');
      const desc = card.querySelector('.diag-card-desc');

      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';

      setTimeout(() => {
        tag.textContent = cardData.tag;
        tag.className = `diag-tag ${cardData.color}`;
        metric.textContent = cardData.val;
        metric.className = `diag-metric ${cardData.color}`;
        desc.textContent = cardData.text;

        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 150);
    });
  }

  if (diagBefore && diagAfter) {
    diagBefore.addEventListener('click', () => {
      diagBefore.classList.add('active');
      diagAfter.classList.remove('active');
      updateGapData('before');
    });

    diagAfter.addEventListener('click', () => {
      diagAfter.classList.add('active');
      diagBefore.classList.remove('active');
      updateGapData('after');
    });
  }

  // ================= TIMELINE/PROCESS ROADMAP STEPPER =================
  const timelineTabs = document.querySelectorAll('.timeline-tab');
  const panelTitle = document.getElementById('timeline-panel-title');
  const panelDesc = document.getElementById('timeline-panel-desc');
  const panelQuote = document.getElementById('timeline-panel-quote');
  const panelVisual = document.getElementById('timeline-panel-visual');

  const roadmapData = {
    'tab-spark': {
      title: 'Sparks.',
      desc: 'One high-friction workflow, transformed in weeks. Value proven before any larger commitment — and the light starts to spread.',
      quote: '"We proved value."',
      visual: `<div class="visual-flow">
                 <div class="visual-node"><span class="indicator-dot" style="background-color:#eab308"></span>Email Inbox (Siloed)</div>
                 <div class="visual-node" style="border-color: #0e8ad9;"><span class="indicator-dot" style="background-color:#0e8ad9"></span>AYVO Deal Scanner (Active)</div>
                 <div class="visual-node"><span class="indicator-dot" style="background-color:#eab308"></span>Spreadsheet Reports</div>
               </div>`
    },
    'tab-launch': {
      title: 'Launch.',
      desc: 'The spark becomes momentum. Core operations move onto AI-operated systems — connected, governed, accelerating together.',
      quote: '"The transformation has started."',
      visual: `<div class="visual-flow">
                 <div class="visual-node" style="border-color: #0e8ad9;"><span class="indicator-dot" style="background-color:#0e8ad9"></span>SAP ERP Sync</div>
                 <div class="visual-node" style="border-color: #0e8ad9;"><span class="indicator-dot" style="background-color:#0e8ad9"></span>AI Agent Service Desk (Slack/Email)</div>
                 <div class="visual-node" style="border-color: #0e8ad9;"><span class="indicator-dot" style="background-color:#0e8ad9"></span>Automated Books Posting</div>
               </div>`
    },
    'tab-orbit': {
      title: 'Orbit.',
      desc: 'Your enterprise runs as one living system — people, processes, data, and AI moving in harmony, improving every cycle.',
      quote: '"The organization has evolved."',
      visual: `<div class="visual-flow">
                 <div class="visual-node" style="border-color: #10b981; box-shadow: 0 0 10px rgba(16,185,129,0.15);"><span class="indicator-dot" style="background-color:#10b981"></span>Unified Operations Hub</div>
                 <div class="visual-node" style="border-color: #10b981; box-shadow: 0 0 10px rgba(16,185,129,0.15);"><span class="indicator-dot" style="background-color:#10b981"></span>Continuous Governance Verification</div>
                 <div class="visual-node" style="border-color: #10b981; box-shadow: 0 0 10px rgba(16,185,129,0.15);"><span class="indicator-dot" style="background-color:#10b981"></span>Operational Intelligence Feed</div>
               </div>`
    }
  };

  timelineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      timelineTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabId = tab.id;
      const data = roadmapData[tabId];

      if (panelVisual) {
        panelVisual.style.opacity = '0';
        panelTitle.parentElement.style.opacity = '0';

        setTimeout(() => {
          panelTitle.textContent = data.title;
          panelDesc.textContent = data.desc;
          panelQuote.textContent = data.quote;
          panelVisual.innerHTML = data.visual;

          panelVisual.style.opacity = '1';
          panelTitle.parentElement.style.opacity = '1';
        }, 150);
      }
    });
  });

  // ================= USE CASE FILTERING =================
  const filterPills = document.querySelectorAll('.filter-pill');
  const caseCards = document.querySelectorAll('.case-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');

      caseCards.forEach(card => {
        const cat = card.getAttribute('data-category');

        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ================= FAQ ACCORDION =================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ================= STRINGTUNE INITIALIZATION =================
  if (window.StringTune) {
    const stringTune = StringTune.StringTune.getInstance();
    window.StringTuneContext = stringTune;
    stringTune.use(StringTune.StringLazy);
    stringTune.use(StringTune.StringMagnetic);
    stringTune.start(0);
  }

});
