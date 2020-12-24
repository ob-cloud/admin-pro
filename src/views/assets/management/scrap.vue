<template>
  <div class="loss-box">
    <div class="headStyle">
      <div style="width: 150px;"><span class="color1">物品：</span><span class="color2">{{record.goodsName}}</span></div>
      <div class="item"><span class="color1">数量：</span><span class="color2">{{record.quantity}}</span></div>
    </div>
    <div class="contentStyle">
      <div class="bigTitleStyle">报废信息</div>
      <div class="itemStyle" style="margin-top: 17px;">
        <div class="itemLeftStyle f-fl">
          <a-checkbox v-model="scrapValue1" @change="onChangeScrapValue1">
            报废至库房
          </a-checkbox>
        </div>
        <div class="itemMoreStyle u-no-border clearfix f-fl">
          <a-select class="f-fl" :allowClear="true" style="width:250px;height: 46px;line-height: 48px;" v-model="warehouseId" placeholder="请选择库房" @change="selectWareHouse">
            <div slot="dropdownRender" slot-scope="menu">
              <v-nodes :vnodes="menu" />
              <a-divider v-mark="['mk_assets_warehouse_xz']" style="margin: 4px 0;" />
              <div v-mark="['mk_assets_warehouse_xz']"
                   style="text-align:center;width:100%;height:36px;line-height:36px;color: #0A87F8; cursor: pointer;"
                   @mousedown="e => e.preventDefault()"
                   @click="goToAddWareHouse"
              >
                <icon-font type="iconyumengtubiao_tianjia" style="margin-right: 4px;"/>添加库房
              </div>
            </div>
            <a-select-option v-for="(item) in warehouseList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <div class="itemAfterStyle f-fr">件</div>
          <a-input class="f-fr" style="width: 70px;height: 46px;line-height: 48px;padding-left: 4px;" v-validate="'naturalNum'" @change="changeScrapNum" v-model="scrapNum" placeholder="报废数量"></a-input>
          <div class="f-fr splitStyle"></div>
        </div>
      </div>
      <div class="itemStyle clearfix" style="margin-top: 20px;">
        <div class="itemLeftStyle f-fl" @change="onChangeScrapValue2">
          <a-checkbox v-model="scrapValue2">
            直接丢弃
          </a-checkbox>
        </div>
        <div class="itemRightStyle u-no-border f-fl">
          <a-input v-model="discardNum" @change="changeDiscardNum" placeholder="丢弃数量" v-validate="'naturalNum'" style="width: calc(100% - 50px);padding-left:10px;height: 46px;line-height: 48px;"></a-input>
          <div class="itemAfterStyle">件</div>
        </div>
      </div>
    </div>
    <div class="clearfix" style="width: 100%;padding:115px 20px 20px 20px;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="confirmLoss">
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
import AddWarehouse from '../warehouse/addWarehouse';
import * as API from "@/api/assets";

