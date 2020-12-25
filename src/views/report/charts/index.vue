<template>
    <div class="wrap">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <content-main>
            <ul class="charts-list">
                <li class="charts-item" @click="showModal('userPortraitDialog')" v-mark="['mk_report_charts_zzyhhx']">
                    <div id="mChart1"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>在租用户画像</span><span class="flag">租客</span>
                        </p>
                        <p>在租租客用户画像分析</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('rentReasonDialog')" v-mark="['mk_report_charts_zktzwysjfx']">
                    <div id="mChart2"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>租客退租违约数据分析</span><span class="flag">租客</span>
                        </p>
                        <p>已违约租客退房原因分析</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('inOutDetailDialog')" v-mark="['mk_report_charts_cwmx']">
                    <div id="mChart3"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>预/收付明细</span><span class="flag orange">财务</span>
                        </p>
                        <p>应收/应付明细分析</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('cashFlowDetailDialog')" v-mark="['mk_report_charts_xjlmx']">
                    <div id="mChart4"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>现金流明细</span><span class="flag orange">财务</span>
                        </p>
                        <p>应收/应付明细分析</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('cashFlowSummaryDialog')" v-mark="['mk_report_charts_xjlhz']">
                    <div id="mChart5"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>现金流汇总</span><span class="flag orange">财务</span>
                        </p>
                        <p>按部门/人员对实收/实付统计分析</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('tenantContractDialog')" v-mark="['mk_report_charts_zkhtsjfx']">
                    <div id="mChart6"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>租客合同数据分析</span><span class="flag green">合同</span>
                        </p>
                        <p>已签约租客合同数据进行分析</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('ownerContractDialog')" v-mark="['mk_report_charts_yzhtsjfx']">
                    <div id="mChart7"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>业主合同数据分析</span><span class="flag green">合同</span>
                        </p>
                        <p>已签约业主合同数据进行分析</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('decentralizedHouseDialog')" v-mark="['mk_report_charts_hzzfyfx']">
                    <div id="mChart8"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>合/整租房源分析(内测中)</span><span class="flag orange">房源</span>
                        </p>
                        <p>合租/整租房源状态分布及空置率、出租率统计</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('centralizedHouseDialog')" v-mark="['mk_report_charts_jzddfyfx']">
                    <div id="mChart9"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>集中(独栋)房源分析(内测中)</span><span style="margin-left: 0px;" class="flag orange">房源</span>
                        </p>
                        <p>集中(独栋)房源状态分布及空置率、出租率统计</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('inHouseReportDialog')" v-mark="['mk_report_charts_sfbb']">
                    <div id="mChart10"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>收房报表</span><span class="flag green">合同</span>
                        </p>
                        <p>对收房新签合同数、续签合同数、平均签约时长进行分析</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('outHouseReportDialog')" v-mark="['mk_report_charts_cfbb']">
                    <div id="mChart11"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>出房报表</span><span class="flag green">合同</span>
                        </p>
                        <p>对出房新签合同数、续签合同数、平均签约时长进行分析</p>
                    </div>
                </li>
                <li class="charts-item" @click="showModal('vacancyRateReportDialog')" v-mark="['mk_report_charts_kzlbb']">
                    <div id="mChart12"></div>
                    <div class="charts-tips">
                        <p class="title">
                            <span>空置率报表(内测中)</span><span class="flag orange">房源</span>
                        </p>
                        <p>合租、整租、集中(独栋)房源的空置率及空置天统计分析</p>
                    </div>
                </li>
            </ul>
        </content-main>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="在租用户画像" v-model="userPortraitDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <user-portrait></user-portrait>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="租客退租违约数据分析" v-model="rentReasonDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <rent-reason></rent-reason>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="预收/付明细" v-model="inOutDetailDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <in-out-detail></in-out-detail>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="现金流明细" v-model="cashFlowDetailDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <cash-flow-detail></cash-flow-detail>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="现金流汇总" v-model="cashFlowSummaryDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <cash-flow-summary></cash-flow-summary>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="租客合同数据分析" v-model="tenantContractDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <tenant-contract></tenant-contract>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="业主合同数据分析" v-model="ownerContractDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <owner-contract></owner-contract>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="合/整租房源分析" v-model="decentralizedHouseDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <decentralized-house></decentralized-house>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="集中(独栋)房源分析" v-model="centralizedHouseDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <centralized-house></centralized-house>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="收房报表" v-model="inHouseReportDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <in-house-report></in-house-report>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="出房报表" v-model="outHouseReportDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <out-house-report></out-house-report>
        </a-modal>
        <a-modal destroyOnClose centered width="100%" :maskClosable="false" title="空置率报表" v-model="vacancyRateReportDialog" :footer="null" class="ownModalBorder thousandDialog titDialog">
            <vacancy-rate-report></vacancy-rate-report>
        </a-modal>
    </div>
