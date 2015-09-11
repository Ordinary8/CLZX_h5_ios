/**
 * Created by allyn on 2015/8/11.
 */
function getTodayDate(){
    var today = new Date();
    var today_year = parseInt(today.getFullYear());
    var today_month = parseInt(today.getMonth()) + 1;
    var today_date = parseInt(today.getDate());
    var today_hour = parseInt(today.getHours());
    var today_year_str=today_year;
    var today_month_str="";
    var today_date_str="";
    var today_hour_str="";
    var todayDate;
    if(today_month<10){
        today_month_str="0"+today_month;
    }else{today_month_str=today_month;}
    if(today_date<10){
        today_date_str="0"+today_date;
    }else{today_date_str=today_date;}
    todayDate=today_year_str+"-"+today_month_str+"-"+today_date_str;
    return todayDate;
}
$("#start_time").val(getTodayDate()+" 00:00");
$("#end_time").val(getTodayDate()+" 23:59");
var currYear = (new Date()).getFullYear();
var opt={};
opt.date = {preset : 'date'};
//opt.datetime = { preset : 'datetime', minDate: new Date(2012,3,10,9,22), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
opt.datetime = {preset : 'datetime'};
opt.time = {preset : 'time'};
opt.default = {
    theme: 'android-ics light', //皮肤样式
    display: 'modal', //显示方式
    mode: 'scroller', //日期选择模式
    lang:'zh',
    startYear:currYear , //开始年份
    endYear:currYear //结束年份
};
var optDateTime = $.extend(opt['datetime'], opt['default']);
$("#end_time").mobiscroll(optDateTime).datetime(optDateTime);
$("#start_time").mobiscroll(optDateTime).datetime(optDateTime);

