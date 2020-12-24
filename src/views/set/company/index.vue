<template>
    <div class="company">
        <content-top>
            <div class="f-fl">
                <top-title :statusData="statusData" @changeStatus="changeStatus"></top-title>
            </div>
        </content-top>
        <content-main>
            <div v-show="status==1&&btnArr.indexOf('1')>-1">
                <company-info ref="companyInfoChild"></company-info>
            </div>
            <div v-show="status==2&&btnArr.indexOf('2')>-1">
                <advanced-setting ref="advancedSettingChild"></advanced-setting>
            </div>
            <div v-show="btnArr.length==0">
              <div class="no-permissions-wrap">
                <img src="./../../../assets/no-permission.png">
                <div class="tips" style="margin-bottom: 0px;">暂无权限哟～请联系管理员设置</div>
              </div>
            </div>
        </content-main>
    </div>
</template>

<script>
    import CompanyInfo from  './companyInfo';
    import AdvancedSetting from './advancedSetting';
    import TopTitle from '@/components/TopStatus/title';

    export default {
        components: {
            CompanyInfo,
            TopTitle,
            AdvancedSetting,
        },
        data() {
            return {
                status: 1,              //当前面板值
                statusData: [
                    {
                        title: '企业信息',
                        status: 1,
                        mark:['mk_set_company_ck'],
                    },
                    {
                        title: '高级设置',
                        status: 2,
                        mark:['mk_set_company_gjsz'],
                    },
                ],
                btnArr:[],
            }
        },
        created() {
            this.status = 2;
            this.btnArr = [];
            JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                if (value.mark == "mk_set_company_ck") {
                    this.status =1;
                    this.btnArr.push('1');
                }
                if(value.mark == "mk_set_company_gjsz"){
                    this.btnArr.push('2');
                }
            })
        },
        methods: {
            changeStatus(item) {
                this.status = item.status;
                if (this.status == 1) {
                    this.$refs.companyInfoChild.initData();
                } else if (this.status == 2) {
                    this.$refs.advancedSettingChild.getUserInfo();
                }
            },
        }
    }
</script>

<style scoped lang="less">
   .company{
     /deep/ .content-main .content{
       padding: 0px;
     }
     .no-permissions-wrap {
       padding-top: 80px;
       height: calc(100vh - 80px);
       text-align: center;
       background-color: #ffffff;
       overflow: hidden;
       .tips{
         margin: 20px auto 80px auto;
         color: #777777;
         font-size: 16px;
       }
     }
   }
</style>
