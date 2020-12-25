<template>
    <!-- 合租 -->
    <div>
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <div class="add-btn-wrap" @click="addHouse" v-mark="['mk_house_centralized_tjxm']">
            <icon-font type="iconyumengtubiao_tianjia"/>
            添加房源
        </div>
        <content-top>
            <top-status class="f-fl" :activeIndex="statusActiveIndex" :statusData="statusData" :projectList="projectList" ref="topStatus"
                        @editHouse="editHouse"  @changeStatus="changeStatus" @changeProject="changeProject" @removeRefreshPage="removeRefreshPage">
            </top-status>
            <div class="f-fr moreStyle cursor">
              <a-popover v-if="showMoreFlag" :title="null" trigger="hover" placement="bottomLeft">
                <template slot="content">
                  <div class="action cursor" @click="exportExcel">导出</div>
                  <div class="action cursor" @click="changeViewMode">{{modeTitle}}</div>
                  <div class="action cursor" @click="goProjectList">项目管理</div>
                </template>
                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
              </a-popover>
              <icon-font v-else type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
            </div>
            <search-dialog style="margin-right: 10px;" deptTitle="项目维护人" :deptEmpTitleOtherFlag="true" deptPlaceholder="请选择项目维护人或维护人所属部门" ref="searchDialogId" resMark="mk_house_centralized" :showDeptEmp="true" :showEmployee="true" :searchList="searchList" @search="searchHouseList" class="f-fr" placeholder="项目名称/房间号/租客姓名/租客电话/业主姓名/业主电话/标签"></search-dialog>
        </content-top>
        <SkeletonCentralized v-show="!isListMode&&spinLoading"></SkeletonCentralized>
        <content-main v-show="!isListMode&&!spinLoading" id="contentScroll">
            <ul class="house-list">
                <a-empty v-show="!houseDiagram.length" style="margin-top:100px;"/>
                <div v-show="!houseDiagram.length&&searchConditionFlag&&!this.currentBuildingProjectId" style="margin-top: 18px;" v-mark="['mk_house_centralized_tjxm']">
                  <div class="goAddStyle cursor" @click="addHouse">去添加<icon-font style="margin-left: 4px;" type="iconyumengtubiao_zhishi"/></div>
                </div>
                <div v-mark="['mk_house_centralized_bjxm','mk_house_centralized_scxm']" v-if="this.currentBuildingProjectId&&!houseDiagram.length&&searchConditionFlag" class="house-child-list-noData">
                  <div v-mark="['mk_house_centralized_bjxm']" class="house-child-list-noData1 cursor" @click="goConfigForNoRoom()">赶紧去配置吧</div>
                  <div style="height: 20px;"></div>
                  <div v-mark="['mk_house_centralized_scxm']" class="house-child-list-noData2 cursor" @click="deleteThisProject()"><icon-font style="color: #FB4246;margin-right: 4px;" type="iconyumengtubiao_shanchu-" />删除项目</div>
                </div>
                <div v-for="(temp,index) in houseDiagram" :key="index" style="margin-bottom:20px;border-bottom: 1px solid #eeeeee;">
                    <div class="pos-top clearfix">
                      <div class="f-fl">
                        <p>
                          <icon-font class="position-icon" type="iconyumengtubiao_dingwei"/>
                          <span style="color: #111;font-size: 16px;">{{temp.buildigProjectName}}</span>
                          <span style="color: #666666">（{{temp.cityName}}-{{temp.areaName}}-{{temp.townName}}）</span>
                        </p>
                      </div>
                      <div class="f-fr pos-top-projectStyle" v-mark="['mk_house_centralized_bjxm','mk_house_centralized_scxm']">
                        <a-popover>
                          <template slot="content">
                            <div class="action cursor" @click="goEditProject(temp.buildigProjectId,1)" v-mark="['mk_house_centralized_bjxm']">编辑项目</div>
                            <div class="action cursor" @click="goEditProject(temp.buildigProjectId,2)" v-mark="['mk_house_centralized_bjxm']">配置房间</div>
                            <div class="action cursor" @click="deleteProject(temp.buildigProjectId,temp.buildigProjectName)" v-mark="['mk_house_centralized_scxm']">删除项目</div>
                          </template>
                            <div class="pos-top-projectStyle-item cursor"><icon-font style="margin-right: 4px;" type="iconyumengtubiao_gengduo-1" />管理项目</div>
                          </a-popover>
                      </div>
                      <div class="f-fr pos-top-splitStyle" v-mark="['mk_house_centralized_bjxm','mk_house_centralized_scxm']">
                      </div>
                      <div class="f-fr">
                        共 <span class="f-ftc-blue">{{temp.roomNum}}</span> 间，出租率：<span class="f-ftc-blue">{{temp.rentRate}}</span>
                      </div>
                    </div>
                    <li v-for="(item) in temp.floorList" style="margin-bottom: 0px;">
                      <div class="list-top f-clearfix">
                          <div class="f-fl f-clearfix house-info">
                              <p class="f-fl">
                                  <span style="color: #111111">{{item.floor}}层  </span><span style="color: #666666">（{{item.roomList.length}}间）</span>
                              </p>
                          </div>
                      </div>
                      <ul class="house-child-list f-clearfix">
                          <li :style="{ borderLeftColor: child.status == 1 ? '#FB4246'
                                                          : child.status == 2 ? '#FB4246'
                                                          : child.status == 3 ? '#03C683'
                                                          : child.status == 4 ? '#FFAF6D'
                                                          : child.status == 5 ? '#666666'
                                                          : child.status == 6 ? '#666666'
                                                          : child.status == 7 ? '#666666'
                                                          : child.status == 8 ? '#666666'
                                                          : '#666666' }"
                              class="f-fl house-status"
                              v-for="(child,i) in item.roomList"
                              :key="i"
                              @click="openInfo(temp,item,child)"
                          >
                              <div>
  <!--                                <p>{{child.buildingNo}}栋 {{child.unit}}单元 {{child.doorplate}}室</p>-->
                                  <p class="overHidde">{{child.roomName}}-{{child.roomTypeName}}</p>
                                  <p v-if="!child.renterContract.renterContractId">{{child.orientationName}}-{{child.houseArea}}㎡-￥{{child.actualPrice/100}}元/月</p>
                                  <p v-if="child.renterContract.renterContractId" style="max-width: 140px;" class="overHidde">￥{{child.renterContract.renterContractPrice/100}}元/月 ({{child.renterContract.renterName}})</p>
                                  <p v-if="child.status == 1 || child.status == 2">
                                      <icon-font v-if="child.vacantDays >= 30" class="house-status-icon"
                                                 style="color: #FB4246" type="iconyumengtubiao_kongzhi"/>
                                      空置
                                      <span style="color: #FB4246">{{child.vacantDays?child.vacantDays+' 天':''}}</span>
                                  </p>
                                  <p v-if="child.status == 3">    <!-- 已租 -->
                                      <span style="color: #0A87F8"
                                            v-if="!child.renterContract.renterContractId">待录租客合同…</span>
  <!--                                    <span v-if="child.renterContract.renterContractId && child.renterContract.contractStatus==1">待签字</span>-->
                                      <span v-if="child.renterContract.renterContractId &&child.isContractBeSigned==1&&child.renterContract.renterEndDate">
                                          <!--租客待签字-->
                                           <span style="color: #FB4246" v-if="child.renterContract.renterFewDaysLaterIn&&child.renterContract.renterFewDaysLaterIn<31">剩{{child.renterContract.renterFewDaysLaterIn}}天搬入</span>
                                           <span style="color: #FB4246" v-else-if="$moment(new Date().getTime())<child.renterContract.renterEndDate&&child.renterContract.renterRemainingDays&&child.renterContract.renterRemainingDays<=child.renterContract.expectDay">剩{{child.renterContract.renterRemainingDays}}天搬出</span>
                                           <span style="color: #FB4246" v-else-if="$moment(new Date().getTime())>child.renterContract.renterEndDate">已到期</span>
                                           <span v-else>到期日：{{$moment(child.renterContract.renterEndDate).format('YYYY.MM.DD')}}</span>
                                      </span>
                                      <span v-if="child.renterContract.renterContractId &&child.isContractBeSigned==0">
                                          <span v-if="child.renterContract.renterContractId && child.renterContract.contractStatus==2">到期日：{{$moment(child.renterContract.renterEndDate).format('YYYY.MM.DD')}}</span>
                                          <span style="color: #FB4246" v-if="child.renterContract.renterContractId && child.renterContract.contractStatus==3 && child.renterContract.renterFewDaysLaterIn>0">剩{{child.renterContract.renterFewDaysLaterIn}}天搬入</span>
                                          <span style="color: #FB4246" v-if="child.renterContract.renterContractId && child.renterContract.contractStatus==4 && child.renterContract.renterRemainingDays>0">剩{{child.renterContract.renterRemainingDays}}天搬出</span>
                                          <span style="color: #FB4246" v-if="child.renterContract.renterContractId && child.renterContract.contractStatus==5">已到期</span>
                                      </span>
                                  </p>
                                  <p v-if="child.status == 4">    <!-- 配置 -->
                                      <icon-font class="house-status-icon" type="iconyumengtubiao_peizhi"/>
                                      配置中
                                  </p>
                                  <p v-if="child.status == 5 || child.status == 6">    <!-- 锁房 -->
                                      <icon-font class="house-status-icon" type="iconyumengtubiao_suofang"/>
                                      已锁房
                                  </p>
                                  <p v-if="child.status == 8">    <!-- 关闭 -->
                                      已关闭
                                  </p>
                              </div>
                              <div class="workorder-flag">
                                  <a-popover trigger="hover"  placement="top" v-if="child.isRepairUndone==1">
                                      <template slot="content">
                                          维修中
                                      </template>
                                      <span class="repair"><icon-font type="icon-yumengtubiao_weixiu" /></span>
                                  </a-popover>
                                  <a-popover trigger="hover"  placement="top" v-if="child.isCleanUndone==1">
                                      <template slot="content">
                                          保洁中
                                      </template>
                                      <span class="clean"><icon-font type="icon-yumengtubiao_baojie" /></span>
                                  </a-popover>
                                  <a-popover trigger="hover"  placement="top" v-if="child.isDistributionUndone==1">
                                      <template slot="content">
                                          配货中
                                      </template>
                                      <span class="distribution"><icon-font type="iconpeihuo-mianxing" /></span>
                                  </a-popover>
                              </div>
                              <div class="house-flag">
                                  <span style="color: #0A87F8;border-color: #0A87F8"
                                        v-if="child.bookInfo && child.bookInfo.bookId">定</span>
                                  <span style="color: #03C683;border-color: #03C683"
                                        v-if="child.isContractBeSigned">签</span>
                                  <span style="color: #0A87F8;border-color: #0A87F8"
                                        v-if="child.isSyncTenant">确</span>
                                  <span style="color: #FFA036;border-color: #FFA036"
                                        v-if="child.isBillReceivable">收</span>
                                  <span style="color: #FB4246;border-color: #FB4246"
                                        v-if="child.isBillOverdue">欠</span>
                                  <span style="color: #FB4246;border-color: #FB4246"
                                        v-if="child.isTurnRent">转</span>
                                  <span style="color: #FB4246;border-color: #FB4246"
                                        v-if="child.isBack">退</span>
                              </div>
                            <div class="device-flag">
                              <a-popover trigger="hover"  placement="top" v-if="child.doorLock&&child.doorLock.onlineStatus==1">
                                <template slot="content">
                                  {{child.doorLock.power==101?'电量： -':child.doorLock.power < 20?'电量低于20%':'电量：'+child.doorLock.power+'%'}}
                                </template>
                                <span class="lock" :class="child.doorLock.power<20?'lockLowPower':'lockNormal'"><icon-font type="iconmensuo1" /></span>
                              </a-popover>
                              <a-popover trigger="hover"  placement="top" v-if="child.doorLock&&child.doorLock.onlineStatus==2">
                                <template slot="content">
                                  已离线
                                </template>
                                <span class="lockOffline"><icon-font type="iconmensuo1" /></span>
                              </a-popover>
                              <a-popover trigger="hover"  placement="top" v-if="child.electricMeter&&child.electricMeter.valveStatus==-1">
                                <template slot="content">
                                  异常
                                </template>
                                <span class="lockOffline"><icon-font type="icondianbiao" /></span>
                              </a-popover>
                              <a-popover trigger="hover"  placement="top" v-if="child.electricMeter&&child.electricMeter.valveStatus==2">
                                <template slot="content">
                                  已断电
                                </template>
                                <span class="lockLowPower"><icon-font type="icondianbiao" /></span>
                              </a-popover>
                              <a-popover trigger="hover"  placement="top" v-if="child.electricMeter&&(child.electricMeter.valveStatus==1||child.electricMeter.valveStatus==0)">
                                <template slot="content">
                                  供电中
                                </template>
                                <span class="electricNormal"><icon-font type="icondianbiao" /></span>
                              </a-popover>
                              <a-popover trigger="hover"  placement="top" v-if="child.waterMeter&&child.waterMeter.valveStatus==-1">
                                <template slot="content">
                                  未知
                                </template>
                                <span class="lockOffline"><icon-font type="iconshuibiao" /></span>
                              </a-popover>
                              <a-popover trigger="hover"  placement="top" v-if="child.waterMeter&&(child.waterMeter.valveStatus==1||child.waterMeter.valveStatus==0)">
                                <template slot="content">
                                  供水中
                                </template>
                                <span class="waterNormal"><icon-font type="iconshuibiao" /></span>
                              </a-popover>
                              <a-popover trigger="hover"  placement="top" v-if="child.waterMeter&&child.waterMeter.valveStatus==2">
                                <template slot="content">
                                  已断水
                                </template>
                                <span class="lockLowPower"><icon-font type="iconshuibiao" /></span>
                              </a-popover>
                            </div>
                          </li>
                      </ul>
                    </li>
                </div>
            </ul>
          <!-- 滚动底部加载更多动画 -->
          <div class="loader" v-if="showMoreLoading">
            <div class="loader-inner line-scale">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </content-main>
        <content-main v-show="isListMode">
            <div class="table">
                <a-table :customRow="openDetail" :loading="loading" size="middle" rowKey="houseId" :columns="columns" :dataSource="tableData" :pagination="false" bordered>
                <div slot="status" slot-scope="status">
                    <div style="display: flex;align-items: center">
                        <p :style="{ background : status == 1 ? '#FB4246'
                                                : status == 2 ? '#FB4246'
                                                : status == 3 ? '#03C683'
                                                : status == 4 ? '#FFAF6D'
                                                : status == 5 ? '#666666'
                                                : status == 6 ? '#666666'
                                                : status == 7 ? '#666666'
                                                : status == 8 ? '#666666'
                                                : '#666666'}" style="width: 6px;height: 6px;border-radius: 50%;margin-right: 6px"></p>
                        <p v-if="status==1 || status==2">空置</p>
                        <p v-if="status==3">已租</p>
                        <p v-if="status==4">配置中</p>
                        <p v-if="status==5 || status==6">已锁房</p>
                        <p v-if="status==8">关闭</p>

                        <div class="house-flag">
                            <!--                            <span style="color: #0A87F8;border-color: #0A87F8"-->
                            <!--                                  v-if="status == 3 && !child.renterContract.renterContractId">录</span>-->
                            <!--                            <span style="color: #0A87F8;border-color: #0A87F8"-->
                            <!--                                  v-if="status == 3 && child.renterContract.renterContractId && child.renterContract.renterFewDaysLaterIn>0">搬</span>-->
                        </div>

                    </div>
                </div>
                <div slot="buildingProjectName" slot-scope="text,record">
                  <a-popover>
                    <template slot="content">
                      <p style="padding: 6px 18px;">
                        {{record.buildingProjectName}}
                      </p>
                    </template>
                    <p class="overHidde f-fl" style="max-width: 100px" type="primary">
                      {{record.buildingProjectName}}
                    </p>
                  </a-popover>
                </div>
                <div slot="houseAddress" slot-scope="text,record">
                    <div class="clearfix">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 6px 18px;">
                                    {{record.roomTypeName}} - {{record.roomName}}
                                </p>
                            </template>
                            <p class="overHidde f-fl" style="max-width: 160px" type="primary">
                                {{record.roomTypeName}} - {{record.roomName}}
                            </p>
                        </a-popover>
                        <div class="house-table-list f-fr">
                            <a-popover trigger="hover"  placement="top" v-if="record.isRepairUndone==1">
                                <template slot="content">
                                    维修中
                                </template>
                                <span class="repair"><icon-font type="icon-yumengtubiao_weixiu" /></span>
                            </a-popover>
                            <a-popover trigger="hover"  placement="top" v-if="record.isCleanUndone==1">
                                <template slot="content">
                                    保洁中
                                </template>
                                <span class="clean"><icon-font type="icon-yumengtubiao_baojie" /></span>
                            </a-popover>
                            <a-popover trigger="hover"  placement="top" v-if="record.isDistributionUndone==1">
                                <template slot="content">
                                    配货中
                                </template>
                                <span class="distribution"><icon-font type="iconpeihuo-mianxing" /></span>
                            </a-popover>
                          <a-popover trigger="hover"  placement="top" v-if="record.doorLock&&record.doorLock.onlineStatus==1">
                            <template slot="content">
                              {{record.doorLock.power==101?'电量： -':record.doorLock.power < 20?'电量低于20%':'电量：'+record.doorLock.power+'%'}}
                            </template>
                            <span class="lock" :class="record.doorLock.power<20?'lockLowPower':'lockNormal'"><icon-font type="iconmensuo1" /></span>
                          </a-popover>
                          <a-popover trigger="hover"  placement="top" v-if="record.doorLock&&record.doorLock.onlineStatus==2">
                            <template slot="content">
                              已离线
                            </template>
                            <span class="lockOffline"><icon-font type="iconmensuo1" /></span>
                          </a-popover>
                          <a-popover trigger="hover"  placement="top" v-if="record.electricMeter&&(record.electricMeter.valveStatus==1||record.electricMeter.valveStatus==0)">
                            <template slot="content">
                              供电中
                            </template>
                            <span class="distribution"><icon-font type="icondianbiao" /></span>
                          </a-popover>
                          <a-popover trigger="hover"  placement="top" v-if="record.electricMeter&&record.electricMeter.valveStatus==2">
                            <template slot="content">
                              已断电
                            </template>
                            <span class="lockLowPower"><icon-font type="icondianbiao" /></span>
                          </a-popover>
                          <a-popover trigger="hover"  placement="top" v-if="record.electricMeter&&record.electricMeter.valveStatus==-1">
                            <template slot="content">
                              异常
                            </template>
                            <span class="lockOffline"><icon-font type="icondianbiao" /></span>
                          </a-popover>
                          <a-popover trigger="hover"  placement="top" v-if="record.waterMeter&&record.waterMeter.valveStatus==-1">
                            <template slot="content">
                              未知
                            </template>
                            <span class="lockOffline"><icon-font type="iconshuibiao" /></span>
                          </a-popover>
                          <a-popover trigger="hover"  placement="top" v-if="record.waterMeter&&(record.waterMeter.valveStatus==1||record.waterMeter.valveStatus==0)">
                            <template slot="content">
                              正常
                            </template>
                            <span class="clean"><icon-font type="iconshuibiao" /></span>
                          </a-popover>
                          <a-popover trigger="hover"  placement="top" v-if="record.waterMeter&&record.waterMeter.valveStatus==2">
                            <template slot="content">
                              已断水
                            </template>
                            <span class="lockLowPower"><icon-font type="iconshuibiao" /></span>
                          </a-popover>
                        </div>
                    </div>
                </div>
                <div slot="houseType" slot-scope="text,record">
                    <span>{{record.room}}室{{record.livingRoom}}厅{{record.kitchen}}厨{{record.toilet}}卫</span>
                </div>
                <div slot="houseArea" slot-scope="text,record">
                    <span>{{record.houseArea}}㎡</span>
                </div>
                <div slot="orientationName" slot-scope="text,record">
                    <span>{{record.orientationName}}</span>
                </div>
                <div slot="houseFloor" slot-scope="text,record">
                    <span>{{record.currentFloor}}-{{record.totalFloor}}</span>
                </div>
                <div slot="bookInfo" slot-scope="text,record">
                    <div class=f-clearfix style="padding: 0 9px">
                        <div v-if="record.status==1 || record.status==2||record.status==4 || record.status==5|| record.status==6">
                            <div class="f-fl house-flag" style="margin-right: 5px" v-if="record.bookInfo&&record.bookInfo.bookId">
                                <span style="color: #0A87F8;border-color: #0A87F8">定</span>
                            </div>
                            <div class="f-fl" style="margin-right: 5px" v-if="record.bookInfo&&record.bookInfo.bookId">
                              <span style="color: #000000">{{record.bookInfo.bookName}}</span>
                              <span style="color: #777777;font-size: 12px">(定金:<span style="color: #000;">{{ (record.bookInfo.bookPrice/100).toFixed(2)}}</span>元)</span>
                            </div>
                            <span v-else>-</span>
                        </div>
                        <div class="f-fl house-flag" style="margin-right: 5px"
                             v-if="record.status==3"
                        >
                            <span style="color: #03C683;border-color: #03C683"
                                  v-if="record.isContractBeSigned">签</span>
                            <span style="color: #0A87F8;border-color: #0A87F8"
                                  v-if="record.isSyncTenant">确</span>
                            <span style="color: #FFA036;border-color: #FFA036"
                                  v-if="record.isBillReceivable">收</span>
                            <span style="color: #FB4246;border-color: #FB4246"
                                  v-if="record.isBillOverdue">欠</span>
                            <span style="color: #FB4246;border-color: #FB4246"
                                  v-if="record.isTurnRent">转</span>
                            <span style="color: #FB4246;border-color: #FB4246"
                                  v-if="record.isBack">退</span>
                        </div>
                        <div class="f-fl">
                            <span style="color: #0A87F8" v-if="record.status==3 && !record.renterContract.renterContractId && !record.bookInfo.bookId">待录租客合同…</span>
                        </div>
                        <div class="f-fl">
                            <span style="color: #000000" v-if="record.renterContract.renterContractId">{{record.renterContract.renterName}}</span>
                            <span style="color: #777777;font-size: 12px" v-if="record.renterContract.renterContractId">(承租价:<span style="color: #000;">{{record.actualPrice/100}}</span>元/月)</span>
                        </div>
                        <div class="f-fr">
                            <span style="color: #777777;font-size: 12px" v-if="record.renterContract.renterContractId && (record.renterContract.contractStatus==1 || record.renterContract.contractStatus==2) && record.renterContract.renterEndDate">
                                到期日:<span style="color: #000;">{{$moment(record.renterContract.renterEndDate).format('YYYY.MM.DD')}}</span>
                            </span>
                            <span style="color: #FB4246;font-size: 12px" v-if="record.renterContract.renterContractId && record.renterContract.contractStatus==3 && record.renterContract.renterFewDaysLaterIn>0">
                                剩{{record.renterContract.renterFewDaysLaterIn}}天搬入
                            </span>
                            <span style="color: #FB4246;font-size: 12px" v-if="record.renterContract.renterContractId && record.renterContract.contractStatus==4 && record.renterContract.renterRemainingDays>0">
                                剩{{record.renterContract.renterRemainingDays}}天搬出
                            </span>
                            <span style="color: #FB4246;font-size: 12px" v-if="record.renterContract.renterContractId && record.renterContract.contractStatus==5">已到期</span>
                        </div>
                        <span v-if="record.status==8">-</span>
                    </div>
                </div>
                <div slot="actualPrice" slot-scope="text,record">
                    <span v-if="!record.renterContract.renterContractId">{{record.actualPrice/100}}</span>
                    <span v-if="record.renterContract.renterContractId">{{record.renterContract.renterContractPrice/100}}</span>
                </div>
                <div slot="maintainer" slot-scope="text,record">
                    <span>{{record.maintainerName}}-{{record.maintainerPhone}}</span>
                </div>
            </a-table>
            </div>
            <a-pagination style="margin-top: 20px" v-model="pagination.current" v-if="tableData.total" class="f-fr" size="small" :total="tableData.total" :showTotal="total => `共 ${total} 条`"
                      @change="pageChange" @showSizeChange="sizeChange"
                      showSizeChanger />
        </content-main>
        <!-- 修改房源弹框 -->
        <add-centralized-dialog :defaultStepsNum="editStepsNum"
                v-if="editHouseDialog" :currentBuildingProjectId="buildingProjectId"
                @cancel-dig="editRefreshPage" @refreshinfoFun="refreshinfoFun"
        ></add-centralized-dialog>
        <!--添加房源-->
        <a-modal destroyOnClose centered cancelText="取消" okText="保存并关闭" :maskClosable="false" width="1200px"
                 v-model="addHouseDialog" class="ownModalBorder titDialog" title="录入房源" @cancel="refreshPage"
                 @ok="saveHouse" :confirmLoading="confirmLoading">
            <add-house ref="addHouse" @changeLoading="changeLoading" :houseTypeIndex="houseTypeIndex" :source="source" :addressObj="addressObj" @changeHouseTypeIndex="changeHouseTypeIndex" @changeStepNum="changeStepNum" @refreshPage="refreshPage" @refreshinfoFun="refreshinfoFun"></add-house>
            <template slot="footer" v-if="this.houseTypeIndex==3">
                <label
                        class="config_lbl_css"
                        @click="goConfig"
                        v-if="stepsNum === 2"
                >
                    保存并去完善推广信息
                </label>
                <a-button
                        class="save_btn_css"
                        key="submit"
                        type="primary"
                        :loading="saveLoading_02"
                        @click="handleOk"
                >
                    保存{{stepsNum === 1?'并去配置房间':''}}
                </a-button>
            </template>
          <template slot="footer" v-if="this.houseTypeIndex==1||this.houseTypeIndex==2">
            <a-button class="cancelFont"  @click="addHouseDialog=false;">取消</a-button>
            <a-button class="saveFont" type="primary" key="submit" :loading="saveLoading_01" @click="saveHouse">保存并关闭</a-button>
          </template>
        </a-modal>
        <!-- 房间详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" width="1000px"
                 v-model="lookCentralizedDialog" class="ownModalBorder titDialog" @cancel="isRefreshFun">
            <template slot="title">
                <span style="vertical-align: middle">{{address}}</span>
            </template>
            <centralized-house-detail :roomTitle="modalTitle" @refreshinfoFun="refreshinfoFun" @cancel="lookCentralizedDialog=false" @deleteSuccess="deleteSuccess" @changeAddress="changeAddress"></centralized-house-detail>
        </a-modal>
        <!-- 项目管理 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1300px" v-model="projectListDialog" class="ownModalBorder titDialog" title="项目管理" @cancel="isRefreshFun">
          <project-list :selectBuildingProjectId="currentBuildingProjectId" @refreshinfoFun="refreshinfoFun" @deleteProjectFromList="deleteProjectFromList"></project-list>
        </a-modal>
        <!-- 导出框-->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
          <exportExcel @close="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
        </a-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import SearchDialog from '@/components/SearchDialog'
    import TopStatus from './components/TopStatus'
    import AddCentralizedDialog from "./components/AddCentralizedDialog";
    import CentralizedHouseDetail from "./CentralizedHouseDetail";
    import AddHouse from '../whole/AddHouse';
    import SkeletonCentralized from '../../skeleton/house/centralized';
    import ProjectList from './components/projectList';
    import  * as API from '@/api/centralizedHouse';
    import exportExcel from '@/components/exportExcel/index';
    let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
    let currentWeek = Vue.prototype.$moment().endOf('week').valueOf()
    let currentMonth = Vue.prototype.$moment().endOf('month').valueOf()
    export default {
        name: "whole",
        components: {
            SearchDialog,
            TopStatus,
            AddCentralizedDialog,
            CentralizedHouseDetail,
            AddHouse,
            SkeletonCentralized,
            ProjectList,
            exportExcel,
        },
        data() {
            return {
                statusData: [
                    {
                        title: '全部',
                        status: 0,
                        string: 'total',
                        query: null,
                    },
                    {
                        title: '空置',
                        status: 0,
                        string: 'vacantQuantity',
                        query: 1,
                        color: '#FB4246'
                    },
                    {
                        title: '已租',
                        status: 0,
                        string: 'rentAlreadyQuantity',
                        query: 3,
                        color: '#03C683'
                    },
                    {
                        title: '配置',
                        status: 0,
                        string: 'dispositionQuantity',
                        query: 4,
                        color: '#FFAF6D'
                    },
                    {
                        title: '锁房',
                        status: 0,
                        string: 'lockedQuantity',
                        query: 5,
                        color: '#666666'
                    },
                    {
                        title: '关闭',
                        status: 0,
                        string: 'closedQuantity',
                        query: 8,
                        line: true,
                        color: '#666666'
                    }
                ],
                sendData: {
                    actualPriceBegin: null,         // 出租价格（月租金）【单位分】区间开始
                    actualPriceEnd: null,           // 出租价格（月租金）【单位分】区间结束
                    areaId: '',                     // 区域id
                    checkoutBeginDate: '',          // 离房开始日期
                    checkoutEndDate: '',            // 离房结束日期
                    cityId: '',                     // 城市id
                    communityId: '',                // 小区ID
                    createTime: '',                 // 创建时间
                    current: 1,                     // 当前页数
                    decorationType: '',             // 装修类型【字典】
                    deptId: '',                     // 部门ID
                    fuzzyKeyword: '',                // 模糊匹配关键词
                    fuzzyQueryType: 0,             // 模糊查询类型【0、全部，1、房源编号，2、房源地址，3、门牌号，4、租客姓名，5、租客电话，6、业主姓名，7、业主电话】
                    houseAreaBegin: null,           // 房间面积区间开始
                    houseAreaEnd: null,             // 房间面积区间结束
                    isHavePic: null,                // 是否有照片（1：有；0：无）
                    isSearchCount: null,            // 是否查询总记录数（1.是（默认）；2.否）
                    maintainerId: '',              // 负责人ID
                    order: '',                      // 排序类型(asc/desc)
                    orientation: null,              // 朝向(1:东；2:南；3:西；4:北；5:南北)
                    room: '',                       // 户型【1、1居，2、2居，3、3居，4、4居，9、5居+】
                    size: 10,                       // 每页返回的记录数量
                    sort: '',                       // 排序字段
                    status: null,                   // 房间状态（1：空置；2：预定；3：已租；4：配置；5：锁房；6：锁房待签字；7：无效；8：关闭）
                    tenantId: '',                   // 租户ID
                    townId: '',                     // 商圈id
                    updateTime: '',                 // 修改时间
                    vacantDaysBegin: '',            // 空置天数区间开始
                    vacantDaysEnd: '',              // 空置天数区间结束
                    buildingProjectId:'',
                    roomTypeId:'',
                    bizStatus: '',                  // 业务状态
                },
                houseList: [],
                houseDiagram: [],
                modalTitle: {
                    housePid: '',
                    roomId: '',
                    buildingProjectId:'',
                    fullAddress:"",
                },
              address:false,
                addHouseDialog: false,
                editHouseDialog: false,
                houseTypeIndex:3,
                stepsNum:1,
              editStepsNum:2,
                confirmLoading: false,
                addressObj: {
                    cityId: '',
                    communityId: '',
                    communityName: '',
                },
                projectList:[],
                currentBuildingProjectId:'',
                currentBuildingProjectName:'',
                buildingProjectId:'',
                isListMode: false,
                modeTitle: '切换列表模式',
                loading: false,
                tableData: [],
                columns: [
                    {
                        title: '序号',
                        dataIndex: 'index',
                        key: 'index',
                        align: 'center',
                        width: '50px',
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        scopedSlots: { customRender: 'status' },
                        width:'5%',
                    },
                    {
                        title: '项目',
                        dataIndex: 'buildingProjectName',
                        key: 'buildingProjectName',
                        scopedSlots: { customRender: 'buildingProjectName' },
                    },
                    {
                      title: '房型/门牌号',
                      dataIndex: 'houseAddress',
                      key: 'houseAddress',
                      scopedSlots: { customRender: 'houseAddress' },
                    },
                    {
                        title: '承租/预定信息',
                        dataIndex: 'bookInfo',
                        key: 'bookInfo',
                        scopedSlots: { customRender: 'bookInfo' },
                        width:'27%',
                    },
                    {
                        title: '出租价格(元/月)',
                        dataIndex: 'actualPrice',
                        key: 'actualPrice',
                        scopedSlots: { customRender: 'actualPrice' },
                        width:'8.5%',
                    },
                    {
                        title: '户型',
                        dataIndex: 'houseType',
                        key: 'houseType',
                        scopedSlots: { customRender: 'houseType' },
                        width:'10%',
                    },
                    {
                        title: '面积',
                        dataIndex: 'houseArea',
                        key: 'houseArea',
                        scopedSlots: { customRender: 'houseArea' },
                        width:'4%',
                    },
                    {
                        title: '朝向',
                        dataIndex: 'orientationName',
                        key: 'orientationName',
                        scopedSlots: { customRender: 'orientationName' },
                        width:'4%',
                    },
                    {
                        title: '负责人信息',
                        dataIndex: 'maintainer',
                        key: 'maintainer',
                        scopedSlots: { customRender: 'maintainer' },
                        width:'12%',
                    },
                ],
                lookCentralizedDialog:false,
                statusActiveIndex: 0,
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                searchList:[
                  {
                    key: 'fuzzyQueryType',
                    title: '综合检索',
                    list: [
                      {
                        label: '综合检索',
                        value: 0,
                      },
                      {
                        label: '房间号',
                        value: 1
                      },
                      {
                        label: '租客姓名',
                        value: 2
                      },
                      {
                        label: '租客电话',
                        value: 3
                      },
                      {
                        label: '业主姓名',
                        value: 4
                      },
                      {
                        label: '业主电话',
                        value: 5
                      },
                      {
                        label: '标签',
                        value: 6
                      },
                      {
                        label: '项目名称',
                        value: 7
                      },
                    ],
                  },
                  {
                    key: 'bizStatus',
                    title: '业务状态',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '全部',
                        value: ''
                      },
                      {
                        label: '已预定',
                        value: 1
                      },
                      {
                        label: '租约待录',
                        value: 2
                      },
                      {
                        label: '租约待签字',
                        value: 3
                      },
                      {
                        label: '租约待确认',
                        value: 4
                      },
                      {
                        label: '即将搬入',
                        value: 5
                      },
                      {
                        label: '租约快到期',
                        value: 6
                      },
                      {
                        label: '租约到期未退',
                        value: 7
                      },
                      {
                        label: '近期待收款',
                        value: 8
                      },
                      {
                        label: '有欠款',
                        value: 9
                      }
                    ],
                  },
                  {
                    key: 'room',
                    title: '户型',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '不限',
                        value: ''
                      },
                      {
                        label: '1居',
                        value: 1
                      },
                      {
                        label: '2居',
                        value: 2
                      },
                      {
                        label: '3居',
                        value: 3
                      },
                      {
                        label: '4居',
                        value: 4
                      },
                      {
                        label: '5居+',
                        value: 9
                      },
                    ],
                  },
                  {
                    key: ['actualPriceBegin', 'actualPriceEnd'],
                    title: '出租价格',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '不限',
                        value: ['', '']
                      },
                      {
                        label: '≤1000元',
                        value: [0, 100000]
                      },
                      {
                        label: '1000-1500元',
                        value: [100000, 150000]
                      },
                      {
                        label: '1500-2000元',
                        value: [150000, 200000]
                      },
                      {
                        label: '2000-3000元',
                        value: [200000, 300000]
                      },
                      {
                        label: '3000-5000元',
                        value: [300000, 500000]
                      },
                      {
                        label: '5000-8000元',
                        value: [500000, 800000]
                      },
                      {
                        label: '>8000元',
                        value: [800000, '']
                      }
                    ],
                  },
                  {
                    key: ['houseAreaBegin', 'houseAreaEnd'],
                    title: '房屋面积',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '不限',
                        value: ['', '']
                      },
                      {
                        label: '≤10㎡',
                        value: [0, 10]
                      },
                      {
                        label: '10-30㎡',
                        value: [10, 30]
                      },
                      {
                        label: '30-50㎡',
                        value: [30, 50]
                      },
                      {
                        label: '50-70㎡',
                        value: [50, 70]
                      },
                      {
                        label: '70-90㎡',
                        value: [70, 90]
                      },
                      {
                        label: '90-110㎡',
                        value: [90, 110]
                      },
                      {
                        label: '≥110㎡',
                        value: [110, '']
                      }
                    ],
                  },
                  {
                    key: ['vacantDaysBegin', 'vacantDaysEnd'],
                    title: '空置天数',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '不限',
                        value: ['', '']
                      },
                      {
                        label: '≤10天',
                        value: [0, 10]
                      },
                      {
                        label: '10-20天',
                        value: [10, 20]
                      },
                      {
                        label: '20-30天',
                        value: [20, 30]
                      },
                      {
                        label: '＞30天',
                        value: [30, '']
                      }
                    ],
                  },
                  {
                    key: 'orientation',
                    title: '朝向',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '不限',
                        value: ''
                      },
                      {
                        label: '东',
                        value: 1
                      },
                      {
                        label: '南',
                        value: 2
                      },
                      {
                        label: '西',
                        value: 3
                      },
                      {
                        label: '北',
                        value: 4
                      },
                      {
                        label: '南北',
                        value: 5
                      },
                    ],
                  },
                  {
                    key: 'decorationType',
                    title: '装修类型',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '不限',
                        value: ''
                      },
                      {
                        label: '毛坯',
                        value: 4
                      },
                      {
                        label: '简装',
                        value: 3
                      },
                      {
                        label: '精装',
                        value: 2
                      },
                      {
                        label: '豪华装',
                        value: 1
                      }
                    ],
                  },
                  {
                    key: 'isHavePic',
                    title: '是否有图',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '不限',
                        value: ''
                      },
                      {
                        label: '有图',
                        value: 1
                      },
                      {
                        label: '无图',
                        value: 0
                      }
                    ],
                  },
                  {
                    key: ['checkoutBeginDate', 'checkoutEndDate'],
                    title: '预计离房时间',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '不限',
                        value: ['', '']
                      },
                      {
                        label: '本周离房',
                        value: [currentTime, currentWeek]
                      },
                      {
                        label: '本月离房',
                        value: [currentTime, currentMonth]
                      },
                      {
                        label: '自定义',
                        value: ['', '']
                      }
                    ],
                  },
                ],      //搜索数据
                spinLoading:true,
                source:3,
                isRefresh:false,
                showMoreLoading:false,
                showMore:true,
              saveLoading_01:false,   //分散
              saveLoading_02:false,   //集中
              canShowMore:true,
              searchConditionFlag:true,
              showMoreFlag:true,
              projectListDialog:false,
              exportExcelShow:false,
              exportUrl: '/pc2b/house_centralized/list_export',
              exportData:{},
            }
        },
        created() {
            switch (this.$route.params.search) {
                case 'index':
                    this.statusActiveIndex = 0;
                    this.sendData.status = '';
                    break;
                case 'vacant':
                    this.statusActiveIndex = 1;
                    this.sendData.status = 1;
                    break;
                case 'rent':
                    this.statusActiveIndex = 2;
                    this.sendData.status = 3;
                    break;
                case 'config':
                    this.statusActiveIndex = 3;
                    this.sendData.status = 4;
                    break;
            }
        },
        mounted(){
            //监听滚动条的事件
            document.getElementById("contentScroll").addEventListener("scroll", this.scrollBottom);
            if (this.$route.params.search == 'moveIn'){
              this.$refs.searchDialogId.searchList[1].currentActiveIndex = 5
              this.$refs.searchDialogId.searchDataArr.push({
                title: this.$refs.searchDialogId.searchList[1].title,
                val: this.$refs.searchDialogId.searchList[1].list[5].label,
              })
              this.$refs.searchDialogId.searchData.bizStatus = 5
              this.$refs.searchDialogId.confirm();
            }
            else if (this.$route.params.search == 'moveOut'){
                this.$refs.searchDialogId.searchList[1].currentActiveIndex = 6
                this.$refs.searchDialogId.searchDataArr.push({
                    title: this.$refs.searchDialogId.searchList[1].title,
                    val: this.$refs.searchDialogId.searchList[1].list[6].label,
                })
                this.$refs.searchDialogId.searchData.bizStatus = 6
                this.$refs.searchDialogId.confirm();
            }else if (this.$route.params.search == 'expired'){
                this.$refs.searchDialogId.searchList[1].currentActiveIndex = 7
                this.$refs.searchDialogId.searchDataArr.push({
                    title: this.$refs.searchDialogId.searchList[1].title,
                    val: this.$refs.searchDialogId.searchList[1].list[7].label,
                })
                this.$refs.searchDialogId.searchData.bizStatus = 7
                this.$refs.searchDialogId.confirm();
            }else{
                this.initPage();
            }
        },
        provide() {
            return {
                reloadHouseDiagram: this.getHouseDiagram
            };
        },
      methods: {
        exportExcel(){
          this.exportData = Object.assign({}, this.sendData);
          this.exportExcelShow = true;
          this.initShowMoreFlag();
        },
        goProjectList(){
          this.projectListDialog = true;
          this.initShowMoreFlag();
        },
        setSearchConditionFlag(){
          this.searchConditionFlag = true;
          if(this.sendData.current>1){
            this.searchConditionFlag = false;
          }
          if(this.sendData.status){
            this.searchConditionFlag = false;
          }
          if(this.sendData.fuzzyKeyword){
            this.searchConditionFlag = false;
          }
          if(this.sendData.deptId||this.sendData.maintainerId){
            this.searchConditionFlag = false;
          }
          if(this.sendData.cityId||this.sendData.areaId||this.sendData.townId){
            this.searchConditionFlag = false;
          }
          if(this.sendData.houseType||this.sendData.bizStatus||this.sendData.room||this.sendData.orientation||this.sendData.decorationType){
            this.searchConditionFlag = false;
          }
          if(this.sendData.actualPriceBegin||this.sendData.actualPriceEnd){
            this.searchConditionFlag = false;
          }
          if(this.sendData.houseAreaBegin||this.sendData.houseAreaEnd){
            this.searchConditionFlag = false;
          }
          if(this.sendData.checkoutBeginDate||this.sendData.checkoutEndDate){
            this.searchConditionFlag = false;
          }
          if(this.sendData.isHavePic!=null&&this.sendData.isHavePic!==''){
            this.searchConditionFlag = false;
          }
        },
        deleteProject(buildigProjectId,buildigProjectName){
          let that = this;
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
                  that.initData();
                  //清空列表
                  that.$refs.topStatus.currentBuildingProjectId = undefined;
                  that.$refs.topStatus.listBuildingProject();
                } else {
                  that.$message.error('删除失败');
                }
              })
            },
            onCancel() {
            },
          });
        },
        goEditProject(buildigProjectId,val){
          this.editHouseDialog = true;
          this.buildingProjectId = buildigProjectId;
          this.editStepsNum = val;
        },
        goConfigForNoRoom(){
          this.editHouseDialog = true;
          this.buildingProjectId = this.currentBuildingProjectId;
        },
        deleteThisProject(){
          let that = this;
          this.$modal.confirm({
            title: '确认删除 「'+that.currentBuildingProjectName+ '」吗？',
            content: '删除后将不可恢复',
            width:"433px",
            height:"192px",
            okText: '确认',
            cancelText: '取消',
            icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
            onOk() {
              API.removeBuildingProject(that.currentBuildingProjectId).then(res => {
                // console.log(res)
                if (res.code == "200") {
                  that.currentBuildingProjectId = '';
                  that.$message.info('删除成功');
                  that.initData();
                  //清空列表
                  that.$refs.topStatus.currentBuildingProjectId = undefined;
                  that.$refs.topStatus.listBuildingProject();
                } else {
                  that.$message.error('删除失败');
                }
              })
            },
            onCancel() {
            },
          });
        },
        changeAddress(address){
          this.address = address;
        },
        changeLoading(val){
          if(this.houseTypeIndex == 3){
            this.saveLoading_02 = val;
          }
          else if(this.houseTypeIndex==1||this.houseTypeIndex==2){
            this.saveLoading_01 = val;
          }
        },
            scrollBottom() {
              // 滚动到页面底部时
              const el = document.getElementById("contentScroll");
              const scrollTop = el.pageYOffset || el.scrollTop;
              const contentHeight = el.scrollHeight;
              const fixHeight = el.clientHeight;
              const toBottom = contentHeight - scrollTop - fixHeight;
              if (this.showMore&&toBottom < 100 && !this.spinLoading) {
                // 请求的数据未加载完成时
                if(this.canShowMore){
                  this.sendData.current += 1;
                  this.canShowMore = false;
                  this.getHouseDiagram(true);
                }

              }
            },
            changeSearchRoomType(searchListList){
              let obj ={
                key: 'roomTypeId',
                title: '房型',
                currentActiveIndex: 0,
                list: searchListList,
              };
              //判断当前是否选中某个项目
              if(this.currentBuildingProjectId){
                 if(this.searchList.length == 10){
                   this.searchList.splice(2,0,obj);
                 }
                 else{
                   this.searchList[2] = obj;
                 }
              }
              else{
                if(this.searchList.length == 11){
                  this.searchList.splice(2,1);
                }
              }
            },
            refreshinfoFun(res){  //详情有改变的操作  就改变状态
                if(res){
                    this.isRefresh = res
                }
            },
            isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
                if(this.isRefresh){
                    this.sendData.current = 1;
                    this.initPage();
                }
                this.lookCentralizedDialog = false;
                this.isRefresh = false;
                this.projectListDialog = false;
            },
            deleteSuccess(){
              this.lookCentralizedDialog = false;
              this.sendData.current = 1;
              setTimeout(()=>{
                this.getStatusCount();
                if (this.isListMode){
                  this.getHouseList();
                }else{
                  this.getHouseDiagram();
                }
              },500);
            },
            listBuildingProject(){
                API.listBuildingProject().then(res => {
                    if (res.code === '200') {
                        this.projectList = res.data;
                    }
                })
            },
            initData(){
              this.getStatusCount();
              this.getHouseDiagram();
              this.roomTypeList();
            },
            roomTypeList(){
                if(this.currentBuildingProjectId&&this.currentBuildingProjectId!='') {
                  let parameter = {
                    id:this.currentBuildingProjectId,
                  };
                    API.roomTypeListSimple(parameter).then(res => {
                        if (res.code == "200") {
                            let resData = res.data;
                            let searchListList = [];
                            let objTemp1 = {};
                            objTemp1.label = '全部';
                            objTemp1.value = null;
                            searchListList.push(objTemp1);
                            for (let i = 0; i < resData.length; i++) {
                                let objTemp = {};
                                objTemp.label = resData[i].name;
                                objTemp.value = resData[i].id;
                                searchListList.push(objTemp);
                            }
                            this.changeSearchRoomType(searchListList);
                        }
                    })
                }
                else{
                  let searchListList = [];
                  this.changeSearchRoomType(searchListList);
                }
            },
            getStatusCount() {
                this.sendData.buildingProjectId = this.currentBuildingProjectId;
                let sendData = JSON.parse(JSON.stringify(this.sendData));
                sendData.status = '';
                API.houseCentralizedStatusStat(sendData).then(res => {
                    if (res.code === '200') {
                        let total = 0;
                        let conut = res.data;
                        for (let item of this.statusData) {
                            if (item.query) {
                                item.status = conut[item.string];
                                if (item.query != 8) {
                                    total += conut[item.string];
                                }
                            }
                        }
                        this.statusData[0].status = total;
                    }
                })
            },
            changeStatus(status) {
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.sendData.status = status.query;
                this.showMore = true;
                if (this.isListMode){
                    this.getHouseList();
                }else{
                    this.getHouseDiagram();
                }
            },
            changeProject(value){
                this.currentBuildingProjectId = value.key;
                this.currentBuildingProjectName = value.label;
                this.sendData.current = 1;
                this.showMore = true;
                this.roomTypeList();
                if (this.isListMode){
                    this.getHouseList();
                }
                else {
                    this.getStatusCount();
                    this.getHouseDiagram();

                }
            },
            deleteProjectFromList(val){
              if(val){
                this.currentBuildingProjectId = "";
                setTimeout(()=>{
                  this.$refs.topStatus.listBuildingProject();
                  this.$refs.topStatus.currentBuildingProjectId = undefined;
                  this.initPage();
                },500);
              }
              else{
                setTimeout(()=>{
                  this.$refs.topStatus.listBuildingProject();
                  if(!this.currentBuildingProjectId){
                    this.initPage();
                  }
                },500);
              }
            },
            removeRefreshPage(){
                this.currentBuildingProjectId = "";
                setTimeout(()=>{
                  this.$refs.topStatus.listBuildingProject();
                  this.initPage();
                },500);
            },
            refreshPage(){
                setTimeout(() => {
                    this.addHouseDialog = false;
                    if(this.isRefresh) {
                      this.$refs.topStatus.listBuildingProject();
                      this.initPage();
                    }
                    this.isRefresh = false;
                }, 500);
            },
            editRefreshPage(){
                setTimeout(() => {
                    this.editHouseDialog = false;
                    if(this.isRefresh){
                        this.$refs.topStatus.listBuildingProject(this.currentBuildingProjectId);
                        this.initPage();
                    }
                    this.isRefresh = false;
                }, 500);
            },
            getHouseDiagram(flag) {
                if(flag){
                  this.showMoreLoading = true;
                }
                else{
                  this.spinLoading = true;
                }
                this.sendData.buildingProjectId = this.currentBuildingProjectId;
                this.setSearchConditionFlag();
                API.houseCentralizedDiagram(this.sendData).then(res => {
                    if (res&&res.code == 200) {
                        if(res.data == null){
                            this.houseDiagram = [];
                        }else{
                          if(res.data.total>=100){
                            this.showMore = true;
                          }
                          else{
                            this.showMore = false;
                          }
                          if(flag){//来自滚动底部刷新
                            if(res.data.records.length>0){
                              //已存在的不重复载入
                              let temp = [];
                              this.houseDiagram.forEach((item)=>{
                                temp.push(item.buildigProjectId);
                              });
                              res.data.records.forEach((item)=>{
                                if(temp.indexOf(item.buildigProjectId)==-1){
                                  this.houseDiagram.push(item)
                                }
                              });
                            }
                          }
                          else{
                            this.houseDiagram = res.data.records;
                          }
                        }
                    }
                  this.showMoreLoading = false;
                    this.spinLoading = false;
                  this.canShowMore = true;
                })
            },
            addHouse() {
                this.addHouseDialog = true;
                this.buildingProjectId = '';
            },
            editHouse(){
                this.editHouseDialog = true;
                this.buildingProjectId = this.currentBuildingProjectId;
            },
            openInfo(temp,item,house) {
                this.lookCentralizedDialog = true;
                this.modalTitle = {
                    housePid: house.housePid,
                    roomId: house.houseId,
                    buildingProjectId:house.buildingProjectId,
                    // currentBuildingProjectName: this.currentBuildingProjectName,
                    // roomTypeName: house.roomTypeName,
                    // roomName:house.roomName,
                    fullAddress:house.fullAddress
                }
              this.address = temp.cityName+temp.areaName + house.fullAddress;
            },
            initPage(){
                //关闭弹窗
                this.addHouseDialog = false;
                this.editHouseDialog = false;
                //刷新数据
                this.initData();
            },
            getHouseList() {
                this.loading = true;
                this.spinLoading = true;
                this.sendData.buildingProjectId = this.currentBuildingProjectId;
                API.houseCentralizedList(this.sendData).then(res => {
                    this.loading = false;
                    if (res.code == 200) {
                        if(res.data == null){
                            this.tableData = [];
                        }else{
                            this.tableData = res.data.records;
                            this.tableData.total = res.data.total;
                            this.pagination.total = res.data.total;
                            this.tableData.forEach((item, index)=>{
                                item.index = index + 1;
                            });
                        }
                    }
                },error => {
                    this.loading = false
                });
                this.spinLoading = false;
            },
            searchHouseList(searchData){
                this.sendData.actualPriceBegin = searchData.actualPriceBegin;
                this.sendData.actualPriceEnd = searchData.actualPriceEnd;
                this.sendData.areaId = searchData.areaId;
                this.sendData.checkoutBeginDate = searchData.checkoutBeginDate;
                this.sendData.checkoutEndDate = searchData.checkoutEndDate;
                this.sendData.cityId = searchData.cityId;
                this.sendData.communityId = searchData.communityId;
                this.sendData.decorationType = searchData.decorationType;
                this.sendData.deptId = searchData.deptId;
                this.sendData.fuzzyKeyword = searchData.fuzzyKeyword;
                this.sendData.fuzzyQueryType = searchData.fuzzyQueryType;
                this.sendData.houseAreaBegin = searchData.houseAreaBegin;
                this.sendData.houseAreaEnd = searchData.houseAreaEnd;
                this.sendData.isHavePic = searchData.isHavePic;
                this.sendData.maintainerId = searchData.maintainerId;
                this.sendData.orientation = searchData.orientation;
                this.sendData.room = searchData.room;
                this.sendData.townId = searchData.townId;
                this.sendData.vacantDaysBegin = searchData.vacantDaysBegin;
                this.sendData.vacantDaysEnd = searchData.vacantDaysEnd;
                this.sendData.roomTypeId = searchData.roomTypeId;
                this.sendData.bizStatus = searchData.bizStatus;
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.showMore = true;
                if (this.isListMode){
                    this.getHouseList();
                }else{
                    this.getHouseDiagram();
                }
                this.getStatusCount();
            },
            //切换模式
            changeViewMode(){
                this.isListMode = !this.isListMode
                this.isListMode ? this.modeTitle="切换房态模式" : this.modeTitle="切换列表模式";
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.showMore = true;
                if (this.isListMode){
                    this.getHouseList();
                }else{
                    this.getHouseDiagram();
                }
                this.initShowMoreFlag();
            },
            initShowMoreFlag(){
              this.showMoreFlag = false;
              setTimeout(()=>{
                this.showMoreFlag = true;
              },100);
            },
            pageChange(current){
                this.sendData.current = current;
                if (this.isListMode){
                    this.getHouseList();
                }else{
                    this.getHouseDiagram();
                }
            },
            sizeChange(current, pageSize){
                this.sendData.current = current;
                this.sendData.size = pageSize;
                this.pagination.pageSize = pageSize;
                if (this.isListMode){
                    this.getHouseList();
                }else{
                    this.getHouseDiagram();
                }
            },
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            this.lookCentralizedDialog = true;
                            this.modalTitle = {
                                housePid: record.housePid,
                                roomId: record.houseId,
                                buildingProjectId:record.buildingProjectId,
                                fullAddress:record.fullAddress,
                            }
                          this.address = record.cityName+record.areaName + record.fullAddress;
                        }
                    }
                }
            },
            cancelHouseDetail() {
                this.lookCentralizedDialog = false;
            },
            saveHouseDetail() {
                setTimeout(() => {
                    this.lookCentralizedDialog = false;
                    this.sendData.current = 1;
                    this.getStatusCount();
                    if (this.isListMode){
                        this.getHouseList();
                    }else{
                        this.getHouseDiagram();
                    }
                }, 500)
            },
            changeHouseTypeIndex(val){
                this.houseTypeIndex = val;
            },
            changeStepNum(val){
                this.stepsNum = val;
            },
            saveHouse(){
                if(this.houseTypeIndex==1){
                    this.$refs.addHouse.saveWholeHouse();
                }
                else if(this.houseTypeIndex==2){
                    this.$refs.addHouse.saveShareHouse();
                }
                else if(this.houseTypeIndex==3){
                    this.$refs.addHouse.saveCentralizedHouse();
                }
            },
            handleOk() {
                if(this.houseTypeIndex==1){
                    this.$refs.addHouse.saveWholeHouse();
                }
                else if(this.houseTypeIndex==2){
                    this.$refs.addHouse.saveShareHouse();
                }
                else if(this.houseTypeIndex==3){
                    if(this.stepsNum==1){
                        this.$refs.addHouse.goConfig(this.stepsNum);
                    }else {
                        this.$refs.addHouse.handleOk();
                    }
                }
            },
            goConfig() {
                this.$refs.addHouse.goConfig(this.stepsNum);
            },
        },
    }
