import { axios } from '@/utils/request'

//应收/应付明细分析
// 收入支出统计
export function incomeExpendStat (parameter) {
    return axios({
        url: '/pc2b/da/fin/income_expend_stat',
        method: 'POST',
        data: parameter
    })
}
// 费用科目分布分析
export function feeSubjectAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/fin/fee_subject_analysis',
        method: 'POST',
        data: parameter
    })
}
// 日期收入支出统计
export function dateIncomeExpendStat (parameter) {
    return axios({
        url: '/pc2b/da/fin/date_income_expend_stat',
        method: 'POST',
        data: parameter
    })
}
// 现金流明细列表
export function listEstimateBillDetail(parameter) {
    return axios({
        url: '/pc2b/da/fin/list_estimate_bill_detail',
        method: 'POST',
        data: parameter
    })
}

//现金流明细
// 现金流汇总分组统计
export function paymentMethodAnalysis(parameter) {
    return axios({
        url: '/pc2b/da/fin/payment_method_analysis',
        method: 'POST',
        data: parameter
    })
}
// 现金流明细列表
export function listCashFlow(parameter) {
    return axios({
        url: '/pc2b/da/fin/list_cash_flow',
        method: 'POST',
        data: parameter
    })
}

//现金流汇总
// 现金流汇总分组统计
export function cashFlowGroupStat(parameter) {
    return axios({
        url: '/pc2b/da/fin/cash_flow_group_stat',
        method: 'POST',
        data: parameter
    })
}
// 现金流汇总分组统计
export function listCashFlowGroupStatData(parameter) {
    return axios({
        url: '/pc2b/da/fin/list_cash_flow_group_stat_data',
        method: 'POST',
        data: parameter
    })
}