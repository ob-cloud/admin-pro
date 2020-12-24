<template>
    <div class="associated-bill clearfix">
        <!-- 关联租客 -->
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>账单信息</b>
            </div>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">收(付)款人信息：</span>
                    <span class="labelValue">{{info.payerName}}-{{info.payerPhone}}</span>
                </a-col>
            </a-row>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">账单周期：</span>
                    <span class="labelValue"> {{$moment(info.beginTime).format('YYYY.MM.DD')}} - {{$moment(info.endTime).format('YYYY.MM.DD')}}</span>
                </a-col>
            </a-row>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">账单金额：</span>
                    <span class="labelValue">
                        {{info.totalMoney/100}}元
                    </span>
                </a-col>
            </a-row>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">账单摘要：</span>
                    <span class="labelValue">
                        {{info.billName}}
                    </span>
                </a-col>
            </a-row>
            <a-row class="row" style="border-top:1px dashed #DDDDDD;padding-top:15px;padding-bottom:15px;">
                <a-col :span="24">
                    <span class="littleLabel">原纪录房源信息：</span>
                    <span class="labelValue">
                        <span>{{info.fullAddress}}</span>
                    </span>
                </a-col>
            </a-row>

        </div>
        <div class="ipt-box">
            <label-item title="房源信息" border :mustFill="true">
                <div class="u-bottom-border address">
                    <a-select showSearch :value="parData.fullAddress" placeholder="请输入房源编号/小区地址/项目名称/门牌号/租客姓名/租客电话" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @search="selectCommunity" @blur="isEmpty">
                        <div slot="dropdownRender" slot-scope="menu">
                            <div v-for="(item,index) in communityList" :key="index" @click="getCommunity(item)">
                                <div  class="communityList">
                                    <p>{{item.name}}-{{item.phone}} ( {{$moment(item.beginTime).format('YYYY.MM.DD')}}-{{$moment(item.endTime).format('YYYY.MM.DD')}})</p>
                                    <span>{{item.viewAddress}}/</span>
                                </div>
                            </div>
                        </div>
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
import { bizRelation,searchContract } from '@/api/bill'

export default {
    components: {
    },
    props: {
        infoData: {
            type: Object,
            required: true
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
                id: '',              //预定ID
                bizId:'',
                relationType:2,  //关联类型(1：房源；2：租客合同；3：业主合同)
                fullAddress:undefined,
            },
            info: {}
        };
    },
    created() {
        this.parData.id = this.infoData.id;
        this.info = this.infoData
    },
    methods: {
        selectCommunity(searchVal) {
            let data = {
                fuzzyKeyword: searchVal,
                useBiz:1,
            }
            this.parData.fullAddress = searchVal;
            searchContract(data).then(res => {
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
        isEmpty() {
            if (!this.parData.houseId) {
                this.mustFillBorder = true
            } else {
                this.mustFillBorder = false
            }
        },
        getCommunity(res) {
            this.parData.bizId = res.bizId;
            this.parData.fullAddress = res.viewAddress;
            this.mustFillBorder = false;
        },
        save() {
            if (!this.parData.bizId) {
                this.mustFillBorder = true;
                this.$message.warning('请选择要关联的租客！');
                return;
            }
            let data = JSON.parse(JSON.stringify(this.parData));
            bizRelation(data).then(res => {
                if (res.code === "200") {
                    this.$message.success('操作成功！');
                    this.$emit('saveSuccess', true);
                }
            })

        },
        closeThis() {
            this.$emit('closeThis', true);
        }
    },
    filters: {
    },
    watch: {
        dataInfo(n) {
        }
    }
};
</script>

<style lang="less" scoped>
.associated-bill {
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
    .communityList {
        padding: 6px 12px;
        cursor: pointer;
    }
    .communityList:hover {
        background: rgba(10, 135, 248, .1);
    }
    & /deep/ .ant-select-dropdown-content {
        overflow: auto;
        max-height: 300px;
    }
}
</style>
