<template>
    <!--  提现 -->
    <div class="withdraw-box">
        <div class="transfer-line1" v-if="!successFlag">
            <div style="width:100%;padding-top: 14.5px;"><span class="transfer-line1-font">提现银行信息：</span><span class="transfer-line2-font">{{bankCardDetail.cardholder}}</span></div>
            <div style="width: 100%;padding:4.5px 0 10px 112px;"><span style="color: #333333;font-size: 14px;">{{bankCardDetail.bankName}}-{{bankCardDetail.branchBankName}} ({{bankCardDetail.bankCardNoEx}})</span></div>
        </div>
        <div class="transfer-content" v-if="!successFlag">
            <div class="transfer-content-line1" style="margin-top: 3px;">
                <div><span class="transfer-content-line1-title">提现金额：</span><span class="transfer-content-line1-con" style="color: #FFA036;font-size: 18px;font-weight: 500;">{{withdrawPreObj.money}}元</span></div>
            </div>
            <div class="transfer-content-line1 clearfix" style="margin-top: 19px;">
                <div class="f-fl"><span class="transfer-content-line1-title">到账时间：</span></div>
                <div class="f-fl">
                  <div><span class="transfer-content-line1-con">预计24小时内到账</span></div>
                  <div><span class="transfer-content-line1-after">(实际以银行入账时间为准；如遇节假日则顺延至下一工作日)</span></div>
                </div>
            </div>
            <div class="transfer-line-line"></div>
            <div class="transfer-content-line2" v-if="!secretFreePaymentFlag">
                <a-icon type="exclamation-circle" style="color: #FFA036;margin:0 4px 0 0px;font-size: 14px;" />提现后，资金将自动进入指定银行卡，无法撤回或退款，请谨慎操作！
            </div>
            <div class="verifyTitle" v-if="!secretFreePaymentFlag">
              请验证您的身份
            </div>
            <div class="warningStle" v-if="!secretFreePaymentFlag">
              短信验证码将发送至绑定手机：{{withdrawPreObj.ownerPhone|formatPhone}}
            </div>
            <div class="verifyCodeStyle" v-if="!secretFreePaymentFlag">
                <label-item class="u-bottom-border" style="position: relative" title="验证码" :mustFill="true">
                    <a-input placeholder="请输入验证码" v-model="verifyCode"></a-input>
                  <div class="verifyCodeStyle1 canGet cursor" v-if="canGetVerification" @click="getVerifyCode">获取验证码</div>
                  <div class="verifyCodeStyle1 canNotGet" v-else>{{intervalText}}</div>
                </label-item>
            </div>
            <div class="transitionStyle" v-if="!secretFreePaymentFlag&&withdrawPreObj.accountUserType==1&&withdrawPreObj.transactionVerifyMode!=9" >
              <span class="cursor" @click="goAllinpayWithdraw">使用交易密码支付<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></span>
            </div>
            <div v-if="secretFreePaymentFlag" class="secretFreePaymentStyle">
              <icon-font type="iconyumengtubiao_chenggong" style="color: #52C41A;margin-right: 4px;"></icon-font><span class="spanStyle">已成功开启免验证提现，无需验证</span>
            </div>
            <div class="line4">
                <a-button size="large" class="formItemMarginButton cancelFont" @click="cancel">
                    取消
                </a-button>
                <a-button size="large" style="width: 160px;" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="withdraw">
                    确认信息并提现
                </a-button>
            </div>
        </div>
        <div class="successStyle" v-if="successFlag">
            <div style="margin-top:60px;">
                <div class="successRadiusStyle">
                    <icon-font type="iconyumengtubiao_xuanzhong-"></icon-font>
                </div>
            </div>
            <div class="successRadiusStyle1">提现受理成功</div>
            <div class="successRadiusStyle2">预计24小时内到账，实际以银行入账时间为准；如遇节假日则顺延至下一个工作日。</div>
          <div class="successRadiusStyle3 cursor" @click="successClose">关闭</div>
          <div style="height: 50px;"></div>
        </div>
        <!-- 通商云支付-->
        <a-modal destroyOnClose centered v-model="htmlPannelDialog" :footer="null" class="ownModalBorder titDialog" :maskClosable="false" title="提现确认" :bodyStyle="{padding:'0px 0px 0px 0px'}" @cancel="cancelWithdraw" width="1250px">
          <html-panel :url="url" @authSuccess="setSuccess"></html-panel>
        </a-modal>
        <!-- 未设置密码提示 -->
        <a-modal centered v-model="noSetPwdWarningDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'44px 0px 20px 20px'}" @cancel="noSetPwdWarningDialog=false" width="432px">
          <no-set-pwd-warning :isOwner="withdrawPreObj.isOwner" :accountId="withdrawPreObj.accountId" @setSuccess="setPwdSuccess" @closeThis="noSetPwdWarningDialog=false"></no-set-pwd-warning>
        </a-modal>
    </div>
