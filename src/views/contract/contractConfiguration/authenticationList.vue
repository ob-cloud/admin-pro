<template>
    <!-- 合同认证首页 -->
    <div class="authentication">
        <!-- 认证列表 -->
        <div class="list">
            <div class="list-first">已认证主体</div>
            <div class="list-second">
                <div v-for="(item) in certBodyList" :key="item.id">
                    <div v-if="item.orgType==1" class="list-second-box cursor" :class="{active: clickItem == item.id}" @click="clickItem = item.id">
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
                        <div class="triangle-top-right"
                             :class="clickItem == item.id ?'choose-display-block':'choose-display-none'">
                        </div>
                        <icon-font class="triangle-top-right-choose"
                                   :class="clickItem == item.id ?'choose-display-block':'choose-display-none'"
                                   type="iconyumengtubiao_xuanzhong-"/>
                    </div>
                    <div v-if="item.orgType==2" class="list-second-box cursor" :class="{active: clickItem == item.id}" @click="clickItem = item.id">
                    <div class="list-second-box-first">
                        <b>经办人姓名: {{item.agentName}}</b>
                    </div>
                    <div class="list-second-box-second list-second-box-fonts">
                        经办人联系电话：{{item.agentPhone}}
                    </div>
                    <div class="list-second-box-third list-second-box-fonts">
                        经办人身份信息：{{item.agentCertType}}-{{item.agentCertCode}}
                    </div>
                    <div class="triangle-top-right"
                         :class="clickItem == item.id ?'choose-display-block':'choose-display-none'">
                    </div>
                    <icon-font class="triangle-top-right-choose"
                               :class="clickItem == item.id ?'choose-display-block':'choose-display-none'"
                               type="iconyumengtubiao_xuanzhong-"/>
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
                <div class="buttonStyle f-fl">
                    <div class="cancelOption">
                        <a-button size="large" type="submit" @click="cancel"
                                  class="formItemMarginButton cancelFont" >
                            取消
                        </a-button>
                    </div>
                    <div class="saveOption">
                        <a-button size="large" type="primary" @click="save"
                                  class="formItemMarginButton">
                            确认
                        </a-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 其他子组件 -->
        <a-modal destroyOnClose centered title="开通认证" v-model="addVisible" class="ownModalBorder titDialog"
                 :footer="null" :maskClosable="false" width="800px">
            <add-authentication :authenticationId="''" :itemInfo="itemInfo" @closeCurrent="closeAdd" @cancelCloseCurrent="closeAdd"
                                :templateId="middlewareId"  :operateTypeReg="4"></add-authentication>
        </a-modal>
    </div>

</template>

<script>
    import {econtListCertBody,econtTemplateCert} from '@/api/contractTemple';
    import addAuthentication from './addAuthentication';

    export default {
        name: "authenticationList",
        components: {
            addAuthentication,
        },
        props: {
            templateId: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                clickItem: 1,
                certBodyList: [],                //认证列表
                addTitle:"",                     //添加子组件标题
                addVisible:false,                //是否显示子组件
                itemInfo:{},                     //查看时传递的数据
                authenticationId:"",             //id
                middlewareId:"",                //中间id，用于传递
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
                this.middlewareId = this.templateId;
            },
            //来自子组件
            closeAdd(){
                //关闭选择认证主体列表，返回主列表页面
                this.$emit('closeListModal');
                this.addVisible = false;
            },
            //***************与api相关********************//
            econtListCertBody() {
                let parameter = 1
                econtListCertBody(parameter).then(res => {
                    this.certBodyList = res.data;
                });
            },
            cancel(){
                this.$emit('closeListModal');
            },
            save(){
                let parameter = {};
                parameter.id = this.templateId;
                parameter.certBodyId = this.clickItem;
                econtTemplateCert(parameter).then(res => {
                    if (res.code == "200") {
                        this.$message.info('认证成功');
                        this.$emit('successAuthentication');
                    } else {
                        this.$message.error('认证失败');
                    }
                });
            },
        },
    }
</script>

<style scoped lang="less">
    .authentication {
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        .list {
            width: 100%;
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
                    width: 465px;
                    height: 190px;
                    border-radius: 4px;
                    margin: 0 20px 20px 0px;
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
                        margin-left: 40%;
                    }

                    .list-second-box-font {
                        margin-left: 41%;
                        margin-top: 10px;
                        color: #0A87F8;
                        font-size: 16px;
                    }
                }

                .buttonStyle {
                    margin: 30px 0px 20px 695px;
                    .cancelOption {
                        float: left;
                    }
                    .formItemMarginButton {
                        width: 120px;
                        height: 40px;
                    }
                    .cancelOption {
                        float: left;
                        margin-right: 20px;
                        /deep/ .ant-btn-primary {
                            border-color: #DDDDDD;
                        }
                        .cancelFont {
                            color: #666666;
                        }
                    }
                    .saveOption {
                        float: left;
                    }
                }
            }
        }
    }
</style>
