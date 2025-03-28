<template>
  <div class="recursive-form__block">
    <QuestionInput
      :question="question"
      :error="errors[question.id]"
      :type="question.type"
      @update:answer="(v) => handleAnswer(question.id, v)"
    />

    <div v-if="hasChildren" class="recursive-form__children">
      <span @click="toggleChildren" class="recursive-form__span">
        {{ showChildren ? '▼ ' : '▶ '}} {{ question.label }}
      </span>

      <template v-if="showChildren">
        <QuestionBlock
          v-for="child in loadedChildren"
          :key="child.id"
          :question="child"
          :errors="errors"
          @update:answer="handleAnswer"
          class="recursive-form__children"
          hydrate-on-visible
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Question, QuestionBlock, QuestionEmit } from '@/types'

const props = defineProps<QuestionBlock>()
const emit = defineEmits<QuestionEmit>()

const showChildren = ref(false)
const loadedChildren = ref<Question[]>([])

const hasChildren = computed(() =>
  Array.isArray(props.question.children) && props.question.children.length > 0
)

const toggleChildren = () => {
  showChildren.value = !showChildren.value

  if (showChildren.value && loadedChildren.value.length === 0 && props.question.children) {
    loadedChildren.value = props.question.children
  }
}

const handleAnswer = (id: string, value: string) => {
  emit('update:answer',id,  value)
}
</script>
