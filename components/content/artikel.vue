<template>
  <div class="artikel-pagina">
    <ClientOnly>
      <ContentDoc :path="artikelPath" class="article" />
    </ClientOnly>
    <!-- reacties -->
    <div class="reacties">
      <label>Vanwege privacy redenen zijn de gebruikersnamen in de discussie geanonimiseerd</label>
      <div class="reactie" v-for="(comment, k) in reacties">
        <div class="commentbox">
          <div class="name">{{ store.names[k] }}</div>
          <div class="text">
            {{ comment.comment }}
          </div>
        </div>
        <customslider :comment="comment" :reference="comment.reference" v-if="!selectionsDone"
          label1="Niet constructief" label2="constructief"></customslider>
      </div>
    </div>
    <!-- volgend -->
    <div class="volgende-frame" v-if="!selectionsDone">
      <button @click="selectionsDone = true" class="volgende">Volgende</button>
    </div>
    <div class="volgende-frame" v-if="selectionsDone">
      <p v-html="props.participatievraag"></p>
      <customslider :reference="`participatieslider-${props.nummer}`" label1="0%" label2="100%"></customslider>
    </div>
    <div class="done volgende-frame" v-if="selectionsDone && !responseDone">
      <button @click="responseDone = true" class="volgende">Volgende</button>
    </div>
    <div class="volgende-frame" v-if="selectionsDone && responseDone">
      <p v-html="props.reactievraag"></p>
      <textarea class="added-comment" v-model="addedComment" placeholder="Schrijf hier je reactie..." />
    </div>
    <div class="volgende-frame" v-if="selectionsDone && responseDone">
      <NuxtLink :to="props.volgende" class="volgende" @click="store.sendData()">Ga verder</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import reacties1 from '@/repos/BSTN-widt-retoriek-content/data/sub1reacties1.yml'
import reacties2 from '@/repos/BSTN-widt-retoriek-content/data/sub1reacties2.yml'
import reacties3 from '@/repos/BSTN-widt-retoriek-content/data/sub2reacties1.yml'
import reacties4 from '@/repos/BSTN-widt-retoriek-content/data/sub2reacties2.yml'

const reacties_combined = reacties1.concat(reacties2).concat(reacties3).concat(reacties4);

const artikelPath = computed(() => {
  const r = store.answers._random
  if ((props.nummer == 1 && (r == 1 || r == 2)) || (props.nummer == 2 && (r == 3 || r == 4))) {
    return `/data/subject1`
  } else {
    return `/data/subject2`
  }
})
const props = defineProps(['nummer', 'volgende', 'participatievraag', 'reactievraag'])
const store = useMainStore()

const showButton = ref(false)
const selectionsDone = ref(false)
const responseDone = ref(false)

const reacties = computed(() => {
  console.log(store.answers._reacties1)
  if (props.nummer == 1) {
    return reacties_combined.filter(x => store.answers._reacties1.includes(x.reference))
  } else {
    return reacties_combined.filter(x => store.answers._reacties2.includes(x.reference))
  }
})

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
  margin: 0rem auto;
  min-height: 8rem;
  padding: 1rem;
}

.reacties {
  margin: 2rem auto;
  text-align: left;
  width: 40rem;
  max-width: 100%;

  .commentbox {
    .name {
      filter: blur(5px);
      margin-bottom: 0.5rem;
    }
  }
}
</style>