<template>
  <Search></Search>
  <div class="flex flex-col max-w-5xl mx-auto">
    <div class="mt-12">
      <TrendingList
        :tagList="tagList"
        :activeTag="activeTag"
        @change="activeTag = $event"
      ></TrendingList>
      <QuestionList></QuestionList>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '@/components/Search.vue';
import TrendingList from '@/components/TrendingList.vue';
import QuestionList from '@/components/QuestionList.vue'
import api from '@/services/api'

import type { Tag, TagItem, TagList } from '@/types/share'
import { ref, reactive } from 'vue'

const activeTag = ref<Tag>('')
const tagList = reactive<TagList>([])

async function getTags() {
  try {
    const resp = await api.getTopTags()

    if (resp.status === 200) {
      const { data: { items } } = resp

      tagList.splice(0, 10)
      items.forEach((item: TagItem) => {
        tagList.push(item.name)
      })

      activeTag.value = tagList[0]
    }

  } catch (error) {
    console.log(error)
  }
}

getTags()

</script>
