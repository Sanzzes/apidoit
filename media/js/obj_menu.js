/**
 * Created with JetBrains PhpStorm.
 * User: sbohm
 * Date: 01.02.13
 * Time: 14:02
 * To change this template use File | Settings | File Templates.
 */

    var l_last_response,
        l_menu,
        l_catg_menu,
        l_obj_detail_menu;

    function loadMenu() {
            var catg_id = $(this).attr('data-catg');
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
                buildCatgMenu(l_catg_menu,catg_id);
            });
    }

    function request(p_json, callback) {
        $.mobile.loading('show', {
            text:'Wird geladen',
            textVisible:true,
            theme:'b',
            html:""
        });
        $.ajax({
            type:'POST',
            url:'http://steven-bohm.net/idoit-pro/index.php?api=jsonrpc',
            data:p_json,
            crossDomain:true,
            headers:{'idoitapi':'request'},
            //contentType:'application/json',
            dataType:'json',
            success:function (json) {
                l_last_response = json;
                callback(json);
                $.mobile.loading('hide');
                $.mobile.silentScroll();
            },
            error:function (json) {
                l_last_response = json;
            }

        })
    }
function buildCatgMenu(p_json_return, p_obj_type) {

    var list = [],
        item;

    for (var i in p_json_return.result) {
        if (p_json_return.result.hasOwnProperty(i)) {
            item = p_json_return.result[i];
            list.push('<li><a href="#" data_obj_type = "'+ p_obj_type +'" data-obj_catg_id="1" data-obj_id="' + item.id + '" class="menu_obj_details">' + item.title + '</a></li>');

        }

    }

    $('#objMenu').html('' +
        '<ul data-role="listview" class="menu_lst">' +
        list.join("") +
        '</ul>' +
        '</div>');


    $('.menu_lst').listview();
}
