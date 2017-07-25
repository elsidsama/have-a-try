﻿

function autoshow(inputName) {

    var all_city = get_all_city();

    $(inputName).typeahead({
        source: all_city,
        highlighter: function (item) {

            var city = item.split('|')[1];

            return city;
        },
        updater: function (item) {

            var city = item.split('|')[1];
            var arr = city.split('(');

            var cityName = "";
            var cityCode = "";

            if (arr.length <= 2) {

                cityName = arr[0];
                cityCode = arr[1].substring(0, arr[1].length - 1);

            } else {

                if (arr[1] == "南苑机场)")
                    arr[1] = "南苑";
                else if (arr[1] == "首都国际机场)")
                    arr[1] = "首都";
                else if (arr[1] == "浦东国际机场)")
                    arr[1] = "浦东";
                else if (arr[1] == "虹桥国际机场)")
                    arr[1] = "虹桥";

                cityName = arr[0] + arr[1];
                cityCode = arr[2].substring(0, arr[2].length - 1);

            }

            if ($("#hidCity").val() == "startCity") {

                $("#startCity").val(cityName);
                $("#startCode").val(cityCode);
            }
            else {
                $("#depCity").val(cityName);
                $("#endCode").val(cityCode);
            }


            $(".contain_title span").html("航班查询");
            $(".contain_title2 span").html("根据出发、到达城市和起飞日期，查询航班号");

            $("#flight5").css("display", "none");
            $("#flight6").css("display", "none");
            $("#flight3").css("display", "block");

            return city;
        }
    });
}



function getcity(inputName, hot, all) {

    $("#" + hot).html("");
    $("#" + all).html("");
    $("#txtCity").val('');

    /*加载城市数据列表*/
    var data = citydata;

    $.each(data, function (n, v) {

        var content = "";

        if (n == "热门") {

            var templet = "<div class=\"letter\">" + n + "</div>";
            for (var i = 0; i < v.length; i++) {
                content += "<li><a href=\"javascript:void(0)\" onclick=\"SaveCity('" + inputName + "','" + v[i].data + "')\">" + v[i].display + "</a></li>";
            }

            templet += " <ul class=\"ulCity\">" + content + "</ul>"
            $("#" + hot).append(templet);

        }
        else {

            var templet = "<div id=\"" + n + "\"class=\"letter2\">" + n + "</div>";

            for (var i = 0; i < v.length; i++) {

                content += "<li><a href=\"javascript:void(0)\" onclick=\"SaveCity('" + inputName + "','" + v[i].data + "')\">" + v[i].display + "</a></li>";
            }

            templet += " <ul class=\"ulItem\">" + content + "</ul>"

            $("#" + all).append(templet);

        }

    });

}




