import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zebraoo.life",
  description: "A VitePress Site zebraoo.life",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '归档', link: '/pages/archivers' },
    ],
    sidebar: {
      '/posts/vue/': [
        {
          text: 'vue',
          items: [
            { text: 'vue2', link: '/posts/vue/vue2' },
            { text: 'vue3', link: '/posts/vue/vue3' },

          ]
        }
      ],
      '/posts/android/': [
        {
          text: 'android',
          items: [
            { text: 'compose', link: '/posts/android/compose' },
            { text: 'gradle', link: '/posts/android/gradle' },

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
    }
  }
})
