<template>
  <audio v-bind="audioOptions" />
</template>

<script>
const defaultOptions = {
  autoplay: true,
}
export default {
  name: 'AudioPlayer',
  props: {
    options: {
      type: Object,
      default: () => defaultOptions,
    },
  },
  computed: {
    audioOptions() {
      return {
        ...defaultOptions,
        ...this.options,
      }
    },
  },
}
</script>