export default {
  name: "loss",
  components: {
    AddWarehouse,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  props: {
    record:{
      type:Object,
    }
  },
  data() {
    return {
      saveLoading:false,
      lossNum:10,
      scrapValue1:false,
      scrapValue2:false,
      scrapNum:'',
      warehouseId:undefined,
      discardNum:'',
      warehouseList:[],
      addWarehouseDialog:false,
      maskStyle:{backgroundColor:'rgba(0,0,0,0.2)'},
    }
  },
  created() {
    this.warehouseListSimple();
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
    selectWareHouse(){
      if(this.warehouseId||this.scrapNum){
        this.scrapValue1 = true;
      }
      if(!this.warehouseId&&!this.scrapNum){
        this.scrapValue1 = false;
      }
    },
    changeScrapNum(){
      if(this.warehouseId||this.scrapNum){
        this.scrapValue1 = true;
      }
      if(!this.warehouseId&&!this.scrapNum){
        this.scrapValue1 = false;
      }
      if(this.scrapValue1){
        if((this.record.locationType ==2&&this.record.warehouseId)&&!this.warehouseId){
          this.warehouseId = this.record.warehouseId;
        }
      }
    },
    changeDiscardNum(){
      if(this.discardNum){
        this.scrapValue2 = true;
      }
      else {
        this.scrapValue2 = false;
      }
    },
    onChangeScrapValue1(e){
      if(!e.target.checked){
        this.warehouseId = undefined;
        this.scrapNum = '';
      }
      else {
        if((this.record.locationType ==2&&this.record.warehouseId)&&!this.warehouseId){
          this.warehouseId = this.record.warehouseId;
        }
      }
    },
    onChangeScrapValue2(e){
      if(!e.target.checked){
        this.discardNum = '';
      }
    },
    warehouseListSimple(){
      API.warehouseListSimple().then(res => {
        if (res.code == 200) {
          this.warehouseList = res.data;
        }
      })
    },
    cancelSave(){
      this.$emit('cancelSave');
    },
    confirmLoss(){
      if(!this.scrapValue1&&!this.scrapValue2){
        this.$message.warning('请选择报废位置');
        return ;
      }
      if(this.scrapValue1&&(!this.scrapNum||!this.warehouseId)){
        this.$message.warning('请完善报废信息');
        return ;
      }
      if(this.scrapValue2&&!this.discardNum){
        this.$message.warning('请完善报废信息');
        return ;
      }
      let scrapNum = 0;
      if(this.scrapValue1){
        scrapNum += Number(this.scrapNum);
      }
      if(this.scrapValue2){
        scrapNum += Number(this.discardNum);
      }
      if(scrapNum > this.record.quantity){
        this.$message.warning('报废数量超过物品总数');
        return ;
      }
      let scrappedDataList = [];
      if(this.scrapValue1){
        let obj = {
          quantity:this.scrapNum,
          scrappedType:1,
          warehouseId:this.warehouseId,
        };
        scrappedDataList.push(obj);
      }
      if(this.scrapValue2){
        let obj = {
          quantity:this.discardNum,
          scrappedType:2,
        };
        scrappedDataList.push(obj);
      }
      let parameter = {
        id:this.record.id,
        scrappedDataList:scrappedDataList,
      }
      this.saveLoading = true;
      API.assetsScrapped(parameter).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.success('报废成功');
          this.saveLoading = false;
          this.$emit('scrapSuccess');
        }
        else{
          this.$message.error('报废失败');
          this.saveLoading = false;
        }
      });
    },
  },
}
</script>

<style scoped lang="less">
  .loss-box{
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
      padding: 20px 20px 17px 20px;
      .bigTitleStyle{
        color: #111111;
        font-size: 16px;
        font-weight: 500;
      }
      .itemStyle{
        width: 480px;
        height: 48px;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #EEEEEE;
        .itemLeftStyle{
          border-right: 1px solid #EEEEEE;
          width: 110px;
          height: 48px;
          line-height: 48px;
          padding-left: 8px;
          /deep/ .ant-checkbox + span{
            padding-left: 4px;
            padding-right: 0px;
            color: #111111;
          }
        }
        .itemRightStyle{
          width: calc(100% - 110px);
          position: relative;
          .itemAfterStyle{
            position: absolute;
            color: #777777;
            font-size: 14px;
            height: 48px;
            line-height: 48px;
            right: 16px;
            top:0px;
          }
          /deep/ .ant-input{
            color: #111111;
          }
        }
        .itemMoreStyle{
          width: calc(100% - 110px);
          /deep/ .ant-select-selection__rendered{
            line-height: 48px;
            height: 48px;
            margin-right: 0px;
          }
          /deep/ .ant-select-selection--single{
            height: 46px;
          }
          .itemAfterStyle{
            height: 48px;
            line-height: 48px;
            font-size: 14px;
            color: #777777;
            margin: 0 16px 0 5px;
          }
          .splitStyle{
            height: 20px;
            margin-right: 5px;
            padding-left: 5px;
            border-right: 1px solid #E8E8E8;
            margin-top: 13px;
          }
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