<template>
  <div style="display: flex; flex-direction: column; gap: 5px">
    <a :href="post.url">
      <span>{{ post.title }}</span>
    </a>
    <span style="font-size: 13px">{{
      dayjs(post.date.time).format("YYYY-MM-DD")
    }}</span>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";
defineProps({
  post: {
    type: Object,
    default: () => {},
  },
});
</script>
