/**
 * Created with JetBrains PhpStorm.
 * User: sbohm
 * Date: 08.02.13
 * Time: 10:13
 * To change this template use File | Settings | File Templates.
 */

$(document).bind("pagebeforechange", function (event, data) {
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
        '"username": "' +window.localStorage.getItem("username")+'",' +
        '"password": "'+ $.md5(window.localStorage.getItem("password"))+'",' +
        '"language": "'+ window.localStorage.getItem("language")+'",' +
        '"mandator": "'+ window.localStorage.getItem("mandator")+'"},' +
        '"objID":' + obj_id + ',' +
        '"catgID": ' + catg_id +
        '},' +
        '"jsonrpc": "2.0"' +
        '}';
    request(aData, function (json) {
        l_obj_detail_menu = json;
        $('#backButton').attr('href', 'obj_menu.html#obj_menu?type_id=' + obj_type);
        $('#catg_obj_btn').attr('href', 'obj_catg_menu.html#obj_catg_menu?type_id=' + obj_type + '&obj_id=' + obj_id);
        buildDetail(l_obj_detail_menu, obj_id, obj_type, catg_id);
    });
    $.mobile.loading('hide');
});


function buildDetail(p_json_return, p_obj_id, p_obj_type, p_catg_id) {
    // $("input[id^=obj_name]:last").val(p_json_return.result[0].title);
    var item, item2, list_tree = [];
    var aData = '{ "method": "cmdb.category_info",' +
        '"params": { ' +
        '"session": {' +
        '"username": "' +window.localStorage.getItem("username")+'",' +
        '"password": "'+ $.md5(window.localStorage.getItem("password"))+'",' +
        '"language": "'+ window.localStorage.getItem("language")+'",' +
        '"mandator": "'+ window.localStorage.getItem("mandator")+'"},' +
        '"catgID":' + p_catg_id + ',' +
        '"id": ' + p_obj_id +
        '},' +
        '"jsonrpc": "2.0"' +
        '}';
    request(aData, function (json) {
        l_obj_detail_types = json;
        item2 = l_obj_detail_types.result;
        if (p_json_return.result.length != 0) {

            for (var i in p_json_return.result) {
                if (p_json_return.result.hasOwnProperty(i)) {
                    item = p_json_return.result[i];
                    for (key in l_obj_detail_types.result) {
                        if (item[key].title != undefined) {
                            list_tree.push(fill_listree(item[key].title, key, item2[key]));
                        } else {
                            list_tree.push(fill_listree(item[key], key, item2[key]));
                        }

                    }
                }
            }
        } else {
            for (key in json.result) {
                list_tree.push(fill_listree("", key, item2[key]));

            }
        }

        $('#obj_details_list').html('' +
            '<ul data-role="listview" class="menu_lst" data-inset="false">' +
            list_tree.join("") +
            '</ul>' +
            '</div>');
        $('.menu_lst').listview();
        $('#obj_details').trigger('create');
    });
}

function fill_listree(p_data, p_key_name, p_item) {
    var listtree;

    if (p_item.ui.type == "text" || p_item.ui.type == "dialog" || p_item.ui.type == "popup") {
        listtree = '<li>' + p_item.info.description + ': <input class="catg_inputs" type="text"' +
            'id="' + p_item.ui.id + '"' +
            'name="' + p_key_name + '"' +
            'value="' + p_data + '" disabled/></li>';
    }

    if (p_item.ui.type == "textarea") {
        listtree = '<li>' + p_item.info.description + ':<br /> <textarea class="catg_inputs"' +
            'id="' + p_item.ui.id + '"' +
            'name="' + p_key_name + '"' +
            'disabled>' + p_data + '</textarea></li>';
    }

    return listtree;
}


/*
 $(document).on('swiperight', function(){
 $('#obj_catg_panel').panel('open');
 })
 $(document).on('swipeleft', function(){
 $('#obj_catg_panel').panel('close');
 })*/