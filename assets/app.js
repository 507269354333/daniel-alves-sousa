
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  const progress = $('.p10-progress span');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
  };
  addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  const exploreBtn = $('[data-explore-toggle]');
  const explore = $('#p10-explore');
  const menuBtn = $('[data-menu-toggle]');
  const mobile = $('#p10-mobile');

  const closeAll = () => {
    explore?.classList.remove('is-open');
    mobile?.classList.remove('is-open');
    exploreBtn?.setAttribute('aria-expanded','false');
    menuBtn?.setAttribute('aria-expanded','false');
  };

  exploreBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const open = !explore.classList.contains('is-open');
    closeAll();
    if (open) {
      explore.classList.add('is-open');
      exploreBtn.setAttribute('aria-expanded','true');
    }
  });

  menuBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const open = !mobile.classList.contains('is-open');
    closeAll();
    if (open) {
      mobile.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded','true');
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav')) closeAll();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
  $$('.p10-explore a,.p10-mobilePanel a').forEach(a => a.addEventListener('click', closeAll));

  const revealTargets = $$('.p10-expertiseCard,.p10-sectionHead,.p10-focusShell,.nowCard,.careerStage,.regShell,.certStage,.eduStage');
  revealTargets.forEach(el => el.classList.add('p10-reveal'));
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          ro.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:'0px 0px -30px 0px'});
    revealTargets.forEach(el => ro.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  const focusData = {
    fidc:{
      no:'01 · Crédito estruturado', title:'FIDC',
      text:'Interesse em estruturas de crédito, direitos creditórios, participantes, ofertas e leitura regulatória aplicada à operação.',
      tags:['Crédito','Estruturação','Distribuição','Regulação']
    },
    fiagro:{
      no:'02 · Mercado de capitais + agro', title:'FIAGRO',
      text:'Ponto de convergência entre formação em agronegócios e mercado de capitais, com atenção a veículos, crédito e estruturas de financiamento do setor.',
      tags:['Agronegócio','Fundos','Crédito','Mercado de Capitais']
    },
    fii:{
      no:'03 · Fundos imobiliários', title:'FII',
      text:'Acompanhamento de estruturas de fundos, documentação, público-alvo, participantes e processos relacionados à distribuição.',
      tags:['Fundos','Ofertas','Distribuição','Processo']
    },
    ofertas:{
      no:'04 · Execução regulatória', title:'Ofertas Públicas',
      text:'Documentação, enquadramento, rito, distribuição, registros e coordenação de marcos para transformar exigências regulatórias em execução organizada.',
      tags:['CVM 160','ANBIMA','Documentação','Execução']
    },
    credito:{
      no:'05 · Ativos alternativos', title:'Crédito Estruturado',
      text:'Leitura de operações, riscos, participantes e estruturas que conectam originação, funding, distribuição e investidores.',
      tags:['Crédito','Funding','Risco','Investidores']
    },
    agro:{
      no:'06 · Repertório setorial', title:'Agronegócio',
      text:'Aprofundamento setorial por meio do MBA na ESALQ/USP, ampliando a leitura de cadeias produtivas, financiamento e oportunidades no mercado de capitais.',
      tags:['ESALQ/USP','Cadeias produtivas','Financiamento','Estratégia']
    }
  };

  const detail = $('#p10-focus-detail');
  const renderFocus = key => {
    const d = focusData[key];
    if (!d || !detail) return;
    $('#p10-focus-no').textContent = d.no;
    $('#p10-focus-title').textContent = d.title;
    $('#p10-focus-text').textContent = d.text;
    $('#p10-focus-tags').innerHTML = d.tags.map(x => '<span>'+x+'</span>').join('');
    $$('.p10-focusCard').forEach(b => b.classList.toggle('is-active', b.dataset.focus === key));
  };
  $$('.p10-focusCard').forEach(btn => btn.addEventListener('click', () => renderFocus(btn.dataset.focus)));
  renderFocus('fidc');

  const sectionLinks = $$('.p10-mobilePanel a[href^="#"],.p10-explore a[href^="#"]');
  const sectionIds = [...new Set(sectionLinks.map(a => a.getAttribute('href')).filter(h => h && h.length > 1))];
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (!visible) return;
      const hash = '#' + visible.target.id;
      $$('[data-nav-section]').forEach(a => a.classList.toggle('p10-active-dot', a.getAttribute('href') === hash));
    }, {rootMargin:'-25% 0px -62% 0px',threshold:[0,.1,.5]});
    sectionIds.forEach(h => { const el=$(h); if(el) activeObserver.observe(el); });
  }
})();



