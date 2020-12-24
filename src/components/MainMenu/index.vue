<template>
    <div id="sider-menu">
        <ul class="f-clearfix">
            <template v-for="(item, index) in firstRouter[0].children">
                <li class="f-fl f-clearfix" :key="index" :class="{activeMenu: (item.redirect || item.path) === $route.path}" v-if="item.meta.title !== '企业设置'" @click="changeRouter(item)">
                    <div class="menu-icon f-fl">
                        <img :src="require('../../assets/menu-icons/menu-' + item.meta.icon + '.png')" alt="">
                    </div>
                    <div class="menu-title f-fl">
                        <p>{{item.meta.title}}</p>
                        <p class="info">{{item.meta.tips}}</p>
                    </div>
                </li>
            </template>
        </ul>
        <template v-for="(item, index) in firstRouter[0].children">
            <div class="footer" :key="index" v-if="item.meta.title == '企业设置'" @click="changeRouter(item)">
                <icon-font class="icon" type="iconyumengtubiao_peizhi" />
                <span class="set">企业设置</span>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "mainMenu",
        data(){
            return {
            }
        },
        computed: {
            ...mapGetters(['firstRouter', 'secondRouter']),
        },
        created() {},
        methods: {
            changeRouter(router){
                if (this.$route.path !== (router.redirect || router.path)){
                    this.$router.push({
                        path: router.path
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #sider-menu{
        width: 470px;
        background-color: #ffffff;
        ul{
            padding: 20px 30px 0 20px;
            li{
                float: left;
                margin: 0 0 20px 10px;
                width: 200px;
                border-radius: 6px;
                &:hover{
                    cursor: pointer;
                    background-color: #F6F7F8;
                }
                &.activeMenu{
                    background-color: #F6F7F8;
                }
                .menu-icon{
                    width: 66px;
                    height: 66px;
                    line-height: 66px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .menu-title{
                    margin: 9px 0;
                    color: #333333;
                    font-weight:500;
                    p{
                        height: 24px;
                        line-height: 24px;
                    }
                    .info{
                        font-size: 12px;
                        font-weight:normal;
                        color: #777777;
                    }
                }
            }
        }
        .footer{
            padding-left: 30px;
            height: 60px;
            line-height: 60px;
            font-size: 14px;
            border-top: 1px solid #cccccc;
            cursor: pointer;
            .icon{
                margin-right: 14px;
                //vertical-align: middle;
                vertical-align: -0.25em;
                font-size: 24px;
            }
        }
    }
</style>
