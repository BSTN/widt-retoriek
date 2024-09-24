<template>
  <div class="app">
    <mainmenu></mainmenu>
    <transition name="fade">
      <div v-if="loaded">
        <ContentDoc class="the-content">
          <template #not-found>
            (page not found)
          </template>
        </ContentDoc>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import info from '@/repos/BSTN-widt-retoriek-content/.info.json'
console.log(info)
const store = useMainStore()
const route = useRoute()
const loaded = ref(false)
watch(route, async () => {
  loaded.value = false
  await nextTick()
  loaded.value = true
})

onMounted(async () => {
  await store.init()
  loaded.value = true
})
</script>
<style lang="less">
@import '@/less/elements.less';
</style>