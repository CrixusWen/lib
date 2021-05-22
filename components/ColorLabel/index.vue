<template>
  <span class="color" :style="{ backgroundColor: hexColor }">{{
    hexColor
  }}</span>
</template>

<script>
export default {
  name: 'Color',
  props: {
    color: {
      type: String,
      require: true,
      default: '',
    },
  },
  computed: {
    hexColor() {
      if (!this.color) {
        return ''
      }
      return this.color.startsWith('#') ? this.color : `#${this.color}`
    },
  },
}
</script>

<style lang="scss" scoped>
.color {
  display: inline-block;
  padding: 4px 6px;
  line-height: 100%;
  text-align: center;
  border-radius: 4px;
}
</style>
