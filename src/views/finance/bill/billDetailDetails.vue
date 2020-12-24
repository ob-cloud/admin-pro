<template>
    <div class="billDetails-box">
        <div class="child-detail">
            <div class="house-address">
                <span>房源地址：</span>
                <span v-if="billDetailData.houseAlias">{{billDetailData.houseAlias}} /</span> {{billDetailData.cityName}}{{billDetailData.areaName}}{{billDetailData.fullAddress}}
            </div>
            <div class="top f-clearfix">
                 <div class="f-fl title">
                     <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                     <span style="margin-top: 9px;" v-if="billDetailData.feeStatus=='待付款'&&!skeletonLoading" class="radius-font radius-font-yellow"><icon-font type="icon-yumengtubiao_zhangdan" /></span>
                     <span style="margin-top: 9px;" v-if="billDetailData.feeStatus=='待收款'&&!skeletonLoading" class="radius-font radius-font-person"><icon-font type="icon-yumengtubiao_zhangdan" /></span>
                     <span style="margin-top: 9px;" v-if="(billDetailData.feeStatus=='已收款'||billDetailData.feeStatus=='已付款')&&!skeletonLoading" class="radius-font radius-font-greed"><icon-font type="icon-yumengtubiao_zhangdan" /></span>
                     <div >
                         <label-item title="当前状态">
                             <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div v-if="billDetailData.feeStatus=='待付款'&&!skeletonLoading" class="statusColor4">{{billDetailData.feeStatus}} <span class="color-status1" v-if="billDetailData.isOverdue == 1">逾期({{billDetailData.cancelTime}})天</span></div>
                            <div v-if="billDetailData.feeStatus!='待付款'&&!skeletonLoading"  class="statusColor3">{{billDetailData.feeStatus}}</div>
                         </label-item>
                    </div>
                </div> 
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:198px">
                        <span style="margin-top: 7px;" class="radius-font  radius-font-person">
                            <icon-font type="iconyumengtubiao_jiaosequanxian" />
                        </span>
                        <label-item title="收/付款人信息" v-if="skeletonLoading">
                            <div class="bgColorStyle animate-box" style="width: 100px;height: 21px;"></div>
                        </label-item>
                        <label-item title="收款人信息" v-if="!skeletonLoading&&(billDetailData.feeStatus=='待付款'||billDetailData.feeStatus=='已付款')">
                            <div>{{billDetailData.payerName?billDetailData.payerName:"-"}} - {{billDetailData.payerPhone?billDetailData.payerPhone:"-"}}</div>
                        </label-item>
                        <label-item title="付款人信息" v-if="!skeletonLoading&&(billDetailData.feeStatus=='待收款'||billDetailData.feeStatus=='已收款')">
                            <div>{{billDetailData.payerName?billDetailData.payerName:"-"}} - {{billDetailData.payerPhone?billDetailData.payerPhone:"-"}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:150px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-red" v-if="billDetailData.feeStatus == '待付款'|| billDetailData.feeStatus == '已付款'">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <span style="margin-top: 7px;" class="radius-font radius-font-person" v-else>
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <label-item title="预(实)收(付)金额" v-if="skeletonLoading">
                            <div class="bgColorStyle animate-box" style="width: 100px;height: 21px;"></div>
                        </label-item>
                        <label-item title="预付金额" v-if="!skeletonLoading&&billDetailData.feeStatus == '待付款'">
                            <div>{{billDetailData.originalMoney/100}}元</div>
                        </label-item>
                        <label-item title="预收金额" v-if="!skeletonLoading&&billDetailData.feeStatus == '待收款'">
                            <div>{{billDetailData.originalMoney/100}}元</div>
                        </label-item>
                        <label-item title="实收金额" v-if="!skeletonLoading&&billDetailData.feeStatus == '已收款'">
                            <div>{{billDetailData.originalMoney/100}}元</div>
                        </label-item>
                        <label-item title="实付金额" v-if="!skeletonLoading&&billDetailData.feeStatus == '已付款'">
                            <div>{{billDetailData.originalMoney/100}}元</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:180px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_fukuanfangshi" />
                        </span>
                        <label-item title="费用科目" :skeletonLoading="skeletonLoading">
                            <div>{{billDetailData.feeSubjectName}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:200px">
                        <span style="margin-top: 7px;" class="radius-font  radius-font-greed">
                            <icon-font type="icon-yumengtubiao_riqi" />
                        </span>
                        <label-item title="预计收(付)款日期" v-if="skeletonLoading">
                            <div class="bgColorStyle animate-box" style="width: 100px;height: 21px;"></div>
                        </label-item>
                        <label-item title="预计付款日期" v-if="!skeletonLoading&&billDetailData.feeStatus=='待付款'||billDetailData.feeStatus=='已付款'">
                            <div>{{$moment(billDetailData.predictTime).format('YYYY.MM.DD')}}</div>
                        </label-item>
                        <label-item title="预计收款日期"  v-if="!skeletonLoading&&billDetailData.feeStatus=='待收款'||billDetailData.feeStatus=='已收款'">
                            <div>{{$moment(billDetailData.predictTime).format('YYYY.MM.DD')}}</div>
                        </label-item>
                    </div>
                   
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_caiwuzhangdan" /> {{feeStatusSliceEndTwo}}详情
                        </span>
                        <div class="basic-info">
                            <div class="input-info">
                                <label-item class="item" v-if="billDetailData.feeStatus=='待付款'||billDetailData.feeStatus=='已付款'" title="收款人姓名" :skeletonLoading="skeletonLoading">
                                    <span>{{billDetailData.payerName?billDetailData.payerName:"-"}}</span>
                                </label-item>
                                <label-item class="item" v-else title="付款人姓名" :skeletonLoading="skeletonLoading">
                                    <span>{{billDetailData.payerName?billDetailData.payerName:"-"}}</span>
                                </label-item>
                                <label-item class="item" v-if="billDetailData.feeStatus=='待付款'||billDetailData.feeStatus=='已付款'" title="收款人电话" :skeletonLoading="skeletonLoading">
                                    <span>{{billDetailData.payerPhone?billDetailData.payerPhone:"-"}}</span>
                                </label-item>
                                <label-item class="item" v-else title="付款人电话" :skeletonLoading="skeletonLoading">
                                   <span>{{billDetailData.payerPhone?billDetailData.payerPhone:"-"}}</span>
                                </label-item>
                                <label-item class="item" v-if="billDetailData.feeStatus=='待付款'||billDetailData.feeStatus=='已付款'" title="收款人账号类型" :skeletonLoading="skeletonLoading">
                                    <span v-if="billDetailData.paymentAccountType == 1">银联-{{billDetailData.bankName ? billDetailData.bankName :'-'}}</span>
                                    <span v-else-if="billDetailData.paymentAccountType == 2">支付宝</span>
                                    <span v-else>微信</span>
                                </label-item>
                                <label-item class="item" v-else title="付款人账号类型" :skeletonLoading="skeletonLoading">
                                   <span v-if="billDetailData.paymentAccountType == 1">银联-{{billDetailData.bankName ? billDetailData.bankName :'-'}}</span>
                                    <span v-else-if="billDetailData.paymentAccountType == 2">支付宝</span>
                                    <span v-else>微信</span>
                                </label-item>
                                <label-item class="item" v-if="billDetailData.feeStatus=='待付款'||billDetailData.feeStatus=='已付款'" title="收款人账号" :skeletonLoading="skeletonLoading">
                                   <span>{{billDetailData.paymentAccount?billDetailData.paymentAccount:"-"}}</span>
                                </label-item>
                                <label-item class="item" v-else title="付款人账号" :skeletonLoading="skeletonLoading">
                                   <span>{{billDetailData.paymentAccount?billDetailData.paymentAccount:"-"}}</span>
                                </label-item>
                              
                                <label-item class="item" title="费用金额" :skeletonLoading="skeletonLoading">
                                    <span>￥{{billDetailData.originalMoney/100}}元</span>
                                </label-item>
                                <label-item class="item" title="费用科目" :skeletonLoading="skeletonLoading">
                                    <span>{{billDetailData.feeSubjectName}}</span>
                                </label-item>
                     
                                <label-item class="item" v-if="billDetailData.feeStatus=='待付款'||billDetailData.feeStatus=='已付款'" title="预计付款日期" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(billDetailData.predictTime).format('YYYY.MM.DD')}}</span>
                                </label-item>
                                <label-item class="item" v-else title="预计收款日期" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(billDetailData.predictTime).format('YYYY.MM.DD')}}</span>
                                </label-item>

                                <label-item class="item" title="费用周期" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(billDetailData.beginTime).format('YYYY.MM.DD')}} - {{$moment(billDetailData.endTime).format('YYYY.MM.DD')}}</span>
                                </label-item>
                                <label-item class="item" v-if="billDetailData.feeStatus=='待付款'||billDetailData.feeStatus=='已付款'" title="付款途径" :skeletonLoading="skeletonLoading">
                                    <span>{{paymentAccountType}}</span>
                                </label-item>
                                <label-item class="item" v-else title="收款途径" :skeletonLoading="skeletonLoading">
                                    <span>{{paymentAccountType}}</span>
                                </label-item>
                                
                                <label-item class="item" :title="'实际'+feeStatusSliceSecond+'款日期'" :skeletonLoading="skeletonLoading">
                                    <span>{{billDetailData.practicalTime?$moment(billDetailData.practicalTime).format('YYYY.MM.DD'):"-"}}</span>
                                </label-item>
                                <div style="width: 100%;position:relative;margin-bottom: 10px" v-if="feeStatusSliceFirst=='已'">
                                    <div style="margin-left: 8px"><b>收支确认信息</b></div>
                                    <div style="position: absolute;height: 14px;width: 2px;background: #0a87f8;top:1px;"></div>
                                </div>
                                <label-item class="item" title="确认人" v-if="feeStatusSliceFirst=='已'" :skeletonLoading="skeletonLoading">
                                    <span>{{billDetailData.affirmEmpName?billDetailData.affirmEmpName:'-'}}</span>
                                    <span style="color: #FFA036;" v-if="billDetailData.affirmEmpName&&billDetailData.affirmEmpTypeName">({{billDetailData.affirmEmpTypeName?billDetailData.affirmEmpTypeName:''}})</span>
                                </label-item>
                                <label-item class="item" title="确认时间" v-if="feeStatusSliceFirst=='已'" :skeletonLoading="skeletonLoading">
                                    <span>{{billDetailData.practicalTime?$moment(billDetailData.affirmTime).format('YYYY.MM.DD HH:mm:ss'):"-"}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;margin: 0 0 20px 0;" title="确认备注" v-if="feeStatusSliceFirst=='已'" :skeletonLoading="skeletonLoading">
                                    <span>{{billDetailData.affirmComment?billDetailData.affirmComment:'-'}}</span>
                                </label-item>
                            </div>
                            <div class="blank-box"></div>
                        </div>
                    </a-tab-pane>
                    <div slot="tabBarExtraContent" class="tabs-options">
           
        
                        <div @click="openBill" >
                            <icon-font type="iconyumengtubiao_yanjing-1" style="margin-right: 5px;"/>
                            <span>查看所属账单</span>
                        </div>
                           
                  
                    </div>
                </a-tabs>
            </div>
            <div class="bottom">
                <span>{{billDetailData.creater}}创建于 {{$moment(billDetailData.createTime).format('lll')}}</span>
                <span>{{billDetailData.updater}}更新于 {{$moment(billDetailData.updateTime).format('lll')}}</span>
            </div>
        </div>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog">
            <bill-detail :billId="billDetailData.billId"></bill-detail>
        </a-modal>
    </div>
</template>

<script>
import { billDetailView } from '@/api/billDetailWater';
import billDetail from '../bill/billDetails';
export default {
    name: "billDetailDetails",
    components: {
        billDetail,
    },
    props: {
        billDetailId: {
            type: String
        },
    },
    data() {
        return {
            billDetailData:{},
            feeStatusSliceBeforeTwo:"",       //状态的前2位
            feeStatusSliceFirst:"",     //状态第一位
            feeStatusSliceSecond:"",    //状态中间一位
            feeStatusSliceEndTwo:"",    //状态的后2位
            feeStatusSliceEndNegate:"", //状态的后2位取反
            paymentAccountType:"",      //支付途径
            billDetailDialog:false,
            skeletonLoading:false,
        }
    },
    created() {
        this.getBillDetail();
    },
    mounted() {

    },
    methods: {
        getBillDetail() {
            this.skeletonLoading = true;
            billDetailView(this.billDetailId).then(res => {
                if (res.code === '200') {
                    this.billDetailData = res.data;
                    this.feeStatusSliceBeforeTwo = this.billDetailData.feeStatus.slice(0,2);
                    this.feeStatusSliceFirst = this.billDetailData.feeStatus.slice(0,1);
                    this.feeStatusSliceSecond = this.billDetailData.feeStatus.slice(1,2);
                    this.feeStatusSliceEndTwo = this.billDetailData.feeStatus.slice(1,3);
                    this.feeStatusSliceEndNegate = this.feeStatusSliceEnd == '付款'?'收款':'付款';
                    if(this.billDetailData.isOccur == 0){
                        this.paymentAccountType = "- -";
                    }
                    else{
                        this.paymentAccountType = this.billDetailData.paymentAccountType == 1 ? '银行卡' : this.billDetailData.paymentAccountType == 2 ? '支付宝' : this.billDetailData.paymentAccountType == 3 ? '微信' : '-';
                    }
                }
                this.skeletonLoading = false;
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
        max-height: calc(100vh - 230px);
        overflow: auto;
        .top {
            padding: 20px 20px 0 20px;
            margin-bottom: 30px;
            .title {
                display: flex;
                align-items: center;
                width: 138px;
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
                    width: 80px;
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
                width: calc(100% - 160px);
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
            // height: 400px;
            // min-height: calc(100vh - 390px);
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
    .showImg {
        >div {
            width: 120px;
            height: 76px;
            border-radius: 4px; // border:1px solid rgba(221,221,221,1);
            margin-right: 16px;
            img {
                width: 100%;
                height: 95px;
                overflow: hidden;
            }
            p {
                color: rgba(119, 119, 119, 1);
                font-size: 12px;
                text-align: center;
                margin-top: 8px;
            }
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

    .radius-font {
        display: inline-block;
        margin-right: 10px;
        width: 60px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #FFA036;
        text-align: center;
        background-color: fade(#FFA036, 10%);
        border-radius: 12px;
    }
    .radius-font-person {
        color: #0A87F8;
        background-color: fade(#0A87F8, 10%);
    }
    & /deep/ .ant-tabs-nav .ant-tabs-tab {
        margin: 0;
    }
    & /deep/ .ant-tabs .ant-tabs-small-bar .ant-tabs-tab{
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
}
</style>
