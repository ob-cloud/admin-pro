<template>
  <div class="community-box">
    <skeleton-comunity v-show="spinLoading"></skeleton-comunity>
    <div class="table" v-show="!spinLoading">
      <a-table rowKey="id" :customRow="openDetail" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
        <div slot="status" slot-scope="text">
          <div class="IconRadius f-fl aduit" v-if="text==1"></div>
          <div class="IconRadius f-fl reject" v-if="text==2"></div>
          <div class="IconRadius f-fl approved" v-if="text==9"></div>
          <div>
            <span class="auditStatusNameFont">{{text==1?'待审核':text==2?'审核驳回':text==9?'审核通过':'-'}}</span>
          </div>
        </div>
        <div slot="cityName" slot-scope="text,record">
          <span>{{text}}/{{record.areaName}}{{record.townName?'/'+record.townName:''}}</span>
        </div>
        <div slot="action" slot-scope="text, record">
          <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
            <template slot="content">
              <div @click.stop="editCommunity(record)" class="action cursor" v-if="record.btnArr.indexOf('1') != -1">编辑</div>
              <div @click.stop="deleteCommunity(record)" class="action cursor" v-if="record.btnArr.indexOf('2') != -1">删除</div>
            </template>
            <div style="width: 100%;height: 100%">
              <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
            </div>
          </a-popover>
        </div>
      </a-table>
      <div class="contFoot" v-show="tableData.length>0" style="padding-right: 20px;">
        <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
      </div>
    </div>
    <!-- 小区地图 -->
    <a-modal title="编辑小区" destroyOnClose centered :maskClosable="false" :footer="null" width="800px"
             v-model="showMap" class="ownModalBorder titDialog" @close="showMap=false">
      <view-village-by-gaode-map :id="id"
          @map_toggle_close="map_toggle_close"
      ></view-village-by-gaode-map>
    </a-modal>
  </div>
</template>

<script>
import SkeletonComunity from '../../../skeleton/set/comunity';
import * as API from "@/api/setConfig";
import ViewVillageByGaodeMap from './viewVillageByGaodeMap';

export default {
  name: "community",
  components: {
    SkeletonComunity,
    ViewVillageByGaodeMap,
  },
  data() {
    return {
      spinLoading:true,
      sendData:{
        current: 1,                     // 当前页数
        size: 10,                       // ���页返回的记录数量
        fuzzyQueryType:'',
        fuzzyKeyword:'',
        cityId:'',
        areaName:'',
        townId:'',
        status:'',
      },
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      tableColumns:[
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
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
          title: '审核状态',
          dataIndex: 'status',
          key: 'status',
          align: 'left',
          scopedSlots: { customRender: 'status' },
          width:'8%',
        },
        {
          title: '小区名',
          dataIndex: 'name',
          key: 'name',
          align: 'left',
          scopedSlots: { customRender: 'name' },
          width:'18%',
        },
        {
          title: '所属城市/区域/商圈',
          dataIndex: 'cityName',
          key: 'cityName',
          align: 'left',
          scopedSlots: { customRender: 'cityName' },
          width:'18%',
        },
        {
          title: '详细地址',
          dataIndex: 'address',
          key: 'address',
          align: 'left',
          scopedSlots: { customRender: 'address' },
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: {customRender: 'action'},
          align: 'center',
          width: '68px',
          customCell: () => {
            return {
              on: {
                click: () => {
                  event.stopPropagation();
                }
              }
            }
          },
        }
      ],
      tableData:[],
      permissions:[],
      showMap:false,
      id:'',
    }
  },
  created() {
    this.initData();
  },
  methods: {
    openDetail(record) {
      return {
        on: {
          click: () => {
            this.id = record.id;
            this.showMap = true;
          }
        }
      }
    },
    assetsFormData(data) {
      if(data.fuzzyQueryType) {
        this.sendData.fuzzyQueryType = data.fuzzyQueryType;
      } else{
        this.sendData.fuzzyQueryType = 0;
      }
      this.sendData.fuzzyKeyword = data.fuzzyKeyword;
      this.sendData.cityId = data.cityId;
      this.sendData.areaId = data.areaId;
      this.sendData.townId = data.townId;
      this.sendData.status = data.status;
      this.sendData.current = 1;
      this.pagination.current = 1;
      this.initData();
    },
    map_toggle_close(val) {
      if(val){
        this.initData();
      }
      this.showMap = false;
    },
    editCommunity(record){
      this.showMap = true;
      this.id = record.id;
    },
    deleteCommunity(record){
      let _this = this;
      this.$modal.confirm({
        title: '确定要删除小区 「' + record.name + '」 吗？',
        content: '删除后不可恢复，请谨慎操作',
        okText: '确定',
        cancelText: '取消',
        icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
        onOk() {
          API.communityTenantCreateRemove({id:record.id}).then(res => {
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
    checkOpts(record){
      if(!this.permissions||this.permissions.length==0){
        this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
      }
      let markArr = [];
      let btnArr = [];
      if(record.status==1||record.status==2){
        markArr.push('mk_set_config_xqgl_bj');
        markArr.push('mk_set_config_xqgl_sc');
      }
      //判断资源权限
      markArr.forEach(ele => {
        this.permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_set_config_xqgl_bj'){
              btnArr.push('1');
            }else if(value.mark == 'mk_set_config_xqgl_sc'){
              btnArr.push('2');
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
    initData(){
      this.spinLoading = true;
      API.communityListTenantCreate(this.sendData).then(res => {
        if (res&&res.code === "200") {
          if(res.data == null){
            this.tableData = [];
          }else{
            this.tableData = res.data.records;
            this.pagination.total = res.data.total;
            this.tableData.forEach((item, index)=>{
              item.index = index + 1;
            });
          }
          this.spinLoading = false;
        }
      })
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
  },
}
</script>

<style lang="less" scoped>
  .community-box{
    padding: 10px;
    .table{
      .IconRadius {
        margin-top: 8px;
        margin-right: 5px;
        width: 6px;
        height: 6px;
        border-radius: 4px;
      }
      .approved {
        background-color:#0A87F8;
      }
      .reject {
        background-color: #FE3C38;
      }
      .aduit{
        background-color:#FFA036;
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
    }
    & /deep/ .ant-popover {
      .ant-popover-inner-content {
        padding: 0;
        .action {
          padding: 8px 16px;
        }
        .action:hover {
          cursor: pointer;
          background: rgba(10, 135, 248, 0.1);
        }
      }
    }
  }
</style>