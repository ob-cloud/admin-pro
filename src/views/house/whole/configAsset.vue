<template>
  <div class="configAsset-box">
    <div>
      <span class="titleStyle">物品配置</span>
    </div>
    <div class="selectStyle clearfix">
      <div class="clearfix" v-for="index1 of showPublicConfigLine" :key="index1">
        <div class="item f-fl cursor clearfix" v-for="index2 of 5" :key="index2" v-if="(index1*5+index2-6)<showPublicConfigSize" @click.stop="clickItem(index1,index2)">
          <div class="f-fl iconStyle">
            <icon-font v-if="showPublicConfig[(index1-1)*5+index2-1].quantity&&showPublicConfig[(index1-1)*5+index2-1].quantity>0"
                       type="iconduoxuanyixuanzhong" style="color: #0A87F8;"></icon-font>
            <icon-font v-else type="iconduoxuanweixuanzhong" style=""></icon-font>
            <span style="padding: 0 8px 0 4px;" :class="showPublicConfig[(index1-1)*5+index2-1].checked?'selectedStyle':'unSelectStyle'">{{showPublicConfig[(index1-1)*5+index2-1].name}}</span>
          </div>
          <div v-if="showPublicConfig[(index1-1)*5+index2-1].quantity>0" class="f-fl" style="margin-right: 10px;font-weight: 100;line-height: 18px;">
            x
          </div>
          <div v-if="showPublicConfig[(index1-1)*5+index2-1].quantity>0" class="f-fl" style="margin-right: 10px;font-weight: 600;color: #111111;">
            {{showPublicConfig[(index1-1)*5+index2-1].quantity}}
          </div>
          <div v-if="clickItemInfo.clickItemId==showPublicConfig[(index1-1)*5+index2-1].id" class="f-fl">
            <div class="editStyle"><icon-font class="selectedStyle1" type="iconyumengtubiao_bianji-1"></icon-font></div>
          </div>
        </div>
        <div class="f-fl selectItemStyle" v-if="clickItemLineIndex&&clickItemLineIndex==index1">
          <div style="position: absolute;top:-15px;" :style="leftWidth">
            <img style="width: 11.7px;height: 7.2px;" src="../../../assets/extension/poper.png">
          </div>
          <div class="basicsInfo">
            <div class="table">
              <div class="table-title">
                <div style="max-width: 160px;border-radius: 4px 0px 0px 0px;">类型</div>
                <div style="max-width: 81px;">物品</div>
                <div style="max-width: 50px;">数量</div>
                <div style="max-width: 96px;">单价</div>
                <div style="max-width: 73px;">物品类型</div>
                <div style="max-width: 105px;">品牌/型号</div>
                <div style="max-width: 113px;">规格</div>
                <div style="max-width: 64px;">归属方</div>
                <div style="max-width: 149px;">物品编号</div>
                <div style="max-width: 49px;border-radius: 0px 4px 0px 0px;text-align: center;padding-left: 0px;">操作</div>
              </div>
              <div class="house-data" v-for="(item,index3) in showPublicConfig[clickItemIndex].assetsList" :key="index3">
                <div class="overHidde" style="max-width: 160px;">
                  <span v-if="item.operateType==1">新增</span>
                  <span v-if="item.operateType==2">从“{{item.warehouseName}}”调配</span>
                </div>
                <div class="overHidde" style="max-width: 81px;">{{item.goodsName|blankVal}}</div>
                <div style="max-width: 50px;">{{item.quantity}}</div>
                <div style="max-width: 96px;">{{item.unitPrice/100}}元/件</div>
                <div class="overHidde" style="max-width: 73px;">{{item.goodsTypeName|blankVal}}</div>
                <div class="overHidde" style="max-width: 105px;">{{item.brandName|blankVal}}/{{item.model|blankVal}}</div>
                <div class="overHidde" style="max-width: 113px;">{{item.specification|blankVal}}</div>
                <div style="max-width: 64px;">{{item.ownerType|ownerTypeVal}}</div>
                <div style="max-width: 149px;">{{item.serialNumber|blankVal}}</div>
                <div class="cursor" style="max-width: 49px;text-align: center;padding-left: 0px;" @click="deleteGood(index3)">
                  <icon-font style="color: #FB4246;" type="iconyumengtubiao_shanchu-"></icon-font>
                </div>
              </div>
              <div class="house-data" v-if="operateType.indexOf('1')>-1||operateType.indexOf('2')>-1">
                <div class="cursor" style="text-align: center;color: #0A87F8;padding-left: 0px;" @click="goAddGood" v-if="operateType.indexOf('1')>-1"><icon-font type="iconyumengtubiao_tianjia" style="margin-right: 5px;"/>新增物品(新增至仓库)</div>
                <div class="cursor" style="text-align: center;color: #0A87F8;padding-left: 0px;" @click="goDeploymentGood" v-if="operateType.indexOf('2')>-1"><icon-font type="iconyumengtubiao_qiehuanweiliebiao" style="margin-right: 5px;"/>从仓库调配(仓库内已有物品)</div>
              </div>
              <div class="house-data" v-if="operateType.indexOf('1')==-1&&operateType.indexOf('2')==-1">
                <div style="text-align: center;color: #FFA036;padding-left: 0px;">您没有物品添加和调配权限，请联系管理员设置</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix" style="width: 100%;padding:32px 0px 0px 0;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSaveRoomConfig">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="saveRoomConfig">
          保存
        </a-button>
      </div>
    </div>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1200px" v-model="addHouseGoodDialog" class="ownModalBorder titDialog" title="添加物品" @cancel="addHouseGoodDialog=false">
      <add-house-good :formType="formType" :defaultGoodInfo="clickItemInfo" @cancelSave="cancelSave" @addGoodList="addGoodList"></add-house-good>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1200px" v-model="deploymentHouseGoodDilog" class="ownModalBorder titDialog" title="物品调配" @cancel="deploymentHouseGoodDilog=false">
      <deployment-house :formType="formType" :defaultGoodInfo="clickItemInfo" @cancelSave="cancelSave" @addGoodList="addGoodList"></deployment-house>
    </a-modal>
  </div>
