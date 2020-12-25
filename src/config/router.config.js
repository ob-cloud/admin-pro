// eslint-disable-next-line
import {
  BasicLayout,
  RouteView
} from '@/layouts'

export const asyncRouterMap = [{
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/workbench',
    children: [{
        path: '/source',
        name: 'source',
        component: RouteView,
        redirect: '/source/tenant',
        meta: {
          title: '线索管理',
          tips: '潜在租客/业主线索',
          keepAlive: false,
          icon: 'source',
          permission: []
        },
        children: [{
            path: '/source/tenant',
            name: 'tenantSource',
            component: () => import('@/views/source/tenant/index'),
            meta: {
              title: '租客池',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/source/owner',
            name: 'ownerSource',
            component: () => import('@/views/source/owner/index'),
            meta: {
              title: '业主池',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/source/partner',
            name: 'partnerSource',
            component: () => import('@/views/source/partner/index'),
            meta: {
              title: '合作企业',
              keepAlive: false,
              permission: []
            }
          }
        ]
      },
      {
        path: '/house',
        name: 'house',
        component: RouteView,
        redirect: '/house/index',
        meta: {
          title: '房源管理',
          tips: '合租/整租/独栋',
          keepAlive: true,
          icon: 'house',
          permission: []
        },
        children: [{
            path: '/house/index',
            name: 'share',
            component: () => import('@/views/house/whole/index'),
            meta: {
              title: '合/整租',
              keepAlive: false,
              icon: 'house',
              permission: []
            }
          },
          {
            path: '/house/centralized',
            name: 'centralized',
            component: () => import('@/views/house/centralized/index'),
            meta: {
              title: '独栋',
              keepAlive: true,
              permission: []
            }
          }
        ]
      },
      {
        path: '/contract',
        name: 'contract',
        component: RouteView,
        redirect: '/contract/reserve',
        meta: {
          title: '合约管理',
          tips: '租客/业主合同',
          keepAlive: true,
          icon: 'contract',
          permission: []
        },
        children: [{
            path: '/contract/tenant',
            name: 'tenant',
            component: () => import('@/views/contract/tenant/index'),
            meta: {
              title: '租客合同',
              keepAlive: false,
              icon: 'contract',
              permission: []
            }
          },
          {
            path: '/contract/owner',
            name: 'owner',
            component: () => import('@/views/contract/owner/index'),
            meta: {
              title: '业主合同',
              keepAlive: false,
              icon: 'contract',
              permission: []
            }
          },
          {
            path: '/contract/reserve',
            name: 'reserve',
            component: () => import('@/views/contract/reserve/index'),
            meta: {
              title: '预定管理',
              keepAlive: false,
              icon: 'contract',
              permission: []
            }
          },
          {
            path: '/contract/contractConfiguration',
            name: 'contractConfiguration',
            component: () => import('@/views/contract/contractConfiguration/index'),
            meta: {
              title: '合同配置',
              keepAlive: false,
              icon: 'contract',
              permission: []
            }
          }
        ]
      },
      {
        path: '/finance',
        name: 'finance',
        component: RouteView,
        redirect: '/finance/bill',
        meta: {
          title: '财务管理',
          tips: '账单/明细/流水',
          keepAlive: true,
          icon: 'finance',
          permission: []
        },
        children: [{
            path: '/finance/bill',
            name: 'bill',
            component: () => import('@/views/finance/bill/index'),
            meta: {
              title: '账单管理',
              keepAlive: false,
              icon: 'finance',
              permission: []
            }
          },
          {
            path: '/finance/billWater',
            name: 'billWater',
            component: () => import('@/views/finance/billWater/index'),
            meta: {
              title: '账单流水',
              keepAlive: false,
              icon: 'finance',
              permission: []
            }
          },
          {
            path: '/finance/billTransfer',
            name: 'billTransfer',
            component: () => import('@/views/finance/billTransfer/index'),
            meta: {
              title: '租客转账通知',
              keepAlive: false,
              icon: 'finance',
              permission: []
            }
          }
        ]
      },
      {
        path: '/workorder',
        name: 'workorder',
        component: RouteView,
        redirect: '/workorder/repair',
        meta: {
          title: '租后服务',
          tips: '维修/保洁/投诉',
          keepAlive: false,
          icon: 'workorderno',
          permission: []
        },
        children: [{
            path: '/workorder/repair',
            name: 'repair',
            component: () => import('@/views/workorder/repair/index'),
            meta: {
              title: '维修',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/workorder/cleaning',
            name: 'cleaning',
            component: () => import('@/views/workorder/cleaning/index'),
            meta: {
              title: '保洁',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/workorder/distribution',
            name: 'distribution',
            component: () => import('@/views/workorder/distribution/index'),
            meta: {
              title: '配货',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/workorder/complaint',
            name: 'complaint',
            component: () => import('@/views/workorder/complaint/index'),
            meta: {
              title: '投诉',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/workorder/suggest',
            name: 'complaint',
            component: () => import('@/views/workorder/suggest/index'),
            meta: {
              title: '建议',
              keepAlive: false,
              permission: []
            }
          },
        ]
      },
      {
        path: '/smartDevices',
        name: 'smartDevices',
        component: RouteView,
        redirect: '/smartDevices/lock',
        meta: {
          title: '智能设备',
          tips: '门锁/电表/水表',
          keepAlive: true,
          icon: 'contract',
          permission: []
        },
        children: [{
            path: '/smartDevices/lock',
            name: 'lock',
            component: () => import('@/views/smartDevices/lock/index'),
            meta: {
              title: '智能门锁',
              keepAlive: false,
              icon: 'smartDevices',
              permission: []
            }
          },
          {
            path: '/smartDevices/electric',
            name: 'electric',
            component: () => import('@/views/smartDevices/electric/index'),
            meta: {
              title: '智能电表',
              keepAlive: false,
              icon: 'smartDevices',
              permission: []
            }
          },
          {
            path: '/smartDevices/water',
            name: 'water',
            component: () => import('@/views/smartDevices/water/index'),
            meta: {
              title: '智能水表',
              keepAlive: false,
              icon: 'smartDevices',
              permission: []
            }
          },
          {
            path: '/smartDevices/account',
            name: 'account',
            component: () => import('@/views/smartDevices/account/index'),
            meta: {
              title: '账号管理',
              keepAlive: false,
              icon: 'smartDevices',
              permission: []
            }
          },
        ]
      },
      {
        path: '/extension',
        name: 'extension',
        component: RouteView,
        redirect: '/extension/promotion',
        meta: {
          title: '营销推广',
          tips: '营销/推广',
          keepAlive: false,
          icon: 'extension',
          permission: []
        },
        children: [{
          path: '/extension/promotion',
          name: 'promotion',
          component: () => import('@/views/extension/index'),
          meta: {
            title: '推广',
            keepAlive: false,
            permission: []
          }
        }]
      },
      {
        path: '/workflow',
        name: 'workflow',
        component: RouteView,
        redirect: '/workflow/myTodo',
        meta: {
          title: '审批管理',
          tips: '合同/财务审批',
          keepAlive: false,
          icon: 'workflow',
          permission: []
        },
        children: [{
            path: '/workflow/myTodo',
            name: 'myTodo',
            component: () => import('@/views/workflow/myTodo/index'),
            meta: {
              title: '待我审批的',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/workflow/myDone',
            name: 'myDone',
            component: () => import('@/views/workflow/myDone/index'),
            meta: {
              title: '我已审批的',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/workflow/myLaunch',
            name: 'myLaunch',
            component: () => import('@/views/workflow/myLaunch/index'),
            meta: {
              title: '我发起的',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/workflow/myCc',
            name: 'myCc',
            component: () => import('@/views/workflow/myCc/index'),
            meta: {
              title: '抄送我的',
              keepAlive: false,
              permission: []
            }
          },
        ]
      },
      {
        path: '/assets',
        name: 'assets',
        component: RouteView,
        redirect: '/assets/management',
        meta: {
          title: '物资管理',
          tips: '物���/仓储管理',
          keepAlive: true,
          icon: 'contract',
          permission: []
        },
        children: [{
            path: '/assets/management',
            name: 'management',
            component: () => import('@/views/assets/management/index'),
            meta: {
              title: '物资管理',
              keepAlive: false,
              icon: 'assets',
              permission: []
            }
          },
          {
            path: '/assets/warehouse',
            name: 'warehouse',
            component: () => import('@/views/assets/warehouse/index'),
            meta: {
              title: '库房管理',
              keepAlive: false,
              icon: 'assets',
              permission: []
            }
          },
        ]
      },
      {
        path: '/report',
        name: 'report',
        component: RouteView,
        redirect: '/report/charts',
        meta: {
          title: '数据分析',
          tips: '用户画像/数据统计',
          keepAlive: false,
          icon: 'report',
          permission: []
        },
        children: [{
          path: '/report/charts',
          name: 'charts',
          component: () => import('@/views/report/charts/index'),
          meta: {
            title: '数据分析',
            keepAlive: false,
            permission: []
          }
        }]
      },
      {
        path: '/set',
        name: 'set',
        component: RouteView,
        redirect: '/set/user',
        meta: {
          title: '企业设置',
          keepAlive: true,
          icon: 'set',
          permission: []
        },
        children: [{
            path: '/set/user',
            name: 'user',
            component: () => import('@/views/set/user/index'),
            meta: {
              title: '用户管理',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/set/company',
            name: 'company',
            component: () => import('@/views/set/company/index'),
            meta: {
              title: '企业管理',
              keepAlive: false,
              permission: []
            }
          },
          {
            path: '/set/config',
            name: 'config',
            component: () => import('@/views/set/config/index'),
            meta: {
              title: '配置中心',
              keepAlive: false,
              permission: []
            }
          }
        ]
      },
    ]
  },
  {
    path: '/',
    name: 'wallet',
    component: BasicLayout,
    meta: {
      title: '钱包'
    },
    redirect: '/wallet',
  },
  {
    path: '/',
    name: 'notice',
    component: BasicLayout,
    meta: {
      title: '消息'
    },
    redirect: '/notice',
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "login" */ '@/views/login/Login'),
  },
  // {
  //   path: '/enterpriseList',
  //   name: 'enterpriseList',
  //   component: () => import( /* webpackChunkName: "enterpriseList" */ '@/views/login/plug/enterpriseList'),
  // },
  // {
  //   path: '/addRegister',
  //   name: 'addRegister',
  //   component: () => import( /* webpackChunkName: "addRegister" */ '@/views/login/plug/addRegister'),
  // },
  // {
  //   path: '/JoinCompany',
  //   name: 'JoinCompany',
  //   component: () => import( /* webpackChunkName: "JoinCompany" */ '@/views/login/plug/JoinCompany'),
  // },
  // {
  //   path: '/enterpriseOk',
  //   name: 'enterpriseOk',
  //   component: () => import( /* webpackChunkName: "enterpriseOk" */ '@/views/login/plug/enterpriseOk'),
  // },
  // {
  //   path: '/addPersonInfo',
  //   name: 'addPersonInfo',
  //   component: () => import( /* webpackChunkName: "addPersonInfo" */ '@/views/register/addPersonInfo'),
  // },
  // {
  //   path: '/invitationOk',
  //   name: 'invitationOk',
  //   component: () => import( /* webpackChunkName: "invitationOk" */ '@/views/register/invitationOk'),
  // },
  // {
  //   path: '/walletSign',
  //   name: 'walletSign',
  //   component: () => import( /* webpackChunkName: "addPersonInfo" */ '@/views/wallet/signedSuccess'),
  // },
  {
    path: '/',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/workbench',
    children: [{
        path: '/workbench',
        name: 'workbench',
        component: RouteView,
        redirect: '/workbench/index',
        children: [{
          path: '/workbench/index',
          component: () => import('@/views/workbench/index'),
        }, ]
      },
      {
        path: '/membercenter',
        name: 'membercenter',
        component: RouteView,
        redirect: '/membercenter/membercenter',
        children: [{
          path: '/membercenter/membercenter',
          name: 'membercenter1',
          component: () => import( /* webpackChunkName: "membercenter" */ '@/views/membercenter/membercenter'),
        }]
      }
    ]
  },
  {
    path: '/',
    name: 'wallet',
    component: BasicLayout,
    meta: {
      title: '钱包'
    },
    redirect: '/wallet',
    children: [{
      path: '/wallet',
      name: 'wallet',
      component: RouteView,
      redirect: '/wallet/index',
      children: [{
        path: '/wallet/index',
        component: () => import('@/views/wallet/index'),
      }, ]
    }, ],
  },
  {
    path: '/',
    name: 'notice',
    component: BasicLayout,
    meta: {
      title: '消息'
    },
    redirect: '/notice',
    children: [{
      path: '/notice',
      name: 'notice',
      component: RouteView,
      redirect: '/notice/index',
      children: [{
        path: '/notice/index',
        component: () => import('@/views/notice/index'),
      }, ]
    }, ],
  },
]
export const failRouterMap = [{
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
