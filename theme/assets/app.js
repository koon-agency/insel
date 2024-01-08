var Mn = !1, Fn = !1, ke = [], $n = -1;
function ca(e) {
  fa(e);
}
function fa(e) {
  ke.includes(e) || ke.push(e), da();
}
function Ei(e) {
  let t = ke.indexOf(e);
  t !== -1 && t > $n && ke.splice(t, 1);
}
function da() {
  !Fn && !Mn && (Mn = !0, queueMicrotask(ha));
}
function ha() {
  Mn = !1, Fn = !0;
  for (let e = 0; e < ke.length; e++)
    ke[e](), $n = e;
  ke.length = 0, $n = -1, Fn = !1;
}
var nt, rt, Ct, bi, zn = !0;
function va(e) {
  zn = !1, e(), zn = !0;
}
function pa(e) {
  nt = e.reactive, Ct = e.release, rt = (t) => e.effect(t, { scheduler: (n) => {
    zn ? ca(n) : n();
  } }), bi = e.raw;
}
function Kr(e) {
  rt = e;
}
function _a(e) {
  let t = () => {
  };
  return [(r) => {
    let i = rt(r);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((s) => s());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), Ct(i));
    }, i;
  }, () => {
    t();
  }];
}
function vt(e, t, n = {}) {
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
function Oe(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => Oe(i, t));
    return;
  }
  let n = !1;
  if (t(e, () => n = !0), n)
    return;
  let r = e.firstElementChild;
  for (; r; )
    Oe(r, t), r = r.nextElementSibling;
}
function be(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
var Wr = !1;
function ga() {
  Wr && be("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), Wr = !0, document.body || be("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), vt(document, "alpine:init"), vt(document, "alpine:initializing"), fr(), Ea((t) => we(t, Oe)), ur((t) => or(t)), Ri((t, n) => {
    pr(t, n).forEach((r) => r());
  });
  let e = (t) => !cn(t.parentElement, !0);
  Array.from(document.querySelectorAll(Si().join(","))).filter(e).forEach((t) => {
    we(t);
  }), vt(document, "alpine:initialized");
}
var ar = [], wi = [];
function Ai() {
  return ar.map((e) => e());
}
function Si() {
  return ar.concat(wi).map((e) => e());
}
function xi(e) {
  ar.push(e);
}
function Ii(e) {
  wi.push(e);
}
function cn(e, t = !1) {
  return fn(e, (n) => {
    if ((t ? Si() : Ai()).some((i) => n.matches(i)))
      return !0;
  });
}
function fn(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return fn(e.parentElement, t);
  }
}
function ma(e) {
  return Ai().some((t) => e.matches(t));
}
var Oi = [];
function ya(e) {
  Oi.push(e);
}
function we(e, t = Oe, n = () => {
}) {
  Ma(() => {
    t(e, (r, i) => {
      n(r, i), Oi.forEach((s) => s(r, i)), pr(r, r.attributes).forEach((s) => s()), r._x_ignore && i();
    });
  });
}
function or(e) {
  Oe(e, (t) => {
    Ni(t), ba(t);
  });
}
var Ti = [], Ci = [], Li = [];
function Ea(e) {
  Li.push(e);
}
function ur(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, Ci.push(t));
}
function Ri(e) {
  Ti.push(e);
}
function Pi(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function Ni(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
    (t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
  });
}
function ba(e) {
  if (e._x_cleanups)
    for (; e._x_cleanups.length; )
      e._x_cleanups.pop()();
}
var lr = new MutationObserver(hr), cr = !1;
function fr() {
  lr.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), cr = !0;
}
function Di() {
  wa(), lr.disconnect(), cr = !1;
}
var pt = [], In = !1;
function wa() {
  pt = pt.concat(lr.takeRecords()), pt.length && !In && (In = !0, queueMicrotask(() => {
    Aa(), In = !1;
  }));
}
function Aa() {
  hr(pt), pt.length = 0;
}
function Y(e) {
  if (!cr)
    return e();
  Di();
  let t = e();
  return fr(), t;
}
var dr = !1, nn = [];
function Sa() {
  dr = !0;
}
function xa() {
  dr = !1, hr(nn), nn = [];
}
function hr(e) {
  if (dr) {
    nn = nn.concat(e);
    return;
  }
  let t = [], n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let s = 0; s < e.length; s++)
    if (!e[s].target._x_ignoreMutationObserver && (e[s].type === "childList" && (e[s].addedNodes.forEach((a) => a.nodeType === 1 && t.push(a)), e[s].removedNodes.forEach((a) => a.nodeType === 1 && n.push(a))), e[s].type === "attributes")) {
      let a = e[s].target, o = e[s].attributeName, u = e[s].oldValue, l = () => {
        r.has(a) || r.set(a, []), r.get(a).push({ name: o, value: a.getAttribute(o) });
      }, c = () => {
        i.has(a) || i.set(a, []), i.get(a).push(o);
      };
      a.hasAttribute(o) && u === null ? l() : a.hasAttribute(o) ? (c(), l()) : c();
    }
  i.forEach((s, a) => {
    Ni(a, s);
  }), r.forEach((s, a) => {
    Ti.forEach((o) => o(a, s));
  });
  for (let s of n)
    t.includes(s) || (Ci.forEach((a) => a(s)), or(s));
  t.forEach((s) => {
    s._x_ignoreSelf = !0, s._x_ignore = !0;
  });
  for (let s of t)
    n.includes(s) || s.isConnected && (delete s._x_ignoreSelf, delete s._x_ignore, Li.forEach((a) => a(s)), s._x_ignore = !0, s._x_ignoreSelf = !0);
  t.forEach((s) => {
    delete s._x_ignoreSelf, delete s._x_ignore;
  }), t = null, n = null, r = null, i = null;
}
function Mi(e) {
  return Rt(Je(e));
}
function Lt(e, t, n) {
  return e._x_dataStack = [t, ...Je(n || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
  };
}
function Je(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? Je(e.host) : e.parentNode ? Je(e.parentNode) : [];
}
function Rt(e) {
  return new Proxy({ objects: e }, Ia);
}
var Ia = {
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
    return t == "toJSON" ? Oa : Reflect.get(
      e.find(
        (r) => Object.prototype.hasOwnProperty.call(r, t)
      ) || {},
      t,
      n
    );
  },
  set({ objects: e }, t, n, r) {
    const i = e.find(
      (a) => Object.prototype.hasOwnProperty.call(a, t)
    ) || e[e.length - 1], s = Object.getOwnPropertyDescriptor(i, t);
    return s != null && s.set && (s != null && s.get) ? Reflect.set(i, t, n, r) : Reflect.set(i, t, n);
  }
};
function Oa() {
  return Reflect.ownKeys(this).reduce((t, n) => (t[n] = Reflect.get(this, n), t), {});
}
function Fi(e) {
  let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null, n = (r, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([s, { value: a, enumerable: o }]) => {
      if (o === !1 || a === void 0)
        return;
      let u = i === "" ? s : `${i}.${s}`;
      typeof a == "object" && a !== null && a._x_interceptor ? r[s] = a.initialize(e, u, s) : t(a) && a !== r && !(a instanceof Element) && n(a, u);
    });
  };
  return n(e);
}
function $i(e, t = () => {
}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, s) {
      return e(this.initialValue, () => Ta(r, i), (a) => kn(r, i, a), i, s);
    }
  };
  return t(n), (r) => {
    if (typeof r == "object" && r !== null && r._x_interceptor) {
      let i = n.initialize.bind(n);
      n.initialize = (s, a, o) => {
        let u = r.initialize(s, a, o);
        return n.initialValue = u, i(s, a, o);
      };
    } else
      n.initialValue = r;
    return n;
  };
}
function Ta(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function kn(e, t, n) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = n;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), kn(e[t[0]], t.slice(1), n);
  }
}
var zi = {};
function fe(e, t) {
  zi[e] = t;
}
function Vn(e, t) {
  return Object.entries(zi).forEach(([n, r]) => {
    let i = null;
    function s() {
      if (i)
        return i;
      {
        let [a, o] = Wi(t);
        return i = { interceptor: $i, ...a }, ur(t, o), i;
      }
    }
    Object.defineProperty(e, `$${n}`, {
      get() {
        return r(t, s());
      },
      enumerable: !1
    });
  }), e;
}
function Ca(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    yt(i, e, t);
  }
}
function yt(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }), console.warn(`Alpine Expression Error: ${e.message}

${n ? 'Expression: "' + n + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var Xt = !0;
function ki(e) {
  let t = Xt;
  Xt = !1;
  let n = e();
  return Xt = t, n;
}
function Ve(e, t, n = {}) {
  let r;
  return ee(e, t)((i) => r = i, n), r;
}
function ee(...e) {
  return Vi(...e);
}
var Vi = ji;
function La(e) {
  Vi = e;
}
function ji(e, t) {
  let n = {};
  Vn(n, e);
  let r = [n, ...Je(e)], i = typeof t == "function" ? Ra(r, t) : Na(r, t, e);
  return Ca.bind(null, e, t, i);
}
function Ra(e, t) {
  return (n = () => {
  }, { scope: r = {}, params: i = [] } = {}) => {
    let s = t.apply(Rt([r, ...e]), i);
    rn(n, s);
  };
}
var On = {};
function Pa(e, t) {
  if (On[e])
    return On[e];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim()) ? `(async()=>{ ${e} })()` : e, s = (() => {
    try {
      let a = new n(
        ["__self", "scope"],
        `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
      );
      return Object.defineProperty(a, "name", {
        value: `[Alpine] ${e}`
      }), a;
    } catch (a) {
      return yt(a, t, e), Promise.resolve();
    }
  })();
  return On[e] = s, s;
}
function Na(e, t, n) {
  let r = Pa(t, n);
  return (i = () => {
  }, { scope: s = {}, params: a = [] } = {}) => {
    r.result = void 0, r.finished = !1;
    let o = Rt([s, ...e]);
    if (typeof r == "function") {
      let u = r(r, o).catch((l) => yt(l, n, t));
      r.finished ? (rn(i, r.result, o, a, n), r.result = void 0) : u.then((l) => {
        rn(i, l, o, a, n);
      }).catch((l) => yt(l, n, t)).finally(() => r.result = void 0);
    }
  };
}
function rn(e, t, n, r, i) {
  if (Xt && typeof t == "function") {
    let s = t.apply(n, r);
    s instanceof Promise ? s.then((a) => rn(e, a, n, r)).catch((a) => yt(a, i, t)) : e(s);
  } else
    typeof t == "object" && t instanceof Promise ? t.then((s) => e(s)) : e(t);
}
var vr = "x-";
function it(e = "") {
  return vr + e;
}
function Da(e) {
  vr = e;
}
var jn = {};
function q(e, t) {
  return jn[e] = t, {
    before(n) {
      if (!jn[n]) {
        console.warn(
          "Cannot find directive `${directive}`. `${name}` will use the default order of execution"
        );
        return;
      }
      const r = ze.indexOf(n);
      ze.splice(r >= 0 ? r : ze.indexOf("DEFAULT"), 0, e);
    }
  };
}
function pr(e, t, n) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let s = Object.entries(e._x_virtualDirectives).map(([o, u]) => ({ name: o, value: u })), a = Bi(s);
    s = s.map((o) => a.find((u) => u.name === o.name) ? {
      name: `x-bind:${o.name}`,
      value: `"${o.value}"`
    } : o), t = t.concat(s);
  }
  let r = {};
  return t.map(Gi((s, a) => r[s] = a)).filter(Yi).map($a(r, n)).sort(za).map((s) => Fa(e, s));
}
function Bi(e) {
  return Array.from(e).map(Gi()).filter((t) => !Yi(t));
}
var Bn = !1, ft = /* @__PURE__ */ new Map(), Ki = Symbol();
function Ma(e) {
  Bn = !0;
  let t = Symbol();
  Ki = t, ft.set(t, []);
  let n = () => {
    for (; ft.get(t).length; )
      ft.get(t).shift()();
    ft.delete(t);
  }, r = () => {
    Bn = !1, n();
  };
  e(n), r();
}
function Wi(e) {
  let t = [], n = (o) => t.push(o), [r, i] = _a(e);
  return t.push(i), [{
    Alpine: Nt,
    effect: r,
    cleanup: n,
    evaluateLater: ee.bind(ee, e),
    evaluate: Ve.bind(Ve, e)
  }, () => t.forEach((o) => o())];
}
function Fa(e, t) {
  let n = () => {
  }, r = jn[t.type] || n, [i, s] = Wi(e);
  Pi(e, t.original, s);
  let a = () => {
    e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, i), r = r.bind(r, e, t, i), Bn ? ft.get(Ki).push(r) : r());
  };
  return a.runCleanups = s, a;
}
var Ui = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }), Hi = (e) => e;
function Gi(e = () => {
}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = qi.reduce((s, a) => a(s), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var qi = [];
function _r(e) {
  qi.push(e);
}
function Yi({ name: e }) {
  return Xi().test(e);
}
var Xi = () => new RegExp(`^${vr}([^:^.]+)\\b`);
function $a(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(Xi()), s = n.match(/:([a-zA-Z0-9\-_:]+)/), a = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], o = t || e[n] || n;
    return {
      type: i ? i[1] : null,
      value: s ? s[1] : null,
      modifiers: a.map((u) => u.replace(".", "")),
      expression: r,
      original: o
    };
  };
}
var Kn = "DEFAULT", ze = [
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
  Kn,
  "teleport"
];
function za(e, t) {
  let n = ze.indexOf(e.type) === -1 ? Kn : e.type, r = ze.indexOf(t.type) === -1 ? Kn : t.type;
  return ze.indexOf(n) - ze.indexOf(r);
}
var Wn = [], gr = !1;
function mr(e = () => {
}) {
  return queueMicrotask(() => {
    gr || setTimeout(() => {
      Un();
    });
  }), new Promise((t) => {
    Wn.push(() => {
      e(), t();
    });
  });
}
function Un() {
  for (gr = !1; Wn.length; )
    Wn.shift()();
}
function ka() {
  gr = !0;
}
function yr(e, t) {
  return Array.isArray(t) ? Ur(e, t.join(" ")) : typeof t == "object" && t !== null ? Va(e, t) : typeof t == "function" ? yr(e, t()) : Ur(e, t);
}
function Ur(e, t) {
  let n = (i) => i.split(" ").filter((s) => !e.classList.contains(s)).filter(Boolean), r = (i) => (e.classList.add(...i), () => {
    e.classList.remove(...i);
  });
  return t = t === !0 ? t = "" : t || "", r(n(t));
}
function Va(e, t) {
  let n = (o) => o.split(" ").filter(Boolean), r = Object.entries(t).flatMap(([o, u]) => u ? n(o) : !1).filter(Boolean), i = Object.entries(t).flatMap(([o, u]) => u ? !1 : n(o)).filter(Boolean), s = [], a = [];
  return i.forEach((o) => {
    e.classList.contains(o) && (e.classList.remove(o), a.push(o));
  }), r.forEach((o) => {
    e.classList.contains(o) || (e.classList.add(o), s.push(o));
  }), () => {
    a.forEach((o) => e.classList.add(o)), s.forEach((o) => e.classList.remove(o));
  };
}
function dn(e, t) {
  return typeof t == "object" && t !== null ? ja(e, t) : Ba(e, t);
}
function ja(e, t) {
  let n = {};
  return Object.entries(t).forEach(([r, i]) => {
    n[r] = e.style[r], r.startsWith("--") || (r = Ka(r)), e.style.setProperty(r, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    dn(e, n);
  };
}
function Ba(e, t) {
  let n = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", n || "");
  };
}
function Ka(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Hn(e, t = () => {
}) {
  let n = !1;
  return function() {
    n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments));
  };
}
q("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r !== !1 && (!r || typeof r == "boolean" ? Ua(e, n, t) : Wa(e, r, t));
});
function Wa(e, t, n) {
  Zi(e, yr, ""), {
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
function Ua(e, t, n) {
  Zi(e, dn);
  let r = !t.includes("in") && !t.includes("out") && !n, i = r || t.includes("in") || ["enter"].includes(n), s = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((g, m) => m < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((g, m) => m > t.indexOf("out")));
  let a = !t.includes("opacity") && !t.includes("scale"), o = a || t.includes("opacity"), u = a || t.includes("scale"), l = o ? 0 : 1, c = u ? lt(t, "scale", 95) / 100 : 1, v = lt(t, "delay", 0) / 1e3, f = lt(t, "origin", "center"), _ = "opacity, transform", h = lt(t, "duration", 150) / 1e3, p = lt(t, "duration", 75) / 1e3, d = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = {
    transformOrigin: f,
    transitionDelay: `${v}s`,
    transitionProperty: _,
    transitionDuration: `${h}s`,
    transitionTimingFunction: d
  }, e._x_transition.enter.start = {
    opacity: l,
    transform: `scale(${c})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), s && (e._x_transition.leave.during = {
    transformOrigin: f,
    transitionDelay: `${v}s`,
    transitionProperty: _,
    transitionDuration: `${p}s`,
    transitionTimingFunction: d
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: l,
    transform: `scale(${c})`
  });
}
function Zi(e, t, n = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: n, start: n, end: n },
    leave: { during: n, start: n, end: n },
    in(r = () => {
    }, i = () => {
    }) {
      Gn(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, r, i);
    },
    out(r = () => {
    }, i = () => {
    }) {
      Gn(e, t, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, r, i);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, n, r) {
  const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let s = () => i(n);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(n) : s() : e._x_transition ? e._x_transition.in(n) : s();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((a, o) => {
    e._x_transition.out(() => {
    }, () => a(r)), e._x_transitioning && e._x_transitioning.beforeCancel(() => o({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(r), queueMicrotask(() => {
    let a = Ji(e);
    a ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(e)) : i(() => {
      let o = (u) => {
        let l = Promise.all([
          u._x_hidePromise,
          ...(u._x_hideChildren || []).map(o)
        ]).then(([c]) => c());
        return delete u._x_hidePromise, delete u._x_hideChildren, l;
      };
      o(e).catch((u) => {
        if (!u.isFromCancelledTransition)
          throw u;
      });
    });
  });
};
function Ji(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : Ji(t);
}
function Gn(e, t, { during: n, start: r, end: i } = {}, s = () => {
}, a = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0) {
    s(), a();
    return;
  }
  let o, u, l;
  Ha(e, {
    start() {
      o = t(e, r);
    },
    during() {
      u = t(e, n);
    },
    before: s,
    end() {
      o(), l = t(e, i);
    },
    after: a,
    cleanup() {
      u(), l();
    }
  });
}
function Ha(e, t) {
  let n, r, i, s = Hn(() => {
    Y(() => {
      n = !0, r || t.before(), i || (t.end(), Un()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(a) {
      this.beforeCancels.push(a);
    },
    cancel: Hn(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      s();
    }),
    finish: s
  }, Y(() => {
    t.start(), t.during();
  }), ka(), requestAnimationFrame(() => {
    if (n)
      return;
    let a = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, o = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    a === 0 && (a = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), Y(() => {
      t.before();
    }), r = !0, requestAnimationFrame(() => {
      n || (Y(() => {
        t.end();
      }), Un(), setTimeout(e._x_transitioning.finish, a + o), i = !0);
    });
  });
}
function lt(e, t, n) {
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
var Te = !1;
function Pt(e, t = () => {
}) {
  return (...n) => Te ? t(...n) : e(...n);
}
function Ga(e) {
  return (...t) => Te && e(...t);
}
var Qi = [];
function es(e) {
  Qi.push(e);
}
function qa(e, t) {
  Qi.forEach((n) => n(e, t)), Te = !0, ts(() => {
    we(t, (n, r) => {
      r(n, () => {
      });
    });
  }), Te = !1;
}
var qn = !1;
function Ya(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), Te = !0, qn = !0, ts(() => {
    Xa(t);
  }), Te = !1, qn = !1;
}
function Xa(e) {
  let t = !1;
  we(e, (r, i) => {
    Oe(r, (s, a) => {
      if (t && ma(s))
        return a();
      t = !0, i(s, a);
    });
  });
}
function ts(e) {
  let t = rt;
  Kr((n, r) => {
    let i = t(n);
    return Ct(i), () => {
    };
  }), e(), Kr(t);
}
function ns(e, t, n, r = []) {
  switch (e._x_bindings || (e._x_bindings = nt({})), e._x_bindings[t] = n, t = r.includes("camel") ? io(t) : t, t) {
    case "value":
      Za(e, n);
      break;
    case "style":
      Qa(e, n);
      break;
    case "class":
      Ja(e, n);
      break;
    case "selected":
    case "checked":
      eo(e, t, n);
      break;
    default:
      rs(e, t, n);
      break;
  }
}
function Za(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (typeof t == "boolean" ? e.checked = Zt(e.value) === t : e.checked = Hr(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => Hr(n, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    ro(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t === void 0 ? "" : t;
  }
}
function Ja(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = yr(e, t);
}
function Qa(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = dn(e, t);
}
function eo(e, t, n) {
  rs(e, t, n), no(e, t, n);
}
function rs(e, t, n) {
  [null, void 0, !1].includes(n) && so(t) ? e.removeAttribute(t) : (is(t) && (n = t), to(e, t, n));
}
function to(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function no(e, t, n) {
  e[t] !== n && (e[t] = n);
}
function ro(e, t) {
  const n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function io(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Hr(e, t) {
  return e == t;
}
function Zt(e) {
  return [1, "1", "true", "on", "yes", !0].includes(e) ? !0 : [0, "0", "false", "off", "no", !1].includes(e) ? !1 : e ? !!e : null;
}
function is(e) {
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
function so(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function ao(e, t, n) {
  return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : ss(e, t, n);
}
function oo(e, t, n, r = !0) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
    let i = e._x_inlineBindings[t];
    return i.extract = r, ki(() => Ve(e, i.expression));
  }
  return ss(e, t, n);
}
function ss(e, t, n) {
  let r = e.getAttribute(t);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : is(t) ? !![t, "true"].includes(r) : r;
}
function as(e, t) {
  var n;
  return function() {
    var r = this, i = arguments, s = function() {
      n = null, e.apply(r, i);
    };
    clearTimeout(n), n = setTimeout(s, t);
  };
}
function os(e, t) {
  let n;
  return function() {
    let r = this, i = arguments;
    n || (e.apply(r, i), n = !0, setTimeout(() => n = !1, t));
  };
}
function us({ get: e, set: t }, { get: n, set: r }) {
  let i = !0, s, a = rt(() => {
    const o = e(), u = n();
    if (i)
      r(Tn(o)), i = !1, s = JSON.stringify(o);
    else {
      const l = JSON.stringify(o);
      l !== s ? (r(Tn(o)), s = l) : (t(Tn(u)), s = JSON.stringify(u));
    }
    JSON.stringify(n()), JSON.stringify(e());
  });
  return () => {
    Ct(a);
  };
}
function Tn(e) {
  return typeof e == "object" ? JSON.parse(JSON.stringify(e)) : e;
}
function uo(e) {
  (Array.isArray(e) ? e : [e]).forEach((n) => n(Nt));
}
var $e = {}, Gr = !1;
function lo(e, t) {
  if (Gr || ($e = nt($e), Gr = !0), t === void 0)
    return $e[e];
  $e[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && $e[e].init(), Fi($e[e]);
}
function co() {
  return $e;
}
var ls = {};
function fo(e, t) {
  let n = typeof t != "function" ? () => t : t;
  return e instanceof Element ? cs(e, n()) : (ls[e] = n, () => {
  });
}
function ho(e) {
  return Object.entries(ls).forEach(([t, n]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...r) => n(...r);
      }
    });
  }), e;
}
function cs(e, t, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let i = Object.entries(t).map(([a, o]) => ({ name: a, value: o })), s = Bi(i);
  return i = i.map((a) => s.find((o) => o.name === a.name) ? {
    name: `x-bind:${a.name}`,
    value: `"${a.value}"`
  } : a), pr(e, i, n).map((a) => {
    r.push(a.runCleanups), a();
  }), () => {
    for (; r.length; )
      r.pop()();
  };
}
var fs = {};
function vo(e, t) {
  fs[e] = t;
}
function po(e, t) {
  return Object.entries(fs).forEach(([n, r]) => {
    Object.defineProperty(e, n, {
      get() {
        return (...i) => r.bind(t)(...i);
      },
      enumerable: !1
    });
  }), e;
}
var _o = {
  get reactive() {
    return nt;
  },
  get release() {
    return Ct;
  },
  get effect() {
    return rt;
  },
  get raw() {
    return bi;
  },
  version: "3.13.3",
  flushAndStopDeferringMutations: xa,
  dontAutoEvaluateFunctions: ki,
  disableEffectScheduling: va,
  startObservingMutations: fr,
  stopObservingMutations: Di,
  setReactivityEngine: pa,
  onAttributeRemoved: Pi,
  onAttributesAdded: Ri,
  closestDataStack: Je,
  skipDuringClone: Pt,
  onlyDuringClone: Ga,
  addRootSelector: xi,
  addInitSelector: Ii,
  interceptClone: es,
  addScopeToNode: Lt,
  deferMutations: Sa,
  mapAttributes: _r,
  evaluateLater: ee,
  interceptInit: ya,
  setEvaluator: La,
  mergeProxies: Rt,
  extractProp: oo,
  findClosest: fn,
  onElRemoved: ur,
  closestRoot: cn,
  destroyTree: or,
  interceptor: $i,
  // INTERNAL: not public API and is subject to change without major release.
  transition: Gn,
  // INTERNAL
  setStyles: dn,
  // INTERNAL
  mutateDom: Y,
  directive: q,
  entangle: us,
  throttle: os,
  debounce: as,
  evaluate: Ve,
  initTree: we,
  nextTick: mr,
  prefixed: it,
  prefix: Da,
  plugin: uo,
  magic: fe,
  store: lo,
  start: ga,
  clone: Ya,
  // INTERNAL
  cloneNode: qa,
  // INTERNAL
  bound: ao,
  $data: Mi,
  walk: Oe,
  data: vo,
  bind: fo
}, Nt = _o;
function go(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var mo = Object.freeze({}), yo = Object.prototype.hasOwnProperty, hn = (e, t) => yo.call(e, t), je = Array.isArray, _t = (e) => ds(e) === "[object Map]", Eo = (e) => typeof e == "string", Er = (e) => typeof e == "symbol", vn = (e) => e !== null && typeof e == "object", bo = Object.prototype.toString, ds = (e) => bo.call(e), hs = (e) => ds(e).slice(8, -1), br = (e) => Eo(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, wo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ao = wo((e) => e.charAt(0).toUpperCase() + e.slice(1)), vs = (e, t) => e !== t && (e === e || t === t), Yn = /* @__PURE__ */ new WeakMap(), ct = [], he, Be = Symbol("iterate"), Xn = Symbol("Map key iterate");
function So(e) {
  return e && e._isEffect === !0;
}
function xo(e, t = mo) {
  So(e) && (e = e.raw);
  const n = To(e, t);
  return t.lazy || n(), n;
}
function Io(e) {
  e.active && (ps(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var Oo = 0;
function To(e, t) {
  const n = function() {
    if (!n.active)
      return e();
    if (!ct.includes(n)) {
      ps(n);
      try {
        return Lo(), ct.push(n), he = n, e();
      } finally {
        ct.pop(), _s(), he = ct[ct.length - 1];
      }
    }
  };
  return n.id = Oo++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n;
}
function ps(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
var Qe = !0, wr = [];
function Co() {
  wr.push(Qe), Qe = !1;
}
function Lo() {
  wr.push(Qe), Qe = !0;
}
function _s() {
  const e = wr.pop();
  Qe = e === void 0 ? !0 : e;
}
function ce(e, t, n) {
  if (!Qe || he === void 0)
    return;
  let r = Yn.get(e);
  r || Yn.set(e, r = /* @__PURE__ */ new Map());
  let i = r.get(n);
  i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(he) || (i.add(he), he.deps.push(i), he.options.onTrack && he.options.onTrack({
    effect: he,
    target: e,
    type: t,
    key: n
  }));
}
function Ce(e, t, n, r, i, s) {
  const a = Yn.get(e);
  if (!a)
    return;
  const o = /* @__PURE__ */ new Set(), u = (c) => {
    c && c.forEach((v) => {
      (v !== he || v.allowRecurse) && o.add(v);
    });
  };
  if (t === "clear")
    a.forEach(u);
  else if (n === "length" && je(e))
    a.forEach((c, v) => {
      (v === "length" || v >= r) && u(c);
    });
  else
    switch (n !== void 0 && u(a.get(n)), t) {
      case "add":
        je(e) ? br(n) && u(a.get("length")) : (u(a.get(Be)), _t(e) && u(a.get(Xn)));
        break;
      case "delete":
        je(e) || (u(a.get(Be)), _t(e) && u(a.get(Xn)));
        break;
      case "set":
        _t(e) && u(a.get(Be));
        break;
    }
  const l = (c) => {
    c.options.onTrigger && c.options.onTrigger({
      effect: c,
      target: e,
      key: n,
      type: t,
      newValue: r,
      oldValue: i,
      oldTarget: s
    }), c.options.scheduler ? c.options.scheduler(c) : c();
  };
  o.forEach(l);
}
var Ro = /* @__PURE__ */ go("__proto__,__v_isRef,__isVue"), gs = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(Er)), Po = /* @__PURE__ */ ms(), No = /* @__PURE__ */ ms(!0), qr = /* @__PURE__ */ Do();
function Do() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = B(this);
      for (let s = 0, a = this.length; s < a; s++)
        ce(r, "get", s + "");
      const i = r[t](...n);
      return i === -1 || i === !1 ? r[t](...n.map(B)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Co();
      const r = B(this)[t].apply(this, n);
      return _s(), r;
    };
  }), e;
}
function ms(e = !1, t = !1) {
  return function(r, i, s) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && s === (e ? t ? Xo : ws : t ? Yo : bs).get(r))
      return r;
    const a = je(r);
    if (!e && a && hn(qr, i))
      return Reflect.get(qr, i, s);
    const o = Reflect.get(r, i, s);
    return (Er(i) ? gs.has(i) : Ro(i)) || (e || ce(r, "get", i), t) ? o : Zn(o) ? !a || !br(i) ? o.value : o : vn(o) ? e ? As(o) : Ir(o) : o;
  };
}
var Mo = /* @__PURE__ */ Fo();
function Fo(e = !1) {
  return function(n, r, i, s) {
    let a = n[r];
    if (!e && (i = B(i), a = B(a), !je(n) && Zn(a) && !Zn(i)))
      return a.value = i, !0;
    const o = je(n) && br(r) ? Number(r) < n.length : hn(n, r), u = Reflect.set(n, r, i, s);
    return n === B(s) && (o ? vs(i, a) && Ce(n, "set", r, i, a) : Ce(n, "add", r, i)), u;
  };
}
function $o(e, t) {
  const n = hn(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
  return i && n && Ce(e, "delete", t, void 0, r), i;
}
function zo(e, t) {
  const n = Reflect.has(e, t);
  return (!Er(t) || !gs.has(t)) && ce(e, "has", t), n;
}
function ko(e) {
  return ce(e, "iterate", je(e) ? "length" : Be), Reflect.ownKeys(e);
}
var Vo = {
  get: Po,
  set: Mo,
  deleteProperty: $o,
  has: zo,
  ownKeys: ko
}, jo = {
  get: No,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Ar = (e) => vn(e) ? Ir(e) : e, Sr = (e) => vn(e) ? As(e) : e, xr = (e) => e, pn = (e) => Reflect.getPrototypeOf(e);
function Kt(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = B(e), s = B(t);
  t !== s && !n && ce(i, "get", t), !n && ce(i, "get", s);
  const { has: a } = pn(i), o = r ? xr : n ? Sr : Ar;
  if (a.call(i, t))
    return o(e.get(t));
  if (a.call(i, s))
    return o(e.get(s));
  e !== i && e.get(t);
}
function Wt(e, t = !1) {
  const n = this.__v_raw, r = B(n), i = B(e);
  return e !== i && !t && ce(r, "has", e), !t && ce(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Ut(e, t = !1) {
  return e = e.__v_raw, !t && ce(B(e), "iterate", Be), Reflect.get(e, "size", e);
}
function Yr(e) {
  e = B(e);
  const t = B(this);
  return pn(t).has.call(t, e) || (t.add(e), Ce(t, "add", e, e)), this;
}
function Xr(e, t) {
  t = B(t);
  const n = B(this), { has: r, get: i } = pn(n);
  let s = r.call(n, e);
  s ? Es(n, r, e) : (e = B(e), s = r.call(n, e));
  const a = i.call(n, e);
  return n.set(e, t), s ? vs(t, a) && Ce(n, "set", e, t, a) : Ce(n, "add", e, t), this;
}
function Zr(e) {
  const t = B(this), { has: n, get: r } = pn(t);
  let i = n.call(t, e);
  i ? Es(t, n, e) : (e = B(e), i = n.call(t, e));
  const s = r ? r.call(t, e) : void 0, a = t.delete(e);
  return i && Ce(t, "delete", e, void 0, s), a;
}
function Jr() {
  const e = B(this), t = e.size !== 0, n = _t(e) ? new Map(e) : new Set(e), r = e.clear();
  return t && Ce(e, "clear", void 0, void 0, n), r;
}
function Ht(e, t) {
  return function(r, i) {
    const s = this, a = s.__v_raw, o = B(a), u = t ? xr : e ? Sr : Ar;
    return !e && ce(o, "iterate", Be), a.forEach((l, c) => r.call(i, u(l), u(c), s));
  };
}
function Gt(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, s = B(i), a = _t(s), o = e === "entries" || e === Symbol.iterator && a, u = e === "keys" && a, l = i[e](...r), c = n ? xr : t ? Sr : Ar;
    return !t && ce(s, "iterate", u ? Xn : Be), {
      // iterator protocol
      next() {
        const { value: v, done: f } = l.next();
        return f ? { value: v, done: f } : {
          value: o ? [c(v[0]), c(v[1])] : c(v),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function xe(e) {
  return function(...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${Ao(e)} operation ${n}failed: target is readonly.`, B(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function Bo() {
  const e = {
    get(s) {
      return Kt(this, s);
    },
    get size() {
      return Ut(this);
    },
    has: Wt,
    add: Yr,
    set: Xr,
    delete: Zr,
    clear: Jr,
    forEach: Ht(!1, !1)
  }, t = {
    get(s) {
      return Kt(this, s, !1, !0);
    },
    get size() {
      return Ut(this);
    },
    has: Wt,
    add: Yr,
    set: Xr,
    delete: Zr,
    clear: Jr,
    forEach: Ht(!1, !0)
  }, n = {
    get(s) {
      return Kt(this, s, !0);
    },
    get size() {
      return Ut(this, !0);
    },
    has(s) {
      return Wt.call(this, s, !0);
    },
    add: xe(
      "add"
      /* ADD */
    ),
    set: xe(
      "set"
      /* SET */
    ),
    delete: xe(
      "delete"
      /* DELETE */
    ),
    clear: xe(
      "clear"
      /* CLEAR */
    ),
    forEach: Ht(!0, !1)
  }, r = {
    get(s) {
      return Kt(this, s, !0, !0);
    },
    get size() {
      return Ut(this, !0);
    },
    has(s) {
      return Wt.call(this, s, !0);
    },
    add: xe(
      "add"
      /* ADD */
    ),
    set: xe(
      "set"
      /* SET */
    ),
    delete: xe(
      "delete"
      /* DELETE */
    ),
    clear: xe(
      "clear"
      /* CLEAR */
    ),
    forEach: Ht(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = Gt(s, !1, !1), n[s] = Gt(s, !0, !1), t[s] = Gt(s, !1, !0), r[s] = Gt(s, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
var [Ko, Wo, Uo, Ho] = /* @__PURE__ */ Bo();
function ys(e, t) {
  const n = t ? e ? Ho : Uo : e ? Wo : Ko;
  return (r, i, s) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(hn(n, i) && i in r ? n : r, i, s);
}
var Go = {
  get: /* @__PURE__ */ ys(!1, !1)
}, qo = {
  get: /* @__PURE__ */ ys(!0, !1)
};
function Es(e, t, n) {
  const r = B(n);
  if (r !== n && t.call(e, r)) {
    const i = hs(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var bs = /* @__PURE__ */ new WeakMap(), Yo = /* @__PURE__ */ new WeakMap(), ws = /* @__PURE__ */ new WeakMap(), Xo = /* @__PURE__ */ new WeakMap();
function Zo(e) {
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
function Jo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Zo(hs(e));
}
function Ir(e) {
  return e && e.__v_isReadonly ? e : Ss(e, !1, Vo, Go, bs);
}
function As(e) {
  return Ss(e, !0, jo, qo, ws);
}
function Ss(e, t, n, r, i) {
  if (!vn(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = i.get(e);
  if (s)
    return s;
  const a = Jo(e);
  if (a === 0)
    return e;
  const o = new Proxy(e, a === 2 ? r : n);
  return i.set(e, o), o;
}
function B(e) {
  return e && B(e.__v_raw) || e;
}
function Zn(e) {
  return !!(e && e.__v_isRef === !0);
}
fe("nextTick", () => mr);
fe("dispatch", (e) => vt.bind(vt, e));
fe("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let s = t(r), a = !0, o, u = n(() => s((l) => {
    JSON.stringify(l), a ? o = l : queueMicrotask(() => {
      i(l, o), o = l;
    }), a = !1;
  }));
  e._x_effects.delete(u);
});
fe("store", co);
fe("data", (e) => Mi(e));
fe("root", (e) => cn(e));
fe("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = Rt(Qo(e))), e._x_refs_proxy));
function Qo(e) {
  let t = [], n = e;
  for (; n; )
    n._x_refs && t.push(n._x_refs), n = n.parentNode;
  return t;
}
var Cn = {};
function xs(e) {
  return Cn[e] || (Cn[e] = 0), ++Cn[e];
}
function eu(e, t) {
  return fn(e, (n) => {
    if (n._x_ids && n._x_ids[t])
      return !0;
  });
}
function tu(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = xs(t));
}
fe("id", (e) => (t, n = null) => {
  let r = eu(e, t), i = r ? r._x_ids[t] : xs(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
fe("el", (e) => e);
Is("Focus", "focus", "focus");
Is("Persist", "persist", "persist");
function Is(e, t, n) {
  fe(t, (r) => be(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
q("modelable", (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
  let s = r(t), a = () => {
    let c;
    return s((v) => c = v), c;
  }, o = r(`${t} = __placeholder`), u = (c) => o(() => {
  }, { scope: { __placeholder: c } }), l = a();
  u(l), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let c = e._x_model.get, v = e._x_model.set, f = us(
      {
        get() {
          return c();
        },
        set(_) {
          v(_);
        }
      },
      {
        get() {
          return a();
        },
        set(_) {
          u(_);
        }
      }
    );
    i(f);
  });
});
q("teleport", (e, { modifiers: t, expression: n }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && be("x-teleport can only be used on a <template> tag", e);
  let i = Qr(n), s = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = s, s._x_teleportBack = e, e.setAttribute("data-teleport-template", !0), s.setAttribute("data-teleport-target", !0), e._x_forwardEvents && e._x_forwardEvents.forEach((o) => {
    s.addEventListener(o, (u) => {
      u.stopPropagation(), e.dispatchEvent(new u.constructor(u.type, u));
    });
  }), Lt(s, {}, e);
  let a = (o, u, l) => {
    l.includes("prepend") ? u.parentNode.insertBefore(o, u) : l.includes("append") ? u.parentNode.insertBefore(o, u.nextSibling) : u.appendChild(o);
  };
  Y(() => {
    a(s, i, t), we(s), s._x_ignore = !0;
  }), e._x_teleportPutBack = () => {
    let o = Qr(n);
    Y(() => {
      a(e._x_teleport, o, t);
    });
  }, r(() => s.remove());
});
var nu = document.createElement("div");
function Qr(e) {
  let t = Pt(() => document.querySelector(e), () => nu)();
  return t || be(`Cannot find x-teleport element for selector: "${e}"`), t;
}
var Os = () => {
};
Os.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, n(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
q("ignore", Os);
q("effect", Pt((e, { expression: t }, { effect: n }) => {
  n(ee(e, t));
}));
function Jn(e, t, n, r) {
  let i = e, s = (u) => r(u), a = {}, o = (u, l) => (c) => l(u, c);
  if (n.includes("dot") && (t = ru(t)), n.includes("camel") && (t = iu(t)), n.includes("passive") && (a.passive = !0), n.includes("capture") && (a.capture = !0), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("debounce")) {
    let u = n[n.indexOf("debounce") + 1] || "invalid-wait", l = sn(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    s = as(s, l);
  }
  if (n.includes("throttle")) {
    let u = n[n.indexOf("throttle") + 1] || "invalid-wait", l = sn(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    s = os(s, l);
  }
  return n.includes("prevent") && (s = o(s, (u, l) => {
    l.preventDefault(), u(l);
  })), n.includes("stop") && (s = o(s, (u, l) => {
    l.stopPropagation(), u(l);
  })), n.includes("self") && (s = o(s, (u, l) => {
    l.target === e && u(l);
  })), (n.includes("away") || n.includes("outside")) && (i = document, s = o(s, (u, l) => {
    e.contains(l.target) || l.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && u(l));
  })), n.includes("once") && (s = o(s, (u, l) => {
    u(l), i.removeEventListener(t, s, a);
  })), s = o(s, (u, l) => {
    au(t) && ou(l, n) || u(l);
  }), i.addEventListener(t, s, a), () => {
    i.removeEventListener(t, s, a);
  };
}
function ru(e) {
  return e.replace(/-/g, ".");
}
function iu(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function sn(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function su(e) {
  return [" ", "_"].includes(
    e
  ) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function au(e) {
  return ["keydown", "keyup"].includes(e);
}
function ou(e, t) {
  let n = t.filter((s) => !["window", "document", "prevent", "stop", "once", "capture"].includes(s));
  if (n.includes("debounce")) {
    let s = n.indexOf("debounce");
    n.splice(s, sn((n[s + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.includes("throttle")) {
    let s = n.indexOf("throttle");
    n.splice(s, sn((n[s + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && ei(e.key).includes(n[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((s) => n.includes(s));
  return n = n.filter((s) => !i.includes(s)), !(i.length > 0 && i.filter((a) => ((a === "cmd" || a === "super") && (a = "meta"), e[`${a}Key`])).length === i.length && ei(e.key).includes(n[0]));
}
function ei(e) {
  if (!e)
    return [];
  e = su(e);
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
  let s = e;
  t.includes("parent") && (s = e.parentNode);
  let a = ee(s, n), o;
  typeof n == "string" ? o = ee(s, `${n} = __placeholder`) : typeof n == "function" && typeof n() == "string" ? o = ee(s, `${n()} = __placeholder`) : o = () => {
  };
  let u = () => {
    let f;
    return a((_) => f = _), ti(f) ? f.get() : f;
  }, l = (f) => {
    let _;
    a((h) => _ = h), ti(_) ? _.set(f) : o(() => {
    }, {
      scope: { __placeholder: f }
    });
  };
  typeof n == "string" && e.type === "radio" && Y(() => {
    e.hasAttribute("name") || e.setAttribute("name", n);
  });
  var c = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let v = Te ? () => {
  } : Jn(e, c, t, (f) => {
    l(uu(e, t, f, u()));
  });
  if (t.includes("fill") && ([null, ""].includes(u()) || e.type === "checkbox" && Array.isArray(u())) && e.dispatchEvent(new Event(c, {})), e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = v, i(() => e._x_removeModelListeners.default()), e.form) {
    let f = Jn(e.form, "reset", [], (_) => {
      mr(() => e._x_model && e._x_model.set(e.value));
    });
    i(() => f());
  }
  e._x_model = {
    get() {
      return u();
    },
    set(f) {
      l(f);
    }
  }, e._x_forceModelUpdate = (f) => {
    f === void 0 && typeof n == "string" && n.match(/\./) && (f = ""), window.fromModel = !0, Y(() => ns(e, "value", f)), delete window.fromModel;
  }, r(() => {
    let f = u();
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(f);
  });
});
function uu(e, t, n, r) {
  return Y(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail !== null && n.detail !== void 0 ? n.detail : n.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(r)) {
        let i = null;
        return t.includes("number") ? i = Ln(n.target.value) : t.includes("boolean") ? i = Zt(n.target.value) : i = n.target.value, n.target.checked ? r.concat([i]) : r.filter((s) => !lu(s, i));
      } else
        return n.target.checked;
    else
      return e.tagName.toLowerCase() === "select" && e.multiple ? t.includes("number") ? Array.from(n.target.selectedOptions).map((i) => {
        let s = i.value || i.text;
        return Ln(s);
      }) : t.includes("boolean") ? Array.from(n.target.selectedOptions).map((i) => {
        let s = i.value || i.text;
        return Zt(s);
      }) : Array.from(n.target.selectedOptions).map((i) => i.value || i.text) : t.includes("number") ? Ln(n.target.value) : t.includes("boolean") ? Zt(n.target.value) : t.includes("trim") ? n.target.value.trim() : n.target.value;
  });
}
function Ln(e) {
  let t = e ? parseFloat(e) : null;
  return cu(t) ? t : e;
}
function lu(e, t) {
  return e == t;
}
function cu(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function ti(e) {
  return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function";
}
q("cloak", (e) => queueMicrotask(() => Y(() => e.removeAttribute(it("cloak")))));
Ii(() => `[${it("init")}]`);
q("init", Pt((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)));
q("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((s) => {
      Y(() => {
        e.textContent = s;
      });
    });
  });
});
q("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((s) => {
      Y(() => {
        e.innerHTML = s, e._x_ignoreSelf = !0, we(e), delete e._x_ignoreSelf;
      });
    });
  });
});
_r(Ui(":", Hi(it("bind:"))));
var Ts = (e, { value: t, modifiers: n, expression: r, original: i }, { effect: s }) => {
  if (!t) {
    let o = {};
    ho(o), ee(e, r)((l) => {
      cs(e, l, i);
    }, { scope: o });
    return;
  }
  if (t === "key")
    return fu(e, r);
  if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract)
    return;
  let a = ee(e, r);
  s(() => a((o) => {
    o === void 0 && typeof r == "string" && r.match(/\./) && (o = ""), Y(() => ns(e, t, o, n));
  }));
};
Ts.inline = (e, { value: t, modifiers: n, expression: r }) => {
  t && (e._x_inlineBindings || (e._x_inlineBindings = {}), e._x_inlineBindings[t] = { expression: r, extract: !1 });
};
q("bind", Ts);
function fu(e, t) {
  e._x_keyExpression = t;
}
xi(() => `[${it("data")}]`);
q("data", (e, { expression: t }, { cleanup: n }) => {
  if (du(e))
    return;
  t = t === "" ? "{}" : t;
  let r = {};
  Vn(r, e);
  let i = {};
  po(i, r);
  let s = Ve(e, t, { scope: i });
  (s === void 0 || s === !0) && (s = {}), Vn(s, e);
  let a = nt(s);
  Fi(a);
  let o = Lt(e, a);
  a.init && Ve(e, a.init), n(() => {
    a.destroy && Ve(e, a.destroy), o();
  });
});
es((e, t) => {
  e._x_dataStack && (t._x_dataStack = e._x_dataStack, t.setAttribute("data-has-alpine-state", !0));
});
function du(e) {
  return Te ? qn ? !0 : e.hasAttribute("data-has-alpine-state") : !1;
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
  let s = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, a = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, o = () => setTimeout(a), u = Hn(
    (v) => v ? a() : s(),
    (v) => {
      typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, v, a, s) : v ? o() : s();
    }
  ), l, c = !0;
  r(() => i((v) => {
    !c && v === l || (t.includes("immediate") && (v ? o() : s()), u(v), l = v, c = !1);
  }));
});
q("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = vu(t), s = ee(e, i.items), a = ee(
    e,
    // the x-bind:key expression is stored for our use instead of evaluated.
    e._x_keyExpression || "index"
  );
  e._x_prevKeys = [], e._x_lookup = {}, n(() => hu(e, i, s, a)), r(() => {
    Object.values(e._x_lookup).forEach((o) => o.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function hu(e, t, n, r) {
  let i = (a) => typeof a == "object" && !Array.isArray(a), s = e;
  n((a) => {
    pu(a) && a >= 0 && (a = Array.from(Array(a).keys(), (d) => d + 1)), a === void 0 && (a = []);
    let o = e._x_lookup, u = e._x_prevKeys, l = [], c = [];
    if (i(a))
      a = Object.entries(a).map(([d, g]) => {
        let m = ni(t, g, d, a);
        r((y) => c.push(y), { scope: { index: d, ...m } }), l.push(m);
      });
    else
      for (let d = 0; d < a.length; d++) {
        let g = ni(t, a[d], d, a);
        r((m) => c.push(m), { scope: { index: d, ...g } }), l.push(g);
      }
    let v = [], f = [], _ = [], h = [];
    for (let d = 0; d < u.length; d++) {
      let g = u[d];
      c.indexOf(g) === -1 && _.push(g);
    }
    u = u.filter((d) => !_.includes(d));
    let p = "template";
    for (let d = 0; d < c.length; d++) {
      let g = c[d], m = u.indexOf(g);
      if (m === -1)
        u.splice(d, 0, g), v.push([p, d]);
      else if (m !== d) {
        let y = u.splice(d, 1)[0], T = u.splice(m - 1, 1)[0];
        u.splice(d, 0, T), u.splice(m, 0, y), f.push([y, T]);
      } else
        h.push(g);
      p = g;
    }
    for (let d = 0; d < _.length; d++) {
      let g = _[d];
      o[g]._x_effects && o[g]._x_effects.forEach(Ei), o[g].remove(), o[g] = null, delete o[g];
    }
    for (let d = 0; d < f.length; d++) {
      let [g, m] = f[d], y = o[g], T = o[m], x = document.createElement("div");
      Y(() => {
        T || be('x-for ":key" is undefined or invalid', s), T.after(x), y.after(T), T._x_currentIfEl && T.after(T._x_currentIfEl), x.before(y), y._x_currentIfEl && y.after(y._x_currentIfEl), x.remove();
      }), T._x_refreshXForScope(l[c.indexOf(m)]);
    }
    for (let d = 0; d < v.length; d++) {
      let [g, m] = v[d], y = g === "template" ? s : o[g];
      y._x_currentIfEl && (y = y._x_currentIfEl);
      let T = l[m], x = c[m], N = document.importNode(s.content, !0).firstElementChild, E = nt(T);
      Lt(N, E, s), N._x_refreshXForScope = (C) => {
        Object.entries(C).forEach(([$, P]) => {
          E[$] = P;
        });
      }, Y(() => {
        y.after(N), we(N);
      }), typeof x == "object" && be("x-for key cannot be an object, it must be a string or an integer", s), o[x] = N;
    }
    for (let d = 0; d < h.length; d++)
      o[h[d]]._x_refreshXForScope(l[c.indexOf(h[d])]);
    s._x_prevKeys = c;
  });
}
function vu(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(r);
  if (!i)
    return;
  let s = {};
  s.items = i[2].trim();
  let a = i[1].replace(n, "").trim(), o = a.match(t);
  return o ? (s.item = a.replace(t, "").trim(), s.index = o[1].trim(), o[2] && (s.collection = o[2].trim())) : s.item = a, s;
}
function ni(e, t, n, r) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((a) => a.trim()).forEach((a, o) => {
    i[a] = t[o];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((a) => a.trim()).forEach((a) => {
    i[a] = t[a];
  }) : i[e.item] = t, e.index && (i[e.index] = n), e.collection && (i[e.collection] = r), i;
}
function pu(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Cs() {
}
Cs.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = cn(e);
  r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
};
q("ref", Cs);
q("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && be("x-if can only be used on a <template> tag", e);
  let i = ee(e, t), s = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let o = e.content.cloneNode(!0).firstElementChild;
    return Lt(o, {}, e), Y(() => {
      e.after(o), we(o);
    }), e._x_currentIfEl = o, e._x_undoIf = () => {
      Oe(o, (u) => {
        u._x_effects && u._x_effects.forEach(Ei);
      }), o.remove(), delete e._x_currentIfEl;
    }, o;
  }, a = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  n(() => i((o) => {
    o ? s() : a();
  })), r(() => e._x_undoIf && e._x_undoIf());
});
q("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => tu(e, i));
});
_r(Ui("@", Hi(it("on:"))));
q("on", Pt((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
  let s = r ? ee(e, r) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let a = Jn(e, t, n, (o) => {
    s(() => {
    }, { scope: { $event: o }, params: [o] });
  });
  i(() => a());
}));
_n("Collapse", "collapse", "collapse");
_n("Intersect", "intersect", "intersect");
_n("Focus", "trap", "focus");
_n("Mask", "mask", "mask");
function _n(e, t, n) {
  q(t, (r) => be(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
Nt.setEvaluator(ji);
Nt.setReactivityEngine({ reactive: Ir, effect: xo, release: Io, raw: B });
var _u = Nt, Et = _u;
function gu(e) {
  e.directive("intersect", (t, { value: n, expression: r, modifiers: i }, { evaluateLater: s, cleanup: a }) => {
    let o = s(r), u = {
      rootMargin: Eu(i),
      threshold: mu(i)
    }, l = new IntersectionObserver((c) => {
      c.forEach((v) => {
        v.isIntersecting !== (n === "leave") && (o(), i.includes("once") && l.disconnect());
      });
    }, u);
    l.observe(t), a(() => {
      l.disconnect();
    });
  });
}
function mu(e) {
  if (e.includes("full"))
    return 0.99;
  if (e.includes("half"))
    return 0.5;
  if (!e.includes("threshold"))
    return 0;
  let t = e[e.indexOf("threshold") + 1];
  return t === "100" ? 1 : t === "0" ? 0 : +`.${t}`;
}
function yu(e) {
  let t = e.match(/^(-?[0-9]+)(px|%)?$/);
  return t ? t[1] + (t[2] || "px") : void 0;
}
function Eu(e) {
  const t = "margin", n = "0px 0px 0px 0px", r = e.indexOf(t);
  if (r === -1)
    return n;
  let i = [];
  for (let s = 1; s < 5; s++)
    i.push(yu(e[r + s] || ""));
  return i = i.filter((s) => s !== void 0), i.length ? i.join(" ").trim() : n;
}
var Ls = gu;
function ri(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function bu(e, t, n) {
  return t && ri(e.prototype, t), n && ri(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
var ii = "(prefers-reduced-motion: reduce)", Ye = 1, wu = 2, et = 3, st = 4, Dt = 5, Jt = 6, an = 7, Au = {
  CREATED: Ye,
  MOUNTED: wu,
  IDLE: et,
  MOVING: st,
  SCROLLING: Dt,
  DRAGGING: Jt,
  DESTROYED: an
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
var Rs = setTimeout, Qn = function() {
};
function si(e) {
  return requestAnimationFrame(e);
}
function gn(e, t) {
  return typeof t === e;
}
function bt(e) {
  return !Tr(e) && gn("object", e);
}
var Or = Array.isArray, Ps = j(gn, "function"), Le = j(gn, "string"), Mt = j(gn, "undefined");
function Tr(e) {
  return e === null;
}
function Ns(e) {
  try {
    return e instanceof (e.ownerDocument.defaultView || window).HTMLElement;
  } catch {
    return !1;
  }
}
function Ft(e) {
  return Or(e) ? e : [e];
}
function oe(e, t) {
  Ft(e).forEach(t);
}
function Cr(e, t) {
  return e.indexOf(t) > -1;
}
function Qt(e, t) {
  return e.push.apply(e, Ft(t)), e;
}
function me(e, t, n) {
  e && oe(t, function(r) {
    r && e.classList[n ? "add" : "remove"](r);
  });
}
function ve(e, t) {
  me(e, Le(t) ? t.split(" ") : t, !0);
}
function $t(e, t) {
  oe(t, e.appendChild.bind(e));
}
function Lr(e, t) {
  oe(e, function(n) {
    var r = (t || n).parentNode;
    r && r.insertBefore(n, t);
  });
}
function wt(e, t) {
  return Ns(e) && (e.msMatchesSelector || e.matches).call(e, t);
}
function Ds(e, t) {
  var n = e ? Ne(e.children) : [];
  return t ? n.filter(function(r) {
    return wt(r, t);
  }) : n;
}
function zt(e, t) {
  return t ? Ds(e, t)[0] : e.firstElementChild;
}
var At = Object.keys;
function Ke(e, t, n) {
  return e && (n ? At(e).reverse() : At(e)).forEach(function(r) {
    r !== "__proto__" && t(e[r], r);
  }), e;
}
function St(e) {
  return Ne(arguments, 1).forEach(function(t) {
    Ke(t, function(n, r) {
      e[r] = t[r];
    });
  }), e;
}
function Ie(e) {
  return Ne(arguments, 1).forEach(function(t) {
    Ke(t, function(n, r) {
      Or(n) ? e[r] = n.slice() : bt(n) ? e[r] = Ie({}, bt(e[r]) ? e[r] : {}, n) : e[r] = n;
    });
  }), e;
}
function ai(e, t) {
  oe(t || At(e), function(n) {
    delete e[n];
  });
}
function pe(e, t) {
  oe(e, function(n) {
    oe(t, function(r) {
      n && n.removeAttribute(r);
    });
  });
}
function F(e, t, n) {
  bt(t) ? Ke(t, function(r, i) {
    F(e, i, r);
  }) : oe(e, function(r) {
    Tr(n) || n === "" ? pe(r, t) : r.setAttribute(t, String(n));
  });
}
function Xe(e, t, n) {
  var r = document.createElement(e);
  return t && (Le(t) ? ve(r, t) : F(r, t)), n && $t(n, r), r;
}
function ue(e, t, n) {
  if (Mt(n))
    return getComputedStyle(e)[t];
  Tr(n) || (e.style[t] = "" + n);
}
function xt(e, t) {
  ue(e, "display", t);
}
function Ms(e) {
  e.setActive && e.setActive() || e.focus({
    preventScroll: !0
  });
}
function le(e, t) {
  return e.getAttribute(t);
}
function oi(e, t) {
  return e && e.classList.contains(t);
}
function se(e) {
  return e.getBoundingClientRect();
}
function We(e) {
  oe(e, function(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  });
}
function Fs(e) {
  return zt(new DOMParser().parseFromString(e, "text/html").body);
}
function ge(e, t) {
  e.preventDefault(), t && (e.stopPropagation(), e.stopImmediatePropagation());
}
function $s(e, t) {
  return e && e.querySelector(t);
}
function Rr(e, t) {
  return t ? Ne(e.querySelectorAll(t)) : [];
}
function ye(e, t) {
  me(e, t, !1);
}
function er(e) {
  return e.timeStamp;
}
function Fe(e) {
  return Le(e) ? e : e ? e + "px" : "";
}
var kt = "splide", Pr = "data-" + kt;
function gt(e, t) {
  if (!e)
    throw new Error("[" + kt + "] " + (t || ""));
}
var Re = Math.min, on = Math.max, un = Math.floor, It = Math.ceil, ne = Math.abs;
function zs(e, t, n) {
  return ne(e - t) < n;
}
function en(e, t, n, r) {
  var i = Re(t, n), s = on(t, n);
  return r ? i < e && e < s : i <= e && e <= s;
}
function Ge(e, t, n) {
  var r = Re(t, n), i = on(t, n);
  return Re(on(r, e), i);
}
function tr(e) {
  return +(e > 0) - +(e < 0);
}
function nr(e, t) {
  return oe(t, function(n) {
    e = e.replace("%s", "" + n);
  }), e;
}
function Nr(e) {
  return e < 10 ? "0" + e : "" + e;
}
var ui = {};
function Su(e) {
  return "" + e + Nr(ui[e] = (ui[e] || 0) + 1);
}
function ks() {
  var e = [];
  function t(a, o, u, l) {
    i(a, o, function(c, v, f) {
      var _ = "addEventListener" in c, h = _ ? c.removeEventListener.bind(c, v, u, l) : c.removeListener.bind(c, u);
      _ ? c.addEventListener(v, u, l) : c.addListener(u), e.push([c, v, f, u, h]);
    });
  }
  function n(a, o, u) {
    i(a, o, function(l, c, v) {
      e = e.filter(function(f) {
        return f[0] === l && f[1] === c && f[2] === v && (!u || f[3] === u) ? (f[4](), !1) : !0;
      });
    });
  }
  function r(a, o, u) {
    var l, c = !0;
    return typeof CustomEvent == "function" ? l = new CustomEvent(o, {
      bubbles: c,
      detail: u
    }) : (l = document.createEvent("CustomEvent"), l.initCustomEvent(o, c, !1, u)), a.dispatchEvent(l), l;
  }
  function i(a, o, u) {
    oe(a, function(l) {
      l && oe(o, function(c) {
        c.split(" ").forEach(function(v) {
          var f = v.split(".");
          u(l, f[0], f[1]);
        });
      });
    });
  }
  function s() {
    e.forEach(function(a) {
      a[4]();
    }), Ae(e);
  }
  return {
    bind: t,
    unbind: n,
    dispatch: r,
    destroy: s
  };
}
var He = "mounted", li = "ready", Pe = "move", Vt = "moved", Vs = "click", xu = "active", Iu = "inactive", Ou = "visible", Tu = "hidden", X = "refresh", re = "updated", Ot = "resize", Dr = "resized", Cu = "drag", Lu = "dragging", Ru = "dragged", Mr = "scroll", at = "scrolled", Pu = "overflow", js = "destroy", Nu = "arrows:mounted", Du = "arrows:updated", Mu = "pagination:mounted", Fu = "pagination:updated", Bs = "navigation:mounted", Ks = "autoplay:play", $u = "autoplay:playing", Ws = "autoplay:pause", Us = "lazyload:loaded", Hs = "sk", Gs = "sh", ln = "ei";
function U(e) {
  var t = e ? e.event.bus : document.createDocumentFragment(), n = ks();
  function r(s, a) {
    n.bind(t, Ft(s).join(" "), function(o) {
      a.apply(a, Or(o.detail) ? o.detail : []);
    });
  }
  function i(s) {
    n.dispatch(t, s, Ne(arguments, 1));
  }
  return e && e.event.on(js, n.destroy), St(n, {
    bus: t,
    on: r,
    off: j(n.unbind, t),
    emit: i
  });
}
function mn(e, t, n, r) {
  var i = Date.now, s, a = 0, o, u = !0, l = 0;
  function c() {
    if (!u) {
      if (a = e ? Re((i() - s) / e, 1) : 1, n && n(a), a >= 1 && (t(), s = i(), r && ++l >= r))
        return f();
      o = si(c);
    }
  }
  function v(g) {
    g || h(), s = i() - (g ? a * e : 0), u = !1, o = si(c);
  }
  function f() {
    u = !0;
  }
  function _() {
    s = i(), a = 0, n && n(a);
  }
  function h() {
    o && cancelAnimationFrame(o), a = 0, o = 0, u = !0;
  }
  function p(g) {
    e = g;
  }
  function d() {
    return u;
  }
  return {
    start: v,
    rewind: _,
    pause: f,
    cancel: h,
    set: p,
    isPaused: d
  };
}
function zu(e) {
  var t = e;
  function n(i) {
    t = i;
  }
  function r(i) {
    return Cr(Ft(i), t);
  }
  return {
    set: n,
    is: r
  };
}
function ku(e, t) {
  var n = mn(t || 0, e, null, 1);
  return function() {
    n.isPaused() && n.start();
  };
}
function Vu(e, t, n) {
  var r = e.state, i = n.breakpoints || {}, s = n.reducedMotion || {}, a = ks(), o = [];
  function u() {
    var h = n.mediaQuery === "min";
    At(i).sort(function(p, d) {
      return h ? +p - +d : +d - +p;
    }).forEach(function(p) {
      c(i[p], "(" + (h ? "min" : "max") + "-width:" + p + "px)");
    }), c(s, ii), v();
  }
  function l(h) {
    h && a.destroy();
  }
  function c(h, p) {
    var d = matchMedia(p);
    a.bind(d, "change", v), o.push([h, d]);
  }
  function v() {
    var h = r.is(an), p = n.direction, d = o.reduce(function(g, m) {
      return Ie(g, m[1].matches ? m[0] : {});
    }, {});
    ai(n), _(d), n.destroy ? e.destroy(n.destroy === "completely") : h ? (l(!0), e.mount()) : p !== n.direction && e.refresh();
  }
  function f(h) {
    matchMedia(ii).matches && (h ? Ie(n, s) : ai(n, At(s)));
  }
  function _(h, p, d) {
    Ie(n, h), p && Ie(Object.getPrototypeOf(n), h), (d || !r.is(Ye)) && e.emit(re, n);
  }
  return {
    setup: u,
    destroy: l,
    reduce: f,
    set: _
  };
}
var yn = "Arrow", En = yn + "Left", bn = yn + "Right", qs = yn + "Up", Ys = yn + "Down", ci = "rtl", wn = "ttb", Rn = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [qs, bn],
  ArrowRight: [Ys, En]
};
function ju(e, t, n) {
  function r(s, a, o) {
    o = o || n.direction;
    var u = o === ci && !a ? 1 : o === wn ? 0 : -1;
    return Rn[s] && Rn[s][u] || s.replace(/width|left|right/i, function(l, c) {
      var v = Rn[l.toLowerCase()][u] || l;
      return c > 0 ? v.charAt(0).toUpperCase() + v.slice(1) : v;
    });
  }
  function i(s) {
    return s * (n.direction === ci ? 1 : -1);
  }
  return {
    resolve: r,
    orient: i
  };
}
var Ee = "role", Ze = "tabindex", Bu = "disabled", de = "aria-", jt = de + "controls", Xs = de + "current", fi = de + "selected", ae = de + "label", Fr = de + "labelledby", Zs = de + "hidden", $r = de + "orientation", Tt = de + "roledescription", di = de + "live", hi = de + "busy", vi = de + "atomic", zr = [Ee, Ze, Bu, jt, Xs, ae, Fr, Zs, $r, Tt], _e = kt + "__", De = "is-", Pn = kt, pi = _e + "track", Ku = _e + "list", An = _e + "slide", Js = An + "--clone", Wu = An + "__container", kr = _e + "arrows", Sn = _e + "arrow", Qs = Sn + "--prev", ea = Sn + "--next", xn = _e + "pagination", ta = xn + "__page", Uu = _e + "progress", Hu = Uu + "__bar", Gu = _e + "toggle", qu = _e + "spinner", Yu = _e + "sr", Xu = De + "initialized", Ue = De + "active", na = De + "prev", ra = De + "next", rr = De + "visible", ir = De + "loading", ia = De + "focus-in", sa = De + "overflow", Zu = [Ue, rr, na, ra, ir, ia, sa], Ju = {
  slide: An,
  clone: Js,
  arrows: kr,
  arrow: Sn,
  prev: Qs,
  next: ea,
  pagination: xn,
  page: ta,
  spinner: qu
};
function Qu(e, t) {
  if (Ps(e.closest))
    return e.closest(t);
  for (var n = e; n && n.nodeType === 1 && !wt(n, t); )
    n = n.parentElement;
  return n;
}
var el = 5, _i = 200, aa = "touchstart mousedown", Nn = "touchmove mousemove", Dn = "touchend touchcancel mouseup click";
function tl(e, t, n) {
  var r = U(e), i = r.on, s = r.bind, a = e.root, o = n.i18n, u = {}, l = [], c = [], v = [], f, _, h;
  function p() {
    y(), T(), m();
  }
  function d() {
    i(X, g), i(X, p), i(re, m), s(document, aa + " keydown", function(E) {
      h = E.type === "keydown";
    }, {
      capture: !0
    }), s(a, "focusin", function() {
      me(a, ia, !!h);
    });
  }
  function g(E) {
    var C = zr.concat("style");
    Ae(l), ye(a, c), ye(f, v), pe([f, _], C), pe(a, E ? C : ["style", Tt]);
  }
  function m() {
    ye(a, c), ye(f, v), c = N(Pn), v = N(pi), ve(a, c), ve(f, v), F(a, ae, n.label), F(a, Fr, n.labelledby);
  }
  function y() {
    f = x("." + pi), _ = zt(f, "." + Ku), gt(f && _, "A track/list element is missing."), Qt(l, Ds(_, "." + An + ":not(." + Js + ")")), Ke({
      arrows: kr,
      pagination: xn,
      prev: Qs,
      next: ea,
      bar: Hu,
      toggle: Gu
    }, function(E, C) {
      u[C] = x("." + E);
    }), St(u, {
      root: a,
      track: f,
      list: _,
      slides: l
    });
  }
  function T() {
    var E = a.id || Su(kt), C = n.role;
    a.id = E, f.id = f.id || E + "-track", _.id = _.id || E + "-list", !le(a, Ee) && a.tagName !== "SECTION" && C && F(a, Ee, C), F(a, Tt, o.carousel), F(_, Ee, "presentation");
  }
  function x(E) {
    var C = $s(a, E);
    return C && Qu(C, "." + Pn) === a ? C : void 0;
  }
  function N(E) {
    return [E + "--" + n.type, E + "--" + n.direction, n.drag && E + "--draggable", n.isNavigation && E + "--nav", E === Pn && Ue];
  }
  return St(u, {
    setup: p,
    mount: d,
    destroy: g
  });
}
var tt = "slide", ot = "loop", Bt = "fade";
function nl(e, t, n, r) {
  var i = U(e), s = i.on, a = i.emit, o = i.bind, u = e.Components, l = e.root, c = e.options, v = c.isNavigation, f = c.updateOnMove, _ = c.i18n, h = c.pagination, p = c.slideFocus, d = u.Direction.resolve, g = le(r, "style"), m = le(r, ae), y = n > -1, T = zt(r, "." + Wu), x;
  function N() {
    y || (r.id = l.id + "-slide" + Nr(t + 1), F(r, Ee, h ? "tabpanel" : "group"), F(r, Tt, _.slide), F(r, ae, m || nr(_.slideLabel, [t + 1, e.length]))), E();
  }
  function E() {
    o(r, "click", j(a, Vs, D)), o(r, "keydown", j(a, Hs, D)), s([Vt, Gs, at], A), s(Bs, $), f && s(Pe, P);
  }
  function C() {
    x = !0, i.destroy(), ye(r, Zu), pe(r, zr), F(r, "style", g), F(r, ae, m || "");
  }
  function $() {
    var R = e.splides.map(function(w) {
      var L = w.splide.Components.Slides.getAt(t);
      return L ? L.slide.id : "";
    }).join(" ");
    F(r, ae, nr(_.slideX, (y ? n : t) + 1)), F(r, jt, R), F(r, Ee, p ? "button" : ""), p && pe(r, Tt);
  }
  function P() {
    x || A();
  }
  function A() {
    if (!x) {
      var R = e.index;
      S(), I(), me(r, na, t === R - 1), me(r, ra, t === R + 1);
    }
  }
  function S() {
    var R = z();
    R !== oi(r, Ue) && (me(r, Ue, R), F(r, Xs, v && R || ""), a(R ? xu : Iu, D));
  }
  function I() {
    var R = H(), w = !R && (!z() || y);
    if (e.state.is([st, Dt]) || F(r, Zs, w || ""), F(Rr(r, c.focusableNodes || ""), Ze, w ? -1 : ""), p && F(r, Ze, w ? -1 : 0), R !== oi(r, rr) && (me(r, rr, R), a(R ? Ou : Tu, D)), !R && document.activeElement === r) {
      var L = u.Slides.getAt(e.index);
      L && Ms(L.slide);
    }
  }
  function M(R, w, L) {
    ue(L && T || r, R, w);
  }
  function z() {
    var R = e.index;
    return R === t || c.cloneStatus && R === n;
  }
  function H() {
    if (e.is(Bt))
      return z();
    var R = se(u.Elements.track), w = se(r), L = d("left", !0), k = d("right", !0);
    return un(R[L]) <= It(w[L]) && un(w[k]) <= It(R[k]);
  }
  function W(R, w) {
    var L = ne(R - t);
    return !y && (c.rewind || e.is(ot)) && (L = Re(L, e.length - L)), L <= w;
  }
  var D = {
    index: t,
    slideIndex: n,
    slide: r,
    container: T,
    isClone: y,
    mount: N,
    destroy: C,
    update: A,
    style: M,
    isWithin: W
  };
  return D;
}
function rl(e, t, n) {
  var r = U(e), i = r.on, s = r.emit, a = r.bind, o = t.Elements, u = o.slides, l = o.list, c = [];
  function v() {
    f(), i(X, _), i(X, f);
  }
  function f() {
    u.forEach(function(A, S) {
      p(A, S, -1);
    });
  }
  function _() {
    x(function(A) {
      A.destroy();
    }), Ae(c);
  }
  function h() {
    x(function(A) {
      A.update();
    });
  }
  function p(A, S, I) {
    var M = nl(e, S, I, A);
    M.mount(), c.push(M), c.sort(function(z, H) {
      return z.index - H.index;
    });
  }
  function d(A) {
    return A ? N(function(S) {
      return !S.isClone;
    }) : c;
  }
  function g(A) {
    var S = t.Controller, I = S.toIndex(A), M = S.hasFocus() ? 1 : n.perPage;
    return N(function(z) {
      return en(z.index, I, I + M - 1);
    });
  }
  function m(A) {
    return N(A)[0];
  }
  function y(A, S) {
    oe(A, function(I) {
      if (Le(I) && (I = Fs(I)), Ns(I)) {
        var M = u[S];
        M ? Lr(I, M) : $t(l, I), ve(I, n.classes.slide), C(I, j(s, Ot));
      }
    }), s(X);
  }
  function T(A) {
    We(N(A).map(function(S) {
      return S.slide;
    })), s(X);
  }
  function x(A, S) {
    d(S).forEach(A);
  }
  function N(A) {
    return c.filter(Ps(A) ? A : function(S) {
      return Le(A) ? wt(S.slide, A) : Cr(Ft(A), S.index);
    });
  }
  function E(A, S, I) {
    x(function(M) {
      M.style(A, S, I);
    });
  }
  function C(A, S) {
    var I = Rr(A, "img"), M = I.length;
    M ? I.forEach(function(z) {
      a(z, "load error", function() {
        --M || S();
      });
    }) : S();
  }
  function $(A) {
    return A ? u.length : c.length;
  }
  function P() {
    return c.length > n.perPage;
  }
  return {
    mount: v,
    destroy: _,
    update: h,
    register: p,
    get: d,
    getIn: g,
    getAt: m,
    add: y,
    remove: T,
    forEach: x,
    filter: N,
    style: E,
    getLength: $,
    isEnough: P
  };
}
function il(e, t, n) {
  var r = U(e), i = r.on, s = r.bind, a = r.emit, o = t.Slides, u = t.Direction.resolve, l = t.Elements, c = l.root, v = l.track, f = l.list, _ = o.getAt, h = o.style, p, d, g;
  function m() {
    y(), s(window, "resize load", ku(j(a, Ot))), i([re, X], y), i(Ot, T);
  }
  function y() {
    p = n.direction === wn, ue(c, "maxWidth", Fe(n.width)), ue(v, u("paddingLeft"), x(!1)), ue(v, u("paddingRight"), x(!0)), T(!0);
  }
  function T(D) {
    var R = se(c);
    (D || d.width !== R.width || d.height !== R.height) && (ue(v, "height", N()), h(u("marginRight"), Fe(n.gap)), h("width", C()), h("height", $(), !0), d = R, a(Dr), g !== (g = W()) && (me(c, sa, g), a(Pu, g)));
  }
  function x(D) {
    var R = n.padding, w = u(D ? "right" : "left");
    return R && Fe(R[w] || (bt(R) ? 0 : R)) || "0px";
  }
  function N() {
    var D = "";
    return p && (D = E(), gt(D, "height or heightRatio is missing."), D = "calc(" + D + " - " + x(!1) + " - " + x(!0) + ")"), D;
  }
  function E() {
    return Fe(n.height || se(f).width * n.heightRatio);
  }
  function C() {
    return n.autoWidth ? null : Fe(n.fixedWidth) || (p ? "" : P());
  }
  function $() {
    return Fe(n.fixedHeight) || (p ? n.autoHeight ? null : P() : E());
  }
  function P() {
    var D = Fe(n.gap);
    return "calc((100%" + (D && " + " + D) + ")/" + (n.perPage || 1) + (D && " - " + D) + ")";
  }
  function A() {
    return se(f)[u("width")];
  }
  function S(D, R) {
    var w = _(D || 0);
    return w ? se(w.slide)[u("width")] + (R ? 0 : z()) : 0;
  }
  function I(D, R) {
    var w = _(D);
    if (w) {
      var L = se(w.slide)[u("right")], k = se(f)[u("left")];
      return ne(L - k) + (R ? 0 : z());
    }
    return 0;
  }
  function M(D) {
    return I(e.length - 1) - I(0) + S(0, D);
  }
  function z() {
    var D = _(0);
    return D && parseFloat(ue(D.slide, u("marginRight"))) || 0;
  }
  function H(D) {
    return parseFloat(ue(v, u("padding" + (D ? "Right" : "Left")))) || 0;
  }
  function W() {
    return e.is(Bt) || M(!0) > A();
  }
  return {
    mount: m,
    resize: T,
    listSize: A,
    slideSize: S,
    sliderSize: M,
    totalSize: I,
    getPadding: H,
    isOverflow: W
  };
}
var sl = 2;
function al(e, t, n) {
  var r = U(e), i = r.on, s = t.Elements, a = t.Slides, o = t.Direction.resolve, u = [], l;
  function c() {
    i(X, v), i([re, Ot], _), (l = d()) && (h(l), t.Layout.resize(!0));
  }
  function v() {
    f(), c();
  }
  function f() {
    We(u), Ae(u), r.destroy();
  }
  function _() {
    var g = d();
    l !== g && (l < g || !g) && r.emit(X);
  }
  function h(g) {
    var m = a.get().slice(), y = m.length;
    if (y) {
      for (; m.length < g; )
        Qt(m, m);
      Qt(m.slice(-g), m.slice(0, g)).forEach(function(T, x) {
        var N = x < g, E = p(T.slide, x);
        N ? Lr(E, m[0].slide) : $t(s.list, E), Qt(u, E), a.register(E, x - g + (N ? 0 : y), T.index);
      });
    }
  }
  function p(g, m) {
    var y = g.cloneNode(!0);
    return ve(y, n.classes.clone), y.id = e.root.id + "-clone" + Nr(m + 1), y;
  }
  function d() {
    var g = n.clones;
    if (!e.is(ot))
      g = 0;
    else if (Mt(g)) {
      var m = n[o("fixedWidth")] && t.Layout.slideSize(0), y = m && It(se(s.track)[o("width")] / m);
      g = y || n[o("autoWidth")] && e.length || n.perPage * sl;
    }
    return g;
  }
  return {
    mount: c,
    destroy: f
  };
}
function ol(e, t, n) {
  var r = U(e), i = r.on, s = r.emit, a = e.state.set, o = t.Layout, u = o.slideSize, l = o.getPadding, c = o.totalSize, v = o.listSize, f = o.sliderSize, _ = t.Direction, h = _.resolve, p = _.orient, d = t.Elements, g = d.list, m = d.track, y;
  function T() {
    y = t.Transition, i([He, Dr, re, X], x);
  }
  function x() {
    t.Controller.isBusy() || (t.Scroll.cancel(), E(e.index), t.Slides.update());
  }
  function N(w, L, k, J) {
    w !== L && D(w > k) && (A(), C(P(M(), w > k), !0)), a(st), s(Pe, L, k, w), y.start(L, function() {
      a(et), s(Vt, L, k, w), J && J();
    });
  }
  function E(w) {
    C(I(w, !0));
  }
  function C(w, L) {
    if (!e.is(Bt)) {
      var k = L ? w : $(w);
      ue(g, "transform", "translate" + h("X") + "(" + k + "px)"), w !== k && s(Gs);
    }
  }
  function $(w) {
    if (e.is(ot)) {
      var L = S(w), k = L > t.Controller.getEnd(), J = L < 0;
      (J || k) && (w = P(w, k));
    }
    return w;
  }
  function P(w, L) {
    var k = w - W(L), J = f();
    return w -= p(J * (It(ne(k) / J) || 1)) * (L ? 1 : -1), w;
  }
  function A() {
    C(M(), !0), y.cancel();
  }
  function S(w) {
    for (var L = t.Slides.get(), k = 0, J = 1 / 0, Z = 0; Z < L.length; Z++) {
      var Se = L[Z].index, b = ne(I(Se, !0) - w);
      if (b <= J)
        J = b, k = Se;
      else
        break;
    }
    return k;
  }
  function I(w, L) {
    var k = p(c(w - 1) - H(w));
    return L ? z(k) : k;
  }
  function M() {
    var w = h("left");
    return se(g)[w] - se(m)[w] + p(l(!1));
  }
  function z(w) {
    return n.trimSpace && e.is(tt) && (w = Ge(w, 0, p(f(!0) - v()))), w;
  }
  function H(w) {
    var L = n.focus;
    return L === "center" ? (v() - u(w, !0)) / 2 : +L * u(w) || 0;
  }
  function W(w) {
    return I(w ? t.Controller.getEnd() : 0, !!n.trimSpace);
  }
  function D(w) {
    var L = p(P(M(), w));
    return w ? L >= 0 : L <= g[h("scrollWidth")] - se(m)[h("width")];
  }
  function R(w, L) {
    L = Mt(L) ? M() : L;
    var k = w !== !0 && p(L) < p(W(!1)), J = w !== !1 && p(L) > p(W(!0));
    return k || J;
  }
  return {
    mount: T,
    move: N,
    jump: E,
    translate: C,
    shift: P,
    cancel: A,
    toIndex: S,
    toPosition: I,
    getPosition: M,
    getLimit: W,
    exceededLimit: R,
    reposition: x
  };
}
function ul(e, t, n) {
  var r = U(e), i = r.on, s = r.emit, a = t.Move, o = a.getPosition, u = a.getLimit, l = a.toPosition, c = t.Slides, v = c.isEnough, f = c.getLength, _ = n.omitEnd, h = e.is(ot), p = e.is(tt), d = j(M, !1), g = j(M, !0), m = n.start || 0, y, T = m, x, N, E;
  function C() {
    $(), i([re, X, ln], $), i(Dr, P);
  }
  function $() {
    x = f(!0), N = n.perMove, E = n.perPage, y = D();
    var b = Ge(m, 0, _ ? y : x - 1);
    b !== m && (m = b, a.reposition());
  }
  function P() {
    y !== D() && s(ln);
  }
  function A(b, V, te) {
    if (!Se()) {
      var G = I(b), Q = W(G);
      Q > -1 && (V || Q !== m) && (k(Q), a.move(G, Q, T, te));
    }
  }
  function S(b, V, te, G) {
    t.Scroll.scroll(b, V, te, function() {
      var Q = W(a.toIndex(o()));
      k(_ ? Re(Q, y) : Q), G && G();
    });
  }
  function I(b) {
    var V = m;
    if (Le(b)) {
      var te = b.match(/([+\-<>])(\d+)?/) || [], G = te[1], Q = te[2];
      G === "+" || G === "-" ? V = z(m + +("" + G + (+Q || 1)), m) : G === ">" ? V = Q ? R(+Q) : d(!0) : G === "<" && (V = g(!0));
    } else
      V = h ? b : Ge(b, 0, y);
    return V;
  }
  function M(b, V) {
    var te = N || (Z() ? 1 : E), G = z(m + te * (b ? -1 : 1), m, !(N || Z()));
    return G === -1 && p && !zs(o(), u(!b), 1) ? b ? 0 : y : V ? G : W(G);
  }
  function z(b, V, te) {
    if (v() || Z()) {
      var G = H(b);
      G !== b && (V = b, b = G, te = !1), b < 0 || b > y ? !N && (en(0, b, V, !0) || en(y, V, b, !0)) ? b = R(w(b)) : h ? b = te ? b < 0 ? -(x % E || E) : x : b : n.rewind ? b = b < 0 ? y : 0 : b = -1 : te && b !== V && (b = R(w(V) + (b < V ? -1 : 1)));
    } else
      b = -1;
    return b;
  }
  function H(b) {
    if (p && n.trimSpace === "move" && b !== m)
      for (var V = o(); V === l(b, !0) && en(b, 0, e.length - 1, !n.rewind); )
        b < m ? --b : ++b;
    return b;
  }
  function W(b) {
    return h ? (b + x) % x || 0 : b;
  }
  function D() {
    for (var b = x - (Z() || h && N ? 1 : E); _ && b-- > 0; )
      if (l(x - 1, !0) !== l(b, !0)) {
        b++;
        break;
      }
    return Ge(b, 0, x - 1);
  }
  function R(b) {
    return Ge(Z() ? b : E * b, 0, y);
  }
  function w(b) {
    return Z() ? Re(b, y) : un((b >= y ? x - 1 : b) / E);
  }
  function L(b) {
    var V = a.toIndex(b);
    return p ? Ge(V, 0, y) : V;
  }
  function k(b) {
    b !== m && (T = m, m = b);
  }
  function J(b) {
    return b ? T : m;
  }
  function Z() {
    return !Mt(n.focus) || n.isNavigation;
  }
  function Se() {
    return e.state.is([st, Dt]) && !!n.waitForTransition;
  }
  return {
    mount: C,
    go: A,
    scroll: S,
    getNext: d,
    getPrev: g,
    getAdjacent: M,
    getEnd: D,
    setIndex: k,
    getIndex: J,
    toIndex: R,
    toPage: w,
    toDest: L,
    hasFocus: Z,
    isBusy: Se
  };
}
var ll = "http://www.w3.org/2000/svg", cl = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z", qt = 40;
function fl(e, t, n) {
  var r = U(e), i = r.on, s = r.bind, a = r.emit, o = n.classes, u = n.i18n, l = t.Elements, c = t.Controller, v = l.arrows, f = l.track, _ = v, h = l.prev, p = l.next, d, g, m = {};
  function y() {
    x(), i(re, T);
  }
  function T() {
    N(), y();
  }
  function x() {
    var S = n.arrows;
    S && !(h && p) && $(), h && p && (St(m, {
      prev: h,
      next: p
    }), xt(_, S ? "" : "none"), ve(_, g = kr + "--" + n.direction), S && (E(), A(), F([h, p], jt, f.id), a(Nu, h, p)));
  }
  function N() {
    r.destroy(), ye(_, g), d ? (We(v ? [h, p] : _), h = p = null) : pe([h, p], zr);
  }
  function E() {
    i([He, Vt, X, at, ln], A), s(p, "click", j(C, ">")), s(h, "click", j(C, "<"));
  }
  function C(S) {
    c.go(S, !0);
  }
  function $() {
    _ = v || Xe("div", o.arrows), h = P(!0), p = P(!1), d = !0, $t(_, [h, p]), !v && Lr(_, f);
  }
  function P(S) {
    var I = '<button class="' + o.arrow + " " + (S ? o.prev : o.next) + '" type="button"><svg xmlns="' + ll + '" viewBox="0 0 ' + qt + " " + qt + '" width="' + qt + '" height="' + qt + '" focusable="false"><path d="' + (n.arrowPath || cl) + '" />';
    return Fs(I);
  }
  function A() {
    if (h && p) {
      var S = e.index, I = c.getPrev(), M = c.getNext(), z = I > -1 && S < I ? u.last : u.prev, H = M > -1 && S > M ? u.first : u.next;
      h.disabled = I < 0, p.disabled = M < 0, F(h, ae, z), F(p, ae, H), a(Du, h, p, I, M);
    }
  }
  return {
    arrows: m,
    mount: y,
    destroy: N,
    update: A
  };
}
var dl = Pr + "-interval";
function hl(e, t, n) {
  var r = U(e), i = r.on, s = r.bind, a = r.emit, o = mn(n.interval, e.go.bind(e, ">"), E), u = o.isPaused, l = t.Elements, c = t.Elements, v = c.root, f = c.toggle, _ = n.autoplay, h, p, d = _ === "pause";
  function g() {
    _ && (m(), f && F(f, jt, l.track.id), d || y(), N());
  }
  function m() {
    n.pauseOnHover && s(v, "mouseenter mouseleave", function($) {
      h = $.type === "mouseenter", x();
    }), n.pauseOnFocus && s(v, "focusin focusout", function($) {
      p = $.type === "focusin", x();
    }), f && s(f, "click", function() {
      d ? y() : T(!0);
    }), i([Pe, Mr, X], o.rewind), i(Pe, C);
  }
  function y() {
    u() && t.Slides.isEnough() && (o.start(!n.resetProgress), p = h = d = !1, N(), a(Ks));
  }
  function T($) {
    $ === void 0 && ($ = !0), d = !!$, N(), u() || (o.pause(), a(Ws));
  }
  function x() {
    d || (h || p ? T(!1) : y());
  }
  function N() {
    f && (me(f, Ue, !d), F(f, ae, n.i18n[d ? "play" : "pause"]));
  }
  function E($) {
    var P = l.bar;
    P && ue(P, "width", $ * 100 + "%"), a($u, $);
  }
  function C($) {
    var P = t.Slides.getAt($);
    o.set(P && +le(P.slide, dl) || n.interval);
  }
  return {
    mount: g,
    destroy: o.cancel,
    play: y,
    pause: T,
    isPaused: u
  };
}
function vl(e, t, n) {
  var r = U(e), i = r.on;
  function s() {
    n.cover && (i(Us, j(o, !0)), i([He, re, X], j(a, !0)));
  }
  function a(u) {
    t.Slides.forEach(function(l) {
      var c = zt(l.container || l.slide, "img");
      c && c.src && o(u, c, l);
    });
  }
  function o(u, l, c) {
    c.style("background", u ? 'center/cover no-repeat url("' + l.src + '")' : "", !0), xt(l, u ? "none" : "");
  }
  return {
    mount: s,
    destroy: j(a, !1)
  };
}
var pl = 10, _l = 600, gl = 0.6, ml = 1.5, yl = 800;
function El(e, t, n) {
  var r = U(e), i = r.on, s = r.emit, a = e.state.set, o = t.Move, u = o.getPosition, l = o.getLimit, c = o.exceededLimit, v = o.translate, f = e.is(tt), _, h, p = 1;
  function d() {
    i(Pe, T), i([re, X], x);
  }
  function g(E, C, $, P, A) {
    var S = u();
    if (T(), $ && (!f || !c())) {
      var I = t.Layout.sliderSize(), M = tr(E) * I * un(ne(E) / I) || 0;
      E = o.toPosition(t.Controller.toDest(E % I)) + M;
    }
    var z = zs(S, E, 1);
    p = 1, C = z ? 0 : C || on(ne(E - S) / ml, yl), h = P, _ = mn(C, m, j(y, S, E, A), 1), a(Dt), s(Mr), _.start();
  }
  function m() {
    a(et), h && h(), s(at);
  }
  function y(E, C, $, P) {
    var A = u(), S = E + (C - E) * N(P), I = (S - A) * p;
    v(A + I), f && !$ && c() && (p *= gl, ne(I) < pl && g(l(c(!0)), _l, !1, h, !0));
  }
  function T() {
    _ && _.cancel();
  }
  function x() {
    _ && !_.isPaused() && (T(), m());
  }
  function N(E) {
    var C = n.easingFunc;
    return C ? C(E) : 1 - Math.pow(1 - E, 4);
  }
  return {
    mount: d,
    destroy: T,
    scroll: g,
    cancel: x
  };
}
var qe = {
  passive: !1,
  capture: !0
};
function bl(e, t, n) {
  var r = U(e), i = r.on, s = r.emit, a = r.bind, o = r.unbind, u = e.state, l = t.Move, c = t.Scroll, v = t.Controller, f = t.Elements.track, _ = t.Media.reduce, h = t.Direction, p = h.resolve, d = h.orient, g = l.getPosition, m = l.exceededLimit, y, T, x, N, E, C = !1, $, P, A;
  function S() {
    a(f, Nn, Qn, qe), a(f, Dn, Qn, qe), a(f, aa, M, qe), a(f, "click", W, {
      capture: !0
    }), a(f, "dragstart", ge), i([He, re], I);
  }
  function I() {
    var O = n.drag;
    Br(!O), N = O === "free";
  }
  function M(O) {
    if ($ = !1, !P) {
      var K = Q(O);
      G(O.target) && (K || !O.button) && (v.isBusy() ? ge(O, !0) : (A = K ? f : window, E = u.is([st, Dt]), x = null, a(A, Nn, z, qe), a(A, Dn, H, qe), l.cancel(), c.cancel(), D(O)));
    }
  }
  function z(O) {
    if (u.is(Jt) || (u.set(Jt), s(Cu)), O.cancelable)
      if (E) {
        l.translate(y + te(Z(O)));
        var K = Se(O) > _i, Me = C !== (C = m());
        (K || Me) && D(O), $ = !0, s(Lu), ge(O);
      } else
        L(O) && (E = w(O), ge(O));
  }
  function H(O) {
    u.is(Jt) && (u.set(et), s(Ru)), E && (R(O), ge(O)), o(A, Nn, z), o(A, Dn, H), E = !1;
  }
  function W(O) {
    !P && $ && ge(O, !0);
  }
  function D(O) {
    x = T, T = O, y = g();
  }
  function R(O) {
    var K = k(O), Me = J(K), ut = n.rewind && n.rewindByDrag;
    _(!1), N ? v.scroll(Me, 0, n.snap) : e.is(Bt) ? v.go(d(tr(K)) < 0 ? ut ? "<" : "-" : ut ? ">" : "+") : e.is(tt) && C && ut ? v.go(m(!0) ? ">" : "<") : v.go(v.toDest(Me), !0), _(!0);
  }
  function w(O) {
    var K = n.dragMinThreshold, Me = bt(K), ut = Me && K.mouse || 0, la = (Me ? K.touch : +K) || 10;
    return ne(Z(O)) > (Q(O) ? la : ut);
  }
  function L(O) {
    return ne(Z(O)) > ne(Z(O, !0));
  }
  function k(O) {
    if (e.is(ot) || !C) {
      var K = Se(O);
      if (K && K < _i)
        return Z(O) / K;
    }
    return 0;
  }
  function J(O) {
    return g() + tr(O) * Re(ne(O) * (n.flickPower || 600), N ? 1 / 0 : t.Layout.listSize() * (n.flickMaxPages || 1));
  }
  function Z(O, K) {
    return V(O, K) - V(b(O), K);
  }
  function Se(O) {
    return er(O) - er(b(O));
  }
  function b(O) {
    return T === O && x || T;
  }
  function V(O, K) {
    return (Q(O) ? O.changedTouches[0] : O)["page" + p(K ? "Y" : "X")];
  }
  function te(O) {
    return O / (C && e.is(tt) ? el : 1);
  }
  function G(O) {
    var K = n.noDrag;
    return !wt(O, "." + ta + ", ." + Sn) && (!K || !wt(O, K));
  }
  function Q(O) {
    return typeof TouchEvent < "u" && O instanceof TouchEvent;
  }
  function ua() {
    return E;
  }
  function Br(O) {
    P = O;
  }
  return {
    mount: S,
    disable: Br,
    isDragging: ua
  };
}
var wl = {
  Spacebar: " ",
  Right: bn,
  Left: En,
  Up: qs,
  Down: Ys
};
function Vr(e) {
  return e = Le(e) ? e : e.key, wl[e] || e;
}
var gi = "keydown";
function Al(e, t, n) {
  var r = U(e), i = r.on, s = r.bind, a = r.unbind, o = e.root, u = t.Direction.resolve, l, c;
  function v() {
    f(), i(re, _), i(re, f), i(Pe, p);
  }
  function f() {
    var g = n.keyboard;
    g && (l = g === "global" ? window : o, s(l, gi, d));
  }
  function _() {
    a(l, gi);
  }
  function h(g) {
    c = g;
  }
  function p() {
    var g = c;
    c = !0, Rs(function() {
      c = g;
    });
  }
  function d(g) {
    if (!c) {
      var m = Vr(g);
      m === u(En) ? e.go("<") : m === u(bn) && e.go(">");
    }
  }
  return {
    mount: v,
    destroy: _,
    disable: h
  };
}
var mt = Pr + "-lazy", tn = mt + "-srcset", Sl = "[" + mt + "], [" + tn + "]";
function xl(e, t, n) {
  var r = U(e), i = r.on, s = r.off, a = r.bind, o = r.emit, u = n.lazyLoad === "sequential", l = [Vt, at], c = [];
  function v() {
    n.lazyLoad && (f(), i(X, f));
  }
  function f() {
    Ae(c), _(), u ? g() : (s(l), i(l, h), h());
  }
  function _() {
    t.Slides.forEach(function(m) {
      Rr(m.slide, Sl).forEach(function(y) {
        var T = le(y, mt), x = le(y, tn);
        if (T !== y.src || x !== y.srcset) {
          var N = n.classes.spinner, E = y.parentElement, C = zt(E, "." + N) || Xe("span", N, E);
          c.push([y, m, C]), y.src || xt(y, "none");
        }
      });
    });
  }
  function h() {
    c = c.filter(function(m) {
      var y = n.perPage * ((n.preloadPages || 1) + 1) - 1;
      return m[1].isWithin(e.index, y) ? p(m) : !0;
    }), c.length || s(l);
  }
  function p(m) {
    var y = m[0];
    ve(m[1].slide, ir), a(y, "load error", j(d, m)), F(y, "src", le(y, mt)), F(y, "srcset", le(y, tn)), pe(y, mt), pe(y, tn);
  }
  function d(m, y) {
    var T = m[0], x = m[1];
    ye(x.slide, ir), y.type !== "error" && (We(m[2]), xt(T, ""), o(Us, T, x), o(Ot)), u && g();
  }
  function g() {
    c.length && p(c.shift());
  }
  return {
    mount: v,
    destroy: j(Ae, c),
    check: h
  };
}
function Il(e, t, n) {
  var r = U(e), i = r.on, s = r.emit, a = r.bind, o = t.Slides, u = t.Elements, l = t.Controller, c = l.hasFocus, v = l.getIndex, f = l.go, _ = t.Direction.resolve, h = u.pagination, p = [], d, g;
  function m() {
    y(), i([re, X, ln], m);
    var P = n.pagination;
    h && xt(h, P ? "" : "none"), P && (i([Pe, Mr, at], $), T(), $(), s(Mu, {
      list: d,
      items: p
    }, C(e.index)));
  }
  function y() {
    d && (We(h ? Ne(d.children) : d), ye(d, g), Ae(p), d = null), r.destroy();
  }
  function T() {
    var P = e.length, A = n.classes, S = n.i18n, I = n.perPage, M = c() ? l.getEnd() + 1 : It(P / I);
    d = h || Xe("ul", A.pagination, u.track.parentElement), ve(d, g = xn + "--" + E()), F(d, Ee, "tablist"), F(d, ae, S.select), F(d, $r, E() === wn ? "vertical" : "");
    for (var z = 0; z < M; z++) {
      var H = Xe("li", null, d), W = Xe("button", {
        class: A.page,
        type: "button"
      }, H), D = o.getIn(z).map(function(w) {
        return w.slide.id;
      }), R = !c() && I > 1 ? S.pageX : S.slideX;
      a(W, "click", j(x, z)), n.paginationKeyboard && a(W, "keydown", j(N, z)), F(H, Ee, "presentation"), F(W, Ee, "tab"), F(W, jt, D.join(" ")), F(W, ae, nr(R, z + 1)), F(W, Ze, -1), p.push({
        li: H,
        button: W,
        page: z
      });
    }
  }
  function x(P) {
    f(">" + P, !0);
  }
  function N(P, A) {
    var S = p.length, I = Vr(A), M = E(), z = -1;
    I === _(bn, !1, M) ? z = ++P % S : I === _(En, !1, M) ? z = (--P + S) % S : I === "Home" ? z = 0 : I === "End" && (z = S - 1);
    var H = p[z];
    H && (Ms(H.button), f(">" + z), ge(A, !0));
  }
  function E() {
    return n.paginationDirection || n.direction;
  }
  function C(P) {
    return p[l.toPage(P)];
  }
  function $() {
    var P = C(v(!0)), A = C(v());
    if (P) {
      var S = P.button;
      ye(S, Ue), pe(S, fi), F(S, Ze, -1);
    }
    if (A) {
      var I = A.button;
      ve(I, Ue), F(I, fi, !0), F(I, Ze, "");
    }
    s(Fu, {
      list: d,
      items: p
    }, P, A);
  }
  return {
    items: p,
    mount: m,
    destroy: y,
    getAt: C,
    update: $
  };
}
var Ol = [" ", "Enter"];
function Tl(e, t, n) {
  var r = n.isNavigation, i = n.slideFocus, s = [];
  function a() {
    e.splides.forEach(function(h) {
      h.isParent || (l(e, h.splide), l(h.splide, e));
    }), r && c();
  }
  function o() {
    s.forEach(function(h) {
      h.destroy();
    }), Ae(s);
  }
  function u() {
    o(), a();
  }
  function l(h, p) {
    var d = U(h);
    d.on(Pe, function(g, m, y) {
      p.go(p.is(ot) ? y : g);
    }), s.push(d);
  }
  function c() {
    var h = U(e), p = h.on;
    p(Vs, f), p(Hs, _), p([He, re], v), s.push(h), h.emit(Bs, e.splides);
  }
  function v() {
    F(t.Elements.list, $r, n.direction === wn ? "vertical" : "");
  }
  function f(h) {
    e.go(h.index);
  }
  function _(h, p) {
    Cr(Ol, Vr(p)) && (f(h), ge(p));
  }
  return {
    setup: j(t.Media.set, {
      slideFocus: Mt(i) ? r : i
    }, !0),
    mount: a,
    destroy: o,
    remount: u
  };
}
function Cl(e, t, n) {
  var r = U(e), i = r.bind, s = 0;
  function a() {
    n.wheel && i(t.Elements.track, "wheel", o, qe);
  }
  function o(l) {
    if (l.cancelable) {
      var c = l.deltaY, v = c < 0, f = er(l), _ = n.wheelMinThreshold || 0, h = n.wheelSleep || 0;
      ne(c) > _ && f - s > h && (e.go(v ? "<" : ">"), s = f), u(v) && ge(l);
    }
  }
  function u(l) {
    return !n.releaseWheel || e.state.is(st) || t.Controller.getAdjacent(l) !== -1;
  }
  return {
    mount: a
  };
}
var Ll = 90;
function Rl(e, t, n) {
  var r = U(e), i = r.on, s = t.Elements.track, a = n.live && !n.isNavigation, o = Xe("span", Yu), u = mn(Ll, j(c, !1));
  function l() {
    a && (f(!t.Autoplay.isPaused()), F(s, vi, !0), o.textContent = "…", i(Ks, j(f, !0)), i(Ws, j(f, !1)), i([Vt, at], j(c, !0)));
  }
  function c(_) {
    F(s, hi, _), _ ? ($t(s, o), u.start()) : (We(o), u.cancel());
  }
  function v() {
    pe(s, [di, vi, hi]), We(o);
  }
  function f(_) {
    a && F(s, di, _ ? "off" : "polite");
  }
  return {
    mount: l,
    disable: f,
    destroy: v
  };
}
var Pl = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Media: Vu,
  Direction: ju,
  Elements: tl,
  Slides: rl,
  Layout: il,
  Clones: al,
  Move: ol,
  Controller: ul,
  Arrows: fl,
  Autoplay: hl,
  Cover: vl,
  Scroll: El,
  Drag: bl,
  Keyboard: Al,
  LazyLoad: xl,
  Pagination: Il,
  Sync: Tl,
  Wheel: Cl,
  Live: Rl
}), Nl = {
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
}, Dl = {
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
  classes: Ju,
  i18n: Nl,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};
function Ml(e, t, n) {
  var r = t.Slides;
  function i() {
    U(e).on([He, X], s);
  }
  function s() {
    r.forEach(function(o) {
      o.style("transform", "translateX(-" + 100 * o.index + "%)");
    });
  }
  function a(o, u) {
    r.style("transition", "opacity " + n.speed + "ms " + n.easing), Rs(u);
  }
  return {
    mount: i,
    start: a,
    cancel: Qn
  };
}
function Fl(e, t, n) {
  var r = t.Move, i = t.Controller, s = t.Scroll, a = t.Elements.list, o = j(ue, a, "transition"), u;
  function l() {
    U(e).bind(a, "transitionend", function(_) {
      _.target === a && u && (v(), u());
    });
  }
  function c(_, h) {
    var p = r.toPosition(_, !0), d = r.getPosition(), g = f(_);
    ne(p - d) >= 1 && g >= 1 ? n.useScroll ? s.scroll(p, g, !1, h) : (o("transform " + g + "ms " + n.easing), r.translate(p, !0), u = h) : (r.jump(_), h());
  }
  function v() {
    o(""), s.cancel();
  }
  function f(_) {
    var h = n.rewindSpeed;
    if (e.is(tt) && h) {
      var p = i.getIndex(!0), d = i.getEnd();
      if (p === 0 && _ >= d || p >= d && _ === 0)
        return h;
    }
    return n.speed;
  }
  return {
    mount: l,
    start: c,
    cancel: v
  };
}
var $l = /* @__PURE__ */ function() {
  function e(n, r) {
    this.event = U(), this.Components = {}, this.state = zu(Ye), this.splides = [], this._o = {}, this._E = {};
    var i = Le(n) ? $s(document, n) : n;
    gt(i, i + " is invalid."), this.root = i, r = Ie({
      label: le(i, ae) || "",
      labelledby: le(i, Fr) || ""
    }, Dl, e.defaults, r || {});
    try {
      Ie(r, JSON.parse(le(i, Pr)));
    } catch {
      gt(!1, "Invalid JSON");
    }
    this._o = Object.create(Ie({}, r));
  }
  var t = e.prototype;
  return t.mount = function(r, i) {
    var s = this, a = this.state, o = this.Components;
    gt(a.is([Ye, an]), "Already mounted!"), a.set(Ye), this._C = o, this._T = i || this._T || (this.is(Bt) ? Ml : Fl), this._E = r || this._E;
    var u = St({}, Pl, this._E, {
      Transition: this._T
    });
    return Ke(u, function(l, c) {
      var v = l(s, o, s._o);
      o[c] = v, v.setup && v.setup();
    }), Ke(o, function(l) {
      l.mount && l.mount();
    }), this.emit(He), ve(this.root, Xu), a.set(et), this.emit(li), this;
  }, t.sync = function(r) {
    return this.splides.push({
      splide: r
    }), r.splides.push({
      splide: this,
      isParent: !0
    }), this.state.is(et) && (this._C.Sync.remount(), r.Components.Sync.remount()), this;
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
    var i = this.event, s = this.state;
    return s.is(Ye) ? U(this).on(li, this.destroy.bind(this, r)) : (Ke(this._C, function(a) {
      a.destroy && a.destroy(r);
    }, !0), i.emit(js), i.destroy(), r && Ae(this.splides), s.set(an)), this;
  }, bu(e, [{
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
}(), jr = $l;
jr.defaults = {};
jr.STATES = Au;
/*!
  * PhotoSwipe Lightbox 5.4.3 - https://photoswipe.com
  * (c) 2023 Dmytro Semenov
  */
function dt(e, t, n) {
  const r = document.createElement(t);
  return e && (r.className = e), n && n.appendChild(r), r;
}
function zl(e, t, n) {
  let r = `translate3d(${e}px,${t || 0}px,0)`;
  return n !== void 0 && (r += ` scale3d(${n},${n},1)`), r;
}
function sr(e, t, n) {
  e.style.width = typeof t == "number" ? `${t}px` : t, e.style.height = typeof n == "number" ? `${n}px` : n;
}
const ie = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function kl(e) {
  return "button" in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function ht(e, t, n = document) {
  let r = [];
  if (e instanceof Element)
    r = [e];
  else if (e instanceof NodeList || Array.isArray(e))
    r = Array.from(e);
  else {
    const i = typeof e == "string" ? e : t;
    i && (r = Array.from(n.querySelectorAll(i)));
  }
  return r;
}
function Vl(e) {
  return typeof e == "function" && e.prototype && e.prototype.goTo;
}
function mi() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
class jl {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(t, n) {
    this.type = t, this.defaultPrevented = !1, n && Object.assign(this, n);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class Bl {
  constructor() {
    this._listeners = {}, this._filters = {}, this.pswp = void 0, this.options = void 0;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(t, n, r = 100) {
    var i, s, a;
    this._filters[t] || (this._filters[t] = []), (i = this._filters[t]) === null || i === void 0 || i.push({
      fn: n,
      priority: r
    }), (s = this._filters[t]) === null || s === void 0 || s.sort((o, u) => o.priority - u.priority), (a = this.pswp) === null || a === void 0 || a.addFilter(t, n, r);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(t, n) {
    this._filters[t] && (this._filters[t] = this._filters[t].filter((r) => r.fn !== n)), this.pswp && this.pswp.removeFilter(t, n);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(t, ...n) {
    var r;
    return (r = this._filters[t]) === null || r === void 0 || r.forEach((i) => {
      n[0] = i.fn.apply(this, n);
    }), n[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(t, n) {
    var r, i;
    this._listeners[t] || (this._listeners[t] = []), (r = this._listeners[t]) === null || r === void 0 || r.push(n), (i = this.pswp) === null || i === void 0 || i.on(t, n);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(t, n) {
    var r;
    this._listeners[t] && (this._listeners[t] = this._listeners[t].filter((i) => n !== i)), (r = this.pswp) === null || r === void 0 || r.off(t, n);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(t, n) {
    var r;
    if (this.pswp)
      return this.pswp.dispatch(t, n);
    const i = (
      /** @type {AugmentedEvent<T>} */
      new jl(t, n)
    );
    return (r = this._listeners[t]) === null || r === void 0 || r.forEach((s) => {
      s.call(this, i);
    }), i;
  }
}
class Kl {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(t, n) {
    if (this.element = dt("pswp__img pswp__img--placeholder", t ? "img" : "div", n), t) {
      const r = (
        /** @type {HTMLImageElement} */
        this.element
      );
      r.decoding = "async", r.alt = "", r.src = t, r.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(t, n) {
    this.element && (this.element.tagName === "IMG" ? (sr(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = zl(0, 0, t / 250)) : sr(this.element, t, n));
  }
  destroy() {
    var t;
    (t = this.element) !== null && t !== void 0 && t.parentNode && this.element.remove(), this.element = null;
  }
}
class Wl {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(t, n, r) {
    this.instance = n, this.data = t, this.index = r, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = ie.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
      content: this
    });
  }
  removePlaceholder() {
    this.placeholder && !this.keepPlaceholder() && setTimeout(() => {
      this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0);
    }, 1e3);
  }
  /**
   * Preload content
   *
   * @param {boolean} isLazy
   * @param {boolean} [reload]
   */
  load(t, n) {
    if (this.slide && this.usePlaceholder())
      if (this.placeholder) {
        const r = this.placeholder.element;
        r && !r.parentElement && this.slide.container.prepend(r);
      } else {
        const r = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : !1,
          this
        );
        this.placeholder = new Kl(r, this.slide.container);
      }
    this.element && !n || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: t
    }).defaultPrevented || (this.isImageContent() ? (this.element = dt("pswp__img", "img"), this.displayedImageWidth && this.loadImage(t)) : (this.element = dt("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), n && this.slide && this.slide.updateContentSize(!0));
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(t) {
    var n, r;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: t
    }).defaultPrevented)
      return;
    const i = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes(), this.data.srcset && (i.srcset = this.data.srcset), i.src = (n = this.data.src) !== null && n !== void 0 ? n : "", i.alt = (r = this.data.alt) !== null && r !== void 0 ? r : "", this.state = ie.LOADING, i.complete ? this.onLoaded() : (i.onload = () => {
      this.onLoaded();
    }, i.onerror = () => {
      this.onError();
    });
  }
  /**
   * Assign slide to content
   *
   * @param {Slide} slide
   */
  setSlide(t) {
    this.slide = t, this.hasSlide = !0, this.instance = t.pswp;
  }
  /**
   * Content load success handler
   */
  onLoaded() {
    this.state = ie.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), (this.state === ie.LOADED || this.state === ie.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = ie.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
      slide: this.slide,
      isError: !0,
      content: this
    }), this.instance.dispatch("loadError", {
      slide: this.slide,
      content: this
    }));
  }
  /**
   * @returns {Boolean} If the content is currently loading
   */
  isLoading() {
    return this.instance.applyFilters("isContentLoading", this.state === ie.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === ie.ERROR;
  }
  /**
   * @returns {boolean} If the content is image
   */
  isImageContent() {
    return this.type === "image";
  }
  /**
   * Update content size
   *
   * @param {Number} width
   * @param {Number} height
   */
  setDisplayedSize(t, n) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(t, n), !this.instance.dispatch("contentResize", {
      content: this,
      width: t,
      height: n
    }).defaultPrevented && (sr(this.element, t, n), this.isImageContent() && !this.isError()))) {
      const r = !this.displayedImageWidth && t;
      this.displayedImageWidth = t, this.displayedImageHeight = n, r ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: t,
        height: n,
        content: this
      });
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== ie.ERROR, this);
  }
  /**
   * Update image srcset sizes attribute based on width and height
   */
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset)
      return;
    const t = (
      /** @type HTMLImageElement */
      this.element
    ), n = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!t.dataset.largestUsedSize || n > parseInt(t.dataset.largestUsedSize, 10)) && (t.sizes = n + "px", t.dataset.largestUsedSize = String(n));
  }
  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */
  usePlaceholder() {
    return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
  }
  /**
   * Preload content with lazy-loading param
   */
  lazyLoad() {
    this.instance.dispatch("contentLazyLoad", {
      content: this
    }).defaultPrevented || this.load(!0);
  }
  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */
  keepPlaceholder() {
    return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
  }
  /**
   * Destroy the content
   */
  destroy() {
    this.hasSlide = !1, this.slide = void 0, !this.instance.dispatch("contentDestroy", {
      content: this
    }).defaultPrevented && (this.remove(), this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0), this.isImageContent() && this.element && (this.element.onload = null, this.element.onerror = null, this.element = void 0));
  }
  /**
   * Display error message
   */
  displayError() {
    if (this.slide) {
      var t, n;
      let r = dt("pswp__error-msg", "div");
      r.innerText = (t = (n = this.instance.options) === null || n === void 0 ? void 0 : n.errorMsg) !== null && t !== void 0 ? t : "", r = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", r, this), this.element = dt("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(r), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = !0, this.state === ie.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented)
      return;
    const t = "decode" in this.element;
    this.isImageContent() ? t && this.slide && (!this.slide.isActive || mi()) ? (this.isDecoding = !0, this.element.decode().catch(() => {
    }).finally(() => {
      this.isDecoding = !1, this.appendImage();
    })) : this.appendImage() : this.slide && !this.element.parentNode && this.slide.container.appendChild(this.element);
  }
  /**
   * Activate the slide,
   * active slide is generally the current one,
   * meaning the user can see it.
   */
  activate() {
    this.instance.dispatch("contentActivate", {
      content: this
    }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !mi() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
  }
  /**
   * Deactivate the content
   */
  deactivate() {
    this.instance.dispatch("contentDeactivate", {
      content: this
    }), this.slide && this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "true");
  }
  /**
   * Remove the content from DOM
   */
  remove() {
    this.isAttached = !1, !this.instance.dispatch("contentRemove", {
      content: this
    }).defaultPrevented && (this.element && this.element.parentNode && this.element.remove(), this.placeholder && this.placeholder.element && this.placeholder.element.remove());
  }
  /**
   * Append the image content to slide container
   */
  appendImage() {
    this.isAttached && (this.instance.dispatch("contentAppendImage", {
      content: this
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === ie.LOADED || this.state === ie.ERROR) && this.removePlaceholder()));
  }
}
function Ul(e, t) {
  if (e.getViewportSizeFn) {
    const n = e.getViewportSizeFn(e, t);
    if (n)
      return n;
  }
  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}
function Yt(e, t, n, r, i) {
  let s = 0;
  if (t.paddingFn)
    s = t.paddingFn(n, r, i)[e];
  else if (t.padding)
    s = t.padding[e];
  else {
    const a = "padding" + e[0].toUpperCase() + e.slice(1);
    t[a] && (s = t[a]);
  }
  return Number(s) || 0;
}
function Hl(e, t, n, r) {
  return {
    x: t.x - Yt("left", e, t, n, r) - Yt("right", e, t, n, r),
    y: t.y - Yt("top", e, t, n, r) - Yt("bottom", e, t, n, r)
  };
}
const yi = 4e3;
class Gl {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(t, n, r, i) {
    this.pswp = i, this.options = t, this.itemData = n, this.index = r, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
  }
  /**
   * Calculate initial, secondary and maximum zoom level for the specified slide.
   *
   * It should be called when either image or viewport size changes.
   *
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @param {Point} panAreaSize
   */
  update(t, n, r) {
    const i = {
      x: t,
      y: n
    };
    this.elementSize = i, this.panAreaSize = r;
    const s = r.x / i.x, a = r.y / i.y;
    this.fit = Math.min(1, s < a ? s : a), this.fill = Math.min(1, s > a ? s : a), this.vFill = Math.min(1, a), this.initial = this._getInitial(), this.secondary = this._getSecondary(), this.max = Math.max(this.initial, this.secondary, this._getMax()), this.min = Math.min(this.fit, this.initial, this.secondary), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", {
      zoomLevels: this,
      slideData: this.itemData
    });
  }
  /**
   * Parses user-defined zoom option.
   *
   * @private
   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
   * @returns { number | undefined }
   */
  _parseZoomLevelOption(t) {
    const n = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      t + "ZoomLevel"
    ), r = this.options[n];
    if (r)
      return typeof r == "function" ? r(this) : r === "fill" ? this.fill : r === "fit" ? this.fit : Number(r);
  }
  /**
   * Get zoom level to which image will be zoomed after double-tap gesture,
   * or when user clicks on zoom icon,
   * or mouse-click on image itself.
   * If you return 1 image will be zoomed to its original size.
   *
   * @private
   * @return {number}
   */
  _getSecondary() {
    let t = this._parseZoomLevelOption("secondary");
    return t || (t = Math.min(1, this.fit * 3), this.elementSize && t * this.elementSize.x > yi && (t = yi / this.elementSize.x), t);
  }
  /**
   * Get initial image zoom level.
   *
   * @private
   * @return {number}
   */
  _getInitial() {
    return this._parseZoomLevelOption("initial") || this.fit;
  }
  /**
   * Maximum zoom level when user zooms
   * via zoom/pinch gesture,
   * via cmd/ctrl-wheel or via trackpad.
   *
   * @private
   * @return {number}
   */
  _getMax() {
    return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
  }
}
function oa(e, t, n) {
  const r = t.createContentFromData(e, n);
  let i;
  const {
    options: s
  } = t;
  if (s) {
    i = new Gl(s, e, -1);
    let a;
    t.pswp ? a = t.pswp.viewportSize : a = Ul(s, t);
    const o = Hl(s, a, e, n);
    i.update(r.width, r.height, o);
  }
  return r.lazyLoad(), i && r.setDisplayedSize(Math.ceil(r.width * i.initial), Math.ceil(r.height * i.initial)), r;
}
function ql(e, t) {
  const n = t.getItemData(e);
  if (!t.dispatch("lazyLoadSlide", {
    index: e,
    itemData: n
  }).defaultPrevented)
    return oa(n, t, e);
}
class Yl extends Bl {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var t;
    let n = 0;
    const r = (t = this.options) === null || t === void 0 ? void 0 : t.dataSource;
    r && "length" in r ? n = r.length : r && "gallery" in r && (r.items || (r.items = this._getGalleryDOMElements(r.gallery)), r.items && (n = r.items.length));
    const i = this.dispatch("numItems", {
      dataSource: r,
      numItems: n
    });
    return this.applyFilters("numItems", i.numItems, r);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(t, n) {
    return new Wl(t, this, n);
  }
  /**
   * Get item data by index.
   *
   * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
   * For example, it may contain properties like
   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
   *
   * @param {number} index
   * @returns {SlideData}
   */
  getItemData(t) {
    var n;
    const r = (n = this.options) === null || n === void 0 ? void 0 : n.dataSource;
    let i = {};
    Array.isArray(r) ? i = r[t] : r && "gallery" in r && (r.items || (r.items = this._getGalleryDOMElements(r.gallery)), i = r.items[t]);
    let s = i;
    s instanceof Element && (s = this._domElementToItemData(s));
    const a = this.dispatch("itemData", {
      itemData: s || {},
      index: t
    });
    return this.applyFilters("itemData", a.itemData, t);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(t) {
    var n, r;
    return (n = this.options) !== null && n !== void 0 && n.children || (r = this.options) !== null && r !== void 0 && r.childSelector ? ht(this.options.children, this.options.childSelector, t) || [] : [t];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(t) {
    const n = {
      element: t
    }, r = (
      /** @type {HTMLAnchorElement} */
      t.tagName === "A" ? t : t.querySelector("a")
    );
    if (r) {
      n.src = r.dataset.pswpSrc || r.href, r.dataset.pswpSrcset && (n.srcset = r.dataset.pswpSrcset), n.width = r.dataset.pswpWidth ? parseInt(r.dataset.pswpWidth, 10) : 0, n.height = r.dataset.pswpHeight ? parseInt(r.dataset.pswpHeight, 10) : 0, n.w = n.width, n.h = n.height, r.dataset.pswpType && (n.type = r.dataset.pswpType);
      const s = t.querySelector("img");
      if (s) {
        var i;
        n.msrc = s.currentSrc || s.src, n.alt = (i = s.getAttribute("alt")) !== null && i !== void 0 ? i : "";
      }
      (r.dataset.pswpCropped || r.dataset.cropped) && (n.thumbCropped = !0);
    }
    return this.applyFilters("domItemData", n, t, r);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(t, n) {
    return oa(t, this, n);
  }
}
class Xl extends Yl {
  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(t) {
    super(), this.options = t || {}, this._uid = 0, this.shouldOpen = !1, this._preloadedContent = void 0, this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }
  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */
  init() {
    ht(this.options.gallery, this.options.gallerySelector).forEach((t) => {
      t.addEventListener("click", this.onThumbnailsClick, !1);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(t) {
    if (kl(t) || window.pswp)
      return;
    let n = {
      x: t.clientX,
      y: t.clientY
    };
    !n.x && !n.y && (n = null);
    let r = this.getClickedIndex(t);
    r = this.applyFilters("clickedIndex", r, t, this);
    const i = {
      gallery: (
        /** @type {HTMLElement} */
        t.currentTarget
      )
    };
    r >= 0 && (t.preventDefault(), this.loadAndOpen(r, i, n));
  }
  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   * @returns {number}
   */
  getClickedIndex(t) {
    if (this.options.getClickedIndexFn)
      return this.options.getClickedIndexFn.call(this, t);
    const n = (
      /** @type {HTMLElement} */
      t.target
    ), i = ht(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      t.currentTarget
    ).findIndex((s) => s === n || s.contains(n));
    return i !== -1 ? i : this.options.children || this.options.childSelector ? -1 : 0;
  }
  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */
  loadAndOpen(t, n, r) {
    if (window.pswp || !this.options)
      return !1;
    if (!n && this.options.gallery && this.options.children) {
      const i = ht(this.options.gallery);
      i[0] && (n = {
        gallery: i[0]
      });
    }
    return this.options.index = t, this.options.initialPointerPos = r, this.shouldOpen = !0, this.preload(t, n), !0;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(t, n) {
    const {
      options: r
    } = this;
    n && (r.dataSource = n);
    const i = [], s = typeof r.pswpModule;
    if (Vl(r.pswpModule))
      i.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        r.pswpModule
      ));
    else {
      if (s === "string")
        throw new Error("pswpModule as string is no longer supported");
      if (s === "function")
        i.push(
          /** @type {() => Promise<Type<PhotoSwipe>>} */
          r.pswpModule()
        );
      else
        throw new Error("pswpModule is not valid");
    }
    typeof r.openPromise == "function" && i.push(r.openPromise()), r.preloadFirstSlide !== !1 && t >= 0 && (this._preloadedContent = ql(t, this));
    const a = ++this._uid;
    Promise.all(i).then((o) => {
      if (this.shouldOpen) {
        const u = o[0];
        this._openPhotoswipe(u, a);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(t, n) {
    if (n !== this._uid && this.shouldOpen || (this.shouldOpen = !1, window.pswp))
      return;
    const r = typeof t == "object" ? new t.default(this.options) : new t(this.options);
    this.pswp = r, window.pswp = r, Object.keys(this._listeners).forEach((i) => {
      var s;
      (s = this._listeners[i]) === null || s === void 0 || s.forEach((a) => {
        r.on(
          i,
          /** @type {EventCallback<typeof name>} */
          a
        );
      });
    }), Object.keys(this._filters).forEach((i) => {
      var s;
      (s = this._filters[i]) === null || s === void 0 || s.forEach((a) => {
        r.addFilter(i, a.fn, a.priority);
      });
    }), this._preloadedContent && (r.contentLoader.addToCache(this._preloadedContent), this._preloadedContent = void 0), r.on("destroy", () => {
      this.pswp = void 0, delete window.pswp;
    }), r.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var t;
    (t = this.pswp) === null || t === void 0 || t.destroy(), this.shouldOpen = !1, this._listeners = {}, ht(this.options.gallery, this.options.gallerySelector).forEach((n) => {
      n.removeEventListener("click", this.onThumbnailsClick, !1);
    });
  }
}
window.Alpine = Et;
window.intersect = Ls;
Et.plugin(Ls);
window.Splide = jr;
window.PhotoSwipeLightbox = Xl;
document.addEventListener("alpine:init", () => {
  Et.store("toasts", {
    counter: 0,
    list: [],
    createToast(e, t = "info", n = 2e3) {
      const r = this.list.length;
      let i = this.list.filter((s) => s.visible).length + 1;
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
  }), Et.store("home_products", {
    products: []
  });
});
Et.start();
