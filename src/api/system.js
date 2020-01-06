import { getAction, postAction, putAction } from '@/utils/ajax'

////// Menu
const getMenuList = (params) => getAction('/sys/menu/list', params)
const addMenu = (params) => postAction('/sys/menu/add', params)
const editMenu = (params) => putAction('/sys/menu/edit', params)

const queryTreeList = (params) => getAction('/sys/menu/queryTreeList', params)
// const queryTreeListForRole = (params)=>getAction('/sys/role/queryTreeList',params);
// const queryListAsync = (params)=>getAction('/sys/permission/queryListAsync',params);

////// User
const addUser = (params) => postAction('/sys/user/add', params)
const editUser = (params) => putAction('/sys/user/edit', params)
const queryUserRole = (params) => getAction('/sys/user/queryUserRole', params)
const getUserList = (params) => getAction('/sys/user/list', params)
const frozenBatch = (params) => putAction('/sys/user/frozenBatch', params)
const changPassword = (params) => putAction('/sys/user/changPassword', params)

///// Role
const addRole = (params) => postAction('/sys/role/add', params)
const editRole = (params) => putAction('/sys/role/edit', params)
// const getRoleList = (params)=>getAction('/sys/role/list',params);
// const deleteRole = (params)=>deleteAction('/sys/role/delete',params);
// const deleteRoleList = (params)=>deleteAction('/sys/role/deleteBatch',params);
const checkRoleCode = (params) => getAction('/sys/role/checkRoleCode', params)
const queryAllRole = (params) => getAction('/sys/role/all', params)
const queryRoleTreeList = (params) => getAction('/sys/role/queryRoleTreeList', params)

///// Dict
const ajaxGetDictItems = (code, params) => getAction(`/sys/dict/getDictItems/${code}`, params)
const addDict = (params) => postAction('/sys/dict/add', params)
const editDict = (params) => putAction('/sys/dict/edit', params)
const addDictItem = (params) => postAction('/sys/dictItem/add', params)
const editDictItem = (params) => putAction('/sys/dictItem/edit', params)
const duplicateCheck = (params) => getAction('/sys/duplicate/check', params)

///// Permission
const queryRolePermission = (params) => getAction('/sys/permission/queryRolePermission', params)
const saveRolePermission = (params) => postAction('/sys/permission/saveRolePermission', params)
const queryPermissionTreeList = (params) => getAction('/sys/role/queryPermissionTreeList', params)

///// Annoucement
const doReleaseData = (params) => getAction('/sys/announcement/doReleaseData', params)
const doReovkeData = (params) => getAction('/sys/announcement/doReovkeData', params)

export {
  // Menu
  getMenuList,
  addMenu,
  editMenu,
  queryTreeList,
  changPassword,

  // Role
  addRole,
  editRole,
  checkRoleCode,
  queryAllRole,
  queryRoleTreeList,

  // Permission
  queryRolePermission,
  saveRolePermission,
  queryPermissionTreeList,

  // User
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  frozenBatch,

  // Dict
  ajaxGetDictItems,
  addDict,
  editDict,
  addDictItem,
  editDictItem,
  duplicateCheck,

  // Annoucement
  doReleaseData,
  doReovkeData
}
