<template>
    <!-- 合同认证首页 -->
    <div class="authentication">
        <!-- 申请认证 -->
        <div class="apply" v-if="contractUnAuthentication">
            <div class="first-line">
                <div class="first-line-pic">
                    <img src="../../../assets/contract/ebao.png">
                </div>
                <div class="first-line-font">
                    <div class="first-line-font-up">
                        <div class="first-line-font-one">全程取券</div>
                        <div class="first-line-font-two">|</div>
                        <div class="first-line-font-one"><span>直通法院</span></div>
                    </div>
                    <div class="first-line-font-dowm">
                        <div class="first-line-font-one">每一份信任都值得托付</div>
                        <div class="first-line-font-two">|</div>
                        <div class="first-line-font-one">安全可靠</div>
                        <div class="first-line-font-two">|</div>
                        <div class="first-line-font-one">法律权威</div>
                    </div>
                </div>
            </div>
            <div class="second-line">
                开通后，合同模板可进行法律认证，签约后合同具备法律效应
            </div>
            <div class="third-line">
                电子证据被多个司法机构广泛认可，证据链直通法院
            </div>
            <div class="third-line">
                信息安全管理体系国际认证标准，中华人民共和国公安部认证，信息管理安全体系认证，云计算服务增强级别能力等级认证
            </div>
            <div class="third-line">
                联合蚂蚁区块链技术，有效防止篡改；联合公证处，司法鉴定中心等权威机构
            </div>
            <div class="third-line">
                联合权威部门，为用户打造安全无忧的司法保障服务体系
            </div>
            <div class="fourth-line">
                <a-button class="button-apply" @click="openAddAuthentication">开通认证</a-button>
            </div>
        </div>
        <!-- 认证列表 -->
        <div class="list" v-if="!contractUnAuthentication">
            <div class="list-first">已认证主体</div>
            <div class="list-second">
                <div v-for="(item) in certBodyList" :key="item.id">
                    <div v-if="item.orgType==1" class="list-second-box cursor" :class="{active: clickItem == item.id}" @click="openEditAuthentication(item)">
                        <div class="list-second-box-first">
                            <b>{{item.name}}</b>
                        </div>
                        <div class="list-second-box-second list-second-box-fonts">
                            统一社会信用代码名：{{item.certCode}}
                        </div>
                        <div class="list-second-box-third list-second-box-fonts">
                            法人姓名：{{item.legalPerson}}
                        </div>
                        <div class="list-second-box-third list-second-box-fonts">
                            经办人姓名：{{item.agentName}}
                        </div>
                    </div>
                    <div v-if="item.orgType==2" class="list-second-box cursor" :class="{active: clickItem == item.id}" @click="openEditAuthentication(item)">
                    <div class="list-second-box-first">
                        <b>经办人姓名: {{item.agentName}}</b>
                    </div>
                    <div class="list-second-box-second list-second-box-fonts">
                        经办人联系电话：{{item.agentPhone}}
                    </div>
                    <div class="list-second-box-third list-second-box-fonts">
                        经办人身份信息：{{item.agentCertType|formatIdentityInfo}}-{{item.agentCertCode}}
                    </div>
                </div>
                </div>
                <div class="list-second-box cursor" @click="openAddAuthentication">
                    <div class="list-second-box-blank"></div>
                    <div class="list-second-box-img">
                        <img src="../../../assets/contract/authentication-other.png">
                    </div>
                    <div class="list-second-box-font">
                        认证其他主体
                    </div>
                </div>
            </div>
        </div>
        <!-- 其他子组件 -->
        <a-modal centered :title="addTitle" v-model="addVisible" class="ownModalBorder titDialog"
                 :footer="null"
                 width="804px" :destroyOnClose="true">
            <add-authentication :authenticationId="authenticationId" :itemInfo="itemInfo" @closeCurrent="closeCurrent" @cancelCloseCurrent="cancelCloseCurrent" :operateType="operateTypeAdd"></add-authentication>
        </a-modal>
    </div>

</template>

