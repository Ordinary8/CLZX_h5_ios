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
    /*if(isExitsVariable(car_index)){
        car_index=null;
    }else{
        var car_index = parseInt(id.substr(1));
    }
    if(isExitsVariable(obj_id)){
        obj_id=null;
    }else{var obj_id="";}
    if(isExitsVariable(obj_name)){
        obj_name=null;
        sessionStorage.obj_name="";
    }else{var obj_name="";}
    var url = urlHead+"customer/177/vehicle?auth_code=f6cdab399b363a36aac40724857c31ea&tree_path=,1,177,&mode=all&page_no=1&page_count=20";

    $.get(url, function (data) {
        obj_id = data.data[car_index].obj_id;
        obj_name=data.data[car_index].obj_name;
        sessionStorage.obj_name=obj_name;
        sessionStorage.obj_id=obj_id;
    },"json");*/
}
function closeModal() {
    var e1 = document.getElementById('modal-overlay');
    e1.style.visibility = "hidden";
}