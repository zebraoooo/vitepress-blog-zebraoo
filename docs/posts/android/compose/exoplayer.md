---
title: "exoplayer在jetpack compose中的使用"
date: 2024-04-01
author: zebraoo
tags:
  - jetpack compose
  - android
  - kotlin
---

## 创建一个 compose 组件，并引入 AndroidView

```kotlin

@OptIn(UnstableApi::class)
@Composable
fun VideoView(player: Player, onDispose: (Player) -> Unit) {
    val context = LocalContext.current
    AndroidView(factory = {
        PlayerView(context).apply {
            useController = true
            controllerShowTimeoutMs = 1000
            setBackgroundColor(Color.BLACK)
            setShowBuffering(SHOW_BUFFERING_ALWAYS)
        }
    }, modifier = Modifier.fillMaxSize(),

        update = {
            it.player = player
        }, onRelease = {
            it.player = null
        })

    //compose 帮助你去释放实例
    DisposableEffect(player) {
        onDispose {
            onDispose(player)
        }
    }
}

```

## 在另外一个 compose 组件中引用，

> 我习惯于在 viewmodel 中去添加和获取数据源，因为可以更好的结合 hilt

```kotlin

 https://juejin.cn/post/7124893188812668964#heading-7 感谢这篇文章
 https://github.com/llwdslal/WanAndroid/tree/07-banner%E5%AE%9E%E7%8E%B0
 
 增加isAutoLoop的判断，撇去pagerState.isScrollInProgress
var isAutoLoop by remember { mutableStateOf(autoLoop) }

.pointerInput(items) {
                detectTapGestures(
                    onPress = {
                        isAutoLoop = false
                        val pressStartTime = System.currentTimeMillis()
                        //只监听 release
                        if (tryAwaitRelease()) {
                            isAutoLoop = true
                            val pressDuration = System.currentTimeMillis() - pressStartTime
                            //长按后 release 不触发 onClick 事件
                            if (pressDuration < viewConfiguration.longPressTimeoutMillis) { //400 ms
                                onItemClick?.invoke(items[pagerState.currentPage])
                            }
                        }
                    },
                )
            }

作者：给大佬们点赞
链接：https://juejin.cn/post/7124893188812668964
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

@Composable
fun ComposeView(videoViewModel: VideoViewModel = viewModel()){

 val exoPlayer = bannerViewModel.getMultipleExoPlayer(banner.data, context, )

 VideoView(exoPlayer) {
  videoViewModel.clearPlayer(it)
  }

}

```

<br>

## 添加数据源和缓存，这里我使用了 hilt 的单例模式

> 注意点：生命周期范围应在 viewmodel 中

```kotlin

@OptIn(UnstableApi::class)
@InstallIn(ViewModelComponent::class)
@Module
class VideoModule {
    @ViewModelScoped
    @Provides
    fun provideSimpleCache(@ApplicationContext context: Context): SimpleCache {
        return VideoCache.getInstance(context)
    }

    @ViewModelScoped
    @Provides
    fun provideProgressiveMediaSource(
        @ApplicationContext context: Context, simpleCache: SimpleCache
    ): ProgressiveMediaSource.Factory {
        val httpDataSource = DefaultHttpDataSource.Factory().setAllowCrossProtocolRedirects(true)
        val upstreamFactory = DefaultDataSource.Factory(context, httpDataSource)
        val cacheDataSourceFactory = CacheDataSource.Factory().setCache(simpleCache)
            .setUpstreamDataSourceFactory(upstreamFactory).setCacheWriteDataSinkFactory(null)
            .setFlags(CacheDataSource.FLAG_IGNORE_CACHE_ON_ERROR)

        return ProgressiveMediaSource.Factory(cacheDataSourceFactory)
    }
}

```

## viewmodel

