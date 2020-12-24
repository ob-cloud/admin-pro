<template>
    <div class="clean-box">
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
                    <div slot="visitDate" slot-scope="text">
                        {{text?$moment(text).format('YYYY.MM.DD'):'-'}}
                    </div>
                    <div slot="promotionDesc" slot-scope="text,record">
                        <span class="typeNameStyle" v-if="record.cleanTypeName">{{record.cleanTypeName}}</span>
                        <span class="descStyle overHidde">{{text?text:'-'}}</span>
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
import { cleanListForHouse } from '@/api/workorder';
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
                    title: '期望上门时间',
                    dataIndex: 'visitDate',
                    key: 'visitDate',
                    scopedSlots: { customRender: 'visitDate' },
                    align: 'left',
                    width: '235px',
                    style: 'padding-left:10px;'
                },
                {
                    title: '保洁类型/需求描述',
                    key: 'promotionDesc',
                    dataIndex: 'promotionDesc',
                    scopedSlots: { customRender: 'promotionDesc' },
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
            cleanListForHouse(parameter).then(res => {
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
.clean-box {
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
        & /deep/ .ant-table-thead>tr>th,
        & /deep/ .ant-table-tbody>tr>td {
            padding: 12px 9px;
        }
        .typeNameStyle{
            font-size:12px;
            background:rgba(19,139,247,0.1);
            color: #0A87F8;
            padding: 4px 6px;
            margin-right: 5px;
        }
        .descStyle{
            color: #111111;
            font-size: 14px;
            max-width: 250px;
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
