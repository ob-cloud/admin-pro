import { axios } from '@/utils/request'

//营销推广模块
//推广房源统计
export function statusStatPromotionHouse(parameter) {
    return axios({
        url: '/pc2b/promotion_house/status_stat',
        data: parameter,
        method: 'post'
    });
}
//推广房源列表
export function listPromotionHouse(parameter) {
    return axios({
        url: '/pc2b/promotion_house/list_promotion_house',
        data: parameter,
        method: 'post'
    });
}
//推广记录列表
export function listPromotionHistory(parameter) {
    return axios({
        url: '/pc2b/promotion_house/list_promotion_history',
        data: parameter,
        method: 'post'
    });
}
//房源上架
export function promotionHousePutOn(parameter) {
    return axios({
        url: '/pc2b/promotion_house/put_on',
        data: parameter,
        method: 'post'
    });
}
//批量房源上架
export function promotionHouseListPutOn(parameter) {
    return axios({
        url: '/pc2b/promotion_house/list_put_on',
        data: parameter,
        method: 'post'
    });
}
//房源下架
export function promotionHouseOffShelf(parameter) {
    return axios({
        url: '/pc2b/promotion_house/off_shelf',
        data: parameter,
        method: 'post'
    });
}
//房源批量下架
export function promotionHouseListOffShelf(parameter) {
    return axios({
        url: '/pc2b/promotion_house/list_off_shelf',
        data: parameter,
        method: 'post'
    });
}
//一键上架
export function promotionHouseOneKeyPutOn(parameter) {
    return axios({
        url: '/pc2b/promotion_house/one_key_put_on',
        data: parameter,
        method: 'post'
    });
}
//一键下架
export function promotionHouseOneKeyPutOff(parameter) {
    return axios({
        url: '/pc2b/promotion_house/one_key_put_off',
        data: parameter,
        method: 'post'
    });
}
//同步状态
export function promotionHouseRefreshStatus(parameter) {
    return axios({
        url: '/pc2b/promotion_house/refresh_status',
        data: parameter,
        method: 'post'
    });
}
//发房配置
//获取房源推广平台是否开通
export function promotionListPlatform(parameter) {
    return axios({
        url: '/pc2b/promotion/list_platform',
        data: parameter,
        method: 'post'
    });
}
//获取房源推广平台是否开通（已排序）
export function promotionListPlatformSort(parameter) {
    return axios({
        url: '/pc2b/promotion/list_platform_sort',
        data: parameter,
        method: 'post'
    });
}
//58公馆获取公私钥
export function promotionGetOpensslKey() {
    return axios({
        url: '/pc2b/promotion/get_openssl_key',
        method: 'post'
    });
}
//获取管家客服列表
export function promotionListAgentCustomer(parameter) {
    return axios({
        url: '/pc2b/promotion/list_agent_customer',
        method: 'post',
        data: parameter,
    });
}
//获取管家客服列表
export function promotionListCityAgentCustomer(parameter) {
    return axios({
        url: '/pc2b/promotion/list_city_agent_customer',
        method: 'post',
        data: parameter,
    });
}
//58相关接口
//开通58
export function wubaAdd(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba/add',
        method: 'post',
        data: parameter,
    });
}
//获取58授权账号列表
export function wubaList(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba/list',
        method: 'post',
        data: parameter,
    });
}
//获取管家-房管员信息列表
export function wubaListClientKeyAgent(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba/list_Client_key_agent',
        method: 'post',
        data: parameter,
    });
}
//根据ID删除房源推广授权账号表
export function wubaDelete(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba/delete',
        method: 'post',
        data: parameter,
    });
}
//校验房管员信息
export function wubaVerifyAgent(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba/verify_agent',
        method: 'post',
        data: parameter,
    });
}
//添加房管员信息
export function wubaAddAgent(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba/add_agent',
        method: 'post',
        data: parameter,
    });
}
//根据ID删除管家-房管员
export function wubaDeleteAgent(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba/delete_agent',
        method: 'post',
        data: parameter,
    });
}
//查看授权账号
export function wubaView(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba/view?id='+parameter,
        method: 'get',
    });
}
//58公馆相关接口
//开通58公馆
export function wubaFlatsAdd(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba_flats/add',
        method: 'post',
        data: parameter,
    });
}
//根据ID删除房源推广授权账号
export function wubaFlatsDelete(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba_flats/delete',
        method: 'post',
        data: parameter,
    });
}
//添加房管员信息
export function wubaFlatsAddAgent(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba_flats/add_agent',
        method: 'post',
        data: parameter,
    });
}
//根据ID删除管家-房管员
export function wubaFlatsDeleteAgent(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba_flats/delete_agent',
        method: 'post',
        data: parameter,
    });
}
//获取58公寓馆授权账号列表
export function wubaFlatsList(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba_flats/list',
        method: 'post',
        data: parameter,
    });
}
//获取推广账号对应的管家-房管员信息列表
export function wubaFlatsListClientKeyAgent(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba_flats/list_client_key_agent',
        method: 'post',
        data: parameter,
    });
}
//查看授权账号
export function wubaFlatsView(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba_flats/view?id='+parameter,
        method: 'get',
    });
}
//校验房管员信息
export function wubaFlatsVerifyAgent(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba_flats/verify_agent',
        method: 'post',
        data: parameter,
    });
}
//更新58公寓馆房管员信息
export function wubaFlatsUpdateWubaFlatsAgent(parameter) {
    return axios({
        url: '/pc2b/client_key/wuba_flats/update_wuba_flats_agent',
        method: 'post',
        data: parameter,
    });
}

