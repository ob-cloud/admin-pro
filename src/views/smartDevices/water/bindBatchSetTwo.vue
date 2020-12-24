<template>
  <div class="bindBatchSetOne-box">
    <div style="position: relative;">
      <label-item class="u-bottom-border" title="水费单价" :mustFill="true">
        <a-input placeholder="请输入" v-model="unitPriceValue" v-validate="'money|max(99.99)'"></a-input>
      </label-item>
      <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元/m³</div>
    </div>
    <div class="clearfix" style="width: 100%;padding-top: 80px;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSet">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="batchSetPrice">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bindBatchSetOne",
  components: {
  },
  props: {
    batchSetTwoObj:{
      type:Object,
    }
  },
  data() {
    return {
      unitPriceValue:''
    }
  },
  created() {
    if(this.batchSetTwoObj&&this.batchSetTwoObj.unitPrice){
      this.unitPriceValue = this.batchSetTwoObj.unitPrice
    }
  },
  methods: {
    cancelSet(){
      this.$emit('cancelSet');
    },
    batchSetPrice(){
      if(!this.unitPriceValue){
        this.$message.warning('请选择电费单价');
        return ;
      }
      let obj = {
        unitPrice:this.unitPriceValue,
      }
      this.$emit('setSuccess',obj);
    },
  }
}
</script>

<style scoped lang="less">
  .bindBatchSetOne-box{
    padding: 20px;
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