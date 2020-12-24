<template>
    <a-select placeholder="选择所属角色" @change="handleChange" v-model="value" :disabled="infoStatus">
        <a-select-option v-for="d in data" :key="d.id">{{d.name}}</a-select-option>
    </a-select>
</template>

<script>
    import {roleSimpleList,roleGet} from '@/api/set';

    const data = [];
    const value= undefined;
    export default {
        name:"setRole",
        props:["infoStatus"],
        data() {
            return {
                data,
                value:value,
            };
        },
        created: function () {
            this.roleListAll();
        },
        methods: {
            handleChange(value) {
                this.$emit('getSelectRoleId',value);
            },
            roleListAll() {
                let parameter={};
                //创建部门
                roleSimpleList(parameter).then(res => {
                    this.data =res.data;
                });
            },
            initRoleName(selectedKey){
                if(selectedKey != ""){
                    roleGet(selectedKey).then(res => {
                        this.value = res.data.name;
                    });
                }
            }
        }
    };
</script>