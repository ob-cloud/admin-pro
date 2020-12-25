<template>
    <div class="check-clean clearfix">
        <!-- 处理/作废 -->
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>建议信息</b>
            </div>
            <div class="row clearfix">
                <div class="f-fl" style="width: 242px;">
                    <span class="littleLabel">建议人姓名：</span>
                    <span class="labelValue">{{info.applyName|blankVal}}</span>
                </div>
                <div class="f-fl">
                    <span class="littleLabel">建议人电话：</span>
                    <span class="labelValue">{{info.applyPhone|blankVal}}</span>
                </div>
            </div>
            <div class="row clearfix">
                <div class="f-fl" style="width: 100%">
                    <span class="little2Label">建议类型：</span>
                    <span class="labelValue">{{info.suggestTypeName|blankVal}}</span>
                </div>
            </div>
            <div class="row clearfix">
                <div class="f-fl little2Label" style="width: 60px">建议内容：</div>
                <div class="labelValue f-fl" style="width: calc(100% - 60px)">{{info.promotionDesc|blankVal}}</div>
            </div>
            <div class="row clearfix">
                <div class="little3Label f-fl" style="width: 40px">附件：</div>
                <div  class="showImg labelValue f-fl clearfix" style="width: calc(100% - 40px)">
                    <span v-if="!info.fileList||info.fileList.length==0">-</span>
                    <div class="f-fl cursor" v-for="(item,i) in info.fileList" :key="i">
                        <video v-if="'mp4,avi,mov'.indexOf(item.fileExt)>-1" style="width: 120px;height: 76px;border-radius: 4px" :src="item.origin" controls="controls"></video>
                        <div v-else @click="handlePreview(item.origin)"><img :src="item.small" alt=""></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ipt-box" :style="info.fileList&&info.fileList.length > 0?'margin-top: 10px;':'margin-top: 20px;'">
            <div class="titleInfo">
                <span></span>
                <b>{{operateTypeReg==1?'处理备注':'作废原因'}}</b>
            </div>

            <label-item class="u-bottom-border" border :mustFill="true" style="width: 100%" :valLength="comment.length" :maxSize="200">
                <a-textarea v-model="comment" maxlength="200" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
            </label-item>
        </div>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="successCheck">
                保存
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="cancelCheck">
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
        suggestId:{
            type: String,
            required: true
        },
        operateTypeReg:{
            type: Number,
            default: 1,             //1、处理；2、作废
        },
    },
    data() {
        return {
           comment:'',
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
            API.suggestGet(this.suggestId).then(res=>{
                this.info = res.data;
                if(!this.info.fileList){
                    this.info.fileList=[];
                }
            })
        },
        successCheck() {
            if(this.operateTypeReg == 1){
                let data = {
                    id:this.suggestId ,
                    dealWithContent:this.comment,
                };
                API.suggestDealWith(data).then(res => {
                    if (res.code === "200") {
                        this.$message.success('建议处理成功！');
                        this.$emit('successCheck');
                    }
                    else{
                        this.$message.error('建议处理失败！');
                    }
                })
            }
            if(this.operateTypeReg == 2){
                let data = {
                    id:this.suggestId ,
                    obsoleteComment:this.comment,
                };
                API.suggestObsolete(data).then(res => {
                    if (res.code === "200") {
                        this.$message.success('建议作废成功！');
                        this.$emit('successCheck');
                    }
                    else{
                        this.$message.error('建议作废失败！');
                    }
                })
            }
        },
        cancelCheck() {
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
.check-clean {
    width: 100%;
    font-size: 14px; // padding: 1px 20px 0 20px;
    position: relative;
    height: calc(100vh - 200px);
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
