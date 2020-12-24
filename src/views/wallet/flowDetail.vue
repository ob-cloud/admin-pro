<template>
    <div class="flowDetail-box">
        <div class="flowDetail-title">交易详情</div>
        <div class="flowDetail-detail">
            <div class="flowDetail-detail1 clearfix">
                <span class="f-fl flowDetail-detail1-font fontColor1">状态：</span>
                <span class="f-fl flowDetail-detail1-font fontColor2" v-if="flowDetail.status==1">交易中</span>
                <span class="f-fl flowDetail-detail1-font fontColor3" v-if="flowDetail.status==2">交易失败</span>
                <span class="f-fl flowDetail-detail1-font fontColor1" v-if="flowDetail.status==3">交易成功</span>
                <span class="f-fl flowDetail-detail1-font fontColor1" v-if="flowDetail.status==4">交易成功-有退款</span>
                <span class="f-fl flowDetail-detail1-font fontColor4" v-if="flowDetail.status==5">交易成功-有退款</span>
                <span class="f-fr flowDetail-detail1-font fontColor1">币种：人民币</span>
            </div>
            <div class="flowDetail-table">
                <div class="flowDetail-table1">
                    <div class="basicsInfo">
                        <div class="border-right-style border-bottom-style" style="width: 45px;height:88px;padding: 10.5px 13px;font-size: 15px;">
                            付款人
                        </div>
                        <div style="width: 115px;">
                            <div class="border-right-style border-bottom-style"  style="height: 44px;line-height: 44px;text-align: center;">户 名</div>
                            <div class="border-right-style border-bottom-style"  style="height: 44px;line-height: 44px;text-align: center;">账 号</div>
                        </div>
                        <div style="width: 310px;">
                            <div class="border-right-style border-bottom-style"  style="height: 44px;line-height: 44px;text-align: left;padding-left: 14px;">{{flowDetail.payAccountName?flowDetail.payAccountName:flowDetail.payerName?flowDetail.payerName+'-'+flowDetail.payerPhone:'-'}}</div>
                            <div class="border-right-style border-bottom-style"  style="height: 44px;line-height: 44px;text-align: left;padding-left: 14px;">-</div>
                        </div>
                        <div class="border-right-style border-bottom-style" style="width: 45px;height:88px;padding: 10.5px 13px;">
                            收款人
                        </div>
                        <div style="width: 115px;">
                            <div class="border-right-style border-bottom-style"  style="height: 44px;line-height: 44px;text-align: center;">户 名</div>
                            <div class="border-right-style border-bottom-style"  style="height: 44px;line-height: 44px;text-align: center;">账 号</div>
                        </div>
                        <div style="width: 310px;">
                            <div class="border-bottom-style"  style="height: 44px;line-height: 44px;text-align: left;padding-left: 14px;">{{flowDetail.receiveAccountName?flowDetail.receiveAccountName:'-'}}</div>
                            <div class="border-bottom-style"  style="height: 44px;line-height: 44px;text-align: left;padding-left: 14px;">{{flowDetail.receiveAccountNo?flowDetail.receiveAccountNo:'-'}}</div>
                        </div>
                    </div>
                    <div class="basicsInfo">
                        <div class="border-right-style border-bottom-style" style="width: 160px;height: 44px;line-height: 44px;text-align: center;">金 额</div>
                        <div class="border-right-style border-bottom-style" style="width: 310px;height: 44px;line-height: 44px;text-align: left;padding-left: 14px;">￥ {{flowDetail.amount/100}}元</div>
                        <div class="border-right-style border-bottom-style" style="width: 160px;height: 44px;line-height: 44px;text-align: center;">金额（大写）</div>
                        <div class="border-bottom-style" style="width: 310px;height: 44px;line-height: 44px;text-align: left;padding-left: 14px;">人民币 {{flowDetail.amountCNCapital}}</div>
                    </div>
                    <div class="basicsInfo">
                        <div class="border-right-style border-bottom-style" style="width: 160px;height: 44px;line-height: 44px;text-align: center;">摘 要</div>
                        <div class="border-bottom-style" style="width: 780px;height: 44px;line-height: 44px;text-align: left;padding-left: 14px;">{{flowDetail.summary?flowDetail.summary:'-'}}</div>
                    </div>
                  <div class="basicsInfo">
                    <div class="border-right-style border-bottom-style" style="width: 160px;height: 44px;line-height: 44px;text-align: center;">交易明细</div>
                    <div class="border-bottom-style overHidde" style="width: 780px;height: 44px;line-height: 44px;text-align: left;padding-left: 14px;">{{flowDetail.feeDetailStr?flowDetail.feeDetailStr:'-'}}</div>
                  </div>
                    <div class="basicsInfo">
                        <div class="border-right-style border-bottom-style" style="width: 160px;height: 44px;line-height: 44px;text-align: center;">类 型</div>
                        <div class="border-right-style border-bottom-style" style="width: 310px;height: 44px;line-height: 44px;text-align: left;padding-left: 14px;">{{flowDetail.belongTypeName?flowDetail.belongTypeName:'-'}}</div>
                        <div class="border-right-style border-bottom-style" style="width: 160px;height: 44px;line-height: 44px;text-align: center;">来 源</div>
                        <div class="border-bottom-style overHidde" style="width: 310px;height: 44px;line-height: 44px;text-align: left;padding-left: 14px;">{{flowDetail.source?flowDetail.source:'-'}}</div>
                    </div>
                    <div class="basicsInfo">
                        <div class="border-right-style" style="width: 160px;height: 42px;line-height: 42px;text-align: center;">支付方式</div>
                        <div class="border-right-style" style="width: 310px;height: 42px;line-height: 42px;text-align: left;padding-left: 14px;">{{flowDetail.transactionChannelTypeName?flowDetail.transactionChannelTypeName:'-'}}</div>
                        <div class="border-right-style" style="width: 160px;height: 42px;line-height: 42px;text-align: center;">交易完成时间</div>
                        <div style="width: 310px;height: 42px;line-height: 42px;text-align: left;padding-left: 14px;">{{flowDetail.completedTime?$moment(flowDetail.completedTime).format('YYYY.MM.DD HH:mm'):'-'}}</div>
                    </div>
                </div>
            </div>
            <div class="flowDetail-time clearfix">
                <span class="f-fl flowDetail-time-font">交易时间：{{flowDetail.transactionTime?$moment(flowDetail.transactionTime).format('YYYY.MM.DD HH:mm'):'-'}}</span>
                <span class="f-fr flowDetail-time-font">交易流水号：{{flowDetail.serialNumber?flowDetail.serialNumber:'-'}}</span>
            </div>
        </div>
        <div class="flowDetail-close cursor" @click="closeThis">关闭</div>
    </div>
