<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>permission</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#eee'}">
      <div id="mainpermission">
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <div class="grid-content bg-purple role">
              <el-button type="primary" icon="el-icon-plus" round @click="newRole"></el-button>
              <el-card class="box-card" v-if="visible">
                <el-row>
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <el-input v-model="roleName" placeholder="请输入角色名称"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="grid-content bg-purple-light">
                      <el-button type="warning" round style="float:right" @click="cancle">取消</el-button>
                      <el-button type="success" round style="float:right;" @click="saveRole">保存</el-button>
                    </div>
                  </el-col>
                </el-row>
                <el-card class="box-card" v-for="(item, index) in commonroot" :key="index">
                  <el-checkbox :indeterminate="isIndeterminate[index]" v-model="checkAll[index]" @change="handleCheckAllChange(index)">{{item.menuName}}</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="checkedCities[index]">
                    <el-checkbox :label="item.itemId">基础{{item.menuName}}</el-checkbox>
                    <el-checkbox v-for="city in allPermission" :label="city.itemId" :key="city.itemId" v-if="city.parentId==item.itemId">{{city.menuName}}</el-checkbox>
                  </el-checkbox-group>
                </el-card>
              </el-card>
              <rolecomponent class="role" v-for="(item, index) in roleAndPermission" :key="index" :p="item.permission" :role="item.role"
                             :root="commonroot" :toplist="toppermission" :allpermission="allPermission"></rolecomponent>
              <!-- <rolecomponent :p="roleAndPermission[0].permission" :role="roleAndPermission[0].role" :root="commonroot" :toplist="toppermission" :allpermission="allPermission"></rolecomponent> -->
            </div>
          </el-col>
        </el-row>
      </div>
    </Content>
  </div>

</template>
<script>
  import rolecomponent from './RolePermission.vue'
  import axios from 'axios'
  // axios.defaults.baseURL = 'http://47.100.222.72:8080/lmy/admin'
  export default {
    name: 'mainpermission',
    components: {
      rolecomponent
    },
    data() {
      return {
        role: ['jue1', 'jue2'],
        commonroot: [], //通用的根权限
        toppermission: [], //各项全部权限
        roleAndPermission: [], //角色及权限
        allPermission: [],
        checkedCities: [],
        isIndeterminate: [],
        checkAll: [],
        roleName: '',
        visible: false

      }
    },
    mounted() {
      this.dataInit();
    },
    watch: {
      checkedCities:function (val) {
        val.forEach((element,index) => {
          this.checkAll[index] = element.length === this.toppermission[index].length

          if(element.length !== this.toppermission[index].length){
            console.log(element.length,this.toppermission[index].length);
            this.isIndeterminate[index]=element.length>0&&this.toppermission[index].length>element.length


          }else{
            this.isIndeterminate[index]=element.length>0&&this.toppermission[index].length>element.length
          }


        });


      }
    },

    methods: {
      newRole() {
        this.visible = !this.visible

      },
      cancle() {
        this.visible = !this.visible

      },
      saveRole() {
        const that = this
        let p = []
        that.checkedCities.forEach((element, index) => {
          console.log(element);
          element.forEach(e => {
            p.push(e)
          });
          that.checkedCities[index] = []
          that.checkAll[index] = false
        });
        console.log(p,86);

        if (p.length == 0 || that.roleName == '') {
          this.$alert('请输入角色名称或权限', '提示', {
            confirmButtonText: '确定',
          });

        } else {
          axios.post('http://localhost:8080/admin/role', {
              roleName: that.roleName,
              permission: p
            })
            .then(function (response) {
              console.log(response.data,1119);
              that.newRole();
              that.roleAndPermission.push(response)
              that.roleName = ''
              that.$message({
                message: '添加角色成功',
                type: 'success'
              });
            })
            .catch(function (error) {
              console.log(error);
            });

        }

      },
      handleCheckAllChange(index) {
        this.checkedCities[index] = this.checkAll[index] ? this.toppermission[index] : [];
        this.isIndeterminate[index] = false;
      },
      handleCheckedCitiesChange(index) {
        let checkedCount = this.checkedCities[index].length;
        this.isIndeterminate[index] = checkedCount > 0 && checkedCount < this.toppermission[index].length;
        this.checkAll = checkedCount === this.toppermission[index].length;
      },
      dataInit() {
        const that = this
        axios.get('http://localhost:8080/admin/allpermission')
          .then(function (response) {
            that.allPermission = response.data
            console.log(response.data,129);

            console.log(that.allPermission, 46);

            console.log(response);
            response.data.forEach(element => {
              if (element.parentId == 0) {
                that.commonroot.push(element)
              }
            });
            console.log(that.commonroot,139);

            that.commonroot.forEach((element, i) => {
              that.toppermission[i] = []
              that.checkedCities[i] = []
              that.isIndeterminate[i] = false
              that.checkAll[i] = false
              that.toppermission[i].push(element.itemId)


              response.data.forEach(function (params) {
                if (params.parentId == element.itemId) {
                  that.toppermission[i].push(params.itemId)
                }
              })
            });
            console.log(that.toppermission, 48);

          })
        axios.get('http://localhost:8080/admin/roleandpermission')
          .then(function (response) {
            that.roleAndPermission = response.data
            console.log(that.roleAndPermission, '56');
          })

      }
    }
  }

</script>
<style scoped>
  .role {
    margin-top: 2%
  }

</style>
