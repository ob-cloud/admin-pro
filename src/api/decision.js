import { axios } from '@/utils/request'

//决策相关
// 获取决策表信息列表
export function decisionList (parameter) {
    return axios({
        url: '/pc2b/decision/list',
        method: 'POST',
        data: parameter
    })
}
// 插入一条决策表信息
export function decisionAdd (parameter) {
    return axios({
        url: '/pc2b/decision/add',
        method: 'POST',
        data: parameter
    })
}
// 更新决策表信息
export function decisionEdit (parameter) {
    return axios({
        url: '/pc2b/decision/edit',
        method: 'POST',
        data: parameter
    })
}
// 根据ID获取决策表信息
export function decisionGet (parameter) {
    return axios({
        url: '/pc2b/decision/get?id='+parameter,
        method: 'GET',
    })
}
// 根据ID删除决策表
export function decisionRemove (parameter) {
    return axios({
        url: '/pc2b/remove/get?id='+parameter,
        method: 'POST',
    })
}

//默认字段配置块
// 获取门店
export function listStoreDept () {
    return axios({
        url: '/basic/department/list_store_dept',
        method: 'GET',
    })
}
// 模块字段配置列表
export function moduleFieldConfigList (parameter) {
    return axios({
        url: '/bizconfig/module_field_config/list',
        method: 'POST',
        data: parameter,
    })
}
// 添加模块字段配置
export function moduleFieldConfigAdd (parameter) {
    return axios({
        url: '/bizconfig/module_field_config/add',
        method: 'POST',
        data: parameter,
    })
}
// 编辑模块字段配置
export function moduleFieldConfigEdit (parameter) {
    return axios({
        url: '/bizconfig/module_field_config/edit',
        method: 'POST',
        data: parameter,
    })
}
// 获取模块决策获取初始化字段
export function moduleFieldConfigGet (parameter) {
    return axios({
        url: '/bizconfig/module_field_config/get',
        method: 'POST',
        data: parameter,
    })
}
// 获取业务决策简单信息
export function bizDecisionGet (parameter) {
    return axios({
        url: '/bizconfig/decision/get_biz_decision',
        method: 'POST',
        data: parameter,
    })
}
// 删除模块字段配置
export function moduleFieldConfigRemove (parameter) {
    return axios({
        url: '/bizconfig/module_field_config/remove',
        method: 'POST',
        data: parameter,
    })
}




