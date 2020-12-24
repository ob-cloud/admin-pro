<template>
    <div id="addBill" class="add-bill">
        <label-item title="" class="top-btn f-clearfix">
            <div class="f-clearfix">
                <div class="top-left f-fl">
                    <a-radio-group v-model="billForm.bizType" buttonStyle="solid" :disabled="addressFul" @change="bizTypeChange">
                        <a-radio-button :value="1">房源</a-radio-button>
                        <a-radio-button :value="2">租客</a-radio-button>
                        <a-radio-button :value="3">业主</a-radio-button>
                    </a-radio-group>
                </div>
                <div class="top-right f-fr">
                    <div class="address">
                        <a-select showSearch :placeholder="placeholder" :disabled="addressFul" :value="billForm.fullAddress" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @search="selectCommunity" @blur="isEmpty">
                            <div slot="dropdownRender" slot-scope="menu">
                                <div v-if="communityList.length===0&&searchLoading">
                                    <div style="width:100%;text-align: center;color: #FFA036;font-size: 14px;margin-top: 65px;" v-if="billForm.bizType==1" :style="!billMustRelated?'':'margin-bottom: 65px;'">未在系统中检索到该房源，请核对房源信息是否输入有误</div>
                                    <div style="width:100%;text-align: center;color: #FFA036;font-size: 14px;margin-top: 65px;" v-if="billForm.bizType==2" :style="!billMustRelated?'':'margin-bottom: 65px;'">未在系统中检索到该租客，请核对信息是否输入有误</div>
                                    <div style="width:100%;text-align: center;color: #FFA036;font-size: 14px;margin-top: 65px;" v-if="billForm.bizType==3" :style="!billMustRelated?'':'margin-bottom: 65px;'">未在系统中检索到该业主，请核对信息是否输入有误</div>
                                    <div v-if="!billMustRelated" style="width:100%;text-align: center;color: #000000;font-size: 14px;margin-bottom: 130px;">您也可以先添加，后续再进行关联操作</div>
                                </div>
                                <div v-for="(item,index) in communityList" :key="index" @click="getCommunity(item)">
                                    <div v-if="billForm.bizType == 1" class="communityList">
                                        <span>{{item.viewAddress}}</span>
                                    </div>
                                    <div v-else class="communityList">
                                        <p>{{item.name}}-{{item.phone}} ( {{$moment(item.beginTime).format('YYYY.MM.DD')}}-{{$moment(item.endTime).format('YYYY.MM.DD')}})</p>
                                        <span>{{item.viewAddress}}</span>
                                    </div>
                                </div>
                            </div>
                        </a-select>
                    </div>
                    <div class="close-icon-style cursor" v-if="billForm.fullAddress&&!addressFul" @click="clearFullAddress">
                        <icon-font class="close-icon cursor" type="iconyumengtubiao_guanbi-3" />
                    </div>
                    <p v-if="errFul" class="err-p">未在系统检索到该数据</p>
                    <p v-if="mustRelatedFul" class="err-p-red">请完善记账地址：在记账地址框内输入地址并在检索结果中选择</p>
                </div>
            </div>
            <div v-if="showPayerInfo" class="f-clearfix houseType">
                <div class="houseType-left f-fl">
                    收(付)款人信息
                </div>
                <!-- <div class="houseType-right">

                      </div> -->
                <a-row class="houseType-right f-fl">
                    <a-col :span="5" style="padding:0 16px;margin-top:10px;">
                        <label-item title="姓名" :mustFill="true">
                            <div class="u-no-border ">
                                <a-input v-model="billForm.payerName" :maxlength="20" placeholder="请输入" />
                            </div>
                        </label-item>
                    </a-col>
                    <a-col :span="5" style="padding:0 16px;margin-top:10px;border-left:1px dashed #DDDDDD;border-right:1px dashed #DDDDDD;">
                        <label-item title="电话" :mustFill="true">
                            <div class="u-no-border ">
                                <a-input v-model="billForm.payerPhone" :maxlength="11" @blur="checkPhone(billForm.payerPhone)" placeholder="请输入" />
                            </div>
                        </label-item>
                    </a-col>
                    <a-col :span="14" style="padding:0 16px;margin-top:10px;">
                        <label-item title="收(付)款账号" :mustFill="true">
                            <div class="u-no-border address">
                                <a-select v-model="billForm.paymentAccountType" style="min-width: 74px">
                                    <a-select-option :value="1">银联</a-select-option>
                                    <a-select-option :value="2">支付宝</a-select-option>
                                    <a-select-option :value="3">微信</a-select-option>
                                </a-select>
                                <a-input v-if="billForm.paymentAccountType!=1" v-model="billForm.paymentAccount" :maxlength="19" placeholder="请输入" />
                                <a-input v-if="billForm.paymentAccountType == 1" v-model="billForm.paymentAccount" @blur="addBankName" :maxlength="19" style="min-width:150px" placeholder="银行卡号" />
                                <div class="dividerClass" v-if="billForm.paymentAccountType == 1"></div>
                                <a-input v-if="billForm.paymentAccountType == 1" v-model="billForm.bankName" :maxlength="19" style="min-width:66px;margin-left:5px;" placeholder="所属银行" />
                            </div>
                        </label-item>
                    </a-col>
                </a-row>
            </div>
        </label-item>
        <label-item title="加收费用" border style="padding:0 20px;">
            <div class="contract-modular">
                <div class="content-row">
                    <div class="together-item">
                        <div class="together-detail">
                            <div class="together-title">
                                <div style="max-width: 142px">收支类型
                                    <span style="color:red;">*</span>
                                </div>
                                <div style="max-width: 272px">费用类型
                                    <span style="color:red;">*</span>
                                </div>

                                <div style="max-width: 227px">金额
                                    <span style="color:red;">*</span>
                                </div>
                                <div style="max-width: 100px;text-align: center;">已收(付) </div>
                                <div style="max-width: 90px;text-align: center;">操作</div>
                            </div>
                            <div class="together-data u-no-border" v-for="(item,index) in otherExpenses" :key="index">
                                <div style="max-width: 142px" class="radio-box">
                                    <a-radio-group v-model="item.feeDirection">
                                        <a-radio-button :value="1">收</a-radio-button>
                                        <a-radio-button :value="2">支</a-radio-button>

                                    </a-radio-group>
                                </div>
                                <div style="max-width: 272px">
                                    <a-cascader class="myCascader" style="width: 210px;" placeholder="请选择" :options="costTabsContent" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index)"></a-cascader>
                                </div>
                                <div style="max-width: 227px">

                                    <a-input style="width:140px;" v-model="item.originalMoney" @keyup.native="mixin_moneyFilter('otherExpenses.'+index+'.originalMoney',99999999.99)"></a-input>
                                    <span>元</span>
                                </div>
                                <div style="max-width: 100px">
                                    <a-checkbox @change="checkedFun" v-model="item.isOccur"></a-checkbox>
                                </div>
                                <div class="options f-clearfix" style="max-width: 90px">
                                    <icon-font @click="reduceExpenses(index)" class="fl delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                                </div>
                            </div>
                            <div class="together-foot">
                                <p class="f-fl" style="margin-left:20px">费用合计：
                                    <span style="color:rgb(255, 163, 0);">{{totalMoney}}元</span>
                                </p>
                                <p @click="addExpenses" class="togetherAdd cursor f-fr">
                                    <icon-font style="font-size:16px;color:#0A87F8;" type="iconyumengtubiao_tianjiazijian" /> 添加费用</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </label-item>
        <label-item title="账单信息" border style="padding:0 20px;margin-bottom: 20px;">
            <a-row :gutter="30">
                <a-col :span="6" style="width: 130px">
                    <label-item title="账单类型" :mustFill="true">
                        <div class="u-bottom-border">
                            <a-select v-model="billForm.billType" style="min-width: 100px" @change="selectBill">
                                <a-select-option :value="1">独立账单</a-select-option>
                                <a-select-option :value="2">周期账单</a-select-option>
                            </a-select>
                        </div>
                    </label-item>
                </a-col>
                <a-col :span="12" v-if="billForm.billType == 1" style="margin: 0 33px">
                    <label-item title="账单周期" :mustFill="true">
                        <div class="u-bottom-border address">
                            <a-range-picker v-model="timeDateList" :format="dateFormat" @change="onTimeChange" :allowClear="false" />
                        </div>
                    </label-item>
                </a-col>
                <a-col :span="12" v-if="billForm.billType == 2" style="margin: 0 33px">
                    <label-item title="账单周期">
                        <div class="u-bottom-border address">
                            <a-select showSearch placeholder="请选择" :value="billForm.ascriptionBillName" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false">
                                <div slot="dropdownRender" slot-scope="menu">
                                    <div v-for="(item,index) in billSelectList" :key="index" @click="getSelectBill(item)">
                                       <div class="communityList"><span style="color: #111;font-size: 14px;">{{item.billName}}</span><span style="color: #777777;font-size: 14px;">（{{$moment(item.beginTime).format('YYYY.MM.DD')}} - {{$moment(item.endTime).format('YYYY.MM.DD')}}）</span></div>
                                    </div>
                                </div>
                            </a-select>
                        </div>
                    </label-item>
                </a-col>
                <a-col :span="6">
                    <label-item title="预计支付时间" :mustFill="true">
                        <div class="u-bottom-border">
                            <a-date-picker v-model="billForm.predictTime" :format="dateFormat" />

                        </div>
                    </label-item>
                </a-col>
            </a-row>
        </label-item>
        <label-item class="u-bottom-border textAreaStyle" style="width: 760px;margin:0 20px;margin-bottom: 20px;" title="账单备注" :maxSize="500" :valLength="billForm.comment.length">
            <a-textarea v-model="billForm.comment" maxlength="500" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入备注信息" />
        </label-item>
        <div class="titlepz" style="padding:0 20px;margin-bottom: 10px;">
            账单凭证
            <span>（附件支持格式：jpg、png、jpeg）</span>
        </div>
        <div style="padding:0 20px;">
            <own-upload :picList="fileList" :uploadParms="sendData" :showTips="false" ref="fileList">
            </own-upload>
        </div>

        <label-item title="支付详情" border v-if="isOccurFul" style="padding:0 20px;margin-bottom: 20px;">
            <a-row :gutter="30">
                <a-col :span="6">
                    <label-item title="实收(付)日期" :mustFill="true">
                        <div class="u-bottom-border">
                            <a-date-picker v-model="payInfo.practicalTime" :format="dateFormat" />

                        </div>
                    </label-item>
                </a-col>
                <a-col :span="6">
                    <label-item title="支付途径" :mustFill="true">
                        <div class="u-bottom-border">

                            <a-select v-model="payInfo.paymentMethod" style="width:100%" placeholder="请选择">
                                <a-select-option v-for="(item,index) in payLits" :key="index" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </div>
                    </label-item>
                </a-col>
                <a-col :span="12">
                    <label-item title="支付备注">
                        <div class="u-bottom-border address">
                            <a-input v-model="payInfo.paymentNote" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" /></a-input>
                        </div>
                    </label-item>
                </a-col>
            </a-row>
        </label-item>
        <div class="titlepz" style="padding:0 20px;margin-bottom: 20px;" v-if="isOccurFul">
            支付凭证
            <span>（附件支持格式：jpg、png、jpeg）</span>
        </div>
        <div style="padding:0 20px;" v-if="isOccurFul">
            <own-upload :picList="voucherList" :uploadParms="sendData1" :showTips="false" ref="voucherList">
            </own-upload>
        </div>
      <div class="deptStyle" style="width: 100%;padding: 0 20px;" v-if="!billForm.houseId">
        <label-item title="所属门店(部门)/维护人" border>
          <div class="clearfix">
            <label-item title="所属门店(部门)" style="" :mustFill="true" class="u-bottom-border f-fl">
              <store-tree resMark="mk_fin_bill" @cancelOtherTree="cancelOtherTree(1)" :defaultValue='billForm.deptName' placement="topLeft" ref="selectDept" width="200px" @selectChange="selectDept" :show-employee="false"></store-tree>
            </label-item>
            <label-item title="维护人" class="u-bottom-border f-fl">
              <dept-employee-tree resMark="mk_fin_bill" @cancelOtherTree="cancelOtherTree(2)" :defaultValue='billForm.maintainerName' placement="topLeft" ref="selectDeptEmp" width="200px" @selectChange="selectDeptEmp" :disableDept="true"></dept-employee-tree>
            </label-item>
          </div>
        </label-item>
      </div>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save">
                保存
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="closeThis">
                取消
            </a-button>
        </div>
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import { billAdd, searchContract } from '@/api/bill.js';
import { searchHouse } from '@/api/reserve';
import { getBankName } from '@/api/public.js';
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { dictionaryListDict, listEnableDict,billSelectList } from '@/api/contract.js';
import { bizDecisionGet } from '@/api/decision';
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import StoreTree from '@/components/DeptEmployeeTree/store';
import {employeeUserInfo} from "@/api/enterprise";
export default {
    name: "addBill",
    components: {
      DeptEmployeeTree,
      StoreTree,
    },
    props: {
        houseFul:{        //房源详情录入合同
            type: Boolean,
            default: false
        },
        roomData:{
            type:Object,
            required: false
        },
        contractFul:{        //合同详情录入账单
            type: Boolean,
            default: false
        },
        contractData:{
            type:Object,
            required: false
        },
        contractFulOwner:{        //合同详情录入账单
            type: Boolean,
            default: false
        },
        contractDataOwner:{
            type:Object,
            required: false
        },
    },
    data() {
        return {
            placeholder: '请输入房源编号/小区地址/项目名称/门牌号/租客姓名/租客电话/业主姓名/业主电话检索房源',
            nowTime: new Date().getTime(),
            houseData: {
                cityId: '',                     // 城市id
                communityId: '',
            },
            dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            uploadHeader: {
                Authorization: ""
            },
            action: process.env.VUE_APP_BASE_FILESERVER_URL + "/file_upload",
            billForm: {
                bizId:'',
                ascriptionBillName:undefined,              //归属账单名称
                ascriptionBillId:'',                //归属账单ID
                viewAddress: '',                   //显示使用
                bizType: 1,                        //账单业务类型【1、房源，2、租客，3、业主】
                bankName: '',                     //收付款账号开户行
                beginTime: null,                  //费用开始时间
                endTime: null,                    //费用结束时间
                comment: '',                      //账单备注
                fileIdList: [],                     //账单附件Id集合
                feeInfoList: [],                     //费用信息
                fullAddress: undefined,                  //房源详细地址
                houseAlias: '',                    //房屋编号【快速检索用】
                maintainerId: '',                  //负责人ID
              maintainerName:'',
              deptId:'',
              deptName:'',
                payerName: '',                     //收付款人姓名
                payerPhone: '',                    //收付款人手机号
                paymentAccount: '',                //收付款账号
                paymentAccountType: 1,            //收付款账号类型【1银行卡2支付宝3微信】
                predictTime: null,                   //预收付时间
                houseId: '',                      //房源id
                housePid: '',                     //父房源id
                billType: 1, //不传  账单类型
                payInfo: {}                        //添加账单-支付信息
            },
            payInfo: {
                paymentMethod: '',
                paymentNote: '',
                practicalTime: null,
                voucherIdList: []
            },
            loading: false,
            imageUrl: '',
            sendData: {
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 4, // 图片大类标识  收支
                subBizType: 1, // 图片子类标识 账单凭证
                orderIndex: 1 // 排序值
            },
            sendData1: {
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 4, // 图片大类标识  收支
                subBizType: 2, // 图片子类标识 支付凭证
                orderIndex: 1 // 排序值
            },
            previewVisible: false,
            previewImage: '',
            fileList:[],
            voucherList:[],
            fileIdList: [],
            voucherIdList: [],
            communityList: [],
            billSelectList:[],
            mustFillBorder: false,
            clickSave: false,
            errFul: false,
            options13: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 99 }],
            otherExpenses: [
                {
                    isOccur: false,
                    feeSubjectId: '',
                    originalMoney: 0,
                    feeDirection: 1
                }
            ], // 其他费用
            costTabsContent: [], // 费用类型
            payLits: [], //支付途径
            elcostcascaderValue: {
                value: 'id',
                label: 'name',
                children: 'metaList'
            },
            timeDateList: [],
            isOccurFul: false,
            lastCheck: false,
            addressFul:false, // 房源签约 则不可更改房源地址
            showPayerInfo:true,
            searchLoading:false,
            billMustRelated:false,
            mustRelatedFul:false,
        }
    },
    created() {
      this.getUserInfo();
        this.getCost();
        const token = this.$ls.get(ACCESS_TOKEN)
        this.uploadHeader.Authorization =
            "Bearer " + token;
        if(this.houseFul){ //如果是房源详情的账单
            this.houseFun(this.roomData);
        }
        if(this.contractFul){ //如果是房源详情的账单
            this.contractFun(this.contractData);
            this.showPayerInfo = false;
        }
        
        if(this.contractFulOwner){ //如果是房源详情的账单
            this.contractOwnerFun(this.contractDataOwner);
            this.showPayerInfo = false;
        }
        
        let date = new Date();
        this.billForm.predictTime = this.$moment(date.getTime());
        this.bizDecisionGet();

    },
    computed: {
        totalMoney() {
            let total = 0;
            for (let item of this.otherExpenses) {
                if (item.feeDirection === 1) {
                    total += item.originalMoney * 1;
                } else {
                    total -= item.originalMoney * 1;
                }
            }
            return total.toFixed(2);
        }
    },
    methods: {
      cancelOtherTree(val){
        if(val==1){
          this.$refs.selectDeptEmp.showTree = false;
        }
        if(val==2){
          this.$refs.selectDept.showTree = false;
        }
      },
      getUserInfo(){
        employeeUserInfo().then(res => {
          this.billForm.deptId = res.data.deptId;
          this.billForm.deptName = res.data.deptName;
          this.billForm.maintainerId = res.data.empId;
          this.billForm.maintainerName = res.data.name;
        });
      },
      selectDept(selectObj){
        if (selectObj.type == 'dept') {
          this.billForm.deptId = selectObj.id;
          this.billForm.deptName = selectObj.name;
        }
        if(!selectObj.type&&!selectObj.name){
          this.billForm.deptId = '';
          this.billForm.deptName = '';
        }
      },
      selectDeptEmp(selectObj){
        if (selectObj.type == 'employee') {
          this.billForm.maintainerId = selectObj.id;
          this.billForm.maintainerName = selectObj.name;
        }
        if(!selectObj.type&&!selectObj.name){
          this.billForm.maintainerId = '';
          this.billForm.maintainerName = '';
        }
      },
        //获取决策配置
        bizDecisionGet(val){
            let paramter ={
                bizPoint:'FINANCE_BILL',
                mark:'FINANCE_BILL_MUST_RELATED',
                module:'FINANCE',
            };
            bizDecisionGet(paramter).then(res=>{
                if(res.data&&res.data.onOff==1){
                    this.billMustRelated = true;
                }
                else{
                    this.billMustRelated = false;
                }
            });
        },
        houseFun(res){
          this.addressFul = true;
          this.billForm.fullAddress = res.cityName+res.areaName+res.townName+res.fullAddress;
          this.billForm.houseId = res.id;
          this.billForm.housePid = res.housePid;
          this.billForm.houseAlias = res.houseAlias;

          this.billForm.maintainerId = res.maintainerId;
          this.billForm.cityName = res.cityName;
          this.billForm.areaName = res.areaName;
          this.billForm.price = res.actualPrice/100;
          this.billForm.deposit = res.actualPrice/100;
        },
        contractFun(res){
          this.billForm.bizType = 2;
          this.addressFul = true;
          this.billForm.bizId = res.id;
          if(res.houseId){
            this.billForm.houseId = res.houseId
          }
          this.billForm.fullAddress = res.name + '-' + res.phone + ' (' + this.$moment(res.beginTime).format('YYYY.MM.DD') + '-' + this.$moment(res.endTime).format('YYYY.MM.DD') + ')';
        },
        contractOwnerFun(res){
          this.billForm.bizType = 3;
          this.addressFul = true;
          this.billForm.bizId = res.id;
          if(res.houseId){
            this.billForm.houseId = res.houseId
          }
          this.billForm.fullAddress = res.name + '-' + res.phone + ' (' + this.$moment(res.beginTime).format('YYYY.MM.DD') + '-' + this.$moment(res.endTime).format('YYYY.MM.DD') + ')';
        },
        // 获取费用类型
        getCost(filterIndex, type, id) {
            const params = 'FEESUBJECT';
            dictionaryListDict(params).then(res => {
                // console.log(res)
                if (res.code === "200") {
                    const checkRes = res.data;
                    this.costTabsContent = checkRes;
                    // this.info = res.data;
                }
            })
            listEnableDict('7bf14df972f64b94b7da8d3ff88ead18').then(res => {
                this.payLits = res.data;
                res.data.forEach((data, i) => {
                    if (data.name === '现金') {
                        this.payInfo.paymentMethod = data.id;
                    }
                });
            });
        },
        addExpenses() {
            this.otherExpenses.push({
                isOccur: false,

                feeSubjectId: '',
                originalMoney: 0,
                feeDirection: 1
            });
        },
        reduceExpenses(index) {
            if (this.otherExpenses.length == 1) {
                this.$message.warning('不能再删咯！');
            } else {
                this.otherExpenses.splice(index, 1);
            }
        },
        // 费用类型方法
        costSelect(value, index) {
            if (value[1]) {
                // this.otherExpenses[index].feeSubjectId = value[1];
                let obj = this.otherExpenses[index];
                obj.feeSubjectId = value[1];
                this.otherExpenses.splice(index, 1, obj);
            } else {
                // this.otherExpenses[index].feeSubjectId = value[0];
                let obj = this.otherExpenses[index];
                obj.feeSubjectId = value[0];
                this.otherExpenses.splice(index, 1, obj);
            }
        },
        onTimeChange(date, dateString) {
            this.billForm.beginTime = date[0];
            this.billForm.endTime = date[1];

        },
        handleCancel() {
            this.previewVisible = false;
        },
        isEmpty(res) {
            if (!this.billForm.houseId) {
                this.mustFillBorder = true
            } else {
                this.mustFillBorder = false
            }
            if(this.billForm.bizType==1){
                this.showPayerInfo = true;
            } else{
                if(this.billForm.bizId){
                    this.showPayerInfo = false;
                }else{
                    this.showPayerInfo = true;
                }
            }
        },
        clearFullAddress(){
            this.billForm.fullAddress = undefined;
            this.billForm.houseId = '';
            this.communityList = [];
        },
        getCommunity(res) {
            if(this.billForm.bizType == 1){
                this.billForm.houseId = res.houseId;
                this.mustFillBorder = false;
                this.communityList.forEach(function(e) {
                    if (e.houseId == res.houseId) {
                        this.billForm.fullAddress = e.fullAddress;
                        this.billForm.viewAddress = e.viewAddress;
                        this.billForm.housePid = e.housePid;
                        this.billForm.houseAlias = e.houseAlias;
                        this.billForm.bizId = e.bizId;
                        this.billForm.payerName = e.name;
                        this.billForm.payerPhone = e.phone;
                        this.billForm.maintainerId = e.maintainerId;
                        this.mustRelatedFul = false;
                    }
                }, this);
            }else{
              this.mustFillBorder = false;
                this.communityList.forEach(function(e) {
                    if (e.bizId == res.bizId) {
                        this.billForm.fullAddress = e.name + '-' + e.phone + ' (' + this.$moment(e.beginTime).format('YYYY.MM.DD') + '-' + this.$moment(e.endTime).format('YYYY.MM.DD') + ')';
                        this.billForm.bizId = e.bizId;
                        this.billForm.houseId = e.houseId;
                    }
                }, this);
            }
            
            //如果当前是周期账单
            this.selectBill();
        },
        bizTypeChange(){
            this.communityList = [];
            this.billSelectList = [];
            this.billForm.ascriptionBillName = undefined;
            this.billForm.fullAddress = undefined;
            this.billForm.viewAddress = '';
            this.billForm.housePid = '';
            this.billForm.houseAlias = '';
            this.billForm.payerName = '';
            this.billForm.payerPhone = '';
            this.billForm.maintainerId = '';
            // this.billForm.cityName = '';
            // this.billForm.areaName = '';

            // this.billForm.areaId = '';
            this.billForm.bizId = '';
            // this.billForm.cityId = '';
            // this.billForm.communityId = '';
            // this.billForm.communityName = '';
            // this.billForm.doorplate = '';
            // this.billForm.townId = '';
            // this.billForm.townName = '';
            this.errFul = false;
            if(this.billForm.bizType==1){
                this.showPayerInfo = true;
                this.placeholder = '请输入房源编号/小区地址/项目名称/门牌号/租客姓名/租客电话/业主姓名/业主电话检索房源';
            } else{
                if(this.billForm.bizType==2){
                    this.placeholder = '请输入房源编号/小区地址/项目名称/门牌号/租客姓名/租客电话检索租客合同';
                }
                if(this.billForm.bizType==3){
                    this.placeholder = '请输入房源编号/小区地址/项目名称/门牌号/业主姓名/业主电话检索业主合同';
                }
                if(this.billForm.bizId){
                    this.showPayerInfo = false;
                }else{
                    this.showPayerInfo = true;
                }
            }
        },
        selectCommunity(searchVal) {
            if(searchVal== undefined||searchVal==''){
                this.communityList = [];
                this.searchLoading = false;
                return;
            }
            if(this.billForm.bizType==1) {
                //检索房源
                let data = {
                    fuzzyKeyword: searchVal,
                    useBiz:4,
                }
                this.billForm.fullAddress = searchVal;
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
                        if(this.billMustRelated){
                            this.errFul = false;
                            this.mustRelatedFul = true;
                        }
                        this.searchLoading = true;
                    }
                })
            }
            else{
                let useBiz = 1;
                if(this.billForm.bizType==2){
                    useBiz = 1;
                } else{
                    useBiz = 2;
                }
                //检索合同
                let data = {
                    fuzzyKeyword: searchVal,
                    useBiz:useBiz,
                }
                this.billForm.fullAddress = searchVal;
                searchContract(data).then(res => {
                    // console.log(res)
                    if (res.code == "200") {
                        if (res.data.length > 0) {
                            this.communityList = res.data;
                            this.errFul = false;
                        } else {
                            this.communityList = [];
                            this.errFul = true;
                        }
                        this.searchLoading = true;
                    }
                })
            }
        },
        selectBill() {
            if(this.billForm.billType == 1){
                this.billForm.ascriptionBillId = undefined;
                return;
            }
            //清空billType为1账单周期
            let id ='';
            if(this.billForm.bizType==1){
                id = this.billForm.houseId;
            }else{
                id = this.billForm.bizId;
            }
            if (!id){
                this.$message.warn('请选择房源！');
                return;
            }
            let data = {
                bizType: this.billForm.bizType,
                id: id,
            }
            billSelectList(data).then(res => {
                // console.log(res)
                if (res.code == "200") {
                    if (res.data.length > 0) {
                        this.billSelectList = res.data;
                    } else {
                        this.billSelectList = [];
                    }
                    this.searchLoading = true;
                }

            })
        },
        getSelectBill(res) {
            this.billForm.ascriptionBillName = res.billName + '（'+Vue.prototype.$moment(res.beginTime).format('YYYY.MM.DD')+' - '+Vue.prototype.$moment(res.endTime).format('YYYY.MM.DD')+'）';
            this.billForm.ascriptionBillId = res.id;
            this.billForm.beginTime = res.beginTime;
            this.billForm.endTime = res.endTime;
        },
        checkedFun() {
            this.isOccurFul = this.otherExpenses.some(e => {
                return e.isOccur;
            })
        },
        save() {
            if (this.checkDate()) {
                if (this.isOccurFul) {
                    let list = [];
                    if (this.$refs.voucherList.picsList.length != 0) {
                        let imgObj4_1 = this.$refs.voucherList.picsList;
                        if (imgObj4_1.length > 0) {
                            imgObj4_1.forEach(function(e) {
                                list.push(e.id)
                            }, this);
                        }
                    }
                    this.payInfo.voucherIdList = list;
                    this.billForm.payInfo = Object.assign({}, this.payInfo);

                }

                let idList = [];
                if (this.$refs.fileList.picsList.length != 0) {
                    let temp = this.$refs.fileList.picsList;
                    if (temp.length > 0) {
                        temp.forEach(function(e) {
                            idList.push(e.id)
                        }, this);
                    }
                }
                this.billForm.fileIdList = idList;
                let postData = Object.assign({}, this.billForm);
                let feeInfoList = JSON.parse(JSON.stringify(this.otherExpenses));
                for (let item of feeInfoList) {
                    item.originalMoney = Math.round(item.originalMoney * 100);
                    item.isOccur = item.isOccur ? 1 : 0;
                }
                postData.feeInfoList = feeInfoList;
                postData.beginTime = this.$moment(this.billForm.beginTime).format('YYYY-MM-DD');
                postData.endTime = this.$moment(this.billForm.endTime).format('YYYY-MM-DD');
                postData.predictTime = this.$moment(this.billForm.predictTime).format('YYYY-MM-DD')
                postData.payInfo.practicalTime = this.$moment(this.billForm.payInfo.practicalTime).format('YYYY-MM-DD')
                billAdd(postData).then(res => {
                    // console.log(res)
                    if (res.code === "200") {
                        this.$message.success('操作成功！');
                        this.$emit('saveSuccess',true);
                        // this.info = res.data;
                    }
                })
            }
        },
        checkPhone(phone) {
            if(this.billForm.bizType ==1){
              if (!phone) {
                this.$message.error('请输入手机号');
                return true;
            }
            if (!/^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(phone)) {
                if (this.lastCheck) {
                    this.lastCheck = false;
                    this.$message.error('手机号码输入错误');
                    return true;
                } else {
                    this.$message.error('手机号码输入错误');
                    return true;
                }
            } else {
                this.requiredPhone = false;
                return false;
            }
            }else{
                return false;
            }

        },
        addBankName() {
            if (this.billForm.paymentAccount && this.billForm.paymentAccountType == 1) {
                getBankName(this.billForm.paymentAccount).then(res => {
                    // if (res.code === "200") {
                        if (res.data == null) {
                            this.$message.error('银行卡号输入错误');

                            return true;
                        } else {
                            this.billForm.bankName = res.data;

                            return false;
                        }
                    // }
                })
            }else{
               return false;
            }

        },
        closeThis() {
            this.$emit('closeThis', true);
        },
        checkDate() {
            this.lastCheck = true;
            // console.log(this.billForm.fullAddress)
            if (!this.billForm.fullAddress) {
                this.$message.warning('请输入房源地址！');
                return;
            }
            if(this.billMustRelated&&this.billForm.bizType == 1&&!this.billForm.houseId){
                this.$message.warning('请完善记账地址：在记账地址框内输入地址并在检索结果中选择！');
                return;
            }
            if (!this.billForm.payerName&&this.billForm.bizType ==1) {
                this.$message.warning('请输入姓名！');
                return;
            }
            if (this.checkPhone(this.billForm.payerPhone)) {
                // 这个是判断字段传的是否正确  电话号码
                return false;
            }
            if (this.billForm.bizType == 1 && !this.billForm.paymentAccount) {
                this.$message.warning('请输入收付款卡号！');
                return;
            }
            if (this.addBankName()) {
                return false;
            }
            if (
                    this.otherExpenses.some(e => {
                        return (
                            e.feeSubjectId === '' ||  e.originalMoney === ''
                        );
                    })
                ) {
                    this.$message.error('请填写费用信息');
                    return;
                }
                if (this.billForm.billType == 1 && (!this.billForm.beginTime || !this.billForm.endTime)) {
                    this.$message.warning('请输入账单周期！');
                    return;
                }
                if (this.billForm.billType == 2 &&!this.billForm.ascriptionBillId) {
                    this.$message.warning('请选择账单周期！');
                    return;
                }
                if (!this.billForm.predictTime) {
                    this.$message.warning('请输入预计支付时间！');
                    return;
                }
                if(this.isOccurFul && !this.payInfo.practicalTime){
                    this.$message.warning('请输入实收(付)日期！');
                    return;
                }
                if (!this.billForm.houseId&&!this.billForm.deptId){
                  this.$message.warning('请选择所属门店(部门)！');
                  return;
                }
            return true;
        },





    }

}
</script>

