import Vue from 'vue'
import { axios } from '@/utils/request'
import { RECKID } from '@/store/mutation-types'

export function login (parameter) {
  axios.defaults.isEncryption = 'encryption'; //登录接口加密
  return axios({
    url: '/isc/emp_login',
    method: 'post',
    data: parameter,
  })
}

export function refreshToken() {
  let requestUrl = '/isc/refresh_token';
  if (Vue.ls.get(RECKID)) {
    requestUrl = requestUrl + '/' + Vue.ls.get(RECKID);
  }
  return axios.request({
    url: requestUrl,
    method: 'post'
  });
}
