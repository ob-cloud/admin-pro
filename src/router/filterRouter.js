// 增加添加账单、签约权限
// let mark_qy = '';
// let mark_tjzd = '';
let permissions = [];

export function routerFilter(routers, menuTree) {
    let router = filter(routers, menuTree);
    // router.forEach((value, index) => {
    //     value.children && value.children.forEach((val, i)=>{
    //         if (val.path == '/contract/reserve' && mark_qy){
    //             val.meta.permissions.push({
    //                 name: '签约',
    //                 mark: mark_qy
    //             })
    //         }
    //         if (val.path == '/contract/tenant' && mark_tjzd){
    //             val.meta.permissions.push({
    //                 name: '添加账单',
    //                 mark: mark_tjzd
    //             })
    //         }
    //     })
    // })
    sessionStorage.setItem('permissions',JSON.stringify(permissions))
    return router;
}

function filter(routerMap, roleMenu) {
    let arr = [];
    for (let router of routerMap) {
        for (let role of roleMenu) {
            if (router.path === role.uri) {
                // 示例如下：
                // {
                //     path: '/house',
                //     name: 'house',
                //     component: RouteView,
                //     redirect: '/house/index',
                //     meta: {title: '房源管理', keepAlive: true, icon: '', permission: []},
                //     children: [
                //         {
                //             path: '/house/index',
                //             name: 'share',
                //             component: () => import('@/views/house/share'),
                //             meta: {title: '合租', keepAlive: false, permission: []}
                //         },
                //         {
                //             path: '/house/whole',
                //             name: 'whole',
                //             component: () => import('@/views/house/whole'),
                //             meta: {title: '整租', keepAlive: true, permission: []}
                //         }
                //     ]
                // }

                let children = [];
                if (router.children && role.children && role.children.length>0 && !arr.includes(router)) {
                    // 匹配添加下一级路由
                    if (role.level === 1) {
                        children = filter(router.children, role.children);
                    }
                    if (role.level === 2) {
                        children = router.children;
                    }
                    router.redirect = role.children[0].uri;
                }
                // 当前路由信息填写
                router.children = children;
                // 同步为后台资源的name
                // router.meta.title = role.name;
                // 加上资源id
                router.meta.resourcesId = role.id;
                // 加上资源排序
                router.meta.orderIndex = role.orderIndex;
                router.meta.icon = role.icon;
                // let permissions = [];
                // if (role.children && role.children.length>0 && role.children[0].level === 4) {
                //     for (let item of role.children) {
                //         let p = {
                //             name: item.name,
                //             mark: item.mark
                //         };
                //         permissions.push(p);
                //         if (item.mark == 'mk_contract_tenant_tjht'){
                //             mark_qy = 'mk_contract_tenant_tjht'
                //         }
                //         if (item.mark == 'mk_finance_bill_tjzd'){
                //             mark_tjzd = 'mk_finance_bill_tjzd'
                //         }
                //     }
                // }
                // if (!arr.includes(router)){
                //     router.meta.permissions = permissions;
                //     arr.push(router);
                // }else{      // 处理公客、私客等特殊路由
                //     let index = arr.indexOf(router)
                //     arr[index].meta.permissions.push(...permissions)
                // }
                if (role.children && role.children.length>0 && role.children[0].level === 4) {
                    for (let item of role.children) {
                        let p = {
                            name: item.name,
                            mark: item.mark
                        };
                        permissions.push(p);
                    }
                }
                if (!arr.includes(router)){
                    arr.push(router);
                }
            }
        }
    }
    //写死了
    for (let role of roleMenu) {
       if(role.uri === '/wallet'){
           role.children.forEach((item)=>{
               item.children.forEach((temp)=>{
                   if(temp.level == 4){
                       let p = {
                           name: temp.name,
                           mark: temp.mark
                       };
                       permissions.push(p);
                   }
               });
           })
       }
    }
    return arr;
}
