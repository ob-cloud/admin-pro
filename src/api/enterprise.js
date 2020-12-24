import { axios } from '@/utils/request'

// 注册
export function registration(data) {
  axios.defaults.isEncryption = 'encryption'; //接口加密
  return axios({
    url: `/isc/emp_registration`,
    method: 'post',
    data: data
  });
}

// 获取验证码
export function sendVerifyCode(id) {
  return axios({
    url: `/basic/isc/common/send_verify_code?phoneNumber=${id}`,
    method: 'get',
    data:{
        'phoneNumber':id
    }
  });
}

// 获取员工待申请公司
export function listApply(accountId) {
  return axios({
    url: `/basic/isc/employee_apply/list_apply/`+accountId,
    method: 'get'
  });
}

// 根据关键字获取城市列表
export function searchCity(keyword) {
  return axios({
    url: `/basic/isc/region/search_city/${keyword}`,
    method: 'get'
  });
}

// 自主创建公司
export function independentCreate(data) {
  return axios({
    url: `/cms/isc/organization/independent_create`,
    method: 'post',
    data: data
  });
}

// 校验该公司码是否存在且返回名字
export function checkAndGetName(id) {
  return axios({
    url: `/basic/isc/tenant_organization/get_tenant_apartment_name?tenantId=${id}`,
    method: 'get'
  });
}

// 自主加入公司
export function independentApply(data) {
  return axios({
    url: `/basic/isc/employee_apply/apply`,
    method: 'post',
    data: data
  });
}


// 重置密码
export function changePwd(data) {
  return axios({
    url: `/basic/isc/employee_account/retrieve_password`,
    method: 'post',
    data: data
  });
}
 
// 根据手机号获取到加入的企业信息
export function employeeListCompany(phone) {
  return axios({
    url: `/basic/employee/list_company/${phone}`,
    method: 'get'
  });
}

// 获取当前用户信息
export function employeeUserInfo() {
  return axios({
    url: '/basic/employee/me',
    method: 'get'
  });
}
// 切换公司
export function employeeChanegCompany(data) {
  return axios({
    url: '/change_company',
    method: 'post',
    data: data
  });
}

// 完善用户信息
export function employeeUserPerfectInfo(id, data) {
  return axios({
    url: `/basic/employee/perfect_info/${id}`,
    method: 'post',
    data: data
  });
}

// 获取公司信息
export function companyInfo(id) {
  return axios({
    url: '/basic/isc/check_and_get_name' + '?authCode=' + id,
    method: 'get'
  });
}

// 邀请注册
export function inviteApplyAccount(data) {
  return axios({
    url: '/basic/isc/employee_account/invite_apply_account',
    method: 'post',
    data: data
  });
}
// 获取当前用户管理信息
export function geManagerAccount() {
    return axios({
        url: '/basic/employee/get_manager_account',
        method: 'get'
    });
}

//获取企业认证状态（钱包）
export function getCertificationStatus() {
  return axios({
    url: '/basic/tenant_organization/certification_status',
    method: 'get'
  });
}
//修改密码
export function employeeModifyPassword(data) {
  return axios({
    url: '/basic/employee/modify_password',
    method: 'post',
    data: data
  });
}