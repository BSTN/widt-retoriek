<template>
  <div class="customslider">
    <div class="labels">
      <label>{{ props.label1 }}</label>
      <label>{{ props.label2 }}</label>
    </div>
    <Slider class="theslider" v-model="val" :min="0" :max="1" :step="0.01" :tooltips="false" tooltipPosition="top"
      :lazy="false"></Slider>
  </div>
</template>

<script lang="ts" setup>
import Slider from "@vueform/slider";
const store = useMainStore()
const props = defineProps(['reference', 'label1', 'label2'])
const val = computed({
  get() {
    if (props.reference in store.answers) {
      return store.answers[props.reference]
    } else {
      return 0
    }
  },
  set(v) {
    store.save(props.reference, v)
  }
})
</script>

<style lang="less" scoped>
.customslider {
  width: 40rem;
  max-width: 100%;
  margin: 1rem auto 2rem;

  &.disabled {
    pointer-events: none;
  }
}

.labels {
  display: flex;
  user-select: none;

  margin-bottom: 0.25rem;

  label {
    margin: 0;
    padding: 0;
    text-align: left;
  }

  label:first-child {
    flex: 1;
  }
}

.theslider {
  background: var(--bg2);
  border-radius: 0.25em;
  --slider-height: 1rem;
  --slider-bg: var(--bg2);
  --slider-connect-bg: var(--bluebg);
  --slider-radius: 0.25rem;
  --slider-handle-height: 1.5rem;
  --slider-handle-radius: 0.25rem;

  :deep(.slider-origin) {
    // right: 0;
    // left: auto;
    // border: 2px solid var(--fg);
  }
}
</style>