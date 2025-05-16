<template>
    <div class="free">
        <div class="free_content">
            <div v-for="(item, index) in apiList" :key="index" class="content_item" @click="toShow(item)">
                <div>{{ item.text }}</div>
                <div>
                    <el-tooltip class="box-item" effect="dark" :content="item.subtext" placement="right">
                        {{ item.subtext }}
                    </el-tooltip>
                </div>
            </div>
        </div>

        <div v-if="type" class="show">
            <template v-if="type == 'lishi'">
                <div>{{ data.day }}</div>
                <div v-for="item in data.result">
                    <span>{{ item.date }}</span>
                    <span>{{ item.title }}</span>
                </div>
            </template>
            <template v-else-if="type == 'miyu'">
                <div>{{ data.data.tip }}({{ data.data.type }})</div>
                <!-- <div>{{ data.data.type }}</div> -->
                <div>{{ data.data.topic }}</div>
                <div>{{ data.data.answer }}</div>
            </template>
            <template v-else-if="type == 'string'">{{ data }}</template>
            <template v-else-if="type == 'yhyl'">
                <div>英：{{ data.data.content }}</div>
                <div>汉：{{ data.data.note }}</div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
    getBingApi,
    getDutangApi,
    getYuluApi,
    getLishiApi,
    getYiyanApi,
    getDogApi,
    getMiyuApi,
    getUnameApi,
    getYhylApi,
} from "@/api/saying";

const apiList = ref([
    {
        text: "毒鸡汤 - 壮士可要来一碗",
        subtext: "随机输出一句扎心的话",
        url: getDutangApi,
        type: "string",
    },
    {
        text: "社会经典语录",
        subtext: "天晴了，雨停了，你又觉得国资得行了？",
        url: getYuluApi,
        type: "string",
    },
    {
        text: "历史上的今天",
        subtext: "今天发生在历史的那些事",
        url: getLishiApi,
        type: "lishi",
    },
    {
        text: "一言 ",
        subtext: "随机输出一句话",
        url: getYiyanApi,
        type: "string",
    },
    {
        text: "舔狗日记",
        subtext: "舔狗的世界有多惨",
        url: getDogApi,
        type: "string",
    },
    {
        text: "随机谜语",
        subtext: "历史悠久的传统文字游戏",
        url: getMiyuApi,
        type: "miyu",
    },
    {
        text: "网络随机取名",
        subtext: "随机取一个好听的名字",
        url: getUnameApi,
        type: "string",
    },
    {
        text: "英汉语录",
        subtext: "经典英语范句",
        url: getYhylApi,
        type: "yhyl",
    },
]);

const type = ref("");
const data = ref();
const toShow = (item) => {
    const url = item.url;
    url().then((res) => {
        data.value = res.data;
        type.value = item.type;
    });
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
.free {
    width: 100%;
    height: calc(100vh - 50px);
    position: relative;

    .free_content {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        padding: 30px;
        max-width: 1200px;
        margin: 0 auto;

        .content_item {
            width: calc(25% - 25px);
            min-height: 120px;
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

            & > div {
                line-height: 1.5;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                transition: color 0.3s ease;

                &:first-child {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }

                &:nth-child(2) {
                    font-size: 14px;
                    line-height: 1.6;
                }
            }
        }
    }

    .show {
        background: $_bgColor;
        border-radius: 16px;
        padding: 20px;
        margin: 20px auto;
        max-width: 1200px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-height: 470px;
        overflow: auto;
        & > div {
            line-height: 30px;
        }
    }
}
</style>