//闲鱼相关
//开通闲鱼-添加账号房东主
export function fishUserAddHouseUser(parameter) {
    return axios({
        url: '/pc2b/client_key/fish_user/add_house_user',
        method: 'post',
        data: parameter,
    });
}
//删除-房东主
export function fishUserDelHouseUser(parameter) {
    return axios({
        url: '/pc2b/client_key/fish_user/del_house_user',
        method: 'post',
        data: parameter,
    });
}
//房东主列表
export function fishUserListFishUser(parameter) {
    return axios({
        url: '/pc2b/client_key/fish_user/list_fish_user',
        method: 'post',
        data: parameter,
    });
}
//查看房东主（账号）
export function fishUserViewHouseUser(parameter) {
    return axios({
        url: '/pc2b/client_key/fish_user/view_house_user?id='+parameter,
        method: 'get',
    });
}
//添加管家
export function fishUserAddHouseManager(parameter) {
    return axios({
        url: '/pc2b/client_key/fish_user/add_house_manager',
        method: 'post',
        data: parameter,
    });
}
//管家列表
export function fishUserListFishManager(parameter) {
    return axios({
        url: '/pc2b/client_key/fish_user/list_fish_manager',
        method: 'post',
        data: parameter,
    });
}
//管家列表(分页)
export function listPageFishManager(parameter) {
    return axios({
        url: '/pc2b/client_key/fish_user/list_page_fish_manager',
        method: 'post',
        data: parameter,
    });
}
//获取已绑定的所有闲鱼管家
export function fishUserBindList() {
    return axios({
        url: '/pc2b/client_key/fish_user/get_bind_user_id_list',
        method: 'get',
    });
}
//删除管家
export function fishUserDelHouseManager(parameter) {
    return axios({
        url: '/pc2b/client_key/fish_user/del_house_manager',
        method: 'post',
        data: parameter,
    });
}
//校验房管员信息
export function fishUserVerifyManager(parameter) {
    return axios({
        url: '/pc2b/client_key/fish_user/verify_manager',
        method: 'post',
        data: parameter,
    });
}
//授权状态刷新
export function fishUserRefreshStatus(parameter) {
    return axios({
        url: '/pc2b/client_key/fish_user/refresh_status?id='+parameter,
        method: 'get',
    });
}

//开通贝壳
export function shellAdd(parameter) {
    return axios({
        url: '/pc2b/client_key/shell/add',
        method: 'post',
        data: parameter,
    });
}
//获取贝壳账号列表
export function shellList(parameter) {
    return axios({
        url: '/pc2b/client_key/shell/list',
        method: 'post',
        data: parameter,
    });
}
//根据ID删除贝壳账号
export function shellDelete(parameter) {
    return axios({
        url: '/pc2b/client_key/shell/delete',
        method: 'post',
        data: parameter,
    });
}
//查看授权贝壳账号
export function shellView(parameter) {
    return axios({
        url: '/pc2b/client_key/shell/view?id='+parameter,
        method: 'get',
    });
}