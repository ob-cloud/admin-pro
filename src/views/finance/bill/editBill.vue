<template>
    <div id="editBill" class="edit-bill">
        <div class="house-address">
            <span>房源地址：</span>
            <span v-if="copyBill.houseAlias">{{copyBill.houseAlias}} /</span> {{copyBill.fullAddress}}
        </div>
        <label-item title="" style="padding:20px 20px 0 20px">
            <div class="contract-modular">
                <div class="content-row">
                    <div class="together-item">
                        <div class="together-detail">
                            <div class="together-title">
                                <div style="max-width: 300px">费用科目</div>
                                <div style="max-width: 196px">应收(付)</div>
                                <div style="max-width: 190px;">已收(付) </div>
                                <div style="max-width: 190px;">待收(付) </div>
                                <div style="max-width: 80px;text-align: center;">操作</div>
                            </div>
                            <div class="together-data u-no-border" v-for="(item,index) in BillExpenses" :key="index">
                                <div style="max-width: 300px;padding: 0px 26px;text-align: left;" :class="{itemBg: !item.add}" >
                                    <span v-if="!item.add">{{item.feeSubjectName}}</span>
                                    <a-cascader class="myCascader" style="width: 210px;" v-if="item.add" placeholder="请选择费用科目" :options="costTabsContent" :fieldNames="elcostcascaderValue" @change="(value) => costSelect(value, index)"></a-cascader>
                                </div>
                                <div style="max-width: 196px;padding: 0px 26px;text-align: left;" :class="{itemBg: !item.add}" >
                                    <span v-if="item.feeDirection == 1" style="color:#0A87F8"> +</span>
                                    <span v-else style="color:#FB4246"> -  </span>
                                    <span v-if="!item.add">{{item.originalMoney}}</span>
                                    <a-input style="width:116px;" v-if="item.add" v-model="item.originalMoney" @blur.prevent="changeCount($event,item)" @keyup.native="mixin_moneyFilter('BillExpenses.'+index+'.originalMoney',99999999.99)"></a-input>
                                    <span>元</span>
                                </div>
                                <div style="max-width: 190px;padding: 0px 26px;text-align: left;" class="itemBg">
                                    <span v-if="item.feeDirection == 1 &&item.occurredMoney!= 0" style="color:#0A87F8"> +</span><span v-else-if="item.feeDirection == 2 &&item.occurredMoney!= 0" style="color:#FB4246"> -  </span><span>{{item.occurredMoney}}元</span>
                                </div>
                                <div style="max-width: 190px;padding: 0px 26px;text-align: left;" class="itemBg">
                                    <span v-if="item.feeDirection == 1 &&item.notOccurredMoney!= 0" style="color:#0A87F8"> +</span><span v-else-if="item.feeDirection == 2 &&item.notOccurredMoney!= 0" style="color:#FB4246"> -  </span><span>{{item.notOccurredMoney}}元</span>
                                </div>
                                <div class="options f-clearfix" style="max-width: 80px">
                                    <icon-font v-if="item.add||item.occurredMoney ==0" @click="reduceExpenses(index)" class="fl delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                                </div>
                            </div>
                            <div class="together-foot">
                                <p class="f-fl" style="margin-left:20px" v-if="totalMoney<0">待付：
                                    <span style="color:#FB4246;">{{totalMoney}}元</span>
                                </p>
                                <p class="f-fl" style="margin-left:20px" v-else>待收：
                                    <span style="color:#0A87F8;">{{totalMoney}}元</span>
                                </p>
                                <div @click="addExpenses2" class="togetherAdd cursor f-fr" style="color:#FB4246;">
                                    <icon-font style="font-size:16px;color:#FB4246;" type="iconyumengtubiao_tianjiazijian" /> 添加支出</div>
                                <div @click="addExpenses" class="togetherAdd cursor f-fr">
                                    <icon-font style="font-size:16px;color:#0A87F8;" type="iconyumengtubiao_tianjiazijian" /> 添加收入</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </label-item>
        <div class="f-clearfix" style="padding:0 20px;">
            <div class="title-name f-fl"> 收(付)款人信息 </div>
        </div>
        <label-item title="" style="padding:0 20px;margin-bottom: 20px;">
            <a-row :gutter="30">
                <a-col :span="6">
                    <label-item title="收(付)款人姓名"  :mustFill="true">
                        <div class="u-bottom-border ">
                            <a-input v-model="copyBill.payerName" :maxlength="20" placeholder="请输入" />
                        </div>
                    </label-item>
                </a-col>
                <a-col :span="6" >
                        <label-item title="收(付)款人电话"  :mustFill="true">
                            <div class="u-bottom-border ">
                                <a-input v-model="copyBill.payerPhone" :maxlength="11" placeholder="请输入" />
                            </div>
                        </label-item>
                    </a-col>
                <a-col :span="12">
                    <label-item title="收(付)款账号" :mustFill="true">
                        <div class="u-bottom-border address">
                            <a-select v-model="copyBill.paymentAccountType" style="min-width: 80px">
                                <a-select-option :value="1">银联</a-select-option>
                                <a-select-option :value="2">支付宝</a-select-option>
                                <a-select-option :value="3">微信</a-select-option>
                            </a-select>
                            <a-input v-if="copyBill.paymentAccountType!=1" v-model="copyBill.paymentAccount" :maxlength="19" placeholder="请输入" />
                            <a-input v-if="copyBill.paymentAccountType == 1" v-model="copyBill.paymentAccount" :maxlength="19" style="min-width:120px" placeholder="银行卡号" />
                            <a-input v-if="copyBill.paymentAccountType == 1" v-model="copyBill.bankName" :maxlength="19" style="min-width:110px;" placeholder="所属银行" />
                        </div>
                    </label-item>
                </a-col>
            </a-row>
        </label-item>
        <div class="f-clearfix" style="padding:0 20px;">
            <div class="title-name f-fl"> 账单信息 </div>
        </div>
        <label-item title="" style="padding:0 20px;margin-bottom: 10px;">
            <a-row :gutter="30">
                <a-col :span="6" >
                        <label-item title="预计收(付)日期" :mustFill="true" style="width: 100%">
                        <div class="u-bottom-border" style="width: 100%">
                            <a-date-picker style="width: 100%" v-model="copyBill.predictTime" :format="dateFormat" />

                        </div>
                    </label-item>
                </a-col>
                <a-col :span="12">
                    <label-item title="账单周期" :mustFill="true">
                        <div class="u-bottom-border address">
                            <a-range-picker v-model="timeDateList" :format="dateFormat" @change="onTimeChange" :allowClear="false" />
                        </div>
                    </label-item>
                </a-col>
            </a-row>
        </label-item>
        <label-item class="u-bottom-border textAreaStyle" style="width: 960px;margin:14px 20px 0 20px;margin-bottom: 20px;" title="账单备注" :maxSize="500" :valLength="copyBill.comment.length">
            <a-textarea v-model="copyBill.comment" maxlength="500" :autosize="{ minRows: 1, maxRows: 5 }" placeholder="请输入备注信息" />
        </label-item>
        <div class="titlepz" style="padding:0 20px;margin-bottom: 10px;">
            账单凭证
            <span>（附件支持格式：jpg、png、jpeg）</span>
        </div>
        <div style="padding:0 20px;">
            <!-- <a-upload listType="picture-card" :headers="uploadHeader" class="avatar-uploader" :action="action" @change="handleChange" :data="sendData" @preview="handlePreview">
                <img v-if="imageUrl" :src="imageUrl" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">Upload</div>
                </div>
            </a-upload> -->
            <own-upload :picList="copyBill.billAnnexList" :uploadParms="sendData4_1" :showTips="false" ref="img4_1">
            <!-- <img src="../../../assets/login/other.png" class="choose" /> -->
        </own-upload>
        </div>
        <div class="foot">
            <a-button size="large" type="primary" html-type="submit" class="btn" @click="save">
                保存
            </a-button>
            <a-button size="large" html-type="submit" class="btn" @click="closeThis">
                取消
            </a-button>
        </div>
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { dictionaryListDict,listEnableDict} from '@/api/contract.js';
import { searchHouse } from '@/api/reserve'
import { billView,billEdit } from '@/api/bill';
export default {
    name: "editBill",
    components: {
    },
    props: {
        billId: {
            type: String
        },
    },
    data() {
        return {
            placeholder: '请输入房源地址',
            nowTime: new Date().getTime(),
            houseData: {
                cityId: '',                     // 城市id
                communityId: '',
            },
            dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            uploadHeader: {
                Authorization: ""
            },
            action: process.env.VUE_APP_BASE_FILESERVER_URL + "/file_upload",
            // copyBill: {
            //     bizType:1,                        //账单业务类型【1、房源，2、租客，3、业主】
            //     bankName:'',                     //收付款账号开户行
            //     beginTime:null,                  //费用开始时间
            //     endTime:null,                    //费用结束时间
            //     comment:'',                      //账单备注
            //     fileIdList:[],                     //账单附件Id集合
            //     feeInfoList:[],                     //费用信息
            //     fullAddress: '',                  //房源详细地址
            //     houseAlias:'',                    //房屋编号【快速检索用】
            //     maintainerId:'',                  //负责人ID
            //     payerName:'',                     //收付款人姓名
            //     payerPhone:'',                    //收付款人手机号
            //     paymentAccount:'',                //收付款账号
            //     paymentAccountType:1,            //收付款账号类型【1银行卡2支付宝3微信】
            //     predictTime:null,                   //预收付时间
            //     houseId: '',                      //房源id
            //     housePid: '',                     //父房源id
            //     bankName:'',                     //收付款账号开户行
            //     billType:1, //不传  账单类型
            //     payInfo:{}                        //添加账单-支付信息
            // },
            payInfo:{
                paymentMethod:'',
                paymentNote:'',
                practicalTime:null,
                voucherIdList:[]
            },
            loading: false,
            imageUrl: '',
            sendData4_1: {},
            previewVisible: false,
            previewImage: '',
            fileIdList: [],
            voucherIdList: [],
            communityList: [],
            mustFillBorder: false,
            clickSave: false,
            errFul: false,
            options13: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 99 }],
            BillExpenses: [], // 账单费用
            deletedFeeIdList:[],//删除的费用ID集合
            costTabsContent: [], // 费用类型
            payLits: [], //支付途径
            elcostcascaderValue: {
                value: 'id',
                label: 'name',
                children: 'metaList'
            },
            timeDateList: [],
            dateFormat: 'YYYY.MM.DD',           //日期选择器格式
            copyBill:{
                comment:'',
            },
            imgList4_1: [],
        }
    },
    mounted() {
      this.sendData4_1 = {
            // 上传时附带的额外参数
            bizId: this.billId, // 房源id
            bizType: 4, // 图片大类标识 // 合同
            subBizType: 2, // 图片子类标识 // 合同附件
            orderIndex: 1 // 排序值
        }
    },
    created() {

        this.getCost();
        const token = this.$ls.get(ACCESS_TOKEN)
        this.uploadHeader.Authorization =
            "Bearer " + token;
        this.getBill();
    },
    computed: {
        totalMoney() {
            let total = 0;
            for (let item of this.BillExpenses) {
                if (item.feeDirection === 1) {
                total += item.originalMoney * 1;
                } else {
                total -= item.originalMoney * 1;
                }
            }
            return total.toFixed(2);
        }
    },
    methods: {
        getBill() {
            billView(this.billId).then(res => {

                if (res.code === '200') {
                    let bill = res.data;
                    this.copyBill = Object.assign({}, bill);
                    this.BillExpenses = this.copyBill.feeInfoList;
                    this.BillExpenses.forEach(function(e) {
                        e.originalMoney = e.originalMoney/100;
                        e.occurredMoney = e.occurredMoney/100;
                        e.notOccurredMoney = e.notOccurredMoney/100;
                    }, this);

                    let predictTime = bill.predictTime;
                    let time = new Date(predictTime);
                    this.copyBill.predictTime = this.$moment(time.getTime());
                    let data = []
                    data.push(this.$moment(bill.beginTime));
                    data.push(this.$moment(bill.endTime));
                    this.timeDateList = data;


                }
            })
        },
        // 获取费用类型
        getCost(filterIndex, type, id) {
            const params = 'FEESUBJECT';
            dictionaryListDict(params).then(res => {
                // console.log(res)
                if (res.code === "200") {
                    const checkRes = res.data;
                    this.costTabsContent = checkRes;
                    // this.info = res.data;
                }
            })
            listEnableDict('7bf14df972f64b94b7da8d3ff88ead18').then(res => {
                this.payLits = res.data;
                res.data.forEach((data, i) => {
                    if (data.name === '现金') {
                        this.payInfo.paymentMethod = data.id;
                    }
                });
            });
        },
        addExpenses() {
            this.BillExpenses.push({
                add:true,
                feeSubjectId: '',
                originalMoney: 0,
                occurredMoney: 0,
                notOccurredMoney: 0,
                feeDirection: 1
            });
        },
        addExpenses2() {
            this.BillExpenses.push({
                add:true,
                feeSubjectId: '',
                originalMoney: 0,
                occurredMoney: 0,
                notOccurredMoney: 0,
                feeDirection: 2
            });
        },
        reduceExpenses(index) {
            if (this.BillExpenses.length == 1) {
                this.$message.warning('不能再删咯！');
            } else {
                if(!this.BillExpenses[index].add){
                  this.deletedFeeIdList.push(this.BillExpenses[index].id)
                }
                this.BillExpenses.splice(index, 1);
            }
        },
        // 费用类型方法
        costSelect(value, index) {
            if (value[1]) {
                // this.BillExpenses[index].feeSubjectId = value[1];
                let obj = this.BillExpenses[index];
                obj.feeSubjectId = value[1];
                this.BillExpenses.splice(index, 1, obj);
            } else {
                // this.BillExpenses[index].feeSubjectId = value[0];
                let obj = this.BillExpenses[index];
                obj.feeSubjectId = value[0];
                this.BillExpenses.splice(index, 1, obj);
            }
        },
        onTimeChange(date, dateString) {
            this.copyBill.beginTime = date[0];
            this.copyBill.endTime = date[1];

        },
        changeCount(i,v){
          v.notOccurredMoney = v.originalMoney;
        },
        info(res) {
            this.addressFul = true;
            this.copyBill.fullAddress = res.cityName + res.areaName + res.townName + res.fullAddress;
            this.copyBill.houseId = res.id;
            this.copyBill.housePid = res.id;
        },
        handleChange({ fileList }) {
            this.fileIdList = fileList;
        },
        handleChange1({ fileList }) {
            this.voucherIdList = fileList;
        },
        // upload(subType) {
        //     this.sendData.subType = subType;
        //     this.uploadDisabled = false;
        //     if (this.fileIdList) {
        //         this.sendData.orderIndex = this.fileIdList.length + 1;
        //     } else {
        //         this.sendData.orderIndex = 1;
        //     }
        // },
        handlePreview(file) {
            this.previewImage = file.url || file.thumbUrl;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        isEmpty(res) {
            if (!this.copyBill.houseId) {
                this.mustFillBorder = true
            } else {
                this.mustFillBorder = false
            }
        },
        getCommunity(communityId) {

            this.copyBill.houseId = communityId;
            this.mustFillBorder = false;
            this.communityList.forEach(function(e) {
                if (e.houseId == communityId) {
                    this.copyBill.fullAddress = e.fullAddress;
                    this.copyBill.housePid = e.housePid;
                    this.copyBill.houseAlias = e.houseAlias;
                }
            }, this);
            // console.log('2222',this.mustFillBorder,this.copyBill)
            // console.log(communityId)
        },
        selectCommunity(searchVal) {
            let data = {
                fuzzyKeyword: searchVal
            }
            this.copyBill.fullAddress = searchVal;
            // console.log(searchVal)
            searchHouse(data).then(res => {
                // console.log(res)
                if (res.code == "200") {
                    if (res.data.length > 0) {
                        this.communityList = res.data;
                        this.errFul = false;
                    } else {
                        this.communityList = [];
                        this.errFul = true;
                    }
                }

            })
        },
        save() {
            // if(this.parData.terminateType == 2 && !this.parData.quiteReason){
            //     this.$message.warning('请选择解约原因！');
            //     return;
            // }
            // if (!this.parData.quiteDate) {
            //     this.$message.warning('请输入解约时间！');
            //     return;
            // }
            if (
                this.BillExpenses.some(e => {
                    return (
                        e.feeSubjectId === '' || !e.feeSubjectId || e.originalMoney === ''
                    );
                })
            ) {
                this.$message.error('请填写完整的费用收支');
                return;
            }

            if (this.$refs.img4_1.picsList.length != 0) {
                let imgObj4_1 = this.$refs.img4_1.picsList;
                let arrImg = [];
                if (imgObj4_1.length > 0) {
                    imgObj4_1.forEach(function(e) {
                        arrImg.push(e.id)
                    }, this);
                }
                this.imgList4_1 = arrImg;
            }
            let fileImgss = [];
            this.imgList4_1.forEach(function(e) {
                fileImgss.push(e);
            }, this);
            this.copyBill.fileIdList = fileImgss;
            let feeInfoList = JSON.parse(JSON.stringify(this.BillExpenses));
            for (let item of feeInfoList) {
                item.originalMoney = Math.round(item.originalMoney * 100);
                item.notOccurredMoney = Math.round(item.notOccurredMoney * 100);
                item.occurredMoney = Math.round(item.occurredMoney * 100);
            }
            let feeInfoListAdd = [];
            feeInfoList.forEach(function(e) {
                if(e.add){
                  feeInfoListAdd.push(e)
                }
            }, this);

            let postData = {
                bankName:this.copyBill.bankName,
                beginTime:this.$moment(this.copyBill.beginTime).format('YYYY-MM-DD'),
                comment:this.copyBill.comment,
                deletedFeeIdList:this.deletedFeeIdList,
                endTime:this.$moment(this.copyBill.endTime).format('YYYY-MM-DD'),
                feeInfoList:feeInfoListAdd,
                id:this.billId,
                payerName:this.copyBill.payerName,
                payerPhone:this.copyBill.payerPhone,
                paymentAccount:this.copyBill.paymentAccount,
                paymentAccountType:this.copyBill.paymentAccountType,
                predictTime:this.$moment(this.copyBill.predictTime).format('YYYY-MM-DD')
            }
            billEdit(postData).then(res => {
                // console.log(res)
                if (res.code === "200") {
                    this.$message.success('操作成功！');
                    this.$emit('saveSuccess', true);
                    // this.info = res.data;
                }
            })
        },
        closeThis() {
            this.$emit('closeThis', true);
        },
        saveAddReserve() {
            return new Promise((resolve, reject) => {
                if (!this.copyBill.fullAddress) {
                    this.mustFillBorder = true;
                    this.$message.warning('请输入房源地址！');
                    reject()
                    return;
                } else {
                    this.mustFillBorder = false;
                }
                this.clickSave = true;
                let mustKey = true
                if (!this.copyBill.money) {
                    this.$message.warning('请输入预定金额！');
                    reject()
                    return;
                }
                if (!this.copyBill.name) {
                    this.$message.warning('请输入姓名！');
                    reject()
                    return;
                }
                if (!this.copyBill.phone) {
                    this.$message.warning('请输入电话');
                    reject()
                    return;
                } else if (!/^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(this.copyBill.phone)) {
                    this.$message.warning('手机号码输入错误');
                    reject()
                    return;
                }
                // this.copyBill.money = this.copyBill.money*100;
                let idList = [];
                this.fileIdList.forEach(function(e) {
                    let res = e.response.data;
                    idList.push(res.id)
                })
                this.copyBill.fileIdList = idList;
                let gradingData = JSON.parse(JSON.stringify(this.copyBill));
                this.$emit('saveSuccess', gradingData);

            })
        },





    }

}
</script>

