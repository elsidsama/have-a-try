/**
 * Created by jzinfo on 2017/3/27.
 */
/**
 * Created by Administrator on 2016/6/17.
 */
(function () {
    var page_x=0,
        end_x= 0,
        speed=Speed||1000,
        list=["-210%","-280%","-350%","-420%"],
        num=0;
    //$('body').on('touchmove', function (event) {
    //    event.preventDefault();
    //});
    //var change=80;
    if(!$('.lists').hasClass("one")){
        num=parseInt($('.lists').attr("data-id"));
        if(num>1){
            var innerstr="<li class='now'></li>";
            for (var i = 0; i < num-1; i++) {
                innerstr+="<li></li>";
            }
            $(".point").html(innerstr);
            $($('.lists li')[2]).addClass("tab_now");
            swift(num);
        }else if($('.lists li')&&$('.lists li').length==1){
            $($('.lists li')[0]).addClass("tab_now");
        }
    }
    function swift(){
        $('.lists').on('touchstart',function(e) {
            e.preventDefault();
            var _touch = e.originalEvent.targetTouches[0];
            var _x= _touch.pageX;
            page_x=_x;
            end_x=_x;
            //alert(_x)
        });
        $('.lists').on('touchmove',function(e) {
            e.preventDefault();
            var _touch = e.originalEvent.targetTouches[0];
            var _x= _touch.pageX;
            end_x=_x;
            //alert(_x)
        });
        $('.lists li').on('touchend',function(e) {
            e.preventDefault();
            if(!$('.lists').hasClass("running")){
                if(end_x<page_x){
                    var index=$(".point .now").index();
                    var len=$(".point li").length;
                    if(index<len-1){
                        $('.lists').addClass("running");
                        $($(".point li")[index]).toggleClass("now",speed);
                        $($(".point li")[index+1]).toggleClass("now",speed);
                        $($(".lists li")[index+2]).toggleClass("tab_now",speed);
                        $($(".lists li")[index+3]).toggleClass("tab_now",speed);
                        $(".lists").animate({left:"-=70%"},speed,function(){$('.lists').removeClass("running")});
                    }else{
                        $('.lists').addClass("running");
                        $($(".point li")[index]).toggleClass("now",speed);
                        $($(".point li")[0]).toggleClass("now",speed);
                        $($(".lists li")[index+2]).toggleClass("tab_now",speed);
                        $($(".lists li")[index+3]).toggleClass("tab_now",speed);
                        $($(".lists li")[2]).toggleClass("tab_now",speed);
                        $(".lists").animate({left:"-=70%"},speed,function(){$('.lists').removeClass("running").css("left","-140%");$($(".lists li")[index+3]).removeClass("tab_now");});
                    }
                }else if(end_x>page_x){
                    var index=$(".point .now").index();
                    //var len=$(".lists li").length;
                    if(index>0){
                        $('.lists').addClass("running");
                        $($(".point li")[index]).toggleClass("now",speed);
                        $($(".point li")[index-1]).toggleClass("now",speed);
                        $($(".lists li")[index+2]).toggleClass("tab_now",speed);
                        $($(".lists li")[index+1]).toggleClass("tab_now",speed);
                        $(".lists").animate({left:"+=70%"},speed,function(){$('.lists').removeClass("running")});
                    }else{
                        $('.lists').addClass("running");
                        $($(".point li")[index]).toggleClass("now",speed);
                        $($(".point li")[num-1]).toggleClass("now",speed);
                        $($(".lists li")[index+2]).toggleClass("tab_now",speed);
                        $($(".lists li")[index+1]).toggleClass("tab_now",speed);
                        $($(".lists li")[num+1]).toggleClass("tab_now",speed);
                        $(".lists").animate({left:"+=70%"},speed,function(){$('.lists').removeClass("running").css("left",list[num-2]);$($(".lists li")[index+1]).removeClass("tab_now");});
                    }
                }else{
                    alert(1);
                }
            }
        });
    }
    var canva_body = document.getElementById("round_canvas");
    var cxt = canva_body.getContext("2d");
    cxt.beginPath();
    cxt.moveTo(5,0);
    cxt.lineTo(200,0);
    cxt.lineTo(120,600);
    cxt.lineTo(0,110);
    var grad = cxt.createLinearGradient(0,0,0,600);
    grad.addColorStop(0,'rgba(26,169,123,0.85)');
    grad.addColorStop(1,'rgba(255,255,255,0)');
    cxt.fillStyle = grad;
    cxt.fill();
    cxt.lineWidth = 3;
    cxt.strokeStyle = "#dedede";
    cxt.stroke();
    cxt.closePath();
})();