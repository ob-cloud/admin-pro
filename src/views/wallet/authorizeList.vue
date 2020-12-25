<template>
    <!--  账户管理人界面 -->
    <div class="authorizeList-box">
        <div class="contentStyle">
            <div class="clearfix" style="margin-top: 3.5px;">
                <div class="titleStyle f-fl">账户管理人</div>
                <div class="addStyle f-fr cursor" @click="AddAuthorizeObj" v-if="isEdit">
                    <icon-font style="margin-right: 7px;" type="iconyumengtubiao_tianjia" />添加管理人
                </div>
            </div>
            <div class="basicsInfo" style="margin-top: 13.5px;">
                <div class="table">
                    <div class="table-title">
                        <div style="max-width: 100px;text-align: left;padding-left: 12px;color: #777777;font-size: 13px;">管理人</div>
                        <div :style="isEdit?'max-width: 593px;':'max-width: 658px;'" style="text-align: left;padding-left: 14px;color: #777777;font-size: 13px;">权限</div>
                        <div v-if="isEdit" style="max-width: 65px;text-align: center;color: #777777;font-size: 13px;">操作</div>
                    </div>
                    <div class="house-data u-no-border" v-for="(item,index) in authorizeList" :key="index">
                        <div class="clearfix" style="max-width: 100px;padding-left: 12px;" >
                            <icon-font style="color: #0A87F8;margin-right: 10px;" type="iconren"/>{{item.name}}
                        </div>
                        <div class="clearfix operateStyle" :style="isEdit?'max-width: 593px;':'max-width: 658px;'"  style="padding-left: 14px;" >
                            <div class="itemStyle width-59 f-fl" v-if="!isEdit" :class="item.operationList.indexOf(1)>-1?'selected':'unSelect'">
                                查看<icon-font class="selectedStyle" v-show="item.operationList.indexOf(1)>-1" type="iconyumengtubiao_xuanzhong-" />
                            </div>
                            <div class="itemStyle width-59 f-fl" v-if="isEdit" :class="item.operationList.indexOf(1)>-1?'selected':'unSelect'">
                                查看<icon-font class="unEditStyle" v-show="item.operationList.indexOf(1)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                            </div>
                            <div class="itemStyle width-59 f-fl" v-if="!isEdit" :class="item.operationList.indexOf(2)>-1?'selected':'unSelect'">
                                充值<icon-font class="selectedStyle" v-show="item.operationList.indexOf(2)>-1" type="iconyumengtubiao_xuanzhong-" />
                            </div>
                            <div class="itemStyle width-59 f-fl cursor" v-if="isEdit&&item.isOwner==0" :class="item.operationList.indexOf(2)>-1?'selected':'unSelect'" @click="changeOperation(item,2)">
                                充值<icon-font class="selectedStyle" v-if="item.operationList.indexOf(2)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                                <icon-font class="unselectStyle" v-else type="iconyumengtubiao_duoxuan-weixuanze" />
                            </div>
                            <div class="itemStyle width-59 f-fl" v-if="isEdit&&item.isOwner==1" :class="item.operationList.indexOf(2)>-1?'selected':'unSelect'">
                                充值<icon-font class="unEditStyle" v-show="item.operationList.indexOf(2)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                            </div>
                            <div class="itemStyle width-59 f-fl" v-if="!isEdit" :class="item.operationList.indexOf(3)>-1?'selected':'unSelect'">
                                提现<icon-font class="selectedStyle" v-show="item.operationList.indexOf(3)>-1" type="iconyumengtubiao_xuanzhong-" />
                            </div>
                            <div class="itemStyle width-59 f-fl cursor" v-if="isEdit&&item.isOwner==0" :class="item.operationList.indexOf(3)>-1?'selected':'unSelect'" @click="changeOperation(item,3)">
                                提现<icon-font class="selectedStyle" v-if="item.operationList.indexOf(3)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                                <icon-font class="unselectStyle" v-else type="iconyumengtubiao_duoxuan-weixuanze" />
                            </div>
                            <div class="itemStyle width-59 f-fl cursor" v-if="isEdit&&item.isOwner==1" :class="item.operationList.indexOf(3)>-1?'selected':'unSelect'" @click="changeOperation(item,3)">
                                提现<icon-font class="unEditStyle" v-show="item.operationList.indexOf(3)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                            </div>
                            <div class="itemStyle width-59 f-fl" v-if="!isEdit" :class="item.operationList.indexOf(4)>-1?'selected':'unSelect'">
                                转账<icon-font class="selectedStyle" v-show="item.operationList.indexOf(4)>-1" type="iconyumengtubiao_xuanzhong-" />
                            </div>
                            <div class="itemStyle width-59 f-fl cursor" v-if="isEdit&&item.isOwner==0" :class="item.operationList.indexOf(4)>-1?'selected':'unSelect'" @click="changeOperation(item,4)">
                                转账<icon-font class="selectedStyle" v-if="item.operationList.indexOf(4)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                                <icon-font class="unselectStyle" v-else type="iconyumengtubiao_duoxuan-weixuanze" />
                            </div>
                            <div class="itemStyle width-59 f-fl" v-if="isEdit&&item.isOwner==1" :class="item.operationList.indexOf(4)>-1?'selected':'unSelect'">
                                转账<icon-font class="unEditStyle" v-show="item.operationList.indexOf(4)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                            </div>
                            <div class="itemStyle width-101 f-fl" v-if="!isEdit" :class="item.operationList.indexOf(5)>-1?'selected':'unSelect'">
                                银行卡管理<icon-font class="selectedStyle" v-show="item.operationList.indexOf(5)>-1" type="iconyumengtubiao_xuanzhong-" />
                            </div>
                            <div class="itemStyle width-101 f-fl cursor" v-if="isEdit&&item.isOwner==0" :class="item.operationList.indexOf(5)>-1?'selected':'unSelect'" @click="changeOperation(item,5)">
                                银行卡管理<icon-font class="selectedStyle" v-if="item.operationList.indexOf(5)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                                <icon-font class="unselectStyle" v-else type="iconyumengtubiao_duoxuan-weixuanze" />
                            </div>
                            <div class="itemStyle width-101 f-fl" v-if="isEdit&&item.isOwner==1" :class="item.operationList.indexOf(5)>-1?'selected':'unSelect'">
                                银行卡管理<icon-font class="unEditStyle" v-show="item.operationList.indexOf(5)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                            </div>
                            <div class="itemStyle width-87 f-fl" v-if="!isEdit" :class="item.operationList.indexOf(6)>-1?'selected':'unSelect'">
                                人员管理<icon-font class="selectedStyle" v-show="item.operationList.indexOf(6)>-1" type="iconyumengtubiao_xuanzhong-" />
                            </div>
                            <div class="itemStyle width-87 f-fl cursor" v-if="isEdit&&item.isOwner==0" :class="item.operationList.indexOf(6)>-1?'selected':'unSelect'" @click="changeOperation(item,6)">
                                人员管理<icon-font class="selectedStyle" v-if="item.operationList.indexOf(6)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                                <icon-font class="unselectStyle" v-else type="iconyumengtubiao_duoxuan-weixuanze" />
                            </div>
                            <div class="itemStyle width-87 f-fl" v-if="isEdit&&item.isOwner==1" :class="item.operationList.indexOf(6)>-1?'selected':'unSelect'">
                                人员管理<icon-font class="unEditStyle" v-show="item.operationList.indexOf(6)>-1" type="iconyumengtubiao_duoxuan-yixuanze" />
                            </div>
                            <div class="itemStyle width-66 f-fl selected" v-if="!isEdit&&item.isOwner==1">普通验证</div>
                            <div class="itemStyle width-66 f-fl selected" v-if="!isEdit&&item.transactionVerifyMode==1&&item.isOwner==0">普通验证</div>
                            <div class="itemStyle width-52 f-fl selected" v-else-if="!isEdit&&item.transactionVerifyMode==9&&item.isOwner==0">强验证</div>
                            <div class="itemStyle width-66 f-fl selected" v-if="isEdit&&item.isOwner==1">普通验证</div>
                            <div class="itemStyle width-66 f-fl selected cursor" v-if="isEdit&&item.transactionVerifyMode==1&&item.isOwner==0" @click="item.transactionVerifyMode=9">普通验证</div>
                            <div class="itemStyle width-52 f-fl selected cursor" v-else-if="isEdit&&item.transactionVerifyMode==9&&item.isOwner==0" @click="item.transactionVerifyMode=1">强验证</div>
                        </div>
                        <div class="clearfix" style="max-width: 65px;padding-left: 25px;" v-if="isEdit">
                            <div class="deleteIconStyle f-fl cursor" @click="deleteAuthorizeObj(index)" v-if="isEdit&&item.isOwner==0">
                                <icon-font style="color: #FB4246;" type="iconyumengtubiao_shanchu-" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix" style="width: 100%;margin-top:40px;">
                <div class="buttonDiv f-fr" v-if="!isEdit">
                    <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="isEdit=true;">
                        编辑
                    </a-button>
                </div>
                <div class="buttonDiv f-fr" v-if="isEdit">
                    <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelEdit()">
                        取消
                    </a-button>
                    <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="saveAuthorizeList">
                        保存
                    </a-button>
                </div>
            </div>
        </div>
        <!-- 添加/编辑账户管理人 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addManagerUserDialog" class="ownModalBorder titDialog" title="添加管理人" @cancel="addManagerUserDialog=false" width="520px">
            <add-manager-user :userType="accountUserType" :objIndex="objIndex" :selectedEmpId="selectedEmpId" @cancelAddUser="cancelAddUser" @successAddUser="successAddUser"></add-manager-user>
        </a-modal>
    </div>
