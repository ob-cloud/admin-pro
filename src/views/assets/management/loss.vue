<template>
  <div class="loss-box">
    <div class="headStyle">
      <div style="width: 150px;"><span class="color1">物品：</span><span class="color2">{{record.goodsName}}</span></div>
      <div class="item"><span class="color1">数量：</span><span class="color2">{{record.quantity}}</span></div>
    </div>
    <div class="contentStyle u-bottom-border">
      确定要将<a-input style="width: 80px;" v-model="quantity" v-validate="'naturalNum|min(1)'" placeholder="请输入"></a-input>个“{{record.goodsName}}”标记为 「遗失」状态吗？
    </div>
    <div class="clearfix" style="width: 100%;padding:153px 20px 20px 20px;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmLoss">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/assets";

export default {
  name: "loss",
  components: {
  },
  props: {
    record:{
      type:Object,
    }
  },
  data() {
    return {
      saveLoading:false,
      quantity:0,
    }
  },
  created() {
    this.quantity = this.record.quantity;
  },
  mounted() {
  },
  methods: {
    cancelSave(){
      this.$emit('cancelSave');
    },
    confirmLoss(){
      if(!this.quantity){
        this.$message.warning('请输入物品遗失数量');
        return ;
      }
      let parameter = {
        id : this.record.id,
        quantity : this.quantity,
      };
      this.saveLoading = true;
      API.assetsLost(parameter).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.success('遗失操作成功');
          this.saveLoading = false;
          this.$emit('lossSuccess');
        }
        else{
          this.$message.error('遗失操作失败');
          this.saveLoading = false;
        }
      });
    },
  },
}
</script>

<style scoped lang="less">
  .loss-box{
    .headStyle{
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      background: #E7F1FF;
      padding: 0 20px;
      display: flex;
      .color1{
        color: #777777;
      }
      .color2{
        color: #111111;
      }
      .item{
        flex: 1;
      }
    }
    .contentStyle{
      padding-left: 20px;
      height: 32px;
      line-height: 32px;
      color: #111111;
      font-size: 16px;
      margin-top: 35px;
      /deep/ .ant-input{
        padding: 0;
        text-align: center;
        color: #0A87F8;
        font-size: 16px;
        font-weight: 500;
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