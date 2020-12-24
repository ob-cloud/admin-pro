<template>
  <div class="bindAccount-box">
    <div class="selectBrand">
      <div class="cursor" :class="sendData.brand==1?'selectedBrandStyle':'unSelectedBrandStyle'" @click="changeBrand(1)">
        <span :class="sendData.brand==1?'selectedSpan':''">云丁</span>
      </div>
      <div class="cursor" :class="sendData.brand==2?'selectedBrandStyle':'unSelectedBrandStyle'" @click="changeBrand(2)">
        <span :class="sendData.brand==2?'selectedSpan':''">果加</span>
      </div>
      <div class="cursor" :class="sendData.brand==3?'selectedBrandStyle':'unSelectedBrandStyle'" @click="changeBrand(3)">
        <span :class="sendData.brand==3?'selectedSpan':''">蜂电</span>
      </div>
      <div class="cursor" :class="sendData.brand==4?'selectedBrandStyle':'unSelectedBrandStyle'" @click="changeBrand(4)">
        <span :class="sendData.brand==4?'selectedSpan':''">超仪</span>
      </div>
    </div>
    <div class="bindAccount-box clearfix" v-if="sendData.brand==1">
      <div class="title" style="margin-top: 20px;" v-if="yunDingAccountAuthFlag">账号授权类型</div>
      <div class="account-type clearfix" v-if="yunDingAccountAuthFlag">
        <div class="account-type-yunting cursor" @click="changeType(1)" :class="type == 1?'clickStyle':'unClickStyle'">
          <div class="account-type-font1">账号授权</div>
          <div class="account-type-font2">只有云丁平台账号信息</div>
          <div v-if="type == 1" :class="type == 1 ?'triangle-top-right-click':'triangle-top-right-unClick'">
          </div>
          <icon-font v-if="type == 1" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
        </div>
        <div class="account-type-guojia cursor" @click="changeType(2)" :class="type == 2?'clickStyle':'unClickStyle'">
          <div class="account-type-font1">账号密钥授权</div>
          <div class="account-type-font2">已有账号和密钥信息</div>
          <div v-if="type == 2" :class="type == 2 ?'triangle-top-right-click':'triangle-top-right-unClick'">
          </div>
          <icon-font v-if="type == 2" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
        </div>
      </div>
      <div v-if="type == 1" class="account-type-other">
        <div class="account-type-other1">
          <img src="../../../assets/login/no-collect.png">
        </div>
        <div style="color: #777777;font-size: 14px;margin-top: 19px;text-align:center;">请前往云丁授权页面登录账号并授权</div>
        <div class="cursor" style="color: #0A87F8;font-size: 16px;margin-top: 18px;text-align:center;" @click="goToYunDing()">去登录授权<icon-font style="margin-left: 4px;" type="iconyumengtubiao_zhishi"/></div>
      </div>
      <div class="title" style="margin-top: 20px;" v-if="type == 2">账号信息</div>
      <div class="warning" v-if="type == 2">
        <a-icon type="exclamation-circle" style="color: #FFA036;margin:0 5px 0 5px;font-size: 14px;" />client_id 和 client_secret秘钥 请联系云丁商务人员申请
      </div>
      <div class="content" v-if="type == 2">
        <div>
          <label-item class="u-bottom-border" title="账号(client_id)" :must-fill="true" :valLength="sendData.thirdPartyAccountId.length" :maxSize="30" >
            <a-input placeholder="请输入" v-model="sendData.thirdPartyAccountId" maxlength="30"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="密钥(client_secret)" :must-fill="true" :valLength="sendData.thirdPartyAccountSecret.length" :maxSize="40">
            <a-input placeholder="请输入" v-model="sendData.thirdPartyAccountSecret" maxlength="40"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="账号说明" :valLength="sendData.comment.length" :maxSize="50">
            <a-textarea placeholder="请输入" autosize v-model="sendData.comment" maxlength="50"></a-textarea>
          </label-item>
        </div>
      </div>
      <div class="buttonDiv f-fr" v-if="type == 2" :style="!yunDingAccountAuthFlag?'margin-top:202px;':'margin-top:77px;'">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAdd">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="addAccount_yunDing">
          确定
        </a-button>
      </div>
    </div>
    <div class="bindAccount-box clearfix" v-if="sendData.brand==2">
      <div class="title" style="margin-top: 20px;">账号信息</div>
      <div class="content">
        <div>
          <label-item class="u-bottom-border" title="账号" :must-fill="true" :valLength="sendData.thirdPartyAccountId.length" :maxSize="30" >
            <a-input placeholder="请输入" v-model="sendData.thirdPartyAccountId" maxlength="30"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="密码" :must-fill="true" :valLength="sendData.thirdPartyAccountSecret.length" :maxSize="40">
            <a-input placeholder="请输入" v-model="sendData.thirdPartyAccountSecret" maxlength="40"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 19px;position: relative;">
          <label-item class="u-bottom-border" title="密钥" :must-fill="true" :valLength="sendData.thirdPartyApiSecret.length" :maxSize="10">
            <a-input placeholder="请输入" v-model="sendData.thirdPartyApiSecret" maxlength="10"></a-input>
          </label-item>
          <div class="cursor" @click="guoJiaGuidanceDialog=true" style="position: absolute;top: 4px; left:35px;font-size: 12px;color: #0A87F8;">
            <a-icon type="exclamation-circle" style="color: #0A87F8;margin:0 5px 0 5px;font-size: 12px;" />点击查看密钥获取流程
          </div>
        </div>
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="账号说明" :valLength="sendData.comment.length" :maxSize="50">
            <a-textarea placeholder="请输入" autosize v-model="sendData.comment" maxlength="50"></a-textarea>
          </label-item>
        </div>
      </div>
      <div class="buttonDiv f-fr" style="margin-top: 169px;">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAdd">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="addAccount_guoJia">
          确定
        </a-button>
      </div>
    </div>
    <div class="bindAccount-box clearfix" v-if="sendData.brand==3">
      <div class="title" style="margin-top: 20px;position: relative;">
        账号信息
        <div style="position: absolute;color: #FFA036;font-size: 12px;left: 70px;top: 4px;font-weight: 400;">
          <a-icon type="exclamation-circle" style="color: #FFA036;margin:0 5px 0 5px;font-size: 12px;" />请联系蜂电商务获取账号信息
        </div>
      </div>
      <div class="content">
        <div style="position: relative;">
          <label-item class="u-bottom-border" title="机构账号uid" :must-fill="true" :valLength="sendData.thirdPartyAppId.length" :maxSize="50">
            <a-input placeholder="请输入" v-model="sendData.thirdPartyAppId" maxlength="50"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="机构账号secret" :must-fill="true" :valLength="sendData.thirdPartyAppSecret.length" :maxSize="50">
            <a-input placeholder="请输入" v-model="sendData.thirdPartyAppSecret" maxlength="50"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="用户账号uid" :must-fill="true" :valLength="sendData.thirdPartyAccountId.length" :maxSize="50" >
            <a-input placeholder="请输入" v-model="sendData.thirdPartyAccountId" maxlength="50"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="用户账号secret" :must-fill="true" :valLength="sendData.thirdPartyAccountSecret.length" :maxSize="50">
            <a-input placeholder="请输入" v-model="sendData.thirdPartyAccountSecret" maxlength="50"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="账号说明" :valLength="sendData.comment.length" :maxSize="50">
            <a-textarea placeholder="请输入" autosize v-model="sendData.comment" maxlength="50"></a-textarea>
          </label-item>
        </div>
      </div>
      <div class="buttonDiv f-fr" style="margin-top: 94px;">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAdd">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="addAccount_fengDian">
          确定
        </a-button>
      </div>
    </div>
    <div class="bindAccount-box clearfix" v-if="sendData.brand==4">
      <div class="title" style="margin-top: 20px;position: relative;">
        账号信息
        <div class="cursor" @click="chaoYiGuidanceDialog=true" style="position: absolute;top: 4px; left:70px;font-size: 12px;color: #0A87F8;font-weight: 400;">
          <a-icon type="exclamation-circle" style="color: #0A87F8;margin:0 5px 0 5px;font-size: 12px;" />查看获取超仪应用ID和应用秘钥流程
        </div>
      </div>
      <div class="content">
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="应用ID" :must-fill="true" :valLength="sendData.thirdPartyAppId.length" :maxSize="30">
            <a-input placeholder="请输入" v-model="sendData.thirdPartyAppId" maxlength="30"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="应用秘钥" :must-fill="true" :valLength="sendData.thirdPartyAppSecret.length" :maxSize="50">
            <a-input placeholder="请输入" v-model="sendData.thirdPartyAppSecret" maxlength="50"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 19px;">
          <label-item class="u-bottom-border" title="账号说明" :valLength="sendData.comment.length" :maxSize="50">
            <a-textarea placeholder="请输入" autosize v-model="sendData.comment" maxlength="50"></a-textarea>
          </label-item>
        </div>
      </div>
      <div class="buttonDiv f-fr" style="margin-top: 239px;">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAdd">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="addAccount_chaoyi">
          确定
        </a-button>
      </div>
    </div>
    <!-- 云丁授权 -->
    <a-modal destroyOnClose centered v-model="htmlPannelDialog" :footer="null" class="ownModalBorder titDialog" :maskClosable="false" title="授权云丁账号" :bodyStyle="{padding:'0px 0px 0px 0px'}" @cancel="htmlPannelDialog=false" width="1250px">
      <html-panel :url="url" @authSuccess="authSuccess"></html-panel>
    </a-modal>
    <!-- 果加密钥获取流程 -->
    <a-modal centered v-model="guoJiaGuidanceDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 0px 20px 20px'}" @cancel="guoJiaGuidanceDialog=false" width="1000px">
      <guo-jia-guidance @closeThis="guoJiaGuidanceDialog=false"></guo-jia-guidance>
    </a-modal>
    <!-- 超仪密钥获取流程 -->
    <a-modal centered v-model="chaoYiGuidanceDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 0px 20px 20px'}" @cancel="chaoYiGuidanceDialog=false" width="800px">
      <chaoyi-guidance @closeThis="chaoYiGuidanceDialog=false"></chaoyi-guidance>
    </a-modal>
  </div>
