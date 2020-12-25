<template>
    <div class="ownerDetails-box clearfix">
        <div class="child-detail f-fl">
            <div class="house-address">
                <span>房源地址：</span>
                <span v-if="ownerContractViewDTO.houseAlias">{{ownerContractViewDTO.houseAlias}} /</span> {{ownerContractViewDTO.cityName}}{{ownerContractViewDTO.areaName}}{{ownerContractViewDTO.fullAddress}}
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
                    <span style="margin-top: 9px" class="radius-font status2" v-if="!skeletonLoading"><icon-font type="iconyumengtubiao_jiaosequanxian" /></span>
                    <div>
                        <label-item title="业主信息">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div class="statusColor2" v-if="!skeletonLoading">{{contractSigner.name?contractSigner.name:'-'}} - {{contractSigner.phone?contractSigner.phone:'-'}}</div>
                        </label-item>
                    </div>
                </div>

                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:140px">
                        <span style="margin-top: 7px" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <label-item title="租金" :skeletonLoading="skeletonLoading">
                            <div>{{ownerContractViewDTO.price?ownerContractViewDTO.price/100 :'-'}} 元/月</div>
                        </label-item>
                    </div>
              
                    <div class="item" style="width:140px">
                        <span style="margin-top: 7px" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_yinhangka" />
                        </span>
                        <label-item title="付款方式" :skeletonLoading="skeletonLoading">
                            <div>
                                <span v-if="ownerContractViewDTO.depositMonth=== 90 && ownerContractViewDTO.periodMonth=== 99">一次性付</span>
                                <span v-else-if="ownerContractViewDTO.depositMonth!= 90&&ownerContractViewDTO.periodMonth=== 99">一次性付</span>
                                <span v-else-if="ownerContractViewDTO.depositMonth=== 90&&ownerContractViewDTO.periodMonth!= 99">押 {{ownerContractViewDTO.deposit?ownerContractViewDTO.deposit/100:'-'}} 付{{ownerContractViewDTO.periodMonth?ownerContractViewDTO.periodMonth:'-'}}</span>
                                <span v-else>押 {{ownerContractViewDTO.depositMonth? ownerContractViewDTO.depositMonth:'-'}} 付 {{ownerContractViewDTO.periodMonth?ownerContractViewDTO.periodMonth :'-'}}</span>
                            </div>
                        </label-item>
                    </div>
                    <div class="item" style="width:240px">
                        <span style="margin-top: 7px" class="radius-font  radius-font-greed">
                            <icon-font type="icon-yumengtubiao_riqi" />
                        </span>
                        <label-item title="租期" :skeletonLoading="skeletonLoading">
                            <div>{{ownerContractViewDTO.beginTime?$moment(ownerContractViewDTO.beginTime).format('YYYY.MM.DD') :'-'}}-{{ownerContractViewDTO.endTime?$moment(ownerContractViewDTO.endTime).format('YYYY.MM.DD'):'-'}}({{ownerContractViewDTO.signPeriod|noInfo}})</div>
                        </label-item>
                    </div>
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="2" @change="handleCallback">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_gerenxinxi" /> 个人信息
                        </span>
                        <div class="basic-info">
                            <div class="input-info">
                                <label-item class="item" title="业主姓名">
                                    <span>{{contractSigner.name | noInfo}}</span>
                                </label-item>
                                <label-item class="item" title="业主电话">
                                    <span>{{contractSigner.phone| noInfo}}</span>
                                </label-item>
                                <label-item class="item" title="性别">
                                    <span>{{contractSigner.gender == 1 ?'男':'女'}}</span>
                                </label-item>
                                <label-item class="item" title="身份信息">
                                    <span>{{contractSigner.certificateType | certificate}}-{{contractSigner.certificateNo| noInfo}}</span>
                                </label-item>
                                <label-item class="item" title="紧急联系人姓名">
                                    <span>{{contractSigner.emergencyType |emergency}}-{{contractSigner.emergencyName? contractSigner.emergencyName : '-'}}</span>
                                </label-item>
                                <label-item class="item" title="紧急联系人电话">
                                    <span>{{contractSigner.emergencyPhone?contractSigner.emergencyPhone:'-'}}</span>
                                </label-item>
                                <label-item style="width: 46%;margin-right: 0px" class="item" title="收付款账号信息">
                                    <span>{{contractSigner.paymentTypeName}}{{contractSigner.paymentNo?'-'+contractSigner.paymentNo:''}}{{contractSigner.bank?'-'+contractSigner.bank:''}}{{!contractSigner.paymentTypeName&&!contractSigner.paymentNo&&!contractSigner.bank?'-':''}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;margin: 0 0 20px 0;" title="证件信息">
                                    <div class="showImg f-clearfix">
                                        <div class="f-fl cursor" v-if="imgData.small">
                                            <div @click="handlePreview(imgData)"><img :src="imgData.small" alt=""></div>
                                            <p>身份证正面</p>
                                        </div>
                                        <div class="f-fl cursor" v-if="imgData2.small">
                                            <div @click="handlePreview(imgData2)"><img :src="imgData2.small" alt=""></div>
                                            <p>身份证反面</p>
                                        </div>
                                    </div>
                                </label-item>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>{{ownerContractViewDTO.createName}}创建于 {{$moment(ownerContractViewDTO.createTime).format('lll')}}</span>
                            <span>{{ownerContractViewDTO.updateName}}更新于 {{$moment(ownerContractViewDTO.updateTime).format('lll')}}</span>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_heyue" /> 合同信息
                        </span>
                        <contract-info v-if="infoFul" :skeletonLoading="skeletonLoading" :ownerContractViewDTOList="ownerContractViewDTOList" :ownerContractViewDTO="ownerContractViewDTO"> </contract-info>
                    </a-tab-pane>
                    <a-tab-pane key="3">
                        <span slot="tab">
                            <icon-font  type="iconyumengtubiao_caiwuzhangdan" /> 账单信息
                        </span>
                        <bill-information v-if="billFun" :ownerContract="bizId" @openDetail="openDetailBill"></bill-information>
                    </a-tab-pane>
                </a-tabs>
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
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog" @cancel="cancelBillDetail">
            <bill-detail :billId="billId" ></bill-detail>
        </a-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import {
    ownerContractAuditView
} from '@/api/ownerContract.js';
import { auditInstanceView } from '@/api/workflow';
import contractInfo from '@/views/contract/owner/contractInfo';
import billInformation from '@/views/contract/owner/billInformation';
import billDetail from '@/views/finance/bill/billDetails';
import workflowDetail from './workflowDetail';
export default {
    name: "contractDetails",
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
    components: {
        contractInfo,
        billInformation,
        billDetail,
        workflowDetail,
    },
    data() {
        let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
        return {
            currentTime:currentTime,
            cancelOwnerDialog: false,
            previewVisible: false,
            previewImage: '',
            activekey: 2,
            contract: {},
            copyContract: {},
            activeIndex: 0,
            modalTitle: {
                houseId: '',
                roomId: '',
                houseAlias: '',
                address: '',
            },
            changeStatusData: {
                houseAlias: '',
                houseAddress: '',
                houseStatus: '',
                id: '',
            },
            ownerContractViewDTO: {},//租客合同view展示DTO
            ownerContractViewDTOList: [],//租客合同历史展示
            contractSigner: {},//合同租户信息查看表DTO
            contractBillViewDTO: {},//租客合同账单信息查看DTO
            contractBillViewDTOList: [], //历史账单信息
            fileDTOList: [],
            imgData: {},
            imgData2: {},
            imgData3: {},
            imgData4: [],
            infoFul:false,
            contractData:{},
            contractFul: true,
            billFun:false,
            billId:'',
            billDetailDialog:false,
            skeletonLoading:true,
            nodeList:[],
            auditStatus:undefined,
            fromTypeNew:1,
        }
    },
    created() {
        this.getContract();
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
        auditInstanceView() {
            let parameter = {
                auditInstanceId: this.auditInstanceId,
                isCcInstanceView: this.isCcInstanceView,
            };
            auditInstanceView(parameter).then(res => {
                if (res.code === '200') {
                    this.nodeList = res.data.nodeList;
                    this.auditStatus = res.data.auditStatus;
                    if(this.isCcInstanceView==1&&this.isViewed==0){
                        this.$emit('refreshinfoFun',true);
                    }
                }
            })
        },
        getContract() {
            this.skeletonLoading = true;
            ownerContractAuditView(this.bizId).then(res => {
                if (res.code === '200') {
                    let contract = res.data;
                    this.copyContract = Object.assign({}, contract);
                    this.ownerContractViewDTO = this.copyContract.ownerContractViewDTO;
                    this.ownerContractViewDTOList = this.copyContract.ownerContractViewDTOList;
                    this.contractSigner = this.copyContract.contractSigner;
                    let arry = this.copyContract.contractBillViewDTOList == null ? [] : this.copyContract.contractBillViewDTOList;
                    this.contractBillViewDTOList = [...arry];
                    this.contractBillViewDTO = Object.assign({}, this.copyContract.contractBillViewDTO);
                    this.fileDTOList = this.contractSigner.fileDTOList;
                    this.imgFun(this.fileDTOList);
                    this.infoFul =true;
                    this.billFun = true;
                }
                this.skeletonLoading = false;
            })
        },
        imgFun(res) {
            if (res != null) {
                let arr = [];
                res.forEach(function(e) {
                    if (e.subBizType == 1 && e.bizType == 2) {
                        this.imgData = e;
                    }
                    if (e.subBizType == 2 && e.bizType == 2) {
                        this.imgData2 = e;
                    }
                    if (e.subBizType == 6 && e.bizType == 2) {
                        this.imgData3 = e;
                    }
                    if(e.subBizType == 4 && e.bizType == 2){
                        arr.push(e)
                    }
                }, this);
                this.imgData4 = arr;
            }
        },
        handleCallback(val) {
            this.activekey = val;
        },
        handlePreview(file) {
            this.previewImage = file.url || file.origin;
            this.previewVisible = true;
        },
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        openDetailBill(res){
          if(res){
            this.billId = res;
            this.billDetailDialog = true;
          }
        },
        cancelBillDetail(){
            this.billDetailDialog = false;
            this.billFun = false;
            setTimeout(() => {
               this.billFun = true;
            }, 100)
        },
    },
    filters: {
        certificate(val) {
            return val == 1 ? '身份证' : val == 2 ? '护照' : val == 3 ? '港澳通行证' : val == 4 ? '台湾同胞证' : val == 5 ? '军官证' : val == 6 ? '驾驶证' : '-';
        },
        emergency(val) {
            return val == '1' ? '父母' : val == '2' ? '兄弟姐妹' : val == '3' ? '同事' : val == '4' ? '同学' : val == '5' ? '朋友' : val == '6' ? '亲属' : val == '7' ? '配偶' : val == '8' ? '其他' : '-';
        },
        noInfo(val) {
            return val ? val : '-'
        }
    },
    watch: {
    },
}
</script>

<style scoped lang="less">
.ownerDetails-box {
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
        & /deep/ .ant-tabs-nav .ant-tabs-tab {
            margin: 0 30px 0 0;
            padding: 8px 0;
        }
        height: 100%;
        overflow: auto;
        width:840px;
        position: relative;
        .auditStatus{
            position: absolute;
            right: 20px;
            top:60px;
        }
        .top {
            padding: 20px 20px 0 20px;
            // margin-bottom: 30px;
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
                    background: rgba(255, 160, 54, 0.1);
                    color: #FFA036;
                }
                .status2 {
                    background: rgba(10, 135, 248, 0.1);
                    color: #0A87F8;
                }
                .status3 {
                    background: rgba(3, 198, 131, 0.1);
                    color: #03C683;
                }
                .status4 {
                    background: rgba(159, 110, 236, 0.1);
                    color: #9F6EEC;
                }
                .status5 {
                    background: rgba(251, 66, 70, 0.1);
                    color: #FB4246;
                }
                .status6 {
                    background: rgba(119, 119, 119, 0.1);
                    color: #777777;
                }
                .status8{
                    background: rgba(3,198,131,0.1);
                    color: #03C683;
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
                    width: 170px;
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
                    width: 30px;
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
            margin-top: 30px;
            padding: 0 20px;
            .basic-info {
                // min-height: calc(100vh - 440px);
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
                        .showImg {
                            margin-bottom: 20px;
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
                        .pic{
                            .fontStyle{
                                bottom: 0px;
                                color: #777777;
                                font-size: 12px;
                                text-align: center;
                            }
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
        .bottom {
            padding: 0 0;
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
        .tabs-options {
            font-size: 0;
            cursor: pointer;
            margin-right: 0;
            div {
                display: inline-block;
                font-size: 14px;
                color: #0a87f8;
                span {
                    margin-right: 14px;
                }
            }
            div:last-child {
                span {
                    margin-right: 0;
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
                margin-right: 0;
                margin-left: 10px;
                border: 1px solid #0a87f8;
                background-color: #0a87f8;
                color: #ffffff;
            }
        }
        .active {
            border-color: @themeColor!important;
            color: @themeColor!important;
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
        .bgColorStyle{
            background:rgba(244,245,247,1);
        }
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
