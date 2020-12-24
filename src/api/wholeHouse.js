import { axios } from '@/utils/request'

// 删除整套房源
export function getWholeHouseList (parameter) {
    return axios({
        url: '/pc2b/house_whole/list',
        method: 'post',
        data: parameter,
    })
}

// 获取整租房源房态图
export function getWholeHouseDiagram (parameter) {
    return axios({
        url: '/pc2b/house_whole/diagram',
        method: 'post',
        data: parameter,
    })
}

// 添加整租房源
export function addWholeHouse (parameter) {
    return axios({
        url: '/pc2b/house_whole/add',
        method: 'post',
        data: parameter,
    })
}

// 获取整租房源状态统计
export function getWholeHouseStatusCount (parameter) {
    return axios({
        url: '/pc2b/house_whole/status_stat',
        method: 'post',
        data: parameter,
    })
}

// 查看整租房源信息
export function getWholeHouseData (houseId) {
    return axios({
        url: '/pc2b/house_whole/view?houseId='+ houseId,
        method: 'post',
    })
}

// 编辑整租房源
export function editHouse (parameter) {
    return axios({
        url: '/pc2b/house_whole/edit',
        method: 'post',
        data: parameter,
    })
}

// 根据房源id获取所有预定信息-房源详情列表
export function listAllNyHouseId(id) {
  return axios({
    url: `/pc2b/house_book/list_all_by_houseId?houseId=${id}`,
    method: 'get'
  });
}

// 根据房源ID集合获取租客合同简单信息-房源详情列表
export function listContractSimpleByHouseId(id) {
  return axios({
    url: `/pc2b/renter_contract/list_contract_simple_by_houseId?houseId=${id}`,
    method: 'get'
  });
}
// 根据房源  获取账单简单信息列表  bizType	是	业务类型【1、房源，2、租客，3、业主】
export function billSimpleList(id,pid,current,pageSize) {
  return axios({
    url: `/pc2b/bill/simple_list?bizType=0&id=${id}&pid=${pid}&current=${current}&pageSize=${pageSize}`,
    method: 'get'
  });
}

// 根据房源PID集合获取业主合同简单信息-房源详情列表
export function listContractSimpleByHousePId(id) {
  return axios({
    url: `/pc2b/owner_contract/list_contract_simple_by_housePId?housePId=${id}`,
    method: 'get'
  });
}

// 变更房源状态
export function changeStatus (id,status) {
    return axios({
        url: `/pc2b/house_pub/change_status?id=${id}&status=${status}`,
        method: 'post',
    })
}

// 编辑整租房源备注信息
export function houseWholeCommentEdit (parameter) {
    return axios({
        url: '/pc2b/house_whole/comment_edit',
        method: 'post',
        data: parameter,
    })
}