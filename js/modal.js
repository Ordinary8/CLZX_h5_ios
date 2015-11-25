/**
 * Created by allyn on 2015/8/11.
 */
function isExitsVariable(variableName) {
    try {
        if (typeof(variableName) == "undefined") {
            //alert("value is undefined");
            return false;
        } else {
            //alert("value is true");
            return true;
        }
    } catch(e) {}
    return false;
}
function modal(id) {
    var e1 = document.getElementById('modal-overlay');
    e1.style.visibility = (e1.style.visibility == "visible") ? "hidden" : "visible";
    var car_index = parseInt(id.substr(1));

    obj_id = carData[car_index].obj_id;
    obj_name=carData[car_index].obj_name;
    sessionStorage.obj_name=obj_name;
    sessionStorage.obj_id=obj_id;

    localStorage.setItem("carData",JSON.stringify(carData));//保存carData,从playback返回map页面时使用
}
function closeModal() {
    var e1 = document.getElementById('modal-overlay');
    e1.style.visibility = "hidden";
}