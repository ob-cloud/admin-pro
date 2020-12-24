<template>
    <div class="fast-set u-bottom-border">
        <label-item class="tag" title="----  房源特色">
            <div class="checkAllStyle">
                <a-checkbox @change="value => checkAllTag(value)" v-model="tagCheckAll"></a-checkbox>
            </div>
            <a-checkbox-group class="checkbox-group mg-top" v-model="fastSetDataConfig.tagConfig" @change="value => tagConfigChange(value)">
                <a-checkbox :value="item.name" v-for="(item,i) in houseTagConfig" :key="item.id">{{item.name}}</a-checkbox>
            </a-checkbox-group>
        </label-item>
        <!-- 非强关联 -->
        <div v-if="!configRelationFlag" class="unConfigRelationStyle">
          <div>
            <a-checkbox v-model="checkAll" @change="checkAllItem" :indeterminate="indeterminate" ><span class="titleStyle">物品配置</span></a-checkbox>
          </div>
          <div class="selectStyle clearfix">
            <div class="f-fl clearfix item" v-for="(item,index) in showPublicConfig" :key="index">
              <a-checkbox class="f-fl overHidde" style="width: auto;" v-model="item.checked" @change="(value)=>checkItem(value,index)"><span :class="item.checked?'selectedStyle':'unSelectStyle'">{{item.name}}</span></a-checkbox>
              <div v-if="item.checked" class="f-fl" style="height: 40px;line-height: 40px;margin-right: 10px;font-weight: 100;">
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
        </div>
        <label-item class="mg-bottom" title="房源标题（广告语）" :valLength="fastSetDataConfig.title.length" :maxSize="30">
            <a-input class="mg-top-2" placeholder="请输入房源标题" v-model="fastSetDataConfig.title" />
        </label-item>
        <label-item class="mg-bottom" title="房源描述" :valLength="fastSetDataConfig.desc.length" :maxSize="500">
            <a-textarea class="mg-top-2" autosize placeholder="请输入房源描述" maxlength="500" v-model="fastSetDataConfig.desc" />
        </label-item>
        <label-item title="房源图片">
            <house-video ref="uploadRoomPicList" :picList="fastSetDataConfig.roomPic" class="own-upload mg-top"></house-video>
        </label-item>
    </div>
</template>

<script>
    import * as PublicAPI from '@/api/public';
    import HouseVideo from '@/components/OwnUpload/houseVideo';
    export default {
      name: "WholeHouseFastSet",
      components: {
        HouseVideo,
      },
        props: {
            fastSetData:{
                type: Object,
                default: {
                    roomConfig:[],
                    tagConfig:[],
                    title: '',
                    desc: '',
                    roomPic: [],
                },
            },
            configRelationFlag:{
              type:Boolean,
            },
            housePublicConfig:{
                type:Array,
            }
        },
        data(){
            return {
                fastSetDataConfig: {},
                houseTagConfig: [],
                tagCheckAll:false,
                showPublicConfig:[],
                checkAll:false,
                indeterminate:false,
            }
        },
        created(){
            // 获取字典
            this.getDictionaryList();
            this.fastSetDataConfig = this.fastSetData;
            this.initData();
        },
        methods:{
            checkItem(value,index){
              if(value.target.checked){
                if(this.showPublicConfig[index].quantity&&this.showPublicConfig[index].quantity>0){
                  this.showPublicConfig[index].quantity = this.showPublicConfig[index].quantity
                } else{
                  this.showPublicConfig[index].quantity = 1;
                }
              }
              let selectedConfig = [];
              this.showPublicConfig.forEach((item)=>{
                if(item.checked){
                  selectedConfig.push(item);
                }
              });
              this.indeterminate = !!selectedConfig.length && selectedConfig.length < this.showPublicConfig.length;
              this.checkAll = selectedConfig.length === this.showPublicConfig.length;
              this.$forceUpdate();
            },
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
            //初始化配置
            initData(){
              if(!this.configRelationFlag){
                this.showPublicConfig = [];
                this.housePublicConfig.forEach((item)=>{
                  let obj = Object.assign({},item);
                  this.fastSetDataConfig.roomConfig.forEach((temp)=>{
                    if(temp.id == item.id){
                      obj = Object.assign({},temp);
                    }
                  });
                  this.showPublicConfig.push(obj);
                });
                this.indeterminate = !!this.fastSetDataConfig.roomConfig.length && this.fastSetDataConfig.roomConfig.length < this.housePublicConfig.length;
                this.checkAll = this.fastSetDataConfig.roomConfig.length === this.housePublicConfig.length;
              }
            },
            // 获取字典
            getDictionaryList(){
                // 特色
                PublicAPI.getTagDictionary().then(res=>{
                    // console.log(res)
                    if (res.code == 200){
                        this.houseTagConfig = res.data;
                    }
                })
            },
            tagConfigChange(checkedValues){
                this.fastSetDataConfig.tagConfig = checkedValues;
                if(this.fastSetDataConfig.tagConfig.length == this.houseTagConfig.length){
                    this.tagCheckAll = true;
                }
                else{
                    this.tagCheckAll = false;
                }
            },
            checkAllTag(e){
                if(e.target.checked){
                    this.fastSetDataConfig.tagConfig = [];
                    this.houseTagConfig.forEach((item)=>{
                        this.fastSetDataConfig.tagConfig.push(item.name);
                    })
                }else{
                    this.fastSetDataConfig.tagConfig = [];
                }
            },
        },
        filters: {
          blankVal(val) {
            if (!val) {
              return '-';
            } else {
              return val;
            }
          },
          ownerTypeVal(val){
            if (!val) {
              return '-';
            } else if(val==1) {
              return '公司';
            } else if(val==2) {
              return '业主';
            }
          },
        }
    }
</script>

<style scoped lang="less">
    .fast-set{
        padding: 8px 20px 20px 20px;
        height: calc(100vh - 170px);
        overflow: auto;
        /deep/ .tips{
          line-height: 16px;
          font-weight: 100;
        }
        .mg-top{
            margin-top: 10px;
        }
        .mg-top-2{
          margin-top: 2px;
        }
        .mg-bottom{
            margin-bottom: 20px;
            .checkAllStyle{
                position: absolute;
                left: 0px;
                top: 0px;
                font-size: 16px;
            }
        }
        .titleStyle{
          font-size: 12px;
          color: #777777;
        }
        .unConfigRelationStyle{
          margin-top: 8px;
          .selectStyle{
            .item{
              width: 191px;
              height: 40px;
              line-height: 40px;
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
              height: 40px;
              .commonStyle{
                width: 16px;
                height: 16px;
                line-height: 14px;
                background: #F6F7FB;
                border: 1px solid #EEEEEE;
                text-align: center;
                border-radius: 50%;
                margin-top: 13px;
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
        }
        .tag{
            .checkAllStyle{
                position: absolute;
                left: 0px;
                top: 0px;
                font-size: 16px;
            }
        }
        .checkbox-group{
            width: 100%;
            & > label{
                /*flex: 1;*/
                width: 20%;
                margin: 0 0 18px 0;

            }
        }
        .own-upload{
        }
    }
</style>
