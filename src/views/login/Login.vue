<template>
  <div class="loginCs">
    <div class="log-con">
      <p class="log-p"><span class="log-span-left">{{ GlobalConfig.SYSTEM_NAME }}</span><span class="log-span-right">智慧资产管理平台</span></p>
      <div class="log-item f-clearfix">
        <div class="loginImg f-fl">
          <a-carousel effect="fade" autoplay pauseOnHover>
            <img src="../../assets/login/login1.png"  />
            <img src="../../assets/login/login2.png"  />
            <img src="../../assets/login/login3.png"  />
          </a-carousel>
        </div>
        <div class="iptFormCs f-fr">
          <h1 class="titleTip one-h1">
            <span class="titleFont">欢迎登录</span>
          </h1>
          <h1 class="titleTip">
            <span class="titleFont">WELCOME</span>
          </h1>
          <a-form :form="form" :layout="formLayout"  @submit="userlogin" class="formMargin">
            <a-form-item label="手机号" class="phone">
              <a-input size="large" placeholder="请输入手机号"
                       v-decorator="['username', { rules: [{ required: true,message: '请输入手机号', trigger: 'blur' }] }]"
              />
            </a-form-item>
            <a-form-item label="密码" class="password" :mustFill="true">
              <a-input-password type="" size="large" placeholder="请输入密码"
                                v-decorator="['password', { rules: [{ required: true,message: '请输入密码', trigger: 'blur' },{ min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }] }]"
              />
            </a-form-item>
            <div class="formAMargin">
              <div class="loginJoinLeft" v-if="GlobalConfig.IS_OPEN_REGISTER"><a  href="javascript:;" @click="showRegister">注册</a></div>
              <div class="loginJoinRight"><a  href="javascript:;" @click="showReset">忘记密码</a></div>
            </div>
            <a-form-item  class="formItemMargin">
              <a-button :loading="spinLoading" size="large" type="primary" html-type="submit" class="formItemMarginButton">
                登录
              </a-button>
            </a-form-item>
          </a-form>
          <div style="width: 100%;margin-top: 14px;font-size: 12px;color: #777777"><div style="text-align: center">登录即同意<span class="cursor" style="color: #0A87F8" @click="serviceAgreementShowStyle">《{{GlobalConfig.SYSTEM_NAME}}平台服务协议》</span></div></div>
        </div>
      </div>
    </div>
    <!-- 企业注册 -->
    <a-modal centered v-if="registerShow" v-model="registerShow" :footer="null" class="ownModalBorder titDialog" title="账号注册" @cancel="handleCancel">
      <register :registerShow="registerShow"  @closeThis="registerShow=false"></register>
    </a-modal>
    <!-- 忘记密码 -->
    <a-modal centered v-if="resetShow" v-model="resetShow" :footer="null" class="ownModalBorder titDialog" title="重置密码" @cancel="handleResetCancel">
      <reset :resetShow="resetShow"  @closeThis="resetShow=false"></reset>
    </a-modal>
    <!-- 服务协议 -->
    <a-modal centered v-model="serviceAgreementShow" :footer="null" class="ownModalBorder" title="" @cancel="serviceAgreementShowCancel" width="800px">
      <service-agreement @closeThis="serviceAgreementShow=false"></service-agreement>
    </a-modal>
  </div>
</template>

<script>
import reset from "./plug/reset";
import register from "./plug/register";
import serviceAgreement from "./plug/serviceAgreement";
import AFormItem from "ant-design-vue/es/form/FormItem";
import { routerFilter } from "@/router/filterRouter";
import { asyncRouterMap,failRouterMap } from "@/config/router.config.js";
import { USERNAME, ROUTER, EMPACCOUNTID } from '@/store/mutation-types'

