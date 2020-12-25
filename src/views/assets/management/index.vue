<template>
  <!-- 库房管理 -->
  <div class="management-box">
    <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
    <div class="add-btn-wrap" @click="goToAdd" v-mark="['mk_assets_management_tjwp']">
      <icon-font type="iconyumengtubiao_tianjia" />添加物品
    </div>
    <content-top>
      <div class="status-box f-fl">
        <top-status :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
      </div>
      <div class="f-fr moreStyle cursor">
        <a-popover :title="null" trigger="hover" placement="bottomLeft">
          <template slot="content">
            <div @click="goGoodStatistics" class="action cursor">查看统计</div>
            <div @click="exportExcel" class="action cursor" v-mark="['mk_assets_management_dc']">导出</div>
          </template>
          <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
        </a-popover>
      </div>
      <div class="search-box f-fr" style="margin-right: 10px;">
        <search-dialog placeholder="物品编号/物品型号/物品规格/物品所在地(房源地址/仓库名称)" deptTitle="物品录入人" deptPlaceholder="请选择录入人或录入人所属部门"
                       cityDefaultTitle="物品所在区域" cityPlaceholder="请选择物品所在城市或区域" :showCityTown="true" :showTown="false"
                       ref="searchDialogId" :showGoodsType="true" :searchList="searchList" @search="assetsFormData"></search-dialog>
      </div>
    </content-top>
    <content-main>
      <skeleton-management v-show="spinLoading"></skeleton-management>
      <div class="table" v-show="!spinLoading">
        <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
          <div slot="status" slot-scope="text">
            <div v-if="text==1" class="fontNormal clearfix f-fl">
              <div class="IconRadius status1 f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">闲置</span>
              </div>
            </div>
            <div v-if="text==2" class="fontNormal clearfix f-fl">
              <div class="IconRadius status2 f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">使用中</span>
              </div>
            </div>
            <div v-if="text==3" class="fontNormal clearfix f-fl">
              <div class="IconRadius status3 f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">已报废</span>
              </div>
            </div>
            <div v-if="text==4" class="fontNormal clearfix f-fl">
              <div class="IconRadius status3 f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">遗失</span>
              </div>
            </div>
            <div v-if="text==5" class="fontNormal clearfix f-fl">
              <div class="IconRadius status4 f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">未核对</span>
              </div>
            </div>
            <div v-if="text==6" class="fontNormal clearfix f-fl">
              <div class="IconRadius status4 f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">归属地址异常</span>
              </div>
            </div>
          </div>
          <div slot="goodsName" slot-scope="text">
            {{text|blankVal}}
          </div>
          <div slot="goodsTypeName" slot-scope="text">
            {{text|blankVal}}
          </div>
          <div slot="quantity" slot-scope="text">
            {{text|blankVal}}
          </div>
          <div slot="unitPrice" slot-scope="text">
            {{text?text/100 + '元/件':'-'}}
          </div>
          <div slot="model" slot-scope="text,record">
            {{record.brandName|blankVal}}/{{text|blankVal}}
          </div>
          <div slot="specification" slot-scope="text">
            {{text|blankVal}}
          </div>
          <div slot="ownerTypeName" slot-scope="text">
            {{text|blankVal}}
          </div>
          <div slot="fullAddress" slot-scope="text,record">
            <span v-if="record.locationType==1"><span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{text|blankVal}}</span>
            <span v-else-if="record.locationType==2"> {{record.warehouseName|blankVal}}</span>
            <span v-else>-</span>
          </div>
          <div slot="action" slot-scope="text, record">
            <a-popover :title="null" trigger="hover" v-if="showFlag&&checkOpts(record) == true">
              <template slot="content">
                <div v-if="record.btnArr.indexOf('1') != -1" @click.stop="goDeployment(record)" class="action cursor" >调配</div>
                <div v-if="record.btnArr.indexOf('2') != -1" @click.stop="goEdit(record,0)" class="action cursor" >编辑</div>
                <div v-if="record.btnArr.indexOf('3') != -1" @click.stop="goScrap(record)" class="action cursor" >报废</div>
                <div v-if="record.btnArr.indexOf('4') != -1" @click.stop="goLoss(record)" class="action cursor" >遗失</div>
                <div v-if="record.btnArr.indexOf('6') != -1" @click.stop="goChangeStatus(record)" class="action cursor" >修改状态</div>
                <div v-if="record.btnArr.indexOf('7') != -1" @click.stop="goEdit(record,1)" class="action cursor" >核对信息</div>
                <div v-if="record.btnArr.indexOf('5') != -1" @click.stop="goDelete(record)" class="action cursor" >删除</div>
              </template>
              <div style="width: 100%;height: 100%">
                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
              </div>
            </a-popover>
          </div>
        </a-table>
        <div class="contFoot" v-show="tableData.length>0">
          <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
        </div>
      </div>
    </content-main>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="addGoodDialog" class="ownModalBorder titDialog" :title="addGoodTitle" @cancel="addGoodDialog=false;">
      <add-good :record="record" @cancelSave="cancelSave" @addSuccess="addSuccess"></add-good>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="deploymentDialog" class="ownModalBorder titDialog" title="调配物品" @cancel="deploymentDialog=false;">
      <deployment :record="record" @cancelSave="cancelSave" @deploymentSuccess="addSuccess"></deployment>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="changeStatusDialog" class="ownModalBorder titDialog" title="修改状态" @cancel="changeStatusDialog=false;">
      <change-status :record="record" @cancelSave="cancelSave" @changeStatusSuccess="addSuccess"></change-status>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="lossDialog" class="ownModalBorder titDialog" title="遗失" @cancel="lossDialog=false;">
      <loss :record="record" @cancelSave="cancelSave" @lossSuccess="addSuccess"></loss>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="deleteDialog" class="ownModalBorder titDialog" title="删除" @cancel="deleteDialog=false;">
      <delete :record="record" @cancelSave="cancelSave" @deleteSuccess="addSuccess"></delete>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="scrapDialog" class="ownModalBorder titDialog" title="报废" @cancel="scrapDialog=false;">
      <scrap :record="record" @cancelSave="cancelSave" @scrapSuccess="addSuccess"></scrap>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="detailDialog" class="ownModalBorder titDialog" title="物品详情" @cancel="isRefreshFun">
      <good-detail :record="record" @refreshinfoFun="refreshinfoFun" @deleteAllSuccess="deleteAllSuccess"></good-detail>
    </a-modal>
    <!-- 导出框-->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
      <exportExcel @closeThis="exportExcelShow=false" @saveSure="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="statisticsDialog" class="ownModalBorder titDialog" title="物品统计" @cancel="statisticsDialog=false">
      <good-statistics></good-statistics>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import SearchDialog from '@/components/SearchDialog';
