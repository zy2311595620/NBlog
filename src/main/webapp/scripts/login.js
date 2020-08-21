//login_in.html主处理
//前台工作：1.给dom对象绑定js事件2.放松ajax3.处理ajax回调4.利用回调给dom对象进行赋值
$(function (){//页面载入完毕
//给登录按钮绑定单击事件处理
    $("#login").click(checkLogin);
    //给注册绑定单击事件
    $("#regist_button").click(registUser);
})
//登录处理
function checkLogin() {
   /*
   *发送ajax三板斧
   */
    //1.获取请求参数
    //1.1获取用户名
    var name= $("#count").val().trim();
    //1.2获取密码
    var password=$("#password").val().trim();

    //2.检测参数格式
    //
    $("#count_span").html("");
    $("#password_span").html("");
    var ok=true;
    if (name==""){
        ok=false;
        $("#count_span").html("用户名为空");
    }
    if (password==""){
        ok=false;
        $("#password_span").html("密码为空");
    }
    if (ok){
        $.ajax({
            url:base_path+"/user/login.do",
            type:"post",
            data:{"name":name,"password":password},
            dataType:"json",
            success:function (result) {
                   /* 成功回调函数 result封装后台传过来的json数据
                {"status":0,"msg":"登录成功","data":{"cn_user_id":"333c6d0b-e4a2-4596-9902-a5d98c2f665a",
                 "cn_user_name":"test1","cn_user_password":"","cn_user_token":null,"cn_user_nick":null}}*/
                var user=result.data;
                if (result.status==0){
                    //写入cookie中
                    addCookie("uid",user.cn_user_id,2);
                    addCookie("uname",user.cn_user_name,2);
                    //成功登陆后跳转主界面
                    window.location.href="edit.html";
                }else if (result.status==1){//用户不存在
                    $("#count_span").html(result.msg);
                }else if (result.status==2){//密码错误
                    $("#password_span").html(result.msg);
                }
            },
            error:function () {
                alert("登陆异常");
            }
        });
    }
    //3.发送ajax
    //
    


}
//注册处理
function registUser() {
    //获取请求参数
    var name= $("#regist_username").val().trim();
    var nick=   $("#nickname").val().trim();
    var password=   $("#regist_password").val().trim();
    var f_password=   $("#final_password").val().trim();
    //参数格式校验
    $("#warning_1 span").html("");
    $("#warning_2 span").html("");
    $("#warning_3 span").html("");
    var ok=true;
    if(name == ""){
        ok = false;
        //jquery添加闪烁效果
        $("#warning_1").show();
        $("#warning_1 span").html("用户名为空");
    }
    if (password == ""){
        ok = false;
        $("#warning_2").show();
        $("#warning_2 span").html("密码为空");
    }else if (password.length<6){
        ok = false;
        $("#warning_2").show();
        $("#warning_2 span").html("密码长度太短");
    }
    if (f_password == ""){
        ok = false;
        $("#warning_3").show();
        $("#warning_3 span").html("确认密码为空");
    }else if (f_password !=password){
        ok = false;
        $("#warning_3").show();
        $("#warning_3 span").html("与密码不一致");
    }
    if (ok){
        $.ajax({
            url: base_path + "/user/add.do",
            type: "post",
            data: {"name": name, "nick":nick,"password": password},
            dataType: "json",
            success:function (result) {
                if (result.status == 0){
                    alert(result.msg);//提示成功
                    $("#back").click();//跳转登录页面
                }else if (result.status == 1){
                    $("#warning_1").show();
                    $("#warning_1 span").html(result.msg);
                }
            },
            error:function () {
                alert("注册异常");
            }
        });
    }
    //发送Ajax
}