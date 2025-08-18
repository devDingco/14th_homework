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

    // ID 단일화: DiaryId 유틸 우선 사용(폴백은 기존 로직)
    var id = (w.DiaryId && typeof w.DiaryId.get === "function")
      ? w.DiaryId.get(e)
      : ((e && e.id) ? String(e.id)
        : (e && e._raw && (e._raw.id || e._raw.diaryId)) ? String(e._raw.id || e._raw.diaryId) : "");

    // (레거시 폴백) id 보조 계산기
    function getSafeId() {
      if (id) return id;
      try {
        if (w.DiaryStoreUtil && typeof w.DiaryStoreUtil.deriveId === "function") {
          return w.DiaryStoreUtil.deriveId(e) || "";
        }
      } catch(_) {}
      return "";
    }

    // 표준화된 ID 취득(유틸 → 로컬 id → 레거시 폴백)
    function getId() {
      var viaUtil = (w.DiaryId && typeof w.DiaryId.get === "function") ? w.DiaryId.get(e, card) : "";
      return viaUtil || id || getSafeId();
    }

    // 2) 카드 루트
    var card = d.createElement("div");
    card.className = "diary-card mood-" + (e.mood || "etc");

    // 카드에 ID 부착(유틸이 있으면 그걸로, 없으면 dataset)
    (function attachCardId(){
      var cid = getId();
      if (!cid) return;
      if (w.DiaryId && typeof w.DiaryId.set === "function") w.DiaryId.set(card, cid);
      else card.dataset.diaryId = cid;
    })();

    // 삭제 버튼 주입(단일화 모듈)
    if (w.DiaryCardDelete && typeof w.DiaryCardDelete.inject === "function") {
      w.DiaryCardDelete.inject(card, getId);
    } else if (w.DiaryCardDelete && typeof w.DiaryCardDelete.attach === "function") {
      // 구버전 호환
      w.DiaryCardDelete.attach(card, getId);
    }

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

    // 5) 상세보기 버튼 주입(모듈 위임, 모듈 없으면 최소 폴백)
    if (w.DiaryCardView && typeof w.DiaryCardView.inject === "function") {
      w.DiaryCardView.inject(right, getId, e);
    } else {
      // 🔙 폴백(모듈이 없을 때만)
      var btn = d.createElement("button");
      btn.type = "button";
      btn.className = "btn-view-detail";
      btn.setAttribute("data-role", "view-detail");
      btn.textContent = "상세보기";
      var cid = getId(); if (cid) btn.dataset.diaryId = cid;
      btn.setAttribute("aria-label", "상세보기");
      btn.addEventListener("click", function(ev){
        ev.preventDefault(); ev.stopPropagation();
        var tid = getId(); if (!tid) return;
        if (typeof w.openDiaryDetail === "function") { try { w.openDiaryDetail(tid, e); return; } catch(_){} }
        w.location.href = "./subpage/detail.html?id=" + encodeURIComponent(tid);
      });
      right.appendChild(btn);
    }

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
