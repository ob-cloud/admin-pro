<template>
  <div class="membercenter-info">
    <div class="leftCont f-fl">
      <div class="myEnterprise">
        <div class="item">
          <div class="titleInfo title">
            <span></span>
            <b>我的企业</b>
          </div>
          <div class="right" @click="addRegister" v-if="GlobalConfig.IS_OPEN_CREATE_COMPANY">
            <span>+ 创建企业</span>
          </div>
        </div>
        <div class="list" :class="{'nowCompany':tenantId===item.tenantId}" v-for="(item,index) in haveCompany" :key="index" @click="changeCompany(item)">
            <p>{{item.tenantName}}&nbsp;&nbsp;(企业号：{{item.tenantId}})</p>
          <icon-font v-if="tenantId===item.tenantId" type="iconyumengtubiao_xuanzhong-" />
          <img v-if="tenantId===item.tenantId" src="../../assets/login/mTag.png" alt="">
        </div>
        <div class="itemImg" v-if='haveCompany.length == 0'>
          <img src="../../assets/login/companyAdd.png" alt>
          <a-button @click="addRegister">创建企业</a-button>
        </div>
      </div>
      <!-- eplus隐藏 -->
      <div class="itemWaiting">
        <div class="item">
          <div class="titleInfo title">
            <span></span>
            <b>待加入企业</b>
          </div>
          <div class="right" @click="showJoinCompany" v-if="GlobalConfig.IS_OPEN_CREATE_COMPANY">
            <span>+ 企业号加入企业</span>
          </div>
        </div>
        <div class="content-content">
          <div class="waitJoin" v-if="listApplyArr.length>0">
            <!-- <p class="waitJoin-title">待加入企业</p> -->
            <div class="waitJoin-content">
              <div class="waitJoin-content-part" v-for="(val,index) in listApplyArr" :key="index">
                {{val.tenantName}}
                <span class="tenantIdClass">({{val.tenantId}})</span>
                <span class="waitJoin-content-right">
                  审核中</span>
              </div>
            </div>
          </div>
          <div class="itemImg registerNoinfoImg" v-else>
            <img src="../../assets/login/registerNoinfo.png" alt="">
            <a-button @click="showJoinCompany">企业号加入企业</a-button>
          </div>
        </div>
      </div>
    </div>
    <div class="rigthCont f-fr" v-if="haveCompany.length>0">
      <div class="infoCont">
        <div class="item">
          <div class="titleInfo title">
            <span></span>
            <b>个人信息</b>
          </div>
        </div>
        <div class="cot">
           <div class="cont-info clearfix">
             <div class="cot-title f-fl">真实姓名</div>
             <div class="f-fl cot-input">
               <p v-if="editorfun">{{name}}</p>
               <div v-else><a-input v-model="name" placeholder="请输入您的姓名"></a-input></div>
             </div>
           </div>
           <div class="cont-info clearfix">
             <div class="cot-title f-fl">身份证号</div>
             <div class="f-fl cot-input">
               <p v-if="editorfun">{{idCardNo?idCardNo:'-'}}</p>
               <div v-else><a-input v-model="idCardNo" maxlength="18"  placeholder="请输入您的身份证号"></a-input></div>
             </div>
           </div>
           <div class="footer">
              <div>
                  <a-button v-if="editorfun" @click="editorfun=false">编辑</a-button>
                  <a-button v-else @click="save">保存</a-button>
              </div>
              <div style="clear:both;"></div>
          </div>
        </div>
      </div>
      <div class="infoCont" style="padding-bottom: 10px;">
        <div class="item">
          <div class="titleInfo title">
            <span></span>
            <b>账户安全</b>
          </div>
        </div>
        <div class="cot">
          <div class="cont-info clearfix">
            <div class="cot-title f-fl">登录密码</div>
            <div class="f-fl cot-input">
              <div class="clearfix passwordStyle">
                <div class="f-fl passwordStyle1">******</div>
                <div class="f-fr passwordStyle2 cursor" @click="goEditPassword()">
                  <icon-font type="iconyumengtubiao_bianji-" style="margin-right: 5px;" />修改密码
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="infoCont">
        <div class="item">
          <div class="titleInfo title" style="width: 100%;margin-bottom: 5px;">
            <span></span>
            <b>个性设置</b>
          </div>
          <div style="margin-left: 20px;color: #FFA036;font-size: 14px;">
            管家小程序收不到消息推送？请关注「{{ GlobalConfig.WX_NP_NAME }}」公众号
          </div>
        </div>
        <div class="item clearfix" style="margin-top: 15px;">
          <div class="commomStyle f-fl">
            <div style="font-size: 15px;">接收推送消息</div>
            <div style="color: #999999;font-size: 12px;">开启后可接收推送消息</div>
          </div>
          <div class="f-fr clearfix cursor" :class="acceptNotice?'selectedStyle':'unSelectStyle'" @click="setAcceptNotice">
            <div class="radiusStyle" :class="acceptNotice?'rightStyle f-fr':'leftStyle f-fl'"></div>
          </div>
        </div>
        <div class="item" v-if="acceptNotice" style="margin-top: 15px;">
          <div class="commomStyle itemBg" v-for="(item,index) in typeList" :key="index">
            <div class="f-fl noticeItemStyle" v-if="item.type==1">接收钱包相关消息</div>
            <div class="f-fl noticeItemStyle" v-if="item.type==2">接收账务相关消息</div>
            <div class="f-fl noticeItemStyle" v-if="item.type==3">接收合约相关消息</div>
            <div class="f-fl noticeItemStyle" v-if="item.type==4">接收房源相关消息</div>
            <div class="f-fl noticeItemStyle" v-if="item.type==5">接收线索相关消息</div>
            <div class="f-fl noticeItemStyle" v-if="item.type==6">接收工单相关消息</div>
            <div class="f-fl noticeItemStyle" v-if="item.type==7">接收审批相关消息</div>
            <div class="f-fl noticeItemStyle" v-if="item.type==8">接收智能设备相关消息</div>
            <div class="f-fr clearfix cursor" style="margin-top: 13px;" :class="item.isOn=='1'?'selectedStyle':'unSelectStyle'" @click="setType(item)">
              <div class="radiusStyle" :class="item.isOn=='1'?'rightStyle f-fr':'leftStyle f-fl'"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-modal centered :footer="null" :maskClosable="false" width="1200px" v-model="addDialog" class="ownModalBorder titDialog" title="创建企业" @cancel="handleCancel">
      <!-- 创建企业 -->
      <create-enterprise @addSuccess='addSuccess'></create-enterprise>
    </a-modal>
     <a-modal centered :footer="null" :maskClosable="false" width="1200px" v-model="joinDialog" class="ownModalBorder titDialog" title="企业号加入企业" @cancel="handleJoin">
      <!-- 加入企业 -->
      <join-enterprise @JoinSuccess='JoinSuccess'></join-enterprise>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="editPasswordDialog" class="ownModalBorder titDialog" title="修改密码" @cancel="editPasswordDialog=false">
      <!-- 修改密码 -->
      <edit-password :phone="phone" :userId="userId" @cancelSave="editPasswordDialog=false" @editSuccess="editPasswordDialog=false"></edit-password>
    </a-modal>
  </div>
