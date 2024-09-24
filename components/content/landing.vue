<template>
  <div class="landing">
    <div v-html="logo" class="the-logo"></div>

    <nuxtLink :to="props.link" @click="store.reset()" class="volgende">
      <slot></slot> <span v-html="next"></span>
    </nuxtLink>

  </div>
</template>
<script lang="ts" setup>
import logo from '@/assets/logo/logo-diamond.svg?raw'
import next from '@/assets/icons/next.svg?raw'
const store = useMainStore()
const props = defineProps(['link'])
</script>
<style lang="less" scoped>
.landing {
  text-align: center;
}

.logoin() {
  transform: scale(0.8) rotateY(0deg);
  opacity: 0;
  animation: commentin 2s @easeInOutExpo .5s 1 forwards;

  @keyframes commentin {
    100% {
      transform: scale(1) rotateY(360deg);
      opacity: 1;
    }
  }
}

.the-logo {
  width: 60vh;
  height: 60vh;
  display: block;
  margin: 0rem auto 1rem;
  .logoin();

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