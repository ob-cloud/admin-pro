<template>
    <div class="biz-workflow-detail">
        <div class="content-follow" v-for="(node,index) in nodeList" :key="index" :style="index==0?'margin-top: 10px;':''">
            <div class="content-follow-node">
                <div class="f-fr" v-if="node.isCompleted==1">
                    <div class="node-start" v-if="node.type==1">发起申请</div>
                    <div class="node-pass" v-if="node.type==2&&node.auditAllPassNode&&node.auditAllPassNode.auditResult&&node.auditAllPassNode.auditResult==1">审批通过</div>
                    <div class="node-reject" v-if="node.type==2&&node.auditAllPassNode&&node.auditAllPassNode.auditResult&&node.auditAllPassNode.auditResult==2">审批驳回</div>
                    <div class="node-pass" v-if="node.type==3&&node.auditOneOfPassNode&&node.auditOneOfPassNode.auditResult&&node.auditOneOfPassNode.auditResult==1">审批通过</div>
                    <div class="node-reject" v-if="node.type==3&&node.auditOneOfPassNode&&node.auditOneOfPassNode.auditResult&&node.auditOneOfPassNode.auditResult==2">审批驳回</div>
                    <div class="node-withdraw" v-if="node.type==4">已撤销</div>
                </div>
                <div class="f-fr" v-else>
                    <div class="node-approval" v-if="node.isProcessingNode==1">审批中</div>
                </div>
                <div class="f-fr" v-if="node.isCompleted==1">
                    <div class="node-start-time" v-if="node.type==1">{{node.submitNode.occurTime?$moment(node.submitNode.occurTime).format('YYYY.MM.DD HH:mm'):''}}</div>
                    <div class="node-start-time" v-if="node.type==2&&node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length==1">{{node.auditAllPassNode.completedTaskList[0].occurTime?$moment(node.auditAllPassNode.completedTaskList[0].occurTime).format('YYYY.MM.DD HH:mm'):''}}</div>
                    <div class="node-start-time" v-if="node.type==3">{{node.auditOneOfPassNode.completedTask.occurTime?$moment(node.auditOneOfPassNode.completedTask.occurTime).format('YYYY.MM.DD HH:mm'):''}}</div>
                    <div class="node-start-time" v-if="node.type==4&&node.revokeNode">{{node.revokeNode.occurTime?$moment(node.revokeNode.occurTime).format('YYYY.MM.DD HH:mm'):''}}</div>
                </div>
            </div>
            <div class="content-follow-left">
                <div class="radius-font radius-font-follow" :style="node.isCompleted==0?'background-color: rgba(119,119,119,0.1);;color: #777777;':'background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;'" v-if="node.type==1">
                    <div class="inner-radius-font" :class="node.isCompleted==0?'unAduiting':'aduiting'"></div>
                </div>
                <div class="radius-font radius-font-follow" :style="(node.isCompleted==1||node.isProcessingNode==1)?'background-color: rgba(10, 135, 248, 0.1);color: #0A87F8;':'background-color: rgba(119,119,119,0.1);;color: #777777;'" v-else>
                    <div class="inner-radius-font" :class="(node.isCompleted==1||node.isProcessingNode==1)?'aduiting':'unAduiting'"></div>
                </div>
                <div class="content-follow-left-line" :class="node.isCompleted==0?'unCompeleteType':'compeleteType'" v-if="index<nodeList.length-1"></div>
            </div>
            <div class="content-follow-right">
                <!-- 已完成 -->
                <div class="follow-right-line-one clearfix" v-if="node.isCompleted==1">
                    <div class="name f-fl" v-if="node.type==1">{{node.submitNode.submitter}}</div>
                    <div class="name f-fl" v-if="node.type==2&&node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length==1">{{node.auditAllPassNode.completedTaskList[0].personName}}</div>
                    <div class="name f-fl" v-if="node.type==2&&node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length>1&&node.auditAllPassNode.operatorTypeName=='审批人'">{{node.auditAllPassNode.operatorTypeName}}</div>
                    <div class="name f-fl" v-if="node.type==2&&node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length>1&&node.auditAllPassNode.operatorTypeName!='审批人'">{{node.auditAllPassNode.operatorTypeName}}</div>
                    <div class="name f-fl" v-if="node.type==3">{{node.auditOneOfPassNode.completedTask.personName}}</div>
                    <div class="name f-fl" v-if="node.type==4&&node.revokeNode">{{node.revokeNode.operatorName}}</div>
                </div>
                <div class="follow-right-line-one clearfix" v-else>
                    <div class="name f-fl" v-if="node.type==2&&node.auditAllPassNode">{{node.auditAllPassNode.operatorTypeName}}</div>
                    <div class="name f-fl" v-if="node.type==3&&node.auditOneOfPassNode">{{node.auditOneOfPassNode.operatorTypeName}}</div>
                </div>
                <div v-if="node.isCompleted==1">
                    <div v-if="node.type==1">
                        <div class="start_cc" v-if="node.submitNode&&node.submitNode.ccInfo&&node.submitNode.ccInfo.ccPeopleList.length>0">
                            <div><span class="cc_icon start_cc_icon"><icon-font type="iconyumengtubiao_jiaosequanxian" /></span><span class="start_cc_title">抄送人</span></div>
                            <div style="margin-left: 24px;"><span class="start_cc_total">已抄送{{node.submitNode.ccInfo.ccPeopleList.length}}人</span><span class="start_cc_readed">{{node.submitNode.ccInfo.viewedTotal==0?'全部未读':node.submitNode.ccInfo.viewedTotal==node.submitNode.ccInfo.ccPeopleList.length?'全部已读':node.submitNode.ccInfo.viewedTotal+'人已读'}}</span></div>
                            <div style="margin-left: 24px;" class="clearfix"><div v-for="(item) in node.submitNode.ccInfo.ccPeopleList" class="start_cc_name send f-fl" :class="item.isViewed==1?'read':'normal'">{{item.name}}<icon-font v-if="item.isViewed==1" style="color: #0A87F8;margin-left: 2px;" type="iconyumengtubiao_xuanzhong-" /></div></div>
                        </div>
                    </div>
                    <div v-if="node.type==2">
                        <div class="follow-right-line-two" v-if="node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length==1">{{node.auditAllPassNode.completedTaskList[0].auditReason}}</div>
                        <!--<div class="follow-right-line-two" v-if="node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length > 1">{{node.auditAllPassNode.completedTaskList.length+node.auditAllPassNode.undonePersonNameList.length}}人会签</div>-->
                        <div class="annexList" v-if="node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length == 1&&node.auditAllPassNode.completedTaskList[0].annexList.length>0">
                            <div class="annexList-img" :data-index="i" v-for="(v, i) in node.auditAllPassNode.completedTaskList[0].annexList" :key="i">
                                <div class="annex-box cursor" v-if="v.fileExt == 'xls'||v.fileExt == 'xlsx'" @click="previewOfficeFile(v.origin)">
                                    <img src="https://oss.byteox.com/byteox/2020-07-10/30fce27dc1d64c5894c457de3fb28581.png" alt="" />
                                    <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                </div>
                                <div class="annex-box cursor" v-else-if="v.fileExt == 'doc'||v.fileExt == 'docx' " @click="previewOfficeFile(v.origin)">
                                    <img src="https://oss.byteox.com/byteox/2020-07-10/f79d9e1fa6af490d98408a6ddf823921.png" alt="" />
                                    <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                </div>
                                <div class="annex-box cursor" v-else-if="v.fileExt == 'pdf' " @click="previewPdf(v.origin)">
                                    <img src="https://oss.byteox.com/byteox/2020-07-10/28ea3c884b87454c8b24dfced8a9f3c8.png" alt="" />
                                    <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                </div>
                                <div class="annex-box cursor" v-else-if="v.fileExt == 'ppt'||v.fileExt == 'pptx'" @click="previewOfficeFile(v.origin)">
                                    <img src="https://oss.byteox.com/byteox/2020-07-10/df0b4ffcbdfe44b38d26bb39cec2320c.png" alt="" />
                                    <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                </div>
                                <div class="annex-box cursor" v-else @click="handlePreview(v)">
                                    <img :src="v.origin" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="second-content" v-if="node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length > 1">
                            <div v-for="(item,itemIndex) in node.auditAllPassNode.completedTaskList" class="second-content-follow">
                                <div class="second-content-follow-status">
                                    <div class="pass" v-if="item.auditResult&&item.auditResult==1">审批通过</div>
                                    <div class="reject" v-if="item.auditResult&&item.auditResult==2">审批驳回</div>
                                    <div class="date">{{item.occurTime?$moment(item.occurTime).format('YYYY.MM.DD HH:mm'):''}}</div>
                                </div>
                                <div class="second-content-follow-left">
                                    <span class="second-content-radius"><icon-font type="iconyumengtubiao_weifenpeirenyuan" /></span>
                                    <div class="second-content-follow-left-line compeleteType" v-if="itemIndex<node.auditAllPassNode.completedTaskList.length-1"></div>
                                </div>
                                <div class="second-content-follow-right" :style="itemIndex==node.auditAllPassNode.completedTaskList.length-1?'margin-bottom: 0;':''">
                                    <div style="width: 100%" class="clearfix">
                                        <div class="name f-fl">{{item.personName}}</div>
                                    </div>
                                    <div class="second-follow-right-line-two">{{item.auditReason}}</div>
                                    <div class="annexList" v-if="item.annexList&&item.annexList.length>0">
                                        <div class="annexList-img-little" :data-index="i" v-for="(v, i) in item.annexList" :key="i">
                                            <div class="annex-box cursor" v-if="v.fileExt == 'xls'||v.fileExt == 'xlsx'" @click="previewOfficeFile(v.origin)">
                                                <img src="https://oss.byteox.com/byteox/2020-07-10/30fce27dc1d64c5894c457de3fb28581.png" alt="" />
                                                <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                            </div>
                                            <div class="annex-box cursor" v-else-if="v.fileExt == 'doc'||v.fileExt == 'docx' " @click="previewOfficeFile(v.origin)">
                                                <img src="https://oss.byteox.com/byteox/2020-07-10/f79d9e1fa6af490d98408a6ddf823921.png" alt="" />
                                                <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                            </div>
                                            <div class="annex-box cursor" v-else-if="v.fileExt == 'pdf' " @click="previewPdf(v.origin)">
                                                <img src="https://oss.byteox.com/byteox/2020-07-10/28ea3c884b87454c8b24dfced8a9f3c8.png" alt="" />
                                                <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                            </div>
                                            <div class="annex-box cursor" v-else-if="v.fileExt == 'ppt'||v.fileExt == 'pptx' " @click="previewOfficeFile(v.origin)">
                                                <img src="https://oss.byteox.com/byteox/2020-07-10/df0b4ffcbdfe44b38d26bb39cec2320c.png" alt="" />
                                                <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                            </div>
                                            <div class="annex-box cursor" v-else @click="handlePreview(v)">
                                                <img :src="v.origin" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="start_cc" v-if="node.auditAllPassNode&&node.auditAllPassNode.ccInfo&&node.auditAllPassNode.ccInfo.ccPeopleList.length>0" :style="node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length > 1?'margin-top:10px':''">
                            <div><span class="cc_icon start_cc_icon"><icon-font type="iconyumengtubiao_jiaosequanxian" /></span><span class="start_cc_title">抄送人</span></div>
                            <div style="margin-left: 24px;"><span class="start_cc_total">已抄送{{node.auditAllPassNode.ccInfo.ccPeopleList.length}}人</span><span class="start_cc_readed">{{node.auditAllPassNode.ccInfo.viewedTotal==0?'全部未读':node.auditAllPassNode.ccInfo.viewedTotal==node.auditAllPassNode.ccInfo.ccPeopleList.length?'全部已读':node.auditAllPassNode.ccInfo.viewedTotal+'人已读'}}</span></div>
                            <div style="margin-left: 24px;" class="clearfix"><div v-for="(item) in node.auditAllPassNode.ccInfo.ccPeopleList" class="start_cc_name send f-fl" :class="item.isViewed==1?'read':'normal'">{{item.name}}<icon-font v-if="item.isViewed==1" style="color: #0A87F8;margin-left: 2px;" type="iconyumengtubiao_xuanzhong-" /></div></div>
                        </div>
                    </div>
                    <div v-if="node.type==3">
                        <div class="follow-right-line-two" v-if="node.auditOneOfPassNode&&node.auditOneOfPassNode.completedTask">{{node.auditOneOfPassNode.completedTask.auditReason}}</div>
                        <div class="annexList" v-if="node.auditOneOfPassNode.completedTask.annexList&&node.auditOneOfPassNode.completedTask.annexList.length>0">
                            <div class="annexList-img" :data-index="i" v-for="(v, i) in node.auditOneOfPassNode.completedTask.annexList" :key="i">
                                <div class="annex-box cursor" v-if="v.fileExt == 'xls'||v.fileExt == 'xlsx'" @click="previewOfficeFile(v.origin)">
                                    <img src="https://oss.byteox.com/byteox/2020-07-10/30fce27dc1d64c5894c457de3fb28581.png" alt="" />
                                    <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                </div>
                                <div class="annex-box cursor" v-else-if="v.fileExt == 'doc'||v.fileExt == 'docx' " @click="previewOfficeFile(v.origin)">
                                    <img src="https://oss.byteox.com/byteox/2020-07-10/f79d9e1fa6af490d98408a6ddf823921.png" alt="" />
                                    <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                </div>
                                <div class="annex-box cursor" v-else-if="v.fileExt == 'pdf' " @click="previewPdf(v.origin)">
                                    <img src="https://oss.byteox.com/byteox/2020-07-10/28ea3c884b87454c8b24dfced8a9f3c8.png" alt="" />
                                    <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                </div>
                                <div class="annex-box cursor" v-else-if="v.fileExt == 'ppt'||v.fileExt == 'pptx' " @click="previewOfficeFile(v.origin)">
                                    <img src="https://oss.byteox.com/byteox/2020-07-10/df0b4ffcbdfe44b38d26bb39cec2320c.png" alt="" />
                                    <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                </div>
                                <div class="annex-box cursor" v-else @click="handlePreview(v)">
                                    <img :src="v.origin" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="start_cc" v-if="node.auditOneOfPassNode&&node.auditOneOfPassNode.ccInfo&&node.auditOneOfPassNode.ccInfo.ccPeopleList.length>0">
                            <div><span class="cc_icon start_cc_icon"><icon-font type="iconyumengtubiao_jiaosequanxian" /></span><span class="start_cc_title">抄送人</span></div>
                            <div style="margin-left: 24px;"><span class="start_cc_total">已抄送{{node.auditOneOfPassNode.ccInfo.ccPeopleList.length}}人</span><span class="start_cc_readed">{{node.auditOneOfPassNode.ccInfo.viewedTotal==0?'全部未读':node.auditOneOfPassNode.ccInfo.viewedTotal==node.auditOneOfPassNode.ccInfo.ccPeopleList.length?'全部已读':node.auditOneOfPassNode.ccInfo.viewedTotal+'人已读'}}</span></div>
                            <div style="margin-left: 24px;" class="clearfix"><div v-for="(item) in node.auditOneOfPassNode.ccInfo.ccPeopleList" class="start_cc_name send f-fl" :class="item.isViewed==1?'read':'normal'">{{item.name}}<icon-font v-if="item.isViewed==1" style="color: #0A87F8;margin-left: 2px;" type="iconyumengtubiao_xuanzhong-" /></div></div>
                        </div>
                    </div>
                    <div v-if="node.type==4">
                        <div class="follow-right-line-two">{{node.revokeNode.revokeReason}}</div>
                    </div>
                </div>
                <div v-else>
                    <!-- 审批中及未审批节点 -->
                    <div>
                        <div class="clearfix">
                            <div class="follow-right-line-two f-fl" v-if="node.type==2">{{node.auditAllPassNode.completedTaskList.length+node.auditAllPassNode.undonePersonNameList.length}}人会签</div>
                            <div class="follow-right-line-two f-fl" v-if="node.type==3">{{node.auditOneOfPassNode.personNameList.length}}人或签</div>
                        </div>
                        <div v-if="node.type==2" class="clearfix" style="padding-bottom: 5px;">
                            <div v-for="(item) in node.auditAllPassNode.undonePersonNameList" class="start_cc_name unSend f-fl">{{item}}</div>
                        </div>
                        <div v-if="node.type==3" class="clearfix" style="padding-bottom: 5px;">
                            <div v-for="(item) in node.auditOneOfPassNode.personNameList" class="start_cc_name unSend f-fl">{{item}}</div>
                        </div>
                        <div class="second-content" v-if="node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length > 0">
                            <div v-for="(item,itemIndex) in node.auditAllPassNode.completedTaskList" class="second-content-follow">
                                <div class="second-content-follow-status">
                                    <div class="pass f-fr" v-if="item.auditResult&&item.auditResult==1">审批通过</div>
                                    <div class="reject f-fr" v-if="item.auditResult&&item.auditResult==2">审批驳回</div>
                                    <div class="date f-fr">{{item.occurTime?$moment(item.occurTime).format('YYYY.MM.DD HH:mm'):''}}</div>
                                </div>
                                <div class="second-content-follow-left">
                                    <span class="second-content-radius"><icon-font type="iconyumengtubiao_weifenpeirenyuan" /></span>
                                    <div class="second-content-follow-left-line compeleteType" v-if="itemIndex<node.auditAllPassNode.completedTaskList.length-1"></div>
                                </div>
                                <div class="second-content-follow-right" :style="itemIndex==node.auditAllPassNode.completedTaskList.length-1?'margin-bottom: 0;':''">
                                    <div style="width: 100%" class="clearfix">
                                        <div class="name f-fl">{{item.personName}}</div>
                                    </div>
                                    <div class="second-follow-right-line-two">{{item.auditReason}}</div>
                                    <div class="annexList" v-if="item.annexList&&item.annexList.length>0">
                                        <div class="annexList-img-little" :data-index="i" v-for="(v, i) in item.annexList" :key="i">
                                            <div class="annex-box cursor" v-if="v.fileExt == 'xls'||v.fileExt == 'xlsx' " @click="previewOfficeFile(v.origin)">
                                                <img src="https://oss.byteox.com/byteox/2020-07-10/30fce27dc1d64c5894c457de3fb28581.png" alt="" />
                                                <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                            </div>
                                            <div class="annex-box cursor" v-else-if="v.fileExt == 'doc'||v.fileExt == 'docx' " @click="previewOfficeFile(v.origin)">
                                                <img src="https://oss.byteox.com/byteox/2020-07-10/f79d9e1fa6af490d98408a6ddf823921.png" alt="" />
                                                <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                            </div>
                                            <div class="annex-box cursor" v-else-if="v.fileExt == 'pdf' " @click="previewPdf(v.origin)">
                                                <img src="https://oss.byteox.com/byteox/2020-07-10/28ea3c884b87454c8b24dfced8a9f3c8.png" alt="" />
                                                <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                            </div>
                                            <div class="annex-box cursor" v-else-if="v.fileExt == 'ppt'||v.fileExt == 'pptx' " @click="previewOfficeFile(v.origin)">
                                                <img src="https://oss.byteox.com/byteox/2020-07-10/df0b4ffcbdfe44b38d26bb39cec2320c.png" alt="" />
                                                <div class="fontStyle overHidde"> {{v.fileOriginName}}</div>
                                            </div>
                                            <div class="annex-box cursor" v-else @click="handlePreview(v)">
                                                <img :src="v.origin" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="start_cc" v-if="node.type==2&&node.auditAllPassNode&&node.auditAllPassNode.ccInfo&&node.auditAllPassNode.ccInfo.ccPeopleList.length>0" :style="node.auditAllPassNode&&node.auditAllPassNode.completedTaskList.length > 0?'margin-top:10px;':''">
                            <div><span class="cc_icon unSend_cc_icon"><icon-font type="iconyumengtubiao_jiaosequanxian" /></span><span class="start_cc_title">抄送人</span></div>
                            <div style="margin-left: 24px;"><span class="start_cc_total">抄送{{node.auditAllPassNode.ccInfo.ccPeopleList.length}}人</span></div>
                            <div style="margin-left: 24px;" class="clearfix"><div v-for="(item) in node.auditAllPassNode.ccInfo.ccPeopleList" class="start_cc_name unSend f-fl normal">{{item.name}}</div></div>
                        </div>
                        <div class="start_cc" v-if="node.type==3&&node.auditOneOfPassNode&&node.auditOneOfPassNode.ccInfo&&node.auditOneOfPassNode.ccInfo.ccPeopleList.length>0">
                            <div><span class="cc_icon unSend_cc_icon"><icon-font type="iconyumengtubiao_jiaosequanxian" /></span><span class="start_cc_title">抄送人</span></div>
                            <div style="margin-left: 24px;"><span class="start_cc_total">抄送{{node.auditOneOfPassNode.ccInfo.ccPeopleList.length}}人</span></div>
                            <div style="margin-left: 24px;" class="clearfix"><div v-for="(item) in node.auditOneOfPassNode.ccInfo.ccPeopleList" class="start_cc_name unSend f-fl normal">{{item.name}}</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-modal centered :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
