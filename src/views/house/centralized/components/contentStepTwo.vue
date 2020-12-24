<template>
  <div class="step_two_css">
    <head-title title="项目信息"></head-title>
    <div class="house_info_css">
      <div class="row_info">
        <p>项目名称:<span>{{listFloorRoomData.name}}</span></p>
        <p>
          共<span>{{listFloorRoomData.floorQuantity}}</span>层，共
          <span>{{listFloorRoomData.roomQuantity}}</span>间
        </p>
      </div>
      <div class="row_info row1_info">
        <p class="ban">禁用<span>{{listFloorRoomData.disabledQuantity}}</span>间</p>
        <p class="enable">启用 {{listFloorRoomData.normalQuantity}}间</p>
        <p class="spare">剩余 {{listFloorRoomData.unallocatedQuantity}} 间未分配</p>
      </div>
    </div>
    <div class="toolTip">
      <a-tooltip placement="top" title="通过创建房型，就可以将此项目内户型、面积、租金、配置等相似的房间，一次性批量完善信息，大幅度提高效率!">
        <icon-font type="iconyumengtubiao_bangzhu" />
      </a-tooltip>
    </div>
    <div class="house_room_main_css">
      <div class="main_left">
        <div class="head_title_css">
          <span class="title_info">房型名称</span>
        </div>
        <div style=" max-height: calc(100% - 138px);overflow-y: scroll;">
          <div v-for="i in roomTypeListData" :key="i.id" style="width: 112px;margin-left: 10px;">
            <room-type-box :name="i.name" :id="i.id" @editRoomType="editRoomType" @initPage="initPage"></room-type-box>
          </div>
        </div>
        <add-box :typeFlag="2" @openAddRoomType="openAddRoomType"/>
      </div>
      <div class="main_right">
        <head-title title="房间信息"></head-title>
        <ul class="roomList">
          <li v-for="j in listFloorRoomData.floorList" :key="j.floor">
            <p class="floot_css">
              <span>{{ j.floor }}F</span>
              <a-checkbox @change="value => selectRoom(value,j,j.floor)" v-model="j.checkedAll">全选</a-checkbox>
            </p>
            <div class="room_box_item">
              <div v-for="k in j.roomList" :key="k.id">
                <room-box type="room" :name="k.roomName" :id = "k.id" :tipName="k.roomTypeName" :isCheck="k.isChecked"
                          :isClose="k.status==7?2:1" @listFloorRoom="listFloorRoom" @selectOneRoom="selectOneRoom"/>
              </div>
              <add-box :buildingProjectId="buildingProjectId" :floorNo="j.floor" @initPage="initPage" :typeFlag="1"/>
            </div>
          </li>
        </ul>
        <div class="unifySetting">
          <p class="set_item">
            <label>对「</label>
            <span>
                            {{houseRoomNameListString}}
						</span>
            <label>」房间进行统一配置</label>
          </p>
          <div class="set_info f-clearfix">
            <div class="selectItem f-fl">
              <div class="titleTip1 f-fl">选择房型</div>
              <a-select placeholder="请选择" style="width:130px;height:34px" v-model="configData.roomTypeId" @change="selectRoomType">
                <a-select-option v-for="(item) in roomTypeListData" :value="item.id" :key="item.id" >{{ item.name }}</a-select-option>
              </a-select>
            </div>
            <div class="selectItem f-fl">
              <div class="titleTip1 f-fl">出租价格</div>
              <a-input placeholder="请输入" v-model="configData.rentalPrice" style="width: 100px;height: 34px" v-validate="'money'">
                <label slot="suffix">元</label>
              </a-input>
            </div>
            <div class="selectItem f-fl">
              <div class="titleTip2 f-fl">朝向</div>
              <a-select  placeholder="请选择" style="width:130px;height:34px" v-model="configData.orientation">
                <a-select-option :value="1">东</a-select-option>
                <a-select-option :value="2">南</a-select-option>
                <a-select-option :value="3">西</a-select-option>
                <a-select-option :value="4">北</a-select-option>
                <a-select-option :value="5">南北</a-select-option>
              </a-select>
            </div>
            <div class="selectItem f-fl">
              <div class="titleTip2 f-fl">面积</div>
              <a-input placeholder="请输入" v-model="configData.houseArea" style="width: 100px;height: 34px" v-validate="'area'">
                <label slot="suffix">㎡</label>
              </a-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-modal centered v-model="addRoomTypeDialog" v-if="addRoomTypeDialog" :footer="null" :title='addRoomTypeTitle'
             class="ownModalBorder titDialog" width="1000px">
      <add-room-type :roomTypeId="roomTypeId" :buildingProjectId="buildingProjectId"  @cancelAdd="handleCancel" @initPage="initPage"></add-room-type>
    </a-modal>
  </div>
