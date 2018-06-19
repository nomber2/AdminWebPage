<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem>showAllResources</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <Tabs value="name1">
        <TabPane label="资源类型" name="name1">
          <div style="background:#eee;padding: 20px" >
            <Collapse accordion v-model="value3">
              <Panel v-for="(resources, index) in resourcesByType" :key="index">
                {{index | type}}
                <div slot="content">
                  <Collapse accordion v-model="value4">
                    <Panel v-for="(resource, index) in resources" :key="index">
                      {{resource.resourceAsk}}
                      <p slot="content">
                        <Card style="width:850px">
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
              </Panel>
            </Collapse>
          </div>
        </TabPane>
        <TabPane label="所属班课" name="name2">
          <Collapse accordion v-model="value3">
            <Panel v-for="(resources, index) in resourcesByCourse" :key="index">
              {{index}}
              <div slot="content">
                <Collapse accordion v-model="value4">
                  <Panel v-for="(resource, index) in resources" :key="index">
                    {{index}}
                    <p slot="content">
                      <Card style="width:850px; margin: 20px 20px 20px 20px;" v-for="(res, index) in resource" :key="index">
                        <ul>
                          <li>学习要求：{{res.resourceKnowledge}}</li>
                          <li>知识点：{{res.resourceAsk}}</li>
                          <li>资源状态：{{res.resourceStatus | status}}</li>
                          <li>经验值：{{res.resourceExperience}}</li>
                          <li>资源链接：{{res.resourceUrl}}</li>
                        </ul>
                      </Card>
                    </p>
                  </Panel>
                </Collapse>
              </div>
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>
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
            resourcesByCourse: {},
            value3: '1',
            value4: '1',
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
      }
    }
</script>

<style scoped>

</style>
