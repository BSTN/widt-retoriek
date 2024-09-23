<template>
  <div class="precheck">
    <slot v-if="showNext === 0"></slot>
    <div class="notforyou" v-if="showNext === 2">
      <p>Helaas, deze test is niet voor jou.</p>
      <button class="volgende" @click="stoppen()">Klik hier om te stoppen</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['references'])
const store = useMainStore()
const router = useRouter()
const showNext = computed(() => {
  for (let i in props.references) {
    if (!(i in store.answers)) { return 1 }
    if (store.answers[i] !== props.references[i]) {
      return 2
    }
  }
  return 0
})

function stoppen() {
  store.reset()
  router.push('/')
}
</script>

<style lang="less" scoped></style>