<template>
    <div class="contractDetails-box">
        <div class="child-detail">
            <div class="house-address">
                <span>房源地址：</span>
                <span v-if="renterContractViewDTO.houseAlias">{{renterContractViewDTO.houseAlias}} /</span> {{renterContractViewDTO.cityName}}{{renterContractViewDTO.areaName}}{{renterContractViewDTO.fullAddress}}
            </div>
            <div class="top f-clearfix">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span style="margin-top: 9px" class="radius-font status" v-if="renterContractViewDTO.status==1&&!skeletonLoading"><icon-font type="iconyumengtubiao_bianji-1" /></span>
                    <span style="margin-top: 9px" class="radius-font status2" v-else-if="renterContractViewDTO.status==2&&!skeletonLoading"><icon-font type="iconyumengtubiao_fangyuan-" /></span>
                    <span style="margin-top: 9px" class="radius-font status3" v-else-if="renterContractViewDTO.status==3&&!skeletonLoading"><icon-font type="icon-yumengtubiao_banru" /></span>
                    <span style="margin-top: 9px" class="radius-font status4" v-else-if="renterContractViewDTO.status==4&&!skeletonLoading"><icon-font type="icon-yumengtubiao_banchu" /></span>
                    <span style="margin-top: 9px" class="radius-font status5" v-else-if="renterContractViewDTO.status==5&&!skeletonLoading"><icon-font type="icon-yumengtubiao_daishiyong" /></span>
                    <span style="margin-top: 9px" class="radius-font status6" v-else-if="renterContractViewDTO.status==6&&!skeletonLoading"><icon-font type="icon-yumengtubiao_tuizu" /></span>
                    <span style="margin-top: 9px" class="radius-font status6" v-else-if="renterContractViewDTO.status==7&&!skeletonLoading"><icon-font type="icon-yumengtubiao_tuizu" /></span>
                    <span style="margin-top: 9px" class="radius-font status6" v-else-if="renterContractViewDTO.status==8&&!skeletonLoading"><icon-font type="icon-yumengtubiao_zuofei" /></span>
                    <span style="margin-top: 9px" class="radius-font status3" v-else-if="renterContractViewDTO.status==9&&!skeletonLoading"><icon-font type="icon-yumengtubiao_xuzu-" /></span>
                    <div>
                        <label-item title="当前状态">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div style="width: 165px;" class="clearfix">
                                <div v-if="renterContractViewDTO.status==1&&!skeletonLoading" class="statusColor4 f-fl">待签字</div>
                                <div v-else-if="renterContractViewDTO.status==2&&!skeletonLoading" class="statusColor2 f-fl">在租中</div>
                                <div v-else-if="renterContractViewDTO.status==3&&!skeletonLoading" class="statusColor3 f-fl">即将搬入</div>
                                <div v-else-if="renterContractViewDTO.status==4&&!skeletonLoading" class="statusColor4 f-fl">即将搬出</div>
                                <div v-else-if="renterContractViewDTO.status==5&&!skeletonLoading" class="statusColor4 f-fl">已到期</div>
                                <div v-else-if="renterContractViewDTO.status==6&&!skeletonLoading" class="statusColor3 f-fl">正常退</div>
                                <div v-else-if="renterContractViewDTO.status==7&&!skeletonLoading" class="statusColor4 f-fl">非正常退</div>
                                <div v-else-if="renterContractViewDTO.status==8&&!skeletonLoading" class="statusColor4 f-fl">已作废</div>
                                <div v-else-if="renterContractViewDTO.status==9&&!skeletonLoading" class="statusColor4 f-fl">已被续约</div>
                                <span class="radius-font-yellow aduit-status-name muchFontLength f-fl" v-if="renterContractViewDTO.auditStatus==1">{{renterContractViewDTO.auditProcess}}</span>
                                <span class="radius-font-person aduit-status-name normalFontLength f-fl" v-else-if="renterContractViewDTO.auditStatus==9">审批通过</span>
                                <span class="radius-font-red aduit-status-name normalFontLength f-fl" v-else-if="renterContractViewDTO.auditStatus==5">审批驳回</span>
                                <span class="radius-font-close aduit-status-name normalFontLength f-fl" v-else-if="renterContractViewDTO.auditStatus==6">已撤销</span>
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
                        <label-item title="租客信息" :skeletonLoading="skeletonLoading">
                            <div v-if="viewRenterPhoneFlag">{{contractSigner.name}} - {{contractSigner.phone}}</div>
                          <div v-else>{{contractSigner.name}} - {{contractSigner.phone|formatPhone}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:150px">
                        <span style="margin-top: 7px" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <label-item title="租金" :skeletonLoading="skeletonLoading">
                            <div>{{renterContractViewDTO.price?renterContractViewDTO.price/100:'-'}} 元/月</div>
                        </label-item>
                    </div>

                    <div class="item" style="width:130px">
                        <span style="margin-top: 7px" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_yinhangka" />
                        </span>
                        <label-item title="付款方式" :skeletonLoading="skeletonLoading">
                            <div>
                              <span v-if="renterContractViewDTO.periodMonth===99">一次性付</span>
                              <span v-else>押 {{renterContractViewDTO.depositMonth===90?'自定义':renterContractViewDTO.depositMonth}} 付 {{renterContractViewDTO.periodMonth}}</span>
                            </div>
                        </label-item>
                    </div>
                    <div class="item" style="width: 235px">
                        <span style="margin-top: 7px;width: 32px;" class="radius-font  radius-font-greed">
                            <icon-font type="icon-yumengtubiao_riqi" />
                        </span>
                        <label-item title="租期" style="width: 193px;" :skeletonLoading="skeletonLoading">
                            <div>{{$moment(renterContractViewDTO.beginTime).format('YYYY.MM.DD')}}-{{$moment(renterContractViewDTO.endTime).format('YYYY.MM.DD')}}({{renterContractViewDTO.signPeriod}})</div>
                        </label-item >
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
                                <label-item class="item" title="租客姓名" :mustFill="isEdit?true:false">
                                    <span v-show="!isEdit">{{contractSigner.name}}</span>
                                    <a-input v-show="isEdit" v-model="contractSigner.name" />
                                </label-item>
                                <label-item class="item" title="租客电话" :mustFill="isEdit?true:false">
                                    <span v-show="!isEdit&&viewRenterPhoneFlag">{{contractSigner.phone}}</span>
                                  <span v-show="!isEdit&&!viewRenterPhoneFlag">{{contractSigner.phone|formatPhone}}</span>
                                    <a-input v-show="isEdit" v-model="contractSigner.phone" :maxlength="11" @keyup.native="mixin_integerFilter('contractSigner.phone')" @blur="checkPhone(contractSigner.phone)" />
                                </label-item>
                                <label-item class="item" title="性别">
                                    <span v-show="!isEdit">{{contractSigner.gender == 1 ?'男':'女'}}</span>
                                    <a-radio-group v-show="isEdit" v-model="contractSigner.gender">
                                        <a-radio :value="1">男</a-radio>
                                        <a-radio :value="2">女</a-radio>
                                    </a-radio-group>
                                </label-item>
                                <label-item class="item" title="身份信息" :mustFill="isEdit?fieldsObj.certificateType.required==1:false">
                                    <span v-show="!isEdit">{{contractSigner.certificateType | certificate}}-{{contractSigner.certificateNo}}</span>
                                    <a-input-group compact v-show="isEdit">
                                        <a-select v-model="contractSigner.certificateType" style="width: 40%;" >
                                            <a-select-option v-for="(item) in certificateTypeList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.value}}</a-select-option>
                                        </a-select>
                                        <a-input style=" width: 60%;border-left: none;" v-model="contractSigner.certificateNo" placeholder="请输入" :maxlength="20" @blur="checkIdentityCard(contractSigner.certificateNo,contractSigner.certificateType)" />
                                    </a-input-group>
                                </label-item>
                                <label-item class="item" title="客户来源" :mustFill="isEdit?fieldsObj.customerResource.required==1:false">
                                    <span v-show="!isEdit">{{contractSigner.customerResourceName ? contractSigner.customerResourceName : '-'}}</span>
                                    <a-select v-show="isEdit" v-model="contractSigner.customerResource" placeholder="请选择" >
                                        <a-select-option v-for="(item) in channelList" :key="item.id" :disabled="item.disabled"  :value="item.id">{{item.name}}</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item" title="职业" :mustFill="isEdit?fieldsObj.profession.required==1:false">
                                    <span v-show="!isEdit">{{contractSigner.professionName ? contractSigner.professionName : '-'}}</span>
                                    <a-select v-show="isEdit" v-model="contractSigner.profession" placeholder="请选择">
                                        <a-select-option v-for="(item) in occupationList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item" title="工作单位" :mustFill="isEdit?fieldsObj.employer.required==1:false">
                                    <span v-show="!isEdit">{{contractSigner.employer ? contractSigner.employer : '-'}}</span>
                                    <a-input v-show="isEdit" v-model="contractSigner.employer"  placeholder="请输入"/>
                                </label-item>
                                <label-item class="item" title="爱好" :mustFill="isEdit?fieldsObj.interest.required==1:false">
                                    <span v-show="!isEdit">{{interestName? interestName : '-'}}</span>
                                    <a-select v-show="isEdit" mode="multiple" v-model="interest" style="width: 100%" @change="interestChange" :maxTagCount="1" placeholder="请选择" :showArrow="true">
                                        <a-select-option v-for="(item,index) in hobbyList" :value="item.id" :key="index">{{item.name}}</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item" title="紧急联系人姓名" :mustFill="isEdit?fieldsObj.emergencyType.required==1:false">
                                    <span v-show="!isEdit">{{contractSigner.emergencyType |emergency}}-{{contractSigner.emergencyName? contractSigner.emergencyName : '-'}}</span>
                                    <a-input-group compact v-show="isEdit">
                                        <a-select v-model="contractSigner.emergencyType" style="width: 40%;" >
                                            <a-select-option v-for="(item,index) in relationshipList" :disabled="item.disabled" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                        </a-select>
                                        <a-input style=" width: 60%;border-left: none; " v-model="contractSigner.emergencyName" :maxlength="11" placeholder="请输入" />
                                    </a-input-group>
                                </label-item>
                                <label-item class="item" title="紧急联系人电话" :mustFill="isEdit?fieldsObj.emergencyType.required==1:false">
                                    <span v-show="!isEdit">{{contractSigner.emergencyPhone?contractSigner.emergencyPhone:'-'}}</span>
                                    <a-input v-show="isEdit" :maxlength="11" v-model="contractSigner.emergencyPhone" placeholder="请输入"/>
                                </label-item>
                                <label-item class="item" style="width: 46%;margin-right: 0px" title="收付款账号信息" :mustFill="isEdit?fieldsObj.paymentType.required==1:false">
                                    <span v-show="!isEdit">{{contractSigner.paymentTypeName}}{{contractSigner.paymentNo?'-'+contractSigner.paymentNo:''}}{{contractSigner.bank?'-'+contractSigner.bank:''}}{{!contractSigner.paymentTypeName&&!contractSigner.paymentNo&&!contractSigner.bank?'-':''}}</span>
                                    <a-input-group compact v-show="isEdit">
                                        <a-select v-model="contractSignerPaymentType" style="width: 20%;" @change="selectPaymentType" placeholder="请选择类型">
                                            <a-select-option v-for="(item) in paymentTypeList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.value}}</a-select-option>
                                        </a-select>
                                        <a-input style=" width: 53%;border-left: none;" v-model="contractSigner.paymentNo" placeholder="请输入" />
                                        <a-input style="width: 27%" v-if="contractSigner.paymentType == 1" v-model="contractSigner.bank" :maxlength="10" placeholder="所属银行" />
                                    </a-input-group>
                                </label-item>
                                <div style="height: 20px;"></div>
                                <label-item class="item" style="width: 100%;" title="身份证信息">
                                    <div v-show="!isEdit" class="showImg f-clearfix">
                                        <div class="f-fl cursor" v-if="imgData.small">
                                            <div @click="handlePreview(imgData)"><img :src="imgData.small" alt=""/></div>
                                            <p>身份证正面</p>
                                        </div>
                                        <div class="f-fl" v-else>
                                            -
                                        </div>
                                        <div class="f-fl cursor" v-if="imgData2.small">
                                            <div @click="handlePreview(imgData2)"><img :src="imgData2.small" alt=""/></div>
                                            <p>身份证反面</p>
                                        </div>
                                        <div class="f-fl" v-else>
                                            -
                                        </div>
                                        <div class="f-fl cursor" v-if="imgData3.small">
                                            <div @click="handlePreview(imgData3)"><img :src="imgData3.small" alt=""/></div>
                                            <p>手持身份证</p>
                                        </div>
                                        <div class="f-fl" v-else>
                                            -
                                        </div>
                                    </div>
                                    <div class="f-clearfix"  v-show="isEdit" >
                                        <div class="f-fl">
                                            <own-upload style="padding-right: 15px" :picList="item2_1" :uploadParms="sendData2_1" :maxLength="1" :showTips="false" ref="imgInfo2_1">
                                                <img src="../../../assets/login/idzheng.png" class="choose" />
                                            </own-upload>
                                            <p style="text-align: center">身份证正面<span style="color: #FB4246" v-if="this.fieldsObj.idzhengPng.required == 1">*</span></p>
                                        </div>
                                        <div class="f-fl">
                                            <own-upload style="padding-right: 15px" :picList="item2_2" :uploadParms="sendData2_2" :maxLength="1" :showTips="false" ref="imgInfo2_2">
                                                <img src="../../../assets/login/idfan.png" class="choose" />
                                            </own-upload>
                                            <p style="text-align: center">身份证反面<span style="color: #FB4246" v-if="this.fieldsObj.idfanPng.required == 1">*</span></p>
                                        </div>
                                        <div class="f-fl">
                                            <own-upload style="padding-right: 15px" :picList="item2_6" :uploadParms="sendData2_6" :maxLength="1" :showTips="false" ref="imgInfo2_6">
                                                <img src="../../../assets/login/shouid.png" class="choose" />
                                            </own-upload>
                                            <p style="text-align: center">手持身份证<span style="color: #FB4246" v-if="this.fieldsObj.shouidPng.required == 1">*</span></p>
                                        </div>
                                    </div>
                                </label-item>
                                <label-item class="item" style="width: 100%;" title="其它证件照" :mustFill="isEdit?fieldsObj.otherPng.required==1:false">
                                    <div v-show="!isEdit" class="showImg f-clearfix" v-if="imgData4&&imgData4.length>0">
                                        <div class="f-fl cursor" v-for="(item,i) in imgData4" :key="i">
                                            <div @click="handlePreview(item)"><img :src="item.small" alt=""/></div>
                                            <p>其它证件照</p>
                                        </div>
                                    </div>
                                    <div v-show="!isEdit" v-if="!imgData4||imgData4.length==0">
                                        -
                                    </div>
                                    <div class="f-clearfix"  v-show="isEdit" >
                                        <div class="f-fl clearfix" style="width:49%;">
                                            <own-upload  :picList="item2_4" :maxLength="3" :uploadParms="sendData2_4" :showTips="false" ref="imgInfo2_4">
                                                <img src="../../../assets/login/other.png" class="choose" />
                                            </own-upload>
                                        </div>
                                    </div>
                                </label-item>
                                <label-item class="u-no-border" style="width: 100%;margin-top:1px;border-top:1px dashed #DDDDDD;padding-top: 10px;" title="同住人信息">
                                    <div class="content-row">
                                        <div class="together-item">
                                            <div class="together-detail">
                                                <div class="together-title">
                                                    <div style="max-width: 222px">同住人姓名<span style="color:#FB4246"  v-if="fieldsObj.togetherName.required == 1">*</span></div>
                                                    <div style="max-width: 222px">电话<span style="color:#FB4246" v-if="fieldsObj.togetherPhone.required == 1">*</span></div>
                                                    <div style="max-width: 277px">性别<span style="color:#FB4246" v-if="fieldsObj.togetherName.required == 1">*</span></div>
                                                    <div style="max-width: 376px">身份信息<span style="color:#FB4246" v-if="fieldsObj.togetherCertificateType.required == 1">*</span></div>
                                                    <div v-show="isEdit" style="max-width: 62px;text-align: center;">操作</div>
                                                </div>
                                                <div class="together-title" style="background-color:#FFFFFF;text-align: center" v-if="!isEdit&&contractSigner.togetherList&&contractSigner.togetherList.length === 0">
                                                    <div >暂无同住人</div>
                                                </div>
                                                <div class="together-data u-no-border" v-for="(item,index) in contractSigner.togetherList" :key="index">
                                                    <div style="max-width: 222px">
                                                        <span class="together-span" v-show="!isEdit">{{item.name}}</span>
                                                        <a-input v-show="isEdit" v-model="item.name" placeholder="请输入" />
                                                    </div>
                                                    <div style="max-width: 222px">
                                                        <span class="together-span" v-show="!isEdit">{{item.phone}}</span>
                                                        <a-input v-show="isEdit" :maxlength="11" v-model="item.phone" placeholder="请输入" />
                                                    </div>
                                                    <div style="max-width: 277px">
                                                        <span class="together-span" v-show="!isEdit">{{item.gender == 1 ?'男':'女'}}</span>
                                                        <a-radio-group v-show="isEdit" class="payPattern f-fl" v-model="item.gender">
                                                            <a-radio :value="1">男</a-radio>
                                                            <a-radio :value="2">女</a-radio>
                                                        </a-radio-group>
                                                    </div>
                                                    <div style="max-width: 376px">
                                                        <div class="u-bottom-border togeAddress">
                                                            <span class="together-span" v-show="!isEdit">{{item.certificationType | certificate}}-{{item.certificateNo}}</span>
                                                            <a-input-group compact v-show="isEdit">
                                                                <a-select v-model="item.certificationType" style="width: 40%;" >
                                                                    <a-select-option v-for="(item) in togetherCertificateTypeList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.value}}</a-select-option>
                                                                </a-select>
                                                                <a-input maxlength="20" style=" width: 60%; border-left: none;text-align: left;" v-model="item.certificateNo" placeholder="请输入" />
                                                            </a-input-group>
                                                        </div>
                                                    </div>
                                                    <div v-show="isEdit" class="options f-clearfix" style="max-width: 62px">
                                                        <icon-font @click="reduceFellow(index)" class="fl delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                                                    </div>
                                                </div>
                                                <div v-show="isEdit" class="together-foot">
                                                    <p @click="addFellow" class="togetherAdd cursor">
                                                        <icon-font style="font-size:16px;color:#0A87F8;vertical-align: middle" type="iconyumengtubiao_tianjiazijian" /> <span style="vertical-align: middle">添加同住人</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label-item>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>{{renterContractViewDTO.createName}}创建于 {{$moment(renterContractViewDTO.createTime).format('lll')}}</span>
                            <span>{{renterContractViewDTO.updateName}}更新于 {{$moment(renterContractViewDTO.updateTime).format('lll')}}</span>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_heyue" />合同信息
                        </span>
                        <contract-info v-if="infoFul" :skeletonLoading="skeletonLoading" :renterContractViewDTOList="renterContractViewDTOList" :renterContractViewDTO="renterContractViewDTO"> </contract-info>
                    </a-tab-pane>
                  <a-tab-pane key="3">
                        <span slot="tab">
                            <icon-font type="iconwuyejiaogedan" />物业交割单
                        </span>
                    <delivery-info v-if="deliveryFun" :tenantContract="tenantContract" :defaultIndex="defaultIndex" :deliveryRequiredFill="deliveryRequiredFill" :houseId="renterContractViewDTO.houseId" :contractStatus="renterContractViewDTO.status" :name="contractSigner.name" :phone="contractSigner.phone"></delivery-info>
                  </a-tab-pane>
                    <a-tab-pane key="4" v-if="permission.billFlag">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_caiwuzhangdan" />账单信息
                        </span>
                        <bill-information v-if="billFun" :tenantContract="tenantContract" @openDetail="openDetailBill"></bill-information>
                    </a-tab-pane>
                    <a-tab-pane key="5" v-if="(auditInstanceId&&auditInstanceId!='')||(auditBreakInstanceId&&auditBreakInstanceId!='')">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_yuyue" />审批记录
                        </span>
                        <div class="aduitStyle">
                          <div class="operateStyle clearfix">
                            <div class="tabStyle f-fl cursor" v-if="auditInstanceId&&auditInstanceId!=''" :class="nodeInex==1?'selectedStyle':'unSelectStyle'" @click="changNodeIndex(1)">签约审批记录</div>
                            <div class="tabStyle f-fl cursor" v-if="auditBreakInstanceId&&auditBreakInstanceId!=''" :class="nodeInex==2?'selectedStyle':'unSelectStyle'" @click="changNodeIndex(2)">退租审批记录</div>
                            <div class="tabs-options f-fr" v-if="renterContractViewDTO.auditStatus==1&&haveNodeIndex==nodeInex" style="height: 30px;line-height: 30px;">
                              <div @click="openUrgeHander" v-if="(renterContractViewDTO.auditRelationType==1||renterContractViewDTO.auditRelationType==5)">
                                <icon-font type="iconyumengtubiao_cuishou"/>
                                <span>&nbsp;催办</span>
                              </div>
                              <div @click="revoke" v-if="(renterContractViewDTO.auditRelationType==1||renterContractViewDTO.auditRelationType==5)">
                                <icon-font type="iconyumengtubiao_fanhui"/>
                                <span>&nbsp;撤销</span>
                              </div>
                              <div @click="pass" v-if="(renterContractViewDTO.auditRelationType==2||renterContractViewDTO.auditRelationType==5)">
                                <icon-font type="iconyumengtubiao_jihuo"/>
                                <span>&nbsp;审批通过</span>
                              </div>
                              <div @click="reject" v-if="(renterContractViewDTO.auditRelationType==2||renterContractViewDTO.auditRelationType==5)">
                                <icon-font type="iconyumengtubiao_fanhui"/>
                                <span>&nbsp;审批驳回</span>
                              </div>
                            </div>
                            <div class="tabs-options f-fr" style="height: 30px;line-height: 30px;" v-if="(renterContractViewDTO.auditStatus==5||renterContractViewDTO.auditStatus==6)&&(renterContractViewDTO.auditRelationType==1||renterContractViewDTO.auditRelationType==5)&&haveNodeIndex==nodeInex">
                              <div @click="reSubmit()" v-if="renterContractViewDTO.status!=8&&renterContractViewDTO.status!=9">
                                <icon-font type="iconyumengtubiao_zhongzhi" />
                                <span>&nbsp;重新提交</span>
                              </div>
                              <div @click="cancelRentFun" v-if="renterContractViewDTO.status!=6&&renterContractViewDTO.status!=7&&renterContractViewDTO.status!=8">
                                <icon-font type="iconyumengtubiao_fanhui" />
                                <span>&nbsp;退租</span>
                              </div>
                              <div @click="toVoidFun" v-if="renterContractViewDTO.status!=8&&renterContractViewDTO.status!=9" v-mark="['mk_contract_tenant_zf']">
                                <icon-font type="iconyumengtubiao_jinyong" />
                                <span>&nbsp;作废</span>
                              </div>
                            </div>
                          </div>
                          <div class="aduitStyleDetail" v-if="nodeInex==1&&auditInstanceId&&auditInstanceId!=''">
                            <biz-workflow-detail :nodeList="nodeList"></biz-workflow-detail>
                          </div>
                          <div class="aduitStyleDetail" v-if="nodeInex==2&&auditBreakInstanceId&&auditBreakInstanceId!=''">
                            <biz-workflow-detail :nodeList="breakNodeList"></biz-workflow-detail>
                          </div>
                        </div>
                    </a-tab-pane>
                    <div v-show="!isEdit&&!skeletonLoading" slot="tabBarExtraContent">
                        <div v-show="activekey == 1" class="tabs-options">
                            <div @click="editData" v-if="renterContractViewDTO.status!=1&&(renterContractViewDTO.auditStatus!=1||(renterContractViewDTO.auditStatus==1&&copyContract.auditingAllowModify==1))" v-mark="['mk_contract_tenant_xggrxx']">
                                <icon-font type="iconyumengtubiao_bianji-" />
                                <span>&nbsp;编辑</span>
                            </div>
                        </div>
                        <div v-show="activekey == 2">
                            <div v-if="(renterContractViewDTO.houseId!=''||renterContractViewDTO.houseId!=null)&&((renterContractViewDTO.status !=9)||(renterContractViewDTO.status ==9 && nowTime>renterContractViewDTO.endTime))" class="tabs-options" :class="innerMarkList.indexOf('5')!=-1?'fourPopover':'twoPopover'">
                                <div v-if="outterMarkList.indexOf('1')!=-1" @click="invitedToSign">
                                    <icon-font type="iconyumengtubiao_bianji-1" />
                                    <span>&nbsp;邀请签字</span>
                                </div>
                                <div @click="invitationToConfirm" v-if="outterMarkList.indexOf('2')!=-1">
                                    <icon-font type="iconyaoqingqueren" />
                                    <span>&nbsp;���请确认</span>
                                </div>
                                <div @click="addContract" v-if="outterMarkList.indexOf('4')!=-1">
                                    <icon-font type="iconyumengtubiao_xuzu" />
                                    <span>&nbsp;续签</span>
                                </div>
                                <div @click="cancelRentFun" v-if="outterMarkList.indexOf('3')!=-1">
                                    <icon-font type="iconyumengtubiao_fanhui" />
                                    <span>&nbsp;退租</span>
                                </div>
                                <div @click="resetFun()" v-if="outterMarkList.indexOf('6')!=-1">
                                    <icon-font type="iconyumengtubiao_zhongzhi" />
                                    <span>&nbsp;重置</span>
                                </div>
                                <div @click="associated(renterContractViewDTO,contractSigner)" v-if="outterMarkList.indexOf('5')!=-1">
                                    <icon-font type="icon-yumengtubiao_guanlian" />
                                    <span>&nbsp;关联房源</span>
                                </div>
                                <div @click="toVoidFun" v-if="outterMarkList.indexOf('7')!=-1">
                                    <icon-font type="iconyumengtubiao_jinyong" />
                                    <span>&nbsp;作废</span>
                                </div>
                                <div @click="deleteChild" v-if="outterMarkList.indexOf('8')!=-1">
                                    <icon-font type="iconyumengtubiao_shanchu-" />
                                    <span>&nbsp;删除</span>
                                </div>
                                <a-popover placement="bottomRight" v-if="showMoreOperate">
                                    <div>
                                        <icon-font type="iconyumengtubiao_gengduo-1" />
                                        &nbsp;更多
                                    </div>
                                    <template slot="content">
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('3')>-1" @click="cancelRentFun">退租</div>
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('6')>-1" @click="resetFun()">重置</div>
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('5')>-1" @click="associated(renterContractViewDTO,contractSigner)">关联房源</div>
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('7')>-1" @click="toVoidFun">作废</div>
                                        <div class="action cursor" style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('8')>-1" @click="deleteChild">删除</div>
                                    </template>
                                </a-popover>
                            </div>
                        </div>
                        <div v-show="activekey == 4" class="tabs-options">
                             <div @click="addBill" v-if="(renterContractViewDTO.auditStatus==0||renterContractViewDTO.auditStatus==9)||(renterContractViewDTO.auditStatus==1&&copyContract.auditingAllowHandleBill==1)||((renterContractViewDTO.auditStatus==5||renterContractViewDTO.auditStatus==6)&&copyContract.auditRejectCancelAllowHandleBill==1)" v-mark="['mk_finance_bill_tjzd']">
                                <icon-font type="iconyumengtubiao_caiwuzhangdan" />
                                <span>&nbsp;添加账单</span>
                            </div>
                        </div>
                        <div v-show="activekey==5">
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
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="cancelRentDialog" class="ownModalBorder titDialog" title="退租">
            <cancel-rent :renterContractViewDTO="renterContractViewDTO" :unNormalCancelRentFlag="unNormalCancelRentFlag" :fromAduit="fromAduit" @saveSuccess="successFunCancelRent" @closeThis="cancelRentDialog=false"></cancel-rent>
        </a-modal>
        <!-- 合同作废 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="合同作废" width="800px" v-model="toVoidDialog" class="ownModalBorder titDialog" @cancel="toVoidDialog=false">
            <to-void :tenantContract="tenantContract" :infoData="contractSigner" @closeThis="toVoidDialog=false" @saveSuccess="successFun"></to-void>
        </a-modal>
        <!-- 添加合同弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="addContractDialog" class="ownModalBorder titDialog" :title="addContractTitle" :confirmLoading="confirmLoading">
            <add-contract :contractResetStatus="contractResetStatus" :tenantContract="tenantContract" @cancelUp="addContractDialog = false" @saveSuccess="addSaveSuccess" @cancelSaveTenantContract="cancelSaveTenantContract"></add-contract>
        </a-modal>
        <!-- 添加添加账单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="addBillDialog" class="ownModalBorder titDialog" title="添加账单">
            <add-bill :contractData="contractData" :contractFul="contractFul" @saveSuccess="addSaveSuccessBill" @closeThis="addBillDialog=false"></add-bill>
        </a-modal>
        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog" @cancel="cancelBillDetail">
            <bill-detail :billId="billId" :billOperaterFlag="billOperaterFlag" @saveSuccess="successFunBill" @refreshinfoFun="refreshinfoFun"></bill-detail>
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
            <examine :auditInstanceId="newAuditInstanceId" :auditResult="auditResult" @cancelExamine="examineDialog=false" @successExamine="successExamine"></examine>
        </a-modal>
      <!-- 关联房源弹框今天提醒 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="cancelRentTodayFlag" class="ownModalBorder titDialog" title="关联房源">
        <cancel-rent-today :cancelRentTodayRecord="cancelRentTodayRecord" :cancelRentFlag="cancelRentFlag" @goToCancelRent="goToCancelRent" @goToVoid="toVoidFun"></cancel-rent-today >
      </a-modal>
    </div>
</template>

<script>
import { tenantContractDetail, listEnableDict, signerEdit, checkCard, deleteRenterContract ,inviteConfirmSend,inviteSign} from '@/api/contract'
import { listActionNode,revoke,urgeHander } from '@/api/workflow';
import contractInfo from './contractInfo'
import cancelRent from './cancelRent'
import billInformation from './billInformation'
import DeliveryInfo from './deliveryInfo';
import addContract from './addTenantContract';
import toVoid from './toVoid';
import addBill from '@/views/finance/bill/addBill';
import billDetail from '@/views/finance/bill/billDetails';
import associatedDetail from './associated';
import Examine from '../../workflow/examine';
import BizWorkflowDetail from '@/views/workflow/bizWorkflowDetail';
import CancelRentToday from './cancelRentToday';
import { moduleFieldConfigGet } from '@/api/decision';
import { CURRENTDEPTID } from '@/store/mutation-types';
export default {
    name: "contractDetails",
    props: {
        tenantContract: {
            type: String
        },
        workflowTab:{
            type: Boolean,
            default:false,
        }
    },
    components: {
        contractInfo,
        cancelRent,
        billInformation,
        addContract,
        toVoid,
        addBill,
        billDetail,
        associatedDetail,
        Examine,
        BizWorkflowDetail,
      DeliveryInfo,
      CancelRentToday,
    },
    data() {
        return {
          auditInstanceId:'',
          auditBizScene:'',
          auditBreakInstanceId:'',
            nowTime: new Date().getTime(),
            cancelRentDialog: false,
            previewVisible: false,
            previewImage: '',
            activekey: '2',
            contract: {},
            copyContract: {},
            isEdit: false,
            houseTagConfig: [],
            housePublicConfig: [],
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
            renterContractViewDTO: {},//租客合同view展示DTO
            renterContractViewDTOList: [],//租客合同历史展示
            contractSigner: {},//合同租户信息查看表DTO
            contractBillViewDTO: {},//租客合同账单信息查看DTO
            contractBillViewDTOList: [], //历史账单信息
            channelList: [],
            certificateTypeList:[
                {
                    value: '身份证',
                    id: 1,
                    disabled: false
                },
                {
                    value: '护照',
                    id: 2,
                    disabled: false
                },
                {
                    value: '港澳通行证',
                    id: 3,
                    disabled: false
                },
                {
                    value: '台湾同胞证',
                    id: 4,
                    disabled: false
                },
                {
                  value: '企业营业执照',
                  id: 5,
                  disabled: false
                },
                {
                  value: '其他',
                  id: 6,
                  disabled: false
                },
            ],
            togetherCertificateTypeList:[
                {
                    value: '身份证',
                    id: 1,
                    disabled: false
                },
                {
                    value: '护照',
                    id: 2,
                    disabled: false
                },
                {
                    value: '港澳通行证',
                    id: 3,
                    disabled: false
                },
                {
                    value: '台湾同胞证',
                    id: 4,
                    disabled: false
                },
                {
                  value: '企业营业执照',
                  id: 5,
                  disabled: false
                },
                {
                  value: '其他',
                  id: 6,
                  disabled: false
                },
            ],
            paymentTypeList:[
                {
                    value: '银联',
                    id: 1,
                    disabled: false
                },
                {
                    value: '支付宝',
                    id: 2,
                    disabled: false
                },
                {
                    value: '微信',
                    id: 3,
                    disabled: false
                },
            ],
            occupationList: [
                {
                    label: '请选择',
                    value: ''
                },
                {
                    label: '制造（生产/工艺/制造）',
                    value: '1',
                    disabled: false
                },
                {
                    label: '房产（房产/建筑）',
                    value: '2',
                    disabled: false
                },
                {
                    label: '金融（金融/银行/投资/保险）',
                    value: '3',
                    disabled: false
                },
                {
                    label: '医疗(医疗/护理/制药)',
                    value: '4',
                    disabled: false
                },
                {
                    label: '文化（文化/广告/传媒）',
                    value: '5',
                    disabled: false
                },
                {
                    label: '法律（律师/法务）',
                    value: '6',
                    disabled: false
                },
                {
                    label: '教育（教育/培训）',
                    value: '7',
                    disabled: false
                },
                {
                    label: '行政（公务员/行政/事业单位）',
                    value: '8',
                    disabled: false
                },
                {
                    label: '个体经营',
                    value: '9',
                    disabled: false
                },
                {
                    label: '贸易',
                    value: '10',
                    disabled: false
                },
                {
                    label: '物流',
                    value: '11',
                    disabled: false
                },
                {
                    label: '模特',
                    value: '12',
                    disabled: false
                },
                {
                    label: '空姐',
                    value: '13',
                    disabled: false
                },
                {
                    label: '学生',
                    value: '14',
                    disabled: false
                },
                {
                    label: '其它',
                    value: '15',
                    disabled: false
                }
            ],
            relationshipList: [
                {
                    label: '父母',
                    value: '1',
                    disabled: false
                },
                {
                    label: '兄弟姐妹',
                    value: '2',
                    disabled: false
                },
                {
                    label: '同事',
                    value: '3',
                    disabled: false
                },
                {
                    label: '同学',
                    value: '4',
                    disabled: false
                },
                {
                    label: '朋友',
                    value: '5',
                    disabled: false
                },
                {
                    label: '亲属',
                    value: '6',
                    disabled: false
                },
                {
                    label: '配偶',
                    value: '7',
                    disabled: false
                },
                {
                    label: '其他',
                    value: '8',
                    disabled: false
                }
            ],
            interest: [],
            interestName: '',
            hobbyList: [],
            togetherList: [],
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
            deliveryFun:false,
            billId:'',
            billDetailDialog:false,
            associatedDialog:false,
            skeletonLoading:true,
            showMoreOperate:false,          //是否显示更多按钮
            innerMarkList:[],               //更多里面的mark
            outterMarkList:[],              //更多外面的mark
            contractSignerPaymentType:undefined,
            nodeList:[],
          breakNodeList:[],
          nodeInex:1,
          haveNodeIndex:1,
          defaultIndex:1,
          newAuditInstanceId:'',
            workflowInfoFlag:false,
            warningDialog:false,
            sendMessageFlag:true,
            auditEmpNameList:[],
            examineDialog:false,
            examineTitle:'审核通过',
            auditResult:1,   //1、审核、2、驳回
            unNormalCancelRentFlag:false,
            fieldsObj:{
                togetherPhone: { required: 0 },
                gender: { default: 1 },
                togetherGender: { default: 1 },
                contractNo: { required: 0 },
                payPattern: { payPattern_01: { default: "15", checked: 1 }, payPattern_02: { checked: 1 }, payPattern_03: { checked: 1 }, required: 1 },
                otherPng: { required: 0 },
                paymentType: { unEditable: 0, required: 0,default: 1 },
                contractMedium: { default: 1, contractMedium_02: { templateIdList: [],templateDefaultList:[],templateNameList:[],templateList:[], checked: 1 }, contractMedium_01: { sendFlag: 0, checked: 1 } },
                idfanPng: { required: 1 },
                interest: { required: 0 },
                fileIds: { required: 0 },
                employer: { required: 0 },
                shouidPng: { required: 0 },
                customerResource: { unEditable: 0, required: 0,default:'' },
                profession: { required: 0 },
                otherExpenses: [],
                certificateNo: { required: 1 },
                togetherName: { required: 0 },
                depositPeriodType: {
                    depositPeriodTypeDiy:0,
                    depositPeriodTypeList_01:[],
                    depositPeriodTypeList_02:[
                        {default: 1, periodType: 3, deposit: 1}
                    ]
                },
                paymentNo: { required: 0 },
                emergencyType: { unEditable: 0, required: 0,default: '1' },
                togetherCertificateType: { unEditable: 0, required: 0,default: 1 },
                idzhengPng: { required: 1 },
                certificateType: { unEditable: 0, required: 1,default:1 }
            },
          viewRenterPhoneFlag:false,
          billDetailRefresh:false,
          deliveryRequiredFill:false,
          permission:{
            billFlag:false,
          },
          fromAduit:false,
          billOperaterFlag:true,      //账单是否允许操作
          cancelRentFlag:false,
          cancelRentTodayFlag:false,
          cancelRentTodayRecord: {},
        }
    },
    created() {
      this.initViewRenter();
        this.initData();
        this.getDict();
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
      changNodeIndex(val){
        if(this.nodeInex == val){
          return ;
        }
        this.nodeInex = val;
        if(this.nodeInex==1){
          this.listActionNode(this.auditInstanceId,11,true);
        }
        else{
          this.listActionNode(this.auditBreakInstanceId,13,true);
        }
      },
      initViewRenter(){
        let isExit = false;
        let billFlag = false;
        let zfFlag = false;
        let permissions = JSON.parse(sessionStorage.getItem('permissions'));
        permissions.some(function(value){
          if (value.mark == 'mk_contract_tenant_zkdh'){
            isExit = true;
          }
          if(value.mark == "mk_finance_bill_ck"){
            billFlag  = true;
          }
          if(value.mark == 'mk_contract_tenant_zf'){
            zfFlag = true;
          }
        });
        this.permission.billFlag = billFlag;
        this.viewRenterPhoneFlag = isExit;
        this.cancelRentFlag = zfFlag;
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
            this.getContract();
        },
        openUrgeHander(){
            this.warningDialog = true;
        },
        revoke() {
            let _this = this;
            let parameter = {
                auditInstanceId : this.newAuditInstanceId,
                bizScene:this.renterContractViewDTO.auditBizScene,
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
                auditInstanceId:this.newAuditInstanceId,
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
        },
        listActionNode(val,auditBizScene,flag) {
            let parameter = {
                auditInstanceId: val,
            };
            listActionNode(parameter).then(res => {
                if (res.code === '200') {
                  if(auditBizScene == 13){
                    this.breakNodeList = res.data;
                  }
                   else{
                    this.nodeList = res.data;
                  }
                   if(!flag){
                     if(this.workflowTab){
                       this.handleCallback('5');
                       if(this.auditBizScene == 13){
                         this.nodeInex = 2;
                       }
                       else{
                         this.nodeInex = 1;
                       }
                     }
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
        getDict() {
            // 客户来源
            listEnableDict('add63a4f45ba444e8ca3c57ec4193a35').then(res => {

                this.channelList = res.data;
                let obj = {
                    id: '',
                    name: '请选择'
                }
                this.channelList.unshift(obj);
            });
            // 爱好
            listEnableDict('aa0d5464605944538c06b01ef8a0a2ff').then(res => {
                this.hobbyList = res.data;
            });
        },
        getContract(val) {
            this.skeletonLoading = true;
            tenantContractDetail(this.tenantContract).then(res => {
                if (res.code === '200') {
                    let contract = res.data;
                    this.copyContract = Object.assign({}, contract);
                    this.renterContractViewDTO = this.copyContract.renterContractViewDTO;
                    this.auditEmpNameList  = this.renterContractViewDTO.auditEmpNameList;
                    this.renterContractViewDTOList = this.copyContract.renterContractViewDTOList;
                    this.contractSigner = this.copyContract.contractSigner;
                    // this.contractBillViewDTO = this.copyContract.contractBillViewDTO; //
                    let arry = this.copyContract.contractBillViewDTOList == null ? [] : this.copyContract.contractBillViewDTOList;
                    this.contractBillViewDTOList = [...arry];
                    this.contractBillViewDTO = Object.assign({}, this.copyContract.contractBillViewDTO);
                    this.togetherList = this.contractSigner.togetherList;
                    this.fileDTOList = this.contractSigner.fileDTOList;
                    this.getPermission();
                    this.imgFun(this.fileDTOList);
                    this.interest = this.contractSigner.interestIdList;
                    let interestArr = []
                    if (this.contractSigner.interestList) {
                        this.contractSigner.interestList.forEach(function(e) {
                            interestArr.push(e.name);
                        }, this);
                        this.interestName = interestArr.join('/');
                    }
                    else{
                        this.contractSigner.interestList = [];
                        this.interest = [];
                    }
                    if(this.contractSigner.paymentType == null){
                        this.contractSigner.paymentType = undefined;
                        this.contractSignerPaymentType = undefined;
                    }else{
                        this.contractSignerPaymentType =this.contractSigner.paymentType;
                    }
                    this.infoFul =true;
                    this.billFun = true;
                    this.deliveryFun = true;
                    this.moduleFieldConfigGet(this.renterContractViewDTO.deptId);
                  this.auditInstanceId = this.renterContractViewDTO.auditInstanceId;
                  this.auditBreakInstanceId = this.renterContractViewDTO.auditBreakInstanceId;
                  this.auditBizScene = this.renterContractViewDTO.auditBizScene;
                  //获取审批记录
                  if(this.auditInstanceId){
                    this.listActionNode(this.auditInstanceId,11);
                    this.nodeInex = 1;
                  }
                  else{
                    this.nodeInex = 2;
                  }
                  if(this.auditBreakInstanceId){

                    this.listActionNode(this.auditBreakInstanceId,13);
                    this.nodeInex = 2;
                  }
                  if(this.auditBizScene){
                    if(this.auditBizScene==13){
                      this.newAuditInstanceId = this.auditBreakInstanceId;
                      this.haveNodeIndex = 2;
                      this.defaultIndex = 2;
                    }
                    else{
                      this.newAuditInstanceId = this.auditInstanceId;
                      this.haveNodeIndex = 1;
                      this.defaultIndex = 1;
                    }
                  }
                  //判断账单是否云讯操作
                  if(!this.renterContractViewDTO.auditStatus||this.renterContractViewDTO.auditStatus==0||this.renterContractViewDTO.auditStatus==9){
                    this.billOperaterFlag = true;
                  }
                  else{
                    this.billOperaterFlag = false;
                  }
                }
                this.skeletonLoading = false;
            })
        },
        //获取初始化配置
        moduleFieldConfigGet(val){
            let paramter ={
                features:'default',
                moduleMark:'contract.renterContract',
            };
            //若存在策略人
            if(val){
                paramter.deptId = val;
            }
            else {
                paramter.deptId = this.$ls.get(CURRENTDEPTID);
            }
            moduleFieldConfigGet(paramter).then(res=>{
                if(res&&res.data&&res.data.fieldsObj){
                    this.fieldsObj = res.data.fieldsObj;
                }
                else{
                    this.fieldsObj = {
                        togetherPhone: { required: 0 },
                        gender: { default: 1 },
                        togetherGender: { default: 1 },
                        contractNo: { required: 0 },
                        payPattern: { payPattern_01: { default: "15", checked: 1 }, payPattern_02: { checked: 1 }, payPattern_03: { checked: 1 }, required: 1 },
                        otherPng: { required: 0 },
                        paymentType: { unEditable: 0, required: 0,default: 1 },
                        contractMedium: { default: 1, contractMedium_02: { templateIdList: [],templateDefaultList:[],templateNameList:[],templateList:[], checked: 1 }, contractMedium_01: { sendFlag: 0, checked: 1 } },
                        idfanPng: { required: 1 },
                        interest: { required: 0 },
                        fileIds: { required: 0 },
                        employer: { required: 0 },
                        shouidPng: { required: 0 },
                        customerResource: { unEditable: 0, required: 0,default:'' },
                        profession: { required: 0 },
                        otherExpenses: [],
                        certificateNo: { required: 1 },
                        togetherName: { required: 0 },
                        depositPeriodType: {
                            depositPeriodTypeDiy:0,
                            depositPeriodTypeList_01:[],
                            depositPeriodTypeList_02:[
                                {default: 1, periodType: 3, deposit: 1}
                            ]
                        },
                        paymentNo: { required: 0 },
                        emergencyType: { unEditable: 0, required: 0 ,default: '1'},
                        togetherCertificateType: { unEditable: 0, required: 0,default: 1 },
                        idzhengPng: { required: 1 },
                        certificateType: { unEditable: 0, required: 1,default: 1 },
                        deliveryConfig:{
                        scenePic:0,        //必须现场拍照 0、可以不；1、必须
                        required:0,      //1、现场；0、可后续
                        goodList:[],
                        goodDefault:0,   //0、默认；1、自定义配置
                        roomList:[
                          {
                            houseType:2,
                            type:1,
                            roomType:1,
                            names:[
                              {comment:'',fileIds:[],valueType:4,value:0,name:'床',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'床头柜',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'床垫',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'衣柜',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'书桌',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'书架',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'椅子',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'空调',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'空调遥控器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'房间门钥匙',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'门禁卡',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'电视',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'电视遥控器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒遥控器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'热水壶',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'穿衣镜',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'窗帘',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'晾衣架',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'台灯',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'垃圾桶',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'接线板',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'鞋柜',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'电视柜',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'沙发',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'茶几',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'智能锁',selected:true,},
                            ],
                            indeterminate:false,
                            selectAll:true,
                          },
                          {
                            houseType:2,
                            type:2,
                            roomType:1,
                            names:[
                              {comment:'',fileIds:[],valueType:4,value:0,name:'空调',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'冰箱',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'洗衣机',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'电视',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'路由器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'热水器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'微波炉油烟机',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'厨宝',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'浴霸',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'灶具',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'沙发',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'茶几',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'餐桌',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'餐椅',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'空调遥控器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'电视遥控器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒遥控器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'钥匙',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'门禁卡',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'智能锁',selected:true,},
                            ],
                            indeterminate:false,
                            selectAll:true,
                          },
                          {
                            houseType:1,
                            type:1,
                            roomType:1,
                            names:[
                              {comment:'',fileIds:[],valueType:4,value:0,name:'床',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'床头柜',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'床垫',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'衣柜',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'书桌',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'书架',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'椅子',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'空调',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'空调遥控器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'房间门钥匙',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'门禁卡',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'电视',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'电视遥控器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'机顶盒遥控器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'热水壶',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'穿衣镜',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'窗帘',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'晾衣架',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'台灯',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'垃圾桶',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'接线板',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'鞋柜',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'电视柜',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'沙发',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'茶几',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'冰箱',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'洗衣机',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'路由器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'热水器',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'微波炉',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'油烟机',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'厨宝',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'浴霸',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'灶具',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'餐桌',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'餐椅',selected:true,},
                              {comment:'',fileIds:[],valueType:4,value:0,name:'智能锁',selected:true,},
                            ],
                            indeterminate:false,
                            selectAll:true,
                          },
                        ],
                      },
                    };
                }
                this.initSelect();
                if(this.fieldsObj.deliveryConfig&&this.fieldsObj.deliveryConfig.required == 1){
                  this.deliveryRequiredFill = true;
                }
                else{
                  this.deliveryRequiredFill = false;
                }
            });
        },
        initSelect(){
            //身份信息
            if(this.fieldsObj.certificateType.unEditable==1&&this.fieldsObj.certificateType.default){
                this.certificateTypeList.forEach((item)=>{
                    if(item.id == this.fieldsObj.certificateType.default){
                        item.disabled = false;
                    }
                    else{
                        item.disabled = true;
                    }
                });
            }
            else{
                this.certificateTypeList.forEach((item)=>{
                    item.disabled = false;
                });
            }
            //客户来源
            if(this.fieldsObj.customerResource.unEditable==1&&this.fieldsObj.customerResource.default){
                this.channelList.forEach((item)=>{
                   if(item.id == this.fieldsObj.customerResource.default ){
                       item.disabled = false;
                   }
                   else{
                       item.disabled = true;
                   }
                });
            }
            else{
                this.channelList.forEach((item)=>{
                    item.disabled = false;
                });
            }
            //与紧急联系人关系
            if(this.fieldsObj.emergencyType.unEditable==1&&this.fieldsObj.emergencyType.default){
                this.relationshipList.forEach((item)=>{
                    if(item.value == this.fieldsObj.emergencyType.default){
                        item.disabled = false;
                    }
                    else{
                        item.disabled = true;
                    }
                });
            }
            else{
                this.relationshipList.forEach((item)=>{
                    item.disabled = false;
                });
            }
            //承租人收付款账号类型
            if(this.fieldsObj.paymentType.unEditable==1&&this.fieldsObj.paymentType.default){
                this.paymentTypeList.forEach((item)=>{
                    if(item.id == this.fieldsObj.paymentType.default){
                        item.disabled = false;
                    }
                    else{
                        item.disabled = true;
                    }
                });
            }
            else{
                this.paymentTypeList.forEach((item)=>{
                    item.disabled = false;
                });
            }
            //同住人身份类型
            if(this.fieldsObj.togetherCertificateType.unEditable==1&&this.fieldsObj.togetherCertificateType.default){
                this.togetherCertificateTypeList.forEach((item)=>{
                    if(item.id == this.fieldsObj.togetherCertificateType.default){
                        item.disabled = false;
                    }
                    else{
                        item.disabled = true;
                    }
                });
            }
            else{
                this.togetherCertificateTypeList.forEach((item)=>{
                    item.disabled = false;
                });
            }
        },
        getPermission(){
            // 1 邀请签字
            // 2 邀请确认
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
            //未开启审批
            let markArr = [];
            let btnArr = [];
            if(this.renterContractViewDTO.auditStatus == 0||this.renterContractViewDTO.auditStatus == 9){
                //关联房源、邀请确认不受流程影响
                if(this.renterContractViewDTO.houseId == '' || this.renterContractViewDTO.houseId == null){
                    markArr.push('mk_contract_tenant_glfy');
                }
                //未开启流程
                if ((this.renterContractViewDTO.isSyncTenant==1||this.renterContractViewDTO.isSyncTenant==0)&&this.renterContractViewDTO.contractMedium ==1&&this.renterContractViewDTO.status!= 6&&this.renterContractViewDTO.status!= 7&&this.renterContractViewDTO.status!= 8&&this.renterContractViewDTO.status!= 9){
                    markArr.push('mk_contract_tenant_yqqr');
                }
                if (this.renterContractViewDTO.status==1){
                    markArr.push('mk_contract_tenant_yqqz','mk_contract_tenant_xq','mk_contract_tenant_tz');
                    if(this.renterContractViewDTO.auditStatus == 0){
                        markArr.push('mk_contract_tenant_zf');
                    }else if(this.renterContractViewDTO.auditStatus == 9 && this.copyContract.auditingAllowObsolete==1){
                        markArr.push('mk_contract_tenant_zf');
                    }
                } else if(this.renterContractViewDTO.status==9&&this.nowTime>this.renterContractViewDTO.endTime){
                    markArr.push('mk_contract_tenant_tz');
                } else if(this.renterContractViewDTO.status==2||this.renterContractViewDTO.status==3||this.renterContractViewDTO.status==4||this.renterContractViewDTO.status==5){
                    markArr.push('mk_contract_tenant_xq','mk_contract_tenant_tz');
                    if(this.renterContractViewDTO.auditStatus == 0){
                        markArr.push('mk_contract_tenant_zf');
                    }else if(this.renterContractViewDTO.auditStatus == 9 && this.copyContract.auditingAllowObsolete==1){
                        markArr.push('mk_contract_tenant_zf');
                    }
                    if(this.renterContractViewDTO.contractMedium ==1&&this.renterContractViewDTO.auditStatus==0){
                        markArr.push('mk_contract_tenant_cz');
                    }
                } else if(this.renterContractViewDTO.status==6||this.renterContractViewDTO.status==7){
                  markArr.push('mk_contract_tenant_zf');
                }
                else if(this.renterContractViewDTO.status==8){
                    markArr.push('mk_contract_tenant_sc');
                }

            }else if(this.renterContractViewDTO.auditStatus==1){

                if(this.renterContractViewDTO.status==1){
                    //邀请签字
                    markArr.push('mk_contract_tenant_yqqz');
                }
                if((this.renterContractViewDTO.isSyncTenant==1||this.renterContractViewDTO.isSyncTenant==0)&&this.renterContractViewDTO.contractMedium==1&&this.renterContractViewDTO.status!= 6&&this.renterContractViewDTO.status!= 7&&this.renterContractViewDTO.status!= 8&&this.renterContractViewDTO.status!= 9){
                    //合约确认
                    markArr.push('mk_contract_tenant_yqqr');
                }
                //审批中的合同是否允许退租
                if(this.copyContract.auditingAllowBreak == 1&&this.renterContractViewDTO.status!=6&&this.renterContractViewDTO.status!=7&&this.renterContractViewDTO.status!=8&&this.renterContractViewDTO.status!=9){
                    markArr.push('mk_contract_tenant_tz');
                }
            }else if(this.renterContractViewDTO.auditStatus==5||this.renterContractViewDTO.auditStatus==6){
                if(this.renterContractViewDTO.houseId == '' || this.renterContractViewDTO.houseId == null){
                    markArr.push('mk_contract_tenant_glfy');
                }
                //审批驳回、撤销只有发起人有操作权限
                if(this.renterContractViewDTO.auditRelationType==1||this.renterContractViewDTO.auditRelationType==5){
                    //若主状态已退租就不能退租
                    if(this.renterContractViewDTO.status!=6&&this.renterContractViewDTO.status!=7&&this.renterContractViewDTO.status!=8&&this.renterContractViewDTO.status!=9){
                        markArr.push('mk_contract_tenant_tz');
                    }
                    //若主状态已作废就不能作废
                    if(this.renterContractViewDTO.status!=8&&this.renterContractViewDTO.status!=9){
                        markArr.push('mk_contract_tenant_zf');
                    }
                    if(this.renterContractViewDTO.status===8){
                        markArr.push('mk_contract_tenant_sc');
                    }
                }
            }
            //判断资源权限
            markArr.forEach(ele => {
                permissions.some(function(value){
                    if (ele == value.mark){
                        if(value.mark == 'mk_contract_tenant_yqqz'){
                            btnArr.push('1');
                        }else if(value.mark == 'mk_contract_tenant_yqqr'){
                            btnArr.push('2');
                        }else if(value.mark == 'mk_contract_tenant_tz'){
                            btnArr.push('3');
                        }else if(value.mark == 'mk_contract_tenant_xq'){
                            btnArr.push('4');
                        }else if(value.mark == 'mk_contract_tenant_glfy'){
                            btnArr.push('5');
                        }else if(value.mark == 'mk_contract_tenant_cz'){
                            btnArr.push('6');
                        }else if(value.mark == 'mk_contract_tenant_zf'){
                            btnArr.push('7');
                        }else if(value.mark == 'mk_contract_tenant_sc'){
                            btnArr.push('8');
                        }
                        return true;
                    }
                });

            });

            //显示更多逻辑
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
                this.imgData = {};
                this.item2_2 = [];
                this.imgData2 = {};
                this.item2_6 = [];
                this.item2_4 = [];
                this.imgData3 = {};
                this.imgData4 = [];
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
        invitedToSign() {
            let that = this;
            let id = this.renterContractViewDTO.id;
            this.$modal.confirm({
                title: '确定要给 「' + this.contractSigner.name + '/' + this.contractSigner.phone + '」 发送邀请签字短信吗？',
                content: '',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    inviteSign(id).then(res => {
                        if (res.code == 200) {
                            that.$message.success('短信发送成功！');
                            setTimeout(() => {
                                that.getContract();
                            }, 500)
                            that.$emit('refreshinfoFun', true);
                        }
                    })
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        invitationToConfirm() {
            let that = this;
            let id = this.renterContractViewDTO.id;
            this.$modal.confirm({
                title: '确定要给 「' + this.contractSigner.name + '/' + this.contractSigner.phone + '」 发送合同确认信息吗？',
                content: '发送短信后，租客可在手机端直接确认合同信息',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    inviteConfirmSend(id).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            that.$message.success('短信发送成功！');
                            setTimeout(() => {
                                that.getContract();
                            }, 500)
                            that.$emit('refreshinfoFun', true);
                        }
                    })
                },
                onCancel() {
                    // console.log('Cancel');
                },
            });
        },
        reSubmit(){
          if(this.nodeInex==1){
            this.contractResetStatus = true;
            this.addContractDialog = true;
            this.addContractTitle = '重新提交合同';
          }
          else if(this.nodeInex==2){
            this.cancelRentDialog = true;
            this.fromAduit = true;
          }
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
            let _this = this;
            let id = this.contractSigner.contractId;
            this.$modal.confirm({
                title: '确定要删除 「' + this.contractSigner.name + '/' + this.contractSigner.phone + '」 的合同信息吗？',
                content: '删除后将不可恢复',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    deleteRenterContract(id).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            _this.$emit('deleteOk', true);
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
        goToCancelRent(){
          this.cancelRentTodayFlag = false;
          this.cancelRentDialog = true;
          this.fromAduit = false;
          //判断是不是审核中的退租
          if(this.renterContractViewDTO.auditStatus==1||this.renterContractViewDTO.auditStatus==5||this.renterContractViewDTO.auditStatus==6){
            this.unNormalCancelRentFlag = true;
          }
          else{
            this.unNormalCancelRentFlag = false;
          }
        },
        cancelRentFun() {
          //检测本份合同是不是今天创建的
          let createTime = this.$moment(this.renterContractViewDTO.createTime).format('YYYY-MM-DD');
          let currentTime = this.$moment(new Date().getTime()).format('YYYY-MM-DD');
          if(createTime==currentTime){
            this.cancelRentTodayFlag = true;
          }
          else{
            this.goToCancelRent();
          }
        },
        //关联房源
        associated(renterContractViewDTO,contractSigner) {
            let data = Object.assign({}, renterContractViewDTO);
            data.name = contractSigner.name;
            data.gender = contractSigner.gender;
            data.phone = contractSigner.phone;
            this.contractData = data;
            this.associatedDialog = true;
        },
        //作废
        toVoidFun() {
            this.cancelRentTodayFlag = false;
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
        refreshinfoFun(res){
            if(res){
                this.$emit('refreshinfoFun', true);
                this.billDetailRefresh = true;
            }
        },
      successFunCancelRent(res){
          //如果是物业交割单时间，刷新这个页面
        this.deliveryFun = false;
        setTimeout(()=>{
          this.deliveryFun = true;
        });
        this.successFun(res,true);
      },
        successFun(res,val) {
            if (res) {
                this.billDetailDialog = false;
                this.cancelRentDialog = false;
                this.toVoidDialog = false;
                this.associatedDialog = false;
                setTimeout(() => {
                    this.getContract(val);
                }, 500)
                this.$emit('refreshinfoFun', true);
            }
        },
        cancelSaveTenantContract(){
            this.addContractDialog = false;
            this.getContract();
        },
        addSaveSuccess(flag,data) {
            this.addContractDialog = false;
            if(data){
                //重置
                this.$emit('initTenantContract',data);
            }else {
                //续签
                this.getContract();
            }
            this.$emit('refreshinfoFun', true);
        },
        save() {
            if (this.$refs.imgInfo2_1.picsList.length != 0) {
                this.imgId2_1 = this.$refs.imgInfo2_1.picsList[0].id;
            }
            else{
                this.imgId2_1 = '';
            }
            if (this.$refs.imgInfo2_2.picsList.length != 0) {
                this.imgId2_2 = this.$refs.imgInfo2_2.picsList[0].id;
            }
            else{
                this.imgId2_2 = '';
            }
            if (this.$refs.imgInfo2_6.picsList.length != 0) {
                this.imgId2_6 = this.$refs.imgInfo2_6.picsList[0].id;
            }
            else{
                this.imgId2_6 = '';
            }
            if (this.$refs.imgInfo2_4.picsList.length != 0) {
                let imgObj2_4 = this.$refs.imgInfo2_4.picsList;
                let list = [];
                if (imgObj2_4.length > 0) {
                    imgObj2_4.forEach(function(e) {
                        list.push(e.id)
                    }, this);
                }
                this.imgList2_4 = list;
            }
            else{
                this.imgList2_4 = [];
            }
            // if (this.$refs.img3_2.picsList.length != 0) {
            //     let imgObj3_2 = this.$refs.img3_2.picsList;
            //     let arrImg = [];
            //     if (imgObj3_2.length > 0) {
            //         imgObj3_2.forEach(function(e) {
            //             arrImg.push(e.id)
            //         }, this);
            //     }
            //     this.imgList3_2 = arrImg;
            // }
             let fileIds = [];
            if (this.imgId2_1) {
                fileIds.push(this.imgId2_1);
            }
            if (this.imgId2_2) {
                fileIds.push(this.imgId2_2);
            }
            if (this.imgId2_6) {
                fileIds.push(this.imgId2_6);
            }
            this.imgList2_4.forEach(function(e) {
                fileIds.push(e);
            }, this);

            this.contractSigner.fileIds = fileIds;
            let postDataForm = {
                certificateNo: this.contractSigner.certificateNo,
                certificateType: this.contractSigner.certificateType,
                customerResource: this.contractSigner.customerResource,
                emergencyType:this.contractSigner.emergencyType,
                emergencyName: this.contractSigner.emergencyName,
                employer: this.contractSigner.employer,
                emergencyPhone:this.contractSigner.emergencyPhone,
                fileIds: this.contractSigner.fileIds,
                gender: this.contractSigner.gender,
                id: this.contractSigner.id,
                interest: this.interest,
                name: this.contractSigner.name,
                paymentNo: this.contractSigner.paymentNo,
                paymentType: this.contractSigner.paymentType,
                bank:this.contractSigner.bank,
                phone: this.contractSigner.phone,
                profession: this.contractSigner.profession,
                togetherList: this.togetherList,
            }
           
            if (this.checkDate()) {
                if(this.fieldsObj.certificateType.required==1){
                    this.lastCheckIdentityCard(this.contractSigner.certificateNo, this.contractSigner.certificateType,postDataForm)
                }
                else{
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
        interestChange(val) {
            this.interest = val;
            // console.log(`selected ${val}`, this.contractSigner.interest);
        },
        addFellow() {
            let certificationType = 1;
            let gender = 1;
            if(this.fieldsObj.togetherCertificateType.default){
                certificationType = this.fieldsObj.togetherCertificateType.default;
            }
            if(this.fieldsObj.togetherGender.default){
                gender = this.fieldsObj.togetherGender.default;
            }
            //检验必填
            let checkEach = true;
            this.togetherList.forEach((e) => {
                if (this.fieldsObj.togetherName.required == 1 && !e.name) {
                    this.$message.warning('请填写同住人姓名');
                    checkEach = false;
                    return;
                }
                if (this.fieldsObj.togetherPhone.required == 1 && !e.phone) {
                    this.$message.warning('请填写同住人电话');
                    checkEach = false;
                    return;
                }
                if (this.fieldsObj.togetherCertificateType.required == 1 && !e.certificateNo) {
                    this.$message.warning('请填写同住人证件号码');
                    checkEach = false;
                    return;
                }
                if (this.fieldsObj.togetherCertificateType.required == 1 && !e.certificationType) {
                    checkEach = false;
                    this.$message.warning('请选择同住人证件类型');
                    return;
                }
            });
            if (checkEach == false) {
                return false;
            }
            this.togetherList.push({
                name: '',
                gender: gender,
                phone: '',
                certificateNo: '',
                certificationType: certificationType
            });
        },
        reduceFellow(index) {
            this.togetherList.splice(index, 1);
        },
        handleCallback(val) {
            this.activekey = val;
            this.isEdit = false;
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
                                        this.getContract();                                       
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
            if (this.fieldsObj.customerResource.required == 1 && !this.contractSigner.customerResource) {
                this.$message.warning('请选择客户来源!');
                return false;
            }
            if (this.fieldsObj.profession.required == 1 && !this.contractSigner.profession) {
                this.$message.warning('请选择职业!');
                return false;
            }
            if (this.fieldsObj.employer.required == 1 && !this.contractSigner.employer) {
                this.$message.warning('请输入工作单位!');
                return false;
            }
            if (this.fieldsObj.interest.required == 1 && this.interest.length == 0) {
                this.$message.warning('请选择爱好!');
                return false;
            }
            if(this.fieldsObj.emergencyType.required == 1&& !this.contractSigner.emergencyType){
                this.$message.warning('请选择紧急联系人与租户关系!');
                return false;
            }
            if(this.fieldsObj.emergencyType.required == 1&& !this.contractSigner.emergencyName){
                this.$message.warning('请输入紧急联系人姓名!');
                return false;
            }
            if(this.fieldsObj.emergencyType.required == 1&&this.checkPhone(this.contractSigner.emergencyPhone)){
                this.$message.warning('请输入紧急联系人正确的手机号码!');
                return false;
            }
            if(this.fieldsObj.paymentType.required == 1&& !this.contractSigner.paymentType){
                this.$message.warning('请选择收付款账号类型!');
                return false;
            }
            if(this.fieldsObj.paymentType.required == 1&& !this.contractSigner.paymentNo){
                this.$message.warning('请输入收付款账号!');
                return false;
            }
            if (this.fieldsObj.idzhengPng.required == 1 && !this.imgId2_1) {
                this.$message.warning('请上传身份证正面!');
                return false;
            }
            if (this.fieldsObj.idfanPng.required == 1 && !this.imgId2_2) {
                this.$message.warning('请上传身份证反面!');
                return false;
            }
            if (this.fieldsObj.shouidPng.required == 1 && !this.imgId2_6) {
                this.$message.warning('请上传手持身份证!');
                return false;
            }
            if (this.fieldsObj.otherPng.required == 1 && this.imgList2_4.length == 0) {
                this.$message.warning('请上传其它证件!');
                return false;
            }
            let checkEach = true;
            this.togetherList.forEach((e) => {
                if (this.fieldsObj.togetherName.required == 1 && !e.name) {
                    this.$message.warning('请填写同住人姓名');
                    checkEach = false;
                    return;
                }
                if (this.fieldsObj.togetherPhone.required == 1 && !e.phone) {
                    this.$message.warning('请填写同住人电话');
                    checkEach = false;
                    return;
                }
                if (this.fieldsObj.togetherCertificateType.required == 1 && !e.certificateNo) {
                    this.$message.warning('请填写同住人证件号码');
                    checkEach = false;
                    return;
                }
                if (this.fieldsObj.togetherCertificateType.required == 1 && !e.certificationType) {
                    checkEach = false;
                    this.$message.warning('请选择同住人证件类型');
                    return;
                }
            });
            if (checkEach == false) {
                return false;
            }
            return true;
        },
        addBill(){
            this.contractData = {
                houseAlias:this.renterContractViewDTO.houseAlias,
                fullAddress:this.renterContractViewDTO.fullAddress,
                housePid:this.renterContractViewDTO.housePid,
                houseId:this.renterContractViewDTO.houseId,
                name:this.contractSigner.name,
                phone:this.contractSigner.phone,
                paymentType:this.contractSigner.paymentType,
                paymentNo:this.contractSigner.paymentNo,
                id:this.renterContractViewDTO.id,
                beginTime:this.renterContractViewDTO.beginTime,
                endTime:this.renterContractViewDTO.endTime,
            }
            this.addBillDialog = true;

        },
        addSaveSuccessBill(res){
            if (res) {
                this.addBillDialog = false;
                let _this = this;
                this.billFun = false;
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
            if(this.billDetailRefresh){
              this.billFun = false;
              setTimeout(() => {
                this.billFun = true;
                this.billDetailRefresh = false;
              }, 100)
            }
        },

    },
    watch: {
        tenantContract() {
            this.getContract();
        },
        auditInstanceId(){
            if(this.auditInstanceId){
                this.listActionNode(this.auditInstanceId,11);
            }
        },
      auditBreakInstanceId(){
        if(this.auditBreakInstanceId){
          this.listActionNode(this.auditBreakInstanceId,this.auditBizScene,13);
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
    }

}
</script>

<style scoped lang="less">
.contractDetails-box {
    height: calc(100vh - 190px);
    overflow: auto;
    .house-address {
        width: 100%;
        height: 40px;
        background: rgba(233, 241, 255, 1);
        opacity: 0.99;
        font-size: 14px;
        font-weight: 400;
        color: rgba(119, 119, 119, 1);
        line-height: 40px;
        padding: 0 20px;
    }
    .child-detail {
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
                // .status2 {
                //     background: rgba(10, 135, 248, 0.1);
                //     color: #0A87F8;
                // }
                // .status1 {
                //     background:rgba(255,160,54,0.1);
                //     color: #FFA036;
                // }
                // .status {
                //     background: rgba(119, 119, 119, 0.1);
                //     color: #777777;
                // }

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
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                >div{
                    div{
                        font-size:14px;
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
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }
                    >div{
                        div{
                            font-size:12px;
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
        .isCertified-box{
            height: 18px;
            font-size:12px;
            font-weight:300;
            color:rgba(255,160,54,1);
            line-height:17px;
            margin-left: 20px;
            margin-top: 10px;
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
            min-height: calc(100vh - 420px);
            padding: 0 20px;
            .basic-info {
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
                            height: 96px;
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
          .aduitStyle{
            margin-bottom: 20px;
            .aduitStyleDetail{
              padding: 10px 15px;
              background: #FFFFFF;
              border-radius: 0px 4px 4px 4px;
              border: 1px solid #F4F4F4;
            }
            .operateStyle{
              .tabStyle{
                width: 120px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border-radius: 10px 10px 0px 0px;
                font-size: 16px;
                margin-right: 3px;
              }
              .selectedStyle{
                color: #0A87F8;
                background: #E6F3FE;
              }
              .unSelectStyle{
                background: #F4F4F4;
                color: #777777;
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
        margin: 0 39px 20px 0;
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
    /deep/ .ant-select-selection--multiple .ant-select-selection__placeholder{
        margin-left: 0px;
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
