<template>
  <div class="deploymentHouse-box">
    <div class="headStyle" v-if="houseInfo">添加物品至：{{houseInfo.houseAlias?houseInfo.houseAlias+'/':''}}{{houseInfo.operateType=='view'?houseInfo.address:houseInfo.fullAddress}}</div>
    <div class="detail_info">
      <div class="set_info f-clearfix">
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With1 f-fl">物品</div>
          <a-cascader class="myCascader" style="width: 90px;" v-model="goodsId" placeholder="请选择" :options="goodsTabsContent" :fieldNames="elcostcascaderValue" @change="(value) => goodSelect(value)"></a-cascader>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">物品归属</div>
          <a-select style="width: 80px;" v-model="sendData.ownerType" placeholder="不限" :allowClear="true" @change="getAssetList">
            <a-select-option v-for="(item) in ownerTypeList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With1 f-fl">品牌</div>
          <a-select style="width: 85px;" :showSearch="true" :filterOption="(inputValue,option)=>filterOptionBrand(inputValue,option)" :allowClear="true" v-model="sendData.brandId" placeholder="请选择" @change="getAssetList">
            <a-select-option v-for="(item) in brandList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With1 f-fl">仓库</div>
          <a-select class="f-fl" :allowClear="true" style="width: 104px;" v-model="sendData.warehouseId" placeholder="请选择" @change="getAssetList">
            <a-select-option v-for="(item) in warehouseList" :key="item.id" :disabled="item.disabled">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="selectItem f-fl">
          <div class="titleTip1 titleTip1With2 f-fl">购入日期</div>
          <a-range-picker @change="(date,dateString)=>changeDatePurchase(date, dateString)" :format="dateFormat" v-model="timeDateList1"/>
        </div>
        <div class="selectItem f-fl">
          <a-input style="width: 200px;" ref="userNameInput" v-model="sendData.fuzzyKeyword" placeholder="物品编号/型号/规格">
            <icon-font slot="prefix" type="iconyumengtubiao_sousuo" ></icon-font>
          </a-input>
        </div>
        <div class="selectItem searchButtonStyle cursor f-fl" @click="getAssetList">
          <icon-font type="iconyumengtubiao_sousuo" />
        </div>
        <div class="clearStyle f-fl cursor" @click="clearSelect">
          清空
        </div>
      </div>
      <div class="lockList_info">
        <div style="min-height: 500px;">
          <div class="basicsInfo">
            <div class="table">
              <div class="table-title">
                <div style="max-width: 96px;border-radius: 4px 0px 0px 0px;">物品类型</div>
                <div style="max-width: 74px;">物品</div>
                <div style="max-width: 59px;">数量</div>
                <div style="max-width: 96px;">单价</div>
                <div style="max-width: 121px;">品牌/型号</div>
                <div style="max-width: 113px;">规格</div>
                <div style="max-width: 64px;">归属方</div>
                <div style="max-width: 149px;">物品编号</div>
                <div style="max-width: 94px;">购入日期</div>
                <div :style="showShareFlag?'max-width: 88px;':'max-width: 138px;'">所在仓库</div>
                <div style="border-radius: 0px 4px 0px 0px;" :style="showShareFlag?'max-width: 200px;':'max-width: 150px;'">选择物品/调配数量</div>
              </div>
              <div class="house-data" v-for="(item,index) in tableData" :key="index">
                <div class="overHidde" style="max-width: 96px;">{{item.goodsTypeName|blankVal}}</div>
                <div class="overHidde" style="max-width: 74px;">{{item.goodsName|blankVal}}</div>
                <div class="overHidde" style="max-width: 59px;">{{item.quantity}}</div>
                <div style="max-width: 96px;">{{item.unitPrice?item.unitPrice/100+'元/件':'-'}}</div>
                <div class="overHidde" style="max-width: 121px;">{{item.brandName|blankVal}}/{{item.model|blankVal}}</div>
                <div class="overHidde" style="max-width: 113px;">{{item.specification|blankVal}}</div>
                <div style="max-width: 64px;">{{item.ownerTypeName|blankVal}}</div>
                <div style="max-width: 149px;">{{item.serialNumber|blankVal}}</div>
                <div style="max-width: 94px;">{{item.purchaseDate?$moment(item.purchaseDate).format('YYYY.MM.DD'):'-'}}</div>
                <div class="overHidde" :style="showShareFlag?'max-width: 88px;':'max-width: 138px;'">{{item.warehouseName|blankVal}}</div>
                <div class="u-no-border" style="padding-left: 8px;" :style="showShareFlag?'max-width: 200px;':'max-width: 150px;'">
                  <a-checkbox class="f-fl" v-model="item.isSelected" @change="(value)=>changeSelected(value,item)"></a-checkbox>
                  <a-select class="f-fl" v-if="item.isSelected&&showPositionFlag" style="width: 80px;" placeholder="请选择" v-model="item.houseId" @change="(val)=>selectHouseId(val,item.id)">
                    <a-select-option v-for="(item) in roomList" :key="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                  <div v-if="item.isSelected&&showPositionFlag" class="f-fl splitStyle">
                  </div>
                  <div class="f-fl cursor" v-if="item.isSelected" style="height: 46px;line-height: 46px;width: 16px;width: 16px;margin-left: 10px;" @click="reduceQuantity(item)">
                    <div class="commonStyle" :class="item.num==1?'unEditStyle':'editStyle'">
                      <icon-font type="iconjian" />
                    </div>
                  </div>
                  <a-input @change="changeNum(item)" v-if="item.isSelected" style="width: 45px;text-align: center" class="f-fl" v-validate="'naturalNum|min(1)|max(99999)'" placeholder="请输入" v-model="item.num"></a-input>
                  <div v-if="item.isSelected" class="f-fl cursor" style="height: 46px;width: 16px;line-height: 46px;" @click="plusQuantity(item)">
                    <div class="commonStyle" :class="item.num==item.quantity?'unEditStyle':'editStyle'" >
                      <icon-font type="iconjia" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="house-no-data u-no-border" v-if="!spinLoading&&(!tableData||tableData.length==0)">
                <div style="padding-top: 80px;text-align: center;">
                  <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
                </div>
                <div style="margin:20px 0 100px 0;color: #777777;font-size: 14px;text-align: center">
                  暂无物品数据
                </div>
              </div>
              <div class="house-no-data u-no-border" v-if="spinLoading&&(!tableData||tableData.length==0)">
                <div style="padding-top: 80px;text-align: center;">
                  <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
                </div>
                <div style="margin:20px 0 100px 0;color: #777777;font-size: 14px;text-align: center">
                  物品数据加载中...
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix">
          <div class="leftWarningStyle f-fl cursor" @click="goAddGood">
            <span class="warningStyle">在库房未找到相应的物品？</span><span class="goAddStyle">去添加</span><icon-font class="goAddStyle" style="margin-left: 4px;" type="iconyumengtubiao_zhishi"></icon-font>
          </div>
          <div class="contFoot f-fr" v-show="tableData.length>0">
            <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
          </div>
        </div>
      </div>
      <div class="operateStyle" v-if="selectedGoodListTotal&&selectedGoodListTotal.length>0">
        <span style="color: #111111;">已选择从：</span>
        <span v-for="(item,index) in selectedGoodListTotal" :style="index>0?'margin-left:10px;':''">
          <span>{{item.warehouseName}} - 调取</span>
          <span v-for="(good) in item.goodList">
            <span style="color: #0A87F8;">【{{good.name}} * {{good.num}}】</span>
          </span>
        </span>
      </div>
      <div class="clearfix" style="width: 100%;padding:32px 0px 0px 0;">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="deploymentHouse">
            保存
          </a-button>
        </div>
      </div>
    </div>
    <a-modal destroyOnClose centered :maskStyle="maskStyle" :footer="null" :maskClosable="false" width="800px" v-model="addGoodDialog" class="ownModalBorder titDialog" title="添加物品" @cancel="addGoodDialog=false;">
      <add-good @cancelSave="cancelAdd" @addSuccess="addSuccess"></add-good>
    </a-modal>
  </div>
