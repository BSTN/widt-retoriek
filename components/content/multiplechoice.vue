<template>
  <div class="multiplechoice subquestion" :reference="props.reference" :class="{ answered }">
    <ClientOnly>
      <div class="q">
        {{ props.q }}
      </div>
      <div class="options">
        <div class="option" v-for="option in options" @click="store.save(props.reference, option)"
          :class="{ active: option === store.answers[props.reference] }">
          <Icon icon="akar-icons:check-box-fill" v-if="option === store.answers[props.reference]"></Icon>
          <Icon icon="akar-icons:box" v-else></Icon>
          {{ option }}
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const props = defineProps(['options', 'reference', 'q', 'necessary'])
const store = useMainStore()
const options = computed(() => {
  return eval(props.options)
})
const answered = computed(() => {
  return props.reference in store.answers
})
</script>

<style lang="less" scoped></style>