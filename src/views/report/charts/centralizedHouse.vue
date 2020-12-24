<template>
    <div class="wrap">
        <div class="top">
            <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            <div>
                <div class="search-condition clearfix">
                    <div class="search-condition-time f-fl">
                        <span>指定统计周期：</span>
                        <span class="currentDay cursor" :class="timeFlag==1?'clickStyle':'normalStyle'" @click="changeTime(1)">当天</span>
                        <span class="middleDate cursor" :class="timeFlag==2?'clickStyle':'normalStyle'" @click="changeTime(2)">上月</span>
                        <span class="middleDate cursor" :class="timeFlag==3?'clickStyle':'normalStyle'" @click="changeTime(3)">本月</span>
                        <span class="currentYear cursor" :class="timeFlag==4?'clickStyle':'normalStyle'" @click="changeTime(4)">全年</span>
                        <a-range-picker @change="(date,dateString)=>changeDate(date, dateString)" :format="dateFormat" v-model="timeDateList"/>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">部门：</div>
                        <div class="f-fl" style="margin-top: 0.5px;"><dept-employee-tree placeholder="请选择部门" resMark="mk_house_centralized" :showNameAll="false" :showEmployee="false" @selectChange="selectDept" placement="bottomRight" ref="selectDeptEmp" minWidth="250px" width="90px" ></dept-employee-tree></div>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl selectCostType clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">城市：</div>
                        <div class="f-fl" style="width: 100px;">
                            <city-town-tree ref="selectCityTown" :showNameAll="false"  @selectChange="selectCityTownChange"></city-town-tree>
                        </div>
                    </div>
                    <div class="search-condition-divider f-fl" style="width: 1px"></div>
                    <div class="f-fl clearfix" style="margin-top: 7px">
                        <div class="f-fl" style="margin-top: 7px;">独栋项目：</div>
                        <div class="projectName f-fl u-no-border">
                            <a-select labelInValue  style="min-width: 90px;margin-top: 2px;" placeholder="不限" @change="selectProject" >
                                <a-select-option :value="item.id" :key="item.id" v-for="(item,index) in projectList"><div class="itemName overHidde">{{ item.name }}</div></a-select-option>
                            </a-select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="con" v-show="statusActiveIndex == 0">
            <div class="charts-list">
                <div class="charts-item">
                    <p>房源统计</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div>
                        <div id="chart1"></div>
                    </div>
                </div>
                <div class="charts-item" style="position: relative">
                    <p>房源状态分布</p>
                    <div v-if="!chart2Data||chart2Data.length==0" style="position:absolute;top:50%;left:calc(50% - 30px);color: #777777">暂无数据</div>
                    <div id="chart2"></div>
                </div>

            </div>
            <div class="charts-list">
                <div class="charts-item">
                    <p>房源状态统计</p>
                    <div id="chart3"></div>
                </div>
            </div>
            <div class="charts-list">
                <div class="charts-item">
                    <p>房源入住率和空置率统计</p>
                    <!--                    <p>实时监控主要租房群体是哪种性别</p>-->
                    <div id="chart4"></div>
                </div>
            </div>
        </div>
        <div class="con" v-show="statusActiveIndex == 1">
            <a-table :loading="loading" size="middle" rowKey="houseId" :columns="columns" :dataSource="tableData.list" :pagination="false" bordered>
                <div slot="availableDayTotalWarn">
                    可租天数(天)
                    <a-tooltip placement="top" title="该房源业主合同开始日期至结束日期之间的周期；没有业主合同的则从房源录入之日起至当前时间">
                        <a-icon type="exclamation-circle" style="color: #FFA036;" />
                    </a-tooltip>
                </div>
                <div slot="vancatDayTotalWarn">
                    空置天数(天)
                    <a-tooltip placement="top" title="假设统计区间为2018-01-01至2018-10-31。某房源的情况如下：业主合同期限为2018-03-01至2021-12-31；该房源下有两份租客合同，第一份合同期限为2018-04-01至2018-06-30、第二份合同期限为2018-07-15至2018-10-14。那么空置天数为：2018-01-01至2018-03-31空置90天 加上 2018-07-01至2018-07-14空置14天 加上 2018-10-15至2018-10-31空置17天 等于 121天">
                        <a-icon type="exclamation-circle" style="color: #FFA036;" />
                    </a-tooltip>
                </div>
                <div slot="rentingNumWarn">
                    出房次数(次)
                    <a-tooltip placement="top" title="假如统计区间内某房间签署2份租客合同（包含续租合同），则出房次数为2次">
                        <a-icon type="exclamation-circle" style="color: #FFA036;" />
                    </a-tooltip>
                </div>
                <div slot="avgRentingDaysWarn">
                    平均出房天数(天)
                    <a-tooltip placement="top" title="空置天数除以出房次数则为平均出房天数">
                        <a-icon type="exclamation-circle" style="color: #FFA036;" />
                    </a-tooltip>
                </div>
                <div slot="avgRentingPriceWarn">
                    出房均价(元)
                    <a-tooltip placement="top" title="假设统计区间为2018-01-01至2018-10-31。某房源的情况如下：该房源下有两份租客合同，第一份为每月4000元期限为2018-03-01至2018-07-30、第二份为每月4500元期限为2018-08-27至2018-10-29。那么出房均价为：两份合同的月租金之和除以出房次数，也即4000元加上4500元除以2等于4250元">
                        <a-icon type="exclamation-circle" style="color: #FFA036;" />
                    </a-tooltip>
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
    import  {listBuildingProject} from '@/api/centralizedHouse';
    const currentMonth = Vue.prototype.$moment().startOf('month').valueOf();
    const oneMonth = Vue.prototype.$moment().endOf('month').valueOf();
    const currentYear = Vue.prototype.$moment().startOf('year').valueOf();
    const oneYear = Vue.prototype.$moment().endOf('year').valueOf();
    const currentDay = Vue.prototype.$moment().startOf('day').valueOf();
    const preMonthStart = Vue.prototype.$moment().month(Vue.prototype.$moment().month() - 1).startOf('month').valueOf();
    const preMonthEnd = Vue.prototype.$moment().month(Vue.prototype.$moment().month() - 1).endOf('month').valueOf();
    export default {
        name: "centralizedHouse",
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
                        dataIndex: 'statusName',
                        key: 'statusName',
                    },
                    {
                        title: '房源信息',
                        dataIndex: 'fullAddress',
                        key: 'fullAddress',
                    },
                    {
                        dataIndex: 'availableDayTotal',
                        key: 'availableDayTotal',
                        slots: { title: 'availableDayTotalWarn' },
                    },
                    {
                        dataIndex: 'vancatDayTotal',
                        key: 'vancatDayTotal',
                        slots: { title: 'vancatDayTotalWarn' },
                    },
                    {
                        dataIndex: 'rentingNum',
                        key: 'rentingNum',
                        slots: { title: 'rentingNumWarn' },
                    },
                    {
                        dataIndex: 'avgRentingDays',
                        key: 'avgRentingDays',
                        slots: { title: 'avgRentingDaysWarn' },
                    },
                    {
                        dataIndex: 'avgRentingPrice',
                        key: 'avgRentingPrice',
                        slots: { title: 'avgRentingPriceWarn' },
                    },
                ],
                sendData:{
                    areaId:'',
                    buildingProjectId:'',
                    cityId:'',
                    townId:'',
                    deptId:'',
                    houseType:3,
                    queryDateBegin:currentMonth,
                    queryDateEnd:oneMonth,
                    current:1,
                    size:10,
                },
                timeFlag:3,
                chart1Model:null,
                chart2Model:null,
                chart3Model:null,
                chart4Model:null,
                chart1Data:[],
                chart2Data:[],
                chart3Data:[],
                chart4Data:[],
                exportExcelShow:false,
                exportUrl: '/pc2b/da/house/list_vacant_stat_dept_dimension_export',
                exportData:{},
                timeDateList:[Vue.prototype.$moment(currentMonth),Vue.prototype.$moment(oneMonth)],
                dateFormat: 'YYYY.MM.DD',           //日期选择器格式
                projectList:[],                     //项目类型
                data2NullFlag:false,
            }
        },
        mounted(){
        },
        created() {
            this.listBuildingProject();
            this.initChartData(true);
        },
        methods: {
            listBuildingProject(){
                this.projectList = [];
                let temp = {
                    id:'',
                    name:'不限',
                };
                listBuildingProject().then(res => {
                    // console.log(res)
                    if (res.code === '200') {
                        let tempList = res.data;
                        if(tempList&&tempList.length > 0){
                            this.projectList.push(temp);
                            tempList.forEach((item)=>{
                                this.projectList.push(item);
                            });
                        }
                    }
                })
            },
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
            selectProject(value){
                this.sendData.buildingProjectId = value.key;
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
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
            changeTime(val){
                this.timeFlag = val;
                if(val==1){
                    //当天
                    this.sendData.queryDateBegin=currentDay;
                    this.sendData.queryDateEnd=currentDay;
                    this.timeDateList = [Vue.prototype.$moment(currentDay),Vue.prototype.$moment(currentDay)];
                }
                else if(val==2){
                    //上月
                    this.sendData.queryDateBegin=preMonthStart;
                    this.sendData.queryDateEnd=preMonthEnd;
                    this.timeDateList = [Vue.prototype.$moment(preMonthStart),Vue.prototype.$moment(preMonthEnd)];
                }
                else if(val==3){
                    //本月
                    this.sendData.queryDateBegin=currentMonth;
                    this.sendData.queryDateEnd=oneMonth;
                    this.timeDateList = [Vue.prototype.$moment(currentMonth),Vue.prototype.$moment(oneMonth)];
                }
                else if(val==4){
                    //本年
                    this.sendData.queryDateBegin=currentYear;
                    this.sendData.queryDateEnd=oneYear;
                    this.timeDateList = [Vue.prototype.$moment(currentYear),Vue.prototype.$moment(oneYear)];
                }
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChartData(false);
                }
            },
            changeDate(date) {
                this.sendData.queryDateBegin=date[0];
                this.sendData.queryDateEnd=date[1];
                //若开始结束日期都为空
                if(!this.sendData.queryDateBegin){
                    this.$message.error("请选择开始时间");
                    return;
                }
                if(!this.sendData.queryDateEnd){
                    this.$message.error("请选择结束时间");
                    return;

                }
                if(this.statusActiveIndex == 1){
                    this.initTableData();
                }else{
                    this.initChartData(false);
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
                this.chart2Data = [];
                this.chart3Data = [];
                this.chart4Data = [];
                API.houseBookQuantity(this.sendData).then(res => {
                    if (res.code === '200') {
                        let temp4Chart1 = {
                            gender: '预订数',
                            value: res.data,
                        };
                        this.chart1Data.push(temp4Chart1);
                        API.houseStatusAnalysis(this.sendData).then(res => {
                            if (res.code === '200') {
                                let temp1Chart1 = {
                                    gender: '入住率',
                                    value: res.data.rentAlreadyRate,
                                };
                                this.chart1Data.push(temp1Chart1);
                                let temp2Chart1 = {
                                    gender: '平均出房天数',
                                    value: res.data.avgRentingDays,
                                };
                                this.chart1Data.push(temp2Chart1);
                                let temp3Chart1 = {
                                    gender: '平均出房天数',
                                    value: res.data.avgRentingDays,
                                };
                                this.chart1Data.push(temp3Chart1);
                                if(res.data.vacantRate){
                                    let temp1Chart2 = {
                                        location: '空置',
                                        value:res.data.vacantRate,
                                    }
                                    this.chart2Data.push(temp1Chart2);
                                }
                                if(res.data.dispositionRate){
                                    let temp2Chart2 = {
                                        location: '配置',
                                        value:res.data.dispositionRate,
                                    }
                                    this.chart2Data.push(temp2Chart2);
                                }
                                if(res.data.lockedRate) {
                                    let temp3Chart2 = {
                                        location: '锁房',
                                        value: res.data.lockedRate,
                                    }
                                    this.chart2Data.push(temp3Chart2);
                                }
                                if(res.data.rentAlreadyRate){
                                    let temp4Chart2 = {
                                        location: '已租',
                                        value:res.data.rentAlreadyRate,
                                    }
                                    this.chart2Data.push(temp4Chart2);
                                }
                                if(res.data.vacantRate==0&&res.data.dispositionRate==0&&res.data.lockedRate==0&&res.data.rentAlreadyRate==0){
                                    this.data2NullFlag = true;
                                }else{
                                    this.data2NullFlag = false;
                                }
                                let tempArr3 = res.data.dateRoomStatusStats;
                                if(tempArr3&&tempArr3.length>0){
                                    for (let i = 0; i < tempArr3.length; i++) {
                                        let temp1Chart3={
                                            month:tempArr3[i].dateStr,
                                            city: '已租(间)',
                                            temperature:tempArr3[i].rentAlreadyTotal,
                                        };
                                        this.chart3Data.push(temp1Chart3);
                                        let temp2Chart3={
                                            month:tempArr3[i].dateStr,
                                            city: '配置(间)',
                                            temperature:tempArr3[i].dispositionTotal,
                                        };
                                        this.chart3Data.push(temp2Chart3);
                                        let temp3Chart3={
                                            month:tempArr3[i].dateStr,
                                            city: '空置(间)',
                                            temperature:tempArr3[i].vacantTotal,
                                        };
                                        this.chart3Data.push(temp3Chart3);
                                        let temp4Chart3={
                                            month:tempArr3[i].dateStr,
                                            city: '锁房(间)',
                                            temperature:tempArr3[i].lockedTotal,
                                        };
                                        this.chart3Data.push(temp4Chart3);
                                    }
                                }
                                let tempArr4 = res.data.dateRentAlreadyVancatRateStatList;
                                if(tempArr4&&tempArr4.length>0){
                                    for (let i = 0; i < tempArr4.length; i++) {
                                        let temp1Chart4={
                                            month:tempArr4[i].dateStr,
                                            city: '入住率(%)',
                                            temperature:tempArr4[i].rentAlreadyRate,
                                        };
                                        this.chart4Data.push(temp1Chart4);
                                        let temp2Chart4={
                                            month:tempArr4[i].dateStr,
                                            city: '空置率(%)',
                                            temperature:tempArr4[i].vacantRate,
                                        };
                                        this.chart4Data.push(temp2Chart4);
                                    }
                                }
                                if(val){
                                    this.chart1();
                                    this.chart2();
                                    this.chart3();
                                    this.chart4();
                                }else{
                                    this.updateChart1();
                                    this.updateChart2();
                                    this.updateChart3();
                                    this.updateChart4();
                                }
                            }
                        })
                    }
                })
            },
            chart1(){
                if(!this.chart1Model){
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
                    .color('gender')
                    .shape('liquid-fill-gauge')
                    .style({
                        lineWidth: 2,
                        opacity: 0.75,
                        fillOpacity:30,
                    }).size(100)
                this.chart1Data.forEach(row => {
                    this.chart1Model.guide().html({
                        top: true,
                        position: {
                            gender: row.gender,
                            value: 50
                        },
                        html: `<div style="text-align: center;"><p style="font-size: 12px;color: #571200">${row.gender}</p><p style="color: #111111"><span style="font-size: 16px">${row.gender=='入住率'?row.value+'%':row.value}</span></p></div>`,
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
            chart2(){
                if(this.data2NullFlag){
                    this.chart2Data = [];
                    return;
                }
                this.chart2Data.forEach((item)=>{
                    item.value = item.value/100;
                })
                this.chart2Model = new G2.Chart({
                    container: 'chart2',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                this.chart2Model.source(this.chart2Data);
                this.chart2Model.legend({
                    position: 'right-center',
                });
                this.chart2Model.coord('theta', {
                    radius: 0.75,
                    innerRadius: 0.6
                });
                const interval = this.chart2Model.intervalStack()
                    .position('value')
                    .color('location',[ '#82E6A0', '#18C2C2', '#59A8EB', '#F0BD68', '#BBBBBB'])
                    .label('lable', {
                        htmlTemplate: (val, item) => {
                            return (
                                `<div><span style="white-space:nowrap;font-size: 10px;color: #111111">${(item.point.value*100).toFixed(2)}%</span></div>`
                            )
                        }
                    })
                    .tooltip('location*value', (location, value) => {
                        return {
                            name: location,
                            value: (value*100).toFixed(2)+'%',
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
                this.chart2Model.render();
                interval.setSelected(this.chart2Data[0]);
            },
            updateChart2(){
                if(this.data2NullFlag){
                    this.chart2Data = [];
                    return;
                }
                this.chart2Data.forEach((item)=>{
                    item.value = item.value/100;
                })
                this.chart2Model.changeData(this.chart2Data);
            },
            chart3(){
                this.chart3Model = new G2.Chart({
                    container: 'chart3',
                    forceFit: true,
                    height: 400,
                    padding: [60,'auto','auto','auto'],
                });
                this.chart3Model.source(this.chart3Data, {
                    month: {
                        range: [ 0, 1 ]
                    }
                });
                this.chart3Model.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                this.chart3Model.axis('temperature', {
                    label: {
                        // formatter: val => {
                        //     return val + '°C';
                        // }
                    }
                });
                this.chart3Model.line().position('month*temperature').color('city').shape('smooth');
                this.chart3Model.point().position('month*temperature').color('city')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    });
                this.chart3Model.legend({
                    position: 'top-left',
                    offsetY: -10
                });
                this.chart3Model.render();
            },
            updateChart3(){
                this.chart3Model.changeData(this.chart3Data);
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
            initTableData(){
                API.listHouseDataOperationAnalysis(this.sendData).then(res => {
                    if (res.code === '200') {
                        this.tableData.list = res.data.records;
                        this.tableData.total = res.data.total;
                        this.tableData.list.forEach((item, index)=>{
                            item.index = index + 1;
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
                    .currentDay {
                        border-top-left-radius: 10px;
                        border-bottom-left-radius: 10px;
                        padding: 4px;
                    }
                    .middleDate{
                        padding: 4px;
                    }
                    .projectName{
                        min-width: 98px;
                        .itemName{
                            max-width: 98px;
                            color:#111111;
                            font-weight: 500;
                            font-size: 14px;
                        }
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
