<template>
  <div class="addWarehouse-box">
    <div class="headStyle clearfix">
        <div class="iconStyle f-fl">
          <icon-font type="iconcangku"></icon-font>
        </div>
        <div class="nameStyle f-fl">
          {{originData.name}}
        </div>
        <div class="deleteStyle f-fr" v-if="currentFormType==1" v-mark="['mk_assets_warehouse_sc']">
          <span @click="deleteWarehouse" class="cursor">
            <icon-font type="iconyumengtubiao_shanchu-"/>
            删除
          </span>
        </div>
        <div class="editStyle f-fr" v-if="currentFormType==1" v-mark="['mk_assets_warehouse_bj']">
          <span @click="editWarehouse" class="cursor">
            <icon-font type="iconyumengtubiao_bianji-1"/>
            编辑
          </span>
        </div>
    </div>
    <div class="splitStyle"></div>
    <div class="contentStyle clearfix">
      <div style="margin-top: 10px;" v-if="currentFormType==2">
        <label-item class="u-bottom-border" title="库房名称" :must-fill="true" :maxSize="15" :valLength="sendData.name.length">
          <a-input placeholder="请输入" v-model="sendData.name" maxlength="15"></a-input>
        </label-item>
      </div>
      <div style="margin-top: 10px;" v-else>
        <label-item class="u-bottom-border" title="库房名称">
          <div class="spanStyle">{{sendData.name}}</div>
        </label-item>
      </div>
      <!-- 防止报错 -->
      <div class="clearfix addressStyle" v-if="currentFormType==2&&sendData.areaInfo">
        <label-item class="u-bottom-border" title="详细地址" :maxSize="50" :valLength="sendData.address.length">
          <city-town-tree class="f-fl" style="width: 140px;" ref="selectCityTown" :showTown="false" placeholder="所在城市/区域"
                          :defaultValue="sendData.areaInfo" :defaultCityId="sendData.cityId" :defaultAreaId="sendData.areaId"   @selectChange="selectCityTownChange($event)">
          </city-town-tree>
          <a-input class="f-fl" style="width: calc(100% - 140px)" placeholder="请输入" v-model="sendData.address" maxlength="50"></a-input>
        </label-item>
      </div>
      <div class="clearfix addressStyle" v-if="currentFormType==2&&!sendData.areaInfo">
        <label-item class="u-bottom-border" title="详细地址" :maxSize="50" :valLength="sendData.address.length">
          <city-town-tree class="f-fl" style="width: 140px;" ref="selectCityTown" :showTown="false" placeholder="所在城市/区域"
                          :defaultValue="sendData.areaInfo" :defaultCityId="sendData.cityId" :defaultAreaId="sendData.areaId"   @selectChange="selectCityTownChange($event)">
          </city-town-tree>
          <a-input class="f-fl" style="width: calc(100% - 140px)" placeholder="请输入" v-model="sendData.address" maxlength="50"></a-input>
        </label-item>
      </div>
      <div class="clearfix addressStyle" v-show="currentFormType==1">
        <label-item class="u-bottom-border" title="详细地址">
          <div class="specialStyle">{{!sendData.areaInfo&&!sendData.address?'-':''}}{{sendData.areaInfo}} {{sendData.address}}</div>
        </label-item>
      </div>
      <div class="clearfix" style="margin-top: 19px;" v-if="currentFormType==2">
        <div class="f-fl" style="margin-right: 30px;width: 225px;">
          <label-item class="u-bottom-border" title="负责人姓名">
            <a-input placeholder="请输入" v-model="sendData.maintainerName" maxlength="15"></a-input>
          </label-item>
        </div>
        <div class="f-fl" style="width: 225px;">
          <label-item class="u-bottom-border" title="负责人电话">
            <a-input placeholder="请输入" v-model="sendData.maintainerPhone" maxlength="15"></a-input>
          </label-item>
        </div>
      </div>
      <div class="clearfix" style="margin-top: 19px;" v-else>
        <div class="f-fl" style="margin-right: 30px;width: 225px;">
          <label-item class="u-bottom-border" title="负责人姓名">
            <div class="spanStyle">{{sendData.maintainerName?sendData.maintainerName:'-'}}</div>
          </label-item>
        </div>
        <div class="f-fl" style="width: 225px;">
          <label-item class="u-bottom-border" title="负责人电话">
            <div class="spanStyle">{{sendData.maintainerPhone?sendData.maintainerPhone:'-'}}</div>
          </label-item>
        </div>
      </div>
      <div class="clearfix" style="width: 100%;padding:55px 0px 20px 0;" v-if="currentFormType==2">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="addWarehouse">
            保存
          </a-button>
        </div>
      </div>
      <div v-else style="height: 115px;">
      </div>
    </div>
  </div>
