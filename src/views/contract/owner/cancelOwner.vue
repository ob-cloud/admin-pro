<template>
    <div class="cancelOwner-info clearfix">
        <!-- 退租信息 -->
        <div class="cont">
            <div class="titleInfo">
                <span></span>
                <b>合同信息</b>
            </div>
            <a-row class="row">
                <a-col :span="24">
                    <span class="littleLabel">房源地址：</span>
                    <span class="labelValue">
                        <span v-if="info.houseAlias">{{info.houseAlias}}/</span>{{info.fullAddress}}</span>

                </a-col>
            </a-row>
            <a-row class="row">
                <a-col :span="12">
                    <span class="littleLabel">合同周期：</span>
                    <span class="labelValue">{{$moment(info.beginTime).format('YYYY.MM.DD')}}~{{$moment(info.endTime).format('YYYY.MM.DD')}}</span>
                </a-col>
                <a-col :span="12">
                    <span class="littleLabel3">承租人：</span>
                    <span class="labelValue">{{zukeInfo.name}}-{{zukeInfo.gender == 1 ?'男':'女'}}-{{zukeInfo.phone}}</span>
                </a-col>
            </a-row>
            <a-row class="row" style="padding-bottom:15px;">
                <a-col :span="12">
                    <span class="littleLabel2">租金:</span>
                    <span class="labelValue">
                        <span>{{info.price/100}}</span> 元/月</span>
                </a-col>
                <a-col :span="12">
                    <span class="littleLabel2">押金：</span>
                    <span class="labelValue">
                        <span>{{info.deposit/100}}</span> 元/月</span>
                </a-col>
            </a-row>
        </div>
        <label-item title="退租信息" border style="margin:0 20px 24px 20px">
            <div class="contract-model f-clearfix" style="margin-bottom:24px">
                <div class="f-fl" :class="{active: parData.terminateType == 1}" @click="terminateType1" style="margin-right: 15px;">
                    <div>
                        <div class="type-boder" style="border:none;">
                            <span class="contractType">正常退租</span>
                            <span class="font-12">（租期已满，正常解约）</span>
                        </div>
                    </div>
                    <img src="../../../assets/login/selected.png" class="choose" />
                </div>
                <div class="f-fl f-clearfix" :class="{active: parData.terminateType == 2}" @click="terminateType2">
                    <div>
                        <div class="type-boder">
                            <span class="contractType">非正常退租</span>
                            <span class="font-12">(租期未满，中途退房)</span>
                        </div>
                        <div class="f-clearfix">
                            <div class="f-fl htmb">解约原因：
                                <span style="color:red;">*</span>
                            </div>
                            <div class="f-fl board-box">
                                <a-select v-model="parData.quiteReason" placeholder="请选择" style="min-width: 100px">
                                    <a-select-option v-for="(item,index) in cancelOptions" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                                </a-select>
                            </div>
                        </div>
                    </div>

                    <img src="../../../assets/login/selected.png" class="choose" />
                </div>

            </div>
            <label-item title="解约日期" :mustFill="true">
                <div class="u-bottom-border">
                    <a-date-picker v-model="parData.quiteDate" :format="dateFormat" @change="changeBreakDate"/>
                </div>
            </label-item>
        </label-item>
        <label-item title="退租费用明细" style="margin:0 20px">
            <div class="together-item">
                <div class="together-detail">
                    <div class="together-title">
                        <div style="max-width: 222px">收支类型</div>
                        <div style="max-width: 222px">费用类型</div>
                        <div style="max-width: 135px">金额(元)</div>
                        <div style="max-width: 446px">费用周期</div>
                        <div style="max-width: 62px;text-align: center;">操作</div>
                    </div>
                    <div class="together-data u-no-border" v-for="(item,index) in finances" :key="index">
                        <div style="max-width: 222px;text-align: left;" class="radio-box">
                            <a-radio-group v-model="item.feeDirection" buttonStyle="solid" size="small">
                                <a-radio-button :value="1">收</a-radio-button>
                                <a-radio-button :value="2">支</a-radio-button>
                            </a-radio-group>
                        </div>
                        <div style="max-width: 222px">
                            <a-cascader class="myCascader" v-model="item.feeSubjectIdList" :disabled="item.disabled" placeholder="请选择" :options="costTabsContent" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index)"></a-cascader>
                        </div>
                        <div style="max-width: 135px">
                            <a-input style="width:120px;" v-model="item.amount" @keyup.native="mixin_moneyFilter('finances.'+index+'.amount',99999999.99)"></a-input>
                        </div>
                        <div style="max-width: 446px" class="date-box u-no-border">
                            <a-range-picker style="width: 100%;" v-model="item.timeDateList" :format="dateFormat" @change="(date)=>changeDate(date, item)" :allowClear="false" />
                        </div>
                        <div class="options f-clearfix" style="max-width: 62px;text-align: center;">
                            <icon-font @click="reduceFellow(index)" class="fl delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                        </div>
                    </div>
                    <div class="together-foot">
                        <p class="f-fl" style="margin-left:20px">费用合计：<span style="color:rgb(255, 163, 0);">{{totalMoney}}元</span></p>
                        <p @click="addFellow" class="togetherAdd cursor f-fr">
                            <icon-font style="font-size:16px;color:#0A87F8;" type="iconyumengtubiao_tianjiazijian" /> 添加费用</p>
                    </div>
                </div>
            </div>
        </label-item>
        <label-item class="u-bottom-border" style="margin:0 20px" title="退租备注" :maxSize="500" :valLength="parData.quiteComment.length">
            <a-textarea v-model="parData.quiteComment" maxlength="500" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入" />
        </label-item>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save" :loading="saveLoading">
                确定退租
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="closeThis">
                取消
            </a-button>
        </div>
    </div>
