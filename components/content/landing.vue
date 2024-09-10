<template>
  <div class="landing">
    <div v-html="logo" class="the-logo"></div>

    <nuxtLink :to="props.link">klik hier om deel te nemen aan het experiment <span v-html="next"></span></nuxtLink>
  </div>
</template>
<script lang="ts" setup>
import logo from '@/assets/logo/logo-diamond.svg?raw'
import next from '@/assets/icons/next.svg?raw'
const props = defineProps(['link'])
</script>
<style lang="less" scoped>
.landing {
  text-align: center;
}

.the-logo {
  width: 60vh;
  height: 60vh;
  display: block;
  margin: 0rem auto 1rem;

  :deep(svg) {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
}

a {
  display: inline-block;
  margin: 2rem auto;
  background: var(--fg2);
  color: var(--bg);
  padding: .5rem 2rem;
  border-radius: 0.25rem;
  text-decoration: none;

  span {
    color: var(--bg);
    font-size: 1rem;
    display: inline-block;
    line-height: 1;

    :deep(svg) {
      width: 1rem !important;
      height: 1rem !important;

      transform: translate(0.5rem, 0.15rem);

      path {
        fill: var(--bg);
      }
    }
  }

  &:hover {
    background: var(--fg);
  }
}
</style>