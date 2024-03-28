---
title: 'jetpack compose'
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

## 在compose HorizontalPager组件中如何引用exoplayer，并在滑动过程中不卡顿和黑屏

1、应把每个exoplayer实例保存起来，然后复用
```kotlin
private val players = hashMapOf<Int, ExoPlayer>()
```



