<template>
    <div class="lockDetails-box">
        <div class="child-detail">
            <div class="house-address clearfix">
              <div class="f-fl">
                <span>已绑房源地址：</span>
                <span v-if="lockDetailData.houseAlias">{{lockDetailData.houseAlias}} /</span> {{lockDetailData.cityName}}{{lockDetailData.areaName}}{{lockDetailData.fullAddress}}
              </div>
              <div class="rentStyle f-fr" v-if="lockDetailData.renterName">
                <icon-font type="iconren" style="margin-right: 5px;" />在租租客：{{lockDetailData.renterName}}-{{lockDetailData.renterPhone}}
              </div>
            </div>
            <div class="top f-clearfix">
                 <div class="f-fl title">
                     <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                     <span style="margin-top: 9px;" v-if="!skeletonLoading" class="radius-font" :class="lockDetailData.onlineStatus==1?'radius-font-person':'radius-font-close'"><icon-font type="iconmensuo1" /></span>
                     <div >
                       <label-item title="当前状态">
                         <div class="clearfix">
                           <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
                           <div class="f-fl" v-if="!skeletonLoading">{{lockDetailData.onlineStatusName?lockDetailData.onlineStatusName:"-"}}</div>
                           <div class="sync_info_style f-fl cursor" @click="syncInfo" v-if="!skeletonLoading&&lockDetailData.brand!=0">
                             <icon-font :class="{'imgrotate_common':syncInfoLoading}" style="margin-right: 3px;" type="iconyumengtubiao_zhongzhi" />同步
                           </div>
                         </div>
                       </label-item>
                    </div>
                </div> 
                <div class="f-fl detail">
                    <div class="blank-box"></div>
                    <div class="item" :style="lockDetailData.brand==0?'width:240px;':'width:180px;'">
                        <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                        <span style="margin-top: 7px;" class="radius-font  radius-font-person" v-if="!skeletonLoading&&lockDetailData.brand==0">
                            <icon-font type="iconmensuo1" />
                        </span>
                        <span style="margin-top: 7px;" class="radius-font  radius-font-yunding" v-if="!skeletonLoading&&lockDetailData.brand==1">
                            <icon-font type="iconyunding1" />
                        </span>
                        <span style="margin-top: 7px;" class="radius-font  radius-font-guojia" v-if="!skeletonLoading&&lockDetailData.brand==2">
                            <icon-font type="iconguojia1" />
                        </span>
                        <label-item title="门锁品牌" :skeletonLoading="skeletonLoading">
                            <div>{{lockDetailData.brand==0?'普通门锁':lockDetailData.brand==1?'云丁':lockDetailData.brand==2?'果加':lockDetailData.brand==3?'蜂电':'-'}}</div>
                        </label-item>
                    </div>
                    <div class="item" v-if="lockDetailData.brand==1||lockDetailData.brand==2" style="width: 180px;">
                        <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                        <span style="margin-top: 7px;" class="radius-font radius-font-person" v-show="!skeletonLoading">
                            <icon-font type="iconmensuo" />
                        </span>
                        <label-item title="门锁名称" :skeletonLoading="skeletonLoading">
                          <div>{{lockDetailData.custName?lockDetailData.custName:"-"}}</div>
                        </label-item>
                    </div>
                    <div class="item" :style="lockDetailData.brand==0?'width:240px;':'width:180px;'">
                        <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                        <span style="margin-top: 7px;" class="radius-font radius-font-yellow" v-show="!skeletonLoading">
                            <icon-font type="iconmensuodianliang" />
                        </span>
                        <label-item title="门锁电量" :skeletonLoading="skeletonLoading">
                            <div>{{lockDetailData.power==101?'-':lockDetailData.power?lockDetailData.power+'%':'-'}}</div>
                        </label-item>
                    </div>
                    <div class="item" :style="lockDetailData.brand==0?'width:240px;':'width:180px;'">
                        <span class="bgColorStyle animate-box" style="margin-top: 7px;width: 32px;height: 32px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
                        <span style="margin-top: 7px;" class="radius-font" :class="lockDetailData.gwOnlineStatus==2?'radius-font-close':'radius-font-online'" v-show="!skeletonLoading">
                            <icon-font type="iconwangguanzhuangtai" />
                        </span>
                        <label-item title="网关状态" :skeletonLoading="skeletonLoading">
                          <div>{{lockDetailData.gwOnlineStatusName?lockDetailData.gwOnlineStatusName:"-"}}</div>
                        </label-item>
                    </div>
                   
                </div>
            </div>
            <div class="tabs-content">
                <a-tabs size="small" defaultActiveKey="1" @change="handleCallback">
                  <a-tab-pane key="1">
                    <span slot="tab">
                        <icon-font type="iconyumengtubiao_caiwuzhangdan" />门锁信息
                    </span>
                    <div class="basic-info">
                        <div class="input-info">
                          <label-item class="item" style="width: 100%" title="门锁名称/描述" :skeletonLoading="skeletonLoading" v-if="lockDetailData.brand==0||lockDetailData.brand==2">
                            <span>{{lockDetailData.custName?lockDetailData.custName:'-'}}</span>
                          </label-item>
                            <label-item class="item" title="门锁品牌" :skeletonLoading="skeletonLoading">
                                <span>{{lockDetailData.brand==0?'普通门锁':lockDetailData.brand==1?'云丁':lockDetailData.brand==2?'果加':lockDetailData.brand==3?'蜂电':'-'}}</span>
                            </label-item>
                            <label-item class="item" title="门锁名称" :skeletonLoading="skeletonLoading" v-if="lockDetailData.brand==1">
                                <span>{{lockDetailData.custName?lockDetailData.custName:"-"}}</span>
                            </label-item>
                          <label-item class="item" title="门锁电量" :skeletonLoading="skeletonLoading">
                            <span>{{lockDetailData.power==101?'-':lockDetailData.power?lockDetailData.power+'%':'-'}}</span>
                          </label-item>
                          <label-item class="item" title="设备型号" :skeletonLoading="skeletonLoading">
                            <span>{{lockDetailData.modelName?lockDetailData.modelName:"-"}}</span>
                          </label-item>
                          <label-item class="item" title="门锁序列号/编码" :skeletonLoading="skeletonLoading">
                            <span>{{lockDetailData.sn?lockDetailData.sn:"-"}}</span>
                          </label-item>
                          <label-item class="item" title="设备mac地址" :skeletonLoading="skeletonLoading">
                            <span>{{lockDetailData.mac?lockDetailData.mac:"-"}}</span>
                          </label-item>
                        </div>
                    </div>
                    <div style="color: #111111;font-size: 16px;font-weight: 500;margin: 5px 0;">网关信息</div>
                    <div class="basic-info" style="margin-bottom: 90px;">
                      <div class="input-info">
                        <label-item class="item" title="网关名称" :skeletonLoading="skeletonLoading">
                          <span>{{lockDetailData.gwName?lockDetailData.gwName:'-'}}</span>
                        </label-item>
                        <label-item class="item" title="网关状态" :skeletonLoading="skeletonLoading">
                          <span>{{lockDetailData.brand==0?'-':lockDetailData.gwOnlineStatusName?lockDetailData.gwOnlineStatusName:"-"}}</span>
                        </label-item>
                      </div>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane key="2">
                     <span slot="tab">
                        <icon-font type="iconmima" />授权密码记录
                    </span>
                    <div v-if="lockDetailData.brand==0">
                      <div style="text-align: center; margin-top: 51px;">
                        <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
                      </div>
                      <div style="color: #BBBBBB;font-size: 14px;margin: 19px 0 111px 0;text-align: center;">此记录仅支持智能门锁</div>
                    </div>
                    <div v-if="lockDetailData.brand==1||lockDetailData.brand==2">
                      <auth-password-list ref="authPasswordList" :lock-id="lockId" ></auth-password-list>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane key="3">
                     <span slot="tab">
                        <icon-font type="iconkaimenjilubeifen" />开门记录
                    </span>
                    <div v-if="lockDetailData.brand==0">
                      <div style="text-align: center; margin-top: 51px;">
                        <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
                      </div>
                      <div style="color: #BBBBBB;font-size: 14px;margin: 19px 0 111px 0;text-align: center;">此记录仅支持智能门锁</div>
                    </div>
                    <div v-if="lockDetailData.brand==1||lockDetailData.brand==2">
                      <open-record-list ref="openRecordList" :lock-id="lockId"></open-record-list>
                    </div>
                  </a-tab-pane>
                  <div slot="tabBarExtraContent" class="tabs-options">
                    <div v-if="lockDetailData.brand==0">
                      <div @click="getPassword" v-mark="['mk_smartDevices_doorLoc_seemm']">
                        <icon-font type="iconyumengtubiao_yanjing-1" />
                        <span>&nbsp;查看密码</span>
                      </div>
                      <div @click="editPassword" v-mark="['mk_smartDevices_doorLoc_xgmm']">
                        <icon-font type="iconyumengtubiao_bianji-" />
                        <span>&nbsp;修改密码</span>
                      </div>
                      <div @click="unBindLock()" v-mark="['mk_smartDevices_doorLoc_jb']">
                        <icon-font type="iconjiechu" />
                        <span>&nbsp;解绑</span>
                      </div>
                    </div>
                    <div v-if="lockDetailData.brand==1||lockDetailData.brand==2">
                      <div @click="getTempPassword" v-mark="['mk_smartDevices_doorLoc_hqlsmm']">
                        <icon-font type="iconyumengtubiao_zhongzhi" />
                        <span>&nbsp;获取临时密码</span>
                      </div>
                      <div @click="goToGivePassword" v-mark="['mk_smartDevices_doorLoc_sqmm']">
                        <icon-font type="iconmima" />
                        <span>&nbsp;密码授权</span>
                      </div>
                      <div @click="unBindLock()" v-mark="['mk_smartDevices_doorLoc_jb']">
                        <icon-font type="iconjiechu" />
                        <span>&nbsp;解绑</span>
                      </div>
                    </div>
                  </div>
                </a-tabs>
            </div>
            <div class="bottom" v-if="activekey==1">
                <span>{{lockDetailData.creater}}创建于 {{$moment(lockDetailData.createTime).format('lll')}}</span>
                <span>{{lockDetailData.updater}}更新于 {{$moment(lockDetailData.updateTime).format('lll')}}</span>
            </div>
        </div>
      <!-- 查看密码/临时密码 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="getPasswordDialog" class="ownModalBorder titDialog" :title="getPasswordTitle">
        <view-password :lock-id="lockId" :fullAddress="lockDetailData.fullAddress" :brand="lockDetailData.brand" @closeThis="closeView"></view-password>
      </a-modal>
      <!-- 修改密码 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="editPasswordDialog" class="ownModalBorder titDialog" title="修改门锁密码">
        <edit-password :lock-id="lockId"  @closeThis="closeEdit" @editPasswordSuccess="editPasswordSuccess"></edit-password>
      </a-modal>
      <!-- 授权密码 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="givePasswordDialog" class="ownModalBorder titDialog" title="密码授权">
        <give-password :brand="lockDetailData.brand" :lockId="lockId" :lockInfo="lockDetailData" @cancelGive="cancelGive" @giveSuccess="giveSuccess"></give-password>
      </a-modal>
    </div>
