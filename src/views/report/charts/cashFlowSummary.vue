<template>
    <div class="wrap">
        <div class="top">
            <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            <div>
                <div class="search-condition clearfix">
                    <div class="search-condition-time f-fl">
                        <span>查看方式：</span>
                        <span class="currentMonth cursor" :class="groupModeOne?'clickStyle':'normalStyle'" @click="changeGroupMode(2)">按经办人</span><span class="currentYear cursor" :class="!groupModeOne?'clickStyle':'normalStyle'" @click="changeGroupMode(1)">按部门</span>
                    </div>
                    <div class="search-condition-divider f-fl"></div>
                    <div class="search-condition-time f-fl">
                        <span>实际收/付款日期：</span>
                        <span class="currentMonth cursor" :class="currentMonth?'clickStyle':'normalStyle'" @click="changeCurrentMonth">本月</span><span class="currentYear cursor" :class="!currentMonth?'clickStyle':'normalStyle'" @click="changeCurrentYear">全年</span>
                        <a-range-picker @change="(date,dateString)=>changeDate(date, dateString)" :format="dateFormat" v-model="timeDateList"/>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">部门：</div>
                        <div class="f-fl" style="margin-top: 0.5px;"><dept-employee-tree placeholder="请选择部门" :showNameAll="false" :showEmployee="false" @selectChange="selectDept" placement="bottomRight" ref="selectDeptEmp" minWidth="250px" width="90px" ></dept-employee-tree></div>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px;"></div>
                    <div class="f-fl selectCostType clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">费用科目：</div>
                        <div class="f-fl"  style="max-width: 200px;margin-top: 1px;">
                            <cost-type-select :showAll="false" ref="selectCostType" @selectChange="selectCostType">
                            </cost-type-select>
                        </div>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">收/付款方向：</div>
                        <div class="f-fl">
                            <a-select v-model="sendData.feeDirection" placeholder="全部" style="width: 60px;margin-top: 2px" @change="changeFeeDirection">
                                <a-select-option :value="0">全部</a-select-option>
                                <a-select-option :value="1">收入</a-select-option>
                                <a-select-option :value="2">支出</a-select-option>
                            </a-select>
                        </div>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl" style="margin: 14px 0 0 5px;color: #0A87F8;">
                        <a-popover :title="null" trigger="hover" placement="bottomLeft">
                            <template slot="content">
                                <div @click="exportExcel" class="action cursor">下载</div>
                            </template>
                            <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                        </a-popover>
                    </div>
                </div>
            </div>
        </div>
        <div class="con" v-show="statusActiveIndex == 0">
            <div class="charts-list">
                <div class="charts-item">
                    <p>周期内人员收/付金额统计</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div id="chart1"></div>
                </div>
            </div>
        </div>
        <div class="con" v-show="statusActiveIndex == 1">
            <a-table :loading="loading" size="middle" rowKey="empName" :columns="columns" :dataSource="tableData.list" :pagination="false" bordered>

            </a-table>
            <a-pagination style="margin-top: 20px" v-if="tableData.total" class="f-fr" size="small" :total="tableData.total" :showTotal="total => `共 ${total} 条`"
                          @change="pageChange" @showSizeChange="sizeChange"
                          :current="sendData.current"
                          showSizeChanger showQuickJumper/>
        </div>
        <!-- 导出框-->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
            <exportExcel @closeThis="exportExcelShow=false" :showTotalFlag="false" @saveSure="changeStatus(statusActiveIndex)" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
        </a-modal>
    </div>
</template>

