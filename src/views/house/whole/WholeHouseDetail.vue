<template>
    <div>
        <div class="house-detail">
            <div class="top f-clearfix">
                <div class="detail">
                    <div class="item" style="border-right: 1px dashed #DDDDDD;width: 175px;padding-left: 12px;margin-right:25px;margin-top: 5px;">
                        <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                        <span style="margin-top: 7px" v-if="(roomData.status==1||roomData.status==2)&&!skeletonLoading" class="radius-font status1 radius-font-big"><icon-font type="icon-yumengtubiao_kongzhi-"></icon-font></span>
                        <span style="margin-top: 7px" v-if="roomData.status==3&&!skeletonLoading" class="radius-font status2 radius-font-big"><icon-font type="icon-yumengtubiao_yizu-"></icon-font></span>
                        <span style="margin-top: 7px" v-if="roomData.status==4&&!skeletonLoading" class="radius-font status3 radius-font-big"><icon-font type="iconyumengtubiao_peizhi"></icon-font></span>
                        <span style="margin-top: 7px" v-if="(roomData.status==5||roomData.status==6)&&!skeletonLoading" class="radius-font status4 radius-font-big"><icon-font type="iconyumengtubiao_suofang"></icon-font></span>
                        <span style="margin-top: 7px" v-if="roomData.status==8&&!skeletonLoading" class="radius-font status4 radius-font-big"><icon-font type="icon-yumengtubiao_guanbi-"></icon-font></span>
                        <div>
                            <label-item title="当前状态">
                                <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                                <div v-if="(roomData.status==1||roomData.status==2)&&!skeletonLoading">
                                    <span class="fontColor">{{roomData.statusName}}</span>&nbsp;<span style="color: #FB4246;" v-if="roomData.vacantDays">({{roomData.vacantDays}}天)</span>  <icon-font @click="changeStatus(roomData)" class="edit-status-icon" type="iconyumengtubiao_bianji-1" v-mark="['mk_house_index_bjfy']"></icon-font>
                                </div>
                                <div v-if="roomData.status==3&&!skeletonLoading">
                                    <span class="fontColor">{{roomData.statusName}}</span>  <icon-font @click="changeStatus(roomData)" class="edit-status-icon" type="iconyumengtubiao_bianji-1" v-mark="['mk_house_index_bjfy']"></icon-font>
                                </div>
                                <div v-if="roomData.status==4&&!skeletonLoading">
                                    <span class="fontColor">{{roomData.statusName}}</span>  <icon-font @click="changeStatus(roomData)" class="edit-status-icon" type="iconyumengtubiao_bianji-1" v-mark="['mk_house_index_bjfy']"></icon-font>
                                </div>
                                <div  v-if="(roomData.status==5||roomData.status==6||roomData.status==7||roomData.status==8)&&!skeletonLoading">
                                    <span class="fontColor">{{roomData.statusName}}</span>  <icon-font @click="changeStatus(roomData)" class="edit-status-icon" type="iconyumengtubiao_bianji-1" v-mark="['mk_house_index_bjfy']"></icon-font>
                                </div>
                            </label-item>
                        </div>
                    </div>
                    <div class="item" style="width: 180px;">
                        <span style="margin-top: 7px" class="radius-font radius-font-small radius-font-house"><icon-font type="icon-yumengtubiao_zujin"></icon-font></span>
                        <div class="">
                            <label-item title="出租价格" :skeletonLoading="skeletonLoading">
                                <span style="color: #111111">{{roomData.actualPrice/100}}元/月</span>
                            </label-item>
                        </div>
                    </div>
                    <div class="item" style="width: 180px;">
                        <span style="margin-top: 7px" class="radius-font radius-font-small radius-font-area"><icon-font type="icon-yumengtubiao_mianji"></icon-font></span>
                        <div class="">
                            <label-item title="朝向-面积" :skeletonLoading="skeletonLoading">
                                <span style="color: #111111">{{roomData.orientationName}}-{{roomData.houseArea?roomData.houseArea + '㎡':''}}</span>
                            </label-item>
                        </div>
                    </div>
                    <div class="item">
                        <span style="margin-top: 7px" class="radius-font radius-font-small radius-font-time"><icon-font type="icon-yumengtubiao_shijian"></icon-font></span>
                        <div class="">
                            <label-item  title="看房时间" :skeletonLoading="skeletonLoading">
                                <span style="color: #111111">{{roomData.viewTypeName ? roomData.viewTypeName : '随时看房'}}</span>
                            </label-item>
                        </div>
                    </div>
                    <div class="item">
                        <span style="margin-top: 7px" class="radius-font radius-font-small radius-font-person"><icon-font type="iconyumengtubiao_weifenpeirenyuan"></icon-font></span>
                        <div class="">
                            <label-item  title="负责人" :skeletonLoading="skeletonLoading">
                                <span style="color: #111111">{{roomData.maintainerName}}-{{roomData.maintainerPhone}}</span>
                            </label-item>
                        </div>
                    </div>
                </div>
            </div>
          <div class="quickStyle clearfix" v-if="haveQuick">
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('9')" v-if="roomData.doorLock&&roomData.doorLock.onlineStatus==1">
              <icon-font class="commonStyle" type="iconmensuo1" />在线
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('9')" v-if="roomData.doorLock&&roomData.doorLock.onlineStatus==2">
              <icon-font class="lock-offLine" type="iconmensuo1" />离线
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('10','electricMore_e',1)" v-if="roomData.electricMeter&&(roomData.electricMeter.valveStatus==1||roomData.electricMeter.valveStatus==0)">
              <icon-font class="distribution" type="icondianbiao" />供电中
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('10','electricMore_e',1)" v-if="roomData.electricMeter&&roomData.electricMeter.valveStatus==2">
              <icon-font class="errorStyle" type="icondianbiao" />已断电
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('10','electricMore_e',1)" v-if="roomData.electricMeter&&roomData.electricMeter.valveStatus==-1">
              <icon-font class="lock-offLine" type="icondianbiao" />异常
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('10','electricMore_w',roomData.waterMeter.meterType)" v-if="roomData.waterMeter&&(roomData.waterMeter.valveStatus==0||roomData.waterMeter.valveStatus==1)">
              <icon-font class="clean" type="iconshuibiao" />供水中
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('10','electricMore_w',roomData.waterMeter.meterType)" v-if="roomData.waterMeter&&roomData.waterMeter.valveStatus==-1">
              <icon-font class="lock-offLine" type="iconshuibiao" />未知
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('10','electricMore_w',roomData.waterMeter.meterType)" v-if="roomData.waterMeter&&roomData.waterMeter.valveStatus==2">
              <icon-font class="errorStyle" type="iconshuibiao" />已断水
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('6')" v-if="roomData.isRepairUndone==1">
              <icon-font class="commonStyle" type="icon-yumengtubiao_weixiu" />维修中
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('7')" v-if="roomData.isCleanUndone==1">
              <icon-font class="clean" type="icon-yumengtubiao_baojie" />保洁中
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('8')" v-if="roomData.isDistributionUndone==1">
              <icon-font class="distribution" type="iconpeihuo-mianxing" />配货中
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('5')" v-if="roomData.isBillReceivable==1">
              <icon-font class="commonStyle" type="iconyumengtubiao_caiwuzhangdan" />近3天有待收款
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('5')" v-if="roomData.isBillOverdue==1">
              <icon-font class="errorStyle" type="iconqianfei" />有欠款
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('3')" v-if="roomData.isContractBeRecorded==1">
              <icon-font class="commonStyle" type="iconluzukehetong" />待录入租客合同
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('3')" v-if="roomData.isContractBeSigned==1">
              <icon-font class="commonStyle" type="iconluzukehetong" />待签字
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('3')" v-if="roomData.isSyncTenant==1">
              <icon-font class="commonStyle" type="iconyumengtubiao_heyue" />租约待确认
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('3')" v-if="roomData.contractStatus&&roomData.contractStatus==3&&roomData.renterFewDaysLaterIn&&roomData.renterFewDaysLaterIn>0">
              <icon-font class="commonStyle" type="iconbanru" />剩{{roomData.renterFewDaysLaterIn}}天搬入
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('3')" v-if="roomData.contractStatus&&roomData.contractStatus==4&&roomData.renterRemainingDays&&roomData.renterRemainingDays>0">
              <icon-font class="commonStyle" type="iconshijian" />剩{{roomData.renterRemainingDays}}天到期
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('3')" v-if="roomData.isContractBeExpired==1">
              <icon-font class="commonStyle" type="iconshijian" />租客合同已到期
            </div>
            <div class="quickItemStyle cursor f-fl" @click="changeActiveKey('2')" v-if="roomData.isHasBook==1">
              <icon-font class="commonStyle" type="iconyumengtubiao_yuyue" />有预定
            </div>
          </div>
            <div class="tabs-content" >
                <a-tabs size="small" defaultActiveKey="1" v-model="activekey"  @change="handleCallback">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_jibenxinxi" />基本信息
                        </span>
                        <div class="basic-info">
                            <div class="clearfix">
                                <div class="title f-fl">房间信息</div>
                                <div class="cursor f-fr" style="color: #0A87F8;" @click="updateRoomInfoEdit" v-if="!roomInfoEdit" v-mark="['mk_house_index_bjfy']">
                                    <icon-font type="iconyumengtubiao_bianji-1" />
                                </div>
                                <div class="tabs-options f-fr" v-if="roomInfoEdit">
                                    <span @click="cancelRoomInfoEdit" style="color: rgba(0, 0, 0, 0.65);line-height: 22px;">取消</span>
                                    <span @click="saveRoomInfoEdit" style="line-height: 22px;">保存</span>
                                </div>
                            </div>
                            <div class="input-info">
                                <label-item class="item" title="房源模式" :skeletonLoading="skeletonLoading">
                                  <span v-show="!roomInfoEdit">{{roomData.houseBizModeName|blankVal}}</span>
                                  <a-select v-show="roomInfoEdit" v-model="roomData.houseBizMode" placeholder="请选择">
                                    <a-select-option :value="1">直营</a-select-option>
                                    <a-select-option :value="3">加盟(全托)</a-select-option>
                                    <a-select-option :value="4">加盟(半托)</a-select-option>
                                    <a-select-option :value="2">代理</a-select-option>
                                  </a-select>
                                </label-item>
                                <label-item class="item" title="房源编号" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.houseAlias|blankVal}}</span>
                                    <a-input v-show="roomInfoEdit" v-model="roomData.houseAlias" placeholder="请输入"/>
                                </label-item>
                                <label-item class="item" title="小区地址" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.cityName}}/{{roomData.communityName}}</span>
                                    <a-input-group v-show="roomInfoEdit" compact class="address">
                                        <a-select v-model="roomData.cityId" @change="selectCity" style="width: 37%">
                                            <a-select-option :value="item.id" :key="item.id" v-for="(item,index) in cityList">{{ item.name }}</a-select-option>
                                        </a-select>
                                        <a-select class="addressHalfRadius" showSearch placeholder="请输入小区地址" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" @blur="" v-model="roomData.communityName">
                                            <a-select-option v-for="(item,index) in communityList" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
                                        </a-select>
                                    </a-input-group>
                                </label-item>
                                <label-item class="item" title="门牌号" :skeletonLoading="skeletonLoading" style="margin-right: 0px;">
                                    <span v-show="!roomInfoEdit">{{roomData.buildingNo}}栋{{roomData.unit}}单元{{roomData.doorplate}}室</span>
                                    <label-item v-show="roomInfoEdit">
                                        <a-input-group compact style="position: relative;width: 202px;">
                                            <a-input v-model="roomData.buildingNo" style=" width: 33.33%;" />
                                            <span class="addon-after-position" style="left: calc(33.33% - 25px);">栋
                                                <span style="color: red">*</span>
                                            </span>
                                            <a-input v-model="roomData.unit" style=" width: 33.33%;" />
                                            <span class="addon-after-position" style="left: calc(66.66% - 30px);">单元</span>
                                            <span class="addon-after-position" style="left: calc(100% - 25px);">室
                                                <span style="color: red">*</span>
                                            </span>
                                            <a-input v-model="roomData.doorplate" style=" width: 33.33%;" />
                                        </a-input-group>
                                    </label-item>
                                </label-item>
                                <label-item class="item" title="户型" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.room}}室{{roomData.livingRoom}}厅{{roomData.kitchen}}厨{{roomData.toilet}}卫</span>
                                    <label-item v-show="roomInfoEdit">
                                        <a-input-group compact style="position: relative;width: 203px;">
                                            <a-input v-model="roomData.room" style=" width: 25%;" />
                                            <span class="addon-after-position" style="left: calc(25% - 25px);">室
                                                <span style="color: red">*</span>
                                            </span>
                                            <a-input v-model="roomData.livingRoom" style=" width: 25%;" />
                                            <span class="addon-after-position" style="left: calc(50% - 25px);">厅
                                                <span style="color: red">*</span>
                                            </span>
                                            <span class="addon-after-position" style="left: calc(75% - 25px);">厨</span>
                                            <span class="addon-after-position" style="left: calc(100% - 25px);">卫
                                            </span>
                                            <a-input v-model="roomData.kitchen" style=" width: 25%;" />
                                            <a-input v-model="roomData.toilet" style=" width: 25%;" />
                                        </a-input-group>
                                    </label-item>
                                </label-item>
                                <label-item class="item" title="朝向" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.orientationName}}</span>
                                    <label-item v-show="roomInfoEdit">
                                        <a-select v-model="roomData.orientation">
                                            <a-select-option :value="1">东</a-select-option>
                                            <a-select-option :value="2">南</a-select-option>
                                            <a-select-option :value="3">西</a-select-option>
                                            <a-select-option :value="4">北</a-select-option>
                                            <a-select-option :value="5">南北</a-select-option>
                                        </a-select>
                                    </label-item>
                                </label-item>
                                <label-item class="item" title="面积" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.houseArea?roomData.houseArea+'㎡':'-'}}</span>
                                    <label-item v-show="roomInfoEdit" addonAfter="㎡">
                                        <a-input v-model="roomData.houseArea" placeholder="请输入" />
                                    </label-item>
                                </label-item>
                                <label-item class="item" title="楼层信息" :skeletonLoading="skeletonLoading" style="margin-right: 0px;">
                                    <span v-show="!roomInfoEdit">第{{roomData.currentFloor}}层，共{{roomData.totalFloor}}层</span>
                                    <label-item v-show="roomInfoEdit">
                                        <a-input-group compact style="position: relative;width: 201px;">
                                            <a-input v-model="roomData.currentFloor" style=" width: 50%;padding-left: 40px" />
                                            <span class="addon-after-position" style="left: 10px">第</span>
                                            <span class="addon-after-position" style="left: calc(50% - 20px);">层</span>
                                            <span class="addon-after-position" style="left: calc(50% + 4px);">共</span>
                                            <span class="addon-after-position" style="left: calc(100% - 20px);">层</span>
                                            <a-input v-model="roomData.totalFloor" style=" width: 50%;;padding-left: 40px" />
                                        </a-input-group>
                                    </label-item>
                                </label-item>
                                <label-item class="item" title="装修类型" :skeletonLoading="skeletonLoading" >
                                    <span v-show="!roomInfoEdit">{{roomData.decorationTypeName}}</span>
                                    <a-select v-show="roomInfoEdit" v-model="roomData.decorationType">
                                        <a-select-option :value="2">精装</a-select-option>
                                        <a-select-option :value="4">毛坯</a-select-option>
                                        <a-select-option :value="3">简装</a-select-option>
                                        <a-select-option :value="1">豪华装</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item" title="电梯信息" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.isHaveElevator ? '有电梯' : '无电梯'}}</span>
                                    <a-checkbox v-show="roomInfoEdit" :checked="roomData.isHaveElevator ? true : false" style="margin-top: 4px" @change="roomData.isHaveElevator = !roomData.isHaveElevator">有电梯</a-checkbox>
                                </label-item>
                                <label-item class="item" title="出租价格" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.actualPrice/100}}元/月</span>
                                    <label-item v-show="roomInfoEdit" addonAfter="元/月">
                                        <a-input v-model="actualPrice" v-validate="'moneyNoDot'" />
                                    </label-item>
                                </label-item>
                                <label-item class="item" title="短租信息" :skeletonLoading="skeletonLoading" style="margin-right: 0px;">
                                    <span v-show="!roomInfoEdit">{{roomData.isShortRent ? '可短租' : '不可短租'}}</span>
                                    <a-checkbox v-show="roomInfoEdit" :checked="roomData.isShortRent ? true : false" style="margin-top: 4px" @change="roomData.isShortRent = !roomData.isShortRent">可短租</a-checkbox>
                                </label-item>
                                <label-item class="item" title="看房时间" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.viewTypeName ? roomData.viewTypeName : '随时看房'}}</span>
                                    <label-item v-show="roomInfoEdit">
                                        <a-select v-model="roomData.viewType">
                                            <a-select-option :value="1">随时看房</a-select-option>
                                            <a-select-option :value="2">提前预约</a-select-option>
                                        </a-select>
                                    </label-item>
                                </label-item>
                                <label-item class="item" title="用水" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.waterTypeName|blankVal}}</span>
                                    <a-select v-show="roomInfoEdit" v-model="roomData.waterType">
                                        <a-select-option :value="1">民水</a-select-option>
                                        <a-select-option :value="2">商业用水</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item" title="用电" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.electricityTypeName|blankVal}}</span>
                                    <a-select v-show="roomInfoEdit" v-model="roomData.electricityType">
                                        <a-select-option :value="1">民电</a-select-option>
                                        <a-select-option :value="2">商业用电</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item" title="供暖信息" :skeletonLoading="skeletonLoading" style="margin-right: 0px;">
                                    <span v-show="!roomInfoEdit">{{roomData.heatingTypeName|blankVal}}</span>
                                    <a-select v-show="roomInfoEdit" v-model="roomData.heatingType">
                                        <a-select-option :value="0">未知</a-select-option>
                                        <a-select-option :value="1">自采暖</a-select-option>
                                        <a-select-option :value="2">集中供暖</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item" title="燃气信息" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.gasType==1 ? '有燃气' : '无燃气'}}</span>
                                    <a-checkbox v-show="roomInfoEdit" v-model="gasTypeFlag">有燃气</a-checkbox>
                                </label-item>
                                <label-item class="item" title="产权编号" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.propertyNo ? roomData.propertyNo : '-'}}</span>
                                    <a-input v-show="roomInfoEdit" v-model="roomData.propertyNo" placeholder="请输入" />
                                </label-item>
                                <label-item class="item" title="产权人姓名" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.propertyOwner ? roomData.propertyOwner : '-'}}</span>
                                    <a-input v-show="roomInfoEdit" v-model="roomData.propertyOwner" placeholder="请输入" />
                                </label-item>
                                <label-item class="item" title="产权人身份证号" :skeletonLoading="skeletonLoading" style="margin-right: 0px;">
                                    <span v-show="!roomInfoEdit">{{roomData.propertyOwnerIdCard ? roomData.propertyOwnerIdCard : '-'}}</span>
                                    <a-input v-show="roomInfoEdit" v-model="roomData.propertyOwnerIdCard" placeholder="请输入" />
                                </label-item>
                                <label-item class="item" title="房屋核验码" :skeletonLoading="skeletonLoading">
                                  <span v-show="!roomInfoEdit">{{roomData.checkCode?roomData.checkCode : '-'}}</span>
                                  <label-item v-show="roomInfoEdit">
                                    <a-input v-model="roomData.checkCode" maxlength="30" placeholder="请输入" />
                                  </label-item>
                                </label-item>
                                <label-item v-show="!roomInfoEdit"  class="item u-no-border clearfix" style="width: 100%;margin-right: 0px;" title="房源特色" :skeletonLoading="skeletonLoading">
                                    <span v-if="roomData.tagList==null||roomData.tagList.length==0" >-</span>
                                    <div v-else class="tagStyle f-fl" v-for="(item,i) in roomData.tagList" :key="i">{{item}}</div>
                                </label-item>
                                <label-item v-show="roomInfoEdit" class="item u-no-border clearfix" style="width: 100%;margin-right: 0px;" title="----" :skeletonLoading="skeletonLoading">
                                    <div class="checkAllStyle">
                                        <a-checkbox @change="value => checkAllTag(value)" v-model="tagCheckAll">房源特色</a-checkbox>
                                    </div>
                                    <a-checkbox-group v-show="roomInfoEdit" class="public-config" v-model="roomData.tagList" @change="changeTagCheckAll">
                                        <a-checkbox :value="item.name" v-for="(item,i) in houseTagConfig" :key="i">{{item.name}}</a-checkbox>
                                    </a-checkbox-group>
                                </label-item>
                                <label-item v-show="!roomInfoEdit" class="item u-no-border clearfix" style="width: 100%;margin-right: 0px;position: relative;" title="房源配置" :skeletonLoading="skeletonLoading">
                                    <div class="cursor" style="position: absolute;top:10px;left:70px;color: #0A87F8;" @click="goViewAssets" v-mark="['mk_assets_management_ck']"><icon-font type="iconyumengtubiao_yanjing-1" style="margin-right: 5px;"/>查看物资明细</div>
                                    <span v-if="(roomData.roomGoodsList==null||roomData.roomGoodsList.length==0)" >-</span>
                                    <div v-else class="configStyle f-fl" v-for="(item) in roomData.roomGoodsList" :key="item.id">{{item.name}} x {{item.quantity}}</div>
                                </label-item>
                              <view-config v-if="roomInfoEdit" ref="viewConfig" :configRelationFlag="configRelationFlag" :houseInfo="houseParamInfo" @refreshinfoFun="setRefreshConfig"></view-config>
                              <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" title="VR看房地址" :valLength="roomInfoEdit ? roomData.vrUrl.length : 0" :maxSize="roomInfoEdit ? 100 : 0" :skeletonLoading="skeletonLoading">
                                <span v-if="!roomInfoEdit&&roomData.vrUrl"><a href="javascript:void(0);" style="color: #0a87f8;text-decoration:underline;" @click="vrUrlPreview(roomData.vrUrl)">{{roomData.vrUrl}}</a></span>
                                <span v-if="!roomInfoEdit&&!roomData.vrUrl">-</span>
                                <a-textarea v-show="roomInfoEdit" v-model="roomData.vrUrl" maxlength="100" autosize placeholder="请输入VR看房链接地址" />
                              </label-item>
                                <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" title="房源标题" :valLength="roomInfoEdit ? roomData.title.length : 0" :maxSize="roomInfoEdit ? 30 : 0" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit">{{roomData.title ? roomData.title : '-'}}</span>
                                    <a-textarea v-show="roomInfoEdit" v-model="roomData.title" maxlength="30" autosize placeholder="请输入房源标题" />
                                </label-item>
                                <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" title="房源描述" :valLength="roomInfoEdit ? roomData.promotionDesc.length : 0" :maxSize="roomInfoEdit ? 500 : 0" :skeletonLoading="skeletonLoading">
                                    <span v-show="!roomInfoEdit&&!roomData.promotionDesc ">-</span>
                                    <div class="promotionDesc" v-show="!roomInfoEdit&&roomData.promotionDesc "> <a-textarea v-model="roomData.promotionDesc" maxlength="500" autosize /></div>
                                    <a-textarea v-show="roomInfoEdit" v-model="roomData.promotionDesc" maxlength="500" autosize placeholder="请输入房源描述" />
                                </label-item>
                            </div>
                            <div class="clearfix">
                                <div class="title f-fl">房源图片</div>
                                <div class="cursor f-fr" style="color: #0A87F8;" @click="updateHousePicEdit" v-if="!housePicEdit" v-mark="['mk_house_index_bjfy']">
                                    <icon-font type="iconyumengtubiao_bianji-1" />
                                </div>
                                <div class="tabs-options f-fr" v-if="housePicEdit">
                                    <span @click="cancelHousePicEdit" style="color: rgba(0, 0, 0, 0.65);line-height: 22px;">取消</span>
                                    <span @click="saveHousePicEdit" style="line-height: 22px;">保存</span>
                                </div>
                            </div>
                            <div class="input-info">
                                <label-item class="item u-bottom-border" style="width: 100%;margin-bottom: 0px;margin-right: 0;" :skeletonLoading="skeletonLoading">
                                    <div v-show="!housePicEdit" class="room-img-list f-clearfix">
                                        <span v-if="!roomData.picList||roomData.picList.length==0">-</span>
                                        <div class="f-fl cursor" v-for="(item,i) in roomData.picList" :key="i" style="margin-bottom: 10px;position: relative;">
                                          <span class="overHidde pic-name" style="position: absolute;" v-if="(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')">{{item.subBizType|formatFileOriginName}}</span>
                                          <div v-if="(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')" @click="handlePreview(roomData.picList,i)">
                                            <img v-if="GlobalConfig.ADD_WATERMARK==0" :src="item.small" alt="">
                                            <img v-if="GlobalConfig.ADD_WATERMARK==1" :src="item.small.indexOf('?') != -1 ? item.small+'&x-oss-process=style/house_pic':item.small+'?x-oss-process=style/house_pic'" alt="">
                                          </div>
                                          <div v-if="(item.fileExt == 'mp4' || item.fileExt == 'avi' || item.fileExt == 'mov')">
                                            <video :src="item.origin" controls="controls"></video>
                                          </div>
                                        </div>
                                    </div>
                                    <house-video v-show="housePicEdit" :picList="roomData.picList" :uploadParms="uploadParms" ref="housePicList"></house-video>
                                </label-item>
                            </div>
                            <div class="clearfix" style="position: relative;">
                                <div class="title f-fl" style="margin-top: 20px">房源标签</div>
                                <div class="cursor f-fr" style="color: #0A87F8;margin-top: 25px;" @click="updateHouseCommentEdit" v-if="!houseCommentEdit" v-mark="['mk_house_index_bjfy']">
                                    <icon-font type="iconyumengtubiao_bianji-1" />
                                </div>
                                <div class="tabs-options f-fr" v-if="houseCommentEdit">
                                    <span @click="cancelHouseCommentEdit" style="color: rgba(0, 0, 0, 0.65);line-height: 22px;">取消</span>
                                    <span @click="saveHouseCommentEdit" style="line-height: 22px;">保存</span>
                                </div>
                              <div style="position: absolute;top: 22px;left:64px;">
                                <span style="font-size: 12px;color: #FFA036;">(仅内部可见)</span>
                              </div>
                            </div>
                            <div class="input-info" style="margin-top: 5px;">
                              <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" :style="!houseCommentEdit&&roomData.lableList&&roomData.lableList.length>0?'margin-bottom:15px;':'margin-bottom:20px;'" title="" :skeletonLoading="skeletonLoading">
                                <div :style="houseCommentEdit?'border-bottom: 1px solid #DDDDDD;':''">
                                  <div v-if="!houseCommentEdit&&roomData.lableList&&roomData.lableList.length>0" class="clearfix">
                                    <div v-for="(itemTemp,index) in roomData.lableList" :key="index" class="itemLableStyle f-fl clearfix" style="margin-bottom: 5px;">
                                      <div>{{itemTemp}}</div>
                                    </div>
                                  </div>
                                  <div v-if="!houseCommentEdit&&(!roomData.lableList||roomData.lableList.length==0)">-</div>
                                  <div class="clearfix" v-if="houseCommentEdit">
                                    <div v-for="(itemTemp,index) in roomData.lableList" :key="index" class="itemLableStyle f-fl clearfix" style="margin-bottom: 5px;">
                                      <div class="f-fl">{{itemTemp}}</div>
                                      <icon-font style="color: #FB4246;margin-top: 5px;" class="cursor f-fl" @click="removeHouseLableList(index)" type="iconyumengtubiao_guanbi-"/>
                                    </div>
                                    <label-item class="f-fl u-no-border" v-if="roomData.lableList.length<10">
                                      <a-input v-model="houseLableInput" style="text-align: left;" maxLength="10" @click="currentClickIndex=1" :placeholder="roomData.lableList.length==0?'可输入补充标签，回车添加':'继续输入回车添加'" @keyup.enter="value=>addHouseLabel(value)" />
                                    </label-item>
                                  </div>
                                </div>
                              </label-item>
                            </div>
                            <div class="clearfix" style="position: relative;">
                              <div class="title f-fl" style="margin-top: 10px">备注</div>
                              <div class="poperLabelStyle2" v-if="currentClickIndex&&houseLableList.length>0" style="max-height: 200px;overflow-y: auto" @mouseenter="currentClickIndex=1" @mouseleave="currentClickIndex=undefined">
                                <div style="width: 100%;font-size: 12px;color: #666666;line-height: 17px;margin: 0 0 2px 0;">常用标签</div>
                                <div v-for="(itemTemp,index3) in houseLableList" :key="index3" @click.stop="changeLabelList(itemTemp)" class="selectDemandLabelItem cursor f-fl clearfix" style="margin:0 5px 5px 0;" :style="roomData.lableList.indexOf(itemTemp)>-1?'':'background:#F4F4F4;'">
                                  <div class="f-fl">{{itemTemp}}</div>
                                </div>
                              </div>
                              <div style="position: absolute;top: 12px;left:34px;">
                                <span style="font-size: 12px;color: #FFA036;">(仅内部可见)</span>
                              </div>
                            </div>
                            <div class="input-info" style="margin-top: 5px;">
                              <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" :valLength="houseCommentEdit ? roomData.comment.length : 0" :maxSize="houseCommentEdit ? 500 : 0" :skeletonLoading="skeletonLoading">
                                <span v-show="!houseCommentEdit&&!roomData.comment">-</span>
                                <div class="promotionDesc" v-show="!houseCommentEdit&&roomData.comment "> <a-textarea v-model="roomData.comment" maxlength="500" autosize /></div>
                                <a-textarea v-show="houseCommentEdit" v-model="roomData.comment" maxlength="500" autosize placeholder="请输入备注信息" />
                              </label-item>
                            </div>
                            <div class="clearfix">
                                <div class="title f-fl" style="margin-top: 10px">所属门店(部门)/维护人</div>
                                <div class="cursor f-fr" style="color: #0A87F8;" @click="updateHouseMaintainersEdit" v-if="!houseMaintainersEdit" v-mark="['mk_house_index_bjfy']">
                                    <icon-font type="iconyumengtubiao_bianji-1" />
                                </div>
                                <div class="tabs-options f-fr" v-if="houseMaintainersEdit">
                                    <span @click="cancelHouseMaintainersEdit" style="color: rgba(0, 0, 0, 0.65);line-height: 22px;">取消</span>
                                    <span @click="saveHouseMaintainersEdit" style="line-height: 22px;">保存</span>
                                </div>
                            </div>
                            <div class="input-info deptStyle clearfix" style="margin-top: 5px;">
                              <label-item class="item u-bottom-border f-fl" :must-fill="houseMaintainersEdit?true:false" title="所属门店(部门)" style="margin-bottom: 0px;margin-right: 0px;" :skeletonLoading="skeletonLoading">
                                <span v-show="!houseMaintainersEdit">{{roomData.deptName?roomData.deptName:'-'}}</span>
                                <label-item v-show="houseMaintainersEdit" v-if="roomData.deptName">
                                  <store-tree resMark="mk_house_decentralized" @cancelOtherTree="cancelOtherTree(1)" :defaultValue='roomData.deptName' placement="topLeft" ref="selectDept" width="200px" @selectChange="selectDept" :show-employee="false"></store-tree>
                                </label-item>
                                <label-item v-show="houseMaintainersEdit" v-else>
                                  <store-tree resMark="mk_house_decentralized" @cancelOtherTree="cancelOtherTree(1)" :defaultValue='roomData.deptName' placement="topLeft" ref="selectDept" width="200px" @selectChange="selectDept" :show-employee="false"></store-tree>
                                </label-item>
                              </label-item>
                                <label-item class="item u-bottom-border f-fl" title="维护人" style="margin-bottom: 0px;" :skeletonLoading="skeletonLoading">
                                    <span v-show="!houseMaintainersEdit">{{roomData.maintainerName}}-{{roomData.maintainerPhone}}</span>
                                    <label-item v-show="houseMaintainersEdit" v-if="roomData.maintainerName">
                                        <dept-employee-tree resMark="mk_house_decentralized" @cancelOtherTree="cancelOtherTree(2)" :bottomBorder="false" :defaultValue="roomData.maintainerName" @selectChange="selectDeptEmp" ref="selectDeptEmp" width="180px" placement="topLeft" :disableDept="true"></dept-employee-tree>
                                    </label-item>
                                    <label-item v-show="houseMaintainersEdit" v-else>
                                        <dept-employee-tree resMark="mk_house_decentralized" @cancelOtherTree="cancelOtherTree(2)" :bottomBorder="false" @selectChange="selectDeptEmp" ref="selectDeptEmp" width="180px" placement="topLeft" :disableDept="true"></dept-employee-tree>
                                    </label-item>
                                </label-item>
                            </div>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2" v-if="permission.reserveFlag">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_yuyue" />预定信息
                        </span>
                        <destine-info v-if="destineInfoFlag" ref="destineInfo" @openDetail="openDetail" :houseId="roomData.id"> </destine-info>
                    </a-tab-pane>
                    <a-tab-pane key="3" v-if="permission.tenantContractFlag">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_zukehetong" />租客合同
                        </span>
                        <tenant-info v-if="tenantInfoFlag" ref="tenantInfo" @openDetail="openDetailTenant" :houseId="roomData.id"> </tenant-info>
                    </a-tab-pane>
                    <a-tab-pane key="4" v-if="permission.ownerContractFlag">
                        <span slot="tab">
                            <icon-font type="iconyezhuhetong" />业主合同
                        </span>
                        <owner-info v-if="ownerInfoFlag" ref="ownerInfo" @openDetail="openDetailOwner" :housePid="roomData.housePid"> </owner-info>
                    </a-tab-pane>
                    <a-tab-pane key="5" v-if="permission.billFlag">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_caiwuzhangdan" />财务账单
                        </span>
                        <bill-info v-if="billInfoFlag" ref="billInfo" @openDetail="openDetailBill" :houseId="roomData.id" :housePid="roomData.housePid"> </bill-info>
                    </a-tab-pane>
                    <a-tab-pane key="6" v-if="permission.repairFlag">
                        <span slot="tab">
                            <icon-font type="iconweixiu-1" />维修
                        </span>
                        <repair-info v-if="repairInfoFlag" ref="repairInfoWhole" @openDetail="openDetailRepair" :houseId="roomData.id" :housePid="roomData.id"></repair-info>
                    </a-tab-pane>
                    <a-tab-pane key="7" v-if="permission.cleanFlag">
                        <span slot="tab">
                            <icon-font type="iconbaojie-1" />保洁
                        </span>
                        <clean-info v-if="cleanInfoFlag" ref="cleanInfoWhole" @openDetail="openDetailClean" :houseId="roomData.id" :housePid="roomData.id"></clean-info>
                    </a-tab-pane>
                    <a-tab-pane key="8" v-if="permission.distributionFlag">
                        <span slot="tab">
                            <icon-font type="iconpeihuo-xianxing" />配货
                        </span>
                        <distribution-info v-if="distributionInfoFlag" ref="distributionInfoWhole" @openDetail="openDetailDistribution" :houseId="roomData.id" :housePid="roomData.id"></distribution-info>
                    </a-tab-pane>
                  <a-tab-pane key="9" v-if="permission.lockFlag">
                        <span slot="tab">
                            <icon-font type="iconmensuo2" />门锁
                        </span>
                    <lock-info v-if="lockInfoFlag" ref="lockInfoWhole" :houseType="houseType" :roomData="roomData" @bindSuccess="bindLockSuccess" @unBindSuccess="unBindSuccess"></lock-info>
                  </a-tab-pane>
                  <a-tab-pane key="10" v-if="permission.eletricMoreFlag">
                    <span slot="tab">
                        <icon-font type="iconshuidianran" />水电燃
                    </span>
                    <electric-more-info v-if="electricMoreInfoFlag" ref="electricMoreInfoWhole" :houseType="houseType" :roomData="roomData" :defaultActiveIndex="electricMoreDefaultActiveIndex"
                                        @bindSuccess="bindElectricMoreInfoSuccess" @unBindSuccess="unBindElectricMoreSuccess" @refreshinfoFun="refreshinfoFun"></electric-more-info>
                  </a-tab-pane>
                    <div  slot="tabBarExtraContent" class="tabs-options tabs-options-top" v-show="!skeletonLoading">
                        <div v-show="activekey == 1&&roomData.status!=8" class="opt-item" :class="innerMarkList.indexOf('mk_contract_owner_tjht')>-1?'sixLength':'normalLength'">
                            <div v-if="outterMarkList.indexOf('mk_contract_tenant_tjht')>-1" v-mark="['mk_contract_tenant_tjht']" @click="addTenantContract">
                                <icon-font type="iconyumengtubiao_heyue" />
                                <span>&nbsp;签约</span>
                            </div>
                            <div v-if="outterMarkList.indexOf('mk_contract_reserve_tjyd')>-1" v-mark="['mk_contract_reserve_tjyd']" @click="addReserve">
                                <icon-font type="iconyumengtubiao_yuyue" />
                                <span>&nbsp;预定</span>
                            </div>
                            <div v-if="outterMarkList.indexOf('mk_finance_bill_tjzd')>-1" v-mark="['mk_finance_bill_tjzd']" @click="addBill">
                                <icon-font type="iconyumengtubiao_caiwuzhangdan" />
                                <span>&nbsp;添加账单</span>
                            </div>
                            <div v-if="outterMarkList.indexOf('mk_contract_owner_tjht')>-1" v-mark="['mk_contract_owner_tjht']" @click="addOwnerContract">
                                <icon-font type="iconyezhuhetong" />
                                <span>&nbsp;添加业主合同</span>
                            </div>
                            <div v-if="outterMarkList.indexOf('mk_house_index_gbfy')>-1" v-mark="['mk_house_index_gbfy']" @click="closeAll">
                                <icon-font type="iconyumengtubiao_jinyong" />
                                <span>&nbsp;关闭房源</span>
                            </div>
                            <div v-if="outterMarkList.indexOf('mk_house_index_scfy')>-1" v-mark="['mk_house_index_scfy']" @click="deleteHouse">
                                <icon-font type="iconyumengtubiao_shanchu-" />
                                <span>&nbsp;删除房源</span>
                            </div>
                            <a-popover placement="bottomRight" v-if="showMoreOperate">
                                <div>
                                    <icon-font type="iconyumengtubiao_gengduo-1" />
                                    &nbsp;更多
                                </div>
                                <template slot="content">
                                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('mk_contract_owner_tjht')>-1" v-mark="['mk_contract_owner_tjht']" @click="addOwnerContract">添加业主合同</div>
                                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('mk_house_index_gbfy')>-1" v-mark="['mk_house_index_gbfy']" @click="closeAll">关闭房源</div>
                                    <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('mk_house_index_scfy')>-1" v-mark="['mk_house_index_scfy']" @click="deleteHouse">删除房源</div>
                                </template>
                            </a-popover>
                        </div>
                        <div v-show="activekey == 1&&roomData.status==8" class="opt-item">
                            <div @click="openAll">
                                <icon-font type="iconyumengtubiao_jihuo" />
                                <span>&nbsp;激活房源</span>
                            </div>
                            <div @click="deleteHouse" v-mark="['mk_house_index_scfy']">
                                <icon-font type="iconyumengtubiao_shanchu-" style="color: red"/>
                                <span style="color: red;">&nbsp;删除房源</span>
                            </div>
                        </div>
                        <div v-show="activekey == 2">
                            <div v-mark="['mk_contract_reserve_tjyd']" @click="addReserve">
                                <icon-font type="iconyumengtubiao_yuyue" />
                                <span>&nbsp;添加预定</span>
                            </div>
                        </div>
                        <div v-show="activekey == 3">
                            <div v-mark="['mk_contract_tenant_tjht']" @click="addTenantContract">
                                <icon-font type="iconyumengtubiao_heyue" />
                                <span>&nbsp;添加租客合同</span>
                            </div>
                        </div>
                        <div v-show="activekey == 4">
                            <div v-mark="['mk_contract_owner_tjht']" @click="addOwnerContract">
                                <icon-font type="iconyezhuhetong" />
                                <span>&nbsp;添加业主合同</span>
                            </div>
                        </div>
                        <div v-show="activekey == 5">
                            <div v-mark="['mk_finance_bill_tjzd']" @click="addBill">
                                <icon-font type="iconyumengtubiao_caiwuzhangdan" />
                                <span>&nbsp;添加账单</span>
                            </div>
                        </div>
                        <div v-show="activekey == 6">
                            <div @click="addRepair" v-mark="['mk_workorder_repair_tjgd']">
                                <icon-font type="iconweixiu-1" />
                                <span>&nbsp;添加维修</span>
                            </div>
                        </div>
                        <div v-show="activekey == 7">
                            <div @click="addClean" v-mark="['mk_workorder_clean_tjgd']">
                                <icon-font type="iconbaojie-1" />
                                <span>&nbsp;添加保洁</span>
                            </div>
                        </div>
                        <div v-show="activekey == 8">
                            <div @click="addDistribution" v-mark="['mk_workorder_distribution_tjgd']">
                                <icon-font type="iconpeihuo-xianxing" />
                                <span>&nbsp;申请配货</span>
                            </div>
                        </div>
                    </div>
                </a-tabs>
            </div>
            <div class="bottom">
                <span>{{roomData.creater}}创建于 {{$moment(roomData.createTime).format('lll')}}</span>
                <span>{{roomData.updater}}更新于 {{$moment(roomData.updateTime).format('lll')}}</span>
            </div>
        </div>

        <!--变更房源信息-->
        <a-modal title="变更房源信息" centered v-model='showChangeStatusDialog' class="ownModalBorder titDialog" @ok="saveStatus" okText="保存" cancelText="取消">
            <label-item style="margin: 0 20px 20px 20px" title="房源信息" border class="u-bottom-border">
                <div>
                    <span class="houseAliasStyle" v-if="changeStatusData.houseAlias">{{changeStatusData.houseAlias}}</span>
                    <span style="font-size: 16px;">{{changeStatusData.houseAddress}}</span>
                </div>
            </label-item>
            <label-item style="margin: 0 20px 20px 20px" title="需变更状态" border class="u-bottom-border">
                <div>
                    <span v-if="changeStatusData.houseStatus != 1" style="padding: 4px 14px;" @click="activeIndex = 1" class="houseAlias status-tags" :class="{active: activeIndex == 1}">空置</span>
                    <span v-if="changeStatusData.houseStatus != 3" style="padding: 4px 14px;" @click="activeIndex = 3" class="houseAlias status-tags" :class="{active: activeIndex == 3}">已租</span>
                    <span v-if="changeStatusData.houseStatus != 4" style="padding: 4px 14px;" @click="activeIndex = 4" class="houseAlias status-tags" :class="{active: activeIndex == 4}">配置</span>
                    <span v-if="changeStatusData.houseStatus != 5" style="padding: 4px 14px;" @click="activeIndex = 5" class="houseAlias status-tags" :class="{active: activeIndex == 5}">锁房</span>
                </div>
            </label-item>
        </a-modal>
        <!-- 添加租客合同弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="addTenantContractDialog" class="ownModalBorder titDialog" title="添加合同">
            <tenant-contract :houseFul="houseFul" :reserveFul='reserveFul' :reserveData="reserveData" @cancelUp="addTenantContractDialog = false" :roomData="roomData" @saveSuccess="addTenantContractSuccess" @cancelSaveTenantContract="cancelSaveTenantContract"></tenant-contract>
        </a-modal>
        <!-- 添加业主合同弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="addOwnerContractDialog" class="ownModalBorder titDialog" title="添加业主合同">
            <owner-contract :houseFul="houseFul" :roomData="roomData" :contractResetStatus="contractResetStatus" @saveSuccess="addOwnerContractSuccess" @cancelSaveOwnerContract="cancelSaveOwnerContract"></owner-contract>
        </a-modal>
        <!-- 添加预定弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="addReserveDialog" class="ownModalBorder titDialog" title="添加预定" @cancel="handleCancel">
            <add-reserve ref="houseAddReserve" :houseFul="houseFul" :roomData="roomData" @cancelUp="addReserveDialog = false" @saveSuccess="addReserveSuccess"></add-reserve>
        </a-modal>
        <!-- 预定详情弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="reserveDetailDialog" class="ownModalBorder titDialog" title="预定详情" @cancel="downDetail">
            <reserve-detail :reserveId="reserveId" @refreshinfoFun="refreshinfoFun" @deleteSuccess="deleteSuccess" @reserveId="reserveIdFun" @addContractIng="addContractIng"></reserve-detail>
        </a-modal>
        <!-- 租客合同弹框 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="合同详情" width="1000px" v-model="lookTenantDialog" class="ownModalBorder titDialog" @cancel="cancelTenantDetail">
            <contract-detail :tenantContract="tenantContractId" @refreshinfoFun="refreshinfoFun" @saveHouseDetail="cancelTenantDetail" @deleteOk="deleteOk" @initTenantContract="initTenantContract"></contract-detail>
        </a-modal>
        <!-- 业主合同弹框 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="合同详情" width="1000px" v-model="lookOwnerDialog" class="ownModalBorder titDialog" @cancel="cancelOwnerDetail">
            <contract-owner :ownerContract="ownerContractId" :auditInstanceId="auditInstanceId" @saveHouseDetail="cancelOwnerDetail" @refreshinfoFun="refreshinfoFun" @deleteOk="deleteOkOwner" @initOwnerContract="initOwnerContract"></contract-owner>
        </a-modal>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog" @cancel="cancelBillDetail">
            <bill-detail :billId="billId" @refreshinfoFun="refreshinfoFun" @saveSuccess="successFunBill"></bill-detail>
        </a-modal>
        <!-- 添加添加账单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="addBillDialog" class="ownModalBorder titDialog" title="添加账单">
            <add-bill :houseFul="houseFul" :roomData="roomData" @saveSuccess="addSaveSuccessBill" @closeThis="addBillDialog=false"></add-bill>
        </a-modal>
        <!-- 维修详情 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="repairDetailDialog" class="ownModalBorder titDialog" title="工单详情" @cancel="cancelRepairDetail">
            <repair-detail @refreshinfoFun="refreshinfoFun" :repairId="repairId" @cancelDetails="repairDetailDialog=false;"></repair-detail>
        </a-modal>
        <!-- 保洁详情 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="cleanDetailDialog" class="ownModalBorder titDialog" title="工单详情" @cancel="cancelCleanDetail">
            <clean-detail @refreshinfoFun="refreshinfoFun" :cleanId="cleanId" @cancelDetails="cleanDetailDialog=false;"></clean-detail>
        </a-modal>
        <!-- 配货详情 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="distributionDetailDialog" class="ownModalBorder titDialog" title="工单详情" @cancel="cancelDistributionDetail">
            <distribution-detail @refreshinfoFun="refreshinfoFun" :distributionId="distributionId" @cancelDetails="distributionDetailDialog=false;"></distribution-detail>
        </a-modal>
        <!-- 添加维修 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addRepairDialog" class="ownModalBorder titDialog" title="添加维修">
            <add-repair :houseFul="houseFul" :roomData="roomData" @successSave="addSaveSuccessRepair" @cancelSave="addRepairDialog=false"></add-repair>
        </a-modal>
        <!-- 添加保洁 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addCleanDialog" class="ownModalBorder titDialog" title="添加保洁">
            <add-clean :houseFul="houseFul" :roomData="roomData" @successSave="addSaveSuccessClean" @cancelSave="addCleanDialog=false"></add-clean>
        </a-modal>
        <!-- 申请配货 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addDistributionDialog" class="ownModalBorder titDialog" title="申请配货">
            <add-distribution :houseFul="houseFul" :roomData="roomData" @successSave="addSaveSuccessDistribution" @cancelSave="addDistributionDialog=false"></add-distribution>
        </a-modal>
        <!-- 预览图片 -->
        <a-modal :visible="previewVisible" centered :footer="null" @cancel="cancelPreviewImage">
          <img v-if="GlobalConfig.ADD_WATERMARK==1" style="width: 100%" :src="previewImage.indexOf('?') != -1 ? previewImage+'&x-oss-process=style/house_pic':previewImage+'?x-oss-process=style/house_pic'" alt="example">
          <img v-if="GlobalConfig.ADD_WATERMARK==0" style="width: 100%" :src="previewImage" alt="example">
        </a-modal>
        <!-- 图片预览(新) -->
        <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1000px" v-model="imageShowDialog" class="ownModalBorder titDialog" title="图片预览">
          <images-view :picList="imageShowPicList" :imageShowIndex="imageShowIndex"></images-view>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1000px" v-model="assetsManageDialog" class="ownModalBorder titDialog" :title="assetsManageTitle" @cancel="assetsManageFun">
          <assets-manage :houseInfo="houseParamInfo" @refreshinfoFun="refreshinfoFun"></assets-manage>
        </a-modal>
    </div>
