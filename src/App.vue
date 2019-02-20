<template>
    <div class="h-100">
        <Nav/>
        <Frontier/>
    </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Frontier from "./components/Frontier.vue";

export default {
    components: {
        Nav,
        Frontier
    }
};
</script>