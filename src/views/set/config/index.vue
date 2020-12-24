<template>
    <div class="company">
        <content-top>
            <div class="f-fl">
                <top-title :activeIndex="activeIndex" :statusData="statusData" @changeStatus="changeStatus"></top-title>
            </div>
            <div class="search-box f-fr">
                <search-dialog v-if="status==4" placeholder="收款账号/收款账号名称" :showEmployee="false" :showCityTown="false" :searchList="searchList4" @search="assetsFormData4"></search-dialog>
                <search-dialog v-if="status==5" placeholder="说明" :showEmployee="false" deptTitle="作用范围" deptPlaceholder="请选择审批设置的作用范围" :showCityTown="false" :searchList="searchList5" @search="assetsFormData5"></search-dialog>
              <search-dialog v-if="status==6" placeholder="小区名/详情地址" :showEmployee="false" :show-dept-emp="false" :showCityTown="true" :searchList="searchList6" @search="assetsFormData6"></search-dialog>
            </div>
        </content-top>
        <content-main>
            <div v-if="status==1">
                <company-dictionary></company-dictionary>
            </div>
            <div v-if="status==2">
                <decision></decision>
            </div>
            <div v-if="status==3">
                <product></product>
            </div>
            <div v-if="status==4">
                <transfer ref="transferChild"></transfer>
            </div>
            <div v-if="status==5">
                <workflow ref="workflowChild"></workflow>
            </div>
            <div v-if="status==6">
                <community ref="communityChild"></community>
            </div>
        </content-main>
    </div>
</template>

<script>
    import SearchDialog from '@/components/SearchDialog';
    import companyDictionary from './dictionary';
    import  Decision from './decision/index';
    import  Product from './product';
    import Transfer from './transfer/index';
    import  Workflow from './workflow';
    import Community from './community';
    import TopTitle from '@/components/TopStatus/title';

    export default {
        components: {
            companyDictionary,
            TopTitle,
            Decision,
            Product,
            Transfer,
            Workflow,
            Community,
            SearchDialog,
        },
        data() {
            return {
                status: 1,              //当前面板值
                statusData: [
                    {
                        title: '字典配置',
                        status: 1,
                        mark:['mk_set_config_ck'],
                    },
                    {
                        title: '运营配置',
                        status: 2,
                        mark:['mk_set_config_jcsz_ck'],
                    },
                    {
                        title: '产品配置',
                        status: 3,
                        mark:['mk_set_config_cppz_ck'],
                    },
                    {
                        title: '收款账号配置',
                        status: 4,
                        mark:['mk_set_config_skzhpz_ck'],
                    },
                    {
                        title: '审批配置',
                        status: 5,
                        mark:['mk_set_config_sppz_ck'],
                    },
                    {
                      title: '小区管理',
                      status: 6,
                      mark:['mk_set_config_xqgl_ck'],
                    },
                ],
                activeIndex:1,
                searchList4: [
                    {
                        key: 'fuzzyQueryType',
                        list: [
                            {
                                label: '综合检索',
                                value: 0,
                            },
                            {
                                label: '收款账号',
                                value: 1
                            },
                            {
                                label: '收款账号名称',
                                value: 2
                            },
                        ],
                    },
                    {
                        key: 'isEnable',
                        title: '状态',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '启用',
                                value: 1
                            },
                            {
                                label: '禁用',
                                value: 0
                            },
                        ],
                    },
                ],
                searchList5: [
                    {
                        key: 'fuzzyQueryType',
                        list: [
                            {
                                label: '综合检索',
                                value: 0,
                            },
                        ],
                    },
                    {
                        key: 'status',
                        title: '状态',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '启用',
                                value: 1
                            },
                            {
                                label: '禁用',
                                value: 0
                            },
                        ],
                    },
                    {
                        key: 'bizScene',
                        title: '发起审批类型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '租客签约(电子合同)',
                                value: 11
                            },
                            {
                                label: '租客签约(纸质合同)',
                                value: 12
                            },
                            {
                              label: '租客退租',
                              value: 13
                            },
                            {
                                label: '业主合同',
                                value: 21
                            },
                            {
                              label: '付款申请',
                              value: 32
                            },
                            {
                                label: '账务流水',
                                value: 31
                            },
                        ],
                    },
                ],
                searchList6:[
                  {
                    key: 'fuzzyQueryType',
                    list: [
                      {
                        label: '综合检索',
                        value: 0,
                      },
                      {
                        label: '小区名',
                        value: 1
                      },
                      {
                        label: '详细地址',
                        value: 2
                      },
                    ],
                  },
                  {
                    key: 'status',
                    title: '审核状态',
                    currentActiveIndex: 0,
                    list: [
                      {
                        label: '全部',
                        value: null
                      },
                      {
                        label: '待审核',
                        value: 1
                      },
                      {
                        label: '已驳回',
                        value: 2
                      },
                      {
                        label: '审核通过',
                        value: 9
                      },
                    ],
                  },
                ],
            }
        },
        created() {
            this.status = 6;
            JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                if (value.mark == "mk_set_config_jcsz_ck"||value.mark == "mk_set_config_ck"||value.mark == "mk_set_config_cppz_ck"||value.mark == "mk_set_config_skzhpz_ck"||value.mark == "mk_set_config_xqgl_ck") {
                    let current = value.mark =="mk_set_config_xqgl_ck"?6:value.mark =="mk_set_config_sppz_ck"?5:value.mark == "mk_set_config_skzhpz_ck"?4:value.mark =="mk_set_config_cppz_ck"?3:value.mark == "mk_set_config_jcsz_ck"?2:1;
                    this.status = this.status>current?current:this.status;
                    this.activeIndex= this.status - 1;
                }
            });
            //防止页面companyDictionaryChild不存在
            setTimeout(()=>{
                this.changeStatus();
            },10);
        },
        methods: {
            changeStatus(item) {
                if(item){
                    this.status = item.status;
                }
            },
            assetsFormData4(data){
                this.$refs.transferChild&&this.$refs.transferChild.assetsFormData(data);
            },
            assetsFormData5(data){
                this.$refs.workflowChild&&this.$refs.workflowChild.assetsFormData(data);
            },
            assetsFormData6(data){
              this.$refs.communityChild&&this.$refs.communityChild.assetsFormData(data);
            },
        }
    }
</script>

<style scoped lang="less">
   .company /deep/ .content-main .content{
       padding: 0px;
   }
</style>
