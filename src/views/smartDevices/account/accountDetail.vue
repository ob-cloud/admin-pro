<template>
  <div class="accountDetail-box">
    <div class="top clearfix">
      <div class="iconStyle yunDing f-fl" v-if="guoJiaDetail.brand==1"><icon-font  type="iconyunding"></icon-font></div>
      <div class="guoJiaFontStyle f-fl" v-if="guoJiaDetail.brand==1">云丁</div>
      <div class="iconStyle guoJia f-fl" v-if="guoJiaDetail.brand==2"><icon-font  type="iconguojia"></icon-font></div>
      <div class="guoJiaFontStyle f-fl" v-if="guoJiaDetail.brand==2">果加</div>
      <div class="iconStyle fengDian f-fl" v-if="guoJiaDetail.brand==3"><icon-font  type="iconfengdian"></icon-font></div>
      <div class="guoJiaFontStyle f-fl" v-if="guoJiaDetail.brand==3">蜂电</div>
      <div class="iconStyle chaoyi f-fl" v-if="guoJiaDetail.brand==4"><icon-font  type="iconchaoyi"></icon-font></div>
      <div class="guoJiaFontStyle f-fl" v-if="guoJiaDetail.brand==4">超仪</div>
      <div class="editStyle cursor f-fr" @click="unBind()" style="color: #FB4246;">解绑账号</div>
      <div class="editStyle cursor f-fr" @click="unBind()"><icon-font style="margin-right: 3px;color: #FB4246;" type="iconjiechu" /></div>
      <div class="editStyle cursor f-fr" v-if="guoJiaDetail.brand==1" @click="goToYunDing()"  style="color: #0A87F8;margin-right: 20px;">重新授权</div>
      <div class="editStyle cursor f-fr" v-if="guoJiaDetail.brand==1" @click="goToYunDing()"><icon-font style="margin-right: 3px;color: #0A87F8;" type="iconyumengtubiao_zhongzhi" /></div>
      <div class="editStyle cursor f-fr" @click="commentEditDialog=true;" style="color: #0A87F8;margin-right: 20px;">修改备注说明</div>
      <div class="editStyle cursor f-fr" @click="commentEditDialog=true;"><icon-font style="margin-right: 3px;color: #0A87F8;" type="iconyumengtubiao_bianji-1" /></div>
    </div>
    <div class="detail">
      <div class="detailItem clearfix">
        <div class="f-fl" v-if="guoJiaDetail.brand==4">
          <label-item title="账号应用ID">
            <span class="detailFont">{{guoJiaDetail.thirdPartyAppId}}</span>
          </label-item>
        </div>
        <div class="f-fl" v-if="guoJiaDetail.brand==1||guoJiaDetail.brand==2||guoJiaDetail.brand==3">
          <label-item :title="guoJiaDetail.brand==1?'账号':guoJiaDetail.brand==2?'账号':guoJiaDetail.brand==3?'用户账号uid':''">
            <span class="detailFont">{{guoJiaDetail.thirdPartyAccountId}}</span>
          </label-item>
        </div>
        <div class="f-fl" v-if="guoJiaDetail.brand==1||guoJiaDetail.brand==2||guoJiaDetail.brand==3">
          <label-item :title="guoJiaDetail.brand==1?'授权密钥':guoJiaDetail.brand==2?'密码':guoJiaDetail.brand==3?'用户账号secret':''">
            <span class="detailFont">{{guoJiaDetail.thirdPartyAccountSecret?guoJiaDetail.thirdPartyAccountSecret:'-'}}</span>
          </label-item>
        </div>
        <div class="f-fl" v-if="guoJiaDetail.brand==2" style="margin-top: 20px;">
          <label-item title="密钥">
            <span class="detailFont">{{guoJiaDetail.thirdPartyApiSecret?guoJiaDetail.thirdPartyApiSecret:'-'}}</span>
          </label-item>
        </div>
        <div class="f-fl" v-if="guoJiaDetail.brand==3" style="margin-top: 20px;">
          <label-item title="机构账号uid">
            <span class="detailFont">{{guoJiaDetail.thirdPartyAppId?guoJiaDetail.thirdPartyAppId:'-'}}</span>
          </label-item>
        </div>
        <div class="f-fl" v-if="guoJiaDetail.brand==3" style="margin-top: 20px;">
          <label-item title="机构账号secret">
            <span class="detailFont">{{guoJiaDetail.thirdPartyAppSecret?guoJiaDetail.thirdPartyAppSecret:'-'}}</span>
          </label-item>
        </div>
      </div>
      <div class="detailItem clearfix" style="width: 100%;">
        <div class="f-fl" style="margin-top: 20px;">
          <label-item title="授权绑定人">
            <span class="detailFont">{{guoJiaDetail.creater}}</span>
          </label-item>
        </div>
        <div class="f-fl" style="margin-top: 20px;">
          <label-item title="授权绑定时间">
            <span class="detailFont">{{guoJiaDetail.createTime?$moment(guoJiaDetail.createTime).format('YYYY.MM.DD HH:mm'):'-'}}</span>
          </label-item>
        </div>
      </div>
      <div style="margin-top: 20px;width: 100%;">
        <label-item title="账号说明" style="width: 100%;">
          <span class="detailFont" >{{guoJiaDetail.comment?guoJiaDetail.comment:'-'}}</span>
        </label-item>
      </div>
    </div>
    <!-- 修改备注 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="commentEditDialog" class="ownModalBorder titDialog" title="修改账号说明">
      <comment-edit :id="id" :comment="guoJiaDetail.comment" @cancelEdit="commentEditDialog=false;" @editSuccess="editSuccess"></comment-edit>
    </a-modal>
    <!-- 云丁授权 -->
    <a-modal destroyOnClose centered v-model="htmlPannelDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'40px 0px 0px 0px'}" @cancel="htmlPannelDialog=false" width="1250px">
      <html-panel :url="url" @authSuccess="authSuccess"></html-panel>
    </a-modal>
  </div>