</template>

<script>
import * as API from  '@/api/smartDevices';
import HtmlPanel from './HtmlPanel';
import GuoJiaGuidance from './guoJiaGuidance';
import ChaoyiGuidance from './chaoyiGuidance';

export default {
  name: "bindAccount",
  components: {
    HtmlPanel,
    GuoJiaGuidance,
    ChaoyiGuidance,
  },
  props: {
    brand: {
      required: true,
      default:1,
    },
  },
  data() {
    return {
      sendData:{
        brand:1,
        comment:'',
        thirdPartyAccountId:'',
        thirdPartyAccountSecret:'',
        thirdPartyAppId:'',
        thirdPartyAppSecret:'',
        thirdPartyApiSecret:'',
      },
      saveLoading:false,
      url:'',
      htmlPannelDialog:false,
      type:1,
      guoJiaGuidanceDialog:false,
      chaoYiGuidanceDialog:false,
      yunDingAccountAuthFlag:true,
    }
  },
  created() {
    this.sendData.brand = this.brand;
    if(this.sendData.brand==1){
      //云丁的 不允许账号授权
      this.yunDingAccountAuthFlag = this.GlobalConfig.YUNDING_ACCOUNT_AUTH==1;
      if(!this.yunDingAccountAuthFlag){
        this.type = 2;
      }
    }
  },
  methods: {
    authSuccess(){
      setTimeout(()=>{
        this.$message.success('授权成功');
        this.htmlPannelDialog = false;
        this.$emit('authSuccess');
      },3000);
    },
    changeBrand(val){
      if(this.sendData.brand == val){
        return ;
      }
      this.sendData = {
        brand:val,
        comment:'',
        thirdPartyAccountId:'',
        thirdPartyAccountSecret:'',
        thirdPartyAppId:'',
        thirdPartyAppSecret:'',
        thirdPartyApiSecret:'',
      };
    },
    goToYunDing(){
      API.yudingGetAuthUrl().then(res=> {
        if(res.code === '200'){
          this.htmlPannelDialog = true;
          this.url = res.data;
        }
      });
    },
    addAccount_yunDing(){
      if(!this.sendData.thirdPartyAccountId){
        this.$message.warning('请输入账号(client_id)');
        return;
      }
      if(!this.sendData.thirdPartyAccountSecret){
        this.$message.warning('请输入密钥(client_secret)');
        return;
      }
      this.saveLoading = true;
      API.lockAuthAccountBind(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.info('账号绑定成功');
          this.saveLoading = false;
          this.$emit('addSuccess');
        }
        else{
          this.saveLoading = false;
          this.$message.error('账号绑定失败');
        }
      });
    },
    addAccount_chaoyi(){
      if(!this.sendData.thirdPartyAppId){
        this.$message.warning('请输入应用ID');
        return;
      }
      if(!this.sendData.thirdPartyAppSecret){
        this.$message.warning('请输入应用秘钥');
        return;
      }
      this.saveLoading = true;
      API.lockAuthAccountBind(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.info('账号绑定成功');
          this.saveLoading = false;
          this.$emit('addSuccess');
        }
        else{
          this.saveLoading = false;
          this.$message.error('账号绑定失败');
        }
      });
    },
    cancelAdd(){
      this.$emit('cancelAdd');
    },
    changeType(val){
      this.type = val;
    },
    addAccount_guoJia(){
      if(!this.sendData.thirdPartyAccountId){
        this.$message.warning('请输入账号');
        return;
      }
      if(!this.sendData.thirdPartyAccountSecret){
        this.$message.warning('请输入密码');
        return;
      }
      if(!this.sendData.thirdPartyApiSecret){
        this.$message.warning('请输入密钥');
        return;
      }
      this.saveLoading = true;
      API.lockAuthAccountBind(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.info('授权成功');
          this.saveLoading = false;
          this.$emit('addSuccess');
        }
        else{
          this.saveLoading = false;
          this.$message.error('授权失败');
        }
      });
    },
    addAccount_fengDian(){
      if(!this.sendData.thirdPartyAccountId){
        this.$message.warning('请输入账号');
        return;
      }
      if(!this.sendData.thirdPartyAccountSecret){
        this.$message.warning('请输入密码');
        return;
      }
      if(!this.sendData.thirdPartyAppId){
        this.$message.warning('appid');
        return;
      }
      if(!this.sendData.thirdPartyAppSecret){
        this.$message.warning('secret');
        return;
      }
      this.saveLoading = true;
      API.lockAuthAccountBind(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.info('账号绑定成功');
          this.saveLoading = false;
          this.$emit('addSuccess');
        }
        else{
          this.saveLoading = false;
          this.$message.error('账号绑定失败');
        }
      });
    },
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
  .bindAccount-box{
    min-height: 568px;
    .selectBrand{
      height: 40px;
      line-height: 40px;
      display: flex;
      >div{
        flex: 1;
      }
      .selectedBrandStyle{
        background: #E9F1FF;
        opacity: 0.99;
        color: #0A87F8;
        font-size: 16px ;
        font-weight: 600;
        text-align: center;
      }
      .unSelectedBrandStyle{
        background: #EEEEEE;
        opacity: 0.99;
        color: #777777;
        font-size: 14px;
        text-align: center;
      }
      span{
        padding: 10px 17px;
      }
      .selectedSpan{
        border-bottom: 2px solid #0A87F8;
      }
    }
    .bindAccount-box{
      padding: 0 20px;
      .title{
        font-size: 16px;
        font-weight: 500;
        color:#111111;
      }
      .account-type {
        margin-top: 15px;
        .clickStyle{
          border: 1px solid #0A87F8;
          background:rgba(245,250,255,1);
          box-shadow:0px 2px 8px 0px rgba(2,19,34,0.1);
          border-radius:5px;
        }
        .unClickStyle{
          border: #DDD solid 1px;
          background:rgba(255,255,255,1);
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
          border-radius:8px;
        }
        .triangle-top-right-choose {
          position: absolute;
          color: #FFFFFF;
          top: 4px;
          right: 4px;
          font-size: 16px;
        }
        .triangle-top-right-click {
          position: absolute;
          width: 0;
          border: 21px solid #0A87F8;
          border-bottom: 21px solid transparent;
          border-left: 21px solid transparent;
          border-top-right-radius: 6px;
          top: 0px;
          right: 0px;
        }
        .account-type-yunting {
          float: left;
          text-align: left;
          width: 230px;
          height: 66px;
          margin-right: 20px;
          border-radius: 8px;
          position: relative;
        }
        .account-type-guojia {
          float: left;
          text-align: left;
          width: 230px;
          height: 66px;
          border-radius: 8px;
          position: relative;
        }
        .account-type-font1{
          color: #111111;
          font-size: 16px;
          margin: 10px 0 0 10px;
        }
        .account-type-font2{
          color: #777777;
          font-size: 13px;
          margin: 4px 0 0 10px;
        }
      }
      .warning{
        margin-top: 12px;
        width: 480px;
        height: 30px;
        background:rgba(255,160,54,0.1);
        border-radius:4px;
        line-height: 30px;
        color: #FFA036;
        font-size: 13px;
        i{
          vertical-align: -0.15em;
        }
      }
      .content{
        margin-top: 14px;
      }
      .account-type-other{
        height: 443px;
        .account-type-other1{
          padding-top: 90px;
          text-align: center;
          img{
            width: 130px;
            height: 122px;
          }
        }
      }
      .buttonDiv {
        margin: 67px 0 20px 0;
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