//create by charles 2016-11-11
//var max = new Date("2016", "11", 0).getDate();
//var day = new Date("2016", "11", "1").getDay();
//var week = ["日", "一", "二", "三", "四", "五", "六"];

//alert(week[new Date("2016-11-01").getDay()]);
function Calendar(params) {
   
    $("#flight2").append("<div class=\"ul-box\"><div class=\"ul-head\"><ul><li>日<\/li><li>一<\/li><li>二<\/li><li>三<\/li><li>四<\/li><li>五<\/li><li>六<\/li><\/ul><\/div><div class=\"ul-body\"><\/div></div>");

    var data = params.split('|');
    $.each(data, function (i,name) {

        $(name).bind("click", function () {

            var name2 = $("#calendarName").val();

            if (name2 == "firstCa") {
                $("#flight1").css("display", "none");
                $("#flight2").css("display", "block");

            } else {
                $("#flight3").css("display", "none");
                $("#flight2").css("display", "block");
            }

            getCalendar(name);
            $(".ul-box").css("display", "block");
        });

    })


}
function getCalendar(a) {
    var selectValue = $(a).val();
    
    var result = "";
    var t = new Date().getDate();

    var ii = 0;
    for (j = 0; j < 6; j++) {
        var myDate = new Date();
        myDate.setMonth(myDate.getMonth() + j+1,0);
        //alert(myDate.toLocaleString());
        //var f = new Date(myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-01").getDay();
        myDate.setDate(1);
        var f = myDate.getDay();
        var max = new Date(myDate.getFullYear(), (myDate.getMonth() + 1), 0).getDate();
        result += "<div>" + myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月</div><ul>";

        for (i = 0; i < max + f; i++) {
            //if (j == 0 && i < t + f + 3) { }
            //else {
            //    ii++;
            //}

            if (i < f) {
                result += "<li></li>";
            }
            else {
                var dn = myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + "-" + ((i - f + 1) < 10 ? '0' + (i - f + 1) : (i - f + 1));
                var temp = "" + (i - f + 1) + "";
                if ((i - f + 1) < 10) {
                    temp = "&nbsp;" + (i - f + 1) + "&nbsp;";
                }
                if (j == 0 && i == t + f - 1) {
                    result += "<li><span class='ul-old'>" + temp + "<span></li>";
                }
                else {
                    if (selectValue == dn) {
                        result += "<li><span class='ul-select' onclick=\"selectDate('" + a + "','" + dn + "')\">" + temp + "</span></li>";
                    }
                    else {
                        if (j == 0 && i < t + f) {
                            result += "<li><span class='ul-old'>" + temp + "</span></li>";
                        }
                        else {
                            ii++;
                            result += "<li><span onclick=\"selectDate('" + a + "','" + dn + "')\">" + temp + "</span></li>";
                        }
                    }

                }
            }
        }

        result += "</ul>";
    }
    
    $(".ul-body").html(result)
}

function selectDate(a, dn) {

    $(a).val(dn);
    $("#txtDate").val(dn);

    var name = $("#calendarName").val();

    if (name == "firstCa") {

        $(".contain_title span").html("投保信息");
        $(".contain_title2 span").html("输入身份信息和航班信息");
        $(".contain_flag div").css("background-color", "#ff6c63");

        $("#flight1").css("display", "block");
        $("#flight2").css("display", "none");

    } else {

        $(".contain_title span").html("航班查询");
        $(".contain_title2 span").html("选择起飞城市和到达城市");
        $(".contain_flag div").css("background-color", "#ff6c63");

        $("#flight3").css("display", "block");
        $("#flight2").css("display", "none");
    }

   $(".ul-box").css("display", "none");

}