function get_all_city() {

    var city = ["Aletai|阿勒泰(AAT)|175|AAT", "Ankang|安康(AKA)|171|AKA", "Akesu|阿克苏(AKU)|173|AKU", "Anshan|鞍山(AOG)|178|AOG", "Anqing|安庆(AQG)|177|AQG", "Anshun|安顺(AVA)|179|AVA", "Alashanzuoqi|阿拉善左旗(AXF)|21269|AXF", "Ali|阿里(NGQ)|97|NGQ", "Alashanyouqi|阿拉善右旗(RHT)|21863|RHT", "Aershan|阿尔山(YIE)|1658|YIE", "Baise|百色(AEB)|1140|AEB", "Baotou|包头(BAV)|141|BAV", "Bijie|毕节(BFJ)|22031|BFJ", "Beihai|北海(BHY)|189|BHY", "Beijing|北京(BJS)|1|BJS", "Beijing(NANYUAN)|北京(南苑机场)(NAY)|1|BJS,NAY", "Beijing(CAPITAL)|北京(首都国际机场)(PEK)|1|BJS,PEK", "Bole|博乐(BPL)|2548|BPL", "Baoshan|保山(BSD)|197|BSD", "Bayannaoer|巴彦淖尔(RLK)|3887|RLK", "Changdu|昌都(BPX)|575|BPX", "Changde|常德(CGD)|201|CGD", "Changchun|长春(CGQ)|158|CGQ", "Chaoyang|朝阳(CHG)|211|CHG", "Chifeng|赤峰(CIF)|202|CIF", "Changzhi|长治(CIH)|137|CIH", "Chongqing|重庆(CKG)|4|CKG", "Changhai|长海(CNI)|5091|CNI", "Changsha|长沙(CSX)|206|CSX", "Chengdu|成都(CTU)|28|CTU", "Changzhou|常州(CZX)|213|CZX", "Chizhou|池州(JUH)|218|JUH", "Changbaishan|长白山(NBS)|199|NBS", "Chaozhou|潮州(SWA)|215|SWA", "Datong|大同(DAT)|136|DAT", "Daxian|达县(DAX)|234|DAX", "Daocheng|稻城(DCY)|1222|DCY", "Dandong|丹东(DDG)|221|DDG", "Diqing|迪庆(DIG)|93|DIG", "Dalian|大连(DLC)|6|DLC", "Dali|大理(DLU)|36|DLU", "Dunhuang|敦煌(DNH)|11|DNH", "Dongying|东营(DOY)|236|DOY", "Daqing|大庆(DQA)|231|DQA", "Delhi|德令哈(HXD)|2542|HXD", "Dehong|德宏(LUM)|365|LUM", "Eerduosi|鄂尔多斯(DSN)|3976|DSN", "Ejinaqi|额济纳旗(EJN)|21339|EJN", "Enshi|恩施(ENH)|245|ENH", "Erlianhaote|二连浩特(ERL)|7626|ERL", "Fuzhou|福州(FOC)|258|FOC", "Fuyang|阜阳(FUG)|257|FUG", "Foshan|佛山(FUO)|251|FUO", "Fuyuan|抚远(FYJ)|21943|FYJ", "Fuyun|富蕴(FYN)|255|FYN", "Guangzhou|广州(CAN)|32|CAN", "Guanghan|广汉(GHN)|750|GHN", "Geermu|格尔木(GOQ)|132|GOQ", "Guangyuan|广元(GYS)|267|GYS", "Guyuan|固原(GYU)|321|GYU", "Ganzhou|赣州(KOW)|268|KOW", "Guiyang|贵阳(KWE)|38|KWE", "Guilin|桂林(KWL)|33|KWL", "Guanghua|光化(LHK)|746|LHK", "Hongyuan|红原(AHJ)|7835|AHJ", "Haikou|海口(HAK)|42|HAK", "Hechi|河池(HCJ)|3969|HCJ", "Handan|邯郸(HDG)|275|HDG", "Heihe|黑河(HEK)|281|HEK", "Huhehaote|呼和浩特(HET)|103|HET", "Hefei|合肥(HFE)|278|HFE", "Hangzhou|杭州(HGH)|17|HGH", "Huaian|淮安(HIA)|577|HIA", "Huaihua|怀化(HJJ)|282|HJJ", "Hailaer|海拉尔(HLD)|142|HLD", "Hami|哈密(HMI)|285|HMI", "Hengyang|衡阳(HNY)|297|HNY", "Haerbin|哈尔滨(HRB)|5|HRB", "Hetian|和田(HTN)|294|HTN", "HUATUGOU|花土沟(HTT)|83679|HTT", "Huizhou Pingtan Airport|惠州(HUZ)|299|HUZ", "Hanzhong|汉中(HZG)|129|HZG", "Huangshan|黄山(TXN)|23|TXN", "Jingdezhen|景德镇(JDZ)|305|JDZ", "Jiagedaqi|加格达奇(JGD)|1143|JGD", "Jiayuguan|嘉峪关(JGN)|326|JGN", "Jinggangshan|井冈山(JGS)|307|JGS", "Jinchang|金昌(JIC)|1158|JIC", "Jiujiang|九江(JIU)|24|JIU", "Jinjiang|晋江(JJN)|1803|JJN", "Jiamusi|佳木斯(JMU)|317|JMU", "Jining|济宁(JNG)|318|JNG", "Jinzhou|锦州(JNZ)|327|JNZ", "Jixi|鸡西(JXA)|157|JXA", "Jiuzhaigou|九寨沟(JZH)|91|JZH", "Jingzhou|荆州(SHS)|328|SHS", "Jieyang|揭阳(SWA)|956|SWA", "Jinan|济南(TNA)|144|TNA", "Kuche|库车(KCA)|329|KCA", "Kangding|康定(KGT)|4130|KGT", "Kashi|喀什(KHG)|109|KHG", "Kaili|凯里(KJH)|333|KJH", "Kanasi|喀纳斯(KJI)|3326|KJI", "Kunming|昆明(KMG)|34|KMG", "Kuerle|库尔勒(KRL)|330|KRL", "Kelamayi|克拉玛依(KRY)|166|KRY", "Liping|黎平(HZH)|3852|HZH", "Longyan|龙岩(LCX)|348|LCX", "Linfen|临汾(LFQ)|139|LFQ", "Lanzhou|兰州(LHW)|100|LHW", "Liangping|梁平(LIA)|427|LIA", "Lijiang|丽江(LJG)|37|LJG", "Libo|荔波(LLB)|1708|LLB", "Lvliang|吕梁(LLV)|7631|LLV", "Lincang|临沧(LNJ)|1236|LNJ", "Liupanshui|六盘水(LPF)|605|LPF", "Lasa|拉萨(LXA)|41|LXA", "Linxi|林西(LXI)|744|LXI", "Luoyang|洛阳(LYA)|350|LYA", "Lianyungang|连云港(LYG)|353|LYG", "Linyi|临沂(LYI)|569|LYI", "Liuzhou|柳州(LZH)|354|LZH", "Luzhou|泸州(LZO)|355|LZO", "Linzhi|林芝(LZY)|108|LZY", "Mangshi|芒市(LUM)|365|LUM", "Mudanjiang|牡丹江(MDG)|150|MDG", "Mianyang|绵阳(MIG)|370|MIG", "Meizhou|梅州(MXZ)|3053|MXZ", "Manzhouli|满洲里(NZH)|1083|NZH", "Mohe|漠河(OHE)|155|OHE", "Nanchang|南昌(KHN)|376|KHN", "Nanchong|南充(NAO)|377|NAO", "Ningbo|宁波(NGB)|375|NGB", "Nanjing|南京(NKG)|12|NKG", "Ninglang|宁蒗(NLH)|1161|NLH", "Nalati|那拉提(NLT)|3360|NLT", "Nanning|南宁(NNG)|380|NNG", "Nanyang|南阳(NNY)|385|NNY", "Nantong|南通(NTG)|82|NTG", "Panzhihua|攀枝花(PZI)|1097|PZI", "Puer|普洱(SYM)|3996|SYM", "Qionghai|琼海(BAR)|52|BAR", "Qinhuangdao|秦皇岛(BPE)|147|BPE", "Qiemo|且末(IQM)|399|IQM", "Qingyang|庆阳(IQN)|404|IQN", "Qianjiang|黔江(JIQ)|7708|JIQ", "Quanzhou|泉州(JJN)|406|JJN", "Quzhou|衢州(JUZ)|407|JUZ", "Qiqihaer|齐齐哈尔(NDG)|149|NDG", "Qingdao|青岛(TAO)|7|TAO", "Rizhao|日照(RIZ)|1106|RIZ", "Rikaze|日喀则(RKZ)|92|RKZ", "Shennongjia|神农架(HPG)|657|HPG", "Shanghai|上海(SHA)|2|SHA", "Shanghai(PU DONG)|上海(浦东国际机场)(PVG)|2|SHA,PVG", "Shanghai(HONGQIAO)|上海(虹桥国际机场)(SHA)|2|SHA,SHA", "Shenyang|沈阳(SHE)|451|SHE", "Shihezi|石河子(SHF)|426|SHF", "Shijiazhuang|石家庄(SJW)|428|SJW", "Sanming|三明(SQJ)|437|SQJ", "Shantou|汕头(SWA)|447|SWA", "Sanya|三亚(SYX)|43|SYX", "Shenzhen|深圳(SZX)|30|SZX", "SHIYAN|十堰(WDS)|452|WDS", "Taizhou|台州(HYN)|578|HYN", "Tacheng|塔城(TCG)|455|TCG", "Tengchong|腾冲(TCZ)|1819|TCZ", "Tongren|铜仁(TEN)|1227|TEN", "Tongliao|通辽(TGO)|458|TGO", "Tianshui|天水(THQ)|464|THQ", "Tulufan|吐鲁番(TLQ)|21811|TLQ", "Tonghua|通化(TNH)|456|TNH", "Tianjin|天津(TSN)|3|TSN", "Tangshan|唐山(TVS)|468|TVS", "Taiyuan|太原(TYN)|105|TYN", "Taizhou|泰州(YTY)|15|YTY", "Wulanhaote|乌兰浩特(HLH)|484|HLH", "ULANQAB|乌兰察布(UCB)|7518|UCB", "Wulumuqi|乌鲁木齐(URC)|39|URC", "Weifang|潍坊(WEF)|475|WEF", "Weihai|威海(WEH)|479|WEH", "Wenshan|文山(WNH)|1342|WNH", "Wenzhou|温州(WNZ)|491|WNZ", "Wuhai|乌海(WUA)|1133|WUA", "Wuhan|武汉(WUH)|477|WUH", "Wuyishan|武夷山(WUS)|26|WUS", "Wuxi|无锡(WUX)|13|WUX", "Wuzhou|梧州(WUZ)|492|WUZ", "Wanzhou|万州(WXN)|487|WXN", "Xingyi|兴义(ACX)|1139|ACX", "Xiahe|夏河(GXH)|497|GXH", "Xishuangbanna|西双版纳(JHG)|35|JHG", "Xian|西安(SIA)|10|SIA", "Xianyang|咸阳(SIA)|10|SIA", "Xinzhou|忻州(WUT)|513|WUT", "Xiangyang|襄阳(XFN)|496|XFN", "Xichang|西昌(XIC)|494|XIC", "Xilinhaote|锡林浩特(XIL)|500|XIL", "Xiamen|厦门(XMN)|25|XMN", "Xining|西宁(XNN)|124|XNN", "Xuzhou|徐州(XUZ)|512|XUZ", "Yanan|延安(ENY)|110|ENY", "Yinchuan|银川(INC)|99|INC", "Yichun|伊春(LDS)|517|LDS", "Yongzhou|永州(LLF)|970|LLF", "Yulin|榆林(UYN)|527|UYN", "Yibin|宜宾(YBP)|514|YBP", "Yuncheng|运城(YCU)|140|YCU", "Yichun|宜春(YIC)|518|YIC", "Yichang|宜昌(YIH)|515|YIH", "Yining|伊宁(YIN)|529|YIN", "Yiwu|义乌(YIW)|536|YIW", "Yingkou|营口(YKH)|1300|YKH", "Yanji|延吉(YNJ)|523|YNJ", "Yantai|烟台(YNT)|533|YNT", "Yancheng|盐城(YNZ)|1200|YNZ", "Yangzhou|扬州(YTY)|15|YTY", "Yushu|玉树(YUS)|7582|YUS", "Zhengzhou|郑州(CGO)|559|CGO", "Zhangjiajie|张家界(DYG)|27|DYG", "Zhoushan|舟山(HSN)|19|HSN", "ZHANGYE AIRPORT|张掖机场(YZY)|663|YZY", "ZHAOTONG|昭通机场(ZAT)|555|ZAT", "Zhongshan|中山(ZGN)|553|ZGN", "ZHANJIANG|湛江机场(ZHA)|547|ZHA", "ZHONGWEI XIANGSHAN|中卫机场(ZHY)|556|ZHY", "Zhangjiakou|张家口(ZQZ)|550|ZQZ", "Zhuhai|珠海(ZUH)|31|ZUH", "Zunyi|遵义(ZYI)|558|ZYI"];

    return city;


}




