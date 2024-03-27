---
title: 'jetpack compose'
date: 2024-03-27
author: zebraoo
category: jetpack compose
tags:
  - jetpack compose
  - android
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




