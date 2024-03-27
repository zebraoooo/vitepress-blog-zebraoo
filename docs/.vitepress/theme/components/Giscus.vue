<template>
  <div class="comments">
    <Giscus
      v-if="showComment"
      :repo="giscusConfig.repo"
      :repo-id="giscusConfig.repoId"
      :category="giscusConfig.category"
      :category-id="giscusConfig.categoryId"
      :mapping="giscusConfig.mapping"
      :reactions-enabled="giscusConfig.reactionsEnabled"
      :emit-metadata="giscusConfig.emitMetadata"
      :input-position="giscusConfig.inputPosition"
      :theme="isDark ? 'dark' : 'light'"
      :lang="giscusConfig.lang"
      :loading="giscusConfig.loading"
    />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, nextTick } from "vue";
import { useData, useRoute } from "vitepress";
import Giscus, { type GiscusProps } from "@giscus/vue";

const route = useRoute();

const { isDark } = useData();

// params generate in https://giscus.app/zh-CN
const giscusConfig: GiscusProps = reactive({
  repo: "zebraoo/vitepress-blog-zebraoo",
  repoId: "R_kgDOLlgi7g",
  category: "Q&A",
  categoryId: "DIC_kwDOLlgi7s4CeO2q",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  lang: "zh-CN",
  loading: "lazy",
});

const showComment = ref(true);
watch(
  () => route.path,
  () => {
    showComment.value = false;
    nextTick(() => {
      showComment.value = true;
    });
  },
  {
    immediate: true,
  }
);
</script>
<style>
.comments {
  padding: 20px;
  border-radius: 10px;
}
</style>
