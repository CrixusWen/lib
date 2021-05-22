<script>
import { RadioButton, Radio } from 'element-ui'
export default {
  name: 'Radio',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      required: true,
    },
    button: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    const { label, value, button, checked } = this
    const props = {
      ...this.$attrs,
      label: value,
      value: checked ? value : '',
    }
    const renderLabel = () => this.$slots.default || label
    const Component = button ? RadioButton : Radio
    return (
      <Component props={props} on={this.$listeners}>
        {renderLabel()}
      </Component>
    )
  },
}
</script>
