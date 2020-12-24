<template>
    <!--  添加账户管理人 -->
    <div class="addManagerUser-box">
        <div class="contentStyle">
            <div class="titleStyle" style="margin-top: 20px;">
                账号管理人<span class="mustFillStyle">*</span>
            </div>
            <div class="clearfix" style="margin-top: 3.5px;">
                <label-item style="width: 100%;" class="u-bottom-border f-fl">
                    <dept-employee-tree :bottomBorder="false" placeholder="请选择" :defaultValue="currentObj.empName" @selectChange="selectDeptEmp" ref="selectDeptEmp" placement="bottomLeft" :disableDept="true"></dept-employee-tree>
                </label-item>
            </div>

            <div class="titleStyle" style="margin-top: 30px;">
                权限配置<span class="mustFillStyle" style="margin-left: 2px;">*</span>
            </div>
            <div class="basicsInfo" style="margin-top: 11px;">
                <div class="table">
                    <div class="table-title">
                        <div class="item" style="text-align:left;padding-left: 14px;max-width: 394px;">操作功能</div>
                        <div class="item" style="text-align: center;max-width: 84px;">允许操作</div>
                    </div>
                    <div class="house-data u-no-border">
                        <div class="item" style="text-align:left;padding:11px 14px;max-width: 394px;">
                            <div class="item-top">查看</div>
                            <div class="item-bottom">可查看当前钱包总额、流水等信息</div>
                        </div>
                        <div class="item" style="text-align: center;max-width: 84px;">
                            <icon-font class="unEditStyle" type="iconyumengtubiao_duoxuan-yixuanze"/>
                        </div>
                    </div>
                    <div class="house-data u-no-border">
                        <div class="item" style="text-align:left;padding:11px 14px;max-width: 394px;">
                            <div class="item-top">充值</div>
                            <div class="item-bottom">对当前钱包账户进行充值</div>
                        </div>
                        <div class="item cursor" style="text-align: center;max-width: 84px;" @click="operationAddDelete(2)">
                            <icon-font v-if="currentObj.operationList.indexOf(2)>-1" class="selectedStyle" type="iconyumengtubiao_duoxuan-yixuanze"/>
                            <icon-font v-if="currentObj.operationList.indexOf(2)==-1" class="unselectStyle" type="iconyumengtubiao_duoxuan-weixuanze"/>
                        </div>
                    </div>
                    <div class="house-data u-no-border">
                        <div class="item" style="text-align:left;padding:11px 14px;max-width: 394px;">
                            <div class="item-top">提现</div>
                            <div class="item-bottom">从当前钱包账户提现到银行卡</div>
                        </div>
                        <div class="item cursor" style="text-align: center;max-width: 84px;" @click="operationAddDelete(3)">
                            <icon-font v-if="currentObj.operationList.indexOf(3)>-1" class="selectedStyle" type="iconyumengtubiao_duoxuan-yixuanze"/>
                            <icon-font v-if="currentObj.operationList.indexOf(3)==-1" class="unselectStyle" type="iconyumengtubiao_duoxuan-weixuanze"/>
                        </div>
                    </div>
                    <div class="house-data u-no-border">
                        <div class="item" style="text-align:left;padding:11px 14px;max-width: 394px;">
                            <div class="item-top">转账</div>
                            <div class="item-bottom">从当前钱包账户转账到指定钱包账户</div>
                        </div>
                        <div class="item cursor" style="text-align: center;max-width: 84px;" @click="operationAddDelete(4)">
                            <icon-font v-if="currentObj.operationList.indexOf(4)>-1" class="selectedStyle" type="iconyumengtubiao_duoxuan-yixuanze"/>
                            <icon-font v-if="currentObj.operationList.indexOf(4)==-1" class="unselectStyle" type="iconyumengtubiao_duoxuan-weixuanze"/>
                        </div>
                    </div>
                    <div class="house-data u-no-border">
                        <div class="item" style="text-align:left;padding:11px 14px;max-width: 394px;">
                            <div class="item-top">银行卡管理</div>
                            <div class="item-bottom">管理银行卡信息，可添加、编辑、注销</div>
                        </div>
                        <div class="item cursor" style="text-align: center;max-width: 84px;" @click="operationAddDelete(5)">
                            <icon-font v-if="currentObj.operationList.indexOf(5)>-1" class="selectedStyle" type="iconyumengtubiao_duoxuan-yixuanze"/>
                            <icon-font v-if="currentObj.operationList.indexOf(5)==-1" class="unselectStyle" type="iconyumengtubiao_duoxuan-weixuanze"/>
                        </div>
                    </div>
                    <div class="house-data u-no-border">
                        <div class="item" style="text-align:left;padding:11px 14px;max-width: 394px;">
                            <div class="item-top">人员管理</div>
                            <div class="item-bottom">管理当前钱包的账户管理人，可添加、修改权限、删除</div>
                        </div>
                        <div class="item cursor" style="text-align: center;max-width: 84px;" @click="operationAddDelete(6)">
                            <icon-font v-if="currentObj.operationList.indexOf(6)>-1" class="selectedStyle" type="iconyumengtubiao_duoxuan-yixuanze"/>
                            <icon-font v-if="currentObj.operationList.indexOf(6)==-1" class="unselectStyle" type="iconyumengtubiao_duoxuan-weixuanze"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="basicsInfo" style="margin-top: 20px;">
            <div class="transactionVerifyModeStyle">
              <div class="titleStyle">转账、支付时需要的验证方式</div>
              <div class="tipStyle">在操作转账、提现、付款等操作时，需要输入的验证方式</div>
              <div class="verifyStyle" v-if="userType==1">
                <a-radio-group v-model="currentObj.transactionVerifyMode">
                  <a-radio class="radioStyle" :value="1">
                    <span class="radioStyle1">普通验证</span><span class="radioStyle2">(验证码和交易密码验证其中一种即可)</span>
                  </a-radio>
                  <a-radio class="radioStyle" :value="9">
                    <span class="radioStyle1">强验证</span><span class="radioStyle2">(交易密码和验证码同时验证)</span>
                  </a-radio>
                </a-radio-group>
              </div>
              <div class="verifyStyle" v-if="userType==2">
                <a-radio-group v-model="currentObj.transactionVerifyMode">
                  <a-radio class="radioStyle" :value="1">
                    <span class="radioStyle1">企业账户仅支持验证码验证</span>
                  </a-radio>
                </a-radio-group>
              </div>
            </div>
          </div>
            <div class="clearfix" style="width: 100%;margin-top:28px;">
                <div class="buttonDiv f-fr">
                    <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
                        取消
                    </a-button>
                    <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="managerUseAdd">
                        保存
                    </a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DeptEmployeeTree from '@/components/DeptEmployeeTree';
    export default {
        name: "addManagerUser",
        components: {
            DeptEmployeeTree,
        },
        props: {
            objIndex:{
                type:Number,
            },
            ownerId:{
                type:String,
            },
            selectedEmpId:{
                type:Array,
            },
            userType:{
                type:Number,
            },
        },
        data() {
            return{
                currentObj:{
                    empId:'',
                    name:'',
                    operationList:[1],
                    isOwner:0,
                    transactionVerifyMode:1,
                },
            }
        },
        created() {
            if(this.obj&&this.obj.empId){
                this.currentObj = this.obj;
            }
        },
        methods: {
            operationAddDelete(val){
              let pos = this.currentObj.operationList.indexOf(val);
              if(pos >-1){
                this.currentObj.operationList.splice(pos,1)
              }
              else{
                this.currentObj.operationList.push(val);
              }
            },
            selectDeptEmp(selectObj){
                if (selectObj.type == 'employee') {
                    this.currentObj.empId = selectObj.id;
                    this.currentObj.name = selectObj.name;
                }
            },
            cancelSave(){
                this.$emit('cancelAddUser');
            },
            managerUseAdd(){
                if(!this.currentObj.empId){
                    this.$message.warning('请选择账号管理人')
                    return;
                }
                if(this.selectedEmpId.indexOf(this.currentObj.empId)>-1){
                    this.$message.warning('该账户管理人已存在，请选择其他人')
                    return;
                }
                this.$emit('successAddUser',this.currentObj,this.objIndex);
            },
        }
    }
