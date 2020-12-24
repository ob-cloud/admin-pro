<template>
  <div class="infoTransfer-box">
    <div class="numStyle">
      <span>（已选择</span><span style="color: #0A87F8;">「{{ changeCount }}」</span><span>间房源）</span>
    </div>
    <div class="searchStyle">
      <div class="titleStyle">确定要对以下条件范围内的数据批量修改吗？</div>
      <div class="contentStyle clearfix">
        <div class="f-fl itemStyle" v-for="(item,index) in searchData" :key="index">
          {{item.title}}：<span :style="item.style">{{item.val}}</span>
        </div>
      </div>
    </div>
    <div class="priceStyle">
      <div class="line1Style">
        <span class="titleStyle">房源所属门店</span><span>(部门)</span>
        <span class="redStyle">*</span>
      </div>
      <div class="line2Style">
        <label-item title="" class="u-bottom-border deptStyle f-fl">
          <store-tree placement="bottomLeft" placeholder="请选择门店(部门)" ref="selectDept" @cancelOtherTree="cancelOtherTree(1)" style="width: 100%" @selectChange="selectDept" :show-employee="false"></store-tree>
        </label-item>
      </div>
      <div class="line1Style" style="margin-top: 25px;">
        <span class="titleStyle">维护人</span>
      </div>
      <div>
        <label-item style="width: 100%;">
          <dept-employee-tree placement="bottomLeft" placeholder="请选择维护人" resMark="mk_house_decentralized" ref="selectDeptEmp" @cancelOtherTree="cancelOtherTree(2)" @selectChange="selectDeptEmp" :disableDept="true"></dept-employee-tree>
        </label-item>
      </div>
      <div class="line3Style">
        <span>保存后，已选房源将转移到现在选择的所属门店(部门)和维护人名下</span>
      </div>
    </div>
    <div class="clearfix">
      <div class="buttonDiv f-fr" style="margin-top:89px;">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelChange">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmChange">
          确定
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '@/api/decentralizedHouse';
import StoreTree from '@/components/DeptEmployeeTree/store';
import deptEmployeeTree from "@/components/DeptEmployeeTree/index";
export default {
  name: "infoTransfer",
  props: {
    statusIndex:{
      Type:Number,
    },
    changeCount:{
      Type:Number,
    },
    setSearchCondition:{
      Type:Object,
    },
    sendData:{
      Type:Object,
    },
  },
  components: {
    StoreTree,
    deptEmployeeTree,
  },
  data() {
    return {
      saveLoading:false,
      originSearchCon:[
        '部门/人员','城市/区域','房源类型','业务状态','户型','出租价格','房屋面积','空置天数', '朝向','装修类型','是否有图','预计离房时间'

      ],
      firstSearchCon:[
        '全部','综合检索','房源编号','房源地址','门牌号','租客姓名','租客电话','业主姓名','业主电话','标签'
      ],
      searchData:[],
      statusObj:{},
      firstSearchObj:undefined,
      targetDeptId:'',
      maintainerId:'',
    };
  },
  created() {
    this.initStatus();
    this.initFirstSearch();
    this.initSearchCon();
  },
  methods: {
    selectDept(selectObj) {
      if (selectObj.type == 'dept') {
        this.targetDeptId = selectObj.id;
      }
      if(!selectObj.type&&!selectObj.name){
        this.targetDeptId = '';
      }
    },
    cancelOtherTree(val){
      if(val==1){
        this.$refs.selectDeptEmp.showTree = false;
      }
      if(val==2){
        this.$refs.selectDept.showTree = false;
      }
    },
    selectDeptEmp(selectObj){
      if (selectObj.type == 'employee') {
        this.maintainerId = selectObj.id;
      }
    },
    //来自自定义搜索
    filterOption(inputValue,option){
      if(!inputValue){
        return true;
      }
      return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
    },
    goBack(){
      this.$emit('changeSuccess');
    },
    initFirstSearch(){
      this.setSearchCondition.forEach((item)=>{
        this.firstSearchCon.forEach((temp)=>{
          if(item.title==temp){
            let title = '';
            if(temp == '全部'){
              title = '综合检索';
            } else {
              title = temp;
            }
            let obj = {
              title:title,
              val:item.val,
              style:'color:#111111',
            }
            this.firstSearchObj = obj;
          }
        });
      });
    },
    initSearchCon(){
      let titleList = [];
      this.setSearchCondition.forEach((item)=>{
        this.originSearchCon.forEach((temp)=>{
          if(item.title==temp){
            titleList.push(temp);
          }
        });
      });
      this.searchData.push(this.statusObj);
      if(this.firstSearchObj){
        this.searchData.push(this.firstSearchObj);
      }
      this.originSearchCon.forEach((temp)=>{
        if(titleList.indexOf(temp)>-1){
          this.setSearchCondition.forEach((item)=>{
            if(item.title == temp){
              let obj = {
                title:temp,
                val:item.val,
                style:'color:#111111',
              };
              this.searchData.push(obj);
            }
          });
        }
        else{
          let obj ={
            title:temp,
            val:'全部',
            style:'color:#777777',
          };
          this.searchData.push(obj);
        }
      });
    },
    initStatus(){
      let obj ={};
      if(this.statusIndex==0){
        obj = {
          title:'房源状态',
          val:'全部',
          style:'color:#777777',
        };
      }
      else if(this.statusIndex==1){
        obj = {
          title:'房源状态',
          val:'空置',
          style:'color:#111111',
        };
      }
      else if(this.statusIndex==2){
        obj = {
          title:'房源状态',
          val:'已租',
          style:'color:#111111',
        };
      }
      else if(this.statusIndex==3){
        obj = {
          title:'房源状态',
          val:'配置',
          style:'color:#111111',
        };
      }
      else if(this.statusIndex==4){
        obj = {
          title:'房源状态',
          val:'锁房',
          style:'color:#111111',
        };
      }
      else if(this.statusIndex==5){
        obj = {
          title:'房源状态',
          val:'关闭',
          style:'color:#111111',
        };
      }
      this.statusObj = obj;
    },
    cancelChange(){
      this.$emit('cancel');
    },
    confirmChange(){
      if(!this.targetDeptId){
        this.$message.warning('请选择房源所属部门');
        return ;
      }
      let sendData = Object.assign({},this.sendData);
      sendData.targetDeptId = this.targetDeptId;
      if(this.maintainerId){
        sendData.targetMaintainerId = this.maintainerId;
      }
      this.saveLoading = true;
      API.batchModifyHouseAttribution(sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
          this.$emit('changeSuccess');
        }
        else{
          this.saveLoading = false;
        }
      });
    },
  },
}
</script>

<style lang="less" scoped>
.infoTransfer-box{
  .numStyle{
    color: #777777;
    font-size: 12px;
    position: absolute;
    top:15px;
    left: 120px;
  }
  .searchStyle{
    background: #E7F1FF;
    padding: 15px 20px 10px 20px;
    .titleStyle{
      font-size: 13px;
      color: #777777;
      width: 100%;
      margin-bottom: 10px;
    }
    .contentStyle{
      & > div:last-child {
        margin-right: 0;
      }
      .itemStyle{
        padding: 3px 8px;
        font-size: 12px;
        color: #777777;
        background: #FFFFFF;
        border-radius: 11px;
        margin:0 5px 5px 0;
      }
    }
  }
  .priceStyle{
    padding: 24px 20px 0 20px;
    .line1Style{
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
    .line2Style{
      /deep/ .ant-select-selection__rendered{
        margin-left: 0px;
      }
      width: 100%;
      height: 34px;
      .deptStyle{
        width: 100%;
      }
    }
    .line3Style{
      margin-top: 15px;
      color: #FFA036;
      font-size: 12px;
    }
  }
  .buttonDiv {
    margin: 107px 20px 20px 0;
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