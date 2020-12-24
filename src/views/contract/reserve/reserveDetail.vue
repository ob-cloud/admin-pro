<template>
    <!-- 预定详情 -->
    <div>
        <div class="reserve-detail">
            <div class="house-address">
                <span>房源地址：</span>
                <span v-if="info.houseAlias">{{info.houseAlias}} /</span> {{info.cityName}}{{info.areaName}}{{info.houseAddress}}
            </div>
            
            <div class="top f-clearfix">
                <div class="f-fl title">
                    <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                  <span style="margin-top: 9px" class="radius-font status3" v-if="info.bookStatus==1&&!skeletonLoading"><icon-font type="icon-yumengtubiao_daishiyong" /></span>
                    <span style="margin-top: 9px" class="radius-font status1" v-if="info.bookStatus==2&&!skeletonLoading"><icon-font type="icon-yumengtubiao_daishiyong" /></span>
                    <span style="margin-top: 9px" class="radius-font status2" v-else-if="info.bookStatus==3&&!skeletonLoading"><icon-font type="icon-yumengtubiao_yishiyong" /></span>
                    <span style="margin-top: 9px" class="radius-font status" v-else-if="info.bookStatus==4&&!skeletonLoading"><icon-font type="icon-yumengtubiao_yituiding" /></span>
                    <span style="margin-top: 9px" class="radius-font status" v-else-if="info.bookStatus==5&&!skeletonLoading"><icon-font type="icon-yumengtubiao_yizuofei" /></span>
                  <span style="margin-top: 9px" class="radius-font status" v-else-if="info.bookStatus==6&&!skeletonLoading"><icon-font type="icon-yumengtubiao_yizuofei" /></span>
                    <div>
                        <label-item title="当前状态">
                            <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                          <div class="statusColor2" v-if="info.bookStatus==1&&!skeletonLoading">待支付</div>
                            <div class="statusColor2" v-if="info.bookStatus==2&&!skeletonLoading">待使用</div>
                            <div class="statusColor3" v-if="info.bookStatus==3&&!skeletonLoading">已使用</div>
                            <div class="statusColor4" v-if="info.bookStatus==4&&!skeletonLoading">已退定</div>
                            <div class="statusColor4" v-if="info.bookStatus==5&&!skeletonLoading">已作废</div>
                          <div class="statusColor6" v-if="info.bookStatus==6&&!skeletonLoading">预定失败</div>
                        </label-item>
                    </div>
                </div>
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" style="width:198px">
                        <span style="margin-top: 7px" class="radius-font  radius-font-person">
                            <icon-font type="iconyumengtubiao_jiaosequanxian" />
                        </span>
                        <label-item title="客户信息" :skeletonLoading="skeletonLoading">
                            <div v-if="viewRenterPhoneFlag">{{info.name}} - {{info.phone}}</div>
                          <div v-else>{{info.name}} - {{info.phone|formatPhone}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:180px">
                        <span style="margin-top: 7px" class="radius-font radius-font-yellow">
                            <icon-font type="icon-yumengtubiao_zujin" />
                        </span>
                        <label-item title="定金" :skeletonLoading="skeletonLoading">
                            <div>{{info.money/100}}元</div>
                        </label-item>
                    </div>
              
                    <div class="item" style="width:180px">
                        <span style="margin-top: 7px" class="radius-font radius-font-greed">
                            <icon-font type="icon-yumengtubiao_yinhangka" />
                        </span>
                        <label-item title="支付方式" :skeletonLoading="skeletonLoading">
                            <div>{{info.bookStatus==6?'-':info.paymentMethodName ? info.paymentMethodName : '-'}}</div>
                        </label-item>
                    </div>
                    <div class="item" style="width:140px">
                        <span style="margin-top: 7px" class="radius-font  radius-font-red">
                            <icon-font type="icon-yumengtubiao_riqi" />
                        </span>
                        <label-item title="最晚签约日" :skeletonLoading="skeletonLoading">
                            <div>{{info.signDate|formatTime}}</div>
                        </label-item>
                    </div>
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1" @change="handleCallback">
                    <a-tab-pane key="1">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_gerenxinxi" />预定信息
                        </span>
                        <div class="reserve-content basic-info">

                            <div class="con-detail">

                                <a-row class="one-row">
                                    <a-col class="col" :span="6">
                                        <label-item title="预定人姓名" :skeletonLoading="skeletonLoading">
                                            <div class="cot">
                                                {{info.name}}
                                            </div>
                                        </label-item>
                                    </a-col>
                                    <a-col class="col" :span="6">
                                        <label-item title="预定人电话" :skeletonLoading="skeletonLoading">
                                            <div class="cot" v-if="viewRenterPhoneFlag">
                                              {{info.phone}}
                                            </div>
                                          <div class="cot" v-else>
                                            {{info.phone|formatPhone}}
                                          </div>
                                        </label-item>
                                    </a-col>
                                    <a-col class="col" :span="6">
                                        <label-item title="预定人性别" :skeletonLoading="skeletonLoading">
                                            <div class="cot">
                                                
                                                <span v-if="info.gender==1">男</span>
                                                <span v-else-if="info.gender==2">女</span>
                                                <span v-else>-</span>
                                            </div>
                                        </label-item>
                                    </a-col>
                                    <a-col class="col" :span="6">
                                        <label-item title="身份信息" :skeletonLoading="skeletonLoading">
                                            <div class="cot">
                                                <span v-if="info.certificateType == 1">身份证</span>
                                                <span v-else-if="info.certificateType == 2">护照</span>
                                                <span v-else-if="info.certificateType == 3">港澳通行证</span>
                                                <span v-else-if="info.certificateType == 4">台湾同胞证身份证</span>
                                                <span v-else-if="info.certificateType == 5">企业营业执照</span>
                                                <span v-else-if="info.certificateType == 6">其他</span>
                                                <span v-else>-</span>
                                                / {{info.certificateNo ? info.certificateNo : '-'}}
                                            </div>
                                        </label-item>
                                    </a-col>
                                    <a-col class="col" :span="6">
                                        <label-item title="定金" :skeletonLoading="skeletonLoading">
                                            <div class="cot">
                                                <span>{{info.money/100}}元</span>
                                            </div>
                                        </label-item>
                                    </a-col>
                                    <a-col class="col" :span="6">
                                        <label-item title="支付方式" :skeletonLoading="skeletonLoading">
                                            <div class="cot">
                                                <span>{{info.bookStatus==6?'-':info.paymentMethodName ? info.paymentMethodName : '-'}}</span>
                                            </div>
                                        </label-item>
                                    </a-col>

                                    <a-col class="col" :span="6">
                                        <label-item title="最晚签约日" :skeletonLoading="skeletonLoading">
                                            <div class="cot">
                                                {{info.signDate|formatTime}}
                                            </div>
                                        </label-item>
                                    </a-col>
                                    <a-col class="col" :span="6">
                                        <label-item title="预计租住时长" :skeletonLoading="skeletonLoading">
                                            <div class="cot">
                                                {{info.rentMonth ? info.rentMonth + '个月' : '-'}}
                                            </div>
                                        </label-item>
                                    </a-col>
                                    <a-col class="col" :span="24">
                                        <label-item title="备注信息" :skeletonLoading="skeletonLoading">
                                            <div class="cot">
                                                {{info.comment ? info.comment : '-'}}
                                            </div>
                                        </label-item>
                                    </a-col>
                                </a-row>
                                <a-row class="row" style="margin-bottom:20px;">
                                    <a-col class="col" :span="24">
                                        <label-item title="预定凭证" :skeletonLoading="skeletonLoading">
                                            <div class="showImg f-clearfix">
                                                <span v-if="!imgList||imgList.length==0">-</span>
                                                <div class="f-fl cursor" v-for="(img,index) in imgList" :key="index">
                                                    <div @click="handlePreview(img)"><img :src="img.small" alt=""></div>
                                                </div>
                                            </div>
                                        </label-item>
                                    </a-col>
                                </a-row>
                            </div>
                        </div>
                        <div class="reserve-content" v-if="info.bookStatus == 4">
                            <div class="con-top f-clearfix">
                                <div class="con-title f-fl">
                                    退定信息
                                </div>
                            </div>
                            <div class="con-detail">

                                <a-row class="one-row">
                                    <a-col class="col" :span="24">
                                        <p style="height:34px;line-height:34px;background:rgba(255,160,54,0.1);"><span style="margin-left:10px;font-size:14px;color:rgba(17,17,17,1);">退还金额</span> <span style="margin-left:10px;font-size:14px;color:rgba(255,160,54,1);">{{info.refundMoney/100}} 元</span></p>
                                    </a-col>
                                </a-row>

                                <a-row class="row">
                                    <a-col class="col" :span="24">
                                        <label-item title="退定备注" :skeletonLoading="skeletonLoading">
                                            <div class="cot">
                                                {{info.refundComment ? info.refundComment : '-'}}
                                            </div>
                                        </label-item>
                                    </a-col>
                                </a-row>
                                <a-row class="row">
                                    <a-col class="col" :span="24">
                                        <label-item title="退定凭证" :skeletonLoading="skeletonLoading">
                                            <div class="showImg f-clearfix">
                                                <span v-if="!refundVoucherList||refundVoucherList.length==0">-</span>
                                                <div class="f-fl cursor" v-for="(img,index) in refundVoucherList" :key="index" @click="handlePreview(img)">
                                                    <div><img :src="img.small" alt=""></div>
                                                </div>
                                            </div>
                                        </label-item>
                                    </a-col>
                                </a-row>

                            </div>
                        </div>
                        <div class="reserve-content cot-border" v-if="info.bookStatus == 5">
                            <div class="con-detail">
                                <a-row class="row">
                                    <a-col class="col" :span="24">
                                        <label-item title="作废原因" :skeletonLoading="skeletonLoading">
                                            <div class="cot">
                                                {{info.obsoleteReason ? info.obsoleteReason : '-'}}
                                            </div>
                                        </label-item>
                                    </a-col>
                                </a-row>
                            </div>
                        </div>

                    </a-tab-pane>
                    <a-tab-pane key="2" v-if="permission.billFlag">
                        <span slot="tab">
                            <icon-font type="iconyumengtubiao_caiwuzhangdan" />账单信息
                        </span>
                        <bill-information :billInfos="billInfos" @openDetail="openDetailBill"></bill-information>
                    </a-tab-pane>
                    <div slot="tabBarExtraContent" class="tabs-options">
                         <div v-if="activekey == 1&&!skeletonLoading">
                             <div v-if="info.bookStatus == 1" @click="inviteToPay" v-mark="['mk_contract_reserve_yqzkzf']">
                               <icon-font type="iconyaoqingqueren" />
                               <span> 邀请租客支付</span>
                             </div>
                            <div v-if="info.bookStatus == 2" @click="addContract" v-mark="['mk_contract_tenant_tjht']">
                                <icon-font type="iconyumengtubiao_heyue" />
                                <span> 签约</span>
                            </div>
                            <div @click="unsubscribeFun" v-if="info.bookStatus == 2" v-mark="['mk_contract_reserve_td']">
                                <icon-font type="iconyumengtubiao_fanhui" />
                                <span> 退定</span>
                            </div>
                            <div @click="invalidFun" v-if="info.bookStatus == 1||info.bookStatus == 2" v-mark="['mk_contract_reserve_zf']">
                                <icon-font type="iconyumengtubiao_jinyong" />
                                <span> 作废</span>
                            </div>
                            <div @click="deleteFun" v-if="info.bookStatus == 5||info.bookStatus == 6" v-mark="['mk_contract_reserve_sc']">
                                <icon-font type="iconyumengtubiao_jinyong" />
                                <span> 删除</span>
                            </div>
                           <div @click="associatedFun" v-if="info.houseId==''||info.houseId==null" v-mark="['mk_contract_reserve_glfy']">
                             <icon-font type="icon-yumengtubiao_guanlian" />
                             <span> 关联房源</span>
                           </div>
                        </div>

                    </div>
                </a-tabs>
                <div class="bottom">
                    <span>{{info.createName}}创建于 {{$moment(info.createTime).format('lll')}}</span>
                    <span>{{info.updateName}}更新于 {{$moment(info.updateTime).format('lll')}}</span>
                </div>
            </div>
        </div>

        
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
        <a-modal centered :visible="TdpreviewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="TdpreviewImage" />
        </a-modal>
        <!-- 退订弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="unsubscribeDialog" class="ownModalBorder titDialog" title="退定">
            <unsubscribe-detail :reserveId="reserveId" @saveSuccess="successFun" @closeThis="unsubscribeDialog=false"></unsubscribe-detail>
        </a-modal>
        <!-- 作废弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="invalidDialog" class="ownModalBorder titDialog" title="作废">
            <invalid-detail :reserveId="reserveId" @saveSuccess="successFun" @closeThis="invalidDialog=false"></invalid-detail>
        </a-modal>

        <!-- 账单详情 -->
        <a-modal destroyOnClose centered :maskClosable="false" :footer="null" title="账单详情" width="1000px" v-model="billDetailDialog" class="ownModalBorder titDialog" @cancel="cancelBillDetail">
            <bill-detail :billId="billId"></bill-detail>
        </a-modal>
        <!-- 添加合同弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="addContractDialog" class="ownModalBorder titDialog" title="添加合同" :confirmLoading="confirmLoading">
            <add-contract :reserveFul='reserveFul' :reserveData="reserveData" @cancelUp="addContractDialog = false" @saveSuccess="addContractSuccess" @cancelSaveTenantContract="cancelSaveTenantContract"></add-contract>
        </a-modal>
      <!-- 关联房源弹框 -->
      <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="520px" v-model="associatedDialog" class="ownModalBorder titDialog" title="关联房源">
        <associated-detail :reserveId="reserveId" @saveSuccess="associatedSuccess" @closeThis="associatedDialog=false"></associated-detail>
      </a-modal>
    </div>
</template>

<script>
import unsubscribeDetail from './unsubscribe';
import invalidDetail from './invalid';
import billInformation from './billInformation'
import billDetail from '@/views/finance/bill/billDetails';
import addContract from '../tenant/addTenantContract';
import associatedDetail from './associated';
import { getDateHaoMiao } from '@/utils/util';
import {getReserveInfo, deleteReserve, getSecondsRemaining, sendPaymentMsg} from '@/api/reserve'
export default {
    name: "ShareHouseDetail",
    props: {
        reserveId: {
            type: String,
            default: '',
        },
    },
    components: {
        unsubscribeDetail,
        invalidDetail,
        billInformation,
        billDetail,
        addContract,
        associatedDetail,
    },

    data() {
        return {
            info: {},
            invalidDialog: false,
            unsubscribeDialog: false,
            imgList: [],
            refundVoucherList: [],
            previewVisible: false,
            TdpreviewVisible: false,
            previewImage: '',
            TdpreviewImage: '',
            activekey: 1,
            billInfos:[],
            billId:'',
            billDetailDialog: false,
            addContractDialog: false,
            reserveData: {},
            reserveFul: true,
            confirmLoading: false,
            skeletonLoading:true,
          viewRenterPhoneFlag:false,
          associatedDialog:false,
          permission:{
            billFlag:false,
          },
        }
    },
    created() {
      this.initViewRenter();
        this.getData();
    },
    methods: {
      initViewRenter(){
        let isExit = false;
        let billFlag = false;
        let permissions = JSON.parse(sessionStorage.getItem('permissions'));
        permissions.some(function(value){
          if (value.mark == 'mk_contract_reserve_zkdh'){
            isExit = true;
          }
          if(value.mark == "mk_finance_bill_ck"){
            billFlag = true;
          }
        });
        this.permission.billFlag = billFlag;
        this.viewRenterPhoneFlag = isExit;
      },
        cancelSaveTenantContract(){
            this.addContractDialog = false;
            this.getData();
        },
        addContractSuccess() {
            let _this = this;
            setTimeout(function() {
                _this.addContractDialog = false;
                _this.getData();
                _this.$emit('refreshinfoFun', true);
            }, 500);
        },
      associatedSuccess(){
        let _this = this;
        setTimeout(function() {
          _this.associatedDialog = false;
          _this.getData();
          _this.$emit('refreshinfoFun', true);
        }, 500);
      },
        handleCallback(val) {
            this.activekey = val;
        },
        getData() {
            this.skeletonLoading = true;
            getReserveInfo(this.reserveId).then(res => {
                if (res.code === "200") {
                    this.info = res.data;
                    this.reserveData = res.data;
                    this.imgList = this.info.bookVoucherList;
                    this.refundVoucherList = this.info.refundVoucherList;
                    this.billInfos = this.info.billInfos;
                    this.skeletonLoading = false;
                }
            })
        },
        handlePreview(file) {
            this.previewImage = file.url || file.origin;
            this.previewVisible = true;
        },
        TdhandlePreview(file) {
            this.TdpreviewImage = file.url || file.origin;
            this.TdpreviewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
            this.TdpreviewVisible = false;
        },
      //邀请租客支付
      inviteToPay(){
        let id = this.info.id;
        let _this = this;
        getSecondsRemaining(id).then(res => {
          if (res.code === "200") {
            let time = '';
            if(res.data&&res.data.seconds){
              time = parseInt(res.data.seconds / 60);
            }
            this.$modal.confirm({
              title: '确定要给租客 「' + this.info.name + '/' + this.info.phone + '」 发送预定支付短信吗？',
              content: '租客还有'+ time +'分钟支付时间，超时自动失效，您可重新发起',
              width: "433px",
              height: "192px",
              okText: '确认',
              cancelText: '取消',
              onOk() {
                sendPaymentMsg(id).then(res=>{
                  if (res.code === "200") {
                    _this.$message.success('短信发送成功');
                  }
                  else{
                    _this.$message.error('短信发送失败');
                  }
                });
              },
              onCancel() {
              },
            });
          }
        });
      },
        //签约
        addContract() {
          this.$emit('addContractIng', true);
          this.$emit('reserveId', this.reserveId);
        },
        //退定
        unsubscribeFun() {
            this.unsubscribeDialog = true;
        },
        //作废
        invalidFun() {
            this.invalidDialog = true;
        },
      associatedFun(){
        this.associatedDialog = true;
      },
        //删除
        deleteFun() {
            let _this = this;
            this.$modal.confirm({
                title: '确定要删除员工 「' + this.info.name + '/' + this.info.phone + '」 的预定信息吗吗？',
                content: '删除后将不可恢复',
                width: "433px",
                height: "192px",
                okText: '确认',
                cancelText: '取消',
                icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                onOk() {
                    _this.remove();
                },
                onCancel() {
                },
            });
        },
        remove() {
            //删除
            deleteReserve(this.reserveId).then(res => {
                if (res.code === "200") {
                    this.$message.success('删除成功！');
                    this.$emit('deleteSuccess', true);
                }

            });
        },
        successFun(res) {
            if (res) {
                this.unsubscribeDialog = false;
                this.invalidDialog = false;
                this.getData();
                this.$emit('refreshinfoFun', true);
            }

        },
        openDetailBill(res){
          if(res){
            this.billId = res;
            this.billDetailDialog = true;
          }
        },
        cancelBillDetail(){
            this.billDetailDialog = false;
            let _this = this;
            setTimeout(() => {
                this.getData();
            }, 500)
        }
    },
    filters: {
        formatTime: function(value) {
            if (!value) return '-';
            value = getDateHaoMiao(value);
            return value;
        },
      formatPhone:function (value) {
        var str = String(value)
        var len = str.length;
        var prev,next;
        if (len >= 7) {
          prev = str.slice(-len,-8)
          next = str.slice(-4)
          str = prev+"****"+next
        } else if (len < 7 && len >= 6) {
          prev = str.slice(-len,-4)
          next = str.slice(-2)
          str = prev + "**" + next
        }
        if(!value){
          str = '-';
        }
        return str
      },
    }
}
</script>

<style scoped lang="less">
.reserve-detail {
    
    max-height: calc(100vh - 120px);
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
    .top {
        padding: 20px 20px 0 20px;
        .title {
            display: flex;
            align-items: center;
            width: 138px;
            height: 44px;
            border-right: 1px dashed @borderColor;
            .radius-font {
                width: 44px;
                height: 44px;
                line-height: 44px;
                border-radius: 50%;
                font-size:28px;
            }
            .status2 {
                background: rgba(10, 135, 248, 0.1);
                color: #0A87F8;
            }
            .status1 {
                background:rgba(255,160,54,0.1);
                color: #FFA036;
            }
            .status {
                background: rgba(119, 119, 119, 0.1);
                color: #777777;
            }
          .status3 {
            background: #FEECEC;
            color: #F84246;
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
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(17,17,17,1);
                    }  
                }
            }
            .blank-box {
                width: 50px;
                height: 30px;
            }
        }
        .radius-font-person {
            color: #0A87F8;
            background-color: fade(#0A87F8, 10%);
        }
        .radius-font-greed {
            color: #03C683;
            background-color: fade(#03C683, 10%);
        }
        .radius-font-red {
            color: #F84246;
            background-color: fade(#F84246, 10%);
        }
        .radius-font-yellow {
            color: #FFA036;
            background-color: fade(#FFA036, 10%);
        }
        .radius-font-close {
            color: #777777;
            background-color: fade(#F6F7F8, 100%);
        }
    }
    .radius-font {
        display: inline-block;
        margin-right: 10px;
        width: 32px;
        height: 32px;
        line-height: 32px ;
        font-size: 12px;
        color: #FFA036;
        text-align: center;
        background-color: fade(#FFA036, 10%);
        border-radius: 16px;
    }
    .top-address {
        margin-top: 4px;
    }
    .top-staus {
        width: 80px;
        height: 28px;

        border-radius: 100px 0px 0px 100px;
        margin-right: -20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;

        line-height: 28px;
        padding-left: 12px;
        margin-top: 5px;
    }
    .statusColor2 {
        color: rgba(255, 160, 54, 1);
    }
    .statusColor3 {
        color: rgba(10, 135, 248, 1);
    }
    .statusColor4,
    .statusColor5 {
        color: rgba(119, 119, 119, 1);
    }
  .statusColor6{
      color: rgb(251, 66, 70,1);
  }
    .cot-border{
        border-top:1px dashed #DDDDDD;
    }
    .reserve-content {
        // margin-top: 30px;
        .con-top {
            border-top: 1px dashed #DDDDDD;
            padding-top: 19px;
            .con-title {
                width: 72px;
                height: 24px;
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(17, 17, 17, 1);
                line-height: 24px;
            }
            .fr-btn {
                margin-top: 5px;
                .btn {
                    cursor: pointer;
                    width: 60px;
                    font-size: 12px;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 7px;
                    color: #0A87F8;
                }
                .cen-btn {
                    border-left: 1px dashed #DDDDDD;
                    border-right: 1px dashed #DDDDDD;
                }
            }
        }
        .con-detail {
            .one-row {
                // margin-top: 14px;
            }
            .col {
                margin-top: 18px;
            }
            .cot{
                color:#111;
            }
        }
    }
    .showImg{
        >div {
            height: 76px;
            width: 120px;
            margin-right: 10px;
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
        }
        >div:last-child{
            margin-right: 0px;
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
.tabs-content {
    padding: 0 20px;
    margin-top:20px;
    &/deep/ .ant-tabs-bar{
      margin: 0;
    }
  /deep/ .ant-tabs{
    min-height: 345px;
  }
    .basic-info {
        .input-info {
            display: flex;
            flex-wrap: wrap;
            .item {
                margin: 0 39px 20px 0;
                width: 200px;
                & /deep/ .title {
                    margin-bottom: 4px;
                }
                & /deep/ .ant-select {
                    width: 100%;
                }
                .showImg {
                    >div {
                        width: 150px;
                        height: 120px;
                        border-radius: 4px; // border:1px solid rgba(221,221,221,1);
                        margin-right: 16px;
                        img {
                            width: 100%;
                            height: 95px;
                            overflow: hidden;
                        }
                        p {
                            color: rgba(119, 119, 119, 1);
                            font-size: 12px;
                            text-align: center;
                            margin-top: 8px;
                        }
                    }
                }
            }
            .public-config {
                display: flex;
                flex-wrap: wrap;
                label {
                    width: 100px;
                    margin: 10px 0 20px 0;
                    padding: 0;
                }
            }
        }
    }
}
.bottom {
    margin-top: 20px;
    // padding: 0 20px;
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
    width: 24px;
    height: 24px;
    font-size: 14px;
    color: #FFA036;
    text-align: center;
    background-color: fade(#FFA036, 10%);
    border-radius: 50%;
}

.radius-font-person {
    color: #0A87F8;
    background-color: fade(#0A87F8, 10%);
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
            padding: 0 14px 0 0;
            border-right: 1px dashed #ccc;
        }
    }
    div:last-child {
        span {
            margin-right: 0;
            border-right: none;
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
    margin: 0 30px 0 0;
    padding: 8px 0;
}
</style>
