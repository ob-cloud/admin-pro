<template>
  <!-- 绑定闲鱼管家-->
  <div class="changePhone-box">
    <title-steps :steps="steps"></title-steps>
    <div class="contentStyle" v-if="steps==1">
      <div class="stepOneStyle clearfix">
        <div class="f-fl">
          <span style="color: #777777">原手机号：</span>
          <span style="color: #111111">{{phone}}</span>
        </div>
        <div class="f-fr cursor">
          <span style="text-align: center;color: #0A87F8;border-left: 1px solid #E8E8E8;padding-left: 15px;" v-if="canGetVerification" @click="getVerification(1)">获取验证码</span>
          <span style="text-align: center;border-left: 1px solid #E8E8E8;padding-left: 15px;" v-else>{{intervalText}}</span>
        </div>
      </div>
      <div style="margin-top: 19px;">
        <label-item title="验证码" class="u-bottom-border" :must-fill="true">
          <a-input v-model="verifyCode1" placeholder="请输入验证码"></a-input>
        </label-item>
      </div>
      <div class="clearfix">
        <div class="buttonDiv f-fr" style="margin-top: 132px;">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave(1)">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="save(1)">
            确定解绑
          </a-button>
        </div>
      </div>
    </div>
    <div class="stepTwoStyle" v-if="steps==2">
      <label-item title="新手机号" class="u-bottom-border" :must-fill="true" style="position:relative;">
        <a-input v-model="newPhone" placeholder="请输入新手机号" style="color: #111111;margin-top: 5px;"></a-input>
        <div class="cursor" style="position: absolute;top:29px;right: 0px;height: 32px;line-height: 32px;">
          <span style="text-align: center;color: #0A87F8;border-left: 1px solid #E8E8E8;padding-left: 15px;" v-if="canGetVerification" @click="getVerification(2)">获取验证码</span>
          <span style="text-align: center;border-left: 1px solid #E8E8E8;padding-left: 15px;" v-else>{{intervalText}}</span>
        </div>
      </label-item>
      <div style="margin-top: 19px;">
        <label-item title="验证码" class="u-bottom-border" :must-fill="true">
          <a-input v-model="verifyCode2" placeholder="请输入验证码"></a-input>
        </label-item>
      </div>
      <div class="clearfix">
        <div class="buttonDiv f-fr" style="margin-top: 119px;">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave(2)">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="save(2)">
            绑定
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleSteps from './TitleSteps';
import {waSendBindPhoneVerifyCode,waSendUnBindPhoneVerifyCode,waBindPhone,waUnBindPhone} from '@/api/wallet.js';
export default {
  name: "changePhone",
  components: {
    TitleSteps,
  },
  props: {
    phone:{
      type:String,
      required:true,
    },
    accountId:{
      Type:String,
      required:true,
    },
  },
  data() {
    return {
      saveLoading:false,
      steps:1,
      verifyCode1:'',
      verifyCode2:'',
      countdown: 60,
      intervalText: '60s后重新获取',
      canGetVerification: true,
      newPhone:'',
    }
  },
  created() {
  },
  methods:{
    settime() {
      const _this = this;
      if (_this.countdown <= 0) {
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
    // 发送验证码
    getVerification(val) {
      if (this.canGetVerification) {
        if(val==1){
          this.canGetVerification = false;
          this.settime();
          waSendUnBindPhoneVerifyCode({id:this.accountId}).then(res => {
            if (res.code === '200') {
              this.$message.success('短信发送成功，请注意接收！');
            }
          });
        }
        if(val==2){
          if(!this.newPhone){
            this.$message.warning('请输入新手机号');
            return
          }else if (!/^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(this.newPhone)) {
            this.$message.warning('手机号码输入错误');
            return false;
          }
          if(this.newPhone==this.phone){
            this.$message.warning('新手机号不可与原手机号一致');
            return
          }
          this.canGetVerification = false;
          this.settime();
          let parameter = {
            id:this.accountId,
            phone:this.newPhone,
          };
          waSendBindPhoneVerifyCode(parameter).then(res => {
            if (res.code === '200') {
              this.$message.success('短信发送成功，请注意接收！');
            }
          });
        }
      }
    },
    cancelSave(val){
      if(val==1){
        //取消解绑
        this.$emit('cancelBind',0);
      }
      if(val==2){
        //取消绑定手机号
        this.$emit('cancelBind',1);
      }
    },
    save(val){
      if(val==1){
        //解绑手机号
        if(!this.verifyCode1){
          this.$message.warning('请输入验证码');
          return
        }
        let parameter ={
          accountId:this.accountId,
          verifyCode:this.verifyCode1,
        };
        this.saveLoading = true;
        waUnBindPhone(parameter).then(res=>{
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            this.saveLoading = false;
            this.$message.info('解绑成功');
            this.$emit('successUnBindPhone');
            this.canGetVerification = true;
            this.countdown = 0;
            this.steps += 1;
          }
          else{
            this.saveLoading = false;
            this.$message.error('解绑失败');
          }
        });
      }
      if(val==2){
        //绑定新手机号
        if(!this.verifyCode2){
          this.$message.warning('请输入验证码');
          return
        }
        if(!this.newPhone){
          this.$message.warning('请输入新手机号');
          return
        }else if (!/^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(this.newPhone)) {
          this.$message.warning('手机号码输入错误');
          return false;
        }
        if(this.newPhone==this.phone){
          this.$message.warning('新手机号不可与原手机号一致');
          return
        }
        let parameter ={
          accountId : this.accountId,
          verifyCode : this.verifyCode2,
          phone : this.newPhone,
        };
        this.saveLoading = true;
        waBindPhone(parameter).then(res=>{
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            this.saveLoading = false;
            this.$message.info('手机号绑定成功');
            this.$emit('successBindPhone');
          }
          else{
            this.saveLoading = false;
            this.$message.error('手机号绑定失败');
          }
        });
      }
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
.changePhone-box{
  .contentStyle{
    margin: 10px 20px 0 20px;
  }
  .stepOneStyle{
    width: 480px;
    height: 48px;
    line-height: 48px;
    background: #F6F7F8;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 14px;
  }
  .stepTwoStyle{
    margin-top: 10px;
    padding: 0 20px;
  }
  .buttonDiv {
    margin-bottom: 20px;
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