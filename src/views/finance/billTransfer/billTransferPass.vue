<template>
    <div class="billProcess-info">
        <!-- 处理账单 -->
        <div class="child-detail" :class="operateTypeReg==1?'height1':'height2'">
            <div class="house-address">
                <span>房源地址：</span>
                <span v-if="info.houseAlias">{{info.houseAlias}} /</span> {{info.fullAddress}}
            </div>
            <div class="child-detail_transfer">
                <div style="height: 15px"></div>
                <div class="child-detail_title">
                    转账信息
                </div>
                <div style="height: 10px"></div>
                <div class="child-detail_transfer_item clearfix">
                    <div class="item f-fl" :style="operateTypeReg==2?'width:220px;':''">
                        <span class="item_title">转账人信息：</span>
                        <span class="item_content">{{billTransferInfo.payerName}}{{billTransferInfo.payerName&&billTransferInfo.payerPhone?'-':''}}{{billTransferInfo.payerPhone}}{{!billTransferInfo.payerName&&!billTransferInfo.payerPhone?'-':''}}</span>
                    </div>
                    <div class="item f-fl" :style="operateTypeReg==2?'width:320px;':''">
                        <span class="item_title">所属账单：</span>
                        <span class="item_content">{{billTransferInfo.billName}}</span>
                        <span class="item_view_bill cursor" @click="openBill">查看所属账单</span>
                    </div>
                    <div class="item f-fl" :style="operateTypeReg==2?'width:200px;':''">
                        <span class="item_title">转账金额：</span>
                        <span class="item_content_money">{{billTransferInfo.occurredMoney?billTransferInfo.occurredMoney/100+'元':'-'}}</span>
                    </div>
                    <div class="item f-fl" :style="operateTypeReg==2?'width:220px;':''">
                        <span class="item_title">收款账号：</span>
                        <span class="item_content">{{billTransferInfo.paymentAccountTypeName}}{{billTransferInfo.paymentAccountTypeName&&billTransferInfo.collectionAccount?'-':''}}{{billTransferInfo.collectionAccount}}{{!billTransferInfo.paymentAccountTypeName&&!billTransferInfo.collectionAccount?'-':''}}</span>
                    </div>
                    <div class="item f-fl" :style="operateTypeReg==2?'width:320px;':''">
                        <span class="item_title">转账账号：</span>
                        <span class="item_content">{{billTransferInfo.paymentAccount}}</span>
                    </div>
                    <div class="item f-fl" :style="operateTypeReg==2?'width:200px;':''">
                        <span class="item_title">提交时间：</span>
                        <span class="item_content">{{$moment(billTransferInfo.createTime).format('YYYY.MM.DD HH:mm')}}</span>
                    </div>
                    <div style="width: 100%" class="clearfix">
                        <div class="item_title f-fl">转账凭证：</div>
                        <div class="showImg f-clearfix" v-if="this.billTransferInfo.picList&&billTransferInfo.picList.length>0">
                            <div class="f-fl" v-for="(item,i) in billTransferInfo.picList" :key="i">
                                <div @click="handlePreview(item.origin)"><img :src="item.small" alt=""></div>
                            </div>
                        </div>
                        <div class="showImg f-clearfix" style="width: calc(100% - 60px)"  v-if="this.billTransferInfo.picList&&billTransferInfo.picList.length==0">
                            -
                        </div>
                    </div>
                </div>
            </div>
            <div class="child-detail_title" v-if="operateTypeReg==1">
                费用明细
            </div>
            <div class="bill-top" v-if="operateTypeReg==1">
                <span class="span-p" style="padding-right: 20px;">已{{alreadyMoney>0?'收':alreadyMoney<0?'付':'收(付)'}}：<span >{{alreadyMoney?Math.abs(alreadyMoney.toFixed(2)):0.00}}</span>元</span>
                <span class="border-p span-p" style="padding-left: 20px;padding-right: 20px;">待{{WaitMoney>0?'收':WaitMoney<0?'付':'收(付)'}}：<span style="color:#FFA036">{{WaitMoney?Math.abs(WaitMoney.toFixed(2)):0.00}}</span>元</span>
                <span class="span-p" style="padding-left: 20px;">预计收(付)日期：{{$moment(info.predictTime).format('YYYY.MM.DD')}}</span>
                <div class="f-fr cursor" @click="openWater" v-if="occurredMoneyFul" style="color:#0A87F8"><icon-font type="iconyumengtubiao_yanjing-1" style="font-size:16px;"/>查看历史收(付)记录</div>
            </div>
            <div class="content-row" v-if="operateTypeReg==1">
                <div class="together-item">
                    <div class="together-detail">
                        <div class="together-title" >
                            <div style="max-width: 120px">费用科目</div>
                            <div style="max-width: 150px">应收（付）</div>
                            <div style="max-width: 150px">已收（付）</div>
                            <div style="max-width: 150px">待收(付)</div>
                            <div style="max-width: 160px">本次实收(付)</div>
                             <div style="max-width: 230px;">余额处理</div>
                        </div>
                        <div class="together-data u-no-border" v-for="(item,index) in BillExpenses" :key="index">
                            <div style="max-width: 120px" class="itemBg">
                                <span class="together-span">{{item.feeSubjectName}}</span>
                            </div>
                            <div style="max-width: 150px" class="itemBg">
                                <span class="together-span">
                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1"> + </span>
                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2"> - </span> {{item.originalMoney}} 元</span>

                            </div>
                            <div style="max-width: 150px;text-align: left;padding-left: 10px;" class="itemBg">
                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.occurredMoney!=0"> + </span>
                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.occurredMoney!=0"> - </span> 
                                <span >{{item.occurredMoney}} 元{{item.exemptMoney&&item.exemptMoney>0?'(免收'+item.exemptMoney/100+'元)':''}}</span>

                            </div>
                            <div style="max-width: 150px;text-align: left;padding-left: 10px;" class="itemBg">
                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.notOccurredMoney!=0"> + </span>
                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.notOccurredMoney!=0"> - </span> 
                                <span >{{item.notOccurredMoney}} 元</span>

                            </div>

                            <div style="max-width: 160px" :style="item.notOccurredMoney==0?'background: #F6F7F8 !important;':''">
                                <span style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.money!=0"> + </span>
                                <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.money!=0"> - </span> 
                                <a-input style="width:116px;padding: 0 4px;" v-model="item.money" :disabled="item.notOccurredMoney==0" @input.native="inputChange($event,item)" v-validate="'moneyZero|max(' + item.notOccurredMoney + ')'" ></a-input>
                                <span>元</span>

                                <!-- <span class="together-span">{{item.originalMoney}} 元</span> -->
                                <!-- <div class="u-bottom-border togeAddress">
                                                    <a-input :maxlength="11" v-model="item.notOccurredMoney" placeholder="请输入" />
                                                </div> -->

                            </div>
                            <div class="f-clearfix itemBg" style="max-width: 230px">

                                <div class="f-fl" style="text-align: left;padding: 0 0 0 9px;" v-if="item.notOccurredMoney!=0">余
                                    <span  style="color:#0A87F8;font-size:16px;" v-if="item.feeDirection == 1&&item.notOccurredMoney-item.money !=0"> + </span>
                                    <span  style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.notOccurredMoney-item.money !=0"> - </span> 
                                    {{(item.notOccurredMoney-item.money).toFixed(2)}}元</div>
                                <!-- <div class="u-no-border f-fl" v-if="item.notOccurredMoney!=0&&item.feeDirection=='1'&&item.surplus!=0" style="width: 106px"> -->
                                <div class="u-no-border f-fr" v-if="(item.notOccurredMoney-item.money)>0" style="margin-right: 9px;">
                                    <a-select v-model="item.solution" style="min-width: 100px" @change="solytionChange">
                                        <a-select-option :value="1">继续提醒</a-select-option>
                                        <a-select-option :value="2">免收</a-select-option>
                                    </a-select>
                                </div>
                                <div class="f-fl" style="text-align: left;padding: 0 9px;">
                                    <span v-if="item.notOccurredMoney == 0">暂无余额</span>
                                </div>
                            </div>
                        </div>
                        <div class="together-foot">
                            <p class="f-fl" style="margin-left:12px">本次实{{totalMoney>=0?'收':'付'}}总额：
                                <span style="color:#0A87F8;" v-if="totalMoney>=0">+{{totalMoney.toFixed(2)}}元 </span>
                                <span style="color:#FB4246;" v-else>{{totalMoney.toFixed(2)}}元  </span>
                                <span v-if="remaining!=0">,</span>
                                <span style="color:#FFA036;" v-if="remaining!=0"> 
                                        剩余待{{  remaining>=0 ? '收':'付'}} {{remaining.toFixed(2)}}元</span>
                            </p>

                                <div class="u-no-border f-fr" v-if="remindDateFul">
                                    剩余款项提醒<span style="color:#FB4246;margin-left:6px;margin-right:6px;font-size: 14px;">*</span>
                                     <a-date-picker v-model="contractForm.remindDate" format="YYYY-MM-DD"/>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="cont" v-if="operateTypeReg==1">
                <label-item leftLine title="账单备注" class="u-bottom-border" :maxSize="500" style="margin-top: 24px;" :valLength="contractForm.comment.length" >
                    <a-textarea v-model="contractForm.comment" maxlength="500" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
                </label-item>
                <label-item leftLine title="收(付)款详情" style="margin-top: 25px;">
                    <a-row :gutter="30" style="margin-top: 4px;">
                        <a-col :span="4">
                            <label-item title="实际收(付)款日期" class="u-bottom-border" :mustFill="true">
                                <a-date-picker placeholder="选择日期" :disabled-date="disabledEndDate" v-model="contractForm.practicalTime" format="YYYY-MM-DD" />
                            </label-item>
                        </a-col>
                        <a-col :span="4">
                            <label-item title="支付途径" class="u-bottom-border" :mustFill="true">
                                <a-select v-model="contractForm.paymentMethod" style="width:100%" placeholder="请选择">
                                    <a-select-option v-for="(item,index) in costTabsContent" :disabled="item.disabled" :key="index" :value="item.id">{{item.name}}</a-select-option>
                                </a-select>
                            </label-item>
                        </a-col>
                        <a-col :span="16">
                            <label-item title="支付备注" class="u-bottom-border">
                                <a-input v-model="contractForm.paymentNote" placeholder="请输入" />
                            </label-item>
                        </a-col>
                    </a-row>
                </label-item>
                <div class="titlepz f-clearfix">
                    支付凭证
                    <span>（附件支持格式：jpg、png、jpeg）</span>
                    <!-- 上传图片 -->
                </div>
                <own-upload :uploadParms="sendData4_2" :picList="initPicList" :showTips="false" ref="imgBill4_2"></own-upload>
            </div>
            <div class="child-detail_title" style="margin-bottom: 10px;" v-if="operateTypeReg==2">
                驳回原因
            </div>
            <div style="width: 100%;" v-if="operateTypeReg==2">
                <label-item
                        class="item u-bottom-border"
                        style="margin: 0 20px 70px 20px"
                        :valLength="rejectForm.auditComment.length"
                        :maxSize="200"
                >
                    <a-textarea v-model="rejectForm.auditComment"
                                maxlength="200"
                                placeholder="请输入"
                                :autosize="{ minRows: 1, maxRows: 5 }"
                    />
                </label-item>
            </div>
            <div class="cont">
                <div style="width:100%;" class="clearfix">
                    <a-button @click="saveBill" type="warning" class="saveBtn f-fr" style="width:120px;" :loading="isloading" v-if="operateTypeReg==1">审核通过</a-button>
                    <a-button @click="saveBill" type="warning" class="saveBtn f-fr" style="width:120px;" :loading="isloading" v-if="operateTypeReg==2">审核驳回</a-button>
                    <a-button @click="cancel" type="warning" class="f-fr cancelBtn" style="width:120px;">取消</a-button>
                </div>
            </div>
        </div>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog">
            <bill-detail :billId="billId"></bill-detail>
        </a-modal>
        <!-- 流水 -->
        <a-modal destroyOnClose centered  :maskClosable="false" :footer="null" width="1000px" v-model="openWaterFul" class="ownModalBorder titDialog" title="历史收(付)记录">
            <open-water @closeThis="openWaterFul=false" :billId="billId" :houseAlias="info.houseAlias" :fullAddress="info.fullAddress"></open-water>
        </a-modal>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import { listEnableDict } from '@/api/contract'
