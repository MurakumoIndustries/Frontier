(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{54:function(t,e,i){},55:function(t,e){t.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-10,-10,260,180" preserveAspectRatio="xMidYMid meet"><polygon points="0,80 64,0 176,0 240,80 176,160 64,160"></polygon></svg>'},56:function(t,e,i){},57:function(t,e,i){},58:function(t,e,i){},59:function(t,e,i){},60:function(t,e,i){},61:function(t,e,i){},62:function(t,e,i){},63:function(t,e,i){},64:function(t,e,i){},66:function(t,e,i){"use strict";var a=i(54);i.n(a).a},68:function(t,e,i){"use strict";var a=i(56);i.n(a).a},70:function(t,e,i){"use strict";var a=i(57);i.n(a).a},73:function(t,e,i){"use strict";var a=i(58);i.n(a).a},75:function(t,e,i){"use strict";var a=i(59);i.n(a).a},77:function(t,e,i){"use strict";var a=i(60);i.n(a).a},79:function(t,e,i){"use strict";var a=i(61);i.n(a).a},81:function(t,e,i){"use strict";var a=i(62);i.n(a).a},83:function(t,e,i){"use strict";var a=i(63);i.n(a).a},85:function(t,e,i){"use strict";var a=i(64);i.n(a).a},87:function(t,e,i){"use strict";i.r(e);var a=i(5),n=i.n(a),s=(i(8),i(0),i(6)),r=i(2),o=i(1),c=i.n(o),l=i(19),u=i(65),p=i.n(u);const v=new l.a;var d=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"h-100"},[e("Nav"),this._v(" "),e("Frontier")],1)};d._withStripped=!0;var h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("nav",{staticClass:"navbar fixed-top navbar-expand-lg navbar-light bg-light"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),i("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[t._m(3),t._v(" "),i("ul",{staticClass:"navbar-nav my-0"},[i("li",{staticClass:"nav-item dropdown"},[i("a",{staticClass:"nav-link dropdown-toggle py-0",attrs:{href:"#",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[i("i",{staticClass:"icon icon-version"}),t._v(" "),i("div",{staticClass:"d-inline-block",staticStyle:{"vertical-align":"middle"}},[i("div",{attrs:{id:"server"}},[t._v(t._s(t.currentServer.name))]),t._v(" "),i("div",{staticClass:"m-0",staticStyle:{"font-size":"0.75rem","line-height":"0.75rem"},attrs:{id:"version"}},[t._v(t._s(t.currentServer.version))])])]),t._v(" "),i("ul",{staticClass:"dropdown-menu dropdown-menu-right"},[i("h6",{staticClass:"dropdown-header"},[t._v(t._s(t.Ui.getText("server")))]),t._v(" "),t._l(t.allServers,function(e){return i("a",{key:e.id,class:["dropdown-item",e.id==t.currentServer.id?"active":""],attrs:{href:"#!/server/"+e.id}},[t._v("\n                        "+t._s(e.name)+"\n                        "),i("p",{staticClass:"m-0",staticStyle:{"font-size":"0.75rem","line-height":"0.75rem"}},[t._v(t._s(e.version))])])}),t._v(" "),i("div",{staticClass:"dropdown-divider",attrs:{id:"serverDivider"}}),t._v(" "),i("h6",{staticClass:"dropdown-header"},[t._v(t._s(t.Ui.getText("externallink")))]),t._v(" "),i("a",{staticClass:"dropdown-item",attrs:{href:"https://colopl.co.jp/alicegearaegis/",target:"_blank",rel:"noopener noreferrer"}},[i("span",{staticClass:"mr-4"},[t._v(t._s(t.Ui.getText("officalsite")))]),t._v(" "),i("i",{staticClass:"material-icons text-black-50",staticStyle:{position:"absolute",right:"1rem"}},[t._v("open_in_new")])]),t._v(" "),i("a",{staticClass:"dropdown-item",attrs:{href:"https://alice.colopl.jp/news/show",target:"_blank",rel:"noopener noreferrer"}},[i("span",{staticClass:"mr-4"},[t._v(t._s(t.Ui.getText("officalannouncement")))]),t._v(" "),i("i",{staticClass:"material-icons text-black-50",staticStyle:{position:"absolute",right:"1rem"}},[t._v("open_in_new")])]),t._v(" "),i("div",{staticClass:"dropdown-divider"}),t._v(" "),i("a",{staticClass:"dropdown-item",attrs:{href:"#"},on:{click:function(e){return t.toggleCache()}}},[t._v(t._s(t.Ui.getText(t.cacheDisabled?"enablecache":"disablecache")))])],2)]),t._v(" "),i("li",{staticClass:"nav-item dropdown"},[i("a",{staticClass:"nav-link dropdown-toggle",attrs:{href:"#",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[i("i",{staticClass:"material-icons"},[t._v("language")]),t._v(" "),i("span",{attrs:{id:"currentLang"}},[t._v(t._s(t.langText))])]),t._v(" "),i("ul",{staticClass:"dropdown-menu dropdown-menu-right"},t._l(t.Ui.supportedLang,function(e){return i("a",{key:e.key,staticClass:"dropdown-item",attrs:{href:"#!/lang/"+e.key},on:{click:function(i){t.langText=e.text}}},[t._v(t._s(e.text))])}),0)])])])])};h._withStripped=!0;var m={data:function(){return{langText:s.a.getLangText(),gearType:""}},methods:{toggleCache:function(){if(this.cacheDisabled)return localStorage.MI_Frontier_Disable_Cache=!1,void location.reload();confirm(s.a.getText("disablecachewarning"))&&"serviceWorker"in navigator&&navigator.serviceWorker.getRegistration().then(function(t){t&&t.unregister().then(function(t){localStorage.MI_Frontier_Disable_Cache=!0,location.reload()})})}},computed:{currentServer:function(){return r.Data.getCurrentServer()},allServers:function(){return r.Data.getAllServers()},cacheDisabled:function(){return"true"===localStorage.MI_Frontier_Disable_Cache}}},f=(i(66),i(53)),g=Object(f.a)(m,h,[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"pr-2",attrs:{href:"../"}},[e("i",{staticClass:"icon icon-murakumo"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("a",{staticClass:"navbar-brand",attrs:{title:"Murakumo Industries Frontier Map Viewer",href:"#"}},[i("span",{staticClass:"d-none d-lg-inline-block"},[t._v("Murakumo Industries")]),t._v(" "),i("span",{staticClass:"d-lg-none"},[t._v("MI")]),t._v(" "),i("span",[t._v("Frontier")]),t._v(" "),i("span",{staticClass:"d-none d-sm-inline-block"},[t._v("Map Viewer")]),t._v(" "),i("sup",[t._v("α")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[e("span",{staticClass:"navbar-toggler-icon"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"navbar-nav mr-auto"},[e("li",{staticClass:"nav-item"})])}],!1,null,"65af85a3",null);g.options.__file="src/components/Nav.vue";var x=g.exports,C=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container-fluid main-container h-100"},[i("div",{staticClass:"row h-100"},[i("div",{staticClass:"col-12 col-md-4 col-xl-3 p-0 sidebar"},[i("MapInfo",{attrs:{isShowSidebar:t.isShowSidebar,mapName:t.mapName,canGiveUp:t.map.canGiveUp,giveUpCost:t.map.giveUpCost,totalDanger:t.total.danger,totalRare:t.total.rare,totalNormal:t.total.normal,totalGachaPoint:t.total.gachaPoint,totalBattery:t.total.battery,totalGold:t.total.gold,totalEnergy:t.total.energy}}),t._v(" "),i("MapList",{attrs:{isShowSidebar:t.isShowSidebar}})],1),t._v(" "),i("div",{staticClass:"col-12 col-md-8 col-xl-9 p-0 h-100"},[t.map.id?i("Map",{attrs:{map:t.map}}):t._e()],1)])])};C._withStripped=!0;var b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"map-info-container p-2"},[i("div",{directives:[{name:"show",rawName:"v-show",value:!!t.mapName,expression:"!!mapName"}]},[i("div",[i("span",{staticClass:"map-name"},[t._v(t._s(t.mapName))]),t._v(" "),i("button",{staticClass:"d-md-none sidebar-toggle py-0 btn btn-outline-secondary",attrs:{type:"button"},on:{click:function(e){return t.toggleSidebar()}}},[i("i",{staticClass:"material-icons"},[t._v("menu")])])]),t._v(" "),i("Collapse",[i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSidebar,expression:"isShowSidebar"}],staticClass:"map-info sidebar-collapsable"},[t.canGiveUp?i("div",{staticClass:"d-flex"},[t._v("\n                    "+t._s(t.Ui.getText("giveup"))+"\n                    "),i("i",{staticClass:"icon icon-gold"}),t._v("\n                    "+t._s(t.giveUpCost)+"\n                ")]):i("div",{staticClass:"d-flex"},[t._v(t._s(t.Ui.getText("cannotgiveup")))]),t._v(" "),i("div",{staticClass:"d-flex"},[t._v("\n                    "+t._s(t.Ui.getText("total"))+"\n                    "),i("span",{staticClass:"icon-hex-tile icon-hex-danger",domProps:{innerHTML:t._s(t.hexsvg)}}),t._v(" "),i("span",[t._v(t._s(t.totalDanger))]),t._v(" "),i("span",{staticClass:"icon-hex-tile icon-hex-rare",domProps:{innerHTML:t._s(t.hexsvg)}}),t._v(" "),i("span",[t._v(t._s(t.totalRare))]),t._v(" "),i("span",{staticClass:"icon-hex-tile",domProps:{innerHTML:t._s(t.hexsvg)}}),t._v(" "),i("span",[t._v(t._s(t.totalNormal))])]),t._v(" "),i("div",{staticClass:"d-flex"},[i("i",{staticClass:"icon icon-gacha-point"}),t._v(" "),i("span",[t._v(t._s(t.totalGachaPoint))]),t._v(" "),i("i",{staticClass:"icon icon-battery"}),t._v(" "),i("span",[t._v(t._s(t.totalBattery))]),t._v(" "),i("i",{staticClass:"icon icon-gold"}),t._v(" "),i("span",[t._v(t._s(t.totalGold))]),t._v(" "),i("i",{staticClass:"icon icon-energy"}),t._v(" "),i("span",[t._v(t._s(t.totalEnergy))])])])])],1)])};b._withStripped=!0;var w=i(55),y=i.n(w),S=function(){var t=this.$createElement;return(this._self._c||t)("transition",{on:{enter:this.enter,"after-enter":this.afterEnter,leave:this.leave,"after-leave":this.afterLeave}},[this._t("default")],2)};S._withStripped=!0;var k={methods:{enter(t){t.style.height="auto";let e=window.getComputedStyle(t).height;t.style.height="0px",t.offsetHeight,t.style.height=e},afterEnter(t){t.style.height=null},leave(t){t.style.height=window.getComputedStyle(t).height,t.offsetHeight,t.style.height="0px"},afterLeave(t){t.style.height=null}}},T=(i(68),Object(f.a)(k,S,[],!1,null,null,null));T.options.__file="src/components/Collapse.vue";var I=T.exports,$={props:{isShowSidebar:Boolean,mapName:String,canGiveUp:Boolean,giveUpCost:Number,totalDanger:Number,totalRare:Number,totalNormal:Number,totalGachaPoint:Number,totalBattery:Number,totalGold:Number,totalEnergy:Number},data:function(){return{hexsvg:y.a}},methods:{toggleSidebar:function(){v.$emit("toggle-sidebar")}},components:{Collapse:I}},A=(i(70),Object(f.a)($,b,[],!1,null,"77777d2a",null));A.options.__file="src/components/MapInfo.vue";var E=A.exports,M=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"map-list"},[i("Collapse",[i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSidebar,expression:"isShowSidebar"}],staticClass:"map-list-search p-2 sidebar-collapsable"},[i("div",{staticClass:"input-group"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchNumber,expression:"searchNumber",modifiers:{trim:!0}}],staticClass:"form-control w-50",attrs:{type:"number",min:"0",step:"1",placeholder:t.Ui.getText("searchhexcount")},domProps:{value:t.searchNumber},on:{input:function(e){e.target.composing||(t.searchNumber=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchText,expression:"searchText",modifiers:{trim:!0}}],staticClass:"form-control w-50",attrs:{type:"text",placeholder:t.Ui.getText("searchmapname")},domProps:{value:t.searchText},on:{input:function(e){e.target.composing||(t.searchText=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])])]),t._v(" "),i("Collapse",[i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSidebar,expression:"isShowSidebar"}],staticClass:"map-list-container pl-2 sidebar-collapsable"},[i("ul",{staticClass:"list-unstyled",attrs:{id:"map-list-scroller"}},t._l(t.maplist,function(e){return i("li",{key:e.id},[e.name?i("h5",[i("a",{attrs:{href:"#"+e.id},on:{click:function(t){t.preventDefault(),e.isShow=!e.isShow}}},[t._v(t._s(t.Ui.getText(e.name)))])]):t._e(),t._v(" "),i("Collapse",[e.name?i("ul",{directives:[{name:"show",rawName:"v-show",value:t.isForceShowAllGroup||e.isShow,expression:"isForceShowAllGroup||group.isShow"}],staticClass:"list-unstyled collapsable"},t._l(e.maps,function(e){return i("li",{directives:[{name:"show",rawName:"v-show",value:t.isShow(e),expression:"isShow(map)"}],key:e.id,class:[{active:t.activeMapId==e.id},{"map-list-divider":!t.isForceShowAllGroup&&t.dividerList.indexOf(e.id)>=0}],attrs:{id:"map"+e.id}},[i("a",{attrs:{"data-map-id-string":e.idString,"data-map-id":e.id,href:"#!/map/"+e.id,title:e.count+"|"+e.name}},[i("span",{staticClass:"hex-info-count"},[t._v(t._s(e.count))]),t._v(" "),i("span",[t._v(t._s(e.name))])])])}),0):t._e()])],1)}),0)])])],1)};M._withStripped=!0;var L=i(72),D=i.n(L),N={created:function(){var t=this;v.$on("set-active-map",function(e){t.setActiveMap(e)})},props:{isShowSidebar:Boolean},data:function(){return{searchNumber:"",searchText:"",maplist:r.Data.getAll("maplist"),activeMapId:""}},methods:{isShow:function(t){return!this.searchNumber&&!this.searchText||(!!(this.searchNumber&&String(t.count).indexOf(this.searchNumber)>=0)||!!(this.searchText&&String(t.name).indexOf(this.searchText)>=0))},setActiveMap:function(t){console.log("setActiveMap"),this.searchNumber="",this.searchText="",this.activeMapId=t;var e=0;_.each(this.maplist,function(i,a){var n=i.isShow;i.isShow=!1,_.some(i.maps,function(e){return e.id==t})&&(i.isShow=!0),i.isShow!=n&&(e=300)}),this.$nextTick(function(){window.setTimeout(function(){D.a.scrollTo("#map"+t,{container:"#map-list-scroller"})},e)})}},computed:{dividerList:function(){return[3074294833,3196602394,1795557279,3331758729,1247514767,3859376046,79899309,3787645706,3701656250,3743323759,3799957471]},isForceShowAllGroup:function(){return this.searchNumber||this.searchText}},components:{Collapse:I}},B=(i(73),Object(f.a)(N,M,[],!1,null,"85dd5dcc",null));B.options.__file="src/components/MapList.vue";var U=B.exports,H=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"main"}},[i("div",{staticClass:"hex-table-container"},[i("table",{staticClass:"hex-table"},t._l(t.Yrange,function(e){return i("tr",{key:e},t._l(t.Xrange,function(a){return i("td",{key:a},[t.hex(a,e)?i("Hex",{attrs:{hex:t.hex(a,e),map:t.map}}):t._e()],1)}),0)}),0)]),t._v(" "),i("HexInfo"),t._v(" "),i("HexPopper")],1)};H._withStripped=!0;var q=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:["hex",{"hex-danger":20==t.hex.hexType},{"hex-rare":30==t.hex.hexType}],on:{click:function(e){return t.showHexInfo()}}},[i("div",{staticClass:"hex-tile",domProps:{innerHTML:t._s(t.hexsvg)}}),t._v(" "),i("a",{staticClass:"hex-content",attrs:{"data-toggle":"popover",tabindex:"0"}},[i("div",{staticClass:"d-flex justify-content-center align-items-center"},[120==t.hex.termType?i("i",{staticClass:"material-icons"},[t._v("play_arrow")]):t._e(),t._v(" "),130==t.hex.termType?i("i",{staticClass:"material-icons"},[t._v("flag")]):t._e(),t._v(" "),40==t.hex.hexType?i("i",{staticClass:"material-icons"},[t._v("chat")]):t._e(),t._v(" "),50==t.hex.hexType?i("i",{staticClass:"icon icon-chest"}):t._e(),t._v(" "),60==t.hex.hexType?i("i",{staticClass:"icon icon-2x icon-PowUpEne"}):t._e(),t._v(" "),61==t.hex.hexType?i("i",{staticClass:"icon icon-2x icon-PowUpAct"}):t._e(),t._v(" "),62==t.hex.hexType?i("i",{staticClass:"icon icon-2x icon-PowUpRwd"}):t._e(),t._v(" "),70==t.hex.hexType?i("i",{staticClass:"icon icon-2x icon-PowDwnEne"}):t._e(),t._v(" "),71==t.hex.hexType?i("i",{staticClass:"icon icon-2x icon-PowDwnAct"}):t._e(),t._v(" "),72==t.hex.hexType?i("i",{staticClass:"icon icon-2x icon-PowDwnRwd"}):t._e(),t._v(" "),90==t.hex.hexType?i("i",{staticClass:"icon icon-endless"}):t._e(),t._v(" "),t._l(t.hex.itemHintIndexes,function(t){return i("i",{key:t,class:["icon","icon-key","icon-key-01-"+"00".substring(0,2-String(t+1).length)+String(t+1)]})}),t._v(" "),t.requireMapItems.length?i("i",{staticClass:"material-icons"},[t._v("lock_outline")]):t._e()],2),t._v(" "),i("div",{staticClass:"d-flex justify-content-center align-items-center"},[t._l(t.rewards,function(e){return i("div",{key:e.id,staticClass:"d-inline-flex"},[50==t.hex.hexType&&"ticket_010_01"==e.id?i("div",{staticClass:"d-inline-flex"},[i("i",{staticClass:"icon icon-battery"}),t._v("\n                    "+t._s(e.count)+"\n                ")]):t._e(),t._v(" "),50==t.hex.hexType&&"gold"==e.id?i("div",{staticClass:"d-inline-flex"},[i("i",{staticClass:"icon icon-gold"}),t._v("\n                    "+t._s(e.count)+"\n                ")]):t._e(),t._v(" "),50==t.hex.hexType&&"energy"==e.id?i("div",{staticClass:"d-inline-flex"},[i("i",{staticClass:"icon icon-energy"}),t._v("\n                    "+t._s(e.count)+"\n                ")]):t._e(),t._v(" "),"gacha_point"==e.id?i("div",{staticClass:"d-inline-flex"},[i("i",{staticClass:"icon icon-gacha-point"}),t._v("\n                    "+t._s(e.count)+"\n                ")]):t._e()])}),t._v(" "),t._l(t.requireMapItems,function(e){return i("div",{key:e.index,staticClass:"d-inline-flex"},[i("i",{class:["icon","icon-key","icon-key-01-"+"00".substring(0,2-String(e.index+1).length)+String(e.index+1)]}),t._v("\n                "+t._s(e.count)+"\n            ")])})],2),t._v(" "),t.areaCount>0?i("div",{staticClass:"hex-area-count"},[t._v(t._s(t.areaCount))]):t._e()])])};q._withStripped=!0;var P={props:{hex:Object,map:Object},data:function(){return{hexsvg:y.a}},mounted:function(){var t=this,e=t.$el.getElementsByClassName("hex-content")[0];e.addEventListener("mouseenter",function(){v.$emit("show-popover",e,t.hex,t.map)}),e.addEventListener("mouseleave",function(){v.$emit("hide-popover")})},methods:{showHexInfo:function(){v.$emit("show-hex-info",this.hex,this.map)}},computed:{zakoAttr:function(){return r.Data.get("attrset",this.hex.zakoAttr)||{}},bossAttr:function(){return r.Data.get("attrset",this.hex.bossAttr)||{}},stage:function(){return r.Data.get("stage",this.hex.questId)||{}},rewards:function(){var t=[];return _.each(this.hex.rewards,function(e,i){e.id&&t.push(_.extend(e,r.Data.get("items",e.id)))}),t},areaCount:function(){return(this.stage.areaList||[]).length},requireMapItems:function(){var t=[];return _.each(this.hex.requireMapItems,function(e,i){e&&t.push({index:i,count:e})}),t}}},O=(i(75),i(77),Object(f.a)(P,q,[],!1,null,"2f39b39b",null));O.options.__file="src/components/Hex.vue";var R=O.exports,j=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"fade"}},[t.hex.id&&t.isShow?i("div",{staticClass:"hex-info",attrs:{"data-id":t.hex.id},on:{click:t.hide}},[i("ul",{staticClass:"list-group list-group-flush"},[i("li",{staticClass:"list-group-item"},[i("div",[i("span",[t._v(t._s(t.hex.name))]),t._v(" "),t.hex.recomLv>0?i("span",{staticClass:"font-weight-light pl-3",staticStyle:{color:"#fffb"}},[t._v(t._s(t.Ui.getText("recomLv")+t.hex.recomLv))]):t._e()])]),t._v(" "),t.hex.questId?i("li",{staticClass:"list-group-item",staticStyle:{"white-space":"nowrap",overflow:"auto"}},t._l(t.stage.areaList,function(e,a){return i("div",{key:e.id,staticClass:"area-container"},[i("div",{staticClass:"stage-container",on:{click:function(i){return i.stopPropagation(),t.toggleExtraInfo("Area_"+e.id)}}},[i("div",{staticClass:"stage-label"},[t._v("\n                            AREA\n                            "+t._s(a+1)+"\n                        ")]),t._v(" "),i("div",{staticClass:"parallelogram"},[i("img",{attrs:{src:"../img/quest/"+(e.icon||"stg2_999_01")+".png"}}),t._v(" "),i("div",{class:["attr-subscript","attr-"+t.convertAttr2nd(t.zakoAttr.weakAttr||e.weakAttr)]})]),t._v(" "),i("transition",{attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.currentExtraInfoID=="Area_"+e.id,expression:"currentExtraInfoID=='Area_'+area.id"}],staticClass:"stage-enemy-list"},t._l(t.enemys(e),function(e,a){return i("div",{key:e.id,staticClass:"stage-label",style:{"margin-left":.25*(a+1)+"rem"}},[i("span",[t._v(t._s(e.name))])])}),0)])],1),t._v(" "),t._l(t.enemysWithIcon(e),function(e,a){return i("div",{key:e.id,staticClass:"stage-container enemy",on:{click:function(i){return i.stopPropagation(),t.toggleExtraInfo("Enemy_"+e.id)}}},[i("div",{staticClass:"parallelogram"},[i("img",{attrs:{src:"../img/quest/"+(e.icon||"ene2_800_01")+".png"}}),t._v(" "),i("div",{class:["attr-subscript","attr-"+t.convertAttr2nd(e.type>10?t.bossAttr.weakAttr||e.weakAttr:255)]}),t._v(" "),e.count>1?i("span",{staticClass:"enemy-count"},[t._v(t._s(e.count))]):t._e()]),t._v(" "),i("div",{class:["stage-label",{"stage-label-odd":a%2!=0}]},[t._v(t._s(e.name))]),t._v(" "),i("transition",{attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.currentExtraInfoID=="Enemy_"+e.id,expression:"currentExtraInfoID=='Enemy_'+enemy.id"}],class:["boss-hp-bar","stage-label",{"stage-label-odd":a%2==0}]},[i("div",[t._v("LV."+t._s(e.lv))]),t._v(" "),i("div",{staticClass:"progress"},[i("div",{staticClass:"progress-bar bg-warning",staticStyle:{width:"100%"},attrs:{role:"progressbar"}},[t._v(t._s(t.calcRising(e.lv,e.hp[0],e.hp[1])))])]),t._v(" "),i("div",{staticStyle:{"line-height":"0"}},t._l(t.countHpExtra(t.calcRising(e.lv,e.hp[0],e.hp[1])),function(t){return i("span",{key:t,staticClass:"boss-hp-bar-extra bg-warning"})}),0),t._v(" "),i("div",{staticStyle:{position:"relative"}},[i("span",[t._v("ATK "+t._s(t.calcRising(e.lv,e.attack[0],e.attack[1])))]),t._v(" "),i("span",{class:["attr-text","attr-"+t.convertAttr2nd(t.bossAttr.attribute2nd||e.attribute2nd)]},[t._v(t._s(t.calcRising(e.lv,e.attrAttack[0],e.attrAttack[1])))]),t._v(" "),i("span",{staticStyle:{position:"absolute",right:"0"}},[t._v("DEF "+t._s(t.calcRising(e.lv,e.defence[0],e.defence[1])))])])])])],1)})],2)}),0):t._e(),t._v(" "),t.hex.canGiveUp&&t.hex.giveUpCost>0?i("li",{staticClass:"list-group-item"},[i("div",{staticClass:"item-container"},[i("span",{attrs:{"data-lang":"subcontract"}},[t._v(t._s(t.Ui.getText("subcontract")))]),t._v(" "),i("i",{staticClass:"icon icon-gold"}),t._v(" "),i("span",[t._v(t._s(t.hex.giveUpCost))])])]):t._e(),t._v(" "),t.hex.lockBuffs&&t.hex.lockBuffs.length?i("li",{staticClass:"list-group-item"},t._l(t.lockBuffs,function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:"../img/quest/"+e.icon+".png"}}),t._v(" "),i("span",{staticClass:"item-count"},[t._v(t._s(e.value))])])}),0):t._e(),t._v(" "),t.hex.unlockBuffs&&t.hex.unlockBuffs.length?i("li",{staticClass:"list-group-item"},t._l(t.unlockBuffs,function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:"../img/quest/"+e.icon+".png"}}),t._v(" "),i("span",{staticClass:"item-count"},[t._v(t._s(e.value))])])}),0):t._e(),t._v(" "),t.hex.clearBuffs&&t.hex.clearBuffs.length?i("li",{staticClass:"list-group-item"},t._l(t.clearBuffs,function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:"../img/quest/"+e.icon+".png"}}),t._v(" "),i("span",{staticClass:"item-count"},[t._v(t._s(e.value))])])}),0):t._e(),t._v(" "),t.requireMapItems.length?i("li",{staticClass:"list-group-item"},[i("i",{staticClass:"material-icons",staticStyle:{margin:"0.75rem 0"}},[t._v("lock_outline")]),t._v(" "),t._l(t.requireMapItems,function(e){return i("div",{key:e.index,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:"../img/item/"+(t.map.itemList[e.index].icon||"itm2_04_000_01")+".png",title:t.map.itemList[e.index].name}}),t._v(" "),e.count>1?i("span",{staticClass:"item-count"},[t._v(t._s(e.count))]):t._e()])})],2):t._e(),t._v(" "),t.hex.itemHintIndexes&&t.hex.itemHintIndexes.length?i("li",{staticClass:"list-group-item"},[i("i",{staticClass:"material-icons",staticStyle:{margin:"0.75rem 0"}},[t._v("vpn_key")]),t._v(" "),t._l(t.hex.itemHintIndexes,function(e){return i("div",{key:e,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:"../img/item/"+(t.map.itemList[e].icon||"itm2_04_000_01")+".png",title:t.map.itemList[e].name}})])})],2):t._e(),t._v(" "),i("li",{staticClass:"list-group-item"},t._l(t.rewards,function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:t.rewardIconSrc(e.icon),title:e.name}}),t._v(" "),e.count>1?i("span",{staticClass:"item-count"},[t._v(t._s(e.count))]):t._e()])}),0)])]):t._e()])};j._withStripped=!0;var G={data:function(){return{isShow:!1,hex:{},map:{},currentExtraInfoID:""}},created:function(){var t=this;v.$on("show-hex-info",function(e,i){v.$emit("disable-popover"),t.hex=e,t.map=i,t.isShow=!0})},computed:{zakoAttr:function(){return r.Data.get("attrset",this.hex.zakoAttr)||{}},bossAttr:function(){return r.Data.get("attrset",this.hex.bossAttr)||{}},stage:function(){return r.Data.get("stage",this.hex.questId)||{}},lockBuffs:function(){return _.map(this.hex.lockBuffs||[],function(t){return r.Data.get("buff",t)})},unlockBuffs:function(){return _.map(this.hex.unlockBuffs||[],function(t){return r.Data.get("buff",t)})},clearBuffs:function(){return _.map(this.hex.clearBuffs||[],function(t){return r.Data.get("buff",t)})},rewards:function(){return _.map(this.hex.rewards||[],function(t){return _.extend(t,r.Data.get("items",t.id))})},requireMapItems:function(){var t=[];return _.each(this.hex.requireMapItems||[],function(e,i){e&&t.push({index:i,count:e})}),t}},methods:{hide:function(){window.getSelection().toString().length||(this.isShow=!1,this.currentExtraInfoID="",v.$emit("enable-popover"))},convertAttr2nd:function(t){return r.Data.convertAttr2nd(t)},enemys:function(t){return _.map(t.enemyList,function(t,e){return r.Data.get("enemy",e)})},enemysWithIcon:function(t){var e=this;return _.chain(t.enemyList).map(function(i,a){var n=r.Data.get("enemybase",a);n&&e.bossAttr.weakAttr&&4!=e.bossAttr.weakAttr&&255!=e.bossAttr.weakAttr&&(a=n.frontierChangeEnemyIds[e.bossAttr.attribute2nd-5]);var s=r.Data.get("enemy",a);return s&&s.icon&&s.type>=10?(s.count=i,s.lv=Math.max(1,s.type>10?t.bossLevel+e.hex.bossLevelOffset:t.zakoLevel+e.hex.zakoLevelOffset),s):null}).compact().value()},toggleExtraInfo:function(t){window.getSelection().toString().length||(this.currentExtraInfoID==t?this.currentExtraInfoID="":this.currentExtraInfoID=t)},rewardIconSrc:function(t){return 0==t.indexOf("chr4")?"../img/chara/"+t+".png":"../img/item/"+(t||"itm2_04_000_01")+".png"},calcRising:function(t,e,i){return Math.round(e+t*i)},countHpExtra:function(t){for(var e=5e4,i=5e4,a=0;i<t;)i+=e+=5e4,a++;return Math.min(11,a)}}},F=(i(79),Object(f.a)(G,j,[],!1,null,"02493be9",null));F.options.__file="src/components/HexInfo.vue";var X=F.exports,z=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.isEnable?i("transition",{attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"popover hex-popper bs-popover-auto",staticStyle:{"max-width":"none"}},[i("div",{staticClass:"arrow"}),t._v(" "),i("h3",{staticClass:"popover-header"},[i("span",[t._v(t._s(t.hex.name))]),t._v(" "),t.hex.recomLv>0?i("span",{staticClass:"font-weight-light float-right pl-3"},[t._v(t._s(t.Ui.getText("recomLv")+t.hex.recomLv))]):t._e()]),t._v(" "),i("div",{staticClass:"popover-body p-0 pb-1"},[i("ul",{staticClass:"list-group list-group-flush"},[t.hex.canGiveUp&&t.hex.giveUpCost>0?i("li",{staticClass:"list-group-item p-1"},[i("div",{staticClass:"item-container"},[i("span",{attrs:{"data-lang":"subcontract"}},[t._v(t._s(t.Ui.getText("subcontract")))]),t._v(" "),i("i",{staticClass:"icon icon-gold"}),t._v("\n                        "+t._s(t.hex.giveUpCost)+"\n                    ")])]):t._e(),t._v(" "),t.hex.lockBuffs&&t.hex.lockBuffs.length>0?i("li",{staticClass:"list-group-item p-1"},t._l(t.lockBuffs,function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:"../img/quest/"+e.icon+".png"}}),t._v(" "),i("span",{staticClass:"item-count"},[t._v(t._s(e.value))])])}),0):t._e(),t._v(" "),t.hex.unlockBuffs&&t.hex.unlockBuffs.length?i("li",{staticClass:"list-group-item p-1"},t._l(t.unlockBuffs,function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:"../img/quest/"+e.icon+".png"}}),t._v(" "),i("span",{staticClass:"item-count"},[t._v(t._s(e.value))])])}),0):t._e(),t._v(" "),t.hex.clearBuffs&&t.hex.clearBuffs.length?i("li",{staticClass:"list-group-item p-1"},t._l(t.clearBuffs,function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:"../img/quest/"+e.icon+".png"}}),t._v(" "),i("span",{staticClass:"item-count"},[t._v(t._s(e.value))])])}),0):t._e(),t._v(" "),t.requireMapItems.length?i("li",{staticClass:"list-group-item p-1"},[i("i",{staticClass:"material-icons",staticStyle:{margin:"0.75rem 0"}},[t._v("lock_outline")]),t._v(" "),t._l(t.requireMapItems,function(e){return i("div",{key:e.index,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:"../img/item/"+(t.map.itemList[e.index].icon||"itm2_04_000_01")+".png",title:t.map.itemList[e.index].name}}),t._v(" "),e.count>1?i("span",{staticClass:"item-count"},[t._v(t._s(e.count))]):t._e()])})],2):t._e(),t._v(" "),t.hex.itemHintIndexes&&t.hex.itemHintIndexes.length?i("li",{staticClass:"list-group-item p-1"},[i("i",{staticClass:"material-icons",staticStyle:{margin:"0.75rem 0"}},[t._v("vpn_key")]),t._v(" "),t._l(t.hex.itemHintIndexes,function(e){return i("div",{key:e,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:"../img/item/"+(t.map.itemList[e].icon||"itm2_04_000_01")+".png",title:t.map.itemList[e].name}})])})],2):t._e(),t._v(" "),t.hex.rewards&&t.hex.rewards.length?i("li",{staticClass:"list-group-item p-1"},t._l(t.rewards,function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("img",{staticClass:"icon icon-item",attrs:{src:t.rewardIconSrc(e.icon),title:e.name}}),t._v(" "),e.count>1?i("span",{staticClass:"item-count"},[t._v(t._s(e.count))]):t._e()])}),0):t._e()])])])]):t._e()};z._withStripped=!0;var W=i(18),Y={data:function(){return{isEnable:!0,isShow:!1,hex:{},map:{}}},mounted:function(){var t=this;v.$on("show-popover",function(e,i,a){t.isShow=!0,t.hex=i,t.map=a,t.$nextTick(function(){new W.default(e,t.$el,{placement:"auto",arrow:{element:t.$el.getElementsByClassName("arrow")[0]},boundariesElement:document.getElementById("main")})})}),v.$on("hide-popover",function(){t.isShow=!1}),v.$on("enable-popover",function(){t.isEnable=!0}),v.$on("disable-popover",function(){t.isEnable=!1})},computed:{lockBuffs:function(){return _.map(this.hex.lockBuffs||[],function(t){return r.Data.get("buff",t)})},unlockBuffs:function(){return _.map(this.hex.unlockBuffs||[],function(t){return r.Data.get("buff",t)})},clearBuffs:function(){return _.map(this.hex.clearBuffs||[],function(t){return r.Data.get("buff",t)})},rewards:function(){return _.map(this.hex.rewards||[],function(t){return _.extend(t,r.Data.get("items",t.id))})},requireMapItems:function(){var t=[];return _.each(this.hex.requireMapItems||[],function(e,i){e&&t.push({index:i,count:e})}),t}},methods:{rewardIconSrc:function(t){return 0==t.indexOf("chr4")?"../img/chara/"+t+".png":"../img/item/"+(t||"itm2_04_000_01")+".png"}}},V=(i(81),Object(f.a)(Y,z,[],!1,null,"78649ca7",null));V.options.__file="src/components/HexPopper.vue";var J=V.exports,K={},Q={props:{map:Object},mounted:function(t){console.log("map mounted");var e=this;this.$nextTick(function(){!function(t){var i=function(t){var e=t.target,i=(parseFloat(e.getAttribute("data-x"))||0)+t.dx,a=(parseFloat(e.getAttribute("data-y"))||0)+t.dy;e.style.webkitTransform=e.style.transform="translate("+i+"px, "+a+"px)",e.setAttribute("data-x",i),e.setAttribute("data-y",a)},a=1,n=e.$el.children[0],s=e.$el.children[0].children[0];K=p()(n).gesturable({inertia:!0,restrict:e.getRestrict(),onstart:function(t){},onmove:function(t){(a*=1+t.ds)<.4&&(a=.4),a>2&&(a=2),s.style.webkitTransform=s.style.transform="scale3d("+a+","+a+",1)",i(t)},onend:function(t){}}).draggable({inertia:!0,restrict:e.getRestrict(),autoScroll:!0,onmove:i}).on("doubletap dblclick",function(t){s.style.webkitTransform=s.style.transform="",t.preventDefault()}),n.addEventListener("wheel",function(t){(a*=1-t.deltaY/1e3)<.6&&(a=.6),a>1&&(a=1),s.style.webkitTransform=s.style.transform="scale("+a+","+a+")"}),console.log("map interact inited")}(),this.moveToStart()})},updated:function(){this.$nextTick(function(){K.gesturable({restrict:this.getRestrict()}).draggable({restrict:this.getRestrict()}),this.moveToStart()})},methods:{hex:function(t,e){return _.find(this.map.hexList,function(i){return i.x==t&&i.y==e})},moveToStart:function(){var t=this,e=_.find(t.map.hexList,function(t){return 120==t.termType}),i=(t.$el.clientWidth,t.$el.children[0].clientWidth,t.$el.clientHeight,t.$el.children[0].clientHeight,parseInt(getComputedStyle(t.$el.children[0].children[0]).padding)),a=t.$el.querySelector("div.hex").parentNode,n=a.clientWidth,s=a.clientHeight,r=t.$el.clientWidth/2-((e.x-t.realMinX)*n+i+n/2),o=t.$el.clientHeight/2-((e.y-t.minY)*s+i+s/2+(e.x-t.minX+1)%2*s/2);console.log(e.x,t.minX,t.realMinX),console.log(r,o),t.$el.children[0].style.webkitTransform=t.$el.children[0].style.transform="translate("+r+"px, "+o+"px)",t.$el.children[0].setAttribute("data-x",r),t.$el.children[0].setAttribute("data-y",o)},getRestrict:function(){this.$el.children[0],this.$el.children[0].children[0];var t=this.$el.children[0].clientWidth,e=this.$el.children[0].clientHeight,i=this.$el.clientWidth,a=this.$el.clientHeight;return{restriction:"parent",endOnly:!0,elementRect:{top:Math.max((e-a)/e,0),left:Math.max((t-i)/t,0),bottom:Math.min(a/e,1),right:Math.min(i/t,1)}}}},computed:{realMinX:function(){return _.minBy(this.map.hexList,function(t){return t.x}).x},minX:function(){var t=this.realMinX;return t%2==1&&(t-=1),t},minY:function(){return _.minBy(this.map.hexList,function(t){return t.y}).y},maxX:function(){return _.maxBy(this.map.hexList,function(t){return t.x}).x},maxY:function(){return _.maxBy(this.map.hexList,function(t){return t.y}).y},Xrange:function(){return _.range(this.minX,this.maxX+1)},Yrange:function(){return _.range(this.minY,this.maxY+1)}},components:{Hex:R,HexInfo:X,HexPopper:J}},Z=(i(83),Object(f.a)(Q,H,[],!1,null,"3074bd5c",null));Z.options.__file="src/components/Map.vue";var tt={data:function(){return{isShowSidebar:!0,map:{id:"",hexList:[]}}},created:function(){var t=this;v.$on("render",function(e){v.$emit("set-active-map",e),t.map=_.extend({},t.map,r.Data.get("maptable",e))}),v.$on("toggle-sidebar",function(e){t.isShowSidebar="boolean"==typeof e?e:!t.isShowSidebar})},computed:{mapName:function(){return this.map.name?this.map.hexList.length+"|"+this.map.name:""},total:function(){var t={danger:0,rare:0,normal:0,gachaPoint:0,battery:0,gold:0,energy:0};return _.each(this.map.hexList,function(e,i){switch(e.hexType){case 10:t.normal++;break;case 20:t.danger++;break;case 30:t.rare++}_.each(e.rewards,function(e,i){"ticket_010_01"==e.id?t.battery+=e.count:"gacha_point"==e.id?t.gachaPoint+=e.count:"gold"==e.id?t.gold+=e.count:"energy"==e.id&&(t.energy+=e.count)})}),t}},components:{MapInfo:E,MapList:U,Map:Z.exports}},et=(i(85),Object(f.a)(tt,C,[],!1,null,"c2242486",null));et.options.__file="src/components/Frontier.vue";var it={components:{Nav:x,Frontier:et.exports}},at=Object(f.a)(it,d,[],!1,null,null,null);at.options.__file="src/App.vue";var nt,st=at.exports;i.d(e,"init",function(){return rt});var rt=function(t){c.a.start(),ot(),c.a.set(.3),ct(),c.a.set(.6),lt(t),c.a.done()},ot=function(){},ct=function(){var t;nt||(new l.a({el:"#app",render:function(t){return t("App")},components:{App:st}}),n()(window).resize(function(){clearTimeout(t),t=setTimeout(void 0,500)}),nt=!0)},lt=function(t){console.log("render",t);t&&(v.$emit("render",t),l.a.nextTick(function(){n()(".sidebar-toggle").is(":visible")&&v.$emit("toggle-sidebar",!1)}))};e.default={init:rt}}}]);