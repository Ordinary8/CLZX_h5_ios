function getAlert(uni_alerts){
    var alert="";
    for(var k= 0;k<uni_alerts.length;k++){
        var jsonString = uni_alerts[k];
        if (jsonString==ALERT_SOS) {
            alert+= "紧急报警,";
        } else if (jsonString==ALERT_OVERSPEED) {
            alert += "超速报警,";
        } else if (jsonString==ALERT_VIRBRATE) {
            alert += "震动报警,";
        } else if (jsonString==ALERT_MOVE) {
            alert += "位移报警,";
        } else if (jsonString==ALERT_ALARM) {
            alert += "防盗器报警,";
        } else if (jsonString==ALERT_INVALIDRUN) {
            alert += "非法行驶报警,";
        } else if (jsonString==ALERT_ENTERGEO) {
            alert += "进围栏报警,";
        } else if (jsonString==ALERT_EXITGEO) {
            alert += "出围栏报警,";
        } else if (jsonString==ALERT_CUTPOWER) {
            alert += "剪线报警,";
        } else if (jsonString==ALERT_LOWPOWER) {
            alert += "低电压报警,";
        } else if (jsonString==ALERT_GPSCUT) {
            alert += "GPS断线报警,";
        } else if (jsonString==ALERT_OVERDRIVE) {
            alert += "疲劳驾驶报警,";
        } else if (jsonString==ALERT_INVALIDACC) {
            alert += "非法点火报警,";
        } else if (jsonString==ALERT_INVALIDDOOR) {
            alert += "非法开门报警,";
        }
    }
    return alert;
}
function getStatus(uni_status){
    var status="";
    if(uni_status!==null){
        for (var m = 0; m < uni_status.length; m++) {
            var jsonString2 = uni_status[m];
            if (jsonString2==STATUS_FORTIFY) {
                status += "设防,";
            } else if (jsonString2==STATUS_LOCK) {
                status += "锁车,";
            } else if (jsonString2==STATUS_NETLOC) {
                status += "基站定位,";
            } else if (jsonString2==STATUS_SLEEP) {
                status += "省电状态,";
            }
        }
    }

    return status;
}
/**
 * Created by allyn on 2015/8/14.
 */
function getStateHtml(gps_flag,speed,alert,status){
    var statehtml="";
    if (gps_flag % 2 == 0) {
        if (speed > 0) {// 速度判断
            statehtml = "行驶 " + status + alert + " " + speed
                + "km/h";
        } else {
            statehtml = "静止 " + status + alert;
        }
    } else {
        if (speed > 0) {
            statehtml = "盲区 " + status + alert;
        } else {
            statehtml = "静止 " + status + alert;
        }
    }
    if (statehtml.substr(statehtml.length-1)==",") {// 格式化结果
        statehtml = statehtml.substr(0, statehtml.length - 1);
    }
    return  statehtml;
}
