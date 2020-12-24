<template>
    <a-layout id="components-layout-demo-fixed-sider" >
        <a-layout-sider :width="siderWidth" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 , 'z-index':'101'}">
            <div class="logo">
                <router-link :to="{name:'index'}">
                    <div class="logo" v-if="!logoSrc&&!spinLoading">
                      <img v-if="GlobalConfig.SYSTEM_LOGO_DEFAULT==1" src="../assets/eplus/logo.png">
                      <icon-font v-else class="icon" type="icon-yumengtubiao_yumenglogo" />
                    </div>
                    <div class="logo" v-if="logoSrc&&!spinLoading">
                        <img :src="logoSrc">
                    </div>
                </router-link>
            </div>
            <ul class="sider" >
                <li @mouseenter="downFul" v-if="!noPermissions">
                    <a-popover placement="rightTop" :align="alignConfig" :getPopupContainer="getPopupContainer">
                        <div>
                            <icon-font type="iconyumengtubiao_zhucaidan" />
                        </div>
                        <template slot="content">
                            <main-menu ref="collectRef"></main-menu>
                        </template>
                    </a-popover>
                </li>
                <li @mouseenter="downFul" v-mark="['mk_source_tenant_tjzy','mk_source_tenant_gk_tjzy','mk_house_index_tjfy','mk_contract_reserve_tjyd','mk_contract_tenant_tjht','mk_contract_owner_tjht','mk_finance_bill_tjzd','mk_workorder_repair_tjgd','mk_workorder_clean_tjgd']">
                    <a-popover placement="rightTop" :align="alignConfig" :getPopupContainer="getPopupContainer">
                        <div   >
                            <icon-font type="iconyumengtubiao_tianjia"/>
                        </div>
                        <template slot="content">
                            <ul class="addModal" >
                                <li @click="addSource(true)" v-mark="['mk_source_tenant_tjzy','mk_source_tenant_gk_tjzy']"><img src="../assets/login/add_qzzk.png"/>潜在租客</li>
                                <li @click="addShareHouse(2)" v-mark="['mk_house_index_tjfy']"><img src="../assets/login/add_hz.png"/>合租房源</li>
                                <li @click="addShareHouse(1)" v-mark="['mk_house_index_tjfy']"><img src="../assets/login/add_zzfy.png"/>整租房源</li>
                                <li @click="addShareHouse(3)" v-mark="['mk_house_index_tjfy']"><img src="../assets/login/add_ddxm.png"/>独栋项目</li>
                                <li @click="addReserve" v-mark="['mk_contract_reserve_tjyd']"><img src="../assets/login/add_yd.png"/>预定</li>
                                <li @click="addContract" v-mark="['mk_contract_tenant_tjht']"><img src="../assets/login/add_zkht.png"/>租客合同</li>
                                <li @click="addOwnerContract" v-mark="['mk_contract_owner_tjht']"><img src="../assets/login/add_yzht.png"/>业主合同</li>
                                <li @click="addBill" v-mark="['mk_finance_bill_tjzd']"><img src="../assets/login/add_zd.png"/>账单</li>
                                <li @click="addRepair" v-mark="['mk_workorder_repair_tjgd']"><img src="../assets/login/add_wx.png"/>维修</li>
                                <li @click="addClean" v-mark="['mk_workorder_clean_tjgd']"><img src="../assets/login/add_bj.png"/>保洁</li>
                            </ul>
                        </template>
                    </a-popover>
                </li>
                <li @click="clickFocus">
                    <icon-font type="iconyumengtubiao_shoucanglishi" />
                </li>
                <li @click="goToWallet" v-mark="['mk_wallet_ck']">
                    <icon-font type="iconcedaohang-qiandai" />
                </li>
                <li @click="clickFocusNotice" style="position: relative;">
                    <icon-font type="iconyumengtubiao_xiaoxi" />
                    <div v-if="noticeCount>0" class="IconRadius" style="position: absolute;right: 10px;top:10px;"></div>
                </li>
                <ul class="bottom-menu">
                    <li class="cursor" @click="goToHelp" v-if="GlobalConfig.SYSTEM_NAME=='寓盟管家'">
                        <icon-font type="iconyumengtubiao_bangzhu" />
                    </li>
                    <!--<li class="line"></li>-->
                    <li>
                        <a-popover placement="rightTop" :align="alignConfig" :getPopupContainer="getPopupContainer">
                            <div>
                                <!-- <icon-font type="iconyumengtubiao_yezhu" /> -->
                                <div style="height:10px;"></div>
                                <div class="urseImg" style="margin-left:10px">{{nameJc}}</div>
                            </div>
                            <template slot="content">
                                <ul class="user" >
                                    <li class="user-li f-clearfix" >
                                        <div class="urseImg f-fl" >{{nameJc}}</div>
                                        <div class="f-fl" style="margin-left:12px;">
                                            <p >{{name}}</p>
                                            <p >{{phone}}</p>
                                        </div>
                                    </li>
                                    <li @click="goMembercenter" class="li-bg" style=" margin:0;border-top:1px solid #EEEEEE;height:40px;line-height:40px;"><icon-font type="iconyumengtubiao_wode" /> 个人中心</li>
                                    <li @click="logout" class="li-bg" style="margin:0 ;height:40px;line-height:40px;"><icon-font type="icon-yumengtubiao_tuichu" /> 安全退出</li>
                                </ul>
                            </template>
                        </a-popover>
                    </li>
                </ul>
            </ul>
        </a-layout-sider>
        <a-layout :style="{ marginLeft: siderWidth+'px',height: '100vh' }">
            <header-layout></header-layout >
            <a-layout-content id="layoutContent">
                <route-view  />
            </a-layout-content>
        </a-layout>
        <a-modal centered :maskClosable="false" :closable="false" width="400px" title="重新登录" v-model='showReloginDialog' class="ownModalBorder titDialog" :footer='null' >
            <div class="relogin-modal">
                <p>当前登录已超时，请输入密码重新登录</p>
                <a-input-password v-model="passwordVal" @pressEnter="relogin" autocomplete="new-password" placeholder="请输入密码" />
                <div class="footer-btns f-clearfix">
                    <a-button class="f-fl" @click="logout">退出系统</a-button>
                    <a-button type="primary" class="f-fr" @click="relogin">登录</a-button>
                </div>
            </div>
        </a-modal>
        <!-- 潜在租客 -->
        <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="804px" v-model="addSourceDialog" class="ownModalBorder titDialog" :title="addSourceTitle" @cancel="addSourceDialog=false">
            <add-source @cancelSave="addSave" @successSave="addSave" sourceId=""></add-source>
        </a-modal>
        <!-- 添加合租房源 -->
        <a-modal destroyOnClose centered cancelText="取消" okText="保存并关闭" :maskClosable="false" width="1200px"
                 v-model="addHouseDialog" class="ownModalBorder titDialog" title="录入房源"
                 @ok="saveHouse">
            <add-house ref="addHouse" @changeLoading="changeLoading" :houseTypeIndex="houseTypeIndex" @changeHouseTypeIndex="changeHouseTypeIndex" @changeStepNum="changeStepNum" @refreshPage="refreshPage"></add-house>
            <template slot="footer" v-if="this.houseTypeIndex==3">
              <label
                  class="config_lbl_css"
                  @click="goConfig"
                  v-if="stepsNum === 2"
              >
                保存并去完善推广信息
              </label>
              <a-button
                  class="save_btn_css"
                  key="submit"
                  type="primary"
                  @click="handleOk"
              >
                保存{{stepsNum === 1?'并去配置房间':''}}
              </a-button>
            </template>
          <template slot="footer" v-if="this.houseTypeIndex==1||this.houseTypeIndex==2">
            <a-button class="cancelFont"  @click="addHouseDialog=false;">取消</a-button>
            <a-button class="saveFont" type="primary" key="submit" :loading="saveLoading_01" @click="saveHouse">保存并关闭</a-button>
          </template>
        </a-modal>
        <!-- 添加预定弹框 -->
        <a-modal destroyOnClose  centered  :footer="null" :maskClosable="false" width="800px" v-model="addReserveDialog" class="ownModalBorder titDialog" title="添加预定" @cancel="addReserveDialog=false">
            <add-reserve @saveSuccess="addSave" @cancelUp="addReserveDialog = false"></add-reserve>
        </a-modal>
        <!-- 添加租客合同弹框 -->
        <a-modal destroyOnClose centered :footer="null"  :maskClosable="false" width="1200px" v-model="addContractDialog" class="ownModalBorder titDialog" title="添加合同" >
            <add-contract  @cancelUp="addContractDialog = false" @saveSuccess="addSave" @cancelSaveTenantContract="addContractDialog = false"></add-contract>
        </a-modal>
        <!-- 添加业主合同弹框 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="1200px" v-model="addOwnerContractDialog" class="ownModalBorder titDialog" title="添加合同" >
            <add-OwnerContract  @cancelUp="addOwnerContractDialog = false" @saveSuccess="addSave" @cancelSaveOwnerContract="addOwnerContractDialog=false"></add-OwnerContract>
        </a-modal>
        <!-- 添加添加账单 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="addBillDialog" class="ownModalBorder titDialog" title="添加账单"  @cancel="addBillDialog=false">
            <add-bill @saveSuccess="addSave" @closeThis="addBillDialog=false"></add-bill>
        </a-modal>
        <!-- 添加维修 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addRepairDialog" class="ownModalBorder titDialog" title="添加维修" @cancel="addRepairDialog=false">
            <add-repair  @refreshPage="addSave" @cancelSave="addRepairDialog=false" @successSave="addRepairDialog=false"></add-repair>
        </a-modal>
        <!-- 添加保洁 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addCleanDialog" class="ownModalBorder titDialog" title="添加保洁" @cancel="addCleanDialog=false">
            <add-clean  @refreshPage="addSave" @cancelSave="addCleanDialog=false" @successSave="addCleanDialog=false"></add-clean>
        </a-modal>
        <a-drawer
                placement="left"
                :width="362"
                @close="closeDrawer"
                :visible="visible"
                :zIndex='zindex'
                :mask='false'
                closable

        >

            <div class="collect-box f-clearfix" style="width:360px;height:100%">
                <div class="f-fl left-bg" style="width: 60px;height: 100%;"></div>
                <div class="f-fl right-item" style="width: 300px;height: 100%;">
                    <p style="padding:20px;font-size:16px;font-weight:400;color:rgba(119,119,119,1);">收藏记录 <icon-font type="icon1-yumengtubiao_shijian" /></p>
                    <div class="no-info" style="margin:30px 0 0 0;width: 100%;">
                        <img src="../assets/login/no-collect.png" style="margin:0 100px;height:95px;width:102px;">

                    </div>
                    <p style="text-align: center;padding:20px;">暂无收藏数据</p>
                </div>

            </div>

        </a-drawer>
    </a-layout>
