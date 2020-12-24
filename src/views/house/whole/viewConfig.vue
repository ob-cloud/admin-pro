<template>
  <div class="viewPublic-box">
    <!-- 非强关联 -->
    <div v-if="!configRelationFlag" class="unConfigRelationStyle" style="width: 100%">
      <div style="margin-bottom: 6px;">
        <a-checkbox v-model="checkAll" @change="checkAllItem" :indeterminate="indeterminate" ><span class="titleStyle">物品配置</span></a-checkbox>
        <!--<span class="cursor" style="color: #0A87F8;" @click="goViewAssets" v-mark="['mk_assets_management_ck']"><icon-font type="iconyumengtubiao_yanjing-1" style="margin-right: 5px;"/>查看物资明细</span>-->
      </div>
      <div class="selectStyle clearfix">
        <div class="f-fl clearfix item" v-for="(item,index) in showPublicConfig" :key="index">
          <a-checkbox class="f-fl overHidde" style="width: auto;" v-model="item.checked" @change="(value)=>checkItem(value,index)"><span :class="item.checked?'selectedStyle':'unSelectStyle'">{{item.name}}</span></a-checkbox>
          <div v-if="item.checked" class="f-fl" style="height: 28px;line-height: 28px;margin-right: 10px;font-weight: 100;">
            x
          </div>
          <div v-if="item.checked" class="clearfix f-fl u-bottom-border quantityStyle" style="max-width: 96px;">
            <div class="f-fl cursor" style="width: 16px;" @click="reduceQuantity(item)">
              <div class="commonStyle" :class="item.quantity==1?'unEditStyle':'editStyle'" >
                <icon-font type="iconjian" />
              </div>
            </div>
            <a-input style="width: 45px;text-align: center;color: #111111" class="f-fl" v-validate="'naturalNum|min(1)|max(99999)'" placeholder="请输入" v-model="item.quantity"></a-input>
            <div class="f-fl cursor" style="width: 16px;" @click="plusQuantity(item)">
              <div class="commonStyle" :class="item.quantity==99999?'unEditStyle':'editStyle'" >
                <icon-font type="iconjia" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 强关联 -->
    <div v-if="configRelationFlag" class="configRelationStyle" style="width: 100%">
      <div style="width: 100%;">
        <span class="titleStyle">物品配置</span>
        <!-- 不显示查看明细 -->
        <!--<span class="cursor" style="color: #0A87F8;margin-left: 25px;" @click="goViewAssets" v-mark="['mk_assets_management_ck']"><icon-font type="iconyumengtubiao_yanjing-1" style="margin-right: 5px;"/>查看物资明细</span>-->
      </div>
      <div class="selectStyle clearfix" style="width: 100%;">
        <div class="clearfix" v-for="index1 of showPublicConfigLine" :key="index1">
          <div class="item f-fl cursor clearfix" v-for="index2 of 5" :key="index2" v-if="(index1*5+index2-6)<showPublicConfigSize" @click.stop="clickItem(index1,index2)">
            <div class="f-fl iconStyle">
              <icon-font v-if="showPublicConfig[(index1-1)*5+index2-1].quantity&&showPublicConfig[(index1-1)*5+index2-1].quantity>0" type="iconduoxuanyixuanzhong" style="color: #0A87F8;"></icon-font>
              <icon-font v-else type="iconduoxuanweixuanzhong" style="color: #d9d9d9;"></icon-font>
              <span style="padding: 0 8px 0 4px;" :class="showPublicConfig[(index1-1)*5+index2-1].checked?'selectedStyle':'unSelectStyle'">{{showPublicConfig[(index1-1)*5+index2-1].name}}</span>
            </div>
            <div v-if="showPublicConfig[(index1-1)*5+index2-1].quantity>0" class="f-fl" style="margin-right: 10px;font-weight: 100;line-height: 18px;">
              x
            </div>
            <div v-if="showPublicConfig[(index1-1)*5+index2-1].quantity>0" class="f-fl" style="margin-right: 10px;color: #111111;">
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
                  <div style="max-width: 96px;border-radius: 4px 0px 0px 0px;">物品</div>
                  <div style="max-width: 66px;">数量</div>
                  <div style="max-width: 110px;">单价</div>
                  <div style="max-width: 93px;">物品类型</div>
                  <div style="max-width: 122px;">品牌/型号</div>
                  <div style="max-width: 115px;">规格</div>
                  <div style="max-width: 82px;">归属方</div>
                  <div style="max-width: 180px;">物品编号</div>
                  <div style="max-width: 77px;border-radius: 0px 4px 0px 0px;text-align: center;padding-left: 0px;">操作</div>
                </div>
                <div class="house-data" v-if="showPublicConfigDataFlag" v-for="(item,index3) in showPublicConfig[clickItemIndex].assetsList" :key="index3">
                  <div class="overHidde" style="max-width: 96px;">{{item.goodsName|blankVal}}</div>
                  <div style="max-width: 66px;">{{item.quantity}}</div>
                  <div style="max-width: 110px;">{{ (!item.unitPrice||item.unitPrice==null)?'-':item.unitPrice/100+'元/件'}}</div>
                  <div class="overHidde" style="max-width: 93px;">{{item.goodsTypeName|blankVal}}</div>
                  <div class="overHidde" style="max-width: 122px;">{{item.brandName|blankVal}}/{{item.model|blankVal}}</div>
                  <div class="overHidde" style="max-width: 115px;">{{item.specification|blankVal}}</div>
                  <div style="max-width: 82px;">{{item.ownerType|ownerTypeVal}}</div>
                  <div style="max-width: 180px;">{{item.serialNumber|blankVal}}</div>
                  <div style="max-width: 77px;text-align: center;padding-left: 0px;">
                    <a-popover :title="null" trigger="hover" v-if="showFlag&&checkOpts(item) == true">
                      <template slot="content">
                        <div v-if="item.btnArr.indexOf('1') != -1" @click.stop="goDeployment(item)" class="action cursor" >调配</div>
                        <div v-if="item.btnArr.indexOf('2') != -1" @click.stop="goEdit(item,0)" class="action cursor" >编辑</div>
                        <div v-if="item.btnArr.indexOf('3') != -1" @click.stop="goScrap(item)" class="action cursor" >报废</div>
                        <div v-if="item.btnArr.indexOf('4') != -1" @click.stop="goLoss(item)" class="action cursor" >遗失</div>
                        <div v-if="item.btnArr.indexOf('6') != -1" @click.stop="goChangeStatus(item)" class="action cursor" >修改状态</div>
                        <div v-if="item.btnArr.indexOf('7') != -1" @click.stop="goEdit(item,1)" class="action cursor" >核对信息</div>
                        <div v-if="item.btnArr.indexOf('5') != -1" @click.stop="goDelete(item)" class="action cursor" >删除</div>
                      </template>
                      <div style="width: 100%;height: 100%" class="cursor">
                        <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                      </div>
                    </a-popover>
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
    </div>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1200px" v-model="addHouseGoodDialog" class="ownModalBorder titDialog" title="添加物品" @cancel="addHouseGoodDialog=false">
      <add-house-good :formType="formType" :defaultGoodInfo="clickItemInfo" :houseInfo="houseParamInfo" @cancelSave="cancelSaveAsset" @addGoodList="addSuccessAsset"></add-house-good>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1200px" v-model="deploymentHouseGoodDilog" class="ownModalBorder titDialog" title="物品调配" @cancel="deploymentHouseGoodDilog=false">
      <deployment-house :formType="formType" :defaultGoodInfo="clickItemInfo" :houseInfo="houseParamInfo" @cancelSave="cancelSaveAsset" @addGoodList="addSuccessAsset"></deployment-house>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="800px" v-model="addGoodDialog" class="ownModalBorder titDialog" :title="addGoodTitle" @cancel="addGoodDialog=false;">
      <add-good :record="record" @cancelSave="cancelSaveAsset" :houseInfo="houseParamInfo" @addSuccess="addSuccessAsset"></add-good>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle"  :maskClosable="false" width="800px" v-model="deploymentDialog" class="ownModalBorder titDialog" title="调配物品" @cancel="deploymentDialog=false;">
      <deployment :record="record" @cancelSave="cancelSaveAsset" @deploymentSuccess="addSuccessAsset"></deployment>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="520px" v-model="changeStatusDialog" class="ownModalBorder titDialog" title="修改状态" @cancel="changeStatusDialog=false;">
      <change-status :record="record" @cancelSave="cancelSaveAsset" @changeStatusSuccess="addSuccessAsset"></change-status>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="520px" v-model="lossDialog" class="ownModalBorder titDialog" title="遗失" @cancel="lossDialog=false;">
      <loss :record="record" @cancelSave="cancelSaveAsset" @lossSuccess="addSuccessAsset"></loss>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="520px" v-model="deleteDialog" class="ownModalBorder titDialog" title="删除" @cancel="deleteDialog=false;">
      <delete :record="record" @cancelSave="cancelSaveAsset" @deleteSuccess="addSuccessAsset"></delete>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="520px" v-model="scrapDialog" class="ownModalBorder titDialog" title="报废" @cancel="scrapDialog=false;">
      <scrap :record="record" @cancelSave="cancelSaveAsset" @scrapSuccess="addSuccessAsset"></scrap>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1000px" v-model="assetsManageDialog" class="ownModalBorder titDialog" :title="assetsManageTitle" @cancel="assetsManageDialog=false;">
      <assets-manage :houseInfo="houseParamInfo"></assets-manage>
    </a-modal>
  </div>
