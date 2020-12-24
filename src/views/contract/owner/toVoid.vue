<template>
    <div class="toVoid-owner-box">
        <div class="info-top f-clearfix">
            <icon-font style="font-size:16px;margin-left:20px;" type="iconyumengtubiao_bangzhu" /> 确定要作废「{{infoData.name}}-{{infoData.phone}}」的合同吗？
        </div>
        <div class="info-title" v-if="list.length > 0"> 此合同还存在账单，是否将账单一并删除？（勾选的账单和其流水将一并删除）</div>
        <a-empty  v-show="list&&list.length === 0" description="此合同暂无账单" style="margin:80px 0"/>
        <div v-if="list.length > 0">
            <div class="content-row">
                <div class="bill-item">
                    <div class="bill-detail">
                        <div class="bill-title">
                            <div style="max-width: 65px"> </div>
                            <div style="max-width: 114px">状态</div>
                            <div style="max-width: 102px">期数</div>
                            <div style="max-width: 150px">账单总额（元）</div>
                            <div style="max-width: 128px">账单日期</div>
                            <div style="max-width: 200px;text-align: center;">账单周期</div>
                        </div>
                        <div v-for="(bills,index) in list" :key="index">
                            <div class="bill-name">
                                <span class="checkbox-box">
                                    <a-checkbox v-model="bills.checked" @change="checkedAll(index)"></a-checkbox>
                                </span>
                                <span class="bill-name-span">{{bills.name}}</span>
                            </div>
                            <div class="bill-data u-no-border" v-for="(bill,index2) in bills.bills" :key="index2">
                                <div class="f-clearfix" style="display: flex;">
                                    <div style="width: 65px;" class="left-check">
                                        <a-checkbox v-model="bill.checked" @change.stop="checkItem($event,index,index2)"></a-checkbox>
                                    </div>
                                    <div @click="showFinaceFu(index2,index)" class="bill-content-list">
                                        <div style="max-width: 114px">
                                            <span v-if="bill.billStatus ==1" style="color:#FB4246"> 未完成</span>
                                            <span style="color:#3DB302" v-else> 已完成</span>
                                        </div>
                                        <div style="max-width: 102px">
                                            第{{bill.num}}期
                                        </div>
                                        <div style="max-width: 150px">
                                            {{bill.totalAmount}}
                                        </div>
                                        <div style="max-width: 128px">
                                            {{bill.billDate | formatTime}}
                                        </div>
                                        <div class="options f-clearfix" style="max-width: 200px">

                                            {{bill.beginDate | formatTime}}~{{bill.endDate | formatTime}}
                                        </div>
                                    </div>
                                </div>
                                <div v-if="haveShowFinaceIndex(index2+''+index)" class="inputBor">
                                    <div class="bill-title child-box">
                                        <div style="max-width: 114px">收支类型</div>
                                        <div style="max-width: 102px">费用类型</div>
                                        <div style="max-width: 150px">账单金额（元）</div>
                                        <div style="max-width: 128px">收/付款日期</div>
                                        <div style="max-width: 200px;text-align: center;">账单周期</div>
                                    </div>
                                    <div class="bill-data child-data u-no-border" v-for="(finance,index3) in bill.billDetails" :key="index3">
                                        <div style="max-width: 114px">
                                            {{finance.feeDirection==1?'收':'支'}}
                                        </div>
                                        <div style="max-width: 102px">
                                            {{finance.feeSubjectName}}
                                        </div>
                                        <div style="max-width: 150px">
                                            <div class="u-bottom-border">
                                                {{finance.amount}}
                                            </div>
                                        </div>
                                        <div style="max-width: 128px">
                                            {{finance.payDate | formatTime}}
                                        </div>
                                        <div style="max-width: 200px">
                                            {{finance.beginDate | formatTime}}~{{finance.endDate | formatTime}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="width:100%;" class="clearfix">
            <a-button @click="confirmBill" type="warning" class="saveBtn f-fr" style="width:98px;">确定</a-button>
            <a-button @click="cancel" type="warning" class="f-fr cancelBtn" style="width:98px;">取消</a-button>
        </div>
    </div>
</template>

<script>
import { getDateHaoMiao } from '@/utils/util';
import {
    billView, obsoleteVoid
} from '@/api/ownerContract.js';
export default {
    name: 'BillPreview',
    components: {
    },
    props: {
        ownerContract: {
            type: String
        },
        infoData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            paymentMethod: '',
            costTabsContent: [],
            saveLoading: false,
            showFinaceIndex: [],
            showIndex: [],
            showFinace: false,
            list: [],
            haveIndex: '',
            checkBox: {
                checked: false,
                items: []
            },
            checkedFul: false,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            billView(this.ownerContract).then(res => {
                this.list = res.data;
                this.init();
            });
        },
        init() {
            const listData = JSON.parse(JSON.stringify(this.list));
            listData.forEach((item, index) => {
                item.checked = true;
                if (item.bills) {
                    item.bills.forEach((data, i) => {
                        data.checked = true;
                        data.totalAmount = data.totalAmount / 100;
                        data.billDetails.forEach((da, j) => {
                            da.amount = da.amount / 100;
                        });
                    });
                }
            });
            this.list = listData;
        },
        confirmBill() {
            const list = JSON.parse(JSON.stringify(this.list));
            let arry = [];
            list.forEach((item, index) => {
                let newItem = [...item.bills];
                newItem.forEach((data, index2) => {
                    if (data.checked) {
                        arry.push(data.id)
                    }
                });
            });
            let postData = {
                billIdList: arry,
                id: this.ownerContract,
            }
            obsoleteVoid(postData).then(res => {
                if (res.code === '200') {
                    this.$message.success('作废成功！');
                    this.$emit('saveSuccess', true);
                }

            });
        },
        closeThis() {
            this.ownDialog.show = false;
            this.$emit('closeThis', true);
        },
        showFinaceFu(index2, index) {
            let string = index2 + '' + index;
            if (this.haveShowFinaceIndex(string)) {
                let i = this.showFinaceIndex.indexOf(string);
                this.showFinaceIndex.splice(i, 1);
            } else {
                this.showFinaceIndex.push(string);
            }
        },
        haveShowFinaceIndex(index) {
            return this.showFinaceIndex.some(item => item === index);
        },
        haveBorder(q, w, e) {
            return q + '' + w + '' + e === this.haveIndex;
        },
        inpFulcus(i1, i2, i3) {
            this.haveIndex = i1 + '' + i2 + '' + i3;
        },
        inpFulBlur(i1, i2, i3, data) {
            if (data === '') {
                this.list[i1].bills[i2].billDetails[i3].amount = 0;
            }
            this.haveIndex = '';
        },
        checkedAll(index) {
            this.checkedFul = !this.checkedFul;
            this.list.forEach((data, i) => {
                if(i == index){
                    if (data.checked) {
                        data.bills.forEach((da, j) => {
                            da.checked = true;
                        });
                    } else {
                        data.bills.forEach((da, j) => {
                            da.checked = false;
                        });
                    }
                }
            });
        },
        checkItem(val, i1, i2) {
            this.list[i1].bills.forEach((da, j) => {
                if (!da.checked) {
                    this.list[i1].checked = false;
                }
            });
            //判断是否全选
            let isCheckAll = true;
            this.list[i1].bills.forEach((da, j) => {
                if (!da.checked) {
                    isCheckAll = false;
                }
            });
            this.list[i1].checked = isCheckAll;
        },
        cancel() {
            this.$emit('closeThis', true);
        },
        priceReg(e) {
            // 通过正则过滤小数点后两位
            e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
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
        show(n) {
            if (n) {
                this.ownDialog.show = n;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.toVoid-owner-box {
    height: calc(100vh - 200px);
    overflow: auto;
    .info-top {
        width: 100%;
        height: 40px;
        background: rgba(245, 247, 254, 1);
        border-radius: 4px;
        line-height: 40px;
    }
    .info-title {
        width: 100%;
        height: 50px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 160, 54, 1);
        line-height: 50px;
        padding: 0 20px;
    }
    .content-row {
        margin: 0 20px;
        .bill-item {
            margin-bottom: 20px;
            .delete-icon {
                color: red;
                font-size: 14px;
            }
            .bill-detail {
                border-left: 1px solid @borderColor;
                border-top: 1px solid @borderColor;
                text-align: center;
                font-size: 12px;
                .bill-name {
                    height: 48px;
                    line-height: 46px;
                    font-weight: 600;
                    border-bottom: 1px solid @borderColor;
                    border-right: 1px solid @borderColor;
                    background: rgba(238, 239, 243, 1);
                    position: relative;
                    .checkbox-box {
                        float: left;
                        margin-left: 24px;
                    }
                    .bill-name-span {
                        float: left;
                        margin-left: 36px;
                    }
                }
                .bill-title {
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
                .bill-data {
                    position: relative;
                    .left-check {
                        border-right: 1px solid @borderColor;
                        border-bottom: 1px solid @borderColor;
                        width: 56px;
                        height: 40px;
                        line-height: 40px;
                    }
                    .bill-content-list {
                        display: flex;
                        width: calc(100% - 65px);

                        &>div {
                            font-size: 14px;
                            color: rgba(17, 17, 17, 1);
                            text-align: left;
                            padding: 0px 9px;
                            flex: 1;
                            height: 100%;
                            height: 40px;
                            line-height: 40px; // text-align: center;
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
                        padding: 0 9px;
                        display: flex; // width: calc(50% - 15px);
                        width: 100%;
                        height: 100%;
                        & /deep/ .ant-select-selection__rendered {
                            // margin-left: 16px;
                            margin-top: 6px;
                        }
                    }
                    .bill-span {
                        float: left;
                        margin-left: 10px;
                    }
                }
                .bill-foot {
                    height: 40px;
                    line-height: 40px;
                    border-right: 1px solid @borderColor;
                    border-bottom: 1px solid @borderColor;
                    .billAdd {
                        width: 100px;
                        margin: 0 auto;
                        text-align: center;
                    }
                }
            }
        }
    }
    .child-box {
        padding: 15px 20px 0 66px;
        background: rgba(245, 247, 254, 1); // border-left: 1px solid @borderColor;
        // border-top: 1px solid @borderColor;
        &>div {
            padding: 0px 9px;
            flex: 1;
            height: 40px;
            line-height: 40px;
            border-top: 1px solid @borderColor;
        }
        &>div:nth-child(1) {
            border-left: 1px solid @borderColor;
        }
    }
    .child-data {
        padding: 0 20px 0 66px;
        position: relative;
        display: flex; //  border-bottom: 1px solid @borderColor;
        &>div {
            flex: 1;
            padding: 0px 9px;
            height: 100%;
            height: 40px;
            line-height: 40px;
            text-align: left;
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
        &>div:nth-child(1) {
            border-left: 1px solid @borderColor;
        }
    }
    .inputBor {
        background: rgba(252, 252, 255, 1);
        border-right: 1px solid @borderColor;
        border-bottom: 1px solid @borderColor;
        &>div:nth-last-child(1) {
            // border-left: 1px solid @borderColor;
            padding-bottom: 15px;
        }
    }
    .content-row .bill-item .bill-detail .bill-data .inputBor .child-box {
        background: rgba(252, 252, 255, 1);
    }
    .saveBtn {
        width: 120px;
        height: 40px;
        background: rgba(10, 135, 248, 1);
        border-radius: 5px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        margin-right: 20px;
        margin-bottom: 20px;
    }
    .cancelBtn {
        width: 120px;
        height: 40px;
        background: rgba(246, 247, 248, 1);
        border-radius: 5px;
        border: 1px solid rgba(221, 221, 221, 1);
        margin-right: 20px;
        margin-bottom: 20px;
    }
}
</style>
