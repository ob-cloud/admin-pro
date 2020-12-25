<template>
    <!-- 添加/修改电子合同模板 -->
    <a-modal :title="title" centered  v-model="visible" class="ownModalBorder titDialog" width="1200px" :footer="null" :destroyOnClose="true" :maskClosable="false">
        <div id="addTemple" class="add-temple">
            <div class="left">
                <div class="left-content">
                    <div class="left-content-head">
                        <span style="color: #111111;"><b>合同参数信息</b></span>
                    </div>
                    <div class="left-content-info">
                        <span style="color: #FFA036;">
                            参数复制至模板上，即可根据线上签约时所填写的信息自动生成合同信息并补充
                        </span>
                    </div>
                    <div class="left-content-search">
                        <a-input-search v-model="lSearch" placeholder="输入合同配置字段信息回车搜索" class="searchButton" @search="onSearch"/>
                    </div>
                    <div class="left-content-result">
                        <div class="itemConfig" v-for="(item,index) in templateParamList" :key="index">
                            <span class="itemName">{{item.keyDesc }}</span>
                            <span class="copyConfig" @click="_copy(item.keyDesc)">复制</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="ckeditor-document">
                    <div class="right-ckeditor-document">
                        <jodit-editor :reloadText="reloadText" @afterPaste="afterPaste" @getValue="getValue"/>
                    </div>
                </div>
                <div class="right-button-col clearfix">
                    <div class="right-button-blank">
                    </div>
                    <div class="right-button-save" @click="confirmAddTemplate">
                        <a-button type="primary" class="button-save">
                            确认
                        </a-button>
                    </div>
                    <div class="right-button-cancel">
                        <a-button class="button-cancel" type="submit" @click="cancel">
                            <span style="color: #666666">取消</span>
                        </a-button>
                    </div>
                    <div class="right-pre clearfix" @click="preview">
                        <div class="right-pre-icon"><icon-font type="iconyumengtubiao_yanjing-1"></icon-font></div>
                        <span class="right-pre-font">预览模板</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <a-modal title="模板预览" centered  v-model="showPreview" class="ownModalBorder titDialog" width="1000px" :footer="null" :destroyOnClose="true">
                <template-detail :templateTxt="appendEditorTxt"></template-detail>
            </a-modal>
            <a-modal title="保存模板" centered v-model="confirmVisible" class="ownModalBorder titDialog" :footer="null" :destroyOnClose="true">
                <confirm-add-template @cancelSave="cancelSave" @closeCurrent="closeCurrent" :parameter="parameter" :type="type"></confirm-add-template>
            </a-modal>
        </div>
    </a-modal>
</template>