</template>

<script>
import AddHouseGood from '../../assets/management/addHouseGood';
import DeploymentHouse from '../../assets/management/deploymentHouse';
import AddGood from '../../assets/management/addGood';
import Deployment from '../../assets/management/deployment';
import ChangeStatus from '../../assets/management/changeStatus';
import Loss from '../../assets/management/loss';
import Delete from '../../assets/management/delete';
import Scrap from '../../assets/management/scrap';
import AssetsManage from './assetsManage';
import * as PublicAPI from "@/api/public";

export default {
  name: "viewConfig",
  props: {
    configRelationFlag:{
      type:Boolean,
    },
    houseInfo:{
      type:Object
    },
  },
  components: {
    AddHouseGood,
    DeploymentHouse,
    AddGood,
    Deployment,
    ChangeStatus,
    Loss,
    Delete,
    Scrap,
    AssetsManage,
  },
  data() {
    return{
      originPublicConfig:[],
      showPublicConfig:[],
      checkAll:false,
      indeterminate:false,
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
      addGoodDialog:false,
      addGoodTitle:'添加物品',
      addHouseGoodDialog:false,
      deploymentHouseGoodDilog:false,
      deploymentDialog:false,
      changeStatusDialog:false,
      lossDialog:false,
      deleteDialog:false,
      scrapDialog:false,
      statisticsDialog:false,
      assetsManageDialog:false,
      assetsManageTitle:'',
      formType:'edit',
      showFlag:true,    //用于控制资产操作气泡
      record:{},
      showPublicConfigDataFlag:true,
      maskStyle:{backgroundColor:'rgba(0,0,0,0.2)'},
      houseParamInfo:{},
      operateType:[],
    }
  },
  created() {
    this.houseParamInfo = this.houseInfo;
    this.getPermission();
    this.getHouseConfig();
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
    checkOpts(record){
      //1、调配；2、编辑；3、报废；4、遗失；5、删除；6、修改状态；7、核对信息
      let permissions = JSON.parse(sessionStorage.getItem('permissions'));
      let markArr = [];
      let btnArr = [];
      if(record.status==1||record.status==2||record.status==6){
        markArr.push('mk_assets_management_dp')
        markArr.push('mk_assets_management_bjwp');
        markArr.push('mk_assets_management_bf');
        markArr.push('mk_assets_management_ys');
        markArr.push('mk_assets_management_sc');
      }
      else if(record.status==3||record.status==4){
        markArr.push('mk_assets_management_xgzt');
        markArr.push('mk_assets_management_sc');
      }
      else if(record.status==5){
        markArr.push('mk_assets_management_hdxx');
        markArr.push('mk_assets_management_sc');
      }
      //判断资源权限
      markArr.forEach(ele => {
        permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_assets_management_dp'){
              btnArr.push('1');
            }else if(value.mark == 'mk_assets_management_bjwp'){
              btnArr.push('2');
            }else if(value.mark == 'mk_assets_management_bf'){
              btnArr.push('3');
            }else if(value.mark == 'mk_assets_management_ys'){
              btnArr.push('4');
            }else if(value.mark == 'mk_assets_management_sc'){
              btnArr.push('5');
            }else if(value.mark == 'mk_assets_management_xgzt'){
              btnArr.push('6');
            }else if(value.mark == 'mk_assets_management_hdxx'){
              btnArr.push('7');
            }
            return true;
          }
        });

      });
      record.btnArr = btnArr;
      if(btnArr.length > 0){
        return true;
      }
      return false;
    },
    goViewAssets(){
      this.assetsManageDialog = true;
      this.houseParamInfo.operateType = 'view';
    },
    getHouseConfig(){
      // 公区配置、房间配置
      let parameter = {
        houseId:this.houseInfo.houseId,
      };
      this.showPublicConfigDataFlag = false;
      PublicAPI.getHouseConfig(parameter).then(res=>{
        this.showPublicConfig = [];
        if (res.code == 200){
          let tempData = res.data;
          tempData.forEach((item)=>{
            item.checked = false;
            this.showPublicConfig.push(item);
          });
          let selectedConfig = []
          this.showPublicConfig.forEach((item)=>{
            if(item.quantity>0){
              item.checked = true;
              selectedConfig.push(item)
            }
          });
          this.indeterminate = !!selectedConfig.length && selectedConfig.length < this.showPublicConfig.length;
          this.checkAll = selectedConfig.length === this.showPublicConfig.length;
          this.showPublicConfigSize = this.showPublicConfig.length;
          this.showPublicConfigLine = Math.ceil(this.showPublicConfigSize/5);
          this.showPublicConfigDataFlag = true;
        }
      })
    },
    addSuccessAsset(){
      this.addGoodDialog = false;
      this.deploymentDialog = false;
      this.changeStatusDialog = false;
      this.lossDialog = false;
      this.deleteDialog = false;
      this.scrapDialog = false;
      this.addHouseGoodDialog = false;
      this.deploymentHouseGoodDilog = false;
      this.$emit('refreshinfoFun',true);
      setTimeout(()=>{
        this.getHouseConfig();
      },300);
    },
    cancelSaveAsset(){
      this.addGoodDialog = false;
      this.deploymentDialog = false;
      this.changeStatusDialog = false;
      this.lossDialog = false;
      this.deleteDialog = false;
      this.scrapDialog = false;
      this.addHouseGoodDialog = false;
      this.deploymentHouseGoodDilog = false;
    },
    initShowFlag(){
      this.showFlag = false;
      setTimeout(()=>{
        this.showFlag = true;
      },500);
    },
    goDelete(record){
      this.deleteDialog = true;
      this.record = record;
      this.initShowFlag();
    },
    goChangeStatus(record){
      this.changeStatusDialog = true;
      this.record = record;
      this.initShowFlag();
    },
    goLoss(record){
      this.record = record;
      this.lossDialog = true;
      this.initShowFlag();
    },
    goScrap(record){
      this.record = record;
      this.scrapDialog = true;
      this.initShowFlag();
    },
    goEdit(record,val){
      this.record = record;
      this.record.isChecked = val;  //是否核对信息0否1是
      this.addGoodDialog = true;
      if(val==1){
        this.addGoodTitle = '核对信息';
      }
      else{
        this.addGoodTitle = '修改物品';
      }
      this.initShowFlag();
    },
    goDeployment(record){
      this.record = record;
      this.deploymentDialog = true;
      this.initShowFlag();
    },
    clickItem(index1,index2){
      //判断是否第一次点击
      if(!this.clickItemInfo.clickItemId){
        this.clickItemInfo.clickItemId = this.showPublicConfig[(index1-1)*5+index2-1].id;
        this.clickItemInfo.clickItemName = this.showPublicConfig[(index1-1)*5+index2-1].name;
        this.clickItemInfo.clickItemPid = this.showPublicConfig[(index1-1)*5+index2-1].pid;
        this.clickItemInfo.clickItemPName = this.showPublicConfig[(index1-1)*5+index2-1].pname;
        this.clickItemLineIndex = index1;
        this.leftWidth = 'left:calc(' + (index2-1)*20 + '% + 25px)';
        this.clickItemIndex = (index1-1)*5+index2-1;
        this.showPublicConfig[(index1-1)*5+index2-1].checked = true;
      }
      else {
        if (this.showPublicConfig[(index1 - 1) * 5 + index2 - 1].checked) {
          this.clickItemInfo.clickItemId = '';
          this.clickItemInfo.clickItemName = '';
          this.clickItemInfo.clickItemPid = '';
          this.clickItemInfo.clickItemPName = '';
          this.clickItemLineIndex = undefined;
          this.clickItemIndex = undefined;
          this.leftWidth = '';
          this.showPublicConfig[(index1 - 1) * 5 + index2 - 1].checked = false;
        } else {
          this.clickItemInfo.clickItemId = this.showPublicConfig[(index1 - 1) * 5 + index2 - 1].id;
          this.clickItemInfo.clickItemName = this.showPublicConfig[(index1 - 1) * 5 + index2 - 1].name;
          this.clickItemInfo.clickItemPid = this.showPublicConfig[(index1 - 1) * 5 + index2 - 1].pid;
          this.clickItemInfo.clickItemPName = this.showPublicConfig[(index1 - 1) * 5 + index2 - 1].pname;
          this.clickItemLineIndex = index1;
          this.leftWidth = 'left:calc(' + (index2 - 1) * 20 + '% + 25px)';
          this.clickItemIndex = (index1 - 1) * 5 + index2 - 1;
          this.showPublicConfig[(index1 - 1) * 5 + index2 - 1].checked = true;
        }
      }
      //其他的都取消全选
      this.showPublicConfig.forEach((item,index)=>{
        if((index1-1)*5+index2-1!=index){
          item.checked = false;
        }
      });
    },
    goAddGood(){
      this.houseParamInfo.operateType = 'add';
      this.addHouseGoodDialog = true;
    },
    goDeploymentGood(){
      this.houseParamInfo.operateType = 'deployment';
      this.deploymentHouseGoodDilog = true;
    },
    checkAllItem(value){
      this.indeterminate = false;
      this.checkAll = value.target.checked;
      if(value.target.checked){
        this.showPublicConfig.forEach((item)=>{
          if(!item.checked){
            item.checked = true;
            item.quantity = 1;
          }
        });
      }
      else{
        this.showPublicConfig.forEach((item)=>{
          item.checked = false;
          item.quantity = 0;
        });
      }
    },
    checkItem(value,index){
      if(value.target.checked){
        if(this.showPublicConfig[index].quantity&&this.showPublicConfig[index].quantity>0){
          this.showPublicConfig[index].quantity = this.showPublicConfig[index].quantity
        } else{
          this.showPublicConfig[index].quantity = 1;
        }
      }
      let selectedConfig = [];
      this.showPublicConfig.forEach((item)=>{
        if(item.checked){
          selectedConfig.push(item);
        }
      });
      this.indeterminate = !!selectedConfig.length && selectedConfig.length < this.showPublicConfig.length;
      this.checkAll = selectedConfig.length === this.showPublicConfig.length;
      this.$forceUpdate();
    },
    plusQuantity(item){
      if(item.quantity>9999){
        return ;
      }
      item.quantity += 1;
    },
    reduceQuantity(item){
      if(item.quantity<=1){
        return ;
      }
      item.quantity -= 1;
    },
  },
  filters: {
    ownerTypeVal(val) {
      if (!val) {
        return '-';
      } else if (val == 1) {
        return '公司';
      } else if (val == 2) {
        return '业主';
      }
    },
    blankVal(val) {
      if (!val) {
        return '-';
      } else {
        return val;
      }
    },
  }
}
</script>

