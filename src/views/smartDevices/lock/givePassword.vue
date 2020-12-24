<template>
  <div class="givePassword-box">
    <div v-if="roomLockInfo&&roomLockInfo.houseType==2" class="shareStyle">
      <div class="shareHeadStyle">
        <span class="title">授权房间</span>
        <span >（可选择多个房间同时授权密码）</span>
      </div>
      <div class="shareDetailStyle clearfix" style="padding: 10px 0 20px 0;border-bottom: 8px solid #F6F7F8;margin-bottom: 20px;">
        <div class="f-fl" v-for="(item,index) in roomLockInfo.shareLockList" v-if="item.doorLock">
          <div class="item cursor" :style="index%4==3?'margin-right:0':''" @click="changeSelectedHouseIdList(item.houseId)" :class="{selectedStyle:selectedHouseIdList.indexOf(item.houseId)>-1,unSelectStyle:selectedHouseIdList.indexOf(item.houseId)==-1,onlineStyle:item.doorLock.onlineStatus==1,offLineStyle:item.doorLock.onlineStatus!=1}">
            <div class="color1">{{item.roomName=='大门'?item.roomName:item.roomName+'间'}}</div>
            <div class="color2">{{item.doorLock.brand|farmatBrand}}-{{item.doorLock.onlineStatus|farmatStatus}}</div>
            <div class="houseStatusStyle rented" v-if="item.houseStatus==3">已租</div>
            <div class="houseStatusStyle valid" v-if="item.houseStatus==1">空置</div>
            <div class="houseStatusStyle config" v-if="item.houseStatus==4">配置</div>
            <div v-if="selectedHouseIdList.indexOf(item.houseId)>-1" :class="selectedHouseIdList.indexOf(item.houseId)>-1 ?'triangle-top-right-click':'triangle-top-right-unClick'">
            </div>
            <icon-font v-if="selectedHouseIdList.indexOf(item.houseId)>-1" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
          </div>
        </div>
      </div>
    </div>
    <div class="titleStyle">
      <label-item title="授权类型" :must-fill="true">
        <a-radio-group style="margin-top: 15px;" v-model="sendData.authType" @change="onChange">
          <a-radio :value="1">看房</a-radio>
          <a-radio :value="2">入住</a-radio>
          <a-radio :value="3">维修</a-radio>
          <a-radio :value="4">保洁</a-radio>
          <a-radio :value="5">配货</a-radio>
          <a-radio :value="9">其他</a-radio>
        </a-radio-group>
      </label-item>
    </div>
    <div style="margin-top: 20px;">
      <label-item class="u-bottom-border" title="被授权人姓名" :must-fill="true" :maxSize="20" :valLength="sendData.personName.length">
        <a-input placeholder="请输入" v-model="sendData.personName" maxlength="20"></a-input>
      </label-item>
    </div>
    <div style="margin-top: 20px;">
      <label-item class="u-bottom-border" title="被授权人手机号" :must-fill="true">
        <a-input placeholder="请输入" v-model="sendData.personPhone" maxlength="11" v-validate="'naturalNum'"></a-input>
      </label-item>
    </div>
    <div style="margin-top: 20px;border-bottom: 1px solid #DDDDDD;">
      <label-item class="datePickerStyle u-no-border clearfix" title="授权时长" :must-fill="true" v-if="sendData.authType!=2">
        <a-date-picker class="f-fl" style="width: 150px;"
            v-model="sendData.startTime"
            :disabled-date="disabledStartDate"
             @change="calcTime"
            format="YYYY-MM-DD HH"
            placeholder="开始时间"
        />
        <a-date-picker class="f-fl" style="width: 135px;"
            v-model="sendData.endTime"
            :disabled-date="disabledEndDate"
            @change="calcTime"
            format="YYYY-MM-DD HH"
            placeholder="结束时间"
        />
        <div class="splitStyle">-</div>
        <div class="f-fr timerStyle">
          <span class="cursor" @click="getTime(60)" :class="times==60?'select':'unSelect'">1小时</span>
          <span class="cursor" @click="getTime(120)" :class="times==120?'select':'unSelect'">2小时</span>
          <span class="cursor" @click="getTime(1440)" :class="times==1440?'select':'unSelect'">24小时</span>
        </div>
      </label-item>
      <label-item class="datePickerStyle u-no-border clearfix" title="授权时长" :must-fill="true" v-else>
        <a-date-picker class="f-fl" style="width: 140px;"
                       v-model="sendData.startTime"
                       :disabled-date="disabledStartDate"
                       @change="calcTime"
                       format="YYYY-MM-DD"
                       placeholder="开始时间"
        />
        <a-date-picker class="f-fl" style="width: 135px;"
                       v-model="sendData.endTime"
                       :disabled-date="disabledEndDate"
                       @change="calcTime"
                       format="YYYY-MM-DD"
                       placeholder="结束时间"
        />
        <div class="splitStyle">-</div>
        <div class="f-fr timerStyle">
          <span class="cursor" @click="getDay(1)" :class="days==1?'select':'unSelect'">1天</span>
          <span class="cursor" @click="getDay(30)" :class="days==30?'select':'unSelect'">1个月</span>
          <span class="cursor" @click="getDay(90)" :class="days==90?'select':'unSelect'">3个月</span>
          <span class="cursor" @click="getDay(180)" :class="days==180?'select':'unSelect'">6个月</span>
          <span class="cursor" @click="getDay(365)" :class="days==365?'select':'unSelect'">1年</span>
        </div>
      </label-item>
    </div>
    <div style="margin-top: 20px;">
      <label-item class="u-bottom-border" title="备注" :maxSize="100" :valLength="sendData.comment.length">
        <a-textarea  placeholder="请输入" autosize v-model="sendData.comment" maxlength="100"></a-textarea>
      </label-item>
    </div>
    <div class="clearfix" style="width: 100%;padding-top: 67px;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelGive">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="givePassword">
          保存
        </a-button>
      </div>
    </div>
    <!-- 授权结果 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="givePasswordResultDialog" class="ownModalBorder titDialog" title="查看密码授权" @cancel="closeThis">
      <give-password-result :result="result" :address="address" @closeThis="closeThis"></give-password-result>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import GivePasswordResult from './givePasswordResult';
