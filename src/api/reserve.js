import { axios } from '@/utils/request'


// 添加房源预定
export function addReserveHouse (parameter) {
    return axios({
        url: '/pc2b/house_book/add',
        method: 'post',
        data: parameter,
    })
}

// 快速检索房源地址
export function searchHouse (parameter) {
    return axios({
        url: '/pc2b/house_pub/list_auto_complete_search',
        method: 'POST',
        data: parameter
    })
}

// 房源预定列表
export function getReserveList (parameter) {
    return axios({
        url: '/pc2b/house_book/list',
        method: 'post',
        data: parameter,
    })
}

// 查看预定信息
export function getReserveInfo (parameter) {
    return axios({
        // url: '/pc2b/house_book/view',
        url: `/pc2b/house_book/view?id=${parameter}`,
        method: 'post',
        // data: parameter,
    })
}

// 房源预定统计
export function getReserveStatus (parameter) {
    return axios({
        url: '/pc2b/house_book/status_stat',
        method: 'post',
        data: parameter,
    })
}
// 退订房源预定信息
export function cancelReserve (parameter) {
    return axios({
        url: '/pc2b/house_book/cancel',
        method: 'post',
        data: parameter,
    })
}
// 退订房源预定信息
export function obsoleteReserve (parameter) {
    return axios({
        url: '/pc2b/house_book/obsolete',
        method: 'post',
        data: parameter,
    })
}
// 关联房源到预定信息
export function relatedReserve (parameter) {
    return axios({
        url: '/pc2b/house_book/related',
        method: 'post',
        data: parameter,
    })
}
// 根据ID删除房源预定信息
export function deleteReserve (parameter) {
    return axios({
        url: `/pc2b/house_book/delete?id=${parameter}`,
        method: 'post'
    })
}
// 根据ID删除房源预定信息
export function getSecondsRemaining (parameter) {
    return axios({
        url: `/pc2b/house_book/get_seconds_remaining?id=${parameter}`,
        method: 'get'
    })
}
// 根据ID删除房源预定信息
export function sendPaymentMsg (parameter) {
    return axios({
        url: `/pc2b/house_book/send_payment_msg?id=${parameter}`,
        method: 'get'
    })
}
