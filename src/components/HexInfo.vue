<template>
    <transition name="fade">
        <div class="hex-info" v-bind:data-id="hex.id" v-if="hex.id&&isShow" @click="hide">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div>
                        <span>{{hex.name}}</span>
                        <span
                            v-if="hex.recomLv>0"
                            class="font-weight-light pl-3"
                            style="color:#fffb"
                        >{{Ui.getText('recomLv') + hex.recomLv}}</span>
                    </div>
                </li>
                <li
                    class="list-group-item"
                    style="white-space: nowrap;overflow: auto;"
                    v-if="hex.questId"
                >
                    <div
                        class="area-container"
                        v-for="(area,i) in stage.areaList"
                        v-bind:key="area.id"
                    >
                        <div class="stage-container" @click.stop="toggleExtraInfo('Area_'+area.id)">
                            <div class="stage-label">
                                AREA
                                {{i+1}}
                            </div>
                            <div class="parallelogram">
                                <img
                                    v-bind:src="'../img/quest/'+(area.icon || 'stg2_999_01') + '.png'"
                                >
                                <div
                                    v-bind:class="['attr-subscript','attr-'+ convertAttr2nd(zakoAttr.weakAttr||area.weakAttr)]"
                                ></div>
                            </div>
                            <transition name="fade">
                                <div
                                    class="stage-enemy-list"
                                    v-show="currentExtraInfoID=='Area_'+area.id"
                                >
                                    <div
                                        class="stage-label"
                                        v-bind:style="{'margin-left':(i+1)*0.25+'rem'}"
                                        v-for="(enemy,i) in enemys(area)"
                                        v-bind:key="enemy.id"
                                    >
                                        <span>{{enemy.name}}</span>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div
                            class="stage-container enemy"
                            v-for="(enemy,index) in enemysWithIcon(area)"
                            v-bind:key="enemy.id"
                            @click.stop="toggleExtraInfo('Enemy_'+enemy.id)"
                        >
                            <div class="parallelogram">
                                <img
                                    v-bind:src="'../img/quest/'+(enemy.icon || 'ene2_800_01') + '.png'"
                                >
                                <div
                                    v-bind:class="['attr-subscript','attr-'+ convertAttr2nd(enemy.type > 10?bossAttr.weakAttr||enemy.weakAttr:255)]"
                                ></div>
                                <span class="enemy-count" v-if="enemy.count>1">{{enemy.count}}</span>
                            </div>
                            <div
                                v-bind:class="['stage-label',{'stage-label-odd':index%2!=0}]"
                            >{{enemy.name}}</div>
                            <transition name="fade">
                                <div
                                    v-bind:class="['boss-hp-bar','stage-label',{'stage-label-odd':index%2==0}]"
                                    v-show="currentExtraInfoID=='Enemy_'+enemy.id"
                                >
                                    <div>LV.{{enemy.lv}}</div>
                                    <div class="progress">
                                        <div
                                            class="progress-bar bg-warning"
                                            role="progressbar"
                                            style="width: 100%;"
                                        >{{calcRising(enemy.lv,enemy.hp[0],enemy.hp[1])}}</div>
                                    </div>
                                    <div style="line-height:0;">
                                        <span
                                            class="boss-hp-bar-extra bg-warning"
                                            v-for="i in countHpExtra(calcRising(enemy.lv,enemy.hp[0],enemy.hp[1]))"
                                            v-bind:key="i"
                                        ></span>
                                    </div>
                                    <div>
                                        <span>ATK {{calcRising(enemy.lv,enemy.attack[0],enemy.attack[1])}}</span>
                                        <span
                                            v-bind:class="['attr-text','attr-'+ convertAttr2nd(bossAttr.attribute2nd||enemy.attribute2nd)]"
                                        >{{calcRising(enemy.lv,enemy.attrAttack[0],enemy.attrAttack[1])}}</span>
                                        <span
                                            style="float:right"
                                        >DEF {{calcRising(enemy.lv,enemy.defence[0],enemy.defence[1])}}</span>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </li>
                <li class="list-group-item" v-if="hex.canGiveUp && hex.giveUpCost > 0">
                    <div class="item-container">
                        <span data-lang="subcontract">{{Ui.getText('subcontract')}}</span>
                        <i class="icon icon-gold"></i>
                        <span>{{hex.giveUpCost}}</span>
                    </div>
                </li>
                <li class="list-group-item" v-if="hex.lockBuffs&&hex.lockBuffs.length">
                    <div class="item-container" v-for="buff in lockBuffs" v-bind:key="buff.id">
                        <img v-bind:src="'../img/quest/'+buff.icon + '.png'" class="icon icon-item">
                        <span class="item-count">{{buff.value}}</span>
                    </div>
                </li>
                <li class="list-group-item" v-if="hex.unlockBuffs&&hex.unlockBuffs.length">
                    <div class="item-container" v-for="buff in unlockBuffs" v-bind:key="buff.id">
                        <img v-bind:src="'../img/quest/'+buff.icon + '.png'" class="icon icon-item">
                        <span class="item-count">{{buff.value}}</span>
                    </div>
                </li>
                <li class="list-group-item" v-if="hex.clearBuffs&&hex.clearBuffs.length">
                    <div class="item-container" v-for="buff in clearBuffs" v-bind:key="buff.id">
                        <img v-bind:src="'../img/quest/'+buff.icon + '.png'" class="icon icon-item">
                        <span class="item-count">{{buff.value}}</span>
                    </div>
                </li>
                <li class="list-group-item" v-if="requireMapItems.length">
                    <i class="material-icons" style="margin:0.75rem 0;">lock_outline</i>
                    <div
                        class="item-container"
                        v-for="item in requireMapItems"
                        v-bind:key="item.index"
                    >
                        <img
                            v-bind:src="'../img/item/'+(map.itemList[item.index].icon || 'itm2_04_000_01') + '.png'"
                            class="icon icon-item"
                            v-bind:title="map.itemList[item.index].name"
                        >
                        <span class="item-count" v-if="item.count>1">{{item.count}}</span>
                    </div>
                </li>
                <li class="list-group-item" v-if="hex.itemHintIndexes&&hex.itemHintIndexes.length">
                    <i class="material-icons" style="margin:0.75rem 0;">vpn_key</i>
                    <div
                        class="item-container"
                        v-for="index in hex.itemHintIndexes"
                        v-bind:key="index"
                    >
                        <img
                            v-bind:src="'../img/item/'+(map.itemList[index].icon || 'itm2_04_000_01') + '.png'"
                            class="icon icon-item"
                            v-bind:title="map.itemList[index].name"
                        >
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="item-container" v-for="reward in rewards" v-bind:key="reward.id">
                        <img
                            v-bind:src="rewardIconSrc(reward.icon)"
                            class="icon icon-item"
                            v-bind:title="reward.name"
                        >
                        <span class="item-count" v-if="reward.count>1">{{reward.count}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </transition>
</template>
<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

export default {
    data: function() {
        return {
            isShow: false,
            hex: {},
            map: {},
            currentExtraInfoID: ""
        };
    },
    created: function() {
        var $vm = this;
        Event.$on("show-hex-info", function(hex, map) {
            Event.$emit("disable-popover");
            $vm.hex = hex;
            $vm.map = map;
            $vm.isShow = true;
        });
    },
    computed: {
        zakoAttr: function() {
            return Data.get("attrset", this.hex.zakoAttr) || {};
        },
        bossAttr: function() {
            return Data.get("attrset", this.hex.bossAttr) || {};
        },
        stage: function() {
            return Data.get("stage", this.hex.questId) || {};
        },
        lockBuffs: function() {
            return _.map(this.hex.lockBuffs || [], function(o) {
                return Data.get("buff", o);
            });
        },
        unlockBuffs: function() {
            return _.map(this.hex.unlockBuffs || [], function(o) {
                return Data.get("buff", o);
            });
        },
        clearBuffs: function() {
            return _.map(this.hex.clearBuffs || [], function(o) {
                return Data.get("buff", o);
            });
        },
        rewards: function() {
            return _.map(this.hex.rewards || [], function(reward) {
                return _.extend(reward, Data.get("items", reward.id));
            });
        },
        requireMapItems: function() {
            var result = [];
            _.each(this.hex.requireMapItems || [], function(count, index) {
                if (count) {
                    result.push({
                        index: index,
                        count: count
                    });
                }
            });
            return result;
        }
    },
    methods: {
        hide: function() {
            if (window.getSelection().toString().length) {
                return;
            }
            this.isShow = false;
            this.currentExtraInfoID = "";
            Event.$emit("enable-popover");
        },
        convertAttr2nd: function(attr) {
            return Data.convertAttr2nd(attr);
        },
        enemys: function(area) {
            return _.map(area.enemyList, function(count, enemyId) {
                return Data.get("enemy", enemyId);
            });
        },
        enemysWithIcon: function(area) {
            var $vm = this;
            return _.chain(area.enemyList)
                .map(function(count, enemyId) {
                    var enemybase = Data.get("enemybase", enemyId);
                    if (
                        enemybase &&
                        $vm.hex.bossAttr.weakAttr &&
                        $vm.hex.bossAttr.weakAttr != 4 &&
                        $vm.hex.bossAttr.weakAttr != 255
                    ) {
                        enemyId =
                            enemybase.frontierChangeEnemyIds[
                                $vm.hex.bossAttr.attribute2nd - 5
                            ];
                    }
                    var enemy = Data.get("enemy", enemyId);
                    if (enemy && enemy.icon && enemy.type >= 10) {
                        enemy.count = count;
                        enemy.lv = Math.max(
                            1,
                            enemy.type > 10
                                ? area.bossLevel + $vm.hex.bossLevelOffset
                                : area.zakoLevel + $vm.hex.zakoLevelOffset
                        );
                        return enemy;
                    }
                    return null;
                })
                .compact()
                .value();
        },
        toggleExtraInfo: function(key) {
            if (this.currentExtraInfoID == key) {
                this.currentExtraInfoID = "";
            } else {
                this.currentExtraInfoID = key;
            }
        },
        rewardIconSrc: function(icon) {
            if (icon.indexOf("chr4") == 0) {
                return "../img/chara/" + icon + ".png";
            }
            return "../img/item/" + (icon || "itm2_04_000_01") + ".png";
        },
        calcRising: function(lv, base, rising) {
            return Math.round(base + lv * rising);
        },
        countHpExtra: function(hp) {
            var gap = 50000,
                newGap = gap,
                base = gap;
            var count = 0;
            while (base < hp) {
                newGap += gap;
                base += newGap;
                count++;
            }
            return Math.min(11, count);
        }
    }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.hex-info {
    position: fixed;
    top: 56px;
    right: 0;
    z-index: 1024;
    background: linear-gradient(180deg, #000b, #000b 40%, #0004);
    color: #fff;
    width: 100%;
    height: 100%;
    cursor: default;
}

.hex-info .list-group-item {
    background: transparent;
    border-color: #fff4;
}

.area-container {
    display: inline-block;
    margin-right: 0.25rem;
}

.area-container:first-of-type {
    margin-left: 0.5rem;
}

.stage-container {
    display: inline-block;
    margin-right: 0.2rem;
    text-align: center;
    position: relative;
    vertical-align: top;
    cursor: pointer;
}

.stage-container .stage-label {
    margin-left: -0.25rem;
    font-size: 0.75rem;
    text-align: left;
}

.stage-container.enemy {
    cursor: initial;
}

.stage-container.enemy .stage-label {
    margin-left: 0.5rem;
    width: 0;
    overflow: visible;
}

.stage-container.enemy .stage-label.stage-label-odd {
    padding-top: 1rem;
}

.stage-container .parallelogram {
    overflow: hidden;
    border-radius: 0.5rem;
    transform: skewX(10deg);
    width: 4rem;
    height: 5rem;
    border: 1px solid white;
}

.stage-container .parallelogram img {
    position: absolute;
    left: -0.5rem;
    width: 5rem;
    height: 5rem;
    transform: skewX(-10deg);
}

.stage-container .stage-enemy-list {
    padding-top: 2rem;
    width: 0;
    margin-left: -0.25rem;
}

.stage-container.enemy .parallelogram {
    margin-top: 2rem;
    margin-left: 0.25rem;
}

.stage-container.enemy .parallelogram .enemy-count {
    position: absolute;
    transform: skewX(-10deg);
    left: 0;
    top: 0;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    color: #000;
    font-size: 0.9rem;
    padding-left: 0.25rem;
}

.stage-container .attr-subscript {
    width: 100%;
    height: 100%;
    background: transparent;
    position: absolute;
    bottom: 0;
    right: 0;
}

.stage-container .attr-subscript.attr-normal {
    background: none;
}

.stage-container .attr-subscript.attr-thunder {
    background: linear-gradient(
        -50deg,
        #fad558 14%,
        white 15%,
        transparent 16%
    );
}
.stage-container .attr-subscript.attr-gravity {
    background: linear-gradient(
        -50deg,
        #c485fd 14%,
        white 15%,
        transparent 16%
    );
}
.stage-container .attr-subscript.attr-fire {
    background: linear-gradient(
        -50deg,
        #fe8691 14%,
        white 15%,
        transparent 16%
    );
}
.stage-container .attr-subscript.attr-ice {
    background: linear-gradient(
        -50deg,
        #92e8fe 14%,
        white 15%,
        transparent 16%
    );
}
.stage-container .attr-subscript.attr-light {
}
.stage-container .attr-subscript.attr-collapse {
}
.stage-container .attr-subscript.attr-theory {
}

.attr-text.attr-normal {
}

.attr-text.attr-thunder {
    color: #fad558;
}

.attr-text.attr-gravity {
    color: #c485fd;
}

.attr-text.attr-fire {
    color: #fe8691;
}

.attr-text.attr-ice {
    color: #92e8fe;
}

.attr-text.attr-light {
}

.attr-text.attr-collapse {
}

.attr-text.attr-theory {
}

.boss-hp-bar > * {
    width: 10rem;
}
.boss-hp-bar .progress {
    height: 0.75rem;
    border-radius: 0;
}
.boss-hp-bar .progress .progress-bar.bg-warning {
    color: black;
}
.boss-hp-bar .boss-hp-bar-extra {
    width: 0.5rem;
    height: 0.5rem;
    margin: 0.25rem 0.25rem 0.25rem 0;
    display: inline-block;
}
</style>

