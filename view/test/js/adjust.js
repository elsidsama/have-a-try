/**
 * Created by jyy on 2017/4/17.
 */
(function () {
    var body = $("body");
    var size = function () {
        var s_width = $(window).width();
        if (s_width > 750) {
            s_width = 750
        }
        body.css({
            width: s_width
        });
        $("html").css({
            "font-size": 20 * (s_width / 375)
        });
        body.show();
    }
    ;
    size();


})();