</template>

<script>
import CommentEdit from './commentEdit';
import HtmlPanel from './HtmlPanel';
import * as API from "@/api/smartDevices";
export default {
  name: "accountDetail",
  components: {
    CommentEdit,
    HtmlPanel,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      guoJiaDetail:{
      },
      commentEditDialog:false,
      htmlPannelDialog:false,
      url:'',
    }
  },
  created() {
    this.lockAuthAccountView();
  },
  methods: {
    authSuccess(){
      setTimeout(()=>{
        this.$message.success('重新授权成功');
        this.htmlPannelDialog = false;
        this.lockAuthAccountView();
      },3000);
    },
    goToYunDing(){
      API.yudingGetAuthUrl().then(res=> {
        if(res.code === '200'){
          this.htmlPannelDialog = true;
          this.url = res.data;
        }
      });
    },
    unBind(){
      let _this = this;
      let id = this.id;
      this.$modal.confirm({
        title: '确定要解绑 「' + this.guoJiaDetail.brandName + '/' + this.guoJiaDetail.thirdPartyAccountId + '」 账号吗？',
        content: '解绑后，该账号上已绑定的门锁、水电表将同步全部解除绑定',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          API.lockAuthAccountUnBind({id:id}).then(res => {
            // console.log(res)
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
    editSuccess(){
      this.commentEditDialog = false;
      this.$emit('refreshinfoFun',true);
      this.lockAuthAccountView();
    },
    lockAuthAccountView(){
      let parameter = {
        id:this.id,
      };
      API.lockAuthAccountView(parameter).then(res => {
        if(res.code === '200'){
          this.guoJiaDetail = res.data;
        }
      });
    },
  }
}
</script>

<style scoped lang="less">
  .accountDetail-box{
    .top{
      padding: 20px 20px 20px 20px;
        height: 74px;
        border-bottom: 1px solid #EEEEEE;
      .guoJia{
        background: #424242;
      }
      .yunDing{
        background:#14AEB8;
      }
      .fengDian{
        background:#1EA7BB;
      }
      .chaoyi{
        background:#13c2c2;
      }
      .iconStyle{
        width: 34px;
        height: 34px;
        line-height: 34px;
        border-radius: 50%;
        svg{
          margin: 6px 0 0 6px;
          width:22px;
          height: 22px;
          color: #FFFFFF;
        }
      }
      .guoJiaFontStyle{
        height: 34px;
        line-height: 34px;
        font-size: 18px;
        color: #111111;
        margin-left: 7px;
      }
      .editStyle{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        i{
          vertical-align: -0.15em;
        }
      }
    }
    .detail{
      padding: 22px 20px 100px 20px;
      .detailItem{
        div{
          width: 240px;
        }
      }
      .detailFont{
        font-size: 14px;
        color: #111111;
      }
      /deep/ .label-item .title{
        font-size: 14px;
        padding-bottom: 2px;
      }
    }
  }
</style>