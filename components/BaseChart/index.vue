<template>
  <div ref="chartEl" class="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts'
import throttle from 'lodash/throttle'
export default {
  name: 'BaseChart',
  props: {
    option: {
      type: Object,
      required: true,
    },
    theme: {
      type: [Object, String],
      default: '',
    },
    opts: {
      type: Object,
      default: () => ({
        width: 'auto',
        height: 'auto',
      }),
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      echartsInstance: null,
    }
  },
  watch: {
    option: {
      deep: true,
      handler(val) {
        this.clear()
        this.setOption(val)
      },
    },
  },
  mounted() {
    this.initChart()

    if (this.autoResize) {
      this.resize()
      this.echartsInstance.__resize = throttle(this.resize, 200)
      addEventListener('resize', this.echartsInstance.__resize)
      this.$once('hook:beforeDestroy', () => {
        removeEventListener('resize', this.echartsInstance.__resize)
      })
    }
  },
  methods: {
    // 暴露clear方法，清空当前实例，会移除实例中所有的组件和图表。
    clear() {
      this.echartsInstance && this.echartsInstance.clear()
    },
    // 暴露setOption方法，用于外部设置option
    setOption(option, notMerge, lazyUpdate) {
      this.echartsInstance &&
        this.echartsInstance.setOption(option, notMerge, lazyUpdate)
    },
    // 暴露resize方法，用于特殊情况手动resize
    resize(opts) {
      this.echartsInstance && this.echartsInstance.resize(opts)
    },
    // 暴露dispatchAction方法,用于触发图表行为
    dispatchAction(payload) {
      this.echartsInstance && this.echartsInstance.dispatchAction(payload)
    },
    initChart() {
      const defaultOpts = {
        renderer: 'canvas',
        width: 'auto',
        height: 'auto',
      }
      const opts = { ...this.opts, ...defaultOpts }
      this.echartsInstance = echarts.init(this.$refs.chartEl, this.theme, opts)
      this.echartsInstance.setOption(this.option)
    },
  },
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 200px;
}
</style>
