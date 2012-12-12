/**
 * Created with JetBrains PhpStorm.
 * User: sbohm
 * Date: 16.11.12
 * Time: 09:05
 * To change this template use File | Settings | File Templates.
 */

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



$(document).ready(function () {
    var l_last_response,
        l_menu,
        l_catg_menu,
        l_obj_detail_menu;
    menuLinks();

    /*
     * Main Menu Request
     *
     *
     */

     $(document).on("click", "#menu_btn", function () {
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


     })


    /*
     * Catg Menu Logic
     *
     *
     */
    $(document).on("click", ".menu_catg", function () {
        $('#menu_btn').removeClass('ui-btn-active');
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


    })


    /*
     * Obj Details Call
     *
     *
     */
    $(document).on("click", ".menu_obj_details", function () {
        var obj_id = $(this).attr('data-obj_id');
        var catg_id = $(this).attr('data-obj_catg_id');
        var obj_type = $(this).attr('data_obj_type');
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
            buildDetailMenu(l_obj_detail_menu, obj_id, obj_type);
        });


    })

    /*
     * Simple Ajax Request to our JSonApi
     *
     */
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

    /*
     * Test Code
     *  ToDo: Remove this code or rename it!
     */

    $(document).on('click', '#menu_blub', function () {
        var aData = '{ "method": "cmdb.category_info",' +
            '"params": { ' +
            '"session": {' +
            '"username": "admin",' +
            '"password": "21232f297a57a5a743894a0e4a801fc3",' +
            '"language": "de",' +
            '"mandator": 1},' +
            '"catgID": "3",' +
            '"id": 22 ' +
            '},' +
            '"jsonrpc": "2.0"' +
            '}';
        request(aData, function (json) {
            buildTestMenu(json);
        });

    });

    /*
     * CatG Menu
     *
     */

    $(document).on('click', '#menu_catg', function () {
        var obj_id = $('#obj_id_r').val();
        var type_id = $('#type_id_r').val();
        $('#catg_edit').hide();
        $('#catgnav').hide();
        var aData = '{ "method": "cmdb.object_type_categories",' +
            '"params": { ' +
            '"session": {' +
            '"username": "admin",' +
            '"password": "21232f297a57a5a743894a0e4a801fc3",' +
            '"language": "de",' +
            '"mandator": 1},' +
            '"type":' + type_id + ',' +
            '"order_by": "title"' +
            '},' +
            '"jsonrpc": "2.0"' +
            '}';
        request(aData, function (json) {
            alert(json.result)
        });
    });

    /*
     * Editmode
     *
     */

    $(document).on('click', '#edit_catg_obj', function () {
        $('.catg_inputs').removeClass('ui-disabled mobile-textinput-disabled ui-state-disabled');
        $('.catg_inputs').removeAttr('disabled');
        $('#catg_edit_mode').show();
        $('#catgnav').hide();
        $('#catg_edit').hide();
    });

    $(document).on('click', '#catg_save_obj', function () {
        var obj_id = $('#obj_id_r').val();
        var test_title = $('#obj_name').val();
        $('.catg_inputs').addClass('ui-disabled mobile-textinput-disabled ui-state-disabled');
        $('.catg_inputs').attr('disabled');
        $('#catg_edit_mode').hide();
        $('#catgnav').show();
        $('#catg_edit').show();
        var aData = '{ "method": "cmdb.object.update",' +
            '"params": { ' +
            '"session": {' +
            '"username": "admin",' +
            '"password": "21232f297a57a5a743894a0e4a801fc3",' +
            '"language": "de",' +
            '"mandator": 1},' +
            '"id":' + obj_id + ',' +
            '"title": "' + test_title +
            '"},' +
            '"jsonrpc": "2.0"' +
            '}';
        request(aData, function (json) {
            alert(json.result.message)
        });
    });

    $(document).on('click', '#catg_cancel_obj', function () {
        $('.catg_inputs').addClass('ui-disabled mobile-textinput-disabled ui-state-disabled');
        $('.catg_inputs').attr('disabled');
        $('#catg_edit_mode').hide();
        $('#catgnav').show();
        $('#catg_edit').show();
    });


    /*
     * Page Builders
     *
     */

    //Menu Builder

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
                    list_tree_1.push('<li><a href="#" data-catg="' + item.id + '" class="menu_catg">' + item.title + '</a></li>');
                }
                if (item.tree_group == 2) {
                    list_tree_2.push('<li><a href="#" data-catg="' + item.id + '" class="menu_catg">' + item.title + '</a></li>');
                }
                if (item.tree_group == 3) {
                    list_tree_3.push('<li><a href="#" data-catg="' + item.id + '" class="menu_catg">' + item.title + '</a></li>');
                }

                if (item.tree_group == 1000) {
                    list_tree_4.push('<li><a href="#" data-catg="' + item.id + '"q class="menu_catg">' + item.title + '</a></li>');
                }

            }

        }

        $('#content-role').html('' +
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
        $('.menu_tree').collapsible();
        menuLinks()
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

        $('#content-role').html('' +
            '<ul data-role="listview" class="menu_lst">' +
            list.join("") +
            '</ul>' +
            '</div>');


        $('.menu_lst').listview();
    }

    function buildDetailMenu(p_json_return, p_obj_id, p_obj_type) {
        $('#content-role').load("templates/cat_g/" + p_json_return.result[0].category.id + "/tp.html", function () {
            if (p_json_return.result[0].category.id == 1) {
                $("#obj_id").val(p_obj_id);
                $("input[id^=obj_name]:last").val(p_json_return.result[0].title);
                $("input[id^=obj_sysid]:last").val(p_json_return.result[0].sysid);
                $("input[id^=obj_usefor]:last").val(p_json_return.result[0].purpose.title);
                $("input[id^=obj_catg]:last").val(p_json_return.result[0].category.title);
                $("input[id^=obj_status]:last").val(p_json_return.result[0].cmdb_status.title);
                $("input[id^=obj_desc]:last").val(p_json_return.result[0].description);
                $('#obj_id_r').val(p_obj_id);
                $('#type_id_r').val(p_obj_type);
            }
            menuLinks()
            $('#content-role').trigger('create');
        });
    }

    function menuLinks() {
        if ($('#obj_id_r').val() != undefined) {
            $('#catgnav').show();
            $('#catg_edit').show();
        } else {
            $('#catgnav').hide();
            $('#catg_edit').hide();
        }
    }

    /*
     *
     *  Todo: Remove this Test build!
     */
    function buildTestMenu(p_json_return) {

        var list = [],
            item;

        for (var i in p_json_return.result) {
            if (p_json_return.result.hasOwnProperty(i)) {
                item = p_json_return.result[i];
                console.log(item);
                list.push('<li>' + item.info.description + ':<input class="catg_inputs" type="text" id="obj_name" disabled/></li>');

            }

        }

        $('#content-role').html('' +
            '<ul data-role="listview" class="menu_lst">' +
            list.join("") +
            '</ul>' +
            '</div>');


        $('#content-role').trigger('create');
    }

});
