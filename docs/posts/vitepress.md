---
title: 'vitepress装修攻略'
date: 2024-03-27
author: zebraoo
tags:
  - blog
  - vitepress
  - css
---
# vitepress装修攻略

## 自定义主页
1. 首先创建Blog.vue
2. 在根目录index.md导入Blog.vue,可选择全局导入

```markdown
---
layout: home
---

<Blog/>
```
> layout属性可见 https://vitepress.dev/zh/reference/frontmatter-config#layout

## 布局插槽
> https://vitepress.dev/zh/guide/extending-default-theme#layout-slots

## 安装TDesign
> https://tdesign.tencent.com/vue-next/getting-started

```
npm i tdesign-vue-next
```

按需引入
```
1、 npm install -D unplugin-vue-components unplugin-auto-import
2、 import AutoImport from 'unplugin-auto-import/vite';
    import Components from 'unplugin-vue-components/vite';
    import { TDesignResolver } from 'unplugin-vue-components/resolvers';
3、
export default defineConfig({
  ...
  vite:{
     plugins: [
    // ...
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
  ],
  },
  ...

4、theme/index.ts
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

```

## 点击图片查看大图弹窗
> https://justin3go.com/%E5%8D%9A%E5%AE%A2/2023/09/29vitepress%E4%B8%AD%E5%BC%95%E5%85%A5Tdesign%E5%B9%B6%E5%85%A8%E5%B1%80%E5%A2%9E%E5%8A%A0%E5%A4%A7%E5%9B%BE%E9%A2%84%E8%A7%88