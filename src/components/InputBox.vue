<script setup lang="ts">
import http from '@/utils/http'

import { useMessageListStore } from '@/store/index'

const messageList = useMessageListStore()

const input = ref<string>('')

const loading = ref<boolean>(false)

async function sendMessage() {
  if (isLoading()) {
    return
  }

  if (isInputBoxEmpty()) {
    alert('Please enter content.')

    return
  }

  loading.value = true

  if (messageList.currentIndex === null) {
    messageList.addNewMessageList({
      role: 'user',
      content: input.value
    })
  } else {
    messageList.allMessageList
      .at(messageList.currentIndex)
      ?.message.push({ role: 'user', content: input.value })
  }

  clearInputBox()

  const res = await http.post('/chat', {
    message: messageList.allMessageList.at(messageList.currentIndex as number)
      ?.message
  })

  messageList.allMessageList
    .at(messageList.currentIndex as number)
    ?.message.push(res.data.data.choices[0].message)

  messageList.syncToStorage()

  loading.value = false
}

function isInputBoxEmpty() {
  if (input.value === '') {
    return true
  }

  return false
}

function isLoading() {
  if (loading.value === true) {
    return true
  }

  return false
}

function clearInputBox() {
  input.value = ''
}
</script>

<template>
  <div
    flex="~ row"
    box-border
    w-full
    items-center
    justify-center
    gap-4
    p-x-20
    p-y-4
  >
    <textarea
      v-model="input"
      rows="1"
      :disabled="loading"
      border-black="/10"
      min-h-24
      w-full
      resize-none
      overflow-y-auto
      border
      rounded-lg
      p-4
      font-sans
      text-base
      outline-none
      drop-shadow-xl
      dark:bg-slate-600
      dark:text-white
      focus-visible:ring-0
      focus:ring-0
    />

    <div
      flex="~"
      h-full
      w-20
      items-center
      justify-center
      border
      rounded-lg
      bg-emerald-400
      drop-shadow-xl
      transition
      duration-200
      ease-in-out
      :class="{
        'hover:bg-emerald-500': !loading,
        'hover:opacity-100': !loading,
        'hover:drop-shadow-2xl': !loading,
        'cursor-pointer': !loading
      }"
      @click="sendMessage"
    >
      <div v-if="loading" i-tabler-reload text-2xl text-white class="loading" />

      <div v-else i-tabler-send text-2xl text-white />
    </div>
  </div>
</template>

<style scoped>
.loading {
  animation: rotation 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
