<template>
    <transition
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
    >
        <slot/>
    </transition>
</template>
<script>
export default {
    methods: {
        enter(el) {
            el.style.height = "auto";
            // noinspection JSSuspiciousNameCombination
            let endWidth = window.getComputedStyle(el).height;
            el.style.height = "0px";
            el.offsetHeight; // force repaint
            // noinspection JSSuspiciousNameCombination
            el.style.height = endWidth;
        },
        afterEnter(el) {
            el.style.height = null;
        },
        leave(el) {
            el.style.height = window.getComputedStyle(el).height;
            el.offsetHeight; // force repaint
            el.style.height = "0px";
        },
        afterLeave(el) {
            el.style.height = null;
        }
    }
};
</script>
<style>
.collapsable,
.sidebar-collapsable {
    transition: height 0.25s ease-in-out;
    overflow: hidden;
}
</style>


