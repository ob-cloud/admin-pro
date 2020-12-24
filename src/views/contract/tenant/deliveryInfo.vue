<template>
  <div class="deliveryInfo-box" @click="clickInfo()">
    <div class="deliveryInfo-head clearfix">
      <div class="item f-fl cursor" @click="changeIndex(1)" :class="index==1?'clickStyle':'unClickStyle'">“签约”交割信息</div>
      <div class="item f-fl cursor" @click="changeIndex(2)" :class="index==2?'clickStyle':'unClickStyle'" v-if="contractStatus==6||contractStatus==7">“退租”交割信息</div>
      <div class="f-fr clearfix" v-if="operateFlag&&(index==2&&(contractStatus==6||contractStatus==7))||(index==1&&(contractStatus==1||contractStatus==2||contractStatus==3||contractStatus==4||contractStatus==5))">
        <div class="tabs-options f-fr" v-if="editFlag">
          <span style="color: rgba(0, 0, 0, 0.65);line-height: 22px;" @click="cancelSave()" >取消</span>
          <span style="line-height: 22px;" @click="save()">保存</span>
        </div>
        <div class="editStyle cursor f-fr" v-if="!editFlag&&propertyDeliverySignForm&&propertyDeliverySignForm.id&&propertyDeliverySignForm.isConfirm==0&&bjwyjgdFlag" @click="goToconfirm()">
          <icon-font style="margin-right: 5px;" type="iconfaqi"/>发送给租客确认
        </div>
        <div class="editStyle cursor f-fr" v-if="!editFlag&&propertyDeliverySignForm&&propertyDeliverySignForm.isConfirm!=1&&yqqrFlag" @click="editFlag=true;" style="margin-right: 15px;">
          <icon-font style="margin-right: 5px;" type="iconyumengtubiao_bianji-1"/>编辑
        </div>
      </div>
    </div>
    <div class="deliveryInfo-detail">
      <div style="padding-bottom: 20px;border-bottom: 10px solid #F6F7F8;position: relative;">
        <div v-if="propertyDeliverySignForm&&propertyDeliverySignForm.isConfirm==1" style="position:absolute;right: 0px;top:-20px;">
          <img style="width: 100px;height: 94px;" src="../../../assets/contract/pass.png">
        </div>
        <div class="title" style="margin-bottom: 13px;">物品交割</div>
        <div v-if="!editFlag&&(!propertyDeliverySignForm||!propertyDeliverySignForm.copyRoomDeliveryNoteList||propertyDeliverySignForm.copyRoomDeliveryNoteList.length==0)&&(!propertyDeliverySignForm||!propertyDeliverySignForm.copyPubDeliveryNoteList||propertyDeliverySignForm.copyPubDeliveryNoteList.length==0)"
              style="box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.1);border: 1px solid #F4F4F4;border-radius: 4px;">
          <div style="text-align: center;margin-top: 34px;">
            <img style="width: 120px;height:113px;" src="../../../assets/login/no-collect.png">
          </div>
          <div style="color: #777777;font-size: 14px;text-align: center;margin: 14px 0 34px 0;">未设置物品交割信息</div>
        </div>
        <div v-if="editFlag&&(!propertyDeliverySignForm||!propertyDeliverySignForm.roomDeliveryNoteList||propertyDeliverySignForm.roomDeliveryNoteList.length==0)&&(!propertyDeliverySignForm||!propertyDeliverySignForm.pubDeliveryNoteList||propertyDeliverySignForm.pubDeliveryNoteList.length==0)"
             style="box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.1);border: 1px solid #F4F4F4;border-radius: 4px;">
          <div style="text-align: center;margin-top: 34px;">
            <img style="width: 120px;height:113px;" src="../../../assets/login/no-collect.png">
          </div>
          <div style="color: #777777;font-size: 14px;text-align: center;margin: 14px 0 34px 0;">未设置物品交割信息</div>
        </div>
        <div v-if="propertyDeliverySignForm&&propertyDeliverySignForm.roomDeliveryNoteList&&propertyDeliverySignForm.roomDeliveryNoteList.length>0&&editFlag" class="goodList-detail-item">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">房间</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item f-fl clearfix" v-for="(item,index) in propertyDeliverySignForm.roomDeliveryNoteList" :key="index">
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
        <div v-if="propertyDeliverySignForm&&propertyDeliverySignForm.copyRoomDeliveryNoteList&&propertyDeliverySignForm.copyRoomDeliveryNoteList.length>0&&!editFlag" class="goodList-detail-item">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">房间</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item f-fl clearfix" v-for="(item,index) in propertyDeliverySignForm.copyRoomDeliveryNoteList" :key="index">
              <div class="item1 item-item-style overHidde f-fl">{{item.name}}</div>
              <div class="item2 item-item-style f-fl clearfix" style="text-align: center;">
                {{item.value}}
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
                <div class="item3 item-item-style f-fl">
                  <icon-font :class="item.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconbeizhuxinxi"/>
                  <icon-font :class="item.fileDTOList&&item.fileDTOList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
                </div>
              </a-popover>
            </div>
          </div>
        </div>
        <div v-if="propertyDeliverySignForm&&propertyDeliverySignForm.pubDeliveryNoteList&&propertyDeliverySignForm.pubDeliveryNoteList.length>0&&editFlag" class="goodList-detail-item" style="margin-top: 15px;">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">公区</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item f-fl clearfix" v-for="(item,index) in propertyDeliverySignForm.pubDeliveryNoteList" :key="index">
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
                <div class="item3 item-item-style f-fl cursor" @click.stop="commentPic(index,item,2)" :class="typeIndex == 2 && itemIndex == index?'clickStyle':''">
                  <icon-font :class="item.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconyumengtubiao_bianji-1"/>
                  <icon-font :class="item.fileDTOList&&item.fileDTOList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
                </div>
              </a-popover>
            </div>
          </div>
        </div>
        <div v-if="propertyDeliverySignForm&&propertyDeliverySignForm.copyPubDeliveryNoteList&&propertyDeliverySignForm.copyPubDeliveryNoteList.length>0&&!editFlag" class="goodList-detail-item" style="margin-top: 15px;">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">公区</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item f-fl clearfix" v-for="(item,index) in propertyDeliverySignForm.copyPubDeliveryNoteList" :key="index">
              <div class="item1 item-item-style overHidde f-fl">{{item.name}}</div>
              <div class="item2 item-item-style f-fl clearfix" style="text-align: center;">
                {{item.value}}
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
                <div class="item3 item-item-style f-fl">
                  <icon-font :class="item.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconbeizhuxinxi"/>
                  <icon-font :class="item.fileDTOList&&item.fileDTOList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
                </div>
              </a-popover>
            </div>
          </div>
        </div>
        <div class="title" style="margin: 25px 0 13px 0;">水电燃读数</div>
        <div v-if="(!propertyDeliverySignForm||!propertyDeliverySignForm.copyRoomHydropwerList||propertyDeliverySignForm.copyRoomHydropwerList.length==0)&&(!propertyDeliverySignForm||!propertyDeliverySignForm.copyPubHydropwerList||propertyDeliverySignForm.copyPubHydropwerList.length==0)&&!editFlag"
             style="box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.1);border: 1px solid #F4F4F4;border-radius: 4px;">
          <div style="text-align: center;margin-top: 34px;">
            <img style="width: 120px;height:113px;" src="../../../assets/login/no-collect.png">
          </div>
          <div style="color: #777777;font-size: 14px;text-align: center;margin: 14px 0 34px 0;">未设置水电燃信息</div>
        </div>
        <div v-if="propertyDeliverySignForm&&propertyDeliverySignForm.roomHydropwerList&&propertyDeliverySignForm.roomHydropwerList.length>0&&editFlag" class="goodList-detail-item">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">房间</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item_other f-fl clearfix" v-for="(item,index) in propertyDeliverySignForm.roomHydropwerList" :key="index">
              <div class="item1 item-item-style overHidde f-fl">{{item.name}}</div>
              <div class="item2 item-item-style f-fl clearfix" :class="!item.value&&(item.comment||(item.fileDTOList&&item.fileDTOList.length>0))?'mustFillStyle':''">
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
        <div v-if="propertyDeliverySignForm&&propertyDeliverySignForm.copyRoomHydropwerList&&propertyDeliverySignForm.copyRoomHydropwerList.length>0&&!editFlag" class="goodList-detail-item">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">房间</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item_other f-fl clearfix" v-for="(item,index) in propertyDeliverySignForm.roomHydropwerList" :key="index">
              <div class="item1 item-item-style overHidde f-fl">{{item.name}}</div>
              <div class="item2 item-item-style clearfix f-fl" style="padding: 0 20px 0 15px;">
                <div class="item2-select f-fl" style="width: 50px;">
                  {{item.valueType==3?'金额：':item.valueType==1?'余数：':item.valueType==2?'底数：':'-'}}
                </div>
                <div class="item2-input f-fl">
                  {{item.value?item.value:'-'}}
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
                <div class="item3 item-item-style f-fl">
                  <icon-font :class="item.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconbeizhuxinxi"/>
                  <icon-font :class="item.fileDTOList&&item.fileDTOList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
                </div>
              </a-popover>
            </div>
          </div>
        </div>
        <div v-if="propertyDeliverySignForm&&propertyDeliverySignForm.pubHydropwerList&&propertyDeliverySignForm.pubHydropwerList.length>0&&editFlag" class="goodList-detail-item" style="margin-top: 15px;">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">公区</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item_other f-fl clearfix" v-for="(item,index) in propertyDeliverySignForm.pubHydropwerList" :key="index">
              <div class="item1 item-item-style overHidde f-fl">{{item.name}}</div>
              <div class="item2 item-item-style f-fl clearfix" :class="!item.value&&(item.comment||(item.fileDTOList&&item.fileDTOList.length>0))?'mustFillStyle':''">
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
                <div class="item3 item-item-style f-fl cursor" @click.stop="commentPic(index,item,5)" :class="typeIndex ==3 && itemIndex == index?'clickStyle':''">
                  <icon-font :class="item.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconyumengtubiao_bianji-1"/>
                  <icon-font :class="item.fileDTOList&&item.fileDTOList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
                </div>
              </a-popover>
            </div>
          </div>
        </div>
        <div v-if="propertyDeliverySignForm&&propertyDeliverySignForm.copyPubHydropwerList&&propertyDeliverySignForm.copyPubHydropwerList.length>0&&!editFlag" class="goodList-detail-item" style="margin-top: 15px;">
          <div class="goodList-detail-item-left">
            <div style="width:100%;text-align: center">公区</div>
          </div>
          <div class="goodList-detail-item-right clearfix">
            <div class="item_other f-fl clearfix" v-for="(item,index) in propertyDeliverySignForm.pubHydropwerList" :key="index">
              <div class="item1 item-item-style overHidde f-fl">{{item.name}}</div>
              <div class="item2 item-item-style clearfix f-fl" style="padding: 0 20px 0 15px;">
                <div class="item2-select f-fl" style="width: 50px;">
                  {{item.valueType==3?'金额：':item.valueType==1?'余数：':item.valueType==2?'底数：':'-'}}
                </div>
                <div class="item2-input f-fl">
                  {{item.value?item.value:'-'}}
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
                <div class="item3 item-item-style f-fl cursor">
                  <icon-font :class="item.comment?'haveValueStyle':'noHaveValueStyle'" style="margin-right: 5px;" type="iconbeizhuxinxi"/>
                  <icon-font :class="item.fileDTOList&&item.fileDTOList.length>0?'haveValueStyle':'noHaveValueStyle'" type="icontupian"/>
                </div>
              </a-popover>
            </div>
          </div>
        </div>
      </div>
      <div class="otherInfoStyle">
        <div class="item item1">
          <LabelItem title="其它备注" class="u-bottom-border" :maxSize="100" :valLength="propertyDeliverySignForm.comment.length" v-if="editFlag">
            <a-textarea v-if="editFlag" v-model="propertyDeliverySignForm.comment" autosize maxlength="100" placeholder="填写后租客可见"></a-textarea>
          </LabelItem>
          <LabelItem title="其它备注" class="u-bottom-border" v-if="!editFlag">
            <span v-show="!editFlag&&!propertyDeliverySignForm.comment">-</span>
            <div class="promotionDesc" v-show="!editFlag&&propertyDeliverySignForm.comment "> <a-textarea v-model="propertyDeliverySignForm.comment" autosize /></div>
          </LabelItem>
        </div>
        <div class="item item2" style="margin-top: 25px;position: relative;" >
          <label-item title="其它凭证" v-if="editFlag">
            <own-upload style="padding-right: 10px"  :picList="propertyDeliverySignForm.otherPicList" :uploadParms="sendData" :maxLength="20" :showTips="false" ref="otherPicList">
            </own-upload>
          </label-item>
          <label-item title="其它凭证" v-if="!editFlag">
            <div  class="room-img-list f-clearfix">
              <span v-if="!propertyDeliverySignForm||!propertyDeliverySignForm.otherPicList||propertyDeliverySignForm.otherPicList.length==0">-</span>
              <div v-else class="f-fl cursor" v-for="(item,i) in propertyDeliverySignForm.otherPicList" :key="i" style="margin-bottom: 10px">
                <div @click="handlePreview(item.origin)"><img :src="item.small" alt=""></div>
              </div>
            </div>
          </label-item>
          <div style="position: absolute;top:2px;left: 70px;color: #777777;font-size: 13px;">
            （支持格式：jpg、png、jpeg；最多20张）
          </div>
        </div>
      </div>
    </div>
    <!-- 备注图片 -->
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="commentPicDialog" class="ownModalBorder titDialog" :title="commentPicTitle">
      <comment-pic @cancelAdd="cancelAddCommnet" :typeIndex="typeIndex" :scenePic="scenePic" :itemIndex="itemIndex" :commentPicItem="commentPicItem" @addCommentPic="addCommentPic"></comment-pic>
    </a-modal>
    <!-- 预览图片 -->
    <a-modal :visible="previewVisible" centered :footer="null" @cancel="cancelPreviewImage">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import CommentPic from './commentPic'
