<template>
    <!-- 线索池：公客、私客、预约 -->
    <div class="sourceBox">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <div class="add-btn-wrap" @click="addSource(1)" v-show="clueType == 1" v-mark="['mk_source_tenant_tjzy']">
            <icon-font type="iconyumengtubiao_tianjia" />添加租客线索
        </div>
        <div class="add-btn-wrap" @click="addSource(1)" v-show="clueType == 2" v-mark="['mk_source_tenant_gk_tjzy']">
            <icon-font type="iconyumengtubiao_tianjia" />添加租客线索
        </div>
        <content-top>
            <div class="status-box f-fl">
                <top-title  :statusData="statusData" :activeIndex="activeIndex" @changeStatus="changeStatus"></top-title>
            </div>
            <div class="f-fr cursor exportExcel-box" v-show="clueType == 1||clueType == 2"><span @click="exportExcel"><icon-font class="f-ftc-blue" type="iconyumengtubiao_xiazai1" /></span></div>
            <div class="search-box f-fr" v-show="clueType == 1||clueType == 2">
                <search-dialog ref="searchDialog_customer" placeholder="客户姓名/客户电话" :showDeptEmp="true" deptTitle="维护人" deptPlaceholder="请选择维护人或维护人所属部门" :showEmployee="true" :sourceSpecialFlag="true" :showCityTown="false" :searchList="searchList_customer" @search="assetsFormData_customer"></search-dialog>
            </div>
            <div class="search-box f-fr" v-show="clueType == 3">
                <search-dialog ref="searchDialog_appointment" placeholder="客户姓名/客户电话/房源编号/房源地址/项目名称/门牌号" :showDeptEmp="false" :showEmployee="false" :showCityTown="false" :searchList="searchList_appointment" @search="assetsFormData_appointment"></search-dialog>
            </div>
        </content-top>
        <content-main>
            <skeleton-tenant-private v-show="clueType == 1&&spinLoading"></skeleton-tenant-private>
            <skeleton-tenant v-show="clueType == 2&&spinLoading"></skeleton-tenant>
            <div class="table" v-show="(clueType == 1||clueType == 2)&&!spinLoading">
                <a-table rowKey="id" :bordered="true" :customRow="openDetail_customer" :pagination="false" :columns="clueType == 1?tableColumns_customer1:tableColumns_customer2" :dataSource="tableData_customer">
                    <div slot="status" slot-scope="status">
                        <div v-if="status==1" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg1 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>正常</span>
                            </div>
                        </div>
                        <div v-if="status==2" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>关闭 · 我签</span>
                            </div>
                        </div>
                        <div v-else-if="status==3" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2  IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>关闭 · 他签</span>
                            </div>
                        </div>
                        <div v-else-if="status==4" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2  IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>关闭 · 无效</span>
                            </div>
                        </div>
                    </div>
                    <div slot="name" slot-scope="text,record">
                      <a-popover>
                        <template slot="content">
                          <p style="padding: 8px 18px;" v-if="record.gender==1">
                            <icon-font type="iconyumengtubiao_nan" style="color: #0A87F8"/> {{text}}
                          </p>
                          <p style="padding: 8px 18px;" v-if="record.gender==2">
                            <icon-font type="iconyumengtubiao_nv" style="color: #FB4246"/> {{text}}
                          </p>
                        </template>
                        <div v-if="record.gender==1" style="max-width: 90px;" class="overHidde"><icon-font type="iconyumengtubiao_nan" style="color: #0A87F8"/> {{text}}</div>
                        <div v-if="record.gender==2" style="max-width: 90px;" class="overHidde"><icon-font type="iconyumengtubiao_nv" style="color: #FB4246"/> {{text}}</div>
                      </a-popover>
                    </div>
                    <div slot="locationInfo" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    {{record.cityName}}-{{text}}
                                </p>
                            </template>
                            <div class="f-fl" style="position: relative;" :style="clueType == 1?'max-width:200px;':'max-width:260px;'" type="primary">
                                <p class="overHidde" style="line-height:22px;">
                                    <span v-if="record.urgencyLevel==1" class="urgencyLevel1 paddingStyle">紧急</span>
                                    <span v-if="record.urgencyLevel==2" class="urgencyLevel2 paddingStyle">一般</span>
                                    <span v-if="record.urgencyLevel==3" class="urgencyLevel3 paddingStyle">暂缓</span>
                                    <span v-if="record.urgencyLevel==4" class="urgencyLevel4 paddingStyle">更久</span>
                                    <span style="margin-left: 5px">{{record.cityName}}-{{text}}</span>
                                </p>
                            </div>
                       </a-popover>
                    </div>
                    <div slot="demandTypeStr" slot-scope="text">
                        <a-popover v-if="text">
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    {{text}}
                                </p>
                            </template>
                            <div class="f-fl" style="max-width:125px;position: relative;" type="primary">
                                <p class="overHidde" style="line-height:22px;">
                                    {{text}}
                                </p>
                            </div>
                        </a-popover>
                        <span v-else>-</span>
                    </div>
                    <div slot="maxMoney" slot-scope="text,record">
                        {{record|moneySpecialVal}}
                    </div>
                    <div slot="leasePeriod" slot-scope="leasePeriod" class="cursor">
                        {{leasePeriod==1?'一个月':leasePeriod==2?'三个月':leasePeriod==3?'半年':leasePeriod==4?'一年':leasePeriod==5 ?'一年以上':'-'}}
                    </div>
                  <div slot="firstFollowTime" slot-scope="text,record">
                    {{record.followQuantity&&record.firstFollowTime?record.followQuantity+'次/'+record.firstFollowTime+'分钟':!record.followQuantity&&record.firstFollowTime?'-/'+record.firstFollowTime+'分钟':record.followQuantity&&!record.firstFollowTime?record.followQuantity+'次/-':!record.followQuantity&&!record.firstFollowTime?'-':''}}
                  </div>
                    <div slot="latestFollowUp" slot-scope="text,record">
                        <a-popover v-if="record.latestFollowUp">
                            <template slot="content">
                                <p style="padding: 8px 16px;">
                                    <span class="time">{{($moment(record.latestFollowUp.time).fromNow())|timeVal}}</span>
                                    <span style="margin-left: 5px">{{record.latestFollowUp.person}}{{record.latestFollowUp.followType}}：{{record.latestFollowUp.content}}</span>
                                </p>
                            </template>
                            <div class="f-fl" style="position: relative;" :style="clueType == 1?'max-width:200px;':'max-width:250px;'" type="primary">
                                <p class="overHidde" style="line-height:22px;">
                                    <span class="time">{{($moment(record.latestFollowUp.time).fromNow())|timeVal}}</span>
                                    <span style="margin-left: 5px">{{record.latestFollowUp.person}}{{record.latestFollowUp.followType}}：{{record.latestFollowUp.content}}</span>
                                </p>
                            </div>
                        </a-popover>
                        <span v-else>
                            -
                        </span>
                    </div>
                    <div slot="action" slot-scope="text, record">
                        <a-popover :title="null" trigger="hover" v-if="checkOpts_customer(record) == true">
                            <template slot="content">
                                <div v-if="record.btnArr.indexOf('11') != -1" @click.stop="openDetailFocusFollow(record)" class="action cursor">跟进</div>
                                <div v-if="record.btnArr.indexOf('2') != -1" @click.stop="changePrivate(record)" class="action cursor">抢单</div>
                                <div v-if="record.btnArr.indexOf('3') != -1" @click.stop="openAssignUser(record)" class="action cursor">指派</div>
                                <div v-if="record.btnArr.indexOf('6') != -1" @click.stop="goReserve(record,2)" class="action cursor">预定</div>
                                <div v-if="record.btnArr.indexOf('7') != -1" @click.stop="goSign(record,2)" class="action cursor">签约</div>
                                <div v-if="record.btnArr.indexOf('5') != -1" @click.stop="openCloseSource(record)" class="action cursor">关闭</div>
                                <!--<div v-if="record.status==1" @click.stop="addSource(2,record)" class="action cursor" v-mark="clueType == 1 ? ['mk_source_tenant_bj'] : ['mk_source_tenant_gk_bj']">编辑</div> -->
                                <div v-if="record.btnArr.indexOf('4') != -1" class="action cursor" @click.stop="changPublic(record)">转为公客</div>
                                <div v-if="record.btnArr.indexOf('8') != -1" @click.stop="openShareSource(record)" class="action cursor">共享</div>
                                <div v-if="record.btnArr.indexOf('9') != -1" @click.stop="addSource(3,record)" class="action cursor">重新激活</div>
                                <div v-if="record.btnArr.indexOf('10') != -1" @click.stop="deleteChild(record)" class="action cursor">删除</div>
                            </template>
                            <div style="width: 100%;height: 100%">
                                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                            </div>
                        </a-popover>
                    </div>
                </a-table>
                <div class="contFoot" v-show="tableData_customer.length>0">
                    <a-pagination size="small" :total="pagination_customer.total" :current="pagination_customer.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination_customer.pageSize" showSizeChanger @change="onSizeChange_customer" @showSizeChange="onShowSizeChange_customer" />
                </div>
            </div>
            <skeleton-appointment v-show="clueType == 3&&spinLoading"></skeleton-appointment>
            <div class="table" v-show="clueType == 3&&!spinLoading">
                <a-table rowKey="id" :bordered="true" :customRow="openDetail_appointment" :pagination="false" :columns="tableColumns_appointment" :dataSource="tableData_appointment">
                    <div slot="status" slot-scope="status">
                        <div v-if="status==1" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg0 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>待处理</span>
                            </div>
                        </div>
                        <div v-else-if="status==2" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg1 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已处理</span>
                            </div>
                        </div>
                        <div v-else-if="status==3" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2  IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已取消</span>
                            </div>
                        </div>
                    </div>
                    <div slot="fullAddress" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}} </p>

                            </template>
                            <p class="overHidde" style="width: 300px" type="primary">
                                <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                            </p>
                        </a-popover>
                    </div>
                    <div slot="seeTime" slot-scope="text">
                        {{$moment(text).format('YYYY.MM.DD HH:mm')}}
                    </div>
                    <div slot="sourceType" slot-scope="text">
                        {{text|sourceTypeVal}}
                    </div>
                    <div slot="createTime" slot-scope="text">
                        {{$moment(text).format('YYYY.MM.DD HH:mm')}}
                    </div>
                    <div slot="latestRecords" slot-scope="text">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    {{text}}
                                </p>
                            </template>
                            <p class="overHidde" style="max-width:250px;" type="primary">
                                {{text}}
                            </p>
                        </a-popover>
                    </div>
                    <div slot="action" slot-scope="text, record" v-if="record.status==1||record.status==2">
                        <a-popover :title="null" trigger="hover" v-if="checkOpts_appointment(record) == true">
                            <template slot="content">
                                <div v-if="record.status==1||record.status==2" @click.stop="openAssignUser(record)" class="action cursor"  v-mark="['mk_source_tenant_xsyy_zp']">指派</div>
                                <div v-if="record.status==1" @click.stop="changePrivate(record)" class="action cursor" v-mark="['mk_source_tenant_xsyy_zwsk']">转入私客</div>
                                <div v-if="record.status==1" @click.stop="changPublic(record)" class="action cursor" v-mark="['mk_source_tenant_xsyy_zwgk']">转入公客</div>
                              <div v-if="record.status==1" @click.stop="goReserve(record,1)" class="action cursor" v-mark="['mk_contract_reserve_tjyd']">预定</div>
                              <div v-if="record.status==1" @click.stop="goSign(record,1)" class="action cursor" v-mark="['mk_contract_tenant_tjht']">签约</div>
                                <div v-if="record.status==1" @click.stop="openAppointmentCancel(record)" class="action cursor" v-mark="['mk_source_tenant_xsyy_qx']">取消</div>
                            </template>
                            <div style="width: 100%;height: 100%">
                                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                            </div>
                        </a-popover>
                    </div>
                </a-table>
                <div class="contFoot" v-show="tableData_appointment.length>0">
                    <a-pagination size="small" :total="pagination_appointment.total" :current="pagination_appointment.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination_appointment.pageSize" showSizeChanger @change="onSizeChange_appointment" @showSizeChange="onShowSizeChange_appointment" />
                </div>
            </div>
        </content-main>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="shareSourceDialog" class="ownModalBorder titDialog" title="共享潜在线索池">
            <share-source :sourceId="sourceId" @cancelShareSource="cancelShareSource" @successShareSource="successShareSource"></share-source>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="closeSourceDialog" class="ownModalBorder titDialog" title="关闭" @cancel="cancelCloseSource">
            <close-source :sourceId="sourceId" @cancelCloseSource="cancelCloseSource" @successCloseSource="successCloseSource"></close-source>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignUserDialog" class="ownModalBorder titDialog" title="指派员工" @cancel="cancelAssignUser">
            <assign-user :sourceId="sourceId" :clueType="clueType" @cancelAssignUser="cancelAssignUser" @successAssignUser="successAssignUser"></assign-user>
        </a-modal>
        <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="1000px" v-model="sourceDetailsDialog" class="ownModalBorder titDialog" title="资源详情" @cancel="isRefreshFun">
            <source-details @refreshinfoFun="refreshinfoFun" ref="sourceDetails" @changeSourceId="changeSourceId" :sourceId="sourceId" @deleteRefrsh="isRefreshFun"></source-details>
        </a-modal>
        <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="804px" v-model="addSourceDialog" class="ownModalBorder titDialog" :title="addSourceTitle" @cancel="cancelSave">
            <add-source :defalutClueType="clueType" :fromType="fromType" :sourceId="sourceId"  @cancelSave="cancelSave" @successSave="successSave"></add-source>
        </a-modal>
        <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="800px" v-model="appointmentDetailsDialog" class="ownModalBorder titDialog" title="预约详情" @cancel="isRefreshFun">
            <appointment-details :appointmentId="appointmentId" @refreshinfoFun="refreshinfoFun"></appointment-details>
        </a-modal>
        <!-- 取消预约 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="cancelAppointmentDialog" class="ownModalBorder titDialog" title="取消预约" @cancel="cancelCancelAppointment">
            <cancel-appointment :infoData="infoData" @cancelCancelAppointment="cancelCancelAppointment" @successCancelAppointment="successCancelAppointment"></cancel-appointment>
        </a-modal>
      <!-- 添加预定弹框 -->
      <a-modal destroyOnClose  centered  :footer="null" :maskClosable="false" width="800px" v-model="addReserveDialog" class="ownModalBorder titDialog" title="添加预定" @cancel="handleCancelres">
        <add-reserve :sourceFul="true" :sourceObj="sourceObj" @saveSuccess="addReserveSuccess" @cancelUp="addReserveDialog = false"></add-reserve>
      </a-modal>
      <!-- 添加合同弹框 -->
      <a-modal destroyOnClose centered :footer="null"  :maskClosable="false" width="1200px" v-model="addContractDialog" class="ownModalBorder titDialog" title="添加合同" @cancel="addContractDialog=false;">
        <add-contract @cancelUp="addContractDialog = false" :sourceFul="true" :sourceObj="sourceObj" @saveSuccess="addReserveSuccess" @cancelSaveTenantContract="addContractDialog=false;"></add-contract>
      </a-modal>
      <!-- 导出框-->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
        <exportExcel @closeThis="exportExcelShow=false" @saveSure="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
      </a-modal>
    </div>