</template>
<script>
    import MainMenu from '@/components/MainMenu/'
    import HeaderLayout from './HeaderLayout'
    import RouteView from './RouteView'
    import {  mapState , mapGetters } from 'vuex';
    import { USERNAME,CURRENTEMPID,CURRENTDEPTID } from '@/store/mutation-types'
    import { employeeUserInfo } from '@/api/enterprise';
    import { organizationView } from '@/api/setCompany';
    import AddSource from '@/views/source/tenant/addSource';
    import AddHouse from '@/views/house/whole/AddHouse'
    import addReserve from '@/views/contract/reserve/addReserve';
    import addContract from '@/views/contract/tenant/addTenantContract';
    import addOwnerContract from '@/views/contract/owner/addOwnerContract';
    import addBill from '@/views/finance/bill/addBill';
    import addRepair from '@/views/workorder/repair/add';
    import addClean from '@/views/workorder/cleaning/add';
    import {pushMessageNotReadStat} from "@/api/notice";
    export default {
        components: {
            MainMenu,
            HeaderLayout,
            RouteView,
            AddSource,
            AddHouse,
            addReserve,
            addContract,
            addOwnerContract,
            addBill,
            addRepair,
            addClean
        },
        data(){
            return {
                backgroundColor: '#001529',
                siderWidth: '60',
                alignConfig : {
                    offset: [-10, 0],
                },
                passwordVal: '',
                name:'',
                phone:'',
                nameJc:'',
                addSourceTitle:'添加潜在租客线索',               //添加线索池标题
                addSourceDialog:false,
                addHouseDialog:false,
                addReserveDialog:false,
                addContractDialog:false,
                addOwnerContractDialog:false,
                addBillDialog:false,
                addRepairDialog:false,
                addCleanDialog:false,
                houseTypeIndex:2,
                stepsNum:1,
                visible:false,
                zindex:100,
                isClick:false,
                noPermissions: false,
                logoSrc:'',
                spinLoading:true,
              saveLoading_01:false,   //分散
              saveLoading_02:false,   //集中
              noticeCount:0,
            }
        },
        computed: {
            ...mapGetters(['firstRouter', 'secondRouter']),
            ...mapState(['headerMenu','showReloginDialog']),
        },
        created(){
            if (JSON.parse(sessionStorage.getItem('permissions')).length==0){
                this.noPermissions = true
            }
            let router = this.firstRouter[0].children;
            router && router.forEach((item,i)=> {
                if ((item.redirect || item.path) === this.$route.path){
                    this.$store.commit('SET_HEADER_MENU',item)
                }
            })
            this.getUserInfo();
            this.getOrganizationInfo();
            this.pushMessageNotReadStat();
        },
        methods: {
          pushMessageNotReadStat(){
            pushMessageNotReadStat().then(res => {
              if(res){
                this.noticeCount = res.data;
              }
            });
          },
          refreshPage() {
            this.addHouseDialog = false;
          },
          changeLoading(val){
            if(this.houseTypeIndex == 3){
              this.saveLoading_02 = val;
            }
            else if(this.houseTypeIndex==1||this.houseTypeIndex==2){
              this.saveLoading_01 = val;
            }
          },
            getPopupContainer(trigger) {
                return document.getElementById('layoutHeader');
            },
            goMembercenter(){
              this.$router.push({
                path: '/membercenter'
              });
            },
            goToWallet(){
                this.$router.push({
                    path: '/wallet'
                }).catch(err => {err});
            },
            goToHelp(){
              window.open("http://help.byteox.com");
            },
            getUserInfo(){
                employeeUserInfo().then(res => {
                    //将登录人id放入缓存
                    this.$ls.set(CURRENTEMPID,res.data.empId);
                  //将登录人所在部门放入缓存
                  this.$ls.set(CURRENTDEPTID,res.data.deptId);
                    this.name =  res.data.name;
                    this.phone = res.data.phone;
                    if(/^[a-zA-Z]*$/.test(this.name)){
                       this.nameJc = this.name.substr(0,1);
                    }else{
                       this.nameJc = this.name.substring(this.name.length-2);
                    }
                });
            },
            getOrganizationInfo(){
                this.spinLoading = true;
                organizationView().then(res => {
                    if (res.code == 200) {
                        if(res.data.logoPic != null && res.data.logoPic && res.data.logoPic.origin){
                            this.logoSrc = res.data.logoPic.origin;
                        }
                        this.spinLoading = false;
                    }
                });
            },
            logout() {
                let _this = this;
                this.$modal.confirm({
                    title: '退出系统',
                    content: '确定要退出吗？',
                    width:"433px",
                    height:"192px",
                    okText: '确认',
                    cancelText: '取消',
                    icon:()=><icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d"/>,
                    onOk() {
                        sessionStorage.clear();
                        _this.$router.go(0);
                    },
                    onCancel() {
                    },
                });
            },
            relogin(){
                let sendData = {
                    username: this.$ls.get(USERNAME),
                    password: this.passwordVal,
                }
                this.$store.dispatch("userLogin", sendData).then(res=>{
                    this.$store.commit('SET_SHOW_RELOGIN_DIALOG',false)
                    window.location.reload()
                })
            },
            addSource(flag,record) {
                this.addSourceDialog = true;
            },
            addShareHouse(houseTypeIndex){
                this.addHouseDialog = true;
                this.houseTypeIndex = houseTypeIndex
            },
            addReserve() {
                this.addReserveDialog = true;
            },
            addContract(){
                this.addContractDialog = true;
            },
            addOwnerContract(){
                this.addOwnerContractDialog = true;
            },
            addBill(){
                this.addBillDialog = true;
            },
            addRepair(){
                this.addRepairDialog = true;
            },
            addClean(){
                this.addCleanDialog = true;
            },
            addSave(res){
                 this.addSourceDialog = false;
                 this.addReserveDialog = false;
                 this.addContractDialog = false;
                 this.addOwnerContractDialog = false;
                 this.addBillDialog = false;
                 this.addRepairDialog = false;
                 this.addCleanDialog = false;
            },
            changeStepNum(val){
                this.stepsNum = val;
            },
            saveHouse(){
                if(this.houseTypeIndex==1){
                    this.$refs.addHouse.saveWholeHouse();
                }
                else if(this.houseTypeIndex==2){
                    this.$refs.addHouse.saveShareHouse();
                }
                else if(this.houseTypeIndex==3){
                    this.$refs.addHouse.saveCentralizedHouse();
                }
            },
            handleOk() {
                if(this.houseTypeIndex==1){
                    this.$refs.addHouse.saveWholeHouse();
                }
                else if(this.houseTypeIndex==2){
                    this.$refs.addHouse.saveShareHouse();
                }
                else if(this.houseTypeIndex==3){
                  if(this.stepsNum==1){
                    this.$refs.addHouse.goConfig(this.stepsNum);
                  }else {
                    this.$refs.addHouse.handleOk();
                  }
                }
            },
            goConfig() {
                this.$refs.addHouse.goConfig(this.stepsNum);
            },
            changeHouseTypeIndex(val){
                this.houseTypeIndex = val;
            },
            clickFocusNotice() {
              this.$router.push({
                path: '/notice'
              }).catch(err => {err});
            },
            clickFocus() {
                this.visible = !this.visible;
            },
            downFul(){
               this.visible = false;
            },
            closeDrawer() {
                this.visible=!this.visible
            },
        },
    };
