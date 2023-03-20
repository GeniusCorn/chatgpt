<script setup lang="ts">
import http from '@/utils/http'

import { useChatListStore } from '@/store/chat'

const chatList = useChatListStore()

function clearConversations() {
  chatList.clearAllChatList()
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

const networkStatus = ref<boolean>(false)

async function checkNetwork() {
  const res = await http.get('/chat')

  if (res.data.code === 0) {
    networkStatus.value = true
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkMode()
  } else {
    disableDarkMode()
  }

  checkNetwork()
})
</script>

<template>
  <div lg:flex="~ col" flex="~ row">
    <div flex="~ row" items-center gap-2 rounded-lg p-2>
      <div v-if="networkStatus" flex="~ row" items-center gap-2>
        <div i-tabler-network text-green />
        <div hidden lg:block>Connected</div>
      </div>

      <div v-else flex="~ row" items-center gap-2>
        <div i-tabler-network-off text-red />
        <div hidden lg:block>Disconnected</div>
      </div>
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
      @click="clearConversations"
    >
      <div i-tabler-trash />
      <div hidden lg:block>Clear Conversations</div>
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
        <div hidden lg:block>Light Mode</div>
      </div>

      <div v-else flex="~ row" items-center gap-2>
        <div i-tabler-moon />
        <div hidden lg:block>Dark Mode</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
