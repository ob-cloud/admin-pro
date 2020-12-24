<template>
    <div class="assignment-distribution clearfix">
        <!-- 直接指派 -->
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>配货信息</b>
            </div>
            <div class="row clearfix">
                <div class="little2Label f-fl">配货地址：</div>
                <div class="labelValue f-fl">{{info.houseAlias?info.houseAlias+'/'+info.fullAddress:info.fullAddress}}</div>
            </div>
            <div class="row clearfix">
                <div class="f-fl" style="width: 242px;">
                    <span class="littleLabel">申请人信息：</span>
                    <span class="labelValue">{{info.applyName}}/{{info.applyPhone}}</span>
                </div>
                <div class="f-fl" style="width: 242px">
                    <span class="littleLabel">期望配货完成日期：</span>
                    <span class="labelValue">{{info.expectCompleteDate?$moment(info.expectCompleteDate).format('YYYY.MM.DD'):'-'}}</span>
                </div>
            </div>
            <div style="margin-top: 12px;padding-top:11px;border-top: 1px solid #EEEEEE;font-size: 14px;color: #777777;font-weight: 500;">
                配货物品
            </div>
            <div class="row clearfix" v-if="!info.distributionGoodsDTOList||info.distributionGoodsDTOList.length==0" style="margin-top: 10px;">
                -
            </div>
            <div class="row clearfix" v-if="info.distributionGoodsDTOList&&info.distributionGoodsDTOList.length>0" style="margin-top: 11px;">
                <div class="basicsInfo">
                    <div class="table">
                        <div class="table-title">
                            <div style="max-width: 121px;text-align: left;padding-left: 12px;color: #111111;">物品</div>
                            <div style="max-width: 86px;text-align: left;padding-left: 14px;color: #111111;">数量</div>
                            <div style="max-width: 272px;text-align: left;padding-left: 14px;color: #111111;">描述</div>
                        </div>
                        <div class="house-data u-no-border" v-for="(item,index) in info.distributionGoodsDTOList" :key="index">
                            <div class="clearfix" style="max-width: 121px;" >
                                <div class="house-data-item-left" style="width: 106px;padding-left:12px;">
                                    {{item.goodsName?item.goodsName:'-'}}
                                </div>
                            </div>
                            <div class="clearfix" style="max-width: 86px;">
                                <div class="house-data-item-left" style="width: 68px;padding-left: 14px;">
                                    {{item.quantity}}
                                </div>
                            </div>
                            <div class="clearfix" style="max-width: 272px;">
                                <div class="house-data-item-left" style="width: 260px;padding-left: 14px;line-height: 20px;padding-top: 8px;">
                                    {{item.promotionDesc}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row clearfix" style="margin-top: 15px;">
                <div class="little2Label f-fl" style="width: 40px">附件：</div>
                <div  class="showImg labelValue f-fl clearfix" style="width: calc(100% - 40px)">
                    <span v-if="!info.tempPicList||info.tempPicList.length==0">-</span>
                    <div class="f-fl cursor" v-for="(item,i) in info.tempPicList" :key="i">
                        <video v-if="'mp4,avi,mov'.indexOf(item.fileExt)>-1" style="width: 120px;height: 76px;border-radius: 4px" :src="item.origin" controls="controls"></video>
                        <div v-else @click="handlePreview(item.origin)"><img :src="item.origin" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="row clearfix">
                <div class="little3Label f-fl" style="width: 40px">备注：</div>
                <div class="labelValue f-fl" style="width: calc(100% - 40px)">{{info.applyComment|blankVal}}</div>
            </div>
        </div>
        <div class="ipt-box" style="margin-top: 20px;">
            <div class="titleInfo">
                <span></span>
                <b>派单信息</b>
            </div>
            <label-item title="处理人" :mustFill="true" style="margin-top:20px;width: 100%;">
                <dept-employee-tree placeholder="请选择处理人" ref="selectDeptEmp" width="310px" @selectChange="selectDept" placement="topLeft" :disableDept="true"></dept-employee-tree>
            </label-item>
            <div class="urgent"><a-checkbox @change="onChange">是否加急</a-checkbox></div>
            <label-item class="u-bottom-border" title="派单备注"  style="margin-top:30px;width: 100%;" :valLength="parData.dispatchComment.length" :maxSize="200">
                <a-textarea v-model="parData.dispatchComment" maxlength="200" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
            </label-item>
        </div>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save">
                确认
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="cancelSave">
                取消
            </a-button>
        </div>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import deptEmployeeTree from "@/components/DeptEmployeeTree/index";
import  * as API from '@/api/workorder';

export default {
    components: {
        deptEmployeeTree,
    },
    props: {
        infoData: {
            type: Object,
            required: true
        },
        assignmentType:{
            type: Number,
            default:1, //1、派单；2、改派
        },
    },
    data() {
        return {
            parData: {
                id: '',              //配货id
                dispatchComment:'', //派单备注
                handler:'',         //派单处理人
                isExpedited:0,      //是否加急
            },
            info: {},
            previewVisible:false,
            previewImage: '',
        };
    },
    created() {
        this.info = this.infoData;
    },
    methods: {
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(url) {
            this.previewImage = url;
            this.previewVisible = true;
        },
        //选择负责人
        selectDept(selectObj) {
            this.parData.handler = selectObj.id;
        },
        //是否加急
        onChange(e) {
            if(e.target.checked){
                this.parData.isExpedited = 1;
            }
            else{
                this.parData.isExpedited = 0;
            }
        },
        save() {
            if (!this.parData.handler) {
                this.$message.warning('请选择处理人！');
                return;
            }
            let data = this.infoData;
            let goodsTemp = [];
            this.infoData.distributionGoodsDTOList.forEach((item)=>{
                let good = Object.assign({},item);
                if(item.goodIds){
                    let goodTypes = item.goodIds.split('-');
                    good.goodsType = goodTypes[0];
                    good.goodsSubType = goodTypes[1];
                }
                goodsTemp.push(good);
            });
            this.infoData.distributionGoodsList = goodsTemp;
            data.dispatchComment = this.parData.dispatchComment;
            data.handler = this.parData.handler;
            data.isExpedited = this.parData.isExpedited;
            let parameter = JSON.parse(JSON.stringify(data));
            let title = '';
            if(this.assignmentType == 2){
                title = '改派';
            }else{
                title = '派单';
            }
            //图片处理
            let faultPicList = data.tempPicList;
            if(faultPicList && faultPicList.length > 0) {
                let faultPicIdList = [];
                faultPicList.forEach((val, i) => {
                    faultPicIdList.push(val.id)
                })
                parameter.faultPicIdList = faultPicIdList;
            }
            API.distributionAddDispatch(parameter).then(res => {
                if (res.code === "200") {
                    this.$message.success(title + '成功！');
                    this.$emit('refreshPage');
                } else {
                    this.$message.error( title + '失败！');
                }
            })
        },
        cancelSave() {
            this.$emit('cancelSave');
        }
    },
    filters: {
        blankVal(val){
            if(!val){
                return '-';
            }else{
                return  val;
            }
        },
    },
    watch: {
    }
};
</script>

<style lang="less" scoped>
.assignment-distribution {
    width: 100%;
    font-size: 14px; // padding: 1px 20px 0 20px;
    position: relative;
    max-height: calc(100vh - 90px);
    overflow-y: auto;
    overflow-x: hidden;
    .titleInfo{
        font-size:18px;
        font-weight:500;
        color: #111111;
    }
    .cont {
        margin-top: 10px;
        width: 100%;
        padding: 10px 20px 10px 20px;
        width:520px;
        background:rgba(245,247,254,1);
        .row {
            display: flex;
            margin-top: 12px;
            font-size: 12px;
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
        .basicsInfo{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .item{
                display: flex;
                justify-content: flex-start;
                margin-right: 15px;
                .left{
                    width:174px;
                    height:58px;
                    background:rgba(250,250,250,1);
                    .left-top{
                        margin-top: 4px;
                        margin-left: 4px;
                        .name{
                            color: #777777;
                            font-size: 12px;
                        }
                        .mustFill{
                            margin-left: 2px;
                            color: #FB4246;
                        }
                    }
                    .left-bottom{
                        margin-left: 4px;
                        margin-top: 5px;
                        color: #BBBBBB;
                        position: relative;
                        font-size: 13px;
                        .man-style{
                            font-size: 12px;
                            position: absolute;
                            right: 33px;
                            top:1px;
                        }
                        .woman-style{
                            font-size: 12px;
                            position: absolute;
                            right: 5px;
                            top:1px;
                        }
                    }
                }
                .right{
                    width:72px;
                    height:58px;
                    background:rgba(246,247,251,1);
                    border-top-right-radius: 2px;
                    border-bottom-right-radius: 2px;
                    display: flex;
                    flex-direction:column;
                    justify-content : center;
                    .secondLine{
                        i{
                            vertical-align: -0.1em !important;
                        }
                    }
                    .mustFillFont{
                        color: #777777;
                        font-size: 12px;
                        text-align: left;
                        margin-left: 6px;
                        i{
                            vertical-align: -0.2em;
                        }
                        svg{
                            width: 12px;
                            height: 12px;
                        }
                        .unEditStyle{
                            margin-right: 2px;
                            color: #BBBBBB;
                        }
                        .editStyle{
                            margin-right: 2px;
                            color: #777777;
                        }
                        .notChangeStyle{
                            margin-right: 2px;
                            color: #DDDDDD;
                        }
                        .selectStyle{
                            color: #0A87F8;
                        }
                    }
                    .margin-top-3{
                        margin-top: 3px;
                    }
                }
                .blankBg{
                    background-color: #FFFFFF !important;
                }
                .bottomBlankBg{
                    background-color: #FFFFFF !important;
                    border-bottom: 1px solid rgba(221,221,221,1);
                }
            }
            .margin-top-13{
                margin-top: 13px;
            }
            .margin-top-25{
                margin-top: 25px;
            }
            .table{
                width: 880px;
                border-left: 1px solid #DDDDDD;
                border-top: 1px solid #DDDDDD;
                font-size: 12px;
                .table-title{
                    display: flex;
                    color: #666666;
                    & > div {
                        flex: 1;
                        height: 36px;
                        line-height: 36px;
                        border-right: 1px solid #DDDDDD;
                        border-bottom: 1px solid #DDDDDD;
                    }
                    .mustFill{
                        margin-left: 2px;
                        color: #FB4246;
                    }
                }
                .house-data {
                    display: flex;
                    & > div {
                        display: flex;
                        align-items: center;
                        flex: 1;
                        text-align: left;
                        border-right: 1px solid #DDDDDD;
                        border-bottom: 1px solid #DDDDDD;
                    }
                }
            }
            .add-subject-style{
                width: 104px;
                height: 38px;
                line-height: 38px;
                font-size: 14px;
                border-radius:4px;
                border:1px solid rgba(10,135,248,1);
                text-align: center;
                color: #0A87F8;
                i{
                    vertical-align: 0em;
                    margin-right: 4px;
                }
                svg{
                    width: 12px;
                    height: 12px;
                }
            }
            .continueAddStyle{
                font-size: 14px;
                color: #0A87F8;
                text-align: center !important;
                i{
                    vertical-align: 0em;
                    margin-right: 8px;
                }
                svg{
                    width: 12px;
                    height: 12px;
                }
            }
        }
    }
    .ipt-box {
        padding: 0 20px 40px 20px;
        position: relative;
        .urgent{
            position: absolute;
            right: 60px;
            top:78px;
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
    .address {
        display: flex; // width: calc(50% - 15px);
        width: 100%;
        .must-fill-border {
            & /deep/ .ant-select-selection {
                border-bottom: 1px solid red;
            }
        }
    }
    .littleLabel {
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    .little2Label {
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    .little3Label {
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    // 详情类右侧字段值
    .labelValue {
        color: #000;
    }
}
</style>
