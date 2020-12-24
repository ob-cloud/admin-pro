<template>
    <div class="openWater-box">
        <div class="child-detail">
            <div class="house-address">
                <span>房源地址：</span>
                <span v-if="houseAlias">{{houseAlias}} /</span> {{fullAddress}}
            </div>
            <div class="tabs-content">
              
                        <div class="basic-info">
                            <div class="content-row">
                                <div class="bill-detail f-clearfix" v-for="(item,index) in feeFlowList" :key="index">
                                    <div class="bill-status f-fl" style="height: 50px;">
                                        <div style="color:rgba(10,135,248,1);width: 100%" v-if="item.status == 1">正常</div>
                                        <div style="color:#777777;width: 100%" v-if="item.status == 2">已作废</div>
                                        <div style="width: 100%" v-if="item.auditStatus == 1"><span class="aduit-status contractAuditStatus1">审批中</span></div>
                                        <div style="width: 100%" v-if="item.auditStatus == 9"><span class="aduit-status contractAuditStatus9">审批通过</span></div>
                                        <div style="width: 100%" v-if="item.auditStatus == 5"><span class="aduit-status contractAuditStatus5">审批驳回</span></div>
                                        <div style="width: 100%" v-if="item.auditStatus == 6"><span class="aduit-status contractAuditStatus6">已撤销</span></div>
                                    </div>
                                    <div class="bill-item f-fl">
                                        <div class="it-title f-clearfix">
                                            <div class="f-fl it-border-box">
                                                <div class="it-top-border"></div>
                                                <div class="it-border"></div>
                                                <div class="it-left-border" :style="index==feeFlowList.length-1?'border-left: none;':''"></div>
                                            </div>
                                            <div class="f-fl">
                                                <span style="color:rgba(17,17,17,1);">{{item.affirmEmpName}}</span><span style="color: #FFA036;">({{item.affirmEmpTypeName}})</span>
                                                <span style="color:rgba(119,119,119,1);margin:0 10px;">于</span>
                                                <span style="color:rgba(17,17,17,1);">{{$moment(item.practicalTime).format('YYYY.MM.DD')}}</span>
                                              <span class="paymentMethodNameStyle">{{item.paymentMethodName}}</span>
                                              <span  v-if="item.feeDirection == 1" style="color: #0A87F8;margin-right: 10px;">收取</span>
                                              <span v-else style="color: #FB4246;margin-right: 10px;">支出</span>
                                                <span>{{item.totalMoney/100}}元</span>
                                            </div>
                                            <div class="f-fr title-right">
                                                <!-- <span style="color:#FFA036"></span> -->
                                                <span v-if="!showList[index].show" @click="listShow(index)" class="cursor" style="color:#0A87F8;margin-left:20px;">查看明细
                                                    <icon-font style="margin-left:10px;font-size:14px;" type="iconyumengtubiao_jiantouxiangyou" />
                                                </span>
                                                <span v-else @click="listShow(index)" class="cursor" style="color:#0A87F8;margin-left:20px;"> 收起
                                                    <icon-font style="margin-left:10px;font-size:14px;" type="iconyumengtubiao_jiantouxiangxia" />
                                                </span>
                                            </div>
                                        </div>
                                        <div class="item-info" :style="index==feeFlowList.length-1?'border-left: none;':''">
                                            <div class="item-info-top">支付备注：
                                                <span>{{item.paymentNote?item.paymentNote:'-'}}</span>
                                            </div>
                                            <div class="item-info-top f-clearfix" style="padding-bottom:10px;">
                                                <div class="f-fl">支付凭证：</div>
                                                <div class="f-fl showImg f-clearfix">
                                                    <div class="f-fl cursor" v-for="(img,i) in item.payVoucherList" :key="i">
                                                        <div @click="handlePreview(img)"><img :src="img.small" alt=""></div>
                                                    </div>
                                                    <span v-if="!item.payVoucherList||item.payVoucherList.length==0">-</span>
                                                </div>
                                            </div>
                                            <div class="info-item-info" v-if="showList[index].show">
                                                <p>明细</p>
                                                <ul class="f-clearfix">
                                                    <li class="f-fl" v-for="(res,i) in item.flowItemList" :key="i">{{res.feeSubjectName}} {{res.amount/100}}元</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="auditStatus" v-if="item.auditStatus==9">
                                            <img src="../../../assets/workflow/pass.png" style="width: 80px;height: 80px;">
                                        </div>
                                        <div class="auditStatus" v-if="item.auditStatus==5">
                                            <img src="../../../assets/workflow/reject.png" style="width: 80px;height: 80px;">
                                        </div>
                                        <div class="auditStatus" v-if="item.auditStatus==6">
                                            <img src="../../../assets/workflow/back.png" style="width: 80px;height: 80px;">
                                        </div>
                                    </div>
                                </div>
                                <a-empty v-show="!feeFlowList.length" style="margin-top:80px;"/>
                            </div>
                            <!-- </div> -->
                        </div>

              
            </div>
        </div>
        
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      
    </div>
