<template>
  <div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
    <div class="row">
      <div class="col-xs-12">
        <form class="form-inline">
          <div class="form-group">
            <input type="file"  class="form-control" id="file" :accept="SheetJSFT" @change="_change" v-show="false"/>
            <Button type="primary" size="large" icon="ios-cloud-upload-outline"  @click="toClick" >上传Excel</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
require('script-loader!js-xlsx/dist/xlsx.core.min');
import {$axiox} from "../../api";
  const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));
  const _SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
  ].map(function(x) { return "." + x; }).join(",");
  export default {
    data() {
      return {
        data: ["SheetJS".split(""), "1234567".split("")],
        newData: [],
        cols: [
          {name:"A", key:0},
          {name:"B", key:1},
          {name:"C", key:2},
          {name:"D", key:3},
          {name:"E", key:4},
          {name:"F", key:5},
          {name:"G", key:6},
          {name:"H", key:7},
          {name:"I", key:8},
          {name:"J", key:9},
          {name:"K", key:10},
          {name:"L", key:11},
          {name:"M", key:12},
          {name:"N", key:13},
        ],
        SheetJSFT: _SheetJSFT
      }; },
    methods: {
      _suppress(evt) { evt.stopPropagation(); evt.preventDefault(); },
      _drop(evt) {
        evt.stopPropagation(); evt.preventDefault();
        const files = evt.dataTransfer.files;
        if(files && files[0]) this._file(files[0]);
      },
      _change(evt) {
        const files = evt.target.files;
        if(files && files[0]) this._file(files[0]);
      },
      // _export(evt) {
      //   /* convert state to workbook */
      //   const ws = XLSX.utils.aoa_to_sheet(this.data);
      //   const wb = XLSX.utils.book_new();
      //   XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      //   /* generate file and send to client */
      //   XLSX.writeFile(wb, "sheetjs.xlsx");
      // },
      _file(file) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, {type:'binary'});
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {header:1});
          /* Update state */
          this.data = data;
          //*************
          for(let i=1;i<this.data.length;i++){
            let tempObj = {
              userAccount: '',
              userNickname: '',
              userName: '',
              userAvatar: '',
              userSex: '',
              userSchool: '',
              userDepartment: '',
              userJob: '',
              userNumber: '',
              userMobile: '',
              userEmail: ''
            };
            let userAccount = this.data[i][0];
            let userNickname = this.data[i][1];
            let userName = this.data[i][2];
            let userAvatar = this.data[i][3];
            let userSex = this.data[i][4];
            let userSchool = this.data[i][5];
            let userDepartment = this.data[i][6];
            let userJob = this.data[i][7];
            let userNumber = this.data[i][8];
            let userMobile = this.data[i][9];
            let userEmail = this.data[i][10];
            tempObj.userAccount = userAccount;
            tempObj.userNickname = userNickname;
            tempObj.userName = userName;
            tempObj.userAvatar = userAvatar;
            tempObj.userSex = userSex;
            tempObj.userSchool = userSchool;
            tempObj.userDepartment = userDepartment;
            tempObj.userJob = userJob;
            tempObj.userNumber = userNumber;
            tempObj.userMobile = userMobile;
            tempObj.userEmail = userEmail;
            this.newData.push(tempObj);
          }
          //*****************************
          $axiox().post('/user/testImport',this.newData
          ).then((response) => {
            console.log(response.data)
          }).catch((error) => {
            console.log(error)
          });
          console.log(JSON.stringify(this.newData));
          this.cols = make_cols(ws['!ref']);
        };
        reader.readAsBinaryString(file);
      },
      toClick(){
        document.getElementById('file').click()
      }
    }
  };
</script>
