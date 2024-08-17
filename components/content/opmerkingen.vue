<template>
  <div class="opmerkingen">
    <slot></slot>
    <textarea v-model="store.answers[props.reference]"></textarea>
  </div>
</template>

<script lang="ts" setup>
const store = useMainStore()
const props = defineProps(['reference'])
</script>

<style lang="less" scoped>
.opmerkingen {
  textarea {
    width: 40rem;
    max-width: 100%;
    margin: 0 auto 2rem;
    min-height: 8rem;
  }
}
</style>