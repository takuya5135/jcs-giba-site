document.addEventListener('DOMContentLoaded', () => {
  // --- Language Switcher Logic ---
  const langButtons = document.querySelectorAll('.lang-btn');
  const metaDescription = document.querySelector('meta[name="description"]');
  
  const translations = {
    ja: {
      title: "合同会社JCSギバ | 情熱と知性で道を切り拓き、誠意あるGIVERとして豊かな社会を共創する",
      desc: "合同会社JCSギバの公式コーポレートサイトです。情熱(Passion)・知性(Intelligence)・誠意(Sincerity)を指針に、食品流通におけるマッチング・仲介、コンサルティング、営業・調達活動を包括的に支援します。"
    },
    en: {
      title: "JCS Giba LLC | Blazing trails with passion and intelligence, co-creating a prosperous society as a sincere GIVER",
      desc: "Official corporate website of JCS Giba LLC. Guided by Passion, Intelligence, and Sincerity, we comprehensively support matching/brokerage, consulting, and sales/procurement activities in food distribution."
    }
  };

  function setLanguage(lang) {
    // bodyのクラス切り替え
    document.body.classList.remove('lang-ja', 'lang-en');
    document.body.classList.add(`lang-${lang}`);

    // htmlタグのlang属性切り替え
    document.documentElement.lang = lang;

    // タイトルとメタディスクリプションの切り替え
    document.title = translations[lang].title;
    if (metaDescription) {
      metaDescription.setAttribute('content', translations[lang].desc);
    }

    // ボタンのactiveクラス切り替え
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // ローカルストレージに保存
    localStorage.setItem('preferred-lang', lang);
  }

  // 初期言語設定（保存されていればそれを適用、なければ日本語）
  const savedLang = localStorage.getItem('preferred-lang') || 'ja';
  setLanguage(savedLang);

  // イベントリスナーの登録
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Simple toggle animation for burger lines
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking nav link
    const navLinks = document.querySelectorAll('.nav-link, .btn-nav');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- Intersection Observer for Scroll Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once shown to prevent re-animation on scroll up/down
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- Case Studies Tabs ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked button
      btn.classList.add('active');

      // Add active class to target content
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
});
