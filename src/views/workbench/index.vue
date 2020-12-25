<template>
  <div id="workbench">
    <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
    <skeleton-workbench v-show="hasWorkbench&&spinLoading">
    </skeleton-workbench>
    <content-main v-show="hasWorkbench">
      <div class="house f-clearfix" v-if="(permissionsArray.indexOf(1)>-1)||(permissionsArray.indexOf(2)>-1)">
        <div class="left f-fl">
          <div class="title">
            <icon-font class="title-icon" type="iconyumengtubiao_fangyuan-" />
            房源管理
          </div>
          <div>
            <div v-if="houeData.decentralizedStatDTO" class="house-con f-clearfix">
              <div class="occupancy-rate f-fl" @click="goto('share','index',1)">
                <p class="share-house">合/整租 <span>({{houeData.decentralizedStatDTO.allQuantity}}间)</span></p>
                <p>入住率：{{houeData.decentralizedStatDTO.occupancyRate}}%</p>
              </div>
              <ul class="f-fl house-info">
                <li @click="goto('share','vacant',1)">
                  <p><span class="vacant">{{houeData.decentralizedStatDTO.vacantQuantity}}</span></p>
                  <p><span>空置 </span></p>
                </li>
                <li @click="goto('share','config',1)">
                  <p><span class="config">{{houeData.decentralizedStatDTO.dispositionQuantity}}</span></p>
                  <p><span>配置 </span></p>
                </li>
                <li @click="goto('share','rent',1)">
                  <p><span class="rent">{{houeData.decentralizedStatDTO.rentAlreadyQuantity}}</span></p>
                  <p><span>已租 </span></p>
                </li>
                <li @click="goto('share','moveIn',1)" style="width: 160px;">
                  <p><span class="config">{{houeData.decentralizedStatDTO.moveInQuantity}}</span></p>
                  <p><span>即将搬入(30天内) </span></p>
                </li>
                <li @click="goto('share','moveOut',1)" style="width: 160px;">
                  <p><span class="config">{{houeData.decentralizedStatDTO.moveOutQuantity}}</span></p>
                  <p><span>即将到期({{houeData.expectDay?houeData.expectDay:'30'}}天内) </span></p>
                </li>
                <li @click="goto('share','expired',1)">
                  <p><span class="vacant">{{houeData.decentralizedStatDTO.expiredQuantity}}</span></p>
                  <p><span>已到期 </span></p>
                </li>
              </ul>
            </div>
            <div v-if="houeData.centralizedStatDTO" class="house-con f-clearfix">
              <div class="occupancy-rate f-fl" @click="goto('centralized','index',2)">
                <p class="centralized-house">独栋 <span>({{houeData.centralizedStatDTO.allQuantity}}间)</span> </p>
                <p>入住率：{{houeData.centralizedStatDTO.occupancyRate}}%</p>
              </div>
              <ul class="f-fl house-info">
                <li @click="goto('centralized','vacant',2)">
                  <p><span class="vacant">{{houeData.centralizedStatDTO.vacantQuantity}}</span></p>
                  <p><span>空置 </span></p>
                </li>
                <li @click="goto('centralized','config',2)">
                  <p><span class="config">{{houeData.centralizedStatDTO.dispositionQuantity}}</span></p>
                  <p><span>配置 </span></p>
                </li>
                <li @click="goto('centralized','rent',2)">
                  <p><span class="rent">{{houeData.centralizedStatDTO.rentAlreadyQuantity}}</span></p>
                  <p><span>已租 </span></p>
                </li>
                <li @click="goto('centralized','moveIn',2)" style="width: 160px;">
                  <p><span class="config">{{houeData.centralizedStatDTO.moveInQuantity}}</span></p>
                  <p><span>即将搬入(30天内) </span></p>
                </li>
                <li @click="goto('centralized','moveOut',2)" style="width: 160px;">
                  <p><span class="config">{{houeData.centralizedStatDTO.moveOutQuantity}}</span></p>
                  <p><span>即将到期({{houeData.expectDay?houeData.expectDay:'30'}}天内) </span></p>
                </li>
                <li @click="goto('centralized','expired',2)">
                  <p><span class="vacant">{{houeData.centralizedStatDTO.expiredQuantity}}</span></p>
                  <p><span>已到期 </span></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="right f-fr chart-wrap">
          <ul class="house-type">
            <li :class="{active: activeIndex == index}" @click="changeHouseType(item,index)" v-for="(item,index) in houseType" :key="index">{{item}}</li>
          </ul>
          <div v-if="houseDataNullFlag" style="position:absolute;top:50%;left:calc(50% - 30px);color: #777777">暂无数据</div>
          <div id="workbench-c1"></div>
        </div>
      </div>
      <div class="contract f-clearfix" v-if="(permissionsArray.indexOf(3)>-1)||(permissionsArray.indexOf(4)>-1)">
        <div class="left f-fl">
          <div class="title">
            <icon-font class="title-icon" type="iconyumengtubiao_daishenpirenyuan" />
            合约管理
          </div>
          <div>
            <div class="contract-con f-clearfix"  v-if="contractData.renterContractStatDTO">
              <div class="contract-count f-fl" @click="goto('tenant','index',3)">
                <p>
                  <b>
                    <span>租客合同</span>
                    <span>（{{contractData.renterContractStatDTO.allQuantity}}份）</span>
                  </b>
                </p>
              </div>
              <ul class="f-fl f-clearfix contract-info">
                <li class="f-fl" @click="goto('tenant','toBeSign',3)">
                  <p class="config">{{contractData.renterContractStatDTO.toBeSignQuantity}}</p>
                  <p>待签字</p>
                </li>
                <li class="f-fl" @click="goto('tenant','inRent',3)">
                  <p class="rent">{{contractData.renterContractStatDTO.inRentQuantity}}</p>
                  <p>在租中</p>
                </li>
                <li class="f-fl" @click="goto('tenant','moveOut',3)">
                  <p class="config">{{contractData.renterContractStatDTO.moveOutQuantity}}</p>
                  <p>即将搬出</p>
                </li>
                <li class="f-fl" @click="goto('tenant','expired',3)">
                  <p class="vacant">{{contractData.renterContractStatDTO.expiredQuantity}}</p>
                  <p>已到期</p>
                </li>
              </ul>
            </div>
            <div class="contract-con f-clearfix"  v-if="contractData.ownerContractStatDTO">
              <div class="contract-count f-fl" @click="goto('owner','index',4)">
                <p>
                  <b>
                    <span>业主合同</span>
                    <span>（{{contractData.ownerContractStatDTO.allQuantity}}份）</span>
                  </b>
                </p>
              </div>
              <ul class="f-fl f-clearfix contract-info">
                <li class="f-fl" @click="goto('owner','inRent',4)">
                  <p class="rent">{{contractData.ownerContractStatDTO.inRentQuantity}}</p>
                  <p>合约中</p>
                </li>
                <li class="f-fl" @click="goto('owner','moveOut',4)">
                  <p class="config">{{contractData.ownerContractStatDTO.moveOutQuantity}}</p>
                  <p>即将到期</p>
                </li>
                <li class="f-fl" @click="goto('owner','expired',4)">
                  <p class="vacant">{{contractData.ownerContractStatDTO.expiredQuantity}}</p>
                  <p>已到期</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="right f-fr chart-wrap">
          <ul class="contract-type">
            <li :class="{active: contractActiveIndex == index}" @click="changeContractType(item,index)" v-for="(item,index) in ContractType" :key="index">{{item}}</li>
          </ul>
          <div id="workbench-c2"></div>
        </div>
      </div>
      <div class="finance f-clearfix" v-if="permissionsArray.indexOf(5)>-1">
        <div class="left f-fl">
          <div class="title">
            <icon-font class="title-icon" type="iconyumengtubiao_caiwuguanli" />
            财务管理
          </div>
          <div class="finance-con">
            <div class="finance-info">
              <div class="total-balance">
                <div>
                  <a-statistic valueStyle="font-size:16px;color: #111111;" :precision="2" :value="billData.totalBalance/100" />
                  <p>账户总额</p>
                </div>
              </div>
              <div class="total-balance-detail">
                <div class="yesterday">
                  <p class="date">昨日</p>
                  <div class="yesterday-balance">
                    <a-statistic valueStyle="font-size:16px;color: #0A87F8;" :precision="2" :value="billData.yesterdayBalance/100" />
                    <p>昨日营收(元)</p>
                  </div>
                  <div>
                    <a-statistic valueStyle="font-size:16px;color: #0A87F8;" :precision="2" :value="billData.yesterdayReceivedAmount/100" />
                    <p>昨日收入(元)</p>
                  </div>
                  <div>
                    <a-statistic valueStyle="font-size:16px;color: #0A87F8;" :precision="2" :value="billData.yesterdaySpentAmount/100" />
                    <p>昨日支出(元)</p>
                  </div>
                </div>
                <div class="today">
                  <p class="date">今日</p>
                  <div class="today-balance">
                    <a-statistic valueStyle="font-size:16px;color: #0A87F8;" :precision="2" :value="billData.todayBalance/100" />
                    <p>今日营收(元)</p>
                  </div>
                  <div>
                    <a-statistic valueStyle="font-size:16px;color: #0A87F8;" :precision="2" :value="billData.todayReceivedAmount/100" />
                    <p>今日收入(元)</p>
                  </div>
                  <div>
                    <a-statistic valueStyle="font-size:16px;color: #0A87F8;" :precision="2" :value="billData.todaySpentAmount/100" />
                    <p>今日支出(元)</p>
                  </div>
                </div>
              </div>
            </div>
            <!--
            <div class="overdueAmount">
                <div class="arrow-down"></div>
                <p >
                   累计欠费(元)：<a-statistic style="display: inline-block" valueStyle="font-size:16px;color: #0A87F8;" :precision="2" :value="billData.overdueAmount/100" />
                </p>
            </div>
            -->
            <div class="in-out">
              <div class="in-detail">
                <p class="in-tag">
                  <span>收</span>
                </p>
                <div class="in-total" @click="goto('bill','income')">
                  <div>
                    <p>
                                            <span class="tag-icon">
                                                <b>{{billData.incomeTotal}}</b>
                                            </span>
                    </p>
                    <p>应收(笔)</p>
                  </div>
                  <div>
                    <p class="in-Yaxis">
                      <a-statistic valueStyle="font-size:16px;color: #0A87F8;" :precision="2" :value="billData.incomeAmount/100" />
                    </p>
                    <p>应收(元)</p>
                  </div>
                </div>
                <div class="today-total" @click="goto('bill','todayIncome')">
                  <div>
                    <p class="tag-icon">
                      <b>{{billData.todayIncomeTotal}}</b>
                    </p>
                    <p>今日(笔)</p>
                  </div>
                  <div>
                    <p>
                      <a-statistic valueStyle="font-size:16px;color:#111111" :precision="2" :value="billData.todayIncomeAmount/100" />
                    </p>
                    <p>今日应收(元)</p>
                  </div>
                </div>
                <div class="overdue-total" @click="goto('bill','overdueIncome')">
                  <div>
                    <p class="tag-icon">
                      <b>{{billData.overdueIncomeTotal}}</b>
                    </p>
                    <p>逾期(笔)</p>
                  </div>
                  <div>
                    <p>
                      <a-statistic valueStyle="font-size:16px;color:#111111" :precision="2" :value="billData.overdueIncomeAmount/100" />
                    </p>
                    <p>逾期应收(元)</p>
                  </div>
                </div>
              </div>
              <div class="out-detail">
                <p class="out-tag">
                  <span>支</span>
                </p>
                <div class="out-total" @click="goto('bill','expend')">
                  <div>
                    <p>
                                            <span class="tag-icon">
                                                <b>{{billData.expendTotal}}</b>
                                            </span>
                    </p>
                    <p>应支(笔)</p>
                  </div>
                  <div>
                    <p class="out-Yaxis">
                      <a-statistic valueStyle="font-size:16px;color:#FB4246" :precision="2" :value="billData.expendAmount/100" />
                    </p>
                    <p>应支(元)</p>
                  </div>
                </div>
                <div class="today-total" @click="goto('bill','todayExpend')">
                  <div>
                    <p class="tag-icon">
                      <b>{{billData.todayExpendTotal}}</b>
                    </p>
                    <p>今日(笔)</p>
                  </div>
                  <div>
                    <p>
                      <a-statistic valueStyle="font-size:16px;color:#111111" :precision="2" :value="billData.todayExpendAmount/100" />
                    </p>
                    <p>今日支收(元)</p>
                  </div>
                </div>
                <div class="overdue-total" @click="goto('bill','overdueExpend')">
                  <div>
                    <p class="tag-icon">
                      <b>{{billData.overdueExpendTotal}}</b>
                    </p>
                    <p>逾期(笔)</p>
                  </div>
                  <div>
                    <p>
                      <a-statistic valueStyle="font-size:16px;color:#111111" :precision="2" :value="billData.overdueExpendAmount/100" />
                    </p>
                    <p>逾期应支(元)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right f-fr chart-wrap">
          <p>近6月交易流水</p>
          <div id="c3"></div>
        </div>
      </div>
      <div class="workorder" v-if="(permissionsArray.indexOf(6)>-1)||(permissionsArray.indexOf(7)>-1)">
        <div class="title first-box">
          <icon-font class="title-icon" type="iconfangzi" />
          租前
        </div>
        <div class="workorder-content clearfix">
          <div class="detail bgStyle f-fl clearfix" v-if="permissionsArray.indexOf(6)>-1">
            <div style="position: relative" class="title leftBgStyle f-fl cursor" @click="goto('tenantSource','pending',6)">
              <div style="position: absolute;top:0px;left: 0px;">
                <img style="width: 52px;height: 52px;" src="../../assets/workbench/source.png">
              </div>
              <div class="titleNumberStyle nameCommonStyle margin-bottom2" style="color: #FF8600;">{{workorderBeforeData.reservationStatDTO.pending}}</div>
              <div class="nameStyle nameCommonStyle">待处理</div>
            </div>
            <div class="details f-fl cursor" style="margin-left: 14px" @click="goto('tenantSource','todayQuantity',6)">
              <div class="processingStyle commonStyle margin-bottom2" style="color: #111111;">{{workorderBeforeData.reservationStatDTO.todayQuantity}}</div>
              <div class="nameStyle commonStyle">今日预约</div>
            </div>
            <div class="details f-fl cursor" @click="goto('tenantSource','weekQuantity',6)">
              <div class="pendingStyle commonStyle margin-bottom2" style="color: #111111;">{{workorderBeforeData.reservationStatDTO.weekQuantity}}</div>
              <div class="nameStyle commonStyle">本周预约</div>
            </div>
            <div class="details f-fl cursor" @click="goto('tenantSource','monthQuantity',6)">
              <div class="acceptanceStyle commonStyle margin-bottom2" style="color: #111111;">{{workorderBeforeData.reservationStatDTO.monthQuantity}}</div>
              <div class="nameStyle commonStyle">本月预约</div>
            </div>
          </div>
          <div class="detail bgStyle f-fl clearfix" style="margin-left: 10px;" v-if="permissionsArray.indexOf(7)>-1">
            <div style="position: relative" class="title leftBgStyle f-fl cursor" @click="goto('reserve','pending',7)">
              <div style="position: absolute;top:0px;left: 0px;">
                <img style="width: 52px;height: 52px;" src="../../assets/workbench/reserve.png">
              </div>
              <div class="titleNumberStyle nameCommonStyle margin-bottom2" style="color: #FF8600;">{{workorderBeforeData.houseBookStatDTO.pending}}</div>
              <div class="nameStyle nameCommonStyle">待使用</div>
            </div>
            <div class="details f-fl cursor" style="margin-left: 14px" @click="goto('reserve','todayQuantity',7)">
              <div class="processingStyle commonStyle margin-bottom2" style="color: #111111;">{{workorderBeforeData.houseBookStatDTO.todayQuantity}}</div>
              <div class="nameStyle commonStyle">今日预定</div>
            </div>
            <div class="details f-fl cursor" @click="goto('reserve','weekQuantity',7)">
              <div class="pendingStyle commonStyle margin-bottom2" style="color: #111111;">{{workorderBeforeData.houseBookStatDTO.weekQuantity}}</div>
              <div class="nameStyle commonStyle">本周预定</div>
            </div>
            <div class="details f-fl cursor" @click="goto('reserve','monthQuantity',7)">
              <div class="acceptanceStyle commonStyle margin-bottom2" style="color: #111111;">{{workorderBeforeData.houseBookStatDTO.monthQuantity}}</div>
              <div class="nameStyle commonStyle">本月约定</div>
            </div>
          </div>
        </div>
      </div>
      <div class="workorder clearfix" v-if="(permissionsArray.indexOf(8)>-1)||(permissionsArray.indexOf(9)>-1)||(permissionsArray.indexOf(10)>-1)||(permissionsArray.indexOf(11)>-1)">
        <div class="title first-box">
          <icon-font class="title-icon" type="icon-yumengtubiao_shouye-zuhou" />
          租后
        </div>
        <div class="workorder-content clearfix" v-if="(permissionsArray.indexOf(8)>-1)||(permissionsArray.indexOf(9)>-1)">
          <div class="detail bgStyle f-fl clearfix" v-if="permissionsArray.indexOf(8)>-1">
            <div class="title leftBgStyle f-fl cursor" @click="goto('repair','all',8)">
              <div class="titleNumberStyle nameCommonStyle margin-bottom2">{{workorderData.repairStatDTO.total}}</div>
              <div class="nameStyle nameCommonStyle">维修服务</div>
            </div>
            <div class="details f-fl cursor" style="margin-left: 14px" @click="goto('repair','pending',8)">
              <div class="processingStyle commonStyle margin-bottom2">{{workorderData.repairStatDTO.pending}}</div>
              <div class="nameStyle commonStyle">待处理</div>
            </div>
            <div class="details f-fl cursor" @click="goto('repair','processing',8)">
              <div class="pendingStyle commonStyle margin-bottom2">{{workorderData.repairStatDTO.processing}}</div>
              <div class="nameStyle commonStyle">处理中</div>
            </div>
            <div v-if="workorderData.repairIsAcceptance==1" class="details f-fl cursor" @click="goto('repair','acceptance',8)">
              <div class="acceptanceStyle commonStyle margin-bottom2">{{workorderData.repairStatDTO.acceptance}}</div>
              <div class="nameStyle commonStyle">待验收</div>
            </div>
          </div>
          <div class="detail bgStyle f-fl clearfix" style="margin-left: 10px;" v-if="permissionsArray.indexOf(9)>-1">
            <div class="title leftBgStyle f-fl cursor" @click="goto('cleaning','all',9)">
              <div class="titleNumberStyle nameCommonStyle margin-bottom2">{{workorderData.cleanStatDTO.total}}</div>
              <div class="nameStyle nameCommonStyle">保洁服务</div>
            </div>
            <div class="details f-fl cursor" style="margin-left: 14px" @click="goto('cleaning','pending',9)">
              <div class="processingStyle commonStyle margin-bottom2">{{workorderData.cleanStatDTO.pending}}</div>
              <div class="nameStyle commonStyle">待处理</div>
            </div>
            <div class="details f-fl cursor" @click="goto('cleaning','processing',9)">
              <div class="pendingStyle commonStyle margin-bottom2">{{workorderData.cleanStatDTO.processing}}</div>
              <div class="nameStyle commonStyle">处理中</div>
            </div>
            <div v-if="workorderData.cleanIsAcceptance==1" class="details f-fl cursor" @click="goto('cleaning','acceptance',9)">
              <div class="acceptanceStyle commonStyle margin-bottom2">{{workorderData.cleanStatDTO.acceptance}}</div>
              <div class="nameStyle commonStyle">待验收</div>
            </div>
          </div>
        </div>
        <div class="workorder-content clearfix" v-if="(permissionsArray.indexOf(10)>-1)||(permissionsArray.indexOf(11)>-1)">
          <div class="detail bgStyle f-fl clearfix" v-if="permissionsArray.indexOf(10)>-1">
            <div class="title leftBgStyle f-fl cursor" @click="goto('distribution','all',10)">
              <div class="titleNumberStyle nameCommonStyle margin-bottom2">{{workorderData.distributionStatDTO.total}}</div>
              <div class="nameStyle nameCommonStyle">配货服务</div>
            </div>
            <div class="details f-fl cursor" style="margin-left: 14px" @click="goto('distribution','pending',10)">
              <div class="processingStyle commonStyle margin-bottom2">{{workorderData.distributionStatDTO.pending}}</div>
              <div class="nameStyle commonStyle">待处理</div>
            </div>
            <div class="details f-fl cursor" @click="goto('distribution','processing',10)">
              <div class="pendingStyle commonStyle margin-bottom2">{{workorderData.distributionStatDTO.processing}}</div>
              <div class="nameStyle commonStyle">处理中</div>
            </div>
            <div v-if="workorderData.distributionIsAcceptance==1" class="details f-fl cursor" @click="goto('distribution','acceptance',10)">
              <div class="acceptanceStyle commonStyle margin-bottom2">{{workorderData.distributionStatDTO.acceptance}}</div>
              <div class="nameStyle commonStyle">待验收</div>
            </div>
          </div>
          <div class="detail bgStyle f-fl clearfix" style="margin-left: 10px;" v-if="permissionsArray.indexOf(11)>-1">
            <div class="title leftBgStyle f-fl cursor" @click="goto('complaint','all',11)">
              <div class="titleNumberStyle nameCommonStyle margin-bottom2">{{workorderData.complaintStatDTO.total}}</div>
              <div class="nameStyle nameCommonStyle">投诉服务</div>
            </div>
            <div class="details f-fl cursor" style="margin-left: 14px" @click="goto('complaint','pending',11)">
              <div class="processingStyle commonStyle margin-bottom2">{{workorderData.complaintStatDTO.pending}}</div>
              <div class="nameStyle commonStyle">待处理</div>
            </div>
            <div class="details f-fl cursor" @click="goto('complaint','processing',11)">
              <div class="pendingStyle commonStyle margin-bottom2">{{workorderData.complaintStatDTO.processing}}</div>
              <div class="nameStyle commonStyle">处理中</div>
            </div>
            <div v-if="workorderData.complaintIsAcceptance==1" class="details f-fl cursor" @click="goto('complaint','acceptance',11)">
              <div class="acceptanceStyle commonStyle margin-bottom2">{{workorderData.complaintStatDTO.acceptance}}</div>
              <div class="nameStyle commonStyle">待验收</div>
            </div>
          </div>
        </div>
      </div>
      <div class="workorder" v-if="(permissionsArray.indexOf(12)>-1)||(permissionsArray.indexOf(13)>-1)||(permissionsArray.indexOf(18)>-1)">
        <div class="title first-box">
          <icon-font class="title-icon" type="iconwangguanzhuangtai" />
          智能设备
        </div>
        <div class="workorder-content clearfix">
          <div class="detail bgStyle f-fl clearfix" v-if="permissionsArray.indexOf(12)>-1">
            <div style="position: relative;" class="title leftBgStyle f-fl cursor" @click="goto('lock','all',12)">
              <div style="position: absolute;top:0px;left: 0px;">
                <img style="width: 52px;height: 52px;" src="../../assets/workbench/lock.png">
              </div>
              <div class="titleNumberStyle nameCommonStyle margin-bottom2">{{doorData.total}}</div>
              <div class="nameStyle nameCommonStyle">门锁统计</div>
            </div>
            <div class="details f-fl cursor" style="margin-left: 14px;width: 100px;" @click="goto('lock','online',12)">
              <div class="processingStyle littleCommonStyle margin-bottom2">{{doorData.onlineTotal}}</div>
              <div class="nameStyle littleCommonStyle">在线</div>
            </div>
            <div class="details f-fl cursor" style="width: 100px;" @click="goto('lock','onlineLowPower',12)">
              <div class="acceptanceStyle littleCommonStyle margin-bottom2">{{doorData.onlineLowPowerTotal}}</div>
              <div class="nameStyle littleCommonStyle">低电量</div>
            </div>
            <div class="details f-fl cursor" style="width: 100px;" @click="goto('lock','offline',12)">
              <div class="offLineStyle littleCommonStyle margin-bottom2">{{doorData.offlineTotal}}</div>
              <div class="nameStyle littleCommonStyle">离线</div>
            </div>
            <div class="details f-fl cursor" style="width: 100px;" @click="goto('lock','threeDaysUnlocked',12)">
              <div class="acceptanceStyle littleCommonStyle margin-bottom2">{{doorData.threeDaysUnlockedTotal}}</div>
              <div class="nameStyle littleCommonStyle">近3天未开锁</div>
            </div>
          </div>
          <div class="detail bgStyle f-fl clearfix" style="margin-left: 10px;" v-if="permissionsArray.indexOf(13)>-1">
            <div style="position: relative;" class="title leftBgStyle f-fl cursor" @click="goto('electric','all',13)">
              <div style="position: absolute;top:0px;left: 0px;">
                <img style="width: 52px;height: 52px;" src="../../assets/workbench/electric.png">
              </div>
              <div class="titleNumberStyle nameCommonStyle margin-bottom2">{{electricData.total}}</div>
              <div class="nameStyle nameCommonStyle">电表总计</div>
            </div>
            <div class="details f-fl cursor" style="margin-left: 14px" @click="goto('electric','powerSupply',13)">
              <div class="processingStyle commonStyle margin-bottom2">{{electricData.powerSupplyTotal}}</div>
              <div class="nameStyle commonStyle">供电</div>
            </div>
            <div class="details f-fl cursor" @click="goto('electric','powerOff',13)">
              <div class="offLineStyle commonStyle margin-bottom2">{{electricData.powerOffTotal}}</div>
              <div class="nameStyle commonStyle">断电</div>
            </div>
            <div class="details f-fl cursor" @click="goto('electric','error',13)">
              <div class="acceptanceStyle commonStyle margin-bottom2">{{electricData.errTotal}}</div>
              <div class="nameStyle commonStyle">异常</div>
            </div>
          </div>
        </div>
        <div class="workorder-content clearfix" v-if="permissionsArray.indexOf(18)>-1" style="padding-bottom: 14px;">
          <div class="detail bgStyle f-fl clearfix">
            <div style="position: relative;" class="title leftBgStyle f-fl cursor" @click="goto('water','cold',18)">
              <div style="position: absolute;top:0px;left: 0px;">
                <img style="width: 52px;height: 52px;" src="../../assets/workbench/coldWater.png">
              </div>
              <div class="titleNumberStyle nameCommonStyle margin-bottom2">{{waterData.coldWaterValveOpenTotal+waterData.coldWaterValveCloseTotal}}</div>
              <div class="nameStyle nameCommonStyle">冷水表</div>
            </div>
            <div class="details f-fl cursor" style="margin-left: 14px;width: 100px;" @click="goto('water','coldNormal',18)">
              <div class="processingStyle littleCommonStyle margin-bottom2">{{waterData.coldWaterValveOpenTotal}}</div>
              <div class="nameStyle littleCommonStyle">供水</div>
            </div>
            <div class="details f-fl cursor" style="width: 100px;" @click="goto('water','coldAbnormal',18)">
              <div class="acceptanceStyle littleCommonStyle margin-bottom2">{{waterData.coldWaterValveCloseTotal}}</div>
              <div class="nameStyle littleCommonStyle">断水</div>
            </div>
          </div>
          <div class="detail bgStyle f-fl clearfix" style="margin-left: 10px;">
            <div style="position: relative;" class="title leftBgStyle f-fl cursor" @click="goto('water','hot',18)">
              <div style="position: absolute;top:0px;left: 0px;">
                <img style="width: 52px;height: 52px;" src="../../assets/workbench/hotWater.png">
              </div>
              <div class="titleNumberStyle nameCommonStyle margin-bottom2">{{waterData.hotWaterValveOpenTotal+waterData.hotWaterValveCloseTotal}}</div>
              <div class="nameStyle nameCommonStyle">热水表</div>
            </div>
            <div class="details f-fl cursor" style="margin-left: 14px" @click="goto('water','hotNormal',18)">
              <div class="processingStyle commonStyle margin-bottom2">{{waterData.hotWaterValveOpenTotal}}</div>
              <div class="nameStyle commonStyle">供水</div>
            </div>
            <div class="details f-fl cursor" @click="goto('water','hotAbnormal',18)">
              <div class="acceptanceStyle commonStyle margin-bottom2">{{waterData.  hotWaterValveCloseTotal}}</div>
              <div class="nameStyle commonStyle">断水</div>
            </div>
          </div>
        </div>
      </div>
      <div class="assets" v-if="permissionsArray.indexOf(17)>-1">
        <div class="title first-box">
          <icon-font class="title-icon" type="iconzichan" />
          物资管理
        </div>
        <div class="assets-content">
          <div class="detail bgStyle clearfix">
            <div style="position: relative;text-align: left;" class="title leftBgStyle f-fl cursor" @click="goto('management','all',17)">
              <div class="titleNumberStyle nameCommonStyle margin-bottom2">物品总数：{{assetsData.totalQuantity}}<span style="color: #777777;font-size: 16px;"> 件</span></div>
              <div class="titleNumberStyle nameCommonStyle">物品总价：{{assetsData.totalPrice/100}}<span style="color: #777777;font-size: 16px;"> 元</span></div>
            </div>
            <div class="details cursor" style="width: 100px;background: #F5F7FF;" @click="goto('management','companyType',17)">
              <div class="greenStyle littleCommonStyle margin-bottom2">{{assetsData.companyTotalQuantity}}</div>
              <div class="fontColorStyle littleCommonStyle">公司物品总数(件)</div>
            </div>
            <div class="details cursor" style="width: 100px;background: #F5F7FF;position: relative;" @click="goto('management','companyType',17)">
              <div class="greenStyle littleCommonStyle margin-bottom2">¥{{assetsData.companyTotalPrice/100}}</div>
              <div class="fontColorStyle littleCommonStyle">公司物品总数(元)</div>
              <div class="splitStyle"></div>
            </div>
            <div class="details cursor" style="width: 100px;background: #F5F7FF;" @click="goto('management','ownerType',17)">
              <div class="pendingStyle littleCommonStyle margin-bottom2">{{assetsData.ownerTotalQuantity}}</div>
              <div class="fontColorStyle littleCommonStyle">业主物品总数(件)</div>
            </div>
            <div class="details cursor" style="width: 100px;background: #F5F7FF;" @click="goto('management','ownerType',17)">
              <div class="pendingStyle littleCommonStyle margin-bottom2">¥{{assetsData.ownerTotalPrice/100}}</div>
              <div class="fontColorStyle littleCommonStyle">业主物品总数(元)</div>
            </div>
            <div class="details cursor" style="width: 100px;" @click="goto('management','idle',17)">
              <div class="acceptanceStyle littleCommonStyle margin-bottom2">{{assetsData.idleTotalQuantity}}</div>
              <div class="fontColorStyle littleCommonStyle">闲置物品总数(件)</div>
            </div>
            <div class="details cursor" style="width: 100px;" @click="goto('management','idle',17)">
              <div class="acceptanceStyle littleCommonStyle margin-bottom2">¥{{assetsData.idleTotalPrice/100}}</div>
              <div class="fontColorStyle littleCommonStyle">闲置物品总数(元)</div>
            </div>
          </div>
        </div>
      </div>
      <div class="workflow" v-if="(permissionsArray.indexOf(14)>-1)||(permissionsArray.indexOf(15)>-1)||(permissionsArray.indexOf(16)>-1)">
        <div class="title first-box">
          <icon-font class="title-icon" type="iconyumengtubiao_daishenpirenyuan" />
          审批管理
        </div>
        <div class="workflow-content">
          <div class="detail clearfix">
            <div class="f-fl clearfix cursor" style="margin-right: 60px;" @click="goto('myTodo','',14)">
              <div class="f-fl bgStyle">
                <icon-font class="title-icon" type="icondaishenpi" />
              </div>
              <div class="f-fl normalStyle">
                <span class="commonStyle">待我审批</span><span class="myTaskTotalStyle">（{{flowData.myTaskTotal}}）</span>
              </div>
            </div>
            <div class="f-fl clearfix cursor" style="margin-right: 60px;" @click="goto('myLaunch','unDo',15)">
              <div class="f-fl bgStyle">
                <icon-font class="title-icon" type="iconwofaqi" />
              </div>
              <div class="f-fl normalStyle">
                <span class="commonStyle">我发起的</span><span class="mySubmitStyle">（{{flowData.mySubmitTotal}}）</span>
              </div>
            </div>
            <div class="f-fl clearfix cursor" @click="goto('myCc','unDo',16)">
              <div class="f-fl bgStyle">
                <icon-font class="title-icon" type="iconchaosongwo" />
              </div>
              <div class="f-fl normalStyle">
                <span class="commonStyle">抄送我的</span><span class="ccMeStyle">（{{flowData.ccMeTotal}}）</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </content-main>
    <content-main v-if="!hasWorkbench" style="background-color: #ffffff">
      <div class="no-permissions-wrap">
        <div class="title">{{apartmentName}}</div>
        <div class="bg-title">APARTMENT</div>
        <div class="tips">公寓管理员未给您分配访问权限，请联系管理员设置~</div>
        <img src="./../../assets/no-permission.png">
      </div>
    </content-main>
  </div>