```kotlin

@OptIn(UnstableApi::class)
@HiltViewModel
class videoViewModel @Inject constructor(
    private val progressiveMediaSource: ProgressiveMediaSource.Factory
) : ViewModel() {
    private val players = hashMapOf<String, Player?>()
    private var playerListener: Player.Listener? = null

    private val _isPlayingEnd = MutableStateFlow(false)
    val isPlayingEnd = _isPlayingEnd.asStateFlow()
    fun setPlayingEnd(isEnd: Boolean) = viewModelScope.launch {
        _isPlayingEnd.emit(isEnd)
    }

    private val _isPlayingError = MutableStateFlow(false)
    val isPlayingError = _isPlayingError.asStateFlow()
    fun setPlayingError(isError: Boolean) = viewModelScope.launch {
        _isPlayingError.emit(isError)
    }

    // 去Mtime时光网借几个测试视频
    private val videoList = listOf(
        VideoBean(
            "https://vfx.mtime.cn/Video/2019/01/15/mp4/190115161611510728_480.mp4"
        ),
        VideoBean(
            "https://vfx.mtime.cn/Video/2024/03/29/mp4/240329104949956164.mp4"
        ),

        VideoBean(
            "https://vfx.mtime.cn/Video/2024/03/04/mp4/240304102705890107.mp4"
        ),

        VideoBean(
            "https://vfx.mtime.cn/Video/2024/03/28/mp4/240328135334006153.mp4"
        ),
        VideoBean(
            "https://vfx.mtime.cn/Video/2024/03/01/mp4/240301143025556186.mp4"
        ),

        )

    //数据源，可以从接口去获取，我这里直接写在本地了
    fun getVideoList(): List<VideoBean> {
        return videoList
    }

    //exoplayer实例 在这里感谢 https://mp.weixin.qq.com/s/Z5ocXx6kZHN6wd4CNrDZ2w，利用池的概念
    fun getMultipleExoPlayer(url: String, context: Context,isPlayWhenReady:Boolean): Player {
        if (playerListener == null) {
            playerListener = object : Player.Listener {
                override fun onPlayerError(error: PlaybackException) {
                    super.onPlayerError(error)
                    setPlayingError(true)
                }

                override fun onPlaybackStateChanged(playbackState: Int) {
                    super.onPlaybackStateChanged(playbackState)
                    if (playbackState == Player.STATE_ENDED) {
                        setPlayingEnd(true)
                    }
                }

            }
        }

        return players[url] ?: createExoPlayer(url, context,isPlayWhenReady).also {
            players[url] = it
        }
    }

    private fun createExoPlayer(url: String, context: Context,isPlayWhenReady:Boolean): ExoPlayer {
         val trackSelectionFactory = AdaptiveTrackSelection.Factory()
        val trackSelector = DefaultTrackSelector(context, trackSelectionFactory)
        val mediaSource = progressiveMediaSource.createMediaSource(MediaItem.fromUri(url))
        val MIN_BUFFER_MS = 1_000
        val MAX_BUFFER_MS = 50_000
        val BUFFER_FOR_PLAYBACK_MS = 500
        val BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS = 1_000
        val loadControl = DefaultLoadControl.Builder().setBufferDurationsMs(
            DefaultLoadControl.DEFAULT_MIN_BUFFER_MS, // 最小预加载时间
            DefaultLoadControl.DEFAULT_MAX_BUFFER_MS, // 最大预加载时间
            DefaultLoadControl.DEFAULT_BUFFER_FOR_PLAYBACK_MS, // 播放时的缓冲时间
            DefaultLoadControl.DEFAULT_BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS // 重新缓冲后的播放缓冲时间
        )

            .setBufferDurationsMs(
                MIN_BUFFER_MS,
                MAX_BUFFER_MS,
                BUFFER_FOR_PLAYBACK_MS,
                BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS

            ).build()

        return ExoPlayer.Builder(context).setTrackSelector(trackSelector)
            .setLoadControl(loadControl).build().apply {
                addListener(playerListener!!)
                setMediaSource(mediaSource)
                repeatMode = if (bannerList.size<=1) REPEAT_MODE_ONE else REPEAT_MODE_OFF
                prepare()
                playWhenReady = isPlayWhenReady
            }
    }

    fun clearPlayer(player: Player){
         if (playerListener != null) {
            player.removeListener(playerListener!!)
        }
        player.release()
        players.remove(player.currentMediaItem?.localConfiguration?.uri.toString())
    }

    override fun onCleared() {
        super.onCleared()
        players.forEach {
            if (playerListener != null) {
                it.value?.removeListener(playerListener!!)
            }
            it.value?.release()
        }
        players.clear()
    }

}

```

## 缓存一定要用单例模式

```kotlin

@UnstableApi
class VideoCache {
    companion object {
        @Volatile
        private var instance: SimpleCache? = null
        fun getInstance(context: Context): SimpleCache {
            val databaseProvider: DatabaseProvider = StandaloneDatabaseProvider(context)
            return instance ?: synchronized(this) {
                instance ?: SimpleCache(
                    File(context.cacheDir, "media"),
                    LeastRecentlyUsedCacheEvictor((100 * 1024 * 1024).toLong()),
                    databaseProvider
                ).also { instance = it }
            }
        }
    }
}

```

## 总结

经结合 HorizontalPager 测试，exoplayer 占用内存大小不到 90m（根据视频大小），每次切换都会释放 exoplayer 实例。

## 还需要补充的点

- 如果想仿抖音那种，还需要，完善动画效果、无缝播放效果、实例缓存等等
