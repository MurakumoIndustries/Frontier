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

    var $mapinfo = $('<div>')
        .addClass('mapinfo-container')
        .addClass('p-1');
    $mapinfo.append('<div>' + map.hexList.length + "|" + map.name);
    if (map.canGiveUp) {
        $mapinfo.append('<div>' + Ui.getText("giveup") + '<i class="icon icon-gold"></i>' + map.giveUpCost);
    }
    else {
        $mapinfo.append('<div>' + Ui.getText("cannotgiveup"));
    }
    $('#main').append($mapinfo);

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

    var totalGachaPoint = 0;
    var totalBattery = 0;
    $.each(map.hexList, function (i, hex) {
        var x = hex.x - minX;
        var y = hex.y - minY;
        var $td = $table.find('tr:eq(' + y + ') td:eq(' + x + ')');
        var $hex = $('<div>')
            .addClass('hex');
        var $hexContent = $('<a>')
            .addClass("hex-content")
            .data('hex', hex)
            .attr("data-toggle", "popover")
            .attr('tabindex', 0);
        switch (hex.hexType) {
            case 20: {
                $hex.addClass('hex-danger');
                break;
            }
            case 30: {
                $hex.addClass('hex-rare');
                break;
            }
            case 50: {
                $hexContent.append('<div><i class="icon icon-chest"></i></div>');
                _.each(hex.rewards, function (o, i) {
                    var reward = o;
                    if (reward.id) {
                        reward = _.extend(reward, Data.getItem(o.id));
                    }
                    if (reward.id == "ticket_010_01") {
                        $hexContent.append('<div><i class="icon icon-battery" />' + o.count);
                        totalBattery += o.count;
                    }
                    else if (reward.id == "gacha_point") {
                        $hexContent.append('<div><i class="icon icon-gacha-point" />' + o.count);
                        totalGachaPoint += o.count;
                    }
                    else if (reward.id == "gold") {
                        $hexContent.append('<div><i class="icon icon-gold" />' + o.count);
                    }
                    else if (reward.id == "energy") {
                        $hexContent.append('<div><i class="icon icon-energy" />' + o.count);
                    }
                });
                break;
            }
            case 60: {
                $hexContent.append('<div><i class="icon icon-2x icon-PowUpEne" />');
                break;
            }
            case 61: {
                $hexContent.append('<div><i class="icon icon-2x icon-PowUpAct" />');
                break;
            }
            case 62: {
                $hexContent.append('<div><i class="icon icon-2x icon-PowUpRwd" />');
                break;
            }
            case 70: {
                $hexContent.append('<div><i class="icon icon-2x icon-PowDwnEne" />');
                break;
            }
            case 71: {
                $hexContent.append('<div><i class="icon icon-2x icon-PowDwnAct" />');
                break;
            }
            case 72: {
                $hexContent.append('<div><i class="icon icon-2x icon-PowDwnRwd" />');
                break;
            }
        }
        switch (hex.termType) {
            case 120: {
                $hexContent.prepend('<div style="font-size: 1.5rem;">►');
                break;
            }
            case 130: {
                $hexContent.prepend('<div style="font-size: 1.5rem;">✓');
                break;
            }
        }
        var $hexTile = $('<div class="hex-tile">')
            .append('<div class="hex-tile-inner left">')
            .append('<div class="hex-tile-inner right">');
        $hex.append($hexTile)
            .append($hexContent);
        $td.append($hex);
    });

    $mapinfo.append('<div>' + Ui.getText("total")
        + '<i class="icon icon-gacha-point"></i>' + totalGachaPoint
        + '<i class="icon icon-battery"></i>' + totalBattery);

    $('#main').append($table);

    var pathToItems = require.context('../img/item', true, /\.png$/);
    $('[data-toggle="popover"]').popover({
        html: true,
        trigger: 'hover focus',
        delay: 100,
        placement: 'auto',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body px-0 py-1"></div></div>',
        title: function () {
            var $hexContent = $(this);
            var hex = $hexContent.data('hex');
            var $title = $('<div>')
                .append($('<span>').text(hex.name));
            if (hex.recomLv > 0) {
                $title.append($('<span class="font-weight-light float-right">').text(Ui.getText('recomLv') + hex.recomLv));
            }
            return $title;
        },
        content: function () {
            var $hexContent = $(this);
            var hex = $hexContent.data('hex');
            var $content = $('<ul class="list-group list-group-flush">');

            var $reward = $('<li class="list-group-item p-1">');
            _.each(hex.rewards, function (o, i) {
                var reward = o;
                if (reward.id) {
                    reward = _.extend(reward, Data.getItem(o.id));
                }
                $reward.append('<div class="item-container">'
                    + '<img src="' + pathToItems("./" + (reward.icon || "itm2_04_000_01") + ".png") + '" class="icon icon-item" />'
                    + (reward.count > 1 ? ('<span class="item-count">' + reward.count + "<span>") : "")
                    + '</div>');
            });
            if (_.some(hex.rewards)) {
                $content.append($reward);
            }

            var $drop = $('<li class="list-group-item p-1">');
            _.each(hex.drops, function (o, i) {
                var drop = o;
                if (drop.id) {
                    drop = _.extend(drop, Data.getItem(o.id));
                }
                $drop.append('<span class="item-container">'
                    + '<div><img src="' + pathToItems("./" + (drop.icon || "itm2_04_000_01") + ".png") + '" class="icon icon-item" />'
                    + (drop.count > 1 ? ("*" + drop.count) : "") + '</div>'
                    + '<div>' + drop.rate / 100 + "%" + '</div>'
                    + '</span>');
            });
            if (hex.drops.length) {
                $content.append($drop);
            }
            return $content;
        }
    });
    /*$('#main').on('show.bs.popover', function (e) {
        var $hexContent = $(e.target);
        var hex = $hexContent.data("hex");
        var $title = $('<div>')
            .append($('<div>').text(hex.name))
            .append('<button type="button" id="close" class="close" onclick="$(this).parents(&quot;.popover&quot;).popover(&quot;hide&quot;);">&times;</button>');
        $hexContent.attr('data-original-title', $title.html());
    });
    $('#main').on('inserted.bs.popover', function (e) {
        var z = 0;
        $('.popover').each(function (i, o) {
            if (z < parseInt($(o).css('z-index'))) {
                z = parseInt($(o).css('z-index'));
            }
        });
        $(e.target.nextSibling)
            .css('z-index', z + 1)
            .off('mouseenter').off('click')
            .on("mouseenter click", function () {
                var zIndex = 0;
                $('.popover').each(function (i, o) {
                    if (zIndex < parseInt($(o).css('z-index'))) {
                        zIndex = parseInt($(o).css('z-index'));
                    }
                })
                $(this).css('z-index', zIndex + 1);
                //console.log("current popover Z-Index", zIndex);
            });
    });*/

    setTimeout(function () {
        //a little delay to unveil for better unveil effect
        //$('#main').find("img").unveil();
    }, 100);
};

export { init };
export default { init };