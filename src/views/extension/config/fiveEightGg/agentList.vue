<template>
  <div class="agentList-box">
    <div class="set_info f-clearfix">
      <div class="selectItem f-fl">
        <div class="titleTip1 f-fl">部门</div>
        <div class="deptStyle f-fl">
          <dept-employee-tree style="width: 130px;" placeholder="请选择" :showNameAll="false" :showEmployee="false" @selectChange="selectDept" placement="bottomLeft" ref="selectDeptEmp"></dept-employee-tree>
        </div>
        </div>
      <div class="selectItem f-fl">
        <div class="titleTip1 f-fl">角色</div>
        <a-select placeholder="请选择" style="width:130px;height:34px" v-model="sendData.roleId" @change="selectRole" :allowClear="true">
          <a-select-option v-for="(item) in roleList" :value="item.id" :key="item.id" >{{ item.name }}</a-select-option>
        </a-select>
      </div>
      <div class="selectItem searchStyle f-fl" style="margin-right: 0px;">
        <a-input-search placeholder="管家姓名/电话" v-model="sendData.fuzzyKeyword" @pressEnter="onSearch" style="width: 360px" @search="onSearch" />
      </div>
    </div>
    <div class="agentList">
      <div class="basicsInfo">
        <div class="table">
          <div class="table-title">
            <div style="max-width: 133px;text-align: left;padding-left: 14px;">管家姓名</div>
            <div style="max-width: 167px;text-align: left;padding-left: 19px;">手机号</div>
            <div style="max-width: 160px;text-align: left;padding-left: 19px;">所属部门</div>
            <div style="max-width: 128px;text-align: left;padding-left: 19px;">角色</div>
            <div style="max-width: 169px;text-align: left;padding-left: 115px;">操作</div>
          </div>
          <div class="house-data u-no-border" v-for="(item,index) in agentList" :key="index">
            <div style="max-width: 133px;text-align: left;padding-left: 14px;">
              <span>{{ item.agentName }}</span>
              <a-popover trigger="hover"  placement="top">
                <template slot="content">
                  管家信息已更新，可同步至58品牌公寓馆平台上
                </template>
                <a-icon v-if="item.needUpdate==1" type="exclamation-circle" style="margin:0 4px 0 10px;font-size: 16px;color: #FFA036;" />
              </a-popover>
            </div>
            <div style="max-width: 167px;text-align: left;padding-left: 19px;">
              {{item.agentPhone}}
            </div>
            <div style="max-width: 160px;text-align: left;padding-left: 19px;">{{ item.deptName }}</div>
            <div style="max-width: 128px;text-align: left;padding-left: 19px;">{{ item.roleName?item.roleName:'-' }}</div>
            <div style="max-width: 169px;text-align: left;" :style="item.needUpdate==1?'padding-left: 11px':'padding-left: 115px'">
              <span class="cursor" @click="updateWubaFlatsAgent(item)" style="color: #0A87F8;font-size: 14px;" v-if="item.needUpdate==1">同步管家信息</span>
              <span style="border-right: 1px dashed #DDDDDD;margin: 0 10px;" v-if="item.needUpdate==1"></span>
              <span class="cursor" v-mark="['mk_extension_config_jbzh']" @click="deleteAgent(item)" style="font-size: 14px;color: #FB4246;" >解绑</span>
            </div>
          </div>
          <div class="house-data u-no-border cursor" v-mark="['mk_extension_config_bdzh']" @click="addAgent">
            <div class="continueAddStyle">
              <icon-font type="iconyumengtubiao_tianjia" />绑定管家
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 绑定管家 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bindAgentDialog" class="ownModalBorder titDialog" title="绑定品牌公寓馆管家" @cancel="bindAgentDialog=false;">
      <bind-agent :clientKeyId="clientKeyId" @cancelBind="bindAgentDialog=false;" @bindAgentSuccess="bindAgentSuccess"></bind-agent>
    </a-modal>
  </div>
</template>