</template>

<script>
import {
    listEnableDict, dictionaryListDict
} from '@/api/contract.js';
import {
    breakList,breakOwner,getOwnerCheckInfo
} from '@/api/ownerContract.js';
export default {
    components: {
    },
    props: {
        ownerContractViewDTO: {
            type: Object,
            required: true
        },
        contractSigner: {
            type: Object,
            required: true
        },
        unNormalCancelOwnerFlag:{
            type:Boolean,
            default:false,//是否来自租客业主的审核中非正常退
        },
    },
    computed: {
        totalMoney() {
            let total = 0;
            for (let item of this.finances) {
                if (item.feeDirection === 1) {
                total += item.amount * 1;
                } else {
                total -= item.amount * 1;
                }
            }
            return total.toFixed(2);
        }
    },
    data() {
        return {
            dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            nowTime: new Date().getTime(),
            parData: {
                terminateType: 1,   //退租类型【1-正常退，2-非正常退】
                quiteDate: null,    //解约日期
                quiteReason:undefined,    //解约原因
                quiteComment: '',  //解约备注
            },
            elcostcascaderValue: {
                value: 'id',
                label: 'name',
                children: 'metaList'
            },
            cancelOptions: [],
            info: {},
            zukeInfo: {},
            finances: [],
            costTabsContent: [], // 费用类型
            ownerCheckInfo:{},
            saveLoading:false,
        };
    },
    created() {
        this.getDict();
        this.parData.quiteDate = this.$moment(new Date().getTime());
        this.info = this.ownerContractViewDTO;
        this.zukeInfo = this.contractSigner;
        // this.getBreakList();
        this.getCost();
        this.getOwnerCheckInfo();
    },
    methods: {
      changeDate(date,item) {
        item.beginDate = date[0];
        item.endDate = date[1];
      },
        changeBreakDate(){
            if(this.parData.terminateType == 2){
                this.getBreakList();
            }
        },
        getBreakList() {
            let data = {
                terminateType: this.parData.terminateType,
                id: this.info.id,
                quiteDate: this.parData.quiteDate
            }
            breakList(data).then(res => {
                this.pushFinance(res);
            });
        },
        getOwnerCheckInfo(){
            if(this.ownerContractViewDTO.housePid&&this.ownerContractViewDTO.housePid!='') {
                getOwnerCheckInfo(this.ownerContractViewDTO.housePid).then(res => {
                    if (res.code === '200' && res.data) {
                        this.ownerCheckInfo = res.data;
                    }
                });
            }
        },
        terminateType1(){
            this.parData.terminateType = 1;
            this.parData.quiteDate = this.$moment(this.info.endTime);
            this.getBreakList();
        },
        terminateType2(){
            this.parData.terminateType = 2;
            this.parData.quiteDate = this.$moment(new Date().getTime());
            this.getBreakList();
        },
        pushFinance(res) {
            this.finances = [];
            res.data.forEach(item => {
                let arry = []
                this.costTabsContent.forEach((v1,i1) => {
                    // console.log(i1,value)
                    v1.metaList.forEach((v2,i2) => {
                        if(item.feeSubjectId == v2.id){
                           arry.push(v1.id)
                           arry.push(v2.id)
                        }
                    })
                })
                this.finances.push({
                    amount: item.amount / 100, // 收支金额
                    beginDate: this.$moment(item.beginDate),
                    endDate: this.$moment(item.endDate),
                    feeDirection: item.feeDirection, // 费用方向【1收入2支出】
                    feeSubjectId: item.feeSubjectId, // 费用科目id【字典】
                    feeSubjectIdList: arry, // 费用科目id【字典】
                    feeSubjectName: item.feeSubjectName, // 费用科目名称
                    disabled: true,
                    comment: item.comment, // 描述
                    timeDateList:[this.$moment(item.beginDate),this.$moment(item.endDate)],
                });
            });
        },
        // 获取费用类型
        getCost(filterIndex, type, id) {
            const params = 'FEESUBJECT';
            dictionaryListDict(params).then(res => {
                // console.log(res)
                if (res.code === "200") {
                    const checkRes = res.data;
                    this.costTabsContent = checkRes;
                    if(this.unNormalCancelOwnerFlag){
                        this.terminateType2();
                    }
                    else {
                        this.getBreakList();
                    }
                }
            })
        },
        getDict() {
            // 解约原因
            listEnableDict('6df9ce3d4f39423ea3c3bfec0a242089').then(res => {
                this.cancelOptions = res.data;
                if(this.unNormalCancelOwnerFlag){
                    this.cancelOptions.forEach((item)=>{
                        if(item.name == '其他'){
                            this.parData.quiteReason = item.id;
                        }
                    });
                }
            });
        },

        save() {
            //是否允许退
            if(this.ownerCheckInfo){
                if(this.ownerCheckInfo.isAllow == 0 && this.ownerCheckInfo.renterCount>0){
                    this.$message.warning('该房源还存在未退租的租客合同，请先处理完租客合同后再来操作该业主合同！');
                    return;
                }
            }
            if(this.parData.terminateType == 2 && !this.parData.quiteReason){
                this.$message.warning('请选择解约原因！');
                return;
            }
            if (!this.parData.quiteDate) {
                this.$message.warning('请输入解约时间！');
                return;
            }
            let postData = Object.assign({}, this.parData);
            let finances = JSON.parse(JSON.stringify(this.finances));
            for (let item of finances) {
                item.amount =  Math.round(item.amount * 100);
            }
            postData.id = this.info.id;
            postData.billDetails = finances;
            this.saveLoading = true;
            breakOwner(postData).then(res => {
              if(!res){
                this.saveLoading = false;
              }
                // console.log(res)
                if (res.code === "200") {
                  this.saveLoading = false;
                    this.$message.success('操作成功！');
                    this.$emit('saveSuccess', true);
                    // this.info = res.data;
                }
                else{
                    this.saveLoading = false;
                }
            })
        },
        closeThis() {
            this.$emit('closeThis', true);
        },
        addFellow() {
            this.finances.push({
                amount: 0, // 收支金额
                beginDate: null,
                costType: 0, // 费用类型
                endDate: null,
                feeDirection: 1, // 费用方向【1收入2支出】
                feeSubjectId: '', // 费用科目id【字典】
                feeSubjectIdList: [], // 费用科目id【字典】
                feeSubjectName: '' // 费用科目名称
            });
        },
        reduceFellow(index) {
            this.finances.splice(index, 1);
        },
        // 费用类型方法
        costSelect(value, index) {
            if (value[1]) {
                this.finances[index].feeSubjectId = value[1];
            } else {
                this.finances[index].feeSubjectId = value[0];
            }
            this.finances[index].feeSubjectIdList = value;
            // if (value[1]) {
            //     let obj = this.list[index];
            //     obj.feeSubjectId = value[1];
            //     this.otherExpenses.splice(index, 1, obj);
            // } else {
            //     let obj = this.list[index];
            //     obj.feeSubjectId = value[0];
            //     this.list.splice(index, 1, obj);
            // }
        },
    },
    watch: {
    }
};
</script>

