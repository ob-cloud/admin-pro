<template>
    <div class="clean-detail-box clearfix">
        <div class="left-detail f-fl">
            <div class="top f-clearfix">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top:3px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span class="big-radius-font status1" style="margin-top:3px;width: 44px;height: 44px;" v-if="cleanDetails.status==1&&!skeletonLoading"><icon-font type="icon-yumengtubiao_baojie" /></span>
                    <span class="big-radius-font status2" style="margin-top:3px;width: 44px;height: 44px;" v-else-if="cleanDetails.status==2&&!skeletonLoading"><icon-font type="icon-yumengtubiao_baojie" /></span>
                    <span class="big-radius-font status3" style="margin-top:3px;width: 44px;height: 44px;" v-else-if="cleanDetails.status==3&&!skeletonLoading"><icon-font type="icon-yumengtubiao_baojie" /></span>
                    <span class="big-radius-font status4" style="margin-top:3px;width: 44px;height: 44px;" v-else-if="cleanDetails.status==4&&!skeletonLoading"><icon-font type="icon-yumengtubiao_baojie" /></span>
                    <span class="big-radius-font status5" style="margin-top:3px;width: 44px;height: 44px;" v-else-if="cleanDetails.status==5&&!skeletonLoading"><icon-font type="icon-yumengtubiao_baojie" /></span>
                    <label-item title="当前状态">
                        <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                        <div class="statusColor" v-if="cleanDetails.status==1&&!skeletonLoading">待处理</div>
                        <div class="statusColor" v-else-if="cleanDetails.status==2&&!skeletonLoading">处理中</div>
                        <div class="statusColor" v-else-if="cleanDetails.status==3&&!skeletonLoading">待验收</div>
                        <div class="statusColor" v-else-if="cleanDetails.status==4&&!skeletonLoading">已完成</div>
                        <div class="statusColor" v-else-if="cleanDetails.status==5&&!skeletonLoading">已取消</div>
                    </label-item>
                </div>
                <div class="address" v-if="!skeletonLoading">
                    <div style="margin-left: 10px;">{{cleanDetails.houseAlias}}-{{cleanDetails.fullAddress}}</div>
                </div>
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:240px">
                        <span class="radius-font radius-font-person">
                            <icon-font type="iconyumengtubiao_weifenpeirenyuan" />
                        </span>
                        <label-item title="申请人信息" :skeletonLoading="skeletonLoading">
                            <div>{{cleanDetails.applyName|blankVal}} - {{cleanDetails.applyPhone|blankVal}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:160px">
                        <span class="radius-font">
                            <icon-font type="icon-yumengtubiao_weixiubaojieleixing" />
                        </span>
                        <label-item title="需要保洁的类型" :skeletonLoading="skeletonLoading">
                            <div>{{cleanDetails.cleanType|cleanTypeVal}}</div>
                        </label-item>
                    </div>
                    <div class="blank-box"></div>
                    <div class="item" style="width:400px">
                        <span class="radius-font radius-font-time">
                            <icon-font type="icon-yumengtubiao_riqi" />
                        </span>
                        <label-item title="期望上门时间" :skeletonLoading="skeletonLoading">
                            <div>
                                {{cleanDetails.visitDate?$moment(cleanDetails.visitDate).format('YYYY.MM.DD'):'-'}} {{cleanDetails.visitTime|visitTimeVal}}
                                <span class="radius-font-red" v-if="cleanDetails.isExpedited ==1">
                                    <icon-font type="icon-yumengtubiao_jiaji" />加急处理
                                </span>
                            </div>
                        </label-item>
                    </div>
                </div>
                <div class="address" v-if="!skeletonLoading">
                    <div style="margin-left: 20px;">{{cleanDetails.houseAlias?cleanDetails.houseAlias+'/':''}}{{cleanDetails.cityName?cleanDetails.cityName:''}}{{cleanDetails.areaName?cleanDetails.areaName:''}}{{cleanDetails.fullAddress}}</div>
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_jibenxinxi" /> 基本信息
                        </span>
                        <div class="basic-info">
                            <div class="input-info">
                                <label-item class="item u-bottom-border margin1" title="工单来源" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.sourceType==1?'租客':'公司'}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border margin1" title="申请人姓名" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.applyName|blankVal}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border margin2" title="申请人电话" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.applyPhone|blankVal}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border margin1" title="需要保洁的类型" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.cleanType|cleanTypeVal}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border margin1" title="期望上门时间" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.visitDate?$moment(cleanDetails.visitDate).format('YYYY.MM.DD'):'-'}} {{cleanDetails.visitTime|visitTimeVal}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border margin2" title="提交保洁的时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(cleanDetails.createTime).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item class="item" title="需求描述" style="width: 100%;" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.promotionDesc|blankVal}}</span>
                                </label-item>
                                <label-item class="item" title="附件" style="width: 100%;" :skeletonLoading="skeletonLoading">
                                    <div  class="showImg f-clearfix">
                                        <span v-if="!cleanDetails.cleanPicList||cleanDetails.cleanPicList.length==0">-</span>
                                        <div class="f-fl cursor" v-for="(item,i) in cleanDetails.cleanPicList" :key="i">
                                            <video v-if="'mp4,avi,mov'.indexOf(item.fileExt)>-1" style="width: 120px;height: 76px;border-radius: 4px" :src="item.origin" controls="controls"></video>
                                            <div v-else class="cursor" @click="handlePreview(item.origin)"><img :src="item.small" alt=""></div>
                                        </div>
                                    </div>
                                </label-item>
                                <div style="margin-bottom: 10px" :style="cleanDetails.cleanPicList&&cleanDetails.cleanPicList.length>0?'':'margin-top:10px;'"><span style="font-size: 12px;color: #777777;">备注</span><span style="font-size: 12px;color: #FFA036;">（此备注信息仅限公司内部可见）</span></div>
                                <label-item class="item" style="width: 100%;" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.applyComment|blankVal}}</span>
                                </label-item>
                            </div>
                            <div v-if="cleanDetails.status==3||cleanDetails.status==4" class="closeDosh"></div>
                            <div v-if="cleanDetails.status==3||cleanDetails.status==4" class="input-info">
                                <div  class="closeTitle">完成信息</div>
                                <label-item class="item u-bottom-border margin1" title="处理人" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.completeUserName}}</span>
                                </label-item>
                                <label-item class="item margin1" title="处理时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(cleanDetails.completeDate).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item class="item margin2" title="保洁结果" :skeletonLoading="skeletonLoading">
                                    <span style="color: #0A87F8" v-if="cleanDetails.completeIsSolve==1">已完成</span>
                                    <span style="color: #FB4246" v-if="cleanDetails.completeIsSolve==0">未完成</span>
                                </label-item>
                                <label-item v-if="cleanDetails.completeIsSolve==1" class="item" style="width: 100%;" title="保洁内容" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.cleanContent}}</span>
                                </label-item>
                                <label-item v-if="cleanDetails.completeIsSolve==0" class="item" style="width: 100%;" title="未完成原因" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.cleanContent}}</span>
                                </label-item>
                                <label-item title="附件" style="width: 100%;margin-bottom: 10px" :skeletonLoading="skeletonLoading">
                                    <div  class="showImg f-clearfix">
                                        <span v-if="!cleanDetails.completePicList||cleanDetails.completePicList.length==0">-</span>
                                        <div class="f-fl cursor" v-for="(item,i) in cleanDetails.completePicList" :key="i">
                                            <video v-if="'mp4,avi,mov'.indexOf(item.fileExt)>-1" style="width: 120px;height: 76px;border-radius: 4px" :src="item.origin" controls="controls"></video>
                                            <div v-else class="cursor" @click="handlePreview(item.origin)"><img :src="item.small" alt=""></div>
                                        </div>
                                    </div>
                                </label-item>
                            </div>
                            <div v-if="cleanDetails.acceptingDate&&cleanDetails.status==4" class="closeDosh"></div>
                            <div v-if="cleanDetails.acceptingDate&&cleanDetails.status==4" class="input-info">
                                <div  class="closeTitle">验收信息</div>
                                <label-item class="item u-bottom-border margin1" title="验收人" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.acceptingUserName|blankVal}}</span>
                                </label-item>
                                <label-item class="item margin1" title="验收时间" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.acceptingDate?$moment(cleanDetails.acceptingDate).format('YYYY.MM.DD HH:mm'):''}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;" title="验收备注" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.acceptingComment|blankVal}}</span>
                                </label-item>
                            </div>
                            <div v-if="cleanDetails.expenseBillList&&cleanDetails.expenseBillList.length>0" class="closeDosh"></div>
                            <div v-if="cleanDetails.expenseBillList&&cleanDetails.expenseBillList.length>0" class="input-info" style="margin-bottom: 20px;">
                                <div  class="closeTitle">保洁费用</div>
                                <div class="basicsInfo">
                                    <div class="table">
                                        <div class="table-title">
                                            <div style="max-width: 197px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">费用承担方</div>
                                            <div style="max-width: 216px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">默认费用类型</div>
                                            <div style="max-width: 185px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">费用金额</div>
                                        </div>
                                        <div class="house-data u-no-border" v-for="(item,index) in cleanDetails.expenseBillList" :key="index">
                                            <div class="clearfix" style="max-width: 197px;" >
                                                <div class="house-data-item-left" style="padding-left: 14px;color: #111111">
                                                    <label-item title="" class="u-no-border deptStyle">
                                                        {{item.undertakerName}}
                                                    </label-item>
                                                </div>
                                            </div>
                                            <div class="clearfix" style="max-width: 216px;padding-left: 14px;color: #111111">
                                                {{item.feeSubjectName}}
                                            </div>
                                            <div class="clearfix" style="max-width: 185px;padding-left: 14px;color: #111111">
                                                {{item.money/100}}<span style="margin-left: 50px;color: #777777">元</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="cleanDetails.appraiseDate" class="closeDosh"></div>
                            <div v-if="cleanDetails.appraiseDate" class="input-info">
                                <div  class="closeTitle">评价信息</div>
                                <label-item class="item u-bottom-border margin1" title="评价星级" :skeletonLoading="skeletonLoading">
                                    <a-rate v-model="cleanDetails.star" />
                                </label-item>
                                <label-item class="item margin1" title="问题是否已解决" :skeletonLoading="skeletonLoading">
                                    <span style="color: #0A87F8" v-if="cleanDetails.appraiseIsSolve==1">已解决</span>
                                    <span style="color: #FB4246" v-if="cleanDetails.appraiseIsSolve==0">未解决</span>
                                </label-item>
                                <label-item class="item margin2" title="评价时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(cleanDetails.appraiseDate).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item  class="item" style="width: 100%;" title="评价内容" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.appraiseContent|blankVal}}</span>
                                </label-item>
                            </div>
                            <div v-if="cleanDetails.status==5" class="closeDosh"></div>
                            <div v-if="cleanDetails.status==5" class="input-info">
                                <div  class="closeTitle">取消详情</div>
                                <label-item class="item u-bottom-border margin1" title="取消人" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.cancelUserName|blankVal}}</span>
                                </label-item>
                                <label-item class="item margin1" title="取消时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(cleanDetails.cancelDate).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;" title="取消原因" :skeletonLoading="skeletonLoading">
                                    <span>{{cleanDetails.cancelReason|blankVal}}</span>
                                </label-item>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>{{cleanDetails.creater}}创建于 {{$moment(cleanDetails.createTime).format('lll')}}</span>
                            <span>{{cleanDetails.updater}}更新于 {{$moment(cleanDetails.updateTime).format('lll')}}</span>
                        </div>
                    </a-tab-pane>
                    <div slot="tabBarExtraContent" class="tabs-options" v-show="!skeletonLoading">
                        <div v-if="outterMarkList.indexOf('mk_workorder_clean_pd')>-1&&cleanDetails.status==1" @click="assignmentClean(1)" v-mark="['mk_workorder_clean_pd']">
                            <icon-font type="iconyumengtubiao_zhipai" />
                            <span>&nbsp;派单</span>
                        </div>
                        <div v-if="outterMarkList.indexOf('mk_workorder_clean_gp')>-1&&cleanDetails.status==2" @click="assignmentClean(2)" v-mark="['mk_workorder_clean_gp']">
                            <icon-font type="iconyumengtubiao_zhipai" />
                            <span>&nbsp;改派</span>
                        </div>
                        <div v-if="outterMarkList.indexOf('mk_workorder_clean_wc')>-1&&(cleanDetails.status==1||cleanDetails.status==2)" @click="completeClean" v-mark="['mk_workorder_clean_wc']">
                            <icon-font type="iconyumengtubiao_jihuo" />
                            <span>&nbsp;完成</span>
                        </div>
                        <div v-if="outterMarkList.indexOf('mk_workorder_clean_bjgd')>-1&&(cleanDetails.status==1||cleanDetails.status==2)" @click="editClean" v-mark="['mk_workorder_clean_bjgd']">
                            <icon-font type="iconyumengtubiao_bianji-" />
                            <span>&nbsp;编辑</span>
                        </div>
                        <div v-if="outterMarkList.indexOf('mk_workorder_clean_qxgd')>-1&&(cleanDetails.status==1||cleanDetails.status==2)" @click="cancelClean" v-mark="['mk_workorder_clean_qxgd']">
                            <icon-font type="iconyumengtubiao_jinyong" />
                            <span>&nbsp;取消</span>
                        </div>
                        <div v-if="cleanDetails.status==3&&cleanDetails.isAcceptance==1" @click="checkClean" v-mark="['mk_workorder_clean_ysgd']">
                            <icon-font type="iconyumengtubiao_jihuo" />
                            <span>&nbsp;验收</span>
                        </div>
                        <div v-if="(cleanDetails.status==3||cleanDetails.status==4)&&cleanDetails.showAppraisalButton==1&&!cleanDetails.appraiseDate" @click="rateClean" v-mark="['mk_workorder_clean_pjgd']">
                            <icon-font type="iconyumengtubiao_bianji-1" />
                            <span>&nbsp;评价</span>
                        </div>
                        <div v-if="cleanDetails.status==5" @click="deleteChild" v-mark="['mk_workorder_clean_scgd']">
                            <icon-font type="iconyumengtubiao_shanchu-" />
                            <span>&nbsp;删除</span>
                        </div>
                        <div v-if="outterMarkList.indexOf('mk_workorder_clean_glfy')>-1&&!cleanDetails.houseId" @click="associated" v-mark="['mk_workorder_clean_glfy']">
                            <icon-font type="icon-yumengtubiao_guanlian" />
                            <span>&nbsp;关联房源</span>
                        </div>
                        <a-popover :title="null" placement="bottomRight" v-if="showMoreOperate">
                            <template slot="content">
                                <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('mk_workorder_clean_qxgd')>-1&&(cleanDetails.status==1||cleanDetails.status==2)" v-mark="['mk_workorder_clean_qxgd']" @click.stop="cancelClean" class="action cursor">取消</div>
                                <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('mk_workorder_clean_glfy')>-1&&!cleanDetails.houseId" v-mark="['mk_workorder_clean_glfy']" @click.stop="associated" class="action cursor">关联房源</div>
                            </template>
                            <div><icon-font type="iconyumengtubiao_gengduo-1" />&nbsp;更多</div>
                        </a-popover>
                    </div>
                </a-tabs>
            </div>
        </div>
        <div class="right-detail f-fr">
            <a-tabs size="small" defaultActiveKey="1">
                <a-tab-pane key="1">
                    <span slot="tab">
                        派单记录
                    </span>
                    <div style="margin-top: 15px;"></div>
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
                    <a-empty v-show="cleanDetails.recordsDTOList&&cleanDetails.recordsDTOList.length === 0&&!skeletonLoading" style="margin-top:100px;"/>
                    <div class="content-follow" v-for="(record,index) in cleanDetails.recordsDTOList" :key="index" v-show="!skeletonLoading">
                        <div class="content-follow-left">
                            <span class="radius-font-record radius-font-follow">{{record.dispatchType==1?'派单':'改派'}}</span>
                            <div class="content-follow-left-line" v-if="index<cleanDetails.recordsDTOList.length-1"></div>
                        </div>
                        <div class="content-follow-right">
                            <div class="follow-right-line-one clearfix">
                                <div class="name f-fl">
                                    <span style="color: #111111;font-size: 14px;">{{record.createrName}}</span>
                                    <span style="color: #0A87F8;font-size: 14px;">  {{record.dispatchType==1?'派单':'改派'}}</span>
                                    <span style="color:#777777;font-size: 14px;"> 给</span>
                                    <span style="color: #111111;font-size: 14px;"> {{record.currentHandlerName}}</span>
                                </div>
                                <div class="data f-fr">{{$moment(record.createTime).format('YYYY.MM.DD HH:mm')}}</div>
                            </div>
                            <div class="follow-right-line-two" style="margin-top: 5px">{{record.dispatchComment}}</div>
                        </div>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
        <!-- 关联房源弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="associatedDialog" class="ownModalBorder titDialog" title="关联房源" @cancel="refreshPageOnlyCancel">
            <associated-detail :infoData="cleanDetails" @cancelAssociated="refreshPageOnlyCancel" @successAssociated="refreshPage"></associated-detail>
        </a-modal>
        <!-- 取消工单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="cancelCleanDialog" class="ownModalBorder titDialog" title="取消工单" @cancel="refreshPageOnlyCancel">
            <cancel-clean :infoData="cleanDetails" @cancelCancel="refreshPageOnlyCancel" @successCancel="refreshPage"></cancel-clean>
        </a-modal>
        <!-- 派单/改派 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignmentDialog" class="ownModalBorder titDialog" :title="assignmentTitle" @cancel="refreshPageOnlyCancel">
            <assignment-detail :cleanId="cleanId" :assignmentType="assignmentType" @cancelAssignment="refreshPageOnlyCancel" @successAssignment="refreshPage"></assignment-detail>
        </a-modal>
        <!-- 完成 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="completeDialog" class="ownModalBorder titDialog" title="完成工单" @cancel="refreshPageOnlyCancel">
            <complete-detail :cleanId="cleanId" :deptId="cleanDetails.deptId" @cancelComplete="refreshPageOnlyCancel" @successComplete="refreshPage"></complete-detail>
        </a-modal>
        <!-- 评价工单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="rateDialog" class="ownModalBorder titDialog" title="取消工单" @cancel="refreshPageOnlyCancel">
            <rate-clean :cleanId="cleanId" @cancelRate="refreshPageOnlyCancel" @successRate="refreshPage"></rate-clean>
        </a-modal>
        <!-- 验收工单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="checkDialog" class="ownModalBorder titDialog" title="评价工单" @cancel="refreshPageOnlyCancel">
            <check-clean :cleanId="cleanId" @cancelCheck="refreshPageOnlyCancel" @successCheck="refreshPage"></check-clean>
        </a-modal>
        <!--修改工单-->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addCleanDialog" class="ownModalBorder titDialog" title="编辑工单信息" @cancel="refreshPageOnlyCancel">
            <add-clean :cleanId="cleanId" @cancelSave="refreshPageOnlyCancel" @successSave="refreshPage"></add-clean>
        </a-modal>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import  * as API from '@/api/workorder';
