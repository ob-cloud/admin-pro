<template>
  <div class="config-box clearfix">
    <div class="config-left f-fl">
      <div v-for="(item,index) in platformList" :key="index" >
        <div class="listItemClass cursor" @click="changeCurrentPlatform(item.platform,item.status)" :style="currentPlatform==item.platform?'background-color:rgba(10,135,248,0.1);':''">
          <div class="pic f-fl">
            <img v-if="item.platform==1" src="../../../assets/extension/promotion-gwgw.png"  />
            <img v-if="item.platform==2" src="../../../assets/extension/promotion-58.png"  />
            <img v-if="item.platform==3" src="../../../assets/extension/promotion-58gg.png"  />
            <img v-if="item.platform==4" src="../../../assets/extension/promotion-xy.png"  />
            <img v-if="item.platform==5" src="../../../assets/extension/promotion-bk.png"  />
          </div>
          <div class="titleStyle f-fl" v-if="item.platform==1">官网/官微</div>
          <div class="titleStyle f-fl" v-if="item.platform==2">58租房</div>
          <div class="titleStyle f-fl" v-if="item.platform==3">58品牌公寓馆</div>
          <div class="titleStyle f-fl" v-if="item.platform==4">闲鱼租房</div>
          <div class="titleStyle f-fl" v-if="item.platform==5">贝壳租房</div>
          <div class="openCommomStyle open f-fr" v-if="item.status==1">
            已开通
          </div>
          <div class="openCommomStyle unOpen f-fr" v-if="item.status==0">
            未开通
          </div>
        </div>
      </div>
    </div>
    <div class="config-right f-fl">
      <div class="config-right-top">
        <top-title :needMarkFlag="false" :statusData="statusData" @changeStatus="changeStatus"></top-title>
        <div class="cursor" @click="openGuidance" style="position: absolute;right: 14px;height: 46px;line-height: 46px;top: 0px;color: #0A87F8;" v-if="currentPlatform!=1&&currentPlatformStatus==1&&status==1">
          查看开通流程<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/>
        </div>
      </div>
      <div class="config-right-content">
        <div v-if="currentPlatform==1" class="currentPlatform1">
          <div v-if="status==1">
            <div v-if="currentPlatformStatus==1" class="currentPlatform1-staus1">
              <div class="currentPlatform1-staus1-icon"><icon-font type="iconyumengtubiao_chenggong" /></div>
              <div class="currentPlatform1-staus1-font">已 开 通</div>
            </div>
            <div v-if="currentPlatformStatus==0">
              <div style="text-align: center;margin-top: 80px;">
                <img style="width: 130px;height: 122px;" src="../../../assets/login/no-collect.png">
              </div>
              <div style="text-align: center;font-size: 14px;color: #777777;margin-top: 15px;">您还未开通租客端官网及微信小程序哟～</div>
              <div style="width:560px;height:108px;background:rgba(246,247,251,1);border-radius:4px;text-align: center;margin: 0 auto;margin-top: 15px;">
                <div style="font-size: 16px;color: #111111;padding-top: 14px;">如需开通请联系字节牛科技</div>
                <div style="font-size: 14px;color: #0A87F8;margin-top: 9px;">电话：027-59761892</div>
                <div style="font-size: 14px;color: #0A87F8;margin-top: 5px;">邮箱：work@byteox.com</div>
              </div>
            </div>
          </div>
          <div v-if="status==2">
            <hair-gwgw></hair-gwgw>
          </div>
        </div>
        <div v-if="currentPlatform==2">
          <div v-if="status==1">
            <!-- 已开通 -->
            <div v-if="currentPlatformStatus==1">
              <five-eight-account-list @deleteSuccess="deleteAccountSuccess"></five-eight-account-list>
            </div>
            <!-- 未开通 -->
            <div v-if="currentPlatformStatus==0">
              <div class="unOpenStyle" style="width: 74px;height: 74px;background:rgba(255,85,46,1);border-radius:10px;margin:0 auto;margin-top: 70px;">
                <icon-font style="color: #FFFFFF;margin: 10px 0 0 10px;" type="icon58gongyuguanbeifen43x" />
              </div>
              <div style="text-align: center;color: #111111;font-size: 18px;margin-top: 10px;">58租房</div>
              <div style="text-align: center;font-size: 14px;color: #777777;margin-top: 15px;">国内专业的“本地、免费、真实、高效”生活服务平台</div>
              <div class="cursor" @click="OpenGuidance58Dialog=true;" style="text-align: center;font-size: 14px;color: #0A87F8;margin-top: 30px;">查看开通流程<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
              <div class="cursor" v-mark="['mk_extension_config_bdzh']" @click="Open58Dialog=true;" style="margin:0 auto;width:230px;height:44px;line-height:44px;background:rgba(10,135,248,1);border-radius:5px;color: #FFFFFF;text-align: center;font-size: 16px;margin-top: 20px;">
                申请开通
              </div>
            </div>
          </div>
          <div v-if="status==2">
            <hair58></hair58>
          </div>
        </div>
        <div v-if="currentPlatform==3">
          <div v-if="status==1">
            <!-- 已开通 -->
            <div v-if="currentPlatformStatus==1">
              <five-eight-gg-account-list @deleteSuccess="deleteAccountSuccess"></five-eight-gg-account-list>
            </div>
            <!-- 未开通 -->
            <div v-if="currentPlatformStatus==0">
              <div class="unOpenStyle" style="width: 74px;height: 74px;background:#D9B238;border-radius:10px;margin:0 auto;margin-top: 70px;">
                <icon-font style="color: #FFFFFF;margin: 10px 0 0 10px;" type="icon58gongyuguan" />
              </div>
              <div style="text-align: center;color: #111111;font-size: 18px;margin-top: 10px;">58公寓馆</div>
              <div style="text-align: center;font-size: 14px;color: #777777;margin-top: 15px;">已开通主要的一二线城市，老牌大流量入口</div>
              <div class="cursor" @click="OpenGuidance58ggDialog=true;" style="text-align: center;font-size: 14px;color: #0A87F8;margin-top: 30px;">查看开通流程<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
              <div class="cursor" @click="Open58ggDialog=true;" v-mark="['mk_extension_config_bdzh']" style="margin:0 auto;width:230px;height:44px;line-height:44px;background:rgba(10,135,248,1);border-radius:5px;color: #FFFFFF;text-align: center;font-size: 16px;margin-top: 20px;">
                申请开通
              </div>
            </div>
          </div>
          <div v-if="status==2">
            <hair58gg></hair58gg>
          </div>
        </div>
        <div v-if="currentPlatform==4">
          <div v-if="status==1">
            <!-- 已开通 -->
            <div v-if="currentPlatformStatus==1">
              <xy-account-list :xyId="xyId" @deleteSuccess="deleteAccountSuccess"></xy-account-list>
            </div>
            <!-- 未开通 -->
            <div v-if="currentPlatformStatus==0">
              <div class="unOpenStyle" style="width: 74px;height: 74px;background:#FFD701;border-radius:10px;margin:0 auto;margin-top: 70px;">
                <icon-font style="color:#212121;margin: 10px 0 0 10px;" type="iconxianyuzufang" />
              </div>
              <div style="text-align: center;color: #111111;font-size: 18px;margin-top: 10px;">闲鱼租房</div>
              <div style="text-align: center;font-size: 14px;color: #777777;margin-top: 15px;">全国开通，部分城市首页推广</div>
              <div style="text-align: center;font-size: 14px;color: #777777;">招租信息严禁发联系方式，发房账号需通过支付宝实名认证</div>
              <div class="cursor" @click="OpenGuidanceXyDialog=true;" style="text-align: center;font-size: 14px;color: #0A87F8;margin-top: 30px;">查看开通流程<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
              <div class="cursor" @click="OpenXyDialog=true;" v-mark="['mk_extension_config_bdzh']" style="margin:0 auto;width:230px;height:44px;line-height:44px;background:rgba(10,135,248,1);border-radius:5px;color: #FFFFFF;text-align: center;font-size: 16px;margin-top: 20px;">
                申请开通
              </div>
            </div>
          </div>
          <div v-if="status==2">
            <hair-xy></hair-xy>
          </div>
        </div>
        <div v-if="currentPlatform==5">
          <div v-if="status==1">
            <!-- 已开通 -->
            <div v-if="currentPlatformStatus==1">
              <bk-account-list @deleteSuccess="deleteAccountSuccess"></bk-account-list>
            </div>
            <!-- 未开通 -->
            <div v-if="currentPlatformStatus==0">
              <div class="unOpenStyle" style="width: 74px;height: 74px;background:#1B6FFD;border-radius:10px;margin:0 auto;margin-top: 70px;">
                <icon-font style="color:#ffffff;margin: 10px 0 0 10px;" type="iconbeikezufang" />
              </div>
              <div style="text-align: center;color: #111111;font-size: 18px;margin-top: 10px;">贝壳租房</div>
              <div style="text-align: center;font-size: 14px;color: #777777;margin-top: 15px;">已开通10座城市，贝壳租房升级版来了</div>
              <div class="cursor" @click="OpenGuidanceBkDialog=true;" style="text-align: center;font-size: 14px;color: #0A87F8;margin-top: 30px;">查看开通流程<icon-font style="margin-left: 5px;" type="iconyumengtubiao_zhishi"/></div>
              <div class="cursor" @click="OpenBkDialog=true;" v-mark="['mk_extension_config_bdzh']" style="margin:0 auto;width:230px;height:44px;line-height:44px;background:rgba(10,135,248,1);border-radius:5px;color: #FFFFFF;text-align: center;font-size: 16px;margin-top: 20px;">
                申请开通
              </div>
            </div>
          </div>
          <div v-if="status==2">
            <hair-bk></hair-bk>
          </div>
        </div>
      </div>
      <!-- 58租房开通流程文档 -->
      <a-modal centered v-model="OpenGuidance58Dialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 20px 20px 20px'}" @cancel="OpenGuidance58Dialog=false" width="1000px">
        <open-guidance58 @closeThis="OpenGuidance58Dialog=false"></open-guidance58>
      </a-modal>
      <!-- 58公馆开通流程文档 -->
      <a-modal centered v-model="OpenGuidance58ggDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 20px 20px 20px'}" @cancel="OpenGuidance58ggDialog=false" width="1000px">
        <open-guidance58gg @closeThis="OpenGuidance58ggDialog=false"></open-guidance58gg>
      </a-modal>
      <!-- 闲鱼开通流程文档 -->
      <a-modal centered v-model="OpenGuidanceXyDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 20px 25px 50px'}" @cancel="OpenGuidanceXyDialog=false" width="800px">
        <open-guidance-xy @closeThis="OpenGuidanceXyDialog=false"></open-guidance-xy>
      </a-modal>
      <!-- 贝壳开通流程文档 -->
      <a-modal centered v-model="OpenGuidanceBkDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'25px 20px 25px 50px'}" @cancel="OpenGuidanceBkDialog=false" width="800px">
        <open-guidance-bk @closeThis="OpenGuidanceBkDialog=false"></open-guidance-bk>
      </a-modal>
      <!-- 开通58 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="Open58Dialog" class="ownModalBorder titDialog" title="申请开通‘58租房’推广平台">
        <open58 @cancelOpen="cancelOpen" @openSuccess="open58Success"></open58>
      </a-modal>
      <!-- 开通58公馆 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="Open58ggDialog" class="ownModalBorder titDialog" title="开通‘58品牌公寓馆’">
        <open58gg @cancelOpen="cancelOpen" @openSuccess="open58ggSuccess"></open58gg>
      </a-modal>
      <!-- 开通闲鱼 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="OpenXyDialog" class="ownModalBorder titDialog" title="开通‘闲鱼租房’" @cancel="isRefreshFun">
        <open-xy @cancelOpen="cancelOpen" @refreshinfoFun="refreshinfoFun" @closeThis="openXySuccess"></open-xy>
      </a-modal>
      <!-- 开通贝壳 -->
      <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="OpenBkDialog" class="ownModalBorder titDialog" title="开通‘贝壳租房账号’">
        <open-bk @cancelOpen="cancelOpen" @openSuccess="openBkSuccess"></open-bk>
      </a-modal>
     </div>
  </div>
