import { axios } from '@/utils/request'

//合同模块报表 - 在租用户画像
//租客性别分析
export function genderAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_gender_analysis',
        method: 'POST',
        data: parameter
    })
}
// 租客年龄分析
export function listAgeAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_age_analysis',
        method: 'POST',
        data: parameter
    })
}
// 租客爱好分析
export function listInterestAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_interest_analysis',
        method: 'POST',
        data: parameter
    })
}
// 租客职业分析
export function listProfessionAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_profession_analysis',
        method: 'POST',
        data: parameter
    })
}
// 租客付款方式分析
export function listPeriodAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_period_analysis',
        method: 'POST',
        data: parameter
    })
}
// 租客省份分布分析
export function listProvinceAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_province_analysis',
        method: 'POST',
        data: parameter
    })
}
// 租客列表
export function renterSignerList (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list',
        method: 'POST',
        data: parameter
    })
}

//合同模块报表-违约数据分析
// 违约租客原因分析
export function listQuiteReasonAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_quite_reason_analysis',
        method: 'POST',
        data: parameter
    })
}
// 违约租客入住时长分析
export function listLiveDateAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_live_date_analysis',
        method: 'POST',
        data: parameter
    })
}
// 违约租客年龄段分析
export function listBreakAgeAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_break_age_analysis',
        method: 'POST',
        data: parameter
    })
}
// 违约违约使用付款方式分析
export function listBreakPeriodAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_break_period_analysis',
        method: 'POST',
        data: parameter
    })
}
// 违约租客职业分析
export function listBreakProfessionAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_break_profession_analysis',
        method: 'POST',
        data: parameter
    })
}
//租客违约列表
export function renterSignerlistBreak (parameter) {
    return axios({
        url: '/pc2b/da/renter_signer/list_break',
        method: 'POST',
        data: parameter
    })
}

//租客合同数据分析
//租客合同数据统计
export function renterContractDataStat (parameter) {
    return axios({
        url: '/pc2b/da/renter_contract/data_stat',
        method: 'POST',
        data: parameter
    })
}
//租客合同数据分析
export function renterContractDataAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/renter_contract/data_analysis',
        method: 'POST',
        data: parameter
    })
}
//租客合同周期分布
export function renterContractListPeriodStat (parameter) {
    return axios({
        url: '/pc2b/da/renter_contract/list_period_stat',
        method: 'POST',
        data: parameter
    })
}
//租客合同数据按日期分类数据统计
export function renterContractListDateDataStat (parameter) {
    return axios({
        url: '/pc2b/da/renter_contract/list_date_data_stat',
        method: 'POST',
        data: parameter
    })
}
//租客合同列表
export function renterContractList (parameter) {
    return axios({
        url: '/pc2b/da/renter_contract/list',
        method: 'POST',
        data: parameter
    })
}

//业主合同数据分析
//业主合同数据统计
export function ownerContractDataStat (parameter) {
    return axios({
        url: '/pc2b/da/owner_contract/data_stat',
        method: 'POST',
        data: parameter
    })
}
//业主合同数据分析
export function ownerContractDataAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/owner_contract/data_analysis',
        method: 'POST',
        data: parameter
    })
}
//业主合同周期分布
export function ownerContractListPeriodStat (parameter) {
    return axios({
        url: '/pc2b/da/owner_contract/list_period_stat',
        method: 'POST',
        data: parameter
    })
}
//业主合同数据按日期分类数据统计
export function ownerContractListDateDataStat (parameter) {
    return axios({
        url: '/pc2b/da/owner_contract/list_date_data_stat',
        method: 'POST',
        data: parameter
    })
}
//业主合同列表
export function ownerContractList (parameter) {
    return axios({
        url: '/pc2b/da/owner_contract/list',
        method: 'POST',
        data: parameter
    })
}