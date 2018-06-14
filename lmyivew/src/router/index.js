import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ShowAllUser from '@/components/uservue/ShowAllUser'
import UserECharts from '@/components/uservue/UserECharts'
import Permission from '@/components/permission/Permission'
import AllCourse from '@/components/course/AllCourse'
import CoursePic from '@/components/course/CoursePic'
import ActivityAll from '@/components/activity/ActivityAll'
import ActivityClassify from '@/components/activity/ActivityClassify'


Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [
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
          component: Permission
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
        }

      ]
    },

  ]
})
