/**
 * Created with JetBrains PhpStorm.
 * User: sbohm
 * Date: 11.02.13
 * Time: 10:11
 * To change this template use File | Settings | File Templates.
 */

document.addEventListener("deviceready", onDeviceReady, false);

$(document).on('click','#saveConfig', function(){
    window.localStorage.setItem("hostname", $('#hostname').val());
    window.localStorage.setItem("apikey", $('#apikey').val());
    window.localStorage.setItem("language", $('#lang').val());
    alert('Gespeichert'+ window.localStorage.getItem('hostname'));
})

function onDeviceReady() {
    alert('TeST   '+window.localStorage.getItem("hostname"));
    $('#hostname').val(window.localStorage.getItem("hostname"));
    $('#apikey').val(window.localStorage.getItem("apikey"));
    $('#lang').val(window.localStorage.getItem("language"));
}

