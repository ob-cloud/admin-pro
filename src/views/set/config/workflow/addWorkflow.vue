<template>
    <div class="addWorkflow-box">
        <div class="title" style="margin: 3.5px 0 6px 0">作用范围<span class="mustFillStyle">*</span></div>
        <div class="deptTree">
            <dept-employee-tree placeholder="请选择需要审批的数据来源范围" :showNameAll="false" :showEmployee="false" @selectChange="selectDept" placement="bottomRight" ref="selectDeptEmp"></dept-employee-tree>
        </div>
        <div class="title" style="margin: 20px 0 9px 0">发起审批类型<span class="mustFillStyle">*</span></div>
        <div class="bizModuleStyle clearfix">
            <div class="f-fl clearfix" style="margin-right: 20px;">
                <div class="f-fl allCheck checked" v-if="addWorkflowForm.bizScene==11">
                    <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                    <div class="f-fl fontStyle">租客签约<span style="font-size:14px;color: #777777">(电子合同)</span></div>
                </div>
                <div class="f-fl allCheck cursor clearfix" v-else @click="changeBizScene(11)">
                    <div class="f-fl cursor"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                    <div class="f-fl fontStyle">租客签约<span style="font-size:14px;color: #777777">(电子合同)</span></div>
                </div>
            </div>
            <div class="f-fl clearfix" style="margin-right: 20px;">
                <div class="f-fl allCheck checked" v-if="addWorkflowForm.bizScene==12">
                    <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                    <div class="f-fl fontStyle">租客签约<span style="font-size:14px;color: #777777">(纸质合同)</span></div>
                </div>
                <div class="f-fl allCheck clearfix cursor" v-else @click="changeBizScene(12)">
                    <div class="f-fl cursor" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                    <div class="f-fl fontStyle">租客签约<span style="font-size:14px;color: #777777">(纸质合同)</span></div>
                </div>
            </div>
            <div class="f-fl clearfix" style="margin-right: 20px;">
              <div class="f-fl allCheck checked" v-if="addWorkflowForm.bizScene==13">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">租客退租</div>
              </div>
              <div class="f-fl allCheck clearfix cursor" v-else @click="changeBizScene(13)">
                <div class="f-fl cursor" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">租客退租</div>
              </div>
            </div>
            <div class="f-fl clearfix" style="margin-right: 20px;">
                <div class="f-fl allCheck checked" v-if="addWorkflowForm.bizScene==21">
                    <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                    <div class="f-fl fontStyle">业主合同</div>
                </div>
                <div class="f-fl allCheck clearfix cursor" v-else @click="changeBizScene(21)">
                    <div class="f-fl cursor" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                    <div class="f-fl fontStyle">业主合同</div>
                </div>
            </div>
            <div class="f-fl clearfix" style="margin-right: 20px;">
                <div class="f-fl allCheck checked" v-if="addWorkflowForm.bizScene==32">
                    <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                    <div class="f-fl fontStyle">付款申请</div>
                </div>
                <div class="f-fl allCheck clearfix cursor" v-else @click="changeBizScene(32)">
                    <div class="f-fl cursor" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                    <div class="f-fl fontStyle">付款申请</div>
                </div>
            </div>
            <div class="f-fl clearfix">
              <div class="f-fl allCheck checked" v-if="addWorkflowForm.bizScene==31">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">财务流水</div>
              </div>
              <div class="f-fl allCheck clearfix cursor" v-else @click="changeBizScene(31)">
                <div class="f-fl cursor" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">财务流水</div>
              </div>
            </div>
        </div>
        <div class="title" style="margin: 25px 0 0 0">审批流程<span class="mustFillStyle">*</span></div>
        <div class="flowStyle">
            <div style="height: 20px;"></div>
            <div class="start1">
                发起
            </div>
            <div class="start2 cursor" @click="setCcDialog=true;">
                <div class="content clearfix">
                    <div class="f-fl img16"><icon-font style="color: #0A87F8;margin-top：2px;" type="iconchaosong" /></div>
                    <div class="ccTitle f-fl" style="line-height: 17px;">抄送人</div>
                    <span class="f-fl ccName nocc" style="margin-top:0;" v-if="addWorkflowForm.ccPeopleNameList.length==0">未设置</span>
                    <span class="f-fl ccName havecc" v-else>{{addWorkflowForm.ccPeopleNameList.join('、')}}</span>
                    <div class="f-fr cursor" @click="setCcDialog=true;"><icon-font style="color: #0A87F8;" type="iconyumengtubiao_bianji-" /></div>
                </div>
            </div>
            <div class="next1">
            </div>
            <div class="addApproval cursor" v-if="indexAddBtn==0" @click="addWorkflowNode(0)" @mouseleave="indexAddBtn=-1">
                添加审批环节
            </div>
            <div class="next2" v-else @mouseenter="indexAddBtn=0">
            </div>
            <div class="next3">
            </div>
            <div class="arrow-bottom">
            </div>
            <div v-for="(item,index) in addWorkflowForm.nodeList" :key="index" style="width: 100%;">
                <div class="approval cursor" @click="openSetApprovalCc(index)">
                    <div class="content">
                        <div class="approvalInfo clearfix">
                            <div class="f-fl img16" style="line-height: 31px"><icon-font style="color: #FFA036;" type="iconshenhe" /></div>
                            <div class="ccTitle f-fl" style="margin-top:3px" v-if="item.operatorType==1">审批人</div>
                            <div class="ccTitle f-fl" v-if="item.operatorType==2">审批角色</div>
                            <div class="f-fl approvalName nocc" v-if="item.operatorNameList.length==0">未设置</div>
                            <div class="f-fl approvalName approvalInfoColor" v-else>
                                {{item.operatorNameList.join('、')}}
                                <span v-if="item.operatorType==1&&item.operatorNameList.length>1" class="auditModeStyle">({{item.operatorNameList.length}}{{item.auditMode==1?'人会签':'人或签'}})</span>
                                <span v-if="item.operatorType==2" class="auditModeStyle">({{item.auditMode==1?'会签':'或签'}})</span>
                            </div>
                            <div class="f-fr cursor" style="line-height: 30px;margin-left: 10px" v-if="addWorkflowForm.nodeList.length>1" @click.stop="deleteWorkflowNode(index)"><icon-font style="color:#f5222d" type="iconyumengtubiao_shanchu-" /></div>
                            <div class="f-fr cursor" style="line-height: 30px" @click="openSetApprovalCc(index)"><icon-font style="color: #0A87F8;" type="iconyumengtubiao_bianji-" /></div>
                        </div>
                        <div class="ccInfo clearfix">
                            <div class="f-fl img16"><icon-font style="color: #0A87F8;margin-top:1px" type="iconchaosong" /></div>
                            <div class="ccTitle f-fl">抄送人</div>
                            <span class="f-fl ccName nocc"  v-if="item.ccPeopleNameList.length==0">未设置</span>
                            <span class="f-fl ccName havecc"  v-else>{{item.ccPeopleNameList.join('、')}}</span>
                        </div>
                    </div>
                </div>
                <div class="next1">
                </div>
                <div class="addApproval cursor" v-if="indexAddBtn==(index+1)" @click="addWorkflowNode(index+1)" @mouseleave="indexAddBtn=-1">
                    添加审批环节
                </div>
                <div class="next2" v-else @mouseenter="indexAddBtn=(index+1)">
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
        <div class="title" style="margin: 20px 0 6px 0">审批说明</div>
        <label-item class="u-bottom-border commentStyle" :valLength="addWorkflowForm.comment.length" :maxSize="100">
            <a-textarea v-model="addWorkflowForm.comment" maxlength="100" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入"></a-textarea>
        </label-item>
        <div class="clearfix" style="width: 100%;margin-top:45px;">
            <div class="buttonDiv f-fr">
                <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                    取消
                </a-button>
                <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="saveWorkflow">
                    保存
                </a-button>
            </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="setCcDialog" class="ownModalBorder titDialog" title="设置抄送人" @cancel="setCcDialog=false">
            <set-cc :ccPeopleIdList="addWorkflowForm.ccPeopleIdList" :ccPeopleNameList="addWorkflowForm.ccPeopleNameList" @cancelSet="setCcDialog=false" @successSet="successSetCc"></set-cc>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="setApprovalCcDialog" class="ownModalBorder titDialog" title="设置审批人" @cancel="setApprovalCcDialog=false">
            <set-approval-cc :currentSetNode="currentSetNode" :currentSetIndex="currentSetIndex" @cancelSet="setApprovalCcDialog=false" @successSet="successSetApprovalCc"></set-approval-cc>
        </a-modal>
    </div>
