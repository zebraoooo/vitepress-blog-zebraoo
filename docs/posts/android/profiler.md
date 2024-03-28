---
title: "profiler"
date: 2024-03-28
author: zebraoo
tags:
  - profiler
  - android
---

## Memory Profiler - 内存分析 [转载](https://blog.csdn.net/qq_20451879/article/details/121426183)

> [官网](https://developer.android.com/studio/profile/memory-profiler?hl=zh-cn)。

<ImageViewer :img="'https://developer.android.com/static/studio/images/profile/memory-profiler-callouts_2x.png?hl=zh-cn'"/>

如上图所示，内存分析器的默认视图包括以下各项：

1. 用于强制执行垃圾回收事件的按钮。
2. 用于捕获堆转储的按钮。

   > 注意：只有在连接到搭载 Android 7.1（API 级别 25）或更低版本的设备时，系统才会在堆转储按钮右侧显示用于记录内存分配情况的按钮。

3. 用于指定性能分析器多久捕获一次内存分配的下拉菜单。选择适当的选项可帮助您在进行性能剖析时提高应用性能。
4. 用于缩放时间轴的按钮。
5. 用于跳转到实时内存数据的按钮。
6. 事件时间轴，显示活动状态、用户输入事件和屏幕旋转事件。
7. 内存使用量时间轴，它会显示以下内容：

   - 一个堆叠图表，显示每个内存类别当前使用多少内存，如左侧的 y 轴以及顶部的彩色键所示。
   - 一条虚线，表示分配的对象数，如右侧的 y 轴所示。
   - 每个垃圾回收事件的图标。

8. 但是，如果您使用的是搭载 Android 7.1 或更低版本的设备，并非所有分析数据在默认情况下都可见。如果您看到一条消息，显示“Advanced profiling is unavailable for the selected process”，您需要启用高级性能剖析才能看到以下内容： - 事件时间轴 - 分配的对象数 - 垃圾回收事件
   在 Android 8.0 及更高版本上，系统会一律为可调试的应用启用高级性能剖析。
