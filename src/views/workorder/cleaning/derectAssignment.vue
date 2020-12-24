<template>
    <div class="assignment-clean clearfix">
        <!-- 派单 -->
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>保洁信息</b>
            </div>
            <div class="row clearfix">
                <div class="f-fl" style="width: 242px;">
                    <span class="littleLabel">申请人姓名：</span>
                    <span class="labelValue">{{info.applyName}}</span>
                </div>
                <div class="f-fl">
                    <span class="littleLabel">申请人电话：</span>
                    <span class="labelValue">{{info.applyPhone}}</span>
                </div>
            </div>
            <div class="row clearfix">
                <div class="f-fl" style="width: 242px">
                    <span class="littleLabel">期望上门时间：</span>
                    <span class="labelValue">{{info.visitDate?$moment(info.visitDate).format('YYYY.MM.DD'):'-'}} {{info.visitTime|visitTimeVal}}</span>
                </div>
                <div class="f-fl">
                    <span class="littleLabel">需要保洁的类型：</span>
                    <span class="labelValue">{{info.cleanType|cleanTypeVal}}</span>
                </div>
            </div>
            <div class="row clearfix">
                <div class="little2Label f-fl" style="width: 60px">需求描述：</div>
                <div class="labelValue f-fl">{{info.promotionDesc|blankVal}}</div>
            </div>
            <div class="row clearfix" :style="(!info.tempPicList||info.tempPicList.length==0)?'':'min-height: 76px;'">
                <div class="little3Label f-fl" style="width: 40px">附件：</div>
                <div  class="showImg labelValue f-fl clearfix" style="width: calc(100% - 40px)">
                    <span v-if="!info.tempPicList||info.tempPicList.length==0">-</span>
                    <div class="f-fl cursor" v-for="(item,i) in info.tempPicList" :key="i">
                        <video v-if="'mp4,avi,mov'.indexOf(item.fileExt)>-1" style="width: 120px;height: 76px;border-radius: 4px" :src="item.origin" controls="controls"></video>
                        <div v-else @click="handlePreview(item.origin)"><img :src="item.origin" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="row clearfix" :style="info.tempPicList&&info.tempPicList.length>0?'margin-top:2px;':''">
                <div class="little2Label f-fl">保洁地址：</div>
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
                <b>派单信息</b>
            </div>
            <label-item title="处理人" border :mustFill="true" style="width: 100%;min-height: 100px;">
                <dept-employee-tree placeholder="请选择处理人" ref="selectDeptEmp" width="310px" @selectChange="selectDept" placement="topLeft" :disableDept="true"></dept-employee-tree>
            </label-item>
            <div class="urgent"><a-checkbox @change="onChange">是否加急</a-checkbox></div>
            <label-item class="u-bottom-border" title="派单备注" border  style="width: 100%" :valLength="parData.dispatchComment.length" :maxSize="200">
                <a-textarea v-model="parData.dispatchComment" maxlength="200" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
            </label-item>
        </div>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save">
                确认
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
import deptEmployeeTree from "@/components/DeptEmployeeTree/index";
import  * as API from '@/api/workorder';

export default {
    components: {
        deptEmployeeTree,
    },
    props: {
        infoData: {
            type: Object,
            required: true
        },
        assignmentType:{
            type: Number,
            default:1, //1、派单；2、改派
        },
    },
    data() {
        return {
            parData: {
                id: '',              //保洁id
                dispatchComment:'', //派单备注
                handler:'',         //派单处理人
                isExpedited:0,      //是否加急
            },
            info: {},
            previewVisible:false,
            previewImage: '',
        };
    },
    created() {
        this.info = this.infoData;
    },
    methods: {
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(url) {
            this.previewImage = url;
            this.previewVisible = true;
        },
        //选择负责人
        selectDept(selectObj) {
            this.parData.handler = selectObj.id;
        },
        //是否加急
        onChange(e) {
            if(e.target.checked){
                this.parData.isExpedited = 1;
            }
            else{
                this.parData.isExpedited = 0;
            }
        },
        save() {
            if (!this.parData.handler) {
                this.$message.warning('请选择处理人！');
                return;
            }
            let data = this.infoData;
            data.dispatchComment = this.parData.dispatchComment;
            data.handler = this.parData.handler;
            data.isExpedited = this.parData.isExpedited;
            let parameter = JSON.parse(JSON.stringify(data));
            let title = '';
            if(this.assignmentType == 2){
                title = '改派';
            }else{
                title = '派单';
            }
            //图片处理
            let cleanPicList = data.tempPicList;
            if(cleanPicList && cleanPicList.length > 0) {
                let cleanPicIdList = [];
                cleanPicList.forEach((val, i) => {
                    cleanPicIdList.push(val.id)
                })
                parameter.cleanPicIdList = cleanPicIdList;
            }
            API.cleanAddDispatch(parameter).then(res => {
                if (res.code === "200") {
                    this.$message.success(title + '成功！');
                    this.$emit('successSave');
                } else {
                    this.$message.error( title + '失败！');
                }
            })
        },
        cancelSave() {
            this.$emit('cancelSave');
        }
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
    },
    watch: {
    }
};
</script>

<style lang="less" scoped>
.assignment-clean {
    width: 100%;
    font-size: 14px; // padding: 1px 20px 0 20px;
    position: relative;
    max-height: calc(100vh - 90px);
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
        position: relative;
        .urgent{
            position: absolute;
            right: 60px;
            top:93px;
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
