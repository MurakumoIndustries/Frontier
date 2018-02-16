import $ from "jquery";
import _ from 'lodash';

var supportedLang = [
    {
        key: 'ja-JP',
        text: '日本語'
    },
    {
        key: 'zh-TW',
        text: '正體中文'
    },
    {
        key: 'en-US',
        text: 'English'
    },
    {
        key: 'zh-CN',
        text: '简体中文'
    }
];
var currentLang = '';
var data = [];
//navbar
data["search"] = { "ja-JP": "検索", "zh-TW": "搜尋", "en-US": "Search", "zh-CN": "查询" };
data["clear"] = { "ja-JP": "", "zh-TW": "清空", "en-US": "Clear", "zh-CN": "清空" };

data["maplist"] = { "ja-JP": "", "zh-TW": "地圖列表", "en-US": "Map List", "zh-CN": "地图列表" };

data["currentversion"] = { "ja-JP": "", "zh-TW": "當前版本：", "en-US": "Current Ver.:", "zh-CN": "当前版本：" };
data["officalsite"] = { "ja-JP": "", "zh-TW": "官網", "en-US": "Offical Site", "zh-CN": "官网" };

data["ui"] = { "ja-JP": "", "zh-TW": "界面語言", "en-US": "UI", "zh-CN": "界面语言" };
data["data"] = { "ja-JP": "", "zh-TW": "資料語言", "en-US": "Data", "zh-CN": "数据语言" };

var getText = function (key) {
    if (!data[key]) {
        console.log("ui language data missing:" + key);
        return key;
    }
    return data[key][getLang()] || data[key]['en-US'];
};
var getLang = function () {
    if (!currentLang) {
        setLang();
    }
    return currentLang;
};
var setLang = function (lang) {
    lang = lang || localStorage["uilang"] || navigator.language || navigator.browserLanguage;
    if (_.some(supportedLang, function (o) { return o.key == lang }) == false) {
        lang = 'ja-JP';
    }
    currentLang = lang;
    localStorage["uilang"] = lang;
    $('#currentLang').text(_.find(supportedLang, function (o) {
        return o.key == lang;
    }).text);
};
var init = function () {
    $('[data-lang]').each(function () {
        var $this = $(this);
        var key = $this.data("lang");
        var value = getText(key);
        $this.text(value);
    });
};

export {
    supportedLang,
    getText,
    getLang,
    setLang,
    init
};
export default {
    supportedLang,
    getText,
    getLang,
    setLang,
    init
};