</template>

<script>
import * as API from '@/api/extension';
import TopTitle from '@/components/TopStatus/title';
import HairGwgw from "./hairGwgw";
import Hair58 from './fiveEight/hair58';
import Hair58gg from './fiveEightGg/hair58gg';
import HairXy from './xy/hairXy';
import HairBk from './bk/hairBk';
import OpenGuidance58 from './fiveEight/openGuidance58';
import OpenGuidance58gg from './fiveEightGg/openGuidance58gg';
import OpenGuidanceXy from './xy/openGuidanceXy';
import OpenGuidanceBk from './bk/openGuidanceBk';
import Open58 from './fiveEight/open58';
import Open58gg from './fiveEightGg/open58gg';
import OpenXy from './xy/openXy';
import OpenBk from './bk/openBk';
import FiveEightAccountList from './fiveEight/accountList';
import FiveEightGgAccountList from './fiveEightGg/accountList';
import XyAccountList from './xy/accountList';
import BkAccountList from './bk/accountList';

export default {
  name: "index",
  components: {
    TopTitle,
    HairGwgw,
    Hair58,
    Hair58gg,
    HairXy,
    HairBk,
    OpenGuidance58,
    OpenGuidance58gg,
    OpenGuidanceXy,
    OpenGuidanceBk,
    Open58,
    Open58gg,
    OpenXy,
    OpenBk,
    FiveEightAccountList,
    FiveEightGgAccountList,
    XyAccountList,
    BkAccountList
  },
  props: {
    platform:{
      Type:Number,
      default:1,
    },
  },
  data() {
    return {
      platformList:[],
      currentPlatform:1,
      currentPlatformStatus:0,
      statusData:[
        {
          title: '账号管理',
          status: 1,
        },
        {
          title: '发房配置',
          status: 2,
        },
      ],
      status:1,     //当前页签    1、账号管理；2、发房配置
      OpenGuidance58Dialog:false,
      OpenGuidance58ggDialog:false,
      OpenGuidanceXyDialog:false,
      OpenGuidanceBkDialog:false,
      Open58Dialog:false,
      Open58ggDialog:false,
      OpenXyDialog:false,
      xyId:'',
      OpenBkDialog:false,
      isRefresh:false,
    }
  },
  created() {
    this.currentPlatform = this.platform;
    this.promotionListPlatform(true);
  },
  methods:{
    deleteAccountSuccess(){
      this.promotionListPlatform(false);
    },
    openGuidance(){
      if(this.currentPlatform==2){
        this.OpenGuidance58Dialog = true;
      }
      else if(this.currentPlatform==3){
        this.OpenGuidance58ggDialog = true;
      }
      if(this.currentPlatform==4){
        this.OpenGuidanceXyDialog = true;
      }
      else if(this.currentPlatform==5){
        this.OpenGuidanceBkDialog = true;
      }
    },
    isRefreshFun(){
      this.cancelOpen();
      if(this.isRefresh){
        this.promotionListPlatform(false);
      }
      this.isRefresh = false;
    },
    refreshinfoFun(res,val){
      this.isRefresh = res;
      this.xyId = val;
    },
    openXySuccess(){
      this.OpenXyDialog = false;
      this.promotionListPlatform(false);
    },
    openBkSuccess(){
      this.OpenBkDialog = false;
      this.promotionListPlatform(false);
    },
    open58ggSuccess(){
      this.Open58ggDialog = false;
      this.promotionListPlatform(false);
    },
    open58Success(){
      this.Open58Dialog = false;
      this.promotionListPlatform(false);
    },
    cancelOpen(){
      this.Open58Dialog = false;
      this.Open58ggDialog = false;
      this.OpenXyDialog = false;
      this.OpenBkDialog = false;
    },
    changeStatus(item){
      this.status = item.status;
    },
    changeCurrentPlatform(platform,status){
      this.currentPlatform = platform;
      this.currentPlatformStatus = status;
    },
    promotionListPlatform(flag){
      API.promotionListPlatformSort().then(res => {
        if (res&&res.code === "200") {
          if(res.data == null){
            this.platformList = [];
          }else{
            this.platformList = res.data;

            //是否是初始化
            if(flag){
              this.platformList.forEach((item)=>{
                if(item.platform == this.currentPlatform){
                  //初始化是官网官微
                  this.currentPlatform = item.platform;
                  this.currentPlatformStatus = item.status;
                }
              })
            }
            else{
              this.platformList.forEach((item)=>{
                if(item.platform == this.currentPlatform){
                  this.currentPlatformStatus = item.status;
                }
              })
            }
          }
        }
      })
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
  .config-box{
    width: 100%;
    .config-left{
      height: calc(100vh - 127px);
      width: 240px;
      padding: 5px 0;
      border-right: 10px solid #f0f2f5;
      .listItemClass{
        height: 40px;
        padding: 0 10px 0 14px;
        font-size: 14px;
        color: #111111;
        .titleStyle{
          line-height: 40px;
        }
        .pic{
          margin:8.5px 8px 0 0;
          img{
            width: 20px;
            height: 20px;
          }
        }
        .openCommomStyle{
          width: 56px;
          height: 20px;
          line-height: 20px;
          margin-top: 10px;
          font-size: 12px;
          border-radius: 10px;
          text-align: center;
        }
        .open{
          background:rgba(241,248,255,1);
          color: #0A87F8;
        }
        .unOpen{
          background:rgba(247,247,247,1);
          color: #777777;
        }
      }
      .listItemClass:hover {
        background-color: #F6F7F8;
      }
    }
    .config-right{
      width: calc(100% - 240px);
      .config-right-top{
        width: 100%;
        padding-left: 20px;
        border-bottom: 1px solid #DDDDDD;
        position: relative;
        /deep/ .status{
          height: 46px;
        }
        /deep/ .status > p{
          height: 46px;
          line-height: 46px;
        }
      }
      .config-right-content{
        height: calc(100vh - 174px);
        overflow-y: auto;
        .currentPlatform1{
          .currentPlatform1-staus1{
            .currentPlatform1-staus1-icon{
              text-align: center;
              padding-top: 120px;
              svg{
                width: 88px;
                height: 88px;
                color: #0A87F8;
              }
            }
            .currentPlatform1-staus1-font{
              text-align: center;
              color: #0A87F8;
              font-size: 18px;
              font-weight: 500;
              padding-top: 30px;
            }
          }
        }
        .unOpenStyle{
          svg{
            width: 54px;
            height: 54px;
          }
        }
      }
    }
  }
  ::-webkit-scrollbar{
    width: 2px;
  }
</style>