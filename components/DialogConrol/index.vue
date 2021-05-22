<template>
  <el-dialog
    :visible="visible"
    :title="title"
    :width="width"
    :append-to-body="appendToBody"
    :destroy-on-close="destroyOnClose"
    @close="onClose"
  >
    <slot> </slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogConrol',
  props: {
    title: {
      type: String,
      default: null,
    },
    width: {
      type: [String, Number],
      default: '',
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    onClose() {
      this.visible = false
      this.$emit('onClose')
    },
    show() {
      this.visible = true
    },
  },
}
</script>

<style lang="scss" scoped></style>
