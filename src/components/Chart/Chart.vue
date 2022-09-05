<script setup lang="ts">
import * as echarts from 'echarts/core'
import { BarChart, CustomChart, LineChart, PieChart, SankeyChart } from 'echarts/charts'
import { DatasetComponent, GraphicComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent, TransformComponent } from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import LEchart from './l-echart/index.vue'

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {}
    },
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  loading: {
    type: Boolean,
    default: true,
  },
})

// 注册必须的组件
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  GraphicComponent,
  LineChart,
  CustomChart,
  BarChart,
  PieChart,
  SankeyChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

const chart = ref()
watch(() => props.loading, (newVal): void => {
  return newVal
    ? chart.value.showLoading({
      text: '加载中……',
      color: '#24e0ff',
    })
    : chart.value.hideLoading()
})
defineExpose({
  setOption: (option: any) => {
    chart.value.setOption(option, true)
  },
})
onMounted(() => {
  chart.value.init(echarts, (chart: any) => {
    chart.setOption(props.options)
  })
})
</script>

<template>
  <LEchart ref="chart" />
</template>
