// script/diaryList.js (compact)
(function (global) {
  "use strict";

  // ---- utils ----
  function onReady(fn){ document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn,{once:true}):fn(); }
  function txt(v, fb){ return (v===null||v===undefined) ? (fb||"") : String(v); }
  function clsSeg(v, fb){ var s=txt(v,fb||"unknown").toLowerCase().replace(/[^a-z0-9_-]+/g,"-"); return s||fb||"unknown"; }
  function isThenable(x){ return x && typeof x.then==="function"; }

  // ---- defaults ----
  var DEFAULTS = {
    containerId: "diary-list",
    emptyMessage: "등록된 일기가 없습니다.",
    defaultImage: "./assets/profile-placeholder.png"
  };

  // ---- normalize ----
  function normalizeEntry(raw){
    raw = raw || {};
    var mood = clsSeg(raw.mood || raw.emotion || "unknown","unknown");
    var title = txt(raw.title,"(제목 없음)");
    var emotionText = txt(raw.emotionText || raw.moodText || raw.mood,"기분 미상");
    var image = txt(raw.image,"");
    var d = new Date(txt(raw.date,""));
    if (isNaN(d)) {
      var n = Number(raw.date);
      d = isNaN(n) ? new Date() : new Date(n);
    }
    var displayDate = d.toISOString().slice(0,10);
    return { mood, title, emotionText, image, date: displayDate, _raw: raw };
  }

  // ---- card ----
  function createDiaryCard(entry, opts){
    opts = opts || {};
    var e = normalizeEntry(entry), defImg = opts.defaultImage || DEFAULTS.defaultImage;

    var card = document.createElement("div");
    card.className = "diary-card mood-" + e.mood;

    var top = document.createElement("div");
    top.className = "card-top";
    var wrap = document.createElement("div");
    wrap.className = "profile-wrapper";
    var img = document.createElement("img");
    img.className = "profile-img";
    img.alt = e.mood;
    img.src = e.image || defImg;
    img.onerror = function(){ if (img.src !== defImg) img.src = defImg; };
    wrap.appendChild(img); top.appendChild(wrap);

    var bottom = document.createElement("div");
    bottom.className = "card-bottom";

    var meta = document.createElement("div");
    meta.className = "card-meta";
    var emotion = document.createElement("span");
    emotion.className = "emotion " + e.mood;
    emotion.textContent = e.emotionText;
    var date = document.createElement("span");
    date.className = "date";
    date.textContent = e.date;
    meta.appendChild(emotion); meta.appendChild(date);

    var title = document.createElement("div");
    title.className = "card-title";
    title.textContent = e.title;

    bottom.appendChild(meta); bottom.appendChild(title);
    card.appendChild(top); card.appendChild(bottom);

    return { card, data: e };
  }

  // ---- detail bind ----
  function bindDetail(card, entry){
    if (typeof global.bindDiaryDetail === "function") {
      try { global.bindDiaryDetail(card, entry); return; } catch (_) { /* fall through */ }
    }
    card.addEventListener("click", function(){
      alert(["[일기 상세 정보]","📅 날짜: "+entry.date,"😊 기분: "+entry.emotionText,"📝 제목: "+entry.title].join("\n"));
    });
  }

  // ---- render ----
  function renderDiaries(data, opts){
    opts = opts || {};
    var cfg = {
      containerId: opts.containerId || DEFAULTS.containerId,
      emptyMessage: opts.emptyMessage || DEFAULTS.emptyMessage
    };
    var list = document.getElementById(cfg.containerId);
    if (!list) { console.error("❌ #"+cfg.containerId+" 컨테이너 없음"); return 0; }

    if (isThenable(data)) {
      return data.then(function(arr){ return renderDiaries(arr, opts); })
                 .catch(function(err){ console.error("❌ 비동기 데이터 로딩 실패:", err); list.textContent=""; var p=document.createElement("p"); p.className="empty"; p.textContent=cfg.emptyMessage; list.appendChild(p); return 0; });
    }

    if (!Array.isArray(data)) { console.warn("⚠️ data가 배열이 아님. 빈 배열로 대체:", data); data = []; }

    list.innerHTML = "";
    if (data.length === 0) {
      var p = document.createElement("p"); p.className="empty"; p.textContent=cfg.emptyMessage; list.appendChild(p); return 0;
    }

    var frag = document.createDocumentFragment(), rendered = 0;
    for (var i=0;i<data.length;i++){
      try {
        var built = createDiaryCard(data[i], opts);
        bindDetail(built.card, built.data);
        frag.appendChild(built.card);
        rendered++;
      } catch (e) {
        console.error("❌ 카드 렌더링 실패:", e, data[i]);
      }
    }
    list.appendChild(frag);
    return rendered;
  }

  // ---- fetch + render ----
  function renderDiariesFromUrl(url, opts){
    if (!url || typeof url !== "string") { console.error("❌ 유효하지 않은 URL:", url); return Promise.resolve(0); }
    return fetch(url,{cache:"no-store"})
      .then(function(res){ if(!res.ok) throw new Error("HTTP "+res.status); return res.json(); })
      .then(function(json){ return renderDiaries(Array.isArray(json)?json:[], opts); })
      .catch(function(err){ console.error("❌ 데이터 로드 실패:", err); return renderDiaries([], opts); });
  }

  // ---- exports ----
  global.renderDiaries = renderDiaries;
  global.renderDiariesFromUrl = renderDiariesFromUrl;
  global.createDiaryCard = createDiaryCard;

  // ---- autorender (compat) ----
  onReady(function(){ if (Array.isArray(global.diaryList)) renderDiaries(global.diaryList); });

})(window);
