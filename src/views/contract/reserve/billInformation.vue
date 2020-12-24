<template>
    <div class="billInfo-box">
        <!-- 账单详情 -->
        <div class="table">
                <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="info">
                    <div slot="billStatus" slot-scope="text,record">
                        <div v-if="text==1" class="fontNormal">
                            <div class="IconRadius normalBg f-fl"></div>
                            <div>
                                <span>未完成 </span>
                                <span style="color:#FB4246;font-size:12px;" v-if="record.overdueDays>0">逾{{record.overdueDays}}天</span>
                            </div>
                        </div>
                        <div v-else-if="text==2" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已完成</span>
                            </div>
                        </div>
                        <div v-else-if="text==9" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已作废</span>
                            </div>
                        </div>
                    </div>
                    <div slot="payerName" slot-scope="text,record">
                        <div class="f-fl" type="primary">
                            <p style="line-height:22px;width:146px;">
                                <span>{{record.payerName}}-{{record.payerPhone}} </span>
                            </p>
                        </div>
                        <a-popover v-if="record.payUrgeRecordList">
                            <template slot="content">
                                <div class="f-clearfix" style="padding: 8px 18px;border-bottom:1px solid #DDDDDD;">
                                    <p class="f-fl" style="width:76px">催收人</p>
                                    <p class="f-fl">催收时间</p>
                                </div>
                                <div class="f-clearfix" style="padding: 4px 18px;"  v-for="(item,index) in record.payUrgeRecordList" :key="index">
                                  <p class="f-fl" style="width:76px">{{item.urgeEmpName}}</p>
                                  <p class="f-fl">{{$moment(item.urgeTime).format('lll')}}</p>
                                </div>
                                <div class="f-clearfix" style="padding: 4px 18px;color:#0A87F8;">
                                   <p class="cursor f-fr" @click.stop="collectionFun(record.id)" style="width:56px;">继续催收</p>
                                </div>
                            </template>
                            <div class="f-fl" type="primary">
                                <p style="line-height:22px;">
                                    <span style="color:#FE3C38"><icon-font type="iconyumengtubiao_cuishou" /> × {{record.payUrgeRecordList.length}}</span>
                                </p>
                            </div>
                        </a-popover>
                    </div>
                    <div slot="totalMoney" slot-scope="text,record">
                        <span v-if="text<0" class="shou-zhi">支</span>
                        <span v-else class="shou-shou">收</span>
                        {{Math.abs(text)/100}}
                    </div>
                    <div slot="predictTime" slot-scope="text,record">
                        <span v-if="record.billStatus == 2"> 完成时间：</span>
                        <span v-else-if="record.totalMoney <0">预支时间：</span>
                        <span v-else>预收时间：</span>
                        {{$moment(text).format('YYYY.MM.DD')}}
                    </div>
                    <div slot="beginTime" slot-scope="text,record">
                        {{$moment(text).format('YYYY.MM.DD')}} - {{record.endTime ? $moment(record.endTime).format('YYYY.MM.DD') : ''}}
                    </div>
                    <div slot="billName" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span>{{text}}</span>
                                </p>
                            </template>
                            <div type="primary" class="overHidde" style="width: 100px">
                                <span>{{text}}</span>
                            </div>
                        </a-popover>
                    </div>
                    <div slot="action" slot-scope="text, record">
                        <div @click.stop="openFun(record)" class="action cursor">详情</div>

                    </div>
                </a-table>

            </div>
    </div>
</template>

