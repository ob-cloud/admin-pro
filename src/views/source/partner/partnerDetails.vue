<script src="../../../api/bill.js"></script>
<template>
    <div class="partner-detail-box clearfix">
        <div class="left-detail f-fl">
            <label-item class="top f-clearfix" title="" :skeletonLoading="skeletonLoading">
                <div class="f-fl detail">
                    <div class="item clearfix">
                        <div class="f-fl" style="color:#111111;font-size: 21px">{{partnerData.partnerName}}</div>
                        <div class="littleTitle f-fl" :class="partnerData.isCooperation==1?'normalStatus':'validStatus'" style="margin-left: 10px;font-size: 14px;line-height: 0;" v-if="partnerData.isCooperation==1"><icon-font type="iconyumengtubiao_hezuo" />&nbsp;&nbsp;合作中</div>
                        <div class="littleTitle f-fl" :class="partnerData.isCooperation==1?'normalStatus':'validStatus'" style="margin-left: 10px;font-size: 14px;line-height: 0;" v-if="partnerData.isCooperation==0"><icon-font type="iconyumengtubiao_jinyong" />&nbsp;&nbsp;合作终止</div>
                    </div>
                    <div class="status cursor" @click="cooperationChange(partnerData.partnerId,partnerData.isCooperation==1?0:1,partnerData.partnerName)">
                        <icon-font v-if="partnerData.isCooperation==1" type="iconyumengtubiao_jinyong" />
                        <icon-font v-else type="iconyumengtubiao_hezuo" />
                        {{partnerData.isCooperation==1?'合作终止':partnerData.isCooperation==0?'再次合作':'-'}}
                    </div>
                </div>
            </label-item>
            <div class="tabs-content">
                <div class="basic-info">
                    <div class="input-info">
                        <label-item class="item u-bottom-border margin1" title="运营覆盖城市" :skeletonLoading="skeletonLoading">
                            <span>{{partnerData.partnerBizCity|blankVal}}</span>
                        </label-item>
                        <label-item class="item u-bottom-border margin1" title="运营模式" :skeletonLoading="skeletonLoading">
                            <span>{{partnerData.partnerBizMode|blankVal}}</span>
                        </label-item>
                    </div>
                </div>
                <div class="bottom">
                    <span>{{partnerData.creater}}创建于 {{$moment(partnerData.createTime).format('lll')}}</span>
                    <span>{{partnerData.updater}}更新于 {{$moment(partnerData.updateTime).format('lll')}}</span>
                </div>
            </div>
        </div>
        <div class="right-detail f-fr">
            <a-tabs size="small" defaultActiveKey="1" @change="handleCallback">
                <a-tab-pane key="1">
                    <span slot="tab">
                        已共享潜在租客记录
                    </span>
                    <div style="overflow: auto;padding-bottom: 44px;">
                        <div style="margin-top: 20px;"></div>
                        <a-empty v-show="sharedTenantList&&sharedTenantList.length === 0" style="margin-top:100px;"/>
                        <div class="content-follow"  v-for="(shared,index) in sharedTenantList" :key="index" :style="index==0?'margin-top:10px;':''">
                            <div class="content-follow-left">
                                <span class="radius-font radius-font-follow" v-if="shared.status==1">正常</span>
                                <span class="radius-font radius-font-close" v-if="shared.status!=1">关闭</span>
                                <div class="content-follow-left-line" v-if="index<sharedTenantList.length-1"></div>
                            </div>
                            <div class="content-follow-right">
                                <div class="follow-right-line-one">
                                    <div class="follow-right-line-two" style="color: #777777;font-size: 14px;">{{shared.sharedPerson}} 于 {{$moment(shared.sharedTime).format('YYYY.MM.DD HH:mm')}}共享</div>
                                </div>
                                <div class="name">潜在租客：{{shared.renterName}}  {{shared.renterPhone}}</div>
                                <div class="follow-info" v-if="shared.statusChangeTime">
                                    <div style="width: 100%" >{{$moment(shared.statusChangeTime).format('YYYY.MM.DD HH:mm')}} 置为「{{shared.status==1?'正常':shared.status==2?'我签':shared.status==3?'他签':shared.status==4?'无效':'-'}}」</div>
                                    <div style="width: 100%" v-if="shared.signedBeginTime">合同周期：{{$moment(shared.signedBeginTime).format('YYYY.MM.DD')}} - {{$moment(shared.signedEndTime).format('YYYY.MM.DD')}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contFoot" v-if="sharedTenantList.length>0">
                        <a-pagination size="small" :total="pagination_tenant.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination_tenant.pageSize" showSizeChanger @change="onSizeChange_tenant" @showSizeChange="onShowSizeChange_tenant" />
                    </div>
                </a-tab-pane>
                <a-tab-pane key="2">
                    <span slot="tab">
                        已共享潜在业主记录
                    </span>
                    <div style="overflow: auto;padding-bottom: 44px;">
                        <div style="margin-top: 20px;"></div>
                        <a-empty v-show="sharedOwnerList&&sharedOwnerList.length === 0" style="margin-top:100px;" />
                        <div class="content-follow"  v-for="(shared,index) in sharedOwnerList" :key="index" :style="index==0?'margin-top:10px;':''">
                            <div class="content-follow-left">
                                <span class="radius-font radius-font-follow" v-if="shared.status==1">正常</span>
                                <span class="radius-font radius-font-close" v-if="shared.status!=1">关闭</span>
                                <div class="content-follow-left-line" v-if="index<sharedOwnerList.length-1"></div>
                            </div>
                            <div class="content-follow-right">
                                <div class="follow-right-line-one">
                                    <div class="follow-right-line-two">{{shared.sharedPerson}} 于 {{$moment(shared.sharedTime).format('YYYY.MM.DD HH:mm')}}共享</div>
                                </div>
                                <div class="name">潜在业主：{{shared.ownerName}}  {{shared.ownerPhone}}</div>
                                <div class="follow-info" v-if="shared.statusChangeTime">
                                    <div style="width: 100%" >{{$moment(shared.statusChangeTime).format('YYYY.MM.DD HH:mm')}} 置为「{{shared.status==1?'正常':shared.status==2?'我签':shared.status==3?'他签':shared.status==4?'无效':'-'}}」</div>
                                    <div style="width: 100%" v-if="shared.signedBeginTime">合同周期：{{$moment(shared.signedBeginTime).format('YYYY.MM.DD')}} - {{$moment(shared.signedEndTime).format('YYYY.MM.DD')}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contFoot" v-if="sharedOwnerList.length>0">
                        <a-pagination size="small" :total="pagination_owner.total" :showTotal="total => `共 ${total} 条`" :pageSize="pagination_owner.pageSize" showSizeChanger @change="onSizeChange_owner" @showSizeChange="onShowSizeChange_owner" />
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
import  * as API from '@/api/source';
export default {
    name: "partnerDetails",
    props: {
        partnerData:{
            type: Object,
            required:true,
        }
    },
    components: {
    },
    data() {
        return {
            sharedTenantList:[],
            sharedOwnerList:[],
            sendData_tenant: {
                current: 1,                     // 当前页数
                size: 10,                       // 每页返回的记录数量
            },
            sendData_owner: {
                current: 1,                     // 当前页数
                size: 10,                       // 每页返回的记录数量
            },
            pagination_tenant: {
                total: 0,
                current: 0,
                pageSize: 10,//每页中显示10条数据
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
            },
            pagination_owner: {
                total: 0,
                current: 0,
                pageSize: 10,//每页中显示10条数据
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
            },
            skeletonLoading:false,
            activekey:1,
        }
    },
    created() {
        this.initData();
    },
    mounted() {
    },
    methods: {
        initData(){
            this.skeletonLoading = true;
            this.initSharedTenantList();
        },
        handleCallback(val) {
            this.activekey = val;
            if(this.activekey == 1){
                this.initSharedTenantList();
            }
            else{
                this.initSharedOwnerList();
            }
        },
        initSharedTenantList(){
            API.listSharedPartner(this.partnerData.partnerId,this.sendData_tenant.current,this.sendData_tenant.size).then(res=>{
                this.sharedTenantList = res.data.records;
                this.pagination_tenant.total = res.data.total;
                this.skeletonLoading = false;
            })
        },
        initSharedOwnerList(){
            let param =  {
                id:this.partnerData.partnerId,
                current : this.sendData_owner.current,
                size:this.sendData_owner.size,
            };
            API.ownerClueListSharedByPartnerId(param).then(res=>{
                this.sharedOwnerList = res.data.records;
                this.pagination_owner.total = res.data.total;
            })
        },
        cooperationChange(id,status,name){
            let title = '';
            let content='';
            let afterContent=''
            if(status == 1){
                title = '确定要再次和「'+name+'」的合作吗？';
                content = '再次合作，不清空原先已经合作过的数据';
                afterContent='再次合作';
            }
            else if(status == 0){
                title = '确定要终止和「'+name+'」的合作关系吗？';
                content = '终止后，您的资源将不可再共享给该公寓';
                afterContent='终止合作';
            }
            let _this = this;
            this.$modal.confirm({
                title: title,
                content: content,
                width:"433px",
                height:"192px",
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    API.cooperationChange(id,status).then(res=>{
                        if (res.code === '200') {
                            _this.$message.success(afterContent+'成功');
                            _this.$emit('refreshinfoFun', true);
                        } else {
                            _this.$message.success(afterContent+'失败');
                        }
                        _this.$emit('cancelPartnerDetails');
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        },
        onSizeChange_tenant(current) {
            this.sendData_tenant.current = current;
            this.initSharedTenantList();
        },
        onShowSizeChange_tenant(current, pageSize) {
            this.sendData_tenant.current = current;
            this.sendData_tenant.size = pageSize;
            this.pagination_tenant.pageSize = pageSize;
            this.initSharedTenantList();
        },
        onSizeChange_owner(current) {
            this.sendData_owner.current = current;
            this.initSharedTenantList();
        },
        onShowSizeChange_owner(current, pageSize) {
            this.sendData_owner.current = current;
            this.sendData_owner.size = pageSize;
            this.pagination_owner.pageSize = pageSize;
            this.initSharedTenantList();
        },
    },
    filters: {
        blankVal(val){
            if(!val){
                return '-';
            }else{
                return  val;
            }
        }
    }

}
</script>

<style scoped lang="less">
.partner-detail-box {
    width: 1000px;
    background: rgba(247,248,251,1);
    position:relative;
    & /deep/ .form-input-item{
        margin-top: 10px;
    }
    & /deep/ .input-item-box{
        margin-top: 2px;
    }
    .line{
        width: 100%;
        border: 0.5px solid #DDDDDD;
    }
    .left-detail {
        width: 640px;
        background: #FFFFFF;
        height: calc(100vh - 100px);
        .top {
            padding: 20px 20px 5px 20px;
            position:relative;
            .littleTitle{
                svg{
                    width: 16px;
                    height: 16px;
                }
            }
            .status{
                position: absolute;
                right: 20px;
                top:28px;
                height:28px;
                padding: 0 10px;
                line-height: 28px;
                text-align: center;
                border-radius:4px;
                font-size: 14px;
                border:0.5px solid #0A87F8;
                color: #0A87F8;
            }
            .normalStatus{
                color: #0A87F8;
                i{
                    vertical-align: -0.15em;
                }
            }
            .validStatus{
                color: #777777;
                i{
                    vertical-align: -0.15em;
                }
            }
            .detail {
                display: flex;
                width: calc(100% - 160px);
                flex-wrap: wrap;
                .item {
                    display: flex;
                    align-items: center;
                    margin: 10px 0;
                    width: 240px;
                    font-size: 12px; // padding-left: 40px;
                    input {
                        width: 180px;
                        padding-right: 10px;
                    }
                    & /deep/ .ant-select {
                        width: 180px;
                    }
                }
            }
        }
        .tabs-content {
            margin: 20px 20px 0 20px;
            border-top:0.5px solid #DDDDDD;
            .basic-info {
                height: calc(100vh - 250px);
                margin-top: 10px;
                .input-info {
                    display: flex;
                    flex-wrap: wrap;
                    .margin1{
                        margin-right: 40px;
                    }
                    margin2{
                        margin-right: 20px;
                    }
                    .item {
                        width: 160px;
                        margin-bottom: 20px;
                        & /deep/ .title {
                            margin-bottom: 4px;
                        }
                        & /deep/ .ant-select {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
    .right-detail{
        padding:0 15px;
        width: 352px;
        background: #FFFFFF;
        overflow: auto;
        position: relative;
        height: calc(100vh - 100px);
        .contFoot{
            position: absolute;
            bottom: 0px;
            right: 0px;
            padding-bottom: 20px;
        }
        .content-follow{
            display: flex;
            justify-content: flex-start;
            .content-follow-left{
                width: 32px;
                .content-follow-left-line{
                    margin: 0 0 0 16px;
                    height: calc(100% - 32px);
                    border-left: 0.5px dashed #AED4F5;
                }
            }
            .content-follow-right{
                margin-left: 10px;
                margin-bottom: 25px;
                width: 250px;
                .follow-right-line-one{
                    .name{
                        font-size: 14px;
                        color: #111111;
                        font-weight:400;
                    }
                    .date{
                        color: #999999;
                        font-size: 12px;
                    }
                }
                .follow-right-line-two{
                    font-size: 13px;
                    color: #999999;
                }
                .follow-info{
                    margin-top: 2px;
                    padding:4px 0 4px 6px;
                    width: 269px;
                    min-height: 18px;
                    line-height:18px;
                    background-color: rgba(247,248,251,1);
                    color: #777777;
                    font-size: 12px;
                }
                .name{
                    color: #111111;
                    font-size: 14px;
                }
            }
        }
    }
    .bottom {
        padding: 0 0;
        height: 50px;
        line-height: 50px;
        border-top: 1px dashed #DDDDDD;
        color: @secondaryFontColor;
        span:first-child {
            display: inline-block;
            margin-right: 20px;
            padding-right: 20px;
            height: 20px;
            line-height: 20px;
            border-right: 1px dashed #DDDDDD;
        }
    }

    .radius-font {
        display: inline-block;
        margin-right: 10px;
        width: 32px;
        height: 32px;
        line-height: 32px ;
        font-size: 12px;
        color: #FFA036;
        text-align: center;
        background-color: fade(#FFA036, 10%);
        border-radius: 16px;
    }
    .radius-font-person {
        color: #0A87F8;
        background-color: fade(#0A87F8, 10%);
    }
    .radius-font-follow {
        color: #0A87F8;
        background-color: fade(#0A87F8, 10%);
    }
    .radius-font-close {
        color: #777777;
        background-color: fade(#F6F7F8, 100%);
    }
    .tabs-options {
        font-size: 0;
        cursor: pointer;
        div {
            display: inline-block;
            font-size: 14px;
            color: #0a87f8;
            span {
                margin-right: 14px;
                padding: 0 14px 0 0;
                border-right: 1px dashed #ccc;
            }
        }
        div:last-child {
            span {
                margin-right: 0;
                border-right: none;
            }
        }
        &>span {
            display: inline-block;
            padding: 0 10px;
            height: 24px;
            line-height: 24px;
            font-size: 14px;
            border: 1px solid #DDDDDD;
            background-color: #F6F7F8;
            border-radius: 4px;
        }
        &>span:last-child {
            margin-left: 10px;
            border: 1px solid #0a87f8;
            background-color: #0a87f8;
            color: #ffffff;
        }
    }
    /deep/ .ant-tabs-bar{
        margin: 0px;
        width: 302px;
    }
    &/deep/ .ant-tabs-nav .ant-tabs-tab{
        margin-right: 25px;
        padding: 8px 0;
    }
    & /deep/ .ant-tabs-top-content {
        font-size: 12px;
        color: @mainFontColor;
    }
    .active {
        border-color: @themeColor!important;
        color: @themeColor!important;
    }
}
</style>
