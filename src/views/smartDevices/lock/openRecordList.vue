<template>
  <div class="openRecordList-box">
    <div class="clearfix" v-if="noDataFlag">
      <div style="text-align: center;margin-top: 50px;">
        <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
      </div>
      <div style="color: #BBBBBB;font-size: 14px;text-align: center;margin: 20px 0 110px 0;">
        没有开门记录哟～
      </div>
    </div>
    <div class="clearfix" v-if="!noDataFlag">
      <!--  开门记录列表 -->
      <div class="table">
        <a-table rowKey="unlockTime" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
          <div slot="personName" slot-scope="text,record">
            {{!record.personName&&!record.personPhone?'-':''}}{{record.personName?record.personName:''}}{{record.personName&&record.personPhone?'-':''}}{{record.personPhone?record.personPhone:''}}
          </div>
          <div slot="unlockTime" slot-scope="text">
            {{$moment(text).format('YYYY.MM.DD HH:mm')}}
          </div>
        </a-table>
        <div class="contFoot" v-show="tableData.length>0">
          <a-pagination size="small" :total="pagination.total" :current="pagination.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '@/api/smartDevices';
export default {
  name: "authPasswordList",
  components: {
  },
  props: {
    lockId: {
      type: String
    },
  },
  data() {
    return {
      noDataFlag:true,
      sendData:{
        current:1,
        size:10,
        status:'',
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
          title: '开门方式',
          dataIndex: 'unlockMethod',
          key: 'unlockMethod',
          align: 'left',
          width: '153px',
          scopedSlots: { customRender: 'unlockMethod' },
        },
        {
          title: '开门人',
          dataIndex: 'personName',
          key: 'personName',
          align: 'left',
          width: '298px',
          scopedSlots: { customRender: 'personName' },
        },
        {
          title: '开门时间',
          dataIndex: 'unlockTime',
          key: 'unlockTime',
          align: 'left',
          width: '505px',
          scopedSlots: { customRender: 'unlockTime' },
        },
      ],
    }
  },
  created() {
    this.initData();
  },
  mounted() {
  },
  methods: {
    onSizeChange(current){
      this.sendData.current = current;
      this.pagination.current = current;
      this.initData();
    },
    onShowSizeChange(current, pageSize){
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.pagination.current = current;
      this.initData();
    },
    initData(){
      API.listUnlockRecord(this.sendData).then(res => {
        if (res&&res.code === "200") {
          const checkRes = res.data;
          this.tableData = checkRes.records;
          this.pagination.total = res.data.total;
          if(this.tableData.length==0){
            this.noDataFlag = true;
          }
          else{
            this.noDataFlag = false;
          }
        }
      })
    },
  },
  filters: {
  }
}
</script>

<style scoped lang="less">
  .openRecordList-box{
    min-height: 390px;
    .table{
      margin-bottom: 80px;
      & /deep/ .ant-table-thead>tr>th{
        padding: 8px 19px;
        color: #777777;
        font-size: 13px;
        height: 40px;
      }
      & /deep/.ant-table-tbody>tr>td {
        padding: 8px 19px;
        color: #777777;
        font-size: 13px;
        height: 40px;
      }
      .contFoot {
        margin-top: 30px;
        width: 100%;
        height: 24px;
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
    }
  }
</style>