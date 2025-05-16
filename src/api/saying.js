import request from "@/utils/request";

// 获取qq头像
export const getQqtxApi = (params) => {
    return request({
        url: "https://api.oick.cn/api/qqtx",
        method: "get",
        params: {
            ...params,
        },
    });
};
// Bing每日图
export const getBingApi = () => {
    return request({
        url: "https://api.oick.cn/api/bing",
        method: "get",
    });
};
// 毒鸡汤
export const getDutangApi = () => {
    return request({
        url: "https://api.oick.cn/api/dutang",
        method: "get",
    });
};
// 社会经典语录
export const getYuluApi = () => {
    return request({
        url: "https://api.oick.cn/api/yulu",
        method: "get",
    });
};
// 历史上的今天
export const getLishiApi = () => {
    return request({
        url: "https://api.oick.cn/api/lishi",
        method: "get",
    });
};
// 一言
export const getYiyanApi = () => {
    return request({
        url: "https://api.oick.cn/api/yiyan",
        method: "get",
    });
};
// 舔狗日记
export const getDogApi = () => {
    return request({
        url: "https://api.oick.cn/api/dog",
        method: "get",
    });
};
// 随机谜语
export const getMiyuApi = () => {
    return request({
        url: "https://api.oick.cn/api/miyu",
        method: "get",
    });
};
// 网络随机取名
export const getUnameApi = () => {
    return request({
        url: "https://api.oick.cn/api/uname",
        method: "get",
    });
};
// 英汉语录
export const getYhylApi = () => {
    return request({
        url: "https://api.oick.cn/api/yhyl",
        method: "get",
    });
};
