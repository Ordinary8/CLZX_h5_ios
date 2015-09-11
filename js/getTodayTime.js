/**
 * Created by allyn on 2015/8/11.
 */
//获取当前时间，并格式化为url字符串
function getTodayTime(){
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
    var today_time_url;

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
    today_time_url=today_year_str+"-"+today_month_str+"-"+today_date_str+"+"+today_hour_str+"%3A"+today_minute_str+"%3A"+today_second_str;
    return today_time_url;
}
function getTodayFormatTime(){
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
    var today_time_url;

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
    today_time_format=today_year_str+"-"+today_month_str+"-"+today_date_str+" "+today_hour_str+":"+today_minute_str+":"+today_second_str;
    return today_time_format;
}

//获取15分钟前的时间
function getEarlyTime(){
    var early = new Date() - 20*60000;//20分钟前的总毫秒数
    early = new Date(early);
    var early_year = parseInt(early.getFullYear());
    var early_month = parseInt(early.getMonth()) + 1;
    var early_date = parseInt(early.getDate());
    var early_hour = parseInt(early.getHours());
    var early_minute = parseInt(early.getMinutes());
    var early_second=parseInt(early.getSeconds());
    var early_year_str=early_year;
    var early_month_str="";
    var early_date_str="";
    var early_hour_str="";
    var early_minute_str="";
    var early_second_str="";
    var early_time_url;
    if(early_month<10){
        early_month_str="0"+early_month;
    }else{early_month_str=early_month;}
    if(early_date<10){
        early_date_str="0"+early_date;
    }else{early_date_str=early_date;}
    if(early_hour<10){
        early_hour_str="0"+early_hour;
    }else{early_hour_str=early_hour;}
    if(early_minute<10){
        early_minute_str="0"+early_minute;
    }else{early_minute_str=early_minute;}
    if(early_second<10){
        early_second_str="0"+early_second;
    }else{early_second_str=early_second;}
    early_time_url=early_year_str+"-"+early_month_str+"-"+early_date_str+"+"+early_hour_str+"%3A"+early_minute_str+"%3A"+early_second_str;
    return early_time_url;
}
function getOffMinutes(rcv_time){
    var off_minutes;
    var currentTime=today.getTime();
    var rcvDate=new Date(rcv_time);
    var rcvTime=rcvDate.getTime();
    off_minutes=(currentTime-rcvTime)/(60*1000);
    return off_minutes;
}
function dateFormal(date){
    var today = new Date(date);
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
    var today_time_url;

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
    today_time_format=today_year_str+"-"+today_month_str+"-"+today_date_str+" "+today_hour_str+":"+today_minute_str+":"+today_second_str;
    return today_time_format;
}