//获取status车辆状态
//车辆状态描述
function getStatus(){
    var STATUS_FORTIFY = "8193";
    var STATUS_LOCK = "8194";
    var STATUS_NETLOC = "8195";
    var STATUS_SLEEP = "8197";
    var status="";
    var len=uni_status.length();
    for (var h = 0; h < len; h++) {

        var jsonString2 = uni_status[h];
        if (jsonString2==(STATUS_FORTIFY)) {
            status += "设防,";
        } else if (jsonString2==(STATUS_LOCK)) {
            status += "锁车,";
        } else if (jsonString2==(STATUS_NETLOC)) {
            status += "基站定位,";
        } else if (jsonString2==(STATUS_SLEEP)) {
            status += "省电状态,";
        }
    return status;
    }
}/**
 * Created by allyn on 2015/8/10.
 */
