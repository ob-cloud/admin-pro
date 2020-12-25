<template>
    <div class="wrap">
        <div class="top">
            <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            <div>
                <div class="search-condition clearfix">
                    <div class="search-condition-time f-fl">
                        <span>查看方式：</span>
                        <span class="currentMonth cursor" :class="groupModeOne?'clickStyle':'normalStyle'" @click="changeGroupMode(2)">按签约人</span><span class="currentYear cursor" :class="!groupModeOne?'clickStyle':'normalStyle'" @click="changeGroupMode(1)">按部门</span>
                    </div>
                    <div class="search-condition-divider f-fl"></div>
                    <div class="search-condition-time f-fl">
                        <span>指定统计周期：</span>
                        <span class="currentMonth cursor" :class="currentMonth?'clickStyle':'normalStyle'" @click="changeCurrentMonth">本月</span><span class="currentYear cursor" :class="!currentMonth?'clickStyle':'normalStyle'" @click="changeCurrentYear">全年</span>
                        <a-range-picker @change="(date,dateString)=>changeDate(date, dateString)" :format="dateFormat" v-model="timeDateList"/>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">部门：</div>
                        <div class="f-fl" style="margin-top: 0.5px;"><dept-employee-tree placeholder="请选择部门" resMark="mk_contract_renter" :showNameAll="false" :showEmployee="false" @selectChange="selectDept" placement="bottomRight" ref="selectDeptEmp" minWidth="250px" width="90px" ></dept-employee-tree></div>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl selectCostType clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">城市：</div>
                        <div class="f-fl" style="width: 100px;">
                            <city-town-tree ref="selectCityTown" :showNameAll="false"  @selectChange="selectCityTownChange"></city-town-tree>
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
                    <p>合同统计</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div class="detail">
                        <div>
                            <div class="item item-1" style="background: #EDF6FF">
                                <div class="item-con">
                                    <p style="color: #0a87f8;font-size: 18px">{{data1.newSign}} <span style="font-size: 14px">份</span></p>
                                    <p>新签合同数</p>
                                </div>
                            </div>
                            <div class="item item-2" style="background: #EFFCE0">
                                <div class="item-con">
                                    <p style="color: #03C683;font-size: 18px">{{data1.extendSign}} <span style="font-size: 14px">份</span></p>
                                    <p>续签合同数</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="item item-3" style="background: #FDF2F0">
                                <div class="item-con">
                                    <p style="color: #FB4246;font-size: 18px">{{data1.abnormalBreak}} <span style="font-size: 14px">份</span></p>
                                    <p>违约合同数</p>
                                </div>
                            </div>
                            <div class="item item-4" style="background: #E0E0E0">
                                <div class="item-con">
                                    <p style="color: #666666;font-size: 18px">{{data1.normalBreak}} <span style="font-size: 14px">份</span></p>
                                    <p>正常退租合同数</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="charts-item">
                    <p>出房合同周期分布</p>
                    <div id="chart1"></div>
                </div>
            </div>
            <div class="charts-list">
                <div class="charts-item">
                    <p>出房合同新签、续签、正常退租、违约合同数量统计</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div id="chart2"></div>
                </div>
            </div>
        </div>
        <div class="con" v-show="statusActiveIndex == 1">
            <a-table :loading="loading" size="middle" rowKey="empName" :columns="columns" :dataSource="tableData.list" :pagination="false" bordered>

            </a-table>
            <a-pagination style="margin-top: 20px" v-if="tableData.total" class="f-fr" size="small" :total="tableData.total" :showTotal="total => `共 ${total} 条`"
                          @change="onSizeChange" @showSizeChange="onShowSizeChange"
                          :current="sendData.current"
                          showSizeChanger/>
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
    import DeptEmployeeTree from '@/components/DeptEmployeeTree';
    import CityTownTree from '@/components/CityTownTree';
    import exportExcel from '@/components/exportExcel/index';
    import  * as API from '@/api/houseReport';
    const currentMonth = Vue.prototype.$moment().startOf('month').valueOf();
    const oneMonth = Vue.prototype.$moment().endOf('month').valueOf();
    const currentYear = Vue.prototype.$moment().startOf('year').valueOf();
    const oneYear = Vue.prototype.$moment().endOf('year').valueOf();
    export default {
        name: "outHouseReport",
        components: {
            TopStatus,
            DeptEmployeeTree,
            CityTownTree,
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
                columns: [],
                columnsEmp: [
                    {
                        title: '#',
                        dataIndex: 'index',
                        key: 'index',
                        align: 'center',
                        width: '50px',
                        customRender: (text, row, index) => {
                            if (row["empName"]!='总计') {
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
                        title: '业务员姓名',
                        dataIndex: 'empName',
                        key: 'empName',
                        customRender: (text, row, index) => {
                            if (row["empName"]!='总计') {
                                return <div>{text}</div>;
                            }
                            return {
                                children: <div>{text}</div>,
                                attrs: {
                                    colSpan: 4,
                                },
                            };
                        },
                    },
                    {
                        title: '所属部门',
                        dataIndex: 'deptName',
                        key: 'deptName',
                        customRender: (text, row, index) => {
                            if (row["empName"]!='总计') {
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
                        title: '所属角色',
                        dataIndex: 'roleName',
                        key: 'roleName',
                        customRender: (text, row, index) => {
                            if (row["empName"]!='总计') {
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
                        title: '出房间数(间)',
                        dataIndex: 'room',
                        key: 'room',
                    },
                    {
                        title: '新签合同数(份)',
                        dataIndex: 'newSign',
                        key: 'newSign',
                    },
                    {
                        title: '续签合同数(份)',
                        dataIndex: 'extendSign',
                        key: 'extendSign',
                    },
                    {
                        title: '正常退租合同数(份)',
                        dataIndex: 'normalBreak',
                        key: 'normalBreak',
                    },
                    {
                        title: '违约合同数(份)',
                        dataIndex: 'abnormalBreak',
                        key: 'abnormalBreak',
                    },
                    {
                        title: '合同周期',
                        children: [
                            {
                                title: '0-6个月',
                                dataIndex: 'lessSix',
                                key: 'lessSix',
                            },
                            {
                                title: '6-12个月(含6月)',
                                dataIndex: 'sixToTwelve',
                                key: 'sixToTwelve',
                            },
                            {
                                title: '12个月',
                                dataIndex: 'twelve',
                                key: 'twelve',
                            },
                            {
                                title: '12个月以上',
                                dataIndex: 'overTwelve',
                                key: 'overTwelve',
                            },
                        ]
                    }
                ],
                columnsDept: [
                    {
                        title: '#',
                        dataIndex: 'index',
                        key: 'index',
                        align: 'center',
                        width: '50px',
                        customRender: (text, row, index) => {
                            if (row["empName"]!='总计') {
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
                        title: '所属部门',
                        dataIndex: 'deptName',
                        key: 'deptName',
                        customRender: (text, row, index) => {
                            if (row["deptName"]!='总计') {
                                return <div>{text}</div>;
                            }
                            return {
                                children: <div>{text}</div>,
                                attrs: {
                                    colSpan: 2,
                                },
                            };
                        },
                    },
                    {
                        title: '出房间数(间)',
                        dataIndex: 'room',
                        key: 'room',
                    },
                    {
                        title: '新签合同数(份)',
                        dataIndex: 'newSign',
                        key: 'newSign',
                    },
                    {
                        title: '续签合同数(份)',
                        dataIndex: 'extendSign',
                        key: 'extendSign',
                    },
                    {
                        title: '正常退租合同数(份)',
                        dataIndex: 'normalBreak',
                        key: 'normalBreak',
                    },
                    {
                        title: '违约合同数(份)',
                        dataIndex: 'abnormalBreak',
                        key: 'abnormalBreak',
                    },
                    {
                        title: '合同周期',
                        children: [
                            {
                                title: '0-6个月',
                                dataIndex: 'lessSix',
                                key: 'lessSix',
                            },
                            {
                                title: '6-12个月(含6月)',
                                dataIndex: 'sixToTwelve',
                                key: 'sixToTwelve',
                            },
                            {
                                title: '12个月',
                                dataIndex: 'twelve',
                                key: 'twelve',
                            },
                            {
                                title: '12个月以上',
                                dataIndex: 'overTwelve',
                                key: 'overTwelve',
                            },
                        ]
                    }
                ],
                sendData:{
                    cityId:'',
                    deptId:'',
                    beginTime:currentMonth,
                    endTime:oneMonth,
                    current:1,
                    size:10,
                    groupMode:2,
                },
                currentMonth:true,
                groupModeOne:true,
                data1:{},
                chart1Model:null,
                chart2Model:null,
                chart1Data:[],
                chart2Data:[],
                exportExcelShow:false,
                exportUrl: '/pc2b/da/renter_contract_house/list_export',
                exportData:{},
                timeDateList:[Vue.prototype.$moment(currentMonth),Vue.prototype.$moment(oneMonth)],
                dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            }
        },
        mounted(){
        },
        created() {
            this.initChart(true);
        },
        methods: {
            // 导出
            exportExcel() {
                this.exportData = Object.assign({}, this.sendData);
                this.exportExcelShow = true;
            },
            onSizeChange(current) {
                this.sendData.current = current;
                this.initTableData();
            },
            onShowSizeChange(current, pageSize) {
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.initTableData();
            },
            //选择部门
            selectDept(selectObj) {
                this.sendData.deptId = selectObj.id;
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart(false);
                }
            },
            //选择城市区域
            selectCityTownChange(selectObj) {
                this.sendData.cityId = selectObj.cityId;
                this.sendData.areaId = selectObj.areaId;
                this.sendData.townId = selectObj.townId;
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart(false);
                }
            },
            changeCurrentMonth(){
                this.currentMonth = true;
                this.sendData.beginTime=currentMonth;
                this.sendData.endTime=oneMonth;
                this.timeDateList = [Vue.prototype.$moment(currentMonth),Vue.prototype.$moment(oneMonth)];
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart(false);
                }
            },
            changeCurrentYear(){
                this.currentMonth = false;
                this.sendData.beginTime=currentYear;
                this.sendData.endTime=oneYear;
                this.timeDateList = [Vue.prototype.$moment(currentYear),Vue.prototype.$moment(oneYear)];
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart(false);
                }
            },
            changeDate(date) {
                this.sendData.beginTime=date[0];
                this.sendData.endTime=date[1];
                //若开始结束日期都为空
                if(!this.sendData.beginTime){
                    this.$message.error("请选择开始时间");
                    return;
                }
                if(!this.sendData.endTime){
                    this.$message.error("请选择结束时间");
                    return;

                }
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChart(false);
                }
            },
            changeStatus(status) {
                // console.log(status)
                this.statusActiveIndex = status.index;
                if(this.statusActiveIndex==1){
                    this.initTableData();
                }
                else{
                    this.initChart(false);
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
                    this.initChart(false);
                }
            },
            initChart(val){
                this.renterContractHouseDataStat();
                this.initChart1Data(val);
                this.initChart2Data(val);
            },
            renterContractHouseDataStat(){
                API.renterContractHouseDataStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.data1 = res.data;
                    }
                })
            },
            initChart1Data(val){
                API.renterContractHouseListPeriodStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.chart1Data = res.data;
                    }
                    if(val){
                        this.chart1();
                    }else{
                        this.updateChart1();
                    }
                })
            },
            chart1(){
                this.chart1Model = new G2.Chart({
                    container: 'chart1',
                    forceFit: true,
                    height: 230,
                    padding: [ 30, 20, 30, 30 ]
                });
                this.chart1Model.source(this.chart1Data);
                this.chart1Model.axis('name', {
                    label: {
                        textStyle: {
                            fill: '#aaaaaa'
                        }
                    },
                    tickLine: {
                        alignWithLabel: false,
                        length: 0
                    }
                });
                this.chart1Model.legend(false);
                this.chart1Model.scale('quantity', {
                    alias: '份数'
                });
                this.chart1Model.interval().position('name*quantity').opacity(1).size(16)
                    .label('quantity', {
                        offset: 10,
                        textStyle: {
                            fill: '#595959',
                            fontSize: 12
                        }
                    });
                this.chart1Model.render();
            },
            updateChart1(){
                this.chart1Model.changeData(this.chart1Data);
            },
            initChart2Data(val){
                this.chart2Data = [];
                API.renterContractHouseListDataGroupStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        let dataTemp = res.data;
                        dataTemp.forEach((item)=>{
                            let itemTemp1 = {};
                            itemTemp1.month = item.name;
                            itemTemp1.city = '新签';
                            itemTemp1.temperature = item.newSign;
                            this.chart2Data.push(itemTemp1);
                            let itemTemp2 = {};
                            itemTemp2.month = item.name;
                            itemTemp2.city = '续签';
                            itemTemp2.temperature = item.extendSign;
                            this.chart2Data.push(itemTemp2);
                            let itemTemp3 = {};
                            itemTemp3.month = item.name;
                            itemTemp3.city = '违约';
                            itemTemp3.temperature = item.abnormalBreak;
                            this.chart2Data.push(itemTemp3);
                            let itemTemp4 = {};
                            itemTemp4.month = item.name;
                            itemTemp4.city = '正常退租';
                            itemTemp4.temperature = item.normalBreak;
                            this.chart2Data.push(itemTemp4);
                        });
                    }
                    if(val){
                        this.chart2();
                    }else{
                        this.updateChart2();
                    }
                })
            },
            chart2(){
                this.chart2Model = new G2.Chart({
                    container: 'chart2',
                    forceFit: true,
                    height: 500
                });
                this.chart2Model.source(this.chart2Data);
                this.chart2Model.interval().position('month*temperature').color('city')
                    .adjust([{
                        type: 'dodge',
                        marginRatio: 1 / 32
                    }]);
                this.chart2Model.render();
            },
            updateChart2(){
                this.chart2Model.changeData(this.chart2Data);
            },
            initTableData(){
                if(this.groupModeOne){
                    this.columns = this.columnsEmp;
                }else{
                    this.columns = this.columnsDept;
                }
                API.renterContractHouseList(this.sendData).then(res => {
                    // console.log(res)
                    if (res.code === "200") {
                        if(res.data == null){
                            this.tableData.list = [];
                        }else{
                            this.tableData.list = res.data;
                            this.tableData.list.forEach((item, index)=>{
                                if(this.groupModeOne){
                                    if (item.empName != '总计') {
                                        item.index = index + 1;
                                    }
                                }else{
                                    if (item.deptName != '总计') {
                                        item.index = index + 1;
                                    }
                                    item.empName = item.deptName;
                                }
                            });
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
                .selectCostType{
                    /deep/ svg{
                        margin-top: 2px;
                    }
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
                    padding: 20px 20px 15px 20px;
                    flex: 1;
                    /*height: 260px;*/
                    box-shadow: 0px 2px 10px 0px rgba(142,164,218,0.15);
                    border-radius: 8px;
                    border:1px solid #EEEEEE;
                    color: #000000;
                    .detail{
                        margin: 10px -10px 0 -10px;
                        font-size: 12px;
                        color: #777777;
                        &>div{
                            display: flex;
                            text-align: center;
                            .item{
                                position: relative;
                                display: flex;
                                flex: 1;
                                align-items: center;
                                justify-content: center;
                                height: 90px;
                                background: #eee;
                                margin: 10px;
                                border-radius:4px;
                                &:first-child:before{
                                    position: absolute;
                                    content: '';
                                    display: inline-block;
                                    top: 0;
                                    right: -10px;
                                    width: 1px;
                                    height: calc(100% + 10px);
                                    background: #eeeeee;
                                }
                            }
                            .item-1,.item-2{
                                &:after{
                                    position: absolute;
                                    content: '';
                                    display: inline-block;
                                    right: -10px;
                                    width: calc(100% + 10px);
                                    height: 1px;
                                    background: #eeeeee;
                                    top: 100px;
                                }
                            }
                            .item-2{
                                &:after{
                                    right: 0;
                                }
                            }
                            .item-3{
                                &:first-child:before{
                                    top: -10px;
                                }
                            }
                        }
                    }
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
    .search-condition {
        & /deep/ .ant-select-selection {
            box-shadow: none;
            border: none;
            height: 28px;
        }
    }
    /deep/ .tree{
        min-width: 250px;
        margin-left: -150px;
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
    & /deep/ .ant-table-tbody > tr:last-child{
        color: #0A87F8;
    }
    & /deep/ .ant-table-tbody > tr:last-child{
        td:first-child{
            text-align: center;
        }
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
