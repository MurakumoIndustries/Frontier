!function(e){function n(n){for(var t,o,a=n[0],i=n[1],u=0,f=[];u<a.length;u++)o=a[u],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&f.push(r[o][0]),r[o]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t]);for(c&&c(n);f.length;)f.shift()()}var t={},r={2:0};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(e){var n=[],t=r[e];if(0!==t)if(t)n.push(t[2]);else{var a=new Promise((function(n,o){t=r[e]=[n,o]}));n.push(t[2]=a);var i,u=document.createElement("script");u.charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.src=function(e){return o.p+""+({0:"jsondata17",1:"jsondata6",3:"jsondata0",4:"jsondata1",5:"jsondata11",6:"jsondata12",7:"jsondata13",8:"jsondata14",9:"jsondata15",10:"jsondata16",11:"jsondata18",12:"jsondata19",13:"jsondata2",14:"jsondata20",15:"jsondata3",16:"jsondata4",17:"jsondata5",18:"jsondata7",19:"jsondata8",20:"jsondata9"}[e]||e)+"."+{0:"6592aee8295d21bc96cb",1:"a28905e8c32fe2d64d58",3:"e8c584f41476f0d81e91",4:"7d9e5a6b87577f8b3773",5:"ce1928165c001c5b5304",6:"57caf9075ebfbd873aca",7:"3916f36994ccf872127d",8:"43c81f35cb935394ac28",9:"3c7d2098d59deb650e8e",10:"7c5f3b99f8e0bc205f68",11:"2ba3cb53a3da0c133f17",12:"1a033fd2569dd4589594",13:"967c17adb41c2ba98125",14:"86852b9063a2c7cc4d0e",15:"2a6cef81c5d2441143e1",16:"569eb98c6fb4865706ac",17:"7e581ccc44777fa11fa6",18:"4eee0a236355919eeb5e",19:"9507b63ab608b6e197b6",20:"8faf9a1107b1739c28a8"}[e]+".js"}(e);var c=new Error;i=function(n){u.onerror=u.onload=null,clearTimeout(f);var t=r[e];if(0!==t){if(t){var o=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;c.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",c.name="ChunkLoadError",c.type=o,c.request=a,t[1](c)}r[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:u})}),12e4);u.onerror=u.onload=i,document.head.appendChild(u)}return Promise.all(n)},o.m=e,o.c=t,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o.oe=function(e){throw console.error(e),e};var a=window.webpackJsonp=window.webpackJsonp||[],i=a.push.bind(a);a.push=n,a=a.slice();for(var u=0;u<a.length;u++)n(a[u]);var c=i;o(o.s=2)}([,,function(e,n,t){"use strict";t.r(n),t.d(n,"Data",(function(){return p}));var r=t(5),o=t.n(r),a=t(4);const i="MI_Frontier_",u=["maplist","maptable","stage","items","enemy","enemybase","attrset","buff","hitokoe"];var c,f={},s=function(){return a},l=function(){return _.find(s(),(function(e){return e.isDefault}))},d=function(){var e=localStorage.getItem("MI_Frontier_Server");return e&&_.find(s(),(function(n){return n.id==e}))||l()},v=function(){var e=d().folder;return o.a.createInstance({name:i+e}).getItem("MI_Frontier_LastUpdate").then((function(n){return c=n,t(13)("./"+e+"/lastUpdate.json").then(e=>{var n=c,t=e.default,r=new Date(n).getTime()>=new Date(t).getTime();return c=t,!n||0==r})}))},h=function(e){return f[e.toLowerCase()]?f[e.toLowerCase()]:(console.log("dirty data detected!"),location.hash="#!/init/force",[])};const p={getAllServers:s,getCurrentServer:d,setCurrentServer:function(e){var n=s()[e]||l();localStorage.setItem("MI_Frontier_Server",n.id)},init:function(e){e=!!e;var n=d().folder,r=o.a.createInstance({name:i+n});return v().then((function(o){var a=[];if(!e&&!o){console.log("All data cached. ",n);return _.each(u,(function(e,n){var t;a.push((t=e,r.getItem(i+t).then(e=>{f[t]=JSON.parse(e)})))})),Promise.all(a)}return r.clear().then(()=>{return _.each(u,(function(e,o){a.push(t(12)("./"+n+"/"+e+".json").then(t=>(function(e,n,t){return r.setItem(i+e,JSON.stringify(t),(function(){console.log("Get data from web. ",n,e),f[e]=t}))})(e,n,t.default)))})),Promise.all(a).then(()=>r.setItem("MI_Frontier_LastUpdate",c))})}))},getAll:h,get:function(e,n){return _.find(h(e),(function(e){return e.id==n}))},convertAttr2nd:function(e){switch(e){case 4:return"normal";case 5:return"thunder";case 6:return"gravity";case 7:return"fire";case 8:return"ice";case 9:return"light";case 10:return"collapse";case 11:return"theory";case 255:return"nothing";default:return"unknown"+e}}};n.default=p},function(e,n){var t;t=function(){return this}();try{t=t||new Function("return this")()}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e){e.exports=JSON.parse('{"pyramid":{"id":"pyramid","name":"Pyramid","folder":"pyramid","version":"23759","isDefault":true},"sonet":{"id":"sonet","name":"So-net","folder":"sonet","version":"90"}}')},function(e,n,t){(function(n){var t;e.exports=function e(n,r,o){function a(u,c){if(!r[u]){if(!n[u]){if(!c&&"function"==typeof t&&t)return t(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var s=r[u]={exports:{}};n[u][0].call(s.exports,(function(e){var t=n[u][1][e];return a(t||e)}),s,s.exports,e,n,r,o)}return r[u].exports}for(var i="function"==typeof t&&t,u=0;u<o.length;u++)a(o[u]);return a}({1:[function(e,t,r){(function(e){"use strict";var n,r,o=e.MutationObserver||e.WebKitMutationObserver;if(o){var a=0,i=new o(s),u=e.document.createTextNode("");i.observe(u,{characterData:!0}),n=function(){u.data=a=++a%2}}else if(e.setImmediate||void 0===e.MessageChannel)n="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var n=e.document.createElement("script");n.onreadystatechange=function(){s(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},e.document.documentElement.appendChild(n)}:function(){setTimeout(s,0)};else{var c=new e.MessageChannel;c.port1.onmessage=s,n=function(){c.port2.postMessage(0)}}var f=[];function s(){var e,n;r=!0;for(var t=f.length;t;){for(n=f,f=[],e=-1;++e<t;)n[e]();t=f.length}r=!1}t.exports=function(e){1!==f.push(e)||r||n()}}).call(this,void 0!==n?n:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,n,t){"use strict";var r=e(1);function o(){}var a={},i=["REJECTED"],u=["FULFILLED"],c=["PENDING"];function f(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=c,this.queue=[],this.outcome=void 0,e!==o&&v(this,e)}function s(e,n,t){this.promise=e,"function"==typeof n&&(this.onFulfilled=n,this.callFulfilled=this.otherCallFulfilled),"function"==typeof t&&(this.onRejected=t,this.callRejected=this.otherCallRejected)}function l(e,n,t){r((function(){var r;try{r=n(t)}catch(n){return a.reject(e,n)}r===e?a.reject(e,new TypeError("Cannot resolve promise with itself")):a.resolve(e,r)}))}function d(e){var n=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof n)return function(){n.apply(e,arguments)}}function v(e,n){var t=!1;function r(n){t||(t=!0,a.reject(e,n))}function o(n){t||(t=!0,a.resolve(e,n))}var i=h((function(){n(o,r)}));"error"===i.status&&r(i.value)}function h(e,n){var t={};try{t.value=e(n),t.status="success"}catch(e){t.status="error",t.value=e}return t}n.exports=f,f.prototype.catch=function(e){return this.then(null,e)},f.prototype.then=function(e,n){if("function"!=typeof e&&this.state===u||"function"!=typeof n&&this.state===i)return this;var t=new this.constructor(o);return this.state!==c?l(t,this.state===u?e:n,this.outcome):this.queue.push(new s(t,e,n)),t},s.prototype.callFulfilled=function(e){a.resolve(this.promise,e)},s.prototype.otherCallFulfilled=function(e){l(this.promise,this.onFulfilled,e)},s.prototype.callRejected=function(e){a.reject(this.promise,e)},s.prototype.otherCallRejected=function(e){l(this.promise,this.onRejected,e)},a.resolve=function(e,n){var t=h(d,n);if("error"===t.status)return a.reject(e,t.value);var r=t.value;if(r)v(e,r);else{e.state=u,e.outcome=n;for(var o=-1,i=e.queue.length;++o<i;)e.queue[o].callFulfilled(n)}return e},a.reject=function(e,n){e.state=i,e.outcome=n;for(var t=-1,r=e.queue.length;++t<r;)e.queue[t].callRejected(n);return e},f.resolve=function(e){return e instanceof this?e:a.resolve(new this(o),e)},f.reject=function(e){var n=new this(o);return a.reject(n,e)},f.all=function(e){var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var t=e.length,r=!1;if(!t)return this.resolve([]);for(var i=new Array(t),u=0,c=-1,f=new this(o);++c<t;)s(e[c],c);return f;function s(e,o){n.resolve(e).then((function(e){i[o]=e,++u!==t||r||(r=!0,a.resolve(f,i))}),(function(e){r||(r=!0,a.reject(f,e))}))}},f.race=function(e){var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var t=e.length,r=!1;if(!t)return this.resolve([]);for(var i,u=-1,c=new this(o);++u<t;)i=e[u],n.resolve(i).then((function(e){r||(r=!0,a.resolve(c,e))}),(function(e){r||(r=!0,a.reject(c,e))}));return c}},{1:1}],3:[function(e,t,r){(function(n){"use strict";"function"!=typeof n.Promise&&(n.Promise=e(2))}).call(this,void 0!==n?n:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(e,n,t){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(e){return}}();function a(e,n){e=e||[],n=n||{};try{return new Blob(e,n)}catch(o){if("TypeError"!==o.name)throw o;for(var t=new("undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder),r=0;r<e.length;r+=1)t.append(e[r]);return t.getBlob(n.type)}}"undefined"==typeof Promise&&e(3);var i=Promise;function u(e,n){n&&e.then((function(e){n(null,e)}),(function(e){n(e)}))}function c(e,n,t){"function"==typeof n&&e.then(n),"function"==typeof t&&e.catch(t)}function f(e){return"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function s(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}var l="local-forage-detect-blob-support",d=void 0,v={},h=Object.prototype.toString,p="readonly",y="readwrite";function b(e){return"boolean"==typeof d?i.resolve(d):function(e){return new i((function(n){var t=e.transaction(l,y),r=a([""]);t.objectStore(l).put(r,"key"),t.onabort=function(e){e.preventDefault(),e.stopPropagation(),n(!1)},t.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),t=navigator.userAgent.match(/Edge\//);n(t||!e||parseInt(e[1],10)>=43)}})).catch((function(){return!1}))}(e).then((function(e){return d=e}))}function m(e){var n=v[e.name],t={};t.promise=new i((function(e,n){t.resolve=e,t.reject=n})),n.deferredOperations.push(t),n.dbReady?n.dbReady=n.dbReady.then((function(){return t.promise})):n.dbReady=t.promise}function g(e){var n=v[e.name].deferredOperations.pop();if(n)return n.resolve(),n.promise}function _(e,n){var t=v[e.name].deferredOperations.pop();if(t)return t.reject(n),t.promise}function w(e,n){return new i((function(t,r){if(v[e.name]=v[e.name]||{forages:[],db:null,dbReady:null,deferredOperations:[]},e.db){if(!n)return t(e.db);m(e),e.db.close()}var a=[e.name];n&&a.push(e.version);var i=o.open.apply(o,a);n&&(i.onupgradeneeded=function(n){var t=i.result;try{t.createObjectStore(e.storeName),n.oldVersion<=1&&t.createObjectStore(l)}catch(t){if("ConstraintError"!==t.name)throw t;console.warn('The database "'+e.name+'" has been upgraded from version '+n.oldVersion+" to version "+n.newVersion+', but the storage "'+e.storeName+'" already exists.')}}),i.onerror=function(e){e.preventDefault(),r(i.error)},i.onsuccess=function(){t(i.result),g(e)}}))}function I(e){return w(e,!1)}function j(e){return w(e,!0)}function S(e,n){if(!e.db)return!0;var t=!e.db.objectStoreNames.contains(e.storeName),r=e.version<e.db.version,o=e.version>e.db.version;if(r&&(e.version!==n&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),o||t){if(t){var a=e.db.version+1;a>e.version&&(e.version=a)}return!0}return!1}function E(e){return a([function(e){for(var n=e.length,t=new ArrayBuffer(n),r=new Uint8Array(t),o=0;o<n;o++)r[o]=e.charCodeAt(o);return t}(atob(e.data))],{type:e.type})}function N(e){return e&&e.__local_forage_encoded_blob}function O(e){var n=this,t=n._initReady().then((function(){var e=v[n._dbInfo.name];if(e&&e.dbReady)return e.dbReady}));return c(t,e,e),t}function D(e,n,t,r){void 0===r&&(r=1);try{var o=e.db.transaction(e.storeName,n);t(null,o)}catch(o){if(r>0&&(!e.db||"InvalidStateError"===o.name||"NotFoundError"===o.name))return i.resolve().then((function(){if(!e.db||"NotFoundError"===o.name&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),j(e)})).then((function(){return function(e){m(e);for(var n=v[e.name],t=n.forages,r=0;r<t.length;r++){var o=t[r];o._dbInfo.db&&(o._dbInfo.db.close(),o._dbInfo.db=null)}return e.db=null,I(e).then((function(n){return e.db=n,S(e)?j(e):n})).then((function(r){e.db=n.db=r;for(var o=0;o<t.length;o++)t[o]._dbInfo.db=r})).catch((function(n){throw _(e,n),n}))}(e).then((function(){D(e,n,t,r-1)}))})).catch(t);t(o)}}var A={_driver:"asyncStorage",_initStorage:function(e){var n=this,t={db:null};if(e)for(var r in e)t[r]=e[r];var o=v[t.name];o||(o={forages:[],db:null,dbReady:null,deferredOperations:[]},v[t.name]=o),o.forages.push(n),n._initReady||(n._initReady=n.ready,n.ready=O);var a=[];function u(){return i.resolve()}for(var c=0;c<o.forages.length;c++){var f=o.forages[c];f!==n&&a.push(f._initReady().catch(u))}var s=o.forages.slice(0);return i.all(a).then((function(){return t.db=o.db,I(t)})).then((function(e){return t.db=e,S(t,n._defaultConfig.version)?j(t):e})).then((function(e){t.db=o.db=e,n._dbInfo=t;for(var r=0;r<s.length;r++){var a=s[r];a!==n&&(a._dbInfo.db=t.db,a._dbInfo.version=t.version)}}))},_support:function(){try{if(!o)return!1;var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),n="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!e||n)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(e){return!1}}(),iterate:function(e,n){var t=this,r=new i((function(n,r){t.ready().then((function(){D(t._dbInfo,p,(function(o,a){if(o)return r(o);try{var i=a.objectStore(t._dbInfo.storeName).openCursor(),u=1;i.onsuccess=function(){var t=i.result;if(t){var r=t.value;N(r)&&(r=E(r));var o=e(r,t.key,u++);void 0!==o?n(o):t.continue()}else n()},i.onerror=function(){r(i.error)}}catch(e){r(e)}}))})).catch(r)}));return u(r,n),r},getItem:function(e,n){var t=this;e=f(e);var r=new i((function(n,r){t.ready().then((function(){D(t._dbInfo,p,(function(o,a){if(o)return r(o);try{var i=a.objectStore(t._dbInfo.storeName).get(e);i.onsuccess=function(){var e=i.result;void 0===e&&(e=null),N(e)&&(e=E(e)),n(e)},i.onerror=function(){r(i.error)}}catch(e){r(e)}}))})).catch(r)}));return u(r,n),r},setItem:function(e,n,t){var r=this;e=f(e);var o=new i((function(t,o){var a;r.ready().then((function(){return a=r._dbInfo,"[object Blob]"===h.call(n)?b(a.db).then((function(e){return e?n:(t=n,new i((function(e,n){var r=new FileReader;r.onerror=n,r.onloadend=function(n){var r=btoa(n.target.result||"");e({__local_forage_encoded_blob:!0,data:r,type:t.type})},r.readAsBinaryString(t)})));var t})):n})).then((function(n){D(r._dbInfo,y,(function(a,i){if(a)return o(a);try{var u=i.objectStore(r._dbInfo.storeName);null===n&&(n=void 0);var c=u.put(n,e);i.oncomplete=function(){void 0===n&&(n=null),t(n)},i.onabort=i.onerror=function(){var e=c.error?c.error:c.transaction.error;o(e)}}catch(e){o(e)}}))})).catch(o)}));return u(o,t),o},removeItem:function(e,n){var t=this;e=f(e);var r=new i((function(n,r){t.ready().then((function(){D(t._dbInfo,y,(function(o,a){if(o)return r(o);try{var i=a.objectStore(t._dbInfo.storeName).delete(e);a.oncomplete=function(){n()},a.onerror=function(){r(i.error)},a.onabort=function(){var e=i.error?i.error:i.transaction.error;r(e)}}catch(e){r(e)}}))})).catch(r)}));return u(r,n),r},clear:function(e){var n=this,t=new i((function(e,t){n.ready().then((function(){D(n._dbInfo,y,(function(r,o){if(r)return t(r);try{var a=o.objectStore(n._dbInfo.storeName).clear();o.oncomplete=function(){e()},o.onabort=o.onerror=function(){var e=a.error?a.error:a.transaction.error;t(e)}}catch(e){t(e)}}))})).catch(t)}));return u(t,e),t},length:function(e){var n=this,t=new i((function(e,t){n.ready().then((function(){D(n._dbInfo,p,(function(r,o){if(r)return t(r);try{var a=o.objectStore(n._dbInfo.storeName).count();a.onsuccess=function(){e(a.result)},a.onerror=function(){t(a.error)}}catch(e){t(e)}}))})).catch(t)}));return u(t,e),t},key:function(e,n){var t=this,r=new i((function(n,r){e<0?n(null):t.ready().then((function(){D(t._dbInfo,p,(function(o,a){if(o)return r(o);try{var i=a.objectStore(t._dbInfo.storeName),u=!1,c=i.openCursor();c.onsuccess=function(){var t=c.result;t?0===e?n(t.key):u?n(t.key):(u=!0,t.advance(e)):n(null)},c.onerror=function(){r(c.error)}}catch(e){r(e)}}))})).catch(r)}));return u(r,n),r},keys:function(e){var n=this,t=new i((function(e,t){n.ready().then((function(){D(n._dbInfo,p,(function(r,o){if(r)return t(r);try{var a=o.objectStore(n._dbInfo.storeName).openCursor(),i=[];a.onsuccess=function(){var n=a.result;n?(i.push(n.key),n.continue()):e(i)},a.onerror=function(){t(a.error)}}catch(e){t(e)}}))})).catch(t)}));return u(t,e),t},dropInstance:function(e,n){n=s.apply(this,arguments);var t,r=this.config();if((e="function"!=typeof e&&e||{}).name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName),e.name){var a=e.name===r.name&&this._dbInfo.db?i.resolve(this._dbInfo.db):I(e).then((function(n){var t=v[e.name],r=t.forages;t.db=n;for(var o=0;o<r.length;o++)r[o]._dbInfo.db=n;return n}));t=e.storeName?a.then((function(n){if(n.objectStoreNames.contains(e.storeName)){var t=n.version+1;m(e);var r=v[e.name],a=r.forages;n.close();for(var u=0;u<a.length;u++){var c=a[u];c._dbInfo.db=null,c._dbInfo.version=t}return new i((function(n,r){var a=o.open(e.name,t);a.onerror=function(e){a.result.close(),r(e)},a.onupgradeneeded=function(){a.result.deleteObjectStore(e.storeName)},a.onsuccess=function(){var e=a.result;e.close(),n(e)}})).then((function(e){r.db=e;for(var n=0;n<a.length;n++){var t=a[n];t._dbInfo.db=e,g(t._dbInfo)}})).catch((function(n){throw(_(e,n)||i.resolve()).catch((function(){})),n}))}})):a.then((function(n){m(e);var t=v[e.name],r=t.forages;n.close();for(var a=0;a<r.length;a++)r[a]._dbInfo.db=null;return new i((function(n,t){var r=o.deleteDatabase(e.name);r.onerror=r.onblocked=function(e){var n=r.result;n&&n.close(),t(e)},r.onsuccess=function(){var e=r.result;e&&e.close(),n(e)}})).then((function(e){t.db=e;for(var n=0;n<r.length;n++)g(r[n]._dbInfo)})).catch((function(n){throw(_(e,n)||i.resolve()).catch((function(){})),n}))}))}else t=i.reject("Invalid arguments");return u(t,n),t}},R="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",k="~~local_forage_type~",x=/^~~local_forage_type~([^~]+)~/,C="__lfsc__:",T=C.length,B="arbf",F="blob",L="si08",M="ui08",P="uic8",U="si16",z="si32",q="ur16",W="ui32",J="fl32",H="fl64",Q=T+B.length,G=Object.prototype.toString;function K(e){var n,t,r,o,a,i=.75*e.length,u=e.length,c=0;"="===e[e.length-1]&&(i--,"="===e[e.length-2]&&i--);var f=new ArrayBuffer(i),s=new Uint8Array(f);for(n=0;n<u;n+=4)t=R.indexOf(e[n]),r=R.indexOf(e[n+1]),o=R.indexOf(e[n+2]),a=R.indexOf(e[n+3]),s[c++]=t<<2|r>>4,s[c++]=(15&r)<<4|o>>2,s[c++]=(3&o)<<6|63&a;return f}function X(e){var n,t=new Uint8Array(e),r="";for(n=0;n<t.length;n+=3)r+=R[t[n]>>2],r+=R[(3&t[n])<<4|t[n+1]>>4],r+=R[(15&t[n+1])<<2|t[n+2]>>6],r+=R[63&t[n+2]];return t.length%3==2?r=r.substring(0,r.length-1)+"=":t.length%3==1&&(r=r.substring(0,r.length-2)+"=="),r}var V={serialize:function(e,n){var t="";if(e&&(t=G.call(e)),e&&("[object ArrayBuffer]"===t||e.buffer&&"[object ArrayBuffer]"===G.call(e.buffer))){var r,o=C;e instanceof ArrayBuffer?(r=e,o+=B):(r=e.buffer,"[object Int8Array]"===t?o+=L:"[object Uint8Array]"===t?o+=M:"[object Uint8ClampedArray]"===t?o+=P:"[object Int16Array]"===t?o+=U:"[object Uint16Array]"===t?o+=q:"[object Int32Array]"===t?o+=z:"[object Uint32Array]"===t?o+=W:"[object Float32Array]"===t?o+=J:"[object Float64Array]"===t?o+=H:n(new Error("Failed to get type for BinaryArray"))),n(o+X(r))}else if("[object Blob]"===t){var a=new FileReader;a.onload=function(){var t=k+e.type+"~"+X(this.result);n(C+F+t)},a.readAsArrayBuffer(e)}else try{n(JSON.stringify(e))}catch(t){console.error("Couldn't convert value into a JSON string: ",e),n(null,t)}},deserialize:function(e){if(e.substring(0,T)!==C)return JSON.parse(e);var n,t=e.substring(Q),r=e.substring(T,Q);if(r===F&&x.test(t)){var o=t.match(x);n=o[1],t=t.substring(o[0].length)}var i=K(t);switch(r){case B:return i;case F:return a([i],{type:n});case L:return new Int8Array(i);case M:return new Uint8Array(i);case P:return new Uint8ClampedArray(i);case U:return new Int16Array(i);case q:return new Uint16Array(i);case z:return new Int32Array(i);case W:return new Uint32Array(i);case J:return new Float32Array(i);case H:return new Float64Array(i);default:throw new Error("Unkown type: "+r)}},stringToBuffer:K,bufferToString:X};function Y(e,n,t,r){e.executeSql("CREATE TABLE IF NOT EXISTS "+n.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],t,r)}function Z(e,n,t,r,o,a){e.executeSql(t,r,o,(function(e,i){i.code===i.SYNTAX_ERR?e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[n.storeName],(function(e,u){u.rows.length?a(e,i):Y(e,n,(function(){e.executeSql(t,r,o,a)}),a)}),a):a(e,i)}),a)}function $(e,n,t,r){var o=this;e=f(e);var a=new i((function(a,i){o.ready().then((function(){void 0===n&&(n=null);var u=n,c=o._dbInfo;c.serializer.serialize(n,(function(n,f){f?i(f):c.db.transaction((function(t){Z(t,c,"INSERT OR REPLACE INTO "+c.storeName+" (key, value) VALUES (?, ?)",[e,n],(function(){a(u)}),(function(e,n){i(n)}))}),(function(n){if(n.code===n.QUOTA_ERR){if(r>0)return void a($.apply(o,[e,u,t,r-1]));i(n)}}))}))})).catch(i)}));return u(a,t),a}var ee={_driver:"webSQLStorage",_initStorage:function(e){var n=this,t={db:null};if(e)for(var r in e)t[r]="string"!=typeof e[r]?e[r].toString():e[r];var o=new i((function(e,r){try{t.db=openDatabase(t.name,String(t.version),t.description,t.size)}catch(e){return r(e)}t.db.transaction((function(o){Y(o,t,(function(){n._dbInfo=t,e()}),(function(e,n){r(n)}))}),r)}));return t.serializer=V,o},_support:"function"==typeof openDatabase,iterate:function(e,n){var t=this,r=new i((function(n,r){t.ready().then((function(){var o=t._dbInfo;o.db.transaction((function(t){Z(t,o,"SELECT * FROM "+o.storeName,[],(function(t,r){for(var a=r.rows,i=a.length,u=0;u<i;u++){var c=a.item(u),f=c.value;if(f&&(f=o.serializer.deserialize(f)),void 0!==(f=e(f,c.key,u+1)))return void n(f)}n()}),(function(e,n){r(n)}))}))})).catch(r)}));return u(r,n),r},getItem:function(e,n){var t=this;e=f(e);var r=new i((function(n,r){t.ready().then((function(){var o=t._dbInfo;o.db.transaction((function(t){Z(t,o,"SELECT * FROM "+o.storeName+" WHERE key = ? LIMIT 1",[e],(function(e,t){var r=t.rows.length?t.rows.item(0).value:null;r&&(r=o.serializer.deserialize(r)),n(r)}),(function(e,n){r(n)}))}))})).catch(r)}));return u(r,n),r},setItem:function(e,n,t){return $.apply(this,[e,n,t,1])},removeItem:function(e,n){var t=this;e=f(e);var r=new i((function(n,r){t.ready().then((function(){var o=t._dbInfo;o.db.transaction((function(t){Z(t,o,"DELETE FROM "+o.storeName+" WHERE key = ?",[e],(function(){n()}),(function(e,n){r(n)}))}))})).catch(r)}));return u(r,n),r},clear:function(e){var n=this,t=new i((function(e,t){n.ready().then((function(){var r=n._dbInfo;r.db.transaction((function(n){Z(n,r,"DELETE FROM "+r.storeName,[],(function(){e()}),(function(e,n){t(n)}))}))})).catch(t)}));return u(t,e),t},length:function(e){var n=this,t=new i((function(e,t){n.ready().then((function(){var r=n._dbInfo;r.db.transaction((function(n){Z(n,r,"SELECT COUNT(key) as c FROM "+r.storeName,[],(function(n,t){var r=t.rows.item(0).c;e(r)}),(function(e,n){t(n)}))}))})).catch(t)}));return u(t,e),t},key:function(e,n){var t=this,r=new i((function(n,r){t.ready().then((function(){var o=t._dbInfo;o.db.transaction((function(t){Z(t,o,"SELECT key FROM "+o.storeName+" WHERE id = ? LIMIT 1",[e+1],(function(e,t){var r=t.rows.length?t.rows.item(0).key:null;n(r)}),(function(e,n){r(n)}))}))})).catch(r)}));return u(r,n),r},keys:function(e){var n=this,t=new i((function(e,t){n.ready().then((function(){var r=n._dbInfo;r.db.transaction((function(n){Z(n,r,"SELECT key FROM "+r.storeName,[],(function(n,t){for(var r=[],o=0;o<t.rows.length;o++)r.push(t.rows.item(o).key);e(r)}),(function(e,n){t(n)}))}))})).catch(t)}));return u(t,e),t},dropInstance:function(e,n){n=s.apply(this,arguments);var t=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||t.name,e.storeName=e.storeName||t.storeName);var r,o=this;return u(r=e.name?new i((function(n){var r;r=e.name===t.name?o._dbInfo.db:openDatabase(e.name,"","",0),e.storeName?n({db:r,storeNames:[e.storeName]}):n(function(e){return new i((function(n,t){e.transaction((function(r){r.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],(function(t,r){for(var o=[],a=0;a<r.rows.length;a++)o.push(r.rows.item(a).name);n({db:e,storeNames:o})}),(function(e,n){t(n)}))}),(function(e){t(e)}))}))}(r))})).then((function(e){return new i((function(n,t){e.db.transaction((function(r){function o(e){return new i((function(n,t){r.executeSql("DROP TABLE IF EXISTS "+e,[],(function(){n()}),(function(e,n){t(n)}))}))}for(var a=[],u=0,c=e.storeNames.length;u<c;u++)a.push(o(e.storeNames[u]));i.all(a).then((function(){n()})).catch((function(e){t(e)}))}),(function(e){t(e)}))}))})):i.reject("Invalid arguments"),n),r}};function ne(e,n){var t=e.name+"/";return e.storeName!==n.storeName&&(t+=e.storeName+"/"),t}function te(){return!function(){try{return localStorage.setItem("_localforage_support_test",!0),localStorage.removeItem("_localforage_support_test"),!1}catch(e){return!0}}()||localStorage.length>0}var re={_driver:"localStorageWrapper",_initStorage:function(e){var n={};if(e)for(var t in e)n[t]=e[t];return n.keyPrefix=ne(e,this._defaultConfig),te()?(this._dbInfo=n,n.serializer=V,i.resolve()):i.reject()},_support:function(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(e){return!1}}(),iterate:function(e,n){var t=this,r=t.ready().then((function(){for(var n=t._dbInfo,r=n.keyPrefix,o=r.length,a=localStorage.length,i=1,u=0;u<a;u++){var c=localStorage.key(u);if(0===c.indexOf(r)){var f=localStorage.getItem(c);if(f&&(f=n.serializer.deserialize(f)),void 0!==(f=e(f,c.substring(o),i++)))return f}}}));return u(r,n),r},getItem:function(e,n){var t=this;e=f(e);var r=t.ready().then((function(){var n=t._dbInfo,r=localStorage.getItem(n.keyPrefix+e);return r&&(r=n.serializer.deserialize(r)),r}));return u(r,n),r},setItem:function(e,n,t){var r=this;e=f(e);var o=r.ready().then((function(){void 0===n&&(n=null);var t=n;return new i((function(o,a){var i=r._dbInfo;i.serializer.serialize(n,(function(n,r){if(r)a(r);else try{localStorage.setItem(i.keyPrefix+e,n),o(t)}catch(e){"QuotaExceededError"!==e.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==e.name||a(e),a(e)}}))}))}));return u(o,t),o},removeItem:function(e,n){var t=this;e=f(e);var r=t.ready().then((function(){var n=t._dbInfo;localStorage.removeItem(n.keyPrefix+e)}));return u(r,n),r},clear:function(e){var n=this,t=n.ready().then((function(){for(var e=n._dbInfo.keyPrefix,t=localStorage.length-1;t>=0;t--){var r=localStorage.key(t);0===r.indexOf(e)&&localStorage.removeItem(r)}}));return u(t,e),t},length:function(e){var n=this.keys().then((function(e){return e.length}));return u(n,e),n},key:function(e,n){var t=this,r=t.ready().then((function(){var n,r=t._dbInfo;try{n=localStorage.key(e)}catch(e){n=null}return n&&(n=n.substring(r.keyPrefix.length)),n}));return u(r,n),r},keys:function(e){var n=this,t=n.ready().then((function(){for(var e=n._dbInfo,t=localStorage.length,r=[],o=0;o<t;o++){var a=localStorage.key(o);0===a.indexOf(e.keyPrefix)&&r.push(a.substring(e.keyPrefix.length))}return r}));return u(t,e),t},dropInstance:function(e,n){if(n=s.apply(this,arguments),!(e="function"!=typeof e&&e||{}).name){var t=this.config();e.name=e.name||t.name,e.storeName=e.storeName||t.storeName}var r,o=this;return u(r=e.name?new i((function(n){e.storeName?n(ne(e,o._defaultConfig)):n(e.name+"/")})).then((function(e){for(var n=localStorage.length-1;n>=0;n--){var t=localStorage.key(n);0===t.indexOf(e)&&localStorage.removeItem(t)}})):i.reject("Invalid arguments"),n),r}},oe=function(e,n){for(var t,r,o=e.length,a=0;a<o;){if((t=e[a])===(r=n)||"number"==typeof t&&"number"==typeof r&&isNaN(t)&&isNaN(r))return!0;a++}return!1},ae=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},ie={},ue={},ce={INDEXEDDB:A,WEBSQL:ee,LOCALSTORAGE:re},fe=[ce.INDEXEDDB._driver,ce.WEBSQL._driver,ce.LOCALSTORAGE._driver],se=["dropInstance"],le=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(se),de={description:"",driver:fe.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function ve(e,n){e[n]=function(){var t=arguments;return e.ready().then((function(){return e[n].apply(e,t)}))}}function he(){for(var e=1;e<arguments.length;e++){var n=arguments[e];if(n)for(var t in n)n.hasOwnProperty(t)&&(ae(n[t])?arguments[0][t]=n[t].slice():arguments[0][t]=n[t])}return arguments[0]}var pe=new(function(){function e(n){for(var t in function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),ce)if(ce.hasOwnProperty(t)){var r=ce[t],o=r._driver;this[t]=o,ie[o]||this.defineDriver(r)}this._defaultConfig=he({},de),this._config=he({},this._defaultConfig,n),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch((function(){}))}return e.prototype.config=function(e){if("object"===(void 0===e?"undefined":r(e))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var n in e){if("storeName"===n&&(e[n]=e[n].replace(/\W/g,"_")),"version"===n&&"number"!=typeof e[n])return new Error("Database version must be a number.");this._config[n]=e[n]}return!("driver"in e&&e.driver)||this.setDriver(this._config.driver)}return"string"==typeof e?this._config[e]:this._config},e.prototype.defineDriver=function(e,n,t){var r=new i((function(n,t){try{var r=e._driver,o=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!e._driver)return void t(o);for(var a=le.concat("_initStorage"),c=0,f=a.length;c<f;c++){var s=a[c];if((!oe(se,s)||e[s])&&"function"!=typeof e[s])return void t(o)}!function(){for(var n=function(e){return function(){var n=new Error("Method "+e+" is not implemented by the current driver"),t=i.reject(n);return u(t,arguments[arguments.length-1]),t}},t=0,r=se.length;t<r;t++){var o=se[t];e[o]||(e[o]=n(o))}}();var l=function(t){ie[r]&&console.info("Redefining LocalForage driver: "+r),ie[r]=e,ue[r]=t,n()};"_support"in e?e._support&&"function"==typeof e._support?e._support().then(l,t):l(!!e._support):l(!0)}catch(e){t(e)}}));return c(r,n,t),r},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(e,n,t){var r=ie[e]?i.resolve(ie[e]):i.reject(new Error("Driver not found."));return c(r,n,t),r},e.prototype.getSerializer=function(e){var n=i.resolve(V);return c(n,e),n},e.prototype.ready=function(e){var n=this,t=n._driverSet.then((function(){return null===n._ready&&(n._ready=n._initDriver()),n._ready}));return c(t,e,e),t},e.prototype.setDriver=function(e,n,t){var r=this;ae(e)||(e=[e]);var o=this._getSupportedDrivers(e);function a(){r._config.driver=r.driver()}function u(e){return r._extend(e),a(),r._ready=r._initStorage(r._config),r._ready}var f=null!==this._driverSet?this._driverSet.catch((function(){return i.resolve()})):i.resolve();return this._driverSet=f.then((function(){var e=o[0];return r._dbInfo=null,r._ready=null,r.getDriver(e).then((function(e){r._driver=e._driver,a(),r._wrapLibraryMethodsWithReady(),r._initDriver=function(e){return function(){var n=0;return function t(){for(;n<e.length;){var o=e[n];return n++,r._dbInfo=null,r._ready=null,r.getDriver(o).then(u).catch(t)}a();var c=new Error("No available storage method found.");return r._driverSet=i.reject(c),r._driverSet}()}}(o)}))})).catch((function(){a();var e=new Error("No available storage method found.");return r._driverSet=i.reject(e),r._driverSet})),c(this._driverSet,n,t),this._driverSet},e.prototype.supports=function(e){return!!ue[e]},e.prototype._extend=function(e){he(this,e)},e.prototype._getSupportedDrivers=function(e){for(var n=[],t=0,r=e.length;t<r;t++){var o=e[t];this.supports(o)&&n.push(o)}return n},e.prototype._wrapLibraryMethodsWithReady=function(){for(var e=0,n=le.length;e<n;e++)ve(this,le[e])},e.prototype.createInstance=function(n){return new e(n)},e}());n.exports=pe},{3:3}]},{},[4])(4)}).call(this,t(3))},,,,,,,function(e,n,t){var r={"./pyramid/attrset.json":[18,3],"./pyramid/buff.json":[19,4],"./pyramid/enemy.json":[20,13],"./pyramid/enemybase.json":[21,15],"./pyramid/hitokoe.json":[22,16],"./pyramid/items.json":[23,17],"./pyramid/lastUpdate.json":[10,1],"./pyramid/maplist.json":[24,18],"./pyramid/maptable.json":[25,19],"./pyramid/stage.json":[26,20],"./serverList.json":[4],"./sonet/attrset.json":[27,5],"./sonet/buff.json":[28,6],"./sonet/enemy.json":[29,7],"./sonet/enemybase.json":[30,8],"./sonet/hitokoe.json":[31,9],"./sonet/items.json":[32,10],"./sonet/lastUpdate.json":[11,0],"./sonet/maplist.json":[33,11],"./sonet/maptable.json":[34,12],"./sonet/stage.json":[35,14]};function o(e){if(!t.o(r,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=r[e],o=n[0];return Promise.all(n.slice(1).map(t.e)).then((function(){return t.t(o,3)}))}o.keys=function(){return Object.keys(r)},o.id=12,e.exports=o},function(e,n,t){var r={"./pyramid/lastUpdate.json":[10,1],"./sonet/lastUpdate.json":[11,0]};function o(e){if(!t.o(r,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=r[e],o=n[0];return t.e(n[1]).then((function(){return t.t(o,3)}))}o.keys=function(){return Object.keys(r)},o.id=13,e.exports=o}]);