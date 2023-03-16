<script setup lang="ts">
import { useMessageListStore } from '@/store/index'

const messageList = useMessageListStore()

function clearConversations() {
  messageList.clearAllMessageList()
}

const theme = ref<string>()

function toggleDarkMode() {
  if (theme.value === 'dark') {
    disableDarkMode()
  } else {
    enableDarkMode()
  }
}

function disableDarkMode() {
  document.documentElement.classList.remove('dark')
  theme.value = 'light'
}

function enableDarkMode() {
  document.documentElement.classList.add('dark')
  theme.value = 'dark'
}

onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkMode()
  } else {
    disableDarkMode()
  }
})
</script>

<template>
  <div flex="~ col">
    <div
      flex="~ row"
      cursor-pointer
      items-center
      gap-2
      rounded-lg
      p-2
      transition
      duration-200
      ease-in-out
      hover:bg-slate-600
      @click="clearConversations"
    >
      <div i-tabler-trash />
      <div>Clear Conversations</div>
    </div>

    <div
      flex="~ row"
      cursor-pointer
      items-center
      gap-2
      rounded-lg
      p-2
      transition
      duration-200
      ease-in-out
      hover:bg-slate-600
      @click="toggleDarkMode"
    >
      <div v-if="theme === 'dark'" flex="~ row" items-center gap-2>
        <div i-tabler-sun />
        <div>Light Mode</div>
      </div>

      <div v-else flex="~ row" items-center gap-2>
        <div i-tabler-moon />
        <div>Dark Mode</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
