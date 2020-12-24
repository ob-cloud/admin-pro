<template>
  <div class="deptDelete">
    <div v-if="resultData.isDealwithData==1||secondFlag">
      <div class="line1Style">
        <div style="color:#FFA036;font-size: 14px;margin-bottom: 28px;"><icon-font type="iconyumengtubiao_tishi" />系统检测到该部门名下还有数据，请先将数据转移到其他部门名下</div>
      </div>
      <div class="line2Style">
        <div class="deptStyle">
          <div class="deptStyle1">
            <span class="titleStyle">接收门店</span><span>(部门)</span>
            <span class="redStyle">*</span>
          </div>
          <div class="deptStyle2">
            <store-tree placeholder="请选择接收门店(部门)" placement="bottomLeft" ref="selectDept" style="width: 100%" @selectChange="selectDept" :show-employee="false"></store-tree>
          </div>
        </div>
        <div class="clearfix">
          <div class="buttonDiv f-fr">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelDelete">
              取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmDelete(1)">
              确定
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="line1Style clearfix">
        <div class="line1-line1 f-fl"><icon-font class="close-icon cursor" type="iconyumengtubiao_shanchu-1" /></div>
        <div class="line1-line2 f-fl" style="width: calc(100% - 22px);">
          <div style="width: 100%;margin-bottom: 10px;">确定要删除「{{deptName}}」吗？</div>
          <div style="width: 100%;font-size: 14px;color: #666666;font-weight: 400;">删除后将不可恢复，请谨慎操作</div>
        </div>
      </div>
      <div class="line2Style">
        <div class="clearfix">
          <div class="buttonDiv f-fr" style="margin-top: 174px;">
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
import StoreTree from '@/components/DeptEmployeeTree/store';
import {deptRemoveNew} from "@/api/set";
export default {
  name: "deptDelete",
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
      resultData:{},
      secondFlag:false,
    }
  },
  created() {
  },
  methods: {
    confirmDelete(val){
      if(val==1&&!this.newDeptId){
        this.$message.warning('请选择房源所属门店(部门)');
        return ;
      }
      let sendData = {
        deptId:this.newDeptId,
        id:this.deptId,
      };
      if(val){
        sendData.isAlreadyCheck = val;
        this.secondFlag = true;
      }
      //删除部门
      this.saveLoading = true;
      deptRemoveNew(sendData).then(res => {
        if(!res){
          this.saveLoading = false;
        }
        if (res.code == "200") {
          this.resultData = res.data;
          if(this.resultData.isDealwithData==0){
            this.$message.info('部门删除成功');
            this.$emit('successDelete');
          }
        } else {
          this.$message.error('部门删除失败');
        }
        this.saveLoading = false;
      });
    },
    cancelDelete(){
      this.$emit('cancelDelete')
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
.deptDelete{
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
    padding: 0px 20px 0 20px;
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
      margin: 125px 0px 20px 0;
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