<template>
    <!-- 业主池：公盘、私盘、房屋委托 -->
    <div class="sourceBox">
        <div class="loadingCircle" id="loadingCircle" v-if="spinLoading"></div>
        <div class="add-btn-wrap" @click="addSource(1)" v-show="clueType == 1" v-mark="['mk_source_owner_tjzy']">
            <icon-font type="iconyumengtubiao_tianjia" />添加业主线索
        </div>
        <div class="add-btn-wrap" @click="addSource(1)" v-show="clueType == 2" v-mark="['mk_source_owner_gp_tjzy']">
            <icon-font type="iconyumengtubiao_tianjia" />添加业主线索
        </div>
        <content-top>
            <div class="status-box f-fl">
                <top-title :statusData="statusData" :activeIndex="activeIndex" @changeStatus="changeStatus"></top-title>
            </div>
            <div class="search-box f-fr" v-show="clueType == 1||clueType == 2">
                <search-dialog ref="searchDialog_owner" placeholder="业主姓名/业主电话/房源地址/标签" :showDeptEmp="false" :showEmployee="false" :showCityTown="true" :showArea="false" :showTown="false" :searchList="searchList_owner" @search="assetsFormData_owner"></search-dialog>
            </div>
            <div class="search-box f-fr" v-show="clueType == 3">
                <search-dialog ref="searchDialog_delegate" placeholder="业主姓名/业主电话/委托地址" :showDeptEmp="false" :showEmployee="false" :showCityTown="true" :showArea="false" :showTown="false" :searchList="searchList_delegate" @search="assetsFormData_delegate"></search-dialog>
            </div>
        </content-top>
        <content-main>
            <skeleton-owner v-show="(clueType == 1||clueType == 2)&&spinLoading"></skeleton-owner>
            <div class="table" v-show="(clueType == 1||clueType == 2)&&!spinLoading">
                <a-table rowKey="id" :bordered="true" :customRow="openDetail_owner" :pagination="false" :columns="tableColumns_owner" :dataSource="tableData_owner">
                    <div slot="status" slot-scope="status">
                        <div v-if="status==1" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg1 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>正常</span>
                            </div>
                        </div>
                        <div v-if="status==2" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>关闭 · 我签</span>
                            </div>
                        </div>
                        <div v-else-if="status==3" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2  IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>关闭 · 他签</span>
                            </div>
                        </div>
                        <div v-else-if="status==4" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2  IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>关闭 · 无效</span>
                            </div>
                        </div>
                    </div>
                    <div slot="name" slot-scope="text,record">
                      <a-popover>
                        <template slot="content">
                          <p style="padding: 8px 18px;" v-if="record.gender==1">
                            <icon-font type="iconyumengtubiao_nan" style="color: #0A87F8"/> {{text}}/{{record.phone}}
                          </p>
                          <p style="padding: 8px 18px;" v-if="record.gender==2">
                            <icon-font type="iconyumengtubiao_nv" style="color: #FB4246"/> {{text}}/{{record.phone}}
                          </p>
                        </template>
                        <div v-if="record.gender==1" style="max-width: 220px;" class="overHidde"><icon-font type="iconyumengtubiao_nan" style="color: #0A87F8"/> {{text}}/{{record.phone}}</div>
                        <div v-if="record.gender==2" style="max-width: 220px;" class="overHidde"><icon-font type="iconyumengtubiao_nv" style="color: #FB4246"/> {{text}}/{{record.phone}}</div>
                      </a-popover>
                    </div>
                    <div slot="fullAddress" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    {{record.cityName?record.cityName:''}}{{text}}{{!record.cityName&&!text?'-':''}}
                                </p>
                            </template>
                            <div class="f-fl" style="max-width: 250px;position: relative;" type="primary">
                                <p class="overHidde" style="line-height:22px;">
                                    <span v-if="record.urgencyLevel==1" class="urgencyLevel1 paddingStyle">紧急</span>
                                    <span v-if="record.urgencyLevel==2" class="urgencyLevel2 paddingStyle">一般</span>
                                    <span v-if="record.urgencyLevel==3" class="urgencyLevel3 paddingStyle">暂缓</span>
                                    <span v-if="record.urgencyLevel==4" class="urgencyLevel4 paddingStyle">更久</span>
                                    <span style="margin-left: 5px;color: #111111;font-size: 14px;">{{record.cityName?record.cityName:''}}{{text}}{{!record.cityName&&!text?'-':''}}</span>
                                </p>
                            </div>
                       </a-popover>
                        <a-popover>
                            <template slot="content">
                                <div class="otherHouse cursor" v-if="record.clueHouseType == 1" :style="record.clueHouseType == 1?'padding:17px 20px 17px 20px':''">
                                    <div v-for="(item,index) in record.houseList" :style="index==record.houseList.length-1?'':'margin-bottom:26px'">
                                    <div class="clearfix">
                                        <div class="clearfix f-fl">
                                            <div class="f-fl"><span class="otherHouseIndex">{{index+1}}</span></div>
                                            <div class="f-fl cityName">{{item.cityName}}</div>
                                            <div class="f-fl" style="max-width: 150px"><p class="cityName overHidde" >{{item.fullAddress}}</p></div>
                                        </div>
                                    </div>
                                    <div class="otherHouseCon">
                                        <div class="houseConOne inlineBlock" style="margin-right:20px">
                                            <div class="houseConTit">装修状况</div> 
                                            <div class="houseCot">{{item.decorationTypeName|blankVal}}</div> 
                                        </div> 
                                        <div class="houseConOne inlineBlock" style="margin-right:20px">
                                            <div class="houseConTit">户型</div> 
                                            <div class="houseCot">{{item.room?item.room+'室':''}}{{item.livingRoom?item.livingRoom+'厅':''}}{{!item.room&&!item.livingRoom?'-':''}}</div> 
                                        </div> 
                                        <div class="houseConOne inlineBlock" style="margin-right:20px">
                                            <div class="houseConTit">面积</div> 
                                            <div class="houseCot">{{item.area?item.area+'㎡':'-'}}</div> 
                                        </div> 
                                        <div class="houseConOne inlineBlock">
                                            <div class="houseConTit">期望租金</div> 
                                            <div class="houseCot">{{item.price?item.price/100+'元':'-'}}</div> 
                                        </div> 
                                    </div>    

                                </div>
                                </div>
                                <div class="otherHouse cursor" v-if="record.clueHouseType == 2" >
                                    <div v-for="(item,index) in record.houseList" :style="index==record.houseList.length-1?'':'margin-bottom:26px'">
                                          <div class="otherHouseCon" style="margin:0 0 12px 0;">
                                            <div class="" style="margin-right:3px;line-height:16px;">
                                                <span class="otherHouseIndex">{{index+1}}</span>
                                            </div> 
                                            <div class="houseConOne inlineBlock">
                                                <div class="houseConTit">项目地址</div> 
                                                <div class="houseCot overHidde"  style="width: 150px"> {{item.cityName}}-{{item.fullAddress}} </div>
                                            </div>
                                            <div class="houseConOne inlineBlock" style="margin-right:20px">
                                                <div class="houseConTit">房型数量</div> 
                                                <div class="houseCot">{{item.roomTypeQuantity}}个</div> 
                                            </div> 
                                            <div class="houseConOne inlineBlock">
                                                <div class="houseConTit">房间数量</div> 
                                                <div class="houseCot">{{item.roomQuantity}}间</div> 
                                            </div> 
                                        </div>    
                                        
                                    </div>
                                </div>
                            </template>
                            <div class="f-fr" v-if="record.clueHouseType == 1&&record.houseList&&record.houseList.length>0" style="font-size: 13px;line-height:22px;">共<span style="color:#0A87F8">{{record.houseList.length}}</span>套房源</div>
                            <div class="f-fr" v-if="record.clueHouseType == 2&&record.houseList&&record.houseList.length>0" style="font-size: 13px;line-height:22px;">共<span style="color:#0A87F8">{{record.houseList.length}}</span>个项目</div>
                        </a-popover>
                    </div>
                    <div slot="decorationTypeName" slot-scope="text,record">
                        <span v-if="text" class="decorationType" :class="text=='毛坯'?'decorationType1':text=='精装'?'decorationType2':text=='豪华装'?'decorationType3':'decorationType4'">{{text}}</span>{{record.room?record.room+'室':''}}{{record.livingRoom?record.livingRoom+'厅':''}}{{!record.room&&!record.livingRoom?'-':''}}/{{record.area?record.area+'㎡':'-'}}
                    </div>
                    <div slot="price" slot-scope="text">
                        {{text?text/100+'元':'-'}}
                    </div>
                    <div slot="leasePeriod" slot-scope="leasePeriod" class="cursor">
                        {{leasePeriod==1?'一个月':leasePeriod==2?'三个月':leasePeriod==3?'半年':leasePeriod==4?'一年':leasePeriod==5 ?'一年以上':'-'}}
                    </div>
                    <div slot="latestFollowUp" slot-scope="text,record">
                        <a-popover v-if="record.latestFollowUp">
                            <template slot="content">
                                <p style="padding: 8px 16px;">
                                    <span class="time">{{($moment(record.latestFollowUp.time).fromNow())|timeVal}}</span>
                                    <span style="margin-left: 5px">{{record.latestFollowUp.person}}{{record.latestFollowUp.followType}}：{{record.latestFollowUp.content}}</span>
                                </p>
                            </template>
                            <div class="f-fl" style="max-width:380px;position: relative;" type="primary">
                                <p class="overHidde" style="line-height:22px;">
                                    <span class="time">{{($moment(record.latestFollowUp.time).fromNow())|timeVal}}</span>
                                    <span style="margin-left: 5px">{{record.latestFollowUp.person}}{{record.latestFollowUp.followType}}：{{record.latestFollowUp.content}}</span>
                                </p>
                            </div>
                        </a-popover>
                        <span v-else>
                            -
                        </span>
                    </div>
                    <div slot="action" slot-scope="text, record">
                        <a-popover :title="null" trigger="hover" v-if="checkOpts_owner(record) == true">
                            <template slot="content">
                                <div v-if="record.status==1" @click.stop="openDetailFocusFollow(record)" class="action cursor"  v-mark="clueType == 1 ? ['mk_source_owner_gj'] : ['mk_source_owner_gp_gj']">跟进</div>
                                <div v-if="record.status==1&&clueType==2" @click.stop="changePrivate(record)" class="action cursor" v-mark="['mk_source_owner_gp_zrsp']">转入私盘</div>
                                <div v-if="record.status==1" @click.stop="openAssignUser(record)" class="action cursor" v-mark="clueType == 1 ? ['mk_source_owner_zp'] : ['mk_source_owner_gp_zp']">指派</div>
                                <div v-if="record.status==1" @click.stop="openCloseSource(record)" class="action cursor" v-mark="clueType == 1 ? ['mk_source_owner_gb'] : ['mk_source_owner_gp_gb']">关闭</div>
                                <!--<div v-if="record.status==1" @click.stop="addSource(2,record)" class="action cursor" v-mark="clueType == 1 ? ['mk_source_owner_bj'] : ['mk_source_owner_gp_bj']">编辑</div> -->
                                <div v-if="record.status==1&&clueType==1" class="action cursor" @click.stop="changPublic(record)" v-mark="['mk_source_owner_zrgp']">转入公盘</div>
                                <div v-if="record.status==1" @click.stop="openShareSource(record)" class="action cursor" v-mark="clueType == 1 ? ['mk_source_owner_gxzy'] : ['mk_source_owner_gp_gxzy']">共享</div>
                                <div v-if="record.status==2||record.status==3||record.status==4" @click.stop="addSource(3,record)" class="action cursor" v-mark="clueType == 1 ? ['mk_source_owner_cxjh'] : ['mk_source_owner_gp_cxjh']">重新激活</div>
                                <div v-if="record.status==4" @click.stop="deleteChild(record)" class="action cursor" v-mark="clueType == 1 ? ['mk_source_owner_sc'] : ['mk_source_owner_gp_sc']">删除</div>
                            </template>
                            <div style="width: 100%;height: 100%">
                                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                            </div>
                        </a-popover>
                    </div>
                </a-table>
                <div class="contFoot" v-show="tableData_owner.length>0">
                    <a-pagination size="small" :total="pagination_owner.total" :current="pagination_owner.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination_owner.pageSize" showSizeChanger @change="onSizeChange_owner" @showSizeChange="onShowSizeChange_owner" />
                </div>
            </div>
            <skeleton-delegate v-show="clueType == 3&&spinLoading"></skeleton-delegate>
            <div class="table" v-show="clueType == 3&&!spinLoading">
                <a-table rowKey="id" :bordered="true" :customRow="openDetail_delegate" :pagination="false" :columns="tableColumns_delegate" :dataSource="tableData_delegate">
                    <div slot="status" slot-scope="status">
                        <div v-if="status==1" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg0 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>待处理</span>
                            </div>
                        </div>
                        <div v-else-if="status==2" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg1 IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已处理</span>
                            </div>
                        </div>
                        <div v-else-if="status==3" class="fontProhibit fontProhibitColor">
                            <div class="prohibitBg2  IconRadius prohibitBg f-fl"></div>
                            <div>
                                <span>已取消</span>
                            </div>
                        </div>
                    </div>
                    <div slot="fullAddress" slot-scope="text,record">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                   {{record.cityName?record.cityName:''}} {{record.fullAddress}}
                                </p>
                            </template>
                            <p class="overHidde" style="max-width: 300px" type="primary">
                              <span v-if="record.type==1" class="time" style="margin-right: 5px;">整租</span><span v-if="record.type==2" class="time" style="color: #03C683;background: #F2FFFB;margin-right: 5px;">独栋</span>{{record.cityName?record.cityName:''}} {{record.fullAddress}}
                            </p>
                        </a-popover>
                    </div>
                    <div slot="kitchen" slot-scope="text,record">
                        {{record.room?record.room+'室':''}}{{record.livingRoom?record.livingRoom+'厅':''}}{{record.kitchen?record.kitchen+'厨':'-'}}{{record.toilet?record.toilet+'卫':''}}{{!record.room&&!record.livingRoom&&!record.kitchen&&!record.toilet?'-':''}}
                    </div>
                    <div slot="price" slot-scope="text">
                        {{text?text/100 + '元':'-'}}
                    </div>
                    <div slot="createTime" slot-scope="text">
                        {{$moment(text).format('YYYY.MM.DD HH:mm')}}
                    </div>
                    <div slot="latestRecords" slot-scope="text">
                        <a-popover>
                            <template slot="content">
                                <p style="padding: 8px 18px;">
                                    {{text?text:'-'}}
                                </p>
                            </template>
                            <p class="overHidde" style="max-width:250px;" type="primary">
                                {{text?text:'-'}}
                            </p>
                        </a-popover>
                    </div>
                    <div slot="action" slot-scope="text, record" v-if="record.status==1||record.status==2">
                        <a-popover :title="null" trigger="hover" v-if="checkOpts_delegate(record) == true">
                            <template slot="content">
                                <div v-if="record.status==1||record.status==2" @click.stop="openAssignUser(record)" class="action cursor"  v-mark="['mk_source_owner_fwwt_zp']">指派</div>
                                <div v-if="record.status==1" @click.stop="changePrivate(record)" class="action cursor" v-mark="['mk_source_owner_fwwt_zrsp']">转入私盘</div>
                                <div v-if="record.status==1" @click.stop="changPublic(record)" class="action cursor" v-mark="['mk_source_owner_fwwt_zrgp']">转入公盘</div>
                                <div v-if="record.status==1" @click.stop="openDelegateCancel(record)" class="action cursor" v-mark="['mk_source_owner_fwwt_qx']">取消</div>
                            </template>
                            <div style="width: 100%;height: 100%">
                                <icon-font type="iconyumengtubiao_gengduo-" class="moreColor"></icon-font>
                            </div>
                        </a-popover>
                    </div>
                </a-table>
                <div class="contFoot" v-show="tableData_delegate.length>0">
                    <a-pagination size="small" :total="pagination_delegate.total" :current="pagination_delegate.current" :showTotal="total => `共 ${total} 条`" :pageSize="pagination_delegate.pageSize" showSizeChanger @change="onSizeChange_delegate" @showSizeChange="onShowSizeChange_delegate" />
                </div>
            </div>
        </content-main>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="shareSourceDialog" class="ownModalBorder titDialog" title="共享潜在线索池">
            <share-source :sourceId="sourceId" @cancelShareSource="cancelShareSource" @successShareSource="successShareSource"></share-source>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="closeSourceDialog" class="ownModalBorder titDialog" title="关闭" @cancel="cancelCloseSource">
            <close-source :sourceId="sourceId" @cancelCloseSource="cancelCloseSource" @successCloseSource="successCloseSource"></close-source>
        </a-modal>
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="assignUserDialog" class="ownModalBorder titDialog" title="指派员工" @cancel="cancelAssignUser">
            <assign-user :sourceId="sourceId" :clueType="clueType" @cancelAssignUser="cancelAssignUser" @successAssignUser="successAssignUser"></assign-user>
        </a-modal>
        <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="1000px" v-model="sourceDetailsDialog" class="ownModalBorder titDialog" title="资源详情" @cancel="isRefreshFun">
            <source-details @refreshinfoFun="refreshinfoFun" @changeSourceId="changeSourceId" ref="sourceDetails" :sourceId="sourceId" :clueHouseType="clueHouseType" @deleteRefrsh="isRefreshFun"></source-details>
        </a-modal>
        <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="1004px" v-model="addSourceDialog" class="ownModalBorder titDialog" :title="addSourceTitle" @cancel="cancelSave">
            <add-source :defalutClueType="clueType" :fromType="fromType" :sourceId="sourceId"  @cancelSave="cancelSave" @successSave="successSave"></add-source>
        </a-modal>
        <a-modal destroyOnClose centered  :footer="null" :maskClosable="false" width="800px" v-model="delegateDetailsDialog" class="ownModalBorder titDialog" title="委托详情" @cancel="isRefreshFun">
            <delegate-details :delegateId="delegateId" @refreshinfoFun="refreshinfoFun"></delegate-details>
        </a-modal>
        <!-- 取消委托 -->
        <a-modal destroyOnClose centered :footer="null" :maskClosable="false" width="520px" v-model="cancelDelegateDialog" class="ownModalBorder titDialog" title="取消委托" @cancel="cancelCancelDelegate">
            <cancel-delegate :infoData="infoData" @cancelCanceldelegate="cancelCancelDelegate" @successCancelDelegate="successCancelDelegate"></cancel-delegate>
        </a-modal>
    </div>
