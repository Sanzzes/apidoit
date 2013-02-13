/**
 * Created with JetBrains PhpStorm.
 * User: sbohm
 * Date: 12.02.13
 * Time: 09:48
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

    var obj_id = $.mobile.pageData.obj_id;
    var obj_type_id = $.mobile.pageData.type_id;

    var aData = '{ "method": "cmdb.object_type_categories",' +
        '"params": { ' +
        '"session": {' +
        '"username": "' +window.localStorage.getItem("username")+'",' +
        '"password": "'+ $.md5(window.localStorage.getItem("password"))+'",' +
        '"language": "'+ window.localStorage.getItem("language")+'",' +
        '"mandator": "'+ window.localStorage.getItem("mandator")+'"},' +
        '"type":' + obj_type_id + ',' +
        '"order_by": "title"' +
        '},' +
        '"jsonrpc": "2.0"' +
        '}';
    request(aData, function (json) {
        l_obj_catg_menu = json;
        buildCatgMenu(l_obj_catg_menu, obj_id, obj_type_id);
    });
    $.mobile.loading('hide');
});

function buildCatgMenu(p_json_return, p_obj_id, p_obj_type) {

    var list = [],
        item,
        item_temp,
        s = 0;

    for (var i in p_json_return.result) {
        if (p_json_return.result.hasOwnProperty(i)) {
            item_temp = p_json_return.result[i];
            for (var s in item_temp){
                item = item_temp[s];
                if(item.id != 31){
                list.push('<li><a href="details.html#obj_details?obj_id='+p_obj_id+'&type_id='+p_obj_type+'&catg_id='+item.id+'" data-ajax="false" rel="external" class="menu_obj_details">' + item.title + '</a></li>');
                }
            }
        }
    }
    $('#obj_catg_listitems').html('' +
        '<ul data-role="listview" class="menu_lst_panel" data-inset="false">' +
        list.join("") +
        '</ul>' +
        '</div>');

    $('.menu_lst_panel').listview();
}