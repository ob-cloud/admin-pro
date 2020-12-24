<template>
  <div class="reset-bxo f-fl">
    <input class="substitute" type="text" name="text">
    <input class="substitute" type="password" name="password">
    <div class="part" style="margin-top:5px">
      <div>
        手机号（登录账号）
        <span class="must">*</span>
      </div>
      <div class="part_value u-bottom-border">
        <a-input v-model="phoneNum" maxlength="11" @input.native="phoneChange" placeholder="请输入手机号"></a-input>
      </div>
    </div>
    <div class="part" style="margin-top:30px">
      <drag-verify :width="480" :height="40" :handler-icon="handlerIcon" :success-icon="successIcon" text="向右滑动完成验证" success-text="验证通过" background="#ddd" progress-bar-bg="#E6F3FE" completedBg="#E6F3FE" text-size="14px" :circle="false" @passcallback="isPass=true" ref="Verify"></drag-verify>
    </div>
    <div class="part" style="margin-top:30px">
      <div>
        验证码
        <span class="must">*</span>
      </div>
      <div class="part_value">
        <div class="input_wrap f-fl u-bottom-border">
          <a-input v-model="verification" maxlength="6" @input.native="phoneChangeVerification" placeholder="请输入验证码"></a-input>
        </div>
        <div class="verification f-fl">
          <span v-if="canGetVerification" :class="isPass?'isPass':''" @click="getVerification">获取验证码</span>
          <span v-else>{{intervalText}}</span>
        </div>
        <div style="clear:both;"></div>
      </div>
    </div>
    <div class="part">
      <div>
        新密码
        <span class="must">*</span>
      </div>
      <div class="part_value">
        <div class="part_value u-bottom-border">
          <a-input-password autocomplete="new-password" v-model="pwdNum" maxlength="16" :type="pwdType" placeholder="请输入新密码" @input.native="pwdChange"></a-input-password>
        </div>
        <div style="clear:both;"></div>
      </div>
    </div>
    <p class="tips">6～16位字符，密码由字母 + 数字组合</p>
    <div class="footer">
      <div class="footer_left f-fl">
      </div>
      <div class="registerBtn">
        <a-button @click="doSave" :class="isPass?'isPassBg':''">确定重置</a-button>
      </div>
      <div style="clear:both;"></div>
    </div>
  </div>
</template>

