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
</script>

<template>
  <div h-screen w-screen flex="~ row">
    <!-- left -->
    <div
      flex="~ col"
      box-border
      w-60
      justify-between
      bg-gray-900
      p-4
      text-white
    >
      <Logo />

      <Menu />
    </div>

    <!-- right -->
    <div
      flex="~ 1 col"
      relative
      h-full
      w-full
      justify-end
      gap-4
      overflow-hidden
    >
      <div overflow-y-auto p-y-4>
        <Message
          v-for="(message, index) in messageList.message"
          :key="index"
          :role="message.role"
          :content="message.content"
        />
      </div>

      <InputBox />

      <Footer />
    </div>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: home
</route>
