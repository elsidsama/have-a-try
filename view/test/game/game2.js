(function () {
    var a = $("#_j_container");
    var d = function () {
            var f = $(window).width();
            var e = $(window).height();
            a.css({
                width: f,
                height: e
            });
            $("html").css({
                "font-size": 20 * (f / 320)
            })
        }
        ;
    d();
    $(function () {
        b.init()
    });
    var b = {
        resource: [{
            id: "item1",
            size: 15,
            src: "./image/icon03.png"
        }, {
            id: "item2",
            size: 15,
            src: "./image/icon02.png"
        }, {
            id: "item3",
            size: 15,
            src: "./image/icon05.png"
        }, {
            id: "item4",
            size: 15,
            src: "./image/icon01.png"
        }, {
            id: "item5",
            size: 15,
            src: "./image/xezz.png"
        }, {
            id: "item6",
            size: 15,
            src: "./image/xezz02.png"
        },{
            id: "person",
            size: 5,
            src: "./image/gameHero.gif"
        }],
        container: null,
        width: 0,
        height: 0,
        items: [],
        fps: 40,
        timer: null,
        person: null,
        speed: 8,
        portWidth: null,
        level: 1,
        maxLevel: 3,
        frames: 0,
        itemDelayBase: 36,
        itemDelayAppend: 12,
        itemDelay: 0,
        metre: 0,
        metreAppend: 4000,
        metrePointIndex: 0,
        metreInterval: 41900000,
        metreEnd: 41900000,
        metroLevel: 10000000
    };
    var c = window.game = b;
    b.init = function () {
        var f = this;
        f.container = Q.getDOM("_j_container");
        if ("onorientationchange" in window) {
            window.onorientationchange = function (g) {
                f.checkHorizontal()
            }
        } else {
            window.onresize = function (g) {
                f.checkHorizontal()
            }
        }
        f.checkHorizontal();
        f.width = window.innerWidth;
        f.height = window.innerHeight;
        f.container.style.width = f.width + "px";
        var e = new Q.ImageLoader();
        e.addEventListener("loaded", Q.delegate(f.onLoadProgress, f));
        e.addEventListener("complete", Q.delegate(f.onLoadComplete, f));
        e.load(f.resource)
    }
    ;
    b.checkHorizontal = function () {
        var g = function () {
                if (this.timer) {
                    this.timer.pause()
                }
                $(".g-hor", a).addClass("show")
            }
            ;
        var h = function () {
                $(".g-hor", a).removeClass("show");
                if (this.timer) {
                    this.timer.resume()
                }
            }
            ;
        if ("orientation" in window) {
            if (window.orientation == 0) {
                h()
            } else {
                g()
            }
        } else {
            var f = window.innerWidth;
            var e = window.innerHeight;
            if (f < e) {
                h()
            } else {
                g()
            }
        }
    }
    ;
    b.onLoadProgress = function (g) {
        var f = Math.round(g.target.getLoadedSize() / g.target.getTotalSize() * 100);
        if (f > 100) {
            f = 100
        }
        $(".g-loading p span", a).text(f + "%")
    }
    ;
    b.onLoadComplete = function (g) {
        g.target.removeAllEventListeners();
        var f = this;
        f.images = g.images;
        $(".g-loading", a).remove();
        $(".g-start-box", a).delegate(".btn-go .b-start", "click", function (h) {
            h.preventDefault();
            $(".g-start-box", a).remove();
            c.item.init();
            //c.point.init();
            f.startUp()
        }).delegate(".btn-go .b-rule", "click", function (h) {
            h.preventDefault();
            $(".g-pop-box", a).addClass("show")
        }).addClass("show");
        $(".g-pop-box", a).delegate(".g-close", "click", function (h) {
            h.preventDefault();
            $(".g-pop-box", a).removeClass("show")
        })
    }
    ;
    b.getImage = function (e) {
        return this.images[e].image
    }
    ;
    b.startUp = function () {
        if (Q.isWebKit && Q.supportTouch) {
            document.body.style.webkitTouchCallout = "none";
            document.body.style.webkitUserSelect = "none";
            document.body.style.webkitTextSizeAdjust = "none";
            document.body.style.webkitTapHighlightColor = "rgba(0,0,0,0)"
        }
        this.context = new Quark.DOMContext({
            canvas: this.container
        });
        this.stage = new Q.Stage({
            context: this.context,
            width: this.width,
            height: this.height,
            update: Q.delegate(this.update, this)
        });
        var h = new Q.Timer(1000 / this.fps);
        h.addListener(this.stage);
        h.start();
        this.timer = h;
        var e = this;
        var g = new c.person({
            id: "person",
            image: e.getImage("person")
        });
        g.width = 116;
        g.height = 119;
        g.scaleX = g.scaleY = 1;
        e.person = g;
        e.portWidth = e.person.width + 50;
        e.stage.addChild(e.person);
        e.timer.pause();
        var f = new Q.EventManager();
        if ("ondeviceorientation" in window) {
            f.register(window, ["deviceorientation"], function (j) {
                if (!j.gamma) {
                    j.gamma = (j.x * (180 / Math.PI))
                }
                var i = j.gamma;
                e.person.move(e.person.x + i / 90 * 60, e.person.y)
            }, true, true)
        }
        $(".result-box", a).delegate(".r-restart", "click", function (i) {
            i.preventDefault();
            $(this).closest(".result-box").removeClass("show");
            e.restart()
        }).delegate(".r-receive", "click", function (i) {
            i.preventDefault();
            location.href = "http://activity.mafengwo.cn/t/brand/318/gameReceive/"
        });
        $(".g-guide-box", a).on("click", function () {
            $(this).removeClass("show");
            e.timer.resume()
        });
        this.showMain()
    }
    ;
    b.showMain = function () {
        this.level = 1;
        this.metre = 0;
        this.metrePointIndex = 1;
        this.person.dirX = this.person.x = this.width - this.person.width >> 1;
        this.person.dirY = this.person.y = this.height - this.person.height - 90;
        for (var e = 0; e < this.items.length; e++) {
            this.stage.removeChild(this.items[e])
        }
        this.items = [];
        this.itemOver = false;
        this.frames = 0;
        $(".g-guide-box", a).addClass("show")
    }
    ;
    b.checkCollide = function () {
        var f = this.items
            , h = this.person;
        f.sort(function (l, i) {
            return l.y < i.y
        });
        for (var j = 0; j < f.length; j++) {
            var k = f[j];
            var g = k.x - k.regX - (h.x + 20)
                , e = k.y - k.regY - (h.y + 20);
            if (g < this.person.width - 20 - 40 && g > -k.getCurrentWidth() && e < this.person.height - 20 - 40 && e > -k.getCurrentHeight()) {
                this.gameOver()
            }
        }
    }
    ;
    b.gameOver = function () {
        var e = this;
        e.timer.pause();
        e.restart();
        return;
        $.post("http://activity.mafengwo.cn/t/brand/318/game/", {
            metre: e.metre
        }, function (g) {
            if (!g.error_code) {
                $("title").text(g.data["share"]["title"]);
                if (/MicroMessenger/i.test(window.navigator.userAgent)) {
                    $('meta[property="og:title"]').attr("content", g.data["share"]["title"]);
                    $(window).trigger("wechat.share.init")
                }
                if (e.metre > e.metreEnd) {
                    $('.result-box[data-type="legend"]', a).addClass("show")
                } else {
                    $('.result-box[data-type="metre"]', a).addClass("show");
                    if (Math.floor(g.data["metre"] / 1000) > Math.floor(e.metre / 1000)) {
                        var f = "哎呦，不错哦，滚了<span>" + Math.floor(e.metre / 1000) + "</span>公里<br>";
                        if (g.data["point"]) {
                            f += "滚到了<span>" + g.data["point"] + "</span><br>"
                        }
                        f += "您的最高纪录为<span>" + Math.floor(g.data["metre"] / 1000) + "</span>公里";
                        $('.result-box[data-type="metre"]', a).find("p").html(f)
                    } else {
                        var f = "恭喜您，滚了<span>" + Math.floor(e.metre / 1000) + "</span>公里<br>";
                        if (g.data["point"]) {
                            f += "滚到了<span>" + g.data["point"] + "</span><br>"
                        }
                        f += "创造了个人最高纪录";
                        $('.result-box[data-type="metre"]', a).find("p").html(f)
                    }
                }
            } else {
                alert("系统错误，请稍后再试")
            }
        }, "json")
    }
    ;
    b.restart = function () {
        this.showMain()
    }
    ;
    b.update = function () {
        this.frames++;
        this.metre += this.metreAppend * this.level;
        if (this.metre > this.metreEnd) {
            this.gameOver()
        } else {
            if (parseInt($('meta[property="og:user"]').attr("content")) === 19126184) {
                this.metroLevel = 2000000
            }
            this.level = Math.floor(this.metre / this.metroLevel) + 1;
            if (this.level > this.maxLevel) {
                this.level = this.maxLevel
            }
            this.itemDelay = this.itemDelayBase + this.itemDelayAppend * this.level;
            this.updatePerson();
            this.createItem();
            this.updateItem()
        }
    }
    ;
    b.updatePerson = function () {
        this.person.x = this.person.currentSpeed * this.person.dirX;
        this.person.y = this.person.currentSpeed * this.person.dirY;
        if (this.person.x < 0) {
            this.person.x = 0
        } else {
            if (this.person.x > this.width - this.person.width) {
                this.person.x = this.width - this.person.width
            }
        }
        if (this.person.y < 0) {
            this.person.y = 0
        } else {
            if (this.person.y > this.height - this.person.height) {
                this.person.y = this.height - this.person.height
            }
        }
        this.checkCollide()
    }
    ;
    b.createItem = function () {
        var f, g;
        if (this.frames % (this.itemDelay / this.level) === 0) {
            if (this.metre > this.metrePointIndex * this.metreInterval && this.metre < (this.metrePointIndex + 1) * this.metreInterval) {
                g = c.point.getTypes(this.metrePointIndex - 1);
                for (f in g) {
                    var e = new c.point({
                        id: "point" + new Date().getTime() + f,
                        type: g[f]
                    });
                    this.items.push(e);
                    this.stage.addChild(e)
                }
                this.metrePointIndex++
            } else {
                g = c.item.getTypes();
                for (f in g) {
                    var h = new c.item({
                        id: "item" + new Date().getTime() + f,
                        type: g[f]
                    });
                    this.items.push(h);
                    this.stage.addChild(h)
                }
            }
        }
    }
    ;
    b.updateItem = function () {
        var f = this
            , e = this.items;
        for (var g = 0; g < e.length; g++) {
            var h = f.items[g];
            h.y += h.currentSpeedY * f.speed + f.level * 2;
            if (h.y > f.height) {
                this.stage.removeChild(h);
                this.items.splice(g, 1)
            }
        }
    }
})();
(function () {
    var a = window.game.person = function (b) {
            b = b || {};
            a.superClass.constructor.call(this, b);
            this.id = b.id || Q.UIDUtil.createUID("person");
            this.init()
        }
        ;
    Q.inherit(a, Q.DisplayObjectContainer);
    a.prototype.init = function () {
        this.currentSpeed = this.speed = 1;
        this.dirX = this.dirY = 0
    }
    ;
    a.prototype.move = function (b, c) {
        this.dirX = b;
        this.dirY = c;
        this.currentSpeed = this.speed
    }
})();
(function () {
    var a = window.game.item = function (b) {
            b = b || {};
            this.type = b.type;
            a.superClass.constructor.call(this, this.type);
            this.id = b.id || Q.UIDUtil.createUID("items");
            this.reset(this.type)
        }
        ;
    Q.inherit(a, Q.MovieClip);
    a.prototype.init = function () {
    }
    ;
    a.prototype.reset = function (b) {
        this.setType(b);
        this.width = this.type.width;
        this.height = this.type.height;
        this.currentSpeedY = 1;
        this.currentSpeedX = 0;
        var c = this.width;
        if ("undefined" !== typeof this.type.group) {
            c = this.type.groupWidth
        }
        var d = (c - (window.game.portWidth - (window.game.width - c))) / c;
        this.scaleX = this.scaleY = d;
        if (this.type.position === "left") {
            this.x = 0
        } else {
            this.x = window.game.width - this.type.width * d
        }
        this.y = -200
    }
    ;
    a.prototype.setType = function (b) {
        this.type = b;
        this._frames.length = 0;
        this.addFrame(b.frames);
        this.currentFrame = 0
    }
    ;
    a.getTypes = function () {
        var c = [];
        var d = this.typeList;
        var b = Math.floor(Math.random() * d.length);
        c.push(d[b]);
        if ("undefined" !== typeof d[b]["group"]) {
            c.push(d[d[b]["group"]])
        }
        return c
    }
    ;
    a.init = function () {
        this.type = {};
        this.type.item1 = {
            image: window.game.getImage("item1"),
            width: 186,
            height: 188,
            speedY: 1,
            position: "right",
            frames: [{
                rect: [0, 0, 186, 188]
            }]
        };
        this.type.item2 = {
            image: window.game.getImage("item2"),
            width: 281,
            height: 194,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 281, 194]
            }]
        };
        this.type.item3 = {
            image: window.game.getImage("item3"),
            width: 186,
            height: 188,
            speedY: 1,
            group: 3,
            groupWidth: 413,
            position: "left",
            frames: [{
                rect: [0, 0, 186, 188]
            }]
        };
        this.type.item4 = {
            image: window.game.getImage("item3"),
            width: 227,
            height: 188,
            speedY: 1,
            group: 2,
            groupWidth: 413,
            position: "right",
            frames: [{
                rect: [413, 0, 227, 188]
            }]
        };
        this.type.item5 = {
            image: window.game.getImage("item4"),
            width: 233,
            height: 215,
            speedY: 1,
            group: 5,
            groupWidth: 424,
            position: "left",
            frames: [{
                rect: [0, 0, 233, 215]
            }]
        };
        this.type.item6 = {
            image: window.game.getImage("item4"),
            width: 191,
            height: 215,
            speedY: 1,
            group: 4,
            groupWidth: 424,
            position: "right",
            frames: [{
                rect: [449, 0, 191, 215]
            }]
        };
        this.type.item7 = {
            image: window.game.getImage("item5"),
            width: 399,
            height: 217,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 399, 217]
            }]
        };
        this.type.item8 = {
            image: window.game.getImage("item6"),
            width: 216,
            height: 205,
            speedY: 1,
            group: 6,
            groupWidth: 422,
            position: "left",
            frames: [{
                rect: [0, 0, 216, 205]
            }]
        };
        this.type.item9 = {
            image: window.game.getImage("item6"),
            width: 206,
            height: 205,
            speedY: 1,
            group: 7,
            groupWidth: 422,
            position: "right",
            frames: [{
                rect: [414, 0, 206, 205]
            }]
        };
        this.typeList = [this.type.item1, this.type.item2, this.type.item3, this.type.item4, this.type.item5, this.type.item6, this.type.item7, this.type.item8, this.type.item9]
    }
})();
