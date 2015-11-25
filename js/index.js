//var _url_="http://api.bibibaba.cn/user_login";
function login(){
    var loginBut=$("#lbtn");
    if(loginBut.hasClass("logining"))
    return;
    loginBut.addClass("logining");
    var userName=$("[name='userName']").val();
    var a=$("[name='userPwd']").val();
    var userPwd=$.md5(a);
    if(!userPwd||!userName||userName==""||userPwd==""){
        alert("请填写用户名和密码");
    loginBut.removeClass("logining");
        return;
    }
    localStorage.setItem('userName',userName); //localStorage.setItem保存一个json对象
    localStorage.setItem('userPwd',userPwd);
    localStorage.setItem('userPwdA',a);
    ajaxLogin();
}
window.onload=function(){
    var name=localStorage.getItem('userName');
    var pwd=localStorage.getItem('userPwdA');
    $("#name").val(name);
    $("#pwd").val(pwd);
    if(pwd&&name)login();
}

function getStartPush(){
    window.plugins.jPushPlugin.init(); 
    window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID);
}

var onGetRegistradionID = function(data) {
    try{
        alert("JPushPlugin:registrationID is "+data)      }
    catch(exception){
        alert(exception);
    }
}