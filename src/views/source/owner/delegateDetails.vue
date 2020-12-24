<template>
    <div class="delegateDetails-box">
        <div class="top f-clearfix">
            <div class="f-fl title">
                <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                <span style="margin-top: 9px;" class="radius-font status1" v-if="delegateDetails.status==1&&!skeletonLoading"><icon-font type="iconfangwuweituo-daichuli" /></span>
                <span style="margin-top: 9px;" class="radius-font status2" v-else-if="delegateDetails.status==2&&!skeletonLoading"><icon-font type="iconfangwuweituo-daichuli" /></span>
                <span style="margin-top: 9px;" class="radius-font status3" v-else-if="delegateDetails.status==3&&!skeletonLoading"><icon-font type="iconfangwuweituo-daichuli" /></span>
                <div style="padding-left: 5px;">
                    <label-item title="当前状态">
                        <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                        <div v-if="delegateDetails.status==1&&!skeletonLoading">待处理</div>
                        <div v-else-if="delegateDetails.status==2&&!skeletonLoading">已处理</div>
                        <div v-else-if="delegateDetails.status==3&&!skeletonLoading">已取消</div>
                    </label-item>
                </div>
            </div>
            <div class="f-fl detail">
                <div class="blank-box"></div>
                <div class="item">
                    <span style="margin-top: 7px;" class="radius-font radius-font-blue">
                        <icon-font type="iconyumengtubiao_jiaosequanxian" />
                    </span>
                    <label-item title="业主信息" :skeletonLoading="skeletonLoading">
                        <div>{{delegateDetails.name|blankVal}} - {{delegateDetails.phone|blankVal}}</div>
                    </label-item>
                </div>
                <div class="item">
                    <span style="margin-top: 7px;" class="radius-font radius-font-blue">
                        <icon-font type="iconyumengtubiao_dingwei" />
                    </span>
                    <label-item title="委托房源地址" :skeletonLoading="skeletonLoading">
                        <div>{{delegateDetails.cityName}} {{delegateDetails.fullAddress|blankVal}}</div>
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
                        <div class="input-info">
                            <label-item class="item u-bottom-border" style="margin-top: 5px;" title="来源" :skeletonLoading="skeletonLoading">
                                <span>{{delegateDetails.sourceName|blankVal}}</span>
                            </label-item>
                            <label-item class="item u-bottom-border" style="margin-top: 5px;" title="业主姓名" :skeletonLoading="skeletonLoading">
                                <span>{{delegateDetails.name|blankVal}}</span>
                            </label-item>
                            <label-item class="item u-bottom-border" style="margin-top: 5px;" title="业主电话" :skeletonLoading="skeletonLoading">
                                <span>{{delegateDetails.phone|blankVal}}</span>
                            </label-item>
                            <label-item class="item u-bottom-border " title="委托房源地址" :skeletonLoading="skeletonLoading">
                                <span>{{delegateDetails.cityName}} {{delegateDetails.fullAddress|blankVal}}</span>
                            </label-item>
                            <label-item class="item u-bottom-border" style="margin-top: 5px;" title="房屋户型" :skeletonLoading="skeletonLoading">
                                <span>{{delegateDetails.room|blankVal}}室{{delegateDetails.livingRoom|blankVal}}厅{{delegateDetails.kitchen|blankVal}}厨{{delegateDetails.toilet|blankVal}}卫</span>
                            </label-item>
                            <label-item class="item u-bottom-border" style="margin-top: 5px;" title="房屋面积" :skeletonLoading="skeletonLoading">
                                <span>{{delegateDetails.area?delegateDetails.area+'㎡':''}} </span>
                            </label-item>
                            <label-item class="item u-bottom-border" style="margin-top: 5px;" title="房屋朝向" :skeletonLoading="skeletonLoading">
                                <span>{{delegateDetails.orientationName|blankVal}}</span>
                            </label-item>
                            <label-item class="item u-bottom-border" style="margin-top: 5px;" title="期望租金" :skeletonLoading="skeletonLoading">
                                <span>{{delegateDetails.price?delegateDetails.price/100+'元':''}}</span>
                            </label-item>
                            <label-item class="item u-bottom-border" title="提交时间" :skeletonLoading="skeletonLoading">
                                <span>{{delegateDetails.createTime?$moment(delegateDetails.createTime).format('YYYY.MM.DD HH:mm'):'-'}}</span>
                            </label-item>
                            <label-item style="width: 100%" class="item u-bottom-border" title="委托备注" :skeletonLoading="skeletonLoading">
                                <span>{{delegateDetails.comment|blankVal}}</span>
                            </label-item>
                            <div class="doshed" v-if="delegateDetails.recordsDTOList&&delegateDetails.recordsDTOList.length>0"></div>
                            <div style="width:100%;margin: 20px 0;" v-if="delegateDetails.recordsDTOList&&delegateDetails.recordsDTOList.length>0">
                                <div class="resultTitle">处理结果</div>
                                <div class="follow-record-item clearfix" :key="index" v-for="(item,index) in delegateDetails.recordsDTOList">
                                    <div class="item-top">
                                        <div class="time-ago">{{item.createTime?$moment(item.createTime).format('YYYY.MM.DD HH:mm'):'-'}}</div>
                                        <div class="circle"></div>
                                        <div class="name">{{item.createrName}}</div>
                                        <div class="type-name">{{item.operateRecords}}</div>
                                    </div>
                                    <div class="content" :style="(index==delegateDetails.recordsDTOList.length-1)?'border-left:none;':''">
                                        <div class="" style="color:#777777;" v-if="item.reason">
                                            {{item.reason}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a-tab-pane>
                <div slot="tabBarExtraContent" class="tabs-options" v-show="!skeletonLoading">
                    <div v-if="delegateDetails.status==1||delegateDetails.status==2" v-mark="['mk_source_owner_fwwt_zp']" @click="openAssignUser()">
                        <icon-font type="iconyumengtubiao_zhipai"/>
                        <span>&nbsp;指派</span>
                    </div>
                    <div v-if="delegateDetails.status==1" v-mark="['mk_source_owner_fwwt_zrgp']" @click="changPublic()">
                        <icon-font type="iconzhuanrugongke"/>
                        <span>&nbsp;转入公盘</span>
                    </div>
                    <div v-if="delegateDetails.status==1" v-mark="['mk_source_owner_fwwt_zrsp']" @click="changePrivate()">
                        <icon-font type="iconzhuanrusike"/>
                        <span>&nbsp;转入私盘</span>
                    </div>
                    <div v-if="delegateDetails.status==1" v-mark="['mk_source_owner_fwwt_qx']" @click="openDelegateCancel()">
                        <icon-font type="iconyumengtubiao_jinyong"/>
                        <span>&nbsp;取消</span>
                    </div>
                </div>
            </a-tabs>
        </div>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignUserDialog" class="ownModalBorder titDialog" title="指派员工" @cancel="cancelAssignUser">
            <assign-user :sourceId="delegateId" :clueType="clueType" @cancelAssignUser="cancelAssignUser" @successAssignUser="successAssignUser"></assign-user>
        </a-modal>
        <!-- 取消预约 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="cancelDelegateDialog" class="ownModalBorder titDialog" title="取消预约" @cancel="cancelCancelDelegate">
            <cancel-delegate :infoData="delegateDetails" @cancelCancelDelegate="cancelCancelDelegate" @successCancelDelegate="successCancelDelegate"></cancel-delegate>
        </a-modal>
    </div>
</template>

<script>
import  * as API from '@/api/source';
import CancelDelegate  from './cancelDelegate';
import AssignUser from './assignUser';
export default {
    name: "delegateDetails",
    props: {
        delegateId:{
            type: String,
            required:true,
        }
    },
    components: {
        CancelDelegate,
        AssignUser,
    },
    data() {
        return{
            delegateDetails:{
                status:1,
            },
            skeletonLoading:false,
            assignUserDialog:false,
            clueType:3,
            cancelDelegateDialog:false,
        }
    },
    created() {
        this.initData();
    },
    mounted() {
    },
    methods: {
        changPublic(){
            let _this = this;
            this.$modal.confirm({
                title: '确定要将客户 「' + _this.delegateDetails.name+'/'+_this.delegateDetails.phone + '」 转入到公盘吗？',
                content: '转入后，会在公盘中新增一条记录',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    API.delegateTurnPubClue({id:_this.delegateDetails.id}).then(res=>{
                        if (res.code === '200') {
                            _this.$message.success('转入公盘成功');
                            _this.$emit('refreshinfoFun', true);
                            _this.initData();
                        } else {
                            _this.$message.success('转入公盘失败');
                            _this.initData();
                        }
                    })
                },
                onCancel() {
                },
            });
        },
        changePrivate(){
            let _this = this;
            this.$modal.confirm({
                title: '确定要将客户 「' + _this.delegateDetails.name+'/'+_this.delegateDetails.phone + '」 转入到自己的私盘吗？',
                content: '转入后，会在您的私盘中新增一条记录',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                onOk() {

                    API.delegateTurnPrivateClue({id:_this.delegateDetails.id}).then(res=>{
                        if (res.code === '200') {
                            _this.$message.success('转入私盘成功');
                            _this.$emit('refreshinfoFun', true);
                            _this.initData();
                        } else {
                            _this.$message.success('转入私盘失败');
                            _this.initData();
                        }
                    })
                },
                onCancel() {
                },
            });
        },
        openAssignUser(){
            this.assignUserDialog = true;
        },
        openDelegateCancel(){
            this.cancelDelegateDialog = true;
        },
        cancelCancelDelegate(){
            this.cancelDelegateDialog = false;
        },
        successCancelDelegate(){
            this.cancelDelegateDialog = false;
            this.$emit('refreshinfoFun', true);
            this.initData();
        },
        cancelAssignUser(){
            this.assignUserDialog = false;
        },
        successAssignUser(){
            this.assignUserDialog = false;
            this.$emit('refreshinfoFun', true);
            this.initData();
        },
        initData(){
            this.skeletonLoading = true;
            API.delegateView(this.delegateId).then(res=>{
                this.delegateDetails = res.data;
                if(this.delegateDetails.recordsDTOList == null){
                    this.delegateDetails.recordsDTOList = [];
                }
                this.skeletonLoading = false;
            })
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
.delegateDetails-box{
    width: 800px;
    height: calc(100vh - 100px);
    overflow: auto;
    background: #FFFFFF;
    .address{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #e9f1ff;
        opacity: 0.99;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #777777;
        line-height: 40px;
        padding-left: 20px;
    }
    .top {
        padding: 25px 20px 20px 20px;
        .title {
            display: flex;
            align-items: center;
            width: 138px;
            height: 40px;
            margin-top: 10px;
            padding-bottom: 5px;
            border-right: 1px dashed @borderColor;
            .radius-font {
                width: 44px;
                height: 44px;
                line-height: 44px;
                border-radius: 50%;
                font-size:28px;
                text-align: center;
            }
            .status1 {
                background: rgba(251,66,70,0.1);
                color: #FB4246;
            }
            .status2 {
                background: rgba(10, 135, 248, 0.1);
                color: #0A87F8;
            }
            .status3 {
                background: rgba(119, 119, 119, 0.1);
                color: #777777;
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
            padding-left: 40px;
            .item {
                display: flex;
                align-items: center;
                width: 250px;
                font-size: 12px; // padding-left: 40px;
                .radius-font {
                    font-size:18px;
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
            .radius-font {
                display: inline-block;
                margin-right: 10px;
                width: 32px;
                height: 32px;
                line-height: 32px ;
                font-size: 12px;
                text-align: center;
                border-radius: 16px;
            }
        }
    }

    .tabs-content {
        & /deep/ .ant-tabs-bar{
            margin: 0 18px;
        }
        /deep/ .ant-tabs .ant-tabs-small-bar .ant-tabs-tab{
            padding: 8px 16px 8px 0;
        }
        .basic-info {
            padding: 0 18px;
            .input-info {
                display: flex;
                flex-wrap: wrap;
                .item {
                    width: 32%;
                    margin-bottom: 20px;
                    & /deep/ .title {
                        margin-bottom: 4px;
                    }
                    & /deep/ .ant-select {
                        width: 100%;
                    }
                }
                .doshed{
                    width: 100%;
                    height: 2px;
                    border-bottom: 1px dashed #DDDDDD;
                }
                .resultTitle{
                    width: 100%;
                    color: #111111;
                    font-size: 18px;
                    height: 24px;
                    line-height: 24px;
                    margin-bottom: 25px;
                    font-weight:500;
                }
                .follow-record-item{
                    .item-top{
                        display: flex;
                        align-items: center;
                        .time-ago{
                            width: 113px;
                            font-size: 14px;
                            color: #777777;
                            line-height: 14px;
                        }
                        .name{
                            color: #111111;
                            font-size: 14px;
                            line-height: 14px;
                        }
                        .circle{
                            margin: 0 17px 0 15px;
                            width: 10px;
                            height: 10px;
                            background: rgba(10,135,248,1);
                            border:2px solid rgba(233,241,248,1);
                            border-radius: 50%;
                        }
                        .type-name{
                            margin-left: 10px;
                            font-size: 14px;
                            color: #111111;
                            font-weight: 500;
                            line-height: 14px;
                        }
                    }
                    .content{
                        margin-left: 132.5px;
                        padding: 10px 0 10px 15px;
                        text-align: left;
                        font-size: 14px;
                        border-left: 0.5px dashed #DDDDDD;
                        .color-blue{
                            line-height: 30px;
                            font-size: 14px;
                        }
                    }
                }
            }
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
    }
    .radius-font-blue {
        color: #0A87F8;
        background:rgba(10,135,248,0.1);
    }
    .radius-font-greed {
        color: #03C683;
        background-color: fade(#03C683, 10%);
    }
    .radius-font-yellow {
        color: #FFA036;
        background-color: fade(#FFA036, 10%);
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
