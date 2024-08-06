<template>
  <div class="app">
    <ContentDoc class="the-content">
      <template #not-found>
        (page not found)
      </template>
    </ContentDoc>
  </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig()
</script>
<style lang="less">
@import '@/less/elements.less';
</style>