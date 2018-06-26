<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>showAllUser</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <div class="table">
        <Row type="flex" justify="start">
          <Col span="3">
            <Input v-model="searchName" @on-change="handleSearch" icon="search" placeholder="请输入姓名搜搜..." style="width: 200px" />
          </Col>
          <Col span="12">
            <Input v-model="searchSchool" @on-change="handleSearch" icon="search" placeholder="请输入学校搜搜..." style="width: 250px; margin-left: 100px" />
          </Col>
        </Row>
        <Table :data="showData" :columns="tableColumns" stripe></Table>
        <br>
        <Row>
          <Col span="3">
            <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>&nbsp;导出数据</Button>
          </Col>
          <Col span="3">
            <DownloadExcel></DownloadExcel>
          </Col>
          <Col span="3">
            <ImportExcel></ImportExcel>
          </Col>
        </Row>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="totalPage" :current="currentPage" @on-change="changePage" ></Page>
          </div>
        </div>
      </div>
    </Content>
  </div>

</template>

<script>
  import {getShowUserInfo,$axiox,getAllUserCount} from "../../api";
  import ImportExcel from './ImportExcel.vue'
  import DownloadExcel from './DownloadExcelModel.vue'
  export default {
    name: "ShowAllUser",
    components: {
      ImportExcel,
      DownloadExcel
    },
    data () {
      return {
        searchName: '',
        searchSchool: '',
        allData:[],
        showData: [],
        tempData:[],
        allCount: null,
        showCount: 6,
        totalPage: null,
        currentPage: 1,
        tableColumns: [
          {
            title: 'Account',
            key: 'userAccount'
          },
          {
            title: 'Name',
            key: 'userName'
          },
          {
            title: 'Birthday',
            key: 'userBirth',
            render: (h,params) =>{
              const row = params.row;
              return h('div',row.userBirth === null ? 'null' : new Date(row.userBirth).Format('yyyy-MM-dd'))
            }
          },
          {
            title: 'School',
            key: 'userSchool',
          },
          {
            title: 'Department',
            key: 'userDepartment',
          },
          {
            title: 'Action',
            key: 'action',
            render: (h,params) => {
              return h('div',[
                h('Button',{
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.changeStatus(params.index)
                    }
                  }
                },'启/禁')
              ])
            }
          },
          {
            title: 'Status',
            key: 'userStatus',
            render: (h, params) => {
              const row = params.row;
              const color = row.userStatus === 0 ? 'green' : row.userStatus === 1 ? 'red' : 'blue';
              const text = row.userStatus === 0 ? '启用' : '禁用';
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          }
        ]
      }
    },
    methods: {
      async getAllShowUserCount(){
        let tempData = await getAllUserCount();
        this.allCount = tempData.data;
        this.totalPage = Math.ceil(this.allCount / this.showCount) * 10;
        this.init();
      },
      init() {
        if(this.allCount>this.showCount){
          $axiox().post('/user/queryUserPageShow',{
            beginIndex: 0,
            endIndex: this.showCount
          }).then((response) => {
            this.tempData = response.data;
            this.showData = this.tempData;
            console.log(this.tempData)
          }).catch((error) => {
            console.log(error)
          });
        }else {
          $axiox().post('/user/queryUserPageShow',{
            beginIndex: 0,
            endIndex: this.showCount
          }).then((response) => {
            this.tempData = response.data;
            this.showData = this.tempData;
          }).catch((error) => {
            console.log(error)
          });
        }
      },
      changePage(val){
        let currentPageNumber = parseInt(`${val}`);
        if(currentPageNumber === 1){
          this.init();
        }else {
          $axiox().post('/user/queryUserPageShow',{
            beginIndex: (currentPageNumber - 1 ) * this.showCount,
            endIndex: this.showCount
          }).then((response) => {
            this.tempData = response.data;
            this.showData = this.tempData;
          }).catch((error) => {
            console.log(error)
          });
        }
      },
      changeStatus(index) {
        let oldStatus = this.showData[index].userStatus;
        this.showData[index].userStatus = oldStatus === 0 ? 1 : 0;
        let newStatus = this.showData[index].userStatus;
        let statusText = newStatus === 0 ? '启用' : '禁用';
        $axiox().post('/user/modifyUserStatus',{
          userAccount: this.showData[index].userAccount,
          userStatus: newStatus
        }).then((response) => {
          this.$Message.info('启用状态: ' + statusText);
        }).catch((error) => {
          this.$Message.info('启用状态: ' + '失败');
        })
      },
      search (data, argumentObj) {
        let res = data;
        let dataClone = data;
        for (let argu in argumentObj) {
          if (argumentObj[argu].length > 0) {
            res = dataClone.filter(d => {
              return d[argu].indexOf(argumentObj[argu]) > -1;
            });
            dataClone = res;
          }
        }
        return res;
      },
      handleSearch () {
        this.showData = this.tempData;
        this.showData = this.search(this.showData, {userName: this.searchName,userSchool: this.searchSchool});
      },
      exportData() {
        this.downloadLoading = true;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../../vendor/Export2Excel');
          const tHeader = this.cutValue(this.tableColumns, 'title');
          const filterVal = this.cutValue(this.tableColumns, 'key');
          const list = this.showData;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '列表excel');
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      cutValue(target, name) {
        let arr = [];
        for (let i = 0; i < target.length; i++) {
          arr.push(target[i][name])
        }
        return arr
      },
      initFormatter(){
        Date.prototype.Format = function(fmt) { //
          let o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
          };
          if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
          for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          return fmt;
        }
      }
    },
    created() {
      this.initFormatter();
      this.getAllShowUserCount();
    }
  }
</script>

<style scoped>

</style>
