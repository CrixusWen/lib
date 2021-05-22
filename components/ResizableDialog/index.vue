<template>
  <transition :name="transitionName">
    <div :class="cls">
      <div class="dialog-header">
        <slot name="header-left">
          <div class="dialog-title">{{ title }}</div>
        </slot>
        <slot v-if="!minimize" name="header-right" />
        <div class="dialog-header-action">
          <button
            type="button"
            class="dialog-btn"
            v-if="minimizable"
            @click="minimizeBtnClick"
            :title="minimize ? '展开' : '收起'"
          >
            <i
              class="el-icon"
              :class="minimize ? 'el-icon-plus' : 'el-icon-minus'"
            />
          </button>
          <button
            type="button"
            class="dialog-btn"
            v-if="closable"
            @click="closeBtnClick"
            title="关闭"
          >
            <i class="el-icon el-icon-close" />
          </button>
        </div>
      </div>
      <div class="dialog-body" :style="bodyStyle" v-show="!minimize">
        <slot />
      </div>
      <div class="dialog-footer" v-if="$slots.footer" v-show="!minimize">
        <slot name="footer" />
      </div>
    </div>
  </transition>
</template>

<script>
import DragAndResizable from '../DragAndResizable'
export default {
  name: 'ResizableDialog',
  components: { DragAndResizable },
  props: {
    position: {
      type: String,
      default: 'bottom',
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    title: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    minimizable: {
      type: Boolean,
      default: true,
    },
    bodyStyle: {
      type: String,
      default: '',
    },
    // 是否将节点插入到body
    appendToBody: {
      type: Boolean,
      default: false,
    },
    // 指定插入节点
    parentNode: {
      type: HTMLElement,
      default: undefined,
    },
  },
  data() {
    return {
      minimize: false,
    }
  },
  computed: {
    cls() {
      let clsArr = ['dialog']
      const { position, minimize } = this
      position && clsArr.push(position)
      if (minimize) {
        clsArr.push('minimize')
      }
      return clsArr.join(' ')
    },
    transitionName() {
      let name = ''
      const position = this.position
      if (position === 'left-top') {
        name = 'el-zoom-in-left'
      } else if (position === 'left-bottom') {
        name = 'el-zoom-in-bottom'
      }
      return name
    },
  },
  watch: {
    parentNode: {
      immediate: true,
      handler(val) {
        this.updateDom()
      },
    },
    appendToBody: {
      immediate: true,
      handler() {
        this.updateDom()
      },
    },
  },
  mounted() {
    this.updateDom()
  },
  destroyed() {
    if (
      (this.appendToBody || this.parentNode) &&
      this.$el &&
      this.$el.parentNode
    ) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    updateDom() {
      this.$nextTick(() => {
        let parentNode = null
        if (this.parentNode) {
          parentNode = this.parentNode
        } else if (this.appendToBody) {
          parentNode = document.body
        }
        parentNode && parentNode.appendChild(this.$el)
      })
    },
    minimizeBtnClick() {
      console.log('minimizeBtnClick', this.minimize)
      this.minimize = !this.minimize
    },
    closeBtnClick() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
$dialog_margin: 4px;

.dialog {
  position: absolute;
  z-index: 999;
  display: flex;
  margin: $dialog_margin;
  overflow: auto;
  background-color: rgba(12, 57, 89, 0.96);
  border: solid 1px #1a85bd;
  border-radius: 4px;
  box-shadow: 0 4px 9px 0 rgba(10, 36, 51, 0.35),
    inset 0 0 12px 6px rgba(44, 198, 255, 0.16);
  transition: all 0.1s;
  flex-direction: column;
  &.left-top {
    top: 0;
    left: 0;
  }
  &.left-bottom {
    bottom: 0;
    left: 0;
  }
  &.right-top {
    top: 0;
    right: 0;
  }
  &.right-bottom {
    right: 0;
    bottom: 0;
  }
  &.minimize {
    width: 200px !important;
    height: 50px !important;
    min-width: 200px !important;
    min-height: 50px !important;
    overflow: hidden !important;
  }
  &-header {
    position: relative;
    display: flex;
    height: 50px;
    border-bottom: 1px solid #1a5d8b;
    align-items: center;
    flex-shrink: 0;
  }
  &-header-action {
    position: relative;
    margin: 0 10px;
    cursor: default;
  }
  &-title {
    padding: 0 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
  &-btn {
    font-size: 10px;
    color: #fff;
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    &:hover {
      color: #29b6ff;
    }
  }
  &-body {
    position: relative;
    padding: 16px;
    overflow: auto;
    flex: 1;
  }
}
</style>
