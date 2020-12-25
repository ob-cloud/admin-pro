<template>
    <!-- 项目管理 -->
    <div class="projectList-box">
      <div class="detail_info">
        <div class="set_info f-clearfix">
          <div class="selectItem f-fl">
            <div class="titleTip1 titleTip1With1 f-fl">部门/人员</div>
            <dept-employee-tree class="f-fl" style="width: 180px;" placeholder="不限" :showNameAll="false" :showEmployee="true" @selectChange="selectDept" placement="bottomLeft" ref="selectDeptEmp" @cancelOtherTree="cancelOtherTree(['selectCityTown'])"></dept-employee-tree>
          </div>
          <div class="selectItem f-fl cityTree">
            <div class="titleTip1 titleTip1With1 f-fl">城市/区域</div>
            <city-town-tree class="f-fl" style="width: 180px;" placeholder="不限" ref="selectCityTown" :showArea="true" :showTown="true" @selectChange="selectCityTownChange" @cancelOtherTree="cancelOtherTree(['selectDeptEmp'])"></city-town-tree>
          </div>
          <a-input-search v-model="sendData.fuzzyKeyword" placeholder="项目编号/项目名称/项目地址" style="width: 716px;height: 34px;" @search="onSearch" >
            <a-select slot="addonBefore" v-model="sendData.fuzzyQueryType" style="width: 100px">
              <a-select-option value="0">综合检索</a-select-option>
              <a-select-option value="1">项目编号</a-select-option>
              <a-select-option value="2">项目名称</a-select-option>
              <a-select-option value="3">项目地址</a-select-option>
            </a-select>
          </a-input-search>
        </div>
        <div class="lockList_info">
          <div class="basicsInfo">
            <div class="table">
              <div class="table-title">
                <div class="lineStyle" style="max-width: 48px;border-radius: 4px 0px 0px 0px;">序号</div>
                <div class="lineStyle" style="max-width: 103px;text-align: left;padding-left: 9px;">项目编号</div>
                <div class="lineStyle" style="max-width: 121px;text-align: left;padding-left: 9px;">项目名称</div>
                <div class="lineStyle" style="max-width: 267px;text-align: left;padding-left: 9px;">项目地址</div>
                <div class="lineStyle" style="max-width: 86px;text-align: center;">总房源(间)</div>
                <div class="lineStyle" style="max-width: 58px;text-align: center;">出租率</div>
                <div style="max-width: 296px;">
                  <div class="numTileStyle borderBottomStyle">房源(间)</div>
                  <div class="numTileStyle itemStyle">
                    <div class="numStyle borderRightStyle" style="max-width: 59px;">空置</div>
                    <div class="numStyle borderRightStyle" style="max-width: 59px;">已租</div>
                    <div class="numStyle borderRightStyle" style="max-width: 59px;">配置</div>
                    <div class="numStyle borderRightStyle" style="max-width: 59px;">锁房</div>
                    <div class="numStyle" style="max-width: 58.5px;">关闭</div>
                  </div>
                </div>
                <div class="lineStyle" style="max-width: 114px;text-align: left;padding-left: 9px;">所属门店(部门)</div>
                <div class="lineStyle" style="max-width: 89px;text-align: left;padding-left: 9px;">负责人</div>
                <div class="lineStyle" style="max-width: 72px;border-radius: 0px 4px 0px 0px;">操作</div>
              </div>
              <div class="house-data" v-for="(item,index) in tableData" :key="index">
                <div style="max-width: 48px;text-align: center;">{{item.num}}</div>
                <div style="max-width: 103px;text-align: left;padding:0 9px;">{{item.no?item.no:'-'}}</div>
                <div class="overHidde" style="max-width: 121px;text-align: left;padding:0 9px;">
                  <a-popover :title="null" trigger="hover">
                    <template slot="content">
                      {{item.name}}
                    </template>
                    {{item.name}}
                  </a-popover>
                </div>
                <div class="overHidde" style="max-width: 267px;text-align: left;padding:0 9px;">
                  <a-popover :title="null" trigger="hover">
                    <template slot="content">
                      {{item.address}}
                    </template>
                    {{item.address}}
                  </a-popover>
                </div>
                <div style="max-width: 86px;text-align: center;">{{item.totalQuantity}}</div>
                <div style="max-width: 58px;text-align: center;">{{item.rentRate}}</div>
                <div style="max-width: 59px;text-align: center;">{{item.vacantQuantity}}</div>
                <div style="max-width: 59px;text-align: center;">{{item.rentAlreadyQuantity}}</div>
                <div style="max-width: 59px;text-align: center;">{{item.dispositionQuantity}}</div>
                <div style="max-width: 59px;text-align: center;">{{item.lockedQuantity}}</div>
                <div style="max-width: 59.5px;text-align: center;">{{item.closedQuantity}}</div>
                <div class="overHidde" style="max-width: 114px;text-align: left;padding:0 9px;">{{item.deptName?item.deptName:'-'}}</div>
                <div class="overHidde" style="max-width: 89px;text-align: left;padding:0 9px;">{{item.maintainerName?item.maintainerName:'-'}}</div>
                <div style="max-width: 72px;text-align: center;" class="moreStyle">
                  <a-popover :title="null" trigger="hover" v-if="showFlag&&checkOpts(item) == true">
                    <template slot="content">
                      <div v-if="item.btnArr.indexOf('1') != -1" @click.stop="goEditProject(item.id,1)" class="action cursor" >编辑项目</div>
                      <div v-if="item.btnArr.indexOf('1') != -1" @click.stop="goEditProject(item.id,2)" class="action cursor" >配置房间</div>
                      <div v-if="item.btnArr.indexOf('2') != -1" @click.stop="deleteProject(item.id,item.name)" class="action cursor" >删除项目</div>
                    </template>
                    <div style="width: 100%;height: 100%;color: #0a87f8;" class="cursor">
                      <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                    </div>
                  </a-popover>
                </div>
              </div>
              <div class="house-no-data u-no-border" v-if="!tableData||tableData.length==0">
                <div style="padding-top: 40px;text-align: center;">
                  <img style="width: 130px;height: 122px;" src="../../../../assets/login/no-collect.png">
                </div>
                <div style="margin:20px 0 100px 0;color: #777777;font-size: 14px;text-align: center">
                  暂无数据
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contFoot" v-show="tableData.length>0">
          <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
        </div>
      </div>
      <!-- 修改房源弹框 -->
      <add-centralized-dialog :defaultStepsNum="editStepsNum" v-if="editHouseDialog"
                              :currentBuildingProjectId="buildingProjectId" @cancel-dig="editRefreshPage" @refreshinfoFun="refreshinfoFun"></add-centralized-dialog>
    </div>