</template>

<script>
    import Vue from 'vue';
    import SearchDialog from '@/components/SearchDialog';
    import TopTitle from '@/components/TopStatus/title';
    import ShareSource from './shareSource';
    import CloseSource from './closeSource';
    import AssignUser from './assignUser';
    import SourceDetails from './sourceDetails';
    import AddSource from './addSource';
    import DelegateDetails from './delegateDetails';
    import CancelDelegate  from './cancelDelegate';
    import SkeletonOwner from '../../skeleton/source/owner';
    import SkeletonDelegate from '../../skeleton/source/delegate';
    import  * as API from '@/api/source';
    export default {
        name: "sourceTenant",
        components: {
            TopTitle,
            SearchDialog,
            ShareSource,
            CloseSource,
            AssignUser,
            SourceDetails,
            AddSource,
            DelegateDetails,
            CancelDelegate,
            SkeletonOwner,
            SkeletonDelegate,
        },
        data() {
            let currentTime = Vue.prototype.$moment().startOf('day').valueOf();
            let beforeOneDayTime = Vue.prototype.$moment().startOf('day').add(-1, 'days').valueOf();
            let beforeTwoDayTime = Vue.prototype.$moment().startOf('day').add(-2, 'days').valueOf();
            return {
                searchList_owner: [
                    {
                        key: 'fuzzyQueryType',
                        list: [
                            {
                                label: '综合检索',
                                value: 0,
                            },
                            {
                                label: '业主姓名',
                                value: 1
                            },
                            {
                                label: '业主电话',
                                value: 2
                            },
                            {
                                label: '房源地址',
                                value: 3
                            },
                            {
                                label: '标签',
                                value: 4
                            },
                        ],
                    },
                    {
                        key: 'status',
                        title: '线索状态',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '正常',
                                value: 1
                            },
                            {
                                label: '关闭-我签',
                                value: 2
                            },
                            {
                                label: '关闭-他签',
                                value: 3
                            },
                            {
                                label: '关闭-无效',
                                value: 4
                            }
                        ],
                    },
                    {
                        key: 'urgencyLevel',
                        title: '紧急程度',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '紧急',
                                value: 1
                            },
                            {
                                label: '一般',
                                value: 2
                            },
                            {
                                label: '暂缓',
                                value: 3
                            },
                            {
                                label: '更久',
                                value: 4
                            }
                        ],
                    },
                    {
                        key: 'room',
                        title: '户型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ''
                            },
                            {
                                label: '1居',
                                value: 1
                            },
                            {
                                label: '2居',
                                value: 2
                            },
                            {
                                label: '3居',
                                value: 3
                            },
                            {
                                label: '4居',
                                value: 4
                            },
                            {
                                label: '5居+',
                                value: 9
                            },
                        ],
                    },
                    {
                        key: ['areaBegin', 'areaEnd'],
                        title: '面积',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '≤30㎡',
                                value: [0, 30]
                            },
                            {
                                label: '30-50㎡',
                                value: [30, 50]
                            },
                            {
                                label: '50-70㎡',
                                value: [50, 70]
                            },
                            {
                                label: '70-90㎡',
                                value: [70, 90]
                            },
                            {
                                label: '90-110㎡',
                                value: [90, 110]
                            },
                            {
                                label: '≥110㎡',
                                value: [110, '']
                            }
                        ],
                    },
                    {
                        key: 'sourceChannelId',
                        title: '客户来源',
                        currentActiveIndex: 0,
                        list: [],
                    },
                ],
                searchList_delegate: [
                    {
                        key: 'fuzzyQueryType',
                        list: [
                            {
                                label: '综合检索',
                                value: 0,
                            },
                            {
                                label: '业主姓名',
                                value: 1
                            },
                            {
                                label: '业主电话',
                                value: 2
                            },
                            {
                                label: '委托地址',
                                value: 3
                            },
                        ],
                    },
                    {
                      key: 'type',
                      title: '委托类型',
                      currentActiveIndex: 0,
                      list: [
                        {
                          label: '全部',
                          value: null
                        },
                        {
                          label: '整租',
                          value: 1
                        },
                        {
                          label: '独栋',
                          value: 2
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
                                label: '待处理',
                                value: 1
                            },
                            {
                                label: '已处理',
                                value: 2
                            },
                            {
                                label: '已取消',
                                value: 3
                            },
                        ],
                    },
                    {
                        key: 'sourceType',
                        title: '来源',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '全部',
                                value: null
                            },
                            {
                                label: '官网',
                                value: 1
                            },
                            {
                                label: '微信小程序',
                                value: 2
                            },
                            {
                                label: '微信公众号',
                                value: 3
                            },
                            {
                                label: '租客APP',
                                value: 4
                            },
                            {
                                label: '其他',
                                value: 5
                            },
                        ],
                    },
                    {
                        key: 'room',
                        title: '户型',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ''
                            },
                            {
                                label: '1居',
                                value: 1
                            },
                            {
                                label: '2居',
                                value: 2
                            },
                            {
                                label: '3居',
                                value: 3
                            },
                            {
                                label: '4居',
                                value: 4
                            },
                            {
                                label: '5居+',
                                value: 5
                            },
                        ],
                    },
                    {
                        key: 'orientation',
                        title: '朝向',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ''
                            },
                            {
                                label: '东',
                                value: 1
                            },
                            {
                                label: '南',
                                value: 2
                            },
                            {
                                label: '西',
                                value: 3
                            },
                            {
                                label: '北',
                                value: 4
                            },
                            {
                                label: '南北',
                                value: 5
                            },
                        ],
                    },
                    {
                        key: ['areaBegin', 'areaEnd'],
                        title: '面积',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '≤30㎡',
                                value: [0, 30]
                            },
                            {
                                label: '30-50㎡',
                                value: [40, 50]
                            },
                            {
                                label: '50-70㎡',
                                value: [50, 70]
                            },
                            {
                                label: '70-90㎡',
                                value: [70, 90]
                            },
                            {
                                label: '90-110㎡',
                                value: [90, 110]
                            },
                            {
                                label: '≥110㎡',
                                value: [110, '']
                            }
                        ],
                    },
                    {
                        key: ['priceBegin', 'priceEnd'],
                        title: '期望租金',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '≤2000元',
                                value: [0, 200000]
                            },
                            {
                                label: '2000-3000元',
                                value: [200000, 300000]
                            },
                            {
                                label: '3000-4000元',
                                value: [300000, 400000]
                            },
                            {
                                label: '4000-6000元',
                                value: [400000, 600000]
                            },
                            {
                                label: '6000-8000元',
                                value: [600000, 800000]
                            },
                            {
                                label: '≥8000元',
                                value: [800000, '']
                            }
                        ],
                    },
                    {
                        key: ['timeBegin', 'timeEnd'],
                        title: '提交时间',
                        currentActiveIndex: 0,
                        list: [
                            {
                                label: '不限',
                                value: ['', '']
                            },
                            {
                                label: '今天',
                                value: [currentTime, currentTime]
                            },
                            {
                                label: '昨天',
                                value: [beforeOneDayTime, beforeOneDayTime]
                            },
                            {
                                label: '前天',
                                value: [beforeTwoDayTime, beforeTwoDayTime]
                            },
                            {
                                label: '自定义',
                                value: ['', '']
                            }
                        ],
                    },
                ],
                placement: 'right',  //抽屉搜索框位置
                tableColumns_owner: [
                    {
                        title: '序号',
                        dataIndex: 'num',
                        key: 'num',
                        align: 'center',
                        width: '50px',
                        customCell:() =>{
                            return {
                                on:{
                                    click:()=>{
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        align: 'left',
                        scopedSlots: { customRender: 'status' },
                    },
                    {
                        title: '业主信息',
                        dataIndex: 'name',
                        key: 'name',
                        scopedSlots: { customRender: 'name' },
                        align: 'left',
                    },
                    {
                        title: '委托信息',
                        dataIndex: 'fullAddress',
                        key: 'fullAddress',
                        scopedSlots: { customRender: 'fullAddress' },
                        align: 'left',
                    },
                    {
                        title: '最新跟进记录',
                        key: 'latestFollowUp',
                        dataIndex: 'latestFollowUp',
                        scopedSlots: { customRender: 'latestFollowUp' },
                        align: 'left',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: { customRender: 'action' },
                        align: 'center',
                        width: '80px',
                        customCell:() =>{
                            return {
                                on:{
                                    click:()=>{
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    },
                ],
                tableData_owner: [],
                tableColumns_delegate:[
                    {
                        title: '序号',
                        dataIndex: 'num',
                        key: 'num',
                        align: 'center',
                        width: '50px',
                        customCell:() =>{
                            return {
                                on:{
                                    click:()=>{
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        align: 'left',
                        scopedSlots: { customRender: 'status' },
                        width: '70px',
                    },
                    {
                        title: '业主姓名',
                        dataIndex: 'name',
                        key: 'name',
                        scopedSlots: { customRender: 'name' },
                        align: 'left',
                    },
                    {
                        title: '业主电话',
                        dataIndex: 'phone',
                        key: 'phone',
                        align: 'left',
                    },
                    {
                        title: '委托房源地址',
                        dataIndex: 'fullAddress',
                        key: 'fullAddress',
                        scopedSlots: { customRender: 'fullAddress' },
                        align: 'left',
                    },
                    {
                        title: '房屋户型',
                        key: 'kitchen',
                        dataIndex: 'kitchen',
                        scopedSlots: { customRender: 'kitchen' },
                        align: 'left',
                    },
                    {
                        title: '租金',
                        key: 'price',
                        dataIndex: 'price',
                        scopedSlots: { customRender: 'price' },
                        align: 'left',
                    },
                    {
                        title: '来源',
                        key: 'sourceName',
                        dataIndex: 'sourceName',
                        align: 'left',
                    },
                    {
                        title: '提交时间',
                        key: 'createTime',
                        dataIndex: 'createTime',
                        scopedSlots: { customRender: 'createTime' },
                        align: 'left',
                    },
                    {
                        title: '处理结果',
                        key: 'latestRecords',
                        dataIndex: 'latestRecords',
                        scopedSlots: { customRender: 'latestRecords' },
                        align: 'left',
                        width: '14%',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: { customRender: 'action' },
                        align: 'center',
                        width: '80px',
                        customCell:() =>{
                            return {
                                on:{
                                    click:()=>{
                                        event.stopPropagation();
                                    }
                                }
                            }
                        },
                    },
                ],
                tableData_delegate: [],
                pagination_owner: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                pagination_delegate: {
                    total: 0,
                    current: 1,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
                statusData: [
                    {
                        title: '私盘',
                        status: 1,
                        mark: ['mk_source_owner_ck']
                    },
                    {
                        title: '公盘',
                        status: 2,
                        mark: ['mk_source_owner_gp_ck']
                    },
                    {
                        title: '房屋委托',
                        status: 3,
                        mark: ['mk_source_owner_fwwt_ck']
                    },
                ],
                sendData_owner: {
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyKeyword: '',               // 模糊匹配关键词
                    fuzzyQueryType: 0,              //模糊查询类型【0、全部，1、客户姓名，2、客户电话,3、房源地址】
                    sort: '',                       // 排序字段
                    updateTime: '',                 // 修改时间
                    cityId:'',
                    status:'',                      //线索状态【1、正常；2、关闭-我签；3、关闭-他签；4、关闭-无效】
                    urgencyLevel:'',                //紧急程度【1、紧急（7天以内），2、一般（15天以内），3、暂缓（30天以内），4、更久（30天以上）】
                    room:'',                        //户型
                    areaBegin:'',
                    areaEnd:'',
                    priceBegin:'',                  //期望租金-最小值
                    priceEnd:'',                    //期望租金-最大值
                    decorationType:'',              //装修类型【枚举：1、豪华装，2、精装，3、简装，4、毛坯】
                    sourceChannelId:'',             //客户来源
                },
                sendData_delegate:{
                    current: 1,                     // 当前页数
                    size: 10,                       // 每页返回的记录数量
                    fuzzyKeyword: '',               // 模糊匹配关键词
                    fuzzyQueryType: 0,              //模糊查询类型【0、全部，1、客户姓名，2、客户电话】
                    sort: '',                       // 排序字段
                    updateTime: '',                 // 修改时间
                },
                sourceId: '',                       //详情查看的资源id
                clueType:2,                     //租客：1：私盘，2：公盘；3：房屋委托
                searchVisible: false,
                shareSourceDialog:false,        //显示共享线索池
                closeSourceDialog:false,        //是否显示关闭线索池
                assignUserDialog:false,         //显示指派员工
                sourceDetailsDialog:false,      //显示租客（公、私）详情
                addSourceDialog:false,          //添加线索池
                addSourceTitle:'添加潜在租客线索',               //添加线索池标题
                activeIndex: 1,
                fromType:1,                     //1、添加；2、修改；3、激活
                spinLoading:true,
                delegateDetailsDialog:false,      //显示预约详情
                delegateId:'',                    //预约详情id
                cancelDelegateDialog:false,
                infoData:{},
                isRefresh:false,
                clueHouseType:1,
            }
        },
        created() {
            this.clueType = 3;
            this.activeIndex = 2;
            JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                if (value.mark == "mk_source_owner_ck"||value.mark == "mk_source_owner_gp_ck"||value.mark == "mk_source_owner_fwwt_ck"){
                    let current = value.mark == "mk_source_owner_fwwt_ck"?3:value.mark == "mk_source_owner_gp_ck"?2:1;
                    this.clueType = this.clueType>current?current:this.clueType;
                    this.activeIndex = this.clueType -1;
                }
            });
            if(this.clueType==1||this.clueType==2){
                this.getSourceChannel();
            }
            this.initData();
        },
        methods: {
            checkOpts_owner(record){
                let markArr = []
                let flag = false;
                if (record.status==1){
                    if (this.clueType==1){
                        markArr.push('mk_source_owner_zp','mk_source_owner_gb','mk_source_owner_zrgp','mk_source_owner_gxzy','mk_source_owner_bj');
                    }
                    if (this.clueType==2){
                        markArr.push('mk_source_owner_gp_zp','mk_source_owner_gp_gb','mk_source_owner_gp_zrsp','mk_source_owner_gp_gxzy','mk_source_owner_gp_bj');
                    }
                }
                if(record.status==2||record.status==3||record.status==4){
                    if((record.status==2||record.status==3)&&this.clueType==1){
                        markArr.push('mk_source_owner_cxjh');
                        markArr.push('mk_source_owner_sc');
                    }
                    if ((record.status==2||record.status==3)&&this.clueType==2){
                        markArr.push('mk_source_owner_gp_cxjh');
                        markArr.push('mk_source_owner_gp_sc');
                    }
                    if(record.status==4&&this.clueType==1){
                        markArr.push('mk_source_owner_sc');
                    }
                    if(record.status==4&&this.clueType==2){
                        markArr.push('mk_source_owner_gp_sc');
                    }
                }
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if (markArr.includes(value.mark)){
                        flag = true
                    }
                })
                return flag
            },
            checkOpts_delegate(record){
                let markArr = []
                let flag = false;
                if (record.status==1) {
                    markArr.push('mk_source_owner_fwwt_zp','mk_source_owner_fwwt_zrgp','mk_source_owner_fwwt_zrsp','mk_source_owner_fwwt_qx');
                }
                if(record.status==2) {
                    markArr.push('mk_source_owner_fwwt_zp');
                }
                JSON.parse(sessionStorage.getItem('permissions')).forEach(value => {
                    if (markArr.includes(value.mark)){
                        flag = true
                    }
                })
                return flag
            },
            getSourceChannel(){
                API.getSourceChannel().then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        let resData= res.data;
                        let searchListList = [];
                        let objTemp1 = {};
                        objTemp1.label = '全部';
                        objTemp1.value = null;
                        searchListList.push(objTemp1);
                        for (let i = 0; i < resData.length; i++) {
                            let objTemp = {};
                            objTemp.label = resData[i].name;
                            objTemp.value = resData[i].id;
                            searchListList.push(objTemp);
                        }
                        this.searchList_owner[5].list = searchListList;
                    }
                });
            },
            cancelCancelDelegate(){
                this.cancelDelegateDialog = false;
            },
            successCancelDelegate(){
                //来自作废成功
                this.cancelDelegateDialog = false;
                this.initData();
            },
            initData() {
                this.getData();
            },
            openSearchDrawer() {
                //弹出搜索框
                this.searchVisible = true;
            },
            closeSearchDrawer() {
                //关闭搜索框
                this.searchVisible = false;
            },
            assetsFormData_owner(data) {
                this.searchVisible = false;
                this.sendData_owner.fuzzyQueryType = data.fuzzyQueryType;
                this.sendData_owner.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData_owner.cityId = data.cityId;
                this.sendData_owner.status = data.status;
                this.sendData_owner.urgencyLevel = data.urgencyLevel;
                this.sendData_owner.room = data.room;
                this.sendData_owner.areaBegin = data.areaBegin;
                this.sendData_owner.areaEnd = data.areaEnd;
                this.sendData_owner.priceBegin = data.priceBegin;
                this.sendData_owner.priceEnd = data.priceEnd;
                this.sendData_owner.decorationType = data.decorationType;
                this.sendData_owner.sourceChannelId = data.sourceChannelId;
                this.sendData_owner.current = 1;
                this.pagination_owner.current = 1;
                this.initData();
            },
            assetsFormData_delegate(data) {
                this.searchVisible = false;
                this.sendData_delegate.cityId = data.cityId;
                this.sendData_delegate.fuzzyQueryType = data.fuzzyQueryType;
                this.sendData_delegate.fuzzyKeyword = data.fuzzyKeyword;
                this.sendData_delegate.current = 1;
                this.sendData_delegate.type = data.type;
                this.sendData_delegate.status = data.status;
                this.sendData_delegate.sourceType = data.sourceType;
                this.sendData_delegate.room = data.room;
                this.sendData_delegate.orientation = data.orientation;
                this.sendData_delegate.areaBegin = data.areaBegin;
                this.sendData_delegate.areaEnd = data.areaEnd;
                this.sendData_delegate.priceBegin = data.priceBegin;
                this.sendData_delegate.priceEnd = data.priceEnd;
                this.sendData_delegate.timeBegin = data.timeBegin;
                this.sendData_delegate.timeEnd = data.timeEnd;
                this.pagination_owner.current = 1;
                this.initData();
            },
            getData() {
                this.spinLoading = true;
                if(this.clueType==1||this.clueType==2){
                    this.sendData_owner.clueType = this.clueType;
                    API.ownerClueList(this.sendData_owner).then(res => {
                        if (res&&res.code === "200") {
                            this.tableData_owner = res.data.records;
                            this.tableData_owner.forEach(function(element, index) {
                                element.num = index + 1;
                            }, this);
                            this.pagination_owner.total = res.data.total;
                        }
                        this.spinLoading = false;
                    })
                }
                else if(this.clueType==3){
                    API.delegateList(this.sendData_delegate).then(res => {
                        if (res&&res.code === "200") {
                            this.tableData_delegate = res.data.records;
                            this.tableData_delegate.forEach(function(element, index) {
                                element.num = index + 1;
                            }, this);
                            this.pagination_delegate.total = res.data.total;
                        }
                        this.spinLoading = false;
                    })
                }
            },
            openDetail_owner(record) {
                return {
                    on: {
                        click: () => {
                            this.sourceId = record.id;
                            this.sourceDetailsDialog = true;
                            this.clueHouseType = record.clueHouseType;
                        }
                    }
                }
            },
            openDetailOwner(record) {
                this.sourceId = record.id;
                this.sourceDetailsDialog = true;
            },
            openDetail_delegate(record) {
                return {
                    on: {
                        click: () => {
                            this.delegateId = record.id;
                            this.delegateDetailsDialog = true;
                        }
                    }
                }
            },
            openDetailFocusFollow(record){
                this.sourceId = record.id;
                this.sourceDetailsDialog = true;
                this.clueHouseType = record.clueHouseType;
                //聚焦添加跟进
                setTimeout(()=>{
                    this.$refs.sourceDetails.openAddFollowDetail();
                },500);
            },
            changeStatus(option) {
                this.$refs.searchDialog_owner.resetData();
                this.$refs.searchDialog_delegate.resetData();
                this.clueType = option.status;
                //用于控制放在一起兼容bug
                this.sendData_owner.current = 1;
                this.sendData_owner.size = 10;
                this.pagination_owner.pageSize = 10;
                this.pagination_owner.current = 1;
                this.sendData_delegate.current = 1;
                this.sendData_delegate.size = 10;
                this.pagination_delegate.pageSize = 10;
                this.pagination_delegate.current = 1;
                this.getData();
            },
            addSource(flag,record) {
                this.fromType = flag;
                if(flag==1){
                    this.sourceId = '';
                    this.addSourceTitle = '添加潜在业主线索';
                }
                else if(flag==2){
                    this.sourceId = record.id;
                    this.addSourceTitle = '编辑潜在业主线索';
                }
                else if(flag==3){
                    this.sourceId = record.id;
                    this.addSourceTitle = '激活潜在业主线索';
                }
                this.addSourceDialog = true;
            },
            changePrivate(record){
                let _this = this;
                if(this.clueType==1||this.clueType==2){
                    this.$modal.confirm({
                        title: '确定要将潜在业主线索 「 ' + record.name+'/'+record.phone + ' 」 转入私盘吗？',
                        content: '转入后，会在您的私盘新增一条记录',
                        width:"433px",
                        height:"192px",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            API.ownerClueTurnPrivate({id:record.id}).then(res=>{
                                if (res.code === '200') {
                                    _this.$message.success('转入私盘成功');
                                    _this.initData();
                                } else {
                                    _this.$message.success('转入私盘失败');
                                    _this.initData();
                                }
                            })
                        },
                        onCancel() {
                        },
                    });
                }
                else if(this.clueType==3){
                    this.$modal.confirm({
                        title: '确定要将客户 「' + record.name+'/'+record.phone + '」 转入到自己的私盘吗？',
                        content: '转入后，会在您的私盘中新增一条记录',
                        width:"433px",
                        height:"192px",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            API.delegateTurnPrivateClue({id:record.id}).then(res=>{
                                if (res.code === '200') {
                                    _this.$message.success('转入私盘成功');
                                    _this.initData();
                                } else {
                                    _this.$message.success('转入私盘失败');
                                    _this.initData();
                                }
                            })
                        },
                        onCancel() {
                        },
                    });
                }
            },
            changPublic(record){
                let _this = this;
                if(this.clueType==1||this.clueType==2) {
                    this.$modal.confirm({
                        title: '确定要将潜在业主线索 「 ' + record.name + '/' + record.phone + ' 」 转入公盘吗？',
                        content: '转入后，公司所有人员都可查看到',
                        width: "433px",
                        height: "192px",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            API.ownerClueTurnPub({id:record.id}).then(res => {
                                if (res.code === '200') {
                                    _this.$message.success('转入公盘成功');
                                    _this.initData();
                                } else {
                                    _this.$message.success('转入公盘失败');
                                    _this.initData();
                                }
                            })
                        },
                        onCancel() {
                        },
                    });
                }
                else if(this.clueType==3){
                    this.$modal.confirm({
                        title: '确定要将客户 「' + record.name+'/'+record.phone + '」 转入到公盘吗？',
                        content: '转入后，会在公盘中新增一条记录',
                        width:"433px",
                        height:"192px",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            API.delegateTurnPubClue({id:record.id}).then(res=>{
                                if (res.code === '200') {
                                    _this.$message.success('转入公盘成功');
                                    _this.initData();
                                } else {
                                    _this.$message.success('转入公盘失败');
                                    _this.initData();
                                }
                            })
                        },
                        onCancel() {
                        },
                    });
                }
            },
            cancelSave(){
                this.addSourceDialog = false;
            },
            successSave(){
                this.addSourceDialog = false;
                this.initData();
            },
            cancelDetails(){
                this.sourceDetailsDialog = false;
                this.delegateDetailsDialog = false;
                this.initData();
            },
            changeSourceId(sourceId){
                if(sourceId){
                    this.sourceId = sourceId;
                }
            },
            refreshinfoFun(res){  //详情有改变的操作  就改变状态
                if(res){
                   this.isRefresh = res
                }  
            },
            isRefreshFun(){      //根据详情有改变数据的操作 需要刷新
                if(this.isRefresh){
                    this.initData();
                }
                this.sourceDetailsDialog = false;
                this.delegateDetailsDialog = false;
                this.isRefresh = false
            },
            openDelegateCancel(record){
                this.infoData = record;
                this.cancelDelegateDialog = true;
            },
            cancelShareSource(){
                this.shareSourceDialog = false;
            },
            successShareSource(){
                this.shareSourceDialog = false;
                this.initData();
            },
            cancelCloseSource(){
                this.closeSourceDialog = false;
            },
            successCloseSource(){
                this.closeSourceDialog = false;
                this.initData();
            },
            cancelAssignUser(){
                this.assignUserDialog = false;
            },
            successAssignUser(){
                this.assignUserDialog = false;
                this.initData();
            },
            openAssignUser(record){
                this.sourceId = record.id;
                this.assignUserDialog = true;
            },
            openCloseSource(record){
                this.sourceId = record.id;
                this.closeSourceDialog = true;
            },
            openShareSource(record){
                this.sourceId = record.id;
                this.shareSourceDialog = true;
            },
            onSizeChange_owner(current) {
                this.sendData_owner.current = current;
                this.pagination_owner.current = current;
                this.initData();
            },
            onShowSizeChange_owner(current, pageSize) {
                this.sendData_owner.current = current;
                this.sendData_owner.size = pageSize;
                this.pagination_owner.pageSize = pageSize;
                this.initData();
            },
            onSizeChange_delegate(current) {
                this.sendData_delegate.current = current;
                this.pagination_delegate.current = current;
                this.initData();
            },
            onShowSizeChange_delegate(current, pageSize) {
                this.sendData_delegate.current = current;
                this.sendData_delegate.size = pageSize;
                this.pagination_delegate.pageSize = pageSize;
                this.initData();
            },
            deleteChild(data) {
                let _this = this;
                let id = data.id
                this.$modal.confirm({
                    title: '确定要删除潜在业主线索 「' + data.name + '/' + data.phone + '」 的信息吗？',
                    content: '删除后将不可恢复',
                    okText: '确定',
                    cancelText: '取消',
                    icon: () => <icon-font type="iconyumengtubiao_shanchu-1" class="deleteColor" style="color:#f5222d" />,
                    onOk() {
                        API.ownerClueRemove({id:id}).then(res => {
                            if (res.code == 200) {
                                _this.$message.success('操作成功！');
                                _this.initData();
                            }
                        })
                    },
                    onCancel() {
                    },
                });
            },
            
        },
        filters: {
            moneySpecialVal(record){
                let max = record.maxMoney/100;
                let min = record.minMoney/100;
                if(min){
                    if(max){
                        return min+'-'+max+'元';
                    }else{
                        return min+'元';
                    }
                }else{
                    if(max){
                        return max+'元';
                    }else{
                        return '-';
                    }
                }
            },
            blankVal(val){
                if(!val){
                    return '-';
                }else{
                    return  val;
                }
            },
            timeVal(val){
                if(val=='几秒前'){
                    return '刚刚';
                } else{
                    return  val;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .sourceBox {
        .content-top {
            min-width: 1300px; // overflow: hidden;
        }
        .content-main {
            padding: 0;
            & /deep/ .content {
                // overflow:visible;
                padding: 0;
                margin: 20px;
            }
        }
        .search-box {
            &/deep/ .ant-input {
                border-radius: 50px;
            }
        }
        .userManageOperate {
            margin-right: 14px;
            float: right;
            .userSearch {
                float: left;
                margin-right: 15px;
            }
        }
        .table {
            min-width: 1200px;
            .action:hover {
                background-color: @themeBgColor;
                color: @themeColor;
            }
            .IconRadius {
                margin-top: 8px;
                margin-right: 5px;
                width: 6px;
                height: 6px;
                border-radius: 4px;
            }
            .fontNormal {
                .normalBg {
                    background: rgba(255, 160, 54, 1);
                }
            }
            .fontProhibit {
                .prohibitBg0 {
                    background: #FB4246;
                }
                .prohibitBg1 {
                    background: #0A87F8;
                }
                .prohibitBg2 {
                    background: #777777;
                }
            }
            .fontProhibitColor {
                color: #111111;
            }
            .nameColumn {
                width: 100%;
                .name {
                    float: left;
                }
                .leaderFlag {
                    color: #777777;
                    border: 1px solid #777777;
                    border-radius: 10px;
                    width: 36px;
                    float: left;
                    margin-left: 4px;
                    .leaderLength {
                        width: 27px;
                        margin-left: 5px;
                        font-size: 12px;
                    }
                }
            }
            .paddingStyle{
                padding: 3px;
            }
            .urgencyLevel1{
                width:36px;
                height:20px;
                border-radius:2px;
                border:0.5px solid rgba(251,66,70,1);
                color: #FB4246;
                font-size: 12px;
                text-align: center;
            }
            .urgencyLevel2{
                width:36px;
                height:20px;
                border-radius:2px;
                border:0.5px solid rgba(255,160,54,1);
                color: #FFA036;
                font-size: 12px;
                text-align: center;
            }
            .urgencyLevel3{
                width:36px;
                height:20px;
                border-radius:2px;
                border:0.5px solid rgba(3,198,131,1);
                color: #03C683;
                font-size: 12px;
                text-align: center;
            }
            .urgencyLevel4{
                width:36px;
                height:20px;
                border-radius:2px;
                border:0.5px solid rgba(10,135,248,1);
                color: #0A87F8;
                font-size: 12px;
                text-align: center;
            }
            .time{
                height:20px;
                border-radius:2px;
                color: #0A87F8;
                background-color: #f0f8ff;
                font-size: 12px;
                text-align: center;
                padding: 5px 5px;
            }
            .houseAddress{
                height:20px;
                border-radius:2px;
                color: #0A87F8;
                background-color: #f0f8ff;
                font-size: 12px;
                text-align: center;
                padding: 5px 5px;
            }
            .decorationType{
                height:20px;
                line-height: 20px;
                border-radius:2px;
                font-size: 12px;
                text-align: center;
                padding: 3px 5px;
                transform: scale(0.8);
                margin-right: 4px;
            }
            .decorationType1{
                color: #FFA848;
                background-color: rgba(255,168,72,0.1);
            }
            .decorationType2{
                color: #03C280;
                background-color: rgba(3,194,128,0.1);
            }
            .decorationType3{
                color: #138BF7;
                background-color:rgba(19,139,247,0.1);
            }
            .decorationType4{
                color: #20BBCD;
                background-color:rgba(32,187,205,0.1);
            }
            .otherHouse{
                max-width: 350px;
                padding: 17px 20px 0 20px;
                .otherHouseIndex{
                    padding: 0 5px;
                    height:16px;
                    background:rgba(10,135,248,1);
                    border-radius:2px;
                    color: #FFFFFF;
                }
                .otherHouseCon{
                    margin-left: 22px;
                    margin-top: 12px;
                    display: flex;
                    justify-content: flex-start;
                    .houseConOne{
                        display: flex;
                        flex-direction:column; 
                        justify-content: flex-start;
                        .minWidth{
                           max-width:116px;
                           margin-right:20px; 
                        }
                        .maxWidth{
                           width:168px;
                        }
                        .inlineBlock{
                            display:inline-block;
                        }
                        div{
                            
                            text-align: left;
                        }
                        .houseConTit{
                            font-size: 12px;
                            color: #666666;
                        }
                        .houseCot{
                            margin-top: 7px;
                            font-size: 12px;
                            color: #666666;
                            font-size: 14px;
                            color: #111111;
                        }
                    }
                   
                }
                .cityName{
                    margin-left: 3px;
                    color: #111111;
                    font-size: 14px;
                    font-weight: 500;
                }
                .houseDetail{
                    margin-left: 22px;
                    margin-top: 12px;
                    .item{
                        width: 68px;
                        font-size: 12px;
                        color: #666666;
                    }
                }
                .houseDetailContent{
                    margin-left: 22px;
                    margin-top: 7px;
                    .item{
                        width: 68px;
                        font-size: 14px;
                        color: #111111
                    }
                }
            }
        }
        .contFoot {
            margin-top: 15px;
            width: 100%;
            height: 56px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 20px; // position: absolute;
            // bottom: 0px;
            // right: 0;
            background-color: #fff;
            & /deep/ .ant-pagination {
                margin-right: 11px;
            }
        }
        & /deep/.ant-table-tbody>tr>td {
            padding: 12px 6px;
            &:not(:first-child) {
                cursor: pointer;
            }
        }
        & /deep/.ant-table-thead > tr > th{
            padding: 12px 6px;
        }
        .font-span {
            width: 20px;
            display: inline-block;
            font-size: 20px;
        }
        .signType1 {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(10, 135, 248, 1);
            color: rgba(10, 135, 248, 1);
            border-radius: 50%;
            line-height: 18px;
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
        }
        .signType2 {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(3, 198, 131, 1);
            color: rgba(3, 198, 131, 1);
            border-radius: 50%;
            line-height: 18px;
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
        }
        .address-span {
            display: inline-block;
            max-width: 300px;
        }
        .isCertified-font {
            position: absolute;
            color: rgba(251, 66, 70, 0.5);
            z-index: 2;
            top: 5px;
            width: 27px;
            height: 24px;
            left: -18px; //         svg{
            //             height: 100%;
            //             width: 100%;
            //             use{
            // height: 100%;
            //             width: 100%;
            //             }
            //         }
        }
        & /deep/ .ant-popover {
            .ant-popover-inner-content {
                text-align: center;
                padding: 5px 0;
                .action {
                    padding: 8px 10px;
                }
                .action:hover {
                    cursor: pointer;
                    background: rgba(10, 135, 248, 0.1);
                }
            }
        }
    }
</style>
