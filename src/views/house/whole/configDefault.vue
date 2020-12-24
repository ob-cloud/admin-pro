<template>
  <div class="configDefault-box">
    <div>
      <a-checkbox v-model="checkAll" @change="checkAllItem" :indeterminate="indeterminate" ><span class="titleStyle">物品配置</span></a-checkbox>
    </div>
    <div class="selectStyle clearfix">
      <div class="f-fl clearfix item" v-for="(item,index) in showPublicConfig" :key="index">
        <a-checkbox class="f-fl overHidde" style="width: auto;" v-model="item.checked" @change="(value)=>checkItem(value,index)"><span :class="item.checked?'selectedStyle':'unSelectStyle'">{{item.name}}</span></a-checkbox>
        <div v-if="item.checked" class="f-fl" style="height: 44px;line-height: 44px;margin-right: 10px;font-weight: 100;">
          x
        </div>
        <div v-if="item.checked" class="clearfix f-fl u-bottom-border quantityStyle" style="max-width: 96px;">
          <div class="f-fl cursor" style="width: 16px;" @click="reduceQuantity(item)">
            <div class="commonStyle" :class="item.quantity==1?'unEditStyle':'editStyle'" >
              <icon-font type="iconjian" />
            </div>
          </div>
          <a-input style="width: 45px;text-align: center;color: #111111" class="f-fl" v-validate="'naturalNum|min(1)|max(99999)'" placeholder="请输入" v-model="item.quantity"></a-input>
          <div class="f-fl cursor" style="width: 16px;" @click="plusQuantity(item)">
            <div class="commonStyle" :class="item.quantity==99999?'unEditStyle':'editStyle'" >
              <icon-font type="iconjia" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix" style="width: 100%;padding:32px 0px 0px 0;">
      <div class="buttonDiv f-fr">
        <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelSaveRoomConfig">
          取消
        </a-button>
        <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="saveRoomConfig">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "configDefault",
  components: {

  },
  props: {
    housePublicConfig:{
      type:Array,
    },
    currentConfig:{
      type:Array,
    },
    fromType:{
      type:String,
    },
  },
  data() {
    return {
      showPublicConfig:[],
      checkAll:false,
      indeterminate:false,
    }
  },
  created() {
    this.initData();
  },
  methods: {
    checkAllItem(value){
      this.indeterminate = false;
      this.checkAll = value.target.checked;
      if(value.target.checked){
        this.showPublicConfig.forEach((item)=>{
          if(!item.checked){
            item.checked = true;
            item.quantity = 1;
          }
        });
      }
      else{
        this.showPublicConfig.forEach((item)=>{
            item.checked = false;
            item.quantity = 0;
        });
      }
    },
    checkItem(value,index){
      if(value.target.checked){
        this.showPublicConfig[index].quantity = 1;
      }
      else {
        this.showPublicConfig[index].quantity = 0;
      }
      let selectedConfig = [];
      this.showPublicConfig.forEach((item)=>{
        if(item.checked){
          selectedConfig.push(item);
        }
      });
      this.indeterminate = !!selectedConfig.length && selectedConfig.length < this.housePublicConfig.length;
      this.checkAll = selectedConfig.length === this.housePublicConfig.length;
      this.$forceUpdate();
    },
    plusQuantity(item){
      if(item.quantity>9999){
        return ;
      }
      item.quantity += 1;
    },
    reduceQuantity(item){
      if(item.quantity<=1){
        return ;
      }
      item.quantity -= 1;
    },
    initData(){
      this.showPublicConfig = [];
      this.housePublicConfig.forEach((item)=>{
        let obj = Object.assign({},item);
        this.currentConfig.forEach((temp)=>{
          if(temp.id == item.id){
            obj = Object.assign({},temp);
          }
        });
        this.showPublicConfig.push(obj);
      });
      this.indeterminate = !!this.currentConfig.length && this.currentConfig.length < this.housePublicConfig.length;
      this.checkAll = this.currentConfig.length === this.housePublicConfig.length;
    },
    cancelSaveRoomConfig(){
      this.$emit('cancelSaveRoomConfig');
    },
    saveRoomConfig(){
      let modifyConfig = [];
      this.showPublicConfig.forEach((item)=>{
        if(item.checked){
          modifyConfig.push(item)
        }
      });
      if(this.fromType=='room'){
        this.$emit('saveRoomConfig',modifyConfig);
      }
      else{
        this.$emit('saveHouseConfig',modifyConfig);
      }
    },
  }
}
</script>

<style scoped lang="less">
  .configDefault-box{
    padding: 20px;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    .titleStyle{
      font-size: 16px;
      color: #111111;
      font-weight: 500;
    }
    .selectStyle{
      margin-top: 5px;
      .item{
        width: 234px;
        height: 44px;
        line-height: 44px;
      }
      .selectedStyle{
        font-size: 14px;
        color: #111111;
      }
      .unSelectStyle{
        font-size: 14px;
        color: #777777;
      }
      .quantityStyle{
        height: 44px;
        .commonStyle{
          width: 16px;
          height: 16px;
          line-height: 14px;
          background: #F6F7FB;
          border: 1px solid #EEEEEE;
          text-align: center;
          border-radius: 50%;
          margin-top: 15px;
        }
        .unEditStyle{
          color: #999999;
        }
        .editStyle{
          color: #0A87F8;
        }
        /deep/ .ant-input{
          padding: 10px 0 0 0;
        }
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