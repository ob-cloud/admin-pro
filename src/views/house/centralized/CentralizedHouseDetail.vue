<template>
  <div>
    <div class="child-detail">
      <div class="top f-clearfix">
        <div class="detail">
          <div class="item" style="border-right: 1px dashed #DDDDDD;width: 175px;padding-left: 12px;margin-top: 5px;margin-right: 25px;">
            <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
            <span style="margin-top: 7px;" v-if="(roomData.status==1||roomData.status==2)&&!skeletonLoading" class="radius-font status1 radius-font-big"><icon-font type="icon-yumengtubiao_kongzhi-"></icon-font></span>
            <span style="margin-top: 7px;" v-if="roomData.status==3&&!skeletonLoading" class="radius-font status2 radius-font-big"><icon-font type="icon-yumengtubiao_yizu-"></icon-font></span>
            <span style="margin-top: 7px;" v-if="roomData.status==4&&!skeletonLoading" class="radius-font status3 radius-font-big"><icon-font type="iconyumengtubiao_peizhi"></icon-font></span>
            <span style="margin-top: 7px;" v-if="(roomData.status==5||roomData.status==6)&&!skeletonLoading" class="radius-font status4 radius-font-big"><icon-font type="iconyumengtubiao_suofang"></icon-font></span>
            <span style="margin-top: 7px;" v-if="roomData.status==8&&!skeletonLoading" class="radius-font status4 radius-font-big"><icon-font type="icon-yumengtubiao_guanbi-"></icon-font></span>
            <div>
              <label-item title="当前状态">
                <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                <div v-if="(roomData.status==1||roomData.status==2)&&!skeletonLoading">
                  <span class="fontColor">{{roomData.statusName}}</span>&nbsp;<span style="color: #FB4246;" v-if="roomData.vacantDays">({{roomData.vacantDays}}天)</span>  <icon-font v-mark="['mk_house_centralized_bgfyzt']" @click="changeStatus(roomTitle,roomData)" class="edit-status-icon" type="iconyumengtubiao_bianji-1"></icon-font>
                </div>
                <div v-if="roomData.status==3&&!skeletonLoading">
                  <span class="fontColor">{{roomData.statusName}}</span>  <icon-font v-mark="['mk_house_centralized_bgfyzt']" @click="changeStatus(roomTitle,roomData)" class="edit-status-icon" type="iconyumengtubiao_bianji-1"></icon-font>
                </div>
                <div v-if="roomData.status==4&&!skeletonLoading">
                  <span class="fontColor">{{roomData.statusName}}</span>  <icon-font v-mark="['mk_house_centralized_bgfyzt']" @click="changeStatus(roomTitle,roomData)" class="edit-status-icon" type="iconyumengtubiao_bianji-1"></icon-font>
                </div>
                <div  v-if="(roomData.status==5||roomData.status==6||roomData.status==7||roomData.status==8)&&!skeletonLoading">
                  <span class="fontColor">{{roomData.statusName}}</span>  <icon-font v-mark="['mk_house_centralized_bgfyzt']" @click="changeStatus(roomTitle,roomData)" class="edit-status-icon" type="iconyumengtubiao_bianji-1"></icon-font>
                </div>
              </label-item>
            </div>
          </div>
          <div class="item">
            <span style="margin-top: 7px;" class="radius-font radius-font-small radius-font-area"><icon-font type="icon-yumengtubiao_weixiubaojieleixing"></icon-font></span>
            <div class="">
              <label-item title="所属房型" :skeletonLoading="skeletonLoading">
                <span style="color: #111111">{{roomData.roomTypeName}}</span>
              </label-item>
            </div>
          </div>
          <div class="item" style="width: 180px;">
            <span style="margin-top: 7px;" class="radius-font radius-font-small radius-font-house"><icon-font type="icon-yumengtubiao_zujin"></icon-font></span>
            <div class="">
              <label-item title="出租价格" :skeletonLoading="skeletonLoading">
                <span style="color: #111111">{{roomData.actualPrice/100}}元/月</span>
              </label-item>
            </div>
          </div>
          <div class="item" style="width: 180px;">
            <span style="margin-top: 7px;" class="radius-font radius-font-small radius-font-time"><icon-font type="icon-yumengtubiao_shijian"></icon-font></span>
            <div class="">
              <label-item  title="看房时间" :skeletonLoading="skeletonLoading">
                <span style="color: #111111">{{roomData.viewTypeName ? roomData.viewTypeName : '随时看房'}}</span>
              </label-item>
            </div>
          </div>
          <div class="item">
            <span style="margin-top: 7px;" class="radius-font radius-font-small radius-font-person"><icon-font type="iconyumengtubiao_weifenpeirenyuan"></icon-font></span>
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
      <div class="tabs-content">
        <a-tabs size="small" defaultActiveKey="1" v-model="activekey" @change="handleCallback">
          <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_jibenxinxi" />基本信息
                        </span>
            <div class="basic-info">
              <div class="titleDiv clearfix">
                <div class="title f-fl">房间信息</div>
                <div class="cursor f-fr" style="color: #0A87F8;" @click="updateRoomInfoEdit" v-if="!roomInfoEdit" v-mark="['mk_house_centralized_bjfyxx']">
                  <icon-font class="editStyle" type="iconyumengtubiao_bianji-1" />
                </div>
                <div class="tabs-options f-fr" v-if="roomInfoEdit">
                  <span @click="cancelRoomInfoEdit" style="color: rgba(0, 0, 0, 0.65);line-height: 22px;">取消</span>
                  <span @click="saveRoomInfoEdit" style="line-height: 22px;">保存</span>
                </div>
              </div>
              <div class="input-info">
                <label-item class="item" title="房间号" :skeletonLoading="skeletonLoading">
                  <span v-show="!roomInfoEdit">{{roomData.doorplate}}</span>
                  <a-input v-show="roomInfoEdit" v-model="roomData.doorplate" placeholder="请输入"/>
                </label-item>
                <label-item class="item" title="朝向" :skeletonLoading="skeletonLoading">
                  <span v-show="!roomInfoEdit">{{roomData.orientationName}}</span>
                  <a-select v-show="roomInfoEdit" v-model="roomData.orientation" placeholder="请选中">
                    <a-select-option :value="1">东</a-select-option>
                    <a-select-option :value="2">南</a-select-option>
                    <a-select-option :value="3">西</a-select-option>
                    <a-select-option :value="4">北</a-select-option>
                    <a-select-option :value="5">南北</a-select-option>
                  </a-select>
                </label-item>
                <label-item class="item" title="面积" :skeletonLoading="skeletonLoading">
                  <span v-show="!roomInfoEdit">{{roomData.houseArea?roomData.houseArea+'㎡':'-'}}</span>
                  <a-input v-show="roomInfoEdit" v-model="roomData.houseArea" placeholder="请输入" />
                </label-item>
                <label-item class="item" title="出租价格" :skeletonLoading="skeletonLoading" style="margin-right: 0px;">
                  <span v-show="!roomInfoEdit">{{roomData.actualPrice/100}}元/月</span>
                  <label-item v-show="roomInfoEdit" addonAfter="元/月">
                    <a-input v-model="actualPrice" v-validate="'moneyNoDot'" placeholder="请输入"/>
                  </label-item>
                </label-item>
                <label-item class="item" title="看房时间" :skeletonLoading="skeletonLoading">
                  <span v-show="!roomInfoEdit">{{roomData.viewTypeName?roomData.viewTypeName : '随时看房'}}</span>
                  <label-item v-show="roomInfoEdit">
                    <a-select v-model="roomData.viewType" placeholder="请选择">
                      <a-select-option :value="1">随时看房</a-select-option>
                      <a-select-option :value="2">提前预约</a-select-option>
                    </a-select>
                  </label-item>
                </label-item>
                <label-item class="item" title="房间核验码" :skeletonLoading="skeletonLoading">
                  <span v-show="!roomInfoEdit">{{roomData.checkCode|blankVal}}</span>
                  <a-input v-show="roomInfoEdit" v-model="roomData.checkCode" maxlength="30" placeholder="请输入"/>
                </label-item>
                <label-item v-show="!roomInfoEdit" class="item u-no-border clearfix" style="width: 100%;margin-right: 0px;position: relative;" title="房间配置" :skeletonLoading="skeletonLoading">
                  <div class="cursor" style="position: absolute;top:10px;left:70px;color: #0A87F8;" @click="goViewAssets" v-mark="['mk_assets_management_ck']"><icon-font type="iconyumengtubiao_yanjing-1" style="margin-right: 5px;"/>查看物资明细</div>
                  <span v-if="(roomData.roomGoodsList==null||roomData.roomGoodsList.length==0)" >-</span>
                  <div v-else class="configStyle f-fl" v-for="(item) in roomData.roomGoodsList" :key="item.id">{{item.name}} x {{item.quantity}}</div>
                </label-item>
                <view-config v-if="roomInfoEdit" ref="viewConfig" :configRelationFlag="configRelationFlag" :houseInfo="houseParamInfo" @refreshinfoFun="setRefreshConfig"></view-config>
                <label-item class="item" :class="roomInfoEdit?'':'u-bottom-border'" style="width: 100%;margin-bottom: 20px;position: relative;margin-right: 0px;" title="房间备注" :skeletonLoading="skeletonLoading">
                  <span v-show="!roomInfoEdit&&!roomData.comment">-</span>
                  <div class="promotionDesc" v-show="!roomInfoEdit&&roomData.comment "> <a-textarea v-model="roomData.comment" maxlength="500" autosize /></div>
                  <a-textarea v-show="roomInfoEdit" style="padding-left: 4px;" v-model="roomData.comment" maxlength="500" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入备注信息" />
                  <div style="position: absolute;top:9px;left:48px;">
                    <span class="warn">(仅内部可见)</span>
                  </div>
                </label-item>
                <div class="divider"></div>
              </div>
              <div class="titleDiv clearfix" style="margin: 15px 0;">
                <span class="title f-fl">所属房型：</span>
                <span class="f-fl" v-show="!roomTypeEdit" style="height: 22px;line-height: 22px;font-size: 14px;" >{{roomData.roomTypeName}}</span>
                <a-select class="f-fl" v-show="roomTypeEdit" v-model="roomData.roomTypeId">
                  <a-select-option v-for="(item) in roomTypeListData"  :key="item.id">{{ item.name }}</a-select-option>
                </a-select>
                <div class="cursor f-fr" style="color: #0A87F8;" @click="updateRoomTypeEdit" v-if="!roomTypeEdit" v-mark="['mk_house_centralized_bjfyxx']">
                  <icon-font class="editStyle" type="iconyumengtubiao_bianji-1" />
                </div>
                <div class="tabs-options f-fr" v-if="roomTypeEdit">
                  <span @click="cancelRoomTypeEdit" style="color: rgba(0, 0, 0, 0.65);line-height: 22px;">取消</span>
                  <span @click="saveRoomTypeEdit" style="line-height: 22px;">保存</span>
                </div>
              </div>
              <div class="input-info">
                <div class="divider"></div>
              </div>
              <div class="titleDiv clearfix" style="margin-top: 21px;">
                <span class="title f-fl">房型信息</span>
                <a-icon class="f-fl" type="exclamation-circle" style="color: #FFA036;width: 12px;height: 12px;margin-top: 5px;" />
                <span class="warn f-fl" style="color: #FFA036;height: 22px;line-height: 22px;">修改房型信息会自动修改属于该房型的所有房间信息哦~请谨慎修改!</span>
                <div class="cursor f-fr" style="color: #0A87F8;" @click="updateRoomTypeInfoEdit" v-if="!roomTypeInfoEdit" v-mark="['mk_house_centralized_bjfyxx']">
                  <icon-font class="editStyle" type="iconyumengtubiao_bianji-1" />
                </div>
                <div class="tabs-options f-fr" v-if="roomTypeInfoEdit">
                  <span @click="cancelRoomTypeInfoEdit" style="color: rgba(0, 0, 0, 0.65);line-height: 22px;">取消</span>
                  <span @click="saveRoomTypeInfoEdit" style="line-height: 22px;">保存</span>
                </div>
              </div>
              <div class="input-info">
                <label-item class="item" title="户型信息" :skeletonLoading="skeletonLoading">
                  <span v-show="!roomTypeInfoEdit">{{roomData.room}}室{{roomData.livingRoom}}厅{{roomData.kitchen}}厨{{roomData.toilet}}卫</span>
                  <label-item v-show="roomTypeInfoEdit">
                    <a-input-group compact style="position: relative;width: 203px">
                      <a-input v-model="roomData.room" style=" width: 25%;" />
                      <span class="addon-after-position" style="left: calc(25% - 20px);">室</span>
                      <a-input v-model="roomData.livingRoom" style=" width: 25%;" />
                      <span class="addon-after-position" style="left: calc(50% - 20px);">厅</span>
                      <a-input v-model="roomData.kitchen" style=" width: 25%;" />
                      <span class="addon-after-position" style="left: calc(75% - 20px);">厨</span>
                      <span class="addon-after-position" style="left: calc(100% - 20px);">卫</span>
                      <a-input v-model="roomData.toilet" style=" width: 25%;" />
                    </a-input-group>
                  </label-item>
                </label-item>
                <label-item class="item" title="装修信息" :skeletonLoading="skeletonLoading">
                  <span v-show="!roomTypeInfoEdit">{{roomData.decorationTypeName}}</span>
                  <a-select v-show="roomTypeInfoEdit" v-model="roomData.decorationType">
                    <a-select-option :value="2">精装</a-select-option>
                    <a-select-option :value="4">毛坯</a-select-option>
                    <a-select-option :value="3">简装</a-select-option>
                    <a-select-option :value="1">豪华装</a-select-option>
                  </a-select>
                </label-item>
                <label-item class="item" title="短租信息" :skeletonLoading="skeletonLoading">
                  <span v-show="!roomTypeInfoEdit">{{roomData.isShortRent ? '可短租' : '不可短租'}}</span>
                  <a-checkbox v-show="roomTypeInfoEdit" :checked="roomData.isShortRent ? true : false" style="margin-top: 4px" @change="roomData.isShortRent = !roomData.isShortRent">可短租</a-checkbox>
                </label-item>
                <label-item v-show="!roomTypeInfoEdit" class="item u-no-border clearfix" style="width: 100%" title="房型特色" :skeletonLoading="skeletonLoading">
                  <span v-if="(roomData.tagList==null||roomData.tagList.length==0)">-</span>
                  <div v-else class="tagStyle f-fl" v-for="(item,i) in roomData.tagList" :key="i">{{item}}</div>
                </label-item>
                <label-item v-show="roomTypeInfoEdit" class="item u-no-border clearfix" style="width: 100%" title="--  -" :skeletonLoading="skeletonLoading">
                  <div class="checkAllStyle">
                    <a-checkbox @change="value => checkAllTag(value)" v-model="tagCheckAll">房型特色</a-checkbox>
                  </div>
                  <a-checkbox-group v-show="roomTypeInfoEdit" class="public-config" v-model="roomData.tagList" @change="changeTagCheckAll()">
                    <a-checkbox :value="item.name" v-for="(item,i) in houseTagConfig" :key="i">{{item.name}}</a-checkbox>
                  </a-checkbox-group>
                </label-item>
                <label-item v-show="!roomTypeInfoEdit" class="item u-no-border clearfix" style="width: 100%;margin-right: 0px;" title="配置模板" :skeletonLoading="skeletonLoading">
                  <span v-if="(roomData.roomTypeConfigList==null||roomData.roomTypeConfigList.length==0)">-</span>
                  <div v-else class="configStyle f-fl" v-for="(item,i) in roomData.roomTypeConfigList" :key="i">{{item.name}} x {{item.quantity}}</div>
                </label-item>
                <div v-show="roomTypeInfoEdit" style="width: 100%;margin-right: 0px;">
                  <div>
                    <a-checkbox v-model="checkAll" @change="checkAllItem" :indeterminate="indeterminate" ><span class="titleStyle">配置模板</span></a-checkbox>
                  </div>
                  <div class="selectStyle clearfix">
                    <div class="f-fl clearfix item" v-for="(item,index) in showPublicConfig" :key="index">
                      <a-checkbox class="f-fl overHidde" style="width: auto;" v-model="item.checked" @change="(value)=>checkItem(value,index)"><span :class="item.checked?'selectedStyle':'unSelectStyle'">{{item.name}}</span></a-checkbox>
                      <div v-if="item.checked" class="f-fl" style="height: 28px;line-height: 28px;margin-right: 10px;font-weight: 100;">
                        x
                      </div>
                      <div v-if="item.checked" class="clearfix f-fl u-bottom-border quantityStyle" style="max-width: 96px;">
                        <div class="f-fl cursor" style="width: 16px;" @click="reduceQuantity(item)">
                          <div class="commonStyle" :class="item.quantity==1?'unEditStyle':'editStyle'" >
                            <icon-font type="iconjian" />
                          </div>
                        </div>
                        <a-input style="width: 45px;text-align: center;color: #111111" class="f-fl" v-validate="'naturalNum|min(1)|max(99999)'" placeholder="请输入" v-model="item.quantity"></a-input>
                        <div class="f-fl cursor" style="width: 16px;" @click="plusQuantity(item)">
                          <div class="commonStyle" :class="item.quantity==99999?'unEditStyle':'editStyle'" >
                            <icon-font type="iconjia" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" title="VR看房地址" :valLength="roomTypeInfoEdit ? roomData.roomTypeVrUrl.length : 0" :maxSize="roomTypeInfoEdit ? 100 : 0" :skeletonLoading="skeletonLoading">
                  <span v-if="!roomTypeInfoEdit&&roomData.roomTypeVrUrl"><a href="javascript:void(0);" style="color: #0a87f8;text-decoration:underline;" @click="vrUrlPreview(roomData.roomTypeVrUrl)">{{roomData.roomTypeVrUrl}}</a></span>
                  <span v-if="!roomTypeInfoEdit&&!roomData.roomTypeVrUrl">-</span>
                  <a-textarea v-show="roomTypeInfoEdit" v-model="roomData.roomTypeVrUrl" maxlength="100" autosize placeholder="请输入VR看房链接地址" />
                </label-item>
                <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" title="房型介绍" :valLength="roomTypeInfoEdit ? roomData.introduction.length : 0" :maxSize="roomTypeInfoEdit ? 500 : 0" :skeletonLoading="skeletonLoading">
                  <span v-show="!roomTypeInfoEdit&&!roomData.introduction ">-</span>
                  <div class="promotionDesc" v-show="!roomTypeInfoEdit&&roomData.introduction "> <a-textarea v-model="roomData.introduction" maxlength="500" autosize /></div>
                  <a-textarea v-show="roomTypeInfoEdit" v-model="roomData.introduction" maxlength="500" autosize placeholder="请输入房型介绍" />
                </label-item>
                <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0;" :style="roomData.roomTypePicList&&roomData.roomTypePicList.length>0?'margin-bottom:10px':'margin-bottom:20px'" title="房型图片" :skeletonLoading="skeletonLoading">
                  <div v-show="!roomTypeInfoEdit" class="room-img-list f-clearfix">
                    <span v-if="!roomData.roomTypePicList||roomData.roomTypePicList.length==0">-</span>
                    <div class="f-fl cursor" v-for="(item,i) in roomData.roomTypePicList" :key="i" style="position: relative;">
                      <span class="overHidde pic-name" style="position: absolute;" v-if="(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')">{{item.subBizType|formatFileOriginName}}</span>
                      <div v-if="(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')" @click="handlePreview(roomData.roomTypePicList,i)">
                        <img v-if="GlobalConfig.ADD_WATERMARK==0" :src="item.small" alt="">
                        <img v-if="GlobalConfig.ADD_WATERMARK==1" :src="item.small.indexOf('?') != -1 ? item.small+'&x-oss-process=style/house_pic':item.small+'?x-oss-process=style/house_pic'" alt="">
                      </div>
                      <div v-if="(item.fileExt == 'mp4' || item.fileExt == 'avi' || item.fileExt == 'mov')">
                        <video :src="item.origin" controls="controls"></video>
                      </div>
                    </div>
                  </div>
                  <house-video v-show="roomTypeInfoEdit"  ref="roomDataRoomTypePicList" @deletePic="deleteRoomTypePic" :picList="roomData.roomTypePicList" :uploadParms="uploadParmsRoomType"></house-video>
                </label-item>
                <div class="divider"></div>
              </div>
              <div class="titleDiv clearfix">
                <span class="f-fl title">项目信息</span>
                <div class="cursor f-fr" style="color: #0A87F8;" @click="updateProjectInfoEdit" v-if="!projectInfoEdit" v-mark="['mk_house_centralized_bjfyxx']">
                  <icon-font class="editStyle" type="iconyumengtubiao_bianji-1" />
                </div>
                <div class="tabs-options f-fr" v-if="projectInfoEdit">
                  <span @click="cancelProjectInfoEdit" style="color: rgba(0, 0, 0, 0.65);line-height: 22px;">取消</span>
                  <span @click="saveProjectInfoEdit" style="line-height: 22px;">保存</span>
                </div>
              </div>
              <div class="input-info">
                <label-item class="item" title="房源模式" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit">{{roomData.houseBizModeName|blankVal}}</span>
                  <a-select v-show="projectInfoEdit" v-model="roomData.houseBizMode" placeholder="请选择">
                    <a-select-option :value="1">直营</a-select-option>
                    <a-select-option :value="3">加盟(全托)</a-select-option>
                    <a-select-option :value="4">加盟(半托)</a-select-option>
                    <a-select-option :value="2">代理</a-select-option>
                  </a-select>
                </label-item>
                <label-item class="item" title="项目编号" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit">{{roomData.projectNo}}</span>
                  <a-input v-show="projectInfoEdit" v-model="roomData.projectNo" />
                </label-item>
                <label-item class="item" title="项目名称" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit">{{roomData.projectName}}</span>
                  <a-input v-show="projectInfoEdit" v-model="roomData.projectName" />
                </label-item>
                <label-item class="item" title="项目地址" :skeletonLoading="skeletonLoading" style="margin-right: 0px;">
                  <span v-show="!projectInfoEdit">{{roomData.cityName}}/{{roomData.communityName}}</span>
                  <a-input-group  v-show="projectInfoEdit" compact  class="address">
                    <a-select v-model="roomData.cityId"  @change="selectCity" style="width: 37%">
                      <a-select-option :value="item.id" :key="item.id" v-for="(item) in cityList">{{ item.name }}</a-select-option>
                    </a-select>
                    <a-select
                        showSearch
                        placeholder="请输入小区地址"
                        :defaultActiveFirstOption="false"
                        :showArrow="false"
                        :filterOption="false"
                        @change="getCommunity"
                        @search="selectCommunity"
                        v-model="roomData.communityName"
                        class="addressHalfRadius"
                    >
                      <a-select-option v-for="(item) in communityList" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
                    </a-select>
                  </a-input-group>
                </label-item>
                <label-item class="item" title="楼栋信息" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit">{{roomData.buildingNo}}栋{{roomData.unit}}单元</span>
                  <label-item v-show="projectInfoEdit">
                    <a-input-group compact style="position: relative;width: 200px">
                      <a-input v-model="roomData.buildingNo" style=" width: 50%;" />
                      <span class="addon-after-position" style="left: calc(50% - 20px);">栋</span>
                      <a-input v-model="roomData.unit" style=" width: 50%;border-top-right-radius: 4px;border-bottom-right-radius: 4px;" />
                      <span class="addon-after-position" style="left: calc(100% - 30px);">单元</span>
                    </a-input-group>
                  </label-item>
                </label-item>
                <label-item class="item" title="用水" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit">{{roomData.waterTypeName|blankVal}}</span>
                  <a-select v-show="projectInfoEdit" v-model="roomData.waterType" placeholder="请选择">
                    <a-select-option :value="1">民水</a-select-option>
                    <a-select-option :value="2">商业用水</a-select-option>
                  </a-select>
                </label-item>
                <label-item class="item" title="用电" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit">{{roomData.electricityTypeName|blankVal}}</span>
                  <a-select v-show="projectInfoEdit" v-model="roomData.electricityType" placeholder="请选择">
                    <a-select-option :value="1">民电</a-select-option>
                    <a-select-option :value="2">商业用电</a-select-option>
                  </a-select>
                </label-item>
                <label-item class="item" title="燃气信息" :skeletonLoading="skeletonLoading" style="margin-right: 0px;">
                  <span v-show="!projectInfoEdit">{{roomData.gasType == 1 ? '有燃气' : '无燃气'}}</span>
                  <a-checkbox v-show="projectInfoEdit" v-model="gasTypeFlag">有燃气</a-checkbox>
                </label-item>
                <label-item class="item" title="供暖信息" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit">{{roomData.heatingTypeName|blankVal}}</span>
                  <a-select v-show="projectInfoEdit" v-model="roomData.heatingType" placeholder="请选择">
                    <a-select-option :value="0">未知</a-select-option>
                    <a-select-option :value="1">自采暖</a-select-option>
                    <a-select-option :value="2">集中供暖</a-select-option>
                  </a-select>
                </label-item>
                <label-item class="item" title="门店电话" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit">{{roomData.contactNumber|blankVal}}</span>
                  <a-input v-show="projectInfoEdit" v-model="roomData.contactNumber" placeholder="请输入" />
                </label-item>
                <label-item class="item" title="门店核验码" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit">{{roomData.projectCheckCode|blankVal}}</span>
                  <a-input v-show="projectInfoEdit" v-model="roomData.projectCheckCode" placeholder="请输入" maxlength="30" />
                </label-item>
                <label-item v-show="!projectInfoEdit" class="item u-no-border clearfix" style="width: 100%;margin-right: 0px;" title="项目特色" :skeletonLoading="skeletonLoading">
                  <span v-if="(roomData.projectConfigList==null||roomData.projectConfigList.length==0)">-</span>
                  <div v-else class="configStyle f-fl" v-for="(item) in roomData.projectConfigList" :key="item.id">{{item.name}}</div>
                </label-item>
                <label-item v-show="projectInfoEdit" class="item u-no-border clearfix" style="width: 100%;margin-right: 0px;" title="- --" :skeletonLoading="skeletonLoading">
                  <div class="checkAllStyle">
                    <a-checkbox @change="value => checkAllProjectConfig(value)" v-model="projectConfigCheckAll">项目特色</a-checkbox>
                  </div>
                  <a-checkbox-group class="public-config" v-model="roomData.projectConfigList" @change="changeProjectConfigCheckAll()">
                    <a-checkbox :value="item.id" v-for="(item,i) in centralizedHousePublicConfig" :key="i">{{item.name}}</a-checkbox>
                  </a-checkbox-group>
                </label-item>
                <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" title="项目VR地址" :valLength="projectInfoEdit ? roomData.vrUrl.length : 0" :maxSize="projectInfoEdit ? 100 : 0" :skeletonLoading="skeletonLoading">
                  <span v-if="!projectInfoEdit&&roomData.vrUrl"><a href="javascript:void(0);" style="color: #0a87f8" @click="vrUrlPreview(roomData.vrUrl)">{{roomData.vrUrl}}</a></span>
                  <span v-if="!projectInfoEdit&&!roomData.vrUrl">-</span>
                  <a-textarea v-show="projectInfoEdit" v-model="roomData.vrUrl" maxlength="100" autosize placeholder="请输入项目VR看房链接地址" />
                </label-item>
                <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" title="项目介绍" :valLength="projectInfoEdit ? roomData.projectIntro.length : 0" :maxSize="projectInfoEdit ? 500 : 0" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit&&!roomData.projectIntro ">-</span>
                  <div class="promotionDesc" v-show="!projectInfoEdit&&roomData.projectIntro "> <a-textarea v-model="roomData.projectIntro" maxlength="500" autosize /></div>
                  <a-textarea v-show="projectInfoEdit" v-model="roomData.projectIntro" maxlength="500" autosize placeholder="请输入项目介绍" />
                </label-item>
                <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" title="项目周边介绍" :valLength="projectInfoEdit ? roomData.peripheryIntro.length : 0" :maxSize="projectInfoEdit ? 500 : 0" :skeletonLoading="skeletonLoading">
                  <span v-show="!projectInfoEdit&&!roomData.peripheryIntro ">-</span>
                  <div class="promotionDesc" v-show="!projectInfoEdit&&roomData.peripheryIntro "> <a-textarea v-model="roomData.peripheryIntro" maxlength="500" autosize /></div>
                  <a-textarea v-show="projectInfoEdit" v-model="roomData.peripheryIntro" maxlength="500" autosize placeholder="请输入项目周边介绍" />
                </label-item>
                <label-item
                    class="item u-bottom-border"
                    style="width: 100%;margin-top: 5px;position: relative;margin-right: 0px;"
                    title="项目标签"
                >
                  <div :style="projectInfoEdit?'border-bottom: 1px solid #DDDDDD;':''">
                    <div v-if="!projectInfoEdit&&roomData.lableList&&roomData.lableList.length>0" class="clearfix">
                      <div v-for="(itemTemp,index) in roomData.lableList" :key="index" class="itemLableStyle f-fl clearfix" style="margin-bottom: 5px;">
                        <div>{{itemTemp}}</div>
                      </div>
                    </div>
                    <div v-if="!projectInfoEdit&&(!roomData.lableList||roomData.lableList.length==0)">-</div>
                    <div class="clearfix" v-if="projectInfoEdit">
                      <div v-for="(itemTemp,index) in roomData.lableList" :key="index" class="itemLableStyle f-fl clearfix" style="margin-bottom: 5px;">
                        <div class="f-fl">{{itemTemp}}</div>
                        <icon-font style="color: #FB4246;margin-top: 5px;" class="cursor f-fl" @click="removeHouseLableList(index)" type="iconyumengtubiao_guanbi-"/>
                      </div>
                      <label-item class="f-fl u-no-border" v-if="roomData.lableList.length<10">
                        <a-input v-model="houseLableInput" style="text-align: left;" maxLength="10" @click="currentClickIndex=1" :placeholder="roomData.lableList.length==0?'可输入补充标签，回车添加':'继续输入回车添加'" @keyup.enter="value=>addHouseLabel(value)" />
                      </label-item>
                    </div>
                  </div>
                  <div style="position: absolute;top: 6px;left:52px;">
                    <div style="height: 24px;line-height: 24px;">
                      <span style="color: #FFA036;font-size: 12px;">(仅内部可见)</span>
                    </div>
                  </div>
                </label-item>
                <label-item
                    class="item bigTitleStyle2 u-bottom-border"
                    style="width: 100%;margin-top: 5px;position: relative;margin-right: 0px;"
                    title="项目备注"
                    :valLength="projectInfoEdit ? roomData.projectComment.length : 0" :maxSize="projectInfoEdit ? 500 : 0"
                >
                  <span v-show="!projectInfoEdit&&!roomData.projectComment">-</span>
                  <div class="promotionDesc" v-show="!projectInfoEdit&&roomData.projectComment "> <a-textarea v-model="roomData.projectComment" maxlength="500" autosize /></div>
                  <a-textarea v-if="projectInfoEdit" v-model="roomData.projectComment"
                              maxlength="500"
                              placeholder="请输入备注信息"
                              autosize
                  />
                  <div style="position: absolute;top: 6px;left:52px;">
                    <div style="height: 24px;line-height: 24px;">
                      <span style="color: #FFA036;font-size: 12px;">(仅内部可见)</span>
                    </div>
                  </div>
                  <div class="poperLabelStyle2" v-if="currentClickIndex&&houseLableList.length>0" style="max-height: 200px;overflow-y: auto" @mouseenter="currentClickIndex=1" @mouseleave="currentClickIndex=undefined">
                    <div style="width: 100%;font-size: 12px;color: #666666;line-height: 17px;margin: 0 0 2px 0;">常用标签</div>
                    <div v-for="(itemTemp,index3) in houseLableList" :key="index3" @click.stop="changeLabelList(itemTemp)" class="selectDemandLabelItem cursor f-fl clearfix" style="margin:0 5px 5px 0;" :style="roomData.lableList.indexOf(itemTemp)>-1?'':'background:#F4F4F4;'">
                      <div class="f-fl">{{itemTemp}}</div>
                    </div>
                  </div>
                </label-item>
                <label-item class="item u-bottom-border" style="width: 100%;margin-right: 0px;" :style="roomData.projectPicList&&roomData.projectPicList.length>0?'margin-bottom:10px':'margin-bottom:20px'" title="项目图片" :skeletonLoading="skeletonLoading">
                  <div v-show="!projectInfoEdit" class="room-img-list f-clearfix">
                    <span v-if="!roomData.projectPicList||roomData.projectPicList.length==0">-</span>
                    <div class="f-fl cursor" v-for="(item,i) in roomData.projectPicList" :key="i" style="margin-bottom: 10px;">
                      <div v-if="(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')" @click="handlePreview(roomData.projectPicList,i)">
                        <img v-if="GlobalConfig.ADD_WATERMARK==0" :src="item.small" alt="">
                        <img v-if="GlobalConfig.ADD_WATERMARK==1" :src="item.small.indexOf('?') != -1 ? item.small+'&x-oss-process=style/house_pic':item.small+'?x-oss-process=style/house_pic'" alt="">
                      </div>
                      <div v-if="(item.fileExt == 'mp4' || item.fileExt == 'avi' || item.fileExt == 'mov')">
                        <video :src="item.origin" controls="controls"></video>
                      </div>
                    </div>
                  </div>
                  <house-video v-show="projectInfoEdit" ref="roomDataProjectPicList" @deletePic="deleteProjectPic" :showPicTypeFlag="false" :picList="roomData.projectPicList" :uploadParms="uploadParmsProject"></house-video>
                </label-item>
                <div class="divider"></div>
              </div>
              <div class="titleDiv clearfix">
                <span class="title f-fl">负责人</span>
                <div class="cursor f-fr" style="color: #0A87F8;" @click="updateHouseMaintainersEdit" v-if="!houseMaintainersEdit" v-mark="['mk_house_centralized_bjfyxx']">
                  <icon-font class="editStyle" type="iconyumengtubiao_bianji-1" />
                </div>
                <div class="tabs-options f-fr" v-if="houseMaintainersEdit">
                  <span @click="cancelHouseMaintainersEdit" style="color: rgba(0, 0, 0, 0.65);line-height: 22px;">取消</span>
                  <span @click="saveHouseMaintainersEdit" style="line-height: 22px;">保存</span>
                </div>
              </div>
              <div class="input-info" style="margin-bottom: 20px;">
                <label-item class="item u-bottom-border f-fl" :must-fill="houseMaintainersEdit?true:false" title="所属门店(部门)" style="margin-bottom: 0px;margin-right: 0px;" :skeletonLoading="skeletonLoading">
                  <span v-show="!houseMaintainersEdit">{{roomData.deptName?roomData.deptName:'-'}}</span>
                  <label-item v-show="houseMaintainersEdit" v-if="roomData.deptName">
                    <store-tree resMark="mk_house_centralized" @cancelOtherTree="cancelOtherTree(1)" :defaultValue='roomData.deptName' placement="topLeft" ref="selectDept" width="200px" @selectChange="selectDept" :show-employee="false"></store-tree>
                  </label-item>
                  <label-item v-show="houseMaintainersEdit" v-else>
                    <store-tree resMark="mk_house_centralized" @cancelOtherTree="cancelOtherTree(1)" :defaultValue='roomData.deptName' placement="topLeft" ref="selectDept" width="200px" @selectChange="selectDept" :show-employee="false"></store-tree>
                  </label-item>
                </label-item>
                <label-item class="item u-bottom-border f-fl" title="维护人" style="margin-bottom: 0px;" :skeletonLoading="skeletonLoading">
                  <span v-show="!houseMaintainersEdit">{{roomData.maintainerName}}-{{roomData.maintainerPhone}}</span>
                  <label-item v-show="houseMaintainersEdit" v-if="roomData.maintainerName">
                    <dept-employee-tree resMark="mk_house_centralized" @cancelOtherTree="cancelOtherTree(2)" :bottomBorder="false" :defaultValue="roomData.maintainerName" @selectChange="selectDeptEmp" ref="selectDeptEmp" width="180px" placement="topLeft" :disableDept="true"></dept-employee-tree>
                  </label-item>
                  <label-item v-show="houseMaintainersEdit" v-else>
                    <dept-employee-tree resMark="mk_house_centralized" @cancelOtherTree="cancelOtherTree(2)" :bottomBorder="false" @selectChange="selectDeptEmp" ref="selectDeptEmp" width="180px" placement="topLeft" :disableDept="true"></dept-employee-tree>
                  </label-item>
                </label-item>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" v-if="permission.reserveFlag">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_yuyue" />预定信息
                        </span>
            <destine-info v-mark="['mk_contract_reserve_ck']" v-if="destineInfoFlag" ref="destineInfoCentralized" @openDetail="openDetail" :houseId="roomData.id"> </destine-info>
          </a-tab-pane>
          <a-tab-pane key="3" v-if="permission.tenantContractFlag">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_zukehetong" />租客合同
                        </span>
            <tenant-info v-if="tenantInfoFlag" ref="tenantInfoCentralized" @openDetail="openDetailTenant" :houseId="roomData.id"> </tenant-info>
          </a-tab-pane>
          <a-tab-pane key="4" v-if="permission.ownerContractFlag">
                        <span slot="tab">
                            <icon-font type="iconyezhuhetong" />业主合同
                        </span>
            <owner-info v-if="ownerInfoFlag" ref="ownerInfoCentralized" @openDetail="openDetailOwner" :housePid="roomData.id"> </owner-info>
          </a-tab-pane>
          <a-tab-pane key="5" v-if="permission.billFlag">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_caiwuzhangdan" />财务账单
                        </span>
            <bill-info v-if="billInfoFlag" ref="billInfoCentralized" @openDetail="openDetailBill" :houseId="roomData.id" :housePid="roomData.id"> </bill-info>
          </a-tab-pane>
          <a-tab-pane key="6" v-if="permission.repairFlag">
                        <span slot="tab">
                            <icon-font type="iconweixiu-1" />维修
                        </span>
            <repair-info v-if="repairInfoFlag" ref="repairInfoCentralized" @openDetail="openDetailRepair" :houseId="roomData.id" :housePid="roomData.id"></repair-info>
          </a-tab-pane>
          <a-tab-pane key="7" v-if="permission.cleanFlag">
                        <span slot="tab">
                            <icon-font type="iconbaojie-1" />保洁
                        </span>
            <clean-info v-if="cleanInfoFlag" ref="cleanInfoCentralized" @openDetail="openDetailClean" :houseId="roomData.id" :housePid="roomData.id"></clean-info>
          </a-tab-pane>
          <a-tab-pane key="8" v-if="permission.distributionFlag">
                        <span slot="tab">
                            <icon-font type="iconpeihuo-xianxing" />配货
                        </span>
            <distribution-info v-if="distributionInfoFlag" ref="distributionInfoCentralized" @openDetail="openDetailDistribution" :houseId="roomData.id" :housePid="roomData.id"></distribution-info>
          </a-tab-pane>
          <a-tab-pane key="9" v-if="permission.lockFlag">
                        <span slot="tab">
                            <icon-font type="iconmensuo2" />门锁
                        </span>
            <lock-info v-if="lockInfoFlag" ref="lockInfoCentralized" :roomData="roomData" :houseType="houseType" @bindSuccess="bindLockSuccess" @unBindSuccess="unBindSuccess"></lock-info>
          </a-tab-pane>
          <a-tab-pane key="10" v-if="permission.eletricMoreFlag">
                    <span slot="tab">
                        <icon-font type="iconshuidianran" />水电燃
                    </span>
            <electric-more-info v-if="electricMoreInfoFlag" ref="electricMoreInfoCentralized" :houseType="houseType" :roomData="roomData" :defaultActiveIndex="electricMoreDefaultActiveIndex"
                                @bindSuccess="bindElectricMoreInfoSuccess"     @unBindSuccess="unBindElectricMoreSuccess" @refreshinfoFun="refreshinfoFun"></electric-more-info>
          </a-tab-pane>
          <div slot="tabBarExtraContent" class="tabs-options tabs-options-top">
            <div v-show="activekey == 1&&roomData.status!=8" class="opt-item" :class="innerMarkList.indexOf('mk_contract_owner_tjht')>-1?'sixLength':'normalLength'">
              <div v-if="outterMarkList.indexOf('mk_contract_tenant_tjht')>-1" @click="addTenantContract" v-mark="['mk_contract_tenant_tjht']">
                <icon-font type="iconyumengtubiao_heyue" />
                <span>&nbsp;签约</span>
              </div>
              <div v-if="outterMarkList.indexOf('mk_contract_reserve_tjyd')>-1" @click="addReserve" v-mark="['mk_contract_reserve_tjyd']">
                <icon-font type="iconyumengtubiao_yuyue" />
                <span>&nbsp;预定</span>
              </div>
              <div v-if="outterMarkList.indexOf('mk_finance_bill_tjzd')>-1" @click="addBill" v-mark="['mk_finance_bill_tjzd']">
                <icon-font type="iconyumengtubiao_caiwuzhangdan" />
                <span>&nbsp;添加账单</span>
              </div>
              <div v-if="outterMarkList.indexOf('mk_contract_owner_tjht')>-1" @click="addOwnerContract" v-mark="['mk_contract_owner_tjht']">
                <icon-font type="iconyezhuhetong" />
                <span>&nbsp;添加业主合同</span>
              </div>
              <div v-if="outterMarkList.indexOf('mk_house_centralized_gbfy')>-1" @click="closeAll" v-mark="['mk_house_centralized_gbfy']">
                <icon-font type="iconyumengtubiao_jinyong" />
                <span>&nbsp;关闭房源</span>
              </div>
              <div v-if="outterMarkList.indexOf('mk_house_centralized_scfy')>-1" @click="deleteChild" v-mark="['mk_house_centralized_scfy']">
                <icon-font type="iconyumengtubiao_shanchu-" />
                <span>&nbsp;删除房源</span>
              </div>
              <a-popover placement="bottomRight" v-if="showMoreOperate">
                <div>
                  <icon-font type="iconyumengtubiao_gengduo-1" />
                  &nbsp;更多
                </div>
                <template slot="content">
                  <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('mk_finance_bill_tjzd')>-1" v-mark="['mk_finance_bill_tjzd']" @click="addBill">添加账单</div>
                  <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('mk_contract_owner_tjht')>-1" v-mark="['mk_contract_owner_tjht']" @click="addOwnerContract">添加业主合同</div>
                  <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('mk_house_centralized_gbfy')>-1"  @click="closeAll" v-mark="['mk_house_centralized_gbfy']">关闭房源</div>
                  <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('mk_house_centralized_scfy')>-1"  @click="deleteChild" v-mark="['mk_house_centralized_scfy']">删除房源</div>
                </template>
              </a-popover>
            </div>
            <div v-show="activekey == 1&&roomData.status==8" class="opt-item">
              <div @click="openAll" v-mark="['mk_house_centralized_jhfy']">
                <icon-font type="iconyumengtubiao_jihuo" />
                <span>&nbsp;激活房源</span>
              </div>
              <div @click="deleteChild" v-mark="['mk_house_centralized_scfy']">
                <icon-font type="iconyumengtubiao_shanchu-" style="color: red"/>
                <span style="color: red;">&nbsp;删除房源</span>
              </div>
            </div>
            <div v-show="activekey == 2">
              <div @click="addReserve" v-mark="['mk_contract_reserve_tjyd']">
                <icon-font type="iconyumengtubiao_yuyue" />
                <span>&nbsp;添加预定</span>
              </div>
            </div>
            <div v-show="activekey == 3">
              <div @click="addTenantContract" v-mark="['mk_contract_tenant_tjht']">
                <icon-font type="iconyumengtubiao_heyue" />
                <span>&nbsp;添加租客合同</span>
              </div>
            </div>
            <div v-show="activekey == 4">
              <div @click="addOwnerContract" v-mark="['mk_contract_owner_tjht']">
                <icon-font type="iconyezhuhetong" />
                <span>&nbsp;添加业主合同</span>
              </div>
            </div>
            <div v-show="activekey == 5">
              <div @click="addBill" v-mark="['mk_finance_bill_tjzd']">
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

    <a-modal centered title="变更房源信息" v-model='showChangeStatusDialog' class="ownModalBorder titDialog" @ok="saveStatus" okText="保存" cancelText="取消">
      <label-item style="margin: 0 20px 20px 20px" title="房源信息" border class="u-bottom-border">
        <div>
          <span style="font-size: 16px;padding:5px;" class="houseAlias" v-if="changeStatusData.houseAlias">{{changeStatusData.houseAlias}}</span>
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
    <!-- 添加合同弹框 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="addTenantContractDialog" class="ownModalBorder titDialog" title="添加合同">
      <tenant-contract :houseFul='houseFul' :reserveFul='reserveFul' :reserveData="reserveData" :roomData="roomData"  @cancelUp="addTenantContractDialog = false" @saveSuccess="addTenantContractSuccess" @cancelSaveTenantContract="cancelSaveTenantContract"></tenant-contract>
    </a-modal>
    <!-- 添加业主合同弹框 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="addOwnerContractDialog" class="ownModalBorder titDialog" title="添加业主合同">
      <owner-contract :houseFul="houseFul" :roomData="roomData" :contractResetStatus="contractResetStatus" @saveSuccess="addOwnerContractSuccess" @cancelSaveOwnerContract="cancelSaveOwnerContract"></owner-contract>
    </a-modal>
    <!-- 添加预定弹框 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="addReserveDialog" class="ownModalBorder titDialog" title="添加预定">
      <add-reserve ref="houseAddReserveCentralized" @cancelUp="addReserveDialog = false" :houseFul='houseFul' :roomData="roomData" @saveSuccess="addReserveSuccess"></add-reserve>
    </a-modal>
    <!-- 预定详情弹框 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="reserveDetailDialog" class="ownModalBorder titDialog" title="预定详情" @cancel="downDetail">
      <reserve-detail :reserveId="reserveId" @deleteSuccess="deleteSuccess" @reserveId="reserveIdFun" @refreshinfoFun="refreshinfoFun" @addContractIng="addContractIng"></reserve-detail>
    </a-modal>
    <!-- 租客合同弹框 -->
    <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="合同详情" width="1000px" v-model="lookTenantDialog" class="ownModalBorder titDialog" @cancel="cancelTenantDetail">
      <contract-detail :tenantContract="tenantContractId" @saveHouseDetail="cancelTenantDetail" @refreshinfoFun="refreshinfoFun" @deleteOk="deleteOk" @initTenantContract="initTenantContract"></contract-detail>
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
    <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
      <img v-if="GlobalConfig.ADD_WATERMARK==1" style="width: 100%" :src="previewImage.indexOf('?') != -1 ? previewImage+'&x-oss-process=style/house_pic':previewImage+'?x-oss-process=style/house_pic'" alt="example">
      <img v-if="GlobalConfig.ADD_WATERMARK==0" style="width: 100%" :src="previewImage" alt="example">
    </a-modal>
    <!-- 图片预览(新) -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="imageShowDialog" class="ownModalBorder titDialog" title="图片预览">
      <images-view :picList="imageShowPicList" :imageShowIndex="imageShowIndex"></images-view>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskStyle="maskStyle" :maskClosable="false" width="1000px" v-model="assetsManageDialog" class="ownModalBorder titDialog" :title="assetsManageTitle" @cancel="assetsManageFun">
      <assets-manage :houseInfo="houseParamInfo" @refreshinfoFun="refreshinfoFun"></assets-manage>
    </a-modal>
  </div>
