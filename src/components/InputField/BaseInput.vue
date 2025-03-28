<template>
  <label :for="id" class="input-field__label" :class="{
    'input-field__label--file': type === 'file'
  }">
    {{ label }}

    <input :id="id" :type="type" :placeholder="placeholder" :value="type === 'file' ? undefined : modelValue"
      @change="handleChange" min="0" class="input-field__input" :autofocus="autofocus"
      :accept="type === 'file' ? 'image/jpeg,image/png,image/webp' : undefined" />
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: string
  label: string
  placeholder?: string
  type?: string
  autofocus?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', event: Event): void
}>()

const modelValue = defineModel<string | number | FileList | null>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value: string | number | FileList | null = null

  if (props.type === 'file') {
    value = target.files
  } else if (props.type === 'number') {
    value = target.valueAsNumber
  } else {
    value = target.value
  }

  emit('change', event)
  modelValue.value = value
}
</script>