</script>
<style lang="less">
    #components-layout-demo-fixed-sider {
        .logo {
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 30px;
            background-color: #002140;
            .icon{
                margin-top: 16px;
                color: #ffffff;
            }
            img{
                width: 33px;
                height: 33px;
                border-radius: 50%;
            }
        }
        .sider {
            font-size: 30px;
            color: #ffffff;
            text-align: center;
            li{
                height: 60px;
                line-height: 60px;
            }
            li:hover{
                background: #000000;
                cursor: pointer;
            }
            .bottom-menu{
                position: absolute;
                bottom: 15px;
                width: 100%;
                .line{
                    margin-left: 10px;
                    width: 40px;
                    height: 0px;
                    border-top: 1px solid #cccccc;
                }
                .user{

                }
            }
          .IconRadius {
            width: 6px;
            height: 6px;
            border-radius: 4px;
            background:#FE3C38;
          }
        }
        #layoutContent {
            margin-top: 50px;
            border-radius: 4px;
            /*background: #ffffff;*/
            font-size: 14px;
            color: @mainFontColor;
            .content{
            }
        }
        .user{
            padding: 10px 20px 8px 20px;
            // margin: 20px;
            line-height: 30px;
            li{
                padding: 0 5px;
                // padding: 0 20px;
                width:210px;
                font-size:14px;


            }
            .li-bg{
               cursor: pointer;
               &:hover{
                    background-color: #F6F7F8;
                }
            }
            .user-li{
                height: 40px;
                margin:16px 0
                // cursor: default;
            }
            .user-li{
                height: 40px;

                >div{
                    height: 40px;
                    p{
                       height: 20px;
                       font-size:14px;
                       line-height: 20px;
                    }
                }
            }


        }
        .urseImg{
            font-size:12px;
            height: 40px;
            width:40px;
            border-radius: 50%;
            background:rgba(10,135,248,1);
            color: #ffffff;
            line-height: 40px;
            text-align: center;

        }
        .addModal{
            padding: 10px 20px 8px 20px;
            line-height: 30px;
            li{
                height: 36px;
                line-height: 36px;
                padding: 0 5px;
                width:120px;
                font-size:14px;
                color:#000000;
                cursor: pointer;
                &:hover{
                    background-color: #F6F7F8;
                }
                img{
                    height: 16px;
                    width: 16px;
                    margin-right: 10px;
                }

            }
        }
    }
    .relogin-modal{
        padding: 30px 80px;
        p{
            height: 40px;
            line-height: 40px;
        }
        .footer-btns{
            margin-top: 30px;
        }
    }
    &/deep/ .collect-box{
        width: 360px;
        .left-bg{

        }
        .right-item{
            width: 300px;
            height: 100%;
        }
        >p{
            padding:20px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(119,119,119,1);
        }
        .no-info{
           margin:30px 0 0 0;
            width: 100%;
            // position: relative;
            img{
                margin:0 100px;
                height:95px;
                width:102px;
            }

            // span{
            //     position: absolute;
            //     top:102px;
            //     left: 102px;
            //     font-size:12px;
            //     font-family:PingFangSC-Regular,PingFang SC;
            //     font-weight:400;
            //     color:#4A6DB2;
            // }
        }
    }
    &/deep/ .ant-drawer.ant-drawer-open .ant-drawer-mask{

       opacity: 0.1;
    }
</style>
