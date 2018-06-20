import $ from "jquery";
import _ from 'lodash';
import page from 'page';
import Ui from './ui.js';
import Data from './data.js'
import NProgress from 'nprogress'
//import 'dragscroll';
import interact from 'interactjs'

import template from '../template/hexInfo.html';

var activeMenu = "";
var inited;

var getActiveMenu = function () {
    return activeMenu;
}
var setActiveMenu = function (id) {
    activeMenu = id;
    $(".map-list-container li.active").removeClass('active');
    var $current = $(".map-list-container li a[data-map-id=" + id + "]");
    $current.parents('li:first').addClass('active');
    $('.map-list-container ul.collapse:not(:has(li.active))').collapse('hide');
    //reset search
    $('.map-list-search input').val('');
    $('.map-list-container li').show();

    if ($('.sidebar-toggle').is(":visible")) {
        //hide sidebar when mobile
        $('.sidebar-collapsable').collapse('hide');
    }
    else {
        //scroll to active
        var scrollto = function () {
            var $scroll = $current.parents('ul:first').parent();
            $scroll.animate({
                scrollTop: $scroll.scrollTop() + $current.position().top - 170
            }, 300);
        }
        if ($current.is(":visible")) {
            scrollto();
        }
        else {
            $current.parents('ul:first').one('shown.bs.collapse', scrollto);
            $current.parents('ul:first').collapse('show');
        }
    }
};
var init = function (id) {
    NProgress.start();
    clear();
    NProgress.set(0.3);
    initControl();
    NProgress.set(0.6);
    render(id);
    NProgress.done();
};
var clear = function () {
    //clear main
    $('#main').find("img").attr('src', ''); //stop image loading when doPage
    $('#main').empty();
};
var initControl = function () {
    if (inited) { return; }
    $('#version').text(Data.getVersion());

    $('.map-list-search input').on('input', function (e) {
        $('.map-list-container ul.collapse').collapse('show');
        $('.map-list-container li').show();

        var input = $('.map-list-search input').val();
        if (input !== "") {
            $('.map-list-container ul>ul>li').each(function (i, o) {
                if ($(o).text().indexOf(input) === -1) {
                    $(o).hide();
                }
            });
        }
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
    var map = Data.get('maptable', id);

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
    var totalGold = 0;
    var totalEnergy = 0;
    var totalRare = 0;
    var totalDanger = 0;
    var totalNormal = 0;
    $.each(map.hexList, function (i, hex) {
        var x = hex.x - minX;
        var y = hex.y - minY;
        var $td = $table.find('tr:eq(' + y + ') td:eq(' + x + ')');
        var $hex = $('<div>')
            .addClass('hex');

        hex.zakoAttr = Data.get('attrset', hex.zakoAttr) || {};
        hex.bossAttr = Data.get('attrset', hex.bossAttr) || {};
        hex.stage = Data.get('stage', hex.questId) || {};
        var $hexContent = $('<a>')
            .addClass("hex-content")
            .data('hex', hex)
            .attr("data-toggle", "popover")
            .attr('tabindex', 0);
        switch (hex.hexType) {
            case 10: {
                totalNormal++;
                //$hexContent.data('subcontract', 1000 * map.subcontractRatio);
                break;
            }
            case 20: {
                $hex.addClass('hex-danger');
                totalDanger++;
                //$hexContent.data('subcontract', 3000 * map.subcontractRatio);
                break;
            }
            case 30: {
                $hex.addClass('hex-rare');
                totalRare++;
                //$hexContent.data('subcontract', 2000 * map.subcontractRatio);
                break;
            }
            case 40: {
                $hexContent.append('<div><i class="material-icons">chat</i></div>');
                break;
            }
            case 50: {
                $hexContent.append('<div><i class="icon icon-chest"></i></div>');
                _.each(hex.rewards, function (o, i) {
                    var reward = o;
                    if (reward.id) {
                        reward = _.extend(reward, Data.get('items', o.id));
                    }
                    if (reward.id == "ticket_010_01") {
                        $hexContent.append('<div><i class="icon icon-battery" />' + o.count);
                    }
                    else if (reward.id == "gacha_point") {
                        $hexContent.append('<div><i class="icon icon-gacha-point" />' + o.count);
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
            case 90: {
                $hexContent.append('<div><i class="icon icon-endless"></i></div>');
                break;
            }
        }

        if (hex.itemHintIndexes.length) {
            var $itemHint = $hexContent.find('div:first');
            if (!$itemHint.length) {
                $itemHint = $('<div>');
                $hexContent.append($itemHint);
            }
            _.each(hex.itemHintIndexes, function (o, i) {
                var str = "" + (o + 1);
                $itemHint.append('<i class="icon icon-key icon-key-01-' + "00".substring(0, 2 - str.length) + str + '" />');
            });
            //$hexContent.append($itemHint);
        }

        if (hex.requireMapItems.length) {
            $hexContent.append('<div><i class="material-icons">lock_outline</i></div>');
            $itemHint = $('<div>');
            $hexContent.append($itemHint);
            _.each(hex.requireMapItems, function (o, i) {
                if (o <= 0) { return; }
                var str = "" + (i + 1);
                $itemHint.append('<i class="icon icon-key icon-key-01-' + "00".substring(0, 2 - str.length) + str + '" />' + o);
            });
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
        _.each(hex.rewards, function (o, i) {
            var reward = o;
            if (reward.id == "ticket_010_01") {
                totalBattery += o.count;
            }
            else if (reward.id == "gacha_point") {
                totalGachaPoint += o.count;
            }
            else if (reward.id == "gold") {
                totalGold += o.count;
            }
            else if (reward.id == "energy") {
                totalEnergy += o.count;
            }
        });
        if (hex.questId) {
            var areaCount = (hex.stage.areaList || []).length;
            if (areaCount) {
                $hexContent.append('<div class="hex-area-count">' + areaCount);
            }
        }

        var $hexTile = $('<div class="hex-tile">')
            .append('<div class="hex-tile-inner left">')
            .append('<div class="hex-tile-inner right">');
        $hex.append($hexTile)
            .append($hexContent);
        $td.append($hex);
    });

    $('.map-name').text(map.hexList.length + "|" + map.name);
    var $mapinfo = $('.map-info');
    $mapinfo.empty();
    if (map.canGiveUp) {
        $mapinfo.append('<div>' + Ui.getText("giveup") + '<i class="icon icon-gold"></i>' + map.giveUpCost);
    }
    else {
        $mapinfo.append('<div>' + Ui.getText("cannotgiveup"));
    }
    $mapinfo.append('<div>' + Ui.getText("total")
        + '<span>'
        + '<i class="icon icon-hex icon-hex-danger"></i>' + totalDanger
        + '<i class="icon icon-hex icon-hex-rare"></i>' + totalRare
        + '<i class="icon icon-hex"></i>' + totalNormal
        + '</span>'
        + '<div>'
        + '<i class="icon icon-gacha-point"></i>' + totalGachaPoint
        + '<i class="icon icon-battery"></i>' + totalBattery
        + '<i class="icon icon-gold"></i>' + totalGold
        + '<i class="icon icon-energy"></i>' + totalEnergy
        + '</div>'
    );

    $('#main').append($('<div class="hex-table-container">').append($table));
    //make map draggable && pinchable
    function dragMoveListener(event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    };
    var scale = 1,
        gestureArea = $table.parent()[0],
        scaleElement = $table[0];

    interact(gestureArea)
        .gesturable({
            onstart: function (event) {
            },
            onmove: function (event) {
                scale = scale * (1 + event.ds);

                scaleElement.style.webkitTransform =
                    scaleElement.style.transform =
                    'scale(' + scale + ')';

                dragMoveListener(event);
            },
            onend: function (event) {
            }
        })
        .draggable(
            {
                autoScroll: true,
                onmove: dragMoveListener
            });

    $('[data-toggle="popover"]').popover({
        html: true,
        trigger: 'hover',
        delay: 100,
        placement: 'auto',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body px-0 py-1"></div></div>',
        title: function () {
            var $hexContent = $(this);
            var hex = $hexContent.data('hex');
            var $title = $('<div>')
                .append($('<span>').text(hex.name));
            if (hex.recomLv > 0) {
                $title.append($('<span class="font-weight-light float-right pl-3">').text(Ui.getText('recomLv') + hex.recomLv));
            }
            return $title;
        },
        content: function () {
            var $hexContent = $(this);
            var hex = $hexContent.data('hex');
            var $content = $('<ul class="list-group list-group-flush">');

            /*if (hex.questId) {
                var stage = Data.get('stage', hex.questId);
                var $stage = $('<li class="list-group-item p-1" style="white-space:nowrap;overflow:auto;">');
                _.each(stage.areaList, function (area, i) {
                    $stage.append('<span class="stage-container">'
                        + '<div class="parallelogram"><img src="' + '../img/quest/' + (area.icon || "stg2_999_01") + ".png" + '" />'
                        + '</span>');
                    _.each(area.enemyList, function (enemyId, i) {
                        var enemy = Data.get('enemy', enemyId);
                        if (enemy && enemy.icon && enemy.type >= 10) {
                            $stage.append('<span class="stage-container enemy">'
                                + '<div class="parallelogram"><img src="' + '../img/quest/' + (enemy.icon) + ".png" + '" />'
                                + '</span>');
                        }
                    });
                });
                $content.append($stage);
            }*/

            //var subcontract = $hexContent.data('subcontract') || 0;
            if (hex.canGiveUp && hex.giveUpCost > 0) {
                var $subcontract = $('<li class="list-group-item p-1">');
                $subcontract.append('<div class="item-container">'
                    + '<span data-lang="subcontract">' + Ui.getText('subcontract') + '</span>'
                    + '<i class="icon icon-gold"></i>' + hex.giveUpCost
                    + '</div>');
                $content.append($subcontract);
            }

            var $reward = $('<li class="list-group-item p-1">');
            _.each(hex.rewards, function (o, i) {
                var reward = o;
                if (reward.id) {
                    reward = _.extend(reward, Data.get('items', o.id));
                }
                $reward.append('<div class="item-container">'
                    + '<img src="' + '../img/item/' + (reward.icon || "itm2_04_000_01") + ".png" + '" class="icon icon-item" />'
                    + (reward.count > 1 ? ('<span class="item-count">' + reward.count + "<span>") : "")
                    + '</div>');
            });
            if (_.some(hex.rewards)) {
                $content.append($reward);
            }

            /*var $drop = $('<li class="list-group-item p-1">');
            _.each(hex.drops, function (o, i) {
                var drop = o;
                if (drop.id) {
                    drop = _.extend(drop, Data.get('items',o.id));
                }
                $drop.append('<span class="item-container">'
                    + '<div><img src="' + '../img/item/' +  (drop.icon || "itm2_04_000_01") + ".png" + '" class="icon icon-item" />'
                    + (drop.count > 1 ? ("*" + drop.count) : "") + '</div>'
                    + '<div>' + drop.rate / 100 + "%" + '</div>'
                    + '</span>');
            });
            if (hex.drops.length) {
                $content.append($drop);
            }*/
            return $content;
        }
    });

    $('.hex').click(function () {
        var $hex = $(this);
        var $hexContent = $hex.find('.hex-content');
        var hex = $hexContent.data('hex');
        //var subcontract = $hexContent.data('subcontract') || 0;
        var hexInfo = template({
            hex: hex,
            //subcontract: subcontract,
            Ui: Ui,
            Data: Data,
        });
        var $hexInfo = $(hexInfo);
        $hexInfo.click(function () {
            if (window.getSelection().toString().length) {
                return;
            }
            $(this).fadeOut(500, function () {
                $(this).remove();
                $('body').removeClass('no-scroll');
                $('[data-toggle="popover"]').popover('enable');
            });
        })
        $hexInfo.find('.stage-container').click(function (e) {
            if (window.getSelection().toString().length) {
                return;
            }
            var list = $(this).find('.stage-enemy-list');
            if (list.is(":visible")) {
                list.fadeOut(500);
            }
            else {
                $(this).parent().find('.stage-enemy-list').fadeOut(500);
                list.fadeIn(500);
            }
            e.stopPropagation();
        })
        $hexInfo.hide();
        $('body').addClass('no-scroll');
        $hexContent.popover('disable');
        $('#main').append($hexInfo);
        $hexInfo.fadeIn(500);
    });

    setTimeout(function () {
        //a little delay to unveil for better unveil effect
        //$('#main').find("img").unveil();
    }, 100);
};

export { init };
export default { init };