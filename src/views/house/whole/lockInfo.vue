<template>
  <div class="lockInfo-box">
    <div v-if="houseType==1||houseType==3">
      <div v-if="!doorLock">
          <div style="margin-top: 66px;text-align: center">
            <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
          </div>
          <div style="margin-top: 19px;color: #BBBBBB;font-size: 14px;text-align: center;">此房间未绑定门锁</div>
          <div class="cursor" @click="goToBind()" style="margin: 16px 0 80px 0;color: #0A87F8;font-size: 14px;text-align: center;">绑定门锁<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
      </div>
      <div v-if="doorLock">
        <div class="lockInfo-detail">
           <div class="lockInfo-detail-head clearfix">
              <div class="title f-fl overHidde" style="max-width: 280px;width: auto;">{{doorLock.custName}}</div>
             <div class="lockIcon radius-font-person f-fl" v-if="doorLock.brand==0">
               <icon-font style="margin-right: 5px;" type="iconmensuo1"/>普通门锁
             </div>
             <div class="lockIcon radius-font-yunding f-fl" v-if="doorLock.brand==1">
               <icon-font style="margin-right: 5px;" type="iconyunding1"/>云丁
             </div>
             <div class="lockIcon radius-font-guojia f-fl" v-if="doorLock.brand==2">
               <icon-font style="margin-right: 5px;" type="iconguojia1"/>果加
             </div>
             <div class="onlineStyle f-fl" v-if="doorLock.onlineStatus==1">在线</div>
             <div class="offLineStyle f-fl" v-if="doorLock.onlineStatus==2">离线</div>
             <div class="f-fl"></div>
             <div v-if="doorLock.brand==0" class="powerStyle f-fl">电量：-</div>
             <div v-if="doorLock.brand==1||doorLock.brand==2" class="powerStyle f-fl">电量：{{doorLock.power}}%</div>
             <div class="unbindStyle cursor f-fr" @click="unBindLock" v-mark="['mk_smartDevices_doorLoc_jb']"><icon-font style="margin-right: 5px;" type="iconjiechu"/>解绑</div>
           </div>
           <div class="lockInfo-info">
              <div>
                <label-item title="设备型号">
                  <span class="txtStyle">{{doorLock.modelName?doorLock.modelName:'-'}}</span>
                </label-item>
              </div>
             <div>
               <label-item title="设备序列号">
                 <span class="txtStyle">{{doorLock.sn?doorLock.sn:'-'}}</span>
               </label-item>
             </div>
             <div>
               <label-item title="设备mac地址">
                 <span class="txtStyle">{{doorLock.mac?doorLock.mac:'-'}}</span>
               </label-item>
             </div>
             <div>
               <label-item title="网关名称">
                 <span class="txtStyle">{{doorLock.gwName?doorLock.gwName:'-'}}</span>
               </label-item>
             </div>
             <div>
               <label-item title="网关状态">
                 <span class="txtStyle" v-if="doorLock.brand==0">-</span>
                 <span class="txtStyle" v-if="(doorLock.brand==1||doorLock.brand==2)&&doorLock.gwOnlineStatus==1">在线</span>
                 <span class="txtStyle" v-if="(doorLock.brand==1||doorLock.brand==2)&&doorLock.gwOnlineStatus==2">离线</span>
               </label-item>
             </div>
           </div>
          <div v-if="doorLock.brand==0">
            <div class="clearfix" style="height: 24px;margin: 24px 0 10px 0;">
              <div class="f-fl" style="height: 24px;line-height: 24px;color: #111111;font-size: 16px;font-weight: 500;">门锁授权记录</div>
              <div class="cursor f-fr" style="color: #0a87f8;font-size: 14px;margin-left: 10px;" @click="editPassword" v-mark="['mk_smartDevices_doorLoc_xgmm']">
                <icon-font type="iconyumengtubiao_bianji-" />
                <span>&nbsp;修改密码</span>
              </div>
              <div class="cursor f-fr" style="color: #0a87f8;font-size: 14px;" @click="getPassword" v-mark="['mk_smartDevices_doorLoc_seemm']">
                <icon-font type="iconyumengtubiao_yanjing-1" />
                <span>&nbsp;查看密码</span>
              </div>
            </div>
            <div style="height: 0px;border-bottom: 1px solid #EEEEEE;">
            </div>
            <div style="text-align: center;margin-top: 60px;">
              <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
            </div>
            <div style="color: #BBBBBB;font-size: 14px;text-align: center;margin: 20px 0 60px 0;">
              此记录仅支持智能门锁
            </div>
          </div>
          <div class="authPasswordList-box clearfix" v-if="doorLock.brand!=0">
            <div v-if="noDataFlag">
              <div class="clearfix" style="height: 24px;margin: 24px 0 10px 0;">
                <div class="f-fl" style="height: 24px;line-height: 24px;color: #111111;font-size: 16px;font-weight: 500;">门锁授权记录</div>
                <div class="cursor f-fr" @click="goToGivePassword" v-mark="['mk_smartDevices_doorLoc_sqmm']" style="height: 24px;line-height: 24px;color: #0A87F8;font-size: 14px;margin-left: 10px;"><icon-font type="iconmima" style="margin-right: 5px;" />密码授权</div>
                <div class="cursor f-fr" style="height: 24px;line-height: 24px;color: #0A87F8;font-size: 14px;" @click="getTempPassword" v-mark="['mk_smartDevices_doorLoc_hqlsmm']">
                  <icon-font type="iconyumengtubiao_zhongzhi" style="margin-right: 5px;" />获取临时密码
                </div>
              </div>
              <div>
                <div style="text-align: center;margin-top: 50px;">
                  <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
                </div>
                <div style="color: #BBBBBB;font-size: 14px;text-align: center;margin: 20px 0 60px 0;">
                  没有密码授权记录哟～
                </div>
              </div>
            </div>
            <div v-if="!noDataFlag">
              <div class="clearfix" style="height: 24px;margin: 24px 0 10px 0;">
                <div class="f-fl" style="height: 24px;line-height: 24px;color: #111111;font-size: 16px;font-weight: 500;">门锁授权记录</div>
                <div class="cursor f-fr" @click="goToGivePassword" v-mark="['mk_smartDevices_doorLoc_sqmm']" style="height: 24px;line-height: 24px;color: #0A87F8;font-size: 14px;margin-left: 10px;"><icon-font type="iconmima" style="margin-right: 5px;" />密码授权</div>
                <div class="cursor f-fr" style="height: 24px;line-height: 24px;color: #0A87F8;font-size: 14px;" @click="getTempPassword" v-mark="['mk_smartDevices_doorLoc_hqlsmm']">
                  <icon-font type="iconyumengtubiao_zhongzhi" style="margin-right: 5px;" />获取临时密码
                </div>
              </div>
              <!--   授权统计   -->
              <div class="status-box">
                <div class="status">
                  <p :class="{ active: activeIndex === 0 }" @click="changeStatus(null,0)">
                    <span >{{ statusData[0].title }}</span>
                  </p>
                  <p :class="{ active: activeIndex === 1 }" @click="changeStatus(1,1)">
                    <span >{{ statusData[1].title }}</span>
                    <span :style="{ color: statusData[1].color }">({{ statusData[1].status }})</span>
                  </p>
                  <p :class="{ active: activeIndex === 2 }" @click="changeStatus(2,2)">
                    <span >{{ statusData[2].title }}</span>
                    <span :style="{ color: statusData[2].color }">({{ statusData[2].status }})</span>
                  </p>
                  <p :class="{ active: activeIndex === 3 }" @click="changeStatus(4,3)">
                    <span >{{ statusData[3].title }}</span>
                    <span :style="{ color: statusData[3].color }">({{ statusData[3].status }})</span>
                  </p>
                  <p :class="{ active: activeIndex === 4 }" @click="changeStatus(3,4)">
                    <span >{{ statusData[4].title }}</span>
                  </p>
                </div>
              </div>
              <!--  授权列表 -->
              <div class="table">
                <a-table rowKey="id" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                  <div slot="status" slot-scope="status">
                    <div v-if="status==1" class="status1">
                      待生效
                    </div>
                    <div v-if="status==2" class="status2">
                      生效中
                    </div>
                    <div v-if="status==3" class="status4">
                      已过期
                    </div>
                    <div v-if="status==4" class="status3">
                      已冻结
                    </div>
                  </div>
                  <div slot="authType" slot-scope="authType">
                    {{ authType|authTypeVal}}
                  </div>
                  <div slot="startTime" slot-scope="text,record">
                    {{$moment(record.startTime).format('YYYY.MM.DD HH:mm')}} ~ {{$moment(record.endTime).format('YYYY.MM.DD HH:mm')}}
                  </div>
                  <div slot="personName" slot-scope="text,record">
                    {{ record.personName}} ~ {{record.personPhone}}
                  </div>
                  <div slot="createTime" slot-scope="text">
                    {{$moment(text).format('YYYY.MM.DD HH:mm')}}
                  </div>
                  <div slot="comment" slot-scope="text">
                    <a-popover>
                      <template slot="content">
                        <p class="action">{{text}}</p>
                      </template>
                      <div class="overHidde" style="max-width:110px;">
                        {{text?text:'-'}}
                      </div>
                    </a-popover>
                  </div>
                  <div slot="action" slot-scope="text, record">
                    <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
                      <template slot="content" >
                        <div @click="unfrozen(record)" v-if="record.btnArr.indexOf('1') != -1" class="action cursor" >解冻</div>
                        <div @click="frozen(record)" v-if="record.btnArr.indexOf('2') != -1" class="action cursor" >冻结</div>
                        <div @click="deleteAuthPassword(record)" v-if="record.btnArr.indexOf('3') != -1" class="action cursor" >删除</div>
                      </template>
                      <div style="width: 100%;height: 100%">
                        <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                      </div>
                    </a-popover>
                  </div>
                </a-table>
                <div class="contFoot" v-show="tableData.length>0">
                  <a-pagination size="small" :total="pagination.total" :current="pagination.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                </div>
                <div style="height: 104px;" v-show="tableData.length==0">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="houseType==2">
      <div class="doorAllStyle clearfix">
        <div v-for="(item,index) in shareLockList" @click="changeHouseId(item)" :key="item.houseId" class="item f-fl cursor" :style="index==shareLockList.length-1?'margin-right:0;':''" :class="houseId == item.houseId?'selectHouseIdStyle':'unSelectHouseIdStyle'">
          {{item.roomName=='大门'?item.roomName:item.roomName+'间'}}
        </div>
      </div>
      <div v-if="!doorLock">
        <div class="lockInfo-detail">
          <div style="margin-top: 66px;text-align: center">
            <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
          </div>
          <div style="margin-top: 19px;color: #BBBBBB;font-size: 14px;text-align: center;">{{roomName=='大门'?roomName:roomName+'间'}}未绑定门锁</div>
          <div class="cursor" @click="goToBind()" style="margin: 16px 0 80px 0;color: #0A87F8;font-size: 14px;text-align: center;">绑定门锁<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
        </div>
      </div>
      <div v-if="doorLock">
        <div class="lockInfo-detail">
          <div class="lockInfo-detail-head clearfix">
            <div class="title f-fl overHidde" style="max-width: 280px;width: auto;">{{doorLock.custName}}</div>
            <div class="lockIcon radius-font-person f-fl" v-if="doorLock.brand==0">
              <icon-font style="margin-right: 5px;" type="iconmensuo1"/>普通门锁
            </div>
            <div class="lockIcon radius-font-yunding f-fl" v-if="doorLock.brand==1">
              <icon-font style="margin-right: 5px;" type="iconyunding1"/>云丁
            </div>
            <div class="lockIcon radius-font-guojia f-fl" v-if="doorLock.brand==2">
              <icon-font style="margin-right: 5px;" type="iconguojia1"/>果加
            </div>
            <div class="onlineStyle f-fl" v-if="doorLock.onlineStatus==1">在线</div>
            <div class="offLineStyle f-fl" v-if="doorLock.onlineStatus==2">离线</div>
            <div class="f-fl"></div>
            <div v-if="doorLock.brand==0" class="powerStyle f-fl">电量：-</div>
            <div v-if="doorLock.brand==1||doorLock.brand==2" class="powerStyle f-fl">电量：{{doorLock.power}}%</div>
            <div class="unbindStyle cursor f-fr" @click="unBindLock" v-mark="['mk_smartDevices_doorLoc_jb']"><icon-font style="margin-right: 5px;" type="iconjiechu"/>解绑</div>
          </div>
          <div class="lockInfo-info">
            <div>
              <label-item title="设备型号">
                <span class="txtStyle">{{doorLock.modelName?doorLock.modelName:'-'}}</span>
              </label-item>
            </div>
            <div>
              <label-item title="设备序列号">
                <span class="txtStyle">{{doorLock.sn?doorLock.sn:'-'}}</span>
              </label-item>
            </div>
            <div>
              <label-item title="设备mac地址">
                <span class="txtStyle">{{doorLock.mac?doorLock.mac:'-'}}</span>
              </label-item>
            </div>
            <div>
              <label-item title="网关名称">
                <span class="txtStyle">{{doorLock.gwName?doorLock.gwName:'-'}}</span>
              </label-item>
            </div>
            <div>
              <label-item title="网关状态">
                <span class="txtStyle" v-if="doorLock.gwOnlineStatus==1">在线</span>
                <span class="txtStyle" v-if="doorLock.gwOnlineStatus==2">离线</span>
              </label-item>
            </div>
          </div>
          <div v-if="doorLock.brand==0">
            <div class="clearfix" style="height: 24px;margin: 24px 0 10px 0;">
              <div class="f-fl" style="height: 24px;line-height: 24px;color: #111111;font-size: 16px;font-weight: 500;">门锁授权记录</div>
              <div class="cursor f-fr" style="color: #0a87f8;font-size: 14px;margin-left: 10px;" @click="editPassword" v-mark="['mk_smartDevices_doorLoc_xgmm']">
                <icon-font type="iconyumengtubiao_bianji-" />
                <span>&nbsp;修改密码</span>
              </div>
              <div class="cursor f-fr" style="color: #0a87f8;font-size: 14px;" @click="getPassword" v-mark="['mk_smartDevices_doorLoc_seemm']">
                <icon-font type="iconyumengtubiao_yanjing-1" />
                <span>&nbsp;查看密码</span>
              </div>
            </div>
            <div style="height: 0px;border-bottom: 1px solid #EEEEEE;">
            </div>
            <div style="text-align: center;margin-top: 60px;">
              <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
            </div>
            <div style="color: #BBBBBB;font-size: 14px;text-align: center;margin: 20px 0 60px 0;">
              此记录仅支持智能门锁
            </div>
          </div>
          <div class="authPasswordList-box clearfix" v-if="doorLock.brand!=0">
            <div v-if="noDataFlag">
              <div class="clearfix" style="height: 24px;margin: 24px 0 10px 0;">
                <div class="f-fl" style="height: 24px;line-height: 24px;color: #111111;font-size: 16px;font-weight: 500;">门锁授权记录</div>
                <div class="cursor f-fr" @click="goToGivePassword" v-mark="['mk_smartDevices_doorLoc_sqmm']" style="height: 24px;line-height: 24px;color: #0A87F8;font-size: 14px;margin-left: 10px;"><icon-font type="iconmima" style="margin-right: 5px;" />密码授权</div>
                <div class="cursor f-fr" style="height: 24px;line-height: 24px;color: #0A87F8;font-size: 14px;" @click="getTempPassword" v-mark="['mk_smartDevices_doorLoc_hqlsmm']">
                  <icon-font type="iconyumengtubiao_zhongzhi" style="margin-right: 5px;" />获取临时密码
                </div>
              </div>
              <div>
                <div style="text-align: center;margin-top: 50px;">
                  <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
                </div>
                <div style="color: #BBBBBB;font-size: 14px;text-align: center;margin: 20px 0 60px 0;">
                  没有密码授权记录哟～
                </div>
              </div>
            </div>
            <div v-if="!noDataFlag">
              <div class="clearfix" style="height: 24px;margin: 24px 0 10px 0;">
                <div class="f-fl" style="height: 24px;line-height: 24px;color: #111111;font-size: 16px;font-weight: 500;">门锁授权记录</div>
                <div class="cursor f-fr" @click="goToGivePassword" v-mark="['mk_smartDevices_doorLoc_sqmm']" style="height: 24px;line-height: 24px;color: #0A87F8;font-size: 14px;margin-left: 10px;"><icon-font type="iconmima" style="margin-right: 5px;" />密码授权</div>
                <div class="cursor f-fr" style="height: 24px;line-height: 24px;color: #0A87F8;font-size: 14px;" @click="getTempPassword" v-mark="['mk_smartDevices_doorLoc_hqlsmm']">
                  <icon-font type="iconyumengtubiao_zhongzhi" style="margin-right: 5px;" />获取临时密码
                </div>
              </div>
              <!--   授权统计   -->
              <div class="status-box">
                <div class="status">
                  <p :class="{ active: activeIndex === 0 }" @click="changeStatus(null,0)">
                    <span >{{ statusData[0].title }}</span>
                  </p>
                  <p :class="{ active: activeIndex === 1 }" @click="changeStatus(1,1)">
                    <span >{{ statusData[1].title }}</span>
                    <span :style="{ color: statusData[1].color }">({{ statusData[1].status }})</span>
                  </p>
                  <p :class="{ active: activeIndex === 2 }" @click="changeStatus(9,2)">
                    <span >{{ statusData[2].title }}</span>
                    <span :style="{ color: statusData[2].color }">({{ statusData[2].status }})</span>
                  </p>
                  <p :class="{ active: activeIndex === 3 }" @click="changeStatus(4,3)">
                    <span >{{ statusData[3].title }}</span>
                    <span :style="{ color: statusData[3].color }">({{ statusData[3].status }})</span>
                  </p>
                  <p :class="{ active: activeIndex === 4 }" @click="changeStatus(3,4)">
                    <span >{{ statusData[4].title }}</span>
                  </p>
                </div>
              </div>
              <!--  授权列表 -->
              <div class="table">
                <a-table rowKey="id" :bordered="true" :pagination="false" :columns="tableColumns" :dataSource="tableData">
                  <div slot="status" slot-scope="status">
                    <div v-if="status==1" class="status1">
                      待生效
                    </div>
                    <div v-if="status==2" class="status2">
                      生效中
                    </div>
                    <div v-if="status==3" class="status4">
                      已过期
                    </div>
                    <div v-if="status==4" class="status3">
                      已冻结
                    </div>
                  </div>
                  <div slot="authType" slot-scope="authType">
                    {{ authType|authTypeVal}}
                  </div>
                  <div slot="startTime" slot-scope="text,record">
                    {{$moment(record.startTime).format('YYYY.MM.DD HH:mm')}} ~ {{$moment(record.endTime).format('YYYY.MM.DD HH:mm')}}
                  </div>
                  <div slot="personName" slot-scope="text,record">
                    {{ record.personName}} ~ {{record.personPhone}}
                  </div>
                  <div slot="createTime" slot-scope="text">
                    {{$moment(text).format('YYYY.MM.DD HH:mm')}}
                  </div>
                  <div slot="comment" slot-scope="text">
                    <a-popover>
                      <template slot="content">
                        <p>{{text}}</p>
                      </template>
                      <div class="overHidde" style="max-width:110px;">
                        {{text?text:'-'}}
                      </div>
                    </a-popover>
                  </div>
                  <div slot="action" slot-scope="text, record">
                    <a-popover :title="null" trigger="hover" v-if="checkOpts(record) == true">
                      <template slot="content" >
                        <div @click="unfrozen(record)" v-if="record.btnArr.indexOf('1') != -1" class="action cursor" >解冻</div>
                        <div @click="frozen(record)" v-if="record.btnArr.indexOf('2') != -1" class="action cursor" >冻结</div>
                        <div @click="deleteAuthPassword(record)" v-if="record.btnArr.indexOf('3') != -1" class="action cursor" >删除</div>
                      </template>
                      <div style="width: 100%;height: 100%">
                        <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                      </div>
                    </a-popover>
                  </div>
                </a-table>
                <div class="contFoot" v-show="tableData.length>0">
                  <a-pagination size="small" :total="pagination.total" :current="pagination.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                </div>
                <div style="height: 104px;" v-show="tableData.length==0">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 绑定门锁 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="bindLockDialog" class="ownModalBorder titDialog" title="绑定门锁">
      <bind-lock :roomData="formatRoomData" :houseType="houseType" :roomName="roomName" @cancelBind="cancelBind" @bindSuccess="bindSuccess"></bind-lock>
    </a-modal>
    <!-- 查看密码/临时密码 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="getPasswordDialog" class="ownModalBorder titDialog" :title="getPasswordTitle">
      <view-password :lock-id="lockId" :fullAddress="fullAddress" :brand="brand" @closeThis="closeView"></view-password>
    </a-modal>
    <!-- 修改密码 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="editPasswordDialog" class="ownModalBorder titDialog" title="修改门锁密码">
      <edit-password :lock-id="lockId"  @closeThis="closeEdit" @editPasswordSuccess="editPasswordSuccess"></edit-password>
    </a-modal>
    <!-- 授权密码 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="givePasswordDialog" class="ownModalBorder titDialog" title="密码授权">
      <give-password :brand="brand" :lockId="lockId" :roomLockInfo="roomLockInfo" @cancelGive="cancelGive" @giveSuccess="giveSuccess"></give-password>
    </a-modal>
    <!-- 操作结果 -->
    <a-modal destroyOnClose centered :footer="null" :closable="false" :maskClosable="false" width="520px" v-model="operateResultDialog" class="ownModalBorder" title="">
      <auth-password-operate-result :operateType="operateType" @closeThis="closeOperateResult"></auth-password-operate-result>
    </a-modal>
  </div>
