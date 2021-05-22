## AudioPlayer 音频播放器组件

音频播放器组件，简单实用HTML5的新标签 `audio`  , 组件上所有参数将默认透传到audio标签上。

### 基础用法

``` vue
<template>
	<AudioPlayer />
</template>

<script>
  import {AudioPlayer} from '@@components'
  export default {
    name:'DEMO',
    components:{
      AudioPlayer
    }
  }
</script>
```

### Attributes

所有 `audio` 标签支持的属性都可以通过 `options` 属性传入，

| 参数    | 说明                                                         | 类型   | 可选值 | 默认值                        |
| :------ | :----------------------------------------------------------- | :----- | :----- | :---------------------------- |
| options | audio标签配置，参考 [<audio> - HTML（超文本标记语言）MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) | Object | -      | {<br />autoplay: true,<br />} |

