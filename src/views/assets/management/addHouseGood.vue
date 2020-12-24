<template>
  <div class="addHouseGood-box">
    <div class="headStyle" v-if="houseInfo">添加物品至：{{houseInfo.houseAlias?houseInfo.houseAlias+'/':''}}{{houseInfo.operateType=='view'?houseInfo.address:houseInfo.fullAddress}}</div>
    <div style="min-height: 400px;">
      <div class="basicsInfo">
        <div class="table">
          <div class="table-title">
            <div v-if="showPositionFlag" style="max-width: 80px;border-radius: 4px 0px 0px 0px;">归属位置</div>
            <div :style="showPositionFlag?'max-width: 99px;':'max-width: 109px;border-radius: 4px 0px 0px 0px;'">物品<span class="must-fill">*</span></div>
            <div style="max-width: 96px;">数量<span class="must-fill">*</span></div>
            <div :style="showPositionFlag?'max-width: 102px;':'max-width: 107px;'">单价<span class="must-fill">*</span></div>
            <div style="max-width: 89px;">品牌</div>
            <div :style="showPositionFlag?'max-width: 85px;':'max-width: 95px;'">型号</div>
            <div :style="showPositionFlag?'max-width: 92px;':'max-width: 102px;'">规格</div>
            <div style="max-width: 79px;">归属方</div>
            <div :style="showPositionFlag?'max-width: 102px;':'max-width: 112px;'">购入日期</div>
            <div :style="showPositionFlag?'max-width: 101px;':'max-width: 111px;'">质保结束日期</div>
            <div :style="showPositionFlag?'max-width: 105px;':'max-width: 111px;'">质保电话</div>
            <div :style="showPositionFlag?'max-width: 74px;':'max-width: 94px;'" style="padding-left: 0px;text-align: center;">更多信息</div>
            <div style="max-width: 50px;border-radius: 0px 4px 0px 0px;padding-left: 0px;text-align: center;">操作</div>
          </div>
          <div class="house-data" v-for="(item,index) in goodList" :key="index">
            <div class="u-no-border" style="max-width: 80px;" v-if="showPositionFlag">
              <a-select style="width: 100%" v-model="item.houseId" placeholder="请选择">
                <a-select-option v-for="(item) in roomList" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </div>
            <div class="u-no-border" style="padding-left: 9px;" :style="showPositionFlag?'max-width: 99px;':'max-width: 109px;'">
              <a-cascader class="myCascader" style="width: 100%;" v-model="item.goodsIdList" placeholder="请选择" :options="goodsTabsContent"
                          :fieldNames="elcostcascaderValue" @change="(value) => goodSelect(value,item)"></a-cascader>
            </div>
            <div class="clearfix u-bottom-border quantityStyle" style="max-width: 96px;padding-left: 8px;">
              <div class="f-fl cursor" style="height: 44px;width: 16px;" @click="reduceQuantity(item)">
                <div class="commonStyle " :class="item.quantity==1?'unEditStyle':'editStyle'" >
                  <icon-font type="iconjian" />
                </div>
              </div>
              <a-input style="width: 45px;text-align: center" class="f-fl" v-validate="'naturalNum|min(1)|max(99999)'" placeholder="请输入" v-model="item.quantity"></a-input>
              <div class="f-fl cursor" style="height: 44px;width: 16px;" @click="plusQuantity(item)">
                <div class="commonStyle" :class="item.quantity==99999?'unEditStyle':'editStyle'" >
                  <icon-font type="iconjia" />
                </div>
              </div>
            </div>
            <div class="u-no-border" style="padding:0 8px;position:relative;" :style="showPositionFlag?'max-width: 102px;':'max-width: 107px;'">
              <a-input style="line-height: 32px;" v-model="item.unitPrice" v-validate="'money|min(1)|max(999999.99)'" placeholder="请输入"></a-input>
              <div style="position: absolute;font-size: 14px;color: #777777;right: 9px;bottom:0px;">元/件</div>
            </div>
            <div class="u-no-border" style="max-width: 89px;">
              <a-select style="width: 100%" :showSearch="true" :filterOption="(inputValue,option)=>filterOptionBrand(inputValue,option)" :allowClear="true" v-model="item.brandId" placeholder="请选择" @change="(value)=>selectBrand(value,item)">
                <a-select-option v-for="(item) in brandList" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </div>
            <div class="u-no-border" style="padding: 0 8px;" :style="showPositionFlag?'max-width: 85px;':'max-width: 95px;'">
              <a-input style="line-height: 32px;" v-model="item.model" placeholder="请输入"></a-input>
            </div>
            <div class="u-no-border" style="padding: 0 8px;" :style="showPositionFlag?'max-width: 92px;':'max-width: 102px;'">
              <a-input style="line-height: 32px;" v-model="item.specification" placeholder="请输入"></a-input>
            </div>
            <div class="u-no-border" style="max-width: 79px;">
              <a-select style="width: 100%" v-model="item.ownerType" placeholder="请选择">
                <a-select-option v-for="(item) in ownerTypeList" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </div>
            <div class="u-no-border" style="padding-left: 7px;" :style="showPositionFlag?'max-width: 102px;':'max-width: 112px;'">
              <a-date-picker placeholder="请选择" :allowClear="true" v-model="item.purchaseDate" :format="dateFormat"/>
            </div>
            <div class="u-no-border" style="padding-left: 7px;" :style="showPositionFlag?'max-width: 101px;':'max-width: 111px;'">
              <a-date-picker placeholder="请选择" :allowClear="true" v-model="item.warrantyDate" :format="dateFormat"/>
            </div>
            <div class="u-no-border" style="padding: 0 8px;" :style="showPositionFlag?'max-width: 105px;':'max-width: 111px;'">
              <a-input placeholder="请输入" maxlength="15" v-model="item.warrantyContact"></a-input>
            </div>
            <div style="text-align: center;" class="cursor" @click="showMoreInfo(item,index)" :style="showPositionFlag?'max-width: 74px;':'max-width: 94px;'">
              <a-popover placement="bottomLeft" v-show="item.haveMore">
                <template slot="content">
                  <div style="width: 300px;" class="poperStyle">
                    <label-item title="描述">
                      <p style="margin-top: 10px">
                        <span>{{item.comment?item.comment:'-'}}</span>
                      </p>
                    </label-item>
                    <label-item title="图片" style="margin-top: 10px;">
                      <ul class="pic-list" style="">
                        <li v-for="(val,i) in item.picList" :key="i" >
                          <div v-if="(val.fileExt == 'jpg' || val.fileExt == 'png' || val.fileExt == 'jpeg')">
                            <img :src="val.origin"/>
                          </div>
                          <div v-if="(val.fileExt == 'mp4' || val.fileExt == 'avi' || val.fileExt == 'mov')">
                            <video :src="val.origin" controls="controls"></video>
                          </div>
                        </li>
                        <li v-if="!item.picList||item.picList.length==0">
                          <div>-</div>
                        </li>
                      </ul>
                    </label-item>
                  </div>
                </template>
                <p class="popover">
                  <span>已设置</span>
                  <icon-font style="color: #0A87F8;margin-left: 4px;" type="iconyumengtubiao_bianji-1"></icon-font>
                </p>
              </a-popover>
              <p class="popover" v-show="!item.haveMore">
                <span style="color: #BBBBBB;">未设置</span>
                <icon-font style="color: #BBBBBB;margin-left: 4px;" type="iconyumengtubiao_bianji-1"></icon-font>
              </p>
            </div>
            <div class="cursor" style="text-align: center;max-width: 50px;" @click="deleteGood(index)">
              <icon-font style="color: #FB4246;" type="iconyumengtubiao_shanchu-"></icon-font>
            </div>
          </div>
          <div class="house-data cursor" style="border-radius: 0px 0px 4px 4px;" @click="addHouseGood">
            <div class="addStyle">
              <icon-font type="iconyumengtubiao_tianjia" style="margin-right: 4px;" />继续添加物品
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix" style="width: 100%;padding:32px 20px 20px 0;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSave">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="addGoodList">
          保存
        </a-button>
      </div>
    </div>
    <a-modal title="更多物品信息" :maskStyle="maskStyle" centered v-model='showMoreDialog'  width="588px" destroyOnClose class="ownModalBorder titDialog" @ok="saveMoreInfo" okText="确认" cancelText="取消">
      <label-item border style="margin: 10px 20px 0px 20px;" class="u-bottom-border" title="描述" leftLine :maxSize="500" :valLength="comment.length">
        <a-textarea maxlength="500" v-model="comment" autosize placeholder="请输入" />
      </label-item>
      <label-item  style="margin: 10px 20px 20px 20px;position: relative;" title="图片" leftLine border class="u-bottom-border" >
        <own-upload style="margin-top: 8px;" :showTips="false" :picList="picList" :uploadParms="uploadParms" ref="uploadPic" ></own-upload>
        <div style="position: absolute;top:17px;left:45px;font-size: 12px;color: #FFA036;">(图片支持格式jpg、png、jpeg)</div>
      </label-item>
    </a-modal>
  </div>
