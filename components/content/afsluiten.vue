<template>
  <div class="afsluiten">
    <button class="afsluiten" @click="afsluiten()">
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const store = useMainStore()
async function afsluiten() {

  store.finish().then(() => {
    router.push('/')
  }).catch(err => {
    console.warn(err)
  })
}
</script>

<style lang="less" scoped>
.afsluiten {
  padding: 4rem 0;

  button {
    .button();

    :deep(p) {
      margin: 0;
      width: auto;
    }
  }
}
</style>