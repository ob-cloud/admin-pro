<template>
  <div class="goodStatistics-box">
    <div class="detail_info">
      <div class="set_info f-clearfix">
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">物品类型</div>
          <a-select style="width: 100px;" v-model="sendData.goodsTypeId" placeholder="不限" :allowClear="true" @change="assetsCategoryStat">
            <a-select-option v-for="(item) in goodTypeList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">物品归属</div>
          <a-select style="width: 90px;" v-model="sendData.ownerType" placeholder="不限" :allowClear="true" @change="assetsCategoryStat">
            <a-select-option v-for="(item) in ownerTypeList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">物品品牌</div>
          <a-select style="width: 100px;" :showSearch="true" :filterOption="(inputValue,option)=>filterOptionBrand(inputValue,option)" :allowClear="true" @change="assetsCategoryStat" v-model="sendData.brandId" placeholder="请选择">
            <a-select-option v-for="(item) in brandList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">购入日期</div>
          <a-range-picker @change="(date,dateString)=>changeDatePurchase(date, dateString)" :format="dateFormat" v-model="timeDateList1"/>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">质保日期</div>
          <a-range-picker @change="(date,dateString)=>changeDateWarranty(date, dateString)" :format="dateFormat" v-model="timeDateList2"/>
        </div>
        <div class="clearStyle f-fl cursor" @click="clearSelect">
          清空
        </div>
        <div class="selectItem searchButtonStyle cursor f-fr" @click="goExport">
          <icon-font type="iconyumengtubiao_xiazai1" />
        </div>

      </div>
      <div class="lockList_info">
        <div class="basicsInfo" :style="totalData.statDataList&&totalData.statDataList.length==0?'padding-bottom: 20px;':''">
          <div class="table">
            <div class="table-title">
              <div class="lineStyle" style="max-width: 72px;border-radius: 4px 0px 0px 0px;">物品类型</div>
              <div class="lineStyle" style="max-width: 59px;">物品</div>
              <div class="lineStyle" style="max-width: 60px;">总数量</div>
              <div class="lineStyle" style="max-width: 112px;">总价(元)</div>
              <div style="max-width: 141px;">
                <div class="numTileStyle borderBottomStyle">闲置</div>
                <div class="numTileStyle itemStyle">
                  <div class="numStyle borderRightStyle" style="max-width: 49px;">数量</div>
                  <div class="numStyle" style="max-width: 91px;">总价(元)</div>
                </div>
              </div>
              <div style="max-width: 141px;">
                <div class="numTileStyle borderBottomStyle">使用中</div>
                <div class="numTileStyle itemStyle">
                  <div class="numStyle borderRightStyle" style="max-width: 49px;">数量</div>
                  <div class="numStyle" style="max-width: 91px;">总价(元)</div>
                </div>
              </div>
              <div style="max-width: 141px;">
                <div class="numTileStyle borderBottomStyle">已报废</div>
                <div class="numTileStyle itemStyle">
                  <div class="numStyle borderRightStyle" style="max-width: 49px;">数量</div>
                  <div class="numStyle" style="max-width: 91px;">总价(元)</div>
                </div>
              </div>
              <div style="max-width: 141px;border-radius: 0px 4px 0px 0px;" >
                <div class="numTileStyle borderBottomStyle">遗失</div>
                <div class="numTileStyle itemStyle">
                  <div class="numStyle borderRightStyle" style="max-width: 49px;">数量</div>
                  <div class="numStyle" style="max-width: 91px;">总价(元)</div>
                </div>
              </div>
              <div style="max-width: 141px;border-radius: 0px 4px 0px 0px;" >
                <div class="numTileStyle borderBottomStyle">未核对</div>
                <div class="numTileStyle itemStyle">
                  <div class="numStyle borderRightStyle" style="max-width: 49px;">数量</div>
                  <div class="numStyle" style="max-width: 91px;">总价(元)</div>
                </div>
              </div>
              <div style="max-width: 146px;border-radius: 0px 4px 0px 0px;" >
                <div class="numTileStyle borderBottomStyle">地址归属异常</div>
                <div class="numTileStyle itemStyle">
                  <div class="numStyle borderRightStyle" style="max-width: 49px;">数量</div>
                  <div class="numStyle" style="max-width: 97px;">总价(元)</div>
                </div>
              </div>
            </div>
            <div class="house-data" v-for="(item,index) in totalData.statDataList" :key="index">
              <div class="fontStyle1" style="max-width: 72px;">{{item.goodsTypeName}}</div>
              <div class="fontStyle1" style="max-width: 59px;">{{item.goodsName}}</div>
              <div class="fontStyle2" style="max-width: 60px;">{{item.totalQuantity}}</div>
              <div class="fontStyle1" style="max-width: 112px;">{{item.totalPrice/100}}</div>
              <div class="fontStyle2" style="max-width: 49px;">{{item.idleTotalQuantity}}</div>
              <div class="fontStyle1" style="max-width: 92px;">{{item.idleTotalPrice/100}}</div>
              <div class="fontStyle2" style="max-width: 49px;">{{item.usingTotalQuantity}}</div>
              <div class="fontStyle1" style="max-width: 92px;">{{item.usingTotalPrice/100}}</div>
              <div class="fontStyle2" style="max-width: 49px;">{{item.scrappedTotalQuantity}}</div>
              <div class="fontStyle1" style="max-width: 92px;">{{item.scrappedTotalPrice/100}}</div>
              <div class="fontStyle2" style="max-width: 49px;">{{item.lostTotalQuantity}}</div>
              <div class="fontStyle1" style="max-width: 92px;">{{item.lostTotalPrice/100}}</div>
              <div class="fontStyle2" style="max-width: 49px;">{{item.uncheckedTotalQuantity}}</div>
              <div class="fontStyle1" style="max-width: 92px;">{{item.uncheckedTotalPrice/100}}</div>
              <div class="fontStyle2" style="max-width: 49px;">{{item.locationAbnormalTotalQuantity}}</div>
              <div class="fontStyle1" style="max-width: 97px;">{{item.locationAbnormalTotalPrice/100}}</div>
            </div>
            <div class="house-data totalStyle" v-if="totalData.statDataList&&totalData.statDataList.length>0">
              <div class="fontStyle1 fontStyleBig" style="max-width: 131px;">合计</div>
              <div class="fontStyle2 fontStyleBig" style="max-width: 60px;">{{totalData.totalQuantity}}</div>
              <div class="fontStyle1 fontStyleBig" style="max-width: 112px;">{{totalData.totalPrice/100}}</div>
              <div class="fontStyle2 fontStyleBig" style="max-width: 49px;">{{totalData.idleTotalQuantity}}</div>
              <div class="fontStyle1 fontStyleBig" style="max-width: 92px;">{{totalData.idleTotalPrice/100}}</div>
              <div class="fontStyle2 fontStyleBig" style="max-width: 49px;">{{totalData.usingTotalQuantity}}</div>
              <div class="fontStyle1 fontStyleBig" style="max-width: 92px;">{{totalData.usingTotalPrice/100}}</div>
              <div class="fontStyle2 fontStyleBig" style="max-width: 49px;">{{totalData.scrappedTotalQuantity}}</div>
              <div class="fontStyle1 fontStyleBig" style="max-width: 92px;">{{totalData.scrappedTotalPrice/100}}</div>
              <div class="fontStyle2 fontStyleBig" style="max-width: 49px;">{{totalData.lostTotalQuantity}}</div>
              <div class="fontStyle1 fontStyleBig" style="max-width: 92px;">{{totalData.lostTotalPrice/100}}</div>
              <div class="fontStyle2 fontStyleBig" style="max-width: 49px;">{{totalData.uncheckedTotalQuantity}}</div>
              <div class="fontStyle1 fontStyleBig" style="max-width: 92px;">{{totalData.uncheckedTotalPrice/100}}</div>
              <div class="fontStyle2 fontStyleBig" style="max-width: 49px;">{{totalData.locationAbnormalTotalQuantity}}</div>
              <div class="fontStyle1 fontStyleBig" style="max-width: 97px;">{{totalData.locationAbnormalTotalPrice/100}}</div>
            </div>
            <div class="house-no-data u-no-border" v-if="!totalData.statDataList||totalData.statDataList.length==0">
              <div style="padding-top: 40px;text-align: center;">
                <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
              </div>
              <div style="margin:20px 0 100px 0;color: #777777;font-size: 14px;text-align: center">
                暂无物品数据
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 导出框-->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
      <exportExcel @closeThis="exportExcelShow=false" @saveSure="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
    </a-modal>
  </div>
