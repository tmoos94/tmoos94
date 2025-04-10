var e = Object.defineProperty
  , t = Object.defineProperties
  , s = Object.getOwnPropertyDescriptors
  , i = Object.getOwnPropertySymbols
  , r = Object.prototype.hasOwnProperty
  , a = Object.prototype.propertyIsEnumerable
  , n = (t,s,i)=>s in t ? e(t, s, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : t[s] = i
  , o = (e,t)=>{
    for (var s in t || (t = {}))
        r.call(t, s) && n(e, s, t[s]);
    if (i)
        for (var s of i(t))
            a.call(t, s) && n(e, s, t[s]);
    return e
}
  , l = (e,i)=>t(e, s(i));
function d(e) {
    return null !== e && "object" == typeof e && "constructor"in e && e.constructor === Object
}
function c(e, t) {
    void 0 === e && (e = {}),
    void 0 === t && (t = {}),
    Object.keys(t).forEach((s=>{
        void 0 === e[s] ? e[s] = t[s] : d(t[s]) && d(e[s]) && Object.keys(t[s]).length > 0 && c(e[s], t[s])
    }
    ))
}
const p = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
        blur() {},
        nodeName: ""
    },
    querySelector: ()=>null,
    querySelectorAll: ()=>[],
    getElementById: ()=>null,
    createEvent: ()=>({
        initEvent() {}
    }),
    createElement: ()=>({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: ()=>[]
    }),
    createElementNS: ()=>({}),
    importNode: ()=>null,
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};
function u() {
    const e = "undefined" != typeof document ? document : {};
    return c(e, p),
    e
}
const h = {
    document: p,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
    },
    CustomEvent: function() {
        return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: ()=>({
        getPropertyValue: ()=>""
    }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: ()=>({}),
    requestAnimationFrame: e=>"undefined" == typeof setTimeout ? (e(),
    null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e)
    }
};
function f() {
    const e = "undefined" != typeof window ? window : {};
    return c(e, h),
    e
}
function m(e, t) {
    return void 0 === t && (t = 0),
    setTimeout(e, t)
}
function v() {
    return Date.now()
}
function g(e, t) {
    void 0 === t && (t = "x");
    const s = f();
    let i, r, a;
    const n = function(e) {
        const t = f();
        let s;
        return t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
    }(e);
    return s.WebKitCSSMatrix ? (r = n.transform || n.webkitTransform,
    r.split(",").length > 6 && (r = r.split(", ").map((e=>e.replace(",", "."))).join(", ")),
    a = new s.WebKitCSSMatrix("none" === r ? "" : r)) : (a = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
    i = a.toString().split(",")),
    "x" === t && (r = s.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
    "y" === t && (r = s.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
    r || 0
}
function w(e) {
    return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
}
function S(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
}
function b() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0])
      , t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
        const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
        if (null != i && !S(i)) {
            const s = Object.keys(Object(i)).filter((e=>t.indexOf(e) < 0));
            for (let t = 0, r = s.length; t < r; t += 1) {
                const r = s[t]
                  , a = Object.getOwnPropertyDescriptor(i, r);
                void 0 !== a && a.enumerable && (w(e[r]) && w(i[r]) ? i[r].__swiper__ ? e[r] = i[r] : b(e[r], i[r]) : !w(e[r]) && w(i[r]) ? (e[r] = {},
                i[r].__swiper__ ? e[r] = i[r] : b(e[r], i[r])) : e[r] = i[r])
            }
        }
    }
    return e
}
function T(e, t, s) {
    e.style.setProperty(t, s)
}
function y(e) {
    let {swiper: t, targetPosition: s, side: i} = e;
    const r = f()
      , a = -t.translate;
    let n, o = null;
    const l = t.params.speed;
    t.wrapperEl.style.scrollSnapType = "none",
    r.cancelAnimationFrame(t.cssModeFrameID);
    const d = s > a ? "next" : "prev"
      , c = (e,t)=>"next" === d && e >= t || "prev" === d && e <= t
      , p = ()=>{
        n = (new Date).getTime(),
        null === o && (o = n);
        const e = Math.max(Math.min((n - o) / l, 1), 0)
          , d = .5 - Math.cos(e * Math.PI) / 2;
        let u = a + d * (s - a);
        if (c(u, s) && (u = s),
        t.wrapperEl.scrollTo({
            [i]: u
        }),
        c(u, s))
            return t.wrapperEl.style.overflow = "hidden",
            t.wrapperEl.style.scrollSnapType = "",
            setTimeout((()=>{
                t.wrapperEl.style.overflow = "",
                t.wrapperEl.scrollTo({
                    [i]: u
                })
            }
            )),
            void r.cancelAnimationFrame(t.cssModeFrameID);
        t.cssModeFrameID = r.requestAnimationFrame(p)
    }
    ;
    p()
}
function x(e) {
    return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e
}
function E(e, t) {
    return void 0 === t && (t = ""),
    [...e.children].filter((e=>e.matches(t)))
}
function M(e) {
    try {
        return void console.warn(e)
    } catch (t) {}
}
function P(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return s.classList.add(...Array.isArray(t) ? t : function(e) {
        return void 0 === e && (e = ""),
        e.trim().split(" ").filter((e=>!!e.trim()))
    }(t)),
    s
}
function C(e, t) {
    return f().getComputedStyle(e, null).getPropertyValue(t)
}
function I(e) {
    let t, s = e;
    if (s) {
        for (t = 0; null !== (s = s.previousSibling); )
            1 === s.nodeType && (t += 1);
        return t
    }
}
function O(e, t, s) {
    const i = f();
    return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth
}
let L, k, z;
function A() {
    return L || (L = function() {
        const e = f()
          , t = u();
        return {
            smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior"in t.documentElement.style,
            touch: !!("ontouchstart"in e || e.DocumentTouch && t instanceof e.DocumentTouch)
        }
    }()),
    L
}
function G(e) {
    return void 0 === e && (e = {}),
    k || (k = function(e) {
        let {userAgent: t} = void 0 === e ? {} : e;
        const s = A()
          , i = f()
          , r = i.navigator.platform
          , a = t || i.navigator.userAgent
          , n = {
            ios: !1,
            android: !1
        }
          , o = i.screen.width
          , l = i.screen.height
          , d = a.match(/(Android);?[\s\/]+([\d.]+)?/);
        let c = a.match(/(iPad).*OS\s([\d_]+)/);
        const p = a.match(/(iPod)(.*OS\s([\d_]+))?/)
          , u = !c && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
          , h = "Win32" === r;
        let m = "MacIntel" === r;
        return !c && m && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x${l}`) >= 0 && (c = a.match(/(Version)\/([\d.]+)/),
        c || (c = [0, 1, "13_0_0"]),
        m = !1),
        d && !h && (n.os = "android",
        n.android = !0),
        (c || u || p) && (n.os = "ios",
        n.ios = !0),
        n
    }(e)),
    k
}
function D() {
    return z || (z = function() {
        const e = f();
        let t = !1;
        function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
        }
        if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
                const [e,i] = s.split("Version/")[1].split(" ")[0].split(".").map((e=>Number(e)));
                t = e < 16 || 16 === e && i < 2
            }
        }
        return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
        }
    }()),
    z
}
const $ = (e,t)=>{
    if (!e || e.destroyed || !e.params)
        return;
    const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
    if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t && e.isElement && (s.shadowRoot ? t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame((()=>{
            s.shadowRoot && (t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`),
            t && t.remove())
        }
        ))),
        t && t.remove()
    }
}
  , _ = (e,t)=>{
    if (!e.slides[t])
        return;
    const s = e.slides[t].querySelector('[loading="lazy"]');
    s && s.removeAttribute("loading")
}
  , V = e=>{
    if (!e || e.destroyed || !e.params)
        return;
    let t = e.params.lazyPreloadPrevNext;
    const s = e.slides.length;
    if (!s || !t || t < 0)
        return;
    t = Math.min(t, s);
    const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView)
      , r = e.activeIndex;
    if (e.params.grid && e.params.grid.rows > 1) {
        const s = r
          , a = [s - t];
        return a.push(...Array.from({
            length: t
        }).map(((e,t)=>s + i + t))),
        void e.slides.forEach(((t,s)=>{
            a.includes(t.column) && _(e, s)
        }
        ))
    }
    const a = r + i - 1;
    if (e.params.rewind || e.params.loop)
        for (let n = r - t; n <= a + t; n += 1) {
            const t = (n % s + s) % s;
            (t < r || t > a) && _(e, t)
        }
    else
        for (let n = Math.max(r - t, 0); n <= Math.min(a + t, s - 1); n += 1)
            n !== r && (n > a || n < r) && _(e, n)
}
;
function N(e) {
    let {swiper: t, runCallbacks: s, direction: i, step: r} = e;
    const {activeIndex: a, previousIndex: n} = t;
    let o = i;
    if (o || (o = a > n ? "next" : a < n ? "prev" : "reset"),
    t.emit(`transition${r}`),
    s && a !== n) {
        if ("reset" === o)
            return void t.emit(`slideResetTransition${r}`);
        t.emit(`slideChangeTransition${r}`),
        "next" === o ? t.emit(`slideNextTransition${r}`) : t.emit(`slidePrevTransition${r}`)
    }
}
function F(e, t, s) {
    const i = f()
      , {params: r} = e
      , a = r.edgeSwipeDetection
      , n = r.edgeSwipeThreshold;
    return !a || !(s <= n || s >= i.innerWidth - n) || "prevent" === a && (t.preventDefault(),
    !0)
}
function B(e) {
    const t = this
      , s = u();
    let i = e;
    i.originalEvent && (i = i.originalEvent);
    const r = t.touchEventsData;
    if ("pointerdown" === i.type) {
        if (null !== r.pointerId && r.pointerId !== i.pointerId)
            return;
        r.pointerId = i.pointerId
    } else
        "touchstart" === i.type && 1 === i.targetTouches.length && (r.touchId = i.targetTouches[0].identifier);
    if ("touchstart" === i.type)
        return void F(t, i, i.targetTouches[0].pageX);
    const {params: a, touches: n, enabled: o} = t;
    if (!o)
        return;
    if (!a.simulateTouch && "mouse" === i.pointerType)
        return;
    if (t.animating && a.preventInteractionOnTransition)
        return;
    !t.animating && a.cssMode && a.loop && t.loopFix();
    let l = i.target;
    if ("wrapper" === a.touchEventsTarget && !t.wrapperEl.contains(l))
        return;
    if ("which"in i && 3 === i.which)
        return;
    if ("button"in i && i.button > 0)
        return;
    if (r.isTouched && r.isMoved)
        return;
    const d = !!a.noSwipingClass && "" !== a.noSwipingClass
      , c = i.composedPath ? i.composedPath() : i.path;
    d && i.target && i.target.shadowRoot && c && (l = c[0]);
    const p = a.noSwipingSelector ? a.noSwipingSelector : `.${a.noSwipingClass}`
      , h = !(!i.target || !i.target.shadowRoot);
    if (a.noSwiping && (h ? function(e, t) {
        return void 0 === t && (t = this),
        function t(s) {
            if (!s || s === u() || s === f())
                return null;
            s.assignedSlot && (s = s.assignedSlot);
            const i = s.closest(e);
            return i || s.getRootNode ? i || t(s.getRootNode().host) : null
        }(t)
    }(p, l) : l.closest(p)))
        return void (t.allowClick = !0);
    if (a.swipeHandler && !l.closest(a.swipeHandler))
        return;
    n.currentX = i.pageX,
    n.currentY = i.pageY;
    const m = n.currentX
      , g = n.currentY;
    if (!F(t, i, m))
        return;
    Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }),
    n.startX = m,
    n.startY = g,
    r.touchStartTime = v(),
    t.allowClick = !0,
    t.updateSize(),
    t.swipeDirection = void 0,
    a.threshold > 0 && (r.allowThresholdMove = !1);
    let w = !0;
    l.matches(r.focusableElements) && (w = !1,
    "SELECT" === l.nodeName && (r.isTouched = !1)),
    s.activeElement && s.activeElement.matches(r.focusableElements) && s.activeElement !== l && s.activeElement.blur();
    const S = w && t.allowTouchMove && a.touchStartPreventDefault;
    !a.touchStartForcePreventDefault && !S || l.isContentEditable || i.preventDefault(),
    a.freeMode && a.freeMode.enabled && t.freeMode && t.animating && !a.cssMode && t.freeMode.onTouchStart(),
    t.emit("touchStart", i)
}
function j(e) {
    const t = u()
      , s = this
      , i = s.touchEventsData
      , {params: r, touches: a, rtlTranslate: n, enabled: o} = s;
    if (!o)
        return;
    if (!r.simulateTouch && "mouse" === e.pointerType)
        return;
    let l, d = e;
    if (d.originalEvent && (d = d.originalEvent),
    "pointermove" === d.type) {
        if (null !== i.touchId)
            return;
        if (d.pointerId !== i.pointerId)
            return
    }
    if ("touchmove" === d.type) {
        if (l = [...d.changedTouches].filter((e=>e.identifier === i.touchId))[0],
        !l || l.identifier !== i.touchId)
            return
    } else
        l = d;
    if (!i.isTouched)
        return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", d));
    const c = l.pageX
      , p = l.pageY;
    if (d.preventedByNestedSwiper)
        return a.startX = c,
        void (a.startY = p);
    if (!s.allowTouchMove)
        return d.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (i.isTouched && (Object.assign(a, {
            startX: c,
            startY: p,
            currentX: c,
            currentY: p
        }),
        i.touchStartTime = v()));
    if (r.touchReleaseOnEdges && !r.loop)
        if (s.isVertical()) {
            if (p < a.startY && s.translate <= s.maxTranslate() || p > a.startY && s.translate >= s.minTranslate())
                return i.isTouched = !1,
                void (i.isMoved = !1)
        } else if (c < a.startX && s.translate <= s.maxTranslate() || c > a.startX && s.translate >= s.minTranslate())
            return;
    if (t.activeElement && d.target === t.activeElement && d.target.matches(i.focusableElements))
        return i.isMoved = !0,
        void (s.allowClick = !1);
    i.allowTouchCallbacks && s.emit("touchMove", d),
    a.previousX = a.currentX,
    a.previousY = a.currentY,
    a.currentX = c,
    a.currentY = p;
    const h = a.currentX - a.startX
      , f = a.currentY - a.startY;
    if (s.params.threshold && Math.sqrt(h ** 2 + f ** 2) < s.params.threshold)
        return;
    if (void 0 === i.isScrolling) {
        let e;
        s.isHorizontal() && a.currentY === a.startY || s.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : h * h + f * f >= 25 && (e = 180 * Math.atan2(Math.abs(f), Math.abs(h)) / Math.PI,
        i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
    }
    if (i.isScrolling && s.emit("touchMoveOpposite", d),
    void 0 === i.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (i.startMoving = !0)),
    i.isScrolling)
        return void (i.isTouched = !1);
    if (!i.startMoving)
        return;
    s.allowClick = !1,
    !r.cssMode && d.cancelable && d.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && d.stopPropagation();
    let m = s.isHorizontal() ? h : f
      , g = s.isHorizontal() ? a.currentX - a.previousX : a.currentY - a.previousY;
    r.oneWayMovement && (m = Math.abs(m) * (n ? 1 : -1),
    g = Math.abs(g) * (n ? 1 : -1)),
    a.diff = m,
    m *= r.touchRatio,
    n && (m = -m,
    g = -g);
    const w = s.touchesDirection;
    s.swipeDirection = m > 0 ? "prev" : "next",
    s.touchesDirection = g > 0 ? "prev" : "next";
    const S = s.params.loop && !r.cssMode
      , b = "next" === s.touchesDirection && s.allowSlideNext || "prev" === s.touchesDirection && s.allowSlidePrev;
    if (!i.isMoved) {
        if (S && b && s.loopFix({
            direction: s.swipeDirection
        }),
        i.startTranslate = s.getTranslate(),
        s.setTransition(0),
        s.animating) {
            const e = new window.CustomEvent("transitionend",{
                bubbles: !0,
                cancelable: !0
            });
            s.wrapperEl.dispatchEvent(e)
        }
        i.allowMomentumBounce = !1,
        !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0),
        s.emit("sliderFirstMove", d)
    }
    if ((new Date).getTime(),
    i.isMoved && i.allowThresholdMove && w !== s.touchesDirection && S && b && Math.abs(m) >= 1)
        return Object.assign(a, {
            startX: c,
            startY: p,
            currentX: c,
            currentY: p,
            startTranslate: i.currentTranslate
        }),
        i.loopSwapReset = !0,
        void (i.startTranslate = i.currentTranslate);
    s.emit("sliderMove", d),
    i.isMoved = !0,
    i.currentTranslate = m + i.startTranslate;
    let T = !0
      , y = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (y = 0),
    m > 0 ? (S && b && i.allowThresholdMove && i.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1] : s.minTranslate()) && s.loopFix({
        direction: "prev",
        setTranslate: !0,
        activeSlideIndex: 0
    }),
    i.currentTranslate > s.minTranslate() && (T = !1,
    r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + m) ** y))) : m < 0 && (S && b && i.allowThresholdMove && i.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.slidesSizesGrid[s.slidesSizesGrid.length - 1] : s.maxTranslate()) && s.loopFix({
        direction: "next",
        setTranslate: !0,
        activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
    }),
    i.currentTranslate < s.maxTranslate() && (T = !1,
    r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - m) ** y))),
    T && (d.preventedByNestedSwiper = !0),
    !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
    !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
    s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate),
    r.threshold > 0) {
        if (!(Math.abs(m) > r.threshold || i.allowThresholdMove))
            return void (i.currentTranslate = i.startTranslate);
        if (!i.allowThresholdMove)
            return i.allowThresholdMove = !0,
            a.startX = a.currentX,
            a.startY = a.currentY,
            i.currentTranslate = i.startTranslate,
            void (a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
    }
    r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(),
    s.updateSlidesClasses()),
    r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
    s.updateProgress(i.currentTranslate),
    s.setTranslate(i.currentTranslate))
}
function H(e) {
    const t = this
      , s = t.touchEventsData;
    let i, r = e;
    r.originalEvent && (r = r.originalEvent);
    if ("touchend" === r.type || "touchcancel" === r.type) {
        if (i = [...r.changedTouches].filter((e=>e.identifier === s.touchId))[0],
        !i || i.identifier !== s.touchId)
            return
    } else {
        if (null !== s.touchId)
            return;
        if (r.pointerId !== s.pointerId)
            return;
        i = r
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(r.type)) {
        if (!(["pointercancel", "contextmenu"].includes(r.type) && (t.browser.isSafari || t.browser.isWebView)))
            return
    }
    s.pointerId = null,
    s.touchId = null;
    const {params: a, touches: n, rtlTranslate: o, slidesGrid: l, enabled: d} = t;
    if (!d)
        return;
    if (!a.simulateTouch && "mouse" === r.pointerType)
        return;
    if (s.allowTouchCallbacks && t.emit("touchEnd", r),
    s.allowTouchCallbacks = !1,
    !s.isTouched)
        return s.isMoved && a.grabCursor && t.setGrabCursor(!1),
        s.isMoved = !1,
        void (s.startMoving = !1);
    a.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
    const c = v()
      , p = c - s.touchStartTime;
    if (t.allowClick) {
        const e = r.path || r.composedPath && r.composedPath();
        t.updateClickedSlide(e && e[0] || r.target, e),
        t.emit("tap click", r),
        p < 300 && c - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", r)
    }
    if (s.lastClickTime = v(),
    m((()=>{
        t.destroyed || (t.allowClick = !0)
    }
    )),
    !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === n.diff && !s.loopSwapReset || s.currentTranslate === s.startTranslate && !s.loopSwapReset)
        return s.isTouched = !1,
        s.isMoved = !1,
        void (s.startMoving = !1);
    let u;
    if (s.isTouched = !1,
    s.isMoved = !1,
    s.startMoving = !1,
    u = a.followFinger ? o ? t.translate : -t.translate : -s.currentTranslate,
    a.cssMode)
        return;
    if (a.freeMode && a.freeMode.enabled)
        return void t.freeMode.onTouchEnd({
            currentPos: u
        });
    let h = 0
      , f = t.slidesSizesGrid[0];
    for (let m = 0; m < l.length; m += m < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
        const e = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
        void 0 !== l[m + e] ? u >= l[m] && u < l[m + e] && (h = m,
        f = l[m + e] - l[m]) : u >= l[m] && (h = m,
        f = l[l.length - 1] - l[l.length - 2])
    }
    let g = null
      , w = null;
    a.rewind && (t.isBeginning ? w = a.virtual && a.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
    const S = (u - l[h]) / f
      , b = h < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (p > a.longSwipesMs) {
        if (!a.longSwipes)
            return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection && (S >= a.longSwipesRatio ? t.slideTo(a.rewind && t.isEnd ? g : h + b) : t.slideTo(h)),
        "prev" === t.swipeDirection && (S > 1 - a.longSwipesRatio ? t.slideTo(h + b) : null !== w && S < 0 && Math.abs(S) > a.longSwipesRatio ? t.slideTo(w) : t.slideTo(h))
    } else {
        if (!a.shortSwipes)
            return void t.slideTo(t.activeIndex);
        t.navigation && (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl) ? r.target === t.navigation.nextEl ? t.slideTo(h + b) : t.slideTo(h) : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : h + b),
        "prev" === t.swipeDirection && t.slideTo(null !== w ? w : h))
    }
}
function R() {
    const e = this
      , {params: t, el: s} = e;
    if (s && 0 === s.offsetWidth)
        return;
    t.breakpoints && e.setBreakpoint();
    const {allowSlideNext: i, allowSlidePrev: r, snapGrid: a} = e
      , n = e.virtual && e.params.virtual.enabled;
    e.allowSlideNext = !0,
    e.allowSlidePrev = !0,
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses();
    const o = n && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || o ? e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0),
    e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout),
    e.autoplay.resizeTimeout = setTimeout((()=>{
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
    }
    ), 500)),
    e.allowSlidePrev = r,
    e.allowSlideNext = i,
    e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow()
}
function q(e) {
    const t = this;
    t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(),
    t.params.preventClicksPropagation && t.animating && (e.stopPropagation(),
    e.stopImmediatePropagation())))
}
function W() {
    const e = this
      , {wrapperEl: t, rtlTranslate: s, enabled: i} = e;
    if (!i)
        return;
    let r;
    e.previousTranslate = e.translate,
    e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop,
    0 === e.translate && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses();
    const a = e.maxTranslate() - e.minTranslate();
    r = 0 === a ? 0 : (e.translate - e.minTranslate()) / a,
    r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1)
}
function X(e) {
    const t = this;
    $(t, e.target),
    t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update()
}
function Y() {
    const e = this;
    e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0,
    e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"))
}
const U = (e,t)=>{
    const s = u()
      , {params: i, el: r, wrapperEl: a, device: n} = e
      , o = !!i.nested
      , l = "on" === t ? "addEventListener" : "removeEventListener"
      , d = t;
    s[l]("touchstart", e.onDocumentTouchStart, {
        passive: !1,
        capture: o
    }),
    r[l]("touchstart", e.onTouchStart, {
        passive: !1
    }),
    r[l]("pointerdown", e.onTouchStart, {
        passive: !1
    }),
    s[l]("touchmove", e.onTouchMove, {
        passive: !1,
        capture: o
    }),
    s[l]("pointermove", e.onTouchMove, {
        passive: !1,
        capture: o
    }),
    s[l]("touchend", e.onTouchEnd, {
        passive: !0
    }),
    s[l]("pointerup", e.onTouchEnd, {
        passive: !0
    }),
    s[l]("pointercancel", e.onTouchEnd, {
        passive: !0
    }),
    s[l]("touchcancel", e.onTouchEnd, {
        passive: !0
    }),
    s[l]("pointerout", e.onTouchEnd, {
        passive: !0
    }),
    s[l]("pointerleave", e.onTouchEnd, {
        passive: !0
    }),
    s[l]("contextmenu", e.onTouchEnd, {
        passive: !0
    }),
    (i.preventClicks || i.preventClicksPropagation) && r[l]("click", e.onClick, !0),
    i.cssMode && a[l]("scroll", e.onScroll),
    i.updateOnWindowResize ? e[d](n.ios || n.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", R, !0) : e[d]("observerUpdate", R, !0),
    r[l]("load", e.onLoad, {
        capture: !0
    })
}
;
const K = (e,t)=>e.grid && t.grid && t.grid.rows > 1;
var Z = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1
};
function J(e, t) {
    return function(s) {
        void 0 === s && (s = {});
        const i = Object.keys(s)[0]
          , r = s[i];
        "object" == typeof r && null !== r ? (!0 === e[i] && (e[i] = {
            enabled: !0
        }),
        "navigation" === i && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl && (e[i].auto = !0),
        ["pagination", "scrollbar"].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el && (e[i].auto = !0),
        i in e && "enabled"in r ? ("object" != typeof e[i] || "enabled"in e[i] || (e[i].enabled = !0),
        e[i] || (e[i] = {
            enabled: !1
        }),
        b(t, s)) : b(t, s)) : b(t, s)
    }
}
const Q = {
    eventsEmitter: {
        on(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            const r = s ? "unshift" : "push";
            return e.split(" ").forEach((e=>{
                i.eventsListeners[e] || (i.eventsListeners[e] = []),
                i.eventsListeners[e][r](t)
            }
            )),
            i
        },
        once(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            function r() {
                i.off(e, r),
                r.__emitterProxy && delete r.__emitterProxy;
                for (var s = arguments.length, a = new Array(s), n = 0; n < s; n++)
                    a[n] = arguments[n];
                t.apply(i, a)
            }
            return r.__emitterProxy = t,
            i.on(e, r, s)
        },
        onAny(e, t) {
            const s = this;
            if (!s.eventsListeners || s.destroyed)
                return s;
            if ("function" != typeof e)
                return s;
            const i = t ? "unshift" : "push";
            return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e),
            s
        },
        offAny(e) {
            const t = this;
            if (!t.eventsListeners || t.destroyed)
                return t;
            if (!t.eventsAnyListeners)
                return t;
            const s = t.eventsAnyListeners.indexOf(e);
            return s >= 0 && t.eventsAnyListeners.splice(s, 1),
            t
        },
        off(e, t) {
            const s = this;
            return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e=>{
                void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((i,r)=>{
                    (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(r, 1)
                }
                ))
            }
            )),
            s) : s
        },
        emit() {
            const e = this;
            if (!e.eventsListeners || e.destroyed)
                return e;
            if (!e.eventsListeners)
                return e;
            let t, s, i;
            for (var r = arguments.length, a = new Array(r), n = 0; n < r; n++)
                a[n] = arguments[n];
            "string" == typeof a[0] || Array.isArray(a[0]) ? (t = a[0],
            s = a.slice(1, a.length),
            i = e) : (t = a[0].events,
            s = a[0].data,
            i = a[0].context || e),
            s.unshift(i);
            return (Array.isArray(t) ? t : t.split(" ")).forEach((t=>{
                e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e=>{
                    e.apply(i, [t, ...s])
                }
                )),
                e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e=>{
                    e.apply(i, s)
                }
                ))
            }
            )),
            e
        }
    },
    update: {
        updateSize: function() {
            const e = this;
            let t, s;
            const i = e.el;
            t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth,
            s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight,
            0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(C(i, "padding-left") || 0, 10) - parseInt(C(i, "padding-right") || 0, 10),
            s = s - parseInt(C(i, "padding-top") || 0, 10) - parseInt(C(i, "padding-bottom") || 0, 10),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
                width: t,
                height: s,
                size: e.isHorizontal() ? t : s
            }))
        },
        updateSlides: function() {
            const e = this;
            function t(t, s) {
                return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0)
            }
            const s = e.params
              , {wrapperEl: i, slidesEl: r, size: a, rtlTranslate: n, wrongRTL: o} = e
              , l = e.virtual && s.virtual.enabled
              , d = l ? e.virtual.slides.length : e.slides.length
              , c = E(r, `.${e.params.slideClass}, swiper-slide`)
              , p = l ? e.virtual.slides.length : c.length;
            let u = [];
            const h = []
              , f = [];
            let m = s.slidesOffsetBefore;
            "function" == typeof m && (m = s.slidesOffsetBefore.call(e));
            let v = s.slidesOffsetAfter;
            "function" == typeof v && (v = s.slidesOffsetAfter.call(e));
            const g = e.snapGrid.length
              , w = e.slidesGrid.length;
            let S = s.spaceBetween
              , b = -m
              , y = 0
              , x = 0;
            if (void 0 === a)
                return;
            "string" == typeof S && S.indexOf("%") >= 0 ? S = parseFloat(S.replace("%", "")) / 100 * a : "string" == typeof S && (S = parseFloat(S)),
            e.virtualSize = -S,
            c.forEach((e=>{
                n ? e.style.marginLeft = "" : e.style.marginRight = "",
                e.style.marginBottom = "",
                e.style.marginTop = ""
            }
            )),
            s.centeredSlides && s.cssMode && (T(i, "--swiper-centered-offset-before", ""),
            T(i, "--swiper-centered-offset-after", ""));
            const M = s.grid && s.grid.rows > 1 && e.grid;
            let P;
            M ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
            const I = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter((e=>void 0 !== s.breakpoints[e].slidesPerView)).length > 0;
            for (let T = 0; T < p; T += 1) {
                let i;
                if (P = 0,
                c[T] && (i = c[T]),
                M && e.grid.updateSlide(T, i, c),
                !c[T] || "none" !== C(i, "display")) {
                    if ("auto" === s.slidesPerView) {
                        I && (c[T].style[e.getDirectionLabel("width")] = "");
                        const r = getComputedStyle(i)
                          , a = i.style.transform
                          , n = i.style.webkitTransform;
                        if (a && (i.style.transform = "none"),
                        n && (i.style.webkitTransform = "none"),
                        s.roundLengths)
                            P = e.isHorizontal() ? O(i, "width", !0) : O(i, "height", !0);
                        else {
                            const e = t(r, "width")
                              , s = t(r, "padding-left")
                              , a = t(r, "padding-right")
                              , n = t(r, "margin-left")
                              , o = t(r, "margin-right")
                              , l = r.getPropertyValue("box-sizing");
                            if (l && "border-box" === l)
                                P = e + n + o;
                            else {
                                const {clientWidth: t, offsetWidth: r} = i;
                                P = e + s + a + n + o + (r - t)
                            }
                        }
                        a && (i.style.transform = a),
                        n && (i.style.webkitTransform = n),
                        s.roundLengths && (P = Math.floor(P))
                    } else
                        P = (a - (s.slidesPerView - 1) * S) / s.slidesPerView,
                        s.roundLengths && (P = Math.floor(P)),
                        c[T] && (c[T].style[e.getDirectionLabel("width")] = `${P}px`);
                    c[T] && (c[T].swiperSlideSize = P),
                    f.push(P),
                    s.centeredSlides ? (b = b + P / 2 + y / 2 + S,
                    0 === y && 0 !== T && (b = b - a / 2 - S),
                    0 === T && (b = b - a / 2 - S),
                    Math.abs(b) < .001 && (b = 0),
                    s.roundLengths && (b = Math.floor(b)),
                    x % s.slidesPerGroup == 0 && u.push(b),
                    h.push(b)) : (s.roundLengths && (b = Math.floor(b)),
                    (x - Math.min(e.params.slidesPerGroupSkip, x)) % e.params.slidesPerGroup == 0 && u.push(b),
                    h.push(b),
                    b = b + P + S),
                    e.virtualSize += P + S,
                    y = P,
                    x += 1
                }
            }
            if (e.virtualSize = Math.max(e.virtualSize, a) + v,
            n && o && ("slide" === s.effect || "coverflow" === s.effect) && (i.style.width = `${e.virtualSize + S}px`),
            s.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + S}px`),
            M && e.grid.updateWrapperSize(P, u),
            !s.centeredSlides) {
                const t = [];
                for (let i = 0; i < u.length; i += 1) {
                    let r = u[i];
                    s.roundLengths && (r = Math.floor(r)),
                    u[i] <= e.virtualSize - a && t.push(r)
                }
                u = t,
                Math.floor(e.virtualSize - a) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - a)
            }
            if (l && s.loop) {
                const t = f[0] + S;
                if (s.slidesPerGroup > 1) {
                    const i = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup)
                      , r = t * s.slidesPerGroup;
                    for (let e = 0; e < i; e += 1)
                        u.push(u[u.length - 1] + r)
                }
                for (let i = 0; i < e.virtual.slidesBefore + e.virtual.slidesAfter; i += 1)
                    1 === s.slidesPerGroup && u.push(u[u.length - 1] + t),
                    h.push(h[h.length - 1] + t),
                    e.virtualSize += t
            }
            if (0 === u.length && (u = [0]),
            0 !== S) {
                const t = e.isHorizontal() && n ? "marginLeft" : e.getDirectionLabel("marginRight");
                c.filter(((e,t)=>!(s.cssMode && !s.loop) || t !== c.length - 1)).forEach((e=>{
                    e.style[t] = `${S}px`
                }
                ))
            }
            if (s.centeredSlides && s.centeredSlidesBounds) {
                let e = 0;
                f.forEach((t=>{
                    e += t + (S || 0)
                }
                )),
                e -= S;
                const t = e - a;
                u = u.map((e=>e <= 0 ? -m : e > t ? t + v : e))
            }
            if (s.centerInsufficientSlides) {
                let e = 0;
                if (f.forEach((t=>{
                    e += t + (S || 0)
                }
                )),
                e -= S,
                e < a) {
                    const t = (a - e) / 2;
                    u.forEach(((e,s)=>{
                        u[s] = e - t
                    }
                    )),
                    h.forEach(((e,s)=>{
                        h[s] = e + t
                    }
                    ))
                }
            }
            if (Object.assign(e, {
                slides: c,
                snapGrid: u,
                slidesGrid: h,
                slidesSizesGrid: f
            }),
            s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
                T(i, "--swiper-centered-offset-before", -u[0] + "px"),
                T(i, "--swiper-centered-offset-after", e.size / 2 - f[f.length - 1] / 2 + "px");
                const t = -e.snapGrid[0]
                  , s = -e.slidesGrid[0];
                e.snapGrid = e.snapGrid.map((e=>e + t)),
                e.slidesGrid = e.slidesGrid.map((e=>e + s))
            }
            if (p !== d && e.emit("slidesLengthChange"),
            u.length !== g && (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
            h.length !== w && e.emit("slidesGridLengthChange"),
            s.watchSlidesProgress && e.updateSlidesOffset(),
            !(l || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) {
                const t = `${s.containerModifierClass}backface-hidden`
                  , i = e.el.classList.contains(t);
                p <= s.maxBackfaceHiddenSlides ? i || e.el.classList.add(t) : i && e.el.classList.remove(t)
            }
        },
        updateAutoHeight: function(e) {
            const t = this
              , s = []
              , i = t.virtual && t.params.virtual.enabled;
            let r, a = 0;
            "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
            const n = e=>i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                if (t.params.centeredSlides)
                    (t.visibleSlides || []).forEach((e=>{
                        s.push(e)
                    }
                    ));
                else
                    for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
                        const e = t.activeIndex + r;
                        if (e > t.slides.length && !i)
                            break;
                        s.push(n(e))
                    }
            else
                s.push(n(t.activeIndex));
            for (r = 0; r < s.length; r += 1)
                if (void 0 !== s[r]) {
                    const e = s[r].offsetHeight;
                    a = e > a ? e : a
                }
            (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`)
        },
        updateSlidesOffset: function() {
            const e = this
              , t = e.slides
              , s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
            for (let i = 0; i < t.length; i += 1)
                t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s - e.cssOverflowAdjustment()
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            const t = this
              , s = t.params
              , {slides: i, rtlTranslate: r, snapGrid: a} = t;
            if (0 === i.length)
                return;
            void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
            let n = -e;
            r && (n = e),
            i.forEach((e=>{
                e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass)
            }
            )),
            t.visibleSlidesIndexes = [],
            t.visibleSlides = [];
            let o = s.spaceBetween;
            "string" == typeof o && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * t.size : "string" == typeof o && (o = parseFloat(o));
            for (let l = 0; l < i.length; l += 1) {
                const e = i[l];
                let d = e.swiperSlideOffset;
                s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
                const c = (n + (s.centeredSlides ? t.minTranslate() : 0) - d) / (e.swiperSlideSize + o)
                  , p = (n - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (e.swiperSlideSize + o)
                  , u = -(n - d)
                  , h = u + t.slidesSizesGrid[l]
                  , f = u >= 0 && u <= t.size - t.slidesSizesGrid[l];
                (u >= 0 && u < t.size - 1 || h > 1 && h <= t.size || u <= 0 && h >= t.size) && (t.visibleSlides.push(e),
                t.visibleSlidesIndexes.push(l),
                i[l].classList.add(s.slideVisibleClass)),
                f && i[l].classList.add(s.slideFullyVisibleClass),
                e.progress = r ? -c : c,
                e.originalProgress = r ? -p : p
            }
        },
        updateProgress: function(e) {
            const t = this;
            if (void 0 === e) {
                const s = t.rtlTranslate ? -1 : 1;
                e = t && t.translate && t.translate * s || 0
            }
            const s = t.params
              , i = t.maxTranslate() - t.minTranslate();
            let {progress: r, isBeginning: a, isEnd: n, progressLoop: o} = t;
            const l = a
              , d = n;
            if (0 === i)
                r = 0,
                a = !0,
                n = !0;
            else {
                r = (e - t.minTranslate()) / i;
                const s = Math.abs(e - t.minTranslate()) < 1
                  , o = Math.abs(e - t.maxTranslate()) < 1;
                a = s || r <= 0,
                n = o || r >= 1,
                s && (r = 0),
                o && (r = 1)
            }
            if (s.loop) {
                const s = t.getSlideIndexByData(0)
                  , i = t.getSlideIndexByData(t.slides.length - 1)
                  , r = t.slidesGrid[s]
                  , a = t.slidesGrid[i]
                  , n = t.slidesGrid[t.slidesGrid.length - 1]
                  , l = Math.abs(e);
                o = l >= r ? (l - r) / n : (l + n - a) / n,
                o > 1 && (o -= 1)
            }
            Object.assign(t, {
                progress: r,
                progressLoop: o,
                isBeginning: a,
                isEnd: n
            }),
            (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e),
            a && !l && t.emit("reachBeginning toEdge"),
            n && !d && t.emit("reachEnd toEdge"),
            (l && !a || d && !n) && t.emit("fromEdge"),
            t.emit("progress", r)
        },
        updateSlidesClasses: function() {
            const e = this
              , {slides: t, params: s, slidesEl: i, activeIndex: r} = e
              , a = e.virtual && s.virtual.enabled
              , n = e.grid && s.grid && s.grid.rows > 1
              , o = e=>E(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
            let l, d, c;
            if (t.forEach((e=>{
                e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
            }
            )),
            a)
                if (s.loop) {
                    let t = r - e.virtual.slidesBefore;
                    t < 0 && (t = e.virtual.slides.length + t),
                    t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
                    l = o(`[data-swiper-slide-index="${t}"]`)
                } else
                    l = o(`[data-swiper-slide-index="${r}"]`);
            else
                n ? (l = t.filter((e=>e.column === r))[0],
                c = t.filter((e=>e.column === r + 1))[0],
                d = t.filter((e=>e.column === r - 1))[0]) : l = t[r];
            l && (l.classList.add(s.slideActiveClass),
            n ? (c && c.classList.add(s.slideNextClass),
            d && d.classList.add(s.slidePrevClass)) : (c = function(e, t) {
                const s = [];
                for (; e.nextElementSibling; ) {
                    const i = e.nextElementSibling;
                    t ? i.matches(t) && s.push(i) : s.push(i),
                    e = i
                }
                return s
            }(l, `.${s.slideClass}, swiper-slide`)[0],
            s.loop && !c && (c = t[0]),
            c && c.classList.add(s.slideNextClass),
            d = function(e, t) {
                const s = [];
                for (; e.previousElementSibling; ) {
                    const i = e.previousElementSibling;
                    t ? i.matches(t) && s.push(i) : s.push(i),
                    e = i
                }
                return s
            }(l, `.${s.slideClass}, swiper-slide`)[0],
            s.loop && 0 === !d && (d = t[t.length - 1]),
            d && d.classList.add(s.slidePrevClass))),
            e.emitSlidesClasses()
        },
        updateActiveIndex: function(e) {
            const t = this
              , s = t.rtlTranslate ? t.translate : -t.translate
              , {snapGrid: i, params: r, activeIndex: a, realIndex: n, snapIndex: o} = t;
            let l, d = e;
            const c = e=>{
                let s = e - t.virtual.slidesBefore;
                return s < 0 && (s = t.virtual.slides.length + s),
                s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
                s
            }
            ;
            if (void 0 === d && (d = function(e) {
                const {slidesGrid: t, params: s} = e
                  , i = e.rtlTranslate ? e.translate : -e.translate;
                let r;
                for (let a = 0; a < t.length; a += 1)
                    void 0 !== t[a + 1] ? i >= t[a] && i < t[a + 1] - (t[a + 1] - t[a]) / 2 ? r = a : i >= t[a] && i < t[a + 1] && (r = a + 1) : i >= t[a] && (r = a);
                return s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0),
                r
            }(t)),
            i.indexOf(s) >= 0)
                l = i.indexOf(s);
            else {
                const e = Math.min(r.slidesPerGroupSkip, d);
                l = e + Math.floor((d - e) / r.slidesPerGroup)
            }
            if (l >= i.length && (l = i.length - 1),
            d === a && !t.params.loop)
                return void (l !== o && (t.snapIndex = l,
                t.emit("snapIndexChange")));
            if (d === a && t.params.loop && t.virtual && t.params.virtual.enabled)
                return void (t.realIndex = c(d));
            const p = t.grid && r.grid && r.grid.rows > 1;
            let u;
            if (t.virtual && r.virtual.enabled && r.loop)
                u = c(d);
            else if (p) {
                const e = t.slides.filter((e=>e.column === d))[0];
                let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
                Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
                u = Math.floor(s / r.grid.rows)
            } else if (t.slides[d]) {
                const e = t.slides[d].getAttribute("data-swiper-slide-index");
                u = e ? parseInt(e, 10) : d
            } else
                u = d;
            Object.assign(t, {
                previousSnapIndex: o,
                snapIndex: l,
                previousRealIndex: n,
                realIndex: u,
                previousIndex: a,
                activeIndex: d
            }),
            t.initialized && V(t),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) && (n !== u && t.emit("realIndexChange"),
            t.emit("slideChange"))
        },
        updateClickedSlide: function(e, t) {
            const s = this
              , i = s.params;
            let r = e.closest(`.${i.slideClass}, swiper-slide`);
            !r && s.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e=>{
                !r && e.matches && e.matches(`.${i.slideClass}, swiper-slide`) && (r = e)
            }
            ));
            let a, n = !1;
            if (r)
                for (let o = 0; o < s.slides.length; o += 1)
                    if (s.slides[o] === r) {
                        n = !0,
                        a = o;
                        break
                    }
            if (!r || !n)
                return s.clickedSlide = void 0,
                void (s.clickedIndex = void 0);
            s.clickedSlide = r,
            s.virtual && s.params.virtual.enabled ? s.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : s.clickedIndex = a,
            i.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide()
        }
    },
    translate: {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            const {params: t, rtlTranslate: s, translate: i, wrapperEl: r} = this;
            if (t.virtualTranslate)
                return s ? -i : i;
            if (t.cssMode)
                return i;
            let a = g(r, e);
            return a += this.cssOverflowAdjustment(),
            s && (a = -a),
            a || 0
        },
        setTranslate: function(e, t) {
            const s = this
              , {rtlTranslate: i, params: r, wrapperEl: a, progress: n} = s;
            let o, l = 0, d = 0;
            s.isHorizontal() ? l = i ? -e : e : d = e,
            r.roundLengths && (l = Math.floor(l),
            d = Math.floor(d)),
            s.previousTranslate = s.translate,
            s.translate = s.isHorizontal() ? l : d,
            r.cssMode ? a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -l : -d : r.virtualTranslate || (s.isHorizontal() ? l -= s.cssOverflowAdjustment() : d -= s.cssOverflowAdjustment(),
            a.style.transform = `translate3d(${l}px, ${d}px, 0px)`);
            const c = s.maxTranslate() - s.minTranslate();
            o = 0 === c ? 0 : (e - s.minTranslate()) / c,
            o !== n && s.updateProgress(e),
            s.emit("setTranslate", s.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function(e, t, s, i, r) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            void 0 === i && (i = !0);
            const a = this
              , {params: n, wrapperEl: o} = a;
            if (a.animating && n.preventInteractionOnTransition)
                return !1;
            const l = a.minTranslate()
              , d = a.maxTranslate();
            let c;
            if (c = i && e > l ? l : i && e < d ? d : e,
            a.updateProgress(c),
            n.cssMode) {
                const e = a.isHorizontal();
                if (0 === t)
                    o[e ? "scrollLeft" : "scrollTop"] = -c;
                else {
                    if (!a.support.smoothScroll)
                        return y({
                            swiper: a,
                            targetPosition: -c,
                            side: e ? "left" : "top"
                        }),
                        !0;
                    o.scrollTo({
                        [e ? "left" : "top"]: -c,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return 0 === t ? (a.setTransition(0),
            a.setTranslate(c),
            s && (a.emit("beforeTransitionStart", t, r),
            a.emit("transitionEnd"))) : (a.setTransition(t),
            a.setTranslate(c),
            s && (a.emit("beforeTransitionStart", t, r),
            a.emit("transitionStart")),
            a.animating || (a.animating = !0,
            a.onTranslateToWrapperTransitionEnd || (a.onTranslateToWrapperTransitionEnd = function(e) {
                a && !a.destroyed && e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd),
                a.onTranslateToWrapperTransitionEnd = null,
                delete a.onTranslateToWrapperTransitionEnd,
                s && a.emit("transitionEnd"))
            }
            ),
            a.wrapperEl.addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd))),
            !0
        }
    },
    transition: {
        setTransition: function(e, t) {
            const s = this;
            s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`,
            s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""),
            s.emit("setTransition", e, t)
        },
        transitionStart: function(e, t) {
            void 0 === e && (e = !0);
            const s = this
              , {params: i} = s;
            i.cssMode || (i.autoHeight && s.updateAutoHeight(),
            N({
                swiper: s,
                runCallbacks: e,
                direction: t,
                step: "Start"
            }))
        },
        transitionEnd: function(e, t) {
            void 0 === e && (e = !0);
            const s = this
              , {params: i} = s;
            s.animating = !1,
            i.cssMode || (s.setTransition(0),
            N({
                swiper: s,
                runCallbacks: e,
                direction: t,
                step: "End"
            }))
        }
    },
    slide: {
        slideTo: function(e, t, s, i, r) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            "string" == typeof e && (e = parseInt(e, 10));
            const a = this;
            let n = e;
            n < 0 && (n = 0);
            const {params: o, snapGrid: l, slidesGrid: d, previousIndex: c, activeIndex: p, rtlTranslate: u, wrapperEl: h, enabled: f} = a;
            if (a.animating && o.preventInteractionOnTransition || !f && !i && !r)
                return !1;
            const m = Math.min(a.params.slidesPerGroupSkip, n);
            let v = m + Math.floor((n - m) / a.params.slidesPerGroup);
            v >= l.length && (v = l.length - 1);
            const g = -l[v];
            if (o.normalizeSlideIndex)
                for (let S = 0; S < d.length; S += 1) {
                    const e = -Math.floor(100 * g)
                      , t = Math.floor(100 * d[S])
                      , s = Math.floor(100 * d[S + 1]);
                    void 0 !== d[S + 1] ? e >= t && e < s - (s - t) / 2 ? n = S : e >= t && e < s && (n = S + 1) : e >= t && (n = S)
                }
            if (a.initialized && n !== p) {
                if (!a.allowSlideNext && (u ? g > a.translate && g > a.minTranslate() : g < a.translate && g < a.minTranslate()))
                    return !1;
                if (!a.allowSlidePrev && g > a.translate && g > a.maxTranslate() && (p || 0) !== n)
                    return !1
            }
            let w;
            if (n !== (c || 0) && s && a.emit("beforeSlideChangeStart"),
            a.updateProgress(g),
            w = n > p ? "next" : n < p ? "prev" : "reset",
            u && -g === a.translate || !u && g === a.translate)
                return a.updateActiveIndex(n),
                o.autoHeight && a.updateAutoHeight(),
                a.updateSlidesClasses(),
                "slide" !== o.effect && a.setTranslate(g),
                "reset" !== w && (a.transitionStart(s, w),
                a.transitionEnd(s, w)),
                !1;
            if (o.cssMode) {
                const e = a.isHorizontal()
                  , s = u ? g : -g;
                if (0 === t) {
                    const t = a.virtual && a.params.virtual.enabled;
                    t && (a.wrapperEl.style.scrollSnapType = "none",
                    a._immediateVirtual = !0),
                    t && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0 ? (a._cssModeVirtualInitialSet = !0,
                    requestAnimationFrame((()=>{
                        h[e ? "scrollLeft" : "scrollTop"] = s
                    }
                    ))) : h[e ? "scrollLeft" : "scrollTop"] = s,
                    t && requestAnimationFrame((()=>{
                        a.wrapperEl.style.scrollSnapType = "",
                        a._immediateVirtual = !1
                    }
                    ))
                } else {
                    if (!a.support.smoothScroll)
                        return y({
                            swiper: a,
                            targetPosition: s,
                            side: e ? "left" : "top"
                        }),
                        !0;
                    h.scrollTo({
                        [e ? "left" : "top"]: s,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return a.setTransition(t),
            a.setTranslate(g),
            a.updateActiveIndex(n),
            a.updateSlidesClasses(),
            a.emit("beforeTransitionStart", t, i),
            a.transitionStart(s, w),
            0 === t ? a.transitionEnd(s, w) : a.animating || (a.animating = !0,
            a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function(e) {
                a && !a.destroyed && e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd),
                a.onSlideToWrapperTransitionEnd = null,
                delete a.onSlideToWrapperTransitionEnd,
                a.transitionEnd(s, w))
            }
            ),
            a.wrapperEl.addEventListener("transitionend", a.onSlideToWrapperTransitionEnd)),
            !0
        },
        slideToLoop: function(e, t, s, i) {
            if (void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            "string" == typeof e) {
                e = parseInt(e, 10)
            }
            const r = this
              , a = r.grid && r.params.grid && r.params.grid.rows > 1;
            let n = e;
            if (r.params.loop)
                if (r.virtual && r.params.virtual.enabled)
                    n += r.virtual.slidesBefore;
                else {
                    let e;
                    if (a) {
                        const t = n * r.params.grid.rows;
                        e = r.slides.filter((e=>1 * e.getAttribute("data-swiper-slide-index") === t))[0].column
                    } else
                        e = r.getSlideIndexByData(n);
                    const t = a ? Math.ceil(r.slides.length / r.params.grid.rows) : r.slides.length
                      , {centeredSlides: s} = r.params;
                    let i = r.params.slidesPerView;
                    "auto" === i ? i = r.slidesPerViewDynamic() : (i = Math.ceil(parseFloat(r.params.slidesPerView, 10)),
                    s && i % 2 == 0 && (i += 1));
                    let o = t - e < i;
                    if (s && (o = o || e < Math.ceil(i / 2)),
                    o) {
                        const i = s ? e < r.activeIndex ? "prev" : "next" : e - r.activeIndex - 1 < r.params.slidesPerView ? "next" : "prev";
                        r.loopFix({
                            direction: i,
                            slideTo: !0,
                            activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
                            slideRealIndex: "next" === i ? r.realIndex : void 0
                        })
                    }
                    if (a) {
                        const e = n * r.params.grid.rows;
                        n = r.slides.filter((t=>1 * t.getAttribute("data-swiper-slide-index") === e))[0].column
                    } else
                        n = r.getSlideIndexByData(n)
                }
            return requestAnimationFrame((()=>{
                r.slideTo(n, t, s, i)
            }
            )),
            r
        },
        slideNext: function(e, t, s) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            const i = this
              , {enabled: r, params: a, animating: n} = i;
            if (!r)
                return i;
            let o = a.slidesPerGroup;
            "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
            const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o
              , d = i.virtual && a.virtual.enabled;
            if (a.loop) {
                if (n && !d && a.loopPreventsSliding)
                    return !1;
                if (i.loopFix({
                    direction: "next"
                }),
                i._clientLeft = i.wrapperEl.clientLeft,
                i.activeIndex === i.slides.length - 1 && a.cssMode)
                    return requestAnimationFrame((()=>{
                        i.slideTo(i.activeIndex + l, e, t, s)
                    }
                    )),
                    !0
            }
            return a.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + l, e, t, s)
        },
        slidePrev: function(e, t, s) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            const i = this
              , {params: r, snapGrid: a, slidesGrid: n, rtlTranslate: o, enabled: l, animating: d} = i;
            if (!l)
                return i;
            const c = i.virtual && r.virtual.enabled;
            if (r.loop) {
                if (d && !c && r.loopPreventsSliding)
                    return !1;
                i.loopFix({
                    direction: "prev"
                }),
                i._clientLeft = i.wrapperEl.clientLeft
            }
            function p(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            const u = p(o ? i.translate : -i.translate)
              , h = a.map((e=>p(e)));
            let f = a[h.indexOf(u) - 1];
            if (void 0 === f && r.cssMode) {
                let e;
                a.forEach(((t,s)=>{
                    u >= t && (e = s)
                }
                )),
                void 0 !== e && (f = a[e > 0 ? e - 1 : e])
            }
            let m = 0;
            if (void 0 !== f && (m = n.indexOf(f),
            m < 0 && (m = i.activeIndex - 1),
            "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (m = m - i.slidesPerViewDynamic("previous", !0) + 1,
            m = Math.max(m, 0))),
            r.rewind && i.isBeginning) {
                const r = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                return i.slideTo(r, e, t, s)
            }
            return r.loop && 0 === i.activeIndex && r.cssMode ? (requestAnimationFrame((()=>{
                i.slideTo(m, e, t, s)
            }
            )),
            !0) : i.slideTo(m, e, t, s)
        },
        slideReset: function(e, t, s) {
            return void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, s)
        },
        slideToClosest: function(e, t, s, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            void 0 === i && (i = .5);
            const r = this;
            let a = r.activeIndex;
            const n = Math.min(r.params.slidesPerGroupSkip, a)
              , o = n + Math.floor((a - n) / r.params.slidesPerGroup)
              , l = r.rtlTranslate ? r.translate : -r.translate;
            if (l >= r.snapGrid[o]) {
                const e = r.snapGrid[o];
                l - e > (r.snapGrid[o + 1] - e) * i && (a += r.params.slidesPerGroup)
            } else {
                const e = r.snapGrid[o - 1];
                l - e <= (r.snapGrid[o] - e) * i && (a -= r.params.slidesPerGroup)
            }
            return a = Math.max(a, 0),
            a = Math.min(a, r.slidesGrid.length - 1),
            r.slideTo(a, e, t, s)
        },
        slideToClickedSlide: function() {
            const e = this
              , {params: t, slidesEl: s} = e
              , i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let r, a = e.clickedIndex;
            const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
            if (t.loop) {
                if (e.animating)
                    return;
                r = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
                t.centeredSlides ? a < e.loopedSlides - i / 2 || a > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(),
                a = e.getSlideIndex(E(s, `${n}[data-swiper-slide-index="${r}"]`)[0]),
                m((()=>{
                    e.slideTo(a)
                }
                ))) : e.slideTo(a) : a > e.slides.length - i ? (e.loopFix(),
                a = e.getSlideIndex(E(s, `${n}[data-swiper-slide-index="${r}"]`)[0]),
                m((()=>{
                    e.slideTo(a)
                }
                ))) : e.slideTo(a)
            } else
                e.slideTo(a)
        }
    },
    loop: {
        loopCreate: function(e) {
            const t = this
              , {params: s, slidesEl: i} = t;
            if (!s.loop || t.virtual && t.params.virtual.enabled)
                return;
            const r = ()=>{
                E(i, `.${s.slideClass}, swiper-slide`).forEach(((e,t)=>{
                    e.setAttribute("data-swiper-slide-index", t)
                }
                ))
            }
              , a = t.grid && s.grid && s.grid.rows > 1
              , n = s.slidesPerGroup * (a ? s.grid.rows : 1)
              , o = t.slides.length % n != 0
              , l = a && t.slides.length % s.grid.rows != 0
              , d = e=>{
                for (let i = 0; i < e; i += 1) {
                    const e = t.isElement ? P("swiper-slide", [s.slideBlankClass]) : P("div", [s.slideClass, s.slideBlankClass]);
                    t.slidesEl.append(e)
                }
            }
            ;
            if (o) {
                if (s.loopAddBlankSlides) {
                    d(n - t.slides.length % n),
                    t.recalcSlides(),
                    t.updateSlides()
                } else
                    M("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                r()
            } else if (l) {
                if (s.loopAddBlankSlides) {
                    d(s.grid.rows - t.slides.length % s.grid.rows),
                    t.recalcSlides(),
                    t.updateSlides()
                } else
                    M("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                r()
            } else
                r();
            t.loopFix({
                slideRealIndex: e,
                direction: s.centeredSlides ? void 0 : "next"
            })
        },
        loopFix: function(e) {
            let {slideRealIndex: t, slideTo: s=!0, direction: i, setTranslate: r, activeSlideIndex: a, byController: n, byMousewheel: d} = void 0 === e ? {} : e;
            const c = this;
            if (!c.params.loop)
                return;
            c.emit("beforeLoopFix");
            const {slides: p, allowSlidePrev: u, allowSlideNext: h, slidesEl: f, params: m} = c
              , {centeredSlides: v} = m;
            if (c.allowSlidePrev = !0,
            c.allowSlideNext = !0,
            c.virtual && m.virtual.enabled)
                return s && (m.centeredSlides || 0 !== c.snapIndex ? m.centeredSlides && c.snapIndex < m.slidesPerView ? c.slideTo(c.virtual.slides.length + c.snapIndex, 0, !1, !0) : c.snapIndex === c.snapGrid.length - 1 && c.slideTo(c.virtual.slidesBefore, 0, !1, !0) : c.slideTo(c.virtual.slides.length, 0, !1, !0)),
                c.allowSlidePrev = u,
                c.allowSlideNext = h,
                void c.emit("loopFix");
            let g = m.slidesPerView;
            "auto" === g ? g = c.slidesPerViewDynamic() : (g = Math.ceil(parseFloat(m.slidesPerView, 10)),
            v && g % 2 == 0 && (g += 1));
            const w = m.slidesPerGroupAuto ? g : m.slidesPerGroup;
            let S = w;
            S % w != 0 && (S += w - S % w),
            S += m.loopAdditionalSlides,
            c.loopedSlides = S;
            const b = c.grid && m.grid && m.grid.rows > 1;
            p.length < g + S ? M("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : b && "row" === m.grid.fill && M("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
            const T = []
              , y = [];
            let x = c.activeIndex;
            void 0 === a ? a = c.getSlideIndex(p.filter((e=>e.classList.contains(m.slideActiveClass)))[0]) : x = a;
            const E = "next" === i || !i
              , P = "prev" === i || !i;
            let C = 0
              , I = 0;
            const O = b ? Math.ceil(p.length / m.grid.rows) : p.length
              , L = (b ? p[a].column : a) + (v && void 0 === r ? -g / 2 + .5 : 0);
            if (L < S) {
                C = Math.max(S - L, w);
                for (let e = 0; e < S - L; e += 1) {
                    const t = e - Math.floor(e / O) * O;
                    if (b) {
                        const e = O - t - 1;
                        for (let t = p.length - 1; t >= 0; t -= 1)
                            p[t].column === e && T.push(t)
                    } else
                        T.push(O - t - 1)
                }
            } else if (L + g > O - S) {
                I = Math.max(L - (O - 2 * S), w);
                for (let e = 0; e < I; e += 1) {
                    const t = e - Math.floor(e / O) * O;
                    b ? p.forEach(((e,s)=>{
                        e.column === t && y.push(s)
                    }
                    )) : y.push(t)
                }
            }
            if (c.__preventObserver__ = !0,
            requestAnimationFrame((()=>{
                c.__preventObserver__ = !1
            }
            )),
            P && T.forEach((e=>{
                p[e].swiperLoopMoveDOM = !0,
                f.prepend(p[e]),
                p[e].swiperLoopMoveDOM = !1
            }
            )),
            E && y.forEach((e=>{
                p[e].swiperLoopMoveDOM = !0,
                f.append(p[e]),
                p[e].swiperLoopMoveDOM = !1
            }
            )),
            c.recalcSlides(),
            "auto" === m.slidesPerView ? c.updateSlides() : b && (T.length > 0 && P || y.length > 0 && E) && c.slides.forEach(((e,t)=>{
                c.grid.updateSlide(t, e, c.slides)
            }
            )),
            m.watchSlidesProgress && c.updateSlidesOffset(),
            s)
                if (T.length > 0 && P) {
                    if (void 0 === t) {
                        const e = c.slidesGrid[x]
                          , t = c.slidesGrid[x + C] - e;
                        d ? c.setTranslate(c.translate - t) : (c.slideTo(x + C, 0, !1, !0),
                        r && (c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - t,
                        c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - t))
                    } else if (r) {
                        const e = b ? T.length / m.grid.rows : T.length;
                        c.slideTo(c.activeIndex + e, 0, !1, !0),
                        c.touchEventsData.currentTranslate = c.translate
                    }
                } else if (y.length > 0 && E)
                    if (void 0 === t) {
                        const e = c.slidesGrid[x]
                          , t = c.slidesGrid[x - I] - e;
                        d ? c.setTranslate(c.translate - t) : (c.slideTo(x - I, 0, !1, !0),
                        r && (c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - t,
                        c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - t))
                    } else {
                        const e = b ? y.length / m.grid.rows : y.length;
                        c.slideTo(c.activeIndex - e, 0, !1, !0)
                    }
            if (c.allowSlidePrev = u,
            c.allowSlideNext = h,
            c.controller && c.controller.control && !n) {
                const e = {
                    slideRealIndex: t,
                    direction: i,
                    setTranslate: r,
                    activeSlideIndex: a,
                    byController: !0
                };
                Array.isArray(c.controller.control) ? c.controller.control.forEach((t=>{
                    !t.destroyed && t.params.loop && t.loopFix(l(o({}, e), {
                        slideTo: t.params.slidesPerView === m.slidesPerView && s
                    }))
                }
                )) : c.controller.control instanceof c.constructor && c.controller.control.params.loop && c.controller.control.loopFix(l(o({}, e), {
                    slideTo: c.controller.control.params.slidesPerView === m.slidesPerView && s
                }))
            }
            c.emit("loopFix")
        },
        loopDestroy: function() {
            const e = this
              , {params: t, slidesEl: s} = e;
            if (!t.loop || e.virtual && e.params.virtual.enabled)
                return;
            e.recalcSlides();
            const i = [];
            e.slides.forEach((e=>{
                const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
                i[t] = e
            }
            )),
            e.slides.forEach((e=>{
                e.removeAttribute("data-swiper-slide-index")
            }
            )),
            i.forEach((e=>{
                s.append(e)
            }
            )),
            e.recalcSlides(),
            e.slideTo(e.realIndex, 0)
        }
    },
    grabCursor: {
        setGrabCursor: function(e) {
            const t = this;
            if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
                return;
            const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            t.isElement && (t.__preventObserver__ = !0),
            s.style.cursor = "move",
            s.style.cursor = e ? "grabbing" : "grab",
            t.isElement && requestAnimationFrame((()=>{
                t.__preventObserver__ = !1
            }
            ))
        },
        unsetGrabCursor: function() {
            const e = this;
            e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0),
            e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "",
            e.isElement && requestAnimationFrame((()=>{
                e.__preventObserver__ = !1
            }
            )))
        }
    },
    events: {
        attachEvents: function() {
            const e = this
              , {params: t} = e;
            e.onTouchStart = B.bind(e),
            e.onTouchMove = j.bind(e),
            e.onTouchEnd = H.bind(e),
            e.onDocumentTouchStart = Y.bind(e),
            t.cssMode && (e.onScroll = W.bind(e)),
            e.onClick = q.bind(e),
            e.onLoad = X.bind(e),
            U(e, "on")
        },
        detachEvents: function() {
            U(this, "off")
        }
    },
    breakpoints: {
        setBreakpoint: function() {
            const e = this
              , {realIndex: t, initialized: s, params: i, el: r} = e
              , a = i.breakpoints;
            if (!a || a && 0 === Object.keys(a).length)
                return;
            const n = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
            if (!n || e.currentBreakpoint === n)
                return;
            const o = (n in a ? a[n] : void 0) || e.originalParams
              , l = K(e, i)
              , d = K(e, o)
              , c = i.enabled;
            l && !d ? (r.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`),
            e.emitContainerClasses()) : !l && d && (r.classList.add(`${i.containerModifierClass}grid`),
            (o.grid.fill && "column" === o.grid.fill || !o.grid.fill && "column" === i.grid.fill) && r.classList.add(`${i.containerModifierClass}grid-column`),
            e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t=>{
                if (void 0 === o[t])
                    return;
                const s = i[t] && i[t].enabled
                  , r = o[t] && o[t].enabled;
                s && !r && e[t].disable(),
                !s && r && e[t].enable()
            }
            ));
            const p = o.direction && o.direction !== i.direction
              , u = i.loop && (o.slidesPerView !== i.slidesPerView || p)
              , h = i.loop;
            p && s && e.changeDirection(),
            b(e.params, o);
            const f = e.params.enabled
              , m = e.params.loop;
            Object.assign(e, {
                allowTouchMove: e.params.allowTouchMove,
                allowSlideNext: e.params.allowSlideNext,
                allowSlidePrev: e.params.allowSlidePrev
            }),
            c && !f ? e.disable() : !c && f && e.enable(),
            e.currentBreakpoint = n,
            e.emit("_beforeBreakpoint", o),
            s && (u ? (e.loopDestroy(),
            e.loopCreate(t),
            e.updateSlides()) : !h && m ? (e.loopCreate(t),
            e.updateSlides()) : h && !m && e.loopDestroy()),
            e.emit("breakpoint", o)
        },
        getBreakpoint: function(e, t, s) {
            if (void 0 === t && (t = "window"),
            !e || "container" === t && !s)
                return;
            let i = !1;
            const r = f()
              , a = "window" === t ? r.innerHeight : s.clientHeight
              , n = Object.keys(e).map((e=>{
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                    const t = parseFloat(e.substr(1));
                    return {
                        value: a * t,
                        point: e
                    }
                }
                return {
                    value: e,
                    point: e
                }
            }
            ));
            n.sort(((e,t)=>parseInt(e.value, 10) - parseInt(t.value, 10)));
            for (let o = 0; o < n.length; o += 1) {
                const {point: e, value: a} = n[o];
                "window" === t ? r.matchMedia(`(min-width: ${a}px)`).matches && (i = e) : a <= s.clientWidth && (i = e)
            }
            return i || "max"
        }
    },
    checkOverflow: {
        checkOverflow: function() {
            const e = this
              , {isLocked: t, params: s} = e
              , {slidesOffsetBefore: i} = s;
            if (i) {
                const t = e.slides.length - 1
                  , s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                e.isLocked = e.size > s
            } else
                e.isLocked = 1 === e.snapGrid.length;
            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
        }
    },
    classes: {
        addClasses: function() {
            const e = this
              , {classNames: t, params: s, rtl: i, el: r, device: a} = e
              , n = function(e, t) {
                const s = [];
                return e.forEach((e=>{
                    "object" == typeof e ? Object.keys(e).forEach((i=>{
                        e[i] && s.push(t + i)
                    }
                    )) : "string" == typeof e && s.push(t + e)
                }
                )),
                s
            }(["initialized", s.direction, {
                "free-mode": e.params.freeMode && s.freeMode.enabled
            }, {
                autoheight: s.autoHeight
            }, {
                rtl: i
            }, {
                grid: s.grid && s.grid.rows > 1
            }, {
                "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
            }, {
                android: a.android
            }, {
                ios: a.ios
            }, {
                "css-mode": s.cssMode
            }, {
                centered: s.cssMode && s.centeredSlides
            }, {
                "watch-progress": s.watchSlidesProgress
            }], s.containerModifierClass);
            t.push(...n),
            r.classList.add(...t),
            e.emitContainerClasses()
        },
        removeClasses: function() {
            const {el: e, classNames: t} = this;
            e.classList.remove(...t),
            this.emitContainerClasses()
        }
    }
}
  , ee = {};
