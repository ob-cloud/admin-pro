<template>
    <div class="resource-decision-box">
        <div class="source">
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">私客不跟进自动转入公客池</div>
            </div>
            <div class="describe">
                开启后私客在※天内不跟进，自动转入公客池；自己录入的私客不跟进也会自动转入公客池
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="resource1.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl allCheck clearfix cursor" v-if="resource1.onOff==0" @click="changeResrource(resource1,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl inputStyleDiv" v-if="resource1.onOff"><a-input class="inputStyle" placeholder="请输入" v-model="resource1.value" v-validate="'naturalNum|min(1)'"></a-input>   天<span class="mustFill">*</span></div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="resource1.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="resource1.onOff==1" @click="changeResrource(resource1,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource1)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">私客自动转入公客池，是否发送通知消息</div>
            </div>
            <div class="describe">
                租客*天不跟进，自动转入公客池后，消息通知到资源负责人
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="resource2.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">通知</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="resource2.onOff==0" @click="changeResrource(resource2,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">通知</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="resource2.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不通知</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="resource2.onOff==1" @click="changeResrource(resource2,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不通知</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource2)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">限制个人最多可以从公客池转入自己私客池的数量</div>
            </div>
            <div class="describe">
                默认为不限制，限制后每个人从公客池转入的线索资源不可超过设置的数量；如已转入的资源有些状态变更为“关闭”，则可继续转入
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="resource3.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">限制</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="resource3.onOff==0" @click="changeResrource(resource3,1)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">限制</div>
                    </div>
                    <div class="f-fl inputStyleDiv" v-if="resource3.onOff"><a-input class="inputStyle" placeholder="请输入" v-model="resource3.value" v-validate="'naturalNum|min(1)'"></a-input>   个<span class="mustFill">*</span></div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="resource3.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不限制</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="resource3.onOff==1" @click="changeResrource(resource3,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不限制</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource3)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">公客联系方式展示</div>
            </div>
            <div class="describe">
                公客显示资源的手机号和其它联系方式是否隐藏部分；做隐藏处理后，资源的联系方式只可查看部分。「例：手机号 155****8888，微信/QQ/其它联系方式34******」
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="resource4.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">显示</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&resource4.onOff==0" @click="changeResrource(resource4,1)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">显示</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&resource4.onOff==0">
                        <div class="f-fl " ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">显示</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="resource4.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">隐藏</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&resource4.onOff==1" @click="changeResrource(resource4,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">隐藏</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&resource4.onOff==1">
                        <div class="f-fl " ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">隐藏</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource4,true)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">指派租客线索给管家时，短时间内指派线索数量超过 * 个，给予提醒</div>
            </div>
            <div class="describe">
                开启提醒并设置规定时间及线索数量后，在指派线索给出房管家时，超过设置的限制就提醒
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="resource9.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启提醒</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="resource9.onOff==0" @click="changeResrource(resource9,1)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启提醒</div>
                    </div>
                    <div class="f-fl inputStyleDiv" v-if="resource9.onOff==1">(<a-input class="inputStyle specialInputStyle" placeholder="请输入" v-model="resource9.value.limitTime" v-validate="'naturalNum|min(1)'"></a-input>分钟内数量超过<a-input class="inputStyle specialInputStyle" placeholder="请输入" v-model="resource9.value.number" v-validate="'naturalNum|min(1)'"></a-input>个)<span class="mustFill">*</span></div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="resource9.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭提醒</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="resource9.onOff==1" @click="changeResrource(resource9,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭提醒</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource9)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
              <div class="blueStyle f-fl"></div>
              <div class="titleFont f-fl">指派租客线索后，管家规定时间内未跟进，给予指派人消息提醒</div>
            </div>
            <div class="describe">
              开启提醒并设置规定时间后，在指派线索给出房管家后，管家未在规定的时间内跟进，自动给予指派人消息提醒
            </div>
            <div class="checkBox clearfix">
              <div class="f-fl clearfix">
                <div class="f-fl allCheck checked" v-if="resource11.onOff==1">
                  <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">开启提醒</div>
                </div>
                <div class="f-fl allCheck clearfix cursor" v-if="resource11.onOff==0" @click="changeResrource(resource11,1);resource11.value=10;">
                  <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">开启提醒</div>
                </div>
                <div class="f-fl inputStyleDiv selectStyleDiv" v-if="resource11.onOff==1">
                  (
                  <a-select class="inputStyle specialInputStyle" placeholder="请输入" v-model="resource11.value">
                    <a-select-option :value="5">5</a-select-option>
                    <a-select-option :value="10">10</a-select-option>
                    <a-select-option :value="15">15</a-select-option>
                    <a-select-option :value="30">30</a-select-option>
                    <a-select-option :value="60">60</a-select-option>
                    <a-select-option :value="120">120</a-select-option>
                  </a-select>
                  分钟内不跟进，给指派人消息提醒）
                  <span class="mustFill">*</span>
                </div>
              </div>
              <div class="f-fl margin50">
                <div class="allCheck checked clearfix" v-if="resource11.onOff==0">
                  <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">关闭</div>
                </div>
                <div class="allCheck clearfix cursor" v-if="resource11.onOff==1" @click="changeResrource(resource11,0)">
                  <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">关闭</div>
                </div>
              </div>
            </div>
            <div class="saveButton">
              <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource11)">
                保存
              </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
              <div class="blueStyle f-fl"></div>
              <div class="titleFont f-fl">指派业主线索后，管家规定时间内未跟进，给予指派人消息提醒</div>
            </div>
            <div class="describe">
              开启提醒并设置规定时间后，在指派线索给收房管家后，管家未在规定的时间内跟进，自动给予指派人消息提醒
            </div>
            <div class="checkBox clearfix">
              <div class="f-fl clearfix">
                <div class="f-fl allCheck checked" v-if="resource12.onOff==1">
                  <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">开启提醒</div>
                </div>
                <div class="f-fl allCheck clearfix cursor" v-if="resource12.onOff==0" @click="changeResrource(resource12,1);resource12.value=10;">
                  <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">开启提醒</div>
                </div>
                <div class="f-fl inputStyleDiv selectStyleDiv" v-if="resource12.onOff==1">
                  (
                  <a-select class="inputStyle specialInputStyle" placeholder="请输入" v-model="resource12.value">
                    <a-select-option :value="5">5</a-select-option>
                    <a-select-option :value="10">10</a-select-option>
                    <a-select-option :value="15">15</a-select-option>
                    <a-select-option :value="30">30</a-select-option>
                    <a-select-option :value="60">60</a-select-option>
                    <a-select-option :value="120">120</a-select-option>
                  </a-select>
                  分钟内不跟进，给指派人消息提醒）
                  <span class="mustFill">*</span>
                </div>
              </div>
              <div class="f-fl margin50">
                <div class="allCheck checked clearfix" v-if="resource12.onOff==0">
                  <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">关闭</div>
                </div>
                <div class="allCheck clearfix cursor" v-if="resource12.onOff==1" @click="changeResrource(resource12,0)">
                  <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">关闭</div>
                </div>
              </div>
            </div>
            <div class="saveButton">
              <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource12)">
                保存
              </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">私盘线索不跟进自动转入公盘</div>
            </div>
            <div class="describe">
                开启后，私盘中的业主线索在※天内不跟进，自动转至公盘；自己录入的业主线索不跟进也会自动转至公盘
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="resource5.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl allCheck clearfix cursor" v-if="resource5.onOff==0" @click="changeResrource(resource5,1)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl inputStyleDiv" v-if="resource5.onOff"><a-input class="inputStyle" placeholder="请输入" v-model="resource5.value" v-validate="'naturalNum|min(1)'"></a-input>   天<span class="mustFill">*</span></div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="resource5.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="resource5.onOff==1" @click="changeResrource(resource5,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource5)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">私盘线索自动转至公盘，是否发送通知消息</div>
            </div>
            <div class="describe">
                业主资源*天不跟进，自动转至公盘时，给该资源负责人发送通知消息
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="resource6.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">通知</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="resource6.onOff==0" @click="changeResrource(resource6,1)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">通知</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="resource6.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不通知</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="resource6.onOff==1" @click="changeResrource(resource6,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不通知</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource6)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">限制个人最多可以从公盘转入业主资源到自己私盘的数量</div>
            </div>
            <div class="describe">
                默认为不限制，限制后每个人从公盘转入的线索资源不可超过设置的数量；如已转入的资源有些状态变更为“关闭”，则可继续转入
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="resource7.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">限制</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="resource7.onOff==0" @click="changeResrource(resource7,1)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">限制</div>
                    </div>
                    <div class="f-fl inputStyleDiv" v-if="resource7.onOff"><a-input class="inputStyle" v-model="resource7.value" v-validate="'naturalNum|min(1)'"></a-input>   个<span class="mustFill">*</span></div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="resource7.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不限制</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="resource7.onOff==1" @click="changeResrource(resource7,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不限制</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource7)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">公盘联系方式展示</div>
            </div>
            <div class="describe">
                公盘业主资源的手机号和其它联系方式是否隐藏部分；做隐藏处理后，资源的联系方式只可查看部分。「例：手机号 155****8888，微信/QQ/其它联系方式34******」
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="resource8.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">显示</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&resource8.onOff==0" @click="changeResrource(resource8,1)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">显示</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&resource8.onOff==0">
                        <div class="f-fl " ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">显示</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="resource8.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">隐藏</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&resource8.onOff==1" @click="changeResrource(resource8,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">隐藏</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&resource8.onOff==1">
                        <div class="f-fl " ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">隐藏</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource8,true)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">指派业主线索给管家时，短时间内指派线索数量超过 * 个，给予提醒</div>
            </div>
            <div class="describe">
                开启提醒并设置规定时间及线索数量后，在指派线索给收房管家时，超过设置的限制就提醒
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="resource10.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启提醒</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="resource10.onOff==0" @click="changeResrource(resource10,1)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启提醒</div>
                    </div>
                    <div class="f-fl inputStyleDiv" v-if="resource10.onOff">(<a-input class="inputStyle specialInputStyle" placeholder="请输入" v-model="resource10.value.limitTime" v-validate="'naturalNum|min(1)'"></a-input>分钟内数量超过<a-input class="inputStyle specialInputStyle" placeholder="请输入" v-model="resource10.value.number" v-validate="'naturalNum|min(1)'"></a-input>个)<span class="mustFill">*</span></div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="resource10.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭提醒</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="resource10.onOff==1" @click="changeResrource(resource10,0)">
                        <div class="f-fl " ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭提醒</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(resource10)">
                    保存
                </a-button>
            </div>
        </div>
        <a-modal destroyOnClose centered :footer="null" width="520px" :maskClosable="false" v-model="confirmSaveDialog" class="ownModalBorder titDialog" title="提示" @cancel="confirmSaveDialog=false">
          <confirm-save :storeDeptName="storeDeptName" :storeDeptId="storeDeptId" :onlyFirstStoreDeptFlag="onlyFirstStoreDeptFlag" :data="data" @cancelSave="confirmSaveDialog=false" @successSave="successSave"></confirm-save>
        </a-modal>
    </div>
