<template>
  <div class="exportExcelBox">
      <div class="content" slot="content">
        <div v-if="exportIng">
          <div style="height:53px;"></div>
          <div :style="tips?'':'margin-bottom:40px;'">信息导出中，请耐心等待…</div>
          <div class="tipsStyle" v-if="tips" style="margin-bottom:40px;">{{tips}}</div>
          <div class="exportIng-box">
             <a-progress :stroke-width="16" strokeColor="#0A87F8"  :percent="Percentage"></a-progress> 
          </div>
        </div>
        <div v-if="!exportIng&&count>0">
          <div style="height:53px;"></div>
          <div :style="tips?'':'margin-bottom:40px;'" v-if="countFul&&showTotalFlag">导出成功！共计导出 <span style="font-weight: 500;color: #111;">{{count}}</span> 条数据信息</div>
          <div :style="tips?'':'margin-bottom:40px;'" v-else>导出成功！</div>
          <div class="tipsStyle" v-if="tips" style="margin-bottom:40px;">
            {{tips}}
          </div>
          <div class="download-box clearfix">
            <span class="title-name f-fl">{{name}}</span>
            <a class="curP main-color f-fr" @click.prevent="exportFile(url,downxls)" >
                 <icon-font type="iconyumengtubiao_xiazai1" />
            </a>
            <a class="main-color curP f-fr" @click.prevent="exportFile(url,downxls)" > 下载</a>
          </div>
        </div>
        <div v-if="!exportIng&&count==0&&!errMsg">
          <div style="height:40px;"></div>
          <a-empty :description="resultTips" />
        </div>
        <div v-if="!exportIng&&errMsg">
          <div style="height:100px;"></div>
          <div style="margin-bottom:40px;color: #FFA036;"><icon-font type="iconyumengtubiao_tishi" style="margin-right: 5px;" />{{ errMsg }}</div>
        </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios';
import {ACCESS_TOKEN} from '@/store/mutation-types';
import pako from "@/utils/pako";
import {Decrypt} from "@/utils/crypto";
export default {
  name: 'exportExcel',
  props: {
      exportExcelShow: Boolean,
      exportData: Object,
      exportUrl: String,
      showTotalFlag:{
          type: Boolean,
          default: true,
      },
      tips:String,
      resultTips: {
        type:String,
        default: '没有可导出的数据',
      },
  },
  data() {
    return {
      timer: '',
      Percentage: 0,
      exportIng: true,
      url:'',
      downxls: '',
      count:'',
      countFul: false,
      errMsg:'',
    };
  },
  computed: {},
  mounted() {},
  beforeDestroy() {},
  components: {
    
  },
  created() {
    this.timer = setInterval(this.get, 50);
    this.init();
  },
  methods: {
    get() {
      this.Percentage ++;
      // console.log( this.Percentage)
      if(this.Percentage===99){
        clearInterval(this.timer);
      }
    },
    init(){
      axios
        .request({
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.$ls.get(ACCESS_TOKEN)
          },
          url: process.env.VUE_APP_API_BASE_URL + this.exportUrl,
          data:this.exportData,
          method: 'post'
        })
        .then(response => {
          let res = response;
          //判断是否是真是环境
          if (process.env.NODE_ENV == 'development' || process.env.VUE_APP_API_BASE_URL == 'https://gw.dev.yumeng.work'){
            //开发环境
          }else{
            if (response.headers.encrypt == 1){
              res.data = JSON.parse(pako.inflate(Decrypt(response.data),{to:'string'}));
            }
          }
          if (res.data.code === '200') {
           this.Percentage = 100;
           clearInterval(this.timer);
            let _this = this;
            setTimeout(() =>{ 
              _this.exportIng = false;
              _this.name = res.data.data.expFileName;
              _this.url = res.data.data.expFileUrl;
              _this.downxls = res.data.data.expFileName;
              if(res.data.data.expDataCount!= null){
                _this.count = res.data.data.expDataCount;
                _this.countFul = true;
              }else{
                _this.countFul = false;
              }
            },500);
          }else {
            this.exportIng = false;
            this.Percentage = 100;
            clearInterval(this.timer);
            this.errMsg = res.data.msg;
          }
        })
      
    },
    close() {
     this.$emit('close', true);   
    },  
    exportFile(url, filename) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      this.$message.success('操作成功!');
      link.click();
      this.$emit('close', true);   
    }
    
  },
  watch: {

  }
};
</script>
<style lang='less'>
.exportExcelBox {
    width: 100%;
    height: 100%;
    .content {
      width:520px;
      height:250px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 10px 0px rgba(0,0,0,0.1);
      border-radius:5px;
      div{
        text-align: center;
      }
      .main-color{
        color:#0A87F8;
        height: 46px;
        line-height: 46px;
        display: -webkit-inline-box;
      }
      .exportIng-box{
        margin-left:40px;
        & /deep/ .ant-progress-outer{
          width: 450px;
        }
      }
      .tipsStyle{
        font-size: 12px;
        color: #FFA036;
        text-align: center;
      }
      .download-box{
        margin-left:62px;
        width:400px;
        height:46px;
        background:rgba(246,247,248,1);
        border-radius:4px;
        padding: 0 20px;
        .title-name{
          overflow:hidden;
          white-space:nowrap; 
          text-overflow:ellipsis; 
          display: -webkit-inline-box;
          line-height: 46px;
          float: left;
          font-size:14px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
          .curP{
              svg{
                  height: 16px;
                  width: 16px;
              }
          }
      }
    }

}
</style>
