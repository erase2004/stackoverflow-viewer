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
  activeTagList: TagList;
  tagList: TagList;
}

interface Emits {
  (e: 'change', tag: TagList): void;
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function isActiveTag(tag: Tag): boolean {
  return props.activeTagList.includes(tag)
}

function updateSelected(tag: Tag) {
  const copyArr = [...props.activeTagList]
  const index = copyArr.indexOf(tag)

  if (index === -1) {
    copyArr.push(tag)
  } else {
    copyArr.splice(index, 1)
  }

  emit('change', copyArr)
}

</script>

<style lang="postcss" scoped>
.active {
  @apply bg-primary-800 text-secondary-200 hover:bg-primary-700;
}
</style>