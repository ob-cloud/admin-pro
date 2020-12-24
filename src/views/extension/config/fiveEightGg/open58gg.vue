<template>
  <!-- 开通58公馆 -->
  <div class="open58gg-box">
    <div>
      <label-item style="position: relative;" class="u-bottom-border" title="公寓ID" :must-fill="true" :maxSize="25" :valLength="addForm.clientId.length">
        <a-input v-model="addForm.clientId" placeholder="请输入" maxlength="25"></a-input>
        <div class="cursor" style="position: absolute;font-size: 12px;color: #0a87f8;top:4px;left:40px;" @click="OpenGuidance58ggGetIdDialog=true;">
          <a-icon type="exclamation-circle" style="margin:0 4px 0 10px;font-size: 10.5px;" />点击查看获取流程
        </div>
      </label-item>
    </div>
    <div style="margin-top: 20px;">
      <label-item style="position: relative;" class="u-bottom-border" title="Appid" :must-fill="true" :maxSize="35" :valLength="addForm.clientAppid.length">
        <a-input v-model="addForm.clientAppid" placeholder="请输入" maxlength="35"></a-input>
        <div class="cursor" style="position: absolute;font-size: 12px;color: #0a87f8;top:4px;left:35px;" @click="OpenGuidance58ggGetIdDialog=true;">
          <a-icon type="exclamation-circle" style="margin:0 4px 0 10px;font-size: 10.5px;" />点击查看获取流程
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
    <div style="margin-top: 20px;">
      <label-item style="position: relative;" class="u-bottom-border" title="私钥" :must-fill="true">
        <a-textarea v-model="addForm.clientKey" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" maxlength="1000"></a-textarea>
        <div style="position: absolute;font-size: 12px;color: #FFA036;top:4px;left:28px;">
          <a-icon type="exclamation-circle" style="margin:0 4px 0 10px;font-size: 10.5px;" />输入与上面填写的Appid生成时所填写的公钥相对应的私钥信息
        </div>
      </label-item>
    </div>
    <div class="clearfix" style="width: 100%;margin-top:100px;">
      <div class="f-fl cursor" style="height: 40px;line-height: 40px;color: #0a87f8;" @click="OpenGuidance58ggDialog=true;">
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
    <!-- 58公馆开通流程文档 -->
    <a-modal centered v-model="OpenGuidance58ggDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 20px 20px 20px'}" @cancel="OpenGuidance58ggDialog=false" width="1000px">
      <open-guidance58gg @closeThis="OpenGuidance58ggDialog=false"></open-guidance58gg>
    </a-modal>
    <!-- 58公馆获取ID/APPID流程文档 -->
    <a-modal centered v-model="OpenGuidance58ggGetIdDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 20px 20px 20px'}" @cancel="OpenGuidance58ggGetIdDialog=false" width="1000px">
      <open-guidance58gg-get-id @closeThis="OpenGuidance58ggGetIdDialog=false"></open-guidance58gg-get-id>
    </a-modal>
  </div>
</template>

<script>
import {getCityList} from "@/api/public";
import * as API from '@/api/extension';
import OpenGuidance58gg from './openGuidance58gg';
import OpenGuidance58ggGetId from './openGuidance58ggGetId';

export default {
  name: "open58",
  components: {
    OpenGuidance58gg,
    OpenGuidance58ggGetId,
  },
  data() {
    return {
      addForm:{
        cityId:undefined,
        cityName:'',
        clientId:'',
        clientAppid:'',
        clientKey:'',
      },
      saveLoading:false,
      cityList:[],
      OpenGuidance58ggDialog:false,
      OpenGuidance58ggGetIdDialog:false,
    }
  },
  created() {
    this.getCity();
  },
  methods:{
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
        this.$message.warning('请输入公寓ID');
        return ;
      }
      if(!this.addForm.clientAppid){
        this.$message.warning('请输入Appid');
        return ;
      }
      if(!this.addForm.cityId){
        this.$message.warning('请输入账号所属城市');
        return ;
      }
      if(!this.addForm.clientKey){
        this.$message.warning('请输入私钥');
        return ;
      }
      this.saveLoading = true;
      API.wubaFlatsAdd(this.addForm).then(res => {
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
  .open58gg-box{
    padding: 9px 20px 20px;
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
    /deep/ .label-item{
      i{
        vertical-align: -0.1em;
      }
    }
    /deep/ .label-item textarea.ant-input{
      padding: 4px 0;
    }
  }
</style>