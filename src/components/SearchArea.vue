<template>
  <div class="fixed my-2 w-full">
    <div class="flex flex-row text-base container">
      <input
        name="search"
        placeholder="Tag"
        class="
          flex flex-grow
          px-2 py-1
          text-secondary-800
          placeholder:text-secondary-500
          border border-solid border-primary-800
          rounded-l-md"
        v-model="content"
      >
      <button class="
        px-2 py-1
        btn-primary
        rounded-r-md"
        @click.stop="search(content)"
      >Search</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Search } from '@/types/share';
import { ref, watch } from 'vue'

interface Emits {
  (e: 'search', content: Search): void;
}

const emit = defineEmits<Emits>()
const content = ref<Search>('')

watch(content, (content, prevContent) => {
  search(content)
})

function search(content: Search) {
  emit('search', content)
}

</script>