</template>

<script>
import * as API from '@/api/centralizedHouse';
import {changeStatus} from '@/api/shareHouse'
import * as PublicAPI from '@/api/public'
import tenantContract from '@/views/contract/tenant/addTenantContract';
import addReserve from '@/views/contract/reserve/addReserve';
import DeptEmployeeTree from '@/components/DeptEmployeeTree';
import StoreTree from '@/components/DeptEmployeeTree/store';
import destineInfo from '../whole/destine';
import tenantInfo from '../whole/tenantInfo';
import billInfo from '../whole/billInfo';
import CleanInfo from '../whole/cleanInfo';
import DistributionInfo from '../whole/distributionInfo';
import RepairInfo from '../whole/repairInfo';
import LockInfo from '../whole/lockInfo';
import ElectricMoreInfo from '../whole/electricMoreInfo';
import { getReserveInfo } from '@/api/reserve'
import contractDetail from '@/views/contract/tenant/contractDetails';
import billDetail from '@/views/finance/bill/billDetails';
import addBill from '@/views/finance/bill/addBill';
import reserveDetail from '@/views/contract/reserve/reserveDetail';
import ownerInfo from '../whole/ownerInfo';
import ownerContract from '@/views/contract/owner/addOwnerContract';
import contractOwner from '@/views/contract/owner/contractDetails';
import RepairDetail from '@/views/workorder/repair/details';
import CleanDetail from '@/views/workorder/cleaning/details';
import DistributionDetail from '@/views/workorder/distribution/details';
import AddRepair from '@/views/workorder/repair/add';
import AddClean from '@/views/workorder/cleaning/add';
import AddDistribution from '@/views/workorder/distribution/add';
import HouseVideo from '@/components/OwnUpload/houseVideo';
import ImagesView from '@/components/ImagesView';
import ViewConfig from '../whole/viewConfig';
import AssetsManage from '../whole/assetsManage';
import {bizDecisionGet} from "@/api/decision";
const allMarkList = [
  'mk_contract_tenant_tjht','mk_contract_reserve_tjyd','mk_finance_bill_tjzd',
  'mk_contract_owner_tjht','mk_house_centralized_gbfy','mk_house_centralized_scfy'
];
export default {
  name: "ChildDetail",
  props: {
    roomTitle: {
      type: Object,
    },
    goToActive:{
      type:String,
    },
  },
  components: {
    addReserve,
    DeptEmployeeTree,
    StoreTree,
    destineInfo,
    tenantInfo,
    billInfo,
    contractDetail,
    billDetail,
    addBill,
    reserveDetail,
    tenantContract,
    ownerInfo,
    ownerContract,
    contractOwner,
    RepairInfo,
    CleanInfo,
    DistributionInfo,
    LockInfo,
    ElectricMoreInfo,
    RepairDetail,
    CleanDetail,
    DistributionDetail,
    AddRepair,
    AddClean,
    AddDistribution,
    HouseVideo,
    ImagesView,
    ViewConfig,
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
      roomTypeEdit:false,
      roomTypeInfoEdit:false,
      projectInfoEdit:false,
      houseMaintainersEdit:false,
      centralizedHousePublicConfig: [],
      houseTagConfig:[],
      showChangeStatusDialog: false,
      activeIndex: 0,
      modalTitle: {
        houseId: '',
        roomId: '',
        houseAlias: '',
        address: '',
      },
      changeStatusData: {
        houseAlias: '',
        houseAddress: '',
        houseStatus: '',
        id: '',
      },
      uploadParmsRoomType: {},
      uploadParmsProject:{},
      defaultMaintainers: '',
      actualPrice: '',
      roomTypeListData:[],
      activekey: '1',
      houseFul: true,
      reserveId:'',
      reserveDetailDialog:false,
      addTenantContractDialog: false,
      addReserveDialog: false,
      reserveData:{},
      tenantContractId:'',
      auditInstanceId:'',
      bizScene:'',
      auditBreakInstanceId:'',
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
      addOwnerContractDialog:false,
      lookOwnerDialog:false,
      contractResetStatus: false,   //重置合同状态
      ownerContractId:'',
      cityList: [],
      communityList: [],
      destineInfoFlag:false,
      tenantInfoFlag:false,
      ownerInfoFlag:false,
      billInfoFlag:false,
      repairInfoFlag:false,
      cleanInfoFlag:false,
      distributionInfoFlag:false,
      lockInfoFlag:false,
      electricMoreInfoFlag:false,
      skeletonLoading:true,
      gasTypeFlag:false,
      projectConfigCheckAll:false,
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
      houseType:3,
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
      isRefresh:false,//用于快捷入口刷新
      configRelationFlag:false,   //物品配置是否关联
      houseParamInfo:{},
      assetsManageDialog:false,
      maskStyle:{backgroundColor:'rgba(0,0,0,0.2)'},
      assetsManageTitle:'',
      showPublicConfig:[],
      checkAll:false,
      indeterminate:false,
      refreshConfig:false,
      electricMoreDefaultActiveIndex:1,
    }
  },
  created() {
    this.listHouseLable();
    this.getRoomData();
    this.getDictionaryList();
    this.roomTypeList();
    this.getCity();
  },
  methods: {
    assetsManageFun(){
      this.assetsManageDialog = false;
      if(this.isRefresh){
        this.getRoomData();
        this.isRefresh = false;
      }
    },
    setRefreshConfig(res){
      if(res){
        this.refreshConfig = res;
      }
    },
    checkAllItem(value){
      this.indeterminate = false;
      this.checkAll = value.target.checked;
      if(value.target.checked){
        this.showPublicConfig.forEach((item)=>{
          if(!item.checked){
            item.checked = true;
            item.quantity = 1;
          }
        });
      }
      else{
        this.showPublicConfig.forEach((item)=>{
          item.checked = false;
          item.quantity = 0;
        });
      }
    },
    checkItem(value,index){
      if(value.target.checked){
        this.showPublicConfig[index].quantity = 1;
      }
      else {
        this.showPublicConfig[index].quantity = 0;
      }
      let selectedConfig = [];
      this.showPublicConfig.forEach((item)=>{
        if(item.checked){
          selectedConfig.push(item);
        }
      });
      this.indeterminate = !!selectedConfig.length && selectedConfig.length < this.showPublicConfig.length;
      this.checkAll = selectedConfig.length === this.showPublicConfig.length;
      this.$forceUpdate();
    },
    plusQuantity(item){
      if(item.quantity>9999){
        return ;
      }
      item.quantity += 1;
    },
    reduceQuantity(item){
      if(item.quantity<=1){
        return ;
      }
      item.quantity -= 1;
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
    unBindElectricMoreSuccess(){
      this.getRoomData();
      this.$emit('refreshinfoFun',true);
    },
    bindElectricMoreInfoSuccess(){
      this.getRoomData();
      this.$emit('refreshinfoFun',true);
    },
    unBindSuccess(){
      this.getRoomData();
      this.$emit('refreshinfoFun',true);
    },
    bindLockSuccess(){
      this.getRoomData();
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
      API.getListHouseLable().then(res => {
        if (res.code == "200") {
          this.houseLableList = res.data;
        }
      })
    },
    updateRoomInfoEdit(){
      this.roomInfoEdit = true;
    },
    cancelRoomInfoEdit(){
      this.roomInfoEdit = false;
      if(this.refreshConfig&&this.configRelationFlag){
        this.getRoomData();
        this.refreshConfig = false;
      }
    },
    saveRoomInfoEdit(){
      let sendData = {
        id:this.roomData.id,
        actualPrice:Math.round(this.actualPrice*100),
        checkCode:this.roomData.checkCode,
        comment:this.roomData.comment,
        houseArea:this.roomData.houseArea,
        orientation:this.roomData.orientation,
        roomNo:this.roomData.doorplate,
        viewType:this.roomData.viewType,
      };
      if(this.$refs.viewConfig){
        let roomGoodsList = [];
        this.$refs.viewConfig.showPublicConfig.forEach((item)=>{
          if(item.quantity>0&&item.checked==true){
            roomGoodsList.push(item)
          }
        });
        sendData.roomGoodsList = roomGoodsList;
      }
      API.roomBasicEdit(sendData).then(res => {
        if (res.code == 200){
          this.$emit('refreshinfoFun', true);
          this.$message.info('房间信息修改成功！');
        }else {
          this.$message.error('房间信息修改失败！');
        }
        this.roomInfoEdit = false;
        this.getRoomData();
      })
    },
    updateRoomTypeEdit(){
      this.roomTypeEdit = true;
    },
    cancelRoomTypeEdit(){
      this.roomTypeEdit = false;
    },
    saveRoomTypeEdit(){
      let sendData = {
        id:this.roomData.id,
        roomTypeId:this.roomData.roomTypeId,
      };
      API.houseRoomTypeEdit(sendData).then(res => {
        if (res.code == 200){
          this.$emit('refreshinfoFun', true);
          this.$message.info('所属房型修改成功！');
        }else {
          this.$message.error('所属房型修改失败！');
        }
        this.roomTypeEdit = false;
        this.getRoomData();
      })
    },
    updateRoomTypeInfoEdit(){
      this.roomTypeInfoEdit = true;
      if(this.copyRoomData.tagList&&this.copyRoomData.tagList.length==this.houseTagConfig.length){
        this.tagCheckAll = true;
      }
      //获取房型配置
      this.getRoomTypeAssetsdict();
    },
    cancelRoomTypeInfoEdit(){
      this.roomTypeInfoEdit = false;
      if(!this.copyRoomData.tagList||this.copyRoomData.tagList.length==0){
        this.roomData.tagList = [];
      }
      else{
        this.roomData.tagList = [];
        this.copyRoomData.tagList.forEach((item)=>{
          this.roomData.tagList.push(item);
        });
      }
    },
    saveRoomTypeInfoEdit(){
      let sendData = {
        id:this.roomData.roomTypeId,
        buildingProjectId:this.roomData.buildingProjectId,
        room:this.roomData.room,
        livingRoom:this.roomData.livingRoom,
        kitchen:this.roomData.kitchen,
        toilet:this.roomData.toilet,
        decorationType:this.roomData.decorationType,
        isShortRent:this.roomData.isShortRent,
        tagList:this.roomData.tagList,
        introduction:this.roomData.introduction,
        vrUrl:this.roomData.roomTypeVrUrl,
      };
      let goodsList = [];
      this.showPublicConfig.forEach((item)=>{
        if(item.quantity > 0){
          goodsList.push(item);
        }
      });
      sendData.goodsList = goodsList;
      //图片处理
      let roomDataRoomTypePicList = [...this.$refs.roomDataRoomTypePicList.picsList];
      if(roomDataRoomTypePicList && roomDataRoomTypePicList.length > 0) {
        let picIdList = [];
        roomDataRoomTypePicList.forEach((val) => {
          picIdList.push(val.id)
        })
        sendData.picIdList = picIdList;
      }
      API.roomTypeEdit(sendData).then(res => {
        if (res.code == 200){
          this.$emit('refreshinfoFun', true);
          this.$message.info('房型信息修改成功！');
        }else {
          this.$message.error('房型信息修改失败！');
        }
        this.roomTypeInfoEdit = false;
        this.getRoomData();
      })
    },
    updateProjectInfoEdit(){
      this.projectInfoEdit = true;
      if(this.copyRoomData.projectConfigList){
        let projectConfigIdList = [];
        for (let i = 0; i < this.copyRoomData.projectConfigList.length; i++) {
          projectConfigIdList.push(this.copyRoomData.projectConfigList[i].id);
        }
        if(projectConfigIdList.length == this.centralizedHousePublicConfig.length){
          this.projectConfigCheckAll = true;
        }
        this.roomData.projectConfigList = projectConfigIdList;
      }
      this.gasTypeFlag = this.copyRoomData.gasType == 1?true:false;
    },
    cancelProjectInfoEdit(){
      this.projectInfoEdit = false;
      this.roomData.projectConfigList = [];
      if(!this.copyRoomData.projectConfigList||this.copyRoomData.projectConfigList.length==0){
        this.roomData.projectConfigList = [];
      }
      else {
        this.copyRoomData.projectConfigList.forEach((item)=>{
          let temp = Object.assign({},item);
          this.roomData.projectConfigList.push(temp);
        });
      }
    },
    saveProjectInfoEdit(){
      let sendData = {
        id:this.roomData.buildingProjectId,
        houseBizMode:this.roomData.houseBizMode,
        no:this.roomData.projectNo,
        name:this.roomData.projectName,
        cityId:this.roomData.cityId,
        communityId:this.roomData.communityId,
        buildingNo:this.roomData.buildingNo,
        unit:this.roomData.unit,
        waterType:this.roomData.waterType,
        electricityType:this.roomData.electricityType,
        gasType:this.roomData.gasType,
        heatingType:this.roomData.heatingType,
        contactNumber:this.roomData.contactNumber,
        checkCode:this.roomData.projectCheckCode,
        projectConfigIdList:this.roomData.projectConfigList,
        projectIntro:this.roomData.projectIntro,
        peripheryIntro:this.roomData.peripheryIntro,
        lableList:this.roomData.lableList,
        comment:this.roomData.projectComment,
        vrUrl:this.roomData.vrUrl,
      };
      //图片处理
      let roomDataProjectPicList = [...this.$refs.roomDataProjectPicList.picsList];
      if(roomDataProjectPicList && roomDataProjectPicList.length > 0) {
        let picIdList = [];
        roomDataProjectPicList.forEach((val, i) => {
          picIdList.push(val.id)
        })
        sendData.picIdList = picIdList;
      }
      API.editProject(sendData).then(res => {
        if (res.code == 200){
          this.$emit('refreshinfoFun', true);
          this.$message.info('项目信息修改成功！');
        }else {
          this.$message.error('项目信息修改失败！');
        }
        this.projectInfoEdit = false;
        this.getRoomData();
      })
    },
    updateHouseMaintainersEdit(){
      this.houseMaintainersEdit = true;
    },
    cancelHouseMaintainersEdit(){
      this.houseMaintainersEdit = false;
      //还原原始数据
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
        id:this.roomData.buildingProjectId,
        maintainerId:this.roomData.maintainerId,
        deptId:this.roomData.deptId,
      };
      API.houseCentralizedPermissionDataEdit(sendData).then(res => {
        if (res.code === '200') {
          this.$emit('refreshinfoFun', true);
          this.$message.success('修改所属门店(部门)/维护人成功！');
        }else{
          this.$message.error('修改所属门店(部门)/维护人失败！');
        }
        this.houseMaintainersEdit = false;
        this.getRoomData();
      });
    },
    deleteRoomTypePic(){
      this.copyRoomData.roomTypePicList = [...this.$refs.roomDataRoomTypePicList.picsList];
    },
    deleteProjectPic(){
      this.copyRoomData.projectPicList = [...this.$refs.roomDataProjectPicList.picsList];
    },
    refreshinfoFun(res){
      if(res){
        this.isRefresh = res;
        this.$emit('refreshinfoFun',res);
      }
    },
    successFunBill(res){
      //账单删除后的回调
      if(res){
        this.billDetailDialog = false;
        this.billInfoFlag = false;
        this.getRoomData();
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
    changeProjectConfigCheckAll(){
      if(this.roomData.projectConfigList.length == this.centralizedHousePublicConfig.length){
        this.projectConfigCheckAll = true;
      }else{
        this.projectConfigCheckAll = false;
      }
    },
    checkAllProjectConfig(e){
      if(e.target.checked){
        this.roomData.projectConfigList = [];
        this.centralizedHousePublicConfig.forEach((item)=>{
          this.roomData.projectConfigList.push(item.id);
        })
      }else{
        this.roomData.projectConfigList = [];
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
    vrUrlPreview(url){
      if(!url){
        return ;
      }
      window.open(url);
    },
    getCity(){
      PublicAPI.getCityList().then(res=>{
        // console.log(res)
        this.cityList = res.data;
        this.roomData.cityId = this.cityList[0].id

      })
    },
    selectCity(val){
      this.roomData.cityId = val;
      this.roomData.communityName = undefined;
    },
    selectCommunity(searchVal){
      this.searchCommunityVal = searchVal=='' ? undefined : searchVal;
      PublicAPI.searchCommunity(this.roomData.cityId,this.searchCommunityVal).then(res=>{
        // console.log(res)
        this.communityList = res.data;
      })
    },
    getCommunity(communityId){
      this.roomData.communityId = communityId;
    },
    getRoomData() {
      this.skeletonLoading = true;
      API.houseCentralizedRoomView(this.roomTitle.roomId).then(res => {
        if (res.code == 200) {
          this.roomData = res.data;
          this.$emit('changeAddress',this.roomData.cityName+this.roomData.areaName + this.roomData.fullAddress);
          this.assetsManageTitle = this.roomData.cityName+this.roomData.areaName + this.roomData.fullAddress;
          //构造配置需要的参数
          this.houseParamInfo = {
            houseId:this.roomTitle.roomId,
            houseAlias:'',
            fullAddress:this.assetsManageTitle,
            address:this.assetsManageTitle,
            assetsManageTitle:this.assetsManageTitle,
            fromType:'centrialized',
          };
          if(this.roomData.projectPicList  == null){
            this.roomData.projectPicList  = [];
          }
          else{
            for (let i = 0; i < this.roomData.projectPicList.length; i++) {
              this.roomData.projectPicList[i].status='done';
            }
          }
          if(this.roomData.roomTypePicList  == null){
            this.roomData.roomTypePicList  = [];
          }
          else{
            for (let i = 0; i < this.roomData.roomTypePicList.length; i++) {
              this.roomData.roomTypePicList[i].status='done';
            }
          }
          if(!this.roomData.waterType){
            this.roomData.waterType = undefined;
          }
          if(!this.roomData.electricityType){
            this.roomData.electricityType = undefined;
          }
          this.gasTypeFlag = this.roomData.gasType == 1?true:false;
          this.copyRoomData = Object.assign({}, this.roomData);
          this.uploadParmsRoomType = {
            bizId: res.data.roomTypeId,
            bizType: 15,
            subBizType: '',
          },
          this.uploadParmsProject = {
            bizId: res.data.buildingProjectId,
            bizType: 14,
            subBizType: '',
          },
          this.defaultMaintainers = this.roomData.maintainerName;
          this.actualPrice = this.roomData.actualPrice/100;
          //获取权限数据
          this.getPermission();
          //判断是否有haveQuick
          if(this.roomData.waterMeter||this.roomData.electricMeter||this.roomData.doorLock||this.roomData.isRepairUndone==1||this.roomData.isCleanUndone==1||
              this.roomData.isDistributionUndone==1||this.roomData.isBillReceivable==1||this.roomData.isBillOverdue==1||
              this.roomData.isContractBeRecorded==1||this.roomData.isContractBeSigned==1||this.roomData.isSyncTenant==1||
              (this.roomData.contractStatus&&this.roomData.contractStatus==3&&this.roomData.renterFewDaysLaterIn&&this.roomData.renterFewDaysLaterIn>0)||
              (this.roomData.contractStatus&&this.roomData.contractStatus==4&&this.roomData.renterRemainingDays&&this.roomData.renterRemainingDays>0)||
              this.roomData.isContractBeExpired==1||this.roomData.isHasBook==1){
            this.haveQuick = true;
          }else{
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
          if (value.mark == "mk_contract_tenant_tjht"||value.mark == "mk_contract_reserve_tjyd"
              ||value.mark == "mk_finance_bill_tjzd"||value.mark == "mk_contract_owner_tjht"||value.mark == "mk_house_centralized_gbfy"||value.mark == "mk_house_centralized_scfy"){
            temp.push(value.mark);
          }
        });
      }
      let markListTemp = [];
      this.markList.forEach((item)=>{
        if(temp.indexOf(item) > -1){
          markListTemp.push(item);
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
    deleteChild() {
      let that = this;
      let id = this.roomData.id
      this.$modal.confirm({
        title: '确定删除此房源吗？',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.housePubDeleteRoom(id).then(res => {
            // console.log(res)
            if (res.code == 200) {
              that.$message.success('删除成功！');
              that.$emit('deleteSuccess');
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });

    },
    getRoomTypeAssetsdict(){
      let parameter = {
        roomTypeId:this.roomData.roomTypeId,
      };
      // 房型配置
      PublicAPI.getRoomTypeAssetsdict(parameter).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.showPublicConfig = [];
          let selectedConfig = [];
          res.data.forEach((item)=>{
            if(item.quantity>0){
              item.checked = true;
              selectedConfig.push(item)
            }
            this.showPublicConfig.push(item)
          });
          this.indeterminate = !!selectedConfig.length && selectedConfig.length < this.showPublicConfig.length;
          this.checkAll = selectedConfig.length === this.showPublicConfig.length;
        }
      })
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
      // 公区配置、房间配置
      API.getCentralizedHouseDictionary().then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.centralizedHousePublicConfig = res.data;
        }
      })
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
        vnode = () => <div><p>你还可以添加租客合同来变更该房源状态</p><p style='color: #0A87F8;cursor: pointer'>去添加租客合同</p></div>
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
          changeStatus(that.changeStatusData.roomId, that.activeIndex).then(res => {
            if (res.code == 200){
              that.showChangeStatusDialog = false;
              that.$emit('refreshinfoFun', true);
              that.$message.info('保存成功！');
              that.getRoomData();
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    changeStatus( roomTitle,roomData) {
      this.showChangeStatusDialog = true;
      this.changeStatusData = {
        houseAlias: roomData.houseAlias,
        houseAddress: roomTitle.fullAddress,
        houseStatus: roomData.status,
        roomId: roomTitle.roomId,
      }
    },
    addReserveSuccess(res) {
      //预定添加成功
      if (res) {
        this.addReserveDialog = false;
        this.$emit('refreshinfoFun', true);
        let _this = this;
        setTimeout(function () {
          _this.getRoomData();
          _this.handleCallback(_this.activekey);
          _this.$refs.destineInfoCentralized && _this.$refs.destineInfoCentralized.getInfo();
        }, 500);
      }
    },
    addReserve(){
      this.addReserveDialog = true;
    },
    addReserveFun() {
      // this.confirmLoading = true;
      this.$refs.houseAddReserveCentralized.saveAddReserve()
      // .then(res => {
      //     // console.log(res)
      //     this.addHouseDialog = false;
      //     this.confirmLoading = false;
      //     this.getData();
      // }, err => {
      //     console.log(err)
      // })
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
    roomTypeList(){
      API.roomTypeList(this.roomTitle.buildingProjectId).then(res => {
        if (res.code == "200") {
          this.roomTypeListData = res.data;
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
    addTenantContract() {
      this.addTenantContractDialog = true;
    },
    cancelSaveTenantContract(){
      this.addTenantContractDialog = false;
    },
    addTenantContractSuccess(res) {
      if (res) {
        this.addTenantContractDialog = false;
        this.$emit('refreshinfoFun', true);
        let _this = this;
        setTimeout(function() {
          _this.getRoomData();
          _this.handleCallback(_this.activekey);
          _this.$refs.tenantInfoCentralized&&_this.$refs.tenantInfoCentralized.getInfo();
        }, 500);

      }
    },
    addOwnerContract() {
      this.addOwnerContractDialog = true;
    },
    cancelSaveOwnerContract() {
      this.addOwnerContractDialog = false;
    },
    addOwnerContractSuccess() {
      this.addOwnerContractDialog = false;
      this.$emit('refreshinfoFun', true);
      let _this = this;
      setTimeout(function() {
        _this.getRoomData();
        _this.handleCallback(_this.activekey);
        _this.$refs.ownerInfoCentralized&&_this.$refs.ownerInfoCentralized.getInfo();
      }, 500);
    },
    addSaveSuccessBill(res){
      if (res) {
        this.addBillDialog = false;
        this.$emit('refreshinfoFun', true);
        let _this = this;
        setTimeout(function() {
          _this.getRoomData();
          _this.handleCallback(_this.activekey);
          _this.$refs.billInfoCentralized&&_this.$refs.billInfoCentralized.getInfo();
        }, 500);

      }
    },
    addSaveSuccessRepair(res){
      if (res) {
        this.addRepairDialog = false;
        this.$emit('refreshinfoFun', true);
        let _this = this;
        setTimeout(function() {
          _this.getRoomData();
          _this.handleCallback(_this.activekey);
          _this.$refs.repairInfoCentralized&&_this.$refs.repairInfoCentralized.getInfo();
        }, 500);

      }
    },
    addSaveSuccessClean(res){
      if (res) {
        this.addCleanDialog = false;
        this.$emit('refreshinfoFun', true);
        let _this = this;
        setTimeout(function() {
          _this.getRoomData();
          _this.handleCallback(_this.activekey);
          _this.$refs.cleanInfoCentralized&&_this.$refs.cleanInfoCentralized.getInfo();
        }, 500);

      }
    },
    addSaveSuccessDistribution(res){
      if (res) {
        this.addDistributionDialog = false;
        this.$emit('refreshinfoFun', true);
        let _this = this;
        setTimeout(function() {
          _this.getRoomData();
          _this.handleCallback(_this.activekey);
          _this.$refs.distributionInfoCentralized&&_this.$refs.distributionInfoCentralized.getInfo();
        }, 500);

      }
    },
    openDetail(res){
      if(res){
        this.reserveId = res;
        this.reserveDetailDialog = true;
      }
    },
    openDetailOwner(res,auditInstanceId){
      if(res){
        this.ownerContractId = res;
        this.lookOwnerDialog = true;
        this.auditInstanceId = auditInstanceId;
      }
    },
    openDetailTenant(res){
      if(res){
        this.tenantContractId = res;
        this.lookTenantDialog = true;
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
          _this.$refs.destineInfoCentralized.getInfo()
        }, 500);
      }
    },
    downDetail(){
      this.reserveDetailDialog = false;
      if(this.isRefresh){
        this.getRoomData();
        this.isRefresh = false;
      }
      this.$refs.destineInfoCentralized.getInfo()
    },
    deleteOk(res) {
      if (res) {
        this.lookTenantDialog = false;
        this.lookOwnerDialog = false;
        this.$emit('refreshinfoFun', true);
        this.getRoomData();
        this.isRefresh = false;
        let _this = this;
        setTimeout(() => {
          _this.$refs.tenantInfoCentralized.getInfo()
        }, 500)
      }
    },
    deleteOkOwner(res) {
      if (res) {
        this.lookTenantDialog = false;
        this.lookOwnerDialog = false;
        this.$emit('refreshinfoFun', true);
        this.getRoomData();
        this.isRefresh = false;
        let _this = this;
        setTimeout(() => {
          _this.$refs.ownerInfoCentralized.getInfo();
        }, 500)
      }
    },
    cancelOwnerDetail() {
      this.lookOwnerDialog = false;
      let _this = this;
      if(this.isRefresh){
        this.getRoomData();
        this.isRefresh = false;
      }
      setTimeout(() => {
        _this.$refs.ownerInfoCentralized.getInfo()
      }, 500)
      // this.saveHouseDetail();
    },
    initTenantContract(val){
      this.tenantContractId = val.id;
    },
    initOwnerContract(val){
      this.ownerContractId = val;
    },
    cancelTenantDetail() {
      this.lookWholeDialog = false;
      let _this = this;
      if(this.isRefresh){
        this.getRoomData();
        this.isRefresh = false;
      }
      setTimeout(() => {
        _this.$refs.tenantInfoCentralized.getInfo()
      }, 500)
      // this.saveHouseDetail();
    },
    cancelBillDetail(){
      this.billDetailDialog = false;
      let _this = this;
      if(this.isRefresh){
        this.getRoomData();
        this.isRefresh = false;
      }
      setTimeout(() => {
        _this.$refs.billInfoCentralized.getInfo()
      }, 500)
    },
    cancelRepairDetail(){
      this.repairDetailDialog = false;
      let _this = this;
      if(this.isRefresh){
        this.getRoomData();
        this.isRefresh = false;
      }
      setTimeout(() => {
        _this.$refs.repairInfoCentralized.getInfo()
      }, 500)
    },
    cancelCleanDetail(){
      this.cleanDetailDialog = false;
      let _this = this;
      if(this.isRefresh){
        this.getRoomData();
        this.isRefresh = false;
      }
      setTimeout(() => {
        _this.$refs.cleanInfoCentralized.getInfo()
      }, 500)
    },
    cancelDistributionDetail(){
      this.distributionDetailDialog = false;
      let _this = this;
      if(this.isRefresh){
        this.getRoomData();
        this.isRefresh = false;
      }
      setTimeout(() => {
        _this.$refs.distributionInfoCentralized.getInfo()
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
    openAll(){
      // console.log(this.roomData)
      let that = this;
      let housePid = this.roomData.id;
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
          API.openCloseAllHouse(sendData).then(res => {
            // console.log(res)
            if (res.code == 200) {
              that.$message.info('激活成功！');
              that.$emit('refreshinfoFun', true);
              that.getRoomData();
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
      let housePid = this.roomData.id;
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
          API.openCloseAllHouse(sendData).then(res => {
            // console.log(res)
            if (res.code == 200) {
              that.$message.info('关闭成功！');
              that.$emit('refreshinfoFun', true);
              that.getRoomData();
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
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
.child-detail {
  padding: 15px 0 0 0;
  height: calc(100vh - 150px);
  overflow: auto;
  .editStyle{
    svg{
      width: 14px;
      height: 14px;
    }
  }
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
    .disableStyle{
      color: red;
    }
    .basic-info {
      .fontColor{
        color:rgba(255,160,54,1);
      }
      .titleDiv{
        height: 22px;
        width: 100%;
        margin: 10px 0;
      }
      .title{
        font-size: 16px;
        color: #111111;
        font-weight: 500;
        margin-right: 10px;
      }
      .warn{
        font-size:12px;
        font-weight:400;
        color:rgba(255,160,54,1);
        margin-left: 3px;
      }
      .deptStyle{
        /deep/ .ant-input{
          padding-left: 0;
        }
      }
      .input-info {
        display: flex;
        flex-wrap: wrap;
        .address {
          display: flex;
          .addressHalfRadius{
            /deep/ .ant-select-selection{
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
          }
        }
        .item {
          margin: 0 52px 20px 0;
          width: 200px;
          & /deep/ .title {
            margin-bottom: 4px;
          }
          & /deep/ .ant-select {
            width: 100%;
          }
          .room-img-list {
            >div {
              height: 116px;
              width: 174px;
              margin-right: 10px;
              margin-bottom: 10px;
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
            /deep/ video {
              width: 172px;
              height: 96px;
              border-radius: 4px;
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
            top:-25px;
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
        .divider{
          width: 958px;
          height: 2px;
          border-top: 1px dashed #DDDDDD;
        }
      }
      .checkAllStyle{
        position: absolute;
        left: 0px;
        top: 5px;
        font-size: 16px;
      }
      .titleStyle{
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
      .selectStyle{
        margin-top: 4px;
        .item{
          width: 234px;
          height: 28px;
          line-height: 28px;
          margin: 0px;
        }
        .selectedStyle{
          font-size: 14px;
          color: #111111;
        }
        .unSelectStyle{
          font-size: 14px;
          color: #777777;
        }
        .quantityStyle{
          height: 28px;
          .commonStyle{
            width: 16px;
            height: 16px;
            line-height: 14px;
            background: #F6F7FB;
            border: 1px solid #EEEEEE;
            text-align: center;
            border-radius: 50%;
            margin-top: 7px;
          }
          .unEditStyle{
            color: #999999;
          }
          .editStyle{
            color: #0A87F8;
          }
          /deep/ .ant-input{
            padding: 4px 0 0 0;
          }
        }
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
  & /deep/ .ant-tabs-nav .ant-tabs-tab {
    padding: 8px 0;
    margin-right: 30px ;
    //span{
    //  margin-right: 30px;
    //}
  }
  & /deep/ .ant-tabs-nav .ant-tabs-tab .anticon{
    margin-right: 4px;
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
  /deep/ .ant-tabs-nav-container-scrolling{
    width: 580px;
  }
}

.bottom {
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
  text-align: center;
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
.status-tags {
  padding: 6px 18px;
  margin-right: 10px;
  border-color: @borderColor!important;
  color: @mainFontColor!important;
  cursor: pointer;
  font-size: 14px;
}
.addon-after-position {
  position: absolute;
  top: 4px;
  z-index: 2;
  font-size: 12px;
}
.active {
  border-color: @themeColor!important;
  color: @themeColor!important;
}
</style>