<style scoped lang="less">
.add-bill {
    // padding: 0 20px 20px 20px;
    height: calc(100vh - 150px);
    // max-height: 600px;
    overflow: auto;
  .deptStyle{
    /deep/ .label-item .title{
      margin-top: 0px;
    }
  }
    .top-btn {
        // height: 80px;
        background: rgba(237, 243, 254, 1); // opacity: 0.99;
        padding: 20px;
        .top-left {
            height: 40px;
            & /deep/ .ant-radio-group {

                .ant-radio-button-wrapper {
                    height: 40px;
                    width: 68px;
                    line-height: 40px;
                    padding: 0 16px;
                    font-size: 16px;
                }
            }
        }
        .top-right {
            width: 540px;
            height: 40px;
            & /deep/ .ant-select-selection__rendered {
                height: 40px;
                line-height: 40px;
                margin-left: 4px;
            }
            & /deep/.ant-select-selection--single {
                height: 40px;
                line-height: 40px;
            }
        }
        .houseType {
            margin-top: 20px;
            .houseType-left {
                width: 80px;
                height: 70px;
                background: rgba(246, 247, 248, 1);
                padding: 15px;
                font-size: 13px;
                color: rgba(10, 135, 248, 1)
            }
            .houseType-right {
                height: 70px;
                background: #fff;
                width: 674px;
                & /deep/ .title {
                    margin-top: 0;
                }
                & /deep/ .label-item {
                    height: 50px;
                }
            }
        }
    }
    .contract-modular {
        width: 758px; // padding: 13px 0 5px 18px;
        .titleInfo {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            position: relative;
            box-sizing: border-box;
            margin: 11px 0;
            b {
                font-weight: normal;
            }
        }
        .content-row {


            .together-item {
                margin-bottom: 12px;
                .delete-icon {
                    color: red;
                    font-size: 14px;
                }
                .together-detail {
                    border-left: 1px solid @borderColor;
                    border-top: 1px solid @borderColor;
                    text-align: center;
                    font-size: 12px;
                    .together-title {
                        display: flex;
                        background: rgba(247, 248, 251, 1);
                        text-align: left;
                        &>div {
                            padding: 0px 26px;
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
                    .together-data {
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
                        .payPattern {
                            padding: 0 9px;
                        }
                        input {
                            text-align: left; // padding: 0 9px;
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
                        .togeAddress {
                            padding: 0 9px;
                            display: flex; // width: calc(50% - 15px);
                            width: 100%;
                            height: 100%;
                            & /deep/ .ant-select-selection__rendered {
                                // margin-left: 16px;
                                margin-top: 6px;
                            }
                        }
                        .radio-box {
                            & /deep/.ant-radio-button-wrapper {
                                padding: 0 14px;
                                height: 24px;
                                line-height: 24px;
                                &:nth-child(1) {
                                    border-radius: 20px 0 0 20px;
                                }
                                &:nth-child(2) {
                                    border-radius: 0 20px 20px 0;
                                }
                            }
                            & /deep/.ant-radio-button-wrapper-checked {
                                border-radius: 50%;
                            }
                        }
                        & /deep/.ant-cascader-picker-label {
                            text-align: left;
                        }
                    }
                    .together-foot {
                        height: 40px;
                        line-height: 40px;
                        border-right: 1px solid @borderColor;
                        border-bottom: 1px solid @borderColor;
                        .togetherAdd {
                            color: #0A87F8;
                            width: 100px;
                            margin: 0 auto;
                            text-align: center;
                          i{
                            vertical-align: -0.2em;
                          }
                        }
                    }
                }
            }
        }
    }
    .address {
        display: flex; // width: calc(50% - 15px);
        width: 100%;
        .must-fill-border {
            & /deep/ .ant-select-selection {
                border: 1px solid red;
            }
        }
        .dividerClass{
            height: 15px;
            width: 1px;
            border: 0.5px solid #BBBBBB;
            margin: 8px 10px 0 10px;
        }
    }
    .close-icon-style{
        position: absolute;
        right: 30px;
        top: 30px;
        .close-icon{
            color: #FB4246;
            font-size: 14px
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
    .titlepz {
        margin-top: 6px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
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
    & /deep/ .ant-input,
    & /deep/ .ant-select-selection__rendered,
    & /deep/ .ant-select-selection--single {
        height: 32px;
        font-size: 14px;
        line-height: 32px;
        margin-left: 0;
    }
    & /deep/.label-item .addon-after {
        height: 32px;
        font-size: 14px;
        line-height: 32px;
    }
    & /deep/ input {
        text-align: left;
    }
    /deep/ .label-item textarea.ant-input{
        padding:0;
    }
    /deep/ .ant-input{
        padding: 0;
    }
    .foot {
        height: 80px;
        padding: 20px;
        .btn {
            margin-left: 20px;
            width: 120px;
            height: 40px; // background:rgba(10,135,248,1);
            border-radius: 5px;
            float: right;
        }
    }
    .communityList {
        padding: 6px 12px;
        cursor: pointer;
    }
    .communityList:hover {
        background: rgba(10, 135, 248, .1);
    }
    & /deep/ .ant-select-dropdown-content {
        overflow: auto;
        max-height: 300px;
    }
    /deep/ .ant-calendar-range-picker-separator{
        position: absolute;
        left: 100px;
    }
    .textAreaStyle{
        /deep/ .ant-input{
            line-height: 21px !important;
        }
    }
    /deep/ .ant-cascader-input{
        padding-left: 26px;
    }
    /deep/ .ant-cascader-picker-label{
        padding-left: 26px;
    }
}
</style>
