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
        <div style="display: flex; gap: 2px">
          <span style="margin-bottom: 2px; color: black; font-size: 19px">
            {{ year }}
          </span>
          <span style="font-size: 13px">年</span>
        </div>

        <template v-for="month in reversedMonths">
          <div v-if="hasPosts(year, month)" style="display: flex; gap: 2px">
            <span style="font-size: 15px">
              {{ month }}
            </span>
            <span style="font-size: 10px">月</span>
          </div>

          <PostItem
              v-if="hasPosts(year, month)"
              :post="post"
              v-for="post of getPostsByMonth(year, month)"
              :key="post.title"
              style="margin: 5px 0px"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {data as posts} from "../posts.data";
import dayjs from "dayjs";
import PostItem from "../components/BlogItem.vue";
import {getQueryParam} from "../utils";
import {ref} from "vue";

const tag = getQueryParam("tag");

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

postList.value = posts.sort((a, b) => b.date.time - a.date.time);
if (tag != null && tag.length > 0) {
  postList.value = posts.filter((post) => post.tags.includes(tag));
}

const postsByYear: Record<number, Post[]> = {};
const postsByMonth: Record<number, Record<number, Post[]>> = {};
postList.value.forEach((post) => {
  const year = dayjs(post.date.time).year();
  const month = dayjs(post.date.time).month() + 1;
  postsByYear[year] = postsByYear[year] || [];
  postsByYear[year].push(post);

  postsByMonth[year] = postsByMonth[year] || {};
  postsByMonth[year][month] = postsByMonth[year][month] || [];
  postsByMonth[year][month].push(post);
});

const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a)); //年份倒序

function getPostsByMonth(year: number, month: number): Post[] {
  return postsByMonth[year]?.[month] || [];
}

function hasPosts(year: number, month: number): boolean {
  return !!getPostsByMonth(year, month).length;
}

const reversedMonths = ref(Array.from({length: 12}, (_, i) => 12 - i));


</script>
