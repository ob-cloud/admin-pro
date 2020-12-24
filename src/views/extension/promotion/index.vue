<template>
    <!-- 房源推广管理 -->
    <div class="extension-promotion-box">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <div class="platFormStyle clearfix" v-if="!headLoading">
          <div class="singlePlatFormStyle f-fl cursor clearfix" :style="item.platform==2?'width:188px;':''" :class="currentPlatform==item.platform==1?'clickStyle':'unClickStyle'" v-for="(item) in platformList" @click="changeCurrentPlatform(item)">
              <div class="pic f-fl">
                  <img v-if="item.platform==1" src="../../../assets/extension/promotion-gwgw.png"  />
                  <img v-if="item.platform==2&&item.status==1" src="../../../assets/extension/promotion-58.png"  />
                  <icon-font v-if="item.platform==2&&item.status!=1" style="color: #777777;margin-top: 1.5px;" type="icon58gongyuguanbeifen43x" />
                  <img v-if="item.platform==3&&item.status==1" src="../../../assets/extension/promotion-58gg.png"  />
                  <icon-font v-if="item.platform==3&&item.status!=1" style="color: #777777;margin-top: 1.5px;" type="icon58gongyuguan" />
                  <img v-if="item.platform==4&&item.status==1" src="../../../assets/extension/promotion-xy.png"  />
                  <icon-font v-if="item.platform==4&&item.status!=1" style="color: #777777;margin-top: 1.5px;" type="iconxianyuzufang" />
                  <img v-if="item.platform==5&&item.status==1" src="../../../assets/extension/promotion-bk.png"  />
                  <icon-font v-if="item.platform==5&&item.status!=1" style="color: #777777;margin-top: 1.5px;" type="iconbeikezufang" />
              </div>
              <div class="fontStyle f-fl">
                  <div v-if="item.platform==1" :class="item.status==1?'openStyle-font1':'unOpenStyle-font1'">官网/官微</div>
                  <div v-if="item.platform==2" :class="item.status==1?'openStyle-font1':'unOpenStyle-font1'">58租房</div>
                  <div v-if="item.platform==3" :class="item.status==1?'openStyle-font1':'unOpenStyle-font1'">58公寓馆</div>
                  <div v-if="item.platform==4" :class="item.status==1?'openStyle-font1':'unOpenStyle-font1'">闲鱼租房</div>
                  <div v-if="item.platform==5" :class="item.status==1?'openStyle-font1':'unOpenStyle-font1'">贝壳租房</div>
                  <div v-if="item.status==1" class="openStyle-font2"><icon-font type="iconyumengtubiao_danxuan-yixuanze"/> 已开通</div>
                  <div v-else class="unOpenStyle-font2">未开通</div>
              </div>
              <div class="moreStyle f-fr" v-if="item.platform==2" style="width:55px;margin-top: 4px;">
                <div style="height: 18px;" v-if="item.status==1">
                  <img style="width: 40px;height: 14px;" src="../../../assets/extension/ganjiwang1.png">
                </div>
                <div style="height: 18px;" v-if="item.status!=1">
                  <img style="width: 40px;height: 14px;" src="../../../assets/extension/ganjiwang2.png">
                </div>
                <div style="width: 40px;height: 18px;" v-if="item.status==1">
                  <img style="width: 40px;height: 14px;" src="../../../assets/extension/anjuke1.png">
                </div>
                <div style="width: 40px;height: 18px;" v-if="item.status!=1">
                  <img style="width: 40px;height: 14px;" src="../../../assets/extension/anjuke2.png">
                </div>
              </div>
              <div class="f-fr" v-if="item.platform==2" style="border-left: 1px solid #dddddd;width: 1px;height: 30px;margin: 9px 11px 0 0;">
              </div>
          </div>
          <div class="warningStyle_58" v-if="currentPlatform==2">
            <div class="f-fl iconStyle"><a-icon type="exclamation-circle" /></div>
            <div class="f-fl fontStyle">上架至58租房平台后，需前往58租房后台管理系统手动推广已上架房源</div>
          </div>
        </div>
      <div class="platFormStyle clearfix" v-if="headLoading">
        <skeleton-head></skeleton-head>
      </div>
        <div>
            <div style="height: 53px;line-height: 53px;min-width:1250px;">
                <div class="topTitleDesc f-fl">
                  <top-status ref="topStatus" :activeIndex="statusActiveIndex" :showSpecilLine="false" :statusData="statusData" @changeStatus="changeStatus"></top-status>
                </div>
              <div class="synchronizationStyle cursor f-fl" @click="synchronizationPlatform">
                <span style="padding-left: 20px;margin-right: 20px;border-right: 1px solid #BBBBBB;"></span>
                <icon-font style="margin-right: 4px;" type="iconyumengtubiao_zhongzhi"></icon-font>同步发布状态
              </div>
                <div class="f-fr" style="margin-right: 14px">
                    <search-dialog resMark="mk_extension_promotion" placeholder="房源编号/房源地址/项目名称/门牌号/标签" :searchList="searchList"  @search="assetsFormData"></search-dialog>
                </div>
            </div>
            <skeleton-promotion v-show="spinLoading"></skeleton-promotion>
            <div class="table" v-show="!spinLoading">
                <div class="checkOption" v-show="checkedCount > 0 || checkAllFlag" id="checkOption">
                    <div class="dealOption">
                        <span class="headSpan">已选中
                            <span class="themeColor">{{checkAllFlag?pagination.total:checkedCount}}</span> 项
                            <a-divider type="vertical" />
                        </span>
                        <span class="unPermissionStyle" v-show="permissionList.indexOf('1')==-1&&permissionList.indexOf('2')==-1">
                            暂无批量操作（一键上架、一键下架）权限，请联系管理员开通
                        </span>
                        <span v-show="permissionList.indexOf('1')>-1||permissionList.indexOf('2')>-1">
                          <a-checkbox v-model="checkAllFlag" style="margin-right: 5px;" @change="selectAllHouse">全选所有房源</a-checkbox>
                          <a-divider type="vertical" />
                        </span>
                        <span class="cursor" @click="openOneKeyPut(1)" v-show="permissionList.indexOf('1')>-1">
                            <span class="themeColor"><icon-font type="iconshangjia"></icon-font></span>
                            <span class="themeColor" style="margin-left: 6px">一键上架</span>
                            <a-divider type="vertical" v-show="permissionList.indexOf('2')>-1" />
                        </span>
                        <span class="cursor" @click="openOneKeyPut(2)" v-show="permissionList.indexOf('2')>-1">
                            <span class="themeColor"><icon-font type="iconxiajia"></icon-font></span>
                            <span class="themeColor" style="margin-left: 6px">一键下架</span>
                        </span>
                    </div>
                    <div class="themeColor cancelOption cursor">
                        <span @click="cancelOption ">取消选择</span>
                    </div>
                </div>
                <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :customRow="openDetail" rowKey="houseId" :bordered="true" :pagination="false" :columns="tableColumns" @change="handleTableChange" :dataSource="tableData" :scroll="{y : true}">
                    <div slot="status" slot-scope="text,record">
                        <div class="tableBase clearfix">
                            <div class="IconRadius kongzhi f-fl" style="margin-top: 11px;" v-if="record.status==1"></div>
                            <div class="IconRadius yizu f-fl"  style="margin-top: 11px;" v-if="record.status==3"></div>
                            <div class="IconRadius peizhi f-fl" style="margin-top: 11px;" v-if="record.status==4"></div>
                            <div>
                                <span style="color: #111111;">{{record.statusName}}</span>
                                <span v-if="record.status==3" style="color:#FB4246;margin-left: 4px;">{{record.rentedDesc}}</span>
                            </div>
                        </div>
                    </div>
                    <div slot="houseAlias" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 6px 18px;">
                                    <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                                </p>
                            </template>
                            <div type="primary" class="tableBase overHidde" style="max-width: 95%;color: #111111;">
                                <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                            </div>
                        </a-popover>
                    </div>
                    <div slot="room" slot-scope="text,record">
                        <div class="tableBase" style="color: #111111;">
                        {{!record.room&&!record.livingRoom&&!record.kitchen&&!record.toilet?'-':''}}{{record.room?record.room+'室':''}}{{record.livingRoom?record.livingRoom+'厅':''}}{{record.kitchen?record.kitchen+'厨':''}}{{record.toilet?record.toilet+'卫':''}}
                        </div>
                    </div>
                    <div slot="promotionStatus" slot-scope="text">
                      <div v-if="text==1" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg0 IconRadius prohibitBg f-fl"></div>
                        <div>
                          <span>未上架</span>
                        </div>
                      </div>
                      <div v-if="text==3" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg3 IconRadius prohibitBg f-fl"></div>
                        <div>
                          <span>已上架</span>
                        </div>
                      </div>
                      <div v-else-if="text==2" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg1  IconRadius prohibitBg f-fl"></div>
                        <div>
                          <span>上架中</span>
                        </div>
                      </div>
                      <div v-else-if="text==4" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg2  IconRadius prohibitBg f-fl"></div>
                        <div>
                          <span>下架中</span>
                        </div>
                      </div>
                      <div v-if="text==5" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg0 IconRadius prohibitBg f-fl"></div>
                        <div>
                          <span>上架失败</span>
                        </div>
                      </div>
                      <div v-if="text==6" class="fontProhibit fontProhibitColor">
                        <div class="prohibitBg0 IconRadius prohibitBg f-fl"></div>
                        <div>
                          <span>下架失败</span>
                        </div>
                      </div>
                    </div>
                    <div slot="houseArea" slot-scope="text">
                        <div class="tableBase">
                            <span style="font-size:14px;color: #111111;" v-if="text">{{text}}</span><span v-if="text" style="font-size:12px;color: #777777;" > ㎡</span>
                          <span style="font-size:14px;color: #111111;" v-else>-</span>
                        </div>
                    </div>
                    <div slot="actualPrice" slot-scope="text">
                        <div class="tableBase">
                            <span style="font-size:14px;color: #111111;">{{text?text/100:'-'}}</span><span v-if="text" style="font-size:12px;color: #777777;" > 元/月</span>
                        </div>
                    </div>
                    <div slot="platform" slot-scope="text">
                        <div v-if="!text||text.length==0" class="tableBase" style="text-align: left">-</div>
                        <div v-else class="tableBase clearfix" style="text-align: left">
                            <div v-for="(item,index) in text " class="littlePic f-fl" :style="index==text.length-1?'margin-right:0':'margin-right:5px;'">
                                <div v-if="item==1"><img src="../../../assets/extension/promotion-gwgw.png"  /></div>
                                <div v-if="item==2"><img src="../../../assets/extension/promotion-58.png"  /></div>
                                <div v-if="item==3"><img src="../../../assets/extension/promotion-58gg.png"  /></div>
                                <div v-if="item==4"><img src="../../../assets/extension/promotion-xy.png"  /></div>
                                <div v-if="item==5"><img src="../../../assets/extension/promotion-bk.png"  /></div>
                            </div>
                        </div>
                    </div>
                    <div slot="action" slot-scope="text, record">
                        <div  class="action tableBase cursor" style="text-align:center;">
                            <span style="margin:0 6px;color: #0A87F8;" class=" cursor" v-show="permissionList.indexOf('1')>-1" @click.stop="putOn(record.houseId)"><icon-font type="iconshangjia"></icon-font></span>
                            <span style="margin:0 6px;color: #0A87F8;" class="cursor" v-show="permissionList.indexOf('2')>-1" @click.stop="offShelf(record.houseId)"><icon-font type="iconxiajia"></icon-font></span>
                            <span style="margin:0 6px;color: #0A87F8;" class="cursor" v-show="permissionList.indexOf('3')>-1" @click.stop="promotionHistory(record.houseId)"><icon-font type="iconyumengtubiao_yuyue"></icon-font></span>
                        </div>
                    </div>
                </a-table>
                <div class="contFoot clearfix" v-show="tableData.length>0">
                    <a-pagination style="line-height: 56px;" class="f-fr" size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                </div>
            </div>
        </div>
        <!-- 房间详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" width="1000px"
                 v-model="lookCentralizedDialog" class="ownModalBorder titDialog" @cancel="isRefreshFun()">
            <template slot="title">
                <span style="vertical-align: middle">{{address}}</span>
            </template>
            <centralized-house-detail :roomTitle="modalTitle" @refreshinfoFun="refreshinfoFun" @changeAddress="changeAddress" @cancel="lookCentralizedDialog=false" @deleteSuccess="deleteSuccess"></centralized-house-detail>
        </a-modal>
        <!-- 房间详情 -->
        <a-modal destroyOnClose centered width="1000px" :maskClosable="false" v-model="houseInfoDialog"
                 :footer="null" class="ownModalBorder thousandDialog titDialog" @cancel="isRefreshFun()">
            <template slot="title">
                <span style="vertical-align: middle">{{houseAlias?houseAlias+'/':houseAlias}}{{address}}</span>
            </template>
            <!-- 整租 -->
            <whole-house-detail :roomTitle="modalTitle" @deleteSuccess="deleteSuccess" @refreshinfoFun="refreshinfoFun" @changeTitle="changeTitle" @saveOrCancel="initData"></whole-house-detail >
        </a-modal>
        <!-- 合租子房间详情 -->
        <a-modal destroyOnClose centered width="1000px" :maskClosable="false" v-model="shareChildInfoDialog"
                 :footer="null" class="ownModalBorder thousandDialog titDialog" @cancel="isRefreshFun()">
            <template slot="title">
                <span style="vertical-align: middle">{{houseAlias?houseAlias+'/':houseAlias}}{{address}}</span>
            </template>
            <!-- 合租 -->
            <child-detail :roomTitle="modalTitle" @refreshinfoFun="refreshinfoFun" @cancel="shareChildInfoDialog=false" @changeTitle="changeTitle"></child-detail>
        </a-modal>
        <!-- 上下架历史记录 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="promotionHistoryDialog" class="ownModalBorder titDialog" title="历史上下架记录" @cancel="promotionHistoryDialog=false;">
            <promotion-history :houseId="houseId"></promotion-history>
        </a-modal>
      <!-- 未开通提示页面 -->
      <a-modal centered v-model="unOpenDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'50px 0px 56px 0px'}" @cancel="unOpenDialog=false" width="520px">
        <un-open :click-platform="clickPlatform" @openSuccess="openSuccess" @cancelOpen="cancelOpen" :haveConfigRemark="haveConfigRemark" @goToConfig="goToConfig"></un-open>
      </a-modal>
      <!-- 一键上下架 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="oneKeyPutDialog" class="ownModalBorder titDialog" :title="oneKeyPutTile">
        <one-key-put :oneKeyPutType="oneKeyPutType" :click-platform="currentPlatform" :sendData="sendData" :checkAllFlag="checkAllFlag" :selectedRowKeys="selectedRowKeys" :total="checkAllFlag?pagination.total:checkedCount" @cancelOneKeyPut="cancelOneKeyPut" @oneKeyPutSuccess="oneKeyPutSuccess" @colseThis="oneKeyPutSuccess"></one-key-put>
      </a-modal>
      <!-- 同步提示页面 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="synchronizationWarnDialog" class="ownModalBorder titDialog" title="同步发布状态" @cancel="synSuccess">
        <synchronization-warn :currentPlatform="currentPlatform"  @colseThis="synSuccess"></synchronization-warn>
      </a-modal>
      <!-- 操作结果 -->
      <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="loadingDialog" class="ownModalBorder" title="">
        <loading desc="正在同步数据，请稍后…"></loading>
      </a-modal>
    </div>