</template>

<script>
import * as API from '@/api/wholeHouse';
import * as shareAPI from '@/api/shareHouse';
import * as decentralizedAPI from '@/api/decentralizedHouse';
import * as PublicAPI from '@/api/public';
import {bizDecisionGet} from "@/api/decision";
import tenantContract from '@/views/contract/tenant/addTenantContract';
import addReserve from '@/views/contract/reserve/addReserve';
import reserveDetail from '@/views/contract/reserve/reserveDetail';
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import StoreTree from '@/components/DeptEmployeeTree/store';
import destineInfo from './destine';
import tenantInfo from './tenantInfo';
import ownerInfo from './ownerInfo';
import billInfo from './billInfo';
import RepairInfo from '../whole/repairInfo';
import CleanInfo from '../whole/cleanInfo';
import DistributionInfo from '../whole/distributionInfo';
import LockInfo from './lockInfo';
import ElectricMoreInfo from '../whole/electricMoreInfo';
import { getReserveInfo } from '@/api/reserve'
import contractDetail from '@/views/contract/tenant/contractDetails';
import contractOwner from '@/views/contract/owner/contractDetails';
import billDetail from '@/views/finance/bill/billDetails';
import addBill from '@/views/finance/bill/addBill';
import ownerContract from '@/views/contract/owner/addOwnerContract';
import RepairDetail from '@/views/workorder/repair/details';
import CleanDetail from '@/views/workorder/cleaning/details';
import DistributionDetail from '@/views/workorder/distribution/details';
import AddRepair from '@/views/workorder/repair/add';
import AddClean from '@/views/workorder/cleaning/add';
import AddDistribution from '@/views/workorder/distribution/add';
import {getListHouseLable} from "@/api/centralizedHouse";
import HouseVideo from '@/components/OwnUpload/houseVideo';
import ImagesView from '@/components/ImagesView';
import viewConfig from './viewConfig';
import AssetsManage from './assetsManage';
const allMarkList = [
    'mk_contract_tenant_tjht','mk_contract_reserve_tjyd','mk_finance_bill_tjzd',
    'mk_contract_owner_tjht','mk_house_index_gbfy','mk_house_index_scfy',
];
export default {
    name: "HouseDetail",
    props: {
        roomTitle: {
            type: Object,
        },
        goToActive:{
          type:String,
        },
    },
    components: {
        tenantContract,
        addReserve,
        DeptEmployeeTree,
        StoreTree,
        destineInfo,
        reserveDetail,
        tenantInfo,
        contractDetail,
        billInfo,
        billDetail,
        RepairInfo,
        CleanInfo,
        DistributionInfo,
        LockInfo,
        ElectricMoreInfo,
        addBill,
        ownerInfo,
        contractOwner,
        ownerContract,
        RepairDetail,
        CleanDetail,
        DistributionDetail,
        AddRepair,
        AddClean,
        AddDistribution,
        HouseVideo,
        ImagesView,
        viewConfig,
        AssetsManage,
    },
    inject: ['reloadHouseDiagram'],
    data() {
        return {
            previewImage: '',
            previewVisible: false,
            roomData: {},
            copyRoomData: {},
            roomInfoEdit:false,
            houseInfoEdit:false,
            housePicEdit:false,
            houseCommentEdit:false,
            houseMaintainersEdit:false,
            houseTagConfig: [],
            cityList: [],
            communityList: [],
            houseFul: true,
            addTenantContractDialog: false,
            addOwnerContractDialog:false,
            addReserveDialog: false,
            uploadParms: {
                bizId: '',
                bizType: 1,
                subBizType: '',
            },
            actualPrice: '',
            defaultMaintainers: '',
            activekey: '1',
            reserveDetailDialog:false,
            reserveData:{},
            reserveId:'',
            tenantContractId:'',
            auditInstanceId:'',
            bizScene:'',
            auditBreakInstanceId:'',
            ownerContractId:'',
            lookOwnerDialog:false,
            lookTenantDialog:false,
            billId:'',
            billDetailDialog: false,
            repairId:'',
            repairDetailDialog: false,
            cleanId:'',
            cleanDetailDialog:false,
            distributionId:'',
            distributionDetailDialog:false,
            addBillDialog: false,
            reserveFul:false,
            contractResetStatus: false,   //重置合同状态
            showChangeStatusDialog:false,
            activeIndex: 0,
            changeStatusData: {
                houseAlias: '',
                houseAddress: '',
                houseStatus: '',
                id: '',
            },
            destineInfoFlag:false,
            tenantInfoFlag:false,
            ownerInfoFlag:false,
            billInfoFlag:false,
            repairInfoFlag:false,
            cleanInfoFlag:false,
            lockInfoFlag:false,
            electricMoreInfoFlag:false,
            distributionInfoFlag:false,
            skeletonLoading:true,
            gasTypeFlag:false,
            tagCheckAll:false,
            showMoreOperate:false,          //是否显示更多按钮
            markList:[],                    //所有的权限mark、排序后
            innerMarkList:[],               //更多里面的mark
            outterMarkList:[],              //更多外面的mark
            addRepairDialog:false,
            addCleanDialog:false,
            addDistributionDialog:false,
          houseLableList:[],
          houseLableInput:'',
          currentClickIndex:undefined,
          haveQuick:false,
          houseType:1,
          permission:{
            reserveFlag:false,
            tenantContractFlag:false,
            ownerContractFlag:false,
            billFlag:false,
            repairFlag:false,
            cleanFlag:false,
            distributionFlag:false,
            lockFlag:false,
            eletricMoreFlag:false,
          },
          imageShowDialog:false,
          imageShowPicList:[],
          imageShowIndex:0,
          isRefresh:false,
          configRelationFlag:false,   //物品配置是否关联
          houseParamInfo:{},
          assetsManageDialog:false,
          maskStyle:{backgroundColor:'rgba(0,0,0,0.2)'},
          assetsManageTitle:'',
          refreshConfig:false,      //是否刷新配置
          electricMoreDefaultActiveIndex:1,
        }
    },
    created() {
        this.getCity();
        this.getWholeHouseData();
        this.getDictionaryList();
        this.listHouseLable();
    },
    methods: {
      assetsManageFun(){
        this.assetsManageDialog = false;
        if(this.isRefresh){
          this.getWholeHouseData();
          this.isRefresh = false;
        }
      },
      setRefreshConfig(res){
        if(res){
          this.refreshConfig = res;
        }
      },
      goViewAssets(){
        this.assetsManageDialog = true;
        this.houseParamInfo.operateType = 'view';
      },
      cancelOtherTree(val){
        if(val==1){
          this.$refs.selectDeptEmp.showTree = false;
        }
        if(val==2){
          this.$refs.selectDept.showTree = false;
        }
      },
      vrUrlPreview(url){
        if(!url){
          return ;
        }
        window.open(url);
      },
      unBindElectricMoreSuccess(){
        this.getWholeHouseData();
        this.$emit('refreshinfoFun',true);
      },
      bindElectricMoreInfoSuccess(){
        this.getWholeHouseData();
        this.$emit('refreshinfoFun',true);
      },
      unBindSuccess(){
        this.getWholeHouseData();
        this.$emit('refreshinfoFun',true);
      },
      bindLockSuccess(){
        this.getWholeHouseData();
        this.$emit('refreshinfoFun',true);
      },
      changeLabelList(itemTemp){
        let pos =this.roomData.lableList.indexOf(itemTemp);
        if(pos>-1){
          this.roomData.lableList.splice(pos,1);
        }
        else{
          if(this.roomData.lableList.length>=10){
            return;
          }
          this.roomData.lableList.push(itemTemp);
        }
      },
      addHouseLabel(){
        let value = this.houseLableInput;
        if(value){
          let pos = this.roomData.lableList.indexOf(value)
          if(pos > -1){
            //有了就不添加了
            this.$message.warning('该标签已存在，不可重复添加');
          }
          else{
            this.roomData.lableList.push(value);
            this.houseLableInput='';
          }
        }
      },
      removeHouseLableList(index){
        this.roomData.lableList.splice(index,1);
      },
      listHouseLable(){
        getListHouseLable().then(res => {
          if (res.code == "200") {
            this.houseLableList = res.data;
          }
        })
      },
        refreshinfoFun(res){
            if(res){
              this.isRefresh = res;
                this.$emit('refreshinfoFun',true);
            }
        },
        successFunBill(res){
            //账单删除后的回调
            if(res){
                this.billDetailDialog = false;
                this.billInfoFlag = false;
                this.getWholeHouseData();
                this.isRefresh = false;
                setTimeout(() => {
                    this.billInfoFlag = true;
                }, 500);
                this.$emit('refreshinfoFun', true);
            }
        },
        checkAllTag(e){
            if(e.target.checked){
                this.roomData.tagList = [];
                this.houseTagConfig.forEach((item)=>{
                    this.roomData.tagList.push(item.name);
                })
            }else{
                this.roomData.tagList = [];
            }
        },
        changeTagCheckAll(){
            if(this.roomData.tagList==null){
                this.roomData.tagList = [];
            }
            if(this.roomData.tagList.length == this.houseTagConfig.length){
                this.tagCheckAll = true;
            }
            else{
                this.tagCheckAll = false;
            }
        },
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(picList,i) {
          this.imageShowDialog = true;
          this.imageShowPicList = picList;
          this.imageShowIndex = i;
        },
        getWholeHouseData() {
            this.skeletonLoading = true;
            API.getWholeHouseData(this.roomTitle.houseId).then(res => {
                if (res.code == 200) {
                    this.roomData = res.data;
                    this.copyRoomData = Object.assign({}, this.roomData);
                    this.uploadParms = {
                        bizId: res.data.id,
                        bizType: 1,
                        subBizType: '',
                    }
                    this.defaultMaintainers = this.roomData.maintainerName + '/' + this.roomData.maintainerPhone;
                    this.actualPrice = this.roomData.actualPrice/100;
                    if(this.roomData.picList == null){
                        this.roomData.picList = [];
                    }
                    else{
                        for (let i = 0; i < this.roomData.picList.length; i++) {
                            this.roomData.picList[i].status='done';
                            let subBizType = this.roomData.picList[i].subBizType;
                            if (subBizType == 3) {
                                this.roomData.picList[i].fileOriginName = '卧室';
                            } else if (subBizType == 4) {
                                this.roomData.picList[i].fileOriginName = '客厅';
                            } else if (subBizType == 5) {
                                this.roomData.picList[i].fileOriginName = '厨房';
                            } else if (subBizType == 6) {
                                this.roomData.picList[i].fileOriginName = '卫生间';
                            } else if (subBizType == 7) {
                                this.roomData.picList[i].fileOriginName = '阳台';
                            } else if (subBizType == 8) {
                                this.roomData.picList[i].fileOriginName = '吧台';
                            } else if (subBizType == 2) {
                                this.roomData.picList[i].fileOriginName = '户型图';
                            } else if (subBizType == 10) {
                                this.roomData.picList[i].fileOriginName = '环境';
                            } else if (subBizType == 11) {
                                this.roomData.picList[i].fileOriginName = '其他';
                            } else {
                                this.roomData.picList[i].fileOriginName = '-';
                            }
                        }
                    }
                    if(!this.roomData.viewType){
                        this.roomData.viewType = 1;
                    }
                    this.gasTypeFlag = this.roomData.gasType == 1?true:false;
                    let unit = this.roomData.unit?this.roomData.unit+'单元-':'-';
                    let address = this.roomData.cityName+this.roomData.areaName+this.roomData.communityName+this.roomData.buildingNo+'栋'+unit+this.roomData.doorplate+'室';
                    this.$emit('changeTitle',this.roomData.houseAlias,address);
                    let  houseAlias = this.roomData.houseAlias?this.roomData.houseAlias+'/':''
                    this.assetsManageTitle = houseAlias + address;
                    //构造配置需要的参数
                    this.houseParamInfo = {
                      houseId:this.roomTitle.houseId,
                      houseAlias:this.roomData.houseAlias,
                      fullAddress:address,
                      address:address,
                      assetsManageTitle:this.assetsManageTitle,
                      fromType:'whole',
                    };
                    //权限处理
                    this.getPermission();
                    //判断是否有haveQuick
                    if(this.roomData.waterMeter||this.roomData.electricMeter||this.roomData.doorLock||this.roomData.isRepairUndone==1||this.roomData.isCleanUndone==1||
                        this.roomData.isDistributionUndone==1||this.roomData.isBillReceivable==1||this.roomData.isBillOverdue==1||
                        this.roomData.isContractBeRecorded==1||this.roomData.isContractBeSigned==1||this.roomData.isSyncTenant==1||
                        (this.roomData.contractStatus&&this.roomData.contractStatus==3&&this.roomData.renterFewDaysLaterIn&&this.roomData.renterFewDaysLaterIn>0)||
                        (this.roomData.contractStatus&&this.roomData.contractStatus==4&&this.roomData.renterRemainingDays&&this.roomData.renterRemainingDays>0)||
                        this.roomData.isContractBeExpired==1||this.roomData.isHasBook==1){
                      this.haveQuick = true;
                    }
                    else{
                      this.haveQuick = false;
                    }
                    //判断是否跳转特定页面
                    if(this.goToActive){
                      this.changeActiveKey(this.goToActive);
                    }
                    //获取是否强关联资产
                    this.bizDecisionGet(this.roomData.deptId);
                }
                this.skeletonLoading = false;
            })
        },
        //获取决策配置
        bizDecisionGet(val){
          let paramter ={
            bizPoint:'HOUSE_RULE',
            mark:'HOUSE_STRONG_ASSOCIATION_ASSETS',
            module:'HOUSE',
            deptId:val,
          };
          bizDecisionGet(paramter).then(res=>{
            if(res.data&&res.data.onOff==1){
              this.configRelationFlag = true;
            }
            else{
              this.configRelationFlag = false;
            }
          });
        },
        getPermission(){
          //按钮权限处理
          JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
            if (value.mark == "mk_contract_reserve_ck"){
              this.permission.reserveFlag = true;
            }
            if(value.mark == "mk_contract_tenant_ck"){
              this.permission.tenantContractFlag = true;
            }
            if(value.mark == "mk_contract_owner_ck"){
              this.permission.ownerContractFlag = true;
            }
            if(value.mark == "mk_finance_bill_ck"){
              this.permission.billFlag = true;
            }
            if(value.mark == "mk_workorder_repair_ck"){
              this.permission.repairFlag = true;
            }
            if(value.mark == "mk_workorder_clean_ck"){
              this.permission.cleanFlag = true;
            }
            if(value.mark == "mk_workorder_distribution_ck"){
              this.permission.distributionFlag = true;
            }
            if(value.mark == "mk_smartDevices_doorLoc_ck"){
              this.permission.lockFlag = true;
            }
            if(value.mark == "mk_smartDevices_electric_ck"||value.mark == "mk_smartDevices_water_ck"){
              this.permission.eletricMoreFlag = true;
            }
          });
          this.markList = allMarkList;
          let temp = [];
          if(this.roomData.status!=8){
            JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
              if (value.mark == "mk_contract_tenant_tjht"||value.mark == "mk_contract_reserve_tjyd"||value.mark == "mk_finance_bill_tjzd"
                  ||value.mark == "mk_contract_owner_tjht"||value.mark == "mk_house_index_gbfy"||value.mark == "mk_house_index_scfy"){
                temp.push(value.mark);
              }
            });
          }
          let markListTemp = [];
          this.markList.forEach((item)=>{
            if(temp.indexOf(item) > -1){
              markListTemp.push(item)
            }
          });
          this.outterMarkList = [];
          this.innerMarkList = [];
          if(markListTemp.length>4){
            this.showMoreOperate = true;
            for (let i = 0; i < markListTemp.length; i++) {
              if(i>2){
                this.innerMarkList.push(markListTemp[i]);
              }
              else{
                this.outterMarkList.push(markListTemp[i]);
              }
            }
          }
          else{
            this.showMoreOperate = false;
            this.outterMarkList = markListTemp;
            this.innerMarkList = [];
          }
        },
        // 获取字典
        getDictionaryList() {
            // 特色
            PublicAPI.getTagDictionary().then(res => {
                // console.log(res)
                if (res.code == 200) {
                    this.houseTagConfig = res.data;
                }
            })
        },
        getCity() {
            PublicAPI.getCityList().then(res => {
                // console.log(res)
                if (res.code == 200){
                    this.cityList = res.data;
                    this.roomData.cityId = this.cityList[0].id
                }

            })
        },
        changeActiveKey(val,typeName,defaultActive){
          if(this.activekey == val){
            return ;
          }
          if(typeName =='electricMore_e'){
            this.electricMoreDefaultActiveIndex = defaultActive;
          }
          else if(typeName =='electricMore_w'){
            if(defaultActive==1){
              this.electricMoreDefaultActiveIndex = 2;
            }
            else if(defaultActive==2){
              this.electricMoreDefaultActiveIndex = 4;
            }
          }
          this.handleCallback(val);
        },
        handleCallback(val) {
            this.activekey = val;
            if(this.activekey == 2){
                this.destineInfoFlag = true;
                this.tenantInfoFlag = false;
                this.ownerInfoFlag = false;
                this.billInfoFlag = false;
                this.repairInfoFlag = false;
                this.cleanInfoFlag = false;
                this.distributionInfoFlag = false;
                this.lockInfoFlag = false;
                this.electricMoreInfoFlag = false;
            }
            else if(this.activekey == 3){
                this.destineInfoFlag = false;
                this.tenantInfoFlag = true;
                this.ownerInfoFlag = false;
                this.billInfoFlag = false;
                this.repairInfoFlag = false;
                this.cleanInfoFlag = false;
                this.distributionInfoFlag = false;
              this.lockInfoFlag = false;
              this.electricMoreInfoFlag = false;
            }
            else if(this.activekey == 4){
                this.destineInfoFlag = false;
                this.tenantInfoFlag = false;
                this.ownerInfoFlag = true;
                this.billInfoFlag = false;
                this.repairInfoFlag = false;
                this.cleanInfoFlag = false;
                this.distributionInfoFlag = false;
              this.lockInfoFlag = false;
              this.electricMoreInfoFlag = false;
            }
            else if(this.activekey == 5){
                this.destineInfoFlag = false;
                this.tenantInfoFlag = false;
                this.ownerInfoFlag = false;
                this.billInfoFlag = true;
                this.repairInfoFlag = false;
                this.cleanInfoFlag = false;
                this.distributionInfoFlag = false;
              this.lockInfoFlag = false;
              this.electricMoreInfoFlag = false;
            }
            else if(this.activekey == 6){
                this.destineInfoFlag = false;
                this.tenantInfoFlag = false;
                this.ownerInfoFlag = false;
                this.billInfoFlag = false;
                this.repairInfoFlag = true;
                this.cleanInfoFlag = false;
                this.distributionInfoFlag = false;
              this.lockInfoFlag = false;
              this.electricMoreInfoFlag = false;
            }
            else if(this.activekey == 7){
                this.destineInfoFlag = false;
                this.tenantInfoFlag = false;
                this.ownerInfoFlag = false;
                this.billInfoFlag = false;
                this.repairInfoFlag = false;
                this.cleanInfoFlag = true;
                this.distributionInfoFlag = false;
              this.lockInfoFlag = false;
              this.electricMoreInfoFlag = false;
            }
            else if(this.activekey == 8){
                this.destineInfoFlag = false;
                this.tenantInfoFlag = false;
                this.ownerInfoFlag = false;
                this.billInfoFlag = false;
                this.repairInfoFlag = false;
                this.cleanInfoFlag = false;
                this.distributionInfoFlag = true;
              this.lockInfoFlag = false;
              this.electricMoreInfoFlag = false;
            }
            else if(this.activekey == 9){
              this.destineInfoFlag = false;
              this.tenantInfoFlag = false;
              this.ownerInfoFlag = false;
              this.billInfoFlag = false;
              this.repairInfoFlag = false;
              this.cleanInfoFlag = false;
              this.distributionInfoFlag = false;
              this.lockInfoFlag = true;
              this.electricMoreInfoFlag = false;
            }
            else if(this.activekey == 10){
              this.destineInfoFlag = false;
              this.tenantInfoFlag = false;
              this.ownerInfoFlag = false;
              this.billInfoFlag = false;
              this.repairInfoFlag = false;
              this.cleanInfoFlag = false;
              this.distributionInfoFlag = false;
              this.lockInfoFlag = false;
              this.electricMoreInfoFlag = true;
            }
        },
        selectCity(val) {
            this.roomData.cityId = val;
            this.roomData.communityName = undefined;
        },
        selectCommunity(searchVal) {
            this.searchCommunityVal = searchVal == '' ? undefined : searchVal;
            PublicAPI.searchCommunity(this.roomData.cityId, this.searchCommunityVal).then(res => {
                // console.log(res)
                this.communityList = res.data;
            })
        },
        getCommunity(communityId) {
            this.roomData.communityId = communityId;
        },
        openAll(){
            // console.log(this.roomData)
            let that = this;
            let housePid = this.roomData.housePid;
            let title = '确定激活房源'+ this.roomData.fullAddress +'吗？'
            let sendData = {
                housePid: housePid,
                op: 1
            }
            this.$modal.confirm({
                title: title,
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    shareAPI.openCloseAllHouse(sendData).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            that.$emit('refreshinfoFun', true);
                            that.$message.info('激活成功！');
                            that.getWholeHouseData();
                        }
                    })
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        closeAll(){
            // console.log(this.roomData)
            let that = this;
            let housePid = this.roomData.housePid;
            let title = '确定关闭房源'+ this.roomData.fullAddress +'吗？'
            let sendData = {
                housePid: housePid,
                op: 2
            }
            this.$modal.confirm({
                title: title,
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    shareAPI.openCloseAllHouse(sendData).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            that.$emit('refreshinfoFun', true);
                            that.$message.info('关闭成功！');
                            that.getWholeHouseData();
                        }
                    })
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        deleteHouse() {
            let that = this;
            this.$modal.confirm({
                title: '确定删除此房源吗？',
                content: '',
                okText: '确定',
                cancelText: '取消',
                width: '440px',
                onOk() {
                    PublicAPI.deleteHouse(that.roomTitle.houseId).then(res => {
                      if (res.code == 200) {
                        that.$message.success('删除成功！');
                        that.$emit('deleteSuccess');
                      }

                    }, error => {
                        that.$message.info('删除失败！');
                    })
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        save() {
            let sendData = JSON.parse(JSON.stringify(this.roomData))
            sendData.actualPrice = Math.round(this.actualPrice*100);
            sendData.roomPicIdList = sendData.picList;
            delete sendData.createTime;
            delete sendData.creater;
            delete sendData.updateTime;
            delete sendData.updater;
            API.editHouse(sendData).then(res=>{
                if (res.code == 200){
                    this.$emit('refreshinfoFun', true);
                    this.$message.info('保存成功！');
                    this.getWholeHouseData();
                }
            })
        },
        addTenantContract() {
            this.$modal.destroyAll();
            this.addTenantContractDialog = true;
        },
        addOwnerContract() {
            this.addOwnerContractDialog = true;
        },
        cancelSaveTenantContract(){
            this.addTenantContractDialog = false;
        },
        initTenantContract(val){
            this.tenantContractId = val.id;
        },
        initOwnerContract(val){
            this.ownerContractId = val;
        },
        addTenantContractSuccess(res) {
            if (res) {
                this.addTenantContractDialog = false;
                this.$emit('refreshinfoFun', true);
                let _this = this;
                setTimeout(function() {
                    _this.getWholeHouseData();
                    _this.handleCallback(_this.activekey);
                    _this.$refs.tenantInfo&&_this.$refs.tenantInfo.getInfo();
                }, 500);

            }
        },
        cancelSaveOwnerContract(){
            this.addOwnerContractDialog = false;
        },
        addOwnerContractSuccess(res) {
            if (res) {
                this.addOwnerContractDialog = false;
                this.$emit('refreshinfoFun', true);
                let _this = this;
                setTimeout(function() {
                    _this.getWholeHouseData();
                    _this.handleCallback(_this.activekey);
                    _this.$refs.ownerInfo&&_this.$refs.ownerInfo.getInfo();
                }, 500);

            }
        },
        addSaveSuccessBill(res){
           if (res) {
                this.addBillDialog = false;
               this.$emit('refreshinfoFun', true);
                let _this = this;
                setTimeout(function() {
                    _this.getWholeHouseData();
                    _this.handleCallback(_this.activekey);
                    _this.$refs.billInfo.getInfo();
                }, 500);

            }
        },
        addSaveSuccessRepair(res){
            if (res) {
                this.addRepairDialog = false;
                this.$emit('refreshinfoFun', true);
                let _this = this;
                setTimeout(function() {
                    _this.getWholeHouseData();
                    _this.handleCallback(_this.activekey);
                    _this.$refs.repairInfoWhole&&_this.$refs.repairInfoWhole.getInfo();
                }, 500);

            }
        },
        addSaveSuccessClean(res){
            if (res) {
                this.addCleanDialog = false;
                this.$emit('refreshinfoFun', true);
                let _this = this;
                setTimeout(function() {
                    _this.getWholeHouseData();
                    _this.handleCallback(_this.activekey);
                    _this.$refs.cleanInfoWhole&&_this.$refs.cleanInfoWhole.getInfo();
                }, 500);

            }
        },
        addSaveSuccessDistribution(res){
            if (res) {
                this.addDistributionDialog = false;
                this.$emit('refreshinfoFun', true);
                let _this = this;
                setTimeout(function() {
                    _this.getWholeHouseData();
                    _this.handleCallback(_this.activekey);
                    _this.$refs.distributionInfoWhole&&_this.$refs.distributionInfoWhole.getInfo();
                }, 500);

            }
        },
        addReserveSuccess(res) {
            //预定添加成功
            if (res) {
                this.addReserveDialog = false;
                this.$emit('refreshinfoFun', true);
                let _this = this;
                setTimeout(function () {
                    _this.getWholeHouseData();
                    _this.handleCallback(_this.activekey);
                    _this.$refs.destineInfo && _this.$refs.destineInfo.getInfo();
                }, 500);
            }
        },
        addReserve(){
          this.addReserveDialog = true;
        },
        handleCancel() {
            this.addTenantContractDialog = false;
        },
        selectDept(selectObj){
          if (selectObj.type == 'dept') {
            this.roomData.deptId = selectObj.id;
            this.roomData.deptName = selectObj.name;
          }
          if(!selectObj.type&&!selectObj.name){
            this.roomData.deptId = '';
            this.roomData.deptName = '';
          }
        },
        selectDeptEmp(selectObj) {
            if (selectObj.type == 'employee') {
                this.roomData.maintainerId = selectObj.id;
                this.roomData.maintainerName = selectObj.name;
            }
          if(!selectObj.type&&!selectObj.name){
            this.roomData.maintainerId = '';
            this.roomData.maintainerName = '';
          }
        },
        openDetail(res){
          if(res){
            this.reserveId = res;
            this.reserveDetailDialog = true;
          }
        },
        openDetailTenant(res){
           if(res){
              this.tenantContractId = res;
              this.lookTenantDialog = true;
           }
        },
        openDetailOwner(res,auditInstanceId){
           if(res){
               this.ownerContractId = res;
               this.lookOwnerDialog = true;
               this.auditInstanceId = auditInstanceId;
           }
        },
        openDetailBill(res){
          if(res){
            this.billId = res;
            this.billDetailDialog = true;
          }
        },
        openDetailRepair(res){
            if(res){
                this.repairId = res;
                this.repairDetailDialog = true;
            }
        },
        openDetailClean(res){
            if(res){
                this.cleanId = res;
                this.cleanDetailDialog = true;
            }
        },
        openDetailDistribution(res){
            if(res){
                this.distributionId = res;
                this.distributionDetailDialog = true;
            }
        },
        reserveIdFun(res){
          if(res){
            this.reserveId = res;
          }
        },
        addContractIng(res) {
            if (res) {
                this.reserveDetailDialog = false;
                this.$emit('refreshinfoFun', true);
                getReserveInfo(this.reserveId).then(res => {
                    if (res.code === "200") {
                        this.reserveData = res.data;
                        this.reserveFul = true;
                        this.addTenantContractDialog = true;
                    }
                })
            }
        },
        deleteSuccess(res) {
            if (res) {
                this.reserveDetailDialog = false;
                this.$emit('refreshinfoFun', true);
                let _this = this;
                setTimeout(function() {
                    _this.$refs.destineInfo.getInfo()
                }, 500);
            }
        },
        downDetail(){
            this.reserveDetailDialog = false;
            if(this.isRefresh){
              this.getWholeHouseData();
              this.isRefresh = false;
            }
            this.$refs.destineInfo.getInfo()
        },
        deleteOk(res) {
            if (res) {
                this.lookTenantDialog = false;
                this.lookOwnerDialog = false;
                this.$emit('refreshinfoFun', true);
                this.getWholeHouseData();
                this.isRefresh = false;
                let _this = this;
                setTimeout(() => {
                    _this.$refs.tenantInfo.getInfo();
                }, 500)
            }
        },
        deleteOkOwner(res) {
            if (res) {
                this.lookTenantDialog = false;
                this.lookOwnerDialog = false;
                this.$emit('refreshinfoFun', true);
                this.getWholeHouseData();
                this.isRefresh = false;
                let _this = this;
                setTimeout(() => {
                    _this.$refs.ownerInfo.getInfo()
                }, 500)
            }
        },
        cancelTenantDetail() {
            this.lookTenantDialog = false;
            let _this = this;
            if(this.isRefresh){
              this.getWholeHouseData();
              this.isRefresh = false;
            }
            setTimeout(() => {
                _this.$refs.tenantInfo.getInfo()
            }, 500)
            // this.saveHouseDetail();
        },
        cancelOwnerDetail() {
            this.lookOwnerDialog = false;
            let _this = this;
            if(this.isRefresh){
              this.getWholeHouseData();
              this.isRefresh = false;
            }
            setTimeout(() => {
                _this.$refs.ownerInfo.getInfo()
            }, 500)
            // this.saveHouseDetail();
        },
        cancelBillDetail(){
            this.billDetailDialog = false;
            let _this = this;
            if(this.isRefresh){
              this.getWholeHouseData();
              this.isRefresh = false;
            }
            setTimeout(() => {
                _this.$refs.billInfo.getInfo()
            }, 500)
        },
        cancelRepairDetail(){
            this.repairDetailDialog = false;
            let _this = this;
            setTimeout(() => {
                _this.$refs.repairInfoWhole.getInfo()
            }, 500)
        },
        cancelCleanDetail(){
            this.cleanDetailDialog = false;
            let _this = this;
            setTimeout(() => {
                _this.$refs.cleanInfoWhole.getInfo()
            }, 500)
        },
        cancelDistributionDetail(){
            this.distributionDetailDialog = false;
            let _this = this;
            if(this.isRefresh){
              this.getWholeHouseData();
              this.isRefresh = false;
            }
            setTimeout(() => {
                _this.$refs.distributionInfoWhole.getInfo()
            }, 500)
        },
        addBill() {
            this.addBillDialog = true;
        },
        addRepair() {
            this.addRepairDialog = true;
        },
        addClean() {
            this.addCleanDialog = true;
        },
        addDistribution() {
            this.addDistributionDialog = true;
        },
        updateRoomInfoEdit(){
            this.roomInfoEdit = true;
            this.gasTypeFlag = this.copyRoomData.gasType == 1?true:false;
            this.changeTagCheckAll();
        },
        cancelRoomInfoEdit(){
            this.roomInfoEdit = false;
            if(this.refreshConfig&&this.configRelationFlag){
              this.getWholeHouseData();
              this.refreshConfig = false;
            }
        },
        saveRoomInfoEdit(){
            //保存房间信息
            let sendData = JSON.parse(JSON.stringify(this.roomData));
            if(this.configRelationFlag){
              delete sendData.roomGoodsList;
            }
            else{
              if(this.$refs.viewConfig){
                let roomGoodsList = [];
                this.$refs.viewConfig.showPublicConfig.forEach((item)=>{
                  if(item.quantity>0&&item.checked==true){
                    roomGoodsList.push(item)
                  }
                });
                sendData.roomGoodsList = roomGoodsList;
              }
            }
            sendData.actualPrice = Math.round(this.actualPrice*100);
            sendData.gasType = this.gasTypeFlag?1:2;
            delete sendData.createTime;
            delete sendData.creater;
            delete sendData.updateTime;
            delete sendData.updater;
            decentralizedAPI.houseWholeBasicEdit(sendData).then(res => {
                if (res.code == 200){
                    this.$emit('refreshinfoFun', true);
                    this.$message.info('房间信息修改成功！');
                }else {
                    this.$message.error('房间信息修改失败！');
                }
                this.roomInfoEdit = false;
                this.getWholeHouseData();
            })
        },
        updateHousePicEdit(){
            this.housePicEdit = true;
        },
        cancelHousePicEdit(){
            this.housePicEdit = false;
        },
        saveHousePicEdit(){
            let roomPicIdList=[];
            let housePicList = [...this.$refs.housePicList.picsList];
            if(housePicList && housePicList.length > 0) {
                housePicList.forEach((val, i) => {
                    roomPicIdList.push(val.id)
                })
            }
            //修改图片
            let sendData = {
                id:this.roomTitle.houseId,
                roomPicIdList:roomPicIdList,
            };
            decentralizedAPI.houseWholePicEdit(sendData).then(res => {
                if (res.code == 200){
                    this.$emit('refreshinfoFun', true);
                    this.$message.info('图片信息修改成功！');
                }else {
                    this.$message.error('图片信息修改失败！');
                }
                this.housePicEdit = false;
                this.getWholeHouseData();
            })
        },
        updateHouseCommentEdit(){
            this.houseCommentEdit = true;
        },
        cancelHouseCommentEdit(){
            this.houseCommentEdit = false;
            this.currentClickIndex = undefined;
        },
        saveHouseCommentEdit(){
            this.currentClickIndex = undefined;
            //修改备注
            let sendData = {
                id:this.roomTitle.houseId,
                comment:this.roomData.comment,
                lableList:this.roomData.lableList,
            };
            API.houseWholeCommentEdit(sendData).then(res => {
                if (res.code === '200') {
                    this.$emit('refreshinfoFun', true);
                    this.$message.success('修改备注成功！');
                }else{
                    this.$message.error('修改备注失败！');
                }
                this.houseCommentEdit = false;
                this.getWholeHouseData();
            });
        },
        updateHouseMaintainersEdit(){
            this.houseMaintainersEdit = true;
        },
        cancelHouseMaintainersEdit(){
            this.houseMaintainersEdit = false;
            this.roomData.deptName = this.copyRoomData.deptName;
            this.roomData.maintainerName = this.copyRoomData.maintainerName;
            this.roomData.maintainerPhone = this.copyRoomData.maintainerPhone;
        },
        saveHouseMaintainersEdit(){
          if(!this.roomData.deptId){
            this.$message.warning('请选择所属门店(部门)');
            return ;
          }
            //修改维护人
            let sendData = {
                housePid:this.roomTitle.houseId,
                maintainerId:this.roomData.maintainerId,
              deptId:this.roomData.deptId,
            };
            decentralizedAPI.housePubPermissionDataEdit(sendData).then(res => {
                if (res.code === '200') {
                    this.$emit('refreshinfoFun', true);
                    this.$message.success('修改所属门店(部门)/维护人成功！');
                }else{
                    this.$message.error('修改所属门店(部门)/维护人失败！');
                }
                this.houseMaintainersEdit = false;
                this.getWholeHouseData();
            });
        },
        saveStatus() {
            let status = '';
            let vnode = '';
          if(this.activeIndex == 0){
            this.$message.warning('请选择需变更状态');
            return ;
          }
            if (this.activeIndex == 1) {
                status = '空置'
            }
            if (this.activeIndex == 3) {
                status = '已租'
                vnode = () => <div><p style='margin-top: 4px;'>你还可以添加租客合同来变更该房源状态</p><p style='margin-top: 12px;color: #0A87F8;cursor: pointer' onClick = {this.addTenantContract}>去添加租客合同<icon-font style='font-size: 16px;margin-left: 8px' type='iconyumengtubiao_zhishi' /></p></div>
            }
            if (this.activeIndex == 4) {
                status = '配置'
            }
            if (this.activeIndex == 5) {
                status = '锁房'
            }
            let that = this;

            this.$modal.confirm({
                title: '确定要将此房源状态变更为「' + status + '」状态吗？',
                content: vnode,
                okText: '确定',
                cancelText: '取消',
                width: '440px',
                onOk() {
                    API.changeStatus(that.changeStatusData.roomId, that.activeIndex).then(res => {
                        if (res.code == 200){
                            that.$emit('refreshinfoFun', true);
                            that.showChangeStatusDialog = false;
                            that.$message.info('保存成功！');
                            that.getWholeHouseData();
                        }
                    })
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        changeStatus(room) {
            this.showChangeStatusDialog = true;
            this.changeStatusData = {
                houseAlias: room.houseAlias,
                houseAddress: room.fullAddress,
                houseStatus: room.status,
                roomId: room.id,
            }
        },
    },
    filters: {
        blankVal(val){
            if(!val){
                return '-';
            }else{
                return  val;
            }
        },
        formatFileOriginName(subBizType){
          let value = '';
          if (subBizType == 3) {
            value = '卧室';
          } else if (subBizType == 4) {
            value = '客厅';
          } else if (subBizType == 5) {
            value = '厨房';
          } else if (subBizType == 6) {
            value = '卫生间';
          } else if (subBizType == 7) {
            value = '阳台';
          } else if (subBizType == 8) {
            value = '吧台';
          } else if (subBizType == 2) {
            value = '户型图';
          } else if (subBizType == 10) {
            value = '环境';
          } else if (subBizType == 11) {
            value = '其他';
          } else {
            value = '-';
          }
          return value;
        },
    },
    watch: {
        activekey(val) {
            this.handleCallback(val);
        }
    }
}
</script>

<style scoped lang="less">
.house-detail {
    padding: 10px 0 0 0;
    height: calc(100vh - 150px);
    overflow: auto;
    .top {
        padding: 0px 20px 13px 20px;
        .title {
            display: flex;
            align-items: center;
            width: 160px;
            height: 68px;
            border-right: 1px dashed @borderColor;

            .label-item {
                width: 80px;
                margin-top: 0;
            }

            .edit-status-icon {
                vertical-align: middle;
                margin-left: 8px;
                color: @themeColor;
            }
        }

        .detail {
            display: flex;
            width:960px;
            height:45px;
            flex-wrap: wrap;
            margin-top: 10px;
            margin-bottom: 25px;
            position:relative;
            .item {
                display: flex;
                align-items: center;
                width: 190px;
                padding-left: 10px;
                padding-top: 5px;
                input {
                    width: 180px;
                    padding-right: 10px;
                }

                & /deep/ .ant-select {
                    width: 180px;
                }
            }
            .edit-status-icon{
                color: #0A87F8;
            }
            .status1{
                //空置
                color: #FB4246;
                background-color: fade(#FB4246, 10%);
            }
            .status2{
                //已租
                color: #03C683;
                background-color: fade(#03C683, 10%);
            }
            .status3{
                //配置中
                color: #FFA036;
                background-color: fade(#FFA036, 10%);
            }
            .status4{
                //已关闭 //锁房
                color: #777777;
                background-color: fade(#777777, 10%);
            }
            .fontColor{
                color: #111111;
            }
        }
    }
  .quickStyle{
    margin: 0 20px 20px 20px;
    padding: 10px 10px 10px 0;
    height: 44px;
    background: #F8F9FA;
    border-radius: 4px;
    .quickItemStyle{
      padding: 0 10px;
      height: 24px;
      line-height: 24px;
      background: #FFFFFF;
      border-radius: 16px;
      margin-left: 10px;
      svg{
        margin-right: 4px;
        width: 14px;
        height: 14px;
      }
      font-size: 13px;
      color: #777777;
    }
    .errorStyle{
      color: #FB4246;
    }
    .lock-offLine{
      color: #777777;
    }
    .commonStyle{
      color: #0A87F8;
    }
    .clean{
      color: #03C683;
    }
    .distribution{
      color: #FFA036;
    }
  }
    .tabs-content {
        padding: 0 20px;
        // min-height: calc(100vh - 324px);
        .basic-info {
            .title{
                margin:8px 0 8px 0;
                font-size: 15px;
                color: #111111;
                font-weight:500;
            }
            .input-info {
                display: flex;
                flex-wrap: wrap;
                .item {
                    margin: 0 52px 20px 0;
                    width: 200px;

                    & /deep/ .title {
                        margin-bottom: 4px;
                    }

                    & /deep/ .ant-select {
                        width: 100%;
                    }
                    .address {
                        display: flex;
                        .addressHalfRadius{
                            /deep/ .ant-select-selection{
                                border-top-right-radius: 4px;
                                border-bottom-right-radius: 4px;
                            }
                        }
                    }
                    .room-img-list {
                      /deep/ video {
                        width: 172px;
                        height: 96px;
                        border-radius: 4px;
                      }
                        >div {
                            height: 116px;
                            width: 174px;
                            margin-right: 10px;
                            >div{
                                width: 100%;
                                height: 100%;
                                line-height: 116px;
                                border: 1px solid #eeeeee;
                                background-color: #f6f7f8;
                                text-align: center;
                                border-radius: 6px;
                                overflow: hidden;
                                img {
                                    width: auto;
                                    max-width: 174px;
                                    height: auto;
                                    max-height: 116px;
                                    overflow: hidden;
                                }
                            }
                        }
                        >div:last-child{
                            margin-right: 0px;
                        }
                      .pic-name{
                        padding: 0 10px;
                        max-width:100px;
                        text-align: center;
                        color: #ffffff;
                        height: 20px;
                        line-height: 20px;
                        background:rgba(0,0,0,0.6);
                        border-radius:5px 0px 5px 0px;
                      }
                    }
                    .promotionDesc{
                        /deep/ .ant-input{
                            border-bottom:none !important;
                        }
                    }
                }
                .public-config {
                    display: flex;
                    flex-wrap: wrap;

                    label {
                        width: 100px;
                        margin: 5px 0 5px 0;
                        padding: 0;
                    }
                }
                .tagStyle{
                    color: #409eff !important;
                    border-radius: 3px;
                    font-size: 12px;
                    padding: 1px 5px;
                    border: 0.5px solid #409eff !important;
                    margin-right: 6px;
                }
                .configStyle{
                    color: #FAAA31 !important;
                    border-radius: 3px;
                    font-size: 12px;
                    padding: 1px 5px;
                    border: 0.5px solid #FAAA31 !important;
                    margin-right: 6px;
                    margin-bottom: 6px;
                }
                .checkAllStyle{
                    position: absolute;
                    left: 0px;
                    top: 5px;
                    font-size: 16px;
                }
                .titleStyle{
                  font-size: 12px;
                  color: #111111;
                }
            }
            .deptStyle{
            /deep/ .ant-input{
              padding-left: 0;
            }
          }
            .promotionDesc{
              /deep/ .ant-input{
                border-bottom:none !important;
              }
            }
            .itemLableStyle{
              color: #111111;
              font-size: 12px;
              background: #F0F8FF;
              border-radius:4px;
              height: 22px;
              line-height: 23px;
              padding: 0 5px;
              margin-right: 5px;
            }
            .poperLabelStyle2{
              position: absolute;
              padding: 10px 10px 10px 10px;
              width:956px;
              min-height:60px;
              top:-20px;
              background:rgba(255,255,255,1);
              box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1);
              border-radius:4px;
              border:1px solid rgba(238,238,238,1);
              z-index: 99;
            }
            .selectDemandLabelItem{
              height: 24px;
              line-height: 24px;
              padding: 0 5px;
              font-size: 12px;
              color: #111111;
              border-radius:4px;
              margin-top: 8px;
              margin-right: 5px;
              text-align:center;
              background:#F0F8FF;
            }
        }
    }
    .bgColorStyle{
        background:rgba(244,245,247,1);
    }
    .animate-box{
        flex-wrap: wrap;
        animation: skeleton-blink 1.2s ease infinite;
        -webkit-animation: skeleton-blink 1.2s ease infinite;
        background-image: -webkit-gradient(linear, left top, right top, color-stop(25%, #f0f0f0), color-stop(37%, #e3e3e3), color-stop(63%, #f0f0f0));
        background-image: -o-linear-gradient(left, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
        background-image: linear-gradient(90deg, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
        background-size: 400% 100%;
    }
    @-webkit-keyframes skeleton-blink {
        0% {
            background-position: 100% 50%
        }

        to {
            background-position: 0 50%
        }
    }
    @keyframes skeleton-blink {
        0% {
            background-position: 100% 50%
        }

        to {
            background-position: 0 50%
        }

    }
    & /deep/ .ant-input,
    .ant-select,
    .ant-select-dropdown {
        font-size: 12px;
        height: 24px;
        color: @mainFontColor;
    }
    & /deep/ .ant-input{
        padding-left: 4px;
    }
    /deep/ .ant-checkbox-wrapper{
        font-size: 12px;
        color: @mainFontColor;
    }
    & /deep/ .ant-select-selection__rendered,
    & /deep/ .ant-select-selection--single {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
    }

    & /deep/ .ant-select-dropdown-menu {
        font-size: 12px;
    }

    & /deep/ .label-item .addon-after {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
    }
    & /deep/ .ant-tabs-top-content {
        font-size: 12px;
        color: @mainFontColor;
    }
    & /deep/ .ant-tabs-nav .ant-tabs-tab {
        margin: 0 30px 0 0;
        padding: 8px 0;
    }
    & /deep/ .ant-tabs-nav .ant-tabs-tab .anticon{
        margin-right: 4px;
    }
    /deep/ .ant-tabs-nav-container-scrolling{
        width: 580px;
    }
}
.addon-after-position {
    position: absolute;
    top: 4px;
    z-index: 2;
    font-size: 12px;
}

.status-tags {
    padding: 6px 18px;
    margin-right: 10px;
    border-color: @borderColor !important;
    color: @mainFontColor !important;
    cursor: pointer;
    font-size: 14px;
}
.houseAlias{
    padding: 2px 4px;
}
.active {
    border-color: @themeColor !important;
    color: @themeColor !important;
}
.bottom {
    margin-top: 20px;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-top: 1px dashed #DDDDDD;
    color: @secondaryFontColor;

    span:first-child {
        display: inline-block;
        margin-right: 20px;
        padding-right: 20px;
        height: 20px;
        line-height: 20px;
        border-right: 1px dashed #DDDDDD;
    }
}

.radius-font-big {
    width: 44px;
    height: 44px;
    line-height: 44px;
    & /deep/  svg{
        width:28px;
        height: 28px;
        margin-top: 8px;
    }
}
.radius-font-small{
    width: 32px;
    height: 32px;
    line-height: 32px;
    & /deep/  svg{
        width:18px;
        height: 16px;
    }
}

.radius-font {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    color: #FFA036;
    text-align: center;
    background-color: fade(#FFA036, 10%);
    border-radius: 50%;
}

.radius-font-person {
    color: #0A87F8;
    background-color: fade(#0A87F8, 10%);
}
.radius-font-time {
    color: #FC585C;
    background-color: fade(#FC585C, 10%);
}
.radius-font-area {
    color: #03C683;
    background-color: fade(#03C683  , 10%);
}
.radius-font-house {
    color: #FFA036;
    background-color: fade(#FFA036  , 10%);
}
.sixLength{
    & /deep/ .ant-popover {
        position: fixed;
        .ant-popover-inner-content {
            padding: 5px 0;
            width: 120px;
            .action {
                color: #111111;
                width: 100%;
                height: 36px;
                line-height: 36px;
            }
            .action:hover {
                color: #0a87f8;
                cursor: pointer;
                background: rgba(10, 135, 248, 0.1);
            }
        }
    }
}
.normalLength{
    & /deep/ .ant-popover {
        position: fixed;
        .ant-popover-inner-content {
            padding: 5px 0;
            width: 90px;
            .action {
                color: #111111;
                width: 100%;
                height: 36px;
                line-height: 36px;
            }
            .action:hover {
                color: #0a87f8;
                cursor: pointer;
                background: rgba(10, 135, 248, 0.1);
            }
        }
    }
}
.tabs-options {
    font-size: 0;
    cursor: pointer;
    div {
        display: inline-block;
        font-size: 14px;
        color: #0a87f8;

        span {
            margin-right: 14px;
        }
    }

    div:last-child {
        span {
            margin-right: 0;
        }
    }

    &>span {
        display: inline-block;
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        border: 1px solid #DDDDDD;
        background-color: #F6F7F8;
        border-radius: 4px;
    }

    &>span:last-child {
        margin-left: 10px;
        border: 1px solid #0a87f8;
        background-color: #0a87f8;
        color: #ffffff;
    }
}
.tabs-options-top{
    .opt-item{
        .item{
            font-size: 12px;
            color: #777777;
            height: 24px;
            line-height: 24px;
            cursor: pointer;
        }
    }
}
.houseAliasStyle{
    color: #409eff !important;
    border-radius: 3px;
    font-size: 16px;
    margin-right: 6px;
    padding: 3px 5px;
    background-color: #f0f8ff;
}
</style>