var citydata = {
    "热门": [
        {
            "display": "北京",
            "data": "Beijing|北京(BJS)|1|BJS"
        },
        {
            "display": "上海",
            "data": "Shanghai|上海(SHA)|2|SHA"
        },
        {
            "display": "广州",
            "data": "Guangzhou|广州(CAN)|32|CAN"
        },
        {
            "display": "深圳",
            "data": "Shenzhen|深圳(SZX)|30|SZX"
        },
        {
            "display": "成都",
            "data": "Chengdu|成都(CTU)|28|CTU"
        },
        {
            "display": "杭州",
            "data": "Hangzhou|杭州(HGH)|17|HGH"
        },
        {
            "display": "武汉",
            "data": "Wuhan|武汉(WUH)|477|WUH"
        },
        {
            "display": "西安",
            "data": "Xian|西安(SIA)|10|SIA"
        },
        {
            "display": "重庆",
            "data": "Chongqing|重庆(CKG)|4|CKG"
        },
        {
            "display": "青岛",
            "data": "Qingdao|青岛(TAO)|7|TAO"
        },
        {
            "display": "长沙",
            "data": "Changsha|长沙(CSX)|206|CSX"
        },
        {
            "display": "南京",
            "data": "Nanjing|南京(NKG)|12|NKG"
        },
        {
            "display": "厦门",
            "data": "Xiamen|厦门(XMN)|25|XMN"
        },
        {
            "display": "昆明",
            "data": "Kunming|昆明(KMG)|34|KMG"
        },
        {
            "display": "大连",
            "data": "Dalian|大连(DLC)|6|DLC"
        },
        {
            "display": "天津",
            "data": "Tianjin|天津(TSN)|3|TSN"
        },
        {
            "display": "郑州",
            "data": "Zhengzhou|郑州(CGO)|559|CGO"
        },
        {
            "display": "三亚",
            "data": "Sanya|三亚(SYX)|43|SYX"
        },
        {
            "display": "济南",
            "data": "Jinan|济南(TNA)|144|TNA"
        },
        {
            "display": "福州",
            "data": "Fuzhou|福州(FOC)|258|FOC"
        }
    ],
    "A": [
        {
            "display": "阿勒泰",
            "data": "Aletai|阿勒泰(AAT)|175|AAT"
        },
        {
            "display": "安康",
            "data": "Ankang|安康(AKA)|171|AKA"
        },
        {
            "display": "阿克苏",
            "data": "Akesu|阿克苏(AKU)|173|AKU"
        },
        {
            "display": "鞍山",
            "data": "Anshan|鞍山(AOG)|178|AOG"
        },
        {
            "display": "安庆",
            "data": "Anqing|安庆(AQG)|177|AQG"
        },
        {
            "display": "安顺",
            "data": "Anshun|安顺(AVA)|179|AVA"
        },
        {
            "display": "阿拉善左旗",
            "data": "Alashanzuoqi|阿拉善左旗(AXF)|21269|AXF"
        },
        {
            "display": "阿里",
            "data": "Ali|阿里(NGQ)|97|NGQ"
        },
        {
            "display": "阿拉善右旗",
            "data": "Alashanyouqi|阿拉善右旗(RHT)|21863|RHT"
        },
        {
            "display": "阿尔山",
            "data": "Aershan|阿尔山(YIE)|1658|YIE"
        }],
    "B": [
        {
            "display": "百色",
            "data": "Baise|百色(AEB)|1140|AEB"
        },
        {
            "display": "包头",
            "data": "Baotou|包头(BAV)|141|BAV"
        },
        {
            "display": "毕节",
            "data": "Bijie|毕节(BFJ)|22031|BFJ"
        },
        {
            "display": "北海",
            "data": "Beihai|北海(BHY)|189|BHY"
        },
        {
            "display": "北京",
            "data": "Beijing|北京(BJS)|1|BJS"
        },
        {
            "display": "北京(南苑机场)",
            "data": "Beijing(NANYUAN)|北京(南苑机场)(NAY)|1|BJS,NAY"
        },
        {
            "display": "北京(首都国际机场)",
            "data": "Beijing(CAPITAL)|北京(首都国际机场)(PEK)|1|BJS,PEK"
        },
        {
            "display": "博乐",
            "data": "Bole|博乐(BPL)|2548|BPL"
        },
        {
            "display": "保山",
            "data": "Baoshan|保山(BSD)|197|BSD"
        },
        {
            "display": "巴彦淖尔",
            "data": "Bayannaoer|巴彦淖尔(RLK)|3887|RLK"
        }],
    "C": [
        {
            "display": "昌都",
            "data": "Changdu|昌都(BPX)|575|BPX"
        },
        {
            "display": "常德",
            "data": "Changde|常德(CGD)|201|CGD"
        },
        {
            "display": "长春",
            "data": "Changchun|长春(CGQ)|158|CGQ"
        },
        {
            "display": "朝阳",
            "data": "Chaoyang|朝阳(CHG)|211|CHG"
        },
        {
            "display": "赤峰",
            "data": "Chifeng|赤峰(CIF)|202|CIF"
        },
        {
            "display": "长治",
            "data": "Changzhi|长治(CIH)|137|CIH"
        },
        {
            "display": "重庆",
            "data": "Chongqing|重庆(CKG)|4|CKG"
        },
        {
            "display": "长海",
            "data": "Changhai|长海(CNI)|5091|CNI"
        },
        {
            "display": "长沙",
            "data": "Changsha|长沙(CSX)|206|CSX"
        },
        {
            "display": "成都",
            "data": "Chengdu|成都(CTU)|28|CTU"
        },
        {
            "display": "常州",
            "data": "Changzhou|常州(CZX)|213|CZX"
        },
        {
            "display": "池州",
            "data": "Chizhou|池州(JUH)|218|JUH"
        },
        {
            "display": "长白山",
            "data": "Changbaishan|长白山(NBS)|199|NBS"
        },
        {
            "display": "潮州",
            "data": "Chaozhou|潮州(SWA)|215|SWA"
        }],
    "D": [
        {
            "display": "大同",
            "data": "Datong|大同(DAT)|136|DAT"
        },
        {
            "display": "达县",
            "data": "Daxian|达县(DAX)|234|DAX"
        },
        {
            "display": "稻城",
            "data": "Daocheng|稻城(DCY)|1222|DCY"
        },
        {
            "display": "丹东",
            "data": "Dandong|丹东(DDG)|221|DDG"
        },
        {
            "display": "迪庆",
            "data": "Diqing|迪庆(DIG)|93|DIG"
        },
        {
            "display": "大连",
            "data": "Dalian|大连(DLC)|6|DLC"
        },
        {
            "display": "大理",
            "data": "Dali|大理(DLU)|36|DLU"
        },
        {
            "display": "敦煌",
            "data": "Dunhuang|敦煌(DNH)|11|DNH"
        },
        {
            "display": "东营",
            "data": "Dongying|东营(DOY)|236|DOY"
        },
        {
            "display": "大庆",
            "data": "Daqing|大庆(DQA)|231|DQA"
        },
        {
            "display": "德令哈",
            "data": "Delhi|德令哈(HXD)|2542|HXD"
        },
        {
            "display": "德宏",
            "data": "Dehong|德宏(LUM)|365|LUM"
        }],
    "E": [
        {
            "display": "鄂尔多斯",
            "data": "Eerduosi|鄂尔多斯(DSN)|3976|DSN"
        },
        {
            "display": "额济纳旗",
            "data": "Ejinaqi|额济纳旗(EJN)|21339|EJN"
        },
        {
            "display": "恩施",
            "data": "Enshi|恩施(ENH)|245|ENH"
        },
        {
            "display": "二连浩特",
            "data": "Erlianhaote|二连浩特(ERL)|7626|ERL"
        }],
    "F": [
        {
            "display": "福州",
            "data": "Fuzhou|福州(FOC)|258|FOC"
        },
        {
            "display": "阜阳",
            "data": "Fuyang|阜阳(FUG)|257|FUG"
        },
        {
            "display": "佛山",
            "data": "Foshan|佛山(FUO)|251|FUO"
        },
        {
            "display": "抚远",
            "data": "Fuyuan|抚远(FYJ)|21943|FYJ"
        },
        {
            "display": "富蕴",
            "data": "Fuyun|富蕴(FYN)|255|FYN"
        }],
    "G": [
        {
            "display": "广州",
            "data": "Guangzhou|广州(CAN)|32|CAN"
        },
        {
            "display": "广汉",
            "data": "Guanghan|广汉(GHN)|750|GHN"
        },
        {
            "display": "格尔木",
            "data": "Geermu|格尔木(GOQ)|132|GOQ"
        },
        {
            "display": "广元",
            "data": "Guangyuan|广元(GYS)|267|GYS"
        },
        {
            "display": "固原",
            "data": "Guyuan|固原(GYU)|321|GYU"
        },
        {
            "display": "赣州",
            "data": "Ganzhou|赣州(KOW)|268|KOW"
        },
        {
            "display": "贵阳",
            "data": "Guiyang|贵阳(KWE)|38|KWE"
        },
        {
            "display": "桂林",
            "data": "Guilin|桂林(KWL)|33|KWL"
        },
        {
            "display": "光化",
            "data": "Guanghua|光化(LHK)|746|LHK"
        }],
    "H": [
        {
            "display": "红原",
            "data": "Hongyuan|红原(AHJ)|7835|AHJ"
        },
        {
            "display": "海口",
            "data": "Haikou|海口(HAK)|42|HAK"
        },
        {
            "display": "河池",
            "data": "Hechi|河池(HCJ)|3969|HCJ"
        },
        {
            "display": "邯郸",
            "data": "Handan|邯郸(HDG)|275|HDG"
        },
        {
            "display": "黑河",
            "data": "Heihe|黑河(HEK)|281|HEK"
        },
        {
            "display": "呼和浩特",
            "data": "Huhehaote|呼和浩特(HET)|103|HET"
        },
        {
            "display": "合肥",
            "data": "Hefei|合肥(HFE)|278|HFE"
        },
        {
            "display": "杭州",
            "data": "Hangzhou|杭州(HGH)|17|HGH"
        },
        {
            "display": "淮安",
            "data": "Huaian|淮安(HIA)|577|HIA"
        },
        {
            "display": "怀化",
            "data": "Huaihua|怀化(HJJ)|282|HJJ"
        },
        {
            "display": "海拉尔",
            "data": "Hailaer|海拉尔(HLD)|142|HLD"
        },
        {
            "display": "哈密",
            "data": "Hami|哈密(HMI)|285|HMI"
        },
        {
            "display": "衡阳",
            "data": "Hengyang|衡阳(HNY)|297|HNY"
        },
        {
            "display": "哈尔滨",
            "data": "Haerbin|哈尔滨(HRB)|5|HRB"
        },
        {
            "display": "和田",
            "data": "Hetian|和田(HTN)|294|HTN"
        },
        {
            "display": "花土沟",
            "data": "HUATUGOU|花土沟(HTT)|83679|HTT"
        },
        {
            "display": "惠州",
            "data": "Huizhou Pingtan Airport|惠州(HUZ)|299|HUZ"
        },
        {
            "display": "汉中",
            "data": "Hanzhong|汉中(HZG)|129|HZG"
        },
        {
            "display": "黄山",
            "data": "Huangshan|黄山(TXN)|23|TXN"
        }],
    "J": [{
        "display": "景德镇",
        "data": "Jingdezhen|景德镇(JDZ)|305|JDZ"
    },
        {
            "display": "加格达奇",
            "data": "Jiagedaqi|加格达奇(JGD)|1143|JGD"
        },
        {
            "display": "嘉峪关",
            "data": "Jiayuguan|嘉峪关(JGN)|326|JGN"
        },
        {
            "display": "井冈山",
            "data": "Jinggangshan|井冈山(JGS)|307|JGS"
        },
        {
            "display": "金昌",
            "data": "Jinchang|金昌(JIC)|1158|JIC"
        },
        {
            "display": "九江",
            "data": "Jiujiang|九江(JIU)|24|JIU"
        },
        {
            "display": "晋江",
            "data": "Jinjiang|晋江(JJN)|1803|JJN"
        },
        {
            "display": "佳木斯",
            "data": "Jiamusi|佳木斯(JMU)|317|JMU"
        },
        {
            "display": "济宁",
            "data": "Jining|济宁(JNG)|318|JNG"
        },
        {
            "display": "锦州",
            "data": "Jinzhou|锦州(JNZ)|327|JNZ"
        },
        {
            "display": "鸡西",
            "data": "Jixi|鸡西(JXA)|157|JXA"
        },
        {
            "display": "九寨沟",
            "data": "Jiuzhaigou|九寨沟(JZH)|91|JZH"
        },
        {
            "display": "荆州",
            "data": "Jingzhou|荆州(SHS)|328|SHS"
        },
        {
            "display": "揭阳",
            "data": "Jieyang|揭阳(SWA)|956|SWA"
        },
        {
            "display": "济南",
            "data": "Jinan|济南(TNA)|144|TNA"
        }],
    "K": [{
        "display": "库车",
        "data": "Kuche|库车(KCA)|329|KCA"
    },
        {
            "display": "康定",
            "data": "Kangding|康定(KGT)|4130|KGT"
        },
        {
            "display": "喀什",
            "data": "Kashi|喀什(KHG)|109|KHG"
        },
        {
            "display": "凯里",
            "data": "Kaili|凯里(KJH)|333|KJH"
        },
        {
            "display": "喀纳斯",
            "data": "Kanasi|喀纳斯(KJI)|3326|KJI"
        },
        {
            "display": "昆明",
            "data": "Kunming|昆明(KMG)|34|KMG"
        },
        {
            "display": "库尔勒",
            "data": "Kuerle|库尔勒(KRL)|330|KRL"
        },
        {
            "display": "克拉玛依",
            "data": "Kelamayi|克拉玛依(KRY)|166|KRY"
        }],
    "L": [{
        "display": "黎平",
        "data": "Liping|黎平(HZH)|3852|HZH"
    },
        {
            "display": "龙岩",
            "data": "Longyan|龙岩(LCX)|348|LCX"
        },
        {
            "display": "临汾",
            "data": "Linfen|临汾(LFQ)|139|LFQ"
        },
        {
            "display": "兰州",
            "data": "Lanzhou|兰州(LHW)|100|LHW"
        },
        {
            "display": "梁平",
            "data": "Liangping|梁平(LIA)|427|LIA"
        },
        {
            "display": "丽江",
            "data": "Lijiang|丽江(LJG)|37|LJG"
        },
        {
            "display": "荔波",
            "data": "Libo|荔波(LLB)|1708|LLB"
        },
        {
            "display": "吕梁",
            "data": "Lvliang|吕梁(LLV)|7631|LLV"
        },
        {
            "display": "临沧",
            "data": "Lincang|临沧(LNJ)|1236|LNJ"
        },
        {
            "display": "六盘水",
            "data": "Liupanshui|六盘水(LPF)|605|LPF"
        },
        {
            "display": "拉萨",
            "data": "Lasa|拉萨(LXA)|41|LXA"
        },
        {
            "display": "林西",
            "data": "Linxi|林西(LXI)|744|LXI"
        },
        {
            "display": "洛阳",
            "data": "Luoyang|洛阳(LYA)|350|LYA"
        },
        {
            "display": "连云港",
            "data": "Lianyungang|连云港(LYG)|353|LYG"
        },
        {
            "display": "临沂",
            "data": "Linyi|临沂(LYI)|569|LYI"
        },
        {
            "display": "柳州",
            "data": "Liuzhou|柳州(LZH)|354|LZH"
        },
        {
            "display": "泸州",
            "data": "Luzhou|泸州(LZO)|355|LZO"
        },
        {
            "display": "林芝",
            "data": "Linzhi|林芝(LZY)|108|LZY"
        }],
    "M": [{
        "display": "芒市",
        "data": "Mangshi|芒市(LUM)|365|LUM"
    },
        {
            "display": "牡丹江",
            "data": "Mudanjiang|牡丹江(MDG)|150|MDG"
        },
        {
            "display": "绵阳",
            "data": "Mianyang|绵阳(MIG)|370|MIG"
        },
        {
            "display": "梅州",
            "data": "Meizhou|梅州(MXZ)|3053|MXZ"
        },
        {
            "display": "满洲里",
            "data": "Manzhouli|满洲里(NZH)|1083|NZH"
        },
        {
            "display": "漠河",
            "data": "Mohe|漠河(OHE)|155|OHE"
        }],
    "N": [{
        "display": "南昌",
        "data": "Nanchang|南昌(KHN)|376|KHN"
    },
        {
            "display": "南充",
            "data": "Nanchong|南充(NAO)|377|NAO"
        },
        {
            "display": "宁波",
            "data": "Ningbo|宁波(NGB)|375|NGB"
        },
        {
            "display": "南京",
            "data": "Nanjing|南京(NKG)|12|NKG"
        },
        {
            "display": "宁蒗",
            "data": "Ninglang|宁蒗(NLH)|1161|NLH"
        },
        {
            "display": "那拉提",
            "data": "Nalati|那拉提(NLT)|3360|NLT"
        },
        {
            "display": "南宁",
            "data": "Nanning|南宁(NNG)|380|NNG"
        },
        {
            "display": "南阳",
            "data": "Nanyang|南阳(NNY)|385|NNY"
        },
        {
            "display": "南通",
            "data": "Nantong|南通(NTG)|82|NTG"
        }],
    "P": [{
        "display": "攀枝花",
        "data": "Panzhihua|攀枝花(PZI)|1097|PZI"
    },
        {
            "display": "普洱",
            "data": "Puer|普洱(SYM)|3996|SYM"
        }],
    "Q": [{
        "display": "琼海",
        "data": "Qionghai|琼海(BAR)|52|BAR"
    },
        {
            "display": "秦皇岛",
            "data": "Qinhuangdao|秦皇岛(BPE)|147|BPE"
        },
        {
            "display": "且末",
            "data": "Qiemo|且末(IQM)|399|IQM"
        },
        {
            "display": "庆阳",
            "data": "Qingyang|庆阳(IQN)|404|IQN"
        },
        {
            "display": "黔江",
            "data": "Qianjiang|黔江(JIQ)|7708|JIQ"
        },
        {
            "display": "泉州",
            "data": "Quanzhou|泉州(JJN)|406|JJN"
        },
        {
            "display": "衢州",
            "data": "Quzhou|衢州(JUZ)|407|JUZ"
        },
        {
            "display": "齐齐哈尔",
            "data": "Qiqihaer|齐齐哈尔(NDG)|149|NDG"
        },
        {
            "display": "青岛",
            "data": "Qingdao|青岛(TAO)|7|TAO"
        }],
    "R": [{
        "display": "日照",
        "data": "Rizhao|日照(RIZ)|1106|RIZ"
    },
        {
            "display": "日喀则",
            "data": "Rikaze|日喀则(RKZ)|92|RKZ"
        }],
    "S": [{
        "display": "神农架",
        "data": "Shennongjia|神农架(HPG)|657|HPG"
    },
        {
            "display": "上海",
            "data": "Shanghai|上海(SHA)|2|SHA"
        },
        {
            "display": "上海(浦东国际机场)",
            "data": "Shanghai(PU DONG)|上海(浦东国际机场)(PVG)|2|SHA,PVG"
        },
        {
            "display": "上海(虹桥国际机场)",
            "data": "Shanghai(HONGQIAO)|上海(虹桥国际机场)(SHA)|2|SHA,SHA"
        },
        {
            "display": "沈阳",
            "data": "Shenyang|沈阳(SHE)|451|SHE"
        },
        {
            "display": "石河子",
            "data": "Shihezi|石河子(SHF)|426|SHF"
        },
        {
            "display": "石家庄",
            "data": "Shijiazhuang|石家庄(SJW)|428|SJW"
        },
        {
            "display": "三明",

            "data": "Sanming|三明(SQJ)|437|SQJ"
        },
        {
            "display": "汕头",
            "data": "Shantou|汕头(SWA)|447|SWA"
        },
        {
            "display": "三亚",
            "data": "Sanya|三亚(SYX)|43|SYX"
        },
        {
            "display": "深圳",
            "data": "Shenzhen|深圳(SZX)|30|SZX"
        },
        {
            "display": "十堰",
            "data": "SHIYAN|十堰(WDS)|452|WDS"
        }],
    "T": [{
        "display": "台州",
        "data": "Taizhou|台州(HYN)|578|HYN"
    },
        {
            "display": "塔城",
            "data": "Tacheng|塔城(TCG)|455|TCG"
        },
        {
            "display": "腾冲",
            "data": "Tengchong|腾冲(TCZ)|1819|TCZ"
        },
        {
            "display": "铜仁",
            "data": "Tongren|铜仁(TEN)|1227|TEN"
        },
        {
            "display": "通辽",
            "data": "Tongliao|通辽(TGO)|458|TGO"
        },
        {
            "display": "天水",
            "data": "Tianshui|天水(THQ)|464|THQ"
        },
        {
            "display": "吐鲁番",
            "data": "Tulufan|吐鲁番(TLQ)|21811|TLQ"
        },
        {
            "display": "通化",
            "data": "Tonghua|通化(TNH)|456|TNH"
        },
        {
            "display": "天津",
            "data": "Tianjin|天津(TSN)|3|TSN"
        },
        {
            "display": "唐山",
            "data": "Tangshan|唐山(TVS)|468|TVS"
        },
        {
            "display": "太原",
            "data": "Taiyuan|太原(TYN)|105|TYN"
        },
        {
            "display": "泰州",
            "data": "Taizhou|泰州(YTY)|15|YTY"
        }],
    "W": [{
        "display": "乌兰浩特",
        "data": "Wulanhaote|乌兰浩特(HLH)|484|HLH"
    },
        {
            "display": "乌兰察布",
            "data": "ULANQAB|乌兰察布(UCB)|7518|UCB"
        },
        {
            "display": "乌鲁木齐",
            "data": "Wulumuqi|乌鲁木齐(URC)|39|URC"
        },
        {
            "display": "潍坊",
            "data": "Weifang|潍坊(WEF)|475|WEF"
        },
        {
            "display": "威海",
            "data": "Weihai|威海(WEH)|479|WEH"
        },
        {
            "display": "文山",
            "data": "Wenshan|文山(WNH)|1342|WNH"
        },
        {
            "display": "温州",
            "data": "Wenzhou|温州(WNZ)|491|WNZ"
        },
        {
            "display": "乌海",
            "data": "Wuhai|乌海(WUA)|1133|WUA"
        },
        {
            "display": "武汉",
            "data": "Wuhan|武汉(WUH)|477|WUH"
        },
        {
            "display": "武夷山",
            "data": "Wuyishan|武夷山(WUS)|26|WUS"
        },
        {
            "display": "无锡",
            "data": "Wuxi|无锡(WUX)|13|WUX"
        },
        {
            "display": "梧州",
            "data": "Wuzhou|梧州(WUZ)|492|WUZ"
        },
        {
            "display": "万州",
            "data": "Wanzhou|万州(WXN)|487|WXN"
        }],
    "X": [{
        "display": "兴义",
        "data": "Xingyi|兴义(ACX)|1139|ACX"
    },
        {
            "display": "夏河",
            "data": "Xiahe|夏河(GXH)|497|GXH"
        },
        {
            "display": "西双版纳",
            "data": "Xishuangbanna|西双版纳(JHG)|35|JHG"
        },
        {
            "display": "西安",
            "data": "Xian|西安(SIA)|10|SIA"
        },
        {
            "display": "咸阳",
            "data": "Xianyang|咸阳(SIA)|10|SIA"
        },
        {
            "display": "忻州",
            "data": "Xinzhou|忻州(WUT)|513|WUT"
        },
        {
            "display": "襄阳",
            "data": "Xiangyang|襄阳(XFN)|496|XFN"
        },
        {
            "display": "西昌",
            "data": "Xichang|西昌(XIC)|494|XIC"
        },
        {
            "display": "锡林浩特",
            "data": "Xilinhaote|锡林浩特(XIL)|500|XIL"
        },
        {
            "display": "厦门",
            "data": "Xiamen|厦门(XMN)|25|XMN"
        },
        {
            "display": "西宁",
            "data": "Xining|西宁(XNN)|124|XNN"
        },
        {
            "display": "徐州",
            "data": "Xuzhou|徐州(XUZ)|512|XUZ"
        }],
    "Y": [{
        "display": "延安",
        "data": "Yanan|延安(ENY)|110|ENY"
    },
        {
            "display": "银川",
            "data": "Yinchuan|银川(INC)|99|INC"
        },
        {
            "display": "伊春",
            "data": "Yichun|伊春(LDS)|517|LDS"
        },
        {
            "display": "永州",
            "data": "Yongzhou|永州(LLF)|970|LLF"
        },
        {
            "display": "榆林",
            "data": "Yulin|榆林(UYN)|527|UYN"
        },
        {
            "display": "宜宾",
            "data": "Yibin|宜宾(YBP)|514|YBP"
        },
        {
            "display": "运城",
            "data": "Yuncheng|运城(YCU)|140|YCU"
        },
        {
            "display": "宜春",
            "data": "Yichun|宜春(YIC)|518|YIC"
        },
        {
            "display": "宜昌",
            "data": "Yichang|宜昌(YIH)|515|YIH"
        },
        {
            "display": "伊宁",
            "data": "Yining|伊宁(YIN)|529|YIN"
        },
        {
            "display": "义乌",
            "data": "Yiwu|义乌(YIW)|536|YIW"
        },
        {
            "display": "营口",
            "data": "Yingkou|营口(YKH)|1300|YKH"
        },
        {
            "display": "延吉",
            "data": "Yanji|延吉(YNJ)|523|YNJ"
        },
        {
            "display": "烟台",
            "data": "Yantai|烟台(YNT)|533|YNT"
        },
        {
            "display": "盐城",
            "data": "Yancheng|盐城(YNZ)|1200|YNZ"
        },
        {
            "display": "扬州",
            "data": "Yangzhou|扬州(YTY)|15|YTY"
        },
        {
            "display": "玉树",
            "data": "Yushu|玉树(YUS)|7582|YUS"
        }],
    "Z": [{
        "display": "郑州",
        "data": "Zhengzhou|郑州(CGO)|559|CGO"
    },
        {
            "display": "张家界",
            "data": "Zhangjiajie|张家界(DYG)|27|DYG"
        },
        {
            "display": "舟山",
            "data": "Zhoushan|舟山(HSN)|19|HSN"
        },
        {
            "display": "张掖机场",
            "data": "ZHANGYE AIRPORT|张掖机场(YZY)|663|YZY"
        },
        {
            "display": "昭通机场",
            "data": "ZHAOTONG|昭通机场(ZAT)|555|ZAT"
        },
        {
            "display": "中山",
            "data": "Zhongshan|中山(ZGN)|553|ZGN"
        },
        {
            "display": "湛江机场",
            "data": "ZHANJIANG|湛江机场(ZHA)|547|ZHA"
        },
        {
            "display": "中卫机场",
            "data": "ZHONGWEI XIANGSHAN|中卫机场(ZHY)|556|ZHY"
        },
        {
            "display": "张家口",
            "data": "Zhangjiakou|张家口(ZQZ)|550|ZQZ"
        },
        {
            "display": "珠海",
            "data": "Zhuhai|珠海(ZUH)|31|ZUH"
        },
        {
            "display": "遵义",
            "data": "Zunyi|遵义(ZYI)|558|ZYI"
        }]

};