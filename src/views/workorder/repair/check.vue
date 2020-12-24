<template>
    <div class="check-repair clearfix">
        <!-- 验收 -->
        <div class="ipt-box" style="margin-top: 20px;" :style="showSubjectFlag?'padding: 0 20px':''">
            <div class="titleInfo">
                <span></span>
                <b>验收备注</b>
            </div>
            <label-item class="u-bottom-border" :mustFill="true" style="width: 100%" :valLength="parData.acceptingComment.length" :maxSize="200">
                <a-textarea v-model="parData.acceptingComment" maxlength="200" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
            </label-item>
        </div>
        <div class="ipt-box" style="margin-top: 30px;" v-if="showSubjectFlag">
            <div class="titleInfo">
                <span></span>
                <b>维修费用</b>
            </div>
            <div class="basicsInfo">
                <div class="table margin-top-13">
                    <div class="table-title">
                        <div style="max-width: 100px;text-align: left;padding-left: 12px;background: #F5F7FF;color: #111111;">费用承担方</div>
                        <div style="max-width: 198px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">默认费用类型</div>
                        <div style="max-width: 118px;text-align: left;padding-left: 14px;background: #F5F7FF;color: #111111;">费用金额</div>
                        <div style="max-width: 60px;text-align: center;background: #F5F7FF;color: #111111;">操作</div>
                    </div>
                    <div class="house-data u-no-border" v-for="(item,index) in repairSubject.subjectList" :key="index">
                        <div class="clearfix" style="max-width: 100px;" >
                            <div class="house-data-item-left" style="width: 100px;padding-left: 12px;" :style="item.undertakerUnEditable==1?'background:#F6F7F8;border-right: 1px solid #EEEEEE;border-bottom: 1px solid #EEEEEE;':''">
                                <label-item title="" style="width: 86px;" class=" deptStyle" :class="{ 'undertakerUnEditableStyle': item.undertakerUnEditable==1 }">
                                    <a-select style="width: 80px;height: 32px;" :disabled="item.undertakerUnEditable==1" :allowClear="true" placeholder="请选择" v-model="item.undertaker">
                                        <a-select-option :value="1">租客</a-select-option>
                                        <a-select-option :value="2">业主</a-select-option>
                                        <a-select-option :value="3">公司</a-select-option>
                                    </a-select>
                                </label-item>
                            </div>
                        </div>
                        <div class="clearfix" style="max-width: 198px;" :style="item.feeSubjectIdUnEditable==1?'background:#F6F7F8;':''">
                            <div class="house-data-item-left" style="padding-left:15px; " :class="{ 'undertakerUnEditableStyle': item.feeSubjectIdUnEditable==1 }">
                                <a-cascader style="width: 180px;" class="myCascader" placeholder="请选择" :disabled="item.feeSubjectIdUnEditable==1" v-model="item.id" :options="costTabsContent" :allowClear="false" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index,item)"></a-cascader>
                            </div>
                        </div>
                        <div class="clearfix" style="max-width: 118px;" :style="item.moneyUnEditable==1?'background:#F6F7F8;':''">
                            <div class="house-data-item-left" style="width: 110px;padding-left: 14px;" :class="{ 'undertakerUnEditableStyle': item.moneyUnEditable==1 }">
                                <a-input style="width: 70px" :disabled="item.moneyUnEditable==1" v-model="item.money" v-validate="'moneyNoDot'" placeholder="请输入" /><span class="addonAfterStyle">元</span>
                            </div>
                        </div>
                        <div style="max-width: 60px;text-align: center;" :style="(item.moneyUnEditable==1||item.undertakerUnEditable==1||item.feeSubjectIdUnEditable==1)?'background:#F6F7F8;':''">
                            <icon-font v-if="item.moneyUnEditable==0&&item.undertakerUnEditable==0&&item.feeSubjectIdUnEditable==0" @click="deleteSubject(index)" class="delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                        </div>
                    </div>
                    <div class="house-data u-no-border cursor" @click="AddSubjectObj(true)" v-if="repairSubject.subjectList.length==0">
                        <div class="continueAddStyle">
                            <icon-font type="iconyumengtubiao_tianjia" />添加
                        </div>
                    </div>
                    <div class="house-data u-no-border cursor" @click="AddSubjectObj(false)" v-if="repairSubject.subjectList.length>0">
                        <div class="continueAddStyle">
                            <icon-font type="iconyumengtubiao_tianjia" />继续添加
                        </div>
                    </div>
                </div>
            </div>
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
import {
    listFeeSubjectWithoutRentalFee,
} from '@/api/contract.js';

