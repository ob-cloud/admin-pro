<template>
    <div id="editor" name="editor" @afterPaste="afterPaste" class="right-ckeditor-document"></div>
</template>
<script>
    import  'jodit/build/jodit.css';
    import Jodit from 'jodit/build/jodit.js';

    export default {
        name: "index",
        props: {
            reloadText: {
                type: String
            },
        },
        data() {
            return {
                editor:{},
                joditButtons:['source','bold','strikethrough','underline','italic','eraser','|','superscript','subscript','|',
                    'ul','ol','|','outdent','indent','|','fontsize','brush','paragraph','|','image',
                    'table','link','|','align','|','symbol','hr','fullsize','print'],
            }
        },
        mounted() {
            this.editor = new Jodit('#editor',{
                askBeforePasteHTML:false,
                showXPathInStatusbar:false,
                askBeforePasteFromWord:false,
                language: "zh_cn",
                uploader:{
                    "insertImageAsBase64URI": true
                },
                buttons: this.joditButtons,
                buttonsMD: this.joditButtons,
                buttonsXS: this.joditButtons,
            });
            this.editor.events.on('afterPaste' ,()=>  {
                this.afterPaste();
            });
            this.editor.events.on('change' ,(new_value, old_value)=>  {
                this.getValue(new_value);
            });
            this.editor.value = this.reloadText;
        },
        methods: {
            afterPaste() {
                this.$emit('afterPaste');
            },
            getValue(new_value){
                this.$emit('getValue',new_value);
            },
        },
        watch: {
            reloadText() {
                this.editor.value = this.reloadText;
            }
        }
    }
</script>

<style scoped lang="less">
</style>
