<template>
    <div class="register-content-info">
        <div class="mainBody">
            <div class="leftBg f-fl">
            </div>
            <div class="rightCot f-fr">
                <div class="title">
                    创建企业
                </div>
                <!-- <div class="partOne part">
                    <div>
                        公寓名称
                        <span class="must">*</span>
                    </div>
                    <div class="part_value u-bottom-border">
                        <a-input maxlength="25" v-model="apartmentName" show-word-limit placeholder="请输入公寓名称"></a-input>
                    </div>
                </div> -->
                <label-item class="u-bottom-border partOne part" title="公寓名称" :maxSize="25" :valLength="apartmentName.length" :mustFill="true">
                   <a-input maxlength="25" v-model="apartmentName" show-word-limit placeholder="请输入公寓名称"></a-input>
                </label-item>
                <div class="part">
                    <div>
                        运营模式<span class="must">*</span>
                    </div>
                    <div class="part_value border-bm u-bottom-border" style="padding: 4px 0;">
                        <a-checkbox-group :options="checkedTypes" v-model="bizModeList" @change="onChange" />
                    </div>
                </div>
                <!-- <div class="part">
                    <div>
                        房源数量
                        <span class="must">*</span>
                    </div>
                    <div class="part_value u-bottom-border">
                        <a-input maxlength="25" v-model="houseQuantity" @input.native="phoneChange" show-word-limit placeholder="请输入房源数量"></a-input>
                    </div>
                </div> -->
                <label-item class="u-bottom-border part"  title="房源数量" addonAfter="间" :mustFill="true"> 
                   <a-input maxlength="10" v-model="houseQuantity" show-word-limit placeholder="请输入房源数量" @input.native="phoneChange"></a-input>
                </label-item>
                <div class="part">
                    <div>
                        运营覆盖城市<span class="must">*</span>
                    </div>
                    <div class="part_value u-bottom-border">
                        <a-form-item label="" has-feedback>
                            <a-select mode="multiple" labelInValue :value="value" placeholder="请输入城市关键字选择城市" style="width: 100%" :filterOption="false" @search="fetchUser" @change="handleChange" :notFoundContent="fetching ? undefined : null">
                                <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                                <a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </div>
                <div class="footer">
                    <div>
                        <a-button :type="buttonType" :loading="isloading" @click="creatCompany">创建</a-button>
                    </div>
                    <div style="clear:both;"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import debounce from 'lodash/debounce';
import {
    searchCity, independentCreate
} from '@/api/enterprise';
export default {
    name: 'Register',
    components: {},
    props: {
    },
    data() {
        // this.lastFetchId = 0;
        // this.fetchUser = debounce(this.fetchUser, 800);
        return {
            lastFetchId: 0,
            data: [],
            value: [],
            fetching: false,
            apartmentName: '',
            remoteLoading: false,
            buttonType: 'info',
            agree: true,
            eyes: false,
            pwdType: 'password',
            registerForm: {
                cityList: []
            },
            canCreat: true,
            isloading: false,
            bizModeList: [],
            checkedTypes: ['合/整租', '独栋'],
            houseQuantity: '',
            name: '',
            empAccountId: ''
        };
    },

    created() {
        this.fetchUser = debounce(this.fetchUser, 300);
        this.empAccountId = this.$ls.get('empAccountId');
    },
    methods: {
        phoneChange(e) {
            e.target.value = e.target.value.replace(/[^\.\d]/g, '');
            // console.log(this.ruleForm.companyTel);
            this.houseQuantity = e.target.value;
        },
        onChange(checkedList) {
            // console.log(checkedList)
            //  console.log(this.bizModeList)
            // this.bizModeList = !!checkedList.length && checkedList.length < plainOptions.length;
            // this.checkAll = checkedList.length === plainOptions.length;
        },
        fallback() {
            this.$router.push({
                path: '/enterpriseList'
            });
        },
        fetchUser(value) {
            this.lastFetchId += 1;
            const fetchId = this.lastFetchId;
            this.data = [];
            if (value !== '') {
                this.fetching = true;
                searchCity(value).then(res => {
                    if (res.code === '200') {
                        if (fetchId !== this.lastFetchId) {
                            // for fetch callback order
                            return;
                        }
                        const data = res.data.map(user => ({
                            text: user.name,
                            value: user.id,
                        }));
                        this.data = data;
                        this.fetching = false;
                    }
                });
            } else {
                this.data = [];
            }

        },
        handleChange(value) {
            Object.assign(this, {
                value,
                fetching: false,
            });
            this.registerForm.cityList = value;
        },
        checkAgree() { },
        changeSeePwd() {
            this.eyes = !this.eyes;
            if (this.eyes) {
                this.pwdType = 'text';
            } else {
                this.pwdType = 'password';
            }
        },
        creatCompany() {
            const _this = this;
            if (this.checkDate()) {
                this.isloading = true;
                if (this.empAccountId) {
                    let bizModeListParam = [];
                    if(this.bizModeList&&this.bizModeList.length>0){
                        this.bizModeList.forEach((item)=>{
                            if(item=='合/整租'){
                                bizModeListParam.push('1');
                            }
                            if(item=='独栋'){
                                bizModeListParam.push('2');
                            }
                        });
                    }
                    let bizModeListParamStr = bizModeListParam.join(',');
                    let arrData = [];
                    this.registerForm.cityList.forEach((value, index) => {
                        let arritem = {
                            cityId: value.key,
                            cityName: value.label
                        };
                        arrData.push(arritem);
                    });
                    let sendDate = {
                        apartmentName: this.apartmentName,
                        bizMode: bizModeListParamStr,
                        cityList: arrData,
                        empAccountId: this.empAccountId,
                        houseQuantity: this.houseQuantity,
                        name: this.apartmentName
                    };
                    if (this.canCreat) {
                        this.canCreat = false;
                        independentCreate(sendDate).then(res => {
                            if (res.code === '200') {
                               _this.$message.success('恭喜你，注册成功！');
                               _this.$emit('addSuccess', true);
                               _this.isloading = false;
                            } else {
                                this.canCreat = true;
                                this.isloading = false;
                            }
                        });
                    } else {
                        this.$message.error('正在进行注册，请勿重复点击！');
                    }
                } else {
                    this.$message.error('请先注册！');
                    this.isloading = false;
                }
            }
        },
        monitorData() {
            if (this.apartmentName && this.registerForm.cityList.length > 0) {
                this.buttonType = 'primary';
            } else {
                this.buttonType = 'info';
            }
        },
        checkDate() {
            if (!this.apartmentName) {
                this.$message.error('请输入公寓名称！');
                return false;
            }
            if (this.bizModeList.length == 0) {
                this.$message.error('请选择运营模式！');
                return false;
            }
            if (!this.houseQuantity) {
                this.$message.error('请输入房源数量');
                return false;
            }
            if (this.registerForm.cityList.length == 0) {
                this.$message.error('请选择运营城市！');
                return false;
            }
            return true;
        }
    },

    watch: {
        apartmentName() {
            this.monitorData();
        },
        registerForm: {
            handler() {
                this.monitorData();
            },
            deep: true
        }
    }
};
</script>

