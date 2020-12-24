<template>
  <!-- 开通贝壳 -->
  <div class="openBk-box">
    <div>
      <label-item class="u-bottom-border" title="贝壳广厦平台账号" :must-fill="true" :maxSize="25" :valLength="addForm.clientId.length">
        <a-input v-model="addForm.clientId" placeholder="请输入" maxlength="25"></a-input>
      </label-item>
    </div>
    <div style="margin-top: 20px;">
      <label-item class="u-bottom-border" title="贝壳广厦平台账号密码" :must-fill="true" :maxSize="30" :valLength="addForm.clientSecret.length">
        <a-input v-model="addForm.clientSecret" placeholder="请输入" maxlength="30"></a-input>
      </label-item>
    </div>
    <div style="margin-top: 20px;">
      <label-item class="u-bottom-border" title="appId" :must-fill="true" :maxSize="30" :valLength="addForm.clientAppid.length">
        <a-input v-model="addForm.clientAppid" placeholder="请输入" maxlength="30"></a-input>
      </label-item>
    </div>
    <div style="margin-top: 20px;">
      <label-item class="u-bottom-border" title="appKey" :must-fill="true" :maxSize="30" :valLength="addForm.clientKey.length">
        <a-input v-model="addForm.clientKey" placeholder="请输入" maxlength="30"></a-input>
      </label-item>
    </div>
    <div class="clearfix" style="width: 100%;margin-top:100px;">
      <div class="f-fl cursor" style="height: 40px;line-height: 40px;color: #0a87f8;" @click="OpenGuidanceBkDialog=true;">
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
    <!-- 贝壳开通流程文档 -->
    <a-modal centered v-model="OpenGuidanceBkDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 20px 20px 20px'}" @cancel="OpenGuidanceBkDialog=false" width="1000px">
      <open-guidance-bk @closeThis="OpenGuidanceBkDialog=false"></open-guidance-bk>
    </a-modal>
  </div>
</template>

<script>
import * as API from '@/api/extension';
import OpenGuidanceBk from './openGuidanceBk';

export default {
  name: "open58",
  components: {
    OpenGuidanceBk,
  },
  data() {
    return {
      addForm:{
        clientId:'',
        clientSecret:'',
        clientAppid:'',
        clientKey:'',
      },
      saveLoading:false,
      cityList:[],
      OpenGuidanceBkDialog:false,
    }
  },
  created() {
  },
  methods:{
    cancelOpen(){
      this.$emit('cancelOpen');
    },
    confirmOpen(){
      if(!this.addForm.clientId){
        this.$message.warning('请输入贝壳广厦平台账号');
        return ;
      }
      if(!this.addForm.clientSecret){
        this.$message.warning('请输入贝壳广厦平台账号密码');
        return ;
      }
      if(!this.addForm.clientAppid){
        this.$message.warning('请输入appid');
        return ;
      }
      if(!this.addForm.clientKey){
        this.$message.warning('请输入appKey');
        return ;
      }
      this.saveLoading = true;
      API.shellAdd(this.addForm).then(res => {
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
  .openBk-box{
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