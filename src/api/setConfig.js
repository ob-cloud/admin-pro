import { axios } from '@/utils/request'

//轮播图相关接口
//获取轮播信息列表
export function carouselList(parameter) {
    return axios({
        url: '/bizconfig/enterprise/carousel/list',
        data: parameter,
        method: 'post'
    });
}
//添加轮播信息
export function carouselAdd(parameter) {
    return axios({
        url: '/bizconfig/enterprise/carousel/add',
        data: parameter,
        method: 'post'
    });
}
//编辑轮播信息
export function carouselEdit(parameter) {
    return axios({
        url: '/bizconfig/enterprise/carousel/edit',
        data: parameter,
        method: 'post'
    });
}
//查看轮播信息
export function carouselView(parameter) {
    return axios({
        url: '/bizconfig/enterprise/carousel/view?id='+parameter,
        method: 'get'
    });
}
//删除轮播信息
export function carouselDelete(parameter) {
    return axios({
        url: '/bizconfig/enterprise/carousel/delete?id='+parameter,
        method: 'get'
    });
}
//轮播信息排序
export function carouselListSort(parameter) {
    return axios({
        url: '/bizconfig/enterprise/carousel/list_sort',
        data: parameter,
        method: 'post'
    });
}

//功能区配置前端控制器
//获取功能区配置信息列表
export function featuresList(parameter) {
    return axios({
        url: '/bizconfig/enterprise/features/list',
        data: parameter,
        method: 'post'
    });
}
//添加功能区配置信息
export function featuresAdd(parameter) {
    return axios({
        url: '/bizconfig/enterprise/features/add',
        data: parameter,
        method: 'post'
    });
}
//编辑功能区配置图标信息
export function featuresEditIcon(parameter) {
    return axios({
        url: '/bizconfig/enterprise/features/edit_icon',
        data: parameter,
        method: 'post'
    });
}
//启用禁用功能区配置信息
export function featuresEnableDisable(parameter) {
    return axios({
        url: '/bizconfig/enterprise/features/enable_disable',
        data: parameter,
        method: 'post'
    });
}
//功能区配置列表排序
export function featuresListSort(parameter) {
    return axios({
        url: '/bizconfig/enterprise/features/list_sort',
        data: parameter,
        method: 'post'
    });
}
//功能区配置列表保存
export function featuresSaveFeatures(parameter) {
    return axios({
        url: '/bizconfig/enterprise/features/save_features',
        data: parameter,
        method: 'post'
    });
}

//查看房屋委托信息
export function delegateView() {
    return axios({
        url: '/bizconfig/enterprise/delegate/view',
        method: 'get'
    });
}
//添加房屋委托配置
export function delegateAdd(parameter) {
    return axios({
        url: '/bizconfig/enterprise/delegate/add',
        data: parameter,
        method: 'post'
    });
}
//编辑房屋委托配置
export function delegateEdit(parameter) {
    return axios({
        url: '/bizconfig/enterprise/delegate/edit',
        data: parameter,
        method: 'post'
    });
}

//*****收付款配置*****//
//收款账号分页列表
export function collectionAccountList(parameter) {
    return axios({
        url: '/bizconfig/collection_account/list',
        data: parameter,
        method: 'post'
    });
}
//添加收款账号
export function collectionAccountAdd(parameter) {
    return axios({
        url: '/bizconfig/collection_account/add',
        data: parameter,
        method: 'post'
    });
}
//修改收款账号
export function collectionAccountEdit(parameter) {
    return axios({
        url: '/bizconfig/collection_account/edit',
        data: parameter,
        method: 'post'
    });
}
//收款账号解绑
export function collectionAccountUnBind(parameter) {
    return axios({
        url: '/bizconfig/collection_account/un_bind',
        data: parameter,
        method: 'post'
    });
}
//获取已配置账号的门店配置ID列表
export function listConfiguredStoreAccountId() {
    return axios({
        url: '/bizconfig/collection_account/list_configured_store_account_id',
        method: 'get'
    });
}
//收款账号分账设置
export function allocationSetting(parameter) {
    return axios({
        url: '/bizconfig/collection_account/allocation_setting',
        data: parameter,
        method: 'post'
    });
}
//获取收款账号分账设置
export function getAllocationSetting(parameter) {
    return axios({
        url: '/bizconfig/collection_account/get_allocation_setting',
        data: parameter,
        method: 'post'
    });
}
//收款账号启用禁用
export function collectionAccountEnableDisable(id,opType) {
    return axios({
        url: '/bizconfig/collection_account/enable_disable?id='+id+'&opType='+opType,
        method: 'get'
    });
}
//收款账号删除
export function collectionAccountRemove(parameter) {
    return axios({
        url: '/bizconfig/collection_account/remove?id='+parameter,
        method: 'get'
    });
}
//收款账号查看
export function collectionAccountView(parameter) {
    return axios({
        url: '/bizconfig/collection_account/view?id='+parameter,
        method: 'get'
    });
}
//收款账号查看
export function collectionAccountViewByDept(parameter) {
    return axios({
        url: '/bizconfig/collection_account/view_by_dept?deptId='+parameter,
        method: 'get'
    });
}
//关闭分账
export function closeAllocationSetting(parameter) {
    return axios({
        url: '/bizconfig/collection_account/close_allocation_setting',
        data: parameter,
        method: 'post'
    });
}

//流程配置相关
//流程定义分页列表
export function definitionList(parameter) {
    return axios({
        url: '/pc2b/wf/definition/list',
        data: parameter,
        method: 'post'
    });
}
//添加流程定义
export function definitionAdd(parameter) {
    return axios({
        url: '/pc2b/wf/definition/add',
        data: parameter,
        method: 'post'
    });
}
//修改流程定义
export function definitionEdit(parameter) {
    return axios({
        url: '/pc2b/wf/definition/edit',
        data: parameter,
        method: 'post'
    });
}
//删除
export function definitionRemove(parameter) {
    return axios({
        url: '/pc2b/wf/definition/remove?id='+parameter,
        method: 'get'
    });
}
//修改流程定义
export function definitionStatusChange(parameter) {
    return axios({
        url: '/pc2b/wf/definition/status_change',
        data: parameter,
        method: 'post'
    });
}
//查看流程定义
export function definitionView(parameter) {
    return axios({
        url: '/pc2b/wf/definition/view?id='+parameter,
        method: 'get'
    });
}
//查看流程定义(根据部门)
export function definitionViewByDept(parameter) {
    return axios({
        url: '/pc2b/wf/definition/view_by_dept',
        data: parameter,
        method: 'post'
    });
}

//小区管理相关
//获取租户创建的小区列表
export function communityListTenantCreate(parameter) {
    return axios({
        url: '/basic/community/list_tenant_create',
        data: parameter,
        method: 'post'
    });
}
//查看租户创建的小区
export function communityViewTenantCreate(parameter) {
    return axios({
        url: '/basic/community/view_tenant_create',
        data: parameter,
        method: 'post'
    });
}
//租户小区修改
export function communityTenantEdit(parameter) {
    return axios({
        url: '/pc2b/metadata/community/tenant_edit',
        data: parameter,
        method: 'post'
    });
}
//租户创建的小区删除
export function communityTenantCreateRemove(parameter) {
    return axios({
        url: '/pc2b/metadata/community/tenant_create_remove',
        data: parameter,
        method: 'post'
    });
}