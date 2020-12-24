import { axios } from '@/utils/request';

// 库房信息列表
export function warehouseList(data) {
  return axios({
    url: '/pc2b/warehouse/list',
    data: data,
    method: 'post'
  });
}
// 库房信息简单列表
export function warehouseListSimple() {
  return axios({
    url: '/pc2b/warehouse/list_simple',
    method: 'get'
  });
}
// 库房信息添加
export function warehouseSave(data) {
  return axios({
    url: '/pc2b/warehouse/save',
    data: data,
    method: 'post'
  });
}
// 库房信息编辑
export function warehouseEdit(data) {
  return axios({
    url: '/pc2b/warehouse/edit',
    data: data,
    method: 'post'
  });
}
// 库房信息删除
export function warehouseDelete(data) {
  return axios({
    url: '/pc2b/warehouse/delete',
    data: data,
    method: 'post'
  });

}
// 库房信息查看
export function warehouseView(id) {
  return axios({
    url: '/pc2b/warehouse/view?id='+id,
    method: 'get'
  });
}
//资产列表
export function assetsList(data) {
  return axios({
    url: '/pc2b/assets/list',
    data: data,
    method: 'post'
  });
}
//资产表信息统计
export function assetsStatusStat(data) {
  return axios({
    url: '/pc2b/assets/status_stat',
    data: data,
    method: 'post'
  });
}
//添加一条资产表信息
export function assetsAdd(data) {
  return axios({
    url: '/pc2b/assets/add',
    data: data,
    method: 'post'
  });
}
//编辑资产表信息
export function assetsEdit(data) {
  return axios({
    url: '/pc2b/assets/edit',
    data: data,
    method: 'post'
  });
}
// 根据ID获取资产表信息
export function assetsView(id) {
  return axios({
    url: '/pc2b/assets/view?id='+id,
    method: 'get'
  });
}
//根据ID删除资产表
export function assetsDelete(data) {
  return axios({
    url: '/pc2b/assets/delete',
    data: data,
    method: 'post'
  });
}
//资产调配
export function assetsAllocate(data) {
  return axios({
    url: '/pc2b/assets/allocate',
    data: data,
    method: 'post'
  });
}
//遗失
export function assetsLost(data) {
  return axios({
    url: '/pc2b/assets/lost',
    data: data,
    method: 'post'
  });
}
//查看操作记录
export function assetsOperateRecordList(data) {
  return axios({
    url: '/pc2b/assets_operate_record/list',
    data: data,
    method: 'post'
  });
}
//资产修改状态
export function assetsModifyStatus(data) {
  return axios({
    url: '/pc2b/assets/modify_status',
    data: data,
    method: 'post'
  });
}
//资产资产报废
export function assetsScrapped(data) {
  return axios({
    url: '/pc2b/assets/scrapped',
    data: data,
    method: 'post'
  });
}
//资产分类统计
export function assetsCategoryStat(data) {
  return axios({
    url: '/pc2b/assets/category_stat',
    data: data,
    method: 'post'
  });
}
//获取仓库闲置资产信息列表
export function listWarehouseIdleAssets(data) {
  return axios({
    url: '/pc2b/assets/list_warehouse_idle_assets',
    data: data,
    method: 'post'
  });
}
//批量添加
export function assetsBatchAdd(data) {
  return axios({
    url: '/pc2b/assets/batch_add',
    data: data,
    method: 'post'
  });
}
//批量调配
export function assetsBatchAllocate(data) {
  return axios({
    url: '/pc2b/assets/batch_allocate',
    data: data,
    method: 'post'
  });
}
//资产明细
export function listForHouse(data) {
  return axios({
    url: '/pc2b/assets/list_for_house',
    data: data,
    method: 'post'
  });
}
// 通过合租房源id获取合租房源下所有的房间名称
export function getRoomNameListById(id) {
  return axios({
    url: '/pc2b/house_share/get_room_name_list_by_id?houseId='+id,
    method: 'get'
  });
}