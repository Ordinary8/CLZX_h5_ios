
var url ="http://web.wisegps.cn:3000/";
var cust_id=localStorage.getItem('cust_id');
var auth_code=localStorage.getItem('auth_code');
var tree_path=localStorage.getItem('tree_path');
if(!auth_code){self.location="index.html";}
var userTreePath;

var page_no=1;
var page_count=100;

var userVal,refresh="down";
var tem;//地图的window对象
var key;//search里的value
var pageFlag=0;//标识当前显示哪个页面；0：userlist；1：map；2：more；
window.foreground=true;//标识是否刚从后台切换回来

if(!_app_&&!window.navigator.standalone){
	window.addEventListener('DOMContentLoaded', function() {
	    var page = $("body>div")[0],
	        nav = window.navigator,
	        ua = nav.userAgent,
	        isFullScreen = nav.standalone;
	    if (ua.indexOf('Android') !== -1) {
	        // 56对应的是Android Browser导航栏的高度
	        page.style.height = window.innerHeight + 56 + 'px';
	    } else if (/iPhone|iPod|iPad/.test(ua)) {
	        // 60对应的是Safari导航栏的高度
	        page.style.height = window.innerHeight + (isFullScreen ? 0 : 60) + 'px'
	    }
	    setTimeout(scrollTo, 0, 0, 1);
	}, false);
}
$(document).ready(function (){
    $("#but").on("touchend",changeMap);
	carAjax();//绑定select的绑定事件

	$.getJSON(//获取用户下子用户
		url+"customer/"+cust_id+"/customer?auth_code="+auth_code+"&tree_path="+tree_path+"&page_no=1&page_count=100",
		function(data)
		{
			$.each(data.data,function (i,a)
			{
				//console.log(data.data);
				$("select").append("<option>"+a.cust_name+"</option>");	
				$("#userid ul").append("<li>"+a.tree_path+"</li>")
				//console.log("用户"+a.tree_path);
		});
		$("#select").val(data.data[0].cust_name).change();
	});	

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
		};
	})();
	$("#search_txt").keyup(function () {
	  	key = $("#search_txt").val();
	  	last = event.timeStamp;
		if(key!==null){
			 delay(function(){
					$("#search_content").css("display","block");
					getSearchVal()
			 },0);
		}
	});
	$("#search_txt").blur(function () {
		setTimeout('$("#search_content").css("display","none");',500);
	});
	function getSearchVal(){
        $.getJSON(
        //"http://web.wisegps.cn:3000/customer/177/vehicle/search?auth_code=f6cdab399b363a36aac40724857c31ea&tree_path=%2C1%2C177%2C&mode=all&limit=5&key=%E8%B4%B5A0",
            url+"customer/"+cust_id+"/vehicle/search?auth_code="+auth_code+"&tree_path="+tree_path+"&mode=all&page_no=1&page_count=5&key="+key,
        function(data){
            $("#search_content>ul>li").remove();
            $("#search_content")[0].data=data.data;
            $.each(data.data,function (i,a)
            {
                $("#search_content>ul").append("<li onclick='GPSCar("+a.obj_id+","+(i+1)+")'>"+a.obj_name+"</li>");
            });
        })
    }

    if(!_app_&&!window.navigator.standalone){
    	alert("添加到主屏幕，可全屏使用");
    }
    
    //加载map页面和more页面
    loadMapAndMore();
});	
function getData(){
	$.getJSON(
		url+"customer/"+cust_id+"/vehicle?auth_code="+auth_code+"&tree_path="+userTreePath+"&mode=all&page_no=1&page_count="+page_count,
			getJsonData
	)//GETJOSN
}

