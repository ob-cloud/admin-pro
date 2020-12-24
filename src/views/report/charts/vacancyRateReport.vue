<template>
    <div class="wrap">
        <div class="top">
            <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            <div>
                <div class="search-condition clearfix">
                    <div class="search-condition-time f-fl">
                        <span>指定统计周期：</span>
                        <span class="currentMonth cursor" :class="currentMonth?'clickStyle':'normalStyle'" @click="changeCurrentMonth">本月</span><span class="currentYear cursor" :class="!currentMonth?'clickStyle':'normalStyle'" @click="changeCurrentYear">全年</span>
                        <a-range-picker @change="(date,dateString)=>changeDate(date, dateString)" :format="dateFormat" v-model="timeDateList"/>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">部门：</div>
                        <div class="f-fl" style="margin-top: 0.5px;"><dept-employee-tree placeholder="请选择部门" :resMark="resMark" :showNameAll="false" :showEmployee="false" @selectChange="selectDept" placement="bottomRight" ref="selectDeptEmp" minWidth="250px" width="90px" ></dept-employee-tree></div>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px;"></div>
                    <div class="f-fl selectCostType clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">城市：</div>
                        <div class="f-fl" style="width: 100px">
                            <city-town-tree ref="selectCityTown" :showNameAll="false"  @selectChange="selectCityTownChange"></city-town-tree>
                        </div>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">房源类型：</div>
                        <div class="f-fl">
                            <a-select v-model="sendData.houseType"  style="width: 60px;margin-top: 2px" @change="changeHouseType">
                                <a-select-option :value="1">整租</a-select-option>
                                <a-select-option :value="2">合租</a-select-option>
                                <a-select-option :value="3">集中</a-select-option>
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
                    <p>空置率统计</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div id="chart1"></div>
                </div>
                <div class="charts-item">
                    <p>空置天分布</p>
                    <div id="chart2"></div>
                </div>
            </div>
            <div class="charts-list">
                <div class="charts-item">
                    <p>房源空置率统计</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div id="chart3"></div>
                </div>
            </div>
        </div>
        <div class="con" v-show="statusActiveIndex == 1">
            <a-table :loading="loading" size="middle" rowKey="name" :columns="columns" :dataSource="tableData.list" :pagination="false" bordered>
                <div slot="vacantRate" slot-scope="text">
                    {{text=='-1'?'暂无数据':text}}
                </div>
                <div slot="zeroSevenVacantRate" slot-scope="text">
                    {{text=='-1'?'暂无数据':text}}
                </div>
                <div slot="sevenFifteenVacantRate" slot-scope="text">
                    {{text=='-1'?'暂无数据':text}}
                </div>
                <div slot="fifteenThirtyVacantRate" slot-scope="text">
                    {{text=='-1'?'暂无数据':text}}
                </div>
                <div slot="greaterThirtyVacantRate" slot-scope="text">
                    {{text=='-1'?'暂无数据':text}}
                </div>
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
        name: "vacancyRateReport",
        components: {
            TopStatus,
            DeptEmployeeTree,
            exportExcel,
            CityTownTree,
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
                columns: [
                    {
                        title: '#',
                        dataIndex: 'index',
                        key: 'index',
                        align: 'center',
                        width: '50px',
                        customRender: (text, row, index) => {
                            if (row["name"]!='合计') {
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
                        title: '部门名称',
                        dataIndex: 'name',
                        key: 'name',
                        customRender: (text, row, index) => {
                            if (row["name"]!='合计') {
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
                        title: '可租天数(天)',
                        dataIndex: 'availableDayTotal',
                        key: 'availableDayTotal',
                    },
                    {
                        title: '空置天数(天)',
                        dataIndex: 'vacantDayTotal',
                        key: 'vacantDayTotal',
                    },
                    {
                        title: '空置率(%)',
                        dataIndex: 'vacantRate',
                        key: 'vacantRate',
                        scopedSlots: { customRender: 'vacantRate' },
                    },
                    {
                        title: '空置天区间空置率',
                        children: [
                            {
                                title: '0-7天(含7天)',
                                dataIndex: 'zeroSevenVacantRate',
                                key: 'zeroSevenVacantRate',
                                scopedSlots: { customRender: 'zeroSevenVacantRate' },
                            },
                            {
                                title: '7-15天(含15天)',
                                dataIndex: 'sevenFifteenVacantRate',
                                key: 'sevenFifteenVacantRate',
                                scopedSlots: { customRender: 'sevenFifteenVacantRate' },
                            },
                            {
                                title: '15-30天(含30天)',
                                dataIndex: 'fifteenThirtyVacantRate',
                                key: 'fifteenThirtyVacantRate',
                                scopedSlots: { customRender: 'fifteenThirtyVacantRate' },
                            },
                            {
                                title: '30天以上',
                                dataIndex: 'greaterThirtyVacantRate',
                                key: 'greaterThirtyVacantRate',
                                scopedSlots: { customRender: 'greaterThirtyVacantRate' },
                            },
                        ]
                    }
                ],
                sendData: {
                    areaId:'',
                    cityId:'',
                    deptId:'',
                    houseType:2,
                    townId:'',
                    queryDateBegin:currentMonth,
                    queryDateEnd:oneMonth,
                    current:1,
                    size:10,
                },
                currentMonth:true,
                chart1Model:null,
                chart2Model:null,
                chart3Model:null,
                chart1Data:[],
                chart2Data:[],
                chart3Data:[],
                exportExcelShow:false,
                exportUrl: '/pc2b/da/house/list_vacant_stat_dept_dimension_export',
                exportData:{},
                timeDateList:[Vue.prototype.$moment(currentMonth),Vue.prototype.$moment(oneMonth)],
                dateFormat: 'YYYY.MM.DD',           //日期选择器格式
                resMark:'mk_house_decentralized',
            }
        },
        mounted(){
            this.initChartData(true);
            // this.chart1()
            // this.chart2()
            // this.chart3()
        },
        created() {
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
                    this.initChartData(false);
                }
            },
            changeHouseType(){
                if(this.sendData.houseType==3){
                    this.resMark = 'mk_house_centralized';
                }else{
                    this.resMark = 'mk_house_decentralized';
                }
                if(this.statusActiveIndex==1){
                    this.initTableData();
                }
                else{
                    this.initChartData(false);
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
                    this.initChartData(false);
                }
            },
            changeCurrentMonth(){
                this.currentMonth = true;
                this.sendData.queryDateBegin=currentMonth;
                this.sendData.queryDateEnd=oneMonth;
                this.timeDateList = [Vue.prototype.$moment(currentMonth),Vue.prototype.$moment(oneMonth)];
                if(this.statusActiveIndex == 1){
                    this.listCashFlow();
                }else{
                    this.initData(false);
                }
            },
            changeCurrentYear(){
                this.currentMonth = false;
                this.sendData.queryDateBegin=currentYear;
                this.sendData.queryDateEnd=oneYear;
                this.timeDateList = [Vue.prototype.$moment(currentYear),Vue.prototype.$moment(oneYear)];
                if(this.statusActiveIndex == 1){
                    this.listCashFlow();
                }else{
                    this.initData(false);
                }
            },
            changeStatus(status) {
                // console.log(status)
                this.statusActiveIndex = status.index;
                if(this.statusActiveIndex==1){
                    this.initTableData();
                }
                else{
                    this.initChartData(false);
                }
            },
            initChartData(val){
                this.chart1Data = [];
                if(this.sendData.houseType==0){
                    this.sendData.houseType = '';
                }
                this.chart1Data = [];
                this.chart2Data = [];
                this.chart3Data = [];
                API.vacantStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        let temp = res.data;
                        this.chart1Data = [
                            {
                                gender: '空置率',
                                value: temp.vacantRate/100,
                            },
                        ];
                        this.chart2Data = temp.vacantDayRangeDimensionList;
                        this.chart3Data = temp.deptDimensionList;
                        if(this.chart3Data&&this.chart3Data.length>0){
                            this.chart3Data.forEach((item)=>{
                                if(item.rate==-1){
                                    item.rate = 0;
                                }
                            })
                        }
                        if(val){
                            this.chart1();
                            this.chart2();
                            this.chart3();
                        }else{
                            this.updateChart1();
                            this.updateChart2();
                            this.updateChart3();
                        }
                    }
                })
            },
            updateChart1(){
                this.chart1Model.clear();//清除数据
                this.chart1();
            },
            chart1(){
                if(!this.chart1Model) {
                    this.chart1Model = new G2.Chart({
                        container: 'chart1',
                        forceFit: true,
                        height: 200,
                        padding: 0
                    });
                }
                this.chart1Model.source(this.chart1Data, {
                    value: {
                        min: 0,
                        max: 100
                    }
                });
                this.chart1Model.legend(false);
                this.chart1Model.axis(false);
                this.chart1Model.interval()
                    .position('gender*value')
                    .color('#E67F65')
                    // .shape('path', path => [ 'liquid-fill-path', path ])
                    .shape('liquid-fill-gauge')
                    .style({
                        lineWidth: 2,
                        opacity: 0.75,
                        fillOpacity:30,
                    }).size(150);
                this.chart1Data.forEach(row => {
                    if(row.value == '-0.01'){
                        this.chart1Model.guide().html({
                            top: true,
                            position: {
                                gender: row.gender,
                                value: 50
                            },
                            html: `<div style="text-align: center;"><p style="text-align: center;font-size: 20px;color: #571200">${row.gender}</p><p style="color: #111111"><span style="font-size: 32px">暂无数据</span></p></div>`,
                            style: {
                                opacity: 0.75,
                                fontSize: 20,
                                textAlign: 'center'
                            }
                        });
                    }else {
                        this.chart1Model.guide().html({
                            top: true,
                            position: {
                                gender: row.gender,
                                value: 50
                            },
                            html: `<div style="text-align: center;"><p style="text-align: center;font-size: 20px;color: #571200">${row.gender}</p><p style="color: #111111"><span style="font-size: 32px">${row.value * 100}</span>%</p></div>`,
                            style: {
                                opacity: 0.75,
                                fontSize: 20,
                                textAlign: 'center'
                            }
                        });
                    }
                });

                this.chart1Model.render();
            },
            chart2(){
               this.chart2Model = new G2.Chart({
                    container: 'chart2',
                    forceFit: true,
                    height: 200,
                    padding: [ 30, 20, 30, 30 ]
                });
                this.chart2Model.source(this.chart2Data);
                this.chart2Model.axis('name', {
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
                this.chart2Model.legend(false);
                this.chart2Model.interval().position('name*count').opacity(1).size(16)
                    .label('count', {
                        offset: 10,
                        textStyle: {
                            fill: '#595959',
                            fontSize: 12
                        }
                    });
                this.chart2Model.render();
            },
            updateChart2(){
                this.chart2Model.changeData(this.chart2Data);
            },
            chart3(){
                this.chart3Model = new G2.Chart({
                    container: 'chart3',
                    forceFit: true,
                    height: 200,
                    padding: [ 30, 20, 30, 30 ]
                });
                this.chart3Model.source(this.chart3Data);
                this.chart3Model.axis('name', {
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
                this.chart3Model.legend(false);
                this.chart3Model.interval().position('name*rate').opacity(1).size(16)
                    .label('rate', {
                        offset: 10,
                        textStyle: {
                            fill: '#595959',
                            fontSize: 12
                        }
                    });
                this.chart3Model.render();
            },
                updateChart3(){
                this.chart3Model.changeData(this.chart3Data);
            },
                initTableData(){
                this.tableData.list = [];
                API.listVacantStatDeptDimension(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.tableData.list = res.data.deptVacantStatList;
                        this.tableData.total = res.data.total;
                        if(this.tableData.list||this.tableData.list==null||this.tableData.list.length==0){
                            return;
                        }
                        let temp = {
                            name:'合计',
                            availableDayTotal:res.data.availableDayTotal,
                            fifteenThirtyVacantRate:res.data.fifteenThirtyVacantRate,
                            greaterThirtyVacantRate:res.data.greaterThirtyVacantRate,
                            sevenFifteenVacantRate:res.data.sevenFifteenVacantRate,
                            vacantDayTotal:res.data.vacantDayTotal,
                            vacantRate:res.data.vacantRate,
                            zeroSevenVacantRate:res.data.zeroSevenVacantRate,
                        }
                        this.tableData.list.push(temp);
                        this.tableData.list.forEach((item, index)=>{
                            if(item.name!='合计'){
                                item.index = index + 1;
                            }
                        });
                    }
                });
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
    .search-condition {
        & /deep/ .ant-select-selection {
            box-shadow: none;
            border: none;
            height: 28px;
        }
    }
    /deep/ .tree{
        min-width: 250px;
        margin-left: -200px;
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
    /deep/ .ant-input-affix-wrapper{
        width: 300px;
    }
    /deep/ .tree-wrap .tree{
        width: 300px;
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