</template>

<script>
import * as API from '@/api/smartDevices';
import ViewPassword from './viewPassword';
import EditPassword from './editPassword';
import GivePassword from './givePassword';
import AuthPasswordList from './authPasswordList';
import OpenRecordList from './openRecordList';
export default {
    name: "billDetailDetails",
    components: {
      ViewPassword,
      EditPassword,
      GivePassword,
      AuthPasswordList,
      OpenRecordList,
    },
    props: {
        lockId: {
            type: String
        },
    },
    data() {
        return {
          lockDetailData:{},
          skeletonLoading:false,
          getPasswordDialog:false,
          getPasswordTitle:'查看密码',
          editPasswordDialog:false,
          givePasswordDialog:false,
          activekey:'1',
          syncInfoLoading:false,
        }
    },
    created() {
      this.getLockDetail();
    },
    mounted() {

    },
    methods: {
      syncInfo(){
        this.syncInfoLoading = true;
        API.doorLockSyncInfo({id:this.lockId}).then(res => {
          if (res.code == 200) {
            this.syncInfoLoading = false;
            this.$message.success('同步成功！');
            this.getLockDetail();
          }
        })
      },
      handleCallback(val){
        this.activekey = val;
        if(this.activekey == 2){
          this.$refs.authPasswordList&&this.$refs.authPasswordList.initData();
        }
        else if(this.activekey == 3){
          this.$refs.openRecordList&&this.$refs.openRecordList.initData();
        }
      },
      cancelGive(){
        this.givePasswordDialog = false;
      },
      giveSuccess(){
        this.givePasswordDialog = false;
        this.$refs.authPasswordList&&this.$refs.authPasswordList.initData();
      },
      editPassword(){
        this.editPasswordDialog = true;
      },
      editPasswordSuccess(){
        this.editPasswordDialog = false;
      },
      closeEdit(){
        this.editPasswordDialog = false;
      },
      getTempPassword(){
        this.getPasswordDialog = true;
        this.getPasswordTitle = '临时密码';
      },
      goToGivePassword(){
        this.givePasswordDialog = true;
      },
      getPassword(){
        this.getPasswordDialog = true;
        this.getPasswordTitle = '查看密码';
      },
      closeView(){
        this.getPasswordDialog = false;
      },
      unBindLock(){
        let _this = this;
        let id = this.lockDetailData.id;
        this.$modal.confirm({
          title: '确定要将房源"' + this.lockDetailData.fullAddress + '"的门锁解绑吗？',
          content: '解绑后，该门锁上的授权密码记录将会全部删除',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            API.doorLockUnbind({id:id}).then(res => {
              if (res.code == 200) {
                _this.$message.success('解绑成功！');
                _this.$emit('unBindSuccess');
              }
            })
          },
          onCancel() {
            // console.log('Cancel');
          },
        });
      },
      getLockDetail(){
        this.skeletonLoading = true;
        API.doorLockView({id:this.lockId}).then(res => {
          if(res.code === '200'){
            this.lockDetailData = res.data;
            this.skeletonLoading = false;
          }
        });
      },
    },
    filters: {

    },
  watch: {
    activekey() {
    }
  }
}
</script>

