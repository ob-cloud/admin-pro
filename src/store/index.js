import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
    },
    state: {
        headerMenu:{},
        activeKey: 0,
        showReloginDialog: false,
    },
    getters: {

    },
    mutations: {
        SET_HEADER_MENU(state, payload){
            state.headerMenu = payload
        },
        SET_ACTIVE_KEY(state, payload){
            state.activeKey = payload
        },
        SET_SHOW_RELOGIN_DIALOG(state, payload){
            state.showReloginDialog = payload
        },
    },
    actions: {

    },
})
