<template>
    <div class="imgPre-box">
        <div class="imgShow" v-if="functionPicPreList.length>1&&functionPicPreList.length<=5">
        </div>
        <div class="imgShowMore"  v-if="functionPicPreList.length>5">
        </div>
        <div class="rotationPic" :class="source==1?'special rotationPicFocus':'rotationPicNoFocus'">
            <!-- 图片轮播-->
            <a-carousel effect="fade" autoplay pauseOnHover>
                <img :src="item" v-for="(item,index) in rotationPicPreList" alt="" :key="index">
            </a-carousel >
            <div v-if="rotationPicPreList.length == 0">
                <img src="../../../assets/product/noData.png" :style="source==1?'width:318px;height:178px;border-radius:8px;':'width:300px;height:168px;'" alt="">
            </div>
        </div>
        <div class="functionPic" :class="source==2?'special functionPicFocus functionPicFocusHeight':'functionPicNoFocus functionPicNoFocusHeight'" v-if="functionPicPreList.length>1&&functionPicPreList.length<=5" style="overflow:hidden">
            <!-- 功能区图片 小于2 张不显示，2-5 张显示区 -->
            <ul>
                <li v-for="(item,index) in functionPicPreList" :key="index" :style="functionPicPreList.length>5?'width:20%':'width:'+(100/functionPicPreList.length)+'%'">
                    <p><img :src="item.iconUrl" style="width: 42px;height: 42px"></p>
                    <p style="font-size: 12px;"><span>{{item.name}}</span></p>
                </li>
            </ul>
        </div>
        <div class="funtionMorePic clearfix" :class="source==2?'special functionPicFocus':'functionPicNoFocus'" v-if="functionPicPreList.length>5">
            <!-- 功能区图片 小于2 张不显示，5 张以上显示区 -->
            <!--  6 张： 33.3%; 7、8 张 ： 20%；9、10 张：20%-->
            <div v-for="(item,index) in functionPicPreList" :key="index" class="f-fl" :style="functionPicPreList.length==6?'width:'+(100/3)+'%':functionPicPreList.length>=9?'20%':'25%'">
               <p class="funtionMorePicNameTop" ><img :src="item.iconUrl" style="width: 42px;height: 42px"></p>
               <p class="funtionMorePicNameBottom"><span>{{item.name}}</span></p>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "imgPre",
        components: {
        },
        props: {
            rotationPicPreList: {   //当前轮播id
                type: Array,
                default: []
            },
            functionPicPreList: {   //当前轮播id
                type: Array,
                default: []
            },
            source:{
                type: Number,
                default: 1,         //来自轮播
            }
        },
        data() {
            return {

            };
        },
        created: function () {
        },
        methods:{

        },
    };
</script>

<style scoped lang="less">
    .imgPre-box{
        width: 520px;
        height:calc(100vh - 10px);
        overflow: auto;
        padding: 30px 95px;
        position: relative;
        .imgShow{
            width: 328px;
            height: 675px;
            background: url("../../../assets/product/rotation_pre.png") no-repeat #F0F4FF;
            background-size: 328px 675px;
        }
        .imgShowMore{
            width: 328px;
            height: 675px;
            background: url("../../../assets/product/rotation_more.png") no-repeat #F0F4FF;
            background-size: 328px 675px;
        }
        .rotationPicFocus{
            width:320px;
            height:180px;
            top: 120px;
            left: 100px;
        }
        .rotationPicNoFocus{
            width:300px;
            height:168px;
            top: 120px;
            left: 110px;
        }
        .rotationPic{
            z-index: 10;
            background:rgba(216,216,216,1);
            position: absolute;
            border-radius: 14px 14px 0 0;
            img{
                width:300px;
                height:168px;
                border-radius: 14px 14px 0 0;
            }
        }
        .functionPic{
            z-index: 99;
            background:rgba(255,255,255,1);
            box-shadow:0px 5px 10px 0px rgba(0,0,0,0.2);
            position: absolute;
            border-radius:14px;
            flex: 1;
            display: flex;
            justify-content: space-around;
            align-items: center;
            overflow-x: scroll;
            overflow-y: hidden;
            ul{
                height: 84px ;
                display: inline;
                width: 100%;
                white-space: nowrap;
                overflow-y: hidden;
                overflow-x: scroll;
                float: left;
            }
            li{
                text-align: center;
                padding-top: 12px;
                cursor: pointer;
                display: inline-block;
            }
        }
        .funtionMorePic{
            z-index: 99;
            background:rgba(255,255,255,1);
            box-shadow:0px 5px 10px 0px rgba(0,0,0,0.2);
            position: absolute;
            border-radius:14px;
            .funtionMorePicNameTop{
                text-align: center;font-size: 12px;vertical-align: middle;
                padding-top: 6px;
            }
            .funtionMorePicNameBottom{
                text-align: center;font-size: 12px;vertical-align: middle;
            }
            padding-bottom: 6px;
        }
        .functionPicFocus{
            width:320px;
            top: 250px;
            left: 100px;
        }
        .functionPicNoFocus{
            width:276px;
            top: 250px;
            left: 125px;
        }
        .functionPicFocusHeight{
            height:84px;
        }
        .functionPicNoFocusHeight{
            height:84px;
        }
        .special{
            box-shadow:0px 0px 10px 0px rgba(10,135,248,0.5);
            border-radius:8px;
            border:1px solid rgba(10,135,248,1);
        }
    }
</style>