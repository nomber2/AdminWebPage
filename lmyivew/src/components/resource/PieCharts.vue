<template>
  <div id="main1"></div>
</template>

<script>
  let echarts3 = require('echarts/lib/echarts');
  require('echarts/lib/chart/pie')
  var fly3 = require('flyio')
  fly3.config.baseURL = "http://localhost:8080/"
export default {
  name: "PieCharts",
  data() {
    return {
      pieData: []
    }
  },
  mounted() {
    const that = this;
    let myChart1 = echarts3.init(document.getElementById('main1'));
    fly3.get('resource/resourceTypeIden')
      .then(function (response) {
      let tempData = response.data.data;
      that.pieData = tempData;
      myChart1.setOption({
        series: {
          type: 'pie',
          data: that.pieData
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
