<template>
  <div class="genBill-box">
    <div class="head-info">
      已绑房间：{{houseAlias?houseAlias+' / ':''}}{{fullAddress?fullAddress:'-'}}
    </div>
    <div class="detail-info">
      <div class="detail-info-title" style="margin:20px 0 11px 0;">费用信息</div>
      <div class="basicsInfo">
        <div class="table">
          <div class="table-title">
            <div style="max-width: 205px;text-align: left;padding-left: 20px;border-radius: 4px 0px 0px 0px;">费用承担方<span style="color: #FB4246;font-size: 14px;margin-left: 2px;">*</span></div>
            <div style="max-width: 226px;text-align: left;padding-left: 20px;">费用类型<span style="color: #FB4246;font-size: 14px;margin-left: 2px;">*</span></div>
            <div style="max-width: 247px;text-align: left;padding-left: 20px;">费用金额<span style="color: #FB4246;font-size: 14px;margin-left: 2px;">*</span></div>
            <div style="max-width: 80px;text-align: center;border-radius: 0px 4px 0px 0px;" >已收(付)</div>
          </div>
          <div class="house-data">
            <div class="u-no-border" style="max-width: 205px;text-align: left;padding-left: 20px;border-radius: 0px 0px 0px 4px;">
              <a-select v-model="electricFeeBill.bizType" style="width: 120px;">
                <a-select-option :value="2">租客</a-select-option>
                <a-select-option :value="3">业主</a-select-option>
                <a-select-option :value="1">房源</a-select-option>
              </a-select>
            </div>
            <div class="u-no-border" style="max-width: 226px;text-align: left;padding-left: 20px;">
              <a-cascader class="myCascader" style="width: 180px;" placeholder="请选择" v-model="elcostcascaderIds" :options="costTabsContent" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value)"></a-cascader>
            </div>
            <div class="u-no-border" style="max-width: 247px;text-align: left;padding-left: 20px;">
              <a-input style="width: 140px;height: 38px;line-height: 38px;"  v-model="feeAmount" v-validate="'area'" placeholder="请输入费用金额" />
               元
            </div>
            <div style="max-width: 80px;text-align: center;border-radius: 0px 0px 4px 0px;">
              <a-checkbox v-model="isPaid"></a-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-info-title">付款信息</div>
      <div class="clearfix">
        <label-item class="u-bottom-border f-fl" title="付款人姓名" :mustFill="true" style="width: 167px;margin-right: 28px;">
          <a-input v-model="electricFeeBill.payerName" :maxlength="20" placeholder="请输入" />
        </label-item>
        <label-item class="u-bottom-border f-fl" title="付款人电话" :mustFill="true" style="width: 167px;margin-right: 28px;">
          <a-input v-model="electricFeeBill.payerPhone" :maxlength="11" @blur="checkPhone(electricFeeBill.payerPhone)" placeholder="请输入" />
        </label-item>
        <label-item class="u-bottom-border f-fl" title="付款账号">
          <div class="clearfix">
            <div class="f-fl" style="width: 74px">
              <a-select v-model="electricFeeBill.paymentAccountType" style="width: 74px">
                <a-select-option :value="1">银联</a-select-option>
                <a-select-option :value="2">支付宝</a-select-option>
                <a-select-option :value="3">微信</a-select-option>
              </a-select>
            </div>
            <div class="f-fl" v-if="electricFeeBill.paymentAccountType!=1" style="width: 291px">
              <a-input   v-model="electricFeeBill.paymentAccount" :maxlength="19" placeholder="请输入" />
            </div>
            <div class="f-fl clearfix" v-if="electricFeeBill.paymentAccountType == 1" style="width: 291px;position: relative;">
              <a-input class="f-fl" v-model="electricFeeBill.paymentAccount" @blur="addBankName" :maxlength="19" style="width:200px" placeholder="银行卡号" />
              <div class="dividerClass f-fl"></div>
              <a-input class="f-fl" v-model="electricFeeBill.bankName" :maxlength="19" style="width:91px;" placeholder="所属银行" />
            </div>
          </div>
        </label-item>
      </div>
      <div class="detail-info-title">账单信息</div>
      <div class="clearfix">
        <label-item class="f-fl" title="应收日期" :mustFill="true">
          <div class="u-bottom-border" style="width: 167px;margin-right: 30px;">
            <a-date-picker v-model="electricFeeBill.predictTime" :format="dateFormat" />
          </div>
        </label-item>
        <label-item class="f-fl" title="账单周期" :mustFill="true">
          <div class="u-bottom-border address">
            <a-range-picker v-model="timeDateList" :format="dateFormat" @change="onTimeChange" :allowClear="false" />
          </div>
        </label-item>
      </div>
      <div style="margin:18px 0 22px 0;">
        <label-item class="u-bottom-border textAreaStyle" style="width: 760px;" title="账单备注" :maxSize="500" :valLength="electricFeeBill.comment.length">
          <a-textarea v-model="electricFeeBill.comment" maxlength="500" autosize placeholder="请输入备注信息" />
        </label-item>
      </div>
      <div class="titlepz" style="margin-bottom: 10px;font-size: 12px;color: #666666;">
        账单附件
        <span style="color: #FFA036;">（附件支持格式：jpg、png、jpeg）</span>
      </div>
      <div>
        <own-upload :uploadParms="sendData" :showTips="false" ref="fileList">
        </own-upload>
      </div>
      <div class="detail-info-title" v-if="isPaid" style="margin-top: 20px;">支付详情</div>
      <div v-if="isPaid">
        <div class="clearfix">
          <label-item class="f-fl"  title="实收日期" :mustFill="true" style="width: 167px;margin-right: 28px;">
            <div class="u-bottom-border">
              <a-date-picker v-model="electricFeeBill.practicalTime" :format="dateFormat" />
            </div>
          </label-item>
          <label-item class="f-fl" title="支付途径" :mustFill="true" style="width: 167px;margin-right: 28px;">
            <div class="u-bottom-border">
              <a-select v-model="electricFeeBill.paymentMethod" style="width:100%" placeholder="请选择支付途径">
                <a-select-option v-for="(item,index) in payLists" :key="index" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </div>
          </label-item>
          <label-item class="f-fl" title="支付备注">
            <div class="u-bottom-border address">
              <a-input v-model="electricFeeBill.paymentNote" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" /></a-input>
            </div>
          </label-item>
        </div>
      </div>
      <div style="margin: 20px 0 10px 0;font-size: 12px;color: #666666;" v-if="isPaid">
        支付凭证
        <span style="color: #FFA036;">（附件支持格式：jpg、png、jpeg）</span>
      </div>
      <div v-if="isPaid">
        <own-upload :uploadParms="sendData1" :showTips="false" ref="voucherList">
        </own-upload>
      </div>
      <div class="clearfix" style="width: 100%;padding-top: 50px;">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelGen">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmGen">
            保存
          </a-button>
        </div>
      </div>
    </div>
    <!-- 操作结果 -->
    <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="loadingDialog" class="ownModalBorder" title="">
      <electric-loading :resultData="resultData" resultDesc="正在充值，请稍后···" @setFailure="setFailure" @setSuccess="setSuccess"></electric-loading>
    </a-modal>
  </div>
