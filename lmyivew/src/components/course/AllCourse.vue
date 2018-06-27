<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>permission</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <div>
        <el-input v-model="search" suffix-icon="el-icon-search" @change="query" placeholder="请输入搜索内容" style="width: 200px">
        </el-input>
        <br/>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          height="550">
          <el-table-column
            prop="courseId"
            label="班课ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="courseName"
            label="班课名称">
          </el-table-column>
          <el-table-column
            prop="courseClass"
            label="班课班级">
          </el-table-column>
          <el-table-column
            prop="courseInviteId"
            label="班课邀请码">
          </el-table-column>
          <el-table-column
            prop="courseType"
            label="班课类型"
            :filters="[{text: '学校代表班课', value: '学校代表班课'}, {text: '自定义班课', value: '自定义班课'}]"
            :filter-method="filterHandler">
          </el-table-column>
          <el-table-column
            prop="createUserAccount"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="courseStatus"
            label="班课状态"
            :filters="[{ text: '进行中', value: '进行中' }, { text: '已结束', value: '已结束'}]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.courseStatus === '进行中' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.courseStatus}}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </Content>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        tableData: [],
        cloneData: [],
        search:'',
      }
    },
    methods:{
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      filterTag(value, row) {
        return row.courseStatus === value;
      },
      dataInit(){
        let that = this;
        axios.get('http://120.79.26.171:8080/lmy/course/showCourses')
          .then((res) => {
            for(var i in res.data){
              var status = res.data[i].courseStatus;
              if ( status == 0){
                var newStatus = '进行中'
                res.data[i].courseStatus = newStatus;
              }else {
                var newStatus = '已结束'
                res.data[i].courseStatus = newStatus;
              }
              var type = res.data[i].courseType;
              if ( type == 0){
                var newType = '学校代表班课'
                res.data[i].courseType = newType;
              }else {
                var newType = '自定义班课'
                res.data[i].courseType = newType;
              }
            }
            that.tableData = res.data;
            console.log(that.tableData);
            that.cloneData = res.data
          })
      },
      query(){
        if(this.search === '' ){
          this.tableData = this.cloneData;
        }else {
          console.log(this.search)
          this.tableData = [];
          for(var i in this.cloneData){
            if(this.cloneData[i].courseName.includes(this.search) || this.cloneData[i].courseClass.includes(this.search)
              ||this.cloneData[i].courseInviteId.includes(this.search)){
              this.tableData.push(this.cloneData[i]);
            }
          }
        }
      }
    },
    created(){
      this.dataInit();
    },
  }
</script>

<style scoped>

</style>
