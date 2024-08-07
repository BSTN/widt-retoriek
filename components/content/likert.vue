<template>
  <div class="subquestion">
    <div class="q">
      <slot></slot>
    </div>
    <div class="likertoptions">
      <div class="option" v-for="option in options" @click="store.save(props.reference, option)">
        <Icon icon="akar-icons:check-box-fill" v-if="option === store.answers[props.reference]"></Icon>
        <Icon icon="akar-icons:box" v-else></Icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const store = useMainStore()
const props = defineProps(['reference'])
const options = [1, 2, 3, 4, 5, 6, 7]
</script>

<style lang="less" scoped>
.likertoptions {
  display: flex;
  justify-content: stretch;

  .option {
    flex: 1;
  }
}
</style>