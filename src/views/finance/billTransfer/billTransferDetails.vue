<template>
    <div class="billDetails-box">
        <div class="child-detail">
            <div class="house-address">
                <span>房源地址：</span>
                <span v-if="billTransferData.houseAlias">{{billTransferData.houseAlias}} /</span> {{billTransferData.cityName}}{{billTransferData.areaName}}{{billTransferData.fullAddress}}
            </div>
            <div class="top f-clearfix">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span style="margin-top: 9px;" class="radius-font radius-font-red" v-if="billTransferData.auditStatus==1" v-show="!skeletonLoading"><icon-font type="icondaishenhe1x" /></span>
                    <span style="margin-top: 9px;" class="radius-font radius-font-person" v-if="billTransferData.auditStatus==2" v-show="!skeletonLoading"><icon-font type="iconshenhetongguo1x" /></span>
                    <span style="margin-top: 9px;" class="radius-font radius-font-close" v-if="billTransferData.auditStatus==3" v-show="!skeletonLoading"><icon-font type="iconshenhebohui1x" /></span>
                    <div>
                        <label-item title="当前状态">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div class="statusColor3" v-show="!skeletonLoading">{{billTransferData.auditStatusName}}</div>
                        </label-item>
                    </div>
                </div>
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:198px">
                        <span style="margin-top: 9px;" class="radius-font  radius-font-person">
                            <icon-font type="iconyumengtubiao_jiaosequanxian" />
                        </span>
                        <div class="">
                            <label-item v-if="billTransferData.feeDirection==2" title="转账人信息" :skeletonLoading="skeletonLoading">
                                <div>{{billTransferData.payerName?billTransferData.payerName:"-"}} - {{billTransferData.payerPhone?billTransferData.payerPhone:"-"}}</div>
                            </label-item>
                            <label-item v-else title="转账人信息" :skeletonLoading="skeletonLoading">
                                <div>{{billTransferData.payerName?billTransferData.payerName:"-"}} - {{billTransferData.payerPhone?billTransferData.payerPhone:"-"}}</div>
                            </label-item>
                        </div>
                    </div>
                    <div class="item" style="width:150px">
                        <span style="margin-top: 9px;" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <div class="">
                            <label-item title="转账金额" :skeletonLoading="skeletonLoading">
                                <div>{{Math.abs(billTransferData.occurredMoney)/100}}元</div>
                            </label-item>
                        </div>
                    </div>
                    <div class="item" style="width:180px">  
                        <span style="margin-top: 9px;" class="radius-font radius-font-greed">
                            <icon-font type="icon-yumengtubiao_riqi" />
                        </span>
                        <label-item title="提交时间" :skeletonLoading="skeletonLoading">
                            <div>{{$moment(billTransferData.createTime).format('YYYY.MM.DD HH:mm')}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:200px">
                        <span style="margin-top: 9px;" class="radius-font  radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_zhangdan" />
                        </span>
                        <label-item title="所属账单" :skeletonLoading="skeletonLoading">
                            <div>{{billTransferData.billName}}</div>
                        </label-item>
                    </div>
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_caiwuzhangdan" />转账详情
                        </span>
                        <div class="basic-info">
                            <div class="input-info">
                                <label-item class="item" title="转账人姓名" :skeletonLoading="skeletonLoading">
                                    <span>{{billTransferData.payerName ? billTransferData.payerName : '-'}}</span>
                                </label-item>
                                <label-item class="item" title="转账人电话" :skeletonLoading="skeletonLoading">
                                    <span>{{billTransferData.payerPhone ? billTransferData.payerPhone : '-'}}</span>
                                </label-item>
                                <label-item class="item" title="转账金额" :skeletonLoading="skeletonLoading">
                                    <span>{{Math.abs(billTransferData.occurredMoney)/100}}元</span>
                                </label-item>
                                <label-item class="item" title="所属账单" :skeletonLoading="skeletonLoading">
                                    <span>{{billTransferData.billName ? billTransferData.billName : '-'}}</span>
                                </label-item>
                                <label-item class="item" title="收款账号" :skeletonLoading="skeletonLoading">
                                    <span>{{billTransferData.paymentAccountTypeName}}{{billTransferData.paymentAccountTypeName&&billTransferData.collectionAccount?'-':''}}{{billTransferData.collectionAccount}}{{!billTransferData.paymentAccountTypeName&&!billTransferData.collectionAccount?'-':''}}</span>
                                </label-item>
                                <label-item class="item" title="对方转账账号" :skeletonLoading="skeletonLoading">
                                    <span>{{billTransferData.paymentAccount?billTransferData.paymentAccount:'-'}}</span>
                                </label-item>
                                <label-item class="item" title="提交时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(billTransferData.createTime).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;" :style="!billTransferData.picList||billTransferData.picList.length==0?'margin-bottom: 16px':'margin-bottom: 6px'" title="支付凭证" :skeletonLoading="skeletonLoading">
                                    <div  class="showImg f-clearfix">
                                        <span v-if="!billTransferData.picList||billTransferData.picList.length==0">-</span>
                                        <div class="f-fl cursor" v-for="(item,i) in billTransferData.picList" :key="i" style="margin-bottom: 10px" @click="handlePreview(item)">
                                            <div><img :src="item.small" alt=""></div>
                                        </div>
                                    </div>
                                </label-item>
                                <div class="content-row" v-if="billTransferData.auditStatus ==2||billTransferData.auditStatus ==3">
                                    <div class="together-item">
                                        <div class="f-clearfix">
                                            <div class="title-name f-fl"> 审核详情 </div>
                                        </div>
                                    </div>
                                </div>
                                <label-item class="item aduitItem" title="审核结果" :skeletonLoading="skeletonLoading" v-if="billTransferData.auditStatus ==2||billTransferData.auditStatus ==3">
                                    <span v-if="billTransferData.auditStatus ==2">审核通过</span>
                                    <span v-if="billTransferData.auditStatus ==3">已驳回</span>
                                </label-item>
                                <label-item class="item aduitItem" title="审核人" :skeletonLoading="skeletonLoading" v-if="billTransferData.auditStatus ==2||billTransferData.auditStatus ==3">
                                    <span>{{billTransferData.auditEmpName ? billTransferData.auditEmpName : '-'}}</span>
                                </label-item>
                                <label-item class="item aduitItem" title="审核时间" :skeletonLoading="skeletonLoading" v-if="billTransferData.auditStatus ==2||billTransferData.auditStatus ==3">
                                    <span>{{$moment(billTransferData.auditTime).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item v-if="billTransferData.auditStatus ==3" class="item" style="width: 100%" title="驳回原因" :skeletonLoading="skeletonLoading">
                                    <span>{{billTransferData.auditComment ? billTransferData.auditComment : '-'}}</span>
                                </label-item>
                            </div>
                            <div class="blank-box"></div>
                        </div>
                    </a-tab-pane>
                    <div slot="tabBarExtraContent" class="tabs-options">
                        <div @click="approvedView" v-if="billTransferData.auditStatus==1">
                            <icon-font type="iconshenhe"/>
                            <span> 审核通过</span>
                        </div>
                        <div @click="rejectView" v-if="billTransferData.auditStatus==1">
                            <icon-font type="iconyumengtubiao_fanhui"/>
                            <span> 审核驳回</span>
                        </div>
                        <div @click="openBill" >
                            <icon-font type="iconyumengtubiao_yanjing-1"/>
                            <span> 查看所属账单</span>
                        </div>
                    </div>
                </a-tabs>
                
            </div>
            <div class="bottom">
                <span>{{billTransferData.creater}}创建于 {{$moment(billTransferData.createTime).format('lll')}}</span>
                <span>{{billTransferData.updater}}更新于 {{$moment(billTransferData.updateTime).format('lll')}}</span>
            </div>
        </div>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog">
            <bill-detail :billId="billTransferData.billId" @refreshinfoFun="refreshinfoFun"></bill-detail>
        </a-modal>
        <!-- 审核处理转账通知 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" :width="passRejectWith" v-model="billProcessDialog" class="ownModalBorder titDialog" title="转账审核" @cancel="billProcessDialog=false">
            <bill-process @closeThis="billProcessDialog=false" @saveSure="saveSure" :id="id" :billId="billTransferData.billId" :operateTypeReg="operateTypeReg"></bill-process>
        </a-modal>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import { billTransferView } from '@/api/billDetailWater';
import billDetail from '../bill/billDetails';
import  billProcess from './billTransferPass';
export default {
    name: "billDetailDetails",
    components: {
        billDetail,
        billProcess,
    },
    props: {
        id: {
            type: String
        },
    },
    data() {
        return {
            billTransferData:{},
            feeStatusSliceEndTwo:"",    //状态的后2位
            billDetailDialog:false,
            sumMoney:0,
            picMaxLength:0,
            previewImage: '',
            previewVisible: false,
            skeletonLoading:true,
            billProcessDialog:false,
            operateTypeReg:1,
            passRejectWith:'1000px',
        }
    },
    created() {
        this.getBillDetail();
    },
    mounted() {

    },
    methods: {
        refreshinfoFun(val){
            this.$emit('refreshinfoFun', val);
        },
        approvedView(){
            this.operateTypeReg = 1;
            this.billId = this.billTransferData.billId;
            this.billProcessDialog = true;
            this.passRejectWith = '1000px';
        },
        rejectView(){
            this.operateTypeReg = 2;
            this.billProcessDialog = true;
            this.passRejectWith = '800px';
        },
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(file) {
            this.previewImage = file.url || file.origin;
            this.previewVisible = true;
        },
        saveSure(){
            this.billProcessDialog = false;
            this.$emit('refreshinfoFun',true);
            this.getBillDetail();
        },
        getBillDetail() {
            this.skeletonLoading = true;
            billTransferView(this.id).then(res => {
                if (res.code === '200') {
                    this.billTransferData = res.data;
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
        height: calc(100vh - 150px);
        overflow: auto;
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
        // .top {
        //     padding: 20px 20px 0 20px;
        //     .title {
        //         display: flex;
        //         align-items: center;
        //         width: 160px;
        //         height: 68px;
        //         border-right: 1px dashed @borderColor;
        //         .radius-font {
        //             width: 44px;
        //             height: 44px;
        //             line-height: 44px;
        //             border-radius: 50%;
        //         }

        //         .label-item {
        //             width: 80px;
        //         }
        //         .edit-status-icon {
        //             vertical-align: middle;
        //             margin-left: 8px;
        //             color: @themeColor;
        //         }
        //     }

        //     .detail {
        //         margin-top: 25px;
        //         display: flex;
        //         width: calc(100% - 160px);
        //         flex-wrap: wrap;
        //         .item {
        //             display: flex;
        //             align-items: center;
        //             margin-bottom: 20px;
        //             width: 190px;
        //             font-size: 12px; // padding-left: 40px;
        //             input {
        //                 width: 180px;
        //                 padding-right: 10px;
        //             }
        //             & /deep/ .ant-select {
        //                 width: 180px;
        //             }
        //         }
        //         .blank-box {
        //             width: 40px;
        //             height: 40px;
        //         }
        //     }
        // }
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

    // .radius-font {
    //     display: inline-block;
    //     margin-right: 10px;
    //     width: 60px;
    //     height: 24px;
    //     line-height: 24px;
    //     font-size: 14px;
    //     color: #FFA036;
    //     text-align: center;
    //     background-color: fade(#FFA036, 10%);
    //     border-radius: 12px;
    // }
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
        font-size: 14px;
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
    .aduitItem{
        /deep/ .title{
            margin-top: 0px !important;
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
