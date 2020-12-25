<template>
  <div class="billBatchProcess-box">
    <div class="line1Style">
      已选择 <span style="color: #0A87F8;">{{billBatchProcessIds.length}}</span> 个未完成账单
    </div>
    <div class="line2Style">
      <div class="line2StyleTitle">
        请完善要批量收/付款的账单支付信息
      </div>
      <div class="line2Style-line1 clearfix">
        <label-item title="支付途径" class="u-bottom-border f-fl" :mustFill="true" style="margin-right: 30px;width:167px;">
          <a-select v-model="paymentMethod" placeholder="请选择" style="width:167px;">
            <a-select-option v-for="(item,index) in costTabsContent" :key="index" :disabled="item.disabled" :value="item.id">{{item.name}}</a-select-option>
          </a-select>
        </label-item>
        <label-item title="实际收(付)款日期" class="u-bottom-border f-fl" :mustFill="true" style="margin-right: 30px;width:167px;">
          <a-date-picker placeholder="选择日期" v-model="practicalTime" format="YYYY-MM-DD" />
        </label-item>
        <label-item title="支付备注" class="u-bottom-border f-fl" style="width: calc(100% - 394px);">
          <a-input v-model="paymentNote" placeholder="请输入" />
        </label-item>
      </div>
      <div class="titlepz f-clearfix">
        支付凭证
        <span>（附件支持格式：jpg、png、jpeg）</span>
      </div>
      <own-upload :pic-list="payVoucherList" :uploadParms="sendData4_2" :showTips="false" ref="imgBill4_2"></own-upload>
      <div style="width:100%;margin-top: 30px;" class="clearfix">
        <a-button @click="batchProcess" type="warning" class="saveBtn f-fr" style="width:98px;" :loading="isloading">确定</a-button>
        <a-button @click="cancel" type="warning" class="f-fr cancelBtn" style="width:98px;">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {listEnableDict} from "@/api/contract";
import {billBatchHandle} from "@/api/bill";

export default {
  name: "billBatchProcess",
  props: {
    billBatchProcessIds:{
      Type:Array,
    }
  },
  data() {
    return {
      costTabsContent: [],
      sendData4_2: {},
      imgList4_2: [],
      isloading:false,
      paymentMethod:undefined,
      practicalTime:null,
      paymentNote:'',
      payVoucherList:[],
    }
  },
  mounted() {
    this.sendData4_2 = {
      // 上传时附带的额外参数
      bizId: '', //
      bizType: 4, // 图片大类标识  收支
      subBizType: 2, // 图片子类标识 支付凭证
      indexNum: 1 // 排序值
    }
  },
  created() {
    this.getCost();
    let date = new Date();
    this.practicalTime = this.$moment(date.getTime());
  },
  methods: {
    cancel(){
      this.$emit('closeThis', true);
    },
    batchProcess(){
      this.imgList4_2 = [];
      if (this.$refs.imgBill4_2.picsList.length != 0) {
        let imgObj4_2 = this.$refs.imgBill4_2.picsList;
        let arrImg = [];
        if (imgObj4_2.length > 0) {
          imgObj4_2.forEach(function(e) {
            arrImg.push(e.id)
          }, this);
        }
        this.imgList4_2 = arrImg;
      }
      if(this.billBatchProcessIds.length==0){
        this.$message.warning('参数有误');
        return ;
      }
      if(!this.paymentMethod){
        this.$message.warning('请选择支付途径');
        return ;
      }
      if(!this.practicalTime){
        this.$message.warning('请选择实际支付时间');
        return ;
      }
      let fileIds = [];
      this.imgList4_2.forEach(function(e) {
        fileIds.push(e);
      }, this);
      if (fileIds.length == 0) {
        fileIds = '';
      }
      let sendData = {
        billIdList:this.billBatchProcessIds,
        payVoucherIdList:fileIds,
        paymentMethod:this.paymentMethod,
        paymentNote:this.paymentNote,
        practicalTime: this.$moment(this.practicalTime).format('YYYY-MM-DD'),
      };
      this.isloading = true;
      billBatchHandle(sendData).then(res => {
        if(!res){
          this.isloading = false;
        }
        if (res.code === '200') {
          this.$message.success('操作成功');
          this.$emit('saveSure');
        }
        this.isloading = false;
      })
      .catch(err => {
        this.isloading = false;
      });
    },
    getCost() {
      listEnableDict('7bf14df972f64b94b7da8d3ff88ead18').then(res => {
        this.costTabsContent = res.data;
        this.costTabsContent.forEach((data) => {
          if (data.name === '现金') {
            this.paymentMethod = data.id;
          }
        });
      });

    },
  },
}
</script>

<style scoped lang="less">
.billBatchProcess-box{
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  .line1Style{
    background: #E7F1FF;
    height: auto;
    padding: 14px 20px;
    min-height: 52px;
    color: #777777;
    font-size: 16px;
    font-weight: 400;
  }
  .line2Style{
    padding: 24px 20px 0px 20px;
    .line2StyleTitle{
      font-weight: 600;
      color: #111111;
      font-size: 16px;
      margin-bottom: 12px;
    }
    .line2Style-line1{

    }
  }
  .titlepz {
    margin-top: 29px;
    margin-bottom: 10px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 17px;
    width: 100%;
    span {
      // width:195px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 160, 54, 1);
      line-height: 17px;
    }
  }
  .itemBg{
    background: #F6F7F8!important;
  }
  .saveBtn {
    width: 120px;
    height: 40px;
    background: rgba(10, 135, 248, 1);
    border-radius: 5px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    margin-right: 0px;
    margin-bottom: 20px;
  }

  .cancelBtn {
    width: 120px;
    height: 40px;
    background: rgba(246, 247, 248, 1);
    border-radius: 5px;
    border: 1px solid rgba(221, 221, 221, 1);
    margin-right: 20px;
    margin-bottom: 20px;
  }
  /deep/ .label-item .ant-select-selection__rendered{
    margin-left: 0px;
  }
}
</style>