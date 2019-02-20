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

data["maplist"] = { "ja-JP": "新米向けマップ", "zh-TW": "新手教程", "en-US": "Newbie Maps", "zh-CN": "新手教程" };
data["maplistold"] = { "ja-JP": "マップ（旧）", "zh-TW": "舊版調查", "en-US": "Not Used Maps", "zh-CN": "旧版调查" };
data["maplistrandom"] = { "ja-JP": "ランダムマップ", "zh-TW": "隨機調查", "en-US": "Random Maps", "zh-CN": "随机调查" };
data["maplistevent"] = { "ja-JP": "イベントマップ", "zh-TW": "活動調查", "en-US": "Event Maps", "zh-CN": "活动调查" };
data["mapliststory"] = { "ja-JP": "ストーリーマップ", "zh-TW": "主線調查", "en-US": "Story Maps", "zh-CN": "主线调查" };

data["giveup"] = { "ja-JP": "調查宙域变更：", "zh-TW": "變更調查地圖：", "en-US": "Change Map: ", "zh-CN": "变更调查地图：" };
data["cannotgiveup"] = { "ja-JP": "調查宙域变更不可", "zh-TW": "無法變更該調查地圖", "en-US": "Cannot change current map", "zh-CN": "不能变更这张调查地图" };
data["total"] = { "ja-JP": "合計：", "zh-TW": "合計：", "en-US": "Total: ", "zh-CN": "合计：" };

data["recomLv"] = { "ja-JP": "推奨Lv. ", "zh-TW": "推薦Lv. ", "en-US": "Recommend Lv. ", "zh-CN": "推荐Lv. " };
data["subcontract"] = { "ja-JP": "依頼：", "zh-TW": "依賴：", "en-US": "Subcontract:", "zh-CN": "依赖：" };

data["currentversion"] = { "ja-JP": "バージョン：", "zh-TW": "當前版本：", "en-US": "Current Ver.:", "zh-CN": "当前版本：" };
data["externallink"] = { "ja-JP": "外部リンク", "zh-TW": "外部鏈接", "en-US": "External Links", "zh-CN": "外部链接" };
data["officalsite"] = { "ja-JP": "公式サイト", "zh-TW": "官網", "en-US": "Offical Site", "zh-CN": "官网" };
data["officalannouncement"] = { "ja-JP": "お知らせ", "zh-TW": "遊戲公告", "en-US": "Offical Announcement", "zh-CN": "游戏公告" };

data["ui"] = { "ja-JP": "UI言語", "zh-TW": "界面語言", "en-US": "UI", "zh-CN": "界面语言" };
data["data"] = { "ja-JP": "", "zh-TW": "資料語言", "en-US": "Data", "zh-CN": "数据语言" };

data["server"] = { "ja-JP": "サーバー", "zh-TW": "伺服器", "en-US": "Server", "zh-CN": "服务器" };

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
var getLangText = function () {
    if (!currentLang) {
        setLang();
    }
    return _.find(supportedLang, function (o) {
        return o.key == currentLang;
    }).text;
};
var setLang = function (lang) {
    lang = lang || localStorage["uilang"] || navigator.language || navigator.browserLanguage;
    if (_.some(supportedLang, function (o) { return o.key == lang }) == false) {
        lang = 'ja-JP';
    }
    currentLang = lang;
    localStorage["uilang"] = lang;
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
};

const Ui = {
    supportedLang,
    getText,
    getLang,
    getLangText,
    setLang,
    init
};

export { Ui };
export default Ui;