<style scoped lang="less">
.edit-bill {
    // padding: 0 20px 20px 20px;
    height: calc(100vh - 150px);
    overflow: auto;
    .house-address {
        width: 100%;
        height: 40px;
        background: rgba(233, 241, 255, 1);
        opacity: 0.99;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(119, 119, 119, 1);
        line-height: 40px;
        padding: 0 20px;
    }
    .top-btn {
        // height: 80px;
        background: rgba(237, 243, 254, 1);
        // opacity: 0.99;
        padding: 20px;
        .top-left {
            height: 40px;
            & /deep/ .ant-radio-group {

                .ant-radio-button-wrapper {
                    height: 40px;
                    width: 68px;
                    line-height: 40px;
                    padding: 0 16px;
                    font-size: 16px;
                }
            }
        }
        .top-right {
            width: 540px;
            height: 40px;
            & /deep/ .ant-select-selection__rendered {
                height: 40px;
                line-height: 40px;
            }
            & /deep/.ant-select-selection--single {
                height: 40px;
                line-height: 40px;
            }
        }
        .houseType {
            margin-top: 20px;
            .houseType-left {
                width: 80px;
                height: 70px;
                background: rgba(246, 247, 248, 1);
                padding: 15px;
                font-size: 13px;
                color: rgba(10, 135, 248, 1)
            }
            .houseType-right {
                height: 70px;
                background: #fff;
                width: 674px;
                & /deep/ .title {
                    margin-top: 0;
                }
                & /deep/ .label-item {
                    height: 50px;
                }
            }
        }
    }
    .contract-modular {
        width: 958px; // padding: 13px 0 5px 18px;
        .titleInfo {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            position: relative;
            box-sizing: border-box;
            margin: 11px 0;
            b {
                font-weight: normal;
            }
        }
        .content-row {


            .together-item {
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
                            padding: 0px 26px;
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
                            text-align: center;
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
                            text-align: left;
                            // padding: 0 9px;
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
                        & /deep/.ant-cascader-picker-label{
                              text-align: left;
                              padding:0;
                        }
                    }
                    .together-foot {
                        height: 40px;
                        line-height: 40px;
                        border-right: 1px solid @borderColor;
                        border-bottom: 1px solid @borderColor;
                        .togetherAdd {
                            height: 40px;
                            line-height: 40px;
                            color:#0A87F8;
                            width: 100px;
                            margin: 0 auto;
                            text-align: center;
                            i{
                                /*vertical-align: middle;*/
                                vertical-align: -0.25em;
                            }
                        }
                    }
                }
            }
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
    .err-p {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 160, 54, 1);
        line-height: 17px;
        position: absolute;
    }
    .titlepz {
        margin-top: 6px;
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
    .textAreaStyle{
        & /deep/ .ant-input {
            line-height: 18px !important;
        }
    }
    & /deep/ .ant-input,
    & /deep/ .ant-select-selection__rendered,
    & /deep/ .ant-select-selection--single {
        height: 32px;
        font-size: 14px;
        line-height: 32px;
        margin-left:0;
    }
    & /deep/.label-item .addon-after {
        height: 32px;
        font-size: 14px;
        line-height: 32px;
    }
    & /deep/ input{
            text-align: left;
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
    .itemBg{
        background: #F6F7F8!important;
    }
    .title-name {
        margin-left: 10px;
        height: 20px;
        line-height: 20px;
        font-weight: 600; // border-bottom: 1px solid #f3f3f2;
        position: relative;
    }
    .title-name::before {
        content: "";
        position: absolute;
        top: 2px;
        left: -9px;
        height: 14px;
        width: 2px;
        background: #0A87F8;
        -webkit-transition: all 0.3s ease;
        -webkit-box-shadow: 0 0 4px 0 @borderColor;
        box-shadow: 0 0 4px 0 @borderColor;
    }
    /deep/ .ant-calendar-range-picker-separator{
        position: absolute;
        left: 115px;
    }
}
</style>