</template>

<script>
    import SearchDialog from '@/components/SearchDialog';
    import CentralizedHouseDetail from "../../house/centralized/CentralizedHouseDetail";
    import WholeHouseDetail from '../../house/whole/WholeHouseDetail'
    import ChildDetail from '../../house/share/ChildDetail';
    import PromotionHistory from './promotionHistory';
    import SkeletonPromotion from '../../skeleton/extension/promotion';
    import SkeletonHead from '../../skeleton/extension/head';
    import UnOpen from './unOpen';
    import TopStatus from '@/components/TopStatus/index';
    import OneKeyPut from './oneKeyPut';
    import SynchronizationWarn from './synchronizationWarn';
    import * as API from '@/api/extension';
    import Loading from "./loading";
    export default {
        name: "promotion",
        components: {
          Loading,
            SearchDialog,
            CentralizedHouseDetail,
            WholeHouseDetail,
            ChildDetail,
            PromotionHistory,
            SkeletonPromotion,
          UnOpen,
          TopStatus,
          OneKeyPut,
          SynchronizationWarn,
          SkeletonHead,
        },
      props: {
        haveConfigRemark:{
          Type:Boolean,
        }
      },
        data() {
            return {
                currentPlatform:1,
                platformList:[],
                spinLoading:true,
              headLoading:true,
                tableColumns: [
                  {
                    title: '房源发布状态',
                    children: [
                      {
                        title: '官网/官微推广状态',
                        key: 'promotionStatus',
                        dataIndex: 'promotionStatus',
                        align: 'left',
                        scopedSlots: { customRender: 'promotionStatus' },
                        width: '11%',
                      },
                      {
                        title: '已上架平台',
                        key: 'platform',
                        dataIndex: 'platform',
                        align: 'left',
                        scopedSlots: { customRender: 'platform' },
                        width: '14%',
                      },
                    ]
                  },
                  {
                    title: '房源信息',
                    children: [
                      {
                        title: '房源状态',
                        dataIndex: 'status',
                        key: 'status',
                        align: 'left',
                        scopedSlots: {customRender: 'status'},
                        width: '13%',
                      },
                      {
                        title: '房源地址',
                        dataIndex: 'houseAlias',
                        key: 'houseAlias',
                        scopedSlots: {customRender: 'houseAlias'},
                        align: 'left',
                        width: '25%',
                      },
                      {
                        title: '户型',
                        dataIndex: 'room',
                        key: 'room',
                        scopedSlots: {customRender: 'room'},
                        align: 'left',
                        width: '9%',
                      },
                      {
                        title: '面积',
                        key: 'houseArea',
                        dataIndex: 'houseArea',
                        scopedSlots: {customRender: 'houseArea'},
                        align: 'left',
                        width: '7%',
                      },
                      {
                        title: '出租价格',
                        key: 'actualPrice',
                        dataIndex: 'actualPrice',
                        scopedSlots: {customRender: 'actualPrice'},
                        align: 'left',
                        width: '8%',
                      },
                    ]
                  },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: { customRender: 'action' },
                        align: 'center',
                        width:'100px',
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
                sendData:{
                    platform:1,
                    areaId:'',
                    cityId:'',
                    communityId:'',
                    townId:'',
                    deptId:'',
                    fuzzyKeyword:'',
                    fuzzyQueryType:0,
                    houseType:'',
                    maintainerId:'',
                    status:'',
                    current:1,
                    size:20,
                    onShelfStatus:'',
                    isSearchCount: 1,                //是否查询总记录数（1.是（默认）；2.否）
                },
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 20,//每页中显示20条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                tableData:[],
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
                                label: '项目名称',
                                value: 3
                            },
                            {
                                label: '门牌号',
                                value: 4
                            },
                          {
                            label: '标签',
                            value: 5
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
                                value: ''
                            },
                            {
                                label: '合租',
                                value: 2
                            },
                            {
                                label: '整租',
                                value: 1
                            },
                            {
                                label: '独栋(集中)',
                                value: 3
                            },
                        ],
                    },
                    {
                        key: 'status',
                        title: '房源状态',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: ''
                            },
                            {
                                label: '空置',
                                value: 1
                            },
                          {
                            label: '租约快到期',
                            value: 2
                          },
                            {
                                label: '租约到期未退',
                                value: 3
                            },
                            {
                                label: '配置',
                                value: 4
                            },
                        ],
                    },
                ],
                lookCentralizedDialog:false,
                shareChildInfoDialog:false,
                houseInfoDialog:false,
                modalTitle:{
                    houseId: '',
                    roomId: '',
                    houseAlias: '',
                    address: '',
                },
                houseAlias:'',
                address:'',
                selectedRowKeys:[],     //选中项houseId
                checkedCount:0,         //选中数量
                showPromtionHistory:false,  //显示历史记录
                houseId:'',
                promotionHistoryDialog:false,   //历史记录
              unOpenDialog:false,       //未开通提醒页面
              clickPlatform:1,
              statusData: [
                {
                  title: '全部',
                  status: undefined,
                  string: 'total',
                  query: null,
                },
                {
                  title: '未上架',
                  status: 0,
                  string: 'notOnShelf',
                  query: 1,
                  color: '#FB4246'
                },
                {
                  title: '上架中',
                  status: 0,
                  string: 'nowOnShelf',
                  query: 2,
                  color: '#FFA036'

                },
                {
                  title: '上架失败',
                  status: 0,
                  string: 'onFailed',
                  query: 5,
                  color: '#FB4246'
                },
                {
                  title: '已上架',
                  status: 0,
                  string: 'onShelf',
                  query: 3,
                  color: '#0A87F8'
                },
                {
                  title: '下架中',
                  status: 0,
                  string: 'underShelf',
                  query: 4,
                  color: '#03C683'
                },
                {
                  title: '下架失败',
                  status: 0,
                  string: 'offFailed',
                  query: 6,
                  color: '#FB4246'
                },
              ],
              statusActiveIndex:0,
              checkAllFlag:false,
              oneKeyPutDialog:false,
              oneKeyPutTile:'上架房源',
              oneKeyPutType:1,  //1、上架；2、下架
              synchronizationWarnDialog:false,
              loadingDialog:false,
              isRefresh:false,
              permissionList:[],
            }
        },
        created() {
            this.promotionListPlatform(true);
            this.initData();
            this.initPermission();
        },
        provide() {
            return {
                reloadHouseDiagram: this.initData
            };
        },
        methods: {
          initPermission(){
            //资源权限集合：1、上架；2、下架；3、上/下架历史记录
            this.permissionList = [];
            let permissions = JSON.parse(sessionStorage.getItem('permissions'));
            let markArr = [];
            let btnArr = [];
            markArr.push('mk_extension_promotion_sj');
            markArr.push('mk_extension_promotion_xj');
            markArr.push('mk_extension_promotion_lsjl');
            //判断资源权限
            markArr.forEach(ele => {
              permissions.some(function(value){
                if (ele == value.mark){
                  if(value.mark == 'mk_extension_promotion_sj'){
                    btnArr.push('1');
                  }else if(value.mark == 'mk_extension_promotion_xj'){
                    btnArr.push('2');
                  }else if(value.mark == 'mk_extension_promotion_lsjl'){
                    btnArr.push('3');
                  }
                  return true;
                }
              });

            });

            this.permissionList = btnArr;
          },
          isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
            if(this.isRefresh){
              this.initData();
            }
            this.lookCentralizedDialog = false;
            this.shareChildInfoDialog = false;
            this.houseInfoDialog = false;
            this.isRefresh = false
          },
          deleteSuccess(){
            this.lookCentralizedDialog = false;
            this.houseInfoDialog = false;
            setTimeout(()=>{
              this.initData();
            },500);
          },
          refreshinfoFun(res){  //详情有改变的操作  就改变状态
            if(res){
              this.isRefresh = res
            }
          },
          synchronizationPlatform(){
            if(this.currentPlatform==1||this.currentPlatform==2||this.currentPlatform==4){
              this.loadingDialog = true;
              setTimeout(()=>{
                this.loadingDialog = false;
                //刷新页面
                this.initData();
              },3000);

            }
            else if(this.currentPlatform==3||this.currentPlatform==5){
              //后端同步数据
              let parameter = {
                platform:this.currentPlatform,
              }
              API.promotionHouseRefreshStatus(parameter).then(res => {
              });
              this.synchronizationWarnDialog = true;
            }

          },
          synSuccess(){
            this.synchronizationWarnDialog = false;
            //刷新统计及列表
            this.initData();
          },
          openOneKeyPut(val){
            this.oneKeyPutType = val;
            if(val==1){
              this.oneKeyPutTile = '上架房源';
            }
            else{
              this.oneKeyPutTile = '下架房源';
            }
            this.oneKeyPutDialog = true;
          },
          cancelOneKeyPut(){
            this.oneKeyPutDialog = false;
          },
          oneKeyPutSuccess(){
            this.oneKeyPutDialog = false;
            this.checkAllFlag = false;
            //刷新统计及列表
            this.initData();
          },
          selectAllHouse(e){
            if(!e.target.checked){
              this.selectedRowKeys = [];
              this.checkedCount = 0;
            }
            let plainOptions = [];
            this.tableData.forEach((item)=>{
              plainOptions.push(item.houseId)
            });
            Object.assign(this, {
              selectedRowKeys: e.target.checked ? plainOptions : [],
              checkAllFlag: e.target.checked,
            });
          },
          changeStatus(option) {
            this.sendData.current = 1;
            this.pagination.current = 1;
            if(this.sendData.onShelfStatus!=option.query){
              this.selectedRowKeys = [];
              this.checkedCount = 0;
            }
            this.sendData.onShelfStatus = option.query;
            //刷新列表
            this.listPromotionHouse();
          },
          goToConfig(platform){
            this.unOpenDialog = false;
            this.$emit('goToConfig',platform);
          },
          cancelOpen(){
            this.unOpenDialog = false;
          },
          openSuccess(){
            this.unOpenDialog = false;
            this.currentPlatform = this.clickPlatform;
            this.sendData.platform = this.currentPlatform;
            //开通成功后，刷新 平台列表、及数据统计、数据列表
            this.promotionListPlatform();
            this.initData();
          },
          changeCurrentPlatform(item){
            if(item.platform!=1&&item.status == 0){
              //未开通58
              this.clickPlatform = item.platform;
              this.unOpenDialog = true;
            }
            else{
              if(this.currentPlatform == item.platform){
                //若是当前点击的是当前平台，不刷新
                return ;
              }
              this.currentPlatform = item.platform;
              this.sendData.platform = this.currentPlatform;
              let title = '';
              if(this.currentPlatform == 1){
                title = '官网/官微推广状态';
              }
              else if(this.currentPlatform == 2){
                title = '58租房推广状态';
              }
              else if(this.currentPlatform == 3){
                title = '58公寓馆推广状态';
              }
              else if(this.currentPlatform == 4){
                title = '闲鱼租房推广状态';
              }
              else if(this.currentPlatform == 5){
                title = '贝壳租房推广状态';
              }
              this.tableColumns[0].children[0].title = title;
              this.sendData.onShelfStatus = '';
              this.$refs.topStatus.changeCurrentActiveIndex(0);
              this.initData();
            }
          },
          promotionListPlatform(){
            this.headLoading = true;
            API.promotionListPlatform().then(res => {
              if (res&&res.code === "200") {
                if(res.data == null){
                  this.platformList = [];
                }else{
                  this.platformList = res.data;
                }
              }
              this.headLoading = false;
            })
          },
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            //1、整租；2、合租；3、集中
                           if(record.houseType == 1){
                               this.houseInfoDialog = true;
                               this.modalTitle = {
                                   houseId: record.houseId,
                                   houseAlias: record.houseAlias,
                                   address: record.fullAddress,
                                   housePid: record.housePid,
                               }
                               this.houseAlias = record.houseAlias;
                               this.address = record.cityName+record.areaName+record.fullAddress;
                           } else if(record.houseType == 2){
                               this.shareChildInfoDialog = true;
                               this.modalTitle = {
                                   roomId: record.houseId,
                                   houseAlias: record.houseAlias,
                                   address: record.fullAddress,
                                   housePid:record.housePid,
                               }
                               this.houseAlias = record.houseAlias;
                               this.address = record.cityName+record.areaName+record.fullAddress;

                           } else if(record.houseType == 3){
                               this.lookCentralizedDialog = true;
                               this.modalTitle = {
                                   roomId: record.houseId,
                                   fullAddress:record.fullAddress,
                                   buildingProjectId:record.buildingProjectId,
                                   housePid: record.housePid,
                               }
                               this.houseAlias = record.houseAlias;
                               this.address = record.cityName+record.areaName+record.fullAddress;
                           }
                        }
                    }
                }
            },
            //***表格相关**//
            onSelectChange(selectedRowKeys) {
                //表格选中项发生变化时的回调
                this.selectedRowKeys = selectedRowKeys;
                this.checkedCount = selectedRowKeys.length;
                //先清空，再添加，防止添加重复
                if (selectedRowKeys.length > 0) {
                    this.layerChange(1);
                } else {
                    this.layerChange(-1);
                }
                if(this.checkedCount == 0){
                  this.checkAllFlag = false;
                }
                if(this.checkedCount>0&&this.checkedCount < this.pagination.total){
                  this.checkAllFlag = false;
                }
                if(this.checkedCount == this.pagination.total){
                  this.checkAllFlag = true;
                }
            },
            //***其他***//
            cancelOption() {
                //取消选中，取消相关操作
                this.selectedRowKeys = [];
                //清除操作图层
                this.layerChange(-1);
            },
            layerChange(index) {
                let checkOptionDoc = document.getElementById("checkOption");
                if (checkOptionDoc != null) {
                    document.getElementById("checkOption").style.zIndex = index;
                }
            },
            putOn(houseId){
                let platformList = [];
                platformList.push(this.currentPlatform);
                let houseIdList = [];
                houseIdList.push(houseId);
                let parameter = {
                    houseIdList:houseIdList,
                    platformList:platformList,
                };
              this.$message.info('操作成功，请在5分钟后操作「同步发布状态」查看上架信息');
                API.promotionHouseListPutOn(parameter).then(res => {
                });
            },
            offShelf(houseId){
                let platformList = [];
                platformList.push(this.currentPlatform);
                let houseIdList = [];
                houseIdList.push(houseId);
                let parameter = {
                    houseIdList:houseIdList,
                    platformList:platformList,
                };
              this.$message.info('操作成功，请在5分钟后操作「同步发布状态」查看下架信息');
                API.promotionHouseListOffShelf(parameter).then(res => {
                });
            },
            promotionHistory(houseId){
                this.houseId = houseId;
                this.promotionHistoryDialog = true;
            },
            changeAddress(address){
              this.address = address;
            },
            changeTitle(houseAlias,address){
                this.houseAlias = houseAlias;
                if(address) {
                    this.address = address;
                }
            },
            initData() {
                this.selectedRowKeys = [];
                this.checkedCount = 0;
                this.statusStatPromotionHouse();
                this.listPromotionHouse();
            },
          statusStatPromotionHouse(){
            API.statusStatPromotionHouse(this.sendData).then(res => {
              if (res&&res.code === "200") {
                let conut = res.data;
                for (let item of this.statusData) {
                  item.status = conut[item.string];
                }
              }
            })
          },
          listPromotionHouse(){
            this.spinLoading = true;
            API.listPromotionHouse(this.sendData).then(res => {
              if (res&&res.code === "200") {
                if(res.data == null){
                  this.tableData = [];
                }else{
                  this.tableData = res.data.records;
                  this.pagination.total = res.data.total;
                  this.tableData.forEach((item, index)=>{
                    item.index = index + 1;
                    //全选重新代入
                    if(this.checkAllFlag){
                      this.selectedRowKeys.push(item.houseId);
                      this.checkedCount = this.selectedRowKeys.length;
                    }
                  });
                }
              }
              this.spinLoading = false;
            })
          },
            handleTableChange(pagination) {
                this.pagination.current = pagination.current;
                this.pagination.pageSize = pagination.pageSize;
            },
            onSizeChange(current) {
                this.sendData.current = current;
                this.initData();
            },
            onShowSizeChange(current, pageSize) {
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.pagination.pageSize = pageSize;
                this.initData();
            },
            assetsFormData(data) {
                this.searchVisible = false;
                this.sendData.fuzzyQueryType = data.fuzzyQueryType;
                this.sendData.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData.deptId = data.deptId;
                this.sendData.maintainerId = data.maintainerId;
                this.sendData.status = data.status;
                this.sendData.houseType = data.houseType;
                this.sendData.cityId = data.cityId;
                this.sendData.areaId = data.areaId;
                this.sendData.townId = data.townId;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.initData();
            },
        },
        filters: {

        },
        watch:{
          selectedRowKeys() {
          },
        },
    }

