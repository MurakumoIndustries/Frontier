<template></template>
<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

export default {
    data: function() {
        return {
            hex: {}
        };
    },
    mounted: function() {
        var $vm = this;
        Event.$on("show-popover", function(hex, $ref) {
            $vm.hex = hex;
        });
        Event.$on("hide-popover", function() {
            
        });
    }
};
</script>
<style scoped>
</style>