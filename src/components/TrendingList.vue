<template>
  <div>
    <h2 class="text-2xl">Trending</h2>
    <span
      class="
        inline-block py-1 px-2 m-1
        btn cursor-pointer"
      v-for="tag in props.tagList" :key="tag" :class="isActiveTag(tag) ? 'btn-primary' : 'btn-primary-outline'"
      @click.stop="updateSelected(tag)"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { Tag, TagList } from '@/types/share'

interface Props {
  activeTag: Tag;
  tagList: TagList;
}

interface Emits {
  (e: 'change', tag: Tag): void;
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function isActiveTag(tag: Tag): boolean {
  return tag === props.activeTag
}

function updateSelected(tag: Tag) {
  emit('change', tag)
}

</script>

<style lang="postcss" scoped>
.active {
  @apply bg-primary-800 text-secondary-200 hover:bg-primary-700;
}
</style>