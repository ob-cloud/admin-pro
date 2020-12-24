import { axios } from '@/utils/request'
import axiosNew from "axios";

//钱包账户表前端控制器
// 钱包账户
export function waListSimple() {
  return axios({
    url: '/wallet/wa/list_simple',
    method: 'get'
  });
}
// 钱包账户(分账)
export function waListAllAccount() {
    return axios({
        url: '/wallet/wa/list_all_account',
        method: 'get'
    });
}
// 获取钱包账户管理授权列表
export function waListAuthorize(data) {
    return axios({
        url: '/wallet/wa/list_authorize',
        method: 'post',
        data: data,
    });
}
// 钱包账户管理授权列表编辑
export function waAuthorizeListEdit(data) {
    return axios({
        url: '/wallet/wa/authorize_list_edit',
        method: 'post',
        data: data,
    });
}
// 钱包账户创建
export function waCreate(data) {
  return axios({
    url: '/wallet/wa/create',
    method: 'post',
    data: data,
  });
}
//获取绑定手机号验证码
export function waSendBindPhoneVerifyCode(data) {
    return axios({
        url: '/wallet/wa/send_bind_phone_verify_code',
        method: 'post',
        data: data,
    });
}
//绑定手机号
export function waBindPhone(data) {
    return axios({
        url: '/wallet/wa/bind_phone',
        method: 'post',
        data: data,
    });
}
//绑定手机号(新-返回绑定通商云设置密码)
export function bindPhoneAndSetPayPwdApply(data) {
    return axios({
        url: '/wallet/wa/bind_phone_and_set_pay_pwd_apply',
        method: 'post',
        data: data,
    });
}
//设置/修改交易密码
export function setPayPwdApply(data) {
    return axios({
        url: '/wallet/wa/set_pay_pwd_apply',
        method: 'post',
        data: data,
    });
}
//获取解绑验证码
export function waSendUnBindPhoneVerifyCode(data) {
    return axios({
        url: '/wallet/wa/send_unbind_phone_verify_code',
        method: 'post',
        data: data,
    });
}
//解绑手机号
export function waUnBindPhone(data) {
    return axios({
        url: '/wallet/wa/unbind_phone',
        method: 'post',
        data: data,
    });
}
//钱包账户注销
export function waCancellation(data) {
    return axios({
        url: '/wallet/wa/cancellation',
        method: 'post',
        data: data,
    });
}
//根据钱包账户ID获取钱包账户拥有者信息
export function waGetOwnerInfo(data) {
    return axios({
        url: '/wallet/wa/get_owner_info?id='+data,
        method: 'get',
    });
}
//钱包账户注销发送验证码
export function waSendCancelVerifyCode(data) {
    return axios({
        url: '/wallet/wa/send_cancel_verify_code',
        method: 'post',
        data: data,
    });
}
//根据钱包账户ID获取钱包账户金额统计
export function waAmountStat(data) {
    return axios({
        url: '/wallet/wa/amount_stat?id='+data,
        method: 'get',
    });
}
//钱包首页接口
//获取钱包账户管理授权列表
export function waListAuth() {
    return axios({
        url: '/wallet/wa/list_auth',
        method: 'get',
    });
}
//交易流水日期统计
export function tfDateStat(data) {
    return axios({
        url: '/wallet/tf/date_stat',
        method: 'post',
        data: data,
    });
}
//交易流水分页列表
export function tfList(data) {
    return axios({
        url: '/wallet/tf/list',
        method: 'post',
        data: data,
    });
}
//交易流水列表导出
export function tfListExport(data) {
    return axios({
        url: '/wallet/tf/list_export',
        method: 'post',
        data: data,
    });
}
//交易流水统计
export function tfStat(data) {
    return axios({
        url: '/wallet/tf/stat',
        method: 'post',
        data: data,
    });
}
//交易流水详情查看
export function tfView(data) {
    return axios({
        url: '/wallet/tf/view',
        method: 'post',
        data: data,
    });
}

