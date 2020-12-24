<template>
  <div class="addGood-box">
    <div class="titleStyle">物品信息</div>
      <div class="itemStyle" style="margin-top: 9px;">
        <div class="item">
          <label-item class="u-bottom-border" title="物品" :must-fill="true">
            <a-cascader class="myCascader" style="width: 100%;" v-model="goodsId" placeholder="请选择" :options="goodsTabsContent" :fieldNames="elcostcascaderValue" @change="(value) => goodSelect(value)"></a-cascader>
          </label-item>
        </div>
        <div class="item">
          <label-item class="u-bottom-border" title="数量" :must-fill="true" style="position: relative;">
            <a-input :disabled="record&&record.id?true:false" v-model="sendData.quantity" v-validate="'naturalNum|min(1)|max(99999)'" placeholder="请输入"></a-input>
            <div style="position: absolute;font-size: 14px;color: #777777;right: 0;bottom:4px;">件</div>
          </label-item>
        </div>
        <div class="item">
          <label-item class="u-bottom-border" title="单价" :must-fill="true" style="position: relative;">
            <a-input v-model="sendData.unitPrice" v-validate="'money|min(1)|max(999999.99)'" placeholder="请输入"></a-input>
            <div style="position: absolute;font-size: 14px;color: #777777;right: 0;bottom:4px;">元/件</div>
          </label-item>
        </div>
        <div class="item">
          <label-item class="u-bottom-border" title="品牌">
            <a-select style="width: 100%" :showSearch="true" :filterOption="(inputValue,option)=>filterOptionBrand(inputValue,option)" :allowClear="true" v-model="sendData.brandId" placeholder="请选择" @change="selectBrand">
              <a-select-option v-for="(item) in brandList" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </label-item>
        </div>
      </div>
      <div class="itemStyle" style="margin-top: 20px;">
        <div class="item">
          <label-item class="u-bottom-border" title="规格">
            <a-input placeholder="请输入" v-model="sendData.specification"></a-input>
          </label-item>
        </div>
        <div class="item">
          <label-item class="u-bottom-border" title="型号">
            <a-input placeholder="请输入" v-model="sendData.model"></a-input>
          </label-item>
        </div>
        <div class="item">
        </div>
        <div class="item">
        </div>
      </div>
    <div class="titleStyle" style="margin-top: 30px;">物品归属</div>
      <div class="itemStyle" style="margin-top: 9px;">
        <div class="item">
          <label-item class="u-bottom-border" title="物品归属方" :must-fill="true">
            <a-select style="width: 100%" v-model="sendData.ownerType" placeholder="请选择">
              <a-select-option v-for="(item) in ownerTypeList" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </label-item>
        </div>
        <div class="item" style="width: calc(100% - 198px)">
          <label-item class="u-bottom-border clearfix" title="物品当前所在地" :must-fill="true">
            <a-select class="f-fl" :style="!sendData.locationType?'width: 167px;':'width: 120px;'" v-model="sendData.locationType" placeholder="请选择" :disabled="houseInfoFlag">
              <a-select-option v-for="(item) in positionList" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a-select v-if="sendData.locationType==1" class="f-fl" style="width: calc(100% - 120px);" v-model="sendData.allFullAddress" showSearch placeholder="请输入房源编号/小区地址/项目名称/门牌号信息检索房源"
                      :disabled="houseInfoFlag" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" >
              <a-select-option v-for="(item) in communityList" :key="item.houseId">
                {{ item.viewAddress }}
              </a-select-option>
            </a-select>
            <a-select class="f-fl" :allowClear="true" style="width: calc(100% - 120px);" v-model="sendData.warehouseId" placeholder="请选择" v-if="sendData.locationType==2">
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
              <a-select-option v-for="(item) in warehouseList" :key="item.id" :disabled="item.disabled">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </label-item>
        </div>
      </div>
    <div class="titleStyle" style="margin-top: 30px;">物品其他信息</div>
      <div class="itemStyle" style="margin-top: 9px;">
        <div class="item">
          <label-item class="u-bottom-border" title="购入日期">
            <a-date-picker style="width: 100%;" placeholder="请选择购入日期" :allowClear="true" v-model="sendData.purchaseDate" :format="dateFormat"/>
          </label-item>
        </div>
        <div class="item">
          <label-item class="u-bottom-border" title="质保结束日期">
            <a-date-picker style="width: 100%;" placeholder="请选择质保结束日期" :allowClear="true" v-model="sendData.warrantyDate" :format="dateFormat"/>
          </label-item>
        </div>
        <div class="item">
          <label-item class="u-bottom-border" title="质保电话">
            <a-input placeholder="请输入" maxlength="15" v-model="sendData.warrantyContact"></a-input>
          </label-item>
        </div>
        <div class="item">
          <label-item class="u-bottom-border" title="编号" v-if="record&&record.id">
            <a-input placeholder="请输入" v-model="sendData.serialNumber" :disabled="true"></a-input>
          </label-item>
        </div>
      </div>
      <div style="margin-top: 25px;">
          <label-item class="u-bottom-border" title="描述"  :maxSize="500" :valLength="sendData.comment.length">
            <a-textarea maxlength="500" v-model="sendData.comment" autosize placeholder="请输入" />
          </label-item>
      </div>
      <div style="margin-top: 25px;">
        <label-item class="u-bottom-border" title="物品图片">
          <own-upload style="margin-top: 8px;" :showTips="false" :picList="picList" :uploadParms="uploadParms" ref="uploadPic" ></own-upload>
        </label-item>
      </div>
    <div class="clearfix" style="width: 100%;padding:32px 0px 20px 0;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="addGood">
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
import {dictionaryListDict, listEnableDict} from '@/api/contract';
import * as API from '@/api/assets';
import {searchHouse} from "@/api/reserve";
import AddWarehouse from '../warehouse/addWarehouse';
export default {
name: "addGood",
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
    },
    houseInfo:{
      type:Object,
    },
  },
  data() {
    return{
      saveLoading:false,
      goodsTabsContent:[],
      elcostcascaderValue: {
        value: 'id',
        label: 'name',
        children: 'metaList'
      },
      goodsId:[],
      brandList:[],
      ownerTypeList:[
        {id:1,name:'公司'},
        {id:2,name:'业主'},
      ],
      positionList:[
        {id:1,name:'房间'},
        {id:2,name:'库房'},
      ],
      warehouseList:[],
      communityList: [],
      sendData:{
        goodsTypeId:'',
        goodsId:'',
        quantity:'',
        unitPrice:'',
        brandId:undefined,
        specification:'',
        model:'',
        ownerType:1,
        locationType:1,
        houseId:'',
        warehouseId:undefined,
        purchaseDate:undefined,
        warrantyDate:undefined,
        warrantyContact:'',
        serialNumber:'',
        comment:'',
      },
      picList:[],
      uploadParms:{},
      dateFormat: 'YYYY.MM.DD',           //日期选择器格式
      houseInfoFlag:false,
      maskStyle:{backgroundColor:'rgba(0,0,0,0.2)'},
      addWarehouseDialog:false,
    }
  },
  created() {
    if(this.record&&this.record.id){
      this.assetsView();
    }
    this.getDictionaryList();
    this.warehouseListSimple();
    //来自房源的编辑，无法修改地址
    if(this.houseInfo){
      this.houseInfoFlag = true;
    }
  },
  mounted() {
    this.uploadParms = { //
      bizId: '', // 业务id
      bizType: 7, // 图片大类标识 资产管理
      subBizType: 1, // 图片子类标识
      orderIndex: 1 // 排序值
    }
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
    assetsView(){
      API.assetsView(this.record.id).then(res => {
        if (res.code == "200") {
          this.sendData = res.data;
          if(this.sendData.unitPrice){
            this.sendData.unitPrice = res.data.unitPrice/100;
          }
          let goodsId = [];
          goodsId.push(this.sendData.goodsTypeId);
          goodsId.push(this.sendData.goodsId);
          this.goodsId = goodsId;
          if(!this.sendData.allFullAddress){
            this.sendData.allFullAddress = undefined;
          }
          if(!this.sendData.brandId){
            this.sendData.brandId = undefined;
          }
          if(!this.sendData.ownerType){
            this.sendData.ownerType = undefined;
          }
          if(!this.sendData.warehouseId){
            this.sendData.warehouseId = undefined;
          }
          if(!this.sendData.locationType){
            this.sendData.locationType = undefined;
          }
          if(this.sendData.purchaseDate){
            this.sendData.purchaseDate = this.$moment(this.sendData.purchaseDate);
          }
          if(this.sendData.warrantyDate){
            this.sendData.warrantyDate = this.$moment(this.sendData.warrantyDate);
          }
          if(this.sendData.picList&&this.sendData.picList.length>0){
            this.picList = this.sendData.picList;
          }
        }
      })
    },
    selectCommunity(searchVal) {
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
    getCommunity(communityId) {
      this.sendData.houseId = communityId;
    },
    // 物品选择
    goodSelect(value) {
      if (value[1]) {
        this.sendData.goodsId = value[1];
        this.goodsTabsContent.forEach((temp)=>{
          temp.metaList.forEach((metaTemp)=> {
            if (metaTemp.id == this.sendData.goodsId) {
              this.sendData.goodsTypeId = temp.id;
            }
          });
        });
      } else {
        this.sendData.goodsTypeId = value[0];
        this.sendData.goodsId = '';
      }
    },
    warehouseListSimple(){
      API.warehouseListSimple().then(res => {
        if (res.code == 200) {
          this.warehouseList = res.data;
        }
      })
    },
    filterOptionBrand(inputValue,option){
      if(!inputValue){
        return true;
      }
      return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
    },
    selectBrand(value){
      if(!value){
        this.sendData.brandId = undefined;
      }
      else{
        this.sendData.brandId = value;
      }
    },
    getDictionaryList(){
      //获取商品
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
    cancelSave(){
      this.$emit('cancelSave');
    },
    addGood(){
      let picsList = [...this.$refs.uploadPic.picsList];
      let picsIdList = []
      if(picsList && picsList.length > 0) {
        picsList.forEach((val) => {
          picsIdList.push(val.id)
        })
        this.sendData.picIdList = picsIdList;
      }
      if(this.checkData()){
        return ;
      }
      this.saveLoading = true;
      if(this.sendData.id){
        let sendData = Object.assign({},this.sendData);
        sendData.unitPrice = sendData.unitPrice*100;
        sendData.isChecked = this.record.isChecked;
        API.assetsEdit(sendData).then(res=>{
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            if(this.record.isChecked==1){
              this.$message.success('物品信息核对成功');
            }
            else{
              this.$message.success('物品修改成功');
            }
            this.saveLoading = false;
            this.$emit('addSuccess');
          }
          else{
            if(this.record.isChecked==1){
              this.$message.error('物品信息核对失败');
            }
            else{
              this.$message.error('物品修改失败');
            }
            this.saveLoading = false;
          }
        });
      }
      else{
        let sendData = Object.assign({},this.sendData);
        sendData.unitPrice = sendData.unitPrice*100;
        API.assetsAdd(sendData).then(res=>{
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            this.$message.success('物品添加成功');
            this.saveLoading = false;
            this.$emit('addSuccess');
          }
          else{
            this.$message.error('物品添加失败');
            this.saveLoading = false;
          }
        });
      }
    },
    checkData(){
      let flag = false;
      if(!this.sendData.goodsTypeId){
        this.$message.warning('请选择物品类型');
        flag = true;
        return flag;
      }
      if(!this.sendData.goodsId){
        this.$message.warning('请选择物品类型');
        flag = true;
        return flag;
      }
      if(!this.sendData.quantity){
        this.$message.warning('请输入数量');
        flag = true;
        return flag;
      }
      if(!this.sendData.unitPrice){
        this.$message.warning('请输入单价');
        flag = true;
        return flag;
      }
      if(!this.sendData.ownerType){
        this.$message.warning('请选择物品归属方');
        flag = true;
        return flag;
      }
      if(this.sendData.locationType==1&&!this.sendData.houseId){
        this.$message.warning('请选择所在房间');
        flag = true;
        return flag;
      }
      if(this.sendData.locationType==2&&!this.sendData.warehouseId){
        this.$message.warning('请选择所在仓库');
        flag = true;
        return flag;
      }
      return flag;
    }
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
.addGood-box{
  padding: 20px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  .titleStyle{
    font-size: 16px;
    font-weight: 500;
    color: #111111;
  }
  .itemStyle{
    display: flex;
    justify-content: space-between;
    .item{
      width: 167px;
      /deep/ .ant-select-selection__rendered{
        margin-left: 0px;
      }
      /deep/ .ant-cascader-picker-label{
        padding: 0;
      }
      /deep/ .ant-input{
        padding: 0;
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