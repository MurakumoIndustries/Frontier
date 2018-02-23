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

data["maplist"] = { "ja-JP": "宙域マップ", "zh-TW": "地圖列表", "en-US": "Map List", "zh-CN": "地图列表" };
data["maplistrandom"] = { "ja-JP": "宙域マップ（ランダム）", "zh-TW": "地圖列表（隨機）", "en-US": "Random Map List", "zh-CN": "地图列表（随机）" };
data["maplistevent"] = { "ja-JP": "宙域マップ（イベント）", "zh-TW": "地圖列表（活動）", "en-US": "Event Map List", "zh-CN": "地图列表（活动）" };

data["giveup"] = { "ja-JP": "調查宙域变更：", "zh-TW": "變更調查地圖：", "en-US": "Change Map: ", "zh-CN": "变更调查地图：" };
data["cannotgiveup"] = { "ja-JP": "調查宙域变更不可", "zh-TW": "無法變更該調查地圖", "en-US": "Cannot change current map", "zh-CN": "不能变更这张调查地图" };
data["total"] = { "ja-JP": "合計：", "zh-TW": "合計：", "en-US": "Total: ", "zh-CN": "合计：" };

data["recomLv"] = { "ja-JP": "推奨Lv. ", "zh-TW": "推薦Lv. ", "en-US": "Recommend Lv. ", "zh-CN": "推荐Lv. " };

data["currentversion"] = { "ja-JP": "バージョン：", "zh-TW": "當前版本：", "en-US": "Current Ver.:", "zh-CN": "当前版本：" };
data["externallink"] = { "ja-JP": "外部リンク", "zh-TW": "外部鏈接", "en-US": "External Links", "zh-CN": "外部链接" };
data["officalsite"] = { "ja-JP": "公式サイト", "zh-TW": "官網", "en-US": "Offical Site", "zh-CN": "官网" };
data["officalannouncement"] = { "ja-JP": "お知らせ", "zh-TW": "遊戲公告", "en-US": "Offical Announcement", "zh-CN": "游戏公告" };

data["ui"] = { "ja-JP": "UI言語", "zh-TW": "界面語言", "en-US": "UI", "zh-CN": "界面语言" };
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
        var target = $this.data("lang-target");
        if (target) {
            $this.attr(target, value);
        }
        else {
            $this.text(value);
        }
    });
    //deal with bootstrap select
    switch (currentLang) {
        case "ja-JP": {
            import('./lib/bootstrap-select-1.13.0-beta/js/i18n/defaults-ja_JP');
            break;
        }
        case "zh-TW": {
            import('./lib/bootstrap-select-1.13.0-beta/js/i18n/defaults-zh_TW');
            break;
        }
        case "en-US": {
            import('./lib/bootstrap-select-1.13.0-beta/js/i18n/defaults-en_US');
            break;
        }
        case "zh-CN": {
            import('./lib/bootstrap-select-1.13.0-beta/js/i18n/defaults-zh_CN');
            break;
        }
    }
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