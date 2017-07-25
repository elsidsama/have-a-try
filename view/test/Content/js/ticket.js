//$(document).ready(function () {
//    $(".reduce_part").on("click", function () {
//        $(".reduce_box").fadeIn(100);
//    })
//    $(".reduce_box .closes").on("click", function () {
//        $(".reduce_box").fadeOut(100);
//    })
//    $(".reduce_box .left_btn i").on("click", function () {
//        if (!$(this).hasClass("now")) {
//            $(".reduce_box .left_btn i").removeClass("now");
//            $(this).addClass("now");
//        }
//    })
//    $(".reduce_box .confirm").on("click", function () {

//    })
//})


//ConfirmInfo
function bindticket() {
    $(".reduce_part").on("click", function () {

        $(".reduce_box").fadeIn(100);
    })
    $(".reduce_box .closes").on("click", function () {

        $("#hidCash").val("");
        $("#hidCode").val("");
        $("#hidCount").val("");

        $(".reduce_box").fadeOut(100);
    })
    $(".reduce_box .ticket_box").on("click", function () {
        if ($(this).hasClass("unable")) {
            return;
        }else if (!$(this).hasClass("now")) {
            $(".reduce_box .ticket_box").removeClass("now");
            $(this).addClass("now");

            var code = $(this).attr("data-code");
            var cash = $(this).attr("data-cash");
            var count = $(this).attr("data-count");

            $("#hidCash").val(cash);
            $("#hidCode").val(code);
            $("#hidCount").val(count);
        }
        else {
            $(this).removeClass("now");

            $(".price_r").html('');
            var totalpay = $("#txtCount").val();
            $("#payInfo").html(totalpay);

            $("#hidCash").val("");
            $("#hidCode").val("");
            $("#hidCount").val("");
        }
    })

    $(".reduce_box .confirm").on("click", function () {

        var totalpay = $("#txtCount").val();
        var cash = $("#hidCash").val();

        if (cash != "") {

            var info = " - &yen" + cash;
            $(".price_r").html(info);

            var needPay = parseFloat(totalpay) - parseFloat(cash);
            $("#payInfo").html(needPay);
        }

        $(".reduce_box").fadeOut(100);


    })

}



//PayPurchase
function bindticket2() {
    $(".reduce_part").on("click", function () {

        $(".reduce_box").fadeIn(100);
    })
    $(".reduce_box .closes").on("click", function () {

        $("#hidCash").val("");
        $("#hidCode").val("");
        $("#hidCount").val("");

        $(".reduce_box").fadeOut(100);
    })
    $(".reduce_box .ticket_box").on("click", function () {
        if ($(this).hasClass("unable")) {
            return;
        }else if (!$(this).hasClass("now")) {
            $(".reduce_box .ticket_box").removeClass("now");
            $(this).addClass("now");

            var code = $(this).attr("data-code");
            var cash = $(this).attr("data-cash");
            var count = $(this).attr("data-count");

            $("#hidCash").val(cash);
            $("#hidCode").val(code);
            $("#hidCount").val(count);
        }
        else {
            $(this).removeClass("now");

            $(".price_r").html('');
            var totalpay = $("#txtCount").val();
            $("#payInfo").html(totalpay);

            $("#hidCash").val("");
            $("#hidCode").val("");
            $("#hidCount").val("");
        }
    })
    $(".reduce_box .confirm").on("click", function () {

        var totalpay = $("#txtCount").val();
        var cash = $("#hidCash").val();

        if (cash != "") {
            var info = " - &yen" + cash;
            $(".price_r").html(info);

            var needPay = parseFloat(totalpay) - parseFloat(cash);
            $("#payInfo").html(needPay);

        }

        $(".reduce_box").fadeOut(100);


    })

}