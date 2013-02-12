function load_obj_menu(){
    var aData = '{ "method": "cmdb.object_type_categories",' +
        '"params": { ' +
        '"session": {' +
        '"username": "admin",' +
        '"password": "21232f297a57a5a743894a0e4a801fc3",' +
        '"language": "de",' +
        '"mandator": 1},' +
        '"type":' + obj_type_id + ',' +
        '"order_by": "title"' +
        '},' +
        '"jsonrpc": "2.0"' +
        '}';
    request(aData, function (json) {
        l_obj_catg_menu = json;
        buildCatgMenu(l_obj_catg_menu, obj_id, obj_type_id);
    });
};

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
                list.push('<li><a href="#obj_details" onclick="javascript:clicked_item('+ p_obj_id +','+ item.id +','+ p_obj_type + ')" class="menu_obj_details">' + item.title + '</a></li>');
            }
        }
    }
    $('#obj_catg_listitems').html('' +
        '<ul data-role="listview" class="menu_lst_panel" data-inset="true">' +
        list.join("") +
        '</ul>' +
        '</div>');

    $('.menu_lst_panel').listview();
}