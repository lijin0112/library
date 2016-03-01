/**
 * Created by Li on 2016/1/8.
 */
/**
 * @name    Shuffle Letters
 * @author    Martin Angelov
 * @version  1.0
 * @url      http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/
 * @license    MIT License
 */
!
  function (t) {
    function e(t) {
      var e = "";
      "lowerLetter" == t ? e = "abcdefghijklmnopqrstuvwxyz0123456789" : "upperLetter" == t ? e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" : "symbol" == t && (e = ",.?/\\(^)![]{}*&^%$#'\"");
      var a = e.split("");
      return a[Math.floor(Math.random() * a.length)]
    }

    t.fn.shuffleLetters = function (a) {
      var r = t.extend({
          step: 8,
          fps: 25,
          text: "",
          callback: function () {
          }
        },
        a);
      return this.each(function () {
        var a = t(this),
          n = "";
        if (a.data("animated")) return !0;
        a.data("animated", !0),
          n = r.text ? r.text.split("") : a.text().split("");
        for (var i = [], s = [], o = 0; o < n.length; o++) {
          var l = n[o];
          " " != l ? (i[o] = /[a-z]/.test(l) ? "lowerLetter" : /[A-Z]/.test(l) ? "upperLetter" : "symbol", s.push(o)) : i[o] = "space"
        }
        a.html(""),
          function f(t) {
            var o, l = s.length,
              u = n.slice(0);
            if (t > l) return a.data("animated", !1),
              void r.callback(a);
            for (o = Math.max(t, 0); l > o; o++) u[s[o]] = o < t + r.step ? e(i[s[o]]) : "";
            a.text(u.join("")),
              setTimeout(function () {
                  f(t + 1)
                },
                1e3 / r.fps)
          }(-r.step)
      })
    }
  }(jQuery);

