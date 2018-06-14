<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem>settings</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <p>这里是系统设置</p>
    </Content>
  </div>
</template>

<script>
    export default {
        name: "Setting"
    }
</script>

<style scoped>

</style>
