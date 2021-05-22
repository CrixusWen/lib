<script>
import Radio from './radio'
export default {
  name: 'RadioGroup',
  components: {
    Radio,
  },
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value',
      }),
    },
    button: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    const { border, button, props } = this
    const { value } = this.$attrs
    const { label: labelKey = 'label', value: valueKey = 'value' } = props
    return (
      <el-radio-group props={this.$attrs} on={this.$listeners}>
        {this.options.map(option => (
          <Radio
            props={{
              border,
              button,
              ...option,
              label: option[labelKey],
              value: option[valueKey],
              checked: value === option.value,
            }}
            border={border}
            key={option.value}
          />
        ))}
      </el-radio-group>
    )
  },
}
</script>
