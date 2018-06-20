<template>
  <div class="layout">
    <Layout>
        <div class="layout-nav">
          <ul class="layui-nav">
            <li class="layui-nav-item">
              <!--<Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="20"></Icon>-->
            </li>
              <li class="layui-nav-item">
                <a href=""><img src="https://static.cdn.oss.mosoteach.cn/mosoteach2/common/images/logo.png" class="logo"></a>
              </li>
              <li class="layui-nav-item youbian">
                <a href=""><img src="http://t.cn/RCzsdCq" class="layui-nav-img">我</a>
              </li>
              <li class="layui-nav-item">
                <a href="">退出<span class="layui-badge-dot"></span></a>
              </li>
          </ul>
        </div>
      <Layout>
        <Sider  ref="side1" hide-trigger collapsible :collapsed-width="60" v-model="isCollapsed">
          <i-menu active-name="1-2" theme="dark" width="auto" :open-names="['1'] " :class="menuitemClasses">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                用户管理
              </template>
              <MenuItem name="1-1"><router-link to="showAllUser" class="ziti">查看所有用户</router-link></MenuItem>
              <MenuItem name="1-2"><router-link to="userEcharts" class="ziti">用户图表统计</router-link></MenuItem>
            </Submenu>
            <MenuItem name="2-1">
              <Icon type="ios-navigate"></Icon>
              <router-link to="/permission" class="ziti"><span>权限管理</span></router-link>
            </MenuItem>
            <!--</Submenu>-->
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                班课管理
              </template>
              <MenuItem name="3-1"><router-link to="course" class="ziti">全部班课</router-link> </MenuItem>
              <MenuItem name="3-2"><router-link to="coursePic" class="ziti">班课图表</router-link> </MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                资源管理
              </template>
              <MenuItem name="4-1"><router-link to="resourceAll" class="ziti">全部资源</router-link> </MenuItem>
              <MenuItem name="4-2"><router-link to="resourceChart" class="ziti">资源图表</router-link> </MenuItem>
            </Submenu>
            <Submenu name="5">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                活动管理
              </template>
              <MenuItem name="5-1"><router-link to="activityAll" class="ziti">所有活动</router-link> </MenuItem>
              <MenuItem name="5-2"><router-link to="activityClassify" class="ziti">活动分类</router-link></MenuItem>
            </Submenu>
          </i-menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px', height: '600px'}">
          <router-view></router-view>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  export default {
    // data () {
    //   return {
    //     isCollapsed: false
    //   }
    // },
    // computed: {
    //   rotateIcon () {
    //     return [
    //       'menu-icon',
    //       this.isCollapsed ? 'rotate-icon' : ''
    //     ];
    //   },
    //   menuitemClasses () {
    //     return [
    //       'submenu',
    //       this.isCollapsed ? 'collapsed-menu' : ''
    //     ]
    //   }
    // },
    // methods: {
    //   collapsedSider () {
    //     this.$refs.side1.toggleCollapse();
    //   }
    // }
  }
</script>

<style scoped>
  .logo {
    width: 149px;
    height: 38px;
    margin-left: 50%;
  }

  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-nav{
    width: 100%;
    margin: 0 auto;
    margin-right: 20px;
  }

  .youbian {
    margin-left: 72%;
  }

  .ziti {
    color: #ffe;
  }

  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .menu-icon{
    transition: all .3s;
  }

  .rotate-icon{
    transform: rotate(-90deg);
  }

  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