</template>

<script>
import exportExcel from '@/components/exportExcel/index';
import {dictionaryListDict, listEnableDict} from "@/api/contract";
import * as API from "@/api/assets";

export default {
  name: "goodStatistics",
  components: {
    exportExcel,
  },
  props: {
  },
  data() {
    return {
      sendData:{
        goodsTypeId:undefined,
        ownerType:undefined,
        purchaseDateBegin:'',
        purchaseDateEnd:'',
        warrantyDateBegin:'',
        warrantyDateEnd:'',
        brandId:undefined,
      },
      totalData:{},
      goodTypeList:[],
      brandList:[],
      ownerTypeList:[
        {id:1,name:'公司'},
        {id:2,name:'业主'},
      ],
      dateFormat: 'YYYY.MM.DD',           //日期选择器格式
      timeDateList1:[],
      timeDateList2:[],
      exportExcelShow:false,
      exportUrl: '/pc2b/assets/category_stat_export',
      exportData:{},
    }
  },
  created() {
    this.getDictionaryList();
    this.assetsCategoryStat();
  },
  methods:{
    changeDateWarranty(date){
      this.sendData.warrantyDateBegin=date[0];
      this.sendData.warrantyDateEnd=date[1];
      this.assetsCategoryStat();
    },
    changeDatePurchase(date) {
      this.sendData.purchaseDateBegin=date[0];
      this.sendData.purchaseDateEnd=date[1];
      this.assetsCategoryStat();
    },
    goExport(){
      this.exportExcelShow = true;
    },
    clearSelect(){
      this.sendData = {
        goodsTypeId:undefined,
        ownerType:undefined,
        purchaseDateBegin:'',
        purchaseDateEnd:'',
        warrantyDateBegin:'',
        warrantyDateEnd:'',
        brandId:undefined,
      };
      this.assetsCategoryStat();
    },
    filterOptionBrand(inputValue,option){
      if(!inputValue){
        return true;
      }
      return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
    },
    assetsCategoryStat(){
      if(this.timeDateList1.length>0){
        this.sendData.purchaseDateBegin = this.timeDateList1[0];
        this.sendData.purchaseDateEnd = this.timeDateList1[1];
      }
      if(this.timeDateList2.length>0){
        this.sendData.warrantyDateBegin = this.timeDateList2[0];
        this.sendData.warrantyDateEnd = this.timeDateList2[1];
      }
      API.assetsCategoryStat(this.sendData).then(res => {
        if (res.code == "200") {
          this.totalData = res.data;
        }
      })
    },
    getDictionaryList(){
      //获取商品
      const params = 'ITEMCONFIGURATION';
      dictionaryListDict(params).then(res => {
        if (res.code === "200") {
          let goodTypeList = [];
          res.data.forEach((item)=>{
            let obj = {
              name:item.name,
              id:item.id,
            }
            goodTypeList.push(obj);
          });
          this.goodTypeList = goodTypeList;
        }
      });
      let id = 'a5837757604d49cd8a64e8bf21d63a2b';
      // 品牌
      listEnableDict(id).then(res => {
        if (res.code == 200) {
          this.brandList = res.data;
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
  .goodStatistics-box{
    max-height: calc(100vh - 150px);
    overflow-y: auto;
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
          margin-right: 10px;
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
          .titleTip1With2{
            width: 60px;
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
          /deep/ .ant-calendar-picker{
            width: 210px;
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
          /deep/ .ant-select-selection-selected-value{
            padding-right: 10px;
          }
          /deep/ .ant-calendar-picker-clear {
            right: 6px;
          }
          /deep/ .ant-calendar-picker-icon {
            right: 6px;
          }
          /deep/ .ant-input{
            border-radius:0 4px 4px 0;
            height: 34px;
            border: 1px solid #DDDDDD;
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
            width: 1154px;
            border-left: 1px solid #E8E8E8;
            border-top: 1px solid #E8E8E8;
            font-size: 12px;
            border-radius: 4px;
            .table-title{
              width: 1154px;
              display: flex;
              background: #F7F8FB;
              color: #777777;
              font-size: 13px;
              border-radius: 4px 4px 0px 0px;
              & > div {
                flex: 1;
                border-right: 1px solid #E8E8E8;
                border-bottom: 1px solid #E8E8E8;
              }
              .borderBottomStyle{
                border-bottom: 1px solid #E8E8E8;
              }
              .borderRightStyle{
                border-right: 1px solid #E8E8E8;
              }
              .lineStyle{
                line-height: 62px;
                text-align: center;
              }
              .numTileStyle{
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
              }
              .itemStyle{
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .numStyle{
                  flex:1
                }
              }
            }
            .house-no-data{
              width: 1154px;
              border-radius: 0px 0px 4px 4px;
              border-right: 1px solid #E8E8E8;
              border-bottom: 1px solid #E8E8E8;
              background-color: #ffffff;
            }
            .totalStyle{
              background: #FFF9F1;
              box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.06);
            }
            .house-data {
              width: 1154px;
              display: flex;
              color: #111111;
              font-size: 13px;
              border-radius: 0px 0px 4px 4px;
              & > div {
                flex: 1;
                height: 44px;
                line-height: 44px;
                border-right: 1px solid #E8E8E8;
                border-bottom: 1px solid #E8E8E8;
              }
              .fontStyle1{
                text-align: center;
              }
              .fontStyle2{
                text-align: center;
                color: #0A87F8;
              }
              .fontStyleBig{
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
</style>