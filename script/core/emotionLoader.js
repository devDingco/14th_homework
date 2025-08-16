// script/diary/constants/emotions.loader.js
(function (w) {
  "use strict";

  // 기본값(안전망). JSON 로드 성공 시 덮어씌움.
  var defaults = {
    allowed: ["happy","sad","angry","surprised","etc"],
    labelToCode: {
      "행복해요":"happy","슬퍼요":"sad","화나요":"angry","놀랐어요":"surprised","기타":"etc",
      "😊 행복해요":"happy","😢 슬퍼요":"sad","😡 화나요":"angry","😮 놀랐어요":"surprised","❓ 기타":"etc"
    },
    emotionText: {
      happy:"행복해요", sad:"슬퍼요", angry:"화나요", surprised:"놀랐어요", etc:"기타"
    },
    image: {
      happy:"./images/happy.png", sad:"./images/sad.png", angry:"./images/angry.png",
      surprised:"./images/surprised.png", etc:"./images/etc.png"
    }
  };

  function trimStr(v){ return (typeof v === "string" ? v.trim() : ""); }
  function moodFromInput(v, cfg){
    var s = trimStr(v);
    // 선행 이모지/기호 제거(예: "😊 행복해요")
    s = s.replace(/^[^\w가-힣]+/, "");
    if (cfg.labelToCode[s]) return cfg.labelToCode[s];
    var low = s.toLowerCase();
    return cfg.allowed.indexOf(low) >= 0 ? low : "etc";
  }
  function imageFor(m, cfg){ return cfg.image[m] || cfg.image.etc; }

  // 전역 객체 초기화(한 번만)
  if (!w.DiaryConst) w.DiaryConst = {};
  if (w.DiaryConst.__EMO_INIT__) return;

  // 즉시 기본 동작 제공
  var cfg = Object.assign({}, defaults);
  w.DiaryConst.EMOTIONS = cfg.allowed.slice();
  w.DiaryConst.emotionText = Object.assign({}, cfg.emotionText);
  w.DiaryConst.moodFromInput = function(v){ return moodFromInput(v, cfg); };
  w.DiaryConst.imageFor = function(m){ return imageFor(m, cfg); };
  w.DiaryConst.__EMO_INIT__ = true;

  // 비동기 JSON 로드(성공 시 cfg 업데이트)
  try {
    fetch("./script/json/emotions.json", { cache: "no-store" })
      .then(function(r){ return r.ok ? r.json() : defaults; })
      .then(function(j){
        cfg = Object.assign({}, defaults, j || {});
        // 최신 값으로 다시 바인딩(기존 API는 동일)
        w.DiaryConst.EMOTIONS = cfg.allowed.slice();
        w.DiaryConst.emotionText = Object.assign({}, cfg.emotionText);
        // 함수는 클로저 cfg를 참조하므로 새 cfg로 동작
        console.log("[emotions.loader] emotions.json loaded");
      })
      .catch(function(){
        console.warn("[emotions.loader] using defaults (json load failed)");
      });
  } catch(_) {
    console.warn("[emotions.loader] using defaults (exception)");
  }
})(window);
