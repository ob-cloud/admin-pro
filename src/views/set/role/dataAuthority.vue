<template>
    <div class="dataAuthority">
        <div>
            <div  v-if="filteredResourceList.length > 0">
                <div class="source-list" v-for="(first,indexf) in filteredResourceList" :key="first.id">
                    <!-- 第一级 -->
                    <div class="source-list-title" style="border-bottom:1px solid  #ddd;height:100%;">
                        <div style="margin: 20px 0px 10px 0px">
                            <span style="color: rgba(17,17,17,1);"><b>{{first.name}}</b></span>
                        </div>
                    </div>
                    <div class="source-list-content"
                         v-for="(second,indexs) in first.children"
                         :key="indexs*10">
                        <a-row style="height:100%; margin-left:23px">
                            <a-col :span="3" style="margin: 25px 0px 4px 0px">
                                <span style="color:#111111;">{{second.name}}</span>
                            </a-col>
                            <poper-dept v-show="partOrangeize.hasOwnProperty('data')"
                                    @upDateScope="dealUpdateScope"
                                    @upDateIncludeChildren="dealIncludeChildren"
                                    :choose="second"
                                    :scope="second.dataScope"
                                    :disabled="second.dataScope ==0"
                                    :isIncludeChildren = "second.isIncludeChildren"
                                    :data="second"
                                    :allDepartment="partOrangeize"
                                    @updateData="dealUpdateDepts">
                            </poper-dept>
                         </a-row>
                        <a-row v-if="indexs!=first.children.length -1" style="border-bottom:1px dashed  #ddd;height:25px; margin-left:23px">
                        </a-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {tenantResourceGetTenantMenuTree,roleResourceDataRetrieveAssigned,getDeptTree,roleResourceDataInsertDataPermission,getRoleResourceDataPermissionTree,roleResourceSetting} from '@/api/set';
    import poperDept from './poperDept';

    export default {
        name:"dataAuthority",
        components: {
            poperDept,
        },
        data() {
            return {
                resourceList: [],
                allResourceList: [],
                roleResourceList: [], // 角色有的资源
                filteredResourceList: [],
                deptIds:[],
                partOrangeize: {},
                originData:{},
            };
        },
        props: {
            sourceRoleId: {
                type: String,
                required: true
            },
        },
        created: function () {
            //this.getAllResourceRoles();
            this.getDeptTree();
            this.getRoleResourceDataPermissionTree();
        },
        methods: {
            getRoleResourceDataPermissionTree(val){
                let id = this.sourceRoleId;
                if(val){
                    id = val;
                }
                this.filteredResourceList = [];
                this.originData = {};
                // 获取所有的资源权限
                getRoleResourceDataPermissionTree(id).then(res => {
                    this.originData = res.data;
                    this.filteredResourceList = res.data.children;
                });
            },
            getAllResourceRoles(val) {
                let id = this.sourceRoleId;
                if(val){
                    id = val;
                }
                // 获取所有的资源权限
                tenantResourceGetTenantMenuTree(id).then(res => {
                    this.allResourceList = res.data.children;
                    this.getCheckedResource(id);
                });
            },
            filterResourceList(resourceList, roles) {
                this.filteredResourceList = [];
                // 过滤所有的资源权限
                // 过滤第一遍 没有第二级 并且第一级也没有数据权限的  删掉
                let filteredResourceList = [];
                filteredResourceList = resourceList.filter(item => {
                    return item.children.length > 0 || item.isScope === 1;
                });

                // console.log(filteredResourceList, 'filteredResourceList');
                // 过滤第二遍 筛选第二级没有children 并且 iscope === 0的
                for (const item of filteredResourceList) {
                    item.children = item.children.filter(child => {
                        return child.children.length > 0 || child.isScope === 1;
                    });
                    // 过滤第三遍 筛选第二级没有children 并且 iscope === 0的
                    for (const child of item.children) {
                        child.children = child.children.filter(child => {
                            return child.isScope === 1;
                        });
                    }
                }

                filteredBandRole(filteredResourceList, roles);

                this.filteredResourceList = null;
                this.filteredResourceList = filteredResourceList;
                // 过滤完成 再去绑定具体的数据
                function filteredBandRole(children, roles) {
                    // console.log(children, roles, 'roles');
                    for (let i = 0; i < children.length; i++) {
                        for (let j = 0; j < roles.length; j++) {
                            // 如果这条资源权限的id 等于数据权限的资源id 并且权限的部门不为空
                            if (children[i].id === roles[j].resourceId) {
                                // console.log(children[i], roles[j], 'rolsdsdsdsd');
                                if (roles[j].deptIds !== '') {
                                    children[i].dept = dealWithDepts(
                                        roles[j].deptIds,
                                        roles[j].deptNames
                                    );
                                } else {
                                    children[i].dept = [];
                                }

                                children[i].scope = roles[j].scope;
                            }
                        }
                        children[i].leaderFlag = false;
                        if (children[i].children.length > 0 && children[i].level < 4) {
                            filteredBandRole(children[i].children, roles);
                        }
                    }
                }

                // 处理depts 和deptNames
                function dealWithDepts(ids, names) {
                    // console.log(ids, names, 'idssssss')
                    const deptIds = ids.split(',');
                    const deptNames = names.split(',');
                    const arr = [];
                    for (let i = 0; i < deptIds.length - 1; i++) {
                        arr.push({
                            id: deptIds[i],
                            name: deptNames[i]
                        });
                    }
                    return arr;
                }
            },
            getCheckedResource(roleId) {
                // 获取角色下的资源
                this.resourceList = [];
                roleResourceDataRetrieveAssigned(roleId).then(res => {
                    this.roleResourceList = res.data;
                    const allResourceList = JSON.parse(
                        JSON.stringify(this.allResourceList)
                    );

                    this.filterResourceList(allResourceList, res.data);
                    // 筛选有isScope == 1 的 然后加上scope 和 部门
                });
            },
            dealUpdateDepts(data) {
                // for (const item of this.roleResourceList) {
                //     if (item.resourceId === data.id) {
                //         item.deptIds = '';
                //         for (const dept of data.choooseDept) {
                //             item.deptIds += dept.id + ',';
                //         }
                //         break;
                //     }
                // }
                //递归遍历集合
                for (const item of this.filteredResourceList) {
                    if(item.id === data.pid){
                        for (const itemChildren of item.children) {
                            if(itemChildren.id === data.id){
                                itemChildren.extraDeptList = data.choooseDept;
                                break;
                            }
                        }
                    }
                }
            },
            dealUpdateScope(data) {
                for (const item of this.filteredResourceList) {
                    if(item.id === data.pid){
                        for (const itemChildren of item.children) {
                            if(itemChildren.id === data.id){
                                itemChildren.dataScope = data.scope;
                                itemChildren.isIncludeChildren = data.isIncludeChildren;
                                break;
                            }
                        }
                    }
                }
            },
            dealIncludeChildren(data){
                for (const item of this.filteredResourceList) {
                    if(item.id === data.pid){
                        for (const itemChildren of item.children) {
                            if(itemChildren.id === data.id){
                                itemChildren.isIncludeChildren = data.isIncludeChildren;
                                break;
                            }
                        }
                    }
                }
            },
            commitChange() {
                this.originData.children = this.filteredResourceList;
                // 提交改变
                roleResourceSetting(this.sourceRoleId,this.originData).then(res => {
                    if(res.code == '200'){
                        this.$message.success('编辑成功');
                    }
                    else{
                        this.$message.warn(res.msg);
                    }
                });
            },
            getDeptTree() {
                getDeptTree().then(res => {
                    this.partOrangeize = res;
                });

            },
            deleteDept(dept, item) {
                for (let i = 0; i < item.dept.length; i++) {
                    if (dept.id === item.dept[i].id) {
                        item.dept.splice(i, 1);
                    }
                }

                this.reloadThis();
            },
            changeSourceRoleId(val){
                this.loading = false;
                //this.filteredResourceList = [];
                // 角色改变 重新获取该角色下可以设置的数据权限
                //this.getAllResourceRoles(val);
                if(!this.partOrangeize.hasOwnProperty('data')){
                    //防止报错
                    this.getDeptTree();
                }
                this.getRoleResourceDataPermissionTree(val);
            },
        },
        watch: {
        }
    };
</script>

<style scoped lang="less">
    .dataAuthority{
        margin: 0 auto;
        height: calc(100vh - 192px);
        overflow: auto;
        padding: 0 15px;
        .source-second-row{
            margin: 10px 0px 10px 0px;
        }
    }
</style>