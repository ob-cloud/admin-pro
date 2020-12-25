<template>
  <div class="editPassword-box">
    <div class="accountStyle">登录账号：{{phone}}</div>
    <div class="inputStyle clearfix">
      <label-item title="验证码" class="u-bottom-border" :must-fill="true" style="margin-bottom: 20px;position:relative;">
        <a-input v-model="verifyCode" placeholder="请输入"></a-input>
        <div style="position: absolute;top:28px;right: 0px;">
          <span class="cursor" style="text-align: center;color: #0A87F8;" v-if="canGetVerification" @click="getVerification">获取验证码</span>
          <span style="text-align: center" v-else>{{intervalText}}</span>
        </div>
      </label-item>
      <label-item title="新密码" class="u-bottom-border" :must-fill="true" style="margin-bottom: 20px;">
        <a-input-password autocomplete="new-password" v-model="newPassword" placeholder="6～16位字符，密码由字母 + 数字组合"></a-input-password>
      </label-item>
      <label-item title="确认新密码" class="u-bottom-border" :must-fill="true" style="margin-bottom: 20px;">
        <a-input-password autocomplete="new-password" v-model="newPasswordSecond" placeholder="请再次输入新密码"></a-input-password>
      </label-item>
      <div class="buttonDiv f-fr" style="margin-top: 85px;">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="save">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  employeeModifyPassword, sendVerifyCode
} from '@/api/enterprise';
export default {
  name: "editPassword",
  props: {
    phone:{
      Type:String,
      required:true,
    },
    userId:{
      Type:String,
      required:true,
    },
  },
  data() {
    return {
      verifyCode:'',
      newPassword:'',
      newPasswordSecond:'',
      saveLoading:false,
      countdown: 60,
      intervalText: '60s后重新获取',
      canGetVerification: true,
    }
  },
  created() {

  },
  methods: {
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
    // 发送验证码
    getVerification() {
      if (!this.phone) {
        this.$message.error('登录账号有误!');
        return;
      }
      if (this.canGetVerification) {
        this.canGetVerification = false;
        let sendData = this.phone;
        this.settime();
        sendVerifyCode(sendData).then(res => {
          if (res.code === '200') {
            this.$message.success('短信发送成功，请注意接收！');
          }
        });
      }
    },
    cancelSave(){
      this.$emit('cancelSave');
    },
    save(){
      if (!this.verifyCode){
        this.$message.warning('请输入验证码');
        return ;
      }
      if (!this.newPassword){
        this.$message.warning('请输入新密码');
        return ;
      }
      let reg = /([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*/;
      if(!reg.test(this.newPassword)||this.newPassword.length<6||this.newPassword.length>16){
        this.$message.warning('密码由6～16位字母 + 数字组合');
        return ;
      }
      if (!this.newPasswordSecond){
        this.$message.warning('请输入确认新密码');
        return ;
      }
      if(this.newPassword!=this.newPasswordSecond){
        this.$message.warning('确认新密码与新密码不一致');
        return ;
      }
      let parameter ={
        id:this.userId,
        newPassword:this.newPasswordSecond,
        verifyCode:this.verifyCode
      };
      this.saveLoading = true;
      employeeModifyPassword(parameter).then(res => {
          if(!res){
            this.saveLoading = false;
          }
          if (res.code === '200') {
            this.$message.success('密码修改成功');
            setTimeout(()=>{
              sessionStorage.clear();
              this.$router.go(0);
            },1000);
          } else {
            this.saveLoading = false;
          }
      });
    },
  },
  watch: {}
}
</script>

<style lang="less" scoped>
  .editPassword-box{
    .accountStyle{
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      background: #E9F1FF;
      color: #777777;
      font-size: 14px;
    }
    .inputStyle{
      padding: 15px 20px;
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