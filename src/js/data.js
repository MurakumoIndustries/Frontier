import localForage from "localforage";

var data = {};

const version = 20489;
var getVersion = function () { return version; };

const baseKey = "MI_Frontier_";
const lastUpdateKey = "lastUpdate_MI_Frontier";

var init = function (forceInit) {
    forceInit = !!forceInit;
    return isDataOutdated().then(function (needForceUpdate) {
        var promises = [];
        if (!forceInit && !needForceUpdate) {
            console.log("All data cached. ");
            var loaddata = function (key) {
                return localForage.getItem(baseKey + key).then(json => {
                    data[key] = JSON.parse(json);
                });
            };
            promises.push(loaddata('maptable'));
            promises.push(loaddata('stage'));
            promises.push(loaddata('items'));
            promises.push(loaddata('enemy'));
            return Promise.all(promises);
        }
        return localForage.clear().then(() => {
            var savedata = function (key, jsondata) {
                return localForage.setItem(baseKey + key, JSON.stringify(jsondata), function () {
                    console.log("Get data from web. ", key);
                    data[key] = jsondata;
                });
            }
            promises.push(import(
                /* webpackChunkName: "jsondata" */
                '../data/maptable.json').then(jsondata => {
                    return savedata('maptable', jsondata);
                }));
            promises.push(import(
                /* webpackChunkName: "jsondata" */
                '../data/stage.json').then(jsondata => {
                    return savedata('stage', jsondata);
                }));
            promises.push(import(
                /* webpackChunkName: "jsondata" */
                '../data/items.json').then(jsondata => {
                    return savedata('items', jsondata);
                }));
            promises.push(import(
                /* webpackChunkName: "jsondata" */
                '../data/enemy.json').then(jsondata => {
                    return savedata('enemy', jsondata);
                }));
            return Promise.all(promises).then(() => {
                return saveLastUpdate();
            });
        });
    });
};

var lastUpdate;
var isDataOutdated = function () {
    return localForage.getItem(lastUpdateKey).then(function (data) {
        lastUpdate = data;
        return import('../data/lastUpdate.json').then(data => {
            var local = lastUpdate;
            var remote = data;
            var isLatest = new Date(local).getTime() >= new Date(remote).getTime();
            lastUpdate = remote;
            if (!local) {
                return true;
            }
            return isLatest == false;
        });
    });
};
var saveLastUpdate = function () {
    return localForage.setItem(lastUpdateKey, lastUpdate)
};

var getAll = function (type) {
    if (!data[type.toLowerCase()]) {
        console.log("dirty data detected!");
        location.hash = '#!/init/force';
        return [];
    }
    return data[type.toLowerCase()];
};
var get = function (type, id) {
    return _.find(getAll(type), function (o) { return o.id == id });
};

export {
    getVersion,
    init,
    isDataOutdated,
    saveLastUpdate,
    getAll,
    get
};
export default {
    getVersion,
    init,
    isDataOutdated,
    saveLastUpdate,
    getAll,
    get
};