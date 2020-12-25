<template>
    <div class="complaint-detail-box clearfix">
        <div class="left-detail f-fl">
            <div class="top f-clearfix">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top: 3px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                    <span style="margin-top: 3px;" class="big-radius-font status1" v-if="suggestDetails.status==1"><icon-font type="iconjianyi" /></span>
                    <span style="margin-top: 3px;" class="big-radius-font status4" v-else-if="suggestDetails.status==2"><icon-font type="iconjianyi" /></span>
                    <span style="margin-top: 3px;" class="big-radius-font status5" v-else-if="suggestDetails.status==3"><icon-font type="iconjianyi" /></span>
                    <div>
                        <label-item title="当前状态">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                            <div class="statusColor" v-if="suggestDetails.status==1&&!skeletonLoading">待处理</div>
                            <div class="statusColor" v-else-if="suggestDetails.status==2&&!skeletonLoading">已处理</div>
                            <div class="statusColor" v-else-if="suggestDetails.status==3&&!skeletonLoading">已作废</div>
                        </label-item>
                    </div>
                </div>
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:240px">
                        <span class="radius-font radius-font-person">
                            <icon-font type="iconyumengtubiao_weifenpeirenyuan" />
                        </span>
                        <label-item title="建议人信息" :skeletonLoading="skeletonLoading">
                            <div>{{suggestDetails.applyName|blankVal}} - {{suggestDetails.applyPhone|blankVal}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:160px">
                        <span class="radius-font">
                            <icon-font type="icon-yumengtubiao_weixiubaojieleixing" />
                        </span>
                        <label-item title="建议类型" :skeletonLoading="skeletonLoading">
                            <div>{{suggestDetails.suggestTypeName|blankVal}}</div>
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
                                <label-item class="item u-bottom-border" style="width: 240px" title="建议人姓名" :skeletonLoading="skeletonLoading">
                                    <span>{{suggestDetails.applyName|blankVal}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border margin2" style="width: 240px" title="建议人电话" :skeletonLoading="skeletonLoading">
                                    <span>{{suggestDetails.applyPhone|blankVal}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border margin1" style="width: 240px" title="建议类型" :skeletonLoading="skeletonLoading">
                                    <span>{{suggestDetails.suggestTypeName|blankVal}}</span>
                                </label-item>
                                <label-item class="item u-bottom-border" style="width: 100%;" title="提交时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(suggestDetails.createTime).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;" title="建议内容"  :skeletonLoading="skeletonLoading">
                                    <span>{{suggestDetails.promotionDesc|blankVal}}</span>
                                </label-item>
                                <label-item class="item" title="附件" style="width: 100%;" :skeletonLoading="skeletonLoading">
                                    <div  class="showImg f-clearfix">
                                        <span v-if="!suggestDetails.fileList||suggestDetails.fileList.length==0">-</span>
                                        <div class="f-fl cursor" v-for="(item,i) in suggestDetails.fileList" :key="i">
                                            <video v-if="'mp4,avi,mov'.indexOf(item.fileExt)>-1" style="width: 120px;height: 76px;border-radius: 4px" :src="item.origin" controls="controls"></video>
                                            <div v-else @click="handlePreview(item.origin)"><img :src="item.small" alt=""></div>
                                        </div>
                                    </div>
                                </label-item>
                            </div>
                            <div v-if="suggestDetails.status==2" class="closeDosh"></div>
                            <div v-if="suggestDetails.status==2" class="input-info">
                                <div  class="closeTitle">完成信息</div>
                                <label-item class="item u-bottom-border margin1" title="处理人" :skeletonLoading="skeletonLoading">
                                    <span>{{suggestDetails.dealWithUserName|blankVal}}</span>
                                </label-item>
                                <label-item class="item margin1" title="处理时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(suggestDetails.dealWithDate).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;" title="处理结果" :skeletonLoading="skeletonLoading">
                                    <span>{{suggestDetails.dealWithContent|blankVal}}</span>
                                </label-item>
                            </div>
                            <div v-if="suggestDetails.status==3" class="closeDosh"></div>
                            <div v-if="suggestDetails.status==3" class="input-info">
                                <div  class="closeTitle">作废信息</div>
                                <label-item class="item u-bottom-border margin1" title="作废处理人" :skeletonLoading="skeletonLoading">
                                    <span>{{suggestDetails.obsoleteUserName|blankVal}}</span>
                                </label-item>
                                <label-item class="item margin1" title="作废时间" :skeletonLoading="skeletonLoading">
                                    <span>{{$moment(suggestDetails.obsoleteDate).format('YYYY.MM.DD HH:mm')}}</span>
                                </label-item>
                                <label-item class="item" style="width: 100%;" title="作废结果" :skeletonLoading="skeletonLoading">
                                    <span>{{suggestDetails.obsoleteContent|blankVal}}</span>
                                </label-item>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>{{suggestDetails.creater}}创建于 {{$moment(suggestDetails.createTime).format('lll')}}</span>
                            <span>{{suggestDetails.updater}}更新于 {{$moment(suggestDetails.updateTime).format('lll')}}</span>
                        </div>
                    </a-tab-pane>
                    <div slot="tabBarExtraContent" class="tabs-options" v-show="!skeletonLoading">
                        <div v-if="suggestDetails.status==1" @click="operateSuggest(1)" v-mark="['mk_workorder_suggest_cl']">
                            <icon-font type="iconyumengtubiao_zhipai" />
                            <span>&nbsp;处理</span>
                        </div>
                        <div v-if="suggestDetails.status==1" @click="operateSuggest(2)" v-mark="['mk_workorder_suggest_zf']">
                            <icon-font type="iconyumengtubiao_jinyong" />
                            <span>&nbsp;作废</span>
                        </div>
                        <div v-if="suggestDetails.status==3" @click="deleteChild" v-mark="['mk_workorder_suggest_sc']">
                            <icon-font type="iconyumengtubiao_shanchu-" />
                            <span>&nbsp;删除</span>
                        </div>
                    </div>
                </a-tabs>
            </div>
        </div>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        <!-- 处理建议 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="checkDialog" class="ownModalBorder titDialog" :title="checkDialogTitle" @cancel="cancelCheck">
            <check-suggest :suggestId="suggestId" :operateTypeReg="operateType" @successCheck="successCheck" @cancelCheck="cancelCheck"></check-suggest>
        </a-modal>
    </div>
</template>

<script>
import  * as API from '@/api/workorder';
import  CheckSuggest from './check';
export default {
    name: "suggestDetails",
    props: {
        suggestId:{
            type: String,
            required: true
        },
    },
    components: {
        CheckSuggest,
    },
    data() {
        return {
            key:1,
            activekey: 1,
            activeIndex: 0,
            suggestDetails:{},                         //维修详情
            previewVisible:false,
            previewImage: '',
            skeletonLoading:true,
            operateType:1,          //1、处理；2、作废
            checkDialog:false,
            checkDialogTitle:'处理',
        }
    },
    created() {
        this.initData();
    },
    mounted() {
    },
    methods: {
        operateSuggest(val){
            if(val==1){
                this.checkDialogTitle = '处理';
            }
            if(val == 2){
                this.checkDialogTitle = '作废';
            }
            this.operateType = val;
            this.checkDialog = true;
        },
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(url) {
            this.previewImage = url;
            this.previewVisible = true;
        },
        cancelCheck(){
            this.checkDialog = false;
        },
        successCheck(){
            this.checkDialog = false;
            this.initData();
            this.$emit('refreshinfoFun', true);
        },
        initData(){
            this.skeletonLoading = true;
            API.suggestView(this.suggestId ).then(res=>{
                this.suggestDetails = res.data;
                if(!this.suggestDetails.fileList){
                    this.suggestDetails.fileList=[];
                }
                this.skeletonLoading = false;
            })
        },
        deleteChild() {
            let _this = this;
            let id = this.suggestId;
            this.$modal.confirm({
                title: '确定要删除 「' + this.suggestDetails.applyName + '/' + this.suggestDetails.applyPhone + '」 提交的建议信息吗？',
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
    width: 800px;
    background: rgba(247,248,251,1);
    position:relative;
    & /deep/ .form-input-item{
        margin-top: 10px;
    }
    & /deep/ .input-item-box{
        margin-top: 2px;
    }
    .left-detail {
        width: 100%;
        height: calc(100vh - 120px);
        overflow: auto;
        background: #FFFFFF;
        .top {
            padding: 30px 20px 5px 20px;
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
                    width: 80px;
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
            min-height: 80px;
            margin-top: 5px;
            .content-follow-left{
                width: 32px;
                .content-follow-left-line{
                    margin: 5px 0 0 20px;
                    height: 47px;
                    border-left: 2px dashed #AED4F5;
                }
            }
            .content-follow-right{
                margin-left: 15px;
                width: 250px;
                margin-top: 10px;
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
