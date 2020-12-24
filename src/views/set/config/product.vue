<template>
    <div class="product-box">
        <div class="product f-clearfix">
            <div class="left">
                <div class="productList f-clearfix">
                    <a-list itemLayout="horizontal" :dataSource="productMenuList" :split="false">
                        <a-list-item slot="renderItem" slot-scope="item, index" class="listItemClass"
                                     @click="leftItemClick(item)">
                            <a-list-item-meta>
                                <div slot="title" class="listItemNameClass f-clearfix cursor">
                                    <div :class="item.module==module?'bgClick f-clearfix':'f-clearfix'" v-if="item.module=='WECHART'" v-mark="['mk_set_config_cppz_wxxcx']">
                                        <div class="itemIcon">
                                            <icon-font type="iconweixingongzhonghaobeifen"/>
                                        </div>
                                        <div class="itemName">{{item.name}}</div>
                                    </div>
                                </div>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </div>
            </div>
            <div class="right">
                <a-tabs defaultActiveKey="1" @change="callback">
                    <a-tab-pane tab="功能配置" key="1">
                        <div v-if="module=='WECHART'" v-mark="['mk_set_config_cppz_wxxcx']">
                            <div class="source">
                                <div class="title clearfix">
                                    <div class="blueStyle f-fl"></div>
                                    <div class="titleFont f-fl">租客端首页轮播图配置</div>
                                    <div class="openDemoStyle cursor f-fl" @click="handlePreview(1)"><icon-font type="iconyumengtubiao_yanjing-1"/> 展示位置示例</div>
                                </div>
                                <div class="describe">
                                    温馨提示：图片格式仅支持 jpg、png、jpeg ；最多上传5张，每张最大1M，建议尺寸：750*420 ；拖动图片可以排序；第一张图片将作为封面图展示
                                </div>
                                <div class="rotation clearfix">
                                    <draggable v-model="rotationPicList"
                                               v-bind="dragOptions"
                                               @end="sortRotationPicList">
                                        <transition-group>
                                            <div class="rotationPic f-fl" style="margin-right: 10px" v-for="(item,index) in rotationPicList" @click="openAddRotationPic(item)" :key="index" @mouseenter="currentRotationActiveIndex=index" @mouseleave="currentRotationActiveIndex=-1">
                                                <div class="f-clearfix top"  v-show="currentRotationActiveIndex == index">
                                                    <icon-font @click.stop="deletePic(item)" class="f-fr close" type="iconyumengtubiao_guanbi-1"/>
                                                </div>
                                                <div class="rotationPicImg"><img v-if="item.pic" :src="item.pic.origin" alt=""></div>
                                            </div>
                                        </transition-group>
                                    </draggable>
                                    <div class="rotationAdd cursor f-fl" v-if="rotationPicList.length<5" @click="openAddRotationPic()">
                                        <div class="uploadIconStyle"><a-icon type="plus" /></div>
                                        <div class="uploadFontStyle">上传轮播图</div>
                                    </div>
                                </div>
                            </div>
                            <div class="source">
                                <div class="title clearfix">
                                    <div class="blueStyle f-fl"></div>
                                    <div class="titleFont f-fl">租客端首页功能区配置</div>
                                    <div class="openDemoStyle cursor f-fl" @click="handlePreview(2)"><icon-font type="iconyumengtubiao_yanjing-1"/> 展示位置示例</div>
                                    <div class="f-fl" style="display: none"><a-icon type="plus" @click="addFunctionPicVisible=true" /></div>
                                </div>
                                <div class="describe">
                                    功能区模块只启用一个时，该区域隐藏
                                </div>
                                <div class="functionPicStyle clearfix">
                                    <draggable v-model="functionPicList"
                                               v-bind="dragOptions"
                                               @end="sortFunctionPicList">
                                        <transition-group>
                                            <div class="functionPicDetail f-fl" @mouseenter="currentFunctionActiveIndex=index" @mouseleave="currentFunctionActiveIndex=-1" v-for="(item,index) in functionPicList" :key="index">
                                        <div class="operateStyle" v-show="currentFunctionActiveIndex == index">
                                            <div class="updateOperateStyle operateCommonStyle">
                                                <a-upload
                                                        :action="action"
                                                        listType="picture-card"
                                                        @change="handleChange($event,item.id)"
                                                        :headers="uploadHeader">
                                                    <div class="updateOperateFontStyle"><icon-font type="iconyumengtubiao_bianji-1"/> 修改图标</div>
                                                </a-upload>
                                            </div>
                                            <div class="useOperateStyle operateCommonStyle cursor" v-if="item.status==1" @click="enableDisableFunctionPic(item.id,0)"><icon-font type="iconjingangqujinyong"/> 禁用</div>
                                            <div class="useOperateStyle operateCommonStyle cursor" v-else @click="enableDisableFunctionPic(item.id,1)"><icon-font type="iconjingangquqiyong"/> 启用</div>
                                        </div>
                                        <div class="disabledStyle" v-show="item.status!=1">
                                            <!--  禁用白色层有白色遮罩 -->
                                        </div>
                                        <div>
                                            <div class="functionPic" >
                                                <div class="functionPicImgStyle">
                                                    <div v-if="item.status!=1" class="diableFunctionPic">
                                                    </div>
                                                    <img :src="item.iconUrl">
                                                </div>
                                                <div class="functionPicFontStyle" :class="item.status==1?'':'functionPicFontDisableStyle'">{{item.name}}</div>
                                            </div>
                                            <div class="functionPicFont" :class="item.status==1?'normal':'disable'">{{item.status==1?'已启用':'已禁用'}}</div>
                                        </div>
                                    </div>
                                        </transition-group>
                                    </draggable>
                                </div>
                            </div>
                            <div class="source">
                              <div class="title clearfix">
                                <div class="blueStyle f-fl"></div>
                                <div class="titleFont f-fl">租后服务配置<span class="otherTitleFOnt">(是否在租客端展示相应租后服务模块)</span></div>
                              </div>
                              <div class="moduleStyle clearfix">
                                <div class="itemStyle f-fl clearfix" v-for="(item,index) in workorderList" @mouseenter="currentWorkorderActiveIndex=index" @mouseleave="currentWorkorderActiveIndex=-1" :key="index">
                                  <div class="operateStyle" v-show="currentWorkorderActiveIndex == index">
                                    <div class="useOperateStyle operateCommonStyle cursor" v-if="item.status==1" @click="enableDisableFunctionPic(item.id,0)"><icon-font type="iconjingangqujinyong"/> 禁用</div>
                                    <div class="useOperateStyle operateCommonStyle cursor" v-else @click="enableDisableFunctionPic(item.id,1)"><icon-font type="iconjingangquqiyong"/> 启用</div>
                                  </div>
                                  <div class="leftItemStyle f-fl">{{item.name}}</div>
                                  <div class="rightItemStyle f-fl" :class="item.status==1?'ableStyle':'disableStyle'">
                                    {{item.status==1?'已启用':'禁用'}}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- 过滤e家 -->
                            <div class="source" v-if="GlobalConfig.IS_OPEN_REGISTER">
                              <div class="title clearfix">
                                <div class="blueStyle f-fl"></div>
                                <div class="titleFont f-fl">我是业主配置<span class="otherTitleFOnt">(是否在租客端展示我是业主模块)</span></div>
                              </div>
                              <div class="moduleStyle clearfix">
                                <div class="itemStyle f-fl clearfix" v-for="(item,index) in ownerList" @mouseenter="currentOwnerActiceIndex=index" @mouseleave="currentOwnerActiceIndex=-1" :key="index">
                                  <div class="operateStyle" v-show="currentOwnerActiceIndex == index">
                                    <div class="useOperateStyle operateCommonStyle cursor" v-if="item.status==1" @click="enableDisableFunctionPic(item.id,0)"><icon-font type="iconjingangqujinyong"/> 禁用</div>
                                    <div class="useOperateStyle operateCommonStyle cursor" v-else @click="enableDisableFunctionPic(item.id,1)"><icon-font type="iconjingangquqiyong"/> 启用</div>
                                  </div>
                                  <div class="leftItemStyle f-fl">{{item.name}}</div>
                                  <div class="rightItemStyle f-fl" :class="item.status==1?'ableStyle':'disableStyle'">
                                    {{item.status==1?'已启用':'禁用'}}
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane tab="房屋委托配置" key="2">
                        <div v-if="module=='WECHART'" v-mark="['mk_set_config_cppz_wxxcx']">
                            <div class="source">
                                <div class="title clearfix" style="width: 770px;height: 24px;line-height: 24px;">
                                    <div class="blueStyle f-fl" style="margin-top: 4px;"></div>
                                    <div class="titleFont f-fl" style="height: 24px;line-height: 24px;">租客端房屋委托规则内容配置</div>
                                    <div class="openDemoStyle cursor f-fl" @click="handleDelegatePreview()" v-if="!delegateEdit"><icon-font type="iconyumengtubiao_yanjing-1"/> 展示位置示例</div>
                                    <div class="right-pre-icon cursor f-fl" @click="preViewDelegate" v-if="delegateEdit"><icon-font type="iconyumengtubiao_yanjing-1"></icon-font><span class="right-pre-font">预览模板</span></div>
                                    <div class="right-pre-icon cursor f-fr" @click="delegateEdit = !delegateEdit;" v-if="!delegateEdit"><icon-font type="iconyumengtubiao_bianji-"></icon-font><span class="right-pre-font">编辑</span></div>
                                    <div v-show="delegateEdit" class="tabs-options f-fr">
                                        <span @click="cancelDelegateEdit">取消</span>
                                        <span @click="saveDelegateEdit">保存</span>
                                    </div>
                                </div>
                                <div class="ckeditor">
                                    <div class="ckeditor-document">
                                        <div class="right-ckeditor-document" v-show="delegateEdit">
                                            <jodit-editor :authorization="uploadHeader.Authorization" :reloadText="delegateInfo.content" :uploadParams="uploadParams_delegate" @afterPaste="afterPaste" @getValue="getValue"/>
                                        </div>
                                        <div v-show="!delegateEdit" style="border: 1px solid #EEEEEE;height: 100%;overflow-y: auto">
                                            <div style="padding: 5px 10px;" v-html="delegateInfo.content"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
        <!-- 预览图片 -->
        <a-modal destroyOnClose centered  v-model="previewVisible" :footer="null" class="ownModalBorder titDialog" @cancel="cancelPreviewImage" >
           <img-pre :source="source" :rotationPicPreList="rotationPicPreList" :functionPicPreList="functionPicPreList" ></img-pre>
        </a-modal>
        <!-- 添加功能区图片 -->
        <a-modal centered title="添加功能区图片" :visible="addFunctionPicVisible" @cancel="addFunctionPicVisible=false" class="ownModalBorder titDialog" :footer="null" :destroyOnClose="true">
            <add-function-pic></add-function-pic>
        </a-modal>
        <!-- 添加轮播图 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" v-model="addRotationPicVisible" class="ownModalBorder titDialog" title="上传轮播图" width="810px">
            <add-rotation-pic :currentRotationId="currentRotationId" :type="currentRotationType" @cancelSave="cancelSaveRotation" @saveRefresh="saveRotationRefresh"></add-rotation-pic>
        </a-modal>
        <!-- 模板预览 -->
        <a-modal title="模板预览" centered v-model="showPreview" class="ownModalBorder titDialog" style="overflow-y: hidden" width="1000px" :footer="null" :destroyOnClose="true" :maskClosable="false">
            <template-detail :templateTxt="delegateInfo.content"></template-detail>
        </a-modal>
        <!-- 预览图片2 -->
        <a-modal destroyOnClose centered  v-model="delegatePreviewVisible" :footer="null" class="ownModalBorder titDialog" @cancel="cancelDelegatePreviewImage" >
            <delegate-pre :templateTxt="delegateInfoOrigin.content"></delegate-pre>
        </a-modal>
    </div>
