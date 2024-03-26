<template>
  <div v-for="year of years">
    <div style="display: flex; flex-direction: column; margin-bottom: 10px">
      <span style="margin-bottom: 2px;color: black; font-size: 19px;">
        {{ year }}       
      </span>

      <PostItem :post="post" v-for="post of postsByYear[year]" style="margin-bottom: 5px;"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from "../posts.data";
import dayjs from "dayjs";
import PostItem from "../components/PostItem.vue";

const postsByYear = {};
posts.forEach((post) => {
  const year = dayjs(post.date.time).year();
  postsByYear[year] = postsByYear[year] || [];
  postsByYear[year].push(post);
});
const years = Object.keys(postsByYear).sort().reverse();
</script>
