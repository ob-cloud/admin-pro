<template>
  <div class="deliveryInfo-box">
    <div>
      <div style="padding-bottom: 20px;border-bottom: 10px solid #F6F7F8;">
        <div class="title" style="margin-bottom: 13px;">物品交割</div>
        <div v-if="(!roomDeliveryNoteList||roomDeliveryNoteList.length==0)&&(!pubDeliveryNoteList||pubDeliveryNoteList.length==0)">
          未设置初始物品配置，请前往房间设置配置信息或初始配置中心设置默认交割物品
        </div>
        <div v-if="roomDeliveryNoteList&&roomDeliveryNoteList.length>0" class="goodList-detail-item">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">房间</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item f-fl clearfix" v-for="(item,index) in roomDeliveryNoteList" :key="index">
              <div class="item1 item-item-style overHidde f-fl">{{item.name}}</div>
              <div class="item2 item-item-style f-fl clearfix" :class="item.value==0&&(item.comment||(item.fileDTOList&&item.fileDTOList.length>0))?'mustFillStyle':''">
                <div class="f-fl item2_plus cursor" @click="plusCount(item)">-</div>
                <div class="f-fl item2_input">
                  <a-input v-model="item.value" v-validate="'naturalNum|min(0)|max(100)'"></a-input>
                </div>
                <div class="f-fr item2_add cursor" @click="addCount(item)">+</div>
              </div>
              <a-popover>
                <template slot="content">
                  <div style="font-size: 14px;color: #111111;font-weight: 600;margin-bottom: 5px;">备注</div>
                  <div style="font-size: 14px;color: #111111;">{{item.comment?item.comment:'-'}}</div>
                  <div style="font-size: 14px;color: #111111;font-weight: 600;margin: 18px 0 10px 0;">照片凭证</div>
                  <div v-if="item.fileDTOList&&item.fileDTOList.length>0" class="room-img-list clearfix">
                    <div class="f-fl" v-for="(item,i) in item.fileDTOList" :key="i" style="margin-bottom: 10px;" :style="i%3==2?'margin-right:0;':''">
                      <div><img :src="item.origin" alt=""></div>
                    </div>
                  </div>
                  <div v-else>-</div>
                </template>
                <div class="item3 item-item-style f-fl cursor" @click.stop="commentPic(index,item,3)" :class="typeIndex ==3 && itemIndex == index?'clickStyle':''">
                  <icon-font :class="item.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconyumengtubiao_bianji-1"/>
                  <icon-font :class="item.fileDTOList&&item.fileDTOList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
                </div>
              </a-popover>
            </div>
          </div>
        </div>
        <div v-if="pubDeliveryNoteList&&pubDeliveryNoteList.length>0" class="goodList-detail-item" style="margin-top: 15px;">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">公区</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item f-fl clearfix" v-for="(item,index) in pubDeliveryNoteList" :key="index">
              <div class="item1 item-item-style overHidde f-fl">{{item.name}}</div>
              <div class="item2 item-item-style clearfix f-fl" v-if="item.brand!=0&&item.isCleared&&item.isCleared==1&&!deliveryResetFlag" style="padding-left: 15px;color: #777777;font-size: 14px;">
                {{item.name=='电表'?'智能电表：表数自动清零':'-'}}
              </div>
              <div class="item2 item-item-style f-fl clearfix" v-else :class="item.value==0&&(item.comment||(item.fileDTOList&&item.fileDTOList.length>0))?'mustFillStyle':''">
                <div class="f-fl item2_plus cursor" @click="plusCount(item)">-</div>
                <div class="f-fl item2_input">
                  <a-input v-model="item.value" v-validate="'naturalNum|min(0)|max(100)'"></a-input>
                </div>
                <div class="f-fr item2_add cursor" @click="addCount(item)">+</div>
              </div>
              <a-popover>
                <template slot="content">
                  <div style="font-size: 14px;color: #111111;font-weight: 600;margin-bottom: 5px;">备注</div>
                  <div style="font-size: 14px;color: #111111;">{{item.comment?item.comment:'-'}}</div>
                  <div style="font-size: 14px;color: #111111;font-weight: 600;margin: 18px 0 10px 0;">照片凭证</div>
                  <div v-if="item.fileDTOList&&item.fileDTOList.length>0" class="room-img-list clearfix">
                    <div class="f-fl" v-for="(item,i) in item.fileDTOList" :key="i" style="margin-bottom: 10px;" :style="i%3==2?'margin-right:0;':''">
                      <div><img :src="item.origin" alt=""></div>
                    </div>
                  </div>
                  <div v-else>-</div>
                </template>
                <div class="item3 item-item-style f-fl cursor" @click.stop="commentPic(index,item,2)" :class="typeIndex == 2 && itemIndex == index?'clickStyle':''">
                  <icon-font :class="item.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconyumengtubiao_bianji-1"/>
                  <icon-font :class="item.fileDTOList&&item.fileDTOList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
                </div>
              </a-popover>
            </div>
          </div>
        </div>
        <div class="title" style="margin: 25px 0 13px 0;">水电燃读数</div>
        <div v-if="(!roomHydropwerList||roomHydropwerList.length==0)&&(!pubHydropwerList||pubHydropwerList.length==0)">
          -
        </div>
        <div v-if="roomHydropwerList&&roomHydropwerList.length>0" class="goodList-detail-item">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">房间</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item_other f-fl clearfix" v-for="(item,index) in roomHydropwerList" :key="index">
              <div class="item1 item-item-style overHidde f-fl">{{item.name}}</div>
              <div class="item2 item-item-style clearfix f-fl" v-if="item.brand!=0&&item.isCleared&&item.isCleared==1&&!deliveryResetFlag" style="padding-left: 15px;color: #777777;font-size: 14px;">
                {{item.name=='电表'?'智能电表：表数自动清零':'-'}}
              </div>
              <div class="item2 item-item-style clearfix f-fl" v-else :class="!item.value&&(item.comment||(item.fileDTOList&&item.fileDTOList.length>0))?'mustFillStyle':''">
                <div class="item2-select f-fl">
                  <a-select v-model="item.valueType" :disabled="item.allowModify==0">
                    <a-select-option :value="1">余数</a-select-option>
                    <a-select-option :value="2">底数</a-select-option>
                    <a-select-option :value="3">金额</a-select-option>
                  </a-select>
                </div>
                <div class="item2-split f-fl">
                </div>
                <div class="item2-input f-fl">
                  <a-input v-model="item.value" placeholder="请输入读数" v-validate="'area'"></a-input>
                </div>
                <div class="item2-font f-fl" v-if="item.valueType==1||item.valueType==2">
                  {{item.name=='电表'?'度':item.name=='燃气表'?'m³':item.name=='水表'?'吨':item.name=='热水表'?'吨':''}}
                </div>
                <div class="item2-font f-fl" v-if="item.valueType==3">
                  元
                </div>
              </div>
              <a-popover>
                <template slot="content">
                  <div style="font-size: 14px;color: #111111;font-weight: 600;margin-bottom: 5px;">备注</div>
                  <div style="font-size: 14px;color: #111111;">{{item.comment?item.comment:'-'}}</div>
                  <div style="font-size: 14px;color: #111111;font-weight: 600;margin: 18px 0 10px 0;">照片凭证</div>
                  <div v-if="item.fileDTOList&&item.fileDTOList.length>0" class="room-img-list clearfix">
                    <div class="f-fl" v-for="(item,i) in item.fileDTOList" :key="i" style="margin-bottom: 10px;" :style="i%3==2?'margin-right:0;':''">
                      <div><img :src="item.origin" alt=""></div>
                    </div>
                  </div>
                  <div v-else>-</div>
                </template>
                <div class="item3 item-item-style f-fl cursor" @click.stop="commentPic(index,item,4)" :class="typeIndex ==3 && itemIndex == index?'clickStyle':''">
                  <icon-font :class="item.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconyumengtubiao_bianji-1"/>
                  <icon-font :class="item.fileDTOList&&item.fileDTOList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
                </div>
              </a-popover>
            </div>
          </div>
        </div>
        <div v-if="pubHydropwerList&&pubHydropwerList.length>0" class="goodList-detail-item" style="margin-top: 15px;">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">公区</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item_other f-fl clearfix" v-for="(item,index) in pubHydropwerList" :key="index">
              <div class="item1 item-item-style overHidde f-fl">{{item.name}}</div>
              <div class="item2 item-item-style clearfix f-fl" v-if="item.brand!=0&&item.isCleared&&item.isCleared==1&&!deliveryResetFlag" style="padding-left: 15px;color: #777777;font-size: 14px;">
                {{item.name=='电表'?'智能电表：表数自动清零':'-'}}
              </div>
              <div class="item2 item-item-style clearfix f-fl" v-else :class="!item.value&&(item.comment||(item.fileDTOList&&item.fileDTOList.length>0))?'mustFillStyle':''">
                <div class="item2-select f-fl">
                  <a-select v-model="item.valueType" :disabled="item.allowModify==0">
                    <a-select-option :value="1">余数</a-select-option>
                    <a-select-option :value="2">底数</a-select-option>
                    <a-select-option :value="3">金额</a-select-option>
                  </a-select>
                </div>
                <div class="item2-split f-fl">
                </div>
                <div class="item2-input f-fl">
                  <a-input v-model="item.value" placeholder="请输入读数" v-validate="'area'"></a-input>
                </div>
                <div class="item2-font f-fl" v-if="item.valueType==1||item.valueType==2">
                  {{item.name=='电表'?'度':item.name=='燃气表'?'m³':item.name=='水表'?'吨':item.name=='热水表'?'吨':''}}
                </div>
                <div class="item2-font f-fl" v-if="item.valueType==3">
                  元
                </div>
              </div>
              <a-popover>
                <template slot="content">
                  <div style="font-size: 14px;color: #111111;font-weight: 600;margin-bottom: 5px;">备注</div>
                  <div style="font-size: 14px;color: #111111;">{{item.comment?item.comment:'-'}}</div>
                  <div style="font-size: 14px;color: #111111;font-weight: 600;margin: 18px 0 10px 0;">照片凭证</div>
                  <div v-if="item.fileDTOList&&item.fileDTOList.length>0" class="room-img-list clearfix">
                    <div class="f-fl" v-for="(item,i) in item.fileDTOList" :key="i" style="margin-bottom: 10px;" :style="i%3==2?'margin-right:0;':''">
                      <div><img :src="item.origin" alt=""></div>
                    </div>
                  </div>
                  <div v-else>-</div>
                </template>
                <div class="item3 item-item-style f-fl cursor" @click.stop="commentPic(index,item,5)" :class="typeIndex ==5 && itemIndex == index?'clickStyle':''">
                  <icon-font :class="item.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconyumengtubiao_bianji-1"/>
                  <icon-font :class="item.fileDTOList&&item.fileDTOList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
                </div>
              </a-popover>
            </div>
          </div>
        </div>
      </div>
      <div class="otherInfoStyle">
        <div class="item item1">
          <LabelItem title="其它备注" class="u-bottom-border" :maxSize="100" :valLength="comment.length">
            <a-textarea v-model="comment" autosize maxlength="100" placeholder="填写后租客可见"></a-textarea>
          </LabelItem>
        </div>
        <div class="item item2" style="margin-top: 25px;position: relative;" >
          <label-item title="其它凭证">
            <own-upload style="padding-right: 10px"  :picList="otherPicList" :uploadParms="sendData" :maxLength="20" :showTips="false" ref="otherPicList">
            </own-upload>
          </label-item>
          <div style="position: absolute;top:2px;left: 70px;color: #777777;font-size: 13px;">
            （支持格式：jpg、png、jpeg；最多20张）
          </div>
        </div>
        <div class="clearfix" style="width: 100%;padding:40px 0px 0px 0;">
          <div class="buttonDiv f-fr">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelAdd">
              取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="addDeliveryInfo">
              保存
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 备注图片 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="commentPicDialog" class="ownModalBorder titDialog" :title="commentPicTitle">
      <comment-pic @cancelAdd="cancelAddCommnet" :typeIndex="typeIndex" :scenePic="scenePic" :itemIndex="itemIndex" :commentPicItem="commentPicItem" @addCommentPic="addCommentPic"></comment-pic>
    </a-modal>
  </div>
