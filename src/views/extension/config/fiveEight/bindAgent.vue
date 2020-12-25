<template>
  <div class="bindAgent-box clearfix">
      <div class="title">绑定管家</div>
    <div style="position: relative;">
      <dept-employee-tree ref="selectDeptEmp" placeholder="请选择负责人" :defaultValue="defaultValue" :show-phone="false"
                          @selectChange="selectDeptEmp($event)" >
      </dept-employee-tree>
      <div style="position: absolute;color: #FFA036;top:12px;" v-if="validated&&result.isExist==1">
        检索到该员工已绑定为管家，不可重复绑定～
      </div>
      <div style="position: absolute;color: #FFA036;top:42px;" v-if="validated&&!result.thirdUserId">
        检索到该管家账号未注册为58租房推广平台管家账号，请前往58租房推广平 台后端注册该管家信息～
      </div>
    </div>
    <div style="height: 180px;padding-top: 40px;">
      <div class="title" v-if="validated&&result.thirdUserId&&addForm.employeeId">管家信息</div>
      <div class="content-detail" v-if="validated&&result.thirdUserId&&addForm.employeeId">
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
      <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="confirmBind" :style="validated&&result.isExist==0&&addForm.thirdUserId&&addForm.employeeId?'':'background:rgba(10,135,248,0.4);'" :disabled="validated&&result.isExist==0&&addForm.thirdUserId&&addForm.employeeId?false:true" :loading="saveLoading" >
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
        agentName:'',
        agentPhone:'',
        clientKeyId:this.clientKeyId,
        employeeId:'',
        thirdUserId:'',
      },
      validated:false,
      result:{
        isExist:0,
        thirdUserId:'',
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
        this.addForm.agentName = selectObj.name;
        this.addForm.agentPhone = selectObj.phone;
        this.addForm.employeeId = selectObj.id;
        this.deptName = selectObj.deptName;
        this.roleName = selectObj.roleName;
        this.defaultValue = this.addForm.agentName+'-'+this.addForm.agentPhone;
        if(this.addForm.employeeId&&this.addForm.agentPhone&&this.addForm.clientKeyId){
          //校验房管员信息
          let parameter = {
            clientKeyId:this.addForm.clientKeyId,
            empId:this.addForm.employeeId,
            phone:this.addForm.agentPhone,
          };
          API.wubaVerifyAgent(parameter).then(res => {
            if (res && res.code === "200") {
              this.validated = true;
              this.result = res.data;
              this.addForm.thirdUserId = this.result.thirdUserId;
            }
            else{
              this.result = {
                isExist:0,
                thirdUserId:'',
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
          thirdUserId:'',
        }
      }
    },
    cancelBind(){
      this.$emit('cancelBind');
    },
    confirmBind(){
      this.saveLoading = true;
      API.wubaAddAgent(this.addForm).then(res => {
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