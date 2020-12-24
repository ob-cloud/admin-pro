import { axios } from '@/utils/request'



// 获取分散房源房态图
export function houseDecentralizedDiagram(parameter) {
    return axios({
        url: '/pc2b/house_decentralized/diagram',
        method: 'post',
        data: parameter,
    })
}

// 获取分散房源状态统计
export function houseDecentralizedstatusStat (parameter) {
    return axios({
        url: '/pc2b/house_decentralized/status_stat',
        method: 'post',
        data: parameter,
    })
}

// 获取分散列表
export function houseDecentralizedList (parameter) {
    return axios({
        url: '/pc2b/house_decentralized/list',
        method: 'post',
        data: parameter,
    })
}
// 编辑合租子房间
export function editShareChildRoom(parameter) {
    return axios({
        url: '/pc2b/house_share/edit_room',
        method: 'post',
        data: parameter,
    })
}
// 编辑合租房源
export function editShareEdit(parameter) {
    return axios({
        url: '/pc2b/house_share/edit',
        method: 'post',
        data: parameter,
    })
}
//编辑整租房源基本信息
export function houseWholeBasicEdit(parameter) {
    return axios({
        url: '/pc2b/house_whole/basic_edit',
        method: 'post',
        data: parameter,
    })
}
//编辑整租合租房源负责人信息
export function housePubMaintainerEdit(parameter) {
    return axios({
        url: '/pc2b/house_pub/maintainer_edit',
        method: 'post',
        data: parameter,
    })
}
//编辑整租房源图片信息
export function houseWholePicEdit(parameter) {
    return axios({
        url: '/pc2b/house_whole/pic_edit',
        method: 'post',
        data: parameter,
    })
}
//编辑整租合租房源备注信息
export function housePubCommentEdit(parameter) {
    return axios({
        url: '/pc2b/house_pub/comment_edit',
        method: 'post',
        data: parameter,
    })
}
//编辑整租合租房源负责人信息
export function housePubPermissionDataEdit(parameter) {
    return axios({
        url: '/pc2b/house_pub/permission_data_edit',
        method: 'post',
        data: parameter,
    })
}
//批量修改房源归属门店、负责人
export function batchModifyHouseAttribution(parameter) {
    return axios({
        url: '/pc2b/house_decentralized/batch_modify_house_attribution',
        method: 'post',
        data: parameter,
    })
}
//批量修改房源价格
export function batchModifyHousePrice(parameter) {
    return axios({
        url: '/pc2b/house_decentralized/batch_modify_house_price',
        method: 'post',
        data: parameter,
    })
}
//批量修改房源价格
export function batchModifyHouseInfo(parameter) {
    return axios({
        url: '/pc2b/house_decentralized/batch_modify_house_info',
        method: 'post',
        data: parameter,
    })
}
