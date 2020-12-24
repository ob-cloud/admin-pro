<template>
    <div class="addRoomType">
        <a-form :form="form" :layout="formLayout">
            <div class="addRoomTypeLine" style="height:70px;margin-bottom: 10px">
                <div class="f-fl">
                    <input-item title="房型名称" :must="true" :required="requeredData.name.required" :error="requeredData.name.error" width="200px" right="30px">
                        <template slot="content">
                            <a-input placeholder="请输入房型名称" v-model="roomTypeData.name" @change="changeValidate('name')"/>
                        </template>
                    </input-item>
                </div>
                <div class="f-fl">
                    <input-item title="户型" :must="true" width="464px" right="30px" :required="requeredData.roomType.required" :error="requeredData.roomType.error">
                        <template slot="content">
                            <a-input placeholder="请输入" style="width: 100px;" v-model="roomTypeData.room" @change="changeValidate('roomType')" v-validate="'naturalNum'">
                                <span slot="suffix">室</span>
                            </a-input>
                            <a-input class="roomType"  placeholder="请输入" style="width: 100px;" v-model="roomTypeData.livingRoom" @change="changeValidate('roomType')" v-validate="'naturalNum'">
                                <span slot="suffix">厅</span>
                            </a-input>
                            <a-input class="roomType"  placeholder="请输入" style="width: 100px;" v-model="roomTypeData.kitchen" @change="changeValidate('roomType')" v-validate="'naturalNum'">
                                <span slot="suffix">厨</span>
                            </a-input>
                            <a-input class="roomType"  placeholder="请输入" style="width: 100px;" v-model="roomTypeData.toilet" @change="changeValidate('roomType')" v-validate="'naturalNum'">
                                <span slot="suffix">卫</span>
                            </a-input>
                            <a-input class="input_end_css1" style="width: 100px;pointer-events: none;">
                            </a-input>
                        </template>
                    </input-item>
                </div>
                <div class="f-fl">
                    <input-item title="面积" :must="true" width="200px" :required="requeredData.area.required" :error="requeredData.area.error">
                        <template slot="content">
                            <a-input placeholder="请输入" v-model="roomTypeData.area" @change="changeValidate('area')" v-validate="'area'">
                                <span slot="suffix">㎡</span>
                            </a-input>
                        </template>
                    </input-item>
                </div>
            </div>
            <div class="addRoomTypeLine clearfix">
                <div class="f-fl">
                    <input-item title="精装类型" :must="true" width="200px" right="30px" :required="requeredData.decorationType.required" :error="requeredData.decorationType.error">
                        <template slot="content">
                            <a-select v-model="roomTypeData.decorationType" placeholder="请选择精装类型" @change="changeValidate('decorationType')">
                                <a-select-option :value="2">精装</a-select-option>
                                <a-select-option :value="4">毛坯</a-select-option>
                                <a-select-option :value="3">简装</a-select-option>
                                <a-select-option :value="1">豪华装</a-select-option>
                            </a-select>
                        </template>
                    </input-item>
                </div>
                <div class="f-fl" style="position: relative;">
                    <input-item title="出租价格" :must="true" width="200px" right="30px" :required="requeredData.rentalPrice.required" :error="requeredData.rentalPrice.error">
                        <template slot="content">
                            <a-input placeholder="请输入" v-model="roomTypeData.rentalPrice" @change="changeValidate('rentalPrice')" v-validate="'moneyNoDot'"/>
                        </template>
                    </input-item>
                  <div style="position: absolute;right: 32px;top: 25px;">元</div>
                </div>
                <div class="f-fl">
                    <input-item title="" width="200px" right="30px">
                        <template slot="content">
                            <a-checkbox v-model="isShortRentFlag">可短租</a-checkbox>
                        </template>
                    </input-item>

                </div>
            </div>
            <div class="addRoomTypeConfig">
              <label-item class="item u-no-border clearfix" style="width: 100%" title="--  -">
                <div class="checkAllStyle">
                  <a-checkbox @change="value => checkAllTag(value)" v-model="tagCheckAll"><span class="titleStyle">房型特色</span></a-checkbox>
                </div>
                <a-checkbox-group class="public-config" v-model="roomTypeData.tagList" @change="changeTagCheckAll()">
                  <a-checkbox :value="item.name" v-for="(item,i) in houseTagConfig" :key="i">{{item.name}}</a-checkbox>
                </a-checkbox-group>
              </label-item>
            </div>
            <div class="addRoomTypeConfig">
              <div style="margin-top: 4px;">
                <a-checkbox v-model="checkAll" @change="checkAllItem" :indeterminate="indeterminate" ><span class="titleStyle">配置模板</span></a-checkbox>
              </div>
              <div class="selectStyle clearfix">
                <div class="f-fl clearfix item" v-for="(item,index) in showPublicConfig" :key="index">
                  <a-checkbox class="f-fl overHidde" style="width: auto;" v-model="item.checked" @change="(value)=>checkItem(value,index)"><span :class="item.checked?'selectedStyle':'unSelectStyle'">{{item.name}}</span></a-checkbox>
                  <div v-if="item.checked" class="f-fl" style="height: 40px;line-height: 40px;margin-right: 10px;font-weight: 100;">
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
          <div class="addRoomTypeLine" style="padding-bottom: 20px">
            <div>
              <label-item title="VR看房地址" class="u-bottom-border" :valLength="roomTypeData.vrUrl.length" :maxSize="100" >
                <a-textarea autosize placeholder="请输入VR看房链接地址" maxlength="100" v-model="roomTypeData.vrUrl" />
              </label-item>
            </div>
          </div>
            <div class="addRoomTypeLine" style="padding-bottom: 20px">
                <div>
                    <label-item title="房型介绍" class="u-bottom-border" :valLength="roomTypeData.introduction.length" :maxSize="500" >
                        <a-textarea autosize placeholder="请输入房型介绍" maxlength="500" v-model="roomTypeData.introduction" />
                    </label-item>
                </div>
            </div>
            <div class="addRoomTypeLine">
                <label-item title="房型图片">
                  <house-video ref="roomTypeDataPicList" :picList="roomTypeData.picList" :uploadParms="uploadParms"></house-video>
                </label-item>
            </div>
          <div style="margin-top: 30px;">
            <div class="buttonDiv f-fr">
                <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAdd">
                    取消
                </a-button>
                <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="addRoomType">
                    保存
                </a-button>
            </div>
          </div>
        </a-form>
    </div>
