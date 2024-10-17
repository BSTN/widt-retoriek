<template>
  <div class="howoften subquestion" :class="{ answered }">
    <div class="q">
      {{ props.q }}
    </div>
    <div class="options">
      <div class="option" v-for="option in options" @click="store.save(props.reference, option)"
        :class="{ active: option === store.answers[props.reference] }">
        <Icon icon="akar-icons:check-box-fill" v-if="option === store.answers[props.reference]"></Icon>
        <Icon icon="akar-icons:box" v-else=""></Icon>
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const props = defineProps(['reference', 'q'])
const store = useMainStore()

const answered = computed(() => {
  return props.reference in store.answers
})

const options = [
  'nooit',
  'eens per jaar',
  'een paar keer per jaar',
  'eens per maand',
  'een paar keer per maand',
  'eens per week',
  'een paar keer per week',
  'dagelijks'
]

</script>

<style lang="less" scoped></style>