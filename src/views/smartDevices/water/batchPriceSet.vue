<template>
  <div class="batchPriceSet-box">
    <div class="headInfo">
      已选择<span v-if="coldWaterCheckedCount"><span style="color: #0A87F8"> {{coldWaterCheckedCount}} </span>个冷水表</span>{{coldWaterCheckedCount>0&&hoteWaterCheckedCount>0?'，':''}}
      <span v-if="hoteWaterCheckedCount"><span style="color: #0A87F8"> {{hoteWaterCheckedCount}} </span>个热水表</span>
    </div>
    <div class="detail">
      <div style="position: relative;">
        <label-item class="u-bottom-border" title="新水费单价" :mustFill="true">
          <a-input placeholder="最多可输入 0.01 - 99.99" v-model="sendData.unitPrice" v-validate="'money|max(99.99)'"></a-input>
        </label-item>
        <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元/m³</div>
      </div>
      <div style="margin-top: 20px;">
        <label-item class="u-bottom-border" title="备注" :maxSize="100" :valLength="sendData.comment.length">
          <a-textarea autosize v-model="sendData.comment" maxlength="100" placeholder="请输入">
          </a-textarea>
        </label-item>
      </div>
      <div style="color: #FFA036;font-size: 13px;margin-top: 12px;">
        <a-icon style="margin-right: 5px;" type="exclamation-circle" />设置新水费单价后，新抄表产生的水费将按照新的水费单价计算
      </div>
      <div class="clearfix" style="width: 100%;padding-top: 50px;">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSet">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="batchSetPrice">
            保存
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/smartDevices";
export default {
  name: "batchPriceSet",
  components: {
  },
  props: {
    selectedRowKeys:{
      type:Array,
      required:true,
    },
    coldWaterCheckedCount:{
      type:Number,
    },
    hoteWaterCheckedCount:{
      type:Number,
    },
  },
  data() {
    return {
      saveLoading:false,
      sendData:{
        unitPrice:'',
        comment:'',
        waterMeterIdList:[],
      },
    }
  },
  created() {

  },
  methods: {
    cancelSet(){
      this.$emit('cancelSet');
    },
    batchSetPrice(){
      if(!this.sendData.unitPrice){
        this.$message.warning('请设置新电费单价');
        return ;
      }
      this.sendData.waterMeterIdList = [];
      this.sendData.waterMeterIdList = this.selectedRowKeys;
      this.saveLoading = true;
      API.waterMeterUnitPriceset(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
          this.$message.success('新水费单价批量设置成功');
          this.$emit('setSuccess');
        }
        else{
          this.$message.error('新水费单价批量设置失败');
          this.saveLoading = false;
        }
      });
    },
  },
  filters: {

  }
}
</script>

<style scoped lang="less">
.batchPriceSet-box{
  .margin-top10{
    margin-top: 10px;
  }
  .headInfo{
    background: #F5F7FE;
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    font-size: 14px;
    color: #777777;
  }
  .detail{
    padding: 20px;
    /deep/ .label-item .title {
      color: #111111;
      font-size: 16px;
      font-weight: 500;
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
}
</style>