export default {
  data() {
    return {
      resetShow: false,
      registerShow: false,
      formLayout: 'vertical',
      username:'',
      password:'',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      spinLoading:false,
      serviceAgreementShow:false,
    };
  },
  components: {AFormItem,register,reset,serviceAgreement},
  created(){
    let locationHref= window.location.href;
    if(locationHref.indexOf('index?walletSign')>-1){
      let locationHrefs = locationHref.split('index?walletSign');
      window.location.href=locationHrefs[0]+'#/walletSign?id=1&&name=123';
    }
    if (this.$route.query.invalidRegister){
      this.registerShow = true;
    }
  },
  methods: {
    userlogin(e){
      this.spinLoading = true;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("userLogin", values).then(res => {

            if (res.code === "200") {
              // jump  1  存在有效公司 可以进入主界面 2  没绑定企业 进入我的企业
              if(res.data.jump == 2){
                this.$ls.set(EMPACCOUNTID,res.data.accountId);
                this.$router.push({
                  path: '/enterpriseList'
                });
              }else{
                let router = routerFilter(asyncRouterMap[0].children, res.data.menuTree.children);
                asyncRouterMap[0].children = router;
                // console.log(asyncRouterMap)
                this.$ls.set(USERNAME,values.username);
                this.$ls.set(EMPACCOUNTID,res.data.accountId);
                this.$store.commit("FIRST_ROUTER", asyncRouterMap);
                this.$router.addRoutes(asyncRouterMap);
                this.$router.addRoutes(failRouterMap);
                this.$ls.remove(ROUTER);
                if (res.data.menuTree.children.length !== 0) {
                  // 存一下获取到的权限路由数据
                  this.$ls.set(ROUTER,JSON.stringify(res.data.menuTree.children));
                }
                let hasWorkbench = false
                res.data.menuTree.children.length && res.data.menuTree.children.forEach(val=>{
                  if (val.mark == 'mk_workbench'){
                    hasWorkbench = true
                  }
                })
                if (hasWorkbench){
                  this.$router.push({
                    name: asyncRouterMap[0].name
                  });
                }else{
                  if (asyncRouterMap[0].children[0]){
                    this.$router.push({
                      name: asyncRouterMap[0].children[0].name
                    });
                  }else{
                    this.$router.push({
                      name: 'workbench'
                    });
                  }

                }
              }

            }
          });
          setTimeout(()=>{
            this.spinLoading = false;
          },1000)
        }
      });
    },
    // 显示注册
    showRegister() {
      this.registerShow = true;
    },
    handleCancel(){
      this.registerShow = false;
    },
    showReset(){
      this.resetShow = true;
    },
    handleResetCancel(){
      this.resetShow = false;
    },
    serviceAgreementShowCancel(){
      this.serviceAgreementShow = false;
    },
    serviceAgreementShowStyle(){
      this.serviceAgreementShow = true;
    },
  }
};
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.loginCs {
  width: 100%;
  // height: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  // display: flex;
  align-items: center;
  min-width: 1100px;
  min-height: 700px;
  // background: #fff;
  background:rgba(233,240,250,1);
  .log-con{
    width: 1100px;
    margin: 0 auto;
    margin-top: calc( 50vh - 330px );
    .log-p{

      .log-span-left{
        color:#0A87F8;
        font-size: 32px;
        font-weight:600;
        font-family:PingFangSC-Semibold,PingFang SC;
        margin-right: 28px;
      }
      .log-span-right{
        color:#7C8CAD;
        font-size: 22px;

        font-family:PingFangSC-Semibold,PingFang SC;
      }
    }
    .log-item{
      margin-top:16px;
      width:100%;
      height:580px;
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 40px 0px rgba(46,92,182,0.5);
      border-radius:6px;
      .loginImg{
        width:660px;
        height:580px;
        border-radius: 6px 0 0 6px;
        img{
          width:660px;
          height:580px;
          overflow: hidden;
          border-radius: 6px 0 0 6px;
        }
      }

    }
  }
  .noneCs {
    width: 0;
    height: 0;
    border: none;
    display: inherit;
  }
  .iptFormCs {
    padding: 0 40px;
    position: relative;
    overflow: hidden;
    width: 440px;
    height: 580px;
    z-index: 6;
    border-radius: 0px 10px 10px 0px;
    border: none;
    .one-h1{
      margin: 54px 0 0 0;
    }
    .titleTip {
      font-size: 30px;
      font-weight: 600;
      color: #0A87F8;

    }
    .titleFont {
      font-size: 32px;
      color: #111111;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      // padding-left:15px;
      vertical-align: middle;
    }
    .formMargin {
      margin: 39px 0 0;
    }
    .formLabel {
      margin-top: 10px;
    }
    .formItemMargin{
      border: none;
      height: 40px;
      padding:0;
      background:linear-gradient(316deg,rgba(22,137,213,1) 0%,rgba(45,145,231,1) 100%);
      border-radius:4px;
      box-shadow:0px 4px 40px 0px rgba(46,92,182,0.5);
    }
    .formAMargin{
      margin: 0 0 50px;
      height: 35px;
    }
    .formItemMarginButton{
      width: 100%;
    }
    & /deep/ .ant-input {
      padding: 0;
      border: none;
      border-bottom: 1px solid #ddd;
      box-shadow: none;
      border-radius: 0;
    }
    & /deep/ .ant-form-item-required::before{
      display: none;
    }
    & /deep/ .ant-form-explain{
      position: absolute;
    }
    & /deep/ .ant-form label{
      font-size: 16px;
    }
    & /deep/ .ant-form-vertical .ant-form-item{
      margin: 0;
    }
    & /deep/ .ant-form-vertical .ant-form-item.phone{
      margin: 0 0 30px 0;
    }
    & /deep/ .ant-form-vertical .ant-form-item.password{
      margin: 0 0 16px 0;
    }

    .loginBtnCs {
      margin: 30px 0 0;
      border: none;
      background: linear-gradient(
          316deg,
          rgba(22, 213, 173, 1) 0%,
          rgba(28, 212, 214, 1) 100%
      );
      border-radius: 5px;
      transition: all 0.2s;
      &:active {
        transform: scale(0.9);
      }
    }
  }
  .loginLeft {
    width: 252px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 5;
  }
  .loginRight {
    /*width: 550px;*/
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
    min-height: 700px;
    height: 100vh;
  }
  .loginJoinLeft{
    text-align:left;
    float:left;
    a {
      color: #1890ff
    }
  }
  .loginJoinRight{
    text-align:right;
    float:right;
    a {
      color: #1890ff
    }
  }
}
&/deep/ .ant-carousel  {
  background:rgba(237,244,252,1);
  text-align: center;
  // height: 160px;
  // line-height: 160px;
  overflow: hidden;
  border-radius: 6px 0 0 6px;
  .slick-list{
    border-radius: 6px 0 0 6px;
  }
}
</style>
