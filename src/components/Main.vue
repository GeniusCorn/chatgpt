<script setup lang="ts">
import { useMessageListStore } from '@/store/index'

const messageList = useMessageListStore()

onMounted(() => {
  if (localStorage.getItem('messageList')) {
    messageList.message = JSON.parse(
      localStorage.getItem('messageList') as string
    )
  }
})

const isCurrentMessageListEmpty = computed(
  () => messageList.message.length === 0
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
      v-for="(message, index) in messageList.message"
      :key="index"
      :role="message.role"
      :content="message.content"
    />
  </div>
</template>

<style scoped></style>