class te {
    constructor() {
        let e, t;
        for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
            i[r] = arguments[r];
        1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e,t] = i,
        t || (t = {}),
        t = b({}, t),
        e && !t.el && (t.el = e);
        const a = u();
        if (t.el && "string" == typeof t.el && a.querySelectorAll(t.el).length > 1) {
            const e = [];
            return a.querySelectorAll(t.el).forEach((s=>{
                const i = b({}, t, {
                    el: s
                });
                e.push(new te(i))
            }
            )),
            e
        }
        const n = this;
        n.__swiper__ = !0,
        n.support = A(),
        n.device = G({
            userAgent: t.userAgent
        }),
        n.browser = D(),
        n.eventsListeners = {},
        n.eventsAnyListeners = [],
        n.modules = [...n.__modules__],
        t.modules && Array.isArray(t.modules) && n.modules.push(...t.modules);
        const o = {};
        n.modules.forEach((e=>{
            e({
                params: t,
                swiper: n,
                extendParams: J(t, o),
                on: n.on.bind(n),
                once: n.once.bind(n),
                off: n.off.bind(n),
                emit: n.emit.bind(n)
            })
        }
        ));
        const l = b({}, Z, o);
        return n.params = b({}, l, ee, t),
        n.originalParams = b({}, n.params),
        n.passedParams = b({}, t),
        n.params && n.params.on && Object.keys(n.params.on).forEach((e=>{
            n.on(e, n.params.on[e])
        }
        )),
        n.params && n.params.onAny && n.onAny(n.params.onAny),
        Object.assign(n, {
            enabled: n.params.enabled,
            el: e,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: ()=>"horizontal" === n.params.direction,
            isVertical: ()=>"vertical" === n.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            cssOverflowAdjustment() {
                return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
            },
            allowSlideNext: n.params.allowSlideNext,
            allowSlidePrev: n.params.allowSlidePrev,
            touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: n.params.focusableElements,
                lastClickTime: 0,
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                startMoving: void 0,
                pointerId: null,
                touchId: null
            },
            allowClick: !0,
            allowTouchMove: n.params.allowTouchMove,
            touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
        }),
        n.emit("_swiper"),
        n.params.init && n.init(),
        n
    }
    getDirectionLabel(e) {
        return this.isHorizontal() ? e : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom"
        }[e]
    }
    getSlideIndex(e) {
        const {slidesEl: t, params: s} = this
          , i = I(E(t, `.${s.slideClass}, swiper-slide`)[0]);
        return I(e) - i
    }
    getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.filter((t=>1 * t.getAttribute("data-swiper-slide-index") === e))[0])
    }
    recalcSlides() {
        const {slidesEl: e, params: t} = this;
        this.slides = E(e, `.${t.slideClass}, swiper-slide`)
    }
    enable() {
        const e = this;
        e.enabled || (e.enabled = !0,
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"))
    }
    disable() {
        const e = this;
        e.enabled && (e.enabled = !1,
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"))
    }
    setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = s.minTranslate()
          , r = (s.maxTranslate() - i) * e + i;
        s.translateTo(r, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses()
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = e.el.className.split(" ").filter((t=>0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
        e.emit("_containerClasses", t.join(" "))
    }
    getSlideClasses(e) {
        const t = this;
        return t.destroyed ? "" : e.className.split(" ").filter((e=>0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = [];
        e.slides.forEach((s=>{
            const i = e.getSlideClasses(s);
            t.push({
                slideEl: s,
                classNames: i
            }),
            e.emit("_slideClass", s, i)
        }
        )),
        e.emit("_slideClasses", t)
    }
    slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"),
        void 0 === t && (t = !1);
        const {params: s, slides: i, slidesGrid: r, slidesSizesGrid: a, size: n, activeIndex: o} = this;
        let l = 1;
        if ("number" == typeof s.slidesPerView)
            return s.slidesPerView;
        if (s.centeredSlides) {
            let e, t = i[o] ? i[o].swiperSlideSize : 0;
            for (let s = o + 1; s < i.length; s += 1)
                i[s] && !e && (t += i[s].swiperSlideSize,
                l += 1,
                t > n && (e = !0));
            for (let s = o - 1; s >= 0; s -= 1)
                i[s] && !e && (t += i[s].swiperSlideSize,
                l += 1,
                t > n && (e = !0))
        } else if ("current" === e)
            for (let d = o + 1; d < i.length; d += 1) {
                (t ? r[d] + a[d] - r[o] < n : r[d] - r[o] < n) && (l += 1)
            }
        else
            for (let d = o - 1; d >= 0; d -= 1) {
                r[o] - r[d] < n && (l += 1)
            }
        return l
    }
    update() {
        const e = this;
        if (!e || e.destroyed)
            return;
        const {snapGrid: t, params: s} = e;
        function i() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate
              , s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(s),
            e.updateActiveIndex(),
            e.updateSlidesClasses()
        }
        let r;
        if (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t=>{
            t.complete && $(e, t)
        }
        )),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
            i(),
            s.autoHeight && e.updateAutoHeight();
        else {
            if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
                const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
                r = e.slideTo(t.length - 1, 0, !1, !0)
            } else
                r = e.slideTo(e.activeIndex, 0, !1, !0);
            r || i()
        }
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update")
    }
    changeDirection(e, t) {
        void 0 === t && (t = !0);
        const s = this
          , i = s.params.direction;
        return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
        s.el.classList.add(`${s.params.containerModifierClass}${e}`),
        s.emitContainerClasses(),
        s.params.direction = e,
        s.slides.forEach((t=>{
            "vertical" === e ? t.style.width = "" : t.style.height = ""
        }
        )),
        s.emit("changeDirection"),
        t && s.update()),
        s
    }
    changeLanguageDirection(e) {
        const t = this;
        t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e,
        t.rtlTranslate = "horizontal" === t.params.direction && t.rtl,
        t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
        t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
        t.el.dir = "ltr"),
        t.update())
    }
    mount(e) {
        const t = this;
        if (t.mounted)
            return !0;
        let s = e || t.params.el;
        if ("string" == typeof s && (s = document.querySelector(s)),
        !s)
            return !1;
        s.swiper = t,
        s.parentNode && s.parentNode.host && "SWIPER-CONTAINER" === s.parentNode.host.nodeName && (t.isElement = !0);
        const i = ()=>`.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let r = (()=>{
            if (s && s.shadowRoot && s.shadowRoot.querySelector) {
                return s.shadowRoot.querySelector(i())
            }
            return E(s, i())[0]
        }
        )();
        return !r && t.params.createElements && (r = P("div", t.params.wrapperClass),
        s.append(r),
        E(s, `.${t.params.slideClass}`).forEach((e=>{
            r.append(e)
        }
        ))),
        Object.assign(t, {
            el: s,
            wrapperEl: r,
            slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : r,
            hostEl: t.isElement ? s.parentNode.host : s,
            mounted: !0,
            rtl: "rtl" === s.dir.toLowerCase() || "rtl" === C(s, "direction"),
            rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === C(s, "direction")),
            wrongRTL: "-webkit-box" === C(r, "display")
        }),
        !0
    }
    init(e) {
        const t = this;
        if (t.initialized)
            return t;
        if (!1 === t.mount(e))
            return t;
        t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
        t.params.loop && t.loopCreate(),
        t.attachEvents();
        const s = [...t.el.querySelectorAll('[loading="lazy"]')];
        return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e=>{
            e.complete ? $(t, e) : e.addEventListener("load", (e=>{
                $(t, e.target)
            }
            ))
        }
        )),
        V(t),
        t.initialized = !0,
        V(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
    }
    destroy(e, t) {
        void 0 === e && (e = !0),
        void 0 === t && (t = !0);
        const s = this
          , {params: i, el: r, wrapperEl: a, slides: n} = s;
        return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"),
        s.initialized = !1,
        s.detachEvents(),
        i.loop && s.loopDestroy(),
        t && (s.removeClasses(),
        r.removeAttribute("style"),
        a.removeAttribute("style"),
        n && n.length && n.forEach((e=>{
            e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass),
            e.removeAttribute("style"),
            e.removeAttribute("data-swiper-slide-index")
        }
        ))),
        s.emit("destroy"),
        Object.keys(s.eventsListeners).forEach((e=>{
            s.off(e)
        }
        )),
        !1 !== e && (s.el.swiper = null,
        function(e) {
            const t = e;
            Object.keys(t).forEach((e=>{
                try {
                    t[e] = null
                } catch (s) {}
                try {
                    delete t[e]
                } catch (s) {}
            }
            ))
        }(s)),
        s.destroyed = !0),
        null
    }
    static extendDefaults(e) {
        b(ee, e)
    }
    static get extendedDefaults() {
        return ee
    }
    static get defaults() {
        return Z
    }
    static installModule(e) {
        te.prototype.__modules__ || (te.prototype.__modules__ = []);
        const t = te.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach((e=>te.installModule(e))),
        te) : (te.installModule(e),
        te)
    }
}
function se(e) {
    const {effect: t, swiper: s, on: i, setTranslate: r, setTransition: a, overwriteParams: n, perspective: o, recreateShadows: l, getEffectParams: d} = e;
    let c;
    i("beforeInit", (()=>{
        if (s.params.effect !== t)
            return;
        s.classNames.push(`${s.params.containerModifierClass}${t}`),
        o && o() && s.classNames.push(`${s.params.containerModifierClass}3d`);
        const e = n ? n() : {};
        Object.assign(s.params, e),
        Object.assign(s.originalParams, e)
    }
    )),
    i("setTranslate", (()=>{
        s.params.effect === t && r()
    }
    )),
    i("setTransition", ((e,i)=>{
        s.params.effect === t && a(i)
    }
    )),
    i("transitionEnd", (()=>{
        if (s.params.effect === t && l) {
            if (!d || !d().slideShadows)
                return;
            s.slides.forEach((e=>{
                e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e=>e.remove()))
            }
            )),
            l()
        }
    }
    )),
    i("virtualUpdate", (()=>{
        s.params.effect === t && (s.slides.length || (c = !0),
        requestAnimationFrame((()=>{
            c && s.slides && s.slides.length && (r(),
            c = !1)
        }
        )))
    }
    ))
}
function ie(e, t) {
    const s = x(t);
    return s !== t && (s.style.backfaceVisibility = "hidden",
    s.style["-webkit-backface-visibility"] = "hidden"),
    s
}
function re(e) {
    let {swiper: t, extendParams: s, on: i} = e;
    s({
        cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: .94
        }
    });
    const r = (e,t,s)=>{
        let i = s ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top")
          , r = s ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
        i || (i = P("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s ? "left" : "top")).split(" ")),
        e.append(i)),
        r || (r = P("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s ? "right" : "bottom")).split(" ")),
        e.append(r)),
        i && (i.style.opacity = Math.max(-t, 0)),
        r && (r.style.opacity = Math.max(t, 0))
    }
    ;
    se({
        effect: "cube",
        swiper: t,
        on: i,
        setTranslate: ()=>{
            const {el: e, wrapperEl: s, slides: i, width: a, height: n, rtlTranslate: o, size: l, browser: d} = t
              , c = t.params.cubeEffect
              , p = t.isHorizontal()
              , u = t.virtual && t.params.virtual.enabled;
            let h, f = 0;
            c.shadow && (p ? (h = t.wrapperEl.querySelector(".swiper-cube-shadow"),
            h || (h = P("div", "swiper-cube-shadow"),
            t.wrapperEl.append(h)),
            h.style.height = `${a}px`) : (h = e.querySelector(".swiper-cube-shadow"),
            h || (h = P("div", "swiper-cube-shadow"),
            e.append(h))));
            for (let v = 0; v < i.length; v += 1) {
                const e = i[v];
                let s = v;
                u && (s = parseInt(e.getAttribute("data-swiper-slide-index"), 10));
                let a = 90 * s
                  , n = Math.floor(a / 360);
                o && (a = -a,
                n = Math.floor(-a / 360));
                const d = Math.max(Math.min(e.progress, 1), -1);
                let h = 0
                  , m = 0
                  , g = 0;
                s % 4 == 0 ? (h = 4 * -n * l,
                g = 0) : (s - 1) % 4 == 0 ? (h = 0,
                g = 4 * -n * l) : (s - 2) % 4 == 0 ? (h = l + 4 * n * l,
                g = l) : (s - 3) % 4 == 0 && (h = -l,
                g = 3 * l + 4 * l * n),
                o && (h = -h),
                p || (m = h,
                h = 0);
                const w = `rotateX(${p ? 0 : -a}deg) rotateY(${p ? a : 0}deg) translate3d(${h}px, ${m}px, ${g}px)`;
                d <= 1 && d > -1 && (f = 90 * s + 90 * d,
                o && (f = 90 * -s - 90 * d),
                t.browser && t.browser.isSafari && Math.abs(f) / 90 % 2 == 1 && (f += .001)),
                e.style.transform = w,
                c.slideShadows && r(e, d, p)
            }
            if (s.style.transformOrigin = `50% 50% -${l / 2}px`,
            s.style["-webkit-transform-origin"] = `50% 50% -${l / 2}px`,
            c.shadow)
                if (p)
                    h.style.transform = `translate3d(0px, ${a / 2 + c.shadowOffset}px, ${-a / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${c.shadowScale})`;
                else {
                    const e = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90)
                      , t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2)
                      , s = c.shadowScale
                      , i = c.shadowScale / t
                      , r = c.shadowOffset;
                    h.style.transform = `scale3d(${s}, 1, ${i}) translate3d(0px, ${n / 2 + r}px, ${-n / 2 / i}px) rotateX(-89.99deg)`
                }
            const m = (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -l / 2 : 0;
            s.style.transform = `translate3d(0px,0,${m}px) rotateX(${t.isHorizontal() ? 0 : f}deg) rotateY(${t.isHorizontal() ? -f : 0}deg)`,
            s.style.setProperty("--swiper-cube-translate-z", `${m}px`)
        }
        ,
        setTransition: e=>{
            const {el: s, slides: i} = t;
            if (i.forEach((t=>{
                t.style.transitionDuration = `${e}ms`,
                t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{
                    t.style.transitionDuration = `${e}ms`
                }
                ))
            }
            )),
            t.params.cubeEffect.shadow && !t.isHorizontal()) {
                const t = s.querySelector(".swiper-cube-shadow");
                t && (t.style.transitionDuration = `${e}ms`)
            }
        }
        ,
        recreateShadows: ()=>{
            const e = t.isHorizontal();
            t.slides.forEach((t=>{
                const s = Math.max(Math.min(t.progress, 1), -1);
                r(t, s, e)
            }
            ))
        }
        ,
        getEffectParams: ()=>t.params.cubeEffect,
        perspective: ()=>!0,
        overwriteParams: ()=>({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0
        })
    })
}
function ae(e, t, s) {
    const i = `swiper-slide-shadow${s ? `-${s}` : ""}${e ? ` swiper-slide-shadow-${e}` : ""}`
      , r = x(t);
    let a = r.querySelector(`.${i.split(" ").join(".")}`);
    return a || (a = P("div", i.split(" ")),
    r.append(a)),
    a
}
function ne(e) {
    let {swiper: t, extendParams: s, on: i} = e;
    s({
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            scale: 1,
            modifier: 1,
            slideShadows: !0
        }
    });
    se({
        effect: "coverflow",
        swiper: t,
        on: i,
        setTranslate: ()=>{
            const {width: e, height: s, slides: i, slidesSizesGrid: r} = t
              , a = t.params.coverflowEffect
              , n = t.isHorizontal()
              , o = t.translate
              , l = n ? e / 2 - o : s / 2 - o
              , d = n ? a.rotate : -a.rotate
              , c = a.depth;
            for (let p = 0, u = i.length; p < u; p += 1) {
                const e = i[p]
                  , s = r[p]
                  , o = (l - e.swiperSlideOffset - s / 2) / s
                  , u = "function" == typeof a.modifier ? a.modifier(o) : o * a.modifier;
                let h = n ? d * u : 0
                  , f = n ? 0 : d * u
                  , m = -c * Math.abs(u)
                  , v = a.stretch;
                "string" == typeof v && -1 !== v.indexOf("%") && (v = parseFloat(a.stretch) / 100 * s);
                let g = n ? 0 : v * u
                  , w = n ? v * u : 0
                  , S = 1 - (1 - a.scale) * Math.abs(u);
                Math.abs(w) < .001 && (w = 0),
                Math.abs(g) < .001 && (g = 0),
                Math.abs(m) < .001 && (m = 0),
                Math.abs(h) < .001 && (h = 0),
                Math.abs(f) < .001 && (f = 0),
                Math.abs(S) < .001 && (S = 0),
                t.browser && t.browser.isSafari && (Math.abs(h) / 90 % 2 == 1 && (h += .001),
                Math.abs(f) / 90 % 2 == 1 && (f += .001));
                const b = `translate3d(${w}px,${g}px,${m}px)  rotateX(${f}deg) rotateY(${h}deg) scale(${S})`;
                if (ie(0, e).style.transform = b,
                e.style.zIndex = 1 - Math.abs(Math.round(u)),
                a.slideShadows) {
                    let t = n ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top")
                      , s = n ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
                    t || (t = ae("coverflow", e, n ? "left" : "top")),
                    s || (s = ae("coverflow", e, n ? "right" : "bottom")),
                    t && (t.style.opacity = u > 0 ? u : 0),
                    s && (s.style.opacity = -u > 0 ? -u : 0)
                }
            }
        }
        ,
        setTransition: e=>{
            t.slides.map((e=>x(e))).forEach((t=>{
                t.style.transitionDuration = `${e}ms`,
                t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{
                    t.style.transitionDuration = `${e}ms`
                }
                ))
            }
            ))
        }
        ,
        perspective: ()=>!0,
        overwriteParams: ()=>({
            watchSlidesProgress: !0
        })
    })
}
Object.keys(Q).forEach((e=>{
    Object.keys(Q[e]).forEach((t=>{
        te.prototype[t] = Q[e][t]
    }
    ))
}
)),
te.use([function(e) {
    let {swiper: t, on: s, emit: i} = e;
    const r = f();
    let a = null
      , n = null;
    const o = ()=>{
        t && !t.destroyed && t.initialized && (i("beforeResize"),
        i("resize"))
    }
      , l = ()=>{
        t && !t.destroyed && t.initialized && i("orientationchange")
    }
    ;
    s("init", (()=>{
        t.params.resizeObserver && void 0 !== r.ResizeObserver ? t && !t.destroyed && t.initialized && (a = new ResizeObserver((e=>{
            n = r.requestAnimationFrame((()=>{
                const {width: s, height: i} = t;
                let r = s
                  , a = i;
                e.forEach((e=>{
                    let {contentBoxSize: s, contentRect: i, target: n} = e;
                    n && n !== t.el || (r = i ? i.width : (s[0] || s).inlineSize,
                    a = i ? i.height : (s[0] || s).blockSize)
                }
                )),
                r === s && a === i || o()
            }
            ))
        }
        )),
        a.observe(t.el)) : (r.addEventListener("resize", o),
        r.addEventListener("orientationchange", l))
    }
    )),
    s("destroy", (()=>{
        n && r.cancelAnimationFrame(n),
        a && a.unobserve && t.el && (a.unobserve(t.el),
        a = null),
        r.removeEventListener("resize", o),
        r.removeEventListener("orientationchange", l)
    }
    ))
}
, function(e) {
    let {swiper: t, extendParams: s, on: i, emit: r} = e;
    const a = []
      , n = f()
      , o = function(e, s) {
        void 0 === s && (s = {});
        const i = new (n.MutationObserver || n.WebkitMutationObserver)((e=>{
            if (t.__preventObserver__)
                return;
            if (1 === e.length)
                return void r("observerUpdate", e[0]);
            const s = function() {
                r("observerUpdate", e[0])
            };
            n.requestAnimationFrame ? n.requestAnimationFrame(s) : n.setTimeout(s, 0)
        }
        ));
        i.observe(e, {
            attributes: void 0 === s.attributes || s.attributes,
            childList: void 0 === s.childList || s.childList,
            characterData: void 0 === s.characterData || s.characterData
        }),
        a.push(i)
    };
    s({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
    }),
    i("init", (()=>{
        if (t.params.observer) {
            if (t.params.observeParents) {
                const e = function(e, t) {
                    const s = [];
                    let i = e.parentElement;
                    for (; i; )
                        t ? i.matches(t) && s.push(i) : s.push(i),
                        i = i.parentElement;
                    return s
                }(t.hostEl);
                for (let t = 0; t < e.length; t += 1)
                    o(e[t])
            }
            o(t.hostEl, {
                childList: t.params.observeSlideChildren
            }),
            o(t.wrapperEl, {
                attributes: !1
            })
        }
    }
    )),
    i("destroy", (()=>{
        a.forEach((e=>{
            e.disconnect()
        }
        )),
        a.splice(0, a.length)
    }
    ))
}
]);
export {re as E, te as S, ne as a};
