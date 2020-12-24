<template>
    <div class="workflow-detail-box">
        <div class="child-detail">
            <div class="top f-clearfix">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span style="margin-top: 9px;" class="radius-font status4" v-if="workflow.statusName=='启用'&&!skeletonLoading"><icon-font type="iconyumengtubiao_xuanzhong-" /></span>
                    <span style="margin-top: 9px;" class="radius-font status3" v-else-if="workflow.statusName=='停用'&&!skeletonLoading"><icon-font type="iconjingangqujinyong" /></span>
                    <div>
                        <label-item title="当前状态">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div class="statusColor4" v-if="workflow.statusName=='停用'&&!skeletonLoading">停用</div>
                            <div class="statusColor2" v-if="workflow.statusName=='启用'&&!skeletonLoading">启用</div>
                        </label-item>
                    </div>
                </div>
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item">
                        <span style="margin-top: 8px;" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_fukuanfangshi" />
                        </span>
                        <label-item title="发起审批类型" :skeletonLoading="skeletonLoading">
                            <div>
                                {{workflow.bizSceneName}}
                            </div>
                        </label-item>
                    </div>
                </div>
                <div class="f-fl detail">
                    <div class="item">
                        <span style="margin-top: 8px;" class="radius-font radius-font-person">
                            <icon-font type="iconfanwei" />
                        </span>
                        <label-item title="审批范围" :skeletonLoading="skeletonLoading">
                            <div>
                                {{workflow.deptName}}
                            </div>
                        </label-item>
                    </div>
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconshenhe" /> 审批详情
                        </span>
                        <div class="basic-info">
                            <div class="title" style="margin-top: 12px;">审批说明</div>
                            <label-item class="item" style="width: 100%;margin-top: 8px;" title="" :skeletonLoading="skeletonLoading">
                                <span v-if="!isEdit" style="margin-top: 10px;">{{workflow.comment}}</span>
                                <label-item class="u-bottom-border" v-else title="" :valLength="workflow.comment.length" :maxSize="100">
                                    <a-textarea v-model="workflow.comment" maxlength="100" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入"></a-textarea>
                                </label-item>
                            </label-item>
                            <div class="title" style="width: 100%;margin-top: 24px;">审批流程</div>
                            <div style="width: 100%;margin-bottom: 40px;">
                                <div class="flowStyle">
                                    <div style="height: 20px;"></div>
                                    <div class="start1">
                                        发起
                                    </div>
                                    <div class="start2">
                                        <div class="content clearfix">
                                            <div class="f-fl img16"><icon-font style="color: #0A87F8" type="iconchaosong" /></div>
                                            <div class="ccTitle f-fl">抄送人</div>
                                            <span class="f-fl ccName nocc" v-if="workflow.ccPeopleNameList.length==0">未设置</span>
                                            <span class="f-fl ccName havecc" v-else>{{workflow.ccPeopleNameList.join('、')}}</span>
                                            <div class="f-fr cursor" v-if="isEdit" @click="setCcDialog=true;"><icon-font style="color: #0A87F8;" type="iconyumengtubiao_bianji-" /></div>
                                        </div>
                                    </div>
                                    <div class="next1" >
                                    </div>
                                    <div v-if="isEdit">
                                        <div class="addApproval cursor" v-if="indexAddBtn==0" @click="addWorkflowNode(0)" @mouseleave="indexAddBtn=-1">
                                            添加审批环节
                                        </div>
                                        <div class="next2" v-else @mouseenter="indexAddBtn=0">
                                        </div>
                                    </div>
                                    <div class="next3">
                                    </div>
                                    <div class="arrow-bottom">
                                    </div>
                                    <div v-for="(item,index) in workflow.nodeList" style="width: 100%;">
                                        <div class="approval">
                                            <div class="content">
                                                <div class="approvalInfo clearfix">
                                                    <div class="f-fl img16" style="line-height: 28px"><icon-font style="color: #FFA036;" type="iconshenhe" /></div>
                                                    <div class="ccTitle f-fl" v-if="item.operatorType==1">审批人</div>
                                                    <div class="ccTitle f-fl" v-if="item.operatorType==2">审批角色</div>
                                                    <div class="f-fl approvalName nocc" v-if="item.operatorNameList.length==0">未设置</div>
                                                    <div class="f-fl approvalName approvalInfoColor" v-else>
                                                        {{item.operatorNameList.join('、')}}
                                                        <span v-if="item.operatorType==1&&item.operatorNameList.length>1" class="auditModeStyle">({{item.operatorNameList.length}}{{item.auditMode==1?'人会签':'人或签'}})</span>
                                                        <span v-if="item.operatorType==2" class="auditModeStyle">({{item.auditMode==1?'会签':'或签'}})</span>
                                                    </div>
                                                    <div class="f-fr cursor" style="line-height: 30px;margin-left: 10px" v-if="workflow.nodeList.length>1&&isEdit" @click="deleteWorkflowNode(index)"><icon-font style="color:#f5222d" type="iconyumengtubiao_shanchu-" /></div>
                                                    <div class="f-fr cursor" style="line-height: 30px" v-if="isEdit" @click="openSetApprovalCc(index)"><icon-font style="color: #0A87F8;" type="iconyumengtubiao_bianji-" /></div>
                                                </div>
                                                <div class="ccInfo clearfix">
                                                    <div class="f-fl img16"><icon-font style="color: #0A87F8" type="iconchaosong" /></div>
                                                    <div class="ccTitle f-fl">抄送人</div>
                                                    <span class="f-fl ccName nocc" v-if="item.ccPeopleNameList.length==0">未设置</span>
                                                    <span class="f-fl ccName havecc" v-else>{{item.ccPeopleNameList.join('、')}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="next1">
                                        </div>
                                        <div v-if="isEdit">
                                            <div class="addApproval cursor" v-if="indexAddBtn==(index+1)" @click="addWorkflowNode(index+1)" @mouseleave="indexAddBtn=-1">
                                                添加审批环节
                                            </div>
                                            <div class="next2" v-else @mouseenter="indexAddBtn=(index+1)">
                                            </div>
                                        </div>
                                        <div class="next3">
                                        </div>
                                        <div class="arrow-bottom">
                                        </div>
                                    </div>
                                    <div class="end">
                                        流程结束
                                    </div>
                                    <div style="height: 20px;"></div>
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                    <div slot="tabBarExtraContent" class="tabs-options">
                        <div v-if="activekey == 1&&!isEdit&&!skeletonLoading">
                            <div @click="editData" v-mark="['mk_set_config_sppz_bj']">
                                <icon-font type="iconyumengtubiao_bianji-" />
                                <span>&nbsp;编辑</span>
                            </div>
                            <div v-if="workflow.status==1" @click="disable(workflow)" v-mark="['mk_set_config_sppz_ty']">
                                <icon-font type="iconyumengtubiao_jinyong" />
                                <span>&nbsp;停用</span>
                            </div>
                            <div v-if="workflow.status==0" @click="enable(workflow)" v-mark="['mk_set_config_sppz_qy']">
                                <icon-font type="iconqiyong" />
                                <span>&nbsp;启用</span>
                            </div>
                            <div @click="deleteWorkflow(workflow)" v-mark="['mk_set_config_sppz_sc']">
                                <icon-font type="iconyumengtubiao_shanchu-" />
                                <span>&nbsp;删除</span>
                            </div>
                        </div>
                        <div v-if="activekey == 1&&isEdit&&!skeletonLoading">
                            <div slot="tabBarExtraContent" class="tabs-options" style="height:36px;">
                                <span @click="cancelEdit" style="margin-top:6px;">取消</span>
                                <span @click="editWorkflow" style="margin-top:6px;">保存</span>
                            </div>
                        </div>
                    </div>
                </a-tabs>
            </div>
            <div class="bottom">
                <span>{{workflow.creater}}创建于 {{$moment(workflow.createTime).format('lll')}}</span>
                <span>{{workflow.updater}}更新于 {{$moment(workflow.updateTime).format('lll')}}</span>
            </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="setCcDialog" class="ownModalBorder titDialog" title="设置抄送人" @cancel="setCcDialog=false">
            <set-cc :ccPeopleIdList="workflow.ccPeopleIdList" :ccPeopleNameList="workflow.ccPeopleNameList" @cancelSet="setCcDialog=false" @successSet="successSetCc"></set-cc>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="setApprovalCcDialog" class="ownModalBorder titDialog" title="设置审批人" @cancel="setApprovalCcDialog=false">
            <set-approval-cc :currentSetNode="currentSetNode" :currentSetIndex="currentSetIndex" @cancelSet="setApprovalCcDialog=false" @successSet="successSetApprovalCc"></set-approval-cc>
        </a-modal>
    </div>
</template>

<script>
    import * as API from '@/api/setConfig';
    import  SetCc from './setCc';
    import  SetApprovalCc from './setApprovalCc';
    export default {
        name: "workflowDetail",
        props: {
            id: {
                type: String
            },
        },
        components: {
            SetCc,
            SetApprovalCc,
        },
        data() {
            return {
                workflow:{
                    ccPeopleNameList:[],
                    comment:'',
                },
                copyWorkflow:{},
                copyNodeList:[],
                isEdit:false,
                defaultNode:{
                    auditMode:'',
                    auditModeName:'',
                    ccPeopleIdList:[],
                    ccPeopleNameList:[],
                    ccPeopleList:[],
                    operatorIdList:[],
                    operatorNameList:[],
                    operatorList:[],
                    operatorType:1,
                    operatorTypeName:'',
                },
                indexAddBtn:-1,
                setCcDialog:false,
                setApprovalCcDialog:false,
                currentSetNode : {},
                currentSetIndex : -1,
                activekey:1,
                skeletonLoading:false,
                saveLoading:false,
            }
        },
        created() {
            this.getWorkflow();
        },
        methods: {
            openSetApprovalCc(val){
                this.currentSetIndex = val;
                this.currentSetNode = this.workflow.nodeList[val];
                this.setApprovalCcDialog = true;
            },
            successSetApprovalCc(currentSetNode,currentSetIndex){
                this.setApprovalCcDialog = false;
                this.workflow.nodeList[currentSetIndex] = currentSetNode;
            },
            successSetCc(currentSelectId,currentSelectName){
                this.setCcDialog = false;
                this.workflow.ccPeopleIdList = currentSelectId;
                this.workflow.ccPeopleNameList = currentSelectName;
            },
            editData() {
                this.isEdit = true;
            },
            enable(){
                let data = this.workflow;
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
                this.$modal.confirm({
                    title: '确定要启用 「' + data.deptName+'-'+data.bizModuleName + '」 的审批流程吗？',
                    content: content,
                    okText: '确定',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_chenggong" style="color:green" />,
                    onOk() {
                        API.definitionStatusChange({id:id,status:1}).then(res => {
                            if (res.code == 200) {
                                _this.$message.success('操作成功！');
                                _this.getWorkflow();
                                _this.$emit('refreshinfoFun',true);

                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            disable(){
                let data = this.workflow;
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
                                _this.getWorkflow();
                                _this.$emit('refreshinfoFun',true);
                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            deleteWorkflow(){
                let data = this.workflow;
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
                            _this.$emit('successDelete');
                        }
                    })
                },
                onCancel() {
                },
            });
            },
            deleteWorkflowNode(val){
                this.workflow.nodeList.splice(val,1);
            },
            addWorkflowNode(val){
                this.workflow.nodeList.splice(val,0,this.defaultNode);
            },
            getWorkflow(){
                this.skeletonLoading = true;
                API.definitionView(this.id).then(res => {
                    if (res.code === '200') {
                        this.workflow = res.data;
                        this.parsePeopleData();
                    }
                    this.skeletonLoading = false;
                })
            },
            parsePeopleData(){
                this.copyNodeList = [];
                let nodeList = [];
                this.workflow.nodeList.forEach((item)=>{
                    let ccPeopleIdList = [];
                    let ccPeopleNameList = [];
                    let operatorIdList = [];
                    let operatorNameList = [];
                    item.operatorList.forEach((operatorTemp)=>{
                        operatorIdList.push(operatorTemp.id);
                        operatorNameList.push(operatorTemp.name);
                    });
                    item.ccPeopleList.forEach((ccPeopleTemp)=>{
                        ccPeopleIdList.push(ccPeopleTemp.id);
                        ccPeopleNameList.push(ccPeopleTemp.name);
                    });
                    item.ccPeopleIdList = ccPeopleIdList;
                    item.ccPeopleNameList = ccPeopleNameList;
                    item.operatorIdList = operatorIdList;
                    item.operatorNameList = operatorNameList;
                    this.copyNodeList.push(item);
                    nodeList.push(item);
                });
                let ccPeopleIdList = [];
                let ccPeopleNameList = [];
                this.workflow.ccPeopleList.forEach((item)=>{
                    ccPeopleIdList.push(item.id);
                    ccPeopleNameList.push(item.name);
                });
                this.workflow.ccPeopleIdList = ccPeopleIdList;
                this.workflow.ccPeopleNameList = ccPeopleNameList;
                this.workflow.nodeList = nodeList;
                this.copyWorkflow = Object.assign({}, this.workflow);
                this.copyWorkflow.nodeList = this.copyNodeList;
            },
            cancelEdit(){
                this.isEdit = false;
                this.workflow = this.copyWorkflow;
                this.parsePeopleData();
            },
            editWorkflow(){
                let noOperaterFlag = false;
                this.workflow.nodeList.forEach((item)=>{
                    if(!item.operatorIdList||item.operatorIdList.length==0){
                        noOperaterFlag = true;
                    }
                });
                if(noOperaterFlag){
                    this.$message.warning("请完善审批信息");
                    return;
                }
                this.saveLoading = true;
                API.definitionEdit(this.workflow).then(res => {
                    if(!res){
                        this.saveLoading= false;
                    }
                    if (res.code === '200') {
                        this.$message.success('审批流程修改成功');
                        this.isEdit = false;
                        this.$emit('successEdit',res.data);
                    } else {
                        this.saveLoading = false;
                        this.$message.success('审批流程修改失败');
                    }
                });
            },
        },
        watch: {
            id() {
                this.getWorkflow();
            },
        },
    }
</script>

<style scoped lang="less">
    .workflow-detail-box{
        .child-detail {
            height: calc(100vh - 150px);
            overflow: auto;
            .status1 {
                background: rgba(251, 66, 70, 0.1);
                color: #FB4246;
            }
            .status2 {
                background: rgba(3, 198, 131, 0.1);
                color: #03C683;
            }
            .status3 {
                background: rgba(119, 119, 119, 0.1);
                color: #777777;
            }
            .status4 {
                background: rgba(10, 135, 248, 0.1);
                color: #0A87F8;
            }
            .color-status1 {
                color: #FB4246;
            }
            .color-status2 {
                color: #03C683;
            }
            .color-status3 {
                color: #777777;
            }
            .color-status4 {
                color: #0A87F8;
            }
            .top {
                padding: 20px 20px 0 20px;
                margin-bottom: 25px;
                .title {
                    display: flex;
                    align-items: center;
                    width: 138px;
                    height: 44px;
                    border-right: 1px dashed @borderColor;
                    .radius-font {
                        width: 44px;
                        height: 44px;
                        line-height: 44px;
                        border-radius: 50%;
                        font-size:28px;
                    }
                    .status1 {
                        background: rgba(251, 66, 70, 0.1);
                        color: #FB4246;
                    }
                    .status2 {
                        background: rgba(3, 198, 131, 0.1);
                        color: #03C683;
                    }
                    .status3 {
                        background: rgba(119, 119, 119, 0.1);
                        color: #777777;
                    }
                    .status4 {
                        background: rgba(10, 135, 248, 0.1);
                        color: #0A87F8;
                    }
                    .color-status1 {
                        color: #FFA036;
                    }
                    .color-status2 {
                        color: #0A87F8;
                    }
                    .color-status3,
                    .color-status4 {
                        color: #777777;
                    }
                    .color-status8 {
                        color: #03C683;
                    }
                    .label-item {
                        width: 80px;
                    }
                    .edit-status-icon {
                        vertical-align: middle;
                        margin-left: 8px;
                        color: @themeColor;
                    }
                    p{
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }
                    >div{
                        div{
                            font-size:14px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(17,17,17,1);
                        }
                    }
                }

                .detail {
                    display: flex;
                    flex-wrap: wrap;
                    .item {
                        display: flex;
                        align-items: center;
                        width: 200px;
                        font-size: 12px; // padding-left: 40px;
                        input {
                            width: 180px;
                            padding-right: 10px;
                        }
                        & /deep/ .ant-select {
                            width: 180px;
                        }
                        .radius-font {
                            font-size:18px;
                        }
                        p{
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(153,153,153,1);
                        }
                        >div{
                            div{
                                font-size:12px;
                                font-family:PingFangSC-Regular,PingFang SC;
                                font-weight:400;
                                color:rgba(17,17,17,1);
                            }
                        }
                    }
                    .blank-box {
                        width: 50px;
                        height: 30px;
                    }
                }
                .radius-font-person {
                    color: #0A87F8;
                    background-color: fade(#0A87F8, 10%);
                }
                .radius-font-yellow {
                    color: #FFA036;
                    background-color: fade(#FFA036, 10%);
                }
                .radius-font-close {
                    color: #777777;
                    background-color: fade(#F6F7F8, 100%);
                }
            }
            .radius-font {
                display: inline-block;
                margin-right: 10px;
                width: 32px;
                height: 32px;
                line-height: 32px ;
                font-size: 12px;
                color: #FFA036;
                text-align: center;
                background-color: fade(#FFA036, 10%);
                border-radius: 16px;
            }
            .tabs-content {
                padding: 0 20px;
                // min-height: calc(100vh - 388px);
                .basic-info {
                    .title{
                        color: #111111;
                        font-size: 18px;
                        font-weight: 500;
                    }
                    .littleTitle{
                        .titleIcon{
                            width:2px;
                            height:14px;
                            background:rgba(10,135,248,1);
                        }
                        .title{
                            font-size: 14px;
                            color: #111111;
                        }
                    }
                    .input-info {
                        display: flex;
                        flex-wrap: wrap;
                        .unConfigStyle{
                            color: #111111;
                            font-size: 12px;
                            margin: 15px 0 20px 0;
                        }
                        .item {
                            margin: 0 39px 20px 0;
                            width: 200px;
                            & /deep/ .title {
                                margin-bottom: 4px;
                            }
                            & /deep/ .ant-select {
                                width: 100%;
                            }

                        }
                        .public-config {
                            display: flex;
                            flex-wrap: wrap;
                            label {
                                width: 100px;
                                margin: 10px 0 20px 0;
                                padding: 0;
                            }
                        }
                        .showImg {
                            .showImgDetail{
                                height: 88px;
                                width: 88px;
                                line-height: 88px;
                                border: 1px solid #eeeeee;
                                background-color: #f6f7f8;
                                text-align: center;
                                overflow: hidden;
                                img {
                                    width: auto;
                                    max-width: 88px;
                                    height: auto;
                                    max-height: 88px;
                                    overflow: hidden;
                                }
                            }
                        }
                    }
                    /deep/ .enclosureStyle .ant-upload.ant-upload-select-picture-card{
                        width: 88px;
                        height: 88px;
                    }
                    /deep/ .enclosure{
                        width: 88px;
                        height: 88px;
                    }
                    /deep/ .file-list .enclosure-img-list{
                        width: 88px;
                        height: 88px;
                    }
                    /deep/ .enclosure .ant-upload.ant-upload-select-picture-card > .ant-upload{
                        width: 88px;
                        height: 88px;
                    }
                    /deep/ .file-list .enclosure-img-list > div img{
                        max-width: 88px;
                        max-height: 88px;
                    }
                }
            }
        }.radius-font {
             display: inline-block;
             margin-right: 10px;
             width: 60px;
             height: 24px;
             font-size: 14px;
             color: #FFA036;
             text-align: center;
             background-color: fade(#FFA036, 10%);
             border-radius: 12px;
         }
        .radius-font-person {
            color: #0A87F8;
            background-color: fade(#0A87F8, 10%);
        }
        .tabs-options {
            font-size: 0;
            cursor: pointer;
            div {
                text-align: right;
                display: inline-block;
                font-size: 14px;
                padding: 0  0 0 14px;
                color: #0a87f8;
            }
            div:last-child {
                span {
                    margin-right: 0;
                }
            }
            &>span {
                display: inline-block;
                padding: 0 10px;
                height: 24px;
                line-height: 24px;
                font-size: 14px;
                border: 1px solid #DDDDDD;
                background-color: #F6F7F8;
                border-radius: 4px;
            }
            &>span:last-child {
                margin-left: 10px;
                border: 1px solid #0a87f8;
                background-color: #0a87f8;
                color: #ffffff;
            }
            & /deep/ .ant-popover {
                position: fixed;
                .ant-popover-inner-content {
                    padding: 0;
                    width: 100px;
                    .action {
                        padding: 8px 18px;
                    }
                    .action:hover {
                        cursor: pointer;
                        background: rgba(10, 135, 248, 0.1);
                    }
                }
            }
        }
        .bottom {
            padding: 0 20px;
            height: 50px;
            line-height: 50px;
            border-top: 1px dashed #DDDDDD;
            color: @secondaryFontColor;
            span:first-child {
                display: inline-block;
                margin-right: 20px;
                padding-right: 20px;
                height: 20px;
                line-height: 20px;
                border-right: 1px dashed #DDDDDD;
            }
        }
        .flowStyle{
            margin-top: 12px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            border:1px solid rgba(238,238,238,1);
            text-align: center;
            .start1{
                margin: 0 auto;
                width:450px;
                height:32px;
                line-height: 32px;
                background:rgba(244,244,244,1);
                border-radius:16px 16px 0px 0px;
                border:1px solid rgba(238,238,238,1);
                color: #111111;
                font-size: 14px;
            }
            .start2{
                margin: 0 auto;
                width:450px;
                min-height:50px;
                padding: 14px 12px 14px 14px;
                background:rgba(255,255,255,1);
                box-shadow:0px 0px 10px 0px rgba(0,0,0,0.1);
                border-radius:0px 0px 16px 16px;
                border:1px solid rgba(238,238,238,1);
                .content{
                    text-align: left;
                    width: 100%;
                    .ccTitle{
                        margin-left: 5px;
                        color: #333333;
                        font-size: 14px;
                        font-weight:600;
                    }
                    .ccName{
                        margin-left: 20px;
                        font-size:12px;
                        width: 310px;
                        margin-top: 2px;
                        vertical-align: bottom;
                    }
                }
            }
            .next1{
                height: 20px;
                width: 1px;
                background-color: #DDDDDD;
                margin: 0 auto;
            }
            .next2{
                margin: 0 auto;
                width:30px;
                height:30px;
                background:rgba(255,255,255,1);
                border-radius:50%;
                background: url('../../../../assets/workflow/add.png') no-repeat;
                background-size:100% 100%;
            }
            .addApproval{
                width:116px;
                height:30px;
                line-height: 30px;
                background:rgba(255,255,255,1);
                border-radius:15px;
                border:1px solid rgba(221,221,221,1);
                color: #0A87F8;
                margin: 0 auto;
            }
            .next3{
                height: 12px;
                width: 1px;
                background-color: #DDDDDD;
                margin: 0 auto;
            }
            .arrow-bottom {
                width: 0;
                height: 0;
                border-left: 3px solid transparent;  /* 左边框的宽 */
                border-right: 4px solid transparent; /* 右边框的宽 */
                border-top: 8px solid #DDDDDD; /* 下边框的长度|高,以及背景色 */
                font-size: 0;
                line-height: 0;
                margin: 0 auto;
            }
            .approval{
                width:450px;
                background:rgba(255,255,255,1);
                box-shadow:0px 0px 10px 0px rgba(0,0,0,0.1);
                border-radius:4px;
                border:1px solid rgba(238,238,238,1);
                margin: 0 auto;
                .content{
                    text-align: left;
                    width:450px;
                    padding: 14px 12px 10px 14px;
                    .approvalInfo{
                        width: 100%;
                        min-height: 40px;
                        .ccTitle{
                            margin-left: 5px;
                            color: #111111;
                            font-size: 16px;
                            font-weight:600;
                        }
                        .approvalName{
                            width: 270px;
                            margin-left: 20px;
                            font-size:14px;
                            vertical-align: bottom;
                            margin-top: 4px;
                            .auditModeStyle{
                                color: #777777;
                                font-size: 12px;
                            }
                        }
                    }
                    .ccInfo{
                        width: 100%;
                        min-height: 24px;
                        .ccTitle{
                            margin-left: 5px;
                            color: #333333;
                            font-size: 14px;
                            font-weight:600;
                        }
                        .ccName{
                            margin-left: 20px;
                            font-size:12px;
                            vertical-align: bottom;
                            width: 280px;
                            margin-top: 2px;
                        }
                    }
                }
            }
            .end{
                margin: 0 auto;
                width:450px;
                height:32px;
                line-height: 32px;
                background:rgba(244,244,244,1);
                border-radius:16px;
                border:1px solid rgba(238,238,238,1);
                color: #111111;
                font-size: 14px;
            }
            .img16{
                svg{
                    width: 16px;
                    height: 16px;
                }
            }
            .nocc{
                color: #BBBBBB;
            }
            .havecc{
                color: #5A5A5A;
            }
            .approvalInfoColor{
                color: #333333;
            }
            .otherColor{
                color: #777777;
            }
        }
        & /deep/ .ant-tabs .ant-tabs-small-bar .ant-tabs-tab{
            padding: 8px 0;
        }
        & /deep/ .anticon {
            margin-right: 1px;
        }
        .animate-box{
            flex-wrap: wrap;
            animation: skeleton-blink 1.2s ease infinite;
            -webkit-animation: skeleton-blink 1.2s ease infinite;
            background-image: -webkit-gradient(linear, left top, right top, color-stop(25%, #f0f0f0), color-stop(37%, #e3e3e3), color-stop(63%, #f0f0f0));
            background-image: -o-linear-gradient(left, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
            background-image: linear-gradient(90deg, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
            background-size: 400% 100%;
        }
        @-webkit-keyframes skeleton-blink {
            0% {
                background-position: 100% 50%
            }

            to {
                background-position: 0 50%
            }
        }
        @keyframes skeleton-blink {
            0% {
                background-position: 100% 50%
            }

            to {
                background-position: 0 50%
            }

        }
        /deep/ .label-item textarea.ant-input{
            padding: 4px 0;
        }
    }
</style>