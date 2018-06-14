<template>
  <div>
    <Breadcrumb :style="{margin: '24px 0'}">
      <BreadcrumbItem to="/home">Home</BreadcrumbItem>
      <BreadcrumbItem>permission</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
      <div class="permission">

        <el-row :gutter="20">
          <el-col :span="20" :offset="2">
            <el-button type="primary" icon="el-icon-circle-plus-outline" round @click="addRole">添加角色</el-button>


            <el-card class="box-card" v-show="cardVisible">
              <el-row>
                <h2>角色名称 </h2>
                <el-input v-model="roleName" placeholder="请输入内容"></el-input>
              </el-row>
              <h3>权限</h3>
              <div>
                <el-checkbox-group v-model="addList">
                  <el-card v-for="(ite, index) in permissionGroup" :key="index">
                    <el-checkbox :label="ite.itemId">{{ite.menuName}}</el-checkbox>
                    <el-checkbox :label="item.itemId" v-for="(item, index) in allPermissions" :key="index" v-if="item.parentId == ite.itemId">{{item.menuName}}</el-checkbox>
                  </el-card>
                </el-checkbox-group>
                <el-row :gutter="20">
                  <el-col :span="12" :offset="6">
                    <div class="grid-content bg-purple">
                      <el-button type="primary" round @click="saveRole">保存</el-button>
                      <el-button type="warning" round @click="noSaveRole">取消</el-button>
                    </div>
                  </el-col>
                </el-row>

              </div>
            </el-card>

            <el-card class="box-card" v-for="(o,id) in result" :key="o.role.roleId">
              <div slot="header" class="clearfix">
                <span><h2>{{o.role.roleName}}</h2></span>
                <el-button @click="changePermission(id,$event)" style="float: right; padding: 3px 0;margin:-18px 0px" type="text">修改</el-button>
                <el-button type="danger" @click="deleteRole(id)" icon="el-icon-delete" circle style="float: right;margin:-30px 45px"></el-button>
              </div>
              <div>
                <el-checkbox-group v-model="checkList[id]">
                  <el-card v-for="(ite, index) in permissionGroup" :key="index">
                    <el-checkbox :disabled="o.change" :label="ite.itemId"><h3>{{ite.menuName}}</h3></el-checkbox>
                    <br>
                    <el-checkbox :disabled="o.change" :label="item.itemId" v-for="(item, index) in allPermissions" :key="index" v-if="item.parentId == ite.itemId">{{item.menuName}}</el-checkbox>
                  </el-card>
                </el-checkbox-group>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </Content>
  </div>

</template>
<script>
  // import fly from 'flyio'
  var fly = require('flyio')
  fly.config.baseURL = "http://localhost:8080/"
  export default {
    name: "Permission",
    data() {
      return {
        result: [],
        p: [],
        checkList: [],
        permissions: [],
        allPermissions: [],
        permissionGroup: [],
        // hh: [],
        cardVisible: false,
        addList: [],
        roleName: ''

      };
    },
    mounted() {
      this.initdata()

    },
    methods: {
      saveRole: function () {
        const that = this
        fly.post('admin/role', {
            roleName: that.roleName,
            permission: that.addList
          })
          .then(function (response) {
            that.result.splice(0,that.result.length)
            that.checkList.splice(0,that.checkList.length)
            that.permissionGroup.splice(0,that.permissionGroup.length)
           that.initdata()
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      noSaveRole:function () {
         that.cardVisible = !that.cardVisible
      },
      addRole: function () {

        const that = this
        that.addList.splice(0, that.addList.length);
        that.cardVisible = !that.cardVisible
        console.log(that.checkList.length);
        that.allPermissions.forEach(element => {
          that.addList.push(element.itemId)

        });
        console.log(that.addList);







      },
      deleteRole: function (id) {
        const that = this
        console.log(id);
        console.log(that.result[id].role.roleId);
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fly.delete('admin/role', {
              roleId: that.result[id].role.roleId
            })
            .then(function (response) {

              that.result.splice(id, 1)
              that.checkList.splice(id, 1)
              console.log(that.checkList)
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });


          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      changePermission: function (i, e) {
        const that = this
        this.result[i].change = this.result[i].change ? false : true
        if (e.target.innerHTML == '保存') {
          console.log(that.checkList[i])
          fly.post('admin/changerole', {
              roleId: that.result[i].role.roleId,
              message: that.checkList[i]
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });

        }
        e.target.innerHTML = e.target.innerHTML == '修改' ? '保存' : '修改'



      },
      initdata() {
        let that = this
        fly.get('admin/allpermission')
          .then(function (response) {
            that.allPermissions = response.data.data
            response.data.data.forEach(function (item) {
              if (item.parentId == 0) {
                that.permissionGroup.push(item)
              }
            })

          })
          .catch(function (error) {
            console.log(error);
          });
        fly.get('admin/roleandpermission')
          .then(function (response) {
            that.result = response.data.data
            console.log(that.result)
            response.data.data.forEach((element, index) => {
              that.checkList[index] = []
              // that.hh[index] = true
              element.permission.forEach(function (i) {
                that.checkList[index].push(i.itemId)
              })
            });
            console.log(that.checkList)
            let p = []
            response.data.data.forEach(element => {
              let permissions = []
              element.permission.forEach(function (item) {
                if (item.parentId == 0) {
                  permissions.push(item)
                }
              })
              p.push(permissions)

            });
            that.p = p
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

</script>
<style scoped>
  .check {
    width: 50px;
  }

</style>