</template>

<script>
import {dictionaryListDict, listEnableDict} from "@/api/contract";
import * as API from "@/api/assets";

export default {
  name: "addHouseGood",
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
      goodList:[],
      goodsTabsContent:[],
      brandList:[],
      ownerTypeList:[
        {id:1,name:'公司'},
        {id:2,name:'业主'},
      ],
      dateFormat: 'YYYY.MM.DD',           //日期选择器格式
      elcostcascaderValue: {
        value: 'id',
        label: 'name',
        children: 'metaList'
      },
      obj:{
        locationType:undefined,
        houseId:undefined,
        goodsId:'',
        goodsName:'',
        goodsTypeId:'',
        goodsTypeName:'',
        goodsIdList:[],
        quantity:1,
        unitPrice:'',
        brandId:undefined,
        model:'',
        specification:'',
        ownerType:1,
        purchaseDate:undefined,
        warrantyDate:undefined,
        warrantyContact:'',
        comment:'',
        picList:[],
        picIdList:[],
        havaMore:false,
        operateType:1,  //1、新增；2、调配
      },
      saveLoading:false,
      roomList:[],
      showMoreDialog:false,
      picList:[],
      comment:[],
      uploadParms:{},
      currentSelectIndex:'',  //选中的物品
      maskStyle:{backgroundColor:'rgba(0,0,0,0.05)'},
      showPositionFlag:false,
    }
  },
  created() {
    //来自房源编辑
    if(this.houseInfo){
      if(this.houseInfo.fromType=='share'&&this.houseInfo.operateType=='view'){
        this.showPositionFlag = true;
        this.obj.houseId = undefined;
        this.getRoomNameListById();
      }
      else{
        this.obj.houseId = this.houseInfo.houseId;
      }
      this.obj.locationType = 1;
    }
    this.initData();
    this.getDictionaryList();
  },
  mounted() {
    this.uploadParms = { //
      bizId: '', // 业务id
      bizType: 7, // 图片大类标识 物资管理
      subBizType: 1, // 图片子类标识
      orderIndex: 1 // 排序值
    }
  },
  methods: {
    getRoomNameListById(){
      API.getRoomNameListById(this.houseInfo.houseId).then(res=>{
        this.roomList = res.data;
      });
    },
    deleteGood(index){
      this.goodList.splice(index,1);
    },
    initData(){
      let temp = Object.assign({},this.obj);
      if(this.defaultGoodInfo){
        temp.goodsId = this.defaultGoodInfo.clickItemId;
        temp.goodsName = this.defaultGoodInfo.clickItemName;
        temp.goodsTypeId = this.defaultGoodInfo.clickItemPid;
        temp.goodsTypeName = this.defaultGoodInfo.clickItemPName;
        let goodsIdList = [this.defaultGoodInfo.clickItemPid,this.defaultGoodInfo.clickItemId];
        temp.goodsIdList = goodsIdList;
      }
      this.goodList.push(temp);
    },
    showMoreInfo(item,index){
      this.currentSelectIndex = index;
      this.showMoreDialog = true;
      this.comment = item.comment;
      this.picList = item.picList;
      this.picList.forEach((item)=>{
        item.bizId = item.id;
        item.notRealDelete = true;
      });
    },
    saveMoreInfo(){
      let picList = [...this.$refs.uploadPic.picsList];
      let item = this.goodList[this.currentSelectIndex];
      item.picList = picList;
      item.picIdList = [];
      picList.forEach((val)=>{
        item.picIdList.push(val.id)
      });
      item.comment = this.comment;
      if(item.comment||(item.picList&&item.picList.length>0)){
        item.haveMore = true;
      }
      else{
        item.haveMore = false;
      }
      this.showMoreDialog = false;
    },
    cancelSave(){
      this.$emit('cancelSave');
    },
    addGoodList(){
      //检查数据完整性
      let validateFlag = false;
      let goodList = []
      this.goodList.forEach((item)=>{
        if(!item.goodsId||!item.goodsTypeId||!item.unitPrice){
          validateFlag = true;
        }
        let obj =Object.assign({},item);
        obj.unitPrice = obj.unitPrice*100;
        goodList.push(obj);
      });
      if(validateFlag){
        this.$message.warning('请完善必填数据');
        return ;
      }
      if(this.formType == 'add'){
        this.$emit('addGoodList',goodList);
      }
      else if(this.formType == 'edit'||this.formType == 'view'){
        let parameter = {
          assetsAddFormList:goodList,
        };
        this.saveLoading =true;
        API.assetsBatchAdd(parameter).then(res=>{
          if(!res){
            this.saveLoading = false;
          }
          if(res.code === '200'){
            this.$message.success('物品批量添加成功');
            this.saveLoading = false;
            this.$emit('addGoodList');
          }
          else{
            this.$message.error('物品批量添加失败');
            this.saveLoading = false;
          }
        });
      }
    },
    selectBrand(value,item){
      if(!value){
        item.brandId = undefined;
        item.brandName = undefined;
      }
      else{
        item.brandId = value;
        this.brandList.forEach((temp)=>{
          if(value==temp.id){
            item.brandName = temp.name;
          }
        })
      }
    },
    filterOptionBrand(inputValue,option){
      if(!inputValue){
        return true;
      }
      return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
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
    addHouseGood(){
      let obj =Object.assign({},this.obj);
      this.goodList.push(obj);
    },
    // 物品选择
    goodSelect(value,item) {
      if (value[1]) {
        item.goodsId = value[1];
        this.goodsTabsContent.forEach((temp)=>{
          temp.metaList.forEach((metaTemp)=> {
            if (metaTemp.id == item.goodsId) {
              item.goodsTypeId = temp.id;
              item.goodsName = metaTemp.name
            }
          });
        });
        this.goodsTabsContent.forEach((temp)=>{
          if(item.goodsTypeId == temp.id){
            item.goodsTypeName = temp.name
          }
        });
      } else {
        item.goodsTypeId = value[0];
        item.goodsTypeName = '';
        item.goodsId = '';
        item.goodsName = '';
      }
    },
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
  .addHouseGood-box{
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    .headStyle{
      height: 40px;
      line-height: 40px;
      background: #E9F1FF;
      font-size: 14px;
      color: #777777;
      padding-left: 20px;
    }
    .basicsInfo{
      padding: 20px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .table{
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
            padding-left: 8px;
            background: #FAFAFA;;
          }
          .borderBottomStyle{
            border-bottom: 1px solid #EEEEEE;
          }
          .borderRightStyle{
            border-right: 1px solid #EEEEEE;
          }
          .must-fill{
            color: #FB4246;
            font-size: 14px;
            margin-left: 2px;
          }
        }
        .house-no-data{
          border-radius: 0px 0px 4px 4px;
          border-right: 1px solid #EEEEEE;
          border-bottom: 1px solid #EEEEEE;
          background-color: #ffffff;
        }
        .house-data {
          display: flex;
          color: #111111;
          font-size: 13px;
          border-radius: 0px 0px 4px 4px;
          & > div {
            flex: 1;
            height: 44px;
            line-height: 44px;
            border-right: 1px solid #EEEEEE;
            border-bottom: 1px solid #EEEEEE;
          }
          .addStyle{
            text-align: center;
            font-size: 14px;
            width: 100%;
            color: #0A87F8;
            border-radius: 0px 0px 4px 4px;
          }
          .poperStyle{
            /deep/ .label-item .title{
              color: #111111;
              font-size: 16px;
              font-weight: 500;
            }
          }
          /deep/ .ant-calendar-picker-icon{
            right: 4px;
          }
          /deep/ .ant-cascader-picker-label{
            padding-left: 0px;
          }
          .quantityStyle{
            height: 44px;
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
          .pic-list{
            display: flex;
            flex-wrap: wrap;
            max-width: 315px;
            margin-right: -5px;
            margin-bottom: 5px;
            li{
              position: relative;
              div{
                width: 100px;
                height: 68px;
                line-height: 68px;
                border: 1px solid #eeeeee;
                background-color: #f6f7f8;
                margin: 5px 5px 0 0;
                border-radius: 6px;
                text-align: center;
                overflow: hidden;
                img{
                  width: auto;
                  max-width: 100px;
                  height: auto;
                  max-height: 68px;
                  overflow: hidden;
                }
              }
            }
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