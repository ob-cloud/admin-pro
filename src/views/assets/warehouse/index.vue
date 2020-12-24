<template>
  <!-- 库房管理 -->
  <div class="warehouse-box">
    <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
    <div class="add-btn-wrap" @click="goToAdd" v-if="btnArr.indexOf('1') != -1">
      <icon-font type="iconyumengtubiao_tianjia" />添加库房
    </div>
    <content-top>
      <div class="status-box f-fl">
        <top-status :statusData="statusData"></top-status>
      </div>
      <div class="search-box f-fr">
        <search-dialog placeholder="库房名称/库房地址/负责人姓名/负责人电话" :showDeptEmp="false" :showEmployee="false" :showCityTown="true" :showTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
      </div>
    </content-top>
    <content-main>
      <skeleton-warehouse v-show="spinLoading"></skeleton-warehouse>
      <div class="table" v-show="!spinLoading">
        <a-table rowKey="id" :bordered="true" :customRow="openDetail" :pagination="false" :columns="tableColumns" :dataSource="tableData">
          <div slot="cityName" slot-scope="text,record">
            {{record.cityName?record.cityName:'-'}}{{record.areaName?'/'+record.areaName:''}}
          </div>
          <div slot="address" slot-scope="text">
            <a-popover>
              <template slot="content">
                <p style="padding: 8px 18px;">
                  {{text}}
                </p>
              </template>
              <div class="f-fl" style="max-width:350px;position: relative;margin-left:10px;" type="primary">
                <p class="overHidde" style="line-height:22px;">{{text?text:'-'}}</p>
              </div>
            </a-popover>
          </div>
          <div slot="maintainerName" slot-scope="text">
            {{text?text:'-'}}
          </div>
          <div slot="maintainerPhone" slot-scope="text">
            {{text?text:'-'}}
          </div>
          <div slot="action" slot-scope="text, record">
            <a-popover :title="null" trigger="hover" v-if="btnArr.indexOf('2')!=-1||btnArr.indexOf('3')!=-1">
              <template slot="content">
                <div v-if="btnArr.indexOf('2') != -1" @click.stop="goToEdit(record)" class="action cursor">编辑</div>
                <div v-if="btnArr.indexOf('3') != -1" @click.stop="goToDelete(record)" class="action cursor">删除</div>
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
    <!-- 添加库房 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="addWarehouseDialog" class="ownModalBorder titDialog" title="添加库房" @cancel="addWarehouseDialog=false;">
      <add-warehouse @cancelSave="cancelAddWarehouse" @addSuccess="addWarehouseSuccess"></add-warehouse>
    </a-modal>
    <!-- 库房详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="warehouseDetailDialog" class="ownModalBorder titDialog" :title="warehouseDetailTitle" @cancel="isRefreshFun">
      <warehouse-detail :warehouseId="warehouseId" :formType="formType" @refreshinfoFun="refreshinfoFun"  @cancelSave="cancelEditWarehouse" @addSuccess="editWarehouseSuccess" @deleteSuccess="editWarehouseSuccess"></warehouse-detail>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import SearchDialog from '@/components/SearchDialog';
import TopStatus from '@/components/TopStatus/index';
import SkeletonWarehouse from '../../skeleton/assets/warehouse';
import AddWarehouse from './addWarehouse';
import WarehouseDetail from './warehouseDetail';

