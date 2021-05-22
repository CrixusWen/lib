<template>
  <div @click="toggleClick">
    <svg-icon
      icon-class="expand"
      :class="{ 'is-active': isActive }"
      class="hamburger"
    />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    },
  },
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  width: 20px;
  height: 20px;
  font-size: 16px;
  color: #fff;
  vertical-align: middle;
  transition: all 0.3s ease-out;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
