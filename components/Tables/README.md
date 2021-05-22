Tables 表格

基于 Element [Table 表格](https://element.eleme.cn/#/zh-CN/component/table) 和 [Pagination 分页](https://element.eleme.cn/#/zh-CN/component/pagination) 封装的自定义 Table 组件，用于默认展示带分页的表格。

## 使用

```vue
<template>
/* 最简单的表格 */
<Tables
  :data="data"
  :columns="columns"
/>

/* 带序号和多选的表格 */
<Tables
  :data="data"
  :columns="columns"
  selection
  index
/>

/* 带分页的表格 */
<Tables
  :data="data"
  :columns="columns"
  :current-page.sync="currentPage"
  :page-size.sync="pageSize"
  :total="999"
/>

/* 使用change事件统一处理page和pageSize改变 */
<Tables
  :data="data"
  :columns="columns"
  :current-page="currentPage"
  :page-size="pageSize"
  @change="handlePageInfoChange"
  :total="999"
/>

/* 使用 current-change 和 size-change 分别处理 current-page 和 page-size 改变 */
<Tables
  :data="data"
  :columns="columns"
  :current-page="currentPage"
  :page-size="pageSize"
  @current-change="handleSizeChange"
  @size-change="handleSizeChange"
  :total="999"
/>

/* 选中某行 */
<Tables
  :data="data"
  :columns="columns"
  @currentRow.sync="currentRow"
  @current-row-change="handleCurrentRowChange"
/>

/* 多选默认选择行 */
<Tables
  :data="data"
  :columns="columns"
  selection
  @selected-rows.sync="selectedRows"
  @selection-change="handleSelectionChange"
/>

</template>

<script>
import { Tables } from '@@components'
export default {
  	components: { Table },
    data() {
		const data = [
            { name: '张三', age: 20, address: 'chongqing' },
            { name: '李四', age: 21, address: 'beijing' },
            { name: '王五', age: 23, address: 'shanghai' },
          ]
        return {
          informationData: [],
          currentPage: 1,
          pageSize: 10,
          total: 999,
          data,
          currentRow:data[1],
          selectedRows:[data[0],data[1]],
          columns: [
            {
              prop: 'name',
              label: '姓名',
              align: 'center',
            },
            {
              prop: 'age',
              label: '年龄',
            },
            {
              prop: 'address',
              label: '地址',
              render: value => {
                return <el-tag>{value}</el-tag>
              },
            },
            {
              renderHeader: (column, columnIndex) => (
                <el-input size="mini" placeholder="输入关键字搜索" />
              ),
              render: (value, row, rowIndex, column, columnIndex) => (
                <div>
                  <el-button size="mini">编辑</el-button>
                  <el-button size="mini" type="danger">
                    删除
                  </el-button>
                </div>
              ),
            },
          ],
        }
    },
    methods:{
        handlePageInfoChange({currentPage,pageSize}) {
            this.currentPage = currentPage // 如果使用了currentPage.sync则不需要再手动更新
            this.pageSize = pageSize // 如果使用了pageSize.sync则不需要再手动更新
            // do something
        },
        handleCurrentChange(currentPage){
            this.currentPage = currentPage // 如果使用了currentPage.sync则不需要再手动更新
            // do something
        }
        handleSizeChange(pageSize){
            // 如果使用了pageSize.sync则不需要再手动更新
            this.pageSize = pageSize
            // do something
        },
        handleCurrentRowChange(currentRow, oldCurrentRow){
          // 如果使用了currentRow.sync则不需要再手动更新
          this.currentRow = currentRow
          // do something
        }
        handleSelectionChange(selection){
          // do something
        }
    }
}

```

## 参数说明

### Attributes

| 参数            | 说明                                                                                                                                                                                                        | 类型                 | 可选值                    | 默认值                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------- | ------------------------------------------------------------------------------------------------ |
| table           | Table 组件自定义属性和监听器（**最高优先级，将会覆盖下面的同名属性**）                                                                                                                                      | Object               | -                         | {props: {},on: {},}                                                                              |
| pagination      | Pagination 组件自定义属性和监听器（**最高优先级，将会覆盖下面的同名属性**）                                                                                                                                 | Object               | -                         | {props: {'page-sizes': [10, 20, 50],layout: 'total, sizes, prev, pager, next, jumper',},on: {},} |
| data            | 显示的数据                                                                                                                                                                                                  | Array                | -                         | []                                                                                               |
| columns         | 表格列的配置描述，具体项见下表                                                                                                                                                                              | Array                | -                         | []                                                                                               |
| currentPage     | 当前页数，支持 .sync 修饰符                                                                                                                                                                                 | number               | -                         | 1                                                                                                |
| page            | 当前页数，和 currentPage 一样，**只是一个别名，两者只传一个**                                                                                                                                               | number               | -                         | 1                                                                                                |
| pageSize        | 每页显示条目个数，支持 .sync 修饰符                                                                                                                                                                         | number               | -                         | 10                                                                                               |
| total           | 分页组件数据总数，为 0 时默认不显示分页                                                                                                                                                                     | number               | -                         | 0                                                                                                |
| selection       | 是否允许表格选择,开启后将向 columns 中注入 {type:'selection',width:50,align:'center'},如果 columns 中已有 type 为‘selection’将不注入                                                                        | boolean              | -                         | false                                                                                            |
| index           | 是否添加索引列，开启后将向 columns 中注入 {type:'index',width:50,align:'center'},如果 columns 中已有 type 为‘index’将不注入                                                                                 | boolean              | -                         | false                                                                                            |
| rowKey          | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | Function(row)/string | -                         | 'id'                                                                                             |
| hidePagination  | 是否隐藏分页（也可以通过 total 传 0 进行隐藏）                                                                                                                                                              | boolean              | -                         | false                                                                                            |
| paginationAlign | 分页组件水平对齐方式,支持 'left', 'center', 'right'                                                                                                                                                         | string               | 'left'\|'center'\|'right' | 'right'                                                                                          |
| currentRow      | 当前行数据，支持.sync                                                                                                                                                                                       | Object               | -                         | -                                                                                                |
| selectedRows    | 选中行数据，支持.sync                                                                                                                                                                                       | Array                | -                         | []                                                                                               |

### columns 参数说明

只是将标签属性进行对象化处理,未进行特殊处理。新增下面两个 renderProps 用于自定义渲染表格表头和单元格数据。

> 参考：Element [Table-column Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)

| name         | 说明                                                                     |
| :----------- | :----------------------------------------------------------------------- |
| render       | 自定义列的内容，参数分别为当前行的值，当前行数据，行索引，列信息，列索引 |
| renderHeader | 自定义表头的内容. 参数分别为列，列索引                                   |

### Events

| 参数               | 说明                                     | 回调参数                    |
| ------------------ | ---------------------------------------- | --------------------------- |
| size-change        | pageSize 改变时会触发                    | 每页条数                    |
| current-change     | currentPage 改变时会触发                 | 当前页                      |
| change             | pageSize 或 currentPage 改变时会触发     | {currentPage,page,pageSize} |
| current-row-change | 当表格的当前行发生变化的时候会触发该事件 | currentRow, oldCurrentRow   |
| selection-change   | 当选择项发生变化时会触发该事件           | selection                   |
