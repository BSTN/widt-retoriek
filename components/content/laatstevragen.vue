<template>
  <div>
    <div v-if="matching">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['random'])
const store = useMainStore()
const matching = computed(() => {
  for (let i in props.random) {
    const val = props.random[i]
    if (val == store.answers._random) return true
  }
  return false
})
</script>

<style lang="less" scoped></style>