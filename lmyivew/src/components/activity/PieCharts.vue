<template>
  <div id="main3" style="width: 600px;height:400px;"></div>
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
            makers: [],
            count: []
          }
      },
      mounted() {
          const that = this;
        fly1.get('activity/getActByMakerGroup')
          .then(function (response) {
            let temp = response.data.data;
            that.activityClassify = temp;

            for (let i = 0; i < temp.length; i ++) {
              let maker = temp[i].value;
              let count = temp[i].name;
              that.makers.push(maker);
              that.count.push(count);
            }
            // console.log(that.activityClassify);
            // console.log(that.makers);
            let myChart3 = echarts3.init(document.getElementById('main3'));
            let option = {
              backgroundColor: '#2c343c',

              title : {
                text: '南丁格尔玫瑰图',
                subtext: '纯属虚构',
                x:'center'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                x : 'center',
                y : 'bottom',
                data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
              },
              toolbox: {
                show : true,
                feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                  },
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              calculable : true,
              series : [
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
                  data:[
                    {value:10, name:'rose1'},
                    {value:5, name:'rose2'},
                    {value:15, name:'rose3'},
                    {value:25, name:'rose4'},
                    {value:20, name:'rose5'},
                    {value:35, name:'rose6'},
                    {value:30, name:'rose7'},
                    {value:40, name:'rose8'}
                  ]
                },
                {
                  name:'面积模式',
                  type:'pie',
                  radius : [30, 110],
                  center : ['75%', '50%'],
                  roseType : 'area',
                  data:[
                    {value:10, name:'rose1'},
                    {value:5, name:'rose2'},
                    {value:15, name:'rose3'},
                    {value:25, name:'rose4'},
                    {value:20, name:'rose5'},
                    {value:35, name:'rose6'},
                    {value:30, name:'rose7'},
                    {value:40, name:'rose8'}
                  ]
                }
              ],
            myChart3.setOption(option);
          })

      }
    }
</script>

<style scoped>

</style>
