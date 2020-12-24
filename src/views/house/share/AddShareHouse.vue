<template>
    <div id="addShareHouse" class="add-share-house">
        <label-item title="房源模式" border>
            <div class="house-model f-clearfix">
              <div class="f-fl itemStyle f-clearfix" :class="houseData.houseBizMode==1?'clickStyle':'unClickStyle'" @click="houseData.houseBizMode = 1">
                    <div>
                        <div style="color: #111111;font-size: 16px;">直营</div>
                        <div style="color: #777777;margin-top: 1px;">公司需向业主支付租金</div>
                    </div>
                  <div v-if="houseData.houseBizMode==1" :class="houseData.houseBizMode==1 ?'triangle-top-right-click':'triangle-top-right-unClick'"></div>
                  <icon-font v-if="houseData.houseBizMode==1" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
                </div>
              <div class="f-fl itemStyle f-clearfix" :class="houseData.houseBizMode==3?'clickStyle':'unClickStyle'" @click="houseData.houseBizMode = 3">
                <div>
                  <div style="color: #111111;font-size: 16px;">加盟(全托)</div>
                  <div style="color: #777777;margin-top: 1px;">加盟后，房源全托给公司全权负责</div>
                </div>
                <div v-if="houseData.houseBizMode==3" :class="houseData.houseBizMode==3 ?'triangle-top-right-click':'triangle-top-right-unClick'"></div>
                <icon-font v-if="houseData.houseBizMode==3" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
              </div>
              <div class="f-fl itemStyle f-clearfix" :class="houseData.houseBizMode==4?'clickStyle':'unClickStyle'" @click="houseData.houseBizMode = 4">
                <div>
                  <div style="color: #111111;font-size: 16px;">加盟(半托)</div>
                  <div style="color: #777777;margin-top: 1px;">加盟后，房源还是由加盟商管理</div>
                </div>
                <div v-if="houseData.houseBizMode==4" :class="houseData.houseBizMode==4 ?'triangle-top-right-click':'triangle-top-right-unClick'"></div>
                <icon-font v-if="houseData.houseBizMode==4" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
              </div>
              <div class="f-fl itemStyle" style="margin-right: 0;" :class="houseData.houseBizMode==2?'clickStyle':'unClickStyle'" @click="houseData.houseBizMode = 2">
                    <div>
                        <div style="color: #111111;font-size: 16px;">代理</div>
                        <div style="color: #777777;margin-top: 1px;">业主委托公司出房</div>
                    </div>
                  <div v-if="houseData.houseBizMode==2" :class="houseData.houseBizMode==2 ?'triangle-top-right-click':'triangle-top-right-unClick'"></div>
                  <icon-font v-if="houseData.houseBizMode==2" class="triangle-top-right-choose" type="iconyumengtubiao_xuanzhong-"/>
                </div>
            </div>
        </label-item>

        <label-item title="小区地址" border>
            <div class="u-bottom-border address">
                <a-select style="min-width: 100px" v-model="houseData.cityId" :showSearch="true" :filterOption="(inputValue,option)=>filterOption(inputValue,option)"  @change="selectCity" >
                    <a-select-option :value="item.id" :key="item.id" v-for="(item) in cityList">{{ item.name }}</a-select-option>
                </a-select>
                <a-select
                    showSearch
                    placeholder="请输入小区地址"
                    labelInValue
                    :class="{ 'must-fill-border': mustFillBorder  }"
                    style="width: 100%;"
                    :defaultActiveFirstOption="false"
                    :showArrow="false"
                    :filterOption="false"
                    @change="getCommunity"
                    @search="selectCommunity"
                    @focus="focusCommunity"
                    @blur="isEmpty"
                    :value = "communityName?{label:communityName}:undefined"
                >
                    <div slot="dropdownRender" slot-scope="menu">
                        <v-nodes :vnodes="menu" />
                        <a-divider style="margin: 4px 0;" />
                        <div
                                style="padding: 4px 8px 8px 8px;color: #0A87F8; cursor: pointer;"
                                @mousedown="e => e.preventDefault()"
                                @click="map_toggle"
                        >
                            找不到小区？点击这里添加小区
                        </div>
                    </div>
                    <a-select-option v-for="(item) in communityList" :key="item.id">
                        <span >
                            <span v-if="item.have==1">
                                <span style="color: #111111;">{{ item.name1 }}</span>
                                <span style="color: #0a87f8;">{{ item.name2 }}</span>
                                <span style="color: #111111;">{{ item.name3 }}</span>
                            </span>
                            <span v-else>{{ item.name }}</span>
                        </span>
                        <p style="font-size: 12px;color: #777777;"><icon-font style="margin-right: 4px;vertical-align: middle;" type="iconyumengtubiao_dingwei"/>{{ item.address }}</p>
                    </a-select-option>
                </a-select>
                <span class="tips-must-fill" v-show="mustFillBorder">请输入小区地址</span>
            </div>
        </label-item>

        <label-item title="小区信息" border>
            <div class="village-info u-bottom-border">
                <label-item title="用水" :mustFill="true">
                    <a-select v-model="houseData.waterType" style="width: 100%" >
                        <a-select-option :value="1">民水</a-select-option>
                        <a-select-option :value="2">商业用水</a-select-option>
                    </a-select>
                </label-item>
                <label-item title="用电" :mustFill="true">
                    <a-select v-model="houseData.electricityType" style="width: 100%" >
                        <a-select-option :value="1">民电</a-select-option>
                        <a-select-option :value="2">商业用电</a-select-option>
                    </a-select>
                </label-item>
                <label-item title="供暖信息" :mustFill="true">
                    <a-select v-model="houseData.heatingType" style="width: 100%" >
                        <a-select-option :value="0">未知</a-select-option>
                        <a-select-option :value="1">自采暖</a-select-option>
                        <a-select-option :value="2">集中供暖</a-select-option>
                    </a-select>
                </label-item>
                <div style="margin-top: 28px">
                    <a-checkbox v-model="houseData.isHaveElevator ? true : false" @change="onChangeElevator">有电梯</a-checkbox>
                    <a-checkbox v-model="houseData.gasType==1 ? true : false" @change="onChangeGasType">有燃气</a-checkbox>
                </div>
            </div>
        </label-item>

        <label-item title="房源信息" border>
            <div slot="title" class="f-ftc-blue title-opt" @click="fastSet">
                <span>快捷设置房源信息</span>
                <icon-font class="choose" type="iconyumengtubiao_shezhi" />
            </div>
            <div class="house-list">
                <div class="house-item" v-for="(item,index) in houseData.houseDataList" :key="index">
                    <div class="house-detail">
                        <div class="house-title">
                            <div style="max-width: 72px">房源编号</div>
                            <div style="max-width: 50px">座/栋<span class="must-fill">*</span></div>
                            <div style="max-width: 50px">单元</div>
                            <div style="max-width: 60px">房间号<span class="must-fill">*</span></div>
                            <div style="max-width: 70px">所在楼层<span class="must-fill">*</span></div>
                            <div style="max-width: 70px">总楼层数<span class="must-fill">*</span></div>
                            <div style="max-width: 42px">室<span class="must-fill">*</span></div>
                            <div style="max-width: 42px">厅<span class="must-fill">*</span></div>
                            <div style="max-width: 42px">厨<span class="must-fill">*</span></div>
                            <div style="max-width: 42px">卫<span class="must-fill">*</span></div>
                            <div style="max-width: 90px">朝向<span class="must-fill">*</span></div>
                            <div style="max-width: 70px">面积<span class="must-fill">*</span></div>
                            <div style="max-width: 100px">装修类型<span class="must-fill">*</span></div>
                            <div>公共配置</div>
                            <div>公区图片</div>
                            <div>更多信息</div>
                            <div style="max-width: 80px">操作</div>
                        </div>
                        <div class="house-data u-no-border ">
                            <div style="max-width: 72px">
                                <a-input v-model="item.houseAlias" placeholder="请输入"/>
                            </div>
                            <div style="max-width: 50px">
                                <a-input v-mustFill:[clickSave] v-model="item.buildingNo" placeholder="必填"/>
                            </div>
                            <div style="max-width: 50px">
                                <a-input v-model="item.unit" placeholder="请输入"/>
                            </div>
                            <div style="max-width: 60px">
                                <a-input v-mustFill:[clickSave] v-model="item.doorplate" placeholder="必填"/>
                            </div>
                            <div style="max-width: 70px">
                                <a-input v-mustFill:[clickSave] v-model="item.currentFloor" v-validate="'naturalNum|min(1)|max(99)'" placeholder="必填"/>
                            </div>
                            <div style="max-width: 70px">
                                <a-input v-mustFill:[clickSave] v-model="item.totalFloor" v-validate="'naturalNum|min(1)|max(99)'" placeholder="必填"/>
                            </div>
                            <div style="max-width: 42px">
                                <a-input v-mustFill:[clickSave] @change="changeRoomNum(index)" v-model="item.room" v-validate="'naturalNum|min(2)|max(10)'" />
                            </div>
                            <div style="max-width: 42px">
                                <a-input v-mustFill:[clickSave] v-model="item.livingRoom" v-validate="'naturalNum'" />
                            </div>
                            <div style="max-width: 42px">
                                <a-input v-mustFill:[clickSave] v-model="item.kitchen" v-validate="'naturalNum'" />
                            </div>
                            <div style="max-width: 42px;">
                                <a-input v-mustFill:[clickSave] v-model="item.toilet" v-validate="'naturalNum'" />
                            </div>
                            <div style="max-width: 90px" :class="{'select-border': houseSelectBorder==index && childSelectBorder == -1 && selectBorder=='orientation'}">
                                <a-select style="width: 100%;padding: 0 10px;box-sizing: border-box" v-model="item.orientation" @dropdownVisibleChange="changeSelect(index,-1,'orientation')" >
                                    <a-select-option :value="1">东</a-select-option>
                                    <a-select-option :value="2">南</a-select-option>
                                    <a-select-option :value="3">西</a-select-option>
                                    <a-select-option :value="4">北</a-select-option>
                                    <a-select-option :value="5">南北</a-select-option>
                                </a-select>
                            </div>
                            <div style="position: relative;max-width: 70px">
                                <a-input v-mustFill:[clickSave] v-model="item.houseArea" placeholder="必填" v-validate="'area'" /><span style="position: absolute;right: 4px">㎡</span>
                            </div>
                            <div style="max-width: 100px" :class="{'select-border': houseSelectBorder==index && childSelectBorder == -1 && selectBorder=='decorationType'}">
                                <a-select style="width: 100%;padding: 0 10px;box-sizing: border-box"  v-model="item.decorationType" @dropdownVisibleChange="changeSelect(index,-1,'decorationType')" >
                                    <a-select-option :value="2">精装</a-select-option>
                                    <a-select-option :value="4">毛坯</a-select-option>
                                    <a-select-option :value="3">简装</a-select-option>
                                    <a-select-option :value="1">豪华装</a-select-option>
                                </a-select>
                            </div>
                            <div @click="showHouseConfigModal(index)">
                                <a-popover placement="bottomRight" v-show="item.pubAreaGoodsList.length" >
                                    <template slot="content">
                                        <label-item title="公共配置">
                                            <p style="max-width: 324px;margin-top: 10px">
                                                <span class="houseAlias" v-for="(val,i) in item.pubAreaGoodsList" :key="i">{{val.name}} x {{val.quantity}}</span>
                                            </p>
                                        </label-item>
                                    </template>
                                    <p class="popover">
                                        <span>已配置</span>
                                        <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                    </p>
                                </a-popover>
                                <p class="popover" v-show="item.pubAreaGoodsList.length==0">
                                    <span>暂无配置</span>
                                    <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                </p>
                            </div>
                            <div class="show-pic" @click="showPic(item.pubAreaPicObjList,index,'','house')" >
                                <a-popover placement="bottomRight" v-show="item.pubAreaPicObjList.length" >
                                    <template slot="content">
                                        <label-item title="公区图片">
                                            <ul class="pic-list">
                                                <li v-for="(val,i) in item.pubAreaPicObjList" :key="i" >
                                                  <div v-if="(val.fileExt == 'jpg' || val.fileExt == 'png' || val.fileExt == 'jpeg')">
                                                    <img :src="val.origin"/>
                                                  </div>
                                                  <div v-if="(val.fileExt == 'mp4' || val.fileExt == 'avi' || val.fileExt == 'mov')">
                                                    <video :src="val.origin" controls="controls"></video>
                                                  </div>
                                                  <span v-if="(val.fileExt == 'jpg' || val.fileExt == 'png' || val.fileExt == 'jpeg')" style="width: auto;padding: 2px 10px;margin-left: 6px">{{val.fileOriginName}}</span>
                                                </li>
                                            </ul>
                                        </label-item>
                                    </template>
                                    <p class="popover">
                                        <span> {{ item.pubAreaPicObjList.length == 0 ? '暂无图片' : `已上传${item.pubAreaPicObjList.length}张` }}</span>
                                        <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                    </p>
                                </a-popover>
                                <p class="popover" v-show="item.pubAreaPicObjList.length==0">
                                    <span>暂无图片</span>
                                    <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                </p>
                            </div>
                            <div @click="showMoreModal(index,true)">
                              <a-popover placement="bottomRight" v-show="item.vrUrl||item.checkCode||(item.lableList&&item.lableList.length>0)||item.comment" >
                                <template slot="content">
                                  <div style="width: 300px;" class="showMoreModalStyle">
                                    <label-item title="VR看房地址">
                                      <span>{{item.vrUrl?item.vrUrl:'-'}}</span>
                                    </label-item>
                                    <label-item title="房源核验码" style="margin-top: 12px;">
                                      <span>{{item.checkCode?item.checkCode:'-'}}</span>
                                    </label-item>
                                    <label-item title="房源标签" style="margin-top: 12px;">
                                      <div class="clearfix" v-if="item.lableList&&item.lableList.length>0">
                                        <div v-for="(itemTemp,index3) in item.lableList" :key="index3" class="selectDemandLabelItem f-fl clearfix" style="margin:0 5px 5px 0;">
                                          <div>{{itemTemp}}</div>
                                        </div>
                                      </div>
                                      <div v-else>-</div>
                                    </label-item>
                                    <label-item title="备注" style="margin-top: 7px;">
                                      <span v-if="!item.comment">-</span>
                                      <span v-else><a-textarea v-model="item.comment" maxlength="500" autosize /></span>
                                    </label-item>
                                  </div>
                                </template>
                                <p class="popover">
                                  <span>已设置</span>
                                  <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                </p>
                              </a-popover>
                              <p class="popover" v-show="(item.lableList&&item.lableList.length==0)&&!item.checkCode&&!item.comment&&!item.vrUrl">
                                <span>暂未设置</span>
                                <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                              </p>
                            </div>
                            <div class="options f-clearfix" style="max-width: 80px">
                                <icon-font @click="deleteHouse(index)" class="fl delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                                <span class="f-fr" @click="toggleChild(item)"> {{ item.showChild ? '收起子间' : '展开子间' }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="house-child" v-show="item.showChild">
                        <h3 class="f-clearfix">
                            子间信息
                            <div class="f-fr f-ftc-blue add-child" @click="addChildHouse(index)">
                                <span class="">添加子间</span>
                                <icon-font type="iconyumengtubiao_tianjiazijian"></icon-font>
                            </div>
                        </h3>
                        <div class="house-detail">
                            <div class="house-title">
                                <div>
                                    房间名称
                                    <span class="must-fill">*</span>
                                </div>
                                <div style="max-width: 90px">
                                    类型
                                    <span class="must-fill">*</span>
                                </div>
                                <div style="max-width: 90px">
                                    朝向
                                    <span class="must-fill">*</span>
                                </div>
                                <div>
                                    面积
                                    <span class="must-fill">*</span>
                                </div>
                                <div>
                                    出租价格
                                    <span class="must-fill">*</span>
                                </div>
                                <div>
                                    是否可短租
                                </div>
                                <div>
                                    特色
                                </div>
                                <div>
                                    配置
                                </div>
                                <div>
                                    房源标题/描述
                                </div>
                                <div>
                                    房源图片
                                </div>
                                <div>
                                  更多信息
                                </div>
                                <div>操作</div>
                            </div>
                            <div class="house-data u-no-border " v-for="(childItem,i) in item.roomDataList"  :key="i">
                                <div>
                                    <a-input v-mustFill:[clickSave] v-model="childItem.roomName" placeholder="必填"/>
                                </div>
                                <div style="max-width: 90px" :class="{'select-border': houseSelectBorder==index && childSelectBorder == i && selectBorder=='roomLevel'}">
                                    <a-select style="width: 100%;padding: 0 10px;box-sizing: border-box" v-model="childItem.roomLevel" @dropdownVisibleChange="changeSelect(index,i,'roomLevel')" >
                                        <a-select-option :value="1">主卧</a-select-option>
                                        <a-select-option :value="2">次卧</a-select-option>
                                        <a-select-option :value="3">隔断</a-select-option>
                                    </a-select>
                                </div>

                                <div style="max-width: 90px" :class="{'select-border': houseSelectBorder==index && childSelectBorder == i && selectBorder=='orientation'}">
                                    <a-select style="width: 100%;padding: 0 10px;box-sizing: border-box" v-model="childItem.orientation" @dropdownVisibleChange="changeSelect(index,i,'orientation')" >
                                        <a-select-option :value="1">东</a-select-option>
                                        <a-select-option :value="2">南</a-select-option>
                                        <a-select-option :value="3">西</a-select-option>
                                        <a-select-option :value="4">北</a-select-option>
                                        <a-select-option :value="5">南北</a-select-option>
                                    </a-select>
                                </div>
                                <div style="position: relative;">
                                    <a-input v-mustFill:[clickSave] v-model="childItem.houseArea" v-validate="'area'" placeholder="必填"/><span style="position: absolute;right: 4px">㎡</span>
                                </div>
                                <div style="position: relative;">
                                    <a-input v-mustFill:[clickSave] v-model="childItem.actualPrice"  v-validate="'moneyNoDot'" placeholder="必填"/><span style="position: absolute;right: 4px">元</span>
                                </div>
                                <div>
                                    <a-checkbox @change="e=>{childItem.isShortRent = e.target.checked ? 1 : 0}">可短租</a-checkbox>
                                </div>
                                <div @click="showTagConfigModal(index,i)">
                                    <a-popover placement="bottomRight" v-show="childItem.tagList.length"  >
                                        <template slot="content">
                                            <label-item title="特色">
                                                <p style="max-width: 324px;margin-top: 10px">
                                                    <span class="houseAlias" v-for="(val,i) in childItem.tagList" :key="i">{{val}}</span>
                                                </p>
                                            </label-item>
                                        </template>
                                        <p class="popover">
                                            <span>已配置</span>
                                            <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                        </p>
                                    </a-popover>
                                    <p class="popover" v-show="childItem.tagList.length==0">
                                        <span>暂无</span>
                                        <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                    </p>
                                </div>
                                <div @click="showRoomConfigModal(index,i)">
                                    <a-popover placement="bottomRight" v-show="childItem.roomGoodsList.length" >
                                        <template slot="content">
                                            <label-item title="子间配置">
                                                <p style="max-width: 324px;margin-top: 10px">
                                                    <span class="houseAlias" v-for="(val,i) in childItem.roomGoodsList" :key="i">{{val.name}}  x {{val.quantity}}</span>
                                                </p>
                                            </label-item>
                                        </template>
                                        <p class="popover">
                                            <span>已配置</span>
                                            <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                        </p>
                                    </a-popover>
                                    <p class="popover" v-show="childItem.roomGoodsList.length==0">
                                        <span>暂无配置</span>
                                        <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                    </p>
                                </div>
                                <div @click="showRoomTitleModal(index,i)">
                                    <a-popover placement="bottomRight" v-show="childItem.title.length||childItem.promotionDesc.length" >
                                        <template slot="content">
                                          <div style="max-width: 324px; ">
                                            <label-item title="房源标题">
                                                <p>
                                                    <span>{{childItem.title?childItem.title:'-'}}</span>
                                                </p>
                                            </label-item>
                                            <label-item title="房源描述">
                                              <p>
                                                <span v-if="!childItem.promotionDesc">-</span>
                                                <span v-else><a-textarea v-model="childItem.promotionDesc" autosize /></span>
                                              </p>
                                            </label-item>
                                          </div>
                                        </template>
                                        <p class="popover">
                                            <span>已填写</span>
                                            <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                        </p>
                                    </a-popover>
                                    <p class="popover" v-show="childItem.title.length==0&&childItem.promotionDesc.length==0">
                                        <span>请输入</span>
                                        <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                    </p>
                                </div>
                                <div class="show-pic" @click="showPic(childItem.roomPicObjList,index,i,'room')" >
                                    <a-popover placement="bottomRight" v-show="childItem.roomPicObjList.length" >
                                        <template slot="content">
                                            <label-item title="房源图片">
                                                <!--                                            <p style="max-width: 324px;margin-top: 10px"></p>-->
                                                <ul class="pic-list" style="">
                                                    <li v-for="(val,i) in childItem.roomPicObjList" :key="i" >
                                                        <div v-if="(val.fileExt == 'jpg' || val.fileExt == 'png' || val.fileExt == 'jpeg')">
                                                          <img :src="val.origin"/>
                                                        </div>
                                                        <div v-if="(val.fileExt == 'mp4' || val.fileExt == 'avi' || val.fileExt == 'mov')">
                                                          <video :src="val.origin" controls="controls"></video>
                                                        </div>
                                                        <span v-if="(val.fileExt == 'jpg' || val.fileExt == 'png' || val.fileExt == 'jpeg')" style="width: auto;padding: 2px 10px;margin-left: 6px">{{val.fileOriginName}}</span>
                                                    </li>
                                                </ul>
                                            </label-item>
                                        </template>
                                        <p class="popover">
                                            <span> {{ childItem.roomPicObjList.length == 0 ? '暂无图片' : `已上传${childItem.roomPicObjList.length}张` }}</span>
                                            <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                        </p>
                                    </a-popover>
                                    <p class="popover" v-show="childItem.roomPicObjList.length==0">
                                        <span>暂无图片</span>
                                        <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                    </p>
                                </div>
                                <div @click="showMoreModal(index,false,i)">
                                  <a-popover placement="bottomRight" v-show="childItem.checkCode||childItem.comment" >
                                    <template slot="content">
                                      <div style="width: 300px;" class="showMoreModalStyle">
                                        <label-item title="房间核验码">
                                          <span>{{childItem.checkCode}}</span>
                                        </label-item>
                                        <label-item title="备注" style="margin-top: 12px;">
                                          <span v-if="!childItem.comment">-</span>
                                          <span v-else><a-textarea v-model="childItem.comment" maxlength="500" autosize /></span>
                                        </label-item>
                                      </div>
                                    </template>
                                    <p class="popover">
                                      <span>已设置</span>
                                      <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                    </p>
                                  </a-popover>
                                  <p class="popover" v-show="!childItem.checkCode&&!childItem.comment">
                                    <span>暂未设置</span>
                                    <icon-font class="f-ftc-blue" type="iconyumengtubiao_bianji-"></icon-font>
                                  </p>
                              </div>
                                <div>
                                    <icon-font @click="deleteChild(index,i)" class="fl delete-icon" type="iconyumengtubiao_shanchu-"></icon-font>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </label-item>
        <div class="continue-add">
            <p @click="addHouse">已添加<span>{{ houseData.houseDataList.length }}</span>套 <span class="add">继续添加</span> </p>
        </div>
        <label-item title="所属门店(部门)/维护人" border>
          <div class="clearfix">
            <label-item title="所属门店(部门)" style="" :mustFill="true" class="u-bottom-border f-fl">
              <store-tree resMark="mk_house_decentralized" @cancelOtherTree="cancelOtherTree(1)" :defaultValue='userInfo.deptName' placement="topLeft" ref="selectDept" width="200px" @selectChange="selectDept" :show-employee="false"></store-tree>
            </label-item>
            <label-item title="维护人" class="u-bottom-border f-fl">
              <dept-employee-tree resMark="mk_house_decentralized" @cancelOtherTree="cancelOtherTree(2)" :defaultValue='userInfo.info' placement="topLeft" ref="selectDeptEmp" width="200px" @selectChange="selectDeptEmp" :disableDept="true"></dept-employee-tree>
            </label-item>
          </div>
        </label-item>

        <a-modal centered cancelText="取消" okText="保存" :maskClosable="false" width="1000px" v-model="fastSetDialog"  @ok="saveFastSet" class="ownModalBorder titDialog" title="快捷设置房源信息">
            <fast-set ref="fastSet" :housePublicConfig="housePublicConfig" :configRelationFlag="configRelationFlag" :fastSetData="fastSetData"></fast-set>
        </a-modal>
        <!-- 房源更多信息 -->
        <a-modal title="更多信息" centered v-model='showMoreDialog' class="ownModalBorder titDialog" style="position: relative" @ok="saveShowMore" okText="确认" cancelText="取消">
          <div class="moreStyle">
            <label-item v-if="currentMoreInfo.flag" style="margin: 0 20px 20px 20px" title="VR看房地址" border class="u-bottom-border" :valLength="currentMoreInfo.vrUrl.length" :maxSize="100">
              <a-textarea autosize v-model="currentMoreInfo.vrUrl" maxlength="100" placeholder="请输入" />
            </label-item>
            <label-item style="margin: 0 20px 20px 20px" :title="currentMoreInfo.flag?'房源核验码':'房间核验码'" border class="u-bottom-border" :valLength="currentMoreInfo.checkCode.length" :maxSize="30">
              <a-input v-model="currentMoreInfo.checkCode" maxlength="30" placeholder="请输入" />
              <div style="position: absolute;top: 0px;left:84px;">
                <div style="height: 45px;line-height: 50px;">
                  <span style="font-size: 12px;">(仅内部可见)</span>
                </div>
              </div>
              <div class="smallIconStyle" style="position: absolute;top: 80px;color: #FFA036;font-size: 12px">
                <a-icon type="exclamation-circle" style="color: #FFA036;margin-right: 4px;" /><span>武汉市的房源上架至"58公寓馆平台"需要填写</span>
              </div>
              <div style="position: absolute;right: 0px;top:15px;" class="realStyle">
                <icon-font type="iconheyanzhenjia" />
              </div>
            </label-item>
            <label-item style="margin: 0 20px 20px 20px" title="房源标签" border class="u-bottom-border clearfix" v-if="currentMoreInfo.flag">
              <div class="clearfix" style="border-bottom: 1px solid #DDDDDD;">
                <div v-for="(itemTemp,index) in currentMoreInfo.lableList" :key="index" class="itemLableStyle f-fl clearfix" style="margin-top: 5px;">
                  <div class="f-fl">{{itemTemp}}</div>
                  <icon-font style="color: #FB4246;margin-top: 5px;" class="cursor f-fl" @click="removeHouseLableList(index)" type="iconyumengtubiao_guanbi-"/>
                </div>
                <label-item class="f-fl u-no-border" v-if="currentMoreInfo.lableList.length<10">
                  <a-input v-model="houseLableInput" style="text-align: left;" maxLength="10" @click="currentClickIndex=1" :placeholder="currentMoreInfo.lableList.length==0?'可输入补充标签，回车添加':'继续输入回车添加'" @keyup.enter="value=>addHouseLabel(value)" />
                </label-item>
                <div style="position: absolute;top: 6px;left:68px;">
                  <div style="height: 45px;line-height: 50px;">
                    <span style="font-size: 12px;">(仅内部可见)</span>
                  </div>
                </div>
              </div>
            </label-item>
            <label-item style="margin: 0 20px 27px 20px;position: relative" title="备注" border class="u-bottom-border" :valLength="currentMoreInfo.comment.length" :maxSize="500">
            <a-textarea autosize v-model="currentMoreInfo.comment" maxlength="500" placeholder="请输入" />
            <div style="position: absolute;top: 0px;left:36px;">
              <div style="height: 45px;line-height: 50px;">
                <span style="font-size: 12px;">(仅内部可见)</span>
              </div>
            </div>
            <div class="poperLabelStyle2" v-if="currentClickIndex&&houseLableList.length>0" style="max-height: 200px;overflow-y: auto" @mouseenter="currentClickIndex=1" @mouseleave="currentClickIndex=undefined">
              <div style="width: 100%;font-size: 12px;color: #666666;line-height: 17px;margin: 0 0 2px 0;">常用标签</div>
              <div v-for="(itemTemp,index3) in houseLableList" :key="index3" @click.stop="changeLabelList(itemTemp)" class="selectDemandLabelItem cursor f-fl clearfix" style="margin:0 5px 5px 0;" :style="currentMoreInfo.lableList.indexOf(itemTemp)>-1?'':'background:#F4F4F4;'">
                <div class="f-fl">{{itemTemp}}</div>
              </div>
            </div>
          </label-item>
          </div>
        </a-modal>

        <a-modal title="编辑房源特色" centered v-model='showTagConfigDialog' class="ownModalBorder titDialog" @ok="saveTagConfig" okText="确认" cancelText="取消">
            <label-item style="margin: 0 20px 20px 20px" title="房源特色" leftLine border class="u-bottom-border">
                <a-checkbox-group class="public-config" v-model="currentTag" @change="value => publicConfigChange(value,'tag')">
                    <a-checkbox class="overHidde" :value="item.id" v-for="(item,i) in houseTagConfig" :key="item.id">{{item.name}}</a-checkbox>
                </a-checkbox-group>
            </label-item>
        </a-modal>

        <a-modal title="编辑房源标题" centered v-model='showTitleDialog' class="ownModalBorder titDialog" @ok="saveTitle" okText="确认" cancelText="取消">
          <div class="moreStyle">
            <label-item style="margin: 0 20px 20px 20px" title="房源标题" leftLine border class="u-bottom-border" :valLength="textAreaVal_title.length" :maxSize="30" >
                <a-textarea autosize v-model="textAreaVal_title" maxlength="30" placeholder="请输入" />
            </label-item>
            <label-item style="margin: 0 20px 20px 20px" title="房源描述" leftLine border class="u-bottom-border" :valLength="textAreaVal_desc.length" :maxSize="500" >
              <a-textarea autosize v-model="textAreaVal_desc" maxlength="500" placeholder="请输入" />
            </label-item>
          </div>
        </a-modal>

        <a-modal  centered :title="'编辑'+picModalTitle" v-model='showPicDialog'  width="588px" destroyOnClose class="ownModalBorder titDialog" @ok="savePic" okText="确认" cancelText="取消">
            <label-item  style="margin: 0 20px 20px 20px;max-height: calc(100vh - 230px);overflow: auto;overflow-x: hidden" :title="picModalTitle" leftLine border class="u-bottom-border" >
                <house-video :picList="picList" :uploadParms="uploadParms" ref="publicPic"></house-video>
            </label-item>
        </a-modal>
        <!-- 小区地图 -->
        <a-modal title="添加小区" destroyOnClose centered :maskClosable="false" :footer="null" width="1000px"
                 v-model="showMap" class="ownModalBorder titDialog" @close="showMap=false">
            <room-map
                    @close_map="map_toggle_close"
                    :cityId="houseData.cityId"
                    :cityName="houseData.cityName"
                    :cityPoint="cityPoint"
                    @mapForm="getCommunityBymap"
            ></room-map>
        </a-modal>
        <!-- 物品配置-不关联资产 -->
        <a-modal :title="editConfigTitle" destroyOnClose centered :maskClosable="false" :footer="null" width="800px"
                 v-model="editConfigDialog1" class="ownModalBorder titDialog" @close="editConfigDialog1=false">
          <config-default :fromType="fromType" :housePublicConfig="housePublicConfig" :currentConfig="currentConfig"
                          @cancelSaveRoomConfig="cancelSaveRoomConfig" @saveRoomConfig="saveRoomConfig" @saveHouseConfig="saveHouseConfig"></config-default>
        </a-modal>
        <!-- 物品配置-关联资产 -->
        <a-modal :title="editConfigTitle" destroyOnClose centered :maskClosable="false" :footer="null" width="1000px"
                 v-model="editConfigDialog2" class="ownModalBorder titDialog" @close="editConfigDialog2=false">
          <config-asset :fromType="fromType" :housePublicConfig="housePublicConfig" :currentConfig="currentConfig"
                        @cancelSaveRoomConfig="cancelSaveRoomConfig" @saveRoomConfig="saveRoomConfig" @saveHouseConfig="saveHouseConfig"></config-asset>
        </a-modal>
    </div>
