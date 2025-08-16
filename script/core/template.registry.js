// script/core/template.registry.js
(function (w) {
  "use strict";
  if (w.Templates) return;
  var bag = Object.create(null);
  w.Templates = {
    get: function (name) { return bag[name] || ""; },
    has: function (name) { return !!bag[name]; },
    set: function (name, html) {
      if (typeof name !== "string" || !name) return;
      if (typeof html === "string" && html.trim()) bag[name] = html;
      return bag[name] || "";
    },
    keys: function(){ return Object.keys(bag); }
  };
})(window);
