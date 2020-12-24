<template>
  <div class="manualReading-box">
    <div class="headInfo margin-top10">
      <div>
        <div class="item width1">表名称：</div>
        <div class="item item-content">{{electricData.name|blankVal}}</div>
      </div>
      <div class="margin-top10">
        <div class="item width1">表序列号：</div>
        <div class="item item-content">{{electricData.sn|blankVal}}</div>
      </div>
      <div class="margin-top10">
        <div class="item width1">已绑房间：</div>
        <div class="item item-content">{{electricData.houseAlias?electricData.houseAlias+' / ':''}}{{electricData.cityName|blankVal}}{{electricData.areaName|blankVal}}{{electricData.fullAddress|blankVal}}</div>
      </div>
    </div>
    <div class="detail">
      <div style="position: relative;" v-if="electricData.billingMethod==3">
        <label-item class="u-bottom-border" title="金额" :mustFill="true">
          <a-input placeholder="请输入" v-model="sendData.readValue" v-validate="'area|min(0.01)|max(99999)'"></a-input>
        </label-item>
        <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元</div>
      </div>
      <div style="position: relative;" v-else>
        <label-item class="u-bottom-border" :title="electricData.billingMethod==2?'底数':electricData.billingMethod==3?'金额':'余数'" :mustFill="true">
          <a-input placeholder="请输入" v-model="sendData.readValue" v-validate="'area|min(0.01)|max(99999)'"></a-input>
        </label-item>
        <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">{{electricData.billingMethod==2?'度':electricData.billingMethod==3?'元':'度'}}</div>
      </div>
      <div style="position: relative;margin-top: 20px;">
        <label-item class="u-bottom-border" title="抄表时间" :mustFill="true">
          <a-date-picker style="width: 100%"
                         v-model="sendData.readTime"
                         show-time :allowClear="false"
                         format="YYYY-MM-DD HH:mm:ss"
                         placeholder="请选择"
                         :disabled-date="disabledEndDate"
          />
        </label-item>
      </div>
      <div style="margin-top: 20px;">
        <label-item class="u-bottom-border" title="抄表备注" :maxSize="100" :valLength="sendData.comment.length">
          <a-textarea autosize v-model="sendData.comment" maxlength="100" placeholder="请输入">
          </a-textarea>
        </label-item>
      </div>
      <div style="margin-top: 20px;">
        <label-item class="u-bottom-border" title="附件">
          <div style="margin-top: 8px;">
            <own-upload style="padding-right: 10px" :uploadParms="uploadParm" :maxLength="20" :showTips="false" ref="otherPicList">
            </own-upload>
          </div>
        </label-item>
      </div>
      <div class="clearfix" style="width: 100%;padding-top: 50px;">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelManualReading">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="manualReading">
            保存
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/smartDevices";
import Vue from 'vue';
export default {
  name: "unitPriceSet",
  components: {
  },
  props: {
    electricMeterId:{
      type:String,
      required:true,
    }
  },
  data() {
    return {
      uploadParm:{},
      electricData:{},
      sendData:{
        annexIdList:[],
        comment:'',
        electricMeterId:'',
        readTime:this.$moment(new Date().getTime()),
        readValue:'',
      },
      saveLoading:false,
    }
  },
  created() {
    this.uploadParm = { //
      // 上传时附带的额外参数
      bizId: '', //
      bizType: 22, //   智能设备分类
      subBizType: 1, // 子类
      orderIndex: 1 // 排序值
    }
    this.sendData.electricMeterId = this.electricMeterId;
    this.viewElectric();
  },
  methods: {
    disabledEndDate(endValue) {
      //普通电表抄表时间不能超过今天
      let todayEndTime = Vue.prototype.$moment().endOf('day').valueOf();
      return endValue > todayEndTime;
    },
    cancelManualReading(){
      this.$emit('cancelSet');
    },
    manualReading(){
      if((this.electricData.billingMethod==1||this.electricData.billingMethod==2)&&!this.sendData.readValue){
        this.$message.warning('请输入表数');
        return ;
      }
      if(this.electricData.billingMethod==3&&!this.sendData.readValue){
        this.$message.warning('请输入金额');
        return ;
      }
      let annexIdList = [];
      let fileDTOList = [...this.$refs.otherPicList.picsList];
      if(fileDTOList.length>0){
        fileDTOList.forEach((item)=>{
          annexIdList.push(item.id);
        })
      }
      this.sendData.annexIdList = annexIdList;
      this.saveLoading = true;
      API.electricMeterManualReading(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
          this.$message.success('手动抄表成功');
          this.$emit('readingSuccess');
        }
        else{
          this.$message.error('手动抄表失败');
          this.saveLoading = false;
        }
      });
    },
    viewElectric(){
      API.electricMeterView({id:this.electricMeterId}).then(res => {
        if(res.code === '200'){
          this.electricData = res.data;
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
  .manualReading-box{
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