<template>
	<a-layout-header id="layoutHeader">
    <div class="chromeStyle clearfix" id="chromeStyle" v-if="showChromeTip">
        <div class="leftChromeStyle f-fl"></div>
        <div class="chromeStyleDesc clearfix f-fl">
            <span class="color1">为保障数据安全，推荐使用</span><a style="color:#FF6B6C;font-size: 15px;" href="http://pc.zhhainiao.com/shadu/mgr3/f336.shtml" target="_blank">谷歌浏览器</a>，
            <span class="color1">本系统与</span><a style="color:#FF6B6C;font-size: 15px;" href="http://pc.zhhainiao.com/shadu/mgr3/f336.shtml" target="_blank">谷歌浏览器</a><span class="color1">更配哟~</span>
            <div class="closeStyle cursor f-fr" @click="closeChrome"><icon-font type="iconyumengtubiao_guanbi-1"/></div>
        </div>
        <div class="rightChromeStyle f-fl"></div>
    </div>
		<div class="top" v-if="!noPermissions" :style="{'border-bottom': hasWorkbench || (!hasWorkbench && !this.$route.path.includes('/workbench')) ? '1px solid #e8e8e8': 'none'}">
			<div v-if="!this.$route.path.includes('/membercenter') && !this.$route.path.includes('/workbench') && !this.$route.path.includes('/wallet')&& !this.$route.path.includes('/notice')">
				<img
					class="menu-icon"
					:src="require('../assets/menu-icons/menu-' + headerMenu.meta.icon + '.png')"
					alt=""
				/>
				{{ headerMenu.meta.title }}
			</div>
			<div v-else-if="this.$route.path.includes('/workbench') &&  hasWorkbench">
				<img
					class="menu-icon"
					:src="require('../assets/menu-icons/menu-workbench.png')"
					alt=""
				/>
				工作台
			</div>
      <div v-else-if="this.$route.path.includes('/wallet') &&  hasWallet">
          <img
                  class="menu-icon"
                  :src="require('../assets/menu-icons/menu-wallet.png')"
                  alt=""
          />
          钱包
      </div>
      <div class="clearfix" v-else-if="this.$route.path.includes('/notice')" style="width: 100%">
        <div class="f-fl">
          <img
              class="menu-icon"
              :src="require('../assets/menu-icons/menu-notice.png')"
              alt=""
          />
          消息中心
        </div>
        <div class="f-fl" style="width: calc(100% - 200px);">
          <div class="cursor" style="margin: 0 auto;text-align:center;font-weight: 500;font-size: 16px;color: #0A87F8;height: 50px;line-height: 50px;width: 70px;border-bottom: 2px solid #0A87F8;">消息中心</div>
        </div>
      </div>
			<div v-else-if="this.$route.path.includes('/membercenter')">
				<img
						class="menu-icon"
						:src="require('../assets/menu-icons/menu-membercenter.png')"
						alt=""
				/>
				个人中心
			</div>
			<a-tabs
				v-if="!this.$route.path.includes('/membercenter') && !this.$route.path.includes('/workbench')
				&& !this.$route.path.includes('/wallet')&& !this.$route.path.includes('/notice')"
				:class="{ 'sub-menu': headerMenu.children.length === 1 }"
				:activeKey="activeKey"
				:defaultActiveKey="0"
				@change="changeRouter"
			>
				<template v-for="(item, index) in headerMenu.children">
					<a-tab-pane :tab="item.meta.title" :key="index" v-if="item.meta.title != '数据分析'"></a-tab-pane>
				</template>
			</a-tabs>
      <div @click="goCertification" v-if="haveAuthenticationPermissionFlag&&showUnCertificationFlag&&(!certificationStatus||certificationStatus!=2)" class="unCertificationStyle cursor">
        您的企业还未认证哟！请先认证企业信息
        <span class="svgStyle" @click.stop="showUnCertificationFlag=false;">
          <icon-font class="cursor" style="margin-left: 4px;" type="iconyumengtubiao_guanbi-"></icon-font>
        </span>
      </div>
		</div>
	</a-layout-header>
</template>

