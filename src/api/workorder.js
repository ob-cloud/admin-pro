import { axios } from '@/utils/request'

// 快速检索房源地址
export function searchHouse (parameter) {
    return axios({
        url: '/pc2b/house_pub/list_auto_complete_search',
        method: 'POST',
        data: parameter
    })
}
//********************维修********************//
//获取维修表信息列表
export function repairList (parameter) {
    return axios({
        url: '/pc2b/repair/list',
        method: 'post',
        data: parameter,
    })
}
//统计
export function repairStatusStat (parameter) {
    return axios({
        url: '/pc2b/repair/status_stat',
        method: 'post',
        data: parameter,
    })
}
//添加
export function repairAdd (parameter) {
    return axios({
        url: '/pc2b/repair/add',
        method: 'post',
        data: parameter,
    })
}
//添加并派单
export function repairAddDispatch(parameter) {
    return axios({
        url: '/pc2b/repair/add_dispatch',
        method: 'post',
        data: parameter,
    })
}
//编辑
export function repairEdit (parameter) {
    return axios({
        url: '/pc2b/repair/edit',
        method: 'post',
        data: parameter,
    })
}
//获取维修基本信息
export function repairGet (parameter) {
    return axios({
        url: '/pc2b/repair/get?id='+parameter,
        method: 'get',
    })
}
//关联房源
export function repairRelated (parameter) {
    return axios({
        url: '/pc2b/repair/related',
        method: 'post',
        data: parameter,
    })
}
//取消工单
export function repairCancel (parameter) {
    return axios({
        url: '/pc2b/repair/cancel',
        method: 'post',
        data: parameter,
    })
}
//删除工单
export function repairDelete (parameter) {
    return axios({
        url: '/pc2b/repair/delete?id='+parameter,
        method: 'get',
    })
}
//派单
export function repairDispatch (parameter) {
    return axios({
        url: '/pc2b/repair/dispatch',
        method: 'post',
        data: parameter,
    })
}
//改派
export function repairReassign (parameter) {
    return axios({
        url: '/pc2b/repair/reassign',
        method: 'post',
        data: parameter,
    })
}
//完成
export function repairComplete (parameter) {
    return axios({
        url: '/pc2b/repair/complete',
        method: 'post',
        data: parameter,
    })
}
//评价
export function repairAppraise (parameter) {
    return axios({
        url: '/pc2b/repair/appraise',
        method: 'post',
        data: parameter,
    })
}
//验收
export function repairAccepting (parameter) {
    return axios({
        url: '/pc2b/repair/accepting',
        method: 'post',
        data: parameter,
    })
}
//详情查看
export function repairView (parameter) {
    return axios({
        url: '/pc2b/repair/view?id='+parameter,
        method: 'get',
    })
}
//详情查看(基础信息+完成信息)
export function repairAcceptingView(parameter) {
    return axios({
        url: '/pc2b/repair/accepting_view?id='+parameter,
        method: 'get',
    })
}
//是否开启验收流程
export function repairIsAcceptance() {
    return axios({
        url: '/pc2b/repair/is_acceptance',
        method: 'get',
    })
}
//获取维修表信息列表f房源
export function repairListForHouse (parameter) {
    return axios({
        url: '/pc2b/repair/list_for_house',
        method: 'post',
        data: parameter,
    })
}

