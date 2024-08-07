<template>
  <div class="afbeelding">
    <NuxtImg :src="props.src" sizes="lg: 1000px"></NuxtImg>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['src'])
</script>

<style></style>