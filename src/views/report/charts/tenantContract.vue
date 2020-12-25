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
                        <div class="f-fl" style="margin-top: 0.5px;"><dept-employee-tree placeholder="请选择部门" resMark="mk_contract_renter" :showNameAll="false" :showEmployee="false" @selectChange="selectDept" placement="bottomRight" ref="selectDeptEmp" minWidth="250px" width="90px" ></dept-employee-tree></div>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl selectCostType clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">城市：</div>
                        <div class="f-fl" style="width: 100px;margin-top: 0.5px;">
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
                    <p style="margin-bottom: 18px">合同分析</p>
                    <div id="chart1"></div>
                    <div id="chart2"></div>
                </div>
                <div class="charts-item">
                    <p>租客合同周期分布</p>
                    <div id="chart3"></div>
                </div>
            </div>
            <div class="charts-list">
                <div class="charts-item">
                    <p>合同新签数/续签数/违约数/退租数统计</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div id="chart4"></div>
                </div>
            </div>
            <div class="charts-list">
                <div class="charts-item">
                    <p>合同续签率/违约率统计</p>
                    <div id="chart5"></div>
                </div>
            </div>
        </div>
        <div class="con" v-show="statusActiveIndex == 1">
            <a-table :loading="loading" size="middle" rowKey="id" :columns="columns" :dataSource="tableData.list" :pagination="false" bordered>
                <div slot="status" slot-scope="text">
                    <span v-if="text==1" class="status1">待签字</span>
                    <span v-else-if="text==2" class="status2">合约中</span>
                    <span v-else-if="text==3" class="status3">即将搬入</span>
                    <span v-else-if="text==4" class="status4">即将到期</span>
                    <span v-else-if="text==5" class="status5">已到期</span>
                    <span v-else-if="text==6" class="status6">正常退</span>
                    <span v-else-if="text==7" class="status7">非正常退</span>
                    <span v-else-if="text==8" class="status8">已作废</span>
                    <span v-else-if="text==9" class="status9">已被续约</span>
                </div>
                <div slot="houseAddress" slot-scope="text,record">
                    <a-popover>
                        <template slot="content">
                            <p style="padding: 8px 18px;">
                                <span class="houseAlias" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                            </p>
                        </template>
                        <p class="overHidde" type="primary">
                            <span class="houseAlias" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                        </p>
                    </a-popover>
                </div>
                <div slot="name" slot-scope="text,record">
                    {{record.name}}/{{record.phone}}
                </div>
                <div slot="price" slot-scope="text">
                    {{text/100}}
                </div>
                <div slot="deposit" slot-scope="text">
                    {{text/100}}
                </div>
                <div slot="beginTime" slot-scope="text,record">
                    {{$moment(record.beginTime).format('YYYY-MM-DD')}}-{{$moment(record.endTime).format('YYYY-MM-DD')}}
                </div>
                <div slot="signTime" slot-scope="text">
                    {{$moment(text).format('YYYY-MM-DD HH:mm')}}
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
    import { DataSet } from '@antv/data-set';
    import TopStatus from '@/components/TopStatus/index';
    import DeptEmployeeTree from '@/components/DeptEmployeeTree';
    import CityTownTree from '@/components/CityTownTree';
    import exportExcel from '@/components/exportExcel/index';
    import  * as API from '@/api/contractReport';
    const currentMonth = Vue.prototype.$moment().startOf('month').valueOf();
    const oneMonth = Vue.prototype.$moment().endOf('month').valueOf();
    const currentYear = Vue.prototype.$moment().startOf('year').valueOf();
    const oneYear = Vue.prototype.$moment().endOf('year').valueOf();
    export default {
        name: "tenantContract",
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
                columns: [
                    {
                        title: '#',
                        dataIndex: 'index',
                        key: 'index',
                        align: 'center',
                        width: '50px',
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        scopedSlots: { customRender: 'status' },
                    },
                    {
                        title: '签约类型',
                        dataIndex: 'signTypeName',
                        key: 'signTypeName',
                    },
                    {
                        title: '房源信息',
                        dataIndex: 'fullAddress',
                        key: 'fullAddress',
                        scopedSlots: { customRender: 'houseAddress' },
                    },
                    {
                        title: '租客信息',
                        dataIndex: 'name',
                        key: 'name',
                        scopedSlots: { customRender: 'name' },
                    },
                    {
                        title: '租金',
                        dataIndex: 'price',
                        key: 'price',
                        scopedSlots: { customRender: 'price' },
                    },
                    {
                        title: '押金',
                        dataIndex: 'deposit',
                        key: 'deposit',
                        scopedSlots: { customRender: 'deposit' },
                    },
                    {
                        title: '付款方式',
                        dataIndex: 'periodMonthName',
                        key: 'periodMonthName',
                    },
                    {
                        title: '合同周期',
                        dataIndex: 'beginTime',
                        key: 'beginTime',
                        scopedSlots: { customRender: 'beginTime' },
                    },
                    {
                        title: '签约时间',
                        dataIndex: 'signTime',
                        key: 'signTime',
                        scopedSlots: { customRender: 'signTime' },
                    },
                ],
                sendData:{
                    cityId:'',
                    deptId:'',
                    beginTime:currentMonth,
                    endTime:oneMonth,
                    current:1,
                    size:10,
                },
                currentMonth:true,
                data1:{},
                chart1Model:null,
                chart2Model:null,
                chart3Model:null,
                chart4Model:null,
                chart5Model:null,
                chart1Data:[],
                chart2Data:[],
                chart3Data:[],
                chart4Data:[],
                chart5Data:[],
                exportExcelShow:false,
                exportUrl: '/pc2b/da/renter_contract/list_export',
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
                this.renterContractList();
            },
            onShowSizeChange(current, pageSize) {
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.renterContractList();
            },
            //选择部门
            selectDept(selectObj) {
                this.sendData.deptId = selectObj.id;
                if(this.statusActiveIndex == 1){
                    this.renterContractList();
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
                    this.renterContractList();
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
                    this.renterContractList();
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
                    this.renterContractList();
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
                    this.renterContractList();
                }else{
                    this.initChart(false);
                }
            },
            changeStatus(status) {
                // console.log(status)
                this.statusActiveIndex = status.index;
                if(this.statusActiveIndex==1){
                    this.renterContractList();
                }
                else{
                    this.initChart(false);
                }
            },
            initChart(val){
                this.initData1();
                this.initChart12Data(val);
                this.initChart3Data(val);
                this.initChart45Data(val);
            },
            initData1(){
                API.renterContractDataStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.data1 = res.data;
                    }
                })
            },
            initChart12Data(val){
                API.renterContractDataAnalysis(this.sendData).then(res => {
                    if (res.code === '200') {
                        let temp = res.data;
                        this.chart1Data = [
                            {
                                gender: '平均出房租期',
                                value: parseFloat(temp.averagePeriod),
                            },
                            {
                                gender: '平均出房租金',
                                value: parseFloat(temp.averagePrice),
                            },
                        ];
                        this.chart2Data = [
                            {
                                gender: '续签率',
                                value: parseFloat(temp.extendRate),
                            },
                            {
                                gender: '违约率',
                                value: parseFloat(temp.abnormalBreakRate),
                            },
                        ];
                        if(val){
                            this.chart1();
                            this.chart2();
                        }else{
                            this.updateChart1();
                            this.updateChart2();
                        }
                    }
                })
            },
            chart1(){
                if(!this.chart1Model) {
                    this.chart1Model = new G2.Chart({
                        container: 'chart1',
                        forceFit: true,
                        height: 100,
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
                    .color('gender',['#59A8EB','#F0BD68'])
                    .shape('liquid-fill-gauge')
                    .style({
                        lineWidth: 2,
                        opacity: 0.75,
                        fillOpacity:30,
                    }).size(80);

                this.chart1Data.forEach((row,index) => {
                    let dom = ''
                    if (index == 0){
                        dom = `<div style="text-align: center;"><p style="font-size: 12px;color: #571200">${row.gender}</p><p style="color: #111111"><span style="font-size: 16px">${row.value}个月</span></p></div>`
                    }else{
                        dom = `<div style="text-align: center;"><p style="font-size: 12px;color: #571200">${row.gender}</p><p style="color: #111111"><span style="font-size: 16px">${row.value}元</span></p></div>`
                    }
                    this.chart1Model.guide().html({
                        top: true,
                        position: {
                            gender: row.gender,
                            value: 50
                        },
                        html: dom,
                        style: {
                            opacity: 0.75,
                            fontSize: 20,
                            textAlign: 'center',
                        },
                    });
                });
                this.chart1Model.render();
            },
            updateChart1(){
                this.chart1Model.clear();//清除数据
                this.chart1();
            },
            chart2(){
                if(!this.chart2Model) {
                    this.chart2Model = new G2.Chart({
                        container: 'chart2',
                        forceFit: true,
                        height: 100,
                        padding: 0
                    });
                }
                this.chart2Model.source(this.chart2Data, {
                    value: {
                        min: 0,
                        max: 100
                    }
                });
                this.chart2Model.legend(false);
                this.chart2Model.axis(false);
                this.chart2Model.interval()
                    .position('gender*value')
                    .color('gender',['#B2DF8A','#E67F65'])
                    // .shape('path', path => [ 'liquid-fill-path', path ])
                    .shape('liquid-fill-gauge')
                    .style({
                        lineWidth: 2,
                        opacity: 0.75
                    }).size(80);

                this.chart2Data.forEach(row => {
                    this.chart2Model.guide().html({
                        top: true,
                        position: {
                            gender: row.gender,
                            value: 50
                        },
                        html: `<div style="text-align: center;"><p style="text-align: center;font-size: 12px;color: #111111">${row.gender}</p><p style="color: #571200"><span style="font-size: 16px">${row.value}%</span></p></div>`,
                        style: {
                            opacity: 0.75,
                            fontSize: 20,
                            textAlign: 'center'
                        }
                    });
                });

                this.chart2Model.render();
            },
            updateChart2(){
                this.chart2Model.clear();//清除数据
                this.chart2();
            },
            initChart3Data(val){
                API.renterContractListPeriodStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.chart3Data = res.data;
                        if(val){
                            this.chart3();
                        }else{
                            this.updateChart3();
                        }
                    }
                })
            },
            chart3(){
                this.chart3Model = new G2.Chart({
                    container: 'chart3',
                    forceFit: true,
                    height: 230,
                    padding: [ 30, 20, 30, 30 ]
                });
                this.chart3Model.source(this.chart3Data);
                this.chart3Model.scale('quantity', {
                    alias: '合同数'
                });
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
                this.chart3Model.interval().position('name*quantity').opacity(1).size(16)
                    .label('quantity',
                        {
                            htmlTemplate: (val, item) => {
                                return (
                                    `<div><p style="white-space:nowrap;font-size: 10px;color: #111111">${item.point.percentage}%</p><p style="white-space:nowrap;font-size: 10px;color: #777777;text-align: center">(${item.point.quantity}笔)</p></div>`
                                )
                            }
                        });
                this.chart3Model.render();
            },
            updateChart3(){
                this.chart3Model.changeData(this.chart3Data);
            },
            initChart45Data(val){
                //清除数据，防止重复
                this.chart4Data = [];
                this.chart5Data = [];
                API.renterContractListDateDataStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        let dataTemp = res.data;
                        dataTemp.forEach((item)=>{
                            let itemTemp1 = {};
                            itemTemp1.month = item.dateStr;
                            itemTemp1.city = '新签';
                            itemTemp1.temperature = item.newSign;
                            this.chart4Data.push(itemTemp1);
                            let itemTemp2 = {};
                            itemTemp2.month = item.dateStr;
                            itemTemp2.city = '续签';
                            itemTemp2.temperature = item.extendSign;
                            this.chart4Data.push(itemTemp2);
                            let itemTemp3 = {};
                            itemTemp3.month = item.dateStr;
                            itemTemp3.city = '违约';
                            itemTemp3.temperature = item.abnormalBreak;
                            this.chart4Data.push(itemTemp3);
                            let itemTemp4 = {};
                            itemTemp4.month = item.dateStr;
                            itemTemp4.city = '正常退租';
                            itemTemp4.temperature = item.normalBreak;
                            this.chart4Data.push(itemTemp4);
                            let itemTemp5 = {};
                            itemTemp5.month = item.dateStr;
                            itemTemp5.city = '续签';
                            itemTemp5.temperature = item.extendSignRate;
                            this.chart5Data.push(itemTemp5);
                            let itemTemp6 = {};
                            itemTemp6.month = item.dateStr;
                            itemTemp6.city = '违约';
                            itemTemp6.temperature = item.abnormalBreakRate;
                            this.chart5Data.push(itemTemp6);
                        });
                        if(val){
                            this.chart4();
                            this.chart5();
                        }else{
                            this.updateChart4();
                            this.updateChart5();
                        }
                    }
                })
            },
            chart4(){
                this.chart4Model = new G2.Chart({
                    container: 'chart4',
                    forceFit: true,
                    height: 400,
                    padding: [60,'auto','auto','auto'],
                });
                this.chart4Model.source(this.chart4Data, {
                    month: {
                        range: [ 0, 1 ]
                    }
                });
                this.chart4Model.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                this.chart4Model.axis('temperature', {
                    label: {
                        // formatter: val => {
                        //     return val + '°C';
                        // }
                    }
                });
                this.chart4Model.line().position('month*temperature').color('city').shape('smooth');
                this.chart4Model.point().position('month*temperature').color('city')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    });
                this.chart4Model.legend({
                    position: 'top-left',
                    offsetY: -10
                });
                this.chart4Model.render();
            },
            updateChart4(){
                this.chart4Model.changeData(this.chart4Data);
            },
            chart5(){
                this.chart5Model = new G2.Chart({
                    container: 'chart5',
                    forceFit: true,
                    height: 400,
                    padding: [60,'auto','auto','auto'],
                });
                this.chart5Model.source(this.chart5Data, {
                    month: {
                        range: [ 0, 1 ]
                    }
                });
                this.chart5Model.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                this.chart5Model.axis('temperature', {
                    label: {
                        // formatter: val => {
                        //     return val + '°C';
                        // }
                    }
                });
                this.chart5Model.line().position('month*temperature').color('city').shape('smooth');
                this.chart5Model.point().position('month*temperature').color('city')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    });
                this.chart5Model.legend({
                    position: 'top-left',
                    offsetY: -10
                });
                this.chart5Model.render();

            },
            updateChart5(){
                this.chart5Model.changeData(this.chart5Data);
            },
            renterContractList() {
                API.renterContractList(this.sendData).then(res => {
                    // console.log(res)
                    if (res.code === "200") {
                        if(res.data == null){
                            this.tableData.list = [];
                        }else{
                            this.tableData.list = res.data.records;
                            this.tableData.total = res.data.total;
                            this.tableData.list.forEach((item, index)=>{
                                item.index = index + 1;
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
            .houseAlias{
                border: none!important;
                background-color: #f0f8ff;
            }
            .status1{
                color: #FFA036;
            }
            .status2{
                color:#0A87F8;
            }
            .status3{
                color:#03C683;
            }
            .status4{
                color:#A967F4;
            }
            .status5{
                color:#FB4246;
            }
            .status6,.status7,.status8  {
                color:#777777;
            }
            .status9{
                color:#03C683;
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
