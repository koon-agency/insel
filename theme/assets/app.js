var Rn = !1, Nn = !1, Ve = [], Pn = -1;
function to(e) {
  no(e);
}
function no(e) {
  Ve.includes(e) || Ve.push(e), ro();
}
function vi(e) {
  let t = Ve.indexOf(e);
  t !== -1 && t > Pn && Ve.splice(t, 1);
}
function ro() {
  !Nn && !Rn && (Rn = !0, queueMicrotask(io));
}
function io() {
  Rn = !1, Nn = !0;
  for (let e = 0; e < Ve.length; e++)
    Ve[e](), Pn = e;
  Ve.length = 0, Pn = -1, Nn = !1;
}
var tt, nt, wt, _i, Mn = !0;
function ao(e) {
  Mn = !1, e(), Mn = !0;
}
function oo(e) {
  tt = e.reactive, wt = e.release, nt = (t) => e.effect(t, { scheduler: (n) => {
    Mn ? to(n) : n();
  } }), _i = e.raw;
}
function Vr(e) {
  nt = e;
}
function so(e) {
  let t = () => {
  };
  return [(r) => {
    let i = nt(r);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((a) => a());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), wt(i));
    }, i;
  }, () => {
    t();
  }];
}
function lt(e, t, n = {}) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: n,
      bubbles: !0,
      // Allows events to pass the shadow DOM barrier.
      composed: !0,
      cancelable: !0
    })
  );
}
function Te(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => Te(i, t));
    return;
  }
  let n = !1;
  if (t(e, () => n = !0), n)
    return;
  let r = e.firstElementChild;
  for (; r; )
    Te(r, t), r = r.nextElementSibling;
}
function ye(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
var kr = !1;
function uo() {
  kr && ye("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), kr = !0, document.body || ye("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), lt(document, "alpine:init"), lt(document, "alpine:initializing"), or(), lo((t) => be(t, Te)), rr((t) => nr(t)), Si((t, n) => {
    fr(t, n).forEach((r) => r());
  });
  let e = (t) => !on(t.parentElement, !0);
  Array.from(document.querySelectorAll(pi().join(","))).filter(e).forEach((t) => {
    be(t);
  }), lt(document, "alpine:initialized");
}
var tr = [], hi = [];
function gi() {
  return tr.map((e) => e());
}
function pi() {
  return tr.concat(hi).map((e) => e());
}
function Ei(e) {
  tr.push(e);
}
function mi(e) {
  hi.push(e);
}
function on(e, t = !1) {
  return sn(e, (n) => {
    if ((t ? pi() : gi()).some((i) => n.matches(i)))
      return !0;
  });
}
function sn(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return sn(e.parentElement, t);
  }
}
function co(e) {
  return gi().some((t) => e.matches(t));
}
var yi = [];
function fo(e) {
  yi.push(e);
}
function be(e, t = Te, n = () => {
}) {
  Oo(() => {
    t(e, (r, i) => {
      n(r, i), yi.forEach((a) => a(r, i)), fr(r, r.attributes).forEach((a) => a()), r._x_ignore && i();
    });
  });
}
function nr(e) {
  Te(e, (t) => {
    Ti(t), vo(t);
  });
}
var bi = [], Ai = [], xi = [];
function lo(e) {
  xi.push(e);
}
function rr(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, Ai.push(t));
}
function Si(e) {
  bi.push(e);
}
function wi(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function Ti(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
    (t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
  });
}
function vo(e) {
  if (e._x_cleanups)
    for (; e._x_cleanups.length; )
      e._x_cleanups.pop()();
}
var ir = new MutationObserver(ur), ar = !1;
function or() {
  ir.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), ar = !0;
}
function Oi() {
  _o(), ir.disconnect(), ar = !1;
}
var dt = [], An = !1;
function _o() {
  dt = dt.concat(ir.takeRecords()), dt.length && !An && (An = !0, queueMicrotask(() => {
    ho(), An = !1;
  }));
}
function ho() {
  ur(dt), dt.length = 0;
}
function Y(e) {
  if (!ar)
    return e();
  Oi();
  let t = e();
  return or(), t;
}
var sr = !1, Jt = [];
function go() {
  sr = !0;
}
function po() {
  sr = !1, ur(Jt), Jt = [];
}
function ur(e) {
  if (sr) {
    Jt = Jt.concat(e);
    return;
  }
  let t = [], n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let a = 0; a < e.length; a++)
    if (!e[a].target._x_ignoreMutationObserver && (e[a].type === "childList" && (e[a].addedNodes.forEach((o) => o.nodeType === 1 && t.push(o)), e[a].removedNodes.forEach((o) => o.nodeType === 1 && n.push(o))), e[a].type === "attributes")) {
      let o = e[a].target, s = e[a].attributeName, u = e[a].oldValue, c = () => {
        r.has(o) || r.set(o, []), r.get(o).push({ name: s, value: o.getAttribute(s) });
      }, f = () => {
        i.has(o) || i.set(o, []), i.get(o).push(s);
      };
      o.hasAttribute(s) && u === null ? c() : o.hasAttribute(s) ? (f(), c()) : f();
    }
  i.forEach((a, o) => {
    Ti(o, a);
  }), r.forEach((a, o) => {
    bi.forEach((s) => s(o, a));
  });
  for (let a of n)
    t.includes(a) || (Ai.forEach((o) => o(a)), nr(a));
  t.forEach((a) => {
    a._x_ignoreSelf = !0, a._x_ignore = !0;
  });
  for (let a of t)
    n.includes(a) || a.isConnected && (delete a._x_ignoreSelf, delete a._x_ignore, xi.forEach((o) => o(a)), a._x_ignore = !0, a._x_ignoreSelf = !0);
  t.forEach((a) => {
    delete a._x_ignoreSelf, delete a._x_ignore;
  }), t = null, n = null, r = null, i = null;
}
function Ii(e) {
  return Ot(Je(e));
}
function Tt(e, t, n) {
  return e._x_dataStack = [t, ...Je(n || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
  };
}
function Je(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? Je(e.host) : e.parentNode ? Je(e.parentNode) : [];
}
function Ot(e) {
  return new Proxy({ objects: e }, Eo);
}
var Eo = {
  ownKeys({ objects: e }) {
    return Array.from(
      new Set(e.flatMap((t) => Object.keys(t)))
    );
  },
  has({ objects: e }, t) {
    return t == Symbol.unscopables ? !1 : e.some(
      (n) => Object.prototype.hasOwnProperty.call(n, t)
    );
  },
  get({ objects: e }, t, n) {
    return t == "toJSON" ? mo : Reflect.get(
      e.find(
        (r) => Object.prototype.hasOwnProperty.call(r, t)
      ) || {},
      t,
      n
    );
  },
  set({ objects: e }, t, n, r) {
    const i = e.find(
      (o) => Object.prototype.hasOwnProperty.call(o, t)
    ) || e[e.length - 1], a = Object.getOwnPropertyDescriptor(i, t);
    return a != null && a.set && (a != null && a.get) ? Reflect.set(i, t, n, r) : Reflect.set(i, t, n);
  }
};
function mo() {
  return Reflect.ownKeys(this).reduce((t, n) => (t[n] = Reflect.get(this, n), t), {});
}
function Ci(e) {
  let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null, n = (r, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([a, { value: o, enumerable: s }]) => {
      if (s === !1 || o === void 0)
        return;
      let u = i === "" ? a : `${i}.${a}`;
      typeof o == "object" && o !== null && o._x_interceptor ? r[a] = o.initialize(e, u, a) : t(o) && o !== r && !(o instanceof Element) && n(o, u);
    });
  };
  return n(e);
}
function Li(e, t = () => {
}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, a) {
      return e(this.initialValue, () => yo(r, i), (o) => Dn(r, i, o), i, a);
    }
  };
  return t(n), (r) => {
    if (typeof r == "object" && r !== null && r._x_interceptor) {
      let i = n.initialize.bind(n);
      n.initialize = (a, o, s) => {
        let u = r.initialize(a, o, s);
        return n.initialValue = u, i(a, o, s);
      };
    } else
      n.initialValue = r;
    return n;
  };
}
function yo(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function Dn(e, t, n) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = n;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), Dn(e[t[0]], t.slice(1), n);
  }
}
var Ri = {};
function fe(e, t) {
  Ri[e] = t;
}
function Fn(e, t) {
  return Object.entries(Ri).forEach(([n, r]) => {
    let i = null;
    function a() {
      if (i)
        return i;
      {
        let [o, s] = $i(t);
        return i = { interceptor: Li, ...o }, rr(t, s), i;
      }
    }
    Object.defineProperty(e, `$${n}`, {
      get() {
        return r(t, a());
      },
      enumerable: !1
    });
  }), e;
}
function bo(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    gt(i, e, t);
  }
}
function gt(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }), console.warn(`Alpine Expression Error: ${e.message}

${n ? 'Expression: "' + n + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var Wt = !0;
function Ni(e) {
  let t = Wt;
  Wt = !1;
  let n = e();
  return Wt = t, n;
}
function ke(e, t, n = {}) {
  let r;
  return ee(e, t)((i) => r = i, n), r;
}
function ee(...e) {
  return Pi(...e);
}
var Pi = Mi;
function Ao(e) {
  Pi = e;
}
function Mi(e, t) {
  let n = {};
  Fn(n, e);
  let r = [n, ...Je(e)], i = typeof t == "function" ? xo(r, t) : wo(r, t, e);
  return bo.bind(null, e, t, i);
}
function xo(e, t) {
  return (n = () => {
  }, { scope: r = {}, params: i = [] } = {}) => {
    let a = t.apply(Ot([r, ...e]), i);
    Zt(n, a);
  };
}
var xn = {};
function So(e, t) {
  if (xn[e])
    return xn[e];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim()) ? `(async()=>{ ${e} })()` : e, a = (() => {
    try {
      let o = new n(
        ["__self", "scope"],
        `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
      );
      return Object.defineProperty(o, "name", {
        value: `[Alpine] ${e}`
      }), o;
    } catch (o) {
      return gt(o, t, e), Promise.resolve();
    }
  })();
  return xn[e] = a, a;
}
function wo(e, t, n) {
  let r = So(t, n);
  return (i = () => {
  }, { scope: a = {}, params: o = [] } = {}) => {
    r.result = void 0, r.finished = !1;
    let s = Ot([a, ...e]);
    if (typeof r == "function") {
      let u = r(r, s).catch((c) => gt(c, n, t));
      r.finished ? (Zt(i, r.result, s, o, n), r.result = void 0) : u.then((c) => {
        Zt(i, c, s, o, n);
      }).catch((c) => gt(c, n, t)).finally(() => r.result = void 0);
    }
  };
}
function Zt(e, t, n, r, i) {
  if (Wt && typeof t == "function") {
    let a = t.apply(n, r);
    a instanceof Promise ? a.then((o) => Zt(e, o, n, r)).catch((o) => gt(o, i, t)) : e(a);
  } else
    typeof t == "object" && t instanceof Promise ? t.then((a) => e(a)) : e(t);
}
var cr = "x-";
function rt(e = "") {
  return cr + e;
}
function To(e) {
  cr = e;
}
var $n = {};
function q(e, t) {
  return $n[e] = t, {
    before(n) {
      if (!$n[n]) {
        console.warn(
          "Cannot find directive `${directive}`. `${name}` will use the default order of execution"
        );
        return;
      }
      const r = $e.indexOf(n);
      $e.splice(r >= 0 ? r : $e.indexOf("DEFAULT"), 0, e);
    }
  };
}
function fr(e, t, n) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let a = Object.entries(e._x_virtualDirectives).map(([s, u]) => ({ name: s, value: u })), o = Di(a);
    a = a.map((s) => o.find((u) => u.name === s.name) ? {
      name: `x-bind:${s.name}`,
      value: `"${s.value}"`
    } : s), t = t.concat(a);
  }
  let r = {};
  return t.map(Bi((a, o) => r[a] = o)).filter(zi).map(Co(r, n)).sort(Lo).map((a) => Io(e, a));
}
function Di(e) {
  return Array.from(e).map(Bi()).filter((t) => !zi(t));
}
var Vn = !1, ft = /* @__PURE__ */ new Map(), Fi = Symbol();
function Oo(e) {
  Vn = !0;
  let t = Symbol();
  Fi = t, ft.set(t, []);
  let n = () => {
    for (; ft.get(t).length; )
      ft.get(t).shift()();
    ft.delete(t);
  }, r = () => {
    Vn = !1, n();
  };
  e(n), r();
}
function $i(e) {
  let t = [], n = (s) => t.push(s), [r, i] = so(e);
  return t.push(i), [{
    Alpine: Ct,
    effect: r,
    cleanup: n,
    evaluateLater: ee.bind(ee, e),
    evaluate: ke.bind(ke, e)
  }, () => t.forEach((s) => s())];
}
function Io(e, t) {
  let n = () => {
  }, r = $n[t.type] || n, [i, a] = $i(e);
  wi(e, t.original, a);
  let o = () => {
    e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, i), r = r.bind(r, e, t, i), Vn ? ft.get(Fi).push(r) : r());
  };
  return o.runCleanups = a, o;
}
var Vi = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }), ki = (e) => e;
function Bi(e = () => {
}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = ji.reduce((a, o) => o(a), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var ji = [];
function lr(e) {
  ji.push(e);
}
function zi({ name: e }) {
  return Ki().test(e);
}
var Ki = () => new RegExp(`^${cr}([^:^.]+)\\b`);
function Co(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(Ki()), a = n.match(/:([a-zA-Z0-9\-_:]+)/), o = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], s = t || e[n] || n;
    return {
      type: i ? i[1] : null,
      value: a ? a[1] : null,
      modifiers: o.map((u) => u.replace(".", "")),
      expression: r,
      original: s
    };
  };
}
var kn = "DEFAULT", $e = [
  "ignore",
  "ref",
  "data",
  "id",
  "anchor",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  kn,
  "teleport"
];
function Lo(e, t) {
  let n = $e.indexOf(e.type) === -1 ? kn : e.type, r = $e.indexOf(t.type) === -1 ? kn : t.type;
  return $e.indexOf(n) - $e.indexOf(r);
}
var Bn = [], dr = !1;
function vr(e = () => {
}) {
  return queueMicrotask(() => {
    dr || setTimeout(() => {
      jn();
    });
  }), new Promise((t) => {
    Bn.push(() => {
      e(), t();
    });
  });
}
function jn() {
  for (dr = !1; Bn.length; )
    Bn.shift()();
}
function Ro() {
  dr = !0;
}
function _r(e, t) {
  return Array.isArray(t) ? Br(e, t.join(" ")) : typeof t == "object" && t !== null ? No(e, t) : typeof t == "function" ? _r(e, t()) : Br(e, t);
}
function Br(e, t) {
  let n = (i) => i.split(" ").filter((a) => !e.classList.contains(a)).filter(Boolean), r = (i) => (e.classList.add(...i), () => {
    e.classList.remove(...i);
  });
  return t = t === !0 ? t = "" : t || "", r(n(t));
}
function No(e, t) {
  let n = (s) => s.split(" ").filter(Boolean), r = Object.entries(t).flatMap(([s, u]) => u ? n(s) : !1).filter(Boolean), i = Object.entries(t).flatMap(([s, u]) => u ? !1 : n(s)).filter(Boolean), a = [], o = [];
  return i.forEach((s) => {
    e.classList.contains(s) && (e.classList.remove(s), o.push(s));
  }), r.forEach((s) => {
    e.classList.contains(s) || (e.classList.add(s), a.push(s));
  }), () => {
    o.forEach((s) => e.classList.add(s)), a.forEach((s) => e.classList.remove(s));
  };
}
function un(e, t) {
  return typeof t == "object" && t !== null ? Po(e, t) : Mo(e, t);
}
function Po(e, t) {
  let n = {};
  return Object.entries(t).forEach(([r, i]) => {
    n[r] = e.style[r], r.startsWith("--") || (r = Do(r)), e.style.setProperty(r, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    un(e, n);
  };
}
function Mo(e, t) {
  let n = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", n || "");
  };
}
function Do(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function zn(e, t = () => {
}) {
  let n = !1;
  return function() {
    n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments));
  };
}
q("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r !== !1 && (!r || typeof r == "boolean" ? $o(e, n, t) : Fo(e, r, t));
});
function Fo(e, t, n) {
  Ui(e, _r, ""), {
    enter: (i) => {
      e._x_transition.enter.during = i;
    },
    "enter-start": (i) => {
      e._x_transition.enter.start = i;
    },
    "enter-end": (i) => {
      e._x_transition.enter.end = i;
    },
    leave: (i) => {
      e._x_transition.leave.during = i;
    },
    "leave-start": (i) => {
      e._x_transition.leave.start = i;
    },
    "leave-end": (i) => {
      e._x_transition.leave.end = i;
    }
  }[n](t);
}
function $o(e, t, n) {
  Ui(e, un);
  let r = !t.includes("in") && !t.includes("out") && !n, i = r || t.includes("in") || ["enter"].includes(n), a = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((p, E) => E < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((p, E) => E > t.indexOf("out")));
  let o = !t.includes("opacity") && !t.includes("scale"), s = o || t.includes("opacity"), u = o || t.includes("scale"), c = s ? 0 : 1, f = u ? ut(t, "scale", 95) / 100 : 1, _ = ut(t, "delay", 0) / 1e3, l = ut(t, "origin", "center"), g = "opacity, transform", v = ut(t, "duration", 150) / 1e3, h = ut(t, "duration", 75) / 1e3, d = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = {
    transformOrigin: l,
    transitionDelay: `${_}s`,
    transitionProperty: g,
    transitionDuration: `${v}s`,
    transitionTimingFunction: d
  }, e._x_transition.enter.start = {
    opacity: c,
    transform: `scale(${f})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), a && (e._x_transition.leave.during = {
    transformOrigin: l,
    transitionDelay: `${_}s`,
    transitionProperty: g,
    transitionDuration: `${h}s`,
    transitionTimingFunction: d
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: c,
    transform: `scale(${f})`
  });
}
function Ui(e, t, n = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: n, start: n, end: n },
    leave: { during: n, start: n, end: n },
    in(r = () => {
    }, i = () => {
    }) {
      Kn(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, r, i);
    },
    out(r = () => {
    }, i = () => {
    }) {
      Kn(e, t, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, r, i);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, n, r) {
  const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let a = () => i(n);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(n) : a() : e._x_transition ? e._x_transition.in(n) : a();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((o, s) => {
    e._x_transition.out(() => {
    }, () => o(r)), e._x_transitioning && e._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(r), queueMicrotask(() => {
    let o = Wi(e);
    o ? (o._x_hideChildren || (o._x_hideChildren = []), o._x_hideChildren.push(e)) : i(() => {
      let s = (u) => {
        let c = Promise.all([
          u._x_hidePromise,
          ...(u._x_hideChildren || []).map(s)
        ]).then(([f]) => f());
        return delete u._x_hidePromise, delete u._x_hideChildren, c;
      };
      s(e).catch((u) => {
        if (!u.isFromCancelledTransition)
          throw u;
      });
    });
  });
};
function Wi(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : Wi(t);
}
function Kn(e, t, { during: n, start: r, end: i } = {}, a = () => {
}, o = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0) {
    a(), o();
    return;
  }
  let s, u, c;
  Vo(e, {
    start() {
      s = t(e, r);
    },
    during() {
      u = t(e, n);
    },
    before: a,
    end() {
      s(), c = t(e, i);
    },
    after: o,
    cleanup() {
      u(), c();
    }
  });
}
function Vo(e, t) {
  let n, r, i, a = zn(() => {
    Y(() => {
      n = !0, r || t.before(), i || (t.end(), jn()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(o) {
      this.beforeCancels.push(o);
    },
    cancel: zn(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      a();
    }),
    finish: a
  }, Y(() => {
    t.start(), t.during();
  }), Ro(), requestAnimationFrame(() => {
    if (n)
      return;
    let o = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, s = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    o === 0 && (o = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), Y(() => {
      t.before();
    }), r = !0, requestAnimationFrame(() => {
      n || (Y(() => {
        t.end();
      }), jn(), setTimeout(e._x_transitioning.finish, o + s), i = !0);
    });
  });
}
function ut(e, t, n) {
  if (e.indexOf(t) === -1)
    return n;
  const r = e[e.indexOf(t) + 1];
  if (!r || t === "scale" && isNaN(r))
    return n;
  if (t === "duration" || t === "delay") {
    let i = r.match(/([0-9]+)ms/);
    if (i)
      return i[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [r, e[e.indexOf(t) + 2]].join(" ") : r;
}
var Oe = !1;
function It(e, t = () => {
}) {
  return (...n) => Oe ? t(...n) : e(...n);
}
function ko(e) {
  return (...t) => Oe && e(...t);
}
var Hi = [];
function Gi(e) {
  Hi.push(e);
}
function Bo(e, t) {
  Hi.forEach((n) => n(e, t)), Oe = !0, qi(() => {
    be(t, (n, r) => {
      r(n, () => {
      });
    });
  }), Oe = !1;
}
var Un = !1;
function jo(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), Oe = !0, Un = !0, qi(() => {
    zo(t);
  }), Oe = !1, Un = !1;
}
function zo(e) {
  let t = !1;
  be(e, (r, i) => {
    Te(r, (a, o) => {
      if (t && co(a))
        return o();
      t = !0, i(a, o);
    });
  });
}
function qi(e) {
  let t = nt;
  Vr((n, r) => {
    let i = t(n);
    return wt(i), () => {
    };
  }), e(), Vr(t);
}
function Yi(e, t, n, r = []) {
  switch (e._x_bindings || (e._x_bindings = tt({})), e._x_bindings[t] = n, t = r.includes("camel") ? Xo(t) : t, t) {
    case "value":
      Ko(e, n);
      break;
    case "style":
      Wo(e, n);
      break;
    case "class":
      Uo(e, n);
      break;
    case "selected":
    case "checked":
      Ho(e, t, n);
      break;
    default:
      Xi(e, t, n);
      break;
  }
}
function Ko(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (typeof t == "boolean" ? e.checked = Ht(e.value) === t : e.checked = jr(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => jr(n, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    Yo(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t === void 0 ? "" : t;
  }
}
function Uo(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = _r(e, t);
}
function Wo(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = un(e, t);
}
function Ho(e, t, n) {
  Xi(e, t, n), qo(e, t, n);
}
function Xi(e, t, n) {
  [null, void 0, !1].includes(n) && Jo(t) ? e.removeAttribute(t) : (Ji(t) && (n = t), Go(e, t, n));
}
function Go(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function qo(e, t, n) {
  e[t] !== n && (e[t] = n);
}
function Yo(e, t) {
  const n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function Xo(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function jr(e, t) {
  return e == t;
}
function Ht(e) {
  return [1, "1", "true", "on", "yes", !0].includes(e) ? !0 : [0, "0", "false", "off", "no", !1].includes(e) ? !1 : e ? !!e : null;
}
function Ji(e) {
  return [
    "disabled",
    "checked",
    "required",
    "readonly",
    "hidden",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ].includes(e);
}
function Jo(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function Zo(e, t, n) {
  return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : Zi(e, t, n);
}
function Qo(e, t, n, r = !0) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
    let i = e._x_inlineBindings[t];
    return i.extract = r, Ni(() => ke(e, i.expression));
  }
  return Zi(e, t, n);
}
function Zi(e, t, n) {
  let r = e.getAttribute(t);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : Ji(t) ? !![t, "true"].includes(r) : r;
}
function Qi(e, t) {
  var n;
  return function() {
    var r = this, i = arguments, a = function() {
      n = null, e.apply(r, i);
    };
    clearTimeout(n), n = setTimeout(a, t);
  };
}
function ea(e, t) {
  let n;
  return function() {
    let r = this, i = arguments;
    n || (e.apply(r, i), n = !0, setTimeout(() => n = !1, t));
  };
}
function ta({ get: e, set: t }, { get: n, set: r }) {
  let i = !0, a, o = nt(() => {
    const s = e(), u = n();
    if (i)
      r(Sn(s)), i = !1, a = JSON.stringify(s);
    else {
      const c = JSON.stringify(s);
      c !== a ? (r(Sn(s)), a = c) : (t(Sn(u)), a = JSON.stringify(u));
    }
    JSON.stringify(n()), JSON.stringify(e());
  });
  return () => {
    wt(o);
  };
}
function Sn(e) {
  return typeof e == "object" ? JSON.parse(JSON.stringify(e)) : e;
}
function es(e) {
  (Array.isArray(e) ? e : [e]).forEach((n) => n(Ct));
}
var Fe = {}, zr = !1;
function ts(e, t) {
  if (zr || (Fe = tt(Fe), zr = !0), t === void 0)
    return Fe[e];
  Fe[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && Fe[e].init(), Ci(Fe[e]);
}
function ns() {
  return Fe;
}
var na = {};
function rs(e, t) {
  let n = typeof t != "function" ? () => t : t;
  return e instanceof Element ? ra(e, n()) : (na[e] = n, () => {
  });
}
function is(e) {
  return Object.entries(na).forEach(([t, n]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...r) => n(...r);
      }
    });
  }), e;
}
function ra(e, t, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let i = Object.entries(t).map(([o, s]) => ({ name: o, value: s })), a = Di(i);
  return i = i.map((o) => a.find((s) => s.name === o.name) ? {
    name: `x-bind:${o.name}`,
    value: `"${o.value}"`
  } : o), fr(e, i, n).map((o) => {
    r.push(o.runCleanups), o();
  }), () => {
    for (; r.length; )
      r.pop()();
  };
}
var ia = {};
function as(e, t) {
  ia[e] = t;
}
function os(e, t) {
  return Object.entries(ia).forEach(([n, r]) => {
    Object.defineProperty(e, n, {
      get() {
        return (...i) => r.bind(t)(...i);
      },
      enumerable: !1
    });
  }), e;
}
var ss = {
  get reactive() {
    return tt;
  },
  get release() {
    return wt;
  },
  get effect() {
    return nt;
  },
  get raw() {
    return _i;
  },
  version: "3.13.3",
  flushAndStopDeferringMutations: po,
  dontAutoEvaluateFunctions: Ni,
  disableEffectScheduling: ao,
  startObservingMutations: or,
  stopObservingMutations: Oi,
  setReactivityEngine: oo,
  onAttributeRemoved: wi,
  onAttributesAdded: Si,
  closestDataStack: Je,
  skipDuringClone: It,
  onlyDuringClone: ko,
  addRootSelector: Ei,
  addInitSelector: mi,
  interceptClone: Gi,
  addScopeToNode: Tt,
  deferMutations: go,
  mapAttributes: lr,
  evaluateLater: ee,
  interceptInit: fo,
  setEvaluator: Ao,
  mergeProxies: Ot,
  extractProp: Qo,
  findClosest: sn,
  onElRemoved: rr,
  closestRoot: on,
  destroyTree: nr,
  interceptor: Li,
  // INTERNAL: not public API and is subject to change without major release.
  transition: Kn,
  // INTERNAL
  setStyles: un,
  // INTERNAL
  mutateDom: Y,
  directive: q,
  entangle: ta,
  throttle: ea,
  debounce: Qi,
  evaluate: ke,
  initTree: be,
  nextTick: vr,
  prefixed: rt,
  prefix: To,
  plugin: es,
  magic: fe,
  store: ts,
  start: uo,
  clone: jo,
  // INTERNAL
  cloneNode: Bo,
  // INTERNAL
  bound: Zo,
  $data: Ii,
  walk: Te,
  data: as,
  bind: rs
}, Ct = ss;
function us(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var cs = Object.freeze({}), fs = Object.prototype.hasOwnProperty, cn = (e, t) => fs.call(e, t), Be = Array.isArray, vt = (e) => aa(e) === "[object Map]", ls = (e) => typeof e == "string", hr = (e) => typeof e == "symbol", fn = (e) => e !== null && typeof e == "object", ds = Object.prototype.toString, aa = (e) => ds.call(e), oa = (e) => aa(e).slice(8, -1), gr = (e) => ls(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, vs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, _s = vs((e) => e.charAt(0).toUpperCase() + e.slice(1)), sa = (e, t) => e !== t && (e === e || t === t), Wn = /* @__PURE__ */ new WeakMap(), ct = [], de, je = Symbol("iterate"), Hn = Symbol("Map key iterate");
function hs(e) {
  return e && e._isEffect === !0;
}
function gs(e, t = cs) {
  hs(e) && (e = e.raw);
  const n = ms(e, t);
  return t.lazy || n(), n;
}
function ps(e) {
  e.active && (ua(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var Es = 0;
function ms(e, t) {
  const n = function() {
    if (!n.active)
      return e();
    if (!ct.includes(n)) {
      ua(n);
      try {
        return bs(), ct.push(n), de = n, e();
      } finally {
        ct.pop(), ca(), de = ct[ct.length - 1];
      }
    }
  };
  return n.id = Es++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n;
}
function ua(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
var Ze = !0, pr = [];
function ys() {
  pr.push(Ze), Ze = !1;
}
function bs() {
  pr.push(Ze), Ze = !0;
}
function ca() {
  const e = pr.pop();
  Ze = e === void 0 ? !0 : e;
}
function ce(e, t, n) {
  if (!Ze || de === void 0)
    return;
  let r = Wn.get(e);
  r || Wn.set(e, r = /* @__PURE__ */ new Map());
  let i = r.get(n);
  i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(de) || (i.add(de), de.deps.push(i), de.options.onTrack && de.options.onTrack({
    effect: de,
    target: e,
    type: t,
    key: n
  }));
}
function Ie(e, t, n, r, i, a) {
  const o = Wn.get(e);
  if (!o)
    return;
  const s = /* @__PURE__ */ new Set(), u = (f) => {
    f && f.forEach((_) => {
      (_ !== de || _.allowRecurse) && s.add(_);
    });
  };
  if (t === "clear")
    o.forEach(u);
  else if (n === "length" && Be(e))
    o.forEach((f, _) => {
      (_ === "length" || _ >= r) && u(f);
    });
  else
    switch (n !== void 0 && u(o.get(n)), t) {
      case "add":
        Be(e) ? gr(n) && u(o.get("length")) : (u(o.get(je)), vt(e) && u(o.get(Hn)));
        break;
      case "delete":
        Be(e) || (u(o.get(je)), vt(e) && u(o.get(Hn)));
        break;
      case "set":
        vt(e) && u(o.get(je));
        break;
    }
  const c = (f) => {
    f.options.onTrigger && f.options.onTrigger({
      effect: f,
      target: e,
      key: n,
      type: t,
      newValue: r,
      oldValue: i,
      oldTarget: a
    }), f.options.scheduler ? f.options.scheduler(f) : f();
  };
  s.forEach(c);
}
var As = /* @__PURE__ */ us("__proto__,__v_isRef,__isVue"), fa = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(hr)), xs = /* @__PURE__ */ la(), Ss = /* @__PURE__ */ la(!0), Kr = /* @__PURE__ */ ws();
function ws() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = z(this);
      for (let a = 0, o = this.length; a < o; a++)
        ce(r, "get", a + "");
      const i = r[t](...n);
      return i === -1 || i === !1 ? r[t](...n.map(z)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ys();
      const r = z(this)[t].apply(this, n);
      return ca(), r;
    };
  }), e;
}
function la(e = !1, t = !1) {
  return function(r, i, a) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && a === (e ? t ? js : ha : t ? Bs : _a).get(r))
      return r;
    const o = Be(r);
    if (!e && o && cn(Kr, i))
      return Reflect.get(Kr, i, a);
    const s = Reflect.get(r, i, a);
    return (hr(i) ? fa.has(i) : As(i)) || (e || ce(r, "get", i), t) ? s : Gn(s) ? !o || !gr(i) ? s.value : s : fn(s) ? e ? ga(s) : br(s) : s;
  };
}
var Ts = /* @__PURE__ */ Os();
function Os(e = !1) {
  return function(n, r, i, a) {
    let o = n[r];
    if (!e && (i = z(i), o = z(o), !Be(n) && Gn(o) && !Gn(i)))
      return o.value = i, !0;
    const s = Be(n) && gr(r) ? Number(r) < n.length : cn(n, r), u = Reflect.set(n, r, i, a);
    return n === z(a) && (s ? sa(i, o) && Ie(n, "set", r, i, o) : Ie(n, "add", r, i)), u;
  };
}
function Is(e, t) {
  const n = cn(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
  return i && n && Ie(e, "delete", t, void 0, r), i;
}
function Cs(e, t) {
  const n = Reflect.has(e, t);
  return (!hr(t) || !fa.has(t)) && ce(e, "has", t), n;
}
function Ls(e) {
  return ce(e, "iterate", Be(e) ? "length" : je), Reflect.ownKeys(e);
}
var Rs = {
  get: xs,
  set: Ts,
  deleteProperty: Is,
  has: Cs,
  ownKeys: Ls
}, Ns = {
  get: Ss,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Er = (e) => fn(e) ? br(e) : e, mr = (e) => fn(e) ? ga(e) : e, yr = (e) => e, ln = (e) => Reflect.getPrototypeOf(e);
function kt(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = z(e), a = z(t);
  t !== a && !n && ce(i, "get", t), !n && ce(i, "get", a);
  const { has: o } = ln(i), s = r ? yr : n ? mr : Er;
  if (o.call(i, t))
    return s(e.get(t));
  if (o.call(i, a))
    return s(e.get(a));
  e !== i && e.get(t);
}
function Bt(e, t = !1) {
  const n = this.__v_raw, r = z(n), i = z(e);
  return e !== i && !t && ce(r, "has", e), !t && ce(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function jt(e, t = !1) {
  return e = e.__v_raw, !t && ce(z(e), "iterate", je), Reflect.get(e, "size", e);
}
function Ur(e) {
  e = z(e);
  const t = z(this);
  return ln(t).has.call(t, e) || (t.add(e), Ie(t, "add", e, e)), this;
}
function Wr(e, t) {
  t = z(t);
  const n = z(this), { has: r, get: i } = ln(n);
  let a = r.call(n, e);
  a ? va(n, r, e) : (e = z(e), a = r.call(n, e));
  const o = i.call(n, e);
  return n.set(e, t), a ? sa(t, o) && Ie(n, "set", e, t, o) : Ie(n, "add", e, t), this;
}
function Hr(e) {
  const t = z(this), { has: n, get: r } = ln(t);
  let i = n.call(t, e);
  i ? va(t, n, e) : (e = z(e), i = n.call(t, e));
  const a = r ? r.call(t, e) : void 0, o = t.delete(e);
  return i && Ie(t, "delete", e, void 0, a), o;
}
function Gr() {
  const e = z(this), t = e.size !== 0, n = vt(e) ? new Map(e) : new Set(e), r = e.clear();
  return t && Ie(e, "clear", void 0, void 0, n), r;
}
function zt(e, t) {
  return function(r, i) {
    const a = this, o = a.__v_raw, s = z(o), u = t ? yr : e ? mr : Er;
    return !e && ce(s, "iterate", je), o.forEach((c, f) => r.call(i, u(c), u(f), a));
  };
}
function Kt(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, a = z(i), o = vt(a), s = e === "entries" || e === Symbol.iterator && o, u = e === "keys" && o, c = i[e](...r), f = n ? yr : t ? mr : Er;
    return !t && ce(a, "iterate", u ? Hn : je), {
      // iterator protocol
      next() {
        const { value: _, done: l } = c.next();
        return l ? { value: _, done: l } : {
          value: s ? [f(_[0]), f(_[1])] : f(_),
          done: l
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Se(e) {
  return function(...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${_s(e)} operation ${n}failed: target is readonly.`, z(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function Ps() {
  const e = {
    get(a) {
      return kt(this, a);
    },
    get size() {
      return jt(this);
    },
    has: Bt,
    add: Ur,
    set: Wr,
    delete: Hr,
    clear: Gr,
    forEach: zt(!1, !1)
  }, t = {
    get(a) {
      return kt(this, a, !1, !0);
    },
    get size() {
      return jt(this);
    },
    has: Bt,
    add: Ur,
    set: Wr,
    delete: Hr,
    clear: Gr,
    forEach: zt(!1, !0)
  }, n = {
    get(a) {
      return kt(this, a, !0);
    },
    get size() {
      return jt(this, !0);
    },
    has(a) {
      return Bt.call(this, a, !0);
    },
    add: Se(
      "add"
      /* ADD */
    ),
    set: Se(
      "set"
      /* SET */
    ),
    delete: Se(
      "delete"
      /* DELETE */
    ),
    clear: Se(
      "clear"
      /* CLEAR */
    ),
    forEach: zt(!0, !1)
  }, r = {
    get(a) {
      return kt(this, a, !0, !0);
    },
    get size() {
      return jt(this, !0);
    },
    has(a) {
      return Bt.call(this, a, !0);
    },
    add: Se(
      "add"
      /* ADD */
    ),
    set: Se(
      "set"
      /* SET */
    ),
    delete: Se(
      "delete"
      /* DELETE */
    ),
    clear: Se(
      "clear"
      /* CLEAR */
    ),
    forEach: zt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((a) => {
    e[a] = Kt(a, !1, !1), n[a] = Kt(a, !0, !1), t[a] = Kt(a, !1, !0), r[a] = Kt(a, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
var [Ms, Ds, Fs, $s] = /* @__PURE__ */ Ps();
function da(e, t) {
  const n = t ? e ? $s : Fs : e ? Ds : Ms;
  return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(cn(n, i) && i in r ? n : r, i, a);
}
var Vs = {
  get: /* @__PURE__ */ da(!1, !1)
}, ks = {
  get: /* @__PURE__ */ da(!0, !1)
};
function va(e, t, n) {
  const r = z(n);
  if (r !== n && t.call(e, r)) {
    const i = oa(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var _a = /* @__PURE__ */ new WeakMap(), Bs = /* @__PURE__ */ new WeakMap(), ha = /* @__PURE__ */ new WeakMap(), js = /* @__PURE__ */ new WeakMap();
function zs(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ks(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : zs(oa(e));
}
function br(e) {
  return e && e.__v_isReadonly ? e : pa(e, !1, Rs, Vs, _a);
}
function ga(e) {
  return pa(e, !0, Ns, ks, ha);
}
function pa(e, t, n, r, i) {
  if (!fn(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const a = i.get(e);
  if (a)
    return a;
  const o = Ks(e);
  if (o === 0)
    return e;
  const s = new Proxy(e, o === 2 ? r : n);
  return i.set(e, s), s;
}
function z(e) {
  return e && z(e.__v_raw) || e;
}
function Gn(e) {
  return !!(e && e.__v_isRef === !0);
}
fe("nextTick", () => vr);
fe("dispatch", (e) => lt.bind(lt, e));
fe("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let a = t(r), o = !0, s, u = n(() => a((c) => {
    JSON.stringify(c), o ? s = c : queueMicrotask(() => {
      i(c, s), s = c;
    }), o = !1;
  }));
  e._x_effects.delete(u);
});
fe("store", ns);
fe("data", (e) => Ii(e));
fe("root", (e) => on(e));
fe("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = Ot(Us(e))), e._x_refs_proxy));
function Us(e) {
  let t = [], n = e;
  for (; n; )
    n._x_refs && t.push(n._x_refs), n = n.parentNode;
  return t;
}
var wn = {};
function Ea(e) {
  return wn[e] || (wn[e] = 0), ++wn[e];
}
function Ws(e, t) {
  return sn(e, (n) => {
    if (n._x_ids && n._x_ids[t])
      return !0;
  });
}
function Hs(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Ea(t));
}
fe("id", (e) => (t, n = null) => {
  let r = Ws(e, t), i = r ? r._x_ids[t] : Ea(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
fe("el", (e) => e);
ma("Focus", "focus", "focus");
ma("Persist", "persist", "persist");
function ma(e, t, n) {
  fe(t, (r) => ye(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
q("modelable", (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
  let a = r(t), o = () => {
    let f;
    return a((_) => f = _), f;
  }, s = r(`${t} = __placeholder`), u = (f) => s(() => {
  }, { scope: { __placeholder: f } }), c = o();
  u(c), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let f = e._x_model.get, _ = e._x_model.set, l = ta(
      {
        get() {
          return f();
        },
        set(g) {
          _(g);
        }
      },
      {
        get() {
          return o();
        },
        set(g) {
          u(g);
        }
      }
    );
    i(l);
  });
});
q("teleport", (e, { modifiers: t, expression: n }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && ye("x-teleport can only be used on a <template> tag", e);
  let i = qr(n), a = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = a, a._x_teleportBack = e, e.setAttribute("data-teleport-template", !0), a.setAttribute("data-teleport-target", !0), e._x_forwardEvents && e._x_forwardEvents.forEach((s) => {
    a.addEventListener(s, (u) => {
      u.stopPropagation(), e.dispatchEvent(new u.constructor(u.type, u));
    });
  }), Tt(a, {}, e);
  let o = (s, u, c) => {
    c.includes("prepend") ? u.parentNode.insertBefore(s, u) : c.includes("append") ? u.parentNode.insertBefore(s, u.nextSibling) : u.appendChild(s);
  };
  Y(() => {
    o(a, i, t), be(a), a._x_ignore = !0;
  }), e._x_teleportPutBack = () => {
    let s = qr(n);
    Y(() => {
      o(e._x_teleport, s, t);
    });
  }, r(() => a.remove());
});
var Gs = document.createElement("div");
function qr(e) {
  let t = It(() => document.querySelector(e), () => Gs)();
  return t || ye(`Cannot find x-teleport element for selector: "${e}"`), t;
}
var ya = () => {
};
ya.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, n(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
q("ignore", ya);
q("effect", It((e, { expression: t }, { effect: n }) => {
  n(ee(e, t));
}));
function qn(e, t, n, r) {
  let i = e, a = (u) => r(u), o = {}, s = (u, c) => (f) => c(u, f);
  if (n.includes("dot") && (t = qs(t)), n.includes("camel") && (t = Ys(t)), n.includes("passive") && (o.passive = !0), n.includes("capture") && (o.capture = !0), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("debounce")) {
    let u = n[n.indexOf("debounce") + 1] || "invalid-wait", c = Qt(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    a = Qi(a, c);
  }
  if (n.includes("throttle")) {
    let u = n[n.indexOf("throttle") + 1] || "invalid-wait", c = Qt(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    a = ea(a, c);
  }
  return n.includes("prevent") && (a = s(a, (u, c) => {
    c.preventDefault(), u(c);
  })), n.includes("stop") && (a = s(a, (u, c) => {
    c.stopPropagation(), u(c);
  })), n.includes("self") && (a = s(a, (u, c) => {
    c.target === e && u(c);
  })), (n.includes("away") || n.includes("outside")) && (i = document, a = s(a, (u, c) => {
    e.contains(c.target) || c.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && u(c));
  })), n.includes("once") && (a = s(a, (u, c) => {
    u(c), i.removeEventListener(t, a, o);
  })), a = s(a, (u, c) => {
    Js(t) && Zs(c, n) || u(c);
  }), i.addEventListener(t, a, o), () => {
    i.removeEventListener(t, a, o);
  };
}
function qs(e) {
  return e.replace(/-/g, ".");
}
function Ys(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Qt(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Xs(e) {
  return [" ", "_"].includes(
    e
  ) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function Js(e) {
  return ["keydown", "keyup"].includes(e);
}
function Zs(e, t) {
  let n = t.filter((a) => !["window", "document", "prevent", "stop", "once", "capture"].includes(a));
  if (n.includes("debounce")) {
    let a = n.indexOf("debounce");
    n.splice(a, Qt((n[a + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.includes("throttle")) {
    let a = n.indexOf("throttle");
    n.splice(a, Qt((n[a + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && Yr(e.key).includes(n[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((a) => n.includes(a));
  return n = n.filter((a) => !i.includes(a)), !(i.length > 0 && i.filter((o) => ((o === "cmd" || o === "super") && (o = "meta"), e[`${o}Key`])).length === i.length && Yr(e.key).includes(n[0]));
}
function Yr(e) {
  if (!e)
    return [];
  e = Xs(e);
  let t = {
    ctrl: "control",
    slash: "/",
    space: " ",
    spacebar: " ",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    equal: "=",
    minus: "-",
    underscore: "_"
  };
  return t[e] = e, Object.keys(t).map((n) => {
    if (t[n] === e)
      return n;
  }).filter((n) => n);
}
q("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let a = e;
  t.includes("parent") && (a = e.parentNode);
  let o = ee(a, n), s;
  typeof n == "string" ? s = ee(a, `${n} = __placeholder`) : typeof n == "function" && typeof n() == "string" ? s = ee(a, `${n()} = __placeholder`) : s = () => {
  };
  let u = () => {
    let l;
    return o((g) => l = g), Xr(l) ? l.get() : l;
  }, c = (l) => {
    let g;
    o((v) => g = v), Xr(g) ? g.set(l) : s(() => {
    }, {
      scope: { __placeholder: l }
    });
  };
  typeof n == "string" && e.type === "radio" && Y(() => {
    e.hasAttribute("name") || e.setAttribute("name", n);
  });
  var f = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let _ = Oe ? () => {
  } : qn(e, f, t, (l) => {
    c(Qs(e, t, l, u()));
  });
  if (t.includes("fill") && ([null, ""].includes(u()) || e.type === "checkbox" && Array.isArray(u())) && e.dispatchEvent(new Event(f, {})), e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = _, i(() => e._x_removeModelListeners.default()), e.form) {
    let l = qn(e.form, "reset", [], (g) => {
      vr(() => e._x_model && e._x_model.set(e.value));
    });
    i(() => l());
  }
  e._x_model = {
    get() {
      return u();
    },
    set(l) {
      c(l);
    }
  }, e._x_forceModelUpdate = (l) => {
    l === void 0 && typeof n == "string" && n.match(/\./) && (l = ""), window.fromModel = !0, Y(() => Yi(e, "value", l)), delete window.fromModel;
  }, r(() => {
    let l = u();
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(l);
  });
});
function Qs(e, t, n, r) {
  return Y(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail !== null && n.detail !== void 0 ? n.detail : n.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(r)) {
        let i = null;
        return t.includes("number") ? i = Tn(n.target.value) : t.includes("boolean") ? i = Ht(n.target.value) : i = n.target.value, n.target.checked ? r.concat([i]) : r.filter((a) => !eu(a, i));
      } else
        return n.target.checked;
    else
      return e.tagName.toLowerCase() === "select" && e.multiple ? t.includes("number") ? Array.from(n.target.selectedOptions).map((i) => {
        let a = i.value || i.text;
        return Tn(a);
      }) : t.includes("boolean") ? Array.from(n.target.selectedOptions).map((i) => {
        let a = i.value || i.text;
        return Ht(a);
      }) : Array.from(n.target.selectedOptions).map((i) => i.value || i.text) : t.includes("number") ? Tn(n.target.value) : t.includes("boolean") ? Ht(n.target.value) : t.includes("trim") ? n.target.value.trim() : n.target.value;
  });
}
function Tn(e) {
  let t = e ? parseFloat(e) : null;
  return tu(t) ? t : e;
}
function eu(e, t) {
  return e == t;
}
function tu(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Xr(e) {
  return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function";
}
q("cloak", (e) => queueMicrotask(() => Y(() => e.removeAttribute(rt("cloak")))));
mi(() => `[${rt("init")}]`);
q("init", It((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)));
q("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((a) => {
      Y(() => {
        e.textContent = a;
      });
    });
  });
});
q("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((a) => {
      Y(() => {
        e.innerHTML = a, e._x_ignoreSelf = !0, be(e), delete e._x_ignoreSelf;
      });
    });
  });
});
lr(Vi(":", ki(rt("bind:"))));
var ba = (e, { value: t, modifiers: n, expression: r, original: i }, { effect: a }) => {
  if (!t) {
    let s = {};
    is(s), ee(e, r)((c) => {
      ra(e, c, i);
    }, { scope: s });
    return;
  }
  if (t === "key")
    return nu(e, r);
  if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract)
    return;
  let o = ee(e, r);
  a(() => o((s) => {
    s === void 0 && typeof r == "string" && r.match(/\./) && (s = ""), Y(() => Yi(e, t, s, n));
  }));
};
ba.inline = (e, { value: t, modifiers: n, expression: r }) => {
  t && (e._x_inlineBindings || (e._x_inlineBindings = {}), e._x_inlineBindings[t] = { expression: r, extract: !1 });
};
q("bind", ba);
function nu(e, t) {
  e._x_keyExpression = t;
}
Ei(() => `[${rt("data")}]`);
q("data", (e, { expression: t }, { cleanup: n }) => {
  if (ru(e))
    return;
  t = t === "" ? "{}" : t;
  let r = {};
  Fn(r, e);
  let i = {};
  os(i, r);
  let a = ke(e, t, { scope: i });
  (a === void 0 || a === !0) && (a = {}), Fn(a, e);
  let o = tt(a);
  Ci(o);
  let s = Tt(e, o);
  o.init && ke(e, o.init), n(() => {
    o.destroy && ke(e, o.destroy), s();
  });
});
Gi((e, t) => {
  e._x_dataStack && (t._x_dataStack = e._x_dataStack, t.setAttribute("data-has-alpine-state", !0));
});
function ru(e) {
  return Oe ? Un ? !0 : e.hasAttribute("data-has-alpine-state") : !1;
}
q("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = ee(e, n);
  e._x_doHide || (e._x_doHide = () => {
    Y(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    Y(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let a = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, o = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, s = () => setTimeout(o), u = zn(
    (_) => _ ? o() : a(),
    (_) => {
      typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, _, o, a) : _ ? s() : a();
    }
  ), c, f = !0;
  r(() => i((_) => {
    !f && _ === c || (t.includes("immediate") && (_ ? s() : a()), u(_), c = _, f = !1);
  }));
});
q("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = au(t), a = ee(e, i.items), o = ee(
    e,
    // the x-bind:key expression is stored for our use instead of evaluated.
    e._x_keyExpression || "index"
  );
  e._x_prevKeys = [], e._x_lookup = {}, n(() => iu(e, i, a, o)), r(() => {
    Object.values(e._x_lookup).forEach((s) => s.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function iu(e, t, n, r) {
  let i = (o) => typeof o == "object" && !Array.isArray(o), a = e;
  n((o) => {
    ou(o) && o >= 0 && (o = Array.from(Array(o).keys(), (d) => d + 1)), o === void 0 && (o = []);
    let s = e._x_lookup, u = e._x_prevKeys, c = [], f = [];
    if (i(o))
      o = Object.entries(o).map(([d, p]) => {
        let E = Jr(t, p, d, o);
        r((m) => f.push(m), { scope: { index: d, ...E } }), c.push(E);
      });
    else
      for (let d = 0; d < o.length; d++) {
        let p = Jr(t, o[d], d, o);
        r((E) => f.push(E), { scope: { index: d, ...p } }), c.push(p);
      }
    let _ = [], l = [], g = [], v = [];
    for (let d = 0; d < u.length; d++) {
      let p = u[d];
      f.indexOf(p) === -1 && g.push(p);
    }
    u = u.filter((d) => !g.includes(d));
    let h = "template";
    for (let d = 0; d < f.length; d++) {
      let p = f[d], E = u.indexOf(p);
      if (E === -1)
        u.splice(d, 0, p), _.push([h, d]);
      else if (E !== d) {
        let m = u.splice(d, 1)[0], I = u.splice(E - 1, 1)[0];
        u.splice(d, 0, I), u.splice(E, 0, m), l.push([m, I]);
      } else
        v.push(p);
      h = p;
    }
    for (let d = 0; d < g.length; d++) {
      let p = g[d];
      s[p]._x_effects && s[p]._x_effects.forEach(vi), s[p].remove(), s[p] = null, delete s[p];
    }
    for (let d = 0; d < l.length; d++) {
      let [p, E] = l[d], m = s[p], I = s[E], w = document.createElement("div");
      Y(() => {
        I || ye('x-for ":key" is undefined or invalid', a), I.after(w), m.after(I), I._x_currentIfEl && I.after(I._x_currentIfEl), w.before(m), m._x_currentIfEl && m.after(m._x_currentIfEl), w.remove();
      }), I._x_refreshXForScope(c[f.indexOf(E)]);
    }
    for (let d = 0; d < _.length; d++) {
      let [p, E] = _[d], m = p === "template" ? a : s[p];
      m._x_currentIfEl && (m = m._x_currentIfEl);
      let I = c[E], w = f[E], P = document.importNode(a.content, !0).firstElementChild, y = tt(I);
      Tt(P, y, a), P._x_refreshXForScope = (C) => {
        Object.entries(C).forEach(([$, N]) => {
          y[$] = N;
        });
      }, Y(() => {
        m.after(P), be(P);
      }), typeof w == "object" && ye("x-for key cannot be an object, it must be a string or an integer", a), s[w] = P;
    }
    for (let d = 0; d < v.length; d++)
      s[v[d]]._x_refreshXForScope(c[f.indexOf(v[d])]);
    a._x_prevKeys = f;
  });
}
function au(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(r);
  if (!i)
    return;
  let a = {};
  a.items = i[2].trim();
  let o = i[1].replace(n, "").trim(), s = o.match(t);
  return s ? (a.item = o.replace(t, "").trim(), a.index = s[1].trim(), s[2] && (a.collection = s[2].trim())) : a.item = o, a;
}
function Jr(e, t, n, r) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((o) => o.trim()).forEach((o, s) => {
    i[o] = t[s];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((o) => o.trim()).forEach((o) => {
    i[o] = t[o];
  }) : i[e.item] = t, e.index && (i[e.index] = n), e.collection && (i[e.collection] = r), i;
}
function ou(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Aa() {
}
Aa.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = on(e);
  r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
};
q("ref", Aa);
q("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && ye("x-if can only be used on a <template> tag", e);
  let i = ee(e, t), a = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let s = e.content.cloneNode(!0).firstElementChild;
    return Tt(s, {}, e), Y(() => {
      e.after(s), be(s);
    }), e._x_currentIfEl = s, e._x_undoIf = () => {
      Te(s, (u) => {
        u._x_effects && u._x_effects.forEach(vi);
      }), s.remove(), delete e._x_currentIfEl;
    }, s;
  }, o = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  n(() => i((s) => {
    s ? a() : o();
  })), r(() => e._x_undoIf && e._x_undoIf());
});
q("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => Hs(e, i));
});
lr(Vi("@", ki(rt("on:"))));
q("on", It((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
  let a = r ? ee(e, r) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let o = qn(e, t, n, (s) => {
    a(() => {
    }, { scope: { $event: s }, params: [s] });
  });
  i(() => o());
}));
dn("Collapse", "collapse", "collapse");
dn("Intersect", "intersect", "intersect");
dn("Focus", "trap", "focus");
dn("Mask", "mask", "mask");
function dn(e, t, n) {
  q(t, (r) => ye(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
Ct.setEvaluator(Mi);
Ct.setReactivityEngine({ reactive: br, effect: gs, release: ps, raw: z });
var su = Ct, en = su;
function Zr(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function uu(e, t, n) {
  return t && Zr(e.prototype, t), n && Zr(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
var Qr = "(prefers-reduced-motion: reduce)", qe = 1, cu = 2, Qe = 3, it = 4, Lt = 5, Gt = 6, tn = 7, fu = {
  CREATED: qe,
  MOUNTED: cu,
  IDLE: Qe,
  MOVING: it,
  SCROLLING: Lt,
  DRAGGING: Gt,
  DESTROYED: tn
};
function Ae(e) {
  e.length = 0;
}
function Ne(e, t, n) {
  return Array.prototype.slice.call(e, t, n);
}
function j(e) {
  return e.bind.apply(e, [null].concat(Ne(arguments, 1)));
}
var xa = setTimeout, Yn = function() {
};
function ei(e) {
  return requestAnimationFrame(e);
}
function vn(e, t) {
  return typeof t === e;
}
function pt(e) {
  return !xr(e) && vn("object", e);
}
var Ar = Array.isArray, Sa = j(vn, "function"), Ce = j(vn, "string"), Rt = j(vn, "undefined");
function xr(e) {
  return e === null;
}
function wa(e) {
  try {
    return e instanceof (e.ownerDocument.defaultView || window).HTMLElement;
  } catch {
    return !1;
  }
}
function Nt(e) {
  return Ar(e) ? e : [e];
}
function oe(e, t) {
  Nt(e).forEach(t);
}
function Sr(e, t) {
  return e.indexOf(t) > -1;
}
function qt(e, t) {
  return e.push.apply(e, Nt(t)), e;
}
function pe(e, t, n) {
  e && oe(t, function(r) {
    r && e.classList[n ? "add" : "remove"](r);
  });
}
function ve(e, t) {
  pe(e, Ce(t) ? t.split(" ") : t, !0);
}
function Pt(e, t) {
  oe(t, e.appendChild.bind(e));
}
function wr(e, t) {
  oe(e, function(n) {
    var r = (t || n).parentNode;
    r && r.insertBefore(n, t);
  });
}
function Et(e, t) {
  return wa(e) && (e.msMatchesSelector || e.matches).call(e, t);
}
function Ta(e, t) {
  var n = e ? Ne(e.children) : [];
  return t ? n.filter(function(r) {
    return Et(r, t);
  }) : n;
}
function Mt(e, t) {
  return t ? Ta(e, t)[0] : e.firstElementChild;
}
var mt = Object.keys;
function ze(e, t, n) {
  return e && (n ? mt(e).reverse() : mt(e)).forEach(function(r) {
    r !== "__proto__" && t(e[r], r);
  }), e;
}
function yt(e) {
  return Ne(arguments, 1).forEach(function(t) {
    ze(t, function(n, r) {
      e[r] = t[r];
    });
  }), e;
}
function we(e) {
  return Ne(arguments, 1).forEach(function(t) {
    ze(t, function(n, r) {
      Ar(n) ? e[r] = n.slice() : pt(n) ? e[r] = we({}, pt(e[r]) ? e[r] : {}, n) : e[r] = n;
    });
  }), e;
}
function ti(e, t) {
  oe(t || mt(e), function(n) {
    delete e[n];
  });
}
function _e(e, t) {
  oe(e, function(n) {
    oe(t, function(r) {
      n && n.removeAttribute(r);
    });
  });
}
function F(e, t, n) {
  pt(t) ? ze(t, function(r, i) {
    F(e, i, r);
  }) : oe(e, function(r) {
    xr(n) || n === "" ? _e(r, t) : r.setAttribute(t, String(n));
  });
}
function Ye(e, t, n) {
  var r = document.createElement(e);
  return t && (Ce(t) ? ve(r, t) : F(r, t)), n && Pt(n, r), r;
}
function se(e, t, n) {
  if (Rt(n))
    return getComputedStyle(e)[t];
  xr(n) || (e.style[t] = "" + n);
}
function bt(e, t) {
  se(e, "display", t);
}
function Oa(e) {
  e.setActive && e.setActive() || e.focus({
    preventScroll: !0
  });
}
function ue(e, t) {
  return e.getAttribute(t);
}
function ni(e, t) {
  return e && e.classList.contains(t);
}
function ie(e) {
  return e.getBoundingClientRect();
}
function Ke(e) {
  oe(e, function(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  });
}
function Ia(e) {
  return Mt(new DOMParser().parseFromString(e, "text/html").body);
}
function ge(e, t) {
  e.preventDefault(), t && (e.stopPropagation(), e.stopImmediatePropagation());
}
function Ca(e, t) {
  return e && e.querySelector(t);
}
function Tr(e, t) {
  return t ? Ne(e.querySelectorAll(t)) : [];
}
function Ee(e, t) {
  pe(e, t, !1);
}
function Xn(e) {
  return e.timeStamp;
}
function De(e) {
  return Ce(e) ? e : e ? e + "px" : "";
}
var Dt = "splide", Or = "data-" + Dt;
function _t(e, t) {
  if (!e)
    throw new Error("[" + Dt + "] " + (t || ""));
}
var Le = Math.min, nn = Math.max, rn = Math.floor, At = Math.ceil, ne = Math.abs;
function La(e, t, n) {
  return ne(e - t) < n;
}
function Yt(e, t, n, r) {
  var i = Le(t, n), a = nn(t, n);
  return r ? i < e && e < a : i <= e && e <= a;
}
function He(e, t, n) {
  var r = Le(t, n), i = nn(t, n);
  return Le(nn(r, e), i);
}
function Jn(e) {
  return +(e > 0) - +(e < 0);
}
function Zn(e, t) {
  return oe(t, function(n) {
    e = e.replace("%s", "" + n);
  }), e;
}
function Ir(e) {
  return e < 10 ? "0" + e : "" + e;
}
var ri = {};
function lu(e) {
  return "" + e + Ir(ri[e] = (ri[e] || 0) + 1);
}
function Ra() {
  var e = [];
  function t(o, s, u, c) {
    i(o, s, function(f, _, l) {
      var g = "addEventListener" in f, v = g ? f.removeEventListener.bind(f, _, u, c) : f.removeListener.bind(f, u);
      g ? f.addEventListener(_, u, c) : f.addListener(u), e.push([f, _, l, u, v]);
    });
  }
  function n(o, s, u) {
    i(o, s, function(c, f, _) {
      e = e.filter(function(l) {
        return l[0] === c && l[1] === f && l[2] === _ && (!u || l[3] === u) ? (l[4](), !1) : !0;
      });
    });
  }
  function r(o, s, u) {
    var c, f = !0;
    return typeof CustomEvent == "function" ? c = new CustomEvent(s, {
      bubbles: f,
      detail: u
    }) : (c = document.createEvent("CustomEvent"), c.initCustomEvent(s, f, !1, u)), o.dispatchEvent(c), c;
  }
  function i(o, s, u) {
    oe(o, function(c) {
      c && oe(s, function(f) {
        f.split(" ").forEach(function(_) {
          var l = _.split(".");
          u(c, l[0], l[1]);
        });
      });
    });
  }
  function a() {
    e.forEach(function(o) {
      o[4]();
    }), Ae(e);
  }
  return {
    bind: t,
    unbind: n,
    dispatch: r,
    destroy: a
  };
}
var We = "mounted", ii = "ready", Re = "move", Ft = "moved", Na = "click", du = "active", vu = "inactive", _u = "visible", hu = "hidden", X = "refresh", re = "updated", xt = "resize", Cr = "resized", gu = "drag", pu = "dragging", Eu = "dragged", Lr = "scroll", at = "scrolled", mu = "overflow", Pa = "destroy", yu = "arrows:mounted", bu = "arrows:updated", Au = "pagination:mounted", xu = "pagination:updated", Ma = "navigation:mounted", Da = "autoplay:play", Su = "autoplay:playing", Fa = "autoplay:pause", $a = "lazyload:loaded", Va = "sk", ka = "sh", an = "ei";
function W(e) {
  var t = e ? e.event.bus : document.createDocumentFragment(), n = Ra();
  function r(a, o) {
    n.bind(t, Nt(a).join(" "), function(s) {
      o.apply(o, Ar(s.detail) ? s.detail : []);
    });
  }
  function i(a) {
    n.dispatch(t, a, Ne(arguments, 1));
  }
  return e && e.event.on(Pa, n.destroy), yt(n, {
    bus: t,
    on: r,
    off: j(n.unbind, t),
    emit: i
  });
}
function _n(e, t, n, r) {
  var i = Date.now, a, o = 0, s, u = !0, c = 0;
  function f() {
    if (!u) {
      if (o = e ? Le((i() - a) / e, 1) : 1, n && n(o), o >= 1 && (t(), a = i(), r && ++c >= r))
        return l();
      s = ei(f);
    }
  }
  function _(p) {
    p || v(), a = i() - (p ? o * e : 0), u = !1, s = ei(f);
  }
  function l() {
    u = !0;
  }
  function g() {
    a = i(), o = 0, n && n(o);
  }
  function v() {
    s && cancelAnimationFrame(s), o = 0, s = 0, u = !0;
  }
  function h(p) {
    e = p;
  }
  function d() {
    return u;
  }
  return {
    start: _,
    rewind: g,
    pause: l,
    cancel: v,
    set: h,
    isPaused: d
  };
}
function wu(e) {
  var t = e;
  function n(i) {
    t = i;
  }
  function r(i) {
    return Sr(Nt(i), t);
  }
  return {
    set: n,
    is: r
  };
}
function Tu(e, t) {
  var n = _n(t || 0, e, null, 1);
  return function() {
    n.isPaused() && n.start();
  };
}
function Ou(e, t, n) {
  var r = e.state, i = n.breakpoints || {}, a = n.reducedMotion || {}, o = Ra(), s = [];
  function u() {
    var v = n.mediaQuery === "min";
    mt(i).sort(function(h, d) {
      return v ? +h - +d : +d - +h;
    }).forEach(function(h) {
      f(i[h], "(" + (v ? "min" : "max") + "-width:" + h + "px)");
    }), f(a, Qr), _();
  }
  function c(v) {
    v && o.destroy();
  }
  function f(v, h) {
    var d = matchMedia(h);
    o.bind(d, "change", _), s.push([v, d]);
  }
  function _() {
    var v = r.is(tn), h = n.direction, d = s.reduce(function(p, E) {
      return we(p, E[1].matches ? E[0] : {});
    }, {});
    ti(n), g(d), n.destroy ? e.destroy(n.destroy === "completely") : v ? (c(!0), e.mount()) : h !== n.direction && e.refresh();
  }
  function l(v) {
    matchMedia(Qr).matches && (v ? we(n, a) : ti(n, mt(a)));
  }
  function g(v, h, d) {
    we(n, v), h && we(Object.getPrototypeOf(n), v), (d || !r.is(qe)) && e.emit(re, n);
  }
  return {
    setup: u,
    destroy: c,
    reduce: l,
    set: g
  };
}
var hn = "Arrow", gn = hn + "Left", pn = hn + "Right", Ba = hn + "Up", ja = hn + "Down", ai = "rtl", En = "ttb", On = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [Ba, pn],
  ArrowRight: [ja, gn]
};
function Iu(e, t, n) {
  function r(a, o, s) {
    s = s || n.direction;
    var u = s === ai && !o ? 1 : s === En ? 0 : -1;
    return On[a] && On[a][u] || a.replace(/width|left|right/i, function(c, f) {
      var _ = On[c.toLowerCase()][u] || c;
      return f > 0 ? _.charAt(0).toUpperCase() + _.slice(1) : _;
    });
  }
  function i(a) {
    return a * (n.direction === ai ? 1 : -1);
  }
  return {
    resolve: r,
    orient: i
  };
}
var me = "role", Xe = "tabindex", Cu = "disabled", le = "aria-", $t = le + "controls", za = le + "current", oi = le + "selected", ae = le + "label", Rr = le + "labelledby", Ka = le + "hidden", Nr = le + "orientation", St = le + "roledescription", si = le + "live", ui = le + "busy", ci = le + "atomic", Pr = [me, Xe, Cu, $t, za, ae, Rr, Ka, Nr, St], he = Dt + "__", Pe = "is-", In = Dt, fi = he + "track", Lu = he + "list", mn = he + "slide", Ua = mn + "--clone", Ru = mn + "__container", Mr = he + "arrows", yn = he + "arrow", Wa = yn + "--prev", Ha = yn + "--next", bn = he + "pagination", Ga = bn + "__page", Nu = he + "progress", Pu = Nu + "__bar", Mu = he + "toggle", Du = he + "spinner", Fu = he + "sr", $u = Pe + "initialized", Ue = Pe + "active", qa = Pe + "prev", Ya = Pe + "next", Qn = Pe + "visible", er = Pe + "loading", Xa = Pe + "focus-in", Ja = Pe + "overflow", Vu = [Ue, Qn, qa, Ya, er, Xa, Ja], ku = {
  slide: mn,
  clone: Ua,
  arrows: Mr,
  arrow: yn,
  prev: Wa,
  next: Ha,
  pagination: bn,
  page: Ga,
  spinner: Du
};
function Bu(e, t) {
  if (Sa(e.closest))
    return e.closest(t);
  for (var n = e; n && n.nodeType === 1 && !Et(n, t); )
    n = n.parentElement;
  return n;
}
var ju = 5, li = 200, Za = "touchstart mousedown", Cn = "touchmove mousemove", Ln = "touchend touchcancel mouseup click";
function zu(e, t, n) {
  var r = W(e), i = r.on, a = r.bind, o = e.root, s = n.i18n, u = {}, c = [], f = [], _ = [], l, g, v;
  function h() {
    m(), I(), E();
  }
  function d() {
    i(X, p), i(X, h), i(re, E), a(document, Za + " keydown", function(y) {
      v = y.type === "keydown";
    }, {
      capture: !0
    }), a(o, "focusin", function() {
      pe(o, Xa, !!v);
    });
  }
  function p(y) {
    var C = Pr.concat("style");
    Ae(c), Ee(o, f), Ee(l, _), _e([l, g], C), _e(o, y ? C : ["style", St]);
  }
  function E() {
    Ee(o, f), Ee(l, _), f = P(In), _ = P(fi), ve(o, f), ve(l, _), F(o, ae, n.label), F(o, Rr, n.labelledby);
  }
  function m() {
    l = w("." + fi), g = Mt(l, "." + Lu), _t(l && g, "A track/list element is missing."), qt(c, Ta(g, "." + mn + ":not(." + Ua + ")")), ze({
      arrows: Mr,
      pagination: bn,
      prev: Wa,
      next: Ha,
      bar: Pu,
      toggle: Mu
    }, function(y, C) {
      u[C] = w("." + y);
    }), yt(u, {
      root: o,
      track: l,
      list: g,
      slides: c
    });
  }
  function I() {
    var y = o.id || lu(Dt), C = n.role;
    o.id = y, l.id = l.id || y + "-track", g.id = g.id || y + "-list", !ue(o, me) && o.tagName !== "SECTION" && C && F(o, me, C), F(o, St, s.carousel), F(g, me, "presentation");
  }
  function w(y) {
    var C = Ca(o, y);
    return C && Bu(C, "." + In) === o ? C : void 0;
  }
  function P(y) {
    return [y + "--" + n.type, y + "--" + n.direction, n.drag && y + "--draggable", n.isNavigation && y + "--nav", y === In && Ue];
  }
  return yt(u, {
    setup: h,
    mount: d,
    destroy: p
  });
}
var et = "slide", ot = "loop", Vt = "fade";
function Ku(e, t, n, r) {
  var i = W(e), a = i.on, o = i.emit, s = i.bind, u = e.Components, c = e.root, f = e.options, _ = f.isNavigation, l = f.updateOnMove, g = f.i18n, v = f.pagination, h = f.slideFocus, d = u.Direction.resolve, p = ue(r, "style"), E = ue(r, ae), m = n > -1, I = Mt(r, "." + Ru), w;
  function P() {
    m || (r.id = c.id + "-slide" + Ir(t + 1), F(r, me, v ? "tabpanel" : "group"), F(r, St, g.slide), F(r, ae, E || Zn(g.slideLabel, [t + 1, e.length]))), y();
  }
  function y() {
    s(r, "click", j(o, Na, M)), s(r, "keydown", j(o, Va, M)), a([Ft, ka, at], x), a(Ma, $), l && a(Re, N);
  }
  function C() {
    w = !0, i.destroy(), Ee(r, Vu), _e(r, Pr), F(r, "style", p), F(r, ae, E || "");
  }
  function $() {
    var R = e.splides.map(function(A) {
      var L = A.splide.Components.Slides.getAt(t);
      return L ? L.slide.id : "";
    }).join(" ");
    F(r, ae, Zn(g.slideX, (m ? n : t) + 1)), F(r, $t, R), F(r, me, h ? "button" : ""), h && _e(r, St);
  }
  function N() {
    w || x();
  }
  function x() {
    if (!w) {
      var R = e.index;
      S(), T(), pe(r, qa, t === R - 1), pe(r, Ya, t === R + 1);
    }
  }
  function S() {
    var R = V();
    R !== ni(r, Ue) && (pe(r, Ue, R), F(r, za, _ && R || ""), o(R ? du : vu, M));
  }
  function T() {
    var R = H(), A = !R && (!V() || m);
    if (e.state.is([it, Lt]) || F(r, Ka, A || ""), F(Tr(r, f.focusableNodes || ""), Xe, A ? -1 : ""), h && F(r, Xe, A ? -1 : 0), R !== ni(r, Qn) && (pe(r, Qn, R), o(R ? _u : hu, M)), !R && document.activeElement === r) {
      var L = u.Slides.getAt(e.index);
      L && Oa(L.slide);
    }
  }
  function D(R, A, L) {
    se(L && I || r, R, A);
  }
  function V() {
    var R = e.index;
    return R === t || f.cloneStatus && R === n;
  }
  function H() {
    if (e.is(Vt))
      return V();
    var R = ie(u.Elements.track), A = ie(r), L = d("left", !0), k = d("right", !0);
    return rn(R[L]) <= At(A[L]) && rn(A[k]) <= At(R[k]);
  }
  function U(R, A) {
    var L = ne(R - t);
    return !m && (f.rewind || e.is(ot)) && (L = Le(L, e.length - L)), L <= A;
  }
  var M = {
    index: t,
    slideIndex: n,
    slide: r,
    container: I,
    isClone: m,
    mount: P,
    destroy: C,
    update: x,
    style: D,
    isWithin: U
  };
  return M;
}
function Uu(e, t, n) {
  var r = W(e), i = r.on, a = r.emit, o = r.bind, s = t.Elements, u = s.slides, c = s.list, f = [];
  function _() {
    l(), i(X, g), i(X, l);
  }
  function l() {
    u.forEach(function(x, S) {
      h(x, S, -1);
    });
  }
  function g() {
    w(function(x) {
      x.destroy();
    }), Ae(f);
  }
  function v() {
    w(function(x) {
      x.update();
    });
  }
  function h(x, S, T) {
    var D = Ku(e, S, T, x);
    D.mount(), f.push(D), f.sort(function(V, H) {
      return V.index - H.index;
    });
  }
  function d(x) {
    return x ? P(function(S) {
      return !S.isClone;
    }) : f;
  }
  function p(x) {
    var S = t.Controller, T = S.toIndex(x), D = S.hasFocus() ? 1 : n.perPage;
    return P(function(V) {
      return Yt(V.index, T, T + D - 1);
    });
  }
  function E(x) {
    return P(x)[0];
  }
  function m(x, S) {
    oe(x, function(T) {
      if (Ce(T) && (T = Ia(T)), wa(T)) {
        var D = u[S];
        D ? wr(T, D) : Pt(c, T), ve(T, n.classes.slide), C(T, j(a, xt));
      }
    }), a(X);
  }
  function I(x) {
    Ke(P(x).map(function(S) {
      return S.slide;
    })), a(X);
  }
  function w(x, S) {
    d(S).forEach(x);
  }
  function P(x) {
    return f.filter(Sa(x) ? x : function(S) {
      return Ce(x) ? Et(S.slide, x) : Sr(Nt(x), S.index);
    });
  }
  function y(x, S, T) {
    w(function(D) {
      D.style(x, S, T);
    });
  }
  function C(x, S) {
    var T = Tr(x, "img"), D = T.length;
    D ? T.forEach(function(V) {
      o(V, "load error", function() {
        --D || S();
      });
    }) : S();
  }
  function $(x) {
    return x ? u.length : f.length;
  }
  function N() {
    return f.length > n.perPage;
  }
  return {
    mount: _,
    destroy: g,
    update: v,
    register: h,
    get: d,
    getIn: p,
    getAt: E,
    add: m,
    remove: I,
    forEach: w,
    filter: P,
    style: y,
    getLength: $,
    isEnough: N
  };
}
function Wu(e, t, n) {
  var r = W(e), i = r.on, a = r.bind, o = r.emit, s = t.Slides, u = t.Direction.resolve, c = t.Elements, f = c.root, _ = c.track, l = c.list, g = s.getAt, v = s.style, h, d, p;
  function E() {
    m(), a(window, "resize load", Tu(j(o, xt))), i([re, X], m), i(xt, I);
  }
  function m() {
    h = n.direction === En, se(f, "maxWidth", De(n.width)), se(_, u("paddingLeft"), w(!1)), se(_, u("paddingRight"), w(!0)), I(!0);
  }
  function I(M) {
    var R = ie(f);
    (M || d.width !== R.width || d.height !== R.height) && (se(_, "height", P()), v(u("marginRight"), De(n.gap)), v("width", C()), v("height", $(), !0), d = R, o(Cr), p !== (p = U()) && (pe(f, Ja, p), o(mu, p)));
  }
  function w(M) {
    var R = n.padding, A = u(M ? "right" : "left");
    return R && De(R[A] || (pt(R) ? 0 : R)) || "0px";
  }
  function P() {
    var M = "";
    return h && (M = y(), _t(M, "height or heightRatio is missing."), M = "calc(" + M + " - " + w(!1) + " - " + w(!0) + ")"), M;
  }
  function y() {
    return De(n.height || ie(l).width * n.heightRatio);
  }
  function C() {
    return n.autoWidth ? null : De(n.fixedWidth) || (h ? "" : N());
  }
  function $() {
    return De(n.fixedHeight) || (h ? n.autoHeight ? null : N() : y());
  }
  function N() {
    var M = De(n.gap);
    return "calc((100%" + (M && " + " + M) + ")/" + (n.perPage || 1) + (M && " - " + M) + ")";
  }
  function x() {
    return ie(l)[u("width")];
  }
  function S(M, R) {
    var A = g(M || 0);
    return A ? ie(A.slide)[u("width")] + (R ? 0 : V()) : 0;
  }
  function T(M, R) {
    var A = g(M);
    if (A) {
      var L = ie(A.slide)[u("right")], k = ie(l)[u("left")];
      return ne(L - k) + (R ? 0 : V());
    }
    return 0;
  }
  function D(M) {
    return T(e.length - 1) - T(0) + S(0, M);
  }
  function V() {
    var M = g(0);
    return M && parseFloat(se(M.slide, u("marginRight"))) || 0;
  }
  function H(M) {
    return parseFloat(se(_, u("padding" + (M ? "Right" : "Left")))) || 0;
  }
  function U() {
    return e.is(Vt) || D(!0) > x();
  }
  return {
    mount: E,
    resize: I,
    listSize: x,
    slideSize: S,
    sliderSize: D,
    totalSize: T,
    getPadding: H,
    isOverflow: U
  };
}
var Hu = 2;
function Gu(e, t, n) {
  var r = W(e), i = r.on, a = t.Elements, o = t.Slides, s = t.Direction.resolve, u = [], c;
  function f() {
    i(X, _), i([re, xt], g), (c = d()) && (v(c), t.Layout.resize(!0));
  }
  function _() {
    l(), f();
  }
  function l() {
    Ke(u), Ae(u), r.destroy();
  }
  function g() {
    var p = d();
    c !== p && (c < p || !p) && r.emit(X);
  }
  function v(p) {
    var E = o.get().slice(), m = E.length;
    if (m) {
      for (; E.length < p; )
        qt(E, E);
      qt(E.slice(-p), E.slice(0, p)).forEach(function(I, w) {
        var P = w < p, y = h(I.slide, w);
        P ? wr(y, E[0].slide) : Pt(a.list, y), qt(u, y), o.register(y, w - p + (P ? 0 : m), I.index);
      });
    }
  }
  function h(p, E) {
    var m = p.cloneNode(!0);
    return ve(m, n.classes.clone), m.id = e.root.id + "-clone" + Ir(E + 1), m;
  }
  function d() {
    var p = n.clones;
    if (!e.is(ot))
      p = 0;
    else if (Rt(p)) {
      var E = n[s("fixedWidth")] && t.Layout.slideSize(0), m = E && At(ie(a.track)[s("width")] / E);
      p = m || n[s("autoWidth")] && e.length || n.perPage * Hu;
    }
    return p;
  }
  return {
    mount: f,
    destroy: l
  };
}
function qu(e, t, n) {
  var r = W(e), i = r.on, a = r.emit, o = e.state.set, s = t.Layout, u = s.slideSize, c = s.getPadding, f = s.totalSize, _ = s.listSize, l = s.sliderSize, g = t.Direction, v = g.resolve, h = g.orient, d = t.Elements, p = d.list, E = d.track, m;
  function I() {
    m = t.Transition, i([We, Cr, re, X], w);
  }
  function w() {
    t.Controller.isBusy() || (t.Scroll.cancel(), y(e.index), t.Slides.update());
  }
  function P(A, L, k, Z) {
    A !== L && M(A > k) && (x(), C(N(D(), A > k), !0)), o(it), a(Re, L, k, A), m.start(L, function() {
      o(Qe), a(Ft, L, k, A), Z && Z();
    });
  }
  function y(A) {
    C(T(A, !0));
  }
  function C(A, L) {
    if (!e.is(Vt)) {
      var k = L ? A : $(A);
      se(p, "transform", "translate" + v("X") + "(" + k + "px)"), A !== k && a(ka);
    }
  }
  function $(A) {
    if (e.is(ot)) {
      var L = S(A), k = L > t.Controller.getEnd(), Z = L < 0;
      (Z || k) && (A = N(A, k));
    }
    return A;
  }
  function N(A, L) {
    var k = A - U(L), Z = l();
    return A -= h(Z * (At(ne(k) / Z) || 1)) * (L ? 1 : -1), A;
  }
  function x() {
    C(D(), !0), m.cancel();
  }
  function S(A) {
    for (var L = t.Slides.get(), k = 0, Z = 1 / 0, J = 0; J < L.length; J++) {
      var xe = L[J].index, b = ne(T(xe, !0) - A);
      if (b <= Z)
        Z = b, k = xe;
      else
        break;
    }
    return k;
  }
  function T(A, L) {
    var k = h(f(A - 1) - H(A));
    return L ? V(k) : k;
  }
  function D() {
    var A = v("left");
    return ie(p)[A] - ie(E)[A] + h(c(!1));
  }
  function V(A) {
    return n.trimSpace && e.is(et) && (A = He(A, 0, h(l(!0) - _()))), A;
  }
  function H(A) {
    var L = n.focus;
    return L === "center" ? (_() - u(A, !0)) / 2 : +L * u(A) || 0;
  }
  function U(A) {
    return T(A ? t.Controller.getEnd() : 0, !!n.trimSpace);
  }
  function M(A) {
    var L = h(N(D(), A));
    return A ? L >= 0 : L <= p[v("scrollWidth")] - ie(E)[v("width")];
  }
  function R(A, L) {
    L = Rt(L) ? D() : L;
    var k = A !== !0 && h(L) < h(U(!1)), Z = A !== !1 && h(L) > h(U(!0));
    return k || Z;
  }
  return {
    mount: I,
    move: P,
    jump: y,
    translate: C,
    shift: N,
    cancel: x,
    toIndex: S,
    toPosition: T,
    getPosition: D,
    getLimit: U,
    exceededLimit: R,
    reposition: w
  };
}
function Yu(e, t, n) {
  var r = W(e), i = r.on, a = r.emit, o = t.Move, s = o.getPosition, u = o.getLimit, c = o.toPosition, f = t.Slides, _ = f.isEnough, l = f.getLength, g = n.omitEnd, v = e.is(ot), h = e.is(et), d = j(D, !1), p = j(D, !0), E = n.start || 0, m, I = E, w, P, y;
  function C() {
    $(), i([re, X, an], $), i(Cr, N);
  }
  function $() {
    w = l(!0), P = n.perMove, y = n.perPage, m = M();
    var b = He(E, 0, g ? m : w - 1);
    b !== E && (E = b, o.reposition());
  }
  function N() {
    m !== M() && a(an);
  }
  function x(b, B, te) {
    if (!xe()) {
      var G = T(b), Q = U(G);
      Q > -1 && (B || Q !== E) && (k(Q), o.move(G, Q, I, te));
    }
  }
  function S(b, B, te, G) {
    t.Scroll.scroll(b, B, te, function() {
      var Q = U(o.toIndex(s()));
      k(g ? Le(Q, m) : Q), G && G();
    });
  }
  function T(b) {
    var B = E;
    if (Ce(b)) {
      var te = b.match(/([+\-<>])(\d+)?/) || [], G = te[1], Q = te[2];
      G === "+" || G === "-" ? B = V(E + +("" + G + (+Q || 1)), E) : G === ">" ? B = Q ? R(+Q) : d(!0) : G === "<" && (B = p(!0));
    } else
      B = v ? b : He(b, 0, m);
    return B;
  }
  function D(b, B) {
    var te = P || (J() ? 1 : y), G = V(E + te * (b ? -1 : 1), E, !(P || J()));
    return G === -1 && h && !La(s(), u(!b), 1) ? b ? 0 : m : B ? G : U(G);
  }
  function V(b, B, te) {
    if (_() || J()) {
      var G = H(b);
      G !== b && (B = b, b = G, te = !1), b < 0 || b > m ? !P && (Yt(0, b, B, !0) || Yt(m, B, b, !0)) ? b = R(A(b)) : v ? b = te ? b < 0 ? -(w % y || y) : w : b : n.rewind ? b = b < 0 ? m : 0 : b = -1 : te && b !== B && (b = R(A(B) + (b < B ? -1 : 1)));
    } else
      b = -1;
    return b;
  }
  function H(b) {
    if (h && n.trimSpace === "move" && b !== E)
      for (var B = s(); B === c(b, !0) && Yt(b, 0, e.length - 1, !n.rewind); )
        b < E ? --b : ++b;
    return b;
  }
  function U(b) {
    return v ? (b + w) % w || 0 : b;
  }
  function M() {
    for (var b = w - (J() || v && P ? 1 : y); g && b-- > 0; )
      if (c(w - 1, !0) !== c(b, !0)) {
        b++;
        break;
      }
    return He(b, 0, w - 1);
  }
  function R(b) {
    return He(J() ? b : y * b, 0, m);
  }
  function A(b) {
    return J() ? Le(b, m) : rn((b >= m ? w - 1 : b) / y);
  }
  function L(b) {
    var B = o.toIndex(b);
    return h ? He(B, 0, m) : B;
  }
  function k(b) {
    b !== E && (I = E, E = b);
  }
  function Z(b) {
    return b ? I : E;
  }
  function J() {
    return !Rt(n.focus) || n.isNavigation;
  }
  function xe() {
    return e.state.is([it, Lt]) && !!n.waitForTransition;
  }
  return {
    mount: C,
    go: x,
    scroll: S,
    getNext: d,
    getPrev: p,
    getAdjacent: D,
    getEnd: M,
    setIndex: k,
    getIndex: Z,
    toIndex: R,
    toPage: A,
    toDest: L,
    hasFocus: J,
    isBusy: xe
  };
}
var Xu = "http://www.w3.org/2000/svg", Ju = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z", Ut = 40;
function Zu(e, t, n) {
  var r = W(e), i = r.on, a = r.bind, o = r.emit, s = n.classes, u = n.i18n, c = t.Elements, f = t.Controller, _ = c.arrows, l = c.track, g = _, v = c.prev, h = c.next, d, p, E = {};
  function m() {
    w(), i(re, I);
  }
  function I() {
    P(), m();
  }
  function w() {
    var S = n.arrows;
    S && !(v && h) && $(), v && h && (yt(E, {
      prev: v,
      next: h
    }), bt(g, S ? "" : "none"), ve(g, p = Mr + "--" + n.direction), S && (y(), x(), F([v, h], $t, l.id), o(yu, v, h)));
  }
  function P() {
    r.destroy(), Ee(g, p), d ? (Ke(_ ? [v, h] : g), v = h = null) : _e([v, h], Pr);
  }
  function y() {
    i([We, Ft, X, at, an], x), a(h, "click", j(C, ">")), a(v, "click", j(C, "<"));
  }
  function C(S) {
    f.go(S, !0);
  }
  function $() {
    g = _ || Ye("div", s.arrows), v = N(!0), h = N(!1), d = !0, Pt(g, [v, h]), !_ && wr(g, l);
  }
  function N(S) {
    var T = '<button class="' + s.arrow + " " + (S ? s.prev : s.next) + '" type="button"><svg xmlns="' + Xu + '" viewBox="0 0 ' + Ut + " " + Ut + '" width="' + Ut + '" height="' + Ut + '" focusable="false"><path d="' + (n.arrowPath || Ju) + '" />';
    return Ia(T);
  }
  function x() {
    if (v && h) {
      var S = e.index, T = f.getPrev(), D = f.getNext(), V = T > -1 && S < T ? u.last : u.prev, H = D > -1 && S > D ? u.first : u.next;
      v.disabled = T < 0, h.disabled = D < 0, F(v, ae, V), F(h, ae, H), o(bu, v, h, T, D);
    }
  }
  return {
    arrows: E,
    mount: m,
    destroy: P,
    update: x
  };
}
var Qu = Or + "-interval";
function ec(e, t, n) {
  var r = W(e), i = r.on, a = r.bind, o = r.emit, s = _n(n.interval, e.go.bind(e, ">"), y), u = s.isPaused, c = t.Elements, f = t.Elements, _ = f.root, l = f.toggle, g = n.autoplay, v, h, d = g === "pause";
  function p() {
    g && (E(), l && F(l, $t, c.track.id), d || m(), P());
  }
  function E() {
    n.pauseOnHover && a(_, "mouseenter mouseleave", function($) {
      v = $.type === "mouseenter", w();
    }), n.pauseOnFocus && a(_, "focusin focusout", function($) {
      h = $.type === "focusin", w();
    }), l && a(l, "click", function() {
      d ? m() : I(!0);
    }), i([Re, Lr, X], s.rewind), i(Re, C);
  }
  function m() {
    u() && t.Slides.isEnough() && (s.start(!n.resetProgress), h = v = d = !1, P(), o(Da));
  }
  function I($) {
    $ === void 0 && ($ = !0), d = !!$, P(), u() || (s.pause(), o(Fa));
  }
  function w() {
    d || (v || h ? I(!1) : m());
  }
  function P() {
    l && (pe(l, Ue, !d), F(l, ae, n.i18n[d ? "play" : "pause"]));
  }
  function y($) {
    var N = c.bar;
    N && se(N, "width", $ * 100 + "%"), o(Su, $);
  }
  function C($) {
    var N = t.Slides.getAt($);
    s.set(N && +ue(N.slide, Qu) || n.interval);
  }
  return {
    mount: p,
    destroy: s.cancel,
    play: m,
    pause: I,
    isPaused: u
  };
}
function tc(e, t, n) {
  var r = W(e), i = r.on;
  function a() {
    n.cover && (i($a, j(s, !0)), i([We, re, X], j(o, !0)));
  }
  function o(u) {
    t.Slides.forEach(function(c) {
      var f = Mt(c.container || c.slide, "img");
      f && f.src && s(u, f, c);
    });
  }
  function s(u, c, f) {
    f.style("background", u ? 'center/cover no-repeat url("' + c.src + '")' : "", !0), bt(c, u ? "none" : "");
  }
  return {
    mount: a,
    destroy: j(o, !1)
  };
}
var nc = 10, rc = 600, ic = 0.6, ac = 1.5, oc = 800;
function sc(e, t, n) {
  var r = W(e), i = r.on, a = r.emit, o = e.state.set, s = t.Move, u = s.getPosition, c = s.getLimit, f = s.exceededLimit, _ = s.translate, l = e.is(et), g, v, h = 1;
  function d() {
    i(Re, I), i([re, X], w);
  }
  function p(y, C, $, N, x) {
    var S = u();
    if (I(), $ && (!l || !f())) {
      var T = t.Layout.sliderSize(), D = Jn(y) * T * rn(ne(y) / T) || 0;
      y = s.toPosition(t.Controller.toDest(y % T)) + D;
    }
    var V = La(S, y, 1);
    h = 1, C = V ? 0 : C || nn(ne(y - S) / ac, oc), v = N, g = _n(C, E, j(m, S, y, x), 1), o(Lt), a(Lr), g.start();
  }
  function E() {
    o(Qe), v && v(), a(at);
  }
  function m(y, C, $, N) {
    var x = u(), S = y + (C - y) * P(N), T = (S - x) * h;
    _(x + T), l && !$ && f() && (h *= ic, ne(T) < nc && p(c(f(!0)), rc, !1, v, !0));
  }
  function I() {
    g && g.cancel();
  }
  function w() {
    g && !g.isPaused() && (I(), E());
  }
  function P(y) {
    var C = n.easingFunc;
    return C ? C(y) : 1 - Math.pow(1 - y, 4);
  }
  return {
    mount: d,
    destroy: I,
    scroll: p,
    cancel: w
  };
}
var Ge = {
  passive: !1,
  capture: !0
};
function uc(e, t, n) {
  var r = W(e), i = r.on, a = r.emit, o = r.bind, s = r.unbind, u = e.state, c = t.Move, f = t.Scroll, _ = t.Controller, l = t.Elements.track, g = t.Media.reduce, v = t.Direction, h = v.resolve, d = v.orient, p = c.getPosition, E = c.exceededLimit, m, I, w, P, y, C = !1, $, N, x;
  function S() {
    o(l, Cn, Yn, Ge), o(l, Ln, Yn, Ge), o(l, Za, D, Ge), o(l, "click", U, {
      capture: !0
    }), o(l, "dragstart", ge), i([We, re], T);
  }
  function T() {
    var O = n.drag;
    $r(!O), P = O === "free";
  }
  function D(O) {
    if ($ = !1, !N) {
      var K = Q(O);
      G(O.target) && (K || !O.button) && (_.isBusy() ? ge(O, !0) : (x = K ? l : window, y = u.is([it, Lt]), w = null, o(x, Cn, V, Ge), o(x, Ln, H, Ge), c.cancel(), f.cancel(), M(O)));
    }
  }
  function V(O) {
    if (u.is(Gt) || (u.set(Gt), a(gu)), O.cancelable)
      if (y) {
        c.translate(m + te(J(O)));
        var K = xe(O) > li, Me = C !== (C = E());
        (K || Me) && M(O), $ = !0, a(pu), ge(O);
      } else
        L(O) && (y = A(O), ge(O));
  }
  function H(O) {
    u.is(Gt) && (u.set(Qe), a(Eu)), y && (R(O), ge(O)), s(x, Cn, V), s(x, Ln, H), y = !1;
  }
  function U(O) {
    !N && $ && ge(O, !0);
  }
  function M(O) {
    w = I, I = O, m = p();
  }
  function R(O) {
    var K = k(O), Me = Z(K), st = n.rewind && n.rewindByDrag;
    g(!1), P ? _.scroll(Me, 0, n.snap) : e.is(Vt) ? _.go(d(Jn(K)) < 0 ? st ? "<" : "-" : st ? ">" : "+") : e.is(et) && C && st ? _.go(E(!0) ? ">" : "<") : _.go(_.toDest(Me), !0), g(!0);
  }
  function A(O) {
    var K = n.dragMinThreshold, Me = pt(K), st = Me && K.mouse || 0, eo = (Me ? K.touch : +K) || 10;
    return ne(J(O)) > (Q(O) ? eo : st);
  }
  function L(O) {
    return ne(J(O)) > ne(J(O, !0));
  }
  function k(O) {
    if (e.is(ot) || !C) {
      var K = xe(O);
      if (K && K < li)
        return J(O) / K;
    }
    return 0;
  }
  function Z(O) {
    return p() + Jn(O) * Le(ne(O) * (n.flickPower || 600), P ? 1 / 0 : t.Layout.listSize() * (n.flickMaxPages || 1));
  }
  function J(O, K) {
    return B(O, K) - B(b(O), K);
  }
  function xe(O) {
    return Xn(O) - Xn(b(O));
  }
  function b(O) {
    return I === O && w || I;
  }
  function B(O, K) {
    return (Q(O) ? O.changedTouches[0] : O)["page" + h(K ? "Y" : "X")];
  }
  function te(O) {
    return O / (C && e.is(et) ? ju : 1);
  }
  function G(O) {
    var K = n.noDrag;
    return !Et(O, "." + Ga + ", ." + yn) && (!K || !Et(O, K));
  }
  function Q(O) {
    return typeof TouchEvent < "u" && O instanceof TouchEvent;
  }
  function Qa() {
    return y;
  }
  function $r(O) {
    N = O;
  }
  return {
    mount: S,
    disable: $r,
    isDragging: Qa
  };
}
var cc = {
  Spacebar: " ",
  Right: pn,
  Left: gn,
  Up: Ba,
  Down: ja
};
function Dr(e) {
  return e = Ce(e) ? e : e.key, cc[e] || e;
}
var di = "keydown";
function fc(e, t, n) {
  var r = W(e), i = r.on, a = r.bind, o = r.unbind, s = e.root, u = t.Direction.resolve, c, f;
  function _() {
    l(), i(re, g), i(re, l), i(Re, h);
  }
  function l() {
    var p = n.keyboard;
    p && (c = p === "global" ? window : s, a(c, di, d));
  }
  function g() {
    o(c, di);
  }
  function v(p) {
    f = p;
  }
  function h() {
    var p = f;
    f = !0, xa(function() {
      f = p;
    });
  }
  function d(p) {
    if (!f) {
      var E = Dr(p);
      E === u(gn) ? e.go("<") : E === u(pn) && e.go(">");
    }
  }
  return {
    mount: _,
    destroy: g,
    disable: v
  };
}
var ht = Or + "-lazy", Xt = ht + "-srcset", lc = "[" + ht + "], [" + Xt + "]";
function dc(e, t, n) {
  var r = W(e), i = r.on, a = r.off, o = r.bind, s = r.emit, u = n.lazyLoad === "sequential", c = [Ft, at], f = [];
  function _() {
    n.lazyLoad && (l(), i(X, l));
  }
  function l() {
    Ae(f), g(), u ? p() : (a(c), i(c, v), v());
  }
  function g() {
    t.Slides.forEach(function(E) {
      Tr(E.slide, lc).forEach(function(m) {
        var I = ue(m, ht), w = ue(m, Xt);
        if (I !== m.src || w !== m.srcset) {
          var P = n.classes.spinner, y = m.parentElement, C = Mt(y, "." + P) || Ye("span", P, y);
          f.push([m, E, C]), m.src || bt(m, "none");
        }
      });
    });
  }
  function v() {
    f = f.filter(function(E) {
      var m = n.perPage * ((n.preloadPages || 1) + 1) - 1;
      return E[1].isWithin(e.index, m) ? h(E) : !0;
    }), f.length || a(c);
  }
  function h(E) {
    var m = E[0];
    ve(E[1].slide, er), o(m, "load error", j(d, E)), F(m, "src", ue(m, ht)), F(m, "srcset", ue(m, Xt)), _e(m, ht), _e(m, Xt);
  }
  function d(E, m) {
    var I = E[0], w = E[1];
    Ee(w.slide, er), m.type !== "error" && (Ke(E[2]), bt(I, ""), s($a, I, w), s(xt)), u && p();
  }
  function p() {
    f.length && h(f.shift());
  }
  return {
    mount: _,
    destroy: j(Ae, f),
    check: v
  };
}
function vc(e, t, n) {
  var r = W(e), i = r.on, a = r.emit, o = r.bind, s = t.Slides, u = t.Elements, c = t.Controller, f = c.hasFocus, _ = c.getIndex, l = c.go, g = t.Direction.resolve, v = u.pagination, h = [], d, p;
  function E() {
    m(), i([re, X, an], E);
    var N = n.pagination;
    v && bt(v, N ? "" : "none"), N && (i([Re, Lr, at], $), I(), $(), a(Au, {
      list: d,
      items: h
    }, C(e.index)));
  }
  function m() {
    d && (Ke(v ? Ne(d.children) : d), Ee(d, p), Ae(h), d = null), r.destroy();
  }
  function I() {
    var N = e.length, x = n.classes, S = n.i18n, T = n.perPage, D = f() ? c.getEnd() + 1 : At(N / T);
    d = v || Ye("ul", x.pagination, u.track.parentElement), ve(d, p = bn + "--" + y()), F(d, me, "tablist"), F(d, ae, S.select), F(d, Nr, y() === En ? "vertical" : "");
    for (var V = 0; V < D; V++) {
      var H = Ye("li", null, d), U = Ye("button", {
        class: x.page,
        type: "button"
      }, H), M = s.getIn(V).map(function(A) {
        return A.slide.id;
      }), R = !f() && T > 1 ? S.pageX : S.slideX;
      o(U, "click", j(w, V)), n.paginationKeyboard && o(U, "keydown", j(P, V)), F(H, me, "presentation"), F(U, me, "tab"), F(U, $t, M.join(" ")), F(U, ae, Zn(R, V + 1)), F(U, Xe, -1), h.push({
        li: H,
        button: U,
        page: V
      });
    }
  }
  function w(N) {
    l(">" + N, !0);
  }
  function P(N, x) {
    var S = h.length, T = Dr(x), D = y(), V = -1;
    T === g(pn, !1, D) ? V = ++N % S : T === g(gn, !1, D) ? V = (--N + S) % S : T === "Home" ? V = 0 : T === "End" && (V = S - 1);
    var H = h[V];
    H && (Oa(H.button), l(">" + V), ge(x, !0));
  }
  function y() {
    return n.paginationDirection || n.direction;
  }
  function C(N) {
    return h[c.toPage(N)];
  }
  function $() {
    var N = C(_(!0)), x = C(_());
    if (N) {
      var S = N.button;
      Ee(S, Ue), _e(S, oi), F(S, Xe, -1);
    }
    if (x) {
      var T = x.button;
      ve(T, Ue), F(T, oi, !0), F(T, Xe, "");
    }
    a(xu, {
      list: d,
      items: h
    }, N, x);
  }
  return {
    items: h,
    mount: E,
    destroy: m,
    getAt: C,
    update: $
  };
}
var _c = [" ", "Enter"];
function hc(e, t, n) {
  var r = n.isNavigation, i = n.slideFocus, a = [];
  function o() {
    e.splides.forEach(function(v) {
      v.isParent || (c(e, v.splide), c(v.splide, e));
    }), r && f();
  }
  function s() {
    a.forEach(function(v) {
      v.destroy();
    }), Ae(a);
  }
  function u() {
    s(), o();
  }
  function c(v, h) {
    var d = W(v);
    d.on(Re, function(p, E, m) {
      h.go(h.is(ot) ? m : p);
    }), a.push(d);
  }
  function f() {
    var v = W(e), h = v.on;
    h(Na, l), h(Va, g), h([We, re], _), a.push(v), v.emit(Ma, e.splides);
  }
  function _() {
    F(t.Elements.list, Nr, n.direction === En ? "vertical" : "");
  }
  function l(v) {
    e.go(v.index);
  }
  function g(v, h) {
    Sr(_c, Dr(h)) && (l(v), ge(h));
  }
  return {
    setup: j(t.Media.set, {
      slideFocus: Rt(i) ? r : i
    }, !0),
    mount: o,
    destroy: s,
    remount: u
  };
}
function gc(e, t, n) {
  var r = W(e), i = r.bind, a = 0;
  function o() {
    n.wheel && i(t.Elements.track, "wheel", s, Ge);
  }
  function s(c) {
    if (c.cancelable) {
      var f = c.deltaY, _ = f < 0, l = Xn(c), g = n.wheelMinThreshold || 0, v = n.wheelSleep || 0;
      ne(f) > g && l - a > v && (e.go(_ ? "<" : ">"), a = l), u(_) && ge(c);
    }
  }
  function u(c) {
    return !n.releaseWheel || e.state.is(it) || t.Controller.getAdjacent(c) !== -1;
  }
  return {
    mount: o
  };
}
var pc = 90;
function Ec(e, t, n) {
  var r = W(e), i = r.on, a = t.Elements.track, o = n.live && !n.isNavigation, s = Ye("span", Fu), u = _n(pc, j(f, !1));
  function c() {
    o && (l(!t.Autoplay.isPaused()), F(a, ci, !0), s.textContent = "…", i(Da, j(l, !0)), i(Fa, j(l, !1)), i([Ft, at], j(f, !0)));
  }
  function f(g) {
    F(a, ui, g), g ? (Pt(a, s), u.start()) : (Ke(s), u.cancel());
  }
  function _() {
    _e(a, [si, ci, ui]), Ke(s);
  }
  function l(g) {
    o && F(a, si, g ? "off" : "polite");
  }
  return {
    mount: c,
    disable: l,
    destroy: _
  };
}
var mc = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Media: Ou,
  Direction: Iu,
  Elements: zu,
  Slides: Uu,
  Layout: Wu,
  Clones: Gu,
  Move: qu,
  Controller: Yu,
  Arrows: Zu,
  Autoplay: ec,
  Cover: tc,
  Scroll: sc,
  Drag: uc,
  Keyboard: fc,
  LazyLoad: dc,
  Pagination: vc,
  Sync: hc,
  Wheel: gc,
  Live: Ec
}), yc = {
  prev: "Previous slide",
  next: "Next slide",
  first: "Go to first slide",
  last: "Go to last slide",
  slideX: "Go to slide %s",
  pageX: "Go to page %s",
  play: "Start autoplay",
  pause: "Pause autoplay",
  carousel: "carousel",
  slide: "slide",
  select: "Select a slide to show",
  slideLabel: "%s of %s"
}, bc = {
  type: "slide",
  role: "region",
  speed: 400,
  perPage: 1,
  cloneStatus: !0,
  arrows: !0,
  pagination: !0,
  paginationKeyboard: !0,
  interval: 5e3,
  pauseOnHover: !0,
  pauseOnFocus: !0,
  resetProgress: !0,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  drag: !0,
  direction: "ltr",
  trimSpace: !0,
  focusableNodes: "a, button, textarea, input, select, iframe",
  live: !0,
  classes: ku,
  i18n: yc,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};
function Ac(e, t, n) {
  var r = t.Slides;
  function i() {
    W(e).on([We, X], a);
  }
  function a() {
    r.forEach(function(s) {
      s.style("transform", "translateX(-" + 100 * s.index + "%)");
    });
  }
  function o(s, u) {
    r.style("transition", "opacity " + n.speed + "ms " + n.easing), xa(u);
  }
  return {
    mount: i,
    start: o,
    cancel: Yn
  };
}
function xc(e, t, n) {
  var r = t.Move, i = t.Controller, a = t.Scroll, o = t.Elements.list, s = j(se, o, "transition"), u;
  function c() {
    W(e).bind(o, "transitionend", function(g) {
      g.target === o && u && (_(), u());
    });
  }
  function f(g, v) {
    var h = r.toPosition(g, !0), d = r.getPosition(), p = l(g);
    ne(h - d) >= 1 && p >= 1 ? n.useScroll ? a.scroll(h, p, !1, v) : (s("transform " + p + "ms " + n.easing), r.translate(h, !0), u = v) : (r.jump(g), v());
  }
  function _() {
    s(""), a.cancel();
  }
  function l(g) {
    var v = n.rewindSpeed;
    if (e.is(et) && v) {
      var h = i.getIndex(!0), d = i.getEnd();
      if (h === 0 && g >= d || h >= d && g === 0)
        return v;
    }
    return n.speed;
  }
  return {
    mount: c,
    start: f,
    cancel: _
  };
}
var Sc = /* @__PURE__ */ function() {
  function e(n, r) {
    this.event = W(), this.Components = {}, this.state = wu(qe), this.splides = [], this._o = {}, this._E = {};
    var i = Ce(n) ? Ca(document, n) : n;
    _t(i, i + " is invalid."), this.root = i, r = we({
      label: ue(i, ae) || "",
      labelledby: ue(i, Rr) || ""
    }, bc, e.defaults, r || {});
    try {
      we(r, JSON.parse(ue(i, Or)));
    } catch {
      _t(!1, "Invalid JSON");
    }
    this._o = Object.create(we({}, r));
  }
  var t = e.prototype;
  return t.mount = function(r, i) {
    var a = this, o = this.state, s = this.Components;
    _t(o.is([qe, tn]), "Already mounted!"), o.set(qe), this._C = s, this._T = i || this._T || (this.is(Vt) ? Ac : xc), this._E = r || this._E;
    var u = yt({}, mc, this._E, {
      Transition: this._T
    });
    return ze(u, function(c, f) {
      var _ = c(a, s, a._o);
      s[f] = _, _.setup && _.setup();
    }), ze(s, function(c) {
      c.mount && c.mount();
    }), this.emit(We), ve(this.root, $u), o.set(Qe), this.emit(ii), this;
  }, t.sync = function(r) {
    return this.splides.push({
      splide: r
    }), r.splides.push({
      splide: this,
      isParent: !0
    }), this.state.is(Qe) && (this._C.Sync.remount(), r.Components.Sync.remount()), this;
  }, t.go = function(r) {
    return this._C.Controller.go(r), this;
  }, t.on = function(r, i) {
    return this.event.on(r, i), this;
  }, t.off = function(r) {
    return this.event.off(r), this;
  }, t.emit = function(r) {
    var i;
    return (i = this.event).emit.apply(i, [r].concat(Ne(arguments, 1))), this;
  }, t.add = function(r, i) {
    return this._C.Slides.add(r, i), this;
  }, t.remove = function(r) {
    return this._C.Slides.remove(r), this;
  }, t.is = function(r) {
    return this._o.type === r;
  }, t.refresh = function() {
    return this.emit(X), this;
  }, t.destroy = function(r) {
    r === void 0 && (r = !0);
    var i = this.event, a = this.state;
    return a.is(qe) ? W(this).on(ii, this.destroy.bind(this, r)) : (ze(this._C, function(o) {
      o.destroy && o.destroy(r);
    }, !0), i.emit(Pa), i.destroy(), r && Ae(this.splides), a.set(tn)), this;
  }, uu(e, [{
    key: "options",
    get: function() {
      return this._o;
    },
    set: function(r) {
      this._C.Media.set(r, !0, !0);
    }
  }, {
    key: "length",
    get: function() {
      return this._C.Slides.getLength(!0);
    }
  }, {
    key: "index",
    get: function() {
      return this._C.Controller.getIndex();
    }
  }]), e;
}(), Fr = Sc;
Fr.defaults = {};
Fr.STATES = fu;
window.Alpine = en;
window.Splide = Fr;
document.addEventListener("alpine:init", () => {
  en.store("toasts", {
    counter: 0,
    list: [],
    createToast(e, t = "info", n = 2e3) {
      const r = this.list.length;
      let i = this.list.filter((a) => a.visible).length + 1;
      this.list.push({
        id: this.counter++,
        message: e,
        type: t,
        timeOut: n * i,
        visible: !0
      }), setTimeout(() => {
        this.destroyToast(r);
      }, n * i);
    },
    destroyToast(e) {
      this.list[e].visible = !1;
    }
  }), en.store("home_products", {
    products: []
  });
});
en.start();
