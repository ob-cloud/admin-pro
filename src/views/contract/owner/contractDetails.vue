<template>
    <div class="contractDetails-owner-box">
        <div class="child-detail">
            <div class="house-address">
                <span>房源地址：</span>
                <span v-if="ownerContractViewDTO.houseAlias">{{ownerContractViewDTO.houseAlias}} /</span> {{ownerContractViewDTO.cityName}}{{ownerContractViewDTO.areaName}}{{ownerContractViewDTO.fullAddress}}
            </div>
            <div class="top f-clearfix">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span style="margin-top: 9px" class="radius-font status2" v-if="ownerContractViewDTO.status==2&&!skeletonLoading"><icon-font type="iconyumengtubiao_fangyuan-" /></span>
                    <span style="margin-top: 9px" class="radius-font status3" v-else-if="ownerContractViewDTO.status==3&&!skeletonLoading"><icon-font type="icon-yumengtubiao_banchu" /></span>
                    <span style="margin-top: 9px" class="radius-font statu4" v-else-if="ownerContractViewDTO.status==4&&!skeletonLoading"><icon-font type="icon-yumengtubiao_daishiyong" /></span>
                    <span style="margin-top: 9px" class="radius-font status6" v-else-if="ownerContractViewDTO.status==5&&!skeletonLoading"><icon-font type="icon-yumengtubiao_tuizu" /></span>
                    <span style="margin-top: 9px" class="radius-font status6" v-else-if="ownerContractViewDTO.status==6&&!skeletonLoading"><icon-font type="icon-yumengtubiao_tuizu" /></span>
                    <span style="margin-top: 9px" class="radius-font status6" v-else-if="ownerContractViewDTO.status==7&&!skeletonLoading"><icon-font type="icon-yumengtubiao_zuofei" /></span>
                    <span style="margin-top: 9px" class="radius-font status8" v-else-if="ownerContractViewDTO.status==8&&!skeletonLoading"><icon-font type="icon-yumengtubiao_xuzu-" /></span>
                    <div>
                        <label-item title="当前状态">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div style="width: 165px;" class="clearfix">
                                <div class="statusColor2 f-fl" v-if="ownerContractViewDTO.status==2&&!skeletonLoading">合约中</div>
                                <div class="statusColor3 f-fl" v-else-if="ownerContractViewDTO.status==3&&!skeletonLoading">即将到期</div>
                                <div class="statusColor4 f-fl" v-else-if="ownerContractViewDTO.status==4&&!skeletonLoading">已到期</div>
                                <div class="statusColor4 f-fl" v-else-if="ownerContractViewDTO.status==5&&!skeletonLoading">正常退</div>
                                <div class="statusColor3 f-fl" v-else-if="ownerContractViewDTO.status==6&&!skeletonLoading">非正常退</div>
                                <div class="statusColor4 f-fl" v-else-if="ownerContractViewDTO.status==7&&!skeletonLoading">已作废</div>
                                <div class="statusColor4 f-fl" v-else-if="ownerContractViewDTO.status==8&&!skeletonLoading">已被续约</div>
                                <span class="radius-font-yellow aduit-status-name muchFontLength f-fl" v-if="ownerContractViewDTO.auditStatus==1">{{ownerContractViewDTO.auditProcess}}</span>
                                <span class="radius-font-person aduit-status-name normalFontLength f-fl" v-else-if="ownerContractViewDTO.auditStatus==9">审批通过</span>
                                <span class="radius-font-red aduit-status-name normalFontLength f-fl" v-else-if="ownerContractViewDTO.auditStatus==5">审批驳回</span>
                                <span class="radius-font-close aduit-status-name normalFontLength f-fl" v-else-if="ownerContractViewDTO.auditStatus==6">已撤销</span>
                            </div>
                        </label-item>
                    </div>
                </div>

                <div class="f-fl detail">
                    <div class="blank-box" style="width: 30px;"></div>
                    <div class="item" style="width:190px">
                        <span style="margin-top: 7px" class="radius-font  radius-font-person">
                            <icon-font type="iconyumengtubiao_jiaosequanxian" />
                        </span>
                        <label-item title="业主信息" :skeletonLoading="skeletonLoading">
                            <div v-if="viewOwnerPhoneFlag">{{contractSigner.name?contractSigner.name:'-'}}-{{contractSigner.phone?contractSigner.phone:'-'}}</div>
                          <div v-else>{{contractSigner.name?contractSigner.name:'-'}}-{{contractSigner.phone|formatPhone}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:150px">
                        <span style="margin-top: 7px" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <label-item title="租金" :skeletonLoading="skeletonLoading">
                            <div>{{ownerContractViewDTO.price?ownerContractViewDTO.price/100 :'-'}} 元/月</div>
                        </label-item>
                    </div>
              
                    <div class="item" style="width:130px">
                        <span style="margin-top: 7px" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_yinhangka" />
                        </span>
                        <label-item title="付款方式" :skeletonLoading="skeletonLoading">
                            <div>
                                <span v-if="ownerContractViewDTO.depositMonth=== 90 && ownerContractViewDTO.periodMonth=== 99">一次性付</span>
                                <span v-else-if="ownerContractViewDTO.depositMonth!= 90&&ownerContractViewDTO.periodMonth=== 99">一次性付</span>
                                <span v-else-if="ownerContractViewDTO.depositMonth=== 90&&ownerContractViewDTO.periodMonth!= 99">押 {{ownerContractViewDTO.deposit?ownerContractViewDTO.deposit/100:'-'}} 付{{ownerContractViewDTO.periodMonth?ownerContractViewDTO.periodMonth:'-'}}</span>
                                <span v-else>押 {{ownerContractViewDTO.depositMonth? ownerContractViewDTO.depositMonth:'-'}} 付 {{ownerContractViewDTO.periodMonth?ownerContractViewDTO.periodMonth :'-'}}</span>
                            </div>
                        </label-item>
                    </div>
                    <div class="item" style="width:220px">
                        <span style="margin-top: 7px" class="radius-font  radius-font-greed">
                            <icon-font type="icon-yumengtubiao_riqi" />
                        </span>
                        <label-item title="租期" :skeletonLoading="skeletonLoading">
                            <div>{{ownerContractViewDTO.beginTime?$moment(ownerContractViewDTO.beginTime).format('YYYY.MM.DD') :'-'}}-{{ownerContractViewDTO.endTime?$moment(ownerContractViewDTO.endTime).format('YYYY.MM.DD'):'-'}}({{ownerContractViewDTO.signPeriod|noInfo}})</div>
                        </label-item>
                    </div>
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="2" v-model="activekey" @change="handleCallback">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_gerenxinxi" />个人信息
                        </span>
                        <div class="basic-info">
                            <div class="input-info">
                                <label-item class="item" title="业主姓名">
                                    <span v-show="!isEdit">{{contractSigner.name | noInfo}}</span>
                                    <a-input v-show="isEdit" v-model="contractSigner.name" />
                                </label-item>
                                <label-item class="item" title="业主电话">
                                    <span v-show="!isEdit&&viewOwnerPhoneFlag">{{contractSigner.phone| noInfo}}</span>
                                  <span v-show="!isEdit&&!viewOwnerPhoneFlag">{{contractSigner.phone|formatPhone}}</span>
                                    <a-input v-show="isEdit" v-model="contractSigner.phone" :maxlength="11" @keyup.native="mixin_integerFilter('contractSigner.phone')" @blur="checkPhone(contractSigner.phone)" />
                                </label-item>
                                <label-item class="item" title="性别">
                                    <span v-show="!isEdit">{{contractSigner.gender == 1 ?'男':'女'}}</span>
                                    <a-radio-group v-show="isEdit" v-model="contractSigner.gender">
                                        <a-radio :value="1">男</a-radio>
                                        <a-radio :value="2">女</a-radio>
                                    </a-radio-group>
                                </label-item>
                                <label-item class="item" title="身份信息">
                                    <span v-show="!isEdit">{{contractSigner.certificateType | certificate}}-{{contractSigner.certificateNo| noInfo}}</span>
                                    <a-input-group compact v-show="isEdit">
                                        <a-select v-model="contractSigner.certificateType" style="width: 40%;" >
                                            <a-select-option :value="1">身份证</a-select-option>
                                            <a-select-option :value="2">护照</a-select-option>
                                            <a-select-option :value="3">港澳通行证</a-select-option>
                                            <a-select-option :value="4">台湾同胞证</a-select-option>
                                            <a-select-option :value="5">企业营业执照</a-select-option>
                                            <a-select-option :value="6">其他</a-select-option>
                                        </a-select>
                                        <a-input style=" width: 60%;border-left: none;" v-model="contractSigner.certificateNo" placeholder="请输入" :maxlength="20" @blur="checkIdentityCard(contractSigner.certificateNo,contractSigner.certificateType)" />
                                    </a-input-group>
                                </label-item>
                                <label-item class="item" title="收款人姓名">
                                  <span v-show="!isEdit">{{contractSigner.payeeName?contractSigner.payeeName:'-'}}</span>
                                  <a-input v-show="isEdit" :maxlength="20" v-model="contractSigner.payeeName" placeholder="请输入" />
                                </label-item>
                                <label-item style="width: 71%;margin-right: 0px" class="item" title="收付款账号信息">
                                  <span v-show="!isEdit">{{contractSigner.paymentTypeName}}{{contractSigner.paymentNo?'-'+contractSigner.paymentNo:''}}{{contractSigner.bank?'-'+contractSigner.bank:''}}{{!contractSigner.paymentTypeName&&!contractSigner.paymentNo&&!contractSigner.bank?'-':''}}</span>
                                  <a-input-group compact v-show="isEdit">
                                    <a-select v-model="contractSignerPaymentType" style="width: 20%;" @change="selectPaymentType" placeholder="请选择类型">
                                      <a-select-option :value="1">银联</a-select-option>
                                      <a-select-option :value="2">支付宝</a-select-option>
                                      <a-select-option :value="3">微信</a-select-option>
                                    </a-select>
                                    <a-input style=" width: 53%;border-left: none;" :style="contractSignerPaymentType==1?'width: 53%;':'width: 80%;'" v-model="contractSigner.paymentNo" placeholder="请输入" />
                                    <a-input style="width: 27%" v-if="contractSigner.paymentType == 1" v-model="contractSigner.bank" :maxlength="10" placeholder="所属银行" />
                                  </a-input-group>
                                </label-item>
                                <label-item class="item" title="紧急联系人姓名">
                                    <span v-show="!isEdit">{{contractSigner.emergencyType |emergency}}-{{contractSigner.emergencyName? contractSigner.emergencyName : '-'}}</span>
                                    <a-input-group compact v-show="isEdit">
                                        <a-select v-model="contractSigner.emergencyType" style="width: 40%;" >
                                            <a-select-option v-for="(item,index) in relationshipList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                        </a-select>
                                        <a-input style=" width: 60%;border-left: none;" v-model="contractSigner.emergencyName" :maxlength="11" placeholder="请输入" />
                                    </a-input-group>
                                </label-item>
                                <label-item class="item" title="紧急联系人电话">
                                    <span v-show="!isEdit">{{contractSigner.emergencyPhone?contractSigner.emergencyPhone:'-'}}</span>
                                    <a-input v-show="isEdit" :maxlength="11" v-model="contractSigner.emergencyPhone" placeholder="请输入" />
                                </label-item>

                                <label-item class="item" style="width: 100%;margin: 0 0 20px 0;" title="证件信息">
                                    <div v-show="!isEdit" class="showImg f-clearfix">
                                        <div class="f-fl cursor" v-if="imgData.small">
                                            <div @click="handlePreview(imgData)"><img :src="imgData.small" alt=""></div>
                                            <p>身份证正面</p>
                                        </div>
                                        <div class="f-fl cursor" v-if="imgData2.small">
                                            <div @click="handlePreview(imgData2)"><img :src="imgData2.small" alt=""></div>
                                            <p>身份证反面</p>
                                        </div>
                                    </div>

                                    <div class="f-clearfix" style="height: 100%;"  v-show="isEdit" >
                                        <div class="pic f-fl" >
                                            <own-upload  style="padding-right: 15px" :picList="item2_1" :uploadParms="sendData2_1" :maxLength="1" :showTips="false" ref="imgInfo2_1">
                                                <img src="../../../assets/login/idzheng.png" class="choose" />
                                            </own-upload>
                                            <div class="fontStyle">身份证正面<span style="color: red">*</span></div>
                                        </div>
                                        <div class="pic f-fl">
                                            <own-upload style="padding-right: 15px" :picList="item2_2" :uploadParms="sendData2_2" :maxLength="1" :showTips="false" ref="imgInfo2_2">
                                                <img src="../../../assets/login/idfan.png" class="choose" />
                                            </own-upload>
                                            <div class="fontStyle">身份证反面<span style="color: red">*</span></div>
                                        </div>
                                    </div>
                                    <!-- <span v-show="!isEdit" class="houseAlias" v-for="(item,i) in contract.tagList" :key="i">{{item}}</span> -->
                                </label-item>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>{{ownerContractViewDTO.createName}}创建于 {{$moment(ownerContractViewDTO.createTime).format('lll')}}</span>
                            <span>{{ownerContractViewDTO.updateName}}更新于 {{$moment(ownerContractViewDTO.updateTime).format('lll')}}</span>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_heyue" />合同信息
                        </span>
                        <contract-info v-if="infoFul" :skeletonLoading="skeletonLoading" :ownerContractViewDTOList="ownerContractViewDTOList" :ownerContractViewDTO="ownerContractViewDTO"> </contract-info>
                    </a-tab-pane>
                    <a-tab-pane key="3" v-if="permission.billFlag">
                        <span slot="tab">
                            <icon-font  type="iconyumengtubiao_caiwuzhangdan" />账单信息
                        </span>
                        <bill-information v-if="billFun" :ownerContract="ownerContract" @openDetail="openDetailBill"></bill-information>
                    </a-tab-pane>
                    <a-tab-pane key="4" v-if="auditInstanceId&&auditInstanceId!=''">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_yuyue" />审批记录
                        </span>
                        <biz-workflow-detail :nodeList="nodeList"></biz-workflow-detail>
                    </a-tab-pane>
                    <div v-show="!isEdit&&!skeletonLoading" slot="tabBarExtraContent">
                        <div v-show="activekey == 1" class="tabs-options">
                            <div @click="editData" v-if="ownerContractViewDTO.status!=1&&(ownerContractViewDTO.auditStatus!=1||(ownerContractViewDTO.auditStatus==1&&copyContract.auditingAllowModify==1))" v-mark="['mk_contract_owner_xggrxx']">
                                <icon-font type="iconyumengtubiao_bianji-" />
                                <span>&nbsp;编辑</span>
                            </div>
                        </div>
                        <div v-show="activekey == 2">
                            <div v-if="(ownerContractViewDTO.houseId!=''||ownerContractViewDTO.houseId!=null)&&(((ownerContractViewDTO.status !=8)||(ownerContractViewDTO.status ==8 && nowTime>ownerContractViewDTO.endTime))||(ownerContractViewDTO.status ==5 && nowTime>ownerContractViewDTO.endTime))" :class="innerMarkList.indexOf('5')>-1?'fourPopover':'twoPopover'" class="tabs-options">
                                <div v-if="outterMarkList.indexOf('4')>-1" @click="addContract">
                                    <icon-font type="iconyumengtubiao_xuzu" />
                                    <span>&nbsp;续签</span>
                                </div>
                                <div v-if="outterMarkList.indexOf('3')>-1" @click="cancelOwnerFun">
                                    <icon-font type="iconyumengtubiao_fanhui" />
                                    <span>&nbsp;退租</span>
                                </div>
                                <div v-if="outterMarkList.indexOf('6')>-1" @click="resetFun">
                                    <icon-font type="iconyumengtubiao_zhongzhi" />
                                    <span>&nbsp;重置</span>
                                </div>
                                <div v-if="outterMarkList.indexOf('7')>-1" @click="toVoidFun">
                                    <icon-font type="iconyumengtubiao_shanchu-" />
                                    <span>&nbsp;作废</span>
                                </div>
                                <div v-if="outterMarkList.indexOf('8')>-1" @click="deleteChild">
                                    <icon-font type="iconyumengtubiao_shanchu-" />
                                    <span>&nbsp;删除</span>
                                </div>
                                <div v-if="outterMarkList.indexOf('5')>-1" @click="associated(ownerContractViewDTO,contractSigner)">
                                    <icon-font type="icon-yumengtubiao_guanlian" />
                                    <span>&nbsp;关联房源</span>
                                </div>
                                <a-popover placement="bottomRight" v-if="showMoreOperate">
                                    <div>
                                        <icon-font type="iconyumengtubiao_gengduo-1" />
                                        &nbsp;更多
                                    </div>
                                    <template slot="content">
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('4')>-1" @click="addContract">续签</div>
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('3')>-1" @click="cancelOwnerFun">退租</div>
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('6')>-1" @click="resetFun">重置</div>
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('7')>-1" @click="toVoidFun">作废</div>
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('8')>-1" @click="deleteChild">删除</div>
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('5')>-1" @click="associated(ownerContractViewDTO,contractSigner)">关联房源</div>
                                    </template>
                                </a-popover>
                            </div>
                        </div>
                        <div v-show="activekey == 3" class="tabs-options">
                            <div @click="addBill" v-if="(ownerContractViewDTO.auditStatus==0||ownerContractViewDTO.auditStatus==9)||(ownerContractViewDTO.auditStatus==1&&copyContract.auditingAllowHandleBill==1)||((ownerContractViewDTO.auditStatus==5||ownerContractViewDTO.auditStatus==6)&&copyContract.auditRejectCancelAllowHandleBill==1)" v-mark="['mk_finance_bill_tjzd']">
                                <icon-font type="iconyumengtubiao_caiwuzhangdan" />
                                <span>&nbsp;添加账单</span>
                            </div>
                        </div>
                        <div v-show="activekey==4">
                            <div class="tabs-options" v-if="ownerContractViewDTO.auditStatus==1">
                                <div @click="openUrgeHander" v-if="(ownerContractViewDTO.auditRelationType==1||ownerContractViewDTO.auditRelationType==5)">
                                    <icon-font type="iconyumengtubiao_cuishou"/>
                                    <span>&nbsp;催办</span>
                                </div>
                                <div @click="revoke" v-if="(ownerContractViewDTO.auditRelationType==1||ownerContractViewDTO.auditRelationType==5)">
                                    <icon-font type="iconyumengtubiao_fanhui"/>
                                    <span>&nbsp;撤销</span>
                                </div>
                                <div @click="pass" v-if="(ownerContractViewDTO.auditRelationType==2||ownerContractViewDTO.auditRelationType==5)">
                                    <icon-font type="iconyumengtubiao_jihuo"/>
                                    <span>&nbsp;审批通过</span>
                                </div>
                                <div @click="reject" v-if="(ownerContractViewDTO.auditRelationType==2||ownerContractViewDTO.auditRelationType==5)">
                                    <icon-font type="iconyumengtubiao_fanhui"/>
                                    <span>&nbsp;审批驳回</span>
                                </div>
                            </div>
                            <div class="tabs-options" v-if="(ownerContractViewDTO.auditStatus==5||ownerContractViewDTO.auditStatus==6)&&(ownerContractViewDTO.auditRelationType==1||ownerContractViewDTO.auditRelationType==5)">
                                <div @click="reSubmit()" v-if="ownerContractViewDTO.status!=7&&ownerContractViewDTO.status!=8">
                                    <icon-font type="iconyumengtubiao_zhongzhi" />
                                    <span>&nbsp;重新提交</span>
                                </div>
                                <div @click="cancelOwnerFun" v-if="(ownerContractViewDTO.status==2||ownerContractViewDTO.status==3||ownerContractViewDTO.status==4)" v-mark="['mk_contract_owner_tz']">
                                    <icon-font type="iconyumengtubiao_fanhui" />
                                    <span>&nbsp;退租</span>
                                </div>
                                <div @click="toVoidFun" v-if="ownerContractViewDTO.status!=7&&ownerContractViewDTO.status!=8" v-mark="['mk_contract_owner_zf']">
                                    <icon-font type="iconyumengtubiao_jinyong" />
                                    <span>&nbsp;作废</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="isEdit&&activekey == 1" slot="tabBarExtraContent" class="tabs-options">
                        <span @click="cancelEdit">取消</span>
                        <span @click="save">保存</span>
                    </div>
                </a-tabs>
            </div>
        </div>

        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        <!-- 退租弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="cancelOwnerDialog" class="ownModalBorder titDialog" title="退租">
            <cancel-owner :ownerContractViewDTO="ownerContractViewDTO" :unNormalCancelOwnerFlag="unNormalCancelOwnerFlag" :contractSigner="contractSigner" @saveSuccess="successFun" @closeThis="cancelOwnerDialog=false"></cancel-owner>
        </a-modal>
        <!-- 合同作废 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="合同作废" width="800px" v-model="toVoidDialog" class="ownModalBorder titDialog" @cancel="toVoidDialog=false">
            <to-void :ownerContract="ownerContract" :infoData="contractSigner" @closeThis="toVoidDialog=false" @saveSuccess="successFun"></to-void>
        </a-modal>
        <!-- 添加合同弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="addContractDialog" class="ownModalBorder titDialog" :title="addContractTitle" :confirmLoading="confirmLoading">
            <add-contract :contractResetStatus="contractResetStatus" :ownerContract="ownerContract" @cancelUp="addContractDialog = false" @saveSuccess="addSaveSuccess" @cancelSaveOwnerContract="cancelSaveOwnerContract"></add-contract>
        </a-modal>
        <!-- 添加添加账单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="addBillDialog" class="ownModalBorder titDialog" title="添加账单">
            <add-bill :contractDataOwner="contractData" :contractFulOwner="contractFul" @saveSuccess="addSaveSuccessBill" @closeThis="addBillDialog=false"></add-bill>
        </a-modal>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog" @cancel="cancelBillDetail">
            <bill-detail :billId="billId" @saveSuccess="successFunBill" @refreshinfoFun="refreshinfoFun"></bill-detail>
        </a-modal>
        <!-- 关联房源弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="associatedDialog" class="ownModalBorder titDialog" title="关联房源">
            <associated-detail :infoData="contractData" @saveSuccess="successFun" @closeThis="associatedDialog=false"></associated-detail>
        </a-modal>
        <!--催办 -->
        <a-modal title="" width="433px" v-model='warningDialog' class="myLaunch-box-special-Dialog titDialog" @ok="urgeHander" @cancel="sendMessageFlag=true;warningDialog=false" okText="确定" cancelText="取消" :closable="false">
            <div class="content">
                <a-icon class="contentCircle" type="question-circle"/>
                <span class="contentTitle">确定要给当前审批人发送消息提醒吗？</span>
                <div class="confirm-content">确定后会以消息的形式通知到当前审批人</div>
                <div class="confirm-warning">当前审批人：{{auditEmpNameList.join('、')}}</div>
                <div class="confirm-check"><a-checkbox v-model="sendMessageFlag" @change="onChange">短信通知当前审批人</a-checkbox></div>
            </div>
        </a-modal>
        <!-- 审核 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="examineDialog" class="ownModalBorder titDialog" :title="examineTitle" @cancel="examineDialog=false">
            <examine :auditInstanceId="auditInstanceId" :auditResult="auditResult" @cancelExamine="examineDialog=false" @successExamine="successExamine"></examine>
        </a-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import {  checkCard } from '@/api/contract';
import {  signerEdit,ownerContractDelete} from '@/api/ownerContract';
import { listActionNode,revoke,urgeHander } from '@/api/workflow';
import {
    ownerContractView
} from '@/api/ownerContract.js';
import contractInfo from './contractInfo'
import cancelOwner from './cancelOwner'
import billInformation from './billInformation'
import addContract from './addOwnerContract';
import associatedDetail from './associated';
import toVoid from './toVoid';
import addBill from '@/views/finance/bill/addBill';
import billDetail from '@/views/finance/bill/billDetails';
import Examine from '../../workflow/examine';
import BizWorkflowDetail from '@/views/workflow/bizWorkflowDetail';
export default {
    name: "contractDetails",
    props: {
        ownerContract: {
            type: String
        },
        auditInstanceId: {
            type: String
        },
        workflowTab:{
            type: Boolean,
            default:false,
        }
    },
    components: {
        contractInfo,
        cancelOwner,
        billInformation,
        addContract,
        toVoid,
        addBill,
        billDetail,
        associatedDetail,
        Examine,
        BizWorkflowDetail,

    },
    data() {
        let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
        return {
            currentTime:currentTime,
            cancelOwnerDialog: false,
            previewVisible: false,
            previewImage: '',
            activekey: '2',
            contract: {},
            copyContract: {},
            isEdit: false,
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
            ownerContractViewDTO: {},//租客合同view展示DTO
            ownerContractViewDTOList: [],//租客合同历史展示
            contractSigner: {},//合同租户信息查看表DTO
            contractBillViewDTO: {},//租客合同账单信息查看DTO
            contractBillViewDTOList: [], //历史账单信息
            relationshipList: [
                {
                    label: '父母',
                    value: '1'
                },
                {
                    label: '兄弟姐妹',
                    value: '2'
                },
                {
                    label: '同事',
                    value: '3'
                },
                {
                    label: '同学',
                    value: '4'
                },
                {
                    label: '朋友',
                    value: '5'
                },
                {
                    label: '亲属',
                    value: '6'
                },
                {
                    label: '配偶',
                    value: '7'
                },
                {
                    label: '其他',
                    value: '8'
                }
            ],
            fileDTOList: [],
            lookTenantDialog: false,
            toVoidDialog: false,
            confirmLoading: false,
            addContractDialog: false,
            addContractTitle:'添加合同',
            contractResetStatus: false,   //重置合同状态
            imgData: {},
            imgData2: {},
            imgData3: {},
            imgData4: [],
            sendData2_1: {},
            sendData2_2: {},
            sendData2_4: {},
            sendData2_6: {},
            imgId2_1: '',
            imgId2_2: '',
            imgId2_6: '',
            imgList2_4: [],
            item2_1: [],
            item2_2: [],
            item2_6: [],
            item2_4: [],
            infoFul:false,
            addBillDialog:false,
            contractData:{},
            contractFul: true,
            billFun:false,
            billId:'',
            billDetailDialog:false,
            associatedDialog:false,
            skeletonLoading:true,
            showMoreOperate:false,          //是否显示更多按钮
            innerMarkList:[],               //更多里面的mark
            outterMarkList:[],              //更多外面的mark
            contractSignerPaymentType:undefined,
            nodeList:[],
            workflowInfoFlag:false,
            warningDialog:false,
            sendMessageFlag:true,
            auditEmpNameList:[],
            examineDialog:false,
            examineTitle:'审核通过',
            auditResult:1,   //1、审核、2、驳回
            unNormalCancelOwnerFlag:false,
          viewOwnerPhoneFlag:false,
          billDetailRefresh:false,
          permission:{
            billFlag:false,
          },
        }
    },
    created() {
      this.initViewOwner();
        this.initData();
    },
    mounted() {
        this.sendData2_1 = { //
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 2, // 图片大类标识 租客
            subBizType: 1, // 图片子类标识 身份证正面
            orderIndex: 1 // 排序值
        }
        this.sendData2_2 = {
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 2, // 图片大类标识  租客
            subBizType: 2, // 图片子类标识 身份证反面
            orderIndex: 2 // 排序值
        }
        this.sendData2_4 = {
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 2, // 图片大类标识  租客
            subBizType: 4, // 图片子类标识 其他证明
            orderIndex: 4 // 排序值
        }
        this.sendData2_6 = {
            // 上传时附带的额外参数
            bizId: '', // 房源id
            bizType: 2, // 图片大类标识  租客
            subBizType: 6, // 图片子类标识 手持半身
            orderIndex: 3 // 排序值
        }
    },
    methods: {
      initViewOwner(){
        let isExit = false;
        let billFlag = false;
        let permissions = JSON.parse(sessionStorage.getItem('permissions'));
        permissions.some(function(value){
          if (value.mark == 'mk_contract_owner_yzdh'){
            isExit = true;
          }
          if(value.mark == "mk_finance_bill_ck"){
            billFlag = true;
          }
        });
        this.permission.billFlag = billFlag;
        this.viewOwnerPhoneFlag = isExit;
      },
        pass(){
            this.examineDialog = true;
            this.auditResult = 1;
            this.examineTitle = '审核通过';
        },
        reject(){
            this.examineDialog = true;
            this.auditResult = 2;
            this.examineTitle = '审核驳回';
        },
        successExamine(){
            this.$emit('refreshinfoFun', true);
            this.examineDialog = false;
            this.initData();
        },
        openUrgeHander(){
            this.warningDialog = true;
        },
        revoke() {
            let _this = this;
            let parameter = {
                auditInstanceId : this.auditInstanceId,
                bizScene:21,
            };
            this.$modal.confirm({
                title: '你确定要撤销申请吗？',
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    revoke(parameter).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            if(res.data.successFlag==1){
                                _this.$message.success('撤销申请成功！');
                                _this.$emit('refreshinfoFun', true);
                                setTimeout(()=> {
                                    _this.initData();
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
        urgeHander(){
            let parameter ={
                auditInstanceId:this.auditInstanceId,
                isSmsNotify:this.sendMessageFlag?1:0,
            };
            this.warningDialog = false;
            urgeHander(parameter).then(res => {
                // console.log(res)
                if (res.code == 200) {
                    this.$message.success('催办成功！');
                    this.warningDialog = false;
                }else{
                    this.$message.error('催办失败！');
                }
            })
        },
        onChange(e){
            this.sendMessageFlag = e.target.checked;
        },
        initData(){
            this.getContract();
            if(this.auditInstanceId){
                this.listActionNode();
            }
        },
        listActionNode() {
            let parameter = {
                auditInstanceId: this.auditInstanceId,
            };
            listActionNode(parameter).then(res => {
                if (res.code === '200') {
                    this.nodeList = res.data;
                    if(this.workflowTab){
                        this.handleCallback('4');
                    }
                }
            })
        },
        selectPaymentType(value){
            this.contractSigner.paymentType = this.contractSignerPaymentType;
            if(value!=1){
                this.contractSigner.bank ="";
            }
        },
        getContract() {
            this.skeletonLoading = true;
            ownerContractView(this.ownerContract).then(res => {
                if (res.code === '200') {
                    let contract = res.data;
                    this.copyContract = Object.assign({}, contract);
                    this.ownerContractViewDTO = this.copyContract.ownerContractViewDTO;
                    this.auditEmpNameList  = this.ownerContractViewDTO.auditEmpNameList;
                    this.ownerContractViewDTOList = this.copyContract.ownerContractViewDTOList;
                    this.contractSigner = this.copyContract.contractSigner;
                    // this.contractBillViewDTO = this.copyContract.contractBillViewDTO; //
                    let arry = this.copyContract.contractBillViewDTOList == null ? [] : this.copyContract.contractBillViewDTOList;
                    this.contractBillViewDTOList = [...arry];
                    this.contractBillViewDTO = Object.assign({}, this.copyContract.contractBillViewDTO);
                    this.fileDTOList = this.contractSigner.fileDTOList;
                    this.getPermission();
                    this.imgFun(this.fileDTOList);
                    if(this.contractSigner.paymentType == null){
                        this.contractSigner.paymentType = undefined;
                        this.contractSignerPaymentType = undefined;
                    }else{
                        this.contractSignerPaymentType =this.contractSigner.paymentType;
                    }
                    this.infoFul =true;
                    this.billFun = true;
                }
                this.skeletonLoading = false;
            })
        },
        getPermission(){
            // 3 退租
            // 4 续签
            // 5 关联房源
            // 6 重置
            // 7 作废
            // 8 删除
            // 9 重新提交
            // 10 催办
            // 11 撤销
            // 12 审批
            let permissions = JSON.parse(sessionStorage.getItem('permissions'));
            let markArr = []
            let btnArr = [];
            if(this.ownerContractViewDTO.auditStatus == 0||this.ownerContractViewDTO.auditStatus == 9){
                //关联房源、邀请确认不受流程影响
                if(this.ownerContractViewDTO.houseId == '' || this.ownerContractViewDTO.houseId == null){
                    markArr.push('mk_contract_owner_glfy');
                }
                if (this.ownerContractViewDTO.status==1){
                    markArr.push('mk_contract_owner_xq','mk_contract_owner_tz');
                    if(this.ownerContractViewDTO.auditStatus == 0){
                        markArr.push('mk_contract_owner_zf');
                    }else if(this.ownerContractViewDTO.auditStatus == 9 && this.copyContract.auditingAllowObsolete==1){
                        markArr.push('mk_contract_owner_zf');
                    }
                } else if(this.ownerContractViewDTO.status==8&&this.nowTime>this.ownerContractViewDTO.endTime){
                    markArr.push('mk_contract_owner_tz');
                } else if(this.ownerContractViewDTO.status==2||this.ownerContractViewDTO.status==3||this.ownerContractViewDTO.status==4){
                    markArr.push('mk_contract_owner_xq','mk_contract_owner_tz');
                    if(this.ownerContractViewDTO.auditStatus == 0){
                        markArr.push('mk_contract_owner_zf');
                    }else if(this.ownerContractViewDTO.auditStatus == 9 && this.copyContract.auditingAllowObsolete==1){
                        markArr.push('mk_contract_owner_zf');
                    }
                    if(this.ownerContractViewDTO.auditStatus==0){
                        markArr.push('mk_contract_owner_cz');
                    }
                }else if(this.ownerContractViewDTO.status==7){
                    markArr.push('mk_contract_owner_sc');
                }
            }
            else if(this.ownerContractViewDTO.auditStatus==1){
                //审批中的合同是否允许退租
                if(this.copyContract.auditingAllowBreak == 1&&this.ownerContractViewDTO.status!=5&&this.ownerContractViewDTO.status!=6&&this.ownerContractViewDTO.status!=7&&this.ownerContractViewDTO.status!=8){
                    markArr.push('mk_contract_owner_tz');
                }
            }else if(this.ownerContractViewDTO.auditStatus==5||this.ownerContractViewDTO.auditStatus==6){
                if(this.ownerContractViewDTO.houseId == '' || this.ownerContractViewDTO.houseId == null){
                    markArr.push('mk_contract_owner_glfy');
                }
                //审批驳回、撤销只有发起人有操作权限
                if(this.ownerContractViewDTO.auditRelationType==1||this.ownerContractViewDTO.auditRelationType==5){
                    if(this.ownerContractViewDTO.status!=5&&this.ownerContractViewDTO.status!=6&&this.ownerContractViewDTO.status!=7&&this.ownerContractViewDTO.status!=8){
                        markArr.push('mk_contract_owner_tz');
                    }
                    if(this.ownerContractViewDTO.status==7){
                        markArr.push('mk_contract_owner_sc');
                    }
                    if(this.ownerContractViewDTO.status!=7&&this.ownerContractViewDTO.status!=8){
                        markArr.push('mk_contract_owner_zf');
                    }
                }
            }
            //判断资源权限
            markArr.forEach(ele => {
                permissions.some(function(value){
                    if (ele == value.mark){
                        if(value.mark == 'mk_contract_owner_tz'){
                            btnArr.push('3');
                        }else if(value.mark == 'mk_contract_owner_xq'){
                            btnArr.push('4');
                        }else if(value.mark == 'mk_contract_owner_glfy'){
                            btnArr.push('5');
                        }else if(value.mark == 'mk_contract_owner_cz'){
                            btnArr.push('6');
                        }else if(value.mark == 'mk_contract_owner_zf'){
                            btnArr.push('7');
                        }else if(value.mark == 'mk_contract_owner_sc'){
                            btnArr.push('8');
                        }
                        return true;
                    }
                });

            });
            this.outterMarkList = [];
            this.innerMarkList = [];
            if(btnArr.length>4){
                this.showMoreOperate = true;
                for (let i = 0; i < btnArr.length; i++) {
                    if(i>2){
                        this.innerMarkList.push(btnArr[i]);
                    }
                    else{
                        this.outterMarkList.push(btnArr[i]);
                    }
                }
            }
            else{
                this.showMoreOperate = false;
                this.outterMarkList = btnArr;
                this.innerMarkList = [];
            }
        },
        imgFun(res) {
            if (res != null) {
                let arr = [];
                this.item2_1 = [];
                this.item2_2 = [];
                res.forEach(function(e) {
                    if (e.subBizType == 1 && e.bizType == 2) {
                        e.status='done';
                        this.imgData = e;
                        this.item2_1.push(e)
                    }
                    if (e.subBizType == 2 && e.bizType == 2) {
                        e.status='done';
                        this.imgData2 = e;
                         this.item2_2.push(e)
                    }
                    if (e.subBizType == 6 && e.bizType == 2) {
                        e.status='done';
                        this.imgData3 = e;
                        this.item2_6.push(e)
                    }
                    if(e.subBizType == 4 && e.bizType == 2){
                        e.status='done';
                        arr.push(e)
                        this.item2_4.push(e)
                    }
                }, this);
                this.imgData4 = arr;
            }
        },
        editData() {
            this.isEdit = !this.isEdit

        },
        reSubmit(){
            this.contractResetStatus = true;
            this.addContractDialog = true;
            this.addContractTitle = '重新提交合同';
        },
        resetFun() {
            let that = this;
            let id = this.contractSigner.id
            this.$modal.confirm({
                title: '确定要重置 「' + this.contractSigner.name + '/' + this.contractSigner.phone + '」 的合同信息吗？',
                content: '重置后，原合同信息及收款记录将被清除',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    that.contractResetStatus = true;
                    that.addContractDialog = true;
                    that.addContractTitle = '重置合同';
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        deleteChild() {
            let that = this;
            let id = this.ownerContract;
            this.$modal.confirm({
                title: '确定要删除 「' + this.contractSigner.name + '/' + this.contractSigner.phone + '」 的合同信息吗？',
                content: '删除后将不可恢复',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    ownerContractDelete(id).then(res => {
                        if (res.code == 200) {
                            that.$emit('deleteOk', true);
                        }
                    })
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        addContract() {
            this.addContractDialog = true;
            this.contractResetStatus = false;
            this.addContractTitle = '续签合同';
        },
        cancelOwnerFun() {
            this.cancelOwnerDialog = true;
            if(this.ownerContractViewDTO.auditStatus==1||this.ownerContractViewDTO.auditStatus==5||this.ownerContractViewDTO.auditStatus==6){
                this.unNormalCancelOwnerFlag = true;
            }
            else {
                this.unNormalCancelOwnerFlag = false;
            }
        },
        //作废
        toVoidFun() {
            this.toVoidDialog = true;
        },
        successFunBill(res){
            if(res){
                this.billDetailDialog = false;
                this.billFun = false;
                let _this = this;
                setTimeout(() => {
                    this.billFun = true;
                    this.getContract();
                }, 500);
                this.$emit('refreshinfoFun', true);
            }
        },
        successFun(res) {
            if (res) {
                this.cancelOwnerDialog = false;
                this.toVoidDialog = false;
                this.associatedDialog = false;
                this.billDetailDialog = false;
                setTimeout(() => {
                    this.getContract();
                }, 500)
                this.$emit('refreshinfoFun', true);
            }
        },
        addSaveSuccess(flag,data) {
            this.addContractDialog = false;
            if(data){
                //重置
                this.$emit('initOwnerContract',data);
            }else {
                //续签
                this.getContract();
            }
            this.$emit('refreshinfoFun', true);
        },
        cancelSaveOwnerContract(){
            this.addContractDialog = false;
        },
        save() {
            if (this.$refs.imgInfo2_1.picsList.length != 0) {
                this.imgId2_1 = this.$refs.imgInfo2_1.picsList[0].id;
            }else{
                this.$message.error('请上传身份证正面!');
                return;
            }
            if (this.$refs.imgInfo2_2.picsList.length != 0) {
                this.imgId2_2 = this.$refs.imgInfo2_2.picsList[0].id;
            }else{
                this.$message.error('请上传身份证反面!');
                return;
            }
             let fileIds = [];
            if (this.imgId2_1) {
                fileIds.push(this.imgId2_1);
            }
            if (this.imgId2_2) {
                fileIds.push(this.imgId2_2);
            }

            this.contractSigner.fileIds = fileIds;
            let postDataForm = {
                bank:this.contractSigner.bank,
                name: this.contractSigner.name,
                phone: this.contractSigner.phone,
                gender: this.contractSigner.gender,
                certificateNo: this.contractSigner.certificateNo,
                certificateType: this.contractSigner.certificateType,
                paymentType: this.contractSigner.paymentType,
                paymentNo: this.contractSigner.paymentNo,
                emergencyType:this.contractSigner.emergencyType,
                emergencyName: this.contractSigner.emergencyName,
                emergencyPhone:this.contractSigner.emergencyPhone,
                fileIds: this.contractSigner.fileIds,
                id: this.contractSigner.id,
                payeeName:this.contractSigner.payeeName,
            }
            if (this.checkDate()) {
                this.lastCheckIdentityCard(this.contractSigner.certificateNo, this.contractSigner.certificateType,postDataForm)
                
            }

        },
        cancelEdit() {
            this.isEdit = !this.isEdit;
            this.contract = Object.assign({}, this.copyContract);
        },
        changeStatus(house, room) {
            this.showChangeStatusDialog = true;
            this.changeStatusData = {
                houseAlias: house.houseAlias,
                houseAddress: house.address,
                houseStatus: room.status,
                roomId: room.id,
            }
        },
        handleCallback(val) {
            this.activekey = val;
        },
        handlePreview(file) {
            this.previewImage = file.url || file.origin;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        checkPhone(phone) {
            if (!phone) {
                this.$message.error('请输入手机号');
                return true;
            }
            if (!/^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(phone)) {
                if (this.lastCheck) {
                    this.lastCheck = false;
                    this.$message.error('手机号码输入错误');
                    return true;
                } else {
                    this.$message.error('手机号码输入错误');
                    return true;
                }
            } else {
                this.requiredPhone = false;
                return false;
            }
        },
        lastCheckIdentityCard(certificateNo, certificateType,postDataForm) {
            if (certificateType === 1) {
                if (certificateNo === '') {
                    this.$message.error('请输入证件号');
                    return true;
                } else {
                    checkCard(certificateNo).then(res => {
                        if (res === undefined) {
                            this.$message.error('请输入正确身份证号');
                            return true;
                        } else {
                            if (res.code === '200') {
                                signerEdit(postDataForm).then(res => {
                                    if (res.code == 200) {
                                        this.isEdit = !this.isEdit;
                                        this.getContract()
                                        this.$emit('refreshinfoFun', true);
                                    }
                                })
                            } else {
                                this.$message.error('请输入正确身份证号');
                                return true;
                            }
                        }

                    });
                }
            } else {
                if (certificateNo === '') {

                    this.$message.error('请输入证件号');
                    this.requiredIdentityCard = true;
                    return true;
                } else {
                    signerEdit(postDataForm).then(res => {
                        if (res.code == 200) {
                            this.isEdit = !this.isEdit;
                            this.getContract()
                            this.$emit('refreshinfoFun', true);
                        }
                    })
                }
            }
        },
        checkIdentityCard(certificateNo, certificateType) {
            if (certificateType === 1) {
                if (certificateNo === '') {
                    this.$message.error('请输入证件号');
                    return true;
                } else {
                    checkCard(certificateNo).then(res => {
                        if (res === undefined) {
                            this.$message.error('请输入正确身份证号');
                            return true;
                        } else {
                            if (res.code === '200') {
                                return false;
                            } else {
                                this.$message.error('请输入正确身份证号');
                                return true;
                            }
                        }

                    });
                }
            } else {
                if (certificateNo === '') {

                    this.$message.error('请输入证件号');
                    this.requiredIdentityCard = true;
                    return true;
                } else {
                    this.requiredIdentityCard = false;
                    return false;
                }
            }
        },
        checkDate() {
            this.lastCheck = true;

            if (!this.contractSigner.name) {
                this.$message.error('请输入姓名!');
                return false;
            }
            if (this.checkPhone(this.contractSigner.phone)) {
                // 这个是判断字段传的是否正确  电话号码
                return false;
            }
            // if (this.checkPhone(this.contractSigner.phone)) {
            //     // 这个是判断字段传的是否正确  电话号码
            //     return false;
            // }
            // if (this.checkIdentityCard(this.contractSigner.certificateNo, this.contractSigner.certificateType)) {
            //     // 这个是判断字段传的是否正确   身份证
            //     return false;
            // }
            return true;
        },
        //关联房源
        associated(ownerContractViewDTO,contractSigner) {
            let data = Object.assign({}, ownerContractViewDTO);
            data.name = contractSigner.name;
            data.gender = contractSigner.gender;
            data.phone = contractSigner.phone;
            this.contractData = data;
            this.associatedDialog = true;
        },
        addBill(){
            this.contractData = {
                name:this.contractSigner.name,
                phone:this.contractSigner.phone,
                paymentType:this.contractSigner.paymentType,
                paymentNo:this.contractSigner.paymentNo,
                id:this.ownerContractViewDTO.id,
                houseId:this.ownerContractViewDTO.houseId,
                beginTime:this.ownerContractViewDTO.beginTime,
                endTime:this.ownerContractViewDTO.endTime,
            }
            this.addBillDialog = true;

        },
        refreshinfoFun(res){
            if(res){
              this.$emit('refreshinfoFun', true);
              this.billDetailRefresh = true;
            }
        },
        addSaveSuccessBill(res){
            if (res) {
                this.addBillDialog = false;
                this.billFun = false;
                let _this = this;
                setTimeout(function() {
                    _this.getContract();
                }, 500);
                this.$emit('refreshinfoFun', true);
            }
        },
        openDetailBill(res){
          if(res){
            this.billId = res;
            this.billDetailDialog = true;
          }
        },
        cancelBillDetail(){
            this.billDetailDialog = false;
          if(this.billDetailRefresh) {
            this.billFun = false;
            setTimeout(() => {
              this.billFun = true;
              this.this.billDetailRefresh = false;
            }, 100)
          }
        },
    },
    filters: {
        certificate(val) {
            return val == 1 ? '身份证' : val == 2 ? '护照' : val == 3 ? '港澳通行证' : val == 4 ? '台湾同胞证' : val == 5 ? '企业营业执照' : val == 6 ? '其他' : '-';
        },
        emergency(val) {
            return val == '1' ? '父母' : val == '2' ? '兄弟姐妹' : val == '3' ? '同事' : val == '4' ? '同学' : val == '5' ? '朋友' : val == '6' ? '亲属' : val == '7' ? '配偶' : val == '8' ? '其他' : '-';
        },
        noInfo(val) {
            return val ? val : '-'
        },
      formatPhone:function (value) {
        var str = String(value)
        var len = str.length;
        var prev,next;
        if (len >= 7) {
          prev = str.slice(-len,-8)
          next = str.slice(-4)
          str = prev+"****"+next
        } else if (len < 7 && len >= 6) {
          prev = str.slice(-len,-4)
          next = str.slice(-2)
          str = prev + "**" + next
        }
        if(!value){
          str = '-';
        }
        return str
      },
    },
    watch: {
        ownerContract() {
            this.getContract();
        },
        auditInstanceId(){
            if(this.auditInstanceId){
                this.listActionNode();
            }
        },
    },
}
</script>

<style scoped lang="less">
.contractDetails-owner-box {
    .house-address {
        width: 100%;
        height: 40px;
        background: rgba(233, 241, 255, 1);
        opacity: 0.99;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(119, 119, 119, 1);
        line-height: 40px;
        padding: 0 20px;
    }
    .child-detail {
        height: calc(100vh - 190px);
        overflow: auto;
        .top {
            padding: 20px 20px 0 20px;
            // margin-bottom: 30px;
            .title {
                display: flex;
                align-items: center;
                width: 220px;
                height: 44px;
                border-right: 1px dashed @borderColor;
                .radius-font {
                    width: 44px;
                    height: 44px;
                    line-height: 44px;
                    border-radius: 50%;
                    font-size:28px;
                }
                .status1 {
                    background: rgba(255, 160, 54, 0.1);
                    color: #FFA036;
                }
                .status2 {
                    background: rgba(10, 135, 248, 0.1);
                    color: #0A87F8;
                }
                .status3 {
                    background: rgba(3, 198, 131, 0.1);
                    color: #03C683;
                }
                .status4 {
                    background: rgba(159, 110, 236, 0.1);
                    color: #9F6EEC;
                }
                .status5 {
                    background: rgba(251, 66, 70, 0.1);
                    color: #FB4246;
                }
                .status6 {
                    background: rgba(119, 119, 119, 0.1);
                    color: #777777;
                }
                .status8{
                    background: rgba(3,198,131,0.1);
                    color: #03C683;
                }
                .color-status1 {
                    color: #FFA036;
                }
                .color-status2 {
                    color: #0A87F8;
                }
                .color-status3,
                .color-status4 {
                    color: #777777;
                }
                .color-status1 {
                    color: #FFA036;
                }
                .color-status2 {
                    color: #0A87F8;
                }
                .color-status3,
                .color-status4 {
                    color: #777777;
                }
                .color-status8 {
                    color: #03C683;
                }
                .label-item {
                    width: 80px;
                }
                .edit-status-icon {
                    vertical-align: middle;
                    margin-left: 8px;
                    color: @themeColor;
                }
                p{
                    font-size:12px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                >div{
                    div{
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(17,17,17,1);
                    }  
                }
            }

            .detail {
                display: flex;
                flex-wrap: wrap;
                .item {
                    display: flex;
                    align-items: center;
                    width: 200px;
                    font-size: 12px; // padding-left: 40px;
                    input {
                        width: 180px;
                        padding-right: 10px;
                    }
                    & /deep/ .ant-select {
                        width: 180px;
                    }
                    .radius-font {
                        font-size:18px;
                    }
                    p{
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }
                    >div{
                        div{
                            font-size:12px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(17,17,17,1);
                        }  
                    }
                }
                .blank-box {
                    width: 50px;
                    height: 30px;
                }
            }
            .radius-font-person {
                color: #0A87F8;
                background-color: fade(#0A87F8, 10%);
            }
            .radius-font-greed {
                color: #03C683;
                background-color: fade(#03C683, 10%);
            }
            .radius-font-red {
                color: #F84246;
                background-color: fade(#F84246, 10%);
            }
            .radius-font-yellow {
                color: #FFA036;
                background-color: fade(#FFA036, 10%);
            }
            .radius-font-close {
                color: #777777;
                background-color: fade(#F6F7F8, 100%);
            }
            .aduit-status-name{
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                display:block;
                margin-left: 5px;
                border-radius: 2px;
                margin-top: 1px;
            }
            .muchFontLength{
                padding: 0 5px;
            }
            .normalFontLength{
                width: 82px;
                text-align: center;
            }
        }
        .radius-font {
            display: inline-block;
            margin-right: 10px;
            width: 32px;
            height: 32px;
            line-height: 32px ;
            font-size: 12px;
            color: #FFA036;
            text-align: center;
            background-color: fade(#FFA036, 10%);
            border-radius: 16px;
        }
        .tabs-content {
            margin-top: 30px;
            padding: 0 20px;
            .basic-info {
                // min-height: calc(100vh - 440px);
                .input-info {
                    display: flex;
                    flex-wrap: wrap;
                    .item {
                        margin: 0 39px 20px 0;
                        width: 200px;
                        & /deep/ .title {
                            margin-bottom: 4px;
                        }
                        & /deep/ .ant-select {
                            width: 100%;
                        }
                        .showImg {
                            margin-bottom: 20px;
                            >div {
                                height: 76px;
                                width: 120px;
                                margin-right: 10px;
                                >div{
                                    width: 100%;
                                    height: 100%;
                                    line-height: 76px;
                                    border: 1px solid #eeeeee;
                                    background-color: #f6f7f8;
                                    text-align: center;
                                    border-radius: 6px;
                                    overflow: hidden;
                                    img {
                                        width: auto;
                                        max-width: 120px;
                                        height: auto;
                                        max-height: 76px;
                                        overflow: hidden;
                                    }
                                }
                                p {
                                    color: rgba(119, 119, 119, 1);
                                    font-size: 12px;
                                    text-align: center;
                                    margin-top: 5px;
                                }
                            }
                            >div:last-child{
                                margin-right: 0px;
                            }
                        }
                        .pic{
                            .fontStyle{
                                bottom: 0px;
                                color: #777777;
                                font-size: 12px;
                                text-align: center;
                            }
                        }
                    }
                    .public-config {
                        display: flex;
                        flex-wrap: wrap;
                        label {
                            width: 100px;
                            margin: 10px 0 20px 0;
                            padding: 0;
                        }
                    }
                }
            }
        }
    }
    .bottom {
        padding: 0 0;
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

    .radius-font {
        display: inline-block;
        margin-right: 10px;
        width: 36px;
        height: 24px;
        font-size: 14px;
        color: #FFA036;
        text-align: center;
        background-color: fade(#FFA036, 10%);
        border-radius: 12px;
    }
    .radius-font-person {
        color: #0A87F8;
        background-color: fade(#0A87F8, 10%);
    }
    .tabs-options {
        font-size: 0;
        cursor: pointer;
        margin-right: 0;
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
            margin-right: 0;
            margin-left: 10px;
            border: 1px solid #0a87f8;
            background-color: #0a87f8;
            color: #ffffff;
        }
    }
    .fourPopover{
        & /deep/ .ant-popover {
            position: fixed;
            .ant-popover-inner-content {
                padding: 5px 0;
                width: 100px;
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
    .twoPopover{
        & /deep/ .ant-popover {
            position: fixed;
            .ant-popover-inner-content {
                padding: 5px 0;
                width: 80px;
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
    & /deep/ .ant-tabs-nav .ant-tabs-tab {
         margin-right: 4px;
    }
    & /deep/ .ant-input,
    .ant-select,
    .ant-checkbox-wrapper,
    .ant-select-dropdown {
        font-size: 12px;
        height: 24px;
        color: @mainFontColor;
    }
    /deep/ .ant-input{
        padding: 4px;
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
    .addon-after-position {
        position: absolute;
        top: 4px;
        z-index: 2;
        font-size: 12px;
    }
    .status-tags {
        padding: 4px 15px;
        margin-right: 10px;
        border-color: @borderColor!important;
        color: @mainFontColor!important;
        cursor: pointer;
    }
    .active {
        border-color: @themeColor!important;
        color: @themeColor!important;
    }
    .content-row {
        .together-item {
            margin-bottom: 20px;
            .delete-icon {
                color: red;
                font-size: 14px;
            }
            .together-detail {
                border-left: 1px solid @borderColor;
                border-top: 1px solid @borderColor;
                text-align: center;
                font-size: 12px;
                .together-title {
                    display: flex;
                    background: rgba(247, 248, 251, 1);
                    text-align: left;
                    &>div {
                        padding: 0px 9px;
                        flex: 1;
                        height: 40px;
                        line-height: 40px;
                        border-right: 1px solid @borderColor;
                        border-bottom: 1px solid @borderColor;
                    }
                    .must-fill {
                        color: #FB4246;
                    }
                }
                .together-data {
                    position: relative;
                    display: flex;
                    &>div {
                        flex: 1;
                        height: 100%;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        border-right: 1px solid @borderColor;
                        border-bottom: 1px solid @borderColor;
                        background-color: #ffffff;
                        .popover:hover {
                            height: 39px;
                            line-height: 38px;
                            border: 1px solid @themeColor;
                            cursor: pointer;
                        }
                    }
                    .payPattern {
                        padding: 0 9px;
                    }
                    input {
                        // text-align: center;
                        padding: 0 9px; // height: 24px;
                        height: calc(100% - 2px); // text-align: left;
                    }
                    input:focus {
                        border: 1px solid @themeColor!important;
                    }
                    .select-border {
                        border: 1px solid @themeColor;
                    }
                    .options {
                        i,
                        span {
                            display: inline-block;
                            width: 50%;
                            height: 39px;
                            cursor: pointer;
                        }
                        i {
                            line-height: 39px;
                            font-size: 14px;
                        }
                        span {
                            padding: 3px 4px;
                            line-height: 18px;
                            background-color: #DCEFFF;
                            color: @themeColor;
                        }
                    }
                    .togeAddress {
                        // padding: 0 9px;
                        display: flex; // width: calc(50% - 15px);
                        width: 100%;
                        height: 100%;
                        & /deep/ .ant-select-selection__rendered {
                            // margin-left: 16px;
                            margin-top: 6px;
                        }
                    }
                    .together-span {
                        float: left;
                        margin-left: 10px;
                    }
                }
                .together-foot {
                    height: 40px;
                    line-height: 40px;
                    border-right: 1px solid @borderColor;
                    border-bottom: 1px solid @borderColor;
                    .togetherAdd {
                        width: 100px;
                        margin: 0 auto;
                        text-align: center;
                    }
                }
            }
        }
    }
    & /deep/ .ant-select-selection--multiple {
        //   height: 24px;
        min-height: 24px;
        .ant-select-selection__rendered>ul>li {
            height: 20px;
            margin-top: 1px;
            line-height: 20px;
        }
    }
    & /deep/ .upload .ant-upload{
        height: 76px;
        width: 120px;
        padding: 0;
        .choose{
            height: 76px;
            width: 120px;
        }
    }
    & /deep/ .upload .upload-content{
        height: 76px;
        width: 120px;
        .uploading{
            height: 50px;
            margin-top: 100px;
        }
        .percent-line{
            height: 26px;
            margin-top: 0px;
        }
    }
    & /deep/ .upload .upload-content .uploading{
        height: 50px;
        width: 120px;
        margin-top: 100px;
    }
    & /deep/ .upload .upload-content .percent-line{
        width: 120px;
        height: 26px;
        margin-top: 0px;
    }
    & /deep/ .upload .check-pic{
        height: 76px;
        width: 120px;
        padding-top: 0;
    }
    & /deep/ .file-list{
        height: 76px;
        width: 120px;
        border-radius: 6px;
        line-height: 76px;
        >div:target(.upload-content){
            text-align: center;
        }
        >div:not(.top){
            border: 1px solid #eeeeee;
            background-color: #f6f7f8;
            overflow: hidden;
            text-align: center;
            img {
                width: auto;
                max-width: 120px;
                height: auto;
                max-height: 76px;
                overflow: hidden;
            }
        }
    }
    & /deep/ .ant-tabs-nav .ant-tabs-tab {
        margin: 0 30px 0 0;
        padding: 8px 0;
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
}
/deep/ .content-main .content{
    padding: 0;
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