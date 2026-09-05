!function(a) {
    "use strict";
    function e() {
        mkdf.scroll = a(window).scrollTop()
    }
    function t() {}
    function o() {
        mkdf.windowWidth = a(window).width(),
        mkdf.windowHeight = a(window).height()
    }
    function d() {
        mkdf.scroll = a(window).scrollTop()
    }

    var r = {};
    window.mkdf = {},
    mkdf.modules = {},
    mkdf.modules.common = {},
    mkdf.scroll = 0,
    mkdf.window = a(window),
    mkdf.document = a(document),
    mkdf.windowWidth = a(window).width(),
    mkdf.windowHeight = a(window).height(),
    mkdf.body = a("body"),
    mkdf.html = a("html, body"),
    mkdf.htmlEl = a("html"),
    mkdf.menuDropdownHeightSet = !1,
    mkdf.defaultHeaderStyle = "",
    mkdf.minVideoWidth = 1500,
    mkdf.videoWidthOriginal = 1280,
    mkdf.videoHeightOriginal = 720,
    mkdf.videoRatio = 1.61,
    mkdf.mkdfOnDocumentReady = e,
    mkdf.mkdfOnWindowLoad = t,
    mkdf.mkdfOnWindowResize = o,
    mkdf.mkdfOnWindowScroll = d,
    a(document).ready(e),
    a(window).load(t),
    a(window).resize(o),
    a(window).scroll(d)
}(jQuery),
function(a) {
    "use strict";
    function n() {
        e()
    }
    function e() {
        var n = a(".hclients .box-slider");
        n.length && n.each(function() {
            var n = a(this)
              , e = n.find(".box-area")
              , t = n.find(".box-items")
              , s = function(n) {
                var e = 0;
                return n.find(".item").each(function() {
                    var n = a(this)
                      , t = n.outerWidth();
                    e += t
                }),
                n.outerWidth() < e ? e : n.outerWidth()
            };
            n.css("visibility", "visible"),
            function() {
                var i = t.clone().addClass("news-clone").appendTo("");
                var d = n.find(".box-items");
                mkdf.modules.common.mkdfRequestAnimationFrame();
                var o = s(t);
                d.css({
                    width: o
                }),
                jQuery(".box-items").each(function(e) {                    
                    var d = a(this)
                      , r = 0
                      , f = function() {
                        n.is(":hover") || (r -= 1),
                        jQuery(".box-items").position().left <= -o && (d.css("left", parseInt(o - 1)),
                        r = 0),
                        n.is(":hover") || d.css("transform", "translate3d(" + 1 * r + "px,0,0)"),
                        requestNextAnimationFrame(f),
                        a(window).resize(function() {
                            setTimeout(function() {
                                o = s(t),
                                r = 0,
                                t.css("left", 0)
                                i.css("left", o)
                            }, 100)
                        })
                    };
                    f()
                })
            }()
        })
    }

    function A() {
        window.requestNextAnimationFrame = function() {
            var a = void 0
              , e = void 0
              , t = navigator.userAgent
              , o = 0
              , d = this;
            return window.webkitRequestAnimationFrame && (e = function(a) {
                void 0 === a && (a = +new Date),
                d.callback(a)
            }
            ,
            a = window.webkitRequestAnimationFrame,
            window.webkitRequestAnimationFrame = function(t, o) {
                d.callback = t,
                a(e, o)
            }
            ),
            window.mozRequestAnimationFrame && (o = t.indexOf("rv:"),
            -1 != t.indexOf("Gecko") && "2.0" === t.substr(o + 3, 3) && (window.mozRequestAnimationFrame = void 0)),
            window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a, e) {
                var t, o;
                window.setTimeout(function() {
                    t = +new Date,
                    a(t),
                    o = +new Date,
                    d.timeout = 1e3 / 60 - (o - t)
                }, d.timeout)
            }
        }()
    }
    var t = {};
    mkdf.modules.latestNews = t,
    mkdf.modules.common.mkdfRequestAnimationFrame = A,
    t.mkdfOnDocumentReady = n,
    a(document).ready(n)
}(jQuery)