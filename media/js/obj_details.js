/**
 * Created with JetBrains PhpStorm.
 * User: sbohm
 * Date: 08.02.13
 * Time: 10:13
 * To change this template use File | Settings | File Templates.
 */



$(document).bind("pagebeforechange", function( event, data ) {
    $.mobile.loading('show', {
        text:'Wird geladen',
        textVisible:true,
        theme:'b',
        html:""
    });
    $.mobile.pageData = (data && data.options && data.options.pageData)
        ? data.options.pageData
        : null;

    var catg_id = $.mobile.pageData.catg_id;
    var obj_id = $.mobile.pageData.obj_id;
    var obj_type = $.mobile.pageData.type_id;

    var aData = '{ "method": "cmdb.category",' +
        '"params": { ' +
        '"session": {' +
        '"username": "admin",' +
        '"password": "21232f297a57a5a743894a0e4a801fc3",' +
        '"language": "de",' +
        '"mandator": 1},' +
        '"objID":' + obj_id + ',' +
        '"catgID": ' + catg_id +
        '},' +
        '"jsonrpc": "2.0"' +
        '}';
    request(aData, function (json) {
        l_obj_detail_menu = json;
        $('#backButton').attr('href', 'obj_menu.html#obj_menu?type_id='+obj_type);
        $('#catg_obj_btn').attr('href', 'obj_catg_menu.html#obj_catg_menu?type_id='+obj_type+'&obj_id='+obj_id);
        buildDetail(l_obj_detail_menu, obj_id, obj_type);
    });
    $.mobile.loading('hide');
});


function buildDetail(p_json_return, p_obj_id, p_obj_type) {
    // $("input[id^=obj_name]:last").val(p_json_return.result[0].title);


}