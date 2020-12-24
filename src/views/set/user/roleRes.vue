<template>
    <div class="roleRes-box">
        <div class="setting clearfix">
            <div class="left">
                <div class="organization">
                    <div class="title">
                        <span><icon-font type="iconyumengtubiao_jiagou"/></span>
                        <span class="titleName">角色岗位</span>
                    </div>
                    <div class="operate" v-mark="['mk_set_role_tjjs']">
                        <icon-font type="iconyumengtubiao_tianjia" class="iconFont" @click="openAddRole"/>
                    </div>
                </div>
                <div class="leftDetail">
                    <div class="roleList">
                        <div class="marginTop"></div>
                        <draggable v-model="roleDataList"
                                   v-bind="dragOptions"
                                   @end="sort">
                            <transition-group>
                                <div v-for="(item,index) in roleDataList" :key="index" >
                                    <div class="listItemClass cursor" @mouseenter="itemEnter(index)" @mouseleave="itemLeave()" @click="refreshTable(item.id)" :style="selectRoleId==item.id?'background-color:rgba(10,135,248,0.1);':''">
                                        <div slot="title" class="listItemNameClass clearfix">
                                            <div class="name" :style="selectRoleId==item.id?'color:#0A87F8;':''">
                                                <icon-font type="iconyumengtubiao_weifenpeirenyuan"/>
                                                {{item.name}}&nbsp;({{item.empCount==null?0:item.empCount}}人)
                                            </div>
                                            <div class="operate" v-if="index==current||selectRoleId==item.id" v-mark="['mk_set_role_bjjs','mk_set_role_scjs']">
                                                <a-popover :title="null" trigger="hover" v-model="popoverFlag" placement="bottom">
                                                    <template slot="content">
                                                        <div @click="openEditRole(item.id)" class="action cursor"><icon-font type="iconyumengtubiao_bianji-1" v-mark="['mk_set_role_bjjs']" /><span style="margin-left: 4px">编辑</span></div>
                                                        <div @click="deleteRole(item.id,item.name)" class="action cursor"><icon-font type="iconyumengtubiao_shanchu-" v-mark="['mk_set_role_scjs']" /><span style="margin-left: 4px">删除</span></div>
                                                    </template>
                                                    <icon-font type="iconyumengtubiao_gengduo-" class="moreColor" :style="selectRoleId==item.id?'color:#0A87F8;':''" />
                                                </a-popover>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
                <div class="leftAdd" v-mark="['mk_set_role_tjjs']" @click="openAddRole">
                    <icon-font type="iconyumengtubiao_tianjia"/>添加角色
                </div>
            </div>
            <div class="right">
                <a-tabs defaultActiveKey="1" v-model="currentActive" @change="callback">
                    <a-tab-pane tab="成员管理" key="1">
                        <div class="search">
                            <search-dialog placeholder="员工编号/员工姓名/员工电话" :showEmployee="false" :showCityTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
                        </div>
                        <div class="deptUser">
                            <div class="table">
                                <a-table :bordered="true" :pagination="false"
                                         :columns="userTableColumns" :dataSource="userTableData"
                                         >
                                    <div slot="serialNumber" slot-scope="text,record,index">
                                        {{index+1}}
                                    </div>
                                    <a slot="gender" slot-scope="text" href="javascript:;">{{text==1?'男':'女'}}</a>
                                    <div slot="name" slot-scope="text, record">
                                        <div class="nameColumn">
                                            <div class="name">
                                                {{record.name}}
                                            </div>
                                            <div v-if="record.isLeader=='1'" class="leaderFlag">
                                                <div class="leaderLength"><span>领导</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </a-table>
                                <div class="contFoot" v-show="userTableData.length>0">
                                    <!-- 分页 -->
                                    <a-pagination size="small" :total="pagination.total" :pageSize="pagination.pageSize" showSizeChanger showQuickJumper @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane tab="资源权限" key="2" :forceRender="false" v-mark="['mk_set_role_szqx']">
                        <div v-if="currentActive==2" class="checkOption">
                            <div class="checkOptionRight">
                                <div class="allCheck">
                                    <a-checkbox @change="checkAllResource">全选</a-checkbox>
                                </div>
                                <div class="checkButton">
                                    <a-button class="saveButton" @click="getCheckedResource">保存</a-button>
                                </div>
                            </div>
                        </div>
                        <sourceAuthority :sourceRoleId="selectRoleId" @hadChange="hadChange=true" ref="sourceAuthority" />
                    </a-tab-pane>
                    <a-tab-pane tab="数据权限" key="3" :forceRender="false" v-mark="['mk_set_role_szqx']">
                        <!-- <div>ppp</div> -->
                        <div v-if="currentActive==3" class="checkOption">
                            <div class="checkOptionRight">
                                <div class="allCheck">
                                    <div style="width: 60px;height: 50px;"></div>
                                </div>
                                <div class="checkButton">
                                    <a-button class="saveButton" @click="commitChange">保存</a-button>
                                </div>
                            </div>
                        </div>
                        <dataAuthority :sourceRoleId="selectRoleId" ref="dataAuthorityChild"></dataAuthority>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
        <div>
            <add-role ref="addRoleChild"></add-role>
        </div>
    </div>
