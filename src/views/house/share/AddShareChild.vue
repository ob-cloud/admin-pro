<template>
    <div class="add-share-child">
        <label-item title="房源地址"  border style="padding-bottom: 5px;">
            <span class="houseAliasStyle" v-if="houseData.houseAlias">{{houseData.houseAlias}}</span>
            <span>{{houseData.address}}</span>
        </label-item>
        <label-item title="子间信息"  border class="u-bottom-border child-room">
            <div class="child-room-info">
                <label-item title="房间名称" addonAfter="间" :mustFill="true">
                    <a-input style="width: 120px" v-model="roomData.roomName" placeholder="请输入"></a-input>
                </label-item>
                <label-item title="房间类型" :mustFill="true">
                    <a-select v-model="roomData.roomLevel" style="width: 135px" >
                        <a-select-option :value="1">主卧</a-select-option>
                        <a-select-option :value="2">次卧</a-select-option>
                    </a-select>
                </label-item>
                <label-item title="朝向" :mustFill="true">
                    <a-select v-model="roomData.orientation" style="width: 120px" >
                        <a-select-option :value="1">东</a-select-option>
                        <a-select-option :value="2">南</a-select-option>
                        <a-select-option :value="3">西</a-select-option>
                        <a-select-option :value="4">北</a-select-option>
                        <a-select-option :value="5">南北</a-select-option>
                    </a-select>
                </label-item>
                <label-item title="面积" addonAfter="㎡" :mustFill="true">
                    <a-input v-model="roomData.houseArea" style="width: 120px" placeholder="请输入"></a-input>
                </label-item>
                <label-item title="出租价格" addonAfter="元" :mustFill="true" style="margin-right: 10px;">
                    <a-input v-model="roomData.actualPrice" style="width: 120px" placeholder="请输入"></a-input>
                </label-item>
                <label-item title=" " style="width: 80px;margin-right: 20px;">
                    <a-checkbox @change="roomData.isShortRent = !roomData.isShortRent">可短租</a-checkbox>
                </label-item>
                <label-item title="房间检验码" style="margin-right: 0px;">
                  <a-input v-model="roomData.checkCode" style="width: 120px" placeholder="请输入"></a-input>
                </label-item>
            </div>
            <label-item class="item" title="--  -  房源特色" style="margin-bottom: 0">
              <div class="checkAllStyle">
                <a-checkbox @change="value => checkAllTag(value)" v-model="tagCheckAll"></a-checkbox>
              </div>
                <a-checkbox-group class="house-feature" v-model="roomData.tagList">
                    <a-checkbox :value="item.name" v-for="(item,i) in houseTagConfig" :key="i">{{item.name}}</a-checkbox>
                </a-checkbox-group>
            </label-item>
            <label-item title="房源标题（广告语）" :valLength="roomData.title.length" :maxSize="30">
                <a-textarea autosize v-model="roomData.title" maxlength="30" placeholder="请输入房源标题"></a-textarea>
            </label-item>
            <label-item title="房源描述" :valLength="roomData.promotionDesc.length" :maxSize="500">
                <a-textarea autosize v-model="roomData.promotionDesc" maxlength="500" placeholder="请输入房源描述"></a-textarea>
            </label-item>
            <div v-if="configRelationFlag" class="configRelationStyle">
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
            </div>
            <div v-else class="unConfigRelationStyle">
              <div>
                <a-checkbox v-model="checkAll" @change="checkAllItem" :indeterminate="indeterminate" ><span class="titleStyle">物品配置</span></a-checkbox>
              </div>
              <div class="selectStyle clearfix">
                <div class="f-fl clearfix item" v-for="(item,index) in showPublicConfig" :key="index">
                  <a-checkbox class="f-fl overHidde" style="width: auto;" v-model="item.checked" @change="(value)=>checkItem(value,index)"><span :class="item.checked?'selectedStyle':'unSelectStyle'">{{item.name}}</span></a-checkbox>
                  <div v-if="item.checked" class="f-fl" style="height: 38px;line-height: 38px;margin-right: 10px;font-weight: 100;">
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
            <label-item title="备注" :valLength="roomData.comment.length" :maxSize="500" style="position: relative;">
              <a-textarea autosize v-model="roomData.comment" maxlength="500" placeholder="请输入房源描述"></a-textarea>
              <div style="position: absolute;color: #FFA036;top:0px;left: 28px;font-size: 12px;line-height: 24px;">
                (仅内部可见)
              </div>
            </label-item>
            <label-item title="房源图片">
                <house-video :uploadParms="uploadParms" ref="uploadRoomPic"></house-video>
            </label-item>
        </label-item>
      <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1200px" v-model="addHouseGoodDialog" class="ownModalBorder titDialog" title="添加物品" @cancel="addHouseGoodDialog=false">
        <add-house-good :formType="formType" :defaultGoodInfo="clickItemInfo" @cancelSave="cancelSave" @addGoodList="addGoodList"></add-house-good>
      </a-modal>
      <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1200px" v-model="deploymentHouseGoodDilog" class="ownModalBorder titDialog" title="物品调配" @cancel="deploymentHouseGoodDilog=false">
        <deployment-house :formType="formType" :defaultGoodInfo="clickItemInfo" @cancelSave="cancelSave" @addGoodList="addGoodList"></deployment-house>
      </a-modal>
    </div>
