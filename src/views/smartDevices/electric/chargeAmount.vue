<template>
  <div class="chargeAmount-box">
    <div class="headInfo margin-top10">
      <div class="clearfix" style="padding-bottom: 12px;border-bottom: 1px solid #E8E8E8;">
        <div class="roomIcon f-fl" >
          <img style="width: 24px;height: 24px;" src="../../../assets/smartDevice/room.png" >
        </div>
        <div class="f-fl">
          <div class="doorplateStyle">{{electricData.doorplate}} - {{electricData.name}}</div>
          <div class="fullAddressStyle">{{electricData.fullAddress}}</div>
        </div>
      </div>
      <div class="margin-top10">
        <div class="item width1">设备序列号：</div>
        <div class="item item-content">{{electricData.sn|blankVal}}</div>
      </div>
      <div class="margin-top10">
        <div class="item width1">电费单价：</div>
        <div class="item item-content">{{electricData.unitPrice|blankVal}} 元/度</div>
      </div>
      <div class="margin-top10">
        <div class="item width1">剩余电量：</div>
        <div class="item item-content">{{ (electricData.totalCharge-electricData.powerUsed).toFixed(2)}} 度</div>
      </div>
    </div>
    <div class="detail">
      <div class="chargeTypeStyle">
        <label-item class="u-bottom-border" title="充值电量" :mustFill="true">
          <div class="clearfix" style="margin-top: 6px;">
            <div class="f-fl clearfix" style="border-bottom: 1px solid #dddddd;width: 200px;">
              <div class="f-fl chargeTypeStyleCom chargeTypeStyle1 cursor" :class="chargeType==1?'clickType':'unClickStyle'" @click="getValue(1)">按金额充</div>
              <div class="f-fl chargeTypeStyleCom chargeTypeStyle2 cursor" :class="chargeType==2?'clickType':'unClickStyle'" @click="getValue(2)">按电量充</div>
              <div class="f-fl splitStyle"></div>
            </div>
            <a-input class="f-fl" style="width: calc(100% - 200px);height: 39px;" placeholder="请输入" v-model="amount" @change="getChargeCalc()" v-validate="'area|min(0.01)|max(9999)'"></a-input>
          </div>
        </label-item>
        <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 39px;">{{chargeType==2?'度':'元'}}</div>
        <div style="position: absolute;right: 0px;bottom: 25px;color: #777777;font-size: 14px;">
          <span>{{chargeType==2?'充值金额为：':'充值电量为：'}}</span><span style="color: #0A87F8;font-weight: 500;">{{amount_other.toFixed(2)}} </span><span>{{chargeType==2?'元':'度'}}</span>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <label-item class="u-bottom-border" title="备注" :maxSize="100" :valLength="sendData.comment.length">
          <a-textarea autosize v-model="sendData.comment" maxlength="100" placeholder="请输入">
          </a-textarea>
        </label-item>
      </div>
      <div class="clearfix" style="width: 100%;padding-top: 50px;">
        <div class="iconStyle f-fl">
          <a-checkbox v-model="isGenBill">生成账单</a-checkbox>
        </div>
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSet">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="setChargeAmount">
            保存
          </a-button>
        </div>
      </div>
    </div>
    <!-- 操作结果 -->
    <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="loadingDialog" class="ownModalBorder" title="">
      <electric-loading :resultData="resultData" resultDesc="正在充值，请稍后···" @setFailure="setFailure" @setSuccess="setSuccess"></electric-loading>
    </a-modal>
    <!-- 生成账单 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="genBillDialog" class="ownModalBorder titDialog" title="生成账单">
      <gen-bill :houseObj="houseObj" :chargeAmountData="sendData" @cancelGen="cancelGen" @setSuccess="genSuccess"></gen-bill>
    </a-modal>
  </div>
</template>

<script>
import ElectricLoading from './electricLoading';
import GenBill from './genBill';
import * as API from "@/api/smartDevices";

