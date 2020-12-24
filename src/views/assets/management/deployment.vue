<template>
  <div class="deployment-box">
    <div class="headStyle">
      <div style="width: 200px;"><span class="color1">物品：</span><span class="color2">{{record.goodsName}}</span></div>
      <div class="item"><span class="color1">数量：</span><span class="color2">{{record.quantity}}</span></div>
    </div>
    <div class="contentStyle">
      <div class="bigTitle">调配至</div>
      <div class="itemStyle" v-for="(item,index) in allocateDataList" :key="index">
        <div class="topStyle clearfix">
          <div class="f-fl cursor" :class="item.locationType==1?'selectStyle':'unSelectStyle'" @click="changeLocationType(index,1)">房间</div>
          <div class="f-fl cursor" :class="item.locationType==2?'selectStyle':'unSelectStyle'" @click="changeLocationType(index,2)">库房</div>
        </div>
        <div class="line1Style u-no-border clearfix">
          <a-select v-if="item.locationType==1" v-model="item.houseId" class="f-fl" style="width: 600px;height: 38px;line-height: 38px;" showSearch placeholder="请输入房源编号/小区地址/项目名称/门牌号信息检索房源"  :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @change="(communityId)=>getCommunity(communityId,index)" @search="selectCommunity" >
            <a-select-option v-for="(temp) in communityList" :key="temp.houseId" :disabled="temp.id==disabledHouseId">
              <span >{{ temp.viewAddress }}</span>
              <span v-if="temp.id==disabledHouseId">(物品当前所在地)</span><span v-if="temp.id==disabledHouseId" style="color: #ffa036;margin-left: 2px;">不可选择</span>
            </a-select-option>
          </a-select>
          <a-select v-if="item.locationType==2" class="f-fl" :allowClear="true" style="width: 600px;height: 38px;line-height: 38px;" v-model="item.warehouseId" placeholder="请选择库房" @change="getWareHouse">
            <div slot="dropdownRender" slot-scope="menu">
                <v-nodes :vnodes="menu" />
                <a-divider v-mark="['mk_assets_warehouse_xz']" style="margin: 4px 0;" />
                <div v-mark="['mk_assets_warehouse_xz']"
                     style="text-align:center;width:100%;height:36px;line-height:36px;color: #0A87F8; cursor: pointer;"
                     @mousedown="e => e.preventDefault()" @click="goToAddWareHouse" >
                  <icon-font type="iconyumengtubiao_tianjia" style="margin-right: 4px;"/>添加库房
                </div>
            </div>
            <a-select-option v-for="(temp) in warehouseList" :key="temp.id" :disabled="temp.id==disabledWareHouseId">
              <span >{{ temp.name }}</span>
              <span v-if="temp.id==disabledWareHouseId">(物品当前所在地)</span><span v-if="temp.id==disabledWareHouseId" style="color: #ffa036;margin-left: 2px;">不可选择</span>
            </a-select-option>
          </a-select>
          <div class="f-fr closeStyle closeStyle1 cursor" v-if="allocateDataList.length>1" @click="deleteDeployment(index)"><icon-font type="iconyumengtubiao_shanchu-1"></icon-font></div>
          <div class="f-fr closeStyle closeStyle2" v-if="allocateDataList.length==1"><icon-font type="iconyumengtubiao_shanchu-1"></icon-font></div>
          <div class="f-fr spanStyle">件</div>
          <a-input class="f-fr" style="width: 69px;padding-left:9px;height: 36px;line-height: 38px;" placeholder="调配数量" v-validate="'naturalNum|min(1)'" v-model="item.quantity" ></a-input>
          <div class="f-fr splitStyle"></div>
        </div>
      </div>
      <div class="addDeploymentStyle cursor" @click="addDeployment">
        <icon-font type="iconyumengtubiao_tianjia" /> 继续添加调配地址
      </div>
    </div>
    <div class="clearfix" style="width: 100%;padding:50px 20px 20px 20px;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="deploymentGood">
          保存
        </a-button>
      </div>
    </div>
    <!-- 添加库房 -->
    <a-modal destroyOnClose centered :maskStyle="maskStyle" :footer="null" :maskClosable="false" width="520px" v-model="addWarehouseDialog" class="ownModalBorder titDialog" title="添加库房" @cancel="addWarehouseDialog=false;">
      <add-warehouse @cancelSave="cancelAddWarehouse" @addSuccess="addWarehouseSuccess"></add-warehouse>
    </a-modal>
  </div>
</template>

<script>
import {searchHouse} from "@/api/reserve";
import AddWarehouse from '../warehouse/addWarehouse';
import * as API from "@/api/assets";

