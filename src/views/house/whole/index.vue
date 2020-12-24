<template>
    <!-- 整租 -->
    <div>
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <div class="add-btn-wrap" @click="addHouse" v-mark="['mk_house_index_tjfy']">
            <icon-font type="iconyumengtubiao_tianjia"/>
            添加房源
        </div>
        <content-top>
            <top-status class="f-fl" :activeIndex="statusActiveIndex" :statusData="statusData" @changeStatus="changeStatus"></top-status>
            <div class="f-fr moreStyle cursor" :class="btnArr.indexOf('2')>-1?'moreStyle1':'moreStyle2'">
              <a-popover v-if="showMoreFlag" :title="null" trigger="hover" placement="bottomLeft">
                <template slot="content">
                  <div class="action cursor" @click="exportExcel">导出</div>
                  <div class="action cursor" @click="changeViewMode">{{modeTitle}}</div>
                  <div class="action cursor" @click="goPriceBatchChange" v-if="btnArr.indexOf('1')>-1">批量修改价格</div>
                  <div class="action cursor" @click="goInfoBatchChange" v-if="btnArr.indexOf('2')>-1">房源信息批量修改</div>
                  <div class="action cursor" @click="goInfoTransfer" v-if="btnArr.indexOf('3')>-1">房源批量转移</div>
                </template>
                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
              </a-popover>
              <icon-font v-else type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
            </div>
            <search-dialog style="margin-right: 10px;" deptTitle="房源维护人" :deptEmpTitleOtherFlag="true" deptPlaceholder="请选择房源维护人或维护人所属部门" ref="searchDialogId" resMark="mk_house_decentralized" @search="searchHouseList" class="f-fr"></search-dialog>
        </content-top>
        <skeleton-dentralized v-show="!isListMode&&spinLoading"></skeleton-dentralized>
        <content-main v-show="!isListMode&&!spinLoading" id="contentScroll">
            <ul class="house-list">
                <a-empty v-show="!houseDiagram.list.length" style="margin-top:100px;"/>
                <div v-show="!houseDiagram.list.length&&searchConditionFlag" style="margin-top: 18px;" v-mark="['mk_house_index_tjfy']">
                  <div class="goAddStyle cursor" @click="addHouse">去添加<icon-font style="margin-left: 4px;" type="iconyumengtubiao_zhishi"/></div>
                </div>
                <li v-for="(itemFirst,index) in houseDiagram.list" :key="index">
                    <div class="list-top f-clearfix">
                        <div class="f-fl f-clearfix house-info">
                            <p class="f-fl">
                                <icon-font class="position-icon" type="iconyumengtubiao_dingwei"/>
                                <span style="color: #111;font-size: 16px;">{{itemFirst.communityName}}</span>
                                <span style="color: #666666">（{{itemFirst.cityName}}-{{itemFirst.areaName}}{{itemFirst.townName?'-'+itemFirst.townName:''}}）</span>
                            </p>
                        </div>
                        <div class="f-fr">
                            共 <span class="f-ftc-blue">{{itemFirst.roomNum}}</span> 间，出租率：<span class="f-ftc-blue">{{itemFirst.rentRate}}</span>
                        </div>
                    </div>
                    <div v-for="(item,index) in itemFirst.buildingUnitList" :key="index">
                        <div class="address">
                            {{item.buildingNo}}栋{{item.unit?item.unit+'单元':''}}
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
                            v-for="(child,i) in item.houseRoomList"
                            :key="i"
                            @click="openInfo(itemFirst,item,child)"
                        >
                            <div>
                                <p class="overHidde">{{child.fullRoomName}}</p>
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
                                <span class="lockLowPower"><icon-font type="iconshuibiao" /></span>
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
                    </div>
                </li>
            </ul>
            <a-pagination class="f-fr" size="small" v-if="false&&houseDiagram.total" :total="houseDiagram.total" :showTotal="total => `共 ${total} 条`"
                          @change="pageChangeDiagram" @showSizeChange="sizeChangeDiagram"
                          :current="pagination_diagram.current" :pageSize="pagination_diagram.pageSize"
                          :pageSizeOptions="['5','10', '20', '30', '40']"
                          :defaultPageSize="5"
                          showSizeChanger />
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
            <a-table :customRow="openDetail" :loading="loading" size="middle" rowKey="houseId" :columns="columns" :dataSource="tableData.list" :pagination="false" bordered>
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
                <div slot="houseAddress" slot-scope="text,record">
                    <div class="clearfix">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span class="houseAlias" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                                </p>
                            </template>
                            <p class="overHidde f-fl" style="max-width: 270px" type="primary">
                                <span class="houseAlias" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
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
                <div slot="bookInfo" slot-scope="text,record">
                    <div class=f-clearfix style="padding: 0 9px">
                        <div v-if="record.status==1 || record.status==2||record.status==4 || record.status==5|| record.status==6">
                            <div class="f-fl house-flag" style="margin-right: 5px" v-if="record.bookInfo&&record.bookInfo.bookId">
                                <span style="color: #0A87F8;border-color: #0A87F8">定</span>
                            </div>
                            <div class="f-fl" style="margin-right: 5px" v-if="record.bookInfo&&record.bookInfo.bookId">
                              <span style="color: #000000">{{record.bookInfo.bookName}}</span>
                              <span style="color: #777777;font-size: 12px">(定金:<span style="color: #000;">{{Math.round(record.bookInfo.bookPrice/100).toFixed(2)}}</span>元)</span>
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
                <div slot="maintainer" slot-scope="text,record">
                    <span>{{record.maintainerName}}-{{record.maintainerPhone}}</span>
                </div>
            </a-table>
            <a-pagination style="margin-top: 20px" v-if="tableData.total" class="f-fr" size="small" :total="tableData.total" :showTotal="total => `共 ${total} 条`"
                          @change="pageChangeList" @showSizeChange="sizeChangeList"
                          :current="pagination_list.current" :pageSize="pagination_list.pageSize"
                          showSizeChanger/>
        </content-main>
        <a-modal destroyOnClose centered cancelText="取消" okText="保存并关闭" :maskClosable="false" width="1200px"
                 v-model="addHouseDialog" class="ownModalBorder titDialog" title="录入房源" @cancel=""
                 @ok="saveHouse" :confirmLoading="confirmLoading">
            <add-house ref="addHouse" @changeLoading="changeLoading" :houseTypeIndex="houseTypeIndex" :source="source" :addressObj="addressObj" @changeHouseTypeIndex="changeHouseTypeIndex" @changeStepNum="changeStepNum" @refreshPage="refreshPage"></add-house>
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
                        :loading="saveLoading_02"
                        type="primary"
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
        <a-modal destroyOnClose centered width="1000px" :maskClosable="false" v-model="houseInfoDialog"
                 :footer="null" class="ownModalBorder thousandDialog titDialog" @cancel="isRefreshFun">
            <template slot="title">
                <div>{{houseAlias?houseAlias+'/':houseAlias}}{{address}}</div>
            </template>
            <!-- 整租 -->
            <whole-house-detail :roomTitle="modalTitle" @changeTitle="changeTitle" @deleteSuccess="deleteSuccess" @refreshinfoFun="refreshinfoFun"></whole-house-detail >
        </a-modal>
        <!-- 合租子房间详情 -->
        <a-modal destroyOnClose centered width="1000px" :maskClosable="false" v-model="shareChildInfoDialog"
                 :footer="null" class="ownModalBorder thousandDialog titDialog" @cancel="isRefreshFun">
            <template slot="title">
                <div style="vertical-align: middle">{{houseAlias?houseAlias+'/':houseAlias}}{{address}}</div>
            </template>
            <!-- 合租 -->
            <child-detail :roomTitle="modalTitle" @cancel="shareChildInfoDialog=false" @changeTitle="changeTitle" @refreshinfoFun="refreshinfoFun"></child-detail>
        </a-modal>
        <!--  价格批量修改 -->
        <a-modal destroyOnClose centered width="520px" :maskClosable="false" v-model="priceBatchChangeDialog" title="房源价格批量修改"
                 :footer="null" class="ownModalBorder thousandDialog titDialog" @cancel="priceBatchChangeDialog=false;">
            <price-batch-change :statusIndex="statusIndex" :changeCount="changeCount" :setSearchCondition="setSearchCondition" :sendData="sendData"
                @cancel="isRefreshFun" @changeSuccess="batchChangeSuccess"></price-batch-change>
        </a-modal>
        <!--  房源批量转移 -->
        <a-modal destroyOnClose centered width="520px" :maskClosable="false" v-model="infoTransferDialog" title="房源批量转移"
                 :footer="null" class="ownModalBorder thousandDialog titDialog" @cancel="infoTransferDialog=false;">
            <info-transfer :statusIndex="statusIndex" :changeCount="changeCount" :setSearchCondition="setSearchCondition" :sendData="sendData"
                @cancel="isRefreshFun" @changeSuccess="batchChangeSuccess"></info-transfer>
        </a-modal>
        <!--  房源信息批量修改 -->
        <a-modal destroyOnClose centered width="1000px" :maskClosable="false" v-model="infoBatchChangeDialog" title="房源信息批量修改"
                 :footer="null" class="ownModalBorder thousandDialog titDialog" @cancel="infoBatchChangeDialog=false;">
          <info-batch-change :statusIndex="statusIndex" :changeCount="changeCount" :setSearchCondition="setSearchCondition" :sendData="sendData"
                         @cancel="isRefreshFun" @changeSuccess="batchChangeSuccess"></info-batch-change>
        </a-modal>
        <!--  房源批量处理结果 -->
        <a-modal destroyOnClose centered width="520px" :maskClosable="false" v-model="batchProcessResultDialog" :title="batchProcessResultTitle"
                 :footer="null" class="ownModalBorder thousandDialog titDialog" @cancel="isRefreshFun">
          <batch-process-result :changeCount="changeCount" :batchType="batchType"
                         @goBack="isRefreshFun"></batch-process-result>
        </a-modal>
        <!-- 导出框-->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
          <exportExcel @close="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
        </a-modal>
    </div>
