/**
 * Created with JetBrains PhpStorm.
 * User: sbohm
 * Date: 08.02.13
 * Time: 10:04
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
        url: window.localStorage.getItem("hostname"),
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
