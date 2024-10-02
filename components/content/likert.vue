<template>
  <div class="likert subquestion" :reference="props.reference" :class="{ answered: props.reference in store.answers }">
    <ClientOnly>
      <div class="q">
        <slot></slot>
      </div>
      <div class="likertoptions">
        <div class="option" v-for="option in options" @click="store.save(props.reference, option)"
          :class="{ active: isActive(option) }">
          <Icon icon="akar-icons:check-box-fill" v-if="option == store.answers[props.reference]"></Icon>
          <Icon icon="akar-icons:box" v-else></Icon>
          <div class="value">{{ values[option - 1] }}</div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const store = useMainStore()
const props = defineProps(['reference'])
const options = [1, 2, 3, 4, 5]
const values = [
  'Mee oneens',
  'Beetje mee oneens',
  'Geen mening',
  'Beetje mee eens',
  'Mee eens',
]
const r = ref(0.1)

function isActive(option: string) {
  return props.reference in store.answers ? store.answers[props.reference] == option : false
}

onMounted(() => {
  setTimeout(() => {
    r.value = Math.random()
  }, 1000)
})
</script>

<style lang="less" scoped>
.subquestion {
  margin-bottom: 3rem;
}

.q {
  // text-align: center;

  :deep(p) {
    display: inline;
  }
}

.answer-container {
  // text-align: center;
  padding: 2rem 0;
}

.answer {
  color: var(--bluebg);
  display: inline;
  margin-left: 1rem;
  background: var(--bluebg);
  color: var(--bluefg);
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
}


.likertoptions {
  // display: flex;
  justify-content: stretch;
  background: var(--bg1);
  padding: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;

  .option {
    flex: 1;
    font-size: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;
    text-align: center;
    // display: flex;
    // justify-content: center;

    .iconify {
      display: inline-block;
      width: 2rem;
    }

    .value {
      font-size: 1rem;
      // position: absolute;
      // top: 100%;
      // line-height: 1;
      // display: none;
    }

    &.active {
      .value {
        display: block;
      }
    }
  }
}
</style>