<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>permission</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '800px', background: '#fff'}">
      <div style="display: flex; text-align: center; vertical-align: center">
        <div style="display: flex; width: 80%; margin-top: 40px">
          <Card style=" background-color: #2b85e4; height: 100px; width: 220px; margin-right: 20px">
            <div style="text-align:center">
              <h3 class="shuzi">{{this.CountUser}}</h3>
              <h3 class="dahao">用户人数</h3>
            </div>
          </Card>
          <Card style="background-color: #19be6b; height: 100px; width: 220px; margin-right: 20px">
            <div style="text-align:center">
              <h3 class="shuzi">{{CountCourse}}</h3>
              <h3 class="dahao">班课总数</h3>
            </div>
          </Card>
          <Card style="background-color: #ff9900; height: 100px; width: 220px; margin-right: 20px">
            <div style="text-align:center">
              <h3 class="shuzi">{{CountAct}}</h3>
              <h3 class="dahao">活动总数</h3>
            </div>
          </Card>
          <Card style="background-color: #ed3f14; height: 100px; width: 220px; margin-right: 20px">
            <div style="text-align:center">
              <h3 class="shuzi">{{CountRes}}</h3>
              <h3 class="dahao">资源总数</h3>
            </div>
          </Card>
        </div>
        <div style=" margin-top: 10px;width: 20%; margin-left: 5px">
          <Card style="width:240px; height: 180px; vertical-align: middle">
            <div style="text-align:center">
              <img src="http://p9f10ih0f.bkt.clouddn.com/8.jpg" class="touxiang">
              <br>
              <span>昵称：朝小呆 </span><Icon type="female"></Icon>
              <h3>身份：管理员</h3>
              <h3>状态：在线中</h3>
            </div>
          </Card>

        </div>

      </div>

      <div class="tubiao" style="display: flex">
        <div style="width: 56%">
          <div style="display: flex">
            <div style="width: 50%; margin-left: -120px; margin-top: 30px">
              <CoursePic ></CoursePic>
            </div>
            <div style="width: 60%; margin-left: 90px">
              <BarCharts ></BarCharts>
            </div>
          </div>
          <PieChart></PieChart>
        </div>
        <div style="width: 44%; margin-left: 200px; background:#eee;padding: 20px">
          <h3 style="font-family: 方正舒体; font-size: 34px">推荐班课</h3>
          <div style="padding-top: 20px"  v-for="(course,index) in CourseTop3" :key="index">
            <Card :bordered="false">
              <p slot="title">{{course.courseName}}</p>
              <p>班课名称：{{course.courseName}}</p>
              <p>班课邀请码：{{course.courseInviteId}}</p>
              <p>班课创建者：{{course.courseCreateUser}}</p>
              <p>班课成员人数：{{course.userCount}}</p>
              <p>班课状态：{{course.courseStatus | status}}</p>
              <p>班课学校：{{course.courseSchool}}</p>
              <p>班课班级：{{course.courseClass}}</p>
            </Card>
          </div>
        </div>

      </div>
    </Content>
  </div>

</template>

<script>
    import LineChart from "./LineChart";
    import PieCharts from "../uservue/PieCharts";
    import PieChart from "../activity/PieChart";
    import CoursePic from "../course/CoursePic";
    import BarCharts from "../uservue/BarCharts"
    let fly = require('flyio')
    fly.config.baseURL = "http://localhost:8080/"
    export default {
        name: "Home",
      components: {PieCharts, LineChart,PieChart, CoursePic, BarCharts},
      data () {
        return {
          value: 0,
          CourseTop3: [],
          CountUser: 0,
          CountRes: 0,
          CountAct: 0,
          CountCourse: 0
        }
      },
      mounted () {
          const that = this;
          fly.get('course/detailCourse')
            .then(function (response) {
              that.CourseTop3 = response.data.data;
              console.log(that.CourseTop3);
            }),
            fly.get('user/getCountUser')
              .then(function (response) {
                that.CountUser = response.data.data;
                console.log(that.CountUser);
              }),
            fly.get('resource/getCountRes')
              .then(function (response) {
                that.CountRes = response.data.data;
                console.log(that.CountRes);
              }),
            fly.get('activity/getCountAct')
              .then(function (response) {
                that.CountAct = response.data.data;
                console.log(that.CountAct);
              }),
            fly.get('course/getCountCourse')
              .then(function (response) {
                that.CountCourse = response.data.data;
                console.log(that.CountCourse);
              })
      },
      filters: {
        status: function (status) {
          return status === 0 ? '进行中': '已结束'
        }

      }
    }
</script>

<style scoped>
  .touxiang {
    width: 80px;
    height: 80px;
    border-radius: 100px;
  }
  .tubiao {
    margin-left: 60px;
    margin-top: 50px;
  }

  .dahao {
    font-size: 20px;
  }

  .shuzi {
    font-size: 30px;
  }
</style>