<script>
    import G2  from '@antv/g2';
    import Vue from 'vue';
    import TopStatus from '@/components/TopStatus/index';
    import  * as API from '@/api/financeReport';
    import DeptEmployeeTree from '@/components/DeptEmployeeTree';
    import CostTypeSelect from '@/components/CostTypeSelect/index';
    import exportExcel from '@/components/exportExcel/index';
    const currentMonth = Vue.prototype.$moment().startOf('month').valueOf();
    const oneMonth = Vue.prototype.$moment().endOf('month').valueOf();
    const currentYear = Vue.prototype.$moment().startOf('year').valueOf();
    const oneYear = Vue.prototype.$moment().endOf('year').valueOf();
    export default {
        name: "cashFlowSummary",
        components: {
            TopStatus,
            DeptEmployeeTree,
            CostTypeSelect,
            exportExcel,
        },
        data() {
            return {
                loading: false,
                statusActiveIndex: 0,
                statusData: [
                    {
                        title: '图表',
                        index: 0,
                        // mark: ['mk_source_tenant_ck']
                    },
                    {
                        title: '数据',
                        index: 1,
                        // mark: ['mk_source_tenant_ck']
                    },
                ],
                tableData: {
                    list: [],
                    total: 0,
                },
                columns:[],
                columns1: [
                    {
                        title: '#',
                        dataIndex: 'index',
                        key: 'index',
                        align: 'center',
                        width: '50px',
                        customRender: (text, row, index) => {
                            if (row["empName"]!='合计') {
                                return <div>{text}</div>;
                            }
                            return {
                                attrs: {
                                    colSpan: 0,
                                },
                            };
                        },
                    },
                    {
                        title: '经办人姓名',
                        dataIndex: 'empName',
                        key: 'empName',
                        customRender: (text, row, index) => {
                            if (row["empName"]!='合计') {
                                return <div>{text}</div>;
                            }
                            return {
                                children: <div>{text}</div>,
                                attrs: {
                                    colSpan: 3,
                                },
                            };
                        },
                    },
                    {
                        title: '经办人所属部门',
                        dataIndex: 'deptName',
                        key: 'deptName',
                        customRender: (text, row, index) => {
                            if (row["empName"]!='合计') {
                                return <div>{text}</div>;
                            }
                            return {
                                children: <div>{text}</div>,
                                attrs: {
                                    colSpan: 0,
                                },
                            };
                        },
                    },
                ],
                columns2: [
                    {
                        title: '#',
                        dataIndex: 'index',
                        key: 'index',
                        align: 'center',
                        width: '50px',
                        customRender: (text, row, index) => {
                            if (row["deptName"]!='合计') {
                                return <div>{text}</div>;
                            }
                            return {
                                children: <div>{text}</div>,
                                attrs: {
                                    colSpan: 0,
                                },
                            };
                        },
                    },
                    {
                        title: '部门',
                        dataIndex: 'deptName',
                        key: 'deptName',
                        customRender: (text, row, index) => {
                            if (row["deptName"]!='合计') {
                                return <div>{text}</div>;
                            }
                            return {
                                children: <div>{row["deptName"]}</div>,
                                attrs: {
                                    colSpan: 2,
                                },
                            };
                        },
                    },
                ],
                columnsEnd: [
                    {
                        title: '结余',
                        dataIndex: 'totalBalance',
                        key: 'totalBalance',
                    },
                ],
                sendData: {
                    deptId:'',
                    feeDirection:undefined,
                    feeSubjectIdList:[],
                    groupMode:2,        //分组方式（1：按部门；2：按人员）
                    isOccur:1,
                    predictTimeBegin:'',
                    predictTimeEnd:'',
                    current:1,
                    size:10,
                    practicalTimeBegin:currentMonth,
                    practicalTimeEnd:oneMonth,
                },
                currentMonth:true,
                groupModeOne:true,
                chart1Model:null,
                chart1Data:[],
                exportExcelShow:false,
                exportUrl: '/pc2b/da/fin/list_cash_flow_group_stat_data_export',
                exportData:{},
                timeDateList:[Vue.prototype.$moment(currentMonth),Vue.prototype.$moment(oneMonth)],
                dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            }
        },
        mounted(){
        },
        created() {
            this.initChart1Data(true);
        },
        methods: {
            // 导出
            exportExcel() {
                this.exportData = Object.assign({}, this.sendData);
                this.exportExcelShow = true;
            },
            //选择负责人
            selectDept(selectObj) {
                this.sendData.deptId = selectObj.id;
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart1Data(false);
                }
            },
            // 费用类型方法
            selectCostType(selectObj){
                this.sendData.feeSubjectIdList = [];
                let nameStr = ''
                selectObj.metaList && selectObj.metaList.forEach((item)=>{
                    this.sendData.feeSubjectIdList.push(item.id)
                    nameStr = nameStr + item.name + ';'
                })
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart1Data(false);
                }
            },
            changeFeeDirection(){
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart1Data(false);
                }
            },
            changeGroupMode(val){
                this.sendData.groupMode=val;
                if(val==2){
                    this.groupModeOne = true;
                }else{
                    this.groupModeOne = false;
                }
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart1Data(false);
                }
            },
            changeCurrentMonth(){
                this.currentMonth = true;
                this.sendData.practicalTimeBegin=currentMonth;
                this.sendData.practicalTimeEnd=oneMonth;
                this.timeDateList = [Vue.prototype.$moment(currentMonth),Vue.prototype.$moment(oneMonth)];
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart1Data(false);
                }
            },
            changeCurrentYear(){
                this.currentMonth = false;
                this.sendData.practicalTimeBegin=currentYear;
                this.sendData.practicalTimeEnd=oneYear;
                this.timeDateList = [Vue.prototype.$moment(currentYear),Vue.prototype.$moment(oneYear)];
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart1Data(false);
                }
            },
            changeDate(date) {
                this.sendData.practicalTimeBegin=date[0];
                this.sendData.practicalTimeEnd=date[1];
                //若开始结束日期都为空
                if(!this.sendData.practicalTimeBegin){
                    this.$message.error("请选择开始时间");
                    return;
                }
                if(!this.sendData.practicalTimeEnd){
                    this.$message.error("请选择结束时间");
                    return;
                }
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart1Data(false);
                }
            },
            changeStatus(status) {
                this.statusActiveIndex = status.index;
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart1Data(false);
                }
            },
            initChart1Data(val){
                API.cashFlowGroupStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        let dataTemp = res.data;
                        this.chart1Data = [];
                        dataTemp.forEach((item)=>{
                            let itemTemp1 = {};
                            itemTemp1.name = item.name;
                            itemTemp1.condition = '收入';
                            itemTemp1.value = item.incomeAmount/100;
                            this.chart1Data.push(itemTemp1);
                            let itemTemp2 = {};
                            itemTemp2.name = item.name;
                            itemTemp2.condition = '支出';
                            itemTemp2.value = item.expendAmount/100;
                            this.chart1Data.push(itemTemp2);
                            let itemTemp3 = {};
                            itemTemp3.name = item.name;
                            itemTemp3.condition = '差额';
                            itemTemp3.value = item.diffAmount/100;
                            this.chart1Data.push(itemTemp3);
                        });
                        if(val){
                            this.chart1();
                        }else{
                            this.updateChart1();
                        }
                    }
                })
            },
            chart1(){
                this.chart1Model = new G2.Chart({
                    container: 'chart1',
                    forceFit: true,
                    height: 500
                });
                this.chart1Model.source(this.chart1Data);
                this.chart1Model.interval().position('name*value').color('condition')
                    .adjust([{
                        type: 'dodge',
                        marginRatio: 1 / 32
                    }]);
                this.chart1Model.render();

            },
            updateChart1(){
                this.chart1Model.changeData(this.chart1Data);
            },
            initTableData(){
                this.columns = [];
                if(this.groupModeOne){
                    this.columns1.forEach((item)=>{
                        this.columns.push(item);
                    });
                }else{
                    this.columns2.forEach((item)=>{
                        this.columns.push(item);
                    });
                }
                if(this.sendData.feeDirection==0){
                    this.sendData.feeDirection = undefined;
                }
                API.listCashFlowGroupStatData(this.sendData).then(res => {
                    if (res.code === '200') {
                        let tempTitle =  res.data.dynamicColumnList;
                        let dynamicTitleCol = [];
                       //获取动态列名称
                        if(tempTitle&&tempTitle.length>0) {
                            tempTitle.forEach((item) => {
                                let itemTemp = {};
                                itemTemp.title = item;
                                itemTemp.dataIndex = item;
                                itemTemp.key = item;
                                dynamicTitleCol.push(itemTemp);
                                this.columns.push(itemTemp);
                            });
                        }
                        this.columnsEnd.forEach((item)=>{
                            this.columns.push(item);
                        });
                        //获取列值
                        if(res.data.cashFlowGroupStatDataList && res.data.cashFlowGroupStatDataList.length>1) {
                            res.data.cashFlowGroupStatDataList.forEach((item, index) => {
                                if(this.groupModeOne){
                                    if (item.empName != '合计') {
                                        item.index = index + 1;
                                    }
                                }
                                if(!this.groupModeOne) {
                                    if (item.deptName != '合计') {
                                        item.index = index + 1;
                                    }
                                    item.empName = item.deptName;
                                }
                                item.totalBalance = item.totalBalance / 100;
                                for (let i = 0; i < item.dynamicColumnValList.length; i++) {
                                    item[dynamicTitleCol[i].key] = item.dynamicColumnValList[i] / 100;
                                }
                            });
                            this.tableData.list = res.data.cashFlowGroupStatDataList;
                        }
                        else{
                            this.tableData.list = [];
                        }
                    }
                })
            },
        },
    }