</template>

<script>
    import * as API from '@/api/wallet';
    import HtmlPanel from '../smartDevices/account/HtmlPanel';
    import NoSetPwdWarning from './noSetPwdWarning';
    import {bizDecisionGet} from "@/api/decision";

    export default {
        name: "transfer",
        props: {
            withdrawPreObj:{
              type:Object,
            },
        },
        components: {
            HtmlPanel,
            NoSetPwdWarning,
        },
        data() {
            return {
                isSetPayPwd:0,   //是否设置通商云交易密码
                bankCardDetail:{},
                saveLoading:false,
                successFlag:false,
                verifyCode:'',
                canGetVerification:true,
                countdown: 60,
                intervalText: '60s后重新获取',
                htmlPannelDialog:false,
                url:'',
                noSetPwdWarningDialog:false,
                setPwdTransactionFlowId:'',
                secretFreePaymentFlag:false,
            }
        },
        created() {
            this.isSetPayPwd = this.withdrawPreObj.isSetPayPwd;
            this.bankCardView();
            this.bizDecisionGetFun();
        },
        methods: {
            //判断是否免密支付
            bizDecisionGetFun(){
              let paramter ={
                bizPoint: 'WALLET_WITHDRAW',
                mark: 'WALLET_WITHDRAW_FREE_VERIFY',
                module: 'WALLET'
              };
              bizDecisionGet(paramter).then(res=>{
                if(res.data&&res.data.onOff==1){
                  this.secretFreePaymentFlag = true;
                }
                else{
                  this.secretFreePaymentFlag = false;
                }
              });
            },
            cancelWithdraw(){
              let _this = this;
              if(this.setPwdTransactionFlowId){
                setTimeout(()=>{
                  API.getTransactionStatus({id:this.setPwdTransactionFlowId}).then(res=>{
                    if(res.data == 1||res.data == 3){
                      _this.htmlPannelDialog = false;
                      _this.$emit('successClose');
                    }
                  });
                },500);
              }
            },
            setPwdSuccess(){
              this.noSetPwdWarningDialog = false;
              this.isSetPayPwd = 1;
            },
            setSuccess(){
              setTimeout(()=>{
                this.htmlPannelDialog = false;
                this.$emit('successClose');
              },1500);
            },
            goAllinpayWithdraw(){
              if(this.isSetPayPwd==0){
                //去设置通商云密码
                this.noSetPwdWarningDialog = true;
                return ;
              }
              if(this.url){
                this.htmlPannelDialog = true;
              }
              else{
                //去通商云提现
                let parameter = {
                  accountId:this.withdrawPreObj.accountId,
                  amount: Math.round(this.withdrawPreObj.money*100),
                  bankCardId:this.withdrawPreObj.bankCardId,
                  transactionVerifyMethod:2,
                  source:1,
                }
                API.bizWithdrawApply(parameter).then(res=>{
                  if(res.code === '200'){
                    this.$emit('refreshinfoFun',true);
                    this.url = res.data.transactionJumpUrl;
                    this.setPwdTransactionFlowId = res.data.transactionFlowId;
                    if(this.url){
                      this.htmlPannelDialog = true;
                    }
                  }
                });
              }

            },
            successClose(){
              this.$emit('successClose');
            },
            getVerifyCode(){
              if(this.canGetVerification) {
                this.canGetVerification = false;
                this.settime();
                if(this.transactionFlowId){
                  let parameter = {
                    transactionFlowId:this.transactionFlowId,
                  };
                  API.bizResendPaySmsVerifyCode(parameter).then(res => {
                    if (!res) {
                      this.$message.error('验证码获取失败');
                    }
                    if (res.code === '200') {
                      this.$message.info('验证码获取成功');
                    } else {
                      this.$message.error('验证码获取失败');
                    }
                  });
                }
                else{
                  let parameter = {
                    accountId:this.withdrawPreObj.accountId,
                    amount: Math.round(this.withdrawPreObj.money*100),
                    bankCardId:this.withdrawPreObj.bankCardId,
                    transactionVerifyMethod:this.withdrawPreObj.transactionVerifyMode,
                    source:1,
                  };
                  API.bizWithdrawApply(parameter).then(res=>{
                    if(res.code === '200'){
                      this.$emit('refreshinfoFun',true);
                      this.transactionFlowId = res.data.transactionFlowId;
                      this.setPwdTransactionFlowId = '';
                    }
                  });
                }
              }
            },
            bankCardView(){
                API.bankCardView({id:this.withdrawPreObj.bankCardId}).then(res => {
                    if (res.code == 200) {
                        this.bankCardDetail = res.data;
                    }
                });
            },
            cancel(){
                this.$emit('cancel');
            },
            withdraw(){
                if(this.secretFreePaymentFlag){
                  //去通商云提现
                  let parameter = {
                    accountId:this.withdrawPreObj.accountId,
                    amount: Math.round(this.withdrawPreObj.money*100),
                    bankCardId:this.withdrawPreObj.bankCardId,
                    transactionVerifyMethod:2,
                    source:1,
                  }
                  this.saveLoading = true;
                  API.bizWithdrawApply(parameter).then(res=>{
                    if(!res){
                      this.saveLoading = false;
                    }
                    if(res.code === '200'){
                      this.$emit('refreshinfoFun',true);
                      this.$message.info('提现受理成功');
                      this.saveLoading = false;
                      this.successFlag = true;
                      this.$emit('success');
                    }
                    else{
                      this.$message.info('提现受理失败');
                      this.saveLoading = false;
                    }
                  });
                }
                else{
                  if(!this.transactionFlowId){
                    this.$message.warning('请获取验证码');
                    return;
                  }
                  if(!this.verifyCode){
                    this.$message.warning('请输入验证码');
                    return;
                  }
                  let parameter = {
                    transactionFlowId:this.transactionFlowId,
                    smsVerifyCode:this.verifyCode,
                    source:1,
                  };
                  const time = new Date();
                  const hour = time.getHours();
                  if(hour>7&&hour<22) {
                    //来自强检验打开通商云的返回
                    if(this.withdrawPreObj.transactionVerifyMode&&this.withdrawPreObj.transactionVerifyMode==9&&this.isSetPayPwd==0){
                      this.noSetPwdWarningDialog = true;
                      //去通商云设置密码
                      return ;
                    }
                    if(this.withdrawPreObj.transactionVerifyMode&&this.withdrawPreObj.transactionVerifyMode==9&&this.url){
                      this.htmlPannelDialog = true;
                      return ;
                    }
                    this.saveLoading = true;
                    API.transactionConfirm(parameter).then(res => {
                      if (!res) {
                        this.saveLoading = false;
                      }
                      if (res.code === '200') {
                        if(this.withdrawPreObj.transactionVerifyMode&&this.withdrawPreObj.transactionVerifyMode==9){
                          this.saveLoading = false;
                          this.url = res.data.transactionJumpUrl;
                          this.setPwdTransactionFlowId = res.data.transactionFlowId;
                          if(this.url){
                            this.htmlPannelDialog = true;
                          }
                        }
                        else{
                          this.$message.info('提现受理成功');
                          this.saveLoading = false;
                          this.successFlag = true;
                          this.$emit('success');
                        }
                      } else {
                        this.$message.error('提现受理失败');
                        this.saveLoading = false;
                      }
                    });
                  }
                  else{
                    this.$message.warning('当前时间不可提现，请您在8:00 - 22:00时间内操作提现!');
                  }
                }
            },
            settime() {
              const _this = this;
              if (_this.countdown == 0) {
                _this.canGetVerification = true;
                _this.intervalText = '获取验证码';
                _this.countdown = 60;
                return false;
              } else {
                _this.canGetVerification = false;
                _this.intervalText = _this.countdown + 's后重新获取';
                _this.countdown--;
              }
              setTimeout(function() {
                _this.settime();
              }, 1000);
            },
        },
      filters: {
        formatPhone:function (value) {
          var str = String(value)
          var len = str.length;
          var prev,next;
          if (len >= 7) {
            prev = str.slice(-len,-8)
            next = str.slice(-4)
            str = prev+"****"+next
          } else if (len < 7 && len >= 6) {
            prev = str.slice(-len,-4)
            next = str.slice(-2)
            str = prev + "**" + next
          }
          if(!value){
            str = '-';
          }
          return str
        },
      },
    }
