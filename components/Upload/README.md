# Upload 文件上传组件

基于 [Element-UI 的 Upload 组件](https://element.eleme.cn/#/zh-CN/component/upload)进行的封装，基本用法保持不变，封装了自定义上传逻辑，并基于常用业务简化了使用，如无特殊说明，Element-UI 的 Upload 组件的参数都可以直接使用。

## 使用示例

```js
import { Upload } from '@@components'
export default {
  name: 'Demo',
  components: {
    Upload,
  },
  data() {
    return {
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
    }
  },
}
```

### 单文件上传

```vue
<Upload v-model="fileList" />
```

### 多文件上传

```vue
<Upload v-model="fileList" multiple />
```

### 上传限制

```vue
<Upload
  v-model="fileList"
  accept=".doc,.jpg,.jpeg"
  multiple
  tip="只能上传.doc,.jpg,.jpeg文件,个数2个，大小100kb"
  :number-limit="2"
  :number-limit-msg="
    (currentNumber, lastNumber, numberlimit) =>
      `只能上传不超过 ${numberlimit} 个文件，本次选择了 ${currentNumber} 个文件，共选择了 ${currentNumber +
        lastNumber} 个文件！`
  "
  :size-limit="100"
  :size-limit-msg="(size, sizeLimit, file) =>
        `只能上传不超过 ${sizeLimit}kb 的文件，当前文件大小 ${size}kb ，请重新上传！`,"
/>
```

### 自定义触发器和提示信息

```vue
<Upload v-model="fileList" accept=".doc,.jpg,.jpeg">
      <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
      <p slot="tip">只能上传.doc,.jpg,.jpeg文件,个数2个，大小100kb</p>
</Upload>
```

### 钩子函数

所有 Element-UI 的 Upload 组件的钩子函数理论上都支持。

## API

除以下参数外，其他参数将直接透传到 ElementUI 的 Upload 组件上。

#### Props

| 参数                 | 说明                                                         | 类型                     | 可选值                               | 默认值                                                       |
| :------------------- | :----------------------------------------------------------- | :----------------------- | :----------------------------------- | :----------------------------------------------------------- |
| defaultFileList      | 默认已经上传的文件列表                                       | Array\|Object            | -                                    | null                                                         |
| value                | 上传文件列表，支持 v-model                                   | Array\|null              | -                                    | null                                                         |
| show-file-list       | 是否显示已上传文件列表                                       | boolean                  | -                                    | false                                                        |
| disabled             | 是否禁用                                                     | boolean                  | -                                    | false                                                        |
| sizeLimit            | 文件大小限制，单位为 kb                                      | number                   | -                                    | -                                                            |
| sizeLimitMsg         | 文件大小限制提示信息                                         | Function                 | -                                    | (size, sizeLimit, file) =>\`只能上传不超过 ${sizeLimit}kb 的文件，当前文件大小 ${size}kb ，请重新上传！\` |
| numberLimit          | 文件数量限制                                                 | number                   | -                                    | null                                                         |
| numberLimitMsg       | 文件数量限制提示信息                                         | string\|Function         | -                                    | (currentNumber, lastNumber, numberlimit) =>\`只能上传不超过 ${numberlimit} 个文件，本次选择了 ${currentNumber} 个文件，共选择了 \${currentNumber +lastNumber} 个文件！\` |
| acceptMsg            | 文件格式限制提示信息                                         | Function                 | -                                    | (ext, accept, file) =>\`只能上传 ${accept} 类型的文件，你选择的文件类型为 ${ext} ，请重新选择！\` |
| tip                  | 提示信息，如果定义了\$slot.tip 则不会生效                    | string\|Vnode            | -                                    | ''                                                           |
| accept               | 接受文件类型                                                 | string                   | -                                    | -                                                            |
| onRemove             | 文件列表移除文件时的钩子                                     | function(file, fileList) | -                                    | () => {return undefined}                                     |
| onChange             | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 | function(file, fileList) | -                                    | () => {return undefined}                                     |
| listType             | 文件列表的类型（在Element-UI的基础上扩展了tags-input类型）   | string                   | text/picture/picture-card/tags-input | text                                                         |
| tagsInputPlaceholder | tagsInput模式下的placeholder                                 | string                   | -                                    | 点击上传                                                     |
| tagsInputPreview     | tagsInput模式下是否开启预览                                  | boolean                  | -                                    | false                                                        |
| httpRequest          | 覆盖默认的上传行为，可以自定义上传的实现                     | Function                 | -                                    | 参考当前目录下httpRequest.js或者 https://github.com/ElemeFE/element/blob/dev/packages/upload/src/ajax.js |

### Events

| 事件名 | 说明                       | 参数                                                         |
| ------ | -------------------------- | ------------------------------------------------------------ |
| input  | 当文件列表改变时将触发事件 | 单文件模式（single为true）时，返回最后一次上传成功的文件，否则返回文件列表。 |



## 参考

> [Element-UI 的 Upload 组件](https://element.eleme.cn/#/zh-CN/component/upload)