</template>

<script>
    import {roleListAll,listEmpExtendInfo,roleRemove,roleSort} from '@/api/set';
    import sourceAuthority from '../role/sourceAuthority';
    import dataAuthority from '../role/dataAuthority';
    import addRole from '../role/addRole';
    import SearchDialog from '@/components/SearchDialog';
    import draggable from "vuedraggable";
    //用户
    const userTableData=[];
    const userTableColumns = [
        {
            title: '序号',
            width: '8%',
            key:"序号",
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' },
        },
        {
            title: '员工编号',
            dataIndex: 'empNo',
            key: 'empNo',
            align: 'left',
            width:'20%',
        },
        {
            title: '员工姓名',
            dataIndex: 'name',
            key: 'name',
            scopedSlots: {customRender: 'name'},
            align: 'left',
            width:'20%',
        },
        {
            title: '员工电话（登录账号）',
            key: 'phone',
            dataIndex: 'phone',
            align: 'left',
            width:'22%',
        },
        {
            title: '性别',
            key: 'gender',
            dataIndex: 'gender',
            align: 'left',
            scopedSlots: {customRender: 'gender'},
            width:'10%',
        },
        {
            title: '部门',
            key: 'deptName',
            dataIndex: 'deptName',
            align: 'left',
        },
    ];

    //分页
    const pagination = {
        total: 0,
        current: 0,
        pageSize: 10,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
    };

    const searchList = [
        {
            key:'fuzzyQueryType',
            list:[
                {
                    label: '综合检索',
                    value: 0,
                },
                {
                    label: '员工编号',
                    value: 1
                },
                {
                    label: '员工姓名',
                    value: 2
                },
                {
                    label: '员工电话',
                    value: 3
                },
            ],
        },
        {
            key:'gender',
            title:'性别',
            currentActiveIndex:0,
            list:[
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '男',
                    value: 1
                },
                {
                    label: '女',
                    value: 2
                },
            ],
        }
    ];

    export default {
        components: {
            sourceAuthority,
            dataAuthority,
            addRole,
            SearchDialog,
            draggable,
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        },
        data() {
            return {
                roleDataList: [],     //角色列表
                selectRoleId:"",      //初始选择的角色
                seenOperate: false,   //角色操作显示标记（删除、标记）
                current: null,        //当前哪个角色
                indexMouseEnter:null, //移入角色的index
                userTableColumns:userTableColumns,  //员工列表表头
                userTableData:userTableData,        //员工列表数据
                hadChange: false,
                currentActive:'1',                    //当前面板
                popoverFlag:false,
                pagination:pagination,  //分页
                searchList:searchList,  //搜索条件
                searchCriteria :{
                    deptId : "",
                    roleId : "",
                    gender : "",
                    matchType : '',
                    fuzzyKeyword : "",
                    current: 0,
                    size : 10,
                    listType : 3,   //固定值，与后端约定
                },                  //搜索条件
            };
        },
        created: function () {
            this.roleListAll();
        },
        methods: {
            //*******角色相关*******//
            //***显示操作**//
            itemEnter(index) {
                this.indexMouseEnter = index;
                //关闭其他的气泡弹窗，防止出现多个弹窗
                this.popoverFlag = false;
            },
            itemLeave() {
                this.indexMouseEnter = null;
            },
            //***实际操作***//
            openSearchDrawer() {
                //弹出搜索框
                this.drawerVisible = true;
            },
            closeSearchDrawer() {
                //关闭搜索框
                this.drawerVisible = false;
            },
            openAddRole() {
                this.$refs.addRoleChild.getMsgFromAddRole();
            },
            openEditRole(id){
                this.popoverFlag=false;
                this.$refs.addRoleChild.getMsgFromEditRole(id);
            },
            sort(){
               let parameter= [];
               if(this.roleDataList.length > 1) {
                   for (let i = 0; i < this.roleDataList.length; i++) {
                       parameter.push(this.roleDataList[i].id);
                   }
                   //获取带统计的部门树
                   roleSort(parameter).then(res => {
                       this.messageInfo(res, '修改排序');
                       this.listEmpExtendInfo();
                   });
               }
            },
            onSizeChange(current){
                this.pagination.current = current;
                this.listEmpExtendInfo();
            },
            onShowSizeChange(current, pageSize){
                this.pagination.current = current;
                this.pagination.size = pageSize;
                this.pagination.pageSize = pageSize;
                this.listEmpExtendInfo();
            },
            refreshTable(id){
                this.selectRoleId = id;
                if(this.currentActive == 1) {
                    this.listEmpExtendInfo();
                }
                else if(this.currentActive == 2&&this.$refs.sourceAuthority){
                    this.$refs.sourceAuthority.getAllResourceRoles(id);
                }
                else if(this.currentActive == 3&&this.$refs.dataAuthorityChild){
                    this.$refs.dataAuthorityChild.changeSourceRoleId(id);
                }
                //其他的通过监听
            },
            deleteRole(id,name){
                this.popoverFlag=false;
                let that = this;
                this.$modal.confirm({
                    title: '确定要删除角色 「' + name + '」 吗？',
                    content: '删除后将不可恢复',
                    width:"433px",
                    height:"192px",
                    okText: '确认',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                    onOk(){
                    roleRemove(id).then(res => {
                        that.messageInfo(res, '删除');
                        that.roleListAll();
                    });
                },
                onCancel(){
                },
            });
            },
            checkAllResource(have){
                this.$refs.sourceAuthority.checkAllResource(have);
            },
            getCheckedResource(){
                this.$refs.sourceAuthority.getCheckedResource();
            },
            commitChange(){
                this.$refs.dataAuthorityChild.commitChange();
            },
            //****************基础操作*********************//
            callback(key) {
                this.currentActive = key;
                if(this.currentActive == 1) {
                    this.listEmpExtendInfo();
                }
                else if(this.currentActive == 2&&this.$refs.sourceAuthority){
                    this.$refs.sourceAuthority.getAllResourceRoles(this.selectRoleId);
                }
                else if(this.currentActive == 3&&this.$refs.dataAuthorityChild){
                    this.$refs.dataAuthorityChild.changeSourceRoleId(this.selectRoleId);
                }
            },
            //*************构造参数类方法**************//
            addKey(arr) {
                //table数据增加key属性值
                if (arr.length > 0) {
                    arr.forEach((item) => { //利用foreach循环遍历
                        item.key = item.id;
                    });
                }
            },
            //***************与api相关********************//
            //****角色相关****//
            roleListAll() {
                //所有角色
                roleListAll().then(res => {
                    if(res.data){
                        this.roleDataList = res.data;
                        if(res.data.length > 0){
                            this.selectRoleId =this.roleDataList[0].id;
                            if(this.selectRoleId){
                                this.listEmpExtendInfo();
                            }
                        }
                    }
                });
            },
            //****员工相关****//
            listEmpExtendInfo() {
                this.searchCriteria.roleId =  this.selectRoleId;
                this.searchCriteria.current = this.pagination.current;
                this.searchCriteria.size = this.pagination.pageSize;
                listEmpExtendInfo(this.searchCriteria).then(res => {
                    if(res.data){
                        this.addKey(res.data.records);
                        const pagination = { ...this.pagination };
                        pagination.total = res.data.total;
                        this.pagination = pagination;
                        this.userTableData = res.data.records;
                    }
                });
            },
            //提示框
            messageInfo(res, msg) {
                if (res.code == "200") {
                    this.$message.info(msg + '成功');
                }
                else {
                    this.$message.error(msg + '失败');
                }
            },
            //来自搜索框传值
            assetsFormData(data) {
                this.drawerVisible = false;
                this.searchCriteria.gender = data.gender;
                this.searchCriteria.fuzzyKeyword = data.fuzzyKeyword;
                this.searchCriteria.deptId = data.deptId;
                this.searchCriteria.matchType = data.fuzzyQueryType;
                this.searchCriteria.current = 1;
                this.pagination.current = 1;
                this.listEmpExtendInfo();
            }
        }
    };