function carAjax(){	
	$("#select").change(function()
	{ 
        $("div.ui-loader-default").show();
     	userVal=$(this).val();
	
		$("#select>option").each(function(index){
			if($(this).text()==userVal){
			userTreePath = $("#userid ul li").eq(index).text();
			$(".carlist").remove();
			getData();
			}
		});

	});
}
function getJsonData(data){
	if(tem&&tem.drawCar){
		if(tem.map)
			tem.map.clearOverlays();
		tem.drawCar(data.data,refresh);
	}else{
		localStorage.setItem("carData",JSON.stringify(data.data));
	}

	refresh="down";
	total = data.page_total;//当前个数
	allTotal = data.total;//总个数
    var content="";
    for(var i=0;i<data.data.length;i++){
        content+=makeContent(data.data[i]);
    }
    $("#uList").append(content);
	setScroll();
}//getJsonData()

function drawChange(data){
    //刷新正在运动的车辆信息
    for(var i=0;i<data.length;i++){
        $("#car"+data[i].obj_id).html(makeContent(data[i],true));
    }
}
var alertsArr=["紧急报警","超速报警","震动报警","位移报警","防盗器报警","非法行驶报警","进围栏报警","出围栏报警","断电","低电压报警","GPS断线报警","疲劳驾驶报警","非法点火报警","非法开门报警"];
function makeContent(a,inside){
    //构造一个列表元素的内容
    var content="";
    var status="",lastT="",img="";
    if(a.active_gps_data!=null){
        var rcvTime = a.active_gps_data.rcv_time;
        var timer = new Date();							
        var rvTime=changeDate(rcvTime);
        var ymd =rvTime.substr(5,3)+rvTime.substr(8,3)+rvTime.substr(11,3)+rvTime.substr(14,2);
        var arr = new Array();

        arr = rvTime.split(/[-\s:]/);
        var offTimes = new Date(arr[0],arr[1]-1,arr[2],arr[3],arr[4],arr[5]).valueOf();
        var off = timer.getTime()-offTimes;


        var nDay = Math.floor(off/(1000*60*60*24));

        var nHours = Math.floor(off/(1000*60*60))%24;	
        var nMonutes = Math.floor(off/(1000*60))%60;

        var rcv = nDay*24*60+nHours*60+nMonutes;
        
        //熄火
        var lastStopTime = a.active_gps_data.last_stop_time;
        var stopTime =	changeDate(lastStopTime);					
        var timers = new Date();

        var sArr = new Array();

        sArr = stopTime.split(/[-\s:]/);

        var outTimes = (new Date(sArr[0],sArr[1]-1,sArr[2],sArr[3],sArr[4],sArr[5])).valueOf();

        var out = timers.getTime()-outTimes;

        var oDay = Math.floor(out/(1000*60*60*24));

        var oHours = Math.floor(out/(1000*60*60))%24;	
        var oMonutes = Math.floor(out/(1000 * 60))%60; 

        var lst = oDay*1440+oHours*60+oMonutes;
        var outLastTime;

        if(lst>60 && lst<1440){
            outLastTime = Math.round(oHours)+"小时"+Math.round(oMonutes)+"分";
        }else if(lst<60){
            outLastTime = Math.round(oMonutes)+"分";
        }else{
            outLastTime = Math.round(oDay)+"天"+Math.round(oHours)+"小时"+Math.round(oMonutes)+"分";
        }
    
    if(rcv>10){
        var timeRcv;
        if(rcv>60 && rcv<1440){
            timeRcv = Math.round(nHours)+"小时"+Math.round(nMonutes)+"分";
        }else if(rcv<60){
            timeRcv = Math.round(nMonutes)+"分";
        }else{
            timeRcv = Math.round(nDay)+"天"+Math.round(nHours)+"小时";
        }
        status="离线"+timeRcv;
        lastT="熄火"+outLastTime;
        img="img/car_out.png";
    }else if(a.active_gps_data.uni_alerts.length>0){
        status="静止 "+alertsArr[a.active_gps_data.uni_alerts-12289];
        lastT="熄火"+outLastTime;
        img="img/car_alert.png";
    }else if(a.active_gps_data.speed>0){
        status="行驶,<span>"+Math.round(a.active_gps_data.speed)+"</span>公里/小时";
        lastT="启动";
        img="img/car_on.png";
    }else{
        status="静止";
        lastT="熄火"+outLastTime;
        img="img/car_off.png";
    }
}
    content="<div class='car_left fl'><div class='carimg fl'><img src='"+img+"' width='30' height='30'></div><div class='car_id fl'><p>"+a.obj_name+"</p><p>"+status+"</p></div></div><div class='car_right fl'><div class='date'>"+ymd+"</div><div class='car_state '><span>"+lastT+"</span></div></div>";
    if(!inside){
       content="<div class='carlist' id='car"+a.obj_id+"' onclick='GPSCar("+a.obj_id+")'>"+content+"</div>";
    }
    return content;
}