</template>

<script>
import AddHouseGood from '../../assets/management/addHouseGood';
import DeploymentHouse from '../../assets/management/deploymentHouse';
export default {
  name: "configDefault",
  components: {
    AddHouseGood,
    DeploymentHouse,
  },
  props: {
    housePublicConfig:{
      type:Array,
    },
    currentConfig:{
      type:Array,
    },
    fromType:{
      type:String,
    },
  },
  data() {
    return {
      showPublicConfig:[],
      showPublicConfigSize:0,
      showPublicConfigLine:0,
      clickItemInfo:{
        clickItemId:'',
        clickItemName:'',
        clickItemPid:'',
        clickItemPName:'',
      },
      clickItemLineIndex:undefined,
      leftWidth:'',
      clickItemIndex:undefined,
      addHouseGoodDialog:false,
      deploymentHouseGoodDilog:false,
      maskStyle:{backgroundColor:'rgba(0,0,0,0.05)'},
      formType:'add',
      operateType:[],
    }
  },
  created() {
    this.getPermission();
    this.initData();
  },
  methods: {
    getPermission(){
      let markArr = ['mk_assets_management_tjwp','mk_assets_management_dp'];
      let btnArr = [];
      markArr.forEach(ele => {
        JSON.parse(sessionStorage.getItem('permissions')).some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_assets_management_tjwp'){
              btnArr.push('1');
            }else if(value.mark == 'mk_assets_management_dp'){
              btnArr.push('2');
            }
            return true;
          }
        });
      });
      this.operateType = btnArr;
    },
    deleteGood(index3){
      this.showPublicConfig[this.clickItemIndex].quantity = this.showPublicConfig[this.clickItemIndex].quantity - this.showPublicConfig[this.clickItemIndex].assetsList[index3].quantity;
      this.showPublicConfig[this.clickItemIndex].assetsList.splice(index3,1);
    },
    addGoodList(goodList){
      this.addHouseGoodDialog = false;
      this.deploymentHouseGoodDilog = false;
      this.showPublicConfig.forEach((item)=>{
        goodList.forEach((temp)=>{
          if(item.id == temp.goodsId){
            let obj =Object.assign({},temp);
            item.assetsList.push(obj);
            item.quantity += Number(temp.quantity);
          }
        });
      })
    },
    cancelSave(){
      this.addHouseGoodDialog = false;
      this.deploymentHouseGoodDilog = false;
    },
    goAddGood(){
      this.addHouseGoodDialog = true;
    },
    goDeploymentGood(){
      this.deploymentHouseGoodDilog = true;
    },
    initData() {
      this.showPublicConfig = [];
      this.housePublicConfig.forEach((item) => {
        let obj = Object.assign({}, item);
        obj.assetsList = [];
        this.currentConfig.forEach((temp) => {
          if (temp.id == item.id) {
            obj = Object.assign({}, temp);
          }
        });
        this.showPublicConfig.push(obj);
      });
      this.showPublicConfigSize = this.showPublicConfig.length;
      this.showPublicConfigLine = Math.ceil(this.showPublicConfigSize/5);
    },
    clickItem(index1,index2){
      if(this.showPublicConfig[(index1-1)*5+index2-1].checked){
        this.clickItemInfo.clickItemId = '';
        this.clickItemInfo.clickItemName = '';
        this.clickItemInfo.clickItemPid = '';
        this.clickItemInfo.clickItemPName = '';
        this.clickItemLineIndex = undefined;
        this.clickItemIndex = undefined;
        this.leftWidth = '';
        this.showPublicConfig[(index1-1)*5+index2-1].checked = false;
      }
      else{
        this.clickItemInfo.clickItemId = this.showPublicConfig[(index1-1)*5+index2-1].id;
        this.clickItemInfo.clickItemName = this.showPublicConfig[(index1-1)*5+index2-1].name;
        this.clickItemInfo.clickItemPid = this.showPublicConfig[(index1-1)*5+index2-1].pid;
        this.clickItemInfo.clickItemPName = this.showPublicConfig[(index1-1)*5+index2-1].pname;
        this.clickItemLineIndex = index1;
        this.leftWidth = 'left:calc(' + (index2-1)*20 + '% + 25px)';
        this.clickItemIndex = (index1-1)*5+index2-1;
        this.showPublicConfig[(index1-1)*5+index2-1].checked = true;
      }
      //其他的都取消全选
      this.showPublicConfig.forEach((item,index)=>{
        if((index1-1)*5+index2-1!=index){
          item.checked = false;
        }
      });
    },
    cancelSaveRoomConfig(){
      this.$emit('cancelSaveRoomConfig');
    },
    saveRoomConfig() {
      let modifyConfig = [];
      this.showPublicConfig.forEach((item)=>{
        if(item.quantity>0){
          modifyConfig.push(item)
        }
      });
      if(this.fromType=='room'){
        this.$emit('saveRoomConfig',modifyConfig);
      }
      else{
        this.$emit('saveHouseConfig',modifyConfig);
      }
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
    ownerTypeVal(val){
      if (!val) {
        return '-';
      } else if(val==1) {
        return '公司';
      } else if(val==2) {
        return '业主';
      }
    },
  }
}
</script>

