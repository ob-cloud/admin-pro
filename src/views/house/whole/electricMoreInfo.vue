<template>
  <div class="electricMoreInfo-box">
    <div class="headInfoStyle clearfix">
      <div class="item f-fl cursor" @click="changeActiveIndex(item.value)" v-for="(item,index) in indexList" :key="index" :class="activeIndex==item.value?'selectedStyle':'unSelectStyle'">
        {{item.name}}
      </div>
    </div>
    <div class="detailStyle">
      <div v-if="activeIndex==1" v-show="btnArr.indexOf('1')>-1">
        <div v-if="houseType==2">
          <div class="detailStyle-Share">
            <div class="detailStyle-Share-head upRadius">公区</div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="!pubMeterObj">
              <div style="text-align: center;color: #BBBBBB;font-size: 12px;">公区还未绑定电表哦~</div>
              <div class="cursor" @click="goBind(1)"  style="text-align: center;color: #0A87F8;font-size: 14px;margin-top: 10px;"><icon-font style="margin-right: 2px;" type="iconbangding" /> 立即绑定</div>
            </div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="pubMeterObj" style="position: relative;">
              <label-item title="电表品牌" class="item f-fl clearfix">
                <div class="f-fl">{{pubMeterObj.brand|brandVal}}</div>
                <div class="f-fl itemStyle" :class="pubMeterObj.status==1?'onLineStyle':'offLineStyle'">{{pubMeterObj.status==1?"在线":"离线"}}</div>
                <div class="f-fr cursor" @click="unBind(pubMeterObj.electricMeterId,1)" style="color: #0A87F8;font-size: 12px;margin-right: 30px;"><icon-font style="margin-right: 2px;" type="iconjiechu" />解绑</div>
              </label-item>
              <div class="f-fl splitStyle">
              </div>
              <label-item title="付费模式" class="item f-fl">
                <div>{{pubMeterObj.paymentMode==1?'预付费':'后付费'}}</div>
              </label-item>
              <label-item title="电费单价" class="item f-fl">
                <div>{{pubMeterObj.unitPrice?pubMeterObj.unitPrice+'元/度':'-'}}</div>
              </label-item>
              <label-item title="设备型号" class="item f-fl">
                <div>{{pubMeterObj.modelName?pubMeterObj.modelName:'-'}}</div>
              </label-item>
              <label-item title="设备序列号" class="item f-fl">
                <div>{{pubMeterObj.sn?pubMeterObj.sn:'-'}}</div>
              </label-item>
              <div class="f-fr itemDetail cursor" @click="goDetail(pubMeterObj.electricMeterId)">
                详情 >
              </div>
              <div style="position: absolute;left: 0;top: 0" v-if="(pubMeterObj.valveStatus==1||pubMeterObj.valveStatus==0)"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/electricOn.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==2"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/electricOff.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==-1"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/error.png"></div>
            </div>
          </div>
          <div class="detailStyle-Share" style="margin-top: 15px;">
            <div class="detailStyle-Share-head upRadius" >{{roomData.roomName}}</div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="!roomMeterObj">
              <div style="text-align: center;color: #BBBBBB;font-size: 12px;">此房间还未绑定电表哦~</div>
              <div class="cursor" @click="goBind(2)" style="text-align: center;color: #0A87F8;font-size: 14px;margin-top: 10px;"><icon-font style="margin-right: 2px;" type="iconbangding" /> 立即绑定</div>
            </div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="roomMeterObj" style="position: relative;">
              <label-item title="电表品牌" class="item f-fl clearfix">
                <div class="f-fl">{{roomMeterObj.brand|brandVal}}</div>
                <div class="f-fl itemStyle" :class="roomMeterObj.status==1?'onLineStyle':'offLineStyle'">{{roomMeterObj.status==1?"在线":"离线"}}</div>
                <div class="f-fr cursor" @click="unBind(roomMeterObj.electricMeterId,2)" style="color: #0A87F8;font-size: 12px;margin-right: 30px;"><icon-font style="margin-right: 2px;" type="iconjiechu" />解绑</div>
              </label-item>
              <div class="f-fl splitStyle">
              </div>
              <label-item title="付费模式" class="item f-fl">
                <div>{{roomMeterObj.paymentMode==1?'预付费':'后付费'}}</div>
              </label-item>
              <label-item title="电费单价" class="item f-fl">
                <div>{{roomMeterObj.unitPrice?roomMeterObj.unitPrice+'元/度':'-'}}</div>
              </label-item>
              <label-item title="设备型号" class="item f-fl">
                <div>{{roomMeterObj.modelName?roomMeterObj.modelName:'-'}}</div>
              </label-item>
              <label-item title="设备序列号" class="item f-fl">
                <div>{{roomMeterObj.sn?roomMeterObj.sn:'-'}}</div>
              </label-item>
              <div class="f-fr itemDetail cursor" @click="goDetail(roomMeterObj.electricMeterId)">
                详情 >
              </div>
              <div style="position: absolute;left: 0;top: 0" v-if="(roomMeterObj.valveStatus==1||roomMeterObj.valveStatus==0)"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/electricOn.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="roomMeterObj.valveStatus==2"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/electricOff.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="roomMeterObj.valveStatus==-1"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/error.png"></div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="detailStyle-Share">
            <div class="detailStyle-Share-body" v-if="!pubMeterObj">
              <div style="text-align: center;color: #BBBBBB;font-size: 12px;">此房间还未绑定电表哦~</div>
              <div class="cursor" @click="goBind(2)" style="text-align: center;color: #0A87F8;font-size: 14px;margin-top: 10px;"><icon-font style="margin-right: 2px;" type="iconbangding" /> 立即绑定</div>
            </div>
            <div class="detailStyle-Share-body" v-if="pubMeterObj" style="position: relative;">
              <label-item title="电表品牌" class="item f-fl clearfix">
                <div class="f-fl">{{pubMeterObj.brand|brandVal}}</div>
                <div class="f-fl itemStyle" :class="pubMeterObj.status==1?'onLineStyle':'offLineStyle'">{{pubMeterObj.status==1?"在线":"离线"}}</div>
                <div class="f-fr cursor" @click="unBind(pubMeterObj.electricMeterId,1)" style="color: #0A87F8;font-size: 12px;margin-right: 30px;"><icon-font style="margin-right: 2px;" type="iconjiechu" />解绑</div>
              </label-item>
              <div class="f-fl splitStyle">
              </div>
              <label-item title="付费模式" class="item f-fl">
                <div>{{pubMeterObj.paymentMode==1?'预付费':'后付费'}}</div>
              </label-item>
              <label-item title="电费单价" class="item f-fl">
                <div>{{pubMeterObj.unitPrice?pubMeterObj.unitPrice+'元/度':'-'}}</div>
              </label-item>
              <label-item title="设备型号" class="item f-fl">
                <div>{{pubMeterObj.modelName?pubMeterObj.modelName:'-'}}</div>
              </label-item>
              <label-item title="设备序列号" class="item f-fl">
                <div>{{pubMeterObj.sn?pubMeterObj.sn:'-'}}</div>
              </label-item>
              <div class="f-fr itemDetail cursor" @click="goDetail(pubMeterObj.electricMeterId)">
                详情 >
              </div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj&&(pubMeterObj.valveStatus==1||pubMeterObj.valveStatus==0)"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/electricOn.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==2"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/electricOff.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==-1"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/error.png"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeIndex==1" v-show="btnArr.indexOf('1')==-1" style="text-align: center;padding: 20px 0 50px 0;">
        暂无电表查看权限，请联系管理员开通
      </div>
      <div v-if="activeIndex==2" v-show="btnArr.indexOf('2')>-1">
        <div v-if="houseType==2">
          <div class="detailStyle-Share">
            <div class="detailStyle-Share-head upRadius">公区</div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="!pubMeterObj">
              <div style="text-align: center;color: #BBBBBB;font-size: 12px;">公区还未绑定水表哦~</div>
              <div class="cursor" @click="goBind(1)"  style="text-align: center;color: #0A87F8;font-size: 14px;margin-top: 10px;"><icon-font style="margin-right: 2px;" type="iconbangding" /> 立即绑定</div>
            </div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="pubMeterObj" style="position: relative;">
              <label-item title="水表品牌" class="item f-fl clearfix">
                <div class="f-fl">{{pubMeterObj.brand|brandVal}}</div>
                <div class="f-fl itemStyle" :class="pubMeterObj.status==1?'onLineStyle':'offLineStyle'">{{pubMeterObj.status==1?"在线":"离线"}}</div>
                <div class="f-fr cursor" @click="unBind(pubMeterObj.waterMeterId,1)" style="color: #0A87F8;font-size: 12px;margin-right: 30px;"><icon-font style="margin-right: 2px;" type="iconjiechu" />解绑</div>
              </label-item>
              <div class="f-fl splitStyle">
              </div>
              <label-item title="付费模式" class="item f-fl">
                <div>{{pubMeterObj.paymentMode==1?'预付费':'后付费'}}</div>
              </label-item>
              <label-item title="水费单价" class="item f-fl">
                <div>{{pubMeterObj.unitPrice?pubMeterObj.unitPrice+'元/m³':'-'}}</div>
              </label-item>
              <label-item title="设备型号" class="item f-fl">
                <div>{{pubMeterObj.modelName?pubMeterObj.modelName:'-'}}</div>
              </label-item>
              <label-item title="设备序列号" class="item f-fl">
                <div>{{pubMeterObj.sn?pubMeterObj.sn:'-'}}</div>
              </label-item>
              <div class="f-fr itemDetail cursor" @click="goDetail(pubMeterObj.waterMeterId)">
                详情 >
              </div>
              <div style="position: absolute;left: 0;top: 0" v-if="(pubMeterObj.valveStatus==1||pubMeterObj.valveStatus==0)"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOn.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==2"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOff.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==-1"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/undefined.png"></div>
            </div>
          </div>
          <div class="detailStyle-Share" style="margin-top: 15px;">
            <div class="detailStyle-Share-head upRadius" >{{roomData.roomName}}</div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="!roomMeterObj">
              <div style="text-align: center;color: #BBBBBB;font-size: 12px;">此房间还未绑定水表哦~</div>
              <div class="cursor" @click="goBind(2)" style="text-align: center;color: #0A87F8;font-size: 14px;margin-top: 10px;"><icon-font style="margin-right: 2px;" type="iconbangding" /> 立即绑定</div>
            </div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="roomMeterObj" style="position: relative;">
              <label-item title="水表品牌" class="item f-fl clearfix">
                <div class="f-fl">{{roomMeterObj.brand|brandVal}}</div>
                <div class="f-fl itemStyle" :class="roomMeterObj.status==1?'onLineStyle':'offLineStyle'">{{roomMeterObj.status==1?"在线":"离线"}}</div>
                <div class="f-fr cursor" @click="unBind(roomMeterObj.waterMeterId,2)" style="color: #0A87F8;font-size: 12px;margin-right: 30px;"><icon-font style="margin-right: 2px;" type="iconjiechu" />解绑</div>
              </label-item>
              <div class="f-fl splitStyle">
              </div>
              <label-item title="付费模式" class="item f-fl">
                <div>{{roomMeterObj.paymentMode==1?'预付费':'后付费'}}</div>
              </label-item>
              <label-item title="水费单价" class="item f-fl">
                <div>{{roomMeterObj.unitPrice?roomMeterObj.unitPrice+'元/m³':'-'}}</div>
              </label-item>
              <label-item title="设备型号" class="item f-fl">
                <div>{{roomMeterObj.modelName?roomMeterObj.modelName:'-'}}</div>
              </label-item>
              <label-item title="设备序列号" class="item f-fl">
                <div>{{roomMeterObj.sn?roomMeterObj.sn:'-'}}</div>
              </label-item>
              <div class="f-fr itemDetail cursor" @click="goDetail(roomMeterObj.waterMeterId)">
                详情 >
              </div>
              <div style="position: absolute;left: 0;top: 0" v-if="(roomMeterObj.valveStatus==1||roomMeterObj.valveStatus==0)"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOn.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="roomMeterObj.valveStatus==2"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOff.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="roomMeterObj.valveStatus==-1"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/undefined.png"></div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="detailStyle-Share">
            <div class="detailStyle-Share-body" v-if="!pubMeterObj">
              <div style="text-align: center;color: #BBBBBB;font-size: 12px;">此房间还未绑定水表哦~</div>
              <div class="cursor" @click="goBind(2)" style="text-align: center;color: #0A87F8;font-size: 14px;margin-top: 10px;"><icon-font style="margin-right: 2px;" type="iconbangding" /> 立即绑定</div>
            </div>
            <div class="detailStyle-Share-body" v-if="pubMeterObj" style="position: relative;">
              <label-item title="水表品牌" class="item f-fl clearfix">
                <div class="f-fl">{{pubMeterObj.brand|brandVal}}</div>
                <div class="f-fl itemStyle" :class="pubMeterObj.status==1?'onLineStyle':'offLineStyle'">{{pubMeterObj.status==1?"在线":"离线"}}</div>
                <div class="f-fr cursor" @click="unBind(pubMeterObj.waterMeterId,1)" style="color: #0A87F8;font-size: 12px;margin-right: 30px;"><icon-font style="margin-right: 2px;" type="iconjiechu" />解绑</div>
              </label-item>
              <div class="f-fl splitStyle">
              </div>
              <label-item title="付费模式" class="item f-fl">
                <div>{{pubMeterObj.paymentMode==1?'预付费':'后付费'}}</div>
              </label-item>
              <label-item title="水费单价" class="item f-fl">
                <div>{{pubMeterObj.unitPrice?pubMeterObj.unitPrice+'元/m³':'-'}}</div>
              </label-item>
              <label-item title="设备型号" class="item f-fl">
                <div>{{pubMeterObj.modelName?pubMeterObj.modelName:'-'}}</div>
              </label-item>
              <label-item title="设备序列号" class="item f-fl">
                <div>{{pubMeterObj.sn?pubMeterObj.sn:'-'}}</div>
              </label-item>
              <div class="f-fr itemDetail cursor" @click="goDetail(pubMeterObj.waterMeterId)">
                详情 >
              </div>
              <div style="position: absolute;left: 0;top: 0" v-if="(pubMeterObj.valveStatus==1||pubMeterObj.valveStatus==0)"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOn.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==2"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOff.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==-1"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/undefined.png"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeIndex==2" v-show="btnArr.indexOf('2')==-1" style="text-align: center;padding: 20px 0 50px 0;">
        暂无水表查看权限，请联系管理员开通
      </div>
      <div v-if="activeIndex==3" style="text-align: center;padding: 20px 0 50px 0;">
        即将上线，敬请期待~
      </div>
      <div v-if="activeIndex==4" v-show="btnArr.indexOf('2')>-1">
        <div v-if="houseType==2">
          <div class="detailStyle-Share">
            <div class="detailStyle-Share-head upRadius">公区</div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="!pubMeterObj">
              <div style="text-align: center;color: #BBBBBB;font-size: 12px;">公区还未绑定水表哦~</div>
              <div class="cursor" @click="goBind(1)"  style="text-align: center;color: #0A87F8;font-size: 14px;margin-top: 10px;"><icon-font style="margin-right: 2px;" type="iconbangding" /> 立即绑定</div>
            </div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="pubMeterObj" style="position: relative;">
              <label-item title="水表品牌" class="item f-fl clearfix">
                <div class="f-fl">{{pubMeterObj.brand|brandVal}}</div>
                <div class="f-fl itemStyle" :class="pubMeterObj.status==1?'onLineStyle':'offLineStyle'">{{pubMeterObj.status==1?"在线":"离线"}}</div>
                <div class="f-fr cursor" @click="unBind(pubMeterObj.waterMeterId,1)" style="color: #0A87F8;font-size: 12px;margin-right: 30px;"><icon-font style="margin-right: 2px;" type="iconjiechu" />解绑</div>
              </label-item>
              <div class="f-fl splitStyle">
              </div>
              <label-item title="付费模式" class="item f-fl">
                <div>{{pubMeterObj.paymentMode==1?'预付费':'后付费'}}</div>
              </label-item>
              <label-item title="水费单价" class="item f-fl">
                <div>{{pubMeterObj.unitPrice?pubMeterObj.unitPrice+'元/m³':'-'}}</div>
              </label-item>
              <label-item title="设备型号" class="item f-fl">
                <div>{{pubMeterObj.modelName?pubMeterObj.modelName:'-'}}</div>
              </label-item>
              <label-item title="设备序列号" class="item f-fl">
                <div>{{pubMeterObj.sn?pubMeterObj.sn:'-'}}</div>
              </label-item>
              <div class="f-fr itemDetail cursor" @click="goDetail(pubMeterObj.waterMeterId)">
                详情 >
              </div>
              <div style="position: absolute;left: 0;top: 0" v-if="(pubMeterObj.valveStatus==1||pubMeterObj.valveStatus==0)"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOn.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==2"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOff.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==-1"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/undefined.png"></div>
            </div>
          </div>
          <div class="detailStyle-Share" style="margin-top: 15px;">
            <div class="detailStyle-Share-head upRadius" >{{roomData.roomName}}</div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="!roomMeterObj">
              <div style="text-align: center;color: #BBBBBB;font-size: 12px;">此房间还未绑定水表哦~</div>
              <div class="cursor" @click="goBind(2)" style="text-align: center;color: #0A87F8;font-size: 14px;margin-top: 10px;"><icon-font style="margin-right: 2px;" type="iconbangding" /> 立即绑定</div>
            </div>
            <div class="detailStyle-Share-body borderTopNone bottomRadius" v-if="roomMeterObj" style="position: relative;">
              <label-item title="水表品牌" class="item f-fl clearfix">
                <div class="f-fl">{{roomMeterObj.brand|brandVal}}</div>
                <div class="f-fl itemStyle" :class="roomMeterObj.status==1?'onLineStyle':'offLineStyle'">{{roomMeterObj.status==1?"在线":"离线"}}</div>
                <div class="f-fr cursor" @click="unBind(roomMeterObj.waterMeterId,2)" style="color: #0A87F8;font-size: 12px;margin-right: 30px;"><icon-font style="margin-right: 2px;" type="iconjiechu" />解绑</div>
              </label-item>
              <div class="f-fl splitStyle">
              </div>
              <label-item title="付费模式" class="item f-fl">
                <div>{{roomMeterObj.paymentMode==1?'预付费':'后付费'}}</div>
              </label-item>
              <label-item title="水费单价" class="item f-fl">
                <div>{{roomMeterObj.unitPrice?roomMeterObj.unitPrice+'元/m³':'-'}}</div>
              </label-item>
              <label-item title="设备型号" class="item f-fl">
                <div>{{roomMeterObj.modelName?roomMeterObj.modelName:'-'}}</div>
              </label-item>
              <label-item title="设备序列号" class="item f-fl">
                <div>{{roomMeterObj.sn?roomMeterObj.sn:'-'}}</div>
              </label-item>
              <div class="f-fr itemDetail cursor" @click="goDetail(roomMeterObj.waterMeterId)">
                详情 >
              </div>
              <div style="position: absolute;left: 0;top: 0" v-if="(roomMeterObj.valveStatus==1||roomMeterObj.valveStatus==0)"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOn.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="roomMeterObj.valveStatus==2"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOff.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="roomMeterObj.valveStatus==-1"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/undefined.png"></div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="detailStyle-Share">
            <div class="detailStyle-Share-body" v-if="!pubMeterObj">
              <div style="text-align: center;color: #BBBBBB;font-size: 12px;">此房间还未绑定水表哦~</div>
              <div class="cursor" @click="goBind(2)" style="text-align: center;color: #0A87F8;font-size: 14px;margin-top: 10px;"><icon-font style="margin-right: 2px;" type="iconbangding" /> 立即绑定</div>
            </div>
            <div class="detailStyle-Share-body" v-if="pubMeterObj" style="position: relative;">
              <label-item title="水表品牌" class="item f-fl clearfix">
                <div class="f-fl">{{pubMeterObj.brand|brandVal}}</div>
                <div class="f-fl itemStyle" :class="pubMeterObj.status==1?'onLineStyle':'offLineStyle'">{{pubMeterObj.status==1?"在线":"离线"}}</div>
                <div class="f-fr cursor" @click="unBind(pubMeterObj.waterMeterId,1)" style="color: #0A87F8;font-size: 12px;margin-right: 30px;"><icon-font style="margin-right: 2px;" type="iconjiechu" />解绑</div>
              </label-item>
              <div class="f-fl splitStyle">
              </div>
              <label-item title="付费模式" class="item f-fl">
                <div>{{pubMeterObj.paymentMode==1?'预付费':'后付费'}}</div>
              </label-item>
              <label-item title="水费单价" class="item f-fl">
                <div>{{pubMeterObj.unitPrice?pubMeterObj.unitPrice+'元/m³':'-'}}</div>
              </label-item>
              <label-item title="设备型号" class="item f-fl">
                <div>{{pubMeterObj.modelName?pubMeterObj.modelName:'-'}}</div>
              </label-item>
              <label-item title="设备序列号" class="item f-fl">
                <div>{{pubMeterObj.sn?pubMeterObj.sn:'-'}}</div>
              </label-item>
              <div class="f-fr itemDetail cursor" @click="goDetail(pubMeterObj.waterMeterId)">
                详情 >
              </div>
              <div style="position: absolute;left: 0;top: 0" v-if="(pubMeterObj.valveStatus==1||pubMeterObj.valveStatus==0)"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOn.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==2"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/waterOff.png"></div>
              <div style="position: absolute;left: 0;top: 0" v-if="pubMeterObj.valveStatus==-1"><img style="width: 59px;height: 59px;" src="../../../assets/smartDevice/undefined.png"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeIndex==4" v-show="btnArr.indexOf('2')==-1" style="text-align: center;padding: 20px 0 50px 0;">
        暂无水表查看权限，请联系管理员开通
      </div>
      <div v-if="activeIndex==5" style="text-align: center;padding: 20px 0 50px;">
        即将上线，敬请期待~
      </div>
    </div>
    <!-- 电表详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="electricDetailsDialog" class="ownModalBorder titDialog" title="电表详情" @cancel="isRefreshFun">
      <electric-detail :electricMeterId="meterId" @refreshinfoFun="refreshinfoFun" @unBindSuccess="unBindSuccess"></electric-detail>
    </a-modal>
    <!-- 水表详情 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="waterDetailsDialog" class="ownModalBorder titDialog" title="水表详情" @cancel="isRefreshFun">
      <water-detail :waterId="meterId" @refreshinfoFun="refreshinfoFun" @unBindSuccess="unBindSuccess"></water-detail>
    </a-modal>
    <!-- 绑定电表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bindElectricDialog" class="ownModalBorder titDialog" title="绑定电表">
      <bind-electric :roomData="formatData" @cancelBind="cancelBind" @bindSuccess="bindSuccess"></bind-electric>
    </a-modal>
    <!-- 绑定水表 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bindWaterDialog" class="ownModalBorder titDialog" :title="bindWaterTitle">
      <bind-water :roomData="formatData" @cancelBind="cancelBind" @bindSuccess="bindSuccess"></bind-water>
    </a-modal>
  </div>
