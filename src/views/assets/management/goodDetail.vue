<template>
  <div class="goodDetail-box clearfix">
    <div class="left-detail f-fl">
      <div class="houseStyle" v-if="goodDetails.houseId">
        物品地址：{{goodDetails.houseAlias?goodDetails.houseAlias+'/':''}}{{goodDetails.allFullAddress}}
      </div>
      <div class="top f-clearfix">
        <div class="f-fl title">
          <span class="bgColorStyle animate-box" style="margin-top: 9px;width: 44px;height: 44px;border-radius: 50%;margin-right: 10px;" v-show="skeletonLoading"></span>
          <span class="radius-font status1" style="margin-top: 9px" v-if="goodDetails.status==1&&!skeletonLoading"><icon-font type="iconzichan" /></span>
          <span class="radius-font status2" style="margin-top: 9px" v-else-if="goodDetails.status==2&&!skeletonLoading"><icon-font type="iconzichan" /></span>
          <span class="radius-font status3" style="margin-top: 9px" v-else-if="goodDetails.status==3&&!skeletonLoading"><icon-font type="iconzichan" /></span>
          <span class="radius-font status3" style="margin-top: 9px" v-else-if="goodDetails.status==4&&!skeletonLoading"><icon-font type="iconzichan" /></span>
          <span class="radius-font status4" style="margin-top: 9px" v-else-if="goodDetails.status==5&&!skeletonLoading"><icon-font type="iconzichan" /></span>
          <span class="radius-font status4" style="margin-top: 9px" v-else-if="goodDetails.status==6&&!skeletonLoading"><icon-font type="iconzichan" /></span>
          <div>
            <label-item title="当前状态">
              <div class="bgColorStyle animate-box" v-show="skeletonLoading" style="width: 69px;height: 18px;"></div>
              <div v-if="goodDetails.status==1&&!skeletonLoading">闲置</div>
              <div v-else-if="goodDetails.status==2&&!skeletonLoading">使用中</div>
              <div v-else-if="goodDetails.status==3&&!skeletonLoading">已报废</div>
              <div v-else-if="goodDetails.status==4&&!skeletonLoading">遗失</div>
              <div v-else-if="goodDetails.status==5&&!skeletonLoading">未核对</div>
              <div v-else-if="goodDetails.status==6&&!skeletonLoading">归属地址异常</div>
            </label-item>
          </div>
        </div>
        <div class="f-fl detail">
          <div class="blank-box"></div>
          <div class="item" style="width:180px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-person">
                            <icon-font type="iconwupin1" />
                        </span>
            <label-item title="物品" :skeletonLoading="skeletonLoading">
              <div>{{originGoodDetails.goodsName|blankVal}}</div>
            </label-item>
          </div>
          <div class="item" style="width:180px">
                        <span style="margin-top: 7px;" class="radius-font radius-font-greed">
                            <icon-font type="icon-yumengtubiao_weixiubaojieleixing" />
                        </span>
            <label-item title="数量" :skeletonLoading="skeletonLoading">
              <div>{{originGoodDetails.quantity|blankVal}}</div>
            </label-item>
          </div>
        </div>
      </div>
      <div class="tabs-content">
        <a-tabs size="small" defaultActiveKey="1">
          <a-tab-pane key="1">
            <span slot="tab">
                <icon-font type="iconyumengtubiao_jibenxinxi" /> 物品信息
            </span>
            <div class="basic-info">
              <div class="input-info" :style="isEdit?'margin-top:8px':''">
                <label-item class="item margin1" title="物品类型" :skeletonLoading="skeletonLoading" :must-fill="isEdit?true:false">
                  <span v-show="!isEdit">{{goodDetails.goodsTypeName|blankVal}}</span>
                  <a-select v-show="isEdit" v-model="goodDetails.goodsTypeId" placeholder="请选择" @change="handleGoodsType">
                    <a-select-option v-for="(item) in goodTypeList" :key="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </label-item>
                <label-item class="item margin1" title="物品" :skeletonLoading="skeletonLoading" :must-fill="isEdit?true:false">
                  <span v-show="!isEdit">{{goodDetails.goodsName|blankVal}}</span>
                  <a-select v-show="isEdit" v-model="goodDetails.goodsId" placeholder="请选择">
                    <a-select-option v-for="(item) in goodList" :key="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </label-item>
                <label-item class="item margin2" title="数量" :skeletonLoading="skeletonLoading" :must-fill="isEdit?true:false">
                  <span v-show="!isEdit">{{goodDetails.quantity|blankVal}}</span>
                  <a-input v-show="isEdit" v-model="goodDetails.quantity" placeholder="请输入" :disabled="true"/>
                </label-item>
                <label-item class="item margin1" title="物品单价" :skeletonLoading="skeletonLoading" :must-fill="isEdit?true:false">
                  <span v-show="!isEdit">{{goodDetails.unitPrice|blankVal}}</span>
                  <a-input v-show="isEdit" placeholder="请输入" v-model="goodDetails.unitPrice" v-validate="'money|min(1)|max(999999.99)'" />
                </label-item>
                <label-item class="item margin1" title="品牌" :skeletonLoading="skeletonLoading">
                  <span v-show="!isEdit">{{goodDetails.brandName|blankVal}}</span>
                  <a-select v-show="isEdit" :showSearch="true" :filterOption="(inputValue,option)=>filterOptionBrand(inputValue,option)" v-model="goodDetails.brandId" placeholder="请选择" @change="selectBrand">
                    <a-select-option v-for="(item) in brandList" :key="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </label-item>
                <label-item class="item margin2" title="型号" :skeletonLoading="skeletonLoading">
                  <span v-show="!isEdit">{{goodDetails.model|blankVal}}</span>
                  <a-input v-show="isEdit" placeholder="请输入" v-model="goodDetails.model"/>
                </label-item>
                <label-item class="item margin1" title="规格" :skeletonLoading="skeletonLoading">
                  <span v-show="!isEdit">{{goodDetails.specification|blankVal}}</span>
                  <a-input v-show="isEdit" placeholder="请输入" v-model="goodDetails.specification" />
                </label-item>
                <label-item class="item margin1" title="物品归属" :skeletonLoading="skeletonLoading" :must-fill="isEdit?true:false">
                  <span v-show="!isEdit">{{goodDetails.ownerTypeName|blankVal}}</span>
                  <a-select v-show="isEdit" v-model="goodDetails.ownerType" placeholder="请选择">
                    <a-select-option v-for="(item) in ownerTypeList" :key="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </label-item>
                <label-item class="item margin2" title="物品编号" :skeletonLoading="skeletonLoading">
                  <span v-show="!isEdit">{{goodDetails.serialNumber|blankVal}}</span>
                  <a-input v-show="isEdit" placeholder="请输入" v-model="goodDetails.serialNumber" :disabled="true" />
                </label-item>
                <label-item class="item margin1" title="购入日期" :skeletonLoading="skeletonLoading">
                  <span v-show="!isEdit">{{goodDetails.purchaseDate?$moment(goodDetails.purchaseDate).format('YYYY.MM.DD'):'-'}}</span>
                  <a-date-picker v-show="isEdit" placeholder="请选择购入日期" :allowClear="true" v-model="goodDetails.purchaseDate" :format="dateFormat"/>
                </label-item>
                <label-item class="item margin1" title="质保结束日期" :skeletonLoading="skeletonLoading">
                  <span v-show="!isEdit">{{goodDetails.warrantyDate?$moment(goodDetails.warrantyDate).format('YYYY.MM.DD'):'-'}}</span>
                  <a-date-picker v-show="isEdit" placeholder="请选择质保结束日期" :allowClear="true" v-model="goodDetails.warrantyDate" :format="dateFormat"/>
                </label-item>
                <label-item class="item margin2" title="质保电话" :skeletonLoading="skeletonLoading">
                  <span v-show="!isEdit">{{goodDetails.warrantyContact|blankVal}}</span>
                  <a-input v-show="isEdit" placeholder="请输入" v-model="goodDetails.warrantyContact"/>
                </label-item>
                <label-item class="item addressStyle clearfix" title="物品当前所在地" style="width: 100%;margin-right: 0;" :skeletonLoading="skeletonLoading" :must-fill="isEdit?true:false">
                  <span v-show="!isEdit&&goodDetails.locationType==1">房间/{{goodDetails.allFullAddress|blankVal}}</span>
                  <span v-show="!isEdit&&goodDetails.locationType==2">仓库/{{goodDetails.warehouseName|blankVal}}</span>
                  <span v-show="!isEdit&&!goodDetails.locationType">-</span>
                  <a-select v-if="isEdit" class="f-fl" :class="!goodDetails.locationType?'nullLocationTypeStyle':'locationTypeStyle'" v-model="goodDetails.locationType" placeholder="请选择" @change="selectLocationType">
                    <a-select-option v-for="(item) in positionList" :key="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                  <a-select v-if="isEdit&&goodDetails.locationType==1" class="f-fl communityListStyle" style="width: calc(100% - 86px);" v-model="goodDetails.allFullAddress" showSearch placeholder="请输入房源编号/小区地址/项目名称/门牌号信息检索房源"  :defaultActiveFirstOption="false" :showArrow="false" :filterOption="false" @change="getCommunity" @search="selectCommunity" >
                    <a-select-option v-for="(item) in communityList" :key="item.houseId">
                      {{ item.viewAddress }}
                    </a-select-option>
                  </a-select>
                  <a-select v-if="isEdit&&goodDetails.locationType==2" class="f-fl warehouseListStyle" :allowClear="true" style="width: calc(100% - 86px);" v-model="goodDetails.warehouseId" placeholder="请选择">
                    <a-select-option v-for="(item) in warehouseList" :key="item.id" :disabled="item.disabled">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </label-item>
                <label-item v-show="!isEdit" class="item" style="width: 100%;margin-right: 0px;" title="物品描述" :skeletonLoading="skeletonLoading">
                  <span>{{goodDetails.comment|blankVal}}</span>
                </label-item>
                <label-item v-if="isEdit" class="item" style="width: 100%;margin-right: 0px;" title="物品描述" :skeletonLoading="skeletonLoading" :maxSize="500" :valLength="goodDetails.comment.length">
                  <a-textarea maxlength="500" v-model="goodDetails.comment" autosize placeholder="请输入" />
                </label-item>
                <label-item class="item" style="width: 100%;margin-right: 0px;" title="物品图片" :skeletonLoading="skeletonLoading">
                  <div class="showImg f-clearfix" v-show="!isEdit">
                    <span v-if="!picList||picList.length == 0">-</span>
                    <div class="f-fl cursor" v-for="(item,i) in picList" :key="i">
                      <div><img :src="item.small" alt="" @click="handlePreview(item)"></div>
                    </div>
                  </div>
                  <own-upload v-if="isEdit" style="margin-top: 8px;" :showTips="false" :picList="picList" :uploadParms="uploadParms" ref="uploadPic" ></own-upload>
                </label-item>
              </div>
            </div>
            <div class="bottom">
              <span>{{goodDetails.creater}}创建于 {{$moment(goodDetails.createTime).format('lll')}}</span>
              <span>{{goodDetails.updater}}更新于 {{$moment(goodDetails.updateTime).format('lll')}}</span>
            </div>
          </a-tab-pane>
          <div v-show="!isEdit&&!skeletonLoading" slot="tabBarExtraContent" class="tabs-options">
            <div v-if="outterMarkList.indexOf('1')!=-1" @click="goDeployment">
              <icon-font type="iconyumengtubiao_qiehuanweiliebiao" />
              <span>&nbsp;调配</span>
            </div>
            <div v-if="outterMarkList.indexOf('2')!=-1" @click="editData(0)">
              <icon-font type="iconyumengtubiao_bianji-" />
              <span>&nbsp;编辑</span>
            </div>
            <div v-if="outterMarkList.indexOf('3')!=-1" @click="goScrap">
              <icon-font type="iconyumengtubiao_jinyong"/>
              <span>&nbsp;报废</span>
            </div>
            <div v-if="outterMarkList.indexOf('4')!=-1" @click="goLoss">
              <icon-font type="iconzhuanrugongke" />
              <span>&nbsp;遗失</span>
            </div>
            <div v-if="outterMarkList.indexOf('6')!=-1" @click="goChangeStatus">
              <icon-font type="iconyumengtubiao_jinyong" />
              <span>&nbsp;修改状态</span>
            </div>
            <div v-if="outterMarkList.indexOf('7')!=-1" @click="editData(1)">
              <icon-font type="iconqiyong" />
              <span>&nbsp;核对信息</span>
            </div>
            <div v-if="outterMarkList.indexOf('5')!=-1" @click="goDelete">
              <icon-font type="iconyumengtubiao_shanchu-" />
              <span>&nbsp;删除</span>
            </div>
            <a-popover :title="null" trigger="hover" placement="bottom" v-if="showMoreOperate">
              <template slot="content">
                <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('4')!=-1" @click.stop="goLoss" class="action cursor">遗失</div>
                <div style="width: 100%;text-align: center;" v-if="innerMarkList.indexOf('5')!=-1" @click.stop="goDelete" class="action cursor">删除</div>
              </template>
              <div><icon-font type="iconyumengtubiao_gengduo-1" />&nbsp;更多</div>
            </a-popover>
          </div>
          <div v-show="isEdit&&!skeletonLoading" slot="tabBarExtraContent" class="tabs-options" style="height:36px;">
            <span @click="cancelEdit" style="margin-top:6px;">取消</span>
            <span @click="save" style="margin-top:6px;">保存</span>
          </div>
        </a-tabs>
      </div>
    </div>
    <div class="right-detail f-fr">
      <a-tabs size="small" defaultActiveKey="1">
        <a-tab-pane key="1">
          <span slot="tab">
              操作记录
          </span>
          <div style="margin-top: 20px;"></div>
          <div class="skeletonLoadingListStyle" v-show="skeletonLoading">
            <div class="clearfix">
              <div class="f-fl">
                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
              </div>
              <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                <div class="clearfix" style="width: 100%">
                  <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                  <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                </div>
                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                </div>
              </div>
            </div>
            <div class="clearfix" style="margin-top: 25px">
              <div class="f-fl">
                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
              </div>
              <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                <div class="clearfix" style="width: 100%">
                  <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                  <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                </div>
                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                </div>
              </div>
            </div>
            <div class="clearfix" style="margin-top: 25px">
              <div class="f-fl">
                <div class="bgColorStyle animate-box" style="width:32px;height: 32px;border-radius: 50%"></div>
              </div>
              <div class="f-fl" style="margin-left: 10px;width: calc(100% - 42px)">
                <div class="clearfix" style="width: 100%">
                  <div class="bgColorStyle animate-box f-fl" style="width: 51px;height: 20px;"></div>
                  <div class="bgColorStyle animate-box f-fr" style="width: 115px;height: 17px;"></div>
                </div>
                <div class="bgColorStyle animate-box" style="width: 100%;height: 36px;margin-top:7px">
                </div>
              </div>
            </div>
          </div>
          <a-empty v-show="followUpList&&followUpList.length === 0&&!skeletonLoading" style="margin-top:100px;"/>
          <div class="content-follow" v-for="(followUp,index) in followUpList" :key="index" v-show="!skeletonLoading" :style="index==0?'margin-top: 10px;':''">
            <div class="content-follow-type">
                            <span class="content-follow-type1" style="background-color: rgba(10, 135, 248, 0.1);">
                              <span class="content-follow-type2" style="background-color: rgba(10, 135, 248);"></span>
                            </span>
              <div class="content-follow-left-line" v-if="index<followUpList.length-1"></div>
            </div>
            <div class="content-follow-right">
              <div class="follow-right-line-one clearfix">
                <div class="name f-fl">{{followUp.createrName}}</div>
                <div class="followType f-fl">{{followUp.operationTypeName}}</div>
                <div class="date f-fr">{{$moment(followUp.createTime).format('YYYY.MM.DD HH:mm')}}</div>
              </div>
              <div class="follow-right-line-two" style="width: 100%;margin-top: 6px;">
                <span>{{followUp.operationType|operationTypeVal}}</span>
                <!-- 新增 -->
                <span class="otherColorStyle" v-if="followUp.operationType==1&&followUp.recordInfoList.length>0" v-for="(item,index) in followUp.recordInfoList" :key="index">
                  {{item.head}}
                </span>
                <!-- 编辑 -->
                <span v-if="followUp.operationType==2&&followUp.recordInfoList.length>0" v-for="(item,index) in followUp.recordInfoList" :key="index">
                  <br/>
                  <span class="numberStyle">{{index+1}}</span><span>{{item.head}}</span><span class="otherColorStyle">「{{item.original}}」</span>
                  <span>{{item.linkValue}}</span><span class="otherColorStyle">「{{item.newValue}}」</span>{{ followUp.recordInfoList.length == (index+1)?'。':'；'}}
                </span>
                <!-- 调配 -->
                <span v-if="followUp.operationType==3&&followUp.recordInfoList.length>0" v-for="(item,index) in followUp.recordInfoList" :key="index">
                  <span>从</span><span class="otherColorStyle">「{{item.original}}」</span>
                  <span>调至</span><span class="otherColorStyle">「{{item.newValue}}」</span>
                </span>
                <!-- 修改状态 -->
                <span v-if="(followUp.operationType==4||followUp.operationType==7)&&followUp.recordInfoList.length>0" v-for="(item,index) in followUp.recordInfoList" :key="index">
                  <span>{{item.head}}</span><span class="otherColorStyle">「{{item.original}}」</span>
                  <span>{{item.linkValue}}</span><span class="otherColorStyle">「{{item.newValue}}」</span>
                </span>
                <!-- 报废 newValue有-报废至哪；无-直接丢弃 -->
                <span v-if="followUp.operationType==5&&followUp.recordInfoList.length>0" v-for="(item,index) in followUp.recordInfoList" :key="index">
                  <span v-if="item.newValue">
                    <span>{{item.head}}</span>
                    <span class="otherColorStyle"> {{item.newValue}}</span>
                  </span>
                  <span v-else class="otherColorStyle">{{item.head}}</span>
                </span>
                <!-- 遗失 -->
                <span v-if="followUp.operationType==6&&followUp.recordInfoList.length>0" v-for="(item,index) in followUp.recordInfoList" :key="index">
                  <span>{{item.head}}</span>
                  <span class="otherColorStyle"> {{item.newValue}}</span>
                </span>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
      <div class="contFoot" v-show="followUpList.length>0">
        <a-pagination size="small" v-model="pagination.current" :total="pagination.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination.pageSize" showSizeChanger @change="onSizeChange" @showSizeChange="onShowSizeChange" />
      </div>
    </div>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="800px" v-model="deploymentDialog" class="ownModalBorder titDialog" title="调配物品" @cancel="deploymentDialog=false;">
      <deployment :record="originGoodDetails" @cancelSave="cancelSave" @deploymentSuccess="addSuccess"></deployment>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="changeStatusDialog" class="ownModalBorder titDialog" title="修改状态" @cancel="changeStatusDialog=false;">
      <change-status :record="originGoodDetails" @cancelSave="cancelSave" @changeStatusSuccess="addSuccess"></change-status>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="lossDialog" class="ownModalBorder titDialog" title="遗失" @cancel="lossDialog=false;">
      <loss :record="originGoodDetails" @cancelSave="cancelSave" @lossSuccess="addSuccess"></loss>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="deleteDialog" class="ownModalBorder titDialog" title="删除" @cancel="deleteDialog=false;">
      <delete :record="originGoodDetails" @cancelSave="cancelSave" @deleteSuccess="addSuccess" @deleteAllSuccess="deleteAllSuccess"></delete>
    </a-modal>
    <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="scrapDialog" class="ownModalBorder titDialog" title="报废" @cancel="scrapDialog=false;">
      <scrap :record="originGoodDetails" @cancelSave="cancelSave" @scrapSuccess="addSuccess"></scrap>
    </a-modal>
    <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import Deployment from './deployment';
