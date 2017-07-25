(function() {
    var a = $("#_j_container");
    var d = function() {
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
    $(function() {
        b.init()
    });
    var b = {
        resource: [{
            id: "item1",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/obostacle/o-icon01.png"
        }, {
            id: "item2",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/obostacle/o-icon02.png"
        }, {
            id: "item3",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/obostacle/o-icon03.png"
        }, {
            id: "item4",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/obostacle/o-icon04.png"
        }, {
            id: "item5",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/obostacle/o-icon05.png"
        }, {
            id: "point1",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon17.png?v=20160311"
        }, {
            id: "point2",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon16.png?v=20160311"
        }, {
            id: "point3",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon15.png?v=20160311"
        }, {
            id: "point4",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon14.png?v=20160311"
        }, {
            id: "point5",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon13.png?v=20160311"
        }, {
            id: "point6",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon12.png?v=20160311"
        }, {
            id: "point7",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon11.png?v=20160311"
        }, {
            id: "point8",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon10.png?v=20160311"
        }, {
            id: "point9",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon09.png?v=20160311"
        }, {
            id: "point10",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon08.png?v=20160311"
        }, {
            id: "point11",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon07.png?v=20160311"
        }, {
            id: "point12",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon06.png?v=20160311"
        }, {
            id: "point13",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon05.png?v=20160311"
        }, {
            id: "point14",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon04.png?v=20160311"
        }, {
            id: "point15",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon03.png?v=20160311"
        }, {
            id: "point16",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon02.png?v=20160311"
        }, {
            id: "point17",
            size: 15,
            src: "http://images.mafengwo.net/images/activity/game318/des/d-icon01.png?v=20160311"
        }, {
            id: "person",
            size: 5,
            src: "http://images.mafengwo.net/images/activity/game318/gameHero.gif"
        }],
        container: null ,
        width: 0,
        height: 0,
        items: [],
        fps: 40,
        timer: null ,
        person: null ,
        speed: 8,
        portWidth: null ,
        level: 1,
        maxLevel: 3,
        frames: 0,
        itemDelayBase: 36,
        itemDelayAppend: 12,
        itemDelay: 0,
        metre: 0,
        metreAppend: 4000,
        metrePointIndex: 0,
        metreInterval: 2500000,
        metreEnd: 41900000,
        metroLevel: 10000000
    };
    var c = window.game = b;
    b.init = function() {
        var f = this;
        f.container = Q.getDOM("_j_container");
        if ("onorientationchange" in window) {
            window.onorientationchange = function(g) {
                f.checkHorizontal()
            }
        } else {
            window.onresize = function(g) {
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
    b.checkHorizontal = function() {
        var g = function() {
                if (this.timer) {
                    this.timer.pause()
                }
                $(".g-hor", a).addClass("show")
            }
            ;
        var h = function() {
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
    b.onLoadProgress = function(g) {
        var f = Math.round(g.target.getLoadedSize() / g.target.getTotalSize() * 100);
        if (f > 100) {
            f = 100
        }
        $(".g-loading p span", a).text(f + "%")
    }
    ;
    b.onLoadComplete = function(g) {
        g.target.removeAllEventListeners();
        var f = this;
        f.images = g.images;
        $(".g-loading", a).remove();
        $(".g-start-box", a).delegate(".btn-go .b-start", "click", function(h) {
            h.preventDefault();
            $(".g-start-box", a).remove();
            c.item.init();
            c.point.init();
            f.startUp()
        }).delegate(".btn-go .b-rule", "click", function(h) {
            h.preventDefault();
            $(".g-pop-box", a).addClass("show")
        }).addClass("show");
        $(".g-pop-box", a).delegate(".g-close", "click", function(h) {
            h.preventDefault();
            $(".g-pop-box", a).removeClass("show")
        })
    }
    ;
    b.getImage = function(e) {
        return this.images[e].image
    }
    ;
    b.startUp = function() {
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
            f.register(window, ["deviceorientation"], function(j) {
                if (!j.gamma) {
                    j.gamma = (j.x * (180 / Math.PI))
                }
                var i = j.gamma;
                e.person.move(e.person.x + i / 90 * 60, e.person.y)
            }, true, true)
        }
        $(".result-box", a).delegate(".r-restart", "click", function(i) {
            i.preventDefault();
            $(this).closest(".result-box").removeClass("show");
            e.restart()
        }).delegate(".r-receive", "click", function(i) {
            i.preventDefault();
            location.href = "http://activity.mafengwo.cn/t/brand/318/gameReceive/"
        });
        $(".g-guide-box", a).on("click", function() {
            $(this).removeClass("show");
            e.timer.resume()
        });
        this.showMain()
    }
    ;
    b.showMain = function() {
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
    b.checkCollide = function() {
        var f = this.items
            , h = this.person;
        f.sort(function(l, i) {
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
    b.gameOver = function() {
        var e = this;
        e.timer.pause();
        $.post("http://activity.mafengwo.cn/t/brand/318/game/", {
            metre: e.metre
        }, function(g) {
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
    b.restart = function() {
        this.showMain()
    }
    ;
    b.update = function() {
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
    b.updatePerson = function() {
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
    b.createItem = function() {
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
    b.updateItem = function() {
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
(function() {
    var a = window.game.person = function(b) {
            b = b || {};
            a.superClass.constructor.call(this, b);
            this.id = b.id || Q.UIDUtil.createUID("person");
            this.init()
        }
        ;
    Q.inherit(a, Q.DisplayObjectContainer);
    a.prototype.init = function() {
        this.currentSpeed = this.speed = 1;
        this.dirX = this.dirY = 0
    }
    ;
    a.prototype.move = function(b, c) {
        this.dirX = b;
        this.dirY = c;
        this.currentSpeed = this.speed
    }
})();
(function() {
    var a = window.game.item = function(b) {
            b = b || {};
            this.type = b.type;
            a.superClass.constructor.call(this, this.type);
            this.id = b.id || Q.UIDUtil.createUID("items");
            this.reset(this.type)
        }
        ;
    Q.inherit(a, Q.MovieClip);
    a.prototype.init = function() {}
    ;
    a.prototype.reset = function(b) {
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
    a.prototype.setType = function(b) {
        this.type = b;
        this._frames.length = 0;
        this.addFrame(b.frames);
        this.currentFrame = 0
    }
    ;
    a.getTypes = function() {
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
    a.init = function() {
        this.type = {};
        this.type.item1 = {
            image: window.game.getImage("item1"),
            width: 365,
            height: 158,
            speedY: 1,
            position: "right",
            frames: [{
                rect: [0, 0, 365, 158]
            }]
        };
        this.type.item2 = {
            image: window.game.getImage("item2"),
            width: 310,
            height: 319,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 310, 319]
            }]
        };
        this.type.item3 = {
            image: window.game.getImage("item3"),
            width: 106,
            height: 141,
            speedY: 1,
            group: 3,
            groupWidth: 358,
            position: "left",
            frames: [{
                rect: [0, 0, 106, 141]
            }]
        };
        this.type.item4 = {
            image: window.game.getImage("item3"),
            width: 252,
            height: 141,
            speedY: 1,
            group: 2,
            groupWidth: 358,
            position: "right",
            frames: [{
                rect: [388, 0, 252, 141]
            }]
        };
        this.type.item5 = {
            image: window.game.getImage("item4"),
            width: 319,
            height: 164,
            speedY: 1,
            group: 5,
            groupWidth: 339,
            position: "left",
            frames: [{
                rect: [0, 0, 319, 164]
            }]
        };
        this.type.item6 = {
            image: window.game.getImage("item4"),
            width: 20,
            height: 164,
            speedY: 1,
            group: 4,
            groupWidth: 339,
            position: "right",
            frames: [{
                rect: [620, 0, 20, 164]
            }]
        };
        this.type.item7 = {
            image: window.game.getImage("item5"),
            width: 103,
            height: 182,
            speedY: 1,
            group: 7,
            groupWidth: 320,
            position: "left",
            frames: [{
                rect: [0, 0, 103, 182]
            }]
        };
        this.type.item8 = {
            image: window.game.getImage("item5"),
            width: 217,
            height: 182,
            speedY: 1,
            group: 6,
            groupWidth: 320,
            position: "right",
            frames: [{
                rect: [403, 0, 217, 182]
            }]
        };
        this.typeList = [this.type.item1, this.type.item2, this.type.item3, this.type.item4, this.type.item5, this.type.item6, this.type.item7, this.type.item8]
    }
})();
(function() {
    var a = window.game.point = function(b) {
            b = b || {};
            this.type = b.type;
            a.superClass.constructor.call(this, this.type);
            this.id = b.id || Q.UIDUtil.createUID("points");
            this.reset(this.type)
        }
        ;
    Q.inherit(a, Q.MovieClip);
    a.prototype.init = function() {}
    ;
    a.prototype.reset = function(b) {
        this.setType(b);
        this.width = this.type.width;
        this.height = this.type.height;
        this.currentSpeedY = 1;
        this.currentSpeedX = 0;
        var c = this.width;
        if ("undefined" !== typeof this.type.groupWidth) {
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
    a.prototype.setType = function(b) {
        this.type = b;
        this._frames.length = 0;
        this.addFrame(b.frames);
        this.currentFrame = 0
    }
    ;
    a.getTypes = function(b) {
        var c = this.typeList;
        return c[b]
    }
    ;
    a.init = function() {
        this.type = {};
        this.type.point1 = {
            image: window.game.getImage("point1"),
            width: 312,
            height: 300,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 312, 300]
            }]
        };
        this.type.point2 = {
            image: window.game.getImage("point2"),
            width: 325,
            height: 465,
            speedY: 1,
            position: "right",
            frames: [{
                rect: [0, 0, 325, 465]
            }]
        };
        this.type.point3 = {
            image: window.game.getImage("point3"),
            width: 248,
            height: 345,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 248, 345]
            }]
        };
        this.type.point4 = {
            image: window.game.getImage("point4"),
            width: 328,
            height: 260,
            speedY: 1,
            position: "right",
            frames: [{
                rect: [0, 0, 328, 260]
            }]
        };
        this.type.point5 = {
            image: window.game.getImage("point5"),
            width: 318,
            height: 314,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 318, 314]
            }]
        };
        this.type.point6 = {
            image: window.game.getImage("point6"),
            width: 313,
            height: 387,
            speedY: 1,
            position: "right",
            frames: [{
                rect: [0, 0, 313, 387]
            }]
        };
        this.type.point7 = {
            image: window.game.getImage("point7"),
            width: 318,
            height: 470,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 318, 470]
            }]
        };
        this.type.point8 = {
            image: window.game.getImage("point8"),
            width: 311,
            height: 446,
            speedY: 1,
            position: "right",
            frames: [{
                rect: [0, 0, 311, 446]
            }]
        };
        this.type.point9 = {
            image: window.game.getImage("point9"),
            width: 320,
            height: 288,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 320, 288]
            }]
        };
        this.type.point10 = {
            image: window.game.getImage("point10"),
            width: 294,
            height: 378,
            speedY: 1,
            position: "right",
            frames: [{
                rect: [0, 0, 294, 378]
            }]
        };
        this.type.point11 = {
            image: window.game.getImage("point11"),
            width: 373,
            height: 441,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 373, 441]
            }]
        };
        this.type.point12 = {
            image: window.game.getImage("point12"),
            width: 333,
            height: 385,
            speedY: 1,
            position: "right",
            frames: [{
                rect: [0, 0, 333, 385]
            }]
        };
        this.type.point13 = {
            image: window.game.getImage("point13"),
            width: 278,
            height: 421,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 278, 421]
            }]
        };
        this.type.point14 = {
            image: window.game.getImage("point14"),
            width: 268,
            height: 349,
            speedY: 1,
            groupWidth: 520,
            position: "left",
            frames: [{
                rect: [0, 0, 268, 349]
            }]
        };
        this.type.point15 = {
            image: window.game.getImage("point14"),
            width: 252,
            height: 349,
            speedY: 1,
            groupWidth: 520,
            position: "right",
            frames: [{
                rect: [388, 0, 252, 349]
            }]
        };
        this.type.point16 = {
            image: window.game.getImage("point15"),
            width: 327,
            height: 246,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 327, 246]
            }]
        };
        this.type.point17 = {
            image: window.game.getImage("point16"),
            width: 294,
            height: 279,
            speedY: 1,
            position: "right",
            frames: [{
                rect: [0, 0, 294, 279]
            }]
        };
        this.type.point18 = {
            image: window.game.getImage("point17"),
            width: 372,
            height: 184,
            speedY: 1,
            position: "left",
            frames: [{
                rect: [0, 0, 372, 184]
            }]
        };
        this.typeList = [[this.type.point1], [this.type.point2], [this.type.point3], [this.type.point4], [this.type.point5], [this.type.point6], [this.type.point7], [this.type.point8], [this.type.point9], [this.type.point10], [this.type.point11], [this.type.point12], [this.type.point13], [this.type.point14, this.type.point15], [this.type.point16], [this.type.point17]]
    }
})();
