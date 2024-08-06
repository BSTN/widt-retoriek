<template>
  <nuxtLink :to="props.link" class="volgende">
    <span v-if="!slotExists">Volgende</span>
    <slot v-else></slot>
  </nuxtLink>
</template>
<script lang="ts" setup>
const props = defineProps(['link'])
const slots = useSlots()
const slotExists = computed(() => {
  return Object.keys(slots).length > 0
})
</script>
<style lang="less" scoped>
.volgende {
  display: inline-block;
  margin: 2rem auto;
  background: var(--fg2);
  color: var(--bg);
  width: auto;
  padding: 0.5rem 2rem;
  border-radius: 0.25rem;
  cursor: pointer;
  text-decoration: none;

  :deep(p) {
    display: inline;
    width: auto;
  }

  &:hover {
    background: var(--fg);
  }
}
</style>