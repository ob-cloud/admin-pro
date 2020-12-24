<template>
  <div class="deptTransfer">
    <div class="line1Style clearfix">
      <div class="line1-line1 f-fl"><div style="text-align: center">?</div></div>
      <div class="line1-line2 f-fl">
        <span>确定要将「{{deptName}}」的数据转移到其他门店(部门)吗？</span>
      </div>
    </div>
    <div class="line2Style">
      <div class="deptStyle">
        <div class="deptStyle1">
          <span class="titleStyle">选择所属门店</span><span>(部门)</span>
          <span class="redStyle">*</span>
        </div>
        <div class="deptStyle2">
          <store-tree placement="bottomLeft" ref="selectDept" style="width: 100%" @selectChange="selectDept" :show-employee="false"></store-tree>
        </div>
      </div>
      <div class="clearfix">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelTransfer">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmTransfer">
            确定
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StoreTree from '@/components/DeptEmployeeTree/store';
import {departmentTransferData} from "@/api/set";
export default {
  name: "deptTransfer",
  props: {
    deptName: {
      type: String,
      required: true,
    },
    deptId: {
      type: String,
      required: true,
    },
  },
  components: {
    StoreTree,
  },
  data() {
    return {
      saveLoading:false,
      newDeptId:'',
    }
  },
  created() {

  },
  methods: {
    confirmTransfer(){
      if(!this.newDeptId){
        this.$message.warning('请选择所属门店(部门)');
        return ;
      }
      let sendData = {
        deptId:this.newDeptId,
        id:this.deptId,
      };
      //转移部门
      this.saveLoading = true;
      departmentTransferData(sendData).then(res => {
        if(!res){
          this.saveLoading = false;
        }
        if (res.code == "200") {
          this.$message.info('数据转移成功');
          this.$emit('successTransfer');
        } else {
          this.$message.error('数据转移失败');
        }
        this.saveLoading = false;
      });
    },
    cancelTransfer(){
      this.$emit('cancelTransfer')
    },
    selectDept(selectObj) {
      if (selectObj.type == 'dept') {
        this.newDeptId = selectObj.id;
      }
      if(!selectObj.type&&!selectObj.name){
        this.newDeptId = '';
      }
    },
  },
}
</script>

<style scoped lang="less">
  .deptTransfer{
    .line1Style{
      background: #E7F1FF;
      height: auto;
      padding: 14px 20px;
      min-height: 52px;
      .line1-line1{
        width: 22px;
        height: 22px;
        background-color: #FAAD14;
        color: #FFFFFF;
        border-radius: 50%;
      }
      .line1-line2{
        padding-left: 10px;
        color: #111111;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
      }
    }
    .line2Style{
      padding: 25px 20px 0 20px;
      .line2-line1{
        font-size: 16px;
      }
      .line2-line2{
        margin-top: 9px;
        width: 480px;
        height: 34px;
        line-height: 34px;
        background: #F6F7F8;
        padding-left: 10px;
      }
      .deptStyle{
        padding: 5px 0px 0 0px;
        .deptStyle1{
          .titleStyle{
            font-size: 16px;
            font-weight: 500;
            color: #111111;
          }
          .redStyle{
            color: #FB4246;
            margin-left: 4px;
          }
        }
        .deptStyle2{
          /deep/ .ant-select-selection__rendered{
            margin-left: 0px;
          }
          width: 100%;
          height: 34px;
          .deptStyle{
            width: 100%;
          }
        }
      }
      .buttonDiv {
        margin: 95px 0px 20px 0;
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