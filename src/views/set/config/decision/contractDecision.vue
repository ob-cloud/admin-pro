<template>
    <div class="contract-decision-box">
        <div class="source">
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">零散租金算法<span style="color: #FFA036;margin-left: 5px;font-size: 12px;">(调整计算规则后，只影响新建合同的计算，不影响已生成的租约；且新建合同和退租清算都使用此种计算规则)</span></div>
            </div>
            <div class="describe">
                <div style="width: 100%;color: #111111;line-height: 30px;padding-top: 2px;">实例提示</div>
                <div style="width: 100%;color: #777777;line-height: 28px;">1、按自然月计算举例（月租金1000元）</div>
                <div style="width: 100%;color: #777777;margin-left: 24px;height: 24px;line-height: 24px;">1月13号 ~ 1月28号，按照1月份实际天数31天计算：（月租金/31）* 零散天数=（1000/31）* 16=516.13</div>
                <div style="width: 100%;color: #777777;margin-left: 24px;height: 24px;line-height: 24px;">2月10号 ~2月18号，按照2月份实际天数28天计算：（月租金/28）* 零散天数=（1000/28）* 9=321.43</div>
                <div style="width: 100%;color: #777777;margin-top: 7px;line-height: 28px;">2、按照每月固定30日计算举例（月租金1000元）</div>
                <div style="width: 100%;color: #777777;margin-left: 24px;height: 24px;line-height: 24px;">1月13号 ~ 1月28号，所有月份都按照30天计算：（月租金/30）* 零散天数=（1000/30）* 16=533.33）</div>
                <div style="width: 100%;color: #777777;margin-left: 24px;height: 24px;line-height: 24px;">2月10号 ~2月18号，所有月份都按照30天计算：（月租金/30）* 零散天数=（1000/30）* 9=300.00</div>
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="contract1.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle" style="width: 100px;">按照自然月计算</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&contract1.onOff==1" @click="changeResrource(contract1,0)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle" style="width: 100px;">按照自然月计算</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&contract1.onOff==1">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle" style="width: 100px;">按照自然月计算</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract1.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle" style="width: 150px;">按照每月固定30日计算</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&contract1.onOff==0" @click="changeResrource(contract1,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle" style="width: 150px;">按照每月固定30日计算</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&contract1.onOff==0">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle" style="width: 150px;">按照每月固定30日计算</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract1,true)" v-if="storeDeptId==firstStoreDeptId">
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
                <div class="titleFont f-fl">租客合同「即将搬出」提醒设置</div>
            </div>
            <div class="describe">
                设置提醒时间后，合同还剩*天到期，显示在「即将搬出」提醒里
            </div>
            <div class="checkBox clearfix">
                <span style="color: #111111;font-size: 12px">提前</span> <a-input class="inputStyle" placeholder="请输入" :disabled="storeDeptId!=firstStoreDeptId" v-model="contract2.value" v-validate="'naturalNum'"></a-input>   <span style="color: #111111;font-size: 12px">天显示在合同「即将搬出」提醒里</span><span style="color:#FB4246;margin-left: 4px;">*</span>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract2,true)" v-if="storeDeptId==firstStoreDeptId">
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
                <div class="titleFont f-fl">业主合同「即将到期」提醒设置</div>
            </div>
            <div class="describe">
                设置提醒时间后，合同还剩*天到期，显示在「即将到期」提醒里
            </div>
            <div class="checkBox clearfix">
                <span style="color: #111111;font-size: 12px">提前</span> <a-input class="inputStyle" placeholder="请输入" :disabled="storeDeptId!=firstStoreDeptId" v-model="contract3.value" v-validate="'naturalNum'"></a-input>   <span style="color: #111111;font-size: 12px">天显示在合同「即将到期」提醒里</span><span style="color:#FB4246;margin-left: 4px;">*</span>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract3,true)" v-if="storeDeptId==firstStoreDeptId">
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
                <div class="titleFont f-fl">新建租客合同，合同截止日期是否可以超过业主合同截止日期</div>
            </div>
            <div class="describe">
                开启后，新建租客合同时，合同截止日期不可选择超过业主合同截止日期的时间
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="contract4.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="contract4.onOff==0" @click="changeResrource(contract4,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract4.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="contract4.onOff==1" @click="changeResrource(contract4,0)">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract4)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">新建租客合同，合同截止日期不可在 ※ 月</div>
            </div>
            <div class="describe">
                设置月份后，新建租客合同截止日期在设置的月份内时，合同周期默认往后延长1个月；关闭则不限制合同截止日期在哪个月份
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" style="height: 32px;line-height: 32px;" v-if="contract17.onOff==1">
                        <div class="f-fl checkIconSize" style="height: 32px;line-height: 32px;"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle" style="height: 32px;line-height: 32px;">开启</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="contract17.onOff==0" @click="changeResrource(contract17,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl inputStyleDiv" style="margin-left: 10px;" v-if="contract17.onOff">
                        提前
                        <a-select
                                mode="multiple"
                                :size="size"
                                placeholder="请选择"
                                v-model="contract17.value.month"
                                style="width: 200px" :showArrow="true"
                        >
                            <a-select-option v-for="i in 12" :key="i">
                                {{ i }}
                            </a-select-option>
                        </a-select>
                        月<span style="color:#FB4246;margin-left: 4px;">*</span>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract17.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix cursor" style="height: 32px;line-height: 32px;" v-if="contract17.onOff==1" @click="changeResrource(contract17,0)">
                        <div class="f-fl checkIconSize" style="height: 32px;line-height: 32px;" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle" style="height: 32px;line-height: 32px;">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract17)">
                    保存
                </a-button>
            </div>
          <div class="line"></div>
          <div class="title clearfix">
            <div class="blueStyle f-fl"></div>
            <div class="titleFont f-fl">签订租客合同时，是否允许确认已收账单</div>
          </div>
          <div class="describe">
            设置为允许后，签订租客合同时，可勾选已收账单；系统将自动处理账单生成流水
          </div>
          <div class="checkBox clearfix">
            <div class="f-fl clearfix">
              <div class="f-fl allCheck checked" style="height: 32px;line-height: 32px;" v-if="contract24.onOff==1">
                <div class="f-fl checkIconSize" style="height: 32px;line-height: 32px;"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle" style="height: 32px;line-height: 32px;">允许</div>
              </div>
              <div class="allCheck f-fl clearfix cursor" v-if="contract24.onOff==0" @click="changeResrource(contract24,1)">
                <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">允许</div>
              </div>
            </div>
            <div class="f-fl margin50">
              <div class="allCheck checked clearfix" v-if="contract24.onOff==0">
                <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">不允许</div>
              </div>
              <div class="allCheck clearfix cursor" style="height: 32px;line-height: 32px;" v-if="contract24.onOff==1" @click="changeResrource(contract24,0)">
                <div class="f-fl checkIconSize" style="height: 32px;line-height: 32px;" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle" style="height: 32px;line-height: 32px;">不允许</div>
              </div>
            </div>
          </div>
          <div class="saveButton">
            <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract24)">
              保存
            </a-button>
          </div>
          <div class="line"></div>
          <div class="title clearfix">
            <div class="blueStyle f-fl"></div>
            <div class="titleFont f-fl">签订业主合同时，是否允许确认已付账单</div>
          </div>
          <div class="describe">
            设置为允许后，签订业主合同时，可勾选已付账单；系统将自动处理账单生成流水
          </div>
          <div class="checkBox clearfix">
            <div class="f-fl clearfix">
              <div class="f-fl allCheck checked" style="height: 32px;line-height: 32px;" v-if="contract25.onOff==1">
                <div class="f-fl checkIconSize" style="height: 32px;line-height: 32px;"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle" style="height: 32px;line-height: 32px;">允许</div>
              </div>
              <div class="allCheck f-fl clearfix cursor" v-if="contract25.onOff==0" @click="changeResrource(contract25,1)">
                <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle">允许</div>
              </div>
            </div>
            <div class="f-fl margin50">
              <div class="allCheck checked clearfix" v-if="contract25.onOff==0">
                <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                <div class="f-fl fontStyle">不允许</div>
              </div>
              <div class="allCheck clearfix cursor" style="height: 32px;line-height: 32px;" v-if="contract25.onOff==1" @click="changeResrource(contract25,0)">
                <div class="f-fl checkIconSize" style="height: 32px;line-height: 32px;" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                <div class="f-fl fontStyle" style="height: 32px;line-height: 32px;">不允许</div>
              </div>
            </div>
          </div>
          <div class="saveButton">
            <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract25)">
              保存
            </a-button>
          </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">新建租客合同，是否必须关联系统内的房源</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 可不关联：录入租客合同时，可先不关联房源，合同录入完成后再关联在房源上
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 必须关联：录入租客合同时，必须关联已录入系统内的房源
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="contract18.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&contract18.onOff==1" @click="changeResrource(contract18,0)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId!=firstStoreDeptId&&contract18.onOff==1" @click="changeResrource(contract18,0)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract18.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&contract18.onOff==0" @click="changeResrource(contract18,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&contract18.onOff==0">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract18,true)" v-if="storeDeptId==firstStoreDeptId">
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
                <div class="titleFont f-fl">新建业主合同，是否必须关联系统内的房源</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 可不关联：录入业主合同时，可先不关联房源，合同录入完成后再关联在房源上
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 必须关联：录入业主合同时，必须关联已录入系统内的房源
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="contract19.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&contract19.onOff==1" @click="changeResrource(contract19,0)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&contract19.onOff==1">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract19.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&contract19.onOff==0" @click="changeResrource(contract19,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&contract19.onOff==0">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract19,true)" v-if="storeDeptId==firstStoreDeptId">
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
                <div class="titleFont f-fl">业主合同退租，该房源还存在租客合同时，是否允许退租</div>
            </div>
            <div class="describe">
                允许后，业主合同退租时，租客合同将不做任何处理
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="contract5.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="contract5.onOff==0" @click="changeResrource(contract5,1)">
                        <div class="f-fl  checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract5.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="contract5.onOff==1" @click="changeResrource(contract5,0)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract5)">
                    保存
                </a-button>
            </div>
            <!-- 暂时隐藏定金有效时长-->
            <!-- <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">定金有效时长</div>
            </div>
            <div class="describe">
                收取定金后，超过有效期，自动将定金置为无效；并且给该预定人和负责人发送通知消息
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="contract6.onOff==1">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl allCheck clearfix" v-if="contract6.onOff==0">
                        <div class="f-fl cursor" @click="changeResrource(contract6,1)"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">开启</div>
                    </div>
                    <div class="f-fl inputStyleDiv" v-if="contract6.onOff"><a-input class="inputStyle" v-model="contract6.value" v-validate="'naturalNum'"></a-input>   天失效</div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract6.onOff==0">
                        <div class="f-fl"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                    <div class="allCheck clearfix" v-if="contract6.onOff==1">
                        <div class="f-fl cursor" @click="changeResrource(contract6,0)"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">关闭</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract6)">
                    保存
                </a-button>
            </div>-->
            <!-- 合约流程相关 -->
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">电子合同是否是双方签完字才进入审批中？</div>
            </div>
            <div class="describe" style="line-height: 20px;padding: 9px 5px">
                <div style="width: 100%">① 设置为'是'：签订的电子合同需甲乙双方都签字完成才提交审批</div>
                <div style="width: 100%">② 设置为'否'：签订的电子合同在未签字的情况下也提交审批；签字和审批不受影响</div>
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="contract10.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">是</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="contract10.onOff==0" @click="changeResrource(contract10,1)">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">是</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract10.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">否</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="contract10.onOff==1" @click="changeResrource(contract10,0)">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">否</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract10)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">审批中的合同是否允许修改个人信息？</div>
            </div>
            <div class="describe">
                允许后，提交到审批中心正在审批的合同，可以修改租客/业主个人信息
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="contract11.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="contract11.onOff==0" @click="changeResrource(contract11,1)">
                        <div class="f-fl  checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract11.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="contract11.onOff==1" @click="changeResrource(contract11,0)">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract11)">
                    保存
                </a-button>
            </div>
            <!--
              <div class="line"></div>
              <div class="title clearfix">
                  <div class="blueStyle f-fl"></div>
                  <div class="titleFont f-fl">审批中的合同是否允许退租？</div>
              </div>
              <div class="describe">
                  允许后，提交到审批中心正在审批的合同，可以退租
              </div>
              <div class="checkBox clearfix">
                  <div class="f-fl clearfix">
                      <div class="f-fl allCheck checked" v-if="contract12.onOff==1">
                          <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                          <div class="f-fl fontStyle">允许</div>
                      </div>
                      <div class="allCheck f-fl clearfix cursor" v-if="contract12.onOff==0" @click="changeResrource(contract12,1)">
                          <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                          <div class="f-fl fontStyle">允许</div>
                      </div>
                  </div>
                  <div class="f-fl margin50">
                      <div class="allCheck checked clearfix" v-if="contract12.onOff==0">
                          <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                          <div class="f-fl fontStyle">不允许</div>
                      </div>
                      <div class="allCheck clearfix cursor" v-if="contract12.onOff==1" @click="changeResrource(contract12,0)">
                          <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                          <div class="f-fl fontStyle">不允许</div>
                      </div>
                  </div>
              </div>
              <div class="saveButton">
                  <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract12)">
                      保存
                  </a-button>
              </div>
            -->
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">审批通过的合同是否允许作废？</div>
            </div>
            <div class="describe">
                允许后，审批通过的合同可以作废；不允许则审批通过的合同不可见「作废」按钮
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="contract13.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="contract13.onOff==0" @click="changeResrource(contract13,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract13.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="contract13.onOff==1" @click="changeResrource(contract13,0)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract13)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">审批中的合同账单是否允许收/付款？</div>
            </div>
            <div class="describe" style="line-height: 20px;padding: 9px 5px">
                <div style="width: 100%;">① 设置为'允许'：正在审批中的合同账单可以继续编辑、收/付款等操作</div>
                <div style="width: 100%">② 设置为'不允许'：正在审批中的合同不可以账单继续编辑、收/付款等操作</div>
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="contract14.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="contract14.onOff==0" @click="changeResrource(contract14,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract14.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="contract14.onOff==1" @click="changeResrource(contract14,0)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract14)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">审批驳回和已撤销的合同账单是否允许收/付款？</div>
            </div>
            <div class="describe" style="line-height: 20px;padding: 9px 5px">
                <div style="width: 100%;">① 设置为'允许'：审批驳回和已撤销的合同账单可以继续编辑、收/付款等操作</div>
                <div style="width: 100%;">② 设置为'不允许'：审批驳回和已撤销的合同账单不可以继续编辑、收/付款等操作</div>
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="contract15.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="contract15.onOff==0" @click="changeResrource(contract15,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">允许</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract15.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="contract15.onOff==1" @click="changeResrource(contract15,0)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">不允许</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract15)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">合同审批被驳回时是否同时将已产生的流水作废？</div>
            </div>
            <div class="describe" style="line-height: 20px;padding: 9px 5px">
                <div style="width: 100%;">① 设置为'是'：被驳回的合同账单已产生的流水将默认撤销，并将账单信息还原（已审批通过的流水也将撤销并作废）</div>
                <div style="width: 100%">② 设置为'否'：审批中的合同被驳回时，该合同内的账单已产生的流水将不做任何处理</div>
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="f-fl allCheck checked" v-if="contract16.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">是</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="contract16.onOff==0" @click="changeResrource(contract16,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">是</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract16.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">否</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="contract16.onOff==1" @click="changeResrource(contract16,0)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">否</div>
                    </div>
                </div>
            </div>
            <div class="saveButton">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract16)">
                    保存
                </a-button>
            </div>
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">预定房源时，是否必须关联系统内的房源</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 可不关联：添加预定时，可先不关联房源，预定信息录入完成后再关联在房源上
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 必须关联：添加预定时，必须关联已录入系统内的房源
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="contract20.onOff==0">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&contract20.onOff==1" @click="changeResrource(contract20,0)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                    <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&contract20.onOff==1">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">可不关联</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract20.onOff==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&contract20.onOff==0" @click="changeResrource(contract20,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                    <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&contract20.onOff==0">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">必须关联</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract20,true)" v-if="storeDeptId==firstStoreDeptId">
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
                <div class="titleFont f-fl">线上预定，定金需在※分钟内完成支付，逾期将自动作废</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 29px;">
                线上预定，租客在设置的时间内未完成支付，默认将此预定作废，并解除此房源的锁定状态
            </div>
            <div class="checkBox clearfix">
                <div>
                    <a-input class="inputStyle" v-model="contract22.value" v-validate="'naturalNum|min(10)|max(60)'"></a-input> 分钟内不支付定金，预定自动作废，且释放房源
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract22,true)" v-if="storeDeptId==firstStoreDeptId">
                    保存
                </a-button>
                <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    保存
                </div>
                <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                    <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
                </div>
            </div>
            <!--
            <div class="line"></div>
            <div class="title clearfix">
              <div class="blueStyle f-fl"></div>
              <div class="titleFont f-fl">线上支付定金时，定金是否进入相应门店钱包账户</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
              ① 进入相应门店账户：租客在线上支付定金后，此定金直接进入该房源所属门店相应钱包账户内
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
              ② 进入平台账户：租客在线上支付定金后，此定金先进入中间平台账户，签约后自动转入相应门店钱包账户内。退定时自动转入设置的账户内
            </div>
            <div class="checkBox clearfix">
              <div class="f-fl clearfix">
                <div class="allCheck f-fl checked" v-if="contract23.onOff==1&&contract23.value.platformType==1">
                  <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">进入相应门店账户</div>
                </div>
                <div class="allCheck f-fl clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&contract23.onOff==1&&contract23.value.platformType==2" @click="changeResrource(contract23,1)">
                  <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">进入相应门店账户</div>
                </div>
                <div class="allCheck f-fl clearfix" v-if="storeDeptId!=firstStoreDeptId&&contract23.onOff==1&&contract23.value.platformType==2">
                  <div class="f-fl checkIconSize" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">进入相应门店账户</div>
                </div>
              </div>
              <div class="f-fl margin50" style="position: relative;">
                <div class="allCheck checked clearfix" v-if="contract23.onOff==1&&contract23.value.platformType==2">
                  <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                  <div class="f-fl fontStyle">进入平台账户</div>
                </div>
                <div class="allCheck clearfix cursor" v-if="storeDeptId==firstStoreDeptId&&contract23.onOff==1&&contract23.value.platformType==1" @click="changeResrource(contract23,2)">
                  <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">进入平台账户</div>
                </div>
                <div class="allCheck clearfix" v-if="storeDeptId!=firstStoreDeptId&&contract23.onOff==1&&contract23.value.platformType==1">
                  <div class="f-fl checkIconSize" ><icon-font class="iconSize unEditStyle" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                  <div class="f-fl fontStyle">进入平台账户</div>
                </div>
                <div style="position: absolute;top:20px;left: 18px;" v-if="contract23.value&&contract23.value.platformType==2">
                  <img style="width: 11.7px;height: 7.2px;" src="../../../../assets/extension/poper.png">
                </div>
              </div>
            </div>
            <div v-if="contract23.value&&contract23.value.platformType==2" class="poperStyle">
              <div class="poperStyle-title">退定时，定金默认转入</div>
              <div class="poperStyle-detail" v-if="contract23.value.walletType==1"><icon-font :class="contract23.value.walletType==1?'checked':''" type="iconyumengtubiao_danxuan-yixuanze" />该房源所属门店相应钱包账户</div>
              <div class="poperStyle-detail cursor" @click="contract23.value.walletType=2" v-if="contract23.value.walletType==1"><icon-font type="iconyumengtubiao_danxuan-weixuanze" />指定钱包账户</div>
              <div class="poperStyle-detail cursor" @click="contract23.value.walletType=1" v-if="contract23.value.walletType==2"><icon-font type="iconyumengtubiao_danxuan-weixuanze" />该房源所属门店相应钱包账户</div>
              <div class="poperStyle-detail" v-if="contract23.value.walletType==2">
                  <icon-font :class="contract23.value.walletType==2?'checked':''" type="iconyumengtubiao_danxuan-yixuanze" />指定钱包账户
                <a-select style="width: 150px;margin-left: 10px;font-size: 12px;color: #333333;" placeholder="请选择" v-model="contract23.value.walletAccountId">
                  <a-select-option v-for="item in waSimpleList" :key="item.id" :value="item.id">
                    <span>{{ item.name }}</span>
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div class="saveButton clearfix">
              <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract23)" v-if="storeDeptId==firstStoreDeptId">
                保存
              </a-button>
              <div class="formItemMarginButton unClickStyle f-fl" v-if="storeDeptId!=firstStoreDeptId">
                保存
              </div>
              <div class="warning f-fl" v-if="storeDeptId!=firstStoreDeptId">
                <a-icon type="exclamation-circle" style="margin-right: 5px;"/>仅支持在总店设置
              </div>
            </div>
            -->
            <div class="line"></div>
            <div class="title clearfix">
                <div class="blueStyle f-fl"></div>
                <div class="titleFont f-fl">新签合同时，水电燃抄表是否自动清零</div>
            </div>
            <div class="describe" style="height: 29px;line-height: 20px;padding-top: 9px;">
                ① 正常抄表：签订租客合同时，水电燃抄表正常读取当前房源已绑智能设备的表读数
            </div>
            <div class="describe" style="margin: 0 20px 0 14px;height: 29px;line-height: 20px;padding-bottom: 9px;">
                ② 自动清零：合同签约完成后，水电燃抄表默认为0；且智能水电燃等设备做清零处理
            </div>
            <div class="checkBox clearfix">
                <div class="f-fl clearfix">
                    <div class="allCheck f-fl checked" v-if="contract21.onOff==1&&contract21.value==1">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">正常抄表</div>
                    </div>
                    <div class="allCheck f-fl clearfix cursor" v-if="contract21.onOff==1&&contract21.value==2" @click="changeResrource(contract21,1)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">正常抄表</div>
                    </div>
                </div>
                <div class="f-fl margin50">
                    <div class="allCheck checked clearfix" v-if="contract21.onOff==1&&contract21.value==2">
                        <div class="f-fl checkIconSize"><icon-font class="iconSize" :class="storeDeptId!=firstStoreDeptId?'unEditStyle':''" type="iconyumengtubiao_danxuan-yixuanze" /></div>
                        <div class="f-fl fontStyle">自动清零</div>
                    </div>
                    <div class="allCheck clearfix cursor" v-if="contract21.onOff==1&&contract21.value==1" @click="changeResrource(contract21,2)">
                        <div class="f-fl checkIconSize" ><icon-font class="iconSize" type="iconyumengtubiao_danxuan-weixuanze" /></div>
                        <div class="f-fl fontStyle">自动清零</div>
                    </div>
                </div>
            </div>
            <div class="saveButton clearfix">
                <a-button size="large" type="primary" class="formItemMarginButton" @click="save(contract21)">
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
    import {waListSimple} from '@/api/wallet';
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
                size: 'default',
                contract1:{},
                contract2:{},
                contract3:{},
                contract4:{},
                contract5:{},
                contract6:{},
                contract10:{},
                contract11:{},
                contract12:{},
                contract13:{},
                contract14:{},
                contract15:{},
                contract16:{},
                contract17:{},
                contract18:{},
                contract19:{},
                contract20:{},
                contract21:{},
                contract22:{},
                contract23:{},
              contract24:{},
              contract25:{},
                contractDefault1:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'CONTRACT_CREATE_OR_BREAK_SCATTERED_RENT_TERM',
                    bizPoint:'SCATTERED_RENT_TERM',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'零散租期新建合同、退房时计算方式',
                },
                contractDefault2:{
                    onOff:false,
                    value:30,
                    module:'CONTRACT',
                    mark:'RENTER_CONTRACT_EXPIRE_SOON_REMIND',
                    bizPoint:'EXPIRE_SOON_REMIND',
                    chooseType:1,
                    id:'',
                    comment:'',
                    name:'租客合同即将到期提醒',
                },
                contractDefault3:{
                    onOff:false,
                    value:30,
                    module:'CONTRACT',
                    mark:'OWNER_CONTRACT_EXPIRE_SOON_REMIND',
                    bizPoint:'EXPIRE_SOON_REMIND',
                    chooseType:1,
                    id:'',
                    comment:'',
                    name:'业主合同即将到期提醒',
                },
                contractDefault4:{
                    onOff:true,
                    value:'',
                    module:'CONTRACT',
                    mark:'RENTER_EXCEED_OWNER_DATE',
                    bizPoint:'CONTRACT_DATE_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'租客合同截止日期是否可以超过业主合同截止日期',
                },
                contractDefault5:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'ALLOW_OWNER_BREAK',
                    bizPoint:'OWNER_BREAK_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'业主合同退租是还存在租客合同，是否允许退租',
                },
                contractDefault6:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'BOOKING_VALID_DATE',
                    bizPoint:'CONTRACT_DATE_RULE',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'定金有效时长',
                },
                contractDefault10:{
                    onOff:true,
                    value:'',
                    module:'CONTRACT',
                    mark:'RENTER_AUDIT_NEED_SIGN',
                    bizPoint:'CONTRACT_AUDIT_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'租客电子合同是否是双方签字完成才进入审批中',
                },
                contractDefault11:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'AUDITING_ALLOW_MODIFY',
                    bizPoint:'CONTRACT_AUDIT_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'审批中的合同是否允许修改个人信息',
                },
                contractDefault12:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'AUDITING_ALLOW_BREAK',
                    bizPoint:'CONTRACT_AUDIT_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'审批中的合同是否允许退租',
                },
                contractDefault13:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'AUDITING_ALLOW_OBSOLETE',
                    bizPoint:'CONTRACT_AUDIT_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'审批中的合同是否允许作废',
                },
                contractDefault14:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'AUDITING_ALLOW_HANDLE_BILL',
                    bizPoint:'CONTRACT_AUDIT_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'审批中的合同是否允许处理账单【收付款】',
                },
                contractDefault15:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'AUDIT_REJECT_CANCEL_ALLOW_HANDLE_BILL',
                    bizPoint:'CONTRACT_AUDIT_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'审批驳回或撤销的合同账单是否允许处理账单【收付款】',
                },
                contractDefault16:{
                    onOff:true,
                    value:'',
                    module:'CONTRACT',
                    mark:'AUDIT_REJECT_ALLOW_OBSOLETE_BILL_FLOW',
                    bizPoint:'CONTRACT_AUDIT_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'合同审批被驳回时是否同时将已产生的流水作废',
                },
                contractDefault17:{
                    onOff:false,
                    value:{
                        month:[],
                    },
                    module:'CONTRACT',
                    mark:'RENTER_LIMIT_END_DATE',
                    bizPoint:'CONTRACT_DATE_RULE',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'新建租客合同,合同截止日期不可在*月',
                },
                contractDefault18:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'RENTER_CONTRACT_MUST_RELATED',
                    bizPoint:'CONTRACT_BASE_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'租客合同添加必选关联系统内的房源',
                },
                contractDefault19:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'OWNER_CONTRACT_MUST_RELATED',
                    bizPoint:'CONTRACT_BASE_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'业主合同添加必选关联系统内的房源',
                },
                contractDefault20:{
                    onOff:false,
                    value:'',
                    module:'CONTRACT',
                    mark:'BOOKING_MUST_RELATED',
                    bizPoint:'CONTRACT_BASE_RULE',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'预定添加必选关联系统内的房源',
                },
                contractDefault21:{
                    onOff:true,
                    value:1,
                    module:'CONTRACT',
                    mark:'RC_NEW_SIGN_METER_AUTO_CLEARING',
                    bizPoint:'METER',
                    chooseType:2,
                    id:'',
                    comment:'',
                    name:'新签租客合同水电表是否自动清零',
                },
                contractDefault22:{
                    onOff:true,
                    value:60,
                    module:'CONTRACT',
                    mark:'BOOKING_ONLINE_VALID_DATE',
                    bizPoint:'CONTRACT_DATE_RULE',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'线上预定，定金需在※分钟内完成支付，逾期将自动作废线上预定',
                },
                contractDefault23:{
                    onOff:true,
                    value:{
                        platformType:1,   //1、进入相应门店；2、进入平台账户
                        walletType:1,    //1、该房源所属门店相应钱包账户； 2、指定钱包账户
                        walletAccountId:undefined, //具体钱包账户
                    },
                    module:'CONTRACT',
                    mark:'BOOKING_PAYMENT_WALLET',
                    bizPoint:'CONTRACT_BASE_RULE',
                    chooseType:5,
                    id:'',
                    comment:'',
                    name:'线上支付定金时，定金是否进入相应门店钱包账户',
                },
              contractDefault24:{
                onOff:true,
                value:'',
                module:'CONTRACT',
                mark:'RENTER_CONTRACT_ALLOW_AFFIRM_BILL',
                bizPoint:'CONTRACT_BASE_RULE',
                chooseType:2,
                id:'',
                comment:'',
                name:'租客合同是否允许确认已收账单',
              },
              contractDefault25:{
                onOff:true,
                value:'',
                module:'CONTRACT',
                mark:'OWNER_CONTRACT_ALLOW_AFFIRM_BILL',
                bizPoint:'CONTRACT_BASE_RULE',
                chooseType:2,
                id:'',
                comment:'',
                name:'业主合同是否允许确认已付账单',
              },
              waSimpleList:[],
              data:{},
              confirmSaveDialog:false,
              onlyFirstStoreDeptFlag:false,
            }
        },
        created: function () {
            this.initDecisionList();
            this.waListSimple();
        },
        methods: {
            successSave(){
              this.confirmSaveDialog = false;
              this.initDecisionList();
            },
            waListSimple(){
                waListSimple().then(res =>{
                    if(res.code === '200'){
                        this.waSimpleList = res.data;
                    }
                })
            },
            changeResrource(data,val){
                data.onOff = val;
                if(data.mark  == 'RENTER_LIMIT_END_DATE'){
                    if(val == 0){
                        data.value = {
                            month:[],
                        };
                    }
                }
                else if(data.mark  == 'RC_NEW_SIGN_METER_AUTO_CLEARING'){
                    data.onOff = 1;
                    data.value = val;
                }
                else if(data.mark  == 'BOOKING_PAYMENT_WALLET'){
                    data.onOff = 1;
                    data.value.platformType = val;
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
                //特别检验新建租客合同，合同截止日期不可在 ※ 月
                if(data.chooseType == 5&&data.onOff==1&&data.mark == 'RENTER_LIMIT_END_DATE'){
                    if(data.value.month.length == 0){
                        this.$message.warning('请输入必填项');
                        return;
                    }
                }
                //检验contract23
                if(data.mark == 'BOOKING_PAYMENT_WALLET'){
                    if(data.value.platformType==2&&data.value.walletType==2&&!data.value.walletAccountId){
                        this.$message.warning('请选择指定钱包账户');
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
                    module: 'CONTRACT',
                    storeId:this.storeDeptId,
                };
                API.decisionList(parameter).then(res => {
                    if (res.code === '200') {
                        this.contract1 = Object.assign({},this.contractDefault1);
                        this.contract2 = Object.assign({},this.contractDefault2);
                        this.contract3 = Object.assign({},this.contractDefault3);
                        this.contract4 = Object.assign({},this.contractDefault4);
                        this.contract5 = Object.assign({},this.contractDefault5);
                        this.contract6 = Object.assign({},this.contractDefault6);
                        this.contract10 = Object.assign({},this.contractDefault10);
                        this.contract11 = Object.assign({},this.contractDefault11);
                        this.contract12 = Object.assign({},this.contractDefault12);
                        this.contract13 = Object.assign({},this.contractDefault13);
                        this.contract14 = Object.assign({},this.contractDefault14);
                        this.contract15 = Object.assign({},this.contractDefault15);
                        this.contract16 = Object.assign({},this.contractDefault16);
                        this.contract17 = Object.assign({},this.contractDefault17);
                        this.contract18 = Object.assign({},this.contractDefault18);
                        this.contract19 = Object.assign({},this.contractDefault19);
                        this.contract20 = Object.assign({},this.contractDefault20);
                        this.contract21 = Object.assign({},this.contractDefault21);
                        this.contract22 = Object.assign({},this.contractDefault22);
                        this.contract23 = Object.assign({},this.contractDefault23);
                      this.contract24 = Object.assign({},this.contractDefault24);
                      this.contract25 = Object.assign({},this.contractDefault25);
                        if(res.data && res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                //合同相关
                                if(res.data[i].mark == 'CONTRACT_CREATE_OR_BREAK_SCATTERED_RENT_TERM'){
                                    this.contract1 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RENTER_CONTRACT_EXPIRE_SOON_REMIND'){
                                    this.contract2 = res.data[i];
                                }
                                else if(res.data[i].mark == 'OWNER_CONTRACT_EXPIRE_SOON_REMIND'){
                                    this.contract3 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RENTER_EXCEED_OWNER_DATE'){
                                    this.contract4 = res.data[i];
                                }
                                else if(res.data[i].mark == 'ALLOW_OWNER_BREAK'){
                                    this.contract5 = res.data[i];
                                }
                                else if(res.data[i].mark == 'BOOKING_VALID_DATE'){
                                    this.contract6 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RENTER_AUDIT_NEED_SIGN'){
                                    this.contract10 = res.data[i];
                                }
                                else if(res.data[i].mark == 'AUDITING_ALLOW_MODIFY'){
                                    this.contract11 = res.data[i];
                                }
                                else if(res.data[i].mark == 'AUDITING_ALLOW_BREAK'){
                                    this.contract12 = res.data[i];
                                }
                                else if(res.data[i].mark == 'AUDITING_ALLOW_OBSOLETE'){
                                    this.contract13 = res.data[i];
                                }
                                else if(res.data[i].mark == 'AUDITING_ALLOW_HANDLE_BILL'){
                                    this.contract14 = res.data[i];
                                }
                                else if(res.data[i].mark == 'AUDIT_REJECT_CANCEL_ALLOW_HANDLE_BILL'){
                                    this.contract15 = res.data[i];
                                }
                                else if(res.data[i].mark == 'AUDIT_REJECT_ALLOW_OBSOLETE_BILL_FLOW'){
                                    this.contract16 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RENTER_LIMIT_END_DATE'){
                                    this.contract17 = res.data[i];
                                    if(this.contract17.value){
                                        this.contract17.value = JSON.parse(this.contract17.value);
                                    }

                                }
                                else if(res.data[i].mark == 'RENTER_CONTRACT_MUST_RELATED'){
                                    this.contract18 = res.data[i];
                                }
                                else if(res.data[i].mark == 'OWNER_CONTRACT_MUST_RELATED'){
                                    this.contract19 = res.data[i];
                                }
                                else if(res.data[i].mark == 'BOOKING_MUST_RELATED'){
                                    this.contract20 = res.data[i];
                                }
                                else if(res.data[i].mark == 'RC_NEW_SIGN_METER_AUTO_CLEARING'){
                                    this.contract21 = res.data[i];
                                }
                                else if(res.data[i].mark == 'BOOKING_ONLINE_VALID_DATE'){
                                    this.contract22 = res.data[i];
                                }
                                else if(res.data[i].mark == 'BOOKING_PAYMENT_WALLET'){
                                    this.contract23 = res.data[i];
                                    if(this.contract23.value){
                                        this.contract23.value = JSON.parse(this.contract23.value);
                                    }
                                }
                                else if(res.data[i].mark == 'RENTER_CONTRACT_ALLOW_AFFIRM_BILL'){
                                  this.contract24 = res.data[i];
                                }
                                else if(res.data[i].mark == 'OWNER_CONTRACT_ALLOW_AFFIRM_BILL'){
                                  this.contract25 = res.data[i];
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
            height:auto;
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
                .checkIconSize{
                }
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
                /deep/ .ant-select-selection__choice__remove svg{
                    width: 12px !important;
                    height: 12px !important;
                }
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
        .poperStyle{
            width: 350px;
            border: 1px solid #EEEEEE;
            margin: 10px 0 0 14px;
            .poperStyle-title{
                font-size: 12px;
                color: #111111;
                font-weight: 500;
                padding: 10px 14px;
            }
            .poperStyle-detail{
                padding-left: 14px;
                margin-bottom: 7px;
                font-size: 12px;
                color: #111111;
                height: 24px;
                line-height: 24px;
                /deep/ svg{
                    width: 13px;
                    height: 13px;
                    margin-right: 2px;
                }
                .checked {
                    color: #0A87F8;
                }
                /deep/ .ant-select-selection--single{
                    height: 24px;
                    line-height: 24px;
                }
                /deep/ .ant-select-selection__rendered{
                    line-height: 24px;
                }
            }
        }
    }
</style>