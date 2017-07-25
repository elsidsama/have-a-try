


//投保须知
function msgShow(type) {

    $(".ins-reg-msg").css("display", "block");
    if (type == "a") {
        $("#ins-msg-head").html("投保须知");
        $.ajax({
            url: "/app/GetAgreement.ashx?id=3",
            type: "POST",
            cache: false,
            dataType: "html",
            success: function (result) {
                $(".ins-reg-mcontent").html(result);
            },
            error: function () {

            }
        });
    }
    if (type == "b") {
        $("#ins-msg-head").html("保险条款");
        $.ajax({
            url: "/app/GetAgreement.ashx?id=4",
            type: "POST",
            cache: false,
            dataType: "html",
            success: function (result) {
                $(".ins-reg-mcontent").html(result);
            },
            error: function () {

            }
        });
    }

}


//主页面显示控制
function showCitys() {
    //window.location.href = window.location.href + "?rd=v1";
    $("#flightID1").css("display", "none");
    $("#flightID2").css("display", "block");

}



function msgHide(m) {
    $("#msg").html(m);
    $("#msg").css("display", "block");
    $("#msg").fadeOut(3000);;
}



function hideDetail() {

    $("#loadDialog").css("display", "none");
}



function showDetail() {
    var id = $("#hid_InsID").val();
    window.location.href = "/FlightDelay/OrderDetail?policyID=" + id;

}




//投保须知  关闭
function regclose() {
    $(".ins-reg-msg").css("display", "none");
}


//城市对页面
function LoadCitys() {

    //加载日历
    Calendar("#txtDate");

    //选择城市顶部清除事件
    $("#txtCity").keyup(function () {

        $("#btnclear").css("display", "block");
    });


}


//切换城市按钮事件
function selectCity(inputName) {

    $("#flightID2").css("display", "none");
    $("#divCity").css("display", "block");

    $("#hidCity").val(inputName);
    getcity2(inputName, "hotcity", "allcity")

}

//城市互换操作
function exchange() {

    var scity = $("#startCity").val();
    var ecity = $("#depCity").val();

    var scode = $("#startCode").val();
    var ecode = $("#endCode").val();

    $("#startCity").val(ecity);
    $("#depCity").val(scity);

    $("#startCode").val(ecode);
    $("#endCode").val(scode);

}


//选择城市顶部清除操作
function clearCity() {

    $("#txtCity").val('');
    $("#btnclear").css("display", "none");
}



function SelectFlight()
{
    $("#txtDt").change(function () {

        var dt = $('#txtDt option:selected').val();
        var hs = $('#txtHs option:selected').val();

        if (dt != "0") {
            $('.contain5 a').each(function () {

                $(this).removeClass("hide");

                if (hs != "") {

                    if ($(this).attr("data-time") != dt || $(this).attr("data-hs") != hs) {

                        $(this).addClass("hide");
                    }
                }
                else {
                    if ($(this).attr("data-time") != dt) {

                        $(this).addClass("hide");
                    }
                }
            })

        }
        else {
            $('.contain5 a').each(function () {

                $(this).removeClass("hide");

                if (hs != "") {
                    if ($(this).attr("data-hs") != hs) {

                        $(this).addClass("hide");
                    }
                }

            })
        }
    });



    $("#txtHs").change(function () {

        var hs = $('#txtHs option:selected').val();
        var dt = $('#txtDt option:selected').val();

        if (hs != "") {
            $('.lstFlight a').each(function () {
                $(this).removeClass("hide");

                if (dt != "0") {

                    if ($(this).attr("data-hs") != hs || $(this).attr("data-time") != dt) {

                        $(this).addClass("hide");
                    }

                }
                else {
                    if ($(this).attr("data-hs") != hs) {

                        $(this).addClass("hide");
                    }
                }
            });
        } else {

            $('.lstFlight a').each(function () {
                $(this).removeClass("hide");

                if (dt != "0") {

                    if ($(this).attr("data-time") != dt) {

                        $(this).addClass("hide");
                    }
                }
            });
        }
    });



}



//获取航班数据
function GetFlightData() {

    var startCode = $("#startCode").val();
    var endCode = $("#endCode").val();
    var txtDate = $("#txtDate").val();

    if (startCode == endCode)
    {

        $(".weui_dialog_title").html("提示");
        $(".weui_dialog_bd").html("出发和到达城市不能为同一城市");
        var btmInfo = " <a href=\"#\" onclick=\"hideDetail()\" class=\"weui_btn_dialog weui_bg \">确定</a>";
        $(".weui_dialog_ft").html(btmInfo);

        $("#loadDialog").css("display", "block");

        return;
    }

    $.ajax({
        url: "/app/GetFlightData.ashx?startCode=" + startCode + "&endCode=" + endCode + "&txtDate=" + txtDate,
        type: "GET",
        success: function (res) {

            loadFlight(res);
        },
        error: function () {

            $(".weui_dialog_title").html("加载超时");
            $(".weui_dialog_bd").html("系统君发了个呆，请稍候再试。");
            var btmInfo = " <a href=\"#\" onclick=\"hideDetail()\" class=\"weui_btn_dialog weui_bg \">确定</a>";
            $(".weui_dialog_ft").html(btmInfo);

            $("#loadDialog").css("display", "block");
        }

    })


}



function loadFlight(res) {

    $("#flightID2").css("display", "none");
    $("#flightID3").css("display", "block");

    var data =eval(res);
    var content = "";

    $.each(data, function (n,obj) {

        content += "<a class=\"link\" data-hs=\"" + obj.Hs + "\" data-time=\"" + obj.Time + "\" href=\"#\" onclick=\"GetFlightNo('" + obj.flightNo + "')\">";
        content +="<table class=\"flight\">";
        content +="<tr><td class=\"fno\">" + obj.flightNo + "</td> <td class=\"stime\">" + obj.orgTime + "</td><td class=\"mplane\"><img src=\"/Content/images/f_plane.png\" class=\"planeImg\" /></td><td class=\"etime\">" + obj.DstTime + "<td class=\"fimg\"><img src=\"" + obj.ImgUrl + "\" class=\"hsImg\" /></td></tr>";
        content += "<tr><td></td> <td class=\"stime2\">起飞</td><td></td><td class=\"etime2\">到达</td><td class=\"fimg2\">" + obj.HsName + "</td></tr>";
        content +="</table> </a>";

    })

    $("#lstFlight").append(content);

   
}


function GetFlightNo(flightNo)
{
    $("#txtFlightNo").val(flightNo);
    var date = $("#txtDate").val();
    $("#txtFlightDate").val(date);

    $("#flightID3").css("display", "none");
    $("#flightID1").css("display", "block");



}
