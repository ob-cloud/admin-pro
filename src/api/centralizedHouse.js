import { axios } from '@/utils/request'

// 获取楼盘项目列表
export function listBuildingProject () {
    return axios({
        url: '/pc2b/house_centralized/list_building_project',
        method: 'get',
    })
}
//集中房态图
export function houseCentralizedDiagram (parameter) {
    return axios({
        url: '/pc2b/house_centralized/diagram',
        method: 'post',
        data: parameter,
    })
}
//集中房态统计
export function houseCentralizedStatusStat (parameter) {
    return axios({
        url: '/pc2b/house_centralized/status_stat',
        method: 'post',
        data: parameter,
    })
}
//集中房源列表
export function houseCentralizedList (parameter) {
    return axios({
        url: '/pc2b/house_centralized/list',
        method: 'post',
        data: parameter,
    })
}
//房间号生成器
export function roomNoGenerator (parameter) {
    return axios({
        url: '/pc2b/house_centralized/list_generator_room_no',
        method: 'post',
        data: parameter,
    })
}
//项目基本信息创建
export function houseCentralizedAdd (parameter) {
    return axios({
        url: '/pc2b/house_centralized/add',
        method: 'post',
        data: parameter,
    })
}
//删除楼盘项目
export function removeBuildingProject (parameter) {
    return axios({
        url: '/pc2b/house_centralized/remove_building_project?id='+parameter,
        method: 'post',
    })
}
//项目基本信息查看
export function houseCentralizedView (parameter) {
    return axios({
        url: '/pc2b/house_centralized/view?buildingProjectId='+parameter,
        method: 'post',
    })
}
//项目基本信息编辑
export function houseCentralizedEdit (parameter) {
    return axios({
        url: '/pc2b/house_centralized/edit',
        method: 'post',
        data: parameter,
    })
}
//获取项目楼层房间列表
export function listFloorRoom (parameter) {
    return axios({
        url: '/pc2b/house_centralized/list_floor_room?buildingProjectId='+parameter,
        method: 'post',
    })
}
//获取房型列表
export function roomTypeList (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_type/list?buildingProjectId='+parameter,
        method: 'post',
    })
}
//房态获取房型列表
//获取房型列表
export function roomTypeListSimple (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_type/list_simple',
        method: 'post',
        data: parameter,
    })
}
//添加楼盘房间
export function addBuildingHouseRoom (parameter) {
    return axios({
        url: '/pc2b/house_centralized/add_building_house_room',
        method: 'post',
        data: parameter,
    })
}
//禁用启用房间
// export function housePubOpenClose (parameter) {
//     return axios({
//         url: '/pc2b/house_pub/open_close?housePid='+parameter.housePid+'&op='+parameter.op,
//         method: 'post',
//     })
// }
//删除房间（子间）
export function housePubDeleteRoom (parameter) {
    return axios({
        url: '/pc2b/house_pub/delete?housePid='+parameter,
        method: 'post',
    })
}
//新增房型
export function roomTypeAdd (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_type/add',
        method: 'post',
        data: parameter,
    })
}
//查看房型
export function roomTypeView (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_type/view?id='+parameter,
        method: 'post',
    })
}
//编辑房型
export function roomTypeEdit (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_type/edit',
        method: 'post',
        data: parameter,
    })
}
//删除房型
export function roomTypeDelete (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_type/delete?id='+parameter,
        method: 'post',
    })
}
//配置房间
export function roomUnifiedConfig (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_unified_config',
        method: 'post',
        data: parameter,
    })
}
//查看楼盘项目扩展信息
export function projectExtendInfoView (parameter) {
    return axios({
        url: '/pc2b/house_centralized/project_extend_info/view?buildingProjectId='+parameter,
        method: 'post',
    })
}
//添加楼盘项目扩展信息
export function projectExtendInfoAdd (parameter) {
    return axios({
        url: '/pc2b/house_centralized/project_extend_info/add',
        method: 'post',
        data: parameter,
    })
}
//集中房间信息查看
export function houseCentralizedRoomView (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_view?houseId='+parameter,
        method: 'post',
    })
}
//集中房间信息编辑
export function houseCentralizedRoomEdit (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_edit',
        method: 'post',
        data: parameter,
    })
}
//独栋公区配置
export function getCentralizedHouseDictionary () {
    return axios({
        url: '/basic/dictionary/list_enable_dict_by_pid?pid=d2b2cf6da51d41e193df327045b5e1be',
        method: 'get',
    })
}
//房间启用禁用房源
export function housePubEnableDisable(parameter) {
    return axios({
        url: '/pc2b/house_pub/enable_disable?housePid='+parameter.housePid+'&op='+parameter.op,
        method: 'post',
    })
}

// 打开关闭整套房源
export function openCloseAllHouse (parameter) {
    return axios({
        url: `/pc2b/house_pub/open_close?housePid=${parameter.housePid}&op=${parameter.op}`,
        method: 'post',
    })
}
//房源常用标签集合
export function getListHouseLable () {
    return axios({
        url: '/pc2b/house_pub/list_house_lable',
        method: 'get',
    })
}
//集中详情房间信息编辑
export function roomBasicEdit (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_basic_edit',
        method: 'post',
        data: parameter,
    })
}
//集中详情房源维护人编辑
export function houseMaintainerEdit (parameter) {
    return axios({
        url: '/pc2b/house_centralized/maintainer_edit',
        method: 'post',
        data: parameter,
    })
}
//集中详情房源房型编辑
export function houseRoomTypeEdit (parameter) {
    return axios({
        url: '/pc2b/house_centralized/room_type_edit',
        method: 'post',
        data: parameter,
    })
}
//房源详情项目基本信息编辑
export function editProject (parameter) {
    return axios({
        url: '/pc2b/house_centralized/edit_project',
        method: 'post',
        data: parameter,
    })
}
//房源详情项目基本信息编辑
export function houseCentralizedPermissionDataEdit (parameter) {
    return axios({
        url: '/pc2b/house_centralized/permission_data_edit',
        method: 'post',
        data: parameter,
    })
}
//获取项目管理列表
export function listProjectManage (parameter) {
    return axios({
        url: '/pc2b/house_centralized/list_project_manage',
        method: 'post',
        data: parameter,
    })
}