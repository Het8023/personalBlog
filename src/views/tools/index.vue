<template>
    <div class="tools">
        <div v-for="(item, index) in toolsList" :key="index" class="tools_list">
            <div class="tools_title">{{ item.name }}</div>
            <div class="tools_children">
                <div v-for="ele in item.children" class="tools_children_item" @click="toBlank(ele.url)">{{ ele.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const toolsList = ref([
    {
        name: "前端工具",
        children: [
            {
                name: "图片压缩",
                url: "https://www.miaoyasuo.com/?ref=toolsdar.cn",
            },
            {
                name: "二维码生成器",
                url: "https://cli.im/text",
            },
            {
                name: "渐变色生成器",
                url: "https://ggradient.com/",
            },
            {
                name: "弹性布局生成器",
                url: "https://cssgrid-generator.netlify.app/",
            },
            {
                name: "loading加载动画生成器",
                url: "https://css-loaders.com/classic/",
            },
            {
                name: "json在线解析工具",
                url: "https://www.json.cn/",
            },
            {
                name: "香蕉云编",
                url: "https://www.yunedit.com/",
            },
            {
                name: "软件激活码",
                url: "https://vrg123.com/",
            },
        ],
    },
    {
        name: "娱乐",
        children: [
            {
                name: "txt下载",
                url: "https://www.txl1.com/",
            },
            {
                name: "追剧",
                url: "https://tv.yucoder.cn/",
            },
            {
                name: "共享小火箭",
                url: "https://ccbaohe.com/appleID/",
            },
            {
                name: "摸鱼聊天",
                url: "https://yucoder.cn/index",
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
.tools {
    width: 100%;
    height: calc(100vh - 50px);
    position: relative;
    .tools_list {
        margin: 20px auto;
        max-width: 1200px;
        .tools_title {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
        }
        .tools_children {
            display: flex;
            flex-wrap: wrap;
            gap: 25px;
            .tools_children_item {
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
