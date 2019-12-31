/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * autoHideHeader - 向下滚动时，隐藏 Header : boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

const structSettings = {
  LoginLayout: {
    mode: 'simple', // mode: simple, multiple
    forgetPassword: true, // password forgotten
    // otherLoginTypes: [{ // third-part login
    //   iconCls: 'alipay-circle'
    // }, {
    //   iconCls: 'taobao-circle'
    // }, {
    //   iconCls: 'weibo-circle'
    // }]
  },
  GlobalFooter: {
    // links: [{
    //   href: '',
    //   iconType: '',
    //   target: '_blank',
    //   text: ''
    // }, {
    //   href: '',
    //   iconType: '',
    //   target: '_self',
    //   text: ''
    // }],
    // copyright: {
    //   text: ''
    // }
  }
}

export default {
  primaryColor: '#52C41A', // primary color of ant design
  navTheme: 'light', // theme for nav menu
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fixed', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  autoHideHeader: false, //  auto hide header
  colorWeak: false,
  multiTab: true,
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
  // vue-ls options
  storageOptions: {
    namespace: 'PRO__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  },
  userLayoutOptions: {
    logo: 'http://placehold.it/50x50/333/fff/?text=pro',
    title: 'Admin-Pro',
    // description: 'On-Bright Admin Pro',
    hasFooter: false,
    copyright: 'OnBright.tld',
    links: [{
      href: 'www.baidu.com',
      label: '条款'
    }, {
      href: 'www.baidu.com',
      label: '声明'
    }]
  },
  ...structSettings
}
