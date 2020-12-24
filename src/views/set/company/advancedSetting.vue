<template>
    <!-- 高级设置（转让/解散企业） -->
    <div class="advanced-setting-box">
        <div class="advanced-setting">
            <div class="source">
                <div class="title clearfix">
                    <div class="blueStyle f-fl"></div>
                    <div class="titleFont f-fl">转让企业</div>
                </div>
                <div class="describe">
                    你可以将企业转让给企业任意成员，转让后你的角色将变为普通成员，无法再管理当前企业，此操作无法撤销，请谨慎！
                </div>
                <div class="nameStyle clearfix">
                    <div class="nameStyle1 f-fl">{{nameJc}}</div>
                    <div class="nameStyle2 f-fl">
                            {{name}}
                    </div>
                </div>
                <div class="saveButton">
                    <div class="formItemMarginButton cursor" @click="openTransfer" v-mark="['mk_set_company_gjsz']">
                        转让
                    </div>
                </div>
                <div class="line"></div>
                <div class="title clearfix">
                    <div class="blueStyle f-fl"></div>
                    <div class="titleFont f-fl">解散企业</div>
                </div>
                <div class="describe">
                    解散企业后，所有企业成员将无法继续访问当前企业，企业中的所有数据将会永久删除，此操作无法撤销，请谨慎！
                </div>
                <div class="nameStyle clearfix">
                    <div class="nameStyle1 f-fl">{{nameJc}}</div>
                    <div class="nameStyle2 f-fl">
                        {{name}}
                    </div>
                </div>
                <div class="saveButton">
                    <div style="background:#FB4246;border-color:#FB4246" class="formItemMarginButton cursor" @click="openDissolution" v-mark="['mk_set_company_gjsz']">
                        解散
                    </div>
                </div>
            </div>
        </div>
        <!-- 转让企业 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="transferDialog" class="ownModalBorder titDialog" title="转让企业" @cancel="transferDialog=false;">
            <transfer :apartmentName="apartmentName" :phone="phone"  @cancel="transferDialog=false;" @success="transferDialog=false;"></transfer>
        </a-modal>
        <!-- 解散企业 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="dissolutionDialog" class="ownModalBorder titDialog" title="解散企业" @cancel="dissolutionDialog=false;">
            <dissolution :apartmentName="apartmentName" :phone="phone" @cancel="dissolutionDialog=false;" @success="dissolutionDialog=false;"></dissolution>
        </a-modal>
    </div>
</template>

<script>
    import { geManagerAccount } from '@/api/enterprise';
    import Transfer from  './transfer';
    import Dissolution from './dissolution';
    export default {
        name: "advancedSetting",
        components: {
            Transfer,
            Dissolution,
        },
        data() {
            return {
                name:'',
                nameJc:'',
                phone:'',
                apartmentName:'',
                transferDialog:false,
                dissolutionDialog:false,
            };
        },
        created: function () {
        },
        methods: {
            openTransfer(){
                this.transferDialog = true;
            },
            openDissolution(){
                this.dissolutionDialog = true;
            },
            getUserInfo(){
                geManagerAccount().then(res => {
                    this.apartmentName = res.data.apartmentName;
                    this.name = res.data.name;
                    this.phone = res.data.phone;
                    if(/^[a-zA-Z]*$/.test(this.name)){
                        this.nameJc = this.name.substr(0,1);
                    }else{
                        this.nameJc = this.name.substring(this.name.length-2);
                    }
                });
            },
        },
    };


</script>

<style lang="less" scoped>
.advanced-setting-box{
    background:rgba(255,255,255,1);
    .advanced-setting{
        height: 100%;
        .source{
            padding: 20px 0 0 20px;
            .title{
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
            }
            .describe{
                margin: 10px 20px 0 14px;
                padding-left: 5px;
                min-height:34px;
                line-height: 34px;
                background:rgba(247,248,251,1);
                color: #777777;
            }
            .nameStyle{
                margin: 15px 20px 0 14px;
                .nameStyle1{
                    font-size:12px;
                    height: 40px;
                    width:40px;
                    border-radius: 50%;
                    background:rgba(10,135,248,0.1);
                    color: #0A87F8;
                    line-height: 40px;
                    text-align: center;
                }
                .nameStyle2 {
                    margin-left: 10px;
                    margin-right: 10px;
                    height: 40px;
                    line-height: 40px;
                    color:#111111;
                    font-size: 14px;
                    font-weight: 400;
                }
            }
            .saveButton{
                margin: 20px 0 20px 14px;
                .formItemMarginButton{
                    width:100px;
                    height:28px;
                    line-height: 28px;
                    background:rgba(10,135,248,1);
                    border-radius:4px;
                    color: #FFFFFF;
                    text-align: center;
                }
            }
            .line{
                margin: 0 20px 20px 14px;
                height:1px;
                border: 1px dashed #DDDDDD;
            }
        }
    }
}
</style>