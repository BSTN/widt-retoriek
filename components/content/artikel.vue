<template>
  <div class="artikel-pagina">
    <ContentDoc :path="artikelPath" class="article" />
    <button class="show" v-if="showButton && !showComments" @click="showComments = true">Klik hier om de reacties te
      modereren</button>
    <div class="reacties" v-if="showComments">
      <label>Vanwege privacy redenen zijn de gebruikersnamen in de discussie geanonimiseerd</label>
      <div class="reactie commentbox" v-for="(comment, k) in commentsComputed">
        <div class="buttons">
          <button class="trash" @click="addToTrash(k)" :class="{ active: isDeleted(k) }">
            <Icon icon="ion:trash"></Icon>
          </button>
          <button class="pin" @click="addToPinnedItems(k)" :class="{ active: isPinned(k) }">
            <Icon icon="gridicons:pin"></Icon>
          </button>
        </div>
        <div class="name">{{ Math.random() * 10000000 }}</div>
        <div class="text">
          {{ comment.comment }}
        </div>
      </div>
      <div class="volgende-frame">
        <NuxtLink :to="props.volgende" class="volgende">Ga verder</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import YAML from 'yaml'
const artikelPath = computed(() => {
  return `/data/artikel${props.nummer}v1`
})
const props = defineProps(['nummer', 'volgende'])
const store = useMainStore()

const comments = useFromgithub('data/reacties1.yml');

const commentsComputed = computed(() => {
  if (!comments || !comments.data.value) return false
  return YAML.parse(comments.data.value)
})

const showButton = ref(false)
const showComments = ref(false)
onMounted(() => {
  setTimeout(() => {
    showButton.value = true
  }, 3000)
})

function addToTrash(key: number) {
  const reference = `comments-${props.nummer}-deleted`
  store.saveToggle(reference, key)
}
function addToPinnedItems(key: number) {
  const reference = `comments-${props.nummer}-pinned`
  store.saveToggle(reference, key)
}

function isDeleted(key: number) {
  const reference = `comments-${props.nummer}-deleted`
  if (!(reference in store.answers)) return false
  return store.answers[reference].indexOf(key) > -1
}
function isPinned(key: number) {
  const reference = `comments-${props.nummer}-pinned`
  if (!(reference in store.answers)) return false
  return store.answers[reference].indexOf(key) > -1
}
</script>

<style lang="less" scoped>
.artikel-pagina {
  margin-bottom: 4rem;
}

.show {
  margin-top: 4rem;
  .button();
}

.reacties {
  margin: 2rem auto;
  text-align: left;
  width: 40rem;
  max-width: 100%;

  .commentbox {
    .name {
      filter: blur(5px);
    }
  }

  .buttons {
    text-align: right;
    float: right;
    margin: 0;
    z-index: 2;
    position: relative;

    button {
      font-size: 1.5rem;
      padding: 0.25rem;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      color: var(--fg2);

      &.trash:hover {
        color: var(--rbg);
        background: var(--bg);
      }

      &.pin:hover {
        color: var(--gbg);
        background: var(--bg);
      }

      &.active.trash {
        color: var(--bg);
        background: var(--rbg);
      }

      &.active.pin {
        color: var(--bg);
        background: var(--gbg);
      }
    }
  }
}

.volgende-frame {
  text-align: center;
  margin: 4rem auto;
}

.volgende {
  .button();
}
</style>