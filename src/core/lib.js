import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
// import Viser from 'viser-vue'

// ext library
import MultiTab from '@/components/MultiTab'

Vue.use(Antd)
// Vue.use(Viser)
Vue.use(MultiTab)
Vue.use(VueStorage, config.storageOptions)
