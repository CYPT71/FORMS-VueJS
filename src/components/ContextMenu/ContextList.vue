<template>
  <ul>
    <li v-for="(option, index) in options" :key="index" @click="select(option)" class="modal-options">
      {{ option }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type {ContextListProps, ContextListEmits} from "@/types"
const props = defineProps<ContextListProps>()

const emit = defineEmits<ContextListEmits>()

const select = (option: string) => {
  emit('select', option)
}
</script>
