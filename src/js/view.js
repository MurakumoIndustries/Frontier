import $ from "jquery";
import _ from 'lodash';
import page from 'page';
import Ui from './ui.js';
import { Data } from './data.js'
import NProgress from 'nprogress'
import Vue from 'vue'
import interact from 'interactjs'

import { Event } from "../js/event.js"

import template from '../template/hexInfo.html';

import App from '../App.vue'

import hexsvg from '../img/hex.svg';

var inited;

var initMapInteract = function () {};

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
    //$('#main').find("img").attr('src', ''); //stop image loading when doPage
    //$('#main').empty();
};
var initControl = function () {
    if (inited) { return; }

    new Vue({
        el: '#app',
        //template: '<App/>',
        render: function (h) {
            return h('App')
        },
        components: { App }
    });

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

    Event.$emit('render', id);

    Vue.nextTick(function () {
        if ($('.sidebar-toggle').is(":visible")) {
            //hide sidebar when mobile
            Event.$emit('toggle-sidebar', false);
        }
    });
    return;

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