</template>

<script>
    import { employeeUserInfo } from '@/api/enterprise';
    import DeptEmployeeTree from '@/components/DeptEmployeeTree';
    import StoreTree from '@/components/DeptEmployeeTree/store';
    import FastSet from './FastSet'
    import roomMap from '../centralized/components/addVillageByGaodeMap.vue';
    import * as API from '@/api/shareHouse'
    import { getListHouseLable } from '@/api/centralizedHouse'
    import * as PublicAPI from '@/api/public'
    import HouseVideo from '@/components/OwnUpload/houseVideo';
    import ConfigDefault from '../whole/configDefault';
    import ConfigAsset from '../whole/configAsset';
    import {bizDecisionGet} from "@/api/decision";
    export default {
        name: "AddShareHouse",
        components: {
            FastSet,
            DeptEmployeeTree,
            StoreTree,
            roomMap,
            HouseVideo,
            ConfigDefault,
            ConfigAsset,
            VNodes: {
                functional: true,
                render: (h, ctx) => ctx.props.vnodes,
            },
        },
        data(){
            return {
                houseData: {
                    houseBizMode: 1,                // 房源经营模式- 1、包租，2、代理
                    cityId: '',                     // 城市id
                    cityName:"",
                    communityId: '',                // 小区ID
                    communityName:'',
                    waterType: 1,                   // 用水 - 0、未设置，1、民水，2、商业用水
                    electricityType: 1,             // 用电 - 0、未设置，1、民电，2、商业用电
                    heatingType: 1,                 // 供暖 - 0、未设置，1、自采暖，2、集中供暖
                    isHaveElevator: 1,              // 是否有电梯【0否1是】
                    gasType: 1,                     // 燃气 - 0、未设置，1、有，2、无
                    maintainerId: '',              // 负责人ID
                    deptId:'',                      //部门id
                    houseDataList: [                    // 房源数据列表
                        {
                            houseAlias: '',             // 房源编号
                            buildingNo: '',             // 楼号（座栋）
                            unit: '',                   // 单元
                            doorplate: '',              // 房间号
                            currentFloor: '',            // 所在楼层
                            totalFloor: '',              // 总楼层
                            room: 2,                    // 室（几室），合租最少两室
                            livingRoom: 1,              // 客厅（几客厅）
                            kitchen: 1,                 // 厨房（几厨房）
                            toilet: 1,                  // 卫生间（几卫生间）
                            orientation: 2,             // 朝向(1:东；2:南；3:西；4:北；5:南北)
                            houseArea: '',               // 房间面积
                            decorationType: 2,          // 装修类型【枚举：1、豪华装，2、精装，3、简装，4、毛坯】
                            pubAreaGoodsList: [],       // 公区物品ID列表只包含物品的ID）
                            pubAreaPicIdList: [],       // 公区图片ID列表（只包含图片的ID）
                            pubAreaPicObjList: [],       // *公区图片对象列表（包含图片的所有信息）*

                            showChild: true,// *展开或隐藏子房间列表*

                            roomDataList: [                 // 子房间数据列表
                                {
                                    roomName: 'A',           // 房间名称
                                    roomLevel: 1,           // 房间等级、类型【1、主卧，2、次卧，3、隔断】
                                    orientation: 2,         // 朝向(1:东；2:南；3:西；4:北；5:南北)
                                    houseArea: '',          // 房间面积
                                    actualPrice: '',        // 出租价格（月租金）【单位分】
                                    isShortRent: 0,         // 是否支持短租【0否1是】【民宿】
                                    tagList: [],            // 房间标签对象集合(这个字段后台要求直接传名称，不需要ID)
                                    roomGoodsList: [],      // 子房间物品ID集合
                                    title: '',              // 房源标题
                                    promotionDesc: '',      // 描述
                                    roomPicIdList: [],      // 房间图片ID列表
                                    roomPicObjList: [],      // *房间图片对象列表（包含图片的所有信息）*
                                    checkCode:'',            //房间检验码
                                    comment:'',              //备注
                                },
                                {
                                    roomName: 'B',           // 房间名称
                                    roomLevel: 2,           // 房间等级、类型【1、主卧，2、次卧，3、隔断】
                                    orientation: 4,         // 朝向(1:东；2:南；3:西；4:北；5:南北)
                                    houseArea: '',          // 房间面积
                                    actualPrice: '',        // 出租价格（月租金）【单位分】
                                    isShortRent: 0,         // 是否支持短租【0否1是】【民宿】
                                    tagList: [],            // 房间标签对象集合(这个字段后台要求直接传名称，不需要ID)
                                    roomGoodsList: [],      // 子房间物品ID集合
                                    title: '',              // 房源标题
                                    promotionDesc: '',      // 描述
                                    roomPicIdList: [],      // 房间图片ID列表
                                    roomPicObjList: [],      // *房间图片对象列表（包含图片的所有信息）*
                                    checkCode:'',            //房间检验码
                                    comment:'',              //备注
                                }
                            ],
                          vrUrl:'',
                            checkCode:'',                    //房源检验码
                            comment:'',                      //房源备注
                            lableList:[],                    //房源标签
                        }
                    ],
                },
                cityList: [],
                communityList: [],
                searchCommunityVal: undefined,
                mustFillBorder: false,
                copyHouse:{},
                copyChildHouse:{},
                selectBorder: '',
                houseSelectBorder: 0,
                childSelectBorder: -1,
                clickSave: false,
                fastSetDialog: false,
                fastSetData:{
                    publicConfig:[],
                    roomConfig:[],
                    tagConfig:[],
                    publicPic: [],
                    title: '',
                    desc: '',
                    roomPic: [],
                },
                showTitleDialog: false,
                showPicDialog: false,
                showHouseConfigDialog: false,
                showRoomConfigDialog: false,
                showTagConfigDialog: false,
                showMoreDialog:false,
                picList: [],
                textAreaVal_title: '',
                textAreaVal_desc:'',
                houseTagConfig: [],
                houseTagConfigSize:0,           //初始特色长度
                housePublicConfig: [],
                currentConfig: [],              //  当前选中的配置
                currentTag:[],                  //  当前选中的特色
                currentSelectHouseIndex: '',    //  当前选中的房源的index
                currentSelectRoomIndex: '',     //  当前选中的子房间的index
                currentSelectType: '',
                picModalTitle: '公区图片',
                userInfo: {
                    name: '',
                    phone: '',
                    empId: '',
                    info: '',
                  deptId:'',
                  deptName:'',
                },
                uploadParms: {
                    bizId: '',
                    bizType: 1,
                    subBizType: '',
                },
                showMap:false,
                searchAddressHaveValue:false,
                communityName:undefined,
                currentMoreInfo:{
                  vrUrl:'',
                  checkCode:'',
                  comment:'',
                  lableList:[],
                  flag:true,
                },
                houseLableList:[],
                houseLableInput:'',
                currentClickIndex:undefined,
                cityPoint:[],
                configRelationFlag:false,   //物品配置是否关联
                editConfigDialog1:false,
                editConfigDialog2:false,
                editConfigTitle:'',
                fromType:'house',
            }
        },
        created(){
            this.getUserInfo();
            // 获取租户的授权城市信息列表
            this.getCity();
            // 拷贝数据用于添加房源、子间
            let obj = this.houseData.houseDataList[0];
            this.copyHouse = Object.assign({},obj)
            this.copyChildHouse = Object.assign({},obj.roomDataList[1])     //添加子间为次卧
            delete this.copyHouse.roomDataList;
            this.copyHouse.roomDataList = [Object.assign({},obj.roomDataList[0]),this.copyChildHouse];  //为了显示主卧、次卧
            this.copyChildHouse.roomName = '';
            // 获取字典
            this.getDictionaryList();
            this.listHouseLable();
        },
        methods: {
          cancelSaveRoomConfig(){
            this.editConfigDialog1 = false;
            this.editConfigDialog2 = false;
          },
          cancelOtherTree(val){
            if(val==1){
              this.$refs.selectDeptEmp.showTree = false;
            }
            if(val==2){
              this.$refs.selectDept.showTree = false;
            }
          },
          //来自自定义搜索
          filterOption(inputValue,option){
            if(!inputValue){
              return true;
            }
            return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
          },
          changeLabelList(itemTemp){
            let pos =this.currentMoreInfo.lableList.indexOf(itemTemp);
            if(pos>-1){
              this.currentMoreInfo.lableList.splice(pos,1);
            }
            else{
              if(this.currentMoreInfo.lableList.length>=10){
                return;
              }
              this.currentMoreInfo.lableList.push(itemTemp);
            }
          },
          addHouseLabel(){
            let value = this.houseLableInput;
            if(value){
              let pos = this.currentMoreInfo.lableList.indexOf(value)
              if(pos > -1){
                //有了就不添加了
                this.$message.warning('该标签已存在，不可重复添加');
              }
              else{
                this.currentMoreInfo.lableList.push(value);
                this.houseLableInput='';
              }
            }
          },
          removeHouseLableList(index){
            this.currentMoreInfo.lableList.splice(index,1);
          },
          listHouseLable(){
            getListHouseLable().then(res => {
              if (res.code == "200") {
                this.houseLableList = res.data;
              }
            })
          },
            map_toggle() {
                this.showMap = true;
            },
            map_toggle_close() {
                this.showMap = false;
            },
            getCommunityBymap(value) {
                this.houseData.communityId = value.communityId;
                this.houseData.communityName = value.communityName;
                this.communityName = value.communityName;
                this.mustFillBorder = false;
            },
            getUserInfo(){
                employeeUserInfo().then(res => {
                  this.userInfo.phone = res.data.phone;
                  this.userInfo.name = res.data.name;
                  this.userInfo.info = res.data.name;
                  this.userInfo.empId = res.data.empId;
                  this.userInfo.deptId = res.data.deptId;
                  this.userInfo.deptName = res.data.deptName;
                  this.houseData.maintainerId = res.data.empId;
                  this.houseData.deptId = res.data.deptId;
                  //根据所属部门id去取决策
                  this.bizDecisionGet(res.data.deptId);
                });
            },
          //获取决策配置
          bizDecisionGet(val){
            let paramter ={
              bizPoint:'HOUSE_RULE',
              mark:'HOUSE_STRONG_ASSOCIATION_ASSETS',
              module:'HOUSE',
              deptId:val,
            };
            bizDecisionGet(paramter).then(res=>{
              if(res.data&&res.data.onOff==1){
                this.configRelationFlag = true;
              }
              else{
                this.configRelationFlag = false;
              }
            });
          },
            changeSelect(houseSelectBorder,childSelectBorder,selectBorder){

                if (this.selectBorder != selectBorder){
                    this.selectBorder = selectBorder
                    this.houseSelectBorder = houseSelectBorder
                    this.childSelectBorder = childSelectBorder
                }else{
                    this.selectBorder = ''
                }
            },
            toggleChild(item){
                item.showChild = !item.showChild
            },
            deleteHouse(index){
                if (this.houseData.houseDataList.length == 1){
                    this.$message.warning('不能再删咯！');
                }else{
                    this.houseData.houseDataList.splice(index,1)
                }
            },
            deleteChild(houseIndex,childIndex){
                let houseDataListItem = this.houseData.houseDataList[houseIndex];
                let childList = houseDataListItem.roomDataList;
                if (childList.length == 2){
                    this.$message.warning('不能再删咯！');
                }else{
                    childList.splice(childIndex,1)
                    houseDataListItem.room = childList.length
                }
            },
            fastSet(){
                this.fastSetDialog = true;
            },
            addHouse(){
                let obj = Object.assign({},this.copyHouse)
                delete obj.roomDataList;
                obj.roomDataList = [Object.assign({},this.copyHouse.roomDataList[0]),Object.assign({},this.copyHouse.roomDataList[1])];  //为了显示主卧、次卧
                obj.roomDataList[1].roomName = 'B';
                this.houseData.houseDataList.push(obj)
            },

            selectCity(val){
                this.houseData.cityId = val
                this.cityList.forEach((item)=>{
                    if(item.id == this.houseData.cityId ){
                        this.houseData.cityName = item.name;
                        this.cityPoint = [item.lng,item.lat];
                      //清空下小区地址
                      this.houseData.communityId = '';
                      this.communityName = '';
                    }
                });
            },
            getCity(){
                PublicAPI.getCityList().then(res=>{
                    // console.log(res)
                    if (res.code == 200){
                        this.cityList = res.data;
                        this.houseData.cityId = this.cityList[0].id;
                        this.houseData.cityName = this.cityList[0].name;
                        this.cityPoint = [this.cityList[0].lng,this.cityList[0].lat];
                    }
                })
            },
            isEmpty(){
                if (!this.houseData.communityId){
                    this.mustFillBorder = true
                }else{
                    this.mustFillBorder = false
                }
            },
            getCommunity(value){
                this.houseData.communityId = value.key;
                this.communityName = value.label;
                this.mustFillBorder = false;
            },
            focusCommunity(searchVal){
                if(searchVal== undefined||searchVal==''){
                    this.searchAddressHaveValue = false;
                    this.communityList = [];
                }else{
                    this.searchAddressHaveValue = true;
                }
            },
            selectCommunity(searchVal){
                this.searchCommunityVal = searchVal=='' ? undefined : searchVal;
                this.communityList = [];
                if(searchVal== undefined||searchVal==''){
                    this.searchAddressHaveValue = false;
                }else{
                    this.searchAddressHaveValue = true;
                }
                PublicAPI.searchCommunity(this.houseData.cityId,this.searchCommunityVal).then(res=>{
                    // console.log(res)
                    if (res.code == 200){
                        this.communityList = res.data;
                        //防止0
                        if(searchVal==undefined||searchVal==''){
                        }else{
                            this.communityList.forEach((item)=>{
                                const arr = item.name.split(searchVal);
                                if(arr.length > 2){
                                    item.have = 1;
                                    item.name1 = arr[0];
                                    let val = '';
                                    arr.forEach((v,i)=>{
                                        if(i>1){
                                            val += searchVal +v;
                                        }
                                    });
                                    item.name2 = searchVal;
                                    item.name3 = val;
                                }
                                else if(arr.length == 2){
                                    item.have = 1;
                                    item.name1 = arr[0];
                                    item.name2 = searchVal;
                                    item.name3 = arr[1];
                                }
                                else{
                                    item.have = 0;
                                }
                            });
                        }
                    }
                })
            },
            saveShareHouse(){
                // console.log(this.houseData)
                return new Promise((resolve, reject) => {
                    if (!this.houseData.communityId){
                        this.mustFillBorder = true;
                        this.$message.warning('请输入小区地址！');
                        reject()
                        return;
                    }else{
                        this.mustFillBorder = false;
                    }
                  if (!this.houseData.deptId){
                    this.$message.warning('请选择所属门店(部门)！');
                    reject()
                    return;
                  }
                    this.clickSave = true;
                    let mustKey = true;
                    let sendData = JSON.parse(JSON.stringify(this.houseData))
                    this.houseData.houseDataList.forEach((val,i)=>{
                        if (val.buildingNo==="" ||
                            val.doorplate==="" ||
                            val.currentFloor==="" ||
                            val.totalFloor==="" ||
                            val.room==="" ||
                            val.kitchen==="" ||
                            val.toilet==="" ||
                            val.livingRoom===""||
                            val.houseArea===""
                        ){
                            this.$message.warning('请输入必填信息！');
                            mustKey = false
                            reject()
                        }
                        val.roomDataList.forEach((value, index, array)=>{
                            if (value.roomName==="" ||
                                value.houseArea==="" ||
                                value.actualPrice===""
                            ){
                                this.$message.warning('请输入必填信息！');
                                mustKey = false
                                reject()
                            }else{
                                sendData.houseDataList[i].roomDataList[index].actualPrice =  Math.round(value.actualPrice * 100)
                            }
                        })
                    })
                    if (mustKey){
                        this.$emit('changeLoading',true);
                        API.addShareHouse(sendData).then(res=>{
                          this.$emit('changeLoading',false);
                            if(!res){
                              reject()
                            }
                            if (res.code == 200){
                                resolve()
                            }else{
                                this.$message.error('保存失败！');
                                reject()
                            }
                        },()=>{
                          this.$emit('changeLoading',false);
                            this.$message.error('保存失败！');
                            reject()
                        })
                    }
                })
            },
            onChangeElevator(e){
                this.houseData.isHaveElevator = e.target.checked ? 1 : 0;
            }
            ,
            onChangeGasType(e){
                this.houseData.gasType = e.target.checked ? 1 : 2;
            },
            addChildHouse(houseIndex){
                let houseDataList = this.houseData.houseDataList[houseIndex];
                let obj = Object.assign({},this.copyChildHouse);
                //若主间存在核验码，自动带出
                if(houseDataList.checkCode){
                  obj.checkCode = houseDataList.checkCode;
                }
                houseDataList.roomDataList.push(obj);
                houseDataList.room = houseDataList.roomDataList.length;
            },
            showPic(list,houseIndex,roomIndex,currentSelectType){
                if (currentSelectType == 'house'){
                    this.picModalTitle = '公区图片';
                    this.uploadParms.bizType = 1;
                }else{
                    this.picModalTitle = '房源图片';
                    this.uploadParms.bizType = 13;
                }
                this.currentSelectHouseIndex = houseIndex;
                this.currentSelectRoomIndex = roomIndex;
                this.currentSelectType = currentSelectType
                this.showPicDialog = true;
                this.picList = [];
                this.picList.push(...list);
                this.picList.forEach((item)=>{
                    item.bizId = item.id;
                    item.notRealDelete = true;
                });
            },
            savePic(){
                let picList = [...this.$refs.publicPic.picsList];
                if (this.currentSelectType == 'house'){
                    let index = this.currentSelectHouseIndex;
                    this.houseData.houseDataList[index].pubAreaPicObjList = picList;
                    this.houseData.houseDataList[index].pubAreaPicIdList = [];
                    picList.forEach((val,i)=>{
                        this.houseData.houseDataList[index].pubAreaPicIdList.push(val.id)
                    })
                }else{
                    let houseIndex = this.currentSelectHouseIndex;
                    let roomIndex = this.currentSelectRoomIndex;
                    let roomDataList = this.houseData.houseDataList[houseIndex].roomDataList[roomIndex];
                    roomDataList.roomPicIdList = [];
                    roomDataList.roomPicObjList = picList;
                    picList.forEach((val,i)=>{
                        roomDataList.roomPicIdList.push(val.id)
                    })
                }
                this.showPicDialog = false;

            },
            saveShowMore(){
              let index = this.currentSelectHouseIndex;
              let roomIndex = this.currentSelectRoomIndex;
              if(this.currentMoreInfo.flag){
                if(this.currentMoreInfo.vrUrl){
                  this.houseData.houseDataList[index].vrUrl = this.currentMoreInfo.vrUrl;
                }
                if(this.currentMoreInfo.comment){
                  this.houseData.houseDataList[index].comment = this.currentMoreInfo.comment;
                }
                else{
                  this.houseData.houseDataList[index].comment = "";
                }
                if(this.currentMoreInfo.checkCode){
                  this.houseData.houseDataList[index].checkCode = this.currentMoreInfo.checkCode;
                  //若主间存在核验码，自动带出
                  this.houseData.houseDataList[index].roomDataList.forEach((item)=>{
                    if(!item.checkCode){
                      item.checkCode = this.currentMoreInfo.checkCode;
                    }
                  });
                }
                else{
                  this.houseData.houseDataList[index].checkCode = "";
                }
                if(this.currentMoreInfo.lableList&&this.currentMoreInfo.lableList.length>0){
                  this.houseData.houseDataList[index].lableList = this.currentMoreInfo.lableList;
                }
                else{
                  this.houseData.houseDataList[index].lableList = [];
                }
              }
              else{
                if(this.currentMoreInfo.comment){
                  this.houseData.houseDataList[index].roomDataList[roomIndex].comment = this.currentMoreInfo.comment;
                }
                else{
                  this.houseData.houseDataList[index].roomDataList[roomIndex].comment = "";
                }
                if(this.currentMoreInfo.checkCode){
                  this.houseData.houseDataList[index].roomDataList[roomIndex].checkCode = this.currentMoreInfo.checkCode;
                }
                else{
                  this.houseData.houseDataList[index].roomDataList[roomIndex].checkCode = "";
                }
              }

              //还原
              this.currentMoreInfo =
              {
                vrUrl: '',
                checkCode:'',
                comment:'',
                lableList:[],
                flag:true,
              };
              this.houseLableInput = '';
              this.showMoreDialog= false;
            },
            saveHouseConfig(modifyConfig){
                let index = this.currentSelectHouseIndex;
                this.houseData.houseDataList[index].pubAreaGoodsList = modifyConfig;
                this.currentConfig = modifyConfig;
                this.editConfigDialog1 = false;
                this.editConfigDialog2 = false;
            },
            saveRoomConfig(modifyConfig){
                let houseIndex = this.currentSelectHouseIndex;
                let roomIndex = this.currentSelectRoomIndex;
                this.houseData.houseDataList[houseIndex].roomDataList[roomIndex].roomGoodsList = modifyConfig;
                this.currentConfig = modifyConfig;
                this.editConfigDialog1 = false;
                this.editConfigDialog2 = false;
            },
            saveTagConfig(){
                let houseIndex = this.currentSelectHouseIndex;
                let roomIndex = this.currentSelectRoomIndex;
                let tagList = [];
                this.houseTagConfig.forEach((value, index, array)=>{
                    this.currentTag.forEach((val,i)=>{
                        if (value.id == val&&val!='####'){
                            tagList.push(value.name);
                        }
                    })
                })
                this.houseData.houseDataList[houseIndex].roomDataList[roomIndex].tagList = tagList;     // 房源标签传给后台的是名称，不是ID
                this.showTagConfigDialog = false;
            },
            saveTitle(){
                let houseIndex = this.currentSelectHouseIndex;
                let roomIndex = this.currentSelectRoomIndex;
                this.houseData.houseDataList[houseIndex].roomDataList[roomIndex].title = this.textAreaVal_title;
                this.houseData.houseDataList[houseIndex].roomDataList[roomIndex].promotionDesc = this.textAreaVal_desc;
                this.showTitleDialog = false;
            },
            publicConfigChange(checkedValues,module){
                let pos = checkedValues.indexOf('####');
                if(pos > -1){
                    this.currentTag = []
                    if(checkedValues.length >= this.houseTagConfigSize){
                        let cancelSelectAll =false;
                        //判断是否全选
                        this.houseTagConfig.forEach((item)=>{
                            if(item.id=='####'&& item.checked == false){
                                cancelSelectAll = true;
                            }
                        });
                        if(cancelSelectAll){
                            this.houseTagConfig.forEach((item) => {
                                this.currentTag.push(item.id);
                                item.checked = true;
                            });
                            this.houseTagConfig.forEach((item)=>{
                                this.currentTag.push(item.id);
                                item.checked = true;
                            });
                        }else {
                            this.houseTagConfig.forEach((item)=>{
                                let pos = checkedValues.indexOf(item.id);
                                if(pos > -1&&item.id!='####'){
                                    item.checked = true;
                                    this.currentTag.push(item.id);
                                }
                                if(item.id=='####'){
                                    item.checked = false;
                                }
                            });
                        }

                    }else{
                        this.houseTagConfig.forEach((item)=>{
                            this.currentTag.push(item.id);
                            item.checked = true;
                        });
                    }
                }else{
                    if(checkedValues.length == this.houseTagConfigSize){
                        //判断是全选，还是取消全选
                        let cancelSelectAll = false;
                        this.houseTagConfig.forEach((item)=>{
                            if(item.id=='####'&& item.checked == true){
                                cancelSelectAll = true;
                            }
                        });
                        if(cancelSelectAll){
                            this.currentTag = [];
                            this.houseTagConfig.forEach((item)=>{
                                item.checked = false;
                            });
                        }else{
                            this.currentTag.push('####');
                            this.houseTagConfig.forEach((item)=>{
                                item.checked = true;
                            });
                        }
                    }else{
                        this.currentTag = checkedValues;
                        this.houseTagConfig.forEach((item)=>{
                            let pos = this.currentTag.indexOf(item.id);
                            if(pos > -1){
                                item.checked = true;
                            }
                        });
                    }
                }
            },
            showHouseConfigModal(index){
                if(this.configRelationFlag){
                  this.editConfigDialog2 = true;
                }
                else {
                  this.editConfigDialog1 = true;
                }
                this.fromType = 'house';
                this.editConfigTitle = '编辑公共配置';
                this.currentSelectHouseIndex = index;
                this.currentConfig = this.houseData.houseDataList[index].pubAreaGoodsList;
            },
            showMoreModal(index,flag,roomIndex){
              this.showMoreDialog = true;
              this.currentSelectHouseIndex = index;
              this.currentClickIndex = undefined;
              //flag:是否是主间
              if(flag){
                let temp = [];
                this.houseData.houseDataList[index].lableList.forEach((item)=>{
                  temp.push(item);
                });
                this.currentMoreInfo = {
                  vrUrl:this.houseData.houseDataList[index].vrUrl,
                  checkCode:this.houseData.houseDataList[index].checkCode,
                  lableList:temp,
                  comment:this.houseData.houseDataList[index].comment,
                  flag:flag,
                };
              }
              else{
                this.currentSelectRoomIndex = roomIndex;
                this.currentMoreInfo = {
                  checkCode:this.houseData.houseDataList[index].roomDataList[roomIndex].checkCode,
                  comment:this.houseData.houseDataList[index].roomDataList[roomIndex].comment,
                  flag:flag,
                };
              }
            },
            showRoomConfigModal(houseIndex,roomIndex){
                if(this.configRelationFlag){
                  this.editConfigDialog2 = true;
                }
                else {
                  this.editConfigDialog1 = true;
                }
                this.fromType = 'room';
                this.editConfigTitle = '编辑房屋配置';
                this.currentSelectHouseIndex = houseIndex;
                this.currentSelectRoomIndex = roomIndex;
                this.currentConfig = this.houseData.houseDataList[houseIndex].roomDataList[roomIndex].roomGoodsList;
            },
            showTagConfigModal(houseIndex,roomIndex){
                this.showTagConfigDialog = true;
                this.currentSelectHouseIndex = houseIndex;
                this.currentSelectRoomIndex = roomIndex;
                let temp = [];
                this.houseTagConfig.forEach((value, index, array)=>{
                    this.houseData.houseDataList[houseIndex].roomDataList[roomIndex].tagList.forEach((val,i)=>{
                        if (value.name == val&&val!='####'){
                            temp.push(value.id)
                        }
                    })
                })
                this.currentTag = temp;
                if(this.currentTag.length == this.houseTagConfigSize){
                    this.currentTag.push('####');
                }
            },
            showRoomTitleModal(houseIndex,roomIndex){
                this.showTitleDialog = true;
                this.currentSelectHouseIndex = houseIndex;
                this.currentSelectRoomIndex = roomIndex;
                this.textAreaVal_title = this.houseData.houseDataList[houseIndex].roomDataList[roomIndex].title;
                this.textAreaVal_desc = this.houseData.houseDataList[houseIndex].roomDataList[roomIndex].promotionDesc;
            },
            // 获取字典
            getDictionaryList(){
                // 特色
                PublicAPI.getTagDictionary().then(res=>{
                    // console.log(res)
                    if (res.code == 200){
                        let  tempData  = res.data;
                        this.houseTagConfigSize = tempData.length;
                        let temp = {
                            id:'####',
                            name:'全选/取消',
                            checked:false,
                        }
                        this.houseTagConfig.push(temp);
                        tempData.forEach((item)=>{
                            item.checked = false;
                            this.houseTagConfig.push(item);
                        })
                    }
                })
                // 公区配置、房间配置
                let parameter = {
                  houseId:'',
                };
                PublicAPI.getHouseConfig(parameter).then(res=>{
                  if (res.code == 200){
                    let tempData = res.data;
                    tempData.forEach((item)=>{
                      item.checked = false;
                      this.housePublicConfig.push(item);
                    })
                  }
                })
            },
            saveFastSet(){
                this.fastSetDialog = false;
                this.fastSetData = Object.assign({},this.$refs.fastSet.fastSetDataConfig);
                //判断是否强关联
                if(this.configRelationFlag){
                  //强关联不变更配置
                  this.fastSetData.publicConfig = [];
                  this.fastSetData.roomConfig = [];
                }
                else{
                  let houseConfig = [];
                  this.$refs.fastSet.showHouseConfig.forEach((item)=>{
                    if(item.checked){
                      houseConfig.push(item)
                    }
                  });
                  this.fastSetData.publicConfig = houseConfig;
                  let roomConfig = [];
                  this.$refs.fastSet.showRoomConfig.forEach((item)=>{
                    if(item.checked){
                      roomConfig.push(item)
                    }
                  });
                  this.fastSetData.roomConfig = roomConfig;
                }
                this.fastSetData.publicPic = [...this.$refs.fastSet.$refs.uploadPublicPicList.picsList]
                this.fastSetData.roomPic = [...this.$refs.fastSet.$refs.uploadRoomPicList.picsList]
                this.houseData.houseDataList.forEach((value)=>{
                  if(this.fastSetData.publicConfig.length>0){
                    value.pubAreaGoodsList = this.fastSetData.publicConfig
                  }
                  value.roomDataList.forEach((val)=>{
                      if(this.fastSetData.roomConfig.length>0){
                        val.roomGoodsList = this.fastSetData.roomConfig
                      }
                      if(this.fastSetData.tagConfig.length>0){
                        val.tagList = this.fastSetData.tagConfig;
                      }
                      if(this.fastSetData.title){
                        val.title = this.fastSetData.title
                      }
                      if(this.fastSetData.desc){
                        val.promotionDesc = this.fastSetData.desc
                      }
                      if(this.fastSetData.roomPic.length>0){
                        val.roomPicObjList = this.fastSetData.roomPic
                        val.roomPicIdList = [];
                        this.fastSetData.roomPic.forEach((v)=>{
                          val.roomPicIdList.push(v.id)
                        })
                      }
                  })
                  if(this.fastSetData.publicPic.length>0){
                    value.pubAreaPicObjList = this.fastSetData.publicPic
                    value.pubAreaPicIdList = [];
                    this.fastSetData.publicPic.forEach((val)=>{
                      value.pubAreaPicIdList.push(val.id)
                    })
                  }
                })
            },
            changeRoomNum(index){
                let val = event.target.value;
                if (val < 11 && val > 1){
                    let len = this.houseData.houseDataList[index].roomDataList.length;
                    let roomDataList = this.houseData.houseDataList[index].roomDataList;
                    if (val < len){
                        roomDataList.length = val
                    }
                    if (val > len){
                        for (let i = 0; i < (val-len); i++){
                            let item = Object.assign({},this.copyHouse.roomDataList[1]);
                            roomDataList.push(item)
                        }
                    }
                }
            },
            selectDept(selectObj){
              if (selectObj.type == 'dept') {
                  this.houseData.deptId = selectObj.id;
                  this.userInfo.deptName = selectObj.name;
                  this.bizDecisionGet(selectObj.id);
              }
              if(!selectObj.type&&!selectObj.name){
                this.houseData.deptId = '';
                this.userInfo.deptName = '';
                this.configRelationFlag = false;
              }
            },
          selectDeptEmp(selectObj){
            if (selectObj.type == 'employee') {
              this.houseData.maintainerId = selectObj.id;
              this.userInfo.info = selectObj.name;
            }
            if(!selectObj.type&&!selectObj.name){
              this.houseData.maintainerId = '';
              this.userInfo.info = '';
            }
          },
        }

    }
