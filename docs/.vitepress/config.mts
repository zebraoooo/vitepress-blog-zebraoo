import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zebraoo.life",
  description: "A VitePress Site zebraoo.life",
  markdown: {
    image: {
      lazyLoading: true
    }
  },
  vite: {
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
  sitemap: {
    hostname: 'https://zebraoo.life'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '归档', link: '/pages/archivers' },
      { text: '记事本', link: '/pages/note' },
    ],
    sidebar: {
      '/posts/android/': [
        {
          text: 'android',
          collapsed: false,
          items: [
            { text: 'gradle', link: '/posts/android/gradle' },
            { text: 'profiler', link: '/posts/android/profiler' },
            {
              text: 'compose',
              collapsed: false,
              items: [
                { text: 'index', link: '/posts/android/compose/index' },
                { text: 'exoplayer', link: '/posts/android/compose/exoplayer' }
              ]
            }
          ]
        }
      ],
      '/posts/vue/': [
        {
          text: 'vue',
          collapsed: false,
          items: [
            { text: 'vue2', link: '/posts/vue/vue2/vue2' },
            { text: 'vue3', link: '/posts/vue/vue3/vue3' },
          ]
        }
      ],
      '/posts/data-structure': [
        {
          text: '数据结构',
          collapsed: false,
          items: [
            {
              text: '概念',
              collapsed: false,
              items: [
                {
                  text: "基本术语",
                  link: '/posts/data-structure/基本术语'
                },
                {
                  text: "算法",
                  link: '/posts/data-structure/算法'
                },
                {
                  text: "线性表",
                  link: '/posts/data-structure/线性表'
                },
                {
                  text: "栈与队列",
                  link: '/posts/data-structure/栈与队列'
                },
                {
                  text: "树",
                  link: '/posts/data-structure/树'
                },
                {
                  text: "排序",
                  link: '/posts/data-structure/排序'
                }
              ]
            },
          ]
        }
      ]
    }
    ,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zebraoo/vitepress-blog-zebraoo' }
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
