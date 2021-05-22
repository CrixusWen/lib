# Tree 树型组件

基于 Element-UI 的 [Tree 组件](https://element.eleme.cn/#/zh-CN/component/tree) + [Select 组件](https://element.eleme.cn/#/zh-CN/component/select) + [Popover 组件](https://element.eleme.cn/#/zh-CN/component/popover)进行的封装，支持单选多选，以及 `v-model` 模式。可以通过 `selectProps` 和 `treeProps` 属性分别自定义 Select 组件 和 Tree 组件原生的一些属性。

> 注意：目前未实现树的搜索功能，如果有需要后续提供。

## 使用示例

![](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/img/20200211142442.png)

```js
import { TreeSelect } from '@@components'
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
<TreeSelect :data="treeData" v-model="value1" ref="treeSelect1" />
```

### 多选

使用`multiple` 开启多选，多选时 value 为数组。

```vue
<TreeSelect :data="treeData" multiple v-model="value2" ref="treeSelect2" />
```

### 钩子函数

所有 Element-UI 的 Select 组件和 Tree 组件 以及 Popover 组件的钩子函数理论上都支持。

- Select 的 钩子函数获取方式

  ```js
  this.$refs['treeSelect1'].$refs['select'].focus()
  ```

- Tree 的钩子函数的获取方式

  ```js
  this.$refs['treeSelect1'].$refs['tree'].$refs['tree'].getCheckedKeys()
  ```

- Popover 的钩子函数获取方式

  ```js
  this.$refs['treeSelect1'].$refs['popover']
  ```

## API

除以下参数外，其他参数将直接透传到 ElementUI 的 Upload 组件上。

| 参数             | 说明                                                         | 类型                  | 可选值                                                       | 默认值                                                       |
| :--------------- | :----------------------------------------------------------- | :-------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value            | 当前选中节点，支持 v-model。（多选时为 Array，单选时为 string 或者 number） | Array\|string\|number | -                                                            | []                                                           |
| data             | Tree 的 Data 属性                                            | string                | -                                                            | []                                                           |
| multiple         | 是否多选                                                     | boolean               | -                                                            | false                                                        |
| selectClass      | 选择器最外层容器 class                                       | string                | -                                                            | ''                                                           |
| selectInputStyle | 选择器输入框 style                                           | Object                | -                                                            | {}                                                           |
| disabled         | 是否禁用输入框                                               | boolean               | -                                                            | false                                                        |
| selectProps      | 选择框自定义 Props                                           | Object                | -                                                            | {'collapse-tags': true, clearable: true, disabled: false, placeholder: '请选择',} |
| treeProps        | 树组件自定义 Props                                           | Object                |                                                              | {filterable: false,data: [],props: {children: 'children',label: 'label',value: 'id',disabled: 'disabled',},} |
| placement        | 弹出框位置                                                   | string                | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | Bottom                                                       |
| popperClass      | 为 popper 添加类名                                           | string                | -                                                            | -                                                            |
| emitParent       | 是否抛出父元素值                                             | boolean               | -                                                            | true                                                         |
| emitChildren     | 是否抛出子元素值                                             | boolean               | -                                                            | true                                                         |
| filterable       | 是否默认展开                                                 | boolean               | -                                                            | true                                                         |

## 参考

> - [Element-UI Tree 组件](https://element.eleme.cn/#/zh-CN/component/tree)
>
> - [Element-UI Select 组件](https://element.eleme.cn/#/zh-CN/component/select)
> - [Element-UI Popover 组件](https://element.eleme.cn/#/zh-CN/component/popover)
