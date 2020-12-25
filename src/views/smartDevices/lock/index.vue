<template>
  <div class="lock-box">
    <div class="loadingCircle" id="loadingCircle" v-show="spinLoading"></div>
    <div class="add-btn-wrap" @click="addLock()" v-mark="['mk_smartDevices_doorLoc_bd']">
      <icon-font type="iconyumengtubiao_tianjia" /> 批量绑锁
    </div>
    <content-top>
      <div class="status-box f-fl">
        <div class="status">
          <p :class="{ active: activeIndex === 0 }" @click="changeStatus(null,0)">
            <span >{{ statusData[0].title }}</span>
          </p>
          <p :class="{ active: activeIndex === 1 }" @click="changeStatus(1,1)">
            <span >{{ statusData[1].title }}</span>
            <span :style="{ color: statusData[1].color }">({{ statusData[1].status }})</span>
          </p>
          <p style="cursor:auto">[</p>
          <p :class="{ active: activeIndex === 2 }" @click="changeStatus(9,2)">
            <span >{{ statusData[2].title }}</span>
            <span :style="{ color: statusData[2].color }">({{ statusData[2].status }})</span>
          </p>
          <p style="cursor:auto">]</p>
          <p :class="{ active: activeIndex === 3 }" @click="changeStatus(2,3)">
            <span >{{ statusData[3].title }}</span>
            <span :style="{ color: statusData[3].color }">({{ statusData[3].status }})</span>
          </p>
        </div>
      </div>
      <div class="search-box f-fr">
        <search-dialog ref="searchDialogId" placeholder="房源编号/房源地址/项目地址/门锁序列号" :showCityTown="true" :searchList="searchList" @search="assetsFormData"></search-dialog>
      </div>
    </content-top>
    <content-main>
      <skeleton-lock-list v-show="spinLoading"></skeleton-lock-list>
      <div class="table" v-show="!spinLoading">
        <div class="checkOption" v-show="checkedCount > 0" id="checkOption">
          <div class="dealOption">
            <span class="headSpan">已选中
              <span class="themeColor">{{checkedCount}}</span> 项
              <a-divider type="vertical" />
            </span>
            <span class="cursor" @click="batchUnBind">
              <span class="themeColor"><icon-font type="iconjiechu"></icon-font></span>
              <span class="themeColor" style="margin-left: 6px">批量解绑</span>
            </span>
          </div>
          <div class="themeColor cancelOption cursor">
            <span @click="cancelOption ">取消选择</span>
          </div>
        </div>
        <a-table rowKey="id" :bordered="true" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
          <div slot="onlineStatusName" slot-scope="text">
            <div v-if="text=='在线'" class="fontNormal clearfix">
              <div class="IconRadius onLine f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">{{ text }}</span>
              </div>
            </div>
            <div v-else class="fontNormal clearfix">
              <div class="IconRadius offLine f-fl"></div>
              <div class="f-fl">
                <span type="primary" style="color: #111111">{{ text }}</span>
              </div>
            </div>
          </div>
          <div slot="power" slot-scope="text">
            <div v-if="text==101">- </div>
            <div v-else-if="text>=20">正常</div>
            <div v-else style="color: #FB4246;">电量预警</div>
          </div>
          <div slot="sn" slot-scope="text">
            {{text?text:'-'}}
          </div>
          <div slot="brand" slot-scope="text">
            {{text==0?'普通门锁':text==1?'云丁':text==2?'果加':text==3?'蜂电':'-'}}
          </div>
          <div slot="fullAddress" slot-scope="text,record">
            <a-popover>
              <template slot="content">
                <p style="padding: 8px 18px;">
                  <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                </p>
              </template>
              <div class="f-fl" style="width:375px;" type="primary">
                <p class="overHidde" style="line-height:22px;">
                  <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                </p>
              </div>
            </a-popover>
          </div>
          <div slot="action" slot-scope="text, record">
            <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
                <template slot="content" >
                  <div v-if="record.btnArr.indexOf('1') != -1" class="action cursor" @click="getTempPassword(record)">获取临时密码</div>
                  <div v-if="record.btnArr.indexOf('2') != -1" class="action cursor" @click="goToGivePassword(record)">授权密码</div>
                  <div v-if="record.btnArr.indexOf('3') != -1" class="action cursor" @click="getPassword(record)">查看密码</div>
                  <div v-if="record.btnArr.indexOf('4') != -1" class="action cursor" @click="editPassword(record)">修改密码</div>
                  <div v-if="record.btnArr.indexOf('5') != -1" class="action cursor" @click="unBindLock(record)">解绑</div>
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
    <!-- 绑定门锁 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1300px" v-model="batchBindLockDialog" class="ownModalBorder titDialog" title="绑定门锁">
      <batch-bind-lock @goToBindAccount="goToBindAccount" @cancelBind="cancelBind" @bindComplete="bindComplete"></batch-bind-lock>
    </a-modal>
    <!-- 失败房源的批量绑锁 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="failureBindLockDialog" class="ownModalBorder titDialog" title="绑定失败的房源">
      <failure-bind-lock :bindLockResult="bindLockResult" :bindLockBrand="bindLockBrand" :bindLockAuthAccountId="bindLockAuthAccountId" @goToBindAccount="goToBindAccount" @cancelBind="cancelBind" @bindComplete="bindComplete"></failure-bind-lock>
    </a-modal>
    <!-- 绑定门锁结果 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bindLockResultDialog" class="ownModalBorder titDialog" title="绑锁结果" @cancel="closeBindResult()">
      <bind-lock-result :bindLockResult="bindLockResult" @closeThis="closeBindResult()" @viewFailHouseList="viewFailHouseList()"></bind-lock-result>
    </a-modal>
    <!-- 授权密码 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="givePasswordDialog" class="ownModalBorder titDialog" title="密码授权">
      <give-password :brand="brand" :lockId="lockId" :lockInfo="lockInfo" @cancelGive="cancelGive" @giveSuccess="giveSuccess"></give-password>
    </a-modal>
    <!-- 门锁详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="lockDetailsDialog" class="ownModalBorder titDialog" title="门锁详情">
      <lock-details :lock-id="lockId" @unBindSuccess="unBindSuccess"></lock-details>
    </a-modal>
    <!-- 查看密码/临时密码 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="getPasswordDialog" class="ownModalBorder titDialog" :title="getPasswordTitle">
      <view-password :lock-id="lockId" :fullAddress="getPasswordAddress" :brand="brand" @closeThis="closeView"></view-password>
    </a-modal>
    <!-- 修改密码 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="editPasswordDialog" class="ownModalBorder titDialog" title="修改门锁密码">
      <edit-password :lock-id="lockId"  @closeThis="closeEdit" @editPasswordSuccess="editPasswordSuccess"></edit-password>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import SkeletonLockList from '../../skeleton/smartDevices/lockList';
