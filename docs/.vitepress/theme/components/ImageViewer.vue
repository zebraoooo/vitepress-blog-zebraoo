<template>
  <t-image-viewer :images="[img]" :closeOnOverlay="true">
    <template #trigger="{ open }">
      <div class="tdesign-demo-image-viewer__ui-image">
        <img :src="img" />
        <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open">
          <span><BrowseIcon size="1.4em" /> 预览</span>
        </div>
      </div>
    </template>
  </t-image-viewer>
</template>
<script lang="ts" setup>
import { BrowseIcon } from "tdesign-icons-vue-next";

const props = defineProps(['img']);
</script>
<style scoped>
.tdesign-demo-image-viewer__ui-image {
  width: 100%;
  height: 100%;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: var(--td-radius-small);
  overflow: hidden;
}

.tdesign-demo-image-viewer__ui-image--hover {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--td-text-color-anti);
  line-height: 22px;
  transition: 0.2s;
}

.tdesign-demo-image-viewer__ui-image:hover
  .tdesign-demo-image-viewer__ui-image--hover {
  opacity: 1;
  cursor: pointer;
}
</style>
