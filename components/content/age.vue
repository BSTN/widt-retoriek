<template>
  <div class="age subquestion">
    <div class="q">Wat is je leeftijd:</div>
    <input type="number" v-model="age">
  </div>
</template>

<script lang="ts" setup>
const store = useMainStore()
const age = computed({
  get() {
    return store.answers?.age || 0
  },
  set(val) {
    store.answers.age = val
  }
})
</script>

<style lang="less" scoped></style>