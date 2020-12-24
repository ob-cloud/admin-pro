<template>
    <div class="source-detail-box clearfix" @mousedown="closeAddFollowDetail">
        <div class="left-detail f-fl">
            <div class="top f-clearfix">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span class="radius-font status2" style="margin-top: 9px" v-if="sourceDetails.status==1&&!skeletonLoading"><icon-font type="iconyumengtubiao_xuanzhong-" /></span>
                    <span class="radius-font status" style="margin-top: 9px" v-else-if="sourceDetails.status==2&&!skeletonLoading"><icon-font type="icon-yumengtubiao_guanbi-" /></span>
                    <span class="radius-font status" style="margin-top: 9px" v-else-if="sourceDetails.status==3&&!skeletonLoading"><icon-font type="icon-yumengtubiao_guanbi-" /></span>
                    <span class="radius-font status" style="margin-top: 9px" v-else-if="sourceDetails.status==4&&!skeletonLoading"><icon-font type="icon-yumengtubiao_guanbi-" /></span>
                    <div>
                        <label-item title="当前状态">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div v-if="sourceDetails.status==1&&!skeletonLoading">正常</div>
                            <div v-else-if="sourceDetails.status==2&&!skeletonLoading">关闭·我签</div>
                            <div v-else-if="sourceDetails.status==3&&!skeletonLoading">关闭·他签</div>
                            <div v-else-if="sourceDetails.status==4&&!skeletonLoading">关闭·无效</div>
                        </label-item>
                    </div>
                </div>
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:240px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-greed">
                            <icon-font type="iconyumengtubiao_jiaosequanxian" />
                        </span>
                        <label-item title="客户信息" :skeletonLoading="skeletonLoading">
                            <div>{{sourceDetails.name|blankVal}} - {{sourceDetails.phone|blankVal}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:160px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-red">
                            <icon-font type="icon-yumengtubiao_jiaji" />
                        </span>
                        <label-item title="紧急程度" :skeletonLoading="skeletonLoading">
                            <div>{{sourceDetails.urgencyLevelName|blankVal}}</div>
                        </label-item>
                    </div>
                    <div class="blank-box"></div>
                    <div class="item" style="width:240px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-person">
                            <icon-font type="iconyumengtubiao_dingwei" />
                        </span>
                        <label-item title="意向租房位置" :skeletonLoading="skeletonLoading" style="width: 198px;">
                            <div>{{sourceDetails.cityName}} - {{sourceDetails.locationInfo}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:160px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <label-item title="可接受租金范围" :skeletonLoading="skeletonLoading">
                            <div>{{sourceDetails|moneySpecialVal}}</div>
                        </label-item>
                    </div>

                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_jibenxinxi" /> 基本信息
                        </span>
                        <div class="basic-info">
                            <div class="input-info" :style="isEdit?'margin-top:8px':''">
                                <label-item class="item margin1" title="客户姓名" :skeletonLoading="skeletonLoading" :mustFill="isEdit?true:false">
                                    <span v-show="!isEdit">{{sourceDetails.name|blankVal}}</span>
                                    <a-input v-show="isEdit" v-model="sourceDetails.name" />
                                </label-item>
                                <label-item class="item margin1" title="客户电话" :skeletonLoading="skeletonLoading" :mustFill="isEdit?true:false">
                                    <span v-show="!isEdit">{{sourceDetails.phone|blankVal}}</span>
                                    <a-input v-show="isEdit" v-model="sourceDetails.phone" :maxlength="11" @keyup.native="mixin_integerFilter('sourceDetails.phone')" @blur="checkPhone(sourceDetails.phone)" />
                                </label-item>
                                <label-item class="item margin2" title="性别" :skeletonLoading="skeletonLoading">
                                    <span v-show="!isEdit">{{sourceDetails.gender == 1 ?'男':'女'}}</span>
                                    <a-radio-group v-show="isEdit" v-model="sourceDetails.gender">
                                        <a-radio :value="1">男</a-radio>
                                        <a-radio :value="2">女</a-radio>
                                    </a-radio-group>
                                </label-item>
                                <label-item class="item margin1" title="微信/QQ/其他" :skeletonLoading="skeletonLoading" :mustFill="isEdit?renterCheck.socialAccount.required==1:false">
                                    <span v-show="!isEdit">{{sourceDetails.socialAccount|blankVal}}</span>
                                    <a-input v-show="isEdit" placeholder="请输入" v-model="sourceDetails.socialAccount" />
                                </label-item>
                                <label-item class="item margin1" title="客户来源" :skeletonLoading="skeletonLoading" :mustFill="isEdit?renterCheck.sourceChannelId.required==1:false">
                                    <span v-show="!isEdit">{{sourceDetails.sourceChannelName|blankVal}}</span>
                                    <a-select v-show="isEdit" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)" v-model="sourceDetails.sourceChannelId"  placeholder="请选择">
                                        <a-select-option v-for="(item) in sourceChannelList" :disabled="item.disabled" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item margin2" title="意向租房位置" :skeletonLoading="skeletonLoading" :mustFill="isEdit?true:false">
                                    <span v-show="!isEdit">{{sourceDetails.cityName}} - {{sourceDetails.locationInfo}}</span>
                                    <a-input-group  v-show="isEdit" compact  class="address clearfix">
                                        <a-select v-model="sourceDetails.cityId"  @change="selectCity" style="width: 33%;float: left">
                                            <a-select-option :value="cityItem.id" :key="cityItem.id" :disabled="cityItem.disabled" v-for="(cityItem) in cityList">{{ cityItem.name }}</a-select-option>
                                        </a-select>
                                        <a-input style="width: 67%;float: left;border-top-right-radius: 4px;border-bottom-right-radius: 4px;" placeholder="请输入意向位置" v-model="sourceDetails.locationInfo"></a-input>
                                    </a-input-group>
                                </label-item>
                                <label-item class="item margin1" title="紧急程度" :skeletonLoading="skeletonLoading" :mustFill="isEdit?renterCheck.urgencyLevel.required==1:false">
                                    <span v-show="!isEdit" :style="sourceDetails.urgencyLevel==1?'color:#FB4246':''">{{sourceDetails.urgencyLevelName|blankVal}}</span>
                                    <div v-show="isEdit" class=" normalWidth">
                                        <a-select v-model="sourceDetails.urgencyLevel" style="width:100%" placeholder="请选择">
                                            <a-select-option v-for="(item,index) in urgencyLevelList" :disabled="item.disabled" :key="index" :value="item.id">{{item.name}}</a-select-option>
                                        </a-select>
                                    </div>
                                </label-item>
                                <label-item v-show="!isEdit" class="item margin1" title="可接受租金范围" :skeletonLoading="skeletonLoading">
                                    <span >{{sourceDetails|moneySpecialVal}}</span>
                                </label-item>
                                <label-item v-show="isEdit" class="item margin1" title="可接受租金范围" :skeletonLoading="skeletonLoading" :mustFill="isEdit?renterCheck.acceptMoney.required==1:false">
                                    <a-input-group  style="display: inline-block;width: auto;" compact>
                                        <a-input v-model="sourceDetails.minMoney" @input.native="priceReg1" style=" width: 65px;" placeholder="请输入" />
                                        <a-input
                                                style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                                                placeholder="~"
                                                disabled
                                        />
                                        <a-input v-model="sourceDetails.maxMoney" @input.native="priceReg2" style="width: 65px;border-left: 0" placeholder="请输入" />
                                        <a-input
                                                style=" width: 23px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                                                placeholder="元"
                                                disabled
                                        />
                                    </a-input-group>
                                </label-item>
                                <label-item class="item margin2" title="预计入住周期" :skeletonLoading="skeletonLoading" :mustFill="isEdit?renterCheck.leasePeriod.required==1:false">
                                    <span v-show="!isEdit">{{sourceDetails.leasePeriodName|blankVal}}</span>
                                    <a-select v-show="isEdit" v-model="sourceDetails.leasePeriod" placeholder="请选择">
                                        <a-select-option v-for="(item,index) in leasePeriodList" :disabled="item.disabled" :key="index" :value="item.id">{{item.name}}</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item" style="width: 100%" title="需求户型" :skeletonLoading="skeletonLoading" :mustFill="isEdit?renterCheck.demandType.required==1:false">
                                    <span v-show="!isEdit">{{demandTypeListStr.length==0?'-':demandTypeListStr.join('、')}}</span>
                                    <!--v-if="demandTypeListStr.length" :defaultValue="[demandTypeListStr] -->
                                    <a-select v-show="isEdit" mode="multiple" :showArrow="true"  @change="handleChange" v-model="sourceDetails.demandTypeList" placeholder="请选择">
                                        <a-select-option v-for="(item,index) in demandTypeList" :key="index" :value="item.id">{{item.name}}</a-select-option>
                                    </a-select>
                                </label-item>
                                <label-item class="item" title="其他需求" style="width: 100%;" v-show="!isEdit" :skeletonLoading="skeletonLoading">
                                    <span >{{sourceDetails.demandLabelList.length==0?'-':sourceDetails.demandLabelList.join('、')}}</span>

                                </label-item>
                                <label-item title="其他需求（可多选）" style="width: 100%;min-height: 60px;" v-show="isEdit" :skeletonLoading="skeletonLoading" :mustFill="isEdit?renterCheck.otherDemandType.required==1:false">
                                    <div class="clearfix u-no-border" style="width: 100%;">
                                        <div v-for="(item,index) in sourceDetails.demandLabelList" :key="index" class="selectDemandLabelItem f-fl">
                                            {{item}} <icon-font @click="removeDemandLabelList(item)" type="iconyumengtubiao_guanbi-"/>
                                        </div>
                                        <div class="f-fl otherDemandLabelList"><a-input v-model="demandLabel"  placeholder="可输入补充标签，回车添加" @keyup.enter="addDemandLabel" /></div>
                                    </div>
                                </label-item>
                                <div class="demandLabelAll clearfix cursor" v-show="isEdit" :skeletonLoading="skeletonLoading">
                                    <div v-for="(item,index) in demandLabelList" :key="index" class="demandLabelItem f-fl" :class="(sourceDetails.demandLabelList&&sourceDetails.demandLabelList.indexOf(item)>-1)?'clickBg':'normalBg'" @click="addRemoveDemandLabel(item)">
                                        {{item}}
                                    </div>
                                </div>
                                <label-item v-show="!isEdit" class="item" style="width: 100%;margin: 0 0 20px 0;" title="备注信息" :valLength="sourceDetails.comment ? sourceDetails.comment.length : 0" :skeletonLoading="skeletonLoading">
                                    <span>{{sourceDetails.comment ? sourceDetails.comment : '-'}}</span>
                                </label-item>
                                <label-item v-show="isEdit" class="item" style="width: 100%;margin: 15px 0 20px 0;" title="备注信息" :valLength="sourceDetails.comment ? sourceDetails.comment.length : 0" :maxSize="500" :skeletonLoading="skeletonLoading" :mustFill="isEdit?renterCheck.comment.required==1:false">
                                    <a-textarea v-model="sourceDetails.comment" maxlength="500" autosize placeholder="请输入备注信息" />
                                </label-item>
                                <label-item class="item margin1" title="维护人" :skeletonLoading="skeletonLoading">
                                    <span>{{sourceDetails.assigneeName}}</span>
                                </label-item>
                                <div v-if="sourceDetails.status==2||sourceDetails.status==3||sourceDetails.status==4" class="closeDosh"></div>
                                <div v-if="sourceDetails.status==2||sourceDetails.status==3||sourceDetails.status==4" class="closeTitle">关闭详情</div>
                                <label-item v-if="sourceDetails.status==2||sourceDetails.status==3||sourceDetails.status==4" class="item u-bottom-border margin1" title="关闭时间" :skeletonLoading="skeletonLoading">
                                    <span>{{sourceDetails.closingTime?$moment(sourceDetails.closingTime).format('YYYY.MM.DD HH:mm'):''}}</span>
                                </label-item>
                                <label-item style="width: 200px;" v-if="sourceDetails.status==2||sourceDetails.status==3" class="item u-bottom-border margin1" title="签约周期" :skeletonLoading="skeletonLoading">
                                    <span>{{sourceDetails.signedBeginTime?$moment(sourceDetails.signedBeginTime).format('YYYY.MM.DD'):''}} - {{sourceDetails.signedEndTime?$moment(sourceDetails.signedEndTime).format('YYYY.MM.DD'):''}}</span>
                                </label-item>
                                <label-item v-if="sourceDetails.status==2||sourceDetails.status==3||sourceDetails.status==4" class="item u-bottom-border" style="width: 100%;margin: 0 0 20px 0;" title="关闭原因" :skeletonLoading="skeletonLoading">
                                    <span>{{sourceDetails.closingReason|blankVal}}</span>
                                </label-item>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>{{sourceDetails.creater}}创建于 {{$moment(sourceDetails.createTime).format('lll')}}</span>
                            <span>{{sourceDetails.updater}}更新于 {{$moment(sourceDetails.updateTime).format('lll')}}</span>
                        </div>
                    </a-tab-pane>
                    <div v-show="!isEdit&&!skeletonLoading" slot="tabBarExtraContent" class="tabs-options">
                        <div v-if="outterMarkList.indexOf('1')!=-1" @click="editData">
                            <icon-font type="iconyumengtubiao_bianji-" />
                            <span>&nbsp;编辑</span>
                        </div>
                        <div v-if="outterMarkList.indexOf('2')!=-1" @click="changePrivate">
                            <icon-font type="iconyumengtubiao_qiangdan" />
                            <span>&nbsp;抢单</span>
                        </div>
                        <div v-if="outterMarkList.indexOf('3')!=-1" @click="openAssignUser">
                            <icon-font type="iconyumengtubiao_zhipai"/>
                            <span>&nbsp;指派</span>
                        </div>
                      <div v-if="outterMarkList.indexOf('6')!=-1" @click="goReserve">
                        <icon-font type="iconyumengtubiao_yuyue" />
                        <span>&nbsp;预定</span>
                      </div>
                      <div v-if="outterMarkList.indexOf('7')!=-1" @click="goSign">
                        <icon-font type="iconyumengtubiao_heyue" />
                        <span>&nbsp;签约</span>
                      </div>
                        <div v-if="outterMarkList.indexOf('5')!=-1" @click="openCloseSource">
                            <icon-font type="iconyumengtubiao_jinyong" />
                            <span>&nbsp;关闭</span>
                        </div>
                        <div v-if="outterMarkList.indexOf('4')!=-1" @click="changPublic">
                            <icon-font type="iconzhuanrugongke" />
                            <span>&nbsp;转入公客</span>
                        </div>
                      <div v-if="outterMarkList.indexOf('8')!=-1" @click="openShareSource">
                        <icon-font type="icongongxiang" />
                        <span>&nbsp;共享</span>
                      </div>
                      <div v-if="outterMarkList.indexOf('9')!=-1" @click="addSource">
                        <icon-font type="iconyumengtubiao_bianji-" />
                        <span>&nbsp;重新激活</span>
                      </div>
                      <div v-if="outterMarkList.indexOf('10')!=-1" @click="deleteChild">
                        <icon-font type="iconyumengtubiao_shanchu-" />
                        <span>&nbsp;删除</span>
                      </div>

                        <a-popover :title="null" trigger="hover" placement="bottom" v-if="showMoreOperate">
                            <template slot="content">
                              <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('6')!=-1" @click.stop="goReserve(2)" class="action cursor">预定</div>
                              <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('7')!=-1" @click.stop="goSign()" class="action cursor">签约</div>
                              <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('5')!=-1" @click.stop="openCloseSource" class="action cursor">关闭</div>
                              <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('4')!=-1" @click.stop="changPublic" class="action cursor">转入公客</div>
                              <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('8')!=-1" @click.stop="openShareSource()" class="action cursor">共享</div>
                            </template>
                            <div><icon-font type="iconyumengtubiao_gengduo-1" />&nbsp;更多</div>
                        </a-popover>
                    </div>
                    <div v-show="isEdit&&sourceDetails.status==1&&!skeletonLoading" slot="tabBarExtraContent" class="tabs-options" style="height:36px;">
                        <span @click="cancelEdit" style="margin-top:6px;">取消</span>
                        <span @click="save" style="margin-top:6px;">保存</span>
                    </div>
                </a-tabs>
            </div>
        </div>
        <div class="right-detail f-fr">
            <a-tabs size="small" defaultActiveKey="1" @change="handleCallback">
                <a-tab-pane key="1">
                    <span slot="tab">
                        跟进记录
                    </span>
                    <div style="margin-top: 20px;"></div>
                    <div class="skeletonLoadingListStyle" v-show="skeletonLoading">
                        <div class="clearfix">
                            <div class="f-fl">
                                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
                            </div>
                            <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                                <div class="clearfix" style="width: 100%">
                                    <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                                    <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                                </div>
                                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                                </div>
                            </div>
                        </div>
                        <div class="clearfix" style="margin-top: 25px">
                            <div class="f-fl">
                                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
                            </div>
                            <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                                <div class="clearfix" style="width: 100%">
                                    <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                                    <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                                </div>
                                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                                </div>
                            </div>
                        </div>
                        <div class="clearfix" style="margin-top: 25px">
                            <div class="f-fl">
                                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
                            </div>
                            <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                                <div class="clearfix" style="width: 100%">
                                    <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                                    <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                                </div>
                                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                                </div>
                            </div>
                        </div>
                    </div>
                    <a-empty v-show="followUpList&&followUpList.length === 0&&!skeletonLoading" style="margin-top:100px;"/>
                    <div class="content-follow" v-for="(followUp,index) in followUpList" :key="index" v-show="!skeletonLoading" :style="index==0?'margin-top: 10px;':''">
                        <div class="content-follow-type">
                            <span class="content-follow-type1" :style="followUp.followType=='关闭'?'background-color: rgba(119,119,119,0.1);':'background-color: rgba(10, 135, 248, 0.1);'">
                              <span class="content-follow-type2" :style="followUp.followType=='关闭'?'background-color: rgba(119,119,119);':'background-color: rgba(10, 135, 248);'"></span>
                            </span>
                            <div class="content-follow-left-line" v-if="index<followUpList.length-1"></div>
                        </div>
                        <div class="content-follow-right">
                            <div class="follow-right-line-one clearfix">
                                <div class="name f-fl">{{followUp.person}}</div>
                                <div class="followType f-fl">{{followUp.followType}}</div>
                                <div class="date f-fr">{{$moment(followUp.time).format('YYYY.MM.DD HH:mm')}}</div>
                            </div>
                            <div class="follow-right-line-two" style="width: 100%">{{followUp.content}}</div>
                            <div class="follow-right-line-two" v-if="followUp.reserveSeeTime" style="margin-top: 5px;color: #0A87F8;">预约了 {{$moment(followUp.reserveSeeTime).format('YYYY.MM.DD HH:mm')}} 看房</div>
                            <div class="follow-right-line-two" v-if="followUp.followType=='关闭'&&sourceDetails.signedBeginTime&&sourceDetails.signedEndTime" style="margin-top: 5px;color: #0A87F8;">合同周期：{{$moment(sourceDetails.signedBeginTime).format('YYYY.MM.DD')}} - {{$moment(sourceDetails.signedEndTime).format('YYYY.MM.DD')}}</div>
                            <div class="img-list" style="margin-top: 5px;">
                              <div class="f-fl cursor" v-for="(item,i) in followUp.picList" :key="i">
                                <div @click="handlePreview(item,i)">
                                  <img :src="item.small" alt="">
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="2">
                    <span slot="tab">
                        共享记录
                    </span>
                    <div style="margin-top: 20px;"></div>
                    <a-empty v-show="sharedList&&sharedList.length === 0" style="margin-top:100px;"/>
                    <div class="content-follow"  v-for="(shared,index) in sharedList" :key="index" :style="index==0?'margin-top: 10px;':''">
                        <div class="content-follow-left">
                            <span class="radius-font radius-font-close" v-if="shared.status!=1">关闭</span>
                            <span class="radius-font radius-font-follow" style="background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;" v-if="shared.status==1">正常</span>
                            <div class="content-follow-left-line" v-if="index<sharedList.length-1"></div>
                        </div>
                        <div class="content-follow-right">
                            <div class="follow-right-line-one">
                                <div class="follow-right-line-two" style="color: #777777;font-size: 14px;">{{shared.sharedPerson}} 于 {{$moment(shared.sharedTime).format('YYYY.MM.DD HH:mm')}}共享给了</div>
                            </div>
                            <div class="name">{{shared.partnerName}}</div>
                            <div class="follow-info" v-if="shared.statusChangeTime">
                                <div style="width: 100%">{{$moment(shared.statusChangeTime).format('YYYY.MM.DD HH:mm')}} 置为「{{shared.status==1?'正常':shared.status==2?'我签':shared.status==3?'他签':shared.status==4?'无效':'-'}}」</div>
                                <div style="width: 100%" v-if="shared.signedBeginTime">合同周期：{{$moment(shared.signedBeginTime).format('YYYY.MM.DD')}} - {{$moment(shared.signedEndTime).format('YYYY.MM.DD')}}</div>
                            </div>
                        </div>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="add-follow-panel" @click.stop="" @mousedown.stop="">
            <div class="add-follow cursor" v-if="sourceDetails.status==1&&!openAddFollowDetailFlag&&activekey==1" @click="openAddFollowDetail" v-mark="sourceDetails.clueType == 1 ? ['mk_source_tenant_gj'] : ['mk_source_tenant_gk_gj']">
                添加跟进记录
            </div>
            <div class="add-follow cursor" style="border: 1px solid #0A87F8;text-align: center;color: #0A87F8;" v-if="sourceDetails.status==1&&!openShareSourceDialogFlag&&activekey==2" @click="openShareSource" v-mark="sourceDetails.clueType == 1 ? ['mk_source_tenant_gxzy'] : ['mk_source_tenant_gk_gxzy']">
                资源共享
            </div>
            <div class="add-follow-detail cursor" v-show="openAddFollowDetailFlag&&activekey==1">
            <div class="followType clearfix">
              <div class="f-fl cursor" v-for="(item) in typeList" :key="item.id" :class="addFollowDetail.followType==item.name?'click':'normal'" @click="changeTypeName(item)">{{item.name}}</div>
            </div>
            <div v-if="addFollowDetail.followType=='带看'" class="editStyle_daikan">
                <div class="editStyle_daikan_font">带看房源</div>
                <div class="editStyle_daikan_select">
                  <a-select showSearch placeholder="输入房源编号/小区地址/项目名称/门牌号检索" style="width: 100%;height: 28px;" :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity">
                    <a-select-option v-for="(item) in communityList" :key="item.houseId">
                      {{ item.viewAddress }}
                    </a-select-option>
                  </a-select>
                </div>
              </div>
            <div class="editStyle">
                <label-item
                        :valLength="addFollowDetail.comment ? addFollowDetail.comment.length : 0"
                        class="u-no-border" :style="addFollowDetail.type==1?'height:62px;':'height: 100px;'"
                        style="width: 100%;"
                >
                    <a-textarea id="addFollowDetailContent" v-model="addFollowDetail.content" style="padding:4px 5px 0 5px"
                                placeholder="添加跟进记录" maxlength="200" :style="addFollowDetail.type==1?'height:62px;':'height: 100px;'"
                                :autosize="{ minRows: 1, maxRows: 5 }"
                    />
                </label-item>
            </div>
            <div class="picStyle">
              <own-upload :picList="item2_1" v-if="openAddFollowDetailFlag" :uploadParms="sendData2_1" :maxLength="6" :showTips="false" ref="img2_1">
                <div style="padding-top: 10px;">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">图片</div>
                </div>
              </own-upload>
            </div>
            <div class="isReserveBeltSee clearfix" style="height: 26px;">
                <div class="f-fl" v-if="addFollowDetail.followType!='带看'"><a-checkbox @change="onChange" v-model="addFollowDetail.checked">已约带看</a-checkbox></div>
                <div class="f-fl" style="margin: 0 0 2px 5px;" v-if="addFollowDetail.isReserveBeltSee==1&&addFollowDetail.followType!='带看'"><a-date-picker style="width: 165px;" v-model="addFollowDetail.reserveSeeTime" show-time :format="dateFormat"  @ok="onOk"/></div>
                <div class="send f-fr" @click="addFollow">发送</div>
            </div>
        </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="shareSourceDialog" class="ownModalBorder titDialog" title="共享潜在线索池">
            <share-source :sourceId="sourceId" @cancelShareSource="cancelShareSource" @successShareSource="successShareSource"></share-source>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="closeSourceDialog" class="ownModalBorder titDialog" title="关闭">
            <close-source :sourceId="sourceId" @cancelCloseSource="cancelCloseSource" @successCloseSource="successCloseSource"></close-source>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignUserDialog" class="ownModalBorder titDialog" title="指派员工">
            <assign-user :sourceId="sourceId" @cancelAssignUser="cancelAssignUser" @successAssignUser="successAssignUser"></assign-user>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="804px" v-model="addSourceDialog" class="ownModalBorder titDialog" :title="addSourceTitle">
            <add-source :fromType="fromType" :sourceId="sourceId" @cancelSave="cancelSave" @successSave="successSave"></add-source>
        </a-modal>
      <!-- 添加预定弹框 -->
      <a-modal destroyOnClose  centered  :footer="null" :maskClosable="false" width="800px" v-model="addReserveDialog" class="ownModalBorder titDialog" title="添加预定" @cancel="handleCancelres">
        <add-reserve :sourceFul="true" :sourceObj="sourceObj" @saveSuccess="addReserveSuccess" @cancelUp="addReserveDialog = false"></add-reserve>
      </a-modal>
      <!-- 添加合同弹框 -->
      <a-modal destroyOnClose centered :footer="null"  :maskClosable="false" width="1200px" v-model="addContractDialog" class="ownModalBorder titDialog" title="添加合同" @cancel="addContractDialog=false;">
        <add-contract @cancelUp="addContractDialog = false" :sourceFul="true" :sourceObj="sourceObj" @saveSuccess="addReserveSuccess" @cancelSaveTenantContract="addContractDialog=false;"></add-contract>
      </a-modal>
      <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
</template>

<script>
import ShareSource from './shareSource';
import CloseSource from './closeSource';
import AssignUser from './assignUser';
import AddSource from './addSource';
import AddReserve from '../../contract/reserve/addReserve';
import AddContract from '../../contract/tenant/addTenantContract';
import  * as API from '@/api/source';
import * as PublicAPI from '@/api/public';
import { moduleFieldConfigGet } from '@/api/decision';
import { CURRENTDEPTID } from '@/store/mutation-types';
import {searchHouse} from '@/api/workorder';
import {listEnableDict} from "@/api/contract";
const demandTypeList = [
    {
        id:'1',
        name:'整租1室',
    },
    {
        id:'2',
        name:'整租2室',
    },
    {
        id:'3',
        name:'整租3室',
    },
    {
        id:'11',
        name:'合租主卧',
    },
    {
        id:'12',
        name:'合租次卧',
    },
    {
        id:'21',
        name:'床位',
    },
];
const demandLabelList =[
    '交通便利','精装修','近超市','带独卫','带阳台','高层','朝南','可养宠物','全男室友','电梯房','有地铁'
];
export default {
    name: "sourceDetails",
    props: {
        sourceId:{
            type: String,
            required:true,
        }
    },
    components: {
        ShareSource,
        CloseSource,
        AssignUser,
        AddSource,
      AddReserve,
      AddContract,
    },
    data() {
        return {
            key:1,
            activekey: 1,
            isEdit: false,
            activeIndex: 0,
            sourceDetails:{
                clueType:1,
                name:'',
                phone:'',
                gender:1,
                comment:'',
                cityId:'',
                cityName:'',
                sourceChannelId:'',
                urgencyLevel:1,
                leasePeriod:2,
                demandTypeList:[],
                demandLabelList:[],
                locationInfo:'',
                minMoney:'',
                maxMoney:'',
                socialAccount:'',
            },
            cityList: [],                       //城市
            sourceChannelList:[],               //渠道来源
            urgencyLevelList:[
                {
                    id:1,
                    name:'紧急（7天以内）',
                    disabled:false,
                },
                {
                    id:2,
                    name:'一般（15天以内）',
                    disabled:false,
                },
                {
                    id:3,
                    name:'暂缓（30天以内）',
                    disabled:false,
                },
                {
                    id:4,
                    name:'更久（30天以上）',
                    disabled:false,
                },
            ],  //紧急程度
            leasePeriodList:[
                {
                    id:1,
                    name:'一个月',
                    disabled:false,
                },
                {
                    id:2,
                    name:'三个月',
                    disabled:false,
                },
                {
                    id:3,
                    name:'半年',
                    disabled:false,
                },
                {
                    id:4,
                    name:'一年',
                    disabled:false,
                },
                {
                    id:5,
                    name:'一年以上',
                    disabled:false,
                },
            ],    //租期
            demandTypeList:demandTypeList,      //需求户型
            demandLabelList:demandLabelList,    //其他需求
            demandLabel:'',                     //添加的其他需求
            demandTypeListStr:[],               //解析需求户型
            followUpList:[],                    //跟进记录
            sharedList:[],                      //共享记录
            shareSourceDialog:false,        //显示共享线索池
            closeSourceDialog:false,        //是否显示关闭线索池
            assignUserDialog:false,         //显示指派员工
            addSourceDialog:false,          //添加线索池
            addSourceTitle:'激活潜在租客线索',               //添加线索池标题
            openAddFollowDetailFlag:false,                     //是否编写明细
            openShareSourceDialogFlag:false,                    //是否资源共享
            addFollowDetail:{
                content:'',
                isReserveBeltSee:0,
                type:7,                     //跟进方式【1、带看，2、来电，3、去电，4、来访，5、到访；7、微聊】
                reserveSeeTime:null,
                checked:false,
                houseId:'',
                followType:'微聊',
                picIdList:[],
            },
            dateFormat: 'YYYY.MM.DD HH:mm',           //日期选择器格式
            copySourceDetails:{},                                        //原始数据
            fromType:3,                     //1、添加；2、修改；3、激活
            skeletonLoading:true,
            innerMarkList:[],               //更多里面的mark
            outterMarkList:[],              //更多外面的mark
            showMoreOperate:false,          //是否显示更多按钮
            renterCheck:{
                gender:{
                    default:1,      //1、男；2、女
                },
                socialAccount:{
                    required:0,     //是否必填
                },
                sourceChannelId:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:undefined,     //初始值
                },
                urgencyLevel:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:undefined,     //初始值
                },
                leasePeriod:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改 1、不可修改；0、可修改
                    default:undefined,     //初始值
                },
                cityId:{
                    required:0,     //是否必填
                    unEditable:0,  //是否不可修改
                    default:undefined,     //初始值
                },
                acceptMoney:{
                    required:0,     //是否必填
                },
                demandType:{
                    required:0,     //是否必填
                },
                otherDemandType:{
                    required:0,     //是否必填
                },
                comment:{
                    required:0,     //是否必填
                },
            },
            addReserveDialog:false,
            sourceObj:{},
            addContractDialog:false,
            communityList:[],
            typeList:[],
            item2_1: [],
            sendData2_1: {},
            previewVisible: false,
            previewImage: '',
        }
    },
    created() {
        this.initData();
        this.moduleFieldConfigGet();
        this.getTypeList();
    },
    mounted() {
      this.sendData2_1 = { //
        // 上传时附带的额外参数
        bizId: '', // 业务id
        bizType: 24, // 图片大类标识 租客
        subBizType: 1, // 图片子类标识 身份证正面
        orderIndex: 1 // 排序值
      }
    },
    methods: {
      handleCancel() {
        this.previewVisible = false;
      },
      handlePreview(file) {
        this.previewImage = file.url || file.origin;
        this.previewVisible = true;
      },
      getTypeList(){
        let params = '47d29ea7be354cad9fe4f4a0abf5e434';
        listEnableDict(params).then(res => {
          // console.log(res)
          if (res.code === "200") {
            this.typeList = res.data;
            if(this.typeList&&this.typeList.length>0){
              this.addFollowDetail.followType = this.typeList[0].name;
            }
          }
        })
      },
      selectCommunity(searchVal) {
        let data = {
          fuzzyKeyword: searchVal,
          useBiz:6,
        }
        searchHouse(data).then(res => {
          if (res.code == "200") {
            if (res.data.length > 0) {
              this.communityList = res.data;
            } else {
              this.communityList = [];
            }
          }

        })
      },
      getCommunity(communityId) {
        this.addFollowDetail.houseId = communityId;
      },
      //来自自定义搜索
      filterOption(inputValue,option){
        if(!inputValue){
          return true;
        }
        return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
      },
      addReserveSuccess(){
        this.addContractDialog = false;
        this.addReserveDialog = false;
        setTimeout(()=>{
          this.$emit('refreshinfoFun',true);
          this.initData();
        },500);
      },
      handleCancelres(){
        this.addReserveDialog = false;
      },
      goReserve(){
        this.addReserveDialog = true;
        this.sourceObj = {
          name:this.sourceDetails.name,
          phone:this.sourceDetails.originPhone,
          gender:this.sourceDetails.gender,
          leasePeriod:this.sourceDetails.leasePeriod,
          bizType:2,
          bizId:this.sourceDetails.id,
        };
      },
      goSign(){
        this.addContractDialog = true;
        this.sourceObj = {
          name:this.sourceDetails.name,
          phone:this.sourceDetails.originPhone,
          gender:this.sourceDetails.gender,
          leasePeriod:this.sourceDetails.leasePeriod,
          sourceChannelId:this.sourceDetails.sourceChannelId,
          bizType:2,
          bizId:this.sourceDetails.id,
        };
      },
        //获取初始化配置
        moduleFieldConfigGet(){
            let paramter ={
                features:'default',
                moduleMark:'crm.renterClue',
                deptId:this.$ls.get(CURRENTDEPTID),
            };
            moduleFieldConfigGet(paramter).then(res=>{
                if(res&&res.data&&res.data.fieldsObj){
                    this.renterCheck = res.data.fieldsObj;
                    //紧急程度初始化
                    if(this.renterCheck.urgencyLevel.unEditable==1&&this.renterCheck.urgencyLevel.default){
                        this.urgencyLevelList.forEach((item)=>{
                            if(item.id == this.renterCheck.urgencyLevel.default){
                                item.disabled = false;
                            }
                            else{
                                item.disabled = true;
                            }
                        });
                    }
                    else{
                        this.urgencyLevelList.forEach((item)=>{
                            item.disabled = false;
                        });
                    }
                    //预计入住周期初始化
                    if(this.renterCheck.leasePeriod.unEditable==1&&this.renterCheck.leasePeriod.default){
                        this.leasePeriodList.forEach((item)=>{
                            if(item.id == this.renterCheck.leasePeriod.default){
                                item.disabled = false;
                            }
                            else{
                                item.disabled = true;
                            }
                        })
                    }
                    else{
                        this.leasePeriodList.forEach((item)=>{
                            item.disabled = false;
                        });
                    }
                }
                this.getCity();
                this.getSourceChannel();
            });
        },
        //获取小区地址相关
        getCity(){
            PublicAPI.getCityList().then(res=>{
                this.cityList = res.data;
                if(this.renterCheck.cityId.unEditable==1&&this.renterCheck.cityId.default){
                    this.cityList&&this.cityList.forEach((item)=>{
                        if(item.id==this.renterCheck.cityId.default){
                            item.disabled = false;
                        }
                        else{
                            item.disabled = true;
                        }
                    });
                }
                else{
                    this.cityList&&this.cityList.forEach((item)=>{
                        item.disabled = false;
                    });
                }
            })
        },
        getSourceChannel(){
            API.getSourceChannel().then(res=>{
                this.sourceChannelList = res.data;
                if(this.renterCheck.sourceChannelId.unEditable==1&&this.renterCheck.sourceChannelId.default){
                    this.sourceChannelList&&this.sourceChannelList.forEach((item)=>{
                        if(item.id==this.renterCheck.sourceChannelId.default){
                            item.disabled = false;
                        }
                        else{
                            item.disabled = true;
                        }
                    });
                }
                else{
                    this.sourceChannelList&&this.sourceChannelList.forEach((item)=>{
                        item.disabled = false;
                    });
                }
            })
        },
        initData(){
            this.enterClueView();
            if(this.activekey == 1){
                this.listFollowUp();
            }
            else{
                this.listShared();
            }
        },
        enterClueView(){
            this.skeletonLoading = true;
            API.enterClueView(this.sourceId).then(res=>{
                this.sourceDetails = res.data;
                this.demandTypeListStr = [];
                if(this.sourceDetails.demandTypeList) {
                    let tempList = this.sourceDetails.demandTypeList;
                    for (let i = 0; i <tempList.length; i++) {
                        if(tempList[i] == '1'){
                            this.demandTypeListStr.push('整租1室');
                        }
                        else if(tempList[i] == '2'){
                            this.demandTypeListStr.push('整租2室');
                        }
                        else if(tempList[i] == '3'){
                            this.demandTypeListStr.push('整租3室');
                        }
                        else if(tempList[i] == '11'){
                            this.demandTypeListStr.push('合租主卧');
                        }
                        else if(tempList[i] == '12'){
                            this.demandTypeListStr.push('合租次卧');
                        }
                        else if(tempList[i] == '21'){
                            this.demandTypeListStr.push('床位');
                        }
                    }
                }else{
                    this.sourceDetails.demandTypeList = [];
                }
                if(!this.sourceDetails.demandLabelList){
                    this.sourceDetails.demandLabelList = [];
                }
                this.sourceDetails.minMoney = this.sourceDetails.minMoney/100;
                this.sourceDetails.maxMoney = this.sourceDetails.maxMoney/100;
                if(!this.sourceDetails.sourceChannelId){
                    this.sourceDetails.sourceChannelId = undefined;
                }
                if(!this.sourceDetails.urgencyLevel){
                    this.sourceDetails.urgencyLevel = undefined;
                }
                if(!this.sourceDetails.leasePeriod){
                    this.sourceDetails.leasePeriod = undefined;
                }
                this.copySourceDetails = Object.assign({}, this.sourceDetails);
                //按钮显示处理
              this.getPermission();
                this.skeletonLoading = false;
            })
        },
      getPermission(){
        // 1 编辑
        // 2 抢单
        // 3 指派
        // 4 转入公客
        // 5 关闭
        // 6 预定
        // 7 签约
        // 8 共享
        // 9 激活
        // 10 删除
        let permissions = JSON.parse(sessionStorage.getItem('permissions'));
        let markArr = [];
        let btnArr = [];
        if(this.sourceDetails.status==1){
          if(this.sourceDetails.clueType==1){
            markArr.push('mk_source_tenant_bj');
            markArr.push('mk_source_tenant_zp');
            markArr.push('mk_contract_reserve_tjyd');
            markArr.push('mk_contract_tenant_tjht');
            markArr.push('mk_source_tenant_gb');
            markArr.push('mk_source_tenant_zwgk');
            markArr.push('mk_source_tenant_gxzy');
          }
          else{
            markArr.push('mk_source_tenant_gk_bj');
            markArr.push('mk_source_tenant_gk_qd');
            markArr.push('mk_source_tenant_gk_zp');
            markArr.push('mk_contract_reserve_tjyd');
            markArr.push('mk_contract_tenant_tjht');
            markArr.push('mk_source_tenant_gk_gb');
            markArr.push('mk_source_tenant_gk_gxzy');
          }
        }
        else if(this.sourceDetails.status==2||this.sourceDetails.status==3){
          if(this.sourceDetails.clueType==1){
            markArr.push('mk_source_tenant_cxjh');
          }
          else{
            markArr.push('mk_source_tenant_gk_cxjh');
          }
        }
        else if(this.sourceDetails.status==4){
          if(this.sourceDetails.clueType==1){
            markArr.push('mk_source_tenant_cxjh');
            markArr.push('mk_source_tenant_sc');
          }
          else{
            markArr.push('mk_source_tenant_gk_cxjh');
            markArr.push('mk_source_tenant_gk_sc');
          }
        }
        //判断资源权限
        markArr.forEach(ele => {
          permissions.some(function(value){
            if (ele == value.mark){
              if(value.mark == 'mk_source_tenant_bj'||value.mark == 'mk_source_tenant_gk_bj'){
                btnArr.push('1');
              }else if(value.mark == 'mk_source_tenant_gk_qd'){
                btnArr.push('2');
              }else if(value.mark == 'mk_source_tenant_zp'||value.mark == 'mk_source_tenant_gk_zp'){
                btnArr.push('3');
              }else if(value.mark == 'mk_source_tenant_zwgk'){
                btnArr.push('4');
              }else if(value.mark == 'mk_source_tenant_gb'||value.mark == 'mk_source_tenant_gk_gb'){
                btnArr.push('5');
              }else if(value.mark == 'mk_contract_reserve_tjyd'){
                btnArr.push('6');
              }else if(value.mark == 'mk_contract_tenant_tjht'){
                btnArr.push('7');
              }else if(value.mark == 'mk_source_tenant_gxzy'||value.mark == 'mk_source_tenant_gk_gxzy'){
                btnArr.push('8');
              }else if(value.mark == 'mk_source_tenant_cxjh'||value.mark == 'mk_source_tenant_gk_cxjh'){
                btnArr.push('9');
              }else if(value.mark == 'mk_source_tenant_sc'||value.mark == 'mk_source_tenant_gk_sc'){
                btnArr.push('10');
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
        listFollowUp(){
            API.listFollowUp(this.sourceId).then(res=>{
                this.followUpList = res.data;
            })
        },
        listShared(){
            API.listShared(this.sourceId).then(res=>{
                this.sharedList = res.data;
            })
        },
        selectCity(val){
            this.sourceDetails.cityId = val;
            for (let i = 0; i < this.cityList.length; i++) {
                if(this.cityList[i].id == val){
                    this.sourceDetails.cityName = this.cityList[i].name;
                }
            }
        },
        priceReg1(e) {
            // 通过正则过滤小数点后两位
            let a = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
            this.sourceDetails.minMoney = a;
            e.target.value = a;
        },
        priceReg2(e) {
            // 通过正则过滤小数点后两位
            let a = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
            this.sourceDetails.maxMoney = a;
            e.target.value = a;
        },
        handleChange(value) {
            this.sourceDetails.demandTypeList = value;
        },
        deleteChild() {
            let _this = this;
            let id = this.sourceDetails.id
            this.$modal.confirm({
                title: '确定要删除潜在租客线索 「' + this.sourceDetails.name + '/' + this.sourceDetails.phone + '」 的信息吗？',
                content: '删除后将不可恢复',
                okText: '确定',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                onOk() {
                    API.renterClueRemove({id:id}).then(res => {
                        if (res.code == 200) {
                            _this.$message.success('操作成功！');
                            _this.$emit('refreshinfoFun', true);
                            setTimeout(() => {
                                _this.$emit('deleteRefrsh');
                            }, 500)
                        }
                    })
                },
                onCancel() {
                },
            });
        },
        editData() {
            this.isEdit = !this.isEdit;
            this.sourceDetails.phone = this.sourceDetails.originPhone;
            this.sourceDetails.socialAccount = this.sourceDetails.originSocialAccount;
        },
        save() {
            let checkFlag = this.checkData();
            if(!checkFlag){
                return;
            }
            let data = Object.assign({}, this.sourceDetails);
            //公客加密问题处理
            if(this.sourceDetails.clueType == 2){
                if(this.sourceDetails.phone == this.copySourceDetails.phone) {
                    data.phone = this.sourceDetails.originPhone;
                }
                if(this.sourceDetails.socialAccount){
                    if(this.sourceDetails.socialAccount == this.copySourceDetails.socialAccount){
                        data.socialAccount = this.sourceDetails.originSocialAccount;
                    }
                }
            }
            data.id = this.sourceId;
            data.maxMoney =  Math.round(this.sourceDetails.maxMoney * 100);
            data.minMoney =  Math.round(this.sourceDetails.minMoney * 100);
            API.renterClueEdit(data).then(res => {
                if (res.code === '200') {
                    this.$message.success('修改成功');
                    this.$emit('refreshinfoFun', true);
                } else {
                    this.$message.success('修改失败');
                }
                this.isEdit = !this.isEdit;
                this.initData();
            });
        },
        cancelEdit() {
            this.isEdit = !this.isEdit;
            this.sourceDetails = Object.assign({}, this.copySourceDetails);
        },
        handleCallback(val) {
            this.activekey = val;
            if(this.activekey == 1){
                this.listFollowUp();
            }
            else{
                this.listShared();
            }
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
        checkData() {
            //必填检验
            if(!this.sourceDetails.name){
                this.$message.error('请填写租客姓名');
                return false;
            }
            if(!this.sourceDetails.phone){
                this.$message.error('请填写租客电话');
                return false;
            }
            this.lastCheck = true;
            if (!this.sourceDetails.name) {
                this.$message.error('请输入姓名!');
                return false;
            }
            if(this.sourceDetails.clueType == 2) {
                if (this.sourceDetails.phone != this.copySourceDetails.phone) {
                    if (this.checkPhone(this.sourceDetails.phone)) {
                        // 这个是判断字段传的是否正确  电话号码
                        return false;
                    }
                }
            }
            //检验初始化的字段
            if(!this.sourceDetails.socialAccount&&this.renterCheck.socialAccount.required==1){
                this.$message.warning('请输入其他联系方式');
                return false;
            }
            if(!this.sourceDetails.sourceChannelId&&this.renterCheck.sourceChannelId.required==1){
                this.$message.warning('请选择来源');
                return false;
            }
            if(!this.sourceDetails.urgencyLevel&&this.renterCheck.urgencyLevel.required==1){
                this.$message.warning('请选择紧急程度');
                return false;
            }
            if(!this.sourceDetails.leasePeriod&&this.renterCheck.leasePeriod.required==1){
                this.$message.warning('请选择预计入住周期');
                return false;
            }
            if(!this.sourceDetails.cityId&&this.renterCheck.cityId.required==1){
                this.$message.warning('请选择意向租房位置');
                return false;
            }
            if(!this.sourceDetails.minMoney&&!this.sourceDetails.maxMoney&&this.renterCheck.acceptMoney.required==1){
                this.$message.warning('请输入可接受租金范围');
                return false;
            }
            if((!this.sourceDetails.demandTypeList||this.sourceDetails.demandTypeList.length==0)&&this.renterCheck.demandType.required==1){
                this.$message.warning('请选择需求户型');
                return false;
            }
            if((!this.sourceDetails.demandLabelList||this.sourceDetails.demandLabelList.length==0)&&this.renterCheck.otherDemandType.required==1){
                this.$message.warning('请输入其他需求');
                return false;
            }
            if(!this.sourceDetails.comment&&this.renterCheck.comment.required==1){
                this.$message.warning('请输入备注');
                return false;
            }

            return true;
        },
        addSource() {
            this.addSourceDialog = true;
        },
        cancelSave(){
            this.addSourceDialog = false;
        },
        successSave(sourceId){
            this.addSourceDialog = false;
            //this.initData();
            this.$emit('changeSourceId',sourceId);
            this.$emit('refreshinfoFun', true);
        },
        cancelCloseSource(){
            this.closeSourceDialog = false;
        },
        successCloseSource(){
            this.closeSourceDialog = false;
            this.initData();
            this.$emit('refreshinfoFun', true);
        },
        cancelAssignUser(){
            this.assignUserDialog = false;
        },
        successAssignUser(){
            this.assignUserDialog = false;
            this.initData();
            this.$emit('refreshinfoFun', true);
        },
        openAssignUser(){
            this.sourceId = this.sourceId;
            this.assignUserDialog = true;
        },
        cancelShareSource(){
            this.shareSourceDialog = false;
        },
        successShareSource(){
            this.shareSourceDialog = false;
            this.initData();
            this.$emit('refreshinfoFun', true);
        },
        openCloseSource(){
            this.sourceId = this.sourceId;
            this.closeSourceDialog = true;
        },
        openShareSource(){
            this.sourceId = this.sourceId;
            this.shareSourceDialog = true;
        },
        changePrivate(){
            let _this = this;
            this.$modal.confirm({
                title: '确定要将潜在租客线索 「 ' + this.sourceDetails.name+'/'+this.sourceDetails.phone + ' 」 抢至自己的私客池吗？',
                content: '',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    API.renterClueGrab({id:_this.sourceId}).then(res=>{
                        if (res.code === '200') {
                            _this.$message.success('抢单成功');
                            _this.initData();
                            _this.$emit('refreshinfoFun', true);
                        } else {
                            _this.$message.success('抢单失败');
                            _this.initData();
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        },
        changPublic(){
            let _this = this;
            this.$modal.confirm({
                title: '确定要将潜在租客线索 「 ' + this.sourceDetails.name+'/'+this.sourceDetails.phone + ' 」 转入公客池吗？',
                content: '转入后，公司所有人员都可查看到',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    API.renterClueTurnPub({id:_this.sourceId}).then(res=>{
                        if (res.code === '200') {
                            _this.$message.success('转公客成功');
                            _this.initData();
                            _this.$emit('refreshinfoFun', true);
                        } else {
                            _this.$message.success('转公客失败');
                            _this.initData();
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        },
        openAddFollowDetail(){
            this.addFollowDetail.type = 7;
            this.addFollowDetail.content = "";
            this.addFollowDetail.isReserveBeltSee = 0;
            this.addFollowDetail.reserveSeeTime = null;
            this.openAddFollowDetailFlag = true;
            this.addFollowDetail.checked = false;
            this.addFollowDetail.houseId = '';
            this.communityList = [];
            if(this.$refs.img2_1){
              this.$refs.img2_1.picsList = [];
            }
            this.addFollowDetail.picIdList = [];
            this.$nextTick(() => {
                document.getElementById('addFollowDetailContent').focus();
            });
        },
        closeAddFollowDetail(){
            this.addFollowDetail.type = 7;
            this.addFollowDetail.content = "";
            this.addFollowDetail.isReserveBeltSee = 0;
            this.addFollowDetail.reserveSeeTime = null;
            this.addFollowDetail.houseId = '';
            this.openAddFollowDetailFlag = false;
            this.communityList = [];
        },
        onOk(value) {
            console.log('onOk: ', value);
        },
        onChange(e) {
            if(e.target.checked){
                this.addFollowDetail.isReserveBeltSee = 1;
            }
            else{
                this.addFollowDetail.isReserveBeltSee = 0;
            }
        },
        changeType(val){
            this.addFollowDetail.type = val;
        },
        changeTypeName(item){
          this.addFollowDetail.followType = item.name;
        },
        addFollow(){
            if(this.addFollowDetail.followType=='带看'){
              this.addFollowDetail.isReserveBeltSee = 0;
              this.addFollowDetail.reserveSeeTime = null;
            }
            this.addFollowDetail.renterClueId = this.sourceId;
            if (this.$refs.img2_1&&this.$refs.img2_1.picsList.length != 0) {
              let picsIdList = [];
              this.$refs.img2_1.picsList.forEach((item)=>{
                picsIdList.push(item.id);
              });
              this.addFollowDetail.picIdList = picsIdList;
            }
            API.renterClueFollowUp(this.addFollowDetail).then(res=>{
                if (res.code === '200') {
                    this.$emit('refreshinfoFun', true);
                    this.initData();
                } else {
                    this.initData();
                }
                this.openAddFollowDetailFlag = false;
            })
        },
        removeDemandLabelList(item){
            let pos = this.sourceDetails.demandLabelList.indexOf(item);
            if(pos > -1){
                this.sourceDetails.demandLabelList.splice(pos,1);
            }
        },
        addRemoveDemandLabel(value){
                let pos = this.sourceDetails.demandLabelList.indexOf(value)
                if(pos > -1){
                    this.sourceDetails.demandLabelList.splice(pos,1);
                }
                else{
                    this.sourceDetails.demandLabelList.push(value);
                }
            },
        addDemandLabel(){
            let value = this.demandLabel;
            if(this.demandLabel){
                let pos = this.sourceDetails.demandLabelList.indexOf(value)
                if(pos > -1){
                  this.$message.warning('该需求已存在，不可重复添加');
                }
                else{
                    this.sourceDetails.demandLabelList.push(value);
                    this.demandLabel='';
                }
            }
        },
    },
    filters: {
        urgencyLevelVal(val) {
            return val == 1 ? '紧急（7天以内）' : val == 2 ? '一般（15天以内）' : val == 3 ? '暂缓（30天以内）' : val == 4 ? '更久（30天以上）' : '-';
        },
        leasePeriodVal(val) {
            return val == 1 ? '一个月' : val == 2 ? '三个月' : val == 3 ? '半年' : val == 4 ? '一年' : val == 5 ? '一年以上': '-';
        },
        blankVal(val){
            if(!val){
                return '-';
            }else{
                return  val;
            }
        },
        moneySpecialVal(record){
            let max = record.maxMoney;
            let min = record.minMoney;
            if(min){
                if(max){
                    return min+'-'+max+'元';
                }else{
                    return min+'元';
                }
            }else{
                if(max){
                    return max+'元';
                }else{
                    return '-';
                }
            }
        }
    },
    watch:{
        sourceId(){
            this.initData();
        },
    }
}
</script>

<style scoped lang="less">
.source-detail-box {
    width: 1000px;
    background: rgba(247,248,251,1);
    position:relative;
    & /deep/ .form-input-item{
        margin-top: 10px;
    }
    & /deep/ .input-item-box{
        margin-top: 2px;
    }
    & /deep/ .ant-input {
        padding: 0 0 0 5px;
    }
    & /deep/ .ant-select-selection-selected-value{
        padding: 0 0 0 5px;
    }

    .line{
        width: 100%;
        border: 0.5px solid #DDDDDD;
    }
    .left-detail {
        width: 640px;
        height: calc(100vh - 100px);
        overflow: auto;
        background: #FFFFFF;
        .top {
            padding: 20px 20px 0 20px;
            .title {
                display: flex;
                align-items: center;
                width: 138px;
                margin-top: 25px;
                height: 75px;
                padding-bottom: 10px;
                border-right: 1px dashed @borderColor;
                .radius-font {
                    width: 44px;
                    height: 44px;
                    line-height: 44px;
                    border-radius: 50%;
                    font-size:28px;
                }
                .status2 {
                    background: rgba(10, 135, 248, 0.1);
                    color: #0A87F8;
                }

                .status {
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
                width: calc(100% - 160px);
                flex-wrap: wrap;
                .item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
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
                            font-size:14px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(17,17,17,1);
                      }
                    }
                }
                .blank-box {
                    width: 30px;
                    height: 30px;
                }
            }
        }

        .tabs-content {
            & /deep/ .ant-tabs-bar{
                margin: 0 18px;
            }
            // padding: 0 18px;
            .basic-info {
                padding: 0 18px;
                // min-height: 410px;
                // min-height: calc(100vh - 282px);
                .input-info {
                    display: flex;
                    flex-wrap: wrap;
                    .margin1{
                        margin-right: 30px;
                    }
                    margin2{
                        margin-right: 20px;
                    }
                    .item {
                        width: 180px;
                        margin-bottom: 20px;
                        & /deep/ .title {
                            margin-bottom: 4px;
                        }
                        & /deep/ .ant-select {
                            width: 100%;
                        }
                    }
                    .selectDemandLabelItem{
                        min-width: 71px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 12px;
                        border-radius:4px;
                        border:1px solid rgba(221,221,221,1);
                        margin-top: 2px;
                        margin-bottom: 3px;
                        margin-right: 5px;
                        text-align:center;
                        background:rgba(246,247,248,1);
                    }
                    .otherDemandLabelList{
                        /deep/ .ant-input{
                            padding: 0px !important;
                        }
                    }
                    .closeDosh{
                        width: 100%;
                        height: 2px;
                        border-bottom: 1px dashed #DDDDDD;
                    }
                    .closeTitle{
                        height: 20px;
                        width: 100%;
                        margin: 20px 0;
                        font-size: 16px;
                        color: #111111;
                        font-weight: 500;
                    }
                }
            }
        }
    }
    .right-detail{
        padding:0 20px 50px 25px;
        width: 352px;
        height: calc(100vh - 100px);
        background: #FFFFFF;
        overflow: auto;
        /deep/ .ant-tabs-bar{
            margin: 0px;
            width: 302px;
        }
        &/deep/ .ant-tabs-nav .ant-tabs-tab{
            margin-right: 30px;
        }
        .content-follow{
            display: flex;
            justify-content: flex-start;
            .content-follow-type{
              width: 18px;
              .content-follow-left-line{
                margin: 0 0 0 9px;
                height: calc(100% - 18px);
                border-left: 0.5px dashed #AED4F5;
              }
              .content-follow-type1 {
                display: inline-block;
                margin-right: 10px;
                width: 20px;
                height: 20px;
                line-height: 20px ;
                border-radius: 50%;
                .content-follow-type2{
                  margin:5px 0 0 5px;
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  line-height: 10px ;
                  border-radius: 50%;
                }
              }
            }
            .content-follow-left{
                width: 32px;
                .content-follow-left-line{
                    margin: 0 0 0 16px;
                    height: calc(100% - 32px);
                    border-left: 0.5px dashed #AED4F5;
                }
            }
            .content-follow-right{
                margin-left: 10px;
                margin-bottom: 25px;
                width: 270px;
                .follow-right-line-one{
                    .name{
                        font-size: 14px;
                        color: #111111;
                        font-weight:400;
                    }
                    .date{
                        color: #777;
                        font-size: 12px;
                    }
                    .followType{
                      color: rgba(10, 135, 248);
                      font-size: 13px;
                      background: rgba(10, 135, 248, 0.1);
                      padding: 0px 4px;
                      border-radius: 4px;
                      margin-left: 4px;
                    }
                }
                .follow-right-line-two{
                    font-size: 13px;
                    color: #999999;
                }
                .follow-info{
                    margin-top: 2px;
                    padding:4px 0 4px 6px;
                    width: 269px;
                    min-height: 18px;
                    line-height:18px;
                    background-color: rgba(247,248,251,1);
                    color: #777777;
                    font-size: 12px;
                }
                .name{
                    color: #111111;
                    font-size: 14px;
                }
                .img-list {
                  >div {
                    height: 47px;
                    width: 85px;
                    margin-right: 5px;
                    margin-bottom: 5px;
                    >div{
                      width: 100%;
                      height: 100%;
                      line-height: 47px;
                      border: 1px solid #eeeeee;
                      background-color: #f6f7f8;
                      text-align: center;
                      border-radius: 6px;
                      overflow: hidden;
                      img {
                        width: auto;
                        max-width: 85px;
                        height: auto;
                        max-height: 47px;
                        overflow: hidden;
                      }
                    }
                  }
                  >div:last-child{
                    margin-right: 0px;
                  }
                }
            }
        }
        .skeletonLoadingListStyle{
            width: 100%;
        }
    }
    .add-follow-panel {
        width: 332px;
        position: absolute;
        bottom: 0px;
        border-bottom: 10px solid #FFFFFF;
        right: 10px;

        .add-follow {
            background-color: #FFFFFF;
            border: 1px solid #DDDDDD;
            width: 332px;
            height: 40px;
            line-height: 40px;
            padding: 0px 10px 0 10px;
        }

        .add-follow-detail {
            border: 1px solid #DDDDDD;
            width: 332px;
            padding: 0px 10px 0 10px;
            background-color: #FFFFFF;
            border-radius: 4px;
            .followType {
                border-bottom: 1px solid #EEEEEE;
                padding-bottom: 10px;
                .normal {
                    padding: 0 5px;
                    height: 24px;
                    line-height: 24px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 4px;
                    border: 1px solid rgba(221, 221, 221, 1);
                    color: #111111;
                    font-size: 13px;
                    margin-right: 6px;
                    text-align: center;
                    margin-top: 10px;
                }
                .click {
                    padding: 0 5px;
                    height: 24px;
                    line-height: 24px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 4px;
                    border: 1px solid rgba(10, 135, 248, 1);
                    color: #0A87F8;
                    font-size: 13px;
                    margin-right: 6px;
                    text-align: center;
                    margin-top: 10px;
                }
            }

            .send {
                width: 54px;
                height: 22px;
                background: rgba(10, 135, 248, 1);
                border-radius: 4px;
                color: #FFFFFF;
                font-size: 14px;
                text-align: center;
            }

            .isReserveBeltSee {
                & /deep/ .ant-input {
                    width: 155px;
                    padding: 4px 6px;
                }
            }

            & /deep/ .label-item textarea.ant-input {
                max-height: 100px;
            }
        }
      .editStyle{
        height: 110px;
      }
      .picStyle{
        /deep/ .file-list{
          margin: 0 5px 10px 0
        }
        /deep/ .enclosure{
          width: 100px;
          height: 63px;
        }
        /deep/ .ant-upload.ant-upload-select-picture-card{
          width: 100px;
          height: 63px;
        }
        /deep/ .file-list .enclosure-img-list{
          width: 100px;
          height: 63px;
          margin-right: 5px;
          border: 1px solid #eeeeee;
        }
        /deep/ .file-list .enclosure-img-list > div{
          border:none;
        }
        /deep/ .file-list .enclosure-img-list > div img{
          width: auto;
          max-width: 100px;
          height: auto;
          max-height: 63px;
          overflow: hidden;
          vertical-align:baseline;
        }
      }
      .editStyle_daikan{
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        .editStyle_daikan_font{
          height: 28px;
          height: 28px;
          line-height:28px;
          text-align:center;
          width: 56px;
          border-radius: 2px;
          border: 1px solid #EEEEEE;
          border-top:none;
          font-size: 12px;
          color: #777777;
        }
        .editStyle_daikan_select{
          width: calc(100% - 56px);
          height: 28px;
          /deep/ .ant-select-selection--single{
            height: 28px;
            line-height: 28px;
          }
          /deep/ .ant-select-selection{
            border-radius: 0;
            border: 1px solid #EEEEEE;
            border-top: none;
            border-left: none;
          }
          /deep/ .ant-select-selection__rendered{
            height: 28px;
            line-height: 28px;
          }
          /deep/ .ant-select-dropdown-menu-item{
            line-height: 18px;
            white-space:normal !important;
          }
        }
      }
    }
    .bottom {
        margin: 0 20px;
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
        width: 32px;
        height: 32px;
        line-height: 32px ;
        font-size: 12px;
        color: #FFA036;
        text-align: center;
        background-color: fade(#FFA036, 10%);
        border-radius: 16px;
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
    .demandLabelAll{
        width:100%;
        padding-bottom: 10px;
        line-height: 40px;
        background:rgba(247,248,251,1);
        .demandLabelItem{
            width: 63px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            border-radius:4px;
            border:1px solid rgba(221,221,221,1);
            margin-left: 10px;
            margin-top: 10px;
            text-align:center;
        }
        .normalBg{
            background:rgba(246,247,248,1);
        }
        .clickBg{
            background:rgba(226,237,248,1);
        }
        border-top: 1px solid #DDDDDD;
    }
    & /deep/ .ant-tabs-nav .ant-tabs-tab {
        margin: 0;
        padding: 8px 0;
    }
    & /deep/ .ant-input,
    .ant-select,
    .ant-checkbox-wrapper,
    .ant-select-dropdown {
        font-size: 12px;
        height: 24px;
        color: @mainFontColor;
    }
    & /deep/ .ant-select-selection__rendered{
        font-size: 12px;
        height: 24px;
        line-height: 24px;
        margin-left: 0px;
    }
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
    .active {
        border-color: @themeColor!important;
        color: @themeColor!important;
    }
    /deep/ .ant-select-selection--multiple .ant-select-selection__placeholder{
        margin-left: 0;
    }
    & /deep/ .ant-select-selection--multiple {
        //   height: 24px;
        min-height: 24px;
        .ant-select-selection__rendered>ul>li {
            height: 20px;
            margin-top: 2px;
            line-height: 20px;
        }
    }
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
    /deep/ .ant-select-selection__choice{
        margin-left: 5px;
    }
    /deep/ .label-item textarea.ant-input{
        padding: 4px 0 0 5px;
    }
    /deep/ .ant-select-selection__placeholder{
        padding-left: 5px;
    }
}
</style>
