import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
// import Viser from 'viser-vue'

// ext library

Vue.use(Antd)
// Vue.use(Viser)
Vue.use(VueStorage, config.storageOptions)
