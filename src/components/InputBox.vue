<script setup lang="ts">
import http from '@/utils/http'

import { useChatListStore } from '@/store/chat'
import { Message } from '@/types/Message'

const chatList = useChatListStore()

const input = ref<string>('')

const loading = ref<boolean>(false)

const time = ref<number>(1)
const timer = ref<any>(null)

let controller = new AbortController()

async function sendMessage() {
  if (isLoading()) {
    return
  }

  if (isInputBoxEmpty()) {
    alert('Please enter content.')

    return
  }

  loading.value = true

  const message: Message = {
    role: 'user',
    content: input.value
  }

  clearInputBox()

  if (chatList.currentChatListIndex === null) {
    chatList.createNewChatList(message)
  } else {
    chatList.allChatList
      .at(chatList.currentChatListIndex)
      ?.message.push(message)
  }

  timer.value = setInterval(() => {
    time.value += 1
  }, 1000)

  controller = new AbortController()

  const res = await http.post(
    '/chat',
    {
      message: chatList.allChatList.at(chatList.currentChatListIndex as number)
        ?.message
    },
    { signal: controller.signal }
  )

  if (res.data.code === 0) {
    chatList.allChatList
      .at(chatList.currentChatListIndex as number)
      ?.message.push(res.data.data.choices[0].message)

    chatList.saveAllChatListToStorage()
  } else {
    alert('Please try again later.')
  }

  clearTimer()
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

function clearTimer() {
  clearInterval(timer.value)
  time.value = 1
}

function handleStop() {
  if (loading.value) {
    controller.abort()
    loading.value = false
    chatList.allChatList
      .at(chatList.currentChatListIndex as number)
      ?.message.pop()
    clearTimer()
  }
}

onUnmounted(() => {
  handleStop()
})
</script>

<template>
  <div
    flex="~ row"
    m-x-auto
    box-border
    max-w-sm
    w-full
    gap-4
    p-x-2
    p-y-4
    lg:max-w-2xl
    md:max-w-2xl
    xl:max-w-3xl
  >
    <div relative h-full w-full>
      <textarea
        v-model="input"
        rows="1"
        :disabled="loading"
        border-black="/10"
        box-border
        min-h-full
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
        dark="bg-slate-700 text-white"
        focus-visible:ring-0
        focus:ring-0
      />

      <div
        v-if="loading"
        flex="~ col"
        absolute
        inset-0
        h-full
        w-full
        items-center
        justify-center
        dark:text-white
      >
        <div>AI is thinking... [{{ time }}s]</div>
        <div
          cursor-pointer
          text-sm
          text-gray-4
          transition
          duration-200
          ease-in-out
          hover:underline
          @click="handleStop"
        >
          Stop
        </div>
      </div>
    </div>

    <div
      flex="~"
      relative
      min-h-24
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
