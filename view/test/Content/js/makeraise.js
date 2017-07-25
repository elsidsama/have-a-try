

//筛选航班
function SelectFlight() {
    $("#txtDt").change(function () {

        var dt = $('#txtDt option:selected').val();
        var hs = $('#txtHs option:selected').val();

        if (dt != "0") {

            $('.lstFlight a').each(function (n, v) {

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
            $('.lstFlight a').each(function (n, v) {
                $(this).removeClass("hide");
                if (hs != "") {
                    if ($(this).attr("data-hs") != hs) {

                        $(this).addClass("hide");
                    }
                }
            })
        }

        $('.lstFlight').scrollTop(1);
    });


    $("#txtHs").change(function () {

        var hs = $('#txtHs option:selected').val();
        var dt = $('#txtDt option:selected').val();
        if (hs != "") {
            $('.lstFlight a').each(function (n, v) {
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

            $('.lstFlight a').each(function (n, v) {
                $(this).removeClass("hide");
                if (dt != "0") {
                    if ($(this).attr("data-time") != dt) {
                        $(this).addClass("hide");
                    }
                }
            });
        }

        $('.lstFlight').scrollTop(1);
    });
}


function showDetail() {
    var id = $("#hid_InsID").val();
    window.location.href = "/FlightIns/SharePurchase?policyID=" + id;
}


//主页面显示控制
function showCitys() {

    $(".contain_title span").html("航班查询");
    $(".contain_title2 span").html("选择出发、到达城市和起飞日期");

    $("#flight1").css("display", "none");
    $("#flight3").css("display", "block");
}


//获取航班数据
function getflight() {

    var startCode = $("#startCode").val();
    var endCode = $("#endCode").val();
    var txtDate = $("#txtDate").val();

    if (startCode == endCode) {

        $(".jzui_title").html("提示");
        $(".jzui_dialog_body").html("出发和到达城市不能为同一城市");
        var btmInfo = " <a href=\"javascript:void(0)\" onclick=\"hideDetail()\" class=\" \">确定</a>";
        $(".jzui_dialog_ft").html(btmInfo);

        $("#loadDialog").css("display", "block");

        return;
    }

    $("#loadingToast").css("display", "block");

    $.ajax({
        url: "/app/GetFlightData.ashx?startCode=" + startCode + "&endCode=" + endCode + "&txtDate=" + txtDate,
        type: "GET",
        success: function (res) {

            loadFlight(res);
        },
        error: function () {
            $("#loadDialog").css("display", "none");

            $(".jzui_title").html("加载超时");
            $(".jzui_dialog_body").html("系统君发了个呆，请稍候再试");
            var btmInfo = "<a href=\"javascript:void(0)\" onclick=\"hideDetail()\" class=\" \">确定</a>";
            $(".jzui_dialog_ft").html(btmInfo);

        }

    })
    $('.bottomDiv').css("display", "block");

}

function msgHide(m) {
    $("#msg").html(m);
    $("#msg").css("display", "block");
    $("#msg").fadeOut(3000);;
}

//选择出发到达城市按钮事件
function selectCity(inputName) {

    $("#flight3").css("display", "none");
    $("#flight5").css("display", "block");
    $("#flight6").css("display", "block");

    $("#hidCity").val(inputName);

    $(".contain_title span").html("城市选择");
    $(".contain_title2 span").html("选择起飞城市和到达城市");
    $(".contain_flag div").css("background-color", "#ffc400");

    getcity(inputName, "hotcity", "allcity")

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

//加载查询的航班号信息
function loadFlight(res) {

    if (res == "") {
        $("#loadingToast").css("display", "none");
        msgHide("没有查到可投保的航班!");

        return false;
    }

    $(".contain_title span").html("航班列表");
    $(".contain_title2 span").html("选择乘坐的航班");
    $(".contain_flag div").css("background-color", "#ffc400");

    $("#flight3").css("display", "none");
    $("#flight4").css("display", "block");

    var data = eval(res);
    var content = "";
    var arrayTm = [];
    var arrayHs = [];

    $.each(data, function (n, obj) {

        content += "<a class=\"link\" data-hs=\"" + obj.Hs + "\" data-time=\"" + obj.Time + "\" href=\"javascript:void(0)\" onclick=\"GetFlightNo('" + obj.flightNo + "')\">";
        content += "<table class=\"flight\">";
        content += "<tr><td class=\"fno\">" + obj.flightNo + "</td> <td class=\"stime\">" + obj.orgTime + "</td><td class=\"mplane\" valign=\"bottom\" ><img src=\"/Content/images/f_plane.png\" class=\"planeImg\" /></td><td class=\"etime\">" + obj.DstTime + "<td class=\"fimg\"><img src=\"" + obj.ImgUrl + "\" class=\"hsImg\" /></td></tr>";
        content += "<tr><td></td> <td class=\"stime2\">起飞</td><td></td><td class=\"etime2\">到达</td><td class=\"fimg2\">" + obj.HsName + "</td></tr>";
        content += "</table></a>";

        arrayHs.push(obj.Hs + " " + obj.HsName);
        arrayTm.push(obj.Time);
    })

    $("#loadingToast").css("display", "none");
    $("#divlstflight").html(content);

    var ret = [];
    var ret2 = [];

    for (var i = 0; i < arrayHs.length; i++) {
        if (ret.indexOf(arrayHs[i]) == -1) {
            ret.push(arrayHs[i]);
        }
    }
    for (var i = 0; i < arrayTm.length; i++) {
        if (ret2.indexOf(arrayTm[i]) == -1) {
            ret2.push(arrayTm[i]);
        }
    }

    ret.sort
    ret2.sort(function (a, b) {
        return a - b
    });

    var lstHs = "<option value=\"\">不限</option>";
    for (var i in ret) {
        lstHs += "<option value=\"" + ret[i].substr(0, 2) + "\">" + ret[i] + "</option>";
    }

    var lstTime = "<option value=\"0\">不限</option>";
    for (var i in ret2) {
        lstTime += GetHsTime(ret2[i]);
    }

    $("#txtHs").html(lstHs);
    $("#txtDt").html(lstTime);
}



function GetHsTime(num) {

    if (num == "1")
        return "<option value=\"1\">08:00~08:59</option>";
    if (num == "2")
        return "<option value=\"2\">09:00~09:59</option>";
    if (num == "3")
        return "<option value=\"3\">10:00~10:59</option>";
    if (num == "4")
        return "<option value=\"4\">11:00~11:59</option>";
    if (num == "5")
        return "<option value=\"5\">12:00~12:59</option>";
    if (num == "6")
        return "<option value=\"6\">13:00~13:59</option>";
    if (num == "7")
        return "<option value=\"7\">14:00~14:59</option>";
    if (num == "8")
        return "<option value=\"8\">15:00~15:59</option>";
    if (num == "9")
        return "<option value=\"9\">16:00~16:59</option>";
    if (num == "10")
        return "<option value=\"10\">17:00~17:59</option>";
    if (num == "11")
        return "<option value=\"11\">18:00~18:59</option>";
    if (num == "12")
        return "<option value=\"12\">19:00~19:59</option>";
    if (num == "13")
        return "<option value=\"13\">20:00~20:59</option>";
    if (num == "14")
        return "<option value=\"14\">21:00~21:59</option>";
    if (num == "15")
        return "<option value=\"15\">22:00~22:59</option>";
    if (num == "16")
        return "<option value=\"16\">23:00~07:59</option>";

}






function GetFlightNo(flightNo) {

    $("#txtFlightNo").val(flightNo);
    var date = $("#txtDate").val();
    $("#txtFlightDate").val(date);

    $(".contain_title span").html("投保信息");
    $(".contain_title2 span").html("输入身份信息和航班信息");
    $(".contain_flag div").css("background-color", "#ff6c63");

    $("#flight4").css("display", "none");
    $("#flight1").css("display", "block");

}


function msgShow(id) {

    if (id == 13) {
        $(".body_title").html("投保须知");
    }
    else if (id == 15) {
        $(".body_title").html("众众保用户协议");
    }

    $.ajax({
        url: "/app/GetAgreement.ashx?id=" + id,
        type: "POST",
        cache: false,
        dataType: "html",
        success: function (result) {
            $(".body_content").html(result);
        },
        error: function () {

        }
    });

    $("#flight7").css("display", "block");
    $('.body_content').scrollTop(1);

}

function closeMsg() {
    $("#flight7").css("display", "none");

}