</template>

<script>
import  * as API from '@/api/centralizedHouse';
import AddCentralizedDialog from "./AddCentralizedDialog";
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import CityTownTree from '@/components/CityTownTree';
export default {
  name: "projectList",
  props: {
    selectBuildingProjectId:{
      Type:String,
    },
  },
  components: {
    AddCentralizedDialog,
    DeptEmployeeTree,
    CityTownTree,
  },
  data() {
    return {
      sendData: {
        current:1,
        size:20,
        deptId:'',
        maintainerId:'',
        cityId:'',
        areaId:'',
        townId:'',
        fuzzyQueryType:'0',
        fuzzyKeyword:'',
      },
      tableData:[],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["20", "30", "40", "50"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      showFlag:true,
      isRefresh:false,
      editStepsNum:1,
      buildingProjectId:'',
      editHouseDialog:false,
    };
  },
  created() {
    this.listProjectManage();
  },
  beforeMount() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    cancelOtherTree(typeRef=[]){
      typeRef.forEach((name)=>{
        if (this.$refs[name]){
          this.$refs[name].showTree = false
        }
      })
    },
    onSearch(){
      this.listProjectManage();
    },
    //选择负责人
    selectDept(selectObj) {
      if (selectObj.type == 'dept') {
        this.sendData.deptId = selectObj.id;
        this.sendData.maintainerId = '';
      } else if (selectObj.type == 'employee') {
        this.sendData.deptId = '';
        this.sendData.maintainerId = selectObj.id;
      }
      else{
        this.sendData.deptId = '';
        this.sendData.maintainerId = '';
      }
      this.listProjectManage();
    },
    selectCityTownChange(selectObj){
      this.sendData.cityId = selectObj.cityId;
      this.sendData.areaId = selectObj.areaId;
      this.sendData.townId = selectObj.townId;
      this.listProjectManage();
    },
    initShowFlag(){
      this.showFlag = false;
      setTimeout(()=>{
        this.showFlag = true;
      },100);
    },
    editRefreshPage(){
      this.editHouseDialog = false;
      if(this.isRefresh) {
        this.listProjectManage();
        this.isRefresh = false;
      }
    },
    goEditProject(buildigProjectId,val){
      this.editHouseDialog = true;
      this.buildingProjectId = buildigProjectId;
      this.editStepsNum = val;
      this.initShowFlag();
    },
    deleteProject(buildigProjectId,buildigProjectName){
      let that = this;
      this.initShowFlag();
      this.$modal.confirm({
        title: '确认删除 「'+buildigProjectName+ '」吗？',
        content: '删除后将不可恢复',
        width:"433px",
        height:"192px",
        okText: '确认',
        cancelText: '取消',
        icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
          onOk() {
        API.removeBuildingProject(buildigProjectId).then(res => {
          // console.log(res)
          if (res.code == "200") {
            that.currentBuildingProjectId = '';
            that.$message.info('删除成功');
            that.listProjectManage();
            //清空列表
            that.$emit('deleteProjectFromList',that.selectBuildingProjectId==buildigProjectId);
          } else {
            that.$message.error('删除失败');
          }
        })
      },
      onCancel() {
      },
    });
    },
    refreshinfoFun(res){  //详情有改变的操作  就改变状态
      if(res){
        this.isRefresh = res;
        this.$emit('refreshinfoFun',true);
      }
    },
    isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
      if(this.isRefresh){
        this.sendData.current = 1;
        this.listProjectManage();
      }
      this.isRefresh = false;
    },
    checkOpts(record){
      //1、编辑项目(配置房间)；3、删除项目
      let permissions = JSON.parse(sessionStorage.getItem('permissions'));
      let markArr = ['mk_house_centralized_bjxm','mk_house_centralized_scxm'];
      let btnArr = [];
      //判断资源权限
      markArr.forEach(ele => {
        permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_house_centralized_bjxm'){
              btnArr.push('1');
            }else if(value.mark == 'mk_house_centralized_scxm'){
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
    onSizeChange(current){
      this.sendData.current = current;
      this.pagination.current = current;
      this.listProjectManage();
    },
    onShowSizeChange(current, pageSize){
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.pagination.current = current;
      this.listProjectManage();
    },
    listProjectManage(){
      API.listProjectManage(this.sendData).then(res => {
        if (res.code === '200') {
          this.tableData = res.data.records;
          this.tableData.forEach((item,index)=>{
            item.num = index + 1;
          });
          this.pagination.total = res.data.total;
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .projectList-box{
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    .detail_info{
      padding: 15px 20px;
      .set_info {
        margin-bottom: 5px;
        .selectItem {
          margin:0px 10px 0 0px;
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
            width: 80px;
          }
          /deep/ .ant-input{
            border-radius:0 4px 4px 0;
            height: 34px;
            border: 1px solid #DDDDDD;
            padding-left: 14px;
          }
          /deep/ .tree-wrap .tree{
            width: 300px;
            top:34px !important;
          }
        }
        .cityTree{
          /deep/ .tree-wrap .tree .content{
            border-top: 1px solid #DDDDDD;
          }
        }
        /deep/ .ant-select-selection-selected-value{
          padding-right: 0px;
          color: #777777;
        }
        /deep/ .ant-select-selection__rendered{
          height: 34px;
          line-height: 34px;
        }
        /deep/ .ant-input{
          height: 34px;
          line-height: 34px;
        }
        /deep/ .ant-select-selection--single{
          height: 34px;
          line-height: 34px;
          svg{
            color: #0a87f8;
            width: 14px;
            height: 14px;
          }
        }
      }
      .lockList_info{
        min-height: 400px;
        .basicsInfo{
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .table{
            width: 1254px;
            border-left: 1px solid #E8E8E8;
            border-top: 1px solid #E8E8E8;
            font-size: 12px;
            border-radius: 4px;
            .table-title{
              width: 1254px;
              display: flex;
              background: #F7F8FB;
              color: #777777;
              font-size: 13px;
              border-radius: 4px 4px 0px 0px;
              & > div {
                flex: 1;
                border-right: 1px solid #E8E8E8;
                border-bottom: 1px solid #E8E8E8;
              }
              .borderBottomStyle{
                border-bottom: 1px solid #E8E8E8;
              }
              .borderRightStyle{
                border-right: 1px solid #E8E8E8;
              }
              .lineStyle{
                line-height: 62px;
                text-align: center;
              }
              .numTileStyle{
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
              }
              .itemStyle{
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .numStyle{
                  flex:1
                }
              }
            }
            .house-no-data{
              width: 1254px;
              border-radius: 0px 0px 4px 4px;
              border-right: 1px solid #E8E8E8;
              border-bottom: 1px solid #E8E8E8;
              background-color: #ffffff;
            }
            .totalStyle{
              background: #FFF9F1;
              box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.06);
            }
            .house-data {
              width: 1254px;
              display: flex;
              color: #111111;
              font-size: 13px;
              border-radius: 0px 0px 4px 4px;
              & > div {
                flex: 1;
                height: 44px;
                line-height: 44px;
                border-right: 1px solid #E8E8E8;
                border-bottom: 1px solid #E8E8E8;
              }
              .fontStyle1{
                text-align: center;
              }
              .fontStyle2{
                text-align: center;
                color: #0A87F8;
              }
              .fontStyleBig{
                font-weight: 500;
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
  }
</style>