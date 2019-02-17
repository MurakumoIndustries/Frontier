<template>
    <div
        v-bind:class="['hex',{'hex-danger':hex.hexType==20},{'hex-rare':hex.hexType==30}]"
        @click="showHexInfo(hex)"
    >
        <div class="hex-tile" v-html="hexsvg"></div>
        <a class="hex-content" data-toggle="popover" tabindex="0">
            <div class="d-flex justify-content-center align-items-center">
                <i class="material-icons" v-if="hex.termType==120">play_arrow</i>
                <i class="material-icons" v-if="hex.termType==130">flag</i>
                <i class="material-icons" v-if="hex.hexType==40">chat</i>
                <i class="icon icon-chest" v-if="hex.hexType==50"/>
                <i class="icon icon-2x icon-PowUpEne" v-if="hex.hexType==60"/>
                <i class="icon icon-2x icon-PowUpAct" v-if="hex.hexType==61"/>
                <i class="icon icon-2x icon-PowUpRwd" v-if="hex.hexType==62"/>
                <i class="icon icon-2x icon-PowDwnEne" v-if="hex.hexType==70"/>
                <i class="icon icon-2x icon-PowDwnAct" v-if="hex.hexType==71"/>
                <i class="icon icon-2x icon-PowDwnRwd" v-if="hex.hexType==72"/>
                <i class="icon icon-endless" v-if="hex.hexType==90"/>
                <i
                    v-for="index in hex.itemHintIndexes"
                    v-bind:key="index"
                    v-bind:class="['icon','icon-key','icon-key-01-' + '00'.substring(0, 2 - String(index+1).length) + String(index+1)]"
                />
                <i class="material-icons" v-if="hex.requireMapItems.length">lock_outline</i>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <div class="d-inline-flex" v-for="reward in rewards" v-bind:key="reward.id">
                    <div class="d-inline-flex" v-if="hex.hexType==50&&reward.id == 'ticket_010_01'">
                        <i class="icon icon-battery"/>
                        {{reward.count}}
                    </div>
                    <div class="d-inline-flex" v-if="hex.hexType==50&&reward.id == 'gold'">
                        <i class="icon icon-gold"/>
                        {{reward.count}}
                    </div>
                    <div class="d-inline-flex" v-if="hex.hexType==50&&reward.id == 'energy'">
                        <i class="icon icon-energy"/>
                        {{reward.count}}
                    </div>
                    <div class="d-inline-flex" v-if="reward.id == 'gacha_point'">
                        <i class="icon icon-gacha-point"/>
                        {{reward.count}}
                    </div>
                </div>
                <div
                    class="d-inline-flex"
                    v-for="(count,index) in filterRequireMapItems"
                    v-bind:key="index"
                >
                    <i
                        v-bind:class="['icon','icon-key',
                        'icon-key-01-' + '00'.substring(0, 2 - String(index+1).length) + String(index+1)]"
                    />
                    {{count}}
                </div>
            </div>
            <div class="hex-area-count" v-if="areaCount>0">{{areaCount}}</div>
        </a>
    </div>
</template>
<script>
import hexsvg from "../img/hex.svg";

import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

export default {
    props: {
        hex: Object
    },
    data: function() {
        return {
            hexsvg: hexsvg
        };
    },
    methods: {
        showHexInfo: function(hex) {
            Event.$emit("show-hex-info", hex);
        }
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
        rewards: function() {
            var items = [];
            _.each(this.hex.rewards, function(reward, i) {
                if (reward.id) {
                    items.push(_.extend(reward, Data.get("items", reward.id)));
                }
            });
            return items;
        },
        areaCount: function() {
            return (this.stage.areaList || []).length;
        },
        filterRequireMapItems: function() {
            return _.filter(this.hex.requireMapItems, function(o) {
                return o > 0;
            });
        }
    }
};
</script>
<style>
.hex-tile > svg {
}

.hex-tile > svg > polygon {
    stroke: #ccc;
    stroke-width: 3px;
    stroke-linejoin: round;
    fill: #fff;
}

.hex-danger svg > polygon {
    stroke: #f00;
    stroke-width: 6px;
}

.hex-rare svg > polygon {
    stroke: yellow;
    stroke-width: 6px;
}
</style>

<style scoped>
.hex {
    position: relative;
    /*fix hex under td*/
    z-index: 2;
    cursor: pointer;
}

.hex-tile {
    width: 108px;
    margin: -3px -16.5px;
}

.hex-content {
    text-align: center;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #212529;
}

.hex-content:hover {
    color: #212529;
    text-decoration: none;
}

.hex-content:focus {
    outline: none;
}

.hex-content * {
    pointer-events: none;
}

.hex-content .hex-area-count {
    position: absolute;
    right: 1rem;
    bottom: 0.25rem;
    font-size: 0.75rem;
}
</style>

