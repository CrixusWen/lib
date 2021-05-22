<template>
  <div>
    <slot :images="images" :options="options"> </slot>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'
const defaultOptions = {
  url: 'data-src',
  title: (img, imgData) => `${imgData.naturalWidth} × ${imgData.naturalHeight}`,
}
export default {
  props: {
    images: {
      type: Array,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  watch: {
    images() {
      this.onChange()
    },
    options: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.rebuildViewer()
        })
      },
    },
  },
  mounted() {
    this.buildViewer()
  },
  beforeDestroy() {
    this.destroyViewer()
  },
  methods: {
    buildViewer() {
      this.$viewer = new Viewer(this.$el, {
        ...defaultOptions,
        ...this.options,
      })
    },
    rebuildViewer() {
      this.destroyViewer()
      this.buildViewer()
    },
    updateViewer() {
      if (!this.$viewer) {
        this.buildViewer()
      } else {
        this.$viewer.update()
      }
    },
    destroyViewer() {
      if (!this.$viewer) {
        return
      }
      this.$viewer.destroy()
      this.$viewer = null
    },
    onChange() {
      this.updateViewer()
    },
  },
}
</script>
