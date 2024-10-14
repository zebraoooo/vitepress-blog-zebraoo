<template>
  <div
    style="
      display: flex;
      gap: 20px;
      padding-top: 30px;
      justify-content: space-between;
      align-items: flex-start;
    "
  >
    <div style="display: flex; flex-direction: column; gap: 15px;">
      <PostItem :post="post" v-for="post of postList" />
      <div style="margin-top: 10px" v-show="posts.length > 0">
    <button @click="loadMore" v-if="postList.length != posts.length">
      加载更多
    </button>
    <button v-else>报告！加载完毕</button>
  </div>
    </div>

    <div>
      <span>
        <img src="/logo.png" />
      </span>

      <div style="display: flex; gap: 10px;margin-top: 10px">
        <button>
          <a href="/pages/archivers.html">归档</a>
        </button>

        <button>
          <a href="https://github.com/zebraoo/vitepress-blog-zebraoo">Github</a>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import PostItem from "../components/BlogItem.vue";
import { data as posts } from "../posts.data";
import { ref } from "vue";
const { theme } = useData();
console.log(theme);

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