</template>

<script>
    import * as API from '@/api/shareHouse';
    import * as PublicAPI from '@/api/public';
    import HouseVideo from '@/components/OwnUpload/houseVideo';
    import AddHouseGood from '../../assets/management/addHouseGood';
    import DeploymentHouse from '../../assets/management/deploymentHouse';
    export default {
        name: "AddShareChild",
        components: {
          HouseVideo,
          AddHouseGood,
          DeploymentHouse,
        },
        props: {
            houseData: {
                type: Object,
            },
            checkCode:{
                type:String,
            },
            configRelationFlag:{
                type:Boolean,
            },
        },
        data(){
            return {
                roomData:{
                    actualPrice: '',        // 出租价格（月租金）【单位分】
                    houseArea: '',          // 房间面积
                    housePid: '',           // 房源父ID
                    isShortRent: 0,        // 是否支持短租【0否1是】【民宿】
                    orientation: 2,        // 朝向(1:东；2:南；3:西；4:北；5:南北)
                    promotionDesc: '',      // 描述
                    roomGoodsList: [],      // 物品ID集合
                    roomLevel: 2,           // 房间等级【1、主卧，2、次卧，3、隔断】
                    roomName: '',           // 房间号
                    roomPicIdList: [],      // 房间图片ID列表
                    tagList: [],            // 房间标签集合
                    title: '',              // 房源标题
                    checkCode:'',           //检验码
                    comment:'',             //备注
                },
                houseTagConfig: [],
                housePublicConfig: [],
                currentConfig:[],
                fromType:'room',
                uploadParms: {
                    bizId: '',
                    bizType: 13,
                    subBizType: '',
                },
                tagCheckAll:false,
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
                checkAll:false,
                indeterminate:false,
                operateType:[],
            }
        },
        created(){
            if(this.checkCode){
              this.roomData.checkCode = this.checkCode;
            }
            this.getPermission();
            this.getDictionaryList();
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
            initData(){
              if(this.configRelationFlag){
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
              }
              else{
                this.showPublicConfig = [];
                this.housePublicConfig.forEach((item)=>{
                  let obj = Object.assign({},item);
                  this.currentConfig.forEach((temp)=>{
                    if(temp.id == item.id){
                      obj = Object.assign({},temp);
                    }
                  });
                  this.showPublicConfig.push(obj);
                });
                this.indeterminate = !!this.currentConfig.length && this.currentConfig.length < this.housePublicConfig.length;
                this.checkAll = this.currentConfig.length === this.housePublicConfig.length;
              }
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
                this.showPublicConfig[index].quantity = 1;
              }
              else {
                this.showPublicConfig[index].quantity = 0;
              }
              let selectedConfig = [];
              this.showPublicConfig.forEach((item)=>{
                if(item.checked){
                  selectedConfig.push(item);
                }
              });
              this.indeterminate = !!selectedConfig.length && selectedConfig.length < this.housePublicConfig.length;
              this.checkAll = selectedConfig.length === this.housePublicConfig.length;
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
            // 获取字典
            getDictionaryList(){
                // 特色
                PublicAPI.getTagDictionary().then(res=>{
                    // console.log(res)
                    if (res.code == 200){
                        this.houseTagConfig = res.data;
                    }
                })
                // 公区配置、房间配置
                let parameter = {
                  houseId:'',
                };
                PublicAPI.getHouseConfig(parameter).then(res=>{
                  if (res.code == 200){
                    let tempData = res.data;
                    tempData.forEach((item)=>{
                      item.checked = false;
                      this.housePublicConfig.push(item);
                      this.initData();
                    })
                  }
                })
            },
            checkAllTag(e){
              if(e.target.checked){
                this.roomData.tagList = [];
                this.houseTagConfig.forEach((item)=>{
                  this.roomData.tagList.push(item.name);
                })
              }else{
                this.roomData.tagList = [];
              }
            },
            saveShareRoom(){
                this.roomData.housePid = this.houseData.housePid;
                this.roomData.roomPicIdList = [];
                this.$refs.uploadRoomPic.picsList.forEach((value, index, array) => {
                    this.roomData.roomPicIdList.push(value.id)
                })
                let modifyConfig = [];
                this.showPublicConfig.forEach((item)=>{
                  if(item.quantity>0){
                    modifyConfig.push(item)
                  }
                });
                this.roomData.roomGoodsList = modifyConfig;
                return new Promise((resolve, reject) => {
                    if (!this.roomData.actualPrice || !this.roomData.houseArea || !this.roomData.roomName){
                        this.$message.warning('请输入子间信息！');
                        reject()
                        return
                    }
                    let sendData = JSON.parse(JSON.stringify(this.roomData))
                    sendData.actualPrice = Math.round(sendData.actualPrice*100);
                    API.addChildRoom(sendData).then(res=>{
                        if (res.code == 200){
                            resolve(res)
                        }else{
                            reject(res)
                        }
                    },error => {
                        reject(error)
                    })
                })

            }
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
    .add-share-child{
        padding: 0 20px 20px 20px;
        height: calc(100vh - 150px);
        overflow: auto;
        .child-room{
            & > div{
                margin-bottom: 25px;
            }
            .child-room-info{
                display: flex;
                & > div{
                    margin-right: 28px;
                }
            }
            .house-feature{
                margin: 10px 0 10px 0;
                & > label{
                    margin: 0 25px 15px 0;
                    padding: 0;
                    width: 100px;
                }
            }
            /deep/ .ft-bolder{
                height: 40px;
                line-height: 40px;
                margin-top: 10px;
            }
            .configRelationStyle{
              .titleStyle{
                color: #777777;
                font-size: 12px;
              }
              .selectStyle {
                margin-top: 5px;
                .item{
                  height: 21px;
                  line-height: 21px;
                  width: 20%;
                  margin: 7px 0;
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
            }
            .unConfigRelationStyle{
              .titleStyle{
                color: #777777;
                font-size: 12px;
              }
              .selectStyle{
                margin-top: 5px;
                .item{
                  width: 234px;
                  height: 38px;
                  line-height: 38px;
                }
                .selectedStyle{
                  font-size: 14px;
                  color: #111111;
                }
                .unSelectStyle{
                  font-size: 14px;
                  color: #777777;
                }
                .quantityStyle{
                  height: 38px;
                  .commonStyle{
                    width: 16px;
                    height: 16px;
                    line-height: 14px;
                    background: #F6F7FB;
                    border: 1px solid #EEEEEE;
                    text-align: center;
                    border-radius: 50%;
                    margin-top: 12px;
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
        }
        /deep/ .ant-input{
            padding-left: 0;
        }
        /deep/ .ant-select-selection__rendered{
            margin-left: 0;
        }
        .houseAliasStyle{
            color: #409eff !important;
            border-radius: 3px;
            font-size: 12px;
            margin-right: 6px;
            padding: 3px 5px;
            background-color: #f0f8ff;
        }
      .checkAllStyle{
        position: absolute;
        left: 0px;
        top: 0px;
        font-size: 16px;
      }
    }
</style>
