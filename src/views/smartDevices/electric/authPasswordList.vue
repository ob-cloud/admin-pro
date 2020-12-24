<template>
  <div class="authPasswordList-box clearfix">
    <div v-if="noDataFlag">
        <div style="text-align: center;margin-top: 50px;">
          <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
        </div>
      <div style="color: #BBBBBB;font-size: 14px;text-align: center;margin: 20px 0 60px 0;">
        没有密码授权记录哟～
      </div>
    </div>
    <div v-if="!noDataFlag">
      <!--   授权统计   -->
      <div class="status-box">
        <div class="status">
          <p :class="{ active: activeIndex === 0 }" @click="changeStatus(null,0)">
            <span >{{ statusData[0].title }}</span>
          </p>
          <p :class="{ active: activeIndex === 1 }" @click="changeStatus(1,1)">
            <span >{{ statusData[1].title }}</span>
            <span :style="{ color: statusData[1].color }">({{ statusData[1].status }})</span>
          </p>
          <p :class="{ active: activeIndex === 2 }" @click="changeStatus(2,2)">
            <span >{{ statusData[2].title }}</span>
            <span :style="{ color: statusData[2].color }">({{ statusData[2].status }})</span>
          </p>
          <p :class="{ active: activeIndex === 3 }" @click="changeStatus(4,3)">
            <span >{{ statusData[3].title }}</span>
            <span :style="{ color: statusData[3].color }">({{ statusData[3].status }})</span>
          </p>
          <p :class="{ active: activeIndex === 4 }" @click="changeStatus(3,4)">
            <span >{{ statusData[4].title }}</span>
          </p>
        </div>
      </div>
      <!--  授权列表 -->
      <div class="table">
        <a-table rowKey="id" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
          <div slot="status" slot-scope="status">
            <div v-if="status==1" class="status1">
              待生效
            </div>
            <div v-if="status==2" class="status2">
              生效中
            </div>
            <div v-if="status==3" class="status4">
              已过期
            </div>
            <div v-if="status==4" class="status3">
              已冻结
            </div>
          </div>
          <div slot="authType" slot-scope="authType">
            {{ authType|authTypeVal}}
          </div>
          <div slot="startTime" slot-scope="text,record">
            {{$moment(record.startTime).format('YYYY.MM.DD HH:mm')}} - {{$moment(record.endTime).format('YYYY.MM.DD HH:mm')}}
          </div>
          <div slot="personName" slot-scope="text,record">
            {{ record.personName}} - {{record.personPhone}}
          </div>
          <div slot="createTime" slot-scope="text">
            {{$moment(text).format('YYYY.MM.DD HH:mm')}}
          </div>
          <div slot="comment" slot-scope="text">
            <a-popover>
              <template slot="content">
                <p style="padding: 6px 18px;">{{text}}</p>
              </template>
              <div class="overHidde" style="max-width:110px;">
                {{text?text:'-'}}
              </div>
            </a-popover>
          </div>
          <div slot="action" slot-scope="text, record">
            <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
              <template slot="content" >
                <div @click="unfrozen(record)" v-if="record.btnArr.indexOf('1') != -1" class="action cursor" >解冻</div>
                <div @click="frozen(record)" v-if="record.btnArr.indexOf('2') != -1" class="action cursor" >冻结</div>
                <div @click="deleteAuthPassword(record)" v-if="record.btnArr.indexOf('3') != -1" class="action cursor" >删除</div>
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
        <div style="height: 104px;" v-show="tableData.length==0">
        </div>
      </div>
    </div>
    <!-- 操作结果 -->
    <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="operateResultDialog" class="ownModalBorder" title="">
      <auth-password-operate-result :operateType="operateType" @closeThis="closeThis"></auth-password-operate-result>
    </a-modal>
  </div>
</template>

