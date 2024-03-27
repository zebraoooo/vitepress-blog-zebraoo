---
title: 'jetpack compose'
date: 2024-03-27
author: zebraoo
tags:
  - jetpack compose
  - android
  - kotlin
---
# jetpack compose 知识点

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




