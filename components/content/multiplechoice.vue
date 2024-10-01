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
        <div class="openfield" v-if="answered && store.answers[props.reference] === 'Anders, namelijk...'">
          <input type="text" placeholder="..." v-model="openAnswer" @keydown.enter="$event.target.blur()">
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
const openreference = computed(() => {
  return props.reference + '_open'
})
const openAnswer = computed({
  get() {
    if (!(openreference.value in store.answers)) { return '' }
    return store.answers[openreference.value]
  }, set(val) {
    store.save(openreference.value, val)
  }
})
</script>

<style lang="less" scoped>
.openfield {
  input {
    border: 1px solid var(--bg);
  }
}
</style>