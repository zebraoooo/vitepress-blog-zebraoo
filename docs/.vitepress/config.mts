import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zebraoo.life",
  description: "A VitePress Site zebraoo.life",
  markdown:{
    image:{
      lazyLoading:true
    }
  },
  vite:{
    plugins: [
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
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '归档', link: '/pages/archivers' },
    ],
    sidebar: {
      '/posts/android/': [
        {
          text: 'android',
          items: [
            { text: 'compose', link: '/posts/android/compose' },
            { text: 'gradle', link: '/posts/android/gradle' },
            { text: 'gradle', link: '/posts/android/profiler' },
          ]
        }
      ],
      '/posts/vue/': [
        {
          text: 'vue',
          items: [
            { text: 'vue2', link: '/posts/vue/vue2/vue2' },
            { text: 'vue3', link: '/posts/vue/vue3/vue3' },
          ]
        }
      ],
      '/posts/blog/': [
        {
          text: 'blog',
          items: [
            { text: 'sample', link: '/posts/blog/sample' },
            { text: 'vitepress', link: '/posts/blog/vitepress' },
          ]
        }
      ],
    }
    ,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zebraoo' }
    ],
    footer: {
      message: '欢迎',
      copyright: ''
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: 'local'
    },
  }
})
