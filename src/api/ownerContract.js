import { axios } from '@/utils/request'
//业主合同列表
export function ownerContractList(data) {
    return axios({
        url: '/pc2b/owner_contract/list',
        data: data,
        method: 'post'
    });
}
//业主合同统计
export function ownerContractStatusStat(data) {
    return axios({
        url: '/pc2b/owner_contract/status_stat',
        data: data,
        method: 'post'
    });
}
//业主合同查看
export function ownerContractView(id) {
    return axios({
        url: '/pc2b/owner_contract/view?id='+id,
        method: 'get'
    });
}
//业主合同查看(流程相关)
export function ownerContractAuditView(id) {
    return axios({
        url: '/pc2b/owner_contract/audit_view?id='+id,
        method: 'get'
    });
}
// 业主合同自定义收支计算
export function ownerContractCalView(data) {
    return axios({
        url: '/pc2b/owner_contract/cal_view',
        data: data,
        method: 'post'
    });
}
//业主合同添加
export function ownerContractAdd(data) {
    return axios({
        url: '/pc2b/owner_contract/add',
        data: data,
        method: 'post'
    });
}
//租客合同所有账单查看
export function billView(id) {
    return axios({
        url: '/pc2b/owner_contract/bill_view?id='+id,
        method: 'get'
    });
}
// 业主合同作废
export function obsoleteVoid(data) {
    return axios({
        url: '/pc2b/owner_contract/obsolete',
        data: data,
        method: 'post'
    });
}
// 业主合同解约收支列表
export function breakList(data) {
    return axios({
        url: '/pc2b/owner_contract/break_list',
        data: data,
        method: 'post'
    });
}
// 业主合同退租
export function breakOwner(data) {
    return axios({
        url: '/pc2b/owner_contract/break_owner',
        data: data,
        method: 'post'
    });
}
//关联房源
export function ownerContractRelated(data) {
    return axios({
        url: '/pc2b/owner_contract/related',
        data: data,
        method: 'post'
    });
}
//业主合同删除
export function ownerContractDelete(id) {
    return axios({
        url: '/pc2b/owner_contract/delete?id='+id,
        method: 'post'
    });
}
//合同重置
export function ownerContractReset(data) {
    return axios({
        url: '/pc2b/owner_contract/reset' ,
        data: data,
        method: 'post'
    });
}
// 业主编辑
export function signerEdit(data) {
    return axios({
        url: '/pc2b/owner_contract/signer_edit',
        data: data,
        method: 'post'
    });
}
//分阶
export function oneCalcSublevel(data) {
    return axios({
        url: '/pc2b/owner_contract/owner_customize_staged',
        data: data,
        method: 'post'
    });
}
// 根据房源Pid获取业主合同简要信息
export function getOwnerBaseSimple(housePid) {
    return axios({
        url: '/pc2b/owner_contract/get_owner_base_simple?housePid='+housePid ,
        method: 'get'
    });
}
// 获取业主合同退租校验信息DTO
export function getOwnerCheckInfo(housePid) {
    return axios({
        url: '/pc2b/owner_contract/get_owner_check_info?housePid='+housePid ,
        method: 'get'
    });
}



// 根据合同id  获取账单简单信息列表  bizType	是	业务类型【1、房源，2、租客，3、业主】
export function billSimpleList(id,pid,current,pageSize) {
  return axios({
      url: `/pc2b/bill/simple_list?bizType=3&id=${id}&pid=${pid}&current=${current}&pageSize=${pageSize}`,
      method: 'get'
  });
}