<style scoped lang="less">
.lockDetails-box {
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
      .rentStyle{
        i{
          vertical-align: -0.18em;
        }
        svg{
          width: 16px;
          height: 16px;
          color: #0A87F8;
        }
      }
    }
    .child-detail {
      min-height: 652px;
        max-height: calc(100vh - 230px);
        overflow: auto;
        .top {
            padding: 20px 20px 0 20px;
            margin-bottom: 30px;
            /deep/ .label-item .sync_info_style{
              height: 21px;
              line-height: 21px;
              margin-left: 15px;
              font-size: 12px;
              color: #0a87f8;
              svg{
                width: 12px;
                height: 12px;
              }
            }
            .title {
                display: flex;
                align-items: center;
                width: 160px;
                height: 44px;
                border-right: 1px dashed @borderColor;
                .radius-font {
                    width: 44px;
                    height: 44px;
                    line-height: 44px;
                    border-radius: 50%;
                    font-size:28px;
                }
                .status1 {
                    background: rgba(251, 66, 70, 0.1);
                    color: #FB4246;
                }
                .status2 {
                    background: rgba(3, 198, 131, 0.1);
                    color: #03C683;
                }
                .status3 {
                    background: rgba(119, 119, 119, 0.1);
                    color: #777777;
                }
                .status4 {
                    background: rgba(10, 135, 248, 0.1);
                    color: #0A87F8;
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
                    width: 60px;
                    height: 30px;
                }
            }
            .radius-font-person {
                color: #0A87F8;
                background-color: fade(#0A87F8, 10%);
            }
          .radius-font-yunding {
            color: #14AEB8;
            background-color: fade(#14AEB8, 10%);
          }
          .radius-font-guojia{
            color: #424242;
            background-color: fade(#424242, 10%);
          }
          .radius-font-online {
            background: rgba(3, 198, 131, 0.1);
            color: #03C683;
          }
            .radius-font-close {
                color: #777777;
                background-color: fade(#777777, 10%);
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
        .tabs-content {
            padding: 0 20px;
            // height: 400px;
            // min-height: calc(100vh - 390px);
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
    }
    .tabs-options {
        font-size: 0;
        cursor: pointer;
        div {
            text-align: right;
            display: inline-block;
            font-size: 14px;
            padding: 0  0 0 14px;
            color: #0a87f8;
            span {
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
    .bottom {
        padding: 0 20px;
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
        width: 60px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #FFA036;
        text-align: center;
        background-color: fade(#FFA036, 10%);
        border-radius: 12px;
    }
    .radius-font-person {
        color: #0A87F8;
        background-color: fade(#0A87F8, 10%);
    }
    & /deep/ .ant-tabs-nav .ant-tabs-tab {
      margin: 0 30px 0 0;
      padding: 8px 0;
    }
    & /deep/ .ant-tabs .ant-tabs-small-bar .ant-tabs-tab{
       padding: 8px 0;
    }
    & /deep/ .ant-tabs-top-content {
        font-size: 12px;
        color: @mainFontColor;
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
  @-webkit-keyframes changeright{
    0%{-webkit-transform:rotate(0deg);}
    50%{-webkit-transform:rotate(-180deg);}
    100%{-webkit-transform:rotate(-360deg);}
  }
  .imgrotate_common{
    -webkit-animation:changeright 3s linear infinite;
  }
}
</style>
