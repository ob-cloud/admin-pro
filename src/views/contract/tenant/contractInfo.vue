<template>
    <div class="contractInfo-box">
        <div>
            <div class="input-info">
                <label-item class="item" title="合同编号" :skeletonLoading="skeletonLoading">
                    <span>{{renterContractViewDTO.contractNo ? renterContractViewDTO.contractNo : '-'}}</span>
                </label-item>
                <label-item class="item" title="签约类型" :skeletonLoading="skeletonLoading">
                    <span>{{renterContractViewDTO.signTypeName}}</span>
                </label-item>
                <label-item class="item" title="合同类型" :skeletonLoading="skeletonLoading" style="width:239px;margin: 0 0 20px 0">
                    <span>{{renterContractViewDTO.contractMediumName}}合同</span>
                    <span v-if="renterContractViewDTO.isCertified == 1" style="color:#0A87F8"> (已认证)</span>
                    <a class="viewStyle" style="color:#0A87F8;font-size:12px;margin-left:6px;" @click="_preview" v-if="renterContractViewDTO.contractMedium == 2">
                        <icon-font style="font-size:16px;" type="iconyumengtubiao_yanjing-1" /> 查看电子合同</a>

                </label-item>
                <label-item class="item" title="合同周期" :skeletonLoading="skeletonLoading">
                    <span>{{$moment(renterContractViewDTO.beginTime).format('YYYY.MM.DD')}}-{{$moment(renterContractViewDTO.endTime).format('YYYY.MM.DD')}}</span>

                </label-item>
                <label-item class="item" title="租金" :skeletonLoading="skeletonLoading">
                    <span>{{renterContractViewDTO.price/100}}</span> 元/月
                </label-item>
                <label-item class="item" title="押金" :skeletonLoading="skeletonLoading">
                    <span>{{renterContractViewDTO.deposit/100}}</span> 元
                </label-item>
                <label-item class="item" title="付款方式" :skeletonLoading="skeletonLoading">
                  <span v-if="renterContractViewDTO.periodMonth===99">一次性付</span>
                  <span v-else>押 {{renterContractViewDTO.depositMonth===90?'自定义':renterContractViewDTO.depositMonth}} 付 {{renterContractViewDTO.periodMonth}}</span>
                </label-item>
                <label-item class="item" title="收租日设置" :skeletonLoading="skeletonLoading">
                    <span v-if="renterContractViewDTO.payPattern == 1">提前{{renterContractViewDTO.payPatternValue}}天收租</span>
                    <span v-else-if="renterContractViewDTO.payPattern == 2">固定{{renterContractViewDTO.payPatternValue}}号收租(每期第一个月)</span>
                    <span v-else>固定{{renterContractViewDTO.payPatternValue}}号收租((每期提前一个月）)</span>

                </label-item>
                <label-item class="item" title="合同补充说明" style="width: 100%" :skeletonLoading="skeletonLoading">
                    <span>{{renterContractViewDTO.addExplanation? renterContractViewDTO.addExplanation : '-'}}</span>
                </label-item>
                <label-item class="item" style="width: 100%" title="附件信息" :skeletonLoading="skeletonLoading">
                    <div class="showImg f-clearfix">
                        <div class="f-fl showImgFile cursor" v-for="(item,i) in renterContractViewDTO.fileDTOList" :key="i">
                            <div @click="handlePreview(item)" v-if="(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')"><img :src="item.small" alt=""></div>
                            <div @click="previewPdf(item.origin)" v-if="item.origin.indexOf('pdf') != -1"><img src="https://oss.byteox.com/byteox/2020-07-07/d62c91badfc94f61867bb77f8d4e21d4.png" alt=""></div>
                            <div class="bottom-name-style overHidde" v-if="item.origin.indexOf('pdf') != -1">{{item.fileOriginName}}</div>
                        </div>
                        <span v-if="!renterContractViewDTO.fileDTOList || renterContractViewDTO.fileDTOList.length == 0">-</span>
                    </div>
                </label-item>
                <label-item class="item item-title" title="" style="color: #111111">
                    签约信息
                </label-item>
                <label-item class="item" title="所属门店(部门)" :skeletonLoading="skeletonLoading">
                  <span>{{renterContractViewDTO.deptName|noInfo}}</span>
                </label-item>
                <label-item class="item" title="维护人" :skeletonLoading="skeletonLoading">
                    <span>{{renterContractViewDTO.maintainerName|noInfo}}</span>
                </label-item>
                <label-item class="item" title="签约人" :skeletonLoading="skeletonLoading">
                    <span>{{renterContractViewDTO.signEmpName}}</span>
                </label-item>
                <label-item class="item" title="签约时间" :skeletonLoading="skeletonLoading">
                    <span>{{$moment(renterContractViewDTO.signTime).format('YYYY.MM.DD')}}</span>

                </label-item>
                <label-item v-if="renterContractViewDTO.status ==6||renterContractViewDTO.status ==7" class="item item-title" title="">
                    退租信息
                </label-item>
                <label-item v-if="renterContractViewDTO.status ==6||renterContractViewDTO.status ==7" class="item" title="退租日期" :skeletonLoading="skeletonLoading">
                    <span>{{$moment(renterContractViewDTO.quiteDate).format('YYYY.MM.DD')}}</span>
                </label-item>
                <label-item v-if="renterContractViewDTO.status ==6||renterContractViewDTO.status ==7" class="item" title="退租原因" :skeletonLoading="skeletonLoading">
                    <span>{{renterContractViewDTO.quiteReasonName|noInfo}}</span>
                </label-item>
              <label-item style="width: 400px;" v-if="renterContractViewDTO.status ==6||renterContractViewDTO.status ==7" class="item" title="退租租客收付款账号" :skeletonLoading="skeletonLoading">
                <span>{{renterContractViewDTO.paymentType|formatPaymentType}}/{{renterContractViewDTO.paymentNo|noInfo}}{{renterContractViewDTO.bank?'/' + renterContractViewDTO.bank:''}}</span>
              </label-item>
                <label-item style="width: 100%" v-if="renterContractViewDTO.status ==6||renterContractViewDTO.status ==7" class="item" title="解约备注" :skeletonLoading="skeletonLoading">
                    <span>{{renterContractViewDTO.quiteComment|noInfo}}</span>
                </label-item>
              <label-item class="item" v-if="renterContractViewDTO.status ==6||renterContractViewDTO.status ==7" style="width: 100%" title="退租凭证" :skeletonLoading="skeletonLoading">
                <div class="showImg f-clearfix">
                  <div class="f-fl showImgFile cursor" v-for="(item,i) in renterContractViewDTO.breakFileDTOList" :key="i">
                    <div @click="handlePreview(item)" v-if="(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')"><img :src="item.small" alt=""></div>
                    <div @click="previewPdf(item.origin)" v-if="item.origin.indexOf('pdf') != -1"><img src="https://oss.byteox.com/byteox/2020-07-07/d62c91badfc94f61867bb77f8d4e21d4.png" alt=""></div>
                    <div class="bottom-name-style overHidde" v-if="item.origin.indexOf('pdf') != -1">{{item.fileOriginName}}</div>
                  </div>
                  <span v-if="!renterContractViewDTO.breakFileDTOList || renterContractViewDTO.breakFileDTOList.length == 0">-</span>
                </div>
              </label-item>
            </div>
            <div class="bottom">
                <span>{{renterContractViewDTO.createName}}创建于 {{$moment(renterContractViewDTO.createTime).format('lll')}}</span>
                <span>{{renterContractViewDTO.updateName}}更新于 {{$moment(renterContractViewDTO.updateTime).format('lll')}}</span>
            </div>
        </div>
        <div v-for="(item,i) in renterContractViewDTOList" :key="i" style="margin-bottom:20px;">
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
                    <label-item class="item" title="合同类型" :skeletonLoading="skeletonLoading">
                        <span>{{item.contractMediumName}}合同</span>
                        <span v-if="item.isCertified == 1"  style="color:#0A87F8"> (已认证)</span>
                        <a style="color:#0A87F8;font-size:12px;margin-left:6px;" @click="_preview" v-if="item.contractMedium == 2">
                            <icon-font style="font-size:16px;" type="iconyumengtubiao_yanjing-1" /> 查看电子合同</a>
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
                    

                    <label-item class="item" title="收租日设置" :skeletonLoading="skeletonLoading">
                        <span v-if="item.payPattern == 1">提前{{item.payPatternValue}}天收租</span>
                        <span v-else-if="item.payPattern == 2">固定{{item.payPatternValue}}号收租(每期第一个月)</span>
                        <span v-else>固定{{item.payPatternValue}}号收租((每期提前一个月）)</span>

                    </label-item>
                    
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
                        <span>{{item.maintainerName|noInfo}}</span>
                    </label-item>
                    <label-item class="item" title="签约人" :skeletonLoading="skeletonLoading">
                        <span>{{item.signEmpName|noInfo}}</span>
                    </label-item>
                    <label-item class="item" title="签约时间" :skeletonLoading="skeletonLoading">
                        <span>{{$moment(item.signTime).format('YYYY.MM.DD')}}</span>

                    </label-item>
                </div>
                <div class="bottom" v-show="showList[i].show">
                    <span>{{item.createName}}创建于 {{$moment(item.createTime).format('lll')}}</span>
                    <span>{{item.updateName}}更新于 {{$moment(item.updateTime).format('lll')}}</span>
                </div>
            </div>

        </div>
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import { tenantContractDetail, listEnableDict, signerEdit, checkCard, getEcontractInfo } from '@/api/contract'
export default {
    name: "contractInfo",
    props: {
        renterContractViewDTO: {
            type: Object
        },
        renterContractViewDTOList: {
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

        if (this.renterContractViewDTOList) {
            let arry = []
            this.renterContractViewDTOList.forEach(function(e) {
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
        _preview() {
            getEcontractInfo(this.renterContractViewDTO.id).then(res => {
                // console.log(res)
                if (res.data != '') {
                    window.open(res.data);

                } else {
                    this.$message.error('电子合同暂时无法预览!');
                }
            })
        }
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
        },
      formatPaymentType(val){
          if(val==1){
            return '银联';
          }
          else if(val==2){
            return '支付宝';
          }
          else if(val==3){
            return '微信';
          }
          else{
            return '-';
          }
      }
    },
}
</script>

<style scoped lang="less">
.contractInfo-box {
    .input-info {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .item {
            margin: 0 39px 20px 0;
            width: 200px;
            .viewStyle{
                i{
                    vertical-align:-0.25em;
                }
            }
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
            font-weight: 500;
            font-size: 15px;
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
