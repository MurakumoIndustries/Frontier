import $ from "jquery";
import _ from 'lodash';
import page from 'page';
import Ui from './ui.js';
import { Data } from './data.js'
import NProgress from 'nprogress'
//import 'dragscroll';
import interact from 'interactjs'

import template from '../template/hexInfo.html';

var activeMenu = "";
var inited;
var initMapInteract = function () {};

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
    //$('#version').text(Data.getVersion());

    var currentServer = Data.getCurrentServer();
    $('#server').text(currentServer.name);
    $('#version').text(currentServer.version);
    $.each(Data.getAllServers(), function (i, o) {
        $('#serverDivider').before('<a class="dropdown-item ' + (i == currentServer.id ? 'active' : '') + '" href="#!/server/' + i + '">' + o.name +
            '<p class="m-0" style="font-size:0.75rem;line-height:0.75rem;">' + o.version + '</p>' + '</a>');
    });

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
    if ($('.map-list-search input').val()) {
        $('.map-list-search input').trigger('input');
    }

    var initMapInteractTimeout;
    $(window).resize(function () {
        clearTimeout(initMapInteractTimeout);
        initMapInteractTimeout = setTimeout(initMapInteract(), 500);
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
    var realMinX = minX;

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

    var startHex = {};

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
        var $hexContentLine1 = $('<div>');
        var $hexContentLine2 = $('<div>');
        $hexContent.append($hexContentLine1).append($hexContentLine2);
        switch (hex.hexType) {
            case 10:
                {
                    totalNormal++;
                    break;
                }
            case 20:
                {
                    $hex.addClass('hex-danger');
                    totalDanger++;
                    break;
                }
            case 30:
                {
                    $hex.addClass('hex-rare');
                    totalRare++;
                    break;
                }
            case 40:
                {
                    $hexContentLine1.append('<i class="material-icons">chat</i>');
                    break;
                }
            case 50:
                {
                    $hexContentLine1.append('<i class="icon icon-chest"></i>');
                    break;
                }
            case 60:
                {
                    $hexContentLine1.append('<i class="icon icon-2x icon-PowUpEne" />');
                    break;
                }
            case 61:
                {
                    $hexContentLine1.append('<i class="icon icon-2x icon-PowUpAct" />');
                    break;
                }
            case 62:
                {
                    $hexContentLine1.append('<i class="icon icon-2x icon-PowUpRwd" />');
                    break;
                }
            case 70:
                {
                    $hexContentLine1.append('<i class="icon icon-2x icon-PowDwnEne" />');
                    break;
                }
            case 71:
                {
                    $hexContentLine1.append('<i class="icon icon-2x icon-PowDwnAct" />');
                    break;
                }
            case 72:
                {
                    $hexContentLine1.append('<i class="icon icon-2x icon-PowDwnRwd" />');
                    break;
                }
            case 90:
                {
                    $hexContentLine1.append('<i class="icon icon-endless" />');
                    break;
                }
        }
        _.each(hex.rewards, function (o, i) {
            var reward = o;
            if (reward.id) {
                reward = _.extend(reward, Data.get('items', o.id));
            }
            if (hex.hexType == 50) {
                if (reward.id == "ticket_010_01") {
                    $hexContentLine2.append('<div><i class="icon icon-battery" />' + o.count);
                }
                else if (reward.id == "gold") {
                    $hexContentLine2.append('<div><i class="icon icon-gold" />' + o.count);
                }
                else if (reward.id == "energy") {
                    $hexContentLine2.append('<div><i class="icon icon-energy" />' + o.count);
                }

            }
            if (reward.id == "gacha_point") {
                $hexContentLine2.append('<div><i class="icon icon-gacha-point" />' + o.count);
            }
        });

        if (hex.itemHintIndexes.length) {
            _.each(hex.itemHintIndexes, function (o, i) {
                var str = "" + (o + 1);
                $hexContentLine1.append('<i class="icon icon-key icon-key-01-' + "00".substring(0, 2 - str.length) + str + '" />');
            });
        }

        if (hex.requireMapItems.length) {
            $hexContentLine1.append('<i class="material-icons">lock_outline</i>');
            _.each(hex.requireMapItems, function (o, i) {
                if (o <= 0) { return; }
                var str = "" + (i + 1);
                $hexContentLine2.append('<i class="icon icon-key icon-key-01-' + "00".substring(0, 2 - str.length) + str + '" />' + o);
            });
        }

        switch (hex.termType) {
            case 120:
                {
                    $hexContentLine1.prepend('<i class="material-icons">play_arrow</i>');
                    startHex = hex;
                    break;
                }
            case 130:
                {
                    $hexContentLine1.prepend('<i class="material-icons">flag</i>');
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
            .append('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-10,-10,260,180" preserveAspectRatio="xMidYMid meet"><polygon points="0,80 64,0 176,0 240,80 176,160 64,160"></polygon></svg>')
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
    $mapinfo.append('<div>' + Ui.getText("total") +
        '<span>' +
        '<i class="icon icon-hex icon-hex-danger"></i>' + totalDanger +
        '<i class="icon icon-hex icon-hex-rare"></i>' + totalRare +
        '<i class="icon icon-hex"></i>' + totalNormal +
        '</span>' +
        '<div>' +
        '<i class="icon icon-gacha-point"></i>' + totalGachaPoint +
        '<i class="icon icon-battery"></i>' + totalBattery +
        '<i class="icon icon-gold"></i>' + totalGold +
        '<i class="icon icon-energy"></i>' + totalEnergy +
        '</div>'
    );

    $('#main').append($('<div class="hex-table-container">').append($table));
    //make map draggable && pinchable
    initMapInteract = function (isFirstTime) {
        var dragMoveListener = function (event) {
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

        var cw = $table.parent().width();
        var ch = $table.parent().height();
        var ew = $table.parent().parent().width();
        var eh = $table.parent().parent().height();
        var restrict = {
            restriction: 'parent',
            endOnly: true,
            elementRect: {
                top: Math.max((ch - eh) / ch, 0),
                left: Math.max((cw - ew) / cw, 0),
                bottom: Math.min(eh / ch, 1),
                right: Math.min(ew / cw, 1),
            }
        };

        interact(gestureArea)
            .gesturable({
                inertia: true,
                restrict: restrict,
                onstart: function (event) {},
                onmove: function (event) {
                    scale = scale * (1 + event.ds);
                    if (scale < 0.4) {
                        scale = 0.4;
                    }
                    if (scale > 2) {
                        scale = 2;
                    }

                    scaleElement.style.webkitTransform =
                        scaleElement.style.transform =
                        'scale3d(' + scale + ',' + scale + ',1)';

                    dragMoveListener(event);
                },
                onend: function (event) {}
            })
            .draggable({
                inertia: true,
                restrict: restrict,
                autoScroll: true,
                onmove: dragMoveListener
            })
            .on('doubletap dblclick', function (event) {
                scaleElement.style.webkitTransform =
                    scaleElement.style.transform =
                    '';
                event.preventDefault();
            });

        $(gestureArea).on('wheel', function (e) {
            scale = scale * (1 - e.originalEvent.deltaY / 1000);
            if (scale < 0.6) {
                scale = 0.6;
            }
            if (scale > 1) {
                scale = 1;
            }

            scaleElement.style.webkitTransform =
                scaleElement.style.transform =
                'scale(' + scale + ',' + scale + ')';
        });

        console.log('map interact inited');
    };
    setTimeout(function () {
        initMapInteract();
    }, 500);

    //default move to start point
    var spaceWidth = $table.parent().parent().width() - $table.parent().width();
    var spaceHeight = $table.parent().parent().height() - $table.parent().height();
    var padding = ($table.parent().width() - $table.width()) / 2;
    var tdWidth = $table.find('div.hex:first').parent().width() + 2;
    var tdHeight = $table.find('div.hex:first').parent().height() + 2;
    var startX = $table.parent().parent().width() / 2 - ((startHex.x - realMinX) * tdWidth + padding + tdWidth / 2);
    var startY = $table.parent().parent().height() / 2 - ((startHex.y - minY) * tdHeight + padding + tdHeight / 2 + ((startHex.x - minX + 1) % 2) * tdHeight / 2);
    console.log(startHex.x, minX, realMinX);
    //manual restrict
    //if (spaceWidth > 0) {
    //    startX = Math.max(0, Math.min(startX, spaceWidth));
    //}
    //else {
    //    startX = Math.max(spaceWidth, Math.min(startX, 0));
    //}
    //if (spaceHeight > 0) {
    //    startY = Math.max(0, Math.min(startY, spaceHeight));
    //}
    //else {
    //    startY = Math.max(spaceHeight, Math.min(startY, 0));
    //}
    $table.parent()[0].style.webkitTransform = $table.parent()[0].style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
    $table.parent()[0].setAttribute('data-x', startX);
    $table.parent()[0].setAttribute('data-y', startY);

    $('[data-toggle="popover"]').popover({
        html: true,
        trigger: 'hover',
        delay: 100,
        placement: 'auto',
        template: '<div class="popover" style="max-width:none;" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body px-0 py-1"></div></div>',
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
                $subcontract.append('<div class="item-container">' +
                    '<span data-lang="subcontract">' + Ui.getText('subcontract') + '</span>' +
                    '<i class="icon icon-gold"></i>' + hex.giveUpCost +
                    '</div>');
                $content.append($subcontract);
            }

            var $lockBuffs = $('<li class="list-group-item p-1">');
            _.each(hex.lockBuffs, function (o, i) {
                if (o) {
                    var buff = Data.get('buff', o);
                    $lockBuffs.append('<div class="item-container">' +
                        '<img src="' + '../img/quest/' + buff.icon + ".png" + '" class="icon icon-item" />' +
                        '<span class="item-count">' + buff.value + "<span>" +
                        '</div>');
                }
            });
            if (_.some(hex.lockBuffs)) {
                $content.append($lockBuffs);
            }

            var $unlockBuffs = $('<li class="list-group-item p-1">');
            _.each(hex.unlockBuffs, function (o, i) {
                if (o) {
                    var buff = Data.get('buff', o);
                    $unlockBuffs.append('<div class="item-container">' +
                        '<img src="' + '../img/quest/' + buff.icon + ".png" + '" class="icon icon-item" />' +
                        '<span class="item-count">' + buff.value + "<span>" +
                        '</div>');
                }
            });
            if (_.some(hex.unlockBuffs)) {
                $content.append($unlockBuffs);
            }

            var $clearBuffs = $('<li class="list-group-item p-1">');
            _.each(hex.clearBuffs, function (o, i) {
                if (o) {
                    var buff = Data.get('buff', o);
                    $clearBuffs.append('<div class="item-container">' +
                        '<img src="' + '../img/quest/' + buff.icon + ".png" + '" class="icon icon-item" />' +
                        '<span class="item-count">' + buff.value + "<span>" +
                        '</div>');
                }
            });
            if (_.some(hex.clearBuffs)) {
                $content.append($clearBuffs);
            }

            var $reward = $('<li class="list-group-item p-1">');
            _.each(hex.rewards, function (o, i) {
                var reward = o;
                if (reward.id) {
                    reward = _.extend(reward, Data.get('items', o.id));
                }
                $reward.append('<div class="item-container">' +
                    '<img src="' + '../img/item/' + (reward.icon || "itm2_04_000_01") + ".png" + '" class="icon icon-item" />' +
                    (reward.count > 1 ? ('<span class="item-count">' + reward.count + "<span>") : "") +
                    '</div>');
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