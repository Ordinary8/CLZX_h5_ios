if(localStorage.getItem('debugFlag')==11)
    onerror=function(msg,url,l){
        url=url.split(/[\\\/]/).pop();
        alert(msg+";\n"+url+";\n"+l);
    }

/**
 * Created by allyn on 2015/8/11.
 */
var urlHead="http://web.wisegps.cn:3000/";//url
var customer_id=localStorage.cust_id;
var auth_code=localStorage.auth_code;
var tree_path=localStorage.tree_path;
var number_type=localStorage.number_type;
var userName=localStorage.userName;//用户登录名
var parentId=localStorage.parent_cust_id;//上级id
if(customer_id==null||auth_code==null||tree_path==null){
    window.location.assign("index.html");
}


//当前时间
var today = new Date();
var today_year = parseInt(today.getFullYear());
var today_month = parseInt(today.getMonth()) + 1;
var today_date = parseInt(today.getDate());
var today_hour = parseInt(today.getHours());
var today_minute = parseInt(today.getMinutes());
var today_minutes = today_year * 365 * 24 * 60 + today_month * 30 * 24 * 60 + today_date * 24 * 60 + today_hour * 60 + today_minute;

//车辆状态描述
var STATUS_FORTIFY = "8193";
var STATUS_LOCK = "8194";
var STATUS_NETLOC = "8195";
var STATUS_SLEEP = "8197";

//报警信息描述
var ALERT_SOS = "12289";
var ALERT_OVERSPEED = "12290";
var ALERT_VIRBRATE = "12291";
var ALERT_MOVE = "12292";
var ALERT_ALARM = "12293";
var ALERT_INVALIDRUN = "12294";
var ALERT_ENTERGEO = "12295";
var ALERT_EXITGEO = "12296";
var ALERT_CUTPOWER = "12297";
var ALERT_LOWPOWER = "12298";
var ALERT_GPSCUT = "12299";
var ALERT_OVERDRIVE = "12300";
var ALERT_INVALIDACC = "12301";
var ALERT_INVALIDDOOR = "12302";

function setNewCenter(point,map) {
    var bs=map.getBounds();
    var bssw = bs.getSouthWest();   //可视区域左下角
    var bsne = bs.getNorthEast();   //可视区域右上角
    var boo=point.lat>bssw.lat&&point.lat<bsne.lat&&point.lng>bssw.lng&&point.lat<bssw.lng;
    if(!boo){
        map.panTo(point);
    }
}


function NewDate(str) {
    var date = new Date();
    var str_before = str.split(/[T\s]/)[0]; //获取年月日
    var str_after = str.split(/[T\s]/)[1]; //获取时分秒
    var years = str_before.split('-')[0]; //分别截取得到年月日
    var months = str_before.split('-')[1] - 1;
    var days = str_before.split('-')[2];
    var hours = str_after.split(':')[0];
    var mins = str_after.split(':')[1];
    var seces = str_after.split(':')[2].replace("Z", "");
    var secs = seces.split('.')[0];
    var smsecs = seces.split('.')[1]||"000";
    date.setUTCFullYear(years, months, days);
    date.setUTCHours(hours, mins, secs, smsecs);
    return date;
}

function changeAddress(point) { //改变地址方法
    $("#addressInfoCtrl").css("display","block");
    var geoc = new BMap.Geocoder();
    var addressStr="";
    geoc.getLocation(point, function(rs) {
        var addComp = rs.addressComponents;
        addressStr= addComp.province  + addComp.city  + addComp.district  + addComp.street  + addComp.streetNumber;
        $("#addressInfoCtrl").text(addressStr);
    });
}//地址随车辆位置变化