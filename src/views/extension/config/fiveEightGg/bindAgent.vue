<template>
  <div class="bindAgent-box clearfix">
      <div class="title">绑定管家</div>
    <div style="position: relative;">
      <dept-employee-tree ref="selectDeptEmp" placeholder="请选择负责人" :defaultValue="defaultValue"
                          @selectChange="selectDeptEmp($event)" :show-phone="false" >
      </dept-employee-tree>
      <div style="position: absolute;color: #FFA036;top:12px;" v-if="validated&&result.isExist==1">
        检索到该员工已绑定为管家，不可重复绑定～
      </div>
    </div>
    <div style="height: 180px;padding-top: 40px;">
      <div class="title" v-if="validated&&result.isExist==0&&addForm.employeeId">管家信息</div>
      <div class="content-detail" v-if="validated&&result.isExist==0&&addForm.employeeId">
        <label-item class="item" title="联系电话">
          <span class="content-font">{{ addForm.agentPhone }}</span>
        </label-item>
        <label-item class="item" title="所属部门">
          <span class="content-font">{{deptName}}</span>
        </label-item>
        <label-item class="item" title="所属角色">
          <span class="content-font">{{roleName?roleName:'-'}}</span>
        </label-item>
      </div>
    </div>
    <div class="buttonDiv f-fr">
      <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelBind">
        取消
      </a-button>
      <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="confirmBind" :style="validated&&result.isExist==0&&addForm.employeeId?'':'background:rgba(10,135,248,0.4);'" :disabled="validated&&result.isExist==0&&addForm.employeeId?false:true" :loading="saveLoading" >
        确定绑定
      </a-button>
    </div>
  </div>
</template>

<script>
import DeptEmployeeTree from '@/components/DeptEmployeeTree/customer'
import * as API from "@/api/extension";
export default {
  name: "bindAgent",
  components: {
    DeptEmployeeTree,
  },
  props: {
    clientKeyId:{
      Type:String,
      required:true,
    },
  },
  data() {
    return {
      saveLoading:false,
      addForm:{
        clientKeyId:this.clientKeyId,
        employeeId:'',
        agentName:'',
        agentPhone:'',
      },
      validated:false,
      result:{
        isExist:0,
      },
      deptName:'',
      roleName:'',
      defaultValue:'',
    }
  },
  created() {
  },
  methods:{
    selectDeptEmp(selectObj){
      //校验房管员信息
      if(selectObj.type == 'employee'){
        this.addForm.employeeId = selectObj.id;
        this.addForm.agentPhone = selectObj.phone;
        this.addForm.agentName = selectObj.name;
        this.deptName = selectObj.deptName;
        this.roleName = selectObj.roleName;
        this.defaultValue = selectObj.name;
        if(this.addForm.employeeId&&this.addForm.agentPhone){
          //校验房管员信息
          let parameter = {
            clientKeyId:this.addForm.clientKeyId,
            empId:this.addForm.employeeId,
            phone:this.addForm.agentPhone,
          };
          API.wubaFlatsVerifyAgent(parameter).then(res => {
            if (res && res.code === "200") {
              this.validated = true;
              this.result = res.data;
            }
            else{
              this.result = {
                isExist:0,
              }
            }
          });
        }
      }
      else{
        this.addForm.agentName = '';
        this.addForm.agentPhone = '';
        this.addForm.employeeId = '';
        this.deptName = '';
        this.roleName = '';
        this.defaultValue = '';
        this.$refs.selectDeptEmp.selectName = '';
        this.result = {
          isExist:0,
        }
      }
    },
    cancelBind(){
      this.$emit('cancelBind');
    },
    confirmBind(){
      this.saveLoading = true;
      API.wubaFlatsAddAgent(this.addForm).then(res => {
        if(!res){
          this.saveLoading = false;
        }
        if (res.code === "200") {
          this.$message.success('管家添加成功');
          this.saveLoading = false;
          this.$emit('bindAgentSuccess');
        }
        else{
          this.$message.error('管家添加失败');
          this.saveLoading = false;
        }
      });
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
  .bindAgent-box{
    padding: 19px 20px 20px;
    .title{
      font-size: 16px;
      color: #111111;
      font-weight: 500;
    }
    .content-detail{
      display: flex;
      .item{
        flex: 1;
      }
      .content-font{
        font-size: 14px;
        color:#111111;
      }
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
</style>