import  * as API from '@/api/assets';
export default {
  name: "warehouse",
  components: {
    TopStatus,
    SearchDialog,
    SkeletonWarehouse,
    AddWarehouse,
    WarehouseDetail,
  },
  data() {
    let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
    let oneWeekComplete = Vue.prototype.$moment().startOf('day').add(-6, 'days').valueOf();
    let thirtyDayComplete = Vue.prototype.$moment().startOf('day').add(-29, 'days').valueOf();
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
              label: '库房名称',
              value: 1,
            },
            {
              label: '库房地址',
              value: 2,
            },
            {
              label: '负责人姓名',
              value: 3,
            },
            {
              label: '负责人电话',
              value: 4,
            },
          ],
        },
        {
          key: ['createTimeBegin', 'createTimeEnd'],
          title: '创建时间',
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
          title: '库房名称',
          dataIndex: 'name',
          key: 'name',
          align: 'left',
        },
        {
          title: '所在城市/区域',
          dataIndex: 'cityName',
          key: 'cityName',
          align: 'left',
          scopedSlots: { customRender: 'cityName' },
        },
        {
          title: '详细位置',
          dataIndex: 'address',
          key: 'address',
          align: 'left',
          scopedSlots: { customRender: 'address' },
        },
        {
          title: '负责人姓名',
          dataIndex: 'maintainerName',
          key: 'maintainerName',
          align: 'left',
          scopedSlots: { customRender: 'maintainerName' },
        },
        {
          title: '负责人电话',
          key: 'maintainerPhone',
          dataIndex: 'maintainerPhone',
          align: 'left',
          scopedSlots: { customRender: 'maintainerPhone' },
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
          title: '仓库',
          status: 0,
          string: 'allTotal',
          query: null,
        },
      ],
      sendData: {
        current: 1,                     // 当前页数
        size: 10,                       // 每页返回的记录数量
        fuzzyKeyword: '',               // 模糊匹配关键词
        fuzzyQueryType: 0,              //模糊查询类型【0、全部，1、客户姓名，2、客户电话】
        sort: '',                       // 排序字段
        updateTime: '',                 // 修改时间
        isCooperation:'',                //是否合作【1、是；0：否】
        partnerBizMode:'',               //伙伴经营模式（1.分散(合/整租)；2.集中)
      },
      spinLoading:true,
      permissions:[],
      btnArr:[],
      addWarehouseDialog:false,
      warehouseDetailDialog:false,
      warehouseDetailTitle:'库房详情',
      warehouseId:'',
      formType:1,   //1、详情；2、编辑；3、查看（编辑）
      isRefresh:false,
    }
  },
  created() {
    this.getPermission();
    this.initData();
  },
  methods: {
    cancelEditWarehouse(){
      this.warehouseDetailDialog = false;
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
      this.warehouseDetailDialog = false;
      this.isRefresh = false
    },
    getPermission(){
      //1、新增；2、编辑；3、删除
      if(!this.permissions||this.permissions.length==0){
        this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
      }
      let markArr = ['mk_assets_warehouse_xz','mk_assets_warehouse_bj','mk_assets_warehouse_sc'];
      let btnArr = [];
      //判断资源权限
      markArr.forEach(ele => {
        this.permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_assets_warehouse_xz'){
              btnArr.push('1');
            }else if(value.mark == 'mk_assets_warehouse_bj'){
              btnArr.push('2');
            } else if(value.mark == 'mk_assets_warehouse_sc'){
              btnArr.push('3');
            }
          }
        });
      });
      this.btnArr = btnArr;
    },
    addWarehouseSuccess(){
      this.addWarehouseDialog = false;
      this.initData();
    },
    editWarehouseSuccess(){
      this.warehouseDetailDialog = false;
      this.initData();
    },
    cancelAddWarehouse(){
      this.addWarehouseDialog = false;
    },
    goToAdd(){
      this.addWarehouseDialog = true;
    },
    goToEdit(record){
      this.warehouseDetailDialog = true;
      this.warehouseDetailTitle = '编辑库房信息';
      this.warehouseId = record.id;
      this.formType = 2;
    },
    goToDelete(data){
      let _this = this;
      let id = data.id
      this.$modal.confirm({
        title: '确定要删除 「' + data.name + '」 吗？',
        content: '删除后不可恢复，请谨慎操作',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.warehouseDelete({id:id}).then(res => {
            if (res.code == 200) {
              _this.$message.success('删除成功！');
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
    initData() {
      this.spinLoading = true;
      API.warehouseList(this.sendData).then(res => {
        if (res&&res.code === "200") {
          this.statusData[0].status = res.data.total;
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
      this.sendData.createTimeBegin = data.createTimeBegin;
      this.sendData.createTimeEnd = data.createTimeEnd;
      this.sendData.cityId = data.cityId;
      this.sendData.areaId = data.areaId;
      this.sendData.current = 1;
      this.pagination.current = 1;
      this.initData();
    },
    openDetail(record) {
      return {
        on: {
          click: () => {
            this.warehouseDetailDialog = true;
            this.warehouseDetailTitle = '库房详情';
            this.warehouseId = record.id;
            this.formType = 1;
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
.warehouse-box {
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
  .table {
    min-width: 1200px;
    .action:hover {
      background-color: @themeBgColor;
      color: @themeColor;
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