<template>
  <SearchArea @search="searchHandle($event)">

  </SearchArea>
  <div class="flex flex-col container">
    <div class="mt-12">
      <TrendingList
        :tagList="tagList"
        :activeTagList="activeTagList"
        @change="tagListChangeHandle($event)"
      ></TrendingList>
      <QuestionList
        :questionList="questionList"
        :questionIsLoading="questionIsLoading"
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
import { TAG_SEPERATOR, PRELOAD_PADDING } from '@/constants/share'
import { ref, reactive, watch, onBeforeUnmount } from 'vue'

const tagList = reactive<TagList>([])
const activeTagList = reactive<TagList>([])
const page = ref<number>(1)
const questionList = reactive<Question[]>([])
const questionIsLoading = ref<boolean>(true)

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

async function searchHandle(search: Search) {
  const tagList: TagList = search.split(TAG_SEPERATOR)

  const resp = await tagListChangeHandle(tagList)
}

async function tagListChangeHandle(tagList: TagList) {
  updateActiveTagList(tagList)

  page.value = 1

  try {
    const resp = await getQuestionsByTag(activeTagList, page.value)

    page.value += 1

    return true
  } catch (error) {
    console.log(error)

    return false
  }
}

async function getQuestionsByTag(tagList: TagList, page: number) {
  if (page === 1) {
    questionList.splice(0, questionList.length)
  }

  try {
    questionIsLoading.value = true
    const resp = await api.getQeustionsByTag(tagList, page)

    if (resp.status === 200) {
      const { data: { items }} = resp

      questionList.push(...items)
    }

    return true;
  } catch (error) {
    console.log(error)

    return false;
  } finally {
    questionIsLoading.value = false
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

async function scrollHandle() {
  const aboutReachEnd = document.documentElement.scrollTop + window.innerHeight + PRELOAD_PADDING >= document.documentElement.offsetHeight;

  if (aboutReachEnd === false) {
    return;
  }

  if (questionIsLoading.value === true) {
    return;
  }

  try {
    const resp = getQuestionsByTag(activeTagList, page.value)

    page.value += 1
  } catch (error) {
    console.log(error)
  }
}

window.addEventListener('scroll', scrollHandle)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollHandle)
})

</script>
