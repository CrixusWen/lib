<template>
  <div class="collapse-panel" :class="collapsePanelCls">
    <div
      class="collapse-panel__trigger"
      :class="[collapseTriggerClass, direction]"
      :style="collapseTriggerStyle"
      @click="handleToggleCollapse"
    >
      <slot :isCollapse="isCollapse" name="trigger">
        <i
          class="el-icon-d-arrow-left collapse-panel__arrow"
          :class="{ 'is-collapse': isCollapse }"
        ></i>
      </slot>
    </div>
    <transition :name="`collapse-panel__transition${direction}`">
      <div
        class="collapse-panel__wrap"
        :class="{ 'is-collapse': isCollapse }"
        v-show="!isCollapse"
      >
        <div class="collapse-panel__header" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </div>

        <div class="collapse-panel__content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CollapsePanel',
  props: {
    // 是否折叠
    collapse: {
      type: Boolean,
      default: false,
    },
    // 触发器class
    collapseTriggerClass: {
      type: String,
      default: '',
    },
    // 触发器style
    collapseTriggerStyle: {
      type: [Object, String],
      default: () => ({}),
    },
    // 标题，支持slot
    title: {
      type: String,
      default: '',
    },
    // 展开过渡方向
    direction: {
      type: String,
      validator(val) {
        if (!val) {
          return true
        }
        return ['left', 'right'].includes(val)
      },
      default: 'left',
    },
  },
  data() {
    return {
      isCollapse: this.collapse,
    }
  },
  computed: {
    collapsePanelCls() {
      return [
        {
          'is-collapse': this.isCollapse,
        },
      ]
    },
  },
  watch: {
    collapse(val) {
      this.isCollapse = val
    },
  },
  methods: {
    handleToggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>
<style lang="scss" scoped>
$--collapse-panel-arrow-raduis-width: 6px;
$--md-fade-transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
  opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) !default;

.collapse-panel {
  position: relative;
  height: 100%;
  z-index: 999;
}

.collapse-panel__trigger {
  position: absolute;
  top: 4px;
  left: 100%;
  z-index: 999;
  width: 24px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
  background: #185f91;
  border-top-right-radius: $--collapse-panel-arrow-raduis-width;
  border-bottom-right-radius: $--collapse-panel-arrow-raduis-width;
  box-sizing: border-box;
  &.right {
    right: 100%;
    left: 0;
    transform: translateX(-100%) rotate(180deg);
  }
}

.collapse-panel__arrow {
  transition: transform 0.3s ease-in-out;
  &.is-collapse {
    transform: rotate(180deg);
  }
}

.collapse-panel__wrap {
  display: flex;
  height: 100%;
  will-change: width;
  flex-direction: column;
}

.collapse-panel__header {
  padding: 10px 20px;
  border-bottom: 1px solid #10456a;
}

.collapse-panel__content {
  flex: 1;
  overflow: auto;
  box-shadow: 3px 0 7px 0 rgba(12, 46, 71, 0.15);
}

// 左移动画
.collapse-panel__transition-enter-active,
.collapse-panel__transition-level-active {
  transition: $--md-fade-transition;
}

.collapse-panel__transition-enter-to,
.collapse-panel__transition-leave {
  opacity: 1;
  transform: scaleX(1);
  transform-origin: top left;
}

.collapse-panel__transition-enter,
.collapse-panel__transition-leave-to {
  opacity: 0;
  transform: scaleX(0);
}
// 右移动画
.collapse-panel__transition_right-enter-active,
.collapse-panel__transition_right-level-active {
  transition: $--md-fade-transition;
}

.collapse-panel__transition_right-enter-to,
.collapse-panel__transition_right-leave {
  opacity: 1;
  transform: scaleX(1);
  transform-origin: top right;
}

.collapse-panel__transition_right-enter,
.collapse-panel__transition_right-leave-to {
  opacity: 0;
  transform: scaleX(0);
}
</style>
