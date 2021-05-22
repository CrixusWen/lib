## Empty 空状态

空状态时的展示占位图。

### 何时使用

- 当目前没有数据时，用于显式的用户提示。

### 基础用法

用法描述信息

``` vue
<template>
	<Empty />
</template>

<script>
  import {Empty} from '@@components'
  export default {
    name:'DEMO',
    components:{
      Empty
    }
  }
</script>
```

### Attributes

| 参数        | 说明                                                         | 类型          | 可选值 | 默认值 |
| :---------- | :----------------------------------------------------------- | :------------ | :----- | :----- |
| image       | 空状态提示图片，可以传入VNode或者图片src地址。如果提供了对应插槽，插槽优先级更高 | VNode\|string | -      | -      |
| description | 空状态描述信息VNode，也可以通过插槽的方式提供。如果提供了对应插槽，插槽优先级更高 | string        | -      | -      |

### Slot

| name        | 说明                           |
| :---------- | :----------------------------- |
| image       | 空状态展示图片                 |
| description | 具名slot需要给出名称，简述作用 |

