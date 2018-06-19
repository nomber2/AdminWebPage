<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem>resourceCharts</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <PieCharts></PieCharts>
    </Content>
  </div>
</template>

<script>
    import PieCharts from "../resource/PieCharts";
    export default {
        name: "ResourceChart",
      components: {PieCharts}
    }
</script>

<style scoped>

</style>
