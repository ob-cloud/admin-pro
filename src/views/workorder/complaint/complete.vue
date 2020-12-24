<template>
    <div class="complete-complaint clearfix">
        <!-- 完成 -->
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
        <div class="ipt-box" style="margin-top: 20px;">
            <div class="titleInfo">
                <span></span>
                <b>完成信息</b>
            </div>
            <div class="input-info" style="margin-top:5px;">
                <label-item class="u-bottom-border" title="处理结果" :mustFill="true" style="width: 180px">
                    <a-row style="height: 32px;line-height: 32px">
                        <a-col :span="10"><a-checkbox v-model="solved" @change="onChangeSolved">已解决</a-checkbox></a-col>
                        <a-col :span="10"><a-checkbox v-model="unSolve" @change="onChangeUnSolve">未解决</a-checkbox></a-col>
                    </a-row>
                </label-item>
                <label-item class="u-bottom-border" title="处理时间" :mustFill="true" style="width: 290px">
                    <a-date-picker style="width: 290px" show-time v-model="parData.completeDate" :format="dateFormat" @ok="onOk"/>
                </label-item>
            </div>
            <label-item class="u-bottom-border" :title="this.parData.completeIsSolve==0?'未解决原因':'处理内容'" border :mustFill="true" style="width: 100%" :valLength="parData.complaintContent.length" :maxSize="200">
                <a-textarea v-model="parData.complaintContent" maxlength="200" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
            </label-item>
            <div style="margin: 20px 0 10px 0;"><span style="font-size: 12px;color: #777777;">附件</span><span style="font-size: 12px;color: #FFA036;">（附件支持格式：jpg、png、jpeg）</span></div>
            <label-item style="width:100%;" class="clearfix">
                <own-upload style="width:100%;" class="f-fl" :uploadParms="uploadParms" :showTips="false" ref="completePicList">
                    <div style="padding-top: 18px">
                        <a-icon type="plus"/>
                        <div >上传附件</div>
                    </div>
                </own-upload>
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
                completeDate:this.$moment(new Date().getTime()),    //完成时间
                completeIsSolve:1,  //保洁结果：是否解决【0、否，1、是】
                completePicIdList:[],  //完成图片id集合
                complaintContent:'',      //保洁内容
            },
            info: {},
            unSolve:false,
            solved:true,
            dateFormat: 'YYYY.MM.DD HH:mm',           //日期选择器格式
            uploadParms:{
                // 上传时附带的额外参数
                bizId: '', // 保洁id
                bizType: 6, // 图片大类标识 租客
                subBizType: 2, // 图片子类标识 身份证正面
                orderIndex: 1 // 排序值
            },
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
            this.parData.id = this.complaintId;
            API.complaintGet(this.complaintId).then(res=>{
                this.info = res.data;
                if(!this.info.faultPicList){
                    this.info.faultPicList = [];
                }
                this.uploadParms ={
                    // 上传时附带的额外参数
                    bizId: this.complaintId, // 维修id
                    bizType: 18, // 图片大类标识
                    subBizType: 2, // 图片子类标识
                    orderIndex: 1 // 排序值
                };
            })
        },
        onChangeUnSolve(e) {
            if(e.target.checked){
                this.parData.completeIsSolve = 0;
                this.solved = false;
            }
            else{
                this.parData.completeIsSolve = 1;
                this.solved = true;
            }
        },
        onOk(value) {
        },
        onChangeSolved(e) {
            if(e.target.checked){
                this.parData.completeIsSolve = 1;
                this.unSolve = false;
            }
            else{
                this.parData.completeIsSolve = 0;
                this.unSolve = true;
            }
        },
        save() {
            if (!this.parData.completeDate) {
                this.$message.warning('请选择处理时间！');
                return;
            }
            if (!this.parData.complaintContent) {
                this.$message.warning('请填写处理内容！');
                return;
            }
            //图片处理
            let completePicList = [...this.$refs.completePicList .picsList];
            if(completePicList && completePicList.length > 0) {
                let completePicIdList = [];
                completePicList.forEach((val, i) => {
                    completePicIdList.push(val.id)
                })
                this.parData.completePicIdList = completePicIdList;
            }
            let data = JSON.parse(JSON.stringify(this.parData));
            API.complaintComplete(data).then(res => {
                if (res.code === "200") {
                    this.$message.success('工单完成成功！');
                    this.$emit('successComplete');
                }
                else{
                    this.$message.error('工单完成失败！');
                }
            })

        },
        cancelSave() {
            this.$emit('cancelComplete');
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
.complete-complaint {
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
