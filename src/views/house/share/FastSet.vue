<template>
    <div class="fast-set u-bottom-border">
        <div class="bigTitleStyle">整套设置</div>
        <!-- 非强关联 -->
        <div v-if="!configRelationFlag" class="unConfigRelationStyle">
          <div>
            <a-checkbox v-model="houseConfigCheckAll" @change="checkAllHouseItem" :indeterminate="indeterminateHouse" ><span class="titleStyle">公区配置</span></a-checkbox>
          </div>
          <div class="selectStyle clearfix">
            <div class="f-fl clearfix item" v-for="(item,index) in showHouseConfig" :key="index">
              <a-checkbox class="f-fl overHidde" style="width: auto;" v-model="item.checked" @change="(value)=>checkHouseItem(value,index)"><span :class="item.checked?'selectedStyle':'unSelectStyle'">{{item.name}}</span></a-checkbox>
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
        <label-item title="公共图片">
          <house-video ref="uploadPublicPicList" :picList="fastSetDataConfig.publicPic" class="own-upload mg-top"></house-video>
        </label-item>
        <label-item title="子间设置" border  style="margin-top:8px" class="label-til">
            <label-item title="----  房间特色" class="item-label">
                <div class="checkAllStyle">
                    <a-checkbox @change="value => checkAllTag(value)" v-model="tagCheckAll"></a-checkbox>
                </div>
                <a-checkbox-group class="checkbox-group mg-top" v-model="fastSetDataConfig.tagConfig" @change="value => tagConfigChange(value)">
                    <a-checkbox :value="item.name" v-for="(item,i) in houseTagConfig" :key="i">{{item.name}}</a-checkbox>
                </a-checkbox-group>
            </label-item>
            <!-- 非强关联 -->
            <div v-if="!configRelationFlag" class="unConfigRelationStyle">
              <div>
                <a-checkbox v-model="roomConfigCheckAll" @change="checkAllRoomItem" :indeterminate="indeterminateRoom" ><span class="titleStyle">房间配置</span></a-checkbox>
              </div>
              <div class="selectStyle clearfix">
                <div class="f-fl clearfix item" v-for="(item,index) in showRoomConfig" :key="index">
                  <a-checkbox class="f-fl overHidde" style="width: auto;" v-model="item.checked" @change="(value)=>checkRoomItem(value,index)"><span :class="item.checked?'selectedStyle':'unSelectStyle'">{{item.name}}</span></a-checkbox>
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
            <label-item class="mg-bottom item-label" title="房源标题（广告语）" :valLength="fastSetDataConfig.title.length" :maxSize="30">
                <a-input class="" placeholder="请输入房源标题" maxlength="30" v-model="fastSetDataConfig.title" />
            </label-item>
            <label-item class="mg-bottom" title="房源描述" :valLength="fastSetDataConfig.desc.length" :maxSize="500">
                <a-textarea class="" autosize placeholder="请输入房源描述" maxlength="500" v-model="fastSetDataConfig.desc" />
            </label-item>
            <label-item title="房间图片">
                <house-video ref="uploadRoomPicList" :picList="fastSetDataConfig.roomPic" class="own-upload mg-top"></house-video>
            </label-item>
        </label-item>
    </div>
</template>

