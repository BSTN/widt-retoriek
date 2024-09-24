<template>
  <ClientOnly>
    <div @click="save" class="volgende" :class="{ allow }">
      <span v-if="!slotExists">Volgende</span>
      <slot v-else></slot>
    </div>
  </ClientOnly>
</template>
<script lang="ts" setup>
const props = defineProps(['link', 'opslaan', 'check'])
const slots = useSlots()
const router = useRouter()
const store = useMainStore()
const slotExists = computed(() => {
  return Object.keys(slots).length > 0
})
const allow = computed(() => {
  if (props.check == undefined) { return true }
  if (Array.isArray(props.check)) {
    return props.check.filter(x => {
      if (x in store.answers) {
        return false
      }
      return true
    }).length === 0
  }
  return false
})
async function save() {
  if (props.opslaan) {
    await store.sendData()
  }
  if (allow.value) {
    router.push(props.link)
  } else {
    alert('Nog niet alle vragen zijn ingevuld.')
    for (let i in props.check) {
      if (!(props.check[i] in store.answers)) {
        document.querySelector(`[reference=${props.check[i]}]`)?.scrollIntoView({ behavior: 'smooth' })
        break;
      }
    }
  }
}
</script>
<style lang="less" scoped>
.volgende {}
</style>