<template>
    <div class="billDetails-box clearfix">
        <div class="child-detail f-fl">
            <div class="house-address">
                <span>房源地址：</span>
                <span v-if="billWaterData.houseAlias">{{billWaterData.houseAlias}} /</span> {{billWaterData.cityName}}{{billWaterData.areaName}}{{billWaterData.fullAddress}}
            </div>
            <div class="auditStatus" v-if="auditStatus==9">
                <img src="../../assets/workflow/pass.png" style="width: 80px;height: 80px;">
            </div>
            <div class="auditStatus" v-if="auditStatus==5">
                <img src="../../assets/workflow/reject.png" style="width: 80px;height: 80px;">
            </div>
            <div class="auditStatus" v-if="auditStatus==6">
                <img src="../../assets/workflow/back.png" style="width: 80px;height: 80px;">
            </div>
            <div class="top f-clearfix">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span style="margin-top: 9px;" class="radius-font radius-font-person" v-show="!skeletonLoading"><icon-font type="iconyumengtubiao_jiaosequanxian" /></span>
                    <div>
                        <label-item v-if="billWaterData.feeDirection==2" title="收款人信息" :skeletonLoading="skeletonLoading">
                            <div>{{billWaterData.payerName?billWaterData.payerName:"-"}} - {{billWaterData.payerPhone?billWaterData.payerPhone:"-"}}</div>
                        </label-item>
                        <label-item v-else title="付款人信息" :skeletonLoading="skeletonLoading">
                            <div>{{billWaterData.payerName?billWaterData.payerName:"-"}} - {{billWaterData.payerPhone?billWaterData.payerPhone:"-"}}</div>
                        </label-item>
                    </div>
                </div>
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:150px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-red" v-if="billWaterData.feeDirection == 2">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <span style="margin-top: 7px;" class="radius-font radius-font-person" v-else>
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <div class="">
                            <label-item v-if="billWaterData.feeDirection==2" title="付款金额" :skeletonLoading="skeletonLoading">
                                <div>{{Math.abs(billWaterData.totalMoney)/100}}元</div>
                            </label-item>
                            <label-item v-else title="收款金额" :skeletonLoading="skeletonLoading">
                                <div>{{Math.abs(billWaterData.totalMoney)/100}}元</div>
                            </label-item>
                        </div>
                    </div>
                    <div class="item" style="width:150px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_fukuanfangshi" />
                        </span>
                        <label-item title="费用摘要" :skeletonLoading="skeletonLoading">
                            <div>{{billWaterData.feeSummary}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:150px">
                        <span style="margin-top: 7px;width: 32px;" class="radius-font  radius-font-greed">
                            <icon-font type="icon-yumengtubiao_riqi" />
                        </span>
                        <div>
                            <label-item v-if="billWaterData.feeDirection==2" title="确认付款时间" :skeletonLoading="skeletonLoading">
                                <div>{{$moment(billWaterData.affirmTime).format('YYYY.MM.DD')}}</div>
                            </label-item>
                            <label-item v-else title="确认收款时间" :skeletonLoading="skeletonLoading">
                                <div>{{$moment(billWaterData.affirmTime).format('YYYY.MM.DD')}}</div>
                            </label-item>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_caiwuzhangdan" />支付详情
                        </span>
                        <div class="basic-info">
                            <div class="input-info">
                                <label-item class="item" v-if="billWaterData.feeDirection==2" title="收款人姓名" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.payerName ? billWaterData.payerName : '-'}}</span>
                                </label-item>
                                <label-item class="item" v-else title="付款人姓名" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.payerName ? billWaterData.payerName : '-'}}</span>
                                </label-item>
                                <label-item class="item" v-if="billWaterData.feeDirection==2" title="收款人电话" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.payerPhone ? billWaterData.payerPhone : '-'}}</span>
                                </label-item>
                                <label-item class="item" v-else title="付款人电话" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.payerPhone ? billWaterData.payerPhone : '-'}}</span>
                                </label-item>
                                <label-item class="item" style="width: 220px;margin-right: 19px;" v-if="billWaterData.feeDirection==2" title="收款人账号" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.paymentAccount ?(billWaterData.paymentAccountType == 1?((billWaterData.bankName)?'银行卡-'+billWaterData.paymentAccount+'-'+billWaterData.bankName:'银行卡-'+billWaterData.paymentAccount):billWaterData.paymentAccountType == 2?'支付宝-'+billWaterData.paymentAccount:billWaterData.paymentAccountType == 3?'微信-'+billWaterData.paymentAccount:billWaterData.paymentAccount) : '-'}}</span>
                                </label-item>
                                <label-item class="item" v-else title="付款人账号" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.paymentAccount ? (billWaterData.paymentAccountType == 1?((billWaterData.bankName)?'银行卡-'+billWaterData.paymentAccount+'-'+billWaterData.bankName:'银行卡-'+billWaterData.paymentAccount):billWaterData.paymentAccountType == 2?'支付宝-'+billWaterData.paymentAccount:billWaterData.paymentAccountType == 3?'微信-'+billWaterData.paymentAccount:billWaterData.paymentAccount) : '-'}}</span>
                                </label-item>
                                <label-item class="item" v-if="billWaterData.feeDirection==2" title="付款金额" :skeletonLoading="skeletonLoading">
                                    <span>{{Math.abs(billWaterData.totalMoney)/100}}元</span>
                                </label-item>
                                <label-item class="item" v-else title="收款金额" :skeletonLoading="skeletonLoading">
                                    <span>{{Math.abs(billWaterData.totalMoney)/100}}元</span>
                                </label-item>
                                <label-item class="item" v-if="billWaterData.feeDirection==2" title="付款途径" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.paymentMethodName ? billWaterData.paymentMethodName : '-'}}</span>
                                </label-item>
                                <label-item class="item" v-else title="收款途径" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.paymentMethodName ? billWaterData.paymentMethodName : '-'}}</span>
                                </label-item>
                                <label-item class="item" title="费用摘要" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.feeSummary}}</span>
                                </label-item>
                                <label-item class="item" v-if="billWaterData.feeDirection==1" title="收款确认人" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.affirmEmpName}}</span>
                                </label-item>
                                <label-item class="item" v-else title="付款确认人" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.affirmEmpName}}</span>
                                </label-item>
                                <label-item class="item" v-if="billWaterData.feeDirection==1" title="收款确认时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(billWaterData.affirmTime).format('YYYY.MM.DD')}}</span>
                                </label-item>
                                <label-item class="item" v-else title="付款确认时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(billWaterData.affirmTime).format('YYYY.MM.DD')}}</span>
                                </label-item>
                                <!-- <label-item class="item" title="支付时间">
                                    <span>{{billWaterData.practicalTime?$moment(billWaterData.practicalTime).format('YYYY.MM.DD hh:mm:ss'):"- -"}}</span>
                                </label-item> -->
                                <label-item class="item" style="width: 100%;margin: 0 0 20px 0;" title="支付备注" :skeletonLoading="skeletonLoading">
                                    <span>{{billWaterData.comment?billWaterData.comment:'-'}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;" :style="!billWaterData.payVoucherList||billWaterData.payVoucherList.length==0?'margin-bottom: 20px':'margin-bottom: 10px'" title="支付凭证" :skeletonLoading="skeletonLoading">
                                    <div  class="showImg f-clearfix">
                                        <span v-if="!billWaterData.payVoucherList||billWaterData.payVoucherList.length==0">无</span>
                                        <div class="f-fl cursor" v-for="(item,i) in billWaterData.payVoucherList" :key="i" style="margin-bottom: 10px">
                                            <div><img :src="item.small" alt="" @click="handlePreview(item)"></div>
                                        </div>
                                    </div>
                                </label-item>
                                <div class="content-row">
                                    <div class="together-item">
                                        <div class="f-clearfix">
                                            <div class="title-name f-fl"> 流水明细 </div>
                                        </div>
                                        <div class="together-detail">
                                            <div class="together-title">
                                                <div style="max-width: 231px">费用科目</div>
                                                <div style="max-width: 261px">金额</div>
                                                <div style="max-width: 461px">费用周期</div>
                                            </div>
                                            <div class="together-data u-no-border" v-for="(item,index) in billWaterData.flowItemList" :key="index">
                                                <div style="max-width: 231px">
                                                    <span class="together-span">{{item.feeSubjectName}}</span>
                                                </div>
                                                <div style="max-width: 261px">
                                                    <span class="together-span">
                                                        <span style="color:rgba(3,198,131,1);font-size:16px;" v-if="item.feeDirection == 1&&item.amount!=0"> + </span>
                                                        <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="item.feeDirection == 2&&item.amount!=0"> - </span>
                                                        {{item.amount/100}}元
                                                        <span style="color: rgb(153, 153, 153); font-size: 12px;" v-if="item.exemptAmount>0">(免{{item.feeDirection==1?'收':'支'}}{{item.exemptAmount/100}}元)</span>
                                                    </span>
                                                </div>
                                                <div style="max-width: 461px">
                                                    <span class="together-span">{{item.endTime?$moment(item.beginTime).format('YYYY.MM.DD')+' - '+$moment(item.endTime).format('YYYY.MM.DD'):'-'}}</span>
                                                </div>
                                            </div>
                                            <div class="together-data u-no-border">
                                                <div style="max-width: 231px">
                                                    <span class="together-span"><b>费用合计：</b></span>
                                                </div>
                                                <div style="max-width: 722px">
                                                    <span class="together-span" style="color:#0A87F8;" v-if="sumMoney>=0">{{sumMoney}}元</span>
                                                    <span class="together-span" style="color:#FB4246;" v-else>{{sumMoney}}元</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="blank-box"></div>
                        </div>
                    </a-tab-pane>
                    <div slot="tabBarExtraContent" class="tabs-options">
                        <div @click="openBill" >
                            <icon-font type="iconyumengtubiao_yanjing-1"/>
                            <span>查看所属账单</span>
                        </div>
                    </div>
                </a-tabs>
                
            </div>
            <div class="bottom">
                <span>{{billWaterData.creater}}创建于 {{$moment(billWaterData.createTime).format('lll')}}</span>
                <span>{{billWaterData.updater}}更新于 {{$moment(billWaterData.updateTime).format('lll')}}</span>
            </div>
        </div>
        <div class="f-fl">
            <div class="skeletonLoadingListStyle" v-show="skeletonLoading">
            <div class="clearfix">
                <div class="f-fl">
                    <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
                </div>
                <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                    <div class="clearfix" style="width: 100%">
                        <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                        <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                    </div>
                    <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                    </div>
                </div>
            </div>
            <div class="clearfix" style="margin-top: 25px">
                <div class="f-fl">
                    <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
                </div>
                <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                    <div class="clearfix" style="width: 100%">
                        <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                        <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                    </div>
                    <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                    </div>
                </div>
            </div>
            <div class="clearfix" style="margin-top: 25px">
                <div class="f-fl">
                    <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
                </div>
                <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                    <div class="clearfix" style="width: 100%">
                        <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                        <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                    </div>
                    <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                    </div>
                </div>
            </div>
        </div>
        </div>
        <workflow-detail @successExamine="successExamine" @withdrawSuccess="withdrawSuccess" :auditInstanceId="auditInstanceId" :fromType="fromTypeNew" :auditStatus="auditStatus" v-if="!skeletonLoading" :nodeList="nodeList" :auditEmpNameList="auditEmpNameList"></workflow-detail>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog">
            <bill-detail :billId="billWaterData.billId" :fromFlowId="bizId" :fromAduit="fromAduit"></bill-detail>
        </a-modal>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import { billFlowAuditView } from '@/api/billDetailWater';
import { auditInstanceView } from '@/api/workflow';
import billDetail from '@/views/finance/bill/billDetails';
import workflowDetail from './workflowDetail';
export default {
    name: "billDetailDetails",
    components: {
        billDetail,
        workflowDetail,
    },
    props: {
        bizId: {
            type: String
        },
        taskId:{
            type: String
        },
        auditInstanceId:{
            type: String
        },
        fromType:{
            type:Number,
            default:1,//来自场景1、待我审批的；2、我已审批的、3、我发起的，4、抄送我的
        },
        isCcInstanceView:{
            type:Number,
            default:0,//是否来自抄送
        },
        auditEmpNameList:{
            type:Array,
        },
        isViewed:{
            type:Number,
            default:1,//是否来自抄送
        },
    },
    data() {
        return {
            billWaterData:{},
            feeStatusSliceEndTwo:"",    //状态的后2位
            billDetailDialog:false,
            sumMoney:0,
            picMaxLength:0,
            previewImage: '',
            previewVisible: false,
            skeletonLoading:true,
            nodeList:[],
            auditStatus:undefined,
            fromTypeNew:1,
            fromAduit:true,         //是否来自审批
        }
    },
    created() {
        this.getBillDetail();
        this.auditInstanceView();
        this.fromTypeNew = this.fromType;
    },
    mounted() {

    },
    methods: {
        withdrawSuccess(){
            this.$emit('refreshinfoFun',true);
            this.fromTypeNew = 5;
            this.auditInstanceView();
        },
        successExamine(val){
            this.$emit('refreshinfoFun',true);
            this.auditInstanceView();
            if(val==0){
                this.fromTypeNew = 5;//审批过后不是审批人
            }
        },
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(file) {
            this.previewImage = file.url || file.origin;
            this.previewVisible = true;
        },
        getBillDetail() {
            this.skeletonLoading = true;
            billFlowAuditView(this.bizId).then(res => {
                if (res.code === '200') {
                    this.billWaterData = res.data;
                    this.picMaxLength = this.billWaterData.payVoucherList.length;
                    let  sumMoney = 0;
                    if(this.billWaterData.flowItemList.length >0 ){
                        this.billWaterData.flowItemList.forEach(function(e) {
                            if (e.feeDirection === 1) {
                               sumMoney += e.amount * 1;
                            } else {
                               sumMoney -= e.amount * 1;
                            } 
                        })    
                    }
                    this.sumMoney = sumMoney/100;
                    this.skeletonLoading = false;
                    if(this.isCcInstanceView==1&&this.isViewed==0){
                        this.$emit('refreshinfoFun',true);
                    }
                }
            })
        },
        auditInstanceView() {
            let parameter = {
                auditInstanceId: this.auditInstanceId,
                isCcInstanceView: this.isCcInstanceView,
            };
            auditInstanceView(parameter).then(res => {
                if (res.code === '200') {
                    this.nodeList = res.data.nodeList;
                    this.auditStatus = res.data.auditStatus;
                }
            })
        },
        openBill(){
            this.billDetailDialog = true;
        },
    },
    filters: {
    }

}
</script>

<style scoped lang="less">
.billDetails-box {
    height: calc(100vh - 150px);
    overflow: auto;
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
    .child-detail {
        height: 100%;
        overflow: auto;
        width:840px;
        position: relative;
        .auditStatus{
            position: absolute;
            right: 20px;
            top:60px;
        }
        .status1 {
            background: rgba(255,160,54,0.1);
            color: #FFA036;
        }
        .status2 {
            background: rgba(10,135,248,0.1);
            color: #0A87F8;
        }
        .status3 {
            background: rgba(3, 198, 131, 0.1);
            color: #03C683 ;
        }
        .color-status1 {
            color: #FFA036;
        }
        .color-status2 {
            color: #0A87F8;
        }
        .color-status3 {
            color: #03C683;
        }
        .color-status-text {
            color: #111111;
        }
        .top {
            padding: 20px 20px 0 20px;
            margin-bottom: 30px;
            .title {
                display: flex;
                align-items: center;
                height: 44px;
                border-right: 1px dashed @borderColor;
                .radius-font {
                    width: 44px;
                    height: 44px;
                    line-height: 44px;
                    border-radius: 50%;
                    font-size:28px;
                }
                .status1 {
                    background: rgba(251, 66, 70, 0.1);
                    color: #FB4246;
                }
                .status2 {
                    background: rgba(3, 198, 131, 0.1);
                    color: #03C683;
                }
                .status3 {
                    background: rgba(119, 119, 119, 0.1);
                    color: #777777;
                }
                .status4 {
                    background: rgba(10, 135, 248, 0.1);
                    color: #0A87F8;
                }
                .color-status1 {
                    color: #FFA036;
                }
                .color-status2 {
                    color: #0A87F8;
                }
                .color-status3,
                .color-status4 {
                    color: #777777;
                }
                .color-status8 {
                    color: #03C683;
                }
                .label-item {
                    width: 180px;
                }
                .edit-status-icon {
                    vertical-align: middle;
                    margin-left: 8px;
                    color: @themeColor;
                }
                p{
                    font-size:12px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                >div{
                    div{
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(17,17,17,1);
                    }  
                }
            }

            .detail {
                display: flex;
                flex-wrap: wrap;
                .item {
                    display: flex;
                    align-items: center;
                    width: 200px;
                    font-size: 12px; // padding-left: 40px;
                    input {
                        width: 180px;
                        padding-right: 10px;
                    }
                    & /deep/ .ant-select {
                        width: 180px;
                    }
                    .radius-font {
                        font-size:18px;
                    }
                    p{
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }
                    >div{
                        div{
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(17,17,17,1);
                        }  
                    }
                }
                .blank-box {
                    width: 50px;
                    height: 30px;
                }
            }
            .radius-font-person {
                color: #0A87F8;
                background-color: fade(#0A87F8, 10%);
            }
            .radius-font-greed {
                color: #03C683;
                background-color: fade(#03C683, 10%);
            }
            .radius-font-red {
                color: #F84246;
                background-color: fade(#F84246, 10%);
            }
            .radius-font-yellow {
                color: #FFA036;
                background-color: fade(#FFA036, 10%);
            }
            .radius-font-close {
                color: #777777;
                background-color: fade(#F6F7F8, 100%);
            }
        }
        .radius-font {
            display: inline-block;
            margin-right: 10px;
            width: 32px;
            height: 32px;
            line-height: 32px ;
            font-size: 12px;
            color: #FFA036;
            text-align: center;
            background-color: fade(#FFA036, 10%);
            border-radius: 16px;
        }
        .tabs-content {
            padding: 0 20px;
            // min-height: calc(100vh - 370px);
            .basic-info {
                .input-info {
                    display: flex;
                    flex-wrap: wrap;
                    .item {
                        margin: 0 39px 20px 0;
                        width: 200px;
                        & /deep/ .title {
                            margin-bottom: 4px;
                        }
                        & /deep/ .ant-select {
                            width: 100%;
                        }
                    }
                    .public-config {
                        display: flex;
                        flex-wrap: wrap;
                        label {
                            width: 100px;
                            margin: 10px 0 20px 0;
                            padding: 0;
                        }
                    }
                }
            }
        }
        .tabs-options {
            font-size: 0;
            cursor: pointer;
            div {
                text-align: right;
                display: inline-block;
                font-size: 14px;
                padding: 0  0 0 14px;
                color: #0a87f8;
                span {
                    // margin-right: 14px;

                    border-right: 1px dashed #ccc;
                }
            }
            div:last-child {
                span {
                    margin-right: 0;
                    border-right: none;
                }
            }
            &>span {
                display: inline-block;
                padding: 0 10px;
                height: 24px;
                line-height: 24px;
                font-size: 14px;
                border: 1px solid #DDDDDD;
                background-color: #F6F7F8;
                border-radius: 4px;
            }
            &>span:last-child {
                margin-left: 10px;
                border: 1px solid #0a87f8;
                background-color: #0a87f8;
                color: #ffffff;
            }
        }
    }
    .showImg {
        >div {
            height: 76px;
            width: 120px;
            margin-right: 10px;
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
    .bottom {
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        border-top: 1px dashed #DDDDDD;
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

    .radius-font-person {
        color: #0A87F8;
        background-color: fade(#0A87F8, 10%);
    }
    & /deep/ .ant-tabs-nav .ant-tabs-tab {
        margin: 0;
        padding: 8px 0;
    }
    & /deep/ .ant-input,
    .ant-select,
    .ant-checkbox-wrapper,
    .ant-select-dropdown {
        font-size: 12px;
        height: 24px;
        color: @mainFontColor;
    }
    & /deep/ .ant-select-selection__rendered,
    & /deep/ .ant-select-selection--single {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
    }
    & /deep/ .ant-select-dropdown-menu {
        font-size: 12px;
    }
    & /deep/ .label-item .addon-after {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
    }
    & /deep/ .ant-tabs-top-content {
        font-size: 12px;
        color: @mainFontColor;
    }
    .addon-after-position {
        position: absolute;
        top: 4px;
        z-index: 2;
        font-size: 12px;
    }
    .status-tags {
        padding: 4px 15px;
        margin-right: 10px;
        border-color: @borderColor!important;
        color: @mainFontColor!important;
        cursor: pointer;
    }
    .active {
        border-color: @themeColor!important;
        color: @themeColor!important;
    }
    .title-name {
        margin-left: 10px;
        height: 42px;
        line-height: 42px;
        font-weight: 600; // border-bottom: 1px solid #f3f3f2;
        position: relative;
    }
    .title-name::before {
        content: "";
        position: absolute;
        top: 14px;
        left: -9px;
        height: 14px;
        width: 2px;
        background: #0A87F8;
        -webkit-transition: all 0.3s ease;
        -webkit-box-shadow: 0 0 4px 0 @borderColor;
        box-shadow: 0 0 4px 0 @borderColor;
    }
    .bill-detail {}
    .bill-status {
        width: 60px;
        margin-right: 6px;
    }
    .bill-item {
        width: calc(100% - 66px);

        .it-title {
            width: 100%;
            height: 20px;
            .it-border-box {
                display: inline-block;
                height: 20px;
                width: 10px;
                margin-right: 16px;
                .it-border {
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                    background: rgba(10, 135, 248, 1); // margin-top:6px;
                }
                .it-left-border {
                    height: 5px;
                    width: 5px;
                    margin-left: 5px;
                    border-left: 1px solid #DDDDDD;
                }
                .it-top-border {
                    height: 5px;
                    width: 5px;
                    margin-left: 5px;
                    border-left: 1px solid #DDDDDD;
                }
            }
            .shou-zhi {
                display: inline-block;
                height: 20px;
                width: 20px;
                color: #16D5AD;
                border: 1px solid #16D5AD;
                border-radius: 50%;
                text-align: center;
                margin: 0 10px;
                line-height: 20px;
            }
        }
        .item-info {
            border-left: 1px solid #DDDDDD;
            margin-left: 5px;
            padding: 0 0 32px 0;
            >.item-info-top {
                padding-top: 12px;
                margin-left: 19px;
            }
            .info-item-info {
                margin-left: 19px;
                width: 863px; // height:68px;
                background: rgba(246, 247, 248, 1);
                p {
                    padding: 10px;
                }
                ul {
                    padding-left: 10px;
                    padding-bottom: 10px;
                    li {
                        width: 300px;
                    }
                }
            }
        }
    }
    .content-row {
        width: 100%;
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
                        // padding: 0 9px;
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
    & /deep/ .ant-select-selection--multiple {
        //   height: 24px;
        min-height: 24px;
        .ant-select-selection__rendered>ul>li {
            height: 20px;
            margin-top: 1px;
            line-height: 20px;
        }
    }
    & /deep/ .upload .check-pic {
        width: 149px;
        height: 95px;
        padding-top: 0;
    }
    & /deep/ .file-list {
        width: 149px;
        height: 102px;
    }
    .animate-box{
        flex-wrap: wrap;
        animation: skeleton-blink 1.2s ease infinite;
        -webkit-animation: skeleton-blink 1.2s ease infinite;
        background-image: -webkit-gradient(linear, left top, right top, color-stop(25%, #f0f0f0), color-stop(37%, #e3e3e3), color-stop(63%, #f0f0f0));
        background-image: -o-linear-gradient(left, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
        background-image: linear-gradient(90deg, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
        background-size: 400% 100%;
    }
    @-webkit-keyframes skeleton-blink {
        0% {
            background-position: 100% 50%
        }

        to {
            background-position: 0 50%
        }
    }
    @keyframes skeleton-blink {
        0% {
            background-position: 100% 50%
        }

        to {
            background-position: 0 50%
        }

    }
    .skeletonLoadingListStyle{
        padding: 10px 20px 80px 20px;
        width: 352px;
    }
}
</style>
