import Vue from 'vue'
import VueRouter from 'vue-router'
import {ACCESS_TOKEN} from '@/store/mutation-types'
// import routes from '@/router/routers'
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'
import store from '@/store';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false}) // NProgress Configuration

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: constantRouterMap,
    scrollBehavior: () => {
        history.pushState(null, null, document.URL)
    }
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (Vue.ls.get(ACCESS_TOKEN)) { //如果有就直接到首页咯
        if (to.path === '/login') {
            next()
            NProgress.done()
        } else {
            next();
        }
    } else {
        if (to.path == '/login' || to.path == '/enterpriseList' || to.path == '/addRegister' || to.path == '/JoinCompany' || to.path == '/enterpriseOk' || to.path == '/addPersonInfo' || to.path == '/walletSign' || to.path == '/invitationOk') { //如果是登录页面路径，就直接next()
            next();
        }else{
              next({
                path: '/login'
            })
            NProgress.done()// if current page is login will not trigger afterEach hook, so manually handle it
        }
    }

    if (store.state.user.firstRouter[0] && store.state.user.firstRouter[0].children){
        let router = store.state.user.firstRouter[0].children;
        let toModule = to.path;
        router.forEach((item,index)=> {
            if ((item.redirect || item.path) === toModule){
                store.commit('SET_HEADER_MENU',item)
                store.commit('SET_ACTIVE_KEY',0)
            }else{
                item.children.forEach((val,i)=>{
                    if (val.path === toModule){
                        store.commit('SET_HEADER_MENU',item)
                        store.commit('SET_ACTIVE_KEY',i)
                    }
                })
            }
        })
    }

    // let router = store.state.user.firstRouter[0].children;
    // let toModule = to.path;
    // router.forEach((item,i)=> {
    //     if ((item.redirect || item.path) === toModule){
    //         this.$store.commit('SET_HEADER_MENU',item)
    //     }
    // })
})
router.afterEach(() => {
    NProgress.done()
})
export default router
