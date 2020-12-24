import { axios } from '@/utils/request'

//推送消息配置控制层
//左侧小红点
export function pushMessageNotReadStat() {
    return axios({
        url: '/pc2b/push_message/not_read_stat',
        method: 'get'
    });
}
// 推送消息配置编辑
export function pushMessageConfigEdit(data) {
    return axios({
        url: '/pc2b/push_message_config/edit',
        method: 'post',
        data: data,
    });
}
//根据用户id获取推送消息配置
export function pushMessageConfigGet() {
  return axios({
    url: '/pc2b/push_message_config/get_config',
    method: 'get'
  });
}
// 推送消息配置添加
export function pushMessageConfigAdd(data) {
    return axios({
        url: '/pc2b/push_message_config/add',
        method: 'post',
        data: data,
    });
}

// 推送消息列表
export function pushMessageList(data) {
    return axios({
        url: '/pc2b/push_message/list',
        method: 'post',
        data: data,
    });
}
// 推送消息列表统计
export function pushMessageStatusStat(data) {
    return axios({
        url: '/pc2b/push_message/status_stat',
        method: 'post',
        data: data,
    });
}
// 推送消息批量删除
export function pushMessageBatchDelete(data) {
    return axios({
        url: '/pc2b/push_message/batch_delete',
        method: 'post',
        data: data,
    });
}
// 推送消息批量阅读
export function pushMessageBatchRead(data) {
    return axios({
        url: '/pc2b/push_message/batch_read',
        method: 'post',
        data: data,
    });
}