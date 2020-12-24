<template>
  <div class="guoJiaLockList-box">
    <div class="house_info">
      需绑门锁房源地址：{{houseObj.houseAlias?houseObj.houseAlias+'/':''}}{{houseObj.fullAddress}}
    </div>
    <div class="detail_info">
      <div class="set_info f-clearfix">
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">门锁编码</div>
          <a-input placeholder="输入点击搜索" v-model="sendData.lockNo" style="width: 144px;height: 34px"></a-input>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">网关编码</div>
          <a-input placeholder="输入点击搜索" v-model="sendData.gwNo" style="width: 144px;height: 34px"></a-input>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">房源编码</div>
          <a-input placeholder="输入点击搜索" v-model="sendData.houseNo" style="width: 144px;height: 34px"></a-input>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">房间编码</div>
          <a-input placeholder="输入点击搜索" v-model="sendData.roomNo" style="width: 149px;height: 34px"></a-input>
        </div>
        <div class="selectItem searchButtonStyle cursor f-fl" @click="lockList">
          <icon-font type="iconyumengtubiao_sousuo" />
        </div>
        <div class="clearStyle f-fl cursor" @click="clearLockList">
          清空
        </div>
      </div>
      <div class="lockList_info">
        <div class="basicsInfo" :style="tableData.length==0?'padding-bottom: 20px;':''">
          <div class="table">
            <div class="table-title">
              <div style="max-width: 86px;text-align: left;padding-left: 15px;border-radius: 4px 0px 0px 0px;">门锁状态</div>
              <div style="max-width: 120px;text-align: left;padding-left: 15px;">门锁编码</div>
              <div style="max-width: 101px;text-align: left;padding-left: 15px;">电量</div>
              <div style="max-width: 301px;text-align: left;padding-left: 15px;">安装地址</div>
              <div style="max-width: 125px;text-align: left;padding-left: 15px;">房源编码</div>
              <div style="max-width: 125px;text-align: left;padding-left: 15px;">房间编码</div>
              <div style="max-width: 98px;text-align: center;border-radius: 0px 4px 0px 0px;">选择</div>
            </div>
            <div class="house-data u-no-border" v-for="(item) in tableData" :key="item.houseId" >
              <div class="item" style="max-width: 86px;text-align: left;padding-left: 15px;">
                {{item.gwOnlineStatus==1?'在线':item.gwOnlineStatus==2?'离线':'-'}}
              </div>
              <div class="item" style="max-width: 120px;text-align: left;padding-left: 15px;">
                {{item.lockNo?item.lockNo:'-'}}
              </div>
              <div class="item" style="max-width: 101px;text-align: left;padding-left: 15px;">
                {{item.power?item.power+'%':'-'}}
              </div>
              <a-popover>
                <template slot="content">
                  <p style="padding: 8px 18px;">
                    {{item.address}}
                  </p>
                </template>
                <div class="item overHidde" style="max-width: 301px;text-align: left;padding-left: 15px;">
                  {{item.address?item.address:'-'}}
                </div>
              </a-popover>
              <div class="item" style="max-width: 125px;text-align: left;padding-left: 15px;">
                {{item.houseCode?item.houseCode:'-'}}
              </div>
              <div class="item" style="max-width: 125px;text-align: left;padding-left: 15px;">
                {{item.roomCode?item.roomCode:'-'}}
              </div>
              <div class="item" style="max-width: 98px;text-align: center;background: #F7F8FB;font-size: 14px;color: #BBBBBB;" v-if="item.isBound==1">
                已绑定
              </div>
              <div class="item" style="max-width: 98px;text-align: center;background: #F7F8FB;font-size: 14px;color: #BBBBBB;" v-if="item.isBound==0&&selectedLockIds.indexOf(item.lockNo)>-1&&houseObj.lockId!=item.lockNo">
                已选择
              </div>
              <div class="checkStyle item cursor" @click="selectedLockUuidFn(item)" style="max-width: 98px;text-align: center;" v-if="item.isBound==0&&(selectedLockIds.indexOf(item.lockNo)==-1||houseObj.lockId==item.lockNo)">
                <icon-font class="selectStyle" v-if="selectedLockUuid==item.lockNo" type="iconyumengtubiao_danxuan-yixuanze" />
                <icon-font class="unSelectStyle" v-else type="iconyumengtubiao_danxuan-weixuanze" />
              </div>
            </div>
            <div class="house-no-data u-no-border" v-if="tableData.length==0">
              <div style="padding-top: 40px;text-align: center;">
                <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
              </div>
              <div style="margin:20px 0 100px 0;color: #777777;font-size: 14px;text-align: center">
                没有可选择门锁
              </div>
            </div>
          </div>
        </div>
        <div class="contFoot" v-show="tableData.length>0">
        <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
      </div>
      </div>
      <div class="clearfix" style="margin-top: 15px;">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSelect">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="confirmSelect">
            确定选择
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/smartDevices";

