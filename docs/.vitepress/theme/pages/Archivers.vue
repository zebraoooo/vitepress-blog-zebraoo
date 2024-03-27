<template>
  <div style="padding-top: 30px">
    <div
      style="margin-bottom: 20px; display: flex; align-items: center; gap: 10px"
      v-if="tag"
    >
      <span style="font-size: 20px">{{ tag }}</span>
      {{ postList?.length }}
    </div>
    <div v-for="year of years">
      <div style="display: flex; flex-direction: column; margin-bottom: 10px">
        <span style="margin-bottom: 2px; color: black; font-size: 19px">
          {{ year }}
        </span>

        <PostItem
          :post="post"
          v-for="post of postsByYear[year]"
          style="margin-bottom: 5px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from "../posts.data";
import dayjs from "dayjs";
import PostItem from "../components/BlogItem.vue";
import { getQueryParam } from "../utils";
import { ref } from "vue";
const tag = getQueryParam("tag");
console.log("tag-->", tag);

interface Post {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
  };
  excerpt: string | undefined;
  tags?: string[];
}

const postList = ref<Post[]>();

postList.value = posts;
if (tag != null && tag.length > 0) {
  postList.value = posts.filter((post) => post.tags.includes(tag));
}

const postsByYear = {};
postList.value.forEach((post) => {
  const year = dayjs(post.date.time).year();
  postsByYear[year] = postsByYear[year] || [];
  postsByYear[year].push(post);
});
const years = Object.keys(postsByYear).sort().reverse();
</script>
