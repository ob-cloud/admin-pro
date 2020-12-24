<template>
    <div class="wrap">
        <div class="top">
            <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            <div>
                <div class="search-condition clearfix">
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
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
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
                            <a-select v-model="sendData.feeDirection" placeholder="全部" style="width: 60px;margin-top: 2.5px" @change="changeFeeDirection">
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
                    <p>现金流</p>
                    <div id="chart1-1"></div>
                    <div id="chart1-2"></div>
                </div>
                <div class="charts-item" style="position: relative">
                    <p>已收/付费用科目分布</p>
                    <div v-if="!chart2Data||chart2Data.length==0" style="position:absolute;top:50%;left:calc(50% - 30px);color: #777777">暂无数据</div>
                    <div id="chart2"></div>
                </div>
                <div class="charts-item" style="position: relative">
                    <p>收/付款途径分布</p>
                    <div v-if="!chart3Data||chart3Data.length==0" style="position:absolute;top:50%;left:calc(50% - 30px);color: #777777">暂无数据</div>
                    <div id="chart3"></div>
                </div>
            </div>
            <div class="charts-list">
                <div class="charts-item">
                    <p>周期内现金流折线图</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div id="chart4"></div>
                </div>
            </div>
        </div>
        <div class="con" v-show="statusActiveIndex == 1">
            <a-table :loading="loading" size="middle" rowKey="id" :columns="columns" :dataSource="tableData.list" :pagination="false" bordered>
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
                <div slot="payerInfo" slot-scope="text,record">
                    {{record|specialValPayer}}
                </div>
                <div slot="occurredMoney" slot-scope="text,record">
                    <span v-if="record.feeDirection==2" class="shou-zhi">支</span>
                    <span v-else class="shou-shou">收</span>
                    {{Math.abs(text)/100}}
                </div>
                <div slot="practicalTime" slot-scope="text,record">
                    {{$moment(text).format('YYYY-MM-DD')}}
                </div>
                <div slot="affirmTime" slot-scope="text">
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
        name: "cashFlowDetail",
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
                    },
                    {
                        title: '数据',
                        index: 1,
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
                        title: '费用来源',
                        dataIndex: 'houseAddress',
                        key: 'houseAddress',
                        scopedSlots: { customRender: 'houseAddress' },
                    },
                    {
                        title: '收/付款人信息',
                        dataIndex: 'payerName',
                        key: 'payerName',
                        scopedSlots: { customRender: 'payerInfo' },
                    },
                    {
                        title: '费用科目',
                        dataIndex: 'feeSubjectName',
                        key: 'feeSubjectName',
                    },
                    {
                        title: '费用金额',
                        dataIndex: 'occurredMoney',
                        key: 'occurredMoney',
                        scopedSlots: { customRender: 'occurredMoney' },
                    },
                    {
                        title: '费用周期',
                        dataIndex: 'feeCycle',
                        key: 'feeCycle',
                    },
                    {
                        title: '实际收/付款日期',
                        dataIndex: 'practicalTime',
                        key: 'practicalTime',
                        scopedSlots: { customRender: 'practicalTime' },
                    },
                    {
                        title: '收/付款途径',
                        dataIndex: 'paymentMethod',
                        key: 'paymentMethod',
                    },
                    {
                        title: '经办人',
                        dataIndex: 'affirmEmpName',
                        key: 'affirmEmpName',
                    },
                    {
                        title: '经办人所属部门',
                        dataIndex: 'affirmEmpDept',
                        key: 'affirmEmpDept',
                    },
                    {
                        title: '经办时间',
                        dataIndex: 'affirmTime',
                        key: 'affirmTime',
                        scopedSlots: { customRender: 'affirmTime' },
                    },
                ],
                sendData: {
                    deptId:'',
                    feeDirection:undefined,
                    feeSubjectIdList:[],
                    groupMode:1,
                    isOccur:1,
                    predictTimeBegin:'',
                    predictTimeEnd:'',
                    current:1,
                    size:10,
                    practicalTimeBegin:currentMonth,
                    practicalTimeEnd:oneMonth,
                },
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
                currentMonth:true,
                exportExcelShow:false,
                exportUrl: '/pc2b/da/fin/list_cash_flow_export',
                exportData:{},
                timeDateList:[Vue.prototype.$moment(currentMonth),Vue.prototype.$moment(oneMonth)],
                dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            }
        },
        mounted(){
        },
        created() {
            this.initData(true);
        },
        methods: {
            // 导出
            exportExcel() {
                this.exportData = Object.assign({}, this.sendData);
                // this.exportData.total = this.pagination.total;
                this.exportExcelShow = true;
            },
            onSizeChange(current) {
                this.sendData.current = current;
                this.listCashFlow();
            },
            onShowSizeChange(current, pageSize) {
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.listCashFlow();
            },
            listCashFlow() {
                if(this.sendData.feeDirection==0){
                    this.sendData.feeDirection = undefined;
                }
                API.listCashFlow(this.sendData).then(res => {
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
            //选择负责人
            selectDept(selectObj) {
                this.sendData.deptId = selectObj.id;
                if(this.statusActiveIndex == 1){
                    this.listCashFlow();
                }else{
                    this.initData(false);
                }
            },
            // 费用类型方法
            selectCostType(selectObj){
                // console.log(selectObj)
                this.sendData.feeSubjectIdList = [];
                let nameStr = ''
                selectObj.metaList && selectObj.metaList.forEach((item)=>{
                    this.sendData.feeSubjectIdList.push(item.id)
                    nameStr = nameStr + item.name + ';'
                })
                //this.changeSearchDataArr('收支类型',nameStr)
                if(this.statusActiveIndex == 1){
                    this.listCashFlow();
                }else{
                    this.initData(false);
                }
            },
            changeFeeDirection(){
                if(this.statusActiveIndex == 1){
                    this.listCashFlow();
                }else{
                    this.initData(false);
                }
            },
            changeCurrentMonth(){
                this.currentMonth = true;
                this.sendData.practicalTimeBegin=currentMonth;
                this.sendData.practicalTimeEnd=oneMonth;
                this.timeDateList = [Vue.prototype.$moment(currentMonth),Vue.prototype.$moment(oneMonth)];
                if(this.statusActiveIndex == 1){
                    this.listCashFlow();
                }else{
                    this.initData(false);
                }
            },
            changeCurrentYear(){
                this.currentMonth = false;
                this.sendData.practicalTimeBegin=currentYear;
                this.sendData.practicalTimeEnd=oneYear;
                this.timeDateList = [Vue.prototype.$moment(currentYear),Vue.prototype.$moment(oneYear)];
                if(this.statusActiveIndex == 1){
                    this.listCashFlow();
                }else{
                    this.initData(false);
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
                    this.listEstimateBillDetail();
                }else{
                    this.initData(false);
                }
            },
            changeStatus(status) {
                this.statusActiveIndex = status.index;
                if(this.statusActiveIndex == 1){
                    this.listCashFlow();
                }else{
                    this.initData(false);
                }
            },
            initData(val){
                this.chart1Data = [];
                if(this.sendData.feeDirection==0){
                    this.sendData.feeDirection = undefined;
                }
                this.initChart1Data(val);
                this.initChart2Data(val);
                this.initChart3Data(val);
                this.initChart4Data(val);
            },
            initChart1Data(val){
                API.incomeExpendStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        let temp = res.data;
                        this.chart1Data = [
                            {
                                gender: '收入(元)',
                                value: temp.incomeAmount/100,
                            },
                            {
                                gender: '支出(元)',
                                value: temp.expendAmount/100,
                            },

                        ];
                        this.chart5Data = [
                            {
                                gender: '差值(元)',
                                value: temp.diffAmount/100,
                            },
                        ];
                        if(val){
                            this.chart5();
                            this.chart1();
                        }else{
                            this.updateChart5();
                            this.updateChart1();
                        }
                    }
                })
            },
            chart1(){
                if(!this.chart1Model) {
                    this.chart1Model = new G2.Chart({
                        container: 'chart1-2',
                        forceFit: true,
                        height: 100,
                        padding: 0
                    });
                }
                this.chart1Model.source(this.chart1Data, {
                    value: {
                        min: 0,
                        max: 100000
                    }
                });
                this.chart1Model.legend(false);
                this.chart1Model.axis(false);
                this.chart1Model.interval()
                    .position('gender*value')
                    .color('gender',['#B2DF8A','#E67F65'])
                    // .shape('path', path => [ 'liquid-fill-path', path ])
                    .shape('liquid-fill-gauge')
                    .style({
                        lineWidth: 2,
                        opacity: 0.75,
                        fillOpacity:30,
                    }).size(80)
                this.chart1Data.forEach(row => {
                    this.chart1Model.guide().html({
                        top: true,
                        position: {
                            gender: row.gender,
                            value: 50000
                        },
                        html: `<div style="text-align: center;"><p style="text-align: center;font-size: 12px;color: #571200">${row.gender}</p><p style="color: #111111"><span style="font-size: 16px">${row.value}</span></p></div>`,
                        style: {
                            opacity: 0.75,
                            fontSize: 20,
                            textAlign: 'center'
                        }
                    });
                });

                this.chart1Model.render();
            },
            updateChart1(){
                this.chart1Model.clear();//清除数据
                this.chart1();
            },
            chart5(){
                if(!this.chart5Model) {
                    this.chart5Model = new G2.Chart({
                        container: 'chart1-1',
                        forceFit: true,
                        width: 380,
                        height: 100,
                        padding: 0
                    });
                }
                this.chart5Model.source(this.chart5Data, {
                    value: {
                        min: 0,
                        max: 100000
                    }
                });
                this.chart5Model.legend(false);
                this.chart5Model.axis(false);
                this.chart5Model.interval()
                    .position('gender*value')
                    .color('gender',['#59A8EB'])
                    // .shape('path', path => [ 'liquid-fill-path', path ])
                    .shape('liquid-fill-gauge')
                    .style({
                        lineWidth: 2,
                        opacity: 0.75,
                        fillOpacity:30,
                    }).size(80)
                this.chart5Data.forEach(row => {
                    this.chart5Model.guide().html({
                        top: true,
                        position: {
                            gender: row.gender,
                            value: 50000
                        },
                        html: `<div style="text-align: center;"><p style="text-align: center;font-size: 12px;color: #571200">${row.gender}</p><p style="color: #111111"><span style="font-size: 16px">${row.value}</span></p></div>`,
                        style: {
                            opacity: 0.75,
                            fontSize: 20,
                            textAlign: 'center',
                        }
                    });
                });

                this.chart5Model.render();
            },
            updateChart5(){
                this.chart5Model.clear();//清除数据
                this.chart5();
            },
            initChart2Data(val){
                API.feeSubjectAnalysis(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.chart2Data = res.data;
                        if(val){
                            this.chart2();
                        }else{
                            this.updateChart2();
                        }
                    }
                })
            },
            chart2(){
                this.chart2Data.forEach((item)=>{
                    item.percent = item.percent/100;
                });
                this.chart2Model = new G2.Chart({
                    container: 'chart2',
                    forceFit: true,
                    height: 220,
                    padding: 'auto'
                });
                this.chart2Model.source(this.chart2Data);
                this.chart2Model.legend({
                    position: 'right-center',
                    // offsetX: -100
                });
                this.chart2Model.coord('theta', {
                    radius: 0.6,
                    innerRadius: 0.5
                });
                this.chart2Model.intervalStack().position('percent').color('name', [ '#1890ff', '#37c661', '#fbce1e', '#2b3b79', '#8a4be2', '#1dc5c5' ])
                    .style({
                        stroke: 'white',
                        lineWidth: 1
                    })
                    .label('value', {
                        htmlTemplate: (text, item) => {
                            return (
                                `<div><span style="white-space:nowrap;font-size: 10px;color: #777777">${item.point.name}</span><span style="white-space:nowrap;font-size: 10px;color: #111111">${(item.point.percent*100).toFixed(2)}%</span><span style="white-space:nowrap;font-size: 10px;color: #777777">(${item.point.quantity}笔)</span></div>`
                            )
                        }
                    })
                    .tooltip('name*quantity*percent', (name, quantity, percent) => {
                        return {
                            name: name,
                            value: quantity,
                            percent:percent,
                        };
                    })
                ;
                this.chart2Model.render();
            },
            updateChart2(){
                this.chart2Data.forEach((item)=>{
                    item.percent = item.percent/100;
                });
                this.chart2Model.changeData(this.chart2Data);
            },
            initChart3Data(val){
                API.paymentMethodAnalysis(this.sendData).then(res => {
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
                this.chart3Data.forEach((item)=>{
                    item.percent = item.percent/100;
                });
                this.chart3Model = new G2.Chart({
                    container: 'chart3',
                    forceFit: true,
                    height: 220,
                    padding: 'auto'
                });
                this.chart3Model.source(this.chart3Data);
                this.chart3Model.legend({
                    position: 'right-center',
                    // offsetX: -100
                });
                this.chart3Model.coord('theta', {
                    radius: 0.6,
                    innerRadius: 0.5
                });
                this.chart3Model.intervalStack().position('percent').color('name', [ '#1890ff', '#37c661', '#fbce1e', '#2b3b79', '#8a4be2', '#1dc5c5' ])
                    .style({
                        stroke: 'white',
                        lineWidth: 1
                    })
                    .label('value', {
                        htmlTemplate: (text, item) => {
                            return (
                                `<div><span style="white-space:nowrap;font-size: 10px;color: #777777">${item.point.name}</span><span style="white-space:nowrap;font-size: 10px;color: #111111">${(item.point.percent*100).toFixed(2)}%</span><span style="white-space:nowrap;font-size: 10px;color: #777777">(${item.point.quantity}笔)</span></div>`
                            )
                        }
                    })
                    .tooltip('name*quantity*percent', (name, quantity, percent) => {
                        return {
                            name: name,
                            value: quantity,
                            percent:percent,
                        };
                    })
                ;
                this.chart3Model.render();
            },
            updateChart3(){
                this.chart3Data.forEach((item)=>{
                    item.percent = item.percent/100;
                });
                this.chart3Model.changeData(this.chart3Data);
            },
            initChart4Data(val){
                API.dateIncomeExpendStat(this.sendData).then(res => {
                    if (res.code === '200') {
                        let dataTemp = res.data;
                        this.chart4Data = [];
                        dataTemp.forEach((item)=>{
                            let itemTemp1 = {};
                            itemTemp1.month = item.dateStr;
                            itemTemp1.city = '收入';
                            itemTemp1.temperature = item.incomeAmount/100;
                            this.chart4Data.push(itemTemp1);
                            let itemTemp2 = {};
                            itemTemp2.month = item.dateStr;
                            itemTemp2.city = '支出';
                            itemTemp2.temperature = item.expendAmount/100;
                            this.chart4Data.push(itemTemp2);
                            let itemTemp3 = {};
                            itemTemp3.month = item.dateStr;
                            itemTemp3.city = '差额';
                            itemTemp3.temperature = item.diffAmount/100;
                            this.chart4Data.push(itemTemp3);
                        });
                        if(val){
                            this.chart4();
                        }else{
                            this.updateChart4();
                        }
                    }
                })
            },
            chart4(){
                this.chart4Model = new G2.Chart({
                    container: 'chart4',
                    forceFit: true,
                    height: 400,
                    padding: [40,'auto','auto','auto'],
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
                this.chart4Model.line().position('month*temperature').color('city');
                this.chart4Model.point().position('month*temperature').color('city')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    });
                this.chart4Model.legend({
                    position: 'top-left',
                });
                this.chart4Model.render();
            },
            updateChart4(){
                this.chart4Model.source(this.chart4Data, {
                    month: {
                        range: [ 0, 1 ]
                    }
                });
                this.chart4Model.changeData(this.chart4Data);
            },
        },
        filters: {
            specialValPayer(record){
                if(record.payerName){
                    if(record.payerPhone){
                        return record.payerName+'/'+record.payerPhone;
                    }
                    else{
                        return record.payerName
                    }
                }else{
                    if(record.payerName){
                        return record.payerName;
                    }
                    else{
                        return '-';
                    }
                }
            }
        }
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
            .houseAlias{
                border: none!important;
                background-color: #f0f8ff;
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
                font-size: 12px;
            }
            .shou-shou {
                display: inline-block;
                height: 20px;
                width: 20px;
                color: #0A87F8;
                border: 1px solid #0A87F8;
                border-radius: 50%;
                text-align: center; // margin: 0 10px;
                line-height: 20px;
                font-size: 12px;
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