</template>

<script>
import AddGood from './addGood';
import {dictionaryListDict, listEnableDict} from "@/api/contract";
import * as API from "@/api/assets";

export default {
  name: "goodStatistics",
  components: {
    AddGood,
  },
  props: {
    houseInfo:{
      type:Object,
    },
    formType:{
      type:String,
      required:true,
    },
    defaultGoodInfo:{
      type:Object,
    },
  },
  data() {
    return {
      spinLoading:false,
      goodsId:[],
      sendData:{
        current: 1,                     // 当前页数
        size: 10,                       // 每页返回的记录数量
        goodsIdList:[],
        ownerType:undefined,
        brandId:undefined,
        warehouseId:undefined,
        purchaseDateBegin:'',
        purchaseDateEnd:'',
        fuzzyKeyword:'',
        fuzzyQueryType:0,
      },
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "50"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      tableData:[],
      brandList:[],
      ownerTypeList:[
        {id:1,name:'公司'},
        {id:2,name:'业主'},
      ],
      dateFormat: 'YYYY.MM.DD',           //日期选择器格式
      timeDateList1:[],
      warehouseList:[],
      goodsTabsContent:[],
      elcostcascaderValue: {
        value: 'id',
        label: 'name',
        children: 'metaList'
      },
      saveLoading:false,
      roomList:[],
      showPositionFlag:false,
      addGoodDialog:false,
      maskStyle:{backgroundColor:'rgba(0,0,0,0.05)'},
      selectedGoodList:[],
      selectedGoodListTotal:[],
      showShareFlag:false,
    }
  },
  created() {
    //来自房源编辑
    if(this.houseInfo){
      if(this.houseInfo.fromType=='share'){
        this.showShareFlag = true;
      }
      if(this.houseInfo.fromType=='share'&&this.houseInfo.operateType=='view'){
        this.showPositionFlag = true;
        this.getRoomNameListById();
      }
    }
    this.initData();
    this.getAssetList();
    this.getDictionaryList();
    this.warehouseListSimple();
  },
  methods:{
    changeDatePurchase(date) {
      this.sendData.purchaseDateBegin=date[0];
      this.sendData.purchaseDateEnd=date[1];
      this.getAssetList();
    },
    getRoomNameListById(){
      API.getRoomNameListById(this.houseInfo.houseId).then(res=>{
        this.roomList = res.data;
      });
    },
    setGoodListTotal(){
      //统计仓库
      let warehouseIdList = [];
      this.selectedGoodList.forEach((item)=>{
        if(warehouseIdList.indexOf(item.warehouseId)==-1){
          warehouseIdList.push(item.warehouseId);
        }
      });
      let selectedGoodListTotal = [];
      warehouseIdList.forEach((item)=>{
        let obj = {
          warehouseId:item,
          warehouseName:'',
          goodList:[],
        };
        //统计物品
        let goodIdList = [];
        this.selectedGoodList.forEach((temp)=>{
          if(temp.warehouseId == item){
            obj.warehouseName = temp.warehouseName;
            if(goodIdList.indexOf(temp.goodsId)==-1){
              goodIdList.push(temp.goodsId);
            }
          }
        });
        goodIdList.forEach((tempGood)=>{
          let good = {
            name:'',
            num:0,
          };
          this.selectedGoodList.forEach((temp)=>{
            if(temp.goodsId == tempGood&&temp.warehouseId== item){
              good.name = temp.goodsName;
              good.num += temp.num;
            }
          });
          obj.goodList.push(good);
        });
        selectedGoodListTotal.push(obj);
      });
      this.selectedGoodListTotal = selectedGoodListTotal;
    },
    addSuccess(){
      this.addGoodDialog = false;
      this.getAssetList();
    },
    cancelAdd(){
      this.addGoodDialog = false;
    },
    goAddGood(){
      this.addGoodDialog = true;
    },
    initData(){
      if(this.defaultGoodInfo){
        let temp = [];
        temp.push(this.defaultGoodInfo.clickItemId);
        this.sendData.goodsIdList = temp;
        let goodsIdList = [this.defaultGoodInfo.clickItemPid,this.defaultGoodInfo.clickItemId];
        this.goodsId = goodsIdList;
      }
    },
    selectHouseId(val,id){
      this.selectedGoodList.forEach((item)=>{
        if(item.id == id){
          item.houseId = val;
        }
      });
    },
    changeSelected(e,item){
      if(e.target.checked){
        this.$set(item,'isSelected',true);
        this.$set(item,'num',1);
        let obj =Object.assign({},item)
        if(this.houseInfo&&this.houseInfo.fromType=='share'&&this.houseInfo.operateType=='view'){
          item.houseId = undefined;
        }
        this.selectedGoodList.push(obj);
      }
      else{
        this.$set(item,'isSelected',false);
        this.$set(item,'num',undefined);
        let pos = 0;
        this.selectedGoodList.forEach((temp,index)=>{
          if(temp.id == item.id){
            pos = index;
          }
        });
        this.selectedGoodList.splice(pos,1);
      }
      this.$forceUpdate();
    },
    changeNum(item){
      if(item.num){
        if(item.num>item.quantity){
          this.$message.warning('最大值不能大于' + item.quantity);
          item.num = item.quantity;
        }
        item.num = Number(item.num);
      }
      this.selectedGoodList.forEach((temp)=>{
        if(temp.id == item.id ){
          temp.num = item.num;
        }
      });
      this.setGoodListTotal();
      this.$forceUpdate();
    },
    plusQuantity(item){
      if(item.num>=item.quantity){
        return ;
      }
      item.num += 1;
      this.selectedGoodList.forEach((temp)=>{
        if(temp.id == item.id ){
          temp.num = item.num;
        }
      });
      this.setGoodListTotal();
      this.$forceUpdate();
    },
    reduceQuantity(item){
      if(item.num<=1){
        return ;
      }
      item.num -= 1;
      this.selectedGoodList.forEach((temp)=>{
        if(temp.id == item.id ){
          temp.num = item.num;
        }
      });
      this.setGoodListTotal();
      this.$forceUpdate();
    },
    onSizeChange(current) {
      this.sendData.current = current;
      this.getAssetList();
    },
    onShowSizeChange(current, pageSize) {
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.getAssetList();
    },
    deploymentHouse(){
      let goodList = [];
      this.selectedGoodList.forEach((item)=>{
        let obj = Object.assign({},item);
        obj.quantity = item.num;
        obj.operateType = 2;
        goodList.push(obj);
      });
      if(this.formType=='add'){
        this.$emit('addGoodList',goodList);
      }
      else if(this.formType=='edit'||this.formType == 'view'){
        let allocateDataList = [];
        this.selectedGoodList.forEach((item)=>{
          let obj = {};
          obj.quantity = item.num;
          obj.id = item.id;
          if(this.houseInfo&&this.houseInfo.fromType=='share'&&this.houseInfo.operateType=='view') {
            obj.houseId = item.houseId;
          }
          else{
            obj.houseId = this.houseInfo.houseId;
          }
          obj.locationType = 1;
          allocateDataList.push(obj);
        });
        let parameter = {
          allocateDataList:allocateDataList,
        };
        this.saveLoading =true;
        API.assetsBatchAllocate(parameter).then(res=>{
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            this.$message.success('物品批量调配成功');
            this.saveLoading = false;
            this.$emit('addGoodList');
          }
          else{
            this.$message.error('物品批量调配失败');
            this.saveLoading = false;
          }
        });
      }
    },
    cancelSave(){
      this.$emit('cancelSave');
    },
    getAssetList(){
      this.spinLoading = true;
      API.listWarehouseIdleAssets(this.sendData).then(res => {
        if (res&&res.code === "200") {
          this.tableData = res.data.records;
          this.tableData.forEach((item)=>{
            item.isSelected = false;
            item.houseId = undefined;
            item.num = undefined;
            this.selectedGoodList.forEach((temp)=>{
              if(item.id == temp.id){
                item.isSelected = temp.isSelected;
                if(temp.houseId){
                  item.houseId = temp.houseId;
                }
                item.num = temp.num;
              }
            });
          });
          this.pagination.total = res.data.total;
          this.spinLoading = false;
        }
      })
    },
    // 物品选择
    goodSelect(value) {
      if (value[1]) {
        this.sendData.goodsIdList = [];
        this.sendData.goodsIdList.push(value[1]);
      } else {
        this.sendData.goodsIdList = '';
      }
      this.getAssetList();
    },
    warehouseListSimple(){
      API.warehouseListSimple().then(res => {
        if (res.code == 200) {
          this.warehouseList = res.data;
        }
      })
    },
    clearSelect(){
      this.goodsId = [];
      this.sendData = {
        goodsIdList:[],
        ownerType:undefined,
        brandId:undefined,
        purchaseDateBegin:'',
        purchaseDateEnd:'',
        warrantyDateBegin:'',
        warrantyDateEnd:'',
        fuzzyKeyword:'',
        fuzzyQueryType:'',
      };
      this.getAssetList();
    },
    filterOptionBrand(inputValue,option){
      if(!inputValue){
        return true;
      }
      return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
    },
    getDictionaryList(){
      //获取物品
      const params = 'ITEMCONFIGURATION';
      dictionaryListDict(params).then(res => {
        if (res.code === "200") {
          this.goodsTabsContent = res.data;
        }
      })
      let id = 'a5837757604d49cd8a64e8bf21d63a2b';
      // 品牌
      listEnableDict(id).then(res => {
        if (res.code == 200) {
          this.brandList = res.data;
        }
      })
    },
  },
  filters: {
    blankVal(val) {
      if (!val) {
        return '-';
      } else {
        return val;
      }
    },
  },
  watch:{
    selectedGoodList() {
      this.setGoodListTotal();
    },
  },
}
</script>