</script>

<style scoped lang="less">
    .content-top {
      min-width: 1300px; // overflow: hidden;
    }
    .add-btn-wrap {
        position: absolute;
        top: 0;
        right: 20px;
    }
    .moreStyle{
      & /deep/ .ant-popover {
        .ant-popover-inner-content {
          width: 110px;
          padding: 4px 0;
          text-align: center;
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
    .house-list {
        min-height: calc(100% - 24px);
        position: relative;
        /deep/ .ant-spin{
            position: absolute;
            top:20px;
            left: calc(50%);
            z-index: 99;
        }
      .goAddStyle{
        margin: 0 auto;
        width: 230px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #0A87F8;
        color: #0A87F8;
      }
        li{
            margin-bottom: 20px;
        }
        .pos-top{
          height: 21px;
          line-height: 21px;
          font-size: 14px;
          margin-bottom: 10px;
          svg{
            width: 14px;
            height: 14px;
          }
          .pos-top-splitStyle{
            padding-left: 15px;
            height: 14px;
            margin: 3.5px 15px 0 0;
            border-right: 1px solid #dddddd;
          }
          .pos-top-projectStyle{
            .pos-top-projectStyle-item{
              color: #0A87F8;
              font-size: 14px;
            }
            /deep/ .ant-popover {
              position: fixed;
              .ant-popover-inner-content {
                padding: 5px 0;
                width: 90px;
                text-align: center;
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
        }
        .list-top {
            height:32px;
            background:rgba(250,251,252,1);
            border-radius:4px;
            line-height: 32px;
            padding-left: 10px;
            .house-info {
                .position-icon {
                    margin-right: 8px;
                    vertical-align: middle;
                    color: #777777;
                }

                p {
                    padding-right: 10px;
                    margin-right: 10px;
                    border-right: 1px dashed #DDDDDD;
                    height:32px;
                    line-height: 32px;
                }

                p:last-child {
                    border-right: none;
                    cursor: pointer;
                }
            }

            .f-ftc-blue {
                height: 14px;
                line-height: 14px;
                cursor: pointer;

                .position-icon {
                    margin-right: 4px;
                    vertical-align: middle;
                }
            }

        }

        .house-child-list {
            padding: 10px 0 0 0;

            & > li {
                position: relative;
                margin-right: 10px;
                padding: 10px;
                width: 198px;
                height: 90px;
                font-size: 12px;
                color: @secondaryFontColor;
                border: 1px solid @borderColor;
                border-radius: 5px;
                cursor: pointer;

                &.house-status {
                    border-left-width: 2px;

                    .house-status-icon {
                        margin-right: 4px;
                        font-size: 14px;
                    }
                }

                p {
                    height: 24px;
                    line-height: 24px;
                }

                p:first-child {
                    font-size: 14px;
                    color: @mainFontColor;
                }
                .workorder-flag {
                    position: absolute;
                    right: 10px;
                    top: 11px;
                    /deep/ .ant-popover-inner-content{
                        width: 60px;
                        padding: 6px 8px ;
                    }
                    span{
                        display: inline-block;
                        width: 18px;
                        height: 18px;
                        line-height: 18px;
                        border-radius: 2px;
                        text-align: center;
                        margin-left: 5px;
                    }
                    .repair{
                        background:rgba(10,135,248,0.1);
                        color: #0A87F8;
                    }
                    .clean{
                        background:rgba(3,198,131,0.1);
                        color: #03C683;
                    }
                    .distribution{
                        background:rgba(255,160,54,0.1);
                        color: #FFA036;
                    }
                }
                .house-flag {
                    position: absolute;
                    right: 10px;
                    bottom: 32px;

                    span {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid red;
                        border-radius: 50%;
                        text-align: center;
                        color: red;
                        margin-left: -4px;
                        background: #ffffff;
                    }
                }
              .device-flag{
                position: absolute;
                right: 10px;
                bottom: 7px;
                span {
                  display: inline-block;
                  height: 18px;
                  line-height: 18px;
                  border-radius: 2px;
                  text-align: center;
                  margin-left: 5px;
                }
                .lockOffline{
                  color: #BBBBBB;
                }
                .lockNormal{
                  color: #0A87F8;
                }
                .lockLowPower{
                  color: #FB4246;
                }
                .waterNormal{
                  color: #03C683;
                }
                .electricNormal{
                  color:#FFA036;
                }
                /deep/ .ant-popover-inner-content{
                  width: 96px;
                  padding: 6px 0 ;
                  text-align: center;
                }
                svg{
                  width: 14px;
                  height: 14px;
                }
              }
            }
        }
      .house-child-list-noData{
        margin-top: 20px;
        .house-child-list-noData1{
          width: 230px;
          text-align: center;
          height: 40px;
          line-height: 40px;
          border-radius: 5px;
          border: 1px solid #0A87F8;
          color: #0A87F8;
          font-size: 14px;
          font-weight: 500;
          margin: 0 auto;
        }
        .house-child-list-noData2{
          text-align: center;
          margin: 0 auto;
          font-size: 14px;
          color: #FB4246;
        }
      }
    }
    .house-table-list{
        /deep/ .ant-popover-inner-content{
            width: 100px;
            padding: 6px 8px ;
        }
        span{
            display: inline-block;
            width: 18px;
            height: 18px;
            line-height: 18px;
            border-radius: 2px;
            text-align: center;
            margin-left: 5px;
        }
        .repair{
            background:rgba(10,135,248,0.1);
            color: #0A87F8;
        }
        .clean{
            background:rgba(3,198,131,0.1);
            color: #03C683;
        }
        .distribution{
            background:rgba(255,160,54,0.1);
            color: #FFA036;
        }
      .lockOffline{
        ackground-color: fade(#BBBBBB,10%);
        color: #BBBBBB;
      }
      .lockNormal{
        background-color: fade(#0A87F8,10%);
        color: #0A87F8;
      }
      .electricNormal{
        color:#FFA036;
      }
      .lockLowPower{
        background-color: fade(#FB4246,10%);
        color: #FB4246;
      }
    }
    .pagination {
        position: absolute;
        right: 40px;
        bottom: 20px;
        width: calc(100% - 140px);
        background-color: #ffffff;

        & > ul {
            margin: 10px 0;
        }

    }
    .house-flag {
        span {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border: 1px solid red;
            border-radius: 50%;
            text-align: center;
            color: red;
            margin-left: -4px;
            background: #ffffff;
        }
    }
    .config_lbl_css {
        margin-right: 10px;
        color: @themeColor;
        font-size: 16px;
        cursor: pointer;
    }
    .save_btn_css {
        width: 160px;
        height: 40px;
        line-height: 40px;
    }
    .cancelFont {
      color: #666666;
      width: 120px;
      height: 40px;
    }
    .saveFont {
      width: 120px;
      height: 40px;
      color: #FFFFFF;
      background-color: #0A87F8;
    }
    .line-scale > div:nth-child(1) {
      -webkit-animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08);
      animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08); }
    .line-scale > div:nth-child(2) {
      -webkit-animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08);
      animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08); }
    .line-scale > div:nth-child(3) {
      -webkit-animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08);
      animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08); }
    .line-scale > div:nth-child(4) {
      -webkit-animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08);
      animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08); }
    .line-scale > div:nth-child(5) {
      -webkit-animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08);
      animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08); }
    .line-scale > div {
      background-color: #F7F8FB;
      width: 4px;
      height: 35px;
      border-radius: 2px;
      margin: 2px;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      display: inline-block; }
    @-webkit-keyframes line-scale {
      0% {
        -webkit-transform: scaley(1);
        transform: scaley(1); }

      50% {
        -webkit-transform: scaley(0.4);
        transform: scaley(0.4); }

      100% {
        -webkit-transform: scaley(1);
        transform: scaley(1); }
    }
    .loader{
      width: 100%;
      height: 100%;
      z-index: 9;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffffff;
    }
</style>
