<template>
  <!-- 发房配置 -->
  <div class="hairRoom-box">
    <div class="title clearfix">
      <div class="blueStyle f-fl"></div>
      <div class="titleFont f-fl">房源自动上架</div>
    </div>
    <div class="describe" style="height: 38px;line-height: 20px;padding: 9px 0 9px 5px;">
      开启自动上架后，操作 新录房源、租客合同退租、手动变更房源状态时可租房源将自动上架到自有平台上；关闭后，不会自动上架。
    </div>
    <div class="checkBox clearfix">
      <div class="f-fl clearfix">
        <div class="allCheck f-fl checked" v-if="hairRoom1.onOff==1">
          <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
          <div class="f-fl fontStyle">开启</div>
        </div>
        <div class="allCheck f-fl clearfix cursor" v-if="hairRoom1.onOff==0" @click="changeResrource(hairRoom1,1)">
          <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
          <div class="f-fl fontStyle">开启</div>
        </div>
      </div>
      <div class="f-fl margin50">
        <div class="allCheck checked clearfix" v-if="hairRoom1.onOff==0">
          <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
          <div class="f-fl fontStyle">关闭</div>
        </div>
        <div class="allCheck clearfix cursor" v-if="hairRoom1.onOff==1" @click="changeResrource(hairRoom1,0)">
          <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
          <div class="f-fl fontStyle">关闭</div>
        </div>
      </div>
    </div>
    <div class="saveButton clearfix">
      <a-button size="large" type="primary" class="formItemMarginButton" @click="save(hairRoom1)">
        保存
      </a-button>
    </div>
    <div class="line"></div>
    <div class="title clearfix">
      <div class="blueStyle f-fl"></div>
      <div class="titleFont f-fl">房源定时上架</div>
    </div>
    <div class="describe" style="height: 38px;line-height: 20px;padding: 9px 0 9px 5px;">
      开启定时上架后，房源每天按照设置的时间自动上架到自有平台上；关闭将不会定时上架
    </div>
    <div class="checkBox clearfix">
      <div class="f-fl clearfix">
        <div class="allCheck f-fl checked" v-if="hairRoom2.onOff==1" style="position: relative;">
          <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
          <div class="f-fl fontStyle">开启</div>
          <div style="position: absolute;top:13px;left: 32px;">
            <img style="width: 11.7px;height: 7.2px;" src="../../../assets/extension/poper.png">
          </div>
        </div>
        <div class="allCheck f-fl clearfix cursor" v-if="hairRoom2.onOff==0" @click="changeResrource(hairRoom2,1)">
          <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
          <div class="f-fl fontStyle">开启</div>
        </div>
      </div>
      <div class="f-fl margin50">
        <div class="allCheck checked clearfix" v-if="hairRoom2.onOff==0">
          <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
          <div class="f-fl fontStyle">关闭</div>
        </div>
        <div class="allCheck clearfix cursor" v-if="hairRoom2.onOff==1" @click="changeResrource(hairRoom2,0)">
          <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
          <div class="f-fl fontStyle">关闭</div>
        </div>
      </div>
    </div>
    <div class="timerStyle" v-if="hairRoom2.onOff==1">
      <div style="margin-top: 20px;">自动上架时间</div>
      <div class="clearfix" style="margin-top: 10px;">
        <div class="f-fl" style="font-size: 12px;line-height: 24px;">每日</div>
        <a-select v-model="hairRoom2.value.hour" class="f-fl" style="width: 92px;height: 24px;margin: 0 5px;">
          <a-select-option :value="item" :key="item" v-for="(item) in timeList">{{ item }}</a-select-option>
        </a-select>
        <div class="f-fl" style="font-size: 12px;line-height: 24px;">点</div>
      </div>
      <div style="margin-top: 20px;">自动上架房源状态</div>
      <div class="checkStyle">
        <a-checkbox-group v-model="hairRoom2.value.statusList" @change="onChange">
          <a-checkbox :value="1">
            <span style="color: #111111">空置</span>
          </a-checkbox>
          <a-checkbox :value="2">
            <span style="color: #111111">租约快到期</span><span style="color: #777777;">(租客30天内到期)</span>
          </a-checkbox>
          <a-checkbox :value="3">
            <span style="color: #111111">租约到期未退</span>
          </a-checkbox>
          <a-checkbox :value="4">
            <span style="color: #111111">配置</span>
          </a-checkbox>
        </a-checkbox-group>
      </div>
    </div>
    <div class="saveButton clearfix" :style="hairRoom2.onOff==1?'margin-top:22px;':''">
      <a-button size="large" type="primary" class="formItemMarginButton" @click="save(hairRoom2)">
        保存
      </a-button>
    </div>
    <div class="line"></div>
    <div class="title clearfix">
      <div class="blueStyle f-fl"></div>
      <div class="titleFont f-fl">上架房源统一呼叫中心</div>
    </div>
    <div class="describe" style="margin-right:0px;line-height: 20px;padding-top: 9px;">
      ① 设置统一呼叫中心后，来源于自有平台的客户，联系管家时会直接联系到已设置好的呼叫中心人员；未被统一呼叫中心负责人覆盖的房源，上架时的管家还是默认为房源负责人
    </div>
    <div class="describe" style="margin: 0 0 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
      ② 不统一呼叫中心，默认上架到自有平台的管家为房源负责人
    </div>
    <div class="checkBox clearfix">
      <div class="f-fl clearfix">
        <div class="allCheck f-fl checked" v-if="hairRoom3.onOff==1" style="position: relative;">
          <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
          <div class="f-fl fontStyle">统一呼叫中心</div>
          <div style="position: absolute;top:13px;left: 32px;">
            <img style="width: 11.7px;height: 7.2px;" src="../../../assets/extension/poper.png">
          </div>
        </div>
        <div class="allCheck f-fl clearfix cursor" v-if="hairRoom3.onOff==0" @click="changeResrource(hairRoom3,1)">
          <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
          <div class="f-fl fontStyle">统一呼叫中心</div>
        </div>
      </div>
      <div class="f-fl margin50">
        <div class="allCheck checked clearfix" v-if="hairRoom3.onOff==0">
          <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
          <div class="f-fl fontStyle">不统一</div>
        </div>
        <div class="allCheck clearfix cursor" v-if="hairRoom3.onOff==1" @click="changeResrource(hairRoom3,0)">
          <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
          <div class="f-fl fontStyle">不统一</div>
        </div>
      </div>
    </div>
    <div class="callStyle" v-if="hairRoom3.onOff==1">
      <div class="basicsInfo">
        <div class="table">
          <div class="table-title">
            <div style="max-width: 207px;text-align: left;padding-left: 12px;background: #F5F7FF;color: #666666;border-radius:4px 0px 0px 0px">负责城市/区域</div>
            <div style="max-width: 322px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #666666;">负责客服</div>
            <div style="max-width: 70px;text-align: center;background: #F5F7FF;color: #666666;border-radius:0px 4px 0px 0px">操作</div>
          </div>
          <div class="house-data u-no-border" v-for="(item,index) in hairRoom3.value.customerList" :key="index">
            <div class="cityStyle" style="max-width: 207px;padding-left: 12px;">
              <city-town-tree ref="selectCityTown" :showTown="false" placeholder="请选择负责区域" @cancelOtherTree="cancelOtherTree(['selectDeptEmp'])"
                              @selectChange="selectCityTownChange($event,index)" :defaultValue="item.areaInfo" :defaultCityId="item.cityId" :defaultAreaId="item.areaId" placement="topLeft">
              </city-town-tree>
            </div>
            <div class="maintainerStyle" style="max-width: 322px;text-align: left;padding-left: 14px;">
              <dept-employee-tree ref="selectDeptEmp" placeholder="请选择负责人" placement="topLeft"
                                  @cancelOtherTree="cancelOtherTree(['selectCityTown'])" :defaultValue="item.maintainerInfo"
                                  @selectChange="selectDeptEmp($event,index)">
              </dept-employee-tree>
            </div>
            <div style="max-width: 70px;text-align: center;">
              <icon-font  @click="deleteItem(index)" class="delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
            </div>
          </div>
          <div class="house-data u-no-border cursor" @click="AddItem(true)" v-if="hairRoom3.value.customerList.length==0">
            <div class="continueAddStyle">
              <icon-font type="iconyumengtubiao_tianjia" />添加
            </div>
          </div>
          <div class="house-data u-no-border cursor" @click="AddItem(false)" v-if="hairRoom3.value.customerList.length>0">
            <div class="continueAddStyle">
              <icon-font type="iconyumengtubiao_tianjia" />继续添加
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="saveButton clearfix" :style="hairRoom3.onOff==1?'margin-top:20px;':''">
      <a-button size="large" type="primary" class="formItemMarginButton" @click="save(hairRoom3)">
        保存
      </a-button>
    </div>
    <div class="line"></div>
    <div class="title clearfix">
      <div class="blueStyle f-fl"></div>
      <div class="titleFont f-fl">合租房源上架到自有平台时，是否按照整租上架</div>
    </div>
    <div class="describe" style="margin-right:0px;line-height: 20px;padding-top: 9px;">
      ① 设置为"是"后：操作上架房源到自有官网/官微平台上时，合租房源会以整租的形式和合租子间的形式同步上架到自有官网/官微平台上
    </div>
    <div class="describe" style="margin: 0 0 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
      ② 设置为"否"后：房源重新上架到自有官网/官微平台上时，以整租形式上架到自有官网/官微平台上的房源会自动下架
    </div>
    <div class="checkBox clearfix">
      <div class="f-fl clearfix">
        <div class="allCheck f-fl checked" v-if="hairRoom4.onOff==1">
          <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
          <div class="f-fl fontStyle">是</div>
        </div>
        <div class="allCheck f-fl clearfix cursor" v-if="hairRoom4.onOff==0" @click="changeResrource(hairRoom4,1)">
          <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
          <div class="f-fl fontStyle">是</div>
        </div>
      </div>
      <div class="f-fl" v-if="hairRoom4.onOff==1">
      </div>
      <div class="f-fl margin50">
        <div class="allCheck checked clearfix" v-if="hairRoom4.onOff==0">
          <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
          <div class="f-fl fontStyle">否</div>
        </div>
        <div class="allCheck clearfix cursor" v-if="hairRoom4.onOff==1" @click="changeResrource(hairRoom4,0)">
          <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
          <div class="f-fl fontStyle">否</div>
        </div>
      </div>
    </div>
    <div class="saveButton clearfix">
      <a-button size="large" type="primary" class="formItemMarginButton" @click="save(hairRoom4)">
        保存
      </a-button>
    </div>
    <div class="line"></div>
    <div class="title clearfix">
      <div class="blueStyle f-fl"></div>
      <div class="titleFont f-fl">独栋房源上架到自有平台时，房型中的房间是否按照整租上架</div>
    </div>
    <div class="describe" style="margin-right:0px;line-height: 20px;padding-top: 9px;">
      ① 设置为"是"后：操作上架房源到自有平台时，独栋房源会以房型和整租房间的形式同步上架到自有平台上
    </div>
    <div class="describe" style="margin: 0 0 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
      ② 设置为"否"后：房源重新上架到自有平台时，以整租房间形式上架到自有平台上的房源需手动下架
    </div>
    <div class="checkBox clearfix">
      <div class="f-fl clearfix">
        <div class="allCheck f-fl checked" v-if="hairRoom5.onOff==1">
          <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
          <div class="f-fl fontStyle">是</div>
        </div>
        <div class="allCheck f-fl clearfix cursor" v-if="hairRoom5.onOff==0" @click="changeResrource(hairRoom5,1)">
          <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
          <div class="f-fl fontStyle">是</div>
        </div>
      </div>
      <div class="f-fl" v-if="hairRoom5.onOff==1">
      </div>
      <div class="f-fl margin50">
        <div class="allCheck checked clearfix" v-if="hairRoom5.onOff==0">
          <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
          <div class="f-fl fontStyle">否</div>
        </div>
        <div class="allCheck clearfix cursor" v-if="hairRoom5.onOff==1" @click="changeResrource(hairRoom5,0)">
          <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
          <div class="f-fl fontStyle">否</div>
        </div>
      </div>
    </div>
    <div class="saveButton clearfix">
      <a-button size="large" type="primary" class="formItemMarginButton" @click="save(hairRoom5)">
        保存
      </a-button>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/decision";