</template>

<script>
    import DeptEmployeeTree from '@/components/DeptEmployeeTree';
    import * as API from '@/api/setConfig';
    import ATextarea from "ant-design-vue/es/input/TextArea";
    import  SetCc from './setCc';
    import  SetApprovalCc from './setApprovalCc';

    export default {
        name: "addTransfer",
        components: {
            ATextarea,
            DeptEmployeeTree,
            SetCc,
            SetApprovalCc,
        },
        data() {
            return {
                saveLoading:false,
                addWorkflowForm:{
                    id:'',
                    bizModule:1,
                    bizScene:11,
                    deptId:'',
                    comment:'',
                    nodeList:[{
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
                    }],
                    ccPeopleIdList:[],
                    ccPeopleNameList:[],
                    ccPeopleList:[],
                },
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
            }
        },
        created() {
        },
        methods: {
            successSetApprovalCc(currentSetNode,currentSetIndex){
                this.setApprovalCcDialog = false;
                this.addWorkflowForm.nodeList[currentSetIndex] = currentSetNode;
            },
            successSetCc(currentSelectId,currentSelectName){
                this.setCcDialog = false;
                this.addWorkflowForm.ccPeopleIdList = currentSelectId;
                this.addWorkflowForm.ccPeopleNameList = currentSelectName;
            },
            openSetApprovalCc(val){
                this.currentSetIndex = val;
                this.currentSetNode = this.addWorkflowForm.nodeList[val];
                this.setApprovalCcDialog = true;
            },
            deleteWorkflowNode(val){
                this.addWorkflowForm.nodeList.splice(val,1);
            },
            addWorkflowNode(val){
                this.addWorkflowForm.nodeList.splice(val,0,this.defaultNode);
            },
            changeBizScene(val){
                this.addWorkflowForm.bizScene = val;
                if(val==11||val==12||val==13){
                    this.addWorkflowForm.bizModule = 1;
                }
                else if(val==21){
                    this.addWorkflowForm.bizModule = 2;
                }
                else if(val==31||val==32){
                    this.addWorkflowForm.bizModule = 3;
                }
                if(this.addWorkflowForm.deptId){
                    this.definitionViewByDept();
                }
            },
            //选择负责人
            selectDept(selectObj) {
                this.addWorkflowForm.deptId = selectObj.id;
                this.definitionViewByDept();
            },
            definitionViewByDept(){
                let parameter = {
                    deptId:this.addWorkflowForm.deptId,
                    bizModule:this.addWorkflowForm.bizModule,
                    bizScene:this.addWorkflowForm.bizScene,
                };
                //根据部门、业务模块
                API.definitionViewByDept(parameter).then(res => {
                    if (res.code === '200') {
                        let temp = res.data;
                        if(temp){
                            //提示是否修改
                            let _this = this;
                            this.$modal.confirm({
                                title: '检测到该部门已配置审批流程，是否修改？',
                                content: '',
                                okText: '确定',
                                cancelText: '取消',
                                onOk() {
                                    _this.initData(temp);
                                },
                                onCancel() {
                                    _this.addWorkflowForm.deptId = '';
                                    _this.$refs.selectDeptEmp.resetData();
                                },
                            });
                        }
                        else{
                            //清空id
                            this.addWorkflowForm.id = '';
                        }
                    }
                });
            },
            initData(temp){
                this.addWorkflowForm = temp;
                this.addWorkflowForm.nodeList.forEach((item)=>{
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
                });
                let ccPeopleIdList = [];
                let ccPeopleNameList = [];
                this.addWorkflowForm.ccPeopleList.forEach((item)=>{
                    ccPeopleIdList.push(item.id);
                    ccPeopleNameList.push(item.name);
                });
                this.addWorkflowForm.ccPeopleIdList = ccPeopleIdList;
                this.addWorkflowForm.ccPeopleNameList = ccPeopleNameList;
            },
            cancelSave(){
                this.$emit('cancelSave');
            },
            saveWorkflow(){
                if(!this.addWorkflowForm.deptId){
                    this.$message.warning("请选择作用范围");
                    return;
                }
                if(!this.addWorkflowForm.bizModule||!this.addWorkflowForm.bizScene){
                    this.$message.warning("请选择审批模块");
                    return;
                }
                let noOperaterFlag = false;
                this.addWorkflowForm.nodeList.forEach((item)=>{
                    if(!item.operatorIdList||item.operatorIdList.length==0){
                        noOperaterFlag = true;
                    }
                });
                if(noOperaterFlag){
                    this.$message.warning("请完善审批信息");
                    return;
                }
                if(this.addWorkflowForm.id){
                    API.definitionEdit(this.addWorkflowForm).then(res => {
                        if(!res){
                            this.saveLoading= false;
                        }
                        if (res.code === '200') {
                            this.$message.success('审批流程修改成功');
                            this.$emit('successSave');
                        } else {
                            this.saveLoading = false;
                            this.$message.success('审批流程修改失败');
                        }
                    });
                }
                else{
                    API.definitionAdd(this.addWorkflowForm).then(res => {
                        if(!res){
                            this.saveLoading= false;
                        }
                        if (res.code === '200') {
                            this.$message.success('审批流程配置成功');
                            this.$emit('successSave');
                        } else {
                            this.saveLoading = false;
                            this.$message.success('审批流程配置失败');
                        }
                        if(!res){
                            this.saveLoading= false
                        }
                    });
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .addWorkflow-box{
        padding: 20px;
        height: calc(100vh - 100px);
        width: 800px;
        overflow: auto;
        .title{
            font-size: 18px;
            color: #111111;
            font-weight: 500;
        }
        .flowStyle{
            margin-top: 15px;
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
                        line-height: 19px;
                    }
                    .ccName{
                        margin-left: 20px;
                        font-size:12px;
                        vertical-align: bottom;
                        width: 310px;
                        margin-top: 2px;
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
                        margin-bottom: 9px;
                        .ccTitle{
                            margin-left: 5px;
                            color: #111111;
                            font-size: 16px;
                            font-weight:600;
                            line-height: 19px;
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
                            line-height: 19px;
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
        .bizModuleStyle{
            .allCheck{
                height: 24px;
                line-height: 24px;
                svg{
                    width: 18px;
                    height: 18px;
                    vertical-align: -0.2em;
                }
            }
            .checked{
                color: #0A87F8;
                .svg{
                    width: 16px;
                    height: 16px;
                    vertical-align: -0.125em;
                }
            }
            .fontStyle{
                margin-left: 5px;
                height:24px;
                font-size:14px;
                color: #111111;
                line-height:24px;
            }
        }
        .mustFillStyle{
            color: #FB4246;
            margin-left: 4px;
            font-size: 14px;
        }
        .deptTree{
            width: 400px;
            /deep/ .tree-wrap .overHiddeSpan .ant-input{
                width: 100%;
            }
            /deep/ .ant-input-affix-wrapper .ant-input-suffix{
                right: 0px;
            }
        }
        .buttonDiv {
            .formItemMarginButton {
                width: 120px;
                height: 40px;
                margin-left: 18px;
            }
            .cancelFont {
                color: #666666;
            }
            .saveFont {
                color: #FFFFFF;
                background-color: #0A87F8;
            }
        }
    }

</style>