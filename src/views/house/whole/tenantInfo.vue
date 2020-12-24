<template>
    <div class="tenantInfo-box">
        <!-- 租客合同详情 -->
        <div class="table">
                <!-- :scroll="{ y: 496 }"  -->
                <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="info">
                    <div slot="status" slot-scope="status">
                        <div v-if="status==1" class="fontNormal">
                            <div class="normalBg">
                                <span>待签字</span>
                            </div>
                        </div>
                        <div v-else-if="status==2" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2">
                                <span>在租中</span>
                            </div>
                        </div>
                        <div v-else-if="status==3" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg3 prohibitBg f-fl">
                                <span>即将搬入</span>
                            </div>
                        </div>
                        <div v-else-if="status==4" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg4">
                                <span>即将搬出</span>
                            </div>
                        </div>
                        <div v-else-if="status==5" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg5">
                                <span>已到期</span>
                            </div>
                        </div>
                        <div v-else-if="status==6" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg6">
                                <span>正常退</span>
                            </div>
                        </div>
                        <div v-else-if="status==7" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg6">
                                <span>非正常退</span>
                            </div>
                        </div>
                        <div v-else-if="status==8" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg6">
                                <span>已作废</span>
                            </div>
                        </div>
                        <div v-else-if="status==9" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg3">
                                <span>已被续约</span>
                            </div>
                        </div>
                    </div>
                    <div slot="signType" slot-scope="text">
                        <span v-if="text == 1">新签</span>
                        <span v-else >续签</span>
                    </div>
                    <div slot="name" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;" v-if="viewRenterPhoneFlag"> {{text}}-{{record.phone}}</p>
                              <p style="padding: 8px 18px;" v-else> {{text}}-{{record.phone|formatPhone}}</p>
                            </template>
                            <p class="overHidde" style="width:166px;" type="primary" v-if="viewRenterPhoneFlag">{{text}}-{{record.phone}}</p>
                          <p class="overHidde" style="width:166px;" type="primary" v-else>{{text}}-{{record.phone|formatPhone}}</p>
                        </a-popover>

                    </div>
                    <div slot="price" slot-scope="text">
                        {{text/100}}
                    </div>
                    <div slot="deposit" slot-scope="text">
                        {{text/100}}
                    </div>
                    <div slot="periodMonth" slot-scope="text,record">
                        <span v-if="record.periodMonth===99">一次性付</span>
                        <span v-else>押 {{record.depositMonth===90?'自定义':record.depositMonth}} 付 {{record.periodMonth}}</span>
                    </div>
                    <div slot="beginTime" slot-scope="text,record">
                        {{$moment(record.beginTime).format('YYYY.MM.DD')}}-{{$moment(record.endTime).format('YYYY.MM.DD')}}
                    </div>
                    <div slot="action" slot-scope="text, record">
                        <div @click.stop="openFun(record)" class="action cursor">详情</div>

                    </div>
                </a-table>

            </div>
    </div>
</template>

<script>
import { listContractSimpleByHouseId } from '@/api/wholeHouse';
export default {
    name: "tenantInfo",
    props: {
        houseId: {
            type: String
        }
    },
    data() {
        return {
            info:[],
            // reserveDetailDialog:false,
            tableColumns: [
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    align: 'left',
                    scopedSlots: { customRender: 'status' },
                    width: '80px',
                },
                {
                    title: '签约类型',
                    dataIndex: 'signType',
                    key: 'signType',
                    scopedSlots: { customRender: 'signType' },
                    align: 'left',
                    width: '90px',
                },
                {
                    title: '租客信息',
                    dataIndex: 'name',
                    key: 'name',
                    scopedSlots: { customRender: 'name' },
                    align: 'left',
                    width: '80px',
                    style: 'padding-left:10px;'
                },
                {
                    title: '租金(元/月)',
                    key: 'price',
                    dataIndex: 'price',
                    scopedSlots: { customRender: 'price' },
                    align: 'left',
                    width: '90px',
                },
                {
                    title: '押金(元)',
                    key: 'deposit',
                    dataIndex: 'deposit',
                    align: 'center',
                    scopedSlots: { customRender: 'deposit' },
                    width: '80px',
                },
                {
                    title: '付款方式',
                    key: 'periodMonth',
                    dataIndex: 'periodMonth',
                    scopedSlots: { customRender: 'periodMonth' },
                    align: 'left',
                    width: '100px',
                },
                {
                    title: '合同周期',
                    key: 'beginTime',
                    dataIndex: 'beginTime',
                    scopedSlots: { customRender: 'beginTime' },
                    align: 'left',
                    width: '180px',
                },
                {
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'center',
                    width: '80px',

                },
            ],
          viewRenterPhoneFlag:false,
        }
    },
    created() {
      this.initViewRenter();
        this.getInfo();
    },
    methods: {
      initViewRenter(){
        let isExit = false;
        let permissions = JSON.parse(sessionStorage.getItem('permissions'));
        permissions.some(function(value){
          if (value.mark == 'mk_contract_tenant_zkdh'){
            isExit = true;
          }
        });
        this.viewRenterPhoneFlag = isExit;
      },
        getInfo(){
            listContractSimpleByHouseId(this.houseId).then(res => {
                if (res.code === '200') {
                    this.info = res.data;

                }
            })
        },
        openFun(record) {
            this.$emit('openDetail', record.id);
        },
        openDetail(record) {
            return {
                on: {
                    click: () => {
                       this.$emit('openDetail', record.id);
                    }
                }
            }
        },
    },
  filters: {
    formatPhone:function (value) {
      var str = String(value)
      var len = str.length;
      var prev,next;
      if (len >= 7) {
        prev = str.slice(-len,-8)
        next = str.slice(-4)
        str = prev+"****"+next
      } else if (len < 7 && len >= 6) {
        prev = str.slice(-len,-4)
        next = str.slice(-2)
        str = prev + "**" + next
      }
      if(!value){
        str = '-';
      }
      return str
    },
  },
}
</script>

<style scoped lang="less">
.tenantInfo-box {
    margin-bottom: 20px;
    .table {
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
                color: rgba(255, 160, 54, 1);
            }
        }
        .fontProhibit {
            .prohibitBg2 {
                color: rgba(10, 135, 248, 1);
            }
            .prohibitBg3 {
                color: #03C683;
            }
            .prohibitBg4 {
                color: #9F6EEC;
            }
            .prohibitBg5 {
                color: #FB4246;
            }
            .prohibitBg6 {
                color: rgba(119, 119, 119, 1);
            }
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
                border: 1px solid #777777;
                border-radius: 10px;
                width: 36px;
                float: left;
                margin-left: 4px;
                .leaderLength {
                    width: 27px;
                    margin-left: 5px;
                    font-size: 12px;
                }
            }
        }
        & /deep/ .ant-table-thead>tr>th,
        & /deep/ .ant-table-tbody>tr>td {
            padding: 12px 9px;
        }
    }
}
</style>