export default {
  name: "chargeAmount",
  components: {
    GenBill,
    ElectricLoading,
  },
  props: {
    electricMeterId:{
      type:String,
      required:true,
    }
  },
  data() {
    return {
      chargeType:1,     //1、按金额充；2、按电量充
      amount:'',
      amount_other:0.00,
      isGenBill:false,
      electricData:{},
      sendData:{
        chargeAmount:'',
        comment:'',
        electricFeeBill:{},
        electricMeterId:'',
        feeAmount:'',
        isGenBill:0,
      },
      saveLoading:false,
      resultData:{},
      resultType:1,
      loadingDialog:false,
      genBillDialog:false,
      houseObj:{
        fullAddress:'',
        houseAlias:'',
        houseId:'',
        feeAmount:'',
        renterName:'',
        renterPhone:'',
        renterPaymentType:'',
        renterPaymentNo:'',
        renterBank:'',
      },
    }
  },
  created() {
    this.viewElectric();
  },
  methods: {
    genSuccess(){
      this.genBillDialog = false;
      this.$emit('genSuccess');
    },
    cancelGen(){
      this.genBillDialog = false;
    },
    setFailure(){
      this.loadingDialog = false;
      this.$message.error('充值失败');
    },
    setSuccess(){
      this.$message.success('充值成功');
      this.$emit('chargeAmountSuccess');
    },
    getValue(val){
      if(this.chargeType == val){
        return ;
      }
      this.chargeType = val;
      this.getChargeCalc();
    },
    getChargeCalc(){
      let parameter = {
        amount:this.amount,
        chargeType:this.chargeType,
        electricMeterId:this.electricMeterId,
      }
      API.getChargeCalc(parameter).then(res => {
        if(res.code === '200'){
          this.amount_other = res.data;
        }
      });
    },
    setChargeAmount(){
      if(!this.amount){
        this.$message.warning('请输入充值量');
        return ;
      }
      if(this.isGenBill){
        if(this.chargeType==1){
          this.sendData.chargeAmount = this.amount_other;
          this.sendData.feeAmount = this.amount;
        }
        if(this.chargeType==2){
          this.sendData.chargeAmount = this.amount;
          this.sendData.feeAmount = this.amount_other;
        }
        if(this.isGenBill){
          this.sendData.isGenBill = 1;
        }
        else{
          this.sendData.isGenBill = 0;
        }
        this.sendData.electricMeterId = this.electricMeterId;
        this.houseObj.feeAmount = this.sendData.feeAmount;
        this.genBillDialog = true;
      }
      else {
        //不生成账单
        this.sendData.electricFeeBill = {};
        if(this.chargeType==1){
          this.sendData.chargeAmount = this.amount_other;
          this.sendData.feeAmount = this.amount;
        }
        if(this.chargeType==2){
          this.sendData.chargeAmount = this.amount;
          this.sendData.feeAmount = this.amount_other;
        }
        if(this.isGenBill){
          this.sendData.isGenBill = 1;
        }
        else{
          this.sendData.isGenBill = 0;
        }
        this.sendData.electricMeterId = this.electricMeterId;
        this.saveLoading = true;
        API.electricMeterChargeAmount(this.sendData).then(res => {
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            this.saveLoading = false;
            this.loadingDialog = true;
            this.resultData = res.data;
          }
          else{
            this.saveLoading = false;
          }
        });

      }
    },
    cancelSet(){
      this.$emit('cancelSet');
    },
    viewElectric(){
      API.electricMeterView({id:this.electricMeterId}).then(res => {
        if(res.code === '200'){
          this.electricData = res.data;
          this.houseObj.fullAddress = this.electricData.cityName+ this.electricData.areaName + this.electricData.fullAddress;
          this.houseObj.houseAlias = this.electricData.houseAlias;
          this.houseObj.houseId = this.electricData.houseId;
          this.houseObj.renterName = this.electricData.renterName;
          this.houseObj.renterPhone = this.electricData.renterPhone;
          this.houseObj.renterPaymentType = this.electricData.renterPaymentType;
          this.houseObj.renterPaymentNo = this.electricData.renterPaymentNo;
          this.houseObj.renterBank = this.electricData.renterBank;
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
  .chargeAmount-box{
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
      .roomIcon{
        width: 44px;
        height: 44px;
        background: #0A87F8;
        border-radius: 50%;
        margin-right: 15px;
        img {
          margin: 10px 0 0 10px;
        }
      }
      .doorplateStyle{
        color: #111111;
        font-size: 16px;
        font-weight: 500;
      }
      .fullAddressStyle{
        color: #999999;
        font-size: 14px;
      }
    }
    .detail{
      padding: 20px;
      /deep/ .label-item .title {
        color: #111111;
        font-size: 16px;
        font-weight: 500;
      }
      .chargeTypeStyle{
        position: relative;
        padding-bottom: 50px;
        border-bottom: 10px solid #F6F7F8;
        .chargeTypeStyleCom{
          width: 80px;
          height: 30px;
          line-height:30px;
          margin-bottom:8px;
          text-align:center;
          font-size: 14px;
        }
        .splitStyle{
          width: 20px;
          height: 24px;
          border-right: 1px solid #EEEEEE;
          margin-top: 3px;
        }
        .chargeTypeStyle1{
          border-radius: 17px 0px 0px 17px;
        }
        .chargeTypeStyle2{
          border-radius: 0px 17px 17px 0px;
        }
        .clickType{
          background: rgba(10, 135, 248, 0.1);
          color: #0A87F8;
          border: 1px solid rgba(10, 135, 248, 0.1);
        }
        .unClickStyle{
          background:#FFFFFF;
          color:#777777;
          border: 1px solid #EEEEEE;
        }
      }
      .iconStyle{
        height: 40px;
        line-height: 40px;
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
    /deep/ .ant-select-selection__rendered{
      margin-left: 0px;
    }
  }
</style>