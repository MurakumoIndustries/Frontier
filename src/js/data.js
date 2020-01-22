import localForage from "localforage";
import serverList from "../data/serverList.json";

const baseKey = "MI_Frontier_";
const lastUpdateKey = baseKey + "LastUpdate";
const serverKey = baseKey + "Server";
const filelist = [
    'maplist',
    'maptable',
    'stage',
    'items',
    'enemy',
    'enemybase',
    'attrset',
    'buff',
    'hitokoe'
];

var data = {};

var getAllServers = function () {
    return serverList;
}
var getDefaultServer = function () {
    return _.find(getAllServers(), function (o) { return o.isDefault });
}
var getCurrentServer = function () {
    var currentServerID = localStorage.getItem(serverKey);
    if (!currentServerID) {
        return getDefaultServer();
    }
    var current = _.find(getAllServers(), function (o) { return o.id == currentServerID });
    return current || getDefaultServer();
}
var setCurrentServer = function (id) {
    var server = getAllServers()[id] || getDefaultServer();
    localStorage.setItem(serverKey, server.id);
}

var init = function (forceInit) {
    forceInit = !!forceInit;
    var folder = getCurrentServer().folder;
    var store = localForage.createInstance({
        name: baseKey + folder
    });
    return isDataOutdated().then(function (needForceUpdate) {
        var promises = [];
        if (!forceInit && !needForceUpdate) {
            console.log("All data cached. ", folder);
            var loaddata = function (key) {
                return store.getItem(baseKey + key).then(json => {
                    data[key] = JSON.parse(json);
                });
            };
            _.each(filelist, function (o, i) {
                promises.push(loaddata(o));
            });
            return Promise.all(promises);
        }
        return store.clear().then(() => {
            var savedata = function (key, server, jsondata) {
                return store.setItem(baseKey + key, JSON.stringify(jsondata), function () {
                    console.log("Get data from web. ", server, key);
                    data[key] = jsondata;
                });
            }
            _.each(filelist, function (o, i) {
                promises.push(
                    import(
                        /* webpackChunkName: "jsondata" */
                        '../data/' + folder + '/' + o + '.json').then(jsondata => {
                        return savedata(o, folder, jsondata.default);
                    }));
            });
            return Promise.all(promises).then(() => {
                return store.setItem(lastUpdateKey, lastUpdate)
            });
        });
    });
};

var lastUpdate;
var isDataOutdated = function () {
    var folder = getCurrentServer().folder;
    var store = localForage.createInstance({
        name: baseKey + folder
    });
    return store.getItem(lastUpdateKey).then(function (data) {
        lastUpdate = data;
        return import('../data/' + folder + '/lastUpdate.json').then(data => {
            var local = lastUpdate;
            var remote = data.default;
            var isLatest = new Date(local).getTime() >= new Date(remote).getTime();
            lastUpdate = remote;
            if (!local) {
                return true;
            }
            return isLatest == false;
        });
    });
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
var convertAttr2nd = function (attr) {
    switch (attr) {
        case 4:
            return "normal";
        case 5:
            return "thunder";
        case 6:
            return "gravity";
        case 7:
            return "fire";
        case 8:
            return "ice";
        case 9:
            return "light";
        case 10:
            return "collapse";
        case 11:
            return "theory";
        case 255:
            return "nothing";
        default:
            return "unknown" + attr;
    }
}

const Data = {
    getAllServers,
    getCurrentServer,
    setCurrentServer,
    init,
    getAll,
    get,
    convertAttr2nd
};

export { Data };
export default Data;