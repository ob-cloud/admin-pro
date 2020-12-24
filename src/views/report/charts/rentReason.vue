<template>
    <div class="wrap">
        <div class="top">
            <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            <div>
                <div class="search-condition clearfix">
                    <div class="search-condition-time f-fl">
                        <span>指定统计周期：</span>
                        <span class="currentMonth cursor" :class="currentMonth?'clickStyle':'normalStyle'" @click="changeCurrentMonth">本月</span><span class="currentYear cursor" :class="!currentMonth?'clickStyle':'normalStyle'" @click="changeCurrentYear">全年</span>
                        <a-range-picker @change="(date,dateString)=>changeDate(date, dateString)" :format="dateFormat" v-model="timeDateList" />
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">部门：</div>
                        <div class="f-fl" style="margin-top: 0.5px"><dept-employee-tree placeholder="请选择部门" resMark="mk_contract_renter" :showNameAll="false" :showEmployee="false" @selectChange="selectDept" placement="bottomRight" ref="selectDeptEmp" minWidth="250px" width="90px" ></dept-employee-tree></div>
                    </div>
                    <!--
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl selectCostType clearfix" style="margin-top: 2px">
                        <div class="f-fl" style="margin-top: 7px;">城市：</div>
                        <div class="f-fl" style="width: 100px">
                            <city-town-tree ref="selectCityTown" :showNameAll="false"  @selectChange="selectCityTownChange"></city-town-tree>
                        </div>
                    </div>
                    -->
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">付款方式：</div>
                        <div class="f-fl">
                            <a-select v-model="sendData.periodMonth" placeholder="不限" @change="changePeriodMonth" style="width: 80px;margin-top: 2px;">
                                <a-select-option v-for="(item,index) in options13" :key="index" :value="item.value">{{item.value===99?'一次性付':item.value}}</a-select-option>
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
                <div class="charts-item" style="position: relative">
                    <p>违约原因</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div v-if="!chart1Data||chart1Data.length==0" style="position:absolute;top:50%;left:calc(50% - 30px);color: #777777">暂无数据</div>
                    <div id="chart1"></div>
                </div>
                <div class="charts-item">
                    <p>平均入住时长</p>
                    <div id="chart2"></div>
                </div>
                <div class="charts-item" style="position: relative">
                    <p>年龄段分布</p>
                    <div v-if="!chart3Data||chart3Data.length==0" style="position:absolute;top:50%;left:calc(50% - 30px);color: #777777">暂无数据</div>
                    <div id="chart3"></div>
                </div>
            </div>
            <div class="charts-list">
                <div class="charts-item" style="position: relative">
                    <p>付款方式分布</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div v-if="!chart4Data||chart4Data.length==0" style="position:absolute;top:50%;left:calc(50% - 30px);color: #777777">暂无数据</div>
                    <div id="chart4"></div>
                </div>
                <div class="charts-item">
                    <p>职业分布</p>
                    <div id="chart5"></div>
                </div>
            </div>
        </div>
        <div class="con" v-show="statusActiveIndex == 1">
            <a-table :loading="loading" size="middle" rowKey="id" :columns="columns" :dataSource="tableData.list" :pagination="false" bordered>
                <div slot="name" slot-scope="text">
                    {{text|blankVal}}
                </div>
                <div slot="genderName" slot-scope="text">
                    {{text|blankVal}}
                </div>
                <div slot="phone" slot-scope="text">
                    {{text|blankVal}}
                </div>
                <div slot="ageName" slot-scope="text">
                    {{text|blankVal}}
                </div>
                <div slot="cityName" slot-scope="text">
                    {{text|blankVal}}
                </div>
                <div slot="professionName" slot-scope="text">
                    {{text|blankVal}}
                </div>
                <div slot="livePeriod" slot-scope="text">
                    {{text|blankVal}}
                </div>
                <div slot="periodMonthName" slot-scope="text">
                    {{text|blankVal}}
                </div>
                <div slot="quiteReasonName" slot-scope="text">
                    {{text|blankVal}}
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
        name: "rentReason",
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
                        title: '姓名',
                        dataIndex: 'name',
                        key: 'name',
                        scopedSlots: { customRender: 'name' },
                    },
                    {
                        title: '性别',
                        dataIndex: 'genderName',
                        key: 'genderName',
                        scopedSlots: { customRender: 'genderName' },
                    },
                    {
                        title: '手机号',
                        dataIndex: 'phone',
                        key: 'phone',
                        scopedSlots: { customRender: 'phone' },
                    },
                    {
                        title: '年龄（岁）',
                        dataIndex: 'ageNum',
                        key: 'ageNum',
                        scopedSlots: { customRender: 'ageNum' },
                    },
                    {
                        title: '所属城市',
                        dataIndex: 'cityName',
                        key: 'cityName',
                        scopedSlots: { customRender: 'cityName' },
                    },
                    {
                        title: '职业',
                        dataIndex: 'professionName',
                        key: 'professionName',
                        scopedSlots: { customRender: 'professionName' },
                    },
                    {
                        title: '入住时长',
                        dataIndex: 'livePeriod',
                        key: 'livePeriod',
                        scopedSlots: { customRender: 'livePeriod' },
                    },
                    {
                        title: '付款方式',
                        dataIndex: 'periodMonthName',
                        key: 'periodMonthName',
                        scopedSlots: { customRender: 'periodMonthName' },
                    },
                    {
                        title: '违约原因',
                        dataIndex: 'quiteReasonName',
                        key: 'quiteReasonName',
                        scopedSlots: { customRender: 'quiteReasonName' },
                    },
                ],
                currentMonth:true,
                sendData:{
                    cityId:'',
                    deptId:'',
                    periodMonth:undefined,
                    beginTime:currentMonth,
                    endTime:oneMonth,
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
                options13: [{ value: '不限' }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 99 }],
                exportExcelShow:false,
                exportUrl: '/pc2b/da/renter_signer/list_break_export',
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
                this.renterSignerlistBreak();
            },
            onShowSizeChange(current, pageSize) {
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.renterSignerlistBreak();
            },
            //选择负责人
            selectDept(selectObj) {
                this.sendData.deptId = selectObj.id;
                if(this.statusActiveIndex == 1){
                    this.renterSignerlistBreak();
                }else{
                    this.initChart(false);
                }
            },
            //切换房型
            changePeriodMonth(){
                if(this.statusActiveIndex == 1){
                    this.renterSignerlistBreak();
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
                    this.renterSignerlistBreak();
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
                    this.renterSignerlistBreak();
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
                    this.renterSignerlistBreak();
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
                    this.renterSignerlistBreak();
                }else{
                    this.initChart(false);
                }
            },
            changeStatus(status) {
                this.statusActiveIndex = status.index;
                if(this.statusActiveIndex==1){
                    this.renterSignerlistBreak();
                }
                else{
                    this.initChart(false);
                }
            },
            initChart(val){
                if(this.sendData.periodMonth=='不限'){
                    this.sendData.periodMonth = undefined;
                }
                this.initChart1Data(val);
                this.initChart2Data(val);
                this.initChart3Data(val);
                this.initChart4Data(val);
                this.initChart5Data(val);
            },
            initChart1Data(val){
                API.listQuiteReasonAnalysis(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.chart1Data = res.data;
                        if(val){
                            this.chart1();
                        }else{
                            this.updateChart1();
                        }
                    }
                })
            },
            chart1(){
                this.chart1Data.forEach((item)=>{
                    item.percentage = item.percentage/100;
                })
                this.chart1Model = new G2.Chart({
                    container: 'chart1',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                this.chart1Model.source(this.chart1Data);
                this.chart1Model.legend({
                    position: 'right-center',
                });
                this.chart1Model.coord('theta', {
                    radius: 0.6,
                    innerRadius: 0.5
                });
                const interval = this.chart1Model.intervalStack()
                    .position('percentage')
                    .color('name',[ '#82E6A0', '#18C2C2', '#59A8EB', '#F0BD68', '#BBBBBB'])
                    .label('lable', {
                        htmlTemplate: (val, item) => {
                            return (
                                `<div><p><span style="white-space:nowrap;font-size: 10px;color: #777777">${item.point.name}</span><span style="white-space:nowrap;font-size: 10px;color: #111111">${(item.point.percentage*100)}%(${item.point.quantity}人)</span></p></div>`
                            )
                        }
                    })
                    .tooltip('name*quantity*percentage', (name, quantity, percentage) => {
                        return {
                            name: name,
                            value: quantity,
                            percent:percentage,
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
                this.chart1Model.render();
                interval.setSelected(this.chart1Data[0]);
            },
            updateChart1(){
                this.chart1Data.forEach((item)=>{
                    item.percentage = item.percentage/100;
                })
                this.chart1Model.changeData(this.chart1Data);
            },
            initChart2Data(val){
                API.listLiveDateAnalysis(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.chart2Data = res.data;
                        this.chart2Data.forEach((item)=>{
                            if(item.lable==1){
                                item.name='0-6个月';
                            }
                            else if(item.lable==2){
                                item.name='6-12个月';
                            }
                            else if(item.lable==3){
                                item.name='12个月';
                            }
                            else if(item.lable==4){
                                item.name='12-24个月';
                            }
                            else{
                                item.name='24个月以上';
                            }
                        });
                        if(val){
                            this.chart2();
                        }else{
                            this.updateChart2();
                        }
                    }
                })
            },
            chart2(){
                this.chart2Model = new G2.Chart({
                    container: 'chart2',
                    forceFit: true,
                    height: 200,
                    padding: [ 30, 0, 30, 30 ]
                });
                this.chart2Model.source(this.chart2Data);
                this.chart2Model.scale('quantity', {
                    alias: '人数'
                });
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
                this.chart2Model.interval().position('name*quantity').opacity(1).size(16)
                    .label('quantity', {
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
            initChart3Data(val){
                API.listBreakAgeAnalysis(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.chart3Data = res.data;
                        this.chart3Data.forEach((item)=>{
                            item.percentage = item.percentage/100;
                        })
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
                    height: 200,
                    padding: 'auto'
                });
                this.chart3Model.source(this.chart3Data);
                this.chart3Model.legend({
                    position: 'right-center',
                });
                this.chart3Model.coord('theta', {
                    radius: 0.6,
                    innerRadius: 0.5
                });
                const interval = this.chart3Model.intervalStack()
                    .position('percentage')
                    .color('name',[ '#82E6A0', '#18C2C2', '#59A8EB', '#F0BD68', '#BBBBBB'])
                    .label('lable', {
                        htmlTemplate: (val, item) => {
                            return (
                                `<div><p style="white-space:nowrap;font-size: 10px;color: #777777">${(item.point.percentage*100).toFixed(2)}%(${item.point.quantity}人)</p></div>`
                            )
                        }
                    })
                    .tooltip('name*quantity*percentage', (name, quantity, percentage) => {
                        return {
                            name: name,
                            value: quantity,
                            percent:percentage,
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
                this.chart3Model.render();
                interval.setSelected(this.chart3Data[0]);
            },
            updateChart3(){
                this.chart3Model.changeData(this.chart3Data);
            },
            initChart4Data(val){
                API.listBreakPeriodAnalysis(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.chart4Data = res.data;
                        this.chart4Data.forEach((item)=>{
                            item.percentage = item.percentage/100;
                        })
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
                    height: 350,
                    padding: 'auto'
                });
                this.chart4Model.source(this.chart4Data);
                this.chart4Model.legend({
                    position: 'right-center',
                });
                this.chart4Model.coord('theta', {
                    radius: 0.55,
                    innerRadius: 0.5
                });
                const interval = this.chart4Model.intervalStack()
                    .position('percentage')
                    .color('name',[ '#59A8EB', '#B5D982', '#8C9BBA', '#F0BD68', '#E67F65','#97CFEC','#9D88CD','#F4AF75','#66A8A7','#F3AECB','#7DA1F4','#9BBAE0','#45CEC1'])
                    .label('quantity', {
                        htmlTemplate: (val, item) => {
                            return (
                                `<div><p style="white-space:nowrap;font-size: 10px;color: #777777">${item.point.name}${(item.point.percentage*100).toFixed(2)}%(${item.point.quantity}人)</p></div>`
                            )
                        }
                    })
                    .tooltip('name*quantity*percentage', (name, quantity, percentage) => {
                        return {
                            name: name,
                            value: quantity,
                            percent:percentage,
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
                this.chart4Model.render();
                interval.setSelected(this.chart4Data[0]);
            },
            updateChart4(){
                this.chart4Model.changeData(this.chart4Data);
            },
            initChart5Data(val){
                API.listBreakProfessionAnalysis(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.chart5Data = res.data;
                        this.chart5Data.sort(function (a, b) {
                            if (a.lable > b.lable) {
                                return -1;
                            } else if (a.lable == b.lable) {
                                return 0;
                            } else {
                                return 1;
                            }
                        });
                        if(val){
                            this.chart5();
                        }else{
                            this.updateChart5();
                        }
                    }
                })
            },
            chart5(){
                this.chart5Model = new G2.Chart({
                    container: 'chart5',
                    forceFit: true,
                    height: 350,
                    padding: ['auto',30,'auto','auto'],
                });
                this.chart5Model.source(this.chart5Data, {
                    value: {
                        max: 1300,
                        min: 0,
                        nice: false,
                    }
                });
                this.chart5Model.axis('name', {
                    label: {
                        textStyle: {
                            fill: '#8d8d8d',
                            fontSize: 12
                        }
                    },
                    tickLine: {
                        alignWithLabel: false,
                        length: 0
                    },
                    line: {
                        lineWidth: 0
                    }
                });
                this.chart5Model.legend(false);
                this.chart5Model.coord().transpose();
                this.chart5Model.interval().position('name*quantity').size(10).color('name', [ '#59A8EB', '#18C2C2', '#F0BD68', '#82E6A0', '#5AD3ED', '#BBBBBB' ])
                    .opacity(1)
                    .label('quantity', {
                            htmlTemplate: (val, item) => {
                                return (
                                    `<div><p style="white-space:nowrap;font-size: 10px;color: #777777">${item.point.percentage}%(${item.point.quantity}人)</p></div>`
                                )
                            }
                        }
                    )
                ;
                this.chart5Model.render();
            },
            updateChart5(){
                this.chart5Model.changeData(this.chart5Data);
            },
            renterSignerlistBreak() {
                if(this.sendData.periodMonth=='不限'){
                    this.sendData.periodMonth = undefined;
                }
                API.renterSignerlistBreak(this.sendData).then(res => {
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
        filters: {
            blankVal(val){
                if(!val){
                    return '-';
                }else{
                    return  val;
                }
            },
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
