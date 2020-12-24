<template>
    <div class="workflow-box">
        <div class="add-btn-wrap" style="width: 132px;" @click="addWorkflow" v-mark="['mk_set_config_sppz_tj']">
            <icon-font type="iconyumengtubiao_peizhi" /><span style="margin-left: 3px;">配置审批流程</span>
        </div>
        <skeleton-workflow v-show="spinLoading"></skeleton-workflow>
        <div v-if="!tableData||(tableData&&tableData.length == 0)">
            <a-empty style="margin-top: 110px;" description="还没有配置审批流程～"></a-empty>
            <div class="configWorkflow">
                <div class="configWorkflowFont cursor" @click="addWorkflow">配置审批流程</div>
            </div>
        </div>
        <div class="workflow-table" v-show="!spinLoading" v-if="tableData&&tableData.length > 0">
            <a-table rowKey="id" :customRow="openDetail" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                <div slot="statusName" slot-scope="text">
                    <div class="IconRadius f-fl" :class="text=='启用'?'approved':'reject'"></div>
                    <div>
                        <span class="auditStatusNameFont">{{text}}</span>
                    </div>
                </div>
                <div slot="action" slot-scope="text, record">
                    <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
                        <template slot="content">
                            <div v-if="record.statusName==='停用'" @click.stop="enable(record)" class="action cursor"  v-mark="['mk_set_config_sppz_qy']">启用</div>
                            <div v-if="record.statusName==='启用'" @click.stop="disable(record)" class="action cursor" v-mark="['mk_set_config_sppz_ty']">停用</div>
                            <div @click.stop="deleteWorkflow(record)" class="action cursor" v-mark="['mk_set_config_sppz_sc']">删除</div>
                        </template>
                        <div style="width: 100%;height: 100%">
                            <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                        </div>
                    </a-popover>
                </div>
            </a-table>
            <div class="contFoot" v-show="tableData.length>0" style="padding-right: 20px;">
                <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
            </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" width="800px" :maskClosable="false" v-model="addWorkflowDialog" class="ownModalBorder titDialog" title="配置审批流程" @cancel="addWorkflowDialog=false">
            <add-workflow @cancelSave="addWorkflowDialog=false" @successSave="successSave"></add-workflow>
        </a-modal>
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="配置审批流程" width="800px" v-model="workflowDetailsDialog" class="ownModalBorder titDialog" @cancel="isRefreshFun">
            <workflow-detail @refreshinfoFun="refreshinfoFun" :id="id" @successDelete="successDelete" @successEdit="successEdit"></workflow-detail>
        </a-modal>
    </div>
</template>

