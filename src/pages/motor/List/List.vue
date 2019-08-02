<template>
  <div class="workapply-area">
    <d2-container>
      <template slot="header">马达管理</template>

      <!---->
      <table-comb
              name="马达管理"
              ref="tableMain"
              :search-model-base="tableMainSearchModelBase"
              :get-action="$api.rubbish.list"
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
          <el-button class="fr ml10" @click="addRecord">新增</el-button>
        </template>
        <!--表格-->
        <template slot="tableColumns">
          <el-table-column
                  prop="itemName"
                  label="名称">
          </el-table-column>
          <el-table-column
                  prop="belongCategory.categoryName"
                  label="类型">
          </el-table-column>
          <el-table-column
                  prop="belongCategory.description"
                  label="描述">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="props">
              {{ props.row.status===1?'前台显示':'前台不显示' }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200px">
            <template slot-scope="props">
              <el-button type="text" size="mini" @click="editRecord(props.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="delRecord(props.row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </table-comb>
      <template slot="footer"></template>
    </d2-container>

    <el-dialog :title="dialogVO.id?'编辑':'新增'" :visible.sync="dialogShow">
      <el-form ref="dialogVO" :model="dialogVO" label-width="150px" :rules="rules">
        <el-form-item label="马达名称：" prop="itemName">
          <el-input style="width: 210px" v-model="dialogVO.itemName"></el-input>
        </el-form-item>
        <el-form-item label="所属类型：" prop="categoryId">
          <el-select style="width: 210px" v-model="dialogVO.categoryId" placeholder="请选择分类">
            <el-option
                    v-for="item in categoryList"
                    :label="item.categoryName"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否在前台显示：">
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
    name: "RecordList",
    components: {},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableMainSearchModelBase:{
          keyword: '',
        },
        //分类列表
        categoryList:[],
        dialogShow:false,
        //新增或者编辑的vo
        dialogVO:{
          id:'',
          categoryId:'',
          itemName:'',
          status:true
        },
        rules: {
          itemName: [
            { required: true, message: '请输入马达名称'},
          ],
          categoryId: [
            { required: true, message: '请选择马达类型'},
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
      addRecord(){
        this.dialogVO= {
          categoryId:'',
          itemName:'',
          status:true
        }
        this.openDialog();
      },
      editRecord(detailVO){
        this.dialogVO= {
          id:detailVO.id,
          categoryId:detailVO.belongCategory.id,
          itemName:detailVO.itemName,
          status:detailVO.status==1,
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
      delRecord(vo){
        this.$confirm('确认删除该记录？')
          .then(() => {
            this.$api.motor.del(vo.id).then(res=>{
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
              this.$api.motor.create(vo).then(res=>{
                if(res.status==1){
                  this.dialogShow = false
                  this.$message.success('新增成功！');
                  this.$refs.tableMain.fetchData();
                }else{
                  this.$message.error(res.errorMessage)
                }

              })
            }else{
              this.$api.motor.edit(vo).then(res=>{
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

      }
    },
    mounted() {
      //获取垃圾类型列表
      // this.$api.motor.categoryList({}).then(res=>{
      //   this.categoryList = res.data;
      // })
    }
  };
</script>