import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zebraoo.blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/avatar.jpg',
    nav: [
      { text: 'Blog', link: '/' },
      { text: '归档', link: '/pages/archivers' },
    ],


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
