import { getAction, postAction } from '@/utils/ajax'

// 授权登录模块
const login = (params) => postAction('/pro/auth/login', params)
const logout = (params) => postAction('/pro/auth/logout', params)
const queryPermissionList = (params) => getAction('/pro/user/queryPermissionList', params, {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

export {
  login,
  logout,
  queryPermissionList
}
