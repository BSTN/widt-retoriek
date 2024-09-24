<template>
  <div class="app">
    <mainmenu></mainmenu>
    <div v-if="loaded">
      <ContentDoc class="the-content">
        <template #not-found>
          (page not found)
        </template>
      </ContentDoc>
    </div>
  </div>
</template>
<script lang="ts" setup>
import info from '@/repos/BSTN-widt-retoriek-content/.info.json'
console.log(info)
const store = useMainStore()
const route = useRoute()
const loaded = ref(false)
watch(route, () => {
  window.scrollTo(0, 0);
})
onMounted(async () => {
  await store.init()
  loaded.value = true
})
</script>
<style lang="less">
@import '@/less/elements.less';
</style>