

function loginstorage(){
    var oChecked =document.getElementById("btn_check");
    if(oChecked.checked){
      var userPwd=localStorage.getItem('userPwd');//localStorage  h5本地存储
  	  if(userPwd && userPwd!=""){
  	     	 ajaxLogin();
  	  }//已登录则直接进入
    }
    else
    {
      localStorage.clear();
    }
  }  

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
      loginstorage();
  	}

window.onload=function(){
  $("#name").val(localStorage.getItem('userName'));
  $("#pwd").val(localStorage.getItem('userPwdA'));
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