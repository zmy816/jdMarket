$(function () {
    var nameFlag;
    var pwdFlag;
    $(".del").click(function () {
        $(this).prev().find("input").val("");
        $(this).hide();
    })
    // 验证用户名格式
    $(".form-wrap input").focus(function () {
        $(this).parent().parent().find(".note").show();
        $(this).parent().parent().find(".sus").hide();
    })
    $(".form-wrap input").blur(function () {
        // console.log($(this).val().length)
        if ($(this).val().length == 0) {
            $(this).parent().parent().find(".note").hide();
        } else {
            $(this).parent().parent().find(".note").show();
        }
    })
    $("#username").blur(function () {
        nameFlag = false;
        var reg = /\s+/g;
        var userName = $("#username").val().replace(reg, "");
        // console.log(userName.length);
        if (userName.length > 12 || userName.length == 0) {
            $(this).parent().parent().find(".note").show().addClass("note-err");
        } else {
            $(this).parent().parent().find(".note").hide().removeClass("note-err");
            $(this).parent().parent().find(".del").hide();
            $(this).parent().parent().find(".sus").show();
            nameFlag = true;
        }
        if (userName == 0 && $(this).val().length == 0) {
            $(this).parent().parent().find(".note").hide().removeClass("note-err");

        }
    })
    $(".form-wrap input").on("input", function () {
        if ($(this).val().trim() != "") {
            $(this).parent().parent().find(".del").show();
        } else {
            $(this).parent().parent().find(".del").hide();
        }
    })
    // 验证密码格式
    $("#passwd").blur(function () {
        var reg = /\s+/g;
        var password = $("#passwd").val().replace(reg, "");
        pwdFlag = true;
        if ($(this).val().length < 6 || $(this).val().length > 14) {
            $(this).parent().parent().find(".note")
                .show().addClass("note-err")
                .find("span").html("密码长度在6-14位之间");
            pwdFlag = false;
        } else {
            $(this).parent().parent().find(".note")
                .hide().removeClass("note-err")
                .find("span").html("密码长度在6-14位，由数字、字母、字符组成，区分大小写");
        }
        console.log($(this).val().length, password.length)
        if ($(this).val().length != password.length) {
            $(this).parent().parent().find(".note")
                .show().addClass("note-err")
                .find("span").html("密码由字母、数字及符号组成，不能包含空格");
            pwdFlag = false;
        }
        if ($(this).val().length == 0) {
            $(this).parent().parent().find(".note")
                .hide().removeClass("note-err")
                .find("span").html("密码长度在6-14位，由数字、字母、字符组成，区分大小写");
            pwdFlag = false;
        }
        if(pwdFlag){
            $(this).parent().parent().find(".note").hide().removeClass("note-err");
            $(this).parent().parent().find(".del").hide();
            $(this).parent().parent().find(".sus").show();

        }

    })
    $("#passwd").on("input", function () {
        var str = passIndentify($(this).val());
        if ($(this).val().length >= 6) {
            console.log("aa")
            $(".pwd-note").css("visibility", "visible").find("b").attr("class", str);
        }else{
            $(".pwd-note").css("visibility", "hidden").find("b").attr("class", "");
        }
    })
    // 判断密码强度
    function passIndentify(password) {

        var upFlag = false;
        var lowFlag = false;
        var numFlag = false;
        for (var i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
                if (!numFlag) {
                    numFlag = true;
                }
            }
            if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                if (!lowFlag) {
                    lowFlag = true;
                }
            }
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                if (!upFlag) {
                    upFlag = true;
                }
            }

        }
        switch (upFlag + lowFlag + numFlag) {
            case 1:
                return "pwd-r";
            case 2:
                return "pwd-z";
            case 3:
                return "pwd-q";
            default:
                return "pwd-r";
        }
    }
    // 判断密码和用户名是否为空
    $("button").click(function(){
        if(pwdFlag && nameFlag){

        }else if(!pwdFlag){
            $("#passwd").parent().parent().find(".note")
            .show()
        }else if(!nameFlag){
            $("#username").parent().parent().find(".note")
            .show()
        }
        return false;
    })
})