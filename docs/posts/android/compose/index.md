---
title: 'jetpack compose 常用知识'
date: 2024-03-27
author: zebraoo
tags:
  - jetpack compose
  - android
  - kotlin
---
# compose

## 如何在compose写耗时操作协程

```kotlin
 LaunchedEffect(pileAssets?.pieId) {
        withContext(IO) {
            snapshotFlow { stateFlow }.collect {
                it?.let {  ->
                    //执行耗时操作
                }
            }
        }
    }
```

## 如何在compose中使用hilt

通过引用ViewModel