<style scoped lang="less">
.deploymentHouse-box{
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  .headStyle{
    height: 40px;
    line-height: 40px;
    background: #E9F1FF;
    padding-left: 20px;
    font-size: 14px;
    color: #777777;
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
          width: 40px;
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
      .basicsInfo{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .table{
          width: 1154px;
          border-left: 1px solid #EEEEEE;
          border-top: 1px solid #EEEEEE;
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
              border-right: 1px solid #EEEEEE;
              border-bottom: 1px solid #EEEEEE;
              height: 36px;
              line-height: 36px;
              padding-left: 10px;
            }
            .borderBottomStyle{
              border-bottom: 1px solid #EEEEEE;
            }
            .borderRightStyle{
              border-right: 1px solid #EEEEEE;
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
            border-right: 1px solid #EEEEEE;
            border-bottom: 1px solid #EEEEEE;
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
            /deep/ .ant-checkbox-wrapper{
              line-height: 42px;
            }
            & > div {
              flex: 1;
              height: 46px;
              line-height: 46px;
              border-right: 1px solid #EEEEEE;
              border-bottom: 1px solid #EEEEEE;
              padding-left: 10px;
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
            /deep/ .ant-select-selection__rendered{
              height: 44px;
              line-height: 44px;
            }
            /deep/ .ant-select-selection--single{
              height: 45px;
              line-height: 46px;
            }
            .commonStyle{
              width: 16px;
              height: 16px;
              line-height: 16px;
              background: #F6F7FB;
              border: 1px solid #EEEEEE;
              text-align: center;
              border-radius: 50%;
              margin-top: 13px;
            }
            .splitStyle{
              border-left: 1px dashed #EEEEEE;
              width: 1px;
              height: 20px;
              margin-top: 13px;
              padding-right: 0px;
            }
            .unEditStyle{
              color: #999999;
            }
            .editStyle{
              color: #0A87F8;
            }
            /deep/ .ant-input{
              padding: 10px 0 0 0;
            }
          }
        }
      }
      .contFoot {
        margin-top: 15px;
        height: 56px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background-color: #fff;
        & /deep/ .ant-pagination {
          margin-right: 0px;
        }
      }
      .leftWarningStyle{
        margin-top: 15px;
        height: 56px;
        line-height: 56px;
      }
      .warningStyle{
        color: #FFA036;
        font-size: 13px;
      }
      .goAddStyle{
        color: #0A87F8;
        font-size: 13px;
        margin-left: 10px;
      }
    }
    .operateStyle{
      width: 100%;
      line-height: 21px;
      padding: 9px 0 9px 10px;
      background: #F6F7F8;
      border-radius: 4px;
      color: #777777;
      font-size: 14px;
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