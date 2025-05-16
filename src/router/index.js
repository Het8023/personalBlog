import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        // 首页
        {
            path: "/home",
            name: "home",
            component: () => import("../views/home/index.vue"),
        },
        // 工具
        {
            path: "/tools",
            name: "tools",
            component: () => import("../views/tools/index.vue"),
        },
        // 语录
        {
            path: "/saying",
            name: "saying",
            component: () => import("../views/saying/index.vue"),
        },
        // 免费api
        {
            path: "/free",
            name: "free",
            component: () => import("../views/free/index.vue"),
        },
    ],
});

export default router;
