<template>
  <div class="multiplechoice">
    {{ props.reference }}
    <slot></slot>
    <div class="option" v-for="option in options">
      ☐ {{ option }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['options', 'reference'])
const options = computed(() => {
  return eval(props.options)
})
</script>

<style></style>