<script>
    import {econtListCertBody,} from '@/api/contractTemple';
    import addAuthentication from './addAuthentication';

    export default {
        name: "contractAuthentication",
        components: {
            addAuthentication,
        },
        data() {
            return {
                contractUnAuthentication: false,
                clickItem: 1,
                certBodyList: [],                //认证列表
                addTitle:"",                     //添加子组件标题
                addTemplateStyle:"",             //添加子组件初始样式
                addVisible:false,                //是否显示子组件
                authenticationId:"",                           //传递给子组件的id
                itemInfo:{},                     //查看时传递的数据
                operateTypeAdd:1,                //1、新增；2、查看；3、修改；4、认证；
            }
        },
        created() {
            this.econtListCertBody();
        },
        methods: {
            //***************页面操作事件*****************//
            //打开新增认证页面
            openAddAuthentication() {
                this.addTitle = "开通合同认证";
                this.addVisible =true;
                this.authenticationId = "";
                this.operateTypeAdd = 1;
            },
            openEditAuthentication(item){
                this.addTitle = "查看认证信息";
                this.addVisible =true;
                this.operateTypeAdd = 2;
                this.authenticationId = item.id;
                this.itemInfo = item;
            },
            //来自子组件
            closeCurrent(){
                setTimeout(() => {
                    this.econtListCertBody();
                }, 500);
                this.addVisible = false;
            },
            cancelCloseCurrent(){
                this.addVisible = false;
            },
            //***************与api相关********************//
            econtListCertBody() {
                let parameter = 1
                econtListCertBody(parameter).then(res => {
                    this.certBodyList = res.data;
                    if (res.data && res.data.length > 0) {
                        this.contractUnAuthentication = false;
                    } else {
                        this.contractUnAuthentication = true;
                    }
                });
            }
        },
        filters: {
            formatIdentityInfo: function(value) {
                let identityInfo = "身份证";
                switch (value) {
                    case 1:
                        identityInfo="身份证";
                        break;
                    case 2:
                        identityInfo="护照";
                        break;
                    case 3:
                        identityInfo="香港来往大陆通行证";
                        break;
                    case 4:
                        identityInfo="澳门来往大陆通行证";
                        break;
                    case 5:
                        identityInfo="台湾同胞证";
                        break;
                    case 6:
                        identityInfo="其他";
                        break;
                    default:
                }
                return identityInfo;
            },
        }
    }
</script>

<style scoped lang="less">
    .authentication {
        .apply {
            padding: 14px 14px 84px 14px;
            height: 100%;
            width: 100%;

            .first-line {
                height: 75px;
                margin: 37px 0px 37px 30px;

                .first-line-pic {
                    float: left;
                }

                .first-line-font {
                    margin-left: 43px;
                    height: 76px;
                    float: left;

                    .first-line-font-one {
                        color: #111111;
                        font-size: 16px;
                        float: left;
                    }

                    .first-line-font-two {
                        color: #BBBBBB;
                        font-size: 16px;
                        float: left;
                        margin: 0px 20px 0px 20px;
                    }

                    .first-line-font-up {
                        height: 36px;
                        line-height: 36px;
                    }

                    .first-line-font-dowm {
                        height: 36px;
                        line-height: 36px;
                    }
                }
            }

            .second-line {
                height: 30px;
                color: #FFA036;
                font-size: 16px;
                margin-left: 30px;
                margin-bottom: 10px;
            }

            .third-line {
                height: 22px;
                color: #777777;
                font-size: 16px;
                margin: 10px 0 10px 30px;
            }

            .fourth-line {
                margin: 52px 0 0 399px;
                height: 44px;

                .button-apply {
                    width: 480px;
                    height: 44px;
                    background-color: @themeColor;
                    color: #FFFFFF;
                    border-radius: 4px;
                }
            }
        }
        .list {
            //overflow:auto;
            .list-first {
                margin: 20px 0 15px 20px;
                color: #111111;
                font-size: 16px;
            }

            .list-second {
                .active {
                    border: 1px solid #0A87F8;
                }

                margin-left: 20px;

                .list-second-box {
                    width: 400px;
                    height: 190px;
                    border-radius: 4px;
                    margin: 0 22px 20px 0px;
                    float: left;
                    background: url("../../../assets/contract/authentication-bg-1.png") no-repeat #F0F4FF;
                    background-size: 400px 190px;
                    position: relative;

                    .triangle-top-right-choose {
                        position: absolute;
                        color: #FFFFFF;
                        top: 5px;
                        right: 5px;
                    }

                    .choose-display-none {
                        display: none;
                    }

                    .choose-display-block {
                        display: block;
                    }

                    .triangle-top-right {
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-top: 39px solid #0A87F8;
                        border-left: 43px solid transparent;
                        top: 0px;
                        right: 0px;
                    }

                    .list-second-box-first {
                        height: 50px;
                        line-height: 50px;
                        margin-left: 20px;
                        margin-right: 20px;
                        border-bottom: #DDDDDD solid 0.5px;
                    }

                    .list-second-box-second {
                        margin-top: 20px;
                    }

                    .list-second-box-third {
                        margin-top: 16px;
                    }

                    .list-second-box-fonts {
                        margin-left: 20px;
                        height: 20px;
                        line-height: 20px;
                        color: #333333;
                        font-size: 14px;
                    }

                    .list-second-box-blank {
                        height: 50px;
                    }

                    .list-second-box-img {
                        height: 51px;
                        align: center;
                        text-align: center;
                    }

                    .list-second-box-font {
                        margin-top: 10px;
                        color: #0A87F8;
                        font-size: 16px;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
