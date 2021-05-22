# 信息项展示组件

用于展示数据详情

## 使用

```vue
<template>
  <div>
    <info-group :cols="2" lable-width="20%" :data="detailData" label-position="right" />
  </div>
</template>

<script>
import { Radios } from '@@components'
export default {
  components: { InfoGroup },
  data() {
    return {
      detailData: [
        {
          label: '单号',
          content: 123,
        },
        {
          label: '名称',
          content: '名称',
        },
        {
          colspan: 2,
          label: '备注',
          labelWidth: 200,
          content:
            '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注',
        },
      ],
    }
  },
}
```

## 参数说明

### 组件接收参数说明

| 参数名称   | 说明                                           | 类型           | 可选值 | 默认值 |
| ---------- | ---------------------------------------------- | -------------- | ------ | ------ |
| cols       | 平分成几列展示                                 | Number         | -      | 2      |
| title      | 标题                                           | String         | -      | null   |
| labelWidth | label 宽，对应为 style 的 width，数字类型即 px | String\|Number | -      | null   |
| data       | 需要展示的数据，参考`data参数说明`             | Array          | -      |        |

### data 参数说明

| 参数名称   | 说明                                           | 类型                     | 可选值 | 默认值 |
| ---------- | ---------------------------------------------- | ------------------------ | ------ | ------ |
| label      | 数据项展示名称                                 | String\|Component        | -      | -      |
| colspan    | 单个数据项占用几列，不得大于`colCount`         | Number                   | -      | 1      |
| type       | 展示信息的类型，默认为文本                     | Number                   | image  | null   |
| labelWidth | label 宽，对应为 style 的 width，数字类型即 px | String\|Number           | -      | null   |
| content    | 数据项展示值                                   | String\|Array\|Component | -      | -      |