<style lang="less" scoped>
.register-content-info {
    
    width: 100%; //   padding: 0 20px 30px;
    .logo-wrap {
        background: url("../../../assets/login/registeredcompany.png") no-repeat;
        background-size: cover; // display: flex;
        text-align: center;
        height: 60px;
        line-height: 60px;

        img {
            display: inline-block;
            width: 42px;
            height: 37px;
            vertical-align: middle;
        }
        .logoName {
            display: inline-block;
            height: 37px;
            line-height: 37px;
            vertical-align: middle;
            margin-left: 10px;
            font-size: 18px;
            color: #fff;
        }
    }
    .fallback {
        .anticon {
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
        }
        margin-top: 20px;
        margin-left: 40px;
        width:120px;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular,
        PingFang SC;
        font-weight:400;
        color:rgba(51,
        51,
        51,
        1);
        line-height:22px;
    }
    .mainBody {
        width: 100%;
        overflow: auto;
        // height: calc(100vh - 102px); // height: 100%;
        height: calc(100vh - 100px); 
        .leftBg {
            width: 634px;
            height: 100%;
            background: url("../../../assets/login/addRegistered.png") no-repeat 0 -38px;
        }
        .rightCot {
            width: calc(100% - 634px);
            height: 100%;
            .title {
                margin: 38px auto 0;
                width: 480px;
                height: 46px;
                font-size: 33px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: rgba(10, 135, 248, 1);
                line-height: 46px;
            } // .title,
            // .part {
            //     margin-left: 121px;
            // }
        }
    }
    .partOne {
        margin: 40px auto 0!important;
        color: #111111;
        font-size: 14px;
        /deep/ .title span:not(.must-fill){
            color: #111111;
            font-size: 14px;
        }
        /deep/ .ant-input{
            color: #111111;
            font-size: 14px;
        }
        /deep/ .ant-select-selection__placeholder{
            color: #BBBBBB;
            font-size: 14px;
        }
    }
    .part {
        width: 480px;
        margin: 25px auto 0;
        color: #111111;
        font-size: 14px;
        .must {
            display: inline-block;
            margin-left: 4px;
            color: #FB4246;
            font-size: 14px;
            line-height: 20px;
        }
        .border-bm {
            border-bottom: 1px solid #dddddd;
        }
        .part_value {
            .input_wrap {
                width: calc(100% - 100px);
            }
            .verification {
                width: 100px;
                height: 38px;
                line-height: 38px; // color: @mainColor;
                cursor: pointer;
                text-align: right;
            }
            .eyes_wrap {
                text-align: right; // padding-right: 30px;
            }
        }
        /deep/ .title span:not(.must-fill){
            color: #111111;
            font-size: 14px;
        }
        /deep/ .must-fill {
            display: inline-block;
            margin-left: 4px;
            font-size: 14px;
        }
        /deep/ .ant-input{
            color: #111111;
            font-size: 14px;
        }
        /deep/ .ant-checkbox-group-item span{
            color: #111111;
            font-size: 14px;
        }
        /deep/ .ant-select-selection__placeholder{
            color: #BBBBBB;
            font-size: 14px;
        }
        /deep/ .ant-select-selection__rendered > ul > li{
            color: #111111;
            font-size: 14px;
        }
    }
    .footer {
        margin: 56px auto 30px;
        width: 480px;
        height: 44px;
    }
}
</style>
<style lang="less">
.register-content-info {
    .ant-form-item {
        margin-bottom: 0;
        .ant-select-selection--multiple .ant-select-selection__rendered {
            margin-left: 0;
            .ant-select-selection__placeholder {
                margin-left: 0;
            }
        }
    }
    .footer {
        >div {
            .ant-btn {
                background: linear-gradient(316deg, rgba(22, 137, 213, 1) 0%, rgba(45, 145, 231, 1) 100%);
                border-radius: 5px;
                width: 480px;
                height: 44px;
                color: #fff;
            }
        }
    }
}
</style>

