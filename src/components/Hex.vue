<template>
    <div class="hex" @click="showHexInfo()">
        <div class="hex-tile">
            <img :src="hexSvg" />
        </div>
        <a class="hex-content" data-toggle="popover" tabindex="0">
            <div class="hex-background">
                <i class="icon icon-start" v-if="hex.termType == 120" />
                <i class="material-icons" style="font-size: 3.5rem" v-if="hex.termType == 130">flag</i>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <i class="material-icons" v-if="hex.hexType == 40">chat</i>
                <i class="material-icons" v-if="hex.hexType == 41">videogame_asset</i>
                <i class="icon icon-chest" v-if="hex.hexType == 50" />
                <i class="icon icon-2x icon-PowUpEne" v-if="hex.hexType == 60" />
                <i class="icon icon-2x icon-PowUpAct" v-if="hex.hexType == 61" />
                <i class="icon icon-2x icon-PowUpRwd" v-if="hex.hexType == 62" />
                <i class="icon icon-2x icon-PowDwnEne" v-if="hex.hexType == 70" />
                <i class="icon icon-2x icon-PowDwnAct" v-if="hex.hexType == 71" />
                <i class="icon icon-2x icon-PowDwnRwd" v-if="hex.hexType == 72" />
                <i
                    class="icon icon-endless"
                    v-if="hex.hexType == 90 || hex.hexType == 91 || hex.hexType == 92 || hex.hexType == 93"
                />
                <i class="material-icons" style="font-size: 2.5rem; color: #ff9999" v-if="hex.hexType == 200"
                    >favorite</i
                >
                <i
                    v-for="index in hex.itemHintIndexes"
                    v-bind:key="index"
                    v-bind:class="[
                        'icon',
                        'icon-key',
                        'icon-key-01-' + '00'.substring(0, 2 - String(index + 1).length) + String(index + 1),
                    ]"
                />
                <i class="material-icons" v-if="requireMapItems.length">lock_outline</i>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <div class="d-inline-flex" v-for="reward in rewards" v-bind:key="reward.id">
                    <div class="d-inline-flex" v-if="hex.hexType == 50 && reward.id == 'ticket_010_01'">
                        <i class="icon icon-battery" />
                        {{ reward.count }}
                    </div>
                    <div class="d-inline-flex" v-if="hex.hexType == 50 && reward.id == 'gold'">
                        <i class="icon icon-gold" />
                        {{ reward.count }}
                    </div>
                    <div class="d-inline-flex" v-if="hex.hexType == 50 && reward.id == 'energy'">
                        <i class="icon icon-energy" />
                        {{ reward.count }}
                    </div>
                    <div class="d-inline-flex" v-if="reward.id == 'gacha_point'">
                        <i class="icon icon-gacha-point" />
                        {{ reward.count }}
                    </div>
                </div>
                <div class="d-inline-flex" v-for="item in requireMapItems" v-bind:key="item.index">
                    <i
                        v-bind:class="[
                            'icon',
                            'icon-key',
                            'icon-key-01-' +
                                '00'.substring(0, 2 - String(item.index + 1).length) +
                                String(item.index + 1),
                        ]"
                    />
                    {{ item.count }}
                </div>
            </div>
            <div class="hex-area-count" v-if="areaCount > 0">{{ areaCount }}</div>
            <div class="hex-is-hard">
                <i class="material-icons" v-if="isHighDifficulty">warning</i>
                <i class="material-icons" v-if="isNoSupport">person_add_disabled</i>
            </div>
            <div class="hex-hitokoe" v-if="hex.hitokoeId > 0">
                <i class="material-icons">question_answer</i>
            </div>
        </a>
    </div>
</template>
<script>
import hexDefault_svg from "../img/hexTile/hexDefault.svg";
import hexEnemy_svg from "../img/hexTile/hexEnemy.svg";
import hexRare_svg from "../img/hexTile/hexRare.svg";
import hexDanger_svg from "../img/hexTile/hexDanger.svg";
import hexBonus_svg from "../img/hexTile/hexBonus.svg";
import hexBuff_svg from "../img/hexTile/hexBuff.svg";

import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

export default {
    props: {
        hex: Object,
        map: Object,
    },
    mounted: function () {
        var $vm = this;
        var $target = $vm.$el.getElementsByClassName("hex-content")[0];
        $target.addEventListener("mouseenter", function () {
            Event.$emit("show-popover", $target, $vm.hex, $vm.map);
        });
        $target.addEventListener("mouseleave", function () {
            Event.$emit("hide-popover");
        });
    },
    methods: {
        showHexInfo: function () {
            Event.$emit("show-hex-info", this.hex, this.map);
        },
    },
    computed: {
        hexSvg: function () {
            switch (this.hex.hexType) {
                case 10:
                case 90:
                case 91:
                    return hexEnemy_svg;
                case 20:
                case 93:
                    return hexDanger_svg;
                case 30:
                case 92:
                    return hexRare_svg;
                case 40:
                    return hexDefault_svg;
                case 50:
                    return hexBonus_svg;
                case 60:
                case 61:
                case 62:
                case 70:
                case 71:
                case 72:
                    return hexBuff_svg;
                default:
                    return hexDefault_svg;
            }
        },
        zakoAttr: function () {
            return Data.get("attrset", this.hex.zakoAttr) || {};
        },
        bossAttr: function () {
            return Data.get("attrset", this.hex.bossAttr) || {};
        },
        stage: function () {
            return Data.get("stage", this.hex.questId) || {};
        },
        rewards: function () {
            var items = [];
            _.each(this.hex.rewards, function (reward, i) {
                if (reward.id) {
                    items.push(_.extend(reward, Data.get("items", reward.id)));
                }
            });
            return items;
        },
        areaCount: function () {
            return (this.stage.areaList || []).length;
        },
        isHighDifficulty: function () {
            return this.stage.highDifficulty == 1;
        },
        isNoSupport: function () {
            return [10, 20, 30, 90].indexOf(this.hex.hexType) >= 0 && this.hex.supportType == 0;
        },
        requireMapItems: function () {
            var result = [];
            _.each(this.hex.requireMapItems, function (count, index) {
                if (count) {
                    result.push({
                        index: index,
                        count: count,
                    });
                }
            });
            return result;
        },
    },
};
</script>
<style scoped>
.hex {
    position: relative;
    /*fix hex under td*/
    z-index: 2;
    cursor: pointer;
}

.hex-tile {
    width: 108px;
    height: 75px;
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
    z-index: 12;
}

.hex-content .hex-background {
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
    color: #00000033;
    z-index: 15;
    filter: drop-shadow(0px 0px 1px #000);
}

.hex-content .hex-area-count {
    position: absolute;
    right: 1rem;
    bottom: 0.25rem;
    font-size: 0.75rem;
    z-index: 12;
}

.hex-content .hex-is-hard {
    position: absolute;
    left: 0.25rem;
    top: 0.25rem;
    color: red;
    z-index: 12;
}

.hex-content .hex-hitokoe {
    position: absolute;
    left: 1rem;
    bottom: 0.25rem;
    font-size: 0;
    z-index: 12;
}

.hex-content .hex-hitokoe * {
    font-size: 0.75rem;
}
</style>

