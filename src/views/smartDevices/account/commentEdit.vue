<template>
  <div class="commentEdit-box clearfix">
    <div class="title" style="margin: 25px 0 5px 0;">账号说明</div>
    <label-item class="u-bottom-border" title="" :maxSize="50" :valLength="sendData.comment.length">
      <a-textarea style="padding: 4px 0;" placeholder="请输入" v-model="sendData.comment" :autosize="{ minRows: 1, maxRows: 5 }" maxlength="50"></a-textarea>
    </label-item>
    <div class="buttonDiv f-fr">
      <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelEdit">
        取消
      </a-button>
      <a-button size="large" type="primary" class="formItemMarginButton saveFont" :loading="saveLoading" @click="editComment">
        确定
      </a-button>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/smartDevices";
export default {
  name: "commentEdit",
  components: {
  },
  props: {
    id: {
      type: String,
      required:true,
    },
    comment: {
      type: String,
    },
  },
  data() {
    return {
      sendData:{
        comment:'',
      },
      saveLoading:false,
    }
  },
  created() {
    this.sendData.comment = this.comment;
  },
  methods: {
    cancelEdit(){
      this.$emit('cancelEdit');
    },
    editComment(){
      let parameter = {
        id:this.id,
        comment:this.sendData.comment,
      };
      this.saveLoading = true;
      API.lockAuthAccountEdit(parameter).then(res => {
        if(!res){
          this.saveLoading = false;
        }
        if(res.code === '200'){
          this.saveLoading = false;
          this.$message.success('修改成功');
          this.$emit('editSuccess');
        }
        else{
          this.saveLoading = false;
        }
      });
    },
  },
}
</script>

<style scoped lang="less">
  .commentEdit-box{
    padding: 0 20px;
    .title{
      color:#111111;
      font-size: 16px;
    }
    .buttonDiv {
      margin: 100px 0 20px 0;
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
</style>