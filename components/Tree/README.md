# Tree 树型组件

基于 [Element-UI 的 Tree 组件](https://element.eleme.cn/#/zh-CN/component/tree)进行的封装，基本用法保持不变, 修改了一些默认值，添加 v-mode 支持。

## 使用示例

![](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/img/20200210170636.png)

```js
import { Tree } from '@@components'
export default {
  name: 'Demo',
  components: {
    Tree,
  },
  data() {
    return {
      value: 1,
      value2: [1,4]
      treeData:[
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  label: 'Level three 1-1-1',
                },
                {
                  id: 10,
                  label: 'Level three 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              label: 'Level two 2-1',
            },
            {
              id: 6,
              label: 'Level two 2-2',
            },
          ],
        },
        {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 7,
              label: 'Level two 3-1',
            },
            {
              id: 8,
              label: 'Level two 3-2',
            },
          ],
        },
      ],
    }
  },
}
```

### 单选

默认单选，单选时 value 为数字或字符串。

```vue
<Tree :data="treeData" v-model="value1" ref="tree" />
```

### 多选

使用`show-checkbox` 开启多选，多选时 value 为数组。

```vue
<Tree :data="treeData" show-checkbox v-model="value2" ref="tree" />
```

### 钩子函数

所有 Element-UI 的 Tree 组件的钩子函数理论上都支持。组件内部的\$refs['tree']暴露了原生 el-tree 的实例。

```vue
this.$refs['tree'].$refs['tree'].getCheckedKeys()
```

## API

除以下参数外，其他参数将直接透传到 ElementUI 的 Upload 组件上。

| 参数       | 说明                                                         | 类型                  | 可选值 | 默认值 |
| :--------- | :----------------------------------------------------------- | :-------------------- | :----- | :----- |
| value      | 当前选中节点，支持 v-model。（多选时为 Array，单选时为 string 或者 number） | Array\|string\|number | -      | []     |
| node-key   | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的         | string                | -      | 'id'   |
| filterable | 是否允许检索                                                 | boolean               | -      | false  |

其他传入参数或事件监听将直接透传到内部 `el-tree` 组件上。

## 参考

> [Element-UI 的 Tree 组件](https://element.eleme.cn/#/zh-CN/component/tree)
