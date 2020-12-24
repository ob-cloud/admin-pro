<template>
    <div class="appointmentDetails-box">
        <div class="address">{{appointmentDetails.houseAlias?appointmentDetails.houseAlias+'/':''}}{{appointmentDetails.fullAddress}}</div>
        <div class="top f-clearfix">
            <div class="f-fl title">
                <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                <span style="margin-top: 9px;" class="radius-font status1" v-if="appointmentDetails.status==1&&!skeletonLoading"><icon-font type="icondaichuli" /></span>
                <span style="margin-top: 9px;" class="radius-font status2" v-else-if="appointmentDetails.status==2&&!skeletonLoading"><icon-font type="iconyichuli" /></span>
                <span style="margin-top: 9px;" class="radius-font status3" v-else-if="appointmentDetails.status==3&&!skeletonLoading"><icon-font type="iconyiquxiao" /></span>
                <div style="padding-left: 5px;">
                    <label-item title="当前状态">
                        <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                        <div v-if="appointmentDetails.status==1&&!skeletonLoading">待处理</div>
                        <div v-else-if="appointmentDetails.status==2&&!skeletonLoading">已处理</div>
                        <div v-else-if="appointmentDetails.status==3&&!skeletonLoading">已取消</div>
                    </label-item>
                </div>
            </div>
            <div class="f-fl detail">
                <div class="blank-box"></div>
                <div class="item">
                    <span style="margin-top: 7px;" class="radius-font radius-font-greed">
                        <icon-font type="iconyumengtubiao_jiaosequanxian" />
                    </span>
                    <label-item title="客户信息" :skeletonLoading="skeletonLoading">
                        <div>{{appointmentDetails.name|blankVal}} - {{appointmentDetails.phone|blankVal}}</div>
                    </label-item>
                </div>
                <div class="item">
                    <span style="margin-top: 7px;" class="radius-font radius-font-yellow">
                        <icon-font type="iconqiwangdaikanshijian" />
                    </span>
                    <label-item title="期望带看时间" :skeletonLoading="skeletonLoading">
                        <div>{{appointmentDetails.seeTime?$moment(appointmentDetails.seeTime).format('YYYY.MM.DD HH:mm'):'-'}}</div>
                    </label-item>
                </div>
            </div>
        </div>
        <div class="tabs-content">
            <a-tabs size="small" defaultActiveKey="1">
                <a-tab-pane key="1">
                    <span slot="tab">
                        <icon-font type="iconyumengtubiao_jibenxinxi" /> 基本信息
                    </span>
                    <div class="basic-info">
                        <div class="input-info">
                            <label-item class="item u-bottom-border" style="margin-top: 5px;" title="来源" :skeletonLoading="skeletonLoading">
                                <span>{{appointmentDetails.sourceName|blankVal}}</span>
                            </label-item>
                            <label-item class="item u-bottom-border" style="margin-top: 5px;" title="客户姓名" :skeletonLoading="skeletonLoading">
                                <span>{{appointmentDetails.name|blankVal}}</span>
                            </label-item>
                            <label-item class="item u-bottom-border" style="margin-top: 5px;" title="客户电话" :skeletonLoading="skeletonLoading">
                                <span>{{appointmentDetails.phone|blankVal}}</span>
                            </label-item>
                            <label-item class="item u-bottom-border " title="期望带看时间" :skeletonLoading="skeletonLoading">
                                <span>{{appointmentDetails.seeTime?$moment(appointmentDetails.seeTime).format('YYYY.MM.DD HH:mm'):'-'}}</span>
                            </label-item>
                            <label-item class="item u-bottom-border" title="申请时间" :skeletonLoading="skeletonLoading">
                                <span>{{appointmentDetails.createTime?$moment(appointmentDetails.createTime).format('YYYY.MM.DD HH:mm'):'-'}}</span>
                            </label-item>
                            <label-item style="width: 100%" class="item u-bottom-border" title="预约备注" :skeletonLoading="skeletonLoading">
                                <span>{{appointmentDetails.customerNotes|blankVal}}</span>
                            </label-item>
                            <div class="doshed" v-if="appointmentDetails.recordsDTOList&&appointmentDetails.recordsDTOList.length>0"></div>
                            <div style="width:100%;margin: 20px 0;" v-if="appointmentDetails.recordsDTOList&&appointmentDetails.recordsDTOList.length>0">
                                <div class="resultTitle">处理结果</div>
                                <div class="result clearfix" :key="index" v-for="(item,index) in appointmentDetails.recordsDTOList">
                                    <div class="result_time f-fl" style="margin-top: -5px;">
                                        {{item.createTime?$moment(item.createTime).format('YYYY.MM.DD HH:mm'):'-'}}
                                    </div>
                                    <div class="border_style f-fl" :class="index==appointmentDetails.recordsDTOList.length-1?'':'border_left'">
                                        <div class="result_dosh"></div>
                                    </div>
                                    <div class="result_desc f-fl" style="margin-top: -5px;">
                                        <div style="width: 100%">{{item.createrName}} {{item.operateRecords}}</div>
                                        <div style="width: 100%;color: #777777;margin-top: 5px">{{item.reason}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a-tab-pane>
                <div slot="tabBarExtraContent" class="tabs-options" v-show="!skeletonLoading">
                    <div v-if="outterMarkList.indexOf('1')!=-1" @click="openAssignUser()">
                        <icon-font type="iconyumengtubiao_zhipai"/>
                        <span>&nbsp;指派</span>
                    </div>
                    <div v-if="outterMarkList.indexOf('2')!=-1" @click="changPublic()">
                        <icon-font type="iconzhuanrugongke"/>
                        <span>&nbsp;转入公客</span>
                    </div>
                    <div v-if="outterMarkList.indexOf('3')!=-1" @click="changePrivate()">
                        <icon-font type="iconzhuanrusike"/>
                        <span>&nbsp;转入私客</span>
                    </div>
                  <div v-if="outterMarkList.indexOf('4')!=-1" @click="goReserve()">
                    <icon-font type="iconyumengtubiao_yuyue"/>
                    <span>&nbsp;预定</span>
                  </div>
                  <div v-if="outterMarkList.indexOf('5')!=-1" @click="goSign()">
                    <icon-font type="iconyumengtubiao_heyue"/>
                    <span>&nbsp;签约</span>
                  </div>
                  <div v-if="outterMarkList.indexOf('6')!=-1" @click="openAppointmentCancel()">
                      <icon-font type="iconyumengtubiao_jinyong"/>
                      <span>&nbsp;取消</span>
                  </div>
                  <a-popover :title="null" trigger="hover" placement="bottom" v-if="showMoreOperate">
                    <template slot="content">
                      <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('4')!=-1" @click.stop="goReserve" class="action cursor">预定</div>
                      <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('5')!=-1" @click.stop="goSign" class="action cursor">签约</div>
                      <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('6')!=-1" @click.stop="openAppointmentCancel" class="action cursor">取消</div>
                    </template>
                    <div><icon-font type="iconyumengtubiao_gengduo-1" />&nbsp;更多</div>
                  </a-popover>
                </div>
            </a-tabs>
        </div>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignUserDialog" class="ownModalBorder titDialog" title="指派员工" @cancel="cancelAssignUser">
            <assign-user :sourceId="appointmentId" :clueType="clueType" resMark="mk_crm_renter_xsyy" @cancelAssignUser="cancelAssignUser" @successAssignUser="successAssignUser"></assign-user>
        </a-modal>
        <!-- 取消预约 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="cancelAppointmentDialog" class="ownModalBorder titDialog" title="取消预约" @cancel="cancelCancelAppointment">
            <cancel-appointment :infoData="appointmentDetails" @cancelCancelAppointment="cancelCancelAppointment" @successCancelAppointment="successCancelAppointment"></cancel-appointment>
        </a-modal>
      <!-- 添加预定弹框 -->
      <a-modal destroyOnClose  centered  :footer="null" :maskClosable="false" width="800px" v-model="addReserveDialog" class="ownModalBorder titDialog" title="添加预定" @cancel="handleCancelres">
        <add-reserve :sourceFul="true" :sourceObj="sourceObj" @saveSuccess="addReserveSuccess" @cancelUp="addReserveDialog = false"></add-reserve>
      </a-modal>
      <!-- 添加合同弹框 -->
      <a-modal destroyOnClose centered :footer="null"  :maskClosable="false" width="1200px" v-model="addContractDialog" class="ownModalBorder titDialog" title="添加合同" @cancel="addContractDialog=false;">
        <add-contract @cancelUp="addContractDialog = false" :sourceFul="true" :sourceObj="sourceObj" @saveSuccess="addReserveSuccess" @cancelSaveTenantContract="addContractDialog=false;"></add-contract>
      </a-modal>
    </div>
</template>

<script>
import  * as API from '@/api/source';
import CancelAppointment  from './cancelAppointment';
import AssignUser from './assignUser';
import AddReserve from '../../contract/reserve/addReserve';
import AddContract from '../../contract/tenant/addTenantContract';
export default {
    name: "appointmentDetails",
    props: {
        appointmentId:{
            type: String,
            required:true,
        }
    },
    components: {
        CancelAppointment,
        AssignUser,
      AddReserve,
      AddContract,
    },
    data() {
        return{
            appointmentDetails:{
                status:1,
            },
            skeletonLoading:false,
            assignUserDialog:false,
            clueType:3,
            cancelAppointmentDialog:false,
          sourceObj:{},
          addReserveDialog:false,
          showMoreOperate:false,          //是否显示更多按钮
          innerMarkList:[],               //更多里面的mark
          outterMarkList:[],              //更多外面的mark
          addContractDialog:false,
        }
    },
    created() {
        this.initData();
    },
    mounted() {
    },
    methods: {
      handleCancelres(){
        this.addReserveDialog = false;
      },
      addReserveSuccess(){
        this.addContractDialog = false;
        this.addReserveDialog = false;
        setTimeout(()=>{
          this.$emit('refreshinfoFun',true);
          this.initData();
        },500);
      },
        changPublic(){
            let _this = this;
            this.$modal.confirm({
                title: '确定要将客户 「' + _this.appointmentDetails.name+'/'+_this.appointmentDetails.phone + '」 转入公客池吗？',
                content: '转入后，将在公客池新增一条记录',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    API.turnPubClue({id:_this.appointmentDetails.id}).then(res=>{
                        if (res.code === '200') {
                            _this.$message.success('转入公客成功');
                            _this.$emit('refreshinfoFun', true);
                            _this.initData();
                        } else {
                            _this.$message.success('转入公客失败');
                            _this.initData();
                        }
                    })
                },
                onCancel() {
                },
            });
        },
      goReserve(){
        this.addReserveDialog = true;
        this.sourceObj = {
          name:this.appointmentDetails.name,
          phone:this.appointmentDetails.phone,
          bizType:1,
          bizId:this.appointmentDetails.id,
        };
      },
      goSign(){
        this.addContractDialog = true;
        this.sourceObj = {
          name: this.appointmentDetails.name,
          phone: this.appointmentDetails.phone,
          gender: '',
          leasePeriod: '',
          sourceChannelId: '',
          bizType: 1,
          bizId: this.appointmentDetails.id,
        }
      },
        changePrivate(){
            let _this = this;
            this.$modal.confirm({
                title: '确定要将客户 「' + _this.appointmentDetails.name+'/'+_this.appointmentDetails.phone + '」 转入自己的私客池吗？',
                content: '转入后，会在您的私客池新增一条记录',
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    API.turnPrivateClue({id:_this.appointmentDetails.id}).then(res=>{
                        if (res.code === '200') {
                            _this.$message.success('转入私客成功');
                            _this.$emit('refreshinfoFun', true);
                            _this.initData();
                        } else {
                            _this.$message.success('转入私客失败');
                            _this.initData();
                        }
                    })
                },
                onCancel() {
                },
            });
        },
        openAssignUser(){
            this.assignUserDialog = true;
        },
        openAppointmentCancel(){
            this.cancelAppointmentDialog = true;
        },
        cancelCancelAppointment(){
            this.cancelAppointmentDialog = false;
        },
        successCancelAppointment(){
            this.cancelAppointmentDialog = false;
            this.$emit('refreshinfoFun', true);
            this.initData();
        },
        cancelAssignUser(){
            this.assignUserDialog = false;
        },
        successAssignUser(){
            this.assignUserDialog = false;
            this.$emit('refreshinfoFun', true);
            this.initData();
        },
      getPermission(){
        // 1 指派
        // 2 转入公客
        // 3 转入私客
        // 4 预定
        // 5 签约
        // 6 取消
        let permissions = JSON.parse(sessionStorage.getItem('permissions'));
        let markArr = [];
        let btnArr = [];
        if(this.appointmentDetails.status==1){
          markArr.push('mk_source_tenant_xsyy_zp');
          markArr.push('mk_source_tenant_xsyy_zwgk');
          markArr.push('mk_source_tenant_xsyy_zwsk');
          markArr.push('mk_contract_reserve_tjyd');
          markArr.push('mk_contract_tenant_tjht');
          markArr.push('mk_source_tenant_xsyy_qx');
        }
        else if(this.appointmentDetails.status==2){
          markArr.push('mk_source_tenant_xsyy_zp');
        }
        //判断资源权限
        markArr.forEach(ele => {
          permissions.some(function(value){
            if (ele == value.mark){
              if(value.mark == 'mk_source_tenant_xsyy_zp'){
                btnArr.push('1');
              }else if(value.mark == 'mk_source_tenant_xsyy_zwgk'){
                btnArr.push('2');
              }else if(value.mark == 'mk_source_tenant_xsyy_zwsk'){
                btnArr.push('3');
              }else if(value.mark == 'mk_contract_reserve_tjyd'){
                btnArr.push('4');
              }else if(value.mark == 'mk_contract_tenant_tjht'){
                btnArr.push('5');
              }else if(value.mark == 'mk_source_tenant_xsyy_qx'){
                btnArr.push('6');
              }
              return true;
            }
          });

        });

        //显示更多逻辑
        this.outterMarkList = [];
        this.innerMarkList = [];
        if(btnArr.length>4){
          this.showMoreOperate = true;
          for (let i = 0; i < btnArr.length; i++) {
            if(i>2){
              this.innerMarkList.push(btnArr[i]);
            }
            else{
              this.outterMarkList.push(btnArr[i]);
            }
          }
        }
        else{
          this.showMoreOperate = false;
          this.outterMarkList = btnArr;
          this.innerMarkList = [];
        }
      },
        initData(){
            this.skeletonLoading = true;
            API.reservationView(this.appointmentId).then(res=>{
                this.appointmentDetails = res.data;
                if(this.appointmentDetails.recordsDTOList == null){
                    this.appointmentDetails.recordsDTOList = [];
                }
                //判断是否显示更多
              this.getPermission();
                this.skeletonLoading = false;
            })
        },
    },
    filters: {
        blankVal(val){
            if(!val){
                return '-';
            }else{
                return  val;
            }
        },
    }

}
</script>

