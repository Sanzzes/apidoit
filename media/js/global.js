/**
 * Created with JetBrains PhpStorm.
 * User: sbohm
 * Date: 08.02.13
 * Time: 13:36
 * To change this template use File | Settings | File Templates.
 */
$(document).bind("pagebeforechange", function( event, data ) {
    $.mobile.pageData = (data && data.options && data.options.pageData)
        ? data.options.pageData
        : null;
});