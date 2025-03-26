<template>
  <div class="recursive-form__block">
    <QuestionInput
      :question="question"
      :error="errors[question.id]"
      @update:answer="val => emit('update:answer', question.id, val)"
    />
    <div class="recursive-form__children" v-if="question.children">

      <span v-if="question.children && question.children.length > 0" @click="toggleChildren" class="recursive-form__span">
        {{ showChildren ? '▼ ' : '▶ '}} {{ question.label }}
      </span>

      <QuestionBlock
        v-for="child in question.children"
        :key="child.id"
        :question="child"
        :errors="errors"
        @update:answer="emit('update:answer', $event[0], $event[1])"
        v-if="showChildren"
        :class="['recursive-form__children', { showChildren }]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionInput from './QuestionInput.vue'
import QuestionBlock from './QuestionBlock.vue'
import type {  QuestionBlock as QuestionBlockType, QuestionEmit } from '@/types';
import { ref } from 'vue';


const toggleChildren = () => {
  showChildren.value = !showChildren.value
}

const showChildren = ref<boolean>(true)
defineProps<QuestionBlockType>()

const emit = defineEmits<QuestionEmit>()
</script>
