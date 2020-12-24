<template>
    <div class="complaint-detail-box clearfix">
        <div class="left-detail f-fl">
            <div class="top f-clearfix">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top: 3px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span style="margin-top: 3px;" class="big-radius-font status1" v-if="complaintDetails.status==1&&!skeletonLoading"><icon-font type="icontousu" /></span>
                    <span style="margin-top: 3px;"  class="big-radius-font status2" v-else-if="complaintDetails.status==2&&!skeletonLoading"><icon-font type="icontousu" /></span>
                    <span style="margin-top: 3px;"  class="big-radius-font status3" v-else-if="complaintDetails.status==3&&!skeletonLoading"><icon-font type="icontousu" /></span>
                    <span style="margin-top: 3px;"  class="big-radius-font status4" v-else-if="complaintDetails.status==4&&!skeletonLoading"><icon-font type="icontousu" /></span>
                    <span style="margin-top: 3px;"  class="big-radius-font status5" v-else-if="complaintDetails.status==5&&!skeletonLoading"><icon-font type="icontousu" /></span>
                    <div>
                        <label-item title="当前状态">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div class="statusColor" v-if="complaintDetails.status==1&&!skeletonLoading">待处理</div>
                            <div class="statusColor" v-else-if="complaintDetails.status==2&&!skeletonLoading">处理中</div>
                            <div class="statusColor" v-else-if="complaintDetails.status==3&&!skeletonLoading">待验收</div>
                            <div class="statusColor" v-else-if="complaintDetails.status==4&&!skeletonLoading">已完成</div>
                            <div class="statusColor" v-else-if="complaintDetails.status==5&&!skeletonLoading">已取消</div>
                        </label-item>
                    </div>
                </div>
                <div class="address" v-if="!skeletonLoading">
                    <div style="margin-left: 10px;">{{complaintDetails.houseAlias}}-{{complaintDetails.fullAddress}}</div>
                </div>
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:240px">
                        <span class="radius-font radius-font-person">
                            <icon-font type="iconyumengtubiao_weifenpeirenyuan" />
                        </span>
                        <label-item title="投诉人信息" :skeletonLoading="skeletonLoading">
                            <div>{{complaintDetails.applyName|blankVal}} - {{complaintDetails.applyPhone|blankVal}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:160px">
                        <span class="radius-font">
                            <icon-font type="icon-yumengtubiao_weixiubaojieleixing" />
                        </span>
                        <label-item title="投诉类型" :skeletonLoading="skeletonLoading">
                            <div>{{complaintDetails.complaintTypeName}}</div>
                        </label-item>
                    </div>
                </div>
                <div class="address" v-if="!skeletonLoading">
                    <div style="margin-left: 20px;">{{complaintDetails.houseAlias?complaintDetails.houseAlias+'/':''}}{{complaintDetails.cityName?complaintDetails.cityName:''}}{{complaintDetails.areaName?complaintDetails.areaName:''}}{{complaintDetails.fullAddress}}</div>
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
                                <label-item class="item u-bottom-border margin1" title="投诉人姓名" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.applyName|blankVal}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border margin1" title="投诉人电话" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.applyPhone|blankVal}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border margin2" title="投诉类型" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.complaintTypeName}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border margin1" title="提交时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(complaintDetails.createTime).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item class="item" title="投诉内容" style="width: 100%;" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.promotionDesc|blankVal}}</span>
                                </label-item>
                                <label-item class="item" title="附件" style="width: 100%;" :skeletonLoading="skeletonLoading">
                                    <div  class="showImg f-clearfix">
                                        <span v-if="!complaintDetails.faultPicList||complaintDetails.faultPicList.length==0">-</span>
                                        <div class="f-fl cursor" v-for="(item,i) in complaintDetails.faultPicList" :key="i">
                                            <video v-if="'mp4,avi,mov'.indexOf(item.fileExt)>-1" style="width: 120px;height: 76px;border-radius: 4px" :src="item.origin" controls="controls"></video>
                                            <div v-else @click="handlePreview(item.origin)"><img :src="item.small" alt=""></div>
                                        </div>
                                    </div>
                                </label-item>
                            </div>
                            <div v-if="complaintDetails.status==3||complaintDetails.status==4" class="closeDosh"></div>
                            <div v-if="complaintDetails.status==3||complaintDetails.status==4" class="input-info">
                                <div  class="closeTitle">完成信息</div>
                                <label-item class="item u-bottom-border margin1" title="处理人" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.completeUserName}}</span>
                                </label-item>
                                <label-item class="item margin1" title="处理时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(complaintDetails.completeDate).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item class="item margin2" title="处理结果" :skeletonLoading="skeletonLoading">
                                    <span style="color: #0A87F8" v-if="complaintDetails.completeIsSolve==1">已解决</span>
                                    <span style="color: #FB4246" v-if="complaintDetails.completeIsSolve==0">未解决</span>
                                </label-item>
                                <label-item v-if="complaintDetails.completeIsSolve==1" class="item" style="width: 100%;" title="处理内容" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.complaintContent}}</span>
                                </label-item>
                                <label-item v-if="complaintDetails.completeIsSolve==0" class="item" style="width: 100%;" title="未解决原因" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.complaintContent}}</span>
                                </label-item>
                                <label-item title="附件" style="width: 100%;margin-bottom: 10px" :skeletonLoading="skeletonLoading">
                                    <div  class="showImg f-clearfix">
                                        <span v-if="!complaintDetails.completePicList||complaintDetails.completePicList.length==0">-</span>
                                        <div class="f-fl cursor" v-for="(item,i) in complaintDetails.completePicList" :key="i">
                                            <div @click="handlePreview(item.origin)"><img :src="item.small" alt=""></div>
                                        </div>
                                    </div>
                                </label-item>
                            </div>
                            <div v-if="complaintDetails.acceptingDate&&complaintDetails.status==4" class="closeDosh"></div>
                            <div v-if="complaintDetails.acceptingDate&&complaintDetails.status==4" class="input-info">
                                <div  class="closeTitle">验收信息</div>
                                <label-item class="item u-bottom-border margin1" title="验收人" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.acceptingUserName|blankVal}}</span>
                                </label-item>
                                <label-item class="item margin1" title="验收时间" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.acceptingDate?$moment(complaintDetails.acceptingDate).format('YYYY.MM.DD HH:mm'):''}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;" title="验收备注" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.acceptingComment|blankVal}}</span>
                                </label-item>
                            </div>
                            <div v-if="complaintDetails.appraiseDate" class="closeDosh"></div>
                            <div v-if="complaintDetails.appraiseDate" class="input-info">
                                <div  class="closeTitle">评价信息</div>
                                <label-item class="item u-bottom-border margin1" title="评价星级" :skeletonLoading="skeletonLoading">
                                    <a-rate v-model="complaintDetails.star" />
                                </label-item>
                                <label-item class="item margin1" title="问题是否已解决" :skeletonLoading="skeletonLoading">
                                    <span style="color: #0A87F8" v-if="complaintDetails.appraiseIsSolve==1">已解决</span>
                                    <span style="color: #FB4246" v-if="complaintDetails.appraiseIsSolve==0">未解决</span>
                                </label-item>
                                <label-item class="item margin2" title="评价时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(complaintDetails.appraiseDate).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item  class="item" style="width: 100%;" title="评价内容" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.appraiseContent|blankVal}}</span>
                                </label-item>
                            </div>
                            <div v-if="complaintDetails.status==5" class="closeDosh"></div>
                            <div v-if="complaintDetails.status==5" class="input-info">
                                <div  class="closeTitle">取消详情</div>
                                <label-item class="item u-bottom-border margin1" title="取消人" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.cancelUserName|blankVal}}</span>
                                </label-item>
                                <label-item class="item margin1" title="取消时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(complaintDetails.cancelDate).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;" title="取消原因" :skeletonLoading="skeletonLoading">
                                    <span>{{complaintDetails.cancelReason|blankVal}}</span>
                                </label-item>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>{{complaintDetails.creater}}创建于 {{$moment(complaintDetails.createTime).format('lll')}}</span>
                            <span>{{complaintDetails.updater}}更新于 {{$moment(complaintDetails.updateTime).format('lll')}}</span>
                        </div>
                    </a-tab-pane>
                    <div slot="tabBarExtraContent" class="tabs-options" v-show="!skeletonLoading">
                        <div v-if="complaintDetails.status==1" @click="assignmentComplaint(1)" v-mark="['mk_workorder_complaint_pd']">
                            <icon-font type="iconyumengtubiao_zhipai" />
                            <span>&nbsp;派单</span>
                        </div>
                        <div v-if="complaintDetails.status==2" @click="assignmentComplaint(2)" v-mark="['mk_workorder_complaint_gp']">
                            <icon-font type="iconyumengtubiao_zhipai" />
                            <span>&nbsp;改派</span>
                        </div>
                        <div v-if="(complaintDetails.status==1||complaintDetails.status==2)" @click="completeComplaint" v-mark="['mk_workorder_complaint_wc']">
                            <icon-font type="iconyumengtubiao_jihuo" />
                            <span>&nbsp;完成</span>
                        </div>
                        <div v-if="(complaintDetails.status==1||complaintDetails.status==2)" @click="cancelComplaint" v-mark="['mk_workorder_complaint_qxgd']">
                            <icon-font type="iconyumengtubiao_jinyong" />
                            <span>&nbsp;取消</span>
                        </div>
                        <div v-if="complaintDetails.status==3&&complaintDetails.isAcceptance==1" @click="checkComplaint" v-mark="['mk_workorder_complaint_ysgd']">
                            <icon-font type="iconyumengtubiao_jihuo" />
                            <span>&nbsp;验收</span>
                        </div>
                        <div v-if="complaintDetails.status==5" @click="deleteChild" v-mark="['mk_workorder_complaint_scgd']">
                            <icon-font type="iconyumengtubiao_shanchu-" />
                            <span>&nbsp;删除</span>
                        </div>
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
                    <a-empty v-show="complaintDetails.recordsDTOList&&complaintDetails.recordsDTOList.length === 0&&!skeletonLoading" style="margin-top:100px;"/>
                    <div class="content-follow" v-for="(record,index) in complaintDetails.recordsDTOList" :key="index" v-show="!skeletonLoading">
                        <div class="content-follow-left">
                            <span class="radius-font-record radius-font-follow">{{record.dispatchType==1?'派单':'改派'}}</span>
                            <div class="content-follow-left-line" v-if="index<complaintDetails.recordsDTOList.length-1"></div>
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
        <!-- 取消工单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="cancelComplaintDialog" class="ownModalBorder titDialog" title="取消工单" @cancel="refreshPageOnlyCancel">
            <cancel-complaint :infoData="complaintDetails" @cancelCancel="refreshPageOnlyCancel" @successCancel="refreshPage"></cancel-complaint>
        </a-modal>
        <!-- 派单/改派 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignmentDialog" class="ownModalBorder titDialog" :title="assignmentTitle" @cancel="refreshPageOnlyCancel">
            <assignment-detail :complaintId="complaintId" :assignmentType="assignmentType" @cancelAssignment="refreshPageOnlyCancel" @successAssignment="refreshPage"></assignment-detail>
        </a-modal>
        <!-- 完成 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="completeDialog" class="ownModalBorder titDialog" title="完成工单" @cancel="refreshPageOnlyCancel">
            <complete-detail :complaintId="complaintId" @cancelComplete="refreshPageOnlyCancel" @successComplete="refreshPage"></complete-detail>
        </a-modal>
        <!-- 验收工单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="checkDialog" class="ownModalBorder titDialog" title="评价工单" @cancel="refreshPageOnlyCancel">
            <check-complaint :complaintId="complaintId" @cancelCheck="refreshPageOnlyCancel" @successCheck="refreshPage"></check-complaint>
        </a-modal>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import  * as API from '@/api/workorder';
