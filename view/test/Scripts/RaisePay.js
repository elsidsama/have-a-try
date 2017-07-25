
function add() {

    var count = $("#txtCount").val();
    var remainNum = $("#hidMax").val();

    var count2 = parseInt(count);
    var remainNum2 = parseInt(remainNum);

    if (count2 < remainNum2)
        count2++;
    else
        count2 = remainNum2;

    var content = "航班延误3小时，可获得" + count2 * 7.5 + "元理赔";
    var money = "立即支付&nbsp;&nbsp;<span style=\"color:#ff833f\">￥" + count2 + "</span>";

    $("#btnPay").html(money);
    $("#countinfo").html(content);
    $("#txtCount").val(count2);
}

function subtract() {

    var count = $("#txtCount").val();

    if (count == 1)
        count = 1;
    else {
        count--;
    }


    var content = "航班延误3小时，可获得" + count * 7.5 + "元理赔";
    var money = "立即支付&nbsp;&nbsp;<span style=\"color:#ff833f\">￥" + count + "</span>";

    $("#countinfo").html(content);
    $("#txtCount").val(count);
    $("#btnPay").html(money);
}


function joinRaise() {

    window.open("/FlightIns/MakeRaise", "_top");
}

function showshare() {

    $("#contain2").css("display", "block");

}

function hideshare() {

    $("#contain2").css("display", "none");
}

//function purchase() {


//    $(".purchaseDiv").css("display", "block");
//    $(".contain4").css("display", "block");
//}

function purchase2() {

    $(".purchaseDiv").css("display", "none");
    $(".contain4").css("display", "none");
}



//提交数据的提示功能
function msgHide(m) {
    $("#msg").html(m);
    $("#msg").css("display", "block");
    $("#msg").fadeOut(2000);
}



