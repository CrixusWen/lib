# List 列表

列表组件，提供了三层组件分别是列表组件 List，列表项组件 ListItem，以及列表项信息模板组件 ListItemMeta。

- 简单列表

![](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/20191223113036.png)

- 复杂列表

![](https://raw.githubusercontent.com/jiangwenyang/graphbed/master/20191227104114.png)

## 使用示例

```js
import { List } from '@@components'
const ListItem = List.Item
const ListItemMeta = List.Item.Meta

export default {
  data() {
    const list = [
      { id: 1, title: 'title1', description: 'description' },
      { id: 2, title: 'title2', description: 'description' },
      { id: 3, title: 'title3', description: 'description' },
      { id: 4, title: 'title4', description: 'description' },
    ]
    return {
      list: list,
      selectedItem: list[1],
    }
  },
}
```

### 简单列表

```vue
<List :data="list">
  <ListItem slot="renderItem" slot-scope="item, index">
    <ListItemMeta
      :title="item.title"
      :description="item.description"
      :index="String(index)"
    />
  </ListItem>
</List>
```

### 可操作的列表

```vue
<List :data="list">
  <ListItem slot="renderItem" slot-scope="item, index">
    <ListItemMeta
      :title="item.title"
      :description="item.description"
      :index="String(index)"
    />
    <div>这里是默认渲染的内容</div>
    <el-button slot="actions" type="primary" size="mini">编辑</el-button>
    <el-button slot="actions" type="danger" size="mini">删除</el-button>
  </ListItem>
</List>
```

### 自定义选项渲染

```vue
<List :data="list">      
    <div slot="renderItem" slot-scope="item, index">
    {{ index }} - {{ item.title }} - {{ item.description }}
    </div>
</List>
```

### 选择

支持 `v-model` 获取当前选中项目。同时也支持 `change` 事件获取选中更新，回调参数为当前选中项。

```vue
<List :data="list" v-model="selectedItem">
  <ListItem slot="renderItem" slot-scope="item, index">
    <ListItemMeta
      :title="item.title"
      :description="item.description"
      :index="String(index)"
    />
  </ListItem>
</List>
```

### 带边框和分割线的列表

> 默认为带分割线，如果不需要分割线传入 hide-split 即可。

```vue
<List :data="list" border hide-split>
  <ListItem slot="renderItem" slot-scope="item, index">
    <ListItemMeta
      :title="item.title"
      :description="item.description"
      :index="String(index)"
    />
  </ListItem>
</List>
```

### 自定义头部和尾部

```vue
<List :data="list">
  <header slot="header">header</header>
  <ListItem slot="renderItem" slot-scope="item, index">
    <ListItemMeta
      :title="item.title"
      :description="item.description"
      :index="String(index)"
    />
  </ListItem>
  <header slot="footer">footer</header>
</List>
```

## API

### List

| 参数       | 说明                                                                     | 类型                   | 默认值 |
| :--------- | :----------------------------------------------------------------------- | :--------------------- | :----- |
| bordered   | 是否展示边框                                                             | boolean                | false  |
| footer     | 列表底部                                                                 | string\|slot           | -      |
| header     | 列表头部                                                                 | string\|slot           | -      |
| hide-split | 是否隐藏分割线                                                           | boolean                | false  |
| renderItem | 自定义`Item`函数，也可使用 slot="renderItem" 和 slot-scope="item, index" | (item, index) => vNode |        |
| rowKey     | 各项 key 的取值，可以是字符串或一个函数                                  | item => string\|number |        |

### List.Item

| 参数    | 说明                   | 类型                   | 默认值 |
| :------ | :--------------------- | :--------------------- | :----- |
| actions | 列表操作组, 位置最右侧 | Array\<vNode\> \| slot | -      |
| extra   | 额外内容，位置在下侧   | vNode \| slot          | -      |

### List.Item.Meta

| 参数        | 说明               | 类型         | 默认值 |
| :---------- | :----------------- | :----------- | :----- |
| index       | 列表元素的索引     | string\|slot | -      |
| description | 列表元素的描述内容 | string\|slot | -      |
| title       | 列表元素的标题     | string\|slot | -      |