</script>

<style lang="less" scoped>
    .withdraw-box{
        .transfer-line1{
            padding: 0 20px;
            background:rgba(233,241,255,0.99);
            .transfer-line1-font{
                color: #777777;
                font-size: 16px;
            }
            .transfer-line2-font{
                color: #111111;
                font-size: 16px;
            }
        }
        .transfer-content{
            padding: 20px;
            .transfer-content-line1{
                .transfer-content-line1-title{
                    font-size:16px;
                    color: #777777;
                    margin-right: 32px;
                }
                .transfer-content-line1-con{
                    font-size:16px;
                    color: #111111;
                }
                .transfer-content-line1-after{
                    font-size:12px;
                    color: #777777;
                }
            }
            .transfer-line-line{
                margin-top: 23px;
                border-top: 1px solid #EEEEEE;
                padding-top: 15px;
            }
            .transfer-content-line2{
              color: #FFA036;
              font-size: 13px;
            }
            .verifyTitle{
              margin: 15px 0 10px 0;
              font-size: 16px;
              color: #000000;
              font-weight: 500;
            }
            .warningStle{
              color: #777777;
              font-size: 13px;
              height: 34px;
              line-height: 34px;
              background: #F6F7F8;
              border-radius: 4px;
              padding-left: 5px;
            }
            .transitionStyle{
              font-size: 14px;
              color: #0A87F8;
              margin-top: 8px;
            }
            .secretFreePaymentStyle{
              padding: 5px 0 40px 0;
              i{
                vertical-align: -0.2em;
              }
              svg{
                width: 16px;
                height: 16px;
              }
              .spanStyle{
                color: #666666;
                font-size: 14px;
              }
            }
            .line4 {
                text-align: right;
                margin-top: 40px;
                .formItemMarginButton {
                    width: 120px;
                    height: 40px;
                    margin-left: 18px;
                    margin-top: 20px;
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
        .verifyCodeStyle{
            /deep/ .label-item .title{
              color: #111111;
                font-size: 16px;
                margin-top: 15px;
            }
          .verifyCodeStyle1 {
            position:absolute;
            height: 32px;
            line-height: 32px;
            top: 24px;
            right: 0px;
          }
          .canGet {
            color:#0A87F8;
          }
          .canNotGet {
            color: #777777;
          }
          /deep/ .ant-input{
            color: #111111;
          }
        }
        .successStyle{
            .successRadiusStyle{
                margin: 0 auto;
                width:108px;
                height:108px;
                line-height: 108px;
                background:rgba(82,196,26,1);
                border-radius: 50%;
                text-align: center;
                svg{
                    width: 108px;
                    height: 108px;
                    color: #FFFFFF;
                }
            }
            .successRadiusStyle1{
                margin-top: 22px;
                text-align: center;
                color: #111111;
                font-size: 18px;
                font-weight: 500;
            }
            .successRadiusStyle2{
                font-size: 14px;
                color: #111111;
                text-align: center;
                padding: 15px 70px 63px 70px;
                font-weight: 500;
            }
          .successRadiusStyle3{
            text-align: center;
            margin: 0 auto;
            width: 140px;
            height: 40px;
            line-height: 40px;
            border-radius: 5px;
            color: #ffffff;
            font-size: 14px;
            background: #0A87F8;
          }
        }
    }
</style>