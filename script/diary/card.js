(function (g) {
  "use strict";

  var DEFAULT_IMAGE = "./assets/profile-placeholder.png";

  function normalizeEntry(raw) {
    raw = raw || {};
    var mood = g.sanitizeClassSegment(raw.mood || raw.emotion || "unknown", "unknown");
    var title = g.safeText(raw.title, "(제목 없음)");
    var emotionText = g.safeText(raw.emotionText || raw.moodText || raw.mood, "기분 미상");
    var image = g.safeText(raw.image, "");
    var dateText = g.safeText(raw.date, "");
    var d = new Date(dateText);
    if (isNaN(d)) d = new Date();
    var displayDate = d.toISOString().slice(0, 10);
    return { mood: mood, title: title, emotionText: emotionText, image: image, date: displayDate, _raw: raw };
  }

  function createDiaryCard(entry, opts) {
    opts = opts || {};
    var defImg = opts.defaultImage || DEFAULT_IMAGE;
    var e = normalizeEntry(entry);

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
    img.onerror = function () { if (img.src !== defImg) img.src = defImg; };
    wrap.appendChild(img);
    top.appendChild(wrap);

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
    meta.appendChild(emotion);
    meta.appendChild(date);

    var title = document.createElement("div");
    title.className = "card-title";
    title.textContent = e.title;

    bottom.appendChild(meta);
    bottom.appendChild(title);
    card.appendChild(top);
    card.appendChild(bottom);

    return { card: card, data: e };
  }

  g.createDiaryCard = createDiaryCard;
})(window);
