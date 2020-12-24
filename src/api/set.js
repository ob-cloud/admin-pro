import { axios } from '@/utils/request'

//********************部门********************//
export function getDeptTreeWithStat () {
    //获取部门树(带员工统计)
  return axios({
    url: '/basic/department/get_dept_tree_with_stat',
    method: 'get',
  })
}
export function getDeptTree () {
    //获取部门树
    return axios({
        url: '/basic/department/get_dept_tree',
        method: 'get',
    })
}
export function deptCreate (parameter) {
    //添加部门
    return axios({
        url: '/basic/department/create',
        method: 'post',
        data: parameter,
    })
}
export function deptRemove (parameter) {
    //删除部门
    return axios({
        url: '/basic/department/remove?id='+parameter,
        method: 'post',
    })
}
export function deptRemoveNew (parameter) {
    //删除部门（新-带数据转移）
    return axios({
        url: '/pc2b/department/remove',
        method: 'post',
        data: parameter,
    })
}
export function dragDept (parameter) {
    //拖拽部门
    return axios({
        url: '/basic/department/drag_dept',
        method: 'post',
        data: parameter,
    })
}
export function getDeptInfo (parameter) {
    //获取部门
    return axios({
        url: '/basic/department/get?id='+parameter,
        method: 'get',
    })
}
export function deptUpdate (parameter) {
    //修改部门
    return axios({
        url: '/basic/department/update',
        method: 'post',
        data: parameter,
    })
}



//********************员工********************//
export function listEmpExtendInfo (parameter) {
    //获取员工列表
    return axios({
        url: '/basic/employee/list_emp_extend_info',
        method: 'post',
        data: parameter,
    })
}
export function employeeCreate (parameter) {
    //创建员工
    return axios({
        url: '/basic/employee/create',
        method: 'post',
        data: parameter,
    })
}
export function employeeLockEmp (parameter) {
    //锁定、解锁
    return axios({
        url: '/basic/employee/lock_emp',
        method: 'post',
        data: parameter,
    })
}
export function employeeLockEmpNew (parameter) {
    //禁用员工
    return axios({
        url: '/pc2b/employee/lock_emp',
        method: 'post',
        data: parameter,
    })
}
export function employeeBatchDisable (parameter) {
    //批量禁用
    return axios({
        url: '/basic/employee/batch_disable?empIdList='+parameter,
        method: 'post',
        data: parameter,
    })
}
export function employeeRemove (parameter) {
    //删除员工
    return axios({
        url: '/pc2b/employee/remove',
        method: 'post',
        data: parameter,
    })
}
export function employeeViewInfo (parameter) {
    //删除员工
    return axios({
        url: '/basic/employee/view_info?id='+parameter,
        method: 'get',
    })
}
export function employeeUpdate (parameter) {
    //修改员工
    return axios({
        url: '/basic/employee/update',
        method: 'post',
        data: parameter,
    })
}
export function employeeMoveDept (parameter) {
    //移动部门
    return axios({
        url: '/basic/employee/move_dept',
        method: 'post',
        data: parameter,
    })
}
export function employeeAssignDept (parameter) {
    //分配部门
    return axios({
        url: '/basic/employee/assign_dept',
        method: 'post',
        data: parameter,
    })
}
export function getInviteAuthCode () {
    //获取邀请码
    return axios({
        url: '/basic/employee/get_invite_auth_code',
        method: 'get',
    })
}

//****员工申请相关****//
export function employeeApplyList (parameter) {
    //获取员工申请信息列表
    return axios({
        url: '/basic/employee_apply/list',
        method: 'post',
        data: parameter,
    })
}
export function employeeApplyRejected (parameter) {
    //驳回员工申请
    return axios({
        url: '/basic/employee_apply/rejected',
        method: 'post',
        data: parameter,
    })
}
export function employeeApplyBatchRejected (parameter) {
    //批量驳回员工申请
    return axios({
        url: '/basic/employee_apply/batch_reject',
        method: 'post',
        data: parameter,
    })
}
export function employeeApplyBatchPass (parameter) {
    //批量申请
    return axios({
        url: '/basic/employee_apply/batch_pass',
        method: 'post',
        data: parameter,
    })
}
export function employeeApplyPass (parameter) {
    //批量申请
    return axios({
        url: '/basic/employee_apply/pass',
        method: 'post',
        data: parameter,
    })
}

