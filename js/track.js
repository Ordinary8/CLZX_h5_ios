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
    } catch (e) {
    }
    return false;
}

function track(id) {
    var car_index = parseInt(id.substr(1));
    if(trackCar){
        trackP=null;
        map.removeOverlay(map.carPl);
        $("#addressInfoCtrl").css("display","none");
        var win=map.getInfoWindow();
        var con=win.getContent().replace("取消","");
        win.setContent(con);
        if(car_index==trackCar.car_index){
            trackCar=null;
            return;
        }
    }
    trackCar=carData[car_index];
    trackCar.car_index=car_index;
    trackP=[];
    trackP.push(new BMap.Point(trackCar.active_gps_data.b_lon, trackCar.active_gps_data.b_lat));//线的1起点
    $("#t"+trackCar.car_index).text("取消跟踪");    
    $("#addressInfoCtrl").css("display","block");
}

function drawLine(){
    //画跟踪线
    if(!trackCar)return;
    map.removeOverlay(map.carPl);
    //当前的点
    temTrackP=new BMap.Point(trackCar.active_gps_data.b_lon, trackCar.active_gps_data.b_lat);

    //changeAddress(temTrackP);

    trackP.push(temTrackP);
    map.carPl = new BMap.Polyline(trackP, {strokeColor: 'blue', strokeWeight: 4, strokeOpacity: 0.8});
    map.addOverlay(map.carPl);
    changeAddress(temTrackP);
    map.panTo(temTrackP);
}

//开始无限循环请求：
function move() {
    var i = 0;

    function resetMkPoint(i) {
        url = urlHead + "customer/" + customer_id + "/active_gps_data?auth_code=" + auth_code + "&update_time=" + lastTime + "&mode=all&tree_path=" + tree_path;
        //console.log(url);
        $.get(url, function (data) {
            for (u = 0; u < data.length; u++) {
                if (obj_id == parseInt(data[u].obj_id)) {
                    lng = data[u].active_gps_data.b_lon;
                    lat = data[u].active_gps_data.b_lat;
                    lastTime = data[u].active_gps_data.rcv_time;
                    lastTime=dateFormal(lastTime);
                    lastTime=lastTime.replace(/:/g,"%3A").replace(" ","+");
                    x=u;
                    direct=data[u].active_gps_data.direct;
                }
            }

            po0 = carMk.getPosition();
            po1 = new BMap.Point(lng, lat);
            if (po0 !== po1) {
                carMk.setPosition(po1);
                map.panTo(po1);
                carMk.setRotation(direct);
                var carPl = new BMap.Polyline([po0, po1], {strokeColor: 'blue', strokeWeight: 4, strokeOpacity: 0.8});
                map.addOverlay(carPl);
            }
            var rcv_time = data[x].active_gps_data.rcv_time;
            rcv_time=dateFormal(rcv_time);
            var speed = data[x].active_gps_data.speed;
            speed=Math.round(speed);
            var gps_flag = data[x].active_gps_data.gps_flag;
            var mileage = data[x].active_gps_data.mileage;
            var uni_alerts = data[x].active_gps_data.uni_alerts;
            var alert = getAlert(uni_alerts);
            var uni_status = data[x].active_gps_data.uni_status;
            var status = getStatus(uni_status);
            var statehtml = getStateHtml(gps_flag, speed, alert, status);
            //添加信息窗口的内容
            var content = "<div class='infoWindow' <p><b>" + obj_name + "</b></p>" + "<p>" + rcv_time + "</p>" + "<p>" + statehtml + "</p>" + "<p>里程：" + mileage + "km</p></div>";
            var window_opts = {width: 0,
                height: 0
            };
            var infoWindow = new BMap.InfoWindow(content, window_opts);
            carMk.openInfoWindow(infoWindow);

            setTimeout(function () {
                i++;
                resetMkPoint(i);
            }, 10000);

        }
    ,"json");
    }
    resetMkPoint(0);
}

function getPos(){
    //从url中获取开始、结束时间
    var param = window.location.search;
    var obj_id = param.substr(param.indexOf("=") + 1);
    var obj_name=sessionStorage.obj_name;   //利用html 5的sessionStorage取出存好的obj_name
    var lng,lat;
    var lastTime=sessionStorage.lastTime;
    lastTime=dateFormal(lastTime);
    lastTime=lastTime.replace(/:/g,"%3A").replace(" ","+");
    var url=urlHead+"customer/"+customer_id+"/active_gps_data?auth_code="+auth_code+"&update_time="+lastTime+"&mode=all&tree_path="+tree_path;
    //初始化地图
    /*var map = new BMap.Map("container");
    var po0,po1;
    var u,direct,x;
    //控件
    var zoomControl = new BMap.NavigationControl({type:BMAP_NAVIGATION_CONTROL_ZOOM,anchor:BMAP_ANCHOR_BOTTOM_RIGHT,offset: new BMap.Size(5, 10)});
    map.addControl(zoomControl);//添加缩放控件*/
    var carMk;
    $.get(url,function(data) {
                for (u = 0; u < data.length; u++) {
                    if (obj_id == parseInt(data[u].obj_id)) {
                        lng = data[u].active_gps_data.b_lon;
                        lat = data[u].active_gps_data.b_lat;
                        po0 = new BMap.Point(lng, lat);
                        map.centerAndZoom(po0, 17);
                        carMk = new BMap.Marker(po0, {icon: new BMap.Icon("image/car_off.png", new BMap.Size(28, 28)), rotation: data[u].active_gps_data.direct});
                        map.addOverlay(carMk);
                        lastTime = data[u].active_gps_data.rcv_time;
                    }
                }
            }
        ,"json");
    move();
}