<template>
  <div>
    <script :id=id type="text/plain"></script>
    <Button @click="getUEContent" style="margin-top: 10px">保存</Button>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
      console.log("上传这堆错误不用理会，上传接口需自行开发配置");
    },
    methods: {
      getUEContent() { // 获取内容方法
        const that = this;
        const h = this.$createElement;


        axios.post('http://120.79.26.171:8080/lmy/editor', {
          content: that.editor.getContent()
        })
          .then(function (response) {
            that.$message({
              type: 'success',
              message: '保存成功'
            });
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(this.editor.getContent());

        return this.editor.getContent()
      },
      getUEContentTxt() { // 获取纯文本内容方法
        return this.editor.getContentTxt()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