<script>
import AuthPasswordOperateResult from './authPasswordOperateResult';
import * as API from '@/api/smartDevices';
export default {
  name: "authPasswordList",
  components: {
    AuthPasswordOperateResult,
  },
  props: {
    lockId: {
      type: String
    },
  },
  data() {
    return {
      statusData: [
        {
          title: '全部',
          status: 0,
          string: 'dataTotal',
          query: null,
        },
        {
          title: '待生效 ',
          status: 0,
          string: 'beEffectiveTotal',
          query: 1,
          color: '#FFA036'
        },
        {
          title: '生效中',
          status: 0,
          string: 'inEffectiveTotal',
          query: 2,
          color: '#0A87F8'
        },
        {
          title: '已冻结',
          status: 0,
          string: 'frozenTotal',
          query: 4,
          color: '#FB4246'
        },
        {
          title: '已过期',
          status: 0,
          string: 'offlineTotal',
          query: 3,
          color: '#FB4246'
        },
      ],
      activeIndex:0,
      sendData:{
        current:1,
        size:10,
        status:undefined,
        doorLockId:this.lockId,
      },
      tableData:[],
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
          title: '密码状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
          align: 'left',
          width: '71px'
        },
        {
          title: '授权类型',
          dataIndex: 'authType',
          key: 'authType',
          scopedSlots: { customRender: 'authType' },
          align: 'left',
          width: '70px'
        },
        {
          title: '授权期限',
          dataIndex: 'startTime',
          key: 'startTime',
          scopedSlots: { customRender: 'startTime' },
          align: 'left',
          width: '252px'
        },
        {
          title: '被授权人信息',
          dataIndex: 'personName',
          key: 'personName',
          scopedSlots: { customRender: 'personName' },
          align: 'left',
          width: '167px'
        },
        {
          title: '授权人',
          dataIndex: 'creater',
          key: 'creater',
          align: 'left',
          width: '80px'
        },
        {
          title: '授权时间',
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' },
          align: 'left',
          width: '123px'
        },
        {
          title: '备注',
          dataIndex: 'comment',
          key: 'comment',
          scopedSlots: { customRender: 'comment' },
          align: 'left',
          width: '128px'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: '55px',
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
      noDataFlag:true,
      permissions:[],
      operateResultDialog:false,
      operateType:1,      //1、删除；2、冻结；3、解冻
    }
  },
  created() {
    this.initData(true);
  },
  mounted() {
  },
  methods: {
    closeThis(){
      this.operateResultDialog = false;
      this.initData();
    },
    unfrozen(record){
      let _this = this;
      let id = record.id;
      this.operateType = 3;
      this.$modal.confirm({
        title: '确定要将「' + record.personName + '-' + record.personPhone + '」的门锁密码解冻吗？',
        content: '解冻后，此密码将可继续使用',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.pwdAuthUnfrozen({id:id}).then(res => {
            if (res.code == 200) {
              _this.operateResultDialog = true;
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    frozen(record){
      let _this = this;
      let id = record.id;
      this.operateType = 2;
      this.$modal.confirm({
        title: '确定要冻结「' + record.personName + '-' + record.personPhone + '」的门锁密码吗？',
        content: '冻结后，此密码将不可再开门',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.pwdAuthFrozen({id:id}).then(res => {
            if (res.code == 200) {
              _this.operateResultDialog = true;
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    deleteAuthPassword(record){
      let _this = this;
      let id = record.id;
      this.operateType = 1;
      this.$modal.confirm({
        title: '确定要删除「' + record.personName + '-' + record.personPhone + '」的门锁密码吗？',
        content: '删除后，在授权记录里将永久删除；不可恢复，请谨慎操作',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.pwdAuthRemove({id:id}).then(res => {
            if (res.code == 200) {
              _this.operateResultDialog = true;
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
      let markArr = ['mk_smartDevices_doorLoc_jdsqmm','mk_smartDevices_doorLoc_djsqmm','mk_smartDevices_doorLoc_scsqmm'];
      let btnArr = [];
      markArr.forEach(ele => {
        this.permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_smartDevices_doorLoc_jdsqmm'&&(record.status==4)){
              btnArr.push('1');
            }
            if(value.mark == 'mk_smartDevices_doorLoc_djsqmm'&&(record.status==2)){
              btnArr.push('2');
            }
            if(value.mark == 'mk_smartDevices_doorLoc_scsqmm'){
              btnArr.push('3');
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
    onSizeChange(current){
      this.sendData.current = current;
      this.pagination.current = current;
      this.pwdAuthList();
    },
    onShowSizeChange(current, pageSize){
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.pagination.current = current;
      this.pwdAuthList();
    },
    initData(flag){
      this.pwdAuthListStat();
      this.pwdAuthList(flag);
    },
    pwdAuthListStat(){
      API.pwdAuthListStat({id:this.sendData.doorLockId}).then(res => {
        if (res.code === '200') {
          let count = res.data;
          for (let item of this.statusData) {
            item.status = count[item.string];
          }
        }
      })
    },
    pwdAuthList(flag){
      API.pwdAuthList(this.sendData).then(res => {
        if (res&&res.code === "200") {
          const checkRes = res.data;
          this.tableData = checkRes.records;
          this.pagination.total = res.data.total;
          if(flag){
            if(this.tableData.length==0){
              this.noDataFlag = true;
            }
            else{
              this.noDataFlag = false;
            }
          }
        }
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
        this.sendData.status = status;
        this.pwdAuthList();
      }
    },
  },
  filters: {
    authTypeVal(val) {
      return val == 1 ? '看房' : val == 2 ? '入住' : val == 3 ? '维修' : val == 4 ? '保洁' : val == 5 ? '配货' : val == 9 ? '其他' : '-';
    },
  }
}
</script>

<style scoped lang="less">
  .authPasswordList-box{
    min-height: 390px;
    .status-box{
      margin-bottom: 15px;
      .status {
        display: flex;
        .active {
          color: #0A87F8;
          border-bottom: 2px solid #0A87F8;
        }
        &>p {
          box-sizing: border-box;
          margin-right: 20px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          .leftLine{
            border-left: 1px dashed #dddddd;
            padding-left: 20px;
          }
        }
      }
    }
    .table{
      & /deep/ .ant-table-thead>tr>th{
        padding: 8px 7px;
        color: #777777;
        font-size: 13px;
        height: 40px;
      }
      & /deep/.ant-table-tbody>tr>td {
        padding: 8px 7px;
        color: #777777;
        font-size: 13px;
      }
      .status1{
        color: #FFA036;
      }
      .status2{
        color: #0A87F8;
      }
      .status3{
        color: #FB4246;
      }
      .status4{
        color: #777777;
      }
      & /deep/ .ant-popover {
        .ant-popover-inner-content {
          text-align: center;
          padding: 5px 0;
          .action {
            padding: 5px 10px;
          }
          .action:hover {
            cursor: pointer;
            background: rgba(10, 135, 248, 0.1);
          }
        }
      }
      .contFoot {
        margin: 30px 20px 50px 0;
        width: 100%;
        height: 24px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        // bottom: 0px;
        // right: 0;
        background-color: #fff;
        & /deep/ .ant-pagination {
          margin-right: 11px;
        }
      }
    }

  }
</style>