(function (w, d) {
  "use strict";
  var DL = w.DiaryList = w.DiaryList || {};
  var DEF = DL.DEFAULTS || {};
  DL.createDiaryCard = function (entry, opts) {
    opts = opts || {};
    var e = DL.normalizeEntry(entry);
    var defImg = opts.defaultImage || DEF.defaultImage || "./assets/profile-placeholder.png";

    var card = d.createElement("div"); card.className = "diary-card mood-" + e.mood;

    var top = d.createElement("div"); top.className = "card-top";
    var wrap = d.createElement("div"); wrap.className = "profile-wrapper";
    var img = d.createElement("img"); img.className = "profile-img"; img.alt = e.mood; img.src = e.image || defImg;
    img.onerror = function(){ if (img.src !== defImg) img.src = defImg; };
    wrap.appendChild(img); top.appendChild(wrap);

    var bottom = d.createElement("div"); bottom.className = "card-bottom";
    var meta = d.createElement("div"); meta.className = "card-meta";

    var emotion = d.createElement("span"); emotion.className = "emotion " + e.mood; emotion.textContent = e.emotionText;
    var date = d.createElement("span"); date.className = "date"; date.textContent = e.date;

    var right = d.createElement("div"); right.className = "meta-right";

    // 버튼: 템플릿 모듈 우선, 없으면 최소 폴백(Enhancer가 있으면 생략해도 OK)
    var btn = null;
    if (w.DiaryViewButton && typeof w.DiaryViewButton.clone === "function") btn = w.DiaryViewButton.clone();
    else if (!w.ViewButtonEnhancer) {
      btn = d.createElement("button");
      btn.type = "button"; btn.className = "btn-view-detail"; btn.setAttribute("data-role", "view-detail"); btn.textContent = "상세보기";
    }
    var id = (e._raw && (e._raw.id || e._raw.diaryId)) || e.id || "";
    if (id) card.dataset.diaryId = id;

if (btn) {
  // (선택) 접근성 라벨
  try { btn.setAttribute("aria-label", "상세보기: " + (e.title || "")); } catch(_) {}

  btn.addEventListener("click", function (ev) {
    ev.stopPropagation();

    // 전역 훅이 있으면 항상 위임 (id 없어도 세션을 통해 detail이 채워지도록 설계)
    if (typeof w.openDiaryDetail === "function") {
      try { w.openDiaryDetail(id, e); return; } catch (_) {}
    }

    // 폴백: 전역 훅이 없을 때도 detail로 이동 (기능 손실 방지)
    try { sessionStorage.setItem("diary:lastEntry", JSON.stringify(e)); } catch (_) {}
    var url = new URL("./subpage/detail.html", location.href);
    if (id) url.searchParams.set("id", String(id));
    location.href = url.pathname + url.search;
  });

  right.appendChild(btn);
}

    right.appendChild(date);
    meta.appendChild(emotion); meta.appendChild(right);

    var title = d.createElement("div"); title.className = "card-title"; title.textContent = e.title;

    bottom.appendChild(meta); bottom.appendChild(title);
    card.appendChild(top); card.appendChild(bottom);

    return { card: card, data: e };
  };
})(window, document);
