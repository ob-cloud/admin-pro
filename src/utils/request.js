import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {notification, message} from 'ant-design-vue'
import {VueAxios} from './axios'
import {ACCESS_TOKEN, LOGINTIME, USERNAME} from '@/store/mutation-types'
import {Encrypt,Decrypt} from '@/utils/crypto';
import pako from '@/utils/pako';
import {refreshToken} from '@/api/login';

Vue.use(notification)
Vue.use(message)

// 创建 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
    timeout: 30000, // 请求超时时间
})

const err = (error) => {
    if (error.response) {
        const data = error.response.data
        const token = Vue.ls.get(ACCESS_TOKEN)
        const username = Vue.ls.get(USERNAME)

        if (error.response.status === 401) {
            if (token && username) {
                store.commit('SET_SHOW_RELOGIN_DIALOG',true)
            }else{
                Vue.ls.remove(ACCESS_TOKEN)
                window.location.reload()
            }
        }else{
            notification.error({
                message: '网络错误',
                description: data.message
            });
        }
    }
    return Promise.reject(error)
}

let canRefreshToken = true;

// request interceptor
service.interceptors.request.use(config => {
    const token = Vue.ls.get(ACCESS_TOKEN);
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    // if (config.url.indexOf('emp_login') > -1){
    //     Vue.ls.set(LOGINTIME, Date.now())
    // }
    // if (config.url.indexOf('/isc/refresh_token') == -1 && token) {
    //     const loginTime = Vue.ls.get(LOGINTIME);
    //     if (canRefreshToken && loginTime && (Date.now() - loginTime > 300 * 1000)) {
    //         canRefreshToken = false;
    //         refreshToken().then(res => {
    //             // console.log(res, 'res')
    //             if (res.code == 200){
    //                 canRefreshToken = true;
    //                 Vue.ls.set(LOGINTIME, Date.now())
    //                 Vue.ls.set(ACCESS_TOKEN, res.data.token)
    //             }
    //         }).catch(err => {
    //             console.log(err);
    //             canRefreshToken = true;
    //         });
    //     }
    // }
    if (config.url.indexOf('/isc/emp_login') == -1) {
        service.defaults.isEncryption = '';   // 不是登录接口时清除加密
    }
    if (
        config.url.indexOf('emp_login') > -1 ||
        config.url.indexOf('refresh_token') > -1 ||
        config.url.indexOf('change_company') > -1 ||
        config.url.indexOf('/isc/emp_registration') > -1
    ) {
        config.withCredentials = true;      // 后台要求请求头添加cookie
    }
    // if (service.defaults.isEncryption === 'encryption') { //判断接口是否需要加密
    //     // 该接口需要加密
    //     config.headers['en-ch'] = Date.now();
    //     config.data = {
    //         data: Encrypt(JSON.stringify(config.data))
    //     };
    // }
    if ( process.env.NODE_ENV != 'development' &&
        !(config.url.indexOf('/pc2b/econt/template/create') > -1 ||
        config.url.indexOf('/pc2b/econt/template/edit') > -1 ||
        config.url.indexOf('/bizconfig/enterprise/carousel/add') > -1 ||
        config.url.indexOf('/bizconfig/enterprise/carousel/edit') > -1 ||
        config.url.indexOf('/basic/enterprise/carousel/add') > -1 ||
        config.url.indexOf('/basic/enterprise/carousel/edit') > -1)
    ){
        config.headers['en-ch'] = Date.now();
        config.data = {
            data: Encrypt(JSON.stringify(config.data))
        };
    }
    if ( config.url.indexOf('/pc2b/econt/template/create') > -1 ||
        config.url.indexOf('/pc2b/econt/template/edit') > -1 ||
        config.url.indexOf('/bizconfig/enterprise/carousel/add') > -1 ||
        config.url.indexOf('/bizconfig/enterprise/carousel/edit') > -1 ||
        config.url.indexOf('/basic/enterprise/carousel/add') > -1 ||
        config.url.indexOf('/basic/enterprise/carousel/edit') > -1){
        config.headers['rtt'] = Date.now();
    }
    return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
    let res = response;
    if (response.headers.encrypt == 1){
        res.data = JSON.parse(pako.inflate(Decrypt(response.data),{to:'string'}))
    }
    if (response.headers.nt != undefined && response.headers.nt != '' ){
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.set(ACCESS_TOKEN, response.headers.nt)
    }
    if (response.status === 200) {
        if (res.data.code === '200') {
            const {data} = res;
            return data;
        } else {
            message.warning(res.data.msg || res.data, 3);
            Promise.resolve(res.data || res);
        }
    } else {
        notification.error({
            message: '网络错误' + res.status,
            description: res.data.msg || res.data
        });
        Promise.reject(res.data);
    }
}, err)

const installer = {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, service)
    }
}

export {
    installer as VueAxios,
    service as axios
}
