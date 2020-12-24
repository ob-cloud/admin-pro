<template>
  <div class="confirmPayInfo-box">
    <div class="headStyle">
      <div class="titleStyle">您的付款信息</div>
      <div class="paddingStyle1"><span class="fontTitleStyle">付款账号：</span><span class="color2">{{ onlinePayInfo.payWalletAccountAlias }}</span><span class="color1">({{ onlinePayInfo.payWalletAccountOwnerName }}/{{ onlinePayInfo.payWalletAccountOwnerPhone }})</span></div>
      <div class="paddingStyle1"><span class="fontTitleStyle">付款金额：</span><span class="color2">{{ Math.abs(onlinePayInfo.totalMoney/100).toFixed(2)}}元</span></div>
      <div class="titleStyle paddingStyle2">对方收款信息</div>
      <div class="paddingStyle1"><span class="fontTitleStyle">收款账号：</span><span class="color2">{{ onlinePayInfo.recvWalletAccountAlias }}</span><span class="color1">({{ onlinePayInfo.recvWalletAccountOwnerName }}/{{ onlinePayInfo.recvWalletAccountOwnerPhone }})</span></div>
    </div>
    <div class="contentStyle">
      <div class="titleStyle">请验证您的身份</div>
      <div v-if="onlinePayInfo.payWalletIsBindPhone==0" class="unBindStyle clearfix" style="margin: 15px 0 80px 0;">
        <div class="leftStyle f-fl">您的付款钱包还未绑定手机号，请先绑定~</div>
        <div class="rightStyle f-fr cursor" @click="goBindPhone">绑定手机号<icon-font type="iconyumengtubiao_zhishi" style="margin-left: 4px;"/></div>
      </div>
      <div class="warningStyle" v-if="onlinePayInfo.payWalletIsBindPhone==1">短信验证码将发送至绑定手机：{{onlinePayInfo.payWalletAccountOwnerPhone}}上，请输入验证码以验证您的身份</div>
      <div class="verifyCodeStyle" v-if="onlinePayInfo.payWalletIsBindPhone==1">
        <label-item class="u-bottom-border" title="验证码" :mustFill="true">
          <a-input placeholder="请输入验证码" v-model="verifyCode"></a-input>
          <div class="verifyCodeStyle1 canGet cursor" v-if="canGetVerification" @click="getVerifyCode">{{transactionFlowId?'重新获取验证码':'获取验证码'}}</div>
          <div class="verifyCodeStyle1 canNotGet" v-else>{{intervalText}}</div>
        </label-item>
      </div>
      <div class="transitionStyle" v-if="onlinePayInfo.payWalletIsBindPhone==1&&payWalletInfo.userType==1&&payWalletInfo.transactionVerifyMode!=9">
        <span class="cursor" @click="goAllinpayTransfer">使用交易密码支付<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></span>
      </div>
      <div class="line4">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancel">
          取消
        </a-button>
        <a-button size="large" style="width: 160px;" :disabled="onlinePayInfo.payWalletIsBindPhone==0" :style="onlinePayInfo.payWalletIsBindPhone==0?'background:rgba(10,135,248,0.4)':''" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmPay">
          确认信息并付款
        </a-button>
      </div>
    </div>
    <!-- 通商云支付-->
    <a-modal destroyOnClose centered v-model="htmlPannelDialog" :footer="null" class="ownModalBorder titDialog" :maskClosable="false" title="确认账单" :bodyStyle="{padding:'0px 0px 0px 0px'}" @cancel="cancelPay" width="1250px">
      <html-panel :url="url" @authSuccess="setSuccess"></html-panel>
    </a-modal>
    <!-- 未设置密码提示 -->
    <a-modal centered v-model="noSetPwdWarningDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'44px 0px 20px 20px'}" @cancel="noSetPwdWarningDialog=false" width="432px">
      <no-set-pwd-warning :isOwner="payWalletInfo.isOwner" :accountId="onlinePayInfo.payWalletAccountId" @setSuccess="setPwdSuccess" @closeThis="noSetPwdWarningDialog=false"></no-set-pwd-warning>
    </a-modal>
    <!-- 绑定手机号 -->
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" v-model="openConfirmDialog" class="ownModalBorder titDialog" title="绑定手机号" @cancel="openConfirmDialog=false" width="520px">
      <open-wallet-confirm :id="onlinePayInfo.payWalletAccountId" :phone="onlinePayInfo.payWalletAccountOwnerPhone" :fromTypeFlag="fromTypeFlag" @successBindPhone="successBindPhone"></open-wallet-confirm>
    </a-modal>
  </div>
