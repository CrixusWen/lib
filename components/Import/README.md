# Import 导入组件

导入组件封装了上传和记录显示组件，具体上传逻辑由外部控制。每次上传成功后将调用 `importRequest` 方法，该方法接收三个个参数，分别是上传成功后的响应response，导入成功回调resolve以及导入失败回调reject。

## 使用示例

```js
import { Import } from '@@components'
export default {
  name: 'Demo',
  components: {
    Import,
  },
  methods: {
    importRequest(response, resolve,reject) {
      // 在这里实现具体的导入逻辑,response为上传接口的返回值。上传成功后调用resolve，上传失败后调用reject。resolve和reject的参数生成一条导入记录
      // 新记录的展示可以通过传入recordColumns参数自定义
      const id = response.data[0]
      fakeImportAPI(id).then(res => {
          ;(res.success ? resolve : reject)({
            status: res.success,
            description: res.data,
          })
        })
        .catch(err => {
          reject({ status: false, description: err.message })
        })
    },
  },
}
```

### 简单使用

默认的导入

```vue
<Import :import-request="importRequest" success-msg="导入XXX成功！" error-msg="导入XXX失败！" />
```

### 自定义导入按钮

可通过 slot 自定义导入按钮

```vue
<Import
  :import-request="importRequest"
> <el-button>自定义导入按钮</el-button> </Import>
```

### 批量导入

如无特殊说明，所有未定义的属性都将直接透传到内部 Upload 组件上, 包括 Upload 的上传钩子等。

```vue
<Import :import-request="importRequest" multiple />
```

## API

除以下参数外，其他传入参数将默认透传到内部的 Upload 组件上。

| 参数          | 说明                                                         | 类型           | 可选值      | 默认值       |
| :------------ | :----------------------------------------------------------- | :------------- | :---------- | :----------- |
| title         | 导入弹窗标题                                                 | string         | -           | '导入'       |
| importRequest | 自定义导入方法，将接收三个参数，<br />分别是上传成功后的响应response，导入成功回调resolve以及导入失败回调reject。（resolve和reject的参数将会作为一条导入记录） | Function       | -           | -            |
| showRecord    | 是否显示导入记录                                             | boolean        | true\|false | true         |
| recordColumns | 自定义导入记录列表展示                                       | Array          | -           | -            |
| template      | 定义下载模板，支持传入下载地址，或者对象方式传入下载地址和文件名称\{url:'',name:''\} | string\|Object | -           | -            |
| successMsg    | 导入成功提示信息                                             | string         | -           | '导入成功！' |
| errorMsg      | 导入失败提示信息                                             | string         | -           | '导入失败！' |

### Slot

| name    | 说明               |
| :------ | :----------------- |
| default | 触发导入弹框的内容 |
