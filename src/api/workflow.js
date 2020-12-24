import { axios } from '@/utils/request'

// 我的任务列表
export function listMyTask (parameter) {
    return axios({
        url: '/pc2b/wf/operation/list_my_task',
        method: 'POST',
        data: parameter
    })
}
// 获取动作节点列表
export function listActionNode (parameter) {
    return axios({
        url: '/pc2b/wf/operation/list_action_node',
        method: 'POST',
        data: parameter
    })
}
// 我的提交实例列表
export function listMySubmitInstance (parameter) {
    return axios({
        url: '/pc2b/wf/operation/list_my_submit_instance',
        method: 'POST',
        data: parameter
    })
}
// 抄送我的实例列表
export function listCcMeInstance (parameter) {
    return axios({
        url: '/pc2b/wf/operation/list_cc_me_instance',
        method: 'POST',
        data: parameter
    })
}
// 抄送我的数据统计
export function ccMeDataStat (parameter) {
    return axios({
        url: '/pc2b/wf/operation/cc_me_data_stat',
        method: 'POST',
        data: parameter
    })
}
// 审批
export function audit (parameter) {
    return axios({
        url: '/pc2b/wf/operation/audit',
        method: 'POST',
        data: parameter
    })
}
// 查看业务实例
export function auditInstanceView (parameter) {
    return axios({
        url: '/pc2b/wf/operation/audit_instance_view',
        method: 'POST',
        data: parameter
    })
}

// 催办
export function urgeHander (parameter) {
    return axios({
        url: '/pc2b/wf/operation/urge_hander',
        method: 'POST',
        data: parameter
    })
}
//撤销
export function revoke(parameter) {
    return axios({
        url: '/pc2b/wf/operation/revoke',
        method: 'POST',
        data: parameter
    });
}