<script>
import { mapState } from "vuex";
import {ROUTER} from '@/store/mutation-types';
import {getCertificationStatus} from "@/api/enterprise";
export default {
	name: "HeaderLayout",
  components: {
  },
	data(){
		return {
			noPermissions: false,
			hasWorkbench: false,
      hasWallet:false,
      showChromeTip:false,
      certificationStatus:0,
      showUnCertificationFlag:false,
      haveAuthenticationPermissionFlag:false,
		}
	},
	computed: {
		...mapState(["headerMenu", "activeKey"]),
	},
	created(){
		let router = JSON.parse(this.$ls.get(ROUTER))
		router && router.forEach(val=>{
			if (val.mark == 'mk_workbench'){
				this.hasWorkbench = true
			}
			if(val.mark == 'mk_wallet'){
        this.hasWallet = true;
      }
		})
		if (JSON.parse(sessionStorage.getItem('permissions')).length==0){
			this.noPermissions = true
		}
		let haveAuthenticationPermissionFlag = false;
		let permissions = JSON.parse(sessionStorage.getItem('permissions'));
    permissions.forEach((item)=>{
      if(item.mark == 'mk_set_company_rzqy'){
        haveAuthenticationPermissionFlag = true;
      }
    });
    this.haveAuthenticationPermissionFlag = haveAuthenticationPermissionFlag;
		this.getChrome();
		this.getCertificationStatus();
	},
	methods: {
    closeChrome(){
        this.showChromeTip = false;
    },
    getChrome() {
        let isWebKit =  navigator.userAgent.indexOf('WebKit') > -1  // 是否是WebKit 内核
        if(isWebKit){
            this.showChromeTip = false;
        }
        else{
            this.showChromeTip = true;
        }
    },
    changeRouter(key) {
      this.$router.push({
        path: this.headerMenu.children[key].path,
      });
      this.$store.commit("SET_ACTIVE_KEY", key);
    },
    getCertificationStatus(){
      getCertificationStatus().then(res =>{
        if(res.code === '200'){
          this.certificationStatus = res.data.status;
          if(!this.certificationStatus||(this.certificationStatus!=2&&this.certificationStatus!=1)){
            this.showUnCertificationFlag = true;
          }
        }
      })
    },
    goCertification(){
      this.showUnCertificationFlag = false;
      this.$router.push({
        path: `/set/company`
      });
    },
	},
};
</script>

<style scoped lang="less">
#layoutHeader {
	position: fixed;
	width: calc(100% - 60px);
	height: 50px;
	padding: 0;
	background: #ffffff;
	z-index: 99;
	& > div {
		height: 50px;
		line-height: 50px;
	}
	.top {
		position: relative;
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		font-size: 16px;
		z-index: 1;
		.menu-icon {
			margin-right: 4px;
			width: 26px;
		}
		& /deep/ .ant-tabs-bar {
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			border-bottom: none;
		}
		& /deep/ .ant-tabs-nav .ant-tabs-tab {
			padding: 15px 16px;
		}
		.sub-menu {
			& /deep/ .ant-tabs-ink-bar {
				width: 100% !important;
			}
		}
    .unCertificationStyle{
      width: 300px;
      height: 30px;
      line-height: 30px;
      background: #FFB300;
      border-radius: 16px;
      font-size: 14px;
      color: #ffffff;
      right: 140px;
      top:10px;
      text-align: center;
      position: absolute;
      .svgStyle{
        padding: 4px 6px 4px 0px;
        text-align: center;
      }
    }
	}
	& /deep/ .ant-popover-inner-content {
		padding: 0;
	}
    .chromeStyle{
        z-index: 100;
        position: fixed;
        left:calc(50% - 307px);
        .leftChromeStyle{
            height: 38px;
            width: 38px;
            background: url("../assets/chrome/chrome-left.png") no-repeat;
            background-size: 38px 38px;
        }
        .chromeStyleDesc{
            width: 614px;
            height: 38px;
            line-height: 38px;
            background-color: #FFEBEC;
            text-align: center;
            .color1{
                color: #111111;
                font-size: 15px;
            }
            .color2{
                color: #FF6B6C;
                font-size: 15px;
            }
            .closeStyle{
                background-color: #BBBBBB;
                width: 16px;
                height: 16px;
                line-height: 16px;
                border-radius: 50%;
                margin-top: 10px;
                color: #FFFFFF;
                text-align: center;
                svg{
                    margin-bottom: 1.2px;
                    width: 10px;
                    height: 10px;
                }
            }
        }
        .rightChromeStyle{
            height: 38px;
            width: 38px;
            background: url("../assets/chrome/chrome-right.png") no-repeat;
            background-size: 38px 38px;
        }
    }
}
</style>
