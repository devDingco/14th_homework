// /script/diary/viewButtonEnhancer.js
(function (w, d) {
  "use strict";

  var TPL_URL = "./component/diary/viewButton.html";
  var tplBtn = null; // <button> template element

  // 템플릿 미리 로드 (실패해도 폴백 준비)
  function ensureTemplate() {
    if (tplBtn) return Promise.resolve();
    return fetch(TPL_URL, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (html) {
        var wrap = d.createElement("div");
        wrap.innerHTML = (html || "").trim();
        var btn = wrap.firstElementChild;
        if (!btn || btn.tagName !== "BUTTON") throw new Error("invalid template");
        tplBtn = btn;
      })
      .catch(function () {
        var b = d.createElement("button");
        b.type = "button";
        b.className = "btn-view-detail";
        b.setAttribute("data-role", "view-detail");
        b.textContent = "상세보기";
        tplBtn = b;
      });
  }

  function cloneBtn() {
    if (!tplBtn) {
      var b = d.createElement("button");
      b.type = "button";
      b.className = "btn-view-detail";
      b.setAttribute("data-role", "view-detail");
      b.textContent = "상세보기";
      return b;
    }
    return tplBtn.cloneNode(true);
  }

  // 메타 영역에 버튼을 삽입한다. (.date 왼쪽)
  function injectIntoMeta(meta) {
    if (!meta || meta.querySelector(".btn-view-detail")) return;

    var dateEl = meta.querySelector(".date");
    var right = meta.querySelector(".meta-right");
    if (!right) {
      right = d.createElement("div");
      right.className = "meta-right";
      if (dateEl) {
        meta.replaceChild(right, dateEl);
        right.appendChild(dateEl); // 일단 날짜만 넣고, 버튼은 앞에 붙임
      } else {
        meta.appendChild(right);
      }
    }

    var btn = cloneBtn();
    // 클릭 시 카드 클릭과 충돌 방지
    btn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      var card = meta.closest(".diary-card");
      var id = card?.dataset?.diaryId
        || card?.getAttribute("data-id")
        || "";
      if (typeof w.openDiaryDetail === "function" && id) {
        try { w.openDiaryDetail(id); } catch (_) {}
      } else {
        console.log("[view-detail] click", id);
      }
    });

    // 버튼을 날짜 왼쪽으로
    if (right.firstChild && right.firstChild.classList?.contains("date")) {
      right.insertBefore(btn, right.firstChild);
    } else {
      right.appendChild(btn);
    }
  }

  // 루트 내 모든 카드에 버튼 삽입
  function attach(rootSelector) {
    var root = typeof rootSelector === "string"
      ? d.querySelector(rootSelector)
      : rootSelector || d;

    var metas = root.querySelectorAll(".diary-card .card-meta");
    metas.forEach(injectIntoMeta);
  }

  // DOM 변화 감지해서 새 카드에도 자동 삽입
  var observer = null;
  function observe(rootSel) {
    var root = d.querySelector(rootSel);
    if (!root) return;
    if (observer) observer.disconnect();
    observer = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === "childList" && (m.addedNodes?.length)) {
          m.addedNodes.forEach(function (node) {
            if (!(node instanceof Element)) return;
            if (node.matches && node.matches(".diary-card")) {
              injectIntoMeta(node.querySelector(".card-meta"));
            } else {
              var metas = node.querySelectorAll?.(".diary-card .card-meta");
              metas && metas.forEach(injectIntoMeta);
            }
          });
        }
      }
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  // 공개 API
  w.ViewButtonEnhancer = {
    init: function (rootSelector) {
      return ensureTemplate().then(function () {
        attach(rootSelector || "#diary-list");
        observe(rootSelector || "#diary-list");
      });
    },
    attach: function (rootSelector) {
      return ensureTemplate().then(function () {
        attach(rootSelector || "#diary-list");
      });
    }
  };

  // 자동 초기화(페이지 로드 후)
  if (d.readyState === "loading") {
    d.addEventListener("DOMContentLoaded", function () {
      ensureTemplate().then(function () { w.ViewButtonEnhancer.init("#diary-list"); });
    }, { once: true });
  } else {
    ensureTemplate().then(function () { w.ViewButtonEnhancer.init("#diary-list"); });
  }
})(window, document);