//调用定位车辆函数
function GPSCar(id,i){
    if(!tem.map){
        alert("请等待地图加载！");
        return;
    }
    var json;
    if(i)json=$("#search_content")[0].data[i-1];
	changeMap();
    setTimeout(function(){tem.fun1(id,json)},500);
}
//changeMap()，changeMore()，changeCount() 在bottom.html里调用
function changeMap(){
    pageFlag=1;
	$("body").removeClass("show_more").addClass("show_map");
    if(tem.dataRefresh)//如果数据更新过，则刷新位置
        tem.drawCar(tem.carData,false);
}

function changeMore(){
    pageFlag=2;
	$("body").removeClass("show_map").addClass("show_more"); 
}

function changeCount(){
    pageFlag=0;
	$("body").removeClass("show_map").removeClass("show_more");
}
//在更多页面调用
function hideStatusBar(){
	$(".child_view").css("padding-bottom","0");
	$("#bottom").css("z-index","1");
}
function showStatusBar(){
	$(".child_view").css("padding-bottom","50px");
	$("#bottom").css("z-index","1031");
}

/**
 *等主页面加载完之后才开始加载地图 和更多页面
 */
function loadMapAndMore(){
    var map=document.querySelector("#map>iframe");
    map.addEventListener("load",function(){
        tem=document.querySelector("#map>iframe").contentWindow;
    });
    map.src="map.html";
    document.querySelector("#more>iframe").src="more.html";
}

function getUpData()//下面 pullUpAction 调用这个方法进行加载
{
page_all = Math.ceil(allTotal/total);

	page_no++;

	   	$.getJSON(
		url+"customer/"+cust_id+"/vehicle?auth_code="+auth_code+"&tree_path="+userTreePath+"&mode=all&page_no="+page_no+"&page_count="+page_count,
			getJsonData//成功后的函数
		)
}


function pullDownAction () {
	setTimeout(function () {
		
	console.log("下拉刷新...");
		myScroll.refresh();		//数据加载完成后，调用界面更新方法  
	}, 1000);
}
function pullUpAction() {
	refresh="up";
   setTimeout(function () { 

	console.log("上拉加载...");
	getUpData();

    myScroll.refresh(); //数据加载完成后，调用界面更新方法
   }, 1000); 
 }