</template>

<script>
import ElectricDetail from '../../smartDevices/electric/electricDetail';
import WaterDetail from '../../smartDevices/water/waterDetail';
import BindElectric from '../../smartDevices/electric/bindElectric';
import BindWater from '../../smartDevices/water/bindWater';
import * as API from "@/api/smartDevices";

export default {
  name: "electricMoreInfo",
  props: {
    houseType:{
      type:Number,
      required: true,
    },
    roomData:{
      type:Object,
      required:true,
    },
    defaultActiveIndex:{
      type:Number,
      default:1,
    },
    currentRoomId:{
      type:String,
    },
  },
  components: {
    ElectricDetail,
    BindElectric,
    WaterDetail,
    BindWater,
  },
  data() {
    return{
      activeIndex:1,  //1、电表；2、水表；3、燃气表；4、热水表；5、中水表
      indexList:[
        {name:'电表',value:1},
        {name:'冷水表',value:2},
        {name:'燃气表',value:3},
        {name:'热水表',value:4},
        {name:'中水表',value:5},
      ],
      meterList:[],
      pubMeterObj:undefined,   //公区
      roomMeterObj:undefined,   //房间
      electricDetailsDialog:false,
      waterDetailsDialog:false,
      isRefresh:false,
      meterId:'',
      bindElectricDialog:false,
      bindWaterDialog:false,
      bindWaterTitle:'绑定冷水表',
      formatData:{},
      formatRoomData:{},
      formatPubData:{},
      btnArr:[],
    }
  },
  created() {
    this.activeIndex = this.defaultActiveIndex;
    this.initData();
    this.getPermission();
  },
  methods: {
    getPermission(){
      let btnArr = [];
      JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
        if(value.mark == "mk_smartDevices_electric_ck"){
          btnArr.push('1');
        }
        else if(value.mark == "mk_smartDevices_water_ck"){
          btnArr.push('2');
        }
      });
      this.btnArr = btnArr;
    },
    initFormatRoomData(){
      if (this.houseType == 1 || this.houseType == 3) {
        this.formatRoomData = {
          houseAlias:this.roomData.houseAlias,
          cityName:this.roomData.cityName,
          areaName:this.roomData.areaName,
          fullAddress:this.roomData.fullAddress,
          id:this.roomData.id,
        };
      }
      if(this.houseType == 2){
        this.formatRoomData = {
          houseAlias:this.roomData.houseAlias,
          cityName:this.roomData.cityName,
          areaName:this.roomData.areaName,
          fullAddress:this.roomData.fullAddress,
          id:this.roomData.id,
        };
        let roomName = this.roomData.roomName + '间';
        let address = this.roomData.fullAddress.split(roomName);
        let fullAddress = address[0] + '大门';
        this.formatPubData = {
          houseAlias:this.roomData.houseAlias,
          cityName:this.roomData.cityName,
          areaName:this.roomData.areaName,
          fullAddress:fullAddress,
          id:this.roomData.housePid,
        };
      }
    },
    bindSuccess(){
      this.bindElectricDialog = false;
      this.bindWaterDialog = false;
      this.initData();
      setTimeout(()=>{
        this.$emit('bindSuccess');
      },500);
    },
    cancelBind(){
      this.bindElectricDialog = false;
      this.bindWaterDialog = false;
    },
    goBind(val){
      if(this.activeIndex==1){
        this.bindElectricDialog = true;
      }
      else if(this.activeIndex==2||this.activeIndex==4){
        this.bindWaterDialog = true;
      }
      if(val == 1){
        this.formatData = Object.assign({},this.formatPubData);
        if(this.activeIndex==2){
          this.formatData.meterType = 1;
          this.bindWaterTitle = '绑定冷水表';
        }
        else if(this.activeIndex==4){
          this.formatData.meterType = 2;
          this.bindWaterTitle = '绑定热水表';
        }
      }
      else if(val == 2){
        this.formatData = Object.assign({},this.formatRoomData);
        if(this.activeIndex==2){
          this.formatData.meterType = 1;
          this.bindWaterTitle = '绑定冷水表';
        }
        else if(this.activeIndex==4){
          this.formatData.meterType = 2;
          this.bindWaterTitle = '绑定热水表';
        }
      }
    },
    goDetail(val){
      this.meterId = val;
      if(this.activeIndex == 1){
        this.electricDetailsDialog = true;
      }
      else if(this.activeIndex == 2||this.activeIndex == 4){
        this.waterDetailsDialog = true;
      }
    },
    refreshinfoFun(res){  //详情有改变的操作  就改变状态
      if(res){
        this.isRefresh = res
      }
    },
    isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
      if(this.isRefresh){
        this.initData();
      }
      this.electricDetailsDialog = false;
      this.waterDetailsDialog = false;
      this.isRefresh = false
    },
    unBindSuccess(){
      this.electricDetailsDialog = false;
      this.waterDetailsDialog = false;
      this.initData();
      setTimeout(()=>{
        this.$emit('unBindSuccess');
      },500);
    },
    unBind(meterId,val){
      let completeName = '';
      if(this.houseType==2&&val==1){
        let name = this.roomData.roomName + '间';
        let names = this.roomData.fullAddress.split(name);
        completeName = this.roomData.cityName + this.roomData.areaName + names[0] + '公区';
      }
      else{
        completeName = this.roomData.cityName + this.roomData.areaName + this.roomData.fullAddress;
      }
      let _this =this;
      let id = meterId;
      if(this.activeIndex==1){
        this.$modal.confirm({
          title: '确定要将房源「' + completeName + '」房间绑定的电表吗？',
          content: '解绑后不可恢复，请谨慎操作',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            API.electricMeterUnbind({id:id}).then(res => {
              if (res.code == 200) {
                _this.$message.success('电表解绑成功！');
                _this.initData();
                _this.$emit('unBindSuccess');
              }
            })
          },
          onCancel() {
            // console.log('Cancel');
          },
        });
      }
      else if(this.activeIndex==2||this.activeIndex==4){
        this.$modal.confirm({
          title: '确定要将房源「' + completeName + '」房间绑定的水表吗？',
          content: '解绑后不可恢复，请谨慎操作',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            API.waterMeterUnbind({id:id}).then(res => {
              if (res.code == 200) {
                _this.$message.success('水表解绑成功！');
                _this.initData();
                _this.$emit('unBindSuccess');
              }
            })
          },
          onCancel() {
            // console.log('Cancel');
          },
        });
      }
    },
    changeActiveIndex(val){
      if(this.activeIndex == val){
        return ;
      }
      this.activeIndex = val;
      this.initData();
    },
    initData(){
      this.initFormatRoomData();
      if(this.activeIndex==1){
        let idList = [];
        if(this.houseType==1||this.houseType==3){
          idList.push(this.roomData.id)
        }
        else{
          idList.push(this.roomData.housePid);
          idList.push(this.roomData.id)
        }
        let parameter = {
          idList:idList,
        };
        API.listHouseElectricMeterSimple(parameter).then(res => {
          if (res.code == 200) {
            this.meterList = res.data;
            if(this.houseType==1||this.houseType==3){
              if(this.meterList&&this.meterList.length>0){
                this.pubMeterObj = this.meterList[0];
              }
              else{
                this.pubMeterObj = undefined;
              }
            }
            else{
              if(this.meterList&&this.meterList.length>0){
                //防止解绑无法清空
                let pubElectricNotExsit = true;
                let roomElectricNotExsit = true;
                this.meterList.forEach((item)=>{
                  if(item.houseId == this.roomData.housePid){
                    this.pubMeterObj = item;
                    pubElectricNotExsit = false;
                  }
                  if(item.houseId == this.roomData.id){
                    this.roomMeterObj = item;
                    roomElectricNotExsit = false;
                  }
                });
                if(pubElectricNotExsit){
                  this.pubMeterObj = undefined;
                }
                if(roomElectricNotExsit){
                  this.roomMeterObj = undefined;
                }
              }
              else{
                this.pubMeterObj = undefined;
                this.roomMeterObj = undefined;
              }
            }
          }
        });
      }
      else if(this.activeIndex==2||this.activeIndex==4){
        let idList = [];
        if(this.houseType==1||this.houseType==3){
          idList.push(this.roomData.id)
        }
        else{
          idList.push(this.roomData.housePid);
          idList.push(this.roomData.id)
        }
        let meterType = 1;
        if(this.activeIndex==4){
          meterType = 2;
        }
        let parameter = {
          houseIdList:idList,
          meterType:meterType,
        };
        API.listHouseWaterMeterSimple(parameter).then(res => {
          if (res.code == 200) {
            this.meterList = res.data;
            if(this.houseType==1||this.houseType==3){
              if(this.meterList&&this.meterList.length>0){
                this.pubMeterObj = this.meterList[0];
              }
              else{
                this.pubMeterObj = undefined;
              }
            }
            else{
              if(this.meterList&&this.meterList.length>0){
                //防止解绑无法清空
                let pubElectricNotExsit = true;
                let roomElectricNotExsit = true;
                this.meterList.forEach((item)=>{
                  if(item.houseId == this.roomData.housePid){
                    this.pubMeterObj = item;
                    pubElectricNotExsit = false;
                  }
                  if(item.houseId == this.roomData.id){
                    this.roomMeterObj = item;
                    roomElectricNotExsit = false;
                  }
                });
                if(pubElectricNotExsit){
                  this.pubMeterObj = undefined;
                }
                if(roomElectricNotExsit){
                  this.roomMeterObj = undefined;
                }
              }
              else{
                this.pubMeterObj = undefined;
                this.roomMeterObj = undefined;
              }
            }
          }
        });
      }
    },
  },
  filters: {
    brandVal(val){
      if(val==0){
        return '普通';
      }
      else if(val==1){
        return '云丁';
      }
      else if(val==2){
        return '果加';
      }
      else if(val==3){
        return '蜂电';
      }
      else if(val==4){
        return '超仪';
      }
    }
  },
  watch: {
    currentRoomId() {
      this.initData();
    }
  }
}
</script>

