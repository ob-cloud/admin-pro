<template>
  <div class="userDelete">
    <div class="line2Style" v-if="resultData.isDealwithData==1||secondFlag">
      <div style="color:#FFA036;font-size: 14px;margin-bottom: 28px;"><icon-font type="iconyumengtubiao_tishi" />系统检测到该员工名下还有数据，是否将数据转移到其他员工名下</div>
      <div class="deptStyle">
        <div class="deptStyle1">
          <span class="titleStyle">接收人</span><span style="margin-left: 4px;color: #FB4246;">*</span>
        </div>
        <div class="deptStyle2 u-bottom-border">
          <dept-employee-tree placeholder="请选择接收人" style="width: 100%" :bottomBorder="false" @selectChange="selectDeptEmp" ref="selectDeptEmp" :disableDept="true"></dept-employee-tree>
        </div>
      </div>
      <div class="clearfix">
        <div class="buttonDiv f-fr" style="margin-top: 123px;">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelDelete">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmDelete(1)">
            确定
          </a-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="line1Style clearfix">
        <div class="line1-line1 f-fl"><icon-font class="close-icon cursor" type="iconyumengtubiao_shanchu-1" /></div>
        <div class="line1-line2 f-fl" style="width: calc(100% - 22px);">
          <div style="width: 100%;margin-bottom: 10px;">确定要删除员工「{{userRecord.name}}/{{userRecord.phone}}」吗？</div>
          <div style="width: 100%;font-size: 14px;color: #666666;font-weight: 400;">删除后将不可恢复，请谨慎操作</div>
        </div>
      </div>
      <div class="line2Style">
        <div class="clearfix">
          <div class="buttonDiv f-fr" style="margin-top: 147px;">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelDelete">
              取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmDelete()">
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
import {employeeRemove} from "@/api/set";
export default {
  name: "userDelete",
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
      maintainerId:'',
      resultData:{},
      secondFlag:false,
    }
  },
  created() {
  },
  methods: {
    confirmDelete(val){
      if(val==1&&!this.maintainerId){
        this.$message.warning('请选择维护人');
        return ;
      }
      let sendData = {
        id:this.userRecord.id,
        maintainerId:this.maintainerId,
      };
      if(val){
        sendData.isAlreadyCheck = val;
        this.secondFlag = true;
      }
      //删除员工
      this.saveLoading = true;
      employeeRemove(sendData).then(res => {
        if(!res){
          this.saveLoading = false;
        }
        if (res.code == "200") {
          this.resultData = res.data;
          if(this.resultData.isDealwithData==1){
            this.transferFlag = 1;
          }
          else {
            this.$message.info('员工删除成功');
            if(this.currentUserId == this.userRecord.id){
              sessionStorage.clear();
              this.$router.go(0);
            }
            else{
              this.$emit('successDelete');
            }
          }
        } else {
          this.$message.error('员工删除失败');
        }
        this.saveLoading = false;
      });
    },
    cancelDelete(){
      this.$emit('cancelDelete')
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
.userDelete{
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