<template>
  <div class="magdoorgaan">
    <div class="stoppen" v-if="magdoor === 1">
      <div class="helas">Helaas, dit experiment is niet voor jou.</div>
      <button class="volgende" @click="stoppen">Stoppen</button>
    </div>
    <div class="doorgaan" v-if="magdoor === 2">
      <volgende :link="props.link"></volgende>
    </div>
    <div class="allevrageneerst" v-if="magdoor === 0">
      Vul eerst alle vragen in.
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['link', 'check'])
const store = useMainStore()
const router = useRouter()
const magdoor = computed(() => {
  let count = 0
  for (let i in props.check) {
    if (i in store.answers) {
      if (store.answers[i] !== props.check[i]) {
        return 1
      }
      count++
    }
  }
  if (count === Object.keys(props.check).length) { return 2 }
  return 0
})

function stoppen() {
  store.reset()
  router.push('/')
}

</script>

<style lang="less" scoped>
.stoppen,
.doorgaan,
.allevrageneerst {
  margin-top: 4rem;
}

.allevrageneerst {
  // margin-top: 4rem;
}
</style>