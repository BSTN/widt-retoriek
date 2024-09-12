<template>
  <div class="artikel-pagina">
    {{ store.answers._random }}
    <ClientOnly>
      <ContentDoc :path="artikelPath" class="article" />
    </ClientOnly>
    <!-- <button class="show" v-if="showButton && !showComments" @click="showComments = true">Klik hier om de reacties te
      modereren</button> -->
    <div class="volgende-frame" v-if="!selectionsDone">
      <button @click="selectionsDone = true" class="volgende">Volgende</button>
    </div>
    <div class="volgende-frame" v-if="selectionsDone">
      <slot></slot>
    </div>
    <div class="volgende-frame" v-if="selectionsDone">
      <textarea class="added-comment" v-model="addedComment" />
    </div>
    <div class="volgende-frame" v-if="selectionsDone">
      <NuxtLink :to="props.volgende" class="volgende" @click="store.sendData()">Ga verder</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const artikelPath = computed(() => {
  return `/data/random${store.answers._random}`
})
const props = defineProps(['nummer', 'volgende'])
const store = useMainStore()

const showButton = ref(false)
const showComments = ref(false)
const selectionsDone = ref(false)
const addedComment = computed({
  get() {
    if (`customcomment-${props.nummer}` in store.answers) {
      return store.answers[`customcomment-${props.nummer}`]
    } else {
      return ''
    }
  },
  set(val) {
    store.save(`customcomment-${props.nummer}`, val)
  }
})

onMounted(() => {
  setTimeout(() => {
    showButton.value = true
  }, 3000)
})

</script>

<style lang="less" scoped>
.artikel-pagina {
  margin-bottom: 4rem;
}

.show {
  margin-top: 4rem;
  .button();
}



.volgende-frame {
  text-align: center;
  margin: 4rem auto;
}

.volgende {
  .button();
}

textarea.added-comment {
  width: 40rem;
  max-width: 100%;
  margin: 2rem auto;
  min-height: 8rem;
}
</style>