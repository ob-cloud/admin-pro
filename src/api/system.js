import { getAction, postAction, putAction } from '@/utils/ajax'

////// Menu

const getMenuList = (params) => getAction('/sys/menu/list', params)
const addMenu = (params) => postAction('/sys/menu/add', params)
const editMenu = (params) => putAction('/sys/menu/edit', params)

const queryTreeList = (params) => getAction('/sys/menu/queryTreeList', params)
// const queryTreeListForRole = (params)=>getAction('/sys/role/queryTreeList',params);
// const queryListAsync = (params)=>getAction('/sys/permission/queryListAsync',params);

///// Dict

const ajaxGetDictItems = (code, params) => getAction(`/sys/dict/getDictItems/${code}`, params)

const addDict = (params) => postAction("/sys/dict/add", params)
const editDict = (params) => putAction("/sys/dict/edit", params)

const addDictItem = (params) => postAction("/sys/dictItem/add", params)
const editDictItem = (params) => putAction("/sys/dictItem/edit", params)

const duplicateCheck = (params) => getAction("/sys/duplicate/check", params)

export {
  getMenuList,
  addMenu,
  editMenu,
  queryTreeList,

  ajaxGetDictItems,
  addDict,
  editDict,
  addDictItem,
  editDictItem,
  duplicateCheck
}
