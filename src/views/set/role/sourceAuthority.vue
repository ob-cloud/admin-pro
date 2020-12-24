<template>
    <div class="resAuthority">
        <div>
            <div  v-if="resourceList.length > 0 && showResource">
                <div class="source-list" v-for="(first,indexf) in resourceList" :key="indexf">
                    <!-- 第一级 -->
                    <div style="height: 20px"></div>
                    <div class="source-list-title" style="border-bottom:1px solid  #dddddd;height:100%;">
                        <a-checkbox v-model="first.have" :indeterminate="first.indeterminate" @change="changeItemHave(1,first)" style="margin: 8px 0px 8px 0px;">
                            <span style="color: rgba(17,17,17,1);"><b>{{first.name}}</b></span>
                        </a-checkbox>
                    </div>
                    <div class="source-list-content"
                         v-for="(second,indexs) in first.children"
                         :key="indexs*10">
                        <a-row :style="indexs!=first.children.length -1?'border-bottom:1px dashed  #ddd;height:100%; margin-left:38px;':'height:100%; margin-left:38px;'">
                            <a-col :span="4" style="margin: 12px 0px 12px 0px">
                                <a-checkbox v-model="second.have" :indeterminate="second.indeterminate" @change="changeItemHave(2,first,second)">
                                    <span style="color: #111111;">{{second.name}}</span>
                                </a-checkbox>
                            </a-col>
                            <a-col :span="20" v-if="showResource" class="source-second-box clearfix" :style="(second.children && second.children.length>6)?'padding-bottom: 12px':''">
                                <check-all-group
                                        class="source-second-row"
                                        v-for="(third,indext) in second.children"
                                        :key="indext*100"
                                        :data="third"
                                        :Upper="second"
                                        :allName="computedAllName(third.children)"
                                        :random="checkGroupRandom"
                                        @updateData="getCheckGroupEmit"
                                        :changeCK="changeCK"
                                ></check-all-group>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 递归checkbox 改变have状态
    // 递归赋值 checkgroup改变的状态
    const assignmentNode = (params, data) => {
        for (let item of params) {
            if (item.id === data.id) {
                // 如果传过来的data 的pid等于当前Id 直接赋值
                item.children = data.children;
                item.have = data.have;
            } else if (data.level >= item.level && item.children.length > 0) {
                assignmentNode(item.children, data);
                // 不等于Pid那么判断传过来data的level 小于等于当前递归的level的 再往下递归
                // 并且 还要有childen
            }
        }

        return;
    };
    import {tenantResourceGetTenantMenuTree,roleResourceDataRetrieveAssigned,roleResourceDataInsertRoleRes,getRoleMenuTree} from '@/api/set';
    import checkAllGroup from './checkAllGroup';

    export default {
        name:"sourceAuthority",
        components: {
            checkAllGroup,
        },
        data() {
            return {
                resourceList: [],
                allResourceList: null,
                showResource: true,
                postHave: [], // 点击完成时，计算所有选中的资源
                roleHaveSet: [], // 角色所拥有的权限集合
                checkGroupRandom: 0,
                checkAllResourceChecked: false,
                checkAllResourceGoNumber: 0,
                checkNoAllResourceGoNumber: 0,
                haveAll: true,
                isLoading: false,
                changeCK: '',
                checked: true,
            };
        },
        props: {
            sourceRoleId: {
                type: String,
                required: true
            },
        },
        created: function () {
            this.getAllResourceRoles();
        },
        methods: {
            computedAllName(children) {
                // console.log(children, 'chil')
                const names = [];
                for (const item of children) {
                    names.push(item.name);
                }
                // console.log(names, 'names');
                return names;
            },
            getCheckGroupEmit(data) {
                // 更新第三级 第四级数据
                assignmentNode(this.resourceList, data);
                // console.log(this.resourceList, data, '222222222222222dddd');
                // 改变第二级的状态
                this.updateSecondLevel(data.pid);
                // console.log(data, 'ddd')
                // 如果选择的是true 并且 不是ck 那么找到ck并且让他也选中
                if (data.have && data.mark.indexOf('ck') < 0) {
                    this.getSameLevelCK(data);
                }
            },
            // 寻找选中的同级的查看，然后选中
            getSameLevelCK(data) {
                const pid = data.pid;
                let allData = []; // 所有这个data的同级
                for (let item of this.resourceList) {
                    for (let child of item.children) {
                        if (child.id === pid) {
                            allData = child;
                            break;
                        }
                    }
                }
                // console.log(allData, 'all')
                for (let item of allData.children) {
                    // console.log(item)
                    if (item.mark.indexOf('ck') > -1) {
                        item.have = true;
                        this.getCheckGroupEmit(item);
                        // 更新查看 传给父级
                        this.changeCK = item.id + '-' + Math.random();
                        break;
                    }
                }
            },
            updateSecondLevel(pid) {
                // 第三四级组件改变状态 遍历第三级的状态 更新第二级的数据
                // 根据第三级的pid判断要改的第二级 减少性能消耗
                let firstPid = '';
                for (let item of this.resourceList) {
                    for (let child of item.children) {
                        if (child.id === pid) {
                            let have = false;
                            firstPid = child.pid;
                            let haveLength = 0;
                            let childrenLength = child.children.length;
                            for (let data of child.children) {
                                if (data.have === true) {
                                    have = true;
                                    haveLength = haveLength+1;
                                }
                            }
                            if(haveLength>0&&childrenLength>haveLength){
                                child.indeterminate = true;
                            }
                            else{
                                child.indeterminate = false;
                            }
                            child.have = have;
                            break;
                        }
                    }
                }
                // 改变完二级 改变1级
                this.updateFirstLevel(firstPid);
            },
            updateFirstLevel(pid) {
                this.$emit('hadChange');
                // 二级组件改完 改一级
                for (let item of this.resourceList) {
                    let have = false;
                    if (item.id === pid) {
                        let haveLength = 0;
                        let firstChildrenlength = item.children.length;
                        let haveNotAll = 0;
                        for (let child of item.children) {
                            if (child.have) {
                                have = true;
                                if(child.indeterminate==false){
                                    haveLength = haveLength+1;
                                } else{
                                    haveNotAll = 1;
                                }
                            }
                        }
                        if(haveLength>0&&firstChildrenlength>haveLength){
                            item.indeterminate = true;
                        }
                        else{
                            if(haveNotAll==1){
                                item.indeterminate = true;
                            }
                            else{
                                item.indeterminate = false;
                            }
                        }
                        item.have = have;
                        break;
                    }
                }
                this.getAllStatus();
            },
            getCheckedResource() {
                this.postHave = [];
                // 递归获取到所有选中的资源
                this.recursionGetChecked(this.resourceList);
                // 调用添加接口
                // console.log(this.postHave)
                this.insertResource(this.postHave);
            },
            recursionGetChecked(list) {
                for (const item of list) {
                    if (item.have === true) {
                        this.postHave.push(item.id);
                    }
                    if (item.children && item.children.length > 0) {
                        this.recursionGetChecked(item.children);
                    }
                }
            },
            getRoleAssignedResource(roleId) {
                // 获取角色下的资源
                this.resourceList = [];
                roleResourceDataRetrieveAssigned(roleId).then(res => {
                    this.roleHaveSet = [];
                    for (const item of res.data) {
                        this.roleHaveSet.push(item.resourceId);
                    }
                    this.matchingResource(res.data);
                });
            },
            changeItemHave(level, first, second, third, fourth) {
                this.$emit('hadChange');
                if (level === 1) {
                    first.indeterminate = false;
                    for (let item of first.children) {
                        item.have = first.have;
                        item.indeterminate = false;
                        for (let child of item.children) {
                            child.have = first.have;
                            if (child.children.length > 0) {
                                for (let son of child.children) {
                                    son.have = first.have;
                                }
                            }
                        }
                    }
                }
                if (level === 2) {
                    second.indeterminate = false;
                    for (let item of second.children) {
                        item.have = second.have;
                        for (let child of item.children) {
                            child.have = second.have;
                        }
                    }
                    this.updateFirstLevel(second.pid);
                }
                this.checkGroupRandom = Math.random();
                this.getAllStatus();
            },
            insertResource(resourceIds) {
                // 给角色插入资源
                const data = {
                    resourceIds: resourceIds,
                    roleId: this.sourceRoleId
                };
                this.isLoading = true;
                roleResourceDataInsertRoleRes(data)
                    .then(res => {
                        this.isLoading = false;
                        this.$emit('saveSuccess', true);
                        this.$message.success('更新成功');
                    })
                    .catch(err => {
                        this.isLoading = false;
                    });
            },
            matchingResource(roleHave) {
                // 匹配当前role下所有的资源
                const all = JSON.parse(JSON.stringify(this.allResourceList));
                // 判断第一层 第一层有的
                // this.haveAll = true;
                // console.log(roleHave, all);
                this.recursionChildren(roleHave, all);
                // console.log(all);
                this.resourceList = all;
                // if (this.haveAll) {
                //   this.checkAllResourceChecked = true;
                // }
                // console.log(this.checkAllResourceChecked);
            },
            recursionChildren(roleHave, children) {
                // 递归数组

                for (let i = 0; i < roleHave.length; i++) {
                    for (let j = 0; j < children.length; j++) {
                        if (children[j].id === roleHave[i].resourceId) {
                            children[j].have = true;
                            if (children[j].children && children[j].children.length > 0) {
                                // 如果父级选中了 儿子们里才是true
                                this.recursionChildren(roleHave, children[j].children);
                                // console.log(children, "234");
                            }
                        } else {
                            // this.haveAll = false;
                        }
                    }
                }
            },
            getAllChange(have) {
                // 获取改变全部按钮的状态
                for (let item of this.resourceList) {
                    item.have = have;
                    this.changeItemHave(1, item);
                }
                // this.showResorce = false;
                // const list = JSON.parse(JSON.stringify(this.resourceList));
                // this.resourceList = [];
                // for (const item of list) {
                //   item.have = have;
                //   // checkNode(item, have);
                // }
                // this.resourceList = list;
                // this.showResorce = true;
                // this.checkgrouoRandom = Math.random();
            },
            checkAllResource(have) {
                if (have.target.checked) {
                    this.checkAllResourceChecked = true;
                } else {
                    this.checkAllResourceChecked = false;
                }
                this.getAllChange(this.checkAllResourceChecked);
            },
            getAllStatus() {
                // 判断当前全选的状态
                let status = true;
                // console.log(status, 'sss')
                checkAll(this.resourceList);

                // console.log(this.resourceList)
                function checkAll(chidren) {
                    for (let item of chidren) {
                        if (item.have !== true) {
                            status = false;
                            break;
                        } else if (item.children.length > 0) {
                            checkAll(item.children);
                        }
                    }
                }
                // console.log(status, 'statsss')
                this.$emit('emitAllCheckStatus', status);
            },
            getAllResourceRoles(val) {
                // let id = this.sourceRoleId;
                // if(val){
                //     id = val;
                // }
                // // 获取所有的资源权限
                // tenantResourceGetTenantMenuTree().then(res => {
                //     // console.log(this.allResourceList);
                //     this.allResourceList = res.data.children;
                //     this.getRoleAssignedResource(id);
                // });
                // 获取所有的资源权限
                let id = this.sourceRoleId;
                if(val){
                    id = val;
                }
                this.resourceList = [];
                getRoleMenuTree(id).then(res => {
                    this.resourceList = res.data.children;
                    this.recursionChildrenNew(this.resourceList);
                });
            },
            recursionChildrenNew(children) {
                // 递归数组
                for (let j = 0; j < children.length; j++) {
                    if (children[j].isSelected==1) {
                        children[j].have = true;
                        children[j].indeterminate = false;
                        if (children[j].children && children[j].children.length > 0) {
                            if(children[j].isChildrenAllSelected==0){
                                children[j].indeterminate = true;
                            }
                            // 如果父级选中了 儿子们里才是true
                            this.recursionChildrenNew(children[j].children);
                        }
                    } else {
                        children[j].have = false;
                    }
                }
            },
        },
        watch: {
        }
    };
</script>

<style scoped lang="less">
    .resAuthority{
        height: calc(100vh - 192px);
        overflow: auto;
        margin: 0 auto;
        padding: 0 15px;
        .allCheckButton{
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ddd;
            .allCheck{
                float: left;
            }
            .checkButton{
                float: right;
                .saveButton{
                    background-color: #0A87F8;
                    color: #FFFFFF;
                }
            }
        }
        .source-second-row {
            //border-bottom: 1px solid #fafaf9;
            width: 16.66%;
            margin: 10px 0px 0px 0px;
            float: left;
        }
    }
</style>