</template>

<script>
    import Vue from 'vue';
    import SearchDialog from '@/components/SearchDialog';
    import TopTitle from '@/components/TopStatus/title';
    import ShareSource from './shareSource';
    import CloseSource from './closeSource';
    import AssignUser from './assignUser';
    import SourceDetails from './sourceDetails';
    import AddSource from './addSource';
    import AppointmentDetails from './appointmentDetails';
    import CancelAppointment  from './cancelAppointment';
    import SkeletonTenant from '../../skeleton/source/tenantPublic';
    import SkeletonTenantPrivate from '../../skeleton/source/tenantPrivate';
    import SkeletonAppointment from '../../skeleton/source/appointment';
    import AddReserve from '../../contract/reserve/addReserve';
    import AddContract from '../../contract/tenant/addTenantContract';
    import exportExcel from '@/components/exportExcel/index';
    import  * as API from '@/api/source';
    export default {
        name: "sourceTenant",
        components: {
            TopTitle,
            SearchDialog,
            ShareSource,
            CloseSource,
            AssignUser,
            SourceDetails,
            AddSource,
            AppointmentDetails,
            CancelAppointment,
            SkeletonTenant,
            SkeletonAppointment,
          SkeletonTenantPrivate,
          AddReserve,
          AddContract,
          exportExcel,
        },
        data() {
          let beforeTwoDays = Vue.prototype.$moment().startOf('day').add(-2, 'days').valueOf();
          let yesterdayTime = Vue.prototype.$moment().startOf('day').add(-1, 'days').valueOf();
          let yesterdayEndTime = Vue.prototype.$moment().endOf('day').add(-1, 'days').valueOf();
            let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
            let currentEndTime = Vue.prototype.$moment().endOf('day').valueOf();
            let tomorrowTime = Vue.prototype.$moment().startOf('day').add(1, 'days').valueOf();
            let nextTime = Vue.prototype.$moment().startOf('day').add(2, 'days').valueOf();
            let currentWeekBeginTime = Vue.prototype.$moment().startOf('week').valueOf();
            let currentWeekEndTime = Vue.prototype.$moment().endOf('week').valueOf();
            let currentMonthBeginTime = Vue.prototype.$moment().startOf('month').valueOf();
            let currentMonthEndTime = Vue.prototype.$moment().endOf('month').valueOf();
            return {
                searchList_customer: [
                    {
                        key: 'fuzzyQueryType',
                        list: [
                            {
                                label: '综合检索',
                                value: 0,
                            },
                            {
                                label: '客户姓名',
                                value: 1
                            },
                            {
                                label: '客户电话',
                                value: 2
                            },
                        ],
                    },
                    {
                        key: 'status',
                        title: '线索状态',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '正常',
                                value: 1
                            },
                            {
                                label: '关闭-我签',
                                value: 2
                            },
                            {
                                label: '关闭-他签',
                                value: 3
                            },
                            {
                                label: '关闭-无效',
                                value: 4
                            }
                        ],
                    },
                  {
                    key: ['createTimeBegin', 'createTimeEnd'],
                    title: '录入时间',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '不限',
                        value: ['', '']
                      },
                      {
                        label: '今天',
                        value: [currentTime, currentEndTime]
                      },
                      {
                        label: '昨天',
                        value: [yesterdayTime, yesterdayEndTime]
                      },
                      {
                        label: '近三天',
                        value: [beforeTwoDays, currentEndTime]
                      },
                      {
                        label: '自定义',
                        value: ['', '']
                      }
                    ],
                  },
                    {
                        key: 'urgencyLevel',
                        title: '紧急程度',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '紧急',
                                value: 1
                            },
                            {
                                label: '一般',
                                value: 2
                            },
                            {
                                label: '暂缓',
                                value: 3
                            },
                            {
                                label: '更久',
                                value: 4
                            }
                        ],
                    },
                    {
                        key: 'demandType',
                        title: '需求户型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '整租1室',
                                value: 1
                            },
                            {
                                label: '整租2室',
                                value: 2
                            },
                            {
                                label: '整租3室',
                                value: 3
                            },
                            {
                                label: '合租主卧',
                                value: 11
                            },
                            {
                                label: '合租次卧',
                                value: 12
                            },
                            {
                                label: '床位',
                                value: 21
                            }
                        ],
                    },
                    {
                        key: 'money',
                        title: '可接受租金范围',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '≤1000元',
                                value: 1
                            },
                            {
                                label: '1000-1500元',
                                value: 2
                            },
                            {
                                label: '1500-2000元',
                                value: 3
                            },
                            {
                                label: '2000-3000元',
                                value: 4
                            },
                            {
                                label: '3000-5000元',
                                value: 5
                            },
                            {
                                label: '5000-8000元',
                                value: 6
                            },
                            {
                                label: '＞8000元',
                                value: 7
                            }
                        ],
                    },
                    {
                        key: 'leasePeriod',
                        title: '预计入住周期',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '一个月',
                                value: 1
                            },
                            {
                                label: '三个月',
                                value: 2
                            },
                            {
                                label: '半年',
                                value: 3
                            },
                            {
                                label: '一年',
                                value: 4
                            },
                            {
                                label: '一年以上',
                                value: 5
                            },
                        ],
                    },
                    {
                        key: 'sourceChannelId',
                        title: '客户来源',
                        currentActiveIndex: 0,
                        list: [],
                    },
                ],
                searchList_appointment: [
                    {
                        key: 'fuzzyQueryType',
                        list: [
                            {
                                label: '综合检索',
                                value: 0,
                            },
                            {
                                label: '客户姓名',
                                value: 1
                            },
                            {
                                label: '客户电话',
                                value: 2
                            },
                            {
                                label: '房源编号',
                                value: 3
                            },
                            {
                                label: '房源地址',
                                value: 4
                            },
                            {
                                label: '项目名称',
                                value: 5
                            },
                            {
                                label: '门牌号',
                                value: 6
                            },
                        ],
                    },
                    {
                        key: 'status',
                        title: '状态',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '待处理',
                                value: 1
                            },
                            {
                                label: '已处理',
                                value: 2
                            },
                            {
                                label: '已取消',
                                value: 3
                            },
                        ],
                    },
                    {
                        key: 'houseType',
                        title: '房源类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '整租',
                                value: 1
                            },
                            {
                                label: '合租',
                                value: 2
                            },
                            {
                                label: '独栋',
                                value: 3
                            },
                        ],
                    },
                    {
                        key: 'sourceType',
                        title: '来源',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '官网',
                                value: 1
                            },
                            {
                                label: '微信小程序',
                                value: 2
                            },
                            {
                                label: '微信公众号',
                                value: 3
                            },
                            {
                                label: '租客APP',
                                value: 4
                            },
                            {
                                label: '其他',
                                value: 5
                            },
                        ],
                    },
                    {
                        key: ['seeTimeBegin', 'seeTimeEnd'],
                        title: '期望带看时间',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '今天',
                                value: [currentTime, currentTime]
                            },
                            {
                                label: '明天',
                                value: [tomorrowTime, tomorrowTime]
                            },
                            {
                                label: '后天',
                                value: [nextTime, nextTime]
                            },
                            {
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                    },
                    {
                    key: ['createTimeBegin', ' createTimeEnd'],
                    title: '提交时间',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '不限',
                        value: ['', '']
                      },
                      {
                        label: '今天',
                        value: [currentTime, currentEndTime]
                      },
                      {
                        label: '本周',
                        value: [currentWeekBeginTime, currentWeekEndTime]
                      },
                      {
                        label: '本月',
                        value: [currentMonthBeginTime, currentMonthEndTime]
                      },
                      {
                        label: '自定义',
                        value: ['', '']
                      }
                    ],
                  },
                ],
                placement: 'right',  //抽屉搜索框位置
              tableColumns_customer1: [
                {
                  title: '序号',
                  dataIndex: 'num',
                  key: 'num',
                  align: 'center',
                  width: '50px',
                  customCell:() =>{
                    return {
                      on:{
                        click:()=>{
                          event.stopPropagation();
                        }
                      }
                    }
                  },
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  align: 'left',
                  scopedSlots: { customRender: 'status' },
                  width: '7.5%',
                },
                {
                  title: '客户姓名',
                  dataIndex: 'name',
                  key: 'name',
                  scopedSlots: { customRender: 'name' },
                  align: 'left',
                },
                {
                  title: '客户电话',
                  dataIndex: 'phone',
                  key: 'phone',
                  align: 'left',
                },
                {
                  title: '意向租房位置',
                  dataIndex: 'locationInfo',
                  key: 'locationInfo',
                  scopedSlots: { customRender: 'locationInfo' },
                  align: 'left',
                  width: '12%',
                },
                {
                  title: '需求户型',
                  key: 'demandTypeStr',
                  dataIndex: 'demandTypeStr',
                  scopedSlots: { customRender: 'demandTypeStr' },
                  align: 'left',
                },
                {
                  title: '可接受价格范围',
                  key: 'maxMoney',
                  dataIndex: 'maxMoney',
                  align: 'left',
                  scopedSlots: { customRender: 'maxMoney' },
                },
                {
                  title: '预计入住周期',
                  key: 'leasePeriod',
                  dataIndex: 'leasePeriod',
                  scopedSlots: { customRender: 'leasePeriod' },
                  align: 'left',
                },
                {
                  title: '跟进次数/首次跟进时长',
                  key: 'firstFollowTime',
                  dataIndex: 'firstFollowTime',
                  scopedSlots: { customRender: 'firstFollowTime' },
                  align: 'left',
                },
                {
                  title: '最新跟进记录',
                  key: 'latestFollowUp',
                  dataIndex: 'latestFollowUp',
                  scopedSlots: { customRender: 'latestFollowUp' },
                  align: 'left',
                  width: '15%',
                  ellipsis:true,
                },
                {
                  title: '操作',
                  key: 'action',
                  scopedSlots: { customRender: 'action' },
                  align: 'center',
                  width: '80px',
                  customCell:() =>{
                    return {
                      on:{
                        click:()=>{
                          event.stopPropagation();
                        }
                      }
                    }
                  },
                },
              ],
                tableColumns_customer2: [
                    {
                        title: '序号',
                        dataIndex: 'num',
                        key: 'num',
                        align: 'center',
                        width: '50px',
                        customCell:() =>{
                            return {
                                on:{
                                    click:()=>{
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        align: 'left',
                        scopedSlots: { customRender: 'status' },
                        width: '7.5%',
                    },
                    {
                        title: '客户姓名',
                        dataIndex: 'name',
                        key: 'name',
                        scopedSlots: { customRender: 'name' },
                        align: 'left',
                    },
                    {
                        title: '客户电话',
                        dataIndex: 'phone',
                        key: 'phone',
                        align: 'left',
                    },
                    {
                        title: '意向租房位置',
                        dataIndex: 'locationInfo',
                        key: 'locationInfo',
                        scopedSlots: { customRender: 'locationInfo' },
                        align: 'left',
                        width: '15%',
                    },
                    {
                        title: '需求户型',
                        key: 'demandTypeStr',
                        dataIndex: 'demandTypeStr',
                        scopedSlots: { customRender: 'demandTypeStr' },
                        align: 'left',
                    },
                    {
                        title: '可接受价格范围',
                        key: 'maxMoney',
                        dataIndex: 'maxMoney',
                        align: 'left',
                        scopedSlots: { customRender: 'maxMoney' },
                    },
                    {
                        title: '预计入住周期',
                        key: 'leasePeriod',
                        dataIndex: 'leasePeriod',
                        scopedSlots: { customRender: 'leasePeriod' },
                        align: 'left',
                    },
                    {
                        title: '最新跟进记录',
                        key: 'latestFollowUp',
                        dataIndex: 'latestFollowUp',
                        scopedSlots: { customRender: 'latestFollowUp' },
                        align: 'left',
                        width: '15%',
                      ellipsis:true,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: { customRender: 'action' },
                        align: 'center',
                        width: '80px',
                        customCell:() =>{
                            return {
                                on:{
                                    click:()=>{
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    },
                ],
                tableData_customer: [],
                tableColumns_appointment:[
                    {
                        title: '序号',
                        dataIndex: 'num',
                        key: 'num',
                        align: 'center',
                        width: '50px',
                        customCell:() =>{
                            return {
                                on:{
                                    click:()=>{
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        align: 'left',
                        scopedSlots: { customRender: 'status' },
                        width: '6%',
                    },
                    {
                        title: '客户姓名',
                        dataIndex: 'name',
                        key: 'name',
                        scopedSlots: { customRender: 'name' },
                        align: 'left',
                    },
                    {
                        title: '客户电话',
                        dataIndex: 'phone',
                        key: 'phone',
                        align: 'left',
                    },
                    {
                        title: '预约看房地址',
                        dataIndex: 'fullAddress',
                        key: 'fullAddress',
                        scopedSlots: { customRender: 'fullAddress' },
                        align: 'left',
                        width: '20%',
                    },
                    {
                        title: '期望看房时间',
                        key: 'seeTime',
                        dataIndex: 'seeTime',
                        scopedSlots: { customRender: 'seeTime' },
                        align: 'left',
                    },
                    {
                        title: '来源',
                        key: 'sourceName',
                        dataIndex: 'sourceName',
                        align: 'left',
                    },
                    {
                        title: '申请时间',
                        key: 'createTime',
                        dataIndex: 'createTime',
                        scopedSlots: { customRender: 'createTime' },
                        align: 'left',
                    },
                    {
                        title: '处理结果',
                        key: 'latestRecords',
                        dataIndex: 'latestRecords',
                        scopedSlots: { customRender: 'latestRecords' },
                        align: 'left',
                        width: '20%',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: { customRender: 'action' },
                        align: 'center',
                        width: '80px',
                        customCell:() =>{
                            return {
                                on:{
                                    click:()=>{
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    },
                ],
                tableData_appointment: [],
                pagination_customer: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                pagination_appointment: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                statusData: [
                    {
                        title: '私客',
                        status: 1,
                        mark: ['mk_source_tenant_ck']
                    },
                    {
                        title: '公客',
                        status: 2,
                        mark: ['mk_source_tenant_gk_ck']
                    },
                    {
                        title: '线上预约',
                        status: 3,
                        mark: ['mk_source_tenant_xsyy_ck']
                    },
                ],
                sendData_customer: {
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyKeyword: '',               // 模糊匹配关键词
                    fuzzyQueryType: 0,              //模糊查询类型【0、全部，1、客户姓名，2、客户电话】
                    sort: '',                       // 排序字段
                    updateTime: '',                 // 修改时间
                    status:'',                      //线索状态【1、正常；2、关闭-我签；3、关闭-他签；4、关闭-无效】
                    urgencyLevel:'',                //紧急程度【1、紧急（7天以内），2、一般（15天以内），3、暂缓（30天以内），4、更久（30天以上）】
                    demandType:'',                  //需求户型【1、整租1室，2、整租2室，3、整租3室，11、合租主卧，12、合租次卧，21、床位】
                    moneyBegin:'',                  //可接受租金-最小值
                    moneyEnd:'',                    //可接受租金-最大值
                    leasePeriod:'',                 //预计入住周期
                    sourceChannelId:'',             //客户来源
                  assigneeDeptId:'',
                  assigneeId:'',
                  createrDeptId:'',
                  createrId:'',
                  createTimeBegin:'',
                  createTimeEnd:'',
                },
                sendData_appointment:{
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyKeyword: '',               // 模糊匹配关键词
                    fuzzyQueryType: 0,              //模糊查询类型【0、全部，1、客户姓名，2、客户电话】
                    sort: '',                       // 排序字段
                    updateTime: '',                 // 修改时间
                    createTimeBegin:'',
                    createTimeEnd:'',
                },
                sourceId: '',                       //详情查看的资源id
                clueType:2,                     //租客：1：私客，2：公客；3：线上预约
                searchVisible: false,
                shareSourceDialog:false,        //显示共享线索池
                closeSourceDialog:false,        //是否显示关闭线索池
                assignUserDialog:false,         //显示指派员工
                sourceDetailsDialog:false,      //显示租客（公、私）详情
                addSourceDialog:false,          //添加线索池
                addSourceTitle:'添加潜在租客线索',               //添加线索池标题
                activeIndex: 1,
                fromType:1,                     //1、添加；2、修改；3、激活
                spinLoading:true,
                appointmentDetailsDialog:false,      //显示预约详情
                appointmentId:'',                    //预约详情id
                cancelAppointmentDialog:false,
                infoData:{},
                isRefresh:false,
              addReserveDialog:false,
              sourceObj:{},
              addContractDialog:false,
              exportExcelShow:false,
              exportUrl: '/crm/renter_clue/list_export',
              exportData:{},
            }
        },
        created() {
        },
      mounted() {
        this.clueType = 3;
        this.activeIndex = 2;
        JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
          if (value.mark == "mk_source_tenant_ck"||value.mark == "mk_source_tenant_gk_ck"||value.mark == "mk_source_tenant_xsyy_ck"){
            let current = value.mark == "mk_source_tenant_xsyy_ck"?3:value.mark == "mk_source_tenant_gk_ck"?2:1;
            this.clueType = this.clueType>current?current:this.clueType;
            this.activeIndex = this.clueType -1;
          }
        });
        //判断是否来自工作台
        let initString = '';

        if(this.$route.params.search){
          this.clueType = 3
          switch (this.$route.params.search) {
            case 'pending':
              initString = 'pending';
              break;
            case 'todayQuantity':
              initString = 'todayQuantity';
              break;
            case 'weekQuantity':
              initString = 'weekQuantity';
              break;
            case 'monthQuantity':
              initString = 'monthQuantity';
              break;
          }
        }
        if(this.clueType==1||this.clueType==2){
          this.getSourceChannel();
        }
        if(this.clueType==3){
          this.activeIndex = 2;
        }
        if(initString=='pending') {
          this.$refs.searchDialog_appointment.searchList[1].currentActiveIndex = 1
          this.$refs.searchDialog_appointment.searchDataArr.push({
            title: this.$refs.searchDialog_appointment.searchList[1].title,
            val: this.$refs.searchDialog_appointment.searchList[1].list[1].label,
          })
          this.$refs.searchDialog_appointment.searchData.status = 1;
          this.$refs.searchDialog_appointment.confirm();
        }
       else if(initString=='todayQuantity'){
          this.$refs.searchDialog_appointment.searchList[5].currentActiveIndex = 1;
          this.$refs.searchDialog_appointment.searchDataArr.push({
            title: this.$refs.searchDialog_appointment.searchList[5].title,
            val: this.$refs.searchDialog_appointment.searchList[5].list[1].label,
          })
          this.$refs.searchDialog_appointment.searchData.createTimeBegin = Vue.prototype.$moment().startOf('day').valueOf();
          this.$refs.searchDialog_appointment.searchData.createTimeEnd = Vue.prototype.$moment().endOf('day').valueOf();
          this.$refs.searchDialog_appointment.confirm();
        }
        else if(initString=='weekQuantity'){
          this.$refs.searchDialog_appointment.searchList[5].currentActiveIndex = 2;
          this.$refs.searchDialog_appointment.searchDataArr.push({
            title: this.$refs.searchDialog_appointment.searchList[5].title,
            val: this.$refs.searchDialog_appointment.searchList[5].list[2].label,
          })
          this.$refs.searchDialog_appointment.searchData.createTimeBegin = Vue.prototype.$moment().startOf('week').valueOf();
          this.$refs.searchDialog_appointment.searchData.createTimeEnd = Vue.prototype.$moment().endOf('week').valueOf();
          this.$refs.searchDialog_appointment.confirm();
        }
        else if(initString=='monthQuantity'){
          this.$refs.searchDialog_appointment.searchList[5].currentActiveIndex = 3;
          this.$refs.searchDialog_appointment.searchDataArr.push({
            title: this.$refs.searchDialog_appointment.searchList[5].title,
            val: this.$refs.searchDialog_appointment.searchList[5].list[3].label,
          })
          this.$refs.searchDialog_appointment.searchData.createTimeBegin = Vue.prototype.$moment().startOf('month').valueOf();
          this.$refs.searchDialog_appointment.searchData.createTimeEnd = Vue.prototype.$moment().endOf('month').valueOf();
          this.$refs.searchDialog_appointment.confirm();
        }
        else{
          this.initData();
        }
      },
      methods: {
          // 导出
          exportExcel() {
            if(this.clueType ==2 ){
              this.exportUrl = '/crm/renter_clue/list_pub_export';
            }
            else{
              this.exportUrl = '/crm/renter_clue/list_export';
            }
            this.exportData = Object.assign({}, this.sendData_customer);
            this.exportExcelShow = true;
          },
            checkOpts_customer(record){
              // 1 编辑
              // 2 抢单
              // 3 指派
              // 4 转入公客
              // 5 关闭
              // 6 预定
              // 7 签约
              // 8 共享
              // 9 激活
              // 10 删除
              // 11 跟进
              if(!this.permissions||this.permissions.length==0){
                this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
              }
              let markArr = [];
              let btnArr = [];
              if(record.status==1){
                if(this.clueType==1){
                  markArr.push('mk_source_tenant_gj');
                  markArr.push('mk_source_tenant_bj');
                  markArr.push('mk_source_tenant_zp');
                  markArr.push('mk_source_tenant_gb');
                  markArr.push('mk_source_tenant_zwgk');
                  markArr.push('mk_source_tenant_gxzy');
                }
                else{
                  markArr.push('mk_source_tenant_gk_gj');
                  markArr.push('mk_source_tenant_gk_bj');
                  markArr.push('mk_source_tenant_gk_qd');
                  markArr.push('mk_source_tenant_gk_zp');
                  markArr.push('mk_source_tenant_gk_gb');
                  markArr.push('mk_source_tenant_gk_gxzy');
                }
                markArr.push('mk_contract_reserve_tjyd');
                markArr.push('mk_contract_tenant_tjht');
              }
              else if(record.status==2||record.status==3){
                if(this.clueType==1){
                  markArr.push('mk_source_tenant_cxjh');
                }
                else{
                  markArr.push('mk_source_tenant_gk_cxjh');
                }
              }
              else if(record.status==4){
                if(this.clueType==1){
                  markArr.push('mk_source_tenant_cxjh');
                  markArr.push('mk_source_tenant_sc');
                }
                else{
                  markArr.push('mk_source_tenant_gk_cxjh');
                  markArr.push('mk_source_tenant_gk_sc');
                }
              }

              //判断资源权限
              markArr.forEach(ele => {
                this.permissions.some(function(value){
                  if (ele == value.mark){
                    if(value.mark == 'mk_source_tenant_bj'||value.mark == 'mk_source_tenant_gk_bj'){
                      btnArr.push('1');
                    }else if(value.mark == 'mk_source_tenant_gk_qd'){
                      btnArr.push('2');
                    }else if(value.mark == 'mk_source_tenant_zp'||value.mark == 'mk_source_tenant_gk_zp'){
                      btnArr.push('3');
                    }else if(value.mark == 'mk_source_tenant_zwgk'){
                      btnArr.push('4');
                    }else if(value.mark == 'mk_source_tenant_gb'||value.mark == 'mk_source_tenant_gk_gb'){
                      btnArr.push('5');
                    }else if(value.mark == 'mk_contract_reserve_tjyd'){
                      btnArr.push('6');
                    }else if(value.mark == 'mk_contract_tenant_tjht'){
                      btnArr.push('7');
                    }else if(value.mark == 'mk_source_tenant_gxzy'||value.mark == 'mk_source_tenant_gk_gxzy'){
                      btnArr.push('8');
                    }else if(value.mark == 'mk_source_tenant_cxjh'||value.mark == 'mk_source_tenant_gk_cxjh'){
                      btnArr.push('9');
                    }else if(value.mark == 'mk_source_tenant_sc'||value.mark == 'mk_source_tenant_gk_sc'){
                      btnArr.push('10');
                    }else if(value.mark == 'mk_source_tenant_gj'||value.mark == 'mk_source_tenant_gk_gj'){
                      btnArr.push('11');
                    }
                  }
                });
              });
              record.btnArr = btnArr;

              if(btnArr.length > 0){
                return true;
              }
              return false;
            },
            checkOpts_appointment(record){
                let markArr = []
                let flag = false;
                if (record.status==1) {
                    markArr.push('mk_contract_tenant_tjht','mk_contract_reserve_tjyd','mk_source_tenant_xsyy_zp','mk_source_tenant_xsyy_zwgk','mk_source_tenant_xsyy_zwsk','mk_source_tenant_xsyy_qx');
                }
                if(record.status==2) {
                    markArr.push('mk_source_tenant_xsyy_zp');
                }
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if (markArr.includes(value.mark)){
                        flag = true
                    }
                })
                return flag
            },
            getSourceChannel(){
                API.getSourceChannel().then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        let resData= res.data;
                        let searchListList = [];
                        let objTemp1 = {};
                        objTemp1.label = '全部';
                        objTemp1.value = null;
                        searchListList.push(objTemp1);
                        for (let i = 0; i < resData.length; i++) {
                            let objTemp = {};
                            objTemp.label = resData[i].name;
                            objTemp.value = resData[i].id;
                            searchListList.push(objTemp);
                        }
                        this.searchList_customer[7].list = searchListList;
                    }
                });
            },
          addReserveSuccess(){
            this.addContractDialog = false;
            this.addReserveDialog = false;
            setTimeout(()=>{
              this.initData();
            },500);
          },
          handleCancelres(){
              this.addReserveDialog = false;
          },
            cancelCancelAppointment(){
                this.cancelAppointmentDialog = false;
            },
            successCancelAppointment(){
                //来自作废成功
                this.cancelAppointmentDialog = false;
                this.initData();
            },
            initData() {
                this.getData();
            },
            openSearchDrawer() {
                //弹出搜索框
                this.searchVisible = true;
            },
            closeSearchDrawer() {
                //关闭搜索框
                this.searchVisible = false;
            },
            assetsFormData_customer(data) {
                this.searchVisible = false;
                this.sendData_customer.fuzzyQueryType = data.fuzzyQueryType;
                this.sendData_customer.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData_customer.status = data.status;
              this.sendData_customer.assigneeDeptId = data.deptId;
              this.sendData_customer.assigneeId = data.maintainerId;
              this.sendData_customer.createrDeptId = data.createrDeptId;
              this.sendData_customer.createrId = data.createrId;
                this.sendData_customer.urgencyLevel = data.urgencyLevel;
                this.sendData_customer.demandType = data.demandType;
                if(data.money){
                    if(data.money == 1){
                        this.sendData_customer.moneyEnd = 100000;
                    }
                    else if(data.money == 2){
                        this.sendData_customer.moneyBegin = 100000;
                        this.sendData_customer.moneyEnd = 150000;
                    }
                    else if(data.money == 3){
                        this.sendData_customer.moneyBegin = 150000;
                        this.sendData_customer.moneyEnd = 200000;
                    }
                    else if(data.money == 4){
                        this.sendData_customer.moneyBegin = 200000;
                        this.sendData_customer.moneyEnd = 300000;
                    }
                    else if(data.money == 5){
                        this.sendData_customer.moneyBegin = 300000;
                        this.sendData_customer.moneyEnd = 500000;
                    }
                    else if(data.money == 6){
                        this.sendData_customer.moneyBegin = 500000;
                        this.sendData_customer.moneyEnd = 800000;
                    }
                    else if(data.money == 7){
                        this.sendData_customer.moneyBegin = 800000;
                    }
                }else {
                    this.sendData_customer.moneyBegin = '';
                    this.sendData_customer.moneyEnd = '';
                }
                this.sendData_customer.leasePeriod = data.leasePeriod;
                this.sendData_customer.sourceChannelId = data.sourceChannelId;
                this.sendData_customer.createTimeBegin = data.createTimeBegin;
                this.sendData_customer.createTimeEnd= data.createTimeEnd;
                this.sendData_customer.current = 1;
                this.pagination_customer.current = 1;
                this.initData();
            },
            assetsFormData_appointment(data) {
                this.searchVisible = false;
                this.sendData_appointment.fuzzyQueryType = data.fuzzyQueryType;
                this.sendData_appointment.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData_appointment.current = 1;
                this.sendData_appointment.status = data.status;
                this.sendData_appointment.houseType = data.houseType;
                this.sendData_appointment.seeTimeBegin = data.seeTimeBegin;
                this.sendData_appointment.seeTimeEnd = data.seeTimeEnd;
                this.sendData_appointment.createTimeBegin = data.createTimeBegin;
                this.sendData_appointment.createTimeEnd = data.createTimeEnd;
                this.sendData_appointment.sourceType = data.sourceType;
                this.pagination_customer.current = 1;
                this.initData();
            },
            getData() {
                this.spinLoading = true;
                if(this.clueType==1||this.clueType==2){
                    this.sendData_customer.clueType = this.clueType;
                    API.renterClueList(this.sendData_customer).then(res => {
                        if (res&&res.code === "200") {
                            this.tableData_customer = res.data.records;
                            this.tableData_customer.forEach(function(element, index) {
                                element.num = index + 1;
                            }, this);
                            this.pagination_customer.total = res.data.total;
                        }
                        this.spinLoading = false;
                    })
                }
                else if(this.clueType==3){
                    API.reservationList(this.sendData_appointment).then(res => {
                        if (res&&res.code === "200") {
                            this.tableData_appointment = res.data.records;
                            this.tableData_appointment.forEach(function(element, index) {
                                element.num = index + 1;
                            }, this);
                            this.pagination_appointment.total = res.data.total;
                        }
                        this.spinLoading = false;
                    })
                }
            },
            openDetail_customer(record) {
                return {
                    on: {
                        click: () => {
                            this.sourceId = record.id;
                            this.sourceDetailsDialog = true;
                        }
                    }
                }
            },
            openDetail_appointment(record) {
                return {
                    on: {
                        click: () => {
                            this.appointmentId = record.id;
                            this.appointmentDetailsDialog = true;
                        }
                    }
                }
            },
            openDetailFocusFollow(record){
                this.sourceId = record.id;
                this.sourceDetailsDialog = true;
                //聚焦添加跟进
                setTimeout(()=>{
                    this.$refs.sourceDetails.openAddFollowDetail();
                },500);
            },
            changeStatus(option) {
                this.$refs.searchDialog_customer.resetData();
                this.$refs.searchDialog_appointment.resetData();
                this.clueType = option.status;
                //用于控制放在一起兼容bug
                this.sendData_customer.current = 1;
                this.sendData_customer.size = 10;
                this.pagination_customer.pageSize = 10;
                this.pagination_customer.current = 1;
                this.sendData_appointment.current = 1;
                this.sendData_appointment.size = 10;
                this.pagination_appointment.pageSize = 10;
                this.pagination_appointment.current = 1;
                this.getData();
            },
            addSource(flag,record) {
                this.fromType = flag;
                if(flag==1){
                    this.sourceId = '';
                    this.addSourceTitle = '添加潜在租客线索';
                }
                else if(flag==2){
                    this.sourceId = record.id;
                    this.addSourceTitle = '编辑潜在租客线索';
                }
                else if(flag==3){
                    this.sourceId = record.id;
                    this.addSourceTitle = '激活潜在租客线索';
                }
                this.addSourceDialog = true;
            },
            changePrivate(record){
                let _this = this;
                if(this.clueType==1||this.clueType==2){
                    this.$modal.confirm({
                        title: '确定要将潜在租客线索 「 ' + record.name+'/'+record.phone + ' 」 抢至自己的私客池吗？',
                        content: '',
                        width:"433px",
                        height:"192px",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            API.renterClueGrab({id:record.id}).then(res=>{
                                if (res.code === '200') {
                                    _this.$message.success('抢单成功');
                                    _this.initData();
                                } else {
                                    _this.$message.success('抢单失败');
                                    _this.initData();
                                }
                            })
                        },
                        onCancel() {
                        },
                    });
                }
                else if(this.clueType==3){
                    this.$modal.confirm({
                        title: '确定要将客户 「' + record.name+'/'+record.phone + '」 转入自己的私客池吗？',
                        content: '转入后，会在您的私客池新增一条记录',
                        width:"433px",
                        height:"192px",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            API.turnPrivateClue({id:record.id}).then(res=>{
                                if (res.code === '200') {
                                    _this.$message.success('转入私客成功');
                                    _this.initData();
                                } else {
                                    _this.$message.success('转入私客失败');
                                    _this.initData();
                                }
                            })
                        },
                        onCancel() {
                        },
                    });
                }
            },
            changPublic(record){
                let _this = this;
                if(this.clueType==1||this.clueType==2) {
                    this.$modal.confirm({
                        title: '确定要将潜在租客线索 「 ' + record.name + '/' + record.phone + ' 」 转入公客池吗？',
                        content: '转入后，公司所有人员都可查看到',
                        width: "433px",
                        height: "192px",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            API.renterClueTurnPub({id:record.id}).then(res => {
                                if (res.code === '200') {
                                    _this.$message.success('转公客成功');
                                    _this.initData();
                                } else {
                                    _this.$message.success('转公客失败');
                                    _this.initData();
                                }
                            })
                        },
                        onCancel() {
                        },
                    });
                }
                else if(this.clueType==3){
                    this.$modal.confirm({
                        title: '确定要将客户 「' + record.name+'/'+record.phone + '」 转入公客池吗？',
                        content: '转入后，将在公客池新增一条记录',
                        width:"433px",
                        height:"192px",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            API.turnPubClue({id:record.id}).then(res=>{
                                if (res.code === '200') {
                                    _this.$message.success('转入公客成功');
                                    _this.initData();
                                } else {
                                    _this.$message.success('转入公客失败');
                                    _this.initData();
                                }
                            })
                        },
                        onCancel() {
                        },
                    });
                }
            },
            cancelSave(){
                this.addSourceDialog = false;
            },
            successSave(){
                this.addSourceDialog = false;
                this.initData();
            },
            cancelDetails(){
                this.sourceDetailsDialog = false;
                this.appointmentDetailsDialog = false;
                this.initData();
            },
            refreshinfoFun(res){  //详情有改变的操作  就改变状态
                if(res){
                   this.isRefresh = res
                }  
            },
            changeSourceId(sourceId){
                if(sourceId){
                    this.sourceId = sourceId;
                }
            },
            isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
                if(this.isRefresh){
                    this.initData();
                }
                this.sourceDetailsDialog = false;
                this.appointmentDetailsDialog = false;
                this.isRefresh = false
            },
            openAppointmentCancel(record){
                this.infoData = record;
                this.cancelAppointmentDialog = true;
            },
            cancelShareSource(){
                this.shareSourceDialog = false;
            },
            successShareSource(){
                this.shareSourceDialog = false;
                this.initData();
            },
            cancelCloseSource(){
                this.closeSourceDialog = false;
            },
            successCloseSource(){
                this.closeSourceDialog = false;
                this.initData();
            },
            cancelAssignUser(){
                this.assignUserDialog = false;
            },
            successAssignUser(){
                this.assignUserDialog = false;
                this.initData();
            },
          goReserve(record,val){
            this.addReserveDialog = true;
            if(val==1){
              this.sourceObj = {
                name:record.name,
                phone:record.phone,
                gender:'',
                leasePeriod:'',
                bizType:val,
                bizId:record.id,
              };
            }
            else{
              this.sourceObj = {
                name:record.name,
                phone:record.originPhone,
                gender:record.gender,
                leasePeriod:record.leasePeriod,
                bizType:val,
                bizId:record.id,
              };
            }
          },
          goSign(record,val){
            this.addContractDialog = true;
            if(val==1){
              this.sourceObj = {
                name:record.name,
                phone:record.phone,
                gender:'',
                leasePeriod:'',
                sourceChannelId:'',
                bizType:val,
                bizId:record.id,
              };
            }
            else{
              this.sourceObj = {
                name:record.name,
                phone:record.originPhone,
                gender:record.gender,
                leasePeriod:record.leasePeriod,
                sourceChannelId:record.sourceChannelId,
                bizType:val,
                bizId:record.id,
              };
            }
          },
            openAssignUser(record){
                this.sourceId = record.id;
                this.assignUserDialog = true;
            },
            openCloseSource(record){
                this.sourceId = record.id;
                this.closeSourceDialog = true;
            },
            openShareSource(record){
                this.sourceId = record.id;
                this.shareSourceDialog = true;
            },
            onSizeChange_customer(current) {
                this.sendData_customer.current = current;
                this.pagination_customer.current = current;
                this.initData();
            },
            onShowSizeChange_customer(current, pageSize) {
                this.sendData_customer.current = current;
                this.sendData_customer.size = pageSize;
                this.pagination_customer.pageSize = pageSize;
                this.initData();
            },
            onSizeChange_appointment(current) {
                this.sendData_appointment.current = current;
                this.pagination_appointment.current = current;
                this.initData();
            },
            onShowSizeChange_appointment(current, pageSize) {
                this.sendData_appointment.current = current;
                this.sendData_appointment.size = pageSize;
                this.pagination_appointment.pageSize = pageSize;
                this.initData();
            },
            deleteChild(data) {
                let _this = this;
                let id = data.id
                this.$modal.confirm({
                    title: '确定要删除潜在租客线索 「' + data.name + '/' + data.phone + '」 的信息吗？',
                    content: '删除后将不可恢复',
                    okText: '确定',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                    onOk() {
                        API.renterClueRemove({id:id}).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                _this.$message.success('操作成功！');
                                setTimeout(() => {
                                    _this.initData();
                                }, 500)

                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            
        },
        filters: {
            moneySpecialVal(record){
                let max = record.maxMoney/100;
                let min = record.minMoney/100;
                if(min){
                    if(max){
                        return min+'-'+max+'元';
                    }else{
                        return min+'元';
                    }
                }else{
                    if(max){
                        return max+'元';
                    }else{
                        return '-';
                    }
                }
            },
            blankVal(val){
                if(!val){
                    return '-';
                }else{
                    return  val;
                }
            },
            timeVal(val){
                if(val=='几秒前'){
                    return '刚刚';
                } else{
                    return  val;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .sourceBox {
        & /deep/ .exportExcel-box{
        width:24px;
        height: 24px;
        margin-left:6px;
        margin-top: 4px;
        & /deep/  svg{
          width:24px;
          height: 24px;
        }
      }
        .content-top {
            min-width: 1300px; // overflow: hidden;
        }
        .content-main {
            padding: 0;
            & /deep/ .content {
                // overflow:visible;
                padding: 0;
                margin: 20px;
            }
        }
        .search-box {
            &/deep/ .ant-input {
                border-radius: 50px;
            }
        }
        .userManageOperate {
            margin-right: 14px;
            float: right;
            .userSearch {
                float: left;
                margin-right: 15px;
            }
        }
        .table {
            min-width: 1200px;
            .action:hover {
                background-color: @themeBgColor;
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
                    background: rgba(255, 160, 54, 1);
                }
            }
            .fontProhibit {
                .prohibitBg0 {
                    background: #FB4246;
                }
                .prohibitBg1 {
                    background: #0A87F8;
                }
                .prohibitBg2 {
                    background: #777777;
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
            .paddingStyle{
                padding: 3px;
            }
            .urgencyLevel1{
                width:36px;
                height:20px;
                border-radius:2px;
                border:0.5px solid rgba(251,66,70,1);
                color: #FB4246;
                font-size: 12px;
                text-align: center;
            }
            .urgencyLevel2{
                width:36px;
                height:20px;
                border-radius:2px;
                border:0.5px solid rgba(255,160,54,1);
                color: #FFA036;
                font-size: 12px;
                text-align: center;
            }
            .urgencyLevel3{
                width:36px;
                height:20px;
                border-radius:2px;
                border:0.5px solid rgba(3,198,131,1);
                color: #03C683;
                font-size: 12px;
                text-align: center;
            }
            .urgencyLevel4{
                width:36px;
                height:20px;
                border-radius:2px;
                border:0.5px solid rgba(10,135,248,1);
                color: #0A87F8;
                font-size: 12px;
                text-align: center;
            }
            .time{
                height:20px;
                border-radius:2px;
                color: #0A87F8;
                background-color: #f0f8ff;
                font-size: 12px;
                text-align: center;
                padding: 5px 5px;
            }
            .houseAddress{
                height:20px;
                border-radius:2px;
                color: #0A87F8;
                background-color: #f0f8ff;
                font-size: 12px;
                text-align: center;
                padding: 5px 5px;
            }
        }
        .contFoot {
            margin-top: 15px;
            width: 100%;
            height: 56px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 20px; // position: absolute;
            // bottom: 0px;
            // right: 0;
            background-color: #fff;
            & /deep/ .ant-pagination {
                margin-right: 11px;
            }
        }
        & /deep/.ant-table-tbody>tr>td {
            padding: 12px 6px;
            &:not(:first-child) {
                cursor: pointer;
            }
        }
        & /deep/.ant-table-thead > tr > th{
            padding: 12px 6px;
          font-size: 13px;
        }
        .font-span {
            width: 20px;
            display: inline-block;
            font-size: 20px;
        }
        .signType1 {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(10, 135, 248, 1);
            color: rgba(10, 135, 248, 1);
            border-radius: 50%;
            line-height: 18px;
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
        }
        .signType2 {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(3, 198, 131, 1);
            color: rgba(3, 198, 131, 1);
            border-radius: 50%;
            line-height: 18px;
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
        }
        .address-span {
            display: inline-block;
            max-width: 300px;
        }
        .isCertified-font {
            position: absolute;
            color: rgba(251, 66, 70, 0.5);
            z-index: 2;
            top: 5px;
            width: 27px;
            height: 24px;
            left: -18px; //         svg{
            //             height: 100%;
            //             width: 100%;
            //             use{
            // height: 100%;
            //             width: 100%;
            //             }
            //         }
        }
        & /deep/ .ant-popover {
            .ant-popover-inner-content {
                padding: 5px 0;
                text-align: center;
                .action {
                    padding: 8px 10px;
                }
                .action:hover {
                    cursor: pointer;
                    background: rgba(10, 135, 248, 0.1);
                }
            }
        }
    }
</style>
