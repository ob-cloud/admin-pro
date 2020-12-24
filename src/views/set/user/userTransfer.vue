<template>
  <div class="userTransfer">
    <div class="line1Style clearfix">
      <div class="line1-line1 f-fl"><div style="text-align: center">?</div></div>
      <div class="line1-line2 f-fl" style="width: calc(100% - 22px);">
        <span>确定要将员工「{{userRecord.name}}/{{userRecord.phone}}」名下的数据转移到其他员工名下吗？</span>
      </div>
    </div>
    <div class="line2Style">
      <div class="line2-line1" v-if="false">
        <span style="color: #111111;">请选择需要转移的数据</span><span style="color: #777777;">(可多选)</span><span style="color: #FB4246;margin-left: 4px;">*</span>
      </div>
      <div class="line2-line2" v-if="false">
        <a-checkbox-group :options="checkedTypes" v-model="bizModeList"/>
      </div>
      <div class="deptStyle" v-if="false">
        <div class="deptStyle1">
          <span class="titleStyle">房源所属门店</span><span>(部门)</span>
          <span style="margin-left: 5px;font-size: 12px;color: #FFA036;">选择门店(部门)后，需要转移的数据将统一转移到该门店(部门)下</span>
        </div>
        <div class="deptStyle2">
          <store-tree placement="bottomLeft" placeholder="请选择所属门店(部门)" ref="selectDept" @cancelOtherTree="cancelOtherTree(1)" style="width: 100%" @selectChange="selectDept" :show-employee="false"></store-tree>
        </div>
      </div>
      <div class="deptStyle">
        <div class="deptStyle1">
          <span class="titleStyle">接收人</span><span style="margin-left: 4px;color: #FB4246;">*</span>
        </div>
        <div class="deptStyle2 u-bottom-border">
          <dept-employee-tree placement="bottomLeft" placeholder="请选择接收人" style="width: 100%" :bottomBorder="false" @selectChange="selectDeptEmp" ref="selectDeptEmp" :disableDept="true"></dept-employee-tree>
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
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import {employeeTransferData} from '@/api/set';
export default {
  name: "userTransfer",
  props: {
    userRecord: {
      type: Object,
      required: true,
    },
  },
  components: {
    StoreTree,
    DeptEmployeeTree,
  },
  data() {
    return {
      checkedTypes: ['房源', '合同','账单'],
      bizModeList:['房源', '合同','账单'],
      saveLoading:false,
      maintainerId:'',
      deptId:'',
    }
  },
  created() {

  },
  methods: {
    cancelOtherTree(val){
      if(val==1){
        this.$refs.selectDeptEmp.showTree = false;
      }
      if(val==2){
        this.$refs.selectDept.showTree = false;
      }
    },
    confirmTransfer(){
      if(this.bizModeList.length==0){
        this.$message.warning('请选择需要转移的数据类型');
        return ;
      }
      if(!this.maintainerId){
        this.$message.warning('请选择维护人');
        return ;
      }
      let bizList = [];
      this.bizModeList.forEach((item)=>{
        if(item=='房源'){
          bizList.push(1);
        }
        else if(item=='合同'){
          bizList.push(2);
        }
        else if(item=='账单'){
          bizList.push(3);
        }
      });
      let sendData = {
        bizList:bizList,
        deptId:this.deptId,
        id:this.userRecord.id,
        maintainerId:this.maintainerId,
      };
      //审核员工
      this.saveLoading = true;
      employeeTransferData(sendData).then(res => {
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
    selectDeptEmp(selectObj) {
      if (selectObj.type == 'dept') {
        this.maintainerId = '';
      } else if (selectObj.type == 'employee') {
        this.maintainerId = selectObj.id;
      }
      else if(selectObj.type == ''){
        this.maintainerId = '';
      }
    },
    selectDept(selectObj) {
      if (selectObj.type == 'dept') {
        this.deptId = selectObj.id;
      }
      if(!selectObj.type&&!selectObj.name){
        this.deptId = '';
      }
    },
  },
}
</script>

<style scoped lang="less">
.userTransfer{
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
    padding: 30px 20px 0 20px;
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
      padding: 0px 0px 0 0px;
      .deptStyle1{
        margin-bottom: 4px;
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
      margin: 70px 0px 20px 0;
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