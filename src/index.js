import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import fontawesome from '@fortawesome/fontawesome'
import faGlobe from '@fortawesome/fontawesome-free-solid/faGlobe'
fontawesome.library.add(faGlobe)
import faArchive from '@fortawesome/fontawesome-free-solid/faArchive'
fontawesome.library.add(faArchive)
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
fontawesome.library.add(faPlay)
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
fontawesome.library.add(faCheck)
import faBatteryFull from '@fortawesome/fontawesome-free-solid/faBatteryFull'
fontawesome.library.add(faBatteryFull)
import faGem from '@fortawesome/fontawesome-free-solid/faGem'
fontawesome.library.add(faGem)
import faCircle from '@fortawesome/fontawesome-free-solid/faCircle'
fontawesome.library.add(faCircle)

import './style.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.start();

import $ from "jquery";
import _ from 'lodash';
import Ui from './js/ui.js';
import Router from './js/router.js';
import Data from './js/data.js'

NProgress.set(0.33);
Ui.init();
$.when(Data.init("maptable"))
    .then(function () {
        NProgress.set(0.66);
        Data.saveLastUpdate();
        NProgress.inc();
        Router.init();
        NProgress.done();
    });
