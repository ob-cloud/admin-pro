<template>
    <div id="printMe" class="printInfo-box">
        <div class="info-top" style="color:#0A87F8">
            <span>{{copyBill.apartmentName}}</span>公司账单明细
        </div>
        <label-item title="" style="padding:0 20px 0 20px">
            <div class="contract-modular">
                <div class="bill-top">
                    <p style="padding-right: 18px;">打印时间：<span>{{$moment(copyBill.printTime).format('YYYY.MM.DD')}}</span></p>
                    <p class="border-p overHidde" style="padding-left: 18px;max-width:160px">客户：<span >{{copyBill.payerName}}</span></p>
                    <div class="f-fr overHidde" style="max-width:300px">地址：{{copyBill.fullAddress}}</div>
                </div> 
                <div style="width:100%;height:4px;"></div>
                <a-table rowKey="id" :columns="tableColumns" :pagination="false" :data-source="BillExpenses" bordered>
                    <div slot="originalMoney" slot-scope="text,record">         
                        <span style="color:#0A87F8;font-size:16px;" v-if="record.feeDirection == 1&&record.originalMoney!=0"> + </span>
                        <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="record.feeDirection == 2&&record.originalMoney!=0"> - </span> 
                        <span>{{record.originalMoney}}</span>
                        <span>元</span>
                    </div>
                    <div slot="occurredMoney" slot-scope="text,record">         
                        <span style="color:#0A87F8;font-size:16px;" v-if="record.feeDirection == 1&&record.occurredMoney!=0"> + </span>
                        <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="record.feeDirection == 2&&record.occurredMoney!=0"> - </span> 
                        <span>{{record.occurredMoney}}元{{record.exemptMoney&&record.exemptMoney>0?'(免收'+record.exemptMoney/100+'元)':''}}</span>
                    </div>
                    <div slot="notOccurredMoney" slot-scope="text,record">         
                         <span style="color:#0A87F8;font-size:16px;" v-if="record.feeDirection == 1&&record.notOccurredMoney!=0"> + </span>
                         <span style="color:rgba(251,66,70,1);font-size:16px;" v-else-if="record.feeDirection == 2&&record.notOccurredMoney!=0"> - </span> 
                         <span>{{record.notOccurredMoney}}元</span>
                    </div>
                    <div slot="beginTime" slot-scope="text,record">
                         {{$moment(record.beginTime).format('YYYY.MM.DD')}} - {{$moment(record.endTime).format('YYYY.MM.DD')}}
                    </div>
                </a-table>
                <div class="bill-top" style="margin-top: 20px;">
                    <p style="width:70%;">应{{copyBill.totalMoney>=0?'收':'付'}}总额：{{copyBill.totalMoney ? Math.abs(copyBill.totalMoney/100) : 0}}元（大写：{{copyBill.totalMoneyCN}}）</p>
                    <div class="f-fr">缴费日期：<span>{{$moment(copyBill.predictTime).format('YYYY.MM.DD')}}</span></div>
                </div>
                <div class="bill-top">
                    <p>制表人：{{copyBill.printEmpName}}</p>
                </div>
            </div>
        </label-item>
        
    
        <div class="foot Noprn">
            <a-button size="large" type="primary" html-type="submit" class="btn" v-print="printObj" >
                打印
            </a-button>
            <a-button size="large" html-type="submit" class="btn cancelFont" @click="closeThis">
                取消
            </a-button>
        </div>
    </div>
</template>

