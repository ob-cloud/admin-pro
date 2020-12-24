<template>
  <div class="map-box">
    <div class="warnning status1" v-if="!editFlag&&form.status==1">该小区正在核对并完善信息中...</div>
    <div class="warnning status2" v-if="!editFlag&&form.status==2">该小区审核被驳回，驳回原因：{{ form.rejectionReason?form.rejectionReason:'-' }}</div>
    <div class="warnning status9" v-if="!editFlag&&form.status==9">该小区审核通过</div>
    <!-- 防止跳屏 -->
    <div v-if="!dataLoading" style="height:395px; ">
    </div>
    <div class="amap-page-container" v-if="dataLoading" :style="editFlag?'padding-top:20px;height: 419px;':'padding-top:15px;height: 380px;'">
      <el-amap ref="map" vid="amapDemo" :plugin="plugin" :center="mapCenter" :zoom="mapZoom" @zoomend="zoomEnd" class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :animation="marker.animation" :draggable="marker.draggable" :vid="index"></el-amap-marker>
      </el-amap>
    </div>
    <div class="modifyStyle clearfix">
      <div class="clearfix" style="width: 100%">
        <label-item class="f-fl labemItemStyle" title="城市" :must-fill="true">
          <a-select class="itemWidthStyle1" placeholder="请选择" v-if="editFlag" v-model="form.cityId"  @change="selectCity">
            <a-select-option :value="item.id" :key="item.id" v-for="(item) in cityList">{{ item.name }}</a-select-option>
          </a-select>
          <div class="itemStyle itemWidthStyle1" v-else>{{form.cityName}}</div>
        </label-item>
        <label-item class="f-fl labemItemStyle" title="区域" :must-fill="true">
          <a-select v-if="editFlag" v-model="form.areaName" placeholder="请选择" class="itemWidthStyle1" @change="chooseArea">
            <a-select-option v-for="(area,index) in areas" :key="index" :value="area.name" :label="area.name">{{area.name}}</a-select-option>
          </a-select>
          <div class="itemStyle itemWidthStyle1" v-else>{{form.areaName}}</div>
        </label-item>
        <label-item class="f-fl" title="商圈">
          <a-select class="itemWidthStyle1" placeholder="请选择" v-if="editFlag" v-model="form.townName" @change="chooseTown">
            <a-select-option  v-for="(town,index) in towns" :key="index" :value="town.name" :label="town.name">{{town.name}}</a-select-option>
          </a-select>
          <div class="itemStyle itemWidthStyle1" v-else>{{form.townName}}</div>
        </label-item>
      </div>
      <div class="clearfix" style="width: 100%;margin-top: 14px;">
        <label-item class="f-fl labemItemStyle" title="小区名" :must-fill="true">
          <a-input class="itemWidthStyle1" placeholder="请输入" v-model="form.name" v-if="editFlag"></a-input>
          <div class="itemStyle itemWidthStyle1" v-else>{{form.name}}</div>
        </label-item>
        <label-item class="f-fl" title="详细地址" :must-fill="true">
          <a-input class="itemWidthStyle2" placeholder="请输入" v-model="form.address" v-if="editFlag"></a-input>
          <div class="itemStyle itemWidthStyle2" v-else>{{form.address}}</div>
        </label-item>
      </div>
      <div class="clearfix" style="width: calc(100% - 6px);margin-top: 20px;">
        <div class="itemStyle" style="width: 100%"><span>精度：{{form.lng}}</span><span style="margin-left: 40px;">纬度：{{form.lat}}</span></div>
      </div>
    </div>
    <div class="clearfix" style="margin:0;padding: 0 20px 20px 20px;" v-if="form.status!=9">
      <a-button class="f-fr save-contract" type="warning" @click="handleSave" :loading="saveLoading" v-if="editFlag">保存</a-button>
      <a-button class="f-fr save-contract" type="warning" @click="goToEdit" v-if="!editFlag">编辑</a-button>
      <a-button class="f-fr quxiao" style="margin-right:20px;" @click="handleClose" type="warning">取消</a-button>
      <div class="f-fr" style="height: 40px;line-height: 40px;font-size: 12px;color: #FFA036;margin-right: 20px;">
        <a-icon type="exclamation-circle" style="margin-right: 4px;" />保存后，使用该小区的房源将一并修改
      </div>
    </div>
    <div class="clearfix" style="margin:0;padding: 0 20px 20px 20px;" v-else>
    </div>
  </div>
