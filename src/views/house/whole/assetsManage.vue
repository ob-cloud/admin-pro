<template>
  <div class="assetsManage-box">
    <div class="detail_info">
      <div class="titleStyle">资产明细</div>
      <div class="lockList_info">
        <div style="min-height: calc(100vh - 303px)">
          <div class="basicsInfo">
            <div class="table">
              <div class="table-title">
                <div style="border-radius: 4px 0px 0px 0px;padding-left: 0;text-align: center;" :style="showPositionFlag?'max-width: 70px;':''" v-if="showPositionFlag">所在位置</div>
                <div style="padding-left: 0;text-align: center;" :style="showPositionFlag?'max-width: 60px;':'max-width: 80px;border-radius: 4px 0px 0px 0px;'">归属方</div>
                <div :style="showPositionFlag?'max-width: 98px;':'max-width: 121px;'">物品</div>
                <div style="max-width: 69px;">数量</div>
                <div :style="showPositionFlag?'max-width: 98px;':'max-width: 110px;'">单价</div>
                <div style="max-width: 94px;">物品类型</div>
                <div :style="showPositionFlag?'max-width: 131px;':'max-width: 143px;'">品牌/型号</div>
                <div style="max-width: 120px;">规格</div>
                <div style="max-width: 147px;">物品编号</div>
                <div style="max-width: 70px;text-align: center;padding-left: 0px;border-radius: 0px 4px 0px 0px;">操作</div>
              </div>
              <div class="house-data" v-for="(item,index) in tableData" :key="index">
                <a-popover>
                  <template slot="content">
                    <p style="padding: 3px 6px;">
                      {{item.roomName|blankVal}}
                    </p>
                  </template>
                  <div class="overHidde cursor" style="max-width: 70px;padding-left: 0;text-align: center;" v-if="showPositionFlag" @click="openDetail(item)">{{item.roomName|blankVal}}</div>
                </a-popover>
                <div class="cursor" style="padding-left: 0;text-align: center;" :style="showPositionFlag?'max-width: 60px;':'max-width: 80px;'" @click="openDetail(item)">{{item.ownerTypeName|blankVal}}</div>
                <a-popover>
                  <template slot="content">
                    <p style="padding: 3px 6px;">
                      <span>{{item.goodsName|blankVal}}</span>
                      <span v-if="item.status==5" class="status5">未核对</span>
                    </p>
                  </template>
                  <div class="overHidde cursor" :style="showPositionFlag?'max-width: 98px;':'max-width: 121px;'" @click="openDetail(item)">
                    <span>{{item.goodsName|blankVal}}</span>
                    <span v-if="item.status==5" class="status5">未核对</span>
                  </div>
                </a-popover>
                <div class="overHidde cursor" style="max-width: 69px;" @click="openDetail(item)">{{item.quantity}}</div>
                <div class="cursor" :style="showPositionFlag?'max-width: 98px;':'max-width: 110px;'" @click="openDetail(item)">{{item.unitPrice?item.unitPrice/100+'元/件':'-'}}</div>
                <a-popover>
                  <template slot="content">
                    <p style="padding: 3px 6px;">
                      {{item.goodsTypeName|blankVal}}
                    </p>
                  </template>
                  <div class="overHidde cursor" style="max-width: 94px;" @click="openDetail(item)">{{item.goodsTypeName|blankVal}}</div>
                </a-popover>
                <a-popover>
                  <template slot="content">
                    <p style="padding: 3px 6px;">
                      {{item.brandName|blankVal}}/{{item.model|blankVal}}
                    </p>
                  </template>
                  <div class="overHidde cursor" :style="showPositionFlag?'max-width: 131px;':'max-width: 143px;'" @click="openDetail(item)">{{item.brandName|blankVal}}/{{item.model|blankVal}}</div>
                </a-popover>
                <a-popover>
                  <template slot="content">
                    <p style="padding: 3px 6px;">
                      {{item.specification|blankVal}}
                    </p>
                  </template>
                  <div class="overHidde cursor" style="max-width: 120px;" @click="openDetail(item)">{{item.specification|blankVal}}</div>
                </a-popover>
                <a-popover>
                  <template slot="content">
                    <p style="padding: 3px 6px;">
                      {{item.serialNumber|blankVal}}
                    </p>
                  </template>
                  <div class="overHidde cursor" style="max-width: 147px;" @click="openDetail(item)">{{item.serialNumber|blankVal}}</div>
                </a-popover>
                <div class="operatorStyle" style="max-width: 70px;text-align: center;padding-left: 0px;">
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
          <div class="leftWarningStyle f-fl cursor">
            <span @click="goAddGood" v-mark="['mk_assets_management_tjwp']" style="color: #0A87F8;font-size: 13px;margin-right: 40px;padding: 10px 0;"><icon-font type="iconyumengtubiao_tianjia" style="margin-right: 5px;"/>新增物品(仓库内没有相应物品)</span>
            <span @click="goDeploymentGood" v-mark="['mk_assets_management_dp']" style="color: #0A87F8;font-size: 13px;padding: 10px 0;"><icon-font type="iconyumengtubiao_qiehuanweiliebiao" style="margin-right: 5px;"/>从仓库调配(仓库内已有相应物品)</span>
          </div>
          <div class="contFoot f-fr" v-show="tableData.length>0">
            <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
          </div>
        </div>
      </div>
    </div>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1200px" v-model="addHouseGoodDialog" class="ownModalBorder titDialog" title="添加物品" @cancel="addHouseGoodDialog=false">
      <add-house-good :formType="formType" :houseInfo="houseInfo" @cancelSave="cancelSaveAsset" @addGoodList="addSuccessAsset"></add-house-good>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1200px" v-model="deploymentHouseGoodDilog" class="ownModalBorder titDialog" title="物品调配" @cancel="deploymentHouseGoodDilog=false">
      <deployment-house :formType="formType" :houseInfo="houseInfo" @cancelSave="cancelSaveAsset" @addGoodList="addSuccessAsset"></deployment-house>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="800px" v-model="addGoodDialog" class="ownModalBorder titDialog" :title="addGoodTitle" @cancel="addGoodDialog=false;">
      <add-good :record="record" :houseInfo="houseInfo" @cancelSave="cancelSaveAsset" @addSuccess="addSuccessAsset"></add-good>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="800px" v-model="deploymentDialog" class="ownModalBorder titDialog" title="调配物品" @cancel="deploymentDialog=false;">
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
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="detailDialog" class="ownModalBorder titDialog" title="物品详情" @cancel="isRefreshFun">
      <good-detail :record="record" @refreshinfoFun="refreshinfoFun" @deleteAllSuccess="deleteAllSuccess"></good-detail>
    </a-modal>
  </div>
