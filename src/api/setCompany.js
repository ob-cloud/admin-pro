import { axios } from '@/utils/request'

//企业信息
//企业基本信息查看
export function organizationView() {
    return axios({
        url: '/basic/tenant_organization/organization_view',
        method: 'get'
    });
}
//企业基本信息编辑
export function organizationEidt(parameter) {
    return axios({
        url: '/basic/tenant_organization/organization_eidt',
        data: parameter,
        method: 'post'
    });
}
//企业申请认证
export function organizationApplyApprove(parameter) {
    return axios({
        url: '/basic/tenant_organization/apply_approve',
        data: parameter,
        method: 'post'
    });
}
//企业认证信息查看
export function organizationViewApprove() {
    return axios({
        url: '/basic/tenant_organization/view_approve',
        method: 'get'
    });
}
//企业转让
export function organizationTransferEnterprise(parameter) {
    return axios({
        url: '/pc2b/organization/transfer_enterprise',
        data: parameter,
        method: 'post'
    });
}
//企业解散
export function organizationDissolveEnterprise(parameter) {
    return axios({
        url: '/pc2b/organization/dissolve_enterprise',
        data: parameter,
        method: 'post'
    });
}
