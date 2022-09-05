<script setup lang="ts">
const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    confine: true,
  },
  legend: {
    data: ['热度', '正面', '负面'],
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 15,
    top: 40,
    containLabel: true,
  },
  xAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999999',
        },
      },
      axisLabel: {
        color: '#666666',
      },
    },
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
      axisLine: {
        lineStyle: {
          color: '#999999',
        },
      },
      axisLabel: {
        color: '#666666',
      },
    },
  ],
  series: [
    {
      name: '热度',
      type: 'bar',
      label: {
        show: true,
        position: 'inside',
      },
      data: [300, 270, 340, 344, 300, 320, 310],
    },
    {
      name: '正面',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
      },
      data: [120, 102, 141, 174, 190, 250, 220],
    },
    {
      name: '负面',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'left',
      },
      data: [-20, -32, -21, -34, -90, -130, -110],
    },
  ],
})
const chart = ref()
const loading = ref(false)
const click = () => {
  loading.value = true
  // Simulate time-consuming operations
  setTimeout(() => {
    loading.value = false
  }, 3000)
  chart.value.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  })
}
</script>

<template>
  <view class="content">
    <Chart ref="chart" :options="option" />
    <button @click="click">
      click me
    </button>
  </view>
</template>