</template>

<script>
import AddGood from '../../assets/management/addGood';
import Deployment from '../../assets/management/deployment';
import ChangeStatus from '../../assets/management/changeStatus';
import Loss from '../../assets/management/loss';
import Delete from '../../assets/management/delete';
import Scrap from '../../assets/management/scrap';
import AddHouseGood from '../../assets/management/addHouseGood';
import DeploymentHouse from '../../assets/management/deploymentHouse';
import GoodDetail from '../../assets/management/goodDetail';
import * as API from "@/api/assets";

export default {
  name: "assetsManage",
  components: {
    AddGood,
    Deployment,
    ChangeStatus,
    Loss,
    Delete,
    Scrap,
    AddHouseGood,
    DeploymentHouse,
    GoodDetail,
  },
  props: {
    houseInfo:{
      type:Object,
    },
  },
  data() {
    return {
      sendData: {
        current: 1,                     // 当前页数
        size: 10,                       // 每页返回的记录数量
        houseId:'',
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
      maskStyle:{backgroundColor:'rgba(0,0,0,0.2)'},
      spinLoading:true,
      showFlag:true,
      addHouseGoodDialog:false,
      deploymentHouseGoodDilog:false,
      addGoodDialog:false,
      addGoodTitle:'添加物品',
      deploymentDialog:false,
      changeStatusDialog:false,
      lossDialog:false,
      deleteDialog:false,
      scrapDialog:false,
      record:{},
      formType:'view',
      showPositionFlag:false,
      detailDialog:false,
      isRefresh:false,
    }
  },
  created() {
    if(this.houseInfo.fromType == 'share'){
      this.showPositionFlag = true;
    }
    this.initData();
  },
  mounted() {

  },
  methods: {
    openDetail(item){
      this.record = item;
      this.detailDialog = true;
    },
    deleteAllSuccess(){
      this.detailDialog = false;
      this.$emit('refreshinfoFun',true);
      this.initData();
    },
    isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
      if(this.isRefresh){
        this.$emit('refreshinfoFun',true);
        this.initData();
      }
      this.detailDialog = false;
      this.isRefresh = false
    },
    refreshinfoFun(res){  //详情有改变的操作  就改变状态
      if(res){
        this.isRefresh = res
      }
    },
    goAddGood(){
      this.addHouseGoodDialog = true;
    },
    goDeploymentGood(){
      this.deploymentHouseGoodDilog = true;
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
        this.initData();
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
    onSizeChange(current) {
      this.sendData.current = current;
      this.initData();
    },
    onShowSizeChange(current, pageSize) {
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.initData();
    },
    initData(){
      this.spinLoading = true;
      this.sendData.houseId = this.houseInfo.houseId;
      API.listForHouse(this.sendData).then(res => {
        if (res&&res.code === "200") {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
          this.spinLoading = false;
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
    ownerTypeVal(val){
      if (!val) {
        return '-';
      } else if(val==1) {
        return '公司';
      } else if(val==2) {
        return '业主';
      }
    },
  },
}
</script>

<style scoped lang="less">
  .assetsManage-box{
    height: calc(100vh - 150px);
    overflow-y: auto;
    .titleStyle{
      color: #111111;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .detail_info {
      padding: 20px;
      .lockList_info {
        .basicsInfo {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .table {
            width: 954px;
            border-left: 1px solid #EEEEEE;
            border-top: 1px solid #EEEEEE;
            font-size: 12px;
            border-radius: 4px;
            .table-title {
              width: 954px;
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
                padding-left: 8px;
              }

              .borderBottomStyle {
                border-bottom: 1px solid #EEEEEE;
              }

              .borderRightStyle {
                border-right: 1px solid #EEEEEE;
              }

              .numTileStyle {
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
              }

              .itemStyle {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;

                .numStyle {
                  flex: 1
                }
              }
            }
            .house-no-data {
              width: 954px;
              border-radius: 0px 0px 4px 4px;
              border-right: 1px solid #EEEEEE;
              border-bottom: 1px solid #EEEEEE;
              background-color: #ffffff;
            }
            .totalStyle {
              background: #FFF9F1;
              box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.06);
            }
            .house-data {
              width: 954px;
              display: flex;
              color: #111111;
              font-size: 13px;
              border-radius: 0px 0px 4px 4px;
              & > div {
                flex: 1;
                height: 46px;
                line-height: 46px;
                border-right: 1px solid #EEEEEE;
                border-bottom: 1px solid #EEEEEE;
                padding-left: 8px;
              }
              .status5{
                width: 44px;
                height: 18px;
                border-radius: 4px;
                color: #FF4347;
                background-color: fade(#FF4347, 10%);
                font-size: 12px;
                padding: 2px 4px;
                margin-left: 6px;
              }
              .fontStyle1 {
                text-align: center;
              }
              .fontStyle2 {
                text-align: center;
                color: #0A87F8;
              }
              .fontStyleBig {
                font-weight: 500;
              }
              /deep/ .ant-select-selection__rendered {
                height: 45px;
                line-height: 46px;
              }
              /deep/ .ant-select-selection--single {
                height: 45px;
                line-height: 46px;
              }
              .commonStyle {
                width: 16px;
                height: 16px;
                line-height: 16px;
                background: #F6F7FB;
                border: 1px solid #EEEEEE;
                text-align: center;
                border-radius: 50%;
                margin-top: 13px;
              }
              .splitStyle {
                border-left: 1px dashed #EEEEEE;
                width: 1px;
                height: 20px;
                margin-top: 13px;
                padding-right: 0px;
              }
              .unEditStyle {
                color: #999999;
              }
              .editStyle {
                color: #0A87F8;
              }
              /deep/ .ant-input {
                padding: 10px 0 0 0;
              }
              .operatorStyle{
                & /deep/ .ant-popover {
                  .ant-popover-inner-content {
                    text-align: center;
                    padding: 5px 0;
                    width: 80px;
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

        .leftWarningStyle {
          margin-top: 15px;
          height: 56px;
          line-height: 56px;
        }

        .warningStyle {
          color: #FFA036;
          font-size: 13px;
        }

        .goAddStyle {
          color: #0A87F8;
          font-size: 13px;
          margin-left: 10px;
        }
      }
    }
  }
</style>