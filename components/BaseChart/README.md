## BaseChart 基础图表组件

基于Echart封装的基础图表组件，支持自动缩放以及自定义样式等。

### 基础用法

``` vue
<template>
	<BaseChart />
</template>

<script>
  import {BaseChart} from '@@components'
  export default {
    name:'DEMO',
    components:{
      BaseChart
    }
  }
</script>
```

### Attributes

| 参数       | 说明                                                         | 类型           | 可选值 | 默认值                        |
| :--------- | :----------------------------------------------------------- | :------------- | :----- | :---------------------------- |
| option     | 图表实例的配置项以及数据                                     | Object         | -      | -                             |
| theme      | 应用的主题。可以是一个主题的配置对象，也可以是使用已经通过 [echarts.registerTheme](https://echarts.apache.org/zh/api.html#echarts.registerTheme) 注册的主题名称。 | Object\|string | -      | -                             |
| opts       | 图表实例初始化附加参数，具体参考 https://echarts.apache.org/zh/api.html#echarts.init 使用 | Object         | -      | {width:'auto',height:'auto',} |
| autoResize | 是否自动缩放, 开启后将监听窗口的resize事件缩放图表           | boolean        | -      | true                          |
| chartStyle | 图表容器style                                                | Object         | -      | -                             |

### Methods

| 方法名         | 说明                                                         | 参数                                                         |
| :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| clear          | 暴露Echart实例的setOption方法。清空当前实例，会移除实例中所有的组件和图表。 | -                                                            |
| setOption      | 暴露Echart实例的setOption方法。设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过 `setOption` 完成，ECharts 会合并新的参数和数据，然后刷新图表。如果开启[动画](https://echarts.apache.org/zh/option.html#option.animation)的话，ECharts 找到两组数据之间的差异然后通过合适的动画去表现数据的变化。 | Function(<br />option: Object, notMerge?:boolean, lazyUpdate?:boolean) |
| resize         | 暴露Echart实例的resize方法。改变图表尺寸，用于特殊情况手动resize。参考 [echartsInstance.](https://echarts.apache.org/zh/api.html#echartsInstance) [resize](https://echarts.apache.org/zh/api.html#echartsInstance.resize) | Function(opts?:Object)                                       |
| dispatchAction | 暴露Echart实例的dispatchAction方法，触发图表行为。参考[echartsInstance.](https://echarts.apache.org/zh/api.html#echartsInstance) [dispatchAction](https://echarts.apache.org/zh/api.html#echartsInstance.dispatchAction) | Function(payload: Object)                                    |

> 当你想调用的方法没有暴露出来时，你可以直接通过refs['myChart'].echartsInstance 来获取到echart实例来调用。