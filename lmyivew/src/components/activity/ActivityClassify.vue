<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>ActivityClassify</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <PieCharts></PieCharts>
    </Content>
  </div>
</template>

<script>
  import PieCharts from "./PieChart";

  var fly = require('flyio')
  fly.config.baseURL = "http://localhost:8080/"

    export default {
      name: "ActivityClassify",
      components: {PieCharts},
      data() {
        return {
          maker: [],
          classifyAct: []
        }
      },
      methods: {
        changeLimit() {
          function getArrayItems(arr, num) {
            const temp_array = [];
            for (let index in arr) {
              temp_array.push(arr[index]);
            }
            const return_array = [];
            for (let i = 0; i < num; i++) {
              if (temp_array.length > 0) {
                const arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
              } else {
                break;
              }
            }
            return return_array;
          }

          this.randomMovieList = getArrayItems(this.movieList, 5);
        }
      }

    }

</script>

<style scoped>

</style>
