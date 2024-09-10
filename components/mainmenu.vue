<template>
  <div class="mainmenu" v-if="route.fullPath !== '/afsluiting' && route.fullPath !== '/'">
    <button @click="stoppen">Stoppen</button>
  </div>
</template>

<script lang="ts" setup>
const store = useMainStore()
const route = useRoute();
const router = useRouter();
function stoppen() {
  const sure = confirm('Weet je zeker dat je wilt stoppen? Je kunt deze actie niet ongedaan maken.')
  if (sure) {
    store.reset()
    router.push('/')
  }
}
</script>

<style lang="less" scoped>
.mainmenu {
  position: fixed;
  top: 0;
  right: 0;

  button {
    padding: 0.25rem 0.5rem;
    font-size: .75rem;
    background: var(--fg2);
    color: var(--bg);

    &:hover {
      background: var(--rbg);
    }
  }
}
</style>