</script>

<style scoped lang="less">
    .roleRes-box {
        height: 100%;
    //    &/deep/.ant-tabs-nav-scroll{
    //             padding: 0 10px;
    //         }
    }

    .setting {
        background-color: #F1F2F5;
        height: calc(100vh - 135px);
        .left {
            width: 20%;
            background-color: #FFFFFF;
            float: left;
            height: calc(100vh - 135px);
            .organization {
                margin: 0px 10px 0px 10px;
                border-bottom: 1px solid #F1F2F5;
                height: 40px;
                line-height: 40px;

                .title {
                    float: left;

                    .titleName {
                        margin-left: 6px;
                    }
                }

                .operate {
                    float: right;

                    .iconFont {
                        color: @themeColor;
                    }
                }
            }
            .leftDetail {
                height: calc(100vh - 215px);
                overflow: auto;

                .roleList {
                    .marginTop {
                        margin-top: 9px;
                    }

                    .roleListItem {
                        width: 240px;
                        height: 40px;
                        padding: 10px 10px 10px 10px;
                    }

                    .listItemClass:hover {
                        background-color: #F6F7F8;
                    }

                    listItemClickClass {
                        background-color: @themeBgColor;

                        .moreColor {
                            color: @themeColor;
                        }

                        .name {
                            color: @themeColor;
                        }
                    }

                    .listItemClass {
                        height: 40px;
                        line-height: 40px;

                        .listItemNameClass {
                            margin: 0px 10px 0px 10px;

                            .name {
                                float: left;
                            }

                            .operate {
                                float: right;
                            }
                        }
                    }
                }
            }
            .leftAdd {
                cursor: pointer;
                border-top: 1px solid #F1F2F5;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: @themeColor;
            }
        }
        .right{
            width: 79%;
            background-color: #FFFFFF;
            float: right;
            height: calc(100vh - 135px);
            position:relative;
            .search{
                position: absolute;
                width: 470px;
                right: 13px;
                top:10px;
                /deep/ .search-list{
                    top:6px;
                }
            }
            .deptUser{
                padding-top: 20px;
                width: 98%;
                margin: 0 auto;
                .table {
                    .nameColumn {
                        width: 100%;
                        .name{
                            float: left;
                        }
                        .leaderFlag {
                            color: #777777;
                            border-radius: 6px;
                            background-color: rgba(10, 135, 248, 0.1);;
                            float: left;
                            text-align: center;
                            margin-left: 4px;
                            color: rgb(10, 135, 248);
                            padding: 2px 4px;
                            .leaderLength {
                                font-size: 12px;
                            }
                        }
                    }
                    .contFoot {
                        margin-top: 0px;
                        width: 100%;
                        height: 56px;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        margin-right: 20px;
                        // position: absolute;
                        // bottom: 0px;
                        // right: 0;
                        background-color: #fff;
                    }
                }
            }
            .checkOption{
                .checkOptionRight{
                    position: absolute;
                    top:0px;
                    right: 0px;
                    float: right;
                    width: 150px;
                    height: 50px;
                    line-height: 50px;
                    .allCheck{
                        float: left;
                    }
                    .checkButton{
                        float: left;
                        margin-left: 10px;
                        .saveButton{
                            background-color: #0A87F8;
                            color: #FFFFFF;
                            width: 54px;
                            height: 24px;
                        }
                        &/deep/ span{
                          margin-left: -5px;
                        }
                    }
                }

            }
            /deep/ .ant-tabs-tab {
                width: 63px;
                height: 52px;
            }
            // /deep/ .ant-tabs-ink-bar-animated{
            //     margin-left: 13px;
            // }
            // & /deep/ .ant-tabs-nav .ant-tabs-tab{
            //     padding: 15px 16px;
            // }
            /deep/ .ant-tabs-bar {
                margin: 0 auto;
                border-bottom: 1px solid #DDDDDD;
            }
            /deep/ .ant-input {
                border-radius: 50px;
            }
            & /deep/ .ant-table-thead>tr>th {
                padding: 10px 16px;
            }
            & /deep/ .ant-table-tbody>tr>td {
                padding: 8.8px 16px;
            }
            & /deep/ .ant-tabs-ink-bar{
                margin-left: 13px;
            }
            /deep/ .ant-tabs-nav-wrap{
                height: 52px;
            }
        }
    }
    /deep/ .ant-popover-inner-content{
        width: 90px;
        padding: 0;
        .action{
            padding: 8px 18px;
        }
        .action:hover{
            cursor: pointer;
            background:rgba(10,135,248,0.1);
        }
    }
</style>
