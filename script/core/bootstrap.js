// script/core/bootstrap.js
(function (w, d) {
  "use strict";

  // ✅ 이미 로드됐다면 즉시 종료(진짜 가드)
  if (w.__DIARY_BOOTSTRAPPED__) return;
  w.__DIARY_BOOTSTRAPPED__ = true;

  // 재시도 제어(무한 루프 방지)
  var MAX_TRIES = 50;    // 최대 50회 (약 5초)
  var TRY_DELAY = 100;   // 100ms 간격
  var running = false;   // 동시 실행 방지
  var finished = false;  // 완료 후 재호출 방지

  var DATA_URL = "./script/json/data.json"; // index 기준 경로

  function haveRenderer() {
    return !!(
      (w.DiaryList &&
        (typeof w.DiaryList.renderDiaries === "function")) ||
      typeof w.renderDiaries === "function"
    );
  }

  function ensureListEl() {
    return d.getElementById("diary-list");
  }

  // ✅ 초기 데이터: 상태에 주입(참조 유지) → 표준 렌더
  async function hydrateAndRender(url) {
    // 1) 데이터 로드 (실패 시 빈 배열로 진행)
    var data = [];
    try {
      var res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      data = await res.json();
      if (!Array.isArray(data)) data = [];
    } catch (e) {
      console.warn("⚠️ 초기 데이터 로드 실패, 빈 배열로 진행:", e.message);
      data = [];
    }

    // 2) 상태에 주입(참조 유지)
    if (typeof w.hydrateDiaries === "function") {
      try { w.hydrateDiaries(data, "replace"); } catch (e) { console.warn("hydrateDiaries 실패:", e); }
    } else {
      // 전역 배열 참조 유지
      w.diaryList = Array.isArray(w.diaryList) ? w.diaryList : [];
      w.diaryList.splice(0, w.diaryList.length, ...data);
    }

    // 3) 렌더러로 그리기
    try {
      if (w.DiaryList && typeof w.DiaryList.renderDiaries === "function") {
        w.DiaryList.renderDiaries(w.diaryList);
      } else if (typeof w.renderDiaries === "function") {
        w.renderDiaries(w.diaryList);
      } else {
        throw new Error("renderer not available");
      }
    } catch (e) {
      console.error("초기 렌더 실패:", e);
    }
  }

  w.bootstrapDiary = function bootstrapDiary(attempt) {
    if (finished || running) return;
    running = true;

    attempt = (attempt | 0);

    // 1) 컨테이너 준비 여부
    var listEl = ensureListEl();
    if (!listEl) {
      running = false;
      if (attempt < MAX_TRIES) {
        return setTimeout(function () { bootstrapDiary(attempt + 1); }, TRY_DELAY);
      }
      console.warn("⚠️ #diary-list 를 찾지 못해 부트스트랩을 중단합니다.");
      return;
    }

    // 2) 렌더러 준비 확인
    if (!haveRenderer()) {
      running = false;
      if (attempt < MAX_TRIES) {
        return setTimeout(function () { bootstrapDiary(attempt + 1); }, TRY_DELAY);
      }
      console.error("❌ renderer 준비 실패: 초기화를 중단합니다.");
      return;
    }

    // 3) 상태 주입 → 렌더 → 필터 초기화
    hydrateAndRender(DATA_URL)
      .then(function () {
        finished = true;
        running = false;

        // 선택: 필터 초기화
        if (w.DiaryFilter && typeof w.DiaryFilter.init === "function") {
          try { w.DiaryFilter.init("#filter-select"); } catch (_) {}
        }
      })
      .catch(function (err) {
        running = false;
        if (attempt < MAX_TRIES) {
          return setTimeout(function () { bootstrapDiary(attempt + 1); }, TRY_DELAY);
        }
        console.error("❌ bootstrapDiary 실패:", err);
      });
  };
})(window, document);
