<template>
    <div class="examine-box">
        <label-item class="u-bottom-border" :mustFill="auditResult == 1?false:true" :title="auditResult==1?'通过理由':'驳回理由'"  :valLength="auditReason.length" :maxSize="200">
            <a-textarea style="margin-top: 3px;" v-model="auditReason"
                        maxlength="200"
                        :placeholder="auditResult==1?'请输入通过理由':'请输入驳回理由'"
                        :autosize="{ minRows: 1, maxRows: 5 }"
            />
        </label-item>
        <label-item style="margin-top: 30px;" title="附件">
            <div style="margin-top: 12px;">
                <upload-file accept=".pdf, .xls, .xlsx, .doc, .docx, .ppt, .pptx,.jpg, .jpeg, .png" :maxLength="20" :picList="picList" :uploadParms="sendData1_1" :showTips="false" ref="img1_1">
                </upload-file>
            </div>
        </label-item>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" :loading="saveLoading" @click="saveExamine">
                保存
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="cancelExamine">
                取消
            </a-button>
        </div>
    </div>
</template>

<script>
    import  * as API from '@/api/workflow';
    import UploadFile from '@/components/OwnUpload/uploadFile';
    export default {
        name: "examine",
        components: {
            UploadFile,
        },
        props: {
            auditInstanceId: {
                type: String,
                required: true
            },
            auditResult: {
                type: Number,
                required: true
            },
        },
        data() {
            return {
                auditReason:'',
                picList: [],
                sendData1_1: {},
                saveLoading:false,
            };
        },
        created() {
            this.sendData1_1 = { //
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 21, // 图片大类标识 web管理
                subBizType: 1, // 图片子类标识 banner
                orderIndex: 1 // 排序值
            }
        },
        mounted() {
            this.sendData1_1 = { //
                // 上传时附带的额外参数
                bizId: '', // 房源id
                bizType: 21, // 图片大类标识 web管理
                subBizType: 1, // 图片子类标识 banner
                orderIndex: 1 // 排序值
            }
        },
        methods: {
            cancelExamine(){
                this.$emit("cancelExamine");
            },
            saveExamine(){
                let picsList = [...this.$refs.img1_1.picsList];
                let annexIdList = [];
                if(picsList && picsList.length > 0) {
                    picsList.forEach((val) => {
                        annexIdList.push(val.id)
                    })
                }
                if(!this.auditReason&&this.auditResult == 2){
                    this.$message.warning('请输入驳回理由');
                    return;
                }
                let parameter = {
                    auditInstanceId:this.auditInstanceId,
                    auditResult:this.auditResult,
                    auditReason:this.auditReason,
                    annexIdList:annexIdList,
                };
                this.saveLoading = true;
                API.audit(parameter).then(res=>{
                    if(!res){
                        this.saveLoading = false;
                    }
                    if (res.code === '200') {
                        if(res.data.successFlag==1){
                            this.$message.success(this.auditResult == 1?'审核成功':'驳回成功');
                            this.saveLoading = false;
                            this.$emit('successExamine',res.data.isStillTaskPerson);
                        }
                        else{
                            this.$message.error(this.auditResult == 1?'审核失败:':'驳回失败:'+res.data.errorMsg);
                            this.saveLoading = false;
                        }
                    } else {
                        this.$message.error(this.auditResult == 1?'审核失败':'驳回失败');
                        this.saveLoading = false;
                    }
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .examine-box{
        padding: 20px;
        & /deep/ .label-item .title{
            color: #111111;
            font-size: 16px;
            margin-top: 0px !important;
        }
        .foot {
            height: 70px;
            padding: 30px 0 10px 0;
            .btn {
                margin-left: 20px;
                width: 120px;
                height: 40px; // background:rgba(10,135,248,1);
                border-radius: 5px;
                float: right;
            }
        }
    }
</style>