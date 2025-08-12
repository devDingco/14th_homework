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

    // id 보조 계산기(없으면 deriveId 시도)
    function getSafeId() {
      if (id) return id;
      try {
        if (w.DiaryStoreUtil && typeof w.DiaryStoreUtil.deriveId === "function") {
          return w.DiaryStoreUtil.deriveId(e) || "";
        }
      } catch(_) {}
      return "";
    }

    // 2) 카드 루트
    var card = d.createElement("div");
    card.className = "diary-card mood-" + (e.mood || "etc");
    if (id) card.dataset.diaryId = id;

    /* ===== 삭제 버튼 추가(카드 우상단 오버레이) ===== */
    (function addDeleteButton(){
      var delBtn;
      try {
        if (w.DiaryDeleteButton && typeof w.DiaryDeleteButton.clone === "function") {
          delBtn = w.DiaryDeleteButton.clone();
        }
      } catch(_) { /* 폴백 아래에서 처리 */ }
      if (!delBtn) {
        delBtn = d.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn-delete-card";
        delBtn.setAttribute("data-role", "delete-card");
        delBtn.textContent = "×";
      }

      var safeId = getSafeId();
      if (safeId) {
        delBtn.dataset.diaryId = safeId;
        delBtn.title = "삭제";
        delBtn.setAttribute("aria-label", "이 일기 삭제");
      } else {
        // id가 전혀 계산되지 않으면 비활성화(오류 방지)
        delBtn.disabled = true;
        delBtn.title = "삭제할 ID를 찾을 수 없습니다.";
      }

       ['pointerdown','mousedown','touchstart','pointerup','mouseup','touchend'].forEach(function(type){
        delBtn.addEventListener(type, function(e){
          // 기본 동작은 유지(버튼의 click은 살아야 하므로 preventDefault는 안 함)
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          e.cancelBubble = true; // 레거시 브라우저 보조
        }, { capture: true });
      });
      

      var deleting = false;
      delBtn.addEventListener("click", function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        if (deleting) return;

        var targetId = delBtn.dataset.diaryId || card.dataset.diaryId || getSafeId();
        if (!targetId) { alert("삭제할 일기의 ID를 찾을 수 없습니다."); return; }
        if (!confirm("정말 삭제할까요? 삭제는 되돌릴 수 없습니다.")) return;

        deleting = true;
        delBtn.disabled = true;

        try {
          // 1순위: 정식 스토어 API
          if (typeof w.removeDiary === "function") {
            var ok = !!w.removeDiary(targetId);
            if (!ok) throw new Error("removeDiary 실패");
          } else {
            // 2순위: 안전 후퇴(전역 리스트 직접 갱신)
            var list = Array.isArray(w.diaryList) ? w.diaryList : null;
            if (!list) throw new Error("diaryList 없음");
            var idx = list.findIndex(function(x){
              if (!x) return false;
              return (x.id===targetId || x.diaryId===targetId);
            });
            if (idx < 0) throw new Error("대상 없음");
            list.splice(idx, 1);

            try { w.persistDiaries && w.persistDiaries(); } catch(_) {}
            try{
              if (w.DiaryList && typeof w.DiaryList.renderDiaries==="function") {
                w.DiaryList.renderDiaries(list);
              } else if (typeof w.renderDiaries==="function") {
                w.renderDiaries(list);
              }
            }catch(_){}
          }
        } catch (err) {
          console.error("❌ 삭제 실패:", err);
          alert("삭제 중 오류가 발생했습니다.");
        } finally {
          // 보통은 리렌더로 버튼이 사라지지만, 실패 시에도 잠금 해제
          delBtn.disabled = false;
          deleting = false;
        }
      });

      // 키보드 접근(버튼은 기본 Enter/Space 동작이 있으나, 충돌 방지용)
      delBtn.addEventListener("keydown", function(ev){
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault(); ev.stopPropagation();
          delBtn.click();
        }
      });

      // 카드 루트에 부착 → CSS absolute(top/right)로 배치됨
      card.appendChild(delBtn);
    })();
    /* ===== // 삭제 버튼 추가 끝 ===== */

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
      var targetId = id || getSafeId();
      if (!targetId) return;
      if (typeof w.openDiaryDetail === "function") {
        try { w.openDiaryDetail(targetId, e); return; } catch (_) {}
      }
      try {
        var url = "./subpage/detail.html?id=" + encodeURIComponent(targetId);
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
