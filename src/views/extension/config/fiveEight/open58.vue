<template>
  <!-- 开通58租房 -->
  <div class="open58-box">
    <div class="title">账号信息</div>
    <div style="margin-top: 10px;">
      <label-item style="position: relative;" class="u-bottom-border" title="clientId" :must-fill="true" :maxSize="50" :valLength="addForm.clientId.length">
        <a-input v-model="addForm.clientId" placeholder="请输入" maxlength="50"></a-input>
        <div class="exclamationStyle cursor" style="position: absolute;font-size: 12px;color: #0a87f8;top:4px;left:42px;" @click="openUrl()">
          <a-icon type="exclamation-circle" style="margin:0 4px 0 10px;font-size: 10.5px;" />点击查看获取clientId流程
        </div>
      </label-item>
    </div>
    <div style="margin-top: 20px;">
      <label-item style="position: relative;" class="u-bottom-border" title="clientSecret(秘钥)" :must-fill="true" :maxSize="50" :valLength="addForm.clientSecret.length">
        <a-input v-model="addForm.clientSecret" placeholder="请输入" maxlength="50"></a-input>
        <div class="exclamationStyle cursor" style="position: absolute;font-size: 12px;color: #0a87f8;top:4px;left:98px;" @click="openUrl()">
          <a-icon type="exclamation-circle" style="margin:0 4px 0 10px;font-size: 10.5px;" />点击查看获取clientSecret(密钥)流程
        </div>
      </label-item>
    </div>
    <div style="margin-top: 20px;">
      <label-item class="u-bottom-border" title="账号所属城市" :must-fill="true">
        <a-select v-model="addForm.cityId"  @change="selectCity" style="width: 100%" placeholder="请选择">
          <a-select-option :value="item.id" :key="item.id" v-for="(item) in cityList">{{ item.name }}</a-select-option>
        </a-select>
      </label-item>
    </div>
    <div class="clearfix" style="width: 100%;margin-top:100px;">
      <div class="f-fl cursor" style="height: 40px;line-height: 40px;color: #0a87f8;" @click="OpenGuidance58Dialog=true;">
        查看开通流程<icon-font type="iconyumengtubiao_zhishi"/>
      </div>
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelOpen">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmOpen">
          确定开通
        </a-button>
      </div>
    </div>
    <!-- 58租房开通流程文档 -->
    <a-modal centered v-model="OpenGuidance58Dialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 20px 20px 20px'}" @cancel="OpenGuidance58Dialog=false" width="1000px">
      <open-guidance58 @closeThis="OpenGuidance58Dialog=false"></open-guidance58>
    </a-modal>
  </div>
</template>

<script>
import {getCityList} from "@/api/public";
import * as API from '@/api/extension';
import OpenGuidance58 from './openGuidance58';

export default {
  name: "open58",
  components: {
    OpenGuidance58,
  },
  data() {
    return {
      addForm:{
        cityId:undefined,
        cityName:'',
        clientId:'',
        clientSecret:'',
      },
      saveLoading:false,
      cityList:[],
      OpenGuidance58Dialog:false,
    }
  },
  created() {
    this.getCity();
  },
  methods:{
    openUrl() {
      window.open('https://hugopenapi.58.com/openapi?qnumber=esf_openapi_authorization_code#/faq?documentId=5ef85654e15f880152ed1208');
    },
    selectCity(val){
      this.addForm.cityId = val;
      this.cityList.forEach((item)=>{
        if(item.id == val){
          this.addForm.cityName = item.name;
        }
      });
    },
    getCity(){
      getCityList().then(res=>{
        this.cityList = res.data;
      })
    },
    cancelOpen(){
      this.$emit('cancelOpen');
    },
    confirmOpen(){
      if(!this.addForm.clientId){
        this.$message.warning('请输入clientId');
        return ;
      }
      if(!this.addForm.clientSecret){
        this.$message.warning('请输入clientSecret(秘钥)');
        return ;
      }
      if(!this.addForm.cityId){
        this.$message.warning('请输入账号所属城市');
        return ;
      }
      this.saveLoading = true;
      API.wubaAdd(this.addForm).then(res => {
        if(!res){
          this.saveLoading = false;
        }
        if (res.code == 200) {
          this.$message.success('开通成功');
          this.saveLoading = false;
          this.$emit('openSuccess');
        }
        else{
          this.$message.error('开通失败');
          this.saveLoading = false;
        }
      });
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
  .open58-box{
    padding: 19px 20px 20px;
    .title{
      font-size: 16px;
      color: #111111;
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
    /deep/ .label-item .ant-select-selection__rendered{
      margin-left: 0px;
    }
    .exclamationStyle{
      i{
        vertical-align: -0.1em;
      }
    }
  }
</style>