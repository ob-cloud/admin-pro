import Vue from 'vue'
import {login} from '@/api/login'
import {ACCESS_TOKEN, RECKID} from '@/store/mutation-types'

const user = {
    state: {
        token: '',
        firstRouter: [],
        secondRouter: []
    },
    getters: {
        token(state) {
            return state.token;
        },
        firstRouter(state) {
            return state.firstRouter;
        },
        secondRouter(state) {
            return state.secondRouter;
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        FIRST_ROUTER(state, payload) {
            state.firstRouter = payload;
        },
        SECOND_ROUTER(state, payload) {
            state.secondRouter = payload;
        },
    },
    actions: {
        // 登录
        userLogin({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const result = response.data
                    Vue.ls.set(RECKID, result.ckid);    // 刷新token时的请求参数
                    Vue.ls.set(ACCESS_TOKEN, result.token, response.data.expiration)
                    commit('SET_TOKEN', result.token)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default user