</script>

<style lang="less" scoped>
.extension-promotion-box{
    .platFormStyle{
        min-width: 1250px;
        height: 75px;
        background:rgba(255,255,255,1);
        margin: 0 14px;
        padding-top: 10px;
        border-bottom: 8px solid #F6F7F8;
        position: relative;
        .warningStyle_58{
          position: absolute;
          right: -14px;
          height: 47px;
          background-color: fade(#FFA036, 10%);
          border-radius: 5px 0px 0px 5px;
          width: 250px;
          font-size: 12px;
          color: #FFA036;
          padding: 7px 0;
          .iconStyle{
            width: 34px;
            padding-left: 14px;
            i{
              vertical-align: -0.3em;
            }
            svg{
              width: 16px;
              height: 16px;
            }
          }
          .fontStyle{
            width:calc(100% - 34px);
            padding-right: 10px;
          }
        }
        .singlePlatFormStyle{
            width:144px;
            height:47px;
            border-radius:5px;
            margin-right: 15px;
            .pic{
                width: 56px;
                height: 47px;
                line-height: 45px;
                text-align: center;
                img{
                    width:44px;
                    height:44px;
                }
              svg{
                width: 44px;
                height: 44px;
              }
            }
            .fontStyle{
                padding: 5px 0;
              svg{
                width: 14px;
                height: 14px;
              }
            }
        }
        .unClickStyle{
          background:rgba(246,247,248,1);
          border: rgba(246,247,248,1);
        }
        .clickStyle{
          background:#ffffff;
          border:1px solid rgba(10,135,248,1);
        }
        .openStyle-font2{
          color: #0A87F8;
          font-size: 12px;
        }
        .openStyle-font1{
          color: #111111;
          font-size: 14px;
          font-weight:500;
        }
        .unOpenStyle-font2{
          color: #777777;
          font-size: 12px;
        }
        .unOpenStyle-font1{
          color: #777777;
          font-size: 14px;
          font-weight:500;
        }
    }
    .topTitleDesc{
        font-size:14px;
        color:rgba(17,17,17,1);
        margin-left: 14px;
    }
  .synchronizationStyle{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color:#0A87F8;
    i{
      vertical-align: -0.32em;
    }
    svg{
      width: 20px;
      height: 20px;
    }
  }
    .table{
      min-width:1200px;
      ::-webkit-scrollbar{
        width: 1px;
      }
      //对勾不居中bug修复
      /deep/ .ant-checkbox-inner::after{
        left: 22%;
      }
      /deep/ .ant-checkbox-indeterminate .ant-checkbox-inner::after{
        left:50% !important;
      }
      min-width: 1250px;
        padding: 0 14px;
        position:relative;
        .checkOption {
            .fontSpacing {
                margin-left: 3px;
                margin-right: 3px;
            }
            position: absolute;
            z-index: -1;
            background-color: #fafafa;
            height: 91px;
            margin-top: 1px;
            margin-left: 64px;
            line-height: 91px;
            width: calc(100% - 100px);
            .dealOption {
                float: left;
                .headSpan {
                    color: #111111;
                    margin-left: 14px;
                    font-size: 14px;
                }
                .unPermissionStyle{
                  font-size: 12px;
                  color: #FFA036;
                }
            }
            .cancelOption {
                font-size: 14px;
                margin-right: 20px;
                float: right;
            }
            .themeColor{
                color: #0A87F8;
            }
        }
        .IconRadius {
            margin-top: 7.5px;
            margin-right: 5px;
            width: 6px;
            height: 6px;
            border-radius: 4px;
        }
        .tableBase{
            height: 28px;
            line-height: 28px;
        }
        .littlePic{
            img{
                width:28px;
                height:28px;
            }
        }
        .kongzhi{
            background-color:#FB4246;
        }
        .yizu {
            background-color:#03C683;
        }
        .peizhi {
            background-color: #FFA036;
        }
      .fontProhibit {
        .prohibitBg0 {
          background: #FB4246;
        }
         .prohibitBg1 {
           background: #FFA036;
         }
        .prohibitBg2 {
          background: #03C683;
        }
        .prohibitBg3 {
          background: #0A87F8;
        }
      }
      .fontProhibitColor {
        color: #111111;
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
        .contFoot {
            margin-top: 0px;
            width: 100%;
            height: 56px;
          line-height: 56px;
            margin-right: 20px; // position: absolute;
            // bottom: 0px;
            // right: 0;
            background-color: #fff;
          .contFootSvgStyle{
            i{
              vertical-align: -0.2em;
            }
            svg{
              width: 16px;
              height: 16px;
            }
          }
        }
        & /deep/ .ant-table-thead>tr {
            height: 46px;
        }
        & /deep/ .ant-table-thead>tr>th{
            padding: 7px 9px;
        }
        & /deep/ .ant-table-tbody>tr>td {
            padding: 8px 9px;
            &:not(:first-child) {
                cursor: pointer;
            }
        }
    }
    /deep/ .ant-table-body{
        max-height: calc(100vh - 300px);
    }
}
</style>