(() => {
  // Add small interaction polish without depending on a framework.
  const portrait = document.querySelector('.portrait');
  if (portrait && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    portrait.addEventListener('pointermove', e => {
      const r = portrait.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      portrait.style.transform = 'perspective(900px) rotateY('+(x*2.2)+'deg) rotateX('+(-y*1.5)+'deg)';
    });
    portrait.addEventListener('pointerleave', () => portrait.style.transform = '');
  }

  document.querySelectorAll('.careerBrand img,.regLogo img,.p11-issuer img').forEach(img => {
    img.addEventListener('error', () => img.closest('.careerBrand,.regLogo,.p11-issuer')?.classList.add('p11-image-fallback'));
  });


  // Keep horizontal rails on larger mobile/tablet screens aligned to the active item.
  const centerActiveTab = root => {
    if (!root || innerWidth <= 620) return;
    const checked = root.querySelector('input[type="radio"]:checked');
    if (!checked) return;
    const label = root.querySelector('label[for="'+checked.id+'"]');
    label?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  };
  document.querySelectorAll('.journeyTabs,.certTabs,.eduTabs,.regTabs').forEach(root => {
    root.addEventListener('change', () => requestAnimationFrame(() => centerActiveTab(root)));
  });

})();


(() => {
  const $$ = (s,r=document) => [...r.querySelectorAll(s)];

  // Accessible state mirrors.
  const exploreBtn=document.querySelector('[data-explore-toggle]');
  const menuBtn=document.querySelector('[data-menu-toggle]');
  const explore=document.getElementById('p10-explore');
  const mobile=document.getElementById('p10-mobile');

  const syncMenus=()=>{
    if(exploreBtn&&explore) explore.setAttribute('aria-hidden', String(exploreBtn.getAttribute('aria-expanded')!=='true'));
    if(menuBtn&&mobile) mobile.setAttribute('aria-hidden', String(menuBtn.getAttribute('aria-expanded')!=='true'));
  };
  syncMenus();
  const observer=new MutationObserver(syncMenus);
  if(exploreBtn) observer.observe(exploreBtn,{attributes:true,attributeFilter:['aria-expanded']});
  if(menuBtn) observer.observe(menuBtn,{attributes:true,attributeFilter:['aria-expanded']});

  const focusButtons=$$('.p10-focusCard');
  const syncFocusButtons=()=>{
    focusButtons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.classList.contains('is-active'))));
  };
  focusButtons.forEach(btn=>btn.addEventListener('click',syncFocusButtons));
  syncFocusButtons();

  // External links opened in a new tab should always be isolated.
  $$('a[target="_blank"]').forEach(a=>{
    const tokens=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));
    tokens.add('noopener');tokens.add('noreferrer');
    a.setAttribute('rel',[...tokens].join(' '));
  });

  // Smooth scrolling only when motion is acceptable.
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.style.scrollBehavior='auto';
  }
})();


(() => {
  const tiles=[...document.querySelectorAll('.p13-brandTile[data-journey]')];
  if(!tiles.length) return;

  const sync=()=>{
    const checked=document.querySelector('.journeyTabs input[name="journey"]:checked');
    tiles.forEach(tile=>{
      const active=!!checked && tile.dataset.journey===checked.id;
      tile.classList.toggle('is-active',active);
      tile.setAttribute('aria-pressed',String(active));
    });
  };

  tiles.forEach(tile=>{
    tile.addEventListener('click',()=>{
      const radio=document.getElementById(tile.dataset.journey);
      if(!radio) return;
      radio.checked=true;
      radio.dispatchEvent(new Event('change',{bubbles:true}));
      sync();
    });
  });

  document.querySelectorAll('.journeyTabs input[name="journey"]').forEach(radio=>{
    radio.addEventListener('change',sync);
  });
  sync();
})();