export default {
  name: "guoJiaLockList",
  components: {
  },
  props: {
    houseObj: {
      type: Object,
    },
    selectedLockIds:{
      type:Array,
    },
  },
  data() {
    return {
      sendData:{
        authAccountId:'',
        current:1,
        size:10,
        lockNo:undefined,
        gwNo:undefined,
        houseNo:undefined,
        roomNo:undefined,
      },
      tableData:[],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      selectedLockUuid:'',
      selectedObj:{
        houseAddress:'',
        custName:'',
        deviceHouseId:'',
        deviceHousePid:'',
        gwName:'',
        gwOnlineStatus:'',
        gwUuid:'',
        modelName:'',
        onlineStatus:'',
        sn:'',
        uuid:'',
      },
      index:'',
      lockIndex:-1,
    }
  },
  created() {
    if(this.houseObj){
      if(this.houseObj.authAccountId){
        this.sendData.authAccountId = this.houseObj.authAccountId;
      }
      this.index = this.houseObj.index;
      this.lockIndex = this.houseObj.lockIndex;
      if(this.houseObj.lockId){
        this.selectedLockUuid = this.houseObj.lockId;
      }
    }
    this.lockList();
  },
  methods: {
    selectedLockUuidFn(item){
      this.selectedObj.houseAddress = item.address;
      this.selectedObj.custName = '';
      this.selectedObj.deviceHousePid = item.houseCode;
      this.selectedObj.deviceHouseId = item.roomCode;
      this.selectedObj.gwName = '';
      this.selectedObj.gwOnlineStatus = item.gwOnlineStatus;
      this.selectedObj.gwUuid = item.gwNo;
      this.selectedObj.model = item.model;
      this.selectedObj.onlineStatus = item.onlineStatus;
      this.selectedObj.sn = '';
      this.selectedObj.uuid = item.lockNo;
      this.selectedObj.power = item.power;
      this.selectedLockUuid = item.lockNo;
    },
    cancelSelect(){
      this.$emit('cancelSelect');
    },
    confirmSelect(){
      if(!this.selectedObj.uuid){
        this.$message.warning('请选择一智能门锁');
        return ;
      }
      this.$emit('confirmSelect',this.selectedObj,this.index,this.lockIndex)
    },
    onSizeChange(current){
      this.sendData.current = current;
      this.pagination.current = current;
      this.lockList();
    },
    onShowSizeChange(current, pageSize){
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.pagination.current = current;
      this.lockList();
    },
    lockList(){
      if(!this.sendData.lockNo){
        this.sendData.lockNo = undefined;
      }
      if(!this.sendData.gwNo){
        this.sendData.gwNo = undefined;
      }
      if(!this.sendData.houseNo){
        this.sendData.houseNo = undefined;
      }
      if(!this.sendData.roomNo){
        this.sendData.roomNo = undefined;
      }
      API.listPullGuojiaLock(this.sendData).then(res => {
        if (res&&res.code === "200") {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
          if(this.selectedLockUuid){
            this.tableData.forEach((item)=>{
              if(this.selectedLockUuid == item.lockNo){
                this.selectedLockUuidFn(item);
              }
            })
          }
        }
      })
    },
    clearLockList(){
      this.sendData.current = 1;
      this.sendData.size = 10;
      this.sendData.lockNo = undefined;
      this.sendData.gwNo = undefined;
      this.sendData.houseNo = undefined;
      this.sendData.roomNo = undefined;
      this.lockList();
    },
  },
}
</script>

