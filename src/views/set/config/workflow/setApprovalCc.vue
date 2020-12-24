<template>
    <div class="setApprovalCc-box">
        <div class="setApproval-title">
            <span class="big-title">审批人设置<span class="mustFillStyle">*</span></span>
        </div>
        <div class="setApproval-content clearfix">
            <div class="set-btn set-btn-left cursor f-fl" :class="operatorType==1?'clickStyle':'unClickStyle'" @click="changeOperatorType(1)">指定人</div>
            <div class="set-btn set-btn-right cursor f-fl" :class="operatorType==2?'clickStyle':'unClickStyle'" @click="changeOperatorType(2)">指定角色</div>
            <div class="f-fl" style="margin-left: 10px;" v-if="operatorType==1">
                <!-- 指定审核人 -->
                <dept-user-multiple placeholderName="请选择审核人" :selectIdList="currentOperatorIdList" :selectNameList="currentOperatorNameList" @selectChange="setOperator" :selectInputStyle="'width:338px;padding:2px 0 0 0'" :currentInputInputStyle="'height:28px'" :currentSelectStyle="'width:338px;z-index:99;'"></dept-user-multiple>
            </div>
            <div class="setRole f-fl" style="width:338px;margin-left: 10px;" v-if="operatorType==2">
                <!-- 指定审核角色 -->
                <!--<set-role placeholderName="请选择审核角色" :selectInputStyle="'width:338px;padding:2px 0 0 0'" :currentInputInputStyle="'height:28px'" :currentSelectStyle="'width:338px;z-index:99;'"></set-role>-->
                <label-item title="" class="u-bottom-border">
                    <a-select style="width:338px" placeholder="请选择角色" @change="handleChange" :default-value="currentOperatorIdList" v-if="roleList&&roleList.length>0">
                        <a-select-option v-for="(item) in roleList" :key="item.id" :disabled="item.disabled">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </label-item>
            </div>
        </div>
        <div class="setApproval-little-tile" v-if="currentOperatorIdList.length>1||operatorType==2">
            多人审批时
        </div>
        <div class="bizModuleStyle clearfix" v-if="currentOperatorIdList.length>1||operatorType==2">
            <div class="f-fl clearfix" style="margin-right: 30px;">
                <div class="f-fl allCheck checked" v-if="auditMode==2">
                    <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                    <div class="f-fl fontStyle">或签</div>
                    <div class="f-fl otherFontStyle">(一名负责人通过或拒绝即可)</div>
                </div>
                <div class="f-fl allCheck cursor clearfix" v-else @click="changeAuditMode(2)">
                    <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                    <div class="f-fl fontStyle">或签</div>
                    <div class="f-fl otherFontStyle">(一名负责人通过或拒绝即可)</div>
                </div>
            </div>
            <div class="f-fl clearfix" style="margin-right: 30px;">
                <div class="f-fl allCheck checked" v-if="auditMode==1">
                    <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                    <div class="f-fl fontStyle">会签</div>
                    <div class="f-fl otherFontStyle">(需所有负责人通过)</div>
                </div>
                <div class="f-fl allCheck cursor clearfix" v-else @click="changeAuditMode(1)">
                    <div class="f-fl cursor"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                    <div class="f-fl fontStyle">会签</div>
                    <div class="f-fl otherFontStyle">(需所有负责人通过)</div>
                </div>
            </div>
        </div>
        <div class="setCc-title">
            <span class="big-title">抄送人设置</span><span class="small-title">(非必填项)</span>
        </div>
        <div>
            <dept-user-multiple placeholderName="请选择抄送人" :selectIdList="currentCcPeopleIdList" :selectNameList="currentCcPeopleNameList" @selectChange="setCc" :selectInputStyle="'width:481px;padding:6px 0 0 0;'" :currentInputInputStyle="'height:28px'" :currentSelectStyle="'width:481px;top:-302px;z-index:99'"></dept-user-multiple>
        </div>
        <div class="clearfix" style="width: 100%;margin-top:45px;">
            <div class="buttonDiv f-fr">
                <a-button size="large" @click="cancelSet" class="formItemMarginButton cancelFont">
                    取消
                </a-button>
                <a-button size="large" @click="confirmSet" type="primary" class="formItemMarginButton saveFont">
                    保存
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import DeptUserMultiple from '@/components/DeptEmployeeTree/deptUserMultiple';
    import {listRoleStat} from '@/api/set';
    //import SetRole from './setRole';
    export default {
        name: "setCc",
        components: {
            DeptUserMultiple,
            //SetRole,
        },
        props: {
            currentSetNode: {
                type: Object,
            },
            currentSetIndex:{
                type: Number,
            },
        },
        data() {
            return {
                operatorType:1,
                auditMode:undefined,
                currentOperatorIdList:[],
                currentOperatorNameList:[],
                currentCcPeopleIdList:[],
                currentCcPeopleNameList:[],
                roleList:[],
            }
        },
        watch: {
        },
        created: function () {
            if(this.currentSetNode&&this.currentSetNode.operatorIdList&&this.currentSetNode.operatorIdList.length>0){
                this.currentOperatorIdList = this.currentSetNode.operatorIdList;
            }
            if(this.currentSetNode&&this.currentSetNode.operatorNameList&&this.currentSetNode.operatorNameList.length>0){
                this.currentOperatorNameList = this.currentSetNode.operatorNameList;
            }
            if(this.currentSetNode&&this.currentSetNode.ccPeopleIdList&&this.currentSetNode.ccPeopleIdList.length>0){
                this.currentCcPeopleIdList = this.currentSetNode.ccPeopleIdList;
            }
            if(this.currentSetNode&&this.currentSetNode.ccPeopleNameList&&this.currentSetNode.ccPeopleNameList.length>0){
                this.currentCcPeopleNameList = this.currentSetNode.ccPeopleNameList;
            }
            if(this.currentSetNode&&this.currentSetNode.auditMode){
                this.auditMode = this.currentSetNode.auditMode;
            }
            if(this.currentSetNode&&this.currentSetNode.operatorType){
                this.operatorType = this.currentSetNode.operatorType;
            }
            this.initRoleList();
        },
        methods: {
            initRoleList(){
                this.roleList = [];
                let parameter={};
                listRoleStat(parameter).then(res => {
                    if (res.code == 200) {
                        this.roleList = res.data;
                        this.roleList.forEach((item)=>{
                            if(item.empTotal == 0){
                                item.disabled = true;
                            } else{
                                item.disabled = false;
                            }
                        })
                    }
                })
            },
            handleChange(value){
                this.currentOperatorIdList = [];
                this.currentOperatorNameList = [];
                this.currentOperatorIdList.push(value);
                this.roleList.forEach((item)=>{
                    if(item.id == value){
                        this.currentOperatorNameList.push(item.name);
                    }
                });
            },
            changeOperatorType(val){
                this.operatorType = val;
                this.currentOperatorIdList = [];
                this.currentOperatorNameList = [];
                if(val==2){
                    this.auditMode = 2;
                }
                if(val==1){
                    this.auditMode = undefined;
                }
            },
            setOperator(currentSelectId,currentSelectName){
                this.currentOperatorIdList = currentSelectId;
                this.currentOperatorNameList = currentSelectName;
                if(this.currentOperatorIdList.length>1){
                    this.auditMode = 2;
                }
                else{
                    this.auditMode = undefined;
                }
            },
            setCc(currentSelectId,currentSelectName){
                this.currentCcPeopleIdList = currentSelectId;
                this.currentCcPeopleNameList = currentSelectName;
            },
            changeAuditMode(val){
                this.auditMode = val;
            },
            cancelSet(){
                this.$emit('cancelSet');
            },
            confirmSet(){
              //若没有选择会签/或签，默认会签
              if(!this.auditMode){
                this.auditMode = 1;
              }
                let obj = {
                    auditMode:this.auditMode,
                    operatorType:this.operatorType,
                    ccPeopleIdList:this.currentCcPeopleIdList,
                    operatorIdList:this.currentOperatorIdList,
                    operatorNameList:this.currentOperatorNameList,
                    ccPeopleNameList:this.currentCcPeopleNameList,
                };
                if(this.currentOperatorIdList.length==0){
                    this.$message.warning('请选择审核人');
                    return;
                }
                this.$emit('successSet',obj,this.currentSetIndex);
            },
        }
    }
