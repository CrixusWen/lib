# Radios 单选框组件

单选框。基于 Element [Radio 单选框](https://element.eleme.cn/#/zh-CN/component/radio) 组件进行封装，在不更改功能特性的基础上简化了使用方式。

# 用法

### 基本

```vue
<template>
  <!-- 最简单的用法 -->
  <radios value="1" checked>radio</radios>
  <!-- label也可以通过label属性定义 -->
  <radios value="1" label="radio" />
  <!-- checked属性定义选中状态 -->
  <radios value="1" label="radio" checked />
  <!-- button属性用于渲染 button类型Radio -->
  <radios value="1" label="radio" button />
  <!-- 继承其他Element Radio 单选框属性 -->
</template>

<script>
import { Radios } from '@@components'
export default {
  name: 'demo',
  components: {
    Radios,
  },
}
</script>
```

### 分组

```vue
<template>
  <!-- 最简单的用法 -->
  <radio-group :options="options" v-model="data" />
  <!-- 可统一定义单选按钮样式 -->
  <radio-group :options="options" v-model="data" border size="mini" button />
</template>

<script>
import { Radios } from '@@components'
const RadioGroup = Radios.Group
export default {
  name: 'demo',
  components: {
    Radios,
  }
  data() {
    return {
      options: [{ label: 'label1', value: 1 }, { label: 'label2', value: 2 }],
      data: 1,
    }
  },
}
</script>
```

## API

### Radios

| 参数    | 说明                        | 类型    | 可选值 | 默认值 |
| :------ | :-------------------------- | :------ | :----- | :----- |
| label   | 选项文字信息                | string  | -      | ‘’     |
| value   | 根据 value 进行判断是否选中 | any     | -      | -      |
| button  | 是否显示按钮类型单选框      | boolean | -      | false  |
| checked | 指定当前是否选中            | boolean | -      | false  |

> 其他参数将直接透传到 Element 的单选组件上

### RadioGroup

| 参数     | 说明                                                                        | 类型     | 可选值 | 默认值                 |
| -------- | --------------------------------------------------------------------------- | -------- | ------ | ---------------------- |
| options  | 选项数据,每一项的所有属性将作为参数传到 Radios                              | Array    | -      | []                     |
| button   | 是否显示按钮类型单选框（如果 options[n]中已定义 button 属性将会优先使用。） | boolean  | -      | false                  |
| border   | 是否显示边框（如果 options[n]中已定义 border 属性将会优先使用。）           | boolean  | -      | false                  |
| getLabel | 自定义 label 取值，默认获取 label 字段                                      | Function | -      | option => option.label |
| getValue | 默认获取 value 取值逻辑，默认获取 value 字段                                | Function | -      | option => option.value |

> 其他参数将直接透传到 Element 的单选分组组件上