import ChangeStatus from './changeStatus';
import Loss from './loss';
import Delete from './delete';
import Scrap from './scrap';
import * as API from "@/api/assets";
import {dictionaryListDict, listEnableDict} from "@/api/contract";
import {searchHouse} from "@/api/reserve";

export default {
  name: "goodDetails",
  props: {
    record:{
      type:Object,
    }
  },
  components: {
    Deployment,
    ChangeStatus,
    Loss,
    Delete,
    Scrap,
  },
  data() {
    return {
      key:1,
      activekey: 1,
      isEdit: false,
      activeIndex: 0,
      goodDetails:{},
      originGoodDetails:{},
      picList:[],
      originPicList:[],
      skeletonLoading:false,
      showMoreOperate:false,
      outterMarkList:[],
      innerMarkList:[],
      followUpList:[],
      deploymentDialog:false,
      changeStatusDialog:false,
      lossDialog:false,
      deleteDialog:false,
      scrapDialog:false,
      ownerTypeList:[
        {id:1,name:'公司'},
        {id:2,name:'业主'},
      ],
      positionList:[
        {id:1,name:'房间'},
        {id:2,name:'库房'},
      ],
      communityList:[],
      warehouseList:[],
      dateFormat: 'YYYY.MM.DD',           //日期选择器格式
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,//每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
        showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
      },
      sendData: {
        current: 1,                     // 当前页数
        size: 10,                       // 每页返回的记录数量
        assetsId:'',
      },
      brandList:[],
      goodsTabsContent:[],
      goodListAll:[],
      goodTypeList:[],
      goodList:[],
      previewVisible: false,
      previewImage: '',
      uploadParms:{},
    }
  },
  created() {
    this.initData();
    this.getDictionaryList();
    this.warehouseListSimple();
  },
  mounted() {
    this.uploadParms = { //
      bizId: '', // 业务id
      bizType: 7, // 图片大类标识 物资管理
      subBizType: 1, // 图片子类标识
      orderIndex: 1 // 排序值
    }
  },
  methods: {
    selectLocationType(){
      if(this.originGoodDetails.locationType==1&&this.goodDetails.locationType==2){
        this.goodDetails.warehouseId = undefined;
      }
      else if(this.originGoodDetails.locationType==2&&this.goodDetails.locationType==1){
        this.goodDetails.allFullAddress = undefined;
      }
    },
    selectCommunity(searchVal) {
      let data = {
        fuzzyKeyword: searchVal,
        useBiz:7,
      }
      searchHouse(data).then(res => {
        if (res.code == "200") {
          if (res.data.length > 0) {
            this.communityList = res.data;
          } else {
            this.communityList = [];
          }
        }
      })
    },
    getCommunity(communityId) {
      this.goodDetails.houseId = communityId;
    },
    warehouseListSimple(){
      API.warehouseListSimple().then(res => {
        if (res.code == 200) {
          this.warehouseList = res.data;
        }
      })
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.origin;
      this.previewVisible = true;
    },
    selectBrand(value){
      if(!value){
        this.sendData.brandId = undefined;
      }
      else{
        this.sendData.brandId = value;
      }
    },
    filterOptionBrand(inputValue,option){
      if(!inputValue){
        return true;
      }
      return option.componentOptions.children[0].text.indexOf(inputValue) > -1;
    },
    handleGoodsType(){
      this.goodDetails.goodsId = undefined;
      this.goodListAll.forEach((item)=>{
        if(item.id == this.goodDetails.goodsTypeId){
          this.goodList = item.metaList;
        }
      });
    },
    getDictionaryList(){
      //获取商品
      const params = 'ITEMCONFIGURATION';
      dictionaryListDict(params).then(res => {
        if (res.code === "200") {
          let goodTypeList = [];
          let goodListAll = [];
          let goodList = [];
          res.data.forEach((item)=>{
            if(item.id == this.record.goodsTypeId){
              goodList = item.metaList;
            }
            let obj = {
              name:item.name,
              id:item.id,
            }
            goodTypeList.push(obj);
            let goodObj = {};
            goodObj.id = item.id;
            goodObj.metaList = item.metaList;
            goodListAll.push(goodObj);
          });
          this.goodTypeList = goodTypeList;
          this.goodListAll = goodListAll;
          this.goodList = goodList;
        }
      })
      let id = 'a5837757604d49cd8a64e8bf21d63a2b';
      // 品牌
      listEnableDict(id).then(res => {
        if (res.code == 200) {
          this.brandList = res.data;
        }
      })
    },
    onShowSizeChange(current, pageSize){
      this.sendData.current = current;
      this.sendData.size = pageSize;
      this.pagination.pageSize = pageSize;
      this.assetsOperateRecordList();
    },
    onSizeChange(current){
      this.sendData.current = current;
      this.assetsOperateRecordList();
    },
    addSuccess(){
      this.$emit('refreshinfoFun',true);
      this.cancelSave();
      this.initData();
    },
    deleteAllSuccess(){
      this.deleteDialog = false;
      this.$emit('deleteAllSuccess');
    },
    cancelSave(){
      this.deploymentDialog = false;
      this.changeStatusDialog = false;
      this.lossDialog = false;
      this.deleteDialog = false;
      this.scrapDialog = false;
    },
    getPermission(){
      //1、调配；2、编辑；3、报废；4、遗失；5、删除；6、修改状态
      let permissions = JSON.parse(sessionStorage.getItem('permissions'));
      let markArr = [];
      let btnArr = [];
      if(this.goodDetails.status==1||this.goodDetails.status==2||this.goodDetails.status==6){
        markArr.push('mk_assets_management_dp')
        markArr.push('mk_assets_management_bjwp');
        markArr.push('mk_assets_management_bf');
        markArr.push('mk_assets_management_ys');
        markArr.push('mk_assets_management_sc');
      }
      else if(this.goodDetails.status==3||this.goodDetails.status==4){
        markArr.push('mk_assets_management_xgzt');
        markArr.push('mk_assets_management_sc');
      }
      else if(this.goodDetails.status==5){
        markArr.push('mk_assets_management_hdxx');
        markArr.push('mk_assets_management_sc');
      }
      //判断资源权限
      markArr.forEach(ele => {
        permissions.some(function(value){
          if (ele == value.mark){
            if(value.mark == 'mk_assets_management_dp'){
              btnArr.push('1');
            }else if(value.mark == 'mk_assets_management_bjwp'){
              btnArr.push('2');
            }else if(value.mark == 'mk_assets_management_bf'){
              btnArr.push('3');
            }else if(value.mark == 'mk_assets_management_ys'){
              btnArr.push('4');
            }else if(value.mark == 'mk_assets_management_sc'){
              btnArr.push('5');
            }else if(value.mark == 'mk_assets_management_xgzt'){
              btnArr.push('6');
            }else if(value.mark == 'mk_assets_management_hdxx'){
              btnArr.push('7');
            }
            return true;
          }
        });
      });
      //显示更多逻辑
      this.outterMarkList = [];
      this.innerMarkList = [];
      if(btnArr.length>4){
        this.showMoreOperate = true;
        for (let i = 0; i < btnArr.length; i++) {
          if(i>2){
            this.innerMarkList.push(btnArr[i]);
          }
          else{
            this.outterMarkList.push(btnArr[i]);
          }
        }
      }
      else{
        this.showMoreOperate = false;
        this.outterMarkList = btnArr;
        this.innerMarkList = [];
      }
    },
    goDeployment(){
      this.deploymentDialog = true;
    },
    goEdit(){
      this.addGoodDialog = true;
    },
    goScrap(){
      this.scrapDialog = true;
    },
    goLoss(){
      this.lossDialog = true;
    },
    goChangeStatus(){
      this.changeStatusDialog = true;
    },
    goDelete(){
      this.deleteDialog = true;
    },
    editData(val){
      this.isEdit = true;
      this.goodDetails.isChecked = val;
    },
    cancelEdit(){
      this.isEdit = false;
      //还原基础数据
      this.goodDetails = Object.assign({},this.originGoodDetails);
      //还原物品下拉选项
      this.goodListAll.forEach((item)=>{
        if(item.id == this.goodDetails.goodsTypeId){
          this.goodList = item.metaList;
        }
      });
      //还原图片
      let picList = [];
      this.originPicList.forEach((item)=>{
        let obj = Object.assign({},item);
        picList.push(obj);
      });
      this.picList = picList;
    },
    save(){
      if(this.checkData()){
        return ;
      }
      let sendData = Object.assign({},this.goodDetails);
      sendData.unitPrice = sendData.unitPrice * 100;
      let picsList = [...this.$refs.uploadPic.picsList];
      let picsIdList = []
      if(picsList && picsList.length > 0) {
        picsList.forEach((val) => {
          picsIdList.push(val.id)
        })
        sendData.picIdList = picsIdList;
      }
      API.assetsEdit(sendData).then(res=>{
        if(res.code === '200'){
          if(this.goodDetails. isChecked==1){
            this.$message.success('物品信息核对成功');
          }
          else{
            this.$message.success('物品修改成功');
          }
          this.$emit('refreshinfoFun',true);
          this.isEdit = false;
          this.initData();
        }
        else{
          if(this.goodDetails. isChecked==1){
            this.$message.error('物品信息核对失败');
          }
          else{
            this.$message.error('物品修改失败');
          }
        }
      });
    },
    checkData(){
      let flag = false;
      if(!this.goodDetails.goodsTypeId){
        this.$message.warning('请选择物品类型');
        flag = true;
        return flag;
      }
      if(!this.goodDetails.goodsId){
        this.$message.warning('请选择物品类型');
        flag = true;
        return flag;
      }
      if(!this.goodDetails.quantity){
        this.$message.warning('请输入数量');
        flag = true;
        return flag;
      }
      if(!this.goodDetails.unitPrice||this.goodDetails.unitPrice==null){
        this.$message.warning('请输入单价');
        flag = true;
        return flag;
      }
      if(!this.goodDetails.ownerType){
        this.$message.warning('请选择物品归属方');
        flag = true;
        return flag;
      }
      if(this.goodDetails.locationType==1&&!this.goodDetails.houseId){
        this.$message.warning('请选择所在房间');
        flag = true;
        return flag;
      }
      if(this.goodDetails.locationType==2&&!this.goodDetails.warehouseId){
        this.$message.warning('请选择所在仓库');
        flag = true;
        return flag;
      }
      return flag;
    },
    assetsOperateRecordList(){
      this.sendData.assetsId = this.record.id;
      API.assetsOperateRecordList(this.sendData).then(res => {
        if (res.code == "200") {
          this.followUpList = res.data.records;
          this.pagination.total = res.data.total;
        }
      })
    },
    assetsView(){
      this.skeletonLoading = true;
      API.assetsView(this.record.id).then(res => {
        if (res.code == "200") {
          this.goodDetails = res.data;
          this.goodDetails.isDetail = true;
          if(this.goodDetails.unitPrice){
            this.goodDetails.unitPrice = this.goodDetails.unitPrice/100;
          }
          let goodsId = [];
          goodsId.push(this.goodDetails.goodsTypeId);
          goodsId.push(this.goodDetails.goodsId);
          this.goodsId = goodsId;
          if(!this.goodDetails.allFullAddress){
            this.goodDetails.allFullAddress = undefined;
          }
          if(!this.goodDetails.brandId){
            this.goodDetails.brandId = undefined;
          }
          if(!this.goodDetails.ownerType){
            this.goodDetails.ownerType = undefined;
          }
          if(!this.goodDetails.locationType){
            this.goodDetails.locationType = undefined;
          }
          if(!this.goodDetails.warehouseId){
            this.goodDetails.warehouseId = undefined;
          }
          if(this.goodDetails.purchaseDate){
            this.goodDetails.purchaseDate = this.$moment(this.goodDetails.purchaseDate);
          }
          if(this.goodDetails.warrantyDate){
            this.goodDetails.warrantyDate = this.$moment(this.goodDetails.warrantyDate);
          }
          if(this.goodDetails.picList&&this.goodDetails.picList.length>0){
            this.picList = this.goodDetails.picList;
            let originPicList = [];
            this.picList.forEach((item)=>{
              item.status='done';
              item.notRealDelete = true;
              let obj = Object.assign({},item);
              originPicList.push(obj);
            });
            this.originPicList = originPicList;
          }
          this.originGoodDetails = Object.assign({},this.goodDetails);
          this.getPermission();
          this.skeletonLoading = false;
        }
      })
    },
    initData(){
      this.assetsView();
      this.assetsOperateRecordList();
    },
  },
  filters: {
    blankVal(val){
      if(!val){
        return '-';
      }else{
        return  val;
      }
    },
    operationTypeVal(val){
      if(val==1){
        return '物品新增：';
      }
      else if(val==2){
        return '信息修改：';
      }
      else if(val==3){
        return '信息调配：';
      }
      else if(val==4){
        return '状态修改：';
      }
      else if(val==5){
        return '物品报废：';
      }
      else if(val==6){
        return '物品遗失：';
      }
    }
  },
  watch:{
  }
}
</script>

