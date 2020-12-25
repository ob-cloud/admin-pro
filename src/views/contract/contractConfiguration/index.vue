<template>
    <!-- 合同配置 -->
    <div class="contract-configuration">
        <div v-if="status==1" class="add-btn-wrap" @click="addTemplate">
            <icon-font type="iconyumengtubiao_tianjia" /> 添加模板
        </div>
        <content-top>
            <div class="f-fl">
                <top-title :needMarkFlag="false" :statusData="statusData" @changeStatus="changeStatus"></top-title>
            </div>
            <div class="search-box f-fr" v-if="status==1">
                <search-dialog placeholder="模板名称" :showDeptEmp="false" :showEmployee="false" :showCityTown="false" :searchList="searchList" @search="assetsFormData"></search-dialog>
            </div>
        </content-top>
        <content-main class="contentMain">
            <div v-show="status==1">
                <contract-template ref="contractemplateChild"></contract-template>
            </div>
            <div v-show="status==2">
                <contract-authentication ref="contractAuthenticationChild"></contract-authentication>
            </div>
        </content-main>
    </div>
</template>

<script>
    import contractTemplate from './contractTemplate';
    import contractAuthentication from './contractAuthentication';
    import TopTitle from '@/components/TopStatus/title';
    import SearchDialog from '@/components/SearchDialog';
    const searchList = [
        {
            key:'fuzzyQueryType',
            list:[
                {
                    label: '综合检索',
                    value: 0,
                },
            ],
        },
        {
            key:'status',
            title:'模板状态',
            currentActiveIndex:0,
            list:[
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '使用中',
                    value: 1
                },
                {
                    label: '已禁用',
                    value: 2
                },
            ],
        },
        {
            key:'certPlatform',
            title:'认证状态',
            currentActiveIndex:0,
            list:[
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '未认证',
                    value: 0
                },
                {
                    label: '已认证',
                    value: 1
                },
            ],
        },
    ];
export default {
    name: "",
    components: {
        contractTemplate,
        contractAuthentication,
        TopTitle,
        SearchDialog,
    },
    data() {
        return {
            secondClick:false,   //合同认证是否是第二次点击，用于阻止提前调用，方法还未加载
            status:1,              //当前面板值
            statusData: [
                {
                    title: '电子合同模板',
                    status: 1,
                },
                {
                    title: '合同认证',
                    status: 2,
                },
            ],
            searchList:searchList,      //搜索数据
        }
    },
    created(){
    },
    methods: {
        addTemplate(){
            this.$refs.contractemplateChild.openAddTemple();
        },
        assetsFormData(data){
            if(data.fuzzyKeyword == ""){
                data.fuzzyKeyword = null;
            }
            this.$refs.contractemplateChild.assetsFormData(data);
        },
        changeStatus(item) {
            this.status = item.status;
            if( this.status == 1){
                this.$refs.contractemplateChild.econtTemplateList();
            }
            else if( this.status == 2){
                this.$refs.contractAuthenticationChild.econtListCertBody();
            }
        },
    },
}
</script>

<style scoped lang="less">
    .contract-configuration {
        .content-top{
          min-width: 1300px; // overflow: hidden;
        }
        height: calc(100vh - 100px);
        /deep/ .content {
            padding: 0 0 20px 0;
        }
        .contentMain{
            height:calc(100vh - 100px);
        }
        .contentTop /deep/ .content-main .content {
            padding: 0 0 20px 0;
        }
        .search-box {
            margin-right: 2px;
            &/deep/ .ant-input {
                border-radius: 50px;
            }
        }
    }
</style>
