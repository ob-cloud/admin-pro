<template>
    <div class="checkgroup">
        <div>
            <div>
                <!-- 总的 -->
                <a-checkbox
                        style="color:#777777;"
                        v-model="fatherHave"
                        @change="fatherChange"
                        :disabled="father.mark.indexOf('ck') > -1&&fatherHave"
                >{{father.name.length > 7 ? father.name=father.name.substring(0,6)+'...' : father.name}}</a-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            },
            allName: {
                type: Array,
                required: true
            },
            random: {
                type: Number
            },
            Upper: {
                type: Object,
                default: undefined
            },
            changeCK: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                father: this.data,
                fatherHave: this.data.have,
                children: this.data.children,
                childrenName: [],
                allNames: this.allName
            };
        },
        mounted() {
            this.$nextTick(() => {
                for (const item of this.data.children) {
                    if (item.have) {
                        this.childrenName.push(item.name);
                    }
                }
            });
        },
        methods: {
            fatherChange(ischeck, isRandom) {
                // 爸爸说了算
                // this.indeterminate = false; // 未全部选中的状态 暂时先不搞吧==
                // 如果选中了爸爸 那么等于全部  else 置空
                if(!isRandom){
                    if(ischeck.target){
                        ischeck = ischeck.target.checked;
                    }
                }
                if (ischeck) {
                    this.childrenName = this.allNames;
                    // this.updateData()
                    this.fatherHave = true;
                } else if (ischeck === false) {
                    this.childrenName = [];
                    this.fatherHave = false;
                }
                if (isRandom !== true && ischeck !== undefined) {
                    this.updateData();
                }
            },
            childrenChange() {
                // 当子元素改变的时候
                // 查看有没有一个是false
                // console.log(this.childrenName.length)
                if (this.childrenName.length === 0) {
                    this.fatherHave = false;
                } else {
                    this.fatherHave = true;
                }
                // console.log(this.fatherHave)
                this.updateData();
            },
            updateData() {
                // 更新父级data 根据childrenName 改变数据的have 再传回去
                for (const item of this.father.children) {
                    if (this.childrenName.some(child => child === item.name)) {
                        item.have = true;
                    } else {
                        item.have = false;
                    }
                }
                // console.log(this.childrenName)
                const updateData = JSON.parse(JSON.stringify(this.father));
                updateData.have = this.fatherHave;
                this.$emit('updateData', updateData);
            }
        },
        watch: {
            // data: {
            //   handler: function(val, oldVal) {
            //   },
            //   deep: true
            // },
            random(n) {
                // 使用随机数激活 是因为如果监听data group的变化会改变父级data 然后再次激活group
                this.childrenName = [];
                this.fatherChange(this.data.have, true);
                // this.fatherHave = this.data.have;
            },
            changeCK(n) {
                // 查看
                if (n.indexOf(this.data.id) > -1) {
                    this.fatherHave = true;
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .checkgroup {
        width: 100%;
        &-father {
            width: 100%;
        }
        &-child {
            float: left;
        }
    }
</style>