export default {
  name: "deployment",
  props: {
    record:{
      type:Object,
    }
  },
  components: {
    AddWarehouse,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      allocateDataList:[
        {
          locationType:1,
          houseId:undefined,
          warehouseId:undefined,
          quantity:'',
        }
      ],
      obj:{
        locationType:1,
        houseId:undefined,
        warehouseId:undefined,
        quantity:'',
      },
      saveLoading:false,
      communityList: [],
      warehouseList:[],
      disabledHouseId:'',
      disabledWareHouseId:'',
      selectedHouseIdList:[],
      selectedWareHouseIdList:[],
      addWarehouseDialog:false,
      maskStyle:{backgroundColor:'rgba(0,0,0,0.2)'},
    }
  },
  created() {
    this.warehouseListSimple();
    if(this.record.locationType==1){
      this.disabledHouseId = this.record.houseId;
    }
    else if(this.record.locationType==2){
      this.disabledWareHouseId = this.record.warehouseId;
    }
  },
  mounted() {
  },
  methods: {
    addWarehouseSuccess(){
      this.addWarehouseDialog = false;
      setTimeout(()=>{
        this.warehouseListSimple()
      },300);
    },
    cancelAddWarehouse(){
      this.addWarehouseDialog = false;
    },
    goToAddWareHouse(){
      this.addWarehouseDialog = true;
    },
    changeLocationType(index,val){
      if(this.allocateDataList[index].locationType == val){
        return ;
      }
      this.allocateDataList[index].locationType = val;
      this.allocateDataList[index].warehouseId = undefined;
      this.allocateDataList[index].houseId = undefined;
    },
    warehouseListSimple(){
      API.warehouseListSimple().then(res => {
        if (res.code == 200) {
          this.warehouseList = res.data;
        }
      })
    },
    addDeployment(){
      let temp =Object.assign({},this.obj);
      this.allocateDataList.push(temp);
    },
    deleteDeployment(index){
      if(this.allocateDataList.length==1){
        this.$message.warning('不能再删了哟');
        return ;
      }
      this.allocateDataList.splice(index,1);
    },
    selectCommunity(searchVal) {
      if(!searchVal){
        this.communityList = [];
        return ;
      }
      let data = {
        fuzzyKeyword: searchVal,
        useBiz:7,
      }
      searchHouse(data).then(res => {
        if (res.code == "200") {
          if (res.data.length > 0) {
            this.communityList = res.data;
          } else {
            this.communityList = [];
          }
        }
      })
    },
    getCommunity(communityId,index) {
      this.allocateDataList[index].houseId = communityId;
      //维护选择房源
      let houseIds = [];
      this.allocateDataList.forEach((item)=>{
        if(item.locationType==1){
          houseIds.push(item.houseId);
        }
      });
      this.selectedHouseIdList = houseIds;
    },
    getWareHouse(){
      //维护选择库房
      let wareHouseIds = [];
      this.allocateDataList.forEach((item)=>{
        if(item.locationType==2){
          wareHouseIds.push(item.warehouseId);
        }
      });
      this.selectedWareHouseIdList = wareHouseIds;
    },
    cancelSave(){
      this.$emit('cancelSave');
    },
    deploymentGood(){
      if(this.allocateDataList.length<=0){
        this.$message.warning('不存在调配数据');
        return ;
      }
      let continueFlag = false;
      let totalNum = 0;
      this.allocateDataList.forEach((item)=>{
        if(item.locationType==1&&!item.houseId){
          continueFlag = true;
        }
        if(item.locationType==2&&!item.warehouseId){
          continueFlag = true;
        }
        if(!item.quantity){
          continueFlag = true;
        }
        totalNum += Number(item.quantity);
      });
      if(continueFlag){
        this.$message.warning('请完整相关数据');
        return ;
      }
      if(totalNum > this.record.quantity){
        this.$message.warning('调配数量超过物品总数');
        return ;
      }
      let parameter = {
        id : this.record.id,
        allocateDataList : this.allocateDataList,
      };
      this.saveLoading = true;
      API.assetsAllocate(parameter).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.success('调配成功');
          this.saveLoading = false;
          this.$emit('deploymentSuccess');
        }
        else{
          this.$message.error('调配失败');
          this.saveLoading = false;
        }
      });
    },
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
.deployment-box{
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  .headStyle{
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    background: #E7F1FF;
    padding: 0 20px;
    display: flex;
    .color1{
      color: #777777;
    }
    .color2{
      color: #111111;
    }
    .item{
      flex: 1;
    }
  }
  .contentStyle{
    padding: 20px;
    .bigTitle{
      font-size: 16px;
      color: #111111;
      margin-bottom: 14px;
    }
    .itemStyle{
      margin-bottom: 20px;
      .topStyle{
         .selectStyle{
           width: 44px;
           text-align: center;
           height: 24px;
           line-height: 24px;
           background: #0A87F8;
           border-radius: 4px 4px 0px 0px;
           border: 1px solid #0A87F8;
           color: #ffffff;
           font-size: 13px;
           border-bottom: none;
         }
        .unSelectStyle{
          width: 44px;
          text-align: center;
          height: 22px;
          line-height: 22px;
          margin-top: 2px;
          background: #F6F7F8;
          border-radius: 4px 4px 0px 0px;
          border: 1px solid #E8E8E8;
          border-bottom: none;
        }
      }
      .line1Style{
        width: 100%;
        height: 38px;
        background: #FFFFFF;
        border-radius: 0px 2px 2px 2px;
        border: 1px solid #EEEEEE;
        /deep/ .ant-select-selection__rendered{
          margin-left: 9px;
          margin-right: 0px;
          line-height: 38px;
        }
        /deep/ .ant-select-selection__placeholder{
          right: 0;
        }
        .closeStyle{
          width: 30px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          border-left: 1px solid #EEEEEE;
          svg{
            width: 16px;
            height: 16px;
          }
          i{
            vertical-align: -0.2em;
          }
        }
        .closeStyle1{
          color: #FE3C38;
        }
        .closeStyle2{
          color: #E8E8E8;
        }
        .spanStyle{
          height: 38px;
          line-height: 38px;
          margin: 0 10px;
          color: #777777;
          font-size: 13px;
        }
        .splitStyle{
          width: 1px;
          height: 20px;
          border-left: 1px solid #EEEEEE;
          margin: 8px 1px 0 0;
        }
      }
    }
    .addDeploymentStyle{
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #C9E5FF;
      text-align: center;
      color: #0A87F8;
      font-size: 14px;
      margin-top: 10px;
      i{
        vertical-align: -0.2em;
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