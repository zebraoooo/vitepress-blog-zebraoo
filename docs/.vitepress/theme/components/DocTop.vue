<template>
  <div
    style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px"
  >
    <span>{{ time }}</span>

    <a :href='`/pages/archivers?tag=${tag}`' v-for="tag of tags" style="font-size: 12px">
      <span>. {{ tag }}</span>
    </a>
  </div>
</template>
<script setup lang="ts">
import { useData } from "vitepress";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
import { computed } from "vue";

const { theme, page, title } = useData();
const { frontmatter } = page.value;
const { author, category, date, tags } = frontmatter;
console.log("frontmatter---",frontmatter)

const time = computed(() => {
  return dayjs(date).format("YYYY-MM-DD");
});
</script>
