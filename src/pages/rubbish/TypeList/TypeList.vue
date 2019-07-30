<template>
  <div class="workapply-area">
    <d2-container>
      <template slot="header">垃圾类型管理</template>

      <!---->
      <table-comb
              name="垃圾类型管理"
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
          <el-button class="fr ml10" @click="exportExcel">新增</el-button>
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


          <el-table-column label="操作" width="200px">
            <template slot-scope="props">
              <el-button type="text" size="mini" @click="openWorkListDialog(props.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="openWorkListDialog(props.row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </table-comb>
      <template slot="footer"></template>
    </d2-container>
  </div>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页面
    // name 字段需要设置为和本页路由 name 字段一致
    name: "rubbishTypeList",
    components: {},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableMainSearchModelBase:{
          keyword: '',
        },
      };
    },
    computed: {
      getActionWhere(){
        return {

        }
      },
    },
    methods: {

      afterFetchData(){

      }
    },
    mounted() {
    }
  };
</script>