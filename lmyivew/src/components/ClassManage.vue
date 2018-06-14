<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem>class</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <p>这里是班课管理</p>
    </Content>
  </div>
</template>

<script>
    export default {
        name: "ClassManage"
    }
</script>

<style scoped>

</style>
