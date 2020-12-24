<template>
    <div class="cancelRent-info clearfix">
        <!-- 退租信息 -->
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>合同信息</b>
            </div>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">房源地址：</span>
                    <span class="labelValue">
                        <span v-if="newCancelRentInfo.houseAlias">{{newCancelRentInfo.houseAlias}}/</span>{{newCancelRentInfo.fullAddress}}</span>

                </a-col>
            </a-row>
            <a-row class="row">
                <a-col :span="12">
                    <span class="littleLabel">合同周期：</span>
                    <span class="labelValue">{{$moment(newCancelRentInfo.beginTime).format('YYYY.MM.DD')}}~{{$moment(newCancelRentInfo.endTime).format('YYYY.MM.DD')}}</span>
                </a-col>
                <a-col :span="12">
                    <span class="littleLabel3">承租人：</span>
                    <span class="labelValue">{{newCancelRentInfo.name}}-{{newCancelRentInfo.gender == 1 ?'男':'女'}}-{{newCancelRentInfo.phone}}</span>
                </a-col>
            </a-row>
            <a-row class="row" style="padding-bottom:15px;">
                <a-col :span="12">
                    <span class="littleLabel2">租金:</span>
                    <span class="labelValue">
                        <span>{{newCancelRentInfo.price/100}}</span> 元/月</span>
                </a-col>
                <a-col :span="12">
                    <span class="littleLabel2">押金：</span>
                    <span class="labelValue">
                        <span>{{newCancelRentInfo.deposit/100}}</span> 元</span>
                </a-col>
            </a-row>
        </div>
        <label-item title="退租信息" border style="margin:0 20px 24px 20px">
            <div class="contract-model f-clearfix" style="margin-bottom:24px">
                <div class="f-fl" :class="{active: parData.terminateType == 1}" @click="terminateType1" style="margin-right: 20px;">
                    <div>
                        <div class="type-boder" style="border:none;">
                            <span class="contractType">正常退租</span>
                            <span class="font-12">（租期已满，正常解约）</span>
                        </div>
                    </div>
                    <img src="../../../assets/login/selected.png" class="choose" />
                </div>
                <div class="f-fl f-clearfix" :class="{active: parData.terminateType == 2}" @click="terminateType2">
                    <div>
                        <div class="type-boder">
                            <!-- <icon-font style="font-size:16px;" type="iconyumengtubiao_dianzihetong" /> -->
                            <span class="contractType">非正常退租</span>
                            <span class="font-12">（租期未满，中途退房）</span>
                        </div>
                        <div class="f-clearfix">
                            <div class="f-fl htmb">解约原因：
                                <span style="color:red;">*</span>
                            </div>
                            <div class="f-fl board-box">
                                <a-select v-model="parData.quiteReason" placeholder="请选择" style="min-width: 100px">
                                    <a-select-option v-for="(item) in cancelOptions" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                                </a-select>
                            </div>
                        </div>
                    </div>

                    <img src="../../../assets/login/selected.png" class="choose" />
                </div>

            </div>
            <label-item class="clearfix quiteDateStyle" title="解约日期" :mustFill="true">
                <div class="u-bottom-border f-fl">
                    <a-date-picker v-model="parData.quiteDate" :format="dateFormat" @change="changeBreakDate"/>
                </div>
              <div class="editDeliveryStyle commmonDeliveryStyle f-fl cursor" v-if="propertyDeliveryHaveData&&propertyDeliveryAddForm" @click="addDeliveryDialog = true">
                已设置退房交割单 <icon-font style="font-size:16px;color:#0A87F8;" type="iconyumengtubiao_bianji-1" />
              </div>
              <div class="addDeliveryStyle commmonDeliveryStyle f-fl cursor" v-else @click="addDeliveryDialog = true">
                <icon-font style="font-size:16px;color:#0A87F8;" type="iconyumengtubiao_tianjiazijian" /> 添加退房交割单
              </div>
            </label-item>
        </label-item>
        <label-item title="退租费用明细" style="margin:0 20px">
            <div class="together-item">
                <div class="together-detail">
                    <div class="together-title">
                        <div style="max-width: 222px">收支类型</div>
                        <div style="max-width: 222px">费用类型</div>
                        <div style="max-width: 135px">金额(元)</div>
                        <div style="max-width: 446px">费用周期</div>
                        <div style="max-width: 62px;text-align: center;">操作</div>
                    </div>
                    <div class="together-data u-no-border" v-for="(item,index) in finances" :key="index">
                        <div style="max-width: 222px;text-align: left;" class="radio-box">
                            <a-radio-group v-model="item.feeDirection" buttonStyle="solid" size="small">
                                <a-radio-button :value="1">收</a-radio-button>
                                <a-radio-button :value="2">支</a-radio-button>
                            </a-radio-group>
                        </div>
                        <div style="max-width: 222px" :class="item.disabled?'itemDisabledStyle':''">
                            <a-cascader class="myCascader" v-model="item.feeSubjectIdList" :disabled="item.disabled"  placeholder="请选择" :options="costTabsContent" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index)"></a-cascader>
                        </div>
                        <div style="max-width: 135px">
                            <a-input style="width:120px;height: 38px;" v-model="item.amount" @keyup.native="mixin_moneyFilter('finances.'+index+'.amount',99999999.99)"></a-input>
                        </div>
                        <div style="max-width: 446px" class="date-box u-no-border">
                            <a-range-picker style="width: 100%;" v-model="item.timeDateList" :format="dateFormat" @change="(date)=>changeDate(date, item)" :allowClear="false" />
                        </div>
                        <div class="options f-clearfix" style="max-width: 62px;text-align: center;">
                            <icon-font @click="reduceFellow(index)" class="fl delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                        </div>
                    </div>
                    <div class="together-foot">
                        <p class="f-fl" style="margin-left:20px">费用合计：<span style="color:rgb(255, 163, 0);font-size:16px;font-weight: 500;">{{totalMoney}}元</span></p>
                        <p @click="addFellow" class="togetherAdd cursor f-fr" style="color:#0A87F8">
                            <icon-font style="font-size:16px;color:#0A87F8;vertical-align: middle" type="iconyumengtubiao_tianjiazijian" /> <span style="vertical-align: middle">添加费用</span></p>
                    </div>
                </div>
            </div>
        </label-item>
        <label-item class="u-bottom-border" style="margin:0 20px 20px 20px" title="退租备注" :maxSize="500" :valLength="parData.quiteComment.length">
            <a-textarea v-model="parData.quiteComment" maxlength="500" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
        </label-item>
        <label-item class="u-bottom-border" style="margin:0 20px 0px 20px" title="退租凭证">
          <own-upload :picList="picLists" :uploadParms="sendData2_1" :showTips="false" ref="img2_1">
            <div style="padding-top: 16px;">
              <a-icon type="plus" />
              <div style="color: #777777;font-size: 12px;">添加凭证</div>
            </div>
          </own-upload>
        </label-item>
      <label-item title="退租租客收款账号" border style="margin:0 20px 24px 20px">
        <label-item title="退款账号">
          <div class="u-bottom-border address">
            <a-select v-model="parData.paymentType" style="min-width: 80px">
              <a-select-option v-for="(item) in paymentTypeList" :key="item.id" :value="item.id">{{item.value}}</a-select-option>
            </a-select>
            <a-input style="width: 200px" v-model="parData.paymentNo" :maxlength="19" placeholder="请输入账号" @blur="getBankName"/>
            <div class="dividerClass" v-if="parData.paymentType == 1"></div>
            <a-input style="width: 90px" v-if="parData.paymentType == 1" v-model="parData.bank" :maxlength="10" placeholder="所属银行" />
          </div>
        </label-item>
      </label-item>
      <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save" :loading="saveLoading">
                确定退租
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="closeThis">
                取消
            </a-button>
        </div>
      <!-- 退租物业交割 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="addDeliveryDialog" class="ownModalBorder titDialog" title="退房交割单">
        <add-delivery :deliveryConfig="deliveryConfig" :deliveryHouseType="deliveryHouseType" :propertyDeliveryAddForm="propertyDeliveryAddForm" @cancelAdd="cancelAddDeliveryInfo" @addDeliveryInfo="addDeliveryInfo" ></add-delivery>
      </a-modal>
    </div>