</template>

<script>
    import TopStatus from '@/components/TopStatus/index'
    import SearchDialog from '@/components/SearchDialog'
    import AddHouse from './AddHouse'
    import WholeHouseDetail from './WholeHouseDetail'
    import ChildDetail from '../share/ChildDetail';
    import SkeletonDentralized from '../../skeleton/house/dentralized';
    import PriceBatchChange from './priceBatchChange';
    import * as decentralizedAPI from '@/api/decentralizedHouse';
    import InfoTransfer from "./infoTransfer";
    import InfoBatchChange from './infoBatchChange';
    import BatchProcessResult from './batchProcessResult';
    import exportExcel from '@/components/exportExcel/index';
    export default {
        name: "whole",
        components: {
            InfoTransfer,
            InfoBatchChange,
            TopStatus,
            WholeHouseDetail,
            SearchDialog,
            ChildDetail,
            AddHouse,
            SkeletonDentralized,
            PriceBatchChange,
            BatchProcessResult,
            exportExcel,
        },
        data() {
            return {loading: false,
                tableData: {
                    list: [],
                    total: 0,
                },
                columns: [
                    {
                        title: '序号',
                        dataIndex: 'index',
                        key: 'index',
                        align: 'center',
                        width: '50px',
                        customCell:() => {
                            return {
                                on: {
                                    click: () => {
                                        event.stopPropagation()
                                    }
                                }
                            }
                        }
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        scopedSlots: { customRender: 'status' },
                        width:'5%',
                    },
                    {
                        title: '房源信息',
                        dataIndex: 'houseAddress',
                        key: 'houseAddress',
                        scopedSlots: { customRender: 'houseAddress' },
                        width:'28.8%',
                    },
                    {
                        title: '承租/预定信息',
                        dataIndex: 'bookInfo',
                        key: 'bookInfo',
                        scopedSlots: { customRender: 'bookInfo' },
                        width:'26%',
                    },
                    {
                        title: '出租价格(元/月)',
                        dataIndex: 'actualPrice',
                        key: 'actualPrice',
                        scopedSlots: { customRender: 'actualPrice' },
                        width:'9%',
                    },
                    {
                        title: '户型',
                        dataIndex: 'houseType',
                        key: 'houseType',
                        scopedSlots: { customRender: 'houseType' },
                        width:'8.5%',
                    },
                    {
                        title: '面积',
                        dataIndex: 'houseArea',
                        key: 'houseArea',
                        scopedSlots: { customRender: 'houseArea' },
                        width:'4.5%',
                    },
                    {
                        title: '朝向',
                        dataIndex: 'orientationName',
                        key: 'orientationName',
                        scopedSlots: { customRender: 'orientationName' },
                    },
                    {
                        title: '负责人信息',
                        dataIndex: 'maintainer',
                        key: 'maintainer',
                        scopedSlots: { customRender: 'maintainer' },
                        width:'12%',
                    },
                ],
                statusData: [
                    {
                        title: '全部',
                        status: 0,
                        string: 'total',
                        query: null,
                        index:0,
                    },
                    {
                        title: '空置',
                        status: 0,
                        string: 'vacantQuantity',
                        query: 1,
                        color: '#FB4246',
                        index:1,
                    },
                    {
                        title: '已租',
                        status: 0,
                        string: 'rentAlreadyQuantity',
                        query: 3,
                        color: '#03C683',
                        index:2,
                    },
                    {
                        title: '配置',
                        status: 0,
                        string: 'dispositionQuantity',
                        query: 4,
                        color: '#FFAF6D',
                        index:3,
                    },
                    {
                        title: '锁房',
                        status: 0,
                        string: 'lockedQuantity',
                        query: 5,
                        color: '#666666',
                        index:4,
                    },
                    {
                        title: '关闭',
                        status: 0,
                        string: 'closedQuantity',
                        query: 8,
                        line: true,
                        color: '#666666',
                        index:5,
                    }
                ],
                sendData: {
                    houseType:'',                   //分散房源类型:房源类型（1整租2合租）
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
                    size: 5,                       // 每页返回的记录数量
                    sort: '',                       // 排序字段
                    status: null,                   // 房间状态（1：空置；2：预定；3：已租；4：配置；5：锁房；6：锁房待签字；7：无效；8：关闭）
                    tenantId: '',                   // 租户ID
                    townId: '',                     // 商圈id
                    updateTime: '',                 // 修改时间
                    vacantDaysBegin: '',            // 空置天数区间开始
                    vacantDaysEnd: '',              // 空置天数区间结束
                },
                pagination_diagram:{
                    current: 1,
                    pageSize:5,
                },
                pagination_list:{
                    current: 1,
                    pageSize:10,
                },
                houseDiagram: {
                    list: [],
                    total: 0,
                },
                modalTitle: {
                    houseId: '',
                    houseAlias: '',
                    address: '',
                },
                houseAlias:'',
                address:'',
                addHouseDialog: false,
                confirmLoading: false,
                houseInfoDialog: false,
                addressObj: {
                    cityId: '',
                    communityId: '',
                    communityName: '',
                },
                isListMode: false,
                modeTitle: '切换列表模式',
                statusActiveIndex: 0,
                shareChildInfoDialog:false,
                houseTypeIndex:2,
                stepsNum:1,
                spinLoading:false,
                source:1,
                isRefresh:false,
              showMoreLoading:false,
              showMore:true,
              saveLoading_01:false,   //分散
              saveLoading_02:false,   //集中
              canShowMore:true,
              searchConditionFlag:true,   //拥有筛选条件
              priceBatchChangeDialog:false,
              showMoreFlag:true,
              setSearchCondition:{},
              statusIndex:0,
              changeCount:0,
              infoTransferDialog:false,
              infoBatchChangeDialog:false,
              batchProcessResultDialog:false,
              batchProcessResultTitle:'',
              btnArr:[],      //1、批量修改价格 ；2、房源信息批量修改；3、房源批量转移
              batchType:1,
              exportExcelShow:false,
              exportUrl: '/pc2b/house_decentralized/list_export',
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
            this.getPermission();
        },
        mounted(){
          //监听滚动条的事件
          document.getElementById("contentScroll").addEventListener("scroll", this.scrollBottom);
            if (this.$route.params.search == 'moveIn'){
              this.$refs.searchDialogId.searchList[2].currentActiveIndex = 5
              this.$refs.searchDialogId.searchDataArr.push({
                title: this.$refs.searchDialogId.searchList[2].title,
                val: this.$refs.searchDialogId.searchList[2].list[5].label,
              })
              this.$refs.searchDialogId.searchData.bizStatus = 5
              this.$refs.searchDialogId.confirm();
            }
            else if (this.$route.params.search == 'moveOut'){
                this.$refs.searchDialogId.searchList[2].currentActiveIndex = 6
                this.$refs.searchDialogId.searchDataArr.push({
                    title: this.$refs.searchDialogId.searchList[2].title,
                    val: this.$refs.searchDialogId.searchList[2].list[6].label,
                })
                this.$refs.searchDialogId.searchData.bizStatus = 6
                this.$refs.searchDialogId.confirm();
            }else if (this.$route.params.search == 'expired'){
                this.$refs.searchDialogId.searchList[2].currentActiveIndex = 7
                this.$refs.searchDialogId.searchDataArr.push({
                    title: this.$refs.searchDialogId.searchList[2].title,
                    val: this.$refs.searchDialogId.searchList[2].list[7].label,
                })
                this.$refs.searchDialogId.searchData.bizStatus = 7
                this.$refs.searchDialogId.confirm();
            }else{
                this.getStatusCount()
                if (this.isListMode){
                    this.getHouseList();
                }else{
                    this.getHouseDiagram();
                }
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
          getPermission(){
            let markArr = ['mk_house_index_fyjgplxg','mk_house_index_fyxxplxg','mk_house_index_fyplzy'];
            let btnArr = [];
            markArr.forEach(ele => {
              JSON.parse(sessionStorage.getItem('permissions')).some(function (value) {
                if (ele == value.mark) {
                  if (value.mark == 'mk_house_index_fyjgplxg') {
                    btnArr.push('1');
                  } else if (value.mark == 'mk_house_index_fyxxplxg') {
                    btnArr.push('2');
                  } else if (value.mark == 'mk_house_index_fyplzy') {
                    btnArr.push('3');
                  }
                }
              })
            });
            this.btnArr = btnArr;
          },
          goInfoBatchChange(){
            this.changeCount = this.statusData[this.statusIndex].status;
            if(this.changeCount==0){
              this.$message.warning('暂无修改数据');
              return ;
            }
            this.batchType = 2;
            this.setSearchCondition = this.$refs.searchDialogId.searchDataArr;
            this.infoBatchChangeDialog = true;
            this.initShowMoreFlag();
          },
          goInfoTransfer(){
            this.changeCount = this.statusData[this.statusIndex].status;
            if(this.changeCount==0){
              this.$message.warning('暂无修改数据');
              return ;
            }
            this.batchType = 3;
            this.setSearchCondition = this.$refs.searchDialogId.searchDataArr;
            this.infoTransferDialog = true;
            this.initShowMoreFlag();
          },
          goPriceBatchChange(){
            this.changeCount = this.statusData[this.statusIndex].status;
            if(this.changeCount==0){
              this.$message.warning('暂无修改数据');
              return ;
            }
            this.batchType = 1;
            this.setSearchCondition = this.$refs.searchDialogId.searchDataArr;
            this.priceBatchChangeDialog = true;
            this.initShowMoreFlag();
          },
          initShowMoreFlag(){
            this.showMoreFlag = false;
            setTimeout(()=>{
              this.showMoreFlag = true;
            },100);
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
                this.pagination_diagram.current += 1;
                this.canShowMore = false;
                this.getHouseDiagram(true);
              }
            }
          },
            refreshinfoFun(res){  //详情有改变的操作  就改变状态
                if(res){
                    this.isRefresh = res
                }
            },
            batchChangeSuccess(){
              this.priceBatchChangeDialog = false;
              this.infoTransferDialog = false;
              this.infoBatchChangeDialog = false;
              this.isRefresh = true;
              this.batchProcessResultDialog = true;
              if(this.batchType==1){
                this.batchProcessResultTitle = '房源价格批量修改';
              }
              else if(this.batchType==2){
                this.batchProcessResultTitle = '房源信息批量修改';
              }
              else if(this.batchType==3){
                this.batchProcessResultTitle = '房源批量转移';
              }
            },
            isRefreshFun() {
                this.houseInfoDialog = false;
                this.shareChildInfoDialog = false;
                this.batchProcessResultDialog = false;
                if(this.isRefresh){
                  this.pagination_diagram.pageSize = 5;
                  this.pagination_diagram.current = 1;
                  this.pagination_list.pageSize = 10;
                  this.pagination_list.current = 1;
                    if (this.isListMode){
                        this.getHouseList();
                    }else{
                        this.getHouseDiagram();
                    }
                    this.getStatusCount();
                    this.isRefresh = false
                }
            },
            deleteSuccess(){
                this.houseInfoDialog = false;
                this.shareChildInfoDialog = false;
                setTimeout(() => {
                  this.pagination_diagram.pageSize = 5;
                  this.pagination_diagram.current = 1;
                  this.pagination_list.pageSize = 10;
                  this.pagination_list.current = 1;
                    if (this.isListMode){
                        this.getHouseList();
                    }else{
                        this.getHouseDiagram();
                    }
                    this.getStatusCount()
                }, 500)
            },
            changeHouseTypeIndex(val){
                this.houseTypeIndex = val;
            },
            changeStepNum(val){
                this.stepsNum = val;
            },
            refreshPage(){
                this.addHouseDialog = false;
                this.getStatusCount();
                if (this.isListMode){
                    this.getHouseList();
                }else{
                    this.getHouseDiagram();
                }
            },
            getStatusCount() {
                let sendData = JSON.parse(JSON.stringify(this.sendData));
                sendData.status = '';
                decentralizedAPI.houseDecentralizedstatusStat(sendData).then(res => {
                    // console.log(res)
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
                this.sendData.status = status.query;
                this.pagination_diagram.pageSize = 5;
                this.pagination_diagram.current = 1;
                this.pagination_list.pageSize = 10;
                this.pagination_list.current = 1;
                this.statusIndex = status.index;
                if (this.isListMode){
                    this.getHouseList();
                }else{
                    this.getHouseDiagram();
                }
            },
            getHouseList() {
                this.loading = true;
                this.spinLoading = true;
                this.sendData.current = this.pagination_list.current;
                this.sendData.size = this.pagination_list.pageSize;
                decentralizedAPI.houseDecentralizedList(this.sendData).then(res => {
                    // console.log(res)
                    this.loading = false
                    if (res.code == 200) {
                        this.tableData.list = res.data.records
                        this.tableData.total = res.data.total
                        this.tableData.list.forEach((item, index)=>{
                            item.index = index + 1;
                        });
                    }
                },error => {
                    this.loading = false
                })
                this.spinLoading = false;
            },
            getHouseDiagram(flag) {
              if(flag){
                this.showMoreLoading = true;
              }
              else{
                this.spinLoading = true;
              }
                this.sendData.current = this.pagination_diagram.current;
                this.sendData.size = this.pagination_diagram.pageSize;
                this.setSearchConditionFlag();
                decentralizedAPI.houseDecentralizedDiagram(this.sendData).then(res => {
                    // console.log(res)
                    if (res&&res.code == 200) {
                      this.houseDiagram.total = res.data.total;
                      if(res.data.records.length>=5){
                        this.showMore = true;
                      }
                      else{
                        this.showMore = false;
                      }
                        if(flag){
                          if(res.data.records.length>0){
                            //已存在的不重复载入
                            let temp = [];
                            this.houseDiagram.list.forEach((item)=>{
                              temp.push(item.communityId);
                            });
                            res.data.records.forEach((item)=>{
                              if(temp.indexOf(item.communityId)==-1) {
                                this.houseDiagram.list.push(item);
                              }
                            });
                          }
                        }
                        else{
                          this.houseDiagram.list = res.data.records;
                        }
                    }
                    this.spinLoading = false;
                  this.showMoreLoading = false;
                  this.canShowMore = true;
                })
            },
            addHouse(item) {
                this.addHouseDialog = true;
                if (item){
                    this.addressObj = {
                        cityId: item.cityId,
                        communityId: item.communityId,
                        communityName: item.communityName,
                    }
                }
            },
            saveWholeHouse() {
                this.confirmLoading = true;
                this.$refs.addWholeHouse.saveWholeHouse().then(res => {
                    // console.log(res)
                    this.addHouseDialog = false;
                    this.confirmLoading = false;
                    setTimeout(() => {
                      this.getStatusCount();
                      this.pagination_diagram.pageSize = 5;
                      this.pagination_diagram.current = 1;
                      this.pagination_list.pageSize = 10;
                      this.pagination_list.current = 1;
                      if (this.isListMode){
                        this.getHouseList();
                      }else{
                        this.getHouseDiagram();
                      }
                    }, 500)
                }, err => {
                    this.confirmLoading = false;
                    // console.log(err)
                })
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
            openInfo(itemFirst,item,house) {
                if(house.houseType==1) {
                    this.houseInfoDialog = true;
                    this.modalTitle = {
                        houseId: house.housePid,
                        houseAlias: house.houseAlias,
                        address: house.fullAddress,
                    }
                    this.houseAlias = house.houseAlias;
                }
                if(house.houseType==2){
                    this.shareChildInfoDialog = true;
                    this.modalTitle = {
                        housePid: house.housePid,
                        roomId: house.houseId,
                        houseAlias: house.houseAlias,
                        address: house.fullAddress,
                    }
                    this.houseAlias = house.houseAlias;
                }
                let unit = item.unit?item.unit+'单元-':'-';
                this.address = itemFirst.cityName+itemFirst.areaName+itemFirst.communityName+item.buildingNo+'栋'+unit+house.doorplate+'室';
            },
            changeTitle(houseAlias,address){
                this.houseAlias = houseAlias;
                if(address) {
                    this.address = address;
                }
            },
            searchHouseList(searchData){
                searchData.status = this.sendData.status;
                this.sendData = searchData;
                this.pagination_diagram.current = 1;
                this.getStatusCount()
                if (this.isListMode){
                    this.getHouseList();
                }else{
                    this.getHouseDiagram();
                }
            },
            changeViewMode(){
                this.isListMode = !this.isListMode;
                this.isListMode ? this.modeTitle="切换房态模式" : this.modeTitle="切换列表模式";
                this.pagination_diagram.pageSize = 5;
                this.pagination_diagram.current = 1;
                this.pagination_list.pageSize = 10;
                this.pagination_list.current = 1;
                if (this.isListMode){
                    this.getHouseList();
                }else{
                    this.getHouseDiagram();
                }
                this.initShowMoreFlag();
            },
            pageChangeDiagram(current){
                this.pagination_diagram.current = current;
                this.getHouseDiagram();
            },
            sizeChangeDiagram(current, pageSize){
                this.pagination_diagram.current = current;
                this.pagination_diagram.pageSize = pageSize;
                this.getHouseDiagram();
            },
            pageChangeList(current){
                this.pagination_list.current = current;
                this.getHouseList();
            },
            sizeChangeList(current, pageSize){
                this.pagination_list.current = current;
                this.pagination_list.pageSize = pageSize;
                this.getHouseList();
            },
            openDetail(record) {
                return {
                    on: {
                        click: () => {
                            if(record.houseType==1) {
                                this.houseInfoDialog = true;
                                this.modalTitle = {
                                    houseId: record.housePid,
                                    houseAlias: record.houseAlias,
                                    address: record.fullAddress,
                                }
                                this.houseAlias = record.houseAlias;
                            }
                            if(record.houseType==2){
                                this.shareChildInfoDialog = true;
                                this.modalTitle = {
                                    housePid: record.housePid,
                                    roomId: record.houseId,
                                    houseAlias: record.houseAlias,
                                    address: record.fullAddress,
                                }
                                this.houseAlias = record.houseAlias;
                            }
                            let unit = record.unit?record.unit+'单元-':'-';
                            this.address = record.cityName+record.areaName+record.communityName+record.buildingNo+'栋'+unit+record.doorplate+'室';
                        }
                    }
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
    .moreStyle1{
      & /deep/ .ant-popover {
        .ant-popover-inner-content {
          width: 134px;
        }
      }
    }
    .moreStyle2{
      & /deep/ .ant-popover {
        .ant-popover-inner-content {
          width: 110px;
        }
      }
    }
    .moreStyle{
      & /deep/ .ant-popover {
        .ant-popover-inner-content {
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
    .change-view-mode{
        position: absolute;
        top: 0;
        right: 20px;
        margin: 9px 0;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        color: @tableTitle;
        z-index: 100;
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
            &:not(:last-child){
                border-bottom: 1px solid #eeeeee;
            }
        }
        .list-top {
            .house-info {
                .position-icon {
                    margin-right: 4px;
                    /*vertical-align: middle;*/
                    color: #111;
                }
                p {
                    padding-right: 10px;
                    margin-right: 10px;
                    border-right: 1px dashed #DDDDDD;
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
        .address{
            margin: 10px 0;
            width: 100%;
            background-color: rgba(250,251,252,1);
            border-radius:4px;
            height:32px;
            line-height: 32px;
            padding-left: 10px;
        }
        .house-child-list {

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
                  .electricNormal{
                    color:#FFA036;
                  }
                  .waterNormal{
                    color: #03C683;
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
    }
    .house-table-list{
        /deep/ .ant-popover-inner-content{
          width: 100px;
          text-align: center;
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
            font-size: 12px;
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
    .houseAlias{
        border: none!important;
        background-color: #f0f8ff;
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