import { getBillByBillId } from '@/api/bill';
import {billTransferView,billTransferAuditPass,billTransferAuditReject} from '@/api/billDetailWater';
import openWater from '../bill/openWater';
import billDetail from '../bill/billDetails';
export default {
    name: "billProcess",
    props: {
        billId: {
            type: String
        },
        id:{
            type: String
        },
        operateTypeReg:{
            type: Number,
            default: 1,
        },
    },
    components: {
        openWater,
        billDetail,
    },
    data() {
        return {
            info: {},
            // totalMoney: 0,
            // remaining:0,
            alreadyMoney: '',
            WaitMoney: '',
            contractForm: {
                billId: '',
                comment: '',
                detailList: [],
                paymentMethod: '',
                practicalTime: null,
                remindDate: null,
                payVoucherIdList: [],
                billDetailList:[]
            },
            costTabsContent: [],
            sendData4_2: {},
            imgList4_2: [],
            isloading:false,
            BillExpenses:[],
            openWaterFul:false,
            occurredMoneyFul:false,
            totalNum:0,
            remindDateFul:true,
            billTransferInfo:{},
            previewVisible:false,
            previewImage: '',
            rejectForm:{
                auditComment:'',
                id:'',
            },
            picId:'',
            initPicList:[],
            billDetailDialog:false,
        }
    },
    mounted() {
        this.sendData4_2 = {
            // 上传时附带的额外参数
            bizId: '', //
            bizType: 4, // 图片大类标识  收支
            subBizType: 2, // 图片子类标识 支付凭证
            indexNum: 1 // 排序值
        }
    },
    created() {
        this.billTransferView();
        this.getBill();
    },
    computed: {
        // totalMoney() {
        //     let originalMoney = 0;
        //     for (let e of this.BillExpenses) {
        //         originalMoney = e.notOccurredMoney + originalMoney;
        //     }
        //     return originalMoney;
        // },
        totalMoney() {
            let total = 0;
            for (let item of this.BillExpenses) {
                if (item.feeDirection === 1) {
                total += item.money * 1;
                } else {
                total -= item.money * 1;
                }
            }
            return total;
        },
        remaining() {
            let num = 0;
            for (let e of this.BillExpenses) {
                if (e.solution != '2') {
                    // 非免收的都要计算
                    if (e.feeDirection === 1) {
                    num += (e.notOccurredMoney - e.money) *1;
                    } else {
                    num -= (e.notOccurredMoney - e.money)*1;
                    }
                    // num = e.notOccurredMoney - e.money + num;
                }
            }
            this.totalNum = num;
            return num;
        },
    },
    methods: {
      disabledEndDate(endValue){
        let tomorrowDay = Vue.prototype.$moment().startOf('day').add(1,'day').valueOf();
        if(endValue>tomorrowDay){
          return true;
        }
        return false;
      },
        openBill(){
            this.billDetailDialog = true;
        },
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(url) {
            this.previewImage = url;
            this.previewVisible = true;
        },
        getCost() {
            listEnableDict('7bf14df972f64b94b7da8d3ff88ead18').then(res => {
                this.costTabsContent = res.data;
                this.costTabsContent.forEach((data) => {
                    if(data.name === '平台钱包'){
                      data.disabled = true;
                    }
                    if (data.name === '支付宝'&&this.billTransferInfo.paymentAccountTypeName=='支付宝') {
                        this.contractForm.paymentMethod = data.id;
                    }
                    if (data.name === '微信'&&this.billTransferInfo.paymentAccountTypeName=='微信') {
                        this.contractForm.paymentMethod = data.id;
                    }
                    if (data.name === '转账'&&this.billTransferInfo.paymentAccountTypeName=='银行卡') {
                        this.contractForm.paymentMethod = data.id;
                    }
                });
            });
        },
        billTransferView(){
            billTransferView(this.id).then(res => {
                // console.log(res)
                if (res.code === '200') {
                    this.billTransferInfo = res.data;
                    if(this.operateTypeReg == 1){
                        this.getCost();
                        let date = new Date();
                        this.contractForm.practicalTime = this.$moment(date.getTime())
                    }
                    if(this.billTransferInfo.picList==null){
                        this.billTransferInfo.picList = [];
                    }
                    else{
                        this.billTransferInfo.picList.forEach((item)=>{
                            this.picId = item.id;
                            item.notRealDelete = true;
                            this.initPicList.push(item);
                        })
                    }
                }
            })
        },
        getBill() {
            getBillByBillId(this.billId).then(res => {
                // console.log(res)
                if (res.code === '200') {
                    this.info = res.data;
                    let occurredMoney = 0;
                    let notOccurredMoney = 0;
                    let originalMoney = 0;
                    this.BillExpenses = this.info.detailList
                    let money = 0;
                    this.BillExpenses.forEach(function(e) {
                        if(e.occurredMoney>0){
                            this.occurredMoneyFul = true
                        }
                        e.occurredMoney = e.occurredMoney / 100;
                        e.notOccurredMoney = e.notOccurredMoney / 100;
                        e.originalMoney = e.originalMoney / 100
                        this.$set(e, 'money', 0);
                        if(e.notOccurredMoney == 0){
                            this.$set(e, 'solution', 0);
                        }
                        else{
                            this.$set(e, 'solution', 1);
                        }


                        // e.money = e.notOccurredMoney;
                        if (e.occurredMoney) {
                            if (e.feeDirection === 1) {
                               occurredMoney += e.occurredMoney * 1;
                            } else {
                               occurredMoney -= e.occurredMoney * 1;
                            }
                        }
                        this.alreadyMoney = occurredMoney;
                        if (e.notOccurredMoney) {
                           if (e.feeDirection === 1) {
                               notOccurredMoney += e.notOccurredMoney * 1;
                            } else {
                               notOccurredMoney -= e.notOccurredMoney * 1;
                            } 
                        }
                        this.WaitMoney = notOccurredMoney;
                    }, this);
                    this.contractForm.comment = this.info.comment;
                    this.contractForm.remindDate = this.$moment(this.info.predictTime);
                }
            })
        },
        cancel() {
           this.$emit('closeThis', true);
        },
        checkDate() {
            if (!this.contractForm.practicalTime) {
                this.$message.error('请选择实际收(付)款日期!');
                return false;
            }
            if (this.totalNum!=0 && !this.contractForm.remindDate) {
                this.$message.error('请选择提醒日期!');
                return false;
            }
            let allIsZero = true;
            for (let i = 0, len = this.BillExpenses.length; i < len; i++) {
                if(this.BillExpenses[i].money != 0){
                    allIsZero = false;
                }
            }
            if(allIsZero){
                this.$message.error('本次处理金额不可为‘0’，请填写本次实收/付金额');
                return false;
            }
            return true;
        },
        saveBill() {
            if(this.operateTypeReg ==1 ){
                if (this.$refs.imgBill4_2.picsList.length != 0) {
                    let imgObj4_2 = this.$refs.imgBill4_2.picsList;
                    let arrImg = [];
                    if (imgObj4_2.length > 0) {
                        imgObj4_2.forEach(function(e) {
                            arrImg.push(e.id)
                        }, this);
                    }
                    this.imgList4_2 = arrImg;
                }
                if (this.checkDate()) {
                    let arrItem = [];
                    for (let i = 0, len = this.BillExpenses.length; i < len; i++) {
                        if (this.BillExpenses[i].notOccurredMoney != 0) {
                            let obj = {
                                billDetailId: this.BillExpenses[i].id,
                                money:  Math.round(this.BillExpenses[i].money * 100),
                                solution: this.BillExpenses[i].solution
                            };

                            arrItem.push(obj);
                        }
                    }
                    let fileIds = [];
                    this.imgList4_2.forEach(function(e) {
                        fileIds.push(e);
                    }, this);
                    if (fileIds.length == 0) {
                        fileIds = '';
                    }
                    let params = {
                        billId: this.billId,
                        comment: this.contractForm.comment,
                        billDetailList: arrItem,
                        paymentMethod: this.contractForm.paymentMethod,
                        paymentNote: this.contractForm.paymentNote,
                        practicalTime: this.$moment(this.contractForm.practicalTime).format('YYYY-MM-DD'),
                        payVoucherIdList: fileIds
                    };
                    if(this.contractForm.remindDate){
                        params.remindDate = this.$moment(this.contractForm.remindDate).format('YYYY-MM-DD');
                    }
                    let last_params = {
                        billHandleForm:params,
                        id:this.id,
                        picId:this.picId,
                    };
                    this.isloading = true;
                    billTransferAuditPass(last_params).then(res => {
                        // console.log(res)
                        if (res.code === '200') {
                            this.$message.success('审核已通过');
                            this.$emit('saveSure',true);
                            this.isloading = false;
                        }
                    })
                        .catch(err => {
                            this.isloading = false;
                            console.log(err);
                        });
                    }
            }
            if(this.operateTypeReg ==2){
                if(!this.rejectForm.auditComment){
                    this.$message.error('请输入驳回原因!');
                    return false;
                }
                this.isloading = true;
                this.rejectForm.id = this.id;
                billTransferAuditReject(this.rejectForm).then(res => {
                    if (res.code === '200') {
                        this.$message.success('审核已驳回');
                        this.$emit('saveSure',true);
                        this.isloading = false;
                    }
                })
                    .catch(err => {
                        this.isloading = false;
                        console.log(err);
                    });
            }
        },
        openWater(){
          this.openWaterFul = true;
        },
        inputChange(e,val){
            if(val.notOccurredMoney-val.money == 0){
                val.solution = 0;
            }else{
               val.solution = 1;
            }
           
            this.solytionChange()
        },
        solytionChange(){
            this.remindDateFul  = false;
            this.BillExpenses.forEach((da, j) => {
                if (da.solution == 1) {
                    this.remindDateFul = true;
                    return
                }
            });
      
            if(this.remindDateFul){
                this.contractForm.remindDate = this.$moment(this.info.predictTime);
            }
        },
        setBlur(index, el) {
        // this.list[index].inputone = this.clearNoNum(this.list[index].inputone);
        // console.log(this.list[index]);
        if (
            Number(this.list[index].inputone) >
            this.list[index].notOccurredMoney / 100 ||
            Number(this.list[index].inputone) < 0
        ) {
            Message({
            message: `输入的金额不能小于0，也不能大于${this.list[index]
                .notOccurredMoney / 100}`,
            type: 'error',
            duration: 1 * 1000
            });
            delete this.list[index].inputone;
            this.$set(this.list[index], 'inputone', 0);
            delete this.list[index].surplus;
            this.$set(
            this.list[index],
            'surplus',
            this.list[index].notOccurredMoney / 100
            );
        } else {
            delete this.list[index].surplus;
            this.$set(
            this.list[index],
            'surplus',
            (this.list[index].notOccurredMoney * 1 -
                (this.list[index].inputone * 1).toFixed(2) * 10000 / 100) /
                100
            );
            this.list[index].inputShow = 1;
        }
        if (this.list[index].surplus == 0) {
            this.list[index].solution = '';
        }
        //   this.list[index].flagMoney = (this.list[index].inputone * 1).toFixed(2);
        },

    },

}
</script>

