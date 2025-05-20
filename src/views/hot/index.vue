<template>
    <div class="hot" v-loading="loading">
        <div v-if="hotLists" class="hot-container">
            <div class="hot-list" v-for="(list, index) in hotLists" :key="index">
                <div class="hot-list-header">
                    <h3>{{ list.name }}</h3>
                    <span class="update-time">{{ list.update_time }}</span>
                </div>
                <div class="hot-list-content">
                    <div class="hot-item" v-for="(item, idx) in list.data" :key="idx">
                        <span class="rank" :class="{ 'top-rank': idx < 3 }">{{ idx + 1 }}</span>
                        <el-tooltip class="box-item" effect="dark" :content="item.title" placement="right">
                            <a :href="item.url" target="_blank" class="title">{{ item.title }}</a>
                        </el-tooltip>
                        <!-- <a :href="item.url" target="_blank" class="title">{{ item.title }}</a> -->
                        <span class="hot-value" v-if="item.hot">{{ item.hot }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getHotlistApi } from "@/api/hot";
const hotLists = ref([]);
const loading = ref(true);

const apiList = [
    {
        name: "微博",
        url: "https://api.vvhan.com/api/hotlist/wbHot",
    },
    {
        name: "今日头条",
        url: "https://api.vvhan.com/api/hotlist/toutiao",
    },
    {
        name: "澎湃新闻",
        url: "https://api.vvhan.com/api/hotlist/pengPai",
    },
    {
        name: "虎扑",
        url: "https://api.vvhan.com/api/hotlist/huPu",
    },
    {
        name: "知乎实时热搜",
        url: "https://api.vvhan.com/api/hotlist/zhihuHot",
    },
    {
        name: "知乎每日日报",
        url: "https://api.vvhan.com/api/hotlist/zhihuDay",
    },
];

const getList = () => {
    getHotlistApi().then((res) => {
        console.log(res);
        hotLists.value = res.data.data;
        loading.value = false;
    });
};
getList();
</script>

<style scoped lang="scss">
.hot {
    overflow: auto;
    padding: 32px 0;
    //     background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
    box-sizing: border-box;

    .hot-container {
        display: flex;
        flex-wrap: wrap;
        gap: 32px;
        justify-content: center;
        max-width: 1400px;
        margin: 0 auto;
    }
    .hot-list {
        flex: 0 0 calc(33.333% - 24px);
        box-sizing: border-box;
        background: #ffffff60;
        border-radius: 16px;
        box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.07);
        padding: 24px 20px 20px 20px;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        transition: box-shadow 0.2s, transform 0.2s;
        &:hover {
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.13);
            transform: translateY(-2px) scale(1.01);
        }
        .hot-list-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 18px;
            h3 {
                font-size: 1.25rem;
                font-weight: 700;
                color: #2d3a4b;
                margin: 0;
            }
            .update-time {
                font-size: 0.9rem;
                color: #a0aec0;
            }
        }
        .hot-list-content {
            max-height: 240px;
            overflow: auto;
            /* 美化滚动条 */
            &::-webkit-scrollbar {
                width: 8px;
            }
            &::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #e0e7ef 30%, #b6c6e3 100%);
                border-radius: 6px;
            }
            &::-webkit-scrollbar-track {
                background: #f8fafc;
                border-radius: 6px;
            }
            scrollbar-color: #b6c6e3 #f8fafc;
            scrollbar-width: thin;
            .hot-item {
                display: flex;
                align-items: center;
                padding: 7px;
                border-radius: 6px;
                transition: background 0.15s;
                &:hover {
                    background: #f3f6fa;
                }
                .rank {
                    width: 28px;
                    text-align: center;
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: #b5b5b5;
                    &.top-rank {
                        color: #fff;
                        background: linear-gradient(90deg, #ffb347 0%, #ffcc33 100%);
                        border-radius: 50%;
                        width: 28px;
                        height: 28px;
                        line-height: 28px;
                        margin-right: 6px;
                        font-size: 1.15rem;
                        box-shadow: 0 2px 8px #ffe06655;
                    }
                }
                .title {
                    display: inline-block;
                    max-width: 240px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: middle;
                    font-size: 1rem;
                    color: #2d3a4b;
                    margin: 0 10px;
                    transition: color 0.15s;
                    text-decoration: none;
                    &:hover {
                        color: #2563eb;
                        text-decoration: underline;
                    }
                }
                .hot-value {
                    margin-left: auto;
                    font-size: 0.95rem;
                    color: #ff7043;
                    font-weight: 500;
                }
            }
            .hot-item-scroll {
                max-height: 200px;
                overflow-y: auto;
                margin-top: 8px;
                border-top: 1px solid #eee;
                padding-top: 8px;
                /* 美化滚动条 */
                &::-webkit-scrollbar {
                    width: 6px;
                }
                &::-webkit-scrollbar-thumb {
                    background: #e0e7ef;
                    border-radius: 4px;
                }
            }
        }
    }
}
</style>