</template>

<script>
import { routerFilter } from "@/router/filterRouter";
import { asyncRouterMap,failRouterMap } from "@/config/router.config.js";
import {
  employeeListCompany, employeeUserInfo, listApply,employeeChanegCompany,employeeUserPerfectInfo
} from '@/api/enterprise';
import  {pushMessageConfigEdit,pushMessageConfigGet,pushMessageConfigAdd} from '@/api/notice';
import createEnterprise from './plug/createEnterprise';
import joinEnterprise from './plug/joinEnterprise';
import editPassword from './plug/editPassword';
import {ROUTER, EMPACCOUNTID, ACCESS_TOKEN} from '@/store/mutation-types'
import {checkCard} from "@/api/contract";
export default {
  name: 'membercenter',
  components: { createEnterprise,joinEnterprise,editPassword },
  props: {},
  data() {
    return {
      empAccountId: '',
      listApplyArr: [],
      haveCompany: [],
      phone: '',
      name:'',
      idCardNo:'',
      addDialog: false,
      joinDialog: false,
      editorfun:true,
      userId:'',
      editPasswordDialog:false,
      acceptNotice:false,
      typeList:[],
      initTypeList:[
        {isOn:1,type:1},
        {isOn:1,type:2},
        {isOn:1,type:3},
        {isOn:1,type:4},
        {isOn:1,type:5},
        {isOn:1,type:6},
        {isOn:1,type:7},
        {isOn:1,type:8},
      ],
      noticeId:'',
    };
  },
  created() {
    this.empAccountId = this.$ls.get('empAccountId');
    this.init();
  },
  methods: {
    setType(item){
      if(item.isOn==0){
        item.isOn = 1;
      }
      else if(item.isOn==1){
        item.isOn = 0;
      }
      let parameter = {
        isOn:this.acceptNotice?1:0,
        typeList:this.typeList,
        id:this.noticeId,
      };
      pushMessageConfigEdit(parameter).then(res => {
        if (res.code === '200') {
          this.$message.success('个性设置配置成功');
          this.pushMessageConfigGet();
        } else {
          this.$message.error('个性设置配置失败');
        }
      });
    },
    setAcceptNotice(){
      this.acceptNotice = !this.acceptNotice;
      if(this.noticeId){
        let parameter = {
          isOn:this.acceptNotice?1:0,
          typeList:this.typeList,
          id:this.noticeId,
        };
        pushMessageConfigEdit(parameter).then(res => {
          if(res.code === '200'){
            this.$message.success('个性设置配置成功');
            this.pushMessageConfigGet();
          }
          else{
            this.$message.error('个性设置配置失败');1
          }
        });
      }
      else{
        let parameter = {
          isOn:this.acceptNotice?1:0,
          typeList:this.typeList,
        };
        pushMessageConfigAdd(parameter).then(res => {
          if(res.code === '200'){
            this.$message.success('个性设置配置成功');
            this.pushMessageConfigGet();
          }
          else{
            this.$message.error('个性设置配置失败');
          }
        });
      }
    },
    goEditPassword(){
      this.editPasswordDialog = true;
    },
    init() {
      this.getUserFhone();
      this.getListApply();
    },
    pushMessageConfigGet(){
      pushMessageConfigGet(this.userId).then(res => {
        if(res.code === '200'){
          this.noticeId = res.data.id;
          if(res.data.isOn){
            this.acceptNotice = (res.data.isOn==1);
            this.typeList = res.data.typeList;
          }
          else{
            this.acceptNotice = false;
            let typeList = [];
            this.initTypeList.forEach((item)=>{
              let temp = Object.assign({},item);
              typeList.push(temp);
            });
            this.typeList = typeList;
          }
        }
      });
    },
    getUserFhone(changeCompany) {
      employeeUserInfo().then(res => {
        this.phone = res.data.phone;
        this.tenantId = res.data.authCode;
        this.name = res.data.name;
        this.idCardNo = res.data.idCardNo;
        this.userId = res.data.empId;
        this.$ls.set("tenantId", res.data.authCode);
        this.$ls.set("userImgUrl", res.data.headPortraitUrl);
        this.$ls.set("empId", res.data.id);
        this.$ls.set("name", res.data.name);
        this.$ls.set("personph", res.data.phone);
        if (changeCompany) {
          this.$router.go(0);
        } else {
          this.companyList();
          //获取推送消息配置
          this.pushMessageConfigGet();
        }
      });
    },
    changeCompany(item) {
      let _this = this;
      if (this.tenantId === item.tenantId) {
        return;
      }
      this.$modal.confirm({
        title: '切换后数据同步更新',
        content: `确定要切换到${item.tenantName}吗？`,
        width:"433px",
        height:"192px",
        okText: '确认',
        cancelText: '取消',
        icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
        onOk() {
          employeeChanegCompany({
            tenantId: item.tenantId
          }).then(res => {
            // console.log(res);
            if (res.code === '200') {
              _this.$ls.set(ACCESS_TOKEN, res.data.token, 7 * 24 * 60 * 60 * 1000)
              _this.$store.commit('SET_TOKEN', res.data.token)
              _this.$ls.set("tenantId", item.tenantId);
              _this.getUserFhone(true);

              let router = routerFilter(asyncRouterMap[0].children, res.data.menuTree.children);
              asyncRouterMap[0].children = router;
              // console.log(asyncRouterMap)
              _this.$ls.set(EMPACCOUNTID,res.data.accountId);
              _this.$store.commit("FIRST_ROUTER", asyncRouterMap);
              _this.$router.addRoutes(asyncRouterMap);
              _this.$router.addRoutes(failRouterMap);
              _this.$ls.remove(ROUTER);
              if (res.data.menuTree.children.length !== 0) {
                // 存一下获取到的权限路由数据
                _this.$ls.set(ROUTER,JSON.stringify(res.data.menuTree.children));
              }
            }
          });
        },
        onCancel() {
        },
      });
    },
    companyList() {
      employeeListCompany(this.phone).then(res => {
        this.haveCompany = res.data;
      })
    },
    getListApply() {
      listApply(this.empAccountId).then(res => {
        this.listApplyArr = res.data;
      });
    },
    addRegister() {
      this.addDialog = true;
    },
    handleCancel() {
      this.addDialog = false;
    },
    handleJoin() {
      this.joinDialog = false;
    },
    showJoinCompany() {
      this.joinDialog = true;

    },
    JoinSuccess(res) {
       if(res){
         this.joinDialog = false;
         this.init();
       }
    },
    addSuccess(res) {
       if(res){
         this.addDialog = false;
         this.init();
       }
    },
    save() {
      if (this.checkDate()) {
        checkCard(this.idCardNo).then(res => {
          if (res === undefined) {
            this.$message.error('请输入正确身份证号');
          } else {
            if (res.code === '200') {
              let form = {
                name: this.name,
                idCardNo: this.idCardNo,
              }
              employeeUserPerfectInfo(this.userId, form).then(res => {
                this.$message.success('修改成功');
                this.editorfun = true;
              });
            } else {
              this.$message.error('请输入正确身份证号');
            }
          }
        });
      }
    },
    checkDate() {
      if (!this.name) {
          this.$message.error('请输入您的姓名!');
          return false;
      }
      if (!this.idCardNo) {
          this.$message.error('请输入身份证号!');
          return false;
      } else {
          let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
          if (!reg.test(this.idCardNo)) {
              this.$message.error('请输入正确身份证号');
              return false;
          }
      }
      return true;
    },

  },

  watch: {}
};
</script>