</template>
<script>
import headTitle from "./headTitle";
import roomTypeBox from "./roomTypeBox";
import roomBox from "./roomBox";
import addBox from "./addBox";
import addRoomType from "./addRoomType";
import  * as API from '@/api/centralizedHouse';
export default {
  name: "ContentStepTwo",
  props: {
    buildingProjectId: {
      type: String,
    },
  },
  components: {
    headTitle,
    roomTypeBox,
    roomBox,
    addBox,
    addRoomType
  },
  created(){
    this.initPage();
  },
  data() {
    return {
      listFloorRoomData:{
      },
      roomTypeListData:[],
      addRoomTypeDialog:false,
      addRoomTypeTitle:"创建房型",
      houseObj:{},
      roomTypeId:"",
      configData:{
        houseArea:undefined,
        houseRoomIdList:[],
        houseRoomNameList:[],
        orientation:2,
        rentalPrice:undefined,
        roomTypeId:undefined,
      },
      selectedFloor:[],
      houseRoomNameListString:"",
      allFloor:0,
      allRoomList:[],
      styleType:0,
    };
  },
  mounted() {},
  methods: {
    listFloorRoom(){
      API.listFloorRoom(this.buildingProjectId).then(res => {
        if (res.code == "200") {
          //清空一次数据
          this.allRoomList = [];
          this.listFloorRoomData = res.data;
          if(this.listFloorRoomData.floorList){
            let tempData = this.listFloorRoomData.floorList;
            for (let i = 0; i < tempData.length; i++) {
              this.allFloor = tempData[i].floor;
              tempData.checkedAll = false;
              if(tempData[i].roomList){
                let tempList= tempData[i].roomList;
                for (let j = 0; j < tempList.length; j++) {
                  tempList[j].isChecked = false;
                  this.allRoomList.push(tempList[j].id);
                }
              }
            }
            if(this.allFloor==1){
              if(this.allRoomList.length<8){
                this.styleType = 1;
              }
              else if(this.allRoomList.length<16){
                this.styleType = 2;
              }else{
                this.styleType = 3;
              }
            }
            if(this.allFloor>2){
              this.styleType = 3;
            }
          }
        }
      })
    },
    roomTypeList(){
      API.roomTypeList(this.buildingProjectId).then(res => {
        if (res.code == "200") {
          this.roomTypeListData = res.data;
        }
      })
    },
    initPage(){
      this.configData.houseRoomIdList = [];
      this.configData.houseRoomNameList = [];
      this.selectedFloor = [];
      this.houseRoomNameListString = "";
      this.addRoomTypeDialog = false;
      this.listFloorRoom();
      this.roomTypeList();
    },
    openAddRoomType(){
      this.roomTypeId = "";
      this.addRoomTypeDialog = true;
      this.addRoomTypeTitle = '创建房型';
    },
    handleCancel(){
      this.addRoomTypeDialog = false;
    },
    editRoomType(value){
      this.roomTypeId = value;
      this.addRoomTypeDialog = true;
      this.addRoomTypeTitle = '编辑房型';
    },
    selectOneRoom(id,name){
      if(this.listFloorRoomData.floorList) {
        let tempData = this.listFloorRoomData.floorList;
        //找出所选的房间所在楼层
        let floorTemp = 0;
        for (let i = 0; i < tempData.length; i++) {
          if (tempData[i].roomList) {
            let tempList = tempData[i].roomList;
            for (let j = 0; j < tempList.length; j++) {
              if (tempList[j].id == id) {
                floorTemp = i;
                if (tempList[j].isChecked) {
                  tempList[j].isChecked = false;
                  //移除
                  let idIndex = this.configData.houseRoomIdList.indexOf(id);
                  if (idIndex > -1) {
                    this.configData.houseRoomIdList.splice(idIndex, 1);
                  }
                  let nameIndex = this.configData.houseRoomNameList.indexOf(name);
                  if (nameIndex > -1) {
                    this.configData.houseRoomNameList.splice(nameIndex, 1);
                  }
                  this.houseRoomNameListString = this.configData.houseRoomNameList.join('、');
                } else {
                  tempList[j].isChecked = true;
                  //添加
                  this.configData.houseRoomIdList.push(id);
                  this.configData.houseRoomNameList.push(name);
                  this.houseRoomNameListString = this.configData.houseRoomNameList.join('、');
                }
              }
            }
          }
        }
        let floorTempList = tempData[floorTemp].roomList;
        let floorTempAllChecked = true;
        for (let j = 0; j < floorTempList.length; j++) {
          if(floorTempList[j].isChecked == false){
            floorTempAllChecked = false;
          }
        }
        tempData[floorTemp].checkedAll = floorTempAllChecked;
        let floor = String(floorTemp+1);
        if(floorTempAllChecked){
          if(this.selectedFloor.indexOf(floor)==-1){
            this.selectedFloor.push(floor);
          }
        }
        else{
          let floorIndex = this.selectedFloor.indexOf(floor);
          if(floorIndex!=-1){
            this.selectedFloor.splice(floorIndex, 1);
          }
        }
      }
    },
    selectRoom(value,data,floor){
      //value.target.checked
      let floorIndex = this.selectedFloor.indexOf(floor);
      if(value.target.checked){
        if(floorIndex == -1){
          //添加
          this.selectedFloor.push(floor);
          if(data.roomList){
            for (let i = 0; i < data.roomList.length; i++) {
              data.roomList[i].isChecked = true;
                if(this.configData.houseRoomIdList.indexOf(data.roomList[i].id)==-1) {
                    this.configData.houseRoomIdList.push(data.roomList[i].id);
                    this.configData.houseRoomNameList.push(data.roomList[i].roomName);
                }
            }
          }
        }
      }
      else{
        if(floorIndex > -1){
          //移除
          this.selectedFloor.splice(floorIndex, 1);
          if(data.roomList){
            for (let i = 0; i < data.roomList.length; i++) {
              data.roomList[i].isChecked = false;
              let idIndex = this.configData.houseRoomIdList.indexOf(data.roomList[i].id);
              if(idIndex > -1){
                this.configData.houseRoomIdList.splice(idIndex,1);
              }
              let nameIndex = this.configData.houseRoomNameList.indexOf(data.roomList[i].roomName);
              if(nameIndex > -1){
                this.configData.houseRoomNameList.splice(nameIndex,1);
              }
            }
          }
        }
      }
      this.houseRoomNameListString = this.configData.houseRoomNameList.join('、');
    },
    configRooms(curentPageFlag){
      //检验数据
      if(this.configData.houseRoomIdList.length == 0){
        this.$message.warning('请选择需要配置的房间！');
        return false;
      }
      if(!this.configData.roomTypeId){
        this.$message.warning('请选中房型！');
        return false;
      }
      if(!this.configData.rentalPrice){
        this.$message.warning('请输入价格！');
        return false;
      }
      let postData = Object.assign({}, this.configData);
      postData.rentalPrice =  Math.round(this.configData.rentalPrice * 100);
      this.$emit('changeLoading',true);
      API.roomUnifiedConfig(postData).then(res => {
        this.$emit('changeLoading',false);
        if (res.code == "200") {
          //保存成功后清空选中房间
          this.$message.info("配置成功");
          this.$emit('refreshinfoFun',true);
          this.configData.houseRoomIdList = [];
          this.configData.houseRoomNameList = [];
          this.listFloorRoomData.floorList.forEach((item)=>{
            item.checkedAll = false;
          });
          this.houseRoomNameListString = '';
          if(curentPageFlag){
            this.initPage();
          }
        }else{
          this.$message.info("配置失败");
        }
      });
      return true;
    },
    selectRoomType(value){
      for (let i = 0; i < this.roomTypeListData.length; i++) {
        if(this.roomTypeListData[i].id == value){
          this.configData.rentalPrice = this.roomTypeListData[i].rentalPrice/100;
          this.configData.houseArea = this.roomTypeListData[i].area;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.p_btn(@color) {
  border: 1px solid @color;
  color: @color;
}
.step_two_css {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: calc(80vh - 120px);
  padding: 0 20px;
  .toolTip{
    font-size: 18px;
    cursor: pointer;
    position: absolute;
    color: #ffa036;
    left: 110px;
    top: 92px;
    z-index:1;
    /deep/ .ant-tooltip-inner{
      height: 85px;
      width: 280px;
    }
  }
  .house_info_css {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-bottom: 10px;
    .row_info {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      position: relative;
      background: @bigBackgroundColor;
      padding: 6px 10px 6px 14px;
      & > p {
        font-size: 14px;
        color: @secondaryFontColor;
        line-height: 1.45;
        & > span {
          color: @mainFontColor;
          padding: 0 5px;
        }
      }
    }
    .row1_info {
      flex-grow: 0;
      justify-content: flex-start;
      background: transparent;
      flex-shrink: 0;
      padding: 0;
      & > p {
        padding: 5px 8px;
        margin-left: 10px;
        border-radius: 4px;
        border: 1px solid #000;
      }
      .ban {
        .p_btn(@secondaryFontColor);
      }
      .enable {
        .p_btn(@themeColor);
      }
      .spare {
        .p_btn(@wranColor);
      }
    }
  }
  .house_room_main_css {
    display: flex;
    align-items: stretch;
    width: 100%;
    position: relative;
    height: calc(100% - 80px);
    .main_left {
      width: 136px;
      overflow-x: hidden;
      overflow-y: hidden;
      background: @bigBackgroundColor;
      position: relative;
      flex-shrink: 0;
      //padding: 10px 13px;
      .head_title_css {
        position: relative;
        width: 100%;
        padding: 0 0 15px;
        margin: 10px 0 0 10px;
        & > .title_info {
          font-size: 18px;
          color: @mainFontColor;
          font-weight: 600;
        }
      }
      & /deep/ .head_title_css {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 15px;
        }
        i {
          color: #ffa036;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
    .main_right {
      flex-grow: 1;
      margin-left: 10px;
      background: @bigBackgroundColor;
      padding: 10px 14px;
      & /deep/ .head_title_css {
        span {
          font-size: 15px;
        }
      }
      .roomList {
        position: relative;
        padding-bottom: 0;
        width: 100%;
        height: calc(100% - 120px);
        overflow-y: scroll;
        li {
          background: #fff;
          position: relative;
          overflow: hidden;
          padding: 7px 13px;
          margin-bottom: 10px;
          border-radius: 4px;
          .floot_css {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            overflow: hidden;
            position: relative;
            border-bottom: 1px solid #eeeeee;
            padding: 5px 0;
            & /deep/ * {
              font-size: 14px;
              color: @mainFontColor;
            }
          }
          .room_box_item {
            padding: 8px 0 0;
            overflow: hidden;
            position: relative;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            & /deep/ .room_box_css {
              margin-right: 10px;
              &:nth-child(8n) {
                margin-right: 0 !important;
              }
            }
          }
        }
      }
    }
    .unifySetting {
      position: absolute;
      bottom: 0;
      background: #F7F8FB;
      padding: 13px 0;
      .set_item {
        //display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        position: relative;
        width: 100%;
        padding: 0 13px 0px 0px;
        max-height: 45px;
        overflow-y: auto;
        & > label {
          font-size: 14px;
          color: @mainFontColor;
        }
        & > span {
          font-size: 14px;
          color: @themeColor;
        }
      }
      .set_info {
        .selectItem {
          margin:10px 10px 0 0px;
          & > .titleTip1 {
            border: 1px solid @borderColor;
            border-right:0px;
            background: @bigBackgroundColor;
            font-size: 14px;
            color: @mainFontColor;
            border-radius:4px 0 0 4px;
            width: 72px;
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
    }
  }
}
</style>