</template>

<script>
    import 'jodit/build/jodit.min.css';
    import {ACCESS_TOKEN} from '@/store/mutation-types';
    import draggable from "vuedraggable";
    import * as API from '@/api/setConfig';
    import ImgPre from './imgPre';
    import DelegatePre from './delegatePre';
    import  AddFunctionPic from './addFuctionPic';
    import  AddRotationPic from './addRotationPic';
    import 'jodit/build/jodit.min.css';
    //import { JoditEditor } from 'jodit-vue';
    import JoditEditor from '@/components/jodit/joditImage';
    import templateDetail from '../../contract/contractConfiguration/templateDetail';
    export default {
        name: "decision",
        components: {
            ImgPre,
            AddFunctionPic,
            AddRotationPic,
            draggable,
            JoditEditor,
            templateDetail,
            DelegatePre,
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        },
        data() {
            return {
                productMenuList: [],
                dataList: [],
                module: "WECHART",             //初始化模块（微信小程序....）
                rotationPicList:[],
                rotationPicPreList:[],
                currentRotationActiveIndex:'',
                currentRotationId:'',
                currentRotationType:1,
                functionPicList:[],
                functionPicPreList:[],
                currentFunctionActiveIndex:-1,
                previewVisible:false,
                addFunctionPicVisible:false,
                addRotationPicVisible:false,
                sendData:{
                    scenes:1,
                },
                uploadHeader: {
                    Authorization: ""
                },
                action: process.env.VUE_APP_BASE_FILESERVER_URL + "/file_upload",  //上传地址
                source: 1,
                initfunctionPicList:[],
                joditConfig:{
                    "showXPathInStatusbar": false,
                    "askBeforePasteFromWord": false,
                    "askBeforePasteHTML": false,
                    "uploader": {
                        "insertImageAsBase64URI": true
                    },
                    "placeholder":'',
                },
                delegateInfo:{
                    id:'',
                    content:'',
                    scenes:'',
                    type:'',
                },
                delegateInfoOrigin:{},
                delegateEdit:false,
                showPreview:false,
                delegatePreviewVisible:false,
                uploadParams_delegate:{
                    bizId:'',
                    bizType:20,
                    subBizType:1,
                    orderIndex:1,
                },
                workorderList:[],
                initWorkorderList:[],
                currentWorkorderActiveIndex:-1,
                ownerList:[],
                initOwnerList:[],
                currentOwnerActiceIndex:-1,
            };
        },
        created: function () {
            const token = this.$ls.get(ACCESS_TOKEN);
            this.uploadHeader.Authorization = "Bearer " + token;
            this.initfunctionPicList = [
                {
                  iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/d44e0af5ce574f4ea7df19726fa8d9fe.png',
                  id:'',
                  name:'快速找房',
                  scenes:1,
                  status:1,
                  type:6,
                  webRouter:'/pages/house/index/fasthouse',
                },
                {
                  iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/a98d19148bfb4c46ab56d1da57908d26.png',
                  id:'',
                  name:'合租',
                  scenes:1,
                  status:1,
                  type:3,
                  webRouter:'/pages/house/index/fasthouse',
                },
                {
                  iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/2c2de8a453be45f894b1d9de3a91bfac.png',
                  id:'',
                  name:'整租',
                  scenes:1,
                  status:1,
                  type:4,
                  webRouter:'/pages/house/index/fasthouse',
                },
                {
                    iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/a57df11fa33e4b40a716d282f755cb47.png',
                    id:'',
                    name:'独栋公寓',
                    scenes:1,
                    status:1,
                    type:2,
                    webRouter:'/pages/house/index/concentrated',
                },
                {
                  iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/59175eeb24be45659659fc886de2251b.png',
                  id:'',
                  name:'地图找房',
                  scenes:1,
                  status:1,
                  type:7,
                  webRouter:'/pages/index/housemap',
                },
                {
                    iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/669de7a6f46a4c188cb79b9378295d2e.png',
                    id:'',
                    name:'房屋委托',
                    scenes:1,
                    status:0,
                    type:5,
                    webRouter:'/pages/house/index/dispersion',
                },
                {
                  iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/b39ea51130104215a4ae40c8c6c987d6.png',
                  id:'',
                  name:'短租房',
                  scenes:1,
                  status:0,
                  type:8,
                  webRouter:'/pages/house/index/fasthouse',
                },
              {
                iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/2babacbb56154b06a1ddc43028aa291d.png',
                id:'',
                name:'低价好房',
                scenes:1,
                status:0,
                type:9,
                webRouter:'/pages/house/index/fasthouse',
              },
              {
                iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/cd8e10f4b3ed49beacf0748b18703237.png',
                id:'',
                name:'新上好房',
                scenes:1,
                status:0,
                type:10,
                webRouter:'/pages/house/index/fasthouse',
              },
              {
                iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/42048e0621074750a7d795e3661d60c7.png',
                id:'',
                name:'主卧独卫',
                scenes:1,
                status:0,
                type:11,
                webRouter:'/pages/house/index/fasthouse',
              },
              {
                iconUrl:'https://oss.byteox.com/byteox/VS5OQDC9/2/8a7c134e1af34348bcf485cde0bae439.png',
                id:'',
                name:'阳台房',
                scenes:1,
                status:0,
                type:12,
                webRouter:'/pages/house/index/fasthouse',
              },
            ];
            this.initWorkorderList = [
              {
                iconUrl:'',
                id:'',
                name:'维修服务',
                scenes:2,
                status:1,
                type:1,
                webRouter:'',
              },
              {
                iconUrl:'',
                id:'',
                name:'保洁服务',
                scenes:2,
                status:1,
                type:2,
                webRouter:'',
              },
              {
                iconUrl:'',
                id:'',
                name:'投诉',
                scenes:2,
                status:1,
                type:3,
                webRouter:'',
              },
              {
                iconUrl:'',
                id:'',
                name:'建议',
                scenes:2,
                status:1,
                type:4,
                webRouter:'',
              },
            ];
            this.initOwnerList = [
              {
                iconUrl:'',
                id:'',
                name:'我是业主',
                scenes:3,
                status:1,
                type:1,
                webRouter:'',
              },
            ];
            this.initProductList();
        },
        methods: {
            callback(key) {
                if(key == 1){
                    this.carouselList();
                    this.featuresList();
                }
                else if(key == 2){
                    this.getDelegateInfo();
                }
            },
            preViewDelegate(){
                this.showPreview = true;
            },
            cancelDelegateEdit(){
                this.delegateEdit = false;
            },
            saveDelegateEdit(){
                if(this.delegateEdit){
                    if(this.delegateInfo.id){
                        API.delegateEdit(this.delegateInfo).then(res => {
                            if (res.code == 200) {
                                this.$message.info('编辑成功');
                                this.getDelegateInfo();
                            }
                        },error => {
                        });
                    }
                    else{
                        this.delegateInfo.scenes = 2;
                        this.delegateInfo.type = 1;
                        API.delegateAdd(this.delegateInfo).then(res => {
                            if (res.code == 200) {
                                this.$message.info('添加成功');
                                this.getDelegateInfo();
                            }
                        },error => {
                        });
                    }
                }
                this.delegateEdit = !this.delegateEdit;

            },
            initSaveDelegateEdit(){
                if(this.delegateInfo.id){
                    API.delegateEdit(this.delegateInfo).then(res => {
                        if (res.code == 200) {
                            this.getDelegateInfo();
                        }
                    },error => {
                    });
                }
                else{
                    this.delegateInfo.scenes = 2;
                    this.delegateInfo.type = 1;
                    API.delegateAdd(this.delegateInfo).then(res => {
                        if (res.code == 200) {
                            this.getDelegateInfo();
                        }
                    },error => {
                    });
                }
            },
            afterPaste(){
                let temp = '';
                let text = "line-height:0;";
                temp = this.reloadText.replace(new RegExp(text,'g'), '');
                this.delegateInfo.content = temp;
            },
            getValue(new_value){
                let temp = '';
                let text = "line-height:0;";
                temp = new_value.replace(new RegExp(text,'g'), '');
                this.delegateInfo.content = temp;
            },
            sortFunctionPicList(){
                let arr = [];
                this.functionPicList.forEach((val,i)=>{
                    arr.push(val.id)
                })
                API.featuresListSort(arr).then(res=>{
                    this.$message.info('排序成功！');
                    this.carouselList();
                }).catch(err=>{
                    this.$message.info('排序失败！');
                })
            },
            sortRotationPicList(){
                let arr = [];
                this.rotationPicList.forEach((val,i)=>{
                    arr.push(val.id)
                })
                API.carouselListSort(arr).then(res=>{
                    this.$message.info('排序成功！');
                    this.carouselList();
                }).catch(err=>{
                    this.$message.info('排序失败！');
                })
            },
            cancelSaveRotation(){
                this.addRotationPicVisible = false;
            },
            saveRotationRefresh(){
                this.addRotationPicVisible = false;
                this.carouselList();
            },
            //上传图片
            handleChange(info,id) {
                if (info.fileList && info.fileList.length>0 && info.fileList[0].response) {
                    let iconUrl = info.fileList[0].response.data.origin;
                    if(iconUrl&&id){
                        //启用、禁用
                        let parameter = {
                            id: id,
                            iconUrl: iconUrl,
                        };
                        API.featuresEditIcon(parameter).then(res => {
                            if (res.code == "200") {
                                this.$message.info( '修改成功');
                            }
                            else {
                                this.$message.error('修改失败');
                            }
                            this.featuresList();
                        });
                    }
                }
            },
            enableDisableFunctionPic(id,statusVal){
                //启用、禁用
                let parameter = {
                    id: id,
                    status: statusVal,
                };
                let title = '';
                if (statusVal == 1) {
                    title = '启用';
                }
                if (statusVal == 0) {
                    title = '禁用';
                }
                API.featuresEnableDisable(parameter).then(res => {
                    if (res.code == "200") {
                        this.$message.info(title + '成功');
                    }
                    else {
                        this.$message.error(title + '失败');
                    }
                    this.featuresList();
                });
            },
            openAddRotationPic(val){
                if(val){
                    this.currentRotationId = val.id;
                    this.currentRotationType = val.type;
                }else{
                    this.currentRotationId = '';
                    this.currentRotationType = 1;
                }
                this.addRotationPicVisible = true;
            },
            handlePreview(val){
                this.source = val;
                this.previewVisible = true;
            },
            handleDelegatePreview(){
                this.delegatePreviewVisible = true;
            },
            cancelPreviewImage(){
                this.previewVisible = false;
            },
            cancelDelegatePreviewImage(){
                this.delegatePreviewVisible = false;
            },
            //左侧某一项点击
            leftItemClick(item) {
                //点击左侧列表项，获取字典列表
                this.module = item.module;
                this.initProductList();
            },
            //页面初始化
            initProductList(init) {
                if(init){
                    this.module = 'WECHART';
                    this.sendData.scenes = 1;
                }
                this.productMenuList = [
                    {module:'WECHART',name:"微信小程序"},
                ];
                this.carouselList();
                this.featuresList();
            },
            deletePic(list){
                API.carouselDelete(list.id).then(res => {
                    if (res.code == 200) {
                        this.$message.info('删除成功！');
                    }
                    this.carouselList();
                }).catch(err => {
                    this.$message.info('删除失败！');
                })
            },
            carouselList(){
                API.carouselList(this.sendData).then(res => {
                    if (res.code == 200) {
                        this.rotationPicList= res.data;
                        this.rotationPicPreList = [];
                        if(this.rotationPicList&&this.rotationPicList.length>0){
                            this.rotationPicList.forEach((item)=>{
                                if(item.pic){
                                    this.rotationPicPreList.push(item.pic.origin);
                                }
                            });
                        }
                    }
                },error => {
                });
            },
            featuresList(){
                API.featuresList(this.sendData).then(res => {
                    if (res.code == 200) {
                        //allHave判断是否都保存了
                        let allHave = true;
                        this.functionPicList = res.data;
                        this.functionPicPreList = [];
                        let dataList = [];  //若数据不完整，完整数据
                        if(!this.functionPicList||this.functionPicList.length==0){
                          dataList = this.initfunctionPicList;
                        }
                        else{
                            let typeTemp = [];
                            this.functionPicList.forEach((item)=>{
                                typeTemp.push(item.type);
                                if(item.status==1){
                                    this.functionPicPreList.push(item);
                                }
                            });
                            this.initfunctionPicList.forEach((item)=>{
                              if(typeTemp.indexOf(item.type) > -1){
                                this.functionPicList.forEach((temp)=>{
                                  if(item.type==temp.type){
                                    dataList.push(temp);
                                  }
                                });
                              }
                              else {
                                dataList.push(item)
                              }
                            });
                        }
                        //dataList为全量集合，便于排序
                        dataList.forEach((item)=>{
                          if(!item.id){
                            //存在未新增
                            allHave = false;
                          }
                        });
                        if(dataList.length>0&&!allHave){
                            API.featuresSaveFeatures(dataList).then(res => {
                                if(res.code == 200){
                                    this.featuresList();
                                }
                            }).catch(err => {
                            })
                        }
                    }
                });
                let param1 = {scenes:2,};
                API.featuresList(param1).then(res => {
                  if (res.code == 200) {
                      this.workorderList = res.data;
                      let dataList = [];  //若数据不完整，完整数据
                      if(!this.workorderList||this.workorderList.length==0){
                        dataList = this.initWorkorderList;
                      }
                      if(dataList.length>0){
                        API.featuresSaveFeatures(dataList).then(res => {
                          if(res.code == 200){
                            this.featuresList();
                          }
                        }).catch(err => {
                        })
                      }
                  }
                });
                if(this.GlobalConfig.IS_OPEN_REGISTER){
                  let param2 = {scenes:3,};
                  API.featuresList(param2).then(res => {
                    if (res.code == 200) {
                      this.ownerList = res.data;
                      let dataList = [];  //若数据不完整，完整数据
                      if(!this.ownerList||this.ownerList.length==0){
                        dataList = this.initOwnerList;
                      }
                      if(dataList.length>0){
                        API.featuresSaveFeatures(dataList).then(res => {
                          if(res.code == 200){
                            this.featuresList();
                          }
                        }).catch(err => {
                        })
                      }
                    }
                  });
                }
            },
            getDelegateInfo(){
                this.delegateInfoOrigin = {};
                API.delegateView().then(res => {
                    if (res.code == 200) {
                        this.delegateInfo = res.data;
                        this.delegateInfoOrigin = Object.assign({},this.delegateInfo);
                        if(!this.delegateInfo.content){
                            this.delegateInfo.content = '<img src="https://oss.byteox.com/byteox/2020-06-23/1c027d89a4744d16b1c78c3a6e89cf9b.jpg" style="width: 300px;">';
                            this.initSaveDelegateEdit();
                        }
                    }
                },error => {
                });
            },
        }
    };


