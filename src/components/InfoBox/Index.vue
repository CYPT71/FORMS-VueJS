<template>
  <InfoContainer :style="boxStyle">
    <InfoContent>
      <slot name="toDisplay">
        <h1>exemple</h1>
      </slot>
    </InfoContent>
  </InfoContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import InfoContainer from './InfoContainer.vue'
import InfoContent from './InfoContent.vue'
import type {InfoBox} from "@/types"

const props = defineProps<InfoBox>()
const boxStyle = ref<Record<string, string>>({})

const updatePosition = () => {
  const container = document.getElementById(props.containerIdName ?? 'left-column')
  if (container) {
    const rect = container.getBoundingClientRect()
    boxStyle.value = {
      position: 'absolute',
      top: `${rect.top + 100}px`,
      left: `${rect.width - 90}px`,
      zIndex: '1000',
      width: `${rect.width}px`,
      maxWidth: '10vw',
      aspectRatio: '1 / 1',
      overflow: 'hidden',
    }
  }
}

onMounted(() => {
  updatePosition()
  window.addEventListener('resize', updatePosition)
})

watch(() => props.containerIdName, updatePosition)
</script>
