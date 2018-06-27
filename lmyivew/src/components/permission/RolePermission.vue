<template>
  <div id="rolepermission">
    <!-- <p>{{roleAndPermission}}</p> -->
    <!-- <button @click="sout"> 151 </button> -->
    <el-card id="card" class="box-card" v-if="visiable">
      <div slot="header" class="clearfix">
        <span>
          <h3>{{role.roleName}}</h3>
        </span>
        <el-button style="float: right;margin:-27px 63px" type="danger" icon="el-icon-delete" circle @click="deleteRole"></el-button>
        <el-button style="float: right; margin-top: -27px" type="text" @click="saveRole">保存</el-button>
      </div>
      <el-card class="box-card" v-for="(item, index) in commonroot" :key="index">
        <el-checkbox :indeterminate="isIndeterminate[index]" v-model="checkAll[index]" @change="handleCheckAllChange(index)">{{item.menuName}}</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedList[index]">
          <el-checkbox :label="item.itemId" >基础{{item.menuName}}</el-checkbox>
          <el-checkbox  v-for="one in allpermission" :label="one.itemId" :key="one.itemId" v-if="item.itemId==one.parentId">{{one.menuName}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
    </el-card>
  </div>
</template>
<script>
  import fly from 'flyio';
  fly.config.baseURL = "http://120.79.26.171:8080/lmy/"
  // import axios from 'axios'
  //   axios.defaults.baseURL = 'http://47.100.222.72:8080/lmy/admin'

  export default {
    name: 'rolepermission',
    props: ['p', 'role', 'root', 'toplist', 'allpermission'],
    data() {
      return {
        permisssion: this.p,
        currentrole: this.role,
        commonroot: this.root,
        alllist: this.toplist,
        all: this.allpermission,
        checkAll: [],
        isIndeterminate: [],
        checkedList: [],
        visiable: true,
        dis:[]
      }
    },
    // mounted() {
    //   //   this.firstme()
    //   // this.dataInit()
    // },
    created() {
      this.dataInit();
    },
    watch: {
      checkedList:function (val) {
        val.forEach((element,index) => {

          this.checkAll[index] = element.length === this.alllist[index].length

          if(element.length !== this.alllist[index].length){
            console.log(element.length,this.alllist[index].length);
            this.isIndeterminate[index]=element.length>0&&this.alllist[index].length>element.length
            // this.checkAll[index] = element.length === this.alllist[index].length


          }else{
            this.isIndeterminate[index]=element.length>0&&this.alllist[index].length>element.length
          }


        });


      }
    },

    methods: {
      change($e,index,itemId){
        const that = this
        if($e){
          that.dis[index]=false
        }else{
          that.checkedList[index]=[]
          that.dis[index]=true
        }


      },
      dataInit() {
        const that = this
        this.root.forEach((el, index) => {
          that.checkedList[index] = []
          that.dis[index]=false
          that.checkAll[index] = false
          that.isIndeterminate[index] = false
          that.permisssion.forEach(element => {
            if (element.itemId == el.itemId) {
              that.checkedList[index].push(el.itemId)
            }
            if (element.parentId == el.itemId) {
              that.checkedList[index].push(element.itemId)
            }
          });
        });
        that.toplist.forEach((element, index) => {
          if (element.length == that.checkedList[index].length) {
            that.checkAll[index] = true
          }else if(that.checkedList[index].length===0){
            that.isIndeterminate[index]=false
          }else{
            that.isIndeterminate[index]=true
          }


        });
      },
      handleCheckAllChange(index) {
        // alert(index);
        console.log(this.checkedList[index]);
        this.checkedList[index] = this.checkAll[index] ? this.alllist[index] : [];
        this.isIndeterminate[index] = false;
        console.log(this.checkedList[index]);
      }
      ,
      firstme() {
        console.log(this.role);
        console.log(this.checkedList);

      },
      deleteRole() {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const that = this
          fly.delete('admin/role', {
              roleId: that.currentrole.roleId
            })
            .then(function (response) {
               that.visiable = false
              // document.getElementById("role").remove();
              console.log(112);
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
      saveRole() {
        const h = this.$createElement;
        let p = [];
        const that = this;
        that.checkedList.forEach(function (params) {
          params.forEach(element => {
            p.push(element)
          });
        })
        fly.post('admin/changerole', {
            roleId: that.currentrole.roleId,
            message: p
          })
          .then(function (response) {
             that.$message({
            type: 'success',
            message: '修改成功'
          });
          })
          .catch(function (error) {
            console.log(error);
          });


      }

    }
  }

</script>
