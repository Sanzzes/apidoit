/**
 * Created with JetBrains PhpStorm.
 * User: sbohm
 * Date: 01.02.13
 * Time: 14:02
 * To change this template use File | Settings | File Templates.
 */

    var l_last_response,
        l_menu,
        l_catg_menu;



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
                    list_tree_1.push('<li><a href="obj_menu.html#obj_menu?type_id='+item.id+'" data-ajax="false" rel="external"   class="menu_catg">' + item.title + '</a></li>');
                }
                if (item.tree_group == 2) {
                    list_tree_2.push('<li><a href="obj_menu.html#obj_menu?type_id='+item.id+'" data-ajax="false" rel="external"    class="menu_catg">' + item.title + '</a></li>');
                }
                if (item.tree_group == 3) {
                    list_tree_3.push('<li><a href="obj_menu.html#obj_menu?type_id='+item.id+'" data-ajax="false" rel="external"    class="menu_catg">' + item.title + '</a></li>');
                }

                if (item.tree_group == 1000) {
                    list_tree_4.push('<li><a href="obj_menu.html#obj_menu?type_id='+item.id+'" data-ajax="false" rel="external"   class="menu_catg">' + item.title + '</a></li>');
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
        $('.menu_tree').collapsible({inset: false});

    }

function buildDetail(p_json_return, p_obj_id, p_obj_type) {
           // $("input[id^=obj_name]:last").val(p_json_return.result[0].title);


}

