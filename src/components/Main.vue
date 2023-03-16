<script setup lang="ts">
import { useMessageListStore } from '@/store/index'

const messageList = useMessageListStore()

const isCurrentMessageListEmpty = computed(
  () => messageList.currentIndex === null
)
</script>

<template>
  <div
    v-if="isCurrentMessageListEmpty"
    flex="~ col"
    h-full
    w-full
    items-center
    justify-center
  >
    <Intro />
  </div>

  <div v-else overflow-y-auto p-y-4>
    <Message
      v-for="(message) in messageList.allMessageList.at(messageList.currentIndex as number)?.message"
      :key="message.content"
      :role="message.role"
      :content="message.content"
    />
  </div>
</template>

<style scoped></style>
