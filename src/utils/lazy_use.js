import Vue from 'vue'
import {Layout, Menu, Icon, Popover, Tabs, Form, Button, Input, Modal, Message, Row, Col, Select, Checkbox, Table, Upload, Tree, Divider, Radio, TreeSelect, Drawer, spin, pagination, Tag, List, LocaleProvider,configProvider, DatePicker, Cascader, InputNumber, Tooltip, Empty, progress, statistic,Rate,Carousel,Skeleton} from 'ant-design-vue'

Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Popover)
Vue.use(Tabs)
Vue.use(Form)
Vue.use(Button)
Vue.use(Input)
Vue.use(Modal)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Checkbox)
Vue.use(Table)
Vue.use(Upload)
Vue.use(Tree)
Vue.use(Divider)
Vue.use(Radio)
Vue.use(TreeSelect)
Vue.use(Drawer)
Vue.use(Tag)
Vue.use(pagination)
Vue.use(List)
Vue.use(LocaleProvider)
Vue.use(Cascader)
Vue.use(Tooltip)
Vue.use(InputNumber)
Vue.use(Message)
Vue.use(spin)
Vue.use(DatePicker)
Vue.use(Empty)
Vue.use(configProvider)
Vue.use(progress)
Vue.use(statistic)
Vue.use(Rate)
Vue.use(Carousel)
Vue.use(Skeleton)

Vue.prototype.$modal = Modal
Vue.prototype.$message = Message

Vue.prototype.$message.config({
    // top: `100px`,
    duration: 2,
    maxCount: 1,
});
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1577591_7wxy0k4a2d5.js',
});
Vue.component('IconFont', IconFont)
