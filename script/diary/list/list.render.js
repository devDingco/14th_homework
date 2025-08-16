// script/diary/list/list.render.js
(function (w, d) {
  "use strict";

  var DL = w.DiaryList = w.DiaryList || {};
  var U  = w.DiaryListUtils || {};
  var DEF = DL.DEFAULTS || {};

  // 컨테이너 캐시(중복 query 방지)
  var CACHE = { el: null, id: null };

  function resolveContainer(id) {
    var targetId = id || DEF.containerId || "diary-list";
    if (CACHE.el && CACHE.id === targetId && CACHE.el.isConnected) return CACHE.el;
    var el = d.getElementById(targetId);
    if (!el) { console.error("❌ 컨테이너 없음: #"+targetId); return null; }
    CACHE.el = el; CACHE.id = targetId;
    return el;
  }

  function setEmpty(list, msg) {
    list.textContent = "";
    var p = d.createElement("p");
    p.className = "empty";
    p.textContent = msg || DEF.emptyMessage || "등록된 일기가 없습니다.";
    list.appendChild(p);
    return 0;
  }

  function renderDiaries(data, opts) {
    opts = opts || {};
    var list = resolveContainer(opts.containerId);
    if (!list) return 0;

    // Promise/Thenable 지원
    if (U.isThenable && U.isThenable(data)) {
      return data.then(function (arr) { return renderDiaries(arr, opts); })
        .catch(function (err) {
          console.error("❌ 비동기 로딩 실패:", err);
          return setEmpty(list, opts.emptyMessage);
        });
    }

    if (!Array.isArray(data)) {
      console.warn("⚠️ data가 배열이 아님. 빈 배열로 대체:", data);
      data = [];
    }

    list.innerHTML = "";
    if (data.length === 0) return setEmpty(list, opts.emptyMessage);

    var frag = d.createDocumentFragment(), rendered = 0;
    for (var i = 0; i < data.length; i++) {
      try {
        var built = DL.createDiaryCard(data[i], opts);
        if (DL.bindDetail) DL.bindDetail(built.card, built.data); // 카드 클릭 alert/버튼과 충돌 없음
        frag.appendChild(built.card);
        rendered++;
      } catch (e) {
        console.error("❌ 카드 렌더링 실패:", e, data[i]);
      }
    }
    list.appendChild(frag);

    // 버튼 템플릿 폴리필(주입 없음) — 있어도/없어도 무해
    try {
      if (w.ViewButtonEnhancer && typeof w.ViewButtonEnhancer.attach === "function") {
        w.ViewButtonEnhancer.attach(list);
      }
    } catch (_) {}

    return rendered;
  }

  function renderDiariesFromUrl(url, opts) {
    if (!url || typeof url !== "string") {
      console.error("❌ 유효하지 않은 URL:", url);
      return Promise.resolve(0);
    }
    return fetch(url, { cache: "no-store" })
      .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
      .then(function (json) { return renderDiaries(Array.isArray(json) ? json : [], opts); })
      .catch(function (err) {
        console.error("❌ 데이터 로드 실패:", err);
        var list = resolveContainer(opts && opts.containerId);
        return list ? setEmpty(list, opts && opts.emptyMessage) : 0;
      });
  }

  // 네임스페이스/레거시 전역(존재 시 덮어쓰지 않음)
  DL.renderDiaries = renderDiaries;
  DL.renderDiariesFromUrl = renderDiariesFromUrl;
  if (!w.renderDiaries) w.renderDiaries = renderDiaries;
  if (!w.renderDiariesFromUrl) w.renderDiariesFromUrl = renderDiariesFromUrl;
  if (!w.createDiaryCard) w.createDiaryCard = DL.createDiaryCard;
})(window, document);
