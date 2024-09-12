<template>
  <div class="app">
    <mainmenu></mainmenu>
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
const route = useRoute()
watch(route, () => {
  window.scrollTo(0, 0);
})
onMounted(async () => {
  await store.init()
})
</script>
<style lang="less">
@import '@/less/elements.less';
</style>