</template>

<script>
    import G2  from '@antv/g2';
    import { DataSet } from '@antv/data-set';
    import userPortrait from './userPortrait'
    import rentReason from './rentReason'
    import inOutDetail from './inOutDetail'
    import cashFlowDetail from './cashFlowDetail'
    import cashFlowSummary from './cashFlowSummary'
    import tenantContract from './tenantContract'
    import ownerContract from './ownerContract'
    import decentralizedHouse from './decentralizedHouse'
    import centralizedHouse from './centralizedHouse'
    import inHouseReport from './inHouseReport'
    import outHouseReport from './outHouseReport'
    import vacancyRateReport from './vacancyRateReport'

    export default {
        name: "partner",
        components: {
            userPortrait,
            rentReason,
            inOutDetail,
            cashFlowDetail,
            cashFlowSummary,
            tenantContract,
            ownerContract,
            decentralizedHouse,
            centralizedHouse,
            inHouseReport,
            outHouseReport,
            vacancyRateReport,
        },
        data() {
            return {
                userPortraitDialog: false,
                rentReasonDialog: false,
                inOutDetailDialog: false,
                cashFlowDetailDialog: false,
                cashFlowSummaryDialog: false,
                tenantContractDialog: false,
                ownerContractDialog: false,
                decentralizedHouseDialog: false,
                centralizedHouseDialog: false,
                inHouseReportDialog: false,
                outHouseReportDialog: false,
                vacancyRateReportDialog: false,
                spinLoading:false,
            }
        },
        mounted() {
        },
            created(){
            this.spinLoading = true;
            setTimeout(()=>{
                this.chart1();
                this.chart2();
                this.chart3();
                this.chart4();
                this.chart5();
                this.chart6();
                this.chart7();
                this.chart8();
                this.chart9();
                this.chart10();
                this.chart11();
                this.chart12();
                this.spinLoading = false;
            },200);
        },
        methods: {
            chart1(){
                //权限过滤
                let chart1Continue = document.getElementById("mChart1");
                if(!chart1Continue){
                    return;
                }
                const data = [
                    { type: '评估中', percent: 0.23 },
                    { type: '设计中', percent: 0.28 },
                    { type: '正在开发', percent: 0.30 },
                    { type: '已上线', percent: 0.19 }
                ];
                const sum = 500;
                const ds = new DataSet();
                const dv = ds.createView().source(data);
                dv.transform({
                    type: 'map',
                    callback(row) {
                        row.value = parseInt(sum * row.percent);
                        return row;
                    }
                });
                const chart = new G2.Chart({
                    container: 'mChart1',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(dv);
                chart.tooltip(false);
                // chart.legend({
                //     position: 'right-center',
                //     offsetX: -100
                // });
                chart.coord('theta', {
                    radius: 0.75,
                    innerRadius: 0.4
                });
                chart.intervalStack().position('percent').color('type', [ '#0a7aca', '#0a9afe', '#4cb9ff', '#8ed1ff' ])
                    .opacity(1)
                    .label('percent', {
                        // offset: -10,
                        // textStyle: {
                        //     fill: 'white',
                        //     fontSize: 12,
                        //     shadowBlur: 2,
                        //     shadowColor: 'rgba(0, 0, 0, .45)'
                        // },
                        // rotate: 0,
                        // autoRotate: false,
                        // formatter: (text, item) => {
                        //     return String(parseInt(item.point.percent * 100)) + '%';
                        // }
                        htmlTemplate: (text, item, index) => {},
                    }).style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
                // chart.guide().html({
                //     position: [ '50%', '50%' ],
                //     html: '<div class="g2-guide-html"><p class="title">项目总计</p><p class="value">500</p></div>'
                // });
                chart.legend(false);
                chart.render();
            },
            chart2(){
                //权限过滤
                let chart2Continue = document.getElementById("mChart2");
                if(!chart2Continue){
                    return;
                }
                const data = [
                    { type: '分类一', value: 27 },
                    { type: '分类二', value: 25 },
                    { type: '分类三', value: 18 },
                    { type: '分类四', value: 15 },
                    { type: '分类五', value: 10 },
                    { type: 'Other', value: 5 }
                ];

                let max = 0;
                data.forEach(function(obj) {
                    if (obj.value > max) {
                        max = obj.value;
                    }
                });
// 自定义 other 的图形，增加两条线
                G2.Shape.registerShape('interval', 'sliceShape', {
                    draw(cfg, container) {
                        const points = cfg.points;
                        const origin = cfg.origin._origin;
                        const percent = origin.value / max;
                        const xWidth = points[2].x - points[1].x;
                        const width = xWidth * percent;
                        let path = [];
                        path.push([ 'M', points[0].x, points[0].y ]);
                        path.push([ 'L', points[1].x, points[1].y ]);
                        path.push([ 'L', points[0].x + width, points[2].y ]);
                        path.push([ 'L', points[0].x + width, points[3].y ]);
                        path.push('Z');
                        path = this.parsePath(path);
                        return container.addShape('path', {
                            attrs: {
                                fill: cfg.color,
                                path
                            }
                        });
                    }
                });

                const chart = new G2.Chart({
                    container: 'mChart2',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });

                chart.source(data);
                chart.coord('theta', {
                    radius: .8
                });
                chart.tooltip(false);
                chart.intervalStack()
                    .position('value')
                    .color('type')
                    .shape('sliceShape');
                chart.legend(false);
                chart.render();

            },
            chart3(){
                //权限过滤
                let chart3Continue = document.getElementById("mChart3");
                if(!chart3Continue){
                    return;
                }
                const data = [
                    { year: '1991', value: 3 },
                    { year: '1992', value: 4 },
                    { year: '1993', value: 3.5 },
                    { year: '1994', value: 5 },
                    { year: '1995', value: 4.9 },
                ];
                const chart = new G2.Chart({
                    container: 'mChart3',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(data);
                chart.scale('value', {
                    min: 0
                });
                chart.scale('year', {
                    range: [ 0, 1 ]
                });
                chart.tooltip(false);
                chart.line().position('year*value');
                chart.point().position('year*value')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    });
                chart.axis('value', {
                        label: null
                    }).axis('year', {
                        label: null,
                        tickLine: null
                    });
                chart.render();
            },
            chart4(){
                //权限过滤
                let chart4Continue = document.getElementById("mChart4");
                if(!chart4Continue){
                    return;
                }
                const data = [
                    { country: 'Asia', year: '1750', value: 502 },
                    { country: 'Asia', year: '1800', value: 635 },
                    { country: 'Asia', year: '1850', value: 809 },
                    { country: 'Asia', year: '1900', value: 5268 },
                    { country: 'Asia', year: '1950', value: 4400 },
                    { country: 'Asia', year: '1999', value: 3634 },
                    { country: 'Asia', year: '2050', value: 947 },
                    { country: 'Africa', year: '1750', value: 106 },
                    { country: 'Africa', year: '1800', value: 107 },
                    { country: 'Africa', year: '1850', value: 111 },
                    { country: 'Africa', year: '1900', value: 1766 },
                    { country: 'Africa', year: '1950', value: 221 },
                    { country: 'Africa', year: '1999', value: 767 },
                    { country: 'Africa', year: '2050', value: 133 },
                    { country: 'Europe', year: '1750', value: 163 },
                    { country: 'Europe', year: '1800', value: 203 },
                    { country: 'Europe', year: '1850', value: 276 },
                    { country: 'Europe', year: '1900', value: 628 },
                    { country: 'Europe', year: '1950', value: 547 },
                    { country: 'Europe', year: '1999', value: 729 },
                    { country: 'Europe', year: '2050', value: 408 },
                    { country: 'Oceania', year: '1750', value: 200 },
                    { country: 'Oceania', year: '1800', value: 200 },
                    { country: 'Oceania', year: '1850', value: 200 },
                    { country: 'Oceania', year: '1900', value: 460 },
                    { country: 'Oceania', year: '1950', value: 230 },
                    { country: 'Oceania', year: '1999', value: 300 },
                    { country: 'Oceania', year: '2050', value: 300 }
                ];
                const chart = new G2.Chart({
                    container: 'mChart4',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(data, {
                    year: {
                        type: 'linear',
                        tickInterval: 50
                    }
                });
                chart.legend(false);
                chart.tooltip(false);
                chart.areaStack().position('year*value').color('country');
                chart.lineStack().position('year*value').color('country')
                    .size(2);
                chart.axis('value', {
                        label: null
                    }).axis('year', {
                        label: null,
                        tickLine: null
                    });
                chart.render();
            },
            chart5(){
                //权限过滤
                let chart5Continue = document.getElementById("mChart5");
                if(!chart5Continue){
                    return;
                }
                const data = [
                    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
                    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
                    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
                    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
                    { name: 'London', 月份: 'May', 月均降雨量: 47 },
                    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
                    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
                    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
                    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
                    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
                ];

                const chart = new G2.Chart({
                    container: 'mChart5',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(data);
                chart.interval().position('月份*月均降雨量').color('name')
                    .adjust([{
                        type: 'dodge',
                        marginRatio: 1 / 32
                    }]);
                chart.axis('月均降雨量', {
                        label: null
                    }).axis('月份', {
                        label: null,
                        tickLine: null
                    });
                chart.legend(false);
                chart.tooltip(false);
                chart.render();
            },
            chart6(){
                //权限过滤
                let chart6Continue = document.getElementById("mChart6");
                if(!chart6Continue){
                    return;
                }
                // 在一行中保存多个城市的数据，需要将数据转换成
// {month: 'Jan', city: 'Tokyo', temperature: 3.9}
                const data = [
                    { month: 'Jan', Tokyo: 7.0, London: 3.9 },
                    { month: 'Feb', Tokyo: 6.9, London: 4.2 },
                    { month: 'Mar', Tokyo: 9.5, London: 5.7 },
                    { month: 'Apr', Tokyo: 14.5, London: 8.5 },
                    { month: 'May', Tokyo: 18.4, London: 11.9 },
                    { month: 'Jun', Tokyo: 21.5, London: 15.2 },
                    { month: 'Jul', Tokyo: 25.2, London: 17.0 },
                ];
                const ds = new DataSet();
                const dv = ds.createView().source(data);
// fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
                dv.transform({
                    type: 'fold',
                    fields: [ 'Tokyo', 'London' ], // 展开字段集
                    key: 'city', // key字段
                    value: 'temperature' // value字段
                });
                const chart = new G2.Chart({
                    container: 'mChart6',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(dv, {
                    month: {
                        range: [ 0, 1 ]
                    }
                });
                chart.tooltip(false);
                chart.axis('temperature', {
                    label: {
                        formatter: val => {
                            return val + '°C';
                        }
                    }
                });
                chart
                    .line()
                    .position('month*temperature')
                    .color('city')
                    .shape('smooth');
                chart
                    .point()
                    .position('month*temperature')
                    .color('city')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    });
                chart.legend(false);
                chart.axis('temperature', {
                        label: null
                    }).axis('month', {
                        label: null,
                        tickLine: null
                    });
                chart.render();

            },
            chart7(){
                //权限过滤
                let chart7Continue = document.getElementById("mChart7");
                if(!chart7Continue){
                    return;
                }
                // 在一行中保存多个城市的数据，需要将数据转换成
// {month: 'Jan', city: 'Tokyo', temperature: 3.9}
                const data = [
                    { month: 'Jan', Tokyo: 7.0, London: 3.9 },
                    { month: 'Feb', Tokyo: 6.9, London: 4.2 },
                    { month: 'Mar', Tokyo: 9.5, London: 5.7 },
                    { month: 'Apr', Tokyo: 14.5, London: 8.5 },
                    { month: 'May', Tokyo: 18.4, London: 11.9 },
                    { month: 'Jun', Tokyo: 21.5, London: 15.2 },
                    { month: 'Jul', Tokyo: 25.2, London: 17.0 },
                ];
                const ds = new DataSet();
                const dv = ds.createView().source(data);
// fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
                dv.transform({
                    type: 'fold',
                    fields: [ 'Tokyo', 'London' ], // 展开字段集
                    key: 'city', // key字段
                    value: 'temperature' // value字段
                });
                const chart = new G2.Chart({
                    container: 'mChart7',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(dv, {
                    month: {
                        range: [ 0, 1 ]
                    }
                });
                chart.tooltip(false);
                chart.axis('temperature', {
                    label: {
                        formatter: val => {
                            return val + '°C';
                        }
                    }
                });
                chart
                    .line()
                    .position('month*temperature')
                    .color('city')
                    .shape('smooth');
                chart
                    .point()
                    .position('month*temperature')
                    .color('city')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    });
                chart.axis('temperature', {
                        label: null
                    }).axis('month', {
                        label: null,
                        tickLine: null
                    });
                chart.legend(false);
                chart.render();
            },
            chart8(){
                //权限过滤
                let chart8Continue = document.getElementById("mChart8");
                if(!chart8Continue){
                    return;
                }
                const data = [
                    { type: '评估中', percent: 0.23 },
                    { type: '设计中', percent: 0.28 },
                    { type: '正在开发', percent: 0.30 },
                    { type: '已上线', percent: 0.19 }
                ];
                const sum = 500;
                const ds = new DataSet();
                const dv = ds.createView().source(data);
                dv.transform({
                    type: 'map',
                    callback(row) {
                        row.value = parseInt(sum * row.percent);
                        return row;
                    }
                });
                const chart = new G2.Chart({
                    container: 'mChart8',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(dv);
                chart.tooltip(false);
                // chart.legend({
                //     position: 'right-center',
                //     offsetX: -100
                // });
                chart.coord('theta', {
                    radius: 0.75,
                    innerRadius: 0.4
                });
                chart.intervalStack().position('percent').color('type', [ '#0a7aca', '#0a9afe', '#4cb9ff', '#8ed1ff' ])
                    .opacity(1)
                    .label('percent', {
                        // offset: -10,
                        // textStyle: {
                        //     fill: 'white',
                        //     fontSize: 12,
                        //     shadowBlur: 2,
                        //     shadowColor: 'rgba(0, 0, 0, .45)'
                        // },
                        // rotate: 0,
                        // autoRotate: false,
                        // formatter: (text, item) => {
                        //     return String(parseInt(item.point.percent * 100)) + '%';
                        // }
                        htmlTemplate: (text, item, index) => {},
                    }).style({
                    lineWidth: 1,
                    stroke: '#fff'
                });
                // chart.guide().html({
                //     position: [ '50%', '50%' ],
                //     html: '<div class="g2-guide-html"><p class="title">项目总计</p><p class="value">500</p></div>'
                // });
                chart.legend(false);
                chart.render();
            },
            chart9(){
                //权限过滤
                let chart9Continue = document.getElementById("mChart9");
                if(!chart9Continue){
                    return;
                }
                const data = [
                    { type: '评估中', percent: 0.23 },
                    { type: '设计中', percent: 0.28 },
                    { type: '正在开发', percent: 0.30 },
                    { type: '已上线', percent: 0.19 }
                ];
                const sum = 500;
                const ds = new DataSet();
                const dv = ds.createView().source(data);
                dv.transform({
                    type: 'map',
                    callback(row) {
                        row.value = parseInt(sum * row.percent);
                        return row;
                    }
                });
                const chart = new G2.Chart({
                    container: 'mChart9',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(dv);
                chart.tooltip(false);
                // chart.legend({
                //     position: 'right-center',
                //     offsetX: -100
                // });
                chart.coord('theta', {
                    radius: 0.75,
                    innerRadius: 0.4
                });
                chart.intervalStack().position('percent').color('type', [ '#0a7aca', '#0a9afe', '#4cb9ff', '#8ed1ff' ])
                    .opacity(1)
                    .label('percent', {
                        // offset: -10,
                        // textStyle: {
                        //     fill: 'white',
                        //     fontSize: 12,
                        //     shadowBlur: 2,
                        //     shadowColor: 'rgba(0, 0, 0, .45)'
                        // },
                        // rotate: 0,
                        // autoRotate: false,
                        // formatter: (text, item) => {
                        //     return String(parseInt(item.point.percent * 100)) + '%';
                        // }
                        htmlTemplate: (text, item, index) => {},
                    }).style({
                    lineWidth: 1,
                    stroke: '#fff'
                });
                // chart.guide().html({
                //     position: [ '50%', '50%' ],
                //     html: '<div class="g2-guide-html"><p class="title">项目总计</p><p class="value">500</p></div>'
                // });
                chart.legend(false);
                chart.render();
            },
            chart10(){
                //权限过滤
                let chart10Continue = document.getElementById("mChart10");
                if(!chart10Continue){
                    return;
                }
                const data = [
                    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
                    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
                    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
                    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
                    { name: 'London', 月份: 'May', 月均降雨量: 47 },
                    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
                    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
                    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
                    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
                    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
                    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
                    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
                    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
                    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
                    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
                    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 }
                ];

                const chart = new G2.Chart({
                    container: 'mChart10',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(data);
                chart.interval().position('月份*月均降雨量').color('name')
                    .adjust([{
                        type: 'dodge',
                        marginRatio: 1 / 32
                    }]);
                chart.axis('月均降雨量', {
                        label: null
                    }).axis('月份', {
                        label: null,
                        tickLine: null
                    });
                chart.legend(false);
                chart.tooltip(false);
                chart.render();
            },
            chart11(){
                //权限过滤
                let chart11Continue = document.getElementById("mChart11");
                if(!chart11Continue){
                    return;
                }
                const data = [
                    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
                    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
                    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
                    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
                    { name: 'London', 月份: 'May', 月均降雨量: 47 },
                    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
                    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
                    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
                    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
                    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
                ];

                const chart = new G2.Chart({
                    container: 'mChart11',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(data);
                chart.interval().position('月份*月均降雨量').color('name')
                    .adjust([{
                        type: 'dodge',
                        marginRatio: 1 / 32
                    }]);
                chart.legend(false);
                chart.axis('月均降雨量', {
                        label: null
                    }).axis('月份', {
                        label: null,
                        tickLine: null
                    });
                chart.tooltip(false);
                chart.render();
            },
            chart12(){
                //权限过滤
                let chart12Continue = document.getElementById("mChart12");
                if(!chart12Continue){
                    return;
                }
                const data = [
                    { year: '10 年', sales: 38 },
                    { year: '11 年', sales: 52 },
                    { year: '12 年', sales: 61 },
                    { year: '13 年', sales: 145 },
                    { year: '14 年', sales: 48 },
                    { year: '15 年', sales: 38 },
                ];
                const chart = new G2.Chart({
                    container: 'mChart12',
                    forceFit: true,
                    height: 200,
                    padding: 'auto'
                });
                chart.source(data);
                chart.scale('sales', {
                    tickInterval: 20
                });
                chart.interval().position('year*sales');
                chart.axis('sales', {
                    label: null
                }).axis('year', {
                    label: null,
                    tickLine: null
                });
                chart.tooltip(false);
                chart.render();

            },
            showModal(Dialog){
                this[Dialog] = true
            }
        },
    }
</script>

<style scoped lang="less">
    .wrap{
        & /deep/ .content{
            padding: 0;
            overflow-x: hidden;
        }
        .tips{
            font-size: 14px;
            color: #555555;
        }
        .charts-list{
            display: flex;
            flex-wrap: wrap;
            margin-right: -20px;
            background-color: #f0f2f5;
            .charts-item{
                margin: 0 20px 20px 0;
                padding: 20px;
                width: calc(25% - 20px);
                height: 320px;
                background-color: #ffffff;
                .charts-tips{
                    font-size: 14px;
                    color: #777777;
                    .title{
                        margin: 10px 0;
                        display: flex;
                        align-items: center;
                        font-size: 16px;
                        color: #000000;
                        border-radius:1px;
                        .flag{
                            margin-left: 7px;
                            padding: 2px 5px;
                            font-size: 12px;
                            color: #409EFF;
                            background-color: #F0F8FF;
                        }
                        .orange{
                            color: #FFA036;
                            background-color: #FFF3E4;
                        }
                        .green{
                            color: #03C683;
                            background-color: #E5F2F1;
                        }
                    }
                }
            }
        }

    }

</style>