export default {
    name: "bizWorkflowDetail",
    components: {
    },
    props: {
        nodeList: {
            type: Array,
        },
    },
    data() {
        return {
            previewVisible: false,
            previewImage: '',
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {
        previewPdf(url){
            window.open(url)
        },
        previewOfficeFile(url){
            window.open('https://view.officeapps.live.com/op/view.aspx?src=' + url);
        },
        handlePreview(file) {
            this.previewImage = file.url || file.origin;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
    },
    filters: {
    }
}
</script>

<style scoped lang="less">
    .biz-workflow-detail{
        height: 100%;
        overflow: auto;
        .content-follow{
            display: flex;
            justify-content: flex-start;
            .content-follow-node{
                width: 160px;
                padding-right: 25px;
                font-size: 14px;
                min-height: 60px;
                .node-start{
                    color: #111111;
                }
                .node-approval{
                    color: #FFA036;
                }
                .node-pass{
                    color: #0A87F8;
                }
                .node-reject{
                    color: #FB4246;
                }
                .node-withdraw{
                    color: #777777;
                }
                .node-start-time{
                    color: #777777;
                }
            }
            .content-follow-left{
                width: 32px;
                .content-follow-left-line{
                    margin: 0 0 0 12px;
                    height: calc(100% - 24px);
                }
                .compeleteType{
                    border-left: 1px dashed #AED4F5;
                }
                .unCompeleteType{
                    border-left: 1px dashed #EEEEEE;
                }
                svg{
                    width: 16px;
                    height: 16px;
                }
                i{
                    vertical-align: -0.25em;
                }
            }
            .content-follow-right{
                margin-left: 10px;
                margin-bottom: 19px;
                width: 100%;
                .follow-right-line-one{
                    .name{
                        font-size: 14px;
                        color: #333333;
                        font-weight:500;
                    }
                    .date{
                        color: #777;
                        font-size: 12px;
                        line-height: 21px;
                    }
                    .auditResult{
                        line-height: 21px;
                        font-size: 12px;
                    }
                    .pass{
                        color: #0A87F8;
                    }
                    .reject{
                        color: #FB4246 ;
                    }
                    .passReject{
                        margin-left: 5px;
                    }
                }
                .follow-right-line-two{
                    margin-top: 3px;
                    color: #999999;
                    font-size: 14px;
                }
                .second-content{
                    background:rgba(255,255,255,1);
                    padding: 12px 10px;
                    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.04);
                    border-radius:4px;
                    border:1px solid rgba(238,238,238,1);
                    margin: 6px 0 0 0;
                    .second-content-follow{
                        display: flex;
                        justify-content: flex-start;
                        .second-content-follow-status{
                            width: 140px;
                            padding-right: 10px;
                            font-size: 12px;
                            .pass{
                                color: #0A87F8;
                            }
                            .reject{
                                color: #FB4246 ;
                            }
                            .date{
                                color: #999999;
                            }
                        }
                        .second-content-follow-left{
                            width: 18px;
                            .second-content-radius{
                                display: inline-block;
                                margin-right: 10px;
                                width: 18px;
                                height: 18px;
                                line-height: 18px;
                                color: #0A87F8;
                                text-align: center;
                                background-color: rgba(10, 135, 248, 0.1);
                                border-radius: 50%;
                            }
                            .second-content-follow-left-line{
                                margin: -1px 0 0 9px;
                                height: calc(100% - 18px);
                            }
                            .compeleteType{
                                border-left: 1px dashed #AED4F5;
                            }
                            .unCompeleteType{
                                border-left: 1px dashed #EEEEEE;
                            }
                            svg{
                                width: 10px;
                                height: 10px;
                            }
                            i{
                                vertical-align: 0;
                            }
                        }
                        .second-content-follow-right {
                            margin-left: 10px;
                            margin-bottom: 19px;
                            width: 100%;
                            .name{
                                font-size: 12px;
                                color: #333333;
                                font-weight:500;
                            }
                            .date{
                                color: #777;
                                font-size: 12px;
                            }
                            .auditResult{
                                font-size: 12px;
                            }
                            .pass{
                                color: #0A87F8;
                            }
                            .reject{
                                color: #FB4246 ;
                            }
                            .passing{
                                color: #FFA036;
                            }
                            .passReject{
                                margin-left: 5px;
                            }
                            .second-follow-right-line-two{
                                margin-top: 5px;
                                color: #999999;
                                font-size: 12px;
                            }
                        }
                    }
                }
                .start_cc{
                    margin-top: 5px;
                    background:rgba(252,254,255,1);
                    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.04);
                    border-radius:4px;
                    border:1px solid rgba(238,238,238,1);
                    padding: 12px 10px;
                    .cc_icon{
                        display: inline-block;
                        margin-right: 6px;
                        width: 18px;
                        height: 18px;
                        line-height: 18px;
                        font-size: 12px;
                        text-align: center;
                        border-radius: 50%;
                    }
                    .start_cc_icon{
                        color: #0A87F8;
                        background-color: rgba(10,135,248,0.1);
                    }
                    .unSend_cc_icon{
                        color: #BBBBBB;
                        background-color: rgba(187,187,187,0.2);
                    }
                    .start_cc_title{
                        font-size:12px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:#333333;
                    }
                    .start_cc_total{
                        color: #777777;
                        font-size: 12px;
                    }
                    .start_cc_readed{
                        margin-left: 10px;
                        font-size: 12px;
                        color: #0A87F8;
                    }
                }
                .start_cc_name{
                    margin: 0 auto;
                    border-radius:2px;
                    font-size: 12px;
                    padding: 3px 5px ;
                    margin: 5px 5px 0 0;
                }
                .send{
                    background:#F0F8FF;
                }
                .unSend{
                    background: #F4F4F4;
                    color: #777777;
                }
                .read{
                    color: #333333;
                }
                .normal{
                    color: #777777;
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
                .annexList {
                    margin-top: 10px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    .annexList-img {
                        width: 86px;
                        margin-right: 7px;
                        margin-bottom: 6px;
                        .annex-box {
                            > div {
                                width: 100%;
                                height: 25px;
                                line-height: 25px;
                                text-align: center;
                            }
                            img{
                                width:84px;
                                height:54px;
                                border-radius:5px;
                                border:1px solid rgba(238,238,238,1);
                            }
                            .fontStyle{
                                color: #BBBBBB;
                                font-weight: 300;
                                font-size: 12px;
                            }
                        }
                    }
                    .annexList-img-little{
                        width: 74px;
                        margin-right: 7px;
                        margin-bottom: 6px;
                        .annex-box {
                            > div {
                                width: 100%;
                                height: 18px;
                                line-height: 18px;
                                text-align: center;
                            }
                            img{
                                width:72px;
                                height:46px;
                                border-radius:5px;
                                border:1px solid rgba(238,238,238,1);
                            }
                            .fontStyle{
                                color: #BBBBBB;
                                font-weight: 300;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
        .radius-font {
            display: inline-block;
            margin-right: 10px;
            width: 24px;
            height: 24px;
            line-height: 24px ;
            font-size: 12px;
            color: #FFA036;
            background-color: fade(#FFA036, 10%);
            border-radius: 50%;
            .inner-radius-font{
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin:6px 0 0 6px;
            }
            .aduiting{
                background-color:#0A87F8;
            }
            .unAduiting{
                background-color: #BBBBBB
            }
        }
    }
</style>