</template>

<script>
    import ConfirmSave from './confirmSave';
    import  * as API from '@/api/decision';
    export default {
        name: "resourceDecision",
        components: {
          ConfirmSave,
        },
        props: {
            storeDeptId: {
                type: String,
            },
            storeDeptName: {
              type: String,
            },
            firstStoreDeptId: {
                type: String,
            },
        },
        data() {
            return {
                resource1:{},
                resource2:{},
                resource3:{},
                resource4:{},
                resource5:{},
                resource6:{},
                resource7:{},
                resource8:{},
                resource9:{},
                resource10:{},
              resource11:{},
              resource12:{},
                resourceDefault1:{
                    onOff:0,
                    value:'',
                    module:'RESOURCE',
                    mark:'RESOURCE_RENTER_CLUE_AUTO_TURN_PUB',
                    bizPoint:'RESOURCE_RENTER_CLUE',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'租客线索不跟进自动转入公客',
                },
                resourceDefault2:{
                    onOff:false,
                    value:'',
                    module:'RESOURCE',
                    mark:'RESOURCE_RENTER_CLUE_AUTO_TURN_PUB_NOTIFY',
                    bizPoint:'RESOURCE_RENTER_CLUE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'租客线索抢单通知',
                },
                resourceDefault3:{
                    onOff:false,
                    value:'',
                    module:'RESOURCE',
                    mark:'RESOURCE_RENTER_CLUE_GRAB_LIMIT',
                    bizPoint:'RESOURCE_RENTER_CLUE',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'租客线索抢单数量限制',
                },
                resourceDefault4:{
                    onOff:false,
                    value:'',
                    module:'RESOURCE',
                    mark:'RESOURCE_RENTER_CLUE_PUB_CONTACT_VIEW_RULE',
                    bizPoint:'RESOURCE_RENTER_CLUE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'租客线索公客联系方式展示规则',
                },
                resourceDefault9:{
                    onOff:false,
                    value:{
                        limitTime:undefined,
                        number:undefined,
                    },
                    module:'RESOURCE',
                    mark:'RESOURCE_RENTER_CLUE_ASSIGN_LIMIT_PROMPT',
                    bizPoint:'RESOURCE_RENTER_CLUE',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'租客线索一段时间内指派数量限制提示',
                },
                resourceDefault5:{
                    onOff:0,
                    value:'',
                    module:'RESOURCE',
                    mark:'RESOURCE_OWNER_CLUE_AUTO_TURN_PUB',
                    bizPoint:'RESOURCE_OWNER_CLUE',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'租盘线索不跟进自动转入公客',
                },
                resourceDefault6:{
                    onOff:false,
                    value:'',
                    module:'RESOURCE',
                    mark:'RESOURCE_OWNER_CLUE_AUTO_TURN_PUB_NOTIFY',
                    bizPoint:'RESOURCE_OWNER_CLUE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'私盘线索自动转至公盘，是否发送通知消息 ',
                },
                resourceDefault7:{
                    onOff:false,
                    value:'',
                    module:'RESOURCE',
                    mark:'RESOURCE_OWNER_CLUE_QUANTITY_LIMIT',
                    bizPoint:'RESOURCE_OWNER_CLUE',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'租盘线索数量限制',
                },
                resourceDefault8:{
                    onOff:false,
                    value:'',
                    module:'RESOURCE',
                    mark:'RESOURCE_OWNER_CLUE_PUB_CONTACT_VIEW_RULE',
                    bizPoint:'RESOURCE_OWNER_CLUE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'业主线索公盘联系方式展示规则',
                },
                resourceDefault10:{
                    onOff:false,
                    value:{
                        limitTime:undefined,
                        number:undefined,
                    },
                    module:'RESOURCE',
                    mark:'RESOURCE_OWNER_CLUE_ASSIGN_LIMIT_PROMPT',
                    bizPoint:'RESOURCE_OWNER_CLUE',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'业主线索一段时间内指派数量限制提示',
                },
              resourceDefault11:{
                onOff:false,
                value:'',
                module:'RESOURCE',
                mark:'RENTER_NOT_FOLLOW_REMIND_DISPATCH_USER',
                bizPoint:'RESOURCE_RENTER_CLUE',
                chooseType:5,
                id:'',
                comment:'',
                name:'指派租客线索后，管家规定时间内未跟进，给予指派人消息提醒',
              },
              resourceDefault12:{
                onOff:false,
                value:'',
                module:'RESOURCE',
                mark:'OWNER_NOT_FOLLOW_REMIND_DISPATCH_USER',
                bizPoint:'RESOURCE_OWNER_CLUE',
                chooseType:5,
                id:'',
                comment:'',
                name:'指派业主线索后，管家规定时间内未跟进，给予指派人消息提醒',
              },
              data:{},
              confirmSaveDialog:false,
              onlyFirstStoreDeptFlag:false,
            }
        },
        created: function () {
            this.initDecisionList();
        },
        methods: {
            successSave(){
              this.confirmSaveDialog = false;
              this.initDecisionList();
            },
            changeResrource(data,val){
                data.onOff = val;
                if(val == 0){
                    if(data.mark == 'RESOURCE_RENTER_CLUE_ASSIGN_LIMIT_PROMPT'||data.mark == 'RESOURCE_OWNER_CLUE_ASSIGN_LIMIT_PROMPT'){
                        data.value = {
                            limitTime:undefined,
                            number:undefined,
                        }
                    }
                    else{
                        data.value = '';
                    }

                }
            },
            save(data,val){
                //开启的带输入框的要求必填值
                if((data.chooseType == 5&&data.onOff==1)||data.chooseType == 1){
                    if(!data.value){
                        this.$message.warning('请输入必填项');
                        return;
                    }
                }
                //特殊判断
                if(data.chooseType == 5&&(data.mark=='RESOURCE_OWNER_CLUE_ASSIGN_LIMIT_PROMPT'||data.mark=='RESOURCE_RENTER_CLUE_ASSIGN_LIMIT_PROMPT')&&data.onOff==1){
                    if(!data.value.limitTime||!data.value.number){
                        this.$message.warning('请输入必填项');
                        return;
                    }
                }
                //设置分店id
                data.storeId = this.storeDeptId;
                this.confirmSaveDialog = true;
                this.data = data;
                if(val){
                  this.onlyFirstStoreDeptFlag = val;
                }
                else{
                  this.onlyFirstStoreDeptFlag = false;
                }
            },
            initDecisionList(){
                let parameter = {
                    module: 'RESOURCE',
                    storeId:this.storeDeptId,
                };
                API.decisionList(parameter).then(res => {
                    if (res.code === '200') {
                        this.resource1 = Object.assign({},this.resourceDefault1);
                        this.resource2 = Object.assign({},this.resourceDefault2);
                        this.resource3 = Object.assign({},this.resourceDefault3);
                        this.resource4 = Object.assign({},this.resourceDefault4);
                        this.resource5 = Object.assign({},this.resourceDefault5);
                        this.resource6 = Object.assign({},this.resourceDefault6);
                        this.resource7 = Object.assign({},this.resourceDefault7);
                        this.resource8 = Object.assign({},this.resourceDefault8);
                        this.resource9 = Object.assign({},this.resourceDefault9);
                        this.resource10 = Object.assign({},this.resourceDefault10);
                      this.resource11 = Object.assign({},this.resourceDefault11);
                      this.resource12 = Object.assign({},this.resourceDefault12);
                        if(res.data && res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                //资源相关
                                if(res.data[i].mark == 'RESOURCE_RENTER_CLUE_AUTO_TURN_PUB'){
                                    this.resource1 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RESOURCE_RENTER_CLUE_AUTO_TURN_PUB_NOTIFY'){
                                    this.resource2 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RESOURCE_RENTER_CLUE_GRAB_LIMIT'){
                                    this.resource3 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RESOURCE_RENTER_CLUE_PUB_CONTACT_VIEW_RULE'){
                                    this.resource4 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RESOURCE_OWNER_CLUE_AUTO_TURN_PUB'){
                                    this.resource5 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RESOURCE_OWNER_CLUE_AUTO_TURN_PUB_NOTIFY'){
                                    this.resource6 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RESOURCE_OWNER_CLUE_QUANTITY_LIMIT'){
                                    this.resource7 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RESOURCE_OWNER_CLUE_PUB_CONTACT_VIEW_RULE'){
                                    this.resource8 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RESOURCE_RENTER_CLUE_ASSIGN_LIMIT_PROMPT'){
                                    this.resource9 = res.data[i];
                                    this.resource9.value = JSON.parse(this.resource9.value);
                                }
                                else if(res.data[i].mark == 'RESOURCE_OWNER_CLUE_ASSIGN_LIMIT_PROMPT'){
                                    this.resource10 = res.data[i];
                                    this.resource10.value = JSON.parse(this.resource10.value);
                                }
                                else if(res.data[i].mark == 'RENTER_NOT_FOLLOW_REMIND_DISPATCH_USER'){
                                  this.resource11 = res.data[i];
                                }
                                else if(res.data[i].mark == 'OWNER_NOT_FOLLOW_REMIND_DISPATCH_USER'){
                                  this.resource12 = res.data[i];
                                }
                            }
                        }
                    }
                });
            },
        },
        watch:{
            storeDeptId() {
                this.initDecisionList();
            },
        },
    }
