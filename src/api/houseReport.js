import { axios } from '@/utils/request'

//空置房源
// 房源空置统计列表(部门维度)
export function listVacantStatDeptDimension (parameter) {
    return axios({
        url: '/pc2b/da/house/list_vacant_stat_dept_dimension',
        method: 'POST',
        data: parameter
    })
}
// 空置统计
export function vacantStat (parameter) {
    return axios({
        url: '/pc2b/da/house/vacant_stat',
        method: 'POST',
        data: parameter
    })
}

//出房报表
// 租客合同数据统计
export function renterContractHouseDataStat (parameter) {
    return axios({
        url: '/pc2b/da/renter_contract_house/data_stat',
        method: 'POST',
        data: parameter
    })
}
// 租客合同周期分布
export function renterContractHouseListPeriodStat (parameter) {
    return axios({
        url: '/pc2b/da/renter_contract_house/list_period_stat',
        method: 'POST',
        data: parameter
    })
}
// 租客合同数据按人员或部门分类数据统计
export function renterContractHouseListDataGroupStat (parameter) {
    return axios({
        url: '/pc2b/da/renter_contract_house/list_data_group_stat',
        method: 'POST',
        data: parameter
    })
}
//租客合同报表
export function renterContractHouseList (parameter) {
    return axios({
        url: '/pc2b/da/renter_contract_house/list',
        method: 'POST',
        data: parameter
    })
}
//收房报表
// 业主合同数据统计
export function ownerContractHouseDataStat (parameter) {
    return axios({
        url: '/pc2b/da/owner_contract_house/data_stat',
        method: 'POST',
        data: parameter
    })
}
// 业主合同周期分布
export function ownerContractHouseListPeriodStat (parameter) {
    return axios({
        url: '/pc2b/da/owner_contract_house/list_period_stat',
        method: 'POST',
        data: parameter
    })
}
// 业主合同数据按人员或部门分类数据统计
export function ownerContractHouseListDataGroupStat (parameter) {
    return axios({
        url: '/pc2b/da/owner_contract_house/list_data_group_stat',
        method: 'POST',
        data: parameter
    })
}
//业主合同报表
export function ownerContractHouseList (parameter) {
    return axios({
        url: '/pc2b/da/owner_contract_house/list',
        method: 'POST',
        data: parameter
    })
}

//房源状态分析
export function houseStatusAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/house/house_status_analysis',
        method: 'POST',
        data: parameter
    })
}
//房源预定统计
export function houseBookQuantity (parameter) {
    return axios({
        url: '/pc2b/da/house/house_book_quantity',
        method: 'POST',
        data: parameter
    })
}
//房源数据运营分析列表
export function listHouseDataOperationAnalysis (parameter) {
    return axios({
        url: '/pc2b/da/house/list_house_data_operation_analysis',
        method: 'POST',
        data: parameter
    })
}
