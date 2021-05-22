<script>
import Checkbox from './checkbox'
export default {
  name: 'CheckboxGroup',
  components: {
    Checkbox,
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
    checkboxClass: {
      type: [String, Array, Object],
      default: '',
    },
  },
  render() {
    const { border, button, props, checkboxClass } = this
    const { value } = this.$attrs

    const { label: labelKey = 'label', value: valueKey = 'value' } = props
    return (
      <el-checkbox-group props={this.$attrs} on={this.$listeners}>
        {this.options.map(option => (
          <Checkbox
            props={{
              border,
              button,
              ...option,
              label: option[labelKey],
              value: option[valueKey],
              checked: value === option.value,
            }}
            class={checkboxClass}
            border={border}
            key={option.value}
          />
        ))}
      </el-checkbox-group>
    )
  },
}
</script>
