



function loadHs(params, ulId) {
    $(params).keyup(function () {

        var no = $(params).val();
        var regno = /^[0-9]{0,}$/;

        if (regno.test(no) && no != "") {
            var lstHs = ["MU", "CA", "CZ", "SZ", "3U", "OQ", "MF", "KN", "EU", "FM", "ZH", "KY", "TV", "SC", "HU", "CN", "8L", "GS", "JD", "PN", "HO", "9C", "NS", "8C", "VD", "G5", "BK", "9H", "DR", "GY", "GX", "UQ", "GJ", "DZ", "JR", "AQ", "FU", "GT", "QW", "RY", "Y8"];

            var content = "";
            $.each(lstHs, function (n, v) {

                content += "<li><a href=\"javascript:void(0)\" onclick=\"setHs('" + params + "','" + v + no + "')\" >" + v + no + "</li>";
            })

            $(ulId).html(content);
            $(".ul_info").css("display", "block");
        } else
            $(".ul_info").css("display", "none");
           

    })
}


function setHs(n, v) {

 
    var no = v.toUpperCase();
    $(n).val(no);

    $(".ul_info").css("display", "none");

}
