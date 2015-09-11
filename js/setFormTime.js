/**
 * Created by allyn on 2015/8/12.
 */
function setFormTime(){
    var today = new Date();
    var today_year = parseInt(today.getFullYear());
    var today_month = parseInt(today.getMonth()) + 1;
    var today_date = parseInt(today.getDate());
    var today_hour = parseInt(today.getHours());
    var today_minute = parseInt(today.getMinutes());
    var today_second=parseInt(today.getSeconds());

    var today_year_str=today_year;
    var today_month_str="";
    var today_date_str="";
    var today_hour_str="";
    var today_minute_str="";
    var today_second_str="";

    if(today_month<10){
        today_month_str="0"+today_month;
    }else{today_month_str=today_month;}
    if(today_date<10){
        today_date_str="0"+today_date;
    }else{today_date_str=today_date;}
    if(today_hour<10){
        today_hour_str="0"+today_hour;
    }else{today_hour_str=today_hour;}
    if(today_minute<10){
        today_minute_str="0"+today_minute;
    }else{today_minute_str=today_minute;}
    if(today_second<10){
        today_second_str="0"+today_second;
    }else{today_second_str=today_second;}
    $("#start_time").value=today_year_str+"-"+today_month_str+"-"+today_date_str+" 00:00";
    $("#end_time").value=today_year_str+"-"+today_month_str+"-"+today_date_str+" "+today_hour_str+":"+today_minute_str;
}
