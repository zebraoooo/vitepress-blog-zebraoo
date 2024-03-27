<template>
  <PostItem :post="post" v-for="post of postList" style="margin-bottom: 5px" />
  <div style="margin-top: 10px" v-show="posts.length > 0">
    <button @click="loadMore" v-if="postList.length != posts.length">
      加载更多
    </button>
    <button v-else>报告！加载完毕</button>
  </div>
</template>

<script setup lang="ts">
import PostItem from "../components/BlogItem.vue";
import { data as posts } from "../posts.data";
import { ref } from "vue";

interface Post {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
  };
  excerpt: string | undefined;
}

const pageSize = 5;
const postList = ref<Post[]>([]);
postList.value = posts.slice(0, pageSize);

function loadMore() {
  const currentLength = postList.value.length;
  postList.value = postList.value.concat(
    posts.slice(currentLength, currentLength + pageSize)
  );
}
</script>