export default {
    components: {
    },
    props: {
        repairId:{
            type: String,
            required: true
        },
    },
    data() {
        return {
            parData: {
                id: '',              //维修id
                acceptingComment:'',      //维修验收内容
            },
            info: {},
            previewVisible:false,
            previewImage: '',
            showSubjectFlag:true,          //是否显示费用
            repairSubject:{
                subjectList:[
                ],
            },
            originCostTabsContent:[],
            costTabsContent:[],
            checkedFeeSubjectIds:[],
            subjectObj:{
                undertaker:undefined,
                undertakerUnEditable:0,
                feeSubjectId: undefined,
                feeSubjectIdUnEditable:0,
                feeSubjectName:undefined,
                money:'',
                moneyUnEditable:0,
            },
            elcostcascaderValue: {
                value: 'id',
                label: 'name',
                children: 'metaList'
            },
        };
    },
    created() {
        this.getCost();
        this.initData();
    },
    methods: {
        // 费用类型方法
        costSelect(value, index,item) {
            if (value[1]) {
                item.feeSubjectId = value[1];
            } else {
                item.feeSubjectId = value[0];
            }
        },
        // 获取费用类型
        getCost() {
            const params = 'FEESUBJECT';
            listFeeSubjectWithoutRentalFee(params).then(res => {
                if (res.code === "200") {
                    this.originCostTabsContent = res.data;
                    this.costTabsContent = res.data;
                }
            })
        },
        deleteSubject(index){
            this.repairSubject.subjectList.splice(index,1);
            this.checkedFeeSubjectIds = [];
            this.repairSubject.subjectList.forEach((item)=>{
                this.checkedFeeSubjectIds.push(item.feeSubjectId);
            });
            this.costTabsContent = this.originCostTabsContent;
            this.costTabsContent.forEach((item)=>{
                item.metaList.forEach((temp)=>{
                    let pos = this.checkedFeeSubjectIds.indexOf(temp.id);
                    if(pos > -1){
                        temp.disabled = true;
                    }else{
                        temp.disabled = false;
                    }
                })
            });
        },
        AddSubjectObj(firstFlag){
            let obj = Object.assign({},this.subjectObj);
            if(!firstFlag){
                let subjectList = this.repairSubject.subjectList;
                let temp = false;
                subjectList.forEach((item)=>{
                    if(!item.undertaker){
                        temp = true;
                    }
                    if(!item.feeSubjectId){
                        temp = true;
                    }
                    if(!item.money){
                        temp = true;
                    }
                });
                if(temp){
                    this.$message.error('请完善费用信息');
                    return;
                }
                //获取所有选中费用科目
                this.checkedFeeSubjectIds = [];
                subjectList.forEach((item)=>{
                    this.checkedFeeSubjectIds.push(item.feeSubjectId);
                });
                this.costTabsContent = this.originCostTabsContent;
                this.costTabsContent.forEach((item)=>{
                    item.metaList.forEach((temp)=>{
                        let pos = this.checkedFeeSubjectIds.indexOf(temp.id);
                        if(pos > -1){
                            temp.disabled = true;
                        }
                    })
                });
                this.repairSubject.subjectList.push(obj);
            }
            else{
                this.checkedFeeSubjectIds = [];
                this.costTabsContent = this.originCostTabsContent;
                this.costTabsContent.forEach((item)=>{
                    item.metaList.forEach((temp)=>{
                        temp.disabled = false;
                    })
                })
                this.repairSubject.subjectList.push(obj);
            }
        },
        cancelPreviewImage() {
            this.previewVisible = false;
        },
        handlePreview(url) {
            this.previewImage = url;
            this.previewVisible = true;
        },
        initData(){
            API.repairAcceptingView(this.repairId).then(res=>{
                this.info = res.data;
                if(!this.info.faultPicList){
                    this.info.faultPicList=[];
                }
                if(!this.info.completePicList){
                    this.info.completePicList=[];
                }
                if(this.info.expenseBillList){
                    this.repairSubject.subjectList = []
                    this.info.expenseBillList.forEach((item)=>{
                        let temp = Object.assign({},item);
                        temp.money = temp.money/100;
                        this.repairSubject.subjectList.push(temp);
                    });
                }
            })
        },
        save() {
            this.parData.id = this.repairId;
            if(this.showSubjectFlag){
                let temp = false;
                let tempList = [];
                this.repairSubject.subjectList.forEach((item)=>{
                    if(!item.undertaker){
                        temp = true;
                    }
                    if(!item.feeSubjectId){
                        temp = true;
                    }
                    if(!item.money){
                        temp = true;
                    }
                    let tmp = Object.assign({},item);
                    tmp.money =  Math.round(tmp.money*100);
                    tempList.push(tmp);
                });
                if(temp){
                    this.$message.error('请完善费用信息');
                    return;
                }
                this.parData.expenseBillFormList = tempList;
            }
            let data = JSON.parse(JSON.stringify(this.parData));
            API.repairAccepting(data).then(res => {
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
        visitTimeVal(val) {
            return val == 1 ? '9:00-13:00' : val == 2 ? '13:00-18:00' : val == 3 ? '18:00-22:00': '-';
        },
        repairTypeVal(val) {
            return val == 1 ? '家电' : val == 2 ? '家具' : val == 3 ? '水电暖' : val == 4 ? '墙面/地板' : val == 5 ? '锁类' : val == 6 ? '疏通' : val == 7 ? '其他' : '-';
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
.check-repair {
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
        .input-info{
            display: flex;
            flex-wrap: wrap;
            & /deep/ .ant-input{
                width: 295px;
            }
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
            width: 476px;
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
                    height: 46px;
                    line-height: 46px;
                    text-align: left;
                    border-right: 1px solid #EEEEEE;
                    border-bottom: 1px solid #EEEEEE;
                    background-color: #ffffff;
                    .house-data-item-left{
                        height: 46px;
                        line-height: 46px;
                    }
                    .house-data-item-right{
                        width: 106px;
                        height: 45px;
                        line-height: 45px;
                        background:#F8F9FA;
                        .deptStyle{
                            margin-left: 10px;
                            color: #777777;
                            font-size: 12px;
                            .unSelect{
                                color: #777777;
                            }
                            .selected{
                                color: #0A87F8;
                            }
                            i{
                                vertical-align: -0.1em;
                                margin-right: 4px;
                            }
                            /deep/ svg{
                                width: 12px;
                                height: 12px;
                            }
                        }
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
    /deep/ .ant-cascader-picker-label{
        padding: 0;
    }
    /deep/ .ant-cascader-picker-disabled  i{
        color: rgba(0, 0, 0, 0.25);
    }
    .undertakerUnEditableStyle{
        /deep/ i{
            color:rgba(0, 0, 0, 0.25) !important;
            display: none;
        }
        /deep/ .ant-select-selection-selected-value{
            color: rgba(0, 0, 0, 0.65);
        }
        /deep/ .ant-cascader-picker-label{
            color: rgba(0, 0, 0, 0.65);
        }
        /deep/ .ant-input-disabled{
            color: rgba(0, 0, 0, 0.65);
        }
    }
    .myCascader{
        /deep/ .ant-cascader-picker-label{
            font-size: 12px;
        }
    }
}
</style>
