<template>
  <div class="recursive-form__block">
    <QuestionInput
      :question="question"
      :error="errors[question.id]"
      @update:answer="val => emit('update:answer', question.id, val)"
    />

    <div v-if="hasChildren" class="recursive-form__children">
      <span @click="toggleChildren" class="recursive-form__span">
        {{ showChildren ? '▼ ' : '▶ '}} {{ question.label }}
      </span>

      <template v-if="showChildren">
        <QuestionBlock
          v-for="child in lazyChildren"
          :key="child.id"
          :question="child"
          :errors="errors"
          @update:answer="emit('update:answer', $event[0], $event[1])"
          class="recursive-form__children"
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
const lazyChildren = ref<Question[]>([])

const hasChildren = computed(() =>
  Array.isArray(props.question.children) && props.question.children.length > 0
)

const toggleChildren = () => {
  showChildren.value = !showChildren.value

  if (
    showChildren.value &&
    lazyChildren.value.length === 0 &&
    props.question.children
  ) {
    // Lazy load : uniquement au premier affichage
    lazyChildren.value = props.question.children
  }
}
</script>

