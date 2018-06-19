<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem>permission</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '800px', background: '#fff'}">
      <div style="display: flex">
        <Carousel autoplay v-model="value" loop class="lunbo">
          <CarouselItem>
            <div class="demo-carousel"><router-link to="showAllUser"> <img src="http://p9f10ih0f.bkt.clouddn.com/grass4.jpg" class="pic"> </router-link></div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel"><router-link to=""><img src="http://p9f10ih0f.bkt.clouddn.com/haokan.jpg" class="pic"> </router-link> </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel"><router-link to=""><img src="http://p9f10ih0f.bkt.clouddn.com/grass4.jpg" class="pic"> </router-link></div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel"><router-link to=""><img src="http://p9f10ih0f.bkt.clouddn.com/haokan.jpg" class="pic"> </router-link></div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel"><router-link to=""><img src="http://p9f10ih0f.bkt.clouddn.com/grass4.jpg" class="pic"> </router-link></div>
          </CarouselItem>
        </Carousel>
      </div>
      <div style=" margin-top: 50px; margin-left: 40px">
        <Card style="width:300px;">
          <div style="text-align:center">
            <img src="http://p9f10ih0f.bkt.clouddn.com/8.jpg" class="touxiang">
            <br>
            <span>昵称：朝小呆 </span><Icon type="female"></Icon>
            <h3>身份：管理员</h3>
            <h3>状态：在线中</h3>
          </div>
        </Card>
      </div>

    </Content>
  </div>

</template>

<script>
    export default {
        name: "Home",
      data () {
        return {
          value: 0
        }
      }
    }
</script>

<style scoped>
  .lunbo {
    height: 300px;
    width: 70%;
  }
  .pic {
    height: 300px;
    width: 100%;
  }
  .touxiang {
    width: 80px;
    height: 80px;
    border-radius: 100px;
  }
</style>
