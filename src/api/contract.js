import { axios } from '@/utils/request'
// 计算合同日期之间年月日
export function getContractTime(data) {
  return axios({
    url: '/pc2b/renter_contract/cal_between_date',
    data: data,
    method: 'post'
  });
}

// 校验身份证号合法性
export function checkCard(id) {
  return axios({
    url: `/basic/verification/identity_card?no=${id}`,
    method: 'get'
  });
}


// 租客合同零散租期分阶
export function renterSubleveld(data) {
  return axios({
    url: '/pc2b/renter_contract/scattered_staged',
    data: data,
    method: 'post'
  });
}

// 租客合同自定义分阶
export function oneCalcSublevel(data) {
  return axios({
    url: '/pc2b/renter_contract/customize_staged',
    data: data,
    method: 'post'
  });
}

// 租客合同自定义收支计算
export function renterContract(data) {
  return axios({
    url: '/pc2b/renter_contract/cal_view',
    data: data,
    method: 'post'
  });
}
// 租客合同添加
export function renterContractAdd(data) {
  return axios({
    url: '/pc2b/renter_contract/add',
    data: data,
    method: 'post'
  });
}

// 获取可用的字典
export function listEnableDict(id) {
  return axios({
    url: '/basic/dictionary/list_enable_dict_by_pid?pid=' + id,
    method: 'get'
  });
}

// 根据lable获取字典列表
export function dictionaryListDict(id) {
  return axios({
    url: '/basic/dictionary/list_enable_dict_by_lable?lable=' + id,
    method: 'get'
  });
}

// 租客合同零散租期分阶
export function getTenantContractList(data) {
  return axios({
    url: '/pc2b/renter_contract/list',
    data: data,
    method: 'post'
  });
}

// 租客合同统计
export function getTenantContractStatus(data) {
  return axios({
    url: '/pc2b/renter_contract/status_stat',
    data: data,
    method: 'post'
  });
}

// 租客合同查看
export function tenantContractDetail(id) {
  return axios({
    url: '/pc2b/renter_contract/view?id='+id,
    method: 'get'
  });
}
// 根据租客合同id获取合同物业交割信息
export function viewContractDelivery(id) {
  return axios({
    url: '/pc2b/renter_contract/view_contract_delivery?id='+id,
    method: 'get'
  });
}

// 租客合同查看(流程相关)
export function tenantContractAuditView(id) {
    return axios({
        url: '/pc2b/renter_contract/audit_view?id='+id,
        method: 'get'
    });
}

// 租客合同查看(退组流程相关)
export function auditBreakView(id) {
  return axios({
    url: '/pc2b/renter_contract/audit_break_view?id='+id,
    method: 'get'
  });
}

// 根据关联机构ID集合获取模板简单列表
export function getSimpleList(id) {
  return axios({
    url: '/pc2b/renter_contract/template/simple_list?id='+id,
    method: 'get'
  });
}

// 租客编辑
export function signerEdit(data) {
  return axios({
    url: '/pc2b/renter_contract/signer_edit',
    data: data,
    method: 'post'
  });
}
// 租客合同解约收支列表
export function breakList(data) {
  return axios({
    url: '/pc2b/renter_contract/break_list',
    data: data,
    method: 'post'
  });
}

// 租客合同邀请租客签字
export function inviteSign(id) {
  return axios({
    url: '/pc2b/renter_contract/invite_sign?id=' + id,
    method: 'get'
  });
}
// 发送租客确认邀请
export function inviteConfirmSend(id) {
  return axios({
    url: '/pc2b/renter_contract/invite_confirm_send?id=' + id,
    method: 'get'
  });
}


// 租客合同删除
export function deleteRenterContract(id) {
  return axios({
    url: '/pc2b/renter_contract/delete?id='+id,
    method: 'post'
  });
}
// 租客合同退租
export function breakRent(data) {
  return axios({
    url: '/pc2b/renter_contract/break_rent',
    data: data,
    method: 'post'
  });
}

// 租客合同关联到房源
export function renterContractRelated(data) {
  return axios({
    url: '/pc2b/renter_contract/related',
    data: data,
    method: 'post'
  });
}
// 租客合同退租信息查看
export function billView(id) {
  return axios({
    url: '/pc2b/renter_contract/bill_view?id='+id,
    method: 'get'
  });
}

// 租客合同退租信息查看
export function obsoleteVoid(data) {
  return axios({
    url: '/pc2b/renter_contract/obsolete',
    data: data,
    method: 'post'
  });
}

// 根据手机号获取未使用的定金
export function listByPhone(phone,houseId) {
  return axios({
    url: '/pc2b/house_book/list_by_phone?phone='+phone +'&&houseId='+houseId,
    method: 'get',
  });
}

// 账单确认收付款
export function affirmBill(data) {
  return axios({
    url: '/pc2b/bill/affirm_bill' ,
    data: data,
    method: 'post'
  });
}

// 合同重置
export function tenantContractReset(data) {
  return axios({
    url: '/pc2b/renter_contract/reset' ,
    data: data,
    method: 'post'
  });
}

// 账单确认收付款
export function contractResetValid(id) {
  return axios({
    url: '/pc2b/contract_pub/reset_valid?contractId='+id ,
    method: 'get'
  });
}

// 账单确认收付款
export function getEcontractInfo(id) {
  return axios({
    url: '/pc2b/renter_contract/get_econtact_url?id='+id ,
    method: 'get'
  });
}

// 选择账单列表
export function billSelectList(parameter) {
    return axios({
        url: '/pc2b/bill/select_list?bizType='+parameter.bizType+'&id='+parameter.id ,
        method: 'get'
    });
}


// 根据合同id  获取账单简单信息列表  bizType	是	业务类型【1、房源，2、租客，3、业主】
export function billSimpleList(id,pid,current,pageSize) {
  return axios({
      url: `/pc2b/bill/simple_list?bizType=2&id=${id}&pid=${pid}&current=${current}&pageSize=${pageSize}`,
      method: 'get'
  });
}

// 合同、业主其他费用
export function listFeeSubjectWithoutRentalFee(id) {
    return axios({
        url: '/basic/dictionary/list_fee_subject_without_rental_fee?lable=' + id,
        method: 'get'
    });
}

//物业交割相关
// 获取房源物业交割信息
export function getHouseDelivery(id) {
  return axios({
    url: '/pc2b/house_pub/get_house_delivery?houseId='+id,
    method: 'get'
  });
}
// 获取房源物业交割信息
export function editContractDelivery(data) {
  return axios({
    url: '/pc2b/renter_contract/edit_contract_delivery',
    method: 'post',
    data: data,
  });
}
// 发送物业交割确认邀请
export function deliveryConfirmSend(id) {
  return axios({
    url: '/pc2b/renter_contract/delivery_confirm_send?id='+id,
    method: 'get'
  });
}
// 租客合同退租信息查看
export function breakView(id) {
  return axios({
    url: '/pc2b/renter_contract/break_view?id='+id,
    method: 'get'
  });
}