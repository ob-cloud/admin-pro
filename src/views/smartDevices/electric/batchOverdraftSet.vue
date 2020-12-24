<template>
  <div class="batchOverdraftSet-box">
    <div class="headInfo">
      已选择<span style="color: #0A87F8"> {{selectedRowKeys.length}} </span>个电表
    </div>
    <div class="detail">
      <div style="position: relative;">
        <label-item class="u-bottom-border" title="透支额度" :mustFill="true">
          <a-input placeholder="最多可输入 1 - 9999" v-model="sendData.overdraft" v-validate="'area|max(9999)'"></a-input>
        </label-item>
        <div style="position: absolute;color: #777777;font-size: 14px;right: 0px;top: 30px;">元/度</div>
      </div>
      <div style="margin-top: 20px;">
        <label-item class="u-bottom-border" title="备注" :maxSize="100" :valLength="sendData.comment.length">
          <a-textarea autosize v-model="sendData.comment" maxlength="100" placeholder="请输入">
          </a-textarea>
        </label-item>
      </div>
      <div style="color: #FFA036;font-size: 13px;margin-top: 12px;">
        <a-icon style="margin-right: 5px;" type="exclamation-circle" />如果修改的房间内有多个电表，则其他电表都将设置为统一的透支额度
      </div>
      <div class="clearfix" style="width: 100%;padding-top: 50px;">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSet">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="batchSetOverdraft">
            保存
          </a-button>
        </div>
      </div>
    </div>
    <!-- 批量设置操作结果 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="batchSetOverdraftDialog" class="ownModalBorder titDialog" title="修改透支额度" @cancel="closeThis">
      <batch-overdraft-set-result :selectedRowKeys="selectedRowKeys" @closeThis="closeThis"></batch-overdraft-set-result>
    </a-modal>
  </div>
</template>

<script>
import BatchOverdraftSetResult from './batchOverdraftSetResult';
import * as API from "@/api/smartDevices";
export default {
  name: "batchOverdraftSet",
  components: {
    BatchOverdraftSetResult,
  },
  props: {
    selectedRowKeys:{
      type:Array,
      required:true,
    },
  },
  data() {
    return {
      saveLoading:false,
      sendData:{
        overdraft:'',
        comment:'',
      },
      batchSetOverdraftDialog:false,
    }
  },
  created() {

  },
  methods: {
    closeThis(){
      this.batchSetOverdraftDialog = false;
      this.$emit('closeThis');
    },
    cancelSet(){
      this.$emit('cancelSet');
    },
    batchSetOverdraft(){
      if(!this.sendData.overdraft){
        this.$message.warning('请设置透支额度');
        return
      }
      this.sendData.electricMeterIdList = this.selectedRowKeys;
      this.saveLoading = true;
      API.overdraftBatchSet(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
         this.batchSetOverdraftDialog = true;
        }
        else{
          this.$message.error('透支额度设置失败');
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
.batchOverdraftSet-box{
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