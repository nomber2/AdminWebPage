<template>

  <div>
    <BackTop></BackTop>

    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>activityAll</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px',minHeight: '500px', background: '#fff'}" >
      <BackTop></BackTop>
      <Input v-model="searchContent" @on-change="search1"  icon="search" placeholder="请输入关键字搜搜..."
             style="width: 30%; margin-bottom: 10px" />
      <Collapse v-model="value" accordion >
        <!--<Panel style="background-image: url(http://p9f10ih0f.bkt.clouddn.com/10.jpg);"  v-for="(info, index) in activityInfos" :key="index" >-->
          <!--<Button type="text">{{info.courseName}}</Button>-->
          <!--{{info.activityTitle}}-->
          <!--<Button :type="yangshi" style="float:right">{{info.activityStatus | status}}</Button>-->
          <!--<p slot="content" >-->
            <!--<Row style="background:#eee;padding:20px">-->
            <!--<Card style="width:580px; background-image: url(http://p9f10ih0f.bkt.clouddn.com/3kuangkuang.jpg);background-repeat: no-repeat">-->
              <!--<ul>-->
                <!--<li>活动发起人：{{info.userNickname}}</li>-->
                <!--<li>活动类型：{{info.activityType | group}}</li>-->
                <!--<li>活动标题：{{info.activityTitle}}</li>-->
                <!--<li>所属班课：{{info.courseName}}</li>-->
                <!--<li>班课班级：{{info.courseClass}}</li>-->
                <!--<li>活动分组：{{info.groupName }}</li>-->
                <!--<li>活动经验值：{{info.activityExperience}} 经验</li>-->
                <!--<li>活动内容：{{info.activityInfo}}</li>-->
                <!--<li>活动状态：{{info.activityStatus | status}}</li>-->
                <!--<li>开始时间：{{info.activityStartTime}}</li>-->
                <!--<li>截止时间：{{info.activityEndTime | endTime}}</li>-->
              <!--</ul>-->
           <!--</Card>-->
            <!--</Row>-->
            <!--<span></span><br>-->
          <!--</p>-->
        <!--</Panel>-->
        <Row style="padding-left: 10px">
          <Col span="12" v-for="(info, index) in activityInfos" :key="index" >
            <Card style="width:480px; margin-top: 20px; background-color: #91B493">
              <div style="text-align:center">
                <h2>{{info.activityTitle}}</h2>
                <h4>{{info.courseName}}</h4>
                <Button :type="yangshi" style="float:right">{{info.activityStatus | status}}</Button>
                <div style="background-color: #eeeeee; padding: 40px 20px 20px 20px; width: 450px">
                  <Card :bordered="false" style="width: 410px; background-image: url(http://p9f10ih0f.bkt.clouddn.com/yumao.jpg); background-repeat: no-repeat; background-size: cover;">
                    <ul style="text-align: left; padding: 100px 20px 30px 70px">
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
                </div>
              </div>
            </Card>
          </Col>
        </Row>
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
          activityInfos:[],
          newInfos:[],
          searchContent: '',
          yangshi: 'ghost'
        }
      },
      mounted() {
        const that = this;
        fly.get('activity/getAllActivityInfo')
          .then(function (response) {
            let temp = response.data;
            that.activityInfos = temp.data;
            that.newInfos = that.activityInfos;
            console.log(temp.data);
          });
        for (let i in that.activityInfos) {
          if (that.activityInfos[i].activityStatus === 0) {
            this.yangshi = 'ghost';
          } else if (that.activityInfos[i].activityStatus === 1) {
            this.yangshi = 'primary';
          } else {
            this.yangshi = 'dashed';
          }
        }

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

      },
      methods: {
        search1(){
          console.log(this.searchContent);
          if(this.searchContent === '' ){
            this.activityInfos = this.newInfos;
          }else {
            console.log(this.searchContent)
            this.activityInfos = [];
            for(var i in this.newInfos){
              if(this.newInfos[i].courseName.indexOf(this.searchContent) > -1
                || this.newInfos[i].activityTitle.indexOf(this.searchContent) > -1){
                this.activityInfos.push(this.newInfos[i]);
              }
            }
            console.log(this.activityInfos);
          }
        }
      }
    }
</script>

<style scoped>
  li {
    line-height: 30px;
  }
</style>