<style scoped lang="less">
.billProcess-info {

    .cont {
        margin: 0 20px;
        & /deep/ .label-item .title{
            font-size: 14px;
            color: #111;
            font-weight: 500;
        }
        .ant-col-4 ,.ant-col-16 {
            & /deep/ .label-item .title{
                font-size: 12px;
                color: @secondaryFontColor;
            }
        }
    }
    .house-address {
        width: 100%;
        height: 40px;
        background: rgba(233, 241, 255, 1);
        opacity: 0.99;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(119, 119, 119, 1);
        line-height: 40px;
        padding: 0 20px;
    }
    .bill-top {
        height: 20px;
        width: 100%;
        margin-top: 15px;
        margin-bottom: 11px;
        padding: 0 20px;
        >.span-p {
            float: left;
            height: 20px;
            // width: 130px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(17, 17, 17, 1);

        }
        .border-p {
            border-left: 1px solid #DDDDDD;
            border-right: 1px solid #DDDDDD;
        }
    }
    .height1{
        height: calc(100vh - 150px);
    }
    .height2{
        max-height: calc(100vh - 150px);
    }
    .child-detail {
        overflow: auto;
        .child-detail_title{
            margin: 0 20px;
            color: #111111;
            font-size: 18px;
            font-weight: 500;
            height: 24px;
            line-height: 24px;
        }
        .child-detail_transfer{
            margin: 10px 0 20px;
            background-color: #F5F7FE;
            .child-detail_transfer_item{
                width: 100%;
                padding: 0 20px;
                .item_title{
                    font-size: 12px;
                    color: #777777;
                }
                .item{
                    width: 33%;
                    margin-bottom: 10px;
                    .item_content{
                        font-size: 12px;
                        color: #111111;
                    }
                    .item_content_money{
                        font-size: 14px;
                        color: #111111;
                        font-weight: 500;
                    }
                    .item_view_bill{
                        font-size: 12px;
                        color: #0A87F8;
                        margin-left: 10px;
                    }
                }
                .showImg {
                    >div {
                        height: 76px;
                        width: 120px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        >div{
                            width: 100%;
                            height: 100%;
                            line-height: 76px;
                            border: 1px solid #eeeeee;
                            background-color: #f6f7f8;
                            text-align: center;
                            border-radius: 6px;
                            overflow: hidden;
                            img {
                                width: auto;
                                max-width: 120px;
                                height: auto;
                                max-height: 76px;
                                overflow: hidden;
                            }
                        }
                        p {
                            color: rgba(119, 119, 119, 1);
                            font-size: 12px;
                            text-align: center;
                            margin-top: 5px;
                        }
                    }
                    >div:last-child{
                        margin-right: 0px;
                    }
                }
            }
        }
    }
    .bottom {
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid #DDDDDD;
        color: @secondaryFontColor;
        span:first-child {
            display: inline-block;
            margin-right: 20px;
            padding-right: 20px;
            height: 20px;
            line-height: 20px;
            border-right: 1px dashed #DDDDDD;
        }
    }


    .content-row {
        margin: 0 20px;
        .together-item {
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
                        // text-align: center;
                        padding: 0 9px; // height: 24px;
                        height: calc(100% - 2px); // text-align: left;
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
                    .together-span {
                        float: left;
                        margin-left: 10px;
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
    }
    .titlepz {
        margin-top: 20px;
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
    .itemBg{
        background: #F6F7F8!important;
    }
    .saveBtn {
      width: 120px;
      height: 40px;
      background: rgba(10, 135, 248, 1);
      border-radius: 5px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      margin-bottom: 20px;
    }
    .cancelBtn {
      width: 120px;
      height: 40px;
      background: rgba(246, 247, 248, 1);
      border-radius: 5px;
      border: 1px solid rgba(221, 221, 221, 1);
      margin-right: 20px;
      margin-bottom: 20px;
    }
    /deep/ .label-item .ant-select-selection__rendered{
        margin-left: 0px;
    }
}
</style>
