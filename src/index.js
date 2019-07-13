import 'popper.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './fonts/material-icons.css'
import './style.css'

import Vue from 'vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.start();

import Ui from './js/ui.js';
import Router from './js/router.js';
import Data from './js/data.js'

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

NProgress.set(0.1);
Vue.prototype.Ui = Ui;
NProgress.set(0.3);
Data.init().then(function () {
    NProgress.set(0.6);
    if (localStorage["MI_Frontier_Disable_Cache"] !== "true") {
        OfflinePluginRuntime.install({
            onUpdateReady: function () {
                OfflinePluginRuntime.applyUpdate();
            }
        });
        console.log('PWA Enabled!');
    }
    NProgress.set(0.9);
    Router.init();
    NProgress.done();
});