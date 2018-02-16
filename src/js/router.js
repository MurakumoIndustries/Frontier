import $ from "jquery";
import _ from 'lodash';
import page from 'page';
import Ui from './ui.js';

var init = function () {
    import(
        /* webpackChunkName: "view" */
        './view.js').then(View => {
            page.base('/Frontier/');
            page('map/:id', function (ctx) {
                console.log("route:mapRoute");
                View.init(ctx.params.id);
            });
            page.exit('lang/:lang', function (ctx) {
                console.log("route:langRoute");
                Ui.setLang(ctx.params.lang);
                page.redirect('/');
                location.reload();
            });
            page('/', function () {
                console.log("route:homeRoute");
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
