<template>
    <div class="associated-info clearfix">
        <!-- 关联房源 -->
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>预定信息</b>
            </div>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">预定人：</span>
                    <span class="labelValue">{{info.name}}/
                        <span v-if="info.gender==1">男</span>
                        <span v-else-if="info.gender==2">女</span>
                        <span v-else>-</span>/{{info.phone}}</span>
                </a-col>
            </a-row>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">预定人身份信息：</span>
                    <span class="labelValue">
                        <span v-if="info.certificateType == 1">身份证</span>
                        <span v-else-if="info.certificateType == 2">护照</span>
                        <span v-else-if="info.certificateType == 3">港澳通行证</span>
                        <span v-else>台湾同胞证身份证</span>
                        / {{info.certificateNo}}</span>
                </a-col>
            </a-row>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">定金：</span>
                    <span class="labelValue">
                        <span v-if="info.moneyType == 1">现金</span>
                        <span v-else-if="info.moneyType == 2">支付宝</span>
                        <span v-else-if="info.moneyType == 3">微信</span>
                        <span v-else-if="info.moneyType == 4">转账</span>
                        <span v-else>其他</span>
                        {{info.money/100}}元
                    </span>
                </a-col>
            </a-row>
            <a-row class="row" style="border-top:1px dashed #DDDDDD;padding-top:15px;padding-bottom:15px;">
                <a-col :span="24">
                    <span class="littleLabel">原纪录房源信息：</span>
                    <span class="labelValue">
                        <span>{{info.houseAddress}}</span>
                    </span>
                </a-col>
            </a-row>

        </div>
        <div class="ipt-box">
            <label-item title="房源信息" border :mustFill="true">
                <div class="u-bottom-border address">
                    <a-select showSearch placeholder="请输入房源编号/小区地址/项目名称/门牌号信息检索房源" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" @blur="isEmpty" >
                        <a-select-option v-for="(item,index) in communityList" :key="item.houseId">{{ item.viewAddress }}</a-select-option>
                    </a-select>

                </div>
                <p v-if="errFul" class="err-p">未在系统检索到该房源</p>
            </label-item>
        </div>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save">
                确定关联
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="closeThis">
                取消
            </a-button>
        </div>
    </div>
</template>

<script>
import { searchHouse, relatedReserve, getReserveInfo } from '@/api/reserve'
export default {
    components: {
    },
    props: {
        reserveId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            nowTime: new Date().getTime(),
            roomInfo: {},
            imgList: [],
            dataInfo: {},
            errFul: false,
            communityList: [],
            mustFillBorder: false,
            parData: {
                housePid: '',
                fullAddress: '',
                houseId: '',
                id: ''              //预定ID
            },
            info: {}



        };
    },
    created() {
        this.parData.id = this.reserveId;
        this.getData();
    },
    methods: {
        getData() {
            getReserveInfo(this.reserveId).then(res => {
                if (res.code === "200") {
                    this.info = res.data;
                }
            })
        },
        selectCommunity(searchVal) {
            let data = {
                fuzzyKeyword: searchVal,
                useBiz:1,
            }
            searchHouse(data).then(res => {
                if (res.code == "200") {
                    if (res.data.length > 0) {
                        this.communityList = res.data;
                        this.errFul = false;
                    } else {
                        this.communityList = [];
                        this.errFul = true;
                    }
                }

            })
        },
        isEmpty(res) {
            if (!this.parData.houseId) {
                this.mustFillBorder = true
            } else {
                this.mustFillBorder = false
            }
        },
        getCommunity(communityId) {
            this.parData.houseId = communityId;
            this.mustFillBorder = false;
            this.communityList.forEach(function(e) {
                if (e.houseId == communityId) {
                    this.parData.fullAddress = e.fullAddress;
                    this.parData.housePid = e.housePid
                }
            }, this);
        },
        save() {
            if (!this.parData.houseId) {
                this.mustFillBorder = true;
                this.$message.warning('请输入房源地址！');
                return;
            }
            let data = JSON.parse(JSON.stringify(this.parData));
            relatedReserve(data).then(res => {
                // console.log(res)
                if (res.code === "200") {
                    this.$message.success('操作成功！');
                    this.$emit('saveSuccess', true);
                    // this.info = res.data;
                }
            })

        },
        closeThis() {
            this.$emit('closeThis', true);
        }
    },
    filters: {
        formatTime: function(value) {
            if (!value) return '';
            value = getDateHaoMiao(value);
            return value;
        }
    },
    watch: {
        dataInfo(n) {
            // console.log('111111111111', this.dataInfo);
        }
    }
};
</script>

<style lang="less" scoped>
// @import url("../../../assets/css/color.less");
.associated-info {
    height: 100%;
    width: 100%;
    font-size: 14px; // padding: 1px 20px 0 20px;
    position: relative;
    .cont {
        // height: calc(100% - 70px);
        // overflow-y: auto;
        margin-top: 10px;
        width: 100%;
        padding: 15px 20px 0 20px;
        margin-bottom: 30px; // height:194px;
        background: rgba(245, 247, 254, 1);
        .row {
            margin-top: 15px;
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
    .address {
        display: flex; // width: calc(50% - 15px);
        width: 100%;
        .must-fill-border {
            & /deep/ .ant-select-selection {
                border-bottom: 1px solid red;
            }
        }
        & /deep/ .ant-select-selection .ant-select-selection__rendered{
            margin-left: 0;
        }
    }
    .littleLabel {
        width: 112px; // color: #666666;
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    // 详情类右侧字段值
    .labelValue {
        color: #000;
    }
}
</style>