</template>

<script>
import AddDelivery from './addDelivery';
import {
  listEnableDict, breakList, dictionaryListDict, breakRent, viewContractDelivery,breakView,
} from '@/api/contract.js';
import {getBankName} from "@/api/public";
export default {
    components: {
      AddDelivery,
    },
    props: {
        renterContractViewDTO: {
            type: Object,
            required: true
        },
        unNormalCancelRentFlag:{
            type:Boolean,
            default:false,   //是否来自租客业主的审核中非正常退
        },
      fromAduit:{
        type:Boolean,
        default:false,   //true来自审批的重新提交
      },
    },
    computed: {
        totalMoney() {
            let total = 0;
            for (let item of this.finances) {
                if (item.feeDirection === 1) {
                total += item.amount * 1;
                } else {
                total -= item.amount * 1;
                }
            }
            return total.toFixed(2);
        }
    },
    data() {
        return {
            dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            nowTime: new Date().getTime(),
            parData: {
                terminateType: 1,   //退租类型【1-正常退，2-非正常退】
                quiteDate: null,    //解约日期
                quiteReason:undefined,    //解约原因
                quiteComment: '',  //解约备注
              paymentType:1,
              paymentNo:'',
              bank:'',
            },
            elcostcascaderValue: {
                value: 'id',
                label: 'name',
                children: 'metaList'
            },
            cancelOptions: [],
            finances: [],
            costTabsContent: [], // 费用类型
            saveLoading:false,
          propertyDeliveryAddForm:undefined,
          propertyDeliveryHaveData:false,
          deliveryHouseType: 3,           //默认整租/独栋
          addDeliveryDialog:false,       //添加物业交割
          deliveryConfig:undefined,
          sendData2_1 : { //
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 3, // 图片大类标识 租客
            subBizType: 4, // 图片子类标识 身份证正面
            orderIndex: 1 // 排序值
          },
          picLists:[],
          paymentTypeList:[
            {
              value: '银联',
              id: 1,
              disabled: false
            },
            {
              value: '支付宝',
              id: 2,
              disabled: false
            },
            {
              value: '微信',
              id: 3,
              disabled: false
            },
          ],
          newCancelRentInfo:{},
        };
    },
    created() {
      //获取退租原因
        this.getDict();
      //获取退租信息
        this.breakView();
      //获取物业交割
        this.getPropertyDeliveryAddForm();
    },
    methods: {
      breakView(){
        breakView(this.renterContractViewDTO.id).then(res=>{
          if(res.data){
            this.newCancelRentInfo = res.data;
            if(this.fromAduit){
              this.parData.terminateType = this.newCancelRentInfo.terminateType;
            }
            else{
              if(!this.unNormalCancelRentFlag){
                this.parData.terminateType = 1;
              }
            }
            this.$set(this.parData, 'quiteReason', this.newCancelRentInfo.quiteReason);
            this.$set(this.parData, 'quiteComment', this.newCancelRentInfo.quiteComment);
            if(this.parData.quiteDate){
              this.parData.quiteDate = this.newCancelRentInfo.quiteDate;
            }
            if(this.fromAduit) {
              this.parData.paymentType = this.newCancelRentInfo.paymentType;
            }
            else{
              this.parData.paymentType = 1;
            }
            this.parData.paymentNo = this.newCancelRentInfo.paymentNo;
            this.parData.bank = this.newCancelRentInfo.bank;
            if(this.newCancelRentInfo.breakFileDTOList&&this.newCancelRentInfo.breakFileDTOList.length>0){
              this.picLists = this.newCancelRentInfo.breakFileDTOList;
            }
          }
          else{
            this.newCancelRentInfo = this.renterContractViewDTO;
          }
          this.parData.quiteDate = this.$moment(this.newCancelRentInfo.endTime);
          this.getCost();
        });
      },
      //获取银行卡所属银行
      getBankName(){
        if(this.parData.paymentType==1&&this.parData.paymentNo){
          getBankName(this.parData.paymentNo).then(res => {
            if (res.data ) {
              this.parData.bank = res.data;
            }
          })
        }
      },
      getPropertyDeliveryAddForm(){
        viewContractDelivery(this.renterContractViewDTO.id).then(res => {
          if (res.code === '200') {
            if(res.data&&res.data.propertyDeliverySignForm&&!this.fromAduit){
              this.propertyDeliveryAddForm = res.data.propertyDeliverySignForm;
            }
            else if(res.data&&res.data.propertyDeliveryBreakForm&&this.fromAduit){
              this.propertyDeliveryAddForm = res.data.propertyDeliveryBreakForm
            }
            else{
              this.propertyDeliveryAddForm = undefined;
            }
            if(this.propertyDeliveryAddForm){
              if(this.propertyDeliveryAddForm.comment){
                this.propertyDeliveryHaveData = true;
              }
              if(this.propertyDeliveryAddForm.fileDTOList&&this.propertyDeliveryAddForm.fileDTOList.length>0){
                this.propertyDeliveryHaveData = true;
              }
              if(this.propertyDeliveryAddForm.pubDeliveryNoteList){
                this.propertyDeliveryAddForm.pubDeliveryNoteList.forEach((item)=>{
                  if(item.value > 0) {
                    this.propertyDeliveryHaveData = true;
                  }
                });
              }
              if(this.propertyDeliveryAddForm.roomDeliveryNoteList){
                this.propertyDeliveryAddForm.roomDeliveryNoteList.forEach((item)=>{
                  if(item.value > 0) {
                    this.propertyDeliveryHaveData = true;
                  }
                });
              }
              if(this.propertyDeliveryAddForm.pubHydropwerList){
                this.propertyDeliveryAddForm.pubHydropwerList.forEach((item)=>{
                  if(item.value > 0) {
                    this.propertyDeliveryHaveData = true;
                  }
                });
              }
              if(this.propertyDeliveryAddForm.roomHydropwerList){
                this.propertyDeliveryAddForm.roomHydropwerList.forEach((item)=>{
                  if(item.value > 0) {
                    this.propertyDeliveryHaveData = true;
                  }
                });
              }
            }
          }
        });
      },
      cancelAddDeliveryInfo(){
        this.addDeliveryDialog = false;
      },
      addDeliveryInfo(propertyDeliveryAddForm){
        this.addDeliveryDialog = false;
        this.propertyDeliveryAddForm = propertyDeliveryAddForm;
      },
        changeDate(date,item) {
            item.beginDate = date[0];
            item.endDate = date[1];
        },
        terminateType1(){
          this.parData.terminateType = 1;
          if(!this.fromAduit){
            this.getBreakList();
          }
        },
        changeBreakDate(){
            if(this.parData.terminateType == 2){
              if(!this.fromAduit){
                this.getBreakList();
              }
            }
        },
        getBreakList() {
            let data = {
                terminateType: this.parData.terminateType,
                id: this.renterContractViewDTO.id,
                quiteDate: this.parData.quiteDate
            }
            breakList(data).then(res => {
                this.pushFinance(res);
            });
        },
        terminateType2(){
            this.parData.terminateType = 2;
            this.parData.quiteDate = this.$moment(new Date().getTime());
            if(!this.fromAduit){
              this.getBreakList();
            }
        },
        pushFinance(res) {
            this.finances = [];

            res.data.forEach(item => {
                let arry = []


                this.costTabsContent.forEach((v1,i1) => {
                    // console.log(i1,value)
                    v1.metaList.forEach((v2,i2) => {
                        if(item.feeSubjectId == v2.id){
                           arry.push(v1.id)
                           arry.push(v2.id)
                        }
                    })
                })
              let timeDateList = [];
              if(item.beginDate){
                timeDateList[0] = this.$moment(item.beginDate);
              }
              else{
                timeDateList[0] = undefined;
              }
              if(item.endDate){
                timeDateList[1] = this.$moment(item.endDate);
              }
              else{
                timeDateList[1] = undefined;
              }
                this.finances.push({
                    amount: item.amount / 100, // 收支金额
                    beginDate: item.beginDate?this.$moment(item.beginDate):undefined,
                    endDate: item.endDate?this.$moment(item.endDate):undefined,
                    feeDirection: item.feeDirection, // 费用方向【1收入2支出】
                    feeSubjectIdList: arry, // 费用科目id【字典】
                    feeSubjectId:item.feeSubjectId, // 费用科目id【字典】
                    feeSubjectName: item.feeSubjectName, // 费用科目名称
                    disabled: true,
                    comment: item.comment, // 描述
                    timeDateList:timeDateList,
                });
            });
        },

        // 获取费用类型
        getCost() {
            const params = 'FEESUBJECT';
            dictionaryListDict(params).then(res => {
                // console.log(res)
                if (res.code === "200") {
                    const checkRes = res.data;
                    this.costTabsContent = checkRes;
                    if(this.unNormalCancelRentFlag){
                        this.terminateType2();
                    }
                    else{
                        this.getBreakList();
                    }
                }
            })
        },
        getDict() {
            // 解约原因
            listEnableDict('33620257e39d48139c3533383194caa1').then(res => {
                this.cancelOptions = res.data;
                // console.log(res, 'res');
                if(this.unNormalCancelRentFlag){
                    this.cancelOptions.forEach((item)=>{
                        if(item.name == '其他'){
                            this.parData.quiteReason = item.id;
                        }
                    });
                }
            });
        },

        save() {
            if(this.parData.terminateType == 2 && !this.parData.quiteReason){
                this.$message.warning('请选择解约原因！');
                return;
            }
            if (!this.parData.quiteDate) {
                this.$message.warning('请输入解约时间！');
                return;
            }
            let postData = Object.assign({}, this.parData);
            let finances = JSON.parse(JSON.stringify(this.finances));
            for (let item of finances) {
                // item.
                item.amount =  Math.round(item.amount * 100);
            }
            postData.id = this.renterContractViewDTO.id;
            postData.billDetails = finances;
          //退租凭证
          if (this.$refs.img2_1&&this.$refs.img2_1.picsList.length != 0) {
            let fileIds = [];
            this.$refs.img2_1.picsList.forEach((item)=>{
              fileIds.push(item.id);
            });
            postData.fileIds = fileIds;
          }
          //物业交割
          if(this.propertyDeliveryAddForm){
            let fileIds = [];
            this.propertyDeliveryAddForm.fileDTOList&&this.propertyDeliveryAddForm.fileDTOList.forEach((item)=>{
              fileIds.push(item.id);
            });
            let propertyDeliveryAddForm ={
              comment:this.propertyDeliveryAddForm.comment,
              fileIds:fileIds,
              pubDeliveryNoteList:this.propertyDeliveryAddForm.pubDeliveryNoteList,
              pubHydropwerList:this.propertyDeliveryAddForm.pubHydropwerList,
              roomDeliveryNoteList:this.propertyDeliveryAddForm.roomDeliveryNoteList,
              roomHydropwerList:this.propertyDeliveryAddForm.roomHydropwerList,
              sceneType:1,
            };
            postData.propertyDeliveryAddForm = propertyDeliveryAddForm;
          }
          if(this.fromAduit){
            postData.contratBreakId = this.renterContractViewDTO.contratBreakId;
          }
            this.saveLoading = true;
            breakRent(postData).then(res => {
              if(!res){
                this.saveLoading = false;
              }
                // console.log(res)
                if (res.code === "200") {
                  this.saveLoading = false;
                    this.$message.success('操作成功！');
                    this.$emit('saveSuccess', true);
                    // this.info = res.data;
                }
                else{
                    this.saveLoading = false;
                }
            })
        },
        closeThis() {
            this.$emit('closeThis', true);
        },
        addFellow() {
            this.finances.push({
                amount: 0, // 收支金额
                beginDate: null,
                costType: 0, // 费用类型
                endDate: null,
                feeDirection: 1, // 费用方向【1收入2支出】
                feeSubjectIdList: [], // 费用科目id【字典】
                feeSubjectId: '', // 费用科目id【字典】
                feeSubjectName: '' // 费用科目名称
            });
        },
        reduceFellow(index) {
            this.finances.splice(index, 1);
        },
        // 费用类型方法
        costSelect(value, index) {
            if (value[1]) {
                this.finances[index].feeSubjectId = value[1];
            } else {
                this.finances[index].feeSubjectId = value[0];
            }
            this.finances[index].feeSubjectIdList = value;
        },
    },
    watch: {
    }
};
</script>

