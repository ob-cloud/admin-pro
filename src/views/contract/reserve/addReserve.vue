<template>
    <div class="addReserve-box">
      <div id="addReserve" class="add-reserve">
          <label-item title="房源信息" border :mustFill="true">
              <div class="u-bottom-border address" :class="(searchAddressHaveValue==false&&this.communityList.length==0)?'noSearchAddress':''" v-if="!searchLoading">
                  <a-select showSearch  :disabled="addressFul" :placeholder="placeholder" :value="reserveForm.fullAddress" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false"
                            :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" :not-found-content="null" @focus="focusCommunity" @blur="isEmpty">
                      <a-select-option v-for="(item,index) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
                  </a-select>
              </div>
              <div class="u-bottom-border address" :class="(searchAddressHaveValue==false&&this.communityList.length==0)?'noSearchAddress':''" v-else>
                  <a-select showSearch  :disabled="addressFul" :placeholder="placeholder" :value="reserveForm.fullAddress" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false"
                            :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" @focus="focusCommunity" @blur="isEmpty">
                      <div slot="notFoundContent">
                          <div style="width:100%;text-align: center;color: #FFA036;font-size: 14px;margin-top: 65px;" :style="!reserveMustRelated?'':'margin-bottom: 65px;'">未在系统中检索到该房源，请核对房源信息是否输入有误</div>
                          <div v-if="!reserveMustRelated" style="width:100%;text-align: center;color: #000000;font-size: 14px;margin-bottom: 130px;">您也可以先添加，后续再进行关联操作</div>
                      </div>
                      <a-select-option v-for="(item) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
                  </a-select>
              </div>
              <div class="close-icon-style cursor" v-if="reserveForm.fullAddress&&!addressFul" @click="clearFullAddress">
                  <icon-font class="close-icon cursor" type="iconyumengtubiao_shanchu-1" />
              </div>
              <p v-if="errFul" class="err-p">未在系统检测到该房源信息；您可以先添加预定信息，后续再进行关联操作</p>
              <p v-if="mustRelatedFul" class="err-p-red">请完善预定地址：在预定地址框内输入地址并在检索结果中选择</p>
          </label-item>
          <div class="money-box" style="margin-bottom: 20px;position: relative;">
            <label-item title="定金" border :mustFill="reserveCheck.money.required==1">
              <div class="clearfix">
                <div class="u-bottom-border f-fl addresswu clearfix">
                    <!--<a-select style="min-width: 100px" v-model="reserveForm.paymentMethod">
                        <a-select-option :value="item.id" :key="item.id" v-for="(item) in paymentMethod">{{ item.name }}</a-select-option>
                    </a-select>-->
                    <a-input class="f-fl" style="width: 150px;" v-model="reserveForm.money" v-validate="'money'" placeholder="请输入定金" :disabled="reserveCheck.money.unEditable==1" @keyup.native="mixin_moneyFilter('reserveForm.money',1000000.00)">
                        <span slot="prefix">￥</span>
                      <span slot="suffix">元</span>
                    </a-input>
                    <div class="f-fl" style="margin-top:1px;height: 32px;line-height: 32px;border-bottom:1px solid #dddddd;">
                      <div style="height: 23px;margin-top: 4px; padding-right: 25px;margin-right: 25px;border-right: 1px solid #EEEEEE;"></div>
                    </div>
                    <div class="f-fl" style="margin-top:1px;height: 32px;line-height: 32px;border-bottom:1px solid #dddddd;">
                      <a-radio-group v-model="reserveForm.bookType" :disabled="reserveCheck.bookType.unEditable==1" @change="changeBooleType">
                        <a-radio :value="2">
                          <span :style="reserveForm.bookType==2?'color:#0A87F8':'color:#111111'">未收款</span>
                        </a-radio>
                        <a-radio :value="1">
                          <span :style="reserveForm.bookType==1?'color:#0A87F8':'color:#111111'">已收款</span>
                        </a-radio>
                      </a-radio-group>
                    </div>
                </div>
              </div>
            </label-item>
            <label-item title="" border class="paymentMethod-box"  v-if="reserveForm.bookType==1">
               <a-row :gutter="0">
                  <a-col :span="24">
                      <label-item title="收款方式">
                          <div class="u-bottom-border address">
                              <a-select  style="min-width:150px;" v-model="reserveForm.paymentMethod">
                                <a-select-option :value="item.id" :key="item.id" v-for="(item) in paymentMethod">{{ item.name }}</a-select-option>
                              </a-select>
                          </div>
                      </label-item>
                  </a-col>
               </a-row>  
            </label-item>
            <div style="font-size: 12px;color: #FFA036;width: 100%;position: absolute;top:88px;">
              未收取的定金，可邀请租客通过“{{GlobalConfig.SYSTEM_C_NAME}}”小程序在线支付定金；注意：有效期为{{maxTime}}分钟
            </div>
          </div>
          <label-item title="预定信息" border>
              <a-row :gutter="30">
                  <a-col :span="6">
                      <label-item title="姓名" :mustFill="true">
                          <div class="u-bottom-border gender-box">
                              <a-input v-model="reserveForm.name" placeholder="请输入姓名" />
                              <div class="gender-span" slot="prefix">
                                  <span :class="{ genderNan:genderNanIng}" @click="genderNan">先生</span>
                                  <span :class="{ genderNv:genderNvIng}" @click="genderNv">女士</span>
                              </div>
                          </div>
                      </label-item>
                  </a-col>
                  <a-col :span="6">
                      <label-item title="电话" :mustFill="true">
                          <div class="u-bottom-border">
                              <a-input v-model="reserveForm.phone" :maxlength="11" @keyup.native="mixin_integerFilter('reserveForm.phone')" placeholder="请输入电话" />
                          </div>
                      </label-item>
                  </a-col>
                  <a-col :span="12">
                      <label-item title="身份信息" :mustFill="reserveCheck.certificateType.required==1">
                          <div class="u-bottom-border address">
                              <a-select v-model="reserveForm.certificateType" placeholder="请选择类型" style="min-width: 120px" :disabled="reserveCheck.certificateType.unEditable==1">
                                  <a-select-option :value="1">身份证</a-select-option>
                                  <a-select-option :value="2">护照</a-select-option>
                                  <a-select-option :value="3">港澳通行证</a-select-option>
                                  <a-select-option :value="4">台湾同胞证</a-select-option>
                                  <a-select-option :value="5">企业营业执照</a-select-option>
                                  <a-select-option :value="6">其他</a-select-option>
                              </a-select>
                              <a-input v-model="reserveForm.certificateNo" :maxlength="20" placeholder="请输入" />
                          </div>
                      </label-item>
                  </a-col>
              </a-row>
              <a-row :gutter="30" style="margin-top:10px;">
                  <a-col :span="6">
                      <label-item title="最晚签约日" :mustFill="reserveCheck.signDate.required==1">
                          <div class="u-bottom-border">
                              <a-date-picker v-model="reserveForm.signDate" :format="dateFormat" />
                              <!-- <a-input v-model="reserveForm.signDate" /> -->
                          </div>
                      </label-item>
                  </a-col>
                  <a-col :span="6">
                      <label-item title="预计租住时长" :mustFill="reserveCheck.rentMonth.required==1">
                          <div class="u-bottom-border address">
                              <a-input style="width:calc(100% - 28px);" placeholder="请输入预计租住时长" :disabled="reserveCheck.rentMonth.unEditable==1" v-model="reserveForm.rentMonth" :maxlength="2" />
                              <span style="line-height:32px;">个月</span>
                          </div>
                      </label-item>
                  </a-col>
              </a-row>
          </label-item>
          <label-item class="u-bottom-border" style="width: 100%" title="备注" :maxSize="200" :valLength="reserveForm.comment.length" :mustFill="reserveCheck.comment.required==1">
              <a-textarea v-model="reserveForm.comment" maxlength="200" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="填写后租客可见" />
          </label-item>
          <div class="titlepz">
              预定凭证<span v-if="reserveCheck.picIdList.required==1" style="color: #FB4246;font-size: 14px;">*</span>
              <span>（附件支持格式：jpg、png、jpeg）</span>
          </div>
        <div style="width: 100%;margin-bottom: 12px;">
          <own-upload :showTips="false" :uploadParms="sendData" ref="uploadRoomPic" ></own-upload>
        </div>
        <div class="deptStyle" style="width: 100%;" v-if="!reserveForm.houseId">
          <label-item title="所属门店(部门)/维护人" border>
            <div class="clearfix">
              <label-item title="所属门店(部门)" style="" :mustFill="true" class="u-bottom-border f-fl">
                <store-tree resMark="mk_house_book" :defaultValue='reserveForm.deptName' placement="topLeft" ref="selectDept" width="200px" @selectChange="selectDept" :show-employee="false"></store-tree>
              </label-item>
              <label-item title="维护人" class="u-bottom-border f-fl">
                <dept-employee-tree resMark="mk_house_book" :defaultValue='reserveForm.maintainerName' placement="topLeft" ref="selectDeptEmp" width="200px" @selectChange="selectDeptEmp" :disableDept="true"></dept-employee-tree>
              </label-item>
            </div>
          </label-item>
        </div>
          <div class="clearfix" style="margin:0;">
              <a-button class="f-fr save-contract" type="warning" :loading="saveLoading" @click="saveAddReserve">确定</a-button>
              <a-button class="f-fr quxiao" style="margin-right:20px;" type="warning" @click="cancelUp">取消</a-button>
          </div>
      </div>
      <!-- 预定成功提示 -->
      <a-modal destroyOnClose centered v-model="addReserveSuccessDialog" :maskClosable="false" :closable="false" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'0px 0px 0px 0px'}" width="520px">
        <add-reserve-success :maxTime="maxTime" @colseThis="colseThis"></add-reserve-success>
      </a-modal>
    </div>
