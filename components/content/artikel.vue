<template>
  <div class="artikel-pagina">
    <ClientOnly>
      <ContentDoc :path="artikelPath" class="article" />
    </ClientOnly>
    <!-- reacties -->
    <div v-if="!showComments" class="na-het-lezen">Na 30 seconden verschijnen hier de reacties</div>
    <div class="reacties-wrapper" v-if="showComments">
      <div class="reacties">
        <label>Vanwege privacy redenen zijn de gebruikersnamen in de discussie geanonimiseerd</label>
        <div class="reactie" v-for="(comment, k) in reacties">
          <div class="commentbox">
            <div class="name">{{ store.names[k] }}</div>
            <div class="text">
              {{ comment.comment }}
            </div>
          </div>
          <customslider :comment="comment" :reference="comment.reference" :class="{ disabled: selectionsDone }"
            :label1="props.label1 || 'Niet constructief'" :label2="props.label2 || 'constructief'"></customslider>
        </div>
      </div>
      <!-- volgend -->
      <div v-if="!allcommentsdone">Je kunt verder als alle reacties zijn beoordeeld.</div>
    </div>
    <div class="volgende-frame" v-if="!selectionsDone && allcommentsdone">
      <button @click="selectionsDone = true" class="volgende">Volgende</button>
    </div>
    <div class="volgende-frame" v-if="selectionsDone">
      <p v-html="props.participatievraag"></p>
      <customslider :reference="`participatieslider-${props.nummer}`" label1="0%" label2="100%"></customslider>
    </div>
    <div class="done volgende-frame"
      v-if="selectionsDone && !responseDone && !(`participatieslider-${props.nummer}` in store.answers)">
      Je kunt verder als je de vorige vraag hebt beantwoord.
    </div>
    <div class="done volgende-frame"
      v-if="selectionsDone && !responseDone && `participatieslider-${props.nummer}` in store.answers">
      <button @click="responseDone = true" class="volgende">Volgende</button>
    </div>
    <div class="volgende-frame" v-if="selectionsDone && responseDone">
      <p v-html="props.reactievraag"></p>
      <textarea class="added-comment" v-model="addedComment" placeholder="Schrijf hier je reactie..." />
    </div>
    <div class="volgende-frame" v-if="selectionsDone && responseDone && addedComment.length === 0">
      Je kunt verder als je een reactie hebt gegeven.
    </div>
    <div class="volgende-frame" v-if="selectionsDone && responseDone && addedComment.length > 0">
      <NuxtLink :to="props.volgende" class="volgende" @click="store.sendData()">Ga verder</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onKeyStroke } from '@vueuse/core'
import reacties1 from '@/repos/BSTN-widt-retoriek-content/data/sub1reacties1.yml'
import reacties2 from '@/repos/BSTN-widt-retoriek-content/data/sub1reacties2.yml'
import reacties3 from '@/repos/BSTN-widt-retoriek-content/data/sub2reacties1.yml'
import reacties4 from '@/repos/BSTN-widt-retoriek-content/data/sub2reacties2.yml'

const reacties_combined = reacties1.concat(reacties2).concat(reacties3).concat(reacties4);

const showComments = ref(false)

const allcommentsdone = computed(() => {
  for (let i in reacties.value) {
    if (!(reacties.value[i].reference in store.answers)) {
      return false
    }
  }
  return true
})

const artikelPath = computed(() => {
  const r = store.answers._random
  // artikel 1
  if (props.nummer == 1) {
    if (r == 1) {
      return `/data/subject1v1`
    }
    if (r == 2) {
      return `/data/subject1v2`
    }
    if (r == 3) {
      return `/data/subject2v1`
    }
    if (r == 4) {
      return `/data/subject2v2`
    }
  }
  // artikel 2
  if (props.nummer == 2) {
    if (r == 1) {
      return `/data/subject2v1`
    }
    if (r == 2) {
      return `/data/subject2v2`
    }
    if (r == 3) {
      return `/data/subject1v1`
    }
    if (r == 4) {
      return `/data/subject1v2`
    }
  }
})
const props = defineProps(['nummer', 'volgende', 'participatievraag', 'reactievraag', 'label1', 'label2'])
const store = useMainStore()

const selectionsDone = ref(false)
const responseDone = ref(false)

const reacties = computed(() => {
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

onKeyStroke('S', (ev) => {
  showComments.value = true
})

onMounted(() => {
  setTimeout(() => {
    showComments.value = true
  }, 30000)
})

</script>

<style lang="less" scoped>
.artikel-pagina {
  margin-bottom: 4rem;
  max-width: 100%;
  width: 40rem;
  margin: 0 auto 4rem;
}

.show {
  margin-top: 4rem;
  .button();
}

.na-het-lezen {
  margin-top: 4rem;
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

  .reactie {
    margin-bottom: 4rem;
  }

  .commentbox {
    .name {
      filter: blur(5px);
      margin-bottom: 0.5rem;
    }
  }
}
</style>