<template>
  <div class="userDisable">
    <div class="line2Style" v-if="resultData.isDealwithData==1||secondFlag">
      <div style="color:#FFA036;font-size: 14px;margin-bottom: 28px;"><icon-font type="iconyumengtubiao_tishi" />系统检测到该员工名下还有数据，是否将数据转移到其他员工名下</div>
      <div class="selectStyle clearfix">
        <div class="itemStyle leftItemStyle f-fl cursor" :class="transferFlag?'itemSelectedStyle':'itemUnselectedStyle'" @click="transferFlag=!transferFlag">转移</div>
        <div class="itemStyle rightItemStyle f-fl cursor" :class="!transferFlag?'itemSelectedStyle':'itemUnselectedStyle'" @click="transferFlag=!transferFlag">不转移</div>
      </div>
      <div v-if="transferFlag">
        <div class="deptStyle">
          <div class="deptStyle1">
            <span class="titleStyle">接收人</span><span style="margin-left: 4px;color: #FB4246;">*</span>
          </div>
          <div class="deptStyle2 u-bottom-border">
            <dept-employee-tree placeholder="请选择接收人" style="width: 100%" :bottomBorder="false" @selectChange="selectDeptEmp" ref="selectDeptEmp" :disableDept="true"></dept-employee-tree>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="warningStyle">禁用后，数据还在该员工名下</div>
        <div style="height: 40px;"></div>
      </div>
      <div class="clearfix">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelDisable">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmDisable(1)">
            确定
          </a-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="line1Style clearfix">
        <div class="line1-line1 f-fl"><icon-font class="close-icon cursor" type="iconyumengtubiao_shanchu-1" /></div>
        <div class="line1-line2 f-fl" style="width: calc(100% - 22px);">
          <div style="width: 100%;margin-bottom: 10px;">确定要禁用员工「{{userRecord.name}}/{{userRecord.phone}}」吗？</div>
          <div style="width: 100%;font-size: 14px;color: #666666;font-weight: 400;">禁用后该员工将不能登录本系统</div>
        </div>
      </div>
      <div class="line2Style">
        <div class="clearfix">
          <div class="buttonDiv f-fr" style="margin-top: 147px;">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelDisable">
              取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmDisable()">
              确定
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import {employeeLockEmpNew} from "@/api/set";
export default {
  name: "userDisable",
  props: {
    userRecord: {
      type: Object,
      required: true,
    },
    currentUserId:{
      type:String,
    },
  },
  components: {
    DeptEmployeeTree,
  },
  data() {
    return {
      saveLoading:false,
      transferFlag:false,
      resultData:{},
      maintainerId:'',
      secondFlag:false,
    }
  },
  created() {

  },
  methods: {
    confirmDisable(val){
      let sendData = {
        id:this.userRecord.id,
        lockedOrNot:1,
      };
      if(this.transferFlag){
        if(!this.maintainerId){
          this.$message.warning('请选择接收人');
          return ;
        }
        sendData.isTransfer = 1;
        sendData.maintainerId = this.maintainerId;
      }
      else{
        sendData.isTransfer = 0;
      }
      if(val){
        sendData.isAlreadyCheck = val;
        this.secondFlag = true;
      }
      //禁用员工
      this.saveLoading = true;
      employeeLockEmpNew(sendData).then(res => {
        if(!res){
          this.saveLoading = false;
        }
        if (res.code == "200") {
          this.resultData = res.data;
          if(this.resultData.isDealwithData==1){
            this.transferFlag = 1;
          }
          else {
            this.$message.info('员工禁用成功');
            if(this.currentUserId == this.userRecord.id){
              sessionStorage.clear();
              this.$router.go(0);
            }
            else{
              this.$emit('successDisable');
            }
          }
        } else {
          this.$message.error('员工禁用失败');
        }
        this.saveLoading = false;
      });
    },
    cancelDisable(){
      this.$emit('cancelDisable')
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
  },
}
</script>

<style scoped lang="less">
.userDisable{
  .line1Style{
    height: auto;
    padding: 29px 20px 0px 20px;
    .line1-line1{
      .close-icon{
        color: #FB4246;
      }
      svg{
        width: 22px;
        height: 22px;
      }
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
    .selectStyle{
        .itemStyle{
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
        }
        .leftItemStyle{
          border-radius: 4px 0 0 4px;
        }
        .rightItemStyle{
          border-radius: 0 4px 4px 0 ;
        }
       .itemSelectedStyle{
         background: #EEF7FF;
         border: 1px solid #0A87F8;
       }
      .itemUnselectedStyle{
        background: #FFFFFF;
        border: 1px solid #E6E6E6;
      }
    }
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
      padding: 27px 0px 0 0px;
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
    .warningStyle{
      margin-top: 10px;
      height: 39px;
      line-height: 39px;
      padding-left: 10px;
      background: #F6F7F8;
    }
  }
}
</style>