$(function () {
    $(".top-logo>div").hover(function () {
        $(this).css({ "background-image": "url(img/tea.gif)", "background-size": "cover" })
        $(this).find("p").delay(2000).fadeIn();
    }, function () {
        $(this).css("background", "url(img/sprite.png)")
        $(this).find("p").stop().hide();
    })

    // 二级导航显示
    $(".pro-nav>li").hover(function () {
        $(".secondProNav").show();
        $(this).css({
            "background": "#d9d9d9"
        }).siblings().css({
            "background": "#fff"
        })
    })
    $(".navWrap").mouseleave(function () {
        $(".secondProNav").hide();
    })
    // 滚动条滚动事件
    var clientH = document.documentElement.clientHeight || document.body.clientHeight;
    console.log(clientH);
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(".pro-nav").offset().top) {
            $(".secondProNav").stop().animate({
                "top": $(window).scrollTop() - $(".pro-nav").offset().top + "px"
            }, 200)
        } else {
            $(".secondProNav").stop().animate({
                "top": 0
            }, 200)
        }
        // 搜索框显示
        searchShow();
    })
    function searchShow() {
        if ($(window).scrollTop() >= 100) {

            $(".searchWrap").show().stop().animate({
                "top": 0,
                "left": 0
            }, 200)
        } else {
            $(".searchWrap").css({
                "top": "-52px"
            }).hide();
        }
    }
    searchShow();
    // 小菜单切换
    $(".app-hide").hover(function () {
        $(".app-hide").stop().animate({
            "margin-top": "-15px"
        })
        $(".app-t").show().stop().animate({
            "top": 0,
            "left": 0
        }, 200)
    })
    $(".tit>a").hover(function () {
        $(this).addClass("hover").siblings().removeClass("hover");
        console.log($(".phone-con").show().siblings())
        if ($(this).attr("id") == "phone-tit") {
            $(".phone-con").show().siblings().hide();
        } else if ($(this).attr("id") == "plane-tit") {
            $(".plane-con").show().siblings().hide();
        } else {
            $(".hotel-con").show().siblings().hide();
        }
    })
    $("#close").click(function () {
        $(".app-t").stop().animate({
            "top": "225px"
        }, 200)
        $(".app-hide").stop().animate({
            "margin-top": "0px"
        })

    })
    // 倒计时
    var time = $("#time-num").html();
    var endTime = new Date();
    endTime.setHours(time.split(":")[0]);
    endTime.setMinutes(time.split(":")[1]);
    endTime.setSeconds("00");
    console.log(endTime);
    function getTime(endTime) {
        var oDate = new Date();
        var ss = Math.floor((endTime - oDate) / 1000);
        var hour = Math.floor(ss / 3600);
        hour = hour < 10 ? "0" + hour : hour;
        var minute = Math.floor(ss / 60 % 60);
        minute = minute < 10 ? "0" + minute : minute;
        var second = Math.floor(ss % 60);
        second = second < 10 ? "0" + second : second;
        $("#hour").html(hour);
        $("#minute").html(minute);
        $("#second").html(second);
        if (ss <= 0) {
            clearInterval(timer);
            $("#hour").html("00");
            $("#minute").html("00");
            $("#second").html("00");
        }
    }
    getTime(endTime);
    var timer = setInterval(function () {
        getTime(endTime);
    }, 1000)

    // 阻止a标签的默认跳转行为
    $("a").attr("href","javascript:void(0)");

    //取出地址栏的uid
    if(location.search){
        var uid = location.search.split("&")[0].split("=")[1];
        var uname = location.search.split("&")[1].split("=")[1];
    }

    $("a").click(function(){
        if(uid){
            location.href = "prolist.html?uid="+uid+"&uname="+uname;
        }else{
            location.href = "prolist.html";
        }
    })

})