</template>

<script>
import ElectricLoading from './electricLoading';
import {getBankName} from "@/api/public";
import {dictionaryListDict, listEnableDict} from "@/api/contract";
import * as API from "@/api/smartDevices";

export default {
  name: "genBill",
  components: {
    ElectricLoading,
  },
  props: {
    readingObj:{
      type:Object,
    },
    houseObj:{
      type:Object,
    },
    chargeAmountData:{
      type:Object,
    },
  },
  data() {
    return{
      elcostcascaderIds:[],
      isPaid:false,
      dateFormat: 'YYYY.MM.DD',           //日期选择器格式
      sendData: {
        // 上传时附带的额外参数
        bizId: '', // 房源id
        bizType: 4, // 图片大类标识  收支
        subBizType: 1, // 图片子类标识 账单凭证
        orderIndex: 1 // 排序值
      },
      sendData1: {
        // 上传时附带的额外参数
        bizId: '', // 房源id
        bizType: 4, // 图片大类标识  收支
        subBizType: 2, // 图片子类标识 支付凭证
        orderIndex: 1 // 排序值
      },
      electricFeeBill:{
        payerName:'',
        payerPhone:'',
        paymentAccountType:1,
        paymentAccount:'',
        bankName:'',
        predictTime:null,
        beginTime:null,
        endTime:null,
        comment:'',
        isPaid:0,
        annexIdList:[],
        practicalTime:null,
        paymentMethod:undefined,
        paymentNote:'',
        voucherIdList:[],
        houseId:'',
        bizType:2,    //1、房源；2、租客；3、业主
        feeSubjectId:'',
        feeAmount:0,
      },
      timeDateList: [],
      payLists: [], //支付途径
      saveLoading:false,
      costTabsContent: [], // 费用类型
      elcostcascaderValue: {
        value: 'id',
        label: 'name',
        children: 'metaList'
      },
      resultData:{},
      loadingDialog:false,
      houseAlias:'',
      fullAddress:'',
      feeAmount:'',
      resultType:0,
    }
  },
  created() {
    if(this.houseObj){
      this.houseAlias = this.houseObj.houseAlias;
      this.fullAddress = this.houseObj.fullAddress;
      this.electricFeeBill.houseId = this.houseObj.houseId;
      this.feeAmount = this.houseObj.feeAmount;
      this.resultType = 1;
      if(this.houseObj.renterName){
        this.electricFeeBill.payerName = this.houseObj.renterName;
      }
      if(this.houseObj.renterPhone){
        this.electricFeeBill.payerPhone = this.houseObj.renterPhone;
      }
      if(this.houseObj.renterPaymentType){
        this.electricFeeBill.paymentAccountType = this.houseObj.renterPaymentType;
      }
      if(this.houseObj.renterPaymentNo){
        this.electricFeeBill.paymentAccount = this.houseObj.renterPaymentNo;
      }
      if(this.houseObj.renterBank){
        this.electricFeeBill.bankName = this.houseObj.renterBank;
      }
      this.electricFeeBill.predictTime = this.$moment(new Date().getTime());
    }
    if(this.readingObj){
      this.houseAlias = this.readingObj.houseAlias;
      this.fullAddress = this.readingObj.fullAddress;
      this.electricFeeBill.houseId = this.readingObj.houseId;
      this.feeAmount = this.readingObj.feeAmount;
      if(this.readingObj.renterName){
        this.electricFeeBill.payerName = this.readingObj.renterName;
      }
      if(this.readingObj.renterPhone){
        this.electricFeeBill.payerPhone = this.readingObj.renterPhone;
      }
      if(this.readingObj.renterPaymentType){
        this.electricFeeBill.paymentAccountType = this.readingObj.renterPaymentType;
      }
      if(this.readingObj.renterPaymentNo){
        this.electricFeeBill.paymentAccount = this.readingObj.renterPaymentNo;
      }
      if(this.readingObj.renterBank){
        this.electricFeeBill.bankName = this.readingObj.renterBank;
      }
      if(this.readingObj.readTime){
        this.electricFeeBill.predictTime = this.$moment(this.readingObj.readTime);
      }
      if(this.readingObj.readTime&&this.readingObj.lastReadTime){
        this.electricFeeBill.beginTime = this.$moment(this.readingObj.lastReadTime);
        this.electricFeeBill.endTime = this.$moment(this.readingObj.readTime);
        let timeDateList = [this.electricFeeBill.beginTime,this.electricFeeBill.endTime];
        this.timeDateList = timeDateList;
      }
    }
    this.getCost();
  },
  methods: {
    setFailure(){
      this.$message.error('账单生成失败');
      this.loadingDialog = false;
    },
    setSuccess(){
      this.$message.success('账单生成成功');
      this.loadingDialog = false;
      this.$emit('setSuccess');
    },
    checkData(){
      if(!this.electricFeeBill.bizType){
        this.$message.warning('请选择费用承担方');
        return  false;
      }
      if(!this.electricFeeBill.feeSubjectId){
        this.$message.warning('请选择费用类型');
        return  false;
      }
      if(!this.feeAmount){
        this.$message.warning('请输入费用金额');
        return  false;
      }
      if(!this.electricFeeBill.payerName){
        this.$message.warning('请输入付款人姓名');
        return  false;
      }
      if(!this.electricFeeBill.payerPhone){
        this.$message.warning('请输入付款人电话');
        return  false;
      }
      if(!this.electricFeeBill.predictTime){
        this.$message.warning('请选择应收日期');
        return  false;
      }
      if(!this.electricFeeBill.beginTime){
        this.$message.warning('请选择账单周期开始时间');
        return  false;
      }
      if(!this.electricFeeBill.endTime){
        this.$message.warning('请选择账单周期结束时间');
        return  false;
      }
      if(this.isPaid){
        //若是实收
        if(!this.electricFeeBill.practicalTime){
          this.$message.warning('请选择实收日期');
          return  false;
        }
        if(!this.electricFeeBill.paymentMethod){
          this.$message.warning('请选择支付途径');
          return  false;
        }
      }
      return true;
    },
    confirmGen(){
      //必填检验
      let checkDataResult = this.checkData();
      if(checkDataResult){
        //金额装换成分
        this.electricFeeBill.feeAmount =  Math.round(this.feeAmount * 100) ;
        if(this.houseObj){
          let paramter = Object.assign({},this.chargeAmountData);
          if(this.isPaid){
            this.electricFeeBill.isPaid = 1;
          }
          else{
            this.electricFeeBill.isPaid = 0;
          }
          let annexIdList = [];
          let fileList_temp = this.$refs.fileList.picsList;
          if (fileList_temp.length > 0) {
            fileList_temp.forEach((item)=>{
              annexIdList.push(item.id)
            })
          }
          this.electricFeeBill.annexIdList = annexIdList;
          if(this.$refs.voucherList){
            let voucherList = [];
            let voucherList_temp = this.$refs.voucherList.picsList;
            voucherList_temp.forEach((item)=>{
              voucherList.push(item.id)
            })
            this.electricFeeBill.voucherIdList = voucherList;
          }
          paramter.electricFeeBill = this.electricFeeBill;
          //附件
          this.saveLoading = true;
          API.electricMeterChargeAmount(paramter).then(res => {
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
        if(this.readingObj){
          let annexIdList = [];
          let fileList_temp = this.$refs.fileList.picsList;
          if (fileList_temp.length > 0) {
            fileList_temp.forEach((item)=>{
              annexIdList.push(item.id)
            })
          }
          this.electricFeeBill.annexIdList = annexIdList;
          if(this.$refs.voucherList){
            let voucherList = [];
            let voucherList_temp = this.$refs.voucherList.picsList;
            voucherList_temp.forEach((item)=>{
              voucherList.push(item.id)
            })
            this.electricFeeBill.voucherIdList = voucherList;
          }
          let paramter = Object.assign({},this.electricFeeBill);
          if(this.isPaid){
            paramter.isPaid = 1;
          }
          else{
            paramter.isPaid = 0;
          }
          paramter.houseId = this.readingObj.houseId;
          paramter.readRecordId = this.readingObj.readRecordId;
          //附件
          this.saveLoading = true;
          API.readRecordGenBill(paramter).then(res => {
            if(!res){
              this.saveLoading = false;
            }
            if(res.code === '200'){
              this.saveLoading = false;
              this.$message.success('账单生成成功');
              this.$emit('genBillSuccess');
            }
            else{
              this.$message.success('账单生成失败');
              this.saveLoading = false;
            }
          });
        }
      }
    },
    cancelGen(){
        this.$emit('cancelGen');
    },
    // 费用类型方法
    costSelect(value) {
      if (value[1]) {
        this.electricFeeBill.feeSubjectId = value[1];
      } else {
        this.electricFeeBill.feeSubjectId = value[0];
      }
    },
    getCost(){
      const params = 'FEESUBJECT';
      dictionaryListDict(params).then(res => {
        if (res.code === "200") {
          this.costTabsContent = res.data;
          //默认 能耗/电费
          this.costTabsContent.forEach((item)=>{
            if(item.name == '能耗'){
              this.elcostcascaderIds = [];
              this.elcostcascaderIds.push(item.id);
              item.metaList.forEach((temp)=>{
                if(temp.name == '电费'){
                  this.elcostcascaderIds.push(temp.id);
                  this.electricFeeBill.feeSubjectId = temp.id;
                }
              });
            }
          })
        }
      });
      listEnableDict('7bf14df972f64b94b7da8d3ff88ead18').then(res => {
        this.payLists = res.data;
      });
    },
    onTimeChange(date) {
      this.electricFeeBill.beginTime = date[0];
      this.electricFeeBill.endTime = date[1];
    },
    checkPhone(phone) {
      if(this.electricFeeBill.bizType ==1){
        if (!phone) {
          this.$message.error('请输入手机号');
          return true;
        }
        if (!/^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(phone)) {
          if (this.lastCheck) {
            this.lastCheck = false;
            this.$message.error('手机号码输入错误');
            return true;
          } else {
            this.$message.error('手机号码输入错误');
            return true;
          }
        } else {
          this.requiredPhone = false;
          return false;
        }
      }else{
        return false;
      }

    },
    addBankName() {
      if (this.electricFeeBill.paymentAccount && this.electricFeeBill.paymentAccountType == 1) {
        getBankName(this.electricFeeBill.paymentAccount).then(res => {
          // if (res.code === "200") {
          if (res.data == null) {
            this.$message.error('银行卡号输入错误');

            return true;
          } else {
            this.electricFeeBill.bankName = res.data;

            return false;
          }
          // }
        })
      }else{
        return false;
      }

    },
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
  .genBill-box{
    max-height: calc(100vh - 150px);
    overflow: auto;
    .head-info{
      height: 40px;
      line-height: 40px;
      background: #E9F1FF;
      color: #777777;
      font-size: 14px;
      padding: 0 20px;
    }
    .basicsInfo {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .table {
        width: 100%;
        border-left: 1px solid #EEEEEE;
        border-top: 1px solid #EEEEEE;
        font-size: 12px;
        border-radius: 4px;
        .table-title {
          border-radius: 4px 4px 0 0;
          display: flex;
          background: #F7F8FB;
          & > div {
            flex: 1;
            height: 40px;
            line-height: 40px;
            border-right: 1px solid #EEEEEE;
            border-bottom: 1px solid #EEEEEE;
            color: #666666;
            font-size: 14px;
          }
        }
        .house-data {
          border-radius: 0 0 4px 4px;
          display: flex;
          & > div {
            flex: 1;
            height: 40px;
            line-height: 40px;
            border-right: 1px solid #EEEEEE;
            border-bottom: 1px solid #EEEEEE;
            background-color: #ffffff;
            color: #111111;
            font-size: 14px;
          }
          /deep/ .ant-select-selection__rendered{
            margin-left: 0px;
            margin-right: 0px;
          }
          /deep/ .ant-cascader-picker-label{
            padding: 0;
          }
        }
      }
    }
    .detail-info{
      padding: 0 20px 20px 20px;
      .dividerClass{
        position: absolute;
        right: 100px;
        bottom: 8px;
        height: 14px;
        width: 1px;
        border: 0.5px solid #BBBBBB;
        z-index: 99;
      }
      .detail-info-title{
        color: #111111;
        font-size: 16px;
        font-weight: 500;
        margin: 29px 0 6px 0;
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
      /deep/ .ant-calendar-range-picker-input{
        text-align: left;
      }
      /deep/ .ant-calendar-range-picker-separator{
        line-height: 30px;
        margin-right: 20px;
      }
    }
    /deep/ .ant-select-selection__rendered{
      margin-left: 0px;
    }
  }
</style>