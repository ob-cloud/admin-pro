<template>
  <div class="readingHistoryList-box">
    <div class="set_info f-clearfix">
      <div class="selectItem timerStyle f-fl" style="width: 450px;">
        <div class="titleTip1 titleTip1With1 f-fl">抄表日期</div>
        <a-range-picker style="width: 380px;" @change="(date,dateString)=>changeDate(date, dateString)" :format="dateFormat" v-model="timeDateList"/>
      </div>
      <div class="selectItem searchStyle f-fl" style="margin-right: 0px;width: calc(100% - 470px)">
        <a-input-search  placeholder="抄表人姓名/电话"  v-model="sendData.fuzzyKeyword" @search="initData"/>
      </div>
    </div>
    <div class="table">
      <a-table :locale="tablenodata" rowKey="id" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
        <div slot="readTime" slot-scope="text">
          {{text?$moment(text).format('YYYY.MM.DD HH:mm:ss'):'-'}}
        </div>
        <div slot="readValue" slot-scope="text">
          <span v-if="readingObj.billingMethod==1">余数：{{text?text+'m³':'-'}}</span>
          <span v-if="readingObj.billingMethod==2">底数：{{text?text+'m³':'-'}}</span>
          <span v-if="readingObj.billingMethod==3">金额：{{text?text+'元':'-'}}</span>
        </div>
        <div slot="totalFee" slot-scope="text,record">
          <div class="clearfielectricMeterIdx">
            <div class="f-fl">{{text?text:text==0?text:'-'}}</div>
            <div class="f-fl genBill" v-if="record.isGenBill==1">已生成账单</div>
          </div>
        </div>
        <div slot="dailyConsumption" slot-scope="text">
          {{text?text:text==0?text:'-'}}
        </div>
        <div slot="dailyFee" slot-scope="text">
          {{text?text:text==0?text:'-'}}
        </div>
        <div slot="createrName" slot-scope="text,record">
          {{record|createrNameVal}}
        </div>
        <div slot="annexList" slot-scope="text,record">
          <div class="annexListStyle cursor">
            <a-popover>
              <template slot="content">
                <div style="font-size: 14px;color: #111111;font-weight: 600;margin-bottom: 5px;">备注</div>
                <div style="font-size: 14px;color: #111111;">{{record.comment?record.comment:'-'}}</div>
                <div style="font-size: 14px;color: #111111;font-weight: 600;margin: 18px 0 10px 0;">照片凭证</div>
                <div v-if="record.annexList&&record.annexList.length>0" class="room-img-list clearfix">
                  <div class="f-fl" v-for="(item,i) in record.annexList" :key="i" style="margin-bottom: 10px;" :style="i%3==2?'margin-right: 0px;':''">
                    <div><img :src="item.small" alt=""></div>
                  </div>
                </div>
                <div v-else>-</div>
              </template>
              <div>
                <icon-font :class="record.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconbeizhuxinxi"/>
                <icon-font :class="record.annexList&&record.annexList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
              </div>
            </a-popover>
          </div>
        </div>
        <div slot="action" slot-scope="text, record">
          <div class="operaterStyle">
            <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
              <template slot="content" >
                <div v-if="record.btnArr.indexOf('1')>-1" class="action cursor" @click="remove(record)">删除</div>
                <div v-if="record.btnArr.indexOf('2')>-1" class="action cursor" @click="goGenBill(record)">生成账单</div>
              </template>
              <div class="cursor" style="width: 100%;height: 100%">
                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
              </div>
            </a-popover>
          </div>
        </div>
      </a-table>
    </div>
    <div class="contFoot" v-show="tableData.length>0">
      <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
    </div>
    <!-- 生成账单 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="genBillDialog" class="ownModalBorder titDialog" title="生成账单">
      <gen-bill :readingObj="readingNewObj" @cancelGen="cancelGen" @genBillSuccess="genBillSuccess"></gen-bill>
    </a-modal>
  </div>
</template>

<script>
import GenBill from './genBill';
import * as API from "@/api/smartDevices";

