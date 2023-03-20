<script setup lang="ts">
import { useChatListStore } from '@/store/chat'
import { useScroll } from '@/composables/useScroll'

const { scrollRef, scrollToBottom } = useScroll()

const chatList = useChatListStore()

const isCurrentMessageListEmpty = computed(
  () => chatList.currentChatListIndex === null
)

onUpdated(() => {
  scrollToBottom()
})
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
    <Intro invisible lg:visible />
  </div>

  <div v-else ref="scrollRef" overflow-y-auto p-y-2>
    <Message
      v-for="(message) in chatList.allChatList.at(chatList.currentChatListIndex as number)?.message"
      :key="message.content"
      :role="message.role"
      :content="message.content"
    />
  </div>
</template>

<style scoped></style>
