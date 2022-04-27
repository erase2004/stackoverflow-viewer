<template>
  <div class="flex flex-col flex-nowrap">
    <div
      v-for="question in props.questionList"
      :key="question.question_id"
      class="flex flex-row flex-nowrap py-4 border-b border-solid border-primary-800"
    >
      <div class="flex flex-col flex-grow overflow-hidden">
        <a
          :href="question.link"
          target="_blank"
          ref="noopener"
          :title="question.title"
          class="block overflow-hidden text-ellipsis whitespace-nowrap hover:text-blue-700"
        >
          {{ question.title}}
        </a>
        <div class="flex flex-row flex-nowrap flex-grow justify-evenly">
          <div class="flex flex-col flex-nowrap justify-center text-center">
            <div class="text-rose-800">Score</div>
            <div :class="getScoreClass(question.score)">{{ question.score }}</div>
          </div>
          <div class="flex flex-col flex-nowrap justify-center text-center">
            <div class="text-rose-800">Answers</div>
            <div :class="getAnswerClass(question)">{{ question.answer_count }}</div>
          </div>
          <div class="flex flex-col flex-nowrap justify-center text-center">
            <div class="text-rose-800">Viewed</div>
            <div>{{ question.view_count }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-col flex-grow-0 flex-shrink-0 items-center w-16">
        <a
          :href="question.owner.link"
          target="_blank"
          rel="noopener"
        >
          <img
            :src="question.owner.profile_image"
            :alt="`avatar of ${question.owner.display_name}`"
            loading="lazy"
            class="rounded-full w-16 h-16"
          />
        </a>
        <div class="text-sm py-1 text-center break-all">
          {{ question.owner.display_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '@/types/share';

interface Props {
  questionList: Question[];
}

const props = defineProps<Props>()

function getScoreClass(score: number): string {
  if (score < 0) {
    return 'score-negative'
  } else {
    return ''
  }
}

function getAnswerClass(question: Question): string {
  if (question.answer_count <= 0) {
    return ''
  }

  if (question.accepted_answer_id > 0) {
    return 'answer-fullfilled'
  } else {
    return 'answer-not-fullfilled text-green-600'
  }
}

</script>

<style lang="postcss" scoped>
.score-negative {
  @apply text-red-600;
}

.answer-not-fullfilled {
  @apply border border-solid border-green-600;
}
.answer-fullfilled {
  @apply answer-not-fullfilled bg-green-600 text-secondary-100;
}
</style>