import SearchDialog from '@/components/SearchDialog';
import BatchBindLock from './batchBindLockNew';
import GivePassword from './givePassword';
import LockDetails from './lockDetails';
import ViewPassword from './viewPassword';
import EditPassword from './editPassword';
import BindLockResult from './bindLockResult';
import FailureBindLock from './failureBindLock';
import * as API from '@/api/smartDevices';
export default {
  name: "index",
  components: {
    SkeletonLockList,
    SearchDialog,
    BatchBindLock,
    GivePassword,
    LockDetails,
    ViewPassword,
    EditPassword,
    BindLockResult,
    FailureBindLock,
  },
  data() {
    let beforeThirtyDayTime = Vue.prototype.$moment().startOf('day').add(-29, 'days').valueOf();
    let beforeTwoDayTime = Vue.prototype.$moment().startOf('day').add(-2, 'days').valueOf();
    let todayBeginTime = Vue.prototype.$moment().startOf('day').valueOf();
    let todayEndTime = Vue.prototype.$moment().endOf('day').valueOf();
    return{
      spinLoading:false,
      activeIndex:0,
      sendData:{
        current:1,
        size:20,
        onlineStatusType:'',     //在线状态类型（1：在线；2：离线；9：在线但电量低；）
        fuzzyQueryType:'',
        fuzzyKeyword:'',
        bindTimeBegin:'',
        bindTimeEnd:'',
        brand:'',
        houseType:'',
      },
      statusData: [
        {
          title: '全部',
          status: 0,
          string: 'dataTotal',
          query: null,
        },
        {
          title: '在线 ',
          status: 0,
          string: 'onlineTotal',
          query: 1,
          color: '#0A87F8'
        },
        {
          title: '电量预警',
          status: 0,
          string: 'onlineLowPowerTotal',
          query: 12,
          color: '#FB4246'
        },
        {
          title: '离线',
          status: 0,
          string: 'offlineTotal',
          query: 9,
          color: '#777777'
        },
      ],
      searchList:[
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
              label: '项目地址',
              value: 3
            },
            {
              label: '门锁序列号',
              value: 4
            },
          ],
        },
        {
          key: 'brand',
          title: '门锁类型',
          currentActiveIndex: 0,
          list: [
            {
              label: '全部',
              value: null
            },
            {
              label: '普通智能门锁',
              value: 0
            },
            {
              label: '云丁',
              value: 1
            },
            {
              label: '果加',
              value: 2
            }
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
              label: '合租',
              value: 2
            },
            {
              label: '整租',
              value: 1
            },
            {
              label: '独栋',
              value: 3
            }
          ],
        },
        {
          key: ['bindTimeBegin', 'bindTimeEnd'],
          title: '绑锁时间',
          currentActiveIndex: 0,
          list: [
            {
              label: '不限',
              value: ['', '']
            },
            {
              label: '今天',
              value: [todayBeginTime, todayEndTime]
            },
            {
              label: '7天内',
              value: [beforeTwoDayTime, todayEndTime]
            },
            {
              label: '30天内',
              value: [beforeThirtyDayTime, todayEndTime]
            },
            {
              label: '自定义',
              value: ['', '']
            }
          ],
        },
        {
          key: 'unlockedDays',
          title: '门锁提醒',
          currentActiveIndex: 0,
          list: [
            {
              label: '不限',
              value: null
            },
            {
              label: '近3天未开锁',
              value: 3
            },
            {
              label: '近7天未开锁',
              value: 7
            },
            {
              label: '近15天未开锁',
              value: 15
            }
          ],
        },
      ],
      tableColumns: [
        {
          title: '门锁状态',
          dataIndex: 'onlineStatusName',
          key: 'onlineStatusName',
          scopedSlots: { customRender: 'onlineStatusName' },
          align: 'left',
          width: '130px',
        },
        {
          title: '门锁品牌',
          dataIndex: 'brand',
          key: 'brand',
          scopedSlots: { customRender: 'brand' },
          align: 'left',
          width: '150px',

        },
        {
          title: '门锁电量',
          dataIndex: 'power',
          key: 'power',
          scopedSlots: { customRender: 'power' },
          align: 'left',
          width: '150px',
        },
        {
          title: '设备序列号/编码',
          key: 'sn',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
          align: 'left',
          width: '250px',
        },
        {
          title: '已绑房源地址',
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
          width: '110px',
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
      tableData:[],
      selectedRowKeys:[],
      checkedCount:0,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      batchBindLockDialog:false,
      givePasswordDialog:false,
      lockId:'',
      brand:0,
      lockDetailsDialog:false,
      editPasswordDialog:false,
      getPasswordDialog:false,
      getPasswordTitle:'查看密码',
      getPasswordAddress:'',
      bindLockResultDialog:false,
      bindLockResult:{},
      bindLockBrand:0,
      bindLockAuthAccountId:'',
      failureBindLockDialog:false,
      lockInfo:{},
    }
  },
  created() {
  },
  mounted() {
    let initString = ''
    switch (this.$route.params.search) {
      case 'all':
        initString = 'all';
        break;
      case 'online':
        initString = 'online';
        break;
      case 'onlineLowPower':
        initString = 'onlineLowPower';
        break;
      case 'offline':
        initString = 'offline';
        break;
      case 'threeDaysUnlocked':
        initString = 'threeDaysUnlocked';
        break;
    }
    if(initString=='online'){
      this.activeIndex = 1;
      this.sendData.onlineStatusType = 1;
      this.initData();
    }
    else if(initString=='onlineLowPower'){
      this.activeIndex = 2;
      this.sendData.onlineStatusType = 9;
      this.initData();
    }
    else if(initString=='offline'){
      this.activeIndex = 3;
      this.sendData.onlineStatusType = 2;
      this.initData();
    }
    else if(initString=='threeDaysUnlocked'){
      this.$refs.searchDialogId.searchList[4].currentActiveIndex = 1
      this.$refs.searchDialogId.searchDataArr.push({
        title: this.$refs.searchDialogId.searchList[4].title,
        val: this.$refs.searchDialogId.searchList[4].list[1].label,
      })
      this.$refs.searchDialogId.searchData.unlockedDays = 3;
      this.$refs.searchDialogId.confirm();
    }
    else{
      this.initData();
    }
  },
  methods: {
    editPasswordSuccess(){
      this.editPasswordDialog = false;
    },
    closeEdit(){
      this.editPasswordDialog = false;
    },
    closeView(){
      this.getPasswordDialog = false;
    },
    editPassword(record){
      this.lockId = record.id;
      this.editPasswordDialog = true;
    },
    getTempPassword(record){
      this.brand = record.brand;
      this.lockId = record.id;
      this.getPasswordDialog = true;
      this.getPasswordTitle = '临时密码';
    },
    getPassword(record){
      this.brand = record.brand;
      this.lockId = record.id;
      this.getPasswordAddress = record.fullAddress;
      this.getPasswordDialog = true;
      this.getPasswordTitle = '查看密码';
    },
    unBindSuccess(){
      this.lockDetailsDialog = false;
      this.initData();
    },
    cancelGive(){
      this.givePasswordDialog = false;
    },
    giveSuccess(){
      this.givePasswordDialog = false;
      //云丁，授权密码需要延迟2s
      if(this.brand == 1){
        setTimeout(()=>{
          this.initData();
        },2000)
      }
      else{
        this.initData();
      }
    },
    //批量解绑
    batchUnBind(){
      let _this = this;
      let idList = this.selectedRowKeys;
      this.$modal.confirm({
        title: '确定要将选择的' + this.checkedCount + '个门锁解绑吗？',
        content: '解绑后，该门锁上的授权密码记录将会全部删除',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.doorLockBatchUnbind({idList:idList}).then(res => {
            if (res.code == 200) {
              _this.$message.success('批量解绑成功！');
              _this.initData();
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    //***其他***//
    cancelOption() {
      //取消选中，取消相关操作
      this.selectedRowKeys = [];
      //清除操作图层
      this.layerChange(-1);
    },
    goToGivePassword(record){
      this.lockId = record.id;
      this.brand = record.brand;
      this.givePasswordDialog = true;
      this.lockInfo = record;
    },
    unBindLock(record){
      let _this = this;
      let id = record.id;
      this.$modal.confirm({
        title: '确定要将房源"' + record.fullAddress + '"的门锁解绑吗？',
        content: '解绑后，该门锁上的授权密码记录将会全部删除',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.doorLockUnbind({id:id}).then(res => {
            if (res.code == 200) {
              _this.$message.success('解绑成功！');
              _this.initData();
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    checkOpts(record){
      if(!this.permissions||this.permissions.length==0){
        this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
      }
      let markArr = ['mk_smartDevices_doorLoc_hqlsmm','mk_smartDevices_doorLoc_sqmm','mk_smartDevices_doorLoc_seemm','mk_smartDevices_doorLoc_xgmm','mk_smartDevices_doorLoc_jb'];
      let btnArr = [];
      markArr.forEach(ele => {
        this.permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_smartDevices_doorLoc_hqlsmm'&&(record.brand==1||record.brand==2)){
              btnArr.push('1');
            }
            if(value.mark == 'mk_smartDevices_doorLoc_sqmm'&&(record.brand==1||record.brand==2)){
              btnArr.push('2');
            }
            if(value.mark == 'mk_smartDevices_doorLoc_seemm'&&record.brand==0){
              btnArr.push('3');
            }
            if(value.mark == 'mk_smartDevices_doorLoc_xgmm'&&record.brand==0){
              btnArr.push('4');
            }
            else if(value.mark == 'mk_smartDevices_doorLoc_jb'){
              btnArr.push('5');
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
    viewFailHouseList(){
      this.batchBindLockDialog = false;
      //打开绑锁失败房源
      this.failureBindLockDialog = true;
    },
    closeBindResult(){
      this.batchBindLockDialog = false;
      this.bindLockResultDialog = false;
      this.failureBindLockDialog = false;
      this.bindLockResult = {};
      this.initData();
    },
    bindComplete(bindLockResult,bindLockBrand,bindLockAuthAccountId){
      this.bindLockResultDialog = true;
      this.bindLockResult = bindLockResult;
      this.bindLockBrand = bindLockBrand;
      this.bindLockAuthAccountId = bindLockAuthAccountId;
    },
    cancelBind(){
      this.batchBindLockDialog = false;
      this.failureBindLockDialog = false;
    },
    goToBindAccount(val){
      this.batchBindLockDialog = false;
      this.failureBindLockDialog = false;
      //跳转至账号管理
      this.$router.push({ name: 'account', params: { bindType: val }})
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
    },
    layerChange(index) {
      let checkOptionDoc = document.getElementById("checkOption");
      if (checkOptionDoc != null) {
        document.getElementById("checkOption").style.zIndex = index;
      }
    },
    openDetail(record){
      return {
        on: {
          click: () => {
            this.lockId = record.id;
            this.lockDetailsDialog = true;
          }
        }
      }
    },
    addLock(){
      this.batchBindLockDialog = true;
    },
    assetsFormData(data){
      this.sendData.fuzzyQueryType = data.fuzzyQueryType;
      this.sendData.fuzzyKeyword = data.fuzzyKeyword;
      this.sendData.cityId = data.cityId;
      this.sendData.areaId = data.areaId;
      this.sendData.townId = data.townId;
      this.sendData.deptId = data.deptId;
      this.sendData.maintainerId = data.maintainerId;
      this.sendData.brand = data.brand;
      this.sendData.houseType = data.houseType;
      this.sendData.bindTimeBegin = data.bindTimeBegin;
      this.sendData.bindTimeEnd = data.bindTimeEnd;
      this.sendData.unlockedDays = data.unlockedDays;
      this.sendData.current = 1;
      this.pagination.current = 1;
      this.initData();
    },
    onSizeChange(current) {
      this.sendData.current = current;
      this.pagination.current = current;
      this.initData();
    },
    onShowSizeChange(current, pageSize) {
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.initData();
    },
    initData(){
      //清空选择项
      this.selectedRowKeys = [];
      this.checkedCount = 0;
      this.doorLockListStat();
      this.doorLockList();
    },
    doorLockListStat(){
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      sendData.status = '';
      API.doorLockListStat(sendData).then(res => {
        if (res.code === '200') {
          let count = res.data;
          for (let item of this.statusData) {
            item.status = count[item.string];
          }
        }
      })
    },
    doorLockList(){
      this.spinLoading = true;
      API.doorLockList(this.sendData).then(res => {
        if (res&&res.code === "200") {
          const checkRes = res.data;
          this.tableData = checkRes.records;
          this.pagination.total = res.data.total;
        }
        this.spinLoading = false;
      })
    },
    changeStatus(status,index){
      if(this.activeIndex == index){
        return ;
      }
      else{
        this.sendData.current = 1;
        this.pagination.current = 1;
        this.activeIndex = index;
        this.sendData.onlineStatusType = status;
        this.doorLockList();
      }
    },
  },
  filters: {
  },
}
</script>

<style scoped lang="less">
  .lock-box{
    .content-top {
      min-width: 1300px; // overflow: hidden;
    }
    .status-box{
      .status {
        display: flex;
        .active {
          color: #0A87F8;
          border-bottom: 2px solid #0A87F8;
        }
        &>p {
          box-sizing: border-box;
          margin-right: 20px;
          height: 50px;
          line-height: 50px;
          cursor: pointer;
          .leftLine{
            border-left: 1px dashed #dddddd;
            padding-left: 20px;
          }
        }
      }
    }
    .table{
      min-width: 1200px;
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
      .checkOption {
        .fontSpacing {
          margin-left: 3px;
          margin-right: 3px;
        }
        position: absolute;
        z-index: -1;
        background-color: #fafafa;
        height: 45px;
        margin-top: 1px;
        margin-left: 60px;
        line-height: 45px;
        width: calc(100% - 162px);
        .dealOption {
          float: left;
          .headSpan {
            color: #111111;
            margin-left: 14px;
            font-size: 14px;
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
        .onLine {
          background: #0A87F8;
        }
        .offLine{
          background: #777777;
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
    }
    .contFoot {
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 20px; // position: absolute;
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
      padding: 8px 9px;
    }
    & /deep/ .ant-table-tbody>tr>td {
      padding: 12px 9px;
      &:not(:first-child) {
        cursor: pointer;
      }
    }
    /deep/ .content-main{
      padding: 14px;
    }
    /deep/ .content-main .content{
      padding: 0px;
    }
  }
</style>