<script>
import dragVerify from 'vue-drag-verify';
import 'font-awesome/css/font-awesome.min.css'
import {
  changePwd, sendVerifyCode
} from '@/api/enterprise';
// import { accessrouters, page404, page401 } from '@/router/routers';
// import { routerFilter } from '@/libs/routerPermission';
export default {
  name: 'Register',
  components: { dragVerify },
  props: {},
  data() {
    return {
      activeItem: 2,
      phoneNum: '',
      verification: '',
      pwdNum: '',
      agree: true,
      eyes: false,
      pwdType: 'password',
      canGetVerification: true,
      countdown: 60,
      intervalText: '60s后重新获取',
      isPass: false,
      readonlyPhone: true,
      handlerIcon: "fa fa-angle-double-right",
      successIcon: "fa fa-check",
    };
  },
  methods: {
    phoneChange(e) {
      e.target.value = e.target.value.replace(/[^\.\d]/g, '');
      // console.log(this.ruleForm.companyTel);
      this.phoneNum = e.target.value;
    },
    phoneChangeVerification(e) {
      e.target.value = e.target.value.replace(/[^\.\d]/g, '');
      // console.log(this.ruleForm.companyTel);
      this.verification = e.target.value;
    },
    pwdChange(e) {
      e.target.value = e.target.value.replace(/[^a-z0-9]+/gi, '');
      this.pwdNum = e.target.value;
      // this.pwdNum = e.target.value;
      // console.log(this.ruleForm.companyTel);
    },
    checkAgree() { },
    changeSeePwd() {
      this.eyes = !this.eyes;
      if (this.eyes) {
        this.pwdType = 'text';
      } else {
        this.pwdType = 'password';
      }
    },
    // 发送验证码
    getVerification() {
      const _this = this;
      if (!_this.phoneNum) {
        this.$message.error('请输入手机号!');
        return;
      }
      if (!_this.$refs.Verify.isPassing) {
        _this.$message.warning('请将滑块拖动到右侧');
        return;
      } else {
        const regTel = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (regTel.test(_this.phoneNum)) {
          if (_this.canGetVerification) {
            _this.canGetVerification = false;
            let sendData = _this.phoneNum;
            _this.settime();
            sendVerifyCode(sendData).then(res => {
              if (res.code === '200') {
                this.$message.success('短信发送成功，请注意接收！');
              }
            });
          }
        } else {
          this.$message.error('手机号有误');
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
    doSave() {
      if (this.checkData()) {
        const sendData = {
          account: this.phoneNum,
          password: this.pwdNum,
          verifyCode: this.verification
        };
        // console.log(sendData);
        changePwd(sendData).then(res => {
          if (res.code === '200') {
            this.$message.success('密码重置成功！');
            this.$emit('closeThis');
          }
        });
      }
    },
    checkData() {
      let $self = this;
      if (!this.phoneNum) {
        this.$message.error('请输入手机号!');
        return false;
      }
      if (!$self.$refs.Verify.isPassing) {
        $self.$message.warning('请将滑块拖动到右侧');
        return false;
      }
      if (!this.verification) {
        this.$message.error('请输入验证码!');
        return false;
      }
      if (!this.pwdNum) {
        this.$message.error('请输入密码!');
        return false;
      } else {
        // let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/; // 大小写字母、数字、特殊符号、最少8位
        let reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}$/; // 大小写字母、数字、最少8位
        if (!reg.test(this.pwdNum)) {
          this.$message.error('6～16位字符，密码由字母 + 数字组合!');
          return false;
        }
      }
      return true;
    },
    resetVerify() {
      // 恢复滑动到原点
      this.$refs.Verify.isMoving = false;
      this.$refs.Verify.x = 0;
      this.$refs.Verify.isPassing = false;
      this.$refs.Verify.$refs.handler.style.left = '0';
      this.$refs.Verify.$refs.progressBar.style.width = '0';
    },
    returnFun() {
      this.$emit('closeThis', true);
    }
  },
  created() { },
  watch: {
    phoneNum(n, o) {
      if (o.length == 11) {
        this.canGetVerification = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>

.reset-bxo {
  background: #fff;
  width: 100%;
  padding: 0 20px;
  border-radius: 0 0 4px 4px;
  .part {
    margin-top: 25px;
    .must {
      display: inline-block;
      margin-left: 5px;
      color: #d0021b;
    }
    .part_value {
      // border-bottom: 1px solid #dddddd;
      .input_wrap {
        width: calc(100% - 100px);
      }
      .verification {
        width: 100px;
        height: 38px;
        line-height: 38px;
        color: #999;
        cursor: pointer;
        text-align: right;
      }
      .isPass {
        color: #0A87F8;
      }
      .eyes_wrap {
        text-align: right; // padding-right: 30px;
      }
    }
  }

  .gender {
    .gender-son {
      width: 48px; // height: 16px;
      >span {
        display: inline-block;
        line-height: 21px;
        height: 16px;
        width: 20px;
        svg {
          width: 16px;
          height: 16px;
          margin-top: 4px;
        }
      }
      .greenCol {
        color: #0A87F8;
      }
    }
  }
}

.tips {
  padding: 6px 0 14px;
  color: #FFA036;
}
&/deep/ .fa-check:before{
  color: #fff!important;
}
</style>
<style lang="less">
.reset-bxo {
  .ant-input {
    // border: none;
    padding: 4px 0;
  }
  .substitute {
    width: 0;
    height: 0;
    border: none;
  }
  .registerBtn {
    .ant-btn {
      width: 477px;
      height: 44px;
      background: rgba(221, 221, 221, 1);
      border-radius: 5px;
    }
    margin:0 0 30px 0;
  }
  .returnBtn {

    width: 116px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(10, 135, 248, 1);
    line-height: 20px;
    margin: 20px auto;
  }
  .footer {
    margin-top: 13px;
    .ant-btn {
      color: #fff;
    }
    .isPassBg {
      background: #0A87F8;
    }
  }
}

// drag verify
.drag_verify {
  .dv_handler {
    width: 40px !important;
    height: 40px !important;
  }
}
</style>