import {viewContractDelivery, editContractDelivery, deliveryConfirmSend, getHouseDelivery} from "@/api/contract";

export default {
  name: "deliveryInfo",
  components: {
    CommentPic,
  },
  props: {
    tenantContract: {
      type: String
    },
    contractStatus:{
      type:Number,
    },
    name:{
      type:String,
    },
    phone:{
      type:String,
    },
    houseId:{
      type:String,
    },
    deliveryRequiredFill:{
      type:Boolean,
    },
    operateFlag:{
      type:Boolean,
      default:true, //来自审批流是无法操作的
    },
    defaultIndex:{
      type:Number,
      default: 1,
    },
  },
  data() {
    return {
      copyResData:{},
      propertyDeliverySignForm:{
        pubDeliveryNoteList:[],
        copyPubDeliveryNoteList:[],
        pubHydropwerList:[],
        copyPubHydropwerList:[],
        roomDeliveryNoteList:[],
        copyRoomDeliveryNoteList:[],
        roomHydropwerList:[],
        copyRoomHydropwerList:[],
        comment:'',       //其他备注
        otherPicList:[],
        id:'',
        isConfirm:0,
      },
      typeIndex:-1,       //2、合租（公区） 3、房间 4、房间水然  5、公区水然   6、退租-合租（公区） 7、退租-房间 8、退租-房间水然 9、退租-公区水然
      itemIndex:-1,       //具体某个
      commentPicDialog:false,
      commentPicTitle:'',
      commentPicItem:{},
      scenePic:0,
      initHydropwerData:[
        {comment:'',fileIds:[],valueType:1,value:'',name:'电表',},
        {comment:'',fileIds:[],valueType:1,value:'',name:'水表',},
        {comment:'',fileIds:[],valueType:1,value:'',name:'燃气表',},
        {comment:'',fileIds:[],valueType:1,value:'',name:'热水表',},
      ],
      index:1,
      editFlag:false,
      previewImage: '',
      previewVisible: false,
      bjwyjgdFlag:false,
      yqqrFlag:false,
    }
  },
  mounted() {
  },
  created() {
    this.sendData = { //
      // 上传时附带的额外参数
      bizId: '', // 房源id
      bizType: 3, // 图片大类标识 租客
      subBizType: 3, // 图片子类标识 身份证正面
      orderIndex: 1 // 排序值
    }
    this.initPermission();
    this.initData();
    this.index = this.defaultIndex;
  },
  methods: {
    initPermission(){
      let bjwyjgdFlag = false;
      let yqqrFlag = false;
      let permissions = JSON.parse(sessionStorage.getItem('permissions'));
      permissions.some(function(value){
        if (value.mark == 'mk_contract_tenant_bjwyjgd'){
          bjwyjgdFlag = true;
        }
        if(value.mark == "mk_contract_tenant_yqqr"){
          yqqrFlag  = true;
        }
      });
      this.yqqrFlag = yqqrFlag;
      this.bjwyjgdFlag = bjwyjgdFlag;
    },
    clickInfo(){
      this.$forceUpdate();
    },
    goToconfirm(){
      let _this = this;
      this.$modal.confirm({
        title: '确定要给租客 「' + _this.name+'/'+ _this.phone + '」 发送物业交割确认信息吗？',
        content: '确认发送信息后，租客直接在手机端确认物业交割信息',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          deliveryConfirmSend(_this.propertyDeliverySignForm.id).then(res => {
            if (res.code === '200') {
              _this.$message.success('短信发送成功');
            }
            else {
              _this.$message.error('短信发送失败');
            }
          });
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    },
    changeIndex(val){
      if(this.index == val){
        return ;
      }
      this.editFlag = false;
      this.index = val;
      this.initData();
    },
    cancelPreviewImage() {
      this.previewVisible = false;
    },
    handlePreview(url) {
      this.previewImage = url;
      this.previewVisible = true;
    },
    save(){
      //是否什么都没填
      let noThingFlag = true;
      //数据是否完整
      let dataCompelte = false;
      if(this.propertyDeliverySignForm.pubDeliveryNoteList){
        this.propertyDeliverySignForm.pubDeliveryNoteList.forEach((item)=>{
          if((item.comment||(item.fileDTOList&&item.fileDTOList.length>0))&&item.value==0){
            dataCompelte = true;
          }
          if(item.value > 0) {
            noThingFlag = false;
          }
        });
      }
      if(this.propertyDeliverySignForm.roomDeliveryNoteList){
        this.propertyDeliverySignForm.roomDeliveryNoteList.forEach((item)=>{
          if((item.comment||(item.fileDTOList&&item.fileDTOList.length>0))&&item.value==0) {
            dataCompelte = true;
          }
          if(item.value > 0) {
            noThingFlag = false;
          }
        });

      }
      if(this.propertyDeliverySignForm.pubHydropwerList){
        this.propertyDeliverySignForm.pubHydropwerList.forEach((item)=>{
          if((item.comment||(item.fileDTOList&&item.fileDTOList.length>0))&&!item.value) {
            dataCompelte = true;
          }
          if(item.value > 0) {
            noThingFlag = false;
          }
        });
      }
      if(this.propertyDeliverySignForm.roomHydropwerList){
        this.propertyDeliverySignForm.roomHydropwerList.forEach((item)=>{
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
      if(this.deliveryRequiredFill&&noThingFlag){
        this.$message.warning('请填写交割单内容');
        return ;
      }
      let fileDTOList = [...this.$refs.otherPicList.picsList];
      let fileIds = [];
      fileDTOList.forEach((item)=>{
        fileIds.push(item.id)
      });
      let sceneType = 1;
      if(this.index==2){
        sceneType = 2;
      }
      let postData ={
        conmment:this.propertyDeliverySignForm.comment,
        fileIds:fileIds,
        pubDeliveryNoteList:this.propertyDeliverySignForm.pubDeliveryNoteList,
        pubHydropwerList:this.propertyDeliverySignForm.pubHydropwerList,
        roomDeliveryNoteList:this.propertyDeliverySignForm.roomDeliveryNoteList,
        roomHydropwerList:this.propertyDeliverySignForm.roomHydropwerList,
        sceneType:sceneType,
        id:this.propertyDeliverySignForm.id,
        contractId:this.tenantContract,
      };
      editContractDelivery(postData).then(res => {
        if (res.code === '200') {
          this.$message.success('交割单信息修改成功');
          this.editFlag = false;
          this.initData();
        }
        else {
          this.$message.error('交割单信息修改失败');
        }
      });

    },
    cancelSave(){
      this.editFlag = false;
    },
    getHouseDelivery(){
      getHouseDelivery(this.houseId).then(res => {
        if (res.code === '200') {
          let data = res.data;
          this.propertyDeliverySignForm.roomDeliveryNoteList = data.roomDeliveryNoteList;
          this.propertyDeliverySignForm.pubDeliveryNoteList = data.pubDeliveryNoteList;
          this.propertyDeliverySignForm.roomHydropwerList = data.roomHydropwerList;
          this.propertyDeliverySignForm.pubHydropwerList = data.pubHydropwerList;
          if(this.propertyDeliverySignForm.pubDeliveryNoteList){
            this.propertyDeliverySignForm.pubDeliveryNoteList.forEach((item,index)=>{
              this.$set(item, 'comment','' );
              this.$set(item, 'fileIds',[] );
              this.$set(item, 'valueType',4 );
              this.$set(item, 'value',0 );
              this.$set(item, 'sort',index );
            })
          }
          if(this.propertyDeliverySignForm.roomDeliveryNoteList){
            this.propertyDeliverySignForm.roomDeliveryNoteList.forEach((item,index)=>{
              this.$set(item, 'comment','' );
              this.$set(item, 'fileIds',[] );
              this.$set(item, 'valueType',4 );
              this.$set(item, 'value',0 );
              this.$set(item, 'sort',index );
            })
          }
          if(this.propertyDeliverySignForm.roomHydropwerList){
            let temp = [];
            this.propertyDeliverySignForm.roomHydropwerList.forEach((item)=>{
              let obj = {};
              this.$set(obj, 'comment','' );
              this.$set(obj, 'fileIds',[] );
              this.$set(obj, 'value',item.value );
              this.$set(obj, 'valueType',item.valueType );
              this.$set(obj, 'name',item.name );
              temp.push(obj);
            });
            this.propertyDeliverySignForm.roomHydropwerList = temp;
          }
          if(this.propertyDeliverySignForm.pubHydropwerList){
            let temp = [];
            this.propertyDeliverySignForm.pubHydropwerList.forEach((item)=>{
              let obj = {};
              this.$set(obj, 'comment','' );
              this.$set(obj, 'fileIds',[] );
              this.$set(obj, 'value',item.value );
              this.$set(obj, 'valueType',item.valueType );
              this.$set(obj, 'name',item.name );
              temp.push(obj);
            });
            this.propertyDeliverySignForm.pubHydropwerList = temp;
          }

          this.$forceUpdate();
        }
      });
    },
    initData(){
      viewContractDelivery(this.tenantContract).then(res => {
        if (res.code === '200') {
          this.copyResData = res;
          this.initRes(res);
        }
      });
    },
    initRes(res){
      if(res.data&&this.index==1){
        this.propertyDeliverySignForm = res.data.propertyDeliverySignForm;
        if(res.data.propertyDeliverySignForm){
          if(res.data.propertyDeliverySignForm.pubDeliveryNoteList){
            let temp = [];
            let copyTemp = [];
            res.data.propertyDeliverySignForm.pubDeliveryNoteList.forEach((item)=>{
              item.value = parseInt(item.value);
              let obj = Object.assign({},item);
              if(item.value>0){
                let copyObj = Object.assign({},item);
                copyTemp.push(copyObj);
              }
              temp.push(obj);
            });
            this.propertyDeliverySignForm.pubDeliveryNoteList = temp;
            this.propertyDeliverySignForm.copyPubDeliveryNoteList = copyTemp;
          }
          if(res.data.propertyDeliverySignForm.pubHydropwerList){
            this.propertyDeliverySignForm.copyPubHydropwerList = res.data.propertyDeliverySignForm.pubHydropwerList;
            let temp = [];
            res.data.propertyDeliverySignForm.pubHydropwerList.forEach((item)=>{
              if(item.value){
                item.value = parseFloat(item.value);
              }
              let obj = Object.assign({},item);
              temp.push(obj);
            });
            this.propertyDeliverySignForm.pubHydropwerList = temp;
          }
          if(res.data.propertyDeliverySignForm.roomDeliveryNoteList){
            let temp = [];
            let copyTemp = [];
            res.data.propertyDeliverySignForm.roomDeliveryNoteList.forEach((item)=>{
              item.value = parseInt(item.value);
              let obj = Object.assign({},item);
              if(item.value>0){
                let copyObj = Object.assign({},item);
                copyTemp.push(copyObj);
              }
              temp.push(obj);
            });
            this.propertyDeliverySignForm.roomDeliveryNoteList = temp;
            this.propertyDeliverySignForm.copyRoomDeliveryNoteList = copyTemp;
          }
          if(res.data.propertyDeliverySignForm.roomHydropwerList){
            this.propertyDeliverySignForm.copyRoomHydropwerList = res.data.propertyDeliverySignForm.roomHydropwerList;
            let temp = [];
            res.data.propertyDeliverySignForm.roomHydropwerList.forEach((item)=>{
              if(item.value){
                item.value = parseFloat(item.value);
              }
              let obj = Object.assign({},item);
              temp.push(obj);
            });
            this.propertyDeliverySignForm.roomHydropwerList = temp;
          }
          if(res.data.propertyDeliverySignForm.comment){
            this.propertyDeliverySignForm.comment = res.data.propertyDeliverySignForm.comment;
          }
          if(res.data.propertyDeliverySignForm.fileDTOList){
            this.propertyDeliverySignForm.otherPicList = res.data.propertyDeliverySignForm.fileDTOList;
            this.propertyDeliverySignForm.otherPicList.forEach((item)=>{
              item.status='done';
            });
          }
        }
        else{
          this.propertyDeliverySignForm = {
            comment: '',
            otherPicList:[],
          };
          if(this.houseId){
            this.getHouseDelivery();
          }
        }
      }
      if(res.data&&this.index==2){
        this.propertyDeliverySignForm = res.data.propertyDeliveryBreakForm;
        if(res.data.propertyDeliveryBreakForm){
          if(res.data.propertyDeliveryBreakForm.pubDeliveryNoteList){
            let temp = [];
            let copyTemp = [];
            res.data.propertyDeliveryBreakForm.pubDeliveryNoteList.forEach((item)=>{
              item.value = parseInt(item.value);
              let obj = Object.assign({},item);
              if(item.value>0){
                let copyObj = Object.assign({},item);
                copyTemp.push(copyObj);
              }
              temp.push(obj);
            });
            this.propertyDeliverySignForm.pubDeliveryNoteList = temp;
            this.propertyDeliverySignForm.copyPubDeliveryNoteList = copyTemp;
          }
          if(res.data.propertyDeliveryBreakForm.pubHydropwerList){
            this.propertyDeliverySignForm.copyPubHydropwerList = res.data.propertyDeliveryBreakForm.pubHydropwerList;
            let temp = [];
            res.data.propertyDeliveryBreakForm.pubHydropwerList.forEach((item)=>{
              if(item.value){
                item.value = parseFloat(item.value);
              }
              let obj = Object.assign({},item);
              temp.push(obj);
            });
            this.propertyDeliverySignForm.pubHydropwerList = temp;
          }
          if(res.data.propertyDeliveryBreakForm.roomDeliveryNoteList){
            let temp = [];
            let copyTemp = [];
            res.data.propertyDeliveryBreakForm.roomDeliveryNoteList.forEach((item)=>{
              item.value = parseInt(item.value);
              let obj = Object.assign({},item);
              if(item.value>0){
                let copyObj = Object.assign({},item);
                copyTemp.push(copyObj);
              }
              temp.push(obj);
            });
            this.propertyDeliverySignForm.roomDeliveryNoteList = temp;
            this.propertyDeliverySignForm.copyRoomDeliveryNoteList = copyTemp;
          }
          if(res.data.propertyDeliveryBreakForm.roomHydropwerList){
            this.propertyDeliverySignForm.copyRoomHydropwerList = res.data.propertyDeliveryBreakForm.roomHydropwerList;
            let temp = [];
            res.data.propertyDeliveryBreakForm.roomHydropwerList.forEach((item)=>{
              if(item.value){
                item.value = parseFloat(item.value);
              }
              let obj = Object.assign({},item);
              temp.push(obj);
            });
            this.propertyDeliverySignForm.roomHydropwerList = temp;
          }
          if(res.data.propertyDeliveryBreakForm.comment){
            this.propertyDeliverySignForm.comment = res.data.propertyDeliveryBreakForm.comment;
          }
          if(res.data.propertyDeliveryBreakForm.fileDTOList){
            this.propertyDeliverySignForm.otherPicList = res.data.propertyDeliveryBreakForm.fileDTOList;
            this.propertyDeliverySignForm.otherPicList.forEach((item)=>{
              item.status='done';
            });
          }
        }
        else{
          this.propertyDeliverySignForm = {
            comment: '',
            otherPicList:[],
          };
          this.getHouseDelivery();
        }
      }
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
    commentPic(index,item,val){
      this.typeIndex = val;
      this.itemIndex = index;
      this.commentPicDialog = true;
      this.commentPicTitle = item.name + '-备注';
      this.commentPicItem = item;
    },
    cancelAddCommnet(){
      this.commentPicDialog = false;
    },
    addCommentPic(comment,picList){
      this.commentPicDialog = false;
      if(this.typeIndex == 3){
        this.propertyDeliverySignForm.roomDeliveryNoteList[this.itemIndex].comment = comment;
        this.propertyDeliverySignForm.roomDeliveryNoteList[this.itemIndex].fileDTOList = picList;
        if(picList&&picList.length>0){
          let fileIds = [];
          picList.forEach((item)=>{
            fileIds.push(item.id)
          });
          this.propertyDeliverySignForm.roomDeliveryNoteList[this.itemIndex].fileIds = fileIds;
        }
      }
      else if(this.typeIndex == 2){
        this.propertyDeliverySignForm.pubDeliveryNoteList[this.itemIndex].comment = comment;
        this.propertyDeliverySignForm.pubDeliveryNoteList[this.itemIndex].fileDTOList = picList;
        if(picList&&picList.length>0){
          let fileIds = [];
          picList.forEach((item)=>{
            fileIds.push(item.id)
          });
          this.propertyDeliverySignForm.pubDeliveryNoteList[this.itemIndex].fileIds = fileIds;
        }
      }
      else if(this.typeIndex == 4){
        this.propertyDeliverySignForm.roomHydropwerList[this.itemIndex].comment = comment;
        this.propertyDeliverySignForm.roomHydropwerList[this.itemIndex].fileDTOList = picList;
        if(picList&&picList.length>0){
          let fileIds = [];
          picList.forEach((item)=>{
            fileIds.push(item.id)
          });
          this.propertyDeliverySignForm.roomHydropwerList[this.itemIndex].fileIds = fileIds;
        }
      }
      else if(this.typeIndex == 5){
        this.propertyDeliverySignForm.pubHydropwerList[this.itemIndex].comment = comment;
        this.propertyDeliverySignForm.pubHydropwerList[this.itemIndex].fileDTOList = picList;
        if(picList&&picList.length>0){
          let fileIds = [];
          picList.forEach((item)=>{
            fileIds.push(item.id)
          });
          this.propertyDeliverySignForm.pubHydropwerList[this.itemIndex].fileIds = fileIds;
        }
      }
    },
  },
  filters: {
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.deliveryInfo-box{
  margin-bottom: 45px;
  /deep/ .upload .check-pic{
    padding-top: 18px !important;
  }
  .deliveryInfo-head{
    .item{
      width: 130px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      border-radius: 10px 10px 0px 0px;
      margin-right: 2px;
    }
    .tabs-options{
      cursor: pointer;
      &>span {
        display: inline-block;
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        border: 1px solid #DDDDDD;
        background-color: #F6F7F8;
        border-radius: 4px;
      }
      &>span:last-child {
        margin-left: 10px;
        border: 1px solid #0a87f8;
        background-color: #0a87f8;
        color: #ffffff;
      }
    }
    .editStyle{
      color: #0A87F8;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
    }
    .unClickStyle{
      background: #F4F4F4;
      color: #777777;
    }
    .clickStyle{
      background: #E6F3FE;
      color: #0A87F8;
    }
  }
  .deliveryInfo-detail{
    padding: 20px 11px;
    border-radius: 0px 4px 4px 4px;
    border: 1px solid #F4F4F4;
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
          width: auto;
          overflow: hidden;
          margin: 0 15px 11px 0;
          .item-item-style{
            height: 32px;
            line-height: 32px;
            color: #333333;
            font-size: 13px;
            /deep/ .ant-select-selection__rendered{
              margin: 0 11px !important;
            }
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
            width: 80px;
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
              width: 28px;
              height: 30px;
              line-height: 30px;
              /deep/ .ant-input{
                border: none;
                height: 30px;
                line-height: 30px;
                padding-bottom: 1px;
                text-align: center;
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
            width: 42px;
            border-radius: 0px 2px 2px 0px;
            padding: 0 3px 0 4px;
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
            /deep/ .ant-select-selection__rendered{
              margin: 0 11px !important;
            }
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
                line-height: 30px;
                padding-bottom: 1px;
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
                height: 29px;
                line-height: 29px;
                padding-bottom: 1px;
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
        .promotionDesc{
          /deep/ .ant-input{
            border-bottom:none !important;
          }
        }
        .room-img-list{
          >div {
            height: 116px;
            width: 174px;
            margin-right: 10px;
            >div{
              width: 100%;
              height: 100%;
              line-height: 116px;
              border: 1px solid #eeeeee;
              background-color: #f6f7f8;
              text-align: center;
              border-radius: 6px;
              overflow: hidden;
              img {
                width: auto;
                max-width: 174px;
                height: auto;
                max-height: 116px;
                overflow: hidden;
              }
            }
          }
          >div:last-child{
            margin-right: 0px;
          }
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
    }
    .mustFillStyle{
      border: 1px solid #FB4246 !important;
    }
  }
}
</style>