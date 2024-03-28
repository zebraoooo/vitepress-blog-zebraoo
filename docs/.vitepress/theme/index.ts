// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import Home from "./pages/Home.vue"
import Archivers from "./pages/Archivers.vue"
import DocTop from "./components/DocTop.vue"
import Giscus from "./components/Giscus.vue"
import 'tdesign-vue-next/es/style/index.css'
import  ImageViewer from "./components/ImageViewer.vue"
import  MdImageView from "./components/MdImageView.vue"
import GuestBook from "./pages/GuestBook.vue"

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => h(DocTop),
      "doc-after": () => h(Giscus),
      "doc-bottom": () => h(MdImageView),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Home',Home)
    app.component('Archivers',Archivers)
    app.component('ImageViewer',ImageViewer)
    app.component('GuestBook',GuestBook)
    app.component('Giscus',Giscus)
  }
} satisfies Theme