<style lang="less" scoped>
// @import url("../../../assets/css/color.less");
.cancelOwner-info {
    max-height: calc(100vh - 160px);
    overflow: auto;
    width: 100%;
    font-size: 14px; // padding: 1px 20px 0 20px;
    position: relative;
    .cont {
        // height: calc(100% - 70px);
        // overflow-y: auto;
        margin-top: 10px;
        width: 100%;
        padding: 15px 20px 0 20px;
        background: rgba(245, 247, 254, 1);
        .row {
            margin-top: 15px;
        }
    }
    .contract-model {
        // margin:0 20px;
        // margin-left: -30px;
        display: flex;
        &>div {
            position: relative;
            flex: 1;
            padding: 10px 16px; // width: calc(50% - 30px);
            // height: 110px;
            /*width: 370px;*/
            height: 80px;
            line-height: 25px;
            box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            cursor: pointer;
            p:first-child {
                color: @mainFontColor;
            }
            p:last-child {
                color: @tableTitle;
            }
            .choose {
                display: none;
                position: absolute;
                top: 20px;
                right: -2px;
                transform: translateY(-50%);
                color: @themeColor;
                font-size: 36px;
                height: 40px;
                width: 40px;
            }
        }
        .active {
            background-color: @themeBgColor;
            border: 1px solid @themeColor;
            .choose {
                display: block;
            }
            .anticon {
                color: #0A87F8;
            }
            & /deep/.ant-select-selection {
                background-color: @themeBgColor;
            }
        }
        .type-boder {
            border-bottom: 1px solid #DDDDDD;
            padding: 0 0 7px 0;
        }
        .contractType {
            font-weight: 500;
            font-size: 16px;
            color: rgba(17, 17, 17, 1);
            .font-12 {
                color: #777777;
                font-size: 12px;
            }
        }
        .htmb {
            height: 32px;
            line-height: 30px;
        }
        .board-box {
            margin-left: 12px;
            background: none;
            & /deep/.ant-select-selection {
                border: none;
                background: none;
            }
        }
    }
    .ipt-box {
        padding: 0 20px 0 20px;
        .addresswu {
            width: calc(50% - 15px);
            display: flex;
            & /deep/.ant-input {
                color: #FFA036;
            } // .must-fill-border {
            //     & /deep/ .ant-select-selection {
            //         border-bottom: 1px solid red;
            //     }
            // }
        }
        .titlepz {
            margin-top: 26px;
            margin-bottom: 10px;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 17px;
            span {
                // width:195px;
                height: 17px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 160, 54, 1);
                line-height: 17px;
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
    .littleLabel {
        width: 80px; // color: #666666;
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    } // 详情类右侧字段值
    .littleLabel3 {
        width: 65px; // color: #666666;
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    .littleLabel2 {
        width: 50px; // color: #666666;
        display: -webkit-inline-box; // font-weight:400;
        // font-size: 14px;
    }
    .labelValue {
        color: #000;
    }
    .together-item {
        margin-top: 10px;
        margin-bottom: 20px;
        .delete-icon {
            color: red;
            font-size: 14px;
        }
        .together-detail {
            border-left: 1px solid @borderColor;
            border-top: 1px solid @borderColor;
            text-align: center;
            font-size: 12px;
            .together-title {
                display: flex;
                background: rgba(247, 248, 251, 1);
                text-align: left;
                &>div {
                    padding: 0px 9px;
                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                    border-right: 1px solid @borderColor;
                    border-bottom: 1px solid @borderColor;
                }
                .must-fill {
                    color: #FB4246;
                }
            }
            .together-data {
                position: relative;
                display: flex;
                &>div {
                    flex: 1;
                    height: 100%;
                    height: 40px;
                    line-height: 40px;
                    text-align: left;
                    padding: 0px 9px;
                    border-right: 1px solid @borderColor;
                    border-bottom: 1px solid @borderColor;
                    background-color: #ffffff;
                    .popover:hover {
                        height: 39px;
                        line-height: 38px;
                        border: 1px solid @themeColor;
                        cursor: pointer;
                    }
                }
                .payPattern {
                    padding: 0 9px;
                }
                input {
                    // text-align: center;
                    height: 100%;
                }
                input:focus {
                    border: 1px solid @themeColor!important;
                }
                .select-border {
                    border: 1px solid @themeColor;
                }
                .options {
                    i,
                    span {
                        display: inline-block;
                        width: 50%;
                        height: 39px;
                        cursor: pointer;
                    }
                    i {
                        line-height: 39px;
                        font-size: 14px;
                    }
                    span {
                        padding: 3px 4px;
                        line-height: 18px;
                        background-color: #DCEFFF;
                        color: @themeColor;
                    }
                }
                .togeAddress {
                    padding: 0 9px;
                    display: flex; // width: calc(50% - 15px);
                    width: 100%;
                    height: 100%;
                    & /deep/ .ant-select-selection__rendered {
                        // margin-left: 16px;
                        margin-top: 6px;
                    }
                }
            }
            .together-foot {
                height: 40px;
                line-height: 40px;
                border-right: 1px solid @borderColor;
                border-bottom: 1px solid @borderColor;
                .togetherAdd {
                    width: 100px;
                    margin: 0 auto;
                    text-align: center;
                }
            }
        }
    }
    .radio-box{
        & /deep/.ant-radio-button-wrapper{
            padding: 0 14px;
            &:nth-child(1) {
                border-radius: 20px 0 0 20px;
            }
            &:nth-child(2) {
                border-radius: 0 20px 20px 0;
            }
        }
        & /deep/.ant-radio-button-wrapper-checked{
            border-radius: 50%;
        }
    }
    .date-box{
        & /deep/.ant-calendar-picker{
            width:46%;
            .ant-calendar-picker-icon {
                    display: none;
                }
            .ant-calendar-picker-clear{
                display: none;
            }
        }

    }
    /deep/ .label-item .title .ft-bolder{
        height: 44px;
        line-height: 44px;
    }
    /deep/ .ant-calendar-range-picker-separator{
        vertical-align:baseline !important;
    }
}






.enclosurefujian {
    overflow: hidden;
    margin-bottom: 10px;
}

.enclosure {
    float: left;
    .fileEnclosureWrap {
        float: left;
        margin-right: 10px;
        text-align: center;
        .enclosureImg {
            display: inline-block;
            width: 60px;
            height: 60px;
        }
        .enclosurep {
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
        }
    }
}
</style>