</template>

<script>
import BindLock from '../../smartDevices/lock/bindLock';
import ViewPassword from '../../smartDevices/lock/viewPassword';
import EditPassword from '../../smartDevices/lock/editPassword';
import GivePassword from '../../smartDevices/lock/givePassword';
import AuthPasswordOperateResult from '../../smartDevices/lock/authPasswordOperateResult';
import * as API from "@/api/smartDevices";
export default {
  name: "lockInfo",
  components: {
    BindLock,
    ViewPassword,
    EditPassword,
    GivePassword,
    AuthPasswordOperateResult,
  },
  props: {
    houseType:{
      type:Number,
      required: true,
    },
    roomData:{
      type:Object,
      required:true,
    }
  },
  data() {
    return {
      bindLockDialog:false,
      statusData: [
        {
          title: '全部',
          status: 0,
          string: 'dataTotal',
          query: null,
        },
        {
          title: '待生效 ',
          status: 0,
          string: 'beEffectiveTotal',
          query: 1,
          color: '#FFA036'
        },
        {
          title: '生效中',
          status: 0,
          string: 'inEffectiveTotal',
          query: 2,
          color: '#0A87F8'
        },
        {
          title: '已冻结',
          status: 0,
          string: 'frozenTotal',
          query: 4,
          color: '#FB4246'
        },
        {
          title: '已过期',
          status: 0,
          string: 'offlineTotal',
          query: 3,
          color: '#FB4246'
        },
      ],
      activeIndex:0,
      sendData:{
        current:1,
        size:10,
        status:undefined,
        doorLockId:'',
      },
      tableData:[],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      tableColumns:[
        {
          title: '密码状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
          align: 'left',
          width: '71px'
        },
        {
          title: '授权类型',
          dataIndex: 'authType',
          key: 'authType',
          scopedSlots: { customRender: 'authType' },
          align: 'left',
          width: '70px'
        },
        {
          title: '授权期限',
          dataIndex: 'startTime',
          key: 'startTime',
          scopedSlots: { customRender: 'startTime' },
          align: 'left',
          width: '252px'
        },
        {
          title: '被授权人信息',
          dataIndex: 'personName',
          key: 'personName',
          scopedSlots: { customRender: 'personName' },
          align: 'left',
          width: '167px'
        },
        {
          title: '授权人',
          dataIndex: 'creater',
          key: 'creater',
          align: 'left',
          width: '80px'
        },
        {
          title: '授权时间',
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' },
          align: 'left',
          width: '123px'
        },
        {
          title: '备注',
          dataIndex: 'comment',
          key: 'comment',
          scopedSlots: { customRender: 'comment' },
          align: 'left',
          width: '128px'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: '55px',
          customCell:() =>{
            return {
              on:{
                click:()=>{
                  event.stopPropagation();
                }
              }
            }
          },
        },
      ],
      noDataFlag:true,
      permissions:[],
      getPasswordDialog:false,
      getPasswordTitle:'查看密码',
      editPasswordDialog:false,
      fullAddress:'',
      givePasswordDialog:false,
      roomLockInfo:{},
      shareLockList:[],
      lockId:'',
      brand:'',
      doorLock:undefined,
      roomName:'',
      houseId:'',
      formatRoomData:{},
      tempFullAddress:'',         //用于合租
      operateResultDialog:false,
      operateType:1,      //1、删除；2、冻结；3、解冻
    }
  },
  created() {
    this.initData(true);
  },
  mounted() {

  },
  methods: {
    initData(flag){
      this.fullAddress = this.roomData.cityName + this.roomData.areaName + this.roomData.fullAddress;
      if (this.houseType == 1 || this.houseType == 3) {
        this.doorLock = this.roomData.doorLock;
        if(this.doorLock){
          this.lockId = this.doorLock.id;
          this.brand = this.doorLock.brand;
        }
        if (this.doorLock && this.doorLock.brand != 0 && this.doorLock.id) {
          this.roomLockInfo = {
            houseType: this.houseType,
            doorLock: this.doorLock,
            cityName: this.roomData.cityName,
            areaName: this.roomData.areaName,
            fullAddress: this.roomData.fullAddress,
          };
          this.sendData.doorLockId = this.doorLock.id;
          this.initAuthData(true);
        }
        this.formatRoomData = {
          houseAlias:this.roomData.houseAlias,
          cityName:this.roomData.cityName,
          areaName:this.roomData.areaName,
          fullAddress:this.roomData.fullAddress,
          id:this.roomData.id,
        };
      }
      if(this.houseType == 2){
        if(this.roomData.housePid){
          //获取门锁相关信息
          if(flag){
            this.houseId = this.roomData.id;
            this.formatRoomData = {
              houseAlias:this.roomData.houseAlias,
              cityName:this.roomData.cityName,
              areaName:this.roomData.areaName,
              fullAddress:this.roomData.fullAddress,
              id:this.roomData.id,
            };
            let roomName = this.roomData.roomName + '间';
            let address = this.roomData.fullAddress.split(roomName);
            this.tempFullAddress = address[0];
          }
          if(!this.tempFullAddress){
            let roomName = this.roomData.roomName + '间';
            let address = this.roomData.fullAddress.split(roomName);
            this.tempFullAddress = address[0];
          }
          let selectedHouseIdList = [];
          if(this.houseId == this.roomData.housePid){
            selectedHouseIdList.push(this.houseId);
          }
          else{
            selectedHouseIdList.push(this.roomData.housePid);
            selectedHouseIdList.push(this.houseId);
          }
          this.roomLockInfo = {
            houseType: this.houseType,
            cityName:this.roomData.cityName,
            areaName:this.roomData.areaName,
            fullAddress:this.tempFullAddress,
            selectedHouseIdList:selectedHouseIdList,
            pid:this.roomData.housePid,
          };
          this.initShareLockList();
        }
      }
    },
    changeHouseId(item){
      this.houseId = item.houseId;
      this.doorLock = item.doorLock;
      if(this.doorLock){
        this.lockId = this.doorLock.id;
        this.brand = this.doorLock.brand;
      }
      this.roomName = item.roomName;
      this.formatRoomData.id = item.houseId;
      let selectedHouseIdList = [];
      if(item.houseId == this.roomData.housePid){
        this.formatRoomData.fullAddress = this.tempFullAddress + '大门';
        selectedHouseIdList.push(this.houseId);
      }
      else{
        selectedHouseIdList.push(this.roomData.housePid);
        selectedHouseIdList.push(this.houseId);
        this.roomData.roomList.forEach((temp)=>{
          if(temp.id == item.houseId){
            this.formatRoomData.fullAddress = this.tempFullAddress + temp.roomName+'间';
          }
        })
      }
      this.roomLockInfo.selectedHouseIdList = selectedHouseIdList;
    },
    initShareLockList(){
      API.listHousedoorLock({id:this.roomData.housePid}).then(res => {
        if (res&&res.code === "200") {
          this.shareLockList = res.data;
          let id  = '';
          if(this.houseId){
            id = this.houseId
          }
          else{
            id = this.roomData.id
          }
          this.shareLockList.forEach((item)=>{
            if(item.houseId == id){
              this.doorLock = item.doorLock;
              if(this.doorLock){
                this.brand = this.doorLock.brand;
                this.sendData.doorLockId = this.doorLock.id;
                this.lockId = this.doorLock.id;
                this.initAuthData(true);
              }
              this.roomName = item.roomName;
            }
          });
          this.roomLockInfo.shareLockList = res.data;
        }
      })
    },
    getTempPassword(){
      this.getPasswordDialog = true;
      this.getPasswordTitle = '临时密码';
    },
    goToGivePassword(){
      this.givePasswordDialog = true;
    },
    cancelGive(){
      this.givePasswordDialog = false;
    },
    giveSuccess(){
      this.givePasswordDialog = false;
      this.initAuthData();
    },
    editPasswordSuccess(){
      this.editPasswordDialog = false;
    },
    closeEdit(){
      this.editPasswordDialog = false;
    },
    closeView(){
      this.getPasswordDialog = false;
    },
    unBindLock(){
      let _this = this;
      let id = this.doorLock.id;
      this.$modal.confirm({
        title: '确定要将房源"' + this.fullAddress + '"的门锁解绑吗？',
        content: '解绑后，该门锁上的授权密码记录将会全部删除',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.doorLockUnbind({id:id}).then(res => {
            if (res.code == 200) {
              _this.$message.success('解绑成功！');
              _this.$emit('unBindSuccess');
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    getPassword(){
      this.getPasswordDialog = true;
      this.getPasswordTitle = '查看密码';
    },
    editPassword(){
      this.editPasswordDialog = true;
    },
    goToBind(){
      this.bindLockDialog = true;
    },
    cancelBind(){
      this.bindLockDialog = false;
    },
    bindSuccess(){
      this.bindLockDialog = false;
      this.$emit('bindSuccess');
    },
    unfrozen(record){
      let _this = this;
      let id = record.id;
      this.operateType = 3;
      this.$modal.confirm({
        title: '确定要将「' + record.personName + '-' + record.personPhone + '」的门锁密码解冻吗？',
        content: '解冻后，此密码将可继续使用',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.pwdAuthUnfrozen({id:id}).then(res => {
            if (res.code == 200) {
              _this.operateResultDialog = true;
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    frozen(record){
      let _this = this;
      let id = record.id;
      this.operateType = 2;
      this.$modal.confirm({
        title: '确定要冻结「' + record.personName + '-' + record.personPhone + '」的门锁密码吗？',
        content: '冻结后，此密码将不可再开门',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.pwdAuthFrozen({id:id}).then(res => {
            if (res.code == 200) {
              _this.operateResultDialog = true;
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    closeOperateResult(){
      this.operateResultDialog = false;
      this.initAuthData();
    },
    deleteAuthPassword(record){
      let _this = this;
      let id = record.id;
      this.operateType = 1;
      this.$modal.confirm({
        title: '确定要删除「' + record.personName + '-' + record.personPhone + '」的门锁密码吗？',
        content: '删除后，在授权记录里将永久删除；不可恢复，请谨慎操作',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.pwdAuthRemove({id:id}).then(res => {
            if (res.code == 200) {
              _this.operateResultDialog = true;
            }
          })
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    checkOpts(record){
      if(!this.permissions||this.permissions.length==0){
        this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
      }
      let markArr = ['mk_smartDevices_doorLoc_jdsqmm','mk_smartDevices_doorLoc_djsqmm','mk_smartDevices_doorLoc_scsqmm'];
      let btnArr = [];
      markArr.forEach(ele => {
        this.permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_smartDevices_doorLoc_jdsqmm'&&(record.status==4)){
              btnArr.push('1');
            }
            if(value.mark == 'mk_smartDevices_doorLoc_djsqmm'&&(record.status==2)){
              btnArr.push('2');
            }
            if(value.mark == 'mk_smartDevices_doorLoc_scsqmm'){
              btnArr.push('3');
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
      this.pwdAuthList();
    },
    onShowSizeChange(current, pageSize){
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.pagination.current = current;
      this.pwdAuthList();
    },
    initAuthData(flag){
      this.pwdAuthListStat();
      this.pwdAuthList(flag);
    },
    pwdAuthListStat(){
      API.pwdAuthListStat({id:this.sendData.doorLockId}).then(res => {
        if (res.code === '200') {
          let count = res.data;
          for (let item of this.statusData) {
            item.status = count[item.string];
          }
        }
      })
    },
    pwdAuthList(flag){
      API.pwdAuthList(this.sendData).then(res => {
        if (res&&res.code === "200") {
          const checkRes = res.data;
          this.tableData = checkRes.records;
          this.pagination.total = res.data.total;
          if(flag){
            if(this.tableData.length==0){
              this.noDataFlag = true;
            }
            else{
              this.noDataFlag = false;
            }
          }
        }
      })
    },
    changeStatus(status,index){
      if(this.activeIndex == index){
        return ;
      }
      else{
        this.sendData.current = 1;
        this.pagination.current = 1;
        this.activeIndex = index;
        this.sendData.status = status;
        this.pwdAuthList();
      }
    },
  },
  filters: {
    authTypeVal(val) {
      return val == 1 ? '看房' : val == 2 ? '入住' : val == 3 ? '维修' : val == 4 ? '保洁' : val == 5 ? '配货' : val == 9 ? '其他' : '-';
    },
  },
  watch:{
    roomData(){
      this.initData(true);
    },
  },
}
</script>

<style scoped lang="less">
  .lockInfo-box{
    .doorAllStyle{
      height: 30px;
      overflow-x: auto;
      .item{
        width: 88px;
        height: 30px;
        line-height: 30px;
        border-radius: 10px 10px 0px 0px;
        font-size: 14px;
        text-align: center;
        margin-right: 2px;
      }
      .selectHouseIdStyle{
        color: #0A87F8;
        background: fade(#0A87F8, 10%);
      }
      .unSelectHouseIdStyle{
        color: #777777;
        background: #F4F4F4;
      }
    }
    .lockInfo-detail{
      margin-bottom: 20px;
      padding: 15px;
      border-radius: 4px;
      border: 1px solid #F4F4F4;
      .lockInfo-detail-head{
        padding-bottom: 10px;
        border-bottom: 1px solid #F6F7FB;
        .title{
          color: #111111;
          font-size: 16px;
          font-weight: 500;
        }
        .lockIcon{
          margin-left: 30px;
          font-size: 12px;
          color: #111111;
          i{
            vertical-align: -0.3em;
          }
          svg{
            width: 18px;
            height: 18px;
          }
        }
        .radius-font-person {
          svg{
            color: #0A87F8;
          }

        }
        .radius-font-yunding {
          svg {
            color: #14AEB8;
          }
        }
        .radius-font-guojia {
          svg {
            color: #424242;
          }
        }
        .onlineStyle{
          color: #0A87F8;
          background-color: fade(#0A87F8, 10%);
          width: 40px;
          border-radius: 2px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          margin: 3px 10px 0 15px;
          font-size: 12px;
        }
        .offLineStyle{
          color: #777777;
          background-color: fade(#777777, 10%);
          width: 40px;
          border-radius: 2px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          margin: 3px 10px 0 15px;
          font-size: 12px;
        }
        .powerStyle{
          color: #999999;
          font-size: 14px;
        }
        .unbindStyle{
          color: #0A87F8;
          font-size: 14px;
          svg{
            width: 14px;
            height: 14px;
          }
        }
        div{
          height: 24px;
          line-height: 24px;
        }
      }
      .lockInfo-info{
        padding: 25px 0;
        border-bottom: 1px dashed #EEEEEE;
        display: flex;
        div{
          flex: 1;
        }
        .txtStyle{
          color: #111111;
          font-size: 12px;
        }
      }
      .authPasswordList-box{
        .status-box{
          margin-bottom: 10px;
          .status {
            display: flex;
            .active {
              color: #0A87F8;
              border-bottom: 2px solid #0A87F8;
            }
            &>p {
              box-sizing: border-box;
              margin-right: 20px;
              height: 30px;
              line-height: 30px;
              cursor: pointer;
              .leftLine{
                border-left: 1px dashed #dddddd;
                padding-left: 20px;
              }
            }
          }
        }
        .table{
          & /deep/ .ant-table-thead>tr>th{
            padding: 8px 7px;
            color: #777777;
            font-size: 13px;
            height: 40px;
          }
          & /deep/.ant-table-tbody>tr>td {
            padding: 8px 7px;
            color: #777777;
            font-size: 13px;
          }
          .status1{
            color: #FFA036;
          }
          .status2{
            color: #0A87F8;
          }
          .status3{
            color: #FB4246;
          }
          .status4{
            color: #777777;
          }
          & /deep/ .ant-popover {
            .ant-popover-inner-content {
              text-align: center;
              padding: 5px 0;
              .action {
                padding: 5px 10px;
              }
              .action:hover {
                cursor: pointer;
                background: rgba(10, 135, 248, 0.1);
              }
            }
          }
          .contFoot {
            margin: 30px 20px 50px 0;
            width: 100%;
            height: 24px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            // bottom: 0px;
            // right: 0;
            background-color: #fff;
            & /deep/ .ant-pagination {
              margin-right: 11px;
            }
          }
        }

      }
    }
  }
</style>