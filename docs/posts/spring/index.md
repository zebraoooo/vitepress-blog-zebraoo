---
title: 'Spring'
date: 2024-08-01
author: zebraoo
tags:
  - Spring
---

## 注解

### @Qualifier
一般使用在项目中使用@Qualifier来限定注入的Bean。

### @PostConstruct
在构造函数执行之后执行的方法注解

当一个类被实例化并完成依赖注入后，被 @PostConstruct 注解的方法会被自动调用，用于执行一些初始化的操作

## 接口

### SmartInitializingSingleton 
用于在 Spring 容器中所有单例 Bean 初始化完成后执行一些自定义的初始化逻辑。

它允许开发者在所有单例 Bean 都已经准备就绪后执行一些特定的操作，这对于需要在应用程序启动时进行一些额外的初始化工作的场景非常有用。

在所有单例 Bean 初始化完成后执行初始化逻辑的场景。
```java
public interface SmartInitializingSingleton {
    void afterSingletonsInstantiated();
}

```


QueryDSL Q类无法生成的问题
https://www.cnblogs.com/roostinghawk/p/12257785.html

在Maven中先手动执行apt
然后在project项目中右键maven-Generate Sources And Update Folders