import * as API from "@/api/smartDevices";
import {getContractTime} from "@/api/contract";
import {employeeUserInfo} from "@/api/enterprise";
import { CURRENTDEPTID } from '@/store/mutation-types';

export default {
  name: "givePassword",
  components: {
    GivePasswordResult,
  },
  props: {
    lockId: {
      type: String,
      required: true,
    },
    //来自门锁相关页面操作
    lockInfo:{
      type:Object,
    },
    //来自房源
    roomLockInfo:{
      type:Object,
    },
  },
  data() {
    return{
      sendData:{
        authType:1,
        comment:'',
        doorLockIdList:[],
        startTime:this.$moment(Vue.prototype.$moment().startOf('hour').valueOf()),
        endTime:null,
        personName:'',
        personPhone:'',
      },
      saveLoading:false,
      times:0,
      days:0,
      result:[],
      givePasswordResultDialog:false,
      address:'',
      selectedHouseIdList:[],
      currentLoginer:{
        personPhone:'',
        personName:'',
      },
      renter:{
        phone:'',
        name:'',
        contractBeginTime:undefined,
        contractEndTime:undefined,
      },
      shareHouseRenterList:[],
    }
  },
  created() {
    if(this.lockInfo){
      this.result = [];
      let roomName = '大门';
      if(this.lockInfo.houseType == 2){
        roomName = this.lockInfo.roomName;
      }
      let obj ={
        roomName:roomName,
      };
      this.address = this.lockInfo.cityName + this.lockInfo.areaName + this.lockInfo.fullAddress;
      this.result.push(obj);
      if(this.lockInfo.houseId){
        this.getHouseCurrentRenterInfo(this.lockInfo.houseId);
      }
    }
    if(this.roomLockInfo){
      this.result = [];
      if(this.roomLockInfo.houseType==1||this.roomLockInfo.houseType==3){
        let obj ={
          roomName:'大门',
        };
        this.address = this.roomLockInfo.cityName + this.roomLockInfo.areaName + this.roomLockInfo.fullAddress;
        this.result.push(obj);
        if(this.roomLockInfo.doorLock&&this.roomLockInfo.doorLock.houseId){
          this.getHouseCurrentRenterInfo(this.roomLockInfo.doorLock.houseId);
        }
      }
      if(this.roomLockInfo.houseType==2){
        this.address = this.roomLockInfo.cityName + this.roomLockInfo.areaName + this.roomLockInfo.fullAddress;
        let haveHouseIdList = [];
        this.roomLockInfo.shareLockList.forEach((item)=> {
          if (this.roomLockInfo.selectedHouseIdList.indexOf(item.houseId) > -1 && item.doorLock) {
            haveHouseIdList.push(item.houseId);
          }
        });
        let selectedHouseIdList = [];
        this.roomLockInfo.selectedHouseIdList.forEach((item)=>{
          if(haveHouseIdList.indexOf(item) > -1){
            selectedHouseIdList.push(item)
          }
        });
        this.selectedHouseIdList = selectedHouseIdList;
        this.listHouseCurrentRenterInfoByHousePid(this.roomLockInfo.pid);
      }
    }
    this.getUserInfo();
  },
  methods: {
    getHouseCurrentRenterInfo(val){
      let parameter = {
        id:val
      };
      API.getHouseCurrentRenterInfo(parameter).then(res=>{
        this.renter.name = res.data.name;
        this.renter.phone = res.data.phone;
        this.renter.contractBeginTime = res.data.contractBeginTime;
        this.renter.contractEndTime = res.data.contractEndTime;
      });
    },
    listHouseCurrentRenterInfoByHousePid(val){
      let parameter = {
        id:val,
      };
      API.listHouseCurrentRenterInfoByHousePid(parameter).then(res=>{
        this.shareHouseRenterList = res.data;
      });
    },
    getUserInfo(){
      employeeUserInfo().then(res => {
        this.sendData.personPhone = res.data.phone;
        this.sendData.personName = res.data.name;
        this.currentLoginer.personPhone = res.data.phone;
        this.currentLoginer.personName = res.data.name;
      });
    },
    changeSelectedHouseIdList(val){
      let pos = this.selectedHouseIdList.indexOf(val);
      if(pos>-1){
        this.selectedHouseIdList.splice(pos,1);
      }
      else{
        this.selectedHouseIdList.push(val);
      }
      this.result = [];
      this.roomLockInfo.shareLockList.forEach((item)=>{
        if(this.selectedHouseIdList.indexOf(item.houseId)>-1&&item.doorLock){
          this.sendData.doorLockIdList.push(item.doorLock.id);
          let obj = {
            lockId:item.doorLock.id,
            roomName:item.roomName
          }
          this.result.push(obj);
        }
      });
      //如果合租只有一个房间、入住且有租客，显示入住信息
      if(this.sendData.authType==2){
        //入住
        if(this.selectedHouseIdList.length==1){
          this.shareHouseRenterList.forEach((item)=>{
            if(item.houseId == this.selectedHouseIdList[0]){
              this.initRenterData(item);
            }
          });
        }
        else{
          this.clearRenterData();
        }
      }
      else{
        this.initLoginerData();
      }
    },
    closeThis(){
      this.givePasswordResultDialog =false;
      this.$emit('giveSuccess');
    },
    calcTime(){
      if(this.sendData.startTime&&this.sendData.endTime){
        let endTime = this.sendData.endTime;
        let startTime = this.sendData.startTime;
        if(this.sendData.authType == 2){
          let postData = {
            beginDate: this.sendData.startTime,
            endDate: this.sendData.endTime,
            deptId:this.$ls.get(CURRENTDEPTID),
          };
          getContractTime(postData).then(res => {
            if (res.code === '200') {
              this.days = res.data.year * 365 + res.data.mon * 30 + res.data.day * 1;
            }
          });
        }
        else{
          let diff = endTime.diff(startTime,'minute') + 1;
          this.times = diff;
        }
      }
    },
    getDay(val){
      if(!this.sendData.startTime){
        this.$message.warning('请选择开始时间');
        return ;
      }
      this.days = val;
      if(val==1){
        let startTime = this.sendData.startTime.startOf('day').valueOf();
        let endTime = this.sendData.startTime.endOf('day').valueOf();
        this.sendData.startTime = this.$moment(startTime);
        this.sendData.endTime = this.$moment(endTime);
      }
      else if(val == 30){
        let startTime = this.sendData.startTime.startOf('day').valueOf();
        this.sendData.endTime = this.$moment(this.sendData.startTime.startOf('day').add(1,'month').valueOf() - 86400000);
        this.sendData.startTime =  this.$moment(startTime);
      }
      else if(val == 90){
        let startTime = this.sendData.startTime.startOf('day').valueOf();
        this.sendData.endTime = this.$moment(this.sendData.startTime.startOf('day').add(3,'month').valueOf() - 86400000);
        this.sendData.startTime =  this.$moment(startTime);
      }
      else if(val == 180){
        let startTime = this.sendData.startTime.startOf('day').valueOf();
        this.sendData.endTime = this.$moment(this.sendData.startTime.startOf('day').add(6,'month').valueOf() - 86400000);
        this.sendData.startTime =  this.$moment(startTime);
      }
      else if(val == 365){
        let startTime = this.sendData.startTime.startOf('day').valueOf();
        this.sendData.endTime = this.$moment(this.sendData.startTime.startOf('day').add(1,'year').valueOf() - 86400000);
        this.sendData.startTime =  this.$moment(startTime);
      }
    },
    getTime(val){
      if(!this.sendData.startTime){
        this.$message.warning('请选择开始时间');
        return ;
      }
      this.times = val;
      let startTime = this.sendData.startTime.valueOf();
      let endTime = startTime + val*60*1000;
      this.sendData.endTime = this.$moment(endTime);
    },
    disabledStartDate(startValue) {
      const endValue = this.sendData.endTime;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.sendData.startTime;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    givePassword(){
      if(!this.sendData.personName){
        this.$message.warning('请输入被授权人姓名');
        return ;
      }
      if(!this.sendData.personPhone){
        this.$message.warning('请输入被授权人手机号');
        return ;
      }
      if(!this.sendData.startTime){
        this.$message.warning('请选择授权开始时间');
        return ;
      }
      if(!this.sendData.endTime){
        this.$message.warning('请选择授权结束时间');
        return ;
      }
      this.sendData.doorLockIdList = [];
      if (this.lockInfo){
        this.sendData.doorLockIdList.push(this.lockId);
      }
      if(this.roomLockInfo){
        if(this.roomLockInfo.houseType==1||this.roomLockInfo.houseType==3){
          this.sendData.doorLockIdList.push(this.lockId);
        }
        else if(this.roomLockInfo.houseType==2){
          this.result = [];
          this.roomLockInfo.shareLockList.forEach((item)=>{
            if(this.selectedHouseIdList.indexOf(item.houseId)>-1&&item.doorLock){
              this.sendData.doorLockIdList.push(item.doorLock.id);
              let obj = {
                lockId:item.doorLock.id,
                roomName:item.roomName
              }
              this.result.push(obj);
            }
          })
          if(this.result==0){
            this.$message.warning('请选择一授权房间');
            return ;
          }
        }
      }
      this.saveLoading = true;
      API.doorLockPwdAuthAdd(this.sendData).then(res => {
        if (!res) {
          this.saveLoading = false;
        } else {
          if (res.code === '200') {
            this.saveLoading = false;
            if(this.lockInfo){
              let temp = res.data.authResultList[0];
              this.result[0].startTime = this.sendData.startTime;
              this.result[0].endTime = this.sendData.endTime;
              this.result[0].pwd = temp.pwd;
              this.result[0].isSucceed = temp.isSucceed;
              this.result[0].failMsg = temp.failMsg;
              this.givePasswordResultDialog =true;
            }
            if(this.roomLockInfo){
              if(this.roomLockInfo.houseType==1||this.roomLockInfo.houseType==3){
                let temp = res.data.authResultList[0];
                this.result[0].startTime = this.sendData.startTime;
                this.result[0].endTime = this.sendData.endTime;
                this.result[0].pwd = temp.pwd;
                this.result[0].isSucceed = temp.isSucceed;
                this.result[0].failMsg = temp.failMsg;
                this.givePasswordResultDialog =true;
              }
              else if(this.roomLockInfo.houseType==2){
                let authResultList = res.data.authResultList;
                authResultList.forEach((authResult)=>{
                    this.result.forEach((item)=>{
                      if(item.lockId == authResult.doorLockId){
                        item.startTime = this.sendData.startTime;
                        item.endTime = this.sendData.endTime;
                        item.pwd = authResult.pwd;
                        item.isSucceed = authResult.isSucceed;
                        item.failMsg = authResult.failMsg;
                      }
                    });
                });
                this.givePasswordResultDialog =true;
              }
            }
          } else {
            this.saveLoading = false;
          }
        }
      });
    },
    cancelGive(){
      this.$emit('cancelGive');
    },
    //清空租客姓名、电话、合同周期
    clearRenterData(){
      this.sendData.personName = '';
      this.sendData.personPhone = '';
      this.sendData.startTime = this.$moment(new Date().getTime());
      this.sendData.endTime = undefined;
    },
    //初始化当前登录人
    initLoginerData(){
      this.sendData.startTime = this.$moment(new Date().getTime());
      this.sendData.personPhone = this.currentLoginer.personPhone;
      this.sendData.personName = this.currentLoginer.personName;
      //清空结束时间
      this.sendData.endTime = undefined;
    },
    //初始化租客姓名、电话、合同周期
    initRenterData(item){
      let startTime = Vue.prototype.$moment().startOf('day').valueOf();
      if(item.name){
        this.sendData.personName = item.name;
      }else{
        this.sendData.personName = '';
      }
      if(item.phone){
        this.sendData.personPhone = item.phone;
      } else{
        this.sendData.personPhone = '';
      }
      if(item.contractBeginTime){
        if(startTime>=item.contractBeginTime){
          this.sendData.startTime = this.$moment(startTime);
        }
        else{
          this.sendData.startTime = this.$moment(item.contractBeginTime);
        }
      }
      else{
        this.sendData.startTime = this.$moment(startTime);
      }
      if(item.contractEndTime){
        if(startTime<=item.contractEndTime){
          this.sendData.endTime = this.$moment(item.contractEndTime);
        }
        this.calcTime();
      }
    },
    onChange(e) {
      this.sendData.authType = e.target.value;
      if(this.sendData.authType == 2){
        //整租/集中
        if(this.shareHouseRenterList.length==0){
          this.initRenterData(this.renter);
        }
        else{
          if(this.selectedHouseIdList.length==1){
            this.shareHouseRenterList.forEach((item)=>{
              if(item.houseId == this.selectedHouseIdList[0]){
                this.initRenterData(item);
              }
            });
          }
          else{
           this.clearRenterData();
          }
        }
      }
      else{
          this.initLoginerData();
      }
    },
  },
  filters: {
    farmatBrand(val){
      if(val==0){
        return '普通门锁';
      }
      else if(val==1){
        return '云丁';
      }
      else if(val==2){
        return '果加';
      }
    },
    farmatStatus(val){
      if(val==1){
        return '在线';
      }
      else if(val==2){
        return '离线';
      }
    },
  },
}
</script>

<style scoped lang="less">
  .givePassword-box{
    padding: 14px 20px 20px 20px;
    .shareStyle{
      .shareHeadStyle{
        .title{
          color: #111111;
          font-size: 18px;
          font-weight: 500;
        }
        .desc{
          color: #777777;
          font-size: 12px;
        }
      }
      .shareDetailStyle{
        .item{
          width: 108px;
          height: 54px;
          border-radius: 4px;
          margin-right: 12px;
          position: relative;
          padding: 6px 0 7px 8px;
          .color1{
            font-size: 14px;
            color: #000000;
          }
          .color2{
            font-size: 12px;
            color: #777777;
          }
          .houseStatusStyle{
            position: absolute;
            font-size: 11px;
            right: 0px;
            top: 10px;
            width: 36px;
            height: 16px;
            border-radius: 100px 0px 0px 100px;
            line-height: 16px;
            text-align: center;
          }
          .rented{
            background-color: fade(#0A87F8, 10%);
            color: #0A87F8;
          }
          .config{
            background-color: fade(#FFA036, 10%);
            color: #FFA036;
          }
          .valid{
            background-color: fade(#FB4246, 10%);
            color: #FB4246;
          }
          svg{
            width: 12px;
            height: 12px;
          }
          .triangle-top-right-choose {
            position: absolute;
            color: #FFFFFF;
            bottom: 1px;
            right: 1px;
          }
          .triangle-top-right-click {
            position: absolute;
            width: 0;
            border: 11px solid #0A87F8;
            border-top: 11px solid transparent;
            border-left: 11px solid transparent;
            bottom: 0px;
            right: 0px;
          }
        }
        .offLineStyle{
          background: #F4F4F4;
          border: 1px solid #BBBBBB;
        }
        .onlineStyle{
          background: #FFFFFF;
        }
        .selectedStyle{
          background-color: fade(#0A87F8, 10%);
          box-shadow: 0px 1px 4px 0px rgba(2, 19, 34, 0.1);
          border: 1px solid #0A87F8;
        }
        .unSelectStyle{
          border: 1px solid #BBBBBB;
        }
      }
    }
    .datePickerStyle{
      position: relative;
      /deep/ .ant-calendar-picker-icon{
        display: none;
      }
      .splitStyle{
        position: absolute;
        left: 130px;
        top: 35px;
        color: #111111;
      }
    }
    .timerStyle{
      height: 32px;
      line-height: 32px;
      span{
        padding: 4px;
        font-size: 12px;
        margin-right: 4px;
        &:last-child {
          margin-right: 0;
        }
      }
      .select{
        color: #0A87F8;
        background: rgba(10, 135, 248, 0.1);
        border-radius: 4px;
      }
      .unSelect{
        color: #777777;
        background: #F4F4F4;
        border-radius: 4px;
      }
    }
    /deep/ .ant-radio-wrapper{
      color: #111111;
    }
    /deep/ .ant-input{
      color: #111111;
    }
    .titleStyle{
      /deep/ .label-item .title{
        color: #111111;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .buttonDiv {
      .formItemMarginButton {
        width: 120px;
        height: 40px;
        margin-left: 18px;
      }
      .cancelFont {
        color: #666666;
      }
      .saveFont {
        color: #FFFFFF;
        background-color: #0A87F8;
      }
    }
  }
</style>