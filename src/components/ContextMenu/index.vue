<template>
  <div class="context-menu__container">
    <ContextButton @toggle="toggleMenu" ref="buttonRef">
      <slot name="button">Click Me</slot>
    </ContextButton>

    <ContextDropdown v-if="menuVisible" :style="menuStyle">
      <slot name="menu">
        <ContextList :options="options" @select="selectOption" />
      </slot>
    </ContextDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import ContextButton from './ContextButton.vue'
import ContextDropdown from './ContextDropdown.vue'
import ContextList from './ContextList.vue'
import type { ContextListProps } from '@/types';

const buttonRef = ref<InstanceType<typeof ContextButton> | null>(null)
const menuVisible = ref(false)
const menuStyle = ref<Record<string, string>>({})

defineProps<ContextListProps>()

const toggleMenu = async () => {
  menuVisible.value = !menuVisible.value
  if (menuVisible.value) {
    await nextTick()
    positionMenu()
  }
}

const positionMenu = () => {
  const el = buttonRef.value?.buttonRef
  if (el) {
    const rect = el.getBoundingClientRect()
    menuStyle.value = {
      position: 'fixed',
      top: `${rect.top}px`,
      left: `${rect.right + 3}px`,
    }
  }
}

const selectOption = (option: string) => {
  menuVisible.value = false
}
</script>
