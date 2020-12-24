<template>
  <div class="commentPic-box">
    <div>
      <div class="item item1">
        <LabelItem title="备注" class="u-bottom-border" :maxSize="100" :valLength="comment.length">
          <a-textarea v-model="comment" autosize maxlength="100" placeholder="填写后租客可见"></a-textarea>
        </LabelItem>
      </div>
      <div class="item item2" style="margin-top: 25px;position: relative;" >
        <label-item title="照片凭证">
          <own-upload v-if="scenePic==0" style="padding-right: 10px"  :picList="picList" :uploadParms="sendData" :maxLength="5" :showTips="false" ref="ownUpload">
          </own-upload>
          <span v-if="scenePic==1" style="color: #BBBBBB;font-size: 14px;">需现场拍照，仅支持手机端拍照上传</span>
        </label-item>
        <div style="position: absolute;top:2px;left: 70px;color: #777777;font-size: 13px;">
          （支持格式：jpg、png、jpeg；最多5张）
        </div>
      </div>
      <div class="clearfix" style="width: 100%;padding:62px 0px 0px 0;">
        <div class="buttonDiv f-fr">
          <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAdd">
            取消
          </a-button>
          <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="addCommentPic">
            保存
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentPic",
  components: {
  },
  props: {
    scenePic:{
      type:Number,
      required:true,
    },
    typeIndex:{
      type:Number,
      required:true,
    },
    itemIndex:{
      type:Number,
      required:true,
    },
    commentPicItem:{
      type:Object,
    }
  },
  data() {
    return {
      comment:'',
      picList:[],
    }
  },
  created() {
    this.sendData = { //
      // 上传时附带的额外参数
      bizId: '', // 房源id
      bizType: 3, // 图片大类标识 租客
      subBizType: 3, // 图片子类标识 身份证正面
      orderIndex: 1 // 排序值
    }
    if(this.commentPicItem.comment){
      this.comment = this.commentPicItem.comment;
    }
    if(this.commentPicItem.fileDTOList&&this.commentPicItem.fileDTOList.length>0){

      this.picList = [];
      this.commentPicItem.fileDTOList.forEach((item)=>{
        item.notRealDelete = true;
        item.status = 'done';
        this.picList.push(item);
      })
    }
  },
  methods: {
    cancelAdd(){
      this.$emit('cancelAdd');
    },
    addCommentPic(){
      let picList = [];
      if(this.$refs&&this.$refs.ownUpload){
        picList = [...this.$refs.ownUpload.picsList];
      }
      this.$emit('addCommentPic',this.comment,picList);
    },
  }
}
</script>

<style scoped lang="less">
  .commentPic-box{
    padding: 15px 20px 20px 20px;
    .item{
      /deep/ .label-item .title{
        color: #111111;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .item1{
      /deep/ .label-item .title{
        margin: 6px 0;
      }
    }
    .item2{
      /deep/ .label-item .title{
        margin: 6px 0 12px 0;
      }
    }
    .buttonDiv {
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