</script>

<style scoped lang="less">
    .wrap{
        & /deep/ .ant-input{
            border: none;
            font-size: 14px;
        }
        .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            border-bottom: 1px solid #DDDDDD;
            .search-condition {
                font-size: 14px;
                .search-condition-time {
                    height: 50px;
                    line-height: 50px;
                    .currentMonth {
                        border-top-left-radius: 10px;
                        border-bottom-left-radius: 10px;
                        padding: 4px;
                    }

                    .currentYear {
                        border-top-right-radius: 10px;
                        border-bottom-right-radius: 10px;
                        padding: 4px;
                    }

                    .normalStyle {
                        background: fade(#777777, 10%);
                        color: #777777;
                    }

                    .clickStyle {
                        background: fade(#0A87F8, 10%);
                        color: #0A87F8;
                    }
                }
                .search-condition-divider{
                    width:14px;
                    height: 20px;
                    border-right: 1px dashed #DDDDDD;
                    margin-top: 15px;
                    margin-right: 14px;
                }
            }
        }
        .con{
            padding: 20px;
            height: calc(100vh - 150px);
            overflow-y: scroll;
            .charts-list{
                display: flex;
                margin-right: -20px;
                .charts-item{
                    margin: 0 20px 20px 0;
                    padding: 20px;
                    flex: 1;
                    /*height: 260px;*/
                    box-shadow: 0px 2px 10px 0px rgba(142,164,218,0.15);
                    border-radius: 8px;
                    border:1px solid #EEEEEE;
                    color: #000000;
                }
            }
        }
    }
    /deep/ .ant-calendar-range-picker-input{
        width: 90px;
    }
    /deep/ .ant-calendar-picker{
        width: 220px;
    }
    /deep/ .ant-calendar-picker .ant-input{
        padding: 4px 0;
    }
    & /deep/ .text-date-picker {
        line-height: 1;
        height: auto;
        .ant-calendar-range-picker-input {
            text-align: left; // font-size:12px;
        }
        .ant-calendar-picker-icon {
            display: none;
        }
        .ant-calendar-range-picker-separator {
            line-height: 30px;
        }
    }
    & /deep/ .ant-input{
        font-size: 14px;
        box-shadow: none;
        border: none;
    }
    /deep/ .ant-calendar-picker{
        box-shadow: none;
    }
    /deep/ .ant-calendar-picker-clear{
        z-index:-99;
    }
    & /deep/ .ant-select-selection{
        box-shadow: none;
        border: none;
        height: 28px;
    }
    /deep/ .tree{
        min-width: 200px;
    }
    .selectCostType {
        /deep/ .select-type-list {
            min-width: 60px;
            border-bottom:none;
        }
        /deep/ .tree{
            width: 300px;
        }
    }
    & /deep/ .ant-table-thead > tr > th:last-child{
        color: #FFA036;
    }
    & /deep/ .ant-table-tbody > tr:last-child{
        color: #0A87F8;
    }
    & /deep/ .ant-table-tbody > tr:last-child{
        td:first-child{
            text-align: center;
        }
    }
    /deep/ .ant-select-arrow-icon{
        color: #0A87F8;
    }
    & /deep/ .ant-popover {
        .ant-popover-inner-content {
            padding: 0;
            .action {
                padding: 8px 10px;
            }
            .action:hover {
                cursor: pointer;
                background: rgba(10, 135, 248, 0.1);
                color: @themeColor;
            }
        }
    }
    /deep/ .ant-select-selection__rendered{
        font-size: 14px;
        margin-left: 0;
        margin-right: 0;
    }
    /deep/ .ant-calendar-range-picker-separator{
        vertical-align:baseline !important;
    }
    /deep/ .tree-wrap{
        svg{
            width: 12px;
            height: 12px;
        }
    }
</style>
