<template>
  <div class="editPassword-box">
    <div class="warnning">
      <a-icon type="exclamation-circle" style="color: #FFA036;font-size: 14px;margin: 0 5px 0 20px;" />门锁密码需要在门锁本身上进行操作，系统仅作为记录密码的平台
    </div>
    <div class="detail">
      <div class="detailTitle">
        <label-item class="u-bottom-border" title="新密码" :valLength="pwd.length" :maxSize="10" :must-fill="true">
          <a-input placeholder="请输入6-10位数字" v-validate="'naturalNum'" v-model="pwd" maxlength="10"></a-input>
        </label-item>
        <div class="desc">密码修改成功后，将自动给授权记录还在生效中的被授权人发送密码短信</div>
      </div>
      <div class="clearfix">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAdd">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="passwordEdit">
            确定修改
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  * as API from '@/api/smartDevices';
export default {
  name: "editPassword",
  components: {
  },
  props: {
    lockId: {
      type: String,
      required : true,
    },
  },
  data() {
    return {
      pwd:'',
      saveLoading:false,
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    cancelAdd(){
      this.$emit('closeThis');
    },
    passwordEdit(){
      if(!this.pwd){
        this.$message.warning('请输入密码');
        return ;
      }
      if(this.pwd.length<6||this.pwd.length>10){
        this.$message.warning('请输入正确密码');
        return ;
      }
      this.saveLoading = true;
      let parameter = {
        doorLockId:this.lockId,
        pwd:this.pwd,
      };
      API.doorLockPwdEdit(parameter).then(res=>{
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
         this.$message.success('密码修改成功');
         this.$emit('editPasswordSuccess');
        }
        else{
          this.$message.error('密码修改失败');
          this.saveLoading = false;
        }
      });
    },
  }
}
</script>

<style scoped lang="less">
  .editPassword-box{
    .warnning{
      height: 36px;
      line-height: 36px;
      background: rgba(255, 160, 54, 0.1);
      font-size: 13px;
      color: #FFA036;
      i{
        vertical-align: -0.2em;
      }
    }
    .detail{
      padding: 20px;
      .detailTitle{
        .desc{
          font-size: 12px;
          color: #777777;
          margin-top: 10px;
        }
        /deep/ .label-item .title{
          color: #111111;;
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 7px;
        }
        /deep/ .ant-input{
          color: #111111;
        }
      }
      .buttonDiv {
        margin: 89px 0 0px 0;
        .formItemMarginButton {
          width: 120px;
          height: 40px;
          margin-left: 18px;
        }
        .cancelFont {
          color: #666666;
        }
        .saveFont {
          color: #FFFFFF;
          background-color: #0A87F8;
        }
      }
    }

  }
</style>