<style scoped lang="less">
  .configAsset-box{
    padding: 20px;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    .selectStyle {
      margin-top: 10px;
      min-height: 300px;
      .item{
        height: 21px;
        line-height: 21px;
        width: 20%;
        margin: 8px 0;
        .iconStyle{
          i{
            vertical-align: -0.22em;
            width: 16px;
            height: 16px;
            svg{
              width: 16px;
              height: 16px;
            }
          }
        }
      }
      .selectedStyle{
        font-size: 14px;
        color: #111111;
      }
      .unSelectStyle{
        font-size: 14px;
        color: #777777;
      }
      .editStyle{
        width: 16px;
        height: 16px;
        background: #F6F7F8;
        border-radius: 2px;
        text-align: center;
      }
      .selectedStyle1{
        font-size: 12px;
        color: #0A87F8;
      }
      .selectedStyle2{
        font-size: 12px;
        color: #777777;
      }
      .selectItemStyle{
        width: 960px;
        background: #FFFFFF;
        box-shadow: 0px 2px 10px 0px rgba(187, 187, 187, 0.1);
        border: 1px solid #F4F4F4;
        margin-bottom: 15px;
        position: relative;
        border-radius: 4px;
        .basicsInfo {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding: 10px;
          .table {
            width: 940px;
            border-left: 1px solid #EEEEEE;
            border-top: 1px solid #EEEEEE;
            font-size: 12px;
            border-radius: 4px;
            .table-title {
              width: 940px;
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
            }
            .house-data {
              width: 940px;
              display: flex;
              color: #111111;
              font-size: 13px;
              border-radius: 0px 0px 4px 4px;
              background: #FFFFFF;
              & > div {
                flex: 1;
                height: 40px;
                line-height: 40px;
                border-right: 1px solid #EEEEEE;
                border-bottom: 1px solid #EEEEEE;
                padding-left: 10px;
              }
            }
          }
        }
      }
    }
    .titleStyle{
      font-size: 16px;
      color: #111111;
      font-weight: 500;
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