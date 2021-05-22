<script>
import ListItem from './ListItem'
import Empty from '../Empty'
export default {
  name: 'List',
  Item: ListItem,
  components: {
    Empty,
  },
  props: {
    header: {
      type: Object,
      default: null,
    },
    footer: {
      type: Object,
      default: null,
    },
    hideSplit: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: [String, Function],
      default: 'id',
    },
    renderItem: {
      type: Function,
      default: null,
    },
    value: {
      type: [String, Number, Object],
      default: null,
    },
    selectedItemClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedItem: null,
    }
  },
  watch: {
    value: {
      handler: 'updateSelectedItem',
      immediate: true,
    },
  },
  methods: {
    updateSelectedItem() {
      this.selectedItem = this.value
    },
    handleSelect(item) {
      this.selectedItem = item
      const value = typeof this.value === 'object' ? item : this.getKey(item)
      this.$emit('input', value, item)
      this.$emit('change', value, item)
    },
    getKey(item) {
      if (!item) {
        return ''
      }
      const { rowKey } = this.$props
      let key
      if (typeof rowKey === 'function') {
        key = rowKey(item)
      } else if (typeof rowKey === 'string') {
        key = item[rowKey]
      } else {
        key = item.key
      }
      return key
    },
  },

  render(h) {
    const { $props, $slots, $listeners, $scopedSlots } = this
    const { hideSplit, bordered, data } = $props
    const renderItem = $props.renderItem || $scopedSlots.renderItem
    const header = $props.header || $slots.header
    const footer = $props.footer || $slots.footer

    const list = data.map((item, index) => {
      const key = this.getKey(item)

      const isSelected =
        this.selectedItem &&
        (item === this.selectedItem ||
          this.getKey(this.selectedItem) === key ||
          this.selectedItem === key)

      const cls = {
        'list-item-wrapper': true,
        'list-item-selected-wrapper': isSelected,
        selectedItemClass: isSelected,
      }

      return (
        <div class={cls} key={key} onClick={() => this.handleSelect(item)}>
          {renderItem(item, index)}
        </div>
      )
    })

    return (
      <div
        {...{ on: $listeners }}
        class={{ list, 'list-split': !hideSplit, 'list-bordered': bordered }}
      >
        {header && <div class="list-header">{header}</div>}
        {data && data.length ? list : <Empty />}
        {footer && <div class="list-footer">{footer}</div>}
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
$split: 1px solid #123d5f;
.list {
  border-radius: 4px;
  &-header,
  &-footer {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  &-split {
    .list-item-wrapper + .list-item-wrapper,
    .list-footer {
      border-top: $split;
    }
    .list-header {
      border-bottom: $split;
    }
  }
  &-bordered {
    border: 1px solid #123d5f;
    border-radius: 4px;
  }
  &-item-wrapper {
    cursor: pointer;
    &:hover {
      background: #154065;
    }
  }
  &-item-selected-wrapper {
    background: #154065;
  }
}
</style>
