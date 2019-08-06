<template>
  <div class="workapply-area">
    <d2-container>
      <template slot="header">垃圾类型管理</template>

      <!---->
      <table-comb
              name="垃圾类型管理"
              ref="tableMain"
              :search-model-base="tableMainSearchModelBase"
              :get-action="$api.rubbish.categoryList"
              :get-action-where="getActionWhere"
              :afterFetchData="afterFetchData">
        <!--基础查询-->
        <template slot="baseSearchForm" slot-scope="scope">
          <el-input
                  placeholder="请输入关键字"
                  prefix-icon="el-icon-search"
                  clearable
                  v-model="scope.form.keyword"
                  style="width: 250px; margin-left: 10px;">
          </el-input>
          <el-button class="fr ml10" @click="addRubbish">新增</el-button>
        </template>
        <!--表格-->
        <template slot="tableColumns">
          <el-table-column
                  prop="categoryName"
                  label="分类名称">
          </el-table-column>
          <el-table-column width="200"
            prop="picUrl"
            label="示意图片">
            <template slot-scope="props">
              <img class="img-type-item" :src="props.row.picUrl" />
            </template>
          </el-table-column>
          <el-table-column
                  prop="description"
                  label="分类描述">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="props">
              {{ props.row.status===1?'启用':'不启用' }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200px">
            <template slot-scope="props">
              <el-button type="text" size="mini" @click="editRubbish(props.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="delRubbish(props.row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </table-comb>
      <template slot="footer"></template>
    </d2-container>

    <el-dialog :title="dialogVO.id?'编辑':'新增'" :visible.sync="dialogShow">
      <el-form ref="dialogVO" :model="dialogVO" label-width="150px" :rules="rules">
        <el-form-item label="垃圾类型名称：" prop="categoryName">
          <el-input style="width: 210px" v-model="dialogVO.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="垃圾类型描述：" prop="description">
          <el-input type="textarea" :rows="2" v-model="dialogVO.description" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="垃圾类型图：" prop="">
          <el-upload
            class="avatar-uploader"
            :action="$api.common.uploadAction"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="dialogVO.picUrl" :src="dialogVO.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-switch v-model="dialogVO.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button @click="dialogShow = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页面
    // name 字段需要设置为和本页路由 name 字段一致
    name: "rubbishList",
    components: {},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableMainSearchModelBase:{
          keyword: '',
        },
        dialogShow:false,
        //新增或者编辑的vo
        dialogVO:{
          id:'',
          categoryName:'',
          description:'',
          status:true,
          picUrl:''
        },
        rules: {
          categoryName: [
            { required: true, message: '请输入垃圾类型名称'},
          ],
          description: [
            { required: true, message: '请选择垃圾类型描述'},
          ],
        }
      };
    },
    computed: {
      getActionWhere(){
        return {

        }
      },
    },
    methods: {
      addRubbish(){
        this.dialogVO= {
          categoryName:'',
          description:'',
          status:true,
          picUrl:'',
        }
        this.openDialog();
      },
      editRubbish(detailVO){
        this.dialogVO= {
          id:detailVO.id,
          categoryName:detailVO.categoryName,
          description:detailVO.description,
          status:detailVO.status==1,
          picUrl:detailVO.picUrl
        }
        this.openDialog();
      },
      openDialog(){
        if(this.$refs['dialogVO']){
          this.$nextTick(()=>{
            this.$refs['dialogVO'].clearValidate();
          })
        }
        this.dialogShow = true;
      },
      delRubbish(vo){
        this.$confirm('确认删除该记录？')
          .then(() => {
            this.$api.rubbish.categoryDel(vo.id).then(res=>{
              if(res.status==1){
                this.$message.success('删除成功！');
                this.$refs.tableMain.fetchData();
              }else {
                this.$message.error(res.errorMessage)
              }

            });
          })
          .catch(confirm => {});
      },
      save(){
        this.$refs['dialogVO'].validate((valid) => {
          if (valid) {
            let vo = {
              ...this.dialogVO,
              status: this.dialogVO.status?1:0
            };
            //新增
            if(!vo.id){
              delete vo.id;
              //
              this.$api.rubbish.categoryCreate(vo).then(res=>{
                if(res.status==1){
                  this.dialogShow = false
                  this.$message.success('新增成功！');
                  this.$refs.tableMain.fetchData();
                }else{
                  this.$message.error(res.errorMessage)
                }

              })
            }else{
              this.$api.rubbish.categoryEdit(vo).then(res=>{
                if(res.status==1){
                  this.dialogShow = false
                  this.$message.success('修改成功！');
                  this.$refs.tableMain.fetchData();
                }else{
                  this.$message.error(res.errorMessage)
                }

              })
            }
          } else {
            return false;
          }
        });
      },
      afterFetchData(){

      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        if(res.status===1){
          this.dialogVO.picUrl = res.data;
        }else{
          this.dialogVO.picUrl='';
        }

      },
      beforeAvatarUpload(file) {
        let reqExp = /.(gif|jpg|jpeg|png|gif)/;
        const isImg = reqExp.test(file.type);
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isImg) {
          this.$message.error('图片只支持gif,jpg,jpeg,png格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isImg && isLt10M;
      }
    },
    mounted() {
      //https://github.com/duyulong0100/rubbish-admin.git
    }
  };
</script>
<style scoped>
  .img-type-item{
    width: 80px;
    height: 80px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>