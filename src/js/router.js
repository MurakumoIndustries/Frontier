import $ from "jquery";
import _ from 'lodash';
import page from 'page';
import Ui from './ui.js';

var init = function () {
    import(
        /* webpackChunkName: "view" */
        './view.js').then(View => {
            page.base('/Frontier/');
            var mapPage = function (ctx) {
                console.log("route:mapRoute");
                View.init(ctx.params.id);
            };
            page('map/:id', mapPage);
            page('/map/:id', mapPage);
            var langPage = function (ctx) {
                console.log("route:langRoute",ctx);
                Ui.setLang(ctx.params.lang);
                page.redirect('/');
                location.reload();
            };
            page.exit('lang/:lang', langPage);
            page.exit('/lang/:lang', langPage);
            page('/', function () {
                console.log("route:homeRoute");                
                View.init();
            });
            page('*', function () {
                console.log("route:notMatchRoute");
                page.redirect('/');
            });
            page.start({ hashbang: true });
        });
};

export { init };
export default { init };
