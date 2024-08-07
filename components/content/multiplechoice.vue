<template>
  <div class="multiplechoice subquestion">
    <div class="q">
      <slot></slot>
    </div>
    <div class="options">
      <div class="option" v-for="option in options" @click="store.save(props.reference, option)"
        :class="{ active: option === store.answers[props.reference] }">
        <Icon icon="akar-icons:check-box-fill" v-if="option === store.answers[props.reference]"></Icon>
        <Icon icon="akar-icons:box" v-else></Icon>
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const props = defineProps(['options', 'reference'])
const store = useMainStore()
const options = computed(() => {
  return eval(props.options)
})
</script>

<style lang="less" scoped></style>