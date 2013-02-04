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
        l_clicked,
        l_catg_id,
        l_obj_type_id;

function clicked_item(p_item, p_catg, p_obj_type){
     l_clicked = p_item;
     l_catg_id = p_catg
     l_obj_type_id = p_obj_type
};

$(document).delegate("#obj_menu", "pagebeforecreate", function() {

    var catg_id = l_clicked;
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

$(document).delegate('#obj_details', "pagebeforecreate", function(){
    var obj_id = l_clicked;
    var catg_id = l_catg_id;
    var obj_type = l_obj_type_id;
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
        buildDetail(l_obj_detail_menu, obj_id, obj_type);
    });

});

function getCatgInfo(){

}

function getCatg(p_obj_id, p_obj_type_id){
    var obj_id = p_obj_id;
    var obj_type_id = p_obj_type_id;
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
        buildCatgMenu(l_obj_catg_menu,p_obj_id, obj_type_id);
    });
}

    function loadMenu() {
        if (typeof l_menu == 'undefined') {
            var page = $(this).attr('data-page');
            var aData = '{' +
                '"method": "cmdb.object_types",' +
                '"params": {' +
                '"session": {' +
                '"username": "admin",' +
                '"password": "21232f297a57a5a743894a0e4a801fc3",' +
                '"language": "de","mandator": 1},' +
                '"order_by": "title"},' +
                '"jsonrpc": "2.0"' +
                '}';
            request(aData, function (json) {
                l_menu = json;
                buildMenu(l_menu);
            });
        } else {
            // Menü aufbauen
            buildMenu(l_menu);

        }


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

    function buildMenu(p_json_return) {

        var list_tree_1 = [],
            list_tree_2 = [],
            list_tree_3 = [],
            list_tree_4 = [],
            item;

        for (var i in p_json_return.result) {
            if (p_json_return.result.hasOwnProperty(i)) {
                item = p_json_return.result[i];
                if (item.tree_group == 1) {
                    list_tree_1.push('<li><a href="#obj_menu" onclick="javascript:clicked_item('+ item.id +')"  class="menu_catg">' + item.title + '</a></li>');
                }
                if (item.tree_group == 2) {
                    list_tree_2.push('<li><a href="#obj_menu" onclick="javascript:clicked_item('+ item.id +')"   class="menu_catg">' + item.title + '</a></li>');
                }
                if (item.tree_group == 3) {
                    list_tree_3.push('<li><a href="#obj_menu" onclick="javascript:clicked_item('+ item.id +')"   class="menu_catg">' + item.title + '</a></li>');
                }

                if (item.tree_group == 1000) {
                    list_tree_4.push('<li><a href="#obj_menu" onclick="javascript:clicked_item('+ item.id +')"  class="menu_catg">' + item.title + '</a></li>');
                }

            }

        }

        $('#menu_listitems').html(''+
            '<div data-role="collapsible" data-inset="false" data-expanded-icon="arrow-d" data-collapsed-icon="arrow-r" data-content-theme="d" data-theme="b" class="menu_tree">' +
            '<h3>Software</h3>' +
            '<ul data-role="listview" class="menu_lst">' +
            list_tree_1.join("") +
            '</ul>' +
            '</div>' +
            '<div data-role="collapsible" data-inset="false" data-expanded-icon="arrow-d" data-collapsed-icon="arrow-r" data-content-theme="d" data-theme="b" class="menu_tree">' +
            '<h3>Infrastruktur</h3>' +
            '<ul data-role="listview" class="menu_lst">' +
            list_tree_2.join("") +
            '</ul>' +
            '</div>' +
            '<div data-role="collapsible" data-inset="false" data-expanded-icon="arrow-d" data-collapsed-icon="arrow-r" data-content-theme="d" data-theme="b" class="menu_tree">' +
            '<h3>Andere</h3>' +
            '<ul data-role="listview" class="menu_lst">' +
            list_tree_3.join("") +
            '</ul>' +
            '</div>' +
            '<div data-role="collapsible" data-inset="false" data-expanded-icon="arrow-d" data-collapsed-icon="arrow-r" data-content-theme="d" data-theme="b" class="menu_tree">' +
            '<h3>Kontakte</h3>' +
            '<ul data-role="listview" class="menu_lst">' +
            list_tree_4.join("") +
            '</ul>' +
            '</div>');

        $('.menu_lst').listview();
        $('.menu_tree').collapsible({inset: true});

    }

function buildObjMenu(p_json_return, p_obj_type) {

    var list = [],
        item;

    for (var i in p_json_return.result) {
        if (p_json_return.result.hasOwnProperty(i)) {
            item = p_json_return.result[i];
            list.push('<li><a href="#obj_details" onclick="javascript:clicked_item('+ item.id +',1,'+ p_obj_type + ')" class="menu_obj_details">' + item.title + '</a></li>');

        }

    }

    $('#objMenu_listitems').html('' +
        '<ul data-role="listview" class="menu_lst" data-inset="true">' +
        list.join("") +
        '</ul>' +
        '</div>');


    $('.menu_lst').listview();
}

function buildDetail(p_json_return, p_obj_id, p_obj_type) {
           // $("input[id^=obj_name]:last").val(p_json_return.result[0].title);
        getCatg(p_obj_id,p_obj_type);


}

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
        list.push('<li><a href="#obj_details" onclick="javascript:clicked_item('+ item.id +','+ item.id +','+ p_obj_type + ')" class="menu_obj_details">' + item.title + '</a></li>');
    }
    }
   }

    $('#panel_content').html('' +
        '<ul data-role="listview" class="menu_lst_panel" data-inset="true">' +
        list.join("") +
        '</ul>' +
        '</div>');

    $('.menu_lst_panel').listview();
}

$(document).on('swiperight', function(){
    $('#obj_catg_panel').panel('open');
})

