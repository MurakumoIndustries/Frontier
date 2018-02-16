import $ from "jquery";
import _ from 'lodash';
import page from 'page';
import Ui from './ui.js';
import Data from './data.js'

var activeMenu = "";
var inited;

var getActiveMenu = function () {
    return activeMenu;
}
var setActiveMenu = function (id) {
    activeMenu = id;
    $("nav.navbar .active").removeClass('active');
    //$("body>div[data-tab]").hide();
    var current = $("nav.navbar [data-map-id=" + id + "]");
    current.parents('li').addClass('active');
    //$('#class').text(current.text());
};
var init = function (id) {
    clear();
    initControl();
    render(id);
};
var clear = function () {
};
var initControl = function () {
    if (inited) { return; }
    $('#version').text(Data.getVersion());

    inited = true;
};
var render = function (id) {
    console.log("render", id);
    var self = this;
    if (id == 0) {
        return;
    }
    setActiveMenu(id);
    //clear main
    $('#main').find("img").attr('src', ''); //stop image loading when doPage
    $('#main').empty();
    //get data
    var map = Data.getMap(id);

    var minX = _.minBy(map.hexList, function (o) { return o.x; }).x;
    var maxX = _.maxBy(map.hexList, function (o) { return o.x; }).x;
    var minY = _.minBy(map.hexList, function (o) { return o.y; }).y;
    var maxY = _.maxBy(map.hexList, function (o) { return o.y; }).y;

    var $table = $('<table>');
    $table.addClass('hex-table');

    for (let j = 0; j < maxY - minY + 1; j++) {
        var $tr = $('<tr>');
        for (let i = 0; i < maxX - minX + 1; i++) {
            var $td = $('<td>');
            $tr.append($td);
        }
        $table.append($tr);
    }

    $.each(map.hexList, function (i, o) {
        var x = o.x - minX;
        var y = o.y - minY;
        var $td = $table.find('tr:eq(' + y + ') td:eq(' + x + ')');
        var $div = $('<div>');
        var hexContent = "";
        if (o.hexType == 50) {
            hexContent = '<i class="fas fa-archive"></i><br />';
            if (o.hasBattery) {
                hexContent += '<i class="fas fa-battery-full"></i>' + o.BatteryCount;
            }
            if (o.hasGachaPoint) {
                hexContent += '<i class="fas fa-gem"></i>' + o.GachaPointCount;
            }
            if (o.hasCoin) {
                hexContent += '<i class="fas fa-circle"></i>' + o.CoinCount;
            }
        }
        switch (o.terminationHex) {
            case 120: {
                hexContent = '<i class="fas fa-play"></i>';
                break;
            }
            case 130: {
                hexContent = '<i class="fas fa-check"></i>';
                break;
            }
        }
        $div.addClass('hex')
            .append('<div class="hex-inner left">')
            .append('<div class="hex-inner right">')
            .append($('<div class="hex-content">')
                .append(hexContent)
            );
        switch (o.hexType) {
            case 20: {
                $div.addClass('hex-danger');
                break;
            }
            case 30: {
                $div.addClass('hex-rare');
                break;
            }
        }
        $td.append($div);
    });

    $('#main').append($table);

    setTimeout(function () {
        //a little delay to unveil for better unveil effect
        //$('#main').find("img").unveil();
    }, 100);
};

export { init };
export default { init };