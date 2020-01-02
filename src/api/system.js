import { axios } from '@/utils/ajax'

export function queryPermissionList () {
  return axios({
    url: '/pro/user/queryPermissionList',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