</template>

<script>
import CityTownTree from '@/components/CityTownTree/customer'
import * as API from "@/api/assets";
export default {
  name: "addWareHouse",
  components: {
    CityTownTree,
  },
  props: {
    warehouseId:{
      type:String,
      required:true,
    },
    formType:{
      type:Number,
    },
  },
  data() {
    return {
      sendData:{
        name:'',
        cityId:'',
        cityName:'',
        areaId:'',
        areaName:'',
        address:'',
        maintainerName:'',
        maintainerPhone:'',
      },
      originData:{},
      saveLoading:false,
      currentFormType:1,
    }
  },
  created() {
    this.getWarehouseDetail();
    this.currentFormType = this.formType;
  },
  methods: {
    editWarehouse(){
      this.currentFormType = 2;
    },
    deleteWarehouse(){
      let _this = this;
      let id = this.sendData.id
      this.$modal.confirm({
        title: '确定要删除 「' + this.sendData.name + '」 吗？',
        content: '删除后不可恢复，请谨慎操作',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.warehouseDelete({id:id}).then(res => {
            if (res.code == 200) {
              _this.$message.success('删除成功！');
              _this.$emit('deleteSuccess');
            }
          })
        },
        onCancel() {
        },
      });
    },
    getWarehouseDetail(){
      API.warehouseView(this.warehouseId).then(res=>{
        if(res.code === '200'){
          this.sendData = res.data;
          if(this.sendData.cityName){
            let areaInfo = '';
            if(this.sendData.areaName){
              areaInfo = this.sendData.cityName + '/' + this.sendData.areaName;
            }
            else {
              areaInfo = this.sendData.cityName;
            }
            this.sendData.areaInfo = areaInfo;
          }
          this.originData = Object.assign({},this.sendData);
        }
      });
    },
    addWarehouse(){
      if(!this.sendData.name){
        this.$message.warning('请输入库房名称!');
        return ;
      }
      if (this.sendData.maintainerPhone&&!/^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(this.sendData.maintainerPhone)) {
        this.$message.warning('手机号码输入错误');
        return;
      }
      this.saveLoading = true;
      API.warehouseEdit(this.sendData).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.$message.success('库房信息修改成功');
          this.saveLoading = false;
          if(this.formType == 1){
            this.$emit('refreshinfoFun',true);
            this.getWarehouseDetail();
            this.currentFormType = 1;
          }
          else{
            this.$emit('addSuccess');
          }
        }
        else{
          this.$message.error('库房信息修改失败');
          this.saveLoading = false;
        }
      });
    },
    cancelSave(){
      if(this.formType == 1){
        this.sendData = Object.assign({},this.originData);
        this.currentFormType = 1;
      }
      else{
        this.$emit('cancelSave');
      }
    },
    selectCityTownChange(selectObj) {
      this.sendData.cityId = selectObj.cityId;
      this.sendData.cityName = selectObj.cityName;
      this.sendData.areaId = selectObj.areaId;
      this.sendData.areaName = selectObj.areaName;
    },
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
.addWarehouse-box{
  margin: 20px 0px 0 0px;
  .headStyle{
    padding: 0 20px;
    margin-bottom: 20px;
    height: 44px;
    line-height: 44px;
    .iconStyle{
      width: 44px;
      height: 44px;
      background: #0A87F8;
      border-radius: 50%;
      svg{
        color: #ffffff;
        width: 24px;
        height: 24px;
        margin: 10px 0 0 10px;
      }
    }
    .nameStyle{
      height: 44px;
      line-height: 44px;
      font-weight: 500;
      font-size: 16px;
      color: #111111;
      margin-left: 15px;
    }
    .editStyle{
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      color: #0A87F8;
    }
    .deleteStyle{
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      color: #FB4246;
      margin-left: 15px;
    }
  }
  .splitStyle{
    height: 1px;
    width: 100%;
    background-color: #EEEEEE;
  }
  .contentStyle{
    margin: 0 20px;
    .addressStyle{
      padding-top: 19px;
      /deep/ .tree{
        width: 300px;
        top: 33px !important;
      }
      /deep/ .tree-wrap{
        margin-bottom:  0px;
      }
      /deep/ .label-item .max-size{
        bottom: -24px !important;
      }
      .specialStyle{
        line-height: 20px;
        padding: 6px 0;
        color: #111111;
      }
    }
    .spanStyle{
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color:#111111;
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