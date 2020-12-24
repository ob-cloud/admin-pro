
import { axios } from '@/utils/request'

// 工作台账单相关统计
export function getBillData () {
    return axios({
        url: '/pc2b/workbench/finance_stat',
        method: 'get',
    })
}

// 工作台合同相关统计
export function getContractData () {
    return axios({
        url: '/pc2b/workbench/contract_stat',
        method: 'post',
    })
}

// 工作台房源相关统计
export function getHouseData () {
    return axios({
        url: '/pc2b/workbench/house_stat',
        method: 'post',
    })
}

// 工作台工单相关统计
export function getWorkorderData () {
    return axios({
        url: '/pc2b/workbench/afterrent_stat',
        method: 'post',
    })
}
// 工作台租前：预约、预定相关统计
export function getWorkorderBeforeData () {
    return axios({
        url: '/pc2b/workbench/beforrent_stat',
        method: 'post',
    })
}
// 工作台-门锁统计
export function getDoorLockData () {
    return axios({
        url: '/pc2b/workbench/sd/door_lock/status_stat',
        method: 'get',
    })
}
// 工作台-电表状态统计
export function getElectricData () {
    return axios({
        url: '/pc2b/workbench/sd/electric_meter/status_stat',
        method: 'get',
    })
}
// 工作台-水表状态统计
export function getWaterData () {
    return axios({
        url: '/pc2b/workbench/sd/water_meter/status_stat',
        method: 'post',
    })
}
// 工作台-我的流程数据统计
export function getFlowData () {
    return axios({
        url: '/pc2b/workbench/wf/operation/flow_data_stat',
        method: 'get',
    })
}
//资产工作台统计
export function workbenchAssetsStat(data) {
    return axios({
        url: '/pc2b/workbench/assets/stat',
        data: data,
        method: 'post'
    });
}