</template>

<script>
import {getHouseDelivery} from '@/api/contract.js';
import CommentPic from './commentPic';
export default {
  name: "deliveryInfo",
  components: {
    CommentPic,
  },
  props: {
    deliveryConfig:{
      type:Object,
    },
    deliveryHouseType:{
      type:Number,
    },
    propertyDeliveryAddForm:{
      type:Object,
    },
    houseId:{
      type:String,
    },
    deliveryResetFlag:{
      type:Boolean,
      default:false,
    },
  },
  data() {
    return {
      pubDeliveryNoteList:[],
      pubHydropwerList:[],
      roomDeliveryNoteList:[],
      roomHydropwerList:[],
      typeIndex:-1,       //2、合租（公区） 3、房间 4、房间水然  5、公区水然
      itemIndex:-1,       //具体某个
      commentPicDialog:false,
      commentPicTitle:'',
      commentPicItem:{},
      scenePic:0,
      initHydropwerData:[
        {comment:'',fileIds:[],valueType:1,value:'',name:'电表',sort:0,allowModify:1},
        {comment:'',fileIds:[],valueType:1,value:'',name:'水表',sort:1,allowModify:1},
        {comment:'',fileIds:[],valueType:1,value:'',name:'热水表',sort:2,allowModify:1},
        {comment:'',fileIds:[],valueType:1,value:'',name:'燃气表',sort:3,allowModify:1},
      ],
      comment:'',       //其他备注
      otherPicList:[],
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
    this.initData();
  },
  computed: {
  },
  methods: {
    initData(){
      //来自添加合同\续签
      if(this.deliveryConfig){
        //自定义配置
        this.scenePic = this.deliveryConfig.scenePic;
        if(this.deliveryConfig.goodDefault == 1||this.deliveryResetFlag){
          if(this.deliveryHouseType==2){
            if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.roomDeliveryNoteList && this.propertyDeliveryAddForm.roomDeliveryNoteList.length > 0){
              this.roomDeliveryNoteList = this.propertyDeliveryAddForm.roomDeliveryNoteList;
              this.roomDeliveryNoteList.forEach((item)=>{
                if(item.value){
                  item.value = parseInt(item.value);
                }
                if(item.fileDTOList && item.fileDTOList.length>0){
                   let fileIds = [];
                  item.fileDTOList.forEach((temp)=>{
                    fileIds.push(temp.id);
                  })
                  item.fileIds = fileIds;
                }
              });
            }
            else{
              let roomDeliveryNoteList = this.deliveryConfig.roomList[0].names;
              let temp = [];
              roomDeliveryNoteList.forEach((item)=>{
                if(item.selected){
                  temp.push(item);
                }
              });
              temp.forEach((item,index)=>{
                item.sort = index;
              });
              this.roomDeliveryNoteList = temp;
            }
            if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.pubDeliveryNoteList && this.propertyDeliveryAddForm.pubDeliveryNoteList.length > 0){
              this.pubDeliveryNoteList = this.propertyDeliveryAddForm.pubDeliveryNoteList;
              this.pubDeliveryNoteList.forEach((item)=>{
                if(item.value){
                  item.value = parseInt(item.value);
                }
                if(item.fileDTOList && item.fileDTOList.length>0){
                  let fileIds = [];
                  item.fileDTOList.forEach((temp)=>{
                    fileIds.push(temp.id);
                  })
                  item.fileIds = fileIds;
                }
              });
            }
            else{
              let pubDeliveryNoteList = this.deliveryConfig.roomList[1].names;
              let temp = [];
              pubDeliveryNoteList.forEach((item)=>{
                if(item.selected){
                  temp.push(item);
                }
              });
              temp.forEach((item,index)=>{
                item.sort = index;
              });
              this.pubDeliveryNoteList = temp;
            }
            if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.roomHydropwerList && this.propertyDeliveryAddForm.roomHydropwerList.length > 0){
              this.roomHydropwerList = this.propertyDeliveryAddForm.roomHydropwerList;
              this.roomHydropwerList.forEach((item)=>{
                if(item.value){
                  item.value = parseFloat(item.value);
                }
                if(item.fileDTOList && item.fileDTOList.length>0){
                  let fileIds = [];
                  item.fileDTOList.forEach((temp)=>{
                    fileIds.push(temp.id);
                  })
                  item.fileIds = fileIds;
                }
              });
            }
            else{
              if(this.houseId){
                this.getHouseHydropwerList();
              }
              else{
                this.initHydropwerData.forEach((item)=>{
                  let obj = Object.assign({},item);
                  this.roomHydropwerList.push(obj);
                });
              }
            }
            if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.pubHydropwerList && this.propertyDeliveryAddForm.pubHydropwerList.length > 0){
              this.pubHydropwerList = this.propertyDeliveryAddForm.pubHydropwerList;
              this.pubHydropwerList.forEach((item)=>{
                if(item.value){
                  item.value = parseFloat(item.value);
                }
                if(item.fileDTOList && item.fileDTOList.length>0){
                  let fileIds = [];
                  item.fileDTOList.forEach((temp)=>{
                    fileIds.push(temp.id);
                  })
                  item.fileIds = fileIds;
                }
              });
            }
            else{
              if(!this.houseId){
                //存在houseId前面已经赋值过了
                this.initHydropwerData.forEach((item)=>{
                  let obj = Object.assign({},item);
                  this.pubHydropwerList.push(obj);
                });
              }
            }
          }
          else{
            if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.roomDeliveryNoteList && this.propertyDeliveryAddForm.roomDeliveryNoteList.length > 0){
              this.roomDeliveryNoteList = this.propertyDeliveryAddForm.roomDeliveryNoteList;
              this.roomDeliveryNoteList.forEach((item)=>{
                if(item.value){
                  item.value = parseInt(item.value);
                }
                if(item.fileDTOList && item.fileDTOList.length>0){
                  let fileIds = [];
                  item.fileDTOList.forEach((temp)=>{
                    fileIds.push(temp.id);
                  })
                  item.fileIds = fileIds;
                }
              });
            }
            else{
              let roomDeliveryNoteList = this.deliveryConfig.roomList[2].names;
              let temp = [];
              roomDeliveryNoteList.forEach((item)=>{
                if(item.selected){
                  temp.push(item);
                }
              });
              temp.forEach((item,index)=>{
                item.sort = index;
              });
              this.roomDeliveryNoteList = temp;
            }
            if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.roomHydropwerList && this.propertyDeliveryAddForm.roomHydropwerList.length > 0){
              this.roomHydropwerList = this.propertyDeliveryAddForm.roomHydropwerList;
              this.roomHydropwerList.forEach((item)=>{
                if(item.value){
                  item.value = parseFloat(item.value);
                }
                if(item.fileDTOList && item.fileDTOList.length>0){
                  let fileIds = [];
                  item.fileDTOList.forEach((temp)=>{
                    fileIds.push(temp.id);
                  })
                  item.fileIds = fileIds;
                }
              });
            }
            else{
              if(this.houseId){
                this.getHouseHydropwerList();
              }
              else{
                this.initHydropwerData.forEach((item)=>{
                  let obj = Object.assign({},item);
                  this.roomHydropwerList.push(obj);
                });
              }
            }
          }
        }
        else if(this.deliveryConfig.goodDefault==0){
          if(this.propertyDeliveryAddForm){
            if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.roomDeliveryNoteList && this.propertyDeliveryAddForm.roomDeliveryNoteList.length > 0){
              this.roomDeliveryNoteList = this.propertyDeliveryAddForm.roomDeliveryNoteList;
              this.roomDeliveryNoteList.forEach((item)=>{
                if(item.value){
                  item.value = parseInt(item.value);
                }
                if(item.fileDTOList && item.fileDTOList.length>0){
                  let fileIds = [];
                  item.fileDTOList.forEach((temp)=>{
                    fileIds.push(temp.id);
                  })
                  item.fileIds = fileIds;
                }
              });
            }
            if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.pubDeliveryNoteList && this.propertyDeliveryAddForm.pubDeliveryNoteList.length > 0){
              this.pubDeliveryNoteList = this.propertyDeliveryAddForm.pubDeliveryNoteList;
              this.pubDeliveryNoteList.forEach((item)=>{
                if(item.value){
                  item.value = parseInt(item.value);
                }
                if(item.fileDTOList && item.fileDTOList.length>0){
                  let fileIds = [];
                  item.fileDTOList.forEach((temp)=>{
                    fileIds.push(temp.id);
                  })
                  item.fileIds = fileIds;
                }
              });
            }
            if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.roomHydropwerList && this.propertyDeliveryAddForm.roomHydropwerList.length > 0){
              this.roomHydropwerList = this.propertyDeliveryAddForm.roomHydropwerList;
              this.roomHydropwerList.forEach((item)=>{
                if(item.value){
                  item.value = parseFloat(item.value);
                }
                if(item.fileDTOList && item.fileDTOList.length>0){
                  let fileIds = [];
                  item.fileDTOList.forEach((temp)=>{
                    fileIds.push(temp.id);
                  })
                  item.fileIds = fileIds;
                }
              });
            }
            if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.pubHydropwerList && this.propertyDeliveryAddForm.pubHydropwerList.length > 0){
              this.pubHydropwerList = this.propertyDeliveryAddForm.pubHydropwerList;
              this.pubHydropwerList.forEach((item)=>{
                if(item.value){
                  item.value = parseFloat(item.value);
                }
                if(item.fileDTOList && item.fileDTOList.length>0){
                  let fileIds = [];
                  item.fileDTOList.forEach((temp)=>{
                    fileIds.push(temp.id);
                  })
                  item.fileIds = fileIds;
                }
              });
            }
          }
          else{
            //默认配置
            if(this.houseId){
              this.getHouseDelivery();
            }
            else{
              this.initHydropwerData.forEach((item)=>{
                let obj = Object.assign({},item);
                this.pubHydropwerList.push(obj);
              });
            }
          }

        }
        if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.comment){
          this.comment = this.propertyDeliveryAddForm.comment;
        }
        if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.fileDTOList&&this.propertyDeliveryAddForm.fileDTOList.length>0){
          this.otherPicList = [];
          this.propertyDeliveryAddForm.fileDTOList.forEach((item)=>{
            item.notRealDelete = true;
            item.status = 'done';
            this.otherPicList.push(item);
          })
        }
      }
      else{
        //来自退租
        if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.roomDeliveryNoteList && this.propertyDeliveryAddForm.roomDeliveryNoteList.length > 0){
          this.roomDeliveryNoteList = this.propertyDeliveryAddForm.roomDeliveryNoteList;
          this.roomDeliveryNoteList.forEach((item)=>{
            if(item.value){
              item.value = parseInt(item.value);
            }
            if(item.fileDTOList && item.fileDTOList.length>0){
              let fileIds = [];
              item.fileDTOList.forEach((temp)=>{
                fileIds.push(temp.id);
              })
              item.fileIds = fileIds;
            }
          });
        }
        if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.pubDeliveryNoteList && this.propertyDeliveryAddForm.pubDeliveryNoteList.length > 0){
          this.pubDeliveryNoteList = this.propertyDeliveryAddForm.pubDeliveryNoteList;
          this.pubDeliveryNoteList.forEach((item)=>{
            if(item.value){
              item.value = parseInt(item.value);
            }
            if(item.fileDTOList && item.fileDTOList.length>0){
              let fileIds = [];
              item.fileDTOList.forEach((temp)=>{
                fileIds.push(temp.id);
              })
              item.fileIds = fileIds;
            }
          });
        }
        if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.roomHydropwerList && this.propertyDeliveryAddForm.roomHydropwerList.length > 0){
          this.roomHydropwerList = this.propertyDeliveryAddForm.roomHydropwerList;
          this.roomHydropwerList.forEach((item)=>{
            if(item.value){
              item.value = parseFloat(item.value);
            }
            if(item.fileDTOList && item.fileDTOList.length>0){
              let fileIds = [];
              item.fileDTOList.forEach((temp)=>{
                fileIds.push(temp.id);
              })
              item.fileIds = fileIds;
            }
          });
        }
        if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.pubHydropwerList && this.propertyDeliveryAddForm.pubHydropwerList.length > 0){
          this.pubHydropwerList = this.propertyDeliveryAddForm.pubHydropwerList;
          this.pubHydropwerList.forEach((item)=>{
            if(item.value){
              item.value = parseFloat(item.value);
            }
            if(item.fileDTOList && item.fileDTOList.length>0){
              let fileIds = [];
              item.fileDTOList.forEach((temp)=>{
                fileIds.push(temp.id);
              })
              item.fileIds = fileIds;
            }
          });
        }
        if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.comment){
          this.comment = this.propertyDeliveryAddForm.comment;
        }
        if(this.propertyDeliveryAddForm&&this.propertyDeliveryAddForm.fileDTOList&&this.propertyDeliveryAddForm.fileDTOList.length>0){
          this.otherPicList = [];
          this.propertyDeliveryAddForm.fileDTOList.forEach((item)=>{
            item.notRealDelete = true;
            item.status = 'done';
            this.otherPicList.push(item);
          })
        }
      }
    },
    getHouseHydropwerList(){
      getHouseDelivery(this.houseId).then(res => {
        if (res.code === '200') {
          let data = res.data;
          this.roomHydropwerList = data.roomHydropwerList;
          this.pubHydropwerList = data.pubHydropwerList;
          this.$forceUpdate();
        }
      });
    },
    getHouseDelivery(){
      getHouseDelivery(this.houseId).then(res => {
        if (res.code === '200') {
          let data = res.data;
          this.roomDeliveryNoteList = data.roomDeliveryNoteList;
          this.pubDeliveryNoteList = data.pubDeliveryNoteList;
          this.roomHydropwerList = data.roomHydropwerList;
          this.pubHydropwerList = data.pubHydropwerList;
          if(this.pubDeliveryNoteList){
            this.pubDeliveryNoteList.forEach((item,index)=>{
              this.$set(item, 'comment','' );
              this.$set(item, 'fileIds',[] );
              this.$set(item, 'valueType',4 );
              //开启清空决策+新签->清零
              if(item.isCleared&&item.isCleared==1&&!this.deliveryResetFlag){
                this.$set(item, 'value',0 );
              }
              else{
                if(item.value){
                  this.$set(item, 'value',parseFloat(item.value) );
                }
                else{
                  this.$set(item, 'value',0 );
                }
              }

              this.$set(item, 'sort',index );
            })
          }
          if(this.roomDeliveryNoteList){
            this.roomDeliveryNoteList.forEach((item,index)=>{
              this.$set(item, 'comment','' );
              this.$set(item, 'fileIds',[] );
              this.$set(item, 'valueType',4 );
              //开启清空决策+新签->清零
              if(item.isCleared&&item.isCleared==1&&!this.deliveryResetFlag){
                this.$set(item, 'value',0 );
              }
              else{
                if(item.value){
                  this.$set(item, 'value',parseFloat(item.value) );
                }
                else{
                  this.$set(item, 'value',0 );
                }
              }
              this.$set(item, 'sort',index );
            })
          }
          this.$forceUpdate();
        }
      });
    },
    addDeliveryInfo(){
      let fileDTOList = [...this.$refs.otherPicList.picsList];
      //判断信息是否填写
      //是否什么都没填
      let noThingFlag = true;
      //数据是否完整
      let dataCompelte = false;
      if(this.comment) {
        noThingFlag = false;
      }
      if(fileDTOList&&fileDTOList.length>0) {
        noThingFlag = false;
      }
      if(this.pubDeliveryNoteList){
        this.pubDeliveryNoteList.forEach((item)=>{
          if((item.comment||(item.fileDTOList&&item.fileDTOList.length>0))&&item.value==0){
            dataCompelte = true;
          }
          if(item.value > 0) {
            noThingFlag = false;
          }
        });
      }
      if(this.roomDeliveryNoteList){
        this.roomDeliveryNoteList.forEach((item)=>{
          if((item.comment||(item.fileDTOList&&item.fileDTOList.length>0))&&item.value==0) {
            dataCompelte = true;
          }
          if(item.value > 0) {
            noThingFlag = false;
          }
        });
      }
      if(this.pubHydropwerList){
        this.pubHydropwerList.forEach((item)=>{
          if((item.comment||(item.fileDTOList&&item.fileDTOList.length>0))&&!item.value) {
            dataCompelte = true;
          }
          if(item.value > 0) {
            noThingFlag = false;
          }
        });
      }
      if(this.roomHydropwerList){
        this.roomHydropwerList.forEach((item)=>{
          if((item.comment||(item.fileDTOList&&item.fileDTOList.length>0))&&!item.value) {
            dataCompelte = true;
          }
          if(item.value > 0) {
            noThingFlag = false;
          }
        });
      }
      if(dataCompelte){
        this.$message.warning('请检查必填项');
        return ;
      }
      let propertyDeliveryAddForm = undefined
      if(noThingFlag){
        propertyDeliveryAddForm = undefined;
      }
      else{
        propertyDeliveryAddForm = {
          comment:this.comment,
          fileDTOList :fileDTOList,
          pubDeliveryNoteList:this.pubDeliveryNoteList,
          pubHydropwerList:this.pubHydropwerList,
          roomDeliveryNoteList:this.roomDeliveryNoteList,
          roomHydropwerList:this.roomHydropwerList,
        };
      }

      this.$emit('addDeliveryInfo',propertyDeliveryAddForm)
    },
    cancelAdd(){
      this.$emit('cancelAdd');
    },
    addCommentPic(comment,picList){
      this.commentPicDialog = false;
      if(this.typeIndex == 3){
        this.roomDeliveryNoteList[this.itemIndex].comment = comment;
        this.roomDeliveryNoteList[this.itemIndex].fileDTOList = picList;
        if(this.roomDeliveryNoteList[this.itemIndex].fileDTOList&&this.roomDeliveryNoteList[this.itemIndex].fileDTOList.length>0){
          let fileIds = [];
          this.roomDeliveryNoteList[this.itemIndex].fileDTOList.forEach((item)=>{
            fileIds.push(item.id)
          });
          this.roomDeliveryNoteList[this.itemIndex].fileIds = fileIds;
        }
      }
      else if(this.typeIndex == 2){
        this.pubDeliveryNoteList[this.itemIndex].comment = comment;
        this.pubDeliveryNoteList[this.itemIndex].fileDTOList = picList;
        if(this.pubDeliveryNoteList[this.itemIndex].fileDTOList&&this.pubDeliveryNoteList[this.itemIndex].fileDTOList.length>0){
          let fileIds = [];
          this.pubDeliveryNoteList[this.itemIndex].fileDTOList.forEach((item)=>{
            fileIds.push(item.id)
          });
          this.pubDeliveryNoteList[this.itemIndex].fileIds = fileIds;
        }
      }
      else if(this.typeIndex == 4){
        this.roomHydropwerList[this.itemIndex].comment = comment;
        this.roomHydropwerList[this.itemIndex].fileDTOList = picList;
        if(this.roomHydropwerList[this.itemIndex].fileDTOList&&this.roomHydropwerList[this.itemIndex].fileDTOList.length>0){
          let fileIds = [];
          this.roomHydropwerList[this.itemIndex].fileDTOList.forEach((item)=>{
            fileIds.push(item.id)
          });
          this.roomHydropwerList[this.itemIndex].fileIds = fileIds;
        }
      }
      else if(this.typeIndex == 5){
        this.pubHydropwerList[this.itemIndex].comment = comment;
        this.pubHydropwerList[this.itemIndex].fileDTOList = picList;
        if(this.pubHydropwerList[this.itemIndex].fileDTOList&&this.pubHydropwerList[this.itemIndex].fileDTOList.length>0){
          let fileIds = [];
          this.pubHydropwerList[this.itemIndex].fileDTOList.forEach((item)=>{
            fileIds.push(item.id)
          });
          this.pubHydropwerList[this.itemIndex].fileIds = fileIds;
        }
      }
    },
    cancelAddCommnet(){
      this.commentPicDialog = false;
    },
     commentPic(index,item,val){
      this.typeIndex = val;
      this.itemIndex = index;
      this.commentPicDialog = true;
      this.commentPicTitle = item.name + '-备注';
      this.commentPicItem = item;
    },
    addCount(item){
      item.value = item.value + 1;
    },
    plusCount(item){
      if(item.value == 0){
        return ;
      }
      item.value = item.value - 1;
    },
  },
}
</script>