</template>

<script>
    import AddManagerUser from './addManagerUser';
    import * as API from  '@/api/wallet';
    export default {
        name: "authorizeList",
        props: {
            accountId:{
                type:String,
                required:true,
            },
            accountUserType:{
              type:Number,
            },
        },
        data() {
            return {
                authorizeList:[],
              copyAuthorizeList:[],
                addObj:{
                    empId:'',
                    empName:'',
                    operationList:[1],
                },
                addManagerUserDialog:false,
                addManagerUserTitle:'',
                isEdit:false,
                saveLoading:false,
                objIndex:0,
                selectedEmpId:[],
                deletedIdList:[],
            }
        },
        components: {
            AddManagerUser,
        },
        mounted() {

        },
        created(){
            this.waListAuthorize();
        },
        methods: {
            changeOperation(item,val){
                let pos = item.operationList.indexOf(val);
                if(pos > -1){
                    item.operationList.splice(pos,1);
                }
                else{
                    item.operationList.push(val);
                }
            },
            waListAuthorize(){
                API.waListAuthorize({id:this.accountId}).then(res => {
                    if (res.code === '200') {
                        this.authorizeList = res.data;
                      this.authorizeList.forEach((item)=>{
                        item.copyOperationList = [];
                        item.operationList.forEach((val)=>{
                          item.copyOperationList.push(val);
                        })
                      });
                    }
                });
            },
          cancelEdit(){
              this.isEdit=false;
            //阻止取消修改数据变化
            this.authorizeList.forEach((item)=>{
              item.operationList = [];
              item.copyOperationList.forEach((val)=>{
                item.operationList.push(val);
              })
            });
          },
            saveAuthorizeList(){
                let parameter ={
                    accountId:this.accountId,
                    authorizeList:this.authorizeList,
                    deletedIdList:this.deletedIdList,
                };
                this.saveLoading = true;
                API.waAuthorizeListEdit(parameter).then(res => {
                    if (!res) {
                        this.saveLoading = false;
                    }
                    if (res.code === '200') {
                        this.saveLoading = false;
                        this.$message.info('账户管理人修改成功');
                        this.isEdit = false;
                        this.waListAuthorize();
                    }
                    else{
                        this.$message.info('账户管理人修改失败');
                        this.saveLoading = false;
                    }
                });
            },
            cancelAddUser(){
                this.addManagerUserDialog = false;
            },
            successAddUser(obj,objIndex){
                this.addManagerUserDialog = false;
                this.authorizeList[objIndex] = obj
            },
            deleteAuthorizeObj(index){
                if(this.authorizeList[index].id){
                    this.deletedIdList.push(this.authorizeList[index].id);
                }
                this.authorizeList.splice(index,1);
            },
            AddAuthorizeObj(){
                this.objIndex = this.authorizeList.length;
                this.addManagerUserDialog = true;
                this.obj = Object.assign({},this.addObj);
                this.selectedEmpId = [];
                this.authorizeList.forEach((item)=>{
                    this.selectedEmpId.push(item.empId);
                });
            },
        },
    }