<style lang="less" scoped>
// @import url("../../../assets/css/color.less");
.cancelRent-info {
    // height: 100%;
    max-height: calc(100vh - 160px);
    overflow: auto;
    width: 100%;
    font-size: 14px; // padding: 1px 20px 0 20px;
    position: relative;
    .cont {
        // height: calc(100% - 70px);
        // overflow-y: auto;
        margin-top: 10px;
        width: 100%;
        padding: 15px 20px 0 20px;
        background: rgba(245, 247, 254, 1);
        .row {
            margin-top: 15px;
        }
    }
    .contract-model {
        // margin:0 20px;
        // margin-left: -30px;
        &>div {
            position: relative;

            padding: 10px 16px; // width: calc(50% - 30px);
            // height: 110px;
            width: 368px;
            height: 80px;
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
                top: 20px;
                right: -2px;
                transform: translateY(-50%);
                color: @themeColor;
                font-size: 36px;
                height: 40px;
                width: 40px;
            }
        }
        .active {
            background-color: @themeBgColor;
            border: 1px solid @themeColor;
            .choose {
                display: block;
            }
            .anticon {
                color: #0A87F8;
            }
            & /deep/.ant-select-selection {
                background-color: @themeBgColor;
            }
        }
        .type-boder {
            border-bottom: 1px solid #DDDDDD;
            padding: 0 0 7px 0;
        }
        .contractType {
            // margin-left: 10px;
            font-weight: 500;
            font-size: 16px;
            color: rgba(17, 17, 17, 1);
            .font-12 {
                color: #777777;
                font-size: 12px;
            }
        }
        .htmb {
            height: 32px;
            line-height: 30px;
        }
        .board-box {
            margin-left: 12px;
            background: none;
            & /deep/.ant-select-selection {
                border: none;
                background: none;
            }
        }
    }
  .quiteDateStyle{
    .commmonDeliveryStyle{
      height: 32px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #0a87f8;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0a87f8;
      line-height: 32px;
      text-align: center;
      margin-left: 20px;
      i{
        vertical-align: -0.2em;
      }
    }
    .editDeliveryStyle{
      width: 163px;
    }
    .addDeliveryStyle{
      width: 140px;
    }
  }
  .address {
    display: flex; // width: calc(50% - 15px);
    width: 100%;
    .dividerClass{
      height: 15px;
      width: 1px;
      position: absolute;
      border: 0.5px solid #BBBBBB;
      left: 270px;
      bottom: 8px;
    }
  }
    .ipt-box {
        padding: 0 20px 0 20px;
        .addresswu {
            width: calc(50% - 15px);
            display: flex;
            & /deep/.ant-input {
                color: #FFA036;
            } // .must-fill-border {
            //     & /deep/ .ant-select-selection {
            //         border-bottom: 1px solid red;
            //     }
            // }
        }
        .titlepz {
            margin-top: 26px;
            margin-bottom: 10px;
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
    .littleLabel {
        width: 80px; // color: #666666;
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    } // 详情类右侧字段值
    .littleLabel3 {
        width: 65px; // color: #666666;
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    .littleLabel2 {
        width: 50px; // color: #666666;
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    .labelValue {
        color: #000;
    }
    .together-item {
        margin-top: 10px;
        margin-bottom: 20px;
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
                    padding: 0px 9px;
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
                    text-align: left;
                    padding: 0px 9px;
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
                    // text-align: center;
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
              .itemDisabledStyle{
                /deep/ i{
                  display: none;
                }
              }
            }
            .together-foot {
                height: 40px;
                line-height: 40px;
                border-right: 1px solid @borderColor;
                border-bottom: 1px solid @borderColor;
                .togetherAdd {
                    width: 100px;
                    margin: 0 auto;
                    text-align: center;
                }
            }
        }
    }
    .radio-box{
        & /deep/.ant-radio-button-wrapper{
            padding: 0 14px;
            &:nth-child(1) {
                border-radius: 20px 0 0 20px;
            }
            &:nth-child(2) {
                border-radius: 0 20px 20px 0;
            }
        }
        & /deep/.ant-radio-button-wrapper-checked{
            border-radius: 50%;
        }
    }
    .date-box{
        & /deep/.ant-calendar-picker{
            width:46%;
            .ant-calendar-picker-icon {
                    display: none;
                }
            .ant-calendar-picker-clear{
display: none;
            }
        }

    }
    /deep/ .label-item .title .ft-bolder{
        height: 44px;
        line-height: 44px;
    }
    /deep/ .ant-calendar-range-picker-separator{
        vertical-align:baseline !important;
    }
}






.enclosurefujian {
    overflow: hidden;
    margin-bottom: 10px;
}

.enclosure {
    float: left;
    .fileEnclosureWrap {
        float: left;
        margin-right: 10px;
        text-align: center;
        .enclosureImg {
            display: inline-block;
            width: 60px;
            height: 60px;
        }
        .enclosurep {
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
        }
    }
}
</style>
