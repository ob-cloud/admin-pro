<template>
    <!-- 账单管理 -->
    <div class="bill-box">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <div class="add-btn-wrap" @click="addBill" v-mark="['mk_finance_bill_tjzd']">
            <icon-font type="iconyumengtubiao_tianjia" /> 添加账单
        </div>
        <content-top>
            <div class="f-fl currentIndexStyle">
              <div class="currentIndexItemStyle cursor" @click="changCurrentIndex(1)" :class="currentIndex==1?'selectedStyle':'unSelectStyle'">汇总</div>
              <div class="currentIndexItemStyle cursor" @click="changCurrentIndex(2)" :class="currentIndex==2?'selectedStyle':'unSelectStyle'">明细</div>
            </div>
            <div class="status-box f-fl" v-show="currentIndex==1">
                <div class="status">
                    <p :class="{ active: activeIndex === 0 }" @click="changeStatus(null,0)">
                        <span >{{ statusData[0].title }}</span>
                        <span :style="{ color: statusData[0].color }">({{ statusData[0].status }})</span>
                    </p>
                    <p :class="{ active: activeIndex === 1 }" @click="changeStatus(1,1)">
                        <span >{{ statusData[1].title }}</span>
                        <span :style="{ color: statusData[1].color }">({{ statusData[1].status }})</span>
                    </p>
                    <p style="cursor:auto">[</p>
                     <p :class="{ active: activeIndex === 2 }" @click="changeStatus(12,2)">
                        <span >{{ statusData[2].title }}</span>
                        <span :style="{ color: statusData[2].color }">({{ statusData[2].status }})</span>
                    </p>
                    <p :class="{ active: activeIndex === 3 }" @click="changeStatus(13,3)">
                        <span >{{ statusData[3].title }}</span>
                        <span :style="{ color: statusData[3].color }">({{ statusData[3].status }})</span>
                    </p>
                    <p>
                        <a-checkbox v-model="checkFlg" :disabled="activeIndex === 4 || activeIndex === 5" @change="onStatusChange">逾期</a-checkbox>
                        <span style="padding:0;margin-left:-6px;" :style="{ color: statusData[3].color }">({{ statusData[6].status }})</span>
                    </p>
                    <p style="cursor:auto">]</p>
                    <p :class="{ active: activeIndex === 4 }" @click="changeStatus(2,4)">
                        <span >{{ statusData[4].title }}</span>
                        <span :style="{ color: statusData[4].color }">({{ statusData[4].status }})</span>
                    </p>
                    <p :class="{ active: activeIndex === 5 }" @click="changeStatus(9,5)">
                        <span >{{ statusData[5].title }}</span>
                        <span :style="{ color: statusData[5].color }">({{ statusData[5].status }})</span>
                    </p>
                </div>
            </div>
            <div class="status-box f-fl" v-show="currentIndex==2">
              <top-status :statusData="statusData_detail" @changeStatus="changeStatus_detail"></top-status>
            </div>
            <div class="f-fr cursor exportExcel-box" v-mark="['mk_finance_bill_dc']" v-show="currentIndex==1"><span @click="exportExcel"><icon-font class="f-ftc-blue" type="iconyumengtubiao_xiazai1" /></span></div>
            <div class="f-fr cursor exportExcel-box" v-mark="['mk_finance_bill_dc']" v-show="currentIndex==2"><span @click="exportExcel"><icon-font class="f-ftc-blue" type="iconyumengtubiao_xiazai1" /></span></div>
            <div class="search-box f-fr" v-show="currentIndex==1">
                <search-dialog resMark="mk_fin_bill" ref="searchDialogId" deptPlaceholder="请选择所属部门或人员" placeholder="房源编号/小区地址/门牌号/项目名称/收(付)款人姓名/收(付)款人电话" dept-title="账单所属人" :showCityTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
            </div>
            <div class="search-box f-fr" v-show="currentIndex==2">
              <search-dialog resMark="mk_fin_bill" ref="searchDialogId_detail" dept-title="所属人" deptPlaceholder="请选择所属部门或人员" :billSpecialInputFlag="true" showCostTypePlaceholder="费用科目" showCostTypeDefaultName="请选择"  placeholder="房源编号/小区地址/门牌号/收(付)款人姓名/收(付)款人电话" :showCityTown="false" :showCostType="true" :searchList="searchList_detail" @search="assetsFormData_detail"></search-dialog>
            </div>
        </content-top>
        <content-main>
          <div class="splitBgStyle"></div>
          <div class="statiscStyle" v-show="!spinLoading">
            <span style="color: #777777;">差值：</span><span style="color: #111111;border-right: 1px solid #E8E8E8;padding-right: 20px;">{{ (amountDiffTotal/100).toFixed(2)}}元</span>
            <span style="color: #777777;margin-left: 19px;">收入：</span><span style="color: #0A87F8;">{{ (incomeAmountTotal/100).toFixed(2)}}元</span>
            <span style="color: #777777;margin-left: 19px;">支出：</span><span style="color: #FB4246;">{{ (expendAmountTotal/100).toFixed(2)}}元</span>
          </div>
          <div class="splitBgStyle"></div>
            <skeleton-bill v-show="spinLoading&&currentIndex==1"></skeleton-bill>
            <div class="table" v-show="!spinLoading&&currentIndex==1">
                <div class="checkOptionBill" id="checkOptionBill" v-mark="['mk_finance_bill_cszd']">
                    <div class="dealOption">
                        <span class="headSpan">已选中
                            <span style="color:#0A87F8;">{{checkedCount}}</span>项
                            <a-divider type="vertical" />
                        </span>
                        <span class="fontSpacing cursor" @click="goBillBatchProcess()">
                            <icon-font type="iconzhangdan" style="color:#0A87F8;" />
                        </span>
                        <span class="cursor" style="color:#0A87F8;" @click="goBillBatchProcess()">批量处理账单</span>
                        <span class="fontSpacing tooltip1 cursor">
                            <a-tooltip placement="top" title="批量处理的账单，只可全收或全付">
                              <icon-font type="iconyumengtubiao_tishi" style="color:#FFA036" />
                            </a-tooltip>
                            <a-divider type="vertical" />
                        </span>
                        <span class="fontSpacing cursor" @click="goBillBatchCancel()">
                            <icon-font type="iconyumengtubiao_jinyong" style="color:#0A87F8;" />
                          </span>
                        <span class="cursor" style="color:#0A87F8;" @click="goBillBatchCancel()">批量作废<a-divider type="vertical" /></span>
                        <span class="fontSpacing cursor" @click="collectionFun()">
                            <icon-font type="iconyumengtubiao_fasong" style="color:#0A87F8;" />
                        </span>
                        <span class="cursor" style="color:#0A87F8;" @click="collectionFun()">批量发送催收短信</span>
                        <span class="fontSpacing tooltip2 cursor">
                            <a-tooltip placement="top" title="账单所属于「房源」和「业主」以及账单状态为「已完成」和「已作废」的不会发送催收短信">
                              <icon-font type="iconyumengtubiao_tishi" style="color:#FFA036" />
                            </a-tooltip>
                        </span>
                    </div>
                    <div class="cancelOption cursor">
                        <span @click="cancelOption ">取消选择</span>
                    </div>
                </div>
                <a-table rowKey="id" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" size="middle" :customRow="openDetail" :bordered="true" :pagination="false" :columns="tableColumns" @change="handleTableChange" :dataSource="tableData">
                    <div slot="billStatus" slot-scope="text,record">
                        <div v-if="text==1" class="fontNormal clearfix f-fl">
                            <div class="IconRadius normalBg f-fl" style="background-color:#FE3C38"></div>
                            <div class="f-fl">
                                <span>未完成 </span>
                                <span style="color:#FB4246;font-size:12px;" v-if="record.overdueDays>0">逾{{record.overdueDays}}天</span>
                            </div>
                        </div>
                        <div v-else-if="text==2" class="fontProhibit fontProhibitColor clearfix f-fl">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl" style="background-color:#03C683"></div>
                            <div class="f-fl">
                                <span>已完成</span>
                            </div>
                        </div>
                        <div v-else-if="text==9" class="fontProhibit fontProhibitColor clearfix f-fl">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                            <div class="f-fl">
                                <span>已作废</span>
                            </div>
                        </div>
                        <a-popover>
                          <template slot="content">
                            <p style="padding: 8px 18px;">
                              <span v-if="record.billBizInfo&&record.billBizInfo.bizAuditStatus==1">付款申请：{{record.billBizInfo.auditProcess}}</span>
                              <span v-if="record.billBizInfo&&record.billBizInfo.bizAuditStatus==9">付款申请：审批通过，待付款</span>
                              <span v-if="record.billBizInfo&&record.billBizInfo.bizAuditStatus==5">付款申请：审批驳回</span>
                              <span v-if="record.billBizInfo&&record.billBizInfo.bizAuditStatus==6">付款申请：已撤销</span>
                            </p>
                          </template>
                          <div class="statusRadius status1 f-fr" v-if="record.billBizInfo&&record.billBizInfo.bizAuditStatus==1" ><icon-font type="iconyumengtubiao_daishenpirenyuan"></icon-font></div>
                          <div class="statusRadius status9 f-fr" v-if="record.billBizInfo&&record.billBizInfo.bizAuditStatus==9" ><icon-font type="iconshenhetongguo1x"></icon-font></div>
                          <div class="statusRadius status5 f-fr" v-if="record.billBizInfo&&record.billBizInfo.bizAuditStatus==5" ><icon-font type="iconshenhebohui1x"></icon-font></div>
                          <div class="statusRadius status6 f-fr" v-if="record.billBizInfo&&record.billBizInfo.bizAuditStatus==6" ><icon-font type="iconliebiao-yichexiao1x"></icon-font></div>
                        </a-popover>
                    </div>
                    <div slot="fullAddress" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                                </p>
                            </template>
                            <div type="primary" class="overHidde" style="width: 270px">
                                <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress}}
                            </div>
                        </a-popover>
                    </div>
                    <div slot="payerName" slot-scope="text,record">
                        <div class="clearfix">
                            <a-popover>
                                <template slot="content">
                                    <p style="padding: 8px 18px;">
                                        <span v-if="record.contractAuditStatus==1">关联合同审批中</span>
                                        <span v-if="record.contractAuditStatus==9">审批通过</span>
                                        <span v-if="record.contractAuditStatus==5">审批驳回</span>
                                        <span v-if="record.contractAuditStatus==6">已撤销</span>
                                    </p>
                                </template>
                                <div class="statusRadius status1" style="float: left;margin-right: 5px;" v-if="record.contractAuditStatus&&record.contractAuditStatus==1" ><icon-font type="iconyumengtubiao_daishenpirenyuan"></icon-font></div>
                                <div class="statusRadius status9" style="float: left;margin-right: 5px;" v-if="record.contractAuditStatus&&record.contractAuditStatus==9" ><icon-font type="iconshenhetongguo1x"></icon-font></div>
                                <div class="statusRadius status5" style="float: left;margin-right: 5px;" v-if="record.contractAuditStatus&&record.contractAuditStatus==5" ><icon-font type="iconshenhebohui1x"></icon-font></div>
                                <div class="statusRadius status6" style="float: left;margin-right: 5px;" v-if="record.contractAuditStatus&&record.contractAuditStatus==6" ><icon-font type="iconliebiao-yichexiao1x"></icon-font></div>
                            </a-popover>
                            <div class="f-fl" type="primary">
                                <p style="line-height:22px;">
                                    <span>{{record.payerName}}-{{record.payerPhone}} </span>
                                </p>
                            </div>
                            <a-popover v-if="record.payUrgeRecordList">
                                <template slot="content">
                                    <div class="f-clearfix" style="padding: 8px 18px;border-bottom:1px solid #DDDDDD;color: #777777">
                                        <p class="f-fl" style="width:76px">催收人</p>
                                        <p class="f-fl">催收时间</p>
                                    </div>
                                    <div class="f-clearfix" style="padding: 10px 18px 0 18px;color: #111111"  v-for="(item,index) in record.payUrgeRecordList" :key="index">
                                      <p class="f-fl" style="width:76px">{{item.urgeEmpName}}</p>
                                      <p class="f-fl">{{$moment(item.urgeTime).format('lll')}}</p>
                                    </div>
                                    <div class="f-clearfix" style="padding: 10px 18px;color:#0A87F8;" v-mark="['mk_finance_bill_cszd']">
                                       <p class="cursor f-fr" @click.stop="collectionFun(record.id)" style="width:56px;">继续催收</p>
                                    </div>
                                </template>
                                <div class="f-fl" type="primary" v-if="record.payUrgeRecordList.length>0">
                                    <p style="line-height:22px;">
                                        <span style="color:#FE3C38"><icon-font style="font-size:19px" type="iconyumengtubiao_cuishou" /> × {{record.payUrgeRecordList.length}}</span>
                                    </p>
                                </div>
                            </a-popover>
                        </div>
                    </div>
                    <div slot="totalMoney" slot-scope="text,record">
                        <span v-if="text<0" class="shou-zhi">支</span>
                        <span v-else class="shou-shou">收</span>
                        <span style="color: #777;margin-left: 5px" v-if="record.billStatus == 2">{{Math.abs(text)/100}}</span>
                        <span style="color: #777;margin-left: 5px" v-else>{{Math.abs(record.notOccurredMoney)/100}}</span>
                        <span v-if="record.notOccurredMoney!=text && record.billStatus != 2" style="color:#bbb;font-size:12px;margin-left: 5px">
                            <span v-if="text<0">应支</span>
                            <span v-else>应收</span>
                            <span style="margin-left: 5px;text-decoration:line-through">{{Math.abs(text)/100}}</span>
                        </span>
                    </div>
                    <div slot="predictTime" slot-scope="text,record">
                        <span v-if="record.billStatus == 2">{{$moment(record.practicalTime).format('YYYY.MM.DD')}}</span>
                        <span v-else>{{$moment(text).format('YYYY.MM.DD')}}</span>
                    </div>
                    <div slot="beginTime" slot-scope="text,record">
                        {{record.endTime?$moment(text).format('YYYY.MM.DD')+' - '+$moment(record.endTime).format('YYYY.MM.DD'):'-'}}
                    </div>
                    <div slot="billName" slot-scope="text">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    <span>{{text}}</span>
                                </p>
                            </template>
                            <div type="primary" class="overHidde" style="width:100px">
                                <span>{{text}}</span>
                            </div>
                        </a-popover>
                    </div>
                    <div slot="action" slot-scope="text, record" v-if="((record.billStatus==1 || record.billStatus==2 || record.billStatus==9 || record.isAllowHouseRelation == 1)&&record.contractIsAllowHanlder==1)||record.billBizInfo">
                        <a-popover :title="null" trigger="hover" placement="bottom" v-if="checkOpts(record) == true">
                            <template slot="content">
                                <div v-if="record.btnArr.indexOf('14') != -1" @click.stop="backChild(record)" class="action cursor" style="text-align:center;">账单复原</div>
                                <div v-if="record.btnArr.indexOf('1') != -1" @click.stop="billProcessFun(record)" class="action cursor" style="text-align:center;">{{record.totalMoney>=0?'收款':'付款'}}</div>
                                <div v-if="record.btnArr.indexOf('2') != -1" @click.stop="collectionFun(record.id)" class="action cursor" style="text-align:center;">催收</div>
                                <div v-if="record.btnArr.indexOf('3') != -1" @click.stop="editData(record)" class="action cursor" style="text-align:center;">编辑</div>
                                <div v-if="record.btnArr.indexOf('4') != -1" @click.stop="toVoidFun(record)" class="action cursor" style="text-align:center;">作废</div>
                                <div v-if="record.btnArr.indexOf('5') != -1" @click.stop="deleteChild(record)" class="action cursor" style="text-align:center;">删除</div>
                                <div v-if="record.btnArr.indexOf('6') != -1" @click.stop="associated(record)" class="action cursor" style="text-align:center;">关联房源</div>
                                <div v-if="record.btnArr.indexOf('7') != -1" @click.stop="associatedZk(record)" class="action cursor" style="text-align:center;">关联租客</div>
                                <div v-if="record.btnArr.indexOf('8') != -1" @click.stop="associatedYz(record)" class="action cursor" style="text-align:center;">关联业主</div>
                                <div v-if="record.btnArr.indexOf('10') != -1" class="action cursor" @click="openUrgeHander(record)">催办</div>
                                <div v-if="record.btnArr.indexOf('11') != -1" class="action cursor" @click="revoke(record)">撤销</div>
                                <div v-if="record.btnArr.indexOf('12') != -1" class="action cursor" @click="openFlowDetail(record)">审批</div>
                                <div v-if="record.btnArr.indexOf('9') != -1" @click.stop="billProcessFun(record)" class="action cursor" >重新提交</div>
                                <div v-if="record.btnArr.indexOf('13') != -1" @click.stop="goConfirmPay(record)" class="action cursor" >确认付款</div>
                            </template>
                            <div style="width: 100%;height: 100%">
                                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor cursor"></icon-font>
                            </div>
                        </a-popover>
                    </div>
                </a-table>
                <div class="contFoot" v-show="tableData.length>0" style="padding-right: 20px;">
                    <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
                </div>
            </div>
            <!-- 来自2020.10.16需求变更 账单管理与账单明细统计 -->
          <skeleton-bill-details v-show="spinLoading&&currentIndex==2"></skeleton-bill-details>
          <div class="table" v-show="!spinLoading&&currentIndex==2">
            <a-table rowKey="id" :customRow="openDetail_detail" :bordered="true" :pagination="false" :columns="tableColumns_detail" @change="handleTableChange" :dataSource="tableData">
              <div slot="feeStatus" slot-scope="text,record">
                <div v-if="text=='待收款'">
                  <div class="IconRadius toReceivables f-fl"></div>
                  <div>
                    <span>待收款 </span>
                    <span style="color:#FB4246;font-size:12px;" v-if="record.overdueDays>0">逾{{record.overdueDays}}天</span>
                  </div>
                </div>
                <div v-else-if="text=='待付款'">
                  <div class="IconRadius toPay f-fl"></div>
                  <div>
                    <span>{{text}} </span>
                  </div>
                </div>
                <div v-else>
                  <div class="IconRadius complete f-fl"></div>
                  <div>
                    <span>{{text}}</span>
                  </div>
                </div>
              </div>
              <div slot="fullAddress" slot-scope="text,record">
                <a-popover>
                  <template slot="content">
                    <p style="padding: 8px 18px;">
                      <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress?record.fullAddress:'-'}}
                    </p>
                  </template>
                  <div type="primary" class="overHidde" style="width: 95%">
                    <span class="houseAddress" v-if="record.houseAlias">{{record.houseAlias}}</span>{{record.fullAddress?record.fullAddress:'-'}}
                  </div>
                </a-popover>
              </div>
              <div slot="payerName" slot-scope="text,record">
                <a-popover>
                  <template slot="content">
                    <p style="padding: 8px 18px;">
                      <span>{{record.payerName}} /</span>{{record.payerPhone}}
                    </p>
                  </template>
                  <div class="f-fl" type="primary">
                    <p class="overHidde" style="line-height:22px;">
                      <span>{{record.payerName}} /</span>{{record.payerPhone}}
                    </p>
                  </div>
                </a-popover>
              </div>
              <div slot="totalMoney" slot-scope="text,record">
                <span v-if="record.feeStatus == '待付款'||record.feeStatus == '已付款'" class="shou-zhi">支</span>
                <span v-else class="shou-shou">收</span>
                {{Math.abs(text)/100}}
              </div>
              <div slot="predictTime" slot-scope="text,record">
                <span v-if="record.feeStatus == '已收款' || record.feeStatus == '已付款'"> 完成时间：</span>
                <span v-else-if="record.feeStatus == '待付款'">预付时间：</span>
                <span v-else>预收时间：</span>
                <span v-if="record.feeStatus == '已收款' || record.feeStatus == '已付款'">{{$moment(record.practicalTime).format('YYYY.MM.DD')}}</span>
                <span v-else>{{$moment(text).format('YYYY.MM.DD')}}</span>
              </div>
              <div slot="beginTime" slot-scope="text,record">
                {{record.endTime?$moment(text).format('YYYY.MM.DD')+' - '+$moment(record.endTime).format('YYYY.MM.DD'):'-'}}
              </div>
              <div slot="billName" slot-scope="text">
                <a-popover>
                  <template slot="content">
                    <p style="padding: 8px 18px;">
                      <span>{{text}}</span>
                    </p>
                  </template>
                  <div class="f-fl" type="primary">
                    <p class="overHidde" style="line-height:22px;">
                      <span>{{text}}</span>
                    </p>
                  </div>
                </a-popover>
              </div>
            </a-table>
            <div class="contFoot" v-show="tableData.length>0" style="padding-right: 20px;">
              <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
            </div>
          </div>
        </content-main>

        <!-- 添加添加账单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="addBillDialog" class="ownModalBorder titDialog" title="添加账单" :confirmLoading="confirmLoading" @cancel="addBillDialog=false">
            <add-bill @saveSuccess="saveSuccess" @closeThis="addBillDialog=false"></add-bill>
        </a-modal>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog" @cancel="isRefreshFun">
            <bill-detail @refreshinfoFun="refreshinfoFun" :workflowTab="workflowTab" :billId="billId" @saveSuccess="saveSuccess"></bill-detail>
        </a-modal>
        <!-- 编辑账单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="editBillDialog" class="ownModalBorder titDialog" title="编辑账单信息" @cancel="editBillDialog=false">
            <edit-bill @saveSuccess="saveSuccess" :billId="billId" @closeThis="editBillDialog=false"></edit-bill>
        </a-modal>
        <!-- 关联房源弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="associatedDialog" class="ownModalBorder titDialog" title="关联房源" @cancel="associatedDialog=false">
            <associated-detail :infoData="infoData" @saveSuccess="saveSuccess" @closeThis="associatedDialog=false"></associated-detail>
        </a-modal>
        <!-- 关联租客弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="associatedDialogZk" class="ownModalBorder titDialog" title="关联租客" @cancel="associatedDialogZk=false">
            <associated-zk :infoData="infoData" @saveSuccess="saveSuccess" @closeThis="associatedDialogZk=false"></associated-Zk>
        </a-modal>
        <!-- 关联业主弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="associatedDialogYz" class="ownModalBorder titDialog" title="关联业主" @cancel="associatedDialogYz=false">
            <associated-Yz :infoData="infoData" @saveSuccess="saveSuccess" @closeThis="associatedDialogYz=false"></associated-Yz>
        </a-modal>
        <!-- 处理账单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1000px" v-model="billProcessDialog" class="ownModalBorder titDialog" title="账单处理" @cancel="billProcessDialog=false">
            <bill-process @closeThis="billProcessDialog=false" @saveSure="billProcessSuccess" :billId="billId"></bill-process>
        </a-modal>
        <!-- 导出框-->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="exportExcelShow" class="ownModalBorder titDialog" title="导出提示">
            <exportExcel @close="exportExcelShow=false" :exportData="exportData" :exportUrl='exportUrl'></exportExcel>
        </a-modal>
        <!-- 账单明细详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="收支详情" width="1000px" v-model="billDetailDetailDialog" class="ownModalBorder titDialog">
          <bill-detail-details :billDetailId="billDetailId"></bill-detail-details>
        </a-modal>
        <!--催办 -->
        <a-modal title="" width="433px" v-model='warningDialog' class="myLaunch-box-special-Dialog titDialog" @ok="urgeHander" @cancel="sendMessageFlag=true;warningDialog=false" okText="确定" cancelText="取消" :closable="false">
          <div class="content">
            <a-icon class="contentCircle" type="question-circle"/>
            <span class="contentTitle">确定要给当前审批人发送消息提醒吗？</span>
            <div class="confirm-content">确定后会以消息的形式通知到当前审批人</div>
            <div class="confirm-warning">当前审批人：{{auditEmpNameList.join('、')}}</div>
            <div class="confirm-check"><a-checkbox v-model="sendMessageFlag" @change="onChangeSendMessageFlag">短信通知当前审批人</a-checkbox></div>
          </div>
        </a-modal>
        <!-- 确认付款信息 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="confirmPayInfoDialog" class="ownModalBorder titDialog" title="确认账单信息" @cancel="confirmPayInfoDialog=false">
          <confirm-pay-info :billId="billId" :billBizId="billBizId" @saveSuccess="confirmPayInfoSuccess" @closeThis="confirmPayInfoDialog=false"></confirm-pay-info>
        </a-modal>
        <!-- 批量处理账单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="billBatchProcessDialog" class="ownModalBorder titDialog" title="账单批量处理" @cancel="billBatchProcessDialog=false">
          <bill-batch-process :billBatchProcessIds="billBatchProcessIds" @closeThis="billBatchProcessDialog=false" @saveSure="billBatchProcessSuccess" :billId="billId"></bill-batch-process>
        </a-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import SearchDialog from '@/components/SearchDialog';
