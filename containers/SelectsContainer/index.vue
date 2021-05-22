<template>
  <selects :options="optionsData" v-bind="$attrs" v-on="$listeners"></selects>
</template>

<script>
import { Selects } from '@@components'
import { noop } from '@@utils/util'
export default {
  name: 'SelectContainer',
  components: {
    Selects,
  },
  props: {
    // 默认选项
    options: {
      type: Array,
      default: () => [],
    },
    // 自定义获取选项，如果有返回值为数组，将直接作为选项
    fetchOptions: {
      type: Function,
      default: noop,
    },
    // 自定义option函数，接收默认option和数据项作为参数，返回一个option，如果返回false，则视为过滤掉此项
    customOption: {
      type: Function,
      default: option => option,
    },
  },
  data() {
    return {
      fetchOptionsData: [],
    }
  },
  computed: {
    optionsData() {
      return (this.fetchOptionsData && this.fetchOptionsData.length
        ? this.fetchOptionsData
        : this.options
      ).reduce((options, item) => {
        const option = this.customOption
          ? this.customOption(item, item)
          : option

        option && options.push(option)
        return options
      }, [])
    },
  },
  mounted() {
    // 如果已经有值，不再拉取
    if (!(this.options && this.options.length)) {
      this.fetchOptions && this.getOptions()
    }
  },
  methods: {
    async getOptions() {
      const options = await this.fetchOptions()
      if (Array.isArray(options)) {
        this.fetchOptionsData = options || []
      }
    },
  },
}
</script>
