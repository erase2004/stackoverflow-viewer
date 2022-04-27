<template>
  <SearchArea @search="searchByTag($event)">

  </SearchArea>
  <div class="flex flex-col container">
    <div class="mt-12">
      <TrendingList
        :tagList="tagList"
        :activeTagList="activeTagList"
        @change="updateActiveTagList($event)"
      ></TrendingList>
      <QuestionList
        :questionList="questionList"
      ></QuestionList>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchArea from '@/components/SearchArea.vue';
import TrendingList from '@/components/TrendingList.vue';
import QuestionList from '@/components/QuestionList.vue'
import api from '@/services/api'

import type { Tag, TagItem, TagList, Search, Question } from '@/types/share'
import { TAG_SEPERATOR } from '@/constants/share'
import { ref, reactive } from 'vue'

const tagList = reactive<TagList>([])
const activeTagList = reactive<TagList>([])
const page = ref<number>(1)
const questionList = reactive<Question[]>([])

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

function searchByTag(search: Search) {
  const tagList: TagList = search.split(TAG_SEPERATOR)
}

function updateActiveTagList(tagList: TagList) {
  activeTagList.splice(0, activeTagList.length)
  activeTagList.push(...tagList)
}

async function getQuestionsByTag(tagList: TagList, page: number) {
  try {
    const resp = await api.getQeustionsByTag(tagList, page)

    if (resp.status === 200) {
      const { data: { items }} = resp

      if (page === 1) {
        questionList.splice(0, questionList.length)
      }

      questionList.push(...items)
    }

    return true;
  } catch (error) {
    console.log(error)

    return false;
  }
}

async function load() {
  try {
    let resp = await getTags()

    if (resp === false) {
      return;
    }

    page.value = 1
    resp = await getQuestionsByTag(activeTagList, page.value)

    if (resp === false) {
      return;
    }
    page.value += 1

    return true
  } catch (error) {
    console.log(error)

    return false
  }
}

load()

</script>
