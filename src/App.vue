<template>
  <SearchArea @search="search = $event">

  </SearchArea>
  <div class="flex flex-col container">
    <div class="mt-12">
      <TrendingList
        :tagList="tagList"
        :activeTagList="activeTagList"
        @change="updateActiveTagList($event)"
      ></TrendingList>
      <QuestionList></QuestionList>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchArea from '@/components/SearchArea.vue';
import TrendingList from '@/components/TrendingList.vue';
import QuestionList from '@/components/QuestionList.vue'
import api from '@/services/api'

import type { Tag, TagItem, TagList, Search } from '@/types/share'
import { ref, reactive } from 'vue'

const search = ref<Search>('')
const tagList = reactive<TagList>([])
const activeTagList = reactive<TagList>([])

async function getTags() {
  try {
    const resp = await api.getTopTags()

    if (resp.status === 200) {
      const { data: { items } } = resp

      tagList.splice(0, 10)
      items.forEach((item: TagItem) => {
        tagList.push(item.name)
      })

      activeTagList.splice(0, activeTagList.length)
      activeTagList.push(tagList[0])
    }

    return true;
  } catch (error) {
    console.log(error)

    return false;
  }
}

function updateActiveTagList(tagList: TagList) {
  activeTagList.splice(0, activeTagList.length)
  activeTagList.push(...tagList)
}
    }

  } catch (error) {
    console.log(error)
  }
}

getTags()

</script>
