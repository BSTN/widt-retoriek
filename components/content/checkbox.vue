<template>
  <div class="checkbox" @click="val = !val">
    <button :class="{ checked: val }">
      <Icon icon="akar-icons:box" v-if="!val"></Icon>
      <Icon icon="akar-icons:check-box-fill" v-else></Icon>
    </button>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const props = defineProps(['reference'])
const store = useMainStore()
const val = computed({
  get() {
    if (props.reference in store.answers) {
      return store.answers[props.reference]
    }
    return false
  },
  set(val) {
    store.save(props.reference, val)
  }
})

</script>

<style lang="less" scoped>
.checkbox {
  display: flex;
  width: 40rem;
  max-width: 100%;
  margin: 0 auto;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background: var(--bg1);
  padding: 1rem;
  border-radius: 0.5rem;

  &:hover {
    text-decoration: underline;
  }

  button {
    background: transparent;
    padding: 0;
    line-height: 1;
    margin: 0 0.5rem 0 0;
    font-size: 1.5rem;

    &:hover {
      background: transparent;
      color: var(--bluebg);
    }

    &.checked {
      color: var(--bluebg);
    }
  }

  :deep(p) {
    margin: 0;
  }
}
</style>