<style scoped lang="less">
  .viewPublic-box{
     width: 100%;
    .unConfigRelationStyle{
      margin-bottom: 10px;
      .selectStyle{
        .item{
          width: 191px;
          height: 28px;
          line-height: 28px;
          margin: 0px;
        }
        .selectedStyle{
          font-size: 12px;
          color: #111111;
        }
        .unSelectStyle{
          font-size: 12px;
          color: #111111;
        }
        .quantityStyle{
          height: 28px;
          .commonStyle{
            width: 16px;
            height: 16px;
            line-height: 14px;
            background: #F6F7FB;
            border: 1px solid #EEEEEE;
            text-align: center;
            border-radius: 50%;
            margin-top: 5px;
          }
          .unEditStyle{
            color: #999999;
          }
          .editStyle{
            color: #0A87F8;
          }
          /deep/ .ant-input{
            padding: 3px 0 0 0;
          }
        }
      }
    }
    .configRelationStyle{
      .selectStyle {
        margin: 6px 0 9px 0;
        .item{
          width: 20%;
          margin: 6px 0 6px 0;
          .iconStyle{
            i{
              vertical-align: -0.25em;
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
          font-size: 12px;
          color: #111111;
        }
        .unSelectStyle{
          font-size: 12px;
          color: #111111;
        }
        .editStyle{
          width: 18px;
          height: 18px;
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
          width: 954px;
          background: #ffffff;
          box-shadow: 0px 2px 10px 0px rgba(187, 187, 187, 0.1);
          border: 1px solid #F4F4F4;
          margin-bottom: 12px;
          position: relative;
          border-radius: 4px;
          margin-top: 8px;
          .basicsInfo {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            padding: 10px;
            .table {
              width: 932px;
              border-left: 1px solid #EEEEEE;
              border-top: 1px solid #EEEEEE;
              font-size: 12px;
              border-radius: 4px;
              .table-title {
                width: 932px;
                display: flex;
                background: #F7F8FB;
                color: #777777;
                font-size: 12px;
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
                width: 932px;
                display: flex;
                color: #111111;
                font-size: 12px;
                background: #FFFFFF;
                border-radius: 0px 0px 4px 4px;
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
            & /deep/ .ant-popover {
              .ant-popover-inner-content {
                text-align: center;
                padding: 5px 0;
                .action {
                  padding: 8px 10px;
                }
                .action:hover {
                  cursor: pointer;
                  background: rgba(10, 135, 248, 0.1);
                }
              }
            }
          }
        }
      }
    }
  }
</style>