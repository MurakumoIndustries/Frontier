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
    //clear main
    $('#main').find("img").attr('src', ''); //stop image loading when doPage
    $('#main').empty();
};
var initControl = function () {
    if (inited) { return; }
    $('#version').text(Data.getVersion());

    $('.selectpicker').change(function (e) {
        page.redirect('/map/' + $(this).val());
    });

    inited = true;
};
var render = function (id) {
    console.log("render", id);
    var self = this;
    if (!id) {
        return;
    }
    setActiveMenu(id);
    //get data
    var map = Data.getMap(id);

    var minX = _.minBy(map.hexList, function (o) { return o.x; }).x;
    var maxX = _.maxBy(map.hexList, function (o) { return o.x; }).x;
    var minY = _.minBy(map.hexList, function (o) { return o.y; }).y;
    var maxY = _.maxBy(map.hexList, function (o) { return o.y; }).y;

    //keep minX have same odd/even as x
    if (minX % 2 == 1) {
        minX = minX - 1;
    }

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
        var $div = $('<div class="hex">');
        var $hexContent = $('<div>');
        $hexContent.addClass("hex-content");
        switch (o.hexType) {
            case 20: {
                $div.addClass('hex-danger');
                break;
            }
            case 30: {
                $div.addClass('hex-rare');
                break;
            }
            case 50: {
                $hexContent.append('<div><i class="icon icon-chest"></i></div>');
                if (o.batteryCount) {
                    $hexContent.append('<div><i class="icon icon-battery" />' + o.batteryCount);
                }
                if (o.gachaPointCount) {
                    $hexContent.append('<div><i class="icon icon-gacha-point" />' + o.gachaPointCount);
                }
                if (o.goldCount) {
                    $hexContent.append('<div><i class="icon icon-gold" />' + o.goldCount);
                }
                if (o.energyCount) {
                    $hexContent.append('<div><i class="icon icon-energy" />' + o.energyCount);
                }
                break;
            }
            case 70:{
                $hexContent.append('<div><i class="icon icon-PowDwnEne" />');
                break;
            }
        }
        switch (o.termType) {
            case 120: {
                $hexContent.prepend('<div style="font-size: 1.5rem;">►');
                break;
            }
            case 130: {
                $hexContent.prepend('<div style="font-size: 1.5rem;">✓');
                break;
            }
        }
        $div.append($('<div class="hex-tile">')
            .append('<div class="hex-tile-inner left">')
            .append('<div class="hex-tile-inner right">'))
            .append($hexContent);
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