<script>
export default {
    name: "billInfo",
    props: {
        billInfos: {
            type: Array
        },
    },
    data() {
        return {
            info:[],
            // reserveDetailDialog:false,
            tableColumns: [
                {
                    title: '状态',
                    dataIndex: 'billStatus',
                    key: 'billStatus',
                    align: 'left',
                    scopedSlots: { customRender: 'billStatus' },
                    width: 130,
                },
                {
                    title: '收(付)款人信息',
                    dataIndex: 'payerName',
                    key: 'payerName',
                    scopedSlots: { customRender: 'payerName' },
                    align: 'left',
                    width: 170,
                },
                {
                    title: '支付日期',
                    key: 'predictTime',
                    dataIndex: 'predictTime',
                    align: 'center',
                    scopedSlots: { customRender: 'predictTime' },
                    width: 170,
                },
                {
                    title: '账单金额',
                    key: 'totalMoney',
                    dataIndex: 'totalMoney',
                    scopedSlots: { customRender: 'totalMoney' },
                    align: 'left',
                    width: 96,
                },
                {
                    title: '账单摘要',
                    key: 'billName',
                    dataIndex: 'billName',
                    scopedSlots: { customRender: 'billName' },
                    align: 'left',
                    width: 105,
                },
                {
                    title: '账单周期',
                    key: 'beginTime',
                    dataIndex: 'beginTime',
                    scopedSlots: { customRender: 'beginTime' },
                    align: 'left',
                    width: 180,
                },
                {
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'center',
                    width: 60,

                },
            ],
        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo(){
             this.info = this.billInfos;
            
        },
        openFun(record) {
            // this.reserveDetailDialog = true;
            this.$emit('openDetail', record.id);
        },
        openDetail(record, index) {
            return {
                on: {
                    click: () => {
                        // this.reserveDetailDialog = true;
                        this.$emit('openDetail', record.id);
                    }
                }
            }
        },
    },

}
</script>

<style scoped lang="less">
.billInfo-box {
    margin: 20px 0;
    .table {
        position: relative;
        .checkOptionBill {
            .fontSpacing {
                margin-left: 3px;
                margin-right: 3px;
            }
            position: absolute;
            z-index: -1;
            background-color: #fafafa;
            margin-top: 1px;
            height: 45px;
            margin-left: 70px;
            line-height: 45px;
            width: 95%;
            .dealOption {
                font-size: 13pt;
                float: left;

                .headSpan {
                    margin-left: 16px;
                }
            }
            .cancelOption {
                font-size: 14px;
                float: right;
                margin-right: 20px;
            }
        }
        .action {
            color: @themeColor;
        }
        .IconRadius {
            margin-top: 8px;
            margin-right: 5px;
            width: 6px;
            height: 6px;
            border-radius: 4px;
        }
        .fontNormal {
            .normalBg {
                background-color: #3DB302;
            }
        }
        .fontProhibit {
            .prohibitBg {
                background-color: #777777;
            }
        }
        .fontNormalColor {
            color: #3DB302;
        }
        .fontProhibitColor {
            color: #111111;
        }
        .nameColumn {
            width: 100%;
            .name {
                float: left;
            }
            .leaderFlag {
                color: #777777;
                border: 0.5px solid #DDDDDD;
                border-radius: 10px;
                float: left;
                margin-left: 4px;
                padding-right: 4px;
                .leaderLength {
                    width: auto;
                    margin-left: 5px;
                    font-size: 12px;
                }
            }
        }
        .contFoot {
            margin-top: 0px;
            width: 100%;
            height: 56px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 20px; // position: absolute;
            // bottom: 0px;
            // right: 0;
            background-color: #fff;
        }
        & /deep/ .ant-table-thead>tr {
            height: 46px;
            padding: 0 10px 0px 10px;
        }
        .shou-zhi {
            display: inline-block;
            height: 20px;
            width: 20px;
            color: #FB4246;
            border: 1px solid #FB4246;
            border-radius: 50%;
            text-align: center; // margin: 0 10px;
            line-height: 20px;
        }
        .shou-shou {
            display: inline-block;
            height: 20px;
            width: 20px;
            color: #16D5AD;
            border: 1px solid #16D5AD;
            border-radius: 50%;
            text-align: center; // margin: 0 10px;
            line-height: 20px;
        }
        & /deep/ .ant-table-thead>tr>th,
        & /deep/ .ant-table-tbody>tr>td {
            padding: 12px 9px;
        }
    }
}
</style>
