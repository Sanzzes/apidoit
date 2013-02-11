/**
 * Created with JetBrains PhpStorm.
 * User: sbohm
 * Date: 08.02.13
 * Time: 10:13
 * To change this template use File | Settings | File Templates.
 */

$(document).on('click', '.menu_obj_details', function(){
    $("#obj_details").trigger("pagebeforecreate");
})


$(document).bind("pagebeforechange", function( event, data ) {
    $.mobile.pageData = (data && data.options && data.options.pageData)
        ? data.options.pageData
        : null;

    var catg_id = $.mobile.pageData.type_id;
    var aData = '{ "method": "cmdb.objects",' +
        '"params": { ' +
        '"session": {' +
        '"username": "admin",' +
        '"password": "21232f297a57a5a743894a0e4a801fc3",' +
        '"language": "de",' +
        '"mandator": 1},' +
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
});



function buildObjMenu(p_json_return, p_obj_type) {

    var list = [],
        item;

    for (var i in p_json_return.result) {
        if (p_json_return.result.hasOwnProperty(i)) {
            item = p_json_return.result[i];
            list.push('<li><a href="details.html#obj_details?obj_id='+item.id+'&typ_id='+p_obj_type+'&catg_id=1" data-ajax="false" rel="external class="menu_obj_details">' + item.title + '</a></li>');

        }

    }

    $('#objMenu_listitems').html('' +
        '<ul data-role="listview" class="menu_lst" data-inset="false">' +
        list.join("") +
        '</ul>' +
        '</div>');


    $('.menu_lst').listview();
}