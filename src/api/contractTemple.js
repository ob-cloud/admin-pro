import { axios } from '@/utils/request'

//***模板列表****//
export function econtTemplateList (parameter) {
    //模板列表
    return axios({
        url: '/pc2b/econt/template/list',
        method: 'post',
        data: parameter,
    })
}
export function econtTemplateParamList (parameter) {
    //模板参数列表
    return axios({
        url: '/pc2b/econt/template/param_list?ascription='+parameter,
        method: 'get',
    })
}
export function econtTemplateCreate (parameter) {
    //添加模板
    return axios({
        url: '/pc2b/econt/template/create',
        method: 'post',
        data: parameter,
    })
}
export function econtTemplateEnableDisable (parameter) {
    //模板启用禁用
    return axios({
        url: '/pc2b/econt/template/enable_disable?id='+parameter.id+'&op='+parameter.op,
        method: 'get',
    })
}
export function econtTemplateRemove (parameter) {
    //模板删除
    return axios({
        url: '/pc2b/econt/template/remove?id='+parameter.id,
        method: 'get',
    })
}
export function econtTemplatePreview (parameter) {
    //模板预览
    return axios({
        url: '/pc2b/econt/template/preview?id='+parameter.id,
        method: 'get',
    })
}
export function econtTemplateGet (parameter) {
    //模板获取
    return axios({
        url: '/pc2b/econt/template/get?id='+parameter.id,
        method: 'get',
    })
}
export function econtTemplateEdit (parameter) {
    //模板获取
    return axios({
        url: '/pc2b/econt/template/edit',
        method: 'post',
        data: parameter,
    })
}
export function econtTemplateCert (parameter) {
    //模板认证
    return axios({
        url: '/pc2b/econt/template/cert?certBodyId='+parameter.certBodyId+'&id='+parameter.id,
        method: 'get',
    })
}


//*****认证信息*******//

export function econtListCertBody (parameter) {
    //认证主体列表
    return axios({
        url: '/pc2b/econt/list_cert_body?platform='+parameter,
        method: 'get',
    })
}
export function econtPlatformReg (parameter) {
    //添加认证
    return axios({
        url: '/pc2b/econt/platform_reg',
        method: 'post',
        data: parameter,
    })
}
export function econtPlatformCancel (parameter) {
    //关闭认证
    return axios({
        url: '/pc2b/econt/platform_cancel?platform='+parameter.platform+'&regId='+parameter.regId,
        method: 'post',
    })
}
export function econtRePlatformReg (parameter) {
    //重新认证
    return axios({
        url: '/pc2b/econt/re_platform_reg/'+parameter.regId,
        method: 'post',
        data: parameter,
    })
}
