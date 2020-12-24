<template>
  <!-- 绑定闲鱼管家-->
  <div class="openXy-box">
    <title-steps :steps="steps"></title-steps>
    <div class="splitStyle"></div>
    <div class="contentStyle" v-if="steps==1">
      <div class="contentStyle1" style="position: relative;">
        <label-item title="绑定管家" :must-fill="true">
          <dept-employee-tree ref="selectDeptEmp" placeholder="请选择绑定的管家" :show-phone="false"
                              :selectedEmpIdList="selectedEmpIdList" @selectChange="selectDeptEmp($event)">
          </dept-employee-tree>
        </label-item>
        <div style="position: absolute;top: 59px;font-size: 12px;color: #FB4246;" v-if="result.isExist==1">
          检索到该员工已绑定为管家，不可重复绑定～
        </div>
      </div>
      <div class="contentStyle1" style="margin-top: 28px;position: relative;">
        <label-item class="u-bottom-border" title="闲鱼会员名" :must-fill="true" :maxSize="30" :valLength="addForm.nick.length">
          <a-input v-model="addForm.nick" placeholder="请输入" @change="changeNick" maxlength="30"></a-input>
        </label-item>
        <div style="font-size: 2px;color: #FFA036;position: absolute;top:5px;left:106px;">
          打开闲鱼APP，点"我的"，用户名即闲鱼会员名
        </div>
        <div style="position: absolute;top: 59px;font-size: 12px;color: #FB4246;" v-if="result.isExist==2">
          检测到此闲鱼账号以绑定，不可重复绑定
        </div>
      </div>
      <div class="agentInfo" v-if="validated&&result.isExist==0">
        <div class="agentInfoTitle">管家信息</div>
        <div class="agentInfoContent">
          <label-item class="item" title="联系电话">
            <span>{{addForm.phone?addForm.phone:'-'}}</span>
          </label-item>
          <label-item class="item" title="所属部门">
            <span>{{deptName?deptName:'-'}}</span>
          </label-item>
          <label-item class="item" title="所属角色">
            <span>{{roleName?roleName:'-'}}</span>
          </label-item>
        </div>
      </div>
      <div class="clearfix" style="width: 100%;" :style="validated&&result.isExist==0?'margin-top:33px;':'margin-top:100px;'">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelOpen">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmOpen" :style="validated&&result.isExist==0&&addForm.nick.length>0?'':'background:rgba(10,135,248,0.4);'" :disabled="validated&&result.isExist==0&&addForm.nick.length>0?false:true">
            下一步
          </a-button>
        </div>
      </div>
    </div>
    <div class="erWeiMaStyle" v-if="steps==2">
      <div>
        <img style="width: 258px;height: 258px;" src="../../../../assets/extension/xyQrcode.jpg">
      </div>
      <div style="margin: 9px 0 34px 0;color: #111111;font-size: 16px;">请用闲鱼APP进行扫码授权</div>
      <div style="margin-top: 35px;">
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="closeThis">
          已扫码授权
        </a-button>
      </div>
    </div>
    <!-- 闲鱼开通流程文档 -->
    <a-modal centered v-model="OpenGuidanceXyDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 20px 25px 50px'}" @cancel="OpenGuidanceXyDialog=false" width="800px">
      <open-guidance-xy @closeThis="OpenGuidanceXyDialog=false"></open-guidance-xy>
    </a-modal>
  </div>
</template>

<script>
import TitleSteps from './TitleSteps';
import OpenGuidanceXy from './openGuidanceXy';
import DeptEmployeeTree from '@/components/DeptEmployeeTree/customer'
import * as API from '@/api/extension';

export default {
  name: "bindAgent",
  components: {
    TitleSteps,
    OpenGuidanceXy,
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
      addForm:{
        nick:'',
        userId:'',
        name:'',
        phone:'',
        type:2,
        lenderId:this.clientKeyId,
      },
      OpenGuidanceXyDialog:false,
      saveLoading:false,
      steps:1,
      deptName:'',
      roleName:'',
      result:{
        isExist:undefined,
        thirdUserId:'',
      },
      validated:false,
      selectedEmpIdList:[],
    }
  },
  created() {
    this.fishUserBindList();
  },
  methods:{
    fishUserBindList(){
      API.fishUserBindList().then(res => {
        if (res.code == 200) {
          this.selectedEmpIdList = res.data;
        }
      });
    },
    changeNick(){
      if(this.addForm.nick.length>0){
        this.fishUserVerifyManager();
      }
    },
    fishUserVerifyManager(){
      if (this.addForm.userId||this.addForm.nick){
        //校验房管员信息
        let parameter = {
          empId:this.addForm.userId,
          nick:this.addForm.nick,
        };
        API.fishUserVerifyManager(parameter).then(res => {
          if (res && res.code === "200") {
            this.validated = true;
            this.result = res.data;
          }
        });
      }
    },
    selectDeptEmp(selectObj) {
      if(selectObj.type=='employee'){
        this.addForm.userId = selectObj.id;
        this.addForm.name = selectObj.name;
        this.addForm.phone = selectObj.phone;
        this.deptName = selectObj.deptName
        this.roleName = selectObj.roleName;
        this.fishUserVerifyManager();
      }
      else{
        this.result = {
          isExist:undefined,
          thirdUserId:'',
        };
      }
    },
    cancelOpen(){
      this.$emit('cancelOpen');
    },
    confirmOpen(){
      if(!this.addForm.nick){
        this.$message.warning('请输入闲鱼会员名');
        return ;
      }
      if(!this.addForm.userId){
        this.$message.warning('请选择绑定的管家');
        return ;
      }
      this.saveLoading = true;
      API.fishUserAddHouseManager(this.addForm).then(res => {
        if(!res){
          this.saveLoading = false;
          this.steps = 1;
        }
        if (res.code == 200) {
          this.$message.success('管家绑定成功，请扫码授权');
          this.$emit('refreshinfoFun',true,res.data.id);
          this.saveLoading = false;
          this.steps += 1;
        }
        else{
          this.$message.error('管家绑定失败');
          this.saveLoading = false;
          this.steps = 1;
        }
      });
    },
    closeThis(){
      this.$emit('closeThis');
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
.openXy-box{
  .splitStyle{
    margin: 0 20px;
    height:6px;
    background:rgba(247,248,251,1);
    width: 480px;
  }
  .contentStyle{
    padding: 20px;
    .contentStyle1{
      /deep/ .label-item .title{
        font-size: 18px;
        color: #111111;
        font-weight: 500;
      }
    }
  }
  .erWeiMaStyle{
    padding: 30px 0 20px 0;
    text-align: center;
  }
  .agentInfo{
    margin-top: 30px;
    height: 109px;
    background:rgba(246,247,251,1);
    border-radius:4px;
    padding: 0 10px;
    .agentInfoTitle{
      font-weight: 500;
      font-size: 16px;
      color: #111111;
      padding-top: 13px;
    }
    .agentInfoContent{
      display: flex;
      .item{
        width: 33%;
      }
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