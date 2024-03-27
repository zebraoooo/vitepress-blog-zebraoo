<template>
  <div
    style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px"
  >
    <span>{{ time }}</span>

    <a :href='`/pages/archivers?tag=${tag}`' v-for="tag of page.frontmatter.tags" style="font-size: 12px">
      <span>. {{ tag }}</span>
    </a>
  </div>
</template>
<script setup lang="ts">
import { useData,useRoute } from "vitepress";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { computed } from "vue";

const { page } = useData();
// const { frontmatter } = page.value;
// const { author, category, date, tags } = frontmatter;

const time = computed(() => {
  return dayjs(page.value.frontmatter.date).format("YYYY-MM-DD");
});

import { reactive, ref, watch, nextTick } from "vue";
const route = useRoute();
watch(
  page,
  (newValue, oldValue) => {
    
  },
  { immediate: true }
)

</script>