export default {
  name: "readingHistoryList",
  components: {
    GenBill,
  },
  props: {
    readingObj:{
      type:Object,
    },
    waterId:{
      type:String,
      required:true,
    },
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
        waterMeterId:'',
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
          title: '抄表时间',
          dataIndex: 'readTime',
          key: 'readTime',
          scopedSlots: { customRender: 'readTime' },
          align: 'left',
          width: '126px',
        },
        {
          title: '表数',
          dataIndex: 'readValue',
          key: 'readValue',
          scopedSlots: { customRender: 'readValue' },
          align: 'left',
          width: '120px',
        },
        {
          title: '水费金额(元)',
          key: 'totalFee',
          dataIndex: 'totalFee',
          scopedSlots: { customRender: 'totalFee' },
          align: 'left',
          width: '120px',
        },
        {
          title: '每日用水量(m³)',
          dataIndex: 'dailyConsumption',
          key: 'dailyConsumption',
          scopedSlots: { customRender: 'dailyConsumption' },
          align: 'left',
          width: '95px',
        },
        {
          title: '每日水费(元)',
          dataIndex: 'dailyFee',
          key: 'dailyFee',
          scopedSlots: { customRender: 'dailyFee' },
          align: 'left',
          width: '80px',
        },
        {
          title: '抄表人',
          key: 'createrName',
          dataIndex: 'createrName',
          align: 'left',
          scopedSlots: { customRender: 'createrName' },
          width: '131px',
        },
        {
          title: '备注/附件',
          key: 'annexList',
          dataIndex: 'annexList',
          align: 'left',
          scopedSlots: { customRender: 'annexList' },
          width: '60px',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: '70px',
        },
      ],
      tableData:[],
      timeDateList:[],
      dateFormat: 'YYYY.MM.DD',           //日期选择器格式
      mouseOverId:'',
      genBillDialog:false,
      readingNewObj:{},
      tablenodata:{emptyText:()=>(
            <div>
              <div style="margin-top:44px;"><img src="https://oss.byteox.com/byteox/2020-08-06/871d57080603453abf83550480cb9e64.png" width="130"/></div>
              <div style="margin:20px 0 40px 0;color:#BBBBBB;font-size:14px;">没有抄表记录哟～</div>
            </div>
        )},
    }
  },
  created() {
    this.sendData.waterMeterId = this.waterId;
    this.readingNewObj = Object.assign({},this.readingObj);
    this.initData();
  },
  methods: {
    checkOpts(record){
      let permissions = JSON.parse(sessionStorage.getItem('permissions'));
      let markArr = ['mk_smartDevices_water_cbjlsc','mk_smartDevices_water_cbsczd'];
      let btnArr = [];
      //判断资源权限
      markArr.forEach(ele => {
        permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_smartDevices_water_cbjlsc'){
              btnArr.push('1');
            }else if(value.mark == 'mk_smartDevices_water_cbsczd'&&record.isGenBill==0&&record.totalFee>0){
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
    genBillSuccess(){
      this.genBillDialog = false;
      setTimeout(()=>{
        this.initData();
      },1000);
    },
    cancelGen(){
      this.genBillDialog = false;
    },
    goGenBill(record){
      this.readingNewObj.readRecordId = record.id;
      this.readingNewObj.feeAmount = record.totalFee;
      this.readingNewObj.lastReadTime = record.lastReadTime;
      this.readingNewObj.readTime = record.readTime;
      this.genBillDialog = true;
    },
    remove(record){
      let _this =this;
      let id =record.id;
      let time = this.$moment(record.readTime).format('YYYY.MM.DD HH:mm');
      this.$modal.confirm({
        title: '确定要删除「' + this.fullAddress + '」在'+time+'抄表的记录吗？',
        content: '删除后不可恢复，请谨慎操作',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.waterMeterReadRecordRemove({id:id}).then(res => {
            if (res.code == 200) {
             _this.$message.success('删除成功');
             _this.initData();
            }
            else{
              _this.$message.success('删除失败');
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
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
    changeDate(date) {
      this.sendData.readTimeBegin=date[0];
      this.sendData.readTimeEnd=date[1];
      this.initData();
    },
    initData(){
      //日期处理
      if(this.sendData.readTimeBegin){
        this.sendData.readTimeBegin = this.sendData.readTimeBegin.startOf('day');
      }
      if(this.sendData.readTimeEnd){
        this.sendData.readTimeEnd = this.sendData.readTimeEnd.endOf('day');
      }

      API.waterMeterReadRecordList(this.sendData).then(res => {
        if(res.code === '200'){
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        }
      });
    },
  },
  filters: {
    createrNameVal(record) {
      if(!record){
        return '-';
      }
      if(record.createrName){
        if(record.createrPhone){
          return record.createrName+'-'+record.createrPhone;
        }
        else{
          return record.createrName;
        }
      }
      else{
        if(record.createrPhone){
          return record.createrPhone;
        }
        else{
          return '-'
        }
      }
    }
  },
}
</script>

<style scoped lang="less">
.readingHistoryList-box{
  .set_info {
    width: 100%;
    margin-bottom: 15px;
    .searchStyle{
      /deep/ .ant-input{
        border-radius:4px !important;
      }
    }
    .searchButtonStyle{
      width: 34px;
      height: 34px;
      background: #0A87F8;
      border-radius: 4px;
      svg{
        margin: 7px;
        width: 20px;
        height: 20px;
        color: #ffffff;
      }
    }
    .clearStyle{
      width: 42px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background: #EEEEEE;
      border-radius: 4px;
      border: 1px solid #DDDDDD;
      color: #111111;
      font-size: 13px;
    }
    .timerStyle{
      /deep/ .ant-input{
        padding: 0;
      }
    }
    .selectItem {
      margin:0px 20px 0 0px;
      & > .titleTip1 {
        border: 1px solid @borderColor;
        border-right:0px;
        background: @bigBackgroundColor;
        font-size: 13px;
        color: #777777;
        border-radius:4px 0 0 4px;
        height: 34px;
        line-height: 34px;
        text-align: center;
      }
      .titleTip1With1{
        width: 70px;
      }
      .titleTip1With2{
        width: 62px;
      }
      .titleTip1With3{
        width: 46px;
      }
      & > .titleTip2 {
        border: 1px solid @borderColor;
        border-right:0px;
        background: @bigBackgroundColor;
        font-size: 14px;
        color: @mainFontColor;
        border-radius:4px 0 0 4px;
        width: 50px;
        height: 34px;
        line-height: 34px;
        text-align: center;
      }
      /deep/ .ant-select-selection{
        border-radius:0 4px 4px 0
      }
      /deep/ .ant-select-selection__rendered{
        height: 34px;
        line-height: 34px;
      }
      /deep/ .ant-select-selection--single{
        height: 34px;
        line-height: 34px;
      }
      /deep/ .ant-input{
        border-radius:0 4px 4px 0;
        height: 34px;
        line-height: 34px;
        border: 1px solid #DDDDDD;
        padding-left: 8px;
      }
      /deep/ .tree-wrap .tree{
        width: 400px;
        top:34px !important;
      }
      /deep/ svg{
        color: #0A87F8;
        width: 14px;
        height: 14px;
      }
    }
    .cityTree{
      /deep/ .tree-wrap .tree .content{
        border-top: 1px solid #DDDDDD;
      }
    }
  }
  .table{
    .genBill{
      margin-left: 10px;
      width: 74px;
      height: 20px;
      line-height: 20px;
      background: #F0F8FF;
      border-radius: 10px;
      font-size: 12px;
      color: #0A87F8;
      text-align: center;
    }
    .annexListStyle{
      /deep/ .ant-popover-inner-content{
        width: 344px;
        padding: 15px 15px 10px 15px;
        text-align: left;
        max-height: 400px;
        overflow-y: auto;
      }
      .room-img-list {
        >div {
          height: 64px;
          width: 96px;
          margin-right: 10px;
          margin-bottom: 10px;
          >div{
            width: 100%;
            height: 100%;
            line-height: 64px;
            border: 1px solid #eeeeee;
            background-color: #f6f7f8;
            text-align: center;
            border-radius: 6px;
            overflow: hidden;
            img {
              width: auto;
              max-width: 96px;
              height: auto;
              max-height: 64px;
              overflow: hidden;
            }
          }
        }
        >div:last-child{
          margin-right: 0px;
        }
      }
      .haveValueStyle{
        color: #0a87f8;
      }
      .noHaveValueStyle{
        color: #777777;
      }
    }
    & /deep/ .ant-table-thead>tr {
      height: 40px;
      color: #777777;
      font-size: 13px;
    }
    & /deep/ .ant-table-thead>tr>th{
      padding: 8px 7px;
      color: #777777;
      font-size: 13px;
    }
    & /deep/ .ant-table-tbody>tr>td {
      height: 40px;
      padding: 8px 7px;
      font-size: 13px;
    }
    .operaterStyle{
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