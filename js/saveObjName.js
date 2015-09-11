/**
 * Created by allyn on 2015/8/20.
 */
function saveObjName(){
    var obj_name=$("li:first").text();
    sessionStorage.obj_name=obj_name;
    $("ul li:first").change(function(){
        obj_name=$("li:first").text();
        sessionStorage.obj_name=obj_name;
    });
    $("ul a").click(function(){
        obj_name=this.text();
        sessionStorage.obj_name=obj_name;
    })
}