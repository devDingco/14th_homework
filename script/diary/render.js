(function (g) {
  "use strict";

  var DEFAULTS = { containerId: "diary-list", emptyMessage: "등록된 일기가 없습니다." };

  function bindDetail(card, entry) {
    if (typeof g.bindDiaryDetail === "function") {
      try { g.bindDiaryDetail(card, entry); return; } catch (e) { /* fallback below */ }
    }
    card.addEventListener("click", function () {
      alert("[일기 상세 정보]\n📅 날짜: " + entry.date + "\n😊 기분: " + entry.emotionText + "\n📝 제목: " + entry.title);
    });
  }

  function renderDiaries(data, opts) {
    opts = opts || {};
    var cfg = { containerId: opts.containerId || DEFAULTS.containerId, emptyMessage: opts.emptyMessage || DEFAULTS.emptyMessage };
    var list = document.getElementById(cfg.containerId);
    if (!list) { console.error("❌ #" + cfg.containerId + " 컨테이너 없음"); return 0; }

    if (!Array.isArray(data)) { console.warn("data가 배열이 아님. 빈 배열로 대체:", data); data = []; }

    list.innerHTML = "";
    if (data.length === 0) {
      var p = document.createElement("p"); p.className = "empty"; p.textContent = cfg.emptyMessage; list.appendChild(p); return 0;
    }

    var frag = document.createDocumentFragment();
    var rendered = 0;
    for (var i = 0; i < data.length; i++) {
      try {
        var built = g.createDiaryCard(data[i], opts);
        bindDetail(built.card, built.data);
        frag.appendChild(built.card);
        rendered++;
      } catch (err) {
        console.error("카드 렌더 실패:", err, data[i]);
      }
    }
    list.appendChild(frag);
    return rendered;
  }

  g.renderDiaries = renderDiaries;

  g.whenReady(function () {
    if (Array.isArray(g.diaryList)) g.renderDiaries(g.diaryList);
  });
})(window);
