import request from "@/utils/request";

// 获取qq头像
export const getHotlistApi = () => {
    return request({
        url: "https://api.vvhan.com/api/hotlist/all",
        method: "get",
        timeout: "200000",
    });
};