</script>

<style lang="less" scoped>
    .addManagerUser-box{
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        .contentStyle {
            padding: 0 20px 20px;
            .titleStyle {
                font-size: 16px;
                font-weight: 500;
                color: #111111;
            }
            .mustFillStyle {
                color: @wranColor;
            }
            .basicsInfo{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .table{
                    width: 478px;
                    border-left: 1px solid #EEEEEE;
                    border-top: 1px solid #EEEEEE;
                    font-size: 12px;
                    .table-title{
                        display: flex;
                        background:#F6F7FB;
                        color: #666666;
                        font-size: 14px;
                        .item {
                            flex: 1;
                            height: 40px;
                            line-height: 40px;
                            border-right: 1px solid #EEEEEE;
                            border-bottom: 1px solid #EEEEEE;
                        }
                    }
                    .house-data {
                        display: flex;
                        .item {
                            flex: 1;
                            height: 64px;
                            line-height: 64px;
                            text-align: left;
                            border-right: 1px solid #EEEEEE;
                            border-bottom: 1px solid #EEEEEE;
                            background-color: #ffffff;
                            color: #333333;
                            font-size: 14px;
                            .item-top{
                                font-size: 14px;
                                height: 21px;
                                line-height: 21px;
                                margin-bottom: 2px;
                                color: #111111;
                            }
                            .item-bottom{
                                font-size: 12px;
                                height: 18px;
                                line-height: 18px;
                                color: #777777;
                            }
                            svg{
                                width: 16px;
                                height: 16px;
                            }
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
                    }
                }
                .transactionVerifyModeStyle{
                  width: 100%;
                  padding: 0px 15px;
                  border-radius: 4px;
                  border: 1px solid #EEEEEE;
                  .titleStyle{
                    font-size: 14px;
                    color: #111111;
                    font-weight: 500;
                    margin-top: 12px;
                  }
                  .tipStyle{
                    color: #777777;
                    font-size: 12px;
                    padding: 4px 0 12px 0;
                    border-bottom: 1px dashed #E8E8E8;
                  }
                  .verifyStyle{
                    padding: 6px 0;
                    .radioStyle{
                      display: block;
                      height: 30px;
                      line-height: 30px;
                    }
                    .radioStyle1{
                      color: #111111;
                      font-size: 14px;
                    }
                    .radioStyle2{
                      color: #777777;
                      font-size: 12px;
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