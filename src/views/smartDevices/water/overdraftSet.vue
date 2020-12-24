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
        <div class="item item-content">{{waterData.unitPrice?waterData.unitPrice+'元/度':''}}</div>
      </div>
      <div class="margin-top10">
        <div class="item width1">已绑房间：</div>
        <div class="item item-content">{{waterData.houseAlias?waterData.houseAlias+' / ':''}}{{waterData.cityName|blankVal}}{{waterData.areaName|blankVal}}{{waterData.fullAddress|blankVal}}</div>
      </div>
    </div>
    <div class="detail">
      <div style="position: relative;">
        <label-item class="u-bottom-border" title="透支额度" :mustFill="true">
          <a-input placeholder="最多可输入 1 - 9999" v-model="sendData.overdraft" v-validate="'naturalNum|min(1)|max(9999)'"></a-input>
        </label-item>
        <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">m³</div>
      </div>
      <div style="margin-top: 20px;">
        <label-item class="u-bottom-border" title="备注" :maxSize="100" :valLength="sendData.comment.length">
          <a-textarea autosize v-model="sendData.comment" maxlength="100" placeholder="请输入">
          </a-textarea>
        </label-item>
      </div>
      <div style="color: #FFA036;font-size: 13px;margin-top: 12px;">
        <a-icon style="margin-right: 5px;" type="exclamation-circle" />此房间下其他水表都将设置为统一的透支额度
      </div>
      <div class="clearfix" style="width: 100%;padding-top: 50px;">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSet">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="setOverdraft">
            保存
          </a-button>
        </div>
      </div>
    </div>
    <!-- 操作结果 -->
    <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="loadingDialog" class="ownModalBorder" title="">
      <water-loading :resultData="resultData" resultDesc="设置中，请稍后…" @setFailure="setFailure" @setSuccess="setSuccess"></water-loading>
    </a-modal>
  </div>
</template>

<script>
import * as API from "@/api/smartDevices";
import WaterLoading from './waterLoading';

export default {
  name: "unitPriceSet",
  components: {
    WaterLoading,
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
        comment:'',
        waterMeterId:''
      },
      saveLoading:false,
      resultData:{},
      loadingDialog:false,
      resultType:5,
    }
  },
  created() {
    this.sendData.waterMeterId = this.waterId;
    this.viewWater();
  },
  methods: {
    setFailure(){
      this.loadingDialog = false;
      this.$message.error('透支额度设置失败');
      this.$emit('setFailure');
    },
    setSuccess(){
      this.loadingDialog = false;
      this.$message.success('透支额度设置成功');
      this.$emit('setSuccess');
    },
    cancelSet(){
      this.$emit('cancelSet');
    },
    setOverdraft(){
      if(!this.sendData.overdraft){
        this.$message.warning('请设置透支额度');
        return ;
      }
      this.saveLoading = true;
      API.waterMeterOverdraftSet(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
          this.loadingDialog = true;
          this.resultData = res.data;
        }
        else{
          this.$message.error('透支额度设置失败');
          this.saveLoading = false;
        }
      });
    },
    viewWater(){
      API.electricMeterView({id:this.waterId}).then(res => {
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