<style scoped lang="less">
  .guoJiaLockList-box{
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    .house_info{
      height: 40px;
      line-height: 40px;
      background: #E9F1FF;
      opacity: 0.99;
      color: #777777;
      font-size: 14px;
      padding-left: 20px;
    }
    .detail_info{
      padding: 20px;
      .set_info {
        margin-bottom: 20px;
        .searchButtonStyle{
          width: 34px;
          height: 34px;
          background: #0A87F8;
          border-radius: 4px;
          svg{
            margin: 7px;
            width: 20px;
            height: 20px;
            color: #ffffff;
          }
        }
        .clearStyle{
          width: 42px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          background: #EEEEEE;
          border-radius: 4px;
          border: 1px solid #DDDDDD;
          color: #111111;
          font-size: 13px;
        }
        .selectItem {
          margin:0px 10px 0 0px;
          & > .titleTip1 {
            border: 1px solid @borderColor;
            border-right:0px;
            background: @bigBackgroundColor;
            font-size: 13px;
            color: #777777;
            border-radius:4px 0 0 4px;
            height: 34px;
            line-height: 34px;
            text-align: center;
          }
          .titleTip1With1{
            width: 73px;
          }
          .titleTip1With2{
            width: 62px;
          }
          .titleTip1With3{
            width: 49px;
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
            border: 1px solid #DDDDDD;
            padding-left: 8px;
          }
          /deep/ .tree-wrap .tree{
            width: 250px;
            top:34px !important;
          }
        }
        .cityTree{
          /deep/ .tree-wrap .tree .content{
            border-top: 1px solid #DDDDDD;
          }
        }
      }
      .lockList_info{
        min-height: 400px;
        .basicsInfo{
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .table{
            width: 954px;
            border-left: 1px solid #EEEEEE;
            border-top: 1px solid #EEEEEE;
            font-size: 12px;
            border-radius: 4px;
            .table-title{
              width: 954px;
              display: flex;
              background: #F7F8FB;
              color: #777777;
              font-size: 13px;
              border-radius: 4px 4px 0px 0px;
              & > div {
                flex: 1;
                height: 40px;
                line-height: 40px;
                border-right: 1px solid #EEEEEE;
                border-bottom: 1px solid #EEEEEE;
              }
            }
            .house-no-data{
              width: 954px;
              border-radius: 0px 0px 4px 4px;
              border-right: 1px solid #EEEEEE;
              border-bottom: 1px solid #EEEEEE;
              background-color: #ffffff;
            }
            .house-data {
              width: 954px;
              display: flex;
              color: #111111;
              font-size: 13px;
              border-radius: 0px 0px 4px 4px;
              .item {
                flex: 1;
                text-align: left;
                border-right: 1px solid #EEEEEE;
                border-bottom: 1px solid #EEEEEE;
                background-color: #ffffff;
                height: 40px;
                line-height: 40px;
              }
              .checkStyle{
                svg{
                  width: 16px;
                  height: 16px;
                }
                .selectStyle{
                  color: #0A87F8;
                }
                .unSelectStyle{
                  color:#777777;
                }
              }
              .houseAddress{
                height:20px;
                border-radius:2px;
                color: #0A87F8;
                background-color: #f0f8ff;
                font-size: 12px;
                text-align: center;
                padding: 5px 5px;
                margin-right: 5px;
              }
              /deep/ .ant-input{
                height: 38px;
                line-height: 38px;
                padding-left: 14px;
              }
              .borderRed{
                border: 1px solid red !important;
              }
              .mustStyle{
                input::-webkit-input-placeholder {
                  color: #FB4246;
                }

                input:-moz-placeholder {
                  color: #FB4246;
                }

                input::-moz-placeholder {
                  color: #FB4246;
                }

                input::-ms-input-placeholder {
                  color: #FB4246;
                }
              }
            }
          }
        }
        .contFoot {
          margin-top: 0px;
          width: 100%;
          height: 56px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-right: 20px; // position: absolute;
          background-color: #fff;
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
  }
</style>