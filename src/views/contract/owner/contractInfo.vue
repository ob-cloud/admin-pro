<template>
    <div class="contractInfo-owner-box">
        <div>
            <div class="input-info">
                <label-item class="item" title="合同编号" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.contractNo ? ownerContractViewDTO.contractNo : '-'}}</span>
                </label-item>
                <label-item class="item" title="签约类型" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.signTypeName? ownerContractViewDTO.signTypeName: '-'}}</span>
                </label-item>
   
                <label-item class="item" title="合同周期" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.beginTime?$moment(ownerContractViewDTO.beginTime).format('YYYY.MM.DD'):'-'}}-{{ownerContractViewDTO.endTime?$moment(ownerContractViewDTO.endTime).format('YYYY.MM.DD'):'-'}}</span>
                </label-item>
                <label-item class="item" title="租金" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.price/100}}</span> 元/月
                </label-item>
                <label-item class="item" title="押金" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.deposit/100}}</span> 元
                </label-item>
                <label-item class="item" title="付款方式" :skeletonLoading="skeletonLoading">
                    <span v-if="ownerContractViewDTO.depositMonth=== 90 && ownerContractViewDTO.periodMonth=== 99">一次性付</span>
                    <span v-else-if="ownerContractViewDTO.depositMonth!= 90&&ownerContractViewDTO.periodMonth=== 99">一次性付</span>
                    <span v-else-if="ownerContractViewDTO.depositMonth=== 90&&ownerContractViewDTO.periodMonth!= 99">押 {{ownerContractViewDTO.deposit?ownerContractViewDTO.deposit/100:'-'}} 付{{ownerContractViewDTO.periodMonth|noInfo}}</span>
                    <span v-else>押 {{ownerContractViewDTO.depositMonth|noInfo}} 付 {{ownerContractViewDTO.periodMonth|noInfo}}</span>
                </label-item>
                <label-item class="item" title="免租期" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.freeDays}}天</span>
                </label-item>
                <label-item class="item" title="付款日设置" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.payPattern == 1? '提前' : '固定'}}{{ownerContractViewDTO.payPatternValue|noInfo}}{{ownerContractViewDTO.payPattern == 1? '天' : '号'}}付款</span>
                </label-item>
                <!-- <label-item class="item" title="签约人">
                    <span>{{ownerContractViewDTO.signEmpName}}</span>
                </label-item>
                <label-item class="item" title="签约时间">
                    <span>{{$moment(ownerContractViewDTO.signTime).format('YYYY.MM.DD')}}</span>
                </label-item> -->
                <label-item class="item" title="合同补充说明" style="width: 100%" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.addExplanation? ownerContractViewDTO.addExplanation : '-'}}</span>
                </label-item>

                <label-item class="item" style="width: 100%" title="附件信息" :skeletonLoading="skeletonLoading">
                    <div class="showImg f-clearfix">
                        <div class="f-fl showImgFile cursor" v-for="(item,i) in ownerContractViewDTO.fileDTOList" :key="i">
                            <div @click="handlePreview(item)" v-if="(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')"><img :src="item.small" alt=""></div>
                            <div @click="previewPdf(item.origin)" v-if="item.origin.indexOf('pdf') != -1"><img src="https://oss.byteox.com/byteox/2020-07-07/d62c91badfc94f61867bb77f8d4e21d4.png" alt=""></div>
                            <div class="bottom-name-style overHidde" v-if="item.origin.indexOf('pdf') != -1">{{item.fileOriginName}}</div>
                        </div>
                        <span v-if="!ownerContractViewDTO.fileDTOList || ownerContractViewDTO.fileDTOList.length == 0">-</span>
                    </div>
                </label-item>
                <label-item class="item item-title" title="" style="color: #111111">
                    签约信息
                </label-item>
                <label-item class="item" title="所属门店(部门)" :skeletonLoading="skeletonLoading">
                  <span>{{ownerContractViewDTO.deptName|noInfo}}</span>
                </label-item>
                <label-item class="item" title="维护人" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.maintainerName|noInfo}}</span>
                </label-item>
                <label-item class="item" title="签约人" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.signEmpName|noInfo}}</span>
                </label-item>
                <label-item class="item" title="签约时间" :skeletonLoading="skeletonLoading">
                    <span>{{$moment(ownerContractViewDTO.signTime).format('YYYY.MM.DD')}}</span>
                </label-item>
                <label-item v-if="ownerContractViewDTO.status ==6||ownerContractViewDTO.status ==5" class="item item-title" title="">
                    退租信息
                </label-item>
                <label-item v-if="ownerContractViewDTO.status ==6||ownerContractViewDTO.status ==5" class="item" title="退租日期" :skeletonLoading="skeletonLoading">
                    <span>{{$moment(ownerContractViewDTO.quiteDate).format('YYYY.MM.DD')}}</span>
                </label-item>
                <label-item v-if="ownerContractViewDTO.status ==6||ownerContractViewDTO.status ==5" class="item" title="退租原因" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.quiteReasonName|noInfo}}</span>
                </label-item>
                <label-item v-if="ownerContractViewDTO.status ==6||ownerContractViewDTO.status ==5" class="item" title="退租备注" style="width: 100%" :skeletonLoading="skeletonLoading">
                    <span>{{ownerContractViewDTO.quiteComment|noInfo}}</span>
                </label-item>
            </div>
            <div class="bottom">
                <span>{{ownerContractViewDTO.createName|noInfo}}创建于 {{$moment(ownerContractViewDTO.createTime).format('lll')}}</span>
                <span>{{ownerContractViewDTO.updateName|noInfo}}更新于 {{$moment(ownerContractViewDTO.updateTime).format('lll')}}</span>
            </div>
        </div>
        <div v-for="(item,i) in ownerContractViewDTOList" :key="i" style="margin-bottom:20px;">
            <div class="big-box">
                <div class="listContract f-clearfix">
                    <p class="f-fl listOne">第{{i+1}}次签约</p>
                    <P class="f-fr listTress cursor" @click="listShow(i)">
                        <span v-if="!showList[i].show">展开
                            <icon-font style="margin-left:10px;font-size:14px;" type="iconyumengtubiao_jiantouxiangyou" />
                        </span>
                        <span v-else> 收起
                            <icon-font style="margin-left:10px;font-size:14px;" type="iconyumengtubiao_jiantouxiangxia" />
                        </span>
                    </P>
                    <p class="f-fr listTwo">租期：{{item.signPeriod}}({{$moment(item.beginTime).format('YYYY.MM.DD')}}~{{$moment(item.endTime).format('YYYY.MM.DD')}})</p>
                </div>
                <div class="input-info listContract-box" v-show="showList[i].show">
                    <label-item class="item" title="合同编号" :skeletonLoading="skeletonLoading">
                        <span>{{item.contractNo ? item.contractNo : '-'}}</span>
                    </label-item>
                    <label-item class="item" title="签约类型" :skeletonLoading="skeletonLoading">
                        <span>{{item.signTypeName}}</span>
                    </label-item>
    
                    <label-item class="item" title="合同周期" :skeletonLoading="skeletonLoading">
                        <span>{{$moment(item.beginTime).format('YYYY.MM.DD')}}-{{$moment(item.endTime).format('YYYY.MM.DD')}}</span>

                    </label-item>
                    <label-item class="item" title="租金" :skeletonLoading="skeletonLoading">
                        <span>{{item.price/100}}</span> 元/月
                    </label-item>
                    <label-item class="item" title="押金" :skeletonLoading="skeletonLoading">
                        <span>{{item.deposit/100}}</span> 元
                    </label-item>
                    <label-item class="item" title="付款方式" :skeletonLoading="skeletonLoading">
                        <span v-if="item.depositMonth=== 90 && item.periodMonth=== 99">一次性付</span>
                        <span v-else-if="item.depositMonth!= 90&&item.periodMonth=== 99">一次性付</span>
                        <span v-else-if="item.depositMonth=== 90&&item.periodMonth!= 99">押 {{item.deposit/100}} 付{{item.periodMonth}}</span>
                        <span v-else>押 {{item.depositMonth}} 付 {{item.periodMonth}}</span>
                    </label-item>
                    <label-item class="item" title="免租期" :skeletonLoading="skeletonLoading">
                        <span>{{item.freeDays}}天</span>
                    </label-item>
                    <label-item class="item" title="付款日设置" :skeletonLoading="skeletonLoading">
                        <span>{{item.payPattern == 1? '提前' : '固定'}}{{item.payPatternValue}}{{item.payPattern == 1? '天' : '号'}}付款</span>
                    </label-item>
                    <!-- <label-item class="item" title="签约人">
                        <span>{{item.signEmpName}}</span>

                    </label-item>
                    <label-item class="item" title="签约时间">
                        <span>{{$moment(item.signTime).format('YYYY.MM.DD')}}</span>

                    </label-item> -->
                    <label-item class="item" title="合同补充说明" style="width: 100%" :skeletonLoading="skeletonLoading">
                        <span>{{item.addExplanation? item.addExplanation : '-'}}</span>
                    </label-item>

                    <label-item class="item" style="width: 100%" title="附件信息" :skeletonLoading="skeletonLoading">
                        <div class="showImg f-clearfix">
                            <div class="f-fl showImgFile cursor" v-for="(item,i) in item.fileDTOList" :key="i">
                                <div @click="handlePreview(item)" v-if="(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')"><img :src="item.small" alt=""></div>
                                <div @click="previewPdf(item.origin)" v-if="item.origin.indexOf('pdf') != -1"><img src="https://oss.byteox.com/byteox/2020-07-07/d62c91badfc94f61867bb77f8d4e21d4.png" alt=""></div>
                                <div class="bottom-name-style overHidde" v-if="item.origin.indexOf('pdf') != -1">{{item.fileOriginName}}</div>
                            </div>
                            <span v-if="!item.fileDTOList || item.fileDTOList.length == 0">-</span>
                        </div>
                    </label-item>
                    <label-item class="item item-title" title="">
                        签约信息
                    </label-item>
                    <label-item class="item" title="维护人" :skeletonLoading="skeletonLoading">
                        <span>{{item.maintainerName}}</span>
                    </label-item>
                    <label-item class="item" title="签约人" :skeletonLoading="skeletonLoading">
                        <span>{{item.signEmpName}}</span>
                    </label-item>
                </div>
                <div class="bottom" v-show="showList[i].show">
                    <span>{{item.createName}}创建于 {{$moment(item.createTime).format('lll')}}</span>
                    <span>{{item.updateName}}更新于 {{$moment(item.updateTime).format('lll')}}</span>
                </div>
            </div>

        </div>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import { listEnableDict } from '@/api/contract'
