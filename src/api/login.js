import { getAction, postAction } from '@/utils/ajax'

// 授权登录模块
const login = (params) => postAction('/auth/login', params)
const logout = (params) => postAction('/auth/logout', params)
const getUserPermissionList = (params) => getAction('/user/getUserPermissionList', params)

export {
  login,
  logout,
  getUserPermissionList
}