//********************保洁********************//
//获取保洁表信息列表
export function cleanList (parameter) {
    return axios({
        url: '/pc2b/clean/list',
        method: 'post',
        data: parameter,
    })
}
//统计
export function cleanStatusStat (parameter) {
    return axios({
        url: '/pc2b/clean/status_stat',
        method: 'post',
        data: parameter,
    })
}
//添加
export function cleanAdd (parameter) {
    return axios({
        url: '/pc2b/clean/add',
        method: 'post',
        data: parameter,
    })
}
//添加并派单
export function cleanAddDispatch(parameter) {
    return axios({
        url: '/pc2b/clean/add_dispatch',
        method: 'post',
        data: parameter,
    })
}
//编辑
export function cleanEdit (parameter) {
    return axios({
        url: '/pc2b/clean/edit',
        method: 'post',
        data: parameter,
    })
}
//获取维修基本信息
export function cleanGet (parameter) {
    return axios({
        url: '/pc2b/clean/get?id='+parameter,
        method: 'get',
    })
}
//关联房源
export function cleanRelated (parameter) {
    return axios({
        url: '/pc2b/clean/related',
        method: 'post',
        data: parameter,
    })
}
//取消工单
export function cleanCancel (parameter) {
    return axios({
        url: '/pc2b/clean/cancel',
        method: 'post',
        data: parameter,
    })
}
//删除工单
export function cleanDelete (parameter) {
    return axios({
        url: '/pc2b/clean/delete?id='+parameter,
        method: 'get',
    })
}
//派单
export function cleanDispatch (parameter) {
    return axios({
        url: '/pc2b/clean/dispatch',
        method: 'post',
        data: parameter,
    })
}
//改派
export function cleanReassign (parameter) {
    return axios({
        url: '/pc2b/clean/reassign',
        method: 'post',
        data: parameter,
    })
}
//完成
export function cleanComplete (parameter) {
    return axios({
        url: '/pc2b/clean/complete',
        method: 'post',
        data: parameter,
    })
}
//评价
export function cleanAppraise (parameter) {
    return axios({
        url: '/pc2b/clean/appraise',
        method: 'post',
        data: parameter,
    })
}
//验收
export function cleanAccepting (parameter) {
    return axios({
        url: '/pc2b/clean/accepting',
        method: 'post',
        data: parameter,
    })
}
//详情查看
export function cleanView (parameter) {
    return axios({
        url: '/pc2b/clean/view?id='+parameter,
        method: 'get',
    })
}
//详情查看(基础信息+完成信息)
export function cleanAcceptingView(parameter) {
    return axios({
        url: '/pc2b/clean/accepting_view?id='+parameter,
        method: 'get',
    })
}
//是否开启验收流程
export function cleanIsAcceptance() {
    return axios({
        url: '/pc2b/clean/is_acceptance',
        method: 'get',
    })
}
//获取保洁表信息列表f房源
export function cleanListForHouse (parameter) {
    return axios({
        url: '/pc2b/clean/list_for_house',
        method: 'post',
        data: parameter,
    })
}

//********************配货********************//
//获取配货表信息列表
export function distributionList (parameter) {
    return axios({
        url: '/pc2b/distribution/list',
        method: 'post',
        data: parameter,
    })
}
//统计
export function distributionStatusStat (parameter) {
    return axios({
        url: '/pc2b/distribution/status_stat',
        method: 'post',
        data: parameter,
    })
}
//添加
export function distributionAdd (parameter) {
    return axios({
        url: '/pc2b/distribution/add',
        method: 'post',
        data: parameter,
    })
}
//添加并派单
export function distributionAddDispatch(parameter) {
    return axios({
        url: '/pc2b/distribution/add_dispatch',
        method: 'post',
        data: parameter,
    })
}
//编辑
export function distributionEdit (parameter) {
    return axios({
        url: '/pc2b/distribution/edit',
        method: 'post',
        data: parameter,
    })
}
//获取配货基本信息
export function distributionGet (parameter) {
    return axios({
        url: '/pc2b/distribution/get?id='+parameter,
        method: 'get',
    })
}
//关联房源
export function distributionRelated (parameter) {
    return axios({
        url: '/pc2b/distribution/related',
        method: 'post',
        data: parameter,
    })
}
//取消工单
export function distributionCancel (parameter) {
    return axios({
        url: '/pc2b/distribution/cancel',
        method: 'post',
        data: parameter,
    })
}
//删除工单
export function distributionDelete (parameter) {
    return axios({
        url: '/pc2b/distribution/delete?id='+parameter,
        method: 'post',
    })
}
//派单
export function distributionDispatch (parameter) {
    return axios({
        url: '/pc2b/distribution/dispatch',
        method: 'post',
        data: parameter,
    })
}
//改派
export function distributionReassign (parameter) {
    return axios({
        url: '/pc2b/distribution/reassign',
        method: 'post',
        data: parameter,
    })
}
//完成
export function distributionComplete (parameter) {
    return axios({
        url: '/pc2b/distribution/complete',
        method: 'post',
        data: parameter,
    })
}
//评价
export function distributionAppraise (parameter) {
    return axios({
        url: '/pc2b/distribution/appraise',
        method: 'post',
        data: parameter,
    })
}
//验收
export function distributionAccepting (parameter) {
    return axios({
        url: '/pc2b/distribution/accepting',
        method: 'post',
        data: parameter,
    })
}
//详情查看
export function distributionView (parameter) {
    return axios({
        url: '/pc2b/distribution/view?id='+parameter,
        method: 'get',
    })
}
//详情查看(基础信息+完成信息)
export function distributionAcceptingView(parameter) {
    return axios({
        url: '/pc2b/distribution/accepting_view?id='+parameter,
        method: 'get',
    })
}
//是否开启验收流程
export function distributionIsAcceptance() {
    return axios({
        url: '/pc2b/distribution/is_acceptance',
        method: 'get',
    })
}
//获取配货表信息列表f房源
export function distributionListForHouse (parameter) {
    return axios({
        url: '/pc2b/distribution/list_for_house',
        method: 'post',
        data: parameter,
    })
}

