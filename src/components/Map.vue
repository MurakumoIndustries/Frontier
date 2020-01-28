<template>
    <div id="main">
        <div class="hex-table-container">
            <table class="hex-table">
                <tr v-for="y in Yrange" v-bind:key="y">
                    <td v-for="x in Xrange" v-bind:key="x">
                        <Hex v-if="hex(x,y)" v-bind:hex="hex(x,y)" v-bind:map="map" />
                    </td>
                </tr>
            </table>
        </div>
        <HexInfo />
        <HexPopper />
    </div>
</template>
<script>
import Hex from "./Hex.vue";
import HexInfo from "./HexInfo.vue";
import HexPopper from "./HexPopper.vue";
import { Data } from "../js/data.js";
import interact from "interactjs";

var interactable = {};

export default {
    props: {
        map: Object
    },
    mounted: function(e) {
        console.log("map mounted");
        var $vm = this;

        //make map draggable && pinchable
        var initMapInteract = function(isFirstTime) {
            var dragMoveListener = function(event) {
                var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x =
                        (parseFloat(target.getAttribute("data-x")) || 0) +
                        event.dx,
                    y =
                        (parseFloat(target.getAttribute("data-y")) || 0) +
                        event.dy;

                // translate the element
                target.style.webkitTransform = target.style.transform =
                    "translate(" + x + "px, " + y + "px)";

                // update the posiion attributes
                target.setAttribute("data-x", x);
                target.setAttribute("data-y", y);
            };
            var scale = 1,
                gestureArea = $vm.$el.children[0],
                scaleElement = $vm.$el.children[0].children[0];

            interactable = interact(gestureArea)
                .gesturable({
                    inertia: true,
                    modifiers: [
                        interact.modifiers.restrictRect({
                            restriction: "parent",
                            endOnly: true
                        })
                    ],
                    onstart: function(event) {},
                    onmove: function(event) {
                        scale = scale * (1 + event.ds);
                        if (scale < 0.4) {
                            scale = 0.4;
                        }
                        if (scale > 2) {
                            scale = 2;
                        }

                        scaleElement.style.webkitTransform = scaleElement.style.transform =
                            "scale3d(" + scale + "," + scale + ",1)";

                        dragMoveListener(event);
                    },
                    onend: function(event) {}
                })
                .draggable({
                    inertia: true,
                    modifiers: [
                        interact.modifiers.restrictRect({
                            restriction: "parent",
                            endOnly: true
                        })
                    ],
                    autoScroll: true,
                    onmove: dragMoveListener
                })
                .on("doubletap dblclick", function(event) {
                    scaleElement.style.webkitTransform = scaleElement.style.transform =
                        "";
                    event.preventDefault();
                });

            gestureArea.addEventListener("wheel", function(e) {
                scale = scale * (1 - e.deltaY / 1000);
                if (scale < 0.6) {
                    scale = 0.6;
                }
                if (scale > 1) {
                    scale = 1;
                }

                scaleElement.style.webkitTransform = scaleElement.style.transform =
                    "scale(" + scale + "," + scale + ")";
            });

            console.log("map interact inited");
        };
        this.$nextTick(function() {
            initMapInteract();
            this.moveToStart();
        });
    },
    updated: function() {
        this.$nextTick(function() {
            this.moveToStart();
        });
    },
    methods: {
        hex: function(x, y) {
            return _.find(this.map.hexList, function(hex) {
                return hex.x == x && hex.y == y;
            });
        },
        moveToStart: function() {
            //default move to start point
            var $vm = this;
            var startHex = _.find($vm.map.hexList, function(hex) {
                return hex.termType == 120;
            });
            var spaceWidth =
                $vm.$el.clientWidth - $vm.$el.children[0].clientWidth;
            var spaceHeight =
                $vm.$el.clientHeight - $vm.$el.children[0].clientHeight;
            var padding = parseInt(
                getComputedStyle($vm.$el.children[0].children[0]).padding
            );
            var td = $vm.$el.querySelector("div.hex").parentNode;
            var tdWidth = td.clientWidth;
            var tdHeight = td.clientHeight;
            var startX =
                $vm.$el.clientWidth / 2 -
                ((startHex.x - $vm.realMinX) * tdWidth + padding + tdWidth / 2);
            var startY =
                $vm.$el.clientHeight / 2 -
                ((startHex.y - $vm.minY) * tdHeight +
                    padding +
                    tdHeight / 2 +
                    (((startHex.x - $vm.minX + 1) % 2) * tdHeight) / 2);
            console.log(startHex.x, $vm.minX, $vm.realMinX);
            console.log(startX, startY);
            $vm.$el.children[0].style.webkitTransform = $vm.$el.children[0].style.transform =
                "translate(" + startX + "px, " + startY + "px)";
            $vm.$el.children[0].setAttribute("data-x", startX);
            $vm.$el.children[0].setAttribute("data-y", startY);
        }
    },
    computed: {
        realMinX: function() {
            return _.minBy(this.map.hexList, function(o) {
                return o.x;
            }).x;
        },
        minX: function() {
            //remove empty tds&trs
            var i = this.realMinX;

            //keep minX have same odd/even as x
            if (i % 2 == 1) {
                i = i - 1;
            }
            return i;
        },
        minY: function() {
            return _.minBy(this.map.hexList, function(o) {
                return o.y;
            }).y;
        },
        maxX: function() {
            return _.maxBy(this.map.hexList, function(o) {
                return o.x;
            }).x;
        },
        maxY: function() {
            return _.maxBy(this.map.hexList, function(o) {
                return o.y;
            }).y;
        },
        Xrange: function() {
            return _.range(this.minX, this.maxX + 1);
        },
        Yrange: function() {
            return _.range(this.minY, this.maxY + 1);
        }
    },
    components: {
        Hex,
        HexInfo,
        HexPopper
    }
};
</script>

<style scoped>
#main {
    overflow: hidden;
    height: 100%;
    background-color: #eee;
}

.hex-table-container {
    -ms-touch-action: none;
    touch-action: none;
    display: inline-block;
    background-color: white;
}

.hex-table {
    padding: 5rem;
    border: none;
    border-collapse: separate;
    border-spacing: 0;
}

@media (min-width: 768px) {
    .hex-table {
        transition: transform 0.2s ease;
    }
}

.hex-table td {
    border-collapse: collapse;
    position: relative;
}

.hex-table td:empty {
    width: 2.5rem;
    height: 2.5rem;
}

.hex-table td:nth-child(odd) .hex {
    top: 35.5px;
}
</style>
