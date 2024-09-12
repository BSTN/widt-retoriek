<template>
  <div class="artikel1" v-if="route.fullPath === '/artikel-1'">
    ARTIKEL1
    <slot></slot>
    <div class="reacties">
      <label>Vanwege privacy redenen zijn de gebruikersnamen in de discussie geanonimiseerd</label>
      <div class="reactie" v-for="(comment, k) in props.comments">
        <div class="commentbox">
          <div class="name">{{ store.names[k] }}</div>
          <div class="text">
            {{ comment.comment }}
          </div>
        </div>
        <customslider :comment="comment" :reference="comment.reference"></customslider>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const store = useMainStore()
const props = defineProps(['comments'])
</script>

<style lang="less" scoped>
.reacties {
  margin: 2rem auto;
  text-align: left;
  width: 40rem;
  max-width: 100%;

  .commentbox {
    .name {
      filter: blur(5px);
    }
  }

  .buttons {
    // position: absolute;
    position: relative;
    top: 0;
    right: 0;
    text-align: right;
    float: right;
    margin: -0.5rem -1rem;
    z-index: 2;

    button {
      font-size: 1.5rem;
      padding: 0.25rem;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      color: var(--fg2);

      &.trash:hover {
        color: var(--rbg);
        background: var(--bg);
      }

      &.pin:hover {
        color: var(--gbg);
        background: var(--bg);
      }

      &.active.trash {
        color: var(--bg);
        background: var(--rbg);
      }

      &.active.pin {
        color: var(--bg);
        background: var(--gbg);
      }
    }
  }
}
</style>