</template>

<script>
import { listByBillId } from '@/api/bill';
export default {
    name: "openWater",
    props: {
        billId: {
            type: String
        },
        houseAlias:{
            type: String
        },
        fullAddress:{
            type: String
        }
    },
    components: {
   
    },
    data() {
        return {
            feeFlowList: [],//账单view展示DTO
            previewVisible:false,
            showList:[],
            previewImage:''

        }
    },
    created() {
        this.getBill();
    },
    mounted() {

    },
    methods: {
        getDict() {

        },
        getBill() {
            listByBillId(this.billId).then(res => {

                if (res.code === '200') {
                    this.feeFlowList = res.data;
                    if (this.feeFlowList&&this.feeFlowList.length>0) {
                        let arry = []
                        this.feeFlowList.forEach(function(e) {
                            let obj = {
                                show: false
                            }
                            arry.push(obj)
                        }, this);
                        this.showList = arry;
                    }
                    else{
                        this.feeFlowList = [];
                    }
                }
            })
        },
        listShow(index) {
            this.showList[index].show = !this.showList[index].show;
        },

        handlePreview(file) {
            this.previewImage = file.url || file.thumbUrl||file.origin;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        cancel() {
           this.$emit('closeThis', true);
        },
        
    },


}
</script>

<style scoped lang="less">
.openWater-box {
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
        height: calc(100vh - 240px);
        overflow: auto;
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
            color: #FB4246;
        }
        .color-status2 {
            color: #03C683;
        }
        .color-status3 {
            color: #777777;
        }
        .color-status4 {
            color: #0A87F8;
        }
        .tabs-content {
            padding: 20px 20px;
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
    .showImg {
        >div {
            height: 66px;
            width: 105px;
            margin-right: 10px;
            margin-bottom: 10px;
            >div{
                width: 100%;
                height: 100%;
                line-height: 66px;
                border: 1px solid #eeeeee;
                background-color: #f6f7f8;
                text-align: center;
                border-radius: 6px;
                overflow: hidden;
                img {
                    width: auto;
                    max-width: 105px;
                    height: auto;
                    max-height: 66px;
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

    .content-row {
        &>.bill-detail:nth-child(1) {
            .it-top-border {
                border-left: none!important;
            }
        }
        &>.bill-detail:nth-last-child(1) {
            .item-info {
                border: none!important;
            }
            .it-left-border {
                border-left: none!important;
            }
        }
    }
    .bill-detail {}
    .bill-status {
        width: 60px;
        margin-right: 6px;
        text-align: right;
        line-height: 20px;
        .aduit-status{
            border-radius: 2px;
            padding: 2px;
        }
        .contractAuditStatus1{
            color: #FFA036;
            background-color: fade(#FFA036, 10%);
        }
        .contractAuditStatus9{
            color: #0A87F8;
            background-color: fade(#0A87F8, 10%);
        }
        .contractAuditStatus5{
            color: #FB4246;
            background-color: fade(#FB4246, 10%);
        }
        .contractAuditStatus6{
            color: #777777;
            background-color: fade(#777777, 10%);
        }
    }
    .bill-item {
        width: calc(100% - 66px);
        position: relative;
        .auditStatus{
            position: absolute;
            right: 5px;
            top:10px;
        }
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
                margin-top:10px;
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
      .paymentMethodNameStyle{
        color: #0A87F8;
        background-color: #f0f8ff;
        padding: 3px 7px;
        margin: 0 10px;
        font-size: 13px;
        border-radius: 2px;
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
}
</style>
