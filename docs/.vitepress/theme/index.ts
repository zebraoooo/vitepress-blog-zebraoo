// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import Blog from "./pages/Blog.vue"
import Home from "./pages/Home.vue"
import Archivers from "./pages/Archivers.vue"
import Tags from "./pages/Tags.vue"
import DocTop from "./components/DocTop.vue"
import Giscus from "./components/Giscus.vue"

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => h(DocTop),
      "doc-after": () => h(Giscus)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Blog',Blog)
    app.component('Home',Home)
    app.component('Archivers',Archivers)
    app.component('Tags',Tags)
  }
} satisfies Theme
