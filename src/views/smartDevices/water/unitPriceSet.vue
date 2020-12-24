<template>
  <div class="unitPriceSet-box">
    <div class="headInfo margin-top10">
      <div>
        <div class="item width1">表名称：</div>
        <div class="item item-content">{{waterData.name|blankVal}}</div>
      </div>
      <div class="margin-top10">
        <div class="item width1">表序列号：</div>
        <div class="item item-content">{{waterData.sn|blankVal}}</div>
      </div>
      <div class="margin-top10">
        <div class="item width1">付费模式：</div>
        <div class="item item-content">{{waterData.paymentModeName|blankVal}}</div>
      </div>
      <div class="margin-top10">
        <div class="item width1">现透支额度：</div>
        <div class="item item-content">{{waterData.overdraft|blankVal}}</div>
      </div>
      <div class="margin-top10" style="position: relative">
        <div class="item width1">水费单价：</div>
        <div class="item item-content">{{waterData.unitPrice?waterData.unitPrice+'元/m³':''}}</div>
      </div>
      <div class="margin-top10">
        <div class="item width1">已绑房间：</div>
        <div class="item item-content">{{waterData.houseAlias?waterData.houseAlias+' / ':''}}{{waterData.cityName|blankVal}}{{waterData.areaName|blankVal}}{{waterData.fullAddress|blankVal}}</div>
      </div>
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
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="setPrice">
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
  name: "unitPriceSet",
  components: {

  },
  props: {
    waterId:{
      type:String,
      required:true,
    }
  },
  data() {
    return {
      waterData:{},
      sendData:{
        unitPrice:'',
        comment:'',
        electricMeterIdList:[],
      },
      saveLoading:false,
    }
  },
  created() {
    this.viewWater();
  },
  methods: {
    cancelSet(){
      this.$emit('cancelSet');
    },
    setPrice(){
      if(!this.sendData.unitPrice){
        this.$message.warning('请设置新水费单价');
        return ;
      }
      this.sendData.waterMeterIdList = [];
      this.sendData.waterMeterIdList.push(this.waterId);
      this.saveLoading = true;
      API.waterMeterUnitPriceset(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.info('新水费单价设置成功');
          this.saveLoading = false;
          this.$emit('setSuccess');
        }
        else{
          this.$message.error('新水费单价设置失败');
          this.saveLoading = false;
        }
      });
    },
    viewWater(){
      API.waterMeterView({id:this.waterId}).then(res => {
        if(res.code === '200'){
          this.waterData = res.data;
        }
      });
    },
  },
  filters: {
    blankVal(val){
      if(!val){
        return '-';
      }else{
        return  val;
      }
    },
  }
}
</script>

<style scoped lang="less">
  .unitPriceSet-box{
    .margin-top10{
      margin-top: 10px;
    }
    .headInfo{
      background: #F5F7FE;
      padding: 15px 20px;
      .item{
        font-size: 13px;
        display:inline-block;
      }
      .width1{
        width: 90px;
        color: #777777;
      }
      .item-content{
        color: #111111;
      }
    }
    .detail{
      padding: 20px;
      /deep/ .label-item .title {
        color: #111111;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 2px;
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