</template>

<script>
import AddReserveSuccess from './addReserveSuccess';
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import StoreTree from '@/components/DeptEmployeeTree/store';
import { searchHouse, addReserveHouse } from '@/api/reserve';
import { moduleFieldConfigGet,bizDecisionGet } from '@/api/decision';
import { listEnableDict } from '@/api/contract.js';
import { CURRENTDEPTID } from '@/store/mutation-types';
import {employeeUserInfo} from "@/api/enterprise";
export default {
    name: "addReserve",
    components: {
      AddReserveSuccess,
      DeptEmployeeTree,
      StoreTree,
    },
    props: {
        houseFul:{
            type: Boolean,
            default: false
        },
        roomData:{
            type:Object,
            required: false
        },
      sourceFul:{
        type: Boolean,
        default: false
      },
      sourceObj:{
        type:Object,
        required: false
      }
    },
    data() {
        return {
            placeholder: '请输入房源编号/小区地址/项目名称/门牌号信息检索房源',
            nowTime: new Date().getTime(),
            houseData: {
                cityId: '',                     // 城市id
                communityId: '',
            },
            dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            reserveForm: {
                fullAddress: undefined,                  //房源详细地址
                houseId: '',                      //房源id
                housePid: '',                     //父房源id
                money: '',                        //定金
              bookType:1,                         //默认已付款
                paymentMethod: 1,                     //定金类型
                name: '',                         //租客姓名
                phone: '',                        //租客手机号
                rentMonth: '',                    //租住时长【单位月】
                signDate: null,                   //预计【最晚】签约日期
                picIdList: [],                    //附件信息
                certificateType: undefined,               //租客证件类型：1.身份证，2.护照，3.港澳通行证，4.台湾同胞证
                certificateNo: '',                //租客证件号码
                comment: '',                      //备注
                gender: '',                          //性别
              deptId:'',
              deptName:'',
              maintainerId:'',
              maintainerName:'',
            },
            loading: false,
            imageUrl: '',
            paymentMethod: [],
            sendData: {
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 12, // 图片大类标识  凭证
                subBizType: 1, // 图片子类标识 预定凭证
                orderIndex: 1 // 排序值
            },
            previewVisible: false,
            previewImage: '',
            picList: [],
            communityList: [],
            mustFillBorder: false,
            clickSave: false,
            errFul: false,
            genderNanIng: true,
            genderNvIng: false,
            addressFul:false,
            saveLoading:false,
            searchAddressHaveValue:false,
            searchLoading:false,
            reserveCheck:{
                money:{
                    required:1,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:'',     //初始值
                },
              bookType:{
                required:1,     //是否必填
                unEditable:0,  //是否不可修改
                default:1,     //初始值
              },
                gender:{
                    default:1,      //1、男；2、女
                },
                certificateType:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:1,     //初始值
                },
                signDate:{
                    required:1,
                },
                rentMonth:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:undefined,     //初始值
                },
                comment:{
                    required:0,
                },
                picIdList:{
                    required:0,
                },
            },
            reserveMustRelated:false,
            mustRelatedFul:false,
          maxTime:undefined,
          addReserveSuccessDialog:false,
        }
    },
    created() {
        // 获取租户的授权城市信息列表
        // this.getCity();
      this.getUserInfo();
        this.bizDecisionGet();
        this.getCost();
        if(this.houseFul||this.sourceFul){
          if(this.houseFul){
            this.info(this.roomData);
          }
          if(this.sourceFul){
            this.sourceInfo(this.sourceObj);
            this.moduleFieldConfigGet();
          }
        }
        else {
          this.moduleFieldConfigGet();
        }
    },
    methods: {
      getUserInfo(){
        employeeUserInfo().then(res => {
          this.reserveForm.deptId = res.data.deptId;
          this.reserveForm.deptName = res.data.deptName;
          this.reserveForm.maintainerId = res.data.empId;
          this.reserveForm.maintainerName = res.data.name;
        });
      },
      selectDept(selectObj){
        if (selectObj.type == 'dept') {
          this.reserveForm.deptId = selectObj.id;
          this.reserveForm.deptName = selectObj.name;
        }
        if(!selectObj.type&&!selectObj.name){
          this.reserveForm.deptId = '';
          this.reserveForm.deptName = '';
        }
      },
      selectDeptEmp(selectObj){
        if (selectObj.type == 'employee') {
          this.reserveForm.maintainerId = selectObj.id;
          this.reserveForm.maintainerName = selectObj.name;
        }
        if(!selectObj.type&&!selectObj.name){
          this.reserveForm.maintainerId = '';
          this.reserveForm.maintainerName = '';
        }
      },
      colseThis(){
        this.addReserveSuccessDialog = false;
        this.$emit('saveSuccess',true)
      },
      changeBooleType(){
        if(this.reserveForm.bookType==2&&!this.reserveForm.houseId){
          this.mustRelatedFul = true;
        }
      },
        //获取决策配置
        bizDecisionGet(){
            let paramter ={
                bizPoint:'CONTRACT_BASE_RULE',
                mark:'BOOKING_MUST_RELATED',
                module:'CONTRACT',
            };
            bizDecisionGet(paramter).then(res=>{
                if(res.data&&res.data.onOff==1){
                    this.reserveMustRelated = true;
                }
                else{
                    this.reserveMustRelated = false;
                }
            });
          let paramter1 ={
            bizPoint:'CONTRACT_DATE_RULE',
            mark:'BOOKING_ONLINE_VALID_DATE',
            module:'CONTRACT',
          };
          bizDecisionGet(paramter1).then(res=>{
            if(res.data.value){
              this.maxTime = res.data.value
            }
            else{
              this.maxTime = 60;
            }
          });
        },
        //获取初始化配置
        moduleFieldConfigGet(val){
            let paramter ={
                features:'default',
                moduleMark:'contract.houseBook',
            };
            //若存在策略人
            if(val){
                paramter.deptId = val;
            }
            else {
                paramter.deptId = this.$ls.get(CURRENTDEPTID);
            }
            moduleFieldConfigGet(paramter).then(res=>{
                if(res&&res.data&&res.data.fieldsObj){
                    this.reserveCheck = res.data.fieldsObj;
                    //初始化默认值
                    if(!this.reserveForm.money&&this.reserveCheck.money.default){
                        this.reserveForm.money = this.reserveCheck.money.default;
                    }
                    if(!this.reserveForm.gender&&this.reserveCheck.gender.default){
                        this.reserveForm.gender = this.reserveCheck.gender.default;
                        if(this.reserveForm.gender==1){
                            this.genderNanIng = true;
                            this.genderNvIng = false;
                        }
                        else if(this.reserveForm.gender==2){
                            this.genderNanIng = false;
                            this.genderNvIng = true;
                        }
                    }
                    if(!this.reserveForm.certificateType&&this.reserveCheck.certificateType.default){
                        this.reserveForm.certificateType = this.reserveCheck.certificateType.default;
                    }
                    else {
                        this.reserveForm.certificateType = 1;   //默认是身份证
                    }
                    if(!this.reserveForm.rentMonth&&this.reserveCheck.rentMonth.default){
                        this.reserveForm.rentMonth = this.reserveCheck.rentMonth.default;
                    }
                    if(this.reserveCheck.bookType){
                      if(this.reserveCheck.bookType){
                        this.reserveForm.bookType = this.reserveCheck.bookType.default;
                      }
                    }
                    else{
                      this.reserveCheck.bookType = {
                        required:1,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                      };
                    }
                }
                else{
                    this.reserveCheck = {
                        money:{
                          required:1,     //是否必填
                          unEditable:0,  //是否不可修改
                          default:'',     //初始值
                        },
                      bookType:{
                        required:1,     //是否必填
                        unEditable:0,  //是否不可修改
                        default:1,     //初始值
                      },
                        gender:{
                        default:1,      //1、男；2、女
                        },
                        certificateType:{
                            required:0,     //是否必填
                                unEditable:0,  //是否不可修改
                        default:1,     //初始值
                        },
                        signDate:{
                            required:1,
                        },
                        rentMonth:{
                            required:0,     //是否必填
                                unEditable:0,  //是否不可修改
                        default:undefined,     //初始值
                        },
                        comment:{
                            required:0,
                        },
                        picIdList:{
                            required:0,
                        },
                    }
                    //初始化默认值
                    if(!this.reserveForm.money&&this.reserveCheck.money.default){
                        this.reserveForm.money = this.reserveCheck.money.default;
                    }
                    if(!this.reserveForm.gender&&this.reserveCheck.gender.default){
                        this.reserveForm.gender = this.reserveCheck.gender.default;
                        if(this.reserveForm.gender==1){
                            this.genderNanIng = true;
                            this.genderNvIng = false;
                        }
                        else if(this.reserveForm.gender==2){
                            this.genderNanIng = false;
                            this.genderNvIng = true;
                        }
                    }
                    if(!this.reserveForm.certificateType&&this.reserveCheck.certificateType.default){
                        this.reserveForm.certificateType = this.reserveCheck.certificateType.default;
                    }
                    if(!this.reserveForm.rentMonth&&this.reserveCheck.rentMonth.default){
                        this.reserveForm.rentMonth = this.reserveCheck.rentMonth.default;
                    }
                }
            });
        },
        info(res){
          this.addressFul = true;
          this.reserveForm.fullAddress = res.cityName+res.areaName+res.townName+res.fullAddress;
          this.reserveForm.houseId = res.id;
          this.reserveForm.housePid = res.id;
          if(res.deptId){
            this.moduleFieldConfigGet(res.deptId);
          }
          else{
            if (res.houseInfo) {
              this.moduleFieldConfigGet(res.houseInfo.deptId);
            }
            else{
              this.moduleFieldConfigGet();
            }
          }
        },
      sourceInfo(res){
        this.reserveForm.name = res.name;
        this.reserveForm.phone = res.phone;
        if(res.gender){
          if(res.gender==1){
            this.genderNan();
          }
          else if(res.gender==2){
            this.genderNv();
          }
        }
        if(res.leasePeriod){
          if(res.leasePeriod == 1){
            this.reserveForm.rentMonth = 1;
          }
          else if(res.leasePeriod == 2){
            this.reserveForm.rentMonth = 3;
          }
          else if(res.leasePeriod == 3){
            this.reserveForm.rentMonth = 6;
          }
          else if(res.leasePeriod == 4){
            this.reserveForm.rentMonth = 12;
          }
          else {
            this.reserveForm.rentMonth = 12;
          }
        }
      },
        getCost() {
            listEnableDict('7bf14df972f64b94b7da8d3ff88ead18').then(res => {
                this.paymentMethod = res.data;
                res.data.forEach((data, i) => {
                if (data.name === '现金') {
                    this.reserveForm.paymentMethod = data.id;
                }
                });
            });

        },

        upload(subType) {
            this.sendData.bizId = this.roomId;
            this.sendData.subType = subType;
            this.uploadDisabled = false;
            if (this.picList) {
                this.sendData.orderIndex = this.picList.length + 1;
            } else {
                this.sendData.orderIndex = 1;
            }
        },
        handlePreview(file) {
            this.previewImage = file.url || file.thumbUrl;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        isEmpty(res) {
            if (!this.reserveForm.houseId) {
                this.mustFillBorder = true
            } else {
                this.mustFillBorder = false
            }
        },
        clearFullAddress(){
            this.reserveForm.fullAddress = undefined;
            this.reserveForm.houseId = '';
            this.communityList = [];
        },
        getCommunity(communityId) {

            this.reserveForm.houseId = communityId;
            this.mustFillBorder = false;
            this.communityList.forEach(function(e) {
                if (e.houseId == communityId) {
                    this.reserveForm.fullAddress = e.fullAddress;
                    this.reserveForm.housePid = e.housePid;
                    this.moduleFieldConfigGet(e.deptId);
                    this.bizDecisionGet();
                    this.mustRelatedFul = false;
                }
            }, this);
        },
        focusCommunity(searchVal){
            if(searchVal== undefined||searchVal==''){
                this.searchAddressHaveValue = false;
                this.communityList = [];
                this.searchLoading = false;
            }else{
                this.searchAddressHaveValue = true;
            }
        },
        selectCommunity(searchVal) {
            if(searchVal== undefined||searchVal==''){
                this.searchAddressHaveValue = false;
                this.communityList = [];
                this.searchLoading = false;
                return;
            }else{
                this.searchAddressHaveValue = true;
            }
            let data = {
                fuzzyKeyword: searchVal,
                useBiz:1,
            }
            this.reserveForm.fullAddress = searchVal;
            // console.log(searchVal)
            searchHouse(data).then(res => {
                // console.log(res)
                if (res.code == "200") {
                    if (res.data.length > 0) {
                        this.communityList = res.data;
                        this.errFul = false;
                    } else {
                        this.communityList = [];
                        this.errFul = true;
                    }
                    if(this.reserveMustRelated){
                        this.errFul = false;
                        this.mustRelatedFul = true;
                    }
                    this.searchLoading = true;
                }

            })
            // this.searchCommunityVal = searchVal=='' ? undefined : searchVal;
            // API.searchCommunity(this.houseData.cityId,this.searchCommunityVal).then(res=>{
            //     // console.log(res)
            //     this.communityList = res.data;
            // })
        },
        chooseModel() {

        },

        checkDate() {
            if (!this.reserveForm.fullAddress) {
                this.mustFillBorder = true;
                this.$message.warning('请输入房源地址！');
            
                return false;
            } else {
                this.mustFillBorder = false;
            }
            if(this.reserveMustRelated&&!this.reserveForm.houseId){
                this.$message.warning('请完善预定地址：在预定地址框内输入地址并在检索结果中选择');
                return false;
            }
            if(this.reserveForm.bookType==2&&!this.reserveForm.houseId){
              this.$message.warning('请完善预定地址：在预定地址框内输入地址并在检索结果中选择');
              return false;
            }
            if (!this.reserveForm.name) {
                this.$message.warning('请输入姓名！');

                return false;
            }
            if (!this.reserveForm.phone) {
                this.$message.warning('请输入电话');

                return false;
            } else if (!/^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(this.reserveForm.phone)) {
                this.$message.warning('手机号码输入错误');

                return false;
            }
            if (!this.reserveForm.money&&this.reserveCheck.money.required==1) {
                this.$message.warning('请输入预定金额！');
                return false;
            }
            if(!this.reserveForm.certificateType&&this.reserveCheck.certificateType.required==1){
                this.$message.warning('请完善身份信息！');
                return false;
            }
            if(!this.reserveForm.certificateNo&&this.reserveCheck.certificateType.required==1){
                this.$message.warning('请完善身份信息！');
                return false;
            }
            if(!this.reserveForm.signDate&&this.reserveCheck.signDate.required==1){
                this.$message.warning('请选择最晚签约日期！');
                return false;
            }
            if(!this.reserveForm.rentMonth&&this.reserveCheck.rentMonth.required==1){
                this.$message.warning('请输入预计租住时长！');
                return false;
            }
            if(!this.reserveForm.comment&&this.reserveCheck.comment.required==1){
                this.$message.warning('请输入备注！');
                return false;
            }
            if(this.reserveForm.picIdList.length==0&&this.reserveCheck.picIdList.required==1){
                this.$message.warning('请上传预定凭证！');
                return false;
            }
          if (!this.reserveForm.houseId&&!this.reserveForm.deptId){
            this.$message.warning('请选择所属门店(部门)！');
            return false;
          }
            return true;
        },
        cancelUp(){
            this.$emit('cancelUp', true);
        },
        saveAddReserve() {
            this.reserveForm.picIdList = [];
            this.$refs.uploadRoomPic.picsList.forEach((value, index, array) => {
                this.reserveForm.picIdList.push(value.id)
            })
            if (this.checkDate()) {
                let gradingData = JSON.parse(JSON.stringify(this.reserveForm));
                this.addReserveFun(gradingData);
            }
        },
        genderNan() {
            this.genderNanIng = true;
            this.genderNvIng = false;
            this.reserveForm.gender = 1;
        },
        genderNv() {
            this.genderNanIng = false;
            this.genderNvIng = true;
            this.reserveForm.gender = 2;
        },
        addReserveFun(paraData){
            let data = paraData;
            data.money =  Math.round(data.money * 100);
            this.saveLoading = true;
            if(this.sourceFul){
              data.bizType = this.sourceObj.bizType;
              data.bizId = this.sourceObj.bizId;
            }
            if(this.reserveForm.bookType==2){
              data.paymentMethod = '';
            }
            addReserveHouse(data).then(res => {
                if(!res){
                   this.saveLoading = false;
                }
                if(res.code == '200'){
                  this.saveLoading = false;
                  if(this.reserveForm.bookType == 1){
                    this.$message.success('预定成功');
                    this.$emit('saveSuccess',true);
                  }
                  if(this.reserveForm.bookType == 2){
                    this.addReserveSuccessDialog = true;
                  }
                }else{
                    this.saveLoading = false;
                }
            })
        }
     



    }

}
</script>

