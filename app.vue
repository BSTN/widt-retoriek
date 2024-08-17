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
import info from '@/repos/BSTN-widt-retoriek-content/.info.json'
console.log(info)
const store = useMainStore()

onMounted(async () => {
  await store.init()
})
</script>
<style lang="less">
@import '@/less/elements.less';
</style>