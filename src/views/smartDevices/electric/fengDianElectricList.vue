<template>
  <div class="fengDianElectricList-box">
    <div class="house_info">
      需绑电表房源地址：{{houseObj.houseAlias?houseObj.houseAlias+'/':''}}{{houseObj.fullAddress}}
    </div>
    <div class="detail_info">
      <div class="set_info f-clearfix">
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With1 f-fl">设备序列号</div>
          <a-input placeholder="输入点击搜索" v-model="sendData.sn" style="width: 200px;height: 34px"></a-input>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">详细地址</div>
          <a-input placeholder="输入点击搜索" v-model="sendData.fuzzyKeyword" style="width: 514px;height: 34px"></a-input>
        </div>
        <div class="selectItem searchButtonStyle cursor f-fl" @click="electricList">
          <icon-font type="iconyumengtubiao_sousuo" />
        </div>
        <div class="clearStyle f-fl cursor" @click="clearElectricList">
          清空
        </div>
      </div>
      <div class="electricList_info">
        <div class="basicsInfo" :style="tableData.length==0?'padding-bottom: 20px;':''">
          <div class="table">
            <div class="table-title">
              <div style="max-width: 558px;text-align: left;padding-left: 20px;border-radius: 4px 0px 0px 0px;">安装地址</div>
              <div style="max-width: 302px;text-align: left;padding-left: 9px;">电表序列号</div>
              <div style="max-width: 98px;text-align: center;border-radius: 0px 4px 0px 0px;">选择</div>
            </div>
            <div class="house-data u-no-border" v-for="(item) in tableData" :key="item.houseId">
              <div class="item" style="max-width:299px;text-align: left;padding-left: 20px;display: flex;align-items: center;" :style="item.meterInfoList.length<=1?'height:60px;line-height:60px;':'height:'+item.meterInfoList.length*40+'px;'">
                 <div>
                   <span style="font-size: 13px;color: #777777;">{{item.houseAddress}}</span>
                 </div>
              </div>
              <div class="item" style="max-width: 658px;" :style="item.meterInfoList.length<=1?'height:60px;line-height:60px;':''">
                <div class="itemDetail" v-for="(temp,index) in item.meterInfoList" :class="index==item.meterInfoList.length-1?'itemDetailLast':''">
                  <div style="max-width: 255px;text-align: left;padding-left: 9px;">
                      {{temp.name}}
                  </div>
                  <div style="max-width: 302px;text-align: left;padding-left: 9px;">
                      {{temp.sn?temp.sn:'-'}}
                  </div>
                  <div style="max-width: 98px;text-align: center;background: #F7F8FB;font-size: 14px;color: #BBBBBB;" v-if="!temp.isHaveElectricMeter||temp.isHaveElectricMeter==0">
                    无电表
                  </div>
                  <div style="max-width: 98px;text-align: center;background: #F7F8FB;font-size: 14px;color: #BBBBBB;" v-if="temp.isHaveElectricMeter&&temp.isHaveElectricMeter==1&&temp.isBound==1">
                    已绑定
                  </div>
                  <div style="max-width: 98px;text-align: center;background: #F7F8FB;font-size: 14px;color: #BBBBBB;" v-if="temp.isHaveElectricMeter&&temp.isHaveElectricMeter==1&&temp.isBound==0&&selectedElectricIds.indexOf(temp.uuid)>-1&&houseObj.electricId!=temp.uuid">
                    已选择
                  </div>
                  <div class="checkStyle cursor" @click="selectedElectricUuidFn(item,temp)" style="max-width: 98px;text-align: center;" v-if="temp.isHaveElectricMeter&&temp.isHaveElectricMeter==1&&temp.isBound==0&&(selectedElectricIds.indexOf(temp.uuid)==-1||houseObj.electricId==temp.uuid)">
                    <icon-font class="selectStyle" v-if="selectedUuid==temp.uuid" type="iconyumengtubiao_danxuan-yixuanze" />
                    <icon-font class="unSelectStyle" v-else type="iconyumengtubiao_danxuan-weixuanze" />
                  </div>
                </div>
                <div class="itemDetailNoData" v-if="item.meterInfoList.length==0">
                  <div style="max-width: 559px;text-align: left;padding-left: 9px;">
                    -
                  </div>
                  <div style="max-width: 97px;text-align: center;background: #F7F8FB;font-size: 14px;color: #BBBBBB;">
                    无电表
                  </div>
                </div>
              </div>
            </div>
            <div class="house-no-data u-no-border" v-if="tableData.length==0">
              <div style="padding-top: 40px;text-align: center;">
                <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
              </div>
              <div style="margin:20px 0 100px 0;color: #777777;font-size: 14px;text-align: center">
                没有可选择电表
              </div>
            </div>
          </div>
        </div>
        <div class="contFoot" v-show="tableData.length>0">
          <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
        </div>
      </div>
      <div class="clearfix" style="margin-top: 15px;">
        <div class="warningStyle clearfix f-fl cursor" @click="freshData()">
          <div class="f-fl" style="color: #FFA036;font-size: 14px;">
            <a-icon style="color: #FFA036;margin-right: 5px;" type="exclamation-circle" />如找不到您要的设备，请点击“同步设备数据”
          </div>
          <div class="f-fl" style="color: #0A87F8;font-size: 14px;margin-left: 30px;">
            <icon-font :class="{'imgrotate_common':syncInfoLoading}" style="margin-right: 3px;" type="iconyumengtubiao_zhongzhi" />同步设备数据
          </div>
        </div>
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
  name: "fengDianElectricList",
  components: {
  },
  props: {
    houseObj: {
      type: Object,
    },
    selectedElectricIds:{
      type:Array,
    },
  },
  data() {
    return {
      sendData:{
        current:1,
        fuzzyKeyword:'',
        sn:'',
        size:20,
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
      selectedUuid:'',
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
      electricIndex:-1,
      syncInfoLoading:false,
    }
  },
  created() {
    if(this.houseObj){
      if(this.houseObj.authAccountId){
        this.sendData.authAccountId = this.houseObj.authAccountId;
      }
      this.index = this.houseObj.index;
      this.electricIndex = this.houseObj.electricIndex;
      if(this.houseObj.electricId){
        this.selectedUuid = this.houseObj.electricId;
      }
    }
    this.electricList();
  },
  methods: {
    freshData(){
      let parameter = {
        id:this.houseObj.authAccountId,
      };
      this.syncInfoLoading = true;
      API.powerbeeDeviceSync(parameter).then(res => {
        if(!res){
          this.syncInfoLoading = false;
        }
        if (res&&res.code === "200") {
          this.$message.success('同步成功');
          this.electricList();
          this.syncInfoLoading = false;
        }
        else{
          this.syncInfoLoading = false;
        }
      })
    },
    selectedElectricUuidFn(item,temp){
        this.selectedObj.houseAddress = item.houseAddress;
        this.selectedObj.deviceHousePid = item.houseId;
        this.selectedObj.deviceHouseId = temp.roomId;
        this.selectedObj.uuid = temp.uuid;		      this.selectedObj.uuid = temp.uuid;
        this.selectedObj.address = temp.address;
        this.selectedObj.gwUuid = temp.gwUuid;
        this.selectedObj.isBound = temp.isBound;
        this.selectedObj.address = temp.address;
        this.selectedObj.name = temp.name;
        this.selectedObj.onlineStatus = temp.onlineStatus;
        this.selectedObj.paymentMode = temp.paymentMode;
        this.selectedObj.powerUsed = temp.powerUsed;
        this.selectedObj.powerUsedRefTime = temp.powerUsedRefTime;
        this.selectedObj.sn = temp.sn;
        this.selectedObj.status = temp.status;
        this.selectedObj.deviceId = temp.deviceId;
        this.selectedUuid = temp.uuid;
    },
    cancelSelect(){
      this.$emit('cancelSelect');
    },
    confirmSelect(){
      if(!this.selectedObj.uuid){
          this.$message.warning('请选择一智能电表');
          return ;
      }
      this.$emit('confirmSelect',this.selectedObj,this.index,this.electricIndex)
    },
    onSizeChange(current){
      this.sendData.current = current;
      this.pagination.current = current;
      this.electricList();
    },
    onShowSizeChange(current, pageSize){
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.pagination.current = current;
      this.electricList();
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
    electricList(){
      API.listPullPowerbeeElectricMeter(this.sendData).then(res => {
        if(!res){
          this.syncInfoLoading = false;
        }
        if (res&&res.code === "200") {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
          if(this.selectedUuid){
            this.tableData.forEach((item)=>{
              item.meterInfoList.forEach((temp)=>{
                if(this.selectedUuid == temp.uuid){
                  this.selectedElectricUuidFn(item,temp);
                }
              });
            });
          }
          this.syncInfoLoading = false;
        }
        else{
          this.syncInfoLoading = false;
        }
      })
    },
    clearElectricList(){
      this.sendData.sn = '';
      this.sendData.fuzzyKeyword = '';
      this.sendData.current = 1;
      this.sendData.size = 10;
      this.electricList();
    },
  }
}
</script>

<style scoped lang="less">
  .fengDianElectricList-box{
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
      .electricList_info{
        min-height: 400px;
        padding-top: 10px;
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
                .itemDetailNoData{
                  display: flex;
                  & > div {
                    flex: 1;
                    height: 60px;
                    line-height: 60px;
                    border-bottom: 1px solid #EEEEEE;
                    border-right: 1px solid #EEEEEE;
                  }
                  & > div:last-child {
                    border-right: none;
                  }
                }
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
      .warningStyle{
        height: 40px;
        line-height: 40px;
        svg{
          width: 15px;
          height: 15px;
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
    @-webkit-keyframes changeright{
      0%{-webkit-transform:rotate(0deg);}
      50%{-webkit-transform:rotate(-180deg);}
      100%{-webkit-transform:rotate(-360deg);}
    }
    .imgrotate_common{
      -webkit-animation:changeright 3s linear infinite;
    }
  }
</style>