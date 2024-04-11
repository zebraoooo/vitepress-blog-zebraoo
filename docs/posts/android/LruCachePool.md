---
title: "LruCachePool"
date: 2024-04-03
author: zebraoo
tags:
  - android
  - android studio
---

```
import android.util.Log
import android.util.LruCache


interface Pool<T> {
    fun acquire(): T
    fun release(instance: T)
}

// 对象池工厂接口
interface PoolFactory<T> {
    fun create(): T
}


// 基于LruCache实现这个接口
open class LruCachePool<T : Any>(
    maxSize: Int, private val factory: PoolFactory<T>
) : Pool<T> {

     private val cache: LruCache<Class<T>, T> = LruCache(maxSize)
    override fun acquire(): T {
        val type = factory.create().javaClass

        Log.e("","ExoPlayerImpl cache.get(type)--->${ cache.get(type)}")
        return cache.get(type) ?: factory.create().also { newInstance ->
            cache.put(type, newInstance)
        }
    }

    override fun release(instance: T) {
        Log.e("","ExoPlayerImpl release--->${ instance}")
        cache.remove(instance.javaClass)
    }
}

```