<style scoped lang="less">
.addReserve-box{
  .warning{
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    color: #FFA036;
    background-color: fade(#FFA036,10%);
  }
  .add-reserve {
    padding: 0 20px 20px 20px;
    height: calc(100vh - 150px);
    overflow: auto;
    /deep/ .label-item .title .ft-bolder{
      height: 46px;
      line-height: 46px;
    }
    .deptStyle{
      /deep/ .label-item .title{
        margin-top: 0px;
      }
    }
    .money-box{
      display: flex;
      justify-content: flex-start;
      .paymentMethod-box{
        & /deep/.ant-row{
          padding-top: 23px;
          padding-left: 30px;
        }
      }
    }
    .title-opt {
      margin-left: 20px;
      font-size: 16px;
      cursor: pointer;
    }
    h3 {
      font-weight: 500;
      height: 44px;
      line-height: 44px;
    }
    &>div {
      margin-bottom: 14px;
    }
    .house-model {
      margin-left: -30px;
      &>div {
        position: relative;
        margin-left: 30px;
        padding: 10px 16px;
        width: calc(50% - 30px);
        height: 70px;
        line-height: 25px;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        cursor: pointer;
        p:first-child {
          color: @mainFontColor;
        }
        p:last-child {
          color: @tableTitle;
        }
        .choose {
          display: none;
          position: absolute;
          top: 50%;
          right: 18px;
          transform: translateY(-50%);
          color: @themeColor;
          font-size: 36px;
        }
      }
      .active {
        background-color: @themeBgColor;
        border: 1px solid @themeColor;
        .choose {
          display: block;
        }
      }
    }
    .addresswu {
      // width: 50%;
      display: flex; // .must-fill-border {
      //     & /deep/ .ant-select-selection {
      //         border-bottom: 1px solid red;
      //     }
      // }
      /deep/ .ant-input{
        text-indent: 2em;
      }
      /deep/ .ant-input-affix-wrapper .ant-input-prefix{
        left: 0px;
      }
    }
    .paymentMethodStyle{
      padding-left: 15px;
      width: 50%;
      .borderStyle{
        border: 1px solid #EEEEEE;
      }
      .paymentMethodStyle1{
        width: 79px;
        background: #F6F7F8;
        border-radius: 2px 0 0 2px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-right: none;
      }
      .paymentMethodStyle2{
        border-radius: 0 2px 2px 0;
        width: calc(100% - 79px);
        height: 32px;
        /deep/ .ant-select-selection__rendered{
          height: 30px;
          line-height: 30px;
        }
        /deep/ .ant-select-selection--single{
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .address {
      display: flex; // width: calc(50% - 15px);
      width: 100%;
      .must-fill-border {
        & /deep/ .ant-select-selection {
          border-bottom: 1px solid red;
        }
      }
    }
    .close-icon-style{
      position: absolute;
      right: 5px;
      top: 55px;
      .close-icon{
        color: #FB4246;
        font-size: 14px
      }
    }
    .noSearchAddress{
      /deep/ .ant-select-dropdown--empty{
        display: none;
      }
    }
    .err-p {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 160, 54, 1);
      line-height: 17px;
      position: absolute;
    }
    .err-p-red{
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FB4246;
      line-height: 17px;
      position: absolute;
    }
    .certificate-box {}
    .village-info {
      display: flex;

      .title {
        color: @secondaryFontColor;
        font-size: 12px;
      }
      &>div {
        flex: 1;
        margin-right: 30px;
      }
      &>div:last-child {
        display: flex;
        align-items: center;
      }
    }
    .house-list {
      .house-item {
        margin-bottom: 20px;
        .delete-icon {
          color: red;
          font-size: 14px;
        }
        .house-detail {
          border-left: 1px solid @borderColor;
          border-top: 1px solid @borderColor;
          text-align: center;
          font-size: 12px;
          .house-title {
            display: flex;
            background-color: @themeBgColor;
            &>div {
              flex: 1;
              height: 40px;
              line-height: 40px;
              border-right: 1px solid @borderColor;
              border-bottom: 1px solid @borderColor;
            }
            .must-fill {
              color: #FB4246;
            }
          }
          .house-data {
            position: relative;
            display: flex;
            &>div {
              flex: 1;
              height: 100%;
              height: 40px;
              line-height: 40px;
              text-align: center;
              border-right: 1px solid @borderColor;
              border-bottom: 1px solid @borderColor;
              background-color: #ffffff;
              .popover:hover {
                height: 39px;
                line-height: 38px;
                border: 1px solid @themeColor;
                cursor: pointer;
              }
            }
            input {
              text-align: center;
              height: 100%;
            }
            input:focus {
              border: 1px solid @themeColor!important;
            }
            .select-border {
              border: 1px solid @themeColor;
            }
            .options {
              i,
              span {
                display: inline-block;
                width: 50%;
                height: 39px;
                cursor: pointer;
              }
              i {
                line-height: 39px;
                font-size: 14px;
              }
              span {
                padding: 3px 4px;
                line-height: 18px;
                background-color: #DCEFFF;
                color: @themeColor;
              }
            }
          }
        }
        .house-child {
          border: 1px solid @borderColor;
          border-top: none;
          padding: 0 15px 15px 15px;
          background-color: @bigBackgroundColor;
          h3 {
            font-size: 12px;
            p {
              color: @themeColor;
            }
          }
          .house-title {
            background-color: @bigBackgroundColor;
          }
          .add-child {
            font-size: 12px;
            cursor: pointer;
            span {
              margin-right: 6px;
            }
            i {
              font-size: 14px;
            }
          }
        }
      }
    }
    .continue-add {
      text-align: center;
      p {
        display: inline-block;
        padding: 4px 100px;
        border: 1px dashed @borderColor;
        cursor: pointer;
        span {
          color: @themeColor;
        }
        .add {
          padding-left: 10px;
        }
        &:hover {
          border-color: @themeColor;
        }
      }
    }
    .titlepz {
      margin-top: 20px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 17px;
      margin-bottom: 11px;
      span {
        // width:195px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 160, 54, 1);
        line-height: 17px;
      }
    }
    .gender-box {
      position: relative;
      & /deep/ .ant-input {
        padding: 0 70px 0 0;
      }
      .gender-span {
        position: absolute;
        width: 66px;
        right: 0;
        top: 6px;
        span {
          margin-left: 0 !important;
          cursor: pointer;
        }
        span+span {
          margin-left: 5px !important;
        }
        .genderNan,
        .genderNv {
          color: #0A87F8;
        }
      }
    }
    & /deep/ .ant-input,& /deep/ .ant-select-selection__rendered,& /deep/ .ant-select-selection--single{
      height: 32px;
      font-size: 14px;
      margin-left: 0;
      color: #111;
      padding: 0;
    }
    .label-item textarea.ant-input{
      line-height: 20px;
      padding: 4px 0;
    }
    & /deep/.label-item .addon-after{
      height: 32px;
      font-size: 14px;
      line-height: 32px;
    }
    .save-contract {
      width: 120px;
      height: 40px;
      background: rgba(10, 135, 248, 1);
      border-radius: 5px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
    }
    .quxiao {
      width: 120px;
      height: 40px;
      border-radius: 5px;
    }
  }
  .public-config {
    label {
      width: 96px;
      margin: 10px 0;
    }
  }
}
</style>
