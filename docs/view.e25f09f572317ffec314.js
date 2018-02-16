webpackJsonp([0],{

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_page__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_page___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_page__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_js__ = __webpack_require__(6);






var activeMenu = "";
var inited;

var getActiveMenu = function () {
    return activeMenu;
}
var setActiveMenu = function (id) {
    activeMenu = id;
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()("nav.navbar .active").removeClass('active');
    //$("body>div[data-tab]").hide();
    var current = __WEBPACK_IMPORTED_MODULE_0_jquery___default()("nav.navbar [data-map-id=" + id + "]");
    current.parents('li').addClass('active');
    //$('#class').text(current.text());
};
var init = function (id) {
    clear();
    initControl();
    render(id);
};
var clear = function () {
};
var initControl = function () {
    if (inited) { return; }
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#version').text(__WEBPACK_IMPORTED_MODULE_4__data_js__["a" /* default */].getVersion());

    inited = true;
};
var render = function (id) {
    console.log("render", id);
    var self = this;
    if (id == 0) {
        return;
    }
    setActiveMenu(id);
    //clear main
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#main').find("img").attr('src', ''); //stop image loading when doPage
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#main').empty();
    //get data
    var map = __WEBPACK_IMPORTED_MODULE_4__data_js__["a" /* default */].getMap(id);

    var minX = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.minBy(map.hexList, function (o) { return o.x; }).x;
    var maxX = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.maxBy(map.hexList, function (o) { return o.x; }).x;
    var minY = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.minBy(map.hexList, function (o) { return o.y; }).y;
    var maxY = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.maxBy(map.hexList, function (o) { return o.y; }).y;

    var $table = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<table>');
    $table.addClass('hex-table');

    for (let j = 0; j < maxY - minY + 1; j++) {
        var $tr = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<tr>');
        for (let i = 0; i < maxX - minX + 1; i++) {
            var $td = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<td>');
            $tr.append($td);
        }
        $table.append($tr);
    }

    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(map.hexList, function (i, o) {
        var x = o.x - minX;
        var y = o.y - minY;
        var $td = $table.find('tr:eq(' + y + ') td:eq(' + x + ')');
        var $div = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div>');
        var hexContent = "";
        if (o.hexType == 50) {
            hexContent = '<i class="fas fa-archive"></i><br />';
            if (o.hasBattery) {
                hexContent += '<i class="fas fa-battery-full"></i>' + o.BatteryCount;
            }
            if (o.hasGachaPoint) {
                hexContent += '<i class="fas fa-gem"></i>' + o.GachaPointCount;
            }
            if (o.hasCoin) {
                hexContent += '<i class="fas fa-circle"></i>' + o.CoinCount;
            }
        }
        switch (o.terminationHex) {
            case 120: {
                hexContent = '<i class="fas fa-play"></i>';
                break;
            }
            case 130: {
                hexContent = '<i class="fas fa-check"></i>';
                break;
            }
        }
        $div.addClass('hex')
            .append('<div class="hex-inner left">')
            .append('<div class="hex-inner right">')
            .append(__WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div class="hex-content">')
                .append(hexContent)
            );
        switch (o.hexType) {
            case 20: {
                $div.addClass('hex-danger');
                break;
            }
            case 30: {
                $div.addClass('hex-rare');
                break;
            }
        }
        $td.append($div);
    });

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#main').append($table);

    setTimeout(function () {
        //a little delay to unveil for better unveil effect
        //$('#main').find("img").unveil();
    }, 100);
};


/* harmony default export */ __webpack_exports__["default"] = ({ init });

/***/ })

});