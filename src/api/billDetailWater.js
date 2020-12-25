import { axios } from '@/utils/request'
import axiosNew from "axios";
//账单明细+账单流水+租客转账通知
// 账单明细查看
export function billDetailView(id) {
  return axios({
    url: '/pc2b/bill_detail/view?id='+id,
    method: 'get'
  });
}

// 账单明细列表
export function billDetailList(data,that) {
  return axios({
    url: '/pc2b/bill_detail/list',
    data: data,
    method: 'post',
      cancelToken: new axiosNew.CancelToken(function executor(c) { // 设置 cancel token
          that.source_billDetailList = c;
      })
  });
}

// 账单明细列表业务数据统计
export function billDetailBizStat(data,that) {
  return axios({
    url: '/pc2b/bill_detail/biz_stat',
    data: data,
    method: 'post',
      cancelToken: new axiosNew.CancelToken(function executor(c) { // 设置 cancel token
          that.source_billDetailStatusCount = c;
      })
  });
}

// 账单流水列表
export function billFlowList(data) {
    return axios({
        url: '/pc2b/bill_flow/list',
        data: data,
        method: 'post'
    });
}
// 账单流水列表统计
export function billFlowListStat(data) {
    return axios({
        url: '/pc2b/bill_flow/list_stat',
        data: data,
        method: 'post'
    });
}
//根据账单ID获取账单流水列表
export function billFlowListByBillId(id) {
    return axios({
        url: '/pc2b/bill_flow/list_by_bill_id?billId='+id,
        method: 'get'
    });
}
// 账单流水查看
export function billFlowView(id) {
    return axios({
        url: '/pc2b/bill_flow/view?id='+id,
        method: 'get'
    });
}
// 账单流水查看（新+审批流相关）
export function billFlowAuditView(id) {
    return axios({
        url: '/pc2b/bill_flow/audit_view?id='+id,
        method: 'get'
    });
}
// 账单流水作废
export function billFlowCancellation(data) {
    return axios({
        url: '/pc2b/bill_flow/cancellation',
        data: data,
        method: 'post'
    });
}
// 账单流水删除
export function billFlowRemove(data) {
    return axios({
        url: '/pc2b/bill_flow/remove',
        data: data,
        method: 'post'
    });
}
// 获取收付款途径字典
export function getPayMethodDictionary () {
    return axios({
        url: '/basic/dictionary/list_enable_dict_by_pid?pid=7bf14df972f64b94b7da8d3ff88ead18',
        method: 'get',
    })
}
//转账通知列表
export function billTransferList(data) {
    return axios({
        url: '/pc2b/bill_transfer/list',
        data: data,
        method: 'post'
    });
}
export function billTransferBizStat(data) {
    return axios({
        url: '/pc2b/bill_transfer/biz_stat',
        data: data,
        method: 'post'
    });
}
//转账通知审核通过
export function billTransferAuditPass(data) {
    return axios({
        url: '/pc2b/bill_transfer/audit_pass',
        data: data,
        method: 'post'
    });
}
//转账通知审核驳回
export function billTransferAuditReject(data) {
    return axios({
        url: '/pc2b/bill_transfer/audit_reject',
        data: data,
        method: 'post'
    });
}
// 转账通知查看
export function billTransferView (data) {
    return axios({
        url: '/pc2b/bill_transfer/view?id='+data,
        method: 'get',
    })
}

