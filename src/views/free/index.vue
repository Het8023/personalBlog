<template>
    <div class="free">
        <div v-for="(item, index) in freeList" :key="index" class="free_list">
            <div class="free_title">{{ item.name }}</div>
            <div class="free_children">
                <div v-for="ele in item.children" class="free_children_item" @click="toBlank(ele.url)">{{ ele.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const freeList = ref([
    {
        name: "查询类",
        children: [
            {
                name: "网课题库API接口",
                url: "https://api.vvhan.com/api/tiku",
            },
        ],
    },
    {
        name: "娱乐类",
        children: [
            {
                name: "摸鱼人日历API接口",
                url: "https://api.vvhan.com/api/moyu",
            },
            {
                name: "Bing每日图片API接口",
                url: "https://api.vvhan.com/api/bing",
            },
            {
                name: "风景图片API接口",
                url: "https://api.vvhan.com/api/wallpaper/views",
            },
            {
                name: "二次元图片API接口",
                url: "https://api.vvhan.com/api/wallpaper/acg",
            },
            {
                name: "电脑分辨率美图API接口",
                url: "https://api.vvhan.com/api/wallpaper/pcGirl",
            },
            {
                name: "手机分辨率美图API接口",
                url: "https://api.vvhan.com/api/wallpaper/mobileGirl",
            },
            {
                name: "推荐头像API接口",
                url: "https://api.vvhan.com/api/avatar/recommend",
            },
            {
                name: "精选头像API接口",
                url: "https://api.vvhan.com/api/avatar/rand",
            },
            {
                name: "动漫头像API接口",
                url: "https://api.vvhan.com/api/avatar/dm",
            },
            {
                name: "男生头像API接口",
                url: "https://api.vvhan.com/api/avatar/boy",
            },
            {
                name: "女生头像API接口",
                url: "https://api.vvhan.com/api/avatar/girl",
            },
            {
                name: "小众头像API接口",
                url: "https://api.vvhan.com/api/avatar/niche",
            },
        ],
    },
]);

const toBlank = (url) => {
    window.open(url);
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
.free {
    width: 100%;
    height: calc(100vh - 50px);
    position: relative;
    .free_list {
        margin: 20px auto;
        max-width: 1200px;
        .free_title {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
        }
        .free_children {
            display: flex;
            flex-wrap: wrap;
            gap: 25px;
            .free_children_item {
                width: calc(25% - 25px);
                min-height: 70px;
                background: $_bgColor;
                border-radius: 16px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);

                    &::before {
                        opacity: 1;
                    }

                    & > div:first-child {
                        color: #409eff;
                    }
                }
            }
        }
    }
}
</style>
