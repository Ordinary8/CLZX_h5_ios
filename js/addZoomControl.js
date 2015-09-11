/**
 * Created by allyn on 2015/8/12.
 */
function addZoomControl(map){
    var control_opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM,
        offset: new BMap.Size(10,30),
        anchor: BMAP_ANCHOR_BOTTOM_LEFT};
    var navControl = new BMap.NavigationControl(control_opts);
    map.addControl(navControl);
}