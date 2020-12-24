<template>
  <div class="register-bxo f-fl">
    <!-- 骗浏览器输出的 防止填充input-->
    <input class="substitute" type="text" name="text">
    <input class="substitute" type="password" name="password">
    <!--  -->
    <div class="part">
      <div>
        真实姓名<span class="must">*</span>
      </div>
      <div class="part_value u-bottom-border">
        <a-input v-model="name" placeholder="请输入您的姓名"></a-input>
      </div>
    </div>
    <div class="part">
      <div style="margin-top:20px; ">
        身份证号<span class="must">*</span>
      </div>
      <div class="part_value u-bottom-border">
        <a-input v-model="idCardNo" maxlength="18"  placeholder="请输入您的身份证号"></a-input>
      </div>
    </div>
    <div class="part">
      <div style="margin-top:20px; ">
        手机号<span class="must">*</span>
      </div>
      <div class="part_value u-bottom-border">
        <a-input v-model="phoneNum" maxlength="11" @input.native="phoneChange" placeholder="请输入手机号"></a-input>
      </div>
    </div>
    <div class="part">
      <drag-verify :width="480" :height="40" :handler-icon="handlerIcon" :success-icon="successIcon" text="向右滑动完成验证" success-text="验证通过" background="#ddd" progress-bar-bg="#E6F3FE" completedBg="#E6F3FE" text-size="14px" :circle="false" @passcallback="isPass=true" ref="regVerify"></drag-verify>
    </div>
    <div class="part">
      <div style="margin-top:20px; ">
        验证码<span class="must">*</span>
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
      <div style="margin-top:15px; ">
        设置登录密码<span class="must">*</span>
      </div>
      <div class="part_value u-bottom-border">
        <a-input-password v-model="pwdNum" maxlength="16" :type="pwdType" placeholder="请输入登录密码" @input.native="pwdChange"></a-input-password>
        <div style="clear:both;"></div>
      </div>
    </div>
    <p class="tips">6～16位字符，密码由字母 + 数字组合</p>
    <div class="footer">
      <div class="registerBtn">
        <a-button @click="doNext" :class="isPass?'isPassBg':''">注册</a-button>
      </div>
      <div class="returnBtn cursor" @click="returnFun">
        已有账号，去登录
      </div>
      <div style="clear:both;"></div>
    </div>
  </div>
</template>

<script>
import dragVerify from 'vue-drag-verify';
import { registration, sendVerifyCode } from '@/api/enterprise'
import 'font-awesome/css/font-awesome.min.css'
// import { accessrouters, page404, page401 } from '@/router/routers';
// import { routerFilter } from '@/libs/routerPermission';
export default {
  name: 'Register',
  components: { dragVerify },
  props: {},
  data() {
    return {
      name: '',
      idCardNo: '',
      phoneNum: '',
      verification: '',
      pwdNum: '',
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
    // 发送验证码
    getVerification() {
      const _this = this;
      if (!_this.phoneNum) {
        this.$message.error('请输入手机号!');
        return;
      }
      if (!_this.$refs.regVerify.isPassing) {
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
    doNext() {
      if (this.checkData()) {
        console.log(1)
        const sendData = {
          name: this.name,
          idCardNo: this.idCardNo,
          account: this.phoneNum,
          password: this.pwdNum,
          regFrom: '2',
          verifyCode: this.verification
        };
        registration(sendData).then(res => {
          if (res.code === '200') {
            // accountId: "5e2cbf90ad85b00ef7491ca56a533206"
            // regResult: 1
            const data = res.data;
            // if (data.regResult == 3 || data.regResult == 1) {
              // 均未创建公司
              this.$ls.set(
                "empAccountId",
                 res.data.accountId
              );
              this.$router.push({
                path: '/enterpriseList'
              });
            // } else if (data.regResult == 2) {
            //   // 已有账号且有有效绑定公司(直接登录)
            //   this.$ls.set(
            //     "empAccountId",
            //     JSON.stringify(res.data.accountId)
            //   );
            //   sessionStorage.setItem('falgepasw', escape(this.pwdNum));
            //   // 登录成功
            //   this.$ls.set(
            //     "empaccount",
            //     JSON.stringify(res.data.accountId)
            //   );
            //   this.$ls.set(
            //     "username",
            //     JSON.stringify(this.phoneNum)
            //   );
            //   if (res.data.menuTree.children.length !== 0) {
            //     this.$ls.set(
            //     "router",
            //     JSON.stringify(res.data.accountId)
            //   );

            //   }
            // }

          }
        });
      }
    },
    checkData() {
      let $self = this;
      if (!this.name) {
        this.$message.error('请输入您的姓名!');
        return false;
      }
      if (!this.idCardNo) {
        this.$message.error('请输入身份证号!');
        return false;
      } else {
        let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
        if (!reg.test(this.idCardNo)) {
          this.$message.error('请输入正确身份证号');
          return false;
        }
      }
      if (!this.phoneNum) {
        this.$message.error('请输入手机号!');
        return false;
      }
      if (!$self.$refs.regVerify.isPassing) {
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
      this.$refs.regVerify.isMoving = false;
      this.$refs.regVerify.x = 0;
      this.$refs.regVerify.isPassing = false;
      this.$refs.regVerify.$refs.handler.style.left = '0';
      this.$refs.regVerify.$refs.progressBar.style.width = '0';
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

.register-bxo {
  height: calc(100vh - 150px);
  overflow: auto;
  max-height: 660px;
  background: #fff;
  width: 100%;
  padding: 0 20px;
  border-radius: 0 0 4px 4px;
  .part {
    .must {
      display: inline-block;
      margin-left: 4px;
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
.register-bxo {
  .ant-input {
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
     .ant-btn{
       color:#fff;
     }
    .isPassBg{
        background:#0A87F8;
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

// .part_value:focus{
//   border-bottom:1px solid #0A87F8!important;
// }
.dv_handler {
  .el-icon-d-arrow-right {
    line-height: 10px;
  }
}

// .el-icon-d-arrow-right:before {
//   content: ">";
// }


// .drag_verify .dv_handler i {
//     /* color: #666; */
//     font-size: 1.5em;
// }
.dv_text {
  color: #111111!important;
}

.dv_handler_ok_bg {
  background: #0A87F8!important;
}


</style>

