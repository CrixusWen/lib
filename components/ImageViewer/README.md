## ImageViewer 图片预览组件

基于 [viewerjs](https://github.com/fengyuanchen/viewerjs) 封装的图片预览组件，用于图片文件预览。

### 何时使用

- 当需要放大旋转预览图片时

### 基础用法

图片预览基础用法

```vue
<template>
  <ImageViewer :images="“images”">
    <template v-slot:default="{ images, options }">
      <div class="image-viewer-images">
        <img
          v-for="item in images"
          :key="item.src"
          :data-src="item.src"
          class="img"
          :src="item.src"
        />
      </div>
    </template>
  </ImageViewer>
</template>

<script>
import {ImageViewer} from '@@components'
export default {
  name:'DEMO',
  components:{
    ImageViewer
  }
  data:{
  	images:[{src:'123.png'},{src:'456.png'}]
	}
}
</script>
```

### Attributes

| 参数    | 说明                                                                               | 类型   | 可选值 | 默认值 |
| :------ | :--------------------------------------------------------------------------------- | :----- | :----- | :----- |
| images  | 图片数据对象。                                                                     | Array  | -      | -      |
| options | 参考 viewerjs 配置对象 [options](https://github.com/fengyuanchen/viewerjs#options) | Object | -      | -      |

### Scoped Slot

| name | 说明                        |
| :--- | :-------------------------- |
| -    | img 元素包含 img 元素的容器 |
