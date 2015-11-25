	var _url_="http://web.wisegps.cn:3000/";//网址
	var auth_code=localStorage.getItem('auth_code');//从public.js得到的auth_code
	var userPwdA=localStorage.getItem('userPwdA');
	var userPwd = localStorage.getItem('userPwd');
	var userName = localStorage.getItem('userName');
	var number_type=localStorage.getItem('number_type');//从public.js得到的number_type
	var _initialPwd_ ,_auth_code_ ,  _againPwd_ ;//全局变量 原密码、新密码的值 、再次输入的新密码

	$(document).ready(function  () {
		$("#sBtn").bind("click",function () {
			_getPwd();
		});
		$("#qBtn").bind("click",function () {
			_initialPwd_ = $("#initialPwd").val("");
		    _againPwd_ = $("#againPwd").val("");
		    _auth_code_=$("#newPwd").val("");			
		});		
	});
	/**
	 * 发送新密码到服务器
	 * @return {[type]} [description]
	 */
	function _getPwd() {

		_initialPwd_ = $("#initialPwd").val();
	    _againPwd_ = $("#againPwd").val();
	    _auth_code_=$("#newPwd").val();


		if(_initialPwd_!=_auth_code_ && _initialPwd_!="" && _initialPwd_==userPwdA){
			if(_againPwd_==_auth_code_){
				_auth_code_=$.md5(_auth_code_);//加密
				_getPwdJson();
			}else{
				alert("两次密码输入不一致!");
			}
		}else{
			alert("密码不能为空或原密码不能与新密码相同！");
		}
	}
	/**
	 * 发送修改密码到服务器
	 * @param  {[type]} argument [description]
	 * @return {[type]}          [description]
	 */
	function _getPwdJson () {
		$.post(
			_url_+"customer/user/password?auth_code="+auth_code+"&number_type="+number_type,
			{
				"user_name":userName,
				"old_password":userPwd,
				"new_password":_auth_code_
			},
			function(data) {
				self.location="index.html";
			}
		)	
	}