//********************资源相关***********************//
export function tenantResourceGetTenantMenuTree (parameter) {
    //所有资源
    if(parameter) {
        return axios({
            url: '/basic/tenant_resource/get_tenant_menu_tree/'+parameter,
            method: 'get',
        })
    }
    else{
        return axios({
            url: '/basic/tenant_resource/get_tenant_menu_tree',
            method: 'get',
        })
    }
}
export function roleResourceDataRetrieveAssigned (parameter) {
    //所有资源
    return axios({
        url: '/basic/role_resource_data/list_retrieve_assigned?roleId='+parameter,
        method: 'get',
    })
}
export function getRoleMenuTree (parameter) {
    //资源权限接口优化
    return axios({
        url: '/basic/tenant_resource/get_role_menu_tree?roleId='+parameter,
        method: 'get',
    })
}
export function getRoleResourceDataPermissionTree (parameter) {
    //数据权限接口优化
    return axios({
        url: '/basic/tenant_resource/get_role_resource_data_permission_tree?roleId='+parameter,
        method: 'get',
    })
}
export function roleResourceSetting (roleId,parameter) {
    //数据权限接口优化
    return axios({
        url: '/basic/role_resource_data/role_resource_setting/'+roleId,
        method: 'post',
        data: parameter,
    })
}
export function roleResourceDataInsertRoleRes (parameter) {
    //修改资源权限
    return axios({
        url: '/basic/role_resource_data/insert/role_res',
        method: 'post',
        data: parameter,
    })
}
export function roleResourceDataInsertDataPermission (parameter) {
    //修改数据权限
    return axios({
        url: '/basic/role_resource_data/insert/data_permission',
        method: 'post',
        data: parameter,
    })
}





//********************角色********************//
export function roleListAll () {
    //角色列表
    return axios({
        url: '/basic/role/list_all',
        method: 'get',
    })
}
export function roleSimpleList () {
    //角色列表
    return axios({
        url: '/basic/role/simple_list',
        method: 'get',
    })
}
export function listRoleStat () {
    //角色列表(带人数)
    return axios({
        url: '/basic/role/list_role_stat',
        method: 'get',
    })
}
export function roleCreate (parameter) {
    //插入一条角色
    return axios({
        url: '/basic/role/create',
        method: 'post',
        data: parameter,
    })
}
export function roleGet (parameter) {
    //获取一条角色
    return axios({
        url: '/basic/role/get/'+parameter,
        method: 'get',
    })
}
export function roleUpdate (id,parameter) {
    //更新一条角色
    return axios({
        url: '/basic/role/update/'+id,
        method: 'post',
        data: parameter,
    })
}
export function roleRemove (id) {
    //更新一条角色
    return axios({
        url: '/basic/role/remove/'+id,
        method: 'post',
    })
}
export function roleSort (parameter) {
    //拖拽角色
    return axios({
        url: '/basic/role/sort',
        method: 'post',
        data: parameter,
    })
}

//********************字典********************//
export function dictionaryListLable (parameter) {
    //获取字典列表
    return axios({
        url: '/basic/dictionary/list_lable',
        method: 'post',
        data: parameter,
    })
}
//***房源字典***//
export function dictionaryListDic (parameter) {
    //获取房源字典列表
    return axios({
        url: '/basic/dictionary/list_dict_by_lable?lable='+parameter,
        method: 'get',
    })
}
//***禁用启用字典***//
export function dictionaryEnableDisable (id,value) {
    //获取房源字典列表
    return axios({
        url: '/basic/dictionary/enable_disable/'+id+'/'+value,
        method: 'post',
    })
}
//***添加字典****//
export function dictionaryInsert (parameter) {
    //插入一字典
    return axios({
        url: '/basic/dictionary/insert',
        method: 'post',
        data: parameter,
    })
}
//***获取字典****//
export function dictionaryGet (id) {
    //插入一字典
    return axios({
        url: '/basic/dictionary/get/'+id,
        method: 'get',
    })
}
//***修改字典****//
export function dictionaryUpdate (id,parameter) {
    //修改一字典
    return axios({
        url: '/basic/dictionary/update/'+id,
        method: 'post',
        data: parameter,
    })
}
//***删除字典****//
export function dictionaryRemove (id,parameter) {
    //删除一字典
    return axios({
        url: '/basic/dictionary/remove/'+id,
        method: 'post',
        data: parameter,
    })
}

//****根据部门集合筛选员工*********//
export function listSimpleByDeptIds (parameter) {
    return axios({
        url: '/basic/employee/list_simple_by_dept_ids',
        method: 'post',
        data: parameter,
    })
}
//****转移员工数据*********//
export function employeeTransferData (parameter) {
    return axios({
        url: '/pc2b/employee/transfer_data',
        method: 'post',
        data: parameter,
    })
}
//****转移部门数据*********//
export function departmentTransferData (parameter) {
    return axios({
        url: '/pc2b/department/transfer_data',
        method: 'post',
        data: parameter,
    })
}