import exportExcel from '@/components/exportExcel/index';
import addBill from './addBill';
import billDetail from './billDetails';
import { billBizStat, billList, billPayUrge,billDelete,billCancel,billCancelRevert,billBatchCancel } from '@/api/bill';
import editBill from './editBill';
import associatedDetail from './associated';
import associatedZk from './associatedZk';
import associatedYz from './associatedYz';
import billProcess from './billProcess';
import SkeletonBill from '../../skeleton/finance/bill';
import SkeletonBillDetails from '../../skeleton/finance/billDetails';
import TopStatus from '@/components/TopStatus/index';
import ConfirmPayInfo from './confirmPayInfo';
import {billDetailBizStat, billDetailList} from "@/api/billDetailWater";
import  billDetailDetails from './billDetailDetails';
import BillBatchProcess from './billBatchProcess';
import {getPayMethodDictionary} from "@/api/billDetailWater";
import {waListSimple} from "@/api/wallet";
import {revoke, urgeHander} from "@/api/workflow";
export default {
    name: "bill",
    components: {
        SearchDialog,
        addBill,
        billDetail,
        editBill,
        associatedDetail,
        associatedZk,
        associatedYz,
        billProcess,
        exportExcel,
        SkeletonBill,
        SkeletonBillDetails,
        TopStatus,
        billDetailDetails,
        ConfirmPayInfo,
        BillBatchProcess,
    },
    data() {
        let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
        let currentBeginWeek = Vue.prototype.$moment().startOf('week').valueOf();
        let currentWeek = Vue.prototype.$moment().endOf('week').valueOf();
        let currentBeginMonth = Vue.prototype.$moment().startOf('month').valueOf();
        let currentMonth = Vue.prototype.$moment().endOf('month').valueOf()
        //完成时间是往前推
        let ondeDayComplete = Vue.prototype.$moment().startOf('day').add(1, 'days').valueOf();
        let threeDayComplete = Vue.prototype.$moment().startOf('day').add(-2, 'days').valueOf();
        let oneWeekComplete = Vue.prototype.$moment().startOf('day').add(-6, 'days').valueOf();
        //预计收(付)款日期是往后推
        let threeDay = Vue.prototype.$moment().startOf('day').add(3, 'days').valueOf();
        let oneWeek =  Vue.prototype.$moment().startOf('day').add(7, 'days').valueOf();
        let monthStart = Vue.prototype.$moment().startOf('month').valueOf();
        let monthEnd = Vue.prototype.$moment().endOf('month').valueOf();
        return {
            sendData: {
                current: 1,                     // 当前页数
                size: 10,                       // 每页返回的记录数量
                fuzzyKeyword: '',               // 模糊匹配关键词
                fuzzyQueryType: 0,             //模糊查询类型【0、全部，1、房源编号，2、小区地址，3、门牌号，4、收付款人姓名，5、收付款人电话】
                isSearchCount: 1,                //是否查询总记录数（1.是（默认）；2.否）
                deptId: '',                     // 部门ID
                maintainerId: '',              // 负责人ID

                bizType: '',                     //业务类型【1、房源，2、租客，3、业主】
                createTime: null,               // 创建时间
                finishTimeBegin: null,          // 完成时间开始
                finishTimeEnd: null,            // 完成时间结束
                predictTimeBegin: null,         // 预计收付款时间开始
                predictTimeEnd: null,           // 预计收付款时间结束

                order:'',
                sort: '',                       // 排序字段
                billStatus: null,               // 账单状态（1：未完成；2：已完成；9：已作废；）
                tenantId: '',                   // 租户ID
                updateTime: '',                 // 修改时间
                vacantDaysBegin: '',            // 空置天数区间开始
                vacantDaysEnd: '',              // 空置天数区间结束

                feeDirection:'',                //账单费用方向（1：收款；2：付款）
                exBillStatusList:[],             //扩展账单状态（11：逾期；12：待收；13：待付）
            },
            sendData_detail: {
              current: 1,                     // 当前页数
              size: 10,                       // 每页返回的记录数量
              fuzzyKeyword: '',               // 模糊匹配关键词
              fuzzyQueryType: 0,             //模糊查询类型【0、全部，1、房源编号，2、小区地址，3、门牌号，4、收付款人姓名，5、收付款人电话】
              isSearchCount: 1,                //是否查询总记录数（1.是（默认）；2.否）
              deptId: '',                     // 部门ID
              maintainerId: '',              // 负责人ID
              affirmEmpDeptId:'',              //账单确认人所属部门id
              affirmEmpId:'',                  //账单确认人id
              affirmEmpIdList:[],
              bizType: '',                     //业务类型【1、房源，2、租客，3、业主】
              createTime: null,               // 创建时间
              sort: '',                       // 排序字段
              feeStatus: null,               // 账单状态（1：未完成；2：已完成；9：已作废；11：已逾期）
              tenantId: '',                   // 租户ID
              updateTime: '',                 // 修改时间
              feeSubjectIdList:[],
              paymentMethod:'',
              belongWalletId:'',
              predictTimeBegin:'',
              predictTimeEnd:'',
              practicalTimeBegin:'',
              practicalTimeEnd:'',
              createTimeBegin:'',
              createTimeEnd:'',
            },
            searchList: [
                {
                    key: 'fuzzyQueryType',
                    list: [
                        {
                            label: '综合检索',
                            value: 0,
                        },
                        {
                            label: '房源编号',
                            value: 1
                        },
                        {
                            label: '小区地址',
                            value: 2
                        },
                        {
                            label: '门牌号',
                            value: 3
                        },
                        {
                            label: '项目名称',
                            value: 6
                        },
                        {
                            label: '收付款人姓名',
                            value: 4
                        },
                        {
                            label: '收付款人电话',
                            value: 5
                        }
                    ],
                },
                {
                    key: 'bizType',
                    title: '账单所属',
                    currentActiveIndex: 0,
                    list: [
                        {
                            label: '全部',
                            value: null
                        },
                        {
                            label: '房源',
                            value: 1
                        },
                        {
                            label: '租客',
                            value: 2
                        },
                        {
                            label: '业主',
                            value: 3
                        },
                      {
                        label: '分账',
                        value: 4
                      },
                      {
                        label: '手续费',
                        value: 5
                      },
                    ],
                },
                {
                  key: 'predictTimeEndLater',
                  title: '近期待收(付)款',
                  currentActiveIndex: 0,
                  list: [
                    {
                      label: '不限',
                      value: null
                    },
                    {
                      label: '已逾期',
                      value: 1
                    },
                    {
                      label: '今天',
                      value: 2
                    },
                    {
                      label: '近3天',
                      value: 3
                    },
                    {
                      label: '近7天',
                      value: 4
                    },
                    {
                      label: '近15天',
                      value: 5
                    },
                    {
                      label: '近30天',
                      value: 6
                    },
                  ],
                  mutexIndex:3,
                },
                {
                    key: ['predictTimeBegin', 'predictTimeEnd'],
                    title: '预计收(付)款日期',
                    currentActiveIndex: 0,
                    list: [
                        {
                            label: '不限',
                            value: ['', '']
                        },
                        {
                            label: '今天',
                            value: [currentTime, currentTime]
                        },
                        {
                            label: '近3天',
                            value: [currentTime, threeDay]
                        },
                        {
                            label: '近7天',
                            value: [currentTime, oneWeek]
                        },
                        {
                            label: '本月内',
                            value: [monthStart, monthEnd]
                        },
                        {
                            label: '自定义',
                            value: ['', '']
                        }
                    ],
                    mutexIndex:2,
                },
                {
                    key: ['finishTimeBegin', 'finishTimeEnd'],
                    title: '完成时间',
                    currentActiveIndex: 0,
                    list: [
                        {
                            label: '不限',
                            value: ['', '']
                        },
                        {
                            label: '今天完成',
                            value: [currentTime, ondeDayComplete]
                        },
                        {
                            label: '3天内完成',
                            value: [threeDayComplete, ondeDayComplete]
                        },
                        {
                            label: '7天内完成',
                            value: [oneWeekComplete, ondeDayComplete]
                        },
                        {
                            label: '自定义',
                            value: ['', '']
                        }
                    ],
                }
            ],
            searchList_detail: [
              {
                key: 'fuzzyQueryType',
                list: [
                  {
                    label: '综合检索',
                    value: 0,
                  },
                  {
                    label: '房源编号',
                    value: 1
                  },
                  {
                    label: '小区地址',
                    value: 2
                  },
                  {
                    label: '门牌号',
                    value: 3
                  },
                  {
                    label: '收付款人姓名',
                    value: 4
                  },
                  {
                    label: '收付款人电话',
                    value: 5
                  }
                ],
              },
              {
                key: 'paymentMethod',
                title: '收/付款途径',
                currentActiveIndex: 0,
                list: [],
              },
              {
                key: 'belongWalletId',
                title: '所属钱包账户',
                currentActiveIndex: 0,
                list: [],
                type:'select',
                name:'',
                id:undefined,
              },
              {
                key: 'bizType',
                title: '账单所属',
                currentActiveIndex: 0,
                list: [
                  {
                    label: '全部',
                    value: null
                  },
                  {
                    label: '房源',
                    value: 1
                  },
                  {
                    label: '租客',
                    value: 2
                  },
                  {
                    label: '业主',
                    value: 3
                  },
                  {
                    label: '分账',
                    value: 4
                  },
                  {
                    label: '手续费',
                    value: 5
                  },
                ],
              },
              {
                key: ['predictTimeBegin', 'predictTimeEnd'],
                title: '预计收(付)款日期',
                currentActiveIndex: 0,
                list: [
                  {
                    label: '不限',
                    value: ['', '']
                  },
                  {
                    label: '今天',
                    value: [currentTime, currentTime]
                  },
                  {
                    label: '本周',
                    value: [currentBeginWeek, currentWeek]
                  },
                  {
                    label: '本月',
                    value: [currentBeginMonth, currentMonth]
                  },
                  {
                    label: '自定义',
                    value: ['', '']
                  }
                ],
              },
              {
                key: ['practicalTimeBegin', 'practicalTimeEnd'],
                title: '实收(付)时间段',
                currentActiveIndex: 0,
                list: [
                  {
                    label: '不限',
                    value: ['', '']
                  },
                  {
                    label: '今天',
                    value: [currentTime, currentTime]
                  },
                  {
                    label: '本周',
                    value: [currentBeginWeek, currentWeek]
                  },
                  {
                    label: '本月',
                    value: [currentBeginMonth, currentMonth]
                  },
                  {
                    label: '自定义',
                    value: ['', '']
                  }
                ],
              },
              {
                key: ['createTimeBegin', 'createTimeEnd'],
                title: '创建时间段',
                currentActiveIndex: 0,
                list: [
                  {
                    label: '不限',
                    value: ['', '']
                  },
                  {
                    label: '今天',
                    value: [currentTime, currentTime]
                  },
                  {
                    label: '本周',
                    value: [currentBeginWeek, currentWeek]
                  },
                  {
                    label: '本月',
                    value: [currentBeginMonth, currentMonth]
                  },
                  {
                    label: '自定义',
                    value: ['', '']
                  }
                ],
              },
            ],
            tableColumns: [
                {
                    title: '状态',
                    dataIndex: 'billStatus',
                    key: 'billStatus',
                    align: 'left',
                    scopedSlots: { customRender: 'billStatus' },
                    width: '10%',
                },
                {
                    title: '房源信息',
                    dataIndex: 'fullAddress',
                    key: 'fullAddress',
                    scopedSlots: { customRender: 'fullAddress' },
                    align: 'left',
                    width: '20%',

                },
                {
                    title: '收(付)款人信息',
                    dataIndex: 'payerName',
                    key: 'payerName',
                    scopedSlots: { customRender: 'payerName' },
                    align: 'left',
                    // width: '15%',
                },
                {
                    title: '账单金额',
                    key: 'totalMoney',
                    dataIndex: 'totalMoney',
                    scopedSlots: { customRender: 'totalMoney' },
                    align: 'left',
                    // width: '10%',
                },
                {
                    title: '收(付)日期',
                    key: 'predictTime',
                    dataIndex: 'predictTime',
                    align: 'left',
                    scopedSlots: { customRender: 'predictTime' },
                    width: '90px',
                },

                {
                    title: '账单周期',
                    key: 'beginTime',
                    dataIndex: 'beginTime',
                    scopedSlots: { customRender: 'beginTime' },
                    align: 'left',
                    width: '176px',
                },
                {
                    title: '账单摘要',
                    key: 'billName',
                    dataIndex: 'billName',
                    scopedSlots: { customRender: 'billName' },
                    align: 'left',
                    width: '110px',
                },
                {
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'center',
                    width: '80px',
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
            tableColumns_detail: [
              {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                align: 'center',
                width: '50px',
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
              {
                title: '状态',
                dataIndex: 'feeStatus',
                key: 'feeStatus',
                align: 'left',
                scopedSlots: { customRender: 'feeStatus' },
                width: '130px',
              },
              {
                title: '房源信息',
                dataIndex: 'fullAddress',
                key: 'fullAddress',
                scopedSlots: { customRender: 'fullAddress' },
                align: 'left',
                width: '270px',

              },
              {
                title: '收(付)款人信息',
                dataIndex: 'payerName',
                key: 'payerName',
                scopedSlots: { customRender: 'payerName' },
                align: 'left',
                width: '208px',
              },
              {
                title: '费用类型',
                key: 'feeSubjectName',
                dataIndex: 'feeSubjectName',
                align: 'left',
                width: '96px',
              },
              {
                title: '金额（元）',
                key: 'originalMoney',
                dataIndex: 'originalMoney',
                scopedSlots: { customRender: 'totalMoney' },
                align: 'left',
                width: '96px',
              },
              {
                title: '收(付)款日期',
                key: 'predictTime',
                dataIndex: 'predictTime',
                align: 'left',
                scopedSlots: { customRender: 'predictTime' },
                width: '170px',
              },
              {
                title: '账单周期',
                key: 'beginTime',
                dataIndex: 'beginTime',
                scopedSlots: { customRender: 'beginTime' },
                align: 'left',
                width: '170px',
              },
            ],
            statusData: [
                {
                    title: '全部',
                    status: 0,
                    string: 'dataTotal',
                    query: null,
                },
                {
                    title: '未完成 ',
                    status: 0,
                    string: 'undoneTotal',
                    query: 1,
                    color: '#FB4246'
                },
                {
                    title: '待收',
                    status: 0,
                    string: 'incomeTotal',
                    query: 12,
                    color: '#409eff'
                },
                {
                    title: '待付',
                    status: 0,
                    string: 'expendTotal',
                    query: 13,
                    color: '#FB4246'
                },
                
                {
                    title: '已完成',
                    status: 0,
                    string: 'completedTotal',
                    query: 2,
                    color: '#03C683'
                },
                {
                    title: '已作废',
                    status: 0,
                    string: 'cancelTotal',
                    query: 9,
                    color: '#666666'
                },
                {
                    title: '逾期',
                    status: 0,
                    string: 'overdueTotal',
                    query: 11,
                    color: '#FB4246'
                },
            ],
            statusData_detail: [
            {
              title: '全部',
              status: 0,
              string: 'dataTotal',
              query: null,
            },
            {
              title: '应收',
              status: 0,
              string: 'receivableTotal',
              query: 1,
              color: '#0A87F8'
            },
            {
              title: '应支',
              status: 0,
              string: 'expendTotal',
              query: 2,
              color: '#FB4246'
            },
            {
              title: '已收',
              status: 0,
              string: 'receivedTotal',
              query: 3,
              color: '#03C683'
            },
            {
              title: '已支',
              status: 0,
              string: 'spentTotal',
              query: 4,
              color: '#03C683'
            }
          ],
            selectedRowKeys: [],   //表格选中key集合
            checkedCount: 0,       //表格选中数
            confirmLoading: false,
            addBillDialog: false,
            tableData: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,//每页中显示10条数据
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
            },
            billDetailDialog: false,
            editBillDialog: false,
            associatedDialog: false,
            associatedDialogZk: false,
            associatedDialogYz: false,
            billProcessDialog:false,
            billBatchProcessDialog:false,
            billBatchProcessIds:[],
            exportExcelShow:false,
            // billId:'6a89f1da9d7c4a3d98ef6d5b47e7c128',
            billId: '',
            exportUrl: '/pc2b/bill/list_export',
            infoData:{},
            exportData:{},
            activeIndex: 0,
            checkFlg:false,
            spinLoading:true,
            isRefresh:false,
          currentIndex:1,       //1、账单管理；2、账单明细
          billDetailDetailDialog:false,
          billDetailId: '',
          amountDiffTotal:0,
          expendAmountTotal:0,
          incomeAmountTotal:0,
          source_billList: null,
          source_billStatusCount:null,
          source_billDetailList: null,
          source_billDetailStatusCount:null,
          permissions:[],
          warningDialog:false,
          auditEmpNameList:[],
          sendMessageFlag:true,
          auditInstanceId:'',   //审批id
          confirmPayInfoDialog:false,
          workflowTab:false,
          billBizId:'',
        }
    },
    created() {
      this.initPayMethodDictionary();
      this.waListSimple();
    },
    mounted(){
        switch (this.$route.params.search) {
            case 'income':
            case 'todayIncome':
                this.activeIndex = 2;
                this.sendData.status = 1;
                this.sendData.exBillStatusList.push(12)
                break;
            case 'overdueIncome':
                this.activeIndex = 2;
                this.sendData.status = 1;
                this.checkFlg = true;
                this.sendData.exBillStatusList.push(11,12)
                break;
            case 'expend':
            case 'todayExpend':
                this.activeIndex = 3;
                this.sendData.status = 1;
                this.sendData.exBillStatusList.push(13)
                break;
            case 'overdueExpend':
                this.activeIndex = 3;
                this.sendData.status = 1;
                this.checkFlg = true;
                this.sendData.exBillStatusList.push(11,13)
                break;
        }
        if(this.$route.params.search == 'todayIncome' || this.$route.params.search == 'todayExpend'){
            this.$refs.searchDialogId.searchData.predictTimeBegin = this.$moment().startOf('day').valueOf();
            this.$refs.searchDialogId.searchData.predictTimeEnd = this.$moment().startOf('day').valueOf();
            this.$refs.searchDialogId.searchDataArr.push({
                title: this.searchList[2].title,
                val: this.searchList[2].list[1].label,
            })
            this.searchList[3].currentActiveIndex = 1;
            this.$refs.searchDialogId.confirm();
        }else{
            this.inif();
        }
    },
    methods: {
        billBatchProcessSuccess(){
          this.billBatchProcessDialog = false;
          setTimeout(() => {
            this.selectedRowKeys = [];
            this.checkedCount = 0;
            this.layerChange(-1);
            this.inif();
          }, 500);
        },
        onChangeSendMessageFlag(e){
          this.sendMessageFlag = e.target.checked;
        },
        urgeHander(){
          let parameter ={
            auditInstanceId:this.auditInstanceId,
            isSmsNotify:this.sendMessageFlag?1:0,
          };
          this.warningDialog = false;
          urgeHander(parameter).then(res => {
            if (res.code == 200) {
              this.$message.success('催办成功！');
              this.warningDialog = false;
            }else{
              this.$message.error('催办失败！');
            }
          })
        },
        openUrgeHander(record){
          this.auditEmpNameList = record.billBizInfo.auditEmpNameList;
          this.warningDialog = true;
          this.auditInstanceId = record.billBizInfo.auditInstanceId;
        },
        revoke(record) {
          let _this = this;
          let parameter = {
            auditInstanceId : record.billBizInfo.auditInstanceId,
            bizScene:32,
          };
          this.$modal.confirm({
            title: '你确定要撤销申请吗？',
            content: '',
            okText: '确定',
            cancelText: '取消',
            onOk() {
              revoke(parameter).then(res => {
                if (res.code == 200) {
                  if(res.data.successFlag==1){
                    _this.$message.success('撤销申请成功！');
                    setTimeout(()=> {
                      _this.inif();
                    },500);
                  }
                  else{
                    _this.$message.error(res.data.errorMsg);
                  }
                }else{
                  _this.$message.error('撤销申请失败！');
                }
              })
            },
            onCancel() {
            },
          });
        },
        openFlowDetail(record){
          this.billId = record.id;
          this.auditInstanceId = record.auditInstanceId;
          this.billDetailDialog = true;
          this.workflowTab = true;
        },
        goConfirmPay(record){
          this.confirmPayInfoDialog = true;
          this.billId = record.id;
          this.billBizId = record.billBizInfo.billBizId;
        },
        waListSimple() {
          waListSimple().then(res => {
            if (res.code === '200') {
              let waSimpleList = res.data;
              waSimpleList.forEach((item)=>{
                item.showName = item.alias;
              });
              this.searchList_detail.forEach((item)=>{
                if(item.key=='belongWalletId'){
                  item.list = waSimpleList;
                }
              });
            }
          })
        },
        initPayMethodDictionary(){
          getPayMethodDictionary().then(res => {
            // console.log(res)
            if (res.code == 200) {
              let resData= res.data;
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
              this.searchList_detail.forEach((item)=>{
                if(item.key=='paymentMethod'){
                  item.list = searchListList;
                }
              });

            }
          });
        },
        changCurrentIndex(val){
          if(this.currentIndex == val){
            return ;
          }
          if(this.currentIndex==1){
            this.$refs.searchDialogId.searchDataArr = [];
            this.$refs.searchDialogId.copyPlaceholder = '房源编号/小区地址/门牌号/项目名称/收(付)款人姓名/收(付)款人电话';
          }
          else if(this.currentIndex==2){
            this.$refs.searchDialogId_detail.searchDataArr = [];
            this.$refs.searchDialogId_detail.copyPlaceholder = '房源编号/小区地址/门牌号/收(付)款人姓名/收(付)款人电话';
          }
          this.currentIndex = val;
          this.pagination.current = 1;
          if(this.currentIndex==1){
            this.exportUrl = '/pc2b/bill/list_export';
            this.activeIndex = 0;
            this.checkFlg = false;
            this.sendData = {
              current: 1,                     // 当前页数
              size: 10,                       // 每页返回的记录数量
              fuzzyKeyword: '',               // 模糊匹配关键词
              fuzzyQueryType: 0,             //模糊查询类型【0、全部，1、房源编号，2、小区地址，3、门牌号，4、收付款人姓名，5、收付款人电话】
              isSearchCount: 1,                //是否查询总记录数（1.是（默认）；2.否）
              deptId: '',                     // 部门ID
              maintainerId: '',              // 负责人ID

              bizType: '',                     //业务类型【1、房源，2、租客，3、业主】
              createTime: null,               // 创建时间
              finishTimeBegin: null,          // 完成时间开始
              finishTimeEnd: null,            // 完成时间结束
              predictTimeBegin: null,         // 预计收付款时间开始
              predictTimeEnd: null,           // 预计收付款时间结束

              order:'',
              sort: '',                       // 排序字段
              billStatus: null,               // 账单状态（1：未完成；2：已完成；9：已作废；）
              tenantId: '',                   // 租户ID
              updateTime: '',                 // 修改时间
              vacantDaysBegin: '',            // 空置天数区间开始
              vacantDaysEnd: '',              // 空置天数区间结束

              feeDirection:'',                //账单费用方向（1：收款；2：付款）
              exBillStatusList:[],             //扩展账单状态（11：逾期；12：待收；13：待付）
              feeSubjectIdList:[],
            },
            this.inif();
          }
          else if(this.currentIndex==2){
            this.exportUrl = '/pc2b/bill_detail/list_export';
            this.sendData_detail = {
              current: 1,                     // 当前页数
                  size: 10,                       // 每页返回的记录数量
                  fuzzyKeyword: '',               // 模糊匹配关键词
                  fuzzyQueryType: 0,             //模糊查询类型【0、全部，1、房源编号，2、小区地址，3、门牌号，4、收付款人姓名，5、收付款人电话】
                  isSearchCount: 1,                //是否查询总记录数（1.是（默认）；2.否）
                  deptId: '',                     // 部门ID
                  maintainerId: '',              // 负责人ID
                  affirmEmpDeptId:'',              //账单确认人所属部门id
                  affirmEmpId:'',                  //账单确认人id
                  affirmEmpIdList:[],
                  paymentMethod:'',
                  belongWalletId:'',
                  bizType: '',                     //业务类型【1、房源，2、租客，3、业主】
                  createTime: null,               // 创建时间
                  sort: '',                       // 排序字段
                  feeStatus: null,               // 账单状态（1：未完成；2：已完成；9：已作废；11：已逾期）
                  tenantId: '',                   // 租户ID
                  updateTime: '',                 // 修改时间
                  feeSubjectIdList:[],
                  predictTimeBegin:'',
                  predictTimeEnd:'',
                  practicalTimeBegin:'',
                  practicalTimeEnd:'',
                  createTimeBegin:'',
                  createTimeEnd:'',
            },
            this.initData();
          }
        },
        initData() {
          this.getData_detail();
          this.getStatusCount_detail();
        },
        inif() {
            this.getData();
            this.getStatusCount();
        },
        getData_detail() {
          this.cancelQuest(3) // 请求发送前调用
          this.spinLoading = true;
          billDetailList(this.sendData_detail,this).then(res => {
            if (res&&res.code === "200") {
              if(res.data == null){
                this.tableData = [];
              }else{
                this.tableData = res.data.records;
                this.pagination.total = res.data.total;
                this.tableData.forEach((item, index)=>{
                  item.index = index + 1;
                });
              }
            }
            this.spinLoading = false;
          })
        },
      getStatusCount_detail() {
        this.cancelQuest(4) // 请求发送前调用
          billDetailBizStat(this.sendData_detail,this).then(res => {
            if (res.code === '200') {
              let resData = res.data;
              for (let item of this.statusData_detail) {
                item.status = resData[item.string];
              }
              this.amountDiffTotal = resData.amountDiffTotal;
              this.expendAmountTotal = resData.expendAmountTotal;
              this.incomeAmountTotal = resData.incomeAmountTotal;
            }
          })
        },
        cancelQuest(val) {
          if (val==1&&typeof this.source_billList === 'function') {
            this.source_billList('终止请求'); //取消请求
          }
          if (val==2&&typeof this.source_billStatusCount === 'function') {
            this.source_billStatusCount('终止请求'); //取消请求
          }
          if (val==3&&typeof this.source_billDetailList === 'function') {
            this.source_billDetailList('终止请求'); //取消请求
          }
          if (val==4&&typeof this.source_billDetailStatusCount === 'function') {
            this.source_billDetailStatusCount('终止请求'); //取消请求
          }
        },
        getData() {
          this.cancelQuest(1) // 请求发送前调用
            this.spinLoading = true;
            billList(this.sendData, this).then(res => {
                // console.log(res)
                if (res&&res.code === "200") {
                    const checkRes = res.data;
                    this.tableData = checkRes.records;
                    this.pagination.total = res.data.total;
                }
                this.spinLoading = false;
            })
        },
        getStatusCount() {
          this.cancelQuest(2) // 请求发送前调用
            let sendData = JSON.parse(JSON.stringify(this.sendData));
            sendData.status = '';
            billBizStat(sendData, this).then(res => {
                if (res.code === '200') {
                    let conut = res.data;
                    for (let item of this.statusData) {
                        item.status = conut[item.string];
                    }
                    this.amountDiffTotal = conut.amountDiffTotal;
                    this.expendAmountTotal = conut.expendAmountTotal;
                    this.incomeAmountTotal = conut.incomeAmountTotal;
                }
            })
        },
        addBill() {
            this.addBillDialog = true;
        },
        changeStatus(status,index) {
            if(this.activeIndex == index){

            }else{
                this.sendData.current = 1;
                this.pagination.current = 1;
                this.activeIndex = index;
                if(index == 2){
                    this.sendData.billStatus = 1;
                    if(this.sendData.exBillStatusList.indexOf(13) != -1){
                    this.sendData.exBillStatusList.splice(this.sendData.exBillStatusList.indexOf(13),1);
                    }
                    this.sendData.exBillStatusList.push(12);
                } else if(index== 3){
                    this.sendData.billStatus = 1;
                    if(this.sendData.exBillStatusList.indexOf(12) != -1){
                    this.sendData.exBillStatusList.splice(this.sendData.exBillStatusList.indexOf(12),1);
                    }
                    this.sendData.exBillStatusList.push(13);
                } else{
                    if(this.sendData.exBillStatusList.indexOf(12) != -1) {
                      this.sendData.exBillStatusList.splice(this.sendData.exBillStatusList.indexOf(12), 1);
                    }
                    if(this.sendData.exBillStatusList.indexOf(13) != -1) {
                      this.sendData.exBillStatusList.splice(this.sendData.exBillStatusList.indexOf(13), 1);
                    }
                    if(index== 4 ||index== 5){
                      this.sendData.exBillStatusList = [];
                      this.checkFlg = false;
                    }
                    this.sendData.billStatus = status;
                }
                this.sendData.order = ''   //排序类型(asc/desc)
                this.sendData.sort = ''     //创建时间 fb_create_time 更新时间 fb_update_time 应收付时间 fb_predict_time 完成时间 fb_finish_time
                if(this.sendData.billStatus == 1){
                    this.sendData.order = 'asc'
                    this.sendData.sort = 'fb_predict_time'
                }else if(this.sendData.billStatus == 2){
                    this.sendData.order = 'desc'
                    this.sendData.sort = 'fb_finish_time'
                }else if(this.sendData.billStatus == 9){
                    this.sendData.order = 'desc'
                    this.sendData.sort = 'fb_update_time'
                }
                this.getStatusCount();
                this.getData();
            }
            
        },
        changeStatus_detail(option) {
          this.sendData.current = 1;
          this.pagination.current = 1;
          if(option.query == 1){
            this.sendData_detail.isOccur = 0;
            this.sendData_detail.feeDirection = 1;
          }
          else if(option.query == 2){
            this.sendData_detail.isOccur = 0;
            this.sendData_detail.feeDirection = 2;
          }
          else if(option.query == 3){
            this.sendData_detail.isOccur = 1;
            this.sendData_detail.feeDirection = 1;
          }
          else if(option.query == 4){
            this.sendData_detail.isOccur = 1;
            this.sendData_detail.feeDirection = 2;
          }
          else {
            this.sendData_detail.isOccur = null;
            this.sendData_detail.feeDirection = null;
          }
          this.getStatusCount_detail();
          this.getData_detail();
        },
        onStatusChange(res){
          if(res.target.checked){
            if(this.sendData.exBillStatusList.indexOf(11) == -1){
              this.sendData.exBillStatusList.push(11);
            }
          }
          else{
            if(this.sendData.exBillStatusList.indexOf(11) > -1){
              this.sendData.exBillStatusList.splice(this.sendData.exBillStatusList.indexOf(11),1);
            }
          }
           this.getData();
        },
        onSizeChange(current) {
            //清空选项值
            this.selectedRowKeys = [];
            this.checkedCount = 0;
            this.layerChange(-1);
            if(this.currentIndex==1){
              this.sendData.current = current;
              this.getData();
            }
            if(this.currentIndex==2){
              this.sendData_detail.current = current;
              this.getData_detail();
            }
        },
        onShowSizeChange(current, pageSize) {
            //清空选项值
            this.selectedRowKeys = [];
            this.checkedCount = 0;
            this.layerChange(-1);
            this.pagination.pageSize = pageSize;
            if(this.currentIndex==1){
              this.sendData.current = current;
              this.sendData.size = pageSize;
              this.getData();
            }
            if(this.currentIndex==2){
              this.sendData_detail.current = current;
              this.sendData_detail.size = pageSize;
              this.getData_detail();
            }
        },
        assetsFormData(data) {
            this.searchVisible = false;
            this.sendData.fuzzyQueryType = data.fuzzyQueryType;
            this.sendData.fuzzyKeyword = data.fuzzyKeyword;
            this.sendData.finishTimeBegin = data.finishTimeBegin
            this.sendData.finishTimeEnd = data.finishTimeEnd
            // this.sendData.quiteDateType = data.quiteDateType;
            this.sendData.predictTimeBegin = data.predictTimeBegin;
            this.sendData.predictTimeEnd = data.predictTimeEnd;
            if(data.predictTimeEndLater){
              this.sendData.billStatus = 1;
              if(this.activeIndex==1||this.activeIndex==2||this.activeIndex==3){
              }
              else{
                this.activeIndex = 1;
              }
              this.sendData.predictTimeBegin = '';
              if(data.predictTimeEndLater == 1){
                this.sendData.predictTimeEnd = Vue.prototype.$moment().startOf('day').valueOf();
              }
              else if(data.predictTimeEndLater == 2){
                this.sendData.predictTimeEnd = Vue.prototype.$moment().startOf('day').add(1, 'days').valueOf();
              }
              else if(data.predictTimeEndLater == 3){
                this.sendData.predictTimeEnd = Vue.prototype.$moment().startOf('day').add(3, 'days').valueOf();
              }
              else if(data.predictTimeEndLater == 4){
                this.sendData.predictTimeEnd = Vue.prototype.$moment().startOf('day').add(7, 'days').valueOf();
              }
              else if(data.predictTimeEndLater == 5){
                this.sendData.predictTimeEnd = Vue.prototype.$moment().startOf('day').add(15, 'days').valueOf();
              }
              else if(data.predictTimeEndLater == 6){
                this.sendData.predictTimeEnd = Vue.prototype.$moment().startOf('day').add(30, 'days').valueOf();
              }
            }
            this.sendData.bizType = data.bizType;
            this.sendData.deptId = data.deptId;
            this.sendData.maintainerId = data.maintainerId;
            this.sendData.feeDirection = data.feeDirection;
            this.sendData.current = 1;
            this.pagination.current = 1;
            this.inif();
        },
        assetsFormData_detail(data) {
          this.searchVisible = false;
          if(data.fuzzyQueryType) {
            this.sendData_detail.fuzzyQueryType = data.fuzzyQueryType;
          } else{
            this.sendData_detail.fuzzyQueryType = 0;
          }
          this.sendData_detail.fuzzyKeyword = data.fuzzyKeyword;
          this.sendData_detail.deptId = data.deptId;
          this.sendData_detail.maintainerId = data.maintainerId;
          this.sendData_detail.affirmEmpDeptId = data.affirmEmpDeptId;
          this.sendData_detail.affirmEmpId = data.affirmEmpId;
          this.sendData_detail.affirmEmpIdList = data.affirmEmpIdList;
          this.sendData_detail.feeSubjectIdList = data.feeSubjectIdList;
          this.sendData_detail.paymentMethod = data.paymentMethod;
          this.sendData_detail.belongWalletId = data.belongWalletId;
          this.sendData_detail.predictTimeBegin = data.predictTimeBegin;
          this.sendData_detail.predictTimeEnd = data.predictTimeEnd;
          this.sendData_detail.practicalTimeBegin = data.practicalTimeBegin;
          this.sendData_detail.practicalTimeEnd = data.practicalTimeEnd;
          this.sendData_detail.createTimeBegin = data.createTimeBegin;
          this.sendData_detail.createTimeEnd = data.createTimeEnd;
          this.sendData_detail.bizType = data.bizType;
          this.sendData_detail.current = 1;
          this.pagination.current = 1;
          this.initData();
        },
        billProcessSuccess(res){
          this.billProcessDialog = false;
          if(res) {
            setTimeout(() => {
              this.inif();
            }, 1000)
          }else{
            this.inif();
          }
        },
        confirmPayInfoSuccess(){
          this.confirmPayInfoDialog = false;
          setTimeout(() => {
            this.inif();
          }, 1000)
        },
        saveSuccess(res) {
            this.addBillDialog = false;
            this.billDetailDialog = false;
            this.editBillDialog = false;
            this.associatedDialog = false;
            this.associatedDialogZk = false;
            this.associatedDialogYz = false;
            this.billProcessDialog = false;
            this.confirmPayInfoDialog = false;
            if(res) {
                setTimeout(() => {
                    this.inif();
                }, 500)
            }else{
                this.inif();
            }
        },
        //***表格相关**//
        onSelectChange(selectedRowKeys, selectedRows) {
            //表格选中项发生变化时的回调
            this.selectedRowKeys = selectedRowKeys;
            this.checkedCount = selectedRowKeys.length;
            //先清空，再添加，防止添加重复
            // this.selectedRowNames = [];
            if (selectedRowKeys.length > 0) {
                this.layerChange(1);
            } else {
                this.layerChange(-1);
            }
        },
        layerChange(index) {
            let checkOptionBillDoc = document.getElementById("checkOptionBill");
            if (checkOptionBillDoc != null) {
                document.getElementById("checkOptionBill").style.zIndex = index;
            }
        },
        handleTableChange(pagination) {
            this.pagination.current = pagination.current;
            this.pagination.pageSize = pagination.pageSize;
            // if (this.isApplication == 0) {
            //     this.listEmpExtendInfo();
            // }
            // if (this.isApplication == 1) {
            //     this.employeeApplyList();
            // }
        },
        //***其他***//
        cancelOption() {
            //取消选中员工，取消相关操作
            this.selectedRowKeys = [];
            // this.selectedRowNames = [];
            //清除操作图层
            this.layerChange(-1);
        },
        openDetail(record) {
            return {
                on: {
                    click: () => {
                        this.billId = record.id;
                        this.billDetailDialog = true;
                    }
                }
            }
        },
        openDetail_detail(record) {
          return {
            on: {
              click: () => {
                this.billDetailId = record.id;
                this.billDetailDetailDialog = true;
              }
            }
          }
        },
        checkOpts(record){
            //1、处理账单；2、催收；3、编辑；4、作废；5、删除；6、关联房源；7、关联租客；8、关联业主；10、催办；11、撤销；12、审批；9、重新提交；13、确认付款；14、账单复原
            if(!this.permissions||this.permissions.length==0){
              this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
            }
            let markArr = [];
            let btnArr = [];

            if(record.billBizInfo){
              if(record.billBizInfo.bizAuditStatus==1){
                if(record.billBizInfo.auditRelationType==1){
                  btnArr.push('10');
                  btnArr.push('11');
                }
                else if(record.billBizInfo.auditRelationType==2){
                  btnArr.push('12');
                }
                else if(record.billBizInfo.auditRelationType==5){
                  btnArr.push('10');
                  btnArr.push('11');
                  btnArr.push('12');
                }
              }
              else if((record.billBizInfo.bizAuditStatus==5||record.billBizInfo.bizAuditStatus==6)&&(record.billBizInfo.auditRelationType==1||record.billBizInfo.auditRelationType==5)){
                btnArr.push('9');
              }
              else if(record.billBizInfo.bizAuditStatus==9&&record.billBizInfo.isPaid==0){
                markArr.push('mk_finance_bill_clzd');
              }
            }
            else{
              if(record.billStatus==1){
                markArr.push('mk_finance_bill_clzd','mk_finance_bill_bjzd','mk_finance_bill_zf');
                if(record.bizType==2&&record.notOccurredMoney>0){
                  markArr.push('mk_finance_bill_cszd');
                }
              }
              if(record.isAllowHouseRelation==1){
                markArr.push('mk_finance_bill_glfy');
              }
              if(record.isAllowRCRelation==1){
                markArr.push('mk_finance_bill_glzk');
              }
              if(record.isAllowOCRelation==1){
                markArr.push('mk_finance_bill_glyz');
              }
              if(record.billStatus==2){
                markArr.push('mk_finance_bill_zf');
              }
              if(record.billStatus==9){
                markArr.push('mk_finance_bill_fy');
                markArr.push('mk_finance_bill_sc');
              }
            }

            //判断资源权限
            markArr.forEach(ele => {
              this.permissions.some(function(value){
                if (ele == value.mark){
                  if(value.mark == 'mk_finance_bill_clzd'){
                    if(record.billBizInfo){
                      btnArr.push('13');
                    }
                    else{
                      btnArr.push('1');
                    }
                  }else if(value.mark == 'mk_finance_bill_cszd'){
                    btnArr.push('2');
                  }else if(value.mark == 'mk_finance_bill_bjzd'){
                    btnArr.push('3');
                  }else if(value.mark == 'mk_finance_bill_zf'){
                    btnArr.push('4');
                  }else if(value.mark == 'mk_finance_bill_sc'){
                    btnArr.push('5');
                  }else if(value.mark == 'mk_finance_bill_glfy'){
                    btnArr.push('6');
                  }else if(value.mark == 'mk_finance_bill_glzk'){
                    btnArr.push('7');
                  }else if(value.mark == 'mk_finance_bill_glyz'){
                    btnArr.push('8');
                  }else if(value.mark == 'mk_finance_bill_fy'){
                    btnArr.push('14');
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
        editData(res) {
            this.billId = res.id
            this.editBillDialog = true;

        },
        billProcessFun(res) {
            this.billId = res.id
            this.billProcessDialog = true;
        },
        goBillBatchProcess(){
            this.billBatchProcessIds = [];
            let selectData = [];
            this.tableData.forEach((item)=>{
              if(this.selectedRowKeys.indexOf(item.id)>-1){
                let obj = Object.assign({},item);
                selectData.push(obj);
              }
            });
            let billStatus1 = 0;
            selectData.forEach((item)=> {
              if (item.billStatus == 1) {
                billStatus1 += 1;
                this.billBatchProcessIds.push(item.id);
              }
            });
            if(billStatus1==0){
              this.$message.warning('暂无可处理账单，请重新选择');
              return ;
            }
            this.billBatchProcessDialog = true;
        },
        goBillBatchCancel(){
          let selectData = [];
          this.tableData.forEach((item)=>{
            if(this.selectedRowKeys.indexOf(item.id)>-1){
              let obj = Object.assign({},item);
              selectData.push(obj);
            }
          });
          let billStatus =0;
          let billStatus1 = 0;
          let billStatus2 = 0;
          selectData.forEach((item)=>{
            if(item.billStatus==1){
              billStatus1 +=1;
              billStatus +=1;
            }
            else if(item.billStatus==2){
              billStatus2 +=1;
              billStatus +=1;
            }
          });
          if(billStatus==0){
            this.$message.warning('暂无可作废账单，请重新选择');
            return ;
          }
          let nameTitle = '已选择';
          if(billStatus1>0){
            nameTitle += billStatus1 + ' 个未完成';
            if(billStatus2>0){
              nameTitle += '、 ';
            }
          }
          if(billStatus2>0){
            nameTitle += billStatus2 + ' 个已完成';
          }
          nameTitle += '账单，确定要作废吗？';
          let _this = this;
          this.$modal.confirm({
            title: nameTitle ,
            content: '作废后，此账单将无效，请谨慎操作。',
            okText: '确定',
            cancelText: '取消',
            onOk() {
              billBatchCancel({idList:_this.selectedRowKeys}).then(res => {
                // console.log(res)
                if (res.code == 200) {
                  _this.$message.success('操作成功！');
                  setTimeout(() => {
                    _this.selectedRowKeys = [];
                    _this.checkedCount = 0;
                    _this.layerChange(-1);
                    _this.inif();
                  }, 500)

                }
              })
            },
            onCancel() {
              // console.log('Cancel');
            },
          });
        },
        collectionFun(id) {
            let that = this;
            let ids = this.selectedRowKeys;
            let parameter = ids.join(",");
            if(id){
                parameter = id;
            }
            this.$modal.confirm({
                title: '确定要发送催收短信吗？',
                content: '发送成功后，已选中的租客将会收到交租的短信',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    billPayUrge(parameter).then(res => {
                        // console.log(res)
                        if (res.code === '200') {
                            that.$message.success('操作成功！');
                            //that.layerChange(-1);
                            setTimeout(() => {
                                that.inif();

                            }, 500)
                        }
                    })

                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        backChild(data){
          let _this = this;
          let id = data.id
          this.$modal.confirm({
            title: '确定要还原 「' + data.payerName + '/' + data.payerPhone + '」 的账单吗？',
            content: '复原后，明细和流水将同步复原',
            okText: '确定',
            cancelText: '取消',
            onOk() {
              billCancelRevert(id).then(res => {
                // console.log(res)
                if (res.code == 200) {
                  _this.$message.success('操作成功！');
                  setTimeout(() => {
                    _this.inif();
                  }, 500)

                }
              })
            },
            onCancel() {
              // console.log('Cancel');
            },
          });
        },
        deleteChild(data) {
            let _this = this;
            let id = data.id
            this.$modal.confirm({
                title: '确定要删除 「' + data.payerName + '/' + data.payerPhone + '」 的账单吗？',
                content: '删除后将不可恢复',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    billDelete(id).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            _this.$message.success('操作成功！');
                            setTimeout(() => {
                                _this.inif();
                            }, 500)

                        }
                    })
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        toVoidFun(data) {
            let _this = this;
            let id = data.id
            this.$modal.confirm({
                title: '确定要作废 「' + data.payerName + '/' + data.payerPhone + '」 的账单吗？',
                content: '作废后，此账单将无效，请谨慎操作。',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    billCancel(id).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            _this.$message.success('操作成功！');
                            setTimeout(() => {
                                _this.inif();
                            }, 500)

                        }
                    })
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        //关联房源
        associated(res) {
            this.infoData = res;
            this.associatedDialog = true;
        },
        //关联租客
        associatedZk(res) {
            this.infoData = res;
            this.associatedDialogZk = true;
        },
        //关联业主
        associatedYz(res) {
            this.infoData = res;
            this.associatedDialogYz = true;
        },
        // 导出
        exportExcel() {
          if(this.currentIndex==1){
            this.exportData = Object.assign({}, this.sendData);
          }
          else{
            this.exportData = Object.assign({}, this.sendData_detail);
          }
          // this.exportData.total = this.pagination.total;
          this.exportExcelShow = true;
        },
        refreshinfoFun(res){  //详情有改变的操作  就改变状态
            if(res){
                this.isRefresh = res
            }  
        },
        isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
            if(this.isRefresh){
                this.inif();
            }
            this.billDetailDialog = false;
            this.isRefresh = false
        },

    },
    filters: {

    }
}

</script>

<style lang="less" scoped>
.bill-box {
  .content-top {
    min-width: 1320px; // overflow: hidden;
  }
  .currentIndexStyle{
    margin: 9px 12px 0 0;
    width: 104px;
    height: 32px;
    background: #F6F7F8;
    border-radius: 2px;
    display: flex;
    .currentIndexItemStyle{
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 16px;
      background: #F6F7F8;
      width: 52px;
    }
    .selectedStyle{
      color: #0A87F8;
      background: #E6F3FE;
    }
    .unSelectStyle{
      color: #333333;
    }
  }
    & /deep/ .content-main {
      padding: 0px 14px;
      min-width: 1300px; // overflow: hidden;
        .content {
            padding: 0;
        }
    }
    & /deep/ .exportExcel-box{
      width:24px;
      height: 24px;
      margin-left:6px;
      margin-top: 4px;
        & /deep/  svg{
            width:24px;
            height: 24px;
        }
    }
    .statiscStyle{
      background: #FFFFFF;
      height: 38px;
      line-height: 38px;
      padding: 0 14px;
      font-size: 14px;
    }
    .splitBgStyle{
      height: 10px;
      background: #F1F2F5;
    }
    .table {
      min-width: 1200px;
        position: relative;
        .checkOptionBill {
            .fontSpacing {
                margin-left: 3px;
                margin-right: 3px;
            }
            position: absolute;
            z-index: -1;
            background-color: #fafafa;
            margin-top: 1px;
            height: 45px;
            margin-left: 70px;
            line-height: 45px;
            width: 95%;
            .dealOption {
                float: left;
                .headSpan {
                    margin-left: 16px;
                }
                .tooltip1{
                  /deep/ .ant-tooltip-inner{
                    padding: 8px 6px;
                  }
                }
                .tooltip2{
                  /deep/ .ant-tooltip-inner{
                    padding: 8px 4px 8px 6px;
                  }
                }
            }
            .cancelOption {
                font-size: 14px;
                float: right;
                margin-right: 20px;
                color: @themeColor;
            }
        }
        .action:hover {
            background-color: @themeBgColor;
            color: @themeColor;
        }
        .IconRadius {
            margin-top: 8px;
            margin-right: 5px;
            width: 6px;
            height: 6px;
            border-radius: 4px;
        }
        .toReceivables{
          background-color:#0A87F8;
        }
        .toPay {
          background-color:#FB4246;
        }
        .complete {
          background-color: #03C683;
        }
        .fontNormal {
            .normalBg {
                background-color: #3DB302;
            }
        }
        .fontProhibit {
            .prohibitBg {
                background-color: #777777;
            }
        }
        .fontNormalColor {
            color: #3DB302;
        }
        .fontProhibitColor {
            color: #111111;
        }
        .nameColumn {
            width: 100%;
            .name {
                float: left;
            }
            .leaderFlag {
                color: #777777;
                border: 0.5px solid #DDDDDD;
                border-radius: 10px;
                float: left;
                margin-left: 4px;
                padding-right: 4px;
                .leaderLength {
                    width: auto;
                    margin-left: 5px;
                    font-size: 12px;
                }
            }
        }
        .contFoot {
            margin-top: 0px;
            width: 100%;
            height: 56px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 20px; // position: absolute;
            // bottom: 0px;
            // right: 0;
            background-color: #fff;
        }
        .shou-zhi {
            display: inline-block;
            height: 20px;
            width: 20px;
            color: #FB4246;
            border: 1px solid #FB4246;
            border-radius: 50%;
            text-align: center; // margin: 0 10px;
            line-height: 20px;
            font-size: 12px;
        }
        .shou-shou {
            display: inline-block;
            height: 20px;
            width: 20px;
            color: #0A87F8;
            border: 1px solid #0A87F8;
            border-radius: 50%;
            text-align: center; // margin: 0 10px;
            line-height: 20px;
            font-size: 12px;
        }
        .statusRadius{
            width:20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border-radius: 50%;
            i{
                vertical-align: -0.1em
            }
        }
        .status1{
            color: #FFA036;
            border: 1px solid #FFA036;
        }
        .status9{
            color: #0A87F8;
            border: 1px solid #0A87F8;
        }
        .status5{
            color: #FB4246;
            border: 1px solid #FB4246;
        }
        .status6{
            color: #777777;
            border: 1px solid #777777;
        }
        & /deep/ .ant-table-thead>tr {
            height: 46px;
        }
        & /deep/ .ant-table-thead>tr>th{
            padding: 12px 6px;
        }
        & /deep/ .ant-table-tbody>tr>td {
            padding: 12px 6px;
            cursor: pointer;
        }
    }

    & /deep/ .ant-popover {
        .ant-popover-inner-content {
            text-align: center;
            padding: 5px 0;
            .action {
                padding: 8px 10px;
            }
            .action:hover {
                cursor: pointer;
                background: rgba(10, 135, 248, 0.1);
            }
        }
    }
}
</style>
<style scoped lang="less">
    .status {
        display: flex;
        .active {
            color: #0A87F8;
            border-bottom: 2px solid #0A87F8;
        }
        &>p {
            box-sizing: border-box;
            margin-right: 12px;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
            .leftLine{
                border-left: 1px dashed #dddddd;
                padding-left: 20px;
            }
        }
        /deep/ .ant-checkbox + span{
          padding-left: 4px;
        }
    }
    .houseAddress{
        height:20px;
        border-radius:2px;
        color: #0A87F8;
        background-color: #f0f8ff;
        font-size: 12px;
        text-align: center;
        padding: 5px 5px;
        margin-right: 5px;
    }
    .content{
      position: relative;
      padding: 32px 32px 0;
      .contentCircle{
        float: left;
        margin-right: 16px;
        font-size: 22px;
        color:#faad14;
      }
      .contentTitle{
        display: block;
        overflow: hidden;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 16px;
        line-height: 1.4;
      }
      .confirm-content{
        margin-top: 7px;
        margin-left: 38px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }
      .confirm-warning{
        margin-left: 38px;
        width:331px;
        padding: 8.5px 0 8.5px 10px;
        background:rgba(245,247,254,1);
        border-radius:4px;
        margin-top: 15px;
      }
      .confirm-check{
        position: absolute;
        bottom:-75px;
        left: 70px;
      }
    }
</style>
<style lang="less">
.myLaunch-box-special-Dialog{
  .ant-modal-header {
    border-bottom: none;
    height: 50px;
    line-height: 50px;
  }
  .ant-modal-footer {
    padding: 50px 32px 24px 32px;
    border-top: none;
  }
}
</style>

