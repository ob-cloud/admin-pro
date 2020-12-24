<template>
    <div class="destineInfo-box">
        <!-- 预定详情 -->
        <div class="table">
                <!-- :scroll="{ y: 496 }"  -->
                <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="info">
                    <div slot="bookStatus" slot-scope="bookStatus">
                        <div v-if="bookStatus==1" class="fontProhibit fontProhibitColor">
                            <div class="IconRadius prohibitBg6 f-fl"></div>
                            <div>
                                <span>待支付</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==2" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>待使用</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==3" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg3 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已使用</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==4" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg4  IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已退定</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==5" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg5 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已作废</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==6" class="fontProhibit fontProhibitColor">
                            <div class="IconRadius prohibitBg5 f-fl"></div>
                            <div>
                                <span>预定失败</span>
                            </div>
                        </div>
                        <div v-else-if="bookStatus==7" class="fontProhibit fontProhibitColor">
                            <div class="IconRadius prohibitBg2 f-fl"></div>
                            <div>
                                <span>待确认</span>
                            </div>
                        </div>
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
                    <div slot="houseAddress" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span class="houseAlias" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.houseAddress}} </p>

                            </template>
                            <p class="overHidde" style="width:354px;" type="primary">
                                <span class="houseAlias" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.houseAddress}}</p>
                        </a-popover>
                    </div>
                    <div slot="signDate" slot-scope="text">
                        {{text ?  $moment(text).format('YYYY-MM-DD') : '-'}}

                    </div>
                    <div slot="rentMonth" slot-scope="text">
                        <span>{{text ? text+'个月' : '-'}}</span>
                    </div>
                    <div slot="money" slot-scope="text">
                        {{text/100}}
                    </div>
                    <div slot="action" slot-scope="text, record">
                        <div @click.stop="openFun(record)" class="action cursor">详情</div>

                    </div>
                </a-table>

            </div>
    </div>
</template>

<script>
import { listAllNyHouseId } from '@/api/wholeHouse';
export default {
    name: "destineInfo",
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
                    dataIndex: 'bookStatus',
                    key: 'bookStatus',
                    align: 'left',
                    scopedSlots: { customRender: 'bookStatus' },
                    width: '100px',
                },
                {
                    title: '预定人信息',
                    dataIndex: 'name',
                    key: 'name',
                    scopedSlots: { customRender: 'name' },
                    align: 'left',
                    width: '160px',
                },
                {
                    title: '定金（元）',
                    key: 'money',
                    dataIndex: 'money',
                    scopedSlots: { customRender: 'money' },
                    align: 'left',
                    width: '110px',
                },
                {
                    title: '最晚签约日',
                    key: 'signDate',
                    dataIndex: 'signDate',
                    scopedSlots: { customRender: 'signDate' },
                    align: 'left',
                    width: '110px',
                },
                {
                    title: '预计租住时长',
                    key: 'rentMonth',
                    dataIndex: 'rentMonth',
                    align: 'center',
                    scopedSlots: { customRender: 'rentMonth' },
                    width: '110px',
                },

                {
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'center',
                    width: '88px',

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
          if (value.mark == 'mk_contract_reserve_zkdh'){
            isExit = true;
          }
        });
        this.viewRenterPhoneFlag = isExit;
      },
        getInfo(){
            listAllNyHouseId(this.houseId).then(res => {
                if (res.code === '200') {
                    this.info = res.data;


                }
            })
        },
        openFun(record) {
            // this.reserveDetailDialog = true;
            this.$emit('openDetail', record.id);
        },
        openDetail(record) {
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
.destineInfo-box {
    margin-bottom: 20px;
    .table {
        // min-width: 1200px;
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
            .prohibitBg2 {
                background: rgba(255, 160, 54, 1);
            }
            .prohibitBg3 {
                background: rgba(10, 135, 248, 1);
            }
            .prohibitBg4,
            .prohibitBg5 {
                background: rgba(119, 119, 119, 1);
            }
          .prohibitBg6 {
            background: rgb(251, 66, 70);
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
