import { axios } from '@/utils/request'

// 获取租客线索信息分页列表
export function renterClueList(data) {
    return axios({
        url: '/pc2b/renter_clue/list',
        data: data,
        method: 'post'
    });
}
// 获取线索池来源
export function getSourceChannel() {
    return axios({
        url: '/basic/dictionary/list_enable_dict_by_pid?pid=add63a4f45ba444e8ca3c57ec4193a35',
        method: 'get',
    })
}
// 添加租客线索
export function renterClueAdd(data) {
    return axios({
        url: '/pc2b/renter_clue/add',
        data: data,
        method: 'post'
    });
}
// 添加租客线索
export function renterClueEdit(data) {
    return axios({
        url: '/pc2b/renter_clue/edit',
        data: data,
        method: 'post'
    });
}
//租客线索查看
export function enterClueView(id) {
    return axios({
        url: '/pc2b/renter_clue/view?id='+id,
        method: 'get'
    });
}
//重新激活租客线索
export function renterClueReactivate(data) {
    return axios({
        url: '/pc2b/renter_clue/reactivate',
        data: data,
        method: 'post'
    });
}
//抢单
export function renterClueGrab(data) {
    return axios({
        url: '/pc2b/renter_clue/grab',
        data: data,
        method: 'post'
    });
}
//转公客
export function renterClueTurnPub(data) {
    return axios({
        url: '/pc2b/renter_clue/turn_pub',
        data: data,
        method: 'post'
    });
}
//租客线索指派
export function renterClueAssigned(empId,id) {
    return axios({
        url: '/pc2b/renter_clue/assigned?empId='+empId+'&id='+id,
        method: 'get'
    });
}
//租客线索指派限制检查
export function renterClueAssignedLimitCheck(empId,id) {
    return axios({
        url: '/pc2b/renter_clue/assigned_limit_check?empId='+empId+'&id='+id,
        method: 'get'
    });
}
// 租客线索关闭
export function renterClueClose(data) {
    return axios({
        url: '/pc2b/renter_clue/close',
        data: data,
        method: 'post'
    });
}
// 租客线索删除
export function renterClueRemove(data) {
    return axios({
        url: '/pc2b/renter_clue/remove',
        data: data,
        method: 'post'
    });
}
//根据租客线索ID获取跟进记录列表
export function listFollowUp(id) {
    return axios({
        url: '/pc2b/renter_clue/list_follow_up_by_id?id='+id,
        method: 'get'
    });
}
//根据租客线索ID获取已共享列表
export function listShared(id) {
    return axios({
        url: '/pc2b/renter_clue/list_shared_by_renter_clue_id?id='+id,
        method: 'get'
    });
}
//根据合作伙伴ID获取已共享列表
export function listSharedPartner(id,current,size) {
    return axios({
        url: '/pc2b/renter_clue/list_shared_by_partner_id?id='+id+'&current='+current+'&size='+size,
        method: 'get'
    });
}
// 租客线索跟进
export function renterClueFollowUp(data) {
    return axios({
        url: '/pc2b/renter_clue/follow_up',
        data: data,
        method: 'post'
    });
}
///////////////////////////合作伙伴
//资源合作伙伴统计
export function resourcePartnerStat(data) {
    return axios({
        url: '/pc2b/resource_partner/stat',
        data: data,
        method: 'post'
    });
}
//资源合作伙伴选择列表
export function resourcePartnerList(data) {
    return axios({
        url: '/pc2b/resource_partner/list',
        data: data,
        method: 'post'
    });
}
export function resourcePartnerListSelect(name) {
    return axios({
        url: '/pc2b/resource_partner/list_select?name='+name,
        method: 'get'
    });
}
//租客线索共享
export function resourceClueShare(data) {
    return axios({
        url: '/pc2b/renter_clue/share',
        data: data,
        method: 'post'
    });
}
//添加合作伙伴
export function resourcePartnerAdd(data) {
    return axios({
        url: '/pc2b/resource_partner/add',
        data: data,
        method: 'post'
    });
}
// 校验该公司码是否存在且返回名字
export function checkAndGetName(id) {
    return axios({
        url: '/basic/tenant_organization/simple_info/'+id,
        method: 'get'
    });
}
//合作变更
export function cooperationChange(id,status) {
    return axios({
        url: '/pc2b/resource_partner/cooperation_change?id='+id+'&status='+status,
        method: 'get'
    });
}
//预约
//预约列表
export function reservationList(data) {
    return axios({
        url: '/pc2b/reservation/list',
        data: data,
        method: 'post'
    });
}
//指派预约信息
export function reservationAssigned(data) {
    return axios({
        url: '/pc2b/reservation/assigned',
        data: data,
        method: 'post'
    });
}
//取消预约信息
export function reservationCancel(data) {
    return axios({
        url: '/pc2b/reservation/cancel',
        data: data,
        method: 'post'
    });
}
//转为私客
export function turnPrivateClue(data) {
    return axios({
        url: '/pc2b/reservation/turn_private_clue',
        data: data,
        method: 'post'
    });
}
//转为公客
export function turnPubClue(data) {
    return axios({
        url: '/pc2b/reservation/turn_pub_clue',
        data: data,
        method: 'post'
    });
}
export function reservationView(data) {
    return axios({
        url: '/pc2b/reservation/view?id='+data,
        method: 'get'
    });
}

