<template>
    <div class="map-list">
        <Collapse>
            <div class="map-list-search p-2 sidebar-collapsable" v-show="isShowSidebar">
                <div class="input-group">
                    <input type="number" class="form-control w-25" v-model.trim="searchNumber">
                    <input
                        type="text"
                        class="form-control w-75"
                        v-bind:placeholder="Ui.getText('search')"
                        v-model.trim="searchText"
                    >
                </div>
            </div>
        </Collapse>
        <Collapse>
            <div class="map-list-container pl-2 sidebar-collapsable" v-show="isShowSidebar">
                <ul id="map-list-scroller" class="list-unstyled">
                    <li v-for="group in maplist" v-bind:key="group.id">
                        <h5 v-if="group.name">
                            <a
                                v-bind:href="'#'+group.id"
                                @click.prevent="group.isShow=!group.isShow"
                            >{{Ui.getText(group.name)}}</a>
                        </h5>
                        <Collapse>
                            <ul
                                class="list-unstyled collapsable"
                                v-if="group.name"
                                v-show="isForceShowAllGroup||group.isShow"
                            >
                                <li
                                    v-bind:id="'map'+map.id"
                                    v-for="map in group.maps"
                                    v-show="isShow(map)"
                                    v-bind:key="map.id"
                                    v-bind:class="[{'active':activeMapId==map.id},
                            {'map-list-divider':!isForceShowAllGroup&&
                                                 (map.id=='3074294833'
                                                ||map.id=='3196602394'
                                                ||map.id=='1795557279'
                                                ||map.id=='3331758729'
                                                ||map.id=='1247514767'
                                                ||map.id=='3859376046'
                                                ||map.id=='79899309')}]"
                                >
                                    <a
                                        v-bind:data-map-id-string="map.idString"
                                        v-bind:data-map-id="map.id"
                                        v-bind:href="'#!/map/'+map.id"
                                        v-bind:title="map.count+'|'+map.name"
                                    >
                                        <span class="hex-info-count">{{map.count}}</span>
                                        <span>{{map.name}}</span>
                                    </a>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                </ul>
            </div>
        </Collapse>
    </div>
</template>

<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

import Collapse from "./Collapse.vue";

import VueScrollTo from "vue-scrollto";

export default {
    created: function() {
        var $vm = this;
        Event.$on("set-active-map", function(id) {
            $vm.setActiveMap(id);
        });
    },
    props: {
        isShowSidebar: Boolean
    },
    data: function() {
        return {
            searchNumber: "",
            searchText: "",
            maplist: Data.getAll("maplist"),
            activeMapId: ""
        };
    },
    methods: {
        isShow: function(map) {
            if (!this.searchNumber && !this.searchText) {
                return true;
            }

            if (
                this.searchNumber &&
                String(map.count).indexOf(this.searchNumber) >= 0
            ) {
                return true;
            }
            if (
                this.searchText &&
                String(map.name).indexOf(this.searchText) >= 0
            ) {
                return true;
            }

            return false;
        },
        setActiveMap: function(id) {
            console.log("setActiveMap");
            this.searchNumber = "";
            this.searchText = "";
            this.activeMapId = id;
            //dirty fix for multiple animations
            var timeout = 0;
            _.each(this.maplist, function(group, index) {
                var oldGroupIsShow = group.isShow;
                group.isShow = false;
                if (
                    _.some(group.maps, function(map) {
                        return map.id == id;
                    })
                ) {
                    group.isShow = true;
                }
                if (group.isShow != oldGroupIsShow) {
                    timeout = 300;
                }
            });
            this.$nextTick(function() {
                window.setTimeout(function() {
                    VueScrollTo.scrollTo("#map" + id, {
                        container: "#map-list-scroller"
                    });
                }, timeout);
            });
        }
    },
    computed: {
        isForceShowAllGroup: function() {
            return this.searchNumber || this.searchText;
        }
    },
    components: {
        Collapse
    }
};
</script>
<style scoped>
.map-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

@media (min-width: 768px) {
    .map-list {
        height: calc(100% - 7rem);
        border-bottom: none;
    }
}

.map-list-search {
    overflow: visible;
}

.map-list-container {
    flex: auto;
    overflow: hidden;
}

.map-list-container > ul {
    overflow: auto;
    margin-bottom: 0;
}

@media (min-width: 768px) {
    .map-list-container > ul {
        height: 100%;
    }
}

.map-list-container > ul > li {
    margin-top: 0.5rem;
}

.map-list-container ul > li.active {
    font-weight: bold;
}

.map-list-container ul > li a {
    color: rgba(0, 0, 0, 0.65);
    text-decoration: none;
    white-space: nowrap;
}

.map-list-container ul > li a > .hex-info-count {
    display: inline-block;
    min-width: 2.25rem;
}

.map-list-container ul > ul > li {
    margin: 0 0 0 0rem;
}

.map-list-container ul > li.map-list-divider {
    border-top: 1px rgba(0, 0, 0, 0.25) solid;
}
</style>