<script>
    import * as PublicAPI from '@/api/public'
    import HouseVideo from '@/components/OwnUpload/houseVideo';
    export default {
        name: "FastSet",
        components: {
          HouseVideo,
        },
        props: {
            fastSetData:{
                type: Object,
                default: {
                    publicConfig:[],
                    roomConfig:[],
                    tagConfig:[],
                    publicPic: [],
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
                fastSetDataConfig: this.fastSetData,
                houseTagConfig: [],
                uploadParms:{
                },
                tagCheckAll:false,
                houseConfigCheckAll:false,
                roomConfigCheckAll:false,
                showHouseConfig:[],
                showRoomConfig:[],
                indeterminateHouse:false,
                indeterminateRoom:false,
            }
        },
        created(){
            this.initData();
            // 获取字典
            this.getDictionaryList();
        },
        methods:{
            checkRoomItem(value,index){
              if(value.target.checked){
                if(this.showRoomConfig[index].quantity&&this.showRoomConfig[index].quantity>0){
                  this.showRoomConfig[index].quantity = this.showRoomConfig[index].quantity
                } else{
                  this.showRoomConfig[index].quantity = 1;
                }
              }
              let selectedConfig = [];
              this.showRoomConfig.forEach((item)=>{
                if(item.checked){
                  selectedConfig.push(item);
                }
              });
              this.indeterminateRoom = !!selectedConfig.length && selectedConfig.length < this.showRoomConfig.length;
              this.roomConfigCheckAll = selectedConfig.length === this.showRoomConfig.length;
            },
            checkAllRoomItem(value){
              this.indeterminateRoom = false;
              this.roomConfigCheckAll = value.target.checked;
              if(value.target.checked){
                this.showRoomConfig.forEach((item)=>{
                  if(!item.checked){
                    item.checked = true;
                    item.quantity = 1;
                  }
                });
              }
              else{
                this.showRoomConfig.forEach((item)=>{
                  item.checked = false;
                  item.quantity = 0;
                });
              }
            },
            checkHouseItem(value,index){
              if(value.target.checked){
                if(this.showHouseConfig[index].quantity&&this.showHouseConfig[index].quantity>0){
                  this.showHouseConfig[index].quantity = this.showHouseConfig[index].quantity
                } else{
                  this.showHouseConfig[index].quantity = 1;
                }
              }
              let selectedConfig = [];
              this.showHouseConfig.forEach((item)=>{
                if(item.checked){
                  selectedConfig.push(item);
                }
              });
              this.indeterminateHouse = !!selectedConfig.length && selectedConfig.length < this.showHouseConfig.length;
              this.houseConfigCheckAll = selectedConfig.length === this.showHouseConfig.length;
            },
            checkAllHouseItem(value){
              this.indeterminateHouse = false;
              this.houseConfigCheckAll = value.target.checked;
              if(value.target.checked){
                this.showHouseConfig.forEach((item)=>{
                  if(!item.checked){
                    item.checked = true;
                    item.quantity = 1;
                  }
                });
              }
              else{
                this.showHouseConfig.forEach((item)=>{
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
                this.showHouseConfig = [];
                this.showRoomConfig = [];
                this.housePublicConfig.forEach((item)=>{
                  let obj = Object.assign({},item);
                  this.fastSetDataConfig.publicConfig.forEach((temp)=>{
                    if(temp.id == item.id){
                      obj = Object.assign({},temp);
                    }
                  });
                  this.showHouseConfig.push(obj);
                });
                this.housePublicConfig.forEach((item)=>{
                  let obj = Object.assign({},item);
                  this.fastSetDataConfig.roomConfig.forEach((temp)=>{
                    if(temp.id == item.id){
                      obj = Object.assign({},temp);
                    }
                  });
                  this.showRoomConfig.push(obj);
                });
                this.indeterminateHouse = !!this.fastSetDataConfig.publicConfig.length && this.fastSetDataConfig.publicConfig.length < this.housePublicConfig.length;
                this.houseConfigCheckAll = this.fastSetDataConfig.publicConfig.length === this.housePublicConfig.length;
                this.indeterminateRoom = !!this.fastSetDataConfig.roomConfig.length && this.fastSetDataConfig.roomConfig.length < this.housePublicConfig.length;
                this.roomConfigCheckAll = this.fastSetDataConfig.roomConfig.length === this.housePublicConfig.length;
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
                if(this.fastSetDataConfig.tagConfig.length == this.houseTagConfig.length ){
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
        }
    }
</script>

<style scoped lang="less">
    .fast-set{
        padding: 0 20px 20px 20px;
        height: calc(100vh - 170px);
        overflow: auto;
        /deep/ .tips{
          line-height: 16px;
          font-weight: 100;
        }
        .bigTitleStyle{
          font-weight: 500;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.85);
          margin: 20px 0 8px 0;
        }
        .mg-top{
            margin-top: 10px;
        }
        .mg-bottom{
            margin-bottom: 20px;
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
            &/deep/ .tips{
                margin: 0;
            }
        }
        .item-label{
            &/deep/ .title{
                margin-top:0;
            }
            .checkAllStyle{
                position: absolute;
                left: 0px;
                top: 0px;
                font-size: 16px;
            }
        }
        .label-til{
            &/deep/ .title{
                .ft-bolder{
                    height: 43px;
                }
            }
        }
        .unConfigRelationStyle{
          .titleStyle{
              font-size: 12px;
              color: #777777;
          }
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
    }
</style>
