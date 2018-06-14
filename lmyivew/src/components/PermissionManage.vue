<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem>permission</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <p>这里是权限管理</p>
    </Content>
  </div>
</template>

<script>
    export default {
        name: "PermissonManage"
    }
</script>

<style scoped>

</style>
