import Vue from 'vue'
const getComponentInstance = (options, props) => {
  if (!options) {
    return
  }
  const Component = Vue.extend(options)
  const componentInstance = new Component({
    propsData: props,
  })

  return componentInstance
}
export { getComponentInstance }