<style scoped lang="less">
  .deliveryInfo-box{
    padding: 20px;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    .title{
      color: #111111;
      font-size: 16px;
      font-weight: 500;
    }
    .goodList-detail-item{
      width: 100%;
      border-radius: 4px;
      border: 1px solid #EEEEEE;
      display: flex;
      box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.1);
      .goodList-detail-item-left{
        display: flex;
        width: 60px;
        background: #F5F7FF;
        align-items: center;
      }
      .goodList-detail-item-right{
        width: calc(100% - 60px);
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 11px 0 0 12px;
        .item{
          width: 214px;
          margin: 0 13px 11px 0;
          .item-item-style{
            height: 32px;
            line-height: 32px;
            color: #333333;
            font-size: 13px;
          }
          .item1{
            background: #F6F7FB;
            border-radius: 2px 0px 0px 2px;
            border: 1px solid #EEEEEE;
            width: 76px;
            text-align: center;
          }
          .item2{
            border: 1px solid #EEEEEE;
            border-left: none;
            width: 92px;
            font-size: 14px;
            color: #111111;
            padding: 0 10px;
            .item2_plus{
              height: 30px;
              line-height: 30px;
              width: 15px;
              text-align: center;
            }
            .item2_input{
              width: 40px;
              height: 30px;
              line-height: 30px;
              /deep/ .ant-input{
                border: none;
                height: 30px;
                line-height: 30px;
              }
            }
            .item2_add{
              height: 30px;
              line-height: 30px;
              width: 15px;
              text-align: center;
            }
          }
          .item3{
            border: 1px solid #EEEEEE;
            border-left: none;
            width: 46px;
            border-radius: 0px 2px 2px 0px;
            padding: 0 6px;
          }
        }
        .item_other{
          width: 328px;
          margin: 0 13px 11px 0;
          .item-item-style{
            height: 32px;
            line-height: 32px;
            color: #333333;
            font-size: 13px;
          }
          .item1{
            background: #F6F7FB;
            border-radius: 2px 0px 0px 2px;
            border: 1px solid #EEEEEE;
            width: 76px;
            text-align: center;
          }
          .item2{
            border: 1px solid #EEEEEE;
            border-left: none;
            font-size: 14px;
            color: #111111;
            width: 206px;
            .item2-select{
              height: 30px;
              line-height: 30px;
              /deep/ .ant-select-selection-selected-value{
                color: #111111;
              }
              /deep/ .ant-select-selection{
                border: none;
                height: 30px;
                line-height: 30px;
              }
            }
            .item2-split{
              margin: 8px 10px 0 5px;
              height: 14px;
              border-right: 1px solid #EEEEEE;
            }
            .item2-input{
              width: 80px;
              height: 30px;
              line-height: 30px;
              /deep/ .ant-input{
                border: none;
                height: 30px;
                line-height: 30px;
                padding: 4px;
              }
            }
            .item2-font{
              margin-left: 10px;
              font-size: 14px;
              color: #777777;
              height: 30px;
              line-height: 30px;
            }
          }
          .item3{
            border: 1px solid #EEEEEE;
            border-left: none;
            width: 46px;
            border-radius: 0px 2px 2px 0px;
            padding: 0 6px;
          }
        }
        .haveValueStyle{
          color: #0a87f8;
        }
        .noHaveValueStyle{
          color: #777777;
        }
        .clickStyle{
          border:1px solid #0a87f8;
        }
        /deep/ .ant-popover-inner-content{
          width: 340px;
          padding: 15px 15px 10px 15px;
        }
        .room-img-list {
          >div {
            height: 64px;
            width: 96px;
            margin-right: 10px;
            margin-bottom: 10px;
            >div{
              width: 100%;
              height: 100%;
              line-height: 64px;
              border: 1px solid #eeeeee;
              background-color: #f6f7f8;
              text-align: center;
              border-radius: 6px;
              overflow: hidden;
              img {
                width: auto;
                max-width: 96px;
                height: auto;
                max-height: 64px;
                overflow: hidden;
              }
            }
          }
          >div:last-child{
            margin-right: 0px;
          }
        }
      }
    }
    .otherInfoStyle{
      padding-top: 14px;
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
    .mustFillStyle{
      border: 1px solid #FB4246 !important;
    }
  }
</style>