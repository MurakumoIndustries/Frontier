import $ from "jquery";

var data = {};

const version = 20325;
var getVersion = function () { return version; };

var init = function (type) {
    var dtd = $.Deferred();
    if (!type) {
        dtd.reject();
        return dtd.promise();
    }
    var key = type;
    var self = this;
    return self.isDataTooOld().then(function (force) {
        var json = localStorage.getItem(key);
        if (json && !force) {
            var jsondata = JSON.parse(json);
            console.log("Get data from cache. ", key);
            data[type] = jsondata;
            dtd.resolve();
            return dtd.promise();
        }
        else {
            switch (type.toLowerCase()) {
                case "maptable":
                    return import('../data/maptable.json').then(jsondata => {
                        localStorage[key] = JSON.stringify(jsondata);
                        console.log("Get data from web. ", key);
                        data[type] = jsondata;
                    });
                    break;
                default:
                    break;
            }
        }
    });
};

var isLatest = null;
var lastUpdate;
const lastUpdateKey = "lastUpdate_MIF";
var isDataTooOld = function () {
    var dtd = $.Deferred();
    if (isLatest !== null) {
        dtd.resolve(isLatest == false);
        return dtd.promise();
    }
    lastUpdate = localStorage.getItem(lastUpdateKey);
    return import('../data/lastUpdate.json').then(data => {
        var local = lastUpdate;
        var remote = data;
        isLatest = new Date(local).getTime() >= new Date(remote).getTime();
        lastUpdate = remote;
        if (!local) {
            return true;
        }
        return isLatest == false;
    });
};
var saveLastUpdate = function () {
    localStorage.setItem(lastUpdateKey, lastUpdate)
};

var getMap = function (id) {
    return _.find(data["maptable"], function (o) { return o.id == id });
};

export {
    getVersion,
    init,
    isDataTooOld,
    saveLastUpdate,
    getMap
};
export default {
    getVersion,
    init,
    isDataTooOld,
    saveLastUpdate,
    getMap
};