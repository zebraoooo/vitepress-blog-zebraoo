fun ImageView.loadVideoUrl(url: String) = this.apply {
    load(url) {
        decoderFactory { result, options, _ ->
            VideoFrameDecoder(
                result.source,
                options
            )
        }
    }
}


AndroidView(
                modifier = Modifier
                    .fillMaxSize(),
                factory = { ImageView(it).loadVideoUrl(banner.data) },
                update = { it.loadVideoUrl(banner.data) }
            )