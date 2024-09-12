<template>
  <div class="opmerkingen">
    <div class="slot">
      <slot></slot>
    </div>
    <textarea v-model="store.answers[props.reference]"></textarea>
  </div>
</template>

<script lang="ts" setup>
const store = useMainStore()
const props = defineProps(['reference'])
</script>

<style lang="less" scoped>
.opmerkingen {
  margin: 3rem 0 0rem;

  .slot {
    font-size: 0.75rem;
  }

  textarea {
    width: 40rem;
    max-width: 100%;
    margin: 0 auto 2rem;
    min-height: 8rem;
  }
}
</style>