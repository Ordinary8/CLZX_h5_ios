/**
 * Created by allyn on 2015/8/10.
 */
//获取车辆图标类型state
function getState(){
    var state="";
    if (data.data[i].active_gps_data.uni_alerts.length >= 1 && data.data[i].active_gps_data.uni_alerts[0] !== null) {
        state = "alert";
        /*if (data.data[i].active_gps_data.speed > 0) {
         statehtml = "<p>行驶，"+status+alert+" "+speed+"km/h</p>";
         } else {
         if (off_minutes > 10) {
         statehtml = "<p>已离线，"+status+"</p>";
         } else {
         statehtml = "<p>静止，</p>";
         }
         }*/
    } else {
        if (data.data[i].active_gps_data.speed > 0) {
            state = "on";
            //statehtml = "<p>行驶中……</p>";
        } else {
            if (off_minutes > 10) {
                state = "off";
                // statehtml = "<p>已离线</p>";
            } else {
                state = "out";
                //statehtml = "<p>静止</p>";
            }
        }
    }
    return state;
}