import AssociatedDetail from './associated';
import AssignmentDetail from './assignment';
import CompleteDetail from './complete';
import RateClean from './rate';
import CancelClean from './cancel';
import CheckClean from './check';
import AddClean from './add';
const allMarkList = [
    'mk_workorder_clean_pd','mk_workorder_clean_gp','mk_workorder_clean_wc',
    'mk_workorder_clean_bjgd','mk_workorder_clean_qxgd','mk_workorder_clean_glfy'
];
export default {
    name: "cleanDetails",
    props: {
        cleanId:{
            type: String,
            required: true
        },
    },
    components: {
        RateClean,
        CancelClean,
        AssociatedDetail,
        AssignmentDetail,
        CompleteDetail,
        CheckClean,
        AddClean,
    },
    data() {
        return {
            key:1,
            activekey: 1,
            activeIndex: 0,
            dateFormat: 'YYYY.MM.DD HH:mm',           //日期选择器格式
            cleanDetails:{},                         //维修详情
            associatedDialog:false,
            cancelCleanDialog:false,
            assignmentDialog:false,
            completeDialog:false,
            rateDialog:false,
            checkDialog:false,
            addCleanDialog:false,
            assignmentTitle:'',
            assignmentType:'',
            previewVisible:false,
            previewImage: '',
            skeletonLoading:true,
            showMoreOperate:false,          //是否显示更多按钮
            markList:[],                    //所有的权限mark、排序后
            innerMarkList:[],               //更多里面的mark
            outterMarkList:[],              //更多外面的mark
        }
    },
    created() {
        this.initData();
    },
    mounted() {
    },
    methods: {
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(url) {
            this.previewImage = url;
            this.previewVisible = true;
        },
        refreshPageOnlyCancel(){
            this.addCleanDialog = false;
            this.associatedDialog = false;
            this.cancelCleanDialog = false;
            this.completeDialog = false;
            this.rateDialog = false;
            this.checkDialog = false;
            this.assignmentDialog = false;
        },
        refreshPage(){
            this.addCleanDialog = false;
            this.associatedDialog = false;
            this.cancelCleanDialog = false;
            this.completeDialog = false;
            this.rateDialog = false;
            this.checkDialog = false;
            this.assignmentDialog = false;
            this.initData();
            this.$emit('refreshinfoFun', true);
        },
        initData(){
            this.skeletonLoading = true;
            API.cleanView(this.cleanId ).then(res=>{
                this.cleanDetails = res.data;
                if(!this.cleanDetails.cleanPicList){
                    this.cleanDetails.cleanPicList=[];
                }
                if(!this.cleanDetails.completePicList){
                    this.cleanDetails.completePicList=[];
                }
                //显示更多按钮
                this.getPermission();
                this.skeletonLoading = false;
            })
        },
        getPermission(){
            //按钮权限处理
            this.markList = allMarkList;
            let temp = [];
            if(this.cleanDetails.status == 1){
                //待处理
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if (value.mark == "mk_workorder_clean_pd"||value.mark == "mk_workorder_clean_wc"||value.mark == "mk_workorder_clean_bjgd"||value.mark == "mk_workorder_clean_qxgd"){
                        temp.push(value.mark);
                    }
                    if(value.mark == "mk_workorder_clean_glfy"&&!this.cleanDetails.houseId){
                        temp.push(value.mark);
                    }
                });
            }
            else if(this.cleanDetails.status==2){
                //处理中
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if (value.mark == "mk_workorder_clean_gp"||value.mark == "mk_workorder_clean_wc"||value.mark == "mk_workorder_clean_bjgd"||value.mark == "mk_workorder_clean_qxgd"){
                        temp.push(value.mark);
                    }
                    if(value.mark == "mk_workorder_clean_glfy"&&!this.cleanDetails.houseId){
                        temp.push(value.mark);
                    }
                });
            }
            else{
                //其他 -关联房源
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if(value.mark == "mk_workorder_clean_glfy"&&!this.cleanDetails.houseId){
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
        assignmentClean(val){
            this.assignmentDialog = true;
            this.assignmentType = val;
            if(val==1){
                this.assignmentTitle = '派单';
            }
            else if(val == 2){
                this.assignmentTitle = '改派';
            }
        },
        completeClean(){
            this.completeDialog = true;
        },
        editClean(){
            this.addCleanDialog = true;
        },
        cancelClean(){
            this.cancelCleanDialog = true;
        },
        checkClean(){
            this.checkDialog = true;
        },
        rateClean(){
            this.rateDialog = true;
        },
        associated() {
            this.associatedDialog = true;
        },
        deleteChild() {
            let _this = this;
            let id = this.cleanId;
            this.$modal.confirm({
                title: '确定要删除 「' + this.cleanDetails.applyName + '/' + this.cleanDetails.applyPhone + '」 保洁的工单信息吗？',
                content: '删除后将不可恢复',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    API.cleanDelete(id).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            _this.$message.success('删除成功！');
                            _this.$emit('cancelDetails');
                        }else{
                            _this.$message.error('删除失败！');
                        }
                    })
                },
                onCancel() {
                },
            });
        },
    },
    filters: {
        visitTimeVal(val) {
            return val == 1 ? '9:00-13:00' : val == 2 ? '13:00-18:00' : val == 3 ? '18:00-22:00': '-';
        },
        cleanTypeVal(val) {
            return val == 1 ? '日常保洁' : val == 2 ? '深度保洁' : val == 3 ? '开荒保洁' : val == 4 ? '擦玻璃' : val == 5 ? '空调清理' : val == 6 ? '油烟机清洗' : val == 7 ? '冰箱清洗' : val == 8 ? '除螨清洁' : val == 9 ? '皮质家具护理' : val == 10 ? '其他': '-';
        },
        blankVal(val){
            if(!val){
                return '-';
            }else{
                return  val;
            }
        },
    }

}
</script>

