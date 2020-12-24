<template>
    <!-- 租客合同 -->
    <div class="tenantContractBox">
        <div class="loadingCircle" id="loadingCircle" v-show="spinLoading"></div>
        <div class="add-btn-wrap" @click="addContract()" v-mark="['mk_contract_tenant_tjht']">
            <icon-font type="iconyumengtubiao_tianjia" /> 添加合同
        </div>
        <content-top>
            <div class="status-box f-fl">
                <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            </div>
            <div class="f-fr cursor exportExcel-box" v-mark="['mk_contract_tenant_dc']"><span @click="exportExcel"><icon-font class="f-ftc-blue" type="iconyumengtubiao_xiazai1" /></span></div>
            <div class="search-box f-fr">
                <search-dialog deptTitle="合同维护人" :deptEmpTitleOtherFlag="true" deptPlaceholder="请选择合同维护人或维护人所属部门" resMark="mk_contract_renter" placeholder="房源编号/小区地址/门牌号/项目名称/合同编号/租客姓名/租客电话" :searchList="searchList" @search="assetsFormData"></search-dialog>
            </div>
        </content-top>
        <content-main>
            <skeleton-tenant v-show="spinLoading"></skeleton-tenant>
            <div class="table" v-show="!spinLoading">
                <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                    <div slot="status" slot-scope="status,record">
                        <div v-if="status==1" class="fontNormal clearfix f-fl">
                            <div class="IconRadius normalBg f-fl"></div>
                            <div class="f-fl">
                                <span type="primary" style="color: #111111">待签字</span>
                            </div>
                        </div>
                        <div v-else-if="status==2" class="fontProhibit fontProhibitColor clearfix f-fl">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                            <div class="f-fl">
                                <span type="primary" style="color: #111111">在租中</span>
                                <a-popover v-if="record.isSyncTenant==1">
                                    <template slot="content">
                                        <p style="padding: 8px 18px;">待租客确认</p>
                                    </template>
                                    <span  type="primary" style="margin-left: 3px;" class="signType">确</span>
                                </a-popover>
                            </div>
                        </div>
                        <div v-else-if="status==3" class="fontProhibit fontProhibitColor clearfix f-fl">
                            <div class="prohibitBg3 IconRadius prohibitBg f-fl"></div>
                            <div class="f-fl">
                                <span type="primary" style="color: #111111">即将搬入</span>
                                <a-popover v-if="record.isSyncTenant==1">
                                    <template slot="content">
                                        <p style="padding: 8px 18px;">待租客确认</p>
                                    </template>
                                    <span  type="primary" style="margin-left: 3px;" class="signType">确</span>
                                </a-popover>
                            </div>
                        </div>
                        <div v-else-if="status==4" class="fontProhibit fontProhibitColor clearfix f-fl">
                            <div class="prohibitBg4  IconRadius prohibitBg f-fl"></div>
                            <div class="f-fl">
                                <span type="primary" style="color: #111111">即将搬出</span>
                                <a-popover v-if="record.isSyncTenant==1">
                                    <template slot="content">
                                        <p style="padding: 8px 18px;">待租客确认</p>
                                    </template>
                                    <span  type="primary" style="margin-left: 3px;" class="signType">确</span>
                                </a-popover>
                            </div>
                        </div>
                        <div v-else-if="status==5" class="fontProhibit fontProhibitColor clearfix f-fl">
                            <div class="prohibitBg5 IconRadius prohibitBg f-fl"></div>
                            <div class="f-fl">
                                <span type="primary" style="color: #111111">已到期</span>
                                <a-popover v-if="record.isSyncTenant==1">
                                    <template slot="content">
                                        <p style="padding: 8px 18px;">待租客确认</p>
                                    </template>
                                    <span  type="primary" style="margin-left: 3px;" class="signType">确</span>
                                </a-popover>
                            </div>
                        </div>
                        <div v-else-if="status==6" class="fontProhibit fontProhibitColor clearfix f-fl">
                            <div class="IconRadius prohibitBg6 prohibitBg f-fl"></div>
                            <div class="f-fl">
                                <span type="primary" style="color: #111111">正常退</span>
                            </div>
                        </div>
                        <div v-else-if="status==7" class="fontProhibit fontProhibitColor clearfix f-fl">
                            <div class="IconRadius prohibitBg6 prohibitBg f-fl"></div>
                            <div class="f-fl">
                                <span type="primary" style="color: #111111">非正常退</span>
                            </div>
                        </div>
                        <div v-else-if="status==8" class="fontProhibit fontProhibitColor clearfix f-fl">
                            <div class="IconRadius prohibitBg6 prohibitBg f-fl"></div>
                            <div class="f-fl">
                                <span type="primary" style="color: #111111">已作废</span>
                            </div>
                        </div>
                        <div v-else-if="status==9" class="fontProhibit fontProhibitColor clearfix f-fl">
                            <div class="prohibitBg3  IconRadius prohibitBg f-fl"></div>
                            <div class="f-fl">
                                <span type="primary">已被续约</span>
                            </div>
                        </div>
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span v-if="record.auditStatus==1">{{record.auditBizScene==11||record.auditBizScene==12?'签订合同：':record.auditBizScene==13?'退租审批：':''}}{{record.auditProcess}}</span>
                                    <span v-if="record.auditStatus==9">审批通过</span>
                                    <span v-if="record.auditStatus==5">审批驳回</span>
                                    <span v-if="record.auditStatus==6">已撤销</span>
                                </p>
                            </template>
                            <div class="statusRadius status1 f-fr" v-if="record.auditStatus&&record.auditStatus==1" ><icon-font type="iconyumengtubiao_daishenpirenyuan"></icon-font></div>
                            <div class="statusRadius status9 f-fr" v-if="record.auditStatus&&record.auditStatus==9" ><icon-font type="iconshenhetongguo1x"></icon-font></div>
                            <div class="statusRadius status5 f-fr" v-if="record.auditStatus&&record.auditStatus==5" ><icon-font type="iconshenhebohui1x"></icon-font></div>
                            <div class="statusRadius status6 f-fr" v-if="record.auditStatus&&record.auditStatus==6" ><icon-font type="iconliebiao-yichexiao1x"></icon-font></div>
                        </a-popover>
                    </div>
                    <div slot="fullAddress" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                                </p>
                            </template>
                            <div class="f-fl" style="width:calc(100% - 10px);position: relative;margin-left:10px;" type="primary">
                                <!-- <img v-if="record.isCertified ==1" class="isCertified-font" src="../../../assets/login/certification.png" alt=""> -->
                                <p class="overHidde" style="line-height:22px;">
                                    <span class="font-span" style="vertical-align: middle">
                                        <icon-font v-if="record.contractMedium ==1" type="iconyumengtubiao_zhizhihetong" />
                                        <icon-font v-else type="iconyumengtubiao_dianzihetong" />
                                    </span>
                                    <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                                </p>
                            </div>
                        </a-popover>
                    </div>
                    <div slot="name" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;" v-if="viewRenterPhoneFlag"> {{text}}-{{record.phone}}</p>
                              <p style="padding: 8px 18px;" v-else>{{text}}-{{record.phone|formatPhone}}</p>
                            </template>
                            <span v-if="record.signType == 1" class="newContract" >新签</span>
                            <span v-else class="xuContract">续签</span>
                            <span class="overHidde" style="width:166px;margin-left: 5px;" type="primary" v-if="viewRenterPhoneFlag">{{text}}-{{record.phone}}</span>
                          <span class="overHidde" style="width:166px;margin-left: 5px;" type="primary" v-else>{{text}}-{{record.phone|formatPhone}}</span>
                        </a-popover>
                    </div>
                    <div slot="price" slot-scope="text">
                        {{text/100}}
                    </div>
                    <div slot="deposit" slot-scope="text">
                        {{text/100}}
                    </div>
                    <div slot="periodMonth" slot-scope="text,record">
                        <span v-if="record.periodMonth===99">一次性付</span>
                        <span v-else>押 {{record.depositMonth===90?'自定义':record.depositMonth}} 付 {{record.periodMonth}}</span>
                    </div>
                    <div slot="beginTime" slot-scope="text,record">
                        {{$moment(record.beginTime).format('YYYY.MM.DD')}}-{{$moment(record.endTime).format('YYYY.MM.DD')}}
                    </div>

                    <div slot="signTime" slot-scope="text">
                        {{$moment(text).format('YYYY.MM.DD')}}
                    </div>
                    <div slot="action" slot-scope="text, record" v-if="(record.houseId!=''||record.houseId!=null)&&((record.status !=9)||(record.status ==9 && nowTime>record.endTime))">
                        <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
                            <template slot="content">
                                <div v-if="record.btnArr.indexOf('1') != -1" @click.stop="invitedToSign(record)" class="action cursor" >邀请签字</div>
                                <div v-if="record.btnArr.indexOf('2') != -1" @click.stop="invitationToConfirm(record)" class="action cursor" >邀请确认</div>
                                <div v-if="record.btnArr.indexOf('4') != -1" @click.stop="addContract(record)" class="action cursor" >续签</div>
                                <div v-if="record.btnArr.indexOf('3') != -1" @click.stop="cancelRentFun(record)" class="action cursor" >退租</div>
                                <div v-if="record.btnArr.indexOf('6') != -1" @click.stop="resetFun(record)" class="action cursor" >重置</div>
                                <div v-if="record.btnArr.indexOf('5') != -1" @click.stop="associated(record)" class="action cursor" >关联房源</div>
                                <div v-if="record.btnArr.indexOf('7') != -1" @click.stop="toVoidFun(record)" class="action cursor" >作废</div>
                                <div v-if="record.btnArr.indexOf('8') != -1" @click.stop="deleteChild(record)" class="action cursor" >删除</div>
                                <div v-if="record.btnArr.indexOf('10') != -1" class="action cursor" @click="openUrgeHander(record)">催办</div>
                                <div v-if="record.btnArr.indexOf('11') != -1" class="action cursor" @click="revoke(record)">撤销</div>
                                <div v-if="record.btnArr.indexOf('12') != -1" class="action cursor" @click="openFlowDetail(record)">审批</div>
                                <div v-if="record.btnArr.indexOf('9') != -1" @click.stop="restartFun(record)" class="action cursor" >重新提交</div>
                            </template>
                            <div style="width: 100%;height: 100%">
                                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                            </div>
                        </a-popover>
                    </div>
                </a-table>
                <div class="contFoot" v-show="tableData.length>0">
                    <a-pagination size="small" :total="pagination.total" :current="pagination.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                </div>
            </div>
        </content-main>
        <!-- 添加合同弹框 -->
        <a-modal destroyOnClose centered :footer="null"  :maskClosable="false" width="1200px" v-model="addContractDialog" class="ownModalBorder titDialog" :title="addContractTitle" :confirmLoading="confirmLoading">
            <add-contract :contractResetStatus="contractResetStatus" :tenantContract="tenantContract" @cancelUp="addContractDialog = false" @saveSuccess="addSaveSuccess" @cancelSaveTenantContract="cancelSaveTenantContract"></add-contract>
        </a-modal>

        <!-- 搜索框 -->
        <!-- <a-drawer :title="null" :placement="placement" width="570px" :visible="searchVisible" @close="searchVisible=false" :maskStyle="{'background':'transparent','animation':'none'}" :closable="false" :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}">
                                        <tenant-search @assetsFormData="assetsFormData">
                                        </tenant-search>
                                    </a-drawer> -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="合同详情" width="1000px" v-model="lookTenantDialog" class="ownModalBorder titDialog" @cancel="isRefreshFun">
            <contract-detail @refreshinfoFun="refreshinfoFun" :tenantContract="tenantContract" :workflowTab="workflowTab" @saveHouseDetail="cancelTenantDetail" @deleteOk="deleteOk" @initTenantContract="initTenantContract"></contract-detail>
        </a-modal>
        <!-- 合同作废 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="合同作废" width="800px" v-model="toVoidDialog" class="ownModalBorder titDialog" @cancel="toVoidDialog=false">
            <to-void :tenantContract="tenantContract" :infoData="infoData" @closeThis="toVoidDialog=false" @saveSuccess="successFun"></to-void>
        </a-modal>
        <!-- 退租弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="cancelRentDialog" class="ownModalBorder titDialog" title="退租">
            <cancel-rent :renterContractViewDTO="infoData" :unNormalCancelRentFlag="unNormalCancelRentFlag" :fromAduit="fromAduit" @saveSuccess="successFun" @closeThis="cancelRentDialog=false"></cancel-rent>
        </a-modal>
        <!-- 关联房源弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="associatedDialog" class="ownModalBorder titDialog" title="关联房源">
            <associated-detail :infoData="infoData" @saveSuccess="successFun" @closeThis="associatedDialog=false"></associated-detail>
        </a-modal>
        <!--催办 -->
        <a-modal title="" width="433px" v-model='warningDialog' class="myLaunch-box-special-Dialog titDialog" @ok="urgeHander" @cancel="sendMessageFlag=true;warningDialog=false" okText="确定" cancelText="取消" :closable="false">
            <div class="content">
                <a-icon class="contentCircle" type="question-circle"/>
                <span class="contentTitle">确定要给当前审批人发送消息提醒吗？</span>
                <div class="confirm-content">确定后会以消息的形式通知到当前审批人</div>
                <div class="confirm-warning">当前审批人：{{auditEmpNameList.join('、')}}</div>
                <div class="confirm-check"><a-checkbox v-model="sendMessageFlag" @change="onChange">短信通知当前审批人</a-checkbox></div>
            </div>
        </a-modal>
      <!-- 关联房源弹框今天提醒 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="cancelRentTodayFlag" class="ownModalBorder titDialog" title="关联房源">
        <cancel-rent-today :cancelRentTodayRecord="cancelRentTodayRecord" :cancelRentFlag="cancelRentFlag" @goToCancelRent="goToCancelRent" @goToVoid="toVoidFun"></cancel-rent-today >
      </a-modal>
      <!-- 导出框-->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
        <exportExcel @close="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
      </a-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import SearchDialog from '@/components/SearchDialog';
    import cancelRent from './cancelRent';
    import TopStatus from '@/components/TopStatus/index';
    import addContract from './addTenantContract';
    import contractDetail from './contractDetails';
    import toVoid from './toVoid';
    import associatedDetail from './associated';
    import SkeletonTenant from '../../skeleton/contract/tenant';
    import CancelRentToday from './cancelRentToday';
    import { getTenantContractList, getTenantContractStatus, inviteSign, inviteConfirmSend, deleteRenterContract, contractResetValid } from '@/api/contract';
    import  {revoke,urgeHander} from '@/api/workflow';
    import { getDateHaoMiao } from '@/utils/util';
    import exportExcel from '@/components/exportExcel/index';
    export default {
        name: "tenant",
        components: {
            TopStatus,
            addContract,
            contractDetail,
            SearchDialog,
            toVoid,
            cancelRent,
            associatedDetail,
            SkeletonTenant,
            CancelRentToday,
            exportExcel,
        },
        data() {
            let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
            let currentMonth = Vue.prototype.$moment().startOf('month').valueOf();
            let beforeThreeDay = Vue.prototype.$moment().add(-2, 'days').valueOf();
            let beforeOneWeek = Vue.prototype.$moment().add(-6, 'days').valueOf();
            let threeDay = Vue.prototype.$moment().add(2, 'days').valueOf();
            let oneWeek = Vue.prototype.$moment().add(6, 'days').valueOf();
            let oneMonth = Vue.prototype.$moment().endOf('month').valueOf()
            return {
                nowTime: new Date().getTime(),
                searchList: [
                    {
                        key: 'fuzzyQueryType',
                        list: [
                            {
                                label: '综合检索',
                                value: 0,
                            },
                            {
                                label: '房源编号',
                                value: 1
                            },
                            {
                                label: '房源地址',
                                value: 2
                            },
                            {
                                label: '门牌号',
                                value: 3
                            },
                            {
                                label: '项目名称',
                                value: 4
                            },
                            {
                              label: '合同编号',
                              value: 5
                            },
                            {
                                label: '租客姓名',
                                value: 6
                            },
                            {
                                label: '租客电话',
                                value: 7
                            },
                        ],
                    },
                    {
                        key: 'remindType',
                        title: '合同提醒',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '待租客确认',
                                value: 1
                            },
                            {
                                label: '正常退',
                                value: 2
                            },
                            {
                                label: '非正常退',
                                value: 3
                            }
                        ],
                    },
                    {
                        key: 'auditStatus',
                        title: '审批状态',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '待审批',
                                value: 1
                            },
                            {
                                label: '审批通过',
                                value: 9
                            },
                            {
                                label: '审批驳回',
                                value: 5
                            },
                            {
                                label: '已撤销',
                                value: 6
                            },
                        ],
                    },
                    {
                        key: 'contract_medium',
                        title: '合同类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '纸质',
                                value: 1
                            },
                            {
                                label: '电子',
                                value: 2
                            }
                        ],
                    },
                    {
                        key: 'sign_type',
                        title: '签约类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '新签',
                                value: 1
                            },
                            {
                                label: '续签',
                                value: 2
                            }
                        ],
                    },
                    {
                        key: ['beginTimeStart', 'beginTimeEnd'],
                        title: '合同开始时间',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '近3天',
                                value: [currentTime, threeDay]
                            },
                            {
                                label: '近7天',
                                value: [currentTime, oneWeek]
                            },
                            {
                                label: '本月内',
                                value: [currentMonth, oneMonth]
                            },
                            {
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                    },
                    {
                        key: ['endTimeStart', 'endTimeEnd'],
                        title: '合同结束日期',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '近3天',
                                value: [currentTime, threeDay]
                            },
                            {
                                label: '近7天',
                                value: [currentTime, oneWeek]
                            },
                            {
                                label: '本月内',
                                value: [currentMonth, oneMonth]
                            },
                            {
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                    },
                    {
                        key: ['signTimeStart', 'signTimeEnd'],
                        title: '合同签约时间',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                              label: '近3天',
                              value: [beforeThreeDay, currentTime]
                            },
                            {
                              label: '近7天',
                              value: [beforeOneWeek, currentTime]
                            },
                            {
                                label: '本月内',
                                value: [currentMonth, oneMonth]
                            },
                            {
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                    },
                    {
                        key: ['quiteDateStart', 'quiteDateEnd'],
                        title: '合同退租日期',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                              label: '近3天',
                              value: [beforeThreeDay, currentTime]
                            },
                            {
                              label: '近7天',
                              value: [beforeOneWeek, currentTime]
                            },
                            {
                                label: '本月内',
                                value: [currentMonth, oneMonth]
                            },
                            {
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                    },
                ],
                lookTenantDialog: false,
                cancelRentDialog: false,
                unNormalCancelRentFlag:false,
                toVoidDialog: false,
                confirmLoading: false,
                addContractDialog: false,
                placement: 'right',  //抽屉搜索框位置
                tableColumns: [
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
                    },
                    {
                        title: '合同类型/房源地址',
                        dataIndex: 'fullAddress',
                        key: 'fullAddress',
                        scopedSlots: { customRender: 'fullAddress' },
                        align: 'left',
                        width: '26%',
                    },
                    {
                        title: '租客信息',
                        dataIndex: 'name',
                        key: 'name',
                        scopedSlots: { customRender: 'name' },
                        align: 'left',
                        style: 'padding-left:10px;'
                    },
                    {
                        title: '租金(元/月)',
                        key: 'price',
                        dataIndex: 'price',
                        scopedSlots: { customRender: 'price' },
                        align: 'left',
                    },
                    {
                        title: '押金(元)',
                        key: 'deposit',
                        dataIndex: 'deposit',
                        align: 'left',
                        scopedSlots: { customRender: 'deposit' },
                    },
                    {
                        title: '付款方式',
                        key: 'periodMonth',
                        dataIndex: 'periodMonth',
                        scopedSlots: { customRender: 'periodMonth' },
                        align: 'left',
                    },
                    {
                        title: '合同周期',
                        key: 'beginTime',
                        dataIndex: 'beginTime',
                        scopedSlots: { customRender: 'beginTime' },
                        align: 'left',
                    },
                    {
                        title: '签约时间',
                        key: 'signTime',
                        dataIndex: 'signTime',
                        scopedSlots: { customRender: 'signTime' },
                        align: 'left',
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
                tableData: [],

                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                statusData: [
                    {
                        title: '全部',
                        status: 0,
                        string: 'total',
                        query: null,
                    },
                    {
                        title: '待签字',
                        status: 0,
                        string: 'toBeSignQuantity',
                        query: 1,
                        color: '#FFAF6D'
                    },
                    {
                        title: '在租中',
                        status: 0,
                        string: 'inRentQuantity',
                        query: 2,
                        color: '#0A87F8'

                    },
                    {
                        title: '即将搬入',
                        status: 0,
                        string: 'moveInQuantity',
                        query: 3,
                        color: '#03C683'
                    },
                    {
                        title: '即将搬出',
                        status: 0,
                        string: 'moveOutQuantity',
                        query: 4,
                        color: '#9F6EEC'
                    },
                    {
                        title: '已到期',
                        status: 0,
                        string: 'expiredQuantity',
                        query: 5,
                        color: '#FB4246'
                    },
                    {
                        title: '已退租',
                        status: 0,
                        string: 'cancelQuantity',
                        query: 6,
                        color: '#666666'
                    },
                    {
                        title: '已作废',
                        status: 0,
                        string: 'obsoletedQuantity',
                        query: 8,
                        color: '#666666'
                    }
                ],
                sendData: {
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyKeyword: '',               // 模糊匹配关键词
                    fuzzyQueryType: 0,              //模糊查询类型【0、全部，1、房源编号，2、房源地址，3、门牌号，4、项目名称，5、预定人姓名，6、预定人电话】
                    areaId: '',                      // 区域id
                    cityId: '',                      // 城市id
                    communityId: '',                 // 小区ID
                    deptId: '',                      // 部门ID
                    maintainerId: '',               // 负责人ID

                    houseType: '',                  // 房源类型（1分散2独栋）
                    rentMonthEnd: null,             // 最晚签约日-结束时间（单位/月）
                    rentMonthStart: null,           // 最晚签约日-开始时间（单位/月）
                    rentMonthType: null,            // 预计租住时间【1、1个月，2、3个月，3、6个月，4、12个月，9、自定义】
                    signDateEnd: null,                // 最晚签约日-结束时间
                    signDateStart: null,              // 最晚签约日-开始时间
                    signDateType: null,               // 最晚签约日【1、3天，2、7天，3、本月，9、自定义】


                    sort: '',                       // 排序字段
                    status: null,               // 房间状态（1：空置；2：预定；3：已租；4：配置；5：锁房；6：锁房待签字；7：无效；8：关闭）
                    tenantId: '',                   // 租户ID
                    townId: '',                     // 商圈id
                    updateTime: '',                 // 修改时间
                    vacantDaysBegin: '',            // 空置天数区间开始
                    vacantDaysEnd: '',              // 空置天数区间结束
                },
                paraData: {},
                tenantContract: '',
                unsubscribeDialog: false,
                associatedDialog: false,
                searchVisible: false,
                infoData: {},
                contractResetStatus: false,   //重置合同状态
                statusActiveIndex: 0,
                spinLoading:true,
                isRefresh:false,
                warningDialog:false,
                auditEmpNameList:[],
                sendMessageFlag:true,
                auditInstanceId:'',   //签约审批id
                auditBizScene:'',     //场景 11、签约；13、退租
                auditBreakInstanceId:'', //退租审批id
                permissions:[],
                workflowTab:false,
                addContractTitle:'添加合同',
              viewRenterPhoneFlag:false,
              fromAduit:false,
              cancelRentFlag:false,
              cancelRentTodayFlag:false,
              cancelRentTodayRecord: {},
              exportExcelShow:false,
              exportUrl: '/pc2b/renter_contract/list_export',
              exportData:{},
            }
        },
        created() {
            switch (this.$route.params.search) {
                case 'index':
                    this.statusActiveIndex = 0;
                    this.sendData.status = '';
                    break;
                case 'toBeSign':
                    this.statusActiveIndex = 1;
                    this.sendData.status = 1;
                    break;
                case 'inRent':
                    this.statusActiveIndex = 2;
                    this.sendData.status = 2;
                    break;
                case 'moveOut':
                    this.statusActiveIndex = 4;
                    this.sendData.status = 4;
                    break;
                case 'expired':
                    this.statusActiveIndex = 5;
                    this.sendData.status = 5;
                    break;
            }
            this.initViewRenter();
            this.inif();
        },
        methods: {
          // 导出
          exportExcel() {
            this.exportData = Object.assign({}, this.sendData);
            this.exportExcelShow = true;
          },
          initViewRenter(){
            let isExit = false;
            let zfFlag = false;
            this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
            this.permissions.some(function(value){
              if (value.mark == 'mk_contract_tenant_zkdh'){
                isExit = true;
              }
              if(value.mark == 'mk_contract_tenant_zf'){
                zfFlag = true;
              }
            });
            this.viewRenterPhoneFlag = isExit;
            this.cancelRentFlag = zfFlag;
          },
            openFlowDetail(record){
                this.tenantContract = record.id;
                this.auditInstanceId = record.auditInstanceId;
                this.auditBizScene = record.auditBizScene;
                this.auditBreakInstanceId = record.auditBreakInstanceId;
                this.lookTenantDialog = true;
                this.workflowTab = true;
            },
            urgeHander(){
                let parameter ={
                    auditInstanceId:this.auditInstanceId,
                    isSmsNotify:this.sendMessageFlag?1:0,
                };
                this.warningDialog = false;
                urgeHander(parameter).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.$message.success('催办成功！');
                        this.warningDialog = false;
                    }else{
                        this.$message.error('催办失败！');
                    }
                })
            },
            revoke(record) {
                let _this = this;
                let bizScene = '';
                if(record.contractMedium == 1){
                    bizScene = 11;
                }
                if(record.contractMedium == 2){
                    bizScene = 12;
                }
                let auditInstanceId = '';
                if(record.auditBizScene==11||record.auditBizScene==12){
                  auditInstanceId = record.auditInstanceId;
                }
                if(record.auditBizScene==13){
                  auditInstanceId = record.auditBreakInstanceId;
                }
                let parameter = {
                    auditInstanceId : auditInstanceId,
                    bizScene:bizScene,
                };
                this.$modal.confirm({
                    title: '你确定要撤销申请吗？',
                    content: '',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        revoke(parameter).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                if(res.data.successFlag==1){
                                    _this.$message.success('撤销申请成功！');
                                    setTimeout(()=> {
                                        _this.inif();
                                    },500);
                                }
                                else{
                                    _this.$message.error(res.data.errorMsg);
                                }
                            }else{
                                _this.$message.error('撤销申请失败！');
                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            onChange(e){
                this.sendMessageFlag = e.target.checked;
            },
            openUrgeHander(record){
                this.auditEmpNameList = record.auditEmpNameList;
                this.warningDialog = true;
                this.auditInstanceId = record.auditInstanceId;
            },
            checkOpts(record){
                // 1 邀请签字
                // 2 邀请确认
                // 3 退租
                // 4 续签
                // 5 关联房源
                // 6 重置
                // 7 作废
                // 8 删除
                // 9 重新提交
                // 10 催办
                // 11 撤销
                // 12 审批
                //防止this.permissions没值
                if(!this.permissions||this.permissions.length==0){
                    this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
                }
                let markArr = [];
                let btnArr = [];
                if(record.auditStatus == 0||record.auditStatus == 9){
                    //关联房源、邀请确认不受流程影响
                    if(record.houseId == '' || record.houseId == null){
                        markArr.push('mk_contract_tenant_glfy');
                    }
                    //未开启流程
                    if ((record.isSyncTenant==1||record.isSyncTenant==0)&&record.contractMedium ==1&&record.status!= 6&&record.status!= 7&&record.status!= 8&&record.status!= 9){
                        markArr.push('mk_contract_tenant_yqqr');
                    }
                    if (record.status==1){
                        markArr.push('mk_contract_tenant_yqqz','mk_contract_tenant_xq','mk_contract_tenant_tz');
                        if(record.auditStatus == 0){
                            markArr.push('mk_contract_tenant_zf');
                        }else if(record.auditStatus == 9 && record.auditingAllowObsolete==1){
                            markArr.push('mk_contract_tenant_zf');
                        }
                    } else if(record.status==9&&this.nowTime>record.endTime){
                        markArr.push('mk_contract_tenant_tz');
                    } else if(record.status==2||record.status==3||record.status==4||record.status==5){
                        markArr.push('mk_contract_tenant_xq','mk_contract_tenant_tz');
                        if(record.auditStatus == 0){
                            markArr.push('mk_contract_tenant_zf');
                        }else if(record.auditStatus == 9 && record.auditingAllowObsolete==1){
                            markArr.push('mk_contract_tenant_zf');
                        }
                        if(record.contractMedium ==1&&record.auditStatus==0){
                            markArr.push('mk_contract_tenant_cz');
                        }
                    }
                    else if(record.status==6||record.status==7){
                      markArr.push('mk_contract_tenant_zf');
                    }
                    else if(record.status==8){
                        markArr.push('mk_contract_tenant_sc');
                    }

                }
                else if(record.auditStatus==1){

                    if(record.auditRelationType == 1){
                        btnArr.push('10','11');
                    } else if(record.auditRelationType == 2){
                        btnArr.push('12');
                    }else if(record.auditRelationType == 5){
                        btnArr.push('10','11','12');
                    }

                    if(record.status==1){
                        //邀请签字
                        markArr.push('mk_contract_tenant_yqqz');
                    }
                    if((record.isSyncTenant==1||record.isSyncTenant==0)&&record.contractMedium==1&&record.status!= 6&&record.status!= 7&&record.status!= 8&&record.status!= 9){
                        //合约确认
                        markArr.push('mk_contract_tenant_yqqr');
                    }
                    //审批中的合同是否允许退租
                    if(record.auditingAllowBreak == 1&&record.status!=6&&record.status!=7&&record.status!=8&&record.status!=9){
                        markArr.push('mk_contract_tenant_tz');
                    }
                }else if(record.auditStatus==5||record.auditStatus==6){
                    if(record.houseId == '' || record.houseId == null){
                        markArr.push('mk_contract_tenant_glfy');
                    }
                    //审批驳回、撤销只有发起人有操作权限
                    if(record.auditRelationType==1||record.auditRelationType==5){
                        //若主状态已退租就不能退租
                        if(record.status!=6&&record.status!=7&&record.status!=8&&record.status!=9){
                            markArr.push('mk_contract_tenant_tz');
                        }
                        //若主状态已作废就不能作废
                        if(record.status==8){
                            markArr.push('mk_contract_tenant_sc');
                        }
                        if(record.status!=8&&record.status!=9){
                            markArr.push('mk_contract_tenant_zf');
                            btnArr.push('9');
                        }
                    }
                }
                //判断资源权限
                markArr.forEach(ele => {
                    this.permissions.some(function(value){
                        if (ele == value.mark){
                            if(value.mark == 'mk_contract_tenant_yqqz'){
                                btnArr.push('1');
                            }else if(value.mark == 'mk_contract_tenant_yqqr'){
                                btnArr.push('2');
                            }else if(value.mark == 'mk_contract_tenant_tz'){
                                btnArr.push('3');
                            }else if(value.mark == 'mk_contract_tenant_xq'){
                                btnArr.push('4');
                            }else if(value.mark == 'mk_contract_tenant_glfy'){
                                btnArr.push('5');
                            }else if(value.mark == 'mk_contract_tenant_cz'){
                                btnArr.push('6');
                            }else if(value.mark == 'mk_contract_tenant_zf'){
                                btnArr.push('7');
                            }else if(value.mark == 'mk_contract_tenant_sc'){
                                btnArr.push('8');
                            }
                            return true;
                        }
                    });

                });

                record.btnArr = btnArr;

                if(btnArr.length > 0){
                    return true;
                }
                return false;
            },
            inif() {
                this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
                this.getData();
                this.getStatusCount();
            },
            openSearchDrawer() {
                //弹出搜索框
                this.searchVisible = true;
            },
            closeSearchDrawer() {
                //关闭搜索框
                this.searchVisible = false;
            },
            assetsFormData(data) {
                // console.log(data)
                this.searchVisible = false;
                this.sendData.fuzzyQueryType = data.fuzzyQueryType;
                this.sendData.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData.quiteDateStart = data.quiteDateStart
                this.sendData.quiteDateEnd = data.quiteDateEnd
                // this.sendData.quiteDateType = data.quiteDateType;
                this.sendData.signTimeEnd = data.signTimeEnd;
                this.sendData.signTimeStart = data.signTimeStart
                // this.sendData.signTimeType = data.signTimeType;
                this.sendData.endTimeEnd = data.endTimeEnd
                this.sendData.endTimeStart = data.endTimeStart
                // this.sendData.endTimeType = data.endTimeType;
                this.sendData.beginTimeEnd = data.beginTimeEnd;
                this.sendData.beginTimeStart = data.beginTimeStart
                this.sendData.remindType = data.remindType;
                this.sendData.sign_type = data.sign_type;
                this.sendData.contract_medium = data.contract_medium;
                this.sendData.areaId = data.areaId
                this.sendData.cityId = data.cityId;
                this.sendData.communityId = data.townId;
                this.sendData.deptId = data.deptId;
                this.sendData.maintainerId = data.maintainerId;
                this.sendData.auditStatus = data.auditStatus;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.inif();
            },
            getStatusCount() {
                getTenantContractStatus(this.sendData).then(res => {
                    // console.log(res)
                    if (res.code === '200') {
                        let total = 0;
                        let conut = res.data;
                        for (let item of this.statusData) {
                            item.status = conut[item.string];
                            if (item.query && item.query != 3 && item.query != 4 && item.query != 5) {

                                total += item.status;
                            }
                        }
                        this.statusData[0].status = total;
                    }
                })
            },
            getData() {
                this.spinLoading = true;
                getTenantContractList(this.sendData).then(res => {
                    if (res&&res.code === "200") {
                        this.tableData = res.data.records;
                        this.tableData.forEach(function(element, index) {
                            element.num = index + 1;
                        }, this);
                        this.pagination.total = res.data.total;
                    }
                    this.spinLoading = false;
                })
            },
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            this.tenantContract = record.id;
                            this.auditInstanceId = record.auditInstanceId;
                          this.auditBizScene = record.auditBizScene;
                          this.auditBreakInstanceId = record.auditBreakInstanceId;
                            this.lookTenantDialog = true;
                            this.workflowTab = false;
                        }
                    }
                }
            },
            changeStatus(option) {
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.sendData.status = option.query;
                this.getData();
            },
            addContract(res) {
                if (res) {
                    this.tenantContract = res.id;
                    this.addContractTitle = '续签合同';
                }else{
                    this.tenantContract = '';
                    this.addContractTitle = '添加合同';
                }
                this.contractResetStatus = false;
                this.addContractDialog = true;
            },
            handleCancel() {
                this.addContractDialog = false;
            },
            onSizeChange(current) {
                this.sendData.current = current;
                this.pagination.current = current;
                this.inif();
            },
            onShowSizeChange(current, pageSize) {
                // current: 1,                     // 当前页数
                //     size: 10,                       // 每页返回的记录数量
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.pagination.pageSize = pageSize;
                this.pagination.current = current;
                this.inif();
            },
            cancelSaveTenantContract(){
                this.addContractDialog = false;
            },
            initTenantContract(val){
                this.tenantContract = val.id;
                if(val.auditInstanceId){
                   this.auditInstanceId = val.auditInstanceId;
                   this.auditBizScene = '11';
                }
            },
            addSaveSuccess(data) {
                let _this = this;
                setTimeout(function() {
                    _this.addContractDialog = false;
                    _this.inif();
                }, 500);
            },
            //作废
            toVoidFun(res) {
              this.cancelRentTodayFlag = false;
                this.infoData = res;
                this.tenantContract = res.id;
                this.toVoidDialog = true;
            },
            //退定
            unsubscribe(res) {
                this.tenantContract = res.id;
                this.unsubscribeDialog = true;

            },
            //关联房源
            associated(res) {
                this.infoData = res;
                this.associatedDialog = true;
            },
            successFun(res) {
                if (res) {
                    this.cancelRentDialog = false;
                    this.toVoidDialog = false;
                    this.associatedDialog = false;
                    this.toVoidDialog = false;
                    setTimeout(() => {
                        this.inif();
                    }, 500)

                }


            },
            saveTenantDetail() {
                setTimeout(() => {
                    this.lookTenantDialog = false
                    // this.getHouseDiagram()
                }, 500)
            },
            cancelTenantDetail() {
                this.lookWholeDialog = false;
                //必须重置：1、防止修改信息修改的同步；2、防止数据被重置删除的同步
                this.inif();
            },
            invitedToSign(res) {
                let id = res.id;
                let that = this;
                this.$modal.confirm({
                    title: '确定要给 「' + res.name + '/' + res.phone + '」 发送邀请签字短信吗？',
                    content: '',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        inviteSign(id).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                that.$message.success('短信发送成功！');
                                that.inif();
                            }
                        })
                    },
                    onCancel() {
                        // console.log('Cancel');
                    },
                });
            },
            restartFun(data){
              if(data.auditBizScene==13){
                this.infoData = data;
                this.cancelRentDialog = true;
                this.fromAduit = true;
              }
              else if(data.auditBizScene==12||data.auditBizScene==11){
                this.tenantContract = data.id;
                this.contractResetStatus = true;
                this.addContractDialog = true;
                this.addContractTitle = '重新提交合同';
              }
            },
            resetFun(data) {
                let that = this;
                let id = data.id
                contractResetValid(id).then(res => {
                    if (res.data) {
                        this.$modal.confirm({
                            title: '确定要重置 「' + data.name + '/' + data.phone + '」 的合同信息吗？',
                            content: '重置后，原合同信息及收款记录将被清除',
                            okText: '确定',
                            cancelText: '取消',
                            onOk() {
                                that.tenantContract = id;
                                that.contractResetStatus = true;
                                that.addContractDialog = true;
                                that.addContractTitle = '重置合同';
                            },
                            onCancel() {
                                // console.log('Cancel');
                            },
                        });
                    } else {
                        this.$message.error('已产生收支无法重置');
                    }
                });

            },
            invitationToConfirm(data) {
                let that = this;
                let id = data.id
                this.$modal.confirm({
                    title: '确定要给 「' + data.name + '/' + data.phone + '」 发送合同确认信息吗？',
                    content: '发送短信后，租客可在手机端直接确认合同信息',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        inviteConfirmSend(id).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                that.$message.success('短信发送成功！');
                                setTimeout(() => {
                                    that.inif();
                                }, 500)
                            }
                        })
                    },
                    onCancel() {
                        // console.log('Cancel');
                    },
                });
            },
            deleteChild(data) {
                let _this = this;
                let id = data.id
                this.$modal.confirm({
                    title: '确定要删除 「' + data.name + '/' + data.phone + '」 的合同信息吗？',
                    content: '删除后将不可恢复',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() {
                        deleteRenterContract(id).then(res => {
                            // console.log(res)
                            if (res.code == 200) {
                                _this.$message.success('操作成功！');
                                setTimeout(() => {
                                    _this.inif();
                                }, 500)
                            }
                        })
                    },
                    onCancel() {
                        // console.log('Cancel');
                    },
                });
            },
            deleteOk(res) {
                if (res) {
                    this.lookTenantDialog = false;
                    let _this = this;
                    setTimeout(() => {
                        _this.inif();
                    }, 500)
                }
            },
            goToCancelRent(res){
              this.cancelRentTodayFlag = false;
              this.infoData = res;
              this.cancelRentDialog = true;
              this.fromAduit = false;
              if(res.auditStatus==1||res.auditStatus==5||res.auditStatus==6){
                this.unNormalCancelRentFlag = true;
              } else{
                this.unNormalCancelRentFlag = false;
              }
            },
            cancelRentFun(res) {
                //检测本份合同是不是今天创建的
                let createTime = this.$moment(res.createTime).format('YYYY-MM-DD');
                let currentTime = this.$moment(new Date().getTime()).format('YYYY-MM-DD');
                if(createTime==currentTime){
                  this.cancelRentTodayRecord = res;
                  this.cancelRentTodayFlag = true;
                }
                else{
                  this.goToCancelRent(res);
                }
            },
            refreshinfoFun(res){  //详情有改变的操作  就改变状态
                if(res){
                    this.isRefresh = res
                }
            },
            isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
                if(this.isRefresh){
                    this.inif();
                }
                this.lookTenantDialog = false;
                this.isRefresh = false
            },

        },
        filters: {
            formatTime: function(value) {
                if (!value) return '-';
                value = getDateHaoMiao(value);
                return value;
            },
            formatPhone:function (value) {
              var str = String(value)
              var len = str.length;
              var prev,next;
              if (len >= 7) {
                prev = str.slice(-len,-8)
                next = str.slice(-4)
                str = prev+"****"+next
              } else if (len < 7 && len >= 6) {
                prev = str.slice(-len,-4)
                next = str.slice(-2)
                str = prev + "**" + next
              }
              if(!value){
                str = '-';
              }
              return str
            },
        }
    }
