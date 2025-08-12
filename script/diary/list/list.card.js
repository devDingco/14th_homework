// script/diary/list/list.card.js
(function (w, d) {
  "use strict";

  var DL  = w.DiaryList = w.DiaryList || {};
  var DEF = DL.DEFAULTS || {};

  DL.createDiaryCard = function (entry, opts) {
    opts = opts || {};

    // 1) normalize로 항상 id/mood/title 등 안전 확보
    var e = (typeof DL.normalizeEntry === "function") ? DL.normalizeEntry(entry) : (entry || {});
    var defImg = opts.defaultImage || DEF.defaultImage || "./images/etc.png";
    var id = (e && e.id) ? String(e.id) :
             (e && e._raw && (e._raw.id || e._raw.diaryId)) ? String(e._raw.id || e._raw.diaryId) : "";

    // 2) 카드 루트
    var card = d.createElement("div");
    card.className = "diary-card mood-" + (e.mood || "etc");
    if (id) card.dataset.diaryId = id;

    // 3) 상단 이미지
    var top  = d.createElement("div");  top.className  = "card-top";
    var wrap = d.createElement("div");  wrap.className = "profile-wrapper";
    var img  = d.createElement("img");  img.className  = "profile-img";
    img.alt = e.mood || "";
    img.src = e.image || defImg;
    img.onerror = function(){ if (img.src !== defImg) img.src = defImg; };
    wrap.appendChild(img);
    top.appendChild(wrap);

    // 4) 하단 메타/타이틀
    var bottom = d.createElement("div"); bottom.className = "card-bottom";

    var meta = d.createElement("div");   meta.className  = "card-meta";
    var emotion = d.createElement("span");
    emotion.className = "emotion " + (e.mood || "");
    emotion.textContent = e.emotionText || "";
    meta.appendChild(emotion);

    // 오른쪽 묶음 = [버튼, 날짜]
    var right = d.createElement("div");
    right.className = "meta-right";

    // 5) 상세보기 버튼 (템플릿 우선, 없으면 폴백)
    var btn = null;
    try {
      if (w.DiaryViewButton && typeof w.DiaryViewButton.clone === "function") {
        btn = w.DiaryViewButton.clone();   // component/diary/viewButton.html 기반
      } else if (!w.ViewButtonEnhancer) {
        // 템플릿도, 주입기도 없으면 최소 폴백 생성
        btn = d.createElement("button");
        btn.type = "button";
        btn.className = "btn-view-detail";
        btn.setAttribute("data-role", "view-detail");
        btn.textContent = "상세보기";
      }
    } catch (_) { /* 무시 - 폴백 아래에서 보장됨 */ }

    if (!btn) {
      // 아주 최후 폴백
      btn = d.createElement("button");
      btn.type = "button";
      btn.className = "btn-view-detail";
      btn.setAttribute("data-role", "view-detail");
      btn.textContent = "상세보기";
    }

    // id를 버튼에도 매달아 디버깅/자동화에 유리
    if (id) btn.dataset.diaryId = id;

    // a11y: 키보드 접근성
    btn.setAttribute("aria-label", "상세보기");

    // 클릭 시 라우팅 (카드 클릭과 충돌 방지)
    var goDetail = function () {
      if (!id) return;
      if (typeof w.openDiaryDetail === "function") {
        try { w.openDiaryDetail(id, e); return; } catch (_) {}
      }
      // 안전 폴백: 직접 이동
      try {
        var url = "./subpage/detail.html?id=" + encodeURIComponent(id);
        w.location.href = url;
      } catch (err) {
        console.error("❌ 상세보기 이동 실패:", err);
      }
    };
    btn.addEventListener("click", function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      goDetail();
    });
    btn.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        ev.stopPropagation();
        goDetail();
      }
    });

    right.appendChild(btn);

    // 날짜
    var date = d.createElement("span");
    date.className = "date";
    date.textContent = e.date || "";
    right.appendChild(date);

    meta.appendChild(right);

    // 타이틀
    var title = d.createElement("div");
    title.className = "card-title";
    title.textContent = e.title || "(제목 없음)";

    bottom.appendChild(meta);
    bottom.appendChild(title);

    // 카드 조립
    card.appendChild(top);
    card.appendChild(bottom);

    return { card: card, data: e };
  };
})(window, document);
