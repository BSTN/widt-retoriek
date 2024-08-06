<template>
  <div class="howoften">
    <slot></slot>

    nooit, eens per jaar, een
    paar keer per jaar, eens per maand, een paar keer per maand, eens per week, een paar keer week,
    dagelijks
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['reference'])
</script>

<style></style>