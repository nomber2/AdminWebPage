<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>userEcharts</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <div class="charts">
        <Row :gutter="10">
          <Col span="12">
            <Card>
              <PieCharts></PieCharts>
            </Card>
          </Col>
          <Col span="12">
            <Card>
              <BarCharts></BarCharts>
            </Card>
          </Col>
        </Row>

      </div>
    </Content>
  </div>

</template>

<script>
import PieCharts from './PieCharts.vue'
import BarCharts from './BarCharts.vue'
export default {
  name: "UserECharts",
  components: {
    PieCharts,
    BarCharts
  }
}
</script>

<style scoped>

</style>
