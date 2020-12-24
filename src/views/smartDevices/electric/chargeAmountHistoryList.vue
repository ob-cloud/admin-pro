<template>
  <div class="chargeAmountHistoryList-box">
    <div class="table" v-if="tableData.length>0">
      <a-table rowKey="id" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
        <div slot="chargeTime" slot-scope="text">
          {{text?$moment(text).format('YYYY.MM.DD HH:mm'):'-'}}
        </div>
        <div slot="statusName" slot-scope="text">
          <span :style="text=='充值成功'?'color:#0A87F8;':text=='充值失败'?'color:#777777;':text=='充值中'?'color:#FFA036':''">{{text?text:'-'}}</span>
        </div>
        <div slot="comment" slot-scope="text">
          <a-popover>
            <template slot="content">
              <p style="padding: 8px 18px;">
                {{text?text:'-'}}
              </p>
            </template>
            <div style="width:286px;" type="primary">
              <p class="overHidde">
                {{text?text:'-'}}
              </p>
            </div>
          </a-popover>
        </div>
      </a-table>
    </div>
    <div v-if="tableData.length==0">
      <div style="text-align: center; margin-top: 51px;">
        <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
      </div>
      <div style="color: #BBBBBB;font-size: 14px;margin: 19px 0 0 0;text-align: center;">没有充值记录哟～</div>
    </div>
    <div class="contFoot" v-show="tableData.length>0">
      <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
    </div>
  </div>
</template>

<script>
import * as API from "@/api/smartDevices";

export default {
  name: "readingHistoryList",
  components: {

  },
  props: {
    fullAddress:{
      type:String,
    },
    electricMeterId:{
      type:String,
      required:true,
    }
  },
  data() {
    return {
      sendData:{
        current:1,
        size:10,
        fuzzyKeyword:'',
        fuzzyQueryType:0,
        readTimeBegin:'',
        readTimeEnd:'',
        electricMeterId:'',
      },
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      tableColumns: [
        {
          title: '充值状态',
          dataIndex: 'statusName',
          key: 'statusName',
          scopedSlots: { customRender: 'statusName' },
          align: 'left',
          width: '153px',
        },
        {
          title: '充值电量（度）',
          dataIndex: 'chargeAmount',
          key: 'chargeAmount',
          align: 'left',
          width: '155px',

        },
        {
          title: '累计充值电量(度)',
          key: 'totalChargeAmount',
          dataIndex: 'totalChargeAmount',
          align: 'left',
          width: '166px',
        },
        {
          title: '充值时间',
          dataIndex: 'chargeTime',
          key: 'chargeTime',
          scopedSlots: { customRender: 'chargeTime' },
          align: 'left',
          width: '140px',
        },
        {
          title: '充值备注',
          dataIndex: 'comment',
          key: 'comment',
          scopedSlots: { customRender: 'comment' },
          align: 'left',
          width: '299px',
        },
      ],
      tableData:[],
    }
  },
  created() {
    this.sendData.electricMeterId = this.electricMeterId;
    this.initData();
  },
  methods: {
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
    initData(){
      API.chargeList(this.sendData).then(res => {
        if(res.code === '200'){
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        }
      });
    },
  },
  filters: {

  },
}
</script>

<style scoped lang="less">
.chargeAmountHistoryList-box{
  .table{
    & /deep/ .ant-table-thead>tr {
      height: 40px;
    }
    & /deep/ .ant-table-thead>tr>th{
      padding: 8px 9px;
      font-weight: 400;
    }
    & /deep/ .ant-table-tbody>tr>td {
      height: 40px;
      padding: 8px 9px;
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
    margin-top: 0px;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px; // position: absolute;
    background-color: #fff;
  }
}
</style>