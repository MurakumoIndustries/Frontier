<template>
    <div class="map-info-container p-2">
        <div v-show="!!mapName">
            <div>
                <span class="map-name">{{mapName}}</span>
                <button
                    type="button"
                    class="d-md-none sidebar-toggle py-0 btn btn-outline-secondary"
                    @click="toggleSidebar()"
                >
                    <i class="material-icons">menu</i>
                </button>
            </div>
            <Collapse>
                <div class="map-info sidebar-collapsable" v-show="isShowSidebar">
                    <div class="d-flex" v-if="canGiveUp">
                        {{Ui.getText("giveup")}}
                        <i class="icon icon-gold"></i>
                        {{giveUpCost}}
                    </div>
                    <div class="d-flex" v-else>{{Ui.getText("cannotgiveup")}}</div>
                    <div class="d-flex">
                        {{Ui.getText("total")}}
                        <span
                            class="icon-hex-tile icon-hex-danger"
                            v-html="hexsvg"
                        ></span>
                        <span>{{totalDanger}}</span>
                        <span class="icon-hex-tile icon-hex-rare" v-html="hexsvg"></span>
                        <span>{{totalRare}}</span>
                        <span class="icon-hex-tile" v-html="hexsvg"></span>
                        <span>{{totalNormal}}</span>
                        <span v-if="totalEndless>0">(+{{totalEndless}})</span>
                    </div>
                    <div class="d-flex">
                        <i class="icon icon-gacha-point"></i>
                        <span>{{totalGachaPoint}}</span>
                        <i class="icon icon-battery"></i>
                        <span>{{totalBattery}}</span>
                        <i class="icon icon-gold"></i>
                        <span>{{totalGold}}</span>
                        <i class="icon icon-energy"></i>
                        <span>{{totalEnergy}}</span>
                    </div>
                </div>
            </Collapse>
        </div>
    </div>
</template>

<script>
import hexsvg from "../img/hex.svg";

import Collapse from "./Collapse.vue";

import { Event } from "../js/event.js";

export default {
    props: {
        isShowSidebar: Boolean,
        mapName: String,
        canGiveUp: Boolean,
        giveUpCost: Number,
        totalDanger: Number,
        totalRare: Number,
        totalNormal: Number,
        totalEndless: Number,
        totalGachaPoint: Number,
        totalBattery: Number,
        totalGold: Number,
        totalEnergy: Number
    },
    data: function() {
        return {
            hexsvg: hexsvg
        };
    },
    methods: {
        toggleSidebar: function() {
            Event.$emit("toggle-sidebar");
        }
    },
    components: {
        Collapse
    }
};
</script>
<style scoped>
.sidebar-toggle {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
}

.map-info-container {
    min-height: 3rem;
    color: rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    position: relative;
}

@media (min-width: 768px) {
    .map-info-container {
        min-height: 7rem;
        height: 7rem;
    }
}

.icon-hex-tile {
    display: inline-block;
    width: 1.25rem;
    margin: 0;
    line-height: 1.25rem;
    stroke: none;
    fill: #8cd;
}

.icon-hex-tile.icon-hex-danger {
    fill: #f00;
}

.icon-hex-tile.icon-hex-rare {
    fill: #ff0;
}
</style>
