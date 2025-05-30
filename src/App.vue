<script setup>
import { RouterView } from "vue-router";
import { onMounted, provide, ref, watch } from "vue";
import Nav from "@/components/home/nav.vue";
import Model from "@/components/model.vue";
const start = ref(null);

const toggle = ref(false);
provide("toggle", toggle);
provide("start", start);
</script>

<template>
    <div class="start" ref="start">
        <Model></Model>
        <div class="content">
            <Nav></Nav>
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss">
@font-face {
    font-family: "DingTalk";
    src: url("https://brzk.brcon.com.cn/file/otherFile/20250409/1830303441967f.ttf");
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: DingTalk;
}
.start {
    width: 100%;
    height: 100vh;
    position: relative;
    .content {
        width: 100%;
        height: 100vh;
        position: absolute;
        padding-top: 50px;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
    }
}
</style>