<style scoped lang="less">
.clean-detail-box {
    width: 1000px;
    background: rgba(247,248,251,1);
    position:relative;
    & /deep/ .form-input-item{
        margin-top: 10px;
    }
    & /deep/ .input-item-box{
        margin-top: 2px;
    }
    .left-detail {
        width: 640px;
        height: calc(100vh - 100px);
        overflow: auto;
        background: #FFFFFF;
        .top {
            padding: 60px 20px 0 20px;
            position: relative;
            .title {
                display: flex;
                align-items: center;
                width: 138px;
                margin-top: 15px;
                height: 75px;
                padding-bottom: 10px;
                border-right: 1px dashed @borderColor;
                .statusColor{
                    color: #111111;
                }
                .big-radius-font {
                    display: inline-block;
                    margin-right: 10px;
                    width: 44px;
                    height: 44px;
                    line-height: 44px ;
                    font-size: 14px;
                    text-align: center;
                    border-radius: 50%;
                    svg {
                        width: 28px;
                        height: 28px;
                        margin-top: 7px;
                    }
                }
                .status1 {
                    background: fade(#FB4246,10%);
                    color: #FB4246;
                }
                .statusColor1{
                    color: #FB4246;
                }
                .status2 {
                    background: fade(#03C683,10%);
                    color: #03C683;
                }
                .statusColor2{
                    color: #03C683;
                }
                .status3 {
                    background: fade(#FFA036,10%);
                    color: #FFA036;
                }
                .statusColor3{
                    color: #FFA036;
                }
                .status4 {
                    background: fade(#0A87F8,10%);
                    color: #0A87F8;
                }
                .statusColor4{
                    color: #0A87F8;
                }
                .status5 {
                    background: fade( #777777,10%);
                    color:  #777777;
                }
                .statusColor5{
                    color:  #777777;
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
            .address{
                width: 100%;
                height: 40px;
                background: #e9f1ff;
                opacity: 0.99;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #777777;
                line-height: 40px;
                position: absolute;
                top: 0px;
                left: 0px;
            }
        }

        .tabs-content {
            padding: 0 18px;
            .basic-info {
                .input-info {
                    display: flex;
                    flex-wrap: wrap;
                    .showImg {
                        >div {
                            height: 76px;
                            width: 120px;
                            margin-right: 10px;
                            margin-bottom: 10px;
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
                    .margin1{
                        margin-right: 40px;
                    }
                    margin2{
                        margin-right: 20px;
                    }
                    .item {
                        width: 160px;
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
                        margin-top: 5px;
                        margin-right: 5px;
                        text-align:center;
                        background:rgba(246,247,248,1);
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
                .basicsInfo{
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    .item{
                        display: flex;
                        justify-content: flex-start;
                        margin-right: 15px;
                        .left{
                            width:174px;
                            height:58px;
                            background:rgba(250,250,250,1);
                            .left-top{
                                margin-top: 4px;
                                margin-left: 4px;
                                .name{
                                    color: #777777;
                                    font-size: 12px;
                                }
                                .mustFill{
                                    margin-left: 2px;
                                    color: #FB4246;
                                }
                            }
                            .left-bottom{
                                margin-left: 4px;
                                margin-top: 5px;
                                color: #BBBBBB;
                                position: relative;
                                font-size: 13px;
                                .man-style{
                                    font-size: 12px;
                                    position: absolute;
                                    right: 33px;
                                    top:1px;
                                }
                                .woman-style{
                                    font-size: 12px;
                                    position: absolute;
                                    right: 5px;
                                    top:1px;
                                }
                            }
                        }
                        .right{
                            width:72px;
                            height:58px;
                            background:rgba(246,247,251,1);
                            border-top-right-radius: 2px;
                            border-bottom-right-radius: 2px;
                            display: flex;
                            flex-direction:column;
                            justify-content : center;
                            .secondLine{
                                i{
                                    vertical-align: -0.1em !important;
                                }
                            }
                            .mustFillFont{
                                color: #777777;
                                font-size: 12px;
                                text-align: left;
                                margin-left: 6px;
                                i{
                                    vertical-align: -0.2em;
                                }
                                svg{
                                    width: 12px;
                                    height: 12px;
                                }
                                .unEditStyle{
                                    margin-right: 2px;
                                    color: #BBBBBB;
                                }
                                .editStyle{
                                    margin-right: 2px;
                                    color: #777777;
                                }
                                .notChangeStyle{
                                    margin-right: 2px;
                                    color: #DDDDDD;
                                }
                                .selectStyle{
                                    color: #0A87F8;
                                }
                            }
                            .margin-top-3{
                                margin-top: 3px;
                            }
                        }
                        .blankBg{
                            background-color: #FFFFFF !important;
                        }
                        .bottomBlankBg{
                            background-color: #FFFFFF !important;
                            border-bottom: 1px solid rgba(221,221,221,1);
                        }
                    }
                    .margin-top-13{
                        margin-top: 13px;
                    }
                    .margin-top-25{
                        margin-top: 25px;
                    }
                    .table{
                        width: 880px;
                        border-left: 1px solid #EEEEEE;
                        border-top: 1px solid #EEEEEE;
                        font-size: 12px;
                        .table-title{
                            display: flex;
                            //background-color: @themeBgColor;
                            background:rgba(246,247,251,1);
                            color: #666666;
                            & > div {
                                flex: 1;
                                height: 40px;
                                line-height: 40px;
                                border-right: 1px solid #EEEEEE;
                                border-bottom: 1px solid #EEEEEE;
                            }
                            .mustFill{
                                margin-left: 2px;
                                color: #FB4246;
                            }
                        }
                        .house-data {
                            display: flex;
                            & > div {
                                flex: 1;
                                height: 40px;
                                line-height: 40px;
                                text-align: left;
                                border-right: 1px solid #EEEEEE;
                                border-bottom: 1px solid #EEEEEE;
                                background-color: #ffffff;
                                .house-data-item-left{
                                    height: 40px;
                                    line-height: 40px;
                                }
                                .delete-icon {
                                    color: red;
                                    font-size: 14px;
                                }
                            }
                            /deep/ .ant-select-selection__rendered{
                                font-size: 12px;
                                margin-left: 0;
                            }
                            /deep/ .ant-select-arrow i{
                            }
                            /deep/ .ant-select-selection__rendered{
                                margin-right: 0;
                            }
                            /deep/ .ant-input{
                                font-size: 12px;
                            }
                            /deep/ .ant-checkbox-inner{
                                width: 12px;
                                height: 12px;
                            }
                            .addonAfterStyle{
                                font-size: 12px;
                                color: #111111;
                                right: 2px;
                            }
                        }
                        .mustFillStyle{
                            /deep/ svg{
                                width: 12px;
                                height: 12px;
                            }
                            .mustFillFont{
                                color: #777777;
                                font-size: 13px;
                                .editStyle{
                                    margin-right: 2px;
                                    color: #777777;
                                }
                            }
                        }
                    }
                    .add-subject-style{
                        width: 104px;
                        height: 38px;
                        line-height: 38px;
                        font-size: 14px;
                        border-radius:4px;
                        border:1px solid rgba(10,135,248,1);
                        text-align: center;
                        color: #0A87F8;
                        i{
                            vertical-align: 0em;
                            margin-right: 4px;
                        }
                        svg{
                            width: 12px;
                            height: 12px;
                        }
                    }
                    .continueAddStyle{
                        font-size: 14px;
                        color: #0A87F8;
                        text-align: center !important;
                        i{
                            vertical-align: 0em;
                            margin-right: 8px;
                        }
                        svg{
                            width: 12px;
                            height: 12px;
                        }
                    }
                }
                .closeDosh{
                    width: 100%;
                    height: 2px;
                    border-bottom: 1px dashed #DDDDDD;
                }
            }
        }
    }
    .right-detail{
        padding:0 20px 0 20px;
        width: 352px;
        height: calc(100vh - 100px);
        background: #FFFFFF;
        overflow: auto;
        .content-follow{
            margin-top: 5px;
            display: flex;
            justify-content: flex-start;
            .content-follow-left{
                width: 32px;
                .content-follow-left-line{
                    margin: 0 0 0 20px;
                    height: calc(100% - 34px);
                    border-left: 0.5px dashed #AED4F5;
                }
            }
            .content-follow-right{
                margin-left: 15px;
                width: 250px;
                margin-top: 10px;
                margin-bottom: 19px;
                .follow-right-line-one{
                    .name{
                        font-size: 14px;
                        color: #111111;
                        font-weight:400;
                    }
                    .date{
                        color: #999999;
                        font-size: 12px;
                    }
                }
                .follow-right-line-two{
                    font-size: 13px;
                    color: #999999;
                }
                .follow-info{
                    margin-top: 6px;
                    width: 269px;
                    min-height: 29px;
                    line-height:29px;
                    background-color: rgba(247,248,251,1);
                }
            }
        }
        .no-info{
            width: 100%;
            position: relative;
            img{
              width: 100%;  
            }
            span{
               position: absolute;
               top:88px;
               left: 106px;
               font-size:12px;
               font-family:PingFangSC-Regular,PingFang SC;
               font-weight:400;
               color:#4A6DB2;
            }
        }
        .skeletonLoadingListStyle{
            width: 100%;
        }
    }
    .add-follow{
        position: absolute;
        bottom: 10px;
        right: 10px;
        border: 1px solid #DDDDDD;
        width: 332px;
        height: 40px;
        line-height: 40px;
        padding: 0px 10px 0 10px;
    }
    .add-follow-detail{
        position: absolute;
        bottom: 10px;
        right: 10px;
        border: 1px solid #DDDDDD;
        width: 332px;
        height: 187px;
        padding: 0px 10px 0 10px;
        .followType{
            height: 43px;
            border-bottom: 1px solid #EEEEEE;
            .normal{
                width:54px;
                height:24px;
                line-height: 24px;
                background:rgba(255,255,255,1);
                border-radius:4px;
                border:1px solid rgba(221,221,221,1);
                color: #111111;
                font-size: 13px;
                margin-right: 8px;
                text-align: center;
                margin-top: 10px;
            }
            .click{
                width:54px;
                height:24px;
                line-height: 24px;
                background:rgba(255,255,255,1);
                border-radius:4px;
                border:1px solid rgba(10,135,248,1);
                color: #0A87F8;
                font-size: 13px;
                margin-right: 8px;
                text-align: center;
                margin-top: 10px;
            }
        }
        .send{
            width:54px;
            height:22px;
            background:rgba(10,135,248,1);
            border-radius:4px;
            color: #FFFFFF;
            font-size: 14px;
            text-align: center;
        }
        .isReserveBeltSee{
            & /deep/ .ant-input{
                width: 150px;
            }
        }
    }
    .bottom {
        margin: 0;
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
        font-size: 14px;
        color: #FFA036;
        text-align: center;
        background-color: fade(#FFA036, 10%);
        border-radius: 16px;
    }
    .radius-font-record {
        display: inline-block;
        margin-right: 10px;
        width: 40px;
        height: 40px;
        line-height: 40px ;
        font-size: 12px;
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
        background: fade(#03C683,10%);
        color: #03C683;
    }
    .radius-font-red{
        color: #F84246;
    }
    .radius-font-follow {
        color: #0A87F8;
        background-color: rgba(10, 135, 248, 0.1);
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
    .active {
        border-color: @themeColor!important;
        color: @themeColor!important;
    }
    /deep/ .label-item .title{
        margin-top: 0px;
    }
    & /deep/ .ant-popover {
        position: fixed;
        .ant-popover-inner-content {
            padding: 0;
            width: 100px;
            .action {
                padding: 8px 18px;
            }
            .action:hover {
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
}
</style>