</script>

<style scoped lang="less">
    .authorizeList-box{
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        .contentStyle{
            padding: 20px;
            .titleStyle{
                font-size: 18px;
                font-weight: 500;
                color: #111111;
            }
            .addStyle{
                color: #0A87F8;
                line-height: 27px;
                font-size: 14px;
            }
            .basicsInfo{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .table{
                    width: 756px;
                    border-left: 1px solid #EEEEEE;
                    border-top: 1px solid #EEEEEE;
                    font-size: 12px;
                    .table-title{
                        display: flex;
                        background:#F6F7FB;
                        color: #666666;
                        & > div {
                            flex: 1;
                            height: 40px;
                            line-height: 40px;
                            border-right: 1px solid #EEEEEE;
                            border-bottom: 1px solid #EEEEEE;
                        }
                        .mustFill{
                            margin-left: 2px;
                            color: #FB4246;
                        }
                    }
                    .house-data {
                        display: flex;
                        & > div {
                            flex: 1;
                            height: 46px;
                            line-height: 46px;
                            text-align: left;
                            border-right: 1px solid #EEEEEE;
                            border-bottom: 1px solid #EEEEEE;
                            background-color: #ffffff;
                            color: #333333;
                            font-size: 14px;
                            .delete-icon {
                                color: red;
                                font-size: 14px;
                            }
                        }
                        .continueAddStyle{
                            font-size: 14px;
                            color: #0A87F8;
                            text-align: center !important;
                            i{
                                vertical-align: 0em;
                                margin-right: 8px;
                            }
                            svg{
                                width: 12px;
                                height: 12px;
                            }
                        }
                        .operateStyle{
                            .width-59{
                                width: 59px;
                            }
                            .width-101{
                                width: 101px;
                            }
                            .width-87{
                                width: 87px;
                            }
                            .width-66{
                              width: 66px;
                            }
                            .width-52{
                              width: 52px;
                            }
                            .selectedStyle{
                                color: #0A87F8;
                            }
                            .unselectStyle{
                                color: #666666;
                            }
                            .unEditStyle{
                                color: #BBBBBB;
                            }
                            .itemStyle{
                                border-radius:2px;
                                height:24px;
                                line-height: 24px;
                                margin: 11px 10px 11px 0;
                                padding-left: 5px;
                                i{
                                    margin-left: 6px;
                                }
                            }
                            .selected{
                                background: #F5F7FE;
                                color: #333333;
                            }
                            .unSelect{
                                background: #F4F4F4;
                                color: #777777;
                            }
                        }
                        .deleteIconStyle{
                            svg{
                                width: 16px;
                                height: 16px;
                            }
                        }
                    }
                    .mustFillStyle{
                        /deep/ svg{
                            width: 12px;
                            height: 12px;
                        }
                        .mustFillFont{
                            color: #777777;
                            font-size: 13px;
                            .editStyle{
                                margin-right: 2px;
                                color: #777777;
                            }
                        }
                    }
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
    }
</style>