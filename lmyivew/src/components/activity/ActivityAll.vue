<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>activityAll</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <Collapse v-model="value" accordion>
        <Panel  v-for="(info, index) in activityInfos" :key="index" >
          <Button type="text">{{info.courseName}}</Button>
          {{info.activityTitle}}
          <Button type="ghost" style="float:right">{{info.activityStatus | status}}</Button>
          <p slot="content" >
            <Row style="background:#eee;padding:20px">
            <Card style="width:850px">
              <ul>
                <li>活动发起人：{{info.userNickname}}</li>
                <li>活动类型：{{info.activityType | group}}</li>
                <li>活动标题：{{info.activityTitle}}</li>
                <li>所属班课：{{info.courseName}}</li>
                <li>班课班级：{{info.courseClass}}</li>
                <li>活动分组：{{info.groupName }}</li>
                <li>活动经验值：{{info.activityExperience}} 经验</li>
                <li>活动内容：{{info.activityInfo}}</li>
                <li>活动状态：{{info.activityStatus | status}}</li>
                <li>开始时间：{{info.activityStartTime}}</li>
                <li>截止时间：{{info.activityEndTime | endTime}}</li>
              </ul>
           </Card>
            </Row>
            <span></span><br>

          </p>
        </Panel>
        <!--<Panel name="2">-->
          <!--斯蒂夫·盖瑞·沃兹尼亚克-->
          <!--<p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>-->
        <!--</Panel>-->
        <!--<Panel name="3">-->
          <!--乔纳森·伊夫-->
          <!--<p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>-->
        <!--</Panel>-->
      </Collapse>
    </Content>
  </div>
</template>

<script>
  var fly = require('flyio')
  fly.config.baseURL = "http://localhost:8080/"
    export default {
        name: "ActiveManage",
      data () {
        return {
          value: '1',
          activityNames:[],
          activityInfos:[],
        }
      },
      mounted() {
        const that = this;
        fly.get('activity/getAllActivityNames')
          .then(function (response) {
            let temp = response.data;
            that.activityNames = temp.data;
            console.log(that.activityNames);
          });
        fly.get('activity/getAllActivityInfo')
          .then(function (response) {
            let temp = response.data;
            that.activityInfos = temp.data;
            console.log(temp.data);
          });
      },
      filters: {
          status: function (status) {
            return status === 0 ? '未开始': status === 1 ? '进行中' : '已结束'
          },
          group: function (group) {
            return group === 0 ? '头脑风暴': '作业/小组任务'
          },
          endTime: function (time) {
            return time === null ? '未设置' : time
          }
      }
    }
</script>

<style scoped>
  li {
    line-height: 30px;
  }
</style>
