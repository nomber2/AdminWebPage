<template>
  <div id="main1"></div>
</template>

<script>
import {$axiox} from "../../api";
let echart1 = require('echarts');
// let echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/pie');
export default {
  name: "PieCharts",
  data() {
    return {
      pieData: []
    }
  },
  mounted() {
    let myChart1 = echart1.init(document.getElementById('main1'));
    $axiox().get('lmy/user/idenSta').then((response) => {
      let tempData = response.data;
      this.pieData = tempData;
      myChart1.setOption({
        series: {
          type: 'pie',
          data: this.pieData
        }
      });
    }).catch((error) => {
      console.log("error")
    })
  }
}
</script>

<style scoped>
  #main1 {
    width: 500px;
    height: 400px;
  }
</style>