</script>

<style lang="less" scoped>
    .setApprovalCc-box{
        padding: 20px;
        .big-title{
            color: #333333;
            font-size: 18px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            line-height:25px;
        }
        .setCc-title{
            margin-top: 40px;
            margin-bottom: 3px;
            .small-title{
                color: #777777;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                line-height:20px;
                margin-left: 5px;
            }
        }
        .setApproval-title{
            margin-bottom: 15px;
        }
        .setApproval-content{
            .set-btn{
                width:66px;
                height:32px;
                line-height: 32px;
                text-align: center;
            }
            .set-btn-left{
                border-radius:6px 0px 0px 6px;
            }
            .set-btn-right{
                border-radius:0px 6px 6px 0px;
            }
            .unClickStyle{
                background:rgba(246,247,248,1);
                border:1px solid rgba(221,221,221,1);
                color: #777777;
            }
            .clickStyle{
                background:rgba(10,135,248,1);
                color: #FFFFFF;
            }
        }
        .bizModuleStyle{
            .allCheck{
                height: 24px;
                line-height: 24px;
                svg{
                    width: 16px;
                    height: 16px;
                    vertical-align: -0.1em;
                }
            }
            .checked{
                color: #0A87F8;
                .svg{
                    width: 16px;
                    height: 16px;
                    vertical-align: -0.1em;
                }
            }
            .fontStyle{
                margin-left: 5px;
                height:24px;
                font-size:14px;
                line-height:24px;
                color: #111111;
            }
            .otherFontStyle{
                color: #777777;
                font-size: 12px;
                margin-left: 4px;
                line-height: 27px;
            }
        }
        .setApproval-little-tile{
            margin: 20px 0 10px;
            color: #333333;
            font-size: 14px;
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
        .mustFillStyle{
            color: #FB4246;
            margin-left: 4px;
            font-size: 14px;
        }
        /deep/ .ant-select-selection__rendered{
            margin-left: 0;
        }
    }

</style>