<style scoped lang="less">
.electricMoreInfo-box{
  .headInfoStyle{
    .item{
      width: 88px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 10px 10px 0px 0px;
      margin-right: 2px;
      font-size: 14px;
    }
    .selectedStyle{
      background: #E6F3FE;
      color: #0A87F8;
    }
    .unSelectStyle{
      color: #777777;
      background: #F4F4F4;
    }
  }
  .detailStyle{
    background: #FFFFFF;
    border-radius: 0px 4px 4px 4px;
    border: 1px solid #F4F4F4;
    padding: 15px 10px;
    margin-bottom: 20px;
    .detailStyle-Share{
      .detailStyle-Share-head{
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 15px;
        font-size: 14px;
        color: #111111;
        font-weight: 500;
        background: #F7FBFF;
        border-radius: 4px;
        border: 1px solid #EEEEEE;
      }
      .detailStyle-Share-body{
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #EEEEEE;
        height: 84px;
        padding: 15px 18px 0 40px;
        .item{
          width: 150px;
        }
        .itemStyle{
          font-size: 12px;
          width: 32px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 2px;
          margin: 1px 0 0 4px;
        }
        .onLineStyle{
          background: rgba(3,198,131,0.1);
          color: #03C683;
        }
        .offLineStyle{
          background: rgba(119,119,119,0.1);
          color: #777777;
        }
        .splitStyle{
          width: 30px;
          border-left: 1px solid #EEEEEE;
          height: 42px;
          margin-top: 6px;
        }
        .itemDetail{
          color: #0A87F8;
          font-size: 12px;
          height: 48px;
          line-height: 48px;
          margin-top: 3px;
        }
      }
      .borderTopNone{
        border-top: none !important;
      }
      .upRadius{
        border-radius: 4px 4px 0 0 !important;
      }
      .bottomRadius{
        border-radius: 0 0 4px 4px !important;
      }
    }
  }
}
</style>