</script>

<style scoped lang="less">
    .source{
        .title{
            width: 100%;
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
        .checkBox{
            margin: 14px 0 0 14px;
            .allCheck{
                height: 24px;
                line-height: 24px;
            }
            .checked{
                color: #0A87F8;
                .iconSize{
                    width: 16px;
                    height: 16px;
                }
            }
            .unEditStyle{
                color: #BBBBBB !important;
            }
            .fontStyle{
                margin-left: 8px;
                height:24px;
                font-size:14px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:#111111;
                line-height:24px;
            }
            .inputStyleDiv {
                margin-left: 15px;
                font-size: 12px;
                .mustFill{
                    color:#FB4246;
                    margin-left: 4px;
                }
            }
            .selectStyleDiv{
              /deep/ .ant-select-selection--single{
                height: 24px;
                line-height: 24px;
              }
              /deep/ .ant-select-selection__rendered{
                line-height: 24px;
                margin-left: 5px;
                margin-right: 5px;
              }
              /deep/  svg{
                width: 12px !important;
                height: 12px !important;
              }
              /deep/ .ant-select-selection-selected-value{
                height: 22px;
                line-height: 22px;
                font-size: 12px;
              }
            }
            .inputStyle {
                width: 56px;
                height: 24px;
            }
            .specialInputStyle{
                border: none !important;
                border-bottom: 1px solid #DDDDDD !important;
                border-radius:0;
            }
            .margin50{
                margin-left: 50px;
            }
            /deep/ .ant-input{
                padding: 4px 5px;
                font-size: 12px;
            }
        }
        .saveButton{
            margin: 20px 0 20px 14px;
            .formItemMarginButton{
                width:100px;
                height:28px;
                background:rgba(10,135,248,1);
                border-radius:4px;
                color: #FFFFFF;
            }
            .unClickStyle{
                background:#DDDDDD !important;
                color: #FFFFFF;
                border:none;
                text-align: center;
                height: 28px;
                line-height: 28px;
            }
            .warning{
                height: 28px;
                line-height: 28px;
                color: #FFA036;
                font-size: 12px;
                margin-left: 13px;
                svg{
                    width: 14px;
                    height: 14px;
                }
            }
        }
        .line{
            margin: 0 20px 20px 14px;
            height:1px;
            border: 1px dashed #DDDDDD;
        }
    }
</style>