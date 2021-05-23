# PDFViewer pdf 预览组件

# 用法

### 基本

```vue
<template>
  <p-d-f-viewer :pdf-src="pdfSrc" :title-name="titleName"></p-d-f-viewer>
</template>

<script>
import { PDFViewer } from '@@components'
export default {
  name: 'demo',
  components: {
    PDFViewer,
  },
  data() {
    return {
      pdfSrc: 'PDFURL',
      titleName: 'test',
    }
  },
}
</script>
```
