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
      <div class="margin-top10">
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
        <label-item class="u-bottom-border" title="付费模式" :mustFill="true">
          <div class="clearfix" style="margin-top: 15px;padding-bottom: 5px;border-bottom: 1px solid #E8E8E8;">
            <div class="f-fl">
              <div class="checked allCheck clearfix" v-if="sendData.paymentMode==1">
                <div class="f-fl" style="margin-right: 5px;"><icon-font type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">预付费</div>
              </div>
              <div class="allCheck clearfix cursor" v-if="sendData.paymentMode==2" @click="sendData.paymentMode=1">
                <div class="f-fl" style="margin-right: 5px;"><icon-font type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">预付费</div>
              </div>
            </div>
            <div class="f-fl marginLeft30">
              <div class="checked allCheck clearfix" v-if="sendData.paymentMode==2">
                <div class="f-fl" style="margin-right: 5px;"><icon-font type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">后付费</div>
              </div>
              <div class="allCheck clearfix cursor" v-if="sendData.paymentMode==1" @click="sendData.paymentMode=2">
                <div class="f-fl" style="margin-right: 5px;"><icon-font type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">后付费</div>
              </div>
            </div>
          </div>
        </label-item>
      </div>
      <div style="margin-top: 20px;position: relative;" v-if="sendData.paymentMode==1">
        <label-item class="u-bottom-border" title="透支额度" :mustFill="true">
          <a-input placeholder="最多可输入 1 - 9999" v-model="sendData.overdraft" v-validate="'naturalNum|min(1)|max(9999)'"></a-input>
        </label-item>
        <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">m³</div>
      </div>
      <div style="color: #FFA036;font-size: 12px;margin-top: 10px;" v-if="sendData.paymentMode==1">
        <a-icon style="margin-right: 5px;" type="exclamation-circle" />切换为预付费模式时，如果电表存在欠费，且欠费金额超过透支额度，会立刻跳闸断电
      </div>
      <div class="clearfix" style="width: 100%;" :style="sendData.paymentMode==1?'padding-top:74px;':'padding-top:200px;'">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSet">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="setPaymentMode">
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
        overdraft:'',
        paymentMode:2,
        waterMeterIdList:[],
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
    setPaymentMode(){
      if(!this.sendData.overdraft&&this.sendData.paymentMode==1){
        this.$message.warning('请设置透支额度');
        return ;
      }
      this.sendData.waterMeterIdList = [];
      this.sendData.waterMeterIdList.push(this.waterId);
      this.saveLoading = true;
      API.waterMeterPaymentModeSet(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.info('付费模式设置成功');
          this.saveLoading = false;
          this.$emit('setSuccess');
        }
        else{
          this.$message.error('付费模式设置失败');
          this.saveLoading = false;
        }
      });
    },
    viewWater(){
      API.waterMeterView({id:this.waterId}).then(res => {
        if(res.code === '200'){
          this.waterData = res.data;
          //初始化付费模式及透支额度
          if(this.waterData.paymentMode){
            this.sendData.paymentMode = this.waterData.paymentMode;
          }
          if(this.waterData.overdraft){
            this.sendData.overdraft = this.waterData.overdraft;
          }
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
      }
      .marginLeft30{
        margin-left: 30px;
      }
      .checked{
        svg{
          color: #0a87f8;
        }
      }
      .fontStyle{
        font-size: 14px;
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
    }
  }
</style>