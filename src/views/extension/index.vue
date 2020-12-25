<template>
  <div class="extension-box">
    <content-top>
      <top-title :needMarkFlag="false" :activeIndex="activeIndex" :statusData="statusData" @changeStatus="changeStatus"></top-title>
    </content-top>
    <content-main class="contentMain">
      <div v-if="status==1">
        <promotion @goToConfig="goToConfig" :haveConfigRemark="haveConfigRemark"></promotion>
      </div>
      <div v-if="status==2">
        <config :platform="platform"></config>
      </div>
    </content-main>
    <!-- 没有发房配置资源权限提示 -->
    <a-modal centered v-model="unConfigDialog" :footer="null" class="ownModalBorder" title="" :bodyStyle="{padding:'50px 0px 56px 0px'}" @cancel="unConfigDialog=false" width="520px">
      <un-config :click-platform="platform" ></un-config>
    </a-modal>
  </div>
</template>

<script>
import Promotion from './promotion/index';
import Config from './config/index';
import TopTitle from '@/components/TopStatus/title';
import UnConfig from './unConfig';
export default {
  name: "index",
  components: {
    Promotion,
    TopTitle,
    Config,
    UnConfig,
  },
  data() {
    return {
      statusData:[],
      status:0,              //当前面板值
      statusDataAll:[
        {
          title: '房源推广',
          status: 1,
        },
        {
          title: '推广配置',
          status: 2,
        },
      ],
      platform:1,
      activeIndex:0,
      btnArr:[],
      unConfigDialog:false,
      haveConfigRemark:false,
    }
  },
  created() {
    this.initData();
  },
  methods:{
    goToConfig(platform){
      if(this.btnArr.indexOf('2')>-1){
        this.status = 2;
        this.platform = platform;
        this.activeIndex = 1;
      }
      else{
        this.platform = platform;
        this.unConfigDialog = true;
      }
    },
    initData(){
      this.permissions = JSON.parse(sessionStorage.getItem('permissions'));
      let markArr = ['mk_extension_promotion_ck','mk_extension_config_ck'];
      let btnArr = [];
      //判断资源权限
      let haveConfigFlag = false;
      markArr.forEach(ele => {
        this.permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_extension_promotion_ck'){
              btnArr.push('1');
            }else if(value.mark == 'mk_extension_config_ck'){
              btnArr.push('2');
              haveConfigFlag = true;
            }
            return true;
          }
        });
      });
      this.haveConfigRemark = haveConfigFlag;
      this.btnArr = btnArr;
      if(btnArr.length==0){
        return ;
      }
      let statusDataAllStatus = ['1','2'];
      statusDataAllStatus.forEach((item,index)=>{
        if(btnArr.indexOf(item)>-1){
          this.statusData.push(this.statusDataAll[index])
        }
      });
      this.status = Number(this.statusData[0].status);
    },
    changeStatus(item) {
      this.status = item.status;
      if( this.status == 1){
      }
      else if( this.status == 2){
      }
    },
  },
  filters: {
  },
}
</script>

<style lang="less" scoped>
  .extension-box{
    .content-top{
      overflow: hidden;
    }
    /deep/ .content-main .content{
      padding: 0;
    }
    /deep/ .content-main{
      padding: 14px;
    }
  }
</style>