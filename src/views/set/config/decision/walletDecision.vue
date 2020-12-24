<template>
    <div class="wallet-decision-box">
        <div class="source">
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">是否允许免密提现</div>
            </div>
            <div class="describe">
              允许后，钱包在提现时，不需要输入密码和验证码直接可提现到银行卡
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="wallet1.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="wallet1.onOff==0" @click="changeResrource(wallet1,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="wallet1.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="wallet1.onOff==1" @click="changeResrource(wallet1,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton f-fl" @click="save(wallet1,true)"  v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                  保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                  <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="confirmSaveDialog" class="ownModalBorder titDialog" title="提示" @cancel="confirmSaveDialog=false">
          <confirm-save :storeDeptName="storeDeptName" :storeDeptId="storeDeptId" :onlyFirstStoreDeptFlag="onlyFirstStoreDeptFlag" :data="data" @cancelSave="confirmSaveDialog=false" @successSave="successSave"></confirm-save>
        </a-modal>
    </div>
</template>

<script>
    import ConfirmSave from './confirmSave';
    import  * as API from '@/api/decision';
    export default {
        name: "resourceDecision",
        components: {
          ConfirmSave,
        },
        props: {
          storeDeptId: {
            type: String,
          },
          storeDeptName: {
            type: String,
          },
          firstStoreDeptId: {
            type: String,
          },
        },
        data() {
            return {
                wallet1:{},
                walletDefault1:{
                    onOff:false,
                    value:'',
                    module:'WALLET',
                    mark:'WALLET_WITHDRAW_FREE_VERIFY',
                    bizPoint:'WALLET_WITHDRAW',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'是否允许免密提现',
                },
                data:{},
                confirmSaveDialog:false,
                onlyFirstStoreDeptFlag:false,
            }
        },
        created: function () {
            this.initDecisionList();
        },
        methods: {
            successSave(){
              this.confirmSaveDialog = false;
              this.initDecisionList();
            },
            changeResrource(data,val){
                data.onOff = val;
                if(val == 0){
                    data.value = '';
                }
            },
            save(data,val){
                //开启的带输入框的要求必填值
                if((data.chooseType == 5&&data.onOff==1)||data.chooseType == 1){
                    if(!data.value){
                        this.$message.warning('请输入必填项');
                        return;
                    }
                }
                //设置分店id
              data.storeId = this.storeDeptId;
              this.confirmSaveDialog = true;
              this.data = data;
              if(val){
                this.onlyFirstStoreDeptFlag = val;
              }
              else{
                this.onlyFirstStoreDeptFlag = false;
              }
            },
            initDecisionList(){
                let parameter = {
                    module: 'WALLET',
                    storeId:this.storeDeptId,
                };
                API.decisionList(parameter).then(res => {
                    if (res.code === '200') {
                        this.wallet1 = Object.assign({},this.walletDefault1);
                        if(res.data && res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                //钱包相关
                                if(res.data[i].mark == 'WALLET_WITHDRAW_FREE_VERIFY'){
                                    this.wallet1 = res.data[i];
                                }
                            }
                        }
                    }
                });
            },
        },
        watch:{
            storeDeptId() {
                this.initDecisionList();
            },
        },
    }
</script>

<style scoped lang="less">
    .source{
        .title{
            width: 100%;
            .blueStyle{
                width:4px;
                height:16px;
                background:rgba(10,135,248,1);
                border-radius:2px;
            }
            .titleFont{
                height:16px;
                line-height: 16px;
                font-size:16px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:#111111;
                margin-left: 10px;
            }
        }
        .describe{
            margin: 10px 20px 0 14px;
            padding-left: 5px;
            min-height:34px;
            line-height: 34px;
            background:rgba(247,248,251,1);
            color: #777777;
        }
        .checkBox{
            margin: 14px 0 0 14px;
            .allCheck{
                height: 24px;
                line-height: 24px;
            }
            .checked{
                color: #0A87F8;
                .iconSize{
                    width: 16px;
                    height: 16px;
                }
            }
            .fontStyle{
                margin-left: 8px;
                height:24px;
                font-size:14px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:#111111;
                line-height:24px;
            }
            .inputStyleDiv {
                margin-left: 15px;
                font-size: 12px;
                .mustFill{
                    color:#FB4246;
                    margin-left: 4px;
                }
            }
            .inputStyle {
                width: 56px;
                height: 24px;
            }
            .margin50{
                margin-left: 50px;
            }
            /deep/ .ant-input{
                padding: 4px 5px;
                font-size: 12px;
            }
        }
        .saveButton{
            margin: 20px 0 20px 14px;
            .formItemMarginButton{
                width:100px;
                height:28px;
                background:rgba(10,135,248,1);
                border-radius:4px;
                color: #FFFFFF;
            }
            .unClickStyle{
              background:#DDDDDD !important;
              color: #FFFFFF;
              border:none;
              text-align: center;
              height: 28px;
              line-height: 28px;
            }
            .warning{
              height: 28px;
              line-height: 28px;
              color: #FFA036;
              font-size: 12px;
              margin-left: 13px;
              svg{
                width: 14px;
                height: 14px;
              }
            }
        }
        .line{
            margin: 0 20px 20px 14px;
            height:1px;
            border: 1px dashed #DDDDDD;
        }
    }
</style>