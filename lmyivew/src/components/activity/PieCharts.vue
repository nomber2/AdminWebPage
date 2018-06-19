<template>
  <div id="main3" style="width: 900px;height:400px;"></div>
</template>

<script>
  let echarts3 = require('echarts/lib/echarts');
  require('echarts/lib/chart/pie')
  var fly1 = require('flyio')
  fly1.config.baseURL = "http://localhost:8080/"
    export default {
        name: "PieCharts",
      data() {
          return {
            activityClassify: [],
            activityStatusGroup: []
          }
      },
      created() {
          const that = this;
          fly1.get('activity/getActByStatusGroup')
            .then(function (response) {
              that.activityStatusGroup = response.data.data;
              console.log(that.activityStatusGroup);
              fly1.get('activity/getActByMakerGroup')
                .then(function (response) {
                  let temp = response.data.data;
                  that.activityClassify = temp;
                  let myChart3 = echarts3.init(document.getElementById('main3'));
                  let option = {
                    // backgroundColor: '#2c343c',

                    title: {
                      text: '南丁格尔玫瑰图',
                      subtext: '纯属虚构',
                      x: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                      x: 'center',
                      y: 'bottom',
                      data: that.makers
                    },
                    toolbox: {
                      show: true,
                      feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {
                          show: true,
                          type: ['pie', 'funnel']
                        },
                        restore: {show: true},
                        saveAsImage: {show: true}
                      }
                    },
                    calculable: true,
                    series: [
                      {
                        name:'半径模式',
                        type:'pie',
                        radius : [20, 110],
                        center : ['25%', '50%'],
                        roseType : 'radius',
                        label: {
                          normal: {
                            show: false
                          },
                          emphasis: {
                            show: true
                          }
                        },
                        lableLine: {
                          normal: {
                            show: false
                          },
                          emphasis: {
                            show: true
                          }
                        },
                        data:that.activityStatusGroup
                      },
                      {
                        name: '面积模式',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['75%', '50%'],
                        roseType: 'area',
                        data: that.activityClassify
                      }
                    ],
                  };
                  myChart3.setOption(option);
                })
            })


      }
    }
</script>

<style scoped>

</style>