//业主池
//委托列表信息
export function delegateList(data) {
    return axios({
        url: '/pc2b/delegate/list',
        data: data,
        method: 'post'
    });
}
//取消委托信息
export function delegateCancel(data) {
    return axios({
        url: '/pc2b/delegate/cancel',
        data: data,
        method: 'post'
    });
}
//指派委托信息
export function delegateAssigned(data) {
    return axios({
        url: '/pc2b/delegate/assigned',
        data: data,
        method: 'post'
    });
}
//转为公盘
export function delegateTurnPubClue(data) {
    return axios({
        url: '/pc2b/delegate/turn_pub_clue',
        data: data,
        method: 'post'
    });
}
//转为私盘
export function delegateTurnPrivateClue(data) {
    return axios({
        url: '/pc2b/delegate/turn_private_clue',
        data: data,
        method: 'post'
    });
}
//查看委托信息
export function delegateView(data) {
    return axios({
        url: '/pc2b/delegate/view?id='+data,
        method: 'get'
    });
}
//公、私盘
//业主线索列表
export function ownerClueList(data) {
    return axios({
        url: '/pc2b/owner_clue/list',
        data: data,
        method: 'post'
    });
}
//添加业主线索
export function ownerClueAdd(data) {
    return axios({
        url: '/pc2b/owner_clue/add',
        data: data,
        method: 'post'
    });
}
//编辑业主线索
export function ownerClueEdit(data) {
    return axios({
        url: '/pc2b/owner_clue/edit',
        data: data,
        method: 'post'
    });
}
//查看业主线索
export function ownerClueView(data) {
    return axios({
        url: '/pc2b/owner_clue/view?id='+data,
        method: 'get'
    });
}
//业主线索指派
export function ownerClueAssigned(data) {
    return axios({
        url: '/pc2b/owner_clue/assigned',
        data: data,
        method: 'post'
    });
}
//业主线索关闭
export function ownerClueClose(data) {
    return axios({
        url: '/pc2b/owner_clue/close',
        data: data,
        method: 'post'
    });
}
//业主线索跟进
export function ownerClueFollowUp(data) {
    return axios({
        url: '/pc2b/owner_clue/follow_up',
        data: data,
        method: 'post'
    });
}
//业主线索激活
export function ownerClueReactivate(data) {
    return axios({
        url: '/pc2b/owner_clue/reactivate',
        data: data,
        method: 'post'
    });
}
//业主线索共享
export function ownerClueShare(data) {
    return axios({
        url: '/pc2b/owner_clue/share',
        data: data,
        method: 'post'
    });
}
//转私盘
export function ownerClueTurnPrivate(data) {
    return axios({
        url: '/pc2b/owner_clue/turn_private',
        data: data,
        method: 'post'
    });
}
//转公盘
export function ownerClueTurnPub(data) {
    return axios({
        url: '/pc2b/owner_clue/turn_pub',
        data: data,
        method: 'post'
    });
}
//删除公私盘
export function ownerClueRemove(data) {
    return axios({
        url: '/pc2b/owner_clue/remove',
        data: data,
        method: 'post'
    });
}
//获取已共享的合作伙伴
export function ownerClueGetSharedPartner(data) {
    return axios({
        url: '/pc2b/owner_clue/get_shared_partner?id='+data,
        method: 'get'
    });
}
//根据线索ID获取跟进记录列表
export function ownerClueListFollowUp(data) {
    return axios({
        url: '/pc2b/owner_clue/list_follow_up_by_id?id='+data,
        method: 'get'
    });
}
//根据线索ID获取已共享列表
export function ownerClueListSharedByOwnerClue(data) {
    return axios({
        url: '/pc2b/owner_clue/list_shared_by_owner_clue_id?id='+data,
        method: 'get'
    });
}
//根据合作伙伴ID获取已共享分页列表
export function ownerClueListSharedByPartnerId(data) {
    return axios({
        url: '/pc2b/owner_clue/list_shared_by_partner_id',
        data: data,
        method: 'post'
    });
}
//业主线索房源常用标签集合
export function ownerClueListHouseLable() {
    return axios({
        url: '/pc2b/owner_clue/list_house_lable',
        method: 'get'
    });
}
//业主线索指派限制检查
export function ownerClueAssignedLimitCheck(data) {
    return axios({
        url: '/pc2b/owner_clue/assigned_limit_check',
        data: data,
        method: 'post'
    });
}