<style scoped lang="less">
.goodDetail-box {
  width: 1000px;
  background: rgba(247,248,251,1);
  position:relative;
  & /deep/ .form-input-item{
    margin-top: 10px;
  }
  & /deep/ .input-item-box{
    margin-top: 2px;
  }
  & /deep/ .ant-input {
    padding: 0 0 0 5px;
  }
  & /deep/ .ant-select-selection-selected-value{
    padding: 0 0 0 5px;
  }

  .line{
    width: 100%;
    border: 0.5px solid #DDDDDD;
  }
  .left-detail {
    width: 640px;
    height: calc(100vh - 100px);
    overflow: auto;
    background: #FFFFFF;
    .houseStyle{
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #E9F1FF;
      padding-left: 20px;
    }
    .top {
      padding: 20px 20px 0 20px;
      .title {
        display: flex;
        align-items: center;
        width: 180px;
        padding-bottom: 10px;
        border-right: 1px dashed @borderColor;
        .radius-font {
          width: 44px;
          height: 44px;
          line-height: 44px;
          border-radius: 50%;
          font-size:20px;
        }
        .status1 {
          background: #FFF7ED;
          color: #FFA036;
        }
        .status2 {
          background: rgba(10, 135, 248, 0.1);
          color: #0A87F8;
        }
        .status3 {
          background: rgba(119, 119, 119, 0.1);
          color: #777777;
        }
        .status4 {
          background: rgba(254, 60, 56, 0.1);
          color: #FE3C38;
        }
        >div{
          div{
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(17,17,17,1);
          }
        }
      }
      .detail {
        display: flex;
        width: calc(100% - 200px);
        flex-wrap: wrap;
        .item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          width: 200px;
          font-size: 12px; // padding-left: 40px;
          input {
            width: 186px;
            padding-right: 10px;
          }
          & /deep/ .ant-select {
            width: 180px;
          }
          .radius-font {
            font-size:18px;
          }
          p{
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
          }
          >div{
            div{
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(17,17,17,1);
            }
          }
        }
        .blank-box {
          width: 20px;
          height: 30px;
        }
      }
    }
    .tabs-content {
      & /deep/ .ant-tabs-bar{
        margin: 0 18px;
      }
      // padding: 0 18px;
      .basic-info {
        padding: 0 18px;
        // min-height: 410px;
        // min-height: calc(100vh - 282px);
        .input-info {
          display: flex;
          flex-wrap: wrap;
          .margin1{
            margin-right: 20px;
          }
          .margin2{
            margin-right: 0px;
          }
          .item {
            width: 186px;
            margin-bottom: 20px;
            & /deep/ .title {
              margin-bottom: 4px;
            }
            & /deep/ .ant-select {
              width: 100%;
            }
          }
          .showImg {
            >div {
              height: 66px;
              width: 105px;
              margin-right: 10px;
              margin-bottom: 10px;
              >div{
                width: 100%;
                height: 100%;
                line-height: 66px;
                border: 1px solid #eeeeee;
                background-color: #f6f7f8;
                text-align: center;
                border-radius: 6px;
                overflow: hidden;
                img {
                  width: auto;
                  max-width: 105px;
                  height: auto;
                  max-height: 66px;
                  overflow: hidden;
                }
              }
              p {
                color: rgba(119, 119, 119, 1);
                font-size: 12px;
                text-align: center;
                margin-top: 5px;
              }
            }
            >div:last-child{
              margin-right: 0px;
            }
          }
          .addressStyle{
            .locationTypeStyle{
              width: 86px;
              /deep/ .ant-select-selection {
                border-right: none;
                border-radius: 4px 0 0 4px;
              }
            }
            .nullLocationTypeStyle{
              width: 169px;
            }
            .communityListStyle{
              /deep/ .ant-select-selection{
                border-left: none;
                border-radius: 0 4px 4px 0;
              }
            }
            .warehouseListStyle{
              /deep/ .ant-select-selection{
                border-left: none;
                border-radius: 0 4px 4px 0;
              }
            }
          }
        }
      }
    }
  }
  .right-detail{
    padding:0 0px 50px 25px;
    width: 352px;
    height: calc(100vh - 100px);
    background: #FFFFFF;
    overflow: auto;
    position: relative;
    .contFoot{
      position: absolute;
      bottom: 0px;
      right: 10px;
      padding-bottom: 15px;
    }
    /deep/ .ant-tabs{
      height: calc(100vh - 150px);
      overflow: auto;
    }
    /deep/ .ant-tabs-bar{
      margin: 0px;
      width: 302px;
    }
    &/deep/ .ant-tabs-nav .ant-tabs-tab{
      margin-right: 30px;
    }
    .content-follow{
      display: flex;
      justify-content: flex-start;
      .content-follow-type{
        width: 18px;
        .content-follow-left-line{
          margin: 0 0 0 9px;
          height: calc(100% - 18px);
          border-left: 0.5px dashed #AED4F5;
        }
        .content-follow-type1 {
          display: inline-block;
          margin-right: 10px;
          width: 20px;
          height: 20px;
          line-height: 20px ;
          border-radius: 50%;
          .content-follow-type2{
            margin:5px 0 0 5px;
            display: inline-block;
            width: 10px;
            height: 10px;
            line-height: 10px ;
            border-radius: 50%;
          }
        }
      }
      .content-follow-left{
        width: 32px;
        .content-follow-left-line{
          margin: 0 0 0 16px;
          height: calc(100% - 32px);
          border-left: 0.5px dashed #AED4F5;
        }
      }
      .content-follow-right{
        margin-left: 10px;
        margin-bottom: 25px;
        width: 275px;
        .follow-right-line-one{
          .name{
            font-size: 14px;
            color: #111111;
            font-weight:400;
          }
          .date{
            color: #777;
            font-size: 12px;
          }
          .followType{
            color: rgba(10, 135, 248);
            font-size: 13px;
            background: rgba(10, 135, 248, 0.1);
            padding: 0px 4px;
            border-radius: 4px;
            margin-left: 4px;
          }
        }
        .follow-right-line-two{
          font-size: 12px;
          color: #999999;
        }
        .numberStyle{
          display: inline-block;
          width: auto;
          height: 14px;
          line-height: 14px;
          border: 1px solid #999999;
          border-radius: 7px;
          text-align: center;
          color: #999999;
          background: #ffffff;
          margin-right: 3px;
          padding: 0 3px;
        }
        .otherColorStyle{
          font-size: 12px;
          color: #555555;
        }
        .follow-info{
          margin-top: 2px;
          padding:4px 0 4px 6px;
          width: 269px;
          min-height: 18px;
          line-height:18px;
          background-color: rgba(247,248,251,1);
          color: #777777;
          font-size: 12px;
        }
        .name{
          color: #111111;
          font-size: 14px;
        }
      }
    }
    .skeletonLoadingListStyle{
      width: 100%;
    }
  }
  .bottom {
    margin: 0 20px;
    height: 50px;
    line-height: 50px;
    border-top: 1px dashed #DDDDDD;
    color: @secondaryFontColor;
    span:first-child {
      display: inline-block;
      margin-right: 20px;
      padding-right: 20px;
      height: 20px;
      line-height: 20px;
      border-right: 1px dashed #DDDDDD;
    }
  }

  .radius-font {
    display: inline-block;
    margin-right: 10px;
    width: 32px;
    height: 32px;
    line-height: 32px ;
    font-size: 12px;
    color: #FFA036;
    text-align: center;
    background-color: fade(#FFA036, 10%);
    border-radius: 16px;
  }
  .radius-font-person {
    color: #0A87F8;
    background-color: fade(#0A87F8, 10%);
  }
  .radius-font-greed {
    color: #03C683;
    background-color: fade(#03C683, 10%);
  }
  .radius-font-yellow {
    color: #FFA036;
    background-color: fade(#FFA036, 10%);
  }
  .radius-font-close {
    color: #777777;
    background-color: fade(#F6F7F8, 100%);
  }
  .tabs-options {
    font-size: 0;
    cursor: pointer;
    div {
      display: inline-block;
      font-size: 14px;
      color: #0a87f8;
      span {
        margin-right: 14px;
      }
    }
    div:last-child {
      span {
        margin-right: 0;
      }
    }
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
  & /deep/ .ant-tabs-nav .ant-tabs-tab {
    margin: 0;
    padding: 8px 0;
  }
  & /deep/ .ant-input,
  .ant-select,
  .ant-checkbox-wrapper,
  .ant-select-dropdown {
    font-size: 12px;
    height: 24px;
    color: @mainFontColor;
  }
  & /deep/ .ant-select-selection__rendered{
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    margin-left: 0px;
  }
  & /deep/ .ant-select-selection--single {
    font-size: 12px;
    height: 24px;
    line-height: 24px;
  }
  & /deep/ .ant-select-dropdown-menu {
    font-size: 12px;
  }
  & /deep/ .label-item .addon-after {
    font-size: 12px;
    height: 24px;
    line-height: 24px;
  }
  & /deep/ .ant-tabs-top-content {
    font-size: 12px;
    color: @mainFontColor;
  }
  .active {
    border-color: @themeColor!important;
    color: @themeColor!important;
  }
  /deep/ .ant-select-selection--multiple .ant-select-selection__placeholder{
    margin-left: 0;
  }
  & /deep/ .ant-select-selection--multiple {
    min-height: 24px;
    .ant-select-selection__rendered>ul>li {
      height: 20px;
      margin-top: 2px;
      line-height: 20px;
    }
  }
  & /deep/ .ant-popover {
    position: fixed;
    .ant-popover-inner-content {
      padding: 5px 0;
      width: 80px;
      .action {
        color: #111111;
        width: 100%;
        height: 36px;
        line-height: 36px;
      }
      .action:hover {
        color: #0a87f8;
        cursor: pointer;
        background: rgba(10, 135, 248, 0.1);
      }
    }
  }
  .bgColorStyle{
    background:rgba(244,245,247,1);
  }
  .animate-box{
    flex-wrap: wrap;
    animation: skeleton-blink 1.2s ease infinite;
    -webkit-animation: skeleton-blink 1.2s ease infinite;
    background-image: -webkit-gradient(linear, left top, right top, color-stop(25%, #f0f0f0), color-stop(37%, #e3e3e3), color-stop(63%, #f0f0f0));
    background-image: -o-linear-gradient(left, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
    background-image: linear-gradient(90deg, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
    background-size: 400% 100%;
  }
  @-webkit-keyframes skeleton-blink {
    0% {
      background-position: 100% 50%
    }

    to {
      background-position: 0 50%
    }
  }
  @keyframes skeleton-blink {
    0% {
      background-position: 100% 50%
    }

    to {
      background-position: 0 50%
    }

  }
  /deep/ .ant-select-selection__choice{
    margin-left: 5px;
  }
  /deep/ .label-item textarea.ant-input{
    padding: 4px 0 0 5px;
  }
  /deep/ .ant-select-selection__placeholder{
    padding-left: 5px;
  }
}
</style>