<script>
    import 'jodit/build/jodit.min.css';
    import templateDetail from './templateDetail';
    import confirmAddTemplate from './confirmAddTemplate';
    //import { JoditEditor } from 'jodit-vue';
    import JoditEditor from '@/components/jodit';
    import {
        econtTemplateParamList,
        econtTemplateGet,
    } from '@/api/contractTemple';

    export default {
        name: "addTemple",
        components: {
            templateDetail,
            confirmAddTemplate,
            JoditEditor,
        },
        data(){
            return {
                title:"添加模板",           //标题名称
                visible:false,               //当前组件是否可见
                showPreview:false,           //预览组件是否可见
                templateParamList:[],        //参数集合
                configList: [],
                lSearch:"",                  //搜索内容
                theEditor:null,              //获取富文本编辑内容
                reloadText: '',              //获取内容，用于回显
                appendEditorTxt:'',         //加尾富文本内容
                ruleForm: {
                    name: '',
                    type: '1',
                    jiaDesc: '',
                    yiDesc: ''
                },    //追加模板
                id:"",                      //id，存在->修改；不存在->新增
                parameter:{},               //传递给确认添加的值
                confirmVisible:false,       //"确认-填写模板名称及选择部门页面"是否显示
                type:1,                     //当前编辑 类型：1、新增；2修改
                initData:'<p style="text-align:center;"><span style="font-size:20px;"><strong>房屋租赁合同</strong></span></p><p style="text-align:right;"><span style="font-size:12px;">NO:${合同编号}</span></p><p style="text-align:justify;">出租方（甲方）：</p><p style="text-align:justify;">承租方（乙方）：${租客姓名}</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">根据国家有关法律、法规和本市有关规定，甲、乙双方在自愿、平等、互利的基础上，经协商一致，就甲方提供房屋给乙方租赁使用事宜，订立本合同。</p><p style="text-align:justify;">&nbsp;</p><p>温馨提示：</p><p>请您确认，在签署合同前，您已仔细阅读过本合同条款并予以理解和接受，请务必仔细阅读。</p><p>&nbsp;</p><p><span style="font-size:16px;"><strong>第一条 &nbsp;房屋信息</strong></span></p><p>房源位于 ${房屋地址} ；户型是${房屋户型}；租赁用途：居住。</p><p>&nbsp;</p><p><span style="font-size:16px;"><strong>第二条 &nbsp;合同信息</strong></span></p><p>租赁期限周期 &nbsp; &nbsp; &nbsp; ：${合约起始日期} &nbsp;- &nbsp;${合约结束日期} &nbsp;</p><p>租赁期限 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;：${合约周期时长} &nbsp;</p><p>租金付款方式 &nbsp; &nbsp; &nbsp; ：${租客付款方式}</p><p>押金金额 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;：${房租押金(小写)} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;大写：${房租押金(大写)} &nbsp; &nbsp; &nbsp; &nbsp;</p><p>押金总额 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;：${押金总额(小写)} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;大写：${押金总额(大写)} &nbsp; &nbsp; &nbsp; &nbsp;</p><p>每月租金金额 &nbsp; &nbsp; &nbsp; ：${房屋月租金(小写)} &nbsp; &nbsp; &nbsp; &nbsp;大写：${房屋月租金(大写)}</p><p>房租总额 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;：${房租总额(小写)} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;大写：${房租总额(大写)}</p><p>签约管家 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;：${签约人姓名(管家)}</p><p>签约管家联系方式：${签约人电话(管家)}</p><p>签约日期 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;：${合约签订日期}</p><p>合同补充说明 &nbsp; &nbsp; &nbsp; ：${补充说明}</p><p>&nbsp;</p><p><strong>租客身份信息</strong></p><p>姓名 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;：${租客姓名}</p><p>性别 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;：${租客性别}</p><p>联系电话 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ：${租客手机号}</p><p>证件类型 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ：${租客证件类型}</p><p>证件号码 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ：${租客证件号码}</p><p>证件照片 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ：${租客证件照(图片)}</p><p>&nbsp;</p><p><strong>紧急联系人信息</strong></p><p>紧急联系人姓名 &nbsp;：${租客紧急联系人姓名}</p><p>紧急联系人电话 &nbsp;：${租客紧急联系电话}</p><p>&nbsp;</p><p><strong>同住人信息</strong></p><p>同住人信息 &nbsp; &nbsp; &nbsp; &nbsp; ：${租客同住人列表}</p><p>&nbsp;</p><p>租赁期满，甲方有权收回全部房屋，乙方应如期或提前交还；乙方若要求继续提供或提前终止租赁的，须在本合同期满前一个月向甲方提出书面申请，经双方洽商并同意新的住宿条件后重新签订房屋租赁合同。</p><p>&nbsp;</p><p><span style="font-size:16px;"><strong>第三条 &nbsp;租金费用</strong></span></p><p>签订本合同时，甲方收取乙方押金 &nbsp;${房租押金(小写)} &nbsp; 元；租金 &nbsp; ${房屋月租金(小写)} &nbsp; 元（ &nbsp;大写 ${房屋月租金(大写)} &nbsp; ），按照 &nbsp;${租客付款方式} &nbsp;的方式付款，每次付款前需提前 &nbsp;${租客付款日期规则} &nbsp;付款；甲、乙双方约定，乙方逾期支付房屋租金周期账单的，每逾期一日，需承担应付房屋租金账单总额 &nbsp;${滞纳金比例} &nbsp;的滞纳金，滞纳金明细详见系统，系统与本协议约定不一致的，以系统账户显示的为准。</p><p>${账单明细} &nbsp;</p><p>&nbsp;</p><p><span style="font-size:16px;"><strong>第四条 &nbsp;其他相关费用</strong></span></p><p>(一) 租赁期限内所产生的的下列费用 (1) (2) (3) (5) 由乙方承担：</p><p>(1) 水费 (2) 电费 (3) 燃气费 (4) 电话费 (5) 宽带费 (6) 有线电视使用费 (7) 供暖费 (8) 物业管理费 (9) 卫生费。</p><p>(二) 除上述约定的情形外，本合同未列明的与租赁房屋有关的费用，均由乙方承担。如甲方垫付了应由乙方支付的费用，甲方有权根据相关缴费凭据要求乙方予以返还。</p><p>&nbsp;</p><p><span style="font-size:16px;"><strong>第五条 &nbsp;房屋维护和维修</strong></span></p><p>(一) 甲方应保证租赁房屋的建筑结构和设备设施符合建筑、消防、治安、卫生等方面的安全条件，不得危及人身安全；房屋租赁期间，乙方应遵守国家法律法规、市区级管理规定及该房屋</p><p>所在的小区的物业管理规定，乙方严禁在房屋内摆放易燃、易爆、剧毒等危险违禁物品，或持有法律、法规禁止的各类物品。</p><p>(二) 承租期限内，甲方承担房屋及附属物品、设备设施因老化产生的维护、维修事宜（不含乙方自带物品、设备设施），甲方有权根据房屋及附属物品、设施设备的实际情况设定维修方案，</p><p>具体方案以甲方实际维修共同出具的房屋维修、鉴定方案为准）；乙方承担房屋及附属品、设备实施因使用不当造成的维护、维修事宜，如维护项目不在前述范围之内，应依据谁导致谁承</p><p>担的原则，由甲乙双方另行协商解决。</p><p>(三) 租赁期间内，甲乙双方应共同保障租赁房屋及其附属品、设备设施处于使用和安全的状态。乙方应维护租赁房屋既有设备和设施的正常使用，如需调整的，应事先征得甲方的书面同意，</p><p>因乙方保管不当或不合理使用（包括但不仅限于水路、电器和天燃气），致使该房屋及附属物品、设备设施发生损坏、故障、丢失或造成重大人身事故的（包括公共区域内的设备设施），</p><p>乙方应负责维修、承担维修费用或承担事故责任（维修范围内无法界定的公共设施维修责任由公共设施的全体承租的人共同承担），甲方有权从押金中扣除前述相关费用，不足部分由乙方</p><p>承担赔偿责任。</p><p>(四) 租赁期间，甲方对租赁房屋进行维护、维修时，乙方须予以配合。如因乙方怠于或拒绝配合，导致甲方无法及时维护、维修的，由此产生的一切损失（包括但不限于租金损失、违约责任以及由此给甲方造成的其他损失等）均由乙方承担。</p><p>&nbsp;</p><p><span style="font-size:16px;"><strong>第六条 &nbsp;合同解除</strong></span></p><p>（一）因不可抗力、政府行为（如政府部门要求调整房屋现有居住间数）等原因导致本合同无法继续履行的，本合同自行解除，双方均不承担任何违约责任。</p><p>（二）乙方有以下行为的，甲方有权单方面解除合同（判定标准包括但不限于客户投诉或物业投诉等），并扣除全部押金，且乙方应将租赁房屋恢复原状交还甲方。</p><p>（1）居住人数超过约定人数或年龄的，在房屋内饲养宠物的；</p><p>（2）延期支付房租达七日的；通知缴纳水电燃气等费用后七日内不交缴纳的；</p><p>（3）损毁房屋物品拒不赔偿的；</p><p>（4）屋内堆放危险品或利用房屋从事经营活动或违法活动的；擅自改变房屋用途、损害房屋主体结构的；</p><p>（5）隐瞒、漏报、谎报传染性疾病或隐性疾病的；拒绝依法在当地居委会、派出所做登记备案的。</p><p>（6）利用租赁房屋从事违法活动的、损害公共利益的</p><p>&nbsp;</p><p><span style="font-size:16px;"><strong>第七条 &nbsp;其他权利义务</strong></span></p><p>（一）乙方知晓甲方为该房屋出租方的全权委托代理人，甲方有权不定期对房屋进行检验、保洁和维修。</p><p>（二）甲方已告知乙方房屋安全使用规范，由乙方不合理使用租赁房屋或附属设施或者私拉电线或者使用大功率电器，设备导致自身损害或致第三方受损的，产生的一切责任由乙方自行承</p><p>担。若致第三方受损，第三方要求甲方承担责任，甲方由此产生损失的，甲方可向乙方追偿，并可直接先从押金中扣除，如押金不足以赔偿，乙方须补足。</p><p>（三）本合同经双方签字盖章后生效，一式两份，甲乙双方各执一份。本合同发生争议，由双方协商解决，协商不成的可提交甲方所在地人民法院解决。双方对合同内容的变更应采取书面</p><p>形式，作为本合同的附件。</p>',
                joditConfig:{
                    "showXPathInStatusbar": false,
                    "askBeforePasteFromWord": false,
                    "askBeforePasteHTML": false,
                    "uploader": {
                        "insertImageAsBase64URI": true
                    },
                    "language": "zh_cn",
                },
                joditButtons:['source','bold','strikethrough','underline','italic','eraser','|','superscript','subscript','|',
                    'ul','ol','|','outdent','indent','|','fontsize','brush','paragraph','|','image',
                    'table','link','|','align','|','symbol','hr','fullsize','print'],
            }
        },
        created(){
        },
        mounted() {
        },
        methods: {
            getValue(new_value){
                let temp = '';
                temp = new_value.replace(/<\/?font[^>]*>/gi,"").replace(/font-family\s*:\s*[^;]*;?/g,'');
                this.reloadText = temp;
            },
            //清理格式
            afterPaste(){
                let temp = '';
                temp = this.reloadText.replace(/<\/?font[^>]*>/gi,"").replace(/font-family\s*:\s*[^;]*;?/g,'');
                this.reloadText = temp;
            },
            //参数搜索
            onSearch() {
                this.templateParamList = [];
                if (this.lSearch) {
                    this.configList.forEach((value) => {
                        if (value.keyDesc.indexOf(this.lSearch) != -1) {
                            this.templateParamList.push(value);
                        }
                    });
                }
            },
            //来自父组件的添加
            getMsgFromAdd(){
                this.visible = true;
                this.econtTemplateParamList();
                this.ruleForm.jiaDesc = '出租方（甲方）：';
                this.ruleForm.yiDesc = '承租方（乙方）：';
                this.title = '添加模板';
                this.reloadText = this.initData;
                this.id = "";
                this.type = 1;
                this.confirmVisible = false;
                this.parameter = {};
            },
            //来自父组件的修改
            getMsgFromEdit(id){
                this.visible = true;
                this.econtTemplateParamList();
                this.ruleForm.jiaDesc = '出租方（甲方）：';
                this.ruleForm.yiDesc = '承租方（乙方）：';
                this.title = '修改模板';
                this.id = id;
                this.type = 2;
                this.confirmVisible = false;
                //获取
                let parameter = {};
                parameter.id = id;
                econtTemplateGet(parameter).then(res => {
                    this.parameter = res.data;
                    this.reloadText = res.data.content;
                });
            },
            //来自父组件的赋值
            getMsgFromCopy(text){
                this.visible = true;
                this.econtTemplateParamList();
                this.ruleForm.jiaDesc = '出租方（甲方）：';
                this.ruleForm.yiDesc = '承租方（乙方）：';
                this.title = '添加模板';
                this.reloadText = text;
                this.id = "";
                this.type = 1;
            },
            //来自子组件添加
            closeCurrent(){
                this.visible = false;
                this.$parent.econtTemplateList();
            },
            cancelSave(){
                this.confirmVisible = false;
            },
            getEditor() {
                let appendTempStr =
                    '<br/><br/>' +
                    '<p>'+this.ruleForm.jiaDesc +'</p>'+
                    '<br/><br/>' +
                    '<p>'+this.ruleForm.yiDesc +'</p>'+
                    '<br/><br/>';
                let tempReloadText = '';
                tempReloadText = this.reloadText.replace(/<\/?font[^>]*>/gi,"").replace(/font-family\s*:\s*[^;]*;?/g,'');
                this.reloadText = tempReloadText;
                this.appendEditorTxt = this.reloadText + appendTempStr;
            },
            _copy(txt) {
                var oInput = document.createElement('input');
                oInput.value = '${' + txt + '}';
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand('Copy'); // 执行浏览器复制命令
                oInput.className = 'oInput';
                oInput.style.display = 'none';
                this.$message.info('复制成功');
            },
            //页面事件操作
            //取消
            cancel(){
                this.visible = false;
            },
            //预览
            preview() {
                this.getEditor();
                this.showPreview = true;
            },
            //保存
            confirmAddTemplate(){
                this.getEditor();
                let parameter = {};
                //用于传递修改数据
                parameter = this.parameter;
                parameter.content = this.reloadText;
                parameter.fullContent = this.appendEditorTxt;
                parameter.partyAFlag = this.ruleForm.jiaDesc;
                parameter.partyBFlag = this.ruleForm.yiDesc;
                this.parameter = parameter;
                this.confirmVisible = true;
            },
            //*************基础操作**************//addKey(arr) {
            addKey(arr) {
                //table数据增加key属性值
                if (arr.length > 0) {
                    arr.forEach((item) => { //利用foreach循环遍历
                        item.key = item.id;
                    });
                }
            },
            //***************与api相关**************//
            econtTemplateParamList(){
                let parameter = 1;
                econtTemplateParamList(parameter).then(res => {
                    this.addKey(res.data);
                    this.templateParamList = res.data;
                    this.configList = res.data;
                });
            },
        },
        watch: {
            lSearch(newVal) {
                if (!newVal) {
                    this.templateParamList = this.configList;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .add-temple {
        padding: 20px;
        height: calc(100vh - 120px);
        width: 1200px;
        .left {
            width: 300px;
            height: 100%;
            background-color: #F7F8FB;
            border: #EEEEEE solid 1px;
            .left-content{
                height: 100%;
                .left-content-head{
                    margin-left: 15px;
                    height: 40px;
                    line-height: 40px;
                    font-size:16px
                }
                .left-content-info{
                    margin-left: 15px;
                    margin-bottom: 15px;
                    width: 270px;
                    height: 45px;
                    font-size:12px
                }
                .left-content-search{
                    margin: 10px;
                    height: 32px;
                    .searchButton{
                        border-radius: 5px;
                    }
                }
                .left-content-result{
                    height: calc(100% - 141px);
                    overflow: auto;
                    .itemConfig{
                        height: 40px;
                        line-height: 40px;
                        border-bottom: #EEEEEE solid 0.5px;
                        margin: 0px 15px 0px 15px;
                        .itemName{
                            font-size: 14px;
                        }
                        .copyConfig {
                            float: right;
                            cursor: pointer;
                            color: @themeColor;
                        }
                    }
                }
            }
            float: left;
        }
        .right {
            width: 860px;
            height: 100%;
            float: left;
            border: #EEEEEE solid 1px;
            .ckeditor-document{
                height: calc(100% - 60px);
                .right-ckeditor-document {
                    display: flex;
                    height: 100%;
                    & /deep/ .jodit_container {
                        flex-grow: 2;
                        height: 100%;
                    }
                    & /deep/ .jodit_container .jodit_workplace{
                        height: calc(100% - 94px) !important;
                        overflow: auto;
                    }
                    & /deep/ .ck.ck-toolbar>* {
                        margin-right: 0px;
                    }
                    & /deep/ .ck.ck-dropdown.ck-heading-dropdown{
                        width: 130px;
                    }
                }
            }
            .right-button-col{
                height: 60px;
                line-height: 60px;
                .right-button-blank {
                    float: left;
                }
                .right-pre{
                    float: right;
                    .right-pre-icon{
                        float: left;
                        color: @themeColor;
                    }
                    .right-pre-font{
                        float: left;
                        margin-left: 2px;
                        color: @themeColor;
                    }
                }
                .right-button-cancel{
                    margin-left: 20px;
                    float: right;
                    .button-cancel{
                        width: 120px;
                        height: 40px;
                        color: #666666;
                        border-radius: 5px;
                    }
                }
                .right-button-save {
                    margin-left: 20px;
                    float: right;
                    .button-save {
                        width: 120px;
                        height: 40px;
                        background-color: @themeColor;
                        color: #FFFFFF;
                        border-radius: 5px;
                    }
                }
            }
        }
        /deep/ p {
            display: block;
            -webkit-margin-before: 1em;
            -webkit-margin-after: 1em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
        }
        /deep/ h2 {
            display: block;
            font-size: 1.5em;
            -webkit-margin-before: 0.83em;
            -webkit-margin-after: 0.83em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            font-weight: bold;
        }
        /deep/ h3 {
            display: block;
            font-size: 1.17em;
            -webkit-margin-before: 1em;
            -webkit-margin-after: 1em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            font-weight: bold;
        }
        /deep/ h4 {
            display: block;
            -webkit-margin-before: 1.33em;
            -webkit-margin-after: 1.33em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            font-weight: bold;
        }
    }
</style>
