<template>
  <el-table :data="themeList" v-bind="table">
    <el-table-column prop="title" align="center" width="160"/>
    <el-table-column label="预览" width="120">
      <div
        slot-scope="scope"
        class="theme-preview"
        :style="{'backgroundImage': `url(${$baseUrl}${scope.row.preview})`}">
      </div>
    </el-table-column>
    <el-table-column prop="address" align="center">
      <template slot-scope="scope">
        <el-button v-if="themeActiveName === scope.row.name" type="success" icon="el-icon-check" round>已激活</el-button>
        <el-button v-else round @click="handleSelectTheme(scope.row.name)">使用</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'd2-theme-list',
  data () {
    return {
      table: {
        showHeader: false,
        border: true
      }
    }
  },
  computed: {
    ...mapState({
      themeList: state => state.d2admin.themeList,
      themeActiveName: state => state.d2admin.themeActiveName
    })
  },
  methods: {
    ...mapMutations([
      'd2adminThemeSet'
    ]),
    handleSelectTheme (name) {
      this.d2adminThemeSet(name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.theme-preview {
  height: 50px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
</style>
