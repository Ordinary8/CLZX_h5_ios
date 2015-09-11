/*onerror=function(msg,url,l){
    url=url.split(/[\\\/]/).pop();
    alert(msg+";\n"+url+";\n"+l);
}*/

function ajaxLogin(){
    var userName=localStorage.getItem('userName');
    var userPwd=localStorage.getItem('userPwd');	
    $.ajax({
            url: "http://api.wisegps.cn/login",
            type: "GET",
            dataType: "json",                 
            data:{"username":userName,"password":userPwd,"mac":"7c:1d:d9:66:64:71"},   
            async: true,
            timeout: 100000,
            success:loginSuccess,
            error:loginError
        });
}

	function loginSuccess(json)
	{
    $(".loading_back").show();
		if(json.status_code==0)	
		{
          localStorage.setItem('number_type',json.number_type);         
 	        localStorage.setItem('cust_id',json.cust_id);
          localStorage.setItem('auth_code',json.auth_code);
          localStorage.setItem('tree_path',json.tree_path);
          localStorage.setItem('parent_cust_id',json.parent_cust_id);          
			self.location="userlist.html";
			//alert(json.status_code);

		}
		else
		{
			statusCode(json.status_code);
		}
	}
	function loginError(jXMLHttpRequest, textStatus, errorThrown)
	{
    $(".loading_back").show();
		alert("出错了，错误类型"+textStatus+"错误对象："+errorThrown);
	}
	
function statusCode(code){
    $("#lbtn").removeClass("logining");
    switch (code){
      case 1: alert("操作失败，账号不存在");
        break;
      case 2: alert("操作失败，密码错误");
        break;
      case 7: alert("操作失败，超过访问频率");
        break;
      case 3: ajaxLogin();//过期，重新登录
        break;
      case 6: alert("操作失败，设备条码不存在");
        break;
      //default: alert("操作失败，未知错误；status_code="+code);
    }
}

function is_weixin(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}

function isIos(){
  var u = navigator.userAgent, app = navigator.appVersion;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}