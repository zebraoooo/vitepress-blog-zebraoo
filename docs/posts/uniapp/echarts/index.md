---
title: 'uniapp echarts 分包'
date: 2024-07-31
author: zebraoo
tags:
  - uniapp
  - echarts
  - 分包
  - 小程序
---
# compose

## echarts uniapp 分包异步化

<img src="https://raw.githubusercontent.com/zebraoo/picgo/main/zebraoo.top/pages-echart.png" width="600">


``` vue

npm install echarts

ChartView.vue

<template>
  <view style="width: 100%; height: 100%">
    <lEchart ref="chartRef" @finished="finished"></lEchart>
  </view>
</template>

<script setup>
// #ifdef VUE3
// #ifdef MP
const echarts = require('../../static/echarts.min')
// #endif
// #ifndef MP
import * as echarts from 'echarts'
// #endif
// #endif

import lEchart from '../l-echart/l-echart.vue'

const props = defineProps({
  option: {
    type: Object,
    default: () => { },
  },
})

const chartRef = ref(null) // 获取dom

watch(
  () => props.option,
  async (newValue) => {
    if (newValue && chartRef.value) {
      await nextTick()
      chartRef.value.setOption(newValue)
    }
  },
  { deep: true },
)

async function initChart() {
  await nextTick()
  if (chartRef.value) {
    const chartInstance = await chartRef.value.init(echarts)
    chartInstance.setOption(props.option)
  }
}

onMounted(() => {
  initChart()
})

const finished = () => {
  console.log('渲染完成')
}
</script>

```

``` json 
pages.json

"subPackages": [
    {
      "root": "pages-echarts",
      "pages": [
        {
          "path": "pages/index",
          "type": "page"
        }
      ]
    },

]

```

``` vue
在要使用的vue文件中引用 componentPlaceholder

<!-- <route lang="json5" type="page">
{
  layout: '',
  style: {
    navigationBarTitleText: '氢站详情',
    componentPlaceholder: {
      'chart-view':'view'
    },
  },
}
</route> -->

import ChartView from '@/pages-echarts/components/ChartView/index.vue'

// 获取屏幕边界到安全区域距离

// const { safeAreaInsets } = uni.getSystemInfoSync()

// const chartBottom = computed(() => {
//   const bottom = safeAreaInsets ? safeAreaInsets.bottom : 0
//   return bottom === 0 ? '5%' : bottom
// })


```
