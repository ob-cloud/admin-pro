<template>
    <div>
        <div class="f-clearfix enclosureStyle" style="margin-right: -15px;">
            <div class="f-fl file-list" :class="styleStandard==1?'pic':styleStandard==3?'rotation':'enclosure'" key="-1" v-if="videoLoadding" style="border: 1px dashed #d9d9d9;">
              <div class="upload-content">
                <p class="uploading">上传中</p>
                <p class="percent-line" :style="{'width': originVideoObj.percent+ '%'}"></p>
              </div>
            </div>
            <div class="f-fl file-list" v-if="videoObj.origin" @mouseenter="showVideoBtn=true" @mouseleave="showVideoBtn=false" style="border: 1px solid #eeeeee;">
                <div class="f-clearfix top"  v-show="showVideoBtn">
                    <icon-font @click="deleteVideo" class="f-fr close" type="iconyumengtubiao_guanbi-1"/>
                </div>
                <video style="width: 120px;height: 76px;border-radius: 4px" :src="videoObj.origin" controls="controls"></video>
            </div>
            <div class="f-fl" v-show="!originVideoObj">
              <a-upload
                      class="upload"
                      :action="action"
                      listType="picture-card"
                      @change="uploadVideoChange"
                      multiple
                      :headers="uploadHeader"
                      :data="videoSendData"
                      :showUploadList="false"
                      :accept="videoAccept"
                      :beforeUpload="beforeUploadVideo"
                      v-if="!videoObj.origin"
              >
                  <div class="enclosure">
                      <div class="check-pic">
                          <img style="width: 28px;height: 28px" src="https://oss.byteox.com/byteox/2020-05-27/6f089a36aef043f1abc3965fee08c766.png" alt="">
                          <div class="ant-upload-text">添加视频</div>
                      </div>
                  </div>
              </a-upload>
            </div>
            <div class="f-fl file-list" :class="styleStandard==1?'pic':styleStandard==3?'rotation':'enclosure'" @mouseenter="showBtn=true;currentActiveIndex=i"
                 @mouseleave="showBtn=false;unShowPicType=true;currentActiveIndex=-1" v-for="(item,i) in picsList" :key="i">
                <div class="f-clearfix top"  v-show="(sendData.bizType != 1 && sendData.bizType != 13 && sendData.bizType != 14 && sendData.bizType != 15) && showBtn && currentActiveIndex == i">
                    <!--<span class="f-fl overHidde pic-name">{{item.fileOriginName}}</span>-->
                    <icon-font @click="deletePic(item,i)" class="f-fr close" type="iconyumengtubiao_guanbi-1"/>
                </div>
                <div class="f-clearfix top"  v-show="(sendData.bizType == 1 || sendData.bizType == 13 || sendData.bizType == 14 || sendData.bizType == 15)">
                    <div style="width: 100%;">
                        <span class="f-fl overHidde pic-name" @click="unShowPicType=false;">{{item.fileOriginName | formatName(item.subBizType,showPicTypeFlag)}}</span>
                        <icon-font v-show="showBtn && currentActiveIndex == i" @click="deletePic(item,i)" class="f-fr close" type="iconyumengtubiao_guanbi-1"/>
                    </div>
                </div>
                <div style="width: 100%" v-show="currentActiveIndex == i && unShowPicType==false">
                    <ul class="check-pic-type f-clearfix" :class="styleStandard==1?'pic':styleStandard==3?'rotation':'enclosure'">
                        <li
                                v-for="(itemTemp,index) in houseTabList"
                                :key="index"
                                @click="changeSubBizType(item,itemTemp,i)"
                        >{{itemTemp.name}}</li>
                    </ul>
                </div>
                <div class="upload-content" v-if="item.status!='done'">
                    <p class="uploading">上传中</p>
                    <p class="percent-line" :style="{'width': item.percent+ '%'}"></p>
                </div>
                <div v-if="!unShowPicType && currentActiveIndex == i">

                </div>
                <div v-else :class="styleStandard==1?'pic-img-list':styleStandard==3?'rotation-img-list':'enclosure-img-list'">
                    <div @click="handlePreview(item.origin)" v-if="item.status=='done' &&
                                (item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')">
                        <img v-if="item.tempUrl" width="100%" height="100%" :src="item.tempUrl" alt="" />
                        <img v-else width="100%" height="100%" :src="item.middle" alt=""  >
                    </div>
                </div>
            </div>
            <a-upload
                    class="upload f-fl"
                    :action="action"
                    listType="picture-card"
                    @change="handleChange"
                    multiple
                    :headers="uploadHeader"
                    :data="sendData"
                    :disabled="uploadDisabled"
                    :showUploadList="false"
                    :beforeUpload="beforeUpload"
                    :accept="accept"
            >
                <div v-if="(sendData.bizType == 1 || sendData.bizType == 13 || sendData.bizType == 14 || sendData.bizType == 15) && showPicTypeFlag && (picsList.length + filesList.length)< maxLength"
                     @mouseenter="uploadDisabled=true;"
                     @mouseleave='uploadDisabled=true;'
                >

                    <ul class="check-pic-type f-clearfix" :class="styleStandard==1?'pic':styleStandard==3?'rotation':'enclosure'">
                        <li
                                @mouseenter="uploadDisabled=false"
                                @mouseleave="uploadDisabled=true"
                                v-for="(item,index) in houseTabList"
                                :key="index"
                                @click="upload(item.subBizType)"
                        >{{item.name}}</li>
                    </ul>
                </div>
                <div v-else-if="(picsList.length + filesList.length)< maxLength" @mouseenter="uploadDisabled=false">
                    <div :class="styleStandard==1?'pic':styleStandard==3?'rotation':'enclosure'">
                        <div class="check-pic">
                            <img style="width: 28px;height: 28px" src="https://oss.byteox.com/byteox/2020-05-27/e803af1ecd2d47cba56503719876b332.png" alt="">
                            <div class="ant-upload-text">添加图片</div>
                        </div>
                    </div>
                </div>
            </a-upload>
        </div>
        <div class="tips" v-if="showTips">
            <p class="tips-title">温馨提示：</p>
            <p>* 仅支持图片格式（例如：jpg、png、jpeg等），最多上传24张，每张最大5M；</p>
            <p>* 拖动图片可以排序；第一张图片将作为封面图展示；</p>
            <p>* 上传图片后，鼠标移动到图片上显示图片标签类型，右上角出现删除图标；</p>
        </div>
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    import * as PublicAPI from '@/api/public'
    import {ACCESS_TOKEN} from '@/store/mutation-types'
    export default {
        name: "index",
        components: {
            draggable,
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
        filters:{
            formatName(value,subBizType,showPicTypeFlag){
                //独栋项目图片不用显示类型
                if(showPicTypeFlag){
                    if (subBizType == 3) {
                        value = '卧室';
                    } else if (subBizType == 4) {
                        value = '客厅';
                    } else if (subBizType == 5) {
                        value = '厨房';
                    } else if (subBizType == 6) {
                        value = '卫生间';
                    } else if (subBizType == 7) {
                        value = '阳台';
                    } else if (subBizType == 8) {
                        value = '吧台';
                    } else if (subBizType == 2) {
                        value = '户型图';
                    } else if (subBizType == 10) {
                        value = '环境';
                    } else if (subBizType == 11) {
                        value = '其他';
                    } else {
                        value = '-';
                    }
                    return value
                }
            }
        },
        props: {
            accept: {
                type: String,
                default: '.jpg, .jpeg, .png',
            },
            videoAccept: {
                type: String,
                default: '.mp4, .avi, .mov',
            },
            maxLength: {
                type: Number,
                default: 24,
            },
            showTips: {
                type: Boolean,
                default: true,
            },
            picList: {
                type: Array,
                default: function () {
                    return [
                        // {
                        //     bizId: '',
                        //     bizType: '',
                        //     id: '',
                        //     orderIndex: '',
                        //     middle: '',
                        //     origin: '',
                        //     small: '',
                        //     subBizType: '',
                        //     fileOriginName: '',
                        // }
                    ];
                },
            },
            videoObject: {
                type: Object,
                default: function () {
                    return {
                        // bizId: '',
                        // bizType: '',
                        // id: '',
                        // orderIndex: '',
                        // middle: '',
                        // origin: '',
                        // small: '',
                        // subBizType: '',
                        // fileOriginName: '',
                    };
                },
            },
            uploadParms: {
                type: Object,
                default: function () {
                    return {// 上传时附带的额外参数
                        bizId: "", // id
                        bizType: 1, // 图片大类标识
                        subBizType: "", // 图片子类标识
                        orderIndex: "" // 排序值
                    };
                },
            },
            showPicTypeFlag: {
                type: Boolean,
                default: true,
                //用于控制项目图片不显示房源类型
            },
        },
        data(){
            return {
                showVideoBtn: false,
                uploadHeader: {
                    Authorization: ""
                },
                action: process.env.VUE_APP_BASE_FILESERVER_URL + "/file_upload",
                sendData: {},
                uploadDisabled: true,
                houseTabList: [
                    {
                        subBizType: 3,
                        name: "卧室"
                    },
                    {
                        subBizType: 4,
                        name: "客厅"
                    },
                    {
                        subBizType: 5,
                        name: "厨房"
                    },
                    {
                        subBizType: 6,
                        name: "卫生间"
                    },
                    {
                        subBizType: 7,
                        name: "阳台"
                    },
                    {
                        subBizType: 8,
                        name: "吧台"
                    },
                    {
                        subBizType: 2,
                        name: "户型图"
                    },
                    {
                        subBizType: 10,
                        name: "环境"
                    },
                    {
                        subBizType: 11,
                        name: "其他"
                    }
                ],
                picsList:[],
                filesList:[],
                deletePicList: [],
                previewVisible: false,
                previewImage: '',
                showBtn: false,
                currentActiveIndex: '',
                flag: false,
                unShowPicType: true,
                styleStandard:1,        //pic图片 enclosure附件
                videoObj: {},
                videoSendData: {},
              videoLoadding:false,
              originVideoObj:undefined,
            }
        },
        created() {
            const token = this.$ls.get(ACCESS_TOKEN)
            this.sendData = Object.assign({},this.uploadParms);
            this.sendData.orderIndex = 2;
            this.videoSendData = Object.assign({},this.uploadParms);
            this.videoSendData.orderIndex = 0;
            if(this.sendData.bizType == 1 || this.sendData.bizType == 13 || this.sendData.bizType == 14 || this.sendData.bizType == 15){
                this.styleStandard = 1;//房源图片
            } else if(this.sendData.bizType == 9){
                this.styleStandard = 3;//轮播图
            } else{
                this.styleStandard = 2;//其他图片及附件
            }
            this.uploadHeader.Authorization =
                "Bearer " + token;
            this.picsList.push(...this.picList)
            this.videoObj = Object.assign({},this.videoObject);
        },
        mounted(){

        },
        watch:{
            uploadParms(){
                // console.log(this.uploadParms)
                return this.sendData = Object.assign({},this.uploadParms)
            },
            picList(){
                let picsList = [];
                let picsIdList = [];
                this.picsList.push(...this.picList);
                this.picsList.forEach((item,i)=>{
                    item.status = 'done';
                    if(picsList.length ==0){
                        picsList.push(item);
                        picsIdList.push(item.id)
                    }else {
                        if(picsIdList.indexOf(item.id)===-1){
                            picsList.push(item);
                            picsIdList.push(item.id)
                        }
                    }
                });
                this.picsList = picsList;
                this.picsList.sort(function (a,b) {
                    return a.orderIndex - b.orderIndex
                })
            },
            videoObject(){
                return this.videoObj = Object.assign({},this.videoObject);
            },
        },
        methods: {
            uploadVideoChange({ fileList,event }){
              this.originVideoObj = fileList[0];
              if(event&&event.percent){
                this.originVideoObj.percent =event.percent;
                this.videoLoadding = true;
              }
              if(this.originVideoObj.percent&&this.originVideoObj.percent < 100){
                this.originVideoObj.status = 'uploading';
                this.videoLoadding = true;
              }
              else if(this.originVideoObj.percent&&this.originVideoObj.percent == 100){
                this.originVideoObj.status = 'done';
                if (this.originVideoObj.response && this.originVideoObj.response.data){
                  this.videoObj = fileList[0].response.data;
                  this.videoLoadding = false;
                }
              }
              else{
                this.originVideoObj.status = 'uploading';
              }
            },
            upload(subBizType) {
                this.sendData.subBizType = subBizType;
                this.uploadDisabled = false;
            },
            handleCancel() {
                this.previewVisible = false;
            },
            handlePreview(url) {
                this.previewImage = url;
                this.previewVisible = true;
            },
            handleChange({ fileList }) {
                if (!this.flag){
                    fileList.forEach((item,i)=>{
                        item.fileOriginName = item.name;
                        if (item.response && item.response.data){
                            item.origin = item.response.data.origin;
                            item.id = item.response.data.id;
                            item.subBizType = item.response.data.subBizType;
                            item.fileExt = item.response.data.fileExt;
                            let bizType = item.response.data.bizType;
                            let subBizType = item.response.data.subBizType;
                            if(bizType == 1 || bizType == 13 || bizType == 14 || bizType == 15) {
                                if (subBizType == 3) {
                                    item.fileOriginName = '卧室';
                                } else if (subBizType == 4) {
                                    item.fileOriginName = '客厅';
                                } else if (subBizType == 5) {
                                    item.fileOriginName = '厨房';
                                } else if (subBizType == 6) {
                                    item.fileOriginName = '卫生间';
                                } else if (subBizType == 7) {
                                    item.fileOriginName = '阳台';
                                } else if (subBizType == 8) {
                                    item.fileOriginName = '吧台';
                                } else if (subBizType == 2) {
                                    item.fileOriginName = '户型图';
                                } else if (subBizType == 10) {
                                    item.fileOriginName = '环境';
                                } else if (subBizType == 11) {
                                    item.fileOriginName = '其他';
                                } else {
                                    item.fileOriginName = '-';
                                }
                            }
                            item.tempUrl = this.getOriginUrl(item.originFileObj);
                        }
                    });
                    let arr = fileList.filter(item=>!this.deletePicList.includes(item)).filter(item=>!this.picsList.includes(item));
                    // this.picsList = [];
                    this.picsList.push(...arr);
                    let len = this.picsList.length;
                    if (len > this.maxLength){
                        let msg = '最多只能上传'+ this.maxLength +'张图片';
                        this.$message.info(msg);
                    }
                    this.deletePicList.push(...this.picsList.splice(this.maxLength-1,len-this.maxLength));
                }

            },
            beforeUpload(file, fileList){
                for (let i = 0; i< fileList.length;i++){
                    if (fileList[i].size > 1024*1024*5){
                        this.$message.info('文件大小不能大于5M，请重新选择');
                        this.flag = true;
                        fileList.splice(0,fileList.length)
                        return false
                    }
                }
                this.flag = false;
            },
            beforeUploadVideo(file, fileList){
                for (let i = 0; i< fileList.length;i++){
                    if (fileList[i].size > 1024*1024*50){
                        this.$message.info('视频大小不能大于50M，请重新选择');
                        this.flag = true;
                        fileList.splice(0,fileList.length)
                        return false
                    }
                }
                this.flag = false;
            },
            deletePic(list,index){
                if (list && list.id){
                    if(list.notRealDelete&&list.bizId){
                        this.picsList.splice(index,1)
                    }
                    else{
                        PublicAPI.removePic(list.id).then(res => {
                            if (res.code == 200) {
                                this.deletePicList.push(...this.picsList.splice(index, 1));
                                this.$message.info('删除成功！');
                            }
                        }).catch(err => {
                            this.$message.info('删除失败！');
                        })
                    }
                }else{
                    this.picsList.splice(index,1)
                }
            },
            deleteVideo(){
                PublicAPI.removePic(this.videoObj.id).then(res => {
                    if (res.code == 200) {
                        this.videoObj = {}
                        this.originVideoObj = undefined;
                        this.$message.info('删除成功！');
                    }
                }).catch(err => {
                    this.$message.info('删除失败！');
                })
            },
            changeSubBizType(item,itemTemp,index){
                let parameter ={};
                parameter.id = item.id;
                parameter.bizType = item.bizType;
                parameter.subBizType = itemTemp.subBizType;
                PublicAPI.fileUpdate(parameter).then(res=>{
                    if (res.code == 200){
                        this.picsList[index].subBizType = itemTemp.subBizType;
                        this.$set(this.picsList, index, this.picsList[index]);
                        this.$message.info('修改成功！');
                    }
                }).catch(err=>{
                    this.$message.info('修改失败！');
                })
            },
            sort(){
                let arr = [];
                this.picsList.forEach((val,i)=>{
                    arr.push(val.id)
                })
                PublicAPI.sortPicList(arr).then(res=>{
                    // console.log(res)
                }).catch(err=>{
                    this.$message.info('排序失败！');
                })
            },
            getOriginUrl(file){
                let url = null ;
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }
                return url ;
            },
        },
    }
</script>

<style scoped lang="less">
    .pic{
        width: 174px;
        height: 116px;
        img{
            height: 116px;
        }
        .check-pic{
            padding-top: 40px;
        }
    }
    .enclosure{
        width: 120px;
        height: 76px;
        img{
            height: 76px;
        }
        .check-pic{
            padding-top: 18px;
        }
        & /deep/ .ant-upload.ant-upload-select-picture-card > .ant-upload{
            padding: 0;
            width: 120px;
            height: 76px
        }
    }
    .rotation{
        width: 174px;
        height: 98px;
        img{
            height: 98px;
        }
        .check-pic{
            padding-top: 18px;
        }
        & /deep/ .ant-upload.ant-upload-select-picture-card > .ant-upload{
            padding: 0;
            width: 174px;
            height: 98px
        }
    }
    .file-list{
        position: relative;
        margin: 0 10px 10px 0;
        height: 76px;
        overflow: hidden;
        border-radius: 4px;
        //background-color: @bigBackgroundColor;
        cursor: pointer;
        .top{
            position: absolute;
            top: 0;
            color: #ffffff;
            text-align: center;
            width: 100%;
            height:20px;
            line-height:20px;
            font-size: 14px;
            z-index: 1;
            .pic-name{
                padding: 0 10px;
                max-width:100px;
                background:rgba(0,0,0,0.6);
                border-radius:5px 0px 5px 0px;
            }
            .close{
                padding-top: 2px;
                width:20px;
                height:20px;
                line-height:20px;
                background:rgba(0,0,0,0.6);
                border-radius:0px 5px 0px 5px;
            }
        }
        .upload-content{
            position: absolute;
            .uploading{
                color: @secondaryFontColor;
            }
            .percent-line{
                height: 2px;
                background-color: @themeColor;
            }
        }
        img{
            background-color: #F6F7F8;
            border-radius: 4px;
        }
        .check-pic-type{
            padding: 15px 8px;
            font-size: 12px;
            border-radius: 4px;
            text-align: center;
            background-color: @bigBackgroundColor;
            cursor: pointer;
            color: @secondaryFontColor;
        }
        .check-pic-type{
            background-color: @placeholderColor;
            & > div{
            }
            li{
                float: left;
                margin: 0 0 10px 10px;
                width: 40px;
                height: 24px;
                line-height: 24px;
                color: #ffffff;
                border: 1px solid #ffffff;
                border-radius: 4px;
            }
            li:hover{
                border-color: @themeColor;
                color: @themeColor;
            }
        }
        .pic-img-list {
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
        .enclosure-img-list {
            height: 76px;
            width: 120px;
            margin-right: 10px;
            >div{
                width: 100%;
                height: 100%;
                line-height: 76px;
                border: 1px solid #eeeeee;
                background-color: #f6f7f8;
                text-align: center;
                border-radius: 6px;
                overflow: hidden;
                img {
                    width: auto;
                    max-width: 120px;
                    height: auto;
                    max-height: 76px;
                    overflow: hidden;
                }
            }
        }
        .rotation-img-list {
            height: 98px;
            width: 174px;
            margin-right: 10px;
            >div{
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
        }
    }
    .picStyle{
        & /deep/ .ant-upload.ant-upload-select-picture-card{
            width: 174px;
            height: 116px;
        }
    }
    .enclosureStyle{
        & /deep/ .ant-upload.ant-upload-select-picture-card{
            width: 120px;
            height: 76px;
        }
    }
    .rotationStyle{
        & /deep/ .ant-upload.ant-upload-select-picture-card{
            width: 174px;
            height: 98px;
        }
    }
    .upload{
        & /deep/ .ant-upload.ant-upload-select-picture-card > .ant-upload{
            padding: 0;
        }
        & /deep/ .ant-upload-list-picture-card .ant-upload-list-item{
            padding: 0;
            border: none;
        }
        .check-pic-type{
            padding: 12px 8px;
            font-size: 12px;
            border-radius: 4px;
            text-align: center;
            background-color: @bigBackgroundColor;
            cursor: pointer;
            color: @secondaryFontColor;
        }
        .check-pic-type{
            background-color: @placeholderColor;
            & > div{
            }
            li{
                float: left;
                margin: 0 0 10px 10px;
                width: 40px;
                height: 24px;
                line-height: 24px;
                color: #ffffff;
                border: 1px solid #ffffff;
                border-radius: 4px;
            }
            li:hover{
                border-color: @themeColor;
                color: @themeColor;
            }
        }
    }
    .tips{
        font-size: 12px;
        line-height: 24px;
        color: #777777;
    }

</style>
