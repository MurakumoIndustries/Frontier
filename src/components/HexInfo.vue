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
                        <div class="stage-container" @click.stop="toggleEnemyList(area.id)">
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
                                    v-show="currentAreaIdForEnemyList==area.id"
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
                            @click.stop
                        >
                            <div class="parallelogram">
                                <img
                                    v-bind:src="'../img/quest/'+(enemy.icon || 'ene2_800_01') + '.png'"
                                >
                                <div
                                    v-bind:class="['attr-subscript','attr-'+ convertAttr2nd(enemy.type > 10?bossAttr.weakAttr||enemy.weakAttr:255)]"
                                ></div>
                            </div>
                            <div
                                v-bind:class="['stage-label',{'stage-label-odd':index%2!=0}]"
                            >{{enemy.name}}</div>
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
                <li class="list-group-item">
                    <div class="item-container" v-for="reward in rewards" v-bind:key="reward.id">
                        <img
                            v-bind:src="'../img/item/'+(reward.icon || 'itm2_04_000_01') + '.png'"
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
            currentAreaIdForEnemyList: 0
        };
    },
    created: function() {
        var $vm = this;
        Event.$on("show-hex-info", function(hex) {
            $vm.hex = hex;
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
            return _.map(this.hex.lockBuffs, function(o) {
                return Data.get("buff", o);
            });
        },
        unlockBuffs: function() {
            return _.map(this.hex.unlockBuffs, function(o) {
                return Data.get("buff", o);
            });
        },
        clearBuffs: function() {
            return _.map(this.hex.clearBuffs, function(o) {
                return Data.get("buff", o);
            });
        },
        rewards: function() {
            return _.map(this.hex.rewards, function(reward) {
                return _.extend(reward, Data.get("items", reward.id));
            });
        }
    },
    methods: {
        hide: function() {
            if (window.getSelection().toString().length) {
                return;
            }
            this.isShow = false;
        },
        convertAttr2nd: function(attr) {
            return Data.convertAttr2nd(attr);
        },
        enemys: function(area) {
            return _.map(area.enemyList, function(enemyId) {
                return Data.get("enemy", enemyId);
            });
        },
        enemysWithIcon: function(area) {
            return _.chain(area.enemyList)
                .map(function(enemyId) {
                    var enemybase = Data.get("enemybase", enemyId);
                    if (
                        enemybase &&
                        hex.bossAttr.weakAttr &&
                        hex.bossAttr.weakAttr != 4 &&
                        hex.bossAttr.weakAttr != 255
                    ) {
                        enemyId =
                            enemybase.frontierChangeEnemyIds[
                                hex.bossAttr.attribute2nd - 5
                            ];
                    }
                    var enemy = Data.get("enemy", enemyId);
                    if (enemy && enemy.icon && enemy.type >= 10) {
                        return enemy;
                    }
                    return null;
                })
                .compact()
                .value();
        },
        toggleEnemyList: function(areaid) {
            if (this.currentAreaIdForEnemyList == areaid) {
                this.currentAreaIdForEnemyList = 0;
            } else {
                this.currentAreaIdForEnemyList = areaid;
            }
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
</style>

