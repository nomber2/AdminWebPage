<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>showAllResources</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <div>
      <Tabs value="name1">
        <TabPane label="资源类型" name="name1">
          <!--<div style="background:#eee;padding: 20px" >-->
            <!--<Collapse accordion v-model="value3">-->
              <!--<Panel v-for="(resources, index) in resourcesByType" >-->
                <!--{{index | type}}-->
                <!--<div slot="content">-->
                  <!--<Collapse accordion v-model="value4">-->
                    <!--<Panel v-for="(resource, index) in resources" >-->
                      <!--{{resource.resourceAsk}}-->
                      <!--<p slot="content">-->
                        <!--<Card style="width:850px">-->
                          <!--<ul>-->
                           <!--<li>学习要求：{{resource.resourceAsk}}</li>-->
                            <!--<li>知识点：{{resource.resourceKnowledge}}</li>-->
                            <!--<li>资源状态：{{resource.resourceStatus | status}}</li>-->
                            <!--<li>经验值：{{resource.resourceExperience}}</li>-->
                            <!--<li>资源链接：{{resource.resourceUrl}}</li>-->
                          <!--</ul>-->
                        <!--</Card>-->
                      <!--</p>-->
                    <!--</Panel>-->
                  <!--</Collapse>-->
                <!--</div>-->
              <!--</Panel>-->
            <!--</Collapse>-->
          <!--</div>-->


          <div v-for="(item, index) in resourcesByType" :key="index" style="display: inline-block;">
            <Card :id="generated(index)" style="text-align: left">
              <Button @click="showType(index)">{{index | type}}</Button>
              <div style="background-color: rgba(86,108,115,0.2);margin-top: 20px; width: 500px; padding: 20px 20px 20px 20px; display: none" :id="panelID(index)">
                <Collapse v-model="value2" accordion>
                  <Panel v-for="(resource, index) in item" :key="index" >
                    {{resource.resourceAsk}}
                    <p slot="content">
                      <Card style="width:430px; text-align: left; padding-left: 10px; background-color: rgba(168,216,185,0.5);">
                        <ul>
                          <li>学习要求：{{resource.resourceAsk}}</li>
                          <li>知识点：{{resource.resourceKnowledge}}</li>
                          <li>资源状态：{{resource.resourceStatus | status}}</li>
                          <li>经验值：{{resource.resourceExperience}}</li>
                          <li>资源链接：{{resource.resourceUrl}}</li>
                        </ul>
                      </Card>
                    </p>
                  </Panel>
                </Collapse>

              </div>
            </Card>
          </div>

        </TabPane>
        <TabPane label="所属班课" name="name2">
          <!--<Collapse accordion v-model="value3">-->
            <!--<Panel v-for="(resources, index) in resourcesByCourse" :key="index">-->
              <!--{{resources.courseName}}-->
              <!--<div slot="content">-->
                <!--<Collapse accordion v-model="value4">-->
                  <!--<Panel v-for="(resource, index) in resources" :key="index">-->
                    <!--{{index}}-->
                    <!--<p slot="content">-->
                      <!--<Card style="width:850px; margin: 20px 20px 20px 20px;" v-for="(res, index) in resource" :key="index">-->
                        <!--<ul>-->
                          <!--<li>学习要求：{{res.resourceKnowledge}}</li>-->
                          <!--<li>知识点：{{res.resourceAsk}}</li>-->
                          <!--<li>资源状态：{{res.resourceStatus | status}}</li>-->
                          <!--<li>经验值：{{res.resourceExperience}}</li>-->
                          <!--<li>资源链接：{{res.resourceUrl}}</li>-->
                        <!--</ul>-->
                      <!--</Card>-->
                    <!--</p>-->
                  <!--</Panel>-->
                <!--</Collapse>-->
              <!--</div>-->
            <!--</Panel>-->
          <!--</Collapse>-->


          <Row>
          <div v-for="(resources, index) in resourcesByCourse" :key="index">

              <Col span="8">
                <div style="margin-top: 30px; margin-left: 10px; " >
                  <div style="display: block;" :id="kapian(index)">
                    <img :src="resources.courseLogoURL" style="width: 100%; height: 160px; border-radius: 10px">
                  </div>
                  <Button long @click="showCourseByClass(index)">{{resources.courseName}}</Button>
                  <div style="display: none;" :id="KechengID(index)">
                    <Card v-for="(item, index) in resources.groupResourceList" :key="index" style="background-color: #e9eaec" >
                    <Button type="warning">{{index}}</Button>
                        <Card v-for="(resource, index) in item" :key="index" style="margin-top: 5px; background-color: rgba(168,216,185,0.5);">
                          <ul>
                            <li>学习要求：{{resource.resourceKnowledge}}</li>
                            <li>知识点：{{resource.resourceAsk}}</li>
                            <li>资源状态：{{resource.resourceStatus | status}}</li>
                            <li>经验值：{{resource.resourceExperience}}</li>
                            <li>资源链接：{{resource.resourceUrl}}</li>
                          </ul>
                        </Card>
                  </Card>
                  </div>
                </div>

              </Col>


          </div>
          </Row>


        </TabPane>
      </Tabs>
      </div>
    </Content>
  </div>
</template>

<script>
  var fly2 = require('flyio')
  fly2.config.baseURL = "http://localhost:8080/"

    export default {
        name: "ResourceAll",
      data() {
          return {
            resourcesByType: {
            },
            resourcesByCourse:[],
            value2: '1',
            value3: '1',
            value4: '1',
            showIndex: null,
          }
      },
      created() {
        const that = this;
        fly2.get('resource/queryResourceType')
          .then(function (response) {
            let temp = response.data.data;
            that.resourcesByType = temp;
          })
        fly2.get('resource/queryResourceByCourse')
          .then(function (response) {
            let  temp = response.data.data;
            that.resourcesByCourse = temp;
            console.log("课程："+temp);
          })
      },
      filters: {
        type: function (type) {
          return type === '0' ? '视频': type === '1' ? '音频' : type === '2' ? '图片' : '文档'
        },
        status: function (status) {
          return status === 0 ? '已发布' : '未发布'
        }
      },
      methods: {
          generated: function (index) {
            return 'div' + index
          },
          panelID: function (index) {
            return 'panel' + index
          },
          kapian: function (index) {
              return 'kapian' + index
          },
          KechengID: function (index) {
            return 'kecheng' + index
          },
          showType: function (index) {
            let panel = window.document.getElementById('panel' + index);
            let div = window.document.getElementById("div" + index);
            console.log("panel" + index);
            console.log(panel);
            if (panel.style.display == "none") {
              panel.style.display = "block";
              div.style.backgroundColor = "#91B493";
            } else {
              panel.style.display = "none";
              div.style = "#div" + index;
            }
          },
          showCourseByClass: function (index) {
            let card = window.document.getElementById("kapian" + index);
            let div = window.document.getElementById("kecheng" + index);
            console.log(card);
            console.log(div);
            if (div.style.display == "none") {
              card.style.display = "none";
              div.style.display = "block";
            } else {
              div.style.display = "none";
              card.style.display = "block";
            }
          }

      }
    }
</script>

<style scoped>
  #div0 {
    margin-left: 60px;
    background-color: #2d8cf0;
  }
  #div1 {
    margin-left: 60px;
    background-color: #19be6b;
  }
  #div2 {
    margin-left: 60px;
    background-color: #ff9900;
  }
  #div3 {
    margin-left: 60px;
    background-color: #ed3f14;
  }
</style>
