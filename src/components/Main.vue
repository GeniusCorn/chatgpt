<script setup lang="ts">
import { useMessageListStore } from '@/store/index'
import { useScroll } from '@/composables/useScroll'

const { scrollRef, scrollToBottom } = useScroll()

const messageList = useMessageListStore()

const isCurrentMessageListEmpty = computed(
  () => messageList.currentIndex === null
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
    <Intro />
  </div>

  <div v-else ref="scrollRef" overflow-y-auto p-y-4>
    <Message
      v-for="(message) in messageList.allMessageList.at(messageList.currentIndex as number)?.message"
      :key="message.content"
      :role="message.role"
      :content="message.content"
    />
  </div>
</template>

<style scoped></style>