<script>
    import * as API from '@/api/setConfig';
    import SkeletonWorkflow from '../../../skeleton/set/workflow';
    import AddWorkflow  from './addWorkflow';
    import WorkflowDetail  from './workflowDetail';
    export default {
        name: "workflow",
        components: {
            SkeletonWorkflow,
            AddWorkflow,
            WorkflowDetail,
        },
        data(){
            return {
                sendData:{
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyQueryType:'',
                    fuzzyKeyword:'',
                    deptId:'',
                    status:'',
                    bizScene:'',
                },
                tableColumns: [
                    {
                        title: '序号',
                        dataIndex: 'index',
                        key: 'index',
                        align: 'center',
                        width: '50px',
                        customCell:() =>{
                            return {
                                on:{
                                    click:()=>{
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    },
                    {
                        title: '状态',
                        dataIndex: 'statusName',
                        key: 'statusName',
                        align: 'left',
                        scopedSlots: { customRender: 'statusName' },
                        width:'14.6%',
                    },
                    {
                        title: '发起审批类型',
                        dataIndex: 'bizSceneName',
                        key: 'bizSceneName',
                        align: 'left',
                        width:'19.5%',
                    },
                    {
                        title: '审批范围',
                        dataIndex: 'deptName',
                        key: 'deptName',
                        align: 'left',
                        width:'23.2%',
                    },
                    {
                        title: '审批说明',
                        dataIndex: 'comment',
                        key: 'comment',
                        scopedSlots: { customRender: 'comment' },
                        align: 'left',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: {customRender: 'action'},
                        align: 'center',
                        width: '68px',
                        customCell: () => {
                            return {
                                on: {
                                    click: () => {
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    }
                ],
                tableData:[],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                id:'',
                workflowDetailsDialog:false,
                spinLoading:true,
                isRefresh:false,
                addWorkflowDialog:false,
            }
        },
        created() {
            this.initData();
        },
        methods: {
            enable(data){
                let _this = this;
                let id = data.id;
                let content = '';
                if(data.bizScene==11){
                    content = '启用后，该部门下的所有签订的租客电子合同都将提交到该审批流程内的审批人员进行审批';
                }
                if(data.bizScene==12){
                    content = '启用后，该部门下的所有签订的租客纸质合同都将提交到该审批流程内的审批人员进行审批';
                }
                if(data.bizScene==21){
                    content = '启用后，该部门下的所有签订的业主合同都将提交到该审批流程内的审批人员进行审批';
                }
                if(data.bizScene==31){
                    content = '启用后，该部门下的所有产生的流水都将提交到该审批流程内的审批人员进行审批';
                }
                if(data.bizScene==32){
                  content = '启用后，该部门下的所有新提交的付款申请都将提交到该审批流程内的审批人员进行审批';
                }
                this.$modal.confirm({
                    title: '确定要启用 「' + data.deptName+'-'+data.bizModuleName + '」 的审批流程吗？',
                    content: content,
                    okText: '确定',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_chenggong" style="color:green" />,
                    onOk() {
                        API.definitionStatusChange({id:id,status:1}).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                _this.$message.success('操作成功！');
                                setTimeout(() => {
                                    _this.initData();
                                }, 500)

                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            disable(data){
                let _this = this;
                let id = data.id;
                let content1 = '';
                let content2 = '';
                if(data.bizScene==11){
                    content1 = '① 停用后，该部门下所有新签订的租客电子合同都将提交到上级部门所设置的审批流程内进行审批';
                    content2 = '② 如上级部门至总公司都未设置审批流程，则所有签订的租客电子合同都不再进行审批';
                }
                if(data.bizScene==12){
                    content1 = '① 停用后，该部门下所有新签订的租客纸质合同都将提交到上级部门所设置的审批流程内进行审批';
                    content2 = '② 如上级部门至总公司都未设置审批流程，则所有签订的租客纸质合同都不再进行审批';
                }
                if(data.bizScene==21){
                    content1 = '① 停用后，该部门下所有新签订的业主合同都将提交到上级部门所设置的审批流程内进行审批';
                    content2 = '② 如上级部门至总公司都未设置审批流程，则所有签订的业主合同都不再进行审批';
                }
                if(data.bizScene==31){
                    content1 = '① 停用后，该部门下所有新产生的账务流水都将提交到上级部门所设置的审批流程内进行审批';
                    content2 = '② 如上级部门至总公司都未设置审批流程，则所有产生的账务流水都不再进行审批';
                }
                if(data.bizScene==32){
                  content1 = '① 停用后，该部门下所有新提交的付款申请审批都将提交到上级部门所设置的审批流程内进行审批';
                  content2 = '② 如上级部门至总公司都未设置审批流程，则所有提交的付款申请都不再进行审批';
                }
                this.$modal.confirm({
                    title: '确定要停用 「' + data.deptName+'-'+data.bizSceneName + '」 的审批流程吗？',
                    content: ()=><p>{content1}<br/>{content2}</p>,
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        API.definitionStatusChange({id:id,status:0}).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                _this.$message.success('操作成功！');
                                setTimeout(() => {
                                    _this.initData();
                                }, 500)

                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            deleteWorkflow(data){
                let _this = this;
                let id = data.id;
                let content1 = '';
                let content2 = '';
                if(data.bizScene==11){
                    content1 = '① 删除后，该部门下所有新签订的租客电子合同都将提交到上级部门所设置的审批流程内进行审批';
                    content2 = '② 如上级部门至总公司都未设置审批流程，则所有签订的租客电子合同都不再进行审批';
                }
                if(data.bizScene==12){
                    content1 = '① 删除后，该部门下所有新签订的租客纸质合同都将提交到上级部门所设置的审批流程内进行审批';
                    content2 = '② 如上级部门至总公司都未设置审批流程，则所有签订的租客纸质合同都不再进行审批';
                }
                if(data.bizScene==21){
                    content1 = '① 删除后，该部门下所有新签订的业主合同都将提交到上级部门所设置的审批流程内进行审批';
                    content2 = '② 如上级部门至总公司都未设置审批流程，则所有签订的业主合同都不再进行审批';
                }
                if(data.bizScene==31){
                    content1 = '① 删除后，该部门下所有新产生的账务流水都将提交到上级部门所设置的审批流程内进行审批';
                    content2 = '② 如上级部门至总公司都未设置审批流程，则所有产生的账务流水都不再进行审批';
                }
                if(data.bizScene==32){
                    content1 = '① 删除后，该部门下所有新提交的付款申请审批都将提交到上级部门所设置的审批流程内进行审批';
                    content2 = '② 如上级部门至总公司都未设置审批流程，则所有提交的付款申请都不再进行审批';
                }
                this.$modal.confirm({
                    title: '确定要删除 「' + data.deptName+'-'+data.bizSceneName + '」 的审批流程吗？',
                    content: ()=><p>{content1}<br/>{content2}</p>,
                    okText: '确定',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                    onOk() {
                    API.definitionRemove(id).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            _this.$message.success('操作成功！');
                            setTimeout(() => {
                                _this.initData();
                            }, 500)

                        }
                    })
                },
                onCancel() {
                },
            });
            },
            checkOpts(record){
                let markArr = []
                let flag = false;
                if (record.statusName=='停用') {
                    markArr.push('mk_set_config_sppz_qy','mk_set_config_sppz_sc');
                }
                if(record.statusName=='启用') {
                    markArr.push('mk_set_config_sppz_ty','mk_set_config_sppz_sc');
                }
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if (markArr.includes(value.mark)){
                        flag = true
                    }
                })
                return flag
            },
            addWorkflow(){
                this.addWorkflowDialog = true;
            },
            refreshinfoFun(res){  //详情有改变的操作  就改变状态
                if(res){
                    this.isRefresh = res
                }
            },
            successSave(){
                this.addWorkflowDialog = false;
                this.initData();
            },
            successDelete(){
                this.workflowDetailsDialog = false;
                this.initData();
            },
            successEdit(val){
                this.isRefresh = true;
                this.id = val;
            },
            isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
                if(this.isRefresh){
                    this.initData();
                }
                this.workflowDetailsDialog = false;
                this.isRefresh = false
            },
            initData() {
                this.spinLoading = true;
                API.definitionList(this.sendData).then(res => {
                    if (res&&res.code === "200") {
                        if(res.data == null){
                            this.tableData = [];
                        }else{
                            this.tableData = res.data.records;
                            this.pagination.total = res.data.total;
                            this.tableData.forEach((item, index)=>{
                                item.index = index + 1;
                            });
                        }
                    }
                    this.spinLoading = false;
                })
            },
            assetsFormData(data) {
                if(data.fuzzyQueryType) {
                    this.sendData.fuzzyQueryType = data.fuzzyQueryType;
                } else{
                    this.sendData.fuzzyQueryType = 0;
                }
                this.sendData.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData.deptId = data.deptId;
                this.sendData.status = data.status;
                this.sendData.bizScene = data.bizScene;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.initData();
            },
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            this.id = record.id;
                            this.workflowDetailsDialog = true;
                        }
                    }
                }
            },
            onSizeChange(current) {
                this.sendData.current = current;
                this.pagination.current = current;
                this.initData();
            },
            onShowSizeChange(current, pageSize) {
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.pagination.pageSize = pageSize;
                this.initData();
            },
        }
    }
</script>

<style lang="less" scoped>
.workflow-box {
    padding: 10px;
    .search{

    }
    .configWorkflow{
        margin-top: 30px;
        .configWorkflowFont{
            margin: 0 auto;
            text-align: center;
            width: 230px;
            height: 46px;
            line-height:46px;
            color: #0A87F8;
            border:1px solid rgba(10,135,248,1);
            border-radius:4px;
        }
    }
    .workflow-table {
        .IconRadius {
            margin-top: 8px;
            margin-right: 5px;
            width: 6px;
            height: 6px;
            border-radius: 4px;
        }
        .approved {
            background-color:#0A87F8;
        }
        .reject {
            background-color: #777777;
        }
        .auditStatusNameFont{
            color: #5A5A5A;
            font-size: 14px;
        }
        .contFoot {
            margin-top: 15px;
            width: 100%;
            height: 56px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 20px; // position: absolute;
            // bottom: 0px;
            // right: 0;
            background-color: #fff;
            & /deep/ .ant-pagination {
                margin-right: 11px;
            }
        }
        & /deep/.ant-table-tbody>tr>td {
            padding: 12px 6px;
            &:not(:first-child) {
                cursor: pointer;
            }
        }
        & /deep/.ant-table-thead > tr > th{
            padding: 12px 6px;
        }
    }
    & /deep/ .ant-popover {
        .ant-popover-inner-content {
            padding: 0;
            .action {
                padding: 8px 16px;
            }
            .action:hover {
                cursor: pointer;
                background: rgba(10, 135, 248, 0.1);
            }
        }
    }
}
</style>