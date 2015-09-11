地图车辆定位-----map.html将地图中心点设置为当前GPS传回经纬度数据
地图车辆车辆信息显示---map.html添加infoWindow窗口  显示所有车辆，
opts:rotation    icon
车辆跟踪----track.html显示当前GPS传回经纬度数据并每隔1s更新中心点数据，并增加polyline、跟踪过程中，infoWindow中的信息也是每秒更新的
行程回放----playback 按设定的起始时间绘制轨迹

回放
js运行逻辑顺序
    1.首先显示的是折线图（路线），起点（现在所处点汽车marker）;（不延时地显示）
    2.点击运行按钮，激活事件函数
         1.获取点数组，点数
         2.每100毫秒，添加一个marker的通过setTimeout循环实现，

跟踪
    1.从url获取车辆obj_id
    2.获取当前时间
    3.请求当前轨迹点，obj_id  start_time=today_time_early; end_time=today_time;
    4.以最后一个点为中心加载地图，并加标注，（如果）画轨迹
    5.setTimeou无线循环。每500毫秒刷新一次。重复进行2.3.4步骤
