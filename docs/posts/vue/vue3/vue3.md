---
title: 'vue3'
date: 2024-03-27
author: zebraoo
tags:
  - vue3
---
# vue3

## 解构失去响应性，如何解决
使用 toRef 或者 toRefs 
- toRef: 复制 reactive 里的单个属性并转成 ref
- toRefs: 复制 reactive 里的所有属性并转成 ref

都是延续响应式能力，不是创建响应式数据。
ref 和 reactive 才是创建响应式数据的 API。
如果使用了解构赋值，丢失了响应式能力，就可以用 toRef 或 toRefs 延续响应式能力，以至于在模板中可以继续使用 Vue 的特性。