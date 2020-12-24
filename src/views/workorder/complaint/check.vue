<template>
    <div class="check-complaint clearfix">
        <!-- 验收 -->
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>投诉信息</b>
            </div>
            <div class="row clearfix">
                <div class="f-fl" style="width: 242px;">
                    <span class="littleLabel">投诉人姓名：</span>
                    <span class="labelValue">{{info.applyName}}</span>
                </div>
                <div class="f-fl">
                    <span class="littleLabel">投诉人电话：</span>
                    <span class="labelValue">{{info.applyPhone}}</span>
                </div>
            </div>
            <div class="row clearfix">
                <div class="little2Label f-fl">投诉类型：</div>
                <div class="labelValue f-fl">{{info.complaintTypeName}}</div>
            </div>
            <div class="row clearfix">
                <div class="f-fl" style="width: 60px">投诉内容：</div>
                <div class="f-fl" style="width: calc(100% - 60px)">{{info.promotionDesc|blankVal}}</div>
            </div>
            <div class="row clearfix">
                <div class="little3Label f-fl" style="width: 40px">图片：</div>
                <div  class="showImg labelValue f-fl clearfix" style="width: calc(100% - 40px)">
                    <span v-if="!info.faultPicList||info.faultPicList.length==0">-</span>
                    <div class="f-fl cursor" v-for="(item,i) in info.faultPicList" :key="i">
                        <video v-if="'mp4,avi,mov'.indexOf(item.fileExt)>-1" style="width: 120px;height: 76px;border-radius: 4px" :src="item.origin" controls="controls"></video>
                        <div v-else @click="handlePreview(item.origin)"><img :src="item.small" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="row clearfix" :style="info.faultPicList&&info.faultPicList.length>0?'margin-top:2px;':''">
                <div class="little2Label f-fl">地址来源：</div>
                <div class="labelValue f-fl">{{info.fullAddress|blankVal}}</div>
            </div>
            <div class="row clearfix">
                <div class="little3Label f-fl" style="width: 40px">备注：</div>
                <div class="labelValue f-fl" style="width: calc(100% - 40px)">{{info.applyComment|blankVal}}</div>
            </div>
        </div>
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>完成信息</b>
            </div>
            <div class="row clearfix">
                <div class="f-fl" style="width: 242px;">
                    <span class="littleLabel" style="width: 55px">处理人：</span>
                    <span class="labelValue">{{info.completeUserName}}</span>
                </div>
                <div class="f-fl">
                    <span class="littleLabel" style="width: 70px;">处理时间：</span>
                    <span class="labelValue">{{$moment(info.completeDate).format('YYYY.MM.DD HH:mm')}}</span>
                </div>
            </div>
            <div class="row clearfix">
                <div class="f-fl">处理结果：</div>
                <div class="labelValue f-fl" v-if="info.completeIsSolve==0" style="color: #FB4246">未解决</div>
                <div class="labelValue f-fl" v-if="info.completeIsSolve==1" style="color: #0A87F8">已解决</div>
            </div>
            <div class="row clearfix">
                <div class="f-fl" style="width: 60px">处理内容：</div>
                <div class="labelValue f-fl" style="width: calc(100% - 60px)">{{info.complaintContent|blankVal}}</div>
            </div>
            <div class="row clearfix">
                <div class="f-fl" style="width: 40px">附件：</div>
                <div  class="showImg labelValue f-fl clearfix" style="width: calc(100% - 40px)">
                    <span v-if="!info.completePicList||info.completePicList.length==0">-</span>
                    <div class="f-fl cursor" v-for="(item,i) in info.completePicList" :key="i">
                        <div @click="handlePreview(item.origin)"><img :src="item.small" alt=""></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ipt-box" :style="info.completePicList&&info.completePicList.length>0?'margin-top:10px;':'margin-top:20px;'">
            <div class="titleInfo">
                <span></span>
                <b>验收备注</b>
            </div>
            <label-item class="u-bottom-border" border :mustFill="true" style="width: 100%" :valLength="parData.acceptingComment.length" :maxSize="200">
                <a-textarea v-model="parData.acceptingComment" maxlength="200" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
            </label-item>
        </div>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save">
                保存
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="cancelSave">
                取消
            </a-button>
        </div>
        <!-- 预览图片 -->
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="cancelPreviewImage">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import  * as API from '@/api/workorder';

export default {
    components: {
    },
    props: {
        complaintId:{
            type: String,
            required: true
        },
    },
    data() {
        return {
            parData: {
                id: '',              //保洁id
                acceptingComment:'',      //保洁验收内容
            },
            info: {},
            previewVisible:false,
            previewImage: '',
        };
    },
    created() {
        this.initData();
    },
    methods: {
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(url) {
            this.previewImage = url;
            this.previewVisible = true;
        },
        initData(){
            API.complaintAcceptingView(this.complaintId).then(res=>{
                this.info = res.data;
                if(!this.info.faultPicList){
                    this.info.faultPicList=[];
                }
                if(!this.info.completePicList){
                    this.info.completePicList=[];
                }
            })
        },
        save() {
            this.parData.id = this.complaintId;
            let data = JSON.parse(JSON.stringify(this.parData));
            API.complaintAccepting(data).then(res => {
                if (res.code === "200") {
                    this.$message.success('工单验收成功！');
                    this.$emit('successCheck');
                }
                else{
                    this.$message.error('工单验收失败！');
                }
            })

        },
        cancelSave() {
            this.$emit('cancelCheck');
        }
    },
    filters: {
        blankVal(val){
            if(!val){
                return '-';
            }else{
                return  val;
            }
        },
    },
    watch: {
    }
};
</script>

<style lang="less" scoped>
.check-complaint {
    width: 100%;
    font-size: 14px; // padding: 1px 20px 0 20px;
    position: relative;
    height: calc(100vh - 90px);
    overflow-y: auto;
    overflow-x: hidden;
    .titleInfo{
        font-size:18px;
        font-weight:500;
        color: #111111;
    }
    .cont {
        margin-top: 10px;
        width: 100%;
        padding: 10px 20px 10px 20px;
        width:520px;
        background:rgba(245,247,254,1);
        .row {
            margin-top: 12px;
            font-size: 12px;
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
        }
    }
    .ipt-box {
        padding: 0 20px 40px 20px;
        .input-info{
            display: flex;
            flex-wrap: wrap;
            & /deep/ .ant-input{
                width: 295px;
            }
        }
    }
    .foot {
        height: 80px;
        padding: 20px;
        .btn {
            margin-left: 20px;
            width: 120px;
            height: 40px; // background:rgba(10,135,248,1);
            border-radius: 5px;
            float: right;
        }
    }
    .address {
        display: flex; // width: calc(50% - 15px);
        width: 100%;
        .must-fill-border {
            & /deep/ .ant-select-selection {
                border-bottom: 1px solid red;
            }
        }
    }
    .littleLabel {
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    .little2Label {
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    .little3Label {
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    // 详情类右侧字段值
    .labelValue {
        color: #000;
    }
}
</style>
