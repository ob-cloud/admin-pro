import { axios } from '@/utils/request'


// 添加合租房源
export function addShareHouse (parameter) {
    return axios({
        url: '/pc2b/house_share/add',
        method: 'post',
        data: parameter,
    })
}

// 获取合租房源列表
export function getShareHouseList (parameter) {
    return axios({
        url: '/pc2b/house_share/list',
        method: 'post',
        data: parameter,
    })
}

// 获取合租房源房态图
export function getShareHouseDiagram (parameter) {
    return axios({
        url: '/pc2b/house_share/diagram',
        method: 'post',
        data: parameter,
    })
}

// 获取合租房源状态统计
export function getShareHouseStatusCount (parameter) {
    return axios({
        url: '/pc2b/house_share/status_stat',
        method: 'post',
        data: parameter,
    })
}

// 获取合租子房间详情
export function getShareHouseChildRoomData (id) {
    return axios({
        url: '/pc2b/house_share/view_room?id=' + id,
        method: 'get',
    })
}

// 删除子房间
export function deleteShareChildRoom (houseRoomId) {
    return axios({
        url: '/pc2b/house_pub/delete_room?id='+ houseRoomId,
        method: 'post',
    })
}

// 编辑子房间
export function editShareChildRoom (parameter) {
    return axios({
        url: '/pc2b/house_share/edit_room',
        method: 'post',
        data: parameter,
    })
}

// 查看合租整套详情
export function getHouseData (housePid) {
    return axios({
        url: '/pc2b/house_share/view?housePid='+ housePid,
        method: 'get',
    })
}

// 变更房源状态
export function changeStatus (id,status) {
    return axios({
        url: `/pc2b/house_pub/change_status?id=${id}&status=${status}`,
        method: 'post',
    })
}

// 编辑房源
export function editHouse (parameter) {
    return axios({
        url: '/pc2b/house_share/edit',
        method: 'post',
        data: parameter,
    })
}

// 添加子间
export function addChildRoom (parameter) {
    return axios({
        url: '/pc2b/house_share/add_room',
        method: 'post',
        data: parameter,
    })
}

// 打开关闭整套房源
export function openCloseAllHouse (parameter) {
    return axios({
        url: `/pc2b/house_pub/open_close?housePid=${parameter.housePid}&op=${parameter.op}`,
        method: 'post',
    })
}

// 删除整套房源
export function deleteAllHouse (parameter) {
    return axios({
        url: `/pc2b/house_pub/delete?housePid=${parameter.housePid}`,
        method: 'post',
    })
}