</script>

<style scoped lang="less">
    .add-share-house{
        padding: 0 20px 20px 20px;
        height: calc(100vh - 150px);
        overflow: auto;
        .title-opt{
            margin-left: 20px;
            font-size: 16px;
            cursor: pointer;
        }
        h3{
            font-weight: 500;
            height: 44px;
            line-height: 44px;
        }
        &>div{
            margin-bottom: 20px;
        }
        .house-model{
          .itemStyle{
            width: 275px;
            height: 70px;
            border-radius: 5px;
            margin:0px 15px 0px 0;
            padding: 10px 0px 4px 10px;
            box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
            position: relative;
            .triangle-top-right-choose {
              position: absolute;
              color: #FFFFFF;
              top: 2px;
              right: 2px;
            }
            .triangle-top-right-click {
              position: absolute;
              width: 0;
              border: 16px solid #0A87F8;
              border-bottom: 16px solid transparent;
              border-left: 16px solid transparent;
              border-top-right-radius: 4px;
              top: 0px;
              right: 0px;
            }
            svg{
              width: 15px;
              height: 15px;
              color: #ffffff;
            }
          }
          .unClickStyle{
            background: #FFFFFF;
          }
          .clickStyle{
            box-shadow: 0px 2px 8px 0px rgba(2, 19, 34, 0.1);
            border: 1px solid #0A87F8;
            background: #F5FAFF;
          }
        }
        .address{
            position: relative;
            display: flex;
            width: calc(50% - 15px);
            /deep/ .ant-select-selection-selected-value{
                span{
                    color: rgba(0, 0, 0, 0.65) !important;
                }
                p{
                    display: none;
                }
            }
            .must-fill-border{
                & /deep/ .ant-select-selection{
                    border-bottom: 1px solid red;
                }
            }
            .tips-must-fill{
                position: absolute;
                left: 100px;
                bottom: -20px;
                color: red;
            }
            /deep/ .ant-select-dropdown--empty{
                display: none;
            }
        }
        .village-info{
            display: flex;

            .title{
                color: @secondaryFontColor;
                font-size: 12px;
            }
            &>div{
                flex: 1;
                margin-right: 30px;
            }
            &>div:last-child{
                display: flex;
                align-items: center;
            }
        }
        .house-list{
            .house-item{
                margin-bottom: 20px;
                .delete-icon{
                    color: red;
                    font-size: 14px;
                }
                .house-detail{
                    border-left: 1px solid @borderColor;
                    border-top: 1px solid @borderColor;
                    text-align: center;
                    font-size: 12px;
                    .house-title{
                        display: flex;
                        background-color: @themeBgColor;
                        & > div{
                            flex: 1;
                            height: 40px;
                            line-height: 40px;
                            border-right: 1px solid @borderColor;
                            border-bottom: 1px solid @borderColor;
                        }
                        .must-fill{
                            color: #FB4246;
                        }
                    }
                    .house-data{
                        position: relative;
                        display: flex;
                        & > div{
                            flex: 1;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            border-right: 1px solid @borderColor;
                            border-bottom: 1px solid @borderColor;
                            background-color: #ffffff;
                            .popover:hover{
                                height: 39px;
                                line-height: 38px;
                                border: 1px solid @themeColor;
                                cursor: pointer;
                            }
                        }
                        input{
                            text-align: center;
                            height: 100%;
                        }
                        input:focus{
                            border: 1px solid @themeColor!important;
                        }
                        .select-border{
                            border: 1px solid @themeColor;
                        }
                        .show-pic{
                            .pic-list{
                                display: flex;
                                flex-wrap: wrap;
                                margin-bottom: 5px;
                                /*justify-content: space-around;*/
                                max-width: 315px;
                                margin-right: -5px;
                              /deep/ video{
                                width: 98px;
                                height: 68px;
                              }
                                li{
                                    position: relative;
                                    div{
                                        width: 100px;
                                        height: 68px;
                                        line-height: 68px;
                                        border: 1px solid #eeeeee;
                                        background-color: #f6f7f8;
                                        margin: 5px 5px 0 0;
                                        border-radius: 6px;
                                        text-align: center;
                                        overflow: hidden;
                                        img{
                                            width: auto;
                                            max-width: 100px;
                                            height: auto;
                                            max-height: 68px;
                                            overflow: hidden;
                                        }
                                    }
                                    span{
                                        position: absolute;
                                        left: -10px;
                                        top: 3px;
                                        font-size: 12px;
                                        transform: scale(0.8);
                                        display: inline-block;
                                        background: rgba(0, 0, 0, 0.6);
                                        border-radius: 5px 0px 5px 0px;
                                        color: #fff;max-width: 100px;
                                    }
                                }
                            }
                        }
                        .options{
                            i,span{
                                display: inline-block;
                                width: 50%;
                                height: 39px;
                                cursor: pointer;
                            }
                            i{
                                line-height: 39px;
                                font-size: 14px;
                            }
                            span{
                                padding: 3px 4px;
                                line-height: 18px;
                                background-color: #DCEFFF;
                                color: @themeColor;
                            }
                        }
                    }
                }
                .house-child{
                    border: 1px solid @borderColor;
                    border-top: none;
                    padding: 0 15px 15px 15px;
                    background-color: @bigBackgroundColor;
                    h3{
                        font-size: 12px;
                        p{
                            color: @themeColor;
                        }
                    }
                    .house-title{
                        background-color: @bigBackgroundColor;
                    }
                    .add-child{
                        font-size: 12px;
                        cursor: pointer;
                        span{
                            margin-right: 6px;
                        }
                        i{
                            font-size: 14px;
                        }
                    }
                }
            }
          .showMoreModalStyle{
            max-height: 400px;
            overflow-y: auto;
            /deep/ .label-item .title{
              font-size: 14px;
              color: #111111;
            }
          }
        }
        .continue-add{
            text-align: center;
            p{
                display: inline-block;
                padding: 4px 100px;
                border: 1px dashed @borderColor;
                cursor: pointer;
                span{
                    color: @themeColor;
                }
                .add{
                    padding-left: 10px;
                }
                &:hover{
                    border-color: @themeColor;
                }
            }

        }
        &/deep/ .label-item .ant-select-selection__rendered{
          margin-left:0;
        }

    }
    .public-config{
        label{
            width: 96px;
            margin: 10px 0;
        }
    }

    .houseAlias{
        display: inline-block;
        margin-bottom: 5px;
    }
    .smallIconStyle{
      svg{
        width: 10.5px;
        height: 10.5px;
      }
    }
    .itemLableStyle{
      color: #111111;
      font-size: 12px;
      background: #F0F8FF;
      border-radius:4px;
      height: 22px;
      line-height: 23px;
      padding: 0 5px;
      margin-right: 5px;
    }
    .poperLabelStyle2{
      position: absolute;
      padding: 10px 10px 10px 10px;
      width:470px;
      min-height:60px;
      left:10px;
      top:-20px;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1);
      border-radius:4px;
      border:1px solid rgba(238,238,238,1);
      z-index: 99;
    }
    .selectDemandLabelItem{
      height: 24px;
      line-height: 24px;
      padding: 0 5px;
      font-size: 12px;
      color: #111111;
      border-radius:4px;
      margin-top: 8px;
      margin-right: 5px;
      text-align:center;
      background:#F0F8FF;
    }
    .realStyle{
      color: #0A87F8;
      svg{
        width: 55px;
        height: 20px;
      }
    }
    .moreStyle{
      /deep/ .label-item .title .ft-bolder{
        height: 45px;
      }
    }
</style>