</template>
<script>
import {ROUTER} from '@/store/mutation-types';
import G2 from '@antv/g2';
import { DataSet } from '@antv/data-set';
import * as API from '@/api/workbench'
import { employeeUserInfo } from '@/api/enterprise';
import skeletonWorkbench from '../skeleton/workbench';
export default {
  name: "workbench",
  components: {
    skeletonWorkbench,
  },
  data(){
    return {
      houeData: {},
      contractData: {},
      houseType: ['全部','合/整租','独栋'],
      ContractType: ['租客','业主'],
      billData: {},
      workorderBeforeData:{
        reservationStatDTO:{},
        houseBookStatDTO:{},
      },
      doorData:{},
      electricData:{},
      waterData:{},
      flowData:{},
      assetsData:{},
      workorderData:{
        repairStatDTO:{},
        cleanStatDTO:{},
        distributionStatDTO:{},
        complaintStatDTO:{},
      },
      activeIndex: 0,
      contractActiveIndex: 0,
      houseChart: null,
      contractChart: null,
      houseDataNullFlag:false,
      spinLoading:true,
      noPermissions: false,
      hasWorkbench: false,
      apartmentName: '',
      permissionsArray:[],      //权限集合
    }
  },
  created() {
    let router = JSON.parse(this.$ls.get(ROUTER))
    router && router.forEach(val=>{
      if (val.mark == 'mk_workbench'){
        this.hasWorkbench = true
      }
    })
    if (!this.hasWorkbench){
      this.getUserInfo()
    }
    if (JSON.parse(sessionStorage.getItem('permissions')).length==0){
      this.noPermissions = true
    }
    else{
      this.getOtherPermissions();
    }

  },
  mounted() {
    this.spinLoading = true;
    if (this.hasWorkbench){
      this.getHoueDetail();
      this.getContractDetail();
      this.getBillDetail();
      this.getWorkorderBeforeDetail();
      this.getWorkorderDetail();
      this.getDoorData();
      this.getElectricData();
      this.getWaterData();
      this.getFlowData();
      this.workbenchAssetsStat();
    }
    setTimeout(()=>{
      this.spinLoading = false;
    },500);
  },
  methods: {
    getOtherPermissions(){
      let permissionsArray = [];
      let permissions = JSON.parse(sessionStorage.getItem('permissions'));
      permissions.some(function(value){
        //1、合/整租；2、独栋；3、租客合同；4、业主合同；5、账单；6、预约；7、预定；8、维修；9、保洁；10、配货；
        //11、投诉；12、门锁；13、电表；14、待我审批；15、我发起；16、抄送我的；17、资产管理；18、水表
        if (value.mark == 'mk_house_index_ck'){
          permissionsArray.push(1);
        }
        if(value.mark == "mk_house_centralized_ck"){
          permissionsArray.push(2);
        }
        if(value.mark == "mk_contract_tenant_ck"){
          permissionsArray.push(3);
        }
        if(value.mark == "mk_contract_owner_ck"){
          permissionsArray.push(4);
        }
        if(value.mark == "mk_finance_bill_ck"){
          permissionsArray.push(5);
        }
        if(value.mark == "mk_source_tenant_xsyy_ck"){
          permissionsArray.push(6);
        }
        if(value.mark == "mk_contract_reserve_ck"){
          permissionsArray.push(7);
        }
        if(value.mark == "mk_workorder_repair_ck"){
          permissionsArray.push(8);
        }
        if(value.mark == "mk_workorder_clean_ck"){
          permissionsArray.push(9);
        }
        if(value.mark == "mk_workorder_distribution_ck"){
          permissionsArray.push(10);
        }
        if(value.mark == "mk_workorder_complaint_ck"){
          permissionsArray.push(11);
        }
        if(value.mark == "mk_smartDevices_doorLoc_ck"){
          permissionsArray.push(12);
        }
        if(value.mark == "mk_smartDevices_electric_ck"){
          permissionsArray.push(13);
        }
        if(value.mark == "mk_workflow_myTodo_ck"){
          permissionsArray.push(14);
        }
        if(value.mark == "mk_workflow_myLaunch_ck"){
          permissionsArray.push(15);
        }
        if(value.mark == "mk_workflow_myCc_ck"){
          permissionsArray.push(16);
        }
        if(value.mark == "mk_assets_management_ck"){
          permissionsArray.push(17);
        }
        if(value.mark == "mk_smartDevices_water_ck"){
          permissionsArray.push(18);
        }
      });
      this.permissionsArray = permissionsArray;
    },
    getUserInfo() {
      employeeUserInfo().then(res => {
        if (res.code == 200){
          this.apartmentName = res.data.apartmentName
        }
      });
    },
    goto(path,type,remark){
      //判断id是否存在，若不存在提示
      if(remark&&this.permissionsArray.indexOf(remark)==-1){
        this.$message.warning('暂无权限，请联系管理员开通');
        return ;
      }
      this.$router.push({ name: path, params: { search: type }})
    },
    changeHouseType(type,index){
      this.activeIndex = index
      let data = '';
      if (type == '全部'){
        data = this.houeData.allStatDTO
      }else if (type == '合/整租'){
        data = this.houeData.decentralizedStatDTO
      }else if (type == '独栋'){
        data = this.houeData.centralizedStatDTO
      }
      if(this.houseChart){
        document.getElementById('workbench-c1').innerHTML="";//清除内容
      }
      this.changeHouseData(data);
    },
    changeContractType(type,index){
      this.contractActiveIndex = index;
      let data = '';
      if (type == '租客'){
        data = this.contractData.rContractNearlySixMonthStatList
      }else{
        data = this.contractData.oContractNearlySixMonthStatList
      }
      let newData = this.formatContractData(data);
      this.contractChart.changeData(newData)
    },
    getHoueDetail(){
      API.getHouseData().then(res=>{
        // console.log(res)
        if (res.code == 200){
          this.houeData = res.data
          this.changeHouseData(this.houeData.allStatDTO)
        }
      })
    },
    getContractDetail(){
      API.getContractData().then(res=>{
        // console.log(res)
        if (res.code == 200){
          this.contractData = res.data
          this.changeContractData(this.contractData.rContractNearlySixMonthStatList);
        }
      })
    },
    getBillDetail(){
      API.getBillData().then(res=>{
        // console.log(res)
        if (res.code == 200){
          this.billData = res.data;
          const data = [];
          res.data.nearlySixMonthStatList.forEach(val=>{
            let item = {
              'month': val.month.substr(2,val.month.length),
              '收入': val.receivedAmount/100,
              '支出': val.spentAmount/100,
              '总金额': val.totalBalance/100,
            }
            data.push(item)
          });
          const ds = new DataSet();
          const dv = ds.createView().source(data);

          // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
          dv.transform({
            type: 'fold',
            fields: [ '收入', '支出','总金额' ], // 展开字段集
            key: 'date', // key字段
            value: 'Yaxis' // value字段
          });
          let option = {
            container: 'c3',
            forceFit: true,
            padding: [30,'auto',30,'auto'],
            height: 405,
          }
          const chart = new G2.Chart(option);
          this.renderChart(chart,dv,'元')
        }
      })
    },
    getWorkorderBeforeDetail(){
      API.getWorkorderBeforeData().then(res=>{
        // console.log(res)
        if (res.code == 200){
          this.workorderBeforeData = res.data;
        }
      })
    },
    getWorkorderDetail(){
      API.getWorkorderData().then(res=>{
        // console.log(res)
        if (res.code == 200){
          this.workorderData = res.data;
        }
      })
    },
    getDoorData(){
      API.getDoorLockData().then(res=>{
        // console.log(res)
        if (res.code == 200){
          this.doorData = res.data;
        }
      })
    },
    getElectricData(){
      API.getElectricData().then(res=>{
        // console.log(res)
        if (res.code == 200){
          this.electricData = res.data;
        }
      })
    },
    getWaterData(){
      API.getWaterData().then(res=>{
        // console.log(res)
        if (res.code == 200){
          this.waterData = res.data;
        }
      })
    },
    getFlowData(){
      API.getFlowData().then(res=>{
        // console.log(res)
        if (res.code == 200){
          this.flowData = res.data;
        }
      })
    },
    workbenchAssetsStat(){
      API.workbenchAssetsStat().then(res=>{
        // console.log(res)
        if (res.code == 200){
          this.assetsData = res.data;
        }
      })
    },
    formatHouseData(houseData){
      let allNum = houseData.dispositionQuantity + houseData.vacantQuantity + houseData.rentAlreadyQuantity
      let dispositionQuantityPercent = Number((houseData.dispositionQuantity/allNum*100).toFixed(2))/100;
      let rentAlreadyQuantityPercent = Number((houseData.rentAlreadyQuantity/allNum*100).toFixed(2))/100;
      let lockedQuantity = Number((houseData.lockedQuantity/allNum*100).toFixed(2))/100;
      let vacantQuantityPercent = Number(((100 - dispositionQuantityPercent*100 - rentAlreadyQuantityPercent*100 - lockedQuantity*100)).toFixed(2)/100);
      return [
        { item: '配置', count: houseData.dispositionQuantity, percent: dispositionQuantityPercent },
        { item: '空置', count: houseData.vacantQuantity, percent: vacantQuantityPercent },
        { item: '锁房', count: houseData.lockedQuantity, percent: lockedQuantity },
        { item: '已租', count: houseData.rentAlreadyQuantity, percent: rentAlreadyQuantityPercent },
      ];
    },
    changeHouseData(houseData){
      //若数据为空显示 暂无数据
      if(houseData.dispositionQuantity==0&&houseData.vacantQuantity==0&&houseData.lockedQuantity==0&&houseData.rentAlreadyQuantity==0){
        this.houseDataNullFlag = true;
        return;
      }else{
        this.houseDataNullFlag = false;
      }
      let data = this.formatHouseData(houseData)
      this.houseChart = new G2.Chart({
        container: 'workbench-c1',
        forceFit: true,
        padding: [30,'auto',60,'auto'],
        height: 270,
        animate: false
      });

      this.houseChart.source(data, {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      });
      this.houseChart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      });
      this.houseChart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      const interval = this.houseChart.intervalStack()
          .position('percent')
          .color('item',['#FFA036','#FB4246','#03C683'])
          .label('percent', {
            formatter: (val, item) => {
              return item.point.item + ': ' + val;
            }
          })
          .tooltip('item*count*percent', (item, count, percent) => {
            // percent = percent * 100 + '%';
            return {
              name: item,
              value: count
            };
          })
          .style({
            lineWidth: 1,
            stroke: '#fff'
          });
      this.houseChart.render();
      interval.setSelected(data[0]);
    },
    changeContractData(contractData){
      let data = this.formatContractData(contractData);
      let option = {
        container: 'workbench-c2',
        forceFit: true,
        padding: [30,'auto',30,'auto'],
        height: 200,
      }
      this.contractChart = new G2.Chart(option);
      this.renderChart(this.contractChart,data,'笔')
    },
    formatContractData(contractData){
      const data = [];
      contractData.forEach(val=>{
        let item = {
          'month': val.month.substr(2,val.month.length),
          '新签': val.newNum,
          '续签': val.extendNum,
          '退租': val.terninateNum,
        }
        data.push(item)
      });
      const ds = new DataSet();
      const dv = ds.createView().source(data);

      // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
      dv.transform({
        type: 'fold',
        fields: [ '新签', '续签','退租' ], // 展开字段集
        key: 'date', // key字段
        value: 'Yaxis' // value字段
      });
      return dv
    },
    renderChart(chart,data,unit){
      chart.source(data, {
        month: {
          range: [ 0, 1 ],
        },
      });
      chart.tooltip({
        crosshairs: {
          type: 'line'
        },
        itemTpl: '<li data-index={index}>' +
            '<p style="display: inline-block;float: left"><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
            '{name}</p>' + '<span style="display: inline-block; float: right; margin-left: 30px;">{value}' + unit + '</span>' +
            '</li>'
      });
      chart
          .line()
          .position('month*Yaxis')
          .color('date')
          .shape('smooth');
      chart
          .point()
          .position('month*Yaxis')
          .color('date')
          .size(4)
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });
      chart.legend(true, {
        position: 'top-right',
      });
      chart.render();
    }
  }
}
</script>