//********************投诉********************//
//是否开启验收流程
export function complaintIsAcceptance() {
    return axios({
        url: '/pc2b/complaint/is_acceptance',
        method: 'get',
    })
}
//获取投诉���信息列表
export function complaintList (parameter) {
    return axios({
        url: '/pc2b/complaint/list',
        method: 'post',
        data: parameter,
    })
}
//统计
export function complaintStatusStat (parameter) {
    return axios({
        url: '/pc2b/complaint/status_stat',
        method: 'post',
        data: parameter,
    })
}
//添加
export function complaintAdd (parameter) {
    return axios({
        url: '/pc2b/complaint/add',
        method: 'post',
        data: parameter,
    })
}
//获取投诉基本信息
export function complaintGet (parameter) {
    return axios({
        url: '/pc2b/complaint/get?id='+parameter,
        method: 'get',
    })
}
//添加
export function complaintDispatch (parameter) {
    return axios({
        url: '/pc2b/complaint/dispatch',
        method: 'post',
        data: parameter,
    })
}
//完成
export function complaintComplete (parameter) {
    return axios({
        url: '/pc2b/complaint/complete',
        method: 'post',
        data: parameter,
    })
}
//评价
export function complaintAppraise (parameter) {
    return axios({
        url: '/pc2b/complaint/appraise',
        method: 'post',
        data: parameter,
    })
}
//关联房源
export function complaintRelated (parameter) {
    return axios({
        url: '/pc2b/complaint/related',
        method: 'post',
        data: parameter,
    })
}
//取消工单
export function complaintCancel (parameter) {
    return axios({
        url: '/pc2b/complaint/cancel',
        method: 'post',
        data: parameter,
    })
}
//详情查看(基础信息+完成信息)
export function complaintAcceptingView(parameter) {
    return axios({
        url: '/pc2b/complaint/accepting_view?id='+parameter,
        method: 'get',
    })
}
//验收
export function complaintAccepting (parameter) {
    return axios({
        url: '/pc2b/complaint/accepting',
        method: 'post',
        data: parameter,
    })
}
//详情查看
export function complaintView(parameter) {
    return axios({
        url: '/pc2b/complaint/view?id='+parameter,
        method: 'get',
    })
}
//删除工单
export function complaintDelete (parameter) {
    return axios({
        url: '/pc2b/clean/complaint?id='+parameter,
        method: 'get',
    })
}
//********************建议********************//
//获取建议表信息列表
export function suggestList (parameter) {
    return axios({
        url: '/pc2b/suggest/list',
        method: 'post',
        data: parameter,
    })
}
//统计
export function suggestStatusStat (parameter) {
    return axios({
        url: '/pc2b/suggest/status_stat',
        method: 'post',
        data: parameter,
    })
}
//处理
export function suggestDealWith (parameter) {
    return axios({
        url: '/pc2b/suggest/deal_with',
        method: 'post',
        data: parameter,
    })
}
//获取建议基本信息
export function suggestGet(parameter) {
    return axios({
        url: '/pc2b/suggest/get?id='+parameter,
        method: 'get',
    })
}
//作废
export function suggestObsolete (parameter) {
    return axios({
        url: '/pc2b/suggest/obsolete',
        method: 'post',
        data: parameter,
    })
}
//删除
export function suggestRemove(parameter) {
    return axios({
        url: '/pc2b/suggest/remove?id='+parameter,
        method: 'get',
    })
}
//详情查看
export function suggestView(parameter) {
    return axios({
        url: '/pc2b/suggest/view?id='+parameter,
        method: 'get',
    })
}
//跟进房源id获取租客电话姓名
export function houseBizContract(parameter) {
    return axios({
        url: '/pc2b/house_pub/get_house_biz_contract?id='+parameter,
        method: 'get',
    })
}