import DeptEmployeeTree from '@/components/DeptEmployeeTree/customer'
import CityTownTree from '@/components/CityTownTree/customer'
export default {
  name: "hairRoom",
  components: {
    DeptEmployeeTree,
    CityTownTree,
  },
  props: {

  },
  data() {
    return {
      hairRoom1:{},
      hairRoom2:{},
      hairRoom3:{},
      hairRoom4:{},
      hairRoom5:{},
      hairRoomDefault1:{
        onOff:false,
        value:'0',
        module:'MARKETING',
        bizPoint:'PROMOTE_OWNPLAT',
        mark:'HOUSE_OWNPLAT_AUTO_PUSH',
        chooseType:2,
        id:'',
        comment:'',
        name:'自有平台【微信/官网】空置房源自动上架',
      },
      hairRoomDefault2:{
        onOff:false,
        value:{
          statusList:[1],
          hour:10,
        },
        module:'MARKETING',
        bizPoint:'PROMOTE_OWNPLAT',
        mark:'HOUSE_OWNPLAT_TIMING_PUSH',
        chooseType:5,
        id:'',
        comment:'',
        name:'自有平台【微信/官网】空置、预到期、已到期房源定时上架',
      },
      hairRoomDefault3:{
        onOff:false,
        value:{
          customerList:[],
        },
        module:'MARKETING',
        bizPoint:'PROMOTE_OWNPLAT',
        mark:'OWNPLAT_UNFIED_CUSTOMER',
        chooseType:5,
        id:'',
        comment:'',
        name:'自有平台【微信/官网】统一客服',
      },
      hairRoomDefault4:{
        onOff:false,
        value:'0',
        module:'MARKETING',
        bizPoint:'PROMOTE_OWNPLAT',
        mark:'OWNPLAT_SHALE_AS_WHOLE',
        chooseType:2,
        id:'',
        comment:'',
        name:'自有平台【微信/官网】合租按整租处理',
      },
      hairRoomDefault5:{
        onOff:false,
        value:'0',
        module:'MARKETING',
        bizPoint:'PROMOTE_OWNPLAT',
        mark:'OWNPLAT_CENTRALIZED_AS_WHOLE',
        chooseType:2,
        id:'',
        comment:'',
        name:'自有平台【微信/官网】独栋按整租处理',
      },
      timeList:[],
      customerobj:{
        cityId:'',
        cityName:'',
        areaId: '',
        areaName:'',
        areaInfo:'',
        maintainerId:'',
        maintainerName:'',
        maintainerPhone:'',
        maintainerInfo:'',
      },
    }
  },
  created() {
    this.getTimeList();
    this.initDecisionList();
  },
  methods:{
    deleteItem(index){
      this.hairRoom3.value.customerList.splice(index,1);
    },
    AddItem(flag){
      let obj = Object.assign({},this.customerobj);
      if(!flag){
        //检查下是否填写完成
        let temp = false;
        this.hairRoom3.value.customerList.forEach((item)=>{
          if(!item.cityId){
            temp = true;
          }
          if(!item.maintainerId){
            temp = true;
          }
        });
        if(temp){
          this.$message.warning('请完善数据');
          return;
        }
      }
      this.hairRoom3.value.customerList.push(obj);
    },
    getTimeList(){
      for (let i = 0; i < 24; i++) {
        this.timeList.push(i)
      }
    },
    onChange(){

    },
    save(data){
      //检验
      if(data.mark  == 'HOUSE_OWNPLAT_TIMING_PUSH'&&data.onOff==1){
        if(this.hairRoom2.value.statusList.length == 0){
          this.$message.warning('请至少选择一种自动上架房源状态');
          return;
        }
      }
      if(data.mark  == 'OWNPLAT_UNFIED_CUSTOMER'&&data.onOff==1){
        let temp = false;
        this.hairRoom3.value.customerList.forEach((item)=>{
          if(!item.cityId){
            temp = true;
          }
          if(!item.maintainerId){
            temp = true;
          }
        });
        if(temp){
          this.$message.warning('请完善数据');
          return;
        }
        if(this.hairRoom3.value.customerList.length==0){
          this.$message.warning('请至少添加一条统一呼叫中心数据');
          return;
        }
      }
      if(data.id){
        API.decisionEdit(data).then(res => {
          if (res.code === '200') {
            this.$message.info('修改成功');
          }
          this.initDecisionList();
        });
      }else{
        API.decisionAdd(data).then(res => {
          if (res.code === '200') {
            this.$message.info('添加成功');
          }
          this.initDecisionList();
        });
      }
    },
    changeResrource(data,val){
      data.onOff = val;
      if(data.mark  == 'HOUSE_OWNPLAT_TIMING_PUSH'){
        if(val == 0){
          data.value = {
            statusList:[1],
            hour:10,
          };
        }
      }
      else if(data.mark  == 'OWNPLAT_UNFIED_CUSTOMER'){
        if(val == 0){
          data.value = {
            customerList:[],
          };
        }
      }
      else{
        data.value = '0';
      }

    },
    initDecisionList(){
      let parameter = {
        module: 'MARKETING',
        bizPoint:'PROMOTE_OWNPLAT',
      };
      API.decisionList(parameter).then(res => {
        if (res.code === '200') {
          this.hairRoom1 = Object.assign({},this.hairRoomDefault1);
          this.hairRoom2 = Object.assign({},this.hairRoomDefault2);
          this.hairRoom3 = Object.assign({},this.hairRoomDefault3);
          this.hairRoom4 = Object.assign({},this.hairRoomDefault4);
          this.hairRoom5 = Object.assign({},this.hairRoomDefault5);
          if(res.data && res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              if(res.data[i].mark == 'HOUSE_OWNPLAT_AUTO_PUSH'){
                this.hairRoom1 = res.data[i];
              }
              else if(res.data[i].mark == 'HOUSE_OWNPLAT_TIMING_PUSH'){
                this.hairRoom2 = res.data[i];
                if(this.hairRoom2.value){
                  this.hairRoom2.value = JSON.parse(this.hairRoom2.value);
                }
              }
              else if(res.data[i].mark == 'OWNPLAT_UNFIED_CUSTOMER'){
                this.hairRoom3 = res.data[i];
                if(this.hairRoom3.value){
                  this.hairRoom3.value = JSON.parse(this.hairRoom3.value);
                }
              }
              else if(res.data[i].mark == 'OWNPLAT_SHALE_AS_WHOLE'){
                this.hairRoom4 = res.data[i];
              }
              else if(res.data[i].mark == 'OWNPLAT_CENTRALIZED_AS_WHOLE'){
                this.hairRoom5 = res.data[i];
              }
            }
          }
        }
      });
    },
    cancelOtherTree(typeRef=[]){
      typeRef.forEach((name)=>{
        if (this.$refs[name]){
          this.$refs[name].showTree = false
        }
      })
    },
    selectCityTownChange(selectObj,index) {
       this.hairRoom3.value.customerList[index].cityId = selectObj.cityId;
      this.hairRoom3.value.customerList[index].cityName = selectObj.cityName;
      this.hairRoom3.value.customerList[index].areaId = selectObj.areaId;
      this.hairRoom3.value.customerList[index].areaName = selectObj.areaName;
      this.hairRoom3.value.customerList[index].areaInfo = selectObj.name;

    },
    selectDeptEmp(selectObj,index) {
      if(selectObj.type=='employee'){
        this.hairRoom3.value.customerList[index].maintainerId = selectObj.id;
        this.hairRoom3.value.customerList[index].maintainerName = selectObj.name;
        this.hairRoom3.value.customerList[index].maintainerPhone = selectObj.phone;
        this.hairRoom3.value.customerList[index].maintainerInfo = selectObj.name+'-'+selectObj.phone;
      }
      else{
        this.hairRoom3.value.customerList[index].maintainerId = '';
        this.hairRoom3.value.customerList[index].maintainerName = '';
        this.hairRoom3.value.customerList[index].maintainerPhone = '';
        this.hairRoom3.value.customerList[index].maintainerInfo = '';
      }
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
  .hairRoom-box{
    padding: 25px 20px 0 20px;
    .title{
      width: 100%;
      .blueStyle{
        width:4px;
        height:16px;
        background:rgba(10,135,248,1);
        border-radius:2px;
      }
      .titleFont{
        height:16px;
        line-height: 16px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:#111111;
        margin-left: 10px;
      }
    }
    .describe{
      margin: 10px 0 0 14px;
      padding-left: 5px;
      line-height: 34px;
      background:rgba(247,248,251,1);
      color: #777777;
    }
    .checkBox{
      margin: 11px 0 0 14px;
      .allCheck{
        height: 30px;
        line-height: 30px;
        svg{
          width: 16px;
          height: 16px;
        }
      }
      .checked{
        color: #0A87F8;
      }
      .unEditStyle{
        color: #BBBBBB !important;
      }
      .fontStyle{
        margin-left: 8px;
        height:30px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:#111111;
        line-height:30px;
      }
      .inputStyleDiv {
        margin-left: 15px;
        font-size: 12px;
        .mustFill{
          color:#FB4246;
          margin-left: 4px;
        }
      }
      .inputStyle {
        width: 56px;
        height: 24px;
      }
      .margin50{
        margin-left: 50px;
      }
      /deep/ .ant-input{
        padding: 4px 5px;
        font-size: 12px;
      }
    }
    .saveButton{
      margin: 12px 0 20px 14px;
      .formItemMarginButton{
        width:100px;
        height:28px;
        background:rgba(10,135,248,1);
        border-radius:4px;
        color: #FFFFFF;
      }
      .unClickStyle{
        background:#DDDDDD !important;
        color: #FFFFFF;
        border:none;
        text-align: center;
        height: 28px;
        line-height: 28px;
      }
      .warning{
        height: 28px;
        line-height: 28px;
        color: #FFA036;
        font-size: 12px;
        margin-left: 13px;
        svg{
          width: 14px;
          height: 14px;
        }
      }
    }
    .line{
      margin: 0 0 20px 14px;
      height:1px;
      border: 1px dashed #DDDDDD;
    }
    .selectStyle{
      margin-left: 12px;
      /deep/ i{
        width: 14px;
        height: 14px;
      }
      /deep/ svg{
        width: 14px;
        height: 14px;
      }
    }
    .timerStyle{
      margin: 2px 0 0 20px;
      padding: 0 10px;
      border:1px solid rgba(238,238,238,1);
      width:579px;
      height:181px;
      /deep/ .ant-select-selection--single{
        height: 24px;
      }
      /deep/ .ant-select-selection__rendered{
        height: 22px;
      }
      .checkStyle{
        margin-top: 10px;
        span{
          font-size: 12px;
        }
        /deep/ .ant-checkbox-wrapper{
          margin-right: 10px;
        }
      }
      /deep/ .ant-checkbox-input{
        width: 14px;
        height: 14px;
      }
      /deep/ .ant-checkbox-inner{
        width: 14px;
        height: 14px;
      }
      /deep/ .ant-select-selection-selected-value{
        height: 22px;
        line-height: 22px;
      }
    }
    .callStyle{
      width: 586px;
      margin: 2px 0 0 20px;
      padding: 5px;
      border: 1px solid #EEEEEE;
      border-radius: 4px;
      .basicsInfo{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .item{
          display: flex;
          justify-content: flex-start;
          margin-right: 15px;
        }
        .table{
          width: 576px;
          border-left: 1px solid #DDDDDD;
          border-top: 1px solid #DDDDDD;
          font-size: 12px;
          border-radius: 4px;
          .table-title{
            display: flex;
            background:rgba(246,247,251,1);
            color: #666666;
            border-radius:4px 4px 0px 0px;
            & > div {
              flex: 1;
              height: 34px;
              line-height: 34px;
              border-right: 1px solid #DDDDDD;
              border-bottom: 1px solid #DDDDDD;
            }
            .mustFill{
              margin-left: 2px;
              color: #FB4246;
            }
          }
          .house-data {
            display: flex;
            border-radius:0px 0px 4px 4px ;
            & > div {
              flex: 1;
              height: 34px;
              line-height: 34px;
              text-align: left;
              border-right: 1px solid #DDDDDD;
              border-bottom: 1px solid #DDDDDD;
              background-color: #ffffff;
              .delete-icon {
                color: red;
                font-size: 14px;
              }
            }
            /deep/ .ant-select-selection__rendered{
              font-size: 12px;
              margin-left: 0;
            }
            /deep/ .ant-select-arrow i{
            }
            /deep/ .ant-select-selection__rendered{
              margin-right: 0;
            }
            /deep/ .ant-input{
              font-size: 12px;
            }
            /deep/ .ant-checkbox-inner{
              width: 12px;
              height: 12px;
            }
            .addonAfterStyle{
              font-size: 12px;
              color: #111111;
              right: 2px;
            }
            .cityStyle{
              /deep/ .tree-wrap .tree .content ul{
                border-top: 1px solid #DDDDDD;
              }
              /deep/ svg{
                width: 12px;
                height: 12px;
              }
            }
            .maintainerStyle{
              /deep/ svg{
                width: 12px;
                height: 12px;
              }
            }
            /deep/ .tree{
              width: 250px;
            }
          }
          .mustFillStyle{
            /deep/ svg{
              width: 12px;
              height: 12px;
            }
            .mustFillFont{
              color: #777777;
              font-size: 13px;
              .editStyle{
                margin-right: 2px;
                color: #777777;
              }
            }
          }
        }
        .add-subject-style{
          width: 104px;
          height: 38px;
          line-height: 38px;
          font-size: 14px;
          border-radius:4px;
          border:1px solid rgba(10,135,248,1);
          text-align: center;
          border-radius:0px 0px 4px 4px ;
          color: #0A87F8;
          i{
            vertical-align: 0em;
            margin-right: 4px;
          }
          svg{
            width: 12px;
            height: 12px;
          }
        }
        .continueAddStyle{
          font-size: 14px;
          color: #0A87F8;
          text-align: center !important;
          border-radius:0px 0px 4px 4px ;
          i{
            vertical-align: 0em;
            margin-right: 8px;
          }
          svg{
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
</style>