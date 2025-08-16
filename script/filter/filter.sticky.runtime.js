// script/filter/filter.sticky.runtime.js
(function (w, d) {
  "use strict";
  if (w.__FILTER_STICKY_RUNTIME__) return;
  w.__FILTER_STICKY_RUNTIME__ = true;

  function q(sel){ return d.querySelector(sel); }
  function pickFilter(){
    // 가능한 루트 후보를 폭넓게 지원
    return q('[data-role="filter-bar"]') || q('#filter-bar') ||
           q('.filter-bar') || q('#filter') || q('.filter');
  }
  function pickList(){
    // 리스트 루트 후보
    return q('#diary-list') || q('.diary-list') || q('[data-role="diary-list"]') ||
           q('.list .cards') || q('.list') || q('#list');
  }
  function pickHeader(){
    return q('header') || q('.site-header');
  }
  function setTop(){
    var h = 0, hd = pickHeader();
    try {
      if (hd) { var r = hd.getBoundingClientRect(); if (!isNaN(r.height)) h = Math.round(r.height); }
    } catch(_) {}
    d.documentElement.style.setProperty('--sticky-top', h + 'px');
  }
  function neutralize(el){
    if (!el) return;
    el.classList.remove('fixed','is-fixed','is-sticky');
    el.style.position = el.style.top = el.style.left = el.style.right = el.style.bottom = '';
  }
  function ensurePlacement(el){
    var list = pickList();
    if (!el || !list || !list.parentNode) return;
    // 같은 부모에서 리스트 바로 앞(위치가 다르면 한 번만 이동)
    if (el.parentNode !== list.parentNode || el.nextElementSibling !== list){
      list.parentNode.insertBefore(el, list);
    }
  }

  function bind(){
    var el = pickFilter();
    if (!el) { w.setTimeout(bind, 120); return; } // 지연 로딩 대비

    // 1) DOM 위치 교정: 리스트 바로 위
    ensurePlacement(el);

    // 2) sticky로 전환 + top 보정
    neutralize(el);
    el.classList.add('filter-sticky');
    setTop();

    // 3) 헤더 크기 변화 대응
    try {
      if (w.ResizeObserver) {
        var ro = new ResizeObserver(setTop), hd = pickHeader();
        if (hd) ro.observe(hd);
      }
      w.addEventListener('resize', setTop);
    } catch(_) {}

    // 4) 다른 코드가 fixed/class를 강제로 바꿔도 즉시 원복
    try {
      var mo = new MutationObserver(function(){
        var cs = w.getComputedStyle(el);
        if (cs.position === 'fixed' || el.classList.contains('fixed') || el.classList.contains('is-fixed')) {
          neutralize(el); el.classList.add('filter-sticky'); setTop();
        }
      });
      mo.observe(el, { attributes:true, attributeFilter:['class','style'] });
    } catch(_) {}
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', bind, { once:true });
  else bind();
})(window, document);