<style lang="less" scoped>
.membercenter-info {
  width: 100%;
  // height: 100%;
  height: calc(100vh - 50px); // height: 100%;
  min-width: 1200px;
  position: relative; // background-color: @mainBackgroundColor;
  justify-content: center;
  align-content: center;
  align-items: center;
  .leftCont {
    overflow: auto;
    width: 50%;
    height:100%;
    background:rgba(255,255,255,1);
    // box-shadow:2px 0px 2px 0px rgba(0,0,0,0.04);
  }
  .rigthCont{
    width: 50%;
    height:100%;
    overflow: auto;
    background:#FBFCFD;
    .infoCont{
      padding: 15px 20px 20px 18px;
      margin: 20px 40px;
      box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.1);
      border-radius: 4px 0px 0px 0px;
      background: #FFFFFF;
    }
  }
  .cot{
    height: 100%;
    width:480px;
    margin-left:16px;
    margin-top:15px;
    .cont-info{
      width:480px;
      height:36px;
      margin-bottom: 15px;
      p{
        height: 36px;
        // margin: 12px 0;
        line-height: 36px;
        border-radius: 4px;
        width: 100%;
        padding-left: 12px;
        background-color: #F6F7F8;
      }
      .cot-title{
        height: 36px;
        // margin: 12px 0;
        line-height: 36px;
        width: 104px;
        // height:36px;
        color:#777777;
      }
      .cot-input{
        width: calc(100% - 104px);
        .passwordStyle{
          width: 100%;
          height: 36px;
          line-height: 36px;
          padding-left: 12px;
          background-color: #F6F7F8;
          border-radius: 4px;
          .passwordStyle1{
            height: 36px;
            line-height: 36px;
            width: 250px;
            border-radius:4px 0 0 4px;
          }
          .passwordStyle2{
            width: calc(100% - 258px);
            border-radius:0 4px 4px 0;
            background: #E8F4FF;
            font-size: 16px;
            color: #0A87F8;
            padding-left: 10px;
          }
        }
      }
    }
    .footer {
        padding-top: 5px;
        width: 480px;
        height: 44px;
    }
  }
  .myEnterprise {
    overflow: hidden;
    padding-left: 30px;
    padding-right: 50px;
    margin-top: 22px;
    margin-bottom: 20px;
    width: 100%;
    .list {
      width: 100%;
      height: 60px;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      border: 1px solid rgba(221, 221, 221, 1);
      padding-left: 20px;
      margin-top: 20px;
      position: relative;
      cursor: pointer;

      p {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 58px;
      }
      .anticon {
        width: 32px;
        height: 32px;
        position: absolute;
        right: 15px;
        top: 14px;
        svg {
          width: 32px;
          height: 32px;
          color: #0A87F8;
        }
      }
    }
  }
  .itemImg {
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    position: relative;
    img {
      border-radius: 10px;
      width: 100%;
    }
  }
  .itemWaiting {
    padding-left: 30px;
    padding-right: 50px;
    margin-top: 26px;
    margin-bottom: 20px;
    width: 100%; // width: 100%; // height:
    // background: url("../../assets/login/houseBg.png");
  }
  .item {
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    position: relative;

    .titleInfo {
      float: left;
      line-height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 500;
      color: #111111;
      position: relative;
      box-sizing: border-box;
      padding-left: 14px;
      margin: 8px 0;
      span {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 2px;
        height: 14px;
        background: #777777; // box-shadow: 0px 0px 4px 0px #0A87F8;
        border-radius: 2px;
      }
      b {
        font-weight: 600;
      }
    }
    .right {
      color: #0A87F8;
      position: absolute;
      right: 0;
      top: 10px;
      cursor: pointer;
      img {
        width: 14px;
        height: 14px;
        margin-right: 3px;
        vertical-align: text-top;
      }
    }
    .commomStyle{
      margin-left: 20px;
    }
    .selectedStyle{
      margin-top: 8px;
      width: 44px;
      height: 23px;
      background: #1677FF;
      border-radius: 11px;
    }
    .unSelectStyle{
      margin-top: 8px;
      width: 44px;
      height: 23px;
      background: #DDDDDD;
      border-radius: 11px;
    }
    .radiusStyle{
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: -1px 2px 2px 0px rgba(0, 0, 0, 0.1), 0px 2px 9px 0px rgba(0, 0, 0, 0.08), 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
    }
    .rightStyle{
      margin-top: 2px;
      margin-right: 1px;
    }
    .leftStyle{
      margin-top: 2px;
      margin-left: 1px;
    }
    .itemBg{
      padding: 0 15px;
      height: 50px;
      background: #F7F9FA;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .noticeItemStyle{
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color:#333333;
    }
  }
  .content-content {
    // height: 600px;
    margin: 0 auto;
    justify-content: center;
    align-content: center;
    align-items: center;
    .waitJoin {
      width: 100%;
      margin: 0 auto;
    }
    .waitJoin-title {
      margin-top: 15px;
      font-size: 22px;
      font-weight: 500;
    }
    .waitJoin-content {
      background: #fff;
      margin-top: 15px;
      max-height: 140px;
      // overflow-y: auto;
      .waitJoin-content-part {
        margin-top: 20px;
        padding: 20px;
        font-size: 16px;
        border: 1px solid #dcdfe6; // width:638px;
        // height:54px;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px; // border:1px solid rgba(221,221,221,1);
      }
      .waitJoin-content-right {
        float: right;
        color: #FFA036;
      }
      .tenantIdClass {
        color: #777777;
      }
    }
    .content-footer {
      height: 410px;
      margin-top: 20px;
      padding-top: 42px; // background: url("../../assets/registeredcompanyCon.png") no-repeat;
      background-size: cover; // display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
    }
    .imgWrap {
      text-align: center; // margin-top: 42px;
      img {
        display: inline-block;
        width: 105px;
        height: 66px;
      }
    }
    .tip {
      text-align: center;
      margin-top: 30px;
      .join {
        // color: @mainColor;
      }
    }
    .button-wrap {
      text-align: center;
      margin-top: 30px;
      .primary {
        display: inline-block;
        width: 340px;
        height: 40px;
        .el-button {
          width: 100%;
        }
      }
      .primarySec {
        margin-top: 20px;
      }
    }
  }
  .nowCompany {
    background: #f2fdfb !important;
    border-color: #0A87F8 !important;
    position: relative;
    img{
      position: absolute;
      top: 0;
      right: -85px;
      height: 58px;
    }
  }
}
</style>
<style lang="less">
.membercenter-info {
  padding:14px;
  .el-input__inner {
    border: none;
    padding: 0;
  }
  .el-checkbox {
    margin-right: 5px;
  }
  .primarySec {
    .el-button--primary {
      background: linear-gradient( 316deg,
      rgba(35, 201, 220, 1) 0%,
      rgba(68, 194, 231, 1) 100%);
    }
  }
  .registerNoinfoImg {
    .ant-btn {
      color: #FFA036;
      border: 1px solid rgba(255, 160, 54, 1);
    }
  }
  .myEnterprise{
    .ant-btn {
      color: #0A87F8;
      border: 1px solid rgba(10, 135, 248, 1);
    }
  }
  .itemImg{
    .ant-btn {
      position: absolute;
      top: 98px;
      right: 46px;
      background: none;
      width: 134px;
      height: 44px;
      border-radius: 27px;
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

