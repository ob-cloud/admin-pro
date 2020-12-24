<template>
    <div class="associated-clean clearfix">
        <!-- 关联房源 -->
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>保洁信息</b>
            </div>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">申请人：</span>
                    <span class="labelValue">{{info.applyName}}</span>
                </a-col>
            </a-row>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">申请人电话：</span>
                    <span class="labelValue"> {{info.applyPhone}}</span>
                </a-col>
            </a-row>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">保洁地址：</span>
                    <span class="labelValue">
                       {{info.fullAddress}}
                    </span>
                </a-col>
            </a-row>
        </div>
        <div class="ipt-box">
            <label-item title="房源信息" border :mustFill="true">
                <div class="u-bottom-border address">
                    <a-select showSearch placeholder="请输入房源编号/小区地址/项目名称/门牌号/租客姓名/租客电话检索房源" :class="{ 'must-fill-border': mustFillBorder  }" style="width: 100%;" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" @blur="isEmpty" >
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
            <a-button size="large" html-type="submit" class="btn" @click="cancelSave">
                取消
            </a-button>
        </div>
    </div>
</template>

<script>
import  * as API from '@/api/workorder';

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
            errFul: false,
            communityList: [],
            mustFillBorder: false,
            parData: {
                houseId: '',        //房源id
                id: ''              //保洁id
            },
            info: {}
        };
    },
    created() {
        this.parData.id = this.infoData.id;
        this.info = this.infoData;
    },
    methods: {
        selectCommunity(searchVal) {
            let data = {
                fuzzyKeyword: searchVal,
                useBiz:5,
            }

            API.searchHouse(data).then(res => {
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
        getCommunity(communityId) {
            this.parData.houseId = communityId;
            this.mustFillBorder = false;
        },
        save() {
            if (!this.parData.houseId) {
                this.mustFillBorder = true;
                this.$message.warning('请输入房源地址！');
                return;
            }
            let data = JSON.parse(JSON.stringify(this.parData));
            API.cleanRelated(data).then(res => {
                if (res.code === "200") {
                    this.$message.success('关联房源成功！');
                }
                else{
                    this.$message.error('关联房源失败！');
                }
                this.$emit('successAssociated');
            })

        },
        cancelSave() {
            this.$emit('cancelAssociated');
        }
    },
    filters: {
    },
    watch: {
    }
};
</script>

<style lang="less" scoped>
.associated-clean {
    height: 100%;
    width: 100%;
    font-size: 14px; // padding: 1px 20px 0 20px;
    position: relative;
    .cont {
        margin-top: 10px;
        width: 100%;
        padding: 10px 0 0 20px;
        width:520px;
        height: 144px;
        background:rgba(245,247,254,1);
        .row {
            margin-top: 12px;
        }
    }
    .ipt-box {
        padding: 0 20px 40px 20px;
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
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    // 详情类右侧字段值
    .labelValue {
        color: #000;
    }
}
</style>
