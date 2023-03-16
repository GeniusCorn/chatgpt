<script setup lang="ts">
import { useMessageListStore } from '@/store/index'

const messageList = useMessageListStore()

function clearConversations() {
  messageList.clearAllMessageList()
}
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
  </div>
</template>

<style scoped></style>
