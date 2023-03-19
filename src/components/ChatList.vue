<script setup lang="ts">
import { useMessageListStore } from '@/store/index'

const messageList = useMessageListStore()

onMounted(() => {
  if (localStorage.getItem('allMessageList')) {
    messageList.allMessageList = JSON.parse(
      localStorage.getItem('allMessageList') as string
    )
  }
})

function addNewChat() {
  messageList.currentIndex = null
}

function changeChat(index: number) {
  messageList.currentIndex = index
}
</script>

<template>
  <div flex="~ col" gap-2>
    <div
      flex="~ row"
      box-border
      cursor-pointer
      items-center
      gap-2
      border-slate-600
      rounded-lg
      border-solid
      p-2
      transition
      duration-200
      ease-in-out
      hover:bg-slate-600
      @click="addNewChat"
    >
      <div i-tabler-plus flex-none />

      <div truncate>New Chat</div>
    </div>

    <div flex="~ col" h-full w-full>
      <div
        v-for="(message, index) in messageList.allMessageList"
        :key="index"
        flex="~ row"
        border="~ solid"
        cursor-pointer
        items-center
        gap-2
        rounded-lg
        p-2
        transition
        duration-200
        ease-in-out
        hover:bg-slate-600
        :class="{
          'border-emerald-400': messageList.currentIndex === index,
          'border-gray-900': messageList.currentIndex !== index
        }"
        @click="changeChat(index)"
      >
        <div i-tabler-message flex-none />

        <div truncate>{{ message.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
