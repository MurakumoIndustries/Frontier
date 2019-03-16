<template>
    <transition v-if="isEnable" name="fade">
        <div v-show="isShow" class="popover hex-popper bs-popover-auto" style="max-width:none;">
            <div class="arrow"></div>
            <h3 class="popover-header">
                <span>{{hex.name}}</span>
                <span
                    v-if="hex.recomLv > 0"
                    class="font-weight-light float-right pl-3"
                >{{Ui.getText('recomLv') + hex.recomLv}}</span>
            </h3>
            <div class="popover-body p-0 pb-1">
                <ul class="list-group list-group-flush">
                    <li v-if="hex.canGiveUp && hex.giveUpCost > 0" class="list-group-item p-1">
                        <div class="item-container">
                            <span data-lang="subcontract">{{Ui.getText('subcontract') }}</span>
                            <i class="icon icon-gold"></i>
                            {{hex.giveUpCost}}
                        </div>
                    </li>
                    <li class="list-group-item p-1" v-if="hex.lockBuffs&&hex.lockBuffs.length > 0">
                        <div class="item-container" v-for="buff in lockBuffs" v-bind:key="buff.id">
                            <img
                                v-bind:src="'../img/quest/'+buff.icon + '.png'"
                                class="icon icon-item"
                            >
                            <span class="item-count">{{buff.value}}</span>
                        </div>
                    </li>
                    <li class="list-group-item p-1" v-if="hex.unlockBuffs&&hex.unlockBuffs.length">
                        <div
                            class="item-container"
                            v-for="buff in unlockBuffs"
                            v-bind:key="buff.id"
                        >
                            <img
                                v-bind:src="'../img/quest/'+buff.icon + '.png'"
                                class="icon icon-item"
                            >
                            <span class="item-count">{{buff.value}}</span>
                        </div>
                    </li>
                    <li class="list-group-item p-1" v-if="hex.clearBuffs&&hex.clearBuffs.length">
                        <div class="item-container" v-for="buff in clearBuffs" v-bind:key="buff.id">
                            <img
                                v-bind:src="'../img/quest/'+buff.icon + '.png'"
                                class="icon icon-item"
                            >
                            <span class="item-count">{{buff.value}}</span>
                        </div>
                    </li>
                    <li class="list-group-item p-1" v-if="requireMapItems.length">
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
                    <li
                        class="list-group-item p-1"
                        v-if="hex.itemHintIndexes&&hex.itemHintIndexes.length"
                    >
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
                    <li class="list-group-item p-1" v-if="hex.rewards&&hex.rewards.length">
                        <div
                            class="item-container"
                            v-for="reward in rewards"
                            v-bind:key="reward.id"
                        >
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
        </div>
    </transition>
</template>
<script>
import Popper from "popper.js";

import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

export default {
    data: function() {
        return {
            isEnable: true,
            isShow: false,
            hex: {},
            map: {}
        };
    },
    mounted: function() {
        var $vm = this;
        Event.$on("show-popover", function($ref, hex, map) {
            $vm.isShow = true;
            $vm.hex = hex;
            $vm.map = map;
            $vm.$nextTick(function() {
                var popperInstance = new Popper($ref, $vm.$el, {
                    placement: "auto",
                    arrow: {
                        element: $vm.$el.getElementsByClassName("arrow")[0]
                    },
                    boundariesElement: document.getElementById("main")
                });
            });
        });
        Event.$on("hide-popover", function() {
            $vm.isShow = false;
        });
        Event.$on("enable-popover", function() {
            $vm.isEnable = true;
        });
        Event.$on("disable-popover", function() {
            $vm.isEnable = false;
        });
    },
    computed: {
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
        rewardIconSrc: function(icon) {
            if (icon.indexOf("chr4") == 0) {
                return "../img/chara/" + icon + ".png";
            }
            return "../img/item/" + (icon || "itm2_04_000_01") + ".png";
        }
    }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.hex-popper {
    background: white;
    z-index: 99999;
}
.hex-popper .popover-header {
    background: rgba(0, 0, 0, 0.75);
    color: white;
}

.bs-popover-auto[x-placement^="bottom"] > .arrow,
.bs-popover-auto[x-placement^="top"] > .arrow {
    left: calc(50% - 13px);
}
.bs-popover-auto[x-placement^="left"] > .arrow,
.bs-popover-auto[x-placement^="right"] > .arrow {
    top: calc(50% - 13px);
}
</style>