var myScroll,pullDownEl, pullDownOffset,pullUpEl, pullUpOffset,generatedCount = 0;
function  setScroll(){
	$("div.ui-loader-default").hide();
	if(myScroll){
		//$("#scroller").next().remove();
		myScroll.destroy();
	}
	pullDownEl = document.getElementById('pullDown');
	pullUpEl = document.getElementById('pullUp');
	pullDownEl.style.display="block";
	pullUpEl.style.display="block";
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpOffset = pullUpEl.offsetHeight;
	
	var id='wrapper';
	var yLen=100;
	
	var hei=document.getElementById(id).maxScrollY;
	
	myScroll = new iScroll(id, {
		useTransition: false,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function () {//滚动距离
			if (this.y >= yLen && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
				this.minScrollY = 0;
			} else if (this.y < yLen && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				this.minScrollY = -pullDownOffset;
			}
			else if (this.y < (this.maxScrollY - yLen) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + yLen) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;
			}
			
		},
		onScrollEnd: function () {//滚动停止
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';				
				pullDownAction();	// Execute custom function (ajax call?)
			}
				else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
			
		}
	});
	
}
function changeDate(str){
  var d=NewDate(str);
  //d.setHours(d.getHours()+8);
  return d.toString();
}
Date.prototype.toString=function(){
  var d=this;
  var j={};
  j.m=d.getMonth()+1;
  j.d=d.getDate();
  j.h=d.getHours();
  j.mi=d.getMinutes();
  j.s=d.getSeconds();
  for(items in j){
    if(j[items]<10)
      j[items]="0"+j[items];
  }
 return d.getFullYear()+"-"+j.m+"-"+j.d+" "+j.h+":"+j.mi+":"+j.s;
}

function NewDate(str) {
    var date = new Date();
    var str_before = str.split('T')[0]; //获取年月日
    var str_after = str.split('T')[1]; //获取时分秒
    var years = str_before.split('-')[0]; //分别截取得到年月日
    var months = str_before.split('-')[1] - 1;
    var days = str_before.split('-')[2];
    var hours = str_after.split(':')[0];
    var mins = str_after.split(':')[1];
    var seces = str_after.split(':')[2].replace("Z", "");
    var secs = seces.split('.')[0];
    var smsecs = seces.split('.')[1];
    date.setUTCFullYear(years, months, days);
    date.setUTCHours(hours, mins, secs, smsecs);
    return date;
}

//推送
document.addEventListener('deviceready',function(){
    window._alert=alert;
    alert=function(msg){
        navigator.notification.alert(
            msg,  // 显示信息
            null,         // 警告被忽视的回调函数
            '车联在线',            // 标题
            '确定'                  // 按钮名称
        );
    }
    
    window.plugins.jPushPlugin.setTags([cust_id]);
}, false);

//document.addEventListener("jpush.receiveMessage", getOneMessage, false);
//获取到消息
function getOneMessage(data){
    navigator.vibrate(150);
    var bToObj;
    if(typeof data=="string"){
        data=data.replace(/"{"/g,'{"').replace(/"}"/g,'"}');
        try{
            bToObj=JSON.parse(data);
        }catch(e){
            alert("收到一条消息，但解析出错了");
        }
    }else 
        bToObj=data;
    
    var more=document.querySelector("#more>iframe").contentWindow;
    var bottom=document.querySelector("#bottom").contentWindow;
    more.addMessage(bToObj);
    if(pageFlag==0)
        bottom.addMessage();
}

/**
 *点击通知进入应用则直接跳到“我的消息”页面
 */
function onOpenNotification(event){
    var content;
    if(device.platform == "Android"){
        content=window.plugins.jPushPlugin.openNotification;
    }else{
        content=event;
    }
    var more=document.querySelector("#more>iframe").contentWindow;
    var msg=more.$("#Mymsg");

    window.foreground=true;
    if(msg.length){
        more.location="message.html";
        changeMore();
    }else{
        more.autoMessage();//获取最新记录
    }
    window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
}

/**
 *注册点击通知事件（如果用户是点击通知进入应用的则触发onOpenNotification）
 */
document.addEventListener("jpush.receiveNotification", getOneMessage, false);
document.addEventListener("jpush.openNotification", onOpenNotification, false);
document.addEventListener("pause", function(){
    window.foreground=false;
}, false);

document.addEventListener("resume", function(){
    setTimeout("window.foreground=true;",1000);
}, false);

onerror=function(msg,url,l){
    var flie=self.location.href.split(/[\\\/.]/);
    var flieName=flie[flie.length-2];
    url=url.split(/[\\\/.]/).pop();
    url=url+"from("+flieName+")";
    alert(msg+";\n"+url+";\n"+l);
}