<style scoped lang="less">
.appointmentDetails-box{
    width: 800px;
    height: calc(100vh - 100px);
    overflow: auto;
    background: #FFFFFF;
    .address{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #e9f1ff;
        opacity: 0.99;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #777777;
        line-height: 40px;
        padding-left: 20px;
    }
    .top {
        padding: 25px 20px 20px 20px;
        .title {
            display: flex;
            align-items: center;
            width: 138px;
            height: 40px;
            margin-top: 10px;
            padding-bottom: 5px;
            border-right: 1px dashed @borderColor;
            .radius-font {
                width: 44px;
                height: 44px;
                line-height: 44px;
                border-radius: 50%;
                font-size:28px;
                text-align: center;
            }
            .status1 {
                background: rgba(251,66,70,0.1);
                color: #FB4246;
            }
            .status2 {
                background: rgba(10, 135, 248, 0.1);
                color: #0A87F8;
            }
            .status3 {
                background: rgba(119, 119, 119, 0.1);
                color: #777777;
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
            padding-left: 40px;
            .item {
                display: flex;
                align-items: center;
                width: 250px;
                font-size: 12px; // padding-left: 40px;
                .radius-font {
                    font-size:18px;
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
            .blank-box {
                width: 30px;
                height: 30px;
            }
            .radius-font {
                display: inline-block;
                margin-right: 10px;
                width: 32px;
                height: 32px;
                line-height: 32px ;
                font-size: 12px;
                text-align: center;
                border-radius: 16px;
            }
        }
    }

    .tabs-content {
        & /deep/ .ant-tabs-bar{
            margin: 0 18px;
        }
        /deep/ .ant-tabs .ant-tabs-small-bar .ant-tabs-tab{
            padding: 8px 16px 8px 0;
        }
        .basic-info {
            padding: 0 18px;
            .input-info {
                display: flex;
                flex-wrap: wrap;
                .item {
                    width: 32%;
                    margin-bottom: 20px;
                    & /deep/ .title {
                        margin-bottom: 4px;
                    }
                    & /deep/ .ant-select {
                        width: 100%;
                    }
                }
                .doshed{
                    width: 100%;
                    height: 2px;
                    border-bottom: 1px dashed #DDDDDD;
                }
                .resultTitle{
                    width: 100%;
                    color: #111111;
                    font-size: 18px;
                    height: 24px;
                    line-height: 24px;
                    margin-bottom: 25px;
                    font-weight:500;
                }
                .result{
                    .result_time{
                        color: #777777;
                        font-size: 14px;
                    }
                    .result_desc{
                        color: #111111;
                        font-size: 14px;
                        width: calc(100% - 150px);
                    }
                    .border_left{
                        border-left: 1px solid #DDDDDD;
                    }
                    .border_style{
                        width: 20px;
                        height: 35px;
                        margin-left: 20px;
                        position: relative;
                        .result_dosh{
                            position: absolute;
                            background:rgba(52,143,229,1);
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            left: -5px;
                            box-shadow:0px 0px 30px 0px rgba(0,0,0,0.3);
                        }
                    }
                }
            }
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
                }
            }
            div:last-child {
                span {
                    margin-right: 0;
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
      & /deep/ .ant-popover {
        position: fixed;
        .ant-popover-inner-content {
          padding: 5px 0;
          width: 80px;
          .action {
            color: #111111;
            width: 100%;
            height: 36px;
            line-height: 36px;
          }
          .action:hover {
            color: #0a87f8;
            cursor: pointer;
            background: rgba(10, 135, 248, 0.1);
          }
        }
      }
    }
    .radius-font-greed {
        color: #03C683;
        background-color: fade(#03C683, 10%);
    }
    .radius-font-yellow {
        color: #FFA036;
        background-color: fade(#FFA036, 10%);
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
</style>
