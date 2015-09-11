/**
 * Created by allyn on 2015/8/12.
 */

jQuery.validator.methods.compareDate = function(value, element, param) {
    var startDate = jQuery(param).val() + ":00";//补全yyyy-MM-dd HH:mm:ss格式
    value = value + ":00";

    var date1 = NewDate(startDate).getTime();
    var date2 = NewDate(value).getTime();
    return date1 < date2;
};
jQuery.validator.methods.compareDate2 = function(value, element, param) {
    var startDate = jQuery(param).val() + ":00";//补全yyyy-MM-dd HH:mm:ss格式
    value = value + ":00";

    var date1 = NewDate(startDate).getTime();
    var date2 = NewDate(value).getTime();
    var d=date2-date1;
    return d<24*60*60*1000;
};

jQuery("#form1").validate({
    focusInvalid:false,
    rules:{
        "start_time":{
            required: true
        },
        "end_time": {
            required: true,
            compareDate: "#start_time",
            compareDate2:"#start_time"
        }
    },
    messages:{
        "start_time":{
            required: "开始时间不能为空"
        },
        "end_time":{
            required: "结束时间不能为空",
            compareDate: "结束日期必须大于开始日期!",
            compareDate2:"结束日期与开始日期的时间间隔必须在24小时以内!"
        }
    }
});