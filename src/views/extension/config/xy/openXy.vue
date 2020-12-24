<template>
  <!-- 开通闲鱼 -->
  <div class="openXy-box">
      <div class="warning" v-if="steps==1">
        <a-icon type="exclamation-circle" style="margin:0 4px 0 10px;font-size: 16px;" />主账号拥有查看所有发布房源的权限，设置后不可更改！
      </div>
    <div class="warning" v-if="steps==2">
      <a-icon type="exclamation-circle" style="margin:0 4px 0 10px;font-size: 16px;" />请使用闲鱼APP进行扫码授权；扫码授权后才可以将房源发布到闲鱼平台上
    </div>
      <title-steps :steps="steps"></title-steps>
      <div class="splitStyle"></div>
      <div class="contentStyle" v-if="steps==1">
        <div>
          <label-item class="u-bottom-border" title="主账号闲鱼会员名" :must-fill="true" :maxSize="30" :valLength="addForm.nick.length">
            <a-input v-model="addForm.nick" placeholder="请输入" maxlength="30"></a-input>
          </label-item>
        </div>
        <div style="margin-top: 20px;">
          <label-item title="闲鱼账号所属人" :must-fill="true">
            <dept-employee-tree ref="selectDeptEmp" placeholder="请选择负责人" :show-phone="false"
                                @selectChange="selectDeptEmp($event)">
            </dept-employee-tree>
          </label-item>
        </div>
        <div class="clearfix" style="width: 100%;margin-top:77px;">
          <div class="f-fl cursor" style="height: 40px;line-height: 40px;color: #0a87f8;" @click="OpenGuidanceXyDialog=true;">
            查看开通流程<icon-font type="iconyumengtubiao_zhishi"/>
          </div>
          <div class="buttonDiv f-fr">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelOpen">
              取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmOpen">
              确定开通
            </a-button>
          </div>
        </div>
      </div>
      <div class="erWeiMaStyle" v-if="steps==2">
        <div>
          <img style="width: 258px;height: 258px;" src="../../../../assets/extension/xyQrcode.jpg">
        </div>
        <div style="margin-top: 9px;color: #111111;font-size: 16px;">请用闲鱼APP进行扫码授权</div>
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
  name: "openXy",
  components: {
    TitleSteps,
    OpenGuidanceXy,
    DeptEmployeeTree,
  },
  data() {
    return {
      addForm:{
        nick:'',
        userId:'',
        name:'',
        phone:'',
        type:1,
      },
      OpenGuidanceXyDialog:false,
      saveLoading:false,
      steps:1,
    }
  },
  created() {
  },
  methods:{
    selectDeptEmp(selectObj) {
      if(selectObj.type=='employee'){
        this.addForm.userId = selectObj.id;
        this.addForm.name = selectObj.name;
        this.addForm.phone = selectObj.phone;
      }
    },
    cancelOpen(){
      this.$emit('cancelOpen',1);
    },
    confirmOpen(){
      if(!this.addForm.nick){
        this.$message.warning('请输入主账号闲鱼会员名');
        return ;
      }
      if(!this.addForm.userId){
        this.$message.warning('请输入闲鱼账号所属人');
        return ;
      }
      this.saveLoading = true;
      API.fishUserAddHouseUser(this.addForm).then(res => {
        if(!res){
          this.saveLoading = false;
          this.steps = 1;
        }
        if (res.code == 200) {
          this.$emit('refreshinfoFun',true,res.data.id);
          this.$message.success('开通成功，请扫码授权');
          this.saveLoading = false;
          this.steps += 1;
        }
        else{
          this.$message.error('开通失败');
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
    .warning{
      height: 37px;
      line-height: 37px;
      padding-left: 20px;
      width: 100%;
      background:rgba(255,247,238,1);
      border-radius:4px;
      color: #FFA036;
      font-size: 12px;
      i{
        vertical-align: -0.20em;
      }
    }
    .splitStyle{
      margin: 0 20px;
      height:6px;
      background:rgba(247,248,251,1);
      width: 480px;
    }
    .contentStyle{
      padding: 20px;
    }
    .erWeiMaStyle{
      padding: 30px 0 20px 0;
      text-align: center;
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