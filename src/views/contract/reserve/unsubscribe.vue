<template>
    <div class="unsubscribe-info clearfix">
        <!-- 退定信息 -->
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
                        <span>{{info.paymentMethodName}}</span>
                        {{info.money/100}}元
                    </span>
                </a-col>

            </a-row>

        </div>
        <div class="ipt-box">
            <div class="titleInfo">
                <span></span>
                <b>预定信息</b>
            </div>
            <label-item title="退还金额" :mustFill="true">
                <div class="u-bottom-border addresswu">
                    <a-input v-if="info.money" v-model="parData.money" placeholder="请输入退还金额" v-validate="'min(0)|max(' + info.money/100 + ')'">
                        <span slot="prefix">￥</span>
                    </a-input>
                    <span style="line-height:32px;">元</span>
                </div>
            </label-item>
            <label-item class="item u-bottom-border" style="width: 100%" title="退定备注" :valLength="parData.refundComment.length" :maxSize="200">
                <a-textarea v-model="parData.refundComment" maxlength="200" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
            </label-item>
            <div class="titlepz">
                预定凭证
                <span>（附近支持格式：jpg、png、jpeg）</span>
            </div>
            <div>
                <own-upload ref="publicPic" :uploadParms="sendData" :showTips="false"></own-upload>
            </div>

        </div>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save">
                确定退定
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="closeThis">
                取消
            </a-button>
        </div>
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import { cancelReserve, getReserveInfo } from '@/api/reserve'
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
            imgList: [],
            loading: false,
            sendData: {
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 12, // 图片大类标识  预定
                subBizType: 2, // 图片子类标识 退定凭证
                indexNum: 1 // 排序值
            },
            imageUrl: '',
            previewVisible: false,
            previewImage: '',
            parData: {
                refundComment: '',  //退订原因
                money: '0',    //退订(款)金额【单位分】
                picIdList: [],      //退订凭证
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
                // console.log(res)
                if (res.code === "200") {
                    this.info = res.data;
                }
            })
        },
        handleCancel() {
            this.previewVisible = false;
        },
        save() {
            if (!this.parData.money) {
              if(this.parData.money==''){
                this.$message.warning('请输入退定金额！');
                return;
              }
            }
            let idList = [];
            let list = [...this.$refs.publicPic.picsList];
            if(list && list.length > 0) {
                list.forEach((val, i) => {
                    idList.push(val.id)
                })
            }
            this.parData.picIdList = idList;
            let data = JSON.parse(JSON.stringify(this.parData));
            data.refundMoney =  Math.round(data.money * 100);
            cancelReserve(data).then(res => {
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
// @import url("../../../assets/css/color.less");
.unsubscribe-info {
    max-height: 80vh;
    overflow: auto;
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
    .littleLabel {
        width: 112px; // color: #666666;
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    // 详情类右侧字段值
    .labelValue {
        color: #000;
    }
    &/deep/ .ant-input-affix-wrapper .ant-input-prefix {
        left: 0px;
    }
    .item{
       &/deep/ .title{
            margin-top: 20px;
        }
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
