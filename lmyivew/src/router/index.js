import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ShowAllUser from '@/components/uservue/ShowAllUser'
import UserECharts from '@/components/uservue/UserECharts'
import MainPermission from '@/components/permission/MainPermission'
import AllCourse from '@/components/course/AllCourse'
import CoursePic from '@/components/course/CoursePic'
import ActivityAll from '@/components/activity/ActivityAll'
import ActivityClassify from '@/components/activity/ActivityClassify'
import ResourceAll from '@/components/resource/ResourceAll'
import ResourceChart from '@/components/resource/ResourceChart'
import Home from '@/components/home/Home'


Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: Home
        },
        {
          path: '/showAllUser',
          component: ShowAllUser
        },
        {
          path: '/userEcharts',
          component: UserECharts
        },
        {
          path: '/permission',
          component: MainPermission
        },
        {
          path: '/course',
          component: AllCourse
        },
        {
          path: '/coursePic',
          component: CoursePic
        },
        {
          path: '/activityAll',
          component: ActivityAll
        },
        {
          path: '/activityClassify',
          component: ActivityClassify
        },
        {
          path: '/resourceAll',
          component: ResourceAll
        },
        {
          path: '/resourceChart',
          component: ResourceChart
        }

      ]
    },

  ]
})
