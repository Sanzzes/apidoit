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

    var catg_id = $.mobile.pageData.type_id;
    var aData = '{ "method": "cmdb.objects",' +
        '"params": { ' +
        '"session": {' +
        '"username": "' +window.localStorage.getItem("username")+'",' +
        '"password": "'+ $.md5(window.localStorage.getItem("password"))+'",' +
        '"language": "'+ window.localStorage.getItem("language")+'",' +
        '"mandator": "'+ window.localStorage.getItem("mandator")+'"},' +
        '"filter": {' +
        '"type": ' + catg_id +
        '}' +
        '},' +
        '"jsonrpc": "2.0"' +
        '}';
    request(aData, function (json) {
        l_catg_menu = json;
        buildObjMenu(l_catg_menu,catg_id);
    });
    $.mobile.loading('hide');
});



function buildObjMenu(p_json_return, p_obj_type) {

    var list = [],
        item;

    for (var i in p_json_return.result) {
        if (p_json_return.result.hasOwnProperty(i)) {
            item = p_json_return.result[i];
            list.push('<li><a href="details.html#obj_details?obj_id='+item.id+'&type_id='+p_obj_type+'&catg_id=1" data-ajax="false" rel="external class="menu_obj_details">' + item.title + '</a></li>');

        }

    }

    $('#objMenu_listitems').html('' +
        '<ul data-role="listview" class="menu_lst" data-inset="false">' +
        list.join("") +
        '</ul>' +
        '</div>');


    $('.menu_lst').listview();
}