</template>

<script>
    import inputItem from "@/components/inputBox/inputItem";
    import * as API from '@/api/centralizedHouse';
    import * as PublicAPI from '@/api/public';
    import HouseVideo from '@/components/OwnUpload/houseVideo';
    export default {
        name: "addRoomType",
        props: {
            roomTypeId: {
                //房型id
                type: String,
                default: ""
            },
            buildingProjectId:{
                //楼盘id
                type: String,
                default: ""
            }
        },
        components: {
          inputItem,
          HouseVideo,
        },
        data(){
            return {
                formLayout: 'vertical',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                houseTagConfig:[],
                roomTypeData:{
                    area:undefined,
                    buildingProjectId:"",
                    decorationType:2,
                    introduction:"",
                    isShortRentFlag:false,
                    isShortRent:0,
                    kitchen:1,
                    livingRoom:1,
                    name:"",
                    picIdList:[],
                    rentalPrice:undefined,
                    room:1,
                    toilet:1,
                    vrUrl:'',
                  tagList:[],
                },
                uploadParms: {},
                requeredData:{
                    name:{
                        required:false,
                        error:"请输入房型名称",
                    },
                    roomType:{
                        required:false,
                        error:"请输入",
                    },
                    area:{
                        required:false,
                        error:"请输入面积",
                    },
                    decorationType:{
                        required:false,
                        error:"请选择精装类型",
                    },
                    rentalPrice:{
                        required:false,
                        error:"请输入",
                    },
                },
                saveLoading:false,
                isShortRentFlag:false,
                tagCheckAll:false,
                showPublicConfig:[],
                checkAll:false,
                indeterminate:false,
            }
        },
        created(){
            this.initData();
            this.getRoomTypeAssetsdict();
        },
        methods:{
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
          changeTagCheckAll(){
            if(this.roomTypeData.tagList==null){
              this.roomTypeData.tagList = [];
            }
            if(this.roomTypeData.tagList.length == this.houseTagConfig.length){
              this.tagCheckAll = true;
            }
            else{
              this.tagCheckAll = false;
            }
          },
          checkAllTag(e){
            if(e.target.checked){
              this.roomTypeData.tagList = [];
              this.houseTagConfig.forEach((item)=>{
                this.roomTypeData.tagList.push(item.name);
              })
            }else{
              this.roomTypeData.tagList = [];
            }
          },
          getRoomTypeAssetsdict(){
            let parameter = {
              roomTypeId:this.roomTypeId,
            };
            // 房型配置
            PublicAPI.getRoomTypeAssetsdict(parameter).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.showPublicConfig = [];
                let selectedConfig = [];
                res.data.forEach((item)=>{
                  if(item.quantity>0){
                    item.checked = true;
                    selectedConfig.push(item)
                  }
                  this.showPublicConfig.push(item)
                });
                this.indeterminate = !!selectedConfig.length && selectedConfig.length < this.showPublicConfig.length;
                this.checkAll = selectedConfig.length === this.showPublicConfig.length;
              }
            })
          },
          // 公区配置、房间配置
          getDictionaryList() {
              // 特色
              PublicAPI.getTagDictionary().then(res => {
                // console.log(res)
                if (res.code == 200) {
                  this.houseTagConfig = res.data;
                  this.changeTagCheckAll();
                }
              })
          },
          initData(){
              this.uploadParms = {
                  bizId: this.roomTypeId,
                  bizType: 15,
                  subBizType: '',
              }
              if(this.roomTypeId!=""){
                  API.roomTypeView(this.roomTypeId).then(res => {
                      if (res.code == "200") {
                          this.roomTypeData = res.data;
                          this.isShortRentFlag = this.roomTypeData.isShortRent == 1 ? true : false;
                          this.roomTypeData.rentalPrice = this.roomTypeData.rentalPrice/100;
                          //图片信息
                          if(typeof(res.data.picList) == "undefined" || res.data.picList==null){
                              this.roomTypeData.picList = [];
                              this.roomTypeData.picIdList = [];
                          }
                          else{
                              let picIdList = [];
                              this.roomTypeData.picList.forEach((val) => {
                                  picIdList.push(val.id);
                                val.status = 'done';
                              })
                              this.roomTypeData.picIdList = picIdList;
                          }
                      }
                      this.getDictionaryList();
                  });
              }else{
                  this.getDictionaryList();
              }
          },
          cancelAdd(){
              this.$emit('cancelAdd');
          },
          changeValidate(value){
              if(value == 'roomType'){
                  let flag = true;
                  if(!this.roomTypeData['room']){
                      flag = false;
                  }
                  if(flag){
                      this.requeredData[value].required = false;
                  }else {
                      this.requeredData[value].required = true;
                  }
              }else {
                  if (this.roomTypeData[value]) {
                      this.requeredData[value].required = false;
                  } else {
                      this.requeredData[value].required = true;
                  }
              }
          },
          checkData(){
                //检验
                let flag = true;
                if(!this.roomTypeData.name){
                    this.requeredData.name.required = true;
                    flag = false;
                }
                if(!this.roomTypeData.room){
                    this.requeredData.roomType.required = true;
                    flag = false;
                }
                if(!this.roomTypeData.area){
                    this.requeredData.area.required = true;
                    flag = false;
                }
                if(!this.roomTypeData.decorationType){
                    this.requeredData.decorationType.required = true;
                    flag = false;
                }
                if(!this.roomTypeData.rentalPrice){
                    this.requeredData.rentalPrice.required = true;
                    flag = false;
                }
                return flag;
            },
          addRoomType(){
                if(this.roomTypeId =="") {
                    let flag = this.checkData();
                    if(!flag){
                        this.$message.warning('请输入必填项！');
                        return;
                    }
                    //新增
                    this.roomTypeData.buildingProjectId = this.buildingProjectId;
                    this.roomTypeData.isShortRent = this.isShortRentFlag ? 1 : 0;
                    //配置处理
                    let goodsList = [];
                    this.showPublicConfig.forEach((item)=>{
                      if(item.quantity>0){
                        goodsList.push(item);
                      }
                    });
                    this.roomTypeData.goodsList = goodsList;
                    //图片处理
                    let roomTypeDataPicList = [...this.$refs.roomTypeDataPicList .picsList];
                    if(roomTypeDataPicList && roomTypeDataPicList.length > 0) {
                        let picIdList = [];
                        roomTypeDataPicList.forEach((val) => {
                            picIdList.push(val.id)
                        })
                        this.roomTypeData.picIdList = picIdList;
                    }
                    let sendData = Object.assign({},this.roomTypeData)
                    sendData.rentalPrice = Math.round(sendData.rentalPrice*100);
                    this.saveLoading = true;
                    API.roomTypeAdd(sendData).then(res => {
                      if(!res){
                        this.saveLoading = false;
                      }
                        if (res.code == "200") {
                          this.saveLoading = false;
                            this.$message.info("添加成功")
                            this.$emit('initPage');
                        }
                        else{
                          this.saveLoading = false;
                        }
                    });
                }
                else{
                    let flag = this.checkData();
                    if(!flag){
                        return;
                    }
                    //修改
                    this.roomTypeData.isShortRent = this.isShortRentFlag ? 1 : 0;
                    this.roomTypeData.id = this.roomTypeId;
                    //配置处理
                    let goodsList = [];
                    this.showPublicConfig.forEach((item)=>{
                      if(item.quantity>0){
                        goodsList.push(item);
                      }
                    });
                    this.roomTypeData.goodsList = goodsList;
                    //图片处理
                    let roomTypeDataPicList = [...this.$refs.roomTypeDataPicList .picsList];
                    if(roomTypeDataPicList && roomTypeDataPicList.length > 0) {
                        let picIdList = [];
                        roomTypeDataPicList.forEach((val) => {
                            picIdList.push(val.id)
                        })
                        this.roomTypeData.picIdList = picIdList;
                    }
                  let sendData = Object.assign({},this.roomTypeData)
                  sendData.rentalPrice = Math.round(sendData.rentalPrice*100);
                  this.saveLoading = true;
                    API.roomTypeEdit(sendData).then(res => {
                      if(!res){
                        this.saveLoading = false;
                      }
                        if (res.code == "200") {
                          this.saveLoading = false;
                            this.$message.info("修改成功")
                            this.$emit('initPage');
                        }
                        else{
                          this.saveLoading = false;
                        }
                    });
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .addRoomType{
        padding:25px 20px 20px 20px;
        height: calc(100vh - 170px);
        overflow: auto;
        .addRoomTypeConfig{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 10px;
            .public-config {
                display: flex;
                flex-wrap: wrap;
                label {
                    width: 130px;
                    margin: 10px 0 10px 0;
                    padding-right: 30px;
                }
            }
            .titleStyle{
              font-size: 12px;
              color: #777777;
            }
            /deep/ .ant-form label{
              font-size: 12px;
              color: #777777;
            }
            .selectStyle{
              margin-top: 2px;
              .item{
                width: 234px;
                height: 40px;
                line-height: 40px;
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
                height: 40px;
                .commonStyle{
                  width: 16px;
                  height: 16px;
                  line-height: 14px;
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
            }
        }
        .addRoomTypeLine{
            width: 100%;
            .roomType{
                /deep/ .ant-input {
                    padding-left: 15px;
                }
            }
            .input_end_css1 {
                .ant-input {

                }
            }
        }
        .checkAllStyle{
            position: absolute;
            left: 0px;
            top: 5px;
            font-size: 16px;
        }
        .buttonDiv {
            .formItemMarginButton {
                width: 120px;
                height: 40px;
            }
            .cancelFont {
                color: #666666;
              margin-right: 20px;
            }
            .saveFont {
                color: #FFFFFF;
                background-color: #0A87F8;
            }
        }
        .mg-top{
            margin-top: 10px;
        }
        .mg-bottom{
            margin-bottom: 20px;
        }
        .checkbox-group{
            width: 100%;
            & > label{
                /*flex: 1;*/
                width: 20%;
                margin: 0 0 20px 0;

            }
        }
        .own-upload{
        }
    }
</style>
