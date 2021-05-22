<script>
import { CheckboxButton, Checkbox } from 'element-ui'
export default {
  name: 'Checkbox',
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    button: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    trueValue: {
      type: [String, Number],
      default: undefined,
    },
    falseValue: {
      type: [String, Number],
      default: undefined,
    },
  },
  render() {
    const {
      label,
      value,
      button,
      checked,
      trueValue,
      falseValue,
      disabled,
    } = this
    let props = {
      ...this.$attrs,
      label: value,
      value,
      checked,
      trueLabel: trueValue,
      falseLabel: falseValue,
      disabled,
    }

    const renderLabel = () => this.$slots.default || label

    const Component = button ? CheckboxButton : Checkbox

    return (
      <Component props={props} on={this.$listeners}>
        {renderLabel()}
      </Component>
    )
  },
}
</script>