import AssignmentDetail from './assignment';
import CompleteDetail from './complete';
import CancelComplaint from './cancel';
import CheckComplaint from './check';
export default {
    name: "complaintDetails",
    props: {
        complaintId:{
            type: String,
            required: true
        },
    },
    components: {
        CancelComplaint,
        AssignmentDetail,
        CompleteDetail,
        CheckComplaint,
    },
    data() {
        return {
            key:1,
            activekey: 1,
            activeIndex: 0,
            dateFormat: 'YYYY.MM.DD HH:mm',           //日期选择器格式
            complaintDetails:{},                         //维修详情
            cancelComplaintDialog:false,
            assignmentDialog:false,
            completeDialog:false,
            checkDialog:false,
            assignmentTitle:'',
            assignmentType:'',
            previewVisible:false,
            previewImage: '',
            skeletonLoading:true,
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
            this.cancelComplaintDialog = false;
            this.completeDialog = false;
            this.checkDialog = false;
            this.assignmentDialog = false;
        },
        refreshPage(){
            this.cancelComplaintDialog = false;
            this.completeDialog = false;
            this.checkDialog = false;
            this.assignmentDialog = false;
            this.initData();
            this.$emit('refreshinfoFun', true);
        },
        initData(){
            this.skeletonLoading = true;
            API.complaintView(this.complaintId ).then(res=>{
                this.complaintDetails = res.data;
                if(!this.complaintDetails.faultPicList){
                    this.complaintDetails.faultPicList=[];
                }
                if(!this.complaintDetails.completePicList){
                    this.complaintDetails.completePicList=[];
                }
                this.skeletonLoading = false;
            })
        },
        assignmentComplaint(val){
            this.assignmentDialog = true;
            this.assignmentType = val;
            if(val==1){
                this.assignmentTitle = '派单';
            }
            else if(val == 2){
                this.assignmentTitle = '改派';
            }
        },
        completeComplaint(){
            this.completeDialog = true;
        },
        cancelComplaint(){
            this.cancelComplaintDialog = true;
        },
        checkComplaint(){
            this.checkDialog = true;
        },
        deleteChild() {
            let _this = this;
            let id = this.complaintId;
            this.$modal.confirm({
                title: '确定要删除 「' + this.complaintDetails.applyName + '/' + this.complaintDetails.applyPhone + '」 保洁的工单信息吗？',
                content: '删除后将不可恢复',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    API.complaintDelete(id).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            _this.$message.success('删除成功！');
                            _this.$emit('deleteDetails');
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
.complaint-detail-box {
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
                border-right: 1px dashed @borderColor;
                .statusColor{
                    color: #111111;
                }
                .big-radius-font{
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