</template>

<script src="https://webapi.amap.com/maps?v=1.4.13&key=b21b9f5764e1fe30480d5d0f1fdac12a"></script>
<script>
import * as API from "@/api/setConfig";
import {getAreaListByCityId, getTownListByAreaId, insertCommunity} from "@/api/public";
import * as PublicAPI from "@/api/public";
export default {
  name: "viewVillageByGaodeMap",
  props: {
    id:{
      Type:String,
      default:'',
    },
  },
  data: function() {
    var me = this;
    return {
      plugin: [{
        pName: 'ToolBar',
        position:'RB',
      }],
      mapCenter:[],
      searchOption: {},
      mapZoom:16,
      areas:[],
      communities: [],
      towns: {},
      markers:[],
      originData:{},
      form: {
        status:1,
        communityName: "",
        communityId: "",
        address: "",
        name: "",
        region: "",
        areaName: "",
        areaId: "", // 区域id
        townName: "",
        townId: "" // 商圈id
      },
      dataLoading:false,
      saveLoading:false,
      editFlag:false,
      cityList:[],
    };
  },
  created() {
    this.initData();
    this.getCity();
  },
  methods: {
    selectCity(val){
      this.cityList.forEach((item)=>{
        if(val&&item.name == val){
          this.form.cityName = item.name;
          this.form.cityId = item.id;
        }
      })
      this.form.areaName = undefined;
      this.form.areaId = '';
      this.form.townName = undefined;
      this.form.townId = '';
    },
    chooseArea(val) {
      // 选择区域
      if (this.areas.length > 0) {
        for (var i = 0; i < this.areas.length; i++) {
          if (val&&this.areas[i].name == this.form.areaName) {
            this.form.areaName = this.areas[i].name;
            this.form.areaId = this.areas[i].id;
          }
        }
      }
      this.form.townName = undefined;
      this.form.townId = '';
      this.getTownList();
    },
    chooseTown(val) {
      // 选择商圈
      if (this.towns.length > 0) {
        for (var i = 0; i < this.towns.length; i++) {
          if(val&&this.towns[i].name==val){
            this.form.townName = this.towns[i].name;
            this.form.townId = this.towns[i].id;
          }
        }
      }
    },
    getCity(){
      PublicAPI.getCityList().then(res=>{
        this.cityList = res.data;
      })
    },
    getAreaList(){
      getAreaListByCityId(this.form.cityId).then(res => {
        // 根据城市id获取区域列表
        this.areas = res.data;
      });
    },
    getTownList(){
      getTownListByAreaId(this.form.areaId).then(res => {
        this.towns = res.data;
      });
    },
    zoomEnd(e) {
      // 获取地图的缩放级别
      this.mapZoom = e.target.getZoom();
    },
    handleClose(){
      if(this.editFlag){
        this.editFlag = false;
        //取消数据还原
        this.form = Object.assign({},this.originData);
        this.markers = [];
        this.mapCenter = [this.form.lng,this.form.lat];
        let obj = {
          position:[this.form.lng,this.form.lat],
          visible: true,
          animation:'AMAP_ANIMATION_BOUNCE',
          draggable:false,
        };
        this.markers.push(obj);
      }
      else{
        this.$emit('map_toggle_close');
      }
    },
    handleSave(){
      if(!this.form.cityId) {
        this.$message.warning('请选择城市！');
        return
      }
      if(!this.form.areaId) {
        this.$message.warning('请选择区域！');
        return
      }
      if(!this.form.name) {
        this.$message.warning('请输入小区名！');
        return
      }
      if(!this.form.address) {
        this.$message.warning('请输入地址！');
        return
      }
      this.saveLoading = true;
      let sendData = Object.assign({},this.form);
      sendData.coordinateSource = 2;
      API.communityTenantEdit(sendData).then(res => {
        if(!res){
          this.saveLoading = false;
        }
        if (res.code == 200) {
          this.$message.info('编辑成功');
          this.$emit('map_toggle_close',true);
        } else {
          this.$message.warn('添加失败');
        }
        this.saveLoading = false;
      });
    },
    goToEdit(){
      this.editFlag = true;
      this.markers[0].draggable = true;
      this.markers[0].events = {
        dragend: (e) => {
          this.mapCenter = [e.lnglat.lng, e.lnglat.lat];
          this.form.lng = e.lnglat.lng;
          this.form.lat = e.lnglat.lat;
        }
      };
    },
    initData(){
      this.dataLoading = false;
      API.communityViewTenantCreate({id:this.id}).then(res => {
        if (res&&res.code === "200") {
          this.form = res.data;
          this.originData = res.data;
          if(!this.form.townName){
            this.form.townName = undefined;
          }
          this.dataLoading = true;
          this.mapCenter = [this.form.lng,this.form.lat];
          let obj = {
            position:[this.form.lng,this.form.lat],
            visible: true,
            animation:'AMAP_ANIMATION_BOUNCE',
            draggable:false,
          };
          this.markers.push(obj);
          this.getAreaList();
          this.getTownList();
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.map-box {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  .warnning{
    line-height: 40px;
    height: 40px;
    background: #FFF7EE;
    font-size: 14px;
    text-align: center;
  }
  .status1{
    color: #FFA036;
  }
  .status2{
    color: #FB4246;
  }
  .status9{
    color:#0a87f8;
  }
  .amap-page-container {
    position: relative;
    width: 100%;
    padding: 0 20px;
  }
  .modifyStyle{
    width: 100%;
    padding: 10px 20px 30px 20px;
    .labemItemStyle{
      margin-right: 20px;
    }
    .itemStyle{
      height: 34px;
      line-height: 34px;
      background: #F6F7F8;
      border-radius: 4px;
      padding-left: 10px;
    }
    .itemWidthStyle1{
      width: 238px;
    }
    .itemWidthStyle2{
      width: 496px;
    }
    .modifyAreaStyle{
      position: relative;
      margin-right: 20px;
      width: calc(50% - 20px);
      .select-prefix{
        position: absolute;
        left:10px;
        top:8px;
        width: 50px;
        z-index: 99;
        color: #c0c4cc;
        .must-color{
          color: red;
        }
      }
    }
    .modifyTownStyle{
      position: relative;
      margin-right: 20px;
      width: calc(50% - 20px);
      .select-prefix{
        position: absolute;
        left:10px;
        top:8px;
        width: 50px;
        z-index: 99;
        color: #c0c4cc;
      }
    }
    .modifyAddressStyle{
      width: calc(100% - 90px);
      margin-right: 20px;
      position: relative;
      .select-prefix{
        position: absolute;
        left:10px;
        top:8px;
        width: 50px;
        z-index: 99;
        color: #c0c4cc;
        .must-color{
          color: red;
        }
      }
    }
    .modifyButtonStyle{
      width: 66px;
      height: 34px;
      line-height: 34px;
      background-color: fade(#0A87F8, 10%);
      text-align: center;
      .correct{
        color: #0A87F8;
      }
    }
    /deep/ .ant-select-selection--single{
      height: 34px;
      line-height: 34px;
    }
    /deep/ .ant-input{
      height: 34px;
      line-height: 34px;
      border: 1px solid #d9d9d9;
      padding-left: 10px;
    }
    /deep/ .ant-select-selection{
      border: 1px solid #d9d9d9;
    }
    /deep/ .ant-select-selection__rendered{
      height: 34px;
      line-height: 34px;
      margin-left: 10px;
    }
    .padding-left160{
      width: 100%;
    }
  }
  .save-contract {
    width: 120px;
    height: 40px;
    background: rgba(10, 135, 248, 1);
    border-radius: 5px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
  }
  .quxiao {
    width: 120px;
    height: 40px;
    border-radius: 5px;
  }
}
</style>