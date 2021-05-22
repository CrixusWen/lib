## [组件名称] [组件中文名称]

组件描述信息

### 何时使用

- 当xxx时，用于xxx
- xxxxxx

### 基础用法

用法描述信息

``` vue
<template>
	<[组件名] />
</template>

<script>
  import {[组件名]} from '@@components'
  export default {
    name:'DEMO',
    components:{
      [组件名]
    }
  }
</script>
```

### [其他用法]

[用法描述信息]

``` vue
<template>
	<[组件名] />
</template>

<script>
  import {[组件名]} from '@@components'
  export default {
    name:'DEMO',
    components:{
      [组件名]
    }
  }
</script>
```

### Attributes

| 参数 | 说明                           | 类型                                   | 可选值 | 默认值 |
| :--- | :----------------------------- | :------------------------------------- | :----- | :----- |
| -    | 简述参数作用，如果包含给出链接 | Object\|Array\|string\|number\|boolean | -      | -      |

### Methods

| 方法名 | 说明                   | 参数                                     |
| :----- | :--------------------- | :--------------------------------------- |
| -      | 简述方法作用，注意事项 | Function(params1?:Object,params2:string) |

### Events

| 事件名称 | 说明             | 回调参数       |
| :------- | :--------------- | :------------- |
| select   | 简述事件触发条件 | selection, row |

### Slot

| name   | 说明                           |
| :----- | :----------------------------- |
| -      | 默认slot，没有名称，简述作用   |
| append | 具名slot需要给出名称，简述作用 |

### Scoped Slot

| name   | 说明                               |
| :----- | :--------------------------------- |
| -      | 默认作用域插槽，参数描述，简述作用 |
| header | 具名作用域插槽，参数描述，简述作用 |