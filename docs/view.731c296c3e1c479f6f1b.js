webpackJsonp([2],{31:function(n,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),t.d(a,"init",function(){return x});var e=t(0),i=t.n(e),s=t(4),r=t.n(s),c=t(9),o=t.n(c),l=t(3),d=t(1),p=t(8),_=t.n(p),v=t(7),u=t(32),g=t.n(u),m=t(33),h=t.n(m);v.a.library.add(g.a);var f,x=function(n){_.a.start(),b(),_.a.set(.3),y(),_.a.set(.6),w(n),_.a.done()},b=function(){i()("#main").find("img").attr("src",""),i()("#main").empty()},y=function(){f||(i()("#version").text(d.default.getVersion()),i()(".selectpicker").change(function(n){i()(".navbar-collapse").collapse("hide"),o.a.redirect("/map/"+i()(this).val())}),f=!0)},w=function(n){console.log("render",n);if(n){!function(n){n,i()("nav.navbar .active").removeClass("active"),i()("nav.navbar [data-map-id="+n+"]").parents("li").addClass("active")}(n);var a=d.default.get("maptable",n),t=i()("<div>").addClass("mapinfo-container").addClass("p-1");t.append("<div>"+a.hexList.length+"|"+a.name),a.canGiveUp?t.append("<div>"+l.a.getText("giveup")+'<i class="icon icon-gold"></i>'+a.giveUpCost):t.append("<div>"+l.a.getText("cannotgiveup")),i()("#main").append(t);var e=r.a.minBy(a.hexList,function(n){return n.x}).x,s=r.a.maxBy(a.hexList,function(n){return n.x}).x,c=r.a.minBy(a.hexList,function(n){return n.y}).y,o=r.a.maxBy(a.hexList,function(n){return n.y}).y;e%2==1&&(e-=1);var p=i()("<table>");p.addClass("hex-table");for(let n=0;n<o-c+1;n++){var _=i()("<tr>");for(let n=0;n<s-e+1;n++){var v=i()("<td>");_.append(v)}p.append(_)}var u=0,g=0,m=0,f=0,x=0;i.a.each(a.hexList,function(n,t){var s=t.x-e,o=t.y-c,l=p.find("tr:eq("+o+") td:eq("+s+")"),_=i()("<div>").addClass("hex");t.zakoAttr=d.default.get("attrset",t.zakoAttr)||{},t.bossAttr=d.default.get("attrset",t.bossAttr)||{};var v=i()("<a>").addClass("hex-content").data("hex",t).attr("data-toggle","popover").attr("tabindex",0);switch(t.hexType){case 10:x++,v.data("subcontract",1e3*a.subcontractRatio);break;case 20:_.addClass("hex-danger"),f++,v.data("subcontract",3e3*a.subcontractRatio);break;case 30:_.addClass("hex-rare"),m++,v.data("subcontract",2e3*a.subcontractRatio);break;case 40:v.append('<div><i class="fas fa-comment-alt"></i></div>');break;case 50:v.append('<div><i class="icon icon-chest"></i></div>'),r.a.each(t.rewards,function(n,a){var t=n;t.id&&(t=r.a.extend(t,d.default.get("items",n.id))),"ticket_010_01"==t.id?v.append('<div><i class="icon icon-battery" />'+n.count):"gacha_point"==t.id?v.append('<div><i class="icon icon-gacha-point" />'+n.count):"gold"==t.id?v.append('<div><i class="icon icon-gold" />'+n.count):"energy"==t.id&&v.append('<div><i class="icon icon-energy" />'+n.count)});break;case 60:v.append('<div><i class="icon icon-2x icon-PowUpEne" />');break;case 61:v.append('<div><i class="icon icon-2x icon-PowUpAct" />');break;case 62:v.append('<div><i class="icon icon-2x icon-PowUpRwd" />');break;case 70:v.append('<div><i class="icon icon-2x icon-PowDwnEne" />');break;case 71:v.append('<div><i class="icon icon-2x icon-PowDwnAct" />');break;case 72:v.append('<div><i class="icon icon-2x icon-PowDwnRwd" />')}switch(t.termType){case 120:v.prepend('<div style="font-size: 1.5rem;">►');break;case 130:v.prepend('<div style="font-size: 1.5rem;">✓')}r.a.each(t.rewards,function(n,a){var t=n;"ticket_010_01"==t.id?g+=n.count:"gacha_point"==t.id&&(u+=n.count)});var h=i()('<div class="hex-tile">').append('<div class="hex-tile-inner left">').append('<div class="hex-tile-inner right">');_.append(h).append(v),l.append(_)}),t.append("<div>"+l.a.getText("total")+'<i class="icon icon-hex icon-hex-danger"></i>'+f+'<i class="icon icon-hex icon-hex-rare"></i>'+m+'<i class="icon icon-hex"></i>'+x+'|<i class="icon icon-gacha-point"></i>'+u+'<i class="icon icon-battery"></i>'+g),i()("#main").append(p),i()('[data-toggle="popover"]').popover({html:!0,trigger:"hover",delay:100,placement:"auto",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body px-0 py-1"></div></div>',title:function(){var n=i()(this).data("hex"),a=i()("<div>").append(i()("<span>").text(n.name));return n.recomLv>0&&a.append(i()('<span class="font-weight-light float-right pl-3">').text(l.a.getText("recomLv")+n.recomLv)),a},content:function(){var n=i()(this),a=n.data("hex"),t=i()('<ul class="list-group list-group-flush">'),e=n.data("subcontract")||0;if(e>0){var s=i()('<li class="list-group-item p-1">');s.append('<div class="item-container"><span data-lang="subcontract">'+l.a.getText("subcontract")+'</span><i class="icon icon-gold"></i>'+e+"</div>"),t.append(s)}var c=i()('<li class="list-group-item p-1">');return r.a.each(a.rewards,function(n,a){var t=n;t.id&&(t=r.a.extend(t,d.default.get("items",n.id))),c.append('<div class="item-container"><img src="img/item/'+(t.icon||"itm2_04_000_01")+'.png" class="icon icon-item" />'+(t.count>1?'<span class="item-count">'+t.count+"<span>":"")+"</div>")}),r.a.some(a.rewards)&&t.append(c),t}}),i()(".hex").click(function(){var n=i()(this).find(".hex-content"),a=n.data("hex"),t=n.data("subcontract")||0,e=h()({hex:a,subcontract:t,Ui:l.a,Data:d.default}),s=i()(e);s.click(function(){window.getSelection().toString().length||i()(this).fadeOut(500,function(){i()(this).remove(),i()("body").removeClass("no-scroll"),i()('[data-toggle="popover"]').popover("enable")})}),s.find(".stage-container").click(function(n){var a=i()(this).find(".stage-enemy-list");a.is(":visible")?a.fadeOut(500):(i()(this).parent().find(".stage-enemy-list").fadeOut(500),a.fadeIn(500)),n.stopPropagation()}),s.hide(),i()("body").addClass("no-scroll"),n.popover("disable"),i()("#main").append(s),s.fadeIn(500)}),setTimeout(function(){},100)}};a.default={init:x}},32:function(n,a){n.exports={prefix:"fas",iconName:"comment-alt",icon:[576,512,[],"f27a","M576 240c0 115-129 208-288 208-48.3 0-93.9-8.6-133.9-23.8-40.3 31.2-89.8 50.3-142.4 55.7-5.2.6-10.2-2.8-11.5-7.7-1.3-5 2.7-8.1 6.6-11.8 19.3-18.4 42.7-32.8 51.9-94.6C21.9 330.9 0 287.3 0 240 0 125.1 129 32 288 32s288 93.1 288 208zm-416-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm128 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm128 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"]}},33:function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,"")}with(obj){if(__p+='<div class="hex-detail" data-id="'+(null==(__t=hex.id)?"":__t)+'">\r\n    <ul class="list-group list-group-flush">\r\n        <li class="list-group-item">\r\n            <div>\r\n                <span>\r\n                    '+(null==(__t=hex.name)?"":__t)+"\r\n                </span>\r\n                ",hex.recomLv>0&&(__p+='\r\n                    <span class="font-weight-light pl-3" style="color:#fffb">\r\n                        '+(null==(__t=Ui.getText("recomLv")+hex.recomLv)?"":__t)+"\r\n                            "),__p+="\r\n                    </span>\r\n            </div>\r\n        </li>\r\n        ",hex.questId){var stage=Data.get("stage",hex.questId);__p+='\r\n            <li class="list-group-item" style="white-space: nowrap;overflow: auto;">\r\n                ',_.each(stage.areaList,function(n,a){__p+='\r\n                    <div class="stage-container">\r\n                        <div class="stage-label">AREA\r\n                            '+(null==(__t=a+1)?"":__t)+'\r\n                        </div>\r\n                        <div class="parallelogram">\r\n                            <img src=\'img/quest/'+(null==(__t=(n.icon||"stg2_999_01")+".png")?"":__t)+"' />\r\n                            <div class=\"attr-subscript attr-"+(null==(__t=Data.convertAttr2nd(hex.zakoAttr.weakAttr))?"":__t)+'"></div>\r\n                        </div>\r\n                        <div class="stage-enemy-list">\r\n                            ',_.each(n.enemyList,function(n,a){var t=Data.get("enemy",n);__p+='\r\n                                <div class="stage-label ml-1">\r\n                                    <span>\r\n                                        '+(null==(__t=t.name)?"":__t)+"\r\n                                    </span>\r\n                                    "}),__p+="\r\n                                        ";for(var t=0;t<n.enemyList.length;t++)__p+="\r\n                                </div>\r\n                                ";__p+="\r\n                        </div>\r\n                    </div>\r\n                    ";var e=1;_.each(n.enemyList,function(n,a){var t=Data.get("enemy",n);t&&t.icon&&t.type>=10&&(__p+='\r\n                        <div class="stage-container enemy" data-id="'+(null==(__t=n)?"":__t)+'">\r\n                            <div class="parallelogram">\r\n                                <img src=\'img/quest/'+(null==(__t=(t.icon||"ene2_800_01")+".png")?"":__t)+"' />\r\n                                <div class=\"attr-subscript attr-"+(null==(__t=Data.convertAttr2nd(t.type>10?hex.bossAttr.weakAttr:255))?"":__t)+'"></div>\r\n                            </div>\r\n                            <div class="stage-label '+(null==(__t=e%2==0?"stage-label-odd":"")?"":__t)+'">\r\n                                '+(null==(__t=t.name)?"":__t)+"\r\n                            </div>\r\n                        </div>\r\n                        ",e++)})}),__p+="\r\n            </li>\r\n            "}__p+="\r\n                ",subcontract>0&&(__p+='\r\n                    <li class="list-group-item">\r\n                        <div class="item-container">\r\n                            <span data-lang="subcontract">\r\n                                '+(null==(__t=Ui.getText("subcontract"))?"":__t)+'\r\n                            </span>\r\n                            <i class="icon icon-gold"></i>\r\n                            <span>\r\n                                '+(null==(__t=subcontract)?"":__t)+"\r\n                            </span>\r\n                        </div>\r\n                    </li>\r\n                    "),__p+="\r\n                        ",hex.questId&&(__p+='\r\n                            <li class="list-group-item">\r\n                                ',_.each(hex.rewards,function(n,a){n.id&&(n=_.extend(n,Data.get("items",n.id))),__p+='\r\n                                    <div class="item-container">\r\n                                        <img src=\'img/item/'+(null==(__t=(n.icon||"itm2_04_000_01")+".png")?"":__t)+'\' class="icon icon-item" />\r\n                                        ',n.count>1&&(__p+='\r\n                                            <span class="item-count">\r\n                                                '+(null==(__t=n.count)?"":__t)+"\r\n                                                    <span>\r\n                                                        "),__p+="\r\n                                    </div>\r\n                                    "}),__p+="\r\n                            </li>\r\n                            "),__p+="\r\n    </ul>\r\n</div>"}return __p}}});