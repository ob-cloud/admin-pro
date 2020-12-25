<template>
  <!-- 变更手机号，原手机号已注销，银行卡授权后确认-->
  <div class="authConfirm-box">
    <div class="phoneStyle">
      <span>开通人手机号：</span><span>{{phone}}</span>
    </div>
    <div class="contentStyle">
      <div class="titleStyle" style="margin-top: 19px;">
        验证码<span class="mustFillStyle" style="margin-left: 2px;">*</span>
      </div>
      <div class="clearfix" style="margin-top: 3.5px;">
        <label-item style="width: 100%;position: relative" class="u-bottom-border f-fl">
          <a-input v-model="verifyCode" placeholder="请输入验证码"></a-input>
          <div class="verifyCodeStyle canGet cursor" v-if="canGetVerification" @click="getVerifyCode">获取验证码</div>
          <div class="verifyCodeStyle canNotGet" v-else>{{intervalText}}</div>
        </label-item>
      </div>
      <div class="clearfix" style="width: 100%;padding:100px 0px 0px 0;">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAuth">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="authConfirm">
            确定修改
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {modifyBoundPhoneByBankCardConfirm, waSendBindPhoneVerifyCode} from "@/api/wallet";

export default {
  name: "authConfirm",
  components: {
  },
  props: {
    phone:{
      type:String,
      required:true,
    },
    tranceNum:{
      type:String,
      required:true,
    },
    walletAccountId:{
      type:String,
      required:true,
    },
  },
  data() {
    return {
      saveLoading:false,
      verifyCode:'',
      canGetVerification: true,
      countdown: 60,
      intervalText: '60s后重新获取',
    }
  },
  created() {
    this.settime();
  },
  methods: {
    cancelAuth(){
      this.$emit('cancelAuth');
    },
    authConfirm(){
      if(!this.verifyCode){
        this.$message.warning('请输入验证码');
        return
      }
      let parameter = {
        tranceNum:this.tranceNum,
        walletAccountId:this.walletAccountId,
        verifyCode:this.verifyCode,
      };
      this.saveLoading = true;
      modifyBoundPhoneByBankCardConfirm(parameter).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
          this.$message.info('修改绑定手机号成功');
          this.$emit('successAuth');
        }
        else{
          this.saveLoading = false;
          this.$message.error('修改绑定手机号失败');
        }
      });
    },
    getVerifyCode(){
      if(this.canGetVerification) {
        waSendBindPhoneVerifyCode({id: this.walletAccountId}).then(res => {
          if (!res) {
            this.$message.error('验证码获取失败');
          }
          if (res.code === '200') {
            this.$message.info('验证码获取成功');
            this.canGetVerification = false;
            this.settime();
          } else {
            this.$message.error('验证码获取失败');
          }
        });
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
  }
}
</script>

<style scoped lang="less">
  .authConfirm-box{
    .phoneStyle{
      padding: 0 20px;
      color: #777777;
      font-size: 14px;
      height: 48px;
      line-height: 48px;
      background: #E7F1FF;
    }
    .contentStyle{
      padding: 0 20px 30px 20px;
      .titleStyle {
        font-size: 16px;
        font-weight: 500;
        color: #111111;
      }
      .mustFillStyle {
        color: @wranColor;
      }
      .buttonDiv {
        text-align: center;
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
      .verifyCodeStyle {
        position:absolute;
        height: 32px;
        line-height: 32px;
        top: 0px;
        right: 0px;
      }
      .canGet {
        color:#0A87F8;
      }
      .canNotGet {
        color: #777777;
      }
    }
    /deep/ .ant-input{
      color: #111111;
    }
  }
</style>