import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  VueAxios
} from './utils/request'
import VueStorage from 'vue-ls';
import config from '@/config/defaultSettings'
import PageLoading from '@/components/PageLoading'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import {
  routerFilter
} from "@/router/filterRouter";
import {
  asyncRouterMap,
  failRouterMap
} from "@/config/router.config.js";
import moment from 'moment';
import mixin from '@/utils/mixin';
import Print from 'vue-print-nb';
import GlobalConfig from './GlobalConfig';
import './assets/common.less';
import '@/utils/directives'
import '@/utils/lazy_use'
import 'moment/locale/zh-cn'

// require('./mock/index.js')
Vue.use(Print);
Vue.mixin(mixin);
moment.locale('zh-cn');
Vue.prototype.$moment = moment
Vue.prototype.GlobalConfig = GlobalConfig

Vue.use(PageLoading)
Vue.use(VueStorage, config.storageOptions)
Vue.use(VueAxios)
Vue.config.productionTip = false

import ContentTop from '@/components/ContentTop'
import ContentMain from '@/components/ContentMain'
import LabelItem from '@/components/FormItem/LabelItem'
import OwnUpload from '@/components/OwnUpload'

Vue.component('ContentTop', ContentTop)
Vue.component('ContentMain', ContentMain)
Vue.component('LabelItem', LabelItem)
Vue.component('OwnUpload', OwnUpload)

import JoditVue from 'jodit-vue';
Vue.use(JoditVue);

// 百度地图组件
import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
  ak: 'SKG8d2hZRjmSQpvtkz89nquhHn5BCrdD&s=1'
});
//高德地图组件
import AMap from 'vue-amap';
Vue.use(AMap, {
  ak: 'b21b9f5764e1fe30480d5d0f1fdac12a'
});
AMap.initAMapApiLoader({
  key: "b21b9f5764e1fe30480d5d0f1fdac12a",
  plugin: [
    "AMap.Autocomplete",
    //输入提示插件
    "AMap.PlaceSearch",
    //POI搜索插件
    "AMap.Scale",
    //右下角缩略图插件 比例尺
    "AMap.OverView",
    //地图鹰眼插件
    "AMap.ToolBar",
    //地图工具条
    "AMap.MapType",
    //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor",
    //编辑 折线多，边形
    "AMap.CircleEditor",
    //圆形编辑器插件
    "AMap.Geolocation"
    //定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  uiVersion: "1.0"
});

new Vue({
  router,
  store,
  created() {
    if (this.$ls.get(ACCESS_TOKEN)) {
      // 登录后刷新需要重新加载路由
      let router = this.$ls.get("router");
      // 判读是否有权限路由
      if (router) {
        router = JSON.parse(router);
      } else {
        router = [];
      }
      let newRouter = routerFilter(asyncRouterMap[0].children, router);
      asyncRouterMap[0].children = newRouter;
      this.$store.commit("FIRST_ROUTER", asyncRouterMap);
      this.$router.addRoutes(asyncRouterMap);
      this.$router.addRoutes(failRouterMap);
    }
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  },
  render: h => h(App),
}).$mount("#app");