import $ from "jquery";
import _ from 'lodash';
import NProgress from 'nprogress'
import Vue from 'vue'

import { Event } from "../js/event.js"
import { Ui } from '../js/ui.js';

import App from '../App.vue'

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

    document.getElementsByTagName('body')[0].setAttribute('lang', Ui.getLang());

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
};

export { init };
export default { init };