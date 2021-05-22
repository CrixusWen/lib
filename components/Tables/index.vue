<script>
export default {
  name: 'Tables',
  props: {
    // Table组件自定义属性和监听器（最高优先级，将会覆盖下面的同名属性）
    table: {
      type: Object,
      default: () => ({
        props: {},
        on: {},
      }),
    },
    // Pagination组件自定义属性和监听器（最高优先级，将会覆盖下面的同名属性）
    pagination: {
      type: Object,
      default: () => ({
        props: {
          'page-sizes': [10, 20, 50],
          layout: 'total, sizes, prev, pager, next, jumper',
        },
        on: {},
      }),
    },
    // 是否允许点击行选中 在selection为true的情况下
    minSelected: {
      type: [Number, String],
      default: 0,
    },
    // 是否允许点击行选中 在selection为true的情况下
    clickToCheck: {
      type: Boolean,
      default: false,
    },
    // 是否允许表格选择,开启后将向columns中注入 {type:'selection',width:50,align:'center'},如果已有type为‘selection’将不注入
    selection: {
      type: Boolean,
      default: false,
    },
    // 是否添加索引列，开启后默认注入索引
    index: {
      type: Boolean,
      default: false,
    },
    // Table的row-key
    rowKey: {
      type: [Function, String],
      default: 'id',
    },
    // Table组件的数据
    data: {
      type: Array,
      default: () => [],
    },
    // Table组件的列
    columns: {
      type: Array,
      default: () => [],
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1,
    },
    // 当前页，和currentPage一样，只是一个别名，两者只传一个
    page: {
      type: Number,
      default: 1,
    },
    // 分页组件的页面尺寸
    pageSize: {
      type: Number,
      default: 10,
    },
    // 分页组件数据总数，为0时默认不显示分页
    total: {
      type: Number,
      default: 0,
    },
    // 是否隐藏分页（也可以通过total传0进行隐藏）
    hidePagination: {
      type: Boolean,
      default: false,
    },
    // 分页组件水平对齐方式,支持 'left', 'center', 'right'
    paginationAlign: {
      type: String,
      default: 'right',
      validator(value) {
        return ['left', 'center', 'right'].includes(value)
      },
    },
    // 当前行数据，支持.sync
    currentRow: {
      type: Object,
      default: undefined,
    },
    // 默认选中行数据
    selectedRows: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectionUpdating: false, // 当前是否在更新选中，当手动更新选中时，触发
    }
  },
  computed: {
    minSelectedNum() {
      return Number(this.minSelected) || 0
    },
    // 过滤columns，注入selection和index列
    filteredColumns() {
      let columns = [...this.columns]
      const defaultSelction = {
        type: 'selection',
        width: 50,
        align: 'center',
      }
      const defaultIndex = {
        type: 'index',
        align: 'center',
      }
      const { includeSelection, includeIndex } = this.columns.reduce(
        (assertion, item) => {
          if (item.type === 'selection') {
            assertion.includeSelection = true
          }
          if (item.type === 'index') {
            assertion.includeIndex = true
          }
          return assertion
        },
        { includeSelection: false, includeIndex: false }
      )

      if (this.index && !includeIndex) {
        columns.unshift(defaultIndex)
      }

      if (this.selection && !includeSelection) {
        columns.unshift(defaultSelction)
      }

      return columns
    },
  },
  watch: {
    // 监听当前行改变，更新当前行高亮
    currentRow(val, oldVal) {
      this.setCurrentRow(val)
    },
    selectedRows(val) {
      this.toggleSelection(val)
    },
  },
  mounted() {
    this.currentRow && this.setCurrentRow(this.currentRow) // 初始化当前行
    this.selectedRows && this.toggleSelection(this.selectedRows) // 初始化选中
  },
  methods: {
    //点击当前行获取当前行数据
    handleRowClick(currentRow, column, event) {
      // 离线状态下的column不可选
      // const disabled = currentRow.deviceStatus !== '在线'
      // 点击行默认勾选当前行
      this.selection &&
        this.clickToCheck &&
        // !disabled &&
        this.$refs.table.toggleRowSelection(currentRow)

      if (this.table && this.table.on && this.table.on['row-click']) {
        this.table.on['row-click'](currentRow, column, event)
      }

      this.$emit('row-click', currentRow)
    },
    // 处理当前行改变，支持.sync，并且保留原有table上的监听函数
    handleCurrentRowChange(currentRow, oldCurrentRow) {
      if (this.table && this.table.on && this.table.on['current-change']) {
        this.table.on['current-change'](currentRow, oldCurrentRow)
      }
      this.$emit('update:currentRow', currentRow)
      this.$emit('current-row-change', currentRow, oldCurrentRow)
    },
    // 设置当前行
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row)
    },
    // 切换默认选中行
    toggleSelection(rows) {
      this.$nextTick(() => {
        if (!this.$refs.table) {
          return
        }
        this.selectionUpdating = true
        this.$refs.table.clearSelection()
        if (rows) {
          rows.forEach(row => {
            this.$refs.table.toggleRowSelection(row, true)
          })
        }
        this.selectionUpdating = false
      })
    },
    // 处理选中
    handleSelectionChange(rows) {
      if (this.selectionUpdating) {
        // 如果当前正在更新选中，则不抛出选中事件
        rows = this.selectedRows
      }
      if (this.table && this.table.on && this.table.on['selection-change']) {
        this.table.on['selection-change'](rows)
      }
      // 存在限制最小选中值 则至少选中一个
      if (this.minSelectedNum && rows.length < Number(this.minSelectedNum)) {
        this.$nextTick(() => {
          this.$refs.table.toggleRowSelection(this.currentRow, true)
        })
      }
      this.$emit('selection-change', rows)
      this.$emit('update:selectedRows', rows)
    },
    // 处理当前页改变
    handleCurrentPageChange(currentPage) {
      this.$emit('current-change', currentPage)
      this.$emit('update:current-page', currentPage)
      this.$emit('update:page', currentPage)
      this.$emit('change', {
        currentPage,
        page: currentPage,
        pageSize: this.pageSize,
      })
    },
    // 处理页面尺寸改变
    handleSizeChange(pageSize) {
      this.$emit('size-change', pageSize)
      this.$emit('update:page-size', pageSize)
      this.$emit('change', {
        currentPage: this.currentPage,
        page: this.currentPage,
        pageSize,
      })
    },
  },
  render() {
    const {
      table,
      pagination,
      data,
      filteredColumns,
      rowKey,
      currentPage,
      page,
      pageSize,
      total,
      handleCurrentRowChange,
      handleSelectionChange,
      handleCurrentPageChange,
      handleSizeChange,
      hidePagination,
      paginationAlign,
      handleRowClick,
    } = this
    const getScopedSlots = (column, columnIndex) => {
      const { label, prop, renderHeader, render } = column

      if (!(renderHeader || render)) {
        return undefined
      }
      return {
        header: scope => {
          const { column } = scope
          if (renderHeader) {
            return renderHeader(column, columnIndex)
          }
          return label
        },

        default: scope => {
          const { $index: rowIndex, row, column } = scope
          const value = scope.row[prop]
          if (render) {
            return render(value, row, rowIndex, column, columnIndex)
          }
          return value
        },
      }
    }
    return (
      <div>
        <el-table
          class="table"
          props={{
            'highlight-current-row': true,
            'row-key': rowKey,
            'tooltip-effect': 'dark',
            ...(table.props || {}),
            data,
          }}
          on={{
            ...(table.on || {}),
            'row-click': handleRowClick,
            'current-change': handleCurrentRowChange,
            'selection-change': handleSelectionChange,
          }}
          style={{ width: '100%' }}
          ref="table"
        >
          {filteredColumns.map((item, index) => (
            <el-table-column
              props={{ ...item }}
              key={index}
              scopedSlots={getScopedSlots(item, index)}
            ></el-table-column>
          ))}
        </el-table>
        {!hidePagination && !!total && (
          <el-pagination
            class="pagination"
            style={{ textAlign: paginationAlign }}
            props={{
              ...(pagination.props || {}),
              currentPage: currentPage || page,
              pageSize,
              total,
            }}
            on={{
              ...(pagination.on || {}),
              'size-change': handleSizeChange,
              'current-change': handleCurrentPageChange,
            }}
            ref="pagination"
          />
        )}
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
</style>
