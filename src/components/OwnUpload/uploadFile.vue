<template>
    <div>
        <div class="f-clearfix" style="margin-right: -15px;" :class="styleStandard==1?'picStyle':styleStandard==3?'rotationStyle':'enclosureStyle'">
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
                        <div class="bottom-name-style overHidde" v-if="item.origin&&(item.origin.indexOf('xls') != -1||item.origin.indexOf('ppt') != -1||item.origin.indexOf('pdf') != -1||item.origin.indexOf('xlsx') != -1||item.origin.indexOf('doc') != -1||item.origin.indexOf('docx') != -1||item.origin.indexOf('txt') != -1)">{{item.fileOriginName}}</div>
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
                            <div v-if="item.status=='done' &&(item.origin.indexOf('pdf') != -1)" @click="previewPdf(item.origin)">
                                <img width="100%" height="100%"  src="https://oss.byteox.com/byteox/2020-07-07/d62c91badfc94f61867bb77f8d4e21d4.png" alt="">
                            </div>
                            <div v-if="item.status=='done' &&(item.origin.indexOf('xls') != -1||item.origin.indexOf('ppt') != -1||item.origin.indexOf('xlsx') != -1||item.origin.indexOf('doc') != -1||item.origin.indexOf('docx') != -1||item.origin.indexOf('txt') != -1)" @click="previewOfficeFile(item.origin)">
                                <img v-if="(item.origin.indexOf('xls') != -1||item.origin.indexOf('xlsx') != -1)" width="100%" height="100%"  src="https://oss.byteox.com/byteox/2020-07-07/9023fba12efa413a9e1f03d23f8b1404.png" alt="">
                                <img v-if="item.origin.indexOf('ppt') != -1||item.origin.indexOf('pptx') != -1" width="100%" height="100%"  src="https://oss.byteox.com/byteox/2020-07-07/7e24d3cf4d1845b0b3adfc1aa04228c3.png" alt="">
                                <img v-if="item.origin.indexOf('doc') != -1||item.origin.indexOf('docx') != -1" width="100%" height="100%"  src="https://oss.byteox.com/byteox/2020-07-07/eea23edde3524918a0caa95e02854516.png" alt="">
                                <img v-if="item.origin.indexOf('txt') != -1" width="100%" height="100%"  src="https://oss.byteox.com/byteox/2020-07-07/db1ccfe9b4fd41b8ad98cc3d2bb63b16.png" alt="">
                            </div>
                        </div>
                    </div>
            <a-upload v-if="picUploadVisiable"
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
                :accept="picAccept">
                <div v-if="(sendData.bizType == 1 || sendData.bizType == 13 || sendData.bizType == 14 || sendData.bizType == 15) && showPicTypeFlag && (picsList.length + filesList.length)< maxLength"
                     @mouseenter="uploadDisabled=true;" @mouseleave='uploadDisabled=true;'>
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
                <div v-else-if="picsListLength< picMaxLength" @mouseenter="uploadDisabled=false">
                    <div :class="styleStandard==1?'pic':styleStandard==3?'rotation':'enclosure'">
                        <slot>
                            <div class="check-pic">
                                <a-icon type="plus" />
                                <div class="ant-upload-text">上传图片</div>
                            </div>
                        </slot>
                    </div>
                </div>
            </a-upload>
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
                    :accept="accept">
                <div v-if="(sendData.bizType == 1 || sendData.bizType == 13 || sendData.bizType == 14 || sendData.bizType == 15) && showPicTypeFlag && (picsList.length + filesList.length)< maxLength"
                     @mouseenter="uploadDisabled=true;" @mouseleave='uploadDisabled=true;'>
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
                <div v-else-if="(!picUploadVisiable&&(picsList.length + filesList.length)< maxLength)||(picUploadVisiable&& fileListLength< fileMaxLength)" @mouseenter="uploadDisabled=false">
                    <div :class="styleStandard==1?'pic':styleStandard==3?'rotation':'enclosure'">
                        <slot>
                            <div class="check-pic">
                                <a-icon type="plus" />
                                <div class="ant-upload-text">上传图片/附件</div>
                            </div>
                        </slot>
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
    import * as PublicAPI from '@/api/public'
    import {ACCESS_TOKEN} from '@/store/mutation-types'
    export default {
        name: "index",
        components: {
        },
        computed: {
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
            picUploadVisiable:{
                type: Boolean,
                default: false,
            },
            picAccept:{
                type: String,
                default: '.jpg, .jpeg, .png',
            },
            maxLength: {
                type: Number,
                default: 24,
            },
            picMaxLength:{
                type: Number,
                default: 2,
            },
            fileMaxLength:{
                type: Number,
                default: 3,
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
            addRealDelete: {
                type: Boolean,
                default: true,
                //用于控制来自添加后，不需要显示删除成功
            },
        },
        data(){
            return {
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
                picsListLength:0,
                fileListLength:0,
                filesList:[],
                deletePicList: [],
                previewVisible: false,
                previewImage: '',
                showBtn: false,
                currentActiveIndex: '',
                flag: false,
                unShowPicType: true,
                styleStandard:1,        //pic图片 enclosure附件
            }
        },
        created() {
            const token = this.$ls.get(ACCESS_TOKEN)
            this.sendData = Object.assign({},this.uploadParms);
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
                this.updateFileLength();
                this.picsList.sort(function (a,b) {
                    return a.orderIndex - b.orderIndex
                })
            }
        },
        methods: {
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
            previewPdf(url){
                window.open(url)
            },
            previewOfficeFile(url){
                window.open('https://view.officeapps.live.com/op/view.aspx?src=' + url);
            },
            handleChange({ fileList }) {
                if (!this.flag){
                    fileList.forEach((item,i)=>{
                        item.fileOriginName = item.name;
                        item.orderIndex = item.orderIndex + i;
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
                            if(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg'){
                                item.tempUrl = this.getOriginUrl(item.originFileObj);
                            }
                        }
                    });
                    let arr = fileList.filter(item=>!this.deletePicList.includes(item)).filter(item=>!this.picsList.includes(item));
                    // this.picsList = [];
                    this.picsList.push(...arr);
                    this.updateFileLength();
                    let len = this.picsList.length;
                    if(this.picUploadVisiable){
                        if(this.picsListLength>this.picMaxLength){
                            let msg = '最多只能上传'+ this.picMaxLength +'张图片';
                            this.$message.info(msg);
                        }
                        if(this.fileListLength>this.fileMaxLength){
                            let msg = '最多只能上传'+ this.fileMaxLength +'张附件';
                            this.$message.info(msg);
                        }
                    } else{
                        if (len > this.maxLength){
                            let msg = '最多只能上传'+ this.maxLength +'张图片';
                            this.$message.info(msg);
                        }
                    }
                    this.deletePicList.push(...this.picsList.splice(this.maxLength-1,len-this.maxLength));
                }

            },
            beforeUpload(file, fileList){
                // console.log('file',file)
                // console.log('fileList',fileList)
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
            updateFileLength(){
                this.picsListLength = 0;
                this.fileListLength = 0;
                this.picsList.forEach((item)=>{
                    if(item.origin) {
                        if (item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg') {
                            this.picsListLength += 1;
                        } else {
                            this.fileListLength += 1;
                        }
                    }
                });
            },
            deletePic(list,index){
                if (list && list.id){
                    if(list.notRealDelete&&list.bizId){
                        this.picsList.splice(index,1);
                        this.updateFileLength();
                    }
                    else{
                        if(this.addRealDelete){
                            PublicAPI.removePic(list.id).then(res => {
                                if (res.code == 200) {
                                    this.deletePicList.push(...this.picsList.splice(index, 1));
                                    this.$message.info('删除成功！');
                                    this.updateFileLength();
                                    this.$emit('deletePic');
                                }
                            }).catch(err => {
                                this.$message.info('删除失败！');
                            })
                        }
                        else{
                            this.picsList.splice(index,1);
                            this.updateFileLength();
                        }
                    }
                }else{
                    this.picsList.splice(index,1);
                    this.updateFileLength();
                }
            },
            changeSubBizType(item,itemTemp,index){
                let parameter ={};
                parameter.id = item.id;
                parameter.bizType = item.bizType;
                parameter.subBizType = itemTemp.subBizType;
                PublicAPI.fileUpdate(parameter).then(res=>{
                    if (res.code == 200){
                        this.picsList[index].subBizType = itemTemp.subBizType;
                        if (itemTemp.subBizType == 3) {
                            this.picsList[index].fileOriginName = '卧室';
                        } else if (itemTemp.subBizType == 4) {
                            this.picsList[index].fileOriginName = '客厅';
                        } else if (itemTemp.subBizType == 5) {
                            this.picsList[index].fileOriginName = '厨房';
                        } else if (itemTemp.subBizType == 6) {
                            this.picsList[index].fileOriginName = '卫生间';
                        } else if (itemTemp.subBizType == 7) {
                            this.picsList[index].fileOriginName = '阳台';
                        } else if (itemTemp.subBizType == 8) {
                            this.picsList[index].fileOriginName = '吧台';
                        } else if (itemTemp.subBizType == 2) {
                            this.picsList[index].fileOriginName = '户型图';
                        } else if (itemTemp.subBizType == 10) {
                            this.picsList[index].fileOriginName = '环境';
                        } else if (itemTemp.subBizType == 11) {
                            this.picsList[index].fileOriginName = '其他';
                        } else {
                            this.picsList[index].fileOriginName = '-';
                        }
                        this.picsList[index].response.data.subBizType = itemTemp.subBizType;
                        this.$set(this.picsList, index, this.picsList[index]);
                        this.$message.info('修改成功！');
                    }
                }).catch(err=>{
                    this.$message.info('修改失败！');
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
        .bottom-name-style{
            position: absolute;
            width: 100%;
            bottom: 0px;
            height:22px;
            line-height: 22px;
            color: #777777;
            background:rgba(0,0,0,0.1);
            text-align: center;
            padding: 0 5px;
            border-radius:0  0  4px  4px;
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