</script>

<style scoped lang="less">
    & /deep/  svg{
        width:16px;
        height: 16px;
    }
    .product-box {
        height: 100%;
    }
    .bgClick {
        color: @themeColor;
    }
    .product {
        background-color: #F1F2F5;
        height: 100%;
        .left {
            width: 160px;
            background-color: #FFFFFF;
            float: left;
            position: absolute;
            height: calc(100vh - 135px);
            .productList {
                margin-top: 15px;
                .listItemClass {
                    height: 40px;
                    line-height: 40px;
                    margin-left: 22px;
                    .itemIcon {
                        float: left;
                    }
                    .itemName {
                        float: left;
                        margin-left: 8px;
                    }
                }
            }
        }
        .right {
            width: calc(100% - 174px);
            background-color: #FFFFFF;
            float: right;
            //height: calc(100vh - 135px);
            padding: 0 0 0 20px;
            overflow-x: hidden;
            /deep/ .ant-tabs-nav .ant-tabs-tab{
                margin-right: 0px;
            }
            .source{
                margin-top: 8px;
                .title{
                    width: 100%;
                    .blueStyle{
                        width:4px;
                        height:16px;
                        background:rgba(10,135,248,1);
                        border-radius:2px;
                    }
                    .titleFont{
                        height:16px;
                        line-height: 16px;
                        font-size:16px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:#111111;
                        margin-left: 10px;
                    }
                    .otherTitleFOnt{
                      font-size: 14px;
                      color: #777777;
                    }
                    .openDemoStyle{
                        color: rgba(10,135,248,1);
                        margin-left: 20px;
                    }
                    .right-pre-icon{
                        color: #0A87F8;
                        margin-left: 20px;
                        .right-pre-font{
                            margin-left: 5px;
                        }
                    }
                    .tabs-options {
                        font-size: 0;
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
                }
                .describe{
                    margin: 8px 20px 0 14px;
                    padding-left: 5px;
                    min-height:34px;
                    line-height: 34px;
                    background:rgba(247,248,251,1);
                    color: #777777;
                }
                .rotation{
                    margin: 10px 0 30px 14px;
                    .rotationPic{
                        width: 174px;
                        height: 98px;
                        margin-right: 10px;
                        position: relative;
                        .rotationPicImg  {
                            width: 100%;
                            height: 100%;
                            line-height: 98px;
                            border: 1px solid #eeeeee;
                            background-color: #f6f7f8;
                            text-align: center;
                            border-radius: 6px;
                            overflow: hidden;

                            img {
                                width: auto;
                                max-width: 174px;
                                height: auto;
                                max-height: 98px;
                                overflow: hidden;
                            }
                        }
                        .top{
                            position: absolute;
                            top: 0;
                            color: #ffffff;
                            text-align: center;
                            width: 100%;
                            height:20px;
                            line-height:20px;
                            font-size: 14px;
                            .close{
                                padding-top: 2px;
                                width:20px;
                                height:20px;
                                line-height:20px;
                                background:rgba(0,0,0,0.6);
                                border-radius:0px 5px 0px 5px;
                            }
                        }
                    }
                    .rotationAdd{
                        width: 174px;
                        height: 98px;
                        background:rgba(246,247,248,1);
                        border-radius:4px;
                        border: 1px dashed #d9d9d9;
                        text-align: center;
                        .uploadIconStyle{
                            margin-top: 26px;
                            color: #BBBBBB;
                        }
                        .uploadFontStyle{
                            margin-top: 8px;
                            color: #777777;
                            font-size: 12px;
                        }
                    }
                }
                .functionPicStyle{
                    margin: 8px 20px 30px 14px;
                    padding: 10px 0 0px 10px;
                    background:rgba(247,248,251,1);
                    border-radius:4px;
                    .functionPicDetail{
                        width:108px;
                        height:127px;
                        margin-right: 10px;
                      margin-bottom: 10px;
                        background:rgba(255,255,255,1);
                        border-radius:4px;
                        position: relative;
                        .functionPic{
                            width:108px;
                            height: 79px;
                            text-align: center;
                            .functionPicImgStyle{
                                margin: 20px 21px 0 21px;
                                width: 66px;
                                height: 38px;
                                position: relative;
                                img{
                                    width: 66px;
                                    height: 38px;
                                }
                                .diableFunctionPic{
                                    width: 66px;
                                    height: 38px;
                                    position: absolute;
                                    z-index:50
                                }
                            }
                            .functionPicFontStyle{
                                margin-top: 4px;
                                color: #333333;
                                font-size: 12px;
                            }
                            .functionPicFontDisableStyle{
                                color: #777777;
                            }
                        }
                        .functionPicFont{
                            width:108px;
                            height:28px;
                            line-height: 28px;
                            border-radius:0px 0px 4px 4px;
                            text-align: center;
                        }
                        .normal{
                            background:rgba(10,135,248,0.1);
                            color: #0A87F8;
                        }
                        .disable{
                            background:rgba(119,119,119,0.1);
                            color: #777777;
                        }
                        .operateStyle{
                            width:108px;
                            height:127px;
                            position: absolute;
                            z-index: 99;
                            background:rgba(0,0,0,0.3);
                            box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
                            border-radius:4px;
                            color: #FFFFFF;
                            .updateOperateStyle{
                                margin: 33px 10px 0 10px;
                                /deep/ .ant-upload-list{
                                    width: 0;
                                    height: 0;
                                }
                                /deep/ .ant-upload-list-item{
                                    padding: 0;
                                }
                                /deep/ .ant-upload-list-item-done{
                                    padding: 0;
                                }
                                /deep/ .ant-upload-list .ant-upload-list-picture-card{
                                    width: 0;
                                    height: 0;
                                }
                                /deep/ .ant-upload.ant-upload-select-picture-card{
                                    width:88px;
                                    height:25px;
                                    border: none;
                                    background:rgba(0,0,0,0);
                                }
                                /deep/ .ant-upload-list-picture-card .ant-upload-list-item{
                                    width: 0px;
                                    height: 0px;
                                    border: none;
                                }
                                /deep/ .ant-upload-list-item-actions{
                                    width: 0px;
                                    height: 0px;
                                }
                                position: relative;
                                .updateOperateFontStyle{
                                    top: 3px;
                                    left: 6px;
                                    position: absolute;
                                    color: #FFFFFF;
                                }
                            }
                            .useOperateStyle{
                                margin: 10px 10px 0 10px;
                            }
                            .operateCommonStyle{
                                width:88px;
                                height:25px;
                                line-height: 25px;
                                background:rgba(0,0,0,0.3);
                                box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
                                border-radius:4px;
                                text-align: center;
                            }
                        }
                        .disabledStyle{
                            width:108px;
                            height:99px;
                            z-index:80;
                            position: absolute;
                            background:rgba(255,255,255,0.8);
                        }
                    }
                }
                .moduleStyle{
                    margin: 12px 0 35px 0;
                    .itemStyle{
                      width: 212px;
                      height: 52px;
                      line-height: 52px;
                      background: #FFFFFF;
                      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
                      border-radius: 4px;
                      border: 1px solid #EEEEEE;
                      margin-right: 20px;
                      .leftItemStyle{
                        padding-left: 15px;
                        width: 129px;
                      }
                      .rightItemStyle{
                        width: 81px;
                        text-align: center;
                        height: 50px;
                        line-height: 50px;
                        border-radius: 0px 2px 2px 0px;
                        font-size: 12px;
                      }
                      .ableStyle{
                        color: #0A87F8;
                        background: #E3F3FF;
                      }
                      .disableStyle{
                        color: #777777;
                        background: #F1F1F1;
                      }
                    }
                    .operateStyle {
                      width: 212px;
                      height: 52px;
                      position: absolute;
                      z-index: 99;
                      background: rgba(0, 0, 0, 0.3);
                      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
                      border-radius: 4px;
                      color: #FFFFFF;
                      .operateCommonStyle{
                        width:88px;
                        height:25px;
                        line-height: 25px;
                        background:rgba(0,0,0,0.3);
                        box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
                        border-radius:4px;
                        text-align: center;
                        margin: 13px 0 0 60px;
                      }
                    }
                    .disabledStyle{
                      width:108px;
                      height:99px;
                      z-index:80;
                      position: absolute;
                      background:rgba(255,255,255,0.8);
                    }
                }
                .ckeditor{
                    margin-top: 10px;
                    width: 770px;
                    height: calc(100vh - 250px);
                    .ckeditor-document{
                        height: 100%;
                        .right-ckeditor-document{
                            height: 100%;
                            /deep/ .jodit_wysiwyg{
                                height: calc(100vh - 310px);
                            }
                        }
                    }
                }
            }
        }
    }
    /deep/ .content{
        background-color:#777777;

    }
</style>
<style lang="less" scoped>
    /deep/ .ant-popover-inner-content {
        padding: 0;

        .action {
            padding: 8px 18px;
        }

        .action:hover {
            cursor: pointer;
            background: rgba(10, 135, 248, 0.1);
        }
    }
</style>