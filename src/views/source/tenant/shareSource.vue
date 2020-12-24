<template>
    <div class="shareSourceBox" :class="styleHeightLow?'height1':'height2'">
        <div class="share-source-detail">
            <div class="shared-company" v-if="sharedCompany.length>0">
                <span style="color: #777777;">已共享的合作公寓：</span>
                <span style="color: #111111">{{sharedCompany.join('、')}}</span>
            </div>
            <div class="select-company-title">
                <span class="title">选择要共享的公寓</span>
            </div>
            <div class="select-company">
                <select-compay @selectChangeStyle="selectChangeStyle" @selectChange="selectChange"></select-compay>
            </div>
        </div>
        <div class="buttonDiv">
            <a-button size="large" class="formItemMarginButton cancelFont" @click="cancelShareSource">
                取消
            </a-button>
            <a-button size="large" type="primary" class="formItemMarginButton saveFont" @click="shareSoure">
                保存
            </a-button>
        </div>
    </div>
</template>

<script>
    import selectCompay from './selectCompay';
    import  * as API from '@/api/source';
    export default {
        name: "shareSource",
        components: {
            selectCompay,
        },
        props: {
            sourceId:{
                type: String,
                required:true,
            }
        },
        data() {
            return {
                size: 'default',
                styleHeightLow:true,
                sharedCompany:[],
                sendData: {
                    id:'',
                    partnerIdList: [],
                },
            }
        },
        created(){
            this.styleHeightLow =true;
            this.initData();
        },
        methods: {
            handleChange(value) {
                console.error(`Selected: ${value}`);
            },
            popupScroll() {
                console.log('popupScroll');
            },
            selectChangeStyle(showSelect){
                if(showSelect){
                    this.styleHeightLow = false;
                } else{
                    this.styleHeightLow = true;
                }
            },
            selectChange(currentSelectId){
                if(currentSelectId.length>0){
                    this.sendData.partnerIdList = currentSelectId;
                }
            },
            initData(){
                API.listShared(this.sourceId).then(res=>{
                    if(res.data){
                        let data =res.data;
                        for (let i = 0; i < data.length; i++) {
                            this.sharedCompany.push(data[i].partnerName);
                        }
                    }
                });
            },
            cancelShareSource(){
                this.$emit('cancelShareSource');
            },
            shareSoure(){
                if(this.sendData.partnerIdList.length == 0){
                    this.$message.error('请选择要共享的公寓');
                }
                this.sendData.id = this.sourceId;
                API.resourceClueShare(this.sendData).then(res=>{
                    if (res.code == 200) {
                        this.$message.success('共享成功！');
                    }else{
                        this.$message.success('共享失败！');
                    }
                    this.$emit('successShareSource');
                });
            },
        }
    }
</script>

<style scoped lang="less">
    .height1{
        height: 262px;
    }
    .height2{
        height: 550px;
    }
    .shareSourceBox{
        position:relative;
        .share-source-detail {

            .shared-company {
                width: 100%;
                height: 40px;
                background: rgba(233, 241, 255, 1);
                opacity: 0.99;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(119, 119, 119, 1);
                line-height: 40px;
                padding: 0 20px;
            }
            .select-company-title{
                margin-top: 20px;
                width: 100%;
                .title{
                    color: #333333;
                    margin-left: 20px;

                }
            }
            .select-company{
                padding: 10px 20px 0 20px;
                width: 100%;
            }
        }
        .buttonDiv {
            position: absolute;
            bottom: 0px;
            right: 20px;
            height: 75px;
            .formItemMarginButton {
                width: 120px;
                height: 40px;
                margin-left: 18px;
                margin-top: 15px;
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
</style>
