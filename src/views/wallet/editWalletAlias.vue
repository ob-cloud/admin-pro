<template>
  <div class="editWalletAlias-box">
    <div class="line1"><span class="fontStyle1">当前钱包名称：</span><span class="fontStyle2">{{accountName}}</span></div>
    <div class="line2">
      <label-item class="u-bottom-border" title="新钱包名称" :must-fill="true" :maxSize="15" :valLength="newAliasName.length">
          <a-input placeholder="请输入新钱包名称" v-model="newAliasName"></a-input>
      </label-item>
    </div>
    <div class="clearfix" style="width: 100%;padding:140px 20px 20px 0;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="editWalletAlias">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {modifyAlias} from "@/api/wallet";

export default {
  name: "editWalletAlis",
  components: {
  },
  props: {
    accountId:{
      type:String,
    },
    accountName:{
      type:String,
    },
  },
  data() {
    return {
      saveLoading:false,
      newAliasName:'',
    }
  },
  created() {

  },
  methods: {
    cancelSave(){
      this.$emit('cancelSave');
    },
    editWalletAlias(){
      if(!this.newAliasName){
        this.$message.warning('请输入新钱包名称');
        return ;
      }
      this.saveLoading = true;
      let paramter = {
        id:this.accountId,
        alias:this.newAliasName,
      };
      modifyAlias(paramter).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.info('钱包名称修改成功');
          this.saveLoading = false;
          this.$emit('editSuccess',this.newAliasName);
        }
        else{
          this.$message.error('钱包名称修改失败');
          this.saveLoading = false;
        }
      });
    },
  },
}
</script>

<style scoped lang="less">
.editWalletAlias-box{
  .line1{
    height: 50px;
    line-height: 50px;
    background: #E7F1FF;
    padding-left: 20px;
    .fontStyle1{
      font-size: 15px;
      color: #777777;
    }
    .fontStyle2{
      color: #111111;
      font-size: 15px;
    }
  }
  .line2{
    margin-top: 24px;
    padding: 0 20px;
    /deep/ .label-item .title{
      font-size: 16px;
      color: #111111;
    }
    /deep/ .ant-input{
      color: #111111;
    }
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