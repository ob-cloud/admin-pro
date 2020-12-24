<template>
  <div class="addGood-box">
    <div style="padding: 25px 20px 0 20px;position: relative;">
      <label-item :must-fill="true" class="u-bottom-border" title="物品" :maxSize="10" :valLength="goodName.length">
        <a-input v-model="goodName" maxlength="10" @change="validate()" placeholder="请输入"></a-input>
      </label-item>
      <div style="position: absolute;color: #FB4246;font-size: 14px;top: 90px" v-if="exsit">物品名称重复</div>
    </div>
    <div class="clearfix" style="width: 100%;padding:109px 20px 20px 0;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAdd">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="addGood">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addGood",
  props: {
    houseType:{
      type:Number,
      required:true,
    },
    index:{
      type:Number,
    },
    roomList:{
      type:Array,
    }
  },
  components: {

  },
  data() {
    return {
      goodName:'',
      exsit:false
    }
  },
  created: function () {
    if(this.index||this.index==0){
      this.goodName =this.roomList[this.houseType].names[this.index].name;
    }
  },
  methods: {
    cancelAdd(){
      this.$emit('cancelAdd');
    },
    addGood(){
      if(!this.goodName){
        this.$message.warning('请输入物品');
        return
      }
      if(this.validate()){
        return ;
      }
      this.$emit('successAdd',this.houseType,this.index,this.goodName)
    },
    validate(){
      if(!this.goodName){
        return ;
      }
      this.exsit = false;
      this.roomList[this.houseType].names.forEach((item,index)=>{
        if(this.index){
          if(this.index!=index&&item.name == this.goodName){
            this.exsit = true;
          }
        }
        else{
          if(item.name == this.goodName){
            this.exsit = true;
          }
        }
      });
      return this.exsit;
    },
  },
}
</script>

<style scoped lang="less">
    .addGood-box{
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