<script>
import { getPrintInfo } from '@/api/bill';
export default {
    name: "editBill",
    components: {
    },
    props: {
        billId: {
            type: String
        },
    },
    data() {
        return {
            tableColumns: [  
                {
                    title: '费用科目',
                    dataIndex: 'feeSubjectName',
                    key: 'feeSubjectName',
                    align: 'left',
                    scopedSlots: { customRender: 'feeSubjectName' },
                },
                {
                    title: '总额',
                    dataIndex: 'originalMoney',
                    key: 'originalMoney',
                    scopedSlots: { customRender: 'originalMoney' },
                    align: 'left',
                    width: '16%',
                },
                {
                    title: '已收(付)',
                    dataIndex: 'occurredMoney',
                    key: 'occurredMoney',
                    scopedSlots: { customRender: 'occurredMoney' },
                    align: 'left',
                    width: '16%',
                },
                {
                    title: '待收(付)',
                    key: 'notOccurredMoney',
                    dataIndex: 'notOccurredMoney',
                    scopedSlots: { customRender: 'notOccurredMoney' },
                    align: 'left',
                    width: '16%',
                },
                {
                    title: '费用周期',
                    key: 'beginTime',
                    dataIndex: 'beginTime',
                    align: 'left',
                    scopedSlots: { customRender: 'beginTime' },
                },
            ],
            dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            BillExpenses: [], // 账单费用 
            copyBill:{},
            printObj: {
              id: "printMe",
              popTitle: '账单明细',
              extraCss: '',
              extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
            }
        }
    },
    created() {
        this.getBill();    
    },
    computed: {
        totalMoney() {
            let total = 0;
            for (let item of this.BillExpenses) {
                if (item.feeDirection === 1) {
                total += item.originalMoney * 1;
                } else {
                total -= item.originalMoney * 1;
                }
            }
            return total.toFixed(2);
        }
    },
    methods: {
        getBill() {
            getPrintInfo(this.billId).then(res => {

                if (res.code === '200') {
                    let bill = res.data;
                    this.copyBill = Object.assign({}, bill);
                    this.BillExpenses = this.copyBill.detailList;
                    this.BillExpenses.forEach(function(e) {
                        e.originalMoney = e.originalMoney/100;
                        e.occurredMoney = e.occurredMoney/100;
                        e.notOccurredMoney = e.notOccurredMoney/100;
                    }, this);  
                    

                }
            })
        },
        print(){
          window.print()
        },
        closeThis() {
            this.$emit('closeThis', true);
        },





    }

}
</script>

<style scoped lang="less">
.printInfo-box {
    // padding: 0 20px 20px 20px;
    height: calc(100vh - 230px);
    overflow: auto;
     @media print {
        .Noprn {
        visibility: hidden;
        }
      
        // .contract-modular{
        //     width: 650px;
        // }
        // .bill-top{
        //     width: 650px;
        // }
        // .together-detail{
        //     border-left: 1px solid #DDDDDD;
        //     border-top: 1px solid #DDDDDD;
        // }
    }
    .info-top{
      margin:30px auto;
        width:50%;
        height:28px;
        font-size:20px;
        text-align: center;
    }
    .contract-modular {
        width: 647px; // padding: 13px 0 5px 18px;
        .titleInfo {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            position: relative;
            box-sizing: border-box;
            margin: 11px 0;
            b {
                font-weight: normal;
            }
        }
    }
    .bill-top {
        height: 20px;
        overflow: hidden;
        width: 100%;
        // margin-top: 30px;
        margin-bottom: 11px;
        // padding: 0 20px;
        >p {
            float: left;
            height: 20px;
            width: 166px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(17, 17, 17, 1);
            
        }
        .border-p {
            border-left: 1px solid #DDDDDD;
            
        }
    }

    .foot {
        height: 80px;
        padding: 20px;
        .btn {
            width: 120px;
            margin-left: 20px;
            // width: 120px;
            height: 40px; // background:rgba(10,135,248,1);
            border-radius: 5px;
            float: right;
        }
        .cancelFont{
            background-color:#DDDDDD;
            // border-color:#DDDDDD;
            background: rgba(246,247,248,1);
            color:#666666;
        }
        /deep/ .ant-btn-primary{
            border-color: #DDDDDD;
        }
    }
    
}
</style>