<style scoped lang="less">

@chartWidth: 360px;

#workbench{
  // 重置主内容页面样式
  & /deep/ .content-main{
    height: calc(100vh - 50px);
    padding: 14px;
    min-width: 1290px;
    .content{
      min-height: calc(100vh - 170px);
      padding: 0px;
      background-color: #f0f2f5;
    }
  }
  .house{
    margin-bottom: 14px;
    height: 300px;
    .house-con{
      display: flex;
      padding: 30px 0;
      &:not(:last-child){
        border-bottom: 1px solid #EEEEEE;
      }
      .occupancy-rate{
        width: 150px;
        line-height: 30px;
        cursor: pointer;
        .share-house{
          color: #FFA036;
          span{
            color: #777777;
          }
        }
        .whole-house{
          color: #0A87F8;
          span{
            color: #777777;
          }
        }
        .centralized-house{
          color: #03C683;
          span{
            color: #777777;
          }
        }
      }
      .house-info{
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li{
          width: 100px;
          text-align: center;
          line-height: 26px;
          cursor: pointer;
          p:first-child{
            font-weight: bold;
            font-size: 16px;
          }
        }
      }
    }
  }
  .contract{
    margin-bottom: 14px;
    height: 250px;
    .contract-con{
      display: flex;
      padding: 20px 0;
      cursor: pointer;
      &:not(:last-child){
        border-bottom: 1px solid #EEEEEE;
      }
      .contract-count{
        display: flex;
        align-items: center;
        width: 150px;
      }
      .contract-info{
        flex: 1;
        li{
          width: 20%;
          text-align: center;
          line-height: 26px;
          cursor: pointer;
          p:first-child{
            font-weight: bold;
            font-size: 16px;
          }
        }
      }
    }
  }
  .finance{
    height: 450px;
    .finance-con{
      margin: 20px 0;
      text-align: center;
      .finance-info{
        display: flex;
        margin-bottom: 10px;
        line-height: 26px;
        .total-balance{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 172px;
          background: #EEF2FE;
        }
        .total-balance-detail{
          flex: 1;
          background: #FAFBFF;
          /*display: flex;*/
          .yesterday{
            border-bottom: 1px solid #EEEEEE;
          }
          .yesterday,.today{
            position: relative;
            display: flex;
            align-items: center;
            &>div{
              flex: 1;
              padding: 20px 0;
            }
            .date{
              position: absolute;
              top: 6px;
              left: 6px;
              font-size:12px;
              color: @secondaryFontColor;
            }
          }
          .yesterday-balance,.today-balance{
            background: #F5F7FF;
          }

        }

      }
      .overdueAmount{
        position: relative;
        border-top: 1px solid #EEEEEE;
        padding: 20px 0;
        .arrow-down{
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translate(-50%,-50%);
          transform: rotate(45deg);
          width: 16px;
          height: 16px;
          border: 1px solid #EEEEEE;
          border-top: none;
          border-left: none;
          background: #ffffff;
        }
      }
      .in-out{
        line-height: 24px;
        .in-detail,.out-detail{
          position: relative;
          display: flex;
          margin-bottom: 14px;
          .in-tag,.out-tag{
            position: absolute;
            width: 32px;
            height: 32px;
            line-height: 32px;
            border-bottom-right-radius: 100%;
            background: #D6DEFF;
            span{
              position: absolute;
              top: -2px;
              left: 6px;
              color: @themeColor;
            }
          }
          .out-tag{
            background: #FCD4D5;
            span{
              color: #FB4246;
            }
          }
          &>div{
            flex: 1;
            display: flex;
            &>div{
              flex: 1;
              padding: 20px 0;
              cursor: pointer;
            }
          }
          .in-total{
            background: #EEF2FE;
          }
          .out-total{
            background: #FBECEC;
          }
        }
        .in-detail{
          .in-Yaxis{
            /*color: #0A87F8;*/
          }
          .today-total{
            background: #F5F7FF;
          }
          .overdue-total{
            background: #FAFBFF;
          }
        }
        .out-detail{
          .out-Yaxis{
            /*color: #FB4246;*/
          }
          .today-total{
            background: #FBF3F4;
          }
          .overdue-total{
            background: #FCF7F9;
          }
        }
      }
    }
  }
  .workorder{
    margin-top: 14px;
    border-radius: 4px;
    background-color:#FFFFFF;
    .first-box{
      padding: 14px 14px 6px 14px;
    }
    .workorder-content{
      padding: 14px;
      display: flex;
      .detail{
        width: calc(50% - 5px);
        height: 85px;
        border-radius:4px;
        .title{
          width: 170px;
          padding: 15px 0 20px 0;
          text-align: center;
        }
        .details{
          width: 140px;
          margin-top: 18px;
          text-align: center;
        }
        .littleCommonStyle{
          width: 100px;
          text-align: center;
        }
        .commonStyle{
          width: 140px;
          text-align: center;
        }
        .margin-bottom2{
          margin-bottom: 2px;
        }
        .nameCommonStyle{
          width: 170px;
          text-align: center;
        }
        .nameStyle{
          font-size: 14px;
          color: #333333;
        }
        .titleNumberStyle{
          font-size: 18px;
          color: #111111;
        }
        .titleNumberColor1{
          color: #FF8600;
        }
        .titleNumberColor2{
          color: #111111;
        }
        .processingStyle{
          color: #0A87F8;
          font-size: 16px;
        }
        .pendingStyle{
          color: #FF8600;
          font-size: 16px;
        }
        .acceptanceStyle{
          color: #FB4246;
          font-size: 16px;
        }
        .offLineStyle{
          color: #777777;
          font-size: 16px;
        }
      }
      .bgStyle{
        background: #FAFBFF;
      }
      .leftBgStyle{
        background: #EEF2FE;
      }
    }
  }
  .assets{
    margin-top: 14px;
    border-radius: 4px;
    background-color:#FFFFFF;
    .first-box{
      padding: 14px 14px 6px 14px;
    }
    .assets-content {
      padding: 14px;
      width: 100%;
      .item{
        flex:1;
      }
      .detail{
        width: 100%;
        height: 85px;
        border-radius:4px;
        display: flex;
        .title{
          width: 238px;
          padding: 15px 0 20px 0;
          text-align: center;
        }
        .details{
          width: 140px;
          padding-top: 18px;
          text-align: center;
          flex:1;
        }
        .littleCommonStyle{
          text-align: center;
        }
        .commonStyle{
          width: 140px;
          text-align: center;
        }
        .margin-bottom2{
          margin-bottom: 2px;
        }
        .nameCommonStyle{
          padding-left: 15px;
        }
        .fontColorStyle{
          font-size: 14px;
          font-weight: 400;
          color: #333333;
        }
        .greenStyle{
          color:#03C683;
          font-size: 16px;
          font-weight: 600;
        }
        .pendingStyle{
          color: #FF8600;
          font-size: 16px;
          font-weight: 600;
        }
        .acceptanceStyle{
          color: #FB4246;
          font-size: 16px;
          font-weight: 600;
        }
        .splitStyle{
          position: absolute;
          width: 1px;
          height: 45px;
          background-color: #DDDDDD;
          right: 0;
          bottom: 19px;
        }
      }
      .bgStyle{
        background: #FAFBFF;
      }
      .leftBgStyle{
        background: #EEF2FE;
      }
    }
  }
  .workflow{
    margin-top: 14px;
    border-radius: 4px;
    background-color:#FFFFFF;
    .first-box{
      padding: 14px 14px 6px 14px;
    }
    .workflow-content{
      padding: 14px;
      .detail{
        height: 40px;
        .bgStyle{
          width: 36px;
          height: 36px;
          background-color: fade(#0A87F8,10%);
          border-radius: 50%;
          svg{
            margin: 8px 0 0 8px;
            width: 20px;
            height: 20px;
            color: #0A87F8;
          }
        }
        .normalStyle{
          height: 40px;
          line-height: 40px;
          margin-left: 13px;
        }
        .ccMeStyle{
          font-size: 18px;
          color: #111111;
        }
        .mySubmitStyle{
          font-size: 18px;
          color: #0A87F8;
        }
        .myTaskTotalStyle{
          font-size: 18px;
          color: #FF8600;
        }
        .commonStyle{
          color: #333333;
          font-size: 14px;
        }
      }
    }
  }
  .left,.right{
    padding: 14px;
    height: 100%;
    background: #ffffff;
    border-radius: 4px;
  }
  .left{
    width: calc(100% - @chartWidth - 2px);
  }
  .chart-wrap{
    width: @chartWidth;
    text-align: center;
    position: relative;
    .house-type,.contract-type{
      margin: 0 50px 0px 50px;
      display: flex;
      justify-content: space-around;
      li{
        cursor: pointer;
      }
      .active{
        color: #0a87f8;
      }
    }
    .contract-type{
      margin: 0 100px 0px 100px;
    }
  }
  .title{
    font-size: 16px;
    color: #333333;
    .title-icon{
      color: #777777;
      font-size: 20px;
    }
  }
  .tag-icon{
    position: relative;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    padding: 0px 6px;
    min-width: 30px;
    border-radius: 12px;
    color: #ffffff;
    background: #777777;
    &:after{
      position: absolute;
      bottom: -14px;
      left: 6px;
      content: "";
      display: inline-block;
      border-width: 10px 3px;
      border-style: solid;
      border-color:  #777777 transparent transparent transparent;
      transform: rotate(45deg);
    }
  }
  .vacant{
    color: @vacant;
  }
  .rent{
    color: @rent;
  }
  .config{
    color: @config;
  }
}
.no-permissions-wrap{
  height: calc(100vh - 170px);
  text-align: center;
  background-color: #ffffff;
  overflow: hidden;
  .title{
    font-size: 24px!important;
    color: #111111;
  }
  .bg-title{
    margin-top: -30px;
    height:56px;
    font-size:40px;
    font-family:Arial-Black,Arial;
    font-weight:900;
    color:rgba(17,17,17,.05);
    line-height:56px;
  }
  .tips{
    margin: 20px auto 80px auto;
    color: #777777;
  }
  img{
    width: 368px;
    height: 191px;
  }
}
</style>