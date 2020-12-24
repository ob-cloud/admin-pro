<template>
    <div class="invalid-info clearfix">
        <!-- 作废信息 -->
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>预定信息</b>
            </div>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">房源地址：</span>
                    <span class="labelValue">
                        <span v-if="info.houseAlias">{{info.houseAlias}}/</span>{{info.houseAddress}}</span>

                </a-col>
            </a-row>
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
            <a-row class="row" style="padding-bottom:15px;">
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

        </div>
        <div class="ipt-box">
            <label-item class="item u-bottom-border" border style="width: 100%" title="作废原因" :valLength="parData.obsoleteReason.length" :maxSize="200">
                <a-textarea v-model="parData.obsoleteReason" maxlength="200" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
            </label-item>
        </div>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save">
                确定作废
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="closeThis">
                取消
            </a-button>
        </div>
    </div>
</template>

<script>
import { obsoleteReserve, getReserveInfo } from '@/api/reserve'
export default {
    components: {
    },
    props: {
        reserveId: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            nowTime: new Date().getTime(),
            roomInfo: {},
            imgList: [],
            invalidForm: {
                money: 0
            },
            parData: {
                id: '',
                obsoleteReason: ''
            },
            info: {}

        };
    },
    created() {
        this.getData();
        this.parData.id = this.reserveId;
    },
    methods: {
        getData() {
            getReserveInfo(this.reserveId).then(res => {
                // console.log(res)
                if (res.code === "200") {
                    this.info = res.data;
                }
            })
        },
        save() {

            obsoleteReserve(this.parData).then(res => {
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
    }
};
</script>

<style lang="less" scoped>
.invalid-info {
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
        margin-bottom: 15px; // height:194px;
        background: rgba(245, 247, 254, 1);
        .row {
            margin-top: 15px;
        }
    }
    .ipt-box {
        padding: 0 20px 0 20px;
        margin-bottom: 20px;
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






.enclosurefujian {
    overflow: hidden;
    margin-bottom: 10px;
}

.enclosure {
    float: left;
    .fileEnclosureWrap {
        float: left;
        margin-right: 10px;
        text-align: center;
        .enclosureImg {
            display: inline-block;
            width: 60px;
            height: 60px;
        }
        .enclosurep {
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
        }
    }
}
</style>
