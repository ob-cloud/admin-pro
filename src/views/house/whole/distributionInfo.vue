<template>
    <div class="distribution-box">
        <!-- 保洁列表 -->
        <div class="table">
            <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="info">
                    <div slot="status" slot-scope="status">
                        <div v-if="status==1" class="fontNormal">
                            <div class="normalBg">
                                <span>待处理</span>
                            </div>
                        </div>
                        <div v-else-if="status==2" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2">
                                <span>处理中</span>
                            </div>
                        </div>
                        <div v-else-if="status==3" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg3 prohibitBg f-fl">
                                <span>待验收</span>
                            </div>
                        </div>
                        <div v-else-if="status==4" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg4">
                                <span>已完成</span>
                            </div>
                        </div>
                        <div v-else-if="status==5" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg5">
                                <span>已取消</span>
                            </div>
                        </div>
                    </div>
                    <div slot="applyName" slot-scope="text,record">
                        {{record.applyName}}-{{record.applyPhone}}
                    </div>
                    <div slot="expectCompleteDate" slot-scope="text">
                        {{text?$moment(text).format('YYYY.MM.DD'):'-'}}
                    </div>
                    <div slot="goods" slot-scope="text">
                        <div class="clearfix">
                            <div v-for="(item,index) in text" :key="index" class="goodsTypeStyle f-fl">
                                <span>{{item}}</span>
                            </div>
                        </div>
                    </div>
                    <div slot="action" slot-scope="text, record">
                        <div @click.stop="openFun(record)" class="action cursor">详情</div>
                    </div>
                </a-table>
            <div class="contFoot" v-show="this.info.length>0">
                <a-pagination size="small" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger showQuickJumper @change="onSizeChange" @showSizeChange="onShowSizeChange" />
            </div>
        </div>
    </div>
</template>

<script>
import { distributionListForHouse } from '@/api/workorder';
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
                    title: '申请人',
                    dataIndex: 'applyName',
                    key: 'applyName',
                    scopedSlots: { customRender: 'applyName' },
                    align: 'left',
                    width: '202px',
                },
                {
                    title: '希望配货完成时间',
                    dataIndex: 'expectCompleteDate',
                    key: 'expectCompleteDate',
                    scopedSlots: { customRender: 'expectCompleteDate' },
                    align: 'left',
                    width: '235px',
                    style: 'padding-left:10px;'
                },
                {
                    title: '物品',
                    key: 'goods',
                    dataIndex: 'goods',
                    scopedSlots: { customRender: 'goods' },
                    align: 'left',
                    width: '316px',
                },
                {
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'center',
                    width: '80px',

                },
            ],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,//每页中显示10条数据
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
            },
        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        onSizeChange(current) {
            this.pagination.current = current;
            this.getInfo();
        },
        onShowSizeChange(current, pageSize) {
            this.pagination.current = current;
            this.pagination.pageSize = pageSize;
            this.getInfo();
        },
        getInfo(){
            let parameter = {
                current: this.pagination.current,
                houseId : this.houseId,
                pageSize:this.pagination.pageSize,
            };
            distributionListForHouse(parameter).then(res => {
                if (res.code === '200') {
                    this.info = res.data.records;
                    this.pagination.total = res.data.total;
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

}
</script>

<style scoped lang="less">
.distribution-box {
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
                color: #FB4246;
            }
        }
        .fontProhibit {
            .prohibitBg2 {
                color: #03C683;
            }
            .prohibitBg3 {
                color: #FFA036;
            }
            .prohibitBg4 {
                color: #0A87F8;
            }
            .prohibitBg5 {
                color: #666666;
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
        .goodsTypeStyle{
            margin: 0 5px 5px 0;
            span{
                color: #111111;
                padding: 2px 8px;
                text-align: center;
                background:rgba(247,248,251,1);
                border-radius:4px;
                border:1px solid rgba(238,238,238,1);
            }
        }
        & /deep/ .ant-table-thead>tr>th,
        & /deep/ .ant-table-tbody>tr>td {
            padding: 12px 9px;
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
    }
}
</style>