</template>

<script>
    import * as API from '@/api/wallet';
    export default {
        name: "flowDetail",
        props: {
            flowDetailId:{
                type:String,
                required:true,
            },
        },
        components: {

        },
        data() {
            return {
                flowDetail:{},
            }
        },
        created() {
            this.getFlowDetail();
        },
        methods: {
            closeThis(){
                this.$emit('closeThis');
            },
            getFlowDetail(){
                API.tfView({id:this.flowDetailId}).then(res => {
                    if (res.code === '200') {
                        this.flowDetail = res.data;
                    }
                });
            },
        },
        watch: {
            flowDetailId(){
                this.getFlowDetail();
            }
        },
    }
</script>

<style lang="less" scoped>
    .flowDetail-box{
        .flowDetail-title{
            color: #111111;
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 2px solid #000000;
        }
        .flowDetail-detail{
            padding: 0 5px;
            .flowDetail-detail1{
                margin: 24px 0 11.5px 0;
                .flowDetail-detail1-font{
                    font-size: 18px;
                }
                .fontColor1{
                    color: #111111;
                }
                .fontColor2{
                    color: #FFA036;
                }
                .fontCOlor3{
                    color: #FB4246;
                }
                .fontCOlor4{
                    color:#777777
                }
            }
            .flowDetail-table{
                width:950px;
                height:316px;
                border:1px solid #979797;
                .flowDetail-table1{
                    margin: 3px 0 0 3px;
                    width:942px;
                    height:308px;
                    border:1px solid #979797;
                    .basicsInfo{
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        color: #111111;
                        font-size: 15px;
                    }
                    .border-top-style{
                        border-top:1px solid #979797;
                    }
                    .border-right-style{
                        border-right:1px solid #979797;
                    }
                    .border-bottom-style{
                        border-bottom:1px solid #979797;
                    }
                    .border-left-style{
                        border-left:1px solid #979797;
                    }
                }
            }
        }
        .flowDetail-time{
            margin-top: 15px;
            .flowDetail-time-font{
                font-size: 14px;
                color: #111111;
            }
        }
        .flowDetail-close{
            text-align: center;
            color: #0A87F8;
            font-size: 18px;
            padding-top: 19px;
            margin-top: 40px;
            border-top: 0.5px solid #EEEEEE;
        }
    }
</style>