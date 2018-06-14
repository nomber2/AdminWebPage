<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem>permission</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <div class="chart" ref="chartOne" :style="{width: '500px', height: '500px'}"></div>
    </Content>
  </div>
</template>

<script>
  import axios from 'axios'
  //引入Echarts主模块
  let echarts = require('echarts/lib/echarts');
  //引入柱状图
  require('echarts/lib/chart/bar');
  //引入圆饼图
  require('echarts/lib/chart/pie');
  //引入所需组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');

  export default {
    data () {
      return {
        run: 0,
        end: 0
      }
    },

    mounted(){
      axios.get('http://localhost:8080/course/statusCount')
        .then((res) => {
          this.run = res.run;
          this.end = res.end;
          let chartOne=echarts.init(this.$refs.chartOne);
          chartOne.setOption({
            title : {
              text: '某站点用户访问来源',
              subtext: '纯属虚构',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['进行中的班课','已结束的班课']
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value: this.run, name:'进行中的班课'},
                  {value: this.end, name:'已结束的班课'},
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          });
        })

    },
  }
</script>

<style scoped>

</style>






//8888888888
