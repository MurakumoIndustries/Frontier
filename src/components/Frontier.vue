<template>
    <div class="container-fluid main-container h-100">
        <div class="row h-100">
            <div class="col-12 col-md-4 col-xl-3 p-0 sidebar">
                <MapInfo
                    v-bind:isShowSidebar="isShowSidebar"
                    v-bind:mapName="mapName"
                    v-bind:canGiveUp="map.canGiveUp"
                    v-bind:giveUpCost="map.giveUpCost"
                    v-bind:totalDanger="total.danger"
                    v-bind:totalRare="total.rare"
                    v-bind:totalNormal="total.normal"
                    v-bind:totalEndless="total.endless"
                    v-bind:totalGachaPoint="total.gachaPoint"
                    v-bind:totalBattery="total.battery"
                    v-bind:totalGold="total.gold"
                    v-bind:totalEnergy="total.energy"
                />
                <MapList v-bind:isShowSidebar="isShowSidebar" />
            </div>
            <div class="col-12 col-md-8 col-xl-9 p-0 h-100">
                <Map v-if="map.id" v-bind:map="map" />
            </div>
        </div>
    </div>
</template>

<script>
import MapInfo from "./MapInfo.vue";
import MapList from "./MapList.vue";
import Map from "./Map.vue";

import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

export default {
    data: function() {
        return {
            isShowSidebar: true,
            map: {
                id: "",
                hexList: []
            }
        };
    },
    created: function() {
        var $vm = this;
        Event.$on("render", function(id) {
            Event.$emit("set-active-map", id);
            $vm.map = _.extend({}, $vm.map, Data.get("maptable", id));
        });
        Event.$on("toggle-sidebar", function(forceOption) {
            if (typeof forceOption === "boolean") {
                $vm.isShowSidebar = forceOption;
            } else {
                $vm.isShowSidebar = !$vm.isShowSidebar;
            }
        });
    },
    computed: {
        mapName: function() {
            if (!this.map.name) {
                return "";
            }
            return this.map.hexList.length + "|" + this.map.name;
        },
        total: function() {
            var result = {
                danger: 0,
                rare: 0,
                normal: 0,
                endless: 0,
                gachaPoint: 0,
                battery: 0,
                gold: 0,
                energy: 0
            };
            _.each(this.map.hexList, function(hex, index) {
                switch (hex.hexType) {
                    case 10: {
                        result.normal++;
                        break;
                    }
                    case 20: {
                        result.danger++;
                        break;
                    }
                    case 30: {
                        result.rare++;
                        break;
                    }
                    case 90: {
                        result.endless++;
                        break;
                    }
                }

                _.each(hex.rewards, function(reward, i) {
                    if (reward.id == "ticket_010_01") {
                        result.battery += reward.count;
                    } else if (reward.id == "gacha_point") {
                        result.gachaPoint += reward.count;
                    } else if (reward.id == "gold") {
                        result.gold += reward.count;
                    } else if (reward.id == "energy") {
                        result.energy += reward.count;
                    }
                });
            });
            return result;
        }
    },
    components: {
        MapInfo,
        MapList,
        Map
    }
};
</script>
<style scoped>
.main-container {
    padding-top: 56px;
}

.sidebar {
    z-index: 16;
    background: white;
    border-right: none;
    position: absolute;
}

@media (min-width: 768px) {
    .sidebar {
        position: initial;
        height: 100%;
        border-right: 1px solid rgba(0, 0, 0, 0.25);
    }
}
</style>


