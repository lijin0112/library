//Ñ©»¨
particlesCanvas = function (e) {
  function t() {
    function e() {
      document.querySelector("body");
      o = document.createElement("div"),
        canvas = document.getElementById("canvas__particles"),
        bgColor = canvas.getAttribute("data-bg-color"),
        o.width = innerWidth,
        o.height = innerHeight,
        o.style.position = "absolute",
        o.style.top = 0,
        o.style.bottom = 0,
        o.style.left = 0,
        o.style.right = 0,
        o.style.zIndex = 0,
        o.style.overflow = "hidden",
        o.style.background = bgColor,
        canvas.appendChild(o),
        r = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5e3),
        r.position.z = g,
        s = new THREE.Scene,
        s.add(r),
        l = new THREE.CanvasRenderer,
        l.setSize(window.innerWidth, window.innerHeight),
        o.appendChild(l.domElement),
        c = new THREE.Object3D,
        s.add(c);
      var e = new THREE.Geometry;
      e.dynamic = !0,
        i(e),
        window.onresize = n,
        a()
    }

    function t(e, t) {
      var i = Math.random();
      return i * (t - e) + e
    }

    function i(e) {
      for (var i = 0,
             n = h; n > i; i++) {
        var a = new THREE.Particle(new THREE.ParticleCanvasMaterial({
          color: 16777215,
          opacity: t(.1, .3),
          program: _
        }));
        a.position.x = 3e3 * Math.random() - 1500,
          a.position.y = 3e3 * Math.random() - 1500,
          a.position.z = 3e3 * Math.random() - 1500,
          a.scale.x = a.scale.y = 10,
          d.push({
            originX: a.position.x,
            originY: a.position.y,
            angle: 0,
            speed: v - .15 + Math.random() * v,
            particle: a
          }),
          e.vertices.push(a.position),
          c.add(a)
      }
    }

    function n(e) {
      r.aspect = window.innerWidth / window.innerHeight,
        r.updateProjectionMatrix(),
        l.setSize(window.innerWidth, window.innerHeight)
    }

    function a() {
      requestAnimationFrame(a),
        [].forEach.call(d,
          function (e, t) {
            e.particle.position.x = e.originX + Math.sin(t + e.angle) * m,
              e.particle.position.y = e.originY + Math.cos(t + e.angle) * m,
              e.particle.scale.x = e.particle.scale.y = 1 + 10 * Math.sin(.5 * e.angle),
              e.angle += e.speed
          }),
        p += 1,
        r.position.x = u.lastCameraX + f * Math.sin(p * Math.PI / 360),
        r.position.y = u.lastCameraY + f * Math.sin(p * Math.PI / 360),
        u.lastCameraZ += .08 * (g - u.lastCameraZ),
        r.position.z = u.lastCameraZ + f * Math.cos(p * Math.PI / 360),
        r.lookAt(s.position),
        l.render(s, r)
    }

    var o, s, r, l, c, d = [],
      u = {
        x: 0,
        y: 0,
        lastCameraX: 0,
        lastCameraY: 0,
        lastCameraZ: 500
      },
      p = 0,
      f = 400,
      h = 700,
      v = .1,
      m = 40,
      g = 1e3,
      _ = function (e) {
        e.save(),
          e.beginPath(),
          e.arc(0, 0, 1, 0, 2 * Math.PI),
          e.fill(),
          e.restore()
      };
    window.addEventListener ? window.addEventListener("load", e, !1) : window.onload = e
  }

  e("#canvas__particles").length && t()
}(jQuery);