</script>

<style scoped lang="less">
    .tenantContractBox {
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
                .prohibitBg2 {
                    background: rgba(10, 135, 248, 1);
                }
                .prohibitBg3 {
                    background: #03C683;
                }
                .prohibitBg4 {
                    background: #9F6EEC;
                }
                .prohibitBg5 {
                    background: #FB4246;
                }
                .prohibitBg6 {
                    background: rgba(119, 119, 119, 1);
                }
            } // .fontNormalColor {
            //     color: #3DB302;
            // }
            .statusRadius{
                width:20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border-radius: 50%;
                i{
                    vertical-align: -0.1em
                }
            }
            .status1{
                color: #FFA036;
                border: 1px solid #FFA036;
            }
            .status9{
                color: #0A87F8;
                border: 1px solid #0A87F8;
            }
            .status5{
                color: #FB4246;
                border: 1px solid #FB4246;
            }
            .status6{
                color: #777777;
                border: 1px solid #777777;
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
        }
        .font-span {
            width: 20px;
            display: inline-block;
            font-size: 20px;
        }
        .signType {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid #FFA036;
            color: #FFA036;
            border-radius: 50%;
            line-height: 18px;
            font-size: 12px;
            text-align: center;
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
            left: -15px; //         svg{
            //             height: 100%;
            //             width: 100%;
            //             use{
            // height: 100%;
            //             width: 100%;
            //             }
            //         }
        }
        & /deep/ .ant-table-thead {
            >tr th:nth-of-type(3) {
                >div {
                    margin-left: 10px;
                }
            }
        }
        & /deep/ .ant-popover {
            .ant-popover-inner-content {
                text-align: center;
                padding: 5px 0;
                .action {
                    padding: 8px 10px;
                }
                .action:hover {
                    cursor: pointer;
                    background: rgba(10, 135, 248, 0.1);
                }
            }
        }
        .houseAddress{
            height:20px;
            border-radius:2px;
            color: #0A87F8;
            background-color: #f0f8ff;
            font-size: 12px;
            text-align: center;
            padding: 5px 5px;
            margin-right: 5px;
        }
        .newContract{
            width:34px;
            height:20px;
            line-height: 20px;
            border-radius:2px;
            border: 1px solid #91D5FF;
            color: #1890ff;
            background-color: #E6F7FF;
            font-size: 12px;
            text-align: center;
            padding: 3px 5px;
            transform: scale(0.8);
        }
        .xuContract{
            transform: scale(0.8);
            width:34px;
            height:20px;
            line-height: 20px;
            border-radius:2px;
            border: 1px solid #B7EB8F;
            color: #52c41a;
            background-color:#F6FFED;
            font-size: 12px;
            text-align: center;
            padding: 3px 5px;
        }
    }
    /deep/ .content-main .content{
        padding: 0;
    }
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
    .content{
        position: relative;
        padding: 32px 32px 0;
        .contentCircle{
            float: left;
            margin-right: 16px;
            font-size: 22px;
            color:#faad14;
        }
        .contentTitle{
            display: block;
            overflow: hidden;
            color: rgba(0, 0, 0, 0.85);
            font-weight: 500;
            font-size: 16px;
            line-height: 1.4;
        }
        .confirm-content{
            margin-top: 7px;
            margin-left: 38px;
            color: rgba(0, 0, 0, 0.65);
            font-size: 14px;
        }
        .confirm-warning{
            margin-left: 38px;
            width:331px;
            padding: 8.5px 0 8.5px 10px;
            background:rgba(245,247,254,1);
            border-radius:4px;
            margin-top: 15px;
        }
        .confirm-check{
            position: absolute;
            bottom:-75px;
            left: 70px;
        }
    }
</style>
<style lang="less">
    .myLaunch-box-special-Dialog{
        .ant-modal-header {
            border-bottom: none;
            height: 50px;
            line-height: 50px;
        }
        .ant-modal-footer {
            padding: 50px 32px 24px 32px;
            border-top: none;
        }
    }
</style>