//银行卡管理
//解绑银行卡
export function bankCardUnBind(data) {
    return axios({
        url: '/wallet/bank_card/un_bind',
        method: 'post',
        data: data,
    });
}
//绑定银行卡
export function bankCardBind(data) {
    return axios({
        url: '/wallet/bank_card/one_step_bind',
        method: 'post',
        data: data,
    });
}
//根据钱包账户ID获取银行卡简单信息列表
export function listSimpleByWaId(data) {
    return axios({
        url: '/wallet/bank_card/list_simple_by_wa_id?waId='+data,
        method: 'get',
    });
}
//银行卡预绑定
export function bankCardPreBind(data) {
    return axios({
        url: '/wallet/bank_card/pre_bind',
        method: 'post',
        data: data,
    });
}
//银行卡查看
export function bankCardView(data) {
    return axios({
        url: '/wallet/bank_card/view',
        method: 'post',
        data: data,
    });
}
//处理操作
//钱包充值预处理
export function bizPreRecharge(data) {
    return axios({
        url: '/wallet/biz/pre_recharge',
        method: 'post',
        data: data,
    });
}
//钱包充值计算手续费
export function getRechargeHandlingFee(data) {
    return axios({
        url: '/wallet/biz/get_recharge_handling_fee',
        method: 'post',
        data: data,
    });
}
//钱包账户转账申请
export function bizTransferApply(data) {
    return axios({
        url: '/wallet/biz/transfer_apply',
        method: 'post',
        data: data,
    });
}
//钱包账户提现申请
export function bizWithdrawApply(data) {
    return axios({
        url: '/wallet/biz/withdraw_apply',
        method: 'post',
        data: data,
    });
}
//后台短信验证码确认支付(--弃用)
export function bizBackSmsConfirmPay(data) {
    return axios({
        url: '/wallet/biz/back_sms_confirm_pay',
        method: 'post',
        data: data,
    });
}
//交易确认（替换后台短信验证码确认支付接口）
export function transactionConfirm(data) {
    return axios({
        url: '/wallet/biz/transaction_confirm',
        method: 'post',
        data: data,
    });
}
//重发支付短信验证码
export function bizResendPaySmsVerifyCode(data) {
    return axios({
        url: '/wallet/isc/biz/resend_pay_sms_verify_code',
        method: 'post',
        data: data,
    });
}
//扫码付执行
export function bizScanPayExec(data) {
    return axios({
        url: '/wallet/biz/scan_pay_exec?scene='+data,
        method: 'get',
    });
}
//账户电子协议签约申请
export function signContractApply(data) {
    return axios({
        url: '/wallet/isc/wa/sign_contract_apply',
        method: 'post',
        data: data,
    });
}
//变更钱包手机号（返回地址）
export function modifyBounPphoneApply(data) {
    return axios({
        url: '/wallet/wa/modify_bound_phone_apply',
        method: 'post',
        data: data,
    });
}
//钱包账户修改已绑定手机号申请(根据银行卡验证)
export function modifyBoundPhoneByBankCardApply(data) {
    return axios({
        url: '/wallet/wa/modify_bound_phone_by_bank_card_apply',
        method: 'post',
        data: data,
    });
}
//钱包账户修改已绑定手机号确认(根据银行卡验证)
export function modifyBoundPhoneByBankCardConfirm(data) {
    return axios({
        url: '/wallet/wa/modify_bound_phone_by_bank_card_confirm',
        method: 'post',
        data: data,
    });
}
//获取当前操作人钱包交易验证方式
export function getTransactionVerifyMode(data) {
    return axios({
        url: '/wallet/biz/get_transaction_verify_mode',
        method: 'post',
        data: data,
    });
}
//获取是否设置交易密码
export function getPayPwdSetStatus(data) {
    return axios({
        url: '/wallet/wa/get_pay_pwd_set_status',
        method: 'post',
        data: data,
    });
}
// 获取交易状态
export function getTransactionStatus(data) {
    return axios({
        url: '/wallet/isc/biz/get_transaction_status',
        method: 'post',
        data: data,
    });
}
//租客钱包列表（有分页）
export function listCollectionAccount(data,that) {
    return axios({
        url: '/wallet/isc/wa/list_collection_account',
        method: 'post',
        data: data,
        cancelToken: new axiosNew.CancelToken(function executor(c) { // 设置 cancel token
            that.source_listAccount = c;
        })
    });
}
//获取付款钱包基本信息
export function getWalletAuthInfo(data) {
    return axios({
        url: '/wallet/wa/get_wallet_auth_info',
        method: 'post',
        data: data,
    });
}
//修改钱包名称
export function modifyAlias(data) {
    return axios({
        url: '/pc2b/wa/modify_alias',
        method: 'post',
        data: data,
    });
}