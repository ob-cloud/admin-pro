<template>
    <!-- 上下历史记录-->
    <div class="promotion-history-box">
        <div class="set_info f-clearfix">
          <div class="selectItem f-fl">
            <div class="titleTip1 f-fl">平台</div>
            <a-select placeholder="全部" style="width:130px;height:34px" v-model="sendData.platform" @change="selectPlatform()" :allowClear="true">
              <a-select-option v-for="(item) in platformList" :value="item.id" :key="item.id" >{{ item.name }}</a-select-option>
            </a-select>
          </div>
          <div class="selectItem f-fl">
            <div class="titleTip1 f-fl">操作</div>
            <a-select placeholder="全部" style="width:130px;height:34px" v-model="sendData.operate" @change="selectOperate()" :allowClear="true">
              <a-select-option v-for="(item) in operateList" :value="item.id" :key="item.id" >{{ item.name }}</a-select-option>
            </a-select>
          </div>
          <div class="selectItem searchStyle f-fl" style="margin-right: 0px;">
            <a-input-search placeholder="操作人/描述" v-model="sendData.fuzzyKeyword" @pressEnter="onSearch" style="width: 556px" @search="onSearch" />
          </div>
        </div>
        <a-table :locale="tablenodata" rowKey="num" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
            <div slot="operate" slot-scope="text">
                <span v-if="text==2" style="color: #0A87F8;font-size: 14px">上架</span>
                <span v-if="text==3" style="color: #777777;font-size: 14px">下架</span>
            </div>
            <div slot="platform" slot-scope="text">
              <span v-if="text==1">官网/官微</span>
              <span v-else-if="text==2">58租房</span>
              <span v-else-if="text==3">58品牌公寓馆</span>
              <span v-else-if="text==4">闲鱼租房</span>
              <span v-else-if="text==5">贝壳租房</span>
            </div>
            <div slot="createTime" slot-scope="text">
                <span>{{$moment(text).format('YYYY.MM.DD HH:mm')}}</span>
            </div>
          <div slot="comment" slot-scope="text">
            <a-popover>
              <template slot="content">
                <p style="padding: 5px;">
                  {{text}}
                </p>
              </template>
              <div class="f-fl" style="max-width:400px;">
                <p class="overHidde" style="xline-height:22px;">
                  {{text}}
                </p>
              </div>
            </a-popover>
          </div>
        </a-table>
        <div class="contFoot" v-show="tableData.length>0">
            <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
        </div>
    </div>
</template>
<script>
    import * as API from '@/api/extension';
    export default {
        name: "promotionHistory",
        props: {
            houseId: {
                type: String,
                required: true,
            },
        },
        components: {
        },
        data() {
            return {
                tableData : [],
                sendData:{
                    platform:undefined,
                    status:'',
                    houseId:this.houseId,
                    fuzzyKeyword:'',
                    current:1,
                    size:20,
                    isSearchCount: 1,                //是否查询总记录数（1.是（默认）；2.否）
                    operate:undefined,               //1、上架；3、下架
                },
                tableColumns: [
                  {
                    title: '序号',
                    dataIndex: 'num',
                    key: 'num',
                    align: 'center',
                    width:'60px',
                  },
                    {
                        title: '操作',
                        dataIndex: 'operate',
                        key: 'operate',
                        align: 'left',
                        scopedSlots: { customRender: 'operate' },
                      width: '91px',
                    },
                    {
                        title: '操作人',
                        dataIndex: 'createName',
                        key: 'createName',
                        align: 'left',
                      width: '120px',
                    },
                    {
                        title: '操作时间',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        scopedSlots: { customRender: 'createTime' },
                        align: 'left',
                      width: '140px',
                    },
                  {
                    title: '平台',
                    dataIndex: 'platform',
                    key: 'platform',
                    scopedSlots: { customRender: 'platform' },
                    align: 'left',
                    width: '140px'
                  },
                    {
                        title: '描述',
                        key: 'comment',
                        dataIndex: 'comment',
                        align: 'left',
                      scopedSlots: { customRender: 'comment' },
                    },
                ],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 20,//每页中显示20条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
              platformList:[
                {id:1,name:'官网/官微'},
                {id:2,name:'58租房'},
                {id:3,name:'58品牌公寓馆'},
                {id:4,name:'闲鱼租房'},
                {id:5,name:'贝壳租房'},
              ],
              operateList:[
                {id:1,name:'上架'},
                {id:3,name:'下架'},
              ],
              tablenodata:{emptyText:()=>(
                    <div>
                      <div style="margin-top:44px;"><img src="https://oss.byteox.com/byteox/2020-08-06/871d57080603453abf83550480cb9e64.png" width="70"/></div>
                      <div style="margin:20px 0 200px 0;color:#BBBBBB;font-size:14px;">暂无上/下架记录～</div>
                    </div>
                )},
            };
        },
        created: function () {
            this.initData();
        },
        methods: {
          onSearch(){
            this.initData();
          },
          selectPlatform(){
            this.initData();
          },
          selectOperate(){
            this.initData();
          },
            initData(){
               if(!this.houseId){
                    this.$message.error('该房源不存在');
                    return;
               }
                API.listPromotionHistory(this.sendData).then(res => {
                    if (res.code === "200") {
                        if(res.data == null){
                            this.tableData = [];
                        }else{
                            this.tableData = res.data.records;
                            this.pagination.total = res.data.total;
                            this.tableData.forEach(function(element, index) {
                                element.num = index + 1;
                            }, this);
                        }
                    }
                })
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
    };


</script>

<style lang="less" scoped>
.promotion-history-box{
    background:rgba(255,255,255,1);
    width: 1000px;
    height: calc(100vh - 200px);
    overflow: auto;
    padding: 20px;
  & /deep/ .ant-table-thead>tr {
    height: 40px;
  }
  & /deep/ .ant-table-thead>tr>th{
    height: 40px;
    padding: 10px;
  }
  & /deep/ .ant-table-tbody>tr>td {
    height: 40px;
    padding: 10px;
  }
    .set_info {
      margin-bottom: 16px;
    .searchStyle{
      /deep/ .ant-input{
        border-radius:4px !important;
      }
    }
    .selectItem {
      margin:0px 20px 0 0px;
      & > .titleTip1 {
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