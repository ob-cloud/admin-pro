<template>
    <div class="finance-decision-box">
        <div class="source">
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">绑定门锁自动给该房间的在租租客授权并发送门锁密码/钥匙</div>
            </div>
          <div class="describe" style="line-height: 20px;padding-top: 9px;">
            ① 开启后：对房间进行绑定门锁时，将自动给该房间的在租租客授权并发送门锁密码/钥匙；有效期为"绑定门锁的时间 - 合同截止日期"；绑定大门门锁时，自动给该房间的所有租客发送 门锁密码/钥匙
          </div>
          <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
            ② 关闭后：对房间进行绑定门锁时，将不会给该房间的在租租客授权门锁密码/钥匙
          </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="smartDevices1.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl allCheck clearfix cursor" v-if="smartDevices1.onOff==0" @click="changeResrource(smartDevices1,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="checked allCheck clearfix" v-if="smartDevices1.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="smartDevices1.onOff==1" @click="changeResrource(smartDevices1,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(smartDevices1)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">签订租客合同时自动给租客授权门锁密码/钥匙</div>
            </div>
          <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
            ① 开启后：录入租客合同时，将自动给该租客授权并发送门锁密码/钥匙；有效期为"租约开始日期 - 结束日期"
          </div>
          <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
            ② 关闭后：对房间进行绑定智能门锁时，将不会给该房间的在租租客授权门锁密码/钥匙
          </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="smartDevices2.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl allCheck clearfix cursor" v-if="smartDevices2.onOff==0" @click="changeResrource(smartDevices2,1)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="checked allCheck clearfix" v-if="smartDevices2.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="smartDevices2.onOff==1" @click="changeResrource(smartDevices2,0)">
                        <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(smartDevices2)">
                    保存
                </a-button>
            </div>
          <!--
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">租客续租后，自动延长门锁密码/钥匙的有效期</div>
                <div class="special f-fl">（此设置只针对智能门锁）</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
              ① 开启后：租客续签后，自动延长该租客的门锁密码/钥匙；有效期延长至续签合同的截止日期
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
              ② 关闭后：租客续签时，不会自动延长该租客的门锁密码/钥匙周期；将重新发送一条新密码给该租客，有效期为"续签合同的开始日期 - 结束日期"
            </div>
          <div class="checkBox clearfix">
            <div class="f-fl clearfix">
              <div class="f-fl allCheck checked" v-if="smartDevices3.onOff==1">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">开启</div>
              </div>
              <div class="f-fl allCheck clearfix cursor" v-if="smartDevices3.onOff==0" @click="changeResrource(smartDevices3,1)">
                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">开启</div>
              </div>
            </div>
            <div class="f-fl margin50">
              <div class="checked allCheck clearfix" v-if="smartDevices3.onOff==0">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">关闭</div>
              </div>
              <div class="allCheck clearfix cursor" v-if="smartDevices3.onOff==1" @click="changeResrource(smartDevices3,0)">
                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">关闭</div>
              </div>
            </div>
          </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(smartDevices3)">
                    保存
                </a-button>
            </div>
            -->
          <div class="line"></div>
          <div class="title clearfix">
            <div class="blueStyle f-fl"></div>
            <div class="titleFont f-fl">租客账单逾期后，自动冻结门锁密码/钥匙</div>
            <div class="special f-fl">（此设置只针对智能门锁）</div>
          </div>
          <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
            ① 开启后：可设置租客账单在逾期*天后，自动冻结该租客的门锁密码/钥匙；逾期账单处理完成，将自动解冻该密码
          </div>
          <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
            ② 关闭后：租客账单逾期，不会冻结门锁密码/钥匙
          </div>
          <div class="checkBox clearfix">
            <div class="f-fl clearfix">
              <div class="f-fl allCheck checked" v-if="smartDevices4.onOff==1">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">开启</div>
              </div>
              <div class="f-fl allCheck clearfix cursor" v-if="smartDevices4.onOff==0" @click="changeResrource(smartDevices4,1)">
                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">开启</div>
              </div>
              <div class="f-fl inputStyleDiv" v-if="smartDevices4.onOff">租金逾期超过<a-input style="margin: 0 5px;" class="inputStyle" placeholder="请输入" v-model="smartDevices4.value" v-validate="'naturalNum'"></a-input>天，自动冻结门锁密码/钥匙</div>
            </div>
            <div class="f-fl margin50">
              <div class="checked allCheck clearfix" v-if="smartDevices4.onOff==0">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">关闭</div>
              </div>
              <div class="allCheck clearfix cursor" v-if="smartDevices4.onOff==1" @click="changeResrource(smartDevices4,0)">
                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">关闭</div>
              </div>
            </div>
          </div>
          <div class="saveButton clearfix">
            <a-button size="large" type="primary" class="formItemMarginButton" @click="save(smartDevices4)">
              保存
            </a-button>
          </div>
          <div class="line"></div>
          <div class="title clearfix">
            <div class="blueStyle f-fl"></div>
            <div class="titleFont f-fl">租客账单逾期后，自动断电</div>
            <div class="special f-fl">（此设置只针对智能电表）</div>
          </div>
          <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
            ① 开启后：可设置租客账单逾期*天后，在次日的X点强制自动断电
          </div>
          <div class="describe" style="margin-top:0px;line-height: 20px;">
            <span style="color: #FFA036;">例如：</span>配置成逾期1天后的14点自动断电，应收款日为2020年1月9日，则如果在1月11日14点，租客仍未缴纳房租，则房间内的电表将强制自动断电，缴费后会实时自动通电
          </div>
          <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
            ② 关闭后：租客账单逾期，不会自动断电
          </div>
          <div class="checkBox clearfix">
            <div class="f-fl clearfix">
              <div class="f-fl allCheck checked" v-if="smartDevices5.onOff==1">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">开启</div>
              </div>
              <div class="f-fl allCheck clearfix cursor" v-if="smartDevices5.onOff==0" @click="changeResrource(smartDevices5,1)">
                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">开启</div>
              </div>
              <div class="f-fl specialIcon inputStyleDiv" v-if="smartDevices5.onOff">
                逾期<a-input style="margin: 0 5px;" class="inputStyle" placeholder="请输入" v-model="smartDevices5.value.overdays" v-validate="'naturalNum'"></a-input>天后的
                <a-select style="width: 60px;margin: 0 5px 0 2px;" :allowClear="false" placeholder="请选择" v-model="smartDevices5.value.hour">
                  <a-select-option v-for="(item,index) in hourList" :key="index" :value="item.value">{{item.value}}</a-select-option>
                </a-select>点，自动断电
              </div>
            </div>
            <div class="f-fl margin50">
              <div class="checked allCheck clearfix" v-if="smartDevices5.onOff==0">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">关闭</div>
              </div>
              <div class="allCheck clearfix cursor" v-if="smartDevices5.onOff==1" @click="changeResrource(smartDevices5,0)">
                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">关闭</div>
              </div>
            </div>
          </div>
          <div class="saveButton clearfix">
            <a-button size="large" type="primary" class="formItemMarginButton" @click="save(smartDevices5)">
              保存
            </a-button>
          </div>
          <div class="line"></div>
          <div class="title clearfix">
            <div class="blueStyle f-fl"></div>
            <div class="titleFont f-fl">自动生成电费账单</div>
            <div class="special f-fl">（此设置只针对智能电表）</div>
          </div>
          <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
            ① 开启后：设置电费账单自动生成的日期；在此日期24:00自动抄表并生成账单
          </div>
          <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
            ② 关闭后：不会自动生成电费账单
          </div>
          <div class="checkBox clearfix">
            <div class="f-fl clearfix">
              <div class="f-fl allCheck checked" v-if="smartDevices6.onOff==1" style="position: relative;">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">开启</div>
                <div style="position: absolute;top:20px;left: 32px;">
                  <img style="width: 11.7px;height: 7.2px;" src="../../../../assets/extension/poper.png">
                </div>
              </div>
              <div class="f-fl allCheck clearfix cursor" v-if="smartDevices6.onOff==0" @click="changeResrource(smartDevices6,1)">
                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">开启</div>
              </div>
            </div>
            <div class="f-fl margin50">
              <div class="checked allCheck clearfix" v-if="smartDevices6.onOff==0">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">关闭</div>
              </div>
              <div class="allCheck clearfix cursor" v-if="smartDevices6.onOff==1" @click="changeResrource(smartDevices6,0)">
                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">关闭</div>
              </div>
            </div>
          </div>
          <div class="callStyle clearfix" v-if="smartDevices6.onOff==1" style="margin-top: 10px;">
            <div class="clearfix cursor" @click="smartDevices6.value.type=1;smartDevices6.value.countdownDay=0;">
              <div class="f-fl callStyle-left checked" v-if="smartDevices6.value.type==1">
                <icon-font type="iconyumengtubiao_danxuan-yixuanze" />
              </div>
              <div class="f-fl callStyle-left" v-if="smartDevices6.value.type==2">
                <icon-font type="iconyumengtubiao_danxuan-weixuanze" />
              </div>
              <div class="f-fl callStyle-right">
                <div style="width: 100%">固定每月 <a-input style="margin: 0 5px;" class="inputStyle" v-model="smartDevices6.value.fixedDay"></a-input> 天抄表并自动生成账单</div>
                <div style="color: #777777;margin-top: 5px;">如果设置成31日或30日、29日自动生成账单，当该月没有31日、30日、29日，一律以该月倒数最后一天为标准，自动生成后付费水电表账单</div>
              </div>
            </div>
            <div class="clearfix cursor" style="margin-top: 15px;" @click="smartDevices6.value.type=2;smartDevices6.value.fixedDay=0;">
              <div class="f-fl callStyle-left" v-if="smartDevices6.value.type==1">
                <icon-font type="iconyumengtubiao_danxuan-weixuanze" />
              </div>
              <div class="f-fl callStyle-left checked" v-if="smartDevices6.value.type==2">
                <icon-font type="iconyumengtubiao_danxuan-yixuanze" />
              </div>
              <div class="f-fl callStyle-right">
                <div>固定每月倒数第 <a-input style="margin: 0 5px;" class="inputStyle" v-model="smartDevices6.value.countdownDay"></a-input> 天抄表并自动生成账单</div>
                <div style="color: #777777;margin-top: 5px;">如果设置每月倒数第1天抄表并自动生成账单，一律以该月的倒数第1天为标准，自动生成水电表账单</div>
              </div>
            </div>
          </div>
          <div class="saveButton clearfix">
            <a-button size="large" type="primary" class="formItemMarginButton" @click="save(smartDevices6)">
              保存
            </a-button>
          </div>
          <div class="line"></div>
          <div class="title clearfix">
            <div class="blueStyle f-fl"></div>
            <div class="titleFont f-fl">电费充值金额限制</div>
          </div>
          <div class="describe">
            设置最小充值金额后，充值电费时不可输入小于设置的金额
          </div>
          <div class="checkBox clearfix">
            <div class="f-fl specialIcon inputStyleDiv" style="margin-left: 0px;">
              最小充值金额不可少于<a-input style="margin: 0 5px;" class="inputStyle" placeholder="请输入" v-model="smartDevices7.value" v-validate="'money|max(100000)'"></a-input>元
            </div>
          </div>
          <div class="saveButton clearfix">
            <a-button size="large" type="primary" class="formItemMarginButton" @click="save(smartDevices7)">
              保存
            </a-button>
          </div>
          <div class="line"></div>
          <div class="title clearfix">
            <div class="blueStyle f-fl"></div>
            <div class="titleFont f-fl">自动生成水费账单</div>
            <div class="special f-fl">（此设置只针对智能水表）</div>
          </div>
          <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
            ① 开启后：设置水费账单自动生成的日期；在此日期24:00自动抄表并生成账单
          </div>
          <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
            ② 关闭后：不会自动生成水费账单
          </div>
          <div class="checkBox clearfix">
            <div class="f-fl clearfix">
              <div class="f-fl allCheck checked" v-if="smartDevices8.onOff==1" style="position: relative;">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">开启</div>
                <div style="position: absolute;top:20px;left: 32px;">
                  <img style="width: 11.7px;height: 7.2px;" src="../../../../assets/extension/poper.png">
                </div>
              </div>
              <div class="f-fl allCheck clearfix cursor" v-if="smartDevices8.onOff==0" @click="changeResrource(smartDevices8,1)">
                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">开启</div>
              </div>
            </div>
            <div class="f-fl margin50">
              <div class="checked allCheck clearfix" v-if="smartDevices8.onOff==0">
                <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">关闭</div>
              </div>
              <div class="allCheck clearfix cursor" v-if="smartDevices8.onOff==1" @click="changeResrource(smartDevices8,0)">
                <div class="f-fl" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">关闭</div>
              </div>
            </div>
          </div>
          <div class="callStyle clearfix" v-if="smartDevices8.onOff==1" style="margin-top: 10px;">
            <div class="clearfix cursor" @click="smartDevices8.value.type=1;smartDevices8.value.countdownDay=0;">
              <div class="f-fl callStyle-left checked" v-if="smartDevices8.value.type==1">
                <icon-font type="iconyumengtubiao_danxuan-yixuanze" />
              </div>
              <div class="f-fl callStyle-left" v-if="smartDevices8.value.type==2">
                <icon-font type="iconyumengtubiao_danxuan-weixuanze" />
              </div>
              <div class="f-fl callStyle-right">
                <div style="width: 100%">固定每月 <a-input style="margin: 0 5px;" class="inputStyle" v-model="smartDevices8.value.fixedDay"></a-input> 天抄表并自动生成账单</div>
                <div style="color: #777777;margin-top: 5px;">如果设置成31日或30日、29日自动生成账单，当该月没有31日、30日、29日，一律以该月倒数最后一天为标准，自动生成后付费水电表账单</div>
              </div>
            </div>
            <div class="clearfix cursor" style="margin-top: 15px;" @click="smartDevices8.value.type=2;smartDevices8.value.fixedDay=0;">
              <div class="f-fl callStyle-left" v-if="smartDevices8.value.type==1">
                <icon-font type="iconyumengtubiao_danxuan-weixuanze" />
              </div>
              <div class="f-fl callStyle-left checked" v-if="smartDevices8.value.type==2">
                <icon-font type="iconyumengtubiao_danxuan-yixuanze" />
              </div>
              <div class="f-fl callStyle-right">
                <div>固定每月倒数第 <a-input style="margin: 0 5px;" class="inputStyle" v-model="smartDevices8.value.countdownDay"></a-input> 天抄表并自动生成账单</div>
                <div style="color: #777777;margin-top: 5px;">如果设置每月倒数第1天抄表并自动生成账单，一律以该月的倒数第1天为标准，自动生成水电表账单</div>
              </div>
            </div>
          </div>
          <div class="saveButton clearfix">
            <a-button size="large" type="primary" class="formItemMarginButton" @click="save(smartDevices8)">
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
              smartDevices1:{},
              smartDevices2:{},
              smartDevices3:{},
              smartDevices4:{},
              smartDevices5:{},
              smartDevices6:{},
              smartDevices7:{},
              smartDevices8:{},
              smartDevicesDefault1:{
                    onOff:false,
                    value:'',
                    module:'SMART_DEVICE',
                    mark:'BINDING_AUTO_SEND_KEY',
                    bizPoint:'DOOR_LOCK',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'绑定门锁，有租客时自动发送钥匙',
                },
              smartDevicesDefault2:{
                    onOff:false,
                    value:'',
                    module:'SMART_DEVICE',
                    mark:'SIGN_CONTRACT_AUTO_SEND_KEY',
                    bizPoint:'DOOR_LOCK',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'新签租客合同自动发送钥匙',
                },
              smartDevicesDefault3:{
                    onOff:false,
                    value:'',
                    module:'SMART_DEVICE',
                    mark:'EXTEND_CONTRACT_AUTO_SEND_KEY',
                    bizPoint:'DOOR_LOCK',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'续签租客合同自动发送钥匙',
                },
              smartDevicesDefault4:{
                onOff:false,
                value:'',
                module:'SMART_DEVICE',
                mark:'BILL_OVERDUE_AUTO_FREE_KEY',
                bizPoint:'DOOR_LOCK',
                chooseType:5,
                id:'',
                comment:'',
                name:'签订租客合同自动发送钥匙',
              },
              smartDevicesDefault5:{
                onOff:false,
                value:'',
                module:'SMART_DEVICE',
                mark:'ELECTRIC_METER_RENTER_BILL_OVERDUR_AUTO_POWER_ONOFF',
                bizPoint:'ELECTRIC_METER',
                chooseType:5,
                id:'',
                comment:'',
                name:'租客账单逾期后，自动断电',
              },
              smartDevicesDefault6:{
                onOff:false,
                value:'',
                module:'SMART_DEVICE',
                mark:'ELECTRIC_METER_AUTO_GEN_BILL',
                bizPoint:'ELECTRIC_METER',
                chooseType:5,
                id:'',
                comment:'',
                name:'自动生成电费账单',
              },
              smartDevicesDefault7:{
                onOff:1,
                value:'',
                module:'SMART_DEVICE',
                mark:'ELECTRIC_METER_CHARGE_AMOUNT_MIN_LIMIT',
                bizPoint:'ELECTRIC_METER',
                chooseType:1,
                id:'',
                comment:'',
                name:'电费充值金额限制',
              },
              smartDevicesDefault8:{
                onOff:false,
                value:'',
                module:'SMART_DEVICE',
                mark:'WATER_METER_AUTO_GEN_BILL',
                bizPoint:'WATER_METER',
                chooseType:5,
                id:'',
                comment:'',
                name:'自动生成水费账单',
              },
              hourList:[
                { value: 0 },{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 },
                { value: 14 }, { value: 15 }, { value: 16 }, { value: 17 }, { value: 18 }, { value: 19 }, { value: 20 }, { value: 21 }, { value: 22 },{ value: 23 },
              ],
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
                    data.value = '';
                }
              if(data.mark  == 'ELECTRIC_METER_RENTER_BILL_OVERDUR_AUTO_POWER_ONOFF'){
                data.value = {
                  overdays:0,
                  hour:0,
                };
              }
              else if(data.mark  == 'ELECTRIC_METER_AUTO_GEN_BILL'||data.mark  == 'WATER_METER_AUTO_GEN_BILL'){
                data.value = {
                  type:1,
                  fixedDay:0,
                  countdownDay:0,
                };
              }
              else{
                if(val == 0){
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
                if(data.chooseType == 5&&data.onOff==1&&data.mark == 'FINANCE_BILL_OVERDUE_LATE_FEE'){
                    if(!data.value.overdays||!data.value.percent){
                        this.$message.warning('请输入必填项');
                        return;
                    }
                }
                if(data.mark == 'ELECTRIC_METER_CHARGE_AMOUNT_MIN_LIMIT'&&!data.value){
                  this.$message.warning('请输入必填项');
                  return;
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
                    module: 'SMART_DEVICE',
                    storeId:this.storeDeptId,
                };
                API.decisionList(parameter).then(res => {
                    if (res.code === '200') {
                        this.smartDevices1 = Object.assign({},this.smartDevicesDefault1);
                        this.smartDevices2 = Object.assign({},this.smartDevicesDefault2);
                        this.smartDevices3 = Object.assign({},this.smartDevicesDefault3);
                        this.smartDevices4 = Object.assign({},this.smartDevicesDefault4);
                        this.smartDevices5 = Object.assign({},this.smartDevicesDefault5);
                        this.smartDevices6 = Object.assign({},this.smartDevicesDefault6);
                        this.smartDevices7 = Object.assign({},this.smartDevicesDefault7);
                        this.smartDevices8 = Object.assign({},this.smartDevicesDefault8);
                        if(res.data && res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                //财务相关
                                if(res.data[i].mark == 'BINDING_AUTO_SEND_KEY'){
                                    this.smartDevices1 = res.data[i];
                                }
                                else if(res.data[i].mark == 'SIGN_CONTRACT_AUTO_SEND_KEY'){
                                    this.smartDevices2 = res.data[i];
                                }
                                else if(res.data[i].mark == 'EXTEND_CONTRACT_AUTO_SEND_KEY'){
                                    this.smartDevices3 = res.data[i];
                                }
                                else if(res.data[i].mark == 'BILL_OVERDUE_AUTO_FREE_KEY'){
                                  this.smartDevices4 = res.data[i];
                                }
                                else if(res.data[i].mark == 'ELECTRIC_METER_RENTER_BILL_OVERDUR_AUTO_POWER_ONOFF'){
                                  this.smartDevices5 = res.data[i];
                                  if(this.smartDevices5.value){
                                    this.smartDevices5.value = JSON.parse(this.smartDevices5.value);
                                  }
                                }
                                else if(res.data[i].mark == 'ELECTRIC_METER_AUTO_GEN_BILL'){
                                  this.smartDevices6 = res.data[i];
                                  if(this.smartDevices6.value){
                                    this.smartDevices6.value = JSON.parse(this.smartDevices6.value);
                                  }
                                }
                                else if(res.data[i].mark == 'ELECTRIC_METER_CHARGE_AMOUNT_MIN_LIMIT'){
                                  this.smartDevices7 = res.data[i];
                                  this.smartDevices7.value = this.smartDevices7.value/100;
                                }
                                else if(res.data[i].mark == 'WATER_METER_AUTO_GEN_BILL'){
                                  this.smartDevices8 = res.data[i];
                                  if(this.smartDevices8.value){
                                    this.smartDevices8.value = JSON.parse(this.smartDevices8.value);
                                  }
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
          .special{
            color: #FFA036;
            font-size: 14px;
            line-height: 16px;
          }
        }
        .moreDescribe{
            min-height:34px;
        }
        .describe{
            margin: 10px 20px 0 14px;
            padding-left: 5px;
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
            .specialIcon{
              /deep/ svg{
                width: 12px !important;
                height: 12px !important;
              }
            }
            .inputStyleDiv {
                margin-left: 15px;
                font-size: 12px;
            }
            .inputStyle {
                width: 56px;
                height: 24px;
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
      .callStyle {
        width: 900px;
        margin: 0 0 0 20px;
        padding: 10px;
        border: 1px solid #EEEEEE;
        border-radius: 4px;
        svg{
          width: 14px;
          height: 14px;
        }
        .callStyle-left{
          width: 14px;
          margin: 7px 10px 0 0;
          font-size: 12px;
          i{
            vertical-align: -0.3em;
          }
        }
        .callStyle-right{
          width: calc(100% - 24px);
          font-size: 12px;
          margin-top: 5px;
          /deep/ .ant-input{
            padding: 4px 5px;
            font-size: 12px;
          }
          .inputStyle {
            width: 56px;
            height: 24px;
          }
        }
        .checked{
          color: #0A87F8;
          svg{
            color: #0A87F8;
          }
        }
      }
      /deep/ .ant-select-selection--single{
        height: 24px;
      }
      /deep/ .ant-select-selection__rendered{
        line-height: 24px;
      }
    }
</style>