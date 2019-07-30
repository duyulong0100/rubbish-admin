### table-comb 表格组件 (src\components\table-comb\index.vue)

### 简述： 根据Element UI 中的 Table封装的表格组件

## 功能：
  ### 表格头部
    基础查询
    高级查询
    表格标题

  ### 表格内容
    数据加载
    选中一个
    多选
    全选
    删除一个
    批量删除
    排序
 
  ### 表格尾部
    分页


## Data属性(Data Attributes)


| 参数                     |  说明                   | 类型           | 可选值         |   默认值     |
| :---------:              | :-----------:           | :-----------:  | :---------:  |  :---------: |  
| ***表格头部***         
| searchModelDataBase       | 基础查询条件对象        | Object         | -             |    -         | 
| searchModelDataBase.name  | 基础查询的关键字查询    | String         | -             |    ''        | 
| isOpenAdvancedSearch      | 是否打开高级查询        | Boolean        | true/false    |    true      |
| searchModelData      |  高级查询条件对象       | Object        |   -  |     -    |
| ***表格内容***
| tableData      | 表格的数据          |       Array      | -           |        -        |                |  
| loading         | 数据是否在加载中      | Boolean            | true/false         | true               |                |  
| checkedItems     | 选中的数据          | Array             | []              |  -              |                |  
| sortInfo     | 排序信息          | String             |   null/asc/desc           |     null           |                |  
| ***表格尾部***
| pagingInfo       | 分页信息         | Object         |      {pageSize: 10, currentPage: 1, totalRecord: 0}         |     {pageSize: 10, currentPage: 1, totalRecord: 0}            | 

## 计算属性(Computed Attributes)

| 参数          |  说明         | 类型           | 可选值          |   默认值       |
| :---------: | :-----------: | :-----------:  | :---------:     |  :---------:  | 
| isShowBaseSearch    | 显示基础查询条件(依赖this.$scopedSlots.baseSearchForm, 有this.$scopedSlots.baseSearchForm则是true否则是false)                | Boolean           | true/false         |       -         | 


## Prop属性（Prop Attributes）

| 参数          |  说明         | 类型           | 可选值          |   默认值       |
| :---------: | :-----------: | :-----------:  | :---------:     |  :---------:  |
| ***表格头部***
| searchModelBase  | 基础查询条件对象       | Object        | -    |    -      |  
| searchModel   | 高级查询条件对象       | Object        | -    |    -      |  
| getAction   | 获取表格数据的API  | Function |      -         |   -             | 
| getActionWhere | 表格API数据的请求条件（基本用于获取unionId）      | Object             | -              |                | 
| removeAction |  删除表格数据的API       | Function  | -      |        -        |
| removeBatchAction |  批量删除表格数据的API | Function | -     |        -        |
| isSearchAll | 普通条件和高级条件一起查询  | Boolean | true/false  | false |
| isNotBaseSearch | 隐藏查询按钮  | Boolean | true/false  | false |
| autoFetch | 是否自动加载数据  | Boolean |  true/false  | true |
| ***表格内容***
| customId | 自定义id  | String | 'id'  | - | -
| checkedDispalyName | 在多选视图中显示给用户的名字  | String | 'name'  | - | 
| editPath | 编辑页的路由path  | String |  -  | '' |
| sortChange | 排序方法  | Function |  -  | - |
| afterFetchData |  获取表格数据后的回调函数 | Function |  -  | - |
| ***表格尾部***
| pagingConfig | 分页信息  | Object |  -  | {} |
| showPagination |  是否显示分页 | Boolean |  true/false  | true |
## 事件（Events）

| 事件名称     |  说明         |     参数    |   
| :---------: | :-----------: | :-----------:  | 
| ***表格头部***
| search      | 查询事件       |      -     | 
| reset      | 重置查询条件      |      -     | 
| search      | 查询事件       |      -     | 
| openAdvancedSearch |  打开高级搜索       | -           | 
| ***表格内容***
| checkedOne | 表格数据选中一条    | -           | 
| checkedAll | 表格数据全选       | -           |
| removeCheckedItem | 删除选中项  | item | - |
| removeAllCheckedItem | 删除所有选项  | -  |
| initRecordChecked | 删除所有选项  | -  |
| tableSortChange | 初始化选中项 | {column, prop, order} | -
| edit | 编辑 | id | -|
| remove | 删除 | id | -|
| removeBatch | 批量删除(根据this.checkedItems去删除) |  | -|
| fetchData | 获取表格数据 | pageIndex | -|
| getPageVo | 获取数据页面的请求条件 |  | -|
| reset | 重置查询条件 |  | -|
| search | 点击查找事件 |  | -|
| ***表格尾部***
| handleSizeChange | 分页改变事件 |  | -|

## $emit事件（$emit Events）
| 事件名称     |  说明         |     参数    |   
| :---------: | :-----------: | :-----------:  | 
| on-checked-item-change| 表格选中某一项时执行的回调   |     this.checkedItems | 
| tableMounted      | 表格mounted的时候执行的回调      |      -     | 

## 插槽 (Slot)

| 名字              |  说明         |     
| :---------:      | :-----------: | 
| ***表格头部***
| controls         | 自定义扩展     |      
| baseSearchForm   | 自定义扩展基础查询条件 |
| advancedSearchForm   | 自定义扩展高级查询条件 |
| tableTitle   | 表格标题插槽 |
| ***表格内容***
| tableColumns   | 表格数据插槽 |








