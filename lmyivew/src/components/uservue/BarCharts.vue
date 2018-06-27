<template>
    <div id="main2"></div>
</template>

<script>
import {$axiox} from "../../api";
let echart2 = require('echarts/lib/echarts');
require('echarts/lib/chart/bar')
export default {
  name: "BarCharts",
  data() {
    return {
      schoolName:[],
      schoolValue:[]
    }
  },
  mounted() {
    let myChart2 = echart2.init(document.getElementById('main2'));
    $axiox().get('lmy/user/schoolSta').then((response) => {
      let tempData = response.data;
      this.schoolName = tempData.names;
      this.schoolValue = tempData.values
      myChart2.setOption({
        title : {
          text: '用户学校分布',
          subtext: '数据来源于数据库',
          x:'center'
        },
        xAxis: {
          type: 'category',
          data: this.schoolName
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.schoolValue,
          type: 'bar'
        }]
      });
    }).catch((error) => {
      console.log("erroe")
    });
  }
}
</script>

<style scoped>
#main2 {
  width: 500px;
  height: 400px;
  /*margin-top: -50px;*/
}
</style>
