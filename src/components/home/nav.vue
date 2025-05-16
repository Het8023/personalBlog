<template>
    <div class="nav">
        <div class="nav_left">
            <div class="nav_left_item">HET</div>
            <div class="nav_left_item">
                <el-switch v-model="toggle" active-icon="MoonNight" inactive-icon="Sunny" inline-prompt></el-switch>
            </div>
        </div>
        <div class="nav_right">
            <div v-for="(item, index) in navList" :key="index" class="nav_right_item" @click="toPage(item)">
                <el-icon><House /></el-icon>
                <div>{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const navList = ref([
    {
        name: "首页",
        path: "/home",
        icon: "House",
    },
    {
        name: "工具",
        path: "/tools",
        icon: "House",
    },
    {
        name: "语录",
        path: "/saying",
        icon: "House",
    },
    {
        name: "免费api",
        path: "/free",
        icon: "House",
    },
]);

// 前往页面
const toPage = (item) => {
    router.push(item.path);
};

const toggle = inject("toggle");
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: $_bgColor;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    .nav_right {
        display: flex;
        align-items: center;
        .nav_right_item {
            display: flex;
            align-items: center;
            margin-right: 20px;
            cursor: pointer;
            .el-icon {
                margin-right: 5px;
            }
        }
    }
    .nav_left {
        display: flex;
        align-items: center;
        .nav_left_item {
            margin-right: 15px;
        }
    }
}
</style>
