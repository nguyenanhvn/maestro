!(function () {
    "use strict";
    const u = (e) =>
            "object" == typeof e &&
            null !== e &&
            e.constructor === Object &&
            "[object Object]" === Object.prototype.toString.call(e),
        h = (e, ...t) => {
            const i = t.length;
            for (let n = 0; n < i; n++) {
                const i = t[n] || {};
                Object.entries(i).forEach(([t, i]) => {
                    const n = Array.isArray(i) ? [] : {};
                    e[t] || Object.assign(e, { [t]: n }),
                        u(i)
                            ? Object.assign(e[t], h(n, i))
                            : Array.isArray(i)
                              ? Object.assign(e, { [t]: [...i] })
                              : Object.assign(e, { [t]: i });
                });
            }
            return e;
        },
        p = function (e, t) {
            return e.split(".").reduce((e, t) => ("object" == typeof e ? e[t] : void 0), t);
        };
    function zt(e) {
        return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
    }
    function $t(e, t) {
        void 0 === e && (e = {}),
            void 0 === t && (t = {}),
            Object.keys(t).forEach((i) => {
                void 0 === e[i]
                    ? (e[i] = t[i])
                    : zt(t[i]) && zt(e[i]) && Object.keys(t[i]).length > 0 && $t(e[i], t[i]);
            });
    }
    const jt = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: "" },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName: () => [],
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
    };
    function Dt() {
        const e = "undefined" != typeof document ? document : {};
        return $t(e, jt), e;
    }
    const Ft = {
        document: jt,
        navigator: { userAgent: "" },
        location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => "" }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: (e) => ("undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)),
        cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e);
        },
    };
    function Rt() {
        const e = "undefined" != typeof window ? window : {};
        return $t(e, Ft), e;
    }
    function _t(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function Bt() {
        return Date.now();
    }
    function Nt(e, t) {
        void 0 === t && (t = "x");
        const i = Rt();
        let n, s, o;
        const a = (function (e) {
            const t = Rt();
            let i;
            return (
                t.getComputedStyle && (i = t.getComputedStyle(e, null)),
                !i && e.currentStyle && (i = e.currentStyle),
                i || (i = e.style),
                i
            );
        })(e);
        return (
            i.WebKitCSSMatrix
                ? ((s = a.transform || a.webkitTransform).split(",").length > 6 &&
                      (s = s
                          .split(", ")
                          .map((e) => e.replace(",", "."))
                          .join(", ")),
                  (o = new i.WebKitCSSMatrix("none" === s ? "" : s)))
                : (n = (o =
                      a.MozTransform ||
                      a.OTransform ||
                      a.MsTransform ||
                      a.msTransform ||
                      a.transform ||
                      a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"))
                      .toString()
                      .split(",")),
            "x" === t && (s = i.WebKitCSSMatrix ? o.m41 : 16 === n.length ? parseFloat(n[12]) : parseFloat(n[4])),
            "y" === t && (s = i.WebKitCSSMatrix ? o.m42 : 16 === n.length ? parseFloat(n[13]) : parseFloat(n[5])),
            s || 0
        );
    }
    function Ht(e) {
        return (
            "object" == typeof e &&
            null !== e &&
            e.constructor &&
            "Object" === Object.prototype.toString.call(e).slice(8, -1)
        );
    }
    function Vt() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
            t = ["__proto__", "constructor", "prototype"];
        for (let n = 1; n < arguments.length; n += 1) {
            const s = n < 0 || arguments.length <= n ? void 0 : arguments[n];
            if (
                null != s &&
                ((i = s),
                !("undefined" != typeof window && void 0 !== window.HTMLElement
                    ? i instanceof HTMLElement
                    : i && (1 === i.nodeType || 11 === i.nodeType)))
            ) {
                const i = Object.keys(Object(s)).filter((e) => t.indexOf(e) < 0);
                for (let t = 0, n = i.length; t < n; t += 1) {
                    const n = i[t],
                        o = Object.getOwnPropertyDescriptor(s, n);
                    void 0 !== o &&
                        o.enumerable &&
                        (Ht(e[n]) && Ht(s[n])
                            ? s[n].__swiper__
                                ? (e[n] = s[n])
                                : Vt(e[n], s[n])
                            : !Ht(e[n]) && Ht(s[n])
                              ? ((e[n] = {}), s[n].__swiper__ ? (e[n] = s[n]) : Vt(e[n], s[n]))
                              : (e[n] = s[n]));
                }
            }
        }
        var i;
        return e;
    }
    function qt(e, t, i) {
        e.style.setProperty(t, i);
    }
    function Wt(e) {
        let { swiper: t, targetPosition: i, side: n } = e;
        const s = Rt(),
            o = -t.translate;
        let a,
            r = null;
        const l = t.params.speed;
        (t.wrapperEl.style.scrollSnapType = "none"), s.cancelAnimationFrame(t.cssModeFrameID);
        const c = i > o ? "next" : "prev",
            d = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
            u = () => {
                (a = new Date().getTime()), null === r && (r = a);
                const e = Math.max(Math.min((a - r) / l, 1), 0),
                    c = 0.5 - Math.cos(e * Math.PI) / 2;
                let h = o + c * (i - o);
                if ((d(h, i) && (h = i), t.wrapperEl.scrollTo({ [n]: h }), d(h, i)))
                    return (
                        (t.wrapperEl.style.overflow = "hidden"),
                        (t.wrapperEl.style.scrollSnapType = ""),
                        setTimeout(() => {
                            (t.wrapperEl.style.overflow = ""), t.wrapperEl.scrollTo({ [n]: h });
                        }),
                        void s.cancelAnimationFrame(t.cssModeFrameID)
                    );
                t.cssModeFrameID = s.requestAnimationFrame(u);
            };
        u();
    }
    function Gt(e) {
        return (
            e.querySelector(".swiper-slide-transform") ||
            (e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform")) ||
            e
        );
    }
    function Xt(e, t) {
        void 0 === t && (t = "");
        const i = [...e.children];
        return e instanceof HTMLSlotElement && i.push(...e.assignedElements()), t ? i.filter((e) => e.matches(t)) : i;
    }
    function Yt(e) {
        try {
            return void console.warn(e);
        } catch (e) {}
    }
    function Ut(e, t) {
        void 0 === t && (t = []);
        const i = document.createElement(e);
        return (
            i.classList.add(
                ...(Array.isArray(t)
                    ? t
                    : (function (e) {
                          return (
                              void 0 === e && (e = ""),
                              e
                                  .trim()
                                  .split(" ")
                                  .filter((e) => !!e.trim())
                          );
                      })(t))
            ),
            i
        );
    }
    function Zt(e, t) {
        return Rt().getComputedStyle(e, null).getPropertyValue(t);
    }
    function Kt(e) {
        let t,
            i = e;
        if (i) {
            for (t = 0; null !== (i = i.previousSibling); ) 1 === i.nodeType && (t += 1);
            return t;
        }
    }
    function Jt(e, t) {
        const i = [];
        let n = e.parentElement;
        for (; n; ) t ? n.matches(t) && i.push(n) : i.push(n), (n = n.parentElement);
        return i;
    }
    function Qt(e, t, i) {
        const n = Rt();
        return i
            ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
                  parseFloat(
                      n.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")
                  ) +
                  parseFloat(
                      n.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")
                  )
            : e.offsetWidth;
    }
    function ei(e) {
        return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    }
    let ti, ii, ni;
    function si() {
        return (
            ti ||
                (ti = (function () {
                    const e = Rt(),
                        t = Dt();
                    return {
                        smoothScroll:
                            t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
                        touch: !!("ontouchstart" in e || (e.DocumentTouch && t instanceof e.DocumentTouch)),
                    };
                })()),
            ti
        );
    }
    function oi(e) {
        return (
            void 0 === e && (e = {}),
            ii ||
                (ii = (function (e) {
                    let { userAgent: t } = void 0 === e ? {} : e;
                    const i = si(),
                        n = Rt(),
                        s = n.navigator.platform,
                        o = t || n.navigator.userAgent,
                        a = { ios: !1, android: !1 },
                        r = n.screen.width,
                        l = n.screen.height,
                        c = o.match(/(Android);?[\s\/]+([\d.]+)?/);
                    let d = o.match(/(iPad).*OS\s([\d_]+)/);
                    const u = o.match(/(iPod)(.*OS\s([\d_]+))?/),
                        h = !d && o.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                        p = "Win32" === s;
                    let f = "MacIntel" === s;
                    return (
                        !d &&
                            f &&
                            i.touch &&
                            [
                                "1024x1366",
                                "1366x1024",
                                "834x1194",
                                "1194x834",
                                "834x1112",
                                "1112x834",
                                "768x1024",
                                "1024x768",
                                "820x1180",
                                "1180x820",
                                "810x1080",
                                "1080x810",
                            ].indexOf(`${r}x${l}`) >= 0 &&
                            ((d = o.match(/(Version)\/([\d.]+)/)) || (d = [0, 1, "13_0_0"]), (f = !1)),
                        c && !p && ((a.os = "android"), (a.android = !0)),
                        (d || h || u) && ((a.os = "ios"), (a.ios = !0)),
                        a
                    );
                })(e)),
            ii
        );
    }
    function ai() {
        return (
            ni ||
                (ni = (function () {
                    const e = Rt(),
                        t = oi();
                    let i = !1;
                    function n() {
                        const t = e.navigator.userAgent.toLowerCase();
                        return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
                    }
                    if (n()) {
                        const t = String(e.navigator.userAgent);
                        if (t.includes("Version/")) {
                            const [e, n] = t
                                .split("Version/")[1]
                                .split(" ")[0]
                                .split(".")
                                .map((e) => Number(e));
                            i = e < 16 || (16 === e && n < 2);
                        }
                    }
                    const s = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent),
                        o = n();
                    return { isSafari: i || o, needPerspectiveFix: i, need3dFix: o || (s && t.ios), isWebView: s };
                })()),
            ni
        );
    }
    var ri = {
        on(e, t, i) {
            const n = this;
            if (!n.eventsListeners || n.destroyed) return n;
            if ("function" != typeof t) return n;
            const s = i ? "unshift" : "push";
            return (
                e.split(" ").forEach((e) => {
                    n.eventsListeners[e] || (n.eventsListeners[e] = []), n.eventsListeners[e][s](t);
                }),
                n
            );
        },
        once(e, t, i) {
            const n = this;
            if (!n.eventsListeners || n.destroyed) return n;
            if ("function" != typeof t) return n;
            function s() {
                n.off(e, s), s.__emitterProxy && delete s.__emitterProxy;
                for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
                t.apply(n, o);
            }
            return (s.__emitterProxy = t), n.on(e, s, i);
        },
        onAny(e, t) {
            const i = this;
            if (!i.eventsListeners || i.destroyed) return i;
            if ("function" != typeof e) return i;
            const n = t ? "unshift" : "push";
            return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[n](e), i;
        },
        offAny(e) {
            const t = this;
            if (!t.eventsListeners || t.destroyed) return t;
            if (!t.eventsAnyListeners) return t;
            const i = t.eventsAnyListeners.indexOf(e);
            return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
        },
        off(e, t) {
            const i = this;
            return !i.eventsListeners || i.destroyed
                ? i
                : i.eventsListeners
                  ? (e.split(" ").forEach((e) => {
                        void 0 === t
                            ? (i.eventsListeners[e] = [])
                            : i.eventsListeners[e] &&
                              i.eventsListeners[e].forEach((n, s) => {
                                  (n === t || (n.__emitterProxy && n.__emitterProxy === t)) &&
                                      i.eventsListeners[e].splice(s, 1);
                              });
                    }),
                    i)
                  : i;
        },
        emit() {
            const e = this;
            if (!e.eventsListeners || e.destroyed) return e;
            if (!e.eventsListeners) return e;
            let t, i, n;
            for (var s = arguments.length, o = new Array(s), a = 0; a < s; a++) o[a] = arguments[a];
            return (
                "string" == typeof o[0] || Array.isArray(o[0])
                    ? ((t = o[0]), (i = o.slice(1, o.length)), (n = e))
                    : ((t = o[0].events), (i = o[0].data), (n = o[0].context || e)),
                i.unshift(n),
                (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
                    e.eventsAnyListeners &&
                        e.eventsAnyListeners.length &&
                        e.eventsAnyListeners.forEach((e) => {
                            e.apply(n, [t, ...i]);
                        }),
                        e.eventsListeners &&
                            e.eventsListeners[t] &&
                            e.eventsListeners[t].forEach((e) => {
                                e.apply(n, i);
                            });
                }),
                e
            );
        },
    };
    const li = (e, t, i) => {
        t && !e.classList.contains(i) ? e.classList.add(i) : !t && e.classList.contains(i) && e.classList.remove(i);
    };
    const ci = (e, t, i) => {
        t && !e.classList.contains(i) ? e.classList.add(i) : !t && e.classList.contains(i) && e.classList.remove(i);
    };
    const di = (e, t) => {
            if (!e || e.destroyed || !e.params) return;
            const i = t.closest((() => (e.isElement ? "swiper-slide" : `.${e.params.slideClass}`))());
            if (i) {
                let t = i.querySelector(`.${e.params.lazyPreloaderClass}`);
                !t &&
                    e.isElement &&
                    (i.shadowRoot
                        ? (t = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`))
                        : requestAnimationFrame(() => {
                              i.shadowRoot &&
                                  (t = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`)) &&
                                  t.remove();
                          })),
                    t && t.remove();
            }
        },
        ui = (e, t) => {
            if (!e.slides[t]) return;
            const i = e.slides[t].querySelector('[loading="lazy"]');
            i && i.removeAttribute("loading");
        },
        hi = (e) => {
            if (!e || e.destroyed || !e.params) return;
            let t = e.params.lazyPreloadPrevNext;
            const i = e.slides.length;
            if (!i || !t || t < 0) return;
            t = Math.min(t, i);
            const n = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView),
                s = e.activeIndex;
            if (e.params.grid && e.params.grid.rows > 1) {
                const i = s,
                    o = [i - t];
                return (
                    o.push(...Array.from({ length: t }).map((e, t) => i + n + t)),
                    void e.slides.forEach((t, i) => {
                        o.includes(t.column) && ui(e, i);
                    })
                );
            }
            const o = s + n - 1;
            if (e.params.rewind || e.params.loop)
                for (let n = s - t; n <= o + t; n += 1) {
                    const t = ((n % i) + i) % i;
                    (t < s || t > o) && ui(e, t);
                }
            else
                for (let n = Math.max(s - t, 0); n <= Math.min(o + t, i - 1); n += 1)
                    n !== s && (n > o || n < s) && ui(e, n);
        };
    function pi(e) {
        let { swiper: t, runCallbacks: i, direction: n, step: s } = e;
        const { activeIndex: o, previousIndex: a } = t;
        let r = n;
        if ((r || (r = o > a ? "next" : o < a ? "prev" : "reset"), t.emit(`transition${s}`), i && o !== a)) {
            if ("reset" === r) return void t.emit(`slideResetTransition${s}`);
            t.emit(`slideChangeTransition${s}`),
                "next" === r ? t.emit(`slideNextTransition${s}`) : t.emit(`slidePrevTransition${s}`);
        }
    }
    function fi(e, t, i) {
        const n = Rt(),
            { params: s } = e,
            o = s.edgeSwipeDetection,
            a = s.edgeSwipeThreshold;
        return !o || !(i <= a || i >= n.innerWidth - a) || ("prevent" === o && (t.preventDefault(), !0));
    }
    function mi(e) {
        const t = this,
            i = Dt();
        let n = e;
        n.originalEvent && (n = n.originalEvent);
        const s = t.touchEventsData;
        if ("pointerdown" === n.type) {
            if (null !== s.pointerId && s.pointerId !== n.pointerId) return;
            s.pointerId = n.pointerId;
        } else "touchstart" === n.type && 1 === n.targetTouches.length && (s.touchId = n.targetTouches[0].identifier);
        if ("touchstart" === n.type) return void fi(t, n, n.targetTouches[0].pageX);
        const { params: o, touches: a, enabled: r } = t;
        if (!r) return;
        if (!o.simulateTouch && "mouse" === n.pointerType) return;
        if (t.animating && o.preventInteractionOnTransition) return;
        !t.animating && o.cssMode && o.loop && t.loopFix();
        let l = n.target;
        if (
            "wrapper" === o.touchEventsTarget &&
            !(function (e, t) {
                const i = t.contains(e);
                if (!i && t instanceof HTMLSlotElement) return [...t.assignedElements()].includes(e);
                return i;
            })(l, t.wrapperEl)
        )
            return;
        if ("which" in n && 3 === n.which) return;
        if ("button" in n && n.button > 0) return;
        if (s.isTouched && s.isMoved) return;
        const c = !!o.noSwipingClass && "" !== o.noSwipingClass,
            d = n.composedPath ? n.composedPath() : n.path;
        c && n.target && n.target.shadowRoot && d && (l = d[0]);
        const u = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`,
            h = !(!n.target || !n.target.shadowRoot);
        if (
            o.noSwiping &&
            (h
                ? (function (e, t) {
                      return (
                          void 0 === t && (t = this),
                          (function t(i) {
                              if (!i || i === Dt() || i === Rt()) return null;
                              i.assignedSlot && (i = i.assignedSlot);
                              const n = i.closest(e);
                              return n || i.getRootNode ? n || t(i.getRootNode().host) : null;
                          })(t)
                      );
                  })(u, l)
                : l.closest(u))
        )
            return void (t.allowClick = !0);
        if (o.swipeHandler && !l.closest(o.swipeHandler)) return;
        (a.currentX = n.pageX), (a.currentY = n.pageY);
        const p = a.currentX,
            f = a.currentY;
        if (!fi(t, n, p)) return;
        Object.assign(s, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
        }),
            (a.startX = p),
            (a.startY = f),
            (s.touchStartTime = Bt()),
            (t.allowClick = !0),
            t.updateSize(),
            (t.swipeDirection = void 0),
            o.threshold > 0 && (s.allowThresholdMove = !1);
        let m = !0;
        l.matches(s.focusableElements) && ((m = !1), "SELECT" === l.nodeName && (s.isTouched = !1)),
            i.activeElement &&
                i.activeElement.matches(s.focusableElements) &&
                i.activeElement !== l &&
                ("mouse" === n.pointerType || ("mouse" !== n.pointerType && !l.matches(s.focusableElements))) &&
                i.activeElement.blur();
        const g = m && t.allowTouchMove && o.touchStartPreventDefault;
        (!o.touchStartForcePreventDefault && !g) || l.isContentEditable || n.preventDefault(),
            o.freeMode && o.freeMode.enabled && t.freeMode && t.animating && !o.cssMode && t.freeMode.onTouchStart(),
            t.emit("touchStart", n);
    }
    function gi() {
        const e = this,
            { params: t, el: i } = e;
        if (i && 0 === i.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: n, allowSlidePrev: s, snapGrid: o } = e,
            a = e.virtual && e.params.virtual.enabled;
        (e.allowSlideNext = !0), (e.allowSlidePrev = !0), e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
        const r = a && t.loop;
        !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
        !e.isEnd ||
        e.isBeginning ||
        e.params.centeredSlides ||
        r
            ? e.params.loop && !a
                ? e.slideToLoop(e.realIndex, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)
            : e.slideTo(e.slides.length - 1, 0, !1, !0),
            e.autoplay &&
                e.autoplay.running &&
                e.autoplay.paused &&
                (clearTimeout(e.autoplay.resizeTimeout),
                (e.autoplay.resizeTimeout = setTimeout(() => {
                    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
                }, 500))),
            (e.allowSlidePrev = s),
            (e.allowSlideNext = n),
            e.params.watchOverflow && o !== e.snapGrid && e.checkOverflow();
    }
    const vi = (e, t) => {
        const i = Dt(),
            { params: n, el: s, wrapperEl: o, device: a } = e,
            r = !!n.nested,
            l = "on" === t ? "addEventListener" : "removeEventListener",
            c = t;
        s &&
            "string" != typeof s &&
            (i[l]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: r }),
            s[l]("touchstart", e.onTouchStart, { passive: !1 }),
            s[l]("pointerdown", e.onTouchStart, { passive: !1 }),
            i[l]("touchmove", e.onTouchMove, { passive: !1, capture: r }),
            i[l]("pointermove", e.onTouchMove, { passive: !1, capture: r }),
            i[l]("touchend", e.onTouchEnd, { passive: !0 }),
            i[l]("pointerup", e.onTouchEnd, { passive: !0 }),
            i[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
            i[l]("touchcancel", e.onTouchEnd, { passive: !0 }),
            i[l]("pointerout", e.onTouchEnd, { passive: !0 }),
            i[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
            i[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
            (n.preventClicks || n.preventClicksPropagation) && s[l]("click", e.onClick, !0),
            n.cssMode && o[l]("scroll", e.onScroll),
            n.updateOnWindowResize
                ? e[c](a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", gi, !0)
                : e[c]("observerUpdate", gi, !0),
            s[l]("load", e.onLoad, { capture: !0 }));
    };
    const bi = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var yi = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        swiperElementNodeName: "SWIPER-CONTAINER",
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
        longSwipesRatio: 0.5,
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
        resistanceRatio: 0.85,
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
        _emitClasses: !1,
    };
    function wi(e, t) {
        return function (i) {
            void 0 === i && (i = {});
            const n = Object.keys(i)[0],
                s = i[n];
            "object" == typeof s && null !== s
                ? (!0 === e[n] && (e[n] = { enabled: !0 }),
                  "navigation" === n && e[n] && e[n].enabled && !e[n].prevEl && !e[n].nextEl && (e[n].auto = !0),
                  ["pagination", "scrollbar"].indexOf(n) >= 0 && e[n] && e[n].enabled && !e[n].el && (e[n].auto = !0),
                  n in e && "enabled" in s
                      ? ("object" != typeof e[n] || "enabled" in e[n] || (e[n].enabled = !0),
                        e[n] || (e[n] = { enabled: !1 }),
                        Vt(t, i))
                      : Vt(t, i))
                : Vt(t, i);
        };
    }
    const Si = {
            eventsEmitter: ri,
            update: {
                updateSize: function () {
                    const e = this;
                    let t, i;
                    const n = e.el;
                    (t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : n.clientWidth),
                        (i = void 0 !== e.params.height && null !== e.params.height ? e.params.height : n.clientHeight),
                        (0 === t && e.isHorizontal()) ||
                            (0 === i && e.isVertical()) ||
                            ((t =
                                t -
                                parseInt(Zt(n, "padding-left") || 0, 10) -
                                parseInt(Zt(n, "padding-right") || 0, 10)),
                            (i =
                                i -
                                parseInt(Zt(n, "padding-top") || 0, 10) -
                                parseInt(Zt(n, "padding-bottom") || 0, 10)),
                            Number.isNaN(t) && (t = 0),
                            Number.isNaN(i) && (i = 0),
                            Object.assign(e, { width: t, height: i, size: e.isHorizontal() ? t : i }));
                },
                updateSlides: function () {
                    const e = this;
                    function t(t, i) {
                        return parseFloat(t.getPropertyValue(e.getDirectionLabel(i)) || 0);
                    }
                    const i = e.params,
                        { wrapperEl: n, slidesEl: s, size: o, rtlTranslate: a, wrongRTL: r } = e,
                        l = e.virtual && i.virtual.enabled,
                        c = l ? e.virtual.slides.length : e.slides.length,
                        d = Xt(s, `.${e.params.slideClass}, swiper-slide`),
                        u = l ? e.virtual.slides.length : d.length;
                    let h = [];
                    const p = [],
                        f = [];
                    let m = i.slidesOffsetBefore;
                    "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
                    let g = i.slidesOffsetAfter;
                    "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
                    const v = e.snapGrid.length,
                        b = e.slidesGrid.length;
                    let y = i.spaceBetween,
                        w = -m,
                        S = 0,
                        x = 0;
                    if (void 0 === o) return;
                    "string" == typeof y && y.indexOf("%") >= 0
                        ? (y = (parseFloat(y.replace("%", "")) / 100) * o)
                        : "string" == typeof y && (y = parseFloat(y)),
                        (e.virtualSize = -y),
                        d.forEach((e) => {
                            a ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
                                (e.style.marginBottom = ""),
                                (e.style.marginTop = "");
                        }),
                        i.centeredSlides &&
                            i.cssMode &&
                            (qt(n, "--swiper-centered-offset-before", ""), qt(n, "--swiper-centered-offset-after", ""));
                    const E = i.grid && i.grid.rows > 1 && e.grid;
                    let T;
                    E ? e.grid.initSlides(d) : e.grid && e.grid.unsetSlides();
                    const C =
                        "auto" === i.slidesPerView &&
                        i.breakpoints &&
                        Object.keys(i.breakpoints).filter((e) => void 0 !== i.breakpoints[e].slidesPerView).length > 0;
                    for (let n = 0; n < u; n += 1) {
                        let s;
                        if (
                            ((T = 0),
                            d[n] && (s = d[n]),
                            E && e.grid.updateSlide(n, s, d),
                            !d[n] || "none" !== Zt(s, "display"))
                        ) {
                            if ("auto" === i.slidesPerView) {
                                C && (d[n].style[e.getDirectionLabel("width")] = "");
                                const o = getComputedStyle(s),
                                    a = s.style.transform,
                                    r = s.style.webkitTransform;
                                if (
                                    (a && (s.style.transform = "none"),
                                    r && (s.style.webkitTransform = "none"),
                                    i.roundLengths)
                                )
                                    T = e.isHorizontal() ? Qt(s, "width", !0) : Qt(s, "height", !0);
                                else {
                                    const e = t(o, "width"),
                                        i = t(o, "padding-left"),
                                        n = t(o, "padding-right"),
                                        a = t(o, "margin-left"),
                                        r = t(o, "margin-right"),
                                        l = o.getPropertyValue("box-sizing");
                                    if (l && "border-box" === l) T = e + a + r;
                                    else {
                                        const { clientWidth: t, offsetWidth: o } = s;
                                        T = e + i + n + a + r + (o - t);
                                    }
                                }
                                a && (s.style.transform = a),
                                    r && (s.style.webkitTransform = r),
                                    i.roundLengths && (T = Math.floor(T));
                            } else
                                (T = (o - (i.slidesPerView - 1) * y) / i.slidesPerView),
                                    i.roundLengths && (T = Math.floor(T)),
                                    d[n] && (d[n].style[e.getDirectionLabel("width")] = `${T}px`);
                            d[n] && (d[n].swiperSlideSize = T),
                                f.push(T),
                                i.centeredSlides
                                    ? ((w = w + T / 2 + S / 2 + y),
                                      0 === S && 0 !== n && (w = w - o / 2 - y),
                                      0 === n && (w = w - o / 2 - y),
                                      Math.abs(w) < 0.001 && (w = 0),
                                      i.roundLengths && (w = Math.floor(w)),
                                      x % i.slidesPerGroup == 0 && h.push(w),
                                      p.push(w))
                                    : (i.roundLengths && (w = Math.floor(w)),
                                      (x - Math.min(e.params.slidesPerGroupSkip, x)) % e.params.slidesPerGroup == 0 &&
                                          h.push(w),
                                      p.push(w),
                                      (w = w + T + y)),
                                (e.virtualSize += T + y),
                                (S = T),
                                (x += 1);
                        }
                    }
                    if (
                        ((e.virtualSize = Math.max(e.virtualSize, o) + g),
                        a &&
                            r &&
                            ("slide" === i.effect || "coverflow" === i.effect) &&
                            (n.style.width = `${e.virtualSize + y}px`),
                        i.setWrapperSize && (n.style[e.getDirectionLabel("width")] = `${e.virtualSize + y}px`),
                        E && e.grid.updateWrapperSize(T, h),
                        !i.centeredSlides)
                    ) {
                        const t = [];
                        for (let n = 0; n < h.length; n += 1) {
                            let s = h[n];
                            i.roundLengths && (s = Math.floor(s)), h[n] <= e.virtualSize - o && t.push(s);
                        }
                        (h = t),
                            Math.floor(e.virtualSize - o) - Math.floor(h[h.length - 1]) > 1 &&
                                h.push(e.virtualSize - o);
                    }
                    if (l && i.loop) {
                        const t = f[0] + y;
                        if (i.slidesPerGroup > 1) {
                            const n = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup),
                                s = t * i.slidesPerGroup;
                            for (let e = 0; e < n; e += 1) h.push(h[h.length - 1] + s);
                        }
                        for (let n = 0; n < e.virtual.slidesBefore + e.virtual.slidesAfter; n += 1)
                            1 === i.slidesPerGroup && h.push(h[h.length - 1] + t),
                                p.push(p[p.length - 1] + t),
                                (e.virtualSize += t);
                    }
                    if ((0 === h.length && (h = [0]), 0 !== y)) {
                        const t = e.isHorizontal() && a ? "marginLeft" : e.getDirectionLabel("marginRight");
                        d.filter((e, t) => !(i.cssMode && !i.loop) || t !== d.length - 1).forEach((e) => {
                            e.style[t] = `${y}px`;
                        });
                    }
                    if (i.centeredSlides && i.centeredSlidesBounds) {
                        let e = 0;
                        f.forEach((t) => {
                            e += t + (y || 0);
                        });
                        const t = (e -= y) > o ? e - o : 0;
                        h = h.map((e) => (e <= 0 ? -m : e > t ? t + g : e));
                    }
                    if (i.centerInsufficientSlides) {
                        let e = 0;
                        f.forEach((t) => {
                            e += t + (y || 0);
                        }),
                            (e -= y);
                        const t = (i.slidesOffsetBefore || 0) + (i.slidesOffsetAfter || 0);
                        if (e + t < o) {
                            const i = (o - e - t) / 2;
                            h.forEach((e, t) => {
                                h[t] = e - i;
                            }),
                                p.forEach((e, t) => {
                                    p[t] = e + i;
                                });
                        }
                    }
                    if (
                        (Object.assign(e, { slides: d, snapGrid: h, slidesGrid: p, slidesSizesGrid: f }),
                        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
                    ) {
                        qt(n, "--swiper-centered-offset-before", `${-h[0]}px`),
                            qt(n, "--swiper-centered-offset-after", `${e.size / 2 - f[f.length - 1] / 2}px`);
                        const t = -e.snapGrid[0],
                            i = -e.slidesGrid[0];
                        (e.snapGrid = e.snapGrid.map((e) => e + t)), (e.slidesGrid = e.slidesGrid.map((e) => e + i));
                    }
                    if (
                        (u !== c && e.emit("slidesLengthChange"),
                        h.length !== v && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")),
                        p.length !== b && e.emit("slidesGridLengthChange"),
                        i.watchSlidesProgress && e.updateSlidesOffset(),
                        e.emit("slidesUpdated"),
                        !(l || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
                    ) {
                        const t = `${i.containerModifierClass}backface-hidden`,
                            n = e.el.classList.contains(t);
                        u <= i.maxBackfaceHiddenSlides ? n || e.el.classList.add(t) : n && e.el.classList.remove(t);
                    }
                },
                updateAutoHeight: function (e) {
                    const t = this,
                        i = [],
                        n = t.virtual && t.params.virtual.enabled;
                    let s,
                        o = 0;
                    "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                    const a = (e) => (n ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
                    if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                        if (t.params.centeredSlides)
                            (t.visibleSlides || []).forEach((e) => {
                                i.push(e);
                            });
                        else
                            for (s = 0; s < Math.ceil(t.params.slidesPerView); s += 1) {
                                const e = t.activeIndex + s;
                                if (e > t.slides.length && !n) break;
                                i.push(a(e));
                            }
                    else i.push(a(t.activeIndex));
                    for (s = 0; s < i.length; s += 1)
                        if (void 0 !== i[s]) {
                            const e = i[s].offsetHeight;
                            o = e > o ? e : o;
                        }
                    (o || 0 === o) && (t.wrapperEl.style.height = `${o}px`);
                },
                updateSlidesOffset: function () {
                    const e = this,
                        t = e.slides,
                        i = e.isElement ? (e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop) : 0;
                    for (let n = 0; n < t.length; n += 1)
                        t[n].swiperSlideOffset =
                            (e.isHorizontal() ? t[n].offsetLeft : t[n].offsetTop) - i - e.cssOverflowAdjustment();
                },
                updateSlidesProgress: function (e) {
                    void 0 === e && (e = (this && this.translate) || 0);
                    const t = this,
                        i = t.params,
                        { slides: n, rtlTranslate: s, snapGrid: o } = t;
                    if (0 === n.length) return;
                    void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
                    let a = -e;
                    s && (a = e), (t.visibleSlidesIndexes = []), (t.visibleSlides = []);
                    let r = i.spaceBetween;
                    "string" == typeof r && r.indexOf("%") >= 0
                        ? (r = (parseFloat(r.replace("%", "")) / 100) * t.size)
                        : "string" == typeof r && (r = parseFloat(r));
                    for (let e = 0; e < n.length; e += 1) {
                        const l = n[e];
                        let c = l.swiperSlideOffset;
                        i.cssMode && i.centeredSlides && (c -= n[0].swiperSlideOffset);
                        const d = (a + (i.centeredSlides ? t.minTranslate() : 0) - c) / (l.swiperSlideSize + r),
                            u = (a - o[0] + (i.centeredSlides ? t.minTranslate() : 0) - c) / (l.swiperSlideSize + r),
                            h = -(a - c),
                            p = h + t.slidesSizesGrid[e],
                            f = h >= 0 && h <= t.size - t.slidesSizesGrid[e],
                            m = (h >= 0 && h < t.size - 1) || (p > 1 && p <= t.size) || (h <= 0 && p >= t.size);
                        m && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(e)),
                            li(l, m, i.slideVisibleClass),
                            li(l, f, i.slideFullyVisibleClass),
                            (l.progress = s ? -d : d),
                            (l.originalProgress = s ? -u : u);
                    }
                },
                updateProgress: function (e) {
                    const t = this;
                    if (void 0 === e) {
                        const i = t.rtlTranslate ? -1 : 1;
                        e = (t && t.translate && t.translate * i) || 0;
                    }
                    const i = t.params,
                        n = t.maxTranslate() - t.minTranslate();
                    let { progress: s, isBeginning: o, isEnd: a, progressLoop: r } = t;
                    const l = o,
                        c = a;
                    if (0 === n) (s = 0), (o = !0), (a = !0);
                    else {
                        s = (e - t.minTranslate()) / n;
                        const i = Math.abs(e - t.minTranslate()) < 1,
                            r = Math.abs(e - t.maxTranslate()) < 1;
                        (o = i || s <= 0), (a = r || s >= 1), i && (s = 0), r && (s = 1);
                    }
                    if (i.loop) {
                        const i = t.getSlideIndexByData(0),
                            n = t.getSlideIndexByData(t.slides.length - 1),
                            s = t.slidesGrid[i],
                            o = t.slidesGrid[n],
                            a = t.slidesGrid[t.slidesGrid.length - 1],
                            l = Math.abs(e);
                        (r = l >= s ? (l - s) / a : (l + a - o) / a) > 1 && (r -= 1);
                    }
                    Object.assign(t, { progress: s, progressLoop: r, isBeginning: o, isEnd: a }),
                        (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) && t.updateSlidesProgress(e),
                        o && !l && t.emit("reachBeginning toEdge"),
                        a && !c && t.emit("reachEnd toEdge"),
                        ((l && !o) || (c && !a)) && t.emit("fromEdge"),
                        t.emit("progress", s);
                },
                updateSlidesClasses: function () {
                    const e = this,
                        { slides: t, params: i, slidesEl: n, activeIndex: s } = e,
                        o = e.virtual && i.virtual.enabled,
                        a = e.grid && i.grid && i.grid.rows > 1,
                        r = (e) => Xt(n, `.${i.slideClass}${e}, swiper-slide${e}`)[0];
                    let l, c, d;
                    if (o)
                        if (i.loop) {
                            let t = s - e.virtual.slidesBefore;
                            t < 0 && (t = e.virtual.slides.length + t),
                                t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
                                (l = r(`[data-swiper-slide-index="${t}"]`));
                        } else l = r(`[data-swiper-slide-index="${s}"]`);
                    else
                        a
                            ? ((l = t.filter((e) => e.column === s)[0]),
                              (d = t.filter((e) => e.column === s + 1)[0]),
                              (c = t.filter((e) => e.column === s - 1)[0]))
                            : (l = t[s]);
                    l &&
                        (a ||
                            ((d = (function (e, t) {
                                const i = [];
                                for (; e.nextElementSibling; ) {
                                    const n = e.nextElementSibling;
                                    t ? n.matches(t) && i.push(n) : i.push(n), (e = n);
                                }
                                return i;
                            })(l, `.${i.slideClass}, swiper-slide`)[0]),
                            i.loop && !d && (d = t[0]),
                            (c = (function (e, t) {
                                const i = [];
                                for (; e.previousElementSibling; ) {
                                    const n = e.previousElementSibling;
                                    t ? n.matches(t) && i.push(n) : i.push(n), (e = n);
                                }
                                return i;
                            })(l, `.${i.slideClass}, swiper-slide`)[0]),
                            i.loop && 0 === !c && (c = t[t.length - 1]))),
                        t.forEach((e) => {
                            ci(e, e === l, i.slideActiveClass),
                                ci(e, e === d, i.slideNextClass),
                                ci(e, e === c, i.slidePrevClass);
                        }),
                        e.emitSlidesClasses();
                },
                updateActiveIndex: function (e) {
                    const t = this,
                        i = t.rtlTranslate ? t.translate : -t.translate,
                        { snapGrid: n, params: s, activeIndex: o, realIndex: a, snapIndex: r } = t;
                    let l,
                        c = e;
                    const d = (e) => {
                        let i = e - t.virtual.slidesBefore;
                        return (
                            i < 0 && (i = t.virtual.slides.length + i),
                            i >= t.virtual.slides.length && (i -= t.virtual.slides.length),
                            i
                        );
                    };
                    if (
                        (void 0 === c &&
                            (c = (function (e) {
                                const { slidesGrid: t, params: i } = e,
                                    n = e.rtlTranslate ? e.translate : -e.translate;
                                let s;
                                for (let e = 0; e < t.length; e += 1)
                                    void 0 !== t[e + 1]
                                        ? n >= t[e] && n < t[e + 1] - (t[e + 1] - t[e]) / 2
                                            ? (s = e)
                                            : n >= t[e] && n < t[e + 1] && (s = e + 1)
                                        : n >= t[e] && (s = e);
                                return i.normalizeSlideIndex && (s < 0 || void 0 === s) && (s = 0), s;
                            })(t)),
                        n.indexOf(i) >= 0)
                    )
                        l = n.indexOf(i);
                    else {
                        const e = Math.min(s.slidesPerGroupSkip, c);
                        l = e + Math.floor((c - e) / s.slidesPerGroup);
                    }
                    if ((l >= n.length && (l = n.length - 1), c === o && !t.params.loop))
                        return void (l !== r && ((t.snapIndex = l), t.emit("snapIndexChange")));
                    if (c === o && t.params.loop && t.virtual && t.params.virtual.enabled)
                        return void (t.realIndex = d(c));
                    const u = t.grid && s.grid && s.grid.rows > 1;
                    let h;
                    if (t.virtual && s.virtual.enabled && s.loop) h = d(c);
                    else if (u) {
                        const e = t.slides.filter((e) => e.column === c)[0];
                        let i = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
                        Number.isNaN(i) && (i = Math.max(t.slides.indexOf(e), 0)), (h = Math.floor(i / s.grid.rows));
                    } else if (t.slides[c]) {
                        const e = t.slides[c].getAttribute("data-swiper-slide-index");
                        h = e ? parseInt(e, 10) : c;
                    } else h = c;
                    Object.assign(t, {
                        previousSnapIndex: r,
                        snapIndex: l,
                        previousRealIndex: a,
                        realIndex: h,
                        previousIndex: o,
                        activeIndex: c,
                    }),
                        t.initialized && hi(t),
                        t.emit("activeIndexChange"),
                        t.emit("snapIndexChange"),
                        (t.initialized || t.params.runCallbacksOnInit) &&
                            (a !== h && t.emit("realIndexChange"), t.emit("slideChange"));
                },
                updateClickedSlide: function (e, t) {
                    const i = this,
                        n = i.params;
                    let s = e.closest(`.${n.slideClass}, swiper-slide`);
                    !s &&
                        i.isElement &&
                        t &&
                        t.length > 1 &&
                        t.includes(e) &&
                        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
                            !s && e.matches && e.matches(`.${n.slideClass}, swiper-slide`) && (s = e);
                        });
                    let o,
                        a = !1;
                    if (s)
                        for (let e = 0; e < i.slides.length; e += 1)
                            if (i.slides[e] === s) {
                                (a = !0), (o = e);
                                break;
                            }
                    if (!s || !a) return (i.clickedSlide = void 0), void (i.clickedIndex = void 0);
                    (i.clickedSlide = s),
                        i.virtual && i.params.virtual.enabled
                            ? (i.clickedIndex = parseInt(s.getAttribute("data-swiper-slide-index"), 10))
                            : (i.clickedIndex = o),
                        n.slideToClickedSlide &&
                            void 0 !== i.clickedIndex &&
                            i.clickedIndex !== i.activeIndex &&
                            i.slideToClickedSlide();
                },
            },
            translate: {
                getTranslate: function (e) {
                    void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                    const { params: t, rtlTranslate: i, translate: n, wrapperEl: s } = this;
                    if (t.virtualTranslate) return i ? -n : n;
                    if (t.cssMode) return n;
                    let o = Nt(s, e);
                    return (o += this.cssOverflowAdjustment()), i && (o = -o), o || 0;
                },
                setTranslate: function (e, t) {
                    const i = this,
                        { rtlTranslate: n, params: s, wrapperEl: o, progress: a } = i;
                    let r,
                        l = 0,
                        c = 0;
                    i.isHorizontal() ? (l = n ? -e : e) : (c = e),
                        s.roundLengths && ((l = Math.floor(l)), (c = Math.floor(c))),
                        (i.previousTranslate = i.translate),
                        (i.translate = i.isHorizontal() ? l : c),
                        s.cssMode
                            ? (o[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -l : -c)
                            : s.virtualTranslate ||
                              (i.isHorizontal() ? (l -= i.cssOverflowAdjustment()) : (c -= i.cssOverflowAdjustment()),
                              (o.style.transform = `translate3d(${l}px, ${c}px, 0px)`));
                    const d = i.maxTranslate() - i.minTranslate();
                    (r = 0 === d ? 0 : (e - i.minTranslate()) / d) !== a && i.updateProgress(e),
                        i.emit("setTranslate", i.translate, t);
                },
                minTranslate: function () {
                    return -this.snapGrid[0];
                },
                maxTranslate: function () {
                    return -this.snapGrid[this.snapGrid.length - 1];
                },
                translateTo: function (e, t, i, n, s) {
                    void 0 === e && (e = 0),
                        void 0 === t && (t = this.params.speed),
                        void 0 === i && (i = !0),
                        void 0 === n && (n = !0);
                    const o = this,
                        { params: a, wrapperEl: r } = o;
                    if (o.animating && a.preventInteractionOnTransition) return !1;
                    const l = o.minTranslate(),
                        c = o.maxTranslate();
                    let d;
                    if (((d = n && e > l ? l : n && e < c ? c : e), o.updateProgress(d), a.cssMode)) {
                        const e = o.isHorizontal();
                        if (0 === t) r[e ? "scrollLeft" : "scrollTop"] = -d;
                        else {
                            if (!o.support.smoothScroll)
                                return Wt({ swiper: o, targetPosition: -d, side: e ? "left" : "top" }), !0;
                            r.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
                        }
                        return !0;
                    }
                    return (
                        0 === t
                            ? (o.setTransition(0),
                              o.setTranslate(d),
                              i && (o.emit("beforeTransitionStart", t, s), o.emit("transitionEnd")))
                            : (o.setTransition(t),
                              o.setTranslate(d),
                              i && (o.emit("beforeTransitionStart", t, s), o.emit("transitionStart")),
                              o.animating ||
                                  ((o.animating = !0),
                                  o.onTranslateToWrapperTransitionEnd ||
                                      (o.onTranslateToWrapperTransitionEnd = function (e) {
                                          o &&
                                              !o.destroyed &&
                                              e.target === this &&
                                              (o.wrapperEl.removeEventListener(
                                                  "transitionend",
                                                  o.onTranslateToWrapperTransitionEnd
                                              ),
                                              (o.onTranslateToWrapperTransitionEnd = null),
                                              delete o.onTranslateToWrapperTransitionEnd,
                                              (o.animating = !1),
                                              i && o.emit("transitionEnd"));
                                      }),
                                  o.wrapperEl.addEventListener("transitionend", o.onTranslateToWrapperTransitionEnd))),
                        !0
                    );
                },
            },
            transition: {
                setTransition: function (e, t) {
                    const i = this;
                    i.params.cssMode ||
                        ((i.wrapperEl.style.transitionDuration = `${e}ms`),
                        (i.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
                        i.emit("setTransition", e, t);
                },
                transitionStart: function (e, t) {
                    void 0 === e && (e = !0);
                    const i = this,
                        { params: n } = i;
                    n.cssMode ||
                        (n.autoHeight && i.updateAutoHeight(),
                        pi({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
                },
                transitionEnd: function (e, t) {
                    void 0 === e && (e = !0);
                    const { params: i } = this;
                    (this.animating = !1),
                        i.cssMode ||
                            (this.setTransition(0), pi({ swiper: this, runCallbacks: e, direction: t, step: "End" }));
                },
            },
            slide: {
                slideTo: function (e, t, i, n, s) {
                    void 0 === e && (e = 0), void 0 === i && (i = !0), "string" == typeof e && (e = parseInt(e, 10));
                    const o = this;
                    let a = e;
                    a < 0 && (a = 0);
                    const {
                        params: r,
                        snapGrid: l,
                        slidesGrid: c,
                        previousIndex: d,
                        activeIndex: u,
                        rtlTranslate: h,
                        wrapperEl: p,
                        enabled: f,
                    } = o;
                    if ((!f && !n && !s) || o.destroyed || (o.animating && r.preventInteractionOnTransition)) return !1;
                    void 0 === t && (t = o.params.speed);
                    const m = Math.min(o.params.slidesPerGroupSkip, a);
                    let g = m + Math.floor((a - m) / o.params.slidesPerGroup);
                    g >= l.length && (g = l.length - 1);
                    const v = -l[g];
                    if (r.normalizeSlideIndex)
                        for (let e = 0; e < c.length; e += 1) {
                            const t = -Math.floor(100 * v),
                                i = Math.floor(100 * c[e]),
                                n = Math.floor(100 * c[e + 1]);
                            void 0 !== c[e + 1]
                                ? t >= i && t < n - (n - i) / 2
                                    ? (a = e)
                                    : t >= i && t < n && (a = e + 1)
                                : t >= i && (a = e);
                        }
                    if (o.initialized && a !== u) {
                        if (
                            !o.allowSlideNext &&
                            (h ? v > o.translate && v > o.minTranslate() : v < o.translate && v < o.minTranslate())
                        )
                            return !1;
                        if (!o.allowSlidePrev && v > o.translate && v > o.maxTranslate() && (u || 0) !== a) return !1;
                    }
                    let b;
                    a !== (d || 0) && i && o.emit("beforeSlideChangeStart"),
                        o.updateProgress(v),
                        (b = a > u ? "next" : a < u ? "prev" : "reset");
                    const y = o.virtual && o.params.virtual.enabled;
                    if ((!y || !s) && ((h && -v === o.translate) || (!h && v === o.translate)))
                        return (
                            o.updateActiveIndex(a),
                            r.autoHeight && o.updateAutoHeight(),
                            o.updateSlidesClasses(),
                            "slide" !== r.effect && o.setTranslate(v),
                            "reset" !== b && (o.transitionStart(i, b), o.transitionEnd(i, b)),
                            !1
                        );
                    if (r.cssMode) {
                        const e = o.isHorizontal(),
                            i = h ? v : -v;
                        if (0 === t)
                            y && ((o.wrapperEl.style.scrollSnapType = "none"), (o._immediateVirtual = !0)),
                                y && !o._cssModeVirtualInitialSet && o.params.initialSlide > 0
                                    ? ((o._cssModeVirtualInitialSet = !0),
                                      requestAnimationFrame(() => {
                                          p[e ? "scrollLeft" : "scrollTop"] = i;
                                      }))
                                    : (p[e ? "scrollLeft" : "scrollTop"] = i),
                                y &&
                                    requestAnimationFrame(() => {
                                        (o.wrapperEl.style.scrollSnapType = ""), (o._immediateVirtual = !1);
                                    });
                        else {
                            if (!o.support.smoothScroll)
                                return Wt({ swiper: o, targetPosition: i, side: e ? "left" : "top" }), !0;
                            p.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
                        }
                        return !0;
                    }
                    return (
                        o.setTransition(t),
                        o.setTranslate(v),
                        o.updateActiveIndex(a),
                        o.updateSlidesClasses(),
                        o.emit("beforeTransitionStart", t, n),
                        o.transitionStart(i, b),
                        0 === t
                            ? o.transitionEnd(i, b)
                            : o.animating ||
                              ((o.animating = !0),
                              o.onSlideToWrapperTransitionEnd ||
                                  (o.onSlideToWrapperTransitionEnd = function (e) {
                                      o &&
                                          !o.destroyed &&
                                          e.target === this &&
                                          (o.wrapperEl.removeEventListener(
                                              "transitionend",
                                              o.onSlideToWrapperTransitionEnd
                                          ),
                                          (o.onSlideToWrapperTransitionEnd = null),
                                          delete o.onSlideToWrapperTransitionEnd,
                                          o.transitionEnd(i, b));
                                  }),
                              o.wrapperEl.addEventListener("transitionend", o.onSlideToWrapperTransitionEnd)),
                        !0
                    );
                },
                slideToLoop: function (e, t, i, n) {
                    void 0 === e && (e = 0), void 0 === i && (i = !0), "string" == typeof e && (e = parseInt(e, 10));
                    const s = this;
                    if (s.destroyed) return;
                    void 0 === t && (t = s.params.speed);
                    const o = s.grid && s.params.grid && s.params.grid.rows > 1;
                    let a = e;
                    if (s.params.loop)
                        if (s.virtual && s.params.virtual.enabled) a += s.virtual.slidesBefore;
                        else {
                            let e;
                            if (o) {
                                const t = a * s.params.grid.rows;
                                e = s.slides.filter((e) => 1 * e.getAttribute("data-swiper-slide-index") === t)[0]
                                    .column;
                            } else e = s.getSlideIndexByData(a);
                            const t = o ? Math.ceil(s.slides.length / s.params.grid.rows) : s.slides.length,
                                { centeredSlides: i } = s.params;
                            let r = s.params.slidesPerView;
                            "auto" === r
                                ? (r = s.slidesPerViewDynamic())
                                : ((r = Math.ceil(parseFloat(s.params.slidesPerView, 10))),
                                  i && r % 2 == 0 && (r += 1));
                            let l = t - e < r;
                            if (
                                (i && (l = l || e < Math.ceil(r / 2)),
                                n && i && "auto" !== s.params.slidesPerView && !o && (l = !1),
                                l)
                            ) {
                                const n = i
                                    ? e < s.activeIndex
                                        ? "prev"
                                        : "next"
                                    : e - s.activeIndex - 1 < s.params.slidesPerView
                                      ? "next"
                                      : "prev";
                                s.loopFix({
                                    direction: n,
                                    slideTo: !0,
                                    activeSlideIndex: "next" === n ? e + 1 : e - t + 1,
                                    slideRealIndex: "next" === n ? s.realIndex : void 0,
                                });
                            }
                            if (o) {
                                const e = a * s.params.grid.rows;
                                a = s.slides.filter((t) => 1 * t.getAttribute("data-swiper-slide-index") === e)[0]
                                    .column;
                            } else a = s.getSlideIndexByData(a);
                        }
                    return (
                        requestAnimationFrame(() => {
                            s.slideTo(a, t, i, n);
                        }),
                        s
                    );
                },
                slideNext: function (e, t, i) {
                    void 0 === t && (t = !0);
                    const n = this,
                        { enabled: s, params: o, animating: a } = n;
                    if (!s || n.destroyed) return n;
                    void 0 === e && (e = n.params.speed);
                    let r = o.slidesPerGroup;
                    "auto" === o.slidesPerView &&
                        1 === o.slidesPerGroup &&
                        o.slidesPerGroupAuto &&
                        (r = Math.max(n.slidesPerViewDynamic("current", !0), 1));
                    const l = n.activeIndex < o.slidesPerGroupSkip ? 1 : r,
                        c = n.virtual && o.virtual.enabled;
                    if (o.loop) {
                        if (a && !c && o.loopPreventsSliding) return !1;
                        if (
                            (n.loopFix({ direction: "next" }),
                            (n._clientLeft = n.wrapperEl.clientLeft),
                            n.activeIndex === n.slides.length - 1 && o.cssMode)
                        )
                            return (
                                requestAnimationFrame(() => {
                                    n.slideTo(n.activeIndex + l, e, t, i);
                                }),
                                !0
                            );
                    }
                    return o.rewind && n.isEnd ? n.slideTo(0, e, t, i) : n.slideTo(n.activeIndex + l, e, t, i);
                },
                slidePrev: function (e, t, i) {
                    void 0 === t && (t = !0);
                    const n = this,
                        { params: s, snapGrid: o, slidesGrid: a, rtlTranslate: r, enabled: l, animating: c } = n;
                    if (!l || n.destroyed) return n;
                    void 0 === e && (e = n.params.speed);
                    const d = n.virtual && s.virtual.enabled;
                    if (s.loop) {
                        if (c && !d && s.loopPreventsSliding) return !1;
                        n.loopFix({ direction: "prev" }), (n._clientLeft = n.wrapperEl.clientLeft);
                    }
                    function u(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
                    }
                    const h = u(r ? n.translate : -n.translate),
                        p = o.map((e) => u(e));
                    let f = o[p.indexOf(h) - 1];
                    if (void 0 === f && s.cssMode) {
                        let e;
                        o.forEach((t, i) => {
                            h >= t && (e = i);
                        }),
                            void 0 !== e && (f = o[e > 0 ? e - 1 : e]);
                    }
                    let m = 0;
                    if (
                        (void 0 !== f &&
                            ((m = a.indexOf(f)) < 0 && (m = n.activeIndex - 1),
                            "auto" === s.slidesPerView &&
                                1 === s.slidesPerGroup &&
                                s.slidesPerGroupAuto &&
                                ((m = m - n.slidesPerViewDynamic("previous", !0) + 1), (m = Math.max(m, 0)))),
                        s.rewind && n.isBeginning)
                    ) {
                        const s =
                            n.params.virtual && n.params.virtual.enabled && n.virtual
                                ? n.virtual.slides.length - 1
                                : n.slides.length - 1;
                        return n.slideTo(s, e, t, i);
                    }
                    return s.loop && 0 === n.activeIndex && s.cssMode
                        ? (requestAnimationFrame(() => {
                              n.slideTo(m, e, t, i);
                          }),
                          !0)
                        : n.slideTo(m, e, t, i);
                },
                slideReset: function (e, t, i) {
                    void 0 === t && (t = !0);
                    const n = this;
                    if (!n.destroyed) return void 0 === e && (e = n.params.speed), n.slideTo(n.activeIndex, e, t, i);
                },
                slideToClosest: function (e, t, i, n) {
                    void 0 === t && (t = !0), void 0 === n && (n = 0.5);
                    const s = this;
                    if (s.destroyed) return;
                    void 0 === e && (e = s.params.speed);
                    let o = s.activeIndex;
                    const a = Math.min(s.params.slidesPerGroupSkip, o),
                        r = a + Math.floor((o - a) / s.params.slidesPerGroup),
                        l = s.rtlTranslate ? s.translate : -s.translate;
                    if (l >= s.snapGrid[r]) {
                        const e = s.snapGrid[r];
                        l - e > (s.snapGrid[r + 1] - e) * n && (o += s.params.slidesPerGroup);
                    } else {
                        const e = s.snapGrid[r - 1];
                        l - e <= (s.snapGrid[r] - e) * n && (o -= s.params.slidesPerGroup);
                    }
                    return (o = Math.max(o, 0)), (o = Math.min(o, s.slidesGrid.length - 1)), s.slideTo(o, e, t, i);
                },
                slideToClickedSlide: function () {
                    const e = this;
                    if (e.destroyed) return;
                    const { params: t, slidesEl: i } = e,
                        n = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                    let s,
                        o = e.clickedIndex;
                    const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
                    if (t.loop) {
                        if (e.animating) return;
                        (s = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
                            t.centeredSlides
                                ? o < e.loopedSlides - n / 2 || o > e.slides.length - e.loopedSlides + n / 2
                                    ? (e.loopFix(),
                                      (o = e.getSlideIndex(Xt(i, `${a}[data-swiper-slide-index="${s}"]`)[0])),
                                      _t(() => {
                                          e.slideTo(o);
                                      }))
                                    : e.slideTo(o)
                                : o > e.slides.length - n
                                  ? (e.loopFix(),
                                    (o = e.getSlideIndex(Xt(i, `${a}[data-swiper-slide-index="${s}"]`)[0])),
                                    _t(() => {
                                        e.slideTo(o);
                                    }))
                                  : e.slideTo(o);
                    } else e.slideTo(o);
                },
            },
            loop: {
                loopCreate: function (e) {
                    const t = this,
                        { params: i, slidesEl: n } = t;
                    if (!i.loop || (t.virtual && t.params.virtual.enabled)) return;
                    const s = () => {
                            Xt(n, `.${i.slideClass}, swiper-slide`).forEach((e, t) => {
                                e.setAttribute("data-swiper-slide-index", t);
                            });
                        },
                        o = t.grid && i.grid && i.grid.rows > 1,
                        a = i.slidesPerGroup * (o ? i.grid.rows : 1),
                        r = t.slides.length % a != 0,
                        l = o && t.slides.length % i.grid.rows != 0,
                        c = (e) => {
                            for (let n = 0; n < e; n += 1) {
                                const e = t.isElement
                                    ? Ut("swiper-slide", [i.slideBlankClass])
                                    : Ut("div", [i.slideClass, i.slideBlankClass]);
                                t.slidesEl.append(e);
                            }
                        };
                    r
                        ? (i.loopAddBlankSlides
                              ? (c(a - (t.slides.length % a)), t.recalcSlides(), t.updateSlides())
                              : Yt(
                                    "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
                                ),
                          s())
                        : l
                          ? (i.loopAddBlankSlides
                                ? (c(i.grid.rows - (t.slides.length % i.grid.rows)), t.recalcSlides(), t.updateSlides())
                                : Yt(
                                      "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
                                  ),
                            s())
                          : s();
                    t.loopFix({ slideRealIndex: e, direction: i.centeredSlides ? void 0 : "next" });
                },
                loopFix: function (e) {
                    let {
                        slideRealIndex: t,
                        slideTo: i = !0,
                        direction: n,
                        setTranslate: s,
                        activeSlideIndex: o,
                        byController: a,
                        byMousewheel: r,
                    } = void 0 === e ? {} : e;
                    const l = this;
                    if (!l.params.loop) return;
                    l.emit("beforeLoopFix");
                    const { slides: c, allowSlidePrev: d, allowSlideNext: u, slidesEl: h, params: p } = l,
                        { centeredSlides: f } = p;
                    if (((l.allowSlidePrev = !0), (l.allowSlideNext = !0), l.virtual && p.virtual.enabled))
                        return (
                            i &&
                                (p.centeredSlides || 0 !== l.snapIndex
                                    ? p.centeredSlides && l.snapIndex < p.slidesPerView
                                        ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
                                        : l.snapIndex === l.snapGrid.length - 1 &&
                                          l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
                                    : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
                            (l.allowSlidePrev = d),
                            (l.allowSlideNext = u),
                            void l.emit("loopFix")
                        );
                    let m = p.slidesPerView;
                    "auto" === m
                        ? (m = l.slidesPerViewDynamic())
                        : ((m = Math.ceil(parseFloat(p.slidesPerView, 10))), f && m % 2 == 0 && (m += 1));
                    const g = p.slidesPerGroupAuto ? m : p.slidesPerGroup;
                    let v = g;
                    v % g != 0 && (v += g - (v % g)), (v += p.loopAdditionalSlides), (l.loopedSlides = v);
                    const b = l.grid && p.grid && p.grid.rows > 1;
                    c.length < m + v
                        ? Yt(
                              "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
                          )
                        : b &&
                          "row" === p.grid.fill &&
                          Yt("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
                    const y = [],
                        w = [];
                    let S = l.activeIndex;
                    void 0 === o
                        ? (o = l.getSlideIndex(c.filter((e) => e.classList.contains(p.slideActiveClass))[0]))
                        : (S = o);
                    const x = "next" === n || !n,
                        E = "prev" === n || !n;
                    let T = 0,
                        C = 0;
                    const M = b ? Math.ceil(c.length / p.grid.rows) : c.length,
                        P = (b ? c[o].column : o) + (f && void 0 === s ? -m / 2 + 0.5 : 0);
                    if (P < v) {
                        T = Math.max(v - P, g);
                        for (let e = 0; e < v - P; e += 1) {
                            const t = e - Math.floor(e / M) * M;
                            if (b) {
                                const e = M - t - 1;
                                for (let t = c.length - 1; t >= 0; t -= 1) c[t].column === e && y.push(t);
                            } else y.push(M - t - 1);
                        }
                    } else if (P + m > M - v) {
                        C = Math.max(P - (M - 2 * v), g);
                        for (let e = 0; e < C; e += 1) {
                            const t = e - Math.floor(e / M) * M;
                            b
                                ? c.forEach((e, i) => {
                                      e.column === t && w.push(i);
                                  })
                                : w.push(t);
                        }
                    }
                    if (
                        ((l.__preventObserver__ = !0),
                        requestAnimationFrame(() => {
                            l.__preventObserver__ = !1;
                        }),
                        E &&
                            y.forEach((e) => {
                                (c[e].swiperLoopMoveDOM = !0), h.prepend(c[e]), (c[e].swiperLoopMoveDOM = !1);
                            }),
                        x &&
                            w.forEach((e) => {
                                (c[e].swiperLoopMoveDOM = !0), h.append(c[e]), (c[e].swiperLoopMoveDOM = !1);
                            }),
                        l.recalcSlides(),
                        "auto" === p.slidesPerView
                            ? l.updateSlides()
                            : b &&
                              ((y.length > 0 && E) || (w.length > 0 && x)) &&
                              l.slides.forEach((e, t) => {
                                  l.grid.updateSlide(t, e, l.slides);
                              }),
                        p.watchSlidesProgress && l.updateSlidesOffset(),
                        i)
                    )
                        if (y.length > 0 && E) {
                            if (void 0 === t) {
                                const e = l.slidesGrid[S],
                                    t = l.slidesGrid[S + T] - e;
                                r
                                    ? l.setTranslate(l.translate - t)
                                    : (l.slideTo(S + Math.ceil(T), 0, !1, !0),
                                      s &&
                                          ((l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t),
                                          (l.touchEventsData.currentTranslate =
                                              l.touchEventsData.currentTranslate - t)));
                            } else if (s) {
                                const e = b ? y.length / p.grid.rows : y.length;
                                l.slideTo(l.activeIndex + e, 0, !1, !0),
                                    (l.touchEventsData.currentTranslate = l.translate);
                            }
                        } else if (w.length > 0 && x)
                            if (void 0 === t) {
                                const e = l.slidesGrid[S],
                                    t = l.slidesGrid[S - C] - e;
                                r
                                    ? l.setTranslate(l.translate - t)
                                    : (l.slideTo(S - C, 0, !1, !0),
                                      s &&
                                          ((l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t),
                                          (l.touchEventsData.currentTranslate =
                                              l.touchEventsData.currentTranslate - t)));
                            } else {
                                const e = b ? w.length / p.grid.rows : w.length;
                                l.slideTo(l.activeIndex - e, 0, !1, !0);
                            }
                    if (((l.allowSlidePrev = d), (l.allowSlideNext = u), l.controller && l.controller.control && !a)) {
                        const e = {
                            slideRealIndex: t,
                            direction: n,
                            setTranslate: s,
                            activeSlideIndex: o,
                            byController: !0,
                        };
                        Array.isArray(l.controller.control)
                            ? l.controller.control.forEach((t) => {
                                  !t.destroyed &&
                                      t.params.loop &&
                                      t.loopFix({ ...e, slideTo: t.params.slidesPerView === p.slidesPerView && i });
                              })
                            : l.controller.control instanceof l.constructor &&
                              l.controller.control.params.loop &&
                              l.controller.control.loopFix({
                                  ...e,
                                  slideTo: l.controller.control.params.slidesPerView === p.slidesPerView && i,
                              });
                    }
                    l.emit("loopFix");
                },
                loopDestroy: function () {
                    const { params: e, slidesEl: t } = this;
                    if (!e.loop || (this.virtual && this.params.virtual.enabled)) return;
                    this.recalcSlides();
                    const i = [];
                    this.slides.forEach((e) => {
                        const t =
                            void 0 === e.swiperSlideIndex
                                ? 1 * e.getAttribute("data-swiper-slide-index")
                                : e.swiperSlideIndex;
                        i[t] = e;
                    }),
                        this.slides.forEach((e) => {
                            e.removeAttribute("data-swiper-slide-index");
                        }),
                        i.forEach((e) => {
                            t.append(e);
                        }),
                        this.recalcSlides(),
                        this.slideTo(this.realIndex, 0);
                },
            },
            grabCursor: {
                setGrabCursor: function (e) {
                    const t = this;
                    if (!t.params.simulateTouch || (t.params.watchOverflow && t.isLocked) || t.params.cssMode) return;
                    const i = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                    t.isElement && (t.__preventObserver__ = !0),
                        (i.style.cursor = "move"),
                        (i.style.cursor = e ? "grabbing" : "grab"),
                        t.isElement &&
                            requestAnimationFrame(() => {
                                t.__preventObserver__ = !1;
                            });
                },
                unsetGrabCursor: function () {
                    const e = this;
                    (e.params.watchOverflow && e.isLocked) ||
                        e.params.cssMode ||
                        (e.isElement && (e.__preventObserver__ = !0),
                        (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = ""),
                        e.isElement &&
                            requestAnimationFrame(() => {
                                e.__preventObserver__ = !1;
                            }));
                },
            },
            events: {
                attachEvents: function () {
                    const e = this,
                        { params: t } = e;
                    (e.onTouchStart = mi.bind(e)),
                        (e.onTouchMove = function (e) {
                            const t = Dt(),
                                i = this,
                                n = i.touchEventsData,
                                { params: s, touches: o, rtlTranslate: a, enabled: r } = i;
                            if (!r) return;
                            if (!s.simulateTouch && "mouse" === e.pointerType) return;
                            let l,
                                c = e;
                            if ((c.originalEvent && (c = c.originalEvent), "pointermove" === c.type)) {
                                if (null !== n.touchId) return;
                                if (c.pointerId !== n.pointerId) return;
                            }
                            if ("touchmove" === c.type) {
                                if (
                                    !(l = [...c.changedTouches].filter((e) => e.identifier === n.touchId)[0]) ||
                                    l.identifier !== n.touchId
                                )
                                    return;
                            } else l = c;
                            if (!n.isTouched)
                                return void (n.startMoving && n.isScrolling && i.emit("touchMoveOpposite", c));
                            const d = l.pageX,
                                u = l.pageY;
                            if (c.preventedByNestedSwiper) return (o.startX = d), void (o.startY = u);
                            if (!i.allowTouchMove)
                                return (
                                    c.target.matches(n.focusableElements) || (i.allowClick = !1),
                                    void (
                                        n.isTouched &&
                                        (Object.assign(o, { startX: d, startY: u, currentX: d, currentY: u }),
                                        (n.touchStartTime = Bt()))
                                    )
                                );
                            if (s.touchReleaseOnEdges && !s.loop)
                                if (i.isVertical()) {
                                    if (
                                        (u < o.startY && i.translate <= i.maxTranslate()) ||
                                        (u > o.startY && i.translate >= i.minTranslate())
                                    )
                                        return (n.isTouched = !1), void (n.isMoved = !1);
                                } else if (
                                    (d < o.startX && i.translate <= i.maxTranslate()) ||
                                    (d > o.startX && i.translate >= i.minTranslate())
                                )
                                    return;
                            if (
                                (t.activeElement &&
                                    t.activeElement.matches(n.focusableElements) &&
                                    t.activeElement !== c.target &&
                                    "mouse" !== c.pointerType &&
                                    t.activeElement.blur(),
                                t.activeElement &&
                                    c.target === t.activeElement &&
                                    c.target.matches(n.focusableElements))
                            )
                                return (n.isMoved = !0), void (i.allowClick = !1);
                            n.allowTouchCallbacks && i.emit("touchMove", c),
                                (o.previousX = o.currentX),
                                (o.previousY = o.currentY),
                                (o.currentX = d),
                                (o.currentY = u);
                            const h = o.currentX - o.startX,
                                p = o.currentY - o.startY;
                            if (i.params.threshold && Math.sqrt(h ** 2 + p ** 2) < i.params.threshold) return;
                            if (void 0 === n.isScrolling) {
                                let e;
                                (i.isHorizontal() && o.currentY === o.startY) ||
                                (i.isVertical() && o.currentX === o.startX)
                                    ? (n.isScrolling = !1)
                                    : h * h + p * p >= 25 &&
                                      ((e = (180 * Math.atan2(Math.abs(p), Math.abs(h))) / Math.PI),
                                      (n.isScrolling = i.isHorizontal() ? e > s.touchAngle : 90 - e > s.touchAngle));
                            }
                            if (
                                (n.isScrolling && i.emit("touchMoveOpposite", c),
                                void 0 === n.startMoving &&
                                    ((o.currentX === o.startX && o.currentY === o.startY) || (n.startMoving = !0)),
                                n.isScrolling || ("touchmove" === c.type && n.preventTouchMoveFromPointerMove))
                            )
                                return void (n.isTouched = !1);
                            if (!n.startMoving) return;
                            (i.allowClick = !1),
                                !s.cssMode && c.cancelable && c.preventDefault(),
                                s.touchMoveStopPropagation && !s.nested && c.stopPropagation();
                            let f = i.isHorizontal() ? h : p,
                                m = i.isHorizontal() ? o.currentX - o.previousX : o.currentY - o.previousY;
                            s.oneWayMovement && ((f = Math.abs(f) * (a ? 1 : -1)), (m = Math.abs(m) * (a ? 1 : -1))),
                                (o.diff = f),
                                (f *= s.touchRatio),
                                a && ((f = -f), (m = -m));
                            const g = i.touchesDirection;
                            (i.swipeDirection = f > 0 ? "prev" : "next"),
                                (i.touchesDirection = m > 0 ? "prev" : "next");
                            const v = i.params.loop && !s.cssMode,
                                b =
                                    ("next" === i.touchesDirection && i.allowSlideNext) ||
                                    ("prev" === i.touchesDirection && i.allowSlidePrev);
                            if (!n.isMoved) {
                                if (
                                    (v && b && i.loopFix({ direction: i.swipeDirection }),
                                    (n.startTranslate = i.getTranslate()),
                                    i.setTransition(0),
                                    i.animating)
                                ) {
                                    const e = new window.CustomEvent("transitionend", {
                                        bubbles: !0,
                                        cancelable: !0,
                                        detail: { bySwiperTouchMove: !0 },
                                    });
                                    i.wrapperEl.dispatchEvent(e);
                                }
                                (n.allowMomentumBounce = !1),
                                    !s.grabCursor ||
                                        (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
                                        i.setGrabCursor(!0),
                                    i.emit("sliderFirstMove", c);
                            }
                            if (
                                (new Date().getTime(),
                                n.isMoved &&
                                    n.allowThresholdMove &&
                                    g !== i.touchesDirection &&
                                    v &&
                                    b &&
                                    Math.abs(f) >= 1)
                            )
                                return (
                                    Object.assign(o, {
                                        startX: d,
                                        startY: u,
                                        currentX: d,
                                        currentY: u,
                                        startTranslate: n.currentTranslate,
                                    }),
                                    (n.loopSwapReset = !0),
                                    void (n.startTranslate = n.currentTranslate)
                                );
                            i.emit("sliderMove", c), (n.isMoved = !0), (n.currentTranslate = f + n.startTranslate);
                            let y = !0,
                                w = s.resistanceRatio;
                            if (
                                (s.touchReleaseOnEdges && (w = 0),
                                f > 0
                                    ? (v &&
                                          b &&
                                          n.allowThresholdMove &&
                                          n.currentTranslate >
                                              (s.centeredSlides
                                                  ? i.minTranslate() -
                                                    i.slidesSizesGrid[i.activeIndex + 1] -
                                                    ("auto" !== s.slidesPerView &&
                                                    i.slides.length - s.slidesPerView >= 2
                                                        ? i.slidesSizesGrid[i.activeIndex + 1] + i.params.spaceBetween
                                                        : 0) -
                                                    i.params.spaceBetween
                                                  : i.minTranslate()) &&
                                          i.loopFix({ direction: "prev", setTranslate: !0, activeSlideIndex: 0 }),
                                      n.currentTranslate > i.minTranslate() &&
                                          ((y = !1),
                                          s.resistance &&
                                              (n.currentTranslate =
                                                  i.minTranslate() -
                                                  1 +
                                                  (-i.minTranslate() + n.startTranslate + f) ** w)))
                                    : f < 0 &&
                                      (v &&
                                          b &&
                                          n.allowThresholdMove &&
                                          n.currentTranslate <
                                              (s.centeredSlides
                                                  ? i.maxTranslate() +
                                                    i.slidesSizesGrid[i.slidesSizesGrid.length - 1] +
                                                    i.params.spaceBetween +
                                                    ("auto" !== s.slidesPerView &&
                                                    i.slides.length - s.slidesPerView >= 2
                                                        ? i.slidesSizesGrid[i.slidesSizesGrid.length - 1] +
                                                          i.params.spaceBetween
                                                        : 0)
                                                  : i.maxTranslate()) &&
                                          i.loopFix({
                                              direction: "next",
                                              setTranslate: !0,
                                              activeSlideIndex:
                                                  i.slides.length -
                                                  ("auto" === s.slidesPerView
                                                      ? i.slidesPerViewDynamic()
                                                      : Math.ceil(parseFloat(s.slidesPerView, 10))),
                                          }),
                                      n.currentTranslate < i.maxTranslate() &&
                                          ((y = !1),
                                          s.resistance &&
                                              (n.currentTranslate =
                                                  i.maxTranslate() +
                                                  1 -
                                                  (i.maxTranslate() - n.startTranslate - f) ** w))),
                                y && (c.preventedByNestedSwiper = !0),
                                !i.allowSlideNext &&
                                    "next" === i.swipeDirection &&
                                    n.currentTranslate < n.startTranslate &&
                                    (n.currentTranslate = n.startTranslate),
                                !i.allowSlidePrev &&
                                    "prev" === i.swipeDirection &&
                                    n.currentTranslate > n.startTranslate &&
                                    (n.currentTranslate = n.startTranslate),
                                i.allowSlidePrev || i.allowSlideNext || (n.currentTranslate = n.startTranslate),
                                s.threshold > 0)
                            ) {
                                if (!(Math.abs(f) > s.threshold || n.allowThresholdMove))
                                    return void (n.currentTranslate = n.startTranslate);
                                if (!n.allowThresholdMove)
                                    return (
                                        (n.allowThresholdMove = !0),
                                        (o.startX = o.currentX),
                                        (o.startY = o.currentY),
                                        (n.currentTranslate = n.startTranslate),
                                        void (o.diff = i.isHorizontal() ? o.currentX - o.startX : o.currentY - o.startY)
                                    );
                            }
                            s.followFinger &&
                                !s.cssMode &&
                                (((s.freeMode && s.freeMode.enabled && i.freeMode) || s.watchSlidesProgress) &&
                                    (i.updateActiveIndex(), i.updateSlidesClasses()),
                                s.freeMode && s.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(),
                                i.updateProgress(n.currentTranslate),
                                i.setTranslate(n.currentTranslate));
                        }.bind(e)),
                        (e.onTouchEnd = function (e) {
                            const t = this,
                                i = t.touchEventsData;
                            let n,
                                s = e;
                            if (
                                (s.originalEvent && (s = s.originalEvent),
                                "touchend" === s.type || "touchcancel" === s.type)
                            ) {
                                if (
                                    !(n = [...s.changedTouches].filter((e) => e.identifier === i.touchId)[0]) ||
                                    n.identifier !== i.touchId
                                )
                                    return;
                            } else {
                                if (null !== i.touchId) return;
                                if (s.pointerId !== i.pointerId) return;
                                n = s;
                            }
                            if (
                                ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(s.type) &&
                                (!["pointercancel", "contextmenu"].includes(s.type) ||
                                    (!t.browser.isSafari && !t.browser.isWebView))
                            )
                                return;
                            (i.pointerId = null), (i.touchId = null);
                            const { params: o, touches: a, rtlTranslate: r, slidesGrid: l, enabled: c } = t;
                            if (!c) return;
                            if (!o.simulateTouch && "mouse" === s.pointerType) return;
                            if (
                                (i.allowTouchCallbacks && t.emit("touchEnd", s),
                                (i.allowTouchCallbacks = !1),
                                !i.isTouched)
                            )
                                return (
                                    i.isMoved && o.grabCursor && t.setGrabCursor(!1),
                                    (i.isMoved = !1),
                                    void (i.startMoving = !1)
                                );
                            o.grabCursor &&
                                i.isMoved &&
                                i.isTouched &&
                                (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
                                t.setGrabCursor(!1);
                            const d = Bt(),
                                u = d - i.touchStartTime;
                            if (t.allowClick) {
                                const e = s.path || (s.composedPath && s.composedPath());
                                t.updateClickedSlide((e && e[0]) || s.target, e),
                                    t.emit("tap click", s),
                                    u < 300 && d - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", s);
                            }
                            if (
                                ((i.lastClickTime = Bt()),
                                _t(() => {
                                    t.destroyed || (t.allowClick = !0);
                                }),
                                !i.isTouched ||
                                    !i.isMoved ||
                                    !t.swipeDirection ||
                                    (0 === a.diff && !i.loopSwapReset) ||
                                    (i.currentTranslate === i.startTranslate && !i.loopSwapReset))
                            )
                                return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
                            let h;
                            if (
                                ((i.isTouched = !1),
                                (i.isMoved = !1),
                                (i.startMoving = !1),
                                (h = o.followFinger ? (r ? t.translate : -t.translate) : -i.currentTranslate),
                                o.cssMode)
                            )
                                return;
                            if (o.freeMode && o.freeMode.enabled) return void t.freeMode.onTouchEnd({ currentPos: h });
                            const p = h >= -t.maxTranslate() && !t.params.loop;
                            let f = 0,
                                m = t.slidesSizesGrid[0];
                            for (let e = 0; e < l.length; e += e < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
                                const t = e < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
                                void 0 !== l[e + t]
                                    ? (p || (h >= l[e] && h < l[e + t])) && ((f = e), (m = l[e + t] - l[e]))
                                    : (p || h >= l[e]) && ((f = e), (m = l[l.length - 1] - l[l.length - 2]));
                            }
                            let g = null,
                                v = null;
                            o.rewind &&
                                (t.isBeginning
                                    ? (v =
                                          o.virtual && o.virtual.enabled && t.virtual
                                              ? t.virtual.slides.length - 1
                                              : t.slides.length - 1)
                                    : t.isEnd && (g = 0));
                            const b = (h - l[f]) / m,
                                y = f < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
                            if (u > o.longSwipesMs) {
                                if (!o.longSwipes) return void t.slideTo(t.activeIndex);
                                "next" === t.swipeDirection &&
                                    (b >= o.longSwipesRatio
                                        ? t.slideTo(o.rewind && t.isEnd ? g : f + y)
                                        : t.slideTo(f)),
                                    "prev" === t.swipeDirection &&
                                        (b > 1 - o.longSwipesRatio
                                            ? t.slideTo(f + y)
                                            : null !== v && b < 0 && Math.abs(b) > o.longSwipesRatio
                                              ? t.slideTo(v)
                                              : t.slideTo(f));
                            } else {
                                if (!o.shortSwipes) return void t.slideTo(t.activeIndex);
                                !t.navigation || (s.target !== t.navigation.nextEl && s.target !== t.navigation.prevEl)
                                    ? ("next" === t.swipeDirection && t.slideTo(null !== g ? g : f + y),
                                      "prev" === t.swipeDirection && t.slideTo(null !== v ? v : f))
                                    : s.target === t.navigation.nextEl
                                      ? t.slideTo(f + y)
                                      : t.slideTo(f);
                            }
                        }.bind(e)),
                        (e.onDocumentTouchStart = function () {
                            const e = this;
                            e.documentTouchHandlerProceeded ||
                                ((e.documentTouchHandlerProceeded = !0),
                                e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
                        }.bind(e)),
                        t.cssMode &&
                            (e.onScroll = function () {
                                const e = this,
                                    { wrapperEl: t, rtlTranslate: i, enabled: n } = e;
                                if (!n) return;
                                let s;
                                (e.previousTranslate = e.translate),
                                    e.isHorizontal() ? (e.translate = -t.scrollLeft) : (e.translate = -t.scrollTop),
                                    0 === e.translate && (e.translate = 0),
                                    e.updateActiveIndex(),
                                    e.updateSlidesClasses();
                                const o = e.maxTranslate() - e.minTranslate();
                                (s = 0 === o ? 0 : (e.translate - e.minTranslate()) / o) !== e.progress &&
                                    e.updateProgress(i ? -e.translate : e.translate),
                                    e.emit("setTranslate", e.translate, !1);
                            }.bind(e)),
                        (e.onClick = function (e) {
                            const t = this;
                            t.enabled &&
                                (t.allowClick ||
                                    (t.params.preventClicks && e.preventDefault(),
                                    t.params.preventClicksPropagation &&
                                        t.animating &&
                                        (e.stopPropagation(), e.stopImmediatePropagation())));
                        }.bind(e)),
                        (e.onLoad = function (e) {
                            di(this, e.target),
                                this.params.cssMode ||
                                    ("auto" !== this.params.slidesPerView && !this.params.autoHeight) ||
                                    this.update();
                        }.bind(e)),
                        vi(e, "on");
                },
                detachEvents: function () {
                    vi(this, "off");
                },
            },
            breakpoints: {
                setBreakpoint: function () {
                    const e = this,
                        { realIndex: t, initialized: i, params: n, el: s } = e,
                        o = n.breakpoints;
                    if (!o || (o && 0 === Object.keys(o).length)) return;
                    const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
                    if (!a || e.currentBreakpoint === a) return;
                    const r = (a in o ? o[a] : void 0) || e.originalParams,
                        l = bi(e, n),
                        c = bi(e, r),
                        d = e.params.grabCursor,
                        u = r.grabCursor,
                        h = n.enabled;
                    l && !c
                        ? (s.classList.remove(
                              `${n.containerModifierClass}grid`,
                              `${n.containerModifierClass}grid-column`
                          ),
                          e.emitContainerClasses())
                        : !l &&
                          c &&
                          (s.classList.add(`${n.containerModifierClass}grid`),
                          ((r.grid.fill && "column" === r.grid.fill) || (!r.grid.fill && "column" === n.grid.fill)) &&
                              s.classList.add(`${n.containerModifierClass}grid-column`),
                          e.emitContainerClasses()),
                        d && !u ? e.unsetGrabCursor() : !d && u && e.setGrabCursor(),
                        ["navigation", "pagination", "scrollbar"].forEach((t) => {
                            if (void 0 === r[t]) return;
                            const i = n[t] && n[t].enabled,
                                s = r[t] && r[t].enabled;
                            i && !s && e[t].disable(), !i && s && e[t].enable();
                        });
                    const p = r.direction && r.direction !== n.direction,
                        f = n.loop && (r.slidesPerView !== n.slidesPerView || p),
                        m = n.loop;
                    p && i && e.changeDirection(), Vt(e.params, r);
                    const g = e.params.enabled,
                        v = e.params.loop;
                    Object.assign(e, {
                        allowTouchMove: e.params.allowTouchMove,
                        allowSlideNext: e.params.allowSlideNext,
                        allowSlidePrev: e.params.allowSlidePrev,
                    }),
                        h && !g ? e.disable() : !h && g && e.enable(),
                        (e.currentBreakpoint = a),
                        e.emit("_beforeBreakpoint", r),
                        i &&
                            (f
                                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                                : !m && v
                                  ? (e.loopCreate(t), e.updateSlides())
                                  : m && !v && e.loopDestroy()),
                        e.emit("breakpoint", r);
                },
                getBreakpoint: function (e, t, i) {
                    if ((void 0 === t && (t = "window"), !e || ("container" === t && !i))) return;
                    let n = !1;
                    const s = Rt(),
                        o = "window" === t ? s.innerHeight : i.clientHeight,
                        a = Object.keys(e).map((e) => {
                            if ("string" == typeof e && 0 === e.indexOf("@")) {
                                const t = parseFloat(e.substr(1));
                                return { value: o * t, point: e };
                            }
                            return { value: e, point: e };
                        });
                    a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                    for (let e = 0; e < a.length; e += 1) {
                        const { point: o, value: r } = a[e];
                        "window" === t
                            ? s.matchMedia(`(min-width: ${r}px)`).matches && (n = o)
                            : r <= i.clientWidth && (n = o);
                    }
                    return n || "max";
                },
            },
            checkOverflow: {
                checkOverflow: function () {
                    const e = this,
                        { isLocked: t, params: i } = e,
                        { slidesOffsetBefore: n } = i;
                    if (n) {
                        const t = e.slides.length - 1,
                            i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
                        e.isLocked = e.size > i;
                    } else e.isLocked = 1 === e.snapGrid.length;
                    !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                        !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                        t && t !== e.isLocked && (e.isEnd = !1),
                        t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
                },
            },
            classes: {
                addClasses: function () {
                    const { classNames: e, params: t, rtl: i, el: n, device: s } = this,
                        o = (function (e, t) {
                            const i = [];
                            return (
                                e.forEach((e) => {
                                    "object" == typeof e
                                        ? Object.keys(e).forEach((n) => {
                                              e[n] && i.push(t + n);
                                          })
                                        : "string" == typeof e && i.push(t + e);
                                }),
                                i
                            );
                        })(
                            [
                                "initialized",
                                t.direction,
                                { "free-mode": this.params.freeMode && t.freeMode.enabled },
                                { autoheight: t.autoHeight },
                                { rtl: i },
                                { grid: t.grid && t.grid.rows > 1 },
                                { "grid-column": t.grid && t.grid.rows > 1 && "column" === t.grid.fill },
                                { android: s.android },
                                { ios: s.ios },
                                { "css-mode": t.cssMode },
                                { centered: t.cssMode && t.centeredSlides },
                                { "watch-progress": t.watchSlidesProgress },
                            ],
                            t.containerModifierClass
                        );
                    e.push(...o), n.classList.add(...e), this.emitContainerClasses();
                },
                removeClasses: function () {
                    const { el: e, classNames: t } = this;
                    e && "string" != typeof e && (e.classList.remove(...t), this.emitContainerClasses());
                },
            },
        },
        xi = {};
    class Ei {
        constructor() {
            let e, t;
            for (var i = arguments.length, n = new Array(i), s = 0; s < i; s++) n[s] = arguments[s];
            1 === n.length && n[0].constructor && "Object" === Object.prototype.toString.call(n[0]).slice(8, -1)
                ? (t = n[0])
                : ([e, t] = n),
                t || (t = {}),
                (t = Vt({}, t)),
                e && !t.el && (t.el = e);
            const o = Dt();
            if (t.el && "string" == typeof t.el && o.querySelectorAll(t.el).length > 1) {
                const e = [];
                return (
                    o.querySelectorAll(t.el).forEach((i) => {
                        const n = Vt({}, t, { el: i });
                        e.push(new Ei(n));
                    }),
                    e
                );
            }
            const a = this;
            (a.__swiper__ = !0),
                (a.support = si()),
                (a.device = oi({ userAgent: t.userAgent })),
                (a.browser = ai()),
                (a.eventsListeners = {}),
                (a.eventsAnyListeners = []),
                (a.modules = [...a.__modules__]),
                t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
            const r = {};
            a.modules.forEach((e) => {
                e({
                    params: t,
                    swiper: a,
                    extendParams: wi(t, r),
                    on: a.on.bind(a),
                    once: a.once.bind(a),
                    off: a.off.bind(a),
                    emit: a.emit.bind(a),
                });
            });
            const l = Vt({}, yi, r);
            return (
                (a.params = Vt({}, l, xi, t)),
                (a.originalParams = Vt({}, a.params)),
                (a.passedParams = Vt({}, t)),
                a.params &&
                    a.params.on &&
                    Object.keys(a.params.on).forEach((e) => {
                        a.on(e, a.params.on[e]);
                    }),
                a.params && a.params.onAny && a.onAny(a.params.onAny),
                Object.assign(a, {
                    enabled: a.params.enabled,
                    el: e,
                    classNames: [],
                    slides: [],
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: () => "horizontal" === a.params.direction,
                    isVertical: () => "vertical" === a.params.direction,
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
                        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                    },
                    allowSlideNext: a.params.allowSlideNext,
                    allowSlidePrev: a.params.allowSlidePrev,
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: a.params.focusableElements,
                        lastClickTime: 0,
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        startMoving: void 0,
                        pointerId: null,
                        touchId: null,
                    },
                    allowClick: !0,
                    allowTouchMove: a.params.allowTouchMove,
                    touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
                    imagesToLoad: [],
                    imagesLoaded: 0,
                }),
                a.emit("_swiper"),
                a.params.init && a.init(),
                a
            );
        }
        getDirectionLabel(e) {
            return this.isHorizontal()
                ? e
                : {
                      width: "height",
                      "margin-top": "margin-left",
                      "margin-bottom ": "margin-right",
                      "margin-left": "margin-top",
                      "margin-right": "margin-bottom",
                      "padding-left": "padding-top",
                      "padding-right": "padding-bottom",
                      marginRight: "marginBottom",
                  }[e];
        }
        getSlideIndex(e) {
            const { slidesEl: t, params: i } = this,
                n = Kt(Xt(t, `.${i.slideClass}, swiper-slide`)[0]);
            return Kt(e) - n;
        }
        getSlideIndexByData(e) {
            return this.getSlideIndex(
                this.slides.filter((t) => 1 * t.getAttribute("data-swiper-slide-index") === e)[0]
            );
        }
        recalcSlides() {
            const { slidesEl: e, params: t } = this;
            this.slides = Xt(e, `.${t.slideClass}, swiper-slide`);
        }
        enable() {
            const e = this;
            e.enabled || ((e.enabled = !0), e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
        }
        disable() {
            const e = this;
            e.enabled && ((e.enabled = !1), e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
        }
        setProgress(e, t) {
            e = Math.min(Math.max(e, 0), 1);
            const i = this.minTranslate(),
                n = (this.maxTranslate() - i) * e + i;
            this.translateTo(n, void 0 === t ? 0 : t), this.updateActiveIndex(), this.updateSlidesClasses();
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = e.el.className
                .split(" ")
                .filter((t) => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
            e.emit("_containerClasses", t.join(" "));
        }
        getSlideClasses(e) {
            const t = this;
            return t.destroyed
                ? ""
                : e.className
                      .split(" ")
                      .filter((e) => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))
                      .join(" ");
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = [];
            e.slides.forEach((i) => {
                const n = e.getSlideClasses(i);
                t.push({ slideEl: i, classNames: n }), e.emit("_slideClass", i, n);
            }),
                e.emit("_slideClasses", t);
        }
        slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"), void 0 === t && (t = !1);
            const { params: i, slides: n, slidesGrid: s, slidesSizesGrid: o, size: a, activeIndex: r } = this;
            let l = 1;
            if ("number" == typeof i.slidesPerView) return i.slidesPerView;
            if (i.centeredSlides) {
                let e,
                    t = n[r] ? Math.ceil(n[r].swiperSlideSize) : 0;
                for (let i = r + 1; i < n.length; i += 1)
                    n[i] && !e && ((l += 1), (t += Math.ceil(n[i].swiperSlideSize)) > a && (e = !0));
                for (let i = r - 1; i >= 0; i -= 1)
                    n[i] && !e && ((l += 1), (t += n[i].swiperSlideSize) > a && (e = !0));
            } else if ("current" === e)
                for (let e = r + 1; e < n.length; e += 1) {
                    (t ? s[e] + o[e] - s[r] < a : s[e] - s[r] < a) && (l += 1);
                }
            else
                for (let e = r - 1; e >= 0; e -= 1) {
                    s[r] - s[e] < a && (l += 1);
                }
            return l;
        }
        update() {
            const e = this;
            if (!e || e.destroyed) return;
            const { snapGrid: t, params: i } = e;
            function n() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                    i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
            }
            let s;
            if (
                (i.breakpoints && e.setBreakpoint(),
                [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
                    t.complete && di(e, t);
                }),
                e.updateSize(),
                e.updateSlides(),
                e.updateProgress(),
                e.updateSlidesClasses(),
                i.freeMode && i.freeMode.enabled && !i.cssMode)
            )
                n(), i.autoHeight && e.updateAutoHeight();
            else {
                if (("auto" === i.slidesPerView || i.slidesPerView > 1) && e.isEnd && !i.centeredSlides) {
                    const t = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
                    s = e.slideTo(t.length - 1, 0, !1, !0);
                } else s = e.slideTo(e.activeIndex, 0, !1, !0);
                s || n();
            }
            i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
        }
        changeDirection(e, t) {
            void 0 === t && (t = !0);
            const i = this,
                n = i.params.direction;
            return (
                e || (e = "horizontal" === n ? "vertical" : "horizontal"),
                e === n || ("horizontal" !== e && "vertical" !== e)
                    ? i
                    : (i.el.classList.remove(`${i.params.containerModifierClass}${n}`),
                      i.el.classList.add(`${i.params.containerModifierClass}${e}`),
                      i.emitContainerClasses(),
                      (i.params.direction = e),
                      i.slides.forEach((t) => {
                          "vertical" === e ? (t.style.width = "") : (t.style.height = "");
                      }),
                      i.emit("changeDirection"),
                      t && i.update(),
                      i)
            );
        }
        changeLanguageDirection(e) {
            const t = this;
            (t.rtl && "rtl" === e) ||
                (!t.rtl && "ltr" === e) ||
                ((t.rtl = "rtl" === e),
                (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
                t.rtl
                    ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), (t.el.dir = "rtl"))
                    : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), (t.el.dir = "ltr")),
                t.update());
        }
        mount(e) {
            const t = this;
            if (t.mounted) return !0;
            let i = e || t.params.el;
            if (("string" == typeof i && (i = document.querySelector(i)), !i)) return !1;
            (i.swiper = t),
                i.parentNode &&
                    i.parentNode.host &&
                    i.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() &&
                    (t.isElement = !0);
            const n = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
            let s = (() => {
                if (i && i.shadowRoot && i.shadowRoot.querySelector) return i.shadowRoot.querySelector(n());
                return Xt(i, n())[0];
            })();
            return (
                !s &&
                    t.params.createElements &&
                    ((s = Ut("div", t.params.wrapperClass)),
                    i.append(s),
                    Xt(i, `.${t.params.slideClass}`).forEach((e) => {
                        s.append(e);
                    })),
                Object.assign(t, {
                    el: i,
                    wrapperEl: s,
                    slidesEl: t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : s,
                    hostEl: t.isElement ? i.parentNode.host : i,
                    mounted: !0,
                    rtl: "rtl" === i.dir.toLowerCase() || "rtl" === Zt(i, "direction"),
                    rtlTranslate:
                        "horizontal" === t.params.direction &&
                        ("rtl" === i.dir.toLowerCase() || "rtl" === Zt(i, "direction")),
                    wrongRTL: "-webkit-box" === Zt(s, "display"),
                }),
                !0
            );
        }
        init(e) {
            const t = this;
            if (t.initialized) return t;
            if (!1 === t.mount(e)) return t;
            t.emit("beforeInit"),
                t.params.breakpoints && t.setBreakpoint(),
                t.addClasses(),
                t.updateSize(),
                t.updateSlides(),
                t.params.watchOverflow && t.checkOverflow(),
                t.params.grabCursor && t.enabled && t.setGrabCursor(),
                t.params.loop && t.virtual && t.params.virtual.enabled
                    ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0)
                    : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
                t.params.loop && t.loopCreate(),
                t.attachEvents();
            const i = [...t.el.querySelectorAll('[loading="lazy"]')];
            return (
                t.isElement && i.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
                i.forEach((e) => {
                    e.complete
                        ? di(t, e)
                        : e.addEventListener("load", (e) => {
                              di(t, e.target);
                          });
                }),
                hi(t),
                (t.initialized = !0),
                hi(t),
                t.emit("init"),
                t.emit("afterInit"),
                t
            );
        }
        destroy(e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            const i = this,
                { params: n, el: s, wrapperEl: o, slides: a } = i;
            return void 0 === i.params || i.destroyed
                ? null
                : (i.emit("beforeDestroy"),
                  (i.initialized = !1),
                  i.detachEvents(),
                  n.loop && i.loopDestroy(),
                  t &&
                      (i.removeClasses(),
                      s && "string" != typeof s && s.removeAttribute("style"),
                      o && o.removeAttribute("style"),
                      a &&
                          a.length &&
                          a.forEach((e) => {
                              e.classList.remove(
                                  n.slideVisibleClass,
                                  n.slideFullyVisibleClass,
                                  n.slideActiveClass,
                                  n.slideNextClass,
                                  n.slidePrevClass
                              ),
                                  e.removeAttribute("style"),
                                  e.removeAttribute("data-swiper-slide-index");
                          })),
                  i.emit("destroy"),
                  Object.keys(i.eventsListeners).forEach((e) => {
                      i.off(e);
                  }),
                  !1 !== e &&
                      (i.el && "string" != typeof i.el && (i.el.swiper = null),
                      (function (e) {
                          const t = e;
                          Object.keys(t).forEach((e) => {
                              try {
                                  t[e] = null;
                              } catch (e) {}
                              try {
                                  delete t[e];
                              } catch (e) {}
                          });
                      })(i)),
                  (i.destroyed = !0),
                  null);
        }
        static extendDefaults(e) {
            Vt(xi, e);
        }
        static get extendedDefaults() {
            return xi;
        }
        static get defaults() {
            return yi;
        }
        static installModule(e) {
            Ei.prototype.__modules__ || (Ei.prototype.__modules__ = []);
            const t = Ei.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
        }
        static use(e) {
            return Array.isArray(e) ? (e.forEach((e) => Ei.installModule(e)), Ei) : (Ei.installModule(e), Ei);
        }
    }
    function Ti(e, t, i, n) {
        return (
            e.params.createElements &&
                Object.keys(n).forEach((s) => {
                    if (!i[s] && !0 === i.auto) {
                        let o = Xt(e.el, `.${n[s]}`)[0];
                        o || (((o = Ut("div", n[s])).className = n[s]), e.el.append(o)), (i[s] = o), (t[s] = o);
                    }
                }),
            i
        );
    }
    function Ci(e) {
        let { swiper: t, extendParams: i, on: n, emit: s } = e;
        function o(e) {
            let i;
            return e && "string" == typeof e && t.isElement && (i = t.el.querySelector(e) || t.hostEl.querySelector(e))
                ? i
                : (e &&
                      ("string" == typeof e && (i = [...document.querySelectorAll(e)]),
                      t.params.uniqueNavElements &&
                      "string" == typeof e &&
                      i &&
                      i.length > 1 &&
                      1 === t.el.querySelectorAll(e).length
                          ? (i = t.el.querySelector(e))
                          : i && 1 === i.length && (i = i[0])),
                  e && !i ? e : i);
        }
        function a(e, i) {
            const n = t.params.navigation;
            (e = ei(e)).forEach((e) => {
                e &&
                    (e.classList[i ? "add" : "remove"](...n.disabledClass.split(" ")),
                    "BUTTON" === e.tagName && (e.disabled = i),
                    t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](n.lockClass));
            });
        }
        function r() {
            const { nextEl: e, prevEl: i } = t.navigation;
            if (t.params.loop) return a(i, !1), void a(e, !1);
            a(i, t.isBeginning && !t.params.rewind), a(e, t.isEnd && !t.params.rewind);
        }
        function l(e) {
            e.preventDefault(),
                (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), s("navigationPrev"));
        }
        function c(e) {
            e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), s("navigationNext"));
        }
        function d() {
            const e = t.params.navigation;
            if (
                ((t.params.navigation = Ti(t, t.originalParams.navigation, t.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev",
                })),
                !e.nextEl && !e.prevEl)
            )
                return;
            let i = o(e.nextEl),
                n = o(e.prevEl);
            Object.assign(t.navigation, { nextEl: i, prevEl: n }), (i = ei(i)), (n = ei(n));
            const s = (i, n) => {
                i && i.addEventListener("click", "next" === n ? c : l),
                    !t.enabled && i && i.classList.add(...e.lockClass.split(" "));
            };
            i.forEach((e) => s(e, "next")), n.forEach((e) => s(e, "prev"));
        }
        function u() {
            let { nextEl: e, prevEl: i } = t.navigation;
            (e = ei(e)), (i = ei(i));
            const n = (e, i) => {
                e.removeEventListener("click", "next" === i ? c : l),
                    e.classList.remove(...t.params.navigation.disabledClass.split(" "));
            };
            e.forEach((e) => n(e, "next")), i.forEach((e) => n(e, "prev"));
        }
        i({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled",
            },
        }),
            (t.navigation = { nextEl: null, prevEl: null }),
            n("init", () => {
                !1 === t.params.navigation.enabled ? h() : (d(), r());
            }),
            n("toEdge fromEdge lock unlock", () => {
                r();
            }),
            n("destroy", () => {
                u();
            }),
            n("enable disable", () => {
                let { nextEl: e, prevEl: i } = t.navigation;
                (e = ei(e)),
                    (i = ei(i)),
                    t.enabled
                        ? r()
                        : [...e, ...i]
                              .filter((e) => !!e)
                              .forEach((e) => e.classList.add(t.params.navigation.lockClass));
            }),
            n("click", (e, i) => {
                let { nextEl: n, prevEl: o } = t.navigation;
                (n = ei(n)), (o = ei(o));
                const a = i.target;
                let r = o.includes(a) || n.includes(a);
                if (t.isElement && !r) {
                    const e = i.path || (i.composedPath && i.composedPath());
                    e && (r = e.find((e) => n.includes(e) || o.includes(e)));
                }
                if (t.params.navigation.hideOnClick && !r) {
                    if (
                        t.pagination &&
                        t.params.pagination &&
                        t.params.pagination.clickable &&
                        (t.pagination.el === a || t.pagination.el.contains(a))
                    )
                        return;
                    let e;
                    n.length
                        ? (e = n[0].classList.contains(t.params.navigation.hiddenClass))
                        : o.length && (e = o[0].classList.contains(t.params.navigation.hiddenClass)),
                        s(!0 === e ? "navigationShow" : "navigationHide"),
                        [...n, ...o]
                            .filter((e) => !!e)
                            .forEach((e) => e.classList.toggle(t.params.navigation.hiddenClass));
                }
            });
        const h = () => {
            t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")), u();
        };
        Object.assign(t.navigation, {
            enable: () => {
                t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")), d(), r();
            },
            disable: h,
            update: r,
            init: d,
            destroy: u,
        });
    }
    function Oi(e) {
        let t,
            i,
            { swiper: n, extendParams: s, on: o, emit: a, params: r } = e;
        (n.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
            s({
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !1,
                    stopOnLastSlide: !1,
                    reverseDirection: !1,
                    pauseOnMouseEnter: !1,
                },
            });
        let l,
            c,
            d,
            u,
            h,
            p,
            f,
            m,
            g = r && r.autoplay ? r.autoplay.delay : 3e3,
            v = r && r.autoplay ? r.autoplay.delay : 3e3,
            b = new Date().getTime();
        function y(e) {
            n &&
                !n.destroyed &&
                n.wrapperEl &&
                e.target === n.wrapperEl &&
                (n.wrapperEl.removeEventListener("transitionend", y),
                m || (e.detail && e.detail.bySwiperTouchMove) || C());
        }
        const w = () => {
                if (n.destroyed || !n.autoplay.running) return;
                n.autoplay.paused ? (c = !0) : c && ((v = l), (c = !1));
                const e = n.autoplay.paused ? l : b + v - new Date().getTime();
                (n.autoplay.timeLeft = e),
                    a("autoplayTimeLeft", e, e / g),
                    (i = requestAnimationFrame(() => {
                        w();
                    }));
            },
            S = (e) => {
                if (n.destroyed || !n.autoplay.running) return;
                cancelAnimationFrame(i), w();
                let s = void 0 === e ? n.params.autoplay.delay : e;
                (g = n.params.autoplay.delay), (v = n.params.autoplay.delay);
                const o = (() => {
                    let e;
                    if (
                        !(e =
                            n.virtual && n.params.virtual.enabled
                                ? n.slides.filter((e) => e.classList.contains("swiper-slide-active"))[0]
                                : n.slides[n.activeIndex])
                    )
                        return;
                    return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
                })();
                !Number.isNaN(o) && o > 0 && void 0 === e && ((s = o), (g = o), (v = o)), (l = s);
                const r = n.params.speed,
                    c = () => {
                        n &&
                            !n.destroyed &&
                            (n.params.autoplay.reverseDirection
                                ? !n.isBeginning || n.params.loop || n.params.rewind
                                    ? (n.slidePrev(r, !0, !0), a("autoplay"))
                                    : n.params.autoplay.stopOnLastSlide ||
                                      (n.slideTo(n.slides.length - 1, r, !0, !0), a("autoplay"))
                                : !n.isEnd || n.params.loop || n.params.rewind
                                  ? (n.slideNext(r, !0, !0), a("autoplay"))
                                  : n.params.autoplay.stopOnLastSlide || (n.slideTo(0, r, !0, !0), a("autoplay")),
                            n.params.cssMode &&
                                ((b = new Date().getTime()),
                                requestAnimationFrame(() => {
                                    S();
                                })));
                    };
                return (
                    s > 0
                        ? (clearTimeout(t),
                          (t = setTimeout(() => {
                              c();
                          }, s)))
                        : requestAnimationFrame(() => {
                              c();
                          }),
                    s
                );
            },
            x = () => {
                (b = new Date().getTime()), (n.autoplay.running = !0), S(), a("autoplayStart");
            },
            E = () => {
                (n.autoplay.running = !1), clearTimeout(t), cancelAnimationFrame(i), a("autoplayStop");
            },
            T = (e, i) => {
                if (n.destroyed || !n.autoplay.running) return;
                clearTimeout(t), e || (f = !0);
                const s = () => {
                    a("autoplayPause"),
                        n.params.autoplay.waitForTransition ? n.wrapperEl.addEventListener("transitionend", y) : C();
                };
                if (((n.autoplay.paused = !0), i)) return p && (l = n.params.autoplay.delay), (p = !1), void s();
                const o = l || n.params.autoplay.delay;
                (l = o - (new Date().getTime() - b)), (n.isEnd && l < 0 && !n.params.loop) || (l < 0 && (l = 0), s());
            },
            C = () => {
                (n.isEnd && l < 0 && !n.params.loop) ||
                    n.destroyed ||
                    !n.autoplay.running ||
                    ((b = new Date().getTime()),
                    f ? ((f = !1), S(l)) : S(),
                    (n.autoplay.paused = !1),
                    a("autoplayResume"));
            },
            M = () => {
                if (n.destroyed || !n.autoplay.running) return;
                const e = Dt();
                "hidden" === e.visibilityState && ((f = !0), T(!0)), "visible" === e.visibilityState && C();
            },
            P = (e) => {
                "mouse" === e.pointerType && ((f = !0), (m = !0), n.animating || n.autoplay.paused || T(!0));
            },
            O = (e) => {
                "mouse" === e.pointerType && ((m = !1), n.autoplay.paused && C());
            };
        o("init", () => {
            n.params.autoplay.enabled &&
                (n.params.autoplay.pauseOnMouseEnter &&
                    (n.el.addEventListener("pointerenter", P), n.el.addEventListener("pointerleave", O)),
                Dt().addEventListener("visibilitychange", M),
                x());
        }),
            o("destroy", () => {
                n.el &&
                    "string" != typeof n.el &&
                    (n.el.removeEventListener("pointerenter", P), n.el.removeEventListener("pointerleave", O)),
                    Dt().removeEventListener("visibilitychange", M),
                    n.autoplay.running && E();
            }),
            o("_freeModeStaticRelease", () => {
                (u || f) && C();
            }),
            o("_freeModeNoMomentumRelease", () => {
                n.params.autoplay.disableOnInteraction ? E() : T(!0, !0);
            }),
            o("beforeTransitionStart", (e, t, i) => {
                !n.destroyed && n.autoplay.running && (i || !n.params.autoplay.disableOnInteraction ? T(!0, !0) : E());
            }),
            o("sliderFirstMove", () => {
                !n.destroyed &&
                    n.autoplay.running &&
                    (n.params.autoplay.disableOnInteraction
                        ? E()
                        : ((d = !0),
                          (u = !1),
                          (f = !1),
                          (h = setTimeout(() => {
                              (f = !0), (u = !0), T(!0);
                          }, 200))));
            }),
            o("touchEnd", () => {
                if (!n.destroyed && n.autoplay.running && d) {
                    if ((clearTimeout(h), clearTimeout(t), n.params.autoplay.disableOnInteraction))
                        return (u = !1), void (d = !1);
                    u && n.params.cssMode && C(), (u = !1), (d = !1);
                }
            }),
            o("slideChange", () => {
                !n.destroyed && n.autoplay.running && (p = !0);
            }),
            Object.assign(n.autoplay, { start: x, stop: E, pause: T, resume: C });
    }
    Object.keys(Si).forEach((e) => {
        Object.keys(Si[e]).forEach((t) => {
            Ei.prototype[t] = Si[e][t];
        });
    }),
    Ei.use([
        function (e) {
            let { swiper: t, on: i, emit: n } = e;
            const s = Rt();
            let o = null,
                a = null;
            const r = () => {
                    t && !t.destroyed && t.initialized && (n("beforeResize"), n("resize"));
                },
                l = () => {
                    t && !t.destroyed && t.initialized && n("orientationchange");
                };
            i("init", () => {
                t.params.resizeObserver && void 0 !== s.ResizeObserver
                    ? t &&
                        !t.destroyed &&
                        t.initialized &&
                        (o = new ResizeObserver((e) => {
                            a = s.requestAnimationFrame(() => {
                                const { width: i, height: n } = t;
                                let s = i,
                                    o = n;
                                e.forEach((e) => {
                                    let { contentBoxSize: i, contentRect: n, target: a } = e;
                                    (a && a !== t.el) ||
                                        ((s = n ? n.width : (i[0] || i).inlineSize),
                                        (o = n ? n.height : (i[0] || i).blockSize));
                                }),
                                    (s === i && o === n) || r();
                            });
                        })).observe(t.el)
                    : (s.addEventListener("resize", r), s.addEventListener("orientationchange", l));
            }),
                i("destroy", () => {
                    a && s.cancelAnimationFrame(a),
                        o && o.unobserve && t.el && (o.unobserve(t.el), (o = null)),
                        s.removeEventListener("resize", r),
                        s.removeEventListener("orientationchange", l);
                });
        },
        function (e) {
            let { swiper: t, extendParams: i, on: n, emit: s } = e;
            const o = [],
                a = Rt(),
                r = function (e, i) {
                    void 0 === i && (i = {});
                    const n = new (a.MutationObserver || a.WebkitMutationObserver)((e) => {
                        if (t.__preventObserver__) return;
                        if (1 === e.length) return void s("observerUpdate", e[0]);
                        const i = function () {
                            s("observerUpdate", e[0]);
                        };
                        a.requestAnimationFrame ? a.requestAnimationFrame(i) : a.setTimeout(i, 0);
                    });
                    n.observe(e, {
                        attributes: void 0 === i.attributes || i.attributes,
                        childList: t.isElement || (void 0 === i.childList || i).childList,
                        characterData: void 0 === i.characterData || i.characterData,
                    }),
                        o.push(n);
                };
            i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
                n("init", () => {
                    if (t.params.observer) {
                        if (t.params.observeParents) {
                            const e = Jt(t.hostEl);
                            for (let t = 0; t < e.length; t += 1) r(e[t]);
                        }
                        r(t.hostEl, { childList: t.params.observeSlideChildren }),
                            r(t.wrapperEl, { attributes: !1 });
                    }
                }),
                n("destroy", () => {
                    o.forEach((e) => {
                        e.disconnect();
                    }),
                        o.splice(0, o.length);
                });
        },
    ]);
    $(document).ready(function () {
        new Ei(".partner-slider .swiper", {
            modules: [Oi],
            slidesPerView: 2,
            spaceBetween: 16,
            loop: true,
            speed: 4000,
            autoplay: { delay: 0, disableOnInteraction: false },
            breakpoints: {
                576: { slidesPerView: 4 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6, spaceBetween: 40 },
            },
        });
    })
})();
