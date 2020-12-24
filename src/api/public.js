import { axios } from '@/utils/request'

// 获取租户的授权城市信息列表
export function getCityList () {
    return axios({
        url: '/basic/tenant_city/list',
        method: 'get',
    })
}

// 根据城市ID获取区域列表
export function getAreaListByCityId (cityId) {
    return axios({
        url: `/basic/region/list_area_by_city_id/${cityId}`,
        method: 'get',
    })
}

// 根据区域ID获取商圈列表
export function getTownListByAreaId (areaId) {
    return axios({
        url: `/basic/region/list_town_by_area_id/${areaId}`,
        method: 'get',
    })
}

// 根据所选城市获取小区名称/community/list/{cityId}/{keyword}
export function getCommunity(cityId, keyword) {
    return axios.request({
        url: '/basic/community/list/' + cityId + '/' + keyword,
        method: 'get'
        // data: data
    });
}

// 插入一条小区表信息
export function insertCommunity(data) {
    return axios.request({
        url: '/basic/community/insert',
        method: 'post',
        data: data
    });
}

// 根据关键字查询区域层级数据列表
export function searchRegionByKeyword (areaId) {
    return axios({
        url: `/basic/region/search_region_by_keyword/${areaId}`,
        method: 'get',
    })
}

// 根据关键字查询区域层级数据列表
export function searchRegionInfoByKeyword (data) {
    return axios({
        url: `/basic/region/search_region_info_by_keyword`,
        method: 'post',
        data: data
    })
}

// 小区查询
export function searchCommunity (cityId,keyword) {
    return axios({
        url: '/pc2b/metadata/community_search?cityId=' + cityId + '&keyword=' + keyword,
        method: 'get',
    })
}

// 获取特色配置字典
export function getTagDictionary () {
    return axios({
        url: '/basic/dictionary/list_enable_dict_by_pid?pid=1d042d534f22441d9e5358ac1cb5c568',
        method: 'get',
    })
}

// 获取公区、房间配置字典
export function getHouseDictionary () {
    return axios({
        url: '/basic/dictionary/list_enable_dict_by_pid?pid=1f05bd1d862648348591684af1e64bcc',
        method: 'get',
    })
}
//获取物品配置字典（房间）
export function getHouseConfig (parameter) {
    return axios({
        url: '/pc2b/house_pub/get_house_assets_dict',
        method: 'post',
        data: parameter
    })
}
//获取物品配置字典（房型）
export function getRoomTypeAssetsdict (parameter) {
    return axios({
        url: '/pc2b/house_pub/get_room_type_assets_dict',
        method: 'post',
        data: parameter,
    })
}
// 删除整套房源
export function deleteHouse (housePid) {
    return axios({
        url: '/pc2b/house_pub/delete?housePid=' + housePid,
        method: 'post',
    })
}

// 获取部门树
export function getDeptTree () {
    return axios({
        url: '/basic/department/get_dept_tree',
        method: 'get',
    })
}
export function getAuthDeptTree (resMark) {
    //获取部门树
    return axios({
        url: '/basic/department/get_auth_dept_tree?resMark='+resMark,
        method: 'get',
    })
}

// 根据部门号获取员工列表
export function getEmployeeList (deptId,resMark) {
    return axios({
        url: '/basic/employee/list_simple_emp?deptId=' + deptId+'&resMark='+resMark,
        method: 'get',
    })
}

// 根据部门号获取员工列表-获取更多信息（发房）
export function getEmployeeMoreList (deptId,resMark) {
    return axios({
        url: '/basic/employee/list_more_emp?deptId=' + deptId+'&resMark='+resMark,
        method: 'get',
    })
}
// 根据部门号获取员工列表-获取更多信息（开通钱包）
export function listSimpleEmpByDeptId (deptId,keyword) {
    return axios({
        url: '/basic/employee/list_simple_emp_by_dept_id?deptId=' + deptId+'&keyword='+keyword,
        method: 'get',
    })
}

// 根据关键字获取ID-NAME集合
export function getEmployeeListByKeyword (keyword,resMark) {
    return axios({
        url: '/basic/employee/list_emp_id_name_by_keyword?keyword=' + keyword+'&resMark='+resMark,
        method: 'get',
    })
}

// 根据关键字获取ID-NAME集合
export function listIdName () {
    return axios({
        url: '/basic/employee/list_id_name',
        method: 'get',
    })
}

// 根据关键字获取ID-NAME集合-更多信息（发房）
export function getEmployeeMoreListByKeyword (keyword,resMark) {
    return axios({
        url: '/basic/employee/list_emp_more_by_keyword?keyword=' + keyword+'&resMark='+resMark,
        method: 'get',
    })
}

// 删除图片
export function removePic (id) {
    return axios({
        url: process.env.VUE_APP_BASE_FILESERVER_URL + '/file_remove?id=' + id,
        method: 'get',
    })
}

// 修改图片分类
export function fileUpdate (parameter) {
    return axios({
        url: process.env.VUE_APP_BASE_FILESERVER_URL + '/file_update',
        method: 'post',
        data: parameter
    })
}

// 图片排序
export function sortPicList (parameter) {
    return axios({
        url: process.env.VUE_APP_BASE_FILESERVER_URL + '/file_list_sort',
        method: 'post',
        data: parameter
    })
}

// 根据银行卡号获取所属支行
export function getBankName (no) {
    return axios({
        url: '/basic/common/get_bank_name?no=' + no,
        method: 'get',
    })
}

// 根据字典获取费用类型
export function getCostType() {
    return axios({
        url: '/basic/dictionary/list_enable_dict_by_lable?lable=FEESUBJECT',
        method: 'get'
    });
}
// 根据字典获取物品类型
export function getGoodsType() {
    return axios({
        url: '/basic/dictionary/list_enable_dict_by_lable?lable=ITEMCONFIGURATION',
        method: 'get'
    });
}