</template>

<script>
import HtmlPanel from '../../smartDevices/account/HtmlPanel';
import NoSetPwdWarning from '../../wallet/noSetPwdWarning';
import {getOnlinePayInfo,billOnlinePayApply} from "@/api/bill";
import {getWalletAuthInfo} from "@/api/wallet";
import OpenWalletConfirm from '../../wallet/openWalletConfirm';
import * as API from "@/api/wallet";

export default {
  name: "confirmPayInfo",
  props: {
    billId:{
      type:String,
    },
    billBizId:{
      type:String,
    },
  },
  components: {
    HtmlPanel,
    NoSetPwdWarning,
    OpenWalletConfirm,
  },
  data() {
    return {
      saveLoading:false,
      verifyCode:'',
      canGetVerification:true,
      countdown: 60,
      intervalText: '60s后重新获取',
      onlinePayInfo:{},
      payWalletInfo:{},
      noSetPwdWarningDialog:false,
      url:'',
      htmlPannelDialog:false,
      transactionFlowId:'',
      setPwdTransactionFlowId:'',
      openConfirmDialog:false,
      fromTypeFlag:2,
      maskStyle:{backgroundColor:'rgba(0,0,0,0.2)'},
    }
  },
  created() {
    this.getOnlinePayInfo();
  },
  methods: {
    successBindPhone(){
      this.openConfirmDialog = false;
      getOnlinePayInfo({id:this.billBizId}).then(res => {
        if (res.code === '200') {
          this.onlinePayInfo = res.data;
        }
      })
    },
    goBindPhone(){
      this.openConfirmDialog = true;
    },
    cancelPay(){
      let _this = this;
      if(this.setPwdTransactionFlowId){
        setTimeout(()=>{
          API.getTransactionStatus({id:this.setPwdTransactionFlowId}).then(res=>{
            if(res.data == 1||res.data == 3){
              _this.htmlPannelDialog = false;
              _this.$emit('saveSuccess');
            }
          });
        },500);
      }
    },
    setSuccess(){
      this.htmlPannelDialog = false;
      this.$emit('saveSuccess');
    },
    setPwdSuccess(){
      this.noSetPwdWarningDialog = false;
      this.payWalletInfo.isSetPayPwd = 1;
    },
    getOnlinePayInfo(){
      getOnlinePayInfo({id:this.billBizId}).then(res => {
        if (res.code === '200') {
          this.onlinePayInfo = res.data;
          this.getWalletAuthInfo();
        }
      })
    },
    getWalletAuthInfo(){
      getWalletAuthInfo({id:this.onlinePayInfo.payWalletAccountId}).then(res => {
        if (res.code === '200') {
          this.payWalletInfo = res.data;
        }
      })
    },
    getVerifyCode(){
      if(this.noOperaterPermission()){
        this.$message.warning('暂无转账操作权限，请联系钱包负责人开通！');
        return ;
      }
      if(this.canGetVerification) {
        if (this.transactionFlowId) {
          //重新获取验证码
          let parameter = {
            transactionFlowId:this.transactionFlowId,
          };
          API.bizResendPaySmsVerifyCode(parameter).then(res => {
            if (res.code === '200') {
              this.$message.info('验证码获取成功');
              this.canGetVerification = false;
              this.settime();
            } else {
              this.$message.error('验证码获取失败');
            }
          });
        }
        else {
          let parameter = {
            billId : this.billId,
            billBizId : this.billBizId,
            source : 1,
            transactionVerifyMethod : this.payWalletInfo.transactionVerifyMode,
          };
          billOnlinePayApply(parameter).then(res => {
            if(!res){
              this.saveLoading = false;
            }
            if (res.code === '200') {
              this.$message.info('验证码获取成功');
              this.canGetVerification = false;
              this.settime();
              this.transactionFlowId = res.data.transactionFlowId;
              this.setPwdTransactionFlowId = '';
            }
          });
        }
      }
    },
    goAllinpayTransfer(){
      if(this.noOperaterPermission()){
        this.$message.warning('暂无提现权限，请联系钱包负责人开通！');
        return ;
      }
      if(this.payWalletInfo.isSetPayPwd==0){
        //去设置通商云密码
        this.noSetPwdWarningDialog = true;
        return ;
      }
      let parameter = {
        billId : this.billId,
        billBizId : this.billBizId,
        source : 1,
        transactionVerifyMethod : 2,
      };
      if(this.transactionFlowId&&this.url){
        this.htmlPannelDialog = true;
      }
      billOnlinePayApply(parameter).then(res => {
        if(!res){
          this.saveLoading = false;
        }
        if (res.code === '200') {
          this.transactionFlowId = res.data.transactionFlowId;
          this.setPwdTransactionFlowId = res.data.transactionFlowId;
          this.url = res.data.transactionJumpUrl;
          this.htmlPannelDialog = true;
        }
        this.saveLoading = false;
      })
    },
    cancel(){
      this.$emit('closeThis');
    },
    noOperaterPermission(){
      if(this.payWalletInfo.operations.indexOf('4')>-1)
        return false;
      else
        return true;
    },
    confirmPay(){
      if(this.noOperaterPermission()){
        this.$message.warning('暂无提现权限，请联系钱包负责人开通！');
        return ;
      }
      //普通检验
      let parameter = {
        transactionFlowId:this.transactionFlowId,
        smsVerifyCode:this.verifyCode,
        source:1,
      };
      if(this.payWalletInfo.transactionVerifyMode==1){
        this.saveLoading = true;
        API.transactionConfirm(parameter).then(res=>{
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            this.saveLoading = false;
            this.$message.info('付款成功');
            this.$emit('saveSuccess');
          }
          else {
            this.$message.error('付款失败');
            this.saveLoading = false;
          }
        });
      }
      else if(this.payWalletInfo.transactionVerifyMode==9){
        if(this.setPwdTransactionFlowId&&this.url){
          this.htmlPannelDialog = true;
        }
        API.transactionConfirm(parameter).then(res => {
          if(!res){
            this.saveLoading = false;
          }
          if (res.code === '200') {
            this.transactionFlowId = res.data.transactionFlowId;
            this.setPwdTransactionFlowId = res.data.transactionFlowId;
            this.url = res.data.transactionJumpUrl;
            this.htmlPannelDialog = true;
          }
          this.saveLoading = false;
        })
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
}
</script>

<style scoped lang="less">
  .confirmPayInfo-box{
    .fontDescStyle{
      padding-left: 10px;
    }
    .paddingStyle0{
      padding-top: 10px;
    }
    .paddingStyle1{
      padding-top: 12px;
    }
    .paddingStyle2{
      padding-top: 20px;
    }
    .headStyle{
      height: 195px;
      background: #F5F7FE;
      margin: 10px 0 0 0;
      padding: 15px 0 20px 20px;
      .titleStyle{
        font-size: 15px;
        color: #111111;
        font-weight: 500;
      }
      .fontTitleStyle{
        width: 70px;
      }
      .color1{
        font-size: 14px;
        color: #777777;
      }
      .color2{
        font-size: 14px;
        color: #111111;
      }
    }
    .contentStyle{
      padding: 20px;
      .titleStyle{
        font-size: 16px;
        color: #111111;
        font-weight: 500;
      }
      .unBindStyle{
        .leftStyle{
          font-size: 14px;
          color: #777777;
        }
        .rightStyle{
          font-size: 14px;
          color: #0A87F8;
        }
      }
      .warningStyle{
        height: 34px;
        line-height: 34px;
        background: #F6F7F8;
        border-radius: 4px;
        font-size: 13px;
        color: #777777;
        padding-left: 5px;
        margin-top: 10px;
      }
      .verifyCodeStyle{
        /deep/ .label-item .title{
          color: #111111;
          font-size: 14px;
          margin-top: 19px;
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
      .transitionStyle{
        font-size: 14px;
        color: #0A87F8;
        margin-top: 11px;
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
  }
</style>