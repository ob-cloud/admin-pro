<template>
  <div class="yunDingLockList-box">
    <div class="house_info">
      需绑门锁房源地址：{{houseObj.houseAlias?houseObj.houseAlias+'/':''}}{{houseObj.fullAddress}}
    </div>
    <div class="detail_info">
        <div class="set_info f-clearfix">
          <div class="selectItem f-fl cityTree">
            <div class="titleTip1 titleTip1With1 f-fl">城市/区域</div>
            <city-town-tree class="f-fl" style="width: 133px;" placeholder="不限" ref="selectCityTown" :showArea="true" :showTown="false" @selectChange="selectCityTownChange"></city-town-tree>
          </div>
          <div class="selectItem f-fl">
            <div class="titleTip1 titleTip1With2 f-fl">房源名称</div>
            <a-input placeholder="输入点击搜索" v-model="sendData.houseName" style="width: 142px;height: 34px"></a-input>
          </div>
          <div class="selectItem f-fl">
            <div class="titleTip1 titleTip1With3 f-fl">小区名</div>
            <a-input placeholder="输入点击搜索" v-model="sendData.communityName" style="width: 154px;height: 34px"></a-input>
          </div>
          <div class="selectItem f-fl">
            <div class="titleTip1 titleTip1With2 f-fl">详细地址</div>
            <a-input placeholder="输入点击搜索" v-model="sendData.houseAddress" style="width: 154px;height: 34px"></a-input>
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
              <div style="max-width: 558px;text-align: left;padding-left: 20px;border-radius: 4px 0px 0px 0px;">安装地址</div>
              <div style="max-width: 302px;text-align: left;padding-left: 9px;">门锁序列号</div>
              <div style="max-width: 98px;text-align: center;border-radius: 0px 4px 0px 0px;">选择</div>
            </div>
            <div class="house-data u-no-border" v-for="(item) in tableData" :key="item.houseId">
              <div class="item" style="max-width:299px;text-align: left;padding-left: 20px;display: flex;align-items: center;" :style="item.roomList.length==1?'height:60px;line-height:60px;':'height:'+item.roomList.length*40+'px;'">
                 <div>
                   <span style="font-size: 14px;color: #111111;">{{item.cityName}}{{item.areaName}}{{item.communityName}}<br/></span>
                   <span style="font-size: 13px;color: #777777;">{{item.houseAddress}}</span>
                 </div>
              </div>
              <div class="item" style="max-width: 658px;" :style="item.roomList.length==1?'height:60px;line-height:60px;':''">
                <div class="itemDetail" v-for="(temp,index) in item.roomList" :class="index==item.roomList.length-1?'itemDetailLast':''">
                  <div style="max-width: 255px;text-align: left;padding-left: 9px;">
                      {{temp.roomName}}
                  </div>
                  <div style="max-width: 302px;text-align: left;padding-left: 9px;">
                      {{temp.lockSn?temp.lockSn:'-'}}
                  </div>
                  <div style="max-width: 98px;text-align: center;background: #F7F8FB;font-size: 14px;color: #BBBBBB;" v-if="!temp.isHaveDoorLock||temp.isHaveDoorLock==0">
                    无门锁
                  </div>
                  <div style="max-width: 98px;text-align: center;background: #F7F8FB;font-size: 14px;color: #BBBBBB;" v-if="temp.isHaveDoorLock&&temp.isHaveDoorLock==1&&temp.isBound==1">
                    已绑定
                  </div>
                  <div style="max-width: 98px;text-align: center;background: #F7F8FB;font-size: 14px;color: #BBBBBB;" v-if="temp.isHaveDoorLock&&temp.isHaveDoorLock==1&&temp.isBound==0&&selectedLockIds.indexOf(temp.lockUuid)>-1&&houseObj.lockId!=temp.lockUuid">
                    已选择
                  </div>
                  <div class="checkStyle cursor" @click="selectedLockUuidFn(item,temp)" style="max-width: 98px;text-align: center;" v-if="temp.isHaveDoorLock&&temp.isHaveDoorLock==1&&temp.isBound==0&&(selectedLockIds.indexOf(temp.lockUuid)==-1||houseObj.lockId==temp.lockUuid)">
                    <icon-font class="selectStyle" v-if="selectedLockUuid==temp.lockUuid" type="iconyumengtubiao_danxuan-yixuanze" />
                    <icon-font class="unSelectStyle" v-else type="iconyumengtubiao_danxuan-weixuanze" />
                  </div>
                </div>
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
import CityTownTree from '@/components/CityTownTree';
import * as API from "@/api/smartDevices";
export default {
  name: "yunDingLockList",
  components: {
    CityTownTree,
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
        areaName:'',
        authAccountId:'',
        cityName:'',
        communityName:'',
        current:1,
        fuzzyKeyword:'',
        houseAddress:'',
        houseName:'',
        size:20,
      },
      tableData:[],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,//每页中显示20条数据
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
    selectedLockUuidFn(item,temp){
      this.selectedObj.houseAddress = item.houseAddress;
      this.selectedObj.custName = temp.lockDescription;
      this.selectedObj.deviceHousePid = item.houseId;
      this.selectedObj.deviceHouseId = temp.roomId;
      this.selectedObj.gwName = temp.gwDescription;
      this.selectedObj.gwOnlineStatus = temp.gwOnoff;
      this.selectedObj.gwUuid = temp.gwUuid;
      this.selectedObj.modelName = temp.lockModelName;
      this.selectedObj.onlineStatus = temp.lockOnoff;
      this.selectedObj.sn = temp.lockSn;
      this.selectedObj.uuid = temp.lockUuid;
      this.selectedLockUuid = temp.lockUuid;
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
    selectCityTownChange(selectObj){
      if(selectObj.cityId&&!selectObj.areaId&&selectObj.name){
        this.sendData.cityName = selectObj.name;
      }
      if(selectObj.areaId&&selectObj.name){
        this.sendData.areaName = selectObj.name;
      }
      if(!selectObj.cityId&&!selectObj.areaId&&!selectObj.name){
        this.sendData.cityName = '';
        this.sendData.areaName = '';
      }
    },
    lockList(){
      API.listPullYundingLock(this.sendData).then(res => {
        if (res&&res.code === "200") {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
          if(this.selectedLockUuid){
            this.tableData.forEach((item)=>{
              item.roomList.forEach((temp)=>{
                if(this.selectedLockUuid == temp.lockUuid){
                  this.selectedLockUuidFn(item,temp);
                }
              });
            });
          }
        }
      })
    },
    clearLockList(){
      this.$refs.selectCityTown.clearData();
      this.sendData.areaName = '';
      this.sendData.cityName = '';
      this.sendData.communityName = '';
      this.sendData.current = 1;
      this.sendData.fuzzyKeyword = '';
      this.sendData.houseAddress = '';
      this.sendData.houseName = '';
      this.sendData.size = 20;
      this.lockList();
    },
  }
}
</script>

<style scoped lang="less">
  .yunDingLockList-box{
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
        margin-bottom: 6px;
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
                .itemDetail{
                  display: flex;
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
                  & > div {
                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #EEEEEE;
                    border-right: 1px solid #EEEEEE;
                  }
                  & > div:last-child {
                    border-right: none;
                  }
                }
                .itemDetailLast{
                  & > div {
                    border-bottom: none !important;
                  }
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