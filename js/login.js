$(function () {
    // 随机更换banner背景图
    var bgObj = [
        { "url": "img/login_bj01.jpg", "bgColor": "#2807B3" },
        { "url": "img/login_bj02.jpg", "bgColor": "#434345" },
        { "url": "img/login_bj03.jpg", "bgColor": "#002F65" }
    ];
    var bgIndex = Math.floor(Math.random()*3);
    $(".bannerWrap").css("background-color",bgObj[bgIndex].bgColor)
    .find(".banner").css("background-image","url("+bgObj[bgIndex].url+")")
    // 页面刷新二维码滑动
    function codeSilder() {
        $("#codeImg").find("img:first-child").stop().animate(
            {
                "left": "20px"
            }, () => {
                $("#codeImg").find("img:last-child").show();
            }
        )
    }
    function codeSilderR(){
        $("#codeImg").find("img:first-child").stop().animate(
            {
                "left": "84px"
            }, 300
        )
        $("#codeImg").find("img:last-child").hide();
    }
    codeSilder();

    // 登录方式切换
    $(".loginTit>p").click(function () {
        $(this).addClass("hover").siblings().removeClass("hover")
        if ($(this).html() == "扫码登录") {
            $("#codeLo").show();
            $("#accountLo").hide();
            codeSilder();
        } else {
            $("#codeLo").hide();
            $("#accountLo").show();
            codeSilderR();
        }
    })

    // 鼠标悬浮二维码滑动
    $("#codeImg").hover(function () {
        codeSilder();
    }, function () {
        codeSilderR();
    })

    // 表单获得焦点
    $("#accountLo>div>input").focus(function(){
        $(this).parent().attr("class","focus").siblings().removeClass("focus");
    })
    // 表单填写
    $("#accountLo>div>input").on("input",function(){
        if($(this).val().trim().length != 0){
            $(this).next().show();
        }else{
            $(this).next().hide();
        }
    })
    // X号点击事件
    $("#accountLo>div>span").click(function(){
        $(this).hide().prev().val("");
    })
    $("#accountLo>div>span").hover(function(){
        $(this).css({"background-position-x":"-50px"});
    },function(){
        $(this).css({"background-position-x":"-25px"})
    })
    // 登录按钮点击
    $("#loginBtn").click(function(){
        var userVal = $("#username").val().trim();
        var pwdVal = $("#passwd").val().trim();
        if(userVal.length == 0 && pwdVal.length == 0){
            $("#error-note").css("visibility","visible").find("span").html("请输入账户名和密码");
            $("#accountLo>div:eq(0)").attr("class","error");
            $("#accountLo>div:eq(1)").attr("class","error");
        }else if(userVal.length == 0){
            $("#error-note").css("visibility","visible").find("span").html("请输入账户名");
            $("#accountLo>div:eq(0)").atttr("class","error");
        }else if(pwdVal.length == 0){
            $("#error-note").css("visibility","visible").find("span").html("请输入密码");
            $("#accountLo>div:eq(1)").attr("class","error");
        }else{
            $("#error-note").css("visibility","hidden");
            $("#accountLo>div:eq(0)").removeClass("error");
            $("#accountLo>div:eq(1)").removeClass("error");
            $.get(
                "http://jx.xuzhixiang.top/ap/api/login.php",
                {
                    "username":$("#username").val(),
                    "password":$("#passwd").val()
                },
                (data)=>{
                    console.log(data);
                    if(data.code=="0"){
                        console.log("ss");
                        $("#error-note").css("visibility","visible").find("span").html(data.msg);
                    }
                    if(data.code == "1"){
                        $("#error-note").css("visibility","hidden").find("span").html("");
                        alert("登录成功");
                        location.href = "index.html?uid="+data.data.id+"&uname="+data.data.username;
                    }
                }
            );
        }
    })


})