import TopStatus from '@/components/TopStatus/index';
import SkeletonManagement from '../../skeleton/assets/management';
import addGood from './addGood';
import Deployment from './deployment';
import ChangeStatus from './changeStatus';
import Loss from './loss';
import Delete from './delete';
import Scrap from './scrap';
import GoodDetail from './goodDetail';
import GoodStatistics from './statistics';
import  * as API from '@/api/assets';
import {listEnableDict} from '@/api/contract';
import AddGood from "@/views/set/config/decision/addGood";
import exportExcel from '@/components/exportExcel/index';
export default {
  name: "warehouse",
  components: {
    AddGood,
    TopStatus,
    SearchDialog,
    SkeletonManagement,
    addGood,
    Deployment,
    ChangeStatus,
    Loss,
    Delete,
    Scrap,
    GoodDetail,
    GoodStatistics,
    exportExcel,
  },
  data() {
    let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
    let oneWeekComplete = Vue.prototype.$moment().startOf('day').add(-6, 'days').valueOf();
    let thirtyDayComplete = Vue.prototype.$moment().startOf('day').add(-29, 'days').valueOf();
    let oneWeekAfter = Vue.prototype.$moment().startOf('day').add(6, 'days').valueOf();
    let thirtyDayAfter = Vue.prototype.$moment().startOf('day').add(29, 'days').valueOf();
    return {
      searchList: [
        {
          key: 'fuzzyQueryType',
          list: [
            {
              label: '综合检索',
              value: 0,
            },
            {
              label: '物品编码',
              value: 1,
            },
            {
              label: '物品型号',
              value: 2,
            },
            {
              label: '物品规格',
              value: 3,
            },
            {
              label: '物品所在地',
              value: 4,
            },
          ],
        },
        {
          key: 'brandId',
          title: '物品品牌',
          currentActiveIndex: 0,
          list: [],
          type:'select',
          name:'',
          id:undefined,
        },
        {
          key: 'ownerType',
          title: '归属方',
          currentActiveIndex: 0,
          list: [
            {
              label: '全部',
              value: null
            },
            {
              label: '公司',
              value: 1
            },
            {
              label: '业主',
              value: 2
            },
          ],
        },
        {
          key: 'warehouseId',
          title: '所在库房',
          currentActiveIndex: 0,
          list: [],
          type:'select',
          name:'',
          id:undefined,
        },
        {
          key: ['purchaseDateBegin', 'purchaseDateEnd'],
          title: '购入日期',
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
              label: '7天内',
              value: [oneWeekComplete, currentTime]
            },
            {
              label: '30天内',
              value: [thirtyDayComplete, currentTime]
            },
            {
              label: '自定义',
              value: ['', '']
            }
          ],
        },
        {
          key: ['warrantyDateBegin', 'warrantyDateEnd'],
          title: '质保结束日期',
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
              label: '7天内',
              value: [currentTime, oneWeekAfter]
            },
            {
              label: '30天内',
              value: [currentTime, thirtyDayAfter]
            },
            {
              label: '自定义',
              value: ['', '']
            }
          ],
        }
      ],
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
          title: '物品编号',
          dataIndex: 'serialNumber',
          key: 'serialNumber',
          align: 'left',
          scopedSlots: { customRender: 'serialNumber' },
        },
        {
          title: '物品',
          dataIndex: 'goodsName',
          key: 'goodsName',
          align: 'left',
          scopedSlots: { customRender: 'goodsName' },
        },
        {
          title: '物品类型',
          dataIndex: 'goodsTypeName',
          key: 'goodsTypeName',
          align: 'left',
          scopedSlots: { customRender: 'goodsTypeName' },
        },
        {
          title: '数量',
          key: 'quantity',
          dataIndex: 'quantity',
          align: 'left',
          scopedSlots: { customRender: 'quantity' },
        },
        {
          title: '单价',
          key: 'unitPrice',
          dataIndex: 'unitPrice',
          align: 'left',
          scopedSlots: { customRender: 'unitPrice' },
        },
        {
          title: '品牌/型号',
          key: 'model',
          dataIndex: 'model',
          align: 'left',
          scopedSlots: { customRender: 'model' },
        },
        {
          title: '规格',
          key: 'specification',
          dataIndex: 'specification',
          align: 'left',
          scopedSlots: { customRender: 'specification' },
        },
        {
          title: '归属方',
          key: 'ownerTypeName',
          dataIndex: 'ownerTypeName',
          align: 'left',
          scopedSlots: { customRender: 'ownerTypeName' },
        },
        {
          title: '所在地(房源/仓库)',
          key: 'fullAddress',
          dataIndex: 'fullAddress',
          align: 'left',
          scopedSlots: { customRender: 'fullAddress' },
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
        pageSize: 20,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["20", "30", "40", "50"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      statusActiveIndex:0,
      statusData: [
        {
          title: '全部',
          status: 0,
          string: 'allQuantity',
          query: null,
        },
        {
          title: '闲置',
          status: 0,
          string: 'idleQuantity',
          query: 1,
          color: '#FFAF6D'
        },
        {
          title: '使用中',
          status: 0,
          string: 'usingQuantity',
          query: 2,
          color: '#0A87F8'
        },
        {
          title: '已报废',
          status: 0,
          string: 'scrappedQuantity',
          query: 3,
          color: '#777777'
        },
        {
          title: '遗失',
          status: 0,
          string: 'lostQuantity',
          query: 4,
          color: '#777777'
        },
        {
          title: '未核对',
          status: 0,
          string: 'unCheckedQuantity',
          query: 5,
          color: '#FE3C38'
        },
        {
          title: '归属地址异常',
          status: 0,
          string: 'locationAbnormalQuantity',
          query: 6,
          color: '#FE3C38'
        },
      ],
      sendData: {
        current: 1,                     // 当前页数
        size: 20,                       // 每页返回的记录数量
        fuzzyKeyword: '',               // 模糊匹配关键词
        fuzzyQueryType: '',              //模糊查询类型
        cityId:'',
        sort: '',                       // 排序字段
        updateTime: '',                 // 修改时间
        brandId:'',
        goodsIdList:[],
        ownerType:'',
        warehouseId:'',
        purchaseDateBegin:'',
        purchaseDateEnd:'',
        warrantyDateBegin:'',
        warrantyDateEnd:'',
      },
      spinLoading:true,
      permissions:[],
      isRefresh:false,
      addGoodDialog:false,
      addGoodTitle:'添加物品',
      deploymentDialog:false,
      changeStatusDialog:false,
      lossDialog:false,
      deleteDialog:false,
      scrapDialog:false,
      detailDialog:false,
      statisticsDialog:false,
      record:{},
      showFlag:true,
      exportExcelShow:false,
      exportUrl: '/house/assets/list_export',
      exportData:{},
    }
  },
  created() {
    switch (this.$route.params.search) {
      case 'all':
        break;
      case 'ownerType':
        break;
      case 'companyType':
        break;
      case 'idle':
        this.statusActiveIndex = 1;
        break;
    }
    this.getDictionaryList();
    this.warehouseListSimple();
  },
  mounted() {
    let initString = '';
    switch (this.$route.params.search) {
      case 'all':
        initString = 'all';
        break;
      case 'ownerType':
        initString = 'ownerType';
        break;
      case 'companyType':
        initString = 'companyType';
        break;
      case 'idle':
        this.sendData.status = 1;
        initString = 'idle';
        break;
    }
    if(initString=='companyType'){
      this.$refs.searchDialogId.searchList[2].currentActiveIndex = 1
      this.$refs.searchDialogId.searchDataArr.push({
        title: this.$refs.searchDialogId.searchList[2].title,
        val: this.$refs.searchDialogId.searchList[2].list[1].label,
      })
      this.$refs.searchDialogId.searchData.ownerType = 1;
      this.$refs.searchDialogId.confirm();
    }
    else if(initString=='ownerType'){
      this.$refs.searchDialogId.searchList[2].currentActiveIndex = 1
      this.$refs.searchDialogId.searchDataArr.push({
        title: this.$refs.searchDialogId.searchList[2].title,
        val: this.$refs.searchDialogId.searchList[2].list[2].label,
      })
      this.$refs.searchDialogId.searchData.ownerType = 2;
      this.$refs.searchDialogId.confirm();
    }
    else{
      this.initData();
    }
  },
  methods: {
    goGoodStatistics(){
      this.statisticsDialog = true;
    },
    exportExcel(){
      this.exportData = Object.assign({}, this.sendData);
      this.exportExcelShow = true;
    },
    initShowFlag(){
      this.showFlag = false;
      setTimeout(()=>{
        this.showFlag = true;
      },500);
    },
    goDeployment(record){
      this.record = record;
      this.deploymentDialog = true;
      this.initShowFlag();
    },
    goEdit(record,val){
      this.record = record;
      this.record.isChecked = val;  //是否核对信息0否1是
      this.addGoodDialog = true;
      if(val==1){
        this.addGoodTitle = '核对信息';
      }
      else{
        this.addGoodTitle = '修改物品';
      }
      this.initShowFlag();
    },
    goScrap(record){
      this.record = record;
      this.scrapDialog = true;
      this.initShowFlag();
    },
    goLoss(record){
      this.record = record;
      this.lossDialog = true;
      this.initShowFlag();
    },
    goChangeStatus(record){
      this.changeStatusDialog = true;
      this.record = record;
      this.initShowFlag();
    },
    goDelete(record){
      this.deleteDialog = true;
      this.record = record;
      this.initShowFlag();
    },
    checkOpts(record){
      //1、调配；2、编辑；3、报废；4、遗失；5、删除；6、修改状态；7、核对信息
      if(!this.permissions||this.permissions.length==0){
        this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
      }
      let markArr = [];
      let btnArr = [];
      if(record.status==1||record.status==2||record.status==6){
        markArr.push('mk_assets_management_dp')
        markArr.push('mk_assets_management_bjwp');
        markArr.push('mk_assets_management_bf');
        markArr.push('mk_assets_management_ys');
        markArr.push('mk_assets_management_sc');
      }
      else if(record.status==3||record.status==4){
        markArr.push('mk_assets_management_xgzt');
        markArr.push('mk_assets_management_sc');
      }
      else if(record.status==5){
        markArr.push('mk_assets_management_hdxx');
        markArr.push('mk_assets_management_sc');
      }
      //判断资源权限
      markArr.forEach(ele => {
        this.permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_assets_management_dp'){
              btnArr.push('1');
            }else if(value.mark == 'mk_assets_management_bjwp'){
              btnArr.push('2');
            }else if(value.mark == 'mk_assets_management_bf'){
              btnArr.push('3');
            }else if(value.mark == 'mk_assets_management_ys'){
              btnArr.push('4');
            }else if(value.mark == 'mk_assets_management_sc'){
              btnArr.push('5');
            }else if(value.mark == 'mk_assets_management_xgzt'){
              btnArr.push('6');
            }else if(value.mark == 'mk_assets_management_hdxx'){
              btnArr.push('7');
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
    warehouseListSimple(){
      API.warehouseListSimple().then(res => {
        if (res.code == 200) {
          let warehouseList = res.data;
          warehouseList.forEach((item)=>{
            item.showName = item.name;
          });
          this.searchList.forEach((item)=>{
            if(item.key=='warehouseId'){
              item.list = warehouseList;
            }
          });
        }
      })
    },
    getDictionaryList(){
      let id = 'a5837757604d49cd8a64e8bf21d63a2b';
      // 品牌
      listEnableDict(id).then(res => {
        if (res.code == 200) {
          let brandList = res.data;
          brandList.forEach((item)=>{
            item.showName = item.name;
          });
          this.searchList.forEach((item)=>{
            if(item.key=='brandId'){
              item.list = brandList;
            }
          });
        }
      })
    },
    cancelSave(){
      this.addGoodDialog = false;
      this.deploymentDialog = false;
      this.changeStatusDialog = false;
      this.lossDialog = false;
      this.deleteDialog = false;
      this.scrapDialog = false;
    },
    deleteAllSuccess(){
      this.detailDialog = false;
      this.initData();
    },
    addSuccess(){
      this.addGoodDialog = false;
      this.deploymentDialog = false;
      this.changeStatusDialog = false;
      this.lossDialog = false;
      this.deleteDialog = false;
      this.scrapDialog = false;
      this.initData();
    },
    refreshinfoFun(res){  //详情有改变的操作  就改变状态
      if(res){
        this.isRefresh = res
      }
    },
    isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
      if(this.isRefresh){
        this.initData();
      }
      this.detailDialog = false;
      this.isRefresh = false
    },
    goToAdd(){
      this.addGoodDialog = true;
      this.addGoodTitle = '添加物品';
      this.record = {};
    },
    changeStatus(option) {
      this.sendData.current = 1;
      this.pagination.current = 1;
      this.sendData.status = option.query;
      this.assetsList();
    },
    initData() {
      this.getStatusCount();
      this.assetsList();
    },
    getStatusCount() {
      API.assetsStatusStat(this.sendData).then(res => {
        if (res.code === '200') {
          let count = res.data;
          for (let item of this.statusData) {
            item.status = count[item.string];
          }
        }
      })
    },
    assetsList(){
      this.spinLoading = true;
      API.assetsList(this.sendData).then(res => {
        if (res&&res.code === "200") {
          this.tableData = res.data.records;
          this.tableData.forEach((item,index)=>{
            item.num = index + 1;
          });
          this.pagination.total = res.data.total;
        }
        this.spinLoading = false;
      })
    },
    assetsFormData(data) {
      this.searchVisible = false;
      this.sendData.fuzzyQueryType = data.fuzzyQueryType;
      this.sendData.fuzzyKeyword = data.fuzzyKeyword;
      this.sendData.createrId = data.maintainerId;
      this.sendData.cityId = data.cityId;
      this.sendData.areaId = data.areaId;
      this.sendData.goodsIdList = data.goodsIdList;
      this.sendData.brandId = data.brandId;
      this.sendData.ownerType = data.ownerType;
      this.sendData.warehouseId = data.warehouseId;
      this.sendData.purchaseDateBegin = data.purchaseDateBegin;
      this.sendData.purchaseDateEnd = data.purchaseDateEnd;
      this.sendData.warrantyDateBegin = data.warrantyDateBegin;
      this.sendData.warrantyDateEnd = data.warrantyDateEnd;
      this.sendData.current = 1;
      this.pagination.current = 1;
      this.initData();
    },
    openDetail(record) {
      return {
        on: {
          click: () => {
            this.record = record;
            this.detailDialog = true;
          }
        }
      }
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
.management-box {
  .content-top {
    min-width: 1300px;
  }
  .content-main {
    padding: 0;
    & /deep/ .content {
      padding: 0;
      margin: 20px;
    }
  }
  .search-box {
    &/deep/ .ant-input {
      border-radius: 50px;
    }
  }
  .moreStyle{
    & /deep/ .ant-popover {
      .ant-popover-inner-content {
        width: 80px;
        padding: 4px 0;
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
  }
  .table {
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
      .status1 {
        background: rgba(255, 160, 54, 1);
      }
      .status2 {
        background: rgba(10, 135, 248, 1);
      }
      .status3 {
        background: rgba(119, 119, 119, 1);
      }
      .status4{
        background:#FE3C38
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
    margin-right: 20px;
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
}
</style>