export default {
    name: "contractInfo",
    props: {
        ownerContractViewDTO: {
            type: Object
        },
        ownerContractViewDTOList: {
            type: Array
        },
        skeletonLoading:{
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            previewVisible: false,
            previewImage: '',
            showList: []
        }
    },
    created() {
        if (this.ownerContractViewDTOList) {
            let arry = []
            this.ownerContractViewDTOList.forEach(function(e) {
                let obj = {
                    show: false
                }
                arry.push(obj)
            }, this);
            this.showList = arry;
        }
    },
    methods: {
        getDict() {
            // 客户来源
            listEnableDict('add63a4f45ba444e8ca3c57ec4193a35').then(res => {
                this.channelList = res.data;
            });
            // 爱好
            listEnableDict('aa0d5464605944538c06b01ef8a0a2ff').then(res => {
                this.hobbyList = res.data;
            });
        },
        handlePreview(file) {
            this.previewImage = file.url || file.origin;
            this.previewVisible = true;
        },
        previewPdf(url){
            window.open(url)
        },
        handleCancel() {
            this.previewVisible = false;
        },
        listShow(index) {
            this.showList[index].show = !this.showList[index].show;
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
    }

}
</script>

<style scoped lang="less">
.contractInfo-owner-box {
    .input-info {
        width: 100%;
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
                .showImgFile {
                    height: 76px;
                    width: 120px;
                    margin-right: 10px;
                    position: relative;
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
                    .bottom-name-style{
                        position: absolute;
                        width: 100%;
                        bottom: 0px;
                        height:22px;
                        line-height: 22px;
                        color: #777777;
                        background:rgba(0,0,0,0.1);
                        text-align: center;
                        padding: 0 5px;
                        border-radius:0  0  4px  4px;
                    }
                }
                >div:last-child{
                    margin-right: 0px;
                }
            }
        }
        .item-title{
            width: 100%;
            margin-bottom: 6px;
            font-size: 15px;
            font-weight: 500;
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
    .bottom {
        // padding: 0 20px;
        height: 50px;
        line-height: 50px;
        border-top: 1px dashed#DDDDDD;
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
    .big-box {
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 4px;
        .listContract-box {
            background: rgba(252, 252, 255, 1); // border-radius: 4px;
            // border: 1px solid rgba(238, 238, 238, 1);
            padding: 0 10px; // border-top: none;
            .item {
                margin: 0 32px 20px 0;
            }
            
        }
        .listContract {
            width: 100%;
            height: 40px;
            background: rgba(245, 247, 254, 1);
            border-radius: 4px;

            >p {
                line-height: 40px;
            }
            .listOne {
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(17, 17, 17, 1);
                margin-left: 10px;
            }
            .listTwo {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(119, 119, 119, 1);
                margin-right: 40px;
            }
            .listTress {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(10, 135, 248, 1);
                margin-right: 10px;
            }
        }
        .bottom {
            margin: 0 10px;
        }
    }
}
</style>
