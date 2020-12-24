import { axios } from '@/utils/request';
import axiosNew from 'axios';

// 账单添加
export function billAdd(data) {
  return axios({
    url: '/pc2b/bill/add',
    data: data,
    method: 'post'
  });
}

// 账单查看
export function billView(id) {
  return axios({
    url: '/pc2b/bill/view?id='+id,
    method: 'get'
  });
}

// 账单查看(来自流程)
export function billAuditView(parameter) {
    return axios({
        url: '/pc2b/bill/audit_view',
        method: 'post',
        data: parameter
    });
}

// 账单编辑
export function billEdit(data) {
  return axios({
    url: '/pc2b/bill/edit',
    data: data,
    method: 'post'
  });
}

// 账单列表
export function billList(data,that) {
  return axios({
    url: '/pc2b/bill/list',
    data: data,
    method: 'post',
    cancelToken: new axiosNew.CancelToken(function executor(c) { // 设置 cancel token
      that.source_billList = c;
    })
  });
}

// 账单列表业务数据统计
export function billBizStat(data,that) {
  return axios({
    url: '/pc2b/bill/biz_stat',
    data: data,
    method: 'post',
    cancelToken: new axiosNew.CancelToken(function executor(c) { // 设置 cancel token
      that.source_billStatusCount = c;
    })
  });
}

// 账单催收
export function billPayUrge(parameter) {
  return axios({
    url: '/pc2b/bill/pay_urge?billIdList='+parameter,
    data: parameter,
    method: 'post'
  });
}
// 账单删除
export function billDelete(id) {
  return axios({
    url: '/pc2b/bill/delete?id='+id,
    method: 'get'
  });
}
// 账单作废还原
export function billCancelRevert(id) {
  return axios({
    url: '/pc2b/bill/cancel_revert?id='+id,
    method: 'get'
  });
}
// 账单作废
export function billCancel(id) {
  return axios({
    url: '/pc2b/bill/cancel?id='+id,
    method: 'get'
  });
}

// 账单业务关联
export function bizRelation(data) {
  return axios({
    url: '/pc2b/bill/biz_relation',
    data: data,
    method: 'post'
  });
}

// // 页面根据账单ID获取账单收支
// export function getBillByBillId(id) {
//   return axios({
//     url: '/pc2b/bill/get_bill_by_bill_id?billId='+id,
//     method: 'get'
//   });
// }

// 页面根据账单ID获取账单收支
export function getBillByBillId(id) {
  return axios({
    url: '/pc2b/bill/pre_handle?id='+id,
    method: 'get'
  });
}

// 根据账单ID获取账单流水列表
export function listByBillId(id) {
  return axios({
    url: '/pc2b/bill_flow/list_by_bill_id?billId='+id,
    method: 'get'
  });
}

// 账单处理
export function billHandle(data) {
  return axios({
    url: '/pc2b/bill/handle' ,
    data: data,
    method: 'post'
  });
}

// 快速检索合同信息
export function searchContract (parameter) {
    return axios({
        url: '/pc2b/contract_pub/list_auto_complete_search',
        method: 'POST',
        data: parameter
    })
}

// 获取账单打印信息
export function getPrintInfo(id) {
  return axios({
    url: '/pc2b/bill/get_print_info?id='+id,
    method: 'get'
  });
}

// 解除线上支付绑定
export function onlinePayUnlock(parameter) {
  return axios({
    url: '/pc2b/bill/online_pay_unlock',
    method: 'post',
    data: parameter,
  });
}

// 获取线上账单信息
export function getOnlinePayInfo(parameter) {
  return axios({
    url: '/pc2b/bill/get_online_pay_info',
    method: 'post',
    data: parameter,
  });
}
//账单详情-流程
export function auditViewPaymentApply(parameter) {
  return axios({
    url: '/pc2b/bill/audit_view_payment_apply?id='+parameter,
    method: 'get',
  });
}
// 账单线上付款申请
export function billOnlinePayApply(parameter) {
  return axios({
    url: '/pc2b/bill/bill_online_pay_apply',
    method: 'post',
    data: parameter,
  });
}
// 账单批量作废
export function billBatchCancel(parameter) {
  return axios({
    url: '/pc2b/bill/batch_cancel',
    method: 'post',
    data: parameter,
  });
}
// 账单批量处理
export function billBatchHandle(parameter) {
  return axios({
    url: '/pc2b/bill/batch_handle',
    method: 'post',
    data: parameter,
  });
}