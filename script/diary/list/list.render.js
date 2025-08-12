(function (w, d) {
  "use strict";
  var U = w.DiaryListUtils, DL = w.DiaryList = w.DiaryList || {}, DEF = DL.DEFAULTS || {};

  function renderDiaries(data, opts) {
    opts = opts || {};
    var cfg = {
      containerId: opts.containerId || DEF.containerId || "diary-list",
      emptyMessage: opts.emptyMessage || DEF.emptyMessage || "등록된 일기가 없습니다."
    };
    var list = d.getElementById(cfg.containerId);
    if (!list) { console.error("❌ #"+cfg.containerId+" 컨테이너 없음"); return 0; }

    if (U.isThenable(data)) {
      return data.then(function (arr) { return renderDiaries(arr, opts); })
        .catch(function (err) {
          console.error("❌ 비동기 데이터 로딩 실패:", err);
          list.textContent = "";
          var p = d.createElement("p"); p.className = "empty"; p.textContent = cfg.emptyMessage; list.appendChild(p);
          return 0;
        });
    }

    if (!Array.isArray(data)) { console.warn("⚠️ data가 배열이 아님. 빈 배열로 대체:", data); data = []; }

    list.innerHTML = "";
    if (data.length === 0) {
      var p = d.createElement("p"); p.className = "empty"; p.textContent = cfg.emptyMessage; list.appendChild(p);
      return 0;
    }

    var frag = d.createDocumentFragment(), rendered = 0;
    for (var i = 0; i < data.length; i++) {
      try {
        var built = DL.createDiaryCard(data[i], opts);
        DL.bindDetail(built.card, built.data);
        frag.appendChild(built.card);
        rendered++;
      } catch (e) {
        console.error("❌ 카드 렌더링 실패:", e, data[i]);
      }
    }
    list.appendChild(frag);

    // 렌더 후 보정(선택): Enhancer가 있으면 새 카드에도 자동 버튼 삽입
    if (w.ViewButtonEnhancer && typeof w.ViewButtonEnhancer.attach === "function") {
      try { w.ViewButtonEnhancer.attach(list); } catch (_) {}
    }
    return rendered;
  }

  function renderDiariesFromUrl(url, opts) {
    if (!url || typeof url !== "string") { console.error("❌ 유효하지 않은 URL:", url); return Promise.resolve(0); }
    return fetch(url, { cache: "no-store" })
      .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
      .then(function (json) { return renderDiaries(Array.isArray(json) ? json : [], opts); })
      .catch(function (err) { console.error("❌ 데이터 로드 실패:", err); return renderDiaries([], opts); });
  }

  // 네임스페이스 및 레거시 전역(이미 있으면 덮어쓰지 않음)
  DL.renderDiaries = renderDiaries;
  DL.renderDiariesFromUrl = renderDiariesFromUrl;
  if (!w.renderDiaries) w.renderDiaries = renderDiaries;
  if (!w.renderDiariesFromUrl) w.renderDiariesFromUrl = renderDiariesFromUrl;
  if (!w.createDiaryCard) w.createDiaryCard = DL.createDiaryCard;
})(window, document);
