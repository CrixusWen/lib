<script>
export default {
  name: 'Tree',
  props: {
    // 值
    value: {
      type: [Array, String, Number],
      default: () => [],
    },
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: {
      type: String,
      default: 'id',
    },
    // 是否显示多选
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    // 是否显示连接线
    showLine: {
      type: Boolean,
      default: false,
    },
    // 是否抛出父元素值
    emitParent: {
      type: Boolean,
      default: true,
    },
    // 是否抛出子元素值
    emitChildren: {
      type: Boolean,
      default: true,
    },
    // 是否开启搜索
    filterable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterText: '',
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    value() {
      const checkedKeys = this.getValue() || []
      const elTree = this.$refs['tree']
      if (elTree) {
        elTree.setCheckedKeys(checkedKeys)
        elTree.setCurrentKey(checkedKeys.length ? checkedKeys[0] : null)
      }
    },
  },
  methods: {
    getValue() {
      const { value } = this
      return value && (Array.isArray(value) ? value : [value])
    },
    // 处理勾选
    handleCheck(
      nodeData,
      { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }
    ) {
      const { showCheckbox } = this.$props
      this.$emit('check', nodeData, {
        checkedNodes,
        checkedKeys,
        halfCheckedNodes,
        halfCheckedKeys,
      })
      if (showCheckbox) {
        const filteredCheckedKeys = checkedKeys.filter(key => {
          const checkedNode = checkedNodes.find(
            node => node[this.nodeKey] === key
          )

          if (checkedNode.children) {
            return this.emitParent
          } else {
            return this.emitChildren
          }
        })
        this.$emit('input', filteredCheckedKeys)
      }
    },
    // 处理当前项改变
    handleCurrentChange(nodeData, node) {
      this.$emit('current-change', nodeData, node)
      const { showCheckbox } = this.$props
      if (!showCheckbox) {
        // 如果不显示勾选框，则视为点击单选
        this.$emit('input', nodeData[this.nodeKey])
      }
    },
    // 处理筛选文本改变
    handleFilterTextChange(val) {
      this.filterText = val
    },
    // 默认检索节点方法
    filterNode(value, data) {
      if (!value) {
        return true
      }
      return data.label.indexOf(value) !== -1
    },
  },
  render() {
    const {
      $props,
      $attrs,
      $scopedSlots,
      $listeners,
      filterText,
      filterable,
      filterNode,
    } = this
    const { defaultCheckedKeys, currentNodeKey } = $attrs
    const { value, showCheckbox, showLine } = $props
    const customProps = {
      'highlight-current': true, // 默认高亮当前
      'filter-node-method': filterNode,
      ...$attrs,
      ...$props,
      'default-checked-keys': this.getValue() || defaultCheckedKeys,
      'current-node-key': showCheckbox
        ? currentNodeKey
        : Array.isArray(value)
        ? ''
        : value,
      indent: showLine ? 0 : 16,
    }

    const customListeners = {
      ...$listeners,
      check: this.handleCheck,
      'current-change': this.handleCurrentChange,
    }
    const hasIcon = showLine ? 'dll-icon-custom' : ''
    return (
      <div class={['tree', { 'tree-line': showLine }]}>
        {filterable && (
          <el-input
            class="tree-search-input"
            placeholder="输入关键字进行过滤"
            value={filterText}
            onInput={this.handleFilterTextChange}
          />
        )}

        <el-tree
          props={customProps}
          scopedSlots={$scopedSlots}
          on={customListeners}
          ref="tree"
          icon-class={hasIcon}
        />
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
$--border-color: #149cce;
.tree >>> {
  .el-tree {
    background-color: transparent !important;
  }
}
.tree-line >>> {
  .el-tree > .el-tree-node:after {
    border-top: none;
  }
  .el-tree-node {
    position: relative;
    padding-left: 4px;
  }

  .el-tree-node__content {
    padding-left: 4px !important;
  }

  .el-tree-node__expand-icon.is-leaf {
    display: none;
  }
  .el-tree-node__children {
    padding-left: 16px;
  }

  .el-tree-node :last-child:before {
    height: 38px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  .el-tree-node:before {
    content: '';
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:after {
    content: '';
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:before {
    border-left: 1px dashed $--border-color;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }

  .el-tree-node:after {
    border-top: 1px dashed $--border-color;
    height: 20px;
    top: 12px;
    width: 12px;
  }
}
>>> .dll-icon-custom {
  position: relative;
  margin-right: 10px;
  margin-left: 6px;
  background-color: #114068;
  border: 1px solid #1a4a72;
  border-radius: 2px;
  box-sizing: border-box;

  &:before {
    position: absolute;
    content: '';
    top: -8px;
    left: 14px;
    border-bottom: 1px dashed $--border-color;
    width: 8px;
    height: 14px;
  }
  &:after {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 12px;
    height: 12px;
    line-height: 14px;
    text-align: center;
    content: '+';
  }
  &.expanded {
    transform: rotate(0deg);
    &:after {
      font-size: 17px;
      content: '-';
    }
  }
}
>>> .el-tree-node__children {
  .dll-icon-custom {
    margin-left: 0px;
  }
}
.tree-search-input {
  margin-bottom: 10px;
}
</style>
