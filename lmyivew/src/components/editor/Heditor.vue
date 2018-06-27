<template>
  <div id='heditor'>

    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <div class="grid-content bg-purple">
          <el-card class="box-card" v-for="(item, index) in content" :key="index">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <Avatar :src=item.object.avator size="large" /> {{item.object.author}}
                  <br>

                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                     {{item.time}}
                </div>
              </el-col>
            </el-row>
            <div v-html="htmlDecodeByRegExp(item.object.content)" style="margin-top:2%"></div>

          </el-card>


        </div>
      </el-col>
    </el-row>


  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Heditor',
    data() {
      return {
        content: []

      }
    },
    created() {
      this.dataInit()

    },
    methods: {
      dataInit: function () {
        const that = this
        axios.get('http://120.79.26.171:8080/lmy/editor')
          .then(function (response) {
            that.content = response.data.reverse()
            console.log(that.content);
          })
          .catch(function (error) {
            console.log(error);
          });


      },
      htmlDecodeByRegExp: function (str) {

        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        return s;
      }

    }
  }

</script>