<script>
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import {roleSimpleList} from "@/api/set";
import BindAgent from './bindAgent';
import * as API from "@/api/extension";
export default {
  name: "agentList",
  components: {
    DeptEmployeeTree,
    BindAgent,
  },
  props: {
    clientKeyId:{
      Type:String,
      required:true,
    },
  },
  data() {
    return {
      sendData:{
        deptId:'',
        roleId:undefined,
        clientKeyId:this.clientKeyId,
        fuzzyKeyword:'',
      },
      roleList:[],
      agentList:[],
      bindAgentDialog:false,
    }
  },
  created() {
    this.roleListAll();
    this.wubaFlatsListClientKeyAgent();
  },
  methods:{
    wubaFlatsDeleteAgent(id){
      API.wubaFlatsDeleteAgent({id:id}).then(res => {
        if (res.code === "200") {
          this.$message.success('管家解绑成功');
          this.wubaFlatsListClientKeyAgent();
        }
        else{
          this.$message.error('管家解绑失败');
        }
      });
    },
    updateWubaFlatsAgent(item){
      API.wubaFlatsUpdateWubaFlatsAgent({id:item.id}).then(res => {
        if (res.code === "200") {
          this.$message.success('管家信息同步成功');
          this.wubaFlatsListClientKeyAgent();
        }
        else{
          this.$message.error('管家信息同步失败');
        }
      });
    },
    deleteAgent(item){
      let that = this;
      this.$modal.confirm({
        title: '确定要解除管家「'+ item.agentName +'-'+ item.agentPhone +'」与 58品牌公寓馆平台的绑定关系吗？',
        content:  '解绑后，该管家所负责的房源将全部从58品牌公寓馆平台上下架；且该管家所负责的房源将不可再推广到58品牌公寓馆平台上',
        width:"433px",
        height:"192px",
        okText: '确认',
        cancelText: '取消',
        onOk() {
          that.wubaFlatsDeleteAgent(item.id);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    bindAgentSuccess(){
      this.bindAgentDialog = false;
      setTimeout(()=>{
        this.wubaFlatsListClientKeyAgent();
      },500)
    },
    addAgent(){
      this.bindAgentDialog = true;
    },
    wubaFlatsListClientKeyAgent(){
      API.wubaFlatsListClientKeyAgent(this.sendData).then(res => {
        if (res && res.code === "200") {
          this.agentList = res.data;
        }
      });
    },
    onSearch(){
      this.wubaFlatsListClientKeyAgent();
    },
    roleListAll() {
      let parameter={};
      //创建部门
      roleSimpleList(parameter).then(res => {
        this.roleList =res.data;
      });
    },
    //选择负责人
    selectDept(selectObj) {
      this.sendData.deptId = selectObj.id;
      this.wubaFlatsListClientKeyAgent();
    },
    selectRole(){
      this.wubaFlatsListClientKeyAgent();
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
  .agentList-box{
    padding: 15px 20px 106px 20px;
    .set_info {
      .searchStyle{
        /deep/ .ant-input{
          border-radius:4px !important;
        }
      }
      .selectItem {
        margin:0px 20px 0 0px;
        .deptStyle{
          /deep/ .tree{
            top:34px !important;
            min-width: 250px !important;
          }
          /deep/ .ant-input-affix-wrapper{
            border: 1px solid #dddddd;
            height: 34px;
            line-height: 34px;
            border-radius: 0 4px 4px 0;
            padding-left: 10px;
          }
          /deep/ .u-bottom-border .ant-input{
            border-bottom: none;
          }
        }
        & > .titleTip1 {
          border: 1px solid @borderColor;
          border-right:0px;
          background: @bigBackgroundColor;
          font-size: 14px;
          color: @mainFontColor;
          border-radius:4px 0 0 4px;
          width: 50px;
          height: 34px;
          line-height: 34px;
          text-align: center;
        }
        & > .titleTip2 {
          border: 1px solid @borderColor;
          border-right:0px;
          background: @bigBackgroundColor;
          font-size: 14px;
          color: @mainFontColor;
          border-radius:4px 0 0 4px;
          width: 50px;
          height: 34px;
          line-height: 34px;
          text-align: center;
        }
        /deep/ .ant-select-selection{
          border-radius:0 4px 4px 0
        }
        /deep/ .ant-select-selection__rendered{
          height: 34px;
          line-height: 34px;
        }
        /deep/ .ant-select-selection--single{
          height: 34px;
          line-height: 34px;
        }
        /deep/ .ant-input{
          border-radius:0 4px 4px 0;
          height: 34px;
          line-height: 34px;
        }
      }
    }
    .agentList{
      margin-top: 7px;
      .basicsInfo{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .item{
          display: flex;
          justify-content: flex-start;
          margin-right: 15px;
        }
        .table{
          width: 758px;
          border-left: 1px solid #EEEEEE;
          border-top: 1px solid #EEEEEE;
          font-size: 12px;
          .table-title{
            display: flex;
            background:rgba(246,247,251,1);
            color: #666666;
            & > div {
              flex: 1;
              height: 34px;
              line-height: 34px;
              border-right: 1px solid #EEEEEE;
              border-bottom: 1px solid #EEEEEE;
            }
            .mustFill{
              margin-left: 2px;
              color: #FB4246;
            }
          }
          .house-data {
            display: flex;
            & > div {
              flex: 1;
              height: 34px;
              line-height: 34px;
              text-align: left;
              border-right: 1px solid #EEEEEE;
              border-bottom: 1px solid #EEEEEE;
              background-color: #ffffff;
              font-size: 14px;
              .delete-icon {
                color: red;
                font-size: 14px;
              }
            }
          }
        }
        .add-item-style{
          width: 104px;
          height: 38px;
          line-height: 38px;
          font-size: 14px;
          border-radius:4px;
          border:1px solid rgba(10,135,248,1);
          text-align: center;
          color: #0A87F8;
          i{
            vertical-align: 0em;
            margin-right: 4px;
          }
          svg{
            width: 12px;
            height: 12px;
          }
        }
        .continueAddStyle{
          font-size: 14px;
          color: #0A87F8;
          text-align: center !important;
          i{
            vertical-align: 0em;
            margin-right: 8px;
          }
          svg{
            width: 12px;
            height: 12px;
          }
        }
      }
      /deep/ .ant-popover{
        font-size: 12px;
      }
      /deep/ .ant-popover-inner-content{
        padding: 8px 10px;
      }
    }
  }
</style>