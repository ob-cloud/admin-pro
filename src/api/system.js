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

export {
  getMenuList,
  addMenu,
  editMenu,
  queryTreeList,

  ajaxGetDictItems
}
