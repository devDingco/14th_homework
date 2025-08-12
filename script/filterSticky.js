// script/filterSticky.js
(function (w, d) {
  "use strict";

  // === 설정 ===
  var BAR_SELECTOR = '#filter-slot [data-sticky="filter"], [data-sticky="filter"], #diary-filter, .diary-filter';
  var FORCE_FIXED = true;  // ✅ 요구사항: 항상 화면 상단에 고정 → 무조건 fixed 모드

  // === 상태 ===
  var bar = null, inited = false, listenersBound = false;
  var spacer = null, slot = null;

  // === 유틸 ===
  function pickBar(){
    return d.querySelector(BAR_SELECTOR);
  }
  function getSlot(barEl){
    return d.getElementById('filter-slot') || (barEl && barEl.closest('.container')) || (barEl && barEl.parentElement) || d.body;
  }
  function ensureSpacer(barEl){
    if (!barEl) return null;
    if (spacer && spacer.isConnected) return spacer;
    spacer = d.createElement('div');
    spacer.id = 'filter-spacer';
    spacer.style.cssText = 'height:0;pointer-events:none;';
    if (barEl.parentNode) barEl.parentNode.insertBefore(spacer, barEl.nextSibling);
    return spacer;
  }
  function getTopOffset(){
    try{
      var header = d.querySelector('.page-header');
      if (!header) return 0;
      var cs = getComputedStyle(header);
      var rect = header.getBoundingClientRect();
      // 헤더가 fixed/sticky면 그 높이만큼 띄워준다
      return (cs.position === 'fixed' || cs.position === 'sticky') ? rect.height : 0;
    }catch(_){ return 0; }
  }

  // === 렌더 ===
  function update(){
    if (!bar) return;

    // 언제나 fixed 모드 (요구사항 준수: 시야에 지속 노출)
    var needFix = true;                 // 스크롤 0이라도 항상 고정하려면 true
    // 스크롤 내릴 때만 고정하려면: var needFix = (w.scrollY > 0 || (d.scrollingElement||d.documentElement).scrollTop > 0);

    var sp = ensureSpacer(bar);
    var container = slot || (slot = getSlot(bar));
    var rect = container.getBoundingClientRect();
    var topOffset = getTopOffset();

    if (needFix){
      bar.style.position = 'fixed';
      bar.style.top = topOffset + 'px';
      bar.style.left = rect.left + 'px';
      bar.style.width = rect.width + 'px';
      bar.style.zIndex = '1000';
      bar.classList.add('is-scrolled');          // 배경 반전 클래스

      if (sp) sp.style.height = bar.offsetHeight + 'px';  // 점프 방지
    } else {
      bar.style.position = bar.style.top = bar.style.left = bar.style.width = bar.style.zIndex = '';
      bar.classList.remove('is-scrolled');
      if (sp) sp.style.height = '0px';
    }
  }

  // === 이벤트 바인딩 (스크롤의 모든 형태 감지) ===
  function schedule(){ if (schedule._t) return; schedule._t = true; requestAnimationFrame(function(){ schedule._t=false; update(); }); }
  function bind(){
    if (listenersBound) return;
    listenersBound = true;

    // 윈도우/문서 루트
    w.addEventListener('scroll', schedule, { passive:true });
    w.addEventListener('resize', function(){ slot = null; schedule(); }, { passive:true });

    // 휠/터치
    ['wheel','mousewheel','DOMMouseScroll','touchmove'].forEach(function(t){
      d.addEventListener(t, schedule, { passive:true });
    });

    // 키보드 스크롤
    d.addEventListener('keydown', function(e){
      var keys = ['Space','PageDown','PageUp','Home','End','ArrowDown','ArrowUp'];
      if (keys.includes(e.code) || keys.includes(e.key)) schedule();
    });

    // 내부 스크롤 컨테이너(overflow:auto/scroll)도 감지
    var root = d.scrollingElement || d.documentElement;
    var re = /(auto|scroll)/i;
    var cur = bar ? bar.parentElement : null;
    if (root) root.addEventListener('scroll', schedule, { passive:true });
    while (cur && cur !== d.body && cur !== d.documentElement){
      try{
        var cs = getComputedStyle(cur);
        if ((re.test(cs.overflow) || re.test(cs.overflowY) || re.test(cs.overflowX)) && (cur.scrollHeight > cur.clientHeight)){
          cur.addEventListener('scroll', schedule, { passive:true });
        }
      }catch(_) {}
      cur = cur.parentElement;
    }
  }

  // === 부팅 ===
  function init(){
    if (inited) return;
    bar = pickBar();
    if (!bar) return;             // 주입 전, 아래 watch가 재시도
    bind();
    schedule();
    inited = true;
  }

  function watch(){
    var root = d.getElementById('filter-slot') || d.body;
    var mo = new MutationObserver(function(){
      if (!inited){ init(); }
      else {
        // 필터/컨테이너 레이아웃 변하면 다시 계산
        var newBar = pickBar();
        if (newBar && newBar !== bar){ bar = newBar; spacer = null; slot = null; }
        schedule();
      }
    });
    mo.observe(root, { childList:true, subtree:true, attributes:true, attributeFilter:['style','class'] });
  }

  if (d.readyState === 'loading'){
    d.addEventListener('DOMContentLoaded', function(){ init(); watch(); }, { once:true });
  } else {
    init(); watch();
  }
})(window, document);
