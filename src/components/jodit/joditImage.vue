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
            authorization:{
                type: String
            },
            uploadParams:{
                type:Object
            }
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
            let _this =this;
            this.editor = new Jodit('#editor',{
                askBeforePasteHTML:false,
                showXPathInStatusbar:false,
                askBeforePasteFromWord:false,
                language: "zh_cn",
                uploader:{
                    url:process.env.VUE_APP_BASE_FILESERVER_URL + "/file_upload",
                    insertImageAsBase64URI: false,
                    imagesExtensions: [
                        "jpg",
                        "png",
                        "jpeg",
                        "gif"
                    ],
                    filesVariableName: function(t){return "files["+t+"]"},
                    withCredentials: false,
                    pathVariableName: "path",
                    format: "json",
                    method: "POST",
                    prepareData: function (formdata) {
                        let file = formdata.getAll("files[0]")[0];
                        formdata.append("file", file);
                        formdata.append("bizType", _this.uploadParams.bizType);
                        formdata.append("subBizType", _this.uploadParams.subBizType);
                        formdata.append("orderIndex", _this.uploadParams.orderIndex);
                        formdata.append("bizId", _this.uploadParams.bizId);
                        return formdata;
                    },
                    headers: {"Authorization":this.authorization},
                    isSuccess: function (e) {
                        return e.data;
                    },
                    getMessage: function (e) {
                        return void 0 !== e.data.messages && Array.isArray(e.data.messages) ? e.data.messages.join("") : ""
                    },
                    process: function (resp) {
                        var arrfile = [];
                        arrfile.unshift(resp.data);
                        return {
                            files: arrfile,
                            path: '',
                            baseurl: '',
                            error: resp.msg,
                            msg: resp.msg
                        };
                    },
                    error: function (e) {
                        this.jodit.events.fire("errorMessage", e.message, "error", 4e3)
                    },
                    defaultHandlerSuccess: function (t) {
                        var e=this;t.files&&t.files.length&&t.files.forEach((function(o,i){var n=o.id?['img','src']:['a','href'],r=n[0],a=n[1],s=e.jodit.create.inside.element(r);s.setAttribute(a,o.origin),'a'===r&&(s.textContent=o.origin),('img'===r?e.jodit.selection.insertImage(s,null,e.jodit.options.imageDefaultWidth):e.jodit.selection.insertNode(s))}))
                    },
                    defaultHandlerError: function (e) {
                        this.jodit.events.fire("errorMessage", e.message)
                    },
                    contentType: function (e) {
                        return (void 0 === this.jodit.ownerWindow.FormData || "string" == typeof e) &&
                            "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                },
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
