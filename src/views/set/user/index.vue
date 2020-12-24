<template>
    <div class="user-index">
        <content-top>
            <div class="status-box f-fl">
                <top-title :statusData="statusData" :activeIndex="status" @changeStatus="changeStatus"></top-title>
            </div>
        </content-top>
        <content-main>
            <div v-show="status==0">
                <dept-user ref="deptUserChild"></dept-user>
            </div>
            <div v-show="status==1">
                <role-res ref="roleResChild"></role-res>
            </div>
        </content-main>
    </div>
</template>

<script>
    import deptUser from './deptUser';
    import roleRes from './roleRes';
    import TopTitle from '@/components/TopStatus/title';

    export default {
        components: {
            deptUser,
            roleRes,
            TopTitle,
        },
        data() {
            return {
                status:1,              //当前面板值
                statusData: [
                    {
                        title: '部门/员工',
                        status: 0,
                        mark: ['mk_set_user_ck']
                    },
                    {
                        title: '角色/权限',
                        status: 1,
                        mark: ['mk_set_role_ck']
                    },
                ]
            }
        },
        created: function () {
            // console.log(this.$route.meta.permissions)
            this.status = 1;
            JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                if (value.mark == "mk_set_user_ck"){
                    this.status = 0;
                }
            })
        },
        methods:{
            changeStatus(item) {
                this.status = item.status;
                if( this.status == 0){
                    this.$refs.deptUserChild.refreshTableAndTree();
                }
                else if( this.status == 1){
                    this.$refs.roleResChild.currentActive = '1';
                    this.$refs.roleResChild.roleListAll();
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .user-index {
        height: calc(100vh - 50px);
    }
    .user-index /deep/ .content-main .content {
        padding: 0px;
    }
</style>
