<template>
  <div class="layout">
    <Layout>
        <div class="layout-nav">
          <ul class="layui-nav">
            <li class="layui-nav-item">
              <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="20"></Icon>
            </li>
              <li class="layui-nav-item">
                <a href="../static/logo.png" id="logo"><img src="http://p9f10ih0f.bkt.clouddn.com/logo1.png" class="logo"></a>
              </li>
              <li class="layui-nav-item youbian">
                <a href="../static/8.jpg" id="avatar"><img src="http://p9f10ih0f.bkt.clouddn.com/8.jpg" class="layui-nav-img">我</a>
              </li>
              <li class="layui-nav-item">
                <router-link to="login">退出<span class="layui-badge-dot"></span></router-link>
              </li>
          </ul>
        </div>
      <Layout>
        <Sider  ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">

          <Menu  active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
            <!--<Submenu name="1">-->
              <!--<template slot="title">-->
                <!--<Icon type="ios-navigate"></Icon>-->
                <!--用户管理-->
              <!--</template>-->
              <!--<MenuItem name="1-1"><router-link to="showAllUser" class="ziti">查看所有用户</router-link></MenuItem>-->
              <!--&lt;!&ndash;<MenuItem name="1-2"><router-link to="userEcharts" class="ziti">用户图表统计</router-link></MenuItem>&ndash;&gt;-->
            <!--</Submenu>-->
            <MenuItem name="1-1">
              <Icon type="ios-people"></Icon>
              <router-link to="/showAllUser" class="ziti"><span>用户管理</span></router-link>
            </MenuItem>
            <MenuItem name="2-1">
              <Icon type="person-add"></Icon>
              <router-link to="/permission" class="ziti"><span>权限管理</span></router-link>
            </MenuItem>
            <MenuItem name="3-1">
              <Icon type="ios-pricetags"></Icon>
              <router-link to="/course" class="ziti"><span>班课管理</span></router-link>
            </MenuItem>
            <MenuItem name="4-1">
              <Icon type="android-cloud-done"></Icon>
              <router-link to="/resourceAll" class="ziti"><span>资源管理</span></router-link>
            </MenuItem>
            <MenuItem name="5-1">
              <Icon type="ios-speedometer"></Icon>
              <router-link to="/activityAll" class="ziti"><span>活动管理</span></router-link>
            </MenuItem>
            <!--</Submenu>-->
            <!--<Submenu name="3">-->
              <!--<template slot="title">-->
                <!--<Icon type="ios-analytics"></Icon>-->
                <!--班课管理-->
              <!--</template>-->
              <!--<MenuItem name="3-1"><router-link to="course" class="ziti">全部班课</router-link> </MenuItem>-->
              <!--&lt;!&ndash;<MenuItem name="3-2"><router-link to="coursePic" class="ziti">班课图表</router-link> </MenuItem>&ndash;&gt;-->
            <!--</Submenu>-->
            <!--<Submenu name="4">-->
              <!--<template slot="title">-->
                <!--<Icon type="ios-analytics"></Icon>-->
                <!--资源管理-->
              <!--</template>-->
              <!--<MenuItem name="4-1"><router-link to="resourceAll" class="ziti">全部资源</router-link> </MenuItem>-->
              <!--&lt;!&ndash;<MenuItem name="4-2"><router-link to="resourceChart" class="ziti">资源图表</router-link> </MenuItem>&ndash;&gt;-->
            <!--</Submenu>-->
            <!--<Submenu name="5">-->
              <!--<template slot="title">-->
                <!--<Icon type="ios-analytics"></Icon>-->
                <!--活动管理-->
              <!--</template>-->
              <!--<MenuItem name="5-1"><router-link to="activityAll" class="ziti">所有活动</router-link> </MenuItem>-->
              <!--&lt;!&ndash;<MenuItem name="5-2"><router-link to="activityClassify" class="ziti">活动分类</router-link></MenuItem>&ndash;&gt;-->
            <!--</Submenu>-->
          </Menu >
        </Sider>
        <Layout :style="{padding: '0 24px 24px', height: '600px'}">
          <router-view></router-view>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  $(function () {
    $('a#logo').lightBox();
// lightBox 的使用范围是根据 jQuery 选择器来设置的，所以可以有更多的设置方法，例如：
    $('a#logo.lightbox').lightBox();
    $('a#avatar').lightBox();
    $('a#avatar.lightbox').lightBox();
  })
  export default {
    data () {
      return {
        isCollapsed: false
      }
    },
    computed: {
      rotateIcon () {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
    },
    methods: {
      collapsedSider () {
        this.$refs.side1.toggleCollapse();
      }
    }
  }
</script>

<style scoped>
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
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
  .logo {
    width: 180px;
    height: 70px ;
    margin-left: 50%;
    padding: 5px 5px 5px 